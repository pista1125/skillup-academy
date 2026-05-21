import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AnalogClockToolProps {
  onBack: () => void;
}

type ClockMode = 'practice' | 'read' | 'set';
type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export function AnalogClockTool({ onBack }: AnalogClockToolProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [mode, setMode] = useState<ClockMode>('practice');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  
  // Time state
  const [hours, setHours] = useState<number>(10);
  const [minutes, setMinutes] = useState<number>(10);
  
  // Custom display options
  const [showDigital, setShowDigital] = useState<boolean>(true);
  const [showMinuteTicks, setShowMinuteTicks] = useState<boolean>(true);
  const [showMinuteLabels, setShowMinuteLabels] = useState<boolean>(false);
  const [isAmPm, setIsAmPm] = useState<boolean>(false); // 12h or 24h digital display
  
  // Dragging states
  const [draggingHand, setDraggingHand] = useState<'hour' | 'minute' | null>(null);
  const clockRef = useRef<SVGSVGElement>(null);
  
  // Quiz states
  const [targetHours, setTargetHours] = useState<number>(0);
  const [targetMinutes, setTargetMinutes] = useState<number>(0);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);

  // Sound state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Format digital time
  const formatTime = useCallback((h: number, m: number) => {
    let dispH = h;
    let suffix = '';
    if (isAmPm) {
      suffix = h >= 12 ? ' PM' : ' AM';
      dispH = h % 12;
      if (dispH === 0) dispH = 12;
    }
    const hStr = dispH.toString().padStart(2, '0');
    const mStr = m.toString().padStart(2, '0');
    return `${hStr}:${mStr}${suffix}`;
  }, [isAmPm]);

  // Play tick or success sound using Web Audio API
  const playSound = (type: 'tick' | 'success' | 'fail') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'tick') {
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'fail') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (e) {
      console.warn('Audio not supported or blocked', e);
    }
  };

  // Generate a random time according to difficulty
  const generateRandomTime = useCallback(() => {
    let h = Math.floor(Math.random() * 12) + 1; // 1-12 range
    // PM adjustment
    if (Math.random() > 0.5) h += 12; // 13-24 range
    if (h === 24) h = 0; // 0-23
    
    let m = 0;
    if (difficulty === 'easy') {
      // Whole hours or half hours
      m = Math.random() > 0.5 ? 0 : 30;
    } else if (difficulty === 'medium') {
      // Quarters: 0, 15, 30, 45
      const quarters = [0, 15, 30, 45];
      m = quarters[Math.floor(Math.random() * quarters.length)];
    } else if (difficulty === 'hard') {
      // 5 minute intervals
      m = Math.floor(Math.random() * 12) * 5;
    } else {
      // 1 minute intervals
      m = Math.floor(Math.random() * 60);
    }
    return { h, m };
  }, [difficulty]);

  // Start new quiz round
  const startNewQuizQuestion = useCallback(() => {
    const { h, m } = generateRandomTime();
    setTargetHours(h);
    setTargetMinutes(m);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);

    if (mode === 'read') {
      // Set the analog clock to target time
      setHours(h);
      setMinutes(m);
      
      // Generate multiple choice options
      const correctText = formatTime(h, m);
      const options = [correctText];
      
      while (options.length < 4) {
        let diffH = h + Math.floor(Math.random() * 5) - 2;
        if (diffH < 0) diffH += 24;
        diffH = diffH % 24;
        
        let diffM = m;
        if (difficulty === 'easy') {
          diffM = Math.random() > 0.5 ? 0 : 30;
        } else if (difficulty === 'medium') {
          diffM = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
        } else if (difficulty === 'hard') {
          diffM = (m + (Math.floor(Math.random() * 5) - 2) * 5 + 60) % 60;
        } else {
          diffM = (m + Math.floor(Math.random() * 20) - 10 + 60) % 60;
        }
        
        const optionText = formatTime(diffH, diffM);
        if (!options.includes(optionText)) {
          options.push(optionText);
        }
      }
      
      // Shuffle options
      setQuizOptions(options.sort(() => Math.random() - 0.5));
    } else if (mode === 'set') {
      // Set analog clock to a default random time different from target
      let startH = (h + 6) % 12 || 12;
      let startM = (m + 30) % 60;
      setHours(startH);
      setMinutes(startM);
    }
  }, [mode, difficulty, generateRandomTime, formatTime]);

  // Restart quiz when mode changes
  useEffect(() => {
    if (mode !== 'practice') {
      setScore(0);
      setTotalQuestions(0);
      startNewQuizQuestion();
    }
  }, [mode, difficulty, startNewQuizQuestion]);



  // Helper to handle quick adjustments
  const adjustTime = (type: 'hour' | 'minute', amount: number) => {
    if (type === 'hour') {
      setHours(prev => {
        let newH = (prev + amount) % 24;
        if (newH < 0) newH += 24;
        return newH;
      });
    } else {
      setMinutes(prev => {
        let newM = (prev + amount) % 60;
        if (newM < 0) {
          newM += 60;
          // also roll back hour
          setHours(hPrev => (hPrev - 1 + 24) % 24);
        } else if (prev + amount >= 60) {
          // roll forward hour
          setHours(hPrev => (hPrev + 1) % 24);
        }
        return newM % 60;
      });
    }
    playSound('tick');
  };

  // Mouse/Touch drag calculation
  const handlePointerDown = (hand: 'hour' | 'minute') => {
    if (mode === 'read') return; // Cannot drag in read-time mode (you read, not set)
    setDraggingHand(hand);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement> | PointerEvent) => {
    if (!draggingHand || !clockRef.current) return;
    
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Pointer coordinate
    const clientX = 'touches' in e ? (e as any).touches[0].clientX : (e as any).clientX;
    const clientY = 'touches' in e ? (e as any).touches[0].clientY : (e as any).clientY;
    
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    
    // Angle in degrees from top (12 o'clock is 0 deg)
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    
    if (draggingHand === 'minute') {
      // Each minute is 6 degrees
      let newMin = Math.round(angle / 6) % 60;
      if (newMin !== minutes) {
        // Detect crossing 12 o'clock line (0 mins)
        if (minutes >= 45 && newMin <= 15) {
          // Clockwise cross: increment hour
          setHours(h => (h + 1) % 24);
        } else if (minutes <= 15 && newMin >= 45) {
          // Counter-clockwise cross: decrement hour
          setHours(h => (h - 1 + 24) % 24);
        }
        setMinutes(newMin);
        playSound('tick');
      }
    } else if (draggingHand === 'hour') {
      // Each hour is 30 degrees (360/12)
      let newHour12 = Math.round(angle / 30) % 12;
      if (newHour12 === 0) newHour12 = 12;
      
      // Keep current AM/PM status
      const isPm = hours >= 12;
      const finalHour = isPm ? (newHour12 === 12 ? 12 : newHour12 + 12) : (newHour12 === 12 ? 0 : newHour12);
      
      if (finalHour !== hours) {
        setHours(finalHour);
        playSound('tick');
      }
    }
  };

  const handlePointerUp = () => {
    setDraggingHand(null);
  };

  useEffect(() => {
    if (draggingHand) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [draggingHand, hours, minutes]);

  // Quiz evaluation: Read Time
  const handleAnswerSubmit = (option: string) => {
    if (isAnswerCorrect !== null) return; // already answered
    setSelectedAnswer(option);
    const correctText = formatTime(targetHours, targetMinutes);
    const isCorrect = option === correctText;
    setIsAnswerCorrect(isCorrect);
    
    setTotalQuestions(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('success');
    } else {
      playSound('fail');
    }
  };

  // Quiz evaluation: Set Time
  const checkSetTimeAnswer = () => {
    // Check match
    // Hour hands match if both represent the same 12h position, and minutes match
    const target12 = targetHours % 12;
    const current12 = hours % 12;
    
    const isCorrect = target12 === current12 && targetMinutes === minutes;
    setIsAnswerCorrect(isCorrect);
    setTotalQuestions(prev => prev + 1);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('success');
    } else {
      playSound('fail');
    }
  };

  // Angles for rendering hands
  const minuteAngle = minutes * 6; // 360 / 60
  const hourAngle = (hours % 12) * 30 + minutes * 0.5; // 30 degrees per hour, 0.5 degrees per minute

  // Hour numerals coordinates
  const getCoordinatesForNumber = (num: number, radius: number) => {
    // 12 is at the top (0 deg)
    // 1 is at 30 deg, 2 at 60 deg, etc.
    const angleRad = (num * 30 - 90) * (Math.PI / 180);
    const x = 150 + radius * Math.cos(angleRad);
    const y = 150 + radius * Math.sin(angleRad);
    return { x, y };
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 flex flex-col bg-slate-50 overflow-hidden select-none z-50">
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm z-30 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} size="sm" className="rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vissza
          </Button>
          <div className="h-8 w-px bg-slate-200" />
          <h1 className="text-lg font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Számlapos Óra
          </h1>
        </div>

        {/* Sound toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="rounded-full hover:bg-slate-100 text-slate-500"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-red-500" />}
          </Button>
        </div>
      </header>

      {/* Main Workspace split */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Clock Control Panel */}
        <div className="w-full md:w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto p-6 gap-6">
          {/* Modes */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Mód kiválasztása</span>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant={mode === 'practice' ? 'default' : 'outline'}
                onClick={() => setMode('practice')}
                className="justify-start font-bold rounded-xl"
              >
                🎓 Szabad játék
              </Button>
              <Button
                variant={mode === 'read' ? 'default' : 'outline'}
                onClick={() => setMode('read')}
                className="justify-start font-bold rounded-xl"
              >
                📖 Idő leolvasása
              </Button>
              <Button
                variant={mode === 'set' ? 'default' : 'outline'}
                onClick={() => setMode('set')}
                className="justify-start font-bold rounded-xl"
              >
                ✏️ Óra beállítása
              </Button>
            </div>
          </div>

          {/* Difficulty (Quiz modes only) */}
          {mode !== 'practice' && (
            <div className="flex flex-col gap-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Nehézségi szint</span>
              <div className="grid grid-cols-2 gap-2">
                {(['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map(diff => (
                  <Button
                    key={diff}
                    variant={difficulty === diff ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDifficulty(diff)}
                    className="font-bold rounded-lg text-xs uppercase"
                  >
                    {diff === 'easy' && 'Könnyű'}
                    {diff === 'medium' && 'Közepes'}
                    {diff === 'hard' && 'Nehéz'}
                    {diff === 'expert' && 'Profi'}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Visual settings */}
          <div className="flex flex-col gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Megjelenítési opciók</span>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showMinuteTicks}
                onChange={e => setShowMinuteTicks(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 border-slate-300"
              />
              <span className="text-sm font-bold text-slate-600">Perc osztások</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showMinuteLabels}
                onChange={e => setShowMinuteLabels(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 border-slate-300"
              />
              <span className="text-sm font-bold text-slate-600">Perc feliratok (5-60)</span>
            </label>

            {mode === 'practice' && (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDigital}
                  onChange={e => setShowDigital(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 border-slate-300"
                />
                <span className="text-sm font-bold text-slate-600">Digitális óra kijelzése</span>
              </label>
            )}

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isAmPm}
                onChange={e => setIsAmPm(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 border-slate-300"
              />
              <span className="text-sm font-bold text-slate-600">de./du. kijelzés (12 órás)</span>
            </label>
          </div>

          {/* Quick Adjust Buttons (Free play mode only) */}
          {mode === 'practice' && (
            <div className="flex flex-col gap-2 mt-auto">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider text-center">Idő beállítása gombokkal</span>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => adjustTime('hour', -1)} className="flex-1 font-bold">-1ó</Button>
                <Button variant="outline" size="sm" onClick={() => adjustTime('hour', 1)} className="flex-1 font-bold">+1ó</Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => adjustTime('minute', -5)} className="flex-1 font-bold">-5p</Button>
                <Button variant="outline" size="sm" onClick={() => adjustTime('minute', 5)} className="flex-1 font-bold">+5p</Button>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => adjustTime('minute', -1)} className="flex-1 font-bold">-1p</Button>
                <Button variant="outline" size="sm" onClick={() => adjustTime('minute', 1)} className="flex-1 font-bold">+1p</Button>
              </div>
            </div>
          )}

          {/* Quiz Score card */}
          {mode !== 'practice' && (
            <div className="mt-auto bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-amber-500" />
                <div>
                  <span className="text-xs font-black text-slate-400 uppercase">Eredményed</span>
                  <div className="text-lg font-black text-slate-700">{score} / {totalQuestions}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => { setScore(0); setTotalQuestions(0); startNewQuizQuestion(); }}
                className="text-slate-400 hover:text-slate-600 rounded-xl"
                title="Eredmények nullázása"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Clock and Quiz Space */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-50 relative overflow-y-auto">
          
          {/* Target for Set Time mode */}
          {mode === 'set' && (
            <div className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2.5 rounded-2xl shadow-lg flex flex-col items-center gap-1 animate-bounce">
              <span className="text-xs uppercase font-black tracking-widest opacity-80">Állítsd be ezt az időt!</span>
              <span className="text-4xl font-black">{formatTime(targetHours, targetMinutes)}</span>
            </div>
          )}

          {/* Main clock container */}
          <div className="relative w-72 h-72 sm:w-[340px] sm:h-[340px] bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-slate-100 p-2 select-none">
            
            {/* The SVG clock dial */}
            <svg
              ref={clockRef}
              viewBox="0 0 300 300"
              className="w-full h-full cursor-pointer select-none"
              onPointerDown={(e) => {
                // Determine if we clicked near minute tip or hour tip, otherwise drag dial if allowed
                // But handles are simpler: we put interactive circles on hand tips!
              }}
            >
              {/* Clock face outer circle */}
              <circle cx="150" cy="150" r="140" fill="#ffffff" stroke="#f1f5f9" strokeWidth="2" />
              <circle cx="150" cy="150" r="135" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              
              {/* Minute ticks */}
              {showMinuteTicks && Array.from({ length: 60 }).map((_, i) => {
                if (i % 5 === 0) return null; // Hour ticks rendered separately
                const angle = i * 6;
                return (
                  <line
                    key={i}
                    x1="150"
                    y1="16"
                    x2="150"
                    y2="20"
                    transform={`rotate(${angle} 150 150)`}
                    stroke="#cbd5e1"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Hour ticks */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = i * 30;
                return (
                  <line
                    key={i}
                    x1="150"
                    y1="14"
                    x2="150"
                    y2="24"
                    transform={`rotate(${angle} 150 150)`}
                    stroke="#475569"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Minute numbers (5, 10, 15... 60) on outer rim */}
              {showMinuteLabels && Array.from({ length: 12 }).map((_, i) => {
                const num = i === 0 ? 12 : i;
                const minVal = num * 5;
                const coords = getCoordinatesForNumber(num, 126);
                return (
                  <text
                    key={`min-${num}`}
                    x={coords.x}
                    y={coords.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[9px] font-black text-green-600 fill-current"
                  >
                    {minVal}
                  </text>
                );
              })}

              {/* Hour numbers (1-12) */}
              {Array.from({ length: 12 }).map((_, i) => {
                const num = i + 1;
                const coords = getCoordinatesForNumber(num, 106);
                return (
                  <text
                    key={`hour-${num}`}
                    x={coords.x}
                    y={coords.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-lg font-black text-slate-800 fill-current select-none"
                  >
                    {num}
                  </text>
                );
              })}

              {/* Hour hand shadow */}
              <line
                x1="150"
                y1="150"
                x2="150"
                y2="95"
                transform={`rotate(${hourAngle} 150 150)`}
                stroke="#000000"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.05"
              />

              {/* Hour Hand */}
              <line
                x1="150"
                y1="150"
                x2="150"
                y2="95"
                transform={`rotate(${hourAngle} 150 150)`}
                stroke="#334155"
                strokeWidth="7.5"
                strokeLinecap="round"
              />
              
              {/* Minute Hand */}
              <line
                x1="150"
                y1="150"
                x2="150"
                y2="65"
                transform={`rotate(${minuteAngle} 150 150)`}
                stroke="#16a34a"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Central pin design */}
              <circle cx="150" cy="150" r="8" fill="#16a34a" />
              <circle cx="150" cy="150" r="3" fill="#ffffff" />

              {/* Interactive drag areas at tips */}
              {mode !== 'read' && (
                <>
                  {/* Hour hand tip handle */}
                  <g transform={`rotate(${hourAngle} 150 150)`} className="cursor-grab active:cursor-grabbing">
                    <circle
                      cx="150"
                      cy="95"
                      r="16"
                      fill="transparent"
                      onPointerDown={(e) => { e.stopPropagation(); handlePointerDown('hour'); }}
                    />
                    <circle
                      cx="150"
                      cy="95"
                      r="5"
                      fill="#334155"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="pointer-events-none"
                    />
                  </g>

                  {/* Minute hand tip handle */}
                  <g transform={`rotate(${minuteAngle} 150 150)`} className="cursor-grab active:cursor-grabbing">
                    <circle
                      cx="150"
                      cy="65"
                      r="18"
                      fill="transparent"
                      onPointerDown={(e) => { e.stopPropagation(); handlePointerDown('minute'); }}
                    />
                    <circle
                      cx="150"
                      cy="65"
                      r="5"
                      fill="#16a34a"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="pointer-events-none"
                    />
                  </g>
                </>
              )}
            </svg>
          </div>

          {/* Display digital clock overlay under clock if enabled */}
          {mode === 'practice' && (
            <div className="mt-4 h-10 flex items-center justify-center">
              {showDigital ? (
                <div className="bg-slate-900/95 backdrop-blur text-emerald-400 font-mono text-xl px-4 py-1.5 rounded-full border border-slate-800 shadow-xl tracking-wider select-text flex items-center gap-2 animate-in fade-in duration-200">
                  <span>{formatTime(hours, minutes)}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowDigital(false)}
                    className="h-5 w-5 text-slate-500 hover:text-white rounded-full p-0"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDigital(true)}
                  className="bg-white border shadow hover:bg-slate-50 rounded-full h-8 px-3 font-bold text-xs animate-in fade-in duration-200"
                >
                  <Eye className="w-3.5 h-3.5 mr-1" /> Digitális mutatása
                </Button>
              )}
            </div>
          )}

          {/* Quiz Actions and feedbacks */}
          {mode === 'read' && (
            <div className="mt-4 w-full max-w-md flex flex-col gap-3">
              <span className="text-center text-sm font-bold text-slate-500">Melyik időt mutatja a számlapos óra?</span>
              <div className="grid grid-cols-2 gap-3">
                {quizOptions.map(option => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = option === formatTime(targetHours, targetMinutes);
                  return (
                    <Button
                      key={option}
                      variant={isSelected ? (isAnswerCorrect ? 'default' : 'destructive') : 'outline'}
                      onClick={() => handleAnswerSubmit(option)}
                      className={cn(
                        "h-14 text-lg font-black rounded-2xl border-2 transition-all",
                        isAnswerCorrect !== null && isCorrectAnswer && "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-500",
                        isAnswerCorrect !== null && isSelected && !isAnswerCorrect && "bg-red-500 text-white border-red-500 hover:bg-red-500"
                      )}
                      disabled={isAnswerCorrect !== null}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>

              {isAnswerCorrect !== null && (
                <div className="flex flex-col items-center mt-4 gap-2 animate-in fade-in zoom-in duration-300">
                  {isAnswerCorrect ? (
                    <div className="text-emerald-600 font-bold text-lg flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6" /> Helyes válasz!
                    </div>
                  ) : (
                    <div className="text-red-500 font-bold text-lg flex items-center gap-2">
                      <XCircle className="w-6 h-6" /> Helytelen válasz! A helyes: {formatTime(targetHours, targetMinutes)}
                    </div>
                  )}
                  <Button onClick={startNewQuizQuestion} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl mt-2 px-8">
                    Következő feladat
                  </Button>
                </div>
              )}
            </div>
          )}

          {mode === 'set' && (
            <div className="mt-4 w-full max-w-sm flex flex-col items-center gap-3">
              {isAnswerCorrect === null ? (
                <Button
                  onClick={checkSetTimeAnswer}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-lg rounded-2xl shadow-lg"
                >
                  Ellenőrzés
                </Button>
              ) : (
                <div className="flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300 w-full">
                  {isAnswerCorrect ? (
                    <div className="text-emerald-600 font-bold text-lg flex items-center gap-2">
                      <CheckCircle2 className="w-6 h-6" /> Helyesen állítottad be!
                    </div>
                  ) : (
                    <div className="text-red-500 font-bold text-lg flex items-center gap-2 text-center">
                      <XCircle className="w-6 h-6" /> Nem stimmel. Pontosan a megadott időt állítsd be!
                    </div>
                  )}
                  <div className="flex gap-2 w-full">
                    {!isAnswerCorrect && (
                      <Button variant="outline" onClick={() => setIsAnswerCorrect(null)} className="flex-1 font-bold rounded-xl h-12">
                        Próbálkozás újra
                      </Button>
                    )}
                    <Button onClick={startNewQuizQuestion} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl h-12">
                      Következő feladat
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>,
    document.body
  );
}
