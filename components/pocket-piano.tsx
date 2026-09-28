'use client';

import { Minus, Plus, Volume2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';

type PianoNote = {
  name: string;
  semitone: number;
  keyboardKey: string;
  accidental?: boolean;
  position?: number;
};

type Voice = {
  oscillators: OscillatorNode[];
  envelope: GainNode;
};

const notes: PianoNote[] = [
  { name: 'C', semitone: 0, keyboardKey: 'A' },
  { name: 'C♯', semitone: 1, keyboardKey: 'W', accidental: true, position: 1 },
  { name: 'D', semitone: 2, keyboardKey: 'S' },
  { name: 'D♯', semitone: 3, keyboardKey: 'E', accidental: true, position: 2 },
  { name: 'E', semitone: 4, keyboardKey: 'D' },
  { name: 'F', semitone: 5, keyboardKey: 'F' },
  { name: 'F♯', semitone: 6, keyboardKey: 'T', accidental: true, position: 4 },
  { name: 'G', semitone: 7, keyboardKey: 'G' },
  { name: 'G♯', semitone: 8, keyboardKey: 'Y', accidental: true, position: 5 },
  { name: 'A', semitone: 9, keyboardKey: 'H' },
  { name: 'A♯', semitone: 10, keyboardKey: 'U', accidental: true, position: 6 },
  { name: 'B', semitone: 11, keyboardKey: 'J' },
  { name: 'C', semitone: 12, keyboardKey: 'K' },
];

const keyMap = new Map(notes.map((note) => [note.keyboardKey.toLowerCase(), note]));

function frequencyFor(octave: number, semitone: number) {
  const midi = 12 * (octave + 1) + semitone;
  return 440 * 2 ** ((midi - 69) / 12);
}

function displayedNote(note: PianoNote, octave: number) {
  return `${note.name}${note.semitone === 12 ? octave + 1 : octave}`;
}

export function PocketPiano() {
  const [octave, setOctave] = useState(4);
  const [volume, setVolume] = useState(0.7);
  const [activeNotes, setActiveNotes] = useState<Set<number>>(() => new Set());
  const [lastPlayed, setLastPlayed] = useState('Ready to play');
  const contextRef = useRef<AudioContext | null>(null);
  const voicesRef = useRef<Map<number, Voice>>(new Map());
  const whiteNotes = useMemo(() => notes.filter((note) => !note.accidental), []);
  const blackNotes = useMemo(() => notes.filter((note) => note.accidental), []);

  const stopNote = useCallback((note: PianoNote) => {
    const voice = voicesRef.current.get(note.semitone);
    if (!voice || !contextRef.current) return;

    const now = contextRef.current.currentTime;
    voice.envelope.gain.cancelScheduledValues(now);
    voice.envelope.gain.setValueAtTime(Math.max(voice.envelope.gain.value, 0.0001), now);
    voice.envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    voice.oscillators.forEach((oscillator) => oscillator.stop(now + 0.24));
    voicesRef.current.delete(note.semitone);
    setActiveNotes((current) => {
      const next = new Set(current);
      next.delete(note.semitone);
      return next;
    });
  }, []);

  const startNote = useCallback((note: PianoNote) => {
    if (voicesRef.current.has(note.semitone)) return;

    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    contextRef.current ??= new AudioContextClass();
    const audioContext = contextRef.current;
    if (audioContext.state === 'suspended') void audioContext.resume();

    const now = audioContext.currentTime;
    const frequency = frequencyFor(octave, note.semitone);
    const envelope = audioContext.createGain();
    const harmonicGain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const fundamental = audioContext.createOscillator();
    const harmonic = audioContext.createOscillator();

    fundamental.type = 'triangle';
    fundamental.frequency.setValueAtTime(frequency, now);
    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(frequency * 2, now);
    harmonic.detune.setValueAtTime(3, now);
    harmonicGain.gain.setValueAtTime(0.16, now);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.Q.setValueAtTime(0.7, now);
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(0.32 * volume, now + 0.012);
    envelope.gain.exponentialRampToValueAtTime(0.085 * volume, now + 0.9);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + 4);

    fundamental.connect(envelope);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(envelope);
    envelope.connect(filter);
    filter.connect(audioContext.destination);
    fundamental.start(now);
    harmonic.start(now);

    voicesRef.current.set(note.semitone, { oscillators: [fundamental, harmonic], envelope });
    setActiveNotes((current) => new Set(current).add(note.semitone));
    setLastPlayed(`${displayedNote(note, octave)} · ${Math.round(frequency)} Hz`);
  }, [octave, volume]);

  const stopAllNotes = useCallback(() => {
    notes.forEach(stopNote);
  }, [stopNote]);

  useEffect(() => {
    function keyDown(event: KeyboardEvent) {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const note = keyMap.get(event.key.toLowerCase());
      if (!note) return;
      event.preventDefault();
      startNote(note);
    }

    function keyUp(event: KeyboardEvent) {
      const note = keyMap.get(event.key.toLowerCase());
      if (!note) return;
      event.preventDefault();
      stopNote(note);
    }

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('blur', stopAllNotes);
    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      window.removeEventListener('blur', stopAllNotes);
      stopAllNotes();
    };
  }, [startNote, stopAllNotes, stopNote]);

  function shiftOctave(nextOctave: number) {
    stopAllNotes();
    setOctave(nextOctave);
    setLastPlayed(`Range changed to C${nextOctave}–C${nextOctave + 1}`);
  }

  function pressNote(event: ReactPointerEvent<HTMLButtonElement>, note: PianoNote) {
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events may not create a capturable pointer session.
    }
    startNote(note);
  }

  function releaseNote(event: ReactPointerEvent<HTMLButtonElement>, note: PianoNote) {
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // The pointer may already have been released by the browser.
    }
    stopNote(note);
  }

  function keyButton(note: PianoNote, className: string, style?: CSSProperties) {
    const label = displayedNote(note, octave);
    return (
      <button
        className={`${className}${activeNotes.has(note.semitone) ? ' is-active' : ''}`}
        type="button"
        key={`${note.name}-${note.semitone}`}
        style={style}
        title={`Play ${label}`}
        data-sound-control
        onContextMenu={(event) => event.preventDefault()}
        onPointerDown={(event) => pressNote(event, note)}
        onPointerUp={(event) => releaseNote(event, note)}
        onPointerCancel={(event) => releaseNote(event, note)}
      >
        <span className="piano-note-name" aria-hidden="true">{label}</span>
        <span className="piano-computer-key" aria-hidden="true">{note.keyboardKey}</span>
      </button>
    );
  }

  return (
    <section className="piano-lab" aria-labelledby="piano-heading">
      <header className="piano-toolbar">
        <div>
          <p className="eyebrow">Playable instrument</p>
          <h2 id="piano-heading">Pocket Keys</h2>
          <p>Tap the keys or use your computer keyboard.</p>
        </div>
        <div className="piano-controls">
          <div className="octave-control" aria-label="Piano octave">
            <button type="button" disabled={octave === 2} aria-label="Lower octave" data-sound-control onClick={() => shiftOctave(octave - 1)}>
              <Minus size={15} aria-hidden="true" />
            </button>
            <span>C{octave}–C{octave + 1}</span>
            <button type="button" disabled={octave === 6} aria-label="Higher octave" data-sound-control onClick={() => shiftOctave(octave + 1)}>
              <Plus size={15} aria-hidden="true" />
            </button>
          </div>
          <label className="piano-volume">
            <Volume2 size={15} aria-hidden="true" />
            <input
              type="range"
              min="0.25"
              max="1"
              step="0.05"
              value={volume}
              aria-label="Instrument volume"
              onChange={(event) => setVolume(Number(event.target.value))}
            />
          </label>
        </div>
      </header>

      <div className="piano-stage">
        <div className="piano-keyboard" role="group" aria-label={`Playable piano from C${octave} to C${octave + 1}`}>
          <div className="piano-white-keys">
            {whiteNotes.map((note) => keyButton(note, 'piano-key piano-key-white'))}
          </div>
          {blackNotes.map((note) => keyButton(
            note,
            'piano-key piano-key-black',
            { '--piano-key-position': note.position } as CSSProperties,
          ))}
        </div>
      </div>

      <footer className="piano-footer">
        <p><span>A W S E D F T G Y H U J K</span> on a computer keyboard</p>
        <p role="status" aria-live="polite">{lastPlayed}</p>
      </footer>
    </section>
  );
}
