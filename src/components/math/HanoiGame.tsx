import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  HelpCircle, 
  Settings2,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

type RodState = number[]; // Array of disk sizes

export default function HanoiGame({ onBack }: { onBack: () => void }) {
  const [diskCount, setDiskCount] = useState(3);
  const [rods, setRods] = useState<RodState[]>([[], [], []]);
  const [selectedRod, setSelectedRod] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState<'selection' | 'playing' | 'won'>('selection');
  const [showHelp, setShowHelp] = useState(false);

  const initGame = (count: number) => {
    const initialDisks = Array.from({ length: count }, (_, i) => count - i);
    setRods([initialDisks, [], []]);
    setDiskCount(count);
    setMoves(0);
    setSelectedRod(null);
    setGameState('playing');
  };

  const handleRodClick = (rodIdx: number) => {
    if (gameState !== 'playing') return;

    if (selectedRod === null) {
      // Selecting a rod to move from
      if (rods[rodIdx].length > 0) {
        setSelectedRod(rodIdx);
      }
    } else {
      // Moving to a destination rod
      if (selectedRod === rodIdx) {
        setSelectedRod(null);
        return;
      }

      const sourceRod = rods[selectedRod];
      const destRod = rods[rodIdx];
      const diskToMove = sourceRod[sourceRod.length - 1];

      // Check if move is valid: dest empty OR top disk larger than disk to move
      if (destRod.length === 0 || destRod[destRod.length - 1] > diskToMove) {
        const newRods = [...rods];
        newRods[selectedRod] = sourceRod.slice(0, -1);
        newRods[rodIdx] = [...destRod, diskToMove];
        setRods(newRods);
        setMoves(prev => prev + 1);
        setSelectedRod(null);

        // Check for win
        if (newRods[2].length === diskCount || newRods[1].length === diskCount) {
          setGameState('won');
        }
      } else {
        // Invalid move
        setSelectedRod(rodIdx); // Switch selection if possible, or just ignore
        if (rods[rodIdx].length === 0) setSelectedRod(null);
      }
    }
  };

  const minMoves = Math.pow(2, diskCount) - 1;

  if (gameState === 'selection') {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center gap-12 py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-primary/10 rounded-3xl text-primary mb-2">
            <Trophy size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Hanoi tornyai</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Hány koronggal szeretnél megpróbálkozni?
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {[3, 4, 5, 6, 7].map(n => (
            <button
              key={n}
              onClick={() => initGame(n)}
              className="w-20 h-20 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-primary transition-all duration-300 flex flex-col items-center justify-center group"
            >
              <span className="text-2xl font-black text-slate-900 dark:text-white group-hover:scale-110 transition-transform">{n}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">korong</span>
            </button>
          ))}
        </div>

        <div className="max-w-md bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl backdrop-blur-md">
           <h3 className="font-bold flex items-center gap-2 mb-2">
             <HelpCircle size={18} className="text-primary" />
             A játék lényege
           </h3>
           <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
             Pakold át az összes korongot a kezdő rúdról egy másikra. 
             Egyszerre csak egy korongot mozgathatsz, és nagyobb korong soha nem kerülhet kisebbre!
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col gap-6 relative">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="absolute top-0 -left-4 z-50 rounded-xl gap-2 hover:bg-primary/10 text-primary"
      >
        <ArrowLeft size={20} />
        Vissza
      </Button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl backdrop-blur-md mt-12">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Trophy size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hanoi tornyai</h1>
            <p className="text-slate-500 dark:text-slate-400">
              Cél: {diskCount} korong átrakása
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end px-4 py-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lépések</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{moves} / <span className="text-slate-300">{minMoves}</span></span>
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setGameState('selection')}
            className="rounded-xl h-12 w-12 border-slate-200"
          >
            <Settings2 size={24} />
          </Button>
          <Button 
            onClick={() => initGame(diskCount)}
            className="rounded-xl h-12 gap-2 bg-slate-900 text-white"
          >
            <RotateCcw size={20} />
            Újra
          </Button>
        </div>
      </div>

      {/* Game Board */}
      <Card className="aspect-[16/9] md:aspect-[16/7] rounded-[2.5rem] border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 flex items-end justify-around py-16 px-12 group transition-all duration-700">
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        
        {rods.map((rodDisks, idx) => (
          <div 
            key={idx} 
            onClick={() => handleRodClick(idx)}
            className={cn(
              "relative flex flex-col-reverse items-center w-1/4 h-full cursor-pointer group/rod transition-all duration-300",
              selectedRod === idx && "scale-105"
            )}
          >
            {/* The Rod (Vertical Bar) */}
            <div className={cn(
              "absolute bottom-0 w-4 h-[80%] rounded-t-full transition-all duration-500 z-0",
              selectedRod === idx ? "bg-primary shadow-[0_0_20px_rgba(var(--primary),0.3)]" : "bg-slate-300 dark:bg-slate-700 group-hover/rod:bg-slate-400"
            )} />
            
            {/* The Base */}
            <div className="absolute bottom-[-10px] w-full h-4 bg-slate-400 dark:bg-slate-600 rounded-full z-0" />

            {/* Disks */}
            <div className="flex flex-col-reverse items-center w-full z-10 gap-1 pb-1">
              {rodDisks.map((size, dIdx) => {
                const isSelected = selectedRod === idx && dIdx === rodDisks.length - 1;
                return (
                  <div
                    key={`${idx}-${size}`}
                    style={{ 
                      width: `${(size / diskCount) * 100}%`,
                      height: '32px',
                      background: `hsl(${(size * 360) / diskCount}, 70%, 50%)`,
                      boxShadow: isSelected ? '0 10px 25px -5px rgba(0,0,0,0.3), 0 0 15px currentColor' : '0 4px 6px -1px rgba(0,0,0,0.1)'
                    }}
                    className={cn(
                      "rounded-full border-2 border-black/10 transition-all duration-500 flex items-center justify-center text-white font-bold text-xs ring-offset-2",
                      isSelected && "translate-y-[-40px] scale-105 z-20"
                    )}
                  >
                    <span className="opacity-50">{size}</span>
                  </div>
                );
              })}
            </div>

            {/* Selection Indicator Area */}
            {selectedRod === idx && (
              <div className="absolute -top-10 animate-bounce text-primary">
                 <ArrowLeft size={32} className="rotate-[-90deg]" />
              </div>
            )}
          </div>
        ))}

        {/* Win Overlay */}
        {gameState === 'won' && (
          <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-500">
             <div className="p-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full shadow-2xl mb-6 text-emerald-600 animate-bounce">
                <Trophy size={80} />
             </div>
             <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Gratulálunk!</h2>
             <p className="text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-md">
               Sikeresen átpakoltad a tornyot {moves} lépésben!
               {moves === minMoves ? (
                 <span className="block mt-2 text-emerald-600 font-bold">Tökéletes megoldás! (Minimum lépésszám)</span>
               ) : (
                 <span className="block mt-2 italic text-slate-400">A minimum lépésszám {minMoves} volt. Legközelebb sikerülni fog!</span>
               )}
             </p>
             <div className="flex gap-4">
                <Button 
                  onClick={() => setGameState('selection')}
                  className="rounded-2xl px-10 h-14 text-lg bg-slate-900 text-white font-bold"
                >
                  Másik szint
                </Button>
                <Button 
                  onClick={() => initGame(diskCount)}
                  className="rounded-2xl px-10 h-14 text-lg bg-primary text-white font-bold gap-2"
                >
                  <RotateCcw size={24} />
                  Új játék
                </Button>
             </div>
          </div>
        )}
      </Card>

      {/* Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
           <h4 className="font-bold text-slate-800 dark:text-white mb-2">1. Szabály</h4>
           <p className="text-sm text-slate-500 italic">Egyszerre csak a legfelső korongot veheted le egy rúdról.</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
           <h4 className="font-bold text-slate-800 dark:text-white mb-2">2. Szabály</h4>
           <p className="text-sm text-slate-500 italic">Nagyobb korongot soha nem tehetsz kisebbre.</p>
        </div>
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
           <h4 className="font-bold text-slate-800 dark:text-white mb-2">3. Cél</h4>
           <p className="text-sm text-slate-500 italic">Juttasd át a teljes tornyot egy másik rúdra.</p>
        </div>
      </div>
    </div>
  );
}
