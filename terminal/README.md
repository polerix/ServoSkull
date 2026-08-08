# ServoSkull Uplink Terminal

```
             ══╦═══╦═══╦═══╦══
             ▀█╦███╦█▀█╦███╦█▀
              █╠███╠█╬█╠███╠█
               ╚╦███╦███╦███╦╝
           ╔════╩═══╩═╦═╩═══╩════╗
           ║   ╔══════╩══════╗   ║
           ╚═══╝    ╔══╗    ╚═══╝
                  ╔═╝  ╚═╗
                  ╚═══════╝

  ✠  ADEPTUS MECHANICUS — OMNISSIAH VULT — SERVO-SKULL UPLINK  ✠
```

A Warhammer 40K–themed terminal-UI application for remotely managing
servo-skull Raspberry Pi units.  Built with
[ratatat](https://github.com/geoffmiller/ratatat) (ink-compatible API).

---

## Features

| Feature | Description |
|---|---|
| **Boot litany** | Animated startup sequence with Adeptus Mechanicus prayers |
| **Skull registry** | Enter a service number → live preview of skull info → connect |
| **SSH uplink** | Full shell session to the remote Pi via ssh2 |
| **Local passthrough** | Debug mode (service number `001`) launches a local shell |
| **Notebook HUD** | Overlay panel listing injectable scriptures; toggle with `/notebook` |
| **Script injection** | Push multi-step install scripts to the live shell with `/inject <n>` |
| **Disconnect / re-connect** | Clean teardown + return to the service-number prompt |

---

## Installation

```bash
cd terminal
npm install
```

---

## Usage

```bash
npm start
# or
node index.js
```

Boot sequence plays, then enter a service number at the prompt:

| Service # | Unit |
|---|---|
| `690` | SERVO-SKULL.690 [SURVEILLANCE] — 192.168.1.90 |
| `691` | SERVO-SKULL.691 [MOBILITY] — 192.168.1.91 |
| `001` | LOCAL-DEBUG — local shell passthrough |

---

## Terminal key bindings (inside a live session)

| Command | Action |
|---|---|
| `/notebook` | Toggle the script notebook HUD |
| `/inject 3` | Inject scripture #3 to the remote shell |
| `/disconnect` | Gracefully terminate the uplink |
| `Ctrl+X` | Force-disconnect |
| `Ctrl+C` | Exit the app entirely |

---

## Adding Servo-Skulls

Edit `src/config/skulls.json`:

```json
{
  "registry": {
    "692": {
      "designation": "SERVO-SKULL.692 [AUDIO]",
      "host": "192.168.1.92",
      "port": 22,
      "username": "pi",
      "keyFile": "~/.ssh/id_rsa",
      "password": null,
      "description": "Audio/vox-caster unit.",
      "blessing": "May thy voice carry across the void."
    }
  }
}
```

## Adding Scriptures

Edit `src/config/scripts.json`:

```json
{
  "sleeves": {
    "7": {
      "name": "MY-CUSTOM-SLEEVE",
      "description": "Does something awesome on the Pi",
      "category": "Service Package",
      "commands": [
        "sudo apt-get install -y my-package",
        "echo '[ADEPTUS] Sleeve mounted.'"
      ]
    }
  }
}
```

---

## Notes

- Currently uses **ink** as the TUI renderer (same API as ratatat).
  Once `@ratatat/core-linux-x64-gnu` is published to npm, swap the
  `"ink"` dependency in `package.json` for `"@ratatat/react"` and
  update the import in `src/banner.js`, `src/boot.js`,
  `src/servicePrompt.js`, `src/terminal.js`, and `src/app.js`
  from `'ink'` → `'@ratatat/react'`.  No other changes needed.
- SSH auth uses key-file by default; set `"password"` in skulls.json
  to use password auth instead.
- Tested on Node.js 18+.

*Praise the Omnissiah.*
