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
  Info
} from 'lucide-react';
import { TorpedoService, TorpedoMatch } from '@/lib/torpedo/TorpedoService';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface TorpedoCombatProps {
  match: TorpedoMatch;
  userId: string;
  onBack: () => void;
}

const COLS = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
const ROWS = [5, 4, 3, 2, 1, -1, -2, -3, -4, -5];
const LETTERS = ['-E', '-D', '-C', '-B', '-A', 'A', 'B', 'C', 'D', 'E'];

export default function TorpedoCombat({ match: initialMatch, userId, onBack }: TorpedoCombatProps) {
  const [match, setMatch] = useState<TorpedoMatch>(initialMatch);
  const [coordInput, setCoordInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isP1 = match.p1_id === userId;
  const myShips = isP1 ? match.p1_ships : match.p2_ships;
  const opponentShips = isP1 ? match.p2_ships : match.p1_ships;
  const myMoves = isP1 ? match.p1_moves : match.p2_moves;
  const opponentMoves = isP1 ? match.p2_moves : match.p1_moves;
  const isMyTurn = match.turn_id === userId && match.status === 'playing';

  useEffect(() => {
    const channel = TorpedoService.subscribeToMatch(match.id, (payload) => {
      const updated = payload.new as TorpedoMatch;
      setMatch(prev => ({
        ...prev,
        ...updated,
        p1_profile: prev.p1_profile,
        p2_profile: prev.p2_profile
      }));

      const oldMoves = isP1 ? match.p2_moves : match.p1_moves;
      const newMoves = isP1 ? updated.p2_moves : updated.p1_moves;
      if (newMoves.length > oldMoves.length) {
        const lastMove = newMoves[newMoves.length - 1];
        playSound(lastMove.hit ? 'hit' : 'miss');
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [match.id, isP1]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [myMoves, opponentMoves]);

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

  const handleShoot = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isMyTurn) return;

    const input = coordInput.trim().toUpperCase();
    let targetX: number | null = null;
    let targetY: number | null = null;

    if (match.settings.axis_type === 'letter') {
      const matchRegex = /^([-A-E]|[A-E])\s*(-?[1-5])$/.exec(input);
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

    try {
      playSound('shoot');
      const move = await TorpedoService.makeMove(match.id, targetX, targetY);
      setCoordInput('');
      setLastAction(`${move.hit ? 'TALÁLAT!' : 'MELLÉ...'} - ${input}`);
      playSound(move.hit ? 'hit' : 'miss');
    } catch (e) {
      toast.error('Hiba a lövés leadásakor');
    }
  };

  const renderBoard = (isOwn: boolean) => {
    const ships = isOwn ? myShips : [];
    const moves = isOwn ? opponentMoves : myMoves;

    return (
      <div className="flex flex-col items-center">
        {/* Horizontal Axis Labels */}
        <div className="grid grid-cols-[20px_repeat(10,1fr)] gap-0.5 w-full mb-1">
           <div />
           {COLS.map((c, i) => (
             <div key={c} className="text-center text-[9px] font-black text-slate-400">
               {match.settings.axis_type === 'letter' ? LETTERS[i] : c}
             </div>
           ))}
        </div>

        <div className="flex gap-1 relative">
          {/* Vertical Axis Labels */}
          <div className="flex flex-col gap-0.5 pr-0.5">
            {ROWS.map(r => (
              <div key={r} className="h-6 sm:h-8 flex items-center justify-center text-[9px] font-black text-slate-400 w-4">
                {r}
              </div>
            ))}
          </div>

          {/* Grid Container */}
          <div className={cn(
            "grid grid-cols-10 gap-0.5 p-0.5 rounded-lg border-2 shadow-inner relative overflow-hidden",
            isOwn ? "bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800" : "bg-indigo-900/10 border-indigo-500/20"
          )}>
            {/* Centered Axes Lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-300 dark:bg-slate-600 -translate-x-1/2 z-0 pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-300 dark:bg-slate-600 -translate-y-1/2 z-0 pointer-events-none" />

            {ROWS.map(y => (
              COLS.map(x => {
                const shipCell = ships.find((s: any) => s.cells.some((c: any) => c.x === x && c.y === y));
                const move = moves.find((m: any) => m.x === x && m.y === y);
                
                return (
                  <div
                    key={`${x}-${y}`}
                    className={cn(
                      "w-6 h-6 sm:w-8 sm:h-8 rounded-sm transition-all duration-300 flex items-center justify-center relative z-10",
                      shipCell ? "bg-indigo-600 shadow-sm" : "bg-white/60 dark:bg-slate-900/60 backdrop-blur-[1px]",
                      move && (move.hit ? "ring-1 ring-rose-500 bg-rose-500/20" : "bg-blue-200/40 dark:bg-blue-900/20")
                    )}
                  >
                    {!shipCell && move && !move.hit && <Waves size={10} className="text-blue-500/60" />}
                    {move && move.hit && <Zap size={10} className="text-rose-500 animate-pulse" />}
                    {shipCell && move && move.hit && <div className="absolute inset-0 bg-rose-500/30 animate-pulse" />}
                  </div>
                );
              })
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (match.status === 'finished') {
    const isWinner = match.winner_id === userId;
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in zoom-in-95 duration-500">
        <Card className="p-10 text-center rounded-[2.5rem] shadow-2xl relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800">
          <div className={cn("absolute inset-0 opacity-10", isWinner ? "bg-emerald-500" : "bg-rose-500")} />
          <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6", isWinner ? "bg-green-100 text-green-600" : "bg-rose-100 text-rose-600")}>
            {isWinner ? <Trophy size={40} /> : <Target size={40} />}
          </div>
          <h2 className="text-3xl font-black mb-2 italic">{isWinner ? 'GYŐZELEM!' : 'VÉGE A JÁTÉKNAK'}</h2>
          <p className="text-slate-500 mb-8">{isWinner ? 'Minden ellenséges hajót elsüllyesztettél!' : 'Az ellenfél ügyesebb volt ezúttal.'}</p>
          <Button onClick={onBack} className="rounded-xl px-10 h-12 bg-indigo-600 text-white font-bold shadow-lg">Vissza a lobbiba</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Mini Header / Status */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
           <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="h-8 w-8 rounded-lg">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
           </Button>
           <div className="hidden sm:flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Ellenfeled</span>
              <span className="text-sm font-black italic">{isP1 ? match.p2_profile?.full_name : match.p1_profile?.full_name}</span>
           </div>
        </div>

        <div className={cn(
          "px-6 py-2 rounded-xl font-black italic text-sm tracking-tight shadow-md transition-all",
          isMyTurn ? "bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
        )}>
          {isMyTurn ? 'TE KÖVETKEZEL!' : 'VÁRAKOZÁS...'}
        </div>

        <div className="flex items-center gap-4">
           <div className="text-right hidden sm:block">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Saját találat</span>
              <div className="font-bold text-sm text-rose-500">{myMoves.filter((m: any) => m.hit).length} / 20</div>
           </div>
           <Button variant="outline" size="sm" onClick={onBack} className="h-8 rounded-lg text-xs font-bold">Feladás</Button>
        </div>
      </div>

      {/* Main Container: Boards Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* My Fleet */}
        <Card className="p-4 rounded-[2rem] bg-indigo-50/30 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/20 shadow-lg relative overflow-hidden">
          <div className="absolute top-3 left-6 flex items-center gap-1.5 opacity-50 z-20">
             <Shield size={14} className="text-indigo-600" />
             <span className="text-[10px] font-black uppercase italic">Saját Flotta</span>
          </div>
          {renderBoard(true)}
        </Card>

        {/* Enemy Waters */}
        <Card className="p-4 rounded-[2rem] bg-rose-50/30 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/20 shadow-lg relative overflow-hidden">
          <div className="absolute top-3 left-6 flex items-center gap-1.5 opacity-50 z-20">
             <Crosshair size={14} className="text-rose-600" />
             <span className="text-[10px] font-black uppercase italic">Ellenséges terület</span>
          </div>
          {renderBoard(false)}
        </Card>
      </div>

      {/* Shooting Bar - Horizontal below fleets */}
      <div className="sticky bottom-4 z-30">
        <Card className="p-2 sm:p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-indigo-500/20 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row items-center gap-3">
           <div className="flex-1 w-full max-w-lg mx-auto">
              <form onSubmit={handleShoot} className="flex gap-2">
                 <div className="relative flex-1">
                    <Input 
                      disabled={!isMyTurn}
                      value={coordInput}
                      onChange={(e) => setCoordInput(e.target.value)}
                      placeholder={match.settings.axis_type === 'letter' ? "Pl. A3, -B5" : "Pl. 1, 2"}
                      className="h-12 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-lg font-black text-center tracking-widest focus:ring-2 focus:ring-indigo-500 uppercase"
                    />
                    {isMyTurn && <Zap size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 animate-pulse" />}
                 </div>
                 <Button 
                   disabled={!isMyTurn || !coordInput.trim()}
                   className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black italic shadow-lg shadow-indigo-500/20"
                 >
                   TŰZ!
                 </Button>
              </form>
           </div>
           
           {/* Quick Feedback Area */}
           <div className="h-10 px-4 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center min-w-[200px]">
              <span className={cn(
                  "text-sm font-black italic",
                  lastAction?.includes('TALÁLAT') ? "text-rose-500" : "text-slate-500"
              )}>
                 {lastAction || "Várd meg a sorod..."}
              </span>
           </div>

           {/* History Mini Drawer / Button */}
           <div className="flex items-center gap-2 pr-2">
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group relative">
                 <History size={20} />
                 <div className="absolute bottom-full right-0 mb-4 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none p-4 max-h-[300px] overflow-y-auto">
                    <h5 className="font-bold text-xs uppercase mb-3 flex items-center gap-2"><History size={14} /> Előzmények</h5>
                    <div className="space-y-1.5">
                       {[...myMoves, ...opponentMoves]
                         .sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                         .map((m: any, i: number) => {
                           const byMe = myMoves.includes(m);
                           return (
                             <div key={i} className="text-[10px] flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                <span className={cn(byMe ? "text-indigo-500" : "text-slate-400")}>
                                   {byMe ? 'Te' : 'Ő'}: {match.settings.axis_type === 'letter' ? LETTERS[COLS.indexOf(m.x)] + m.y : m.x + ',' + m.y}
                                </span>
                                <span className={m.hit ? "text-rose-500 font-bold" : "opacity-30"}>{m.hit ? 'HIT' : 'MISS'}</span>
                             </div>
                           );
                         })}
                    </div>
                 </div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 group relative">
                 <Info size={20} />
                 <div className="absolute bottom-full right-0 mb-4 w-64 bg-indigo-600 text-white rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none p-4 text-[10px] font-medium leading-relaxed italic">
                    • Add meg a koordinátát!<br/>
                    • Találat esetén újra lőhetsz.<br/>
                    • Egy hajó körül mindig marad üres hely.<br/>
                    • Az origó (0,0) a központban van.
                 </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
}
