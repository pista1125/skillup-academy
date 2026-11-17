import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { UnitsOverviewSvg, ToolsSvg, ConversionSvg, PerimeterAreaSvg, RectSidesSvg } from './MeasurementsExamG3Figures';
import { ElapsedJumpsSvg } from '../az-ido-merese/TimeG3Figures';
import { FONT, GridShape, rectCells } from './MeasurementsExamG3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------------------------------------------------------------------------
// Labor I – Mértékváltó
// ---------------------------------------------------------------------------
type ConvKind = 'kgdkg' | 'ldl' | 'dlcl' | 'lcl' | 'mcm' | 'mdm' | 'cmmm' | 'oraperc' | 'percmp';
interface ConvTask {
  kind: ConvKind;
  a: number;
  b: number;
  big: string;
  small: string;
  factor: number;
  ans: number;
  opts: number[];
}
const CONV: Record<ConvKind, { big: string; small: string; factor: number; a: [number, number]; b: [number, number] }> = {
  kgdkg: { big: 'kg', small: 'dkg', factor: 100, a: [1, 1], b: [5, 95] },
  ldl: { big: 'l', small: 'dl', factor: 10, a: [1, 9], b: [1, 9] },
  dlcl: { big: 'dl', small: 'cl', factor: 10, a: [1, 9], b: [1, 9] },
  lcl: { big: 'l', small: 'cl', factor: 100, a: [1, 1], b: [5, 95] },
  mcm: { big: 'm', small: 'cm', factor: 100, a: [1, 9], b: [1, 99] },
  mdm: { big: 'm', small: 'dm', factor: 10, a: [1, 9], b: [1, 9] },
  cmmm: { big: 'cm', small: 'mm', factor: 10, a: [1, 9], b: [1, 9] },
  oraperc: { big: 'óra', small: 'perc', factor: 60, a: [1, 3], b: [5, 55] },
  percmp: { big: 'perc', small: 'másodperc', factor: 60, a: [1, 3], b: [5, 55] }
};
const makeConv = (): ConvTask => {
  const kinds = Object.keys(CONV) as ConvKind[];
  const kind = kinds[rnd(0, kinds.length - 1)];
  const c = CONV[kind];
  const a = rnd(c.a[0], c.a[1]);
  const b = rnd(c.b[0], c.b[1]);
  const ans = a * c.factor + b;
  const side = Number(`${a}${b}`); // egymás mellé írás
  const cands = [side, a * 100 + b, a * 10 + b, a + b, ans + c.factor, a * c.factor];
  const out = [ans];
  cands.forEach((v) => {
    if (v > 0 && v <= 1000 && !out.includes(v) && out.length < 4) out.push(v);
  });
  let k = 1;
  while (out.length < 4) {
    if (!out.includes(ans + k * 10)) out.push(ans + k * 10);
    k++;
  }
  return { kind, a, b, big: c.big, small: c.small, factor: c.factor, ans, opts: shuffle(out) };
};

// ---------------------------------------------------------------------------
// Labor II – Kerület vagy terület?
// ---------------------------------------------------------------------------
interface RectTask {
  w: number;
  h: number;
  ask: 'kerulet' | 'terulet';
  opts: number[];
}
const makeRect = (): RectTask => {
  let w = rnd(2, 7);
  let h = rnd(2, 5);
  while (2 * (w + h) === w * h) {
    w = rnd(2, 7);
    h = rnd(2, 5);
  }
  const ask: RectTask['ask'] = Math.random() < 0.5 ? 'kerulet' : 'terulet';
  const P = 2 * (w + h);
  const A = w * h;
  const ans = ask === 'kerulet' ? P : A;
  const out = [ans];
  [ask === 'kerulet' ? A : P, w + h, ask === 'kerulet' ? P - 2 : A + w, ans + 2].forEach((v) => {
    if (v > 0 && !out.includes(v) && out.length < 4) out.push(v);
  });
  let k = 1;
  while (out.length < 4) {
    if (!out.includes(ans + k)) out.push(ans + k);
    k++;
  }
  return { w, h, ask, opts: shuffle(out) };
};

const OptButton: React.FC<{ v: string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[84px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const MeasurementsExamG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [cv, setCv] = useState<ConvTask>({ kind: 'kgdkg', a: 1, b: 35, big: 'kg', small: 'dkg', factor: 100, ans: 135, opts: [135, 1035, 45, 36] });
  const [cvDone, setCvDone] = useState<boolean>(false);
  const [cvBad, setCvBad] = useState<number | null>(null);
  const [cvMsg, setCvMsg] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const newCv = () => {
    setCv(makeConv());
    setCvDone(false);
    setCvBad(null);
    setCvMsg('');
  };
  const pickCv = (v: number) => {
    if (cvDone) return;
    if (v === cv.ans) {
      setCvDone(true);
      setCvBad(null);
      setCvMsg('');
      setScore((s) => s + 1);
      return;
    }
    setCvBad(v);
    const base = `1 ${cv.big} = ${cv.factor} ${cv.small}.`;
    if (v === Number(`${cv.a}${cv.b}`)) setCvMsg(`A számokat nem írhatod egymás mellé! ${base}`);
    else if (cv.factor === 60 && v === cv.a * 100 + cv.b) setCvMsg(`Vigyázz: ${base} Nem 100!`);
    else if (v === cv.a + cv.b) setCvMsg(`Előbb váltsd át a nagyobb egységet! ${base}`);
    else if (v === cv.a * cv.factor) setCvMsg(`A ${cv.b} ${cv.small} kimaradt! Add hozzá!`);
    else setCvMsg(`Nem jó a váltószám. ${base}`);
  };

  // ---- Labor II ----
  const [rt, setRt] = useState<RectTask>({ w: 5, h: 3, ask: 'kerulet', opts: [16, 15, 8, 14] });
  const [rtDone, setRtDone] = useState<boolean>(false);
  const [rtBad, setRtBad] = useState<number | null>(null);
  const [rtMsg, setRtMsg] = useState<string>('');
  const P = 2 * (rt.w + rt.h);
  const A = rt.w * rt.h;
  const rtAns = rt.ask === 'kerulet' ? P : A;
  const newRt = () => {
    setRt(makeRect());
    setRtDone(false);
    setRtBad(null);
    setRtMsg('');
  };
  const pickRt = (v: number) => {
    if (rtDone) return;
    if (v === rtAns) {
      setRtDone(true);
      setRtBad(null);
      setRtMsg('');
      return;
    }
    setRtBad(v);
    if (rt.ask === 'kerulet' && v === A) setRtMsg('Ez a terület: a kis négyzetek száma. A kerülethez járd körbe a szélét!');
    else if (rt.ask === 'terulet' && v === P) setRtMsg('Ez a kerület: a szél hossza. A területhez a kis négyzeteket számold!');
    else if (v === rt.w + rt.h) setRtMsg(rt.ask === 'kerulet' ? 'Ez csak két oldal! A szemben lévő oldalak is kellenek.' : 'Nem összeadunk: sorok száma · egy sorban lévő kis négyzetek.');
    else setRtMsg(rt.ask === 'kerulet' ? `Járd körbe: ${rt.w} + ${rt.h} + ${rt.w} + ${rt.h} = ?` : `${rt.h} sor, soronként ${rt.w}: ${rt.h} · ${rt.w} = ?`);
  };
  const s = Math.min(34, 220 / rt.w, 150 / rt.h);

  return (
    <TheoryTemplate
      topicId="g3-measurements-1"
      subtopicId="gyakorlas-tudasproba"
      grade={3}
      chapterId="meresek"
      title="10. Gyakorlás, tudáspróba"
      subtitle="Összefoglalás: tömeg, űrtartalom, hosszúság, kerület, terület és idő."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG"
      themeColor="teal"
      pdfFilename="3_osztaly_meresek_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat 3 szinten – mutasd meg, mit tudsz!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — MÉRTÉKVÁLTÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center font-mono text-sm font-black text-teal-900 dark:text-teal-200">
              1 kg = 100 dkg &nbsp; 1 l = 10 dl = 100 cl &nbsp; 1 m = 100 cm
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Hasonlítás előtt <strong>ugyanarra az egységre</strong> váltunk.</li>
              <li>Kerület: <strong>körbejárjuk</strong>. Terület: <strong>lefedjük</strong>.</li>
              <li>Az órában <strong>60</strong> perc van, nem 100!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Amit már tudsz" badge="Tankönyv 44–51., 138–149. o." badgeColor="teal">
        <UnitsOverviewSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Ebben a fejezetben <strong>mértünk</strong>: hosszúságot, tömeget, űrtartalmat és időt.</p>
          <p>Kiszámoltuk a síkidomok <strong>kerületét</strong> és <strong>területét</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Mit mivel mérünk?" badge="Mérőeszközök" badgeColor="sky">
        <ToolsSvg />
        <TheoryTable
          headers={['Mit mérünk?', 'Mivel?', 'Mértékegység']}
          rows={[
            ['hosszúság', 'vonalzó, mérőszalag', 'mm, cm, dm, m'],
            ['tömeg', 'kétkarú mérleg, konyhai mérleg', 'dkg, kg'],
            ['űrtartalom', 'mérőpohár, mérőkancsó', 'cl, dl, l'],
            ['idő', 'óra, stopper, naptár', 'másodperc, perc, óra, nap, hét, hónap, év']
          ]}
        />
      </TheorySection>

      <TheorySection title="3. Mértékváltás" badge="Lépcső" badgeColor="emerald">
        <ConversionSvg />
        <TheoryCallout type="tip" title="Melyik a több? Előbb válts át!">
          8 dl vagy 90 cl? 8 dl = 80 cl. 80 cl &lt; 90 cl, tehát a <strong>90 cl</strong> a több. A nagyobb szám nem mindig a több!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Kerület és terület" badge="Ne keverd!" badgeColor="orange">
        <PerimeterAreaSvg />
        <RectSidesSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Kerület" badge="körbe" badgeColor="orange">
            <p className="text-sm text-slate-700">A síkidomot határoló vonalak hossza. Minden oldalt összeadunk. A téglalap szemben lévő oldalai egyenlők, a négyzet 4 oldala egyenlő.</p>
          </TheoryCard>
          <TheoryCard title="Terület" badge="lefedve" badgeColor="emerald">
            <p className="text-sm text-slate-700">Hány egység (kis négyzet) fedi le? A téglalapnál: sorok száma · egy sorban lévő kis négyzetek.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Az idő" badge="Eltelt idő" badgeColor="purple">
        <ElapsedJumpsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">Először ugorj az <strong>egész óráig</strong>, aztán a végéig. Délután és este 12-t adunk az órához: 4 óra 20 perc → 16:20.</p>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Bevásárlás" badge="Tömeg" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1 kg kenyér és 30 dkg sajt.</li>
              <li>1 kg = 100 dkg.</li>
              <li>100 + 30 = 130 dkg.</li>
              <li>Összesen <strong>1 kg 30 dkg</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Kerítés" badge="Kerület" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Téglalap alakú kert: 9 m és 4 m.</li>
              <li>Szemben lévő oldalak egyenlők.</li>
              <li>9 + 4 + 9 + 4 = 26.</li>
              <li><strong>26 m</strong> kerítés kell.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Csempe" badge="Terület" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A falon 4 sor csempe van.</li>
              <li>Egy sorban 6 csempe.</li>
              <li>4 · 6 = 24.</li>
              <li><strong>24 csempe</strong> van a falon.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="1 m 5 cm – hány cm?"
          wrong="1 m 5 cm = 15 cm"
          wrongExplanation="A számokat nem írhatjuk egymás mellé!"
          correct="1 m 5 cm = 105 cm"
          correctExplanation="1 m = 100 cm. 100 + 5 = 105 cm."
          tip="Mindig gondold végig: mennyi az 1 nagyobb egység a kisebben?"
        />
        <TheoryCallout type="warning" title="Kerület vagy terület?">
          A 3 · 4-es téglalap területe 12 kis négyzet, a kerülete 14 egység. Olvasd el jól, mit kérdez a feladat!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Mértékváltó" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={newCv} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-emerald-800 bg-emerald-50 rounded-xl px-3 py-2">Jó válaszok: {score}</div>
          </div>
          <div className="text-center text-2xl sm:text-3xl font-black text-slate-800">
            {cv.a} {cv.big} {cv.b} {cv.small} = {cvDone ? <span className="text-emerald-600">{cv.ans}</span> : '?'} {cv.small}
          </div>
          <div className="text-center text-sm font-bold text-slate-500">Segítség: 1 {cv.big} = {cv.factor} {cv.small}</div>
          <div className="flex flex-wrap gap-3 justify-center">
            {cv.opts.map((v) => (
              <OptButton key={v} v={String(v)} onClick={() => pickCv(v)} state={cvDone && v === cv.ans ? 'ok' : cvBad === v ? 'bad' : null} />
            ))}
          </div>
          {cvMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{cvMsg}</div>}
          {cvDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! {cv.a} {cv.big} = {cv.a * cv.factor} {cv.small}, és még {cv.b} {cv.small}: {cv.a * cv.factor} + {cv.b} = {cv.ans} {cv.small}.
            </div>
          )}
        </div>
      </TheorySection>

      <TheorySection title="9. Labor II: Kerület vagy terület?" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <button onClick={newRt} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
          <svg viewBox="0 0 260 180" className="w-full max-w-sm h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <GridShape
              x={(260 - rt.w * s) / 2}
              y={(170 - rt.h * s) / 2}
              cols={rt.w}
              rows={rt.h}
              s={s}
              cells={rectCells(rt.w, rt.h)}
              fill={rtDone && rt.ask === 'terulet' ? '#86efac' : '#e0f2fe'}
              stroke={rtDone && rt.ask === 'kerulet' ? '#f97316' : '#1d4ed8'}
            />
          </svg>
          <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold text-lg">
            Mennyi a téglalap <span className="underline">{rt.ask === 'kerulet' ? 'kerülete' : 'területe'}</span>?
            <div className="text-xs font-bold text-orange-700">{rt.ask === 'kerulet' ? '1 egység = 1 kis négyzet oldala' : 'egység: 1 kis négyzet'}</div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {rt.opts.map((v) => (
              <OptButton key={v} v={String(v)} onClick={() => pickRt(v)} state={rtDone && v === rtAns ? 'ok' : rtBad === v ? 'bad' : null} />
            ))}
          </div>
          {rtMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{rtMsg}</div>}
          {rtDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              {rt.ask === 'kerulet'
                ? `Ügyes! Kerület: ${rt.w} + ${rt.h} + ${rt.w} + ${rt.h} = ${P} egység. (A területe ${A} kis négyzet.)`
                : `Ügyes! Terület: ${rt.h} sor, soronként ${rt.w}: ${rt.h} · ${rt.w} = ${A} kis négyzet. (A kerülete ${P} egység.)`}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MeasurementsExamG3Theory;
