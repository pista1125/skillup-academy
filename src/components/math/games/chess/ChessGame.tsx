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
import { ChessService } from '@/lib/chess/ChessService';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ChessGameProps {
  onBack?: () => void;
}

export default function ChessGame({ onBack }: ChessGameProps) {
  const [gameState, setGameState] = useState<'lobby' | 'playing'>('lobby');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [matchOptions, setMatchOptions] = useState<{
    mode: 'ai' | 'friend';
    difficulty?: number;
    opponentId?: string;
    opponentName?: string;
    matchId?: string;
    isWhite?: boolean;
  }>({ mode: 'ai' });

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

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
          isWhite: options.isWhite ?? true
        });
      } else if (options.opponentId) {
        // Creating a new match
        try {
          const match = await ChessService.createMatch(options.opponentId);
          setMatchOptions({
            mode: 'friend',
            matchId: match.id,
            opponentId: options.opponentId,
            opponentName: options.opponentName,
            isWhite: true // Creator is white
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
        isWhite: true
      });
    }
    setGameState('playing');
  };

  const handleMove = async (fen: string, move: string) => {
    if (matchOptions.mode === 'friend' && matchOptions.matchId) {
      try {
        await ChessService.updateMatch(matchOptions.matchId, fen, move);
      } catch (e) {
        console.error('Failed to sync move', e);
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 flex flex-col transition-all",
        isFullscreen && "p-4 md:p-6 overflow-y-auto"
      )}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between w-full">
        <Button 
          variant="ghost" 
          onClick={gameState === 'lobby' ? onBack : () => setGameState('lobby')}
          className="rounded-xl hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {gameState === 'lobby' ? 'Vissza a játékokhoz' : 'Ki a lobbiba'}
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
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Trophy size={16} className="text-amber-500" />
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">0 Pont</span>
          </div>

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

      {gameState === 'lobby' ? (
        <ChessLobby onStartGame={handleStartGame} />
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-500 flex-1 flex flex-col justify-start">
          <ChessBoardUI 
            mode={matchOptions.mode}
            difficulty={matchOptions.difficulty}
            matchId={matchOptions.matchId}
            opponentName={matchOptions.opponentName}
            isWhite={matchOptions.isWhite}
            onMove={handleMove}
          />
        </div>
      )}
    </div>
  );
}
