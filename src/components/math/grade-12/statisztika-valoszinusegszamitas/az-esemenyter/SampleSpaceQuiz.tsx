import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SampleSpaceMatcher } from './SampleSpaceMatcher';
import { SampleSpaceSorter } from './SampleSpaceSorter';
import { QFig, T, Coin, Venn2, DiceGrid, BarT, F_BLUE, F_AMBER, C_BLUE, C_RED, C_EDGE, bar } from './probKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const gridFig = (hl: (w: number, b: number) => boolean) => (
  <QFig w={240} h={170}>
    <DiceGrid x={80} y={34} cell={21} fs={7} hl={(w, b) => (hl(w, b) ? F_BLUE : undefined)} />
  </QFig>
);

const FIG_COINS_Q = (
  <QFig w={240} h={110}>
    <Coin x={60} y={50} r={22} face="?" label="10 Ft" />
    <Coin x={120} y={50} r={22} face="?" label="20 Ft" />
    <Coin x={180} y={50} r={22} face="?" label="50 Ft" />
    <T x={120} y={100} t="mindegyik: F vagy I" s={10} c="#475569" />
  </QFig>
);

const FIG_FIF = (
  <QFig w={240} h={110}>
    <Coin x={60} y={50} r={22} face="F" label="10 Ft" />
    <Coin x={120} y={50} r={22} face="I" label="20 Ft" />
    <Coin x={180} y={50} r={22} face="F" label="50 Ft" />
    <T x={120} y={100} t="F = fej, I = írás" s={10} c="#475569" />
  </QFig>
);

const FIG_DIE_VENN = (
  <QFig w={240} h={160}>
    <Venn2
      x={10}
      y={10}
      w={220}
      h={140}
      r={44}
      noB
      shade={{ aOnly: F_BLUE }}
      items={[
        { x: 105, y: 72, t: '2', s: 13 },
        { x: 132, y: 92, t: '4', s: 13 },
        { x: 104, y: 112, t: '6', s: 13 },
        { x: 34, y: 60, t: '1', s: 13 },
        { x: 196, y: 52, t: '3', s: 13 },
        { x: 200, y: 128, t: '5', s: 13 }
      ]}
    />
  </QFig>
);

const FIG_H20 = (
  <QFig w={240} h={160}>
    <Venn2 x={10} y={10} w={220} h={140} r={46} noB shade={{ out: F_AMBER, aOnly: F_BLUE }} labelH="H: 20 elemi esemény" />
    <T x={120} y={86} t="8" s={16} b c={C_BLUE} />
    <BarT x={200} y={124} t="A" s={13} c="#92400e" />
    <T x={214} y={124} t=": ?" s={12} b c="#92400e" a="start" />
  </QFig>
);

const FIG_LANG = (
  <QFig w={240} h={160}>
    <Venn2 x={10} y={10} w={220} h={140} r={48} gap={60} labelA="olasz: 13" labelB="spanyol: 10" labelH="16 diák" />
    <T x={120} y={86} t="7" s={15} b c={C_EDGE} />
    <T x={75} y={86} t="?" s={14} b c={C_BLUE} />
    <T x={165} y={86} t="?" s={14} b c={C_RED} />
  </QFig>
);

const FIG_STARTERS = (() => {
  const nm = ['A', 'B', 'C', 'D'];
  return (
    <QFig w={240} h={160}>
      <T x={150} y={14} t="2. játék" s={10} c="#475569" />
      <T x={30} y={24} t="1. játék" s={10} c="#475569" />
      {nm.map((n, i) => (
        <g key={n}>
          <T x={102 + i * 30 + 15} y={30} t={n} s={11} b />
          <T x={88} y={40 + i * 28 + 14} t={n} s={11} b />
          {nm.map((m, j) => (
            <g key={m}>
              <rect x={102 + j * 30} y={40 + i * 28} width={30} height={28} fill="#ffffff" stroke="#94a3b8" />
              <T x={102 + j * 30 + 15} y={40 + i * 28 + 14} t={i === 0 && j < 2 ? n + m : '?'} s={10} c={C_EDGE} />
            </g>
          ))}
        </g>
      ))}
    </QFig>
  );
})();

const A_ = bar('A');
const C_ = bar('C');

const SAMPLE_SPACE_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'ss-q1',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Mit nevezünk eseménytérnek?',
    options: ['az elemi események halmazát', 'a kísérlet egyetlen kimenetelét', 'az eseménytér egy részhalmazát', 'a biztos és a lehetetlen esemény párját'],
    correctAnswer: 0,
    explanation: 'Az eseménytér (H) a véletlen kísérlet összes lehetséges kimenetelének, azaz az elemi eseményeknek a halmaza.'
  },
  {
    id: 'ss-q2',
    questionTypeBadge: 'Elemi események',
    level: 1,
    question: 'Egy szabályos dobókockával egyszer dobunk. Hány elemből áll az eseménytér?',
    options: ['6', '5', '12', '36'],
    correctAnswer: 0,
    explanation: 'A lehetséges kimenetelek: 1, 2, 3, 4, 5, 6 – ez 6 elemi esemény.'
  },
  {
    id: 'ss-q3',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Mi az esemény a valószínűségszámításban?',
    options: ['az eseménytér egy részhalmaza', 'mindig egyetlen elemi esemény', 'az eseménytér komplementere', 'csak olyan kimenetel, amely biztosan bekövetkezik'],
    correctAnswer: 0,
    explanation: 'Az esemény az eseménytér részhalmaza; állhat egy, több, az összes vagy egyetlen elemi eseményből sem (lehetetlen esemény).'
  },
  {
    id: 'ss-q4',
    questionTypeBadge: 'Három pénzérme',
    figure: FIG_COINS_Q,
    level: 1,
    question: 'Feldobunk egy 10, egy 20 és egy 50 forintost, és feljegyezzük, hogy fej vagy írás látható. Hány elemi esemény van?',
    options: ['8', '6', '3', '9'],
    correctAnswer: 0,
    explanation: 'Mindhárom érme kétféleképpen eshet le: 2 · 2 · 2 = 2³ = 8 (FFF, FFI, FIF, FII, IFF, IFI, IIF, III).'
  },
  {
    id: 'ss-q5',
    questionTypeBadge: 'Lehetetlen esemény',
    level: 1,
    question: 'Egy dobókockával dobunk. Milyen esemény az, hogy „7-est dobunk”?',
    options: ['lehetetlen esemény', 'biztos esemény', 'elemi esemény', 'az eseménytér'],
    correctAnswer: 0,
    explanation: 'A kockán nincs 7-es, ez az esemény nem következhet be: lehetetlen esemény (egyetlen elemi esemény sem tartozik hozzá).'
  },
  {
    id: 'ss-q6',
    questionTypeBadge: 'Biztos esemény',
    level: 1,
    question: 'Egy dobókockával dobunk. Melyik biztos esemény?',
    options: ['6-nál nem nagyobb számot dobunk', 'páros számot dobunk', '1-nél nagyobb számot dobunk', 'prímszámot dobunk'],
    correctAnswer: 0,
    explanation: 'Minden lehetséges dobás (1–6) legfeljebb 6, ezért ez biztosan bekövetkezik. A többi csak néha következik be.'
  },
  {
    id: 'ss-q7',
    questionTypeBadge: 'Komplementer',
    figure: FIG_DIE_VENN,
    level: 1,
    question: `Kockadobásnál A: páros számot dobunk (az ábrán A = {2; 4; 6}). Melyik esemény az ${A_}?`,
    options: ['páratlan számot dobunk', '6-ost dobunk', 'nem 2-est dobunk', 'legalább 2-t dobunk'],
    correctAnswer: 0,
    explanation: `${A_} pontosan akkor következik be, ha A nem: ${A_} = {1; 3; 5}, vagyis páratlan számot dobunk.`
  },
  {
    id: 'ss-q8',
    questionTypeBadge: 'Két dobókocka',
    level: 1,
    question: 'Egy fehér és egy fekete dobókockával dobunk. Hány elemi esemény van?',
    options: ['36', '21', '12', '30'],
    correctAnswer: 0,
    explanation: 'A fehér kocka 6-féle, a fekete is 6-féle értéket mutathat: 6 · 6 = 36. (A kockák megkülönböztethetők, ezért (2;5) és (5;2) különböző.)'
  },
  {
    id: 'ss-q9',
    questionTypeBadge: 'Kizáró események',
    level: 1,
    question: 'Kockadobásnál A: páros számot dobunk, B: 5-öst dobunk. Melyik állítás igaz?',
    options: ['A és B kizárják egymást, de nem komplementerek', 'A és B komplementer események', 'A és B bekövetkezhetnek egyszerre', 'B része az A eseménynek'],
    correctAnswer: 0,
    explanation: 'Az 5 páratlan, így A és B nem következhet be egyszerre (kizárók). Komplementerek nem, mert pl. a 3-as dobásnál egyik sem következik be.'
  },
  {
    id: 'ss-q10',
    questionTypeBadge: 'Elemi esemény',
    figure: FIG_FIF,
    level: 1,
    question: 'A 10, 20, 50 forintos sorrendben feljegyezve melyik leírás tartozik az ábrán látható dobáshoz?',
    options: ['FIF', 'IFI', 'FFI', 'FII'],
    correctAnswer: 0,
    explanation: 'A 10 Ft-oson fej (F), a 20 Ft-oson írás (I), az 50 Ft-oson fej (F): FIF.'
  },
  // ---------------------------- 2. szint ----------------------------
  {
    id: 'ss-q11',
    questionTypeBadge: 'Három pénzérme',
    level: 2,
    question: 'Három különböző pénzérmét feldobunk. Hány elemi esemény esetén dobunk pontosan két fejet?',
    options: ['3', '4', '2', '6'],
    correctAnswer: 0,
    explanation: 'Pontosan két fej: FFI, FIF, IFF – 3 elemi esemény.'
  },
  {
    id: 'ss-q12',
    questionTypeBadge: 'Táblázat olvasása',
    figure: gridFig((w, b) => w + b === 8),
    level: 2,
    question: 'A 6 × 6-os táblázatban (sor: fehér, oszlop: fekete kocka) kiszíneztük egy esemény elemi eseményeit. Melyik ez az esemény?',
    options: ['A dobások összege 8.', 'A dobások összege 7.', 'A dobások különbsége 2.', 'A dobások szorzata 16.'],
    correctAnswer: 0,
    explanation: 'A színezett mezők: (2;6), (3;5), (4;4), (5;3), (6;2) – mindegyik összege 8.'
  },
  {
    id: 'ss-q13',
    questionTypeBadge: 'Két dobókocka',
    level: 2,
    question: 'Fehér és fekete kockával dobunk. Hány elemi eseményből áll az, hogy pontosan az egyik dobás hatos?',
    options: ['10', '11', '12', '5'],
    correctAnswer: 0,
    explanation: 'Csak a fehér hatos: 5 eset (a fekete 1–5), csak a fekete hatos: 5 eset. Összesen 10.'
  },
  {
    id: 'ss-q14',
    questionTypeBadge: 'Táblázat olvasása',
    figure: gridFig((w, b) => w === b),
    level: 2,
    question: 'Melyik esemény elemi eseményeit színeztük ki a két kocka táblázatában?',
    options: ['A két dobás egyenlő.', 'A dobások összege páros.', 'A dobások összege 7.', 'A dobások szorzata négyzetszám.'],
    correctAnswer: 0,
    explanation: 'A színezett mezők az átló: (1;1), (2;2), …, (6;6) – a két dobás egyenlő. (Az összeg páros 18, a négyzetszám szorzat 8 esetben teljesül, pl. (1;4) is.)'
  },
  {
    id: 'ss-q15',
    questionTypeBadge: 'Két dobókocka',
    level: 2,
    question: 'Két dobókockával dobunk. Hány elemi eseményből áll az, hogy van hatos dobás?',
    options: ['11', '12', '10', '6'],
    correctAnswer: 0,
    explanation: 'A fehér hatos: 6 eset, a fekete hatos: 6 eset, de a (6;6)-ot kétszer számoltuk: 6 + 6 − 1 = 11.'
  },
  {
    id: 'ss-q16',
    questionTypeBadge: 'Biztos esemény',
    level: 2,
    question: 'Két dobókockával dobunk. Melyik biztos esemény?',
    options: ['A dobások összege kisebb, mint 13.', 'A dobások összege legalább 3.', 'A dobások szorzata páros.', 'Van hatos dobás.'],
    correctAnswer: 0,
    explanation: 'Az összeg legfeljebb 6 + 6 = 12, így mindig kisebb 13-nál. Az „összeg legalább 3” nem biztos: (1;1) esetén 2.'
  },
  {
    id: 'ss-q17',
    questionTypeBadge: 'Eseménytér mérete',
    figure: FIG_STARTERS,
    level: 2,
    question: 'Anna, Bea, Csaba és Dénes két játékot játszik; mindkettő kezdőjét egy alkalmazás sorsolja (ugyanaz is kezdheti mindkettőt). Hány elemi esemény van?',
    options: ['16', '12', '8', '6'],
    correctAnswer: 0,
    explanation: 'Az első játék kezdője 4-féle, a másodiké is 4-féle lehet: 4 · 4 = 16 (a táblázat 16 mezője).'
  },
  {
    id: 'ss-q18',
    questionTypeBadge: 'Komplementer',
    level: 2,
    question: `Két kockával dobunk, C: van hatos dobás. Mit jelent a ${C_} esemény?`,
    options: ['Egyik dobás sem hatos.', 'Mindkét dobás hatos.', 'Pontosan az egyik dobás hatos.', 'Van olyan dobás, amelyik nem hatos.'],
    correctAnswer: 0,
    explanation: `${C_} pontosan akkor következik be, ha C nem: nincs hatos, azaz egyik dobás sem hatos (25 elemi esemény; 11 + 25 = 36).`
  },
  {
    id: 'ss-q19',
    questionTypeBadge: 'Esemény felsorolása',
    level: 2,
    question: 'Három érmét dobunk (10, 20, 50 Ft sorrendben). Melyik halmaz az „a 10 Ft-ossal fejet dobunk” esemény?',
    options: ['{FFF, FFI, FIF, FII}', '{FFF, FFI, IFF, IFI}', '{FFF, FIF, IFF, IIF}', '{FFI, FIF, FII}'],
    correctAnswer: 0,
    explanation: 'Az első betű (a 10 Ft-os) F: FFF, FFI, FIF, FII.'
  },
  {
    id: 'ss-q20',
    questionTypeBadge: 'Komplementer',
    figure: FIG_H20,
    level: 2,
    question: `Egy eseménytér 20 elemi eseményből áll, az A esemény 8 elemi eseményből. Hány elemi esemény tartozik az ${A_} eseményhez?`,
    options: ['12', '8', '28', '20'],
    correctAnswer: 0,
    explanation: `${A_} az A-hoz nem tartozó elemi eseményekből áll, így elemszáma 20 − 8 = 12.`
  },
  // ---------------------------- 3. szint ----------------------------
  {
    id: 'ss-q21',
    questionTypeBadge: 'Két dobókocka',
    level: 3,
    question: 'Két dobókockával dobunk. Hány elemi esemény esetén prím a dobások szorzata?',
    options: ['6', '3', '8', '12'],
    correctAnswer: 0,
    explanation: 'A szorzat csak akkor prím, ha az egyik tényező 1, a másik prím (2, 3 vagy 5): (1;2), (1;3), (1;5), (2;1), (3;1), (5;1) – 6 eset.'
  },
  {
    id: 'ss-q22',
    questionTypeBadge: 'Két dobókocka',
    level: 3,
    question: 'Két dobókockával dobunk. Hány elemi esemény esetén köbszám a dobások összege?',
    options: ['5', '6', '1', '0'],
    correctAnswer: 0,
    explanation: 'Az összeg 2 és 12 között van, ebben a tartományban csak a 8 köbszám: (2;6), (3;5), (4;4), (5;3), (6;2) – 5 eset.'
  },
  {
    id: 'ss-q23',
    questionTypeBadge: 'Lehetetlen esemény',
    figure: FIG_LANG,
    level: 3,
    question: 'Egy foglalkozáson 13 diák tanul olaszt, 10 spanyolt, 7 mindkettőt (mindenki legalább az egyiket). Kiválasztunk 4 diákot. Melyik lehetetlen esemény?',
    options: ['Mind a négyen tanulnak spanyolt, de olaszt nem.', 'Mind a négyen tanulnak olaszt.', 'Egyikük sem tanulja mindkét nyelvet.', 'Mind a négyen tanulnak spanyolt.'],
    correctAnswer: 0,
    explanation: 'Csak spanyolt 10 − 7 = 3 diák tanul, így 4 ilyen diákot nem választhatunk ki. A többi esemény bekövetkezhet.'
  },
  {
    id: 'ss-q24',
    questionTypeBadge: 'Biztos esemény',
    figure: FIG_LANG,
    level: 3,
    question: 'Ugyanebből a 16 diákból (13 olasz, 10 spanyol, 7 mindkettő) 4-et választunk ki. Melyik biztos esemény?',
    options: ['Van köztük olaszul tanuló.', 'Van köztük spanyolul tanuló.', 'Van köztük mindkét nyelvet tanuló.', 'Van köztük csak olaszul tanuló.'],
    correctAnswer: 0,
    explanation: 'Olaszt nem tanul 16 − 13 = 3 diák, így 4 diák között biztosan van olaszos. Spanyolt nem tanul 6 diák, ezért a „van spanyolos” nem biztos.'
  },
  {
    id: 'ss-q25',
    questionTypeBadge: 'Komplementer',
    level: 3,
    question: 'Két kockával dobunk, C: a dobások szorzata nagyobb, mint 16. Melyik esemény a C komplementere?',
    options: ['A dobások összege kisebb, mint 9.', 'A dobások szorzata kisebb, mint 16.', 'A dobások összege legfeljebb 9.', 'A dobások szorzata legfeljebb 15.'],
    correctAnswer: 0,
    explanation: 'C 10 elemi eseménye: (3;6), (4;5), (4;6), (5;4), (5;5), (5;6), (6;3), (6;4), (6;5), (6;6) – pontosan azok, ahol az összeg legalább 9. Így C̄ = „az összeg kisebb, mint 9” (26 eset). A (4;4) szorzata 16, ezért a „szorzat < 16” nem jó.'
  },
  {
    id: 'ss-q26',
    questionTypeBadge: 'Kizáró események',
    level: 3,
    question: 'Négy barát két játékának kezdőjét sorsoljuk. K: Bea kezdi a második játékot; L: egyik játékot sem Bea kezdi; M: mindkét játékot Bea kezdi; N: Dénes kezdi a második játékot. Melyik pár NEM zárja ki egymást?',
    options: ['K és M', 'K és L', 'L és M', 'M és N'],
    correctAnswer: 0,
    explanation: 'Ha M bekövetkezik (BB), akkor K is bekövetkezik, tehát K és M egyszerre is bekövetkezhet. A többi pár egyszerre nem teljesülhet.'
  },
  {
    id: 'ss-q27',
    questionTypeBadge: 'Esemény felsorolása',
    level: 3,
    question: 'Pénzérmét háromszor feldobunk. Hány elemi esemény esetén következik be, hogy „az első dobás fej, vagy a második dobás írás”?',
    options: ['6', '4', '5', '7'],
    correctAnswer: 0,
    explanation: 'Első fej: FFF, FFI, FIF, FII (4). Első írás és második írás: IIF, III (2). Összesen 6 (csak IFF és IFI nem jó).'
  },
  {
    id: 'ss-q28',
    questionTypeBadge: 'Négy pénzérme',
    level: 3,
    question: 'Négy pénzérmét dobunk fel. Hány elemi esemény esetén dobunk legalább egy fejet?',
    options: ['15', '16', '4', '8'],
    correctAnswer: 0,
    explanation: 'Az eseménytér 2⁴ = 16 elemű. A komplementer („nincs fej”) csak az IIII, így 16 − 1 = 15.'
  },
  {
    id: 'ss-q29',
    questionTypeBadge: 'Négy pénzérme',
    level: 3,
    question: 'Négy különböző pénzérmét dobunk fel. Hány elemi esemény esetén egyenlő a fejek és az írások száma?',
    options: ['6', '0', '4', '8'],
    correctAnswer: 0,
    explanation: 'Két fej és két írás kell: a 4 helyből 2-t választunk a fejeknek: C(4; 2) = 6 (FFII, FIFI, FIIF, IFFI, IFIF, IIFF). Három érménél ez lehetetlen volt, négynél nem!'
  },
  {
    id: 'ss-q30',
    questionTypeBadge: 'Komplementer',
    level: 3,
    question: 'Négy barát két játékának kezdőjét sorsoljuk. Hány elemi eseményből áll az, hogy „legalább az egyik játékot Bea kezdi”?',
    options: ['7', '8', '9', '6'],
    correctAnswer: 0,
    explanation: 'Komplementere: „egyik játékot sem Bea kezdi”: 3 · 3 = 9 eset. Így 16 − 9 = 7.'
  }
];

export const SampleSpaceQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g12-stat-esemenyter-quiz"
      subtopicId="az-esemenyter"
      title="5. Az eseménytér – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: elemi események, eseménytér, biztos, lehetetlen, komplementer és egymást kizáró események."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={SAMPLE_SPACE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Alapfogalmak',
          items: [
            'Elemi események: a kísérlet lehetséges kimenetelei.',
            'Eseménytér (H): az elemi események halmaza.',
            'Esemény: az eseménytér részhalmaza (A, B, …).',
            'Biztos esemény = H, lehetetlen esemény = ∅.'
          ]
        },
        {
          title: 'Komplementer és kizárás',
          items: [
            `${A_}: pontosan akkor, ha A nem következik be.`,
            `Elemszám: |${A_}| = |H| − |A|.`,
            'Egymást kizáró: egyszerre nem következhetnek be.',
            'A komplementerek kizárják egymást, fordítva nem mindig igaz.'
          ]
        },
        {
          title: 'Számolási minták',
          items: [
            'n pénzérme: 2ⁿ elemi esemény.',
            'Két dobókocka: 6 · 6 = 36 elemi esemény.',
            'Van hatos: 6 + 6 − 1 = 11; egyik sem hatos: 25.',
            '„Legalább egy”: számold a komplementert, és vond ki!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SampleSpaceMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <SampleSpaceSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default SampleSpaceQuiz;
