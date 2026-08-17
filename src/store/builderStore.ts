import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PlacedComponent, ZoneId } from '../types/component';
import { chassisZones, getZone } from '../data/chassisZones';
import { getComponent } from '../data/componentCatalog';

export type PlaceRejectReason = 'category' | 'capacity';
export type PlaceResult = { ok: true } | { ok: false; reason: PlaceRejectReason };

interface BuilderState {
  placements: Record<ZoneId, PlacedComponent[]>;
  placeComponent: (zoneId: ZoneId, componentId: string) => PlaceResult;
  removeComponent: (zoneId: ZoneId, instanceId: string) => void;
  clearBuild: () => void;
}

const emptyPlacements = (): Record<ZoneId, PlacedComponent[]> =>
  chassisZones.reduce(
    (acc, z) => {
      acc[z.id] = [];
      return acc;
    },
    {} as Record<ZoneId, PlacedComponent[]>
  );

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      placements: emptyPlacements(),

      placeComponent: (zoneId, componentId) => {
        const zone = getZone(zoneId);
        const component = getComponent(componentId);
        if (!zone || !component) return { ok: false, reason: 'category' };

        if (!zone.acceptedCategories.includes(component.category)) {
          return { ok: false, reason: 'category' };
        }

        const current = get().placements[zoneId] ?? [];
        if (current.length >= zone.capacity) {
          return { ok: false, reason: 'capacity' };
        }

        const placed: PlacedComponent = {
          instanceId:
            typeof crypto !== 'undefined' && crypto.randomUUID
              ? crypto.randomUUID()
              : `${componentId}-${Date.now()}-${Math.random()}`,
          componentId,
        };

        set((state) => ({
          placements: {
            ...state.placements,
            [zoneId]: [...(state.placements[zoneId] ?? []), placed],
          },
        }));

        return { ok: true };
      },

      removeComponent: (zoneId, instanceId) => {
        set((state) => ({
          placements: {
            ...state.placements,
            [zoneId]: (state.placements[zoneId] ?? []).filter(
              (p) => p.instanceId !== instanceId
            ),
          },
        }));
      },

      clearBuild: () => set({ placements: emptyPlacements() }),
    }),
    { name: 'servoskull-design-draft' }
  )
);
