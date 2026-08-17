import type { PlacedComponent, ZoneId } from '../types/component';
import { SOURCING, FIRMWARE_NOTES, type SourcingEntry } from '../data/bomData';

export interface BomRow {
  instanceId: string;
  componentId: string;
  zoneId: ZoneId;
  sourcing?: SourcingEntry;
  firmwareNote?: string;
}

// Pure, deterministic BOM/firmware-note generator — same flatten-and-look-up
// shape as src/lib/pinAllocator.ts, just without a conflict concept (unlike
// pins, sourcing/firmware notes never collide). One row per placed instance,
// in stable (zoneId, then placement) order.
export function generateBom(placements: Record<ZoneId, PlacedComponent[]>): BomRow[] {
  const rows: BomRow[] = [];
  const zoneIds = Object.keys(placements).sort() as ZoneId[];

  for (const zoneId of zoneIds) {
    for (const placed of placements[zoneId] ?? []) {
      rows.push({
        instanceId: placed.instanceId,
        componentId: placed.componentId,
        zoneId,
        sourcing: SOURCING[placed.componentId],
        firmwareNote: FIRMWARE_NOTES[placed.componentId],
      });
    }
  }

  return rows;
}
