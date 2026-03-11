import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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
  feedback_classes: {
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
    setIsLoading(true);
    const { data, error } = await supabase
      .from('feedback_sessions')
      .select(`
        id, 
        lesson_info, 
        aspects, 
        created_at,
        feedback_classes (name)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSessions(data as unknown as Session[]);
      if (data.length > 0) setSelectedSession(data[0] as unknown as Session);
    }
    setIsLoading(false);
  };

  const fetchResults = async (sessionId: string) => {
    const { data, error } = await supabase
      .from('feedback_results')
      .select(`
        student_id,
        scores,
        feedback_students (name, avatar_id)
      `)
      .eq('session_id', sessionId);

    if (!error && data) {
      setResults(data as unknown as Result[]);
    }
  };

  const deleteSession = async (id: string) => {
    if (!confirm('Biztosan törlöd ezt az értékelést?')) return;
    
    const { error } = await supabase
      .from('feedback_sessions')
      .delete()
      .eq('id', id);

    if (!error) {
      setSessions(sessions.filter(s => s.id !== id));
      if (selectedSession?.id === id) {
        setSelectedSession(sessions.length > 1 ? sessions.find(s => s.id !== id) || null : null);
      }
    }
  };

  if (isLoading && sessions.length === 0) {
    return <div className="text-center py-10 text-slate-500">Adatok betöltése...</div>;
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-slate-200 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-700 mb-2">Még nincsenek eredmények</h3>
        <p className="text-slate-500">Még egyetlen osztályt sem értékeltél a céltáblával.</p>
      </div>
    );
  }

  // Eredmények aggregálása
  const calculateAverages = () => {
    if (!results.length || !selectedSession) return [];
    
    return selectedSession.aspects.map((aspect, aspectIndex) => {
      let sum = 0;
      let count = 0;
      
      results.forEach(res => {
        if (res.scores[aspectIndex] !== undefined) {
          sum += res.scores[aspectIndex];
          count++;
        }
      });
      
      return {
        aspect,
        average: count > 0 ? (sum / count).toFixed(1) : '0',
        count
      };
    });
  };

  const averages = calculateAverages();

  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[500px]">
      {/* Bal oldal: Korábbi értékelések */}
      <div className="w-full md:w-1/3 border-r md:pr-6 flex flex-col">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-500" />
          Korábbi Visszajelzések
        </h3>
        
        <div className="space-y-3 overflow-y-auto flex-1 pr-2">
          {sessions.map(session => (
            <div
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className={`p-4 rounded-xl border cursor-pointer transition-colors relative group ${
                selectedSession?.id === session.id 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-slate-800 line-clamp-1 pr-8">{session.lesson_info}</h4>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`absolute top-2 right-2 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
                    selectedSession?.id === session.id ? 'text-emerald-700 hover:bg-emerald-200' : 'text-slate-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                  onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-slate-600 mb-2">{session.feedback_classes?.name}</p>
              <p className="text-xs text-slate-400 font-medium whitespace-nowrap">
                {format(new Date(session.created_at), 'yyyy. MMM d. HH:mm', { locale: hu })}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Jobb oldal: Részletes nézet */}
      <div className="w-full md:w-2/3">
        {selectedSession ? (
          <div>
            <div className="mb-6 flex flex-wrap justify-between items-end gap-4 border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedSession.lesson_info}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-slate-100 text-slate-700 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                    {selectedSession.feedback_classes?.name}
                  </span>
                  <span className="text-sm text-slate-500 border-l pl-2">
                    {format(new Date(selectedSession.created_at), 'yyyy. MMMM d. (EEEE)', { locale: hu })}
                  </span>
                </div>
              </div>
              
              <div className="text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border">
                Összesen: <strong className="text-slate-700">{results.length} diák</strong> szavazott
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {averages.map((avg, i) => (
                <div key={i} className={`p-5 rounded-2xl border flex flex-col ${
                  ['bg-indigo-50 border-indigo-100', 'bg-emerald-50 border-emerald-100', 'bg-amber-50 border-amber-100', 'bg-purple-50 border-purple-100'][i]
                }`}>
                  <p className="font-semibold text-slate-700 mb-3 flex-1">{avg.aspect}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className={`text-4xl font-extrabold ${
                        ['text-indigo-600', 'text-emerald-600', 'text-amber-600', 'text-purple-600'][i]
                      }`}>{avg.average}</span>
                      <span className="text-slate-500 ml-1">/ 10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-slate-800 text-lg mb-4">Diákok egyéni értékelései</h3>
            
            <div className="bg-white rounded-xl border overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 border-b">
                  <tr>
                    <th className="py-3 px-4 font-semibold w-1/3">Diák neve</th>
                    {selectedSession.aspects.map((aspect, i) => (
                      <th key={i} className="py-3 px-4 font-semibold truncate" title={aspect}>
                        {aspect.substring(0, 15)}{aspect.length > 15 && '...'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.length === 0 ? (
                    <tr><td colSpan={selectedSession.aspects.length + 1} className="py-8 text-center text-slate-500">Még nincs rögzített adat.</td></tr>
                  ) : (
                    results.map((res, i) => (
                      <tr key={res.student_id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{res.feedback_students?.avatar_id}</span>
                            <span className="font-medium text-slate-800">{res.feedback_students?.name}</span>
                          </div>
                        </td>
                        {res.scores.map((score, sIdx) => (
                          <td key={sIdx} className="py-3 px-4 text-slate-600 font-medium">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                              score >= 8 ? 'bg-emerald-100 text-emerald-700' : 
                              score >= 5 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {score}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20">
            <Clock className="w-16 h-16 mb-4 text-slate-200" />
            <p>Válassz egy korábbi visszajelzést a részletekhez.</p>
          </div>
        )}
      </div>
    </div>
  );
}
