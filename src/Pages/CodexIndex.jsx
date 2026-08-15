import { Link } from 'react-router-dom';
import { docs } from './docsRegistry';

const CodexIndex = () => {
  return (
    <div className="min-h-screen bg-black px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-copperplate text-3xl text-[#D4FFFD] sm:text-4xl">
          ✠ Servo-Skull Codex ✠
        </h1>
        <p className="mt-4 text-[#9fd8d4]">
          Technical archive for the ServoSkull project — command/control
          spec, firmware target, per-unit registry, and the canon research
          behind them.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              to={`/codex/${doc.slug}`}
              className="block rounded-lg border border-[#2a4a48] bg-[#0a1615] p-6 transition hover:border-[#72eaf6] hover:bg-[#0f1f1e]"
            >
              <h2 className="font-copperplate text-xl text-[#72eaf6]">
                {doc.title}
              </h2>
              <p className="mt-2 text-sm text-[#9fd8d4]">{doc.blurb}</p>
            </Link>
          ))}
        </div>

        <Link
          to="/"
          className="mt-12 inline-block text-sm text-[#72eaf6] underline underline-offset-4 hover:text-[#D4FFFD]"
        >
          &larr; Back to site
        </Link>
      </div>
    </div>
  );
};

export default CodexIndex;
