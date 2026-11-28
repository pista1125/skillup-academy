/**
 * Oktatóvideók nyilvántartása.
 *
 * A videók a Firebase Storage `videok/<N>_osztaly/` mappájában vannak; a leckékhez a tananyag
 * `documentId`-ja köti őket (ugyanaz az azonosító, amit a TheoryTemplate kap). Az adatfájlt a
 * `scripts/video/prepare-video.mjs` frissíti — kézzel csak a címet / típust érdemes igazítani.
 *
 * Ha később más tárhelyre (pl. Bunny Stream) költözünk, elég a `videoUrl` / `posterUrl` függvényt
 * átírni.
 */
import data from '@/data/lessonVideos.json';

export type LessonVideoKind = 'magyarazo' | 'gyakorlo';

export interface LessonVideoChapter {
  /** kezdőidő másodpercben */
  start: number;
  title: string;
}

export interface LessonVideo {
  id: string;
  kind: LessonVideoKind;
  title: string;
  /** Storage-útvonal, pl. `videok/8_osztaly/8_01_logikai_feladatok.mp4` */
  video: string;
  /** Storage-útvonal, pl. `videok/8_osztaly/8_01_logikai_feladatok.jpg` */
  poster?: string;
  /** hossz másodpercben */
  duration: number;
  chapters: LessonVideoChapter[];
}

const FIREBASE_STORAGE_BASE = 'https://firebasestorage.googleapis.com/v0/b/diakzona.firebasestorage.app/o';

const storageUrl = (path: string) => `${FIREBASE_STORAGE_BASE}/${encodeURIComponent(path)}?alt=media`;

export const videoUrl = (v: LessonVideo) => storageUrl(v.video);
export const posterUrl = (v: LessonVideo) => (v.poster ? storageUrl(v.poster) : undefined);

const REGISTRY = data as unknown as Record<string, LessonVideo[]>;

export function getLessonVideos(lessonId: string | undefined): LessonVideo[] {
  if (!lessonId) return [];
  return REGISTRY[lessonId] ?? [];
}

export const VIDEO_KIND_LABEL: Record<LessonVideoKind, string> = {
  magyarazo: 'Videós magyarázat',
  gyakorlo: 'Videós gyakorlás',
};

/** 742 → „12:22”, 3725 → „1:02:05” */
export function formatTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const r = String(s % 60).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${r}` : `${m}:${r}`;
}

/** 742 → „12 perc” */
export const formatMinutes = (sec: number) => `${Math.max(1, Math.round(sec / 60))} perc`;
