import type { ComponentPayload } from '../types/component';

// Placeholder Phase 2 catalog, grounded in the reference hardware already
// named in docs/FIRMWARE.md §1/§2 rather than invented from scratch.
export const componentCatalog: ComponentPayload[] = [
  // Optics & Illumination
  {
    id: 'pi-camera-module',
    name: 'Pi Camera Module',
    category: 'Optics & Illumination',
    blurb: 'High-res optical feed for target acquisition and recording.',
    icon: 'Camera',
  },
  {
    id: 'gpio-status-led',
    name: 'GPIO Status LED',
    category: 'Optics & Illumination',
    blurb: 'Indicator array wired direct to GPIO for status/mood signaling.',
    icon: 'Lightbulb',
  },
  {
    id: 'laser-diode',
    name: 'Laser Diode',
    category: 'Optics & Illumination',
    blurb: 'Targeting laser or ceremonial effect emitter.',
    icon: 'Zap',
  },

  // Telemetry & Input
  {
    id: 'respeaker-hat',
    name: 'USB Mic / ReSpeaker HAT',
    category: 'Telemetry & Input',
    blurb: 'Far-field voice capture for wake-word and command input.',
    icon: 'Mic',
  },
  {
    id: 'usb-speaker',
    name: 'USB Speaker',
    category: 'Telemetry & Input',
    blurb: 'Audio output for vox-casting and alert tones.',
    icon: 'Speaker',
  },
  {
    id: 'auspex-antenna',
    name: 'Auspex Antenna',
    category: 'Telemetry & Input',
    blurb: 'Wireless telemetry uplink — RF/Wi-Fi scanning and beacon relay.',
    icon: 'Antenna',
  },

  // Core Processing
  {
    id: 'raspberry-pi-4',
    name: 'Raspberry Pi 4',
    category: 'Core Processing',
    blurb: 'Balanced compute/GPIO baseline — video + TTS + servos concurrently.',
    icon: 'Cpu',
  },
  {
    id: 'raspberry-pi-5',
    name: 'Raspberry Pi 5',
    category: 'Core Processing',
    blurb: 'Higher-throughput compute for heavier vision/inference workloads.',
    icon: 'Cpu',
  },
  {
    id: 'raspberry-pi-zero-2w',
    name: 'Raspberry Pi Zero 2 W',
    category: 'Core Processing',
    blurb: 'Minimal-footprint compute for lightweight, single-purpose builds.',
    icon: 'CircuitBoard',
  },

  // Expansion
  {
    id: 'motor-driver-hat',
    name: 'Motor Driver HAT',
    category: 'Expansion',
    blurb: 'PWM channel expansion for driving multiple servos/motors.',
    icon: 'CircuitBoard',
  },
  {
    id: 'battery-pack',
    name: 'Battery Pack',
    category: 'Expansion',
    blurb: 'Portable power — untethers the skull from mains.',
    icon: 'Battery',
  },
  {
    id: 'cooling-fan',
    name: 'Cooling Fan',
    category: 'Expansion',
    blurb: 'Active cooling for sustained compute load.',
    icon: 'Fan',
  },

  // Kinematics
  {
    id: 'jaw-servo',
    name: 'Jaw Servo',
    category: 'Kinematics',
    blurb: 'Articulated mandible — vocalization sync and expression.',
    icon: 'Cog',
  },
  {
    id: 'pan-servo',
    name: 'Pan Servo',
    category: 'Kinematics',
    blurb: 'Horizontal head rotation.',
    icon: 'Cog',
  },
  {
    id: 'tilt-servo',
    name: 'Tilt Servo',
    category: 'Kinematics',
    blurb: 'Vertical head tilt.',
    icon: 'Cog',
  },
];

export function getComponent(id: string) {
  return componentCatalog.find((c) => c.id === id);
}
