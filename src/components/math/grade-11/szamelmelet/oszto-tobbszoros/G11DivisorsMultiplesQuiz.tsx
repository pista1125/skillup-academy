import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { G11DivisorsMultiplesMatcher } from './G11DivisorsMultiplesMatcher';
import { G11DivisorsMultiplesSorter } from './G11DivisorsMultiplesSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** 90 prímtényező-fája, egy levél helyén kérdőjel. */
const TreeFig: React.FC = () => {
  const nodes = [
    { x: 120, y: 22, v: '90' },
    { x: 70, y: 66, v: '9' },
    { x: 170, y: 66, v: '10' },
    { x: 45, y: 112, v: '3', p: true },
    { x: 95, y: 112, v: '3', p: true },
    { x: 145, y: 112, v: '2', p: true },
    { x: 195, y: 112, v: '?', p: true }
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
  return (
    <svg viewBox="0 0 240 140" className={FIG_CLASS}>
      {edges.map(([a, b]) => (
        <line key={`${a}${b}`} x1={nodes[a].x} y1={nodes[a].y + 10} x2={nodes[b].x} y2={nodes[b].y - 12} stroke="#64748b" strokeWidth="1.5" />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="14" fill={n.p ? '#d1fae5' : '#ffffff'} stroke={n.p ? '#059669' : '#334155'} strokeWidth="1.8" />
          <text x={n.x} y={n.y + 4} fontSize="12" textAnchor="middle" fontWeight="bold" fill={n.v === '?' ? '#dc2626' : '#0f172a'}>{n.v}</text>
        </g>
      ))}
    </svg>
  );
};

/** 525 osztólétrája, egy osztó helyén kérdőjel. */
const LadderFig: React.FC = () => {
  const rows = [['525', '3'], ['175', '5'], ['35', '?'], ['7', '7'], ['1', '']];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="125" y1="8" x2="125" y2="142" stroke="#059669" strokeWidth="2.5" />
      {rows.map(([n, p], i) => (
        <g key={i}>
          <text x="115" y={30 + i * 27} fontSize="15" textAnchor="end" fontWeight="bold" fill="#0f172a">{n}</text>
          <text x="137" y={30 + i * 27} fontSize="15" fontWeight="bold" fill={p === '?' ? '#dc2626' : '#059669'}>{p}</text>
        </g>
      ))}
    </svg>
  );
};

/** A 60 osztópárjai, egy tag hiányzik. */
const PairsFig: React.FC = () => {
  const pairs = [['1', '60'], ['2', '30'], ['3', '20'], ['4', '15'], ['5', '?'], ['6', '10']];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <text x="120" y="16" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#334155">a · b = 60</text>
      {pairs.map(([a, b], i) => {
        const xa = 22 + i * 18;
        const xb = 218 - i * 18;
        const r = (xb - xa) / 2;
        return (
          <g key={a}>
            <path d={`M ${xa} 118 A ${r} ${r * 0.9} 0 0 1 ${xb} 118`} fill="none" stroke="#10b981" strokeWidth="1.5" />
            <text x={xa} y="136" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0f172a">{a}</text>
            <text x={xb} y="136" fontSize="11" textAnchor="middle" fontWeight="bold" fill={b === '?' ? '#dc2626' : '#0f172a'}>{b}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** 211 próbaosztásai. */
const PrimeCheckFig: React.FC = () => (
  <svg viewBox="0 0 240 110" className={FIG_CLASS}>
    {[2, 3, 5, 7, 11, 13, 17].map((p, i) => (
      <g key={p}>
        <rect x={8 + i * 33} y="20" width="28" height="28" rx="6" fill="#ecfdf5" stroke="#059669" />
        <text x={22 + i * 33} y="39" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">{p}</text>
      </g>
    ))}
    <text x="120" y="72" fontSize="12" textAnchor="middle" fill="#0f172a">211 : p → van-e 0 maradék?</text>
    <text x="120" y="96" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#dc2626">meddig kell próbálni? ?</text>
  </svg>
);

/** Eratoszthenész szitája 1–30, a 2 és 3 többszörösei kihúzva. */
const SieveFig: React.FC = () => (
  <svg viewBox="0 0 240 140" className={FIG_CLASS}>
    {Array.from({ length: 30 }, (_, i) => {
      const k = i + 1;
      const x = 10 + (i % 10) * 22;
      const y = 10 + Math.floor(i / 10) * 30;
      const crossed = k === 1 || (k > 2 && k % 2 === 0) || (k > 3 && k % 3 === 0);
      return (
        <g key={k}>
          <rect x={x} y={y} width="20" height="24" rx="3" fill={crossed ? '#f1f5f9' : '#ffffff'} stroke="#cbd5e1" />
          <text x={x + 10} y={y + 16} fontSize="10" textAnchor="middle" fill={crossed ? '#94a3b8' : '#0f172a'} fontWeight="bold">{k}</text>
          {crossed && <line x1={x + 3} y1={y + 20} x2={x + 17} y2={y + 4} stroke="#dc2626" strokeWidth="1.2" />}
        </g>
      );
    })}
    <text x="120" y="126" fontSize="11" textAnchor="middle" fill="#334155">a 2 és a 3 többszörösei már kihúzva</text>
  </svg>
);

const G11_DIVISORS_MULTIPLES_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Fogalmak (1–10)
  {
    id: 'dm-q1',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Mit jelent az a | b jelölés (a, b pozitív egészek)?',
    options: [
      'Van olyan c pozitív egész, amelyre a · c = b',
      'Van olyan c pozitív egész, amelyre b · c = a',
      'Az a és b hányadosa nem egész szám',
      'Az a nagyobb, mint b'
    ],
    correctAnswer: 0,
    explanation: 'a | b: b osztható a-val, vagyis van olyan c pozitív egész, amellyel a-t megszorozva b-t kapjuk. Ekkor a osztója b-nek, b többszöröse a-nak.'
  },
  {
    id: 'dm-q2',
    level: 1,
    questionTypeBadge: 'Oszthatóság',
    question: 'Melyik állítás igaz?',
    options: ['27 | 81', '81 | 27', '13 | 20', '6 | 15'],
    correctAnswer: 0,
    explanation: '27 · 3 = 81, ezért 27 | 81. A 81 nem osztója a 27-nek (kisebb szám nem lehet nagyobbnak többszöröse), 13 ∤ 20, 6 ∤ 15.'
  },
  {
    id: 'dm-q3',
    level: 1,
    questionTypeBadge: 'Osztók',
    question: 'Melyik felsorolás tartalmazza a 81 összes pozitív osztóját?',
    options: ['1; 3; 9; 27; 81', '1; 3; 9; 27', '3; 9; 27', '1; 3; 9; 27; 54; 81'],
    correctAnswer: 0,
    explanation: '81 = 3⁴, osztói 3⁰, 3¹, 3², 3³, 3⁴: 1; 3; 9; 27; 81. Az 1 és maga a szám is osztó; az 54 nem osztója a 81-nek.'
  },
  {
    id: 'dm-q4',
    level: 1,
    questionTypeBadge: 'Osztók száma',
    question: 'Hány pozitív osztója van a 20-nak?',
    options: ['6', '4', '5', '8'],
    correctAnswer: 0,
    explanation: 'Osztópárok: 1 · 20, 2 · 10, 4 · 5 – összesen 6 osztó: 1, 2, 4, 5, 10, 20.'
  },
  {
    id: 'dm-q5',
    level: 1,
    questionTypeBadge: 'Prímszám',
    question: 'Melyik szám prím?',
    options: ['37', '51', '91', '57'],
    correctAnswer: 0,
    explanation: '51 = 3 · 17, 91 = 7 · 13, 57 = 3 · 19 összetett. A 37-nek csak az 1 és a 37 az osztója.'
  },
  {
    id: 'dm-q6',
    level: 1,
    questionTypeBadge: 'Az 1',
    question: 'Milyen szám az 1?',
    options: ['Sem nem prím, sem nem összetett', 'Prímszám', 'Összetett szám', 'Prím és összetett is'],
    correctAnswer: 0,
    explanation: 'A prímnek pontosan két, az összetett számnak kettőnél több pozitív osztója van. Az 1-nek egyetlen osztója van, ezért egyik csoportba sem tartozik.'
  },
  {
    id: 'dm-q7',
    level: 1,
    questionTypeBadge: 'Prímszám',
    question: 'Hány páros prímszám van?',
    options: ['Egy, a 2', 'Nincs ilyen', 'Kettő: a 2 és a 4', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'Minden 2-nél nagyobb páros szám osztható 1-gyel, 2-vel és önmagával is, így legalább 3 osztója van. Az egyetlen páros prím a 2.'
  },
  {
    id: 'dm-q8',
    level: 1,
    questionTypeBadge: 'Valódi osztó',
    question: 'Melyek a 20 valódi osztói?',
    options: ['2; 4; 5; 10', '1; 2; 4; 5; 10; 20', '1; 20', '2; 4; 5'],
    correctAnswer: 0,
    explanation: 'A nem valódi osztók az 1 és maga a szám. A 20 többi pozitív osztója a valódi osztó: 2; 4; 5; 10.'
  },
  {
    id: 'dm-q9',
    level: 1,
    questionTypeBadge: 'Prímtényező-fa',
    question: 'A 90 prímtényező-fáján melyik szám kerül a ? helyére?',
    figure: <TreeFig />,
    options: ['5', '10', '3', '8'],
    correctAnswer: 0,
    explanation: 'A 10-et bontjuk tovább: 10 = 2 · 5, így a ? helyén az 5 áll. 90 = 2 · 3² · 5.'
  },
  {
    id: 'dm-q10',
    level: 1,
    questionTypeBadge: 'Szöveges',
    question: '81 takarót egyenlően osztanak szét menedékhelyek között. Hányféle lehet a menedékhelyek száma?',
    options: ['5', '4', '3', '6'],
    correctAnswer: 0,
    explanation: 'A menedékhelyek száma a 81 osztója: 1; 3; 9; 27; 81 – ez 5 lehetőség.'
  },

  // LEVEL 2: Prímtényezős felbontás, osztópárok (11–20)
  {
    id: 'dm-q11',
    level: 2,
    questionTypeBadge: 'Prímtényezős alak',
    question: 'Mi a 700 prímtényezős felbontása?',
    options: ['2² · 5² · 7', '2² · 5 · 7²', '2 · 5² · 14', '2³ · 5² · 7'],
    correctAnswer: 0,
    explanation: '700 = 7 · 100 = 7 · 2² · 5². (2² · 5 · 7² = 980; a 14 nem prím; 2³ · 5² · 7 = 1400.)'
  },
  {
    id: 'dm-q12',
    level: 2,
    questionTypeBadge: 'Prímtényezős alak',
    question: 'Mi a 990 prímtényezős felbontása?',
    options: ['2 · 3² · 5 · 11', '2 · 3 · 5 · 33', '2² · 3² · 5 · 11', '2 · 3² · 5² · 11'],
    correctAnswer: 0,
    explanation: '990 = 10 · 99 = 2 · 5 · 3² · 11. A 33 nem prím; 2² · 3² · 5 · 11 = 1980; 2 · 3² · 5² · 11 = 4950.'
  },
  {
    id: 'dm-q13',
    level: 2,
    questionTypeBadge: 'Egyszerűsítés',
    question: 'Egyszerűsítsd a 630/525 törtet prímtényezős felbontással!',
    options: ['6/5', '2/5', '6/7', '9/7'],
    correctAnswer: 0,
    explanation: '630 = 2 · 3² · 5 · 7, 525 = 3 · 5² · 7. A közös 3 · 5 · 7 = 105-tel egyszerűsítve: (2 · 3) / 5 = 6/5.'
  },
  {
    id: 'dm-q14',
    level: 2,
    questionTypeBadge: 'Osztólétra',
    question: 'Az 525 osztólétrájában melyik prím kerül a ? helyére?',
    figure: <LadderFig />,
    options: ['5', '7', '3', '25'],
    correctAnswer: 0,
    explanation: 'A létrán mindig a legkisebb prímosztóval osztunk: 35 = 5 · 7, így a ? helyén 5 áll (35 : 5 = 7). 525 = 3 · 5² · 7.'
  },
  {
    id: 'dm-q15',
    level: 2,
    questionTypeBadge: 'Osztók száma',
    question: 'Hány pozitív osztója van a 196-nak?',
    options: ['9', '8', '6', '10'],
    correctAnswer: 0,
    explanation: '196 = 2² · 7², osztóinak száma (2 + 1)(2 + 1) = 9: 1, 2, 4, 7, 14, 28, 49, 98, 196. Páratlan, mert 196 = 14² négyzetszám.'
  },
  {
    id: 'dm-q16',
    level: 2,
    questionTypeBadge: 'Négyzetszám',
    question: 'Melyik számnak van páratlan számú pozitív osztója?',
    options: ['144', '72', '200', '98'],
    correctAnswer: 0,
    explanation: 'Páratlan sok osztója csak négyzetszámnak van (egy osztó önmaga párja). 144 = 12² (15 osztó); 72-nek 12, 200-nak 12, 98-nak 6 osztója van.'
  },
  {
    id: 'dm-q17',
    level: 2,
    questionTypeBadge: 'Prímteszt',
    question: 'Annak eldöntéséhez, hogy a 211 prím-e, mely prímekkel elég próbaosztást végezni?',
    figure: <PrimeCheckFig />,
    options: ['2, 3, 5, 7, 11, 13', '2, 3, 5, 7', '2-től 105-ig minden prímmel', '2-től 211-ig minden prímmel'],
    correctAnswer: 0,
    explanation: '√211 ≈ 14,5. Ha volna valódi osztópár, egyik tagja 14,5-nél kisebb lenne – elég a 13-ig terjedő prímeket kipróbálni. Egyik sem osztó, így a 211 prím.'
  },
  {
    id: 'dm-q18',
    level: 2,
    questionTypeBadge: 'Prímszám',
    question: 'Prímszám-e a 143?',
    options: ['Nem, 143 = 11 · 13', 'Igen, prím', 'Nem, 143 = 7 · 21', 'Nem, 143 = 3 · 47'],
    correctAnswer: 0,
    explanation: '143 = 11 · 13, tehát összetett (osztói: 1, 11, 13, 143). 7 · 21 = 147, 3 · 47 = 141.'
  },
  {
    id: 'dm-q19',
    level: 2,
    questionTypeBadge: 'Osztópár',
    question: 'A 60 osztópárjait ívekkel kötöttük össze. Melyik szám hiányzik az 5 párjaként?',
    figure: <PairsFig />,
    options: ['12', '15', '10', '55'],
    correctAnswer: 0,
    explanation: 'Az osztópár két tagjának szorzata 60: 5 · 12 = 60, így a hiányzó szám 12.'
  },
  {
    id: 'dm-q20',
    level: 2,
    questionTypeBadge: 'A 0 oszthatósága',
    question: 'Melyik állítás igaz, ha az oszthatóságot a természetes számokra (a 0-ra is) kiterjesztjük?',
    options: [
      'A 0-nak minden természetes szám osztója',
      'A 0-nak nincs osztója',
      'A 0 csak az 1-gyel osztható',
      'A 0 egyetlen számnak sem többszöröse'
    ],
    correctAnswer: 0,
    explanation: 'Bármely a esetén a · 0 = 0, így a | 0: a 0 minden természetes szám többszöröse, végtelen sok osztója van. Az oszthatóság reláció – nem azonos a 0-val való osztással.'
  },

  // LEVEL 3: Alkalmazások (21–30)
  {
    id: 'dm-q21',
    level: 3,
    questionTypeBadge: 'Osztók száma',
    question: 'Hány pozitív osztója van a 450-nek?',
    options: ['18', '12', '24', '16'],
    correctAnswer: 0,
    explanation: '450 = 2 · 3² · 5², minden osztóban a 2 kitevője 0 vagy 1, a 3-é és az 5-é 0, 1 vagy 2: (1 + 1)(2 + 1)(2 + 1) = 18.'
  },
  {
    id: 'dm-q22',
    level: 3,
    questionTypeBadge: 'Osztók száma',
    question: 'Hány pozitív osztója van az 1485-nek?',
    options: ['16', '12', '18', '20'],
    correctAnswer: 0,
    explanation: '1485 = 3³ · 5 · 11, osztóinak száma (3 + 1)(1 + 1)(1 + 1) = 16.'
  },
  {
    id: 'dm-q23',
    level: 3,
    questionTypeBadge: 'Egyszerűsítés',
    question: 'Egyszerűsítsd a 483/1827 törtet!',
    options: ['23/87', '23/29', '7/29', '1/3'],
    correctAnswer: 0,
    explanation: '483 = 3 · 7 · 23, 1827 = 3² · 7 · 29. A közös 3 · 7 = 21-gyel egyszerűsítve 23 / (3 · 29) = 23/87.'
  },
  {
    id: 'dm-q24',
    level: 3,
    questionTypeBadge: 'Ismeretlen prím',
    question: 'p a szorzat többi tényezőjétől különböző prímszám. Melyik állítás igaz?',
    options: [
      '2 · p · 5 · 7 biztosan 0-ra végződik',
      '3² · 5 · p biztosan páratlan',
      'p² · 5 · 3 lehet négyzetszám',
      '2³ · 5 · 11 · p lehet 32 többszöröse'
    ],
    correctAnswer: 0,
    explanation: '2 · 5 = 10 tényező, ezért 0-ra végződik. 3² · 5 · p páros, ha p = 2; p² · 15-ben a 3 és az 5 kitevője páratlan; 32 = 2⁵, de p ≠ 2, így csak 2³ van benne.'
  },
  {
    id: 'dm-q25',
    level: 3,
    questionTypeBadge: 'Ismeretlen prím',
    question: 'p a 2-től és a 7-től különböző prím. Mennyi a 2 · p · 7 szorzat legkisebb lehetséges értéke?',
    options: ['42', '28', '70', '98'],
    correctAnswer: 0,
    explanation: 'p nem lehet 2 és 7, a legkisebb lehetséges p = 3: 2 · 3 · 7 = 42. (28 a p = 2, 98 a p = 7 esete lenne.)'
  },
  {
    id: 'dm-q26',
    level: 3,
    questionTypeBadge: 'Szöveges',
    question: 'Csilla 180 cm hosszú, 1 cm széles szalagot egyforma, egész cm hosszú darabokra vág (a fel nem darabolás is számít). Hány lehetősége van?',
    options: ['18', '16', '9', '12'],
    correctAnswer: 0,
    explanation: 'A darab hossza a 180 osztója. 180 = 2² · 3² · 5, osztóinak száma 3 · 3 · 2 = 18.'
  },
  {
    id: 'dm-q27',
    level: 3,
    questionTypeBadge: 'Prímtényezős alak',
    question: 'Mi a 315 000 prímtényezős felbontása?',
    options: ['2³ · 3² · 5⁴ · 7', '2³ · 3² · 5³ · 7', '2⁴ · 3² · 5⁴ · 7', '2³ · 3 · 5⁴ · 7'],
    correctAnswer: 0,
    explanation: '315 000 = 315 · 1000 = (3² · 5 · 7) · (2³ · 5³) = 2³ · 3² · 5⁴ · 7. A többi: 63 000, 630 000, 105 000.'
  },
  {
    id: 'dm-q28',
    level: 3,
    questionTypeBadge: 'Osztók száma',
    question: 'Melyik a legkisebb pozitív egész, amelynek pontosan 6 pozitív osztója van?',
    options: ['12', '18', '32', '20'],
    correctAnswer: 0,
    explanation: '6 = 6 · 1 = 3 · 2, így p⁵ vagy p² · q alakú szám. A legkisebb: 2² · 3 = 12 (osztói 1, 2, 3, 4, 6, 12). 18, 20 és 32 is jó, de nagyobb.'
  },
  {
    id: 'dm-q29',
    level: 3,
    questionTypeBadge: 'Eratoszthenész',
    question: 'Eratoszthenész szitájával a 100-ig terjedő prímeket keressük. Melyik a legnagyobb prím, amelynek többszöröseit még ki kell húzni?',
    figure: <SieveFig />,
    options: ['7', '11', '5', '13'],
    correctAnswer: 0,
    explanation: '√100 = 10, így a 10-nél nem nagyobb prímek (2, 3, 5, 7) többszöröseit kell kihúzni. A 11 első „új” többszöröse 121 > 100 lenne.'
  },
  {
    id: 'dm-q30',
    level: 3,
    questionTypeBadge: 'Egyszerűsítés',
    question: 'Egyszerűsítsd a 4851/594 törtet!',
    options: ['49/6', '49/3', '49/18', '7/6'],
    correctAnswer: 0,
    explanation: '4851 = 3² · 7² · 11, 594 = 2 · 3³ · 11. A közös 3² · 11 = 99-cel egyszerűsítve 7² / (2 · 3) = 49/6.'
  }
];

export const G11DivisorsMultiplesQuiz: React.FC<{
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
      topicId="g11-num-oszto-tobbszoros-quiz"
      subtopicId="oszto-tobbszoros"
      title="2. Osztó, többszörös – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: oszthatóság, prímek, osztópárok, prímtényezős felbontás és osztók száma."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      questions={G11_DIVISORS_MULTIPLES_QUESTIONS}
      cheatSheets={[
        {
          title: 'Fogalmak',
          items: [
            'a | b: van olyan c pozitív egész, hogy a · c = b',
            'Prím: pontosan 2 pozitív osztó; összetett: 2-nél több',
            'Az 1 sem prím, sem összetett; az egyetlen páros prím a 2',
            'Nem valódi osztók: 1 és maga a szám'
          ]
        },
        {
          title: 'Prímtényezős felbontás',
          items: [
            'Egyértelmű a tényezők sorrendjétől eltekintve',
            'Osztólétra: mindig a legkisebb prímosztóval osztunk',
            '630 = 2 · 3² · 5 · 7, 525 = 3 · 5² · 7 ⇒ 630/525 = 6/5',
            'Osztók száma: (a + 1)(b + 1)… a kitevőkből'
          ]
        },
        {
          title: 'Osztópárok, prímteszt',
          items: [
            'Osztópár: a · b = n, az egyik ≤ √n ≤ a másik',
            'Páratlan sok osztó ⟺ négyzetszám (81, 196)',
            'Prímteszt: elég √n-ig próbálni (211: 13-ig)',
            'Eratoszthenész szitája 100-ig: 2, 3, 5, 7 többszörösei'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <G11DivisorsMultiplesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <G11DivisorsMultiplesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default G11DivisorsMultiplesQuiz;
