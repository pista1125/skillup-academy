import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CombinatoricsPractice1Matcher } from './CombinatoricsPractice1Matcher';
import { CombinatoricsPractice1Sorter } from './CombinatoricsPractice1Sorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Betűtábla a szókiolvasáshoz (bal felső sarokból jobbra vagy lefelé). */
const LetterGridFig: React.FC<{ rows: string[] }> = ({ rows }) => {
  const cols = rows[0].length;
  const cell = Math.min(26, 200 / cols, 110 / rows.length);
  const x0 = 120 - (cols * cell) / 2;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      {rows.map((row, r) =>
        row.split('').map((ch, c) => (
          <g key={r + '-' + c}>
            <rect x={x0 + c * cell} y={8 + r * cell} width={cell - 2} height={cell - 2} rx="4" fill={r === 0 && c === 0 ? '#bbf7d0' : r === rows.length - 1 && c === cols - 1 ? '#fde68a' : '#ffffff'} stroke="#6ee7b7" />
            <text x={x0 + c * cell + (cell - 2) / 2} y={8 + r * cell + cell / 2 + 3} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">{ch}</text>
          </g>
        ))
      )}
      <text x="120" y="144" fontSize="10" textAnchor="middle" fill="#334155">csak jobbra → vagy lefelé ↓ – ? kiolvasás</text>
    </svg>
  );
};

const LampsFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    {Array.from({ length: 7 }, (_, i) => (
      <g key={i}>
        <line x1={24 + i * 32} y1="10" x2={24 + i * 32} y2="36" stroke="#64748b" />
        <circle cx={24 + i * 32} cy="50" r="13" fill="#fef9c3" stroke="#a16207" strokeWidth="1.5" />
        <text x={24 + i * 32} y="54" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#a16207">?</text>
      </g>
    ))}
    <text x="120" y="96" fontSize="11" textAnchor="middle" fill="#0f172a">7 külön kapcsolható lámpa</text>
    <text x="120" y="118" fontSize="11" textAnchor="middle" fill="#334155">legalább 5 világít – ? lehetőség</text>
  </svg>
);

const JuryFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    {Array.from({ length: 5 }, (_, i) => (
      <g key={'t' + i}>
        <circle cx={24 + i * 24} cy="24" r="9" fill="#2563eb" />
        <text x={24 + i * 24} y="28" fontSize="9" textAnchor="middle" fill="#ffffff" fontWeight="bold">T</text>
      </g>
    ))}
    {Array.from({ length: 8 }, (_, i) => (
      <g key={'d' + i}>
        <circle cx={24 + i * 24} cy="54" r="9" fill="#059669" />
        <text x={24 + i * 24} y="58" fontSize="9" textAnchor="middle" fill="#ffffff" fontWeight="bold">D</text>
      </g>
    ))}
    {Array.from({ length: 6 }, (_, i) => (
      <g key={'z' + i}>
        <rect x={40 + i * 28} y="86" width="22" height="22" rx="5" fill="#ffffff" stroke={i < 3 ? '#2563eb' : '#059669'} strokeWidth="2" />
        <text x={51 + i * 28} y="101" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#334155">?</text>
      </g>
    ))}
    <text x="120" y="132" fontSize="10.5" textAnchor="middle" fill="#334155">zsűri: 3 tanár és 3 diák</text>
  </svg>
);

const CarsFig: React.FC<{ seats: number[]; caption: string }> = ({ seats, caption }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    {seats.map((s, k) => {
      const x = 12 + k * 76;
      return (
        <g key={k}>
          <rect x={x} y="30" width="68" height="52" rx="12" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
          <circle cx={x + 16} cy="86" r="6" fill="#334155" />
          <circle cx={x + 52} cy="86" r="6" fill="#334155" />
          {Array.from({ length: s }, (_, i) => (
            <circle key={i} cx={x + 12 + Math.floor(i / 2) * (44 / Math.max(1, Math.ceil(s / 2) - 1))} cy={44 + (i % 2) * 22} r="6" fill="#93c5fd" />
          ))}
          <text x={x + 34} y="110" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">{s} személyes</text>
        </g>
      );
    })}
    <text x="120" y="136" fontSize="10.5" textAnchor="middle" fill="#334155">{caption}</text>
  </svg>
);

const LotteryFig: React.FC<{ drawn: number; hit: number; notDrawn: number; miss: number }> = ({ drawn, hit, notDrawn, miss }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="10" y="20" width="100" height="70" rx="10" fill="#fee2e2" stroke="#dc2626" />
    <text x="60" y="44" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#991b1b">kihúzott</text>
    <text x="60" y="64" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#991b1b">{drawn} szám</text>
    <text x="60" y="82" fontSize="10" textAnchor="middle" fill="#991b1b">ebből {hit} megjelölve</text>
    <rect x="130" y="20" width="100" height="70" rx="10" fill="#f1f5f9" stroke="#64748b" />
    <text x="180" y="44" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#334155">nem kihúzott</text>
    <text x="180" y="64" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#334155">{notDrawn} szám</text>
    <text x="180" y="82" fontSize="10" textAnchor="middle" fill="#334155">ebből {miss} megjelölve</text>
    <text x="120" y="122" fontSize="11" textAnchor="middle" fill="#0f172a">? szelvény</text>
  </svg>
);

const COMBINATORICS_PRACTICE_1_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapesetek (1–10)
  {
    id: 'cp1-q1',
    level: 1,
    questionTypeBadge: 'Permutáció',
    question: 'A cirkuszban 5 vadállat vonul egymás után. Hány különböző sorrendben vonulhatnak?',
    options: ['120', '25', '60', '3125'],
    correctAnswer: 0,
    explanation: '5 különböző elem sorba rendezése: 5! = 5 · 4 · 3 · 2 · 1 = 120.'
  },
  {
    id: 'cp1-q2',
    level: 1,
    questionTypeBadge: 'Variáció',
    question: 'Bendi jelszava 3 karakteres, a {B; e; n; 1; 7} karakterekből, és mindhárom karakter különböző. Hány ilyen jelszó van?',
    options: ['60', '125', '10', '15'],
    correctAnswer: 0,
    explanation: 'Számít a sorrend, nincs ismétlés: 5 · 4 · 3 = 60.'
  },
  {
    id: 'cp1-q3',
    level: 1,
    questionTypeBadge: 'Ismétléses variáció',
    question: 'Hány 3 karakteres jelszó készíthető a {B; e; n; 1; 7} karakterekből, ha a karakterek ismétlődhetnek?',
    options: ['125', '60', '15', '243'],
    correctAnswer: 0,
    explanation: 'Minden helyre 5-féle karakter kerülhet: 5³ = 125.'
  },
  {
    id: 'cp1-q4',
    level: 1,
    questionTypeBadge: 'Kombináció',
    question: 'Hányféleképpen lehet kitölteni egy ötös lottószelvényt (90 számból 5)?',
    options: ['(90 alatt 5)', '90 · 89 · 88 · 87 · 86', '90⁵', '5⁹⁰'],
    correctAnswer: 0,
    explanation: 'Nem számít, milyen sorrendben jelöljük meg a számokat, és egy szám csak egyszer jelölhető: (90 alatt 5) = 43 949 268.'
  },
  {
    id: 'cp1-q5',
    level: 1,
    questionTypeBadge: 'Ismétléses variáció',
    question: 'Egy 6 kérdéses tesztben minden kérdésnél az A, B, C, D közül kell egyet bekarikázni. Hány kitöltés lehetséges?',
    options: ['4096', '1296', '24', '360'],
    correctAnswer: 0,
    explanation: 'Ismétléses variáció: minden kérdésnél 4 lehetőség, 4⁶ = 4096. (Itt k = 6 > n = 4 is lehet.)'
  },
  {
    id: 'cp1-q6',
    level: 1,
    questionTypeBadge: 'Modellválasztás',
    question: 'Melyik esetben NEM számít a kiválasztás sorrendje?',
    options: [
      '6 fős zsűri kiválasztása',
      'Jelszó készítése',
      'Hétfői órarend összeállítása',
      'Egy futóverseny dobogósainak (1., 2., 3.) megadása'
    ],
    correctAnswer: 0,
    explanation: 'A zsűritagok ugyanolyan szerepbe kerülnek. A jelszónál, az órarendnél és a dobogónál a helyeknek sorrendje van.'
  },
  {
    id: 'cp1-q7',
    level: 1,
    questionTypeBadge: 'Faktoriális',
    question: 'Mennyi 0! (nulla faktoriális)?',
    options: ['1', '0', 'Nincs értelmezve', 'Végtelen'],
    correctAnswer: 0,
    explanation: 'A faktoriálist technikai okokból 0-ra is értelmezzük: 0! = 1. Így pl. (n alatt n) = n! / (n! · 0!) = 1.'
  },
  {
    id: 'cp1-q8',
    level: 1,
    questionTypeBadge: 'Kombináció',
    question: 'Hány 4 elemű részhalmaza van a 9 elemű H = {a, b, c, d, e, f, g, h, i} halmaznak?',
    options: ['126', '3024', '36', '6561'],
    correctAnswer: 0,
    explanation: '9 · 8 · 7 · 6 = 3024 sorrendben választás, de minden részhalmazt 4! = 24-szer számoltunk: 3024 / 24 = 126.'
  },
  {
    id: 'cp1-q9',
    level: 1,
    questionTypeBadge: 'Variáció',
    question: 'Egy 10 fős csoportban két különböző jutalmat osztunk ki, egy ember csak egyet kaphat. Hányféleképpen?',
    options: ['90', '100', '45', '55'],
    correctAnswer: 0,
    explanation: 'Az 1. jutalmat 10, a 2.-at a maradék 9 ember kaphatja: 10 · 9 = 90.'
  },
  {
    id: 'cp1-q10',
    level: 1,
    questionTypeBadge: 'Kombináció',
    question: 'Egy 10 fős csoportban két egyforma jutalmat osztunk ki, egy ember csak egyet kaphat. Hányféleképpen?',
    options: ['45', '90', '100', '55'],
    correctAnswer: 0,
    explanation: 'Csak az számít, melyik két ember kapja: (10 alatt 2) = 10 · 9 / 2 = 45.'
  },

  // LEVEL 2: Tankönyvi gyakorló feladatok (11–20)
  {
    id: 'cp1-q11',
    level: 2,
    questionTypeBadge: 'Lottó',
    question: 'A hatos lottóban 45 számból 6-ot kell megjelölni. Hány különböző tipp lehetséges?',
    options: ['8 145 060', '5 864 443 200', '43 949 268', '270'],
    correctAnswer: 0,
    explanation: '(45 alatt 6) = 8 145 060, így egy szelvénnyel a telitalálat valószínűsége ≈ 0,000 000 123. Az 5 864 443 200 a sorrendet is figyelembe venné.'
  },
  {
    id: 'cp1-q12',
    level: 2,
    questionTypeBadge: 'Esetszétválasztás',
    figure: <LampsFig />,
    question: 'Egy nappaliba 7, külön-külön kapcsolható lámpát szereltek. Hányféleképpen valósulhat meg, hogy legalább 5 lámpa világít?',
    options: ['29', '21', '64', '99'],
    correctAnswer: 0,
    explanation: '5, 6 vagy 7 lámpa ég: (7 alatt 5) + (7 alatt 6) + (7 alatt 7) = 21 + 7 + 1 = 29.'
  },
  {
    id: 'cp1-q13',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'A zsűribe 6 főt választunk 5 tanár és 8 diák közül; a tanár–diák arány közömbös. Hányféleképpen?',
    options: ['1716', '560', '66', '1 235 520'],
    correctAnswer: 0,
    explanation: '13 emberből 6, a sorrend nem számít: (13 alatt 6) = 1716.'
  },
  {
    id: 'cp1-q14',
    level: 2,
    questionTypeBadge: 'Szorzási szabály',
    figure: <JuryFig />,
    question: 'A 6 fős zsűriben 3 tanárnak és 3 diáknak kell lennie (5 tanár, 8 diák). Hányféleképpen állítható össze?',
    options: ['560', '66', '1716', '280'],
    correctAnswer: 0,
    explanation: 'A két választás egyszerre történik, szorzunk: (5 alatt 3) · (8 alatt 3) = 10 · 56 = 560.'
  },
  {
    id: 'cp1-q15',
    level: 2,
    questionTypeBadge: 'Lottó',
    figure: <LotteryFig drawn={5} hit={3} notDrawn={85} miss={2} />,
    question: 'Hány 3 találatos szelvény létezik az ötös lottón egy adott héten?',
    options: ['35 700', '3580', '3570', '357 000'],
    correctAnswer: 0,
    explanation: 'Az 5 kihúzottból 3: (5 alatt 3) = 10; a 85 nem kihúzottból 2: (85 alatt 2) = 3570. Szorzat: 35 700.'
  },
  {
    id: 'cp1-q16',
    level: 2,
    questionTypeBadge: 'Lottó',
    figure: <LotteryFig drawn={5} hit={4} notDrawn={85} miss={1} />,
    question: 'Hány 4 találatos szelvény létezik az ötös lottón egy adott héten?',
    options: ['425', '85', '5', '430'],
    correctAnswer: 0,
    explanation: '(5 alatt 4) · (85 alatt 1) = 5 · 85 = 425.'
  },
  {
    id: 'cp1-q17',
    level: 2,
    questionTypeBadge: 'Ismétléses variáció',
    question: 'Egy 10 fős csoportban két különböző jutalmat osztunk ki, és egy ember akár mindkettőt megkaphatja. Hányféleképpen?',
    options: ['100', '90', '55', '20'],
    correctAnswer: 0,
    explanation: 'Mindkét jutalom 10 ember bármelyikéhez kerülhet: 10 · 10 = 100.'
  },
  {
    id: 'cp1-q18',
    level: 2,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Egy 10 fős csoportban két egyforma jutalmat osztunk ki, és egy ember akár mindkettőt megkaphatja. Hányféleképpen?',
    options: ['55', '45', '100', '19'],
    correctAnswer: 0,
    explanation: 'Esetszétválasztás: egy ember kapja mindkettőt (10 eset) vagy két különböző ember (45 eset): 10 + 45 = 55.'
  },
  {
    id: 'cp1-q19',
    level: 2,
    questionTypeBadge: 'Szókiolvasás',
    figure: <LetterGridFig rows={['TÉGLA', 'ÉGLAL', 'GLALA', 'LALAP']} />,
    question: 'A TÉGLALAP szó egy 4 sorból és 5 oszlopból álló betűtáblából olvasható ki, jobbra vagy lefelé lépve. Hányféleképpen?',
    options: ['35', '20', '12', '70'],
    correctAnswer: 0,
    explanation: '7 lépés kell, ebből 4 jobbra és 3 lefelé: (7 alatt 4) = 35. A táblázatos összeadás is 35-öt ad.'
  },
  {
    id: 'cp1-q20',
    level: 2,
    questionTypeBadge: 'Permutáció',
    question: 'Az 5 vadállat (köztük a tigris és az oroszlán) hány olyan sorrendben vonulhat, amelyben a tigris és az oroszlán közvetlenül egymás után jön?',
    options: ['48', '24', '72', '120'],
    correctAnswer: 0,
    explanation: 'A tigrist és az oroszlánt egy „objektumnak” tekintjük: 4! = 24, és kettőjük sorrendje 2-féle: 2 · 24 = 48.'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'cp1-q21',
    level: 3,
    questionTypeBadge: 'Szorzási szabály',
    figure: <CarsFig seats={[4, 5, 6]} caption="15 barát – az ülésrend lényegtelen" />,
    question: '15 barát egy 4, egy 5 és egy 6 személyes autóval utazik; az autón belüli ülésrend lényegtelen. Hányféle beosztás lehetséges?',
    options: ['630 630', '1828', '126 126', '1 307 674 368 000'],
    correctAnswer: 0,
    explanation: '(15 alatt 4) · (11 alatt 5) · (6 alatt 6) = 1365 · 462 · 1 = 630 630. (Az 1828 hibásan összeadja a lehetőségeket, a 15! az üléseket is megkülönböztetné.)'
  },
  {
    id: 'cp1-q22',
    level: 3,
    questionTypeBadge: 'Csoportosítás',
    figure: <CarsFig seats={[5, 5, 5]} caption="három egyforma autó – ? beosztás" />,
    question: 'A 15 fő három egyforma 5 személyes autóba ül; csak az számít, ki kivel ül egy autóban. Hányféleképpen?',
    options: ['126 126', '756 756', '3003', '252 252'],
    correctAnswer: 0,
    explanation: '(15 alatt 5) · (10 alatt 5) · (5 alatt 5) = 756 756, de az autók nem különböznek, így 3! = 6-tal osztunk: 126 126.'
  },
  {
    id: 'cp1-q23',
    level: 3,
    questionTypeBadge: 'Részhalmazok',
    question: 'Egy 9 elemű halmaznak páros vagy páratlan elemszámú részhalmazából van több?',
    options: [
      'Ugyanannyi: 256 – 256',
      'Páros elemszámúból, mert az üres halmaz is páros',
      'Páratlan elemszámúból, mert 9 páratlan',
      'Páros elemszámúból: 257 – 255'
    ],
    correctAnswer: 0,
    explanation: 'A komplementerképzés egy páros elemszámú részhalmazhoz páratlan elemszámút rendel (9 páratlan), és fordítva. Így 2⁹ / 2 = 256 – 256.'
  },
  {
    id: 'cp1-q24',
    level: 3,
    questionTypeBadge: 'Részhalmazok',
    question: 'Egy n elemű halmaz (n pozitív egész) páros, illetve páratlan elemszámú részhalmazainak számáról mit mondhatunk?',
    options: [
      'Mindig egyenlő, mindkettő 2ⁿ⁻¹',
      'Csak páratlan n esetén egyenlő',
      'Páros n esetén a páros elemszámúakból van több',
      'Mindig a páros elemszámúakból van eggyel több'
    ],
    correctAnswer: 0,
    explanation: 'Rögzítsünk egy elemet: ennek hozzávétele vagy elhagyása minden részhalmaz elemszámának paritását megváltoztatja, így a páros és páratlan részhalmazok párba állíthatók. Pl. n = 10: 512 – 512.'
  },
  {
    id: 'cp1-q25',
    level: 3,
    questionTypeBadge: 'Lottó',
    question: 'Egy lottójátékban 35 számból 7-et kell megjelölni. Hány 6 találatos kitöltés létezik egy adott héten?',
    options: ['196', '7', '28', '35'],
    correctAnswer: 0,
    explanation: 'A 7 kihúzottból 6: (7 alatt 6) = 7; a 28 nem kihúzottból 1: 28. Szorzat: 7 · 28 = 196.'
  },
  {
    id: 'cp1-q26',
    level: 3,
    questionTypeBadge: 'Kártya',
    question: 'Döncinél van a négy király és a makk alsó (5 lap a 32-ből). Hányféle lehet Bence 5 lapja a maradékból?',
    options: ['80 730', '201 376', '98 280', '65 780'],
    correctAnswer: 0,
    explanation: '32 − 5 = 27 lap maradt: (27 alatt 5) = 80 730. A 201 376 = (32 alatt 5) Dönci lehetséges lapjainak száma.'
  },
  {
    id: 'cp1-q27',
    level: 3,
    questionTypeBadge: 'Kombináció',
    question: 'Panni 4 zselés és 10 marcipános szaloncukrot talált; két hétig naponta egyet eszik. Hányféleképpen választhatja ki a zselés napokat?',
    options: ['1001', '24 024', '2002', '56'],
    correctAnswer: 0,
    explanation: 'A 14 napból 4-et kell kiválasztani (a zselések egyformák): (14 alatt 4) = 1001.'
  },
  {
    id: 'cp1-q28',
    level: 3,
    questionTypeBadge: 'Szókiolvasás',
    figure: <LetterGridFig rows={['MATEMA', 'ATEMAT', 'TEMATI', 'EMATIK', 'MATIKA']} />,
    question: 'A MATEMATIKA szó egy 5 sorból és 6 oszlopból álló betűtáblából olvasható ki, a bal felső sarokból jobbra vagy lefelé lépve. Hányféleképpen?',
    options: ['126', '252', '30', '84'],
    correctAnswer: 0,
    explanation: '9 lépés kell (10 betű), ebből 4 lefelé és 5 jobbra: (9 alatt 4) = 126.'
  },
  {
    id: 'cp1-q29',
    level: 3,
    questionTypeBadge: 'Lottó',
    figure: <LotteryFig drawn={5} hit={0} notDrawn={85} miss={5} />,
    question: 'Hány 0 találatos szelvény létezik az ötös lottón egy adott héten?',
    options: [
      '(5 alatt 0) · (85 alatt 5) = 32 801 517',
      '(90 alatt 5) − 1 = 43 949 267',
      '(85 alatt 4) = 2 024 785',
      '5 · (85 alatt 5) = 164 007 585'
    ],
    correctAnswer: 0,
    explanation: 'Mind az 5 megjelölt szám a 85 nem kihúzott közül kerül ki: (85 alatt 5) = 32 801 517. Az 5, 4, …, 0 találatos szelvények száma összesen (90 alatt 5).'
  },
  {
    id: 'cp1-q30',
    level: 3,
    questionTypeBadge: 'Permutáció',
    question: '10 tanuló ül egy tornapadon. Hány sorrend van, amelyben Csilla és Panni egymás mellett ül?',
    options: ['725 760', '362 880', '2 903 040', '3 628 800'],
    correctAnswer: 0,
    explanation: 'Csillát és Pannit egy „objektumnak” tekintve 9! = 362 880 sorrend, és ők kétféle sorrendben ülhetnek: 2 · 9! = 725 760.'
  }
];

export const CombinatoricsPractice1Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId="g11-comb-gyakorlas-elso-quiz"
      subtopicId="gyakorlas-kombinatorika-1"
      title="5. Gyakorlás – kombinatorika – Kvíz"
      subtitle="30 vegyes tesztkérdés 3 nehézségi szinten: sorba rendezés, jelszavak, kiválasztás sorrenddel és sorrend nélkül, lottó, zsűri, szókiolvasás."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • KVÍZ"
      questions={COMBINATORICS_PRACTICE_1_QUESTIONS}
      cheatSheets={[
        {
          title: 'Alapesetek',
          items: [
            'Mindet sorba: n! (0! = 1)',
            'Sorrend számít, nincs ismétlés: n · (n − 1) · … · (n − k + 1)',
            'Sorrend számít, van ismétlés: nᵏ (k > n is lehet)',
            'Sorrend nem számít: (n alatt k) = n! / (k! (n − k)!)'
          ]
        },
        {
          title: 'Összetett feladatok',
          items: [
            '„és” (egyszerre / egymás után) ⇒ szorzás',
            '„vagy” (különálló esetek) ⇒ összeadás',
            'Egyforma csoportok (autók) sorrendje ⇒ osztás a csoportok számának faktoriálisával',
            'Egymás mellett ⇒ egy „objektum” · 2'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Ötös lottó: 43 949 268; 3 találat: 35 700; hatos lottó: 8 145 060',
            'Lámpák: 29; zsűri: 1716 és 560',
            'Autók: 630 630; 15!; 126 126',
            'Jutalmak: 90, 100, 45, 55; TÉGLALAP: 35'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CombinatoricsPractice1Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CombinatoricsPractice1Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CombinatoricsPractice1Quiz;
