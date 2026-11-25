import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  ClipboardList,
  Gamepad2,
  GraduationCap,
  Layers,
  Lock,
  Target,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { decideTopicAccess } from '@/lib/access';
import { useEntitlements } from '@/contexts/EntitlementsContext';
import { highlight, IndexedEntry, ScoredEntry, SearchKind } from '@/lib/search/search';

// ---------------------------------------------------------------- index betöltés

/**
 * Az index csak akkor töltődik be, amikor először szükség van rá (a kereső megnyitásakor),
 * így a fejléc nem növeli az oldalak kezdeti méretét.
 */
export function useSearchIndex(enabled: boolean): { entries: IndexedEntry[] | null; tasksLoading: boolean } {
  const [entries, setEntries] = useState<IndexedEntry[] | null>(null);
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    import('@/lib/search/searchIndex').then((m) => {
      if (!alive) return;
      const base = m.getBaseIndex();
      setEntries((prev) => prev ?? base);
      m.loadTaskIndex().then((tasks) => {
        if (!alive) return;
        setEntries([...base, ...tasks]);
        setTasksLoading(false);
      });
    });
    return () => { alive = false; };
  }, [enabled]);

  return { entries, tasksLoading };
}

/** Előtöltés (pl. a keresőmező fölé vitt egérre), hogy a megnyitás azonnali legyen. */
export const preloadSearchIndex = () => {
  import('@/lib/search/searchIndex').then((m) => { m.getBaseIndex(); m.loadTaskIndex(); });
};

// ---------------------------------------------------------------- legutóbbi keresések

const RECENT_KEY = 'diakzona_recent_searches';

export function readRecentSearches(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string').slice(0, 6) : [];
  } catch {
    return [];
  }
}

export function pushRecentSearch(q: string) {
  const t = q.trim();
  if (t.length < 2) return;
  try {
    const next = [t, ...readRecentSearches().filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(0, 6);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  } catch { /* privát mód: nem baj */ }
}

export function clearRecentSearches() {
  try { localStorage.removeItem(RECENT_KEY); } catch { /* nem baj */ }
}

// ---------------------------------------------------------------- megjelenítés

const KIND_STYLE: Record<SearchKind, { icon: React.ReactNode; box: string }> = {
  grade: { icon: <GraduationCap />, box: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300' },
  topic: { icon: <Layers />, box: 'bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300' },
  lesson: { icon: <BookOpen />, box: 'bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-300' },
  tool: { icon: <Wrench />, box: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-300' },
  game: { icon: <Gamepad2 />, box: 'bg-pink-50 text-pink-600 dark:bg-pink-950/50 dark:text-pink-300' },
  competency: { icon: <Target />, box: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300' },
  task: { icon: <ClipboardList />, box: 'bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-300' },
};

export const Highlighted: React.FC<{ text: string; query: string }> = ({ text, query }) => (
  <>
    {highlight(text, query).map((p, i) =>
      p.match ? (
        <mark key={i} className="bg-amber-200/70 dark:bg-amber-500/30 text-inherit rounded-[3px] px-[1px]">{p.text}</mark>
      ) : (
        <React.Fragment key={i}>{p.text}</React.Fragment>
      )
    )}
  </>
);

/** Rövid évfolyam-címke: „6. o.”, „Felvételi”. */
export const gradeBadgeText = (e: ScoredEntry | IndexedEntry): string | null => {
  if (e.gradeNum) return `${e.gradeNum}. o.`;
  return null;
};

export function useIsLocked() {
  const ent = useEntitlements();
  return (e: IndexedEntry): boolean => {
    if (ent.loading || !ent.paywallEnabled || ent.fullAccess) return false;
    if ((e.kind === 'topic' || e.kind === 'lesson') && e.topicId) {
      return !decideTopicAccess(e.gradeLevel ?? null, e.topicId, ent).allowed;
    }
    if (e.kind === 'grade' && e.gradeNum) return !ent.grades.has(e.gradeNum);
    return false;
  };
}

export const ResultRowContent: React.FC<{ entry: IndexedEntry; query: string; locked: boolean; compact?: boolean }> = ({ entry, query, locked, compact }) => {
  const style = KIND_STYLE[entry.kind];
  const badge = gradeBadgeText(entry);
  return (
    <>
      <span
        className={cn(
          'shrink-0 rounded-xl flex items-center justify-center [&_svg]:w-4 [&_svg]:h-4',
          compact ? 'w-8 h-8 text-base' : 'w-10 h-10 text-lg',
          style.box
        )}
        aria-hidden
      >
        {entry.icon && entry.kind !== 'lesson' ? entry.icon : style.icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-bold text-slate-800 dark:text-zinc-100 leading-snug line-clamp-2">
          <Highlighted text={entry.title} query={query} />
        </span>
        {entry.subtitle && (
          <span className="block text-xs text-slate-500 dark:text-zinc-400 truncate mt-0.5">{entry.subtitle}</span>
        )}
      </span>
      {locked && (
        <Lock className="w-3.5 h-3.5 shrink-0 text-slate-400 dark:text-zinc-500" aria-label="Előfizetéssel érhető el" />
      )}
      {badge && (
        <span className="shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300 tabular-nums">
          {badge}
        </span>
      )}
    </>
  );
};
