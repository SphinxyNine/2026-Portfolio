'use client';

import { BookOpenText, BriefcaseBusiness, ClefBass, FileBadge, Keyboard, Layers3, Menu, MessageSquareText, PackageOpen, ShoppingBag, Wrench, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { profile } from '@/data/portfolio';
import { GitHubIcon, LinkedInIcon } from './brand-icons';
import { CopyEmail, ThemeToggle } from './contact-controls';

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
];

const lab = [
  { label: 'Ask anything', icon: MessageSquareText },
  { label: 'Typing test', icon: Keyboard },
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
              aria-current={active ? 'location' : undefined}>
              <span className="motion-icon"><Icon size={17} strokeWidth={1.6} aria-hidden="true" /></span><span>{label}</span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <aside className="desktop-sidebar" aria-label="Profile and navigation">
        <Link className="sidebar-brand" href="/" aria-label="Go to overview"><ClefBass className="brand-mark" size={16} aria-hidden="true" />{profile.shortName}</Link>
        <nav className="sidebar-group" aria-label="Explore">
          <p className="sidebar-group-label">Explore</p>
          {explore.map(({ label, icon: Icon, route }) => (
            <Link className={pathname.startsWith(route) ? 'nav-link is-active' : 'nav-link'} aria-current={pathname.startsWith(route) ? 'page' : undefined}
              href={route} key={route} onClick={() => setMenuOpen(false)}><span className="motion-icon"><Icon size={15} strokeWidth={1.6} aria-hidden="true" /></span><span>{label}</span></Link>
          ))}
        </nav>
        {nav()}
        <div className="sidebar-group sidebar-lab" aria-label="Planned interactive tools">
          <p className="sidebar-group-label"><span>Lab</span><small>In progress</small></p>
          {lab.map(({ label, icon: Icon }) => (
            <div className="sidebar-planned-row" key={label}><span className="motion-icon"><Icon size={15} strokeWidth={1.6} aria-hidden="true" /></span><span>{label}</span></div>
          ))}
        </div>
        <div className="sidebar-footer">
          <SocialLinks />
          <ThemeToggle />
          <CopyEmail />
        </div>
      </aside>
      <header className="mobile-header">
        <Link className="mobile-brand" href="/" onClick={() => setMenuOpen(false)} aria-label="Go to overview">
          <ClefBass className="brand-mark" size={16} aria-hidden="true" />{profile.shortName}
        </Link>
        <button ref={menuButton} className="icon-button menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>
      {menuOpen && (
        <div id="mobile-menu" ref={mobileMenu} className="mobile-menu">
          {nav()}
          <div className="mobile-menu-footer"><SocialLinks /><ThemeToggle /><CopyEmail /></div>
        </div>
      )}
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
