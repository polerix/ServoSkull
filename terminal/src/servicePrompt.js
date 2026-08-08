/**
 * Service-number prompt — where the operator types the skull designation.
 */
import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { Banner, DIVIDER, RULE } from './banner.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const registry = JSON.parse(
  readFileSync(join(__dir, 'config/skulls.json'), 'utf8')
).registry;

const PRAYERS = [
  'Praise the Omnissiah. The Machine Spirit stirs.',
  'Blessed is the mind too small for doubt.',
  'Knowledge is power — guard it well.',
  'In the name of the Machine God, let the connection be forged.',
  'The flesh is weak. The machine endures.',
];

export function ServicePrompt({ onConnect }) {
  const [input,      setInput]      = useState('');
  const [error,      setError]      = useState('');
  const [connecting, setConnecting] = useState(false);
  const [prayer]  = useState(PRAYERS[Date.now() % PRAYERS.length]);
  const [pulse,   setPulse]         = useState(true);

  // Cursor blink effect
  React.useEffect(() => {
    if (connecting) return;
    const t = setInterval(() => setPulse(p => !p), 530);
    return () => clearInterval(t);
  }, [connecting]);

  useInput((char, key) => {
    if (connecting) return;

    if (key.return) {
      const id = input.trim();
      if (!id) { setError('SERVICE NUMBER REQUIRED.'); return; }
      const skull = registry[id];
      if (!skull) {
        setError(`UNKNOWN DESIGNATION [${id}] — not found in registry.`);
        setInput('');
        return;
      }
      setError('');
      setConnecting(true);
      setTimeout(() => onConnect(id, skull), 2600);
      return;
    }

    if (key.backspace || key.delete) {
      setInput(p => p.slice(0, -1));
      setError('');
      return;
    }

    if (key.escape) { setInput(''); setError(''); return; }

    if (char && char.length === 1 && !key.ctrl && !key.meta) {
      setInput(p => p + char);
      setError('');
    }
  });

  const preview = registry[input.trim()];

  return React.createElement(Box, { flexDirection: 'column', paddingLeft: 1 },
    React.createElement(Banner, { subtitle: prayer }),

    // ── Box header ──────────────────────────────────────────────────────────
    React.createElement(Box, { marginTop: 1, flexDirection: 'column' },
      React.createElement(Text, { color: 'yellow', bold: true },
        '  ┌──────────────────────────────────────────────────────────────┐'
      ),
      React.createElement(Text, { color: 'yellow', bold: true },
        '  │  SECURE UPLINK TERMINAL  ·  ENCRYPTION: OMNISSIAH STANDARD  │'
      ),
      React.createElement(Text, { color: 'yellow', bold: true },
        '  └──────────────────────────────────────────────────────────────┘'
      )
    ),

    // ── Registry listing ─────────────────────────────────────────────────
    React.createElement(Box, { marginTop: 1, paddingLeft: 2 },
      React.createElement(Text, { color: 'white', dimColor: true }, '  REGISTERED: '),
      ...Object.entries(registry).map(([num, s]) =>
        React.createElement(Text, { key: num, color: 'cyan' }, `[${num}]  `)
      )
    ),

    // ── Input line ───────────────────────────────────────────────────────
    React.createElement(Box, { marginTop: 1, paddingLeft: 2 },
      React.createElement(Text, { color: 'red', bold: true }, '  ► '),
      React.createElement(Text, { color: 'white' }, 'SERVICE NUMBER: '),
      React.createElement(Text, { color: 'green', bold: true }, input),
      !connecting && React.createElement(Text, { color: 'green' }, pulse ? '█' : ' ')
    ),

    // ── Preview ──────────────────────────────────────────────────────────
    preview && !connecting
      ? React.createElement(Box, { marginTop: 1, paddingLeft: 4, flexDirection: 'column' },
          React.createElement(Text, { color: 'red', dimColor: true }, '  ' + RULE.slice(0, 60)),
          React.createElement(Text, { color: 'cyan', bold: true }, `  ✠  ${preview.designation}`),
          React.createElement(Text, { color: 'white', dimColor: true }, `     HOST : ${preview.host}:${preview.port}`),
          React.createElement(Text, { color: 'white', dimColor: true }, `     ${preview.description}`),
          React.createElement(Text, { color: 'yellow', dimColor: true }, `     "${preview.blessing}"`),
          React.createElement(Text, { color: 'red', dimColor: true }, '  ' + RULE.slice(0, 60))
        )
      : null,

    // ── Error ────────────────────────────────────────────────────────────
    error
      ? React.createElement(Box, { marginTop: 1, paddingLeft: 4 },
          React.createElement(Text, { color: 'red', bold: true }, '  ✗  '),
          React.createElement(Text, { color: 'red' }, error)
        )
      : null,

    // ── Connecting animation ─────────────────────────────────────────────
    connecting
      ? React.createElement(Box, { marginTop: 1, paddingLeft: 4, flexDirection: 'column' },
          React.createElement(Text, { color: 'red', dimColor: true }, '  ' + RULE.slice(0, 60)),
          React.createElement(Box, {},
            React.createElement(Text, { color: 'yellow', bold: true },
              `  » ESTABLISHING SACRED LINK TO ${registry[input.trim()]?.designation} ...`
            )
          ),
          React.createElement(Text, { color: 'white', dimColor: true }, '    Invoking Rite of Long-Haul Communication ...'),
          React.createElement(Text, { color: 'white', dimColor: true }, '    Anointing vox-channel with binharic cant ...'),
          React.createElement(Text, { color: 'white', dimColor: true }, `    Routing to ${registry[input.trim()]?.host} ...`),
          React.createElement(Text, { color: 'red', dimColor: true }, '  ' + RULE.slice(0, 60))
        )
      : null,

    // ── Footer ───────────────────────────────────────────────────────────
    React.createElement(Box, { marginTop: 2, paddingLeft: 2 },
      React.createElement(Text, { color: 'white', dimColor: true },
        '  [ENTER] Connect  [ESC] Clear  [CTRL+C] Disengage'
      )
    )
  );
}
