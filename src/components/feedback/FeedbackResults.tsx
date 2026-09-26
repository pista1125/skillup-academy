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
          // 1. Try profiles collection (real student account)
          const pSnap = await getDoc(doc(db, 'profiles', rData.student_id));
          if (pSnap.exists()) {
            const pData = pSnap.data();
            studentData = { 
              name: pData.full_name || pData.username || 'Diák', 
              avatar_id: pData.avatar_url || '🎒' 
            };
          } else {
            // 2. Fallback to feedback_students collection
            const sSnap = await getDoc(doc(db, 'feedback_students', rData.student_id));
            if (sSnap.exists()) {
              studentData = { name: sSnap.data().name, avatar_id: sSnap.data().avatar_id };
            }
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

  const ASPECT_BAR_COLORS = [
    { gradient: 'from-cyan-500 to-blue-600', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-800' },
    { gradient: 'from-emerald-500 to-teal-600', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800' },
    { gradient: 'from-amber-500 to-orange-600', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-800' },
    { gradient: 'from-purple-500 to-pink-600', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <div className="grid md:grid-cols-12 gap-4 items-start">
      {/* Session History Sidebar */}
      <div className="md:col-span-4 bg-slate-50/80 rounded-2xl p-3 border border-slate-200/80 space-y-2 max-h-[500px] overflow-y-auto">
        <h3 className="font-bold text-xs text-slate-700 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-amber-500" /> Korábbi Értékelések ({sessions.length})
        </h3>
        {sessions.map(s => {
          const isSelected = selectedSession?.id === s.id;
          return (
            <div
              key={s.id}
              onClick={() => setSelectedSession(s)}
              className={`p-2.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-slate-800 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="min-w-0 pr-1">
                <p className="font-bold text-xs truncate max-w-[170px]">{s.lesson_info}</p>
                <p className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                  {s.class_name} • {s.created_at ? format(new Date(s.created_at), 'MM. dd.', { locale: hu }) : ''}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSession(s.id);
                }}
                className={`h-7 w-7 rounded-lg shrink-0 ${isSelected ? 'text-amber-100 hover:text-white hover:bg-amber-600' : 'text-slate-400 hover:text-rose-500'}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          );
        })}
      </div>

      {/* Selected Session Detail View */}
      {selectedSession && (
        <div className="md:col-span-8 space-y-3.5">
          <div className="bg-slate-50/70 rounded-2xl p-3 sm:p-4 border border-slate-200/80">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3 pb-2.5 border-b border-slate-200/70">
              <div>
                <h2 className="text-base font-bold text-slate-800 leading-tight">{selectedSession.lesson_info}</h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {selectedSession.class_name} • {results.length} diák adott visszajelzést
                </p>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {selectedSession.aspects.length} Szempont
              </span>
            </div>

            {/* Average Scores per Aspect */}
            <h3 className="font-bold text-xs text-slate-700 mb-2.5 uppercase tracking-wider">
              Átlagos Értékelés Szempontonként (10-ből)
            </h3>
            <div className="space-y-2.5 mb-4">
              {selectedSession.aspects.map((aspect, idx) => {
                const avg = aspectAverages[idx] || 0;
                const percentage = (avg / 10) * 100;
                const theme = ASPECT_BAR_COLORS[idx] || ASPECT_BAR_COLORS[0];
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700 flex items-center gap-1.5 truncate pr-2">
                        <span className={`w-4 h-4 rounded text-[10px] font-black flex items-center justify-center shrink-0 ${theme.badge}`}>
                          {idx + 1}
                        </span>
                        <span className="truncate">{aspect}</span>
                      </span>
                      <span className={`font-black shrink-0 ${theme.text}`}>{avg} / 10</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-200/70 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Student Responses */}
            <h3 className="font-bold text-xs text-slate-700 mb-2 uppercase tracking-wider">
              Diákok Egyéni Értékelései ({results.length})
            </h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {results.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">Még nem érkezett válasz erre a visszajelzésre.</p>
              ) : (
                results.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-200/80 text-xs">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      {r.feedback_students?.avatar_id && (r.feedback_students.avatar_id.startsWith('http') || r.feedback_students.avatar_id.startsWith('data:') || r.feedback_students.avatar_id.startsWith('/')) ? (
                        <img src={r.feedback_students.avatar_id} alt={r.feedback_students.name} className="w-5 h-5 rounded-full object-cover shrink-0" />
                      ) : (
                        <span className="text-base shrink-0">{r.feedback_students?.avatar_id || '🎒'}</span>
                      )}
                      <span className="font-bold text-slate-800 truncate">{r.feedback_students?.name || 'Diák'}</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {r.scores.map((score, idx) => {
                        const theme = ASPECT_BAR_COLORS[idx] || ASPECT_BAR_COLORS[0];
                        return (
                          <span key={idx} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border border-slate-200 ${theme.badge}`}>
                            {idx + 1}.: {score}/10
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
