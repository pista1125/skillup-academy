import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { ListVideo, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LessonVideo, VIDEO_KIND_LABEL, formatTime, posterUrl, videoUrl } from '@/lib/lessonVideos';

const POS_KEY = (id: string) => `diakzona:video-pos:${id}`;

function readPos(id: string): number {
  try {
    return Number(localStorage.getItem(POS_KEY(id))) || 0;
  } catch {
    return 0;
  }
}

function writePos(id: string, t: number) {
  try {
    localStorage.setItem(POS_KEY(id), String(Math.floor(t)));
  } catch {
    /* privát mód: nem baj */
  }
}

interface LessonVideoDialogProps {
  video: LessonVideo | null;
  onClose: () => void;
}

/** Felugró lejátszó fejezetlistával; megjegyzi, hol tartott a diák (eszközönként). */
export function LessonVideoDialog({ video, onClose }: LessonVideoDialogProps) {
  return (
    <Dialog open={!!video} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-6xl w-[calc(100vw-1rem)] p-0 gap-0 overflow-hidden rounded-2xl sm:rounded-2xl max-h-[calc(100dvh-1rem)] flex flex-col">
        {video && <Player video={video} />}
      </DialogContent>
    </Dialog>
  );
}

function Player({ video }: { video: LessonVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(0);
  const [resumeAt, setResumeAt] = useState(() => {
    const p = readPos(video.id);
    // az elejét és a legvégét nem érdemes „folytatni”
    return p > 10 && p < video.duration - 15 ? p : 0;
  });
  const lastSaved = useRef(0);

  const activeIdx = useMemo(() => {
    let idx = 0;
    video.chapters.forEach((c, i) => {
      if (time >= c.start - 0.25) idx = i;
    });
    return idx;
  }, [time, video.chapters]);

  const seek = useCallback((t: number) => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = t;
    setResumeAt(0);
    el.play().catch(() => {});
  }, []);

  useEffect(() => {
    const el = ref.current;
    return () => {
      if (el && el.currentTime > 0) writePos(video.id, el.currentTime >= video.duration - 15 ? 0 : el.currentTime);
    };
  }, [video.id, video.duration]);

  const onTimeUpdate = () => {
    const el = ref.current;
    if (!el) return;
    setTime(el.currentTime);
    if (Math.abs(el.currentTime - lastSaved.current) > 5) {
      lastSaved.current = el.currentTime;
      writePos(video.id, el.currentTime);
    }
  };

  const hasChapters = video.chapters.length > 1;

  return (
    <div className="flex flex-col lg:flex-row min-h-0">
      <div className="flex-1 min-w-0 bg-black flex flex-col">
        <div className="relative w-full aspect-video bg-black">
          <video
            ref={ref}
            key={video.id}
            className="absolute inset-0 w-full h-full"
            src={videoUrl(video)}
            poster={posterUrl(video)}
            controls
            autoPlay
            playsInline
            preload="metadata"
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            onTimeUpdate={onTimeUpdate}
            onEnded={() => writePos(video.id, 0)}
          />
          {resumeAt > 0 && (
            <div className="absolute left-3 bottom-16 sm:bottom-20 flex flex-wrap items-center gap-2 rounded-xl bg-slate-900/90 text-white text-xs sm:text-sm px-3 py-2 shadow-lg">
              <span>Legutóbb itt tartottál: <b>{formatTime(resumeAt)}</b></span>
              <button
                className="rounded-lg bg-blue-500 hover:bg-blue-600 px-2.5 py-1 font-bold"
                onClick={() => seek(resumeAt)}
              >
                Folytatás
              </button>
              <button className="rounded-lg px-2 py-1 text-slate-300 hover:text-white" onClick={() => setResumeAt(0)}>
                ✕
              </button>
            </div>
          )}
        </div>
        <div className="px-4 py-3 bg-white dark:bg-slate-900 text-left border-b lg:border-b-0 border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {VIDEO_KIND_LABEL[video.kind]} · {formatTime(video.duration)}
          </div>
          <DialogTitle className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight pr-8">
            {video.title}
          </DialogTitle>
          <DialogDescription className="sr-only">Oktatóvideó fejezetekkel</DialogDescription>
        </div>
      </div>

      {hasChapters && (
        <aside className="lg:w-80 shrink-0 bg-white dark:bg-slate-900 lg:border-l border-slate-200 dark:border-slate-800 relative min-h-0">
          {/* nagy képernyőn a lista a videó magasságáig ér és azon belül görget */}
          <div className="flex flex-col max-h-[40dvh] lg:max-h-none lg:absolute lg:inset-0">
          <div className="px-4 py-3 flex items-center gap-2 text-sm font-black text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800">
            <ListVideo className="w-4 h-4 text-blue-600" />
            Fejezetek
            <span className="ml-auto text-xs font-bold text-slate-400">{video.chapters.length}</span>
          </div>
          <ol className="overflow-y-auto flex-1 min-h-0 py-1">
            {video.chapters.map((c, i) => {
              const active = i === activeIdx && time > 0;
              return (
                <li key={i}>
                  <button
                    onClick={() => seek(c.start)}
                    className={cn(
                      'w-full flex items-start gap-3 px-4 py-2 text-left text-sm transition-colors',
                      active
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    )}
                  >
                    <span className={cn('font-mono text-xs mt-0.5 w-11 shrink-0', active ? 'text-blue-600' : 'text-slate-400')}>
                      {formatTime(c.start)}
                    </span>
                    <span className="flex-1 leading-snug">{c.title}</span>
                    {active && <PlayCircle className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" />}
                  </button>
                </li>
              );
            })}
          </ol>
          </div>
        </aside>
      )}
    </div>
  );
}
