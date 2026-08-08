/**
 * Terminal session — SSH or local shell passthrough once a skull is selected.
 *
 * Architecture: ratatat/ink renders only the top status bar + optional notebook
 * HUD; all raw shell I/O is piped directly through process.stdin/stdout so the
 * connected shell renders normally inside the terminal emulator.
 *
 * Special commands (typed in the shell and intercepted before forwarding):
 *   /notebook       toggle the notebook HUD
 *   /inject <n>     inject scripture n to the remote shell
 *   /disconnect     gracefully terminate the uplink
 *   Ctrl+X          force-disconnect
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { Client } from 'ssh2';
import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { RULE } from './banner.js';
import { Notebook, sleeves } from './notebook.js';

// ── Status bar (always visible at top) ─────────────────────────────────────
function StatusBar({ skull, status, notebookOpen }) {
  const statusColor = status === 'connected' ? 'green'
                    : status === 'error'     ? 'red'
                    : 'yellow';
  return React.createElement(Box, { flexDirection: 'column' },
    React.createElement(Text, { color: 'red', bold: true }, '═'.repeat(70)),
    React.createElement(Box, {},
      React.createElement(Text, { color: 'yellow', bold: true }, ' ✠ '),
      React.createElement(Text, { color: 'white',  bold: true }, skull.designation),
      React.createElement(Text, { color: 'red',    bold: true }, '  ║  '),
      React.createElement(Text, { color: 'cyan'              }, `${skull.host}:${skull.port}`),
      React.createElement(Text, { color: 'red',    bold: true }, '  ║  '),
      React.createElement(Text, { color: statusColor, bold: true }, status.toUpperCase()),
      notebookOpen
        ? React.createElement(Text, { color: 'yellow', dimColor: true },
            '  ║  NOTEBOOK OPEN'
          )
        : null
    ),
    React.createElement(Text, { color: 'red', dimColor: true }, RULE),
    React.createElement(Text, { color: 'white', dimColor: true },
      ' /notebook  ·  /inject <n>  ·  /disconnect  ·  Ctrl+X force-quit'
    ),
    React.createElement(Text, { color: 'red', bold: true }, '─'.repeat(70))
  );
}

// ── Disconnected summary screen ─────────────────────────────────────────────
function DisconnectScreen({ skull, reason, onBack }) {
  useInput((char, key) => {
    if (key.return || char === 'q' || char === 'Q') onBack();
  });
  return React.createElement(Box, { flexDirection: 'column', paddingLeft: 2 },
    React.createElement(Text, { color: 'red', bold: true }, '═'.repeat(70)),
    React.createElement(Text, { color: 'red', bold: true },
      `  ✠  UPLINK SEVERED — ${skull.designation}`
    ),
    React.createElement(Text, { color: 'red', bold: true }, '═'.repeat(70)),
    React.createElement(Box, { marginTop: 1 },
      React.createElement(Text, { color: 'white', dimColor: true }, '  REASON : '),
      React.createElement(Text, { color: 'yellow' }, reason || 'Connection terminated.')
    ),
    React.createElement(Box, { marginTop: 1 },
      React.createElement(Text, { color: 'white', dimColor: true },
        '  "The Machine Spirit returns to the Omnissiah."'
      )
    ),
    React.createElement(Box, { marginTop: 2 },
      React.createElement(Text, { color: 'red', bold: true },
        '  [ ENTER / Q ]  Return to uplink terminal'
      )
    )
  );
}

// ── Main Terminal component ─────────────────────────────────────────────────
export function Terminal({ skullId, skull, onDisconnect }) {
  const { exit } = useApp();
  const [status,       setStatus]       = useState('connecting');
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [injecting,    setInjecting]    = useState(false);
  const [disconnected, setDisconnected] = useState(false);
  const [reason,       setReason]       = useState('');

  const streamRef = useRef(null);   // SSH shell stream
  const clientRef = useRef(null);   // SSH Client instance
  const localRef  = useRef(null);   // child_process for local mode
  const lineBuf   = useRef('');     // stdin line buffer for command interception

  // Write raw bytes to stdout (outside ink's renderer)
  const raw = (data) => process.stdout.write(data);

  const terminate = useCallback((msg) => {
    streamRef.current?.end();
    clientRef.current?.end();
    localRef.current?.kill();
    setReason(msg);
    setDisconnected(true);
  }, []);

  // ── Inject a notebook script ─────────────────────────────────────────────
  const inject = useCallback((num) => {
    const script = sleeves[num];
    if (!script) {
      raw(`\r\n\x1b[31m✗  Unknown scripture [${num}]\x1b[0m\r\n`);
      return;
    }
    setInjecting(true);
    const target = streamRef.current ?? localRef.current?.stdin;
    if (!target || target.destroyed) { setInjecting(false); return; }

    raw(`\r\n\x1b[31m╔${'═'.repeat(60)}╗\x1b[0m\r\n`);
    raw(`\x1b[33m  ✠  INJECTING: ${script.name}\x1b[0m\r\n`);
    raw(`\x1b[37m  ${script.description}\x1b[0m\r\n`);
    raw(`\x1b[31m╚${'═'.repeat(60)}╝\x1b[0m\r\n`);

    let i = 0;
    const next = () => {
      if (i >= script.commands.length) { setInjecting(false); return; }
      target.write(script.commands[i++] + '\n');
      setTimeout(next, 350);
    };
    next();
  }, []);

  // ── Connect on mount ─────────────────────────────────────────────────────
  useEffect(() => {
    if (skull.local) {
      // Local shell passthrough
      const sh = spawn(process.env.SHELL || '/bin/bash', [], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, TERM: 'xterm-256color' },
      });
      localRef.current = sh;
      sh.stdout.on('data', raw);
      sh.stderr.on('data', raw);
      sh.on('close', code => terminate(`Shell exited (code ${code})`));
      setStatus('connected');
    } else {
      const conn = new Client();
      clientRef.current = conn;

      let privateKey;
      if (skull.keyFile) {
        const keyPath = skull.keyFile.replace(/^~/, homedir());
        try { privateKey = readFileSync(keyPath); } catch { /* no key */ }
      }

      const auth = skull.password ? { password: skull.password }
                 : privateKey     ? { privateKey }
                 : {};

      conn
        .on('ready', () => {
          conn.shell(
            { term: 'xterm-256color', rows: process.stdout.rows ?? 24, cols: process.stdout.columns ?? 80 },
            (err, stream) => {
              if (err) { terminate(`Shell error: ${err.message}`); return; }
              streamRef.current = stream;
              stream.on('data', raw);
              stream.stderr?.on('data', raw);
              stream.on('close', () => terminate('Remote shell closed.'));
              setStatus('connected');
            }
          );
        })
        .on('error', err => terminate(`SSH error: ${err.message}`))
        .connect({ host: skull.host, port: skull.port, username: skull.username, ...auth, readyTimeout: 10000 });
    }

    return () => { streamRef.current?.end(); clientRef.current?.end(); localRef.current?.kill(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Pipe stdin → remote; intercept /commands ─────────────────────────────
  useEffect(() => {
    if (status !== 'connected') return;

    const onData = (chunk) => {
      const text = chunk.toString();
      lineBuf.current += text;

      if (text.includes('\r') || text.includes('\n')) {
        const line = lineBuf.current.replace(/[\r\n]+$/, '');
        lineBuf.current = '';

        if (line.trimStart().startsWith('/notebook')) {
          setNotebookOpen(p => !p);
          return;
        }
        if (line.trimStart().startsWith('/inject ')) {
          inject(line.trim().split(' ')[1]);
          return;
        }
        if (line.trimStart().startsWith('/disconnect')) {
          terminate('Operator-initiated disconnection.');
          return;
        }
      }

      const target = streamRef.current ?? localRef.current?.stdin;
      if (target && !target.destroyed) target.write(chunk);
    };

    process.stdin.setRawMode?.(true);
    process.stdin.resume();
    process.stdin.on('data', onData);
    return () => process.stdin.removeListener('data', onData);
  }, [status, inject, terminate]);

  // ── Ctrl+X → force disconnect ────────────────────────────────────────────
  useInput((char, key) => {
    if (key.ctrl && char === 'x') terminate('Operator force-disconnect (Ctrl+X).');
  });

  if (disconnected) {
    return React.createElement(DisconnectScreen, { skull, reason, onBack: onDisconnect });
  }

  if (status === 'connecting') {
    return React.createElement(Box, { paddingLeft: 2, marginTop: 1 },
      React.createElement(Text, { color: 'yellow', bold: true },
        `  » Initiating sacred link to ${skull.designation} ...`
      )
    );
  }

  return React.createElement(Box, { flexDirection: 'column' },
    React.createElement(StatusBar, { skull, status, notebookOpen }),
    notebookOpen
      ? React.createElement(Notebook, { injecting })
      : null
  );
}
