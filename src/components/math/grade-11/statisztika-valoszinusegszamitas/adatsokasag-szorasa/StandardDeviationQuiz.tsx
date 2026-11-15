import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { StandardDeviationMatcher } from './StandardDeviationMatcher';
import { StandardDeviationSorter } from './StandardDeviationSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Pontdiagram számegyenesen; az átlag helyét szaggatott vonal (és felirat) jelzi. */
const DotFig: React.FC<{ data: number[]; from: number; to: number; step?: number; meanLabel?: string }> = ({ data, from, to, step = 1, meanLabel }) => {
  const x0 = 20;
  const x1 = 220;
  const sx = (v: number) => x0 + ((v - from) / (to - from)) * (x1 - x0);
  const ticks: number[] = [];
  for (let v = from; v <= to + 1e-9; v += step) ticks.push(v);
  const stack = data.map((v, i) => data.slice(0, i).filter((w) => w === v).length);
  const m = data.reduce((s, x) => s + x, 0) / data.length;
  return (
    <svg viewBox="0 0 240 120" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="116" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {meanLabel && (
        <>
          <line x1={sx(m)} y1="18" x2={sx(m)} y2="84" stroke="#be123c" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={sx(m)} y="14" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#be123c">
            {meanLabel}
          </text>
        </>
      )}
      {data.map((v, i) => (
        <circle key={i} cx={sx(v)} cy={74 - stack[i] * 13} r="5.5" fill="#38bdf8" stroke="#0369a1" />
      ))}
      <line x1={x0 - 6} y1="86" x2={x1 + 6} y2="86" stroke="#475569" strokeWidth="1.2" />
      {ticks.map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1="83" x2={sx(v)} y2="89" stroke="#475569" />
          <text x={sx(v)} y="102" fontSize="9" textAnchor="middle" fill="#334155">
            {v}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Három osztály pontszám-eloszlása (0–12 pont), azonos átlaggal. */
const ClassesFig: React.FC = () => {
  const classes: { t: string; f: Record<number, number>; c: string }[] = [
    { t: 'A', f: { 6: 5, 7: 10, 8: 5 }, c: '#38bdf8' },
    { t: 'B', f: { 3: 2, 4: 2, 5: 2, 6: 2, 7: 4, 8: 2, 9: 2, 10: 2, 11: 2 }, c: '#a78bfa' },
    { t: 'C', f: { 3: 6, 4: 4, 10: 4, 11: 6 }, c: '#f59e0b' }
  ];
  return (
    <svg viewBox="0 0 240 110" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="106" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {classes.map((cl, i) => {
        const x = 10 + i * 77;
        const bw = 70 / 13;
        return (
          <g key={cl.t}>
            <text x={x + 35} y="16" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0f172a">
              {cl.t}
            </text>
            {Array.from({ length: 13 }, (_, k) => k).map((k) => {
              const f = cl.f[k] ?? 0;
              return f ? <rect key={k} x={x + k * bw} y={86 - f * 6} width={bw - 0.8} height={f * 6} fill={cl.c} /> : null;
            })}
            <line x1={x} y1="86" x2={x + 70} y2="86" stroke="#475569" />
            <line x1={x + 7.5 * bw} y1="22" x2={x + 7.5 * bw} y2="86" stroke="#be123c" strokeDasharray="3 2" />
            <text x={x} y="98" fontSize="7" fill="#334155">
              0
            </text>
            <text x={x + 70} y="98" fontSize="7" textAnchor="end" fill="#334155">
              12
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Két izzógyár élettartam-eloszlása. */
const BulbsFig: React.FC = () => {
  const L = [800, 820, 850, 880, 910, 980, 990, 1000, 1010, 1030, 1050, 1070, 1100, 1400, 1570];
  const f1 = [5, 10, 8, 12, 24, 75, 130, 190, 333, 120, 70, 14, 8, 0, 1];
  const f2 = [10, 29, 46, 48, 59, 98, 107, 153, 192, 112, 45, 41, 26, 19, 15];
  const sx = (v: number) => 20 + ((v - 780) / 810) * 200;
  const row = (y0: number, f: number[], c: string, t: string) => (
    <g>
      <text x="22" y={y0 - 42} fontSize="9" fontWeight="bold" fill="#0f172a">
        {t}
      </text>
      {L.map((v, i) => (
        <rect key={v} x={sx(v) - 2} y={y0 - (f[i] / 340) * 40} width="4" height={(f[i] / 340) * 40} fill={c} />
      ))}
      <line x1="16" y1={y0} x2="224" y2={y0} stroke="#475569" />
    </g>
  );
  return (
    <svg viewBox="0 0 240 140" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="136" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {row(58, f1, '#38bdf8', '1. gyár')}
      {row(112, f2, '#f59e0b', '2. gyár')}
      {[800, 1000, 1200, 1400].map((v) => (
        <text key={v} x={sx(v)} y="126" fontSize="8" textAnchor="middle" fill="#334155">
          {v}
        </text>
      ))}
    </svg>
  );
};

/** A kávékóstoló két csoportjának dobozdiagramja. */
const CoffeeFig: React.FC = () => {
  const sx = (v: number) => 30 + ((v - 1) / 9) * 190;
  const box = (y: number, f: number[], c: string, t: string) => (
    <g>
      <text x="12" y={y + 4} fontSize="10" fontWeight="bold" fill={c}>
        {t}
      </text>
      <line x1={sx(f[0])} y1={y} x2={sx(f[1])} y2={y} stroke={c} strokeWidth="1.5" />
      <line x1={sx(f[3])} y1={y} x2={sx(f[4])} y2={y} stroke={c} strokeWidth="1.5" />
      <line x1={sx(f[0])} y1={y - 6} x2={sx(f[0])} y2={y + 6} stroke={c} strokeWidth="1.5" />
      <line x1={sx(f[4])} y1={y - 6} x2={sx(f[4])} y2={y + 6} stroke={c} strokeWidth="1.5" />
      <rect x={sx(f[1])} y={y - 11} width={sx(f[3]) - sx(f[1])} height="22" fill="#e0f2fe" stroke={c} strokeWidth="1.5" />
      <line x1={sx(f[2])} y1={y - 11} x2={sx(f[2])} y2={y + 11} stroke="#be123c" strokeWidth="2" />
    </g>
  );
  return (
    <svg viewBox="0 0 240 120" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="116" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {box(28, [3, 5, 6, 6.5, 9], '#0369a1', '1.')}
      {box(66, [2, 2, 5, 10, 10], '#b45309', '2.')}
      <line x1="24" y1="92" x2="226" y2="92" stroke="#475569" />
      {Array.from({ length: 10 }, (_, k) => k + 1).map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1="89" x2={sx(v)} y2="95" stroke="#475569" />
          <text x={sx(v)} y="107" fontSize="9" textAnchor="middle" fill="#334155">
            {v}
          </text>
        </g>
      ))}
    </svg>
  );
};

const STANDARD_DEVIATION_QUESTIONS: QuizQuestion[] = [
  // ---------------- LEVEL 1 ----------------
  {
    id: 'sd-q1',
    level: 1,
    questionTypeBadge: 'Jelölés',
    question: 'Melyik betűvel jelöljük általában a szórást?',
    options: ['σ (görög szigma)', 'x̄', 'Q₁', 'Σ (nagy szigma, összegjel)'],
    correctAnswer: 0,
    explanation: 'A szórás jele a kis görög szigma: σ; a szórásnégyzeté σ². Az x̄ az átlag, a Q₁ az alsó kvartilis.'
  },
  {
    id: 'sd-q2',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mennyi a szórás, ha egy adatsokaság minden adata egyenlő?',
    options: ['0', '1', 'az adat értéke', 'nem értelmezhető'],
    correctAnswer: 0,
    explanation: 'Ha minden adat egyenlő, mind megegyezik az átlaggal, minden eltérés 0, így a szórás is 0.'
  },
  {
    id: 'sd-q3',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Lehet-e egy adatsokaság szórása negatív?',
    options: ['Nem, a szórás nemnegatív valós szám', 'Igen, ha az adatok negatívak', 'Igen, ha az átlag negatív', 'Igen, ha az adatok többsége az átlag alatt van'],
    correctAnswer: 0,
    explanation: 'A szórás egy nemnegatív szám négyzetgyöke (négyzetek átlagáé), így sosem negatív – negatív adatok esetén sem.'
  },
  {
    id: 'sd-q4',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Mi az adatsokaság szórásnégyzete?',
    options: [
      'az átlagtól való eltérések négyzeteinek átlaga',
      'az átlagtól való eltérések átlaga',
      'a legnagyobb és a legkisebb adat különbségének négyzete',
      'az adatok négyzeteinek összege'
    ],
    correctAnswer: 0,
    explanation: 'σ² = ((x₁ − x̄)² + … + (xₙ − x̄)²) / n, a szórás ennek a négyzetgyöke. Az eltérések sima átlaga mindig 0 lenne.'
  },
  {
    id: 'sd-q5',
    level: 1,
    questionTypeBadge: 'Eltérések',
    question: 'Mennyi az átlagtól való eltérések (előjeles) összege egy tetszőleges adatsokaságban?',
    options: ['mindig 0', 'mindig pozitív', 'a szórás', 'az elemszám'],
    correctAnswer: 0,
    explanation: 'Σ(xᵢ − x̄) = Σxᵢ − n · x̄ = 0. Ezért kell az eltéréseket négyzetre emelni.'
  },
  {
    id: 'sd-q6',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Miért emeljük négyzetre az átlagtól való eltéréseket a szórás kiszámításakor?',
    options: [
      'hogy ne számítson, pozitív vagy negatív az eltérés',
      'hogy az eredmény egész szám legyen',
      'hogy a nagy adatok kevésbé számítsanak',
      'hogy az átlag nőjön'
    ],
    correctAnswer: 0,
    explanation: 'A négyzetre emeléssel minden eltérés nemnegatív lesz, így a pozitív és negatív eltérések nem „ejtik ki” egymást.'
  },
  {
    id: 'sd-q7',
    level: 1,
    questionTypeBadge: 'Diagram',
    question: 'Három osztály pontszámainak eloszlása látható (átlag mindhárom esetben 7). Melyik osztály pontszámainak legnagyobb a szórása?',
    figure: <ClassesFig />,
    options: ['C', 'A', 'B', 'mindháromé egyenlő, mert az átlag egyenlő'],
    correctAnswer: 0,
    explanation: 'A C osztályban két, az átlagtól messze lévő csoport alakult ki (3–4 és 10–11 pont), az eltérések nagyok: σ ≈ 3,63. B: σ ≈ 2,45; A: σ ≈ 0,71.'
  },
  {
    id: 'sd-q8',
    level: 1,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a 4 és 8 adatokból álló adatsokaság szórása?',
    figure: <DotFig data={[4, 8]} from={0} to={12} meanLabel="x̄ = 6" />,
    options: ['2', '4', '1', '16'],
    correctAnswer: 0,
    explanation: 'Átlag 6, eltérések −2 és 2, négyzeteik 4 és 4. σ² = 8 / 2 = 4, σ = 2. (A 4 a szórásnégyzet, ill. a terjedelem.)'
  },
  {
    id: 'sd-q9',
    level: 1,
    questionTypeBadge: 'Átlag',
    question: 'Mennyi a 33, 33, 45, 45, 45, 45, 45, 45, 46, 48 adatsokaság átlaga?',
    options: ['43', '45', '43,5', '40,5'],
    correctAnswer: 0,
    explanation: '(2 · 33 + 6 · 45 + 46 + 48) / 10 = 430 / 10 = 43. (A 45 a módusz és a medián.)'
  },
  {
    id: 'sd-q10',
    level: 1,
    questionTypeBadge: 'Eltérésnégyzet',
    question: 'Mennyi a 2, 4, 6 adatok átlagtól való eltéréseinek négyzetösszege?',
    figure: <DotFig data={[2, 4, 6]} from={0} to={8} meanLabel="x̄ = 4" />,
    options: ['8', '0', '4', '56'],
    correctAnswer: 0,
    explanation: 'Átlag 4; eltérések −2, 0, 2; négyzeteik 4, 0, 4; összegük 8. (A 0 az előjeles eltérések összege, az 56 a négyzetek összege: 4 + 16 + 36.)'
  },

  // ---------------- LEVEL 2 ----------------
  {
    id: 'sd-q11',
    level: 2,
    questionTypeBadge: 'Szórás',
    question: 'Egy adatsokaság szórásnégyzete 25,8. Mennyi a szórása (egy tizedesre kerekítve)?',
    options: ['5,1', '25,8', '12,9', '665,6'],
    correctAnswer: 0,
    explanation: 'σ = √25,8 ≈ 5,08 ≈ 5,1. A 12,9 a szórásnégyzet fele, a 665,6 a négyzete – egyik sem a szórás.'
  },
  {
    id: 'sd-q12',
    level: 2,
    questionTypeBadge: 'Átlag, terjedelem',
    question: 'Mennyi a −10; 0; 10; 15; 35 számsokaság átlaga és terjedelme?',
    options: ['átlag 10, terjedelem 45', 'átlag 10, terjedelem 25', 'átlag 12, terjedelem 45', 'átlag 11, terjedelem 35'],
    correctAnswer: 0,
    explanation: 'Átlag: (−10 + 0 + 10 + 15 + 35) / 5 = 50 / 5 = 10. Terjedelem: 35 − (−10) = 45.'
  },
  {
    id: 'sd-q13',
    level: 2,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a −10; 0; 10; 15; 35 számsokaság szórása?',
    figure: <DotFig data={[-10, 0, 10, 15, 35]} from={-10} to={40} step={10} meanLabel="x̄ = 10" />,
    options: ['≈ 15,17', '230', '≈ 16,96', '46'],
    correctAnswer: 0,
    explanation: 'Eltérésnégyzetek: 400, 100, 0, 25, 625, összegük 1150. σ² = 1150 / 5 = 230, σ = √230 ≈ 15,17. (A 16,96 az n − 1-gyel osztott, itt nem használt változat.)'
  },
  {
    id: 'sd-q14',
    level: 2,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi az 1, 3, 5, 7 adatsokaság szórása?',
    figure: <DotFig data={[1, 3, 5, 7]} from={0} to={8} meanLabel="x̄ = 4" />,
    options: ['√5 ≈ 2,24', '5', '2', '4'],
    correctAnswer: 0,
    explanation: 'Átlag 4; eltérések −3, −1, 1, 3; négyzeteik 9, 1, 1, 9 (összeg 20). σ² = 20 / 4 = 5, σ = √5 ≈ 2,24.'
  },
  {
    id: 'sd-q15',
    level: 2,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a 10, 10, 20, 20 adatsokaság szórása?',
    options: ['5', '25', '10', '≈ 7,07'],
    correctAnswer: 0,
    explanation: 'Átlag 15, minden eltérés ±5, négyzetük 25. σ² = 25, σ = 5.'
  },
  {
    id: 'sd-q16',
    level: 2,
    questionTypeBadge: 'Eltolás',
    question: 'Egy adatsokaság minden adatához hozzáadunk 5-öt. Hogyan változik a szórás?',
    options: ['nem változik', '5-tel nő', '25-tel nő', '5-szörösére nő'],
    correctAnswer: 0,
    explanation: 'Az átlag is 5-tel nő, így az átlagtól való eltérések – és velük a szórás – változatlanok.'
  },
  {
    id: 'sd-q17',
    level: 2,
    questionTypeBadge: 'Nagyítás',
    question: 'Egy adatsokaság minden adatát megszorozzuk 2-vel. Hogyan változik a szórás?',
    options: ['kétszeresére nő', 'négyszeresére nő', 'nem változik', '2-vel nő'],
    correctAnswer: 0,
    explanation: 'Minden eltérés kétszeres lesz, a négyzetük négyszeres: a szórásnégyzet 4-szeres, a szórás 2-szeres.'
  },
  {
    id: 'sd-q18',
    level: 2,
    questionTypeBadge: 'Gyakoriság',
    question: 'Egy cinkelt kockával 120-szor dobtunk; az 1, 2, 3, 4, 5, 6 gyakorisága: 21, 18, 4, 45, 22, 10. Mennyi a dobások átlaga?',
    options: ['≈ 3,49', '3,5', '4', '20'],
    correctAnswer: 0,
    explanation: '(21 + 36 + 12 + 180 + 110 + 60) / 120 = 419 / 120 ≈ 3,49. A 3,5 az 1–6 számok sima átlaga lenne, a 20 a gyakoriságok átlaga.'
  },
  {
    id: 'sd-q19',
    level: 2,
    questionTypeBadge: 'Gyakoriság',
    question: 'Ugyanebben a 120 dobásban (21, 18, 4, 45, 22, 10) mennyi a medián és a módusz?',
    options: ['medián 4, módusz 4', 'medián 3,5, módusz 4', 'medián 4, módusz 45', 'medián 3, módusz 4'],
    correctAnswer: 0,
    explanation: 'Halmozott gyakoriságok: 21, 39, 43, 88 – a 60. és a 61. elem is 4, így a medián 4. A leggyakoribb érték (45-ször) a 4, ez a módusz (nem a 45!).'
  },
  {
    id: 'sd-q20',
    level: 2,
    questionTypeBadge: 'Átlag',
    question:
      'Kávékóstoló, 20-20 fő, pontszámok 1–10. 1. csoport: 3 (1), 5 (6), 6 (8), 7 (2), 8 (2), 9 (1). 2. csoport: 2 (8), 4 (2), 6 (1), 10 (9). Mennyi a két csoport átlaga?',
    options: ['mindkettőé 6', '1.: 6, 2.: 5,5', '1.: 6, 2.: 6,5', '1.: 5,5, 2.: 6'],
    correctAnswer: 0,
    explanation: '1. csoport: (3 + 30 + 48 + 14 + 16 + 9) / 20 = 120 / 20 = 6. 2. csoport: (16 + 8 + 6 + 90) / 20 = 120 / 20 = 6.'
  },

  // ---------------- LEVEL 3 ----------------
  {
    id: 'sd-q21',
    level: 3,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a kávékóstoló két csoportjában adott pontszámok szórása? (1.: 3, 5×6, 6×8, 7×2, 8×2, 9; 2.: 2×8, 4×2, 6, 10×9)',
    options: ['1.: ≈ 1,30; 2.: ≈ 3,74', '1.: ≈ 3,74; 2.: ≈ 1,30', '1.: 1,7; 2.: 14', 'mindkettőé ≈ 2,5'],
    correctAnswer: 0,
    explanation: 'Az átlag mindkét csoportban 6. 1.: (9 + 6 + 0 + 2 + 8 + 9) / 20 = 34 / 20 = 1,7, σ ≈ 1,30. 2.: (128 + 8 + 0 + 144) / 20 = 280 / 20 = 14, σ ≈ 3,74. (Az 1,7 és a 14 a szórásnégyzetek.)'
  },
  {
    id: 'sd-q22',
    level: 3,
    questionTypeBadge: 'Gyakoriság',
    question: 'Mennyi a cinkelt kockával végzett 120 dobás (21, 18, 4, 45, 22, 10) szórása?',
    options: ['≈ 1,57', '≈ 2,47', '≈ 1,71', '≈ 1,25'],
    correctAnswer: 0,
    explanation: 'x̄ ≈ 3,49; a gyakoriságokkal súlyozott eltérésnégyzetek átlaga σ² ≈ 2,47, σ ≈ 1,57. Az 1,71 az 1, 2, …, 6 számok szórása lenne (gyakoriságok nélkül).'
  },
  {
    id: 'sd-q23',
    level: 3,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a 2, 3, 4, 5, 2, 4, 4, 6, 8, 2, 6, 9, 2, 3, 7 adatsokaság szórása?',
    options: ['≈ 2,22', '≈ 4,92', '≈ 2,29', '7'],
    correctAnswer: 0,
    explanation: 'Átlag: 67 / 15 ≈ 4,47; σ² ≈ 4,92; σ ≈ 2,22. (A 2,29 n − 1-gyel osztva adódna, a 7 a terjedelem.)'
  },
  {
    id: 'sd-q24',
    level: 3,
    questionTypeBadge: 'Érettségi',
    question: 'Márton Anita hat dobása (m): 17,60; 18,72; 19,39; 19,38; 19,10; 19,87. Mennyi a dobások átlaga és szórása?',
    options: ['átlag 19,01 m, szórás ≈ 0,72 m', 'átlag 19,01 m, szórás ≈ 0,52 m', 'átlag 19,24 m, szórás ≈ 0,72 m', 'átlag 19,87 m, szórás ≈ 2,27 m'],
    correctAnswer: 0,
    explanation: 'Összeg 114,06, átlag 19,01 m. Eltérésnégyzetek összege ≈ 3,101, σ² ≈ 0,517, σ ≈ 0,72 m. (A 0,52 a szórásnégyzet, a 19,24 a medián.)'
  },
  {
    id: 'sd-q25',
    level: 3,
    questionTypeBadge: 'Értelmezés',
    question: 'Két gyár 1000-1000 izzójának élettartam-eloszlása látható; az átlag mindkettőnél kb. 1000 óra. Melyik gyár ígérete („átlagosan 1000 óra”) megbízhatóbb, és miért?',
    figure: <BulbsFig />,
    options: [
      'az 1. gyáré, mert az élettartamok kevésbé szóródnak (kisebb a szórás)',
      'a 2. gyáré, mert nagyobb a szórása',
      'egyformán megbízhatók, mert az átlag és a terjedelem is egyenlő',
      'a 2. gyáré, mert van 1400 óránál tovább világító izzója'
    ],
    correctAnswer: 0,
    explanation: 'Az 1. gyárnál az izzók több mint 80%-a 980–1050 óra között ég (σ ≈ 43,6 óra), a 2. gyárnál az eloszlás „szétterül” (σ ≈ 110,5 óra). Az 1. gyár izzói megbízhatóan 1000 óra körül élnek.'
  },
  {
    id: 'sd-q26',
    level: 3,
    questionTypeBadge: 'Gyakoriság',
    question: 'Az adatok: a 2 háromszor, a 6 egyszer fordul elő. Mennyi a szórás?',
    figure: <DotFig data={[2, 2, 2, 6]} from={0} to={8} />,
    options: ['√3 ≈ 1,73', '2', '3', '√8 ≈ 2,83'],
    correctAnswer: 0,
    explanation: 'Átlag: (3 · 2 + 6) / 4 = 3. Eltérésnégyzetek: 3 · 1 + 9 = 12, σ² = 12 / 4 = 3, σ = √3 ≈ 1,73. (A 2 a 2 és 6 súlyozatlan szórása.)'
  },
  {
    id: 'sd-q27',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    question: 'Két adat átlaga 10, szórása 3. Melyik a két adat?',
    options: ['7 és 13', '4 és 16', '8,5 és 11,5', '7 és 10'],
    correctAnswer: 0,
    explanation: 'Két adatnál mindkettő ugyanannyival tér el az átlagtól, és ez az eltérés éppen a szórás: 10 − 3 = 7 és 10 + 3 = 13. (4 és 16: σ = 6; 8,5 és 11,5: σ = 1,5; 7 és 10 átlaga nem 10.)'
  },
  {
    id: 'sd-q28',
    level: 3,
    questionTypeBadge: 'Dobozdiagram',
    question: 'A kávékóstoló két csoportjának dobozdiagramja látható (mindkét átlag 6). Mit mondhatunk a szórásról?',
    figure: <CoffeeFig />,
    options: [
      'A 2. csoport dobozdiagramja jóval szélesebb, az adatok szórása is jóval nagyobb.',
      'Mivel az átlagok egyenlők, a szórások is egyenlők.',
      'Az 1. csoport szórása nagyobb, mert a mediánja nagyobb.',
      'A dobozdiagram és a szórás között nincs semmilyen kapcsolat.'
    ],
    correctAnswer: 0,
    explanation: 'A 2. csoportban az értékelések két szélsőség (2 és 10) köré tömörülnek: a félterjedelem 8 (az 1. csoportban 1,5), a szórás ≈ 3,74 (az 1. csoportban ≈ 1,30).'
  },
  {
    id: 'sd-q29',
    level: 3,
    questionTypeBadge: 'Új adat',
    question: 'Egy (nem csupa egyenlő adatból álló) adatsokasághoz hozzáveszünk egy új adatot, amely pontosan egyenlő az átlaggal. Hogyan változik a szórás?',
    options: ['csökken', 'nő', 'nem változik', 'nullává válik'],
    correctAnswer: 0,
    explanation: 'Az átlag nem változik, az eltérésnégyzetek összege sem (az új adat eltérése 0), de most n + 1-gyel osztunk: a szórásnégyzet, így a szórás is csökken.'
  },
  {
    id: 'sd-q30',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik adatsokaság szórása a legnagyobb?',
    options: ['1; 9', '5; 5; 5; 13', '0; 4; 4; 8', '2; 4; 6; 8'],
    correctAnswer: 0,
    explanation: '1; 9: σ = 4. 5; 5; 5; 13: átlag 7, σ = √12 ≈ 3,46. 0; 4; 4; 8: σ = √8 ≈ 2,83. 2; 4; 6; 8: σ = √5 ≈ 2,24.'
  }
];

export const StandardDeviationQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g11-stat-szoras-quiz"
      subtopicId="adatsokasag-szorasa"
      title="4. Adatsokaság szórása – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: szórásnégyzet, szórás, gyakorisági táblázat, az adatok eltolása és nagyítása, értelmezés."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={STANDARD_DEVIATION_QUESTIONS}
      cheatSheets={[
        {
          title: 'A szórás képlete',
          items: [
            'x̄ = (x₁ + … + xₙ) / n',
            'σ² = ((x₁ − x̄)² + … + (xₙ − x̄)²) / n',
            'σ = √σ² (ne felejts el gyököt vonni!)',
            'σ ≥ 0; minden adat egyenlő ⇔ σ = 0'
          ]
        },
        {
          title: 'Számolás táblázattal',
          items: [
            '1. sor: adatok, 2. sor: xᵢ − x̄, 3. sor: (xᵢ − x̄)²',
            'gyakoriságnál: fᵢ · (xᵢ − x̄)², osztás Σfᵢ-vel',
            'ellenőrzés: Σfᵢ(xᵢ − x̄) = 0',
            'példa: 33, 33, 45×6, 46, 48 → x̄ = 43, σ ≈ 5,1'
          ]
        },
        {
          title: 'Tulajdonságok',
          items: [
            'minden adat + c ⇒ σ nem változik',
            'minden adat · k ⇒ σ |k|-szorosára változik',
            'átlaggal egyenlő új adat ⇒ σ csökken',
            'szélesebb doboz, „szétterülő” oszlopdiagram ⇒ nagyobb σ'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <StandardDeviationMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <StandardDeviationSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default StandardDeviationQuiz;
