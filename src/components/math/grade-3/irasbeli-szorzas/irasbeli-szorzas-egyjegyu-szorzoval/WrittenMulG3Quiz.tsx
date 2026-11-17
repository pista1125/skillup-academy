import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenMulG3Matcher } from './WrittenMulG3Matcher';
import { WrittenMulG3Sorter } from './WrittenMulG3Sorter';
import { WrittenMulG3Column, MulColDigit } from './WrittenMulG3Column';

// ---------------------------------------------------------------------------
// Kérdésábrák – a keresett szám mindig piros „?”
// ---------------------------------------------------------------------------
const FONT = 'system-ui, Segoe UI, sans-serif';
const UNK = '#dc2626';
const INK = '#0f172a';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 140 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Írásbeli szorzás oszlopban. */
const Col = (a: number | string, m: number | string, result: number | string = '???', opts: { carries?: MulColDigit[]; highlight?: number; header?: boolean } = {}) => (
  <WrittenMulG3Column a={a} m={m} result={result} carries={opts.carries} highlight={opts.highlight ?? null} header={opts.header ?? true} cell={34} className="w-full max-w-[190px] h-auto mx-auto" />
);

/** n egyforma doboz, mindegyiken egy szám. */
const BoxesFig: React.FC<{ n: number; label: string; unit?: string }> = ({ n, label, unit }) => {
  const w = 50;
  const gap = 8;
  const x0 = (240 - (n * w + (n - 1) * gap)) / 2;
  return (
    <QFig h={110}>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y="22" width={w} height="44" rx="6" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
          <line x1={x0 + i * (w + gap)} y1="34" x2={x0 + i * (w + gap) + w} y2="34" stroke="#b45309" strokeWidth="2" />
          <text x={x0 + i * (w + gap) + w / 2} y="57" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{label}</text>
        </g>
      ))}
      <text x="120" y="96" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>összesen: ?{unit ? ` ${unit}` : ''}</text>
    </QFig>
  );
};

/** Szakaszos ábra: első nap egy szakasz, második nap k szakasz. */
const BarsFig: React.FC<{ l1: string; l2: string; v: number; k: number }> = ({ l1, l2, v, k }) => {
  const seg = 36;
  return (
    <QFig h={110}>
      <text x="12" y="38" fontSize="14" fontWeight="bold" fill={INK}>{l1}</text>
      <rect x="78" y="22" width={seg} height="24" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
      <text x={78 + seg / 2} y="39" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>{v}</text>
      <text x="12" y="80" fontSize="14" fontWeight="bold" fill={INK}>{l2}</text>
      {Array.from({ length: k }).map((_, i) => (
        <rect key={i} x={78 + i * seg} y="64" width={seg} height="24" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
      ))}
      <text x={78 + k * seg + 14} y="82" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
    </QFig>
  );
};

/** Árcédula + darabszám. */
const PriceFig: React.FC<{ item: string; price: number; n: number; extra?: string }> = ({ item, price, n, extra }) => (
  <QFig h={110}>
    <path d="M 30 18 L 140 18 L 158 36 L 140 54 L 30 54 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
    <circle cx="140" cy="36" r="3.5" fill="#b45309" />
    <text x="88" y="41" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>1 {item}: {price} Ft</text>
    <text x="120" y="88" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#c2410c">{n} {item}{extra ? ` ${extra}` : ''} = <tspan fill={UNK}>?</tspan></text>
  </QFig>
);

/** Négyzet alakú kert, oldalai feliratozva. */
const SquareFig: React.FC<{ side: string }> = ({ side }) => (
  <QFig h={150}>
    <rect x="70" y="25" width="100" height="100" fill="#dcfce7" stroke="#15803d" strokeWidth="3" />
    <text x="120" y="18" textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>{side}</text>
    <text x="120" y="142" textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>{side}</text>
    <text x="64" y="80" textAnchor="end" fontSize="14" fontWeight="bold" fill={INK}>{side}</text>
    <text x="176" y="80" fontSize="14" fontWeight="bold" fill={INK}>{side}</text>
    <text x="120" y="82" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>körben: ?</text>
  </QFig>
);

/** Könyvek: n könyv, mindegyiken az oldalszám. */
const BooksFig: React.FC<{ n: number; pages: number }> = ({ n, pages }) => {
  const colors = ['#60a5fa', '#f472b6', '#4ade80'];
  return (
    <QFig h={120}>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <rect x={40 + i * 56} y="16" width="46" height="64" rx="4" fill={colors[i % 3]} stroke="#334155" strokeWidth="2" />
          <rect x={40 + i * 56} y="16" width="7" height="64" fill="#334155" opacity="0.25" />
          <text x={66 + i * 56} y="54" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{pages}</text>
        </g>
      ))}
      <text x="120" y="106" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>összesen: ? oldal</text>
    </QFig>
  );
};

export const WRITTEN_MUL_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'wm-q1',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Szorozz írásban! Mennyi a szorzat?',
    figure: Col(231, 3),
    options: ['693', '234', '663', '963'],
    correctAnswer: 0,
    explanation: '3-szor 1 az 3, 3-szor 3 az 9, 3-szor 2 az 6. A szorzat 693.'
  },
  {
    id: 'wm-q2',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Szorozz írásban! Mennyi a szorzat?',
    figure: Col(142, 2),
    options: ['284', '144', '282', '248'],
    correctAnswer: 0,
    explanation: '2-szer 2 az 4, 2-szer 4 az 8, 2-szer 1 az 2. A szorzat 284.'
  },
  {
    id: 'wm-q3',
    level: 1,
    questionTypeBadge: 'Maradék',
    question: 'Szorozz írásban! Figyelj, mi marad!',
    figure: Col(124, 4),
    options: ['496', '486', '466', '396'],
    correctAnswer: 0,
    explanation: '4-szer 4 az 16. Leírom a 6-ot, maradt 1. 4-szer 2 az 8, meg 1 az 9. 4-szer 1 az 4. A szorzat 496.'
  },
  {
    id: 'wm-q4',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Hol kezdjük az írásbeli szorzást?',
    figure: Col(213, 3, '   '),
    options: ['Az egyeseknél', 'A százasoknál', 'A tízeseknél', 'Mindegy, hol'],
    correctAnswer: 0,
    explanation: 'Mindig az egyeseknél kezdünk, és balra haladunk. Így tudjuk, hova kerül, ami maradt.'
  },
  {
    id: 'wm-q5',
    level: 1,
    questionTypeBadge: 'Elnevezések',
    question: 'Ebben a szorzásban mi a neve a 3-nak?',
    figure: Col(214, 3, 642),
    options: ['szorzó', 'szorzandó', 'szorzat', 'összeg'],
    correctAnswer: 0,
    explanation: 'Elöl áll a szorzandó (214), utána a szorzó (3). Az eredmény a szorzat (642).'
  },
  {
    id: 'wm-q6',
    level: 1,
    questionTypeBadge: 'Maradék',
    question: 'Szorozz írásban! Mennyi a szorzat?',
    figure: Col(316, 3),
    options: ['948', '938', '958', '848'],
    correctAnswer: 0,
    explanation: '3-szor 6 az 18. Leírom a 8-at, maradt 1. 3-szor 1 az 3, meg 1 az 4. 3-szor 3 az 9. A szorzat 948.'
  },
  {
    id: 'wm-q7',
    level: 1,
    questionTypeBadge: 'Maradék',
    question: '216 · 3. Az egyeseknél: 3-szor 6 az 18. Mit csinálsz?',
    figure: Col(216, 3, '  ?', { highlight: 0 }),
    options: ['Leírom a 8-at, maradt 1.', 'Leírom az 1-et, maradt 8.', 'Leírom a 18-at.', 'Leírom a 8-at, nem marad semmi.'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyére csak az utolsó jegyet írjuk: 8. Az 1 tízes marad, azt a tízesekhez adjuk.'
  },
  {
    id: 'wm-q8',
    level: 1,
    questionTypeBadge: 'Egyesek',
    question: 'Melyik számjegy kerül a szorzatban az egyesek helyére?',
    figure: Col(127, 3, '  ?', { highlight: 0 }),
    options: ['1', '2', '7', '3'],
    correctAnswer: 0,
    explanation: '3-szor 7 az 21. Az egyesek helyére az 1-et írjuk, és maradt 2.'
  },
  {
    id: 'wm-q9',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy dobozban 122 gyöngy van. Hány gyöngy van 4 dobozban?',
    figure: <BoxesFig n={4} label="122" unit="gyöngy" />,
    options: ['488', '126', '478', '448'],
    correctAnswer: 0,
    explanation: '122 · 4: 4-szer 2 az 8, 4-szer 2 az 8, 4-szer 1 az 4. Összesen 488 gyöngy.'
  },
  {
    id: 'wm-q10',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Mennyi 413 · 2?',
    options: ['826', '415', '836', '628'],
    correctAnswer: 0,
    explanation: '2-szer 3 az 6, 2-szer 1 az 2, 2-szer 4 az 8. A szorzat 826.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'wm-q11',
    level: 2,
    questionTypeBadge: 'Kétszer marad',
    question: 'Szorozz írásban! Kétszer is marad valami.',
    figure: Col(157, 4),
    options: ['628', '408', '618', '528'],
    correctAnswer: 0,
    explanation: '4-szer 7 az 28, leírom a 8-at, maradt 2. 4-szer 5 az 20, meg 2 az 22, leírom a 2-t, maradt 2. 4-szer 1 az 4, meg 2 az 6. A szorzat 628.'
  },
  {
    id: 'wm-q12',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Szorozz írásban! Mennyi a szorzat?',
    figure: Col(263, 3),
    options: ['789', '689', '786', '799'],
    correctAnswer: 0,
    explanation: '3-szor 3 az 9. 3-szor 6 az 18, leírom a 8-at, maradt 1. 3-szor 2 az 6, meg 1 az 7. A szorzat 789.'
  },
  {
    id: 'wm-q13',
    level: 2,
    questionTypeBadge: 'Nulla a közepén',
    question: 'Szorozz írásban! Vigyázz a nullára!',
    figure: Col(208, 4),
    options: ['832', '802', '822', '842'],
    correctAnswer: 0,
    explanation: '4-szer 8 az 32, leírom a 2-t, maradt 3. 4-szer 0 az 0, meg 3 az 3. 4-szer 2 az 8. A szorzat 832.'
  },
  {
    id: 'wm-q14',
    level: 2,
    questionTypeBadge: 'Hiányzó jegy',
    question: 'Melyik számjegy van a ? helyén?',
    figure: Col(176, 5, '8?0'),
    options: ['8', '5', '3', '0'],
    correctAnswer: 0,
    explanation: '5-ször 6 az 30, leírom a 0-t, maradt 3. 5-ször 7 az 35, meg 3 az 38. Leírom a 8-at. A szorzat 880.'
  },
  {
    id: 'wm-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó szorzó',
    question: 'Melyik szám a szorzó?',
    figure: Col(143, '?', 572),
    options: ['4', '3', '5', '6'],
    correctAnswer: 0,
    explanation: 'Nézd az egyeseket: hányszor 3 végződik 2-re? 4-szer 3 az 12. Próba: 143 · 4 = 572.'
  },
  {
    id: 'wm-q16',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Becsülj előbb! Melyik a jó szorzat?',
    figure: Col(189, 3),
    options: ['567', '347', '767', '657'],
    correctAnswer: 0,
    explanation: 'Becslés: 190 · 3 = 570. A 567 közel van hozzá. 3-szor 9 az 27, maradt 2; 3-szor 8 az 24, meg 2 az 26, maradt 2; 3-szor 1 az 3, meg 2 az 5.'
  },
  {
    id: 'wm-q17',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik összeadással ellenőrizheted ezt a szorzást?',
    figure: Col(236, 3, 708),
    options: ['236 + 236 + 236', '236 + 3', '236 + 236', '3 + 3 + 3'],
    correctAnswer: 0,
    explanation: '236 · 3 azt jelenti: 3-szor a 236. Ezért 236 + 236 + 236 = 708.'
  },
  {
    id: 'wm-q18',
    level: 2,
    questionTypeBadge: 'Maradék',
    question: 'Az egyeseknél maradt 2. A tízeseknél: 4-szer 6 az 24, meg 2 az …?',
    figure: Col(165, 4, ' ?0', { carries: [null, 2], highlight: 1 }),
    options: ['26', '24', '22', '8'],
    correctAnswer: 0,
    explanation: '24 meg 2 az 26. Leírom a 6-ot, és maradt 2 a százasoknak.'
  },
  {
    id: 'wm-q19',
    level: 2,
    questionTypeBadge: 'Kétjegyű szorzandó',
    question: 'Szorozz írásban! Mennyi a szorzat?',
    figure: Col(96, 8),
    options: ['768', '728', '778', '868'],
    correctAnswer: 0,
    explanation: '8-szor 6 az 48, leírom a 8-at, maradt 4. 8-szor 9 az 72, meg 4 az 76. Leírom a 76-ot. A szorzat 768.'
  },
  {
    id: 'wm-q20',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Hétfőn 128 almát szedtünk, kedden 3-szor annyit. Hány almát szedtünk kedden?',
    figure: <BarsFig l1="hétfő" l2="kedd" v={128} k={3} />,
    options: ['384', '364', '131', '512'],
    correctAnswer: 0,
    explanation: '128 · 3: 3-szor 8 az 24, maradt 2; 3-szor 2 az 6, meg 2 az 8; 3-szor 1 az 3. Kedden 384 almát szedtünk.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'wm-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy mesekönyv 236 oldalas. Lili 3 ilyen könyvet olvasott el. Hány oldalt olvasott?',
    figure: <BooksFig n={3} pages={236} />,
    options: ['708', '698', '608', '718'],
    correctAnswer: 0,
    explanation: '236 · 3: 3-szor 6 az 18, maradt 1; 3-szor 3 az 9, meg 1 az 10, leírom a 0-t, maradt 1; 3-szor 2 az 6, meg 1 az 7. 708 oldal.'
  },
  {
    id: 'wm-q22',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Egy mozijegy 145 Ft. Bence 4 jegyet vesz, és 1000 Ft-tal fizet. Mennyit kap vissza?',
    figure: <PriceFig item="jegy" price={145} n={4} />,
    options: ['420 Ft', '580 Ft', '520 Ft', '855 Ft'],
    correctAnswer: 0,
    explanation: '1. lépés: 145 · 4 = 580 Ft. 2. lépés: 1000 − 580 = 420 Ft-ot kap vissza.'
  },
  {
    id: 'wm-q23',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Délelőtt 124-en, délután 3-szor annyian voltak a múzeumban. Hányan voltak összesen?',
    figure: <BarsFig l1="délelőtt" l2="délután" v={124} k={3} />,
    options: ['496', '372', '248', '127'],
    correctAnswer: 0,
    explanation: '1. lépés: délután 124 · 3 = 372-en. 2. lépés: összesen 124 + 372 = 496-an.'
  },
  {
    id: 'wm-q24',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik szorzat a nagyobb: 218 · 4 vagy 293 · 3?',
    options: ['293 · 3', '218 · 4', 'Egyenlők', 'Nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: '218 · 4 = 872, 293 · 3 = 879. A 879 a nagyobb, tehát 293 · 3.'
  },
  {
    id: 'wm-q25',
    level: 3,
    questionTypeBadge: 'Hiányzó jegy',
    question: 'Melyik számjegy hiányzik a szorzandóból?',
    figure: Col('1?6', 4, 624),
    options: ['5', '6', '4', '2'],
    correctAnswer: 0,
    explanation: 'Próbáld ki az 5-öt! 4-szer 6 az 24, maradt 2. 4-szer 5 az 20, meg 2 az 22, maradt 2. 4-szer 1 az 4, meg 2 az 6. Ez 624, tehát a hiányzó jegy az 5.'
  },
  {
    id: 'wm-q26',
    level: 3,
    questionTypeBadge: 'Hibakeresés',
    question: 'Egy gyerek így szorzott. Mit rontott el?',
    figure: Col(167, 3, 381),
    options: ['Nem adta hozzá, ami maradt', 'Rosszul szorzott az egyeseknél', 'A százasoknál kezdte', 'Nem hibázott'],
    correctAnswer: 0,
    explanation: 'Az egyesek jók (3-szor 7 az 21, leírom az 1-et, maradt 2). De a 2-t nem adta hozzá: 3-szor 6 az 18, meg 2 az 20. A jó szorzat 501.'
  },
  {
    id: 'wm-q27',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Egy csomag matrica 128 Ft, egy radír 75 Ft. Mennyit fizetsz 3 csomag matricáért és 1 radírért?',
    figure: <PriceFig item="csomag" price={128} n={3} extra="+ radír" />,
    options: ['459 Ft', '384 Ft', '309 Ft', '449 Ft'],
    correctAnswer: 0,
    explanation: '1. lépés: 128 · 3 = 384 Ft. 2. lépés: 384 + 75 = 459 Ft.'
  },
  {
    id: 'wm-q28',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik szorzat nagyobb 900-nál?',
    options: ['307 · 3', '298 · 3', '224 · 4', '179 · 5'],
    correctAnswer: 0,
    explanation: '307 · 3 = 921. A többi: 298 · 3 = 894, 224 · 4 = 896, 179 · 5 = 895 – ezek kisebbek 900-nál.'
  },
  {
    id: 'wm-q29',
    level: 3,
    questionTypeBadge: 'Hiányzó szorzó',
    question: 'Melyik szám a szorzó?',
    figure: Col(187, '?', 935),
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: 'Becsülj: 190 · 5 = 950, ez közel van a 935-höz. Próba: 187 · 5 = 935.'
  },
  {
    id: 'wm-q30',
    level: 3,
    questionTypeBadge: 'Kerület',
    question: 'Egy négyzet alakú kert minden oldala 214 m. Milyen hosszú a kerítés körben?',
    figure: <SquareFig side="214 m" />,
    options: ['856 m', '428 m', '218 m', '846 m'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4 egyenlő oldala van: 214 · 4 = 856 m.'
  }
];

export const WrittenMulG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId="g3-wmul-irasbeli-quiz"
      subtopicId="irasbeli-szorzas-egyjegyu-szorzoval"
      title="3. Írásbeli szorzás egyjegyű szorzóval – Kvíz"
      subtitle="30 feladat 3 szinten: írásbeli szorzás, ami marad, hiányzó számok, szöveges feladatok."
      badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • KVÍZ"
      questions={WRITTEN_MUL_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Így szorzol írásban',
          items: ['Kezdd az egyeseknél, haladj balra!', '4-szer 8 az 32. Leírom a 2-t, maradt 3.', '4-szer 7 az 28, meg 3 az 31.']
        },
        {
          title: 'Becslés és ellenőrzés',
          items: ['Becslés: 162 ≈ 160, 160 · 4 = 640', 'Számolás: 162 · 4 = 648', 'Ellenőrzés: 162 + 162 + 162 + 162 = 648']
        },
        {
          title: 'Vigyázz!',
          items: ['Ne felejtsd el, ami maradt!', 'Nullánál is add hozzá: 204 · 4 = 816', 'Szorozz, ne adj össze: 4-szer 7 az 28']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WrittenMulG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <WrittenMulG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default WrittenMulG3Quiz;
