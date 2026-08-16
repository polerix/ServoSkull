import { Link } from 'react-router-dom';
import { docs } from './docsRegistry';

// Shared cross-nav bar for every /codex/* page: a link back to the index
// plus a link to each sibling doc, with the current one highlighted.
// Used by CodexDoc.jsx (markdown-rendered docs) and RegistryPage.jsx
// (the structured registry) so the two rendering paths stay in sync.
const CodexNav = ({ activeSlug }) => (
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
