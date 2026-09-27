'use client';

import { ArrowUpRight, BookOpenText, BriefcaseBusiness, CodeXml, FileBadge, Keyboard, Layers3, Menu, MessageSquareText, PackageOpen, ShoppingBag, Wrench, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { profile } from '@/data/portfolio';
import { CopyEmail, ThemeToggle } from './contact-controls';

const navigation = [
  { label: 'Projects', icon: Layers3, route: '/work' },
  { label: 'Tech stack', icon: Wrench, route: '/skills' },
  { label: 'Experience', icon: BriefcaseBusiness, route: '/experience' },
  { label: 'Certifications', icon: FileBadge, route: '/credentials' },
];

const explore = [
  { label: 'Resources', icon: PackageOpen },
  { label: 'Blog', icon: BookOpenText },
  { label: 'Shop', icon: ShoppingBag },
];

const lab = [
  { label: 'Ask anything', icon: MessageSquareText },
  { label: 'Typing test', icon: Keyboard },
];

function SocialLinks() {
  return (
    <div className="sidebar-socials" aria-label="Social links">
      <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Zy Fausto on LinkedIn">LinkedIn <ArrowUpRight size={14} /></a>
      <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="SphinxyNine on GitHub">GitHub <ArrowUpRight size={14} /></a>
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
        <Link className="sidebar-brand" href="/" aria-label="Go to overview">{profile.shortName}</Link>
        <div className="sidebar-group" aria-label="Planned sections">
          <p className="sidebar-group-label"><span>Explore</span><small>Coming soon</small></p>
          {explore.map(({ label, icon: Icon }) => (
            <div className="sidebar-planned-row" key={label}><span className="motion-icon"><Icon size={17} strokeWidth={1.6} aria-hidden="true" /></span><span>{label}</span></div>
          ))}
        </div>
        {nav()}
        <div className="sidebar-group sidebar-lab" aria-label="Planned interactive tools">
          <p className="sidebar-group-label"><span>Lab</span><small>In progress</small></p>
          {lab.map(({ label, icon: Icon }) => (
            <div className="sidebar-planned-row" key={label}><span className="motion-icon"><Icon size={17} strokeWidth={1.6} aria-hidden="true" /></span><span>{label}</span></div>
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
          {profile.shortName}
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
          <div><a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={profile.socials.github} target="_blank" rel="noopener noreferrer"><CodeXml size={14} aria-hidden="true" /> GitHub</a></div>
        </footer>
      </main>
    </div>
  );
}
