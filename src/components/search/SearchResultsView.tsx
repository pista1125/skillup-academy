import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { groupResults, KIND_LABEL, searchEntries, SearchKind } from '@/lib/search/search';
import { SEARCH_QUERY_PARAM } from '@/data/navCatalog';
import { pushRecentSearch, ResultRowContent, useIsLocked, useSearchIndex } from './searchShared';

const GROUP_PREVIEW = 8;

/** Teljes találati oldal: /kereses?q=… (frissíthető, megosztható). */
export function SearchResultsView({ onHome }: { onHome: () => void }) {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const urlQuery = params.get(SEARCH_QUERY_PARAM) || '';
  const [input, setInput] = useState(urlQuery);
  const [kind, setKind] = useState<SearchKind | 'all'>('all');
  const [expanded, setExpanded] = useState<Set<SearchKind>>(new Set());
  const { entries, tasksLoading } = useSearchIndex(true);
  const isLocked = useIsLocked();

  // Kívülről jövő URL-változás (pl. új keresés a fejlécből) felülírja a mezőt; a saját írásunk nem.
  const lastPushed = useRef(urlQuery);
  useEffect(() => {
    setExpanded(new Set());
    if (urlQuery !== lastPushed.current) {
      lastPushed.current = urlQuery;
      setInput(urlQuery);
    }
  }, [urlQuery]);

  // Gépelés közben 250 ms után frissítjük az URL-t (replace, hogy ne teljen a böngészőelőzmény).
  useEffect(() => {
    if (input === urlQuery) return;
    const t = window.setTimeout(() => {
      lastPushed.current = input.trim() ? input : '';
      const next = new URLSearchParams(params);
      if (input.trim()) next.set(SEARCH_QUERY_PARAM, input); else next.delete(SEARCH_QUERY_PARAM);
      setParams(next, { replace: true });
    }, 250);
    return () => window.clearTimeout(t);
  }, [input, urlQuery, params, setParams]);

  const results = useMemo(() => (entries && urlQuery.trim() ? searchEntries(entries, urlQuery) : []), [entries, urlQuery]);
  const groups = useMemo(() => groupResults(results), [results]);
  const visible = kind === 'all' ? groups : groups.filter((g) => g.kind === kind);

  const open = (path: string) => {
    pushRecentSearch(urlQuery);
    navigate(path);
  };

  return (
    <div className="animate-slide-up max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 bg-primary/10 rounded-2xl text-primary"><Search className="w-6 h-6" /></div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-zinc-100">Keresés</h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            {urlQuery.trim()
              ? <>{results.length} találat erre: <span className="font-bold text-primary">„{urlQuery.trim()}”</span></>
              : 'Írd be, mit keresel.'}
          </p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Témakör, lecke, eszköz, játék…"
          className="w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-base text-slate-800 dark:text-zinc-100 outline-none focus:border-primary transition-colors"
        />
        {input && (
          <button
            type="button"
            onClick={() => setInput('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            aria-label="Keresőmező törlése"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {groups.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', ...groups.map((g) => g.kind)] as (SearchKind | 'all')[]).map((k) => {
            const count = k === 'all' ? results.length : groups.find((g) => g.kind === k)?.total ?? 0;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={cn(
                  'h-8 px-3 rounded-full text-xs font-bold border transition-colors',
                  kind === k
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700'
                )}
              >
                {k === 'all' ? 'Mind' : KIND_LABEL[k]} <span className="opacity-60 tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {!entries && (
        <div className="flex items-center justify-center gap-2 py-16 text-slate-400"><Loader2 className="w-5 h-5 animate-spin" /> Betöltés…</div>
      )}

      {entries && urlQuery.trim() && results.length === 0 && (
        <div className="text-center py-16 bg-slate-50 dark:bg-zinc-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-zinc-800">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-slate-600 dark:text-zinc-300 mb-1">Nincs találat.</h3>
          <p className="text-sm text-slate-400">Próbálj rövidebb vagy másik szót.{tasksLoading ? ' (A kompetencia-feladatok még töltődnek…)' : ''}</p>
          <button type="button" onClick={onHome} className="mt-6 px-5 h-10 rounded-xl border border-slate-200 dark:border-zinc-700 text-sm font-bold text-slate-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800">
            Vissza a főoldalra
          </button>
        </div>
      )}

      <div className="space-y-8">
        {visible.map((g) => {
          const showAll = kind !== 'all' || expanded.has(g.kind);
          const items = showAll ? g.items : g.items.slice(0, GROUP_PREVIEW);
          return (
            <section key={g.kind}>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-2 px-1">
                {KIND_LABEL[g.kind]} <span className="tabular-nums">· {g.total}</span>
              </h3>
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 divide-y divide-slate-100 dark:divide-zinc-800 overflow-hidden">
                {items.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => open(e.path)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors focus-visible:outline-none focus-visible:bg-primary/5"
                  >
                    <ResultRowContent entry={e} query={urlQuery} locked={isLocked(e)} />
                  </button>
                ))}
              </div>
              {!showAll && g.total > GROUP_PREVIEW && (
                <button
                  type="button"
                  onClick={() => setExpanded((s) => new Set(s).add(g.kind))}
                  className="mt-2 px-1 text-xs font-black text-primary hover:underline"
                >
                  Továbbiak megjelenítése ({g.total - GROUP_PREVIEW})
                </button>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
