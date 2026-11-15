import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { G11DivisibilityRulesMatcher } from './G11DivisibilityRulesMatcher';
import { G11DivisibilityRulesSorter } from './G11DivisibilityRulesSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** A hét napjai körben, a kiinduló nap kiemelve. */
const WeekFig: React.FC<{ start: number; note: string }> = ({ start, note }) => {
  const days = ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <circle cx="80" cy="75" r="52" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
      {days.map((d, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
        const x = 80 + 52 * Math.cos(a);
        const y = 75 + 52 * Math.sin(a);
        return (
          <g key={d}>
            <circle cx={x} cy={y} r="13" fill={i === start ? '#059669' : '#ffffff'} stroke="#334155" />
            <text x={x} y={y + 4} fontSize="9" textAnchor="middle" fontWeight="bold" fill={i === start ? '#ffffff' : '#0f172a'}>{d}</text>
          </g>
        );
      })}
      <text x="80" y="79" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#dc2626">?</text>
      <text x="185" y="70" fontSize="11" textAnchor="middle" fill="#0f172a">{note}</text>
      <text x="185" y="88" fontSize="10" textAnchor="middle" fill="#64748b">melyik nap?</text>
    </svg>
  );
};

/** 7-es maradékosztályok táblázata. */
const Mod7Fig: React.FC = () => (
  <svg viewBox="0 0 240 130" className={FIG_CLASS}>
    {Array.from({ length: 7 }, (_, j) => (
      <g key={j}>
        <rect x={6 + j * 33} y="8" width="30" height="20" rx="4" fill="#059669" />
        <text x={21 + j * 33} y="22" fontSize="8" textAnchor="middle" fontWeight="bold" fill="#ffffff">{j === 0 ? '7k' : `7k+${j}`}</text>
        {[1, 2, 3].map((r) => (
          <text key={r} x={21 + j * 33} y={28 + r * 22} fontSize="11" textAnchor="middle" fill="#0f172a">{7 * r + j}</text>
        ))}
      </g>
    ))}
    <text x="120" y="122" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#dc2626">Melyik oszlopba kerül a 100?</text>
  </svg>
);

/** Csoportlétszámok. */
const GroupsFig: React.FC = () => (
  <svg viewBox="0 0 240 100" className={FIG_CLASS}>
    {[15, 13, 12, 14, 16, 19].map((g, i) => (
      <g key={g}>
        <rect x={6 + i * 39} y="20" width="34" height="40" rx="7" fill="#ffffff" stroke="#334155" />
        <text x={23 + i * 39} y="46" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">{g}</text>
      </g>
    ))}
    <text x="120" y="82" fontSize="10" textAnchor="middle" fill="#334155">a többi csoportban: Gólya = 2 · Végzős</text>
  </svg>
);

/** Számkártyák. */
const CardsFig: React.FC<{ cards: string[] }> = ({ cards }) => (
  <svg viewBox="0 0 240 90" className={FIG_CLASS}>
    {cards.map((c, i) => {
      const x = 120 - (cards.length * 40) / 2 + i * 40 + 3;
      return (
        <g key={i}>
          <rect x={x} y="18" width="34" height="46" rx="6" fill={c === '?' || /[a-zY]/.test(c) ? '#fef3c7' : '#ffffff'} stroke="#334155" strokeWidth="1.5" />
          <text x={x + 17} y="48" fontSize="18" textAnchor="middle" fontWeight="bold" fill={/[a-zY?]/.test(c) ? '#b45309' : '#0f172a'}>{c}</text>
        </g>
      );
    })}
  </svg>
);

const G11_DIVISIBILITY_RULES_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Szabályok (1–10)
  {
    id: 'dr-q1',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Mikor osztható egy természetes szám 4-gyel?',
    options: [
      'Ha az utolsó két jegyéből álló szám osztható 4-gyel',
      'Ha az utolsó jegye osztható 4-gyel',
      'Ha a számjegyeinek összege osztható 4-gyel',
      'Ha az utolsó három jegyéből álló szám osztható 4-gyel, de kettőé nem'
    ],
    correctAnswer: 0,
    explanation: 'A 4 a 100 osztója, ezért elég az utolsó két jegyet vizsgálni. Pl. 4 | 3132, mert 4 | 32. Az utolsó jegy nem elég: 4 ∤ 14, pedig 4 | 4.'
  },
  {
    id: 'dr-q2',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Mikor osztható egy természetes szám 9-cel?',
    options: ['Ha a számjegyeinek összege osztható 9-cel', 'Ha az utolsó jegye 9', 'Ha az utolsó két jegye osztható 9-cel', 'Ha páratlan, és osztható 3-mal'],
    correctAnswer: 0,
    explanation: 'A 3-mal és a 9-cel való oszthatóságot a számjegyek összege dönti el. Pl. 1 + 1 + 3 + 8 + 5 = 18, ezért 9 | 11 385.'
  },
  {
    id: 'dr-q3',
    level: 1,
    questionTypeBadge: 'Szabály',
    question: 'Hány utolsó jegyet kell vizsgálni a 125-tel való oszthatósághoz?',
    options: ['Hármat', 'Egyet', 'Kettőt', 'Az összes jegyet'],
    correctAnswer: 0,
    explanation: 'A 125 az 1000 osztója (1000 = 8 · 125), ezért az utolsó három jegyből álló szám dönt – ugyanúgy, mint a 8-nál.'
  },
  {
    id: 'dr-q4',
    level: 1,
    questionTypeBadge: 'Bevezető',
    question: 'A 11 385 részvényt egyenlően kell szétosztani. Az alábbi létszámok közül melyiknél lehetséges ez?',
    options: ['9 tag', '2 tag', '25 tag', '4 tag'],
    correctAnswer: 0,
    explanation: 'A számjegyek összege 18, így 9 | 11 385. Az utolsó jegy páratlan (2 ∤), 25 ∤ 85, 4 ∤ 85.'
  },
  {
    id: 'dr-q5',
    level: 1,
    questionTypeBadge: 'Maradékos osztás',
    question: '1200 Ft-ból a lehető legtöbb 350 Ft-os csokit vesszük. Mennyi pénz marad? (1200 = 3 · 350 + r)',
    options: ['150 Ft', '50 Ft', '350 Ft', '200 Ft'],
    correctAnswer: 0,
    explanation: '3 · 350 = 1050, 1200 − 1050 = 150, és 0 ≤ 150 < 350. Tehát 1200 = 3 · 350 + 150.'
  },
  {
    id: 'dr-q6',
    level: 1,
    questionTypeBadge: 'Maradék',
    question: 'Milyen maradékokat adhat egy természetes szám 5-tel osztva?',
    options: ['0; 1; 2; 3; 4', '1; 2; 3; 4; 5', '0; 5', '0; 1; 2; 3; 4; 5'],
    correctAnswer: 0,
    explanation: 'A maradék mindig kisebb az osztónál: b = 5k + r, ahol r ∈ {0; 1; 2; 3; 4}. Az 5 már nem lehet maradék.'
  },
  {
    id: 'dr-q7',
    level: 1,
    questionTypeBadge: 'Maradékosztály',
    question: 'Hány maradékosztály van a 7-tel való osztás szerint?',
    options: ['7', '6', '8', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'Pozitív egész a-val osztva pontosan a darab maradékosztály van: 7k, 7k + 1, …, 7k + 6 – összesen 7.'
  },
  {
    id: 'dr-q8',
    level: 1,
    questionTypeBadge: 'Oszthatóság 8-cal',
    question: 'Melyik szám osztható 8-cal?',
    options: ['3152', '3132', '3124', '3142'],
    correctAnswer: 0,
    explanation: 'Az utolsó három jegy dönt: 152 = 8 · 19. A 132, 124 és 142 nem osztható 8-cal (a 132 és a 124 csak 4-gyel).'
  },
  {
    id: 'dr-q9',
    level: 1,
    questionTypeBadge: 'Oszthatóság 25-tel',
    question: 'Melyik szám osztható 25-tel?',
    options: ['4375', '4355', '4315', '4520'],
    correctAnswer: 0,
    explanation: 'Az utolsó két jegy 00, 25, 50 vagy 75 lehet: a 4375 végződése 75. A 55, 15, 20 nem osztható 25-tel.'
  },
  {
    id: 'dr-q10',
    level: 1,
    questionTypeBadge: 'Maradékosztály',
    question: 'Melyik szám 5k + 3 alakú (k természetes szám)?',
    options: ['23', '25', '24', '21'],
    correctAnswer: 0,
    explanation: '23 = 5 · 4 + 3. A 25 = 5k, a 24 = 5k + 4, a 21 = 5k + 1 alakú.'
  },

  // LEVEL 2: Alkalmazás (11–20)
  {
    id: 'dr-q11',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    question: 'Hány olyan négyjegyű szám képezhető a 2, 5, 7, 8 számjegyek mindegyikének egyszeri felhasználásával, amely osztható 2-vel?',
    figure: <CardsFig cards={['2', '5', '7', '8']} />,
    options: ['12', '6', '24', '18'],
    correctAnswer: 0,
    explanation: 'Az utolsó jegy 2 vagy 8 (2-féle), a többi három jegy sorrendje 3! = 6: 2 · 6 = 12.'
  },
  {
    id: 'dr-q12',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    question: 'A 2, 5, 7, 8 jegyekből (mindegyik egyszer) képzett négyjegyű számok közül hány osztható 9-cel?',
    figure: <CardsFig cards={['2', '5', '7', '8']} />,
    options: ['0', '6', '24', '4'],
    correctAnswer: 0,
    explanation: 'A jegyek összege mindig 2 + 5 + 7 + 8 = 22, ami nem osztható 9-cel – egyik szám sem osztható 9-cel.'
  },
  {
    id: 'dr-q13',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    question: 'A 2, 5, 7, 8 jegyekből (mindegyik egyszer) képzett négyjegyű számok közül hány osztható 25-tel?',
    options: ['4', '2', '6', '12'],
    correctAnswer: 0,
    explanation: 'Az utolsó két jegy 25 vagy 75 lehet (00 és 50 nem jöhet ki). Mindkét esetben a maradék két jegy 2-féle sorrendben áll: 2 + 2 = 4.'
  },
  {
    id: 'dr-q14',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    question: 'A 2, 5, 7, 8 jegyekből (mindegyik egyszer) képzett négyjegyű számok közül hány osztható 4-gyel?',
    options: ['6', '4', '12', '3'],
    correctAnswer: 0,
    explanation: 'A lehetséges, 4-gyel osztható végződések: 28, 52, 72 (a 58, 78, 82 nem jó). Mindegyiknél 2-féle az első két jegy sorrendje: 3 · 2 = 6.'
  },
  {
    id: 'dr-q15',
    level: 2,
    questionTypeBadge: 'Ismeretlen jegy',
    question: 'Milyen számjegy állhat Y helyén, ha az 5Y283 ötjegyű szám osztható 9-cel?',
    figure: <CardsFig cards={['5', 'Y', '2', '8', '3']} />,
    options: ['0 vagy 9', 'csak 9', 'csak 1', '0, 3, 6 vagy 9'],
    correctAnswer: 0,
    explanation: 'A jegyek összege 18 + Y, ennek 9-cel oszthatónak kell lennie: Y = 0 (18) vagy Y = 9 (27). A 0, 3, 6, 9 a 3-mal való oszthatóság feltétele lenne.'
  },
  {
    id: 'dr-q16',
    level: 2,
    questionTypeBadge: 'Naptár',
    question: 'Ha ma kedd van, milyen nap lesz 100 nap múlva?',
    figure: <WeekFig start={1} note="+100 nap" />,
    options: ['csütörtök', 'kedd', 'szerda', 'péntek'],
    correctAnswer: 0,
    explanation: '100 = 7 · 14 + 2: 14 teljes hét után ismét kedd, majd még 2 nap – csütörtök.'
  },
  {
    id: 'dr-q17',
    level: 2,
    questionTypeBadge: 'Naptár',
    question: 'Egy szökőévben január 1. szombatra esik. Milyen napra esik április 1.?',
    figure: <WeekFig start={5} note="jan. 1. → ápr. 1." />,
    options: ['szombat', 'péntek', 'vasárnap', 'hétfő'],
    correctAnswer: 0,
    explanation: 'Január 1-jétől április 1-jéig 31 + 29 + 31 = 91 nap telik el; 91 = 7 · 13, a maradék 0, így ugyanaz a nap: szombat. (Nem szökőévben 90 nap, péntek lenne.)'
  },
  {
    id: 'dr-q18',
    level: 2,
    questionTypeBadge: 'Maradékosztály',
    question: 'A 7-tel vett maradékok szerint melyik osztályba tartozik a 100?',
    figure: <Mod7Fig />,
    options: ['7k + 2', '7k + 3', '7k + 1', '7k + 5'],
    correctAnswer: 0,
    explanation: '100 = 7 · 14 + 2, tehát a 100 a 7k + 2 alakú számok (2, 9, 16, 23, …) osztályába tartozik.'
  },
  {
    id: 'dr-q19',
    level: 2,
    questionTypeBadge: 'Maradék',
    question: 'Melyik a legkisebb háromjegyű szám, amely 40-nel osztva 37 maradékot ad?',
    options: ['117', '137', '77', '157'],
    correctAnswer: 0,
    explanation: 'A szám 40k + 37 alakú: 37, 77, 117, … A legkisebb háromjegyű a 117 = 2 · 40 + 37.'
  },
  {
    id: 'dr-q20',
    level: 2,
    questionTypeBadge: 'Maradék',
    question: 'Melyik az a 30-nál nagyobb, 40-nél kisebb szám, amely 8-cal osztva 3 maradékot ad?',
    options: ['35', '33', '38', '31'],
    correctAnswer: 0,
    explanation: '35 = 4 · 8 + 3. A 33 maradéka 1, a 38-é 6, a 31-é 7.'
  },

  // LEVEL 3: Feladatok (21–30)
  {
    id: 'dr-q21',
    level: 3,
    questionTypeBadge: 'Kidolgozott feladat',
    question: 'A kiránduló csoportok létszáma 15, 13, 12, 14, 16, 19 fő. Egy csoportvezető szerint a többi csoportban összesen kétszer annyi a Gólya, mint a Végzős. Hány fős az ő csoportja?',
    figure: <GroupsFig />,
    options: ['14', '13', '16', '19'],
    correctAnswer: 0,
    explanation: 'A többi csoport létszáma 3 egység, tehát 3 többszöröse. Az összlétszám 89, 3-mal osztva 2 maradékot ad, így a kihagyott csoport maradéka is 2 kell legyen: csak a 14 ilyen.'
  },
  {
    id: 'dr-q22',
    level: 3,
    questionTypeBadge: 'Kidolgozott feladat',
    question: 'Az előző feladatban (a 14 fős csoport nélkül) hány Gólya van a többi csoportban?',
    options: ['50', '25', '45', '60'],
    correctAnswer: 0,
    explanation: '89 − 14 = 75 diák = 3 egység, 1 egység 25. A Végzősök száma 25, a Gólyáké 2 · 25 = 50.'
  },
  {
    id: 'dr-q23',
    level: 3,
    questionTypeBadge: 'Ismeretlen jegy',
    question: 'Az 1x687y hatjegyű szám osztható 8-cal. Mit tudunk x-ről és y-ról?',
    figure: <CardsFig cards={['1', 'x', '6', '8', '7', 'y']} />,
    options: ['y = 2, x bármelyik számjegy lehet', 'y = 2 vagy 6, x bármi', 'y = 6, x páros', 'y = 0 vagy 8, x bármi'],
    correctAnswer: 0,
    explanation: 'Az utolsó három jegy dönt: 87y osztható 8-cal. 872 = 8 · 109, a 876 már nem (4-gyel igen). Az x nem befolyásolja.'
  },
  {
    id: 'dr-q24',
    level: 3,
    questionTypeBadge: 'Ismeretlen jegy',
    question: 'Az 1x687y hatjegyű szám osztható 9-cel. Mit tudunk x + y értékéről?',
    options: ['x + y = 5 vagy 14', 'x + y = 9', 'x + y = 5', 'x + y = 4 vagy 13'],
    correctAnswer: 0,
    explanation: 'A jegyek összege 1 + 6 + 8 + 7 + x + y = 22 + x + y. A 9 többszörösei 22 és 40 között: 27 és 36, így x + y = 5 vagy 14.'
  },
  {
    id: 'dr-q25',
    level: 3,
    questionTypeBadge: 'Maradékosztály',
    question: 'Hány olyan négyjegyű természetes szám van, amely 6-tal osztva 5 maradékot ad?',
    options: ['1500', '1499', '1501', '1286'],
    correctAnswer: 0,
    explanation: 'A 9000 négyjegyű szám (1000-től 9999-ig) 6-os blokkokra bomlik: 9000 : 6 = 1500 blokk, mindegyikben pontosan egy 6k + 5 alakú szám van (az első 1001, az utolsó 9995).'
  },
  {
    id: 'dr-q26',
    level: 3,
    questionTypeBadge: 'Két maradék',
    question: 'Melyik a legkisebb pozitív egész, amely 6-tal osztva 1, 7-tel osztva 2 maradékot ad?',
    options: ['37', '43', '23', '13'],
    correctAnswer: 0,
    explanation: 'A 7k + 2 alakú számok: 2, 9, 16, 23, 30, 37 – ezek közül az első, amelyik 6-tal osztva 1-et ad, a 37 = 6 · 6 + 1. (A 43 7-tel osztva 1-et ad, a 23 6-tal osztva 5-öt, a 13 7-tel osztva 6-ot.)'
  },
  {
    id: 'dr-q27',
    level: 3,
    questionTypeBadge: 'Ráadás: 7',
    question: 'Háromjegyű számnál: hagyjuk el az utolsó jegyet, és a kapott kétjegyű számból vonjuk le az elhagyott jegy kétszeresét. E szabály szerint melyik szám osztható 7-tel?',
    options: ['959', '352', '410', '362'],
    correctAnswer: 0,
    explanation: '959: 95 − 2 · 9 = 77 = 7 · 11, tehát osztható. 352: 35 − 4 = 31; 410: 41 − 0 = 41; 362: 36 − 4 = 32 – ezek nem 7 többszörösei.'
  },
  {
    id: 'dr-q28',
    level: 3,
    questionTypeBadge: 'Ráadás: 11',
    question: 'Egy szám pontosan akkor osztható 11-gyel, ha számjegyeinek váltakozó előjelű összege 11 többszöröse. Melyik osztható 11-gyel?',
    options: ['5599', '5589', '3192', '2471'],
    correctAnswer: 0,
    explanation: '5599: 5 − 5 + 9 − 9 = 0, ami 11 többszöröse. 5589: 5 − 5 + 8 − 9 = −1; 3192: 3 − 1 + 9 − 2 = 9; 2471: 2 − 4 + 7 − 1 = 4.'
  },
  {
    id: 'dr-q29',
    level: 3,
    questionTypeBadge: 'Ráadás: 11',
    question: 'Melyik szám osztható 11-gyel?',
    options: ['10⁵ + 1', '10⁴ + 1', '10⁵ − 1', '10⁹ − 1'],
    correctAnswer: 0,
    explanation: '10⁵ + 1 = 100 001: 1 − 0 + 0 − 0 + 0 − 1 = 0, osztható. 10⁴ + 1 = 10 001 váltakozó összege 2; 10⁵ − 1 = 99 999 és 10⁹ − 1 váltakozó összege 9.'
  },
  {
    id: 'dr-q30',
    level: 3,
    questionTypeBadge: 'Ráadás: 11',
    question: 'Mennyi a 247 11-gyel vett osztási maradéka? (247 = 22 · 11 + (2 − 4 + 7))',
    options: ['5', '0', '4', '2'],
    correctAnswer: 0,
    explanation: '247 = 2 · 99 + 2 + 4 · 11 − 4 + 7 = 22 · 11 + 5, és 0 ≤ 5 < 11, tehát a maradék 5.'
  }
];

export const G11DivisibilityRulesQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId="g11-num-oszthatosagi-szabalyok-quiz"
      subtopicId="oszthatosagi-szabalyok-maradekok"
      title="4. Oszthatósági szabályok, osztási maradékok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: oszthatósági szabályok, ismeretlen számjegyek, maradékos osztás, maradékosztályok és naptárfeladatok."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      questions={G11_DIVISIBILITY_RULES_QUESTIONS}
      cheatSheets={[
        {
          title: 'A szám vége dönt',
          items: [
            '2 és 5: az utolsó jegy',
            '4 és 25: az utolsó két jegy',
            '8 és 125: az utolsó három jegy',
            'Ok: 10, 100, 1000 osztói'
          ]
        },
        {
          title: 'Számjegyösszeg',
          items: [
            '3: a számjegyek összege osztható 3-mal',
            '9: a számjegyek összege osztható 9-cel',
            '11 385: összeg 18 ⇒ 9 | 11 385',
            '11 (ráadás): váltakozó összeg, pl. 572: 5 − 7 + 2 = 0'
          ]
        },
        {
          title: 'Maradékos osztás',
          items: [
            'b = a · k + r, 0 ≤ r < a',
            'a-val osztva a darab maradékosztály: ak, ak + 1, …, ak + (a − 1)',
            'Naptár: a 7-es maradék, 100 = 7 · 14 + 2',
            'Kedd + 100 nap = csütörtök'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <G11DivisibilityRulesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <G11DivisibilityRulesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default G11DivisibilityRulesQuiz;
