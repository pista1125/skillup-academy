import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { EventProbabilityMatcher } from './EventProbabilityMatcher';
import { EventProbabilitySorter } from './EventProbabilitySorter';
import { coinItems } from './EventProbabilityFigures';
import { QFig, T, Venn2, C_BLUE, C_AMBER, C_EDGE, bar } from './probKit';

const A_ = bar('A');

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const FIG_COINS = (
  <QFig>
    <Venn2 x={0} y={0} w={240} h={160} r={52} gap={74} items={coinItems()} />
  </QFig>
);

const slots = (labels: string[], note: string) => (
  <QFig w={240} h={110}>
    {labels.map((l, i) => (
      <g key={i}>
        <rect x={30 + i * 64} y={28} width={52} height={44} rx={8} fill="#ffffff" stroke={C_BLUE} strokeWidth={1.8} />
        <T x={56 + i * 64} y={51} t={l} s={16} b c={C_BLUE} />
      </g>
    ))}
    <T x={120} y={14} t="százas · tízes · egyes" s={9.5} c="#475569" />
    <T x={120} y={92} t={note} s={10} c="#475569" />
  </QFig>
);
const FIG_DIGITS = slots(['?', '?', '?'], '100 ≤ szám ≤ 999');

const FIG_BOARD = (
  <QFig w={240} h={120}>
    <rect x={20} y={30} width={44} height={44} rx={8} fill="#ffffff" stroke={C_EDGE} strokeWidth={2} />
    <circle cx={42} cy={52} r={4.5} fill={C_EDGE} />
    <T x={42} y={88} t="fehér: 1" s={10} />
    <T x={86} y={52} t="→" s={20} b c={C_AMBER} />
    <rect x={108} y={30} width={44} height={44} rx={8} fill="#ffffff" stroke={C_AMBER} strokeWidth={2} />
    {[0, 1, 2].map((r) =>
      [0, 1].map((c) => <circle key={`${r}-${c}`} cx={120 + c * 20} cy={40 + r * 12} r={3.6} fill={C_AMBER} />)
    )}
    <T x={130} y={88} t="6-osnak számít" s={10} c={C_AMBER} />
    <T x={168} y={52} t="+" s={18} b />
    <rect x={184} y={30} width={44} height={44} rx={8} fill={C_EDGE} />
    <T x={206} y={52} t="?" s={18} b c="#ffffff" />
    <T x={206} y={88} t="fekete" s={10} />
    <T x={120} y={110} t="egyébként: lépés = fehér + fekete" s={10} c="#475569" />
  </QFig>
);

const FIG_ARRIVAL = (
  <QFig w={240} h={100}>
    {[1, 2, 3, 4, 5].map((i) => (
      <g key={i}>
        <rect x={14 + (i - 1) * 44} y={30} width={38} height={38} rx={8} fill="#ffffff" stroke={C_BLUE} strokeWidth={1.8} />
        <T x={33 + (i - 1) * 44} y={49} t="?" s={15} b c={C_BLUE} />
        <T x={33 + (i - 1) * 44} y={80} t={`${i}.`} s={10} c="#475569" />
      </g>
    ))}
    <T x={120} y={14} t="Anna, Bea, Cili, Dóri, Eszter – véletlen sorrend" s={9.5} c="#475569" />
  </QFig>
);

// 3. feladat: a technikum (hiányos) táblázata
const TECH_ROWS: string[][] = [
  ['', 'lányok', 'fiúk', 'összes'],
  ['tanulók száma', '165', '', ''],
  ['tanulók %-os aránya', '', '75', ''],
  ['kosarasok száma', '', '', '270'],
  ['kosarasok %-a (nemen belül)', '≈ 18', '', '–']
];
const FIG_TECH = (
  <QFig w={240} h={106}>
    {TECH_ROWS.map((r, i) =>
      r.map((cell, j) => {
        const xs = [4, 108, 152, 196];
        const ws = [104, 44, 44, 40];
        return (
          <g key={`${i}-${j}`}>
            <rect x={xs[j]} y={4 + i * 19} width={ws[j]} height={19} fill={i === 0 || j === 0 ? '#e0f2fe' : '#ffffff'} stroke="#94a3b8" />
            <T x={j === 0 ? xs[j] + 4 : xs[j] + ws[j] / 2} y={17 + i * 19} t={cell} s={j === 0 ? 8 : 9} a={j === 0 ? 'start' : 'middle'} b={i === 0} />
          </g>
        );
      })
    )}
  </QFig>
);

const EVENT_PROBABILITY_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'ep-q1',
    questionTypeBadge: 'Klasszikus modell',
    level: 1,
    question: 'Egyformán valószínű, véges sok elemi esemény esetén hogyan számoljuk ki egy A esemény valószínűségét?',
    options: ['kedvező elemi események száma / összes elemi esemény száma', 'összes elemi esemény száma / kedvező elemi események száma', 'kedvező elemi események száma / kedvezőtlenek száma', 'kedvező elemi események száma − 1'],
    correctAnswer: 0,
    explanation: 'P(A) = kedvező / összes. A „kedvező / kedvezőtlen” arány az esély, nem a valószínűség.'
  },
  {
    id: 'ep-q2',
    questionTypeBadge: 'Kockadobás',
    level: 1,
    question: 'Egy szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy páros számot dobunk?',
    options: ['1/2', '1/3', '1/6', '2/3'],
    correctAnswer: 0,
    explanation: 'Kedvező: 2, 4, 6 (3 elemi esemény), összes: 6. P = 3/6 = 1/2.'
  },
  {
    id: 'ep-q3',
    questionTypeBadge: 'Kockadobás',
    level: 1,
    question: 'Egy szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy 5-nél nagyobbat dobunk?',
    options: ['1/6', '1/5', '5/6', '1/3'],
    correctAnswer: 0,
    explanation: 'Csak a 6 kedvező: P = 1/6.'
  },
  {
    id: 'ep-q4',
    questionTypeBadge: 'Komplementer',
    level: 1,
    question: `Egy A esemény valószínűsége 0,3. Mennyi az ${A_} valószínűsége?`,
    options: ['0,7', '0,3', '−0,3', '1,3'],
    correctAnswer: 0,
    explanation: `P(${A_}) = 1 − P(A) = 1 − 0,3 = 0,7.`
  },
  {
    id: 'ep-q5',
    questionTypeBadge: 'Három pénzérme',
    figure: FIG_COINS,
    level: 1,
    question: 'Három érmét dobunk (10, 20, 50 Ft). Mennyi a valószínűsége, hogy a 10 Ft-oson írás látható (A esemény)?',
    options: ['0,5', '0,375', '0,25', '0,125'],
    correctAnswer: 0,
    explanation: 'A-hoz 4 elemi esemény tartozik (III, IIF, IFI, IFF), összesen 8: P(A) = 4/8 = 0,5.'
  },
  {
    id: 'ep-q6',
    questionTypeBadge: 'Három pénzérme',
    figure: FIG_COINS,
    level: 1,
    question: 'Három érmét dobunk. Mennyi a valószínűsége, hogy pontosan egy fej látható (B esemény)?',
    options: ['0,375', '0,5', '0,333', '0,125'],
    correctAnswer: 0,
    explanation: 'B: IIF, IFI, FII – 3 elemi esemény a 8-ból: P(B) = 3/8 = 0,375.'
  },
  {
    id: 'ep-q7',
    questionTypeBadge: 'Speciális események',
    level: 1,
    question: 'Mennyi a lehetetlen esemény valószínűsége?',
    options: ['0', '1', '0,5', 'nem értelmezhető'],
    correctAnswer: 0,
    explanation: 'A lehetetlen eseményhez egyetlen kedvező elemi esemény sem tartozik: P = 0/n = 0. A biztos eseményé 1.'
  },
  {
    id: 'ep-q8',
    questionTypeBadge: 'Kizáró események',
    level: 1,
    question: 'A és B egymást kizáró események, P(A) = 0,2 és P(B) = 0,5. Mennyi P(A + B)?',
    options: ['0,7', '0,1', '0,3', '0,6'],
    correctAnswer: 0,
    explanation: 'Kizáró eseményeknél P(A + B) = P(A) + P(B) = 0,2 + 0,5 = 0,7. (A 0,1 a szorzatuk lenne, de kizáró eseményeknél P(A · B) = 0.)'
  },
  {
    id: 'ep-q9',
    questionTypeBadge: 'Kizáró események',
    level: 1,
    question: 'A és B egymást kizáró események, P(A) = 0,2 és P(B) = 0,5. Mennyi P(A · B)?',
    options: ['0', '0,1', '0,7', '0,3'],
    correctAnswer: 0,
    explanation: 'Kizáró események nem következhetnek be egyszerre: A · B a lehetetlen esemény, P(A · B) = 0.'
  },
  {
    id: 'ep-q10',
    questionTypeBadge: 'Két dobókocka',
    level: 1,
    question: 'Két dobókockával dobunk. Mennyi a valószínűsége, hogy a dobások összege 7?',
    options: ['1/6', '1/11', '7/36', '1/12'],
    correctAnswer: 0,
    explanation: 'Kedvező: (1;6), (2;5), (3;4), (4;3), (5;2), (6;1) – 6 a 36-ból: P = 6/36 = 1/6. (Az 1/11 hibás: a 11-féle összeg nem egyformán valószínű.)'
  },
  // ---------------------------- 2. szint ----------------------------
  {
    id: 'ep-q11',
    questionTypeBadge: 'Három pénzérme',
    figure: FIG_COINS,
    level: 2,
    question: 'A: a 10 Ft-oson írás; B: pontosan egy fej. Mennyi P(A + B)?',
    options: ['0,625', '0,875', '0,25', '0,5'],
    correctAnswer: 0,
    explanation: 'A + B: III, IIF, IFI, IFF, FII – 5 elemi esemény: P = 5/8 = 0,625. A 0,875 = 0,5 + 0,375 hibás, mert A és B nem zárják ki egymást.'
  },
  {
    id: 'ep-q12',
    questionTypeBadge: 'Három pénzérme',
    figure: FIG_COINS,
    level: 2,
    question: 'A: a 10 Ft-oson írás; B: pontosan egy fej. Mennyi P(A · B)?',
    options: ['0,25', '0,125', '0,375', '0,1875'],
    correctAnswer: 0,
    explanation: 'A · B: IIF, IFI – 2 elemi esemény: P = 2/8 = 0,25. (0,1875 = 0,5 · 0,375 lenne – A és B nem függetlenek.)'
  },
  {
    id: 'ep-q13',
    questionTypeBadge: 'Háromjegyű számok',
    figure: FIG_DIGITS,
    level: 2,
    question: 'Véletlenszerűen kiválasztunk egy háromjegyű pozitív egész számot. Mennyi a valószínűsége, hogy egyik számjegye sem 5-ös?',
    options: ['0,72', '0,729', '0,28', '0,648'],
    correctAnswer: 0,
    explanation: 'Összesen 900 szám. Nincs 5-ös: százas 8-féle (nem 0, nem 5), tízes és egyes 9-féle: 8 · 9 · 9 = 648. P = 648/900 = 0,72.'
  },
  {
    id: 'ep-q14',
    questionTypeBadge: 'Háromjegyű számok',
    figure: FIG_DIGITS,
    level: 2,
    question: 'Véletlenszerűen kiválasztunk egy háromjegyű pozitív egész számot. Mennyi a valószínűsége, hogy legalább egy számjegye 5-ös?',
    options: ['0,28', '0,72', '0,25', '0,3'],
    correctAnswer: 0,
    explanation: 'A komplementer („egyik jegye sem 5”) valószínűsége 0,72, így P = 1 − 0,72 = 0,28.'
  },
  {
    id: 'ep-q15',
    questionTypeBadge: 'Társasjáték',
    figure: FIG_BOARD,
    level: 2,
    question: 'Két kockával dobunk; ha a fehér 1-es, 6-osnak számít, egyébként a lépés a két dobás összege. Mennyi a valószínűsége, hogy pontosan hatot lép?',
    options: ['1/9', '5/36', '1/6', '1/12'],
    correctAnswer: 0,
    explanation: 'Hat: (2;4), (3;3), (4;2), (5;1). Ha a fehér 1-es, a lépés legalább 7, így az (1;5) nem jó. P = 4/36 = 1/9.'
  },
  {
    id: 'ep-q16',
    questionTypeBadge: 'Társasjáték',
    figure: FIG_BOARD,
    level: 2,
    question: 'Ugyanebben a játékban mennyi a valószínűsége, hogy legfeljebb négyet lép?',
    options: ['1/12', '1/6', '1/9', '1/36'],
    correctAnswer: 0,
    explanation: 'Legfeljebb 4: (2;1) → 3, (2;2) → 4, (3;1) → 4. Az 1-es fehérrel legalább 7 a lépés. P = 3/36 = 1/12.'
  },
  {
    id: 'ep-q17',
    questionTypeBadge: 'Három pénzérme',
    level: 2,
    question: 'Feldobunk három szabályos pénzérmét. Mennyi a valószínűsége, hogy mindhárommal azonosat dobunk?',
    options: ['1/4', '1/8', '1/2', '3/8'],
    correctAnswer: 0,
    explanation: 'Kedvező: FFF és III – 2 a 8-ból: P = 2/8 = 1/4.'
  },
  {
    id: 'ep-q18',
    questionTypeBadge: 'Sorrend',
    figure: FIG_ARRIVAL,
    level: 2,
    question: 'Öt lány (Anna, Bea, Cili, Dóri, Eszter) véletlen sorrendben érkezik. Mennyi a valószínűsége, hogy Anna harmadikként érkezik?',
    options: ['1/5', '1/3', '3/5', '1/120'],
    correctAnswer: 0,
    explanation: 'Összes sorrend: 5! = 120; Anna 3. helyen: a többiek 4! = 24-féleképpen. P = 24/120 = 1/5.'
  },
  {
    id: 'ep-q19',
    questionTypeBadge: 'Arányok',
    level: 2,
    question: 'Egy ház 67 lakója közül 15 gyerek, a felnőttek 57,7%-a nő. Mennyi a valószínűsége, hogy egy véletlenszerűen kiválasztott lakó felnőtt nő?',
    options: ['30/67', '22/67', '52/67', '0,577'],
    correctAnswer: 0,
    explanation: 'Felnőtt: 67 − 15 = 52; ennek 57,7%-a ≈ 30 nő. P = 30/67 ≈ 0,448. (A 0,577 csak a felnőttek közötti arány.)'
  },
  {
    id: 'ep-q20',
    questionTypeBadge: 'Táblázat kitöltése',
    figure: FIG_TECH,
    level: 2,
    question: 'A (hiányos) táblázat egy technikum tanulóira vonatkozik. Mennyi a valószínűsége, hogy egy véletlenszerűen kiválasztott diák kosárlabdázik?',
    options: ['9/22 ≈ 0,41', '≈ 0,55', '0,18', '0,25'],
    correctAnswer: 0,
    explanation: 'A fiúk aránya 75%, így a 165 lány a tanulók 25%-a: összesen 165 / 0,25 = 660 tanuló (495 fiú). P(kosárlabdázó) = 270 / 660 = 9/22 ≈ 0,41. (A 270 / 495 ≈ 0,55 csak a fiúk számához viszonyít.)'
  },
  // ---------------------------- 3. szint ----------------------------
  {
    id: 'ep-q21',
    questionTypeBadge: 'Háromjegyű számok',
    figure: FIG_DIGITS,
    level: 3,
    question: 'Véletlenszerűen kiválasztunk egy háromjegyű pozitív egész számot. Mennyi a valószínűsége, hogy pontosan egy számjegye 5-ös?',
    options: ['0,25', '0,28', '0,243', '0,27'],
    correctAnswer: 0,
    explanation: '5 _ _: 1 · 9 · 9 = 81; _ 5 _: 8 · 1 · 9 = 72; _ _ 5: 8 · 9 · 1 = 72. Összesen 225, P = 225/900 = 0,25.'
  },
  {
    id: 'ep-q22',
    questionTypeBadge: 'Társasjáték',
    figure: FIG_BOARD,
    level: 3,
    question: 'A társasjátékban (fehér 1-es → 6-os) mennyi a valószínűsége, hogy legalább tízet lép?',
    options: ['1/4', '1/6', '5/36', '1/3'],
    correctAnswer: 0,
    explanation: 'Fehér 1 (→ 6) és fekete 4, 5, 6: 3 eset; összeg ≥ 10 a fehér 4, 5, 6 esetén: (4;6), (5;5), (5;6), (6;4), (6;5), (6;6): 6 eset. Összesen 9: P = 9/36 = 1/4.'
  },
  {
    id: 'ep-q23',
    questionTypeBadge: 'Társasjáték',
    figure: FIG_BOARD,
    level: 3,
    question: 'A társasjátékban (fehér 1-es → 6-os) mennyi a valószínűsége, hogy nyolcat vagy kilencet lép?',
    options: ['11/36', '1/4', '9/36', '1/3'],
    correctAnswer: 0,
    explanation: 'Nyolc: (2;6), (3;5), (4;4), (5;3), (6;2), (1;2) → 6 eset; kilenc: (3;6), (4;5), (5;4), (6;3), (1;3) → 5 eset. P = 11/36.'
  },
  {
    id: 'ep-q24',
    questionTypeBadge: 'Függetlenség',
    level: 3,
    question: 'Három szabályos érme: A: mindhárommal azonosat dobunk; B: több fejet dobunk, mint írást. Mennyi P(A · B), és függetlenek-e?',
    options: ['1/8, és függetlenek', '1/8, de nem függetlenek', '1/4, és függetlenek', '0, mert kizárják egymást'],
    correctAnswer: 0,
    explanation: 'A · B = {FFF}: P = 1/8. P(A) · P(B) = 1/4 · 1/2 = 1/8, tehát P(A · B) = P(A) · P(B): függetlenek.'
  },
  {
    id: 'ep-q25',
    questionTypeBadge: 'Sorrend',
    figure: FIG_ARRIVAL,
    level: 3,
    question: 'Öt lány véletlen sorrendben érkezik. Mennyi a valószínűsége, hogy Cili és Dóri közvetlenül egymás után érkezik?',
    options: ['2/5', '1/5', '1/10', '1/2'],
    correctAnswer: 0,
    explanation: 'Cili és Dóri egy „blokk”: a blokk helye 4-féle, belső sorrendje 2-féle, a többiek 3! = 6-féleképpen: 4 · 2 · 6 = 48. P = 48/120 = 2/5.'
  },
  {
    id: 'ep-q26',
    questionTypeBadge: 'Függetlenség',
    figure: FIG_ARRIVAL,
    level: 3,
    question: 'A: Anna harmadikként érkezik; B: Bea negyedikként érkezik. Mit mutat a számolás?',
    options: ['P(A · B) = 1/20 ≠ 1/25 = P(A) · P(B), nem függetlenek', 'P(A · B) = 1/25 = P(A) · P(B), függetlenek', 'P(A · B) = 0, kizárják egymást', 'P(A · B) = 2/5, nem függetlenek'],
    correctAnswer: 0,
    explanation: 'A · B: Anna 3., Bea 4., a többi 3! = 6-féle: P = 6/120 = 1/20. P(A) · P(B) = 1/5 · 1/5 = 1/25. Mivel 1/20 ≠ 1/25, nem függetlenek.'
  },
  {
    id: 'ep-q27',
    questionTypeBadge: 'Függetlenség',
    level: 3,
    question: 'Fehér és fekete kockával dobunk. Melyik eseménypár független?',
    options: ['„a fehér hatos” és „az összeg 7”', '„a fehér hatos” és „az összeg 8”', '„a fehér hatos” és „az összeg 12”', '„a fehér hatos” és „van hatos”'],
    correctAnswer: 0,
    explanation: 'P(fehér 6 · összeg 7) = 1/36 [csak (6;1)], és 1/6 · 6/36 = 1/36 – függetlenek. Összeg 8-nál 1/36 ≠ 1/6 · 5/36, összeg 12-nél 1/36 ≠ 1/6 · 1/36.'
  },
  {
    id: 'ep-q28',
    questionTypeBadge: 'Háromjegyű számok',
    figure: FIG_DIGITS,
    level: 3,
    question: 'Véletlenszerűen kiválasztunk egy háromjegyű pozitív egész számot. Mennyi a valószínűsége, hogy mindhárom számjegye kisebb, mint 4?',
    options: ['4/75 ≈ 0,053', '16/225 ≈ 0,071', '0,03', '0,064'],
    correctAnswer: 0,
    explanation: 'Százas: 1, 2, 3 (3-féle, a 0 nem lehet), tízes és egyes: 0–3 (4-féle): 3 · 4 · 4 = 48. P = 48/900 = 4/75 ≈ 0,053.'
  },
  {
    id: 'ep-q29',
    questionTypeBadge: 'Arányok',
    level: 3,
    question: 'A 67 lakó közül 15 gyerek (40%-uk fiú), a többiek felnőttek. Mennyi a valószínűsége, hogy a kiválasztott lakó felnőtt vagy fiú?',
    options: ['58/67', '52/67', '28/67', '61/67'],
    correctAnswer: 0,
    explanation: 'Felnőtt: 52, fiú: 15 · 0,4 = 6. A két csoport kizárja egymást: P = (52 + 6)/67 = 58/67 ≈ 0,866.'
  },
  {
    id: 'ep-q30',
    questionTypeBadge: 'Függetlenség',
    figure: FIG_TECH,
    level: 3,
    question: 'A technikum tanulói közül véletlenszerűen választunk egyet. E: a diák kosárlabdázik; F: a diák fiú. Mit mutat a számolás?',
    options: [
      'Nem függetlenek: P(E · F) ≈ 0,364, de P(E) · P(F) ≈ 0,307.',
      'Függetlenek: P(E · F) = P(E) · P(F) ≈ 0,307.',
      'Függetlenek, mert a fiúk aránya 75%.',
      'Nem függetlenek, mert P(E) + P(F) > 1.'
    ],
    correctAnswer: 0,
    explanation: '660 tanuló: 165 lány, 495 fiú. A lányok ≈ 18%-a, azaz 30 lány kosárlabdázik, így 270 − 30 = 240 fiú. P(E · F) = 240 / 660 ≈ 0,364, P(E) · P(F) = (270 / 660) · 0,75 ≈ 0,307. Mivel a kettő nem egyenlő, E és F nem független.'
  }
];

export const EventProbabilityQuiz: React.FC<{
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
      topicId="g12-stat-valoszinuseg-quiz"
      subtopicId="esemeny-valoszinusege"
      title="7. Esemény valószínűsége – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: klasszikus valószínűség, komplementer, kizáró és független események."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={EVENT_PROBABILITY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Klasszikus valószínűség',
          items: [
            'P(A) = kedvező / összes (egyformán valószínű elemi események).',
            '0 ≤ P(A) ≤ 1; lehetetlen: 0, biztos: 1.',
            'Két kocka: 36, három érme: 8 elemi esemény.',
            'Háromjegyű számok: 900 darab.'
          ]
        },
        {
          title: 'Komplementer és kizárás',
          items: [
            `P(${A_}) = 1 − P(A).`,
            '„Legalább egy”: 1 − P(egy sem).',
            'Kizáró események: P(A + B) = P(A) + P(B).',
            'Kizáró események: P(A · B) = 0.'
          ]
        },
        {
          title: 'Függetlenség',
          items: [
            'A, B független, ha P(A · B) = P(A) · P(B).',
            'Ellenőrzés: számold ki mindkét oldalt!',
            'Két kocka eredménye független egymástól.',
            'Pl. Anna 3., Bea 4.: 1/20 ≠ 1/25 → nem független.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <EventProbabilityMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <EventProbabilitySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default EventProbabilityQuiz;
