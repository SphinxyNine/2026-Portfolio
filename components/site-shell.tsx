'use client';

import { ArrowUpRight, BookOpenText, BriefcaseBusiness, CodeXml, FileBadge, Keyboard, Layers3, Menu, MessageSquareText, PackageOpen, ShoppingBag, Wrench, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { profile } from '@/data/portfolio';
import { CopyEmail, ThemeToggle } from './contact-controls';

const navigation = [
  { id: 'projects', label: 'Projects', icon: Layers3, route: '/work' },
  { id: 'tech-stack', label: 'Tech Stack', icon: Wrench, route: '/skills' },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness, route: '/experience' },
  { id: 'certifications', label: 'Certifications', icon: FileBadge, route: '/credentials' },
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
      <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Zyron Fausto on LinkedIn">LinkedIn <ArrowUpRight size={14} /></a>
      <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="SphinxyNine on GitHub">GitHub <ArrowUpRight size={14} /></a>
    </div>
  );
}
function ProfileAvatar({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? 'profile-avatar is-compact' : 'profile-avatar'}>
      {profile.photo ? <Image src={profile.photo} alt={profile.photoAlt} fill sizes={compact ? '36px' : '88px'} priority /> : <span aria-hidden="true">{profile.initials}</span>}
    </span>
  );
}
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== '/') return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.home-page > section[data-nav-section]'));
    let frame = 0;
    const update = () => {
      const marker = window.innerWidth <= 900 ? 130 : 150;
      let current = 'introduction';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) current = section.id;
      }
      if (window.scrollY > 100 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = 'certifications';
      setActiveSection(current === 'introduction' ? '' : current);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(schedule, { threshold: [0, 0.2, 0.5, 1] });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname]);

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

  function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setMenuOpen(false);
    if (pathname !== '/') return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    history.pushState(null, '', `/#${id}`);
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    target.focus({ preventScroll: true });
  }

  function nav() {
    return (
      <nav className="primary-nav" aria-label="Primary navigation">
        {navigation.map(({ id, label, icon: Icon, route }) => {
          const active = pathname === '/' ? activeSection === id : pathname.startsWith(route);
          return (
            <Link key={id} href={`/#${id}`} onClick={(event) => navigate(event, id)}
              className={active ? 'nav-link is-active' : 'nav-link'}
              aria-current={active ? 'location' : undefined}>
              <span className="motion-icon"><Icon size={18} strokeWidth={1.6} aria-hidden="true" /></span><span>{label}</span>
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
        <div className="profile-block">
          <Link className="avatar-home" href="/#introduction" aria-label="Back to introduction" onClick={(event) => navigate(event, 'introduction')}><ProfileAvatar /></Link>
          <p className="profile-name">{profile.name}</p>
          <p className="profile-title">{profile.title}</p>
          <p className="profile-location">{profile.location}</p>
        </div>
        <div className="sidebar-group" aria-label="Planned sections">
          <p className="sidebar-group-label">Explore</p>
          {explore.map(({ label, icon: Icon }) => (
            <div className="sidebar-planned-row" key={label}><span className="motion-icon"><Icon size={16} aria-hidden="true" /></span><span>{label}</span><small>Soon</small></div>
          ))}
        </div>
        {nav()}
        <div className="sidebar-group sidebar-lab" aria-label="Planned interactive tools">
          <p className="sidebar-group-label">Lab</p>
          {lab.map(({ label, icon: Icon }) => (
            <div className="sidebar-planned-row" key={label}><span className="motion-icon"><Icon size={16} aria-hidden="true" /></span><span>{label}</span><small>Planned</small></div>
          ))}
        </div>
        <div className="sidebar-footer">
          <SocialLinks />
          <ThemeToggle />
          <CopyEmail />
        </div>
      </aside>
      <header className="mobile-header">
        <Link className="mobile-brand" href="/#introduction" onClick={(event) => navigate(event, 'introduction')} aria-label="Back to introduction">
          <ProfileAvatar compact /><span>{profile.shortName}</span>
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
