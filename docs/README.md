# Documentation Index

```
✠ ADEPTUS MECHANICUS — SERVO-SKULL TECHNICAL ARCHIVE ✠
```

This directory holds the operational documentation for the ServoSkull
project. It is separate from the `src/` React showcase site — the
showcase presents the project; these documents run it.

| Document | Covers |
|---|---|
| [`PROGRAMMING_REFERENCE.md`](./PROGRAMMING_REFERENCE.md) | Command/control model, behavioral priority stack, comm channels — the logic layer, hardware-agnostic |
| [`FIRMWARE.md`](./FIRMWARE.md) | Raspberry Pi build target — GPIO map, subsystem scripts, install/boot sequence |
| [`REGISTRATION_TRACKING.md`](./REGISTRATION_TRACKING.md) | Per-unit asset register — one entry per physical skull you build/deploy |

## Status note

Root `README.md` accurately describes the current repo (React/Vite
showcase site, deployed to GitHub Pages). No Pi-side or device-control
code lives in this repo yet — `FIRMWARE.md` and the network-setup
section of `PROGRAMMING_REFERENCE.md` are forward-looking specs,
written ahead of that code existing here. Update this note when
firmware code actually lands in the repo, so this stops being
aspirational and starts being documentation of something real.
