import { useState, useEffect, useMemo } from 'react';
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
import { useAuth } from '@/contexts/AuthContext';

interface MockAssessmentProps {
  onBack: () => void;
  grade: number;
}

const FEEDBACK_SECTIONS = {
  understanding: {
    title: '1. Hogyan értettem meg a feladatokat?',
    rows: [
      { id: 'u1', text: 'Megértettem, mit kérnek a feladatok' },
      { id: 'u2', text: 'Tudtam, hogyan kezdjek hozzá' },
      { id: 'u3', text: 'A legtöbb feladatot önállóan oldottam meg' }
    ],
    options: ['Igen', 'Részben', 'Nem']
  },
  performance: {
    title: '2. Mennyire ment jól a megoldás? (1–5)',
    rows: [
      { id: 'p1', text: 'Számolás' },
      { id: 'p2', text: 'Szöveges feladatok' },
      { id: 'p3', text: 'Gondolkodás / logika' },
      { id: 'p4', text: 'Időbeosztás' }
    ],
    options: [1, 2, 3, 4, 5]
  },
  difficulties: {
    title: '3. Mi okozott nehézséget?',
    options: ['Szöveg megértése', 'Számolás', 'Figyelmetlenség', 'Időhiány', 'Nem tudtam, hogyan kezdjem el']
  },
  improvement: {
    title: '6. Hogyan tudnék fejlődni?',
    options: ['Többet kell gyakorolnom', 'Jobban figyelek órán', 'Segítséget kérek', 'Lassabban, átgondoltabban dolgozom']
  }
};

export function MockAssessment({ onBack, grade }: MockAssessmentProps) {
  const { profile, user } = useAuth();
  const userName = profile?.full_name || user?.email || 'Tanuló';
  const gradeData = COMPETENCY_DATA[grade] || [];
  
  const filteredData = useMemo(() => {
    return gradeData.filter(m => m.id.includes('probameres'));
  }, [gradeData]);

  const [selectedMonth, setSelectedMonth] = useState<MonthlyCompetency | null>(null);
  const [view, setView] = useState<'months' | 'options' | 'test' | 'feedback'>('months');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [feedbackAnswers, setFeedbackAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
  const [showResultsSummary, setShowResultsSummary] = useState(false);
  const [score, setScore] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleMonthSelect = (month: MonthlyCompetency) => {
    setSelectedMonth(month);
    setView('options');
    setCurrentStep(0);
    setAnswers({});
    setFeedbackAnswers({});
    setIsSubmitted(false);
    setIsFeedbackSubmitted(false);
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
        let allCorrect = true;
        task.pairs?.forEach(pair => {
            if (String(answers[`${task.id}-${pair.id}`]).trim() !== String(pair.right).trim()) {
                allCorrect = false;
            }
        });
        if (allCorrect) currentScore += 1;
      } else if (task.type === 'multi-true-false') {
        let allCorrect = true;
        task.pairs?.forEach(pair => {
            if (answers[`${task.id}-${pair.id}`] !== pair.right) {
                allCorrect = false;
            }
        });
        if (allCorrect) currentScore += 1;
      } else if (task.type === 'multi-choice') {
        const userAnswers = (answers[task.id] || []) as number[];
        const correctAnswers = (task.correctAnswer || []) as number[];
        const isAllCorrect = 
          userAnswers.length === correctAnswers.length &&
          userAnswers.every(val => correctAnswers.includes(val));
        if (isAllCorrect) currentScore += 1;
      } else if (task.type === 'gap-fill') {
        let allCorrect = true;
        (task.correctAnswer as string[]).forEach((ans, i) => {
          if (String(answers[`${task.id}-${i}`] || '').trim() !== String(ans).trim()) {
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
      const title = 'Próbamérés';
      doc.text(`${title} - ${selectedMonth.name}`, pageW / 2, 20, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setTextColor(100, 100, 100);
      doc.text(selectedMonth.topic, pageW / 2, 28, { align: 'center' });

      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(`Tanuló: ${userName}`, marginX, 40);
      doc.text(`Eredmény: ${score} / 10 pont (${score * 10}%)`, marginX, 48);

      let currentY = 58;
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
        } else if (task.type === 'multi-true-false') {
            isCorrect = task.pairs?.every(p => answers[`${task.id}-${p.id}`] === p.right) || false;
        } else if (task.type === 'gap-fill') {
            isCorrect = (task.correctAnswer as string[]).every((ans, i) => String(answers[`${task.id}-${i}`] || '').trim() === String(ans).trim());
        } else {
            isCorrect = String(userAnswer) === String(task.correctAnswer);
        }
        
        doc.setFont('NotoSans', 'bold');
        doc.text('Válaszod: ', marginX, currentY);
        doc.setFont('NotoSans', 'normal');
        
        let answerText = '';
        if (task.type === 'matching') {
            answerText = 'Beküldve';
        } else if (task.type === 'multi-choice') {
            const indices = (userAnswer || []) as number[];
            answerText = indices.length > 0 
                ? indices.map(idx => String.fromCharCode(65 + idx)).join(', ')
                : 'Nincs válasz';
        } else if (task.type === 'gap-fill') {
            answerText = (task.correctAnswer as string[]).map((_, i) => answers[`${task.id}-${i}`] || '_').join(', ');
        } else {
            answerText = String(userAnswer || 'Nincs válasz');
        }
        
        doc.text(answerText, marginX + 25, currentY);
        let correctText = '';
        if (task.type === 'multiple-choice' || task.type === 'true-false') {
            correctText = task.options?.[task.correctAnswer] || '';
        } else if (task.type === 'multi-choice') {
            correctText = (task.correctAnswer as number[]).map(idx => String.fromCharCode(65 + idx)).join(', ');
        } else if (task.type === 'gap-fill') {
            correctText = (task.correctAnswer as string[]).join(', ');
        } else {
            correctText = String(task.correctAnswer);
        }

        doc.setTextColor(isCorrect ? 34 : 220, isCorrect ? 197 : 38, isCorrect ? 94 : 38);
        doc.text(isCorrect ? ' [HELYES]' : ` [HIBA - Megoldás: ${correctText}]`, marginX + 25 + doc.getTextWidth(answerText) + 2, currentY);
        doc.setTextColor(0, 0, 0);
        
        currentY += 12;
      });

      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.setTextColor(180, 180, 180);
          doc.setFont('NotoSans', 'bold');
          doc.text('diakzona.hu - Kompetenciamérés útján készült feladatokkal', pageW / 2, 287, { align: 'center' });
      }

      doc.save(`Kompetencia_Meres_${selectedMonth.id}_${userName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const downloadFeedbackPDF = async () => {
    if (!selectedMonth || !isFeedbackSubmitted) return;

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
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(22);
      doc.text('TANULÓI ÖNÉRTÉKELŐ LAP', pageW / 2, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Név: ${userName}`, marginX, 35);
      doc.text(`Osztály: ${grade}. osztály`, pageW - marginX - 40, 35);
      doc.text(`Feladatlap témája: ${selectedMonth.name} - ${selectedMonth.topic}`, marginX, 42);

      let currentY = 53;
      const fixText = (text: string, w: number) => doc.splitTextToSize(text, w);

      doc.setFont('NotoSans', 'bold');
      doc.text(FEEDBACK_SECTIONS.understanding.title, marginX, currentY);
      currentY += 8;
      doc.setFont('NotoSans', 'normal');
      FEEDBACK_SECTIONS.understanding.rows.forEach(row => {
          const val = feedbackAnswers.understanding?.[row.id];
          doc.text(`[${val || ' '}] ${row.text}`, marginX + 5, currentY);
          currentY += 6;
      });
      currentY += 4;

      doc.setFont('NotoSans', 'bold');
      doc.text(FEEDBACK_SECTIONS.performance.title, marginX, currentY);
      currentY += 8;
      doc.setFont('NotoSans', 'normal');
      FEEDBACK_SECTIONS.performance.rows.forEach(row => {
          const val = feedbackAnswers.performance?.[row.id];
          doc.text(`${row.text}: ${val || '-'} / 5`, marginX + 5, currentY);
          currentY += 6;
      });
      currentY += 4;

      doc.setFont('NotoSans', 'bold');
      doc.text(FEEDBACK_SECTIONS.difficulties.title, marginX, currentY);
      currentY += 8;
      doc.setFont('NotoSans', 'normal');
      const diffs = feedbackAnswers.difficulties || [];
      let diffText = diffs.length > 0 ? diffs.join(', ') : 'Nincs megjelölve';
      if (feedbackAnswers.difficultyOther) diffText += ` (${feedbackAnswers.difficultyOther})`;
      const diffLines = fixText(diffText, contentW - 10);
      doc.text(diffLines, marginX + 5, currentY);
      currentY += diffLines.length * 5 + 6;

      doc.setFont('NotoSans', 'bold');
      doc.text('4. Mi ment jól?', marginX, currentY);
      currentY += 7;
      doc.setFont('NotoSans', 'normal');
      const sLines = fixText(feedbackAnswers.strengths || '-', contentW - 10);
      doc.text(sLines, marginX + 5, currentY);
      currentY += sLines.length * 5 + 8;

      doc.setFont('NotoSans', 'bold');
      doc.text('5. Mi nem ment jól?', marginX, currentY);
      currentY += 7;
      doc.setFont('NotoSans', 'normal');
      const wLines = fixText(feedbackAnswers.weaknesses || '-', contentW - 10);
      doc.text(wLines, marginX + 5, currentY);
      currentY += wLines.length * 5 + 8;

      if (currentY > 230) { doc.addPage(); currentY = 20; }

      doc.setFont('NotoSans', 'bold');
      doc.text(FEEDBACK_SECTIONS.improvement.title, marginX, currentY);
      currentY += 8;
      doc.setFont('NotoSans', 'normal');
      const imps = feedbackAnswers.improvement || [];
      let impText = imps.length > 0 ? imps.join(', ') : 'Nincs megjelölve';
      if (feedbackAnswers.improvementOther) impText += ` (${feedbackAnswers.improvementOther})`;
      const impLines = fixText(impText, contentW - 10);
      doc.text(impLines, marginX + 5, currentY);
      currentY += impLines.length * 5 + 8;

      doc.setFont('NotoSans', 'bold');
      doc.text('7. Mennyire voltam elégedett a munkámmal? (1-5)', marginX, currentY);
      currentY += 8;
      doc.setFont('NotoSans', 'normal');
      doc.text(`Értékelés: ${feedbackAnswers.satisfaction || '-'} / 5`, marginX + 5, currentY);
      currentY += 12;

      doc.setFont('NotoSans', 'bold');
      doc.text('8. Tanári megjegyzés', marginX, currentY);
      currentY += 8;
      doc.setFont('NotoSans', 'normal');
      const tLines = fixText(feedbackAnswers.teacherRemark || '__________________________________________________________________', contentW - 10);
      doc.text(tLines, marginX + 5, currentY);

      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.setTextColor(180, 180, 180);
          doc.setFont('NotoSans', 'bold');
          doc.text('diakzona.hu - Kompetenciamérés útján készült feladatokkal', pageW / 2, 287, { align: 'center' });
      }

      doc.save(`Visszajelzes_${selectedMonth.id}_${userName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!selectedMonth) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-7 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-10">
            <Sparkles className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-black tracking-tight mb-1">
              Próbamérés Felkészülés
            </h2>
            <p className="text-blue-100 text-[13px] md:text-sm font-medium opacity-90">
              Próbamérések és korábbi mérők feladatai
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredData.map((month) => (
            <button
              key={month.id}
              onClick={() => handleMonthSelect(month)}
              className="group bg-white rounded-2xl p-5 md:p-6 border-2 border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-all" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-1">{month.name}</h3>
              <p className="text-slate-500 text-[13px] md:text-sm font-medium mb-4 line-clamp-1">{month.topic}</p>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest">10 Feladat</span>
                <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest">10 Pont</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'options' && selectedMonth) {
    return (
      <div className="max-w-2xl mx-auto space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-[1.5rem] p-3 md:p-5 border-2 border-slate-100 shadow-xl relative overflow-hidden">
          <Button variant="ghost" size="sm" onClick={() => { setSelectedMonth(null); setView('months'); }} className="text-slate-400 hover:text-blue-600 mb-1 rounded-xl h-6 text-xs">
            <ArrowLeft className="w-3.5 h-3.5 mr-2" /> Vissza
          </Button>
          
          <div className="text-center space-y-0.5 mb-4">
            <h2 className="text-sm md:text-base font-black text-slate-900 leading-tight">{selectedMonth.name}</h2>
            <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedMonth.topic}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setView('test')}
              className="group p-4 md:p-5 rounded-xl border-4 border-slate-50 bg-slate-50 hover:border-blue-500 hover:bg-white transition-all duration-300 text-center space-y-2"
            >
              <div className="w-9 h-9 bg-white text-blue-600 rounded-xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black text-slate-900">Teszt indítása</h3>
              <p className="text-slate-400 text-[12px] font-medium leading-relaxed px-2">10 interaktív feladat megoldása és PDF generálás.</p>
            </button>

            <button
              onClick={() => setView('feedback')}
              className="group p-4 md:p-5 rounded-xl border-4 border-slate-50 bg-slate-50 hover:border-emerald-500 hover:bg-white transition-all duration-300 text-center space-y-2"
            >
              <div className="w-9 h-9 bg-white text-emerald-600 rounded-xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all transform group-hover:scale-110">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black text-slate-900">Visszajelzés</h3>
              <p className="text-slate-400 text-[12px] font-medium leading-relaxed px-2">Oszd meg véleményedet és tapasztalataidat a témával kapcsolatban.</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'feedback' && selectedMonth) {
    const isComplete = 
      feedbackAnswers.understanding && Object.keys(feedbackAnswers.understanding).length === 3 &&
      feedbackAnswers.performance && Object.keys(feedbackAnswers.performance).length === 4 &&
      feedbackAnswers.satisfaction;

    if (isFeedbackSubmitted) {
      return (
        <div className="max-w-2xl mx-auto py-4 px-6 animate-in zoom-in-95 duration-500">
          <div className="bg-white rounded-[2rem] pt-4 pb-6 px-6 border-4 border-emerald-100 shadow-2xl text-center space-y-4">
            <h2 className="text-xl font-black text-slate-900">Köszönjük!</h2>
            <p className="text-slate-500 font-bold text-base">Válaszaidat rögzítettük az Önértékelő Lapon.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={() => setView('options')} 
                className="h-14 rounded-2xl border-4 border-slate-900 bg-white text-slate-900 hover:bg-slate-50 font-black text-lg transition-all"
              >
                Vissza a menübe
              </Button>
              <Button 
                onClick={downloadFeedbackPDF}
                disabled={isExporting}
                className="h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> PDF Mentése
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto space-y-2.5 animate-in fade-in slide-in-from-bottom-4 duration-500 px-4 mb-20">
        <div className="bg-white rounded-2xl p-3 md:p-6 border-2 border-slate-100 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Tanulói Önértékelő Lap</h2>
              <p className="text-xs text-slate-500 font-bold">{selectedMonth.name} - {selectedMonth.topic}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setView('options')} className="rounded-full w-8 h-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-8">
            {/* Section 1: Understanding */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 bg-slate-50 p-3 rounded-xl border-l-4 border-blue-500">
                {FEEDBACK_SECTIONS.understanding.title}
              </h3>
              <div className="space-y-3">
                {FEEDBACK_SECTIONS.understanding.rows.map(row => (
                  <div key={row.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white border-2 border-slate-50 rounded-xl gap-3">
                    <span className="font-bold text-slate-700 text-sm">{row.text}</span>
                    <div className="flex gap-2">
                      {FEEDBACK_SECTIONS.understanding.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setFeedbackAnswers(prev => ({
                            ...prev,
                            understanding: { ...prev.understanding, [row.id]: opt }
                          }))}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-black transition-all border-2",
                            feedbackAnswers.understanding?.[row.id] === opt
                              ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100"
                              : "bg-slate-50 border-slate-50 text-slate-400 hover:border-blue-200"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Performance */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 bg-slate-50 p-3 rounded-xl border-l-4 border-emerald-500">
                {FEEDBACK_SECTIONS.performance.title}
              </h3>
              <div className="space-y-3">
                {FEEDBACK_SECTIONS.performance.rows.map(row => (
                  <div key={row.id} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-white border-2 border-slate-50 rounded-xl gap-3">
                    <span className="font-bold text-slate-700 text-sm">{row.text}</span>
                    <div className="flex gap-1 md:gap-2">
                      {FEEDBACK_SECTIONS.performance.options.map(num => (
                        <button
                          key={num}
                          onClick={() => setFeedbackAnswers(prev => ({
                            ...prev,
                            performance: { ...prev.performance, [row.id]: num }
                          }))}
                          className={cn(
                            "w-10 h-10 md:w-12 md:h-12 rounded-xl text-lg font-black transition-all border-2 flex items-center justify-center",
                            feedbackAnswers.performance?.[row.id] === num
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100 scale-110"
                              : "bg-slate-50 border-slate-50 text-slate-400 hover:border-emerald-200"
                          )}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Difficulties */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 bg-slate-50 p-3 rounded-xl border-l-4 border-orange-500">
                {FEEDBACK_SECTIONS.difficulties.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {FEEDBACK_SECTIONS.difficulties.options.map(opt => {
                  const isSelected = (feedbackAnswers.difficulties || []).includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        const current = feedbackAnswers.difficulties || [];
                        setFeedbackAnswers(prev => ({
                          ...prev,
                          difficulties: isSelected 
                            ? current.filter(i => i !== opt)
                            : [...current, opt]
                        }));
                      }}
                      className={cn(
                        "px-5 py-2.5 rounded-xl font-bold transition-all border-2 text-[13px]",
                        isSelected
                          ? "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-100"
                          : "bg-slate-50 border-slate-50 text-slate-500 hover:border-orange-200"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <input 
                type="text"
                placeholder="Egyéb nehézség..."
                value={feedbackAnswers.difficultyOther || ''}
                onChange={(e) => setFeedbackAnswers(prev => ({ ...prev, difficultyOther: e.target.value }))}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 outline-none focus:border-orange-500 focus:bg-white transition-all font-bold text-sm"
              />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Section 4: What went well */}
              <section className="space-y-3">
                <h3 className="text-lg font-black text-slate-800">4. Mi ment jól?</h3>
                <textarea
                  value={feedbackAnswers.strengths || ''}
                  onChange={(e) => setFeedbackAnswers(prev => ({ ...prev, strengths: e.target.value }))}
                  placeholder="Írj legalább egy dolgot..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl p-3 min-h-[90px] outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-sm"
                />
              </section>

              {/* Section 5: What didn't go well */}
              <section className="space-y-3">
                <h3 className="text-lg font-black text-slate-800">5. Mi nem ment jól?</h3>
                <textarea
                  value={feedbackAnswers.weaknesses || ''}
                  onChange={(e) => setFeedbackAnswers(prev => ({ ...prev, weaknesses: e.target.value }))}
                  placeholder="Írd le, mi okozott gondot..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 min-h-[110px] outline-none focus:border-red-500 focus:bg-white transition-all font-bold text-sm"
                />
              </section>
            </div>

            {/* Section 6: Improvement */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 bg-slate-50 p-3 rounded-xl border-l-4 border-purple-500">
                {FEEDBACK_SECTIONS.improvement.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {FEEDBACK_SECTIONS.improvement.options.map(opt => {
                  const isSelected = (feedbackAnswers.improvement || []).includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        const current = feedbackAnswers.improvement || [];
                        setFeedbackAnswers(prev => ({
                          ...prev,
                          improvement: isSelected 
                            ? current.filter(i => i !== opt)
                            : [...current, opt]
                        }));
                      }}
                      className={cn(
                        "px-5 py-2.5 rounded-xl font-bold transition-all border-2 text-[13px]",
                        isSelected
                          ? "bg-purple-500 border-purple-500 text-white shadow-md shadow-purple-100"
                          : "bg-slate-50 border-slate-50 text-slate-500 hover:border-purple-200"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <input 
                type="text"
                placeholder="Egyéb fejlődési lehetőség..."
                value={feedbackAnswers.improvementOther || ''}
                onChange={(e) => setFeedbackAnswers(prev => ({ ...prev, improvementOther: e.target.value }))}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 outline-none focus:border-purple-500 focus:bg-white transition-all font-bold text-sm"
              />
            </section>

            {/* Section 7: Satisfaction */}
            <section className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 bg-slate-50 p-3 rounded-xl border-l-4 border-pink-500">
                7. Mennyire voltam elégedett a munkámmal?
              </h3>
              <div className="flex justify-between items-center bg-white p-6 rounded-3xl border-2 border-slate-50">
                {[
                  { val: 1, label: '☹️' },
                  { val: 2, label: '🙁' },
                  { val: 3, label: '🙂' },
                  { val: 4, label: '😊' },
                  { val: 5, label: '😄' }
                ].map(item => (<button
                    key={item.val}
                    onClick={() => setFeedbackAnswers(prev => ({ ...prev, satisfaction: item.val }))}
                    className={cn(
                      "flex flex-col items-center gap-2 transition-all p-2 rounded-xl",
                      feedbackAnswers.satisfaction === item.val
                        ? "bg-pink-50 scale-110"
                        : "opacity-40 hover:opacity-100 hover:bg-slate-50"
                    )}
                  >
                    <span className="text-3xl">{item.label}</span>
                    <span className="text-[10px] font-black text-pink-600">{item.val}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Section 8: Teacher Remark */}
            <section className="space-y-3">
               <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                 <span>8. ✍️ Tanári megjegyzés</span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">(opcionális)</span>
               </h3>
               <textarea
                  value={feedbackAnswers.teacherRemark || ''}
                  onChange={(e) => setFeedbackAnswers(prev => ({ ...prev, teacherRemark: e.target.value }))}
                  placeholder="Ez a rész a tanárnak van fenntartva, de te is írhatsz ide..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-3 min-h-[90px] outline-none focus:border-slate-500 focus:bg-white transition-all font-bold text-sm"
                />
            </section>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6">
            <Button 
              disabled={!isComplete}
              onClick={() => { setIsFeedbackSubmitted(true); window.scrollTo(0, 0); }}
              className="w-full h-13 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-md shadow-blue-100 disabled:opacity-50 transition-all flex items-center justify-center gap-2.5"
            >
              <CheckCircle2 className="w-5 h-5" /> Kitöltés befejezése
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showResultsSummary && selectedMonth) {
    return (
      <div className="max-w-2xl mx-auto py-2 px-6 animate-in zoom-in-95 duration-500">
        <div className="bg-white rounded-[2rem] pt-4 pb-6 px-6 border-4 border-blue-100 shadow-2xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute -top-5 -left-5 text-blue-50 opacity-50">
            <Sparkles className="w-20 h-20" />
          </div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl rotate-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            
            <h2 className="text-xl font-black text-slate-900 mb-1">Szép munka!</h2>
            <p className="text-slate-500 font-bold text-sm mb-4 italic">Befejezted a(z) {selectedMonth.name} havi kompetencia mérést.</p>
            
            <div className="bg-slate-50 rounded-[1.5rem] p-3 border-2 border-slate-100 mb-5">
              <div className="text-3xl font-black text-blue-600 mb-1">{score} / 10</div>
              <div className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Elért pontszám</div>
              <div className="mt-4 h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-1000"
                  style={{ width: `${score * 10}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                onClick={() => {
                  setShowResultsSummary(false);
                  setCurrentStep(0);
                }}
                className="h-12 rounded-xl border-4 border-slate-900 bg-white text-slate-900 hover:bg-slate-50 font-black text-base transition-all shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" /> Ellenőrzés
              </Button>
              <Button 
                onClick={downloadPDF}
                disabled={isExporting}
                className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base transition-all shadow-xl shadow-blue-100"
              >
                <Download className="w-4 h-4 mr-2" /> Mentés
              </Button>
            </div>

            <div className="pt-3">
              <Button 
                onClick={() => setView('options')} 
                className="w-full h-11 rounded-xl border-4 border-slate-900 bg-white text-slate-900 hover:bg-slate-50 font-black text-base transition-all shadow-md"
              >
                Vissza a menübe
              </Button>
            </div>

            <div className="pt-4">
              <Button 
                variant="ghost" 
                onClick={() => { setSelectedMonth(null); setView('months'); }}
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

  const currentTask = selectedMonth!.tasks[currentStep];
  const progress = ((currentStep + 1) / 10) * 100;

  return (
    <div className="max-w-[90%] mx-auto space-y-1.5 animate-in slide-in-from-bottom-8 duration-500 mb-20">
      {/* Progress & Header */}
      <div className="bg-white rounded-3xl p-4 border-2 border-slate-100 shadow-sm z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setView('options')} className="rounded-full w-7 h-7">
              <ArrowLeft className="w-3.5 h-3.5" />
            </Button>
            <div>
              <h2 className="text-base md:text-lg font-black text-slate-900">{selectedMonth.name}</h2>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{selectedMonth.topic}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             {isSubmitted ? (
               <div className="flex items-center gap-3 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                  <Trophy className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-blue-700 text-base">{score} / 10 Pont</span>
               </div>
             ) : (
               <span className="font-bold text-slate-400 text-sm">{currentStep + 1} / 10</span>
             )}
          </div>
        </div>
        {!isSubmitted && (
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Task Content */}
      <div className="min-h-[350px] flex flex-col">
        <div className={cn(
          "flex-1 bg-white rounded-[2rem] p-4 md:p-5 border-2 transition-all duration-500 shadow-md relative overflow-hidden",
          isSubmitted 
            ? (currentTask.type === 'matching' ? "border-blue-100" : (String(answers[currentTask.id]) === String(currentTask.correctAnswer) ? "border-green-200 bg-green-50/5" : "border-red-200 bg-red-50/5"))
            : "border-slate-100"
        )}>
          {/* Question Number Badge */}
          <div className="absolute top-3 right-3 w-9 h-9 bg-slate-50 rounded-full flex items-center justify-center text-base font-black text-slate-200">
            #{currentStep + 1}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Left Side: Context & Data */}
            <div className="space-y-3">
              {currentTask.image && (
                <div className="mb-2 flex justify-center lg:justify-start">
                  {currentTask.image.length <= 4 ? (
                    <span className="text-8xl animate-bounce-subtle">{currentTask.image}</span>
                  ) : (
                    <img 
                      src={currentTask.image} 
                      alt="Task illustration" 
                      className="max-h-[450px] w-auto rounded-xl shadow-lg border-2 border-white rotate-1 hover:rotate-0 transition-transform duration-500"
                    />
                  )}
                </div>
              )}

              {currentTask.context && (
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 font-bold leading-relaxed text-sm italic">
                    {currentTask.context}
                  </p>
                </div>
              )}

              {currentTask.tableData && (
                <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm max-h-[300px]">
                  <table className="w-full text-left border-collapse sticky-header">
                    <thead className="bg-slate-100 sticky top-0">
                      <tr>
                        {currentTask.tableData[0].map((cell, i) => (
                          <th key={i} className="p-2.5 text-[13px] font-black text-slate-600 border-b border-slate-200">{cell}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentTask.tableData.slice(1).map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          {row.map((cell, j) => (
                            <td key={j} className="p-2.5 text-[13px] font-bold text-slate-800 border-b border-slate-100">{cell}</td>
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
            <div className="space-y-3 lg:border-l lg:pl-6 lg:border-slate-100">
              <h3 className="text-sm md:text-base font-black text-slate-900 dark:text-white leading-tight">
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
                            "p-2.5 rounded-lg border-2 text-left transition-all duration-300 font-bold text-sm",
                            isUserSelected 
                              ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm translate-x-1" 
                              : "border-slate-100 hover:border-blue-200 hover:bg-slate-50 text-slate-600",
                            isSubmitted && isCorrect && "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-100",
                            isSubmitted && isUserSelected && !isCorrect && "border-red-500 bg-red-50 text-red-700 ring-2 ring-red-100"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {isSubmitted && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                            {isSubmitted && isUserSelected && !isCorrect && <XCircle className="w-3.5 h-3.5 text-red-500" />}
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
                        "w-full bg-slate-50 border-2 rounded-lg px-4 py-2.5 outline-none transition-all font-black text-lg text-center shadow-inner",
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
                        <div className="flex-1 p-2.5 bg-slate-50 border-2 border-slate-100 rounded-lg font-bold text-slate-700 text-sm shadow-sm">
                          {pair.left}
                        </div>
                        <div className="text-blue-500 font-black text-sm">âž”</div>
                        <div className="relative">
                          <input
                            type="text"
                            disabled={isSubmitted}
                            value={answers[`${currentTask.id}-${pair.id}`] || ''}
                            onChange={(e) => handleAnswerChange(`${currentTask.id}-${pair.id}`, e.target.value)}
                            placeholder="..."
                            className={cn(
                              "w-32 bg-white border-2 rounded-lg px-2 py-1.5 text-center text-base font-black outline-none transition-all",
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
                ) : currentTask.type === 'multi-true-false' ? (
                  <div className="space-y-4">
                    {currentTask.pairs?.map((pair) => (
                      <div key={pair.id} className="bg-slate-50 p-2.5 rounded-lg border-2 border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                        <span className="font-bold text-slate-700 text-sm flex-1">{pair.left}</span>
                        <div className="flex gap-2">
                          {['Igaz', 'Hamis'].map((label, idx) => {
                            const val = idx === 0;
                            const isSelected = answers[`${currentTask.id}-${pair.id}`] === val;
                            const isCorrect = pair.right === val;
                            
                            return (
                              <button
                                key={label}
                                disabled={isSubmitted}
                                onClick={() => handleAnswerChange(`${currentTask.id}-${pair.id}`, val)}
                                className={cn(
                                  "px-3 py-1 rounded-lg border-2 font-black text-xs transition-all",
                                  isSelected 
                                    ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                                    : "bg-white border-slate-200 text-slate-500 hover:border-blue-300",
                                  isSubmitted && isCorrect && "ring-2 ring-green-100 border-green-500",
                                  isSubmitted && isSelected && !isCorrect && "border-red-500 bg-red-50 text-red-700"
                                )}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : currentTask.type === 'multi-choice' ? (
                  <div className="grid grid-cols-1 gap-3">
                    {currentTask.options?.map((option, idx) => {
                      const currentAnswers = (answers[currentTask.id] || []) as number[];
                      const isSelected = currentAnswers.includes(idx);
                      const isCorrect = (currentTask.correctAnswer as number[]).includes(idx);
                      
                      return (
                        <button
                          key={idx}
                          disabled={isSubmitted}
                          onClick={() => {
                            const newAnswers = isSelected
                              ? currentAnswers.filter(i => i !== idx)
                              : [...currentAnswers, idx];
                            handleAnswerChange(currentTask.id, newAnswers);
                          }}
                          className={cn(
                            "flex items-center gap-2.5 p-3 rounded-lg border-2 transition-all text-left",
                            isSelected
                              ? "border-blue-500 bg-blue-50 text-blue-700 shadow-xs"
                              : "border-slate-100 hover:border-blue-200 hover:bg-slate-50 text-slate-600",
                            isSubmitted && isCorrect && "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-50",
                            isSubmitted && isSelected && !isCorrect && "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-50"
                          )}
                        >
                          <div className={cn(
                            "w-6 h-6 rounded-md flex items-center justify-center font-black text-xs transition-colors",
                            isSelected ? "bg-blue-600 text-white" : "bg-white text-slate-400 border border-slate-200"
                          )}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="font-bold text-sm flex-1">{option}</span>
                          <div className="ml-auto">
                            <div className={cn(
                              "w-6 h-6 rounded border-2 flex items-center justify-center transition-all",
                              isSelected ? "bg-blue-600 border-blue-600" : "bg-white border-slate-300"
                            )}>
                              {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : currentTask.type === 'gap-fill' ? (
                  <div className="w-full bg-slate-50/50 p-4 md:p-5 rounded-xl border-2 border-slate-100/50">
                    <div className="text-sm md:text-base font-bold text-slate-700 leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-4">
                      {currentTask.gap_template?.split('[gap]').map((part, i, arr) => (
                        <span key={i} className="flex flex-wrap items-center gap-2">
                          <span className="py-2">{part}</span>
                          {i < arr.length - 1 && (
                            <div className="relative inline-block mx-1">
                              <input
                                type="text"
                                disabled={isSubmitted}
                                value={answers[`${currentTask.id}-${i}`] || ''}
                                onChange={(e) => handleAnswerChange(`${currentTask.id}-${i}`, e.target.value)}
                                className={cn(
                                  "w-24 bg-white border-2 rounded-lg px-2 py-1 text-center text-base font-black outline-none transition-all shadow-sm",
                                  isSubmitted 
                                    ? (String(answers[`${currentTask.id}-${i}`] || '').trim() === String((currentTask.correctAnswer as string[])[i]).trim() ? "border-green-500 bg-green-50 text-green-700" : "border-red-500 bg-red-50 text-red-700")
                                    : "border-slate-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                                )}
                              />
                              {isSubmitted && String(answers[`${currentTask.id}-${i}`] || '').trim() !== String((currentTask.correctAnswer as string[])[i]).trim() && (
                                <div className="absolute -bottom-7 left-0 right-0 text-center text-[11px] font-black text-green-600 bg-green-50 rounded-lg py-0.5 border border-green-100 z-10 shadow-sm">
                                  {(currentTask.correctAnswer as string[])[i]}
                                </div>
                              )}
                            </div>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-6 pt-1">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="h-8 px-4 rounded-lg border-2 font-bold text-slate-600 hover:bg-slate-50 transition-all flex item-center gap-2 text-sm"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Előző
        </Button>

        {!isSubmitted ? (
          currentStep < 9 ? (
            <Button 
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="h-8 px-5 rounded-lg bg-blue-600 hover:bg-blue-700 font-black text-sm shadow-md shadow-blue-200 transition-all flex items-center gap-2"
            >
              Következő <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="h-8 px-5 rounded-lg bg-green-600 hover:bg-green-700 font-black text-sm shadow-md shadow-green-200 transition-all"
            >
              Teszt beküldése
            </Button>
          )
        ) : (
          <div className="flex gap-3">
             {currentStep < 9 ? (
               <Button 
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="h-10 px-8 rounded-2xl bg-slate-900 hover:bg-black font-black text-lg shadow-lg transition-all flex items-center gap-2"
                >
                  Következő <ChevronRight className="w-5 h-5" />
                </Button>
             ) : (
               <Button 
                onClick={downloadPDF} 
                disabled={isExporting}
                className="h-10 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 font-black text-lg shadow-lg shadow-emerald-200 transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" /> PDF Mentése
              </Button>
             )}
          </div>
        )}
      </div>

      {isSubmitted && currentStep === 9 && (
        <div className="text-center pt-8">
           <Button variant="ghost" onClick={() => setView('options')} className="text-slate-400 font-bold hover:text-blue-500 transition-colors">
              Kilépés a menübe
           </Button>
        </div>
      )}
    </div>
  );
}
