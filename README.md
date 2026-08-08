# ServoSkull

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

  ✠  ADEPTUS MECHANICUS — SERVO-SKULL REMOTE INTERFACE  ✠
```

A Warhammer 40K–themed remote management system for Raspberry Pi
servo-skull units. Two interfaces, one machine spirit.

---

## Project Structure

```
ServoSkull/
  web/        Warhammer 40K web interface (browser-based remote control)
  terminal/   Adeptus Mechanicus TUI (Node.js terminal uplink app)
  *.py        Pi-side utility scripts (LED, speech, lamp control)
```

---

## `web/` — Browser Interface

The original Servo-Skull remote control panel. A Warhammer 40K–styled
web UI for controlling the Pi over a local network — surveillance,
mobility, audio, speech, and video subsystems.

**Serve it from the Pi:**
```bash
cd web
python3 -m http.server 8080
# open http://<pi-ip>:8080 on any device on your network
```

**Pages:**

| Page | Function |
|---|---|
| `index.html` | Main frame — Aquila header, nav bar, content pane |
| `orders.html` | Command interface |
| `audio.html` | Audio / sound control |
| `speech.html` | Text-to-speech |
| `video.html` | Video / webcam feed |
| `mobility.html` | Movement / locomotor servos |
| `support.html` | Diagnostics and support |

Assets: `css/`  `imgs/`  `js/`  `fonts/PressStart2P-Regular.ttf`

---

## `terminal/` — TUI Uplink App

A Warhammer 40K themed Node.js terminal application for remotely
managing servo-skull units via SSH. Runs on any machine; opens a secure
uplink to any registered skull by service number.

**Install & run:**
```bash
cd terminal
npm install
npm start
```

**App flow:**
```
[BOOT LITANY] → [SERVICE PROMPT] → [SSH TERMINAL] → [back to PROMPT]
```

**In-session commands:**

| Command | Action |
|---|---|
| `/notebook` | Toggle the scripture notebook HUD |
| `/inject <n>` | Push install script #n to the connected skull |
| `/disconnect` | Gracefully terminate uplink |
| `Ctrl+X` | Force-disconnect |
| `Ctrl+C` | Exit app |

Config: `terminal/src/config/skulls.json` · `terminal/src/config/scripts.json`

---

## Pi-Side Scripts

| Script | Purpose |
|---|---|
| `weblamp.py` | Web-triggered LED lamp control |
| `blinking_led.py` | Blink pattern for LED array |

---

## Hardware

Each servo-skull unit is a Raspberry Pi with:

- Touchscreen or HDMI display
- USB webcam / Pi Camera Module
- USB microphone or ReSpeaker HAT
- USB speaker or 3.5mm audio out
- Optional: GPIO LEDs, motor driver, laser diode

---

*Adeptus Mechanicus — [BIG0TIME Index](https://github.com/polerix/BIG0TIME/blob/main/index.html)*  
*Praise the Omnissiah.*
