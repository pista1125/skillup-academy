import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Crown, Sparkles, RotateCcw, ArrowLeft, Users, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChessTournament, TournamentParticipant } from '@/lib/chess/ChessTournamentService';
import { cn } from '@/lib/utils';

interface ChessTournamentPodiumProps {
  tournament: ChessTournament;
  onBackToLobby: () => void;
  onNewTournament?: () => void;
}

export default function ChessTournamentPodium({
  tournament,
  onBackToLobby,
  onNewTournament
}: ChessTournamentPodiumProps) {
  useEffect(() => {
    // Fire festive fireworks confetti
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#f59e0b', '#ec4899', '#6366f1', '#10b981', '#3b82f6']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#f59e0b', '#ec4899', '#6366f1', '#10b981', '#3b82f6']
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const winner = tournament.winner;
  const runnerUp = tournament.runner_up;
  const thirdPlace = tournament.third_place || tournament.participants.find(p => p.id !== winner?.id && p.id !== runnerUp?.id);

  const renderParticipantAvatar = (p?: TournamentParticipant | null) => {
    if (!p) return '♟️';
    if (p.avatar_url && (p.avatar_url.startsWith('http') || p.avatar_url.startsWith('data:'))) {
      return (
        <img src={p.avatar_url} alt={p.name} className="w-full h-full object-cover rounded-xl" />
      );
    }
    if (p.avatar_url && p.avatar_url.length <= 4) {
      return <span>{p.avatar_url}</span>;
    }
    return <span>{p.name.charAt(0).toUpperCase()}</span>;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500 py-4">
      {/* Celebration Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black tracking-wider uppercase animate-bounce">
          <Sparkles className="w-4 h-4" /> Bajnokság Végeredmény
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          🎉 Gratulálunk a <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent">Bajnoknak!</span>
        </h1>

        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          A(z) <span className="font-bold text-indigo-600 dark:text-indigo-400">"{tournament.title}"</span> hivatalosan befejeződött!
        </p>
      </div>

      {/* 3D-Style Animated Podium */}
      <div className="relative pt-8 pb-4">
        <div className="flex items-end justify-center gap-3 sm:gap-6 max-w-2xl mx-auto">
          {/* 2nd Place (Silver) */}
          <div className="flex-1 flex flex-col items-center">
            {/* Player Avatar & Crown */}
            <div className="relative mb-3 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-200 dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 shadow-xl flex items-center justify-center text-2xl overflow-hidden">
                {renderParticipantAvatar(runnerUp)}
              </div>
              <div className="absolute -top-3.5 bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-white p-1 rounded-full shadow-md border-2 border-white dark:border-slate-900">
                <Medal className="w-4 h-4 text-slate-400" />
              </div>
              <span className="font-black text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-2 truncate max-w-[110px] text-center">
                {runnerUp?.name || '2. Helyezett'}
              </span>
              <span className="text-[10px] text-slate-400 font-bold">2. Helyezett</span>
            </div>

            {/* Silver Podium Column */}
            <div className="w-full h-32 sm:h-40 rounded-t-3xl bg-gradient-to-t from-slate-400 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 border-t-4 border-slate-300 dark:border-slate-500 shadow-2xl flex flex-col items-center justify-center text-slate-700 dark:text-slate-200 font-black">
              <span className="text-3xl sm:text-4xl">🥈</span>
              <span className="text-xs font-black uppercase tracking-wider mt-1 opacity-80">2. Hely</span>
            </div>
          </div>

          {/* 1st Place (Gold Champion) */}
          <div className="flex-1 flex flex-col items-center -mt-6">
            {/* Crown & Gold Avatar */}
            <div className="relative mb-3 flex flex-col items-center">
              <div className="absolute -top-6 animate-pulse text-amber-500">
                <Crown className="w-8 h-8 fill-amber-400" />
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-600 p-1 shadow-2xl ring-4 ring-amber-400/40 animate-in zoom-in duration-700">
                <div className="w-full h-full rounded-[1.3rem] bg-amber-100 dark:bg-slate-900 flex items-center justify-center text-3xl sm:text-4xl overflow-hidden shadow-inner">
                  {renderParticipantAvatar(winner)}
                </div>
              </div>
              <span className="font-black text-sm sm:text-base text-slate-900 dark:text-white mt-2 truncate max-w-[130px] text-center">
                {winner?.name || 'Bajnok'}
              </span>
              <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1">
                <Trophy className="w-3 h-3 fill-amber-500" /> Bajnok 🥇
              </span>
            </div>

            {/* Gold Podium Column */}
            <div className="w-full h-44 sm:h-52 rounded-t-3xl bg-gradient-to-t from-amber-500 via-yellow-400 to-amber-300 dark:from-amber-700 dark:via-amber-600 dark:to-amber-500 border-t-4 border-amber-200 shadow-2xl flex flex-col items-center justify-center text-slate-950 font-black relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60 animate-pulse" />
              <span className="text-4xl sm:text-5xl">🏆</span>
              <span className="text-sm font-black uppercase tracking-widest mt-1">1. Hely</span>
            </div>
          </div>

          {/* 3rd Place (Bronze) */}
          <div className="flex-1 flex flex-col items-center">
            {/* Player Avatar */}
            <div className="relative mb-3 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-900/10 dark:bg-amber-950/40 border-4 border-amber-700/40 shadow-xl flex items-center justify-center text-2xl overflow-hidden">
                {renderParticipantAvatar(thirdPlace)}
              </div>
              <div className="absolute -top-3.5 bg-amber-700 text-white p-1 rounded-full shadow-md border-2 border-white dark:border-slate-900">
                <Medal className="w-4 h-4 text-amber-200" />
              </div>
              <span className="font-black text-xs sm:text-sm text-slate-800 dark:text-slate-200 mt-2 truncate max-w-[110px] text-center">
                {thirdPlace?.name || '3. Helyezett'}
              </span>
              <span className="text-[10px] text-slate-400 font-bold">3. Helyezett</span>
            </div>

            {/* Bronze Podium Column */}
            <div className="w-full h-24 sm:h-32 rounded-t-3xl bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600 dark:from-amber-950 dark:via-amber-900 dark:to-amber-800 border-t-4 border-amber-500/50 shadow-2xl flex flex-col items-center justify-center text-amber-100 font-black">
              <span className="text-2xl sm:text-3xl">🥉</span>
              <span className="text-xs font-black uppercase tracking-wider mt-1 opacity-80">3. Hely</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament Stats & Overview Card */}
      <Card className="p-5 rounded-2xl border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md max-w-2xl mx-auto">
        <h3 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-indigo-500" />
          Bajnokság Adatlapja
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Résztvevők</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100">
              {tournament.participants.length} Fő
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Fordulók</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100">
              {tournament.total_rounds} Kör
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Időkontroll</span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100">
              {tournament.time_limit ? `${Math.round(tournament.time_limit / 60)} perc` : 'Korlátlan'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Versenykód</span>
            <span className="text-sm font-mono font-black text-amber-600 dark:text-amber-400">
              {tournament.code}
            </span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          onClick={onBackToLobby}
          variant="outline"
          className="w-full sm:w-auto h-11 px-6 rounded-xl font-bold text-xs border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Vissza a Bajnokság Lobbiba
        </Button>

        {onNewTournament && (
          <Button
            onClick={onNewTournament}
            className="w-full sm:w-auto h-11 px-6 rounded-xl font-black text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-500/20"
          >
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Új Bajnokság Indítása
          </Button>
        )}
      </div>
    </div>
  );
}
