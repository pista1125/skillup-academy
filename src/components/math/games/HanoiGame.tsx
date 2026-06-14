import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { 
  ArrowLeft, 
  RotateCcw, 
  Trophy, 
  HelpCircle, 
  Settings2,
  Play,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

type RodState = number[]; // Array of disk sizes

export default function HanoiGame({ onBack }: { onBack: () => void }) {
  const [diskCount, setDiskCount] = useState(3);
  const [tempDiskCount, setTempDiskCount] = useState(3);
  const [rods, setRods] = useState<RodState[]>([[], [], []]);
  const [selectedRod, setSelectedRod] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [gameState, setGameState] = useState<'selection' | 'playing' | 'won'>('selection');
  const [showHelp, setShowHelp] = useState(false);
  const [zoom, setZoom] = useState(1);

  // Fullscreen and mobile optimization states
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      setIsFullscreen(prev => !prev);
      console.warn("Browser fullscreen failed, using CSS fallback:", err);
    }
  };

  const handleBack = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onBack();
  };

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

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full transition-all duration-300 flex flex-col gap-6 relative",
        isFullscreen 
          ? "fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 md:p-8 overflow-y-auto w-full h-full" 
          : "max-w-6xl mx-auto p-4"
      )}
    >
      {isPortrait && isFullscreen && (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-[60] bg-amber-500/90 backdrop-blur text-white font-bold px-4 py-1.5 rounded-full text-xs flex items-center gap-2 animate-bounce shadow-md">
          <span>📱</span>
          <span>A jobb játékélményhez fordítsd el a kijelzőt fekvő módba!</span>
        </div>
      )}

      {gameState === 'selection' ? (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-6 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-full flex justify-start">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="rounded-xl gap-2 hover:bg-primary/10 text-primary"
            >
              <ArrowLeft size={20} />
              Vissza
            </Button>
          </div>
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Hanoi tornyai</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Hány koronggal szeretnél megpróbálkozni?
            </p>
          </div>

          <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-end mb-2">
                 <div>
                   <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-1">Nehézségi szint</span>
                   <h2 className="text-3xl font-black text-slate-900 dark:text-white">{tempDiskCount} korong</h2>
                 </div>
                 <div className="text-right">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
                      {tempDiskCount <= 4 ? 'Kezdő' : tempDiskCount <= 7 ? 'Haladó' : tempDiskCount <= 10 ? 'Mester' : 'Legenda'}
                    </span>
                 </div>
              </div>
              
              <Slider 
                value={[tempDiskCount]} 
                onValueChange={(val) => setTempDiskCount(val[0])}
                min={3} 
                max={15} 
                step={1}
                className="py-4"
              />
              
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                <span>3 korong</span>
                <span>15 korong</span>
              </div>
            </div>

            <Button 
              onClick={() => initGame(tempDiskCount)}
              className="w-full h-16 rounded-2xl bg-primary text-white text-xl font-black shadow-lg shadow-primary/20 hover:shadow-xl transition-all group gap-3"
            >
              Játék indítása
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
            {[3, 5, 8, 12].map(n => (
              <button
                key={n}
                onClick={() => {
                  setTempDiskCount(n);
                  initGame(n);
                }}
                className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-500 hover:text-primary hover:border-primary transition-all"
              >
                {n} korong
              </button>
            ))}
          </div>

          <div className="max-w-md bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl backdrop-blur-md">
             <h3 className="font-bold flex items-center gap-2 mb-2 text-slate-800 dark:text-white">
               <HelpCircle size={18} className="text-primary" />
               A játék lényege
             </h3>
             <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
               Pakold át az összes korongot a kezdő rúdról egy másikra. 
               Egyszerre csak egy korongot mozgathatsz, és nagyobb korong soha nem kerülhet kisebbre!
             </p>
          </div>
        </div>
      ) : (
        <>
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-4 rounded-3xl border border-white dark:border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                onClick={handleBack}
                className="rounded-xl gap-2 hover:bg-primary/10 text-primary px-3"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Vissza</span>
              </Button>
              <div className="w-px bg-slate-200 dark:bg-slate-800 h-8 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary hidden md:block">
                  <Trophy size={22} />
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Hanoi tornyai</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    Cél: {diskCount} korong átrakása
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex flex-col items-end px-3 py-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mr-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Lépések</span>
                <span className="text-base font-black text-slate-900 dark:text-white leading-none mt-0.5">{moves} / <span className="text-slate-300">{minMoves.toLocaleString()}</span></span>
              </div>
              
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 h-10">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                  className="rounded-lg h-full w-8 text-slate-500"
                >
                  <ZoomOut size={16} />
                </Button>
                <div className="w-px bg-slate-200 dark:bg-slate-600 my-1.5 mx-0.5" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
                  className="rounded-lg h-full w-8 text-slate-500"
                >
                  <ZoomIn size={16} />
                </Button>
              </div>

              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleFullscreen}
                className="rounded-xl h-10 w-10 border-slate-200 bg-white dark:bg-slate-800"
                title="Teljes képernyő"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </Button>

              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => {
                  setTempDiskCount(diskCount);
                  setGameState('selection');
                }}
                className="rounded-xl h-10 w-10 border-slate-200 bg-white dark:bg-slate-800"
                title="Beállítások"
              >
                <Settings2 size={20} />
              </Button>
              <Button 
                onClick={() => initGame(diskCount)}
                className="rounded-xl h-10 gap-1.5 bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-black/5 text-sm"
              >
                <RotateCcw size={16} />
                <span>Újra</span>
              </Button>
            </div>
          </div>

          {/* Game Board */}
          <Card className={cn(
            "rounded-[2.5rem] border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 flex items-end justify-around py-10 px-6 group transition-all duration-700 w-full",
            isFullscreen 
              ? "flex-1 min-h-[300px] md:min-h-[450px]" 
              : "aspect-[16/9] md:aspect-[16/7]"
          )}>
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
                <div className="flex flex-col-reverse items-center w-full z-10 gap-0.5 pb-2">
                  {rodDisks.map((size, dIdx) => {
                    const isSelected = selectedRod === idx && dIdx === rodDisks.length - 1;
                    const diskHeight = Math.min(32, (300 / diskCount) * zoom);
                    return (
                      <div
                        key={`${idx}-${size}`}
                        style={{ 
                          width: `${(size / (diskCount + 1)) * 100}%`,
                          height: `${diskHeight}px`,
                          background: `hsl(${(size * 360) / diskCount}, 70%, 50%)`,
                          boxShadow: isSelected ? '0 10px 25px -5px rgba(0,0,0,0.3), 0 0 15px currentColor' : '0 2px 4px -1px rgba(0,0,0,0.1)'
                        }}
                        className={cn(
                          "rounded-full border border-black/10 transition-all duration-300 flex items-center justify-center text-white font-bold ring-offset-2",
                          isSelected && "translate-y-[-40px] scale-105 z-20 shadow-2xl"
                        )}
                      >
                        {diskHeight > 16 && (
                          <span className={cn(
                            "opacity-80 pointer-events-none select-none",
                            diskHeight < 24 ? "text-[8px]" : "text-xs"
                          )}>
                            {size}
                          </span>
                        )}
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

          {/* Touch-Friendly Mobile Buttons Row */}
          <div className="flex justify-around items-center w-full gap-4 mt-2 sm:hidden px-2">
            {rods.map((rodDisks, idx) => {
              const isSelected = selectedRod === idx;
              const hasDisks = rodDisks.length > 0;
              const isValidDestination = selectedRod !== null && selectedRod !== idx && 
                (rodDisks.length === 0 || rodDisks[rodDisks.length - 1] > rods[selectedRod][rods[selectedRod].length - 1]);

              let btnText = "Kijelöl";
              let btnColor = "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
              if (isSelected) {
                btnText = "Mégse";
                btnColor = "bg-amber-500 text-white";
              } else if (selectedRod !== null) {
                btnText = isValidDestination ? "Ide rak" : "Nem lehet";
                btnColor = isValidDestination 
                  ? "bg-primary text-white animate-pulse" 
                  : "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-900";
              } else if (!hasDisks) {
                btnText = "Üres";
                btnColor = "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-900";
              }

              return (
                <Button
                  key={idx}
                  disabled={(selectedRod === null && !hasDisks) || (selectedRod !== null && selectedRod !== idx && !isValidDestination)}
                  onClick={() => handleRodClick(idx)}
                  className={cn("flex-1 h-12 text-xs font-black rounded-xl shadow-sm transition-all flex flex-col items-center justify-center py-1", btnColor)}
                >
                  <span className="leading-tight">{idx + 1}. torony</span>
                  <span className="text-[8px] opacity-90 font-bold">{btnText}</span>
                </Button>
              );
            })}
          </div>

          {/* Instructions */}
          {!isFullscreen && (
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
          )}
        </>
      )}
    </div>
  );
}
