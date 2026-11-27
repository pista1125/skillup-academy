import { useEffect } from 'react';
import { ChessMatch, ChessService } from '@/lib/chess/ChessService';
import { ChessTournament, ChessTournamentService } from '@/lib/chess/ChessTournamentService';
import { evaluateReferee } from '@/lib/chess/chessRules';
import { ServerClock } from '@/lib/chess/serverClock';

/**
 * „Játékvezető” az ágrajz-képernyőn: figyeli az aktuális forduló futó játszmáit, és
 * - lezárja azt, amelyikben lejárt az idő / valaki kilépett / nem válaszol,
 * - a már lezárt játszma eredményét átvezeti a bajnokságba (ha valamiért elmaradt).
 * Így akkor is véget ér egy meccs, ha egyik diák sincs a táblánál.
 *
 * A szervezőnél minden meccsre fut, a játékosoknál csak a saját meccsükre.
 */
export function useTournamentReferee(tournament: ChessTournament, enabled: boolean, onlyNodeId?: string) {
  const round = tournament.rounds[tournament.current_round - 1];
  const key = (round?.matches || [])
    .filter((n) => n.status === 'in_progress' && n.match_id && (!onlyNodeId || n.id === onlyNodeId))
    .map((n) => `${n.id}:${n.match_id}`)
    .join('|');

  useEffect(() => {
    if (!enabled || tournament.status !== 'in_progress' || !key) return;
    const pairs = key.split('|').map((s) => {
      const [nodeId, matchId] = s.split(':');
      return { nodeId, matchId };
    });
    const latest = new Map<string, ChessMatch>();
    const lastClaim = new Map<string, number>();
    const syncing = new Set<string>();
    ServerClock.ensureSynced();

    const sync = (nodeId: string, matchId: string) => {
      if (syncing.has(matchId)) return;
      syncing.add(matchId);
      ChessTournamentService.syncMatchResult(tournament.id, nodeId)
        .catch((e) => {
          console.warn('Eredmény átvezetése sikertelen', e);
          syncing.delete(matchId);
        });
    };

    const subs = pairs.map(({ nodeId, matchId }) =>
      ChessService.subscribeToMatch(matchId, (payload) => {
        const m = payload.new as ChessMatch;
        latest.set(matchId, m);
        if (m.status === 'finished') sync(nodeId, matchId);
      })
    );

    const timer = setInterval(() => {
      if (!ServerClock.isSynced()) return;
      const now = ServerClock.now();
      latest.forEach((m, matchId) => {
        if (m.status !== 'active' || !evaluateReferee(m, now)) return;
        if (now - (lastClaim.get(matchId) ?? 0) < 5000) return;
        lastClaim.set(matchId, now);
        ChessService.claimReferee(matchId).catch((e) => console.warn('Játékvezetői lezárás sikertelen', e));
      });
    }, 2000);

    return () => {
      clearInterval(timer);
      subs.forEach((s) => s.unsubscribe());
    };
  }, [enabled, tournament.id, tournament.status, key]);
}
