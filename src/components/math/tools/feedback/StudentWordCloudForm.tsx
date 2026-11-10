import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  onSnapshot
} from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Cloud,
  Send,
  Plus,
  X,
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  Smile,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { WordCloudDisplay } from './WordCloudDisplay';
import { aggregateWords } from './wordCloudUtils';

export interface StudentWordCloudFormProps {
  session: any;
  studentId: string;
  studentName?: string;
  notificationId?: string;
  onComplete: () => void;
  onCancel?: () => void;
}

export function StudentWordCloudForm({
  session,
  studentId,
  studentName = 'Diák',
  notificationId,
  onComplete,
  onCancel
}: StudentWordCloudFormProps) {
  const [currentInput, setCurrentInput] = useState('');
  const [words, setWords] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionData, setSessionData] = useState<any>(session);
  const [allSubmissions, setAllSubmissions] = useState<any[]>([]);

  const maxWords = session?.max_words_per_student || 1;

  // 1. Check if already submitted
  useEffect(() => {
    if (!session?.id || !studentId) return;

    const checkExisting = async () => {
      try {
        const q = query(
          collection(db, 'feedback_word_cloud_responses'),
          where('session_id', '==', session.id),
          where('student_id', '==', studentId)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const docData = snap.docs[0].data();
          if (Array.isArray(docData.words)) {
            setWords(docData.words);
          }
          setIsSubmitted(true);
        }
      } catch (err) {
        console.error('Error checking existing response:', err);
      }
    };

    checkExisting();
  }, [session?.id, studentId]);

  // 2. Listen to session status changes (e.g. when teacher closes voting)
  useEffect(() => {
    if (!session?.id) return;

    const unsubscribe = onSnapshot(doc(db, 'feedback_sessions', session.id), (docSnap) => {
      if (docSnap.exists()) {
        setSessionData({ id: docSnap.id, ...docSnap.data() });
      }
    });

    return () => unsubscribe();
  }, [session?.id]);

  // 3. Listen to all responses if session is closed so student can also see the cloud
  useEffect(() => {
    if (!sessionData?.is_closed || !session?.id) return;

    const q = query(
      collection(db, 'feedback_word_cloud_responses'),
      where('session_id', '==', session.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(docSnap => list.push(docSnap.data()));
      setAllSubmissions(list);
    });

    return () => unsubscribe();
  }, [sessionData?.is_closed, session?.id]);

  // Add word to current list
  const handleAddWord = () => {
    const trimmed = currentInput.trim();
    if (!trimmed) return;

    if (trimmed.length > 35) {
      return toast.warning('Egy szó/kifejezés legfeljebb 35 karakter lehet!');
    }

    if (words.includes(trimmed)) {
      return toast.info('Ezt a kifejezést már hozzáadtad!');
    }

    if (words.length >= maxWords) {
      return toast.warning(`Legfeljebb ${maxWords} szót adhatsz meg!`);
    }

    setWords([...words, trimmed]);
    setCurrentInput('');
  };

  const handleRemoveWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  // Submit words
  const handleSubmit = async () => {
    // If input has text but user didn't press "+" yet, auto-add it if within limit
    let finalWords = [...words];
    const trimmed = currentInput.trim();
    if (trimmed && finalWords.length < maxWords && !finalWords.includes(trimmed)) {
      finalWords.push(trimmed);
      setWords(finalWords);
      setCurrentInput('');
    }

    if (finalWords.length === 0) {
      return toast.error('Kérlek írj be legalább egy szót vagy kifejezést!');
    }

    setIsSubmitting(true);
    try {
      const now = new Date().toISOString();

      await addDoc(collection(db, 'feedback_word_cloud_responses'), {
        session_id: session.id,
        student_id: studentId,
        student_name: studentName,
        words: finalWords,
        submitted_at: now
      });

      // Mark notification as read
      if (notificationId) {
        try {
          await updateDoc(doc(db, 'feedback_notifications', notificationId), {
            status: 'read'
          });
        } catch (e) {
          console.error(e);
        }
      }

      setIsSubmitted(true);
      toast.success('Köszönjük! A válaszod sikeresen rögzítve.');
    } catch (error) {
      console.error(error);
      toast.error('Hiba történt a válasz elküldésekor');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Aggregate words for student view if closed
  const finalWordsAggregated = aggregateWords(
    allSubmissions.flatMap(s => s.words || []),
    sessionData?.hidden_words || []
  );

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        {onCancel && (
          <Button
            size="sm"
            variant="outline"
            onClick={onCancel}
            className="h-8 px-2.5 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-900 border-slate-200 bg-white"
          >
            <ChevronLeft className="w-3.5 h-3.5 mr-1" />
            <span>Vissza</span>
          </Button>
        )}

        <div className="flex items-center gap-1.5 ml-auto text-xs font-bold text-slate-600 bg-sky-50 px-3 py-1 rounded-xl border border-sky-200/80">
          <Cloud className="w-3.5 h-3.5 text-sky-600" />
          <span>Szófelhő visszajelzés</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-md space-y-5">
        {/* Topic Pill */}
        <div className="text-center space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/80 inline-block">
            {session.lesson_info || session.title || 'Tanóra'}
          </span>
          <p className="text-xs text-slate-500">
            {session.class_name ? `🏫 ${session.class_name} • ` : ''}Szia {studentName}!
          </p>
        </div>

        {/* Question Display */}
        <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl p-4 sm:p-5 text-white text-center shadow-xs space-y-1">
          <p className="text-[10px] uppercase font-bold tracking-wider text-sky-100">
            A tanár kérdése:
          </p>
          <h2 className="text-base sm:text-xl font-black leading-snug">
            „{session.question || 'Mi volt a legjobb a mai órán?'}”
          </h2>
        </div>

        {!isSubmitted ? (
          /* Response Form */
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Írd be a válaszodat:</span>
                <span className={cn(
                  "text-[11px]",
                  words.length >= maxWords ? "text-amber-600 font-extrabold" : "text-slate-400"
                )}>
                  {words.length} / {maxWords} szó rögzítve
                </span>
              </div>

              {/* Input row */}
              <div className="flex gap-2">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (maxWords === 1 && words.length === 0) {
                        handleSubmit();
                      } else {
                        handleAddWord();
                      }
                    }
                  }}
                  disabled={words.length >= maxWords}
                  maxLength={35}
                  placeholder={
                    words.length >= maxWords
                      ? 'Elérted a megengedett szavak számát'
                      : maxWords === 1
                      ? 'pl. Érdekes, Csoportmunka, Könnyű...'
                      : 'Írj be egy szót, majd nyomj Entert vagy +'
                  }
                  className="rounded-2xl h-11 text-sm font-medium border-slate-200 focus-visible:ring-sky-500"
                />

                {maxWords > 1 && (
                  <Button
                    type="button"
                    onClick={handleAddWord}
                    disabled={!currentInput.trim() || words.length >= maxWords}
                    className="h-11 px-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <p className="text-[11px] text-slate-400 italic">
                {maxWords === 1
                  ? 'Egyetlen szót vagy rövid kifejezést írj be.'
                  : `Legfeljebb ${maxWords} különböző szót vagy kifejezést adhatsz meg.`}
              </p>
            </div>

            {/* Added Words Chips */}
            {words.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Beküldésre váró kifejezések:
                </span>
                <div className="flex flex-wrap gap-2">
                  {words.map((word, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 text-sky-900 font-bold text-xs shadow-2xs animate-in fade-in zoom-in-95"
                    >
                      <span>{word}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveWord(idx)}
                        className="w-4 h-4 rounded-full hover:bg-sky-200/60 flex items-center justify-center text-sky-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || (words.length === 0 && !currentInput.trim())}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-md active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Küldés folyamatban...' : 'Válasz Beküldése'}</span>
              </Button>
            </div>
          </div>
        ) : (
          /* Confirmation / Submitted state */
          <div className="text-center space-y-4 py-2 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-800">
                Köszönjük, a válaszodat rögzítettük!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                A beküldött szavad bekerül a közös osztály-szófelhőbe.
              </p>
            </div>

            {/* Show submitted words */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 inline-block text-left">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                Általad beküldött kifejezések:
              </span>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {words.map((w, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-extrabold text-xs shadow-2xs"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Status indicator */}
            {!sessionData?.is_closed ? (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 animate-spin" />
                <span>Várakozás a tanárra, amíg lezárja a szavazást...</span>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>A szavazás lezárult! Íme az osztály közös szófelhője:</span>
                </div>

                {finalWordsAggregated.length > 0 && (
                  <WordCloudDisplay
                    words={finalWordsAggregated}
                    title={session.lesson_info}
                    question={session.question}
                    shape={sessionData?.shape || 'cloud'}
                    isTeacher={false}
                  />
                )}
              </div>
            )}

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onComplete}
                className="rounded-xl text-xs font-bold px-4"
              >
                Vissza a kezdőlapra
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

