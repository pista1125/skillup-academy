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
  NeighboursTrainSvg,
  NeighboursLineSvg,
  SunflowersSvg,
  RoundingRuleSvg,
  ApproxSignSvg,
  PriceTagsSvg
} from './Rounding200G3Figures';
import { NumLine, LineMark, LineArrow } from './Rounding200G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
/** Névelő a szám elé: „az 5”, „az 50”, „a 140”. */
const art = (n: number) => (String(n)[0] === '5' || n === 1 ? 'az' : 'a');
const Art = (n: number) => (art(n) === 'az' ? 'Az' : 'A');
const opts4 = (correct: number, wrong: number[]): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (w >= 0 && w <= 200 && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 2;
  while (out.length < 4) {
    const w = correct + (k % 2 ? k : -k);
    if (w >= 0 && w <= 200 && !out.includes(w)) out.push(w);
    k++;
  }
  return shuffle(out);
};

// ---------------------------------------------------------------------------
// Labor I – Szomszédkereső
// ---------------------------------------------------------------------------
type FieldKey = 'ke' | 'ne' | 'kt' | 'nt';
const FIELD_ORDER: FieldKey[] = ['ke', 'ne', 'kt', 'nt'];
const FIELD_NAME: Record<FieldKey, string> = {
  ke: 'kisebb egyes szomszéd',
  ne: 'nagyobb egyes szomszéd',
  kt: 'kisebb tízes szomszéd',
  nt: 'nagyobb tízes szomszéd'
};
interface NbTask { n: number; ans: Record<FieldKey, number>; opts: Record<FieldKey, number[]> }
const makeNb = (forceRound?: boolean): NbTask => {
  const round = forceRound ?? Math.random() < 0.2;
  const n = round ? rnd(11, 19) * 10 : (() => {
    let v = rnd(101, 199);
    while (v % 10 === 0) v = rnd(101, 199);
    return v;
  })();
  const f = Math.floor(n / 10) * 10;
  const kt = round ? n - 10 : f;
  const nt = round ? n + 10 : f + 10;
  const ans = { ke: n - 1, ne: n + 1, kt, nt };
  return {
    n,
    ans,
    opts: {
      ke: opts4(n - 1, [n + 1, n - 10, n - 2]),
      ne: opts4(n + 1, [n - 1, n + 10, n + 2]),
      kt: opts4(kt, [round ? n : nt, kt - 10, n - 1]),
      nt: opts4(nt, [round ? n : kt, nt + 10 <= 200 ? nt + 10 : nt - 20, n + 1])
    }
  };
};

// ---------------------------------------------------------------------------
// Labor II – Kerekítő
// ---------------------------------------------------------------------------
const makeRoundNum = (): number => {
  const r = Math.random();
  if (r < 0.15) return rnd(11, 19) * 10; // kerek tízes
  if (r < 0.35) return rnd(10, 19) * 10 + 5; // 5-re végződik
  let v = rnd(100, 199);
  while (v % 10 === 0 || v % 10 === 5) v = rnd(100, 199);
  return v;
};
const roundTen = (n: number) => Math.floor((n + 5) / 10) * 10;

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null; disabled?: boolean }> = ({ v, onClick, state, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[72px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const Rounding200G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [nb, setNb] = useState<NbTask>(() => ({
    n: 163,
    ans: { ke: 162, ne: 164, kt: 160, nt: 170 },
    opts: { ke: [162, 164, 153, 161], ne: [164, 162, 173, 165], kt: [160, 170, 150, 162], nt: [170, 160, 180, 164] }
  }));
  const [nbStep, setNbStep] = useState<number>(0);
  const [nbBad, setNbBad] = useState<number | null>(null);
  const [nbMsg, setNbMsg] = useState<string>('');
  const newNb = (forceRound?: boolean) => {
    setNb(makeNb(forceRound));
    setNbStep(0);
    setNbBad(null);
    setNbMsg('');
  };
  const nbField = FIELD_ORDER[nbStep];
  const pickNb = (v: number) => {
    if (nbStep >= 4) return;
    const key = nbField;
    if (v === nb.ans[key]) {
      setNbStep(nbStep + 1);
      setNbBad(null);
      setNbMsg('');
      return;
    }
    setNbBad(v);
    const n = nb.n;
    const isRound = n % 10 === 0;
    let msg = '';
    if (key === 'ke') msg = v === n + 1 ? 'Ez nagyobb a számnál! A kisebb szomszéd 1-gyel kisebb.' : `Az egyes szomszéd csak 1-gyel kisebb: ${n} − 1 = ?`;
    else if (key === 'ne') msg = v === n - 1 ? 'Ez kisebb a számnál! A nagyobb szomszéd 1-gyel nagyobb.' : `Az egyes szomszéd csak 1-gyel nagyobb: ${n} + 1 = ?`;
    else if (isRound && v === n) msg = `${Art(n)} ${n} maga a szám. A szomszédja nem lehet saját maga! Lépj egy kerek tízest ${key === 'kt' ? 'vissza' : 'előre'}.`;
    else if (key === 'kt') msg = v === nb.ans.nt ? 'Ez a nagyobb tízes szomszéd. Most a kisebbet keresd!' : `Melyik az a kerek tízes, amelyik közvetlenül ${art(n)} ${n} előtt van?`;
    else msg = v === nb.ans.kt ? 'Ez a kisebb tízes szomszéd. Most a nagyobbat keresd!' : `Melyik az a kerek tízes, amelyik közvetlenül ${art(n)} ${n} után jön?`;
    setNbMsg(msg);
  };
  const nbMarks: LineMark[] = [{ v: nb.n, color: '#a16207' }];
  if (nbStep > 0) nbMarks.push({ v: nb.ans.ke, color: '#15803d' });
  if (nbStep > 1) nbMarks.push({ v: nb.ans.ne, color: '#15803d' });
  if (nbStep > 2) nbMarks.push({ v: nb.ans.kt, color: '#1d4ed8' });
  if (nbStep > 3) nbMarks.push({ v: nb.ans.nt, color: '#1d4ed8' });
  const cells: { key: FieldKey | 'n'; label: string; value: number }[] = [
    { key: 'kt', label: 'kisebb tízes', value: nb.ans.kt },
    { key: 'ke', label: 'kisebb egyes', value: nb.ans.ke },
    { key: 'n', label: 'a szám', value: nb.n },
    { key: 'ne', label: 'nagyobb egyes', value: nb.ans.ne },
    { key: 'nt', label: 'nagyobb tízes', value: nb.ans.nt }
  ];

  // ---- Labor II ----
  const [rn, setRn] = useState<number>(147);
  const [rnDone, setRnDone] = useState<boolean>(false);
  const [rnBad, setRnBad] = useState<number | null>(null);
  const [rnMsg, setRnMsg] = useState<string>('');
  const [streak, setStreak] = useState<number>(0);
  const newRn = () => {
    let v = makeRoundNum();
    while (v === rn) v = makeRoundNum();
    setRn(v);
    setRnDone(false);
    setRnBad(null);
    setRnMsg('');
  };
  const f10 = Math.floor(rn / 10) * 10;
  const rnIsRound = rn % 10 === 0;
  const rnChoices = rnIsRound ? [rn - 10, rn, rn + 10] : [f10, f10 + 10];
  const rnAns = roundTen(rn);
  const pickRn = (v: number) => {
    if (rnDone) return;
    if (v === rnAns) {
      setRnDone(true);
      setRnBad(null);
      setRnMsg('');
      setStreak((s) => s + 1);
      return;
    }
    setRnBad(v);
    setStreak(0);
    const e = rn % 10;
    if (rnIsRound) setRnMsg(`${Art(rn)} ${rn} kerek tízes. A tízesre kerekített értéke maga a szám!`);
    else if (e === 5) setRnMsg('Az egyesek helyén 5 áll. Ez pont középen van. Ilyenkor mindig a nagyobb tízesre kerekítünk!');
    else setRnMsg(`Számold meg a lépéseket! A ${f10} csak ${e} lépésre van, a ${f10 + 10} pedig ${10 - e} lépésre. Melyik van közelebb?`);
  };
  const rnLo = rnIsRound ? rn - 12 : f10 - 2;
  const rnHi = Math.min(200, rnIsRound ? rn + 12 : f10 + 12);
  const rnArrows: LineArrow[] = rnDone && !rnIsRound ? [{ from: rn, to: rnAns, color: '#16a34a' }] : [];
  const rnMarks: LineMark[] = [{ v: rn, color: '#a16207' }];

  return (
    <TheoryTemplate
      topicId="g3-count-200"
      subtopicId="szamszomszedok-kerekites"
      grade={3}
      chapterId="szamolas-200-ig"
      title="3. Számszomszédok, kerekítés"
      subtitle="Egyes és tízes szomszédok, a ≈ jel, kerekítés tízesre 200-ig."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • TANANYAG"
      themeColor="sky"
      pdfFilename="3_osztaly_szamszomszedok_kerekites_200_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Kerekítsünk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — KEREKÍTÉS TÍZESRE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              163 ≈ 160 &nbsp; 175 ≈ 180 &nbsp; 190 ≈ 190
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Nézd az <strong>egyeseket</strong>!</li>
              <li>0, 1, 2, 3, 4 → a <strong>kisebb</strong> tízes. 5, 6, 7, 8, 9 → a <strong>nagyobb</strong> tízes.</li>
              <li>A kerek tízes <strong>marad</strong>, ami volt.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 33–34. o." badgeColor="sky">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Megkeressük a számok <strong>szomszédait</strong> 200-ig.</p>
          <p>Megtanuljuk, mit jelent a <strong>≈</strong> jel.</p>
          <p>Kerekítünk <strong>tízesre</strong>. Így könnyebb becsülni!</p>
        </div>
      </TheorySection>

      {/* 2. Számszomszédok */}
      <TheorySection title="2. Ki lakik a szám mellett?" badge="Számszomszédok" badgeColor="emerald">
        <NeighboursTrainSvg />
        <NeighboursLineSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Egyes szomszédok" badge="±1" badgeColor="emerald">
            <p className="text-sm text-slate-700">Egyet lépsz vissza vagy előre. A 147 egyes szomszédai: <strong>146 és 148</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Tízes szomszédok" badge="kerek tízesek" badgeColor="blue">
            <p className="text-sm text-slate-700">A két legközelebbi kerek tízes. A 147 ezek között van: <strong>140 és 150</strong>.</p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Kisebb tízes', 'Kisebb egyes', 'Szám', 'Nagyobb egyes', 'Nagyobb tízes']}
          rows={[
            ['120', '125', '126', '127', '130'],
            ['100', '102', '103', '104', '110'],
            ['180', '188', '189', '190', '190'],
            ['150', '159', '160', '161', '170']
          ]}
        />
        <TheoryCallout type="info" title="Mi van a kerek tízesekkel?">
          A 160 maga is kerek tízes. Ezért a tízes szomszédai a <strong>150</strong> és a <strong>170</strong>. A szám nem lehet a saját szomszédja!
        </TheoryCallout>
      </TheorySection>

      {/* 3. Közelítő érték */}
      <TheorySection title="3. Pontosan vagy körülbelül?" badge="≈ jel" badgeColor="amber">
        <SunflowersSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A képen nem látszik, pontosan milyen magas a napraforgó. Csak azt látjuk, melyik két vonal között van.</p>
          <p>Például: <strong>a C 130 cm-nél magasabb, de 140 cm-nél alacsonyabb.</strong></p>
        </div>
        <ApproxSignSvg />
        <TheoryCallout type="tip" title="Mikor jó a körülbelül?">
          „Kb. 150 gyerek volt a műsoron.” Itt nem fontos a pontos szám. De a buszjegy árát vagy a telefonszámot <strong>pontosan</strong> kell tudni!
        </TheoryCallout>
      </TheorySection>

      {/* 4. Kerekítés */}
      <TheorySection title="4. Kerekítés tízesre" badge="Szabály" badgeColor="orange">
        <RoundingRuleSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A közelebbi tízes" badge="1, 2, 3, 4" badgeColor="blue">
            <p className="text-sm text-slate-700">A 133 közelebb van a 130-hoz. <strong>133 ≈ 130</strong>. És 172 ≈ 170.</p>
          </TheoryCard>
          <TheoryCard title="Ha 5 az egyes" badge="5 → felfelé" badgeColor="orange">
            <p className="text-sm text-slate-700">A 135 pont középen van. Ilyenkor a <strong>nagyobb</strong> tízes jön: <strong>135 ≈ 140</strong>. És 95 ≈ 100.</p>
          </TheoryCard>
          <TheoryCard title="Kerek tízes" badge="marad" badgeColor="emerald">
            <p className="text-sm text-slate-700">A kerek tízest nem kell kerekíteni. <strong>180 ≈ 180</strong>, 100 ≈ 100.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Nézzük meg együtt */}
      <TheorySection title="5. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Kerekítsd tízesre: 196!" badge="Lépésről lépésre" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A tízes szomszédai: 190 és 200.</li>
              <li>Az egyesek helyén 6 áll. Ez 5 vagy több.</li>
              <li>Tehát a nagyobb tízes: <strong>196 ≈ 200</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Melyik számokból lesz 150?" badge="Visszafelé" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Lentről jönnek: 145, 146, 147, 148, 149.</li>
              <li>Fentről jönnek: 151, 152, 153, 154.</li>
              <li>És maga a 150. Összesen <strong>10 szám</strong>: 145-től 154-ig.</li>
            </ul>
          </TheoryCard>
        </div>
        <PriceTagsSvg />
        <TheoryCard title="C) A papírboltban" badge="Becslés" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Füzet: 78 Ft ≈ 80 Ft.</li>
            <li>Ragasztó: 134 Ft ≈ 130 Ft.</li>
            <li>Zsírkréta: 165 Ft ≈ 170 Ft.</li>
            <li>Így gyorsan látod: a zsírkréta a legdrágább, kb. 170 Ft.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 6. Vigyázz */}
      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="145 – lefelé vagy felfelé?"
          wrong="145 ≈ 140"
          wrongExplanation="A 145 pont középen van a 140 és a 150 között. De az 5-nél nem mehetünk lefelé!"
          correct="145 ≈ 150"
          correctExplanation="Ha az egyesek helyén 5 áll, mindig a nagyobb tízesre kerekítünk."
          tip="0, 1, 2, 3, 4 → le. 5, 6, 7, 8, 9 → fel."
        />
        <TheoryCallout type="warning" title="A tízesek is változhatnak!">
          198 nem 190! A 198 közelebb van a 200-hoz: <strong>198 ≈ 200</strong>. És 97 ≈ 100.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Labor I: Szomszédkereső" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newNb()} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={() => newNb(true)} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Kerek tízes jöjjön!</button>
          </div>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {cells.map((c) => {
              const idx = c.key === 'n' ? -1 : FIELD_ORDER.indexOf(c.key);
              const shown = c.key === 'n' || idx < nbStep;
              const active = c.key !== 'n' && idx === nbStep;
              return (
                <div
                  key={c.key}
                  className={`rounded-xl border-2 p-1.5 sm:p-2 text-center ${
                    c.key === 'n' ? 'bg-yellow-100 border-yellow-500' : active ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="text-xl sm:text-2xl font-black text-slate-800">{shown ? c.value : '?'}</div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 leading-tight">{c.label}</div>
                </div>
              );
            })}
          </div>
          <NumLine lo={nb.ans.kt - 2} hi={Math.min(200, nb.ans.nt + 2)} marks={nbMarks} W={340} H={96} />
          {nbStep < 4 && (
            <>
              <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">
                Melyik {art(nb.n)} {nb.n} {FIELD_NAME[nbField]}ja?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {nb.opts[nbField].map((v) => (
                  <OptButton key={`${nbStep}-${v}`} v={v} onClick={() => pickNb(v)} state={nbBad === v ? 'bad' : null} />
                ))}
              </div>
            </>
          )}
          {nbMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{nbMsg}</div>}
          {nbStep === 4 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! Megtaláltad mind a négy szomszédot: {nb.ans.kt}, {nb.ans.ke}, {nb.ans.ne}, {nb.ans.nt}. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Labor II: Kerekítő" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={newRn} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-orange-800 bg-orange-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <div className="text-center text-3xl font-black text-slate-800">
            {rn} ≈ {rnDone ? <span className="text-emerald-600">{rnAns}</span> : '?'}
          </div>
          <NumLine lo={rnLo} hi={rnHi} marks={rnMarks} arrows={rnArrows} W={340} H={104} />
          <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">Kerekítsd tízesre! Melyik kerek tízes lesz belőle?</div>
          <div className="flex flex-wrap gap-3 justify-center">
            {rnChoices.map((v) => (
              <OptButton key={v} v={v} onClick={() => pickRn(v)} state={rnDone && v === rnAns ? 'ok' : rnBad === v ? 'bad' : null} />
            ))}
          </div>
          {rnMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{rnMsg}</div>}
          {rnDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              {rnIsRound
                ? `Szuper! ${Art(rn)} ${rn} kerek tízes, ezért ${rn} ≈ ${rn}.`
                : rn % 10 === 5
                  ? `Szuper! 5-ös egyes → felfelé: ${rn} ≈ ${rnAns}.`
                  : `Szuper! ${rn} ≈ ${rnAns}, mert ez a közelebbi tízes.`}
              {streak >= 5 ? ' Már ' + streak + ' jó válasz egymás után!' : ''}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Rounding200G3Theory;
