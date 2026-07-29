import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { BarChart3, Clock, Trash2 } from 'lucide-react';

interface Session {
  id: string;
  lesson_info: string;
  aspects: string[];
  created_at: string;
  class_name?: string;
  feedback_classes?: {
    name: string;
  };
}

interface Result {
  student_id: string;
  scores: number[];
  feedback_students: {
    name: string;
    avatar_id: string;
  };
}

export function FeedbackResults() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) fetchSessions();
  }, [user]);

  useEffect(() => {
    if (selectedSession) fetchResults(selectedSession.id);
  }, [selectedSession]);

  const fetchSessions = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const q = query(collection(db, 'feedback_sessions'));
      const snapshot = await getDocs(q);
      const list: Session[] = [];

      for (const docSnap of snapshot.docs) {
        const sData = docSnap.data();
        const isOwner = sData.teacher_id === user.uid || 
          sData.teacher_id === 'fbd31da5-b3d1-4e73-85a9-9608f8bfc0f0' ||
          (user.email?.toLowerCase() === 'pista1125@gmail.com');

        if (!isOwner) continue;

        let className = sData.class_name || 'Osztály';
        if (sData.class_id && !sData.class_name) {
          const cSnap = await getDoc(doc(db, 'feedback_classes', sData.class_id));
          if (cSnap.exists()) {
            className = cSnap.data().name;
          }
        }
        list.push({
          id: docSnap.id,
          lesson_info: sData.lesson_info,
          aspects: sData.aspects || [],
          created_at: sData.created_at,
          class_name: className,
          feedback_classes: { name: className }
        });
      }

      list.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
      setSessions(list);
      if (list.length > 0) setSelectedSession(list[0]);
    } catch (e) {
      console.error('Error fetching sessions:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResults = async (sessionId: string) => {
    try {
      const q = query(collection(db, 'feedback_results'), where('session_id', '==', sessionId));
      const snapshot = await getDocs(q);
      const list: Result[] = [];
      for (const docSnap of snapshot.docs) {
        const rData = docSnap.data();
        let studentData = { name: 'Diák', avatar_id: '🎒' };
        if (rData.student_id) {
          const sSnap = await getDoc(doc(db, 'feedback_students', rData.student_id));
          if (sSnap.exists()) {
            studentData = { name: sSnap.data().name, avatar_id: sSnap.data().avatar_id };
          }
        }
        list.push({
          student_id: rData.student_id,
          scores: rData.scores || [],
          feedback_students: studentData
        });
      }
      setResults(list);
    } catch (e) {
      console.error('Error fetching results:', e);
    }
  };

  const deleteSession = async (id: string) => {
    if (!confirm('Biztosan törlöd ezt az értékelést?')) return;
    try {
      await deleteDoc(doc(db, 'feedback_sessions', id));
      setSessions(sessions.filter(s => s.id !== id));
      if (selectedSession?.id === id) {
        setSelectedSession(sessions.length > 1 ? sessions.find(s => s.id !== id) || null : null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading && sessions.length === 0) {
    return <div className="text-center py-10 text-slate-500">Adatok betöltése...</div>;
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-700">Még nincs mentett értékelésed</h3>
        <p className="text-slate-500 text-sm mt-1">Az elvégzett céltáblás visszajelzések itt fognak megjelenni.</p>
      </div>
    );
  }

  // Calculate averages per aspect
  const aspectAverages = selectedSession?.aspects.map((_, idx) => {
    if (results.length === 0) return 0;
    const total = results.reduce((acc, r) => acc + (r.scores[idx] || 0), 0);
    return Math.round((total / results.length) * 10) / 10;
  }) || [];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Session History Sidebar */}
      <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 space-y-2 max-h-[600px] overflow-y-auto">
        <h3 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-500" /> Korábbi Értékelések ({sessions.length})
        </h3>
        {sessions.map(s => {
          const isSelected = selectedSession?.id === s.id;
          return (
            <div
              key={s.id}
              onClick={() => setSelectedSession(s)}
              className={`p-3 rounded-2xl cursor-pointer transition-all border flex items-center justify-between ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                  : 'bg-white text-slate-800 border-slate-100 hover:border-slate-200'
              }`}
            >
              <div>
                <p className="font-bold text-sm truncate max-w-[180px]">{s.lesson_info}</p>
                <p className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                  {s.class_name} • {s.created_at ? format(new Date(s.created_at), 'yyyy. MM. dd.', { locale: hu }) : ''}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(s.id);
                }}
                className={`h-8 w-8 rounded-xl ${isSelected ? 'text-indigo-200 hover:text-white hover:bg-indigo-700' : 'text-slate-400 hover:text-rose-500'}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
      </div>

      {/* Selected Session Detail View */}
      {selectedSession && (
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-1">{selectedSession.lesson_info}</h2>
            <p className="text-xs text-slate-500 mb-6">
              {selectedSession.class_name} • {results.length} diák adott visszajelzést
            </p>

            {/* Average Scores per Aspect */}
            <h3 className="font-bold text-sm text-slate-700 mb-4">Átlagos Értékelés Szempontonként (10-ből)</h3>
            <div className="space-y-4 mb-8">
              {selectedSession.aspects.map((aspect, idx) => {
                const avg = aspectAverages[idx] || 0;
                const percentage = (avg / 10) * 100;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-slate-700">{idx + 1}. {aspect}</span>
                      <span className="font-black text-indigo-600">{avg} / 10</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Student Responses */}
            <h3 className="font-bold text-sm text-slate-700 mb-3">Diákok Egyéni Értékelései</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.feedback_students?.avatar_id || '🎒'}</span>
                    <span className="font-bold text-slate-800">{r.feedback_students?.name || 'Diák'}</span>
                  </div>
                  <div className="flex gap-2">
                    {r.scores.map((score, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700">
                        {idx + 1}. szempont: {score}/10
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
