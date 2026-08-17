import type { PlacedComponent, PinAssignment, PinConflict, ZoneId } from '../types/component';
import { FREE_POOL_PINS, PIN_REQUIREMENTS } from '../data/gpioMap';

export interface AllocationResult {
  assignments: PinAssignment[];
  conflicts: PinConflict[];
}

// Pure, deterministic pin allocator. Given the current placements, assigns
// the lowest available BCM pin to each pin-needing placed component, in a
// stable (zoneId, then placement) order — so as long as the placement set
// is unchanged, a reload never reshuffles an already-assigned pin. Returns
// a conflict entry (rather than throwing) for anything that can't be
// satisfied once the free pool runs out.
export function allocatePins(
  placements: Record<ZoneId, PlacedComponent[]>
): AllocationResult {
  const assignments: PinAssignment[] = [];
  const conflicts: PinConflict[] = [];
  let nextFreeIndex = 0;

  const zoneIds = Object.keys(placements).sort() as ZoneId[];
  for (const zoneId of zoneIds) {
    for (const placed of placements[zoneId] ?? []) {
      const requirement = PIN_REQUIREMENTS[placed.componentId];
      if (!requirement) continue;

      for (let i = 0; i < requirement.count; i++) {
        if (nextFreeIndex >= FREE_POOL_PINS.length) {
          conflicts.push({
            instanceId: placed.instanceId,
            componentId: placed.componentId,
            zoneId,
            reason: 'pool-exhausted',
          });
          continue;
        }
        const pinDef = FREE_POOL_PINS[nextFreeIndex];
        nextFreeIndex += 1;
        assignments.push({
          pin: pinDef.pin,
          instanceId: placed.instanceId,
          componentId: placed.componentId,
          zoneId,
          function: requirement.function,
        });
      }
    }
  }

  return { assignments, conflicts };
}
