'use client';

import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CodeXml,
  Contact,
  ContactRound,
  FileBadge,
  Home,
  Layers3,
  Mail,
  Menu,
  UserRound,
  Wrench,
  X,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { profile } from '@/data/portfolio';
import { isSafeExternalUrl, isValidEmail } from '@/lib/links';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';

const navigation = [
  { href: '/', label: 'Overview', icon: Home },
  { href: '/work/', label: 'Selected work', icon: Layers3 },
  { href: '/experience/', label: 'Experience', icon: BriefcaseBusiness },
  { href: '/skills/', label: 'Skills & tools', icon: Wrench },
  { href: '/credentials/', label: 'Credentials', icon: FileBadge },
  { href: '/about/', label: 'About', icon: UserRound },
  { href: '/contact/', label: 'Contact', icon: Contact },
];

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href.replace(/\/$/, ''));
}

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="primary-nav" aria-label="Primary navigation">
      {navigation.map(({ href, label, icon: Icon }, index) => {
        const active = isActivePath(pathname, href);
        return (
          <Link
            href={href}
            key={href}
            onClick={onNavigate}
            className={active ? 'nav-link is-active' : 'nav-link'}
            aria-current={active ? 'page' : undefined}
          >
            <span className="nav-icon"><Icon size={16} strokeWidth={1.8} /></span>
            <span>{label}</span>
            <span className="nav-index">{String(index + 1).padStart(2, '0')}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SocialLinks() {
  return (
    <div className="sidebar-socials" aria-label="Social links">
      {isSafeExternalUrl(profile.socials.linkedin) && (
        <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <ContactRound size={16} />
        </a>
      )}
      {isSafeExternalUrl(profile.socials.github) && (
        <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <CodeXml size={16} />
        </a>
      )}
      {isValidEmail(profile.email) && (
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <Mail size={16} />
        </a>
      )}
      {!isSafeExternalUrl(profile.socials.linkedin) &&
        !isSafeExternalUrl(profile.socials.github) &&
        !isValidEmail(profile.email) && <span>Links to be added</span>}
    </div>
  );
}

function ProfileAvatar({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? 'profile-avatar is-compact' : 'profile-avatar'}>
      {profile.photo ? (
        <Image
          src={profile.photo}
          alt={`${profile.name} portrait`}
          fill
          sizes={compact ? '36px' : '88px'}
          priority={!compact}
        />
      ) : (
        <span aria-hidden="true">{profile.initials}</span>
      )}
    </span>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnHistoryNavigation = () => setMenuOpen(false);
    window.addEventListener('popstate', closeOnHistoryNavigation);
    return () => window.removeEventListener('popstate', closeOnHistoryNavigation);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <aside className="desktop-sidebar">
        <Link className="brand" href="/" aria-label={`${profile.name}, home`}>
          <ProfileAvatar />
          <span className="brand-copy">
            <strong>{profile.name}</strong>
            <small>{profile.title}</small>
          </span>
        </Link>

        <div className="sidebar-context">
          <span>Independent portfolio</span>
          <span>{profile.location}</span>
        </div>

        <Navigation />

        <div className="sidebar-footer">
          {profile.availability ? (
            <p className="availability"><span />{profile.availability}</p>
          ) : (
            <p className="availability muted"><span />Availability to be updated</p>
          )}
          <SocialLinks />
          <Link className="sidebar-contact" href="/contact/">
            Start a conversation <ArrowUpRight size={15} />
          </Link>
        </div>
      </aside>

      <header className="mobile-header">
        <Link className="mobile-brand" href="/" onClick={() => setMenuOpen(false)}>
          <ProfileAvatar compact />
          <span>
            <strong>{profile.name}</strong>
            <small>{profile.shortTitle}</small>
          </span>
        </Link>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Navigation onNavigate={() => setMenuOpen(false)} />
            <div className="mobile-menu-footer">
              <span>{profile.location}</span>
              <SocialLinks />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        id="main-content"
        className="site-main"
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.28 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
