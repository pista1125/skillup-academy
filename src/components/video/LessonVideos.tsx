import React, { useState } from 'react';
import { Clock, ListVideo, Play } from 'lucide-react';
import { ActivityPlaceholder } from '@/components/math/shared/ActivityPlaceholder';
import { LessonVideo, VIDEO_KIND_LABEL, formatMinutes, getLessonVideos, posterUrl } from '@/lib/lessonVideos';
import { LessonVideoDialog } from './LessonVideoDialog';

/**
 * Videókártyák a témakör-nézet rácsába, a lecke Tananyag / Kvíz kártyái mellé.
 * Ha a leckéhez még nincs videó, nem jelenít meg semmit.
 *
 * @param lessonId a lecke TheoryTemplate-jének documentId-ja
 */
export function LessonVideoCards({ lessonId, color = 'rose' }: { lessonId: string; color?: string }) {
  const videos = getLessonVideos(lessonId);
  const [open, setOpen] = useState<LessonVideo | null>(null);
  if (videos.length === 0) return null;
  return (
    <>
      {videos.map((v) => (
        <ActivityPlaceholder
          key={v.id}
          title={VIDEO_KIND_LABEL[v.kind]}
          subtitle={`${formatMinutes(v.duration)}${v.chapters.length > 1 ? ` · ${v.chapters.length} fejezet` : ''}`}
          type="Videó"
          emoji="🎬"
          icon={<Play className="w-6 h-6" />}
          color={color}
          onClick={() => setOpen(v)}
        />
      ))}
      <LessonVideoDialog video={open} onClose={() => setOpen(null)} />
    </>
  );
}

/**
 * Sáv az elméleti tananyag tetején („Nézd meg videón”). A TheoryTemplate-ek a documentId-juk
 * alapján automatikusan megjelenítik; videó nélkül nem látszik.
 */
export function LessonVideoBanner({ lessonId }: { lessonId: string | undefined }) {
  const videos = getLessonVideos(lessonId);
  const [open, setOpen] = useState<LessonVideo | null>(null);
  if (videos.length === 0) return null;
  return (
    <div className="no-pdf mb-4 flex flex-col gap-2">
      {videos.map((v) => {
        const poster = posterUrl(v);
        return (
          <button
            key={v.id}
            onClick={() => setOpen(v)}
            className="group w-full flex items-center gap-3 sm:gap-4 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/30 p-2.5 sm:p-3 text-left shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all"
          >
            <div className="relative w-28 sm:w-40 aspect-video shrink-0 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
              {poster && <img src={poster} alt="" loading="lazy" className="w-full h-full object-cover" />}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 group-hover:bg-slate-900/25 transition-colors">
                <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" fill="currentColor" />
                </span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {v.kind === 'magyarazo' ? 'Nézd meg videón' : VIDEO_KIND_LABEL[v.kind]}
              </div>
              <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white leading-tight line-clamp-2">
                {v.title}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{formatMinutes(v.duration)}</span>
                {v.chapters.length > 1 && (
                  <span className="inline-flex items-center gap-1"><ListVideo className="w-3.5 h-3.5" />{v.chapters.length} fejezet</span>
                )}
              </div>
            </div>
          </button>
        );
      })}
      <LessonVideoDialog video={open} onClose={() => setOpen(null)} />
    </div>
  );
}
