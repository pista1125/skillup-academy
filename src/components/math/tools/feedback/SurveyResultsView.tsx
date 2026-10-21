import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { 
  FileDown, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Filter,
  Eye,
  RefreshCw,
  Printer
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { MATH_SURVEY_TEMPLATE } from '@/data/mathSurveyTemplate';
import { SurveyResponse } from '@/types/surveyFeedback';
import { SurveyPdfReport } from './SurveyPdfReport';
import { exportElementToPDF } from '@/utils/pdfExport';

interface SurveyResultsViewProps {
  session: any;
  onBack?: () => void;
}

export function SurveyResultsView({ session, onBack }: SurveyResultsViewProps) {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'text_cards' | 'individual'>('overview');
  const [selectedResponse, setSelectedResponse] = useState<SurveyResponse | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const reportRef = useRef<HTMLDivElement>(null);
  const template = MATH_SURVEY_TEMPLATE;

  useEffect(() => {
    if (!session?.id) return;
    setIsLoading(true);

    const q = query(
      collection(db, 'feedback_survey_responses'),
      where('session_id', '==', session.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: SurveyResponse[] = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() } as SurveyResponse);
      });
      list.sort((a, b) => new Date(b.submitted_at || 0).getTime() - new Date(a.submitted_at || 0).getTime());
      setResponses(list);
      if (list.length > 0 && !selectedResponse) {
        setSelectedResponse(list[0]);
      }
      setIsLoading(false);
    }, (err) => {
      console.error('Error fetching survey responses:', err);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [session?.id]);

  const totalResponses = responses.length;

  const handleDownloadPdf = async () => {
    if (!reportRef.current) {
      return toast.error('A PDF sablon nem található.');
    }
    setIsExporting(true);
    try {
      const fileName = `DiakZona_Visszajelzes_${session?.class_name || 'Osztaly'}_${new Date().toISOString().slice(0, 10)}`;
      await exportElementToPDF(reportRef.current, fileName);
    } catch (e) {
      console.error('Error exporting PDF:', e);
      toast.error('Hiba történt a PDF exportálás során.');
    } finally {
      setIsExporting(false);
    }
  };

  // Helper stats
  const getQuestionStats = (questionId: string, options: any[] = []) => {
    const counts: Record<string, number> = {};
    options.forEach(o => { counts[o.value] = 0; });
    let sumScore = 0;
    let scoredCount = 0;

    responses.forEach(r => {
      const val = r.answers?.[questionId];
      if (val && counts[val] !== undefined) counts[val]++;
      const opt = options.find(o => o.value === val);
      if (opt && typeof opt.score === 'number' && opt.score > 0) {
        sumScore += opt.score;
        scoredCount++;
      }
    });

    const avgScore = scoredCount > 0 ? (sumScore / scoredCount).toFixed(1) : null;
    return {
      avgScore,
      options: options.map(o => ({
        ...o,
        count: counts[o.value] || 0,
        pct: totalResponses > 0 ? Math.round(((counts[o.value] || 0) / totalResponses) * 100) : 0
      }))
    };
  };

  const getMultiStats = (questionId: string, options: any[] = []) => {
    const counts: Record<string, number> = {};
    options.forEach(o => { counts[o.value] = 0; });

    responses.forEach(r => {
      const list: string[] = Array.isArray(r.answers?.[questionId]) ? r.answers[questionId] : [];
      list.forEach(val => {
        if (counts[val] !== undefined) counts[val]++;
      });
    });

    return options
      .map(o => ({
        ...o,
        count: counts[o.value] || 0,
        pct: totalResponses > 0 ? Math.round(((counts[o.value] || 0) / totalResponses) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getTextAnswers = (questionId: string) => {
    return responses
      .map(r => ({
        text: r.answers?.[questionId],
        author: r.is_anonymous ? 'Névtelen diák' : (r.student_name || 'Diák')
      }))
      .filter(item => typeof item.text === 'string' && item.text.trim().length > 0);
  };

  const getSplitAnswers = (questionId: string) => {
    const list: Array<{ first: string; second: string; author: string }> = [];
    responses.forEach(r => {
      const ans = r.answers?.[questionId];
      if ((ans?.first && ans.first.trim()) || (ans?.second && ans.second.trim())) {
        list.push({
          first: ans?.first || '',
          second: ans?.second || '',
          author: r.is_anonymous ? 'Névtelen diák' : (r.student_name || 'Diák')
        });
      }
    });
    return list;
  };

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 rounded-2xl p-4 sm:p-5 text-white shadow-md space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <h1 className="text-base sm:text-lg font-black tracking-tight">
                {session?.title || 'Részletes Kérdőív Eredmények'}
              </h1>
            </div>
            <p className="text-xs text-purple-200">
              {session?.class_name} • {session?.note || 'Átfogó felmérés'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button
              type="button"
              disabled={isExporting || totalResponses === 0}
              onClick={handleDownloadPdf}
              className="h-9 px-4 rounded-xl bg-white text-purple-700 hover:bg-purple-50 font-black text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <FileDown className="w-4 h-4 text-purple-600" />
              <span>{isExporting ? 'PDF Generálás...' : '📄 Elemzés Letöltése (PDF)'}</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowPrintPreview(!showPrintPreview)}
              className="h-9 px-3 rounded-xl bg-purple-600/50 hover:bg-purple-600 border-white/20 text-white font-bold text-xs"
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              <span>{showPrintPreview ? 'Előnézet bezárása' : 'Nyomtatási Előnézet'}</span>
            </Button>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-purple-500/40">
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
            <span className="text-[10px] text-purple-200 uppercase font-semibold">Kitöltések száma</span>
            <p className="text-lg font-black text-white">{totalResponses} diák</p>
          </div>
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
            <span className="text-[10px] text-purple-200 uppercase font-semibold">Matek kedveltség</span>
            <p className="text-lg font-black text-white">
              {getQuestionStats('q1_love_math', template.sections[0].questions[0].options).avgScore || '–'} / 5
            </p>
          </div>
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
            <span className="text-[10px] text-purple-200 uppercase font-semibold">Megértés index</span>
            <p className="text-lg font-black text-white">
              {getQuestionStats('q2_comprehension', template.sections[0].questions[1].options).avgScore || '–'} / 4
            </p>
          </div>
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm">
            <span className="text-[10px] text-purple-200 uppercase font-semibold">Órai hangulat</span>
            <p className="text-lg font-black text-white">
              {getQuestionStats('q5_atmosphere', template.sections[0].questions[4].options).avgScore || '–'} / 4
            </p>
          </div>
        </div>
      </div>

      {/* Sub tabs: Overview / Text Responses / Individual Responses */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveSubTab('overview')}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
            activeSubTab === 'overview' ? "bg-white text-indigo-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
          )}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Diagramok & Megoszlás</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('text_cards')}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
            activeSubTab === 'text_cards' ? "bg-white text-indigo-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
          )}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Szöveges Vélemények</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('individual')}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
            activeSubTab === 'individual' ? "bg-white text-indigo-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
          )}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Egyéni Válaszok ({totalResponses})</span>
        </button>
      </div>

      {/* TAB 1: Diagramok & Megoszlások */}
      {activeSubTab === 'overview' && (
        <div className="space-y-4">
          {totalResponses === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-700 text-sm">Még nem érkezett kitöltött kérdőív</h3>
              <p className="text-xs text-slate-400 mt-1">A diákok válaszai automatikusan itt fognak megjelenni valós időben.</p>
            </div>
          ) : (
            template.sections.map((sec) => (
              <div key={sec.id} className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3.5">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <span className="text-xl">{sec.icon}</span>
                  <h3 className="font-black text-xs sm:text-sm text-slate-800">
                    {sec.number}. {sec.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {sec.questions.map((q) => {
                    if (q.type === 'single_choice') {
                      const stat = getQuestionStats(q.id, q.options || []);
                      return (
                        <div key={q.id} className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 space-y-2">
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-xs font-bold text-slate-800 leading-snug">
                              {q.number}. {q.question}
                            </span>
                            {stat.avgScore && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 shrink-0">
                                Átlag: {stat.avgScore}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1.5 pt-1">
                            {stat.options.map((opt, i) => (
                              <div key={i} className="space-y-0.5">
                                <div className="flex justify-between text-[11px]">
                                  <span className="text-slate-600 flex items-center gap-1 truncate pr-1">
                                    <span>{opt.icon}</span>
                                    <span className="truncate">{opt.label}</span>
                                  </span>
                                  <span className="font-bold text-slate-800 shrink-0">{opt.pct}% ({opt.count})</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                                    style={{ width: `${opt.pct}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (q.type === 'multi_choice') {
                      const sorted = getMultiStats(q.id, q.options || []);
                      return (
                        <div key={q.id} className="md:col-span-2 bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 space-y-2">
                          <div className="flex justify-between items-start gap-1">
                            <span className="text-xs font-bold text-slate-800 leading-snug">
                              {q.number}. {q.question}
                            </span>
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              Többválasztós rangsor
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                            {sorted.map((item, idx) => (
                              <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200/80 space-y-1">
                                <div className="flex justify-between items-center text-[11px]">
                                  <span className="font-semibold text-slate-700 truncate pr-1 flex items-center gap-1">
                                    <span>{item.icon}</span>
                                    <span className="truncate">{item.label}</span>
                                  </span>
                                  <span className="font-bold text-emerald-800 shrink-0">{item.count} db ({item.pct}%)</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-emerald-500 rounded-full"
                                    style={{ width: `${item.pct}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: Szöveges Vélemények Kártyái */}
      {activeSubTab === 'text_cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tanári erősségek */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-100">
              <span className="text-xl">🌟</span>
              <div>
                <h3 className="font-black text-xs sm:text-sm text-emerald-900">
                  Mi az, amit a tanár jól csinál?
                </h3>
                <p className="text-[10px] text-slate-400">12. kérdés válaszai</p>
              </div>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {getTextAnswers('q12_teacher_strengths').length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">Még nem érkezett szöveges válasz.</p>
              ) : (
                getTextAnswers('q12_teacher_strengths').map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs">
                    <p className="text-slate-800 italic">"{item.text}"</p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-1 text-right">— {item.author}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Változtatási javaslatok */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-amber-100">
              <span className="text-xl">💡</span>
              <div>
                <h3 className="font-black text-xs sm:text-sm text-amber-900">
                  Min változtasson a tanár?
                </h3>
                <p className="text-[10px] text-slate-400">13. kérdés válaszai</p>
              </div>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {getTextAnswers('q13_teacher_changes').length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">Még nem érkezett szöveges válasz.</p>
              ) : (
                getTextAnswers('q13_teacher_changes').map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 text-xs">
                    <p className="text-slate-800 italic">"{item.text}"</p>
                    <p className="text-[10px] text-amber-700 font-bold mt-1 text-right">— {item.author}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Mi nehezíti a tanulást */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-rose-100">
              <span className="text-xl">⚡</span>
              <div>
                <h3 className="font-black text-xs sm:text-sm text-rose-900">
                  Mi nehezíti leginkább a tanulást a matekórán?
                </h3>
                <p className="text-[10px] text-slate-400">7. kérdés válaszai</p>
              </div>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {getTextAnswers('q7_hardest_thing').length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">Még nem érkezett szöveges válasz.</p>
              ) : (
                getTextAnswers('q7_hardest_thing').map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100 text-xs">
                    <p className="text-slate-800 italic">"{item.text}"</p>
                    <p className="text-[10px] text-rose-700 font-bold mt-1 text-right">— {item.author}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Egy dolog, amitől jobb lenne */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-indigo-100">
              <span className="text-xl">🚀</span>
              <div>
                <h3 className="font-black text-xs sm:text-sm text-indigo-900">
                  Egy dolog, amitől jobb lenne a matekóra
                </h3>
                <p className="text-[10px] text-slate-400">15. kérdés válaszai</p>
              </div>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {getTextAnswers('q15_one_magic_thing').length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4 text-center">Még nem érkezett szöveges válasz.</p>
              ) : (
                getTextAnswers('q15_one_magic_thing').map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs">
                    <p className="text-slate-800 italic">"{item.text}"</p>
                    <p className="text-[10px] text-indigo-700 font-bold mt-1 text-right">— {item.author}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* DiákZóna visszajelzések (Tetszik & Változtatnék) */}
          <div className="md:col-span-2 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-purple-100">
              <span className="text-xl">💻</span>
              <div>
                <h3 className="font-black text-xs sm:text-sm text-purple-900">
                  DiákZóna tapasztalatok (Tetszik & Változtatnék)
                </h3>
                <p className="text-[10px] text-slate-400">11. kérdés válaszai</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {getSplitAnswers('q11_diakzona_feedback').length === 0 ? (
                <p className="col-span-2 text-xs text-slate-400 italic py-4 text-center">Még nem érkezett szöveges válasz.</p>
              ) : (
                getSplitAnswers('q11_diakzona_feedback').map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-purple-50/50 border border-purple-100 space-y-2 text-xs">
                    {item.first && (
                      <div>
                        <span className="font-bold text-emerald-700 text-[10px] uppercase">👍 Tetszik:</span>
                        <p className="text-slate-800 italic">"{item.first}"</p>
                      </div>
                    )}
                    {item.second && (
                      <div>
                        <span className="font-bold text-amber-700 text-[10px] uppercase">💡 Változtatnék:</span>
                        <p className="text-slate-800 italic">"{item.second}"</p>
                      </div>
                    )}
                    <p className="text-[9px] text-purple-600 font-semibold text-right">— {item.author}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Egyéni Válaszok Listája */}
      {activeSubTab === 'individual' && (
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-black text-xs sm:text-sm text-slate-800">
              Beérkezett kitöltések ({responses.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Bal lista */}
            <div className="lg:col-span-4 space-y-1.5 max-h-96 overflow-y-auto pr-1">
              {responses.map((r, i) => {
                const isSelected = selectedResponse?.id === r.id;
                return (
                  <div
                    key={r.id || i}
                    onClick={() => setSelectedResponse(r)}
                    className={cn(
                      "p-2.5 rounded-xl cursor-pointer transition-all border flex items-center justify-between text-xs",
                      isSelected
                        ? "bg-indigo-50 border-indigo-400 text-indigo-900 font-bold shadow-2xs"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-1">
                      {r.is_anonymous ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <span className="text-base shrink-0">🎒</span>
                      )}
                      <span className="truncate">{r.is_anonymous ? `Névtelen diák #${i + 1}` : r.student_name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {r.submitted_at ? new Date(r.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Jobb részletes adatlap */}
            <div className="lg:col-span-8 bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3 max-h-96 overflow-y-auto">
              {selectedResponse ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs sm:text-sm text-slate-800">
                        {selectedResponse.is_anonymous ? 'Névtelen diák kitöltése' : selectedResponse.student_name}
                      </span>
                      {selectedResponse.is_anonymous && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Anonim
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {selectedResponse.submitted_at ? new Date(selectedResponse.submitted_at).toLocaleString() : ''}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {template.sections.flatMap(s => s.questions).map(q => {
                      const ans = selectedResponse.answers?.[q.id];
                      if (!ans) return null;

                      let display = '';
                      if (q.type === 'single_choice') {
                        const opt = q.options?.find(o => o.value === ans);
                        display = opt ? `${opt.icon || ''} ${opt.label}` : ans;
                      } else if (q.type === 'multi_choice') {
                        const list = Array.isArray(ans) ? ans : [];
                        const labels = list.map(val => q.options?.find(o => o.value === val)?.label || val);
                        display = labels.join(', ');
                      } else if (q.type === 'split_text') {
                        display = `Tetszik: "${ans.first || '–'}" | Változtatnék: "${ans.second || '–'}"`;
                      } else {
                        display = ans;
                      }

                      return (
                        <div key={q.id} className="p-2 bg-white rounded-lg border border-slate-200/80">
                          <p className="font-bold text-slate-500 text-[10px]">{q.number}. {q.question}</p>
                          <p className="font-medium text-slate-800 mt-0.5">{display}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-slate-400">Válassz ki egy diákot a listából!</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rejtett vagy előnézetben megjelenő PDF Riport elem az exportElementToPDF-hez */}
      <div className={cn(
        "rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 p-2 sm:p-4",
        showPrintPreview ? "block" : "hidden"
      )}>
        <div className="flex justify-between items-center mb-3 px-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Printer className="w-4 h-4 text-purple-600" /> Nyomtatási / PDF Előnézet
          </span>
          <Button size="sm" onClick={handleDownloadPdf} className="h-7 text-xs bg-purple-600">
            Letöltés PDF-ben
          </Button>
        </div>
        <div className="overflow-x-auto shadow-inner bg-slate-300 p-2 rounded-xl">
          <SurveyPdfReport
            ref={reportRef}
            session={session}
            responses={responses}
          />
        </div>
      </div>

      {/* Mindig renderelt rejtett PDF sablon, ha nincs nyitva az előnézet */}
      {!showPrintPreview && (
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <SurveyPdfReport
            ref={reportRef}
            session={session}
            responses={responses}
          />
        </div>
      )}
    </div>
  );
}
