import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { ArrowRight, Clock, CornerDownLeft, Loader2, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { groupResults, KIND_LABEL, searchEntries } from '@/lib/search/search';
import { SEARCH_PATH, SEARCH_QUERY_PARAM, ELEMENTARY_GRADES, HIGH_SCHOOL_GRADES } from '@/data/navCatalog';
import {
  clearRecentSearches,
  preloadSearchIndex,
  pushRecentSearch,
  readRecentSearches,
  ResultRowContent,
  useIsLocked,
  useSearchIndex,
} from './searchShared';

const PER_GROUP = 5;

const isTypingTarget = (el: EventTarget | null) => {
  const t = el as HTMLElement | null;
  if (!t) return false;
  const tag = t.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t.isContentEditable;
};

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[10px] font-bold text-slate-500 dark:text-zinc-400 font-sans">
    {children}
  </kbd>
);

/**
 * Fejléc kereső: kompakt mező (lg felett) / ikon (mobilon), amely parancspalettát nyit.
 * Gyorsbillentyű: Ctrl+K (Mac: ⌘K) vagy „/”.
 */
export function HeaderSearch() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const { entries, tasksLoading } = useSearchIndex(open);
  const isLocked = useIsLocked();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setRecent(readRecentSearches());
  }, [open]);

  const results = useMemo(() => (entries && query.trim() ? searchEntries(entries, query) : []), [entries, query]);
  const groups = useMemo(() => groupResults(results, PER_GROUP), [results]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
  }, []);

  const go = (path: string) => {
    if (query.trim()) pushRecentSearch(query);
    close();
    navigate(path);
  };

  const showAll = () => {
    const q = query.trim();
    if (!q) return;
    go(`${SEARCH_PATH}?${SEARCH_QUERY_PARAM}=${encodeURIComponent(q)}`);
  };

  const shortcut = isMac ? '⌘K' : 'Ctrl K';

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => (o ? setOpen(true) : close())}>
      {/* Asztali: mező kinézetű gomb */}
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          onMouseEnter={preloadSearchIndex}
          onFocus={preloadSearchIndex}
          className="hidden lg:flex items-center gap-2 h-9 w-[230px] xl:w-[270px] pl-3.5 pr-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white text-sm shadow-md backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Keresés"
        >
          <Search className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left truncate">Keresés…</span>
          <kbd className="hidden xl:inline-flex items-center h-5 px-1.5 rounded-md bg-white/15 border border-white/20 text-[10px] font-bold text-white/80 font-sans">
            {shortcut}
          </kbd>
        </button>
      </DialogPrimitive.Trigger>

      {/* Mobil: ikon */}
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-md backdrop-blur-md transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label="Keresés"
          title="Keresés"
        >
          <Search className="w-4 h-4" />
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            'fixed z-50 left-1/2 -translate-x-1/2 w-full bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden flex flex-col',
            'inset-y-0 sm:inset-y-auto sm:top-[9vh] sm:max-w-2xl sm:rounded-3xl sm:border sm:border-slate-200 dark:sm:border-zinc-800 sm:max-h-[78vh]',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98]'
          )}
        >
          <DialogPrimitive.Title className="sr-only">Keresés</DialogPrimitive.Title>
          <CommandPrimitive shouldFilter={false} loop className="flex flex-col min-h-0 flex-1" label="Keresés">
            <div className="flex items-center gap-3 px-4 sm:px-5 border-b border-slate-100 dark:border-zinc-800">
              <Search className="w-5 h-5 shrink-0 text-primary" />
              <CommandPrimitive.Input
                value={query}
                onValueChange={setQuery}
                onKeyDown={(e) => {
                  // Ctrl/⌘+Enter: teljes találati oldal
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); showAll(); }
                }}
                placeholder="Témakör, lecke, eszköz, játék… (pl. „törtek 6”)"
                className="flex-1 h-14 bg-transparent text-base text-slate-800 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                  aria-label="Keresőmező törlése"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <DialogPrimitive.Close className="hidden sm:inline-flex" asChild>
                <button type="button" aria-label="Bezárás"><Kbd>Esc</Kbd></button>
              </DialogPrimitive.Close>
              <DialogPrimitive.Close className="sm:hidden text-sm font-bold text-primary" >Mégse</DialogPrimitive.Close>
            </div>

            <CommandPrimitive.List className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-2 sm:px-3 py-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-black [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-slate-400 dark:[&_[cmdk-group-heading]]:text-zinc-500">
              {!entries && (
                <CommandPrimitive.Loading>
                  <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-400">
                    <Loader2 className="w-4 h-4 animate-spin" /> Kereső betöltése…
                  </div>
                </CommandPrimitive.Loading>
              )}

              {/* Üres mező: legutóbbi keresések + gyorslinkek */}
              {entries && !query.trim() && (
                <>
                  {recent.length > 0 && (
                    <CommandPrimitive.Group heading="Legutóbbi keresések">
                      {recent.map((r) => (
                        <CommandPrimitive.Item
                          key={`recent-${r}`}
                          value={`recent-${r}`}
                          onSelect={() => setQuery(r)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm font-bold text-slate-700 dark:text-zinc-300 data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-zinc-800"
                        >
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="flex-1 truncate">{r}</span>
                        </CommandPrimitive.Item>
                      ))}
                      <button
                        type="button"
                        onClick={() => { clearRecentSearches(); setRecent([]); }}
                        className="ml-3 mt-1 text-[11px] font-bold text-slate-400 hover:text-primary"
                      >
                        Előzmények törlése
                      </button>
                    </CommandPrimitive.Group>
                  )}
                  <CommandPrimitive.Group heading="Ugrás évfolyamra">
                    <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 px-2 pb-2">
                      {[...ELEMENTARY_GRADES, ...HIGH_SCHOOL_GRADES].map((g) => (
                        <CommandPrimitive.Item
                          key={g.slug}
                          value={`grade-${g.slug}`}
                          onSelect={() => go(`/${g.slug}`)}
                          className={cn(
                            'h-10 rounded-xl border-2 flex items-center justify-center text-sm font-black cursor-pointer transition',
                            g.tone,
                            'data-[selected=true]:ring-2 data-[selected=true]:ring-primary'
                          )}
                        >
                          {g.short}
                        </CommandPrimitive.Item>
                      ))}
                    </div>
                  </CommandPrimitive.Group>
                  <div className="px-3 pb-3 pt-1 text-xs text-slate-400 dark:text-zinc-500 leading-relaxed">
                    Tipp: írj be témát és évfolyamot is, pl. <b className="text-slate-500 dark:text-zinc-400">„törtek 6”</b> vagy <b className="text-slate-500 dark:text-zinc-400">„szazalek”</b> (ékezet nélkül is megy).
                  </div>
                </>
              )}

              {entries && query.trim() && groups.length === 0 && (
                <div className="py-12 text-center">
                  <div className="text-3xl mb-2">🔍</div>
                  <p className="text-sm font-bold text-slate-600 dark:text-zinc-300">Nincs találat erre: „{query.trim()}”</p>
                  <p className="text-xs text-slate-400 mt-1">Próbálj rövidebb szót, vagy nézd meg a Tananyagok menüt.</p>
                  {tasksLoading && <p className="text-xs text-slate-400 mt-2">A kompetencia-feladatok még töltődnek…</p>}
                </div>
              )}

              {groups.map((g) => (
                <CommandPrimitive.Group key={g.kind} heading={`${KIND_LABEL[g.kind]}${g.total > g.items.length ? ` · ${g.total}` : ''}`}>
                  {g.items.map((e) => (
                    <CommandPrimitive.Item
                      key={e.id}
                      value={e.id}
                      onSelect={() => go(e.path)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer data-[selected=true]:bg-primary/10 dark:data-[selected=true]:bg-primary/20"
                    >
                      <ResultRowContent entry={e} query={query} locked={isLocked(e)} compact />
                    </CommandPrimitive.Item>
                  ))}
                </CommandPrimitive.Group>
              ))}

              {groups.length > 0 && (
                <CommandPrimitive.Item
                  value="__show-all__"
                  onSelect={showAll}
                  className="mt-1 mb-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer text-sm font-black text-primary data-[selected=true]:bg-primary/10"
                >
                  Összes találat ({results.length}) <ArrowRight className="w-4 h-4" />
                </CommandPrimitive.Item>
              )}
            </CommandPrimitive.List>

            <div className="hidden sm:flex items-center gap-4 px-5 py-2.5 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-950/40 text-[11px] text-slate-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> mozgás</span>
              <span className="flex items-center gap-1.5"><Kbd><CornerDownLeft className="w-3 h-3" /></Kbd> megnyitás</span>
              <span className="flex items-center gap-1.5"><Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd><Kbd><CornerDownLeft className="w-3 h-3" /></Kbd> összes találat</span>
              <span className="ml-auto flex items-center gap-1.5"><Kbd>{shortcut}</Kbd> megnyitás bárhonnan</span>
            </div>
          </CommandPrimitive>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
