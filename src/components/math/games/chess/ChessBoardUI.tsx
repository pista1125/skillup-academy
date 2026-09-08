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
  Check
} from 'lucide-react';
import { ChessService, ChessMatch } from '@/lib/chess/ChessService';
import { auth } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import MathChallengeModal from './MathChallengeModal';

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
  opponentName = 'Ellenfél',
  isWhite = true,
  onMove,
  onGameEnd
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
          onMove(nextGame.fen(), result.lan || result.san);
        }
      } else {
        toast.info('A premove nem volt szabályos az új állásban.');
      }
    }
  }, [game, isMyTurn, customWinner, clearPremove, onMove]);

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

  // Subscribe to real-time updates for multiplayer
  useEffect(() => {
    if (mode === 'friend' && matchId) {
      const subscription = ChessService.subscribeToMatch(matchId, (payload) => {
        const data = payload.new as ChessMatch;
        setMatchData(data);

        // Check game end states from Firestore
        if (data.status === 'finished' && data.winner_id === 'draw') {
          setGameEndedReason('Döntetlen megegyezéssel 🤝');
          setCustomWinner('draw');
          if (onGameEnd) onGameEnd('draw');
        } else if (data.status === 'finished' && data.winner_id) {
          const currentUid = auth.currentUser?.uid;
          const didIWin = data.winner_id === currentUid;
          const winnerColor = didIWin ? (isWhite ? 'white' : 'black') : (isWhite ? 'black' : 'white');
          setCustomWinner(winnerColor);
          setGameEndedReason(didIWin ? 'Győzelem! Az ellenfél feladta a játszmát.' : 'Az ellenfél győzött.');
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
          const res = update.move(bestMove);
          if (res) {
            setGame(update);
            setMoveHistory(update.history());
            setLastMove({ from: res.from, to: res.to });
            setMoveFrom(null);
            setOptionSquares({});
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
  }, [game, mode, engine, myColor, difficulty, customWinner]);

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
    if (game.isGameOver() || customWinner) return;

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
    if (game.isGameOver() || customWinner) return false;

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

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setMoveHistory([]);
    setLastMove(null);
    setCustomWinner(null);
    setGameEndedReason(null);
    clearPremove();
    setMoveFrom(null);
    setOptionSquares({});
  };

  const undoMove = () => {
    if (customWinner) return;
    safeGameMutate((game) => {
      game.undo();
      if (mode === 'ai') game.undo();
    });
  };

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

  const customSquareStyles = useMemo(() => {
    const styles: any = {};

    // 1. Highlight last move (from and to squares)
    if (lastMove) {
      styles[lastMove.from] = {
        background: "rgba(251, 191, 36, 0.35)",
      };
      styles[lastMove.to] = {
        background: "rgba(251, 191, 36, 0.35)",
      };
    }

    // 2. Highlight checked king in red
    if (game.isCheck()) {
      const turn = game.turn();
      const kingPiece = game.board().flat().find(p => p && p.type === 'k' && p.color === turn);
      if (kingPiece) {
        styles[kingPiece.square] = {
          background: "rgba(239, 68, 68, 0.4)",
          border: "2px solid #ef4444",
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
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.65) 80%, transparent 80%)",
          border: "3px solid #9333ea",
          borderRadius: "6px",
        };
        styles[premove.to] = {
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.45) 80%, transparent 80%)",
          border: "3px dashed #9333ea",
          borderRadius: "6px",
        };
      } else if (premoveFrom) {
        Object.assign(styles, premoveOptionSquares);
      }
    }

    // 5. Hint squares
    Object.assign(styles, hintSquares);

    return styles;
  }, [lastMove, game, isMyTurn, optionSquares, premove, premoveFrom, premoveOptionSquares, hintSquares]);

  const currentTurn = game.turn() === 'w' ? 'Világos' : 'Sötét';
  const isGameOver = game.isGameOver() || customWinner !== null;
  const currentUid = auth.currentUser?.uid;
  const hasIncomingDrawOffer = mode === 'friend' && !!matchData?.draw_offered_by && matchData.draw_offered_by !== currentUid && !isGameOver;

  return (
    <div className="flex flex-col lg:flex-row gap-5 w-full max-w-6xl mx-auto items-start justify-center">
      {/* Board Column */}
      <div className="flex-1 w-full flex flex-col items-center justify-start self-start space-y-3">
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
                  <strong>{opponentName}</strong> döntetlent ajánlott fel.
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

        {/* Premove Active Floating Pill */}
        {premove && !isGameOver && !isMyTurn && (
          <div className="w-full max-w-[min(100%,75vh)] px-3.5 py-2 rounded-xl bg-purple-500/10 dark:bg-purple-950/40 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 fill-purple-500 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span>
                Premove aktív: <span className="font-mono bg-purple-200/60 dark:bg-purple-900/60 px-1.5 py-0.5 rounded text-purple-900 dark:text-purple-100">{premove.from.toUpperCase()} ➔ {premove.to.toUpperCase()}</span> (Azonnal lefut ellenfél lépésekor)
              </span>
            </div>
            <button 
              onClick={clearPremove}
              className="p-1 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/60 text-purple-600 dark:text-purple-300 transition-colors"
              title="Premove törlése"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <Card className="w-full max-w-[min(100%,75vh)] p-3 md:p-4 rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 overflow-hidden relative transition-all duration-300">
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
              customDarkSquareStyle={{ backgroundColor: '#475569' }}
              customLightSquareStyle={{ backgroundColor: '#94a3b8' }}
            />

            {/* Game Over Centered Overlay */}
            {isGameOver && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md rounded-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className={cn(
                  "bg-white dark:bg-slate-900 border-2 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl",
                  game.isCheckmate() ? "border-rose-500" : customWinner === 'draw' || game.isDraw() ? "border-amber-500" : "border-indigo-500"
                )}>
                  {game.isCheckmate() ? (
                    <>
                      <div className="w-14 h-14 bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce border-2 border-rose-500">
                        <Trophy className="w-7 h-7" />
                      </div>
                      
                      <h2 className="text-2xl font-black text-rose-600 dark:text-rose-500 mb-1 uppercase tracking-wide">
                        Sakk-matt!
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-bold mb-3">
                        Sakk-matt és vége a játéknak.
                      </p>
                      
                      <p className="text-lg font-extrabold text-slate-800 dark:text-white mb-5">
                        {(() => {
                          const turn = game.turn();
                          const playerWon = (isWhite && turn === 'b') || (!isWhite && turn === 'w');
                          return playerWon ? '🎉 Gratulálok, győztél!' : 'Sakk-matt! Vége a játszmának.';
                        })()}
                      </p>
                    </>
                  ) : customWinner === 'draw' || game.isDraw() || game.isStalemate() ? (
                    <>
                      <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-amber-500">
                        <Handshake className="w-7 h-7" />
                      </div>
                      
                      <h2 className="text-2xl font-black text-amber-600 dark:text-amber-400 mb-1 uppercase tracking-wide">
                        Döntetlen!
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 text-sm font-bold mb-5">
                        {gameEndedReason || (game.isStalemate() ? 'Patt (Döntetlen)!' : 'Megegyezéses döntetlen.')}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-indigo-500">
                        <Flag className="w-7 h-7" />
                      </div>
                      
                      <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-1 uppercase tracking-wide">
                        Játék vége
                      </h2>
                      <p className="text-slate-600 dark:text-slate-300 text-sm font-bold mb-5">
                        {gameEndedReason || 'A mérkőzés befejeződött.'}
                      </p>
                    </>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                      onClick={resetGame}
                      className={cn(
                        "w-full text-white font-bold rounded-xl py-2.5 shadow-md transition-all text-sm",
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
          
          <div className="mt-3 flex justify-between items-center px-2 min-h-[32px]">
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
              {isMyTurn && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold animate-pulse">
                  Te lépsz!
                </span>
              )}
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                  {mode === 'ai' ? <Cpu size={16} /> : <User size={16} />}
                </div>
                <div>
                  <span className="font-bold text-xs block text-slate-800 dark:text-slate-100">
                    {mode === 'ai' ? `Robot (${difficulty}. szint)` : opponentName} ({isWhite ? 'Sötét ♚' : 'Világos ♔'})
                  </span>
                  <span className="text-[10px] text-slate-400">{!isMyTurn ? 'Gondolkodik...' : 'Várakozik'}</span>
                </div>
              </div>
              {!isMyTurn && !isGameOver && (
                <span className="text-[10px] bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                  Lépésben...
                </span>
              )}
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
                disabled={moveHistory.length === 0 || isGameOver}
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
