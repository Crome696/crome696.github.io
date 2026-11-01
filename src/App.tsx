import { ArrowLeft, ExternalLink, Menu, MoveRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  beyondCodeItems,
  heroTechStackItems,
  navItems,
  profile,
  profileSections,
  professionalFocusItems,
  projectTimelineItems,
  projects,
  stackItems,
  type LinkItem,
  type Project,
  whatIDoItems,
  workingMethodItems,
} from "./data/content";
import { ProjectImageFrame } from "./components/ProjectImageFrame";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/stack" element={<StackPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand-mark" to="/" onClick={() => setIsOpen(false)}>
        <span className="brand-dot" aria-hidden="true" />
        crome696
      </Link>
      <button
        className="nav-toggle"
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={isOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => (isActive ? "active" : undefined)}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        <a
          className="github-nav"
          href={profile.socials[0].href}
          target="_blank"
          rel="noreferrer"
          aria-label="Open GitHub profile"
          onClick={() => setIsOpen(false)}
        >
          <GitHubMark size={20} />
        </a>
      </nav>
    </header>
  );
}

function HomePage() {
  const featured = projectTimelineItems
    .slice(0, 3)
    .flatMap((item) => projects.filter((project) => project.slug === item.projectSlug));

  return (
    <>
      <Hero />
      <section className="section" aria-labelledby="featured-title">
        <div className="section-head">
          <p className="eyebrow">Selected work</p>
          <h2 id="featured-title">Things I built, ran, and learned from.</h2>
          <Link className="text-link" to="/projects">
            All projects <MoveRight size={16} />
          </Link>
        </div>
        <ol className="work-list">
          {featured.map((project, index) => (
            <WorkRow key={project.slug} project={project} index={index + 1} />
          ))}
        </ol>
      </section>
      <section className="section" aria-labelledby="focus-title">
        <div className="section-head">
          <p className="eyebrow">Focus</p>
          <h2 id="focus-title">What I work with, and how.</h2>
        </div>
        <div className="focus-grid">
          <TagGroup title="Tech" items={heroTechStackItems} />
          <TagGroup title="Focus" items={professionalFocusItems} />
          <TagGroup title="Ways of working" items={workingMethodItems} />
        </div>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="eyebrow">
        <span className="status-dot" aria-hidden="true" />
        {profile.role} · {profile.location}
      </p>
      <h1 id="hero-title">
        Hi, I'm {profile.name}.
        <br />
        <span className="hero-accent">{profile.handle}</span> online.
      </h1>
      <p className="hero-summary">
        {profile.headline} {profile.summary}
      </p>
      <div className="hero-actions">
        <Link className="button button-primary" to="/projects">
          View projects <MoveRight size={18} />
        </Link>
        <a
          className="button button-secondary"
          href={profile.socials[0].href}
          target="_blank"
          rel="noreferrer"
        >
          <GitHubMark size={18} /> GitHub
        </a>
      </div>
    </section>
  );
}

function TagGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="tag-group">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function WorkRow({ project, index }: { project: Project; index: number }) {
  return (
    <li className={`work-row accent-${project.accent}`}>
      <Link
        className="work-link"
        to={`/projects/${project.slug}`}
        state={{ fromProjects: false }}
      >
        <span className="work-index">{String(index).padStart(2, "0")}</span>
        <span className="work-main">
          <span className="work-title">{project.title}</span>
          <span className="work-summary">{project.summary}</span>
        </span>
        <span className="work-meta">
          <span>{project.category}</span>
          <span>{project.period}</span>
        </span>
        <MoveRight className="work-arrow" size={20} aria-hidden="true" />
      </Link>
    </li>
  );
}

function ProjectsPage() {
  return (
    <PageShell
      eyebrow="Projects"
      title="Projects, newest first."
      summary="Engineering work across game-server operations, client scripting, external APIs, Windows automation research, and media tooling."
    >
      <div className="project-grid">
        {projectTimelineItems.map((item) => {
          const project = projects.find((candidate) => candidate.slug === item.projectSlug);

          return project ? (
            <ProjectCard key={project.slug} project={project} period={item.period} />
          ) : null;
        })}
      </div>
    </PageShell>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const project = useMemo(
    () => projects.find((candidate) => candidate.slug === slug),
    [slug],
  );
  const cameFromProjects =
    (location.state as { fromProjects?: boolean } | null)?.fromProjects === true;

  const handleBackToProjects = () => {
    if (cameFromProjects) {
      navigate(-1);
      return;
    }

    navigate("/projects");
  };

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <PageShell eyebrow={project.category} title={project.title} summary={project.summary}>
      <div className="detail-navigation">
        <button className="detail-back-button" type="button" onClick={handleBackToProjects}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to projects
        </button>
      </div>
      <div className="detail-layout">
        <div className="detail-main">
          <ProjectImageFrame image={project.image} title={project.title} large />
          <section className="detail-section">
            <h2>Challenge</h2>
            <p>{project.challenge}</p>
          </section>
          <section className="detail-section">
            <h2>Role</h2>
            <p>{project.role}</p>
          </section>
          <section className="detail-section">
            <h2>Highlights</h2>
            <ul className="check-list">
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="detail-aside">
          {project.period ? (
            <>
              <h2>Period</h2>
              <p>{project.period}</p>
            </>
          ) : null}
          <h2>Stack</h2>
          <div className="tag-cloud">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          {project.roles?.length ? (
            <>
              <h2>Roles</h2>
              <div className="tag-cloud">
                {project.roles.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </>
          ) : null}
          {project.links.length ? (
            <>
              <h2>Links</h2>
              <div className="link-stack">
                {project.links.map((link) => (
                  <SmartLink key={link.label} link={link} className="detail-link" />
                ))}
              </div>
            </>
          ) : null}
        </aside>
      </div>
    </PageShell>
  );
}

function ProfilePage() {
  return (
    <PageShell
      eyebrow="Profile"
      title={`${profile.name}, aka ${profile.handle}`}
      summary="Tech Lead in the international financial services sector, AI enthusiast, problem solver, and lifelong learner."
    >
      <div className="profile-story">
        <p>
          This GitHub profile is a private digital realm: a place to explore
          ideas, document projects, experiment with technology, and share parts
          of a personal journey as a developer, problem solver, AI enthusiast,
          and lifelong learner.
        </p>
        <p>
          Good engineering is not only about writing clean code. It is also
          about creating clarity, enabling teams, making thoughtful technical
          decisions, and continuously improving how software is built.
        </p>
      </div>
      <div className="card-grid">
        {profileSections.map((section) => (
          <section className="card" key={section.title}>
            <section.icon size={22} />
            <h2>{section.title}</h2>
            <p>{section.copy}</p>
          </section>
        ))}
      </div>
      <ProfileListSection eyebrow="What I do" title="What I Do" items={whatIDoItems} />
      <ProfileListSection eyebrow="Beyond code" title="Beyond Code" items={beyondCodeItems} />
    </PageShell>
  );
}

function StackPage() {
  return (
    <PageShell
      eyebrow="Stack"
      title="Leadership, architecture, and practical engineering."
      summary="A working focus shaped by technical leadership, maintainable systems, AI-supported experimentation, and product value."
    >
      <div className="card-grid">
        {stackItems.map((item) => (
          <article className="card" key={item.label}>
            <item.icon size={22} />
            <h2>{item.label}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

function ProfileListSection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: Array<{ title: string; copy: string }>;
}) {
  const id = title.toLowerCase().replace(/\s/g, "-");

  return (
    <section className="list-section" aria-labelledby={id}>
      <div className="list-section-head">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <dl className="list-section-items">
        {items.map((item) => (
          <div key={item.title}>
            <dt>{item.title}</dt>
            <dd>{item.copy}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function PageShell({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-shell" aria-labelledby="page-title">
      <div className="page-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p>{summary}</p>
      </div>
      {children}
    </section>
  );
}

function ProjectCard({ project, period }: { project: Project; period: string }) {
  return (
    <article className={`project-card accent-${project.accent}`}>
      <Link
        className="project-card-hit-area"
        to={`/projects/${project.slug}`}
        state={{ fromProjects: true }}
        aria-label={`Open ${project.title} project`}
      />
      <ProjectImageFrame image={project.image} title={project.title} />
      <div className="project-body">
        <p className="project-meta">
          <span>{project.category}</span>
          <span>{period}</span>
        </p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <span className="project-card-cta" aria-hidden="true">
          View case study <MoveRight size={16} />
        </span>
      </div>
    </article>
  );
}

function SmartLink({
  link,
  className,
}: {
  link: LinkItem;
  className?: string;
}) {
  if (link.external) {
    return (
      <a className={className} href={link.href} target="_blank" rel="noreferrer">
        {link.label} <ExternalLink size={15} />
      </a>
    );
  }

  return (
    <Link className={className} to={link.href}>
      {link.label} <MoveRight size={15} />
    </Link>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>crome696 · {new Date().getFullYear()}</p>
      <a href={profile.socials[0].href} target="_blank" rel="noreferrer">
        GitHub <ExternalLink size={14} />
      </a>
    </footer>
  );
}

function GitHubMark({
  size = 20,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.52 2.86 8.36 6.84 9.72.5.1.68-.22.68-.5v-1.9c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.32 9.32 0 0 1 12 6.95c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.81c0 .28.18.6.69.5A10.12 10.12 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export default App;
