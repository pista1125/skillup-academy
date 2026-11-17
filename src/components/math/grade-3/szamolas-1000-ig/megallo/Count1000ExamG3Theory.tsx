import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Count1000BlocksSvg,
  Count1000NumberLineSvg,
  Count1000RoundingSvg,
  Count1000AddSubSvg,
  Count1000MulDivSvg,
  Count1000BackSvg
} from './Count1000ExamG3Figures';
import { makeCount1000Task, makeMixedCount1000Task, makeBackTask, Count1000Task, Count1000TaskKind, BackTask, FONT, UNK } from './Count1000ExamG3Parts';

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[64px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

const KIND_LABEL: Record<Count1000TaskKind, string> = {
  szam: 'Számírás',
  szomszed: 'Szomszédok',
  kerekites: 'Kerekítés',
  osszeadas: 'Összeadás',
  kivonas: 'Kivonás',
  szorzas: 'Szorzás',
  osztas: 'Osztás',
  sorrend: 'Előbb a szorzás'
};

/** A visszafelé-gép képe. */
const BackMachine: React.FC<{ t: BackTask; step: number }> = ({ t, step }) => {
  const box = (x: number, v: string, unk: boolean, done: boolean) => (
    <g>
      <rect x={x} y={44} width="78" height="36" rx="8" fill={done ? '#dcfce7' : unk ? '#fee2e2' : '#f1f5f9'} stroke={done ? '#16a34a' : unk ? UNK : '#475569'} strokeWidth="2" />
      <text x={x + 39} y={68} textAnchor="middle" fontSize="18" fontWeight="bold" fill={done ? '#166534' : unk ? UNK : '#0f172a'}>{v}</text>
    </g>
  );
  const arc = (xa: number, xb: number, label: string) => (
    <g>
      <path d={`M ${xa} 40 Q ${(xa + xb) / 2} 6 ${xb} 40`} fill="none" stroke="#7c3aed" strokeWidth="2.2" />
      <path d={`M ${xb - 8} 34 L ${xb} 40 L ${xb - 2} 31`} fill="none" stroke="#7c3aed" strokeWidth="2.2" />
      <text x={(xa + xb) / 2} y={20} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6d28d9">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 96" className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {box(16, step >= 2 ? String(t.start) : '?', true, step >= 2)}
      {box(141, step >= 1 ? String(t.mid) : '?', true, step >= 1)}
      {box(266, String(t.target), false, false)}
      {arc(70, 155, `· ${t.k}`)}
      {arc(195, 280, `+ ${t.c}`)}
    </svg>
  );
};

export const Count1000ExamG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: Vegyes feladatok ----
  const [task, setTask] = useState<Count1000Task>(() => ({
    kind: 'kerekites',
    text: 'Kerekítsd százasra: 649',
    answer: 600,
    options: [650, 600, 700, 640],
    hints: { 650: 'Ez tízesre kerekítve. Most százasra kerekítünk!', 700: 'Kétszer kerekítettél! Mindig az eredeti számból kerekíts.', 640: 'Százasra kerekítésnél a tízeseket nézd!' },
    general: 'Százasra kerekítésnél a tízeseket nézd!'
  }));
  const [bad, setBad] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>('');
  const [solved, setSolved] = useState<boolean>(false);
  const [score, setScore] = useState<{ ok: number; all: number }>({ ok: 0, all: 0 });
  const [tried, setTried] = useState<boolean>(false);
  const newTask = (kind?: Count1000TaskKind) => {
    setTask(kind ? makeCount1000Task(kind) : makeMixedCount1000Task());
    setBad(null);
    setMsg('');
    setSolved(false);
    setTried(false);
  };
  const pick = (x: number) => {
    if (solved) return;
    if (x === task.answer) {
      setSolved(true);
      setBad(null);
      setMsg('');
      setScore((s) => ({ ok: s.ok + (tried ? 0 : 1), all: s.all + 1 }));
      return;
    }
    setTried(true);
    setBad(x);
    setMsg(task.hints[x] ?? task.general);
  };

  // ---- Labor II: Visszafelé-gép ----
  const [bt, setBt] = useState<BackTask>(() => ({ start: 70, k: 4, c: 200, target: 480, mid: 280, midOpts: [280, 680, 380, 230], startOpts: [70, 120, 80, 60] }));
  const [bStep, setBStep] = useState<number>(0);
  const [bBad, setBBad] = useState<number | null>(null);
  const [bMsg, setBMsg] = useState<string>('');
  const newBack = () => {
    setBt(makeBackTask());
    setBStep(0);
    setBBad(null);
    setBMsg('');
  };
  const pickBack = (x: number) => {
    if (bStep > 1) return;
    const ans = bStep === 0 ? bt.mid : bt.start;
    if (x === ans) {
      setBStep(bStep + 1);
      setBBad(null);
      setBMsg('');
      return;
    }
    setBBad(x);
    if (bStep === 0) {
      setBMsg(x === bt.target + bt.c ? `Visszafelé az ellenkezőjét csinálod! A + ${bt.c} helyett − ${bt.c}.` : `Visszafelé kivonunk: ${bt.target} − ${bt.c} = ?`);
    } else {
      setBMsg(x === bt.mid * bt.k ? `Visszafelé a · ${bt.k} helyett : ${bt.k} kell!` : `Visszafelé osztunk: ${bt.mid} : ${bt.k} = ?`);
    }
  };

  return (
    <TheoryTemplate
      topicId="g3-count-1000"
      subtopicId="megallo"
      grade={3}
      chapterId="szamolas-1000-ig"
      title="5. Megálló – tudáspróba"
      subtitle="A fejezet összefoglalása: számok 1000-ig, szomszédok, kerekítés, összeadás és kivonás, szorzás és osztás, szöveges feladatok."
      badge="3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_megallo_1000_ig_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat, 3 szint. Hajrá!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — AMIT MÁR TUDSZ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              10 százas = 1 ezres = 1000
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kerekítés: 0–4 lefelé, 5–9 felfelé.</li>
              <li>Bonts: 380 + 250 = 380 + 200 + 50.</li>
              <li>Szorzótábla tízesekkel: 9 · 80 = 720.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Amit már tudsz */}
      <TheorySection title="1. Amit már tudsz" badge="Tankönyv 108–117. o." badgeColor="emerald">
        <TheoryTable
          headers={['Lecke', 'Mit tudsz?', 'Példa']}
          rows={[
            ['1. Számok 1000-ig', 'írni, olvasni, kirakni', '638 = 600 + 30 + 8'],
            ['2. Szomszédok, kerekítés', 'tízes, százas szomszéd, kerekítés', '647 ≈ 650 (tízesre), 647 ≈ 600 (százasra)'],
            ['3. Összeadás, kivonás', 'fejben, bontással', '380 + 250 = 630'],
            ['4. Szorzás, osztás', 'tízesekkel, százasokkal', '7 · 80 = 560, 560 : 7 = 80']
          ]}
        />
      </TheorySection>

      {/* 2. Számok 1000-ig */}
      <TheorySection title="2. Számok 1000-ig" badge="Helyiérték" badgeColor="sky">
        <Count1000BlocksSvg />
        <Count1000NumberLineSvg />
        <TheoryCallout type="tip" title="Nulla a számban">
          Hétszázöt: 7 százas, 0 tízes, 5 egyes. Így írjuk: <strong>705</strong>. A 0 tartja a helyet!
        </TheoryCallout>
      </TheorySection>

      {/* 3. Szomszédok és kerekítés */}
      <TheorySection title="3. Szomszédok és kerekítés" badge="≈" badgeColor="amber">
        <Count1000RoundingSvg />
        <TheoryTable
          headers={['Szám', 'Tízes szomszédok', 'Százas szomszédok', 'Tízesre', 'Százasra']}
          rows={[
            ['647', '640 és 650', '600 és 700', '650', '600'],
            ['385', '380 és 390', '300 és 400', '390', '400'],
            ['951', '950 és 960', '900 és 1000', '950', '1000']
          ]}
        />
      </TheorySection>

      {/* 4. A négy alapművelet */}
      <TheorySection title="4. Számolás fejben" badge="+ − · :" badgeColor="purple">
        <Count1000AddSubSvg />
        <p className="text-sm text-slate-700">380 + 250: előbb a százasokat adom hozzá (580), aztán a tízeseket (630).</p>
        <Count1000MulDivSvg />
        <p className="text-sm text-slate-700">Egy szorzótáblás párból négy művelet lesz. Ellenőrizz mindig a párjával!</p>
      </TheorySection>

      {/* 5. Nézzük meg együtt */}
      <TheorySection title="5. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Gondoltam egy számot" badge="Szomszéd" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A 290 és a 450 összegének nagyobb százas szomszédja.</li>
              <li>Összeg: 290 + 450 = 740.</li>
              <li>A 740 a 700 és a 800 között van: <strong>800</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Vásárlás 1000 Ft-ból" badge="Pénz" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Veszel 2 füzetet, darabja 180 Ft.</li>
              <li>Fizetsz: 2 · 180 = 180 + 180 = 360 Ft.</li>
              <li>Marad: 1000 − 360 = <strong>640 Ft</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Visszafelé gondolkodom" badge="Fordított művelet" badgeColor="rose">
          <Count1000BackSvg />
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Ha háromszor annyi pénzem lenne, és kapnék még 100 Ft-ot, 1000 Ft-om lenne.</li>
            <li>Visszafelé: + 100 helyett − 100: 1000 − 100 = 900.</li>
            <li>· 3 helyett : 3: 900 : 3 = <strong>300 Ft</strong> van most.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 6. Vigyázz */}
      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Kétszer kerekítettél"
          wrong="647 ≈ 650 ≈ 700"
          wrongExplanation="Előbb tízesre, aztán abból százasra kerekítettél. Így rossz lesz!"
          correct="647 ≈ 600"
          correctExplanation="Százasra kerekítésnél csak a tízeseket nézd: 4, ezért lefelé."
        />
        <TheoryTrapBox
          title="Hol a nulla?"
          wrong="hétszázöt = 75"
          wrongExplanation="Kimaradt a tízesek helye. Háromjegyű szám lesz!"
          correct="hétszázöt = 705"
          correctExplanation="7 százas, 0 tízes, 5 egyes."
        />
        <TheoryTrapBox
          title="Előbb a szorzás!"
          wrong="200 + 3 · 90 = 870"
          wrongExplanation="Előbb összeadtál (290), aztán szoroztál."
          correct="200 + 3 · 90 = 470"
          correctExplanation="3 · 90 = 270, aztán 200 + 270 = 470."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Labor I: Vegyes feladatok" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={() => newTask()} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-bold min-h-[48px]">Új feladat (vegyes)</button>
            <div className="text-sm font-bold text-teal-900 bg-teal-50 rounded-xl px-3 py-2">Elsőre jó: {score.ok} / {score.all}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(KIND_LABEL) as Count1000TaskKind[]).map((k) => (
              <button key={k} onClick={() => newTask(k)} className={`px-3 py-2 rounded-xl text-xs font-bold min-h-[44px] ${task.kind === k ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-900 border border-teal-200'}`}>
                {KIND_LABEL[k]}
              </button>
            ))}
          </div>
          <div className="text-center text-xl font-black text-slate-800 bg-slate-50 rounded-xl px-3 py-4">{task.text}</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {task.options.map((x) => (
              <OptButton key={x} v={x} onClick={() => pick(x)} state={solved && x === task.answer ? 'ok' : bad === x ? 'bad' : null} />
            ))}
          </div>
          {msg && !solved && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{msg}</div>}
          {solved && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! A megoldás: {task.answer}.
              <button onClick={() => newTask()} className="ml-2 underline">Jöhet a következő!</button>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Labor II: Visszafelé-gép" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={newBack} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-amber-900 bg-amber-50 rounded-xl px-3 py-2">Melyik számmal indult a gép?</div>
          </div>
          <BackMachine t={bt} step={bStep} />
          <div className="text-center text-sm text-slate-700">
            {bStep === 0 && `1. lépés: Visszafelé! Mennyi volt a + ${bt.c} előtt?`}
            {bStep === 1 && `2. lépés: Mennyi volt a · ${bt.k} előtt?`}
          </div>
          {bStep < 2 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {(bStep === 0 ? bt.midOpts : bt.startOpts).map((x) => (
                <OptButton key={`${bStep}-${x}`} v={x} onClick={() => pickBack(x)} state={bBad === x ? 'bad' : null} />
              ))}
            </div>
          )}
          {bMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{bMsg}</div>}
          {bStep === 2 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Megvan! A gép ezzel a számmal indult: {bt.start}. Ellenőrzés: {bt.k} · {bt.start} = {bt.mid}, {bt.mid} + {bt.c} = {bt.target}.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Count1000ExamG3Theory;
