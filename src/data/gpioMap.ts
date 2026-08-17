import type { PinDef, PinFunction } from '../types/component';

// Usable Raspberry Pi 40-pin header GPIO pins, BCM numbering (2–27).
// Power/ground pins aren't tracked here at all (they're not allocatable),
// and the fixed-function I2C1 (2, 3), SPI0 (9, 10, 11), and UART (14, 15)
// pins are excluded from the general-purpose free pool — the catalog's
// expansion HATs (motor driver, ReSpeaker) use those buses directly per
// docs/FIRMWARE.md §1 rather than competing for them via this allocator.
const RESERVED_BUS_PINS = new Set([2, 3, 9, 10, 11, 14, 15]);

export const ALL_BCM_PINS: PinDef[] = Array.from({ length: 26 }, (_, i) => i + 2)
  .filter((pin) => !RESERVED_BUS_PINS.has(pin))
  .map((pin) => ({ pin, label: `GPIO${pin}` }));

// Per docs/FIRMWARE.md §4, e-stop "pre-empts everything" and must be wired
// to a physical interrupt, not shared out of the general allocation pool.
// It's a fixed system reservation shown in the manifest regardless of what
// components are placed.
export const ESTOP_PIN = 4;

export const FREE_POOL_PINS: PinDef[] = ALL_BCM_PINS.filter((p) => p.pin !== ESTOP_PIN);

// Which catalog components need a direct GPIO pin, and what function.
// Components not listed here (Pi Camera Module, ReSpeaker HAT, USB Speaker,
// Motor Driver HAT, Core Processing boards themselves, etc.) use a
// dedicated bus (CSI/USB/I2C) instead — the pinout tracker calls that out
// explicitly rather than silently omitting them from the manifest.
export const PIN_REQUIREMENTS: Record<string, { count: number; function: PinFunction }> = {
  'jaw-servo': { count: 1, function: 'PWM' },
  'pan-servo': { count: 1, function: 'PWM' },
  'tilt-servo': { count: 1, function: 'PWM' },
  'gpio-status-led': { count: 1, function: 'Digital Out' },
  'laser-diode': { count: 1, function: 'Digital Out' },
};
