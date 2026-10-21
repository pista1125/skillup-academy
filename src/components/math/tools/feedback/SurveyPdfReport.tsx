import React from 'react';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { MATH_SURVEY_TEMPLATE } from '@/data/mathSurveyTemplate';
import { SurveyResponse } from '@/types/surveyFeedback';

interface SurveyPdfReportProps {
  session: any;
  responses: SurveyResponse[];
}

export const SurveyPdfReport = React.forwardRef<HTMLDivElement, SurveyPdfReportProps>(
  ({ session, responses }, ref) => {
    const template = MATH_SURVEY_TEMPLATE;
    const totalResponses = responses.length;

    // Helper: calculate distribution of options for a single_choice question
    const getOptionStats = (questionId: string, options: any[]) => {
      const counts: Record<string, number> = {};
      options.forEach(o => { counts[o.value] = 0; });

      let sumScore = 0;
      let scoredCount = 0;

      responses.forEach(r => {
        const val = r.answers?.[questionId];
        if (val && counts[val] !== undefined) {
          counts[val]++;
        }
        const opt = options.find(o => o.value === val);
        if (opt && typeof opt.score === 'number' && opt.score > 0) {
          sumScore += opt.score;
          scoredCount++;
        }
      });

      const avgScore = scoredCount > 0 ? (sumScore / scoredCount).toFixed(1) : null;

      return {
        counts,
        avgScore,
        percentages: options.map(o => ({
          ...o,
          count: counts[o.value] || 0,
          pct: totalResponses > 0 ? Math.round(((counts[o.value] || 0) / totalResponses) * 100) : 0
        }))
      };
    };

    // Helper: calculate multi_choice counts
    const getMultiChoiceStats = (questionId: string, options: any[]) => {
      const counts: Record<string, number> = {};
      options.forEach(o => { counts[o.value] = 0; });

      responses.forEach(r => {
        const list: string[] = Array.isArray(r.answers?.[questionId]) ? r.answers[questionId] : [];
        list.forEach(val => {
          if (counts[val] !== undefined) counts[val]++;
        });
      });

      const sorted = options
        .map(o => ({
          ...o,
          count: counts[o.value] || 0,
          pct: totalResponses > 0 ? Math.round(((counts[o.value] || 0) / totalResponses) * 100) : 0
        }))
        .sort((a, b) => b.count - a.count);

      return sorted;
    };

    // Helper: collect text responses
    const getTextAnswers = (questionId: string): string[] => {
      return responses
        .map(r => r.answers?.[questionId])
        .filter(t => typeof t === 'string' && t.trim().length > 0);
    };

    // Helper: collect split text responses (first and second)
    const getSplitTextAnswers = (questionId: string) => {
      const likes: string[] = [];
      const suggestions: string[] = [];
      responses.forEach(r => {
        const item = r.answers?.[questionId];
        if (item?.first && item.first.trim()) likes.push(item.first.trim());
        if (item?.second && item.second.trim()) suggestions.push(item.second.trim());
      });
      return { likes, suggestions };
    };

    // Precalculate key statistics
    const q1Stats = getOptionStats('q1_love_math', template.sections[0].questions[0].options || []);
    const q2Stats = getOptionStats('q2_comprehension', template.sections[0].questions[1].options || []);
    const q3Stats = getOptionStats('q3_courage_ask', template.sections[0].questions[2].options || []);
    const q4Stats = getOptionStats('q4_explanation', template.sections[0].questions[3].options || []);
    const q5Stats = getOptionStats('q5_atmosphere', template.sections[0].questions[4].options || []);

    const q6Sorted = getMultiChoiceStats('q6_helps_most', template.sections[1].questions[0].options || []);
    const q7Texts = getTextAnswers('q7_hardest_thing');

    const q8Stats = getOptionStats('q8_diakzona_frequency', template.sections[2].questions[0].options || []);
    const q9Stats = getOptionStats('q9_diakzona_helpfulness', template.sections[2].questions[1].options || []);
    const q10Stats = getOptionStats('q10_diakzona_usability', template.sections[2].questions[2].options || []);
    const q11Split = getSplitTextAnswers('q11_diakzona_feedback');

    const q12Texts = getTextAnswers('q12_teacher_strengths');
    const q13Texts = getTextAnswers('q13_teacher_changes');
    const q14Sorted = getMultiChoiceStats('q14_wishes', template.sections[3].questions[2].options || []);

    const q15Texts = getTextAnswers('q15_one_magic_thing');
    const q16Texts = getTextAnswers('q16_additional_thoughts');

    return (
      <div ref={ref} className="text-slate-900 bg-white leading-normal font-sans">
        {/* ===================== OLDAL 1: ÖSSZEFOGLALÓ & HANGULAT ===================== */}
        <div className="print-page w-[210mm] min-h-[297mm] p-[16mm] mx-auto bg-white border-b-2 border-slate-300 relative box-border flex flex-col justify-between">
          <div>
            {/* Fejléc */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-indigo-600 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-indigo-700">DiákZóna</span>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                    Tanári Elemző Riport
                  </span>
                </div>
                <h1 className="text-lg font-black text-slate-900 mt-1">
                  Visszajelző Lap Összesítő – Gondolatok a matematikaórákról
                </h1>
                <p className="text-[11px] text-slate-500">
                  Részletes tanulói véleménykutatás és módszertani visszajelzés elemzés
                </p>
              </div>

              <div className="text-right text-[11px] space-y-0.5">
                <p><span className="text-slate-400">Osztály:</span> <strong className="text-slate-800">{session?.class_name || 'Osztály'}</strong></p>
                <p><span className="text-slate-400">Dátum:</span> <strong className="text-slate-800">{format(new Date(), 'yyyy. MMMM d.', { locale: hu })}</strong></p>
                <p><span className="text-slate-400">Kitöltők száma:</span> <strong className="text-indigo-600 font-bold">{totalResponses} diák</strong></p>
              </div>
            </div>

            {/* Főbb KPI Kártyák */}
            <div className="grid grid-cols-4 gap-2.5 mb-4">
              <div className="p-2.5 bg-indigo-50/70 rounded-xl border border-indigo-100 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Matek kedveltsége</p>
                <p className="text-xl font-black text-indigo-900 mt-0.5">{q1Stats.avgScore || '–'} <span className="text-xs font-normal text-indigo-500">/ 5</span></p>
                <p className="text-[9px] text-indigo-700/80 mt-0.5">Átlagos pontszám</p>
              </div>

              <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-100 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Anyag megértése</p>
                <p className="text-xl font-black text-emerald-900 mt-0.5">{q2Stats.avgScore || '–'} <span className="text-xs font-normal text-emerald-500">/ 4</span></p>
                <p className="text-[9px] text-emerald-700/80 mt-0.5">Átlagos érthetőség</p>
              </div>

              <div className="p-2.5 bg-amber-50/70 rounded-xl border border-amber-100 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Kérdezési bátorság</p>
                <p className="text-xl font-black text-amber-900 mt-0.5">{q3Stats.avgScore || '–'} <span className="text-xs font-normal text-amber-500">/ 5</span></p>
                <p className="text-[9px] text-amber-700/80 mt-0.5">Hibázási biztonságérzet</p>
              </div>

              <div className="p-2.5 bg-purple-50/70 rounded-xl border border-purple-100 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Órai hangulat</p>
                <p className="text-xl font-black text-purple-900 mt-0.5">{q5Stats.avgScore || '–'} <span className="text-xs font-normal text-purple-500">/ 4</span></p>
                <p className="text-[9px] text-purple-700/80 mt-0.5">Pozitív légkör index</p>
              </div>
            </div>

            {/* 1. Részleg: Hogyan érzed magad a matematikaórákon? */}
            <div className="space-y-3 mb-4">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>1. Hogyan érzed magad a matematikaórákon? (Válaszadási arányok)</span>
              </h2>

              <div className="space-y-2 text-[10px]">
                {/* Q1 */}
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                  <div className="flex justify-between font-bold text-slate-700 mb-1">
                    <span>1. Mennyire szereted a matematikaórákat?</span>
                    <span className="text-indigo-600">Átlag: {q1Stats.avgScore}/5</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {q1Stats.percentages.map((p, i) => (
                      <div key={i} className="bg-white p-1 rounded border border-slate-200 text-center">
                        <div className="font-semibold text-slate-600 truncate">{p.label}</div>
                        <div className="font-black text-indigo-700">{p.pct}% <span className="text-[8px] text-slate-400">({p.count})</span></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Q2 & Q3 */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span className="truncate">2. Tananyag megértése</span>
                      <span className="text-emerald-600">{q2Stats.avgScore}/4</span>
                    </div>
                    <div className="space-y-1">
                      {q2Stats.percentages.map((p, i) => (
                        <div key={i} className="flex justify-between items-center text-[9px]">
                          <span className="text-slate-600">{p.label}:</span>
                          <span className="font-bold text-slate-800">{p.pct}% ({p.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span className="truncate">3. Kérdezési, hibázási bátorság</span>
                      <span className="text-amber-600">{q3Stats.avgScore}/5</span>
                    </div>
                    <div className="space-y-1">
                      {q3Stats.percentages.map((p, i) => (
                        <div key={i} className="flex justify-between items-center text-[9px]">
                          <span className="text-slate-600">{p.label}:</span>
                          <span className="font-bold text-slate-800">{p.pct}% ({p.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Q4 & Q5 */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span className="truncate">4. Tanári magyarázat minősége</span>
                      <span className="text-indigo-600">{q4Stats.avgScore}/4</span>
                    </div>
                    <div className="space-y-1">
                      {q4Stats.percentages.map((p, i) => (
                        <div key={i} className="flex justify-between items-center text-[9px]">
                          <span className="text-slate-600">{p.label}:</span>
                          <span className="font-bold text-slate-800">{p.pct}% ({p.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    <div className="flex justify-between font-bold text-slate-700 mb-1">
                      <span className="truncate">5. Órák hangulata</span>
                      <span className="text-purple-600">{q5Stats.avgScore}/4</span>
                    </div>
                    <div className="space-y-1">
                      {q5Stats.percentages.map((p, i) => (
                        <div key={i} className="flex justify-between items-center text-[9px]">
                          <span className="text-slate-600">{p.label}:</span>
                          <span className="font-bold text-slate-800">{p.pct}% ({p.count})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Részleg: Mi segíti a tanulásodat? */}
            <div className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-200">
                2. Mi segíti leginkább a tanulásodat? (Top preferenciák)
              </h2>
              <div className="grid grid-cols-3 gap-1.5 text-[9px]">
                {q6Sorted.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-1.5 rounded-lg border border-slate-200/60 flex items-center justify-between">
                    <span className="font-semibold text-slate-700 truncate pr-1">
                      <strong className="text-indigo-600 mr-1">{idx + 1}.</strong> {item.label}
                    </span>
                    <span className="font-black text-indigo-800 bg-indigo-100 px-1.5 py-0.5 rounded">
                      {item.count} szavazat ({item.pct}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lábléc 1. oldal */}
          <div className="pt-2 border-t border-slate-200 text-[9px] text-slate-400 flex justify-between">
            <span>DiákZóna Pedagógiai Elemző Rendszer • diakzona.hu</span>
            <span>1 / 2. oldal</span>
          </div>
        </div>

        {/* ===================== OLDAL 2: DIÁKZÓNA, IGÉNYEK & SZÖVEGES VISSZAJELZÉSEK ===================== */}
        <div className="print-page w-[210mm] min-h-[297mm] p-[16mm] mx-auto bg-white border-b-2 border-slate-300 relative box-border flex flex-col justify-between">
          <div className="space-y-3.5">
            {/* Fejléc 2. oldal */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-xs font-black text-slate-800">
                DiákZóna & Módszertani Igények Elemzése • {session?.class_name}
              </h3>
              <span className="text-[10px] text-slate-500">{format(new Date(), 'yyyy. MM. dd.', { locale: hu })}</span>
            </div>

            {/* 3. Részleg: DiákZóna Weboldal Értékelése */}
            <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-purple-900">
                3. DiákZóna Weboldal Használata & Hasznossága
              </h3>
              <div className="grid grid-cols-3 gap-2 text-[9px]">
                <div className="bg-white p-2 rounded-lg border border-purple-200/60">
                  <p className="font-bold text-slate-700 mb-1">Használat gyakorisága</p>
                  {q8Stats.percentages.map((p, i) => (
                    <div key={i} className="flex justify-between py-0.5">
                      <span className="text-slate-600">{p.label}:</span>
                      <span className="font-bold text-purple-800">{p.pct}%</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-2 rounded-lg border border-purple-200/60">
                  <p className="font-bold text-slate-700 mb-1">Segítség a tanulásban</p>
                  {q9Stats.percentages.map((p, i) => (
                    <div key={i} className="flex justify-between py-0.5">
                      <span className="text-slate-600">{p.label}:</span>
                      <span className="font-bold text-purple-800">{p.pct}%</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-2 rounded-lg border border-purple-200/60">
                  <p className="font-bold text-slate-700 mb-1">Kezelhetőség & Keresés</p>
                  {q10Stats.percentages.map((p, i) => (
                    <div key={i} className="flex justify-between py-0.5">
                      <span className="text-slate-600">{p.label}:</span>
                      <span className="font-bold text-purple-800">{p.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Részleg: Mit szeretnének gyakrabban az órákon? */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-200">
                4. Mit szeretnének a diákok gyakrabban az órákon?
              </h3>
              <div className="grid grid-cols-3 gap-1.5 text-[9px]">
                {q14Sorted.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-1.5 rounded-lg border border-slate-200/60 flex items-center justify-between">
                    <span className="font-semibold text-slate-700 truncate pr-1">
                      <strong className="text-emerald-600 mr-1">{idx + 1}.</strong> {item.label}
                    </span>
                    <span className="font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                      {item.count} db ({item.pct}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Szöveges diák-visszajelzések kiemelései */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 pb-1 border-b border-slate-200">
                5. Diákok Szöveges Visszajelzései (Kiemelések)
              </h3>

              <div className="grid grid-cols-2 gap-2 text-[9px]">
                {/* Erősségek */}
                <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/70 space-y-1.5">
                  <p className="font-black text-emerald-900 flex items-center gap-1 uppercase tracking-wider">
                    <span>🌟</span> Mi az, amit a tanár jól csinál? ({q12Texts.length})
                  </p>
                  <div className="space-y-1 max-h-36 overflow-hidden">
                    {q12Texts.length === 0 ? (
                      <p className="text-slate-400 italic">Nem érkezett szöveges válasz.</p>
                    ) : (
                      q12Texts.slice(0, 5).map((txt, idx) => (
                        <p key={idx} className="bg-white p-1 rounded border border-emerald-100 text-slate-700 italic">
                          "{txt}"
                        </p>
                      ))
                    )}
                  </div>
                </div>

                {/* Javaslatok változtatásra */}
                <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/70 space-y-1.5">
                  <p className="font-black text-amber-900 flex items-center gap-1 uppercase tracking-wider">
                    <span>💡</span> Min változtasson a tanár? ({q13Texts.length})
                  </p>
                  <div className="space-y-1 max-h-36 overflow-hidden">
                    {q13Texts.length === 0 ? (
                      <p className="text-slate-400 italic">Nem érkezett szöveges válasz.</p>
                    ) : (
                      q13Texts.slice(0, 5).map((txt, idx) => (
                        <p key={idx} className="bg-white p-1 rounded border border-amber-100 text-slate-700 italic">
                          "{txt}"
                        </p>
                      ))
                    )}
                  </div>
                </div>

                {/* Mi nehezíti a tanulást */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                  <p className="font-black text-slate-800 flex items-center gap-1 uppercase tracking-wider">
                    <span>⚡</span> Mi nehezíti leginkább a tanulást? ({q7Texts.length})
                  </p>
                  <div className="space-y-1 max-h-36 overflow-hidden">
                    {q7Texts.length === 0 ? (
                      <p className="text-slate-400 italic">Nem érkezett szöveges válasz.</p>
                    ) : (
                      q7Texts.slice(0, 4).map((txt, idx) => (
                        <p key={idx} className="bg-white p-1 rounded border border-slate-200 text-slate-700 italic">
                          "{txt}"
                        </p>
                      ))
                    )}
                  </div>
                </div>

                {/* Egy dolog, amitől jobb lenne */}
                <div className="bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-200/70 space-y-1.5">
                  <p className="font-black text-indigo-900 flex items-center gap-1 uppercase tracking-wider">
                    <span>🚀</span> Egyetlen dolog, amitől jobb lenne az óra ({q15Texts.length})
                  </p>
                  <div className="space-y-1 max-h-36 overflow-hidden">
                    {q15Texts.length === 0 ? (
                      <p className="text-slate-400 italic">Nem érkezett szöveges válasz.</p>
                    ) : (
                      q15Texts.slice(0, 4).map((txt, idx) => (
                        <p key={idx} className="bg-white p-1 rounded border border-indigo-100 text-slate-700 italic">
                          "{txt}"
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lábléc 2. oldal */}
          <div className="pt-2 border-t border-slate-200 text-[9px] text-slate-400 flex justify-between">
            <span>DiákZóna Pedagógiai Elemző Rendszer • diakzona.hu</span>
            <span>2 / 2. oldal</span>
          </div>
        </div>
      </div>
    );
  }
);

SurveyPdfReport.displayName = 'SurveyPdfReport';
