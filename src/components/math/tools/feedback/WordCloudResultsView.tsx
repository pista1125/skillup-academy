import { useState, useEffect, useMemo } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Cloud, Users, Sparkles, MessageSquare, CheckCircle2, Calendar } from 'lucide-react';
import { WordCloudDisplay } from './WordCloudDisplay';
import { aggregateWords, WordItem, WordCloudShape, WORD_CLOUD_SHAPES } from './wordCloudUtils';

interface WordCloudResultsViewProps {
  session: any;
}

interface StudentSubmission {
  id: string;
  student_id: string;
  student_name: string;
  words: string[];
  submitted_at: string;
}

export function WordCloudResultsView({ session }: WordCloudResultsViewProps) {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [hiddenWords, setHiddenWords] = useState<string[]>(session.hidden_words || []);
  const [currentShape, setCurrentShape] = useState<WordCloudShape>(session.shape || 'cloud');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.shape) {
      setCurrentShape(session.shape);
    }
  }, [session?.shape]);

  useEffect(() => {
    if (!session?.id) return;

    const fetchSubmissions = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, 'feedback_word_cloud_responses'),
          where('session_id', '==', session.id)
        );
        const snapshot = await getDocs(q);
        const list: StudentSubmission[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        setSubmissions(list);
      } catch (err) {
        console.error('Error fetching word cloud submissions:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [session?.id]);

  const allRawWords = useMemo(() => {
    return submissions.flatMap(s => s.words || []);
  }, [submissions]);

  const aggregatedWords: WordItem[] = useMemo(() => {
    return aggregateWords(allRawWords, hiddenWords);
  }, [allRawWords, hiddenWords]);

  const handleHideWord = async (normalizedWord: string) => {
    const updated = [...hiddenWords, normalizedWord];
    setHiddenWords(updated);
    try {
      await updateDoc(doc(db, 'feedback_sessions', session.id), {
        hidden_words: updated
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleShapeChange = async (newShape: WordCloudShape) => {
    setCurrentShape(newShape);
    if (!session?.id) return;
    try {
      await updateDoc(doc(db, 'feedback_sessions', session.id), {
        shape: newShape
      });
    } catch (e) {
      console.error(e);
    }
  };

  const totalWords = allRawWords.length;
  const uniqueWords = aggregatedWords.length;
  const participantsCount = submissions.length;

  return (
    <div className="space-y-4">
      {/* Header Summary Card */}
      <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-slate-200/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                Szófelhő Elemzés
              </span>
              <h2 className="text-base font-bold text-slate-800 leading-tight">
                {session.lesson_info || session.title}
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
              <span>🏫 {session.class_name}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                {session.created_at ? format(new Date(session.created_at), 'yyyy. MMMM d.', { locale: hu }) : ''}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-700 block">
                {participantsCount} diák válaszolt
              </span>
              <span className="text-[10px] text-slate-400">
                Max. {session.max_words_per_student || 1} válasz / fő
              </span>
            </div>
          </div>
        </div>

        {/* Question display */}
        <div className="bg-gradient-to-r from-sky-50 to-indigo-50 p-3 rounded-xl border border-sky-100 flex items-center gap-2.5">
          <MessageSquare className="w-4 h-4 text-sky-600 shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Feltett kérdés:</p>
            <p className="text-xs font-extrabold text-slate-800 truncate">
              „{session.question || 'Mi volt a legjobb a mai órán?'}”
            </p>
          </div>
        </div>

        {/* KPI Pills */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 font-bold block">Résztvevők</span>
            <span className="text-base font-black text-slate-800">{participantsCount} diák</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 font-bold block">Összes szó</span>
            <span className="text-base font-black text-sky-600">{totalWords} db</span>
          </div>
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
            <span className="text-[10px] text-slate-400 font-bold block">Különböző fogalmak</span>
            <span className="text-base font-black text-indigo-600">{uniqueWords} db</span>
          </div>
        </div>
      </div>

      {/* Word Cloud Visualizer */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
        {isLoading ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            Szófelhő adatainak betöltése...
          </div>
        ) : (
          <WordCloudDisplay
            words={aggregatedWords}
            title={session.lesson_info || session.title}
            question={session.question}
            shape={currentShape}
            onShapeChange={handleShapeChange}
            isTeacher={true}
            onHideWord={handleHideWord}
          />
        )}
      </div>

      {/* Submissions by students list */}
      {submissions.length > 0 && (
        <div className="bg-slate-50/70 rounded-2xl p-3.5 border border-slate-200/80 space-y-2">
          <h3 className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Diákok egyéni beküldései ({submissions.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs space-y-1 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 truncate">{sub.student_name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {sub.words?.map((w, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[10px] font-bold border border-sky-100"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

