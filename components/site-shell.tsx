'use client';

import { Archive, ArrowRight, BookOpenText, BriefcaseBusiness, ClefBass, FileBadge, Layers3, Music2, PackageOpen, SearchCheck, ShoppingBag, Workflow, Wrench } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { profile } from '@/data/portfolio';
import { GitHubIcon, LinkedInIcon } from './brand-icons';
import { CopyEmail, ThemeToggle } from './contact-controls';
import { SoundEffects, SoundSettings } from './sound-controls';

const navigation = [
  { label: 'Projects', icon: Layers3, route: '/work' },
  { label: 'Tech stack', icon: Wrench, route: '/skills' },
  { label: 'Experience', icon: BriefcaseBusiness, route: '/experience' },
  { label: 'Certifications', icon: FileBadge, route: '/credentials' },
];

const explore = [
  { label: 'Resources', icon: PackageOpen, route: '/resources' },
  { label: 'Blog', icon: BookOpenText, route: '/blog' },
  { label: 'Shop', icon: ShoppingBag, route: '/shop' },
  { label: 'Archive', icon: Archive, route: '/archive' },
];

const lab = [
  { label: 'Play the keys', icon: Music2, route: '/lab/piano' },
  { label: 'Build a workflow', icon: Workflow, route: '/lab/workflow' },
  { label: 'Fix the funnel', icon: SearchCheck, route: '/lab/funnel' },
];

function SocialLinks() {
  return (
    <div className="sidebar-socials" aria-label="Social links">
      <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Zy Fausto on LinkedIn"><span className="social-icon"><LinkedInIcon width={14} height={14} /></span>LinkedIn</a>
      <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="SphinxyNine on GitHub"><span className="social-icon"><GitHubIcon width={14} height={14} /></span>GitHub</a>
    </div>
  );
}
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    mobileMenu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const media = window.matchMedia('(min-width: 901px)');
    const close = () => setMenuOpen(false);
    document.addEventListener('keydown', escape);
    window.addEventListener('popstate', close);
    media.addEventListener('change', close);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', escape);
      window.removeEventListener('popstate', close);
      media.removeEventListener('change', close);
    };
  }, [menuOpen]);

  function nav() {
    return (
      <nav className="primary-nav" aria-label="Primary navigation">
        <p className="sidebar-group-label">Portfolio</p>
        {navigation.map(({ label, icon: Icon, route }) => {
          const active = pathname.startsWith(route);
          return (
            <Link key={route} href={route} onClick={() => setMenuOpen(false)}
              className={active ? 'nav-link is-active' : 'nav-link'}
              aria-current={active ? 'page' : undefined}>
              <span className="motion-icon"><Icon size={17} strokeWidth={1.6} aria-hidden="true" /></span><span>{label}</span>
              {active && <ArrowRight className="nav-current-arrow" size={13} strokeWidth={1.7} aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>
    );
  }

  function exploreNav() {
    return (
      <nav className="sidebar-group" aria-label="Explore">
        <p className="sidebar-group-label">Explore</p>
        {explore.map(({ label, icon: Icon, route }) => {
          const active = pathname.startsWith(route);
          return (
            <Link className={active ? 'nav-link is-active' : 'nav-link'} aria-current={active ? 'page' : undefined}
              href={route} key={route} onClick={() => setMenuOpen(false)}>
              <span className="motion-icon"><Icon size={15} strokeWidth={1.6} aria-hidden="true" /></span><span>{label}</span>
              {active && <ArrowRight className="nav-current-arrow" size={13} strokeWidth={1.7} aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>
    );
  }

  function labNav() {
    return (
      <nav className="sidebar-group sidebar-lab" aria-label="Interactive lab">
        <p className="sidebar-group-label"><span>Lab</span><small>Interactive</small></p>
        {lab.map(({ label, icon: Icon, route }) => {
          const active = pathname.startsWith(route);
          return (
            <Link className={active ? 'nav-link is-active' : 'nav-link'} aria-current={active ? 'page' : undefined}
              href={route} key={route} onClick={() => setMenuOpen(false)}>
              <span className="motion-icon"><Icon size={15} strokeWidth={1.6} aria-hidden="true" /></span><span>{label}</span>
              {active && <ArrowRight className="nav-current-arrow" size={13} strokeWidth={1.7} aria-hidden="true" />}
            </Link>
          );
        })}
      </nav>
    );
  }

  function preferenceControls() {
    return <div className="preference-controls"><ThemeToggle /><SoundSettings /></div>;
  }

  return (
    <div className="site-shell">
      <SoundEffects />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <aside className="desktop-sidebar" aria-label="Profile and navigation">
        <Link className="sidebar-brand" href="/" aria-label={`${profile.shortName} — go to overview`}><ClefBass className="brand-mark" size={16} aria-hidden="true" />{profile.shortName}</Link>
        {nav()}
        {exploreNav()}
        {labNav()}
        <div className="sidebar-footer">
          <SocialLinks />
          {preferenceControls()}
          <CopyEmail />
        </div>
      </aside>
      <header className="mobile-header">
        <Link className="mobile-brand" href="/" onClick={() => setMenuOpen(false)} aria-label={`${profile.shortName} — go to overview`}>
          <ClefBass className="brand-mark" size={16} aria-hidden="true" />{profile.shortName}
        </Link>
        <button ref={menuButton} className={menuOpen ? 'icon-button menu-button is-open' : 'icon-button menu-button'} type="button" onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          <span className="menu-glyph" aria-hidden="true"><span /><span /><span /></span>
        </button>
      </header>
      <div id="mobile-menu" ref={mobileMenu} className={menuOpen ? 'mobile-menu is-open' : 'mobile-menu'} aria-hidden={!menuOpen} inert={!menuOpen}>
        {nav()}
        {exploreNav()}
        {labNav()}
        <div className="mobile-menu-footer"><SocialLinks />{preferenceControls()}<CopyEmail /></div>
      </div>
      <main id="main-content" className="site-main" tabIndex={-1}>
        {children}
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <div><a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon width={14} height={14} /> LinkedIn</a><a href={profile.socials.github} target="_blank" rel="noopener noreferrer"><GitHubIcon width={14} height={14} /> GitHub</a></div>
        </footer>
      </main>
    </div>
  );
}
