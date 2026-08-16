import { Link } from 'react-router-dom';
import { docs } from '../docsRegistry';

interface CodexNavProps {
  activeSlug: string;
}

// Shared cross-nav bar for every /codex/docs/* page: a link back to the doc
// index plus a link to each sibling doc, with the current one highlighted.
const CodexNav = ({ activeSlug }: CodexNavProps) => (
  <nav className="mb-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
    <Link
      to="/codex/docs"
      className="text-[#72eaf6] underline underline-offset-4 hover:text-[#D4FFFD]"
    >
      &larr; Docs
    </Link>
    {docs.map((d) => (
      <Link
        key={d.slug}
        to={`/codex/docs/${d.slug}`}
        className={
          d.slug === activeSlug
            ? 'text-[#D4FFFD]'
            : 'text-[#5a8f8c] hover:text-[#72eaf6]'
        }
      >
        {d.title}
      </Link>
    ))}
  </nav>
);

export default CodexNav;
