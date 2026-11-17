import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { WordStepsSvg, WordLibrarySvg, WordMoreSvg, WordLessThanSvg, WordThreeSvg, WordMenuSvg } from './AddWordProblemsG3Figures';
import { FONT, rnd, pick, shuffle, ins, opts4, BarRowsG, PartsBarG } from '../az-osszeg-valtozasai/SumChangesG3Parts';
import { WrittenAddG3Column } from '../irasbeli-osszeadas/WrittenAddG3Column';
import { round10, sumNoCarry, carriesOf } from './AddWordProblemsG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Lépésről lépésre (szöveges feladat generátor)
// ---------------------------------------------------------------------------
export type WordKind = 'sum2' | 'sum3' | 'more' | 'less';
export interface WordTask {
  kind: WordKind;
  text: string;
  question: string;
  /** A számításban szereplő számok (tagok). */
  nums: number[];
  labels: string[];
  unit: string;
  result: number;
  plan: string;
  planOpts: string[];
  est: number;
  estOpts: number[];
  resOpts: number[];
  answer: string;
}

interface Tpl {
  text: (n: number[]) => string;
  q: string;
  unit: string;
  ans: (r: number) => string;
  labels: string[];
}
const SUM2: Tpl[] = [
  { text: ([a, b]) => `Az iskolai könyvtárban hétfőn ${a}, kedden ${b} könyvet kölcsönöztek ki.`, q: 'Hány könyvet kölcsönöztek ki a két napon összesen?', unit: 'könyv', ans: (r) => `A két napon összesen ${r} könyvet kölcsönöztek ki.`, labels: ['hétfő', 'kedd'] },
  { text: ([a, b]) => `A cukrászdában délelőtt ${a}, délután ${b} fánkot adtak el.`, q: 'Hány fánkot adtak el egész nap?', unit: 'fánk', ans: (r) => `Egész nap ${r} fánkot adtak el.`, labels: ['délelőtt', 'délután'] },
  { text: ([a, b]) => `A kertészetben ${a} tulipánhagymát és ${b} nárciszhagymát ültettek el.`, q: 'Hány virághagymát ültettek el összesen?', unit: 'hagyma', ans: (r) => `Összesen ${r} virághagymát ültettek el.`, labels: ['tulipán', 'nárcisz'] },
  { text: ([a, b]) => `Egy kirakós játék egyik zacskójában ${a}, a másikban ${b} darab van.`, q: 'Hány darabos a kirakó?', unit: 'darab', ans: (r) => `A kirakó ${r} darabos.`, labels: ['1. zacskó', '2. zacskó'] }
];
const MORE: Tpl[] = [
  { text: ([a, d]) => `Szombaton ${a} néző volt a bábszínházban. Vasárnap ${ins(d)} több.`, q: 'Hányan voltak vasárnap?', unit: 'néző', ans: (r) => `Vasárnap ${r} néző volt.`, labels: ['szombat', 'vasárnap'] },
  { text: ([a, d]) => `A kék szalag ${a} cm hosszú. A zöld szalag ${d} cm-rel hosszabb.`, q: 'Milyen hosszú a zöld szalag?', unit: 'cm', ans: (r) => `A zöld szalag ${r} cm hosszú.`, labels: ['kék', 'zöld'] },
  { text: ([a, d]) => `Egy mesekönyv ${a} oldalas. Egy másik mesekönyv ${d} oldallal hosszabb.`, q: 'Hány oldalas a másik mesekönyv?', unit: 'oldal', ans: (r) => `A másik mesekönyv ${r} oldalas.`, labels: ['első', 'másik'] }
];
const LESS: Tpl[] = [
  { text: ([a, d]) => `A kifestő ${a} Ft. Ez ${d} Ft-tal olcsóbb, mint a társasjáték.`, q: 'Mennyibe kerül a társasjáték?', unit: 'Ft', ans: (r) => `A társasjáték ${r} Ft-ba kerül.`, labels: ['kifestő', 'társas'] },
  { text: ([a, d]) => `A fiúk ${a} papírsárkányt hajtogattak. Ez ${ins(d)} kevesebb, mint amennyit a lányok hajtogattak.`, q: 'Hány papírsárkányt hajtogattak a lányok?', unit: 'sárkány', ans: (r) => `A lányok ${r} papírsárkányt hajtogattak.`, labels: ['fiúk', 'lányok'] },
  { text: ([a, d]) => `A kis csomag ${a} g. Ez ${d} g-mal könnyebb, mint a nagy csomag.`, q: 'Hány gramm a nagy csomag?', unit: 'g', ans: (r) => `A nagy csomag ${r} g.`, labels: ['kis', 'nagy'] }
];
const SUM3: Tpl[] = [
  { text: ([a, b, c]) => `A piacon reggel ${a} kg, délben ${b} kg, délután ${c} kg krumplit adtak el.`, q: 'Hány kg krumplit adtak el összesen?', unit: 'kg', ans: (r) => `Összesen ${r} kg krumplit adtak el.`, labels: ['reggel', 'délben', 'délután'] },
  { text: ([a, b, c]) => `A gyerekek gesztenyét gyűjtöttek. Hétfőn ${a}, kedden ${b}, szerdán ${c} szemet.`, q: 'Hány szem gesztenyét gyűjtöttek?', unit: 'szem', ans: (r) => `Összesen ${r} szem gesztenyét gyűjtöttek.`, labels: ['hétfő', 'kedd', 'szerda'] }
];

const distinctStrings = (correct: string, wrong: string[]) => {
  const out = [correct];
  wrong.forEach((w) => {
    if (!out.includes(w) && out.length < 3) out.push(w);
  });
  return out;
};

export const makeWordTask = (kind?: WordKind): WordTask => {
  const k: WordKind = kind ?? pick(['sum2', 'sum2', 'more', 'less', 'sum3']);
  for (;;) {
    let nums: number[];
    let tpl: Tpl;
    if (k === 'sum2') {
      nums = [rnd(105, 489), rnd(105, 489)];
      tpl = pick(SUM2);
    } else if (k === 'more' || k === 'less') {
      nums = [rnd(105, 480), rnd(35, 389)];
      tpl = pick(k === 'more' ? MORE : LESS);
    } else {
      nums = [rnd(100, 350), rnd(100, 350), rnd(40, 99)];
      tpl = pick(SUM3);
    }
    const result = nums.reduce((s, n) => s + n, 0);
    if (result > 999) continue;
    if (sumNoCarry(nums) === result && Math.random() < 0.7) continue; // legyen többnyire beváltás
    const plan = nums.join(' + ');
    const [a, b] = nums;
    let wrongPlans: string[];
    if (k === 'sum3') wrongPlans = [`${a} + ${b}`, `${a} + ${nums[2]}`];
    else wrongPlans = [a >= b ? `${a} − ${b}` : `${b} − ${a}`, `${a} + ${a}`];
    const planOpts = shuffle(distinctStrings(plan, wrongPlans));
    if (planOpts.length < 3) continue;
    const est = nums.reduce((s, n) => s + round10(n), 0);
    const estOpts = shuffle(opts4(est, [est + 100, est - 100, est + 200, Math.abs(round10(a) - round10(b))], 1000).slice(0, 4));
    const resOpts = shuffle(opts4(result, [sumNoCarry(nums), result + 10, result - 10, result + 100, Math.abs(a - b)], 1000));
    return {
      kind: k,
      text: tpl.text(nums),
      question: tpl.q,
      nums,
      labels: tpl.labels,
      unit: tpl.unit,
      result,
      plan,
      planOpts,
      est,
      estOpts,
      resOpts,
      answer: tpl.ans(result)
    };
  }
};

const artW = (w: string, cap = false) => { const a = /^[aáeéiíoóöőuúüű]/i.test(w) ? 'az' : 'a'; return cap ? a[0].toUpperCase() + a.slice(1) : a; };

/** Célzott tipp a rossz lépésre. */
export const wordHint = (t: WordTask, step: number, v: string | number): string => {
  if (step === 0) {
    const s = String(v);
    if (s.includes('−')) {
      if (t.kind === 'less') return `Vigyázz, a szöveg becsap! ${artW(t.labels[0], true)} ${t.labels[0]} a kevesebb, ${artW(t.labels[1])} ${t.labels[1]} a több. A többet összeadással kapod meg.`;
      if (t.kind === 'more') return `${artW(t.labels[1], true)} ${t.labels[1]} ugyanannyi, mint ${artW(t.labels[0])} ${t.labels[0]}, és még ${t.nums[1]}. Ezt össze kell adni.`;
      return 'A kérdés: összesen mennyi? Ehhez össze kell adni.';
    }
    if (t.kind === 'sum3') return 'Három adat van a szövegben. Mind a hármat add össze!';
    return 'Nézd meg, melyik számok vannak a szövegben! Mindkettőt használd egyszer.';
  }
  if (step === 1) return `Kerekíts tízesre: ${t.nums.map((n) => `${n} ≈ ${round10(n)}`).join(', ')}. Aztán add össze!`;
  const n = Number(v);
  if (n === sumNoCarry(t.nums)) return 'Elfelejtetted a maradékot! Ha egy oszlopban 10 vagy több jön ki, 1-et továbbviszel.';
  if (Math.abs(n - t.est) >= 50) return `Nézd meg a becslést: körülbelül ${t.est}. Ez messze van tőle!`;
  return 'Számold újra oszloponként: egyesek, tízesek, százasok!';
};

// ---------------------------------------------------------------------------
// Labor II – Ki a több?
// ---------------------------------------------------------------------------
export interface CompareWordTask {
  phrase: 'tobb' | 'kevesebb';
  known: string;
  other: string;
  thing: string;
  a: number;
  d: number;
  /** a + d */
  other_v: number;
  /** a + (a + d) */
  total: number;
  text: string;
  resOpts: number[];
  totalOpts: number[];
}
const NAMES = ['Bori', 'Ádám', 'Luca', 'Botond', 'Emma', 'Vince', 'Hédi', 'Benedek'];
const THINGS = ['matricát', 'gesztenyét', 'pontot', 'bélyeget'];

export const makeCompareWord = (): CompareWordTask => {
  for (;;) {
    const [known, other] = shuffle(NAMES).slice(0, 2);
    const thing = pick(THINGS);
    const a = rnd(105, 420);
    const d = rnd(28, 260);
    const ov = a + d;
    const total = a + ov;
    if (total > 999) continue;
    const phrase = pick(['tobb', 'kevesebb'] as const);
    const text =
      phrase === 'tobb'
        ? `${known} ${a} ${thing} gyűjtött. ${other} ${ins(d)} többet gyűjtött.`
        : `${known} ${a} ${thing} gyűjtött. Ez ${ins(d)} kevesebb, mint amennyit ${other} gyűjtött.`;
    return {
      phrase,
      known,
      other,
      thing,
      a,
      d,
      other_v: ov,
      total,
      text,
      resOpts: shuffle(opts4(ov, [sumNoCarry([a, d]), ov + 10, ov - 10, Math.abs(a - d)], 1000)),
      totalOpts: shuffle(opts4(total, [ov, sumNoCarry([a, ov]), total + 10, total - 100], 1000))
    };
  }
};

const Opt: React.FC<{ v: React.ReactNode; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[72px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

const INIT_WORD: WordTask = {
  kind: 'sum2',
  text: 'Az iskolai könyvtárban hétfőn 236, kedden 158 könyvet kölcsönöztek ki.',
  question: 'Hány könyvet kölcsönöztek ki a két napon összesen?',
  nums: [236, 158],
  labels: ['hétfő', 'kedd'],
  unit: 'könyv',
  result: 394,
  plan: '236 + 158',
  planOpts: ['236 − 158', '236 + 158', '236 + 236'],
  est: 400,
  estOpts: [300, 400, 500, 80],
  resOpts: [384, 394, 404, 78],
  answer: 'A két napon összesen 394 könyvet kölcsönöztek ki.'
};

const INIT_CMP: CompareWordTask = {
  phrase: 'kevesebb',
  known: 'Bori',
  other: 'Ádám',
  thing: 'matricát',
  a: 175,
  d: 148,
  other_v: 323,
  total: 498,
  text: 'Bori 175 matricát gyűjtött. Ez 148-cal kevesebb, mint amennyit Ádám gyűjtött.',
  resOpts: [313, 323, 27, 333],
  totalOpts: [488, 323, 498, 508]
};

export const AddWordProblemsG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [wt, setWt] = useState<WordTask>(INIT_WORD);
  const [wStep, setWStep] = useState(0);
  const [wBad, setWBad] = useState<string | null>(null);
  const [wMsg, setWMsg] = useState('');
  const newWord = () => {
    setWt(makeWordTask());
    setWStep(0);
    setWBad(null);
    setWMsg('');
  };
  const pickW = (v: string | number) => {
    const ok = wStep === 0 ? v === wt.plan : wStep === 1 ? v === wt.est : v === wt.result;
    if (ok) {
      setWStep(wStep + 1);
      setWBad(null);
      setWMsg('');
    } else {
      setWBad(String(v));
      setWMsg(wordHint(wt, wStep, v));
    }
  };
  const isSum = wt.kind === 'sum2' || wt.kind === 'sum3';

  // ---- Labor II ----
  const [ct, setCt] = useState<CompareWordTask>(INIT_CMP);
  const [cStep, setCStep] = useState(0);
  const [cBad, setCBad] = useState<string | null>(null);
  const [cMsg, setCMsg] = useState('');
  const newCmp = () => {
    setCt(makeCompareWord());
    setCStep(0);
    setCBad(null);
    setCMsg('');
  };
  const pickC = (v: string | number) => {
    let ok = false;
    let hint = '';
    if (cStep === 0) {
      ok = v === ct.other;
      hint =
        ct.phrase === 'kevesebb'
          ? `Figyelj! „${ct.known} ${ins(ct.d)} kevesebbet gyűjtött, mint ${ct.other}.” Tehát ${ct.other} gyűjtött többet.`
          : `A szöveg szerint ${ct.other} gyűjtött ${ins(ct.d)} többet.`;
    } else if (cStep === 1) {
      ok = v === '+';
      hint = `${ct.other} csíkja olyan hosszú, mint ${ct.known} csíkja, és még ${ct.d}. Ezért összeadunk.`;
    } else if (cStep === 2) {
      ok = v === ct.other_v;
      hint = Number(v) === sumNoCarry([ct.a, ct.d]) ? 'Elfelejtetted a maradékot hozzáadni!' : `Számold ki írásban: ${ct.a} + ${ct.d}.`;
    } else if (cStep === 3) {
      ok = v === ct.total;
      hint = Number(v) === ct.other_v ? `Ez csak ${ct.other} gyűjtése. Add hozzá ${ct.known} ${ct.a} darabját is!` : `Most a kettőt add össze: ${ct.a} + ${ct.other_v}.`;
    }
    if (ok) {
      setCStep(cStep + 1);
      setCBad(null);
      setCMsg('');
    } else {
      setCBad(String(v));
      setCMsg(hint);
    }
  };

  return (
    <TheoryTemplate
      topicId="g3-written-addition"
      subtopicId="szoveges-feladatok"
      grade={3}
      chapterId="irasbeli-osszeadas"
      title="5. Szöveges feladatok"
      subtitle="Olvasd el, gyűjtsd ki az adatokat, rajzolj, becsülj, számolj írásban, ellenőrizz és válaszolj!"
      badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_szoveges_feladatok_irasbeli_osszeadas_tananyag.pdf"
      practiceTitle="Készen állsz? Oldjunk meg feladatokat!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — LÉPÉSRŐL LÉPÉSRE!',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-sm font-black text-orange-900 dark:text-orange-200">
              Adatok → Terv → Becslés → Számítás → Ellenőrzés → Válasz
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Rajzolj <strong>csíkot</strong>: kinek van több?</li>
              <li>A becslés megmutatja, ha elszámoltad.</li>
              <li>A válasz <strong>mondat</strong>, mértékegységgel.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 82. o." badgeColor="orange">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Szöveges feladatokat oldunk meg írásbeli összeadással.</p>
          <p>Minden feladatot ugyanazokkal a lépésekkel.</p>
          <p>A számok 1000-ig tartanak.</p>
        </div>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. A megoldás lépései" badge="6 lépés" badgeColor="amber">
        <WordStepsSvg />
        <TheoryCallout type="tip" title="A csík segít">
          Rajzolj csíkot! Ami több, az hosszabb. Ami kérdés, oda „?” kerül.
        </TheoryCallout>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Nézzük meg együtt: összesen" badge="Mintapélda" badgeColor="sky">
        <p className="text-sm text-slate-700 font-bold">Az iskolai könyvtárban hétfőn 236, kedden 158 könyvet kölcsönöztek ki. Hány könyvet kölcsönöztek ki összesen?</p>
        <WordLibrarySvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li><strong>Adatok:</strong> hétfő 236, kedd 158, összesen ?</li>
          <li><strong>Terv:</strong> 236 + 158 = ?</li>
          <li><strong>Becslés:</strong> 236 ≈ 240, 158 ≈ 160. B: 400.</li>
          <li><strong>Számítás:</strong> 6 meg 8 az 14, leírom a 4-et, maradt 1. 3 meg 5 az 8, meg 1 az 9. 2 meg 1 az 3. Eredmény: 394.</li>
          <li><strong>Ellenőrzés:</strong> 394 közel van a 400-hoz. Felcserélve: 158 + 236 = 394.</li>
          <li><strong>Válasz:</strong> Összesen 394 könyvet kölcsönöztek ki.</li>
        </ul>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. „…-val több”" badge="Csíkkal" badgeColor="emerald">
        <p className="text-sm text-slate-700 font-bold">A múzeumban délelőtt 148 jegyet adtak el, délután 176-tal többet. Hány jegyet adtak el délután? És egész nap?</p>
        <WordMoreSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="a) Délután" badge="148 + 176" badgeColor="emerald">
            <p className="text-sm text-slate-700">148 + 176 = <strong>324</strong>. Délután 324 jegyet adtak el.</p>
          </TheoryCard>
          <TheoryCard title="b) Egész nap" badge="148 + 324" badgeColor="sky">
            <p className="text-sm text-slate-700">148 + 324 = <strong>472</strong>. Egész nap 472 jegyet adtak el.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="warning" title="Két kérdés, két számolás">
          A b) kérdéshez kell az a) eredménye! Ne a 148 + 176-ot add meg válasznak.
        </TheoryCallout>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Csapda: „…-val kevesebb, mint”" badge="Figyelj!" badgeColor="rose">
        <p className="text-sm text-slate-700 font-bold">A piros szalag 186 cm hosszú. Ez 127 cm-rel rövidebb, mint a kék szalag. Milyen hosszú a kék szalag?</p>
        <WordLessThanSvg />
        <p className="text-sm text-slate-700">A szövegben „rövidebb” van, de a <strong>kéket</strong> keressük, és az a hosszabb. Ezért összeadunk: 186 + 127 = <strong>313</strong>. A kék szalag 313 cm.</p>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Három adat" badge="Három tag" badgeColor="amber">
        <p className="text-sm text-slate-700 font-bold">A gyümölcsös standon 128 kg almát, 216 kg körtét és 93 kg szilvát adtak el. Hány kg gyümölcsöt adtak el összesen?</p>
        <WordThreeSvg />
        <p className="text-sm text-slate-700">Becslés: 130 + 220 + 90 = 440. Írásban: 8 meg 6 meg 3 az 17, leírom a 7-et, maradt 1. 2 meg 1 meg 9 az 12, meg 1 az 13, leírom a 3-at, maradt 1. 1 meg 2 az 3, meg 1 az 4. <strong>437 kg</strong>.</p>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Olvass le adatot!" badge="Étlap" badgeColor="purple">
        <WordMenuSvg />
        <TheoryCard title="Kakaós-túrós palacsinta" badge="160 + 85 + 145" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>A palacsinta 160 Ft. A kakaó 85 Ft. A túró 145 Ft.</li>
            <li>160 + 85 + 145 = <strong>390</strong>.</li>
            <li>A kakaós-túrós palacsinta 390 Ft. 400 Ft elég rá, és marad 10 Ft.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 8 */}
      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A „kevesebb” szó nem mindig kivonás"
          wrong="A fiúk 175-en vannak, ez 148-cal kevesebb, mint a lányok. Lányok: 175 − 148 = 27"
          wrongExplanation="A lányok vannak többen! Nem lehetnek csak 27-en."
          correct="Lányok: 175 + 148 = 323"
          correctExplanation="Rajzolj csíkot: a lányok csíkja a hosszabb."
        />
        <TheoryTrapBox
          title="Hiányzik a válasz"
          wrong="Válasz: 394"
          wrongExplanation="Mi 394? Könyv? Forint? Nem derül ki."
          correct="Válasz: Összesen 394 könyvet kölcsönöztek ki."
          correctExplanation="A válasz egész mondat, a mértékegységgel együtt."
        />
      </TheorySection>

      {/* 9 – Labor I */}
      <TheorySection title="9. Labor I: Lépésről lépésre" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={newWord} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button
              onClick={() => {
                setWt(makeWordTask('less'));
                setWStep(0);
                setWBad(null);
                setWMsg('');
              }}
              className="px-4 py-2 rounded-xl bg-white border-2 border-rose-300 text-rose-700 text-sm font-bold min-h-[48px]"
            >
              Csapdás feladat
            </button>
          </div>
          <div className="rounded-xl bg-orange-50 p-3 text-base text-slate-800">
            <p>{wt.text}</p>
            <p className="font-bold mt-1">{wt.question}</p>
          </div>
          {wStep >= 1 && (
            <svg viewBox={isSum ? '0 0 260 100' : '0 0 260 90'} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
              {isSum ? (
                <g>
                  <PartsBarG parts={wt.nums.map((n) => ({ v: n, text: String(n) }))} total={`összesen: ? ${wt.unit}`} x={10} y={42} W={240} h={30} fs={13} />
                  {(() => {
                    const sum = wt.result;
                    let xx = 10;
                    return wt.labels.map((l, i) => {
                      const w = (240 * wt.nums[i]) / sum;
                      const el = <text key={l} x={xx + w / 2} y={90} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">{l}</text>;
                      xx += w;
                      return el;
                    });
                  })()}
                </g>
              ) : (
                <BarRowsG
                  rows={[
                    { name: wt.labels[0], segs: [{ v: wt.nums[0], text: String(wt.nums[0]), color: '#93c5fd' }] },
                    { name: wt.labels[1], segs: [{ v: wt.nums[0], text: String(wt.nums[0]), color: '#93c5fd' }, { v: wt.nums[1], text: String(wt.nums[1]), color: '#86efac', dashed: wt.kind === 'less' }], after: '?' }
                  ]}
                  x={4}
                  y={10}
                  nameW={66}
                  W={170}
                  h={28}
                  gap={14}
                  fs={13}
                />
              )}
            </svg>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className={`rounded-xl p-2 ${wStep >= 1 ? 'bg-emerald-50 text-emerald-900' : 'bg-slate-50 text-slate-500'}`}><strong>Terv:</strong> {wStep >= 1 ? `${wt.plan} = ?` : '…'}</div>
            <div className={`rounded-xl p-2 ${wStep >= 2 ? 'bg-emerald-50 text-emerald-900' : 'bg-slate-50 text-slate-500'}`}><strong>Becslés:</strong> {wStep >= 2 ? `B: ${wt.est}` : '…'}</div>
          </div>
          {wStep >= 2 && (
            <WrittenAddG3Column
              addends={wt.nums}
              result={wStep >= 3 ? wt.result : '___'}
              carries={wStep >= 3 ? carriesOf(wt.nums) : undefined}
              className="w-full max-w-[170px] h-auto mx-auto"
            />
          )}
          {wStep < 3 && (
            <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">
              {wStep === 0 && '1. Terv: melyik művelettel számolsz?'}
              {wStep === 1 && '2. Becslés: kerekítsd a számokat tízesre! Körülbelül mennyi?'}
              {wStep === 2 && '3. Számítás: számolj írásban! Mennyi az eredmény?'}
            </div>
          )}
          {wStep < 3 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {(wStep === 0 ? wt.planOpts : wStep === 1 ? wt.estOpts : wt.resOpts).map((v) => (
                <Opt key={`${wStep}-${v}`} v={wStep === 1 ? `B: ${v}` : v} onClick={() => pickW(v)} state={wBad === String(v) ? 'bad' : null} />
              ))}
            </div>
          )}
          {wMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{wMsg}</div>}
          {wStep === 3 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800 space-y-1">
              <div>Ellenőrzés: a becslés {wt.est}, a számolás {wt.result}. Közel vannak, jó!</div>
              <div>Felcserélve: {[...wt.nums].reverse().join(' + ')} = {wt.result}.</div>
              <div className="text-base">Válasz: {wt.answer}</div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 10 – Labor II */}
      <TheorySection title="10. Labor II: Ki gyűjtött többet?" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <button onClick={newCmp} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
          <div className="rounded-xl bg-emerald-50 p-3 text-base text-slate-800">
            <p>{ct.text}</p>
          </div>
          {cStep >= 1 && (
            <svg viewBox="0 0 260 84" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
              <BarRowsG
                rows={[
                  { name: ct.known, segs: [{ v: ct.a, text: String(ct.a), color: '#fde68a' }] },
                  {
                    name: ct.other,
                    segs: [{ v: ct.a, text: String(ct.a), color: '#86efac' }, { v: ct.d, text: String(ct.d), color: '#bbf7d0', dashed: true }],
                    after: cStep >= 3 ? String(ct.other_v) : '?'
                  }
                ]}
                x={4}
                y={10}
                nameW={66}
                W={160}
                h={28}
                gap={14}
                fs={13}
              />
            </svg>
          )}
          {cStep >= 2 && cStep < 4 && (
            <WrittenAddG3Column
              addends={cStep === 3 ? [ct.a, ct.other_v] : [ct.a, ct.d]}
              result="___"
              className="w-full max-w-[160px] h-auto mx-auto"
            />
          )}
          {cStep < 4 && (
            <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">
              {cStep === 0 && 'Ki gyűjtött többet?'}
              {cStep === 1 && `Hogyan kapod meg, mennyit gyűjtött ${ct.other}?`}
              {cStep === 2 && `Mennyit gyűjtött ${ct.other}?`}
              {cStep === 3 && `${ct.other}: ${ct.other_v}. És hányat gyűjtöttek ketten együtt?`}
            </div>
          )}
          {cStep < 4 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {cStep === 0 &&
                [ct.known, ct.other].sort().map((n) => <Opt key={n} v={n} onClick={() => pickC(n)} state={cBad === n ? 'bad' : null} />)}
              {cStep === 1 &&
                ['+', '−'].map((o) => <Opt key={o} v={`${ct.a} ${o} ${ct.d}`} onClick={() => pickC(o)} state={cBad === o ? 'bad' : null} />)}
              {cStep === 2 && ct.resOpts.map((v) => <Opt key={v} v={v} onClick={() => pickC(v)} state={cBad === String(v) ? 'bad' : null} />)}
              {cStep === 3 && ct.totalOpts.map((v) => <Opt key={v} v={v} onClick={() => pickC(v)} state={cBad === String(v) ? 'bad' : null} />)}
            </div>
          )}
          {cMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{cMsg}</div>}
          {cStep === 4 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! {ct.other} {ct.other_v} {ct.thing} gyűjtött. Ketten együtt {ct.total} {ct.thing} gyűjtöttek.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AddWordProblemsG3Theory;
