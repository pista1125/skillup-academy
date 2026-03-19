import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Trophy,
  Calendar,
  ChevronRight,
  BookOpen,
  Target,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';
import { COMPETENCY_DATA, MonthlyCompetency, CompetencyTask } from '@/data/competencyData';
import { notoSansRegularBase64 } from '@/assets/fonts/NotoSans-Regular-base64';
import { notoSansBoldBase64 } from '@/assets/fonts/NotoSans-Bold-base64';

interface CompetencyAssessmentProps {
  onBack: () => void;
  grade: number;
}

export function CompetencyAssessment({ onBack, grade }: CompetencyAssessmentProps) {
  const gradeData = COMPETENCY_DATA[grade] || [];
  const [selectedMonth, setSelectedMonth] = useState<MonthlyCompetency | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResultsSummary, setShowResultsSummary] = useState(false);
  const [score, setScore] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleMonthSelect = (month: MonthlyCompetency) => {
    setSelectedMonth(month);
    setCurrentStep(0);
    setAnswers({});
    setIsSubmitted(false);
    setShowResultsSummary(false);
    setScore(0);
    window.scrollTo(0, 0);
  };

  const handleAnswerChange = (taskId: string, answer: any) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [taskId]: answer }));
  };

  const handleSubmit = () => {
    if (!selectedMonth) return;
    
    let currentScore = 0;
    selectedMonth.tasks.forEach(task => {
      const userAnswer = answers[task.id];
      if (task.type === 'matching') {
        // For matching, we check if all pairs are filled
        // In this version, we simplify: if they at least attempted it
        // Or check against task.pairs?
        let allCorrect = true;
        task.pairs?.forEach(pair => {
            if (String(answers[`${task.id}-${pair.id}`]).trim() !== String(pair.right).trim()) {
                allCorrect = false;
            }
        });
        if (allCorrect) currentScore += 1;
      } else {
        if (String(userAnswer) === String(task.correctAnswer)) {
          currentScore += 1;
        }
      }
    });

    setScore(currentScore);
    setIsSubmitted(true);
    setShowResultsSummary(true);
    window.scrollTo(0, 0);
  };

  const downloadPDF = async () => {
    if (!selectedMonth || !isSubmitted) return;

    setIsExporting(true);
    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      doc.addFileToVFS('NotoSans-Regular.ttf', notoSansRegularBase64);
      doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
      doc.addFileToVFS('NotoSans-Bold.ttf', notoSansBoldBase64);
      doc.addFont('NotoSans-Bold.ttf', 'NotoSans', 'bold');

      const pageW = 210;
      const marginX = 20;
      const contentW = pageW - marginX * 2;
      
      doc.setFont('NotoSans', 'bold');
      doc.setTextColor(37, 99, 235);
      doc.setFontSize(22);
      doc.text(`Kompetencia Mérés - ${selectedMonth.name}`, pageW / 2, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setTextColor(100, 100, 100);
      doc.text(selectedMonth.topic, pageW / 2, 28, { align: 'center' });

      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(`Eredmény: ${score} / 10 pont (${score * 10}%)`, marginX, 40);

      let currentY = 50;
      const fixText = (text: string, w: number) => doc.splitTextToSize(text, w);

      selectedMonth.tasks.forEach((task, idx) => {
        if (currentY > 250) {
          doc.addPage();
          currentY = 20;
        }

        doc.setFont('NotoSans', 'bold');
        doc.setFontSize(11);
        doc.text(`${idx + 1}. Feladat`, marginX, currentY);
        currentY += 6;

        doc.setFont('NotoSans', 'normal');
        doc.setFontSize(10);
        if (task.context) {
            const ctxLines = fixText(task.context, contentW);
            doc.text(ctxLines, marginX, currentY);
            currentY += ctxLines.length * 5 + 2;
        }

        const qLines = fixText(task.question, contentW);
        doc.text(qLines, marginX, currentY);
        currentY += qLines.length * 5 + 4;

        const userAnswer = answers[task.id];
        let isCorrect = false;
        if (task.type === 'matching') {
            isCorrect = task.pairs?.every(p => String(answers[`${task.id}-${p.id}`]) === String(p.right)) || false;
        } else {
            isCorrect = String(userAnswer) === String(task.correctAnswer);
        }
        
        doc.setFont('NotoSans', 'bold');
        doc.text('Válaszod: ', marginX, currentY);
        doc.setFont('NotoSans', 'normal');
        
        let answerText = '';
        if (task.type === 'matching') {
            answerText = 'Beküldve';
        } else if (task.type === 'multiple-choice' || task.type === 'true-false') {
            answerText = task.options?.[userAnswer] || 'Nincs válasz';
        } else {
            answerText = String(userAnswer || 'Nincs válasz');
        }
        
        doc.text(answerText, marginX + 25, currentY);
        doc.setTextColor(isCorrect ? 34 : 220, isCorrect ? 197 : 38, isCorrect ? 94 : 38);
        doc.text(isCorrect ? ' [HELYES]' : ` [HIBA - Megoldás: ${task.type === 'multiple-choice' || task.type === 'true-false' ? task.options?.[task.correctAnswer] : task.correctAnswer}]`, marginX + 25 + doc.getTextWidth(answerText) + 2, currentY);
        doc.setTextColor(0, 0, 0);
        
        currentY += 12;
      });

      doc.save(`Kompetencia_Meres_${selectedMonth.id}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!selectedMonth) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-10">
            <Sparkles className="w-64 h-64" />
          </div>
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 border border-white/20 mb-8 rounded-xl px-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Vissza a tárgyakhoz
          </Button>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20">
              <BookOpen className="w-12 h-12" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black tracking-tight mb-1">Kompetencia Mérés</h2>
              <p className="text-blue-100 text-lg font-medium opacity-90">Havi interaktív feladatsorok 4. osztályosoknak</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gradeData.map((month) => (
            <button
              key={month.id}
              onClick={() => handleMonthSelect(month)}
              className="group bg-white rounded-[2.5rem] p-8 border-2 border-slate-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                  <Calendar className="w-8 h-8" />
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  <ChevronRight className="w-6 h-6 transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{month.name}</h3>
              <p className="text-slate-500 font-medium mb-6 line-clamp-1">{month.topic}</p>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-black uppercase tracking-widest">10 Feladat</span>
                <span className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest">10 Pont</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (showResultsSummary && selectedMonth) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[3rem] p-12 border-4 border-blue-100 shadow-2xl text-center space-y-8 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 text-blue-50 opacity-50">
            <Sparkles className="w-40 h-40" />
          </div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl rotate-3">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-4xl font-black text-slate-900 mb-2">Szép munka!</h2>
            <p className="text-slate-500 font-bold text-lg mb-8 italic">Befejezted a(z) {selectedMonth.name} havi kompetencia mérést.</p>
            
            <div className="bg-slate-50 rounded-[2rem] p-8 border-2 border-slate-100 mb-10">
              <div className="text-6xl font-black text-blue-600 mb-2">{score} / 10</div>
              <div className="text-xl font-black text-slate-400 uppercase tracking-widest">Elért pontszám</div>
              <div className="mt-4 h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000"
                  style={{ width: `${score * 10}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={() => {
                  setShowResultsSummary(false);
                  setCurrentStep(0);
                }}
                className="h-16 rounded-2xl border-4 border-slate-900 bg-white text-slate-900 hover:bg-slate-50 font-black text-xl transition-all shadow-md"
              >
                <CheckCircle2 className="w-6 h-6 mr-2" /> Ellenőrzés
              </Button>
              <Button 
                onClick={downloadPDF}
                disabled={isExporting}
                className="h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl transition-all shadow-xl shadow-blue-100"
              >
                <Download className="w-6 h-6 mr-2" /> PDF Mentése
              </Button>
            </div>

            <div className="pt-8">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedMonth(null)}
                className="text-slate-400 font-bold hover:text-blue-500"
              >
                Új teszt választása
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentTask = selectedMonth.tasks[currentStep];
  const progress = ((currentStep + 1) / 10) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-500 mb-20">
      {/* Progress & Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm sticky top-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSelectedMonth(null)} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-xl font-black text-slate-900">{selectedMonth.name}</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedMonth.topic}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             {isSubmitted ? (
               <div className="flex items-center gap-3 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-blue-700 text-sm">{score} / 10 Pont</span>
               </div>
             ) : (
               <span className="font-bold text-slate-400 text-sm">{currentStep + 1} / 10</span>
             )}
          </div>
        </div>
        {!isSubmitted && (
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Task Content */}
      <div className="min-h-[400px] flex flex-col">
        <div className={cn(
          "flex-1 bg-white rounded-[2.5rem] p-6 md:p-10 border-2 transition-all duration-500 shadow-lg relative overflow-hidden",
          isSubmitted 
            ? (currentTask.type === 'matching' ? "border-blue-100" : (String(answers[currentTask.id]) === String(currentTask.correctAnswer) ? "border-green-200 bg-green-50/5" : "border-red-200 bg-red-50/5"))
            : "border-slate-100"
        )}>
          {/* Question Number Badge */}
          <div className="absolute top-6 right-6 w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-xl font-black text-slate-200">
            #{currentStep + 1}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
            {/* Left Side: Context & Data */}
            <div className="space-y-6">
              {currentTask.image && (
                <div className="mb-6 flex justify-center lg:justify-start">
                  {currentTask.image.length <= 4 ? (
                    <span className="text-8xl animate-bounce-subtle">{currentTask.image}</span>
                  ) : (
                    <img 
                      src={currentTask.image} 
                      alt="Task illustration" 
                      className="max-h-48 rounded-2xl shadow-lg border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-500"
                    />
                  )}
                </div>
              )}

              {currentTask.context && (
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 font-bold leading-relaxed text-lg italic">
                    {currentTask.context}
                  </p>
                </div>
              )}

              {currentTask.tableData && (
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm max-h-[300px]">
                  <table className="w-full text-left border-collapse sticky-header">
                    <thead className="bg-slate-100 sticky top-0">
                      <tr>
                        {currentTask.tableData[0].map((cell, i) => (
                          <th key={i} className="p-3 text-xs font-black text-slate-600 border-b border-slate-200">{cell}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentTask.tableData.slice(1).map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          {row.map((cell, j) => (
                            <td key={j} className="p-3 text-xs font-medium text-slate-800 border-b border-slate-100">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {!currentTask.context && !currentTask.tableData && (
                <div className="hidden lg:flex flex-col items-center justify-center h-full text-slate-100">
                  <Sparkles className="w-32 h-32" />
                </div>
              )}
            </div>

            {/* Right Side: Question & Answers */}
            <div className="space-y-6 lg:border-l lg:pl-10 lg:border-slate-100">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                {currentTask.question}
              </h3>

              <div className="pt-2">
                {currentTask.type === 'multiple-choice' || currentTask.type === 'true-false' ? (
                  <div className="grid grid-cols-1 gap-3">
                    {currentTask.options?.map((option, oIdx) => {
                      const isUserSelected = answers[currentTask.id] === oIdx;
                      const isCorrect = currentTask.correctAnswer === oIdx;
                      
                      return (
                        <button
                          key={oIdx}
                          disabled={isSubmitted}
                          onClick={() => handleAnswerChange(currentTask.id, oIdx)}
                          className={cn(
                            "p-4 rounded-2xl border-2 text-left transition-all duration-300 font-bold text-base",
                            isUserSelected 
                              ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md translate-x-1" 
                              : "border-slate-100 hover:border-blue-200 hover:bg-slate-50 text-slate-600",
                            isSubmitted && isCorrect && "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-100",
                            isSubmitted && isUserSelected && !isCorrect && "border-red-500 bg-red-50 text-red-700 ring-2 ring-red-100"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                            {isSubmitted && isUserSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : currentTask.type === 'number-input' ? (
                  <div className="w-full">
                    <input
                      type="text"
                      disabled={isSubmitted}
                      value={answers[currentTask.id] || ''}
                      onChange={(e) => handleAnswerChange(currentTask.id, e.target.value)}
                      placeholder="Írd ide a választ..."
                      className={cn(
                        "w-full bg-slate-50 border-4 rounded-2xl px-6 py-4 outline-none transition-all font-black text-2xl text-center shadow-inner",
                        isSubmitted 
                          ? (String(answers[currentTask.id]) === String(currentTask.correctAnswer) ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700")
                          : "border-slate-100 focus:border-blue-500 focus:bg-white"
                      )}
                    />
                    {isSubmitted && String(answers[currentTask.id]) !== String(currentTask.correctAnswer) && (
                      <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
                         <AlertCircle className="w-4 h-4 text-red-500" />
                         <p className="text-red-700 font-bold text-sm">Helyes: <span className="text-base">{currentTask.correctAnswer}</span></p>
                      </div>
                    )}
                  </div>
                ) : currentTask.type === 'matching' ? (
                  <div className="space-y-3">
                    {currentTask.pairs?.map((pair) => (
                      <div key={pair.id} className="flex items-center gap-3">
                        <div className="flex-1 p-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-700 text-sm shadow-sm">
                          {pair.left}
                        </div>
                        <div className="text-blue-500 font-black">➔</div>
                        <div className="relative">
                          <input
                            type="text"
                            disabled={isSubmitted}
                            value={answers[`${currentTask.id}-${pair.id}`] || ''}
                            onChange={(e) => handleAnswerChange(`${currentTask.id}-${pair.id}`, e.target.value)}
                            placeholder="..."
                            className={cn(
                              "w-32 bg-white border-2 rounded-xl px-3 py-2 text-center text-base font-black outline-none transition-all",
                              isSubmitted 
                                ? (String(answers[`${currentTask.id}-${pair.id}`]) === String(pair.right) ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700")
                                : "border-slate-100 focus:border-blue-500 shadow-sm"
                            )}
                          />
                          {isSubmitted && String(answers[`${currentTask.id}-${pair.id}`]) !== String(pair.right) && (
                             <div className="absolute -bottom-5 left-0 right-0 text-center text-[10px] font-black text-green-600 truncate">
                               {pair.right}
                             </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-6 pt-2">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="h-12 px-6 rounded-2xl border-2 font-bold text-slate-600 hover:bg-slate-50 transition-all flex item-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Előző
        </Button>

        {!isSubmitted ? (
          currentStep < 9 ? (
            <Button 
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="h-12 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
            >
              Következő <ChevronRight className="w-5 h-5" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="h-12 px-8 rounded-2xl bg-green-600 hover:bg-green-700 font-black text-lg shadow-lg shadow-green-200 transition-all"
            >
              Teszt beküldése
            </Button>
          )
        ) : (
          <div className="flex gap-3">
             {currentStep < 9 ? (
               <Button 
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="h-12 px-8 rounded-2xl bg-slate-900 hover:bg-black font-black text-lg shadow-lg transition-all flex items-center gap-2"
                >
                  Következő <ChevronRight className="w-5 h-5" />
                </Button>
             ) : (
               <Button 
                onClick={downloadPDF} 
                disabled={isExporting}
                className="h-12 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black text-lg shadow-lg shadow-emerald-200 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" /> PDF Mentése
              </Button>
             )}
          </div>
        )}
      </div>

      {isSubmitted && currentStep === 9 && (
        <div className="text-center pt-8">
           <Button variant="ghost" onClick={() => setSelectedMonth(null)} className="text-slate-400 font-bold hover:text-blue-500 transition-colors">
              Kilépés és más hónap választása
           </Button>
        </div>
      )}
    </div>
  );
}
