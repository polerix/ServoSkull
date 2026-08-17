import { useBuilderStore } from '../../store/builderStore';
import { getComponent } from '../../data/componentCatalog';
import { generateBom } from '../../lib/bomGenerator';
import type { PlacedComponent, ZoneId } from '../../types/component';

// Phase 4: procurement + firmware readout derived entirely from the builder
// store's placements — same pure-derived-state pattern as PinoutTracker.tsx.
// See src/lib/bomGenerator.ts for the generation rule and src/data/bomData.ts
// for the underlying sourcing/firmware-note data.
export default function BomTracker() {
  const placements = useBuilderStore((s) => s.placements);

  const allPlaced = (Object.entries(placements) as [ZoneId, PlacedComponent[]][]).flatMap(
    ([, list]) => list
  );

  if (allPlaced.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-6">
        <h2 className="font-copperplate text-lg text-[#72eaf6]">Bill of Materials</h2>
        <p className="mt-2 text-sm text-[#9fd8d4]">
          Procurement + firmware readout — populates once at least one
          component is placed on the canvas.
        </p>
      </div>
    );
  }

  const rows = generateBom(placements);

  return (
    <div className="rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-copperplate text-lg text-[#72eaf6]">Bill of Materials</h2>
        <span className="text-xs text-[#9fd8d4]">2026 terrestrial sourcing</span>
      </div>

      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-[#5a8f8c]">
            <th className="pb-2 pr-3 font-normal">Component</th>
            <th className="pb-2 pr-3 font-normal">Substitute Sourcing</th>
            <th className="pb-2 pr-3 font-normal">Vendor</th>
            <th className="pb-2 font-normal">Firmware Note</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const component = getComponent(row.componentId);
            return (
              <tr
                key={row.instanceId}
                data-testid="bom-row"
                data-component-id={row.componentId}
                className="border-t border-[#2a4a48] align-top text-[#D4FFFD]"
              >
                <td className="py-1.5 pr-3">{component?.name ?? row.componentId}</td>
                <td className="py-1.5 pr-3 text-[#9fd8d4]">
                  {row.sourcing?.substitute ?? '—'}
                </td>
                <td className="py-1.5 pr-3 text-[#9fd8d4]">{row.sourcing?.vendor ?? '—'}</td>
                <td className="py-1.5 text-[#9fd8d4]">{row.firmwareNote ?? '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="mt-3 text-xs text-[#5a8f8c]">
        Sourcing per docs/TEMPORAL_INTEGRITY_PROTOCOLS.md; firmware notes per
        docs/FIRMWARE.md.
      </p>
    </div>
  );
}
