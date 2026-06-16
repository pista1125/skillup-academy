import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Target, 
  Shield, 
  Sword, 
  Volume2,
  VolumeX,
  Crosshair,
  Zap,
  Waves,
  Trophy,
  History,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TorpedoService, TorpedoMatch } from '@/lib/torpedo/TorpedoService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface TorpedoCombatProps {
  match: TorpedoMatch;
  userId: string;
  onBack: () => void;
}

const COLS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const ROWS = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
const LETTERS = ['-E', '-D', '-C', '-B', '-A', 'O', 'A', 'B', 'C', 'D', 'E'];

const getShipLineCoordinates = (ship: any) => {
  const xs = ship.cells.map((c: any) => c.x);
  const ys = ship.cells.map((c: any) => c.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const startColIdx = COLS.indexOf(minX);
  const endColIdx = COLS.indexOf(maxX);
  const startRowIdx = ROWS.indexOf(maxY);
  const endRowIdx = ROWS.indexOf(minY);

  return {
    left: `${(startColIdx / 10) * 100}%`,
    top: `${(startRowIdx / 10) * 100}%`,
    width: `${((endColIdx - startColIdx) / 10) * 100}%`,
    height: `${((endRowIdx - startRowIdx) / 10) * 100}%`
  };
};

export default function TorpedoCombat({ match: initialMatch, userId, onBack }: TorpedoCombatProps) {
  const [match, setMatch] = useState<TorpedoMatch>(initialMatch);
  const [coordInput, setCoordInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'enemy' | 'own'>('enemy');
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isP1 = match.p1_id === userId;
  const myShips = isP1 ? match.p1_ships : match.p2_ships;
  const opponentShips = isP1 ? match.p2_ships : match.p1_ships;
  const myMoves = isP1 ? match.p1_moves : match.p2_moves;
  const opponentMoves = isP1 ? match.p2_moves : match.p1_moves;
  const isMyTurn = match.turn_id === userId && match.status === 'playing';

  useEffect(() => {
    if (match.settings?.is_local) return;
    const channel = TorpedoService.subscribeToMatch(match.id, (payload) => {
      const updated = payload.new as TorpedoMatch;
      
      setMatch(prev => {
        const oldMoves = isP1 ? prev.p2_moves : prev.p1_moves;
        const newMoves = isP1 ? updated.p2_moves : updated.p1_moves;
        if (newMoves.length > oldMoves.length) {
          const lastMove = newMoves[newMoves.length - 1];
          playSound(lastMove.hit ? 'hit' : 'miss');
        }

        return {
          ...prev,
          ...updated,
          p1_profile: prev.p1_profile,
          p2_profile: prev.p2_profile
        };
      });
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [match.id, isP1]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [myMoves, opponentMoves]);

  // Bot Turn Logic
  useEffect(() => {
    if (!match.settings?.is_local || match.status !== 'playing' || match.turn_id !== 'computer') {
      return;
    }

    let isSubscribed = true;

    const botTurn = async () => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      if (!isSubscribed) return;

      try {
        const { getBotNextMove } = await import('@/lib/torpedo/botHelpers');
        
        const botMoveCoords = getBotNextMove(
          match.settings.difficulty || 'medium',
          match.p1_ships,
          match.p2_moves
        );

        playSound('shoot');

        const hit = myShips.some((ship: any) => 
          ship.cells.some((cell: any) => cell.x === botMoveCoords.x && cell.y === botMoveCoords.y)
        );

        const newMove = {
          x: botMoveCoords.x,
          y: botMoveCoords.y,
          hit,
          timestamp: new Date().toISOString()
        };

        const updatedP2Moves = [...match.p2_moves, newMove];

        const totalShipCells = myShips.reduce((acc: number, ship: any) => acc + ship.cells.length, 0);
        const totalHits = updatedP2Moves.filter((m: any) => m.hit).length;
        const botWon = totalHits === totalShipCells;

        let coordLabel = '';
        if (match.settings.axis_type === 'letter') {
          const colIdx = COLS.indexOf(botMoveCoords.x);
          coordLabel = `${LETTERS[colIdx]}${botMoveCoords.y}`;
        } else {
          coordLabel = `${botMoveCoords.x}, ${botMoveCoords.y}`;
        }

        const updatedMatch: TorpedoMatch = {
          ...match,
          p2_moves: updatedP2Moves,
          status: botWon ? 'finished' : match.status,
          winner_id: botWon ? 'computer' : match.winner_id,
          turn_id: hit ? 'computer' : userId
        };

        setMatch(updatedMatch);
        setLastAction(`ELLENFÉL LŐTT: ${hit ? 'TALÁLAT!' : 'MELLÉ...'} - ${coordLabel}`);
        playSound(hit ? 'hit' : 'miss');
      } catch (error) {
        console.error('Bot turn error:', error);
      }
    };

    botTurn();

    return () => {
      isSubscribed = false;
    };
  }, [match.turn_id, match.status, match.settings?.is_local, match.p2_moves.length, userId]);

  const playSound = (type: 'hit' | 'miss' | 'shoot') => {
    if (isMuted) return;
    const sounds = {
      hit: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
      miss: 'https://assets.mixkit.co/active_storage/sfx/2594/2594-preview.mp3',
      shoot: 'https://assets.mixkit.co/active_storage/sfx/2596/2596-preview.mp3'
    };
    const audio = new Audio(sounds[type]);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const handlePointClick = (x: number, y: number) => {
    if (!isMyTurn) return;
    if (myMoves.some((m: any) => m.x === x && m.y === y)) {
      toast.error('Ide már lőttél!');
      return;
    }
    executeShoot(x, y);
  };

  const executeShoot = async (targetX: number, targetY: number) => {
    const inputLabel = match.settings.axis_type === 'letter' 
      ? `${LETTERS[COLS.indexOf(targetX)]}${targetY}` 
      : `${targetX}, ${targetY}`;

    if (match.settings.is_local) {
      playSound('shoot');
      
      const hit = opponentShips.some((ship: any) => 
        ship.cells.some((cell: any) => cell.x === targetX && cell.y === targetY)
      );
      
      const newMove = { 
        x: targetX, 
        y: targetY, 
        hit, 
        timestamp: new Date().toISOString() 
      };
      
      const updatedP1Moves = [...match.p1_moves, newMove];
      
      const totalShipCells = opponentShips.reduce((acc: number, ship: any) => acc + ship.cells.length, 0);
      const totalHits = updatedP1Moves.filter((m: any) => m.hit).length;
      const won = totalHits === totalShipCells;
      
      const updatedMatch: TorpedoMatch = {
        ...match,
        p1_moves: updatedP1Moves,
        status: won ? 'finished' : match.status,
        winner_id: won ? userId : match.winner_id,
        turn_id: hit ? match.p1_id : 'computer'
      };
      
      setMatch(updatedMatch);
      setCoordInput('');
      setLastAction(`${hit ? 'TALÁLAT!' : 'MELLÉ...'} - ${inputLabel}`);
      playSound(hit ? 'hit' : 'miss');
      return;
    }

    try {
      playSound('shoot');
      const move = await TorpedoService.makeMove(match.id, targetX, targetY);
      setCoordInput('');
      setLastAction(`${move.hit ? 'TALÁLAT!' : 'MELLÉ...'} - ${inputLabel}`);
      playSound(move.hit ? 'hit' : 'miss');

      setMatch(prev => {
        const isP1 = prev.p1_id === userId;
        const updatedMoves = isP1 ? [...prev.p1_moves, move] : [...prev.p2_moves, move];
        
        let nextTurn = prev.turn_id;
        if (!move.hit) {
          nextTurn = isP1 ? prev.p2_id : prev.p1_id;
        }
        
        const opponentShips = isP1 ? prev.p2_ships : prev.p1_ships;
        const totalShipCells = opponentShips.reduce((acc: number, ship: any) => acc + ship.cells.length, 0);
        const totalHits = updatedMoves.filter((m: any) => m.hit).length;
        const won = totalHits === totalShipCells;
        
        return {
          ...prev,
          p1_moves: isP1 ? updatedMoves : prev.p1_moves,
          p2_moves: !isP1 ? updatedMoves : prev.p2_moves,
          turn_id: nextTurn,
          status: won ? 'finished' : prev.status,
          winner_id: won ? userId : prev.winner_id
        };
      });
    } catch (e) {
      toast.error('Hiba a lövés leadásakor');
    }
  };

  const handleShoot = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isMyTurn) return;

    const input = coordInput.trim().toUpperCase();
    let targetX: number | null = null;
    let targetY: number | null = null;

    if (match.settings.axis_type === 'letter') {
      const matchRegex = /^([-A-E]|O|0|[A-E])\s*(-?[0-5])$/.exec(input);
      if (matchRegex) {
        const letter = matchRegex[1];
        targetY = parseInt(matchRegex[2]);
        const letterIdx = LETTERS.indexOf(letter);
        if (letterIdx !== -1) targetX = COLS[letterIdx];
      }
    } else {
      const matchRegex = /^(-?\d+)\s*[, ]\s*(-?\d+)$/.exec(input);
      if (matchRegex) {
        targetX = parseInt(matchRegex[1]);
        targetY = parseInt(matchRegex[2]);
      }
    }

    if (targetX === null || targetY === null || !COLS.includes(targetX) || !ROWS.includes(targetY)) {
      toast.error('Érvénytelen koordináta!');
      return;
    }

    if (myMoves.some((m: any) => m.x === targetX && m.y === targetY)) {
      toast.error('Ide már lőttél!');
      return;
    }

    executeShoot(targetX, targetY);
  };

  // ─── Board Renderer ───────────────────────────────────────────────────────
  const renderBoard = (isOwn: boolean) => {
    const ships = isOwn ? myShips : [];
    const moves = isOwn ? opponentMoves : myMoves;

    return (
      <div className="flex items-center justify-center">
        {/* Y-Axis */}
        <div className="relative h-[min(72vw,320px)] w-6 mr-1.5 sm:h-[300px] sm:mr-3">
          {ROWS.map((r, i) => (
            <div 
              key={r} 
              className="absolute text-[9px] font-black text-slate-400 w-full text-right pr-1 leading-none"
              style={{ top: `${(i / 10) * 100}%`, transform: 'translateY(-50%)' }}
            >
              {r}
            </div>
          ))}
        </div>

        {/* Grid + X-Axis */}
        <div className="flex flex-col">
          <div className={cn(
            "relative rounded-2xl border-2 shadow-inner overflow-visible",
            "w-[min(72vw,320px)] h-[min(72vw,320px)] sm:w-[300px] sm:h-[300px]",
            isOwn 
              ? "bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800" 
              : "bg-indigo-900/5 border-indigo-500/20"
          )}>
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
              {Array.from({ length: 100 }).map((_, idx) => {
                const col = idx % 10;
                const row = Math.floor(idx / 10);
                return (
                  <div 
                    key={idx} 
                    className={cn(
                      "border-slate-200/50 dark:border-slate-800/40",
                      col < 9 && "border-r",
                      row < 9 && "border-b"
                    )}
                  />
                );
              })}
            </div>

            {/* Axes */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-400 dark:bg-slate-600 -translate-x-1/2 z-10 pointer-events-none overflow-visible">
              <svg className="absolute top-[-9px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 text-slate-400 dark:text-slate-600 fill-current" viewBox="0 0 10 10">
                <polygon points="0,10 5,0 10,10" />
              </svg>
            </div>
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-400 dark:bg-slate-600 -translate-y-1/2 z-10 pointer-events-none overflow-visible">
              <svg className="absolute right-[-9px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-slate-400 dark:text-slate-600 fill-current" viewBox="0 0 10 10">
                <polygon points="0,0 10,5 0,10" />
              </svg>
            </div>

            {/* Ships (own board only) */}
            {isOwn && ships.map((ship, idx) => {
              const { left, top, width, height } = getShipLineCoordinates(ship);
              const isHorizontal = ship.orientation === 'h';
              return (
                <div 
                  key={idx}
                  className="absolute bg-indigo-600/90 dark:bg-indigo-500/90 border border-indigo-400 dark:border-indigo-600 rounded-full z-15 shadow-md pointer-events-none"
                  style={{
                    left,
                    top,
                    width: isHorizontal ? `calc(${width} + 14px)` : '12px',
                    height: isHorizontal ? '12px' : `calc(${height} + 14px)`,
                    transform: isHorizontal ? 'translate(-7px, -50%)' : 'translate(-50%, -7px)'
                  }}
                />
              );
            })}

            {/* Interactive points */}
            {ROWS.map((y, rowIdx) => (
              COLS.map((x, colIdx) => {
                const left = `${(colIdx / 10) * 100}%`;
                const top = `${(rowIdx / 10) * 100}%`;
                
                const shipCell = ships.find((s: any) => s.cells.some((c: any) => c.x === x && c.y === y));
                const move = moves.find((m: any) => m.x === x && m.y === y);
                const isClickable = !isOwn && isMyTurn && !move;

                return (
                  <button
                    key={`${x}-${y}`}
                    onClick={() => isClickable && handlePointClick(x, y)}
                    disabled={!isClickable}
                    className={cn(
                      "absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-20 group outline-none",
                      "w-7 h-7 sm:w-8 sm:h-8",
                      isClickable ? "cursor-crosshair" : "cursor-default"
                    )}
                    style={{ left, top }}
                  >
                    {move ? (
                      move.hit ? (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white shadow-md shadow-rose-500/30 animate-pulse">
                          <Zap size={8} />
                        </div>
                      ) : (
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-400 dark:border-blue-600 flex items-center justify-center text-blue-500">
                          <Waves size={6} />
                        </div>
                      )
                    ) : isOwn && shipCell ? (
                      <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 border border-white dark:border-slate-900 shadow-sm" />
                    ) : (
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 transition-all duration-150",
                        isClickable && "group-hover:w-4 group-hover:h-4 group-hover:bg-rose-500 group-hover:border-2 group-hover:border-white dark:group-hover:border-slate-900 group-hover:shadow-md group-hover:shadow-rose-500/30"
                      )} />
                    )}
                  </button>
                );
              })
            ))}
          </div>

          {/* X-axis labels */}
          <div className="relative mt-1.5 sm:mt-3 h-6"
            style={{ width: 'min(72vw, 320px)' }}
          >
            {COLS.map((c, i) => (
              <div 
                key={c} 
                className="absolute text-[9px] font-black text-slate-400 uppercase tracking-tighter leading-none"
                style={{ left: `${(i / 10) * 100}%`, transform: 'translateX(-50%)' }}
              >
                {match.settings.axis_type === 'letter' ? LETTERS[i] : c}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── Game Over screen ─────────────────────────────────────────────────────
  if (match.status === 'finished') {
    const isWinner = match.winner_id === userId;
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in zoom-in-95 duration-500 px-4">
        <Card className="p-8 md:p-10 text-center rounded-[2.5rem] shadow-2xl relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 w-full max-w-sm">
          <div className={cn("absolute inset-0 opacity-10", isWinner ? "bg-emerald-500" : "bg-rose-500")} />
          <div className={cn("w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6", isWinner ? "bg-green-100 text-green-600" : "bg-rose-100 text-rose-600")}>
            {isWinner ? <Trophy size={36} /> : <Target size={36} />}
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-2 italic">{isWinner ? 'GYŐZELEM!' : 'VÉGE A JÁTÉKNAK'}</h2>
          <p className="text-slate-500 mb-6 text-sm">{isWinner ? 'Minden ellenséges hajót elsüllyesztettél!' : 'Az ellenfél ügyesebb volt ezúttal.'}</p>
          <Button onClick={onBack} className="rounded-xl px-8 h-12 bg-indigo-600 text-white font-bold shadow-lg w-full">Vissza a lobbiba</Button>
        </Card>
      </div>
    );
  }

  // ─── Main combat layout ───────────────────────────────────────────────────
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Status Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 md:p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm gap-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="h-8 w-8 rounded-lg shrink-0">
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </Button>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Ellenfeled</span>
            <span className="text-sm font-black italic">{isP1 ? match.p2_profile?.full_name : match.p1_profile?.full_name}</span>
          </div>
        </div>

        <div className={cn(
          "px-4 md:px-6 py-2 rounded-xl font-black italic text-xs md:text-sm tracking-tight shadow-md transition-all",
          isMyTurn ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
        )}>
          {isMyTurn ? 'TE KÖVETKEZEL!' : 'VÁRAKOZÁS...'}
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Saját találat</span>
            <div className="font-bold text-sm text-rose-500">{myMoves.filter((m: any) => m.hit).length} / 20</div>
          </div>
          <Button variant="outline" size="sm" onClick={onBack} className="h-8 rounded-lg text-xs font-bold shrink-0">Feladás</Button>
        </div>
      </div>

      {/* ── MOBILE: Tab selector ── */}
      <div className="md:hidden flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm gap-1">
        <button
          onClick={() => setActiveTab('enemy')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-sm transition-all",
            activeTab === 'enemy'
              ? "bg-rose-500 text-white shadow-md"
              : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
          )}
        >
          <Crosshair size={16} />
          Ellenséges vizek
        </button>
        <button
          onClick={() => setActiveTab('own')}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-sm transition-all",
            activeTab === 'own'
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
          )}
        >
          <Shield size={16} />
          Saját flotta
        </button>
      </div>

      {/* ── MOBILE: Single board view ── */}
      <div className="md:hidden">
        {activeTab === 'enemy' ? (
          <Card className="p-4 rounded-[2rem] bg-rose-50/30 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/20 shadow-lg relative overflow-hidden">
            <div className="absolute top-3 left-6 flex items-center gap-1.5 opacity-50 z-20">
              <Crosshair size={14} className="text-rose-600" />
              <span className="text-[10px] font-black uppercase italic">Ellenséges terület</span>
            </div>
            <div className="mt-6">
              {renderBoard(false)}
            </div>
          </Card>
        ) : (
          <Card className="p-4 rounded-[2rem] bg-indigo-50/30 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/20 shadow-lg relative overflow-hidden">
            <div className="absolute top-3 left-6 flex items-center gap-1.5 opacity-50 z-20">
              <Shield size={14} className="text-indigo-600" />
              <span className="text-[10px] font-black uppercase italic">Saját Flotta</span>
            </div>
            <div className="mt-6">
              {renderBoard(true)}
            </div>
          </Card>
        )}
      </div>

      {/* ── DESKTOP: Side-by-side boards ── */}
      <div className="hidden md:grid grid-cols-2 gap-4 items-center">
        <Card className="p-4 rounded-[2rem] bg-indigo-50/30 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/20 shadow-lg relative overflow-hidden">
          <div className="absolute top-3 left-6 flex items-center gap-1.5 opacity-50 z-20">
            <Shield size={14} className="text-indigo-600" />
            <span className="text-[10px] font-black uppercase italic">Saját Flotta</span>
          </div>
          {renderBoard(true)}
        </Card>

        <Card className="p-4 rounded-[2rem] bg-rose-50/30 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/20 shadow-lg relative overflow-hidden">
          <div className="absolute top-3 left-6 flex items-center gap-1.5 opacity-50 z-20">
            <Crosshair size={14} className="text-rose-600" />
            <span className="text-[10px] font-black uppercase italic">Ellenséges terület</span>
          </div>
          {renderBoard(false)}
        </Card>
      </div>

      {/* ── Shooting Bar (sticky on mobile) ── */}
      <div className="sticky bottom-2 z-30 pb-safe">
        <Card className="p-2.5 md:p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-2 border-indigo-500/20 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)]">
          
          {/* Last action banner */}
          {lastAction && (
            <div className={cn(
              "mb-2 px-4 py-1.5 rounded-xl text-center text-xs font-black italic transition-all",
              lastAction.includes('TALÁLAT') ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
            )}>
              {lastAction}
            </div>
          )}

          <div className="flex gap-2 items-center">
            {/* Coord input + shoot */}
            <form onSubmit={handleShoot} className="flex gap-2 flex-1">
              <div className="relative flex-1">
                <Input 
                  disabled={!isMyTurn}
                  value={coordInput}
                  onChange={(e) => setCoordInput(e.target.value)}
                  placeholder={match.settings.axis_type === 'letter' ? "Pl. A3, -B5" : "Pl. 1, 2"}
                  className="h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-lg font-black text-center tracking-widest focus:ring-2 focus:ring-indigo-500 uppercase"
                />
                {isMyTurn && <Zap size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 animate-pulse" />}
              </div>
              <Button 
                disabled={!isMyTurn || !coordInput.trim()}
                className="h-12 px-6 md:px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black italic shadow-lg shadow-indigo-500/20 shrink-0"
              >
                <Sword size={16} className="mr-1 md:hidden" />
                <span className="hidden md:inline">TŰZ!</span>
                <span className="md:hidden">TŰZ</span>
              </Button>
            </form>

            {/* History toggle */}
            <div className="shrink-0 flex gap-1.5">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors relative"
              >
                <History size={18} />
                {(myMoves.length + opponentMoves.length) > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                    {Math.min(myMoves.length + opponentMoves.length, 99)}
                  </span>
                )}
              </button>
              <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 group relative">
                <Info size={18} />
                <div className="absolute bottom-full right-0 mb-3 w-56 bg-indigo-600 text-white rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none p-3 text-[10px] font-medium leading-relaxed italic z-50">
                  • Add meg a koordinátát!<br/>
                  • Találat esetén újra lőhetsz.<br/>
                  • Egy hajó körül mindig marad üres hely.<br/>
                  • Az origó (0,0) a középpontban van.
                </div>
              </div>
            </div>
          </div>

          {/* History drawer */}
          {showHistory && (
            <div className="mt-2 bg-slate-50 dark:bg-slate-800 rounded-xl p-3 max-h-40 overflow-y-auto animate-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-bold text-xs uppercase flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <History size={12} /> Előzmények
                </h5>
                <button onClick={() => setShowHistory(false)} className="text-slate-400 hover:text-slate-600">
                  <ChevronDown size={14} />
                </button>
              </div>
              <div className="space-y-1">
                {[...myMoves, ...opponentMoves]
                  .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((m: any, i: number) => {
                    const byMe = myMoves.includes(m);
                    return (
                      <div key={i} className="text-[10px] flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-700 last:border-0">
                        <span className={cn(byMe ? "text-indigo-500 font-bold" : "text-slate-400")}>
                          {byMe ? 'Te' : 'Ő'}: {match.settings.axis_type === 'letter' ? LETTERS[COLS.indexOf(m.x)] + m.y : m.x + ',' + m.y}
                        </span>
                        <span className={m.hit ? "text-rose-500 font-bold" : "opacity-30"}>{m.hit ? '💥 TALÁLAT' : '🌊 MELLÉ'}</span>
                      </div>
                    );
                  })}
                {(myMoves.length + opponentMoves.length) === 0 && (
                  <p className="text-center text-[10px] text-slate-400 py-2">Még nincs lövés</p>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
