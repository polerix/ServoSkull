import React from 'react';
import { Box, Text } from 'ink';

export const AQUILA = `
             ══╦═══╦═══╦═══╦══
             ▀█╦███╦█▀█╦███╦█▀
              █╠███╠█╬█╠███╠█
               ╚╦███╦███╦███╦╝
           ╔════╩═══╩═╦═╩═══╩════╗
           ║   ╔══════╩══════╗   ║
           ╚═══╝    ╔══╗    ╚═══╝
                  ╔═╝  ╚═╗
                  ╚═══════╝`;

export const DIVIDER  = '═'.repeat(70);
export const RULE     = '─'.repeat(70);

export function Banner({ subtitle }) {
  return React.createElement(Box, { flexDirection: 'column' },
    React.createElement(Text, { color: 'red', bold: true }, AQUILA),
    React.createElement(Box, { marginTop: 1 },
      React.createElement(Text, { color: 'red', bold: true }, DIVIDER)
    ),
    React.createElement(Box, {},
      React.createElement(Text, { color: 'yellow', bold: true },
        ' ✠  ADEPTUS MECHANICUS — OMNISSIAH VULT — SERVO-SKULL UPLINK  ✠ '
      )
    ),
    React.createElement(Box, {},
      React.createElement(Text, { color: 'red', bold: true }, DIVIDER)
    ),
    subtitle
      ? React.createElement(Box, { marginTop: 1 },
          React.createElement(Text, { color: 'white', dimColor: true }, '  ' + subtitle)
        )
      : null
  );
}
