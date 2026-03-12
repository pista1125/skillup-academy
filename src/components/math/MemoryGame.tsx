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
  Star,
  Settings2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MemoryItem {
  type: 'shape' | 'emoji' | 'text';
  content: string; // "circle", "square", "triangle", or emoji, or text
  color?: string;
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  size: number; // in pixels
  rotation?: number;
  isFilled?: boolean;
  borderWidth?: number;
}

interface MemoryExercise {
  id: number;
  items: MemoryItem[];
}

interface MemoryLevel {
  difficulty: string;
  exercises: MemoryExercise[];
}

const SHAPES = ['circle', 'square', 'triangle', 'pentagon', 'star', 'diamond', 'arrow', 'line', 'cross'];
const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'];
const FRUITS = ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝'];

// Generate exercises
const generateExercises = (): MemoryLevel[] => {
  const levels: MemoryLevel[] = [];
  const difficultyNames = ['Nagyon könnyű', 'Könnyű', 'Közepes', 'Nehéz', 'Mester'];

  const getComposition = (centerX: number, centerY: number, sizeMult: number): MemoryItem[] => {
    const type = Math.floor(Math.random() * 4);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const items: MemoryItem[] = [];

    if (type === 0) { // Compass / Symbol from drawing
      items.push({ type: 'shape', content: 'circle', x: centerX, y: centerY, size: 80 * sizeMult, color, rotation: 0 });
      items.push({ type: 'shape', content: 'diamond', x: centerX, y: centerY, size: 30 * sizeMult, color, rotation: 0 });
      items.push({ type: 'shape', content: 'arrow', x: centerX, y: centerY - 45 * sizeMult, size: 50 * sizeMult, color, rotation: 180 }); // Top
      items.push({ type: 'shape', content: 'arrow', x: centerX - 45 * sizeMult, y: centerY, size: 50 * sizeMult, color, rotation: 90 }); // Left
      items.push({ type: 'shape', content: 'triangle', x: centerX + 50 * sizeMult, y: centerY, size: 40 * sizeMult, color, rotation: 90, isFilled: true }); // Right filled
      items.push({ type: 'shape', content: 'triangle', x: centerX, y: centerY + 55 * sizeMult, size: 60 * sizeMult, color, rotation: 0 }); // Bottom triangle
      items.push({ type: 'shape', content: 'circle', x: centerX, y: centerY + 58 * sizeMult, size: 25 * sizeMult, color, rotation: 0 }); // Circle inside bottom triangle
    } else if (type === 1) { // Flower / Sun
      items.push({ type: 'shape', content: 'circle', x: centerX, y: centerY, size: 60 * sizeMult, color, rotation: 0, isFilled: true });
      for (let i = 0; i < 8; i++) {
        const angle = (i * 45) * Math.PI / 180;
        items.push({ 
          type: 'shape', 
          content: 'triangle', 
          x: centerX + Math.cos(angle) * 40 * sizeMult, 
          y: centerY + Math.sin(angle) * 40 * sizeMult, 
          size: 30 * sizeMult, 
          color, 
          rotation: (i * 45) + 90 
        });
      }
    } else if (type === 2) { // Robot / Face
      items.push({ type: 'shape', content: 'square', x: centerX, y: centerY, size: 100 * sizeMult, color, rotation: 0 });
      items.push({ type: 'shape', content: 'circle', x: centerX - 25 * sizeMult, y: centerY - 20 * sizeMult, size: 20 * sizeMult, color, rotation: 0, isFilled: true });
      items.push({ type: 'shape', content: 'circle', x: centerX + 25 * sizeMult, y: centerY - 20 * sizeMult, size: 20 * sizeMult, color, rotation: 0, isFilled: true });
      items.push({ type: 'shape', content: 'triangle', x: centerX, y: centerY + 5 * sizeMult, size: 25 * sizeMult, color, rotation: 0 });
      items.push({ type: 'shape', content: 'line', x: centerX, y: centerY + 30 * sizeMult, size: 30 * sizeMult, color, rotation: 90 });
    } else { // Abstract Tree
      items.push({ type: 'shape', content: 'triangle', x: centerX, y: centerY - 10 * sizeMult, size: 80 * sizeMult, color, rotation: 0, isFilled: true });
      items.push({ type: 'shape', content: 'triangle', x: centerX, y: centerY - 35 * sizeMult, size: 60 * sizeMult, color, rotation: 0, isFilled: true });
      items.push({ type: 'shape', content: 'square', x: centerX, y: centerY + 25 * sizeMult, size: 30 * sizeMult, color, rotation: 0, isFilled: true });
    }
    return items;
  };

  for (let l = 0; l < 5; l++) {
    const exercises: MemoryExercise[] = [];
    for (let e = 1; e <= 10; e++) {
      const items: MemoryItem[] = [];
      
      const useComposition = l >= 1 && Math.random() > 0.3;

      if (useComposition) {
        items.push(...getComposition(30 + Math.random() * 40, 30 + Math.random() * 40, 1 + (l * 0.2)));
        // Add some noise items for higher levels
        if (l >= 3) {
           for (let i = 0; i < l; i++) {
            items.push({
              type: 'emoji',
              content: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
              x: 10 + Math.random() * 80,
              y: 10 + Math.random() * 80,
              size: 40,
            });
           }
        }
      } else {
        const itemCount = l === 0 ? (e <= 5 ? 1 : 2) : 
                          l === 1 ? (e <= 5 ? 3 : 4) :
                          l === 2 ? (e <= 5 ? 5 : 6) :
                          l === 3 ? (e <= 5 ? 7 : 8) : 10;

        for (let i = 0; i < itemCount; i++) {
          let type: 'shape' | 'emoji' | 'text' = 'shape';
          if (l >= 3) type = Math.random() > 0.3 ? 'emoji' : 'shape';
          if (l === 4) type = Math.random() > 0.5 ? 'emoji' : (Math.random() > 0.5 ? 'text' : 'shape');

          let content = '';
          if (type === 'shape') content = SHAPES[Math.floor(Math.random() * SHAPES.length)];
          else if (type === 'emoji') content = [...EMOJIS, ...FRUITS][Math.floor(Math.random() * (EMOJIS.length + FRUITS.length))];
          else content = Math.floor(Math.random() * 100).toString();

          items.push({
            type,
            content,
            color: type === 'shape' ? COLORS[Math.floor(Math.random() * COLORS.length)] : undefined,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            size: 40 + Math.random() * 40,
            rotation: l >= 2 ? Math.random() * 360 : 0
          });
        }
      }
      exercises.push({ id: e, items });
    }
    levels.push({ difficulty: difficultyNames[l], exercises });
  }
  return levels;
};

const LEVELS = generateExercises();

export default function MemoryGame() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(20);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  const currentLevel = LEVELS[levelIdx];
  const currentExercise = currentLevel.exercises[exerciseIdx];

  const renderItem = (item: MemoryItem, idx: number) => {
    const style = {
      left: `${item.x}%`,
      top: `${item.y}%`,
      transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
      fontSize: `${item.size}px`,
      color: item.color,
      position: 'absolute' as const,
      zIndex: item.content === 'circle' && !item.isFilled ? 10 : 1 // Bring outlines to front
    };

    if (item.type === 'emoji' || item.type === 'text') {
      return <div key={idx} style={style}>{item.content}</div>;
    }

    if (item.type === 'shape') {
      const commonProps = {
        style: {
          width: item.size,
          height: item.size,
          backgroundColor: item.isFilled ? item.color : 'transparent',
          border: !item.isFilled ? `3px solid ${item.color}` : 'none',
        }
      };

      return (
        <div key={idx} style={style}>
          {item.content === 'circle' && (
            <div className="rounded-full" style={{ ...commonProps.style }} />
          )}
          {item.content === 'square' && (
            <div style={{ ...commonProps.style }} />
          )}
          {item.content === 'triangle' && (
            <svg width={item.size} height={item.size} viewBox="0 0 100 100" className="overflow-visible">
              <path 
                d="M 50 0 L 100 100 L 0 100 Z" 
                fill={item.isFilled ? item.color : "none"} 
                stroke={item.color} 
                strokeWidth={item.isFilled ? 0 : 8} 
              />
            </svg>
          )}
          {item.content === 'star' && (
             <div className="flex items-center justify-center" style={{ width: item.size, height: item.size, color: item.color }}>
                <Star size={item.size} fill={item.isFilled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} />
             </div>
          )}
          {item.content === 'pentagon' && (
            <div 
              style={{ 
                ...commonProps.style,
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
              }} 
            />
          )}
          {item.content === 'diamond' && (
             <div 
              style={{ 
                ...commonProps.style,
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }} 
            />
          )}
          {item.content === 'arrow' && (
            <div className="relative flex flex-col items-center justify-center" style={{ width: item.size, height: item.size }}>
              <div 
                style={{ 
                  width: 3, 
                  height: item.size * 0.7, 
                  backgroundColor: item.color 
                }} 
              />
              <div 
                style={{ 
                  width: 0, 
                  height: 0, 
                  borderLeft: `${item.size * 0.25}px solid transparent`,
                  borderRight: `${item.size * 0.25}px solid transparent`,
                  borderBottom: `${item.size * 0.3}px solid ${item.color}`,
                  position: 'absolute',
                  top: 0
                }} 
              />
            </div>
          )}
          {item.content === 'line' && (
            <div 
              style={{ 
                width: item.size, 
                height: 3, 
                backgroundColor: item.color 
              }} 
            />
          )}
          {item.content === 'cross' && (
            <div className="relative" style={{ width: item.size, height: item.size }}>
              <div className="absolute inset-0 m-auto" style={{ width: item.size, height: 3, backgroundColor: item.color }} />
              <div className="absolute inset-0 m-auto" style={{ width: 3, height: item.size, backgroundColor: item.color }} />
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400">
            <Brain size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Memóriajáték</h1>
            <p className="text-slate-500 dark:text-slate-400">Figyeld meg és jegyezd meg az ábrákat!</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          {LEVELS.map((level, idx) => (
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
                {currentExercise.items.map((item, idx) => renderItem(item, idx))}
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
