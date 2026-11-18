// Felolvasás (Web Speech API) az 1. osztályosoknak, akik még nem tudnak olvasni.
// Minden mondatot, kérdést és dicséretet felolvasunk magyar hangon (ha a böngésző tud ilyet).
import { useEffect, useState } from 'react';

const VOICE_KEY = 'dz-g1-voice-on';
const listeners = new Set<(on: boolean) => void>();

export const isSpeechSupported = (): boolean =>
  typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined';

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

/** Szöveg előkészítése a felolvasáshoz: műveleti jelek szóval, emojik és jelek nélkül. */
export const toSpeechText = (text: string): string =>
  String(text)
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '')
    .replace(/(\d)\s*\+\s*(?=\d|□|\?|△|○)/g, '$1 meg ')
    .replace(/(\d)\s*[−–-]\s*(?=\d|□|\?|△|○)/g, '$1 elvéve ')
    .replace(/\s*=\s*/g, ' egyenlő ')
    .replace(/\s*<\s*/g, ' kisebb, mint ')
    .replace(/\s*>\s*/g, ' nagyobb, mint ')
    .replace(/[□△○]/g, ' valahány ')
    .replace(/\?(?=\s|$)/g, '?')
    .replace(/\s+/g, ' ')
    .trim();

let cachedVoice: SpeechSynthesisVoice | null | undefined;
const pickVoice = (): SpeechSynthesisVoice | null => {
  if (!isSpeechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  if (cachedVoice !== undefined && cachedVoice && voices.includes(cachedVoice)) return cachedVoice;
  const hu = voices.filter((v) => v.lang?.toLowerCase().startsWith('hu'));
  cachedVoice = hu.find((v) => /natural|online|google/i.test(v.name)) || hu[0] || null;
  return cachedVoice;
};

/** Felolvassa a szöveget (az előzőt megszakítja). Csendben nem csinál semmit, ha nincs hang vagy ki van kapcsolva. */
export const speak = (text: string, opts: { force?: boolean; rate?: number; onEnd?: () => void } = {}) => {
  if (!isSpeechSupported() || !text) return;
  if (!opts.force && !isVoiceOn()) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(toSpeechText(text));
    u.lang = 'hu-HU';
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = opts.rate ?? 0.92;
    u.pitch = 1.1;
    if (opts.onEnd) u.onend = opts.onEnd;
    synth.speak(u);
  } catch {
    /* ignore */
  }
};

export const stopSpeaking = () => {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
};

/** A hang be/ki kapcsolójának állapota (minden komponens között szinkronban). */
export const useVoiceOn = (): [boolean, (on: boolean) => void] => {
  const [on, setOn] = useState<boolean>(isVoiceOn());
  useEffect(() => {
    listeners.add(setOn);
    if (isSpeechSupported()) {
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

/** Unmountkor elhallgat. */
export const useStopSpeechOnUnmount = () => {
  useEffect(() => () => stopSpeaking(), []);
};

const PRAISES = ['Ügyes vagy!', 'Szuper!', 'Nagyon jó!', 'Hű, de okos vagy!', 'Pontosan!', 'Bravó!', 'Ez az!'];
const RETRY = ['Majdnem! Próbáld újra!', 'Nézd meg még egyszer!', 'Semmi baj, próbáld újra!'];
export const randomPraise = () => PRAISES[Math.floor(Math.random() * PRAISES.length)];
export const randomRetry = () => RETRY[Math.floor(Math.random() * RETRY.length)];
