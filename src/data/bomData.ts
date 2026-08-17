// Phase 4: per-component procurement + firmware notes. The 5 rows named in
// docs/TEMPORAL_INTEGRITY_PROTOCOLS.md's BOM table are reproduced verbatim
// where they map onto a catalog entry (Core Processing boards, Pi Camera
// Module); everything else in the catalog gets a sourcing line in the same
// voice/vendor style, grounded in docs/FIRMWARE.md §1's reference hardware
// list rather than invented from scratch. Firmware notes cite the concrete
// script/library/section named in FIRMWARE.md §2-5.

export interface SourcingEntry {
  substitute: string;
  vendor: string;
  rationale: string;
}

export const SOURCING: Record<string, SourcingEntry> = {
  // Core Processing — Temporal Integrity Protocols doc keeps these
  // Pi-only (the ESP32-WROOM "Noosphere Transceiver" substitute is
  // explicitly not wired into the catalog, per that doc's Status note).
  'raspberry-pi-4': {
    substitute: 'Raspberry Pi 4',
    vendor: 'Adafruit / Direct supplier',
    rationale: 'Balanced compute + GPIO baseline for video/TTS/servos concurrently.',
  },
  'raspberry-pi-5': {
    substitute: 'Raspberry Pi 5',
    vendor: 'Adafruit / Direct supplier',
    rationale: 'Higher-throughput compute for heavier vision/inference workloads.',
  },
  'raspberry-pi-zero-2w': {
    substitute: 'Raspberry Pi Zero 2 W',
    vendor: 'Adafruit / Direct supplier',
    rationale: 'Minimal-footprint compute for lightweight, single-purpose builds.',
  },

  // Ocular Augur Arrays — direct doc match.
  'pi-camera-module': {
    substitute: 'Raspberry Pi HQ Camera Module',
    vendor: 'Adafruit / Direct supplier',
    rationale: 'Substitutes for red-lens sensorium and data-slate feedback loops.',
  },

  // Everything else — not named in the doc's table, sourced in the same
  // style from docs/FIRMWARE.md §1's reference hardware list.
  'gpio-status-led': {
    substitute: 'GPIO-addressable LED / LED array',
    vendor: 'Adafruit / Amazon',
    rationale: 'Onboard "alive" indicator and mood signaling, direct GPIO drive.',
  },
  'laser-diode': {
    substitute: '5mW laser diode module',
    vendor: 'Amazon',
    rationale: 'Targeting laser or ceremonial effect emitter, GPIO-switched.',
  },
  'respeaker-hat': {
    substitute: 'USB microphone or ReSpeaker HAT',
    vendor: 'Adafruit / Seeed',
    rationale: 'Far-field voice capture for wake-word and command input.',
  },
  'usb-speaker': {
    substitute: 'USB speaker or 3.5mm audio out module',
    vendor: 'Amazon',
    rationale: 'Audio output for vox-casting and alert tones.',
  },
  'auspex-antenna': {
    substitute: 'USB Wi-Fi/RF dongle or onboard antenna',
    vendor: 'Amazon / Local electronics distributor',
    rationale: 'Wireless telemetry uplink — RF/Wi-Fi scanning and beacon relay.',
  },
  'motor-driver-hat': {
    substitute: 'PWM/servo driver HAT (e.g. PCA9685-based)',
    vendor: 'Adafruit',
    rationale: 'PWM channel expansion for driving multiple servos/motors.',
  },
  'battery-pack': {
    substitute: 'USB-C power bank or dedicated Pi UPS HAT',
    vendor: 'Amazon / Adafruit',
    rationale: 'Portable power — untethers the skull from mains.',
  },
  'cooling-fan': {
    substitute: '5V GPIO/USB cooling fan',
    vendor: 'Amazon / Adafruit',
    rationale: 'Active cooling for sustained compute load.',
  },
  'jaw-servo': {
    substitute: 'Standard hobby micro servo (e.g. SG90/MG90S-class)',
    vendor: 'Amazon / Adafruit',
    rationale: 'Articulated mandible — vocalization sync and expression.',
  },
  'pan-servo': {
    substitute: 'Standard hobby micro servo (e.g. SG90/MG90S-class)',
    vendor: 'Amazon / Adafruit',
    rationale: 'Horizontal head rotation.',
  },
  'tilt-servo': {
    substitute: 'Standard hobby micro servo (e.g. SG90/MG90S-class)',
    vendor: 'Amazon / Adafruit',
    rationale: 'Vertical head tilt.',
  },
};

export const FIRMWARE_NOTES: Record<string, string> = {
  'raspberry-pi-4': 'Runs the control daemon as a systemd service — FIRMWARE.md §5.',
  'raspberry-pi-5': 'Runs the control daemon as a systemd service — FIRMWARE.md §5.',
  'raspberry-pi-zero-2w': 'Runs the control daemon as a systemd service — FIRMWARE.md §5.',
  'jaw-servo': 'PWM via RPi.GPIO/gpiozero; must respect the e-stop interrupt handler — FIRMWARE.md §4.',
  'pan-servo': 'PWM via RPi.GPIO/gpiozero; must respect the e-stop interrupt handler — FIRMWARE.md §4.',
  'tilt-servo': 'PWM via RPi.GPIO/gpiozero; must respect the e-stop interrupt handler — FIRMWARE.md §4.',
  'gpio-status-led': 'Drives the blinking_led.py pattern — FIRMWARE.md §3.',
  'laser-diode': 'Digital GPIO switch; must respect the e-stop interrupt handler — FIRMWARE.md §4.',
  'motor-driver-hat': 'I2C-addressed PWM expansion; frees direct GPIO pins for other servos.',
  'respeaker-hat': 'I2C/USB audio input — no direct GPIO pin required.',
  'usb-speaker': 'USB/analog audio output — no direct GPIO pin required.',
  'pi-camera-module': 'CSI ribbon interface — no direct GPIO pin required.',
  'auspex-antenna': 'USB/onboard wireless — no direct GPIO pin required.',
  'battery-pack': 'Power only — no GPIO/firmware involvement.',
  'cooling-fan': 'GPIO or USB power switch, no data function.',
};
