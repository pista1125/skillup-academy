import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Eye, 
  EyeOff, 
  Timer, 
  Play, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  Brain,
  Settings2,
  Wrench,
  Ear,
  Shapes,
  ArrowLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MemoryEditor from "@/components/math/games/MemoryEditor";
import { DEFAULT_LEVELS } from '@/data/memoryData';
import * as LucideIcons from 'lucide-react';
import AuditoryMemoryGame from "@/components/math/games/AuditoryMemoryGame";

interface MemoryItem {
  id: string;
  type: 'shape' | 'lucide' | 'emoji';
  content: string;
  color: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  isFilled: boolean;
  flipX: boolean;
  flipY: boolean;
  zIndex: number;
}

export default function MemoryGame() {
  const [gameMode, setGameMode] = useState<'selection' | 'visual' | 'auditory'>('selection');
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [levelIdx, setLevelIdx] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [allLevels, setAllLevels] = useState(DEFAULT_LEVELS);
  
  const [isVisible, setIsVisible] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(20);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Use hardcoded levels for the game, ignore local storage modifications
  useEffect(() => {
    setAllLevels(DEFAULT_LEVELS);
  }, [isEditorMode]);

  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setIsVisible(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  const startTimer = () => {
    setTimeLeft(timerSeconds);
    setIsTimerRunning(true);
    setIsVisible(true);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(0);
    setIsVisible(true);
  };

  const currentLevel = allLevels[levelIdx];
  const currentExercise = currentLevel.exercises[exerciseIdx];

  const renderItem = (item: MemoryItem) => {
    const style: React.CSSProperties = {
      left: `${item.x}%`,
      top: `${item.y}%`,
      transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scaleX(${item.flipX ? -1 : 1}) scaleY(${item.flipY ? -1 : 1})`,
      fontSize: `${item.size}px`,
      color: item.color,
      position: 'absolute',
      zIndex: item.zIndex
    };

    if (item.type === 'emoji') {
      return <div key={item.id} style={style}>{item.content}</div>;
    }

    if (item.type === 'lucide') {
      const IconComp = (LucideIcons as any)[item.content];
      return (
        <div key={item.id} style={style}>
          {IconComp && <IconComp size={item.size} strokeWidth={item.isFilled ? 3 : 2} fill={item.isFilled ? 'currentColor' : 'none'} />}
        </div>
      );
    }

    if (item.type === 'shape') {
      return (
        <div key={item.id} style={style}>
          <div 
            style={{ 
              width: item.size, 
              height: item.size, 
              backgroundColor: item.isFilled ? item.color : 'transparent',
              border: !item.isFilled ? `3px solid ${item.color}` : 'none'
            }} 
            className={cn(
              item.content === 'circle' && "rounded-full",
              item.content === 'square' && "rounded-none"
            )}
           />
        </div>
      );
    }
    return null;
  };

  if (gameMode === 'selection') {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center gap-6 py-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
            <Brain size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Memóriajáték</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <button 
            onClick={() => setGameMode('visual')}
            className="group relative flex flex-col items-center p-10 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Shapes size={80} />
            </div>
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-500">
              <Shapes size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Vizuális</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Jegyezd meg az ábrák formáját, színét és elhelyezkedését.
            </p>
            <div className="mt-4 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Kezdés
            </div>
          </button>

          <button 
            onClick={() => setGameMode('auditory')}
            className="group relative flex flex-col items-center p-10 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-amber-500/50 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Ear size={80} />
            </div>
            <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-500">
              <Ear size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Hallás utáni</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              Figyeld a tanár által felolvasott kérdéseket.
            </p>
            <div className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              Kezdés
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (gameMode === 'auditory') {
    return (
      <div className="relative">
        <Button 
          variant="ghost" 
          onClick={() => setGameMode('selection')}
          className="absolute top-4 left-4 z-50 rounded-xl gap-2 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-600"
        >
          <ArrowLeft size={20} />
          Vissza
        </Button>
        <AuditoryMemoryGame />
      </div>
    );
  }

  if (isEditorMode) {
    return (
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600">
                 <Wrench size={20} />
              </div>
              <h1 className="font-bold text-lg">Szerkesztő Mód</h1>
           </div>
           <Button variant="outline" onClick={() => setIsEditorMode(false)} className="rounded-xl gap-2 font-bold border-indigo-200 text-indigo-600 hover:bg-indigo-50">
              Kilépés a szerkesztőből
           </Button>
        </div>
        <div className="w-full bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden h-[850px] flex flex-col relative">
          <MemoryEditor />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col gap-6 relative">
      <Button 
        variant="ghost" 
        onClick={() => setGameMode('selection')}
        className="absolute top-0 -left-4 z-50 rounded-xl gap-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-indigo-600"
      >
        <ArrowLeft size={20} />
        Vissza a választáshoz
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl backdrop-blur-md mt-12">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
            <Brain size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Vizuális Memóriajáték</h1>
            <p className="text-slate-500 dark:text-slate-400">Figyeld meg és jegyezd meg az ábrákat!</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setIsEditorMode(true)} className="rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:text-indigo-600">
             <Settings2 size={20} />
          </Button>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {allLevels.map((level, idx) => (
              <button
                key={idx}
                onClick={() => { setLevelIdx(idx); setExerciseIdx(0); resetTimer(); }}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  levelIdx === idx 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none scale-105" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                )}
              >
                {level.difficulty}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Feladatválasztó</h3>
              <div className="grid grid-cols-5 gap-2">
                {currentLevel.exercises.map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setExerciseIdx(idx); resetTimer(); }}
                    className={cn(
                      "aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all border",
                      exerciseIdx === idx
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 dark:shadow-none scale-110"
                        : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    )}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Vezérlés</h3>
              <Button 
                variant={isVisible ? "default" : "secondary"}
                onClick={() => setIsVisible(!isVisible)}
                className="w-full justify-start gap-3 rounded-2xl h-12"
              >
                {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                {isVisible ? "Elrejtés" : "Megjelenítés"}
              </Button>

              <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium text-sm">
                    <Timer size={16} />
                    <span>Időzítő</span>
                  </div>
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <Settings2 size={16} />
                  </button>
                </div>

                {showSettings && (
                  <div className="mb-4">
                    <input 
                      type="range"
                      min="5"
                      max="60"
                      step="5"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(parseInt(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>5 mp</span>
                      <span>{timerSeconds} mp</span>
                      <span>60 mp</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {!isTimerRunning ? (
                    <Button 
                      onClick={startTimer}
                      className="flex-1 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                    >
                      <Play size={16} />
                      Indítás
                    </Button>
                  ) : (
                    <Button 
                      variant="destructive"
                      onClick={resetTimer}
                      className="flex-1 gap-2 rounded-xl"
                    >
                      <RotateCcw size={16} />
                      Leállítás
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
               <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-xl"
                    disabled={exerciseIdx === 0 && levelIdx === 0}
                    onClick={() => {
                        if (exerciseIdx > 0) setExerciseIdx(exerciseIdx - 1);
                        else if (levelIdx > 0) {
                            setLevelIdx(levelIdx - 1);
                            setExerciseIdx(9);
                        }
                        resetTimer();
                    }}
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  <span className="text-sm font-medium text-slate-500">
                    {levelIdx + 1}. szint / {exerciseIdx + 1}. feladat
                  </span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-xl"
                    disabled={exerciseIdx === 9 && levelIdx === 4}
                    onClick={() => {
                        if (exerciseIdx < 9) setExerciseIdx(exerciseIdx + 1);
                        else if (levelIdx < 4) {
                            setLevelIdx(levelIdx + 1);
                            setExerciseIdx(0);
                        }
                        resetTimer();
                    }}
                  >
                    <ChevronRight size={20} />
                  </Button>
               </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="aspect-[4/3] rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center group">
            <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            
            {isVisible ? (
              <div className="relative w-full h-full p-12">
                {currentExercise.items?.map((item: any) => renderItem(item))}
                {(!currentExercise.items || currentExercise.items.length === 0) && (
                   <div className="flex flex-col items-center justify-center opacity-30 h-full">
                      <Brain size={64} className="mb-4" />
                      <p className="font-bold">Nincs még feladat ezen a szinten</p>
                      <p className="text-sm">Válts szerkesztő módra az ábrák elhelyezéséhez!</p>
                   </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 relative z-10 animate-in fade-in zoom-in duration-300">
                <div className="p-8 bg-white dark:bg-slate-800 rounded-full shadow-2xl shadow-indigo-200 dark:shadow-none border border-slate-100 dark:border-slate-700">
                  <EyeOff size={80} className="text-slate-300 dark:text-slate-600" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-400 dark:text-slate-600">Rejtett ábrák</h3>
                  <p className="text-slate-400 dark:text-slate-600">Kattints a megjelenítésre a kezdéshez!</p>
                </div>
              </div>
            )}

            {isTimerRunning && (
              <div className="absolute top-8 right-8 flex flex-col items-end gap-2">
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-indigo-100 dark:border-indigo-900 shadow-xl flex items-center gap-4">
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="w-10 h-10 -rotate-90">
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-slate-100 dark:text-slate-700"
                      />
                      <circle
                        cx="20"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={113.1}
                        strokeDashoffset={113.1 - (113.1 * timeLeft) / timerSeconds}
                        className="text-indigo-600 transition-all duration-1000 ease-linear"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-indigo-700 dark:text-indigo-400">{timeLeft}</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Idő lejár</div>
                    <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {!isVisible && !isTimerRunning && timeLeft === 0 && (
                 <div className="absolute inset-0 bg-indigo-600/5 dark:bg-indigo-600/10 pointer-events-none" />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
