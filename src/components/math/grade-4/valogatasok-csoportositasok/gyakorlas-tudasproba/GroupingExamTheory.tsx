import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ChapterMapSvg, EvenTripleVennSvg, BlocksTableSvg, OutfitGridSvg } from './GroupingExamFigures';
import { NumberSetsSvg, VENN2 } from '../valogatasok-halmazokba/SetSortingFigures';
import { ThreeWaysSvg } from '../valogatasok-tablazatokba/TableSortingFigures';
import { RunnersTreeSvg } from '../hanyfele-lehetoseg-van/PossibilitiesFigures';
import { QuantifierBoxesSvg } from '../igaz-vagy-hamis/TrueFalse4Figures';

// ---------------------------------------------------------------------------
// Segédek: álvéletlen (ismételhető) feladatgenerálás
// ---------------------------------------------------------------------------
export const seeded = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export interface Prop {
  label: string;
  /** mondatban: „… eleme páros.” */
  word: string;
  f: (n: number) => boolean;
}

export const PROPS: Prop[] = [
  { label: 'Páros', word: 'páros', f: (n) => n % 2 === 0 },
  { label: 'Négyjegyű', word: 'négyjegyű', f: (n) => n >= 1000 && n <= 9999 },
  { label: 'Az 5 többszöröse', word: 'az 5 többszöröse', f: (n) => n % 5 === 0 },
  { label: 'A 100 többszöröse', word: 'a 100 többszöröse', f: (n) => n % 100 === 0 },
  { label: '5000-nél nagyobb', word: '5000-nél nagyobb', f: (n) => n > 5000 },
  { label: 'Van benne 3-as számjegy', word: 'olyan, amelyben van 3-as számjegy', f: (n) => String(n).includes('3') }
];

export const NUMBER_POOL = [
  45, 54, 300, 475, 600, 735, 1000, 1246, 1530, 2350, 3063, 3570, 4016, 4290, 4580, 5000, 5600, 5939, 6606, 7000, 7225, 8002, 8150, 8808, 9500, 9579, 9705, 9998
];

export type Reg = 'A' | 'AB' | 'B' | 'O';
export const regionOf = (n: number, a: Prop, b: Prop): Reg => (a.f(n) && b.f(n) ? 'AB' : a.f(n) ? 'A' : b.f(n) ? 'B' : 'O');

export const makeVennTask = (seed: number) => {
  const r = seeded(seed);
  const i = Math.floor(r() * PROPS.length);
  let j = Math.floor(r() * (PROPS.length - 1));
  if (j >= i) j += 1;
  const n = NUMBER_POOL[Math.floor(r() * NUMBER_POOL.length)];
  return { a: PROPS[i], b: PROPS[j], n };
};

// ---------------------------------------------------------------------------
// Labor I – Vegyes válogató: halmazábra és táblázat
// ---------------------------------------------------------------------------
export const MixedVennLab: React.FC = () => {
  const [seed, setSeed] = useState(1);
  const [pick, setPick] = useState<Reg | null>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const { a, b, n } = makeVennTask(seed);
  const ans = regionOf(n, a, b);
  const ok = pick === ans;

  const choose = (r: Reg) => {
    if (pick !== null) return;
    setPick(r);
    setScore((s) => ({ ok: s.ok + (r === ans ? 1 : 0), all: s.all + 1 }));
  };
  const next = () => {
    setSeed((s) => s + 1);
    setPick(null);
  };
  const yn = (v: boolean) => (v ? 'igen' : 'nem');
  const btn = (r: Reg, label: string, cell: string) => (
    <button
      key={r}
      onClick={() => choose(r)}
      aria-label={`rész ${r}`}
      className={`px-3 py-3 rounded-xl text-xs font-bold border-2 text-left ${
        pick === null
          ? 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-900'
          : r === ans
            ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
            : r === pick
              ? 'border-rose-400 bg-rose-50 text-rose-800'
              : 'border-slate-200 bg-white text-slate-400'
      }`}
    >
      <div>{label}</div>
      <div className="font-normal opacity-80">táblázatban: {cell}</div>
    </button>
  );

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between text-sm font-bold text-slate-600">
        <span>{seed}. feladat</span>
        <span>
          Jó válasz: {score.ok} / {score.all}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <svg viewBox="0 0 360 240" className="w-full h-auto" fontFamily="system-ui, sans-serif">
          <rect x="4" y="4" width="352" height="232" rx="12" fill="#f8fafc" stroke="#0f766e" strokeWidth="2" />
          <circle cx={VENN2.ax} cy={VENN2.cy} r={VENN2.r} fill="#0891b2" fillOpacity={pick && (ans === 'A' || ans === 'AB') ? 0.25 : 0.1} stroke="#0891b2" strokeWidth="2.2" />
          <circle cx={VENN2.bx} cy={VENN2.cy} r={VENN2.r} fill="#d97706" fillOpacity={pick && (ans === 'B' || ans === 'AB') ? 0.25 : 0.1} stroke="#d97706" strokeWidth="2.2" />
          <text x={VENN2.ax - 20} y="40" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0e7490">
            {a.label}
          </text>
          <text x={VENN2.bx + 20} y="40" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#b45309">
            {b.label}
          </text>
          {pick !== null && (
            <text
              x={ans === 'A' ? 86 : ans === 'AB' ? 180 : ans === 'B' ? 274 : 320}
              y={ans === 'O' ? 220 : 145}
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              fill="#0f172a"
            >
              {n}
            </text>
          )}
        </svg>
        <div className="space-y-3">
          <div className="text-center">
            <span className="text-sm text-slate-600">Hová kerül a(z) </span>
            <span className="text-3xl font-black text-emerald-700">{n}</span>
            <span className="text-sm text-slate-600"> ?</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {btn('A', `Csak: ${a.label}`, `${a.label}: igen, ${b.label}: nem`)}
            {btn('AB', 'Közös rész', 'mindkettő igaz')}
            {btn('B', `Csak: ${b.label}`, `${a.label}: nem, ${b.label}: igen`)}
            {btn('O', 'Egyik karikába sem', 'egyik sem igaz')}
          </div>
        </div>
      </div>
      {pick !== null && (
        <div className={`rounded-xl p-3 text-sm font-bold ${ok ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
          {ok ? 'Helyes! ' : 'Nem jó. '}
          {a.label}? <u>{yn(a.f(n))}</u> · {b.label}? <u>{yn(b.f(n))}</u>
        </div>
      )}
      {pick !== null && (
        <button onClick={next} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold">
          Új feladat →
        </button>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Igaz vagy hamis? generátor
// ---------------------------------------------------------------------------
export type Quant = 'mind' | 'van' | 'egyiksem' | 'nemmind';

export const sentence = (q: Quant, p: Prop) =>
  q === 'mind'
    ? `Mindegyik eleme ${p.word}.`
    : q === 'van'
      ? `Van olyan eleme, amelyik ${p.word}.`
      : q === 'egyiksem'
        ? `Egyik eleme sem ${p.word}.`
        : `Nem mindegyik eleme ${p.word}.`;

export const truthOf = (q: Quant, p: Prop, set: number[]) =>
  q === 'mind' ? set.every(p.f) : q === 'van' ? set.some(p.f) : q === 'egyiksem' ? !set.some(p.f) : !set.every(p.f);

const SENT_PROPS = PROPS.filter((p) => p.label !== 'Van benne 3-as számjegy');
const QUANTS: Quant[] = ['mind', 'van', 'egyiksem', 'nemmind'];

export const makeTruthTask = (seed: number) => {
  const r = seeded(seed * 7919 + 13);
  const p = SENT_PROPS[Math.floor(r() * SENT_PROPS.length)];
  const q = QUANTS[Math.floor(r() * QUANTS.length)];
  const mode = r();
  const withP = NUMBER_POOL.filter(p.f);
  const without = NUMBER_POOL.filter((n) => !p.f(n));
  const pickFrom = (arr: number[], k: number) => {
    const c = [...arr];
    const out: number[] = [];
    while (out.length < k && c.length) out.push(c.splice(Math.floor(r() * c.length), 1)[0]);
    return out;
  };
  // 1/3: mind rendelkezik, 1/3: egyik sem, 1/3: vegyes
  const set =
    mode < 0.33 ? pickFrom(withP, 5) : mode < 0.66 ? pickFrom(without, 5) : [...pickFrom(withP, 2), ...pickFrom(without, 3)].sort((x, y) => x - y);
  return { p, q, set: set.sort((x, y) => x - y) };
};

export const TruthGenLab: React.FC = () => {
  const [seed, setSeed] = useState(1);
  const [pick, setPick] = useState<boolean | null>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const { p, q, set } = makeTruthTask(seed);
  const truth = truthOf(q, p, set);

  const choose = (v: boolean) => {
    if (pick !== null) return;
    setPick(v);
    setScore((s) => ({ ok: s.ok + (v === truth ? 1 : 0), all: s.all + 1 }));
  };

  return (
    <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between text-sm font-bold text-slate-600">
        <span>{seed}. állítás</span>
        <span>
          Jó válasz: {score.ok} / {score.all}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {set.map((n) => (
          <span
            key={n}
            className={`px-3 py-2 rounded-xl border-2 font-mono font-black text-lg ${
              pick === null ? 'border-slate-200 bg-slate-50' : p.f(n) ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 bg-white text-slate-500'
            }`}
          >
            {n}
          </span>
        ))}
      </div>
      <div className="text-center text-lg font-black text-rose-800">„{sentence(q, p)}”</div>
      <div className="flex gap-3 justify-center">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            onClick={() => choose(v)}
            className={`w-28 h-14 rounded-2xl text-lg font-black ${
              pick === v ? (v === truth ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white') : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {v ? 'Igaz' : 'Hamis'}
          </button>
        ))}
      </div>
      {pick !== null && (
        <div className={`rounded-xl p-3 text-sm font-bold ${pick === truth ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
          {pick === truth ? 'Helyes! ' : 'Nem jó. '}A zölddel jelölt számokra igaz, hogy {p.word}: {set.filter(p.f).length} db az 5-ből. Az állítás tehát {truth ? 'IGAZ' : 'HAMIS'}.
        </div>
      )}
      {pick !== null && (
        <button
          onClick={() => {
            setSeed((s) => s + 1);
            setPick(null);
          }}
          className="px-5 py-3 rounded-xl bg-rose-600 text-white font-bold"
        >
          Új állítás →
        </button>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Tananyag
// ---------------------------------------------------------------------------
export const GroupingExamTheory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    grade={4}
    chapterId="valogatasok-csoportositasok"
    topicId="g4-grouping"
    subtopicId="gyakorlas-tudasproba"
    title="5. Gyakorlás, tudáspróba"
    subtitle="Amit már tudsz a válogatásokról: halmazábra, táblázat, elágazásos rajz, igaz és hamis állítások – vegyes feladatokkal."
    badge="4. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • TANANYAG"
    themeColor="emerald"
    pdfFilename="4_osztaly_valogatasok_gyakorlas_tudasproba_tananyag.pdf"
    practiceTitle="Készen állsz a fejezetzáró tudáspróbára?"
    practiceSubtitle="90 feladat vár rád 3 szinten – mind a négy leckéből!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'AMIT MÁR TUDSZ — A FEJEZET 4 ESZKÖZE',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
            <span className="text-base font-black text-emerald-900 dark:text-emerald-200">Kérdezz rá minden tulajdonságra – egyenként!</span>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Halmazábra: mindkét címke igaz → közös rész; egyik sem → a karikákon kívül.</li>
            <li>Táblázat: sor + oszlop → egy mező. Elágazásos rajz: az ágvégeket számold (2 · 3 = 6).</li>
            <li>„Mindegyik” cáfolata: 1 ellenpélda. „Van olyan”: 1 példa elég. „Nem mindegyik” = van olyan, amelyik nem.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Amit már tudsz" badge="Összefoglalás" badgeColor="emerald">
      <ChapterMapSvg className="w-full max-w-[520px] h-auto mx-auto mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="1. Válogatások halmazokba" badge="karikák" badgeColor="indigo">
          <NumberSetsSvg />
          <p className="text-xs text-slate-600 mt-2">Keret = alaphalmaz. A közös részbe az kerül, amire mindkét címke igaz.</p>
        </TheoryCard>
        <TheoryCard title="2. Válogatások táblázatokba" badge="mezők" badgeColor="purple">
          <BlocksTableSvg />
          <p className="text-xs text-slate-600 mt-2">A tankönyv A–H logikai lapjai: két szempont, négy mező – mindegyik lap pontosan egy mezőbe kerül.</p>
        </TheoryCard>
        <TheoryCard title="3. Hányféle lehetőség van?" badge="ágak" badgeColor="amber">
          <RunnersTreeSvg />
          <p className="text-xs text-slate-600 mt-2">Elágazásos rajz kezdőbetűkkel: ha Dániel az első, 3 · 2 · 1 = 6 sorrend.</p>
        </TheoryCard>
        <TheoryCard title="4. Igaz vagy hamis?" badge="kis szavak" badgeColor="rose">
          <QuantifierBoxesSvg />
          <p className="text-xs text-slate-600 mt-2">Mindegyik – van olyan – egyik sem. Egy ellenpélda megdönti a „mindegyik” állítást.</p>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="2. Nézzük meg együtt! Műveletek eredménye halmazokba" badge="MF II. 51. o. 9." badgeColor="blue">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <TheoryTable
          headers={['Művelet', 'Számolás', 'Halmaz']}
          rows={[
            ['A) 400 · 4 + 300 · 4', '1600 + 1200', '2800'],
            ['B) 8 · 900 + 500 · 0', '7200 + 0', '7200'],
            ['C) 4 · 2000 − 800', '8000 − 800', '7200'],
            ['D) 250 · 3 + 750', '750 + 750', '1500'],
            ['E) 500 · 9 − 1700', '4500 − 1700', '2800'],
            ['F) 6 · 600 − 2100', '3600 − 2100', '1500'],
            ['G) 500 + 10 · 100', '500 + 1000', '1500'],
            ['H) 1000 · 6 + 6 · 200', '6000 + 1200', '7200'],
            ['I) 200 · 9 − 300', '1800 − 300', '1500'],
            ['J) 1200 · 3 − 800', '3600 − 800', '2800']
          ]}
        />
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            Válogatás előtt <strong>számolni</strong> kell! Ne felejtsd: előbb szorzunk, aztán adunk össze vagy vonunk ki.
          </p>
          <TheoryCallout type="success" title="Eredmény">
            1500: D, F, G, I · 2800: A, E, J · 7200: B, C, H. Mind a 10 betű pontosan egy halmazba került.
          </TheoryCallout>
          <TheoryCallout type="warning" title="Figyelj a 0-ra!">
            500 · 0 = 0, ezért a B) eredménye 7200 + 0 = 7200.
          </TheoryCallout>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="3. Nézzük meg együtt! Egy válogatás – három rajz" badge="TK 133. o. 4." badgeColor="purple">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <ThreeWaysSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Kitti fája, Manó táblázata és Mona halmazábrája ugyanazt a 4 csoportot mutatja:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>kék és radíros → bal felső mező → közös rész;</li>
            <li>kék, nem radíros → bal alsó mező → csak a Kék karika;</li>
            <li>nem kék, radíros → jobb felső mező → csak a Radíros karika;</li>
            <li>nem kék, nem radíros → jobb alsó mező → a karikákon kívül.</li>
          </ul>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="4. Nézzük meg együtt! Páros és 3 többszöröse" badge="Vegyes" badgeColor="teal">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <EvenTripleVennSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Az 1–12 számokat válogattuk szét. Olvassunk az ábráról, és döntsünk az állításokról!</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              A közös részben: 6 és 12 – ezek páros számok és a 3 többszörösei is.
            </li>
            <li>
              „Van olyan páros szám, amelyik a 3 többszöröse.” → <strong>igaz</strong> (6).
            </li>
            <li>
              „Mindegyik páros szám a 3 többszöröse.” → <strong>hamis</strong> (ellenpélda: 2).
            </li>
            <li>
              Táblázatban: Páros – Nem páros sor, 3 többszöröse – nem oszlop – a 4 rész 4 mező lesz.
            </li>
          </ul>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="5. Nézzük meg együtt! Hányféle öltözet?" badge="Szorzás" badgeColor="amber">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <OutfitGridSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            2 pólód és 3 nadrágod van. Minden pólóhoz bármelyik nadrág felvehető: <strong>2 · 3 = 6</strong> öltözet. A rácsban minden sor egy póló, minden oszlop egy nadrág – pont mint egy táblázat!
          </p>
          <TheoryCallout type="tip" title="Mikor szorzunk, mikor nem?">
            Két választás egymás után → szorzás. Párok (AB = BA) → rendszerezve felírjuk: 4 elemnél 3 + 2 + 1 = 6 pár.
          </TheoryCallout>
        </div>
      </div>
    </TheorySection>

    <TheorySection title="6. Vigyázz! A leggyakoribb hibák" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Négy tipikus hiba a fejezetben"
        wrong="A kacsát csak a Madár karikába tettem · 2 szín és 3 alak: 2 + 3 = 5 lap · AB és BA két külön pár · „Nem mindegyik páros” = „egyik sem páros”"
        wrongExplanation="Mindegyik hibánál egy lépés maradt ki: a második címke megnézése, a szorzás, az ismétlés kiszűrése, illetve a „nem mindegyik” pontos jelentése."
        correct="Kacsa → közös rész · 2 · 3 = 6 lap · AB = BA, csak egyszer számít · „Nem mindegyik páros” = „van olyan, amelyik nem páros”"
        correctExplanation="Lassan, lépésenként dolgozz, és a végén ellenőrizd: minden elem pontosan egy helyre került? Minden lehetőség megvan, egyik sem kétszer?"
      />
    </TheorySection>

    <TheorySection title="7. Interaktív Laboratórium I: Vegyes válogató" badge="Labor" badgeColor="emerald">
      <p className="text-sm text-slate-700 mb-3">Mindig más két címke és más szám jön. Válaszd ki a helyét – a gombon azt is látod, melyik táblázatmezőnek felel meg!</p>
      <MixedVennLab />
    </TheorySection>

    <TheorySection title="8. Interaktív Laboratórium II: Igaz vagy hamis? – állításgyár" badge="Labor" badgeColor="rose">
      <p className="text-sm text-slate-700 mb-3">Öt szám és egy állítás. Döntsd el, igaz-e! Utána zölddel látod, melyik számra igaz a tulajdonság.</p>
      <TruthGenLab />
    </TheorySection>
  </TheoryTemplate>
);

export default GroupingExamTheory;
