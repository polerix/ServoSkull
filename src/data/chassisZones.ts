import type { ZoneDef } from '../types/component';

// The 4 placeholder chassis drop zones. Each zone only accepts components
// from its acceptedCategories and caps how many it can hold — Phase 2's
// "full validation" scope (see project plan).
export const chassisZones: ZoneDef[] = [
  {
    id: 'ocular-cavities',
    label: 'Ocular Cavities (L/R)',
    acceptedCategories: ['Optics & Illumination'],
    capacity: 2,
  },
  {
    id: 'cranial-cavity',
    label: 'Cranial Cavity',
    acceptedCategories: ['Core Processing'],
    capacity: 1,
  },
  {
    id: 'temporal-maxillary-mounts',
    label: 'Temporal/Maxillary Mounts',
    acceptedCategories: ['Telemetry & Input'],
    capacity: 3,
  },
  {
    id: 'cervical-base',
    label: 'Cervical/Base',
    acceptedCategories: ['Kinematics', 'Expansion'],
    capacity: 3,
  },
];

export function getZone(id: string) {
  return chassisZones.find((z) => z.id === id);
}
