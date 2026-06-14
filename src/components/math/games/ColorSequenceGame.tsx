import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Brain, 
  Trophy, 
  Play, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Award,
  Sparkles,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

interface ColorSequenceGameProps {
  onBack?: () => void;
}

type GameStatus = 'idle' | 'playing-sequence' | 'player-input' | 'won' | 'lost';
type Difficulty = 'easy' | 'medium' | 'hard' | 'endless';

interface ButtonConfig {
  id: number;
  colorName: string;
  bgClass: string;
  activeBgClass: string;
  glowClass: string;
  borderColor: string;
  freq: number;
  positionStyle: React.CSSProperties;
}

const BUTTON_CONFIGS: ButtonConfig[] = [
  {
    id: 0,
    colorName: 'Zöld',
    bgClass: 'bg-emerald-500 hover:bg-emerald-400',
    activeBgClass: 'bg-emerald-300 ring-4 ring-emerald-300 scale-110 shadow-[0_0_30px_rgba(16,185,129,0.8)]',
    glowClass: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    borderColor: 'border-emerald-600',
    freq: 329.63, // E4
    positionStyle: { top: '15%', left: '50%', transform: 'translate(-50%, -50%)' }
  },
  {
    id: 1,
    colorName: 'Piros',
    bgClass: 'bg-rose-500 hover:bg-rose-400',
    activeBgClass: 'bg-rose-300 ring-4 ring-rose-300 scale-110 shadow-[0_0_30px_rgba(244,63,94,0.8)]',
    glowClass: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]',
    borderColor: 'border-rose-600',
    freq: 261.63, // C4
    positionStyle: { top: '38%', left: '80%', transform: 'translate(-50%, -50%)' }
  },
  {
    id: 2,
    colorName: 'Sárga',
    bgClass: 'bg-amber-400 hover:bg-amber-300',
    activeBgClass: 'bg-amber-200 ring-4 ring-amber-200 scale-110 shadow-[0_0_30px_rgba(251,191,36,0.8)]',
    glowClass: 'shadow-[0_0_15px_rgba(251,191,36,0.3)]',
    borderColor: 'border-amber-500',
    freq: 220.00, // A3
    positionStyle: { top: '75%', left: '68%', transform: 'translate(-50%, -50%)' }
  },
  {
    id: 3,
    colorName: 'Kék',
    bgClass: 'bg-blue-500 hover:bg-blue-400',
    activeBgClass: 'bg-blue-300 ring-4 ring-blue-300 scale-110 shadow-[0_0_30px_rgba(59,130,246,0.8)]',
    glowClass: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    borderColor: 'border-blue-600',
    freq: 164.81, // E3
    positionStyle: { top: '75%', left: '32%', transform: 'translate(-50%, -50%)' }
  },
  {
    id: 4,
    colorName: 'Lila',
    bgClass: 'bg-purple-500 hover:bg-purple-400',
    activeBgClass: 'bg-purple-300 ring-4 ring-purple-300 scale-110 shadow-[0_0_30px_rgba(168,85,247,0.8)]',
    glowClass: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    borderColor: 'border-purple-600',
    freq: 440.00, // A4
    positionStyle: { top: '38%', left: '20%', transform: 'translate(-50%, -50%)' }
  }
];

export default function ColorSequenceGame({ onBack }: ColorSequenceGameProps) {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerIndex, setPlayerIndex] = useState<number>(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [muted, setMuted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('diakzona_color_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Speed of flashing based on difficulty
  const getSpeed = () => {
    switch (difficulty) {
      case 'easy': return { flash: 700, gap: 400 };
      case 'medium': return { flash: 500, gap: 300 };
      case 'hard': return { flash: 350, gap: 200 };
      case 'endless': return { flash: 280, gap: 120 };
    }
  };

  // Length requirement to win
  const getTargetLength = () => {
    switch (difficulty) {
      case 'easy': return 5;
      case 'medium': return 8;
      case 'hard': return 12;
      case 'endless': return Infinity;
    }
  };

  // Play Sound with Web Audio API
  const playTone = useCallback((frequency: number, durationSec = 0.3) => {
    if (muted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      // Resume if suspended (browser security)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + durationSec);
    } catch (e) {
      console.warn("Could not play synthesizer tone:", e);
    }
  }, [muted]);

  // Play a buzzer sound when player fails
  const playBuzzer = useCallback(() => {
    if (muted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.6);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.warn("Buzzer audio error", e);
    }
  }, [muted]);

  // Celebrate win
  const playVictoryFanfare = useCallback(() => {
    if (muted) return;
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    notes.forEach((note, index) => {
      setTimeout(() => {
        playTone(note, 0.4);
      }, index * 120);
    });
  }, [playTone, muted]);

  // Flash a single button (visual + audio)
  const flashButton = useCallback((buttonId: number, duration: number) => {
    const config = BUTTON_CONFIGS[buttonId];
    setActiveButton(buttonId);
    playTone(config.freq, duration / 1000);
    
    setTimeout(() => {
      setActiveButton((current) => current === buttonId ? null : current);
    }, duration);
  }, [playTone]);

  // Start the game
  const startGame = () => {
    // Warm up audio context
    try {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current.resume();
    } catch (e) {}

    setScore(0);
    const firstButton = Math.floor(Math.random() * 5);
    setSequence([firstButton]);
    setPlayerIndex(0);
    setStatus('playing-sequence');
  };

  // Next round
  const startNextRound = (currentSeq: number[]) => {
    const nextButton = Math.floor(Math.random() * 5);
    const newSeq = [...currentSeq, nextButton];
    setSequence(newSeq);
    setPlayerIndex(0);
    setStatus('playing-sequence');
  };

  // Play the sequence to the user
  useEffect(() => {
    if (status !== 'playing-sequence' || sequence.length === 0) return;

    const { flash, gap } = getSpeed();
    let index = 0;

    const intervalId = setInterval(() => {
      if (index >= sequence.length) {
        clearInterval(intervalId);
        setStatus('player-input');
        return;
      }

      flashButton(sequence[index], flash);
      index++;
    }, flash + gap);

    return () => clearInterval(intervalId);
  }, [status, sequence, difficulty, flashButton]);

  // Handle player clicking a button
  const handleButtonClick = (buttonId: number) => {
    if (status !== 'player-input' || activeButton !== null) return;

    // Flash & play tone
    flashButton(buttonId, 250);

    const isCorrect = buttonId === sequence[playerIndex];

    if (isCorrect) {
      const nextIndex = playerIndex + 1;
      
      // If completed sequence for the current round
      if (nextIndex === sequence.length) {
        const nextScore = score + 1;
        setScore(nextScore);

        // Update highscore if needed
        if (nextScore > highScore) {
          setHighScore(nextScore);
          localStorage.setItem('diakzona_color_highscore', nextScore.toString());
        }

        // Check if won
        const target = getTargetLength();
        if (nextScore >= target) {
          setStatus('won');
          playVictoryFanfare();
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
          // Pause slightly before playing next round
          setStatus('playing-sequence'); // set temporary to block clicks
          setTimeout(() => {
            startNextRound(sequence);
          }, 800);
        }
      } else {
        setPlayerIndex(nextIndex);
      }
    } else {
      // Wrong button
      setStatus('lost');
      playBuzzer();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="rounded-xl hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-all font-bold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vissza a játékokhoz
        </Button>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMuted(!muted)}
            className="rounded-xl border-slate-200 dark:border-slate-800"
          >
            {muted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Trophy size={16} className="text-amber-500" />
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">
              Legjobb: {highScore} pont
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout Card */}
      <Card className="p-6 md:p-8 rounded-[2.5rem] border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-950 overflow-hidden relative max-w-2xl mx-auto">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Brain size={180} className="text-indigo-600" />
        </div>

        {status === 'idle' ? (
          /* Intro / Settings Screen */
          <div className="text-center py-6 animate-in fade-in duration-300">
            <div className="inline-flex p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-3xl text-indigo-600 dark:text-indigo-400 mb-6 border border-indigo-100 dark:border-indigo-900/40">
              <Brain size={48} className="animate-pulse" />
            </div>

            <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight mb-2">
              SZÍN-SORREND <span className="text-indigo-600 dark:text-indigo-400">MEMÓRIA</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto mb-8 text-sm md:text-base">
              Jegyezd meg a gombok felvillanásának sorrendjét, majd ismételd meg pontosan ugyanúgy! Fejleszd a vizuális memóriád!
            </p>

            {/* Difficulty selector */}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6 border border-slate-100 dark:border-slate-900 max-w-sm mx-auto mb-8">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                Nehézségi szint
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'easy', label: 'Könnyű', desc: '5 gomb / Lassú' },
                  { id: 'medium', label: 'Közepes', desc: '8 gomb / Normál' },
                  { id: 'hard', label: 'Nehéz', desc: '12 gomb / Gyors' },
                  { id: 'endless', label: 'Végtelen', desc: 'Végtelen / Nagyon gyors' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setDifficulty(mode.id as Difficulty)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all text-left",
                      difficulty === mode.id 
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 font-bold" 
                        : "border-slate-100 dark:border-slate-900 hover:border-slate-200 dark:hover:border-slate-800 hover:bg-slate-50/50"
                    )}
                  >
                    <span className="text-sm font-bold">{mode.label}</span>
                    <span className="text-[9px] text-slate-400 font-medium mt-1">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              onClick={startGame}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl px-10 py-6 text-base shadow-lg shadow-indigo-100 dark:shadow-none hover:scale-105 transition-all"
            >
              <Play className="w-5 h-5 mr-2" />
              Játék Indítása
            </Button>
          </div>
        ) : (
          /* Game Active Screen */
          <div className="flex flex-col items-center animate-in fade-in duration-500">
            {/* Round info & Progress */}
            <div className="w-full flex items-center justify-between mb-8 border-b border-slate-100 dark:border-slate-900 pb-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Nehézség</span>
                <span className="text-sm font-black text-slate-700 dark:text-slate-300">
                  {difficulty === 'easy' ? 'Könnyű' : difficulty === 'medium' ? 'Közepes' : difficulty === 'hard' ? 'Nehéz' : 'Végtelen'}
                </span>
              </div>

              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Sorozat</span>
                <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                  {score} / {getTargetLength() === Infinity ? '∞' : getTargetLength()}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Állapot</span>
                <span className={cn(
                  "text-sm font-bold",
                  status === 'playing-sequence' ? "text-amber-500 animate-pulse" : "text-emerald-500"
                )}>
                  {status === 'playing-sequence' ? 'Figyelj!' : 'Te jössz!'}
                </span>
              </div>
            </div>

            {/* Circular / Star button container */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 my-4 bg-slate-50 dark:bg-slate-900/40 rounded-full border border-slate-100 dark:border-slate-900 shadow-inner flex items-center justify-center">
              
              {/* Star buttons */}
              {BUTTON_CONFIGS.map((button) => {
                const isActive = activeButton === button.id;
                return (
                  <button
                    key={button.id}
                    disabled={status !== 'player-input'}
                    onClick={() => handleButtonClick(button.id)}
                    style={button.positionStyle}
                    className={cn(
                      "absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 cursor-pointer transition-all duration-150 flex items-center justify-center",
                      button.borderColor,
                      isActive ? button.activeBgClass : cn(button.bgClass, button.glowClass, "shadow-md hover:scale-105 active:scale-95"),
                      status !== 'player-input' && !isActive && "opacity-75 cursor-not-allowed"
                    )}
                  >
                    <span className="sr-only">{button.colorName}</span>
                  </button>
                );
              })}

              {/* Central Circle */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full absolute bg-slate-950/90 border border-slate-800 flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl z-10 text-white select-none">
                <Brain className="w-5 h-5 text-indigo-400 mb-1 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Szint</span>
                <span className="text-2xl font-black">{score + 1}</span>
              </div>
            </div>

            {/* In-game Endings (overlay overlaying the card content if won or lost) */}
            {status === 'won' && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-30 flex flex-col items-center justify-center text-center p-6 rounded-[2.5rem] animate-in fade-in duration-300">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 animate-bounce border-2 border-emerald-500">
                  <Award className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">GRATULÁLOK!</h2>
                <p className="text-slate-300 font-medium max-w-sm mb-8">
                  Sikeresen megismételted a(z) <span className="text-emerald-400 font-bold">{getTargetLength()}</span> elemből álló szín-szekvenciát a {difficulty === 'easy' ? 'Könnyű' : difficulty === 'medium' ? 'Közezepes' : 'Nehéz'} szinten!
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={startGame}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl px-6 py-5 shadow-lg"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Újra
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setStatus('idle')}
                    className="border-slate-800 text-slate-300 hover:bg-slate-900 rounded-2xl px-6 py-5"
                  >
                    Vissza a lobbiba
                  </Button>
                </div>
              </div>
            )}

            {status === 'lost' && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-30 flex flex-col items-center justify-center text-center p-6 rounded-[2.5rem] animate-in fade-in duration-300">
                <div className="w-20 h-20 bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-6 border-2 border-rose-500">
                  <Zap className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-rose-500 mb-2 tracking-tight">VÉGE A JÁTÉKNAK</h2>
                <p className="text-slate-300 font-medium max-w-sm mb-2">
                  Eltévesztetted a mintát!
                </p>
                <p className="text-sm text-slate-400 mb-8">
                  Elért eredményed: <span className="text-indigo-400 font-bold">{score} kör</span> a(z) {difficulty === 'easy' ? 'Könnyű' : difficulty === 'medium' ? 'Közezepes' : difficulty === 'hard' ? 'Nehéz' : 'Végtelen'} szinten.
                </p>
                <div className="flex gap-4">
                  <Button
                    onClick={startGame}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl px-6 py-5 shadow-lg"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Újrakezdés
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setStatus('idle')}
                    className="border-slate-800 text-slate-300 hover:bg-slate-900 rounded-2xl px-6 py-5"
                  >
                    Beállítások
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Helpful memory tips card */}
      <Card className="mt-8 p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-md bg-white dark:bg-slate-950 max-w-2xl mx-auto flex gap-4 items-start">
        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-2xl flex-shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Emlékezet-tipp tanároknak és diákoknak</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            A vizuális memóriajátékok segítenek fejleszteni az agy rövid távú munkamemóriáját. Képzelj el egy formát vagy dallamot, miközben felvillannak a színek – a ritmusok és geometriai sémák megalkotása sokkal könnyebbé teszi a hosszabb sorozatok megjegyzését!
          </p>
        </div>
      </Card>
    </div>
  );
}
