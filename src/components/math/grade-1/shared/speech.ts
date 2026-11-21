// Felolvasás az 1. osztályosoknak, akik még nem tudnak olvasni.
// 1. Előre legyártott hangfájl (Google neurális hang, Firebase Storage: audio/g1/<hang>/<kulcs>.mp3), ha van.
// 2. Különben a böngésző saját magyar hangja (Web Speech API).
// A kulcs a normalizált szöveg hash-e (speechKey.ts) – ugyanazt számolja a generáló szkript is.
import { useEffect, useState } from 'react';
import { AUDIO_PREFIX, AudioManifest, VoiceKind, audioUrl, speechKey, toSpeechText } from './speechKey';

export { toSpeechText } from './speechKey';
export type { VoiceKind } from './speechKey';

const VOICE_KEY = 'dz-g1-voice-on';
const KIND_KEY = 'dz-g1-voice-kind';
const listeners = new Set<(on: boolean) => void>();
const kindListeners = new Set<(k: VoiceKind) => void>();
const manifestListeners = new Set<() => void>();

const IS_TEST = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test';
const IS_DEV = typeof import.meta !== 'undefined' && !!import.meta.env?.DEV;

const hasWebSpeech = (): boolean => typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined';
const hasAudio = (): boolean => typeof window !== 'undefined' && typeof window.Audio !== 'undefined';

export const isSpeechSupported = (): boolean => hasWebSpeech() || hasAudio();

export const isVoiceOn = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(VOICE_KEY) !== '0';
  } catch {
    return true;
  }
};

export const setVoiceOn = (on: boolean) => {
  try {
    window.localStorage.setItem(VOICE_KEY, on ? '1' : '0');
  } catch {
    /* ignore */
  }
  if (!on) stopSpeaking();
  listeners.forEach((l) => l(on));
};

export const getVoiceKind = (): VoiceKind => {
  try {
    return window.localStorage.getItem(KIND_KEY) === 'male' ? 'male' : 'female';
  } catch {
    return 'female';
  }
};

export const setVoiceKind = (k: VoiceKind) => {
  try {
    window.localStorage.setItem(KIND_KEY, k);
  } catch {
    /* ignore */
  }
  stopSpeaking();
  kindListeners.forEach((l) => l(k));
};

/* ---------------- Manifest (mely szövegekhez van hangfájl) ---------------- */
let manifest: AudioManifest | null = null;
let clipSets: Partial<Record<VoiceKind, Set<string>>> = {};
let manifestPromise: Promise<void> | null = null;

const loadManifest = (): Promise<void> => {
  if (manifestPromise) return manifestPromise;
  if (IS_TEST) return (manifestPromise = Promise.resolve());
  // a manifest a kódban van (külön chunk), a hangfájlok a Firebase Storage-ban
  manifestPromise = import('./audioManifest.g1.json')
    .then((mod) => (mod.default || mod) as unknown as AudioManifest)
    .then((m: AudioManifest | null) => {
      if (!m?.voices) return;
      manifest = m;
      clipSets = {};
      (Object.keys(m.voices) as VoiceKind[]).forEach((k) => {
        clipSets[k] = new Set(m.voices[k]?.clips || []);
      });
      manifestListeners.forEach((l) => l());
    })
    .catch(() => {
      /* nincs manifest → böngészőhang */
    });
  return manifestPromise;
};

/** Mely hangok érhetők el hangfájlként (a választóhoz). */
export const availableVoices = (): { kind: VoiceKind; label: string }[] =>
  manifest
    ? (Object.keys(manifest.voices) as VoiceKind[]).map((k) => ({
        kind: k,
        label: manifest!.voices[k]!.label,
      }))
    : [];

const clipFor = (text: string): string | null => {
  const key = speechKey(text);
  const pref = getVoiceKind();
  const kinds: VoiceKind[] = [pref, pref === 'female' ? 'male' : 'female'];
  for (const k of kinds) if (clipSets[k]?.has(key)) return audioUrl(`${AUDIO_PREFIX}/${k}/${key}.mp3`);
  if (IS_DEV && manifest) {
    const w = window as unknown as { __g1MissingSpeech?: Set<string> };
    (w.__g1MissingSpeech ||= new Set()).add(toSpeechText(text));
    console.info('[g1-hang] nincs hangfájl:', toSpeechText(text));
  }
  return null;
};

/* ---------------- Lejátszási állapot (a lejátszó sávokhoz) ---------------- */
export interface PlayState {
  /** A most szóló (normalizált) szöveg, vagy null. */
  text: string | null;
  status: 'idle' | 'playing' | 'paused';
  /** Másodpercben. A böngészőhangnál becsült érték. */
  current: number;
  duration: number;
  /** true: hangfájl (tekerhető), false: böngészőhang (becsült idő). */
  clip: boolean;
}
const IDLE: PlayState = {
  text: null,
  status: 'idle',
  current: 0,
  duration: 0,
  clip: false,
};
let playState: PlayState = IDLE;
const playListeners = new Set<(s: PlayState) => void>();
const setPlay = (p: Partial<PlayState> | PlayState, reset = false) => {
  playState = reset ? { ...IDLE, ...p } : { ...playState, ...p };
  playListeners.forEach((l) => l(playState));
};
export const getPlayState = () => playState;

/** A böngészőhang becsült hossza (mp), ha nincs hangfájl. */
export const estimateSeconds = (text: string) => Math.max(1, toSpeechText(text).length / 13);

/** A szöveg hangfájljának URL-je (vagy null, ha nincs) – naplózás nélkül. */
export const clipUrlFor = (text: string): string | null => {
  const key = speechKey(text);
  const pref = getVoiceKind();
  for (const k of [pref, pref === 'female' ? 'male' : 'female'] as VoiceKind[]) if (clipSets[k]?.has(key)) return audioUrl(`${AUDIO_PREFIX}/${k}/${key}.mp3`);
  return null;
};

/* ---------------- Lejátszás ---------------- */
let audioEl: HTMLAudioElement | null = null;
let token = 0;
let webTimer: number | null = null;
const clearWebTimer = () => {
  if (webTimer !== null) window.clearInterval(webTimer);
  webTimer = null;
};

const speakWeb = (text: string, done: () => void, rate?: number) => {
  if (!hasWebSpeech()) return done();
  try {
    const u = new SpeechSynthesisUtterance(toSpeechText(text));
    u.lang = 'hu-HU';
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = rate ?? 0.92;
    u.pitch = 1.1;
    const finish = () => {
      clearWebTimer();
      done();
    };
    u.onend = finish;
    u.onerror = finish;
    // becsült haladás (a Web Speech nem ad időt)
    setPlay(
      {
        text: toSpeechText(text),
        status: 'playing',
        current: 0,
        duration: estimateSeconds(text),
        clip: false,
      },
      true,
    );
    clearWebTimer();
    webTimer = window.setInterval(() => {
      if (playState.status === 'playing')
        setPlay({
          current: Math.min(playState.duration, playState.current + 0.25),
        });
    }, 250);
    window.speechSynthesis.speak(u);
  } catch {
    done();
  }
};

const playClip = (url: string, text: string, my: number, done: () => void, rate?: number) => {
  try {
    audioEl ||= new Audio();
    const a = audioEl;
    a.onended = () => my === token && done();
    a.onerror = () => my === token && speakWeb(text, done, rate);
    a.ontimeupdate = () =>
      my === token &&
      setPlay({
        current: a.currentTime,
        duration: Number.isFinite(a.duration) ? a.duration : playState.duration,
      });
    a.onloadedmetadata = () => my === token && Number.isFinite(a.duration) && setPlay({ duration: a.duration });
    setPlay(
      {
        text: toSpeechText(text),
        status: 'playing',
        current: 0,
        duration: durationCache.get(url) ?? 0,
        clip: true,
      },
      true,
    );
    a.src = url;
    const p = a.play();
    if (p && typeof p.catch === 'function') p.catch(() => my === token && speakWeb(text, done, rate));
  } catch {
    speakWeb(text, done, rate);
  }
};

/**
 * Felolvassa a szöveget (vagy a szövegeket egymás után); az előzőt megszakítja.
 * Csendben nem csinál semmit, ha nincs hang vagy ki van kapcsolva.
 */
export const speak = (text: string | string[], opts: { force?: boolean; rate?: number; onEnd?: () => void } = {}) => {
  const parts = (Array.isArray(text) ? text : [text]).flatMap(splitPraise).filter((t) => t && toSpeechText(t));
  if (IS_TEST || !isSpeechSupported() || !parts.length) return;
  if (!opts.force && !isVoiceOn()) return;
  stopSpeaking();
  const my = token;
  const run = (i: number) => {
    if (my !== token) return;
    if (i >= parts.length) {
      setPlay(IDLE, true);
      return opts.onEnd?.();
    }
    const next = () => run(i + 1);
    const url = clipFor(parts[i]);
    if (url) playClip(url, parts[i], my, next, opts.rate);
    else speakWeb(parts[i], next, opts.rate);
  };
  // a manifest általában már betöltött; ha nem, legfeljebb 1,5 s-ot várunk rá
  const p = loadManifest();
  if (manifest === null) {
    let started = false;
    const go = () => {
      if (started) return;
      started = true;
      run(0);
    };
    p.then(go);
    window.setTimeout(go, 1500);
  } else {
    run(0);
  }
};

export const stopSpeaking = () => {
  token++;
  if (typeof window !== 'undefined') clearWebTimer();
  if (playState.status !== 'idle') setPlay(IDLE, true);
  try {
    if (audioEl) {
      audioEl.onended = null;
      audioEl.onerror = null;
      audioEl.ontimeupdate = null;
      audioEl.onloadedmetadata = null;
      audioEl.pause();
    }
  } catch {
    /* ignore */
  }
  if (!hasWebSpeech()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
};

/** Szünet / folytatás / tekerés a most szóló szövegnél. */
export const pauseSpeaking = () => {
  if (playState.status !== 'playing') return;
  try {
    if (playState.clip) audioEl?.pause();
    else window.speechSynthesis.pause();
  } catch {
    /* ignore */
  }
  setPlay({ status: 'paused' });
};

export const resumeSpeaking = () => {
  if (playState.status !== 'paused') return;
  try {
    if (playState.clip) void audioEl?.play()?.catch(() => undefined);
    else window.speechSynthesis.resume();
  } catch {
    /* ignore */
  }
  setPlay({ status: 'playing' });
};

/** 0–1 közötti helyre teker (csak hangfájlnál). */
export const seekSpeaking = (frac: number) => {
  if (!playState.clip || !audioEl || !Number.isFinite(audioEl.duration)) return;
  audioEl.currentTime = Math.max(0, Math.min(1, frac)) * audioEl.duration;
  setPlay({ current: audioEl.currentTime });
};

/** A lejátszás állapota (minden lejátszósáv ebből rajzol). */
export const usePlayState = (): PlayState => {
  const [s, setS] = useState<PlayState>(playState);
  useEffect(() => {
    playListeners.add(setS);
    setS(playState);
    return () => {
      playListeners.delete(setS);
    };
  }, []);
  return s;
};

/** A hangfájl hossza előre (metaadatból), hogy lejátszás előtt is látszódjon. */
const durationCache = new Map<string, number>();
export const useClipDuration = (text: string): { seconds: number; exact: boolean } => {
  const [, kick] = useState(0);
  const [kind] = useVoiceKind();
  const url = manifest ? clipUrlFor(text) : null;
  useEffect(() => {
    if (!url || durationCache.has(url) || !hasAudio()) return;
    let alive = true;
    const a = new Audio();
    a.preload = 'metadata';
    a.onloadedmetadata = () => {
      if (Number.isFinite(a.duration)) durationCache.set(url, a.duration);
      if (alive) kick((n) => n + 1);
    };
    a.src = url;
    return () => {
      alive = false;
      a.onloadedmetadata = null;
    };
  }, [url, kind]);
  if (url && durationCache.has(url)) return { seconds: durationCache.get(url)!, exact: true };
  return { seconds: estimateSeconds(text), exact: false };
};

let cachedVoice: SpeechSynthesisVoice | null | undefined;
const pickVoice = (): SpeechSynthesisVoice | null => {
  if (!hasWebSpeech()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  if (cachedVoice !== undefined && cachedVoice && voices.includes(cachedVoice)) return cachedVoice;
  const hu = voices.filter((v) => v.lang?.toLowerCase().startsWith('hu'));
  cachedVoice = hu.find((v) => /natural|online|google/i.test(v.name)) || hu[0] || null;
  return cachedVoice;
};

/** A hang be/ki kapcsoló állapota (minden komponens között szinkronban). */
export const useVoiceOn = (): [boolean, (on: boolean) => void] => {
  const [on, setOn] = useState<boolean>(isVoiceOn());
  useEffect(() => {
    listeners.add(setOn);
    loadManifest();
    if (hasWebSpeech()) {
      // a hangok listája aszinkron töltődik be
      window.speechSynthesis.onvoiceschanged = () => {
        cachedVoice = undefined;
      };
    }
    return () => {
      listeners.delete(setOn);
    };
  }, []);
  return [on, setVoiceOn];
};

/** Női/férfi hang választó állapota + az elérhető hangok (a manifest betöltése után). */
export const useVoiceKind = (): [VoiceKind, (k: VoiceKind) => void, { kind: VoiceKind; label: string }[]] => {
  const [kind, setKind] = useState<VoiceKind>(getVoiceKind());
  const [voices, setVoices] = useState(availableVoices());
  useEffect(() => {
    const onM = () => setVoices(availableVoices());
    kindListeners.add(setKind);
    manifestListeners.add(onM);
    loadManifest().then(onM);
    return () => {
      kindListeners.delete(setKind);
      manifestListeners.delete(onM);
    };
  }, []);
  return [kind, setVoiceKind, voices];
};

/** Unmountkor elhallgat. */
export const useStopSpeechOnUnmount = () => {
  useEffect(() => () => stopSpeaking(), []);
};

export const PRAISES = ['Ügyes vagy!', 'Szuper!', 'Nagyon jó!', 'Hű, de okos vagy!', 'Pontosan!', 'Bravó!', 'Ez az!'];
export const RETRY = ['Majdnem! Próbáld újra!', 'Nézd meg még egyszer!', 'Semmi baj, próbáld újra!'];

/**
 * „Szuper! A torony 4 kockából áll.” → ['Szuper!', 'A torony 4 kockából áll.']: a dicséret külön hangfájl,
 * így nem kell minden dicséret × mondat kombinációt legyártani (a hanggenerálás is így bontja).
 */
export function splitPraise(text: string): string[] {
  for (const p of PRAISES) if (text.startsWith(p + ' ')) return [p, text.slice(p.length + 1)];
  return [text];
}
export const randomPraise = () => PRAISES[Math.floor(Math.random() * PRAISES.length)];
export const randomRetry = () => RETRY[Math.floor(Math.random() * RETRY.length)];
