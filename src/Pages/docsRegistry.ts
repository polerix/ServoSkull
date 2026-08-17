// Single source of truth mapping codex route slugs to the actual docs/*.md
// files, so CodexIndex and CodexDoc stay in sync. Import content via
// Vite's `?raw` suffix so the rendered site always matches the repo docs.
import programmingReference from '../../docs/PROGRAMMING_REFERENCE.md?raw';
import firmware from '../../docs/FIRMWARE.md?raw';
import registrationTracking from '../../docs/REGISTRATION_TRACKING.md?raw';
import loreCompendium from '../../docs/LORE_COMPENDIUM.md?raw';
import temporalIntegrityProtocols from '../../docs/TEMPORAL_INTEGRITY_PROTOCOLS.md?raw';

export interface Doc {
  slug: string;
  title: string;
  blurb: string;
  content: string;
}

export const docs: Doc[] = [
  {
    slug: 'programming-reference',
    title: 'Programming Reference',
    blurb: 'Command/control model, behavioral priority stack, comm channels — the logic layer, hardware-agnostic.',
    content: programmingReference,
  },
  {
    slug: 'firmware',
    title: 'Firmware',
    blurb: 'Raspberry Pi build target — GPIO map, subsystem scripts, install/boot sequence.',
    content: firmware,
  },
  {
    slug: 'registration-tracking',
    title: 'Registration & Tracking',
    blurb: 'Per-unit asset register — one entry per physical skull built or deployed.',
    content: registrationTracking,
  },
  {
    slug: 'lore-compendium',
    title: 'Lore Compendium',
    blurb: 'Canon research — servo-skull roles, named exceptions, and status precedent, sourced from Black Library fiction.',
    content: loreCompendium,
  },
  {
    slug: 'temporal-integrity-protocols',
    title: 'Temporal Integrity Protocols',
    blurb: 'Sourcing rationale — 2026 terrestrial component substitutes for Imperium-spec hardware.',
    content: temporalIntegrityProtocols,
  },
];

export function getDoc(slug: string | undefined): Doc | undefined {
  return docs.find((d) => d.slug === slug);
}
