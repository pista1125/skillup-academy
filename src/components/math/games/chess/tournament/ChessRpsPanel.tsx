import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { ChessTournament, ChessTournamentService, TournamentMatchNode } from '@/lib/chess/ChessTournamentService';
import { RPS_LABEL, RpsChoice } from '@/lib/chess/chessRules';

const CHOICES: RpsChoice[] = ['rock', 'paper', 'scissors'];

interface ChessRpsPanelProps {
  tournament: ChessTournament;
  node: TournamentMatchNode;
}

/**
 * Kő-papír-olló a továbbjutásért – akkor jelenik meg, ha a játszma döntetlen lett,
 * és a hátralévő idő és az anyag is egyenlő volt.
 */
export default function ChessRpsPanel({ tournament, node }: ChessRpsPanelProps) {
  const [sending, setSending] = useState(false);
  const uid = auth.currentUser?.uid;
  const isPlayer = uid === node.player1?.id || uid === node.player2?.id;
  const rps = node.rps;
  const myChoice = uid ? rps?.choices?.[uid] : undefined;
  const opponent = uid === node.player1?.id ? node.player2 : node.player1;
  const lastRound = rps?.history?.[rps.history.length - 1];

  const choose = async (choice: RpsChoice) => {
    setSending(true);
    try {
      await ChessTournamentService.submitRpsChoice(tournament.id, node.id, choice);
    } catch (e) {
      toast.error('Nem sikerült elküldeni a választást.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="w-full max-w-sm rounded-3xl border-2 border-amber-400 bg-slate-900 p-5 text-center text-white shadow-2xl space-y-4">
      <div className="text-4xl">✊ ✋ ✌️</div>
      <h3 className="text-lg font-black">Kő-papír-olló a továbbjutásért!</h3>
      <p className="text-xs text-slate-300">
        A játszma döntetlen lett, és a hátralévő idő és a bábuk értéke is egyenlő volt.
        {rps && rps.round > 1 && <> Ez már a(z) {rps.round}. kör.</>}
      </p>

      {lastRound && (
        <p className="text-xs font-bold text-amber-200">
          Előző kör: {node.player1?.name} {RPS_LABEL[lastRound.p1]} – {node.player2?.name} {RPS_LABEL[lastRound.p2]} → egyenlő, újra!
        </p>
      )}

      {isPlayer ? (
        myChoice ? (
          <p className="text-sm font-bold text-emerald-300">
            Választottál: {RPS_LABEL[myChoice]}. Várakozás {opponent?.name || 'az ellenfél'} választására…
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {CHOICES.map((c) => (
              <Button
                key={c}
                disabled={sending}
                onClick={() => choose(c)}
                className="h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm flex flex-col"
              >
                <span className="text-2xl leading-none">{RPS_LABEL[c].split(' ')[0]}</span>
                <span className="text-[11px]">{RPS_LABEL[c].split(' ')[1]}</span>
              </Button>
            ))}
          </div>
        )
      ) : (
        <p className="text-xs text-slate-400">
          {node.player1?.name} és {node.player2?.name} most kő-papír-ollóval dönt a továbbjutásról.
        </p>
      )}
    </div>
  );
}
