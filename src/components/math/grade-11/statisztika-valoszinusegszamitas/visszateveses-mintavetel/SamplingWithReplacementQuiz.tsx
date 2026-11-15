import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SamplingWithReplacementMatcher } from './SamplingWithReplacementMatcher';
import { SamplingWithReplacementSorter } from './SamplingWithReplacementSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Urna piros és fehér golyókkal, visszatevéses húzás felirattal. */
const UrnFig: React.FC<{ red: number; white: number; caption: string }> = ({ red, white, caption }) => {
  const n = red + white;
  const perRow = Math.min(n, 6);
  const balls = Array.from({ length: n }, (_, i) => ({ x: 62 + (i % perRow) * 20, y: 82 - Math.floor(i / perRow) * 20, red: i < red }));
  return (
    <svg viewBox="0 0 240 120" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="116" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <path d="M 45 30 L 45 92 Q 45 102 55 102 L 175 102 Q 185 102 185 92 L 185 30" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
      {balls.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r="8" fill={b.red ? '#f43f5e' : '#ffffff'} stroke={b.red ? '#be123c' : '#64748b'} strokeWidth="1.3" />
      ))}
      <path d="M 190 40 Q 215 20 225 50 Q 215 80 190 70" fill="none" stroke="#059669" strokeWidth="1.6" />
      <path d="M 190 70 l 7 -1 l -3 6 z" fill="#059669" />
      <text x="120" y="20" fontSize="10" textAnchor="middle" fill="#334155">
        {caption}
      </text>
    </svg>
  );
};

/** Kísérletek sora: 's' = siker, 'k' = kudarc, '?' = ismeretlen. */
const TrialsFig: React.FC<{ marks: ('s' | 'k' | '?')[]; caption?: string }> = ({ marks, caption }) => {
  const gap = Math.min(40, 200 / Math.max(marks.length - 1, 1));
  const x0 = 120 - ((marks.length - 1) * gap) / 2;
  return (
    <svg viewBox="0 0 240 80" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="76" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {marks.map((m, i) => {
        const x = x0 + i * gap;
        const stroke = m === 's' ? '#059669' : m === 'k' ? '#e11d48' : '#0284c7';
        const fill = m === 's' ? '#d1fae5' : m === 'k' ? '#ffe4e6' : '#e0f2fe';
        return (
          <g key={i}>
            <circle cx={x} cy="32" r={Math.min(13, gap / 2 - 2)} fill={fill} stroke={stroke} strokeWidth="1.6" />
            <text x={x} y="36" fontSize="11" fontWeight="bold" textAnchor="middle" fill={stroke}>
              {m === 's' ? 'S' : m === 'k' ? 'K' : '?'}
            </text>
          </g>
        );
      })}
      {caption && (
        <text x="120" y="66" fontSize="10" textAnchor="middle" fill="#334155">
          {caption}
        </text>
      )}
    </svg>
  );
};

/** Kis valószínűség-oszlopdiagram; az ismeretlen oszlop „?”. */
const BarsFig: React.FC<{ values: number[]; unknown?: number; caption: string }> = ({ values, unknown, caption }) => {
  const max = Math.max(...values);
  const bw = 190 / values.length;
  return (
    <svg viewBox="0 0 240 130" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="126" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1="25" y1="100" x2="225" y2="100" stroke="#334155" />
      {values.map((v, i) => {
        const h = (v / max) * 70;
        const x = 30 + i * bw;
        return (
          <g key={i}>
            <rect x={x + bw * 0.15} y={100 - h} width={bw * 0.7} height={h} rx="2" fill={i === unknown ? '#fbbf24' : '#38bdf8'} stroke="#0369a1" strokeWidth="0.8" />
            <text x={x + bw / 2} y={96 - h} fontSize="8.5" textAnchor="middle" fill="#0f172a" fontWeight="bold">
              {i === unknown ? '?' : v.toFixed(4).replace('.', ',')}
            </text>
            <text x={x + bw / 2} y="111" fontSize="9" textAnchor="middle" fill="#334155">
              {i}
            </text>
          </g>
        );
      })}
      <text x="120" y="123" fontSize="9" textAnchor="middle" fill="#475569">
        {caption}
      </text>
    </svg>
  );
};

const FERKO = [0.4437, 0.3915, 0.1382, 0.0244, 0.0022, 0.0001];

const SAMPLING_WITH_REPLACEMENT_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'swr-q1',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mikor beszélünk visszatevéses mintavételről?',
    options: [
      'Ha minden választás pontosan ugyanazok közül az elemek közül történik',
      'Ha a kiválasztott elemet félretesszük, és nem választható újra',
      'Ha az összes elemet egyszerre választjuk ki',
      'Ha a minta elemszáma nagyobb, mint a sokaságé'
    ],
    correctAnswer: 0,
    explanation: 'Visszatevéses mintavételnél a kiválasztott elemet visszatesszük (vagy ki sem vesszük, csak megvizsgáljuk), így minden húzás ugyanazok közül az elemek közül történik.'
  },
  {
    id: 'swr-q2',
    level: 1,
    questionTypeBadge: 'Urna',
    question: 'Egy urnában 3 piros és 7 fehér golyó van. Visszatevéssel kétszer húzunk. Mennyi a valószínűsége, hogy mindkét golyó piros?',
    figure: <UrnFig red={3} white={7} caption="2 húzás visszatevéssel" />,
    options: ['0,09', '1/15', '0,6', '0,3'],
    correctAnswer: 0,
    explanation: 'Mindkét húzásnál p = 3/10 = 0,3, a húzások függetlenek: 0,3 · 0,3 = 0,09. (Az 1/15 = 3/10 · 2/9 a visszatevés nélküli eset.)'
  },
  {
    id: 'swr-q3',
    level: 1,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Ötször végzünk el egy kísérletet. Hányféleképpen választhatjuk ki, hogy melyik 3 kísérlet legyen sikeres?',
    figure: <TrialsFig marks={['?', '?', '?', '?', '?']} caption="3 siker, 2 kudarc – hol?" />,
    options: ['10', '60', '15', '5'],
    correctAnswer: 0,
    explanation: 'Az 5 hely közül 3-at választunk, a sorrend nem számít: (5 alatt 3) = 10. (A 60 = 5 · 4 · 3 a sorrendet is figyelembe venné.)'
  },
  {
    id: 'swr-q4',
    level: 1,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Mennyi az (5 alatt 0) binomiális együttható értéke?',
    options: ['1', '0', '5', 'nincs értelmezve'],
    correctAnswer: 0,
    explanation: 'Minden n természetes számra (n alatt 0) = 1: egyféleképpen választhatunk ki 0 elemet.'
  },
  {
    id: 'swr-q5',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Hogyan nevezik az (n alatt k) · pᵏ · (1 − p)^{n−k} alakban felírt valószínűségeket?',
    options: ['binomiális eloszlás', 'egyenletes eloszlás', 'hipergeometrikus eloszlás', 'relatív gyakoriság'],
    correctAnswer: 0,
    explanation: 'A binomiális együtthatók megjelenése miatt binomiális eloszlásnak nevezik ezeket a valószínűségeket.'
  },
  {
    id: 'swr-q6',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'Az (n alatt k) · pᵏ · (1 − p)^{n−k} képletben mit fejez ki az (1 − p)^{n−k} tényező?',
    options: [
      'A többi n − k kísérlet nem sikeres',
      'A kiválasztott k kísérlet sikeres',
      'Ennyiféleképpen választhatjuk ki a sikeres kísérleteket',
      'Legalább egy kísérlet sikeres'
    ],
    correctAnswer: 0,
    explanation: 'pᵏ: a kiválasztott k kísérlet sikeres; (1 − p)^{n−k}: a többi n − k kísérlet nem sikeres; (n alatt k): a sikeres kísérletek helyének kiválasztása.'
  },
  {
    id: 'swr-q7',
    level: 1,
    questionTypeBadge: 'Érmedobás',
    question: 'Egy szabályos érmét 4-szer feldobunk. Mennyi a valószínűsége, hogy pontosan 2 fej lesz?',
    options: ['3/8', '1/4', '1/2', '1/16'],
    correctAnswer: 0,
    explanation: '(4 alatt 2) · 0,5² · 0,5² = 6/16 = 3/8.'
  },
  {
    id: 'swr-q8',
    level: 1,
    questionTypeBadge: 'Alkalmazás',
    question: 'Miért alkalmaznak gyakran visszatevéses mintavételt például közvélemény-kutatásnál?',
    options: [
      'Mert egyszerűbb megszervezni, és nagy sokaságnál alig különbözik a visszatevés nélkülitől',
      'Mert így biztosan mindenkit megkérdeznek',
      'Mert így pontosabb, mint a visszatevés nélküli',
      'Mert így nem kell valószínűséget számolni'
    ],
    correctAnswer: 0,
    explanation: 'Nem kell foglalkozni azzal, hogy két kérdező ugyanazt az embert kérdezi; nagy elemszámnál (pl. 100 000-ből 200) a két mintavétel valószínűségei közel egyenlők.'
  },
  {
    id: 'swr-q9',
    level: 1,
    questionTypeBadge: 'Kidolgozott feladat',
    question: 'Ferkó lövései 0,15 valószínűséggel találnak. Mennyi a valószínűsége, hogy 5 lövésből egy sem talál?',
    figure: <BarsFig values={FERKO} unknown={0} caption="Ferkó találatainak száma 5 lövésből" />,
    options: ['≈ 0,4437', '0,25', '0,85', '≈ 0,0001'],
    correctAnswer: 0,
    explanation: 'Minden lövés 0,85 valószínűséggel nem talál: 0,85⁵ ≈ 0,4437. (A 0,25 = 1 − 5 · 0,15 hibás gondolatmenet.)'
  },
  {
    id: 'swr-q10',
    level: 1,
    questionTypeBadge: 'Tankönyvi feladat',
    question: 'Tünde palacsintái 0,8 valószínűséggel sikerülnek (0,2 valószínűséggel elszakadnak). Mennyi a valószínűsége, hogy a hátralévő 3 palacsintából egy sem szakad el?',
    options: ['0,512', '0,8', '0,488', '0,4'],
    correctAnswer: 0,
    explanation: '0,8³ = 0,512.'
  },
  // ---------- 2. szint ----------
  {
    id: 'swr-q11',
    level: 2,
    questionTypeBadge: 'Binomiális eloszlás',
    question: 'Egy kísérletet egymástól függetlenül ötször végzünk el, mindegyik 0,8 valószínűséggel sikeres. Mennyi a valószínűsége, hogy pontosan háromszor lesz sikeres?',
    figure: <TrialsFig marks={['s', 's', 's', 'k', 'k']} caption="egy lehetséges sorrend a 10 közül" />,
    options: ['≈ 0,2048', '≈ 0,0205', '0,512', '0,6'],
    correctAnswer: 0,
    explanation: '(5 alatt 3) · 0,8³ · 0,2² = 10 · 0,512 · 0,04 = 0,2048. (A 0,02048 csak egyetlen sorrend valószínűsége.)'
  },
  {
    id: 'swr-q12',
    level: 2,
    questionTypeBadge: 'Kidolgozott feladat',
    question: 'Ferkó (p = 0,15) ötször lő. Mennyi a valószínűsége, hogy pontosan 1 találata lesz?',
    figure: <BarsFig values={FERKO} unknown={1} caption="Ferkó találatainak száma 5 lövésből" />,
    options: ['≈ 0,3915', '≈ 0,0783', '0,15', '0,75'],
    correctAnswer: 0,
    explanation: '(5 alatt 1) · 0,15 · 0,85⁴ = 5 · 0,15 · 0,522 ≈ 0,3915. (0,0783 az együttható nélküli érték.)'
  },
  {
    id: 'swr-q13',
    level: 2,
    questionTypeBadge: 'Tankönyvi feladat',
    question: 'Tünde palacsintái 0,2 valószínűséggel szakadnak el. Mennyi a valószínűsége, hogy 3 palacsintából pontosan 1 szakad el?',
    options: ['0,384', '0,128', '0,2', '0,096'],
    correctAnswer: 0,
    explanation: '(3 alatt 1) · 0,2 · 0,8² = 3 · 0,128 = 0,384.'
  },
  {
    id: 'swr-q14',
    level: 2,
    questionTypeBadge: 'Tankönyvi feladat',
    question: 'Tünde palacsintái 0,2 valószínűséggel szakadnak el. Mennyi a valószínűsége, hogy 3 palacsintából pontosan 2 szakad el?',
    options: ['0,096', '0,032', '0,384', '0,04'],
    correctAnswer: 0,
    explanation: '(3 alatt 2) · 0,2² · 0,8 = 3 · 0,032 = 0,096.'
  },
  {
    id: 'swr-q15',
    level: 2,
    questionTypeBadge: 'Kockadobás',
    question: 'Szabályos kockával 8-szor dobunk. Mennyi a valószínűsége, hogy pontosan 2 dobás lesz hatos?',
    options: ['≈ 0,2605', '≈ 0,0093', '0,25', '≈ 0,0278'],
    correctAnswer: 0,
    explanation: '(8 alatt 2) · (1/6)² · (5/6)⁶ = 28 · 0,0093 ≈ 0,2605.'
  },
  {
    id: 'swr-q16',
    level: 2,
    questionTypeBadge: 'Érmedobás',
    question: 'Jocó szerint 10 érmedobás után 0,5 a valószínűsége, hogy ugyanannyi fej lesz, mint írás. Valójában mennyi ez a valószínűség?',
    options: ['≈ 0,246', '0,5', '0,1', '≈ 0,001'],
    correctAnswer: 0,
    explanation: '(10 alatt 5) · 0,5¹⁰ = 252/1024 ≈ 0,246. A „vagy egyenlő, vagy nem” két lehetősége nem egyformán valószínű.'
  },
  {
    id: 'swr-q17',
    level: 2,
    questionTypeBadge: 'Hiányzó együttható',
    question: 'Egy üzemben 0,05 valószínűséggel készül hibás termék. A „10 termékből pontosan 2 hibás” valószínűsége: ? · 0,05² · 0,95⁸. Mi áll a kérdőjel helyén?',
    options: ['45', '10', '20', '90'],
    correctAnswer: 0,
    explanation: '(10 alatt 2) = 10 · 9 / 2 = 45. (A 90 = 10 · 9 a sorrendet is számolná.)'
  },
  {
    id: 'swr-q18',
    level: 2,
    questionTypeBadge: 'Binomiális eloszlás',
    question: 'Panni minden dobásnál 0,8 valószínűséggel talál célba. Mennyi a valószínűsége, hogy 7 dobásból pontosan 4-szer talál?',
    options: ['≈ 0,1147', '≈ 0,0287', '≈ 0,0033', '≈ 0,5714'],
    correctAnswer: 0,
    explanation: '(7 alatt 4) · 0,8⁴ · 0,2³ = 35 · 0,4096 · 0,008 ≈ 0,1147. (0,0287: felcserélt kitevők; 0,0033: nincs együttható.)'
  },
  {
    id: 'swr-q19',
    level: 2,
    questionTypeBadge: 'Diagram',
    question: 'A diagram Ferkó 5 lövésének találati valószínűségeit mutatja (p = 0,15). Hány találatnak a legnagyobb a valószínűsége?',
    figure: <BarsFig values={FERKO} caption="találatok száma 5 lövésből" />,
    options: ['0 találatnak', '1 találatnak', '2 találatnak', 'mindegyik egyformán valószínű'],
    correctAnswer: 0,
    explanation: 'P(0) ≈ 0,4437 a legnagyobb, de majdnem ugyanekkora P(1) ≈ 0,3915.'
  },
  {
    id: 'swr-q20',
    level: 2,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Melyik binomiális együttható szerepel a képletben, ha 5 kísérletből pontosan 1 sikeres, és mennyi az értéke?',
    options: ['(5 alatt 1) = 5', '(5 alatt 1) = 1', '(5 alatt 0) = 1', '(5 alatt 5) = 5'],
    correctAnswer: 0,
    explanation: 'A sikeres kísérlet 5 helyen lehet: (5 alatt 1) = 5.'
  },
  // ---------- 3. szint ----------
  {
    id: 'swr-q21',
    level: 3,
    questionTypeBadge: 'Kockadobás',
    question: 'Szabályos kockával 8-szor dobunk. Mennyi a valószínűsége, hogy pontosan 3 dobás lesz hatos?',
    options: ['≈ 0,1042', '≈ 0,0019', '0,375', '≈ 0,2605'],
    correctAnswer: 0,
    explanation: '(8 alatt 3) · (1/6)³ · (5/6)⁵ = 56 · 0,00186 ≈ 0,1042.'
  },
  {
    id: 'swr-q22',
    level: 3,
    questionTypeBadge: 'Selejtarány',
    question: 'Egy gép 0,03 valószínűséggel gyárt selejtet. Mennyi a valószínűsége, hogy 15 termék közül pontosan 1 selejtes?',
    options: ['≈ 0,2938', '≈ 0,0196', '0,45', '≈ 0,6333'],
    correctAnswer: 0,
    explanation: '(15 alatt 1) · 0,03 · 0,97¹⁴ = 15 · 0,0196 ≈ 0,2938. (0,6333 = 0,97¹⁵: egy sem selejtes.)'
  },
  {
    id: 'swr-q23',
    level: 3,
    questionTypeBadge: 'Selejtarány',
    question: 'Egy gép 0,03 valószínűséggel gyárt selejtet. Mennyi a valószínűsége, hogy 15 termék közül pontosan 2 selejtes?',
    options: ['≈ 0,0636', '≈ 0,0006', '≈ 0,1272', '0,0009'],
    correctAnswer: 0,
    explanation: '(15 alatt 2) = 105, így 105 · 0,03² · 0,97¹³ ≈ 0,0636.'
  },
  {
    id: 'swr-q24',
    level: 3,
    questionTypeBadge: 'Összeadás',
    question: 'Egy gép 0,03 valószínűséggel gyárt selejtet. Mennyi a valószínűsége, hogy 15 termék közül 1 vagy 2 selejtes?',
    options: ['≈ 0,3574', '≈ 0,0187', '≈ 0,2938', '≈ 0,6426'],
    correctAnswer: 0,
    explanation: 'A két eset kizárja egymást, ezért összeadjuk: 0,2938 + 0,0636 ≈ 0,3574.'
  },
  {
    id: 'swr-q25',
    level: 3,
    questionTypeBadge: 'Rulett',
    question: 'A rulettben 37 szám van: 18 piros, 18 fekete és a zöld 0. Mennyi a valószínűsége, hogy 6 pörgetésből mindegyiknél piros jön ki?',
    options: ['≈ 0,0133', '≈ 0,0156', '≈ 0,4865', '≈ 0,0795'],
    correctAnswer: 0,
    explanation: '(18/37)⁶ ≈ 0,0133. (0,0156 = 0,5⁶ – de a zöld 0 miatt a piros valószínűsége kisebb, mint 0,5.)'
  },
  {
    id: 'swr-q26',
    level: 3,
    questionTypeBadge: 'Rulett',
    question: 'Rulettben (18 piros, 18 fekete, 1 zöld) mennyi a valószínűsége, hogy 6 pörgetésnél az első 4 piros, a következő 2 fekete lesz?',
    figure: <TrialsFig marks={['s', 's', 's', 's', 'k', 'k']} caption="S = piros, K = fekete – rögzített sorrend" />,
    options: ['≈ 0,0133', '≈ 0,2216', '≈ 0,0002', '0,0625'],
    correctAnswer: 0,
    explanation: 'A sorrend rögzített, így nem kell együttható: (18/37)⁴ · (18/37)² = (18/37)⁶ ≈ 0,0133.'
  },
  {
    id: 'swr-q27',
    level: 3,
    questionTypeBadge: 'Rulett',
    question: 'Rulettben (18 piros, 18 fekete, 1 zöld) mennyi a valószínűsége, hogy 6 pörgetésből pontosan 4-nél jön ki piros?',
    options: ['≈ 0,2216', '≈ 0,0148', '≈ 0,2344', '≈ 0,0133'],
    correctAnswer: 0,
    explanation: '(6 alatt 4) · (18/37)⁴ · (19/37)² ≈ 0,2216. A „nem piros” valószínűsége 19/37 (fekete vagy zöld). A 0,2344 = 15/64 a hibás 0,5-ös modell.'
  },
  {
    id: 'swr-q28',
    level: 3,
    questionTypeBadge: 'Kockadobás',
    question: 'Dobókockával 6-szor dobunk. Mennyi a valószínűsége, hogy pontosan 3 dobás lesz kettes?',
    options: ['≈ 0,0536', '≈ 0,0027', '0,5', '≈ 0,1667'],
    correctAnswer: 0,
    explanation: '(6 alatt 3) · (1/6)³ · (5/6)³ = 20 · 125/46 656 ≈ 0,0536.'
  },
  {
    id: 'swr-q29',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Ferkó (p = 0,15) ötször lő. Mennyi a valószínűsége, hogy legalább egyszer talál?',
    figure: <BarsFig values={FERKO} caption="találatok száma 5 lövésből" />,
    options: ['≈ 0,5563', '0,75', '≈ 0,3915', '≈ 0,4437'],
    correctAnswer: 0,
    explanation: 'A „legalább egy találat” ellentéte a „0 találat”: 1 − 0,85⁵ ≈ 1 − 0,4437 = 0,5563.'
  },
  {
    id: 'swr-q30',
    level: 3,
    questionTypeBadge: 'Urna',
    question: 'Egy urnában 10 golyó van, közülük 2 piros. Visszatevéssel 4-szer húzunk. Mennyi a valószínűsége, hogy pontosan 1 piros golyót húzunk?',
    figure: <UrnFig red={2} white={8} caption="4 húzás visszatevéssel" />,
    options: ['0,4096', '0,1024', '≈ 0,5333', '0,2'],
    correctAnswer: 0,
    explanation: 'p = 0,2 minden húzásnál: (4 alatt 1) · 0,2 · 0,8³ = 4 · 0,1024 = 0,4096. (0,5333 a visszatevés nélküli húzás eredménye lenne.)'
  }
];

export const SamplingWithReplacementQuiz: React.FC<{
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
      topicId="g11-stat-visszateveses-quiz"
      subtopicId="visszateveses-mintavetel"
      title="13. Visszatevéses mintavétel – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: visszatevéses húzás, binomiális együttható, binomiális eloszlás."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={SAMPLING_WITH_REPLACEMENT_QUESTIONS}
      cheatSheets={[
        {
          title: 'Visszatevéses mintavétel',
          items: [
            'minden húzás ugyanazok közül az elemek közül',
            'a siker valószínűsége minden lépésben ugyanaz: p',
            'a lépések függetlenek („ugyanazt többször”)',
            'nagy sokaságnál ≈ visszatevés nélküli'
          ]
        },
        {
          title: 'Binomiális eloszlás',
          items: [
            'P(pontosan k) = (n alatt k) · pᵏ · (1 − p)^{n−k}',
            '(n alatt k): a sikerek helyének kiválasztása',
            'pᵏ: k siker; (1 − p)^{n−k}: n − k kudarc',
            'a P(0), P(1), …, P(n) összege 1'
          ]
        },
        {
          title: 'Hasznos értékek',
          items: [
            '(n alatt 0) = (n alatt n) = 1, (n alatt 1) = n',
            '(5 alatt 2) = (5 alatt 3) = 10, (10 alatt 5) = 252',
            'rögzített sorrend: NEM kell együttható',
            'legalább egy: 1 − (1 − p)ⁿ'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SamplingWithReplacementMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SamplingWithReplacementSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SamplingWithReplacementQuiz;
