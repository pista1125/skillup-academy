import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Crown, 
  Trophy,
  Users,
  Cpu,
  Maximize2,
  Minimize2
} from 'lucide-react';
import ChessBoardUI from "./ChessBoardUI";
import ChessLobby from "./ChessLobby";
import ChessTournamentBracket from "./tournament/ChessTournamentBracket";
import ChessTournamentPodium from "./tournament/ChessTournamentPodium";
import { ChessService } from '@/lib/chess/ChessService';
import { ChessTournament, ChessTournamentService } from '@/lib/chess/ChessTournamentService';
import { Chess } from 'chess.js';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ChessGameProps {
  onBack?: () => void;
}

export default function ChessGame({ onBack }: ChessGameProps) {
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'tournament_bracket' | 'tournament_podium'>('lobby');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Active Tournament state
  const [activeTournament, setActiveTournament] = useState<ChessTournament | null>(null);
  const [tournamentMatchNodeId, setTournamentMatchNodeId] = useState<string | null>(null);
  const [isSpectator, setIsSpectator] = useState<boolean>(false);

  const [matchOptions, setMatchOptions] = useState<{
    mode: 'ai' | 'friend';
    difficulty?: number;
    opponentId?: string;
    opponentName?: string;
    matchId?: string;
    isWhite?: boolean;
    timeLimit?: number;
  }>({ mode: 'ai', timeLimit: 300 });

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Real-time synchronization for active tournament
  useEffect(() => {
    if (!activeTournament?.id) return;

    const sub = ChessTournamentService.subscribeToTournament(
      activeTournament.id,
      (updated) => {
        setActiveTournament(updated);
      }
    );

    return () => {
      sub.unsubscribe();
    };
  }, [activeTournament?.id]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } catch (e) {
        toast.error('A teljes képernyős mód nem indítható el ebben a böngészőben.');
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen().catch(() => {});
      }
    }
  };

  const handleStartGame = async (mode: 'ai' | 'friend', options: any) => {
    if (mode === 'friend') {
      if (options.matchId) {
        // Resuming or joining an existing match
        setMatchOptions({
          mode: 'friend',
          matchId: options.matchId,
          opponentId: options.opponentId,
          opponentName: options.opponentName,
          isWhite: options.isWhite ?? true,
          timeLimit: options.timeLimit
        });
      } else if (options.opponentId) {
        // Creating a new match
        try {
          const match = await ChessService.createMatch(options.opponentId, true, options.timeLimit ?? 300);
          setMatchOptions({
            mode: 'friend',
            matchId: match.id,
            opponentId: options.opponentId,
            opponentName: options.opponentName,
            isWhite: true, // Creator is white
            timeLimit: options.timeLimit ?? 300
          });
        } catch (e) {
          toast.error('Hiba a meccs létrehozásakor');
          return;
        }
      }
    } else {
      setMatchOptions({
        mode: 'ai',
        difficulty: options.difficulty,
        isWhite: options.isWhite ?? true,
        timeLimit: options.timeLimit ?? 300
      });
    }
    setTournamentMatchNodeId(null);
    setIsSpectator(false);
    setGameState('playing');
  };

  // Open a tournament bracket
  const handleOpenTournament = (tournament: ChessTournament) => {
    setActiveTournament(tournament);
    setGameState('tournament_bracket');
  };

  // Join a specific match from tournament bracket
  const handleJoinTournamentMatch = (
    matchId: string, 
    opponentName: string, 
    isWhite: boolean, 
    matchNodeId: string, 
    spectate?: boolean,
    isOpponentBot?: boolean,
    botDifficulty?: number
  ) => {
    setMatchOptions({
      mode: isOpponentBot ? 'ai' : 'friend',
      matchId,
      opponentName,
      isWhite,
      difficulty: botDifficulty ?? 3,
      timeLimit: activeTournament?.time_limit ?? 300
    });
    setTournamentMatchNodeId(matchNodeId);
    setIsSpectator(!!spectate);
    setGameState('playing');
  };

  // Move sync & checkmate handling
  const handleMove = async (fen: string, move: string, whiteTime?: number, blackTime?: number) => {
    if (matchOptions.matchId) {
      try {
        const testGame = new Chess(fen);
        let status = 'active';
        let winnerId: string | null = null;
        let endReason: string | null = null;

        if (testGame.isGameOver()) {
          if (testGame.isCheckmate()) {
            status = 'finished';
            const turn = testGame.turn(); // 'w' or 'b'
            const winnerIsWhite = turn === 'b';
            const currentRound = activeTournament?.rounds[(activeTournament?.current_round || 1) - 1];
            const matchNode = currentRound?.matches.find(m => m.id === tournamentMatchNodeId);
            if (matchNode) {
              winnerId = (winnerIsWhite ? matchNode.white_id : matchNode.black_id) || null;
            } else {
              winnerId = (winnerIsWhite === matchOptions.isWhite) ? auth.currentUser?.uid || null : null;
            }
            endReason = 'Sakk-matt!';
          } else if (testGame.isDraw() || testGame.isStalemate()) {
            status = 'finished';
            winnerId = 'draw';
            endReason = testGame.isStalemate() ? 'Patt (Döntetlen)' : 'Döntetlen';
          }
        }

        await ChessService.updateMatch(matchOptions.matchId, fen, move, status, whiteTime, blackTime);

        if (status === 'finished' && winnerId) {
          await ChessService.finishMatchOnTimeout(matchOptions.matchId, winnerId, endReason || 'Játszma befejezve');

          // If this is a tournament match, report the winner!
          if (activeTournament && tournamentMatchNodeId) {
            await ChessTournamentService.reportMatchResult(
              activeTournament.id,
              tournamentMatchNodeId,
              winnerId,
              endReason || 'Játszma befejezve'
            );
          }
        }
      } catch (e) {
        console.error('Failed to sync move', e);
      }
    }
  };

  // Game End callback from UI
  const handleGameEnd = async (winnerColor: 'white' | 'black' | 'draw') => {
    if (activeTournament && tournamentMatchNodeId && matchOptions.matchId) {
      try {
        const currentRound = activeTournament.rounds[activeTournament.current_round - 1];
        const matchNode = currentRound?.matches.find(m => m.id === tournamentMatchNodeId);
        if (matchNode) {
          let winnerId = winnerColor === 'draw' 
            ? (matchNode.player1?.id || 'draw') 
            : (winnerColor === 'white' ? matchNode.white_id : matchNode.black_id) || matchNode.player1?.id;
          
          if (winnerId) {
            await ChessTournamentService.reportMatchResult(
              activeTournament.id,
              tournamentMatchNodeId,
              winnerId,
              winnerColor === 'draw' ? 'Döntetlen / Továbbjutás' : 'Játszma lezárult'
            );
          }
        }
      } catch (e) {
        console.error('Failed to report tournament game end', e);
      }
    }
  };

  // Header back button text
  const getBackButtonLabel = () => {
    if (gameState === 'lobby') return 'Vissza a Menübe';
    if (gameState === 'tournament_bracket') return 'Vissza a Lobbiba';
    if (gameState === 'tournament_podium') return 'Vissza a Bajnoksághoz';
    if (activeTournament) return 'Vissza az Ágrajzhoz';
    return 'Vissza a Lobbiba';
  };

  const handleHeaderBack = () => {
    if (gameState === 'playing' && activeTournament) {
      setGameState('tournament_bracket');
    } else if (gameState === 'tournament_podium') {
      setGameState('tournament_bracket');
    } else if (gameState === 'tournament_bracket') {
      setActiveTournament(null);
      setGameState('lobby');
    } else if (gameState === 'playing') {
      setGameState('lobby');
    } else {
      if (onBack) onBack();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 lg:px-12 py-3 md:py-4 flex flex-col transition-all",
        isFullscreen && "px-3 sm:px-6 lg:px-12 py-3 md:py-4 overflow-y-auto"
      )}
    >
      {/* Header */}
      <div className="w-full mb-3 md:mb-4 flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={handleHeaderBack}
          className="rounded-xl hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all font-bold text-xs md:text-sm h-9 px-3"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          {getBackButtonLabel()}
        </Button>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600 dark:text-amber-400">
            <Crown size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight italic">
            SAKK <span className="text-indigo-600 dark:text-indigo-400">MESTER</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {activeTournament ? (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-600 dark:text-amber-400 text-xs font-black">
              <Trophy size={15} />
              <span>{activeTournament.title}</span>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Trophy size={16} className="text-amber-500" />
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Aréna</span>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="rounded-xl hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-300 h-10 w-10"
            title={isFullscreen ? "Kilépés a teljes képernyőből" : "Teljes képernyő"}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Main View Router */}
      {gameState === 'lobby' && (
        <ChessLobby 
          onStartGame={handleStartGame} 
          onOpenTournament={handleOpenTournament}
        />
      )}

      {gameState === 'tournament_bracket' && activeTournament && (
        <ChessTournamentBracket
          tournament={activeTournament}
          onJoinMatch={handleJoinTournamentMatch}
          onViewPodium={() => setGameState('tournament_podium')}
          onBackToLobby={() => {
            setActiveTournament(null);
            setGameState('lobby');
          }}
        />
      )}

      {gameState === 'tournament_podium' && activeTournament && (
        <ChessTournamentPodium
          tournament={activeTournament}
          onBackToLobby={() => {
            setActiveTournament(null);
            setGameState('lobby');
          }}
          onNewTournament={() => {
            setActiveTournament(null);
            setGameState('lobby');
          }}
        />
      )}

      {gameState === 'playing' && (
        <div className="animate-in fade-in zoom-in-95 duration-500 flex-1 flex flex-col justify-start">
          <ChessBoardUI 
            mode={matchOptions.mode}
            difficulty={matchOptions.difficulty}
            matchId={matchOptions.matchId}
            opponentName={matchOptions.opponentName}
            isWhite={matchOptions.isWhite}
            timeLimit={matchOptions.timeLimit}
            onMove={handleMove}
            onGameEnd={handleGameEnd}
            tournamentContext={
              activeTournament && tournamentMatchNodeId 
                ? {
                    tournamentId: activeTournament.id,
                    matchNodeId: tournamentMatchNodeId,
                    roundName: activeTournament.rounds[activeTournament.current_round - 1]?.round_name
                  }
                : undefined
            }
            isSpectator={isSpectator}
            onBackToTournament={
              activeTournament ? () => setGameState('tournament_bracket') : undefined
            }
          />
        </div>
      )}
    </div>
  );
}
