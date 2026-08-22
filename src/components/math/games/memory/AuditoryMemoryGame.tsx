import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Brain, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  RotateCcw, 
  Target,
  ListRestart,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AUDITORY_LEVELS } from '@/data/auditoryMemoryData';

export default function AuditoryMemoryGame() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [taskIdx, setTaskIdx] = useState(0);
  const [gameState, setGameState] = useState<'selection' | 'playing' | 'finished'>('selection');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  
  const currentLevel = AUDITORY_LEVELS[levelIdx];
  const currentTask = currentLevel.tasks[taskIdx];

  const handleStartTask = () => {
    setGameState('playing');
    setCurrentQuestionIdx(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < currentTask.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setGameState('finished');
    }
  };

  const handleRestartTask = () => {
    setGameState('playing');
    setCurrentQuestionIdx(0);
  };

  const handleBackToSelection = () => {
    setGameState('selection');
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-white dark:border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl text-amber-600 dark:text-amber-400">
            <Brain size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Hallás utáni memóriajáték</h1>
            <p className="text-slate-500 dark:text-slate-400">Jegyezd meg a válaszokat és írd le őket a végén!</p>
          </div>
        </div>
        
        {gameState === 'selection' && (
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            {AUDITORY_LEVELS.map((level, idx) => (
              <button
                key={idx}
                onClick={() => { setLevelIdx(idx); setTaskIdx(0); }}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  levelIdx === idx 
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-200 dark:shadow-none scale-105" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                )}
              >
                {level.level}. szint
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar / Level Selection */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Card className="p-6 rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg flex flex-col gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Műveletsor választó</h3>
              <div className="grid grid-cols-5 gap-2">
                {currentLevel.tasks.map((task, idx) => (
                  <button
                    key={idx}
                    disabled={gameState !== 'selection'}
                    onClick={() => { setTaskIdx(idx); }}
                    className={cn(
                      "aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all border",
                      taskIdx === idx
                        ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-100 dark:shadow-none scale-110"
                        : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800",
                      gameState !== 'selection' && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="text-center mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Aktuális szint</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{currentLevel.title}</p>
              </div>
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-xl"
                  disabled={taskIdx === 0 || gameState !== 'selection'}
                  onClick={() => setTaskIdx(prev => prev - 1)}
                >
                  <ChevronLeft size={20} />
                </Button>
                <span className="text-sm font-bold text-slate-500">
                  {taskIdx + 1} / 10
                </span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-xl"
                  disabled={taskIdx === 9 || gameState !== 'selection'}
                  onClick={() => setTaskIdx(prev => prev + 1)}
                >
                  <ChevronRight size={20} />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Game Area */}
        <div className="lg:col-span-3">
          <Card className="min-h-[450px] aspect-[4/3] rounded-[2rem] border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center group">
            <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            
            {gameState === 'selection' && (
              <div className="flex flex-col items-center gap-8 relative z-10 p-12 text-center animate-in zoom-in duration-300">
                <div className="p-8 bg-white dark:bg-slate-800 rounded-full shadow-2xl shadow-amber-200 dark:shadow-none border border-slate-100 dark:border-slate-700">
                  <Play size={80} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{taskIdx + 1}. Műveletsor</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md">
                    Készen állsz? A tanár felolvas 5 kérdést. Jegyezd meg az eredményeket, és a végén írd le őket!
                  </p>
                </div>
                <Button onClick={handleStartTask} className="rounded-2xl px-12 h-14 text-lg bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-200 dark:shadow-none font-bold gap-3">
                  <Play size={24} />
                  Indítás
                </Button>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="flex flex-col items-center gap-12 relative z-10 w-full max-w-2xl px-8 animate-in slide-in-from-bottom duration-500">
                 {/* Question Card */}
                 <div className="w-full bg-white dark:bg-slate-800 p-12 rounded-[2.5rem] shadow-2xl border border-amber-100 dark:border-amber-900 flex flex-col items-center text-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-slate-100 dark:bg-slate-700">
                       <div 
                        className="h-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${((currentQuestionIdx + 1) / currentTask.questions.length) * 100}%` }}
                       />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                       {Array.from({ length: currentTask.questions.length }).map((_, i) => (
                          <div 
                            key={i}
                            className={cn(
                              "w-3 h-3 rounded-full transition-all duration-300",
                              i < currentQuestionIdx ? "bg-amber-500 scale-90" : 
                              i === currentQuestionIdx ? "bg-amber-600 scale-125 shadow-md shadow-amber-200" : 
                              "bg-slate-200 dark:bg-slate-700"
                            )}
                          />
                       ))}
                    </div>

                    <div className="flex flex-col gap-2">
                       <span className="text-sm font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">{currentQuestionIdx + 1}. kérdés</span>
                       <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white leading-tight">
                         {currentTask.questions[currentQuestionIdx]}
                       </h2>
                    </div>

                    <Button onClick={handleNextQuestion} size="lg" className="rounded-2xl px-10 h-16 text-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 font-bold gap-3 mt-4">
                       {currentQuestionIdx === currentTask.questions.length - 1 ? "Befejezés" : "Következő kérdés"}
                       <ChevronRight size={24} />
                    </Button>
                 </div>

                 <p className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-2">
                    <Target size={18} />
                    Figyelj jól és jegyezd meg a választ!
                 </p>
              </div>
            )}

            {gameState === 'finished' && (
              <div className="flex flex-col items-center gap-8 relative z-10 p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="p-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full shadow-2xl shadow-emerald-200 dark:shadow-none border border-emerald-100 dark:border-emerald-900">
                  <CheckCircle2 size={80} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Vége a feladatsornak!</h3>
                  <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl mb-8 flex flex-col gap-4">
                     <p className="text-xl font-bold text-slate-700 dark:text-slate-200">
                        Most írd le az 5 választ a papírodra!
                     </p>
                     <div className="flex justify-center gap-3">
                        {[1,2,3,4,5].map(n => (
                           <div key={n} className="w-12 h-12 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 font-bold">
                              {n}.
                           </div>
                        ))}
                     </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleBackToSelection} className="rounded-2xl px-8 h-12 font-bold gap-2">
                    <ListRestart size={20} />
                    Vissza a választáshoz
                  </Button>
                  <Button onClick={handleRestartTask} className="rounded-2xl px-8 h-12 bg-amber-600 hover:bg-amber-700 font-bold gap-2">
                    <RotateCcw size={20} />
                    Újrakezdés
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
