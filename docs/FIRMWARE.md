# Firmware — Raspberry Pi

Implementation target for the command model in `PROGRAMMING_REFERENCE.md`.

---

## 1. Reference Hardware (per root README)

- Raspberry Pi (any model with enough GPIO + USB — Pi 4/5 recommended
  if running video + TTS + servos concurrently; a Zero 2 W is workable
  for audio/lighting-only units)
- Touchscreen or HDMI display
- USB webcam or Pi Camera Module
- USB microphone or ReSpeaker HAT
- USB speaker or 3.5mm audio out
- Optional: GPIO LEDs, motor driver (servo control), laser diode

Fill in actual part numbers/wiring per unit in that unit's
`REGISTRATION_TRACKING.md` entry — this file stays generic across
units, the register holds the specifics.

---

## 2. GPIO Map (template — populate per build)

| Pin (BCM) | Function | Notes |
|---|---|---|
| — | Jaw servo PWM | |
| — | Pan servo PWM | |
| — | Tilt servo PWM | |
| — | LED array (data) | Drives `weblamp.py` / `blinking_led.py` |
| — | E-stop button (input, pulled up) | Wire this to a physical interrupt, not a polled loop — see §4 |
| — | Status LED (onboard "alive" indicator) | |

Keep this table current in the actual repo file, not just here — it's
the single source of truth for anyone rebuilding a unit.

---

## 3. Existing Pi-Side Scripts

**Not in this repo.** This repo (per current root README) is the React
showcase site only — `weblamp.py`, `blinking_led.py`, and the rest of
the old Pi/terminal codebase were removed in commit `027c4fc` and
backed up externally to `/Volumes/Clay/Servo_Skull_690`. This file is
a forward-looking spec, written before any firmware code lives in
this repo — treat everything below as target design, not "documents
what's running," until code actually lands here.

| Script (planned/external) | Purpose |
|---|---|
| `weblamp.py` | Web-triggered LED lamp control |
| `blinking_led.py` | Blink pattern for LED array |

Neither implements an e-stop check (§4) as far as the external backup
is concerned — first gap to close once this code is reintroduced here,
not a documentation nice-to-have.

---

## 4. E-Stop — Implementation Requirement

Per `PROGRAMMING_REFERENCE.md` §2, item 1, this pre-empts everything.
Minimum implementation:

```python
# Sketch, not drop-in code — adapt to actual GPIO library in use (RPi.GPIO / gpiozero)
import signal

ESTOP_PIN = <pin>  # from GPIO map above

def estop_handler(channel):
    # Kill all servo PWM, stop audio playback, blank LEDs
    # This must NOT depend on any subsystem being in a good state —
    # assume something is already broken when this fires.
    ...

GPIO.add_event_detect(ESTOP_PIN, GPIO.FALLING, callback=estop_handler, bouncetime=200)
```

Interrupt-driven, not polled in the main loop — a hung main loop
(stuck TTS call, blocked network read) should not be able to prevent
e-stop from firing.

---

## 5. Boot Sequence

```
[power on] → [systemd service starts] → [GPIO init] → [subsystem self-check]
    → [register with controller / announce presence] → [idle/home state]
```

Recommend running the main control process as a `systemd` service so
it survives reboots and restarts on crash. Skeleton unit file:

```ini
[Unit]
Description=ServoSkull control daemon
After=network.target

[Service]
ExecStart=/usr/bin/python3 /home/pi/ServoSkull/main.py
Restart=on-failure
User=pi

[Install]
WantedBy=multi-user.target
```

No `main.py` or unified daemon exists yet — per §3, the old scripts
were standalone utilities, not a single entrypoint, and none of that
code is in this repo currently. This is the target shape once
firmware code is (re)added here, not a description of anything that
runs today.

---

## 6. Network / Comm Setup

Also forward-looking — no control surface for a physical unit exists
in this repo yet (the current deployed site, per root README, is the
static Vite showcase on GitHub Pages, not a device control panel).

- Local HTTP panel: Pi serves a control UI on the local network
  (`python3 -m http.server` or equivalent) once one exists here.
- SSH uplink: a TUI-based remote control app, once one exists here —
  standard SSH, key-based auth recommended over password auth for
  anything reachable outside a trusted LAN.
