// Domain types for the /design builder (Phase 2: Vault + Chassis Canvas).
// Follows the same plain-.ts-interfaces pattern as src/types/unit.ts.

export type ComponentCategory =
  | 'Optics & Illumination'
  | 'Telemetry & Input'
  | 'Core Processing'
  | 'Expansion'
  | 'Kinematics';

// A catalog entry in the Component Vault. `icon` is a lucide-react icon
// name resolved via the lookup map in ComponentVault.tsx.
export interface ComponentPayload {
  id: string;
  name: string;
  category: ComponentCategory;
  blurb: string;
  icon: string;
}

export type ZoneId =
  | 'ocular-cavities'
  | 'cranial-cavity'
  | 'temporal-maxillary-mounts'
  | 'cervical-base';

export interface ZoneDef {
  id: ZoneId;
  label: string;
  acceptedCategories: ComponentCategory[];
  capacity: number;
}

// A single placed instance of a catalog component on the chassis. One
// ComponentPayload can be placed multiple times (e.g. two Pi Camera
// Modules, one per Ocular Cavity), so each placement gets its own
// instanceId distinct from the catalog's componentId.
export interface PlacedComponent {
  instanceId: string;
  componentId: string;
}

// Phase 3: GPIO Pinout Tracker types. Scoped to the Raspberry Pi 40-pin
// header (BCM numbering) per docs/FIRMWARE.md §2 — the reference hardware
// already named there, not a new hardware target.
export type PinFunction =
  | 'PWM'
  | 'Digital Out'
  | 'Digital In'
  | 'I2C'
  | 'SPI'
  | 'UART';

// A usable BCM GPIO pin on the header.
export interface PinDef {
  pin: number;
  label: string;
}

// One allocated pin, tied back to the placement instance it serves.
export interface PinAssignment {
  pin: number;
  instanceId: string;
  componentId: string;
  zoneId: ZoneId;
  function: PinFunction;
}

// Reported when the free-pin pool can't satisfy every placed component's
// requirement (e.g. too many pin-needing parts placed at once).
export interface PinConflict {
  instanceId: string;
  componentId: string;
  zoneId: ZoneId;
  reason: 'pool-exhausted';
}
