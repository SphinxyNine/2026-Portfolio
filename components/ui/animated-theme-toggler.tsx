'use client';

// Adapted from the supplied Magic UI Animated Theme Toggler by Nazam Kalsi,
// chishiyac, and dikshantgulekar20-oss. Uses the portfolio's theme store.
import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { flushSync } from 'react-dom';
import { useTheme, type ThemePreference } from '@/lib/theme';

export type TransitionVariant = 'circle' | 'square' | 'triangle' | 'diamond' | 'rectangle' | 'hexagon' | 'star';
type AnimatedThemeTogglerProps = ComponentPropsWithoutRef<'button'> & {
  duration?: number;
  variant?: TransitionVariant;
  fromCenter?: boolean;
};

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(", ")
  return `polygon(${pairs})`
}

// All coordinates are percentages of the snapshot reference box: Chrome 150
// renders absolute px clip-path coordinates on ::view-transition-new(root)
// unscaled on fractional display scales (e.g. Windows 150%) for the first
// transition after load, so px values land at the wrong position (#989).
function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`
  // circle() percentage radii resolve against hypot(w, h) / sqrt(2) of the reference box.
  const toRadius = (r: number) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`

  switch (variant) {
    case "circle":
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ]
    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const halfSide = Math.max(halfW, halfH) * 1.05
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "triangle": {
      const scale = maxRadius * 2.2
      const dx = (Math.sqrt(3) / 2) * scale
      const verts = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 3), `polygon(${verts})`]
    }
    case "diamond": {
      // Slightly larger than the view-transition circle radius so axis-aligned coverage matches the circle reveal.
      const R = maxRadius * Math.SQRT2
      const end = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "hexagon": {
      const R = maxRadius * Math.SQRT2
      const verts: string[] = []
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3
        verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)))
      }
      return [
        polygonCollapsed(point(cx, cy), 6),
        `polygon(${verts.join(", ")})`,
      ]
    }
    case "rectangle": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const end = [
        point(cx - halfW, cy - halfH),
        point(cx + halfW, cy - halfH),
        point(cx + halfW, cy + halfH),
        point(cx - halfW, cy + halfH),
      ].join(", ")
      return [polygonCollapsed(point(cx, cy), 4), `polygon(${end})`]
    }
    case "star": {
      // Small overscan so the last frames never leave a 1px seam before the transition group ends.
      const innerRatio = 0.42
      const R = (maxRadius / innerRatio) * 1.1
      const starPolygon = (radius: number) => {
        const verts: string[] = []
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5
          verts.push(
            point(
              cx + radius * Math.cos(outerA),
              cy + radius * Math.sin(outerA)
            )
          )
          const innerA = outerA + Math.PI / 5
          verts.push(
            point(
              cx + radius * innerRatio * Math.cos(innerA),
              cy + radius * innerRatio * Math.sin(innerA)
            )
          )
        }
        return `polygon(${verts.join(", ")})`
      }
      const startR = Math.max(2, R * 0.025)
      return [starPolygon(startR), starPolygon(R)]
    }
    default:
      return [
        `circle(0% at ${point(cx, cy)})`,
        `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`,
      ]
  }
}


export function AnimatedThemeToggler({
  duration = 450,
  variant = 'circle',
  fromCenter = false,
  className = 'theme-toggle',
  onClick,
  children,
  ...props
}: AnimatedThemeTogglerProps) {
  const { theme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const activeRef = useRef<{ transition: ViewTransition; cancel: () => void } | null>(null);
  const dark = theme === 'dark';

  useEffect(() => () => {
    activeRef.current?.transition.skipTransition();
    activeRef.current?.cancel();
  }, []);

  async function toggle() {
    const root = document.documentElement;
    const button = buttonRef.current;
    if (!button || root.dataset.themeTransition === 'active') return;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    let applied = false;
    const apply = () => {
      if (applied) return;
      applied = true;
      flushSync(() => setTheme(next));
    };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || duration <= 0 || typeof document.startViewTransition !== 'function' || typeof root.animate !== 'function') {
      apply();
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const rect = button.getBoundingClientRect();
    const x = fromCenter ? width / 2 : rect.left + rect.width / 2;
    const y = fromCenter ? height / 2 : rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
    const clipPath = getThemeTransitionClipPaths(variant, x, y, radius, width, height);
    let animation: Animation | undefined;
    let transition: ViewTransition | undefined;
    let cancelled = false;
    const stopForReducedMotion = () => { if (motion.matches) transition?.skipTransition(); };
    const cleanup = () => {
      if (cancelled) return;
      cancelled = true;
      animation?.cancel();
      root.removeAttribute('data-theme-transition');
      root.style.removeProperty('--theme-reveal-duration');
      root.style.removeProperty('--theme-reveal-start');
      activeRef.current = null;
      motion.removeEventListener('change', stopForReducedMotion);
    };

    root.setAttribute('data-theme-transition', 'active');
    root.style.setProperty('--theme-reveal-duration', `${duration}ms`);
    root.style.setProperty('--theme-reveal-start', clipPath[0]);
    motion.addEventListener('change', stopForReducedMotion);
    try {
      transition = document.startViewTransition(apply);
      activeRef.current = { transition, cancel: cleanup };
      void transition.finished.then(cleanup, cleanup);
      await transition.ready;
      if (cancelled || motion.matches) {
        transition.skipTransition();
        return;
      }
      animation = root.animate({ clipPath }, {
        duration, easing: variant === 'star' ? 'linear' : 'ease-in-out',
        fill: 'forwards', pseudoElement: '::view-transition-new(root)',
      });
      await animation.finished;
      await transition.finished;
    } catch {
      // A skipped/unsupported snapshot must never block the actual theme change.
      transition?.skipTransition();
      apply();
    } finally {
      cleanup();
    }
  }

  return (
    <button {...props} type="button" ref={buttonRef} className={className}
      aria-label={props['aria-label'] || `Switch to ${dark ? 'light' : 'dark'} mode`}
      onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) void toggle(); }}>
      {children || <><span className="theme-toggle-icon" aria-hidden="true" key={theme}>{dark ? <Sun size={17} /> : <Moon size={17} />}</span><span>{dark ? 'Light mode' : 'Dark mode'}</span></>}
    </button>
  );
}

const themeChoices: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: 'system', label: 'Use system theme', icon: Monitor },
  { value: 'light', label: 'Use light theme', icon: Sun },
  { value: 'dark', label: 'Use dark theme', icon: Moon },
];

export function AnimatedThemeSelector({ duration = 450 }: { duration?: number }) {
  const { theme, preference, setPreference } = useTheme();
  const activeRef = useRef<{ transition: ViewTransition; cancel: () => void } | null>(null);

  useEffect(() => () => {
    activeRef.current?.transition.skipTransition();
    activeRef.current?.cancel();
  }, []);

  async function select(next: ThemePreference, button: HTMLButtonElement) {
    if (next === preference) return;
    const root = document.documentElement;
    if (root.dataset.themeTransition === 'active') return;
    const resolved = next === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : next;
    let applied = false;
    const apply = () => {
      if (applied) return;
      applied = true;
      flushSync(() => setPreference(next));
    };
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (resolved === theme || motion.matches || duration <= 0 || typeof document.startViewTransition !== 'function' || typeof root.animate !== 'function') {
      apply();
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
    const clipPath = getThemeTransitionClipPaths('circle', x, y, radius, width, height);
    let animation: Animation | undefined;
    let transition: ViewTransition | undefined;
    let cancelled = false;
    const stopForReducedMotion = () => { if (motion.matches) transition?.skipTransition(); };
    const cleanup = () => {
      if (cancelled) return;
      cancelled = true;
      animation?.cancel();
      root.removeAttribute('data-theme-transition');
      root.style.removeProperty('--theme-reveal-duration');
      root.style.removeProperty('--theme-reveal-start');
      activeRef.current = null;
      motion.removeEventListener('change', stopForReducedMotion);
    };

    root.setAttribute('data-theme-transition', 'active');
    root.style.setProperty('--theme-reveal-duration', `${duration}ms`);
    root.style.setProperty('--theme-reveal-start', clipPath[0]);
    motion.addEventListener('change', stopForReducedMotion);
    try {
      transition = document.startViewTransition(apply);
      activeRef.current = { transition, cancel: cleanup };
      void transition.finished.then(cleanup, cleanup);
      await transition.ready;
      if (cancelled || motion.matches) {
        transition.skipTransition();
        return;
      }
      animation = root.animate({ clipPath }, {
        duration, easing: 'ease-in-out', fill: 'forwards', pseudoElement: '::view-transition-new(root)',
      });
      await animation.finished;
      await transition.finished;
    } catch {
      transition?.skipTransition();
      apply();
    } finally {
      cleanup();
    }
  }

  return (
    <div className="theme-selector" role="group" aria-label="Theme preference">
      {themeChoices.map(({ value, label, icon: Icon }) => (
        <button key={value} type="button" className="theme-choice" aria-label={label} title={label}
          aria-pressed={preference === value} onClick={(event) => void select(value, event.currentTarget)}>
          <Icon size={14} strokeWidth={1.7} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
