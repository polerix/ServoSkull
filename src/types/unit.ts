// Shape of an entry in src/data/units.json — the operative register.
// Real physical builds use FIRMWARE-CLASS (or similar); LEGACY-CLASS marks
// canon-reference entries (named servo-skulls from Black Library fiction,
// not physical hardware) per docs/REGISTRATION_TRACKING.md /
// docs/LORE_COMPENDIUM.md §1/§3.
export type UnitStatus =
  | 'ACTIVE'
  | 'BUILDING'
  | 'DAMAGED'
  | 'LOST'
  | 'CORRUPTED'
  | 'DESTROYED'
  | 'DECOMMISSIONED';

export interface Unit {
  designation: string;
  class: string;
  personaLayer?: string;
  hardware?: string;
  gpioMapRef?: string;
  commChannel?: string;
  networkId?: string;
  firstDeployed?: string;
  status: UnitStatus;
  statusNotes?: string;
  lastUpdated?: string;
}
