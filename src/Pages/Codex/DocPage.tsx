import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getDoc } from '../docsRegistry';
import CodexNav from './CodexNav';

const DocPage = () => {
  const { doc: slug } = useParams();
  const doc = getDoc(slug);

  if (!doc) {
    return <Navigate to="/codex/docs" replace />;
  }

  return (
    <div className="min-h-screen bg-black px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-4xl">
        <CodexNav activeSlug={doc.slug} />

        <article className="prose prose-invert max-w-none prose-headings:font-copperplate prose-a:text-[#72eaf6]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {doc.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default DocPage;
