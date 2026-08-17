import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
  Camera,
  Lightbulb,
  Zap,
  Mic,
  Speaker,
  Antenna,
  Cpu,
  CircuitBoard,
  Battery,
  Fan,
  Cog,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import clsx from 'clsx';
import { componentCatalog } from '../../data/componentCatalog';
import type { ComponentCategory, ComponentPayload } from '../../types/component';

// Maps the string `icon` field on ComponentPayload to an actual lucide-react
// component. Keep in sync with whichever icon names componentCatalog.ts uses.
const ICONS: Record<string, LucideIcon> = {
  Camera,
  Lightbulb,
  Zap,
  Mic,
  Speaker,
  Antenna,
  Cpu,
  CircuitBoard,
  Battery,
  Fan,
  Cog,
};

// Exposed so other Design views (e.g. the DragOverlay preview in
// DesignBuilder.tsx) can resolve the same icon lookup without duplicating it.
export function getComponentIcon(iconName: string): LucideIcon {
  return ICONS[iconName] ?? Cog;
}

const CATEGORY_ORDER: ComponentCategory[] = [
  'Optics & Illumination',
  'Telemetry & Input',
  'Core Processing',
  'Expansion',
  'Kinematics',
];

function VaultCard({ component }: { component: ComponentPayload }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `vault-${component.id}`,
    data: { componentId: component.id, category: component.category },
  });

  const Icon = ICONS[component.icon] ?? Cog;

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      data-testid="vault-card"
      data-component-id={component.id}
      className={clsx(
        'flex cursor-grab items-start gap-3 rounded-md border border-[#2a4a48] bg-black/40 p-3 text-left transition-opacity active:cursor-grabbing',
        isDragging && 'opacity-30'
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#72eaf6]" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold text-[#D4FFFD]">{component.name}</p>
        <p className="mt-0.5 text-xs text-[#9fd8d4]">{component.blurb}</p>
      </div>
    </div>
  );
}

function CategorySection({ category }: { category: ComponentCategory }) {
  const [expanded, setExpanded] = useState(true);
  const items = componentCatalog.filter((c) => c.category === category);

  return (
    <div className="border-b border-[#2a4a48] pb-3 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between py-2 text-left"
        aria-expanded={expanded}
      >
        <span className="font-copperplate text-sm text-[#72eaf6]">{category}</span>
        <ChevronDown
          className={clsx(
            'h-4 w-4 text-[#9fd8d4] transition-transform',
            expanded ? 'rotate-0' : '-rotate-90'
          )}
          aria-hidden="true"
        />
      </button>
      {expanded && (
        <div className="flex flex-col gap-2">
          {items.map((component) => (
            <VaultCard key={component.id} component={component} />
          ))}
        </div>
      )}
    </div>
  );
}

const ComponentVault = () => {
  return (
    <aside className="rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-6">
      <h2 className="font-copperplate text-lg text-[#72eaf6]">Component Vault</h2>
      <p className="mt-2 text-sm text-[#9fd8d4]">
        Drag a component onto the chassis canvas.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {CATEGORY_ORDER.map((category) => (
          <CategorySection key={category} category={category} />
        ))}
      </div>
    </aside>
  );
};

export default ComponentVault;
