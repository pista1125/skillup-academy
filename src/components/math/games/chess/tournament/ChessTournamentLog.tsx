import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, ScrollText, Swords, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ChessService } from '@/lib/chess/ChessService';
import { ChessTournament, TournamentLogEntry, TournamentLogType, TournamentMatchNode } from '@/lib/chess/ChessTournamentService';

const TYPE_ICON: Record<TournamentLogType, string> = {
  created: '📋', join: '👋', leave: '🚪', host: '👑', bot: '🤖', start: '🚀', pairing: '♟️', round: '▶️',
  result: '🏁', tiebreak: '⚖️', rps: '✊', override: '⚖️', finish: '🏆',
  opened: '👀', draw_offer: '🤝', draw_declined: '✋', resign: '🏳️', presence: '🙋',
};

const IMPORTANT: TournamentLogType[] = ['start', 'round', 'result', 'tiebreak', 'rps', 'override', 'finish', 'resign'];

function formatTime(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatMoves(moves: string[]): string {
  const parts: string[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    parts.push(`${i / 2 + 1}. ${moves[i]}${moves[i + 1] ? ` ${moves[i + 1]}` : ''}`);
  }
  return parts.join('  ');
}

interface Props {
  tournament: ChessTournament;
  onClose: () => void;
}

/** Bajnoksági napló: eseménysor + játszmánkénti lépéslista. */
export default function ChessTournamentLog({ tournament, onClose }: Props) {
  const [tab, setTab] = useState<'events' | 'games'>('events');
  const [onlyImportant, setOnlyImportant] = useState(false);
  const [openMoves, setOpenMoves] = useState<Record<string, string[] | 'loading' | 'none'>>({});

  const entries = useMemo(() => {
    const list = [...(tournament.log || [])].sort((a, b) => a.at.localeCompare(b.at));
    return onlyImportant ? list.filter((e) => IMPORTANT.includes(e.type)) : list;
  }, [tournament.log, onlyImportant]);

  const games = useMemo(
    () => tournament.rounds.flatMap((r) => r.matches).filter((m) => m.player1 && m.player2 && m.status !== 'pending'),
    [tournament.rounds]
  );

  const nodeName = (id?: string) => {
    if (!id) return '';
    const n = tournament.rounds.flatMap((r) => r.matches).find((m) => m.id === id);
    return n ? `${n.player1?.name ?? '?'} – ${n.player2?.name ?? '?'}` : '';
  };

  const loadMoves = async (node: TournamentMatchNode) => {
    if (!node.match_id) return;
    if (openMoves[node.id] && openMoves[node.id] !== 'loading') {
      setOpenMoves(({ [node.id]: _, ...rest }) => rest);
      return;
    }
    setOpenMoves((s) => ({ ...s, [node.id]: 'loading' }));
    const m = await ChessService.getMatch(node.match_id);
    setOpenMoves((s) => ({ ...s, [node.id]: m?.moves?.length ? m.moves : 'none' }));
  };

  const copyAll = async () => {
    const lines = [
      `${tournament.title} – napló (kód: ${tournament.code})`,
      '',
      ...(tournament.log || [])
        .slice()
        .sort((a, b) => a.at.localeCompare(b.at))
        .map((e: TournamentLogEntry) => `${formatTime(e.at)}  ${e.text}`),
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      toast.success('A napló a vágólapra került.');
    } catch {
      toast.error('Nem sikerült a másolás.');
    }
  };

  return (
    <Card className="p-4 md:p-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <ScrollText className="w-4 h-4 text-indigo-500" /> Bajnoksági napló
        </h3>
        <div className="flex items-center gap-1.5">
          <Button size="sm" variant="outline" onClick={copyAll} className="h-8 rounded-xl text-xs font-bold">
            <Copy className="w-3.5 h-3.5 mr-1" /> Másolás
          </Button>
          <Button size="icon" variant="ghost" onClick={onClose} className="h-8 w-8 rounded-xl" title="Bezárás">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 w-fit">
        {([['events', 'Események'], ['games', 'Játszmák']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-colors',
              tab === key ? 'bg-white dark:bg-slate-950 text-indigo-700 dark:text-indigo-300 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'events' ? (
        <>
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
            <input type="checkbox" checked={onlyImportant} onChange={(e) => setOnlyImportant(e.target.checked)} className="accent-indigo-600" />
            Csak a fontos események (eredmények, döntések)
          </label>
          {entries.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">
              {tournament.log ? 'Még nincs bejegyzés.' : 'Ehhez a (régebbi) bajnoksághoz még nem készült napló.'}
            </p>
          ) : (
            <ol className="max-h-[420px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 pr-1">
              {entries.map((e) => (
                <li key={e.id} className="flex gap-3 py-2 text-xs">
                  <span className="font-mono text-slate-400 shrink-0 w-[62px]">{formatTime(e.at)}</span>
                  <span className="shrink-0">{TYPE_ICON[e.type] ?? '•'}</span>
                  <span className={cn('text-slate-700 dark:text-slate-200 leading-snug', IMPORTANT.includes(e.type) && 'font-bold')}>
                    {e.text}
                    {e.node_id && ['opened', 'draw_offer', 'draw_declined', 'presence'].includes(e.type) && (
                      <span className="text-slate-400 font-normal"> · {nodeName(e.node_id)}</span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </>
      ) : (
        <ul className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
          {games.length === 0 && <li className="text-xs text-slate-500 py-4 text-center">Még nincs játszma.</li>}
          {games.map((g) => {
            const moves = openMoves[g.id];
            const white = g.white_id === g.player1?.id ? g.player1 : g.player2;
            const black = g.white_id === g.player1?.id ? g.player2 : g.player1;
            return (
              <li key={g.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{g.round_name}</span>
                    <span className="text-slate-700 dark:text-slate-200 font-semibold"> · ♔ {white?.name} – ♚ {black?.name}</span>
                    {g.score && <span className="ml-2 font-mono font-black text-amber-600">{g.score}</span>}
                  </div>
                  {g.match_id && (
                    <Button size="sm" variant="outline" onClick={() => loadMoves(g)} className="h-7 rounded-lg text-[11px] font-bold">
                      <Swords className="w-3 h-3 mr-1" /> {moves && moves !== 'loading' ? 'Elrejtés' : 'Lépések'}
                    </Button>
                  )}
                </div>
                {g.end_reason && <p className="text-[11px] text-slate-500 dark:text-slate-400">{g.end_reason}</p>}
                {moves === 'loading' && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
                {moves === 'none' && (
                  <p className="text-[11px] text-slate-400">Ehhez a játszmához nincsenek rögzített lépések (a lépésnapló csak az új bajnokságoktól működik).</p>
                )}
                {Array.isArray(moves) && (
                  <p className="text-[11px] font-mono leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 rounded-lg p-2">
                    {formatMoves(moves)}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
