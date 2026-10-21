import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  UserCheck, 
  Send, 
  HelpCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { MATH_SURVEY_TEMPLATE } from '@/data/mathSurveyTemplate';
import { SurveySession } from '@/types/surveyFeedback';

interface StudentSurveyFormProps {
  session: SurveySession | any;
  studentId?: string;
  studentName?: string;
  notificationId?: string;
  onComplete: () => void;
  onCancel: () => void;
}

export function StudentSurveyForm({
  session,
  studentId,
  studentName = 'Diák',
  notificationId,
  onComplete,
  onCancel
}: StudentSurveyFormProps) {
  const template = MATH_SURVEY_TEMPLATE;
  const storageKey = `survey_draft_${session?.id || 'demo'}_${studentId || 'guest'}`;

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [customName, setCustomName] = useState(studentName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Restore draft from localStorage
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(storageKey);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.isAnonymous === 'boolean') setIsAnonymous(parsed.isAnonymous);
        if (parsed.customName) setCustomName(parsed.customName);
      }
    } catch (e) {
      console.warn('Could not load draft from localStorage', e);
    }
  }, [storageKey]);

  // Auto-save draft
  const saveDraft = (newAnswers: Record<string, any>, anon: boolean, name: string) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        answers: newAnswers,
        isAnonymous: anon,
        customName: name
      }));
    } catch (e) {
      console.warn('Could not save draft to localStorage', e);
    }
  };

  const handleSingleChoice = (questionId: string, value: string) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    saveDraft(updated, isAnonymous, customName);
  };

  const handleMultiChoice = (questionId: string, value: string) => {
    const currentList: string[] = Array.isArray(answers[questionId]) ? [...answers[questionId]] : [];
    const index = currentList.indexOf(value);
    if (index >= 0) {
      currentList.splice(index, 1);
    } else {
      currentList.push(value);
    }
    const updated = { ...answers, [questionId]: currentList };
    setAnswers(updated);
    saveDraft(updated, isAnonymous, customName);
  };

  const handleTextChange = (questionId: string, text: string) => {
    const updated = { ...answers, [questionId]: text };
    setAnswers(updated);
    saveDraft(updated, isAnonymous, customName);
  };

  const handleSplitTextChange = (questionId: string, field: 'first' | 'second', text: string) => {
    const existing = answers[questionId] || { first: '', second: '' };
    const updated = {
      ...answers,
      [questionId]: {
        ...existing,
        [field]: text
      }
    };
    setAnswers(updated);
    saveDraft(updated, isAnonymous, customName);
  };

  const handleOtherOptionText = (questionId: string, text: string) => {
    const updated = {
      ...answers,
      [`${questionId}_other`]: text
    };
    setAnswers(updated);
    saveDraft(updated, isAnonymous, customName);
  };

  const currentSection = template.sections[currentSectionIndex];
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === template.sections.length - 1;

  // Validation: Check if required questions in the current section are answered
  const canProceed = () => {
    for (const q of currentSection.questions) {
      if (q.required) {
        const val = answers[q.id];
        if (!val || (typeof val === 'string' && !val.trim())) {
          return false;
        }
      }
    }
    return true;
  };

  // Submit survey
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const responseData = {
        session_id: session?.id || 'demo_session',
        class_id: session?.class_id || '',
        class_name: session?.class_name || 'Osztály',
        student_id: isAnonymous ? 'anonymous' : (studentId || 'unknown'),
        student_name: isAnonymous ? 'Névtelen diák' : (customName.trim() || studentName || 'Diák'),
        is_anonymous: isAnonymous,
        submitted_at: new Date().toISOString(),
        answers: answers
      };

      await addDoc(collection(db, 'feedback_survey_responses'), responseData);

      // If there was an active notification, mark it completed/read
      if (notificationId) {
        try {
          await updateDoc(doc(db, 'feedback_notifications', notificationId), {
            status: 'completed',
            completed_at: new Date().toISOString()
          });
        } catch (err) {
          console.warn('Could not update notification status', err);
        }
      }

      // Clear local draft
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        // ignore
      }

      // Fire confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });

      setIsFinished(true);
      toast.success('Köszönjük a válaszaidat! Sikeresen beküldve.');
    } catch (error) {
      console.error('Error submitting survey response:', error);
      toast.error('Hiba történt a beküldés során. Kérlek próbáld újra!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Thank You Screen
  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-6 bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl my-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 animate-bounce">
          <Sparkles className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            Köszönjük a visszajelzésedet!
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            A válaszaid óriási segítséget jelentenek abban, hogy a matematikaórák még érdekesebbek, érthetőbbek és jobb hangulatúak legyenek!
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-800 font-medium max-w-sm mx-auto flex items-center gap-2 text-left">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>A válaszaidat a rendszer rögzítette {isAnonymous ? 'teljesen névtelenül' : `${customName} néven`}.</span>
        </div>

        <div>
          <Button
            onClick={onComplete}
            className="h-11 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-md transition-all"
          >
            Vissza a Visszajelző Lobbiba
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4 px-2 sm:px-4 py-2">
      {/* Top Header Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 px-2.5 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-900 border border-slate-200"
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            <span>Mégsem</span>
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Osztály:</span>
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {session?.class_name || 'Osztály'}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {template.title}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 pl-9">
            {template.subtitle} <span className="text-indigo-600 font-semibold">{template.note}</span>
          </p>
        </div>

        {/* Anonimitás beállítás */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
          <div className="flex items-center gap-2.5">
            <div className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
              isAnonymous ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"
            )}>
              {isAnonymous ? <ShieldCheck className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">
                {isAnonymous ? 'Névtelen kitöltés (ajánlott)' : 'Névvel ellátott válasz'}
              </p>
              <p className="text-[10px] text-slate-500">
                {isAnonymous ? 'A tanár nem fogja tudni, kitől származnak a válaszok.' : 'A válaszok mellett megjelenik a neved.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {!isAnonymous && (
              <Input
                value={customName}
                onChange={(e) => {
                  setCustomName(e.target.value);
                  saveDraft(answers, false, e.target.value);
                }}
                placeholder="A neved..."
                className="h-8 text-xs w-36 rounded-lg bg-white"
              />
            )}
            <div className="flex items-center gap-1.5">
              <Label htmlFor="anon-switch" className="text-xs text-slate-600 cursor-pointer">
                Névtelen
              </Label>
              <Switch
                id="anon-switch"
                checked={isAnonymous}
                onCheckedChange={(checked) => {
                  setIsAnonymous(checked);
                  saveDraft(answers, checked, customName);
                }}
              />
            </div>
          </div>
        </div>

        {/* Progress Stepper Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold">
            <span className="flex items-center gap-1">
              <span>{currentSectionIndex + 1}. szakasz / {template.sections.length}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700">{currentSection.title}</span>
            </span>
            <span className="text-indigo-600 font-black">
              {Math.round(((currentSectionIndex + 1) / template.sections.length) * 100)}%
            </span>
          </div>
          
          <div className="grid grid-cols-5 gap-1.5 h-2">
            {template.sections.map((sec, idx) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setCurrentSectionIndex(idx)}
                className={cn(
                  "h-full rounded-full transition-all duration-300 cursor-pointer",
                  idx === currentSectionIndex
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xs"
                    : idx < currentSectionIndex
                    ? "bg-emerald-500"
                    : "bg-slate-200 hover:bg-slate-300"
                )}
                title={`${idx + 1}. ${sec.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Current Section Questions Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-sm space-y-6">
        {/* Section Title Header */}
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <span className="text-2xl">{currentSection.icon || '📝'}</span>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              {currentSection.number}. {currentSection.title}
            </h2>
            {currentSection.subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{currentSection.subtitle}</p>
            )}
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {currentSection.questions.map((q) => {
            const currentVal = answers[q.id];

            return (
              <div key={q.id} className="space-y-2.5 bg-slate-50/50 p-3 sm:p-4 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {q.number}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                      {q.question}
                      {q.required && <span className="text-rose-500 ml-1 font-bold">*</span>}
                    </p>
                  </div>
                </div>

                {/* 1. Single Choice Radio Cards */}
                {q.type === 'single_choice' && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                    {q.options.map((opt) => {
                      const isSelected = currentVal === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSingleChoice(q.id, opt.value)}
                          className={cn(
                            "flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-bold transition-all",
                            isSelected
                              ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-400 text-indigo-900 ring-2 ring-indigo-500/20 shadow-xs"
                              : "bg-white hover:bg-slate-50/80 border-slate-200/80 text-slate-700"
                          )}
                        >
                          <span className="text-base shrink-0">{opt.icon}</span>
                          <span className="flex-1 truncate">{opt.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. Multi Choice Checkbox Grid */}
                {q.type === 'multi_choice' && q.options && (
                  <div className="space-y-2 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {q.options.map((opt) => {
                        const list: string[] = Array.isArray(currentVal) ? currentVal : [];
                        const isChecked = list.includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleMultiChoice(q.id, opt.value)}
                            className={cn(
                              "flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-semibold transition-all",
                              isChecked
                                ? "bg-gradient-to-r from-teal-50 to-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs"
                                : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700"
                            )}
                          >
                            <span className="text-base shrink-0">{opt.icon}</span>
                            <span className="flex-1 truncate">{opt.label}</span>
                            <div className={cn(
                              "w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0",
                              isChecked ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"
                            )}>
                              {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {q.hasOtherOption && (
                      <div className="pt-1.5 flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-600 shrink-0">Egyéb kívánság:</span>
                        <Input
                          value={answers[`${q.id}_other`] || ''}
                          onChange={(e) => handleOtherOptionText(q.id, e.target.value)}
                          placeholder="Írd ide, ha van más ötleted..."
                          className="h-8 text-xs rounded-xl bg-white flex-1"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Text Area */}
                {q.type === 'text' && (
                  <div className="pt-1">
                    <Textarea
                      rows={3}
                      value={currentVal || ''}
                      onChange={(e) => handleTextChange(q.id, e.target.value)}
                      placeholder={q.placeholder || 'Írd ide a gondolataidat...'}
                      className="text-xs sm:text-sm rounded-xl border-slate-200 bg-white focus-visible:ring-indigo-500"
                    />
                  </div>
                )}

                {/* 4. Split Text (Tetszik: / Változtatnék rajta:) */}
                {q.type === 'split_text' && q.subLabels && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <span>👍</span> {q.subLabels.first}
                      </Label>
                      <Textarea
                        rows={2}
                        value={currentVal?.first || ''}
                        onChange={(e) => handleSplitTextChange(q.id, 'first', e.target.value)}
                        placeholder="Mi az, ami tetszik benne?..."
                        className="text-xs rounded-xl border-slate-200 bg-white focus-visible:ring-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-bold text-amber-700 flex items-center gap-1">
                        <span>💡</span> {q.subLabels.second}
                      </Label>
                      <Textarea
                        rows={2}
                        value={currentVal?.second || ''}
                        onChange={(e) => handleSplitTextChange(q.id, 'second', e.target.value)}
                        placeholder="Min érdemes javítani?..."
                        className="text-xs rounded-xl border-slate-200 bg-white focus-visible:ring-amber-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          <Button
            type="button"
            variant="outline"
            disabled={isFirstSection}
            onClick={() => setCurrentSectionIndex(prev => Math.max(0, prev - 1))}
            className="h-10 px-4 rounded-xl text-xs font-bold border-slate-200 text-slate-700"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Előző szakasz
          </Button>

          <div className="flex items-center gap-2">
            {!isLastSection ? (
              <Button
                type="button"
                onClick={() => {
                  if (!canProceed()) {
                    return toast.error('Kérlek válaszolj a kötelező kérdésekre a továbbhaladáshoz!');
                  }
                  setCurrentSectionIndex(prev => Math.min(template.sections.length - 1, prev + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="h-10 px-5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Következő szakasz</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="h-10 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 animate-pulse"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Beküldés folyamatban...' : 'Kérdőív Végleges Beküldése'}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
