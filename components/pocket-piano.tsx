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
  lfo: OscillatorNode;
  modulationGain: GainNode;
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
const modulationLevels = [0, 1, 2, 3, 4, 5];

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
  const [velocity, setVelocity] = useState(96);
  const [pitchBend, setPitchBend] = useState(0);
  const [modulation, setModulation] = useState(0);
  const [sustain, setSustain] = useState(false);
  const [activeNotes, setActiveNotes] = useState<Set<number>>(() => new Set());
  const [lastPlayed, setLastPlayed] = useState('Ready to play');
  const contextRef = useRef<AudioContext | null>(null);
  const voicesRef = useRef<Map<number, Voice>>(new Map());
  const sustainRef = useRef(false);
  const heldPitchKeysRef = useRef<Set<string>>(new Set());
  const heldNotesRef = useRef<Set<number>>(new Set());
  const sustainedNotesRef = useRef<Set<number>>(new Set());
  const whiteNotes = useMemo(() => notes.filter((note) => !note.accidental), []);
  const blackNotes = useMemo(() => notes.filter((note) => note.accidental), []);

  const releaseVoice = useCallback((note: PianoNote, fast = false) => {
    const voice = voicesRef.current.get(note.semitone);
    if (!voice || !contextRef.current) return;

    const now = contextRef.current.currentTime;
    const release = fast ? 0.07 : 0.28;
    voice.envelope.gain.cancelScheduledValues(now);
    voice.envelope.gain.setTargetAtTime(0.0001, now, fast ? 0.018 : 0.07);
    voice.oscillators.forEach((oscillator) => oscillator.stop(now + release));
    voice.lfo.stop(now + release);
    voicesRef.current.delete(note.semitone);
    sustainedNotesRef.current.delete(note.semitone);
  }, []);

  const stopNote = useCallback((note: PianoNote) => {
    heldNotesRef.current.delete(note.semitone);
    setActiveNotes((current) => {
      const next = new Set(current);
      next.delete(note.semitone);
      return next;
    });

    if (sustainRef.current) {
      sustainedNotesRef.current.add(note.semitone);
      return;
    }
    releaseVoice(note);
  }, [releaseVoice]);

  const startNote = useCallback((note: PianoNote) => {
    if (voicesRef.current.has(note.semitone)) releaseVoice(note, true);

    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    contextRef.current ??= new AudioContextClass();
    const audioContext = contextRef.current;
    if (audioContext.state === 'suspended') void audioContext.resume();

    const now = audioContext.currentTime;
    const frequency = frequencyFor(octave, note.semitone);
    const envelope = audioContext.createGain();
    const harmonicGain = audioContext.createGain();
    const modulationGain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const fundamental = audioContext.createOscillator();
    const harmonic = audioContext.createOscillator();
    const lfo = audioContext.createOscillator();
    const peak = 0.4 * volume * (velocity / 127);

    fundamental.type = 'triangle';
    fundamental.frequency.setValueAtTime(frequency, now);
    fundamental.detune.setValueAtTime(pitchBend * 100, now);
    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(frequency * 2, now);
    harmonic.detune.setValueAtTime((pitchBend * 100) + 3, now);
    harmonicGain.gain.setValueAtTime(0.16, now);
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(5.2, now);
    modulationGain.gain.setValueAtTime(modulation * 5, now);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.Q.setValueAtTime(0.7, now);
    envelope.gain.setValueAtTime(0.0001, now);
    envelope.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), now + 0.012);
    envelope.gain.exponentialRampToValueAtTime(Math.max(peak * 0.27, 0.0002), now + 0.9);
    envelope.gain.exponentialRampToValueAtTime(0.0001, now + 5);

    lfo.connect(modulationGain);
    modulationGain.connect(fundamental.detune);
    modulationGain.connect(harmonic.detune);
    fundamental.connect(envelope);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(envelope);
    envelope.connect(filter);
    filter.connect(audioContext.destination);
    fundamental.start(now);
    harmonic.start(now);
    lfo.start(now);

    voicesRef.current.set(note.semitone, {
      oscillators: [fundamental, harmonic],
      envelope,
      lfo,
      modulationGain,
    });
    heldNotesRef.current.add(note.semitone);
    sustainedNotesRef.current.delete(note.semitone);
    setActiveNotes((current) => new Set(current).add(note.semitone));
    setLastPlayed(`${displayedNote(note, octave)} · ${Math.round(frequency)} Hz · velocity ${velocity}`);
  }, [modulation, octave, pitchBend, releaseVoice, velocity, volume]);

  const stopAllNotes = useCallback(() => {
    heldNotesRef.current.clear();
    sustainedNotesRef.current.clear();
    notes.forEach((note) => releaseVoice(note, true));
    setActiveNotes(new Set());
  }, [releaseVoice]);

  const updateSustain = useCallback((next: boolean) => {
    sustainRef.current = next;
    setSustain(next);
    if (next) {
      setLastPlayed('Sustain enabled');
      return;
    }

    sustainedNotesRef.current.forEach((semitone) => {
      const note = notes.find((item) => item.semitone === semitone);
      if (note && !heldNotesRef.current.has(semitone)) releaseVoice(note);
    });
    sustainedNotesRef.current.clear();
    setLastPlayed('Sustain released');
  }, [releaseVoice]);

  const updatePitchBend = useCallback((next: number) => {
    const value = Math.max(-2, Math.min(2, next));
    setPitchBend(value);
    const now = contextRef.current?.currentTime ?? 0;
    voicesRef.current.forEach((voice) => {
      voice.oscillators[0].detune.cancelScheduledValues(now);
      voice.oscillators[1].detune.cancelScheduledValues(now);
      voice.oscillators[0].detune.linearRampToValueAtTime(value * 100, now + 0.08);
      voice.oscillators[1].detune.linearRampToValueAtTime((value * 100) + 3, now + 0.08);
    });
    setLastPlayed(value === 0 ? 'Pitch returned to center' : `Pitch bending ${value > 0 ? 'up' : 'down'} · release to center`);
  }, []);

  const updateModulation = useCallback((next: number) => {
    const value = Math.max(0, Math.min(5, next));
    setModulation(value);
    const now = contextRef.current?.currentTime ?? 0;
    voicesRef.current.forEach((voice) => voice.modulationGain.gain.setValueAtTime(value * 5, now));
    setLastPlayed(value === 0 ? 'Modulation off' : `Modulation level ${value}`);
  }, []);

  const updateVelocity = useCallback((next: number) => {
    const value = Math.max(32, Math.min(127, next));
    setVelocity(value);
    setLastPlayed(`Velocity ${value}`);
  }, []);

  const shiftOctave = useCallback((nextOctave: number) => {
    const value = Math.max(2, Math.min(6, nextOctave));
    stopAllNotes();
    setOctave(value);
    setLastPlayed(`Range changed to C${value}–C${value + 1}`);
  }, [stopAllNotes]);

  useEffect(() => {
    function keyDown(event: KeyboardEvent) {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return;

      const note = keyMap.get(event.key.toLowerCase());
      if (note) {
        event.preventDefault();
        startNote(note);
        return;
      }

      const command = event.code;
      if (command === 'Digit1' || command === 'Digit2') {
        heldPitchKeysRef.current.add(command);
        updatePitchBend(command === 'Digit1' ? -2 : 2);
      }
      else if (command.startsWith('Digit') && Number(command.slice(5)) >= 3 && Number(command.slice(5)) <= 8) updateModulation(Number(command.slice(5)) - 3);
      else if (command === 'KeyZ') shiftOctave(octave - 1);
      else if (command === 'KeyX') shiftOctave(octave + 1);
      else if (command === 'KeyC') updateVelocity(velocity - 8);
      else if (command === 'KeyV') updateVelocity(velocity + 8);
      else return;
      event.preventDefault();
    }

    function keyUp(event: KeyboardEvent) {
      if (event.code === 'Digit1' || event.code === 'Digit2') {
        heldPitchKeysRef.current.delete(event.code);
        const remaining = heldPitchKeysRef.current.has('Digit2') ? 2 : heldPitchKeysRef.current.has('Digit1') ? -2 : 0;
        updatePitchBend(remaining);
        event.preventDefault();
        return;
      }

      const note = keyMap.get(event.key.toLowerCase());
      if (!note) return;
      event.preventDefault();
      stopNote(note);
    }

    function windowBlur() {
      heldPitchKeysRef.current.clear();
      updatePitchBend(0);
      stopAllNotes();
    }

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('blur', windowBlur);
    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      window.removeEventListener('blur', windowBlur);
    };
  }, [octave, shiftOctave, startNote, stopAllNotes, stopNote, updateModulation, updatePitchBend, updateVelocity, velocity]);

  useEffect(() => () => stopAllNotes(), [stopAllNotes]);

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

  function pressPitch(event: ReactPointerEvent<HTMLButtonElement>, amount: -2 | 2) {
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Synthetic pointer events may not create a capturable pointer session.
    }
    updatePitchBend(amount);
  }

  function releasePitch(event: ReactPointerEvent<HTMLButtonElement>) {
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // The pointer may already have been released by the browser.
    }
    updatePitchBend(0);
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
      </header>

      <div className="piano-performance" aria-label="Piano performance controls">
        <div className="performance-group performance-pitch" role="group" aria-label="Pitch bend">
          <div className="performance-heading"><span>Pitch bend</span><output>{pitchBend > 0 ? '+' : ''}{pitchBend}</output></div>
          <div className="performance-actions">
            <button type="button" aria-pressed={pitchBend === -2} data-sound-control onPointerDown={(event) => pressPitch(event, -2)} onPointerUp={releasePitch} onPointerCancel={releasePitch}><kbd>1</kbd><Minus size={13} aria-hidden="true" /><span>Hold</span><span className="control-label">to bend pitch down</span></button>
            <button type="button" aria-pressed={pitchBend === 2} data-sound-control onPointerDown={(event) => pressPitch(event, 2)} onPointerUp={releasePitch} onPointerCancel={releasePitch}><kbd>2</kbd><Plus size={13} aria-hidden="true" /><span>Hold</span><span className="control-label">to bend pitch up</span></button>
          </div>
        </div>

        <button className="sustain-control" type="button" aria-pressed={sustain} data-sound-control onClick={() => updateSustain(!sustain)}>
          <span>Sustain</span><strong>{sustain ? 'On' : 'Off'}</strong>
        </button>

        <div className="performance-group performance-modulation" role="group" aria-label="Modulation level">
          <div className="performance-heading"><span>Modulation</span><output>{modulation === 0 ? 'Off' : modulation}</output></div>
          <div className="modulation-actions">
            {modulationLevels.map((level) => (
              <button type="button" key={level} aria-pressed={modulation === level} data-sound-control onClick={() => updateModulation(level)}>
                <kbd>{level + 3}</kbd><span>{level === 0 ? 'Off' : level}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="performance-group performance-octave" role="group" aria-label="Octave range">
          <div className="performance-heading"><span>Octave</span><output>C{octave}</output></div>
          <div className="performance-actions">
            <button type="button" disabled={octave === 2} data-sound-control onClick={() => shiftOctave(octave - 1)}><kbd>Z</kbd><Minus size={13} aria-hidden="true" /><span className="control-label">Lower octave</span></button>
            <button type="button" disabled={octave === 6} data-sound-control onClick={() => shiftOctave(octave + 1)}><kbd>X</kbd><Plus size={13} aria-hidden="true" /><span className="control-label">Higher octave</span></button>
          </div>
        </div>

        <div className="performance-group performance-velocity" role="group" aria-label="Note velocity">
          <div className="performance-heading"><span>Velocity</span><output>{velocity}</output></div>
          <div className="performance-actions">
            <button type="button" disabled={velocity === 32} data-sound-control onClick={() => updateVelocity(velocity - 8)}><kbd>C</kbd><Minus size={13} aria-hidden="true" /><span className="control-label">Lower velocity</span></button>
            <button type="button" disabled={velocity === 127} data-sound-control onClick={() => updateVelocity(velocity + 8)}><kbd>V</kbd><Plus size={13} aria-hidden="true" /><span className="control-label">Raise velocity</span></button>
          </div>
        </div>
      </div>

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
        <p><span>A W S E D F T G Y H U J K</span> plays notes · <span>1–8 Z X C V</span> controls performance</p>
        <p role="status" aria-live="polite">{lastPlayed}</p>
      </footer>
    </section>
  );
}
