import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SumEstimateG3Matcher } from './SumEstimateG3Matcher';
import { SumEstimateG3Sorter } from './SumEstimateG3Sorter';
import { QFig, UNK, PriceTag, ItemIcon, ItemKind } from '../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';
import { ELine, EMark, ApproxPair, Wallet } from './SumEstimateG3Parts';

const CLS = 'w-full max-w-[280px] h-auto mx-auto';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Kerekítés-sorok: „a ≈ b”, '?' = keresett. */
const ApproxQ: React.FC<{ rows: [string, string][]; note?: string }> = ({ rows, note }) => (
  <QFig h={24 + rows.length * 32 + (note ? 18 : 0)}>
    {rows.map(([a, b], i) => (
      <ApproxPair key={i} x={120} y={40 + i * 32} a={a} b={b} fs={22} />
    ))}
    {note && <text x="120" y={24 + rows.length * 32 + 10} textAnchor="middle" fontSize="12" fill="#475569">{note}</text>}
  </QFig>
);

/** Számegyenes. */
const LineQ: React.FC<{ lo: number; hi: number; tick: number; big: number; labels: number[]; marks: EMark[] }> = ({ lo, hi, tick, big, labels, marks }) => (
  <ELine lo={lo} hi={hi} tickEvery={tick} bigEvery={big} labels={labels} marks={marks} W={240} H={92} className={CLS} />
);

/** Becslő kártya: a + b, alatta két „≈ ?” doboz és B: ? */
const EstQ: React.FC<{ a: number; b: number; mode: 'tízesre' | 'százasra' }> = ({ a, b, mode }) => (
  <QFig h={112}>
    <text x="120" y="32" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">{a} + {b}</text>
    <text x="78" y="62" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#d97706">≈ ?</text>
    <text x="164" y="62" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#d97706">≈ ?</text>
    <rect x="76" y="72" width="88" height="28" rx="8" fill="#fee2e2" stroke={UNK} strokeWidth="1.6" />
    <text x="120" y="92" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>B: ?</text>
    <text x="226" y="100" textAnchor="end" fontSize="10.5" fill="#475569">{mode}</text>
  </QFig>
);

/** Tárgyak árcédulával, opcionálisan pénztárcával. */
const TagsQ: React.FC<{ items: { kind: ItemKind; price: number }[]; wallet?: string }> = ({ items, wallet }) => {
  const n = items.length + (wallet ? 1 : 0);
  const w = 236 / n;
  return (
    <QFig h={96}>
      {items.map((it, i) => {
        const cx = 2 + w * i + w / 2;
        return (
          <g key={i}>
            <ItemIcon kind={it.kind} cx={cx} cy={32} s={0.95} />
            <PriceTag x={cx - 29} y={58} text={`${it.price} Ft`} w={60} fs={11.5} />
          </g>
        );
      })}
      {wallet && <Wallet x={2 + w * items.length + w / 2 - 36} y={42} text={wallet} w={72} />}
    </QFig>
  );
};

/** Füzetlap egy kiszámolt összeadással. */
const NoteQ: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={74}>
    <rect x="30" y="12" width="180" height="50" rx="6" fill="#fff" stroke="#94a3b8" strokeWidth="1.4" />
    <line x1="30" y1="30" x2="210" y2="30" stroke="#bfdbfe" />
    <line x1="30" y1="48" x2="210" y2="48" stroke="#bfdbfe" />
    <text x="120" y="45" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{text}</text>
    <text x="222" y="46" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Szalagok vízszintesen. */
const BarsQ: React.FC<{ bars: { label: string; v: number; text: string; color: string }[]; max: number }> = ({ bars, max }) => (
  <QFig h={22 + bars.length * 30}>
    {bars.map((b, i) => {
      const y = 12 + i * 30;
      const w = (150 * b.v) / max;
      return (
        <g key={i}>
          <text x="70" y={y + 15} textAnchor="end" fontSize="11.5" fontWeight="bold" fill="#334155">{b.label}</text>
          <rect x="76" y={y} width={w} height="20" rx="4" fill={b.color} stroke="#334155" strokeWidth="1" />
          <text x={76 + w / 2} y={y + 15} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{b.text}</text>
        </g>
      );
    })}
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const SUM_ESTIMATE_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'sest-q1',
    level: 1,
    questionTypeBadge: 'Becslés százasra',
    figure: <ApproxQ rows={[['287', '300'], ['106', '100']]} note="B: ?" />,
    question: 'Százasra kerekítettünk: 287 ≈ 300 és 106 ≈ 100. Mennyi a becslés?',
    options: ['B: 400', 'B: 393', 'B: 300', 'B: 500'],
    correctAnswer: 0,
    explanation: 'A kerekített számokat adjuk össze: 300 + 100 = 400. B: 400.'
  },
  {
    id: 'sest-q2',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <LineQ lo={200} hi={300} tick={10} big={50} labels={[200, 250, 300]} marks={[{ v: 238, color: '#a16207' }]} />,
    question: 'Kerekítsd százasra a 238-at!',
    options: ['200', '240', '300', '230'],
    correctAnswer: 0,
    explanation: 'Százasra a tízest nézzük. A tízes 3, ezért lefelé: 238 ≈ 200.'
  },
  {
    id: 'sest-q3',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <LineQ lo={170} hi={180} tick={1} big={5} labels={[170, 175, 180]} marks={[{ v: 176, color: '#a16207' }]} />,
    question: 'Kerekítsd tízesre a 176-ot!',
    options: ['180', '170', '200', '100'],
    correctAnswer: 0,
    explanation: 'Tízesre az egyest nézzük. Az egyes 6, ezért felfelé: 176 ≈ 180.'
  },
  {
    id: 'sest-q4',
    level: 1,
    questionTypeBadge: 'Becslés tízesre',
    question: 'Tízesre kerekítettünk: 142 ≈ 140 és 215 ≈ 220. Mennyi a becslés?',
    options: ['B: 360', 'B: 350', 'B: 370', 'B: 300'],
    correctAnswer: 0,
    explanation: 'A kerekített tagokat adjuk össze: 140 + 220 = 360. B: 360.'
  },
  {
    id: 'sest-q5',
    level: 1,
    questionTypeBadge: 'Jelölés',
    figure: <ApproxQ rows={[['287', '300']]} />,
    question: 'Mit jelent a ≈ jel?',
    options: ['körülbelül egyenlő', 'pontosan egyenlő', 'nagyobb', 'kisebb'],
    correctAnswer: 0,
    explanation: 'A ≈ jel azt jelenti: körülbelül annyi. 287 ≈ 300: a 287 körülbelül 300.'
  },
  {
    id: 'sest-q6',
    level: 1,
    questionTypeBadge: 'Becslés százasra',
    question: 'Mennyi a 312 + 147 becslése, ha százasra kerekítünk?',
    options: ['B: 400', 'B: 500', 'B: 450', 'B: 300'],
    correctAnswer: 0,
    explanation: '312 ≈ 300, 147 ≈ 100. 300 + 100 = 400. B: 400.'
  },
  {
    id: 'sest-q7',
    level: 1,
    questionTypeBadge: 'Vásár',
    figure: <TagsQ items={[{ kind: 'ball', price: 198 }, { kind: 'car', price: 203 }]} />,
    question: 'Körülbelül mennyit fizetsz a két játékért? Kerekíts százasra!',
    options: ['kb. 400 Ft', 'kb. 300 Ft', 'kb. 500 Ft', 'kb. 200 Ft'],
    correctAnswer: 0,
    explanation: '198 Ft ≈ 200 Ft, 203 Ft ≈ 200 Ft. 200 + 200 = 400. Kb. 400 Ft.'
  },
  {
    id: 'sest-q8',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    question: 'Melyik kerekítés HIBÁS?',
    options: ['145 ≈ 200 (százasra)', '250 ≈ 300 (százasra)', '163 ≈ 160 (tízesre)', '355 ≈ 360 (tízesre)'],
    correctAnswer: 0,
    explanation: 'A 145-ben a tízes 4, ezért százasra lefelé kerekítünk: 145 ≈ 100. A többi jó.'
  },
  {
    id: 'sest-q9',
    level: 1,
    questionTypeBadge: 'Becslés tízesre',
    figure: <ApproxQ rows={[['124', '120'], ['251', '250']]} note="B: ?" />,
    question: 'Tízesre kerekítettünk: 124 ≈ 120 és 251 ≈ 250. Mennyi a becslés?',
    options: ['B: 370', 'B: 380', 'B: 360', 'B: 300'],
    correctAnswer: 0,
    explanation: '120 + 250 = 370. B: 370.'
  },
  {
    id: 'sest-q10',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <LineQ lo={200} hi={300} tick={10} big={50} labels={[200, 250, 300]} marks={[{ v: 268, color: '#a16207' }]} />,
    question: 'A pont a 268. Melyik kerek százashoz van közelebb?',
    options: ['300', '200', '270', '260'],
    correctAnswer: 0,
    explanation: 'A 268 a 250-en túl van, közelebb van a 300-hoz. 268 ≈ 300.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'sest-q11',
    level: 2,
    questionTypeBadge: 'Becslés tízesre',
    figure: <EstQ a={127} b={235} mode="tízesre" />,
    question: 'Becsüld meg az összeget tízesre kerekített tagokkal! 127 + 235',
    options: ['B: 370', 'B: 360', 'B: 300', 'B: 400'],
    correctAnswer: 0,
    explanation: '127 ≈ 130, 235 ≈ 240 (az 5 felfelé!). 130 + 240 = 370.'
  },
  {
    id: 'sest-q12',
    level: 2,
    questionTypeBadge: 'Becslés százasra',
    figure: <EstQ a={162} b={228} mode="százasra" />,
    question: 'Becsüld meg az összeget százasra kerekített tagokkal! 162 + 228',
    options: ['B: 400', 'B: 390', 'B: 300', 'B: 500'],
    correctAnswer: 0,
    explanation: '162 ≈ 200 (a tízes 6), 228 ≈ 200 (a tízes 2). 200 + 200 = 400.'
  },
  {
    id: 'sest-q13',
    level: 2,
    questionTypeBadge: 'Becslés tízesre',
    figure: <EstQ a={365} b={124} mode="tízesre" />,
    question: 'Becsüld meg az összeget tízesre kerekített tagokkal! 365 + 124',
    options: ['B: 490', 'B: 480', 'B: 500', 'B: 470'],
    correctAnswer: 0,
    explanation: '365 ≈ 370, 124 ≈ 120. 370 + 120 = 490.'
  },
  {
    id: 'sest-q14',
    level: 2,
    questionTypeBadge: 'Becslés százasra',
    figure: <EstQ a={138} b={276} mode="százasra" />,
    question: 'Becsüld meg az összeget százasra kerekített tagokkal! 138 + 276',
    options: ['B: 400', 'B: 410', 'B: 300', 'B: 500'],
    correctAnswer: 0,
    explanation: '138 ≈ 100, 276 ≈ 300. 100 + 300 = 400.'
  },
  {
    id: 'sest-q15',
    level: 2,
    questionTypeBadge: 'Becslés tízesre',
    figure: <EstQ a={153} b={141} mode="tízesre" />,
    question: 'Becsüld meg az összeget tízesre kerekített tagokkal! 153 + 141',
    options: ['B: 290', 'B: 300', 'B: 280', 'B: 200'],
    correctAnswer: 0,
    explanation: '153 ≈ 150, 141 ≈ 140. 150 + 140 = 290.'
  },
  {
    id: 'sest-q16',
    level: 2,
    questionTypeBadge: 'Vásár',
    figure: <TagsQ items={[{ kind: 'bear', price: 168 }, { kind: 'kite', price: 213 }]} />,
    question: 'Kb. mennyibe kerül a két játék együtt? Kerekíts tízesre!',
    options: ['kb. 380 Ft', 'kb. 400 Ft', 'kb. 370 Ft', 'kb. 300 Ft'],
    correctAnswer: 0,
    explanation: '168 ≈ 170, 213 ≈ 210. 170 + 210 = 380. Kb. 380 Ft.'
  },
  {
    id: 'sest-q17',
    level: 2,
    questionTypeBadge: 'Az 5-ös szabály',
    figure: <LineQ lo={240} hi={250} tick={1} big={5} labels={[240, 250]} marks={[{ v: 245, color: '#a16207' }]} />,
    question: 'Becsüld meg tízesre kerekítve: 245 + 135!',
    options: ['B: 390', 'B: 370', 'B: 380', 'B: 400'],
    correctAnswer: 0,
    explanation: 'Ha az egyes 5, felfelé kerekítünk: 245 ≈ 250, 135 ≈ 140. 250 + 140 = 390.'
  },
  {
    id: 'sest-q18',
    level: 2,
    questionTypeBadge: 'Becslés százasra',
    question: 'Melyik összeadás becslése 300, ha százasra kerekítünk?',
    options: ['142 + 167', '152 + 167', '142 + 127', '250 + 149'],
    correctAnswer: 0,
    explanation: '142 ≈ 100, 167 ≈ 200, így B: 300. A többi: 400, 200, 400.'
  },
  {
    id: 'sest-q19',
    level: 2,
    questionTypeBadge: 'Pontosság',
    figure: (
      <LineQ
        lo={390}
        hi={440}
        tick={5}
        big={10}
        labels={[400, 420, 440]}
        marks={[
          { v: 400, label: 'B: 400', color: '#b91c1c' },
          { v: 425, label: '', sub: 'pontos: 425', color: '#15803d' },
          { v: 430, label: 'B: 430', color: '#1d4ed8' }
        ]}
      />
    ),
    question: 'A pontos összeg 425. Melyik becslés van közelebb hozzá?',
    options: ['a B: 430', 'a B: 400', 'egyformán közel vannak', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'A 430 csak 5-tel tér el a 425-től, a 400 pedig 25-tel. A B: 430 van közelebb.'
  },
  {
    id: 'sest-q20',
    level: 2,
    questionTypeBadge: 'Becslés tízesre',
    figure: <EstQ a={196} b={198} mode="tízesre" />,
    question: 'Becsüld meg az összeget tízesre kerekített tagokkal! 196 + 198',
    options: ['B: 400', 'B: 390', 'B: 380', 'B: 300'],
    correctAnswer: 0,
    explanation: '196 ≈ 200, 198 ≈ 200. 200 + 200 = 400.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'sest-q21',
    level: 3,
    questionTypeBadge: 'Elég a pénz?',
    figure: <TagsQ items={[{ kind: 'book', price: 236 }, { kind: 'pencil', price: 178 }]} wallet="500 Ft" />,
    question: 'Borinak 500 Ft-ja van. Megveszi a könyvet és a ceruzát. Becsülj tízesre! Elég a pénze?',
    options: ['Igen, mert kb. 420 Ft kell.', 'Nem, mert kb. 420 Ft kell.', 'Igen, mert kb. 320 Ft kell.', 'Nem tudjuk eldönteni.'],
    correctAnswer: 0,
    explanation: '236 ≈ 240, 178 ≈ 180. 240 + 180 = 420. A 420 jóval kevesebb, mint 500. Elég a pénz.'
  },
  {
    id: 'sest-q22',
    level: 3,
    questionTypeBadge: 'Ellenőrzés becsléssel',
    figure: <NoteQ text="236 + 145 = 281" />,
    question: 'Dani ezt írta: 236 + 145 = 281. Becsülj tízesre! Jó lehet?',
    options: ['Nem, kb. 390 a jó.', 'Igen, jó.', 'Nem, kb. 300 a jó.', 'Nem, kb. 290 a jó.'],
    correctAnswer: 0,
    explanation: 'Becslés: 240 + 150 = 390. A 281 messze van tőle, tehát hibás. (A jó eredmény 381.)'
  },
  {
    id: 'sest-q23',
    level: 3,
    questionTypeBadge: 'Ellenőrzés becsléssel',
    question: 'Becsülj! Melyik lehet a 213 + 189 pontos összege?',
    options: ['402', '302', '202', '492'],
    correctAnswer: 0,
    explanation: 'Becslés: 210 + 190 = 400. Csak a 402 van közel a 400-hoz.'
  },
  {
    id: 'sest-q24',
    level: 3,
    questionTypeBadge: 'Pontosság',
    figure: <ApproxQ rows={[['135', '?'], ['165', '?']]} note="pontosan: 135 + 165 = 300" />,
    question: '135 + 165 = 300. Becsülj százasra, majd tízesre! Melyik becslés a pontosabb?',
    options: ['a százasra kerekített', 'a tízesre kerekített', 'egyformán pontosak', 'egyik sem jó'],
    correctAnswer: 0,
    explanation: 'Százasra: 100 + 200 = 300, ez pont annyi. Tízesre: 140 + 170 = 310. Most a százasra kerekített a pontosabb!'
  },
  {
    id: 'sest-q25',
    level: 3,
    questionTypeBadge: 'Három tag',
    figure: <TagsQ items={[{ kind: 'mug', price: 102 }, { kind: 'mug', price: 197 }, { kind: 'mug', price: 148 }]} />,
    question: 'Három bögrét veszel. Becsülj százasra! Kb. mennyit fizetsz?',
    options: ['kb. 400 Ft', 'kb. 450 Ft', 'kb. 500 Ft', 'kb. 300 Ft'],
    correctAnswer: 0,
    explanation: '102 ≈ 100, 197 ≈ 200, 148 ≈ 100. 100 + 200 + 100 = 400. Kb. 400 Ft.'
  },
  {
    id: 'sest-q26',
    level: 3,
    questionTypeBadge: 'Becslés tízesre',
    question: 'Melyik összeadás becslése 400, ha tízesre kerekítünk?',
    options: ['196 + 204', '186 + 204', '196 + 214', '176 + 204'],
    correctAnswer: 0,
    explanation: '196 ≈ 200, 204 ≈ 200, így B: 400. A többi: 390, 410, 380.'
  },
  {
    id: 'sest-q27',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Egy becslés így készült tízesre kerekítve: 140 + 230 = 370. Melyik lehetett az összeadás?',
    options: ['137 + 228', '147 + 228', '137 + 238', '132 + 222'],
    correctAnswer: 0,
    explanation: '137 ≈ 140 és 228 ≈ 230. A többinél: 147 ≈ 150, 238 ≈ 240, 132 ≈ 130.'
  },
  {
    id: 'sest-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarsQ bars={[{ label: 'gyerek', v: 248, text: '248', color: '#86efac' }, { label: 'felnőtt', v: 127, text: '127', color: '#93c5fd' }]} max={300} />,
    question: 'A kirándulásra 248 gyerek és 127 felnőtt jelentkezett. Kb. hányan mennek? Kerekíts tízesre!',
    options: ['kb. 380', 'kb. 370', 'kb. 300', 'kb. 390'],
    correctAnswer: 0,
    explanation: '248 ≈ 250, 127 ≈ 130. 250 + 130 = 380. Kb. 380-an mennek.'
  },
  {
    id: 'sest-q29',
    level: 3,
    questionTypeBadge: 'Becslés százasra',
    question: 'Melyik összeadásnak a legnagyobb a becslése, ha százasra kerekítünk?',
    options: ['251 + 149', '149 + 149', '148 + 249', '244 + 146'],
    correctAnswer: 0,
    explanation: '251 + 149: 300 + 100 = 400. A többi: 100 + 100 = 200, 100 + 200 = 300, 200 + 100 = 300.'
  },
  {
    id: 'sest-q30',
    level: 3,
    questionTypeBadge: 'Elég a pénz?',
    figure: <TagsQ items={[{ kind: 'plant', price: 247 }, { kind: 'cake', price: 251 }]} wallet="500 Ft" />,
    question: 'A becslés 250 + 250 = 500. Pont a határ! Mit tegyél, hogy biztosan tudd, elég-e az 500 Ft?',
    options: ['Számolj pontosan: 498 Ft, elég.', 'Mondd azt, hogy nem elég.', 'Kerekíts százasra: 500, nem elég.', 'Ne vegyél semmit.'],
    correctAnswer: 0,
    explanation: 'Ha a becslés nagyon közel van a határhoz, pontosan kell számolni. 247 + 251 = 498. Elég, és 2 Ft marad.'
  }
];

export const SumEstimateG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-osszeadas"
    topicId="g3-wadd-becsles-quiz"
    subtopicId="az-osszeg-becslese"
    title="2. Az összeg becslése – Kvíz"
    subtitle="30 feladat 3 szinten: kerekítés, becslés százasra és tízesre, elég a pénz?, ellenőrzés becsléssel."
    badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • KVÍZ"
    questions={SUM_ESTIMATE_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Így becsülünk', items: ['1. Kerekítsd mindkét tagot!', '2. Add össze a kerekített számokat!', '187 + 238 → 190 + 240 → B: 430'] },
      { title: 'Kerekítés', items: ['Tízesre: nézd az egyest!', 'Százasra: nézd a tízest!', '0–4 → le, 5–9 → fel', '245 ≈ 250, 250 ≈ 300'] },
      { title: 'Mire jó?', items: ['Elég a pénz? 240 + 180 = 420 < 500', 'Hibakeresés: 236 + 145 nem lehet 281', 'Ha közel a határ, számolj pontosan!'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<SumEstimateG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<SumEstimateG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default SumEstimateG3Quiz;
