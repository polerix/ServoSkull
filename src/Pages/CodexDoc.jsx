import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { docs, getDoc } from './docsRegistry';

const CodexDoc = () => {
  const { doc: slug } = useParams();
  const doc = getDoc(slug);

  if (!doc) {
    return <Navigate to="/codex" replace />;
  }

  return (
    <div className="min-h-screen bg-black px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link
            to="/codex"
            className="text-[#72eaf6] underline underline-offset-4 hover:text-[#D4FFFD]"
          >
            &larr; Codex
          </Link>
          {docs.map((d) => (
            <Link
              key={d.slug}
              to={`/codex/${d.slug}`}
              className={
                d.slug === doc.slug
                  ? 'text-[#D4FFFD]'
                  : 'text-[#5a8f8c] hover:text-[#72eaf6]'
              }
            >
              {d.title}
            </Link>
          ))}
        </nav>

        <article className="prose prose-invert max-w-none prose-headings:font-copperplate prose-a:text-[#72eaf6]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {doc.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default CodexDoc;
