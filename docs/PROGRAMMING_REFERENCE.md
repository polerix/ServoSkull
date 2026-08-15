# Servo-Skull Programming Reference

Hardware-agnostic. This defines the command/control model every unit
in the register should conform to, regardless of which board runs it.
`FIRMWARE.md` covers the Raspberry Pi implementation of this model.

---

## 1. Classification (mandatory at registration)

Every unit is registered as one of two classes. This is not flavor —
it changes what guarantees you can make about the unit's behavior.

| | **FIRMWARE-CLASS** | **LEGACY-CLASS** |
|---|---|---|
| Behavior source | Fully determined by the priority stack below (§2) | Priority stack constrains, but doesn't fully determine, behavior — there's a persistent state/personality layer riding on top (custom scripts, LLM persona, learned config) |
| Predictability | Same input → same output, always | Same input can drift over time / across sessions |
| Failsafes | Reliable — nothing in the stack to override them | Advisory — a strong enough persona/state layer is the mechanism by which failsafes get skipped, same as the canonical case (Servo-Skull Reditus, `Warhammer 40,000: Mechanicus` — a retained personality that outgrew its intended non-agentic role) |
| Use it for | Anything running unattended, anything where you need to guarantee it stops when told | Units where the personality/persona *is* the point — display pieces, con/party units, anything voice-interactive where charm matters more than determinism |

Canon backs this split up: most servo-skulls in Black Library fiction
are anonymous, interchangeable tools (Firmware-Class in spirit — pure
function, no retained self), but a minority are written as carrying
real personality or backstory weight, Reditus and Rob Sanders'
"Father" (*Atlas Infernal*) among them. See
[`LORE_COMPENDIUM.md`](./LORE_COMPENDIUM.md) for the full research —
it's the source for this table and for §3 below.

Record the class in `REGISTRATION_TRACKING.md` at intake. Don't infer
it after the fact.

---

## 2. Behavioral Priority Stack

Baseline stack every unit should implement, in priority order. Lower
numbers pre-empt higher numbers.

1. **E-STOP** — hardware or software kill switch halts all motion,
   audio, and lighting immediately. Always the highest priority,
   always polled, never gated behind any other check.
2. **Task execution** — the unit's designated function (see subsystem
   list below).
3. **Non-aggression / non-alarming default** — no unprompted motion,
   sound, or light toward a person unless the current mode explicitly
   calls for it (e.g. don't have the jaw servo fire or eyes light up
   just because someone walked past a PIR sensor, unless that's the
   configured behavior for that unit).
4. **Fault response** — on sensor fault, servo stall, or comm loss:
   stop, don't guess. Retry is opt-in per subsystem, not default.
5. **Recall/return** — on prolonged silence from controller (see
   timeout spec below) or on physical relocation past a geofence/
   distance threshold (if using a positioning sensor), return to a
   defined idle/home state.

This maps directly onto the old TUI's `/inject`, `/disconnect`, and
`Ctrl+X` semantics if you're driving a unit from `terminal/` (or its
successor) — treat those as manual overrides of stack items 1 and 5.

---

## 3. Subsystems (per the hardware list in the root README)

Each of these maps to a functional role Black Library fiction actually
assigns to servo-skulls — see
[`LORE_COMPENDIUM.md`](./LORE_COMPENDIUM.md) §2 for the full role
table and citations. That's not decoration: it's a sanity check that
the command set below isn't inventing capabilities canon never gives
these units.

| Subsystem | Typical commands | Notes | Canon role |
|---|---|---|---|
| **Mobility** | `move.pan`, `move.tilt`, `move.jaw` | Servo-driven. Rate-limit in firmware, not just in the controller — a bad command from a flaky connection shouldn't be able to slam a servo. | Every role — hovering/orbiting on anti-grav suspensors is the baseline behavior across all of them |
| **Audio** | `audio.play(clip)`, `audio.stop` | Pre-recorded clips preferred over live synthesis for anything latency-sensitive. | Vox-relay / proclamation (amplifying a speaker to a crowd) |
| **Speech (TTS)** | `speech.say(text)` | Queue, don't interrupt — let a sentence finish before accepting the next. | Vox-relay / proclamation |
| **Video/Surveillance** | `video.stream.start/stop`, `video.snapshot` | Treat as opt-in per session, not always-on, unless you've deliberately decided otherwise — this is the subsystem most likely to raise privacy questions if this unit is ever around anyone who didn't agree to it. | Pict-recorder / archivist; also the surveillance half of Inquisitorial retinue |
| **Lighting** | `lamp.set(pattern)` | Maps to `weblamp.py` / `blinking_led.py` in the current Pi scripts. | Censer-bearer / ritual (candle/censer-light) |

Two roles from the lore compendium have no subsystem yet, flagged as
gaps rather than built speculatively: **guardian/armed patrol**
(mounted weapon + threat response) and **medicae/field-surgical**
(tool-arm attachment). Add these only if a real unit needs them.

---

## 4. Comm Channels

| Channel | Use case | Reliability |
|---|---|---|
| Local HTTP (the `web/` panel, or its Vite-app successor) | Same-network manual control | High — direct, no intermediary |
| SSH uplink (the `terminal/` TUI) | Remote management, scripted installs via `/inject` | High, but requires network path to the Pi |
| MQTT / pub-sub (not yet in this repo) | Multi-unit fleets, home-automation integration | Add this if/when you're running more than one unit and want a single control plane — flagging as a gap, not building it speculatively |

---

## 5. Command Reference Table (canonical command set)

Fill this in as you formalize the actual API. Skeleton below — this
is the contract between `FIRMWARE.md`'s implementation and whatever
controls it (web panel, TUI, voice, whatever).

| Command | Args | Effect | Class restriction |
|---|---|---|---|
| `estop` | — | Immediate halt, all subsystems | None — always available |
| `status` | — | Returns current state, uptime, last-seen | None |
| `move.pan` | `angle` | Set pan servo angle | None |
| `move.tilt` | `angle` | Set tilt servo angle | None |
| `move.jaw` | `open\|closed\|angle` | Jaw servo | None |
| `audio.play` | `clip_id` | Play a pre-loaded clip | None |
| `speech.say` | `text` | TTS queue | None |
| `lamp.set` | `pattern` | LED pattern | None |
| `persona.load` | `persona_id` | Load a persona/state profile | **Legacy-Class only** — a Firmware-Class unit shouldn't have a persona slot at all; if it does, that's a classification error, fix the register entry |
