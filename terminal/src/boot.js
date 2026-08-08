/**
 * Boot sequence — litany of activation plays before the service prompt.
 */
import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import { Banner, RULE } from './banner.js';

const LITANY = [
  { delay: 0,    text: 'INITIALISING SERVO-SKULL UPLINK TERMINAL v4.0 ...', color: 'yellow' },
  { delay: 280,  text: 'Loading Binharic Cant Interpreter ...', color: 'white' },
  { delay: 480,  text: 'Sanctifying vox-channel encryption matrices ...', color: 'white' },
  { delay: 680,  text: 'Invoking Rite of Machine Communion ...', color: 'white' },
  { delay: 880,  text: 'Querying Omnissiah datacore ... access GRANTED', color: 'green' },
  { delay: 1050, text: 'Loading servo-skull registry ...', color: 'white' },
  { delay: 1220, text: 'Booting personality sleeve management daemon ...', color: 'white' },
  { delay: 1400, text: 'Running self-diagnostics on cogitator unit ...', color: 'white' },
  { delay: 1530, text: '  ✓  Ocular augmetics ............. NOMINAL', color: 'green' },
  { delay: 1620, text: '  ✓  Vox-caster array ............. NOMINAL', color: 'green' },
  { delay: 1710, text: '  ✓  Locomotor servos ............. NOMINAL', color: 'green' },
  { delay: 1800, text: '  ✓  Motive force reserves ........ NOMINAL', color: 'green' },
  { delay: 1980, text: 'ALL SYSTEMS NOMINAL — PRAISE THE OMNISSIAH', color: 'yellow' },
  { delay: 2260, text: 'READY.', color: 'red' },
];

// Simple inline progress bar (no dep needed)
function ProgressBar({ value, max = 100, width = 32 }) {
  const filled = Math.round((Math.min(value, max) / max) * width);
  const empty  = width - filled;
  return React.createElement(Text, { color: 'red' },
    '[' + '█'.repeat(filled) + '░'.repeat(empty) + '] ' + value + '%'
  );
}

export function BootSequence({ onDone }) {
  const [lines,    setLines]    = useState([]);
  const [progress, setProgress] = useState(0);
  const [booting,  setBooting]  = useState(true);

  useEffect(() => {
    const timers = LITANY.map(({ delay, text, color }, i) =>
      setTimeout(() => {
        setLines(prev => [...prev, { text, color }]);
        setProgress(Math.round(((i + 1) / LITANY.length) * 100));
        if (i === LITANY.length - 1) {
          setTimeout(() => {
            setBooting(false);
            onDone();
          }, 380);
        }
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return React.createElement(Box, { flexDirection: 'column', paddingLeft: 1 },
    React.createElement(Banner, null),

    React.createElement(Box, { marginTop: 1, flexDirection: 'column' },
      ...lines.map((l, i) =>
        React.createElement(Text, { key: i, color: l.color }, '  ' + l.text)
      )
    ),

    React.createElement(Box, { marginTop: 1 },
      React.createElement(Text, { color: 'white', dimColor: true }, '  COGITATOR INIT: '),
      React.createElement(ProgressBar, { value: progress })
    ),

    booting
      ? React.createElement(Box, { marginTop: 1 },
          React.createElement(Text, { color: 'yellow' }, '  '),
          React.createElement(Text, { color: 'yellow', dimColor: true },
            '  Performing Rites of Awakening ...'
          )
        )
      : null
  );
}
