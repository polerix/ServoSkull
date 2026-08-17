import { useDroppable, useDndContext } from '@dnd-kit/core';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { chassisZones } from '../../data/chassisZones';
import { getComponent } from '../../data/componentCatalog';
import { useBuilderStore } from '../../store/builderStore';
import type { ComponentCategory, ZoneDef, ZoneId } from '../../types/component';

// Approximate anatomical layout of the 4 zones over the placeholder skull
// outline: two upper slots for the ocular cavities, center for the cranial
// cavity, sides for temporal/maxillary mounts, bottom for cervical/base.
const ZONE_POSITION: Record<ZoneId, string> = {
  'ocular-cavities': 'col-start-2 row-start-1',
  'cranial-cavity': 'col-start-2 row-start-2',
  'temporal-maxillary-mounts': 'col-span-3 row-start-3',
  'cervical-base': 'col-start-2 row-start-4',
};

function ZoneBox({ zone }: { zone: ZoneDef }) {
  const { setNodeRef, isOver } = useDroppable({
    id: zone.id,
    data: { zoneId: zone.id },
  });
  const { active } = useDndContext();
  const placements = useBuilderStore((s) => s.placements[zone.id] ?? []);
  const removeComponent = useBuilderStore((s) => s.removeComponent);

  const activeCategory = active?.data.current?.category as ComponentCategory | undefined;
  const isDragging = Boolean(active);
  const isCompatible = activeCategory
    ? zone.acceptedCategories.includes(activeCategory)
    : false;
  const isFull = placements.length >= zone.capacity;

  return (
    <div
      ref={setNodeRef}
      data-testid="chassis-zone"
      data-zone-id={zone.id}
      className={clsx(
        ZONE_POSITION[zone.id],
        'flex min-h-[96px] flex-col gap-2 rounded-md border p-3 transition-colors',
        isOver && isCompatible && !isFull && 'border-solid border-[#72eaf6] bg-[#0e2624]',
        isOver && (!isCompatible || isFull) && 'border-solid border-red-500/70 bg-red-950/20',
        !isOver && isDragging && isCompatible && 'border-dashed border-[#72eaf6]/60',
        !isOver && (!isDragging || !isCompatible) && 'border-dashed border-[#2a4a48]'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-[#72eaf6]">{zone.label}</span>
        <span className="text-xs text-[#9fd8d4]">
          {placements.length}/{zone.capacity}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {placements.map((placed) => {
          const component = getComponent(placed.componentId);
          return (
            <span
              key={placed.instanceId}
              data-testid="placed-chip"
              className="flex items-center gap-1 rounded-full border border-[#2a4a48] bg-black/50 px-2 py-0.5 text-[11px] text-[#D4FFFD]"
            >
              {component?.name ?? placed.componentId}
              <button
                type="button"
                aria-label={`Remove ${component?.name ?? placed.componentId}`}
                onClick={() => removeComponent(zone.id, placed.instanceId)}
                className="text-[#9fd8d4] hover:text-[#D4FFFD]"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function ChassisCanvas({ message }: { message: string | null }) {
  return (
    <div className="flex min-h-[400px] flex-col gap-4 rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-copperplate text-lg text-[#72eaf6]">Chassis Canvas</h2>
        {message && (
          <span
            data-testid="drop-message"
            className="rounded border border-red-500/50 bg-red-950/30 px-2 py-1 text-xs text-red-300"
          >
            {message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-3">
        {chassisZones.map((zone) => (
          <ZoneBox key={zone.id} zone={zone} />
        ))}
      </div>
    </div>
  );
}
