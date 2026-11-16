import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ClassMidpointsMatcher } from './ClassMidpointsMatcher';
import { ClassMidpointsSorter } from './ClassMidpointsSorter';
import { SFig, SBarChart, STable, S_BLUE, S_TEAL, S_PURPLE, S_GREEN } from './statKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const bars = (labels: string[], values: number[], yMax: number, ticks: number[], color: string, title: string) => (
  <SFig w={280} h={150} className="w-full max-w-[320px] h-auto mx-auto" title={title}>
    <SBarChart
      x0={28}
      y0={126}
      w={244}
      h={90}
      yMax={yMax}
      ticks={ticks}
      showValues
      color={color}
      gap={0.12}
      labelSize={labels.length > 6 ? 6 : 7}
      tickFmt={(v) => String(v)}
      data={labels.map((l, i) => ({ label: l, value: values[i] }))}
    />
  </SFig>
);

const FIG_NAILS = bars(['120–', '125–', '130–', '135–', '140–', '145–', '150–', '155–'], [1, 2, 6, 17, 10, 7, 5, 2], 18, [0, 6, 12, 18], S_BLUE, 'Szögek száma (db) – 50 vásárló');
const FIG_RAIN = bars(['1–25', '26–50', '51–75', '76–100', '101–133'], [7, 9, 6, 1, 1], 10, [0, 5, 10], S_TEAL, 'Havi csapadék (mm) – 24 hónap');
const FIG_SCORES = bars(['0–30', '31–40', '41–50', '51–60', '61–70', '71–80', '81–90', '91–100'], [0, 2, 8, 21, 9, 9, 1, 0], 24, [0, 8, 16, 24], S_PURPLE, 'Dolgozatpontszámok – 50 tanuló');
const FIG_WIRE = bars(['11,8–12,8', '12,9–13,9', '14,0–15,0', '15,1–16,1', '16,2–17,2'], [2, 4, 13, 5, 1], 14, [0, 7, 14], S_GREEN, 'Huzaldarabok hossza (mm) – 25 db');

const FIG_EXAM = (
  <SFig w={312} h={64} className="w-full max-w-[340px] h-auto mx-auto">
    <STable
      x={6}
      y={12}
      colW={[44, 28, 28, 28, 28, 28, 28, 28, 28, 30]}
      rowH={20}
      s={7}
      rows={[
        ['pont', '0–20', '21–30', '31–40', '41–50', '51–60', '61–70', '71–80', '81–90', '91–100'],
        ['fő', 0, 8, 12, 8, 18, 20, 12, 16, 6]
      ]}
    />
  </SFig>
);

const FIG_IQ = (
  <SFig w={300} h={64} className="w-full max-w-[340px] h-auto mx-auto">
    <STable
      x={6}
      y={12}
      colW={[48, 40, 40, 40, 40, 40, 40]}
      rowH={20}
      s={7.5}
      rows={[
        ['IQ-pont', '75–84', '85–94', '95–104', '105–114', '115–124', '125–134'],
        ['fő', 17, 132, 225, 468, 130, 28]
      ]}
    />
  </SFig>
);

const FIG_EGGS = (
  <SFig w={280} h={84} className="w-full max-w-[320px] h-auto mx-auto">
    <STable
      x={8}
      y={12}
      colW={[60, 52, 52, 52, 52]}
      rowH={20}
      s={8}
      rows={[
        ['méret', 'S', 'M', 'L', 'XL'],
        ['tömeg (g)', '45–53', '53–63', '63–73', '73–81'],
        ['db', 90, 452, 563, 95]
      ]}
    />
  </SFig>
);

const CLASS_MIDPOINTS_QUESTIONS: QuizQuestion[] = [
  // ------------------------------- 1. szint -------------------------------
  {
    id: 'cmp-q1',
    questionTypeBadge: 'Osztályközép',
    level: 1,
    question: 'Mennyi a 120–124 osztály osztályközepe?',
    options: ['122', '124', '120', '4'],
    correctAnswer: 0,
    explanation: 'Az osztályközép a két határ számtani közepe: (120 + 124) / 2 = 122.'
  },
  {
    id: 'cmp-q2',
    questionTypeBadge: 'Osztályközép',
    level: 1,
    question: 'Mennyi a 26–50 mm-es csapadékosztály osztályközepe?',
    options: ['38 mm', '37 mm', '25 mm', '24 mm'],
    correctAnswer: 0,
    explanation: '(26 + 50) / 2 = 76 / 2 = 38 mm.'
  },
  {
    id: 'cmp-q3',
    questionTypeBadge: 'Osztályközép',
    level: 1,
    question: 'Mennyi a 11,8–12,8 mm-es osztály osztályközepe?',
    options: ['12,3 mm', '12,8 mm', '1 mm', '12 mm'],
    correctAnswer: 0,
    explanation: '(11,8 + 12,8) / 2 = 24,6 / 2 = 12,3 mm.'
  },
  {
    id: 'cmp-q4',
    questionTypeBadge: 'Osztályba sorolás',
    level: 1,
    question: 'Melyik osztályba sorolás HELYES 0 és 30 közötti egész adatokra?',
    options: ['0–9; 10–19; 20–30', '0–10; 10–20; 20–30', '0–9; 12–19; 20–30', '0–15; 10–30'],
    correctAnswer: 0,
    explanation: 'Két osztálynak nem lehet közös része (a 10 és a 20 nem lehet két osztályban), és együtt minden adatot le kell fedniük (10 és 11 nem maradhat ki).'
  },
  {
    id: 'cmp-q5',
    questionTypeBadge: 'Osztályközép',
    level: 1,
    question: 'Hogyan számoljuk ki osztályokba sorolt adatok statisztikai jellemzőit?',
    options: [
      'Mintha minden adat a hozzá tartozó osztályközéppel lenne egyenlő.',
      'Mintha minden adat az osztály alsó határával lenne egyenlő.',
      'Csak a legnagyobb gyakoriságú osztály adataival.',
      'Az osztályok számával osztva.'
    ],
    correctAnswer: 0,
    explanation: 'A tankönyv szerint az osztályba sorolt adatokat az osztályközéppel helyettesítjük.'
  },
  {
    id: 'cmp-q6',
    questionTypeBadge: 'Átlag',
    level: 1,
    question: 'Az osztályközepek 5, 15 és 25, a gyakoriságok rendre 1, 2 és 1. Mennyi az átlag az osztályközepekkel számolva?',
    options: ['15', '45', '11,25', '20'],
    correctAnswer: 0,
    explanation: '(1 · 5 + 2 · 15 + 1 · 25) / 4 = 60 / 4 = 15.'
  },
  {
    id: 'cmp-q7',
    questionTypeBadge: 'Gyakoriság',
    level: 1,
    question: 'Csapadékadatok (mm): 13; 28; 34; 47; 19; 26; 53; 14. Hány adat esik a 26–50 mm-es osztályba?',
    options: ['4', '3', '5', '2'],
    correctAnswer: 0,
    explanation: 'A 28, 34, 47 és 26 esik ide (a 13, 19, 14 az 1–25-ös, az 53 az 51–75-ös osztályba tartozik).'
  },
  {
    id: 'cmp-q8',
    questionTypeBadge: 'Osztályba sorolás',
    level: 1,
    question: 'Mi a gond, ha túl kevés osztályt hozunk létre?',
    options: ['Torzíthat az adatsokaságon.', 'Nehezíti az elemzést, mert túl sok számot kell kezelni.', 'Az osztályok átfedik egymást.', 'Nem lehet osztályközepet számolni.'],
    correctAnswer: 0,
    explanation: 'Túl kevés osztálynál sok információ elvész, így az eredmény torzulhat; túl sok osztály viszont nehezíti az elemzést.'
  },
  {
    id: 'cmp-q9',
    questionTypeBadge: 'Tűrés',
    level: 1,
    question: 'Az előírt huzalhossz 14,5 mm, a megengedett eltérés (tűrés) ±1,6 mm. Milyen hosszúságú darab felel meg?',
    options: ['12,9 mm és 16,1 mm között', '14,5 mm és 16,1 mm között', '12,9 mm és 14,5 mm között', '13,7 mm és 15,3 mm között'],
    correctAnswer: 0,
    explanation: '14,5 − 1,6 = 12,9 és 14,5 + 1,6 = 16,1 mm.'
  },
  {
    id: 'cmp-q10',
    questionTypeBadge: 'Relatív gyakoriság',
    figure: FIG_NAILS,
    level: 1,
    question: 'Az 50 vásárló közül hány százalék vett 135–139 darab szöget?',
    options: ['34%', '17%', '50%', '28%'],
    correctAnswer: 0,
    explanation: '17 / 50 = 0,34 = 34%.'
  },
  // ------------------------------- 2. szint -------------------------------
  {
    id: 'cmp-q11',
    questionTypeBadge: 'Átlag',
    figure: FIG_NAILS,
    level: 2,
    question: 'Számítsd ki osztályközepekkel (122; 127; …; 157) a vásárolt szögek átlagát!',
    options: ['140,4', '139,5', '137', '141,2'],
    correctAnswer: 0,
    explanation: '(122 + 2 · 127 + 6 · 132 + 17 · 137 + 10 · 142 + 7 · 147 + 5 · 152 + 2 · 157) / 50 = 7020 / 50 = 140,4. (139,5 az osztályközepek súlyozás nélküli átlaga.)'
  },
  {
    id: 'cmp-q12',
    questionTypeBadge: 'Medián',
    figure: FIG_NAILS,
    level: 2,
    question: 'Mennyi a vásárolt szögek mediánja osztályközepekkel számolva?',
    options: ['137', '142', '140,4', '139,5'],
    correctAnswer: 0,
    explanation: 'A 25. és a 26. adat a medián; a kumulált gyakoriság 9 után 26 – mindkettő a 135–139 osztályban van, osztályközepe 137.'
  },
  {
    id: 'cmp-q13',
    questionTypeBadge: 'Átlag',
    figure: FIG_RAIN,
    level: 2,
    question: 'A 24 havi csapadékadat osztályközepei 13; 38; 63; 88; 117 mm. Mennyi az átlagos havi csapadék közelítő értéke?',
    options: ['≈ 42,3 mm', '≈ 63,8 mm', '≈ 44,4 mm', '38 mm'],
    correctAnswer: 0,
    explanation: '(7 · 13 + 9 · 38 + 6 · 63 + 88 + 117) / 24 = 1016 / 24 ≈ 42,3 mm. (63,8 az osztályközepek egyszerű átlaga, 44,4 a valódi adatok átlaga.)'
  },
  {
    id: 'cmp-q14',
    questionTypeBadge: 'Átlag',
    figure: FIG_SCORES,
    level: 2,
    question: 'Számítsd ki osztályközepekkel a dolgozatpontszámok átlagát!',
    options: ['59,1 pont', '55,5 pont', '57,4 pont', '61,5 pont'],
    correctAnswer: 0,
    explanation: '(2 · 35,5 + 8 · 45,5 + 21 · 55,5 + 9 · 65,5 + 9 · 75,5 + 1 · 85,5) / 50 = 2955 / 50 = 59,1 pont.'
  },
  {
    id: 'cmp-q15',
    questionTypeBadge: 'Tűrés',
    figure: FIG_WIRE,
    level: 2,
    question: 'A tűrés ±1,6 mm (12,9–16,1 mm). Az ellenőrzött huzalok hány százaléka felel meg az előírásnak?',
    options: ['88%', '52%', '72%', '96%'],
    correctAnswer: 0,
    explanation: 'A 12,9–13,9, 14,0–15,0 és 15,1–16,1 osztály: 4 + 13 + 5 = 22 darab; 22 / 25 = 88%.'
  },
  {
    id: 'cmp-q16',
    questionTypeBadge: 'Átlag',
    figure: FIG_WIRE,
    level: 2,
    question: 'Mennyi a huzaldarabok hosszának átlaga osztályközepekkel (12,3; 13,4; 14,5; 15,6; 16,7 mm)?',
    options: ['≈ 14,46 mm', '14,5 mm', '≈ 14,1 mm', '≈ 14,8 mm'],
    correctAnswer: 0,
    explanation: '(2 · 12,3 + 4 · 13,4 + 13 · 14,5 + 5 · 15,6 + 16,7) / 25 = 361,4 / 25 = 14,456 ≈ 14,46 mm.'
  },
  {
    id: 'cmp-q17',
    questionTypeBadge: 'Lehetséges átlag',
    figure: FIG_EXAM,
    level: 2,
    question: 'A táblázat 100 tanuló érettségi pontszámát mutatja. Mennyi a 100 tanuló pontszámának lehetséges legmagasabb átlaga?',
    options: ['66 pont', '61,5 pont', '57 pont', '100 pont'],
    correctAnswer: 0,
    explanation: 'A legmagasabb átlag, ha mindenki az osztálya felső határát érte el: (8 · 30 + 12 · 40 + 8 · 50 + 18 · 60 + 20 · 70 + 12 · 80 + 16 · 90 + 6 · 100) / 100 = 66.'
  },
  {
    id: 'cmp-q18',
    questionTypeBadge: 'Átlag',
    figure: FIG_EXAM,
    level: 2,
    question: 'Osztályközepekkel számolva mennyi a 100 tanuló pontszámainak átlaga?',
    options: ['61,5 pont', '66 pont', '57 pont', '55,5 pont'],
    correctAnswer: 0,
    explanation: 'Osztályközepek: 25,5; 35,5; …; 95,5. (8 · 25,5 + 12 · 35,5 + 8 · 45,5 + 18 · 55,5 + 20 · 65,5 + 12 · 75,5 + 16 · 85,5 + 6 · 95,5) / 100 = 61,5.'
  },
  {
    id: 'cmp-q19',
    questionTypeBadge: 'Osztályközép',
    figure: FIG_EGGS,
    level: 2,
    question: 'Az S-es tojások 53 g-nál kisebbek, a legkisebb tojás 45 g. Mennyi az S osztály osztályközepe?',
    options: ['49 g', '53 g', '26,5 g', '45 g'],
    correctAnswer: 0,
    explanation: 'Az S osztály 45 és 53 g között van: (45 + 53) / 2 = 49 g.'
  },
  {
    id: 'cmp-q20',
    questionTypeBadge: 'Átlag',
    figure: FIG_EGGS,
    level: 2,
    question: 'Az 1200 tojás osztályközepei 49; 58; 68; 77 g. Mennyi a tojások tömegének átlaga?',
    options: ['≈ 63,5 g', '63 g', '≈ 61,6 g', '≈ 65,2 g'],
    correctAnswer: 0,
    explanation: '(90 · 49 + 452 · 58 + 563 · 68 + 95 · 77) / 1200 = 76 225 / 1200 ≈ 63,5 g. (63 g az osztályközepek egyszerű átlaga.)'
  },
  // ------------------------------- 3. szint -------------------------------
  {
    id: 'cmp-q21',
    questionTypeBadge: 'Szórás',
    figure: FIG_RAIN,
    level: 3,
    question: 'A csapadék osztályközepes átlaga ≈ 42,33 mm. Mennyi a szórás az osztályközepekkel számolva?',
    options: ['≈ 26,2 mm', '≈ 684 mm', '≈ 28,6 mm', '≈ 37,9 mm'],
    correctAnswer: 0,
    explanation: 'σ² = [7 · (13 − 42,33)² + 9 · (38 − 42,33)² + 6 · (63 − 42,33)² + (88 − 42,33)² + (117 − 42,33)²] / 24 ≈ 684, σ ≈ 26,2 mm. (28,6 mm a valódi adatok szórása.)'
  },
  {
    id: 'cmp-q22',
    questionTypeBadge: 'Szórás',
    figure: FIG_SCORES,
    level: 3,
    question: 'A dolgozatpontszámok osztályközepes átlaga 59,1. Mennyi a pontszámok szórása osztályközepekkel?',
    options: ['≈ 11,3 pont', '≈ 127 pont', '≈ 9,4 pont', '≈ 14,2 pont'],
    correctAnswer: 0,
    explanation: 'σ² = [2 · 23,6² + 8 · 13,6² + 21 · 3,6² + 9 · 6,4² + 9 · 16,4² + 26,4²] / 50 = 6352 / 50 = 127,04, σ ≈ 11,3 pont.'
  },
  {
    id: 'cmp-q23',
    questionTypeBadge: 'Minőségellenőrzés',
    figure: FIG_WIRE,
    level: 3,
    question: 'Ha a minőségi előírás a legfeljebb 1,2 mm-es szórás lenne, kellene-e állítani a robot működésén? (Osztályközepekkel, x̄ ≈ 14,456 mm.)',
    options: ['Nem, mert a szórás ≈ 1,01 mm < 1,2 mm.', 'Igen, mert a szórás ≈ 1,45 mm > 1,2 mm.', 'Igen, mert az átlag nem pontosan 14,5 mm.', 'Nem, mert a szórás 0.'],
    correctAnswer: 0,
    explanation: 'σ² = [2 · (−2,156)² + 4 · (−1,056)² + 13 · 0,044² + 5 · 1,144² + 2,244²] / 25 ≈ 1,0145, σ ≈ 1,01 mm, ez kisebb 1,2 mm-nél.'
  },
  {
    id: 'cmp-q24',
    questionTypeBadge: 'Átlag ± szórás',
    level: 3,
    question: 'A 24 havi csapadékadatnál x̄ ≈ 42,3 mm és σ ≈ 26,2 mm. Az eredeti adatok közül 17 esik 16,2 és 68,5 mm közé. Hány százalékuk van az átlaghoz a szórásnál közelebb?',
    options: ['≈ 70,8%', '62,5%', '≈ 29,2%', '68%'],
    correctAnswer: 0,
    explanation: '17 / 24 ≈ 0,708, vagyis ≈ 70,8%.'
  },
  {
    id: 'cmp-q25',
    questionTypeBadge: 'Átlag ± szórás',
    figure: FIG_RAIN,
    level: 3,
    question: 'Ha az adatokat az osztályközepekkel (13; 38; 63; 88; 117) helyettesítjük, hány százalékuk esik az átlagtól (≈ 42,3) a szórásnál (≈ 26,2) kisebb távolságra?',
    options: ['62,5%', '≈ 70,8%', '37,5%', '91,7%'],
    correctAnswer: 0,
    explanation: 'Csak a 38 és a 63 esik 16,2 és 68,5 közé: 9 + 6 = 15 adat, 15 / 24 = 62,5%. A válasz tehát változik az eredeti adatokhoz képest.'
  },
  {
    id: 'cmp-q26',
    questionTypeBadge: 'Szórás',
    figure: FIG_EGGS,
    level: 3,
    question: 'A tojások osztályközepes átlaga ≈ 63,52 g. Mennyi a tojások tömegének szórása osztályközepekkel?',
    options: ['≈ 7,1 g', '≈ 51,1 g', '≈ 10,2 g', '≈ 4,6 g'],
    correctAnswer: 0,
    explanation: 'σ² = [90 · (49 − 63,52)² + 452 · (58 − 63,52)² + 563 · (68 − 63,52)² + 95 · (77 − 63,52)²] / 1200 ≈ 51,1, σ ≈ 7,1 g.'
  },
  {
    id: 'cmp-q27',
    questionTypeBadge: 'Szabványos teszt?',
    figure: FIG_IQ,
    level: 3,
    question: 'Egy IQ-teszt akkor szabványszerű, ha az átlagos eredmény 100, a szórás pedig legfeljebb 15 pont. Az új teszt első 1000 kitöltőjének eredményeit a táblázat mutatja. Osztályközepekkel számolva megfelel-e a teszt?',
    options: [
      'Nem: a szórás ≈ 10,1 (ez rendben van), de az átlag ≈ 106, nem 100.',
      'Igen: az átlag ≈ 100, a szórás ≈ 10,1.',
      'Nem: az átlag 100, de a szórás ≈ 22 > 15.',
      'Igen: az átlag ≈ 106 és a szórás ≈ 10,1 is 15 alatt van.'
    ],
    correctAnswer: 0,
    explanation: 'Osztályközepek: 79,5; 89,5; 99,5; 109,5; 119,5; 129,5. x̄ = (17 · 79,5 + 132 · 89,5 + 225 · 99,5 + 468 · 109,5 + 130 · 119,5 + 28 · 129,5) / 1000 = 105,96 ≈ 106. σ² ≈ 102,27, σ ≈ 10,1. A szórás megfelel, de az átlag nem 100, ezért a teszt nem szabványszerű.'
  },
  {
    id: 'cmp-q28',
    questionTypeBadge: 'Medián',
    figure: FIG_EXAM,
    level: 3,
    question: 'Osztályközepekkel számolva mennyi a 100 tanuló pontszámainak mediánja?',
    options: ['65,5 pont', '55,5 pont', '61,5 pont', '60,5 pont'],
    correctAnswer: 0,
    explanation: 'Kumulált gyakoriságok: 8; 20; 28; 46; 66; … Az 50. és 51. adat a 61–70 osztályba esik, ennek osztályközepe 65,5.'
  },
  {
    id: 'cmp-q29',
    questionTypeBadge: 'Lehetséges átlag',
    figure: FIG_EXAM,
    level: 3,
    question: 'Mennyi a 100 tanuló pontszámának lehetséges legalacsonyabb átlaga a táblázat alapján?',
    options: ['57 pont', '61,5 pont', '56 pont', '0 pont'],
    correctAnswer: 0,
    explanation: 'Mindenki az osztálya alsó határán: (8 · 21 + 12 · 31 + 8 · 41 + 18 · 51 + 20 · 61 + 12 · 71 + 16 · 81 + 6 · 91) / 100 = 5700 / 100 = 57.'
  },
  {
    id: 'cmp-q30',
    questionTypeBadge: 'Szórás',
    figure: FIG_NAILS,
    level: 3,
    question: 'A szögek osztályközepes átlaga 140,4. Mennyi a darabszámok szórása osztályközepekkel (egy tizedesre)?',
    options: ['≈ 7,6', '≈ 57,4', '≈ 11,5', '≈ 5,2'],
    correctAnswer: 0,
    explanation: 'σ² = [1 · 18,4² + 2 · 13,4² + 6 · 8,4² + 17 · 3,4² + 10 · 1,6² + 7 · 6,6² + 5 · 11,6² + 2 · 16,6²] / 50 = 2872 / 50 = 57,44, σ ≈ 7,6.'
  }
];

export const ClassMidpointsQuiz: React.FC<{
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
      topicId="g12-stat-osztalykozepek-quiz"
      subtopicId="szamitasok-osztalykozepekkel"
      title="4. Számítások osztályközepekkel – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: osztályba sorolás, osztályközép, átlag, medián és szórás osztályközepekkel."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={CLASS_MIDPOINTS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Osztályba sorolás',
          items: [
            'Két osztálynak nem lehet közös része.',
            'Az osztályok együtt minden adatot lefednek.',
            'Túl kevés osztály torzít, túl sok nehezíti az elemzést.',
            'Osztályközép = (alsó határ + felső határ) / 2.'
          ]
        },
        {
          title: 'Számolás osztályközepekkel',
          items: [
            'Minden adatot az osztályközépnek veszünk.',
            'x̄ ≈ (f₁ · k₁ + … + fₘ · kₘ) / n (súlyozott átlag!).',
            'σ² ≈ [f₁ · (k₁ − x̄)² + … + fₘ · (kₘ − x̄)²] / n.',
            'Medián: a kumulált gyakoriság alapján keressük meg a középső adat osztályát.'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Szögek: x̄ = 140,4; medián 137.',
            'Csapadék: x̄ ≈ 42,3 mm, σ ≈ 26,2 mm.',
            'Dolgozat: x̄ = 59,1, σ ≈ 11,3; huzal: x̄ ≈ 14,46 mm, σ ≈ 1,01 mm.',
            'Érettségi 2018: legmagasabb átlag 66, osztályközepes 61,5.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ClassMidpointsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ClassMidpointsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ClassMidpointsQuiz;
