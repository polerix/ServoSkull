import { getSupabase } from './supabaseClient';
import type { Unit, UnitStatus } from '../types/unit';
import type { PlacedComponent, PinAssignment, ZoneId } from '../types/component';
import type { BomRow } from './bomGenerator';

// Phase 4: thin mapping layer between the Supabase `units` table (snake_case
// columns, see supabase/migrations/0001_init.sql) and the existing Unit
// shape CodexTable.tsx/UnitCard already render. Keeps the Supabase-specific
// column names out of the UI components.

interface UnitRow {
  id: string;
  designation: string;
  class: string;
  persona_layer: string | null;
  hardware: string | null;
  comm_channel: string | null;
  network_id: string | null;
  status: UnitStatus;
  status_notes: string | null;
  created_at: string;
  updated_at: string;
}

function rowToUnit(row: UnitRow): Unit {
  return {
    designation: row.designation,
    class: row.class,
    personaLayer: row.persona_layer ?? undefined,
    hardware: row.hardware ?? undefined,
    commChannel: row.comm_channel ?? undefined,
    networkId: row.network_id ?? undefined,
    status: row.status,
    statusNotes: row.status_notes ?? undefined,
    firstDeployed: row.created_at ? new Date(row.created_at).toLocaleDateString() : undefined,
    lastUpdated: row.updated_at ? new Date(row.updated_at).toLocaleDateString() : undefined,
  };
}

export async function fetchUnits(): Promise<Unit[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('units')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return ((data ?? []) as UnitRow[]).map(rowToUnit);
}

export interface NewUnitInput {
  designation: string;
  unitClass: string;
  personaLayer?: string;
  hardware?: string;
  commChannel?: string;
  networkId?: string;
  statusNotes?: string;
  placements: Record<ZoneId, PlacedComponent[]>;
  pinManifest: { assignments: PinAssignment[]; conflicts: unknown[] };
  bom: BomRow[];
}

export async function registerUnit(input: NewUnitInput): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from('units').insert({
    designation: input.designation,
    class: input.unitClass,
    persona_layer: input.personaLayer || null,
    hardware: input.hardware || null,
    comm_channel: input.commChannel || null,
    network_id: input.networkId || null,
    status: 'BUILDING',
    status_notes: input.statusNotes || null,
    placements_snapshot: input.placements,
    pin_manifest: input.pinManifest,
    bom_snapshot: input.bom,
  });

  if (error) throw error;
}
