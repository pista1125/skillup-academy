import { useState, useEffect, useCallback, useMemo } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { ChessAI, getDifficultyDepth } from '@/lib/chess/ChessAI';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Trophy, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  User,
  Cpu,
  History,
  Info
} from 'lucide-react';
import { ChessService } from '@/lib/chess/ChessService';
import { cn } from '@/lib/utils';

interface ChessBoardUIProps {
  mode: 'ai' | 'friend';
  difficulty?: number; // 1-5
  matchId?: string;
  opponentName?: string;
  isWhite?: boolean;
  onMove?: (fen: string, move: string) => void;
  onGameEnd?: (winner: 'white' | 'black' | 'draw') => void;
}

export default function ChessBoardUI({
  mode,
  difficulty = 3,
  matchId,
  opponentName = 'Ellenfelek',
  isWhite = true,
  onMove,
  onGameEnd
}: ChessBoardUIProps) {
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<any>(null);
  const [engine, setEngine] = useState<ChessAI | null>(null);

  const orientation = isWhite ? 'white' : 'black';

  // Initialize AI engine
  useEffect(() => {
    if (mode === 'ai') {
      const ai = new ChessAI();
      setEngine(ai);
      return () => ai.terminate();
    }
  }, [mode]);

  // Subscribe to real-time updates for multiplayer
  useEffect(() => {
    if (mode === 'friend' && matchId) {
      console.log('Subscribing to match:', matchId);
      const subscription = ChessService.subscribeToMatch(matchId, (payload) => {
        const newFen = payload.new.fen;
        // Skip if it's our own move (we already updated locally)
        setGame((current) => {
          if (newFen === current.fen()) return current;
          console.log('Syncing new FEN from remote');
          const newGame = new Chess(newFen);
          setMoveHistory(newGame.history());
          return newGame;
        });
      });
      return () => {
        console.log('Unsubscribing from match:', matchId);
        subscription.unsubscribe();
      };
    }
  }, [mode, matchId]); // Removed 'game' dependency to prevent re-subscribing every move

  // AI makes its move
  useEffect(() => {
    if (mode === 'ai' && game.turn() !== (isWhite ? 'w' : 'b') && !game.isGameOver()) {
      const makeAiMove = async () => {
        if (!engine) return;
        const depth = getDifficultyDepth(difficulty);
        const bestMove = await engine.getBestMove(game.fen(), depth);
        if (bestMove) {
          safeGameMutate((game) => {
            game.move(bestMove);
          });
        }
      };
      
      const timeout = setTimeout(makeAiMove, 500); // Small delay for realism
      return () => clearTimeout(timeout);
    }
  }, [game.fen(), mode, engine, isWhite, difficulty]);

  function safeGameMutate(modify: (g: Chess) => void) {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      setMoveHistory(update.history());
      return update;
    });
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    if (mode === 'friend' && game.turn() !== (isWhite ? 'w' : 'b')) return false;

    let move = null;
    let newFen = '';
    
    // Create actual next state to get its FEN
    const nextGame = new Chess(game.fen());
    try {
      move = nextGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });
      newFen = nextGame.fen();
    } catch (e) {
      return false;
    }

    if (move === null) return false;

    // Update state locally first
    setGame(nextGame);
    setMoveHistory(nextGame.history());

    // Send the NEW state to server/AI
    if (onMove) {
      onMove(newFen, (move as any).lan || (move as any).san);
    }

    return true;
  }

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setMoveHistory([]);
    setLastMove(null);
  };

  const undoMove = () => {
    safeGameMutate((game) => {
      game.undo();
      if (mode === 'ai') game.undo(); // Undo AI move as well
    });
  };

  const getStatusMessage = () => {
    if (game.isCheck() && !game.isGameOver()) return 'Sakk!';
    if (game.isCheckmate()) return 'Sakk-matt!';
    if (game.isDraw()) return 'Döntetlen!';
    if (game.isStalemate()) return 'Patt!';
    return null;
  };

  const currentTurn = game.turn() === 'w' ? 'Világos' : 'Sötét';

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto">
      {/* Board Column */}
      <div className="flex-1 flex justify-center items-center">
        <Card className="w-full max-w-[min(100%,75vh)] p-4 rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 overflow-hidden relative transition-all duration-300">
          <div className="aspect-square relative mx-auto">
            <Chessboard 
              position={game.fen()} 
              onPieceDrop={onDrop} 
              boardOrientation={orientation}
              customBoardStyle={{
                borderRadius: '1rem',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
              }}
              customDarkSquareStyle={{ backgroundColor: '#475569' }}
              customLightSquareStyle={{ backgroundColor: '#94a3b8' }}
            />
          </div>
          
          <div className="mt-4 flex justify-between items-center px-2">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-3 h-3 rounded-full animate-pulse",
                game.turn() === 'w' ? "bg-white border border-slate-300" : "bg-slate-900"
              )} />
              <span className="font-bold text-slate-600 dark:text-slate-400">
                {currentTurn} következik
              </span>
            </div>
            {getStatusMessage() && (
              <div className="px-4 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full font-bold text-sm animate-bounce">
                {getStatusMessage()}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Info Column */}
      <div className="w-full lg:w-80 flex flex-col gap-4">
        {/* Players Card */}
        <Card className="p-4 rounded-2xl border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <User size={18} />
                </div>
                <span className="font-bold text-sm">Te (Világos)</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                  {mode === 'ai' ? <Cpu size={18} /> : <User size={18} />}
                </div>
                <span className="font-bold text-sm">
                  {mode === 'ai' ? `Robot (Szint ${difficulty})` : opponentName}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Moves Card */}
        <Card className="flex-1 p-4 rounded-2xl border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest px-1">
            <History size={14} />
            <span>Lépések előzménye</span>
          </div>
          <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 overflow-y-auto max-h-48 border border-slate-100 dark:border-slate-800 font-mono text-xs">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                <div key={i} className="contents">
                  <div className="text-slate-400 text-right pr-2">{i + 1}.</div>
                  <div className="flex gap-4">
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {moveHistory[i * 2]}
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {moveHistory[i * 2 + 1] || ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <Button 
              variant="outline" 
              onClick={undoMove} 
              disabled={moveHistory.length === 0}
              className="rounded-xl border-slate-200 dark:border-slate-700 text-xs h-9"
            >
              <RotateCcw size={14} className="mr-2" />
              Lépés visszavonása
            </Button>
            <Button 
              variant="outline" 
              onClick={resetGame}
              className="rounded-xl border-slate-200 dark:border-slate-700 text-xs h-9 text-rose-500 hover:text-rose-600 hover:bg-rose-50"
            >
              Uj játék
            </Button>
          </div>
        </Card>

        {/* Game Stats Card */}
        <Card className="p-4 rounded-2xl border-slate-200 dark:border-slate-800 shadow-lg bg-indigo-600 text-white overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Trophy size={100} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Info size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Információ</span>
            </div>
            <h4 className="text-lg font-bold mb-1">Stratégiai tipp</h4>
            <p className="text-xs opacity-90 leading-tight">
              Igyekezz uralni a tábla közepét a korai szakaszban, és ne felejtsd el mihamarabb sáncolni a király védelmében!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
