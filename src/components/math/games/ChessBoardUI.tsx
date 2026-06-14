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
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [optionSquares, setOptionSquares] = useState<any>({});
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
        const lastMoveStr = payload.new.last_move;
        // Skip if it's our own move (we already updated locally)
        setGame((current) => {
          if (newFen === current.fen()) return current;
          console.log('Syncing new FEN from remote');
          const newGame = new Chess(newFen);
          setMoveHistory(newGame.history());
          
          if (lastMoveStr && lastMoveStr.length >= 4) {
            const from = lastMoveStr.substring(0, 2);
            const to = lastMoveStr.substring(2, 4);
            setLastMove({ from, to });
          } else {
            setLastMove(null);
          }
          
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
      const update = new Chess();
      try {
        update.loadPgn(g.pgn());
      } catch (e) {
        update.load(g.fen());
      }
      modify(update);
      setMoveHistory(update.history());
      
      const history = update.history({ verbose: true });
      if (history.length > 0) {
        const last = history[history.length - 1];
        setLastMove({ from: last.from, to: last.to });
      } else {
        setLastMove(null);
      }
      
      return update;
    });
    setMoveFrom(null);
    setOptionSquares({});
  }

  function makeAMove(move: any) {
    const nextGame = new Chess();
    try {
      nextGame.loadPgn(game.pgn());
    } catch (e) {
      nextGame.load(game.fen());
    }
    let result = null;
    try {
      result = nextGame.move(move);
    } catch (e) {
      return null;
    }

    if (result === null) return null;

    setGame(nextGame);
    setMoveHistory(nextGame.history());
    setLastMove({ from: result.from, to: result.to });

    if (onMove) {
      onMove(nextGame.fen(), result.lan || result.san);
    }

    setMoveFrom(null);
    setOptionSquares({});
    return result;
  }

  function getMoveOptions(square: string) {
    const moves = game.moves({
      square: square as any,
      verbose: true,
    });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: any = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to as any) && game.get(move.to as any).color !== game.get(square as any).color
            ? "radial-gradient(circle, rgba(255,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square: string) {
    if (mode === 'friend' && game.turn() !== (isWhite ? 'w' : 'b')) return;

    // from
    if (!moveFrom) {
      const piece = game.get(square as any);
      if (piece && piece.color === game.turn()) {
        const hasMoves = getMoveOptions(square);
        if (hasMoves) setMoveFrom(square);
      }
      return;
    }

    // to
    const move = {
      from: moveFrom,
      to: square,
      promotion: "q",
    };

    const result = makeAMove(move);

    // if invalid, check if we clicked another of our pieces
    if (result === null) {
      const piece = game.get(square as any);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      } else {
        setMoveFrom(null);
        setOptionSquares({});
      }
      return;
    }
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    if (mode === 'friend' && game.turn() !== (isWhite ? 'w' : 'b')) return false;

    const result = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    return result !== null;
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

  const customSquareStyles = useMemo(() => {
    const styles: any = {};

    // 1. Highlight last move (from and to squares)
    if (lastMove) {
      styles[lastMove.from] = {
        background: "rgba(251, 191, 36, 0.35)", // Subtle amber/gold overlay
      };
      styles[lastMove.to] = {
        background: "rgba(251, 191, 36, 0.35)", // Subtle amber/gold overlay
      };
    }

    // 2. Highlight checked king in red
    if (game.isCheck()) {
      const turn = game.turn();
      const kingPiece = game.board().flat().find(p => p && p.type === 'k' && p.color === turn);
      if (kingPiece) {
        styles[kingPiece.square] = {
          background: "rgba(239, 68, 68, 0.4)", // soft red square background
          border: "2px solid #ef4444", // red border around the square
        };
      }
    }

    // 3. Merge active piece selection and possible move options
    return {
      ...styles,
      ...optionSquares,
    };
  }, [lastMove, game, optionSquares]);

  const currentTurn = game.turn() === 'w' ? 'Világos' : 'Sötét';

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto">
      {/* Board Column */}
      <div className="flex-1 flex justify-center items-center">
        <Card className="w-full max-w-[min(100%,75vh)] p-4 rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 overflow-hidden relative transition-all duration-300">
          <div className="aspect-square relative mx-auto w-full">
            <Chessboard 
              position={game.fen()} 
              onPieceDrop={onDrop} 
              onSquareClick={onSquareClick}
              boardOrientation={orientation}
              customSquareStyles={customSquareStyles}
              customBoardStyle={{
                borderRadius: '1rem',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
              }}
              customDarkSquareStyle={{ backgroundColor: '#475569' }}
              customLightSquareStyle={{ backgroundColor: '#94a3b8' }}
            />

            {/* Game Over Centered Overlay */}
            {game.isGameOver() && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm rounded-2xl p-6 text-center animate-in fade-in duration-300">
                <div className={cn(
                  "bg-white dark:bg-slate-900 border-2 rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-95 duration-300",
                  game.isCheckmate() ? "border-rose-500 dark:border-rose-500" : "border-slate-500 dark:border-slate-500"
                )}>
                  {game.isCheckmate() ? (
                    <>
                      <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce border-2 border-rose-500">
                        <Trophy className="w-8 h-8" />
                      </div>
                      
                      <h2 className="text-2xl font-black text-rose-600 dark:text-rose-500 mb-2 uppercase tracking-wide">
                        Sakk-matt!
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 font-bold mb-4">
                        Sakk-matt és vége a játéknak.
                      </p>
                      
                      <p className="text-xl font-extrabold text-slate-800 dark:text-white mb-6">
                        {(() => {
                          const turn = game.turn();
                          const playerWon = (isWhite && turn === 'b') || (!isWhite && turn === 'w');
                          return playerWon ? 'Gratulálok, győztél!' : 'Sakk-matt! Vége a játéknak.';
                        })()}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-slate-500">
                        <Info className="w-8 h-8" />
                      </div>
                      
                      <h2 className="text-2xl font-black text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">
                        Játék vége
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 font-bold mb-6 font-medium">
                        {game.isDraw() ? 'Döntetlen!' : game.isStalemate() ? 'Patt (Döntetlen)!' : 'Döntetlen / Vége a játéknak.'}
                      </p>
                    </>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                      onClick={resetGame}
                      className={cn(
                        "w-full text-white font-bold rounded-xl py-3 shadow-md transition-all text-sm",
                        game.isCheckmate() 
                          ? "bg-rose-600 hover:bg-rose-700 shadow-rose-200 dark:shadow-none" 
                          : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none"
                      )}
                    >
                      Új játék indítása
                    </Button>
                  </div>
                </div>
              </div>
            )}
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
