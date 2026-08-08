#!/usr/bin/env node
/**
 * ServoSkull — Adeptus Mechanicus Servo-Skull Uplink Terminal
 * ────────────────────────────────────────────────────────────
 * Powered by ratatat (ink-compatible API)
 *
 * Usage:
 *   npm start
 *   node index.js
 *
 * Key bindings (inside a live terminal session):
 *   /notebook          toggle the script-injection notebook HUD
 *   /inject <n>        push scripture n to the connected skull
 *   /disconnect        gracefully terminate the uplink
 *   Ctrl+X             force-disconnect
 *   Ctrl+C             exit the application entirely
 *
 * To add / edit servo-skulls:  src/config/skulls.json
 * To add / edit scriptures:    src/config/scripts.json
 */
import React from 'react';
import { render } from 'ink';
import { App } from './src/app.js';

process.on('SIGINT', () => {
  process.stdout.write('\x1b[?25h\x1b[0m\n');
  process.stdout.write('\n  ✠  Machine spirit disengaged. Glory to the Omnissiah.  ✠\n\n');
  process.exit(0);
});

render(React.createElement(App, null));
