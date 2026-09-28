'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';

const soundKey = 'portfolio-sound';
const soundChangeEvent = 'portfolio-sound-change';
let audioContext: AudioContext | null = null;

function subscribe(callback: () => void) {
  window.addEventListener(soundChangeEvent, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(soundChangeEvent, callback);
    window.removeEventListener('storage', callback);
  };
}

function soundEnabled() {
  return window.localStorage.getItem(soundKey) === 'on';
}

function setSoundEnabled(enabled: boolean) {
  window.localStorage.setItem(soundKey, enabled ? 'on' : 'off');
  window.dispatchEvent(new Event(soundChangeEvent));
}

function playTone(frequency = 380, duration = 0.065) {
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;

  audioContext ??= new AudioContextClass();
  if (audioContext.state === 'suspended') void audioContext.resume();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.08, now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.022, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.01);
}

function useSoundPreference() {
  return useSyncExternalStore(subscribe, soundEnabled, () => false);
}

export function SoundToggle() {
  const enabled = useSoundPreference();
  const label = enabled ? 'Mute interface sounds' : 'Enable interface sounds';

  function toggle() {
    const next = !enabled;
    setSoundEnabled(next);
    if (next) playTone(520, 0.09);
  }

  return (
    <button className="sound-toggle" type="button" aria-label={label} aria-pressed={enabled} title={label} data-sound-toggle onClick={toggle}>
      {enabled ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
    </button>
  );
}

export function SoundEffects() {
  const enabled = useSoundPreference();

  useEffect(() => {
    if (!enabled) return;

    function clickSound(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = target.closest<HTMLElement>('a, button');
      if (!control || control.matches(':disabled') || control.hasAttribute('data-sound-toggle')) return;

      if (control.classList.contains('funnel-target')) playTone(500);
      else if (control.classList.contains('lab-option')) playTone(control.getAttribute('aria-pressed') === 'true' ? 320 : 440);
      else if (control.classList.contains('button-primary')) playTone(430, 0.08);
      else playTone(350);
    }

    document.addEventListener('click', clickSound);
    return () => document.removeEventListener('click', clickSound);
  }, [enabled]);

  return null;
}
