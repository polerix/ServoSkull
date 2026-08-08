/**
 * Root application — manages three screens in sequence:
 *   boot  →  servicePrompt  →  terminal (→ back to servicePrompt on disconnect)
 */
import React, { useState, useCallback } from 'react';
import { Box } from 'ink';
import { BootSequence }   from './boot.js';
import { ServicePrompt }  from './servicePrompt.js';
import { Terminal }       from './terminal.js';

export function App() {
  const [screen,     setScreen]     = useState('boot');
  const [connection, setConnection] = useState(null);

  const handleBootDone  = useCallback(() => setScreen('prompt'), []);

  const handleConnect   = useCallback((skullId, skull) => {
    setConnection({ skullId, skull });
    setScreen('terminal');
  }, []);

  const handleDisconnect = useCallback(() => {
    setConnection(null);
    setScreen('prompt');
  }, []);

  return React.createElement(Box, { flexDirection: 'column' },
    screen === 'boot'     && React.createElement(BootSequence,  { onDone: handleBootDone }),
    screen === 'prompt'   && React.createElement(ServicePrompt, { onConnect: handleConnect }),
    screen === 'terminal' && connection &&
      React.createElement(Terminal, {
        skullId:      connection.skullId,
        skull:        connection.skull,
        onDisconnect: handleDisconnect,
      })
  );
}
