import { ArrowLeft, ExternalLink, Menu, MoveRight, X } from "lucide-react";
import { useMemo, useState } from "react";
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

function App() {
  return (
    <div className="site-shell">
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
  const location = useLocation();

  return (
    <header className="site-header">
      <Link className="brand-mark" to="/" onClick={() => setIsOpen(false)}>
        <span>Crome</span>
        <span>696</span>
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
            className={({ isActive }) =>
              isActive || (location.pathname === "/" && item.href === "/projects")
                ? "active"
                : undefined
            }
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
      <span className="route-sentinel" aria-hidden="true">
        {location.pathname}
      </span>
    </header>
  );
}

function HomePage() {
  return <Hero />;
}

function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-copy">
          <h1 id="hero-title">
            Crome<span>696</span>
          </h1>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-actions" aria-label="Primary actions">
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
        </div>
        <aside className="hero-panel" aria-label="Profile overview">
          <section className="overview-section">
            <h2>Profile</h2>
            <dl className="profile-facts">
              <div>
                <dt>Name</dt>
                <dd>{profile.name}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{profile.role}</dd>
              </div>
            </dl>
          </section>
          <OverviewList title="Tech Stack" items={heroTechStackItems} />
          <OverviewList title="Purpose / Professional Focus" items={professionalFocusItems} />
          <OverviewList title="Methods / Ways of Working" items={workingMethodItems} />
        </aside>
      </div>
    </section>
  );
}

function OverviewList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="overview-section">
      <h2>{title}</h2>
      <ul className="overview-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function ProjectsPage() {
  return (
    <PageShell
      eyebrow="// projects"
      title="Selected projects"
      summary="A focused overview of engineering work across game-server operations, client scripting, external APIs, Windows automation research, and media tooling."
    >
      <section className="projects-stage" aria-label="Project timeline and case studies">
        <ProjectTimelineShowcase />
      </section>
    </PageShell>
  );
}

function ProjectTimelineShowcase() {
  return (
    <section className="project-timeline" aria-label="Project timeline">
      <div className="project-timeline-track">
        {projectTimelineItems.map((item) => {
          const project = projects.find((candidate) => candidate.slug === item.projectSlug);

          if (!project) {
            return null;
          }

          return (
            <div className={`project-timeline-row accent-${project.accent}`} key={item.projectSlug}>
              <div className="project-timeline-marker">
                <time>{item.period}</time>
              </div>
              <ProjectCard project={project} prominent />
            </div>
          );
        })}
      </div>
    </section>
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
      eyebrow="// profile"
      title={`${profile.name} aka ${profile.handle}`}
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
      <div className="profile-layout">
        {profileSections.map((section) => (
          <section className="profile-card" key={section.title}>
            <section.icon size={22} />
            <h2>{section.title}</h2>
            <p>{section.copy}</p>
          </section>
        ))}
      </div>
      <ProfileListSection
        eyebrow="// what i do"
        title="What I Do"
        items={whatIDoItems}
      />
      <ProfileListSection
        eyebrow="// beyond code"
        title="Beyond Code"
        items={beyondCodeItems}
        compact
      />
    </PageShell>
  );
}

function StackPage() {
  return (
    <PageShell
      eyebrow="// stack"
      title="Leadership, architecture, and practical engineering"
      summary="A working focus shaped by technical leadership, maintainable systems, AI-supported experimentation, and product value."
    >
      <div className="stack-grid">
        {stackItems.map((item) => (
          <article className="stack-card" key={item.label}>
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
  compact = false,
}: {
  eyebrow: string;
  title: string;
  items: Array<{ title: string; copy: string }>;
  compact?: boolean;
}) {
  return (
    <section className="profile-section" aria-labelledby={title.toLowerCase().replace(/\s/g, "-")}>
      <div className="profile-section-heading">
        <p className="section-code">{eyebrow}</p>
        <h2 id={title.toLowerCase().replace(/\s/g, "-")}>{title}</h2>
      </div>
      <div className={compact ? "profile-list-grid is-compact" : "profile-list-grid"}>
        {items.map((item) => (
          <article className="profile-list-item" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
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
        <p className="section-code">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p>{summary}</p>
      </div>
      {children}
    </section>
  );
}

function ProjectCard({
  project,
  prominent = false,
}: {
  project: Project;
  prominent?: boolean;
}) {
  return (
    <article className={`project-card accent-${project.accent}`}>
      <Link
        className="project-card-hit-area"
        to={`/projects/${project.slug}`}
        state={{ fromProjects: true }}
        aria-label={`Open ${project.title} project`}
      >
        <span className="sr-only">Open {project.title} project</span>
      </Link>
      <ProjectImageFrame image={project.image} title={project.title} />
      <div className="project-body">
        <p>{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="project-card-footer">
        <span className="project-card-cta" aria-hidden="true">
          {prominent ? "Open case study" : "View details"} <MoveRight size={16} />
        </span>
        <a href={profile.socials[0].href} target="_blank" rel="noreferrer" aria-label="GitHub">
          <GitHubMark size={18} />
        </a>
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
      <p>Crome696</p>
      <p>2004-2026 - Crome696</p>
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
