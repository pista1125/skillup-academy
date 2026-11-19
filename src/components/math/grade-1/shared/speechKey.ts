// A felolvasott szöveg normalizálása és kulcsa. Ugyanezt használja a böngésző (lejátszás)
// és a hanggeneráló szkript (scripts/tts), ezért itt nem lehet DOM-függés.

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

/** 64 bites FNV-1a (két 32 bites félből), 16 hex karakter. */
const fnv = (s: string, seed: number): string => {
  let h = seed >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
};

/** A hangfájl neve (kiterjesztés nélkül) – a normalizált szövegből. */
export const speechKey = (text: string): string => {
  const t = toSpeechText(text);
  return fnv(t, 0x811c9dc5) + fnv(t, 0x050c5d1f);
};

/** A Firebase Storage-ban: audio/g1/<hang>/<kulcs>.mp3 és audio/g1/manifest.json */
export const AUDIO_BUCKET = 'diakzona.firebasestorage.app';
export const AUDIO_PREFIX = 'audio/g1';
export const audioUrl = (path: string): string =>
  `https://firebasestorage.googleapis.com/v0/b/${AUDIO_BUCKET}/o/${encodeURIComponent(path)}?alt=media`;

export type VoiceKind = 'female' | 'male';

export interface AudioManifest {
  version: number;
  updated: string;
  voices: Partial<Record<VoiceKind, { id: string; label: string; clips: string[] }>>;
}
