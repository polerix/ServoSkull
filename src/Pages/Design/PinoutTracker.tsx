import { useBuilderStore } from '../../store/builderStore';
import { getComponent } from '../../data/componentCatalog';
import { getZone } from '../../data/chassisZones';
import { allocatePins } from '../../lib/pinAllocator';
import { ESTOP_PIN, PIN_REQUIREMENTS } from '../../data/gpioMap';
import type { PlacedComponent, ZoneId } from '../../types/component';

// Phase 3: connection manifest derived entirely from the builder store's
// placements — no manual pin editing yet (auto-allocate only, per the
// project roadmap). See src/lib/pinAllocator.ts for the allocation rule.
export default function PinoutTracker() {
  const placements = useBuilderStore((s) => s.placements);

  const allPlaced = (Object.entries(placements) as [ZoneId, PlacedComponent[]][]).flatMap(
    ([zoneId, list]) => list.map((p) => ({ ...p, zoneId }))
  );
  const pinNeeding = allPlaced.filter((p) => PIN_REQUIREMENTS[p.componentId]);
  const busOnly = allPlaced.filter((p) => !PIN_REQUIREMENTS[p.componentId]);

  if (pinNeeding.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-6">
        <h2 className="font-copperplate text-lg text-[#72eaf6]">Pinout Tracker</h2>
        <p className="mt-2 text-sm text-[#9fd8d4]">
          GPIO matrix and connection manifest — populates once a
          pin-requiring component (servo, LED, laser diode) is placed on the
          canvas.
        </p>
      </div>
    );
  }

  const { assignments, conflicts } = allocatePins(placements);

  return (
    <div className="rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-copperplate text-lg text-[#72eaf6]">Pinout Tracker</h2>
        <span className="text-xs text-[#9fd8d4]">Auto-allocated · BCM numbering</span>
      </div>

      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-[#5a8f8c]">
            <th className="pb-2 pr-3 font-normal">Pin</th>
            <th className="pb-2 pr-3 font-normal">Function</th>
            <th className="pb-2 pr-3 font-normal">Component</th>
            <th className="pb-2 font-normal">Zone</th>
          </tr>
        </thead>
        <tbody>
          <tr data-testid="pin-row" className="border-t border-[#2a4a48] text-[#D4FFFD]">
            <td className="py-1.5 pr-3">GPIO{ESTOP_PIN}</td>
            <td className="py-1.5 pr-3 text-[#9fd8d4]">Digital In</td>
            <td className="py-1.5 pr-3">E-Stop (reserved)</td>
            <td className="py-1.5 text-[#9fd8d4]">System</td>
          </tr>
          {assignments.map((a) => {
            const component = getComponent(a.componentId);
            const zone = getZone(a.zoneId);
            return (
              <tr
                key={a.instanceId}
                data-testid="pin-row"
                data-pin={a.pin}
                data-function={a.function}
                className="border-t border-[#2a4a48] text-[#D4FFFD]"
              >
                <td className="py-1.5 pr-3">GPIO{a.pin}</td>
                <td className="py-1.5 pr-3 text-[#9fd8d4]">{a.function}</td>
                <td className="py-1.5 pr-3">{component?.name ?? a.componentId}</td>
                <td className="py-1.5 text-[#9fd8d4]">{zone?.label ?? a.zoneId}</td>
              </tr>
            );
          })}
          {conflicts.map((c) => {
            const component = getComponent(c.componentId);
            const zone = getZone(c.zoneId);
            return (
              <tr
                key={c.instanceId}
                data-testid="pin-conflict"
                className="border-t border-red-500/30 text-red-300"
              >
                <td className="py-1.5 pr-3">—</td>
                <td className="py-1.5 pr-3">Pool exhausted</td>
                <td className="py-1.5 pr-3">{component?.name ?? c.componentId}</td>
                <td className="py-1.5">{zone?.label ?? c.zoneId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {busOnly.length > 0 && (
        <p className="mt-3 text-xs text-[#5a8f8c]">
          No direct GPIO pin required (dedicated bus — CSI/USB/I2C):{' '}
          {busOnly.map((p) => getComponent(p.componentId)?.name ?? p.componentId).join(', ')}
        </p>
      )}

      <p className="mt-3 text-xs text-[#5a8f8c]">
        Auto-allocated only — manual reassignment lands in a future phase.
      </p>
    </div>
  );
}
