import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { ChessAI, getDifficultyDepth } from '@/lib/chess/ChessAI';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Trophy, 
  RotateCcw, 
  User, 
  Cpu, 
  History, 
  Info, 
  Lightbulb, 
  Loader2,
  Handshake,
  Flag,
  Zap,
  X,
  Check,
  Clock,
  Timer,
  Eye,
  ArrowLeft,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { ChessService, ChessMatch, hasSufficientMatingMaterial } from '@/lib/chess/ChessService';
import { ChessTournamentService } from '@/lib/chess/ChessTournamentService';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import MathChallengeModal from './MathChallengeModal';

const CapturedPiecesRow = ({
  captured,
  scoreDiff,
  color
}: {
  captured: Array<{ type: string; symbol: string; count: number }>;
  scoreDiff?: string | null;
  color: 'white' | 'black';
}) => {
  if (captured.length === 0 && !scoreDiff) return null;

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 select-none no-scrollbar">
      <div className="flex items-center text-sm sm:text-base font-bold tracking-tight">
        {captured.map((item, idx) => (
          <span
            key={idx}
            className={cn(
              "inline-flex items-center",
              color === 'white' 
                ? "text-slate-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" 
                : "text-slate-900 dark:text-slate-300 drop-shadow-sm"
            )}
            title={`${item.count}x ${item.type}`}
          >
            {Array.from({ length: item.count }).map((_, cIdx) => (
              <span key={cIdx} className="-mr-1">{item.symbol}</span>
            ))}
          </span>
        ))}
      </div>
      {scoreDiff && (
        <span className="text-[10px] sm:text-[11px] font-black font-mono px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-500 dark:text-amber-300 border border-amber-400/40 shrink-0">
          {scoreDiff}
        </span>
      )}
    </div>
  );
};

interface ChessBoardUIProps {
  mode: 'ai' | 'friend';
  difficulty?: number; // 1-5
  matchId?: string;
  opponentName?: string;
  isWhite?: boolean;
  timeLimit?: number; // in seconds, 0 = unlimited, default 300
  onMove?: (fen: string, move: string, whiteTime?: number, blackTime?: number) => void;
  onGameEnd?: (winner: 'white' | 'black' | 'draw') => void;
  tournamentContext?: {
    tournamentId: string;
    matchNodeId: string;
    roundName?: string;
  };
  isSpectator?: boolean;
  onBackToTournament?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onBackToLobby?: () => void;
}

export default function ChessBoardUI({
  mode,
  difficulty = 3,
  matchId,
  opponentName = 'Ellenfél',
  isWhite = true,
  timeLimit = 300,
  onMove,
  onGameEnd,
  tournamentContext,
  isSpectator = false,
  onBackToTournament,
  isFullscreen = false,
  onToggleFullscreen,
  onBackToLobby
}: ChessBoardUIProps) {
  const [game, setGame] = useState(new Chess());
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [moveFrom, setMoveFrom] = useState<string | null>(null);
  const [optionSquares, setOptionSquares] = useState<any>({});
  const [engine, setEngine] = useState<ChessAI | null>(null);

  // Premove states
  const [premove, setPremove] = useState<{ from: string; to: string; promotion?: string } | null>(null);
  const premoveRef = useRef<{ from: string; to: string; promotion?: string } | null>(null);
  const [premoveFrom, setPremoveFrom] = useState<string | null>(null);
  const [premoveOptionSquares, setPremoveOptionSquares] = useState<any>({});

  // Draw offer & Resign states
  const [matchData, setMatchData] = useState<ChessMatch | null>(null);
  const [isMyDrawOfferPending, setIsMyDrawOfferPending] = useState(false);
  const [customWinner, setCustomWinner] = useState<'white' | 'black' | 'draw' | null>(null);
  const [gameEndedReason, setGameEndedReason] = useState<string | null>(null);
  const [showResignConfirm, setShowResignConfirm] = useState(false);
  const [isGameOverDismissed, setIsGameOverDismissed] = useState(false);

  // Timer states
  const effectiveTimeLimit = matchData?.time_limit !== undefined ? matchData.time_limit : (timeLimit ?? 300);
  const isTimedGame = effectiveTimeLimit > 0;

  const [whiteTime, setWhiteTime] = useState<number>(() => timeLimit ?? 300);
  const [blackTime, setBlackTime] = useState<number>(() => timeLimit ?? 300);

  // Hint system
  const [showMathModal, setShowMathModal] = useState(false);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [hintSquares, setHintSquares] = useState<any>({});
  const hintEngineRef = useRef<ChessAI | null>(null);
  const movesEndRef = useRef<HTMLDivElement>(null);

  const orientation = isWhite ? 'white' : 'black';
  const myColor = isWhite ? 'w' : 'b';
  const isMyTurn = game.turn() === myColor;

  const setPremoveWithRef = useCallback((val: { from: string; to: string; promotion?: string } | null) => {
    premoveRef.current = val;
    setPremove(val);
    setPremoveFrom(null);
    setPremoveOptionSquares({});
  }, []);

  const clearPremove = useCallback(() => {
    premoveRef.current = null;
    setPremove(null);
    setPremoveFrom(null);
    setPremoveOptionSquares({});
  }, []);

  // Auto-scroll moves history to bottom on new move
  useEffect(() => {
    if (movesEndRef.current) {
      movesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [moveHistory]);

  // Initialize AI engine
  useEffect(() => {
    if (mode === 'ai') {
      const ai = new ChessAI();
      setEngine(ai);
      return () => ai.terminate();
    }
  }, [mode]);

  // Initialize a dedicated hint engine (works in both modes)
  useEffect(() => {
    const hintAI = new ChessAI();
    hintEngineRef.current = hintAI;
    return () => hintAI.terminate();
  }, []);

  // Clear hint highlight after 6 seconds
  useEffect(() => {
    if (Object.keys(hintSquares).length > 0) {
      const timer = setTimeout(() => setHintSquares({}), 6000);
      return () => clearTimeout(timer);
    }
  }, [hintSquares]);

  // When turn changes, clean up opponent/player selection leftovers
  useEffect(() => {
    if (isMyTurn) {
      setPremoveFrom(null);
      setPremoveOptionSquares({});
    } else {
      setMoveFrom(null);
      setOptionSquares({});
    }
  }, [isMyTurn]);

  const formatTime = (seconds: number): string => {
    if (seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Sync initial time in AI mode
  useEffect(() => {
    if (mode === 'ai' && typeof timeLimit === 'number') {
      setWhiteTime(timeLimit);
      setBlackTime(timeLimit);
    }
  }, [timeLimit, mode]);

  // Reactive Countdown Timer Effect
  useEffect(() => {
    if (!isTimedGame || game.isGameOver() || customWinner) return;
    if (mode === 'friend' && matchData?.status === 'waiting') return;

    const timer = setInterval(() => {
      const turn = game.turn();
      if (turn === 'w') {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            // White time expired!
            const blackCanMate = hasSufficientMatingMaterial(game, 'b');
            if (blackCanMate) {
              setCustomWinner('black');
              const reason = 'Világos ideje lejárt! Sötét győzött időtúllépéssel ⏱️🏆';
              setGameEndedReason(reason);
              if (mode === 'friend' && matchId) {
                ChessService.finishMatchOnTimeout(matchId, matchData?.black_id || 'black', reason);
              }
              if (onGameEnd) onGameEnd('black');
            } else {
              setCustomWinner('draw');
              const reason = 'Világos ideje lejárt, de Sötétnek nincs mattadáshoz elegendő figurája (Döntetlen 🤝)!';
              setGameEndedReason(reason);
              if (mode === 'friend' && matchId) {
                ChessService.finishMatchOnTimeout(matchId, 'draw', reason);
              }
              if (onGameEnd) onGameEnd('draw');
            }
            return 0;
          }
          return prev - 1;
        });
      } else {
        setBlackTime((prev) => {
          if (prev <= 1) {
            // Black time expired!
            const whiteCanMate = hasSufficientMatingMaterial(game, 'w');
            if (whiteCanMate) {
              setCustomWinner('white');
              const reason = 'Sötét ideje lejárt! Világos győzött időtúllépéssel ⏱️🏆';
              setGameEndedReason(reason);
              if (mode === 'friend' && matchId) {
                ChessService.finishMatchOnTimeout(matchId, matchData?.white_id || 'white', reason);
              }
              if (onGameEnd) onGameEnd('white');
            } else {
              setCustomWinner('draw');
              const reason = 'Sötét ideje lejárt, de Világosnak nincs mattadáshoz elegendő figurája (Döntetlen 🤝)!';
              setGameEndedReason(reason);
              if (mode === 'friend' && matchId) {
                ChessService.finishMatchOnTimeout(matchId, 'draw', reason);
              }
              if (onGameEnd) onGameEnd('draw');
            }
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimedGame, game, customWinner, mode, matchData, matchId, onGameEnd]);

  // Reactive Premove Execution Effect: runs as soon as it becomes my turn
  useEffect(() => {
    if (isMyTurn && !game.isGameOver() && !customWinner && premoveRef.current) {
      const queuedPremove = premoveRef.current;
      clearPremove();

      const nextGame = new Chess();
      try {
        nextGame.loadPgn(game.pgn());
      } catch (e) {
        nextGame.load(game.fen());
      }

      let result = null;
      try {
        result = nextGame.move(queuedPremove);
      } catch (e) {
        result = null;
      }

      if (result) {
        setGame(nextGame);
        setMoveHistory(nextGame.history());
        setLastMove({ from: result.from, to: result.to });
        setMoveFrom(null);
        setOptionSquares({});
        toast.success(`⚡ Premove végrehajtva: ${result.san}`);

        if (onMove) {
          onMove(nextGame.fen(), result.lan || result.san, whiteTime, blackTime);
        }
      } else {
        toast.info('A premove nem volt szabályos az új állásban.');
      }
    }
  }, [game, isMyTurn, customWinner, clearPremove, onMove, whiteTime, blackTime]);

  const handleHintRequest = () => {
    if (game.isGameOver() || customWinner) return;
    setShowMathModal(true);
  };

  const handleMathSuccess = async () => {
    setIsLoadingHint(true);
    try {
      const hintAI = hintEngineRef.current;
      if (!hintAI) return;
      const bestMove = await hintAI.getBestMove(game.fen(), 15);
      if (bestMove && bestMove.length >= 4) {
        const from = bestMove.substring(0, 2);
        const to = bestMove.substring(2, 4);
        setHintSquares({
          [from]: {
            background: 'radial-gradient(circle, rgba(16,185,129,0.55) 85%, transparent 85%)',
            border: '3px solid rgba(16,185,129,0.9)',
            borderRadius: '4px',
          },
          [to]: {
            background: 'radial-gradient(circle, rgba(16,185,129,0.35) 85%, transparent 85%)',
            border: '3px solid rgba(16,185,129,0.7)',
            borderRadius: '4px',
          },
        });
      }
    } catch (e) {
      console.error('Hint error:', e);
    } finally {
      setIsLoadingHint(false);
    }
  };

  // Load initial match state and subscribe to real-time updates for multiplayer
  useEffect(() => {
    if (matchId) {
      ChessService.getMatch(matchId).then((data) => {
        if (data) {
          setMatchData(data);
          if (typeof data.white_time_remaining === 'number') {
            setWhiteTime(data.white_time_remaining);
          }
          if (typeof data.black_time_remaining === 'number') {
            setBlackTime(data.black_time_remaining);
          }
          if (data.fen && data.fen !== 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
            const newGame = new Chess(data.fen);
            setGame(newGame);
            setMoveHistory(newGame.history());
            if (data.last_move && data.last_move.length >= 4) {
              setLastMove({
                from: data.last_move.substring(0, 2),
                to: data.last_move.substring(2, 4)
              });
            }
          }
        }
      }).catch((e) => console.warn('Failed to load initial match state', e));
    }

    if (mode === 'friend' && matchId) {
      const subscription = ChessService.subscribeToMatch(matchId, (payload) => {
        const data = payload.new as ChessMatch;
        setMatchData(data);

        // Synchronize timers from Firestore
        if (typeof data.white_time_remaining === 'number') {
          setWhiteTime(data.white_time_remaining);
        }
        if (typeof data.black_time_remaining === 'number') {
          setBlackTime(data.black_time_remaining);
        }

        // Check game end states from Firestore
        if (data.status === 'finished' && data.winner_id === 'draw') {
          setGameEndedReason(data.end_reason || 'Döntetlen megegyezéssel 🤝');
          setCustomWinner('draw');
          if (onGameEnd) onGameEnd('draw');
        } else if (data.status === 'finished' && data.winner_id) {
          const currentUid = auth.currentUser?.uid;
          const didIWin = data.winner_id === currentUid;
          const winnerColor = didIWin ? (isWhite ? 'white' : 'black') : (isWhite ? 'black' : 'white');
          setCustomWinner(winnerColor);
          setGameEndedReason(data.end_reason || (didIWin ? 'Győzelem! Az ellenfél feladta a játszmát.' : 'Az ellenfél győzött.'));
          if (onGameEnd) onGameEnd(winnerColor);
        }

        // Draw offer declined notification
        if (isMyDrawOfferPending && !data.draw_offered_by && data.status === 'active') {
          setIsMyDrawOfferPending(false);
          toast.info('Az ellenfél elutasította a döntetlen ajánlatot.');
        }

        const newFen = data.fen;
        const lastMoveStr = data.last_move;

        setGame((current) => {
          if (newFen === current.fen()) return current;
          const newGame = new Chess(newFen);
          setMoveHistory(newGame.history());
          
          if (lastMoveStr && lastMoveStr.length >= 4) {
            const from = lastMoveStr.substring(0, 2);
            const to = lastMoveStr.substring(2, 4);
            setLastMove({ from, to });
          } else {
            setLastMove(null);
          }
          
          setMoveFrom(null);
          setOptionSquares({});
          return newGame;
        });
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [mode, matchId, isWhite, isMyDrawOfferPending, onGameEnd]);

  // AI makes its move
  useEffect(() => {
    if (mode === 'ai' && game.turn() !== myColor && !game.isGameOver() && !customWinner) {
      let isCancelled = false;

      const makeAiMove = async () => {
        if (!engine) return;
        const depth = getDifficultyDepth(difficulty);
        const bestMove = await engine.getBestMove(game.fen(), depth);
        if (isCancelled || !bestMove) return;

        const update = new Chess();
        try {
          update.loadPgn(game.pgn());
        } catch (e) {
          update.load(game.fen());
        }

        try {
          let res = null;
          try {
            res = update.move(bestMove);
          } catch (moveErr) {
            if (bestMove && bestMove.length >= 4) {
              const from = bestMove.substring(0, 2);
              const to = bestMove.substring(2, 4);
              const promotion = bestMove.length === 5 ? bestMove[4] : 'q';
              res = update.move({ from, to, promotion });
            }
          }

          if (res) {
            setGame(update);
            setMoveHistory(update.history());
            setLastMove({ from: res.from, to: res.to });
            setMoveFrom(null);
            setOptionSquares({});

            if (onMove) {
              onMove(update.fen(), res.lan || res.san, whiteTime, blackTime);
            }

            if (update.isGameOver()) {
              if (update.isCheckmate()) {
                const aiColor = myColor === 'w' ? 'black' : 'white';
                setCustomWinner(aiColor);
                setGameEndedReason('Sakk-matt! A robot győzött.');
                if (onGameEnd) onGameEnd(aiColor);
              } else if (update.isDraw() || update.isStalemate()) {
                setCustomWinner('draw');
                setGameEndedReason(update.isStalemate() ? 'Patt (Döntetlen)!' : 'Döntetlen!');
                if (onGameEnd) onGameEnd('draw');
              }
            }
          }
        } catch (err) {
          console.error('AI move error', err);
        }
      };
      
      const timeout = setTimeout(makeAiMove, 450);
      return () => {
        isCancelled = true;
        clearTimeout(timeout);
      };
    }
  }, [game, mode, engine, myColor, difficulty, customWinner, onMove, onGameEnd, whiteTime, blackTime]);

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
    clearPremove();
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
      onMove(nextGame.fen(), result.lan || result.san, whiteTime, blackTime);
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
            ? "radial-gradient(circle, rgba(255,0,0,.18) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.15) 25%, transparent 25%)",
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

  function getPremoveOptions(square: string) {
    const piece = game.get(square as any);
    if (!piece || piece.color !== myColor) {
      setPremoveOptionSquares({});
      return false;
    }

    const [file, rankStr] = [square[0], square[1]];
    const rank = parseInt(rankStr, 10);
    const fileIdx = file.charCodeAt(0) - 97;
    const isPColorWhite = piece.color === 'w';
    const newSquares: any = {};

    const addSq = (fIdx: number, r: number) => {
      if (fIdx >= 0 && fIdx <= 7 && r >= 1 && r <= 8) {
        const sq = `${String.fromCharCode(97 + fIdx)}${r}`;
        if (sq !== square) {
          newSquares[sq] = {
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.45) 30%, transparent 30%)",
            borderRadius: "50%",
          };
        }
      }
    };

    if (piece.type === 'p') {
      const dir = isPColorWhite ? 1 : -1;
      addSq(fileIdx, rank + dir);
      addSq(fileIdx, rank + 2 * dir);
      addSq(fileIdx - 1, rank + dir);
      addSq(fileIdx + 1, rank + dir);
    } else if (piece.type === 'n') {
      const jumps = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]];
      jumps.forEach(([df, dr]) => addSq(fileIdx + df, rank + dr));
    } else if (piece.type === 'k') {
      for (let df = -1; df <= 1; df++) {
        for (let dr = -1; dr <= 1; dr++) {
          if (df !== 0 || dr !== 0) addSq(fileIdx + df, rank + dr);
        }
      }
      if (isPColorWhite && square === 'e1') {
        addSq(fileIdx + 2, 1);
        addSq(fileIdx - 2, 1);
      } else if (!isPColorWhite && square === 'e8') {
        addSq(fileIdx + 2, 8);
        addSq(fileIdx - 2, 8);
      }
    } else {
      const deltas: [number, number][] = [];
      if (piece.type === 'b' || piece.type === 'q') {
        deltas.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
      }
      if (piece.type === 'r' || piece.type === 'q') {
        deltas.push([1, 0], [-1, 0], [0, 1], [0, -1]);
      }
      deltas.forEach(([df, dr]) => {
        for (let step = 1; step <= 7; step++) {
          const nf = fileIdx + df * step;
          const nr = rank + dr * step;
          if (nf >= 0 && nf <= 7 && nr >= 1 && nr <= 8) {
            addSq(nf, nr);
          } else {
            break;
          }
        }
      });
    }

    newSquares[square] = {
      background: "rgba(168, 85, 247, 0.5)",
      border: "2px solid #a855f7",
      borderRadius: "8px",
    };
    setPremoveOptionSquares(newSquares);
    return true;
  }

  function onSquareClick(square: string) {
    if (isSpectator || game.isGameOver() || customWinner) return;

    if (!isMyTurn) {
      // --- PREMOVE INTERACTION ---
      if (!premoveFrom) {
        const piece = game.get(square as any);
        if (piece && piece.color === myColor) {
          setPremoveFrom(square);
          getPremoveOptions(square);
        }
        return;
      }

      // Clicking the same square cancels premove
      if (premoveFrom === square) {
        clearPremove();
        return;
      }

      // Clicking another of our own pieces changes selection
      const piece = game.get(square as any);
      if (piece && piece.color === myColor) {
        setPremoveFrom(square);
        getPremoveOptions(square);
        return;
      }

      // Target square selected for premove!
      const queuedMove = {
        from: premoveFrom,
        to: square,
        promotion: 'q',
      };
      setPremoveWithRef(queuedMove);
      toast.info(`⚡ Premove beállítva: ${premoveFrom.toUpperCase()} ➔ ${square.toUpperCase()}`, {
        duration: 2500,
      });
      return;
    }

    // --- NORMAL TURN INTERACTION ---
    if (premoveRef.current || premove || premoveFrom) {
      clearPremove();
    }

    if (!moveFrom) {
      const piece = game.get(square as any);
      if (piece && piece.color === game.turn()) {
        const hasMoves = getMoveOptions(square);
        if (hasMoves) setMoveFrom(square);
      }
      return;
    }

    // If clicking same piece, deselect
    if (moveFrom === square) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }

    const move = {
      from: moveFrom,
      to: square,
      promotion: "q",
    };

    const result = makeAMove(move);

    if (result === null) {
      const piece = game.get(square as any);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      } else {
        setMoveFrom(null);
        setOptionSquares({});
      }
    }
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    if (isSpectator || game.isGameOver() || customWinner) return false;

    if (!isMyTurn) {
      // Premove via drag and drop!
      const piece = game.get(sourceSquare as any);
      if (piece && piece.color === myColor && sourceSquare !== targetSquare) {
        const queuedMove = {
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q',
        };
        setPremoveWithRef(queuedMove);
        toast.info(`⚡ Premove beállítva: ${sourceSquare.toUpperCase()} ➔ ${targetSquare.toUpperCase()}`, {
          duration: 2500,
        });
      }
      return false; // Piece visually returns to current position until your turn
    }

    const result = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    return result !== null;
  }

  // Draw Offer Logic
  const handleOfferDraw = async () => {
    if (game.isGameOver() || customWinner) return;

    if (mode === 'ai') {
      if (moveHistory.length < 8) {
        toast.error("A Robot elutasította a döntetlent: 'Még túl korai a játszmában, játsszunk tovább!'");
        return;
      }

      const pieceValues: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
      let whiteScore = 0;
      let blackScore = 0;
      game.board().flat().forEach(p => {
        if (p) {
          if (p.color === 'w') whiteScore += pieceValues[p.type] || 0;
          else blackScore += pieceValues[p.type] || 0;
        }
      });

      const myScore = isWhite ? whiteScore : blackScore;
      const aiScore = isWhite ? blackScore : whiteScore;
      const diff = aiScore - myScore;

      if (diff >= 3) {
        toast.error("A Robot elutasította a döntetlen ajánlatot: úgy értékeli, hogy előnyben van!");
        return;
      }

      setCustomWinner('draw');
      setGameEndedReason('Döntetlen (Megegyezéssel a Robottal)');
      toast.success("A Robot elfogadta a döntetlen ajánlatot! 🤝");
      if (onGameEnd) onGameEnd('draw');
      return;
    }

    if (mode === 'friend' && matchId) {
      const user = auth.currentUser;
      if (!user) return;
      try {
        await ChessService.offerDraw(matchId, user.uid);
        setIsMyDrawOfferPending(true);
        toast.info('🤝 Döntetlen ajánlat elküldve az ellenfélnek...');
      } catch (e) {
        toast.error('Nem sikerült elküldeni a döntetlen ajánlatot.');
      }
    }
  };

  const handleRespondDraw = async (accept: boolean) => {
    if (mode === 'friend' && matchId) {
      try {
        await ChessService.respondDraw(matchId, accept);
        if (accept) {
          setCustomWinner('draw');
          setGameEndedReason('Döntetlen (Megegyezéssel)');
          toast.success('Döntetlen elfogadva! 🤝');
          if (onGameEnd) onGameEnd('draw');
        } else {
          toast.info('Döntetlen ajánlat elutasítva.');
        }
      } catch (e) {
        toast.error('Hiba történt a válasz elküldésekor.');
      }
    }
  };

  const handleResign = async () => {
    setShowResignConfirm(false);
    const opponentColor = isWhite ? 'black' : 'white';

    setCustomWinner(opponentColor);
    setGameEndedReason('Feladtad a játszmát.');

    if (mode === 'friend' && matchId && matchData) {
      const opponentUid = isWhite ? matchData.black_id : matchData.white_id;
      if (opponentUid) {
        try {
          await ChessService.resignMatch(matchId, opponentUid);
        } catch (e) {
          console.error('Failed to resign match', e);
        }
      }
    }

    if (onGameEnd) {
      onGameEnd(opponentColor);
    }
  };

  const getStatusMessage = () => {
    if (customWinner === 'draw') return 'Döntetlen!';
    if (customWinner) return 'Játék vége!';
    if (game.isCheck() && !game.isGameOver()) return 'Sakk!';
    if (game.isCheckmate()) return 'Sakk-matt!';
    if (game.isDraw()) return 'Döntetlen!';
    if (game.isStalemate()) return 'Patt!';
    return null;
  };

  const capturedInfo = useMemo(() => {
    const currentPieces: { w: Record<'p'|'n'|'b'|'r'|'q', number>; b: Record<'p'|'n'|'b'|'r'|'q', number> } = {
      w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
      b: { p: 0, n: 0, b: 0, r: 0, q: 0 }
    };

    const pieceValues: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9 };
    const pieceSymbolsWhite: Record<string, string> = { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕' };
    const pieceSymbolsBlack: Record<string, string> = { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛' };

    const board = game.board();
    for (const row of board) {
      for (const piece of row) {
        if (piece && piece.type !== 'k') {
          const t = piece.type as 'p'|'n'|'b'|'r'|'q';
          if (currentPieces[piece.color]?.[t] !== undefined) {
            currentPieces[piece.color][t]++;
          }
        }
      }
    }

    const initial: Record<'p'|'n'|'b'|'r'|'q', number> = { p: 8, n: 2, b: 2, r: 2, q: 1 };
    const order: Array<'q' | 'r' | 'b' | 'n' | 'p'> = ['q', 'r', 'b', 'n', 'p'];

    let whiteMaterialScore = 0;
    let blackMaterialScore = 0;

    // Pieces of Black captured by White
    const whiteCaptured: Array<{ type: string; symbol: string; count: number }> = [];
    for (const type of order) {
      const lostBlack = Math.max(0, initial[type] - currentPieces.b[type]);
      if (lostBlack > 0) {
        whiteCaptured.push({ type, symbol: pieceSymbolsBlack[type], count: lostBlack });
      }
      whiteMaterialScore += currentPieces.w[type] * pieceValues[type];
      blackMaterialScore += currentPieces.b[type] * pieceValues[type];
    }

    // Pieces of White captured by Black
    const blackCaptured: Array<{ type: string; symbol: string; count: number }> = [];
    for (const type of order) {
      const lostWhite = Math.max(0, initial[type] - currentPieces.w[type]);
      if (lostWhite > 0) {
        blackCaptured.push({ type, symbol: pieceSymbolsWhite[type], count: lostWhite });
      }
    }

    const scoreDiff = whiteMaterialScore - blackMaterialScore;

    return {
      whiteCaptured,
      blackCaptured,
      whiteScoreDiff: scoreDiff > 0 ? `+${scoreDiff}` : null,
      blackScoreDiff: scoreDiff < 0 ? `+${Math.abs(scoreDiff)}` : null,
    };
  }, [game]);

  const customSquareStyles = useMemo(() => {
    const styles: any = {};

    // 1. Highlight last move (from and to squares)
    if (lastMove) {
      styles[lastMove.from] = {
        background: "rgba(251, 191, 36, 0.45)",
      };
      styles[lastMove.to] = {
        background: "rgba(251, 191, 36, 0.7)",
        boxShadow: "inset 0 0 10px rgba(245, 158, 11, 0.8)",
      };
    }

    // 2. Highlight checked / checkmated king in vivid red
    if (game.isCheck() || game.isCheckmate()) {
      const turn = game.turn();
      const kingPiece = game.board().flat().find(p => p && p.type === 'k' && p.color === turn);
      if (kingPiece) {
        styles[kingPiece.square] = {
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.85) 0%, rgba(220, 38, 38, 0.4) 65%, transparent 100%)",
          boxShadow: "inset 0 0 14px 4px rgba(239, 68, 68, 0.9)",
          border: "2px solid #ef4444",
          borderRadius: "6px",
        };
      }
    }

    // 3. Move options (ONLY when it is my turn)
    if (isMyTurn) {
      Object.assign(styles, optionSquares);
    }

    // 4. Premove highlight (ONLY when it is NOT my turn)
    if (!isMyTurn) {
      if (premove) {
        styles[premove.from] = {
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.7) 70%, transparent 70%)",
          border: "3px solid #a855f7",
          borderRadius: "8px",
        };
        styles[premove.to] = {
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.5) 70%, transparent 70%)",
          border: "3px dashed #a855f7",
          borderRadius: "8px",
        };
      } else if (premoveFrom) {
        Object.assign(styles, premoveOptionSquares);
      }
    }

    // 5. Hint squares
    Object.assign(styles, hintSquares);

    return styles;
  }, [lastMove, game, isMyTurn, optionSquares, premove, premoveFrom, premoveOptionSquares, hintSquares]);

  const resetGame = () => {
    const g = new Chess();
    setGame(g);
    setMoveHistory([]);
    setLastMove(null);
    setMoveFrom(null);
    setOptionSquares({});
    clearPremove();
    setCustomWinner(null);
    setGameEndedReason(null);
    setIsMyDrawOfferPending(false);
    setIsGameOverDismissed(false);
    setWhiteTime(effectiveTimeLimit);
    setBlackTime(effectiveTimeLimit);
  };

  const undoMove = () => {
    if (mode === 'friend') return;
    safeGameMutate((g) => {
      g.undo();
      if (mode === 'ai') {
        g.undo();
      }
    });
  };

  const currentTurn = game.turn() === 'w' ? 'Világos' : 'Sötét';
  const isGameOver = game.isGameOver() || customWinner !== null;
  const currentUid = auth.currentUser?.uid;
  const hasIncomingDrawOffer = mode === 'friend' && !!matchData?.draw_offered_by && matchData.draw_offered_by !== currentUid && !isGameOver;

  const oppDisplayName = mode === 'ai' ? (opponentName && opponentName !== 'Ellenfél' ? opponentName : `Stockfish AI (${difficulty}. szint)`) : opponentName;
  const oppCaptured = isWhite ? capturedInfo.blackCaptured : capturedInfo.whiteCaptured;
  const oppScoreDiff = isWhite ? capturedInfo.blackScoreDiff : capturedInfo.whiteScoreDiff;
  const oppPieceColor = isWhite ? 'white' : 'black';

  const userCaptured = isWhite ? capturedInfo.whiteCaptured : capturedInfo.blackCaptured;
  const userScoreDiff = isWhite ? capturedInfo.whiteScoreDiff : capturedInfo.blackScoreDiff;
  const userPieceColor = isWhite ? 'black' : 'white';

  const isOppTurn = !isWhite ? game.turn() === 'w' : game.turn() === 'b';
  const isUserTurn = isWhite ? game.turn() === 'w' : game.turn() === 'b';

  const gameOverInfo = useMemo(() => {
    if (!isGameOver) return null;

    const isCheckmate = game.isCheckmate();
    const isDraw = customWinner === 'draw' || game.isDraw() || game.isStalemate();
    const turn = game.turn();
    const playerWon = isCheckmate 
      ? ((isWhite && turn === 'b') || (!isWhite && turn === 'w'))
      : customWinner 
        ? ((isWhite && customWinner === 'white') || (!isWhite && customWinner === 'black'))
        : false;

    let title = 'Játék vége';
    let subtitle = gameEndedReason || 'A mérkőzés befejeződött.';
    let badgeColor = 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40';
    let icon = <Flag className="w-4 h-4 text-indigo-400" />;

    if (isCheckmate) {
      title = playerWon ? 'Sakk-matt! Győztél! 🏆' : 'Sakk-matt!';
      subtitle = playerWon ? '🎉 Gratulálok, nyertél!' : (mode === 'ai' ? 'A robot nyert.' : 'Sakk-matt! Vége a játszmának.');
      badgeColor = playerWon ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      icon = playerWon ? <Trophy className="w-4 h-4 text-amber-400" /> : <Flag className="w-4 h-4 text-rose-400" />;
    } else if (isDraw) {
      title = 'Döntetlen!';
      subtitle = gameEndedReason || (game.isStalemate() ? 'Patt (Döntetlen)!' : 'Döntetlen állás.');
      badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      icon = <Handshake className="w-4 h-4 text-amber-400" />;
    } else if (customWinner) {
      title = playerWon ? 'Győzelem! 🏆' : 'Játszma vége';
      subtitle = gameEndedReason || (playerWon ? 'Az ellenfél feladta a játszmát.' : 'Feladtad a játszmát.');
      badgeColor = playerWon ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      icon = <Trophy className="w-4 h-4 text-amber-400" />;
    }

    return { title, subtitle, badgeColor, icon, playerWon, isCheckmate, isDraw };
  }, [isGameOver, game, customWinner, isWhite, gameEndedReason, mode]);

  const renderBoardGameOverPopup = () => {
    if (!isGameOver || !gameOverInfo || isGameOverDismissed) return null;

    const { subtitle, badgeColor, icon, playerWon, isDraw } = gameOverInfo;

    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center p-3 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
        <div className="pointer-events-auto bg-slate-950/92 dark:bg-slate-950/95 backdrop-blur-md border-2 border-slate-700/80 rounded-2xl p-3.5 sm:p-4 shadow-2xl max-w-[270px] w-full text-center text-white relative">
          {/* Close button [X] */}
          <button
            onClick={() => setIsGameOverDismissed(true)}
            className="absolute top-2.5 right-2.5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Bezárás (tábla megtekintése)"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badge & Icon */}
          <div className="flex justify-center mb-1.5">
            <div className={cn("p-2 rounded-xl border flex items-center justify-center shadow-inner", badgeColor)}>
              {icon}
            </div>
          </div>

          {/* Main Title: Győztél / Vesztettél / Döntetlen */}
          <h3 className={cn(
            "text-lg font-black tracking-tight mb-1",
            playerWon ? "text-emerald-400" : isDraw ? "text-amber-400" : "text-rose-400"
          )}>
            {playerWon ? 'GYŐZTÉL! 🏆' : isDraw ? 'DÖNTETLEN! 🤝' : 'VESZTETTÉL'}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-slate-300 font-medium mb-3 px-1 leading-snug">
            {subtitle}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-1.5">
            {onBackToTournament ? (
              <Button
                onClick={onBackToTournament}
                size="sm"
                className="w-full h-8 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md flex items-center justify-center gap-1.5"
              >
                <Trophy className="w-3.5 h-3.5" /> Vissza az Ágrajzhoz
              </Button>
            ) : (
              <Button
                onClick={resetGame}
                size="sm"
                className="w-full h-8 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-md flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Új játék indítása
              </Button>
            )}

            <button
              onClick={() => setIsGameOverDismissed(true)}
              className="w-full py-1 text-[11px] text-slate-400 hover:text-slate-200 hover:underline flex items-center justify-center gap-1 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> Tábla megtekintése (X)
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // FULLSCREEN MODE VIEW
  // ----------------------------------------------------
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 w-screen h-screen bg-[#07131f] text-slate-100 flex flex-col justify-between items-center p-2 sm:p-4 select-none overflow-hidden font-sans">
        {/* Top Minimal Action & Status Bar */}
        <div className="w-full max-w-2xl flex items-center justify-between px-2 py-1 z-20">
          <div className="flex items-center gap-2">
            {onBackToTournament ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackToTournament}
                className="h-8 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 font-bold text-xs shadow-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Ágrajz
              </Button>
            ) : onBackToLobby ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBackToLobby}
                className="h-8 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 font-bold text-xs shadow-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Kilépés
              </Button>
            ) : null}

            {tournamentContext?.roundName && (
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black">
                🏆 {tournamentContext.roundName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {!isSpectator && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleHintRequest}
                  disabled={isGameOver || isLoadingHint}
                  className={cn(
                    "h-8 px-2 rounded-xl text-xs font-bold border transition-all",
                    Object.keys(hintSquares).length > 0
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                      : "border-slate-700/60 bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                  )}
                  title="Legjobb lépés kérése (Matek kvíz)"
                >
                  {isLoadingHint ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Lightbulb className={cn("w-3.5 h-3.5", Object.keys(hintSquares).length > 0 && "fill-emerald-400 text-emerald-300")} />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleOfferDraw}
                  disabled={isGameOver || isMyDrawOfferPending}
                  className="h-8 px-2 rounded-xl border border-slate-700/60 bg-slate-800/80 text-amber-400 hover:bg-slate-700 text-xs font-bold"
                  title="Döntetlen felajánlása"
                >
                  <Handshake className="w-3.5 h-3.5" />
                </Button>

                {showResignConfirm ? (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      onClick={handleResign}
                      className="h-8 px-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl"
                    >
                      Feladom
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowResignConfirm(false)}
                      className="h-8 w-8 rounded-xl text-slate-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowResignConfirm(true)}
                    disabled={isGameOver}
                    className="h-8 px-2 rounded-xl border border-slate-700/60 bg-slate-800/80 text-rose-400 hover:bg-slate-700 text-xs font-bold"
                    title="Feladás"
                  >
                    <Flag className="w-3.5 h-3.5" />
                  </Button>
                )}
              </>
            )}

            {onToggleFullscreen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleFullscreen}
                className="h-8 px-2.5 rounded-xl border border-slate-700/60 bg-slate-800/80 text-slate-300 hover:bg-slate-700 font-bold text-xs"
                title="Kilépés a teljes képernyőből"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Center Chess Arena (scaled down by ~20% for comfortable view) */}
        <div className="w-[min(88vw,calc(68vh-40px))] max-w-[490px] flex flex-col justify-center items-center gap-1.5 my-auto">
          {/* Opponent Bar */}
          <div className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#0d1e2e]/90 rounded-xl border border-slate-700/60 shadow-md">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold shrink-0 border border-slate-700 text-slate-200">
                {isWhite ? '♚' : '♔'}
              </div>
              <div className="truncate">
                <div className="font-bold text-xs text-slate-100 truncate flex items-center gap-1.5">
                  <span>{oppDisplayName}</span>
                  {isGameOver && gameOverInfo && !gameOverInfo.playerWon && !gameOverInfo.isDraw && (
                    <span className="px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black">
                      🏆 Győztes
                    </span>
                  )}
                </div>
                <CapturedPiecesRow
                  captured={oppCaptured}
                  scoreDiff={oppScoreDiff}
                  color={oppPieceColor}
                />
              </div>
            </div>

            {/* Clock */}
            {isTimedGame ? (
              <div className={cn(
                "px-3 py-1 rounded-lg font-mono font-black text-sm tracking-wider flex items-center gap-1.5 border-2 shadow-inner transition-all",
                isOppTurn && !isGameOver
                  ? (isWhite ? blackTime : whiteTime) < 30
                    ? "bg-rose-950/80 text-rose-300 border-rose-500 animate-pulse ring-2 ring-rose-500/40"
                    : "bg-[#0b2b3f] text-cyan-300 border-cyan-400 ring-2 ring-cyan-400/30"
                  : "bg-[#081522] text-slate-400 border-slate-700"
              )}>
                <Clock className="w-3.5 h-3.5 opacity-80" />
                <span>{formatTime(isWhite ? blackTime : whiteTime)}</span>
              </div>
            ) : (
              <span className="text-[10px] text-slate-400 font-mono">♾️ Korlátlan</span>
            )}
          </div>

          {/* Board Container (100% visible, compact popup with [X] close) */}
          <div className="w-full aspect-square relative rounded-xl overflow-hidden shadow-2xl border-2 border-slate-800/80 bg-slate-900">
            <Chessboard
              position={game.fen()}
              onPieceDrop={onDrop}
              onSquareClick={onSquareClick}
              onSquareRightClick={() => {
                setMoveFrom(null);
                setOptionSquares({});
                clearPremove();
              }}
              boardOrientation={orientation}
              customSquareStyles={customSquareStyles}
              customBoardStyle={{
                borderRadius: '0.75rem',
              }}
              customDarkSquareStyle={{ backgroundColor: '#b58863' }}
              customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
            />

            {/* Compact Non-intrusive Game Over Popup with [X] Close */}
            {renderBoardGameOverPopup()}
          </div>

          {/* User Bar */}
          <div className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#0d1e2e]/90 rounded-xl border border-slate-700/60 shadow-md">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-7 h-7 rounded-lg bg-indigo-950 flex items-center justify-center text-sm font-bold shrink-0 border border-indigo-700 text-indigo-300">
                {isWhite ? '♔' : '♚'}
              </div>
              <div className="truncate">
                <div className="font-bold text-xs text-slate-100 truncate flex items-center gap-1.5">
                  <span>Te ({isWhite ? 'Világos' : 'Sötét'})</span>
                  {isGameOver && gameOverInfo && gameOverInfo.playerWon && (
                    <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black">
                      🏆 Győztes
                    </span>
                  )}
                </div>
                <CapturedPiecesRow
                  captured={userCaptured}
                  scoreDiff={userScoreDiff}
                  color={userPieceColor}
                />
              </div>
            </div>

            {/* Clock */}
            {isTimedGame ? (
              <div className={cn(
                "px-3 py-1 rounded-lg font-mono font-black text-sm tracking-wider flex items-center gap-1.5 border-2 shadow-inner transition-all",
                isUserTurn && !isGameOver
                  ? (isWhite ? whiteTime : blackTime) < 30
                    ? "bg-rose-950/80 text-rose-300 border-rose-500 animate-pulse ring-2 ring-rose-500/40"
                    : "bg-[#0b2b3f] text-cyan-300 border-cyan-400 ring-2 ring-cyan-400/30"
                  : "bg-[#081522] text-slate-400 border-slate-700"
              )}>
                <Clock className="w-3.5 h-3.5 opacity-80" />
                <span>{formatTime(isWhite ? whiteTime : blackTime)}</span>
              </div>
            ) : (
              <span className="text-[10px] text-slate-400 font-mono">♾️ Korlátlan</span>
            )}
          </div>
        </div>

        {/* Bottom Turn / Status / Game Over Control Strip */}
        <div className="w-full max-w-2xl min-h-[42px] flex items-center justify-center px-2 pb-1 z-20">
          {isGameOver && gameOverInfo ? (
            <div className="w-full max-w-xl bg-slate-900/95 border-2 border-slate-700/80 rounded-2xl py-1.5 px-3 shadow-2xl flex items-center justify-between gap-2 text-white animate-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center gap-2 min-w-0">
                <div className={cn("p-1.5 rounded-xl border flex items-center justify-center shrink-0", gameOverInfo.badgeColor)}>
                  {gameOverInfo.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-black text-xs sm:text-sm tracking-wide text-white truncate flex items-center gap-2">
                    <span>{gameOverInfo.title}</span>
                    <span className="text-[11px] font-semibold text-slate-300 opacity-90 truncate hidden sm:inline">
                      • {gameOverInfo.subtitle}
                    </span>
                  </div>
                  <div className="text-[10px] font-medium text-slate-300 truncate sm:hidden">
                    {gameOverInfo.subtitle}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {isGameOverDismissed && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsGameOverDismissed(false)}
                    className="h-8 px-2 text-[11px] font-bold text-slate-300 hover:text-white rounded-xl"
                    title="Eredmény ablak megjelenítése"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Eredmény
                  </Button>
                )}
                {onBackToTournament ? (
                  <Button
                    size="sm"
                    onClick={onBackToTournament}
                    className="h-8 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1"
                  >
                    <Trophy className="w-3.5 h-3.5" /> Ágrajz
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={resetGame}
                    className="h-8 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Új játék
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 select-none">
              <div className={cn(
                "w-2.5 h-2.5 rounded-full animate-pulse",
                game.turn() === 'w' ? "bg-amber-100 shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-slate-700 shadow-[0_0_8px_rgba(0,0,0,0.8)]"
              )} />
              <span>{currentTurn} következik {isMyTurn ? '(Te lépsz)' : '(Ellenfél köre)'}</span>
              {getStatusMessage() && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-300 border border-rose-500/50 animate-bounce">
                  {getStatusMessage()}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Math Modal */}
        <MathChallengeModal
          isOpen={showMathModal}
          onClose={() => setShowMathModal(false)}
          onSuccess={handleMathSuccess}
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // WINDOWED MODE VIEW
  // ----------------------------------------------------
  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full max-w-6xl mx-auto items-start justify-center">
      {/* Board Column */}
      <div className="flex-1 w-full flex flex-col items-center justify-start self-start space-y-3">
        {/* Spectator Alert Banner */}
        {isSpectator && (
          <div className="w-full max-w-[min(100%,75vh)] p-3 px-4 rounded-2xl bg-gradient-to-r from-purple-500/20 via-indigo-500/15 to-purple-500/20 border-2 border-purple-500/40 shadow-md flex items-center justify-between gap-3 animate-in fade-in duration-200 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-purple-600 text-white rounded-xl shadow-xs">
                <Eye className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-black text-purple-900 dark:text-purple-200">
                  Élő Nézői Mód (Közvetítés)
                </div>
                <div className="text-[11px] text-purple-700 dark:text-purple-300/80">
                  {tournamentContext?.roundName ? `${tournamentContext.roundName} • ` : ''}Csak megtekintés (lépések élőben követhetők)
                </div>
              </div>
            </div>

            {onBackToTournament && (
              <Button
                size="sm"
                onClick={onBackToTournament}
                className="h-8 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Ágrajz
              </Button>
            )}
          </div>
        )}

        {/* Incoming Draw Offer Alert Banner */}
        {hasIncomingDrawOffer && (
          <div className="w-full max-w-[min(100%,75vh)] p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-2 border-amber-500/50 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
                <Handshake className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black text-amber-900 dark:text-amber-200">
                  Döntetlen ajánlat érkezett!
                </div>
                <div className="text-[11px] text-amber-700 dark:text-amber-300/80">
                  <strong>{oppDisplayName}</strong> döntetlent ajánlott fel.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Button 
                size="sm" 
                onClick={() => handleRespondDraw(true)}
                className="h-8 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Elfogadom
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleRespondDraw(false)}
                className="h-8 px-3 rounded-xl border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold text-xs"
              >
                <X className="w-3.5 h-3.5 mr-1" /> Elutasítom
              </Button>
            </div>
          </div>
        )}

        <Card className="w-full max-w-[min(100%,75vh)] p-3 md:p-4 rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 overflow-hidden relative transition-all duration-300">
          {/* Opponent Top Mini Bar */}
          <div className="w-full flex items-center justify-between pb-2.5 px-1 border-b border-slate-100 dark:border-slate-800 mb-2">
            <div className="flex items-center gap-2 truncate">
              <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold shrink-0 shadow-xs">
                {isWhite ? '♚' : '♔'}
              </div>
              <div className="truncate">
                <div className="font-bold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <span className="truncate">{oppDisplayName}</span>
                  {isGameOver && gameOverInfo && !gameOverInfo.playerWon && !gameOverInfo.isDraw && (
                    <span className="px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 text-[10px] font-black shrink-0">
                      🏆 Győztes
                    </span>
                  )}
                </div>
                <CapturedPiecesRow
                  captured={oppCaptured}
                  scoreDiff={oppScoreDiff}
                  color={oppPieceColor}
                />
              </div>
            </div>

            {/* Opponent Clock */}
            {isTimedGame ? (
              <div className={cn(
                "px-2.5 py-1 rounded-xl font-mono font-black text-xs md:text-sm flex items-center gap-1.5 transition-all border shadow-xs",
                isOppTurn && !isGameOver
                  ? (isWhite ? blackTime : whiteTime) < 30
                    ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500 animate-pulse ring-2 ring-rose-500/30"
                    : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500 ring-2 ring-emerald-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              )}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(isWhite ? blackTime : whiteTime)}</span>
              </div>
            ) : (
              <span className="text-[10px] text-slate-400 font-mono">♾️ Korlátlan</span>
            )}
          </div>

          <div className="aspect-square relative mx-auto w-full">
            <Chessboard 
              position={game.fen()} 
              onPieceDrop={onDrop} 
              onSquareClick={onSquareClick}
              onSquareRightClick={() => {
                setMoveFrom(null);
                setOptionSquares({});
                clearPremove();
              }}
              boardOrientation={orientation}
              customSquareStyles={customSquareStyles}
              customBoardStyle={{
                borderRadius: '1rem',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
              }}
              customDarkSquareStyle={{ backgroundColor: '#b58863' }}
              customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
            />

            {/* Compact Non-intrusive Game Over Popup with [X] Close */}
            {renderBoardGameOverPopup()}
          </div>

          {/* User Bottom Mini Bar */}
          <div className="w-full flex items-center justify-between pt-2.5 px-1 border-t border-slate-100 dark:border-slate-800 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-indigo-400 shadow-xs">
                {isWhite ? '♔' : '♚'}
              </div>
              <div>
                <div className="font-bold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <span className="truncate">Te ({isWhite ? 'Világos' : 'Sötét'})</span>
                  {isGameOver && gameOverInfo && gameOverInfo.playerWon && (
                    <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 text-[10px] font-black shrink-0">
                      🏆 Győztes
                    </span>
                  )}
                </div>
                <CapturedPiecesRow
                  captured={userCaptured}
                  scoreDiff={userScoreDiff}
                  color={userPieceColor}
                />
              </div>
            </div>

            {/* User Clock */}
            {isTimedGame ? (
              <div className={cn(
                "px-2.5 py-1 rounded-xl font-mono font-black text-xs md:text-sm flex items-center gap-1.5 transition-all border shadow-xs",
                isUserTurn && !isGameOver
                  ? (isWhite ? whiteTime : blackTime) < 30
                    ? "bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500 animate-pulse ring-2 ring-rose-500/30"
                    : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500 ring-2 ring-emerald-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              )}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(isWhite ? whiteTime : blackTime)}</span>
              </div>
            ) : (
              <span className="text-[10px] text-slate-400 font-mono">♾️ Korlátlan</span>
            )}
          </div>
          
          {/* Bottom Turn / Status / Game Over Control Strip */}
          {isGameOver && gameOverInfo ? (
            <div className="mt-3 w-full p-2.5 px-3.5 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white border-2 border-slate-700/80 shadow-lg flex items-center justify-between gap-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={cn("p-1.5 rounded-xl border flex items-center justify-center shrink-0", gameOverInfo.badgeColor)}>
                  {gameOverInfo.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-black text-xs sm:text-sm tracking-wide truncate">
                    {gameOverInfo.title}
                  </div>
                  <div className="text-[11px] text-slate-300 truncate">
                    {gameOverInfo.subtitle}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isGameOverDismissed && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsGameOverDismissed(false)}
                    className="h-8 px-2 text-[11px] font-bold text-slate-300 hover:text-white rounded-xl"
                    title="Eredmény ablak megjelenítése"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Eredmény
                  </Button>
                )}
                {onBackToTournament ? (
                  <Button
                    size="sm"
                    onClick={onBackToTournament}
                    className="h-8 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                  >
                    <Trophy className="w-3.5 h-3.5" /> Ágrajz
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={resetGame}
                    className="h-8 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Új játék indítása
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-2.5 flex justify-between items-center px-2 min-h-[32px]">
              <div className="flex items-center gap-2.5">
                <div className={cn(
                  "w-3 h-3 rounded-full animate-pulse",
                  game.turn() === 'w' ? "bg-white border border-slate-300" : "bg-slate-900"
                )} />
                <span className="font-bold text-slate-600 dark:text-slate-400 text-xs md:text-sm">
                  {currentTurn} következik {isMyTurn ? '(Te lépsz)' : '(Ellenfél köre)'}
                </span>
              </div>
              {getStatusMessage() && (
                <div className="px-3 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full font-bold text-xs animate-bounce">
                  {getStatusMessage()}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Info & Controls Column */}
      <div className="w-full lg:w-80 flex flex-col gap-3.5 self-start">
        {/* Players Card */}
        <Card className="p-3.5 rounded-2xl border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <User size={16} />
                </div>
                <div>
                  <span className="font-bold text-xs block text-slate-800 dark:text-slate-100">Te ({isWhite ? 'Világos ♔' : 'Sötét ♚'})</span>
                  <span className="text-[10px] text-slate-400">{isMyTurn ? 'Soron vagy' : 'Várakozás'}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {isTimedGame && (
                  <span className="text-xs font-mono font-black text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    {formatTime(isWhite ? whiteTime : blackTime)}
                  </span>
                )}
                {isMyTurn && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold animate-pulse">
                    Te lépsz!
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5 truncate mr-2">
                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400 shrink-0">
                  {mode === 'ai' ? <Cpu size={16} /> : <User size={16} />}
                </div>
                <div className="truncate">
                  <span className="font-bold text-xs block text-slate-800 dark:text-slate-100 truncate">
                    {oppDisplayName} ({isWhite ? 'Sötét ♚' : 'Világos ♔'})
                  </span>
                  <span className="text-[10px] text-slate-400">{!isMyTurn ? 'Gondolkodik...' : 'Várakozik'}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {isTimedGame && (
                  <span className="text-xs font-mono font-black text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                    {formatTime(isWhite ? blackTime : whiteTime)}
                  </span>
                )}
                {!isMyTurn && !isGameOver && (
                  <span className="text-[10px] bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                    Lépésben...
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Moves & Actions Card */}
        <Card className="p-3.5 rounded-2xl border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-900 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest px-1">
            <History size={14} />
            <span>Lépések előzménye</span>
            {moveHistory.length > 0 && (
              <span className="ml-auto text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold text-slate-500">
                {Math.ceil(moveHistory.length / 2)}. lépés
              </span>
            )}
          </div>
          
          <div className="h-36 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-2.5 overflow-y-auto border border-slate-100 dark:border-slate-800 font-mono text-xs scroll-smooth">
            {moveHistory.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500 italic text-center text-xs">
                Még nincs rögzített lépés
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                  <div key={i} className="contents">
                    <div className="text-slate-400 text-right pr-1">{i + 1}.</div>
                    <div className="flex gap-2">
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {moveHistory[i * 2]}
                      </span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {moveHistory[i * 2 + 1] || ''}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={movesEndRef} />
              </div>
            )}
          </div>
          
          {/* Action Toolbar: Draw, Resign, Undo, Hint */}
          {isSpectator ? (
            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 text-center space-y-2">
              <div className="text-xs font-bold text-purple-800 dark:text-purple-300 flex items-center justify-center gap-1.5">
                <Eye className="w-4 h-4" /> Nézőként vagy jelen
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                A játszma lépéseit és óráját élőben követheted.
              </p>
              {onBackToTournament && (
                <Button
                  onClick={onBackToTournament}
                  className="w-full h-8 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Vissza az Ágrajzhoz
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleOfferDraw} 
                  disabled={isGameOver || isMyDrawOfferPending}
                  className="rounded-xl border-slate-200 dark:border-slate-700 text-xs h-8 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 font-bold"
                  title="Döntetlen felajánlása az ellenfélnek"
                >
                  <Handshake size={13} className="mr-1.5 text-amber-500" />
                  {isMyDrawOfferPending ? 'Ajánlat elküldve...' : 'Döntetlen kérés'}
                </Button>

                {showResignConfirm ? (
                  <div className="flex items-center gap-1">
                    <Button 
                      size="sm"
                      onClick={handleResign}
                      className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] h-8 rounded-xl px-1"
                    >
                      Biztos feladod?
                    </Button>
                    <Button 
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowResignConfirm(false)}
                      className="h-8 w-8 rounded-xl text-slate-400"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowResignConfirm(true)} 
                    disabled={isGameOver}
                    className="rounded-xl border-slate-200 dark:border-slate-700 text-xs h-8 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-bold"
                    title="Játszma feladása"
                  >
                    <Flag size={13} className="mr-1.5 text-rose-500" />
                    Feladás
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  onClick={undoMove} 
                  disabled={moveHistory.length === 0 || isGameOver || mode === 'friend'}
                  className="rounded-xl border-slate-200 dark:border-slate-700 text-xs h-8"
                >
                  <RotateCcw size={13} className="mr-1.5" />
                  Visszavonás
                </Button>

                <Button 
                  variant="outline" 
                  onClick={resetGame}
                  className="rounded-xl border-slate-200 dark:border-slate-700 text-xs h-8 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Új játék
                </Button>
              </div>

              {/* Hint Button */}
              <Button
                variant="outline"
                onClick={handleHintRequest}
                disabled={isGameOver || isLoadingHint}
                className={cn(
                  "w-full rounded-xl border-2 h-9 font-bold text-xs transition-all",
                  Object.keys(hintSquares).length > 0
                    ? "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100"
                    : "border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
                )}
              >
                {isLoadingHint ? (
                  <><Loader2 size={13} className="mr-1.5 animate-spin" />Számolom...</>
                ) : Object.keys(hintSquares).length > 0 ? (
                  <><Lightbulb size={13} className="mr-1.5 fill-emerald-500 text-emerald-600" />Tipp aktív a táblán!</>
                ) : (
                  <><Lightbulb size={13} className="mr-1.5" />Legjobb lépés kérése (Matek kvíz)</>
                )}
              </Button>
            </div>
          )}
        </Card>

        {/* Premove & Chess Tip Card */}
        <Card className="p-3.5 rounded-2xl border-slate-200 dark:border-slate-800 shadow-md bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white overflow-hidden relative">
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Premove & Tipp</span>
            </div>
            <p className="text-xs text-slate-200 leading-snug">
              Ellenfél köre alatt kattints egy bábudra és célmezőre (vagy húzd rá) a <strong>premove</strong> beállításához, ami azonnal lefut az ellenfél lépése után!
            </p>
          </div>
        </Card>
      </div>

      {/* Math Challenge Modal */}
      <MathChallengeModal
        isOpen={showMathModal}
        onClose={() => setShowMathModal(false)}
        onSuccess={handleMathSuccess}
      />
    </div>
  );
}
