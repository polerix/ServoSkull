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
