import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PermutationsMatcher } from './PermutationsMatcher';
import { PermutationsSorter } from './PermutationsSorter';

const FIG_CLASS = 'w-full max-w-[300px] h-auto mx-auto';

const ANIMAL_COLORS: Record<string, string> = { T: '#f97316', O: '#ca8a04', P: '#0f172a', L: '#a16207', E: '#64748b' };

const tok = (x: number, y: number, id: string, key?: string) => (
  <g key={key ?? id + x}>
    <circle cx={x} cy={y} r="14" fill="#ffffff" stroke={ANIMAL_COLORS[id] ?? '#6366f1'} strokeWidth="2.2" />
    <text x={x} y={y + 5} fontSize="13" fontWeight="bold" textAnchor="middle" fill={ANIMAL_COLORS[id] ?? '#4338ca'}>
      {id}
    </text>
  </g>
);

const PERM_FIG_PARADE = (
  <svg viewBox="0 0 260 120" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="116" rx="12" fill="#fff7ed" stroke="#fed7aa" />
    {['T', 'O', 'P', 'L', 'E'].map((a, i) => tok(42 + i * 44, 30, a))}
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <rect x={26 + i * 44} y={58} width="32" height="30" rx="6" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
        <text x={42 + i * 44} y={78} fontSize="14" fontWeight="bold" textAnchor="middle" fill="#9a3412">
          ?
        </text>
      </g>
    ))}
    <text x="130" y="108" fontSize="10" textAnchor="middle" fill="#475569">1. hely … 5. hely</text>
  </svg>
);

const PERM_FIG_BLOCK = (
  <svg viewBox="0 0 260 100" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="96" rx="12" fill="#fffbeb" stroke="#fde68a" />
    <rect x="18" y="26" width="76" height="40" rx="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" strokeDasharray="5 3" />
    {tok(40, 46, 'T')}
    {tok(72, 46, 'O')}
    {['P', 'L', 'E'].map((a, i) => tok(130 + i * 42, 46, a))}
    <text x="130" y="88" fontSize="10" textAnchor="middle" fill="#475569">tigris (T) és oroszlán (O) közvetlenül egymás után?</text>
  </svg>
);

const PERM_FIG_CIRCLE = (
  <svg viewBox="0 0 260 150" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="146" rx="12" fill="#f0fdfa" stroke="#99f6e4" />
    <circle cx="130" cy="76" r="50" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="4 4" />
    {['T', 'O', 'P', 'L', 'E'].map((a, i) => {
      const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      return tok(130 + 50 * Math.cos(ang), 76 + 50 * Math.sin(ang), a);
    })}
    <text x="130" y="81" fontSize="11" textAnchor="middle" fill="#0f766e">kör</text>
  </svg>
);

const PERM_FIG_SEATS = (
  <svg viewBox="0 0 260 90" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="86" rx="12" fill="#fdf2f8" stroke="#fbcfe8" />
    {['L', 'F', 'L', 'F', 'L', 'F'].map((s, i) => {
      const girl = s === 'L';
      return (
        <g key={i}>
          <rect x={14 + i * 40} y={24} width="34" height="34" rx="6" fill={girl ? '#fce7f3' : '#dbeafe'} stroke={girl ? '#db2777' : '#2563eb'} strokeWidth="1.6" />
          <text x={31 + i * 40} y={46} fontSize="12" fontWeight="bold" textAnchor="middle" fill={girl ? '#9d174d' : '#1e40af'}>
            {girl ? 'lány' : 'fiú'}
          </text>
          <text x={31 + i * 40} y={74} fontSize="9" textAnchor="middle" fill="#64748b">
            {i + 1}.
          </text>
        </g>
      );
    })}
  </svg>
);

const PERM_FIG_ENDS = (
  <svg viewBox="0 0 260 90" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="86" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {Array.from({ length: 9 }, (_, i) => {
      const label = i === 0 ? 'A' : i === 8 ? 'B' : '?';
      const fixed = label !== '?';
      return (
        <g key={i}>
          <rect x={12 + i * 27} y={26} width="23" height="30" rx="5" fill={fixed ? '#fef3c7' : '#eef2ff'} stroke={fixed ? '#d97706' : '#6366f1'} strokeWidth="1.4" />
          <text x={23.5 + i * 27} y={46} fontSize="12" fontWeight="bold" textAnchor="middle" fill={fixed ? '#92400e' : '#4338ca'}>
            {label}
          </text>
        </g>
      );
    })}
    <text x="130" y="76" fontSize="10" textAnchor="middle" fill="#475569">A = András (bal szél), B = Bence (jobb szél)</text>
  </svg>
);

const PERM_FIG_THEATER = (
  <svg viewBox="0 0 260 100" className={FIG_CLASS} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="256" height="96" rx="12" fill="#f5f3ff" stroke="#ddd6fe" />
    <text x="130" y="20" fontSize="10" textAnchor="middle" fill="#475569">10. sor, 1–4. hely</text>
    {[1, 2, 3, 4].map((s, i) => (
      <g key={s}>
        <path d={`M ${40 + i * 50} 62 v -26 q 0 -6 6 -6 h 28 q 6 0 6 6 v 26 z`} fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x={60 + i * 50} y={54} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#5b21b6">
          {s}.
        </text>
      </g>
    ))}
    <text x="130" y="86" fontSize="11" textAnchor="middle" fill="#334155">Anna, Béla, Cili, Dénes</text>
  </svg>
);

const PERMUTATIONS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Faktoriális, egyszerű sorba rendezés (1–10)
  {
    id: 'perm-q1',
    level: 1,
    questionTypeBadge: 'Permutáció',
    figure: PERM_FIG_PARADE,
    question: 'A cirkuszban 5 vadállat (tigris, oroszlán, párduc, leopárd, elefánt) vonul szorosan egymás után. Hány különböző sorrendben vonulhatnak?',
    options: ['120', '25', '60', '24'],
    correctAnswer: 0,
    explanation: '5 · 4 · 3 · 2 · 1 = 5! = 120.'
  },
  {
    id: 'perm-q2',
    level: 1,
    questionTypeBadge: 'Faktoriális',
    question: 'Mennyi 0! értéke?',
    options: ['1', '0', 'Nincs értelmezve', '10'],
    correctAnswer: 0,
    explanation: 'A faktoriálist technikai okokból 0-ra is értelmezzük: 0! = 1.'
  },
  {
    id: 'perm-q3',
    level: 1,
    questionTypeBadge: 'Faktoriális',
    question: 'Mennyi 4! értéke?',
    options: ['24', '16', '10', '12'],
    correctAnswer: 0,
    explanation: '4! = 4 · 3 · 2 · 1 = 24. (A 10 = 4 + 3 + 2 + 1 összeadással jönne ki.)'
  },
  {
    id: 'perm-q4',
    level: 1,
    questionTypeBadge: 'Permutáció',
    question: 'Testnevelésórán 10 tanuló ül egy tornapadon. Hányféle sorrendben lehetséges ez?',
    options: ['3 628 800', '100', '362 880', '10¹⁰'],
    correctAnswer: 0,
    explanation: '10! = 3 628 800. (A 362 880 = 9!, a 10¹⁰ ismétléses eset lenne.)'
  },
  {
    id: 'perm-q5',
    level: 1,
    questionTypeBadge: 'Faktoriális',
    question: 'Mit jelent az n! (n faktoriális) jelölés?',
    options: [
      'n · (n − 1) · (n − 2) · … · 2 · 1',
      'n · n · … · n (n tényező)',
      'n + (n − 1) + … + 2 + 1',
      'n · (n − 1)'
    ],
    correctAnswer: 0,
    explanation: 'n! az első n pozitív egész szám szorzata – ennyi sorrendje van n különböző elemnek.'
  },
  {
    id: 'perm-q6',
    level: 1,
    questionTypeBadge: 'Permutáció',
    question: 'Anna, Béla, Cili és Dénes színházjegye a 10. sor 1–4. helyére szól. Hányféle sorrendben ülhetnek le?',
    options: ['24', '16', '12', '4'],
    correctAnswer: 0,
    explanation: '4! = 24.'
  },
  {
    id: 'perm-q7',
    level: 1,
    questionTypeBadge: 'Permutáció',
    question: 'Egy tánciskolai próbán 7 fiú és 7 lány vesz részt. Hányféleképpen alkothatnak 7 táncoló párt (minden lány fiúval táncol)?',
    options: ['5040', '49', '14', '823 543'],
    correctAnswer: 0,
    explanation: 'A lányok sorrendjét rögzítve az első lány párja 7-féle, a másodiké 6-féle, …: 7! = 5040. (823 543 = 7⁷ ismétléssel lenne.)'
  },
  {
    id: 'perm-q8',
    level: 1,
    questionTypeBadge: 'Permutáció',
    question: 'A tornateremben 9 tanuló áll egy sorban. Hány különböző módon lehetséges ez?',
    options: ['362 880', '81', '40 320', '3 628 800'],
    correctAnswer: 0,
    explanation: '9! = 362 880. (40 320 = 8!, 3 628 800 = 10!.)'
  },
  {
    id: 'perm-q9',
    level: 1,
    questionTypeBadge: 'Faktoriális',
    question: 'Mennyi 10! : 9! értéke?',
    options: ['10', '1', '90', '9'],
    correctAnswer: 0,
    explanation: '10! = 10 · 9!, így a hányados 10.'
  },
  {
    id: 'perm-q10',
    level: 1,
    questionTypeBadge: 'Egymás mellett',
    question: 'Hogyan számoljuk a sorrendeket, ha két elemnek egymás mellé kell kerülnie?',
    options: [
      'A két elemet egy elemnek tekintjük, sorba rendezzük az eggyel kevesebb elemet, és szorzunk 2-vel',
      'Az összes sorrendből kivonjuk az egymás melletti eseteket',
      'A két elemet rögzítjük az első két helyen, és csak a többit rendezzük',
      'Az összes sorrendet elosztjuk 2-vel'
    ],
    correctAnswer: 0,
    explanation: 'Egy „objektumnak” tekintjük őket: (n − 1)! sorrend, és a két elem kétféle sorrendben állhat: 2 · (n − 1)!.'
  },

  // LEVEL 2: Megkötések (11–20)
  {
    id: 'perm-q11',
    level: 2,
    questionTypeBadge: 'Egymás mellett',
    figure: PERM_FIG_BLOCK,
    question: 'Hány olyan sorrendben vonulhat az 5 vadállat, amelyben a tigris és az oroszlán közvetlenül egymás után következik?',
    options: ['48', '24', '72', '96'],
    correctAnswer: 0,
    explanation: 'Tigris–oroszlán blokk + 3 állat = 4 objektum: 4! = 24; a blokkon belül 2 sorrend: 2 · 24 = 48.'
  },
  {
    id: 'perm-q12',
    level: 2,
    questionTypeBadge: 'Nem egymás mellett',
    figure: PERM_FIG_BLOCK,
    question: 'Hány olyan sorrendben vonulhat az 5 vadállat, amelyben a tigris és az oroszlán NEM egymás után következik?',
    options: ['72', '48', '96', '120'],
    correctAnswer: 0,
    explanation: '5! − 2 · 4! = 120 − 48 = 72. (96 = 5! − 4! – elmaradt a 2-es szorzó.)'
  },
  {
    id: 'perm-q13',
    level: 2,
    questionTypeBadge: 'Egymás mellett',
    figure: PERM_FIG_THEATER,
    question: 'Anna, Béla, Cili és Dénes egymás melletti 4 helyre ül. Hányféleképpen, ha Anna és Béla egymás mellé kerül?',
    options: ['12', '6', '24', '18'],
    correctAnswer: 0,
    explanation: 'Anna–Béla blokk + Cili + Dénes: 3! = 6, a blokkon belül 2 sorrend: 12.'
  },
  {
    id: 'perm-q14',
    level: 2,
    questionTypeBadge: 'Nem egymás mellett',
    figure: PERM_FIG_THEATER,
    question: 'Anna, Béla, Cili és Dénes egymás melletti 4 helyre ül. Hányféleképpen, ha Anna és Béla NEM ülhet egymás mellett?',
    options: ['12', '18', '6', '20'],
    correctAnswer: 0,
    explanation: '4! − 2 · 3! = 24 − 12 = 12.'
  },
  {
    id: 'perm-q15',
    level: 2,
    questionTypeBadge: 'Egymás mellett',
    question: '10 tanuló ül a tornapadon. Hányféleképpen, ha Csilla és Panni egymás mellett akar ülni?',
    options: ['725 760', '362 880', '3 628 800', '1 451 520'],
    correctAnswer: 0,
    explanation: 'Csilla–Panni blokk + 8 tanuló = 9 objektum: 9!, a blokkon belül 2-féle: 2 · 9! = 725 760.'
  },
  {
    id: 'perm-q16',
    level: 2,
    questionTypeBadge: 'Rögzített helyek',
    figure: PERM_FIG_ENDS,
    question: '9 tanuló áll sorban úgy, hogy András a sor bal szélén, Bence a jobb szélén van. Hány különböző módon lehetséges ez?',
    options: ['5040', '40 320', '362 880', '720'],
    correctAnswer: 0,
    explanation: 'András és Bence helye rögzített, a többi 7 tanuló a maradék 7 helyen: 7! = 5040.'
  },
  {
    id: 'perm-q17',
    level: 2,
    questionTypeBadge: 'Rögzített helyek',
    question: 'Angolóra után 12 tanuló egyesével megy ki a teremből. Hányféleképpen, ha Csilla és Panni szeretne a „két utolsó” lenni?',
    options: ['7 257 600', '3 628 800', '479 001 600', '14 515 200'],
    correctAnswer: 0,
    explanation: 'Az első 10 helyen a többi 10 tanuló: 10!; az utolsó két helyen Csilla és Panni 2-féle sorrendben: 2 · 10! = 7 257 600.'
  },
  {
    id: 'perm-q18',
    level: 2,
    questionTypeBadge: 'Rögzített helyek',
    figure: PERM_FIG_SEATS,
    question: 'Három fiú és három lány ül le egymás mellé úgy, hogy az 1., 3., 5. helyre lány, a 2., 4., 6. helyre fiú ül. Hányféleképpen tehetik meg?',
    options: ['36', '720', '72', '18'],
    correctAnswer: 0,
    explanation: 'A lányok a saját 3 helyükön 3!, a fiúk is 3! sorrendben: 3! · 3! = 36.'
  },
  {
    id: 'perm-q19',
    level: 2,
    questionTypeBadge: 'Körbe rendezés',
    figure: PERM_FIG_CIRCLE,
    question: 'Az 5 vadállat körbevonul, és semelyiküket nem tekintjük „elsőnek”. Hány lényegében különböző sorrend van?',
    options: ['24', '120', '60', '25'],
    correctAnswer: 0,
    explanation: 'Minden körsorrendet 5-ször számolunk a 120 sorrendben (elforgatások), így 120 : 5 = 24 = 4!.'
  },
  {
    id: 'perm-q20',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    question: 'Tíz kártyára felírtuk a 0, 1, …, 9 számjegyeket. A 10! sorrend közül hány olyan van, amelyben a számjegyek csökkenő sorrendben követik egymást?',
    options: ['1', '10', '0', '3 628 800'],
    correctAnswer: 0,
    explanation: 'Csökkenő sorrend csak egy van: 9876543210.'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'perm-q21',
    level: 3,
    questionTypeBadge: 'Rögzített helyek',
    question: 'Ádám az öttusa bemelegítésén először az 5 A, majd a 4 B, végül a 3 C típusú akadályon ugrat át, típuson belül szabad sorrendben. Hányféle sorrendben ugrathat? (Érettségi, 2015)',
    options: ['17 280', '479 001 600', '2880', '60'],
    correctAnswer: 0,
    explanation: 'A csoportok sorrendje rögzített, a csoportokon belül 5!, 4!, 3!: 120 · 24 · 6 = 17 280.'
  },
  {
    id: 'perm-q22',
    level: 3,
    questionTypeBadge: 'Nem egymás mellett',
    question: '10 tanuló ül a tornapadon. Hányféleképpen, ha Zoli és Gábor NEM akar egymás mellett ülni?',
    options: ['2 903 040', '725 760', '3 265 920', '3 628 800'],
    correctAnswer: 0,
    explanation: '10! − 2 · 9! = 3 628 800 − 725 760 = 2 903 040. (3 265 920 = 10! − 9!, elmaradt a 2-es szorzó.)'
  },
  {
    id: 'perm-q23',
    level: 3,
    questionTypeBadge: 'Nem egymás mellett',
    question: '10 tanuló ül a tornapadon. Hányféleképpen, ha Csilla és Panni egymás mellett akar ülni, Zoli és Gábor viszont nem?',
    options: ['564 480', '645 120', '725 760', '2 903 040'],
    correctAnswer: 0,
    explanation: 'Csilla–Panni egymás mellett: 2 · 9! = 725 760. Ebből le kell vonni, ahol Zoli–Gábor is blokk: 2 · 2 · 8! = 161 280. Eredmény: 564 480.'
  },
  {
    id: 'perm-q24',
    level: 3,
    questionTypeBadge: 'Rögzített helyek',
    question: '12 tanuló egyesével megy ki a teremből. Hányféleképpen, ha Zoli, Gábor és Peti szeretne az „első három” lenni?',
    options: ['2 177 280', '362 880', '1 088 640', '6 531 840'],
    correctAnswer: 0,
    explanation: 'Az első 3 helyen ők hárman: 3! = 6; utánuk a többi 9 tanuló: 9!. Összesen 6 · 362 880 = 2 177 280.'
  },
  {
    id: 'perm-q25',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    question: 'A tíz számjegykártya sorrendjei közül hány határoz meg tízjegyű számot?',
    options: ['3 265 920', '3 628 800', '362 880', '2 903 040'],
    correctAnswer: 0,
    explanation: 'A 0-val kezdődő sorrendek száma 9!. Tízjegyű: 10! − 9! = 9 · 9! = 3 265 920.'
  },
  {
    id: 'perm-q26',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    question: 'A tíz számjegykártyával kirakott tízjegyű számok közül hány osztható 10-zel?',
    options: ['362 880', '3 265 920', '40 320', '326 592'],
    correctAnswer: 0,
    explanation: '10-zel osztható, ha a 0 az utolsó helyen áll; a többi 9 kártya sorrendje 9! = 362 880. (Ekkor az első jegy biztosan nem 0.)'
  },
  {
    id: 'perm-q27',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    question: 'A tíz számjegykártyával kirakott tízjegyű számok közül hány osztható 3-mal?',
    options: ['Mind a 3 265 920', '1 088 640', '0', '362 880'],
    correctAnswer: 0,
    explanation: 'A jegyek összege mindig 0 + 1 + … + 9 = 45, ami osztható 3-mal, ezért minden ilyen tízjegyű szám osztható 3-mal.'
  },
  {
    id: 'perm-q28',
    level: 3,
    questionTypeBadge: 'Sorrendes kiválasztás',
    question: 'Egy gyorsvasúthálózatnak 35 állomása van, a jegyre a kiinduló- és a célállomást is rányomtatják. Hányféle jegy létezik?',
    options: ['1190', '595', '1225', '70'],
    correctAnswer: 0,
    explanation: 'Kiindulóállomás 35-féle, célállomás 34-féle (más, mint a kiinduló): 35 · 34 = 1190.'
  },
  {
    id: 'perm-q29',
    level: 3,
    questionTypeBadge: 'Sorrend nélkül',
    question: 'A 35 állomásos gyorsvasúton a viteldíj nem függ a kiinduló- és a célállomás sorrendjétől. Legfeljebb hány különböző árú jegy lehetséges?',
    options: ['595', '1190', '630', '1225'],
    correctAnswer: 0,
    explanation: 'Az A→B és a B→A jegy ára azonos, így minden árat kétszer számoltunk: 1190 : 2 = 595.'
  },
  {
    id: 'perm-q30',
    level: 3,
    questionTypeBadge: 'Faktoriális',
    question: 'Mennyi 11! / (5! · 6!) értéke?',
    options: ['462', '47 520', '55 440', '11'],
    correctAnswer: 0,
    explanation: '11! = 39 916 800, 5! · 6! = 120 · 720 = 86 400; 39 916 800 : 86 400 = 462. (47 520 = 11! : (5! + 6!), 55 440 = 11! : 6!.)'
  }
];

export const PermutationsQuiz: React.FC<{
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
      topicId="g11-comb-sorba-rendezes-quiz"
      subtopicId="sorba-rendezes"
      title="2. Sorba rendezés – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: faktoriális, sorba rendezés rögzített helyekkel, egymás melletti és nem egymás melletti elemekkel, körben."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • KVÍZ"
      questions={PERMUTATIONS_QUESTIONS}
      cheatSheets={[
        {
          title: 'A faktoriális',
          items: [
            'n! = n · (n − 1) · … · 1 – n különböző elem sorrendjeinek száma.',
            '0! = 1, 1! = 1, 3! = 6, 4! = 24, 5! = 120, 6! = 720, 7! = 5040.',
            'n! = n · (n − 1)!, így 10! : 9! = 10.',
            '(5!)² = 14 400 ≠ 10!'
          ]
        },
        {
          title: 'Megkötések',
          items: [
            'Rögzített helyek: a többi elemet rendezzük a maradék helyekre.',
            'Két elem egymás mellett: 2 · (n − 1)!',
            'Két elem nem egymás mellett: n! − 2 · (n − 1)!',
            'Körbe rendezés: n! : n = (n − 1)!'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Cirkusz: 120; egymás után 48; nem egymás után 72; körben 24',
            'Öttusa: 5! · 4! · 3! = 17 280; lány–fiú váltakozva: 36; tánc: 7! = 5040',
            'Tornapad: 10!; C–P mellett 725 760; Z–G nem: 2 903 040; mindkettő: 564 480',
            'Számkártyák: tízjegyű 3 265 920; 10-zel osztható 362 880; gyorsvasút 1190 jegy, 595 ár'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PermutationsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PermutationsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default PermutationsQuiz;
