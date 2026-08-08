/**
 * Notebook HUD — inline panel showing injectable scriptures.
 */
import React from 'react';
import { Box, Text } from 'ink';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir  = dirname(fileURLToPath(import.meta.url));
const { sleeves } = JSON.parse(
  readFileSync(join(__dir, 'config/scripts.json'), 'utf8')
);

export { sleeves };

export function Notebook({ injecting }) {
  const entries = Object.entries(sleeves);
  const W = 68;
  const border = c => `  ║${c}║`;

  return React.createElement(Box, { flexDirection: 'column', marginTop: 1 },

    React.createElement(Text, { color: 'red', bold: true },
      `  ╔${'═'.repeat(W)}╗`
    ),
    React.createElement(Text, { color: 'red', bold: true },
      `  ║  ✠  ADEPTUS MECHANICUS — SANCTIONED SCRIPTURE REPOSITORY${'  '.padEnd(W - 54)}║`
    ),
    React.createElement(Text, { color: 'red', bold: true },
      `  ╠${'═'.repeat(W)}╣`
    ),

    ...entries.flatMap(([num, s]) => [
      React.createElement(Box, { key: `${num}-h` },
        React.createElement(Text, { color: 'red', bold: true }, '  ║ '),
        React.createElement(Text, { color: 'cyan', bold: true  }, `[${num}] `),
        React.createElement(Text, { color: 'yellow', bold: true}, s.name.padEnd(32)),
        React.createElement(Text, { color: 'white', dimColor: true }, s.category.padEnd(W - 38)),
        React.createElement(Text, { color: 'red', bold: true  }, ' ║')
      ),
      React.createElement(Box, { key: `${num}-d` },
        React.createElement(Text, { color: 'red', bold: true }, '  ║    '),
        React.createElement(Text, { color: 'white', dimColor: true }, s.description.slice(0, W - 6).padEnd(W - 6)),
        React.createElement(Text, { color: 'red', bold: true }, '║')
      ),
    ]),

    React.createElement(Text, { color: 'red', bold: true },
      `  ╠${'═'.repeat(W)}╣`
    ),

    React.createElement(Box, {},
      React.createElement(Text, { color: 'red', bold: true }, '  ║  '),
      injecting
        ? React.createElement(Text, { color: 'yellow', bold: true },
            `INJECTING SACRED SCRIPTURE INTO MACHINE SPIRIT ...${''.padEnd(W - 51)}`
          )
        : React.createElement(Text, { color: 'white', dimColor: true },
            `/inject <n> to inject  ·  /notebook to close${''.padEnd(W - 46)}`
          ),
      React.createElement(Text, { color: 'red', bold: true }, '║')
    ),

    React.createElement(Text, { color: 'red', bold: true },
      `  ╚${'═'.repeat(W)}╝`
    )
  );
}
