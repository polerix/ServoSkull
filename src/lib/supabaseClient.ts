import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Phase 4: single Supabase client, backing the /codex/register submit and
// the /codex table's read. Env vars are read lazily (inside getSupabase(),
// not at module import time) so a build/deploy missing them still renders
// the rest of the site — only the register/table features surface an
// error, per the Phase 4 plan.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url || !anonKey) {
    throw new Error(
      'Supabase is not configured — VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are missing.'
    );
  }

  client = createClient(url, anonKey);
  return client;
}
