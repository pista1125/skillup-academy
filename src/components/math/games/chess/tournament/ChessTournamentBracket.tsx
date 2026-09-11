import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Crown, 
  Users, 
  PlayCircle, 
  Eye, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  Swords, 
  RefreshCw,
  Zap,
  Medal
} from 'lucide-react';
import { 
  ChessTournament, 
  TournamentMatchNode, 
  TournamentParticipant, 
  ChessTournamentService 
} from '@/lib/chess/ChessTournamentService';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ChessTournamentBracketProps {
  tournament: ChessTournament;
  onJoinMatch: (
    matchId: string, 
    opponentName: string, 
    isWhite: boolean, 
    matchNodeId: string, 
    isSpectator?: boolean,
    isOpponentBot?: boolean,
    botDifficulty?: number
  ) => void;
  onViewPodium: () => void;
  onBackToLobby: () => void;
}

export default function ChessTournamentBracket({
  tournament,
  onJoinMatch,
  onViewPodium,
  onBackToLobby
}: ChessTournamentBracketProps) {
  const currentUid = auth.currentUser?.uid;
  const isHost = tournament.host_id === currentUid;

  // Find my current active match if any
  const currentRoundMatches = tournament.rounds[tournament.current_round - 1]?.matches || [];
  const myActiveMatchNode = currentRoundMatches.find(m => 
    (m.player1?.id === currentUid || m.player2?.id === currentUid) &&
    m.status === 'in_progress' &&
    !!m.match_id
  );

  const isMyMatchP1 = myActiveMatchNode?.player1?.id === currentUid;
  const isMyMatchWhite = isMyMatchP1 
    ? myActiveMatchNode?.white_id === myActiveMatchNode?.player1?.id
    : myActiveMatchNode?.white_id === myActiveMatchNode?.player2?.id;
  const myOpponent = isMyMatchP1 ? myActiveMatchNode?.player2 : myActiveMatchNode?.player1;

  // Render participant name & avatar
  const renderParticipant = (p: TournamentParticipant | null, isWinner: boolean, isMe: boolean, isWhite?: boolean) => {
    if (!p) {
      return (
        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-100/50 dark:bg-slate-800/30 text-slate-400 text-xs italic">
          <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px]">
            ⏳
          </div>
          <span>Várakozás...</span>
        </div>
      );
    }

    return (
      <div 
        className={cn(
          "flex items-center justify-between p-2 rounded-xl transition-all",
          isWinner 
            ? "bg-amber-500/15 dark:bg-amber-500/20 font-black text-amber-900 dark:text-amber-200 border border-amber-500/40 shadow-xs" 
            : p.is_eliminated 
              ? "opacity-50 line-through text-slate-400 bg-slate-100/40 dark:bg-slate-800/20" 
              : isMe 
                ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-300 dark:border-indigo-800" 
                : "text-slate-800 dark:text-slate-200 font-medium"
        )}
      >
        <div className="flex items-center gap-2 truncate mr-1.5">
          <div className={cn(
            "w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0",
            isMe ? "bg-indigo-600 text-white font-black" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
          )}>
            {p.avatar_url && p.avatar_url.length <= 4 ? p.avatar_url : p.name.charAt(0).toUpperCase()}
          </div>
          <span className="truncate text-xs">
            {p.name} {isMe && '(Te)'}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {isWhite !== undefined && (
            <span className="text-[10px] text-slate-400 font-mono" title={isWhite ? 'Világos' : 'Sötét'}>
              {isWhite ? '♔' : '♚'}
            </span>
          )}
          {p.is_bot && (
            <Badge className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[8px] px-1 py-0 font-bold">
              BOT
            </Badge>
          )}
          {isWinner && (
            <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          )}
        </div>
      </div>
    );
  };

  // Handle playing or spectating a match
  const handleMatchClick = (matchNode: TournamentMatchNode) => {
    if (!matchNode.match_id) return;

    const isP1 = matchNode.player1?.id === currentUid;
    const isP2 = matchNode.player2?.id === currentUid;
    const isParticipant = isP1 || isP2;

    const isWhite = isP1
      ? matchNode.white_id === matchNode.player1?.id
      : isP2
        ? matchNode.white_id === matchNode.player2?.id
        : true; // Default for spectator

    const opp = isP1 
      ? matchNode.player2 
      : isP2 
        ? matchNode.player1 
        : (matchNode.player2 || matchNode.player1);

    const oppName = opp?.name || (opp?.is_bot ? 'Sakk Bot' : 'Ellenfél');
    const isOpponentBot = isParticipant ? (opp?.is_bot ?? false) : false;
    const botDifficulty = opp?.bot_difficulty ?? 3;

    onJoinMatch(
      matchNode.match_id, 
      oppName, 
      isWhite, 
      matchNode.id, 
      !isParticipant, // If not participant, open as Spectator
      isOpponentBot,
      botDifficulty
    );
  };

  // If Bot vs Bot in active round, auto-simulate
  useEffect(() => {
    if (!isHost || tournament.status !== 'in_progress') return;

    const botMatches = currentRoundMatches.filter(m => 
      m.status === 'in_progress' && 
      m.player1?.is_bot && 
      m.player2?.is_bot &&
      !m.winner_id
    );

    if (botMatches.length > 0) {
      const timer = setTimeout(() => {
        botMatches.forEach((botMatch) => {
          if (botMatch.player1 && botMatch.player2) {
            const p1Diff = botMatch.player1.bot_difficulty || 3;
            const p2Diff = botMatch.player2.bot_difficulty || 3;
            const p1Chance = p1Diff / (p1Diff + p2Diff);
            const p1Wins = Math.random() < p1Chance;
            const winnerId = p1Wins ? botMatch.player1.id : botMatch.player2.id;
            ChessTournamentService.reportMatchResult(
              tournament.id, 
              botMatch.id, 
              winnerId, 
              `${p1Wins ? botMatch.player1.name : botMatch.player2.name} győzött 🤖🏆`
            );
          }
        });
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [tournament, isHost, currentRoundMatches]);

  return (
    <div className="w-full space-y-4 animate-in fade-in zoom-in-95 duration-300">
      {/* Top Banner Control Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-xl p-3.5 md:p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToLobby}
            className="h-8 px-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Lobbi
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                {tournament.title}
              </h2>
              <Badge className="bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.5">
                Kód: {tournament.code}
              </Badge>
            </div>
            <p className="text-xs text-slate-300/70">
              {tournament.status === 'finished' 
                ? '🏆 Bajnokság befejeződött' 
                : `${tournament.current_round}. Forduló folyamatban (${tournament.total_rounds} összesen)`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {tournament.status === 'finished' && (
            <Button
              onClick={onViewPodium}
              className="h-9 px-4 rounded-xl font-black text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-500/25 animate-bounce"
            >
              <Trophy className="w-4 h-4 mr-1.5" />
              Dobogó & Eredményhirdetés
            </Button>
          )}

          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-indigo-500/30 text-xs font-mono">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-bold text-white">{tournament.participants.length}</span>
            <span className="text-slate-400">fő</span>
          </div>
        </div>
      </div>

      {/* ACTIVE MATCH BANNER FOR CURRENT USER */}
      {myActiveMatchNode && tournament.status === 'in_progress' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-indigo-500/20 to-emerald-500/20 border-2 border-emerald-500/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-300 backdrop-blur-md">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 rounded-2xl bg-emerald-500 text-white shadow-lg animate-pulse">
              <Swords className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  ⚔️ A Te Mérkőzésed Készen Áll!
                </span>
                <Badge className="bg-emerald-600 text-white text-[9px] font-bold">
                  {myActiveMatchNode.round_name}
                </Badge>
              </div>
              <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white mt-0.5">
                Ellenfél: <span className="text-indigo-600 dark:text-indigo-400">{myOpponent?.name || 'Diáktárs'}</span> ({isMyMatchWhite ? 'Világos bábukkal vagy ♔' : 'Sötét bábukkal vagy ♚'})
              </h3>
            </div>
          </div>

          <Button
            onClick={() => handleMatchClick(myActiveMatchNode)}
            className="w-full sm:w-auto h-11 px-6 rounded-xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <PlayCircle className="w-5 h-5" />
            Belépés a Játszmába!
          </Button>
        </div>
      )}

      {/* INTERACTIVE TOURNAMENT BRACKET TREE */}
      <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[700px] flex items-stretch gap-4 md:gap-8 justify-center py-2 px-1">
          {tournament.rounds.map((round) => {
            const isCurrent = round.round_number === tournament.current_round && tournament.status === 'in_progress';
            const isFinished = round.round_number < tournament.current_round || tournament.status === 'finished';

            return (
              <div 
                key={round.round_number} 
                className="flex-1 flex flex-col items-center max-w-[260px]"
              >
                {/* Round Header */}
                <div className={cn(
                  "w-full py-2 px-3 rounded-xl text-center mb-3 border shadow-xs transition-all",
                  isCurrent 
                    ? "bg-indigo-600 text-white border-indigo-500 font-black shadow-indigo-500/20 ring-2 ring-indigo-500/40" 
                    : isFinished 
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 font-bold" 
                      : "bg-slate-50 dark:bg-slate-900 text-slate-400 border-slate-200/60 dark:border-slate-800/60 font-semibold"
                )}>
                  <div className="text-xs">{round.round_name}</div>
                  <div className="text-[10px] opacity-80">
                    {isCurrent ? '⚡ Folyamatban' : isFinished ? '✓ Befejezve' : '⏳ Következő'}
                  </div>
                </div>

                {/* Match Node Cards */}
                <div className="w-full flex-1 flex flex-col justify-around gap-4">
                  {round.matches.map((matchNode) => {
                    const isMyMatch = matchNode.player1?.id === currentUid || matchNode.player2?.id === currentUid;
                    const isPlaying = matchNode.status === 'in_progress' && !!matchNode.match_id;
                    const isDone = matchNode.status === 'finished';
                    const p1Winner = matchNode.winner_id === matchNode.player1?.id;
                    const p2Winner = matchNode.winner_id === matchNode.player2?.id;

                    return (
                      <Card 
                        key={matchNode.id}
                        className={cn(
                          "p-3 rounded-2xl border-2 transition-all duration-200 shadow-md flex flex-col gap-2 relative overflow-hidden",
                          isMyMatch && isPlaying
                            ? "border-emerald-500 ring-2 ring-emerald-500/40 bg-emerald-500/5 shadow-emerald-500/15 scale-[1.02]"
                            : isPlaying
                              ? "border-indigo-400 dark:border-indigo-700 bg-white/95 dark:bg-slate-900/95"
                              : isDone
                                ? "border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70"
                                : "border-slate-100 dark:border-slate-800/60 bg-slate-50/40 dark:bg-slate-950/40"
                        )}
                      >
                        {/* Top Node Meta */}
                        <div className="flex items-center justify-between text-[10px] px-0.5">
                          <span className="font-mono text-slate-400">
                            #{matchNode.id.toUpperCase()}
                          </span>

                          {isPlaying ? (
                            <Badge className="bg-emerald-500 text-white text-[9px] px-1.5 py-0 font-bold animate-pulse flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-white" /> Élőben
                            </Badge>
                          ) : isDone ? (
                            <span className="text-amber-600 dark:text-amber-400 font-bold font-mono">
                              {matchNode.score || 'Véget ért'}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-semibold">Várakozás</span>
                          )}
                        </div>

                        {/* Player 1 */}
                        {renderParticipant(
                          matchNode.player1, 
                          p1Winner, 
                          matchNode.player1?.id === currentUid,
                          matchNode.white_id === matchNode.player1?.id
                        )}

                        {/* Player 2 */}
                        {renderParticipant(
                          matchNode.player2, 
                          p2Winner, 
                          matchNode.player2?.id === currentUid,
                          matchNode.white_id === matchNode.player2?.id
                        )}

                        {/* Action Buttons for this match */}
                        {isPlaying && (
                          <div className="pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                            {isMyMatch ? (
                              <Button
                                size="sm"
                                onClick={() => handleMatchClick(matchNode)}
                                className="w-full h-7 rounded-xl font-black text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                              >
                                <PlayCircle className="w-3.5 h-3.5 mr-1" />
                                Játszom
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMatchClick(matchNode)}
                                className="w-full h-7 rounded-xl font-bold text-xs border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                              >
                                <Eye className="w-3.5 h-3.5 mr-1" />
                                Nézői Mód
                              </Button>
                            )}
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
