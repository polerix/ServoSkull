import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBuilderStore } from '../../store/builderStore';
import { getComponent } from '../../data/componentCatalog';
import { allocatePins } from '../../lib/pinAllocator';
import { generateBom } from '../../lib/bomGenerator';
import { registerUnit } from '../../lib/unitsApi';
import type { PlacedComponent, ZoneId } from '../../types/component';

// Phase 4: submits the finalized /design builder-store state to the
// Supabase-backed Codex registry (supabase/migrations/0001_init.sql).
const RegisterForm = () => {
  const navigate = useNavigate();
  const placements = useBuilderStore((s) => s.placements);

  const allPlaced = (Object.entries(placements) as [ZoneId, PlacedComponent[]][]).flatMap(
    ([, list]) => list
  );
  const isEmpty = allPlaced.length === 0;

  const defaultHardware = useMemo(() => {
    const core = allPlaced.find((p) => getComponent(p.componentId)?.category === 'Core Processing');
    const coreName = core ? getComponent(core.componentId)?.name : undefined;
    return coreName
      ? `${coreName} + ${allPlaced.length} placed component${allPlaced.length === 1 ? '' : 's'}`
      : `${allPlaced.length} placed component${allPlaced.length === 1 ? '' : 's'} (no Core Processing module)`;
  }, [allPlaced]);

  const [designation, setDesignation] = useState('');
  const [unitClass, setUnitClass] = useState<'FIRMWARE-CLASS' | 'LEGACY-CLASS'>('FIRMWARE-CLASS');
  const [personaLayer, setPersonaLayer] = useState('');
  const [hardware, setHardware] = useState('');
  const [commChannel, setCommChannel] = useState('');
  const [networkId, setNetworkId] = useState('');
  const [statusNotes, setStatusNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isEmpty) {
      setError('Place at least one component in the Design Servitor Skull builder before registering.');
      return;
    }
    if (!designation.trim()) {
      setError('Designation is required.');
      return;
    }

    setSubmitting(true);
    try {
      const pinManifest = allocatePins(placements);
      const bom = generateBom(placements);
      await registerUnit({
        designation: designation.trim(),
        unitClass,
        personaLayer: unitClass === 'LEGACY-CLASS' ? personaLayer.trim() : undefined,
        hardware: (hardware.trim() || defaultHardware),
        commChannel: commChannel.trim(),
        networkId: networkId.trim(),
        statusNotes: statusNotes.trim(),
        placements,
        pinManifest,
        bom,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed — please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-black px-6 py-16 sm:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-copperplate text-3xl text-[#D4FFFD] sm:text-4xl">
            ✠ Unit Registered ✠
          </h1>
          <p className="mt-6 text-[#9fd8d4]">
            {designation} has been added to the Codex with status BUILDING.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/codex')}
              className="rounded-lg border border-[#2a4a48] bg-[#40E0D0] px-4 py-2 text-sm font-copperplate text-black opacity-80 hover:bg-[#72eaf6] hover:opacity-100"
            >
              View Codex
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-copperplate text-3xl text-[#D4FFFD] sm:text-4xl">
          ✠ Register a Servo-Skull ✠
        </h1>

        {isEmpty ? (
          <div className="mt-10 rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-8 text-center">
            <p className="text-[#D4FFFD]">No build to register yet.</p>
            <p className="mt-2 text-sm text-[#9fd8d4]">
              Place components in the{' '}
              <Link to="/design" className="text-[#72eaf6] underline underline-offset-4">
                Design Servitor Skull
              </Link>{' '}
              builder first — this form submits that finalized build to the
              Codex.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <p className="text-sm text-[#9fd8d4]">
              Submitting the current build: {defaultHardware}.
            </p>

            <div>
              <label className="block text-sm text-[#5a8f8c]">Designation *</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#2a4a48] bg-[#0a1615] px-4 py-2 text-sm text-[#D4FFFD] focus:border-[#72eaf6] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#5a8f8c]">Class</label>
              <select
                value={unitClass}
                onChange={(e) => setUnitClass(e.target.value as 'FIRMWARE-CLASS' | 'LEGACY-CLASS')}
                className="mt-1 w-full rounded-lg border border-[#2a4a48] bg-[#0a1615] px-4 py-2 text-sm text-[#D4FFFD] focus:border-[#72eaf6] focus:outline-none"
              >
                <option value="FIRMWARE-CLASS">FIRMWARE-CLASS</option>
                <option value="LEGACY-CLASS">LEGACY-CLASS</option>
              </select>
            </div>

            {unitClass === 'LEGACY-CLASS' && (
              <div>
                <label className="block text-sm text-[#5a8f8c]">Persona/state layer</label>
                <input
                  type="text"
                  value={personaLayer}
                  onChange={(e) => setPersonaLayer(e.target.value)}
                  placeholder="script, config, LLM persona, etc."
                  className="mt-1 w-full rounded-lg border border-[#2a4a48] bg-[#0a1615] px-4 py-2 text-sm text-[#D4FFFD] focus:border-[#72eaf6] focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-[#5a8f8c]">Hardware</label>
              <input
                type="text"
                value={hardware}
                onChange={(e) => setHardware(e.target.value)}
                placeholder={defaultHardware}
                className="mt-1 w-full rounded-lg border border-[#2a4a48] bg-[#0a1615] px-4 py-2 text-sm text-[#D4FFFD] focus:border-[#72eaf6] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm text-[#5a8f8c]">Comm channel</label>
                <input
                  type="text"
                  value={commChannel}
                  onChange={(e) => setCommChannel(e.target.value)}
                  placeholder="local HTTP / SSH-TUI / other"
                  className="mt-1 w-full rounded-lg border border-[#2a4a48] bg-[#0a1615] px-4 py-2 text-sm text-[#D4FFFD] focus:border-[#72eaf6] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#5a8f8c]">Network ID</label>
                <input
                  type="text"
                  value={networkId}
                  onChange={(e) => setNetworkId(e.target.value)}
                  placeholder="hostname / IP / service number"
                  className="mt-1 w-full rounded-lg border border-[#2a4a48] bg-[#0a1615] px-4 py-2 text-sm text-[#D4FFFD] focus:border-[#72eaf6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#5a8f8c]">Status notes</label>
              <textarea
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-[#2a4a48] bg-[#0a1615] px-4 py-2 text-sm text-[#D4FFFD] focus:border-[#72eaf6] focus:outline-none"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg border border-[#2a4a48] bg-[#40E0D0] px-4 py-2 text-sm font-copperplate text-black opacity-80 hover:bg-[#72eaf6] hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? 'Registering…' : 'Register unit (status: BUILDING)'}
            </button>
          </form>
        )}

        <Link
          to="/codex"
          className="mt-12 inline-block text-sm text-[#72eaf6] underline underline-offset-4 hover:text-[#D4FFFD]"
        >
          &larr; Back to Codex
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
