'use client';

import { useSyncExternalStore } from 'react';

export const themeKey = 'portfolio-theme';
const themeEvent = 'portfolio-theme-change';

function getSnapshot(): 'light' | 'dark' {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}
function systemTheme(): 'light' | 'dark' {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function storedTheme() {
  try {
    const value = localStorage.getItem(themeKey);
    return value === 'light' || value === 'dark' ? value : null;
  } catch { return null; }
}
function subscribe(onChange: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const sync = () => {
    document.documentElement.dataset.theme = storedTheme() || systemTheme();
    onChange();
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === themeKey || event.key === null) sync();
  };
  media.addEventListener('change', sync);
  window.addEventListener('storage', onStorage);
  window.addEventListener(themeEvent, onChange);
  return () => {
    media.removeEventListener('change', sync);
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(themeEvent, onChange);
  };
}
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'light' as const);
  function toggleTheme() {
    const next = getSnapshot() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(themeKey, next); } catch { /* Keep session theme if storage is unavailable. */ }
    window.dispatchEvent(new Event(themeEvent));
  }
  return { theme, toggleTheme };
}
