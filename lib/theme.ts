'use client';

import { useSyncExternalStore } from 'react';

export const themeKey = 'portfolio-theme';
const themeEvent = 'portfolio-theme-change';
export type ThemePreference = 'system' | 'light' | 'dark';

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
function getPreferenceSnapshot(): ThemePreference {
  return storedTheme() || 'system';
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
  const preference = useSyncExternalStore(subscribe, getPreferenceSnapshot, () => 'system' as const);
  function setPreference(next: ThemePreference) {
    document.documentElement.dataset.theme = next === 'system' ? systemTheme() : next;
    try {
      if (next === 'system') localStorage.removeItem(themeKey);
      else localStorage.setItem(themeKey, next);
    } catch { /* Keep the current session theme if storage is unavailable. */ }
    window.dispatchEvent(new Event(themeEvent));
  }
  function setTheme(next: 'light' | 'dark') { setPreference(next); }
  function toggleTheme() {
    setTheme(getSnapshot() === 'dark' ? 'light' : 'dark');
  }
  return { theme, preference, setPreference, setTheme, toggleTheme };
}
