-- ServoSkull Codex Registry — Phase 4 initial schema.
-- Apply this once, by hand, in the Supabase project's SQL Editor
-- (Project → SQL Editor → New query → paste → Run). Not run automatically —
-- this repo has no Supabase CLI/MCP wiring, per the Phase 4 plan.

create table public.units (
  id uuid primary key default gen_random_uuid(),
  designation text not null,
  class text not null default 'FIRMWARE-CLASS',
  persona_layer text,
  hardware text,
  comm_channel text,
  network_id text,
  status text not null default 'BUILDING',
  status_notes text,
  placements_snapshot jsonb not null,
  pin_manifest jsonb not null,
  bom_snapshot jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.units enable row level security;

-- Public read: the Codex table lists every registered unit, no auth.
create policy "public can read units"
  on public.units for select
  to anon
  using (true);

-- Public insert: the /codex/register form submits directly, no auth.
create policy "public can register units"
  on public.units for insert
  to anon
  with check (true);

-- Deliberately no update/delete policy for anon. Public anon insert with no
-- auth means open write-only registration, not open mutation of others'
-- entries — once submitted, a record can only be changed via the Supabase
-- dashboard (or a future phase that adds real auth + owner-scoped policies).
