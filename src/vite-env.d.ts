/// <reference types="vite/client" />

// Vite's `?raw` suffix imports a file's contents as a plain string.
// Used for pulling docs/*.md into the Codex pages verbatim.
declare module '*.md?raw' {
  const content: string;
  export default content;
}

// tw-elements ships no official type declarations; it's imported only for
// its side effects (registering web components / Bootstrap-style JS
// behavior), so an ambient ("any") module is sufficient.
declare module 'tw-elements';
