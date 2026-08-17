import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import ComponentVault, { getComponentIcon } from './ComponentVault';
import ChassisCanvas from './ChassisCanvas';
import PinoutTracker from './PinoutTracker';
import BomTracker from './BomTracker';
import { getComponent } from '../../data/componentCatalog';
import { useBuilderStore } from '../../store/builderStore';
import type { ZoneId } from '../../types/component';

// Phase 2: Vault + Chassis Canvas drag-and-drop. Phase 3: GPIO Pinout
// Tracker. Phase 4: BOM/firmware recommender + register the finished build.
const DesignBuilder = () => {
  const placeComponent = useBuilderStore((s) => s.placeComponent);
  const clearBuild = useBuilderStore((s) => s.clearBuild);

  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const showMessage = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage((current) => (current === text ? null : current)), 2500);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const componentId = event.active.data.current?.componentId as string | undefined;
    setActiveComponentId(componentId ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveComponentId(null);
    const componentId = event.active.data.current?.componentId as string | undefined;
    const zoneId = event.over?.id as ZoneId | undefined;
    if (!componentId || !zoneId) return;

    const result = placeComponent(zoneId, componentId);
    if (!result.ok) {
      showMessage(
        result.reason === 'capacity'
          ? 'Zone is full.'
          : 'Wrong component type for this zone.'
      );
    }
  };

  const activeComponent = activeComponentId ? getComponent(activeComponentId) : undefined;
  const ActiveIcon = activeComponent ? getComponentIcon(activeComponent.icon) : null;

  return (
    <div className="flex min-h-screen flex-col bg-black px-6 py-16 sm:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-copperplate text-3xl text-[#D4FFFD] sm:text-4xl">
              ✠ Design Servitor Skull ✠
            </h1>
            <p className="mt-4 text-[#9fd8d4]">
              Drag components onto the chassis, then check the pinout
              tracker and bill of materials for the auto-generated GPIO
              manifest and procurement/firmware readout.
            </p>
          </div>
          <button
            type="button"
            onClick={clearBuild}
            className="h-fit rounded border border-[#2a4a48] px-3 py-1.5 text-sm text-[#9fd8d4] hover:border-[#72eaf6] hover:text-[#72eaf6]"
          >
            Reset build
          </button>
        </div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
            <ComponentVault />

            <div className="flex flex-col gap-4">
              <ChassisCanvas message={message} />

              <PinoutTracker />
              <BomTracker />
            </div>
          </div>

          <DragOverlay>
            {activeComponent && ActiveIcon ? (
              <div className="flex items-center gap-2 rounded-md border border-[#72eaf6] bg-[#0a1615] px-3 py-2 shadow-lg">
                <ActiveIcon className="h-4 w-4 text-[#72eaf6]" aria-hidden="true" />
                <span className="text-sm text-[#D4FFFD]">{activeComponent.name}</span>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default DesignBuilder;
