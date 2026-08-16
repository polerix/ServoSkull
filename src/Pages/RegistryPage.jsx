import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodexNav from './CodexNav';
import { getDoc } from './docsRegistry';
import units from '../data/units.json';

// STATUS vocabulary per docs/REGISTRATION_TRACKING.md / LORE_COMPENDIUM.md §3.
const STATUS_STYLES = {
  ACTIVE: 'bg-cyan-950 text-[#72eaf6] border-[#2a6a68]',
  BUILDING: 'bg-slate-900 text-slate-300 border-slate-700',
  DAMAGED: 'bg-amber-950 text-amber-400 border-amber-800',
  LOST: 'bg-amber-950 text-amber-400 border-amber-800',
  CORRUPTED: 'bg-purple-950 text-purple-300 border-purple-800',
  DESTROYED: 'bg-red-950 text-red-400 border-red-800',
  DECOMMISSIONED: 'bg-neutral-900 text-neutral-400 border-neutral-700',
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block rounded border px-2 py-0.5 text-xs font-bold tracking-wide ${
      STATUS_STYLES[status] || STATUS_STYLES.BUILDING
    }`}
  >
    {status}
  </span>
);

const UnitCard = ({ unit }) => (
  <div className="rounded-lg border border-[#2a4a48] bg-[#0a1615] p-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="font-copperplate text-xl text-[#72eaf6]">
        {unit.designation || 'Unnamed unit'}
      </h2>
      <div className="flex gap-2">
        <span className="inline-block rounded border border-[#2a4a48] px-2 py-0.5 text-xs text-[#9fd8d4]">
          {unit.class}
        </span>
        <StatusBadge status={unit.status} />
      </div>
    </div>

    {unit.class === 'LEGACY-CLASS' && unit.personaLayer && (
      <p className="mt-2 text-sm text-[#9fd8d4]">
        Persona/state layer: {unit.personaLayer}
      </p>
    )}

    <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
      {unit.hardware && (
        <div>
          <dt className="text-[#5a8f8c]">Hardware</dt>
          <dd className="text-[#D4FFFD]">{unit.hardware}</dd>
        </div>
      )}
      {unit.commChannel && (
        <div>
          <dt className="text-[#5a8f8c]">Comm channel</dt>
          <dd className="text-[#D4FFFD]">{unit.commChannel}</dd>
        </div>
      )}
      {unit.networkId && (
        <div>
          <dt className="text-[#5a8f8c]">Network ID</dt>
          <dd className="text-[#D4FFFD]">{unit.networkId}</dd>
        </div>
      )}
      {unit.firstDeployed && (
        <div>
          <dt className="text-[#5a8f8c]">First deployed</dt>
          <dd className="text-[#D4FFFD]">{unit.firstDeployed}</dd>
        </div>
      )}
      {unit.lastUpdated && (
        <div>
          <dt className="text-[#5a8f8c]">Last updated</dt>
          <dd className="text-[#D4FFFD]">{unit.lastUpdated}</dd>
        </div>
      )}
      {unit.gpioMapRef && (
        <div>
          <dt className="text-[#5a8f8c]">GPIO map</dt>
          <dd className="text-[#D4FFFD]">{unit.gpioMapRef}</dd>
        </div>
      )}
    </dl>

    {unit.statusNotes && (
      <p className="mt-4 border-t border-[#1a2f2d] pt-3 text-sm text-[#9fd8d4]">
        {unit.statusNotes}
      </p>
    )}
  </div>
);

const RegistryPage = () => {
  const fieldRefDoc = getDoc('registration-tracking');

  return (
    <div className="min-h-screen bg-black px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <CodexNav activeSlug="registration-tracking" />

        <h1 className="font-copperplate text-3xl text-[#D4FFFD] sm:text-4xl">
          ✠ Registration &amp; Tracking ✠
        </h1>
        <p className="mt-4 text-[#9fd8d4]">
          The operative register — one entry per physical unit, built or
          deployed. Sourced live from{' '}
          <code className="text-[#72eaf6]">src/data/units.json</code>.
        </p>

        <div className="mt-10 space-y-6">
          {units.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-8 text-center">
              <p className="text-[#D4FFFD]">No units registered yet.</p>
              <p className="mt-2 text-sm text-[#9fd8d4]">
                When the first physical unit is built, add an entry to{' '}
                <code className="text-[#72eaf6]">src/data/units.json</code>{' '}
                following the schema in the field reference below — it'll
                show up here automatically.
              </p>
            </div>
          ) : (
            units.map((unit, i) => (
              <UnitCard key={unit.designation || i} unit={unit} />
            ))
          )}
        </div>

        {fieldRefDoc && (
          <details className="mt-12 rounded-lg border border-[#2a4a48] bg-[#0a1615] p-6">
            <summary className="cursor-pointer font-copperplate text-lg text-[#72eaf6]">
              Field reference
            </summary>
            <article className="prose prose-invert mt-4 max-w-none prose-headings:font-copperplate prose-a:text-[#72eaf6]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {fieldRefDoc.content}
              </ReactMarkdown>
            </article>
          </details>
        )}
      </div>
    </div>
  );
};

export default RegistryPage;
