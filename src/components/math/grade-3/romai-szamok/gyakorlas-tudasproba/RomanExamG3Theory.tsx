import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { RomanSignsSummarySvg, RomanBuildSvg, RomanTensLineSvg, RomanTrapsSvg, RomanCompareSvg } from './RomanExamG3Figures';
import { MatchstickMoveSvg, RomanEverywhereSvg } from '../romai-szamok-a-mindennapokban/RomanEverydayG3Figures';
import { SIGN_COLOR, romanIssue, romanValue, toRoman, makeTask, TaskKind, MixedTask } from './RomanExamG3Utils';

const KINDS: { k: TaskKind; label: string }[] = [
  { k: 'rom2ar', label: 'Római → arab' },
  { k: 'ar2rom', label: 'Arab → római' },
  { k: 'compare', label: '<, >, =' },
  { k: 'next', label: 'Mi jön utána?' },
  { k: 'clock', label: 'Óra' },
  { k: 'month', label: 'Hónap' }
];

const firstTask: MixedTask = {
  kind: 'rom2ar',
  text: 'Mennyi ez arab számmal: XLVI?',
  answer: '46',
  options: ['64', '46', '56', '44'],
  explain: 'XLVI = XL + VI = 40 + 6 = 46'
};

export const RomanExamG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---------- Labor I: számkirakó ----------
  const [target, setTarget] = useState<number>(47);
  const [built, setBuilt] = useState<string>('');
  const [buildMsg, setBuildMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const check = () => {
    const issue = romanIssue(built);
    if (issue) return setBuildMsg({ ok: false, text: issue });
    const v = romanValue(built);
    if (v === target) setBuildMsg({ ok: true, text: `Hibátlan! ${built} = ${target}.` });
    else setBuildMsg({ ok: false, text: `Ez ${built} = ${v}. Neked ${target} kell. ${v < target ? 'Ez kevesebb.' : 'Ez több.'}` });
  };
  const newTarget = () => {
    let t = target;
    while (t === target) t = 1 + Math.floor(Math.random() * 100);
    setTarget(t);
    setBuilt('');
    setBuildMsg(null);
  };

  // ---------- Labor II: vegyes feladatgép ----------
  const [kind, setKind] = useState<TaskKind | 'mix'>('mix');
  const [task, setTask] = useState<MixedTask>(firstTask);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState<{ good: number; all: number }>({ good: 0, all: 0 });
  const nextTask = (k: TaskKind | 'mix' = kind) => {
    const kk = k === 'mix' ? KINDS[Math.floor(Math.random() * KINDS.length)].k : k;
    setTask(makeTask(kk));
    setPicked(null);
  };
  const answer = (o: string) => {
    if (picked) return;
    setPicked(o);
    setScore({ good: score.good + (o === task.answer ? 1 : 0), all: score.all + 1 });
  };

  return (
    <TheoryTemplate
      topicId="g3-roman-numbers"
      subtopicId="gyakorlas-tudasproba"
      grade={3}
      chapterId="romai-szamok"
      title="4. Gyakorlás, tudáspróba"
      subtitle="Ismételd át, amit a római számokról tanultál! Utána jöhet a nagy tudáspróba 3 szinten."
      badge="3. OSZTÁLY • II. A RÓMAI SZÁMOK • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_romai_szamok_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat vár rád 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AMIT MÁR TUDSZ — A RÓMAI SZÁMOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
              I = 1 • V = 5 • X = 10 • L = 50 • C = 100
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kisebb jel jobbra: hozzáadjuk (VI = 6). Kisebb jel balra: elvesszük (IV = 4). Csak így: IV, IX, XL, XC.</li>
              <li>Egyforma jelből legfeljebb 3 állhat egymás mellett. A V és az L nem ismétlődik.</li>
              <li>Előbb a tízeseket írd, aztán az egyeseket: 47 = XL + VII = XLVII.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. A jelek" badge="1. lecke" badgeColor="amber">
        <RomanSignsSummarySvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Hozzáadjuk" badge="jobbra" badgeColor="emerald">
            <p className="text-sm text-slate-700">VIII = 5 + 3 = 8 • LXI = 50 + 10 + 1 = 61</p>
          </TheoryCard>
          <TheoryCard title="Elvesszük" badge="balra" badgeColor="rose">
            <p className="text-sm text-slate-700">IX = 10 – 1 = 9 • XC = 100 – 10 = 90</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="2. Írás és olvasás 100-ig" badge="2. lecke" badgeColor="sky">
        <RomanBuildSvg />
        <RomanTensLineSvg />
        <TheoryTable
          headers={['Tízesek', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC']}
          rows={[['', '10', '20', '30', '40', '50', '60', '70', '80', '90']]}
        />
        <TheoryTable headers={['Egyesek', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']} rows={[['', '1', '2', '3', '4', '5', '6', '7', '8', '9']]} />
        <RomanCompareSvg />
      </TheorySection>

      <TheorySection title="3. A mindennapokban és fejtörőkben" badge="3. lecke" badgeColor="purple">
        <RomanEverywhereSvg />
        <MatchstickMoveSvg />
      </TheorySection>

      <TheorySection title="4. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Írd rómaiul: 68" badge="Írás" badgeColor="sky">
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
              <li>68 = 60 + 8</li>
              <li>60 = LX</li>
              <li>8 = VIII</li>
              <li>68 = <strong>LXVIII</strong></li>
            </ol>
          </TheoryCard>
          <TheoryCard title="B) Olvasd el: XCIV" badge="Olvasás" badgeColor="emerald">
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
              <li>Vágd ketté: XC | IV</li>
              <li>XC = 100 – 10 = 90</li>
              <li>IV = 5 – 1 = 4</li>
              <li>XCIV = <strong>94</strong></li>
            </ol>
          </TheoryCard>
          <TheoryCard title="C) XXXV + XIV = ?" badge="Művelet" badgeColor="purple">
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
              <li>XXXV = 35</li>
              <li>XIV = 14</li>
              <li>35 + 14 = 49</li>
              <li>49 = XL + IX = <strong>XLIX</strong></li>
            </ol>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Ügyes trükk">
          Műveletnél mindig írd át a római számokat arab számra! Számolj, aztán írd vissza.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Vigyázz!" badge="Csapda" badgeColor="rose">
        <RomanTrapsSvg />
        <TheoryTrapBox
          title="A 99 nem IC"
          wrong="99 = IC"
          wrongExplanation="Az I-t csak a V és az X elé írhatjuk."
          correct="99 = XC + IX = XCIX"
          correctExplanation="Előbb a tízesek (90 = XC), aztán az egyesek (9 = IX)."
          tip="Mindig két részben írd: tízesek, aztán egyesek."
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="6. Labor I: Római számkirakó" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-orange-50 rounded-xl p-3 text-base font-bold text-orange-900 text-center">
            Rakd ki római számmal: <span className="text-2xl">{target}</span>
          </div>
          <div className="min-h-[64px] rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center gap-1 px-2 flex-wrap">
            {built ? (
              built.split('').map((c, i) => (
                <span key={i} className="text-3xl font-black font-serif" style={{ color: SIGN_COLOR[c] }}>
                  {c}
                </span>
              ))
            ) : (
              <span className="text-sm text-slate-400">Koppints a jelekre!</span>
            )}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {['I', 'V', 'X', 'L', 'C'].map((s) => (
              <button
                key={s}
                onClick={() => {
                  if (built.length < 10) setBuilt(built + s);
                  setBuildMsg(null);
                }}
                className="rounded-xl border-2 bg-white py-3 text-2xl font-black font-serif min-h-[56px]"
                style={{ color: SIGN_COLOR[s], borderColor: SIGN_COLOR[s] }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={check} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-bold min-h-[44px]">
              Ellenőrzés
            </button>
            <button
              onClick={() => {
                setBuilt(built.slice(0, -1));
                setBuildMsg(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[44px]"
            >
              ⌫ Utolsó jel törlése
            </button>
            <button onClick={newTarget} className="px-4 py-2 rounded-xl bg-slate-700 text-white text-sm font-bold min-h-[44px]">
              Új feladat
            </button>
          </div>
          {buildMsg && <div className={`rounded-xl p-2 text-center text-sm font-bold ${buildMsg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{buildMsg.text}</div>}
          {buildMsg && !buildMsg.ok && <p className="text-xs text-slate-500 text-center">Segítség: {target} = {Math.floor(target / 10) * 10} + {target % 10}. Előbb a tízeseket rakd ki!</p>}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="7. Labor II: Vegyes feladatgép" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {[{ k: 'mix' as const, label: 'Vegyes' }, ...KINDS].map((o) => (
              <button
                key={o.k}
                onClick={() => {
                  setKind(o.k);
                  nextTask(o.k);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold min-h-[44px] ${kind === o.k ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-lg font-bold text-purple-900 text-center">{task.text}</div>
          <div className={`grid gap-2 ${task.options.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
            {task.options.map((o) => {
              const isAns = o === task.answer;
              const cls = picked ? (isAns ? 'bg-emerald-100 border-emerald-500' : o === picked ? 'bg-rose-100 border-rose-500' : 'bg-slate-50 border-slate-200') : 'bg-white border-slate-300';
              return (
                <button key={o} onClick={() => answer(o)} className={`rounded-xl border-2 py-3 text-lg font-black min-h-[56px] ${cls}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {picked && (
            <div className={`rounded-xl p-2 text-center text-sm font-bold ${picked === task.answer ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {picked === task.answer ? 'Helyes! ' : 'Nem egészen. '}
              {task.explain}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => nextTask()} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[44px]">
              Új feladat
            </button>
            <span className="text-sm text-slate-600">
              Eredmény: <strong>{score.good}</strong> / {score.all}
            </span>
            {score.good > 0 && score.good <= 100 && <span className="text-xs text-slate-500">Rómaiul: {toRoman(score.good)} jó válasz</span>}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RomanExamG3Theory;
