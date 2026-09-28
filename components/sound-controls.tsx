'use client';

import { Check, Play, Volume2, VolumeX, X } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

type SoundPreset = 'water' | 'click' | 'chime';
type SoundMoment = 'hover' | 'click' | 'preview';

const soundKey = 'portfolio-sound';
const presetKey = 'portfolio-sound-preset';
const soundChangeEvent = 'portfolio-sound-change';
const volumeBoost = 1.8;
let audioContext: AudioContext | null = null;

const presets: Array<{ id: SoundPreset; label: string; description: string }> = [
  { id: 'water', label: 'Water drop', description: 'A soft liquid pop' },
  { id: 'click', label: 'Click', description: 'A crisp interface tap' },
  { id: 'chime', label: 'Chime', description: 'A light two-note tone' },
];

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

function selectedPreset(): SoundPreset {
  const value = window.localStorage.getItem(presetKey);
  return value === 'click' || value === 'chime' ? value : 'water';
}

function updatePreference(key: string, value: string) {
  window.localStorage.setItem(key, value);
  window.dispatchEvent(new Event(soundChangeEvent));
}

function context() {
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  audioContext ??= new AudioContextClass();
  if (audioContext.state === 'suspended') void audioContext.resume();
  return audioContext;
}

function tone(frequency: number, duration: number, volume: number, delay = 0, wave: OscillatorType = 'sine') {
  const currentContext = context();
  if (!currentContext) return;
  const oscillator = currentContext.createOscillator();
  const gain = currentContext.createGain();
  const start = currentContext.currentTime + delay;
  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.06, start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume * volumeBoost, start + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(currentContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.01);
}

function waterDrop(hover: boolean) {
  const currentContext = context();
  if (!currentContext) return;
  const oscillator = currentContext.createOscillator();
  const gain = currentContext.createGain();
  const start = currentContext.currentTime;
  const duration = hover ? 0.055 : 0.12;
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(hover ? 720 : 880, start);
  oscillator.frequency.exponentialRampToValueAtTime(hover ? 430 : 360, start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime((hover ? 0.009 : 0.035) * volumeBoost, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(currentContext.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.01);
}

function playSound(preset: SoundPreset, moment: SoundMoment) {
  const hover = moment === 'hover';
  if (preset === 'water') {
    waterDrop(hover);
    return;
  }
  if (preset === 'click') {
    tone(hover ? 430 : 360, hover ? 0.03 : 0.05, hover ? 0.008 : 0.022, 0, 'triangle');
    if (!hover) tone(520, 0.035, 0.012, 0.025, 'square');
    return;
  }
  if (preset === 'chime') {
    tone(hover ? 520 : 440, hover ? 0.035 : 0.075, hover ? 0.005 : 0.014);
    if (!hover) tone(660, 0.09, 0.01, 0.045);
    return;
  }
}

function useSoundPreference() {
  return useSyncExternalStore(subscribe, soundEnabled, () => false);
}

function useSoundPreset() {
  return useSyncExternalStore(subscribe, selectedPreset, () => 'water' as SoundPreset);
}

export function SoundSettings() {
  const enabled = useSoundPreference();
  const preset = useSoundPreset();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOnOutsidePress(event: PointerEvent) {
      if (event.target instanceof Node && !wrapper.current?.contains(event.target)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  function toggleSound() {
    const next = !enabled;
    updatePreference(soundKey, next ? 'on' : 'off');
    if (next) playSound(preset, 'preview');
  }

  function choosePreset(nextPreset: SoundPreset) {
    updatePreference(presetKey, nextPreset);
    if (!enabled) updatePreference(soundKey, 'on');
    playSound(nextPreset, 'preview');
  }

  function togglePanel() {
    if (!open && enabled) playSound(preset, 'preview');
    setOpen((value) => !value);
  }

  return (
    <div className="sound-settings" ref={wrapper}>
      <button
        ref={trigger}
        className="sound-settings-trigger"
        type="button"
        aria-label="Open sound settings"
        aria-expanded={open}
        aria-controls="sound-settings-panel"
        title="Sound settings"
        data-sound-control
        onClick={togglePanel}
      >
        {enabled ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
      </button>

      {open && (
        <div className="sound-settings-panel" id="sound-settings-panel" role="dialog" aria-labelledby="sound-settings-title">
          <div className="sound-settings-heading">
            <div>
              <p className="eyebrow">Audio</p>
              <h2 id="sound-settings-title">Sound feedback</h2>
            </div>
            <button type="button" aria-label="Close sound settings" data-sound-control onClick={() => setOpen(false)}>
              <X size={15} aria-hidden="true" />
            </button>
          </div>

          <button className="sound-power" type="button" aria-pressed={enabled} data-sound-control onClick={toggleSound}>
            {enabled ? <Volume2 size={17} aria-hidden="true" /> : <VolumeX size={17} aria-hidden="true" />}
            <span>
              <strong>{enabled ? 'Sound on' : 'Muted'}</strong>
              <small>Hover and click feedback</small>
            </span>
          </button>

          <fieldset className="sound-presets">
            <legend>Choose a sound · previews instantly</legend>
            {presets.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={preset === item.id}
                data-sound-control
                onClick={() => choosePreset(item.id)}
              >
                <span className="sound-preview-icon">
                  {preset === item.id ? (
                    <Check size={13} aria-hidden="true" />
                  ) : (
                    <Play size={12} fill="currentColor" aria-hidden="true" />
                  )}
                </span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
              </button>
            ))}
          </fieldset>
        </div>
      )}
    </div>
  );
}

export function SoundEffects() {
  const enabled = useSoundPreference();
  const preset = useSoundPreset();

  useEffect(() => {
    if (!enabled) return;
    let lastHover = 0;

    function controlFrom(target: EventTarget | null) {
      if (!(target instanceof Element)) return null;
      const control = target.closest<HTMLElement>('a, button');
      if (!control || control.matches(':disabled') || control.hasAttribute('data-sound-control')) return null;
      return control;
    }

    function clickSound(event: MouseEvent) {
      if (controlFrom(event.target)) playSound(preset, 'click');
    }

    function hoverSound(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return;
      const control = controlFrom(event.target);
      if (!control) return;
      if (event.relatedTarget instanceof Node && control.contains(event.relatedTarget)) return;
      const now = performance.now();
      if (now - lastHover < 70) return;
      lastHover = now;
      playSound(preset, 'hover');
    }

    document.addEventListener('click', clickSound);
    document.addEventListener('pointerover', hoverSound);
    return () => {
      document.removeEventListener('click', clickSound);
      document.removeEventListener('pointerover', hoverSound);
    };
  }, [enabled, preset]);

  return null;
}
