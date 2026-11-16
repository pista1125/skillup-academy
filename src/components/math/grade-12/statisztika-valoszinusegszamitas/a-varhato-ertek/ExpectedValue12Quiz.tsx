import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ExpectedValue12Matcher } from './ExpectedValue12Matcher';
import { ExpectedValue12Sorter } from './ExpectedValue12Sorter';
import { SFig, SWheel, STable, SText, WheelSector, S_BLUE, S_GREEN, S_AMBER, S_PURPLE, S_RED, S_INK, S_AXIS } from './statKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const wheelFig = (sectors: WheelSector[], title?: string) => (
  <SFig w={220} h={160} className="w-full max-w-[260px] h-auto mx-auto" title={title}>
    <SWheel cx={110} cy={88} r={58} s={7.5} sectors={sectors} />
  </SFig>
);

const FIG_VURSTLI = wheelFig(
  [
    { label: '0 Ft', deg: 60, color: '#94a3b8' },
    { label: '200 Ft', deg: 60, color: S_BLUE },
    { label: '900 Ft', deg: 60, color: S_GREEN },
    { label: '0 Ft', deg: 60, color: '#94a3b8' },
    { label: '100 Ft', deg: 60, color: S_AMBER },
    { label: '1200 Ft', deg: 60, color: S_PURPLE }
  ],
  '6 egyenlő cikk'
);

const FIG_FOUR = wheelFig(
  [
    { label: '0 Ft', deg: 90, color: '#94a3b8' },
    { label: '100 Ft', deg: 90, color: S_BLUE },
    { label: '200 Ft', deg: 90, color: S_GREEN },
    { label: '500 Ft', deg: 90, color: S_AMBER }
  ],
  '4 egyenlő cikk'
);

const FIG_QUARTER = wheelFig([
  { label: '1000 Ft', deg: 90, color: S_GREEN, showDeg: true },
  { label: '0 Ft', deg: 270, color: '#94a3b8', showDeg: true }
]);

const FIG_ANGLES = wheelFig([
  { label: '300 Ft', deg: 80, color: S_BLUE, showDeg: true },
  { label: '2000 Ft', deg: 60, color: S_GREEN, showDeg: true },
  { label: '400 Ft', deg: 100, color: S_AMBER, showDeg: true },
  { label: '900 Ft', deg: 70, color: S_PURPLE, showDeg: true },
  { label: '3000 Ft', deg: 50, color: S_RED, showDeg: true }
]);

const FIG_TP_WHEEL = wheelFig([
  { label: '3000 Ft', deg: 60, color: S_RED, showDeg: true },
  { label: '200 Ft', deg: 150, color: S_BLUE, showDeg: true },
  { label: '5000 Ft', deg: 30, color: S_PURPLE, showDeg: true },
  { label: '500 Ft', deg: 120, color: S_AMBER, showDeg: true }
]);

const FIG_TARGET = (
  <SFig w={200} h={150} className="w-full max-w-[230px] h-auto mx-auto">
    <circle cx={100} cy={75} r={60} fill={S_BLUE} fillOpacity={0.12} stroke={S_INK} />
    <circle cx={100} cy={75} r={30} fill={S_AMBER} fillOpacity={0.25} stroke={S_INK} />
    <line x1={40} y1={75} x2={160} y2={75} stroke={S_INK} />
    <line x1={100} y1={15} x2={100} y2={135} stroke={S_INK} />
    <SText x={60} y={42} t="10" s={10} b />
    <SText x={140} y={42} t="20" s={10} b />
    <SText x={60} y={116} t="20" s={10} b />
    <SText x={140} y={116} t="10" s={10} b />
    <SText x={86} y={66} t="50" s={9} b c={S_RED} />
    <SText x={114} y={66} t="40" s={9} b c={S_RED} />
    <SText x={86} y={93} t="40" s={9} b c={S_RED} />
    <SText x={114} y={93} t="50" s={9} b c={S_RED} />
  </SFig>
);

const FIG_STOCKS = (
  <SFig w={250} h={96} className="w-full max-w-[300px] h-auto mx-auto">
    <STable
      x={10}
      y={10}
      colW={[110, 62, 62]}
      rowH={18}
      s={8}
      rows={[
        ['eset', 'A hozama', 'B hozama'],
        ['1. eset, p = 0,5', '22%', '−2%'],
        ['2. eset, p = 0,4', '−12%', '16%'],
        ['3. eset, p = 0,1', '8%', '10%']
      ]}
    />
  </SFig>
);

const FIG_DIST = (
  <SFig w={230} h={70} className="w-full max-w-[280px] h-auto mx-auto">
    <STable
      x={10}
      y={10}
      colW={[90, 40, 40, 40]}
      rowH={20}
      s={8.5}
      rows={[
        ['nyeremény (Ft)', 0, 100, 500],
        ['valószínűség', '0,5', 'x', '?']
      ]}
      highlight={[[1, 3]]}
    />
    <SText x={115} y={64} t="E = 130 Ft" s={8.5} c={S_AXIS} b />
  </SFig>
);

const EXPECTED_VALUE_12_QUESTIONS: QuizQuestion[] = [
  // ------------------------------- 1. szint -------------------------------
  {
    id: 'ev12-q1',
    questionTypeBadge: 'Szerencsekerék',
    level: 1,
    question: 'Mennyi a nyeremény várható értéke az ábrán látható, 6 egyenlő cikkre osztott szerencsekerék egy pörgetésénél?',
    figure: FIG_VURSTLI,
    options: ['400 Ft', '480 Ft', '600 Ft', '0 Ft'],
    correctAnswer: 0,
    explanation: 'E = (0 + 0 + 100 + 200 + 900 + 1200) / 6 = 2400 / 6 = 400 Ft. (480 Ft-ot kapnánk, ha a 0 Ft-ot csak egyszer számolnánk.)'
  },
  {
    id: 'ev12-q2',
    questionTypeBadge: 'Kockadobás',
    level: 1,
    question: 'Mennyi egy szabályos dobókockával dobott szám várható értéke?',
    options: ['3,5', '3', '4', '6'],
    correctAnswer: 0,
    explanation: 'E = (1 + 2 + 3 + 4 + 5 + 6) / 6 = 21 / 6 = 3,5. A várható érték nem feltétlenül lehetséges kimenetel.'
  },
  {
    id: 'ev12-q3',
    questionTypeBadge: 'Pénzérme',
    level: 1,
    question: 'Egy szabályos pénzérmét egyszer feldobunk. Mennyi a dobott fejek számának várható értéke?',
    options: ['0,5', '1', '0', '2'],
    correctAnswer: 0,
    explanation: 'E = 0 · ½ + 1 · ½ = 0,5.'
  },
  {
    id: 'ev12-q4',
    questionTypeBadge: 'Szerencsekerék',
    level: 1,
    question: 'Mennyi a nyeremény várható értéke az ábrán látható, 4 egyenlő cikkre osztott kerék egy pörgetésénél?',
    figure: FIG_FOUR,
    options: ['200 Ft', '800 Ft', '250 Ft', '150 Ft'],
    correctAnswer: 0,
    explanation: 'E = (0 + 100 + 200 + 500) / 4 = 800 / 4 = 200 Ft.'
  },
  {
    id: 'ev12-q5',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Mit nevezünk várható értéknek?',
    options: [
      'a lehetséges kimenetelek valószínűségekkel súlyozott átlagát',
      'a legvalószínűbb kimenetelt',
      'a lehetséges kimenetelek egyszerű átlagát, a valószínűségektől függetlenül',
      'a legnagyobb és a legkisebb kimenetel különbségét'
    ],
    correctAnswer: 0,
    explanation: 'Várható érték = a lehetséges kimeneteleknek a valószínűségekkel súlyozott átlaga: E = x₁p₁ + … + xₙpₙ.'
  },
  {
    id: 'ev12-q6',
    questionTypeBadge: 'Fogalompárok',
    level: 1,
    question: 'A statisztika melyik fogalmának felel meg a valószínűségszámításban a várható érték?',
    options: ['az átlagnak (súlyozott átlagnak)', 'a relatív gyakoriságnak', 'a módusznak', 'a terjedelemnek'],
    correctAnswer: 0,
    explanation: 'Fogalompárok: relatív gyakoriság ↔ valószínűség, átlag (súlyozott átlag) ↔ várható érték.'
  },
  {
    id: 'ev12-q7',
    questionTypeBadge: 'Vállalkozó nyeresége',
    level: 1,
    question: 'Egy szerencsekeréknél a nyeremény várható értéke 400 Ft, egy pörgetés ára 500 Ft. Mennyi a működtető várható nyeresége egy pörgetésen?',
    options: ['100 Ft', '900 Ft', '400 Ft', '−100 Ft'],
    correctAnswer: 0,
    explanation: 'A vállalkozó várható nyeresége: tét − várható nyeremény = 500 − 400 = 100 Ft.'
  },
  {
    id: 'ev12-q8',
    questionTypeBadge: 'Sorsjegy',
    level: 1,
    question: 'Egy sorsjegy 0,8 valószínűséggel nem nyer, 0,2 valószínűséggel 1000 Ft-ot nyer. Mennyi a nyeremény várható értéke?',
    options: ['200 Ft', '800 Ft', '500 Ft', '1000 Ft'],
    correctAnswer: 0,
    explanation: 'E = 0,8 · 0 + 0,2 · 1000 = 200 Ft.'
  },
  {
    id: 'ev12-q9',
    questionTypeBadge: 'Értelmezés',
    level: 1,
    question: 'Melyik állítás igaz a várható értékre?',
    options: [
      'Nem feltétlenül egyezik meg a kísérlet valamelyik lehetséges kimenetelével.',
      'Mindig a legvalószínűbb kimenetel.',
      'Mindig egész szám.',
      'Egyetlen kísérletnél biztosan ennyi lesz az eredmény.'
    ],
    correctAnswer: 0,
    explanation: 'Pl. a kockadobás várható értéke 3,5, amit nem is lehet dobni. A várható érték a sok kísérlet átlagát közelíti.'
  },
  {
    id: 'ev12-q10',
    questionTypeBadge: 'Pénzérme',
    level: 1,
    question: 'Két szabályos pénzérmét feldobunk. Mennyi a dobott fejek számának várható értéke?',
    options: ['1', '0,5', '2', '1,5'],
    correctAnswer: 0,
    explanation: 'P(0) = ¼, P(1) = ½, P(2) = ¼, így E = 0 · ¼ + 1 · ½ + 2 · ¼ = 1.'
  },
  // ------------------------------- 2. szint -------------------------------
  {
    id: 'ev12-q11',
    questionTypeBadge: 'Középponti szög',
    level: 2,
    question: 'Az ábrán látható szerencsekeréken a 1000 Ft-os cikk középponti szöge 90°, a többi rész nem nyer. Mennyi a nyeremény várható értéke?',
    figure: FIG_QUARTER,
    options: ['250 Ft', '500 Ft', '90 Ft', '333,33 Ft'],
    correctAnswer: 0,
    explanation: 'P(1000 Ft) = 90° / 360° = ¼, így E = ¼ · 1000 = 250 Ft. (500 Ft-ot kapnánk, ha a két cikket egyformán valószínűnek vennénk.)'
  },
  {
    id: 'ev12-q12',
    questionTypeBadge: 'Várható hozam',
    level: 2,
    question: 'A táblázat egy elemzői modell szerinti hozamokat mutatja. Mekkora az A részvény várható hozama?',
    figure: FIG_STOCKS,
    options: ['7%', '6%', '6,4%', '18%'],
    correctAnswer: 0,
    explanation: 'E(A) = 0,5 · 22 + 0,4 · (−12) + 0,1 · 8 = 11 − 4,8 + 0,8 = 7%. (6% az egyszerű átlag: (22 − 12 + 8) / 3.)'
  },
  {
    id: 'ev12-q13',
    questionTypeBadge: 'Várható hozam',
    level: 2,
    question: 'Ugyanebben a modellben mekkora a B részvény várható hozama?',
    figure: FIG_STOCKS,
    options: ['6,4%', '8%', '7%', '5,6%'],
    correctAnswer: 0,
    explanation: 'E(B) = 0,5 · (−2) + 0,4 · 16 + 0,1 · 10 = −1 + 6,4 + 1 = 6,4%. (8% az egyszerű átlag.)'
  },
  {
    id: 'ev12-q14',
    questionTypeBadge: 'Vegyes befektetés',
    level: 2,
    question: 'Egy befektető pénze felét az A (E = 7%), felét a B részvénybe (E = 6,4%) fekteti. Mekkora így a várható hozam?',
    options: ['6,7%', '13,4%', '6,4%', '7%'],
    correctAnswer: 0,
    explanation: 'Esetenként a hozam (22 − 2)/2 = 10%, (−12 + 16)/2 = 2%, (8 + 10)/2 = 9%; E = 0,5 · 10 + 0,4 · 2 + 0,1 · 9 = 6,7% = (7 + 6,4)/2.'
  },
  {
    id: 'ev12-q15',
    questionTypeBadge: 'Árfolyam',
    level: 2,
    question: 'Egy részvény jövő évi árfolyama 0,3 valószínűséggel 5640 Ft, 0,6 valószínűséggel 5710 Ft, 0,1 valószínűséggel 5120 Ft. Mennyi az árfolyam várható értéke?',
    options: ['5630 Ft', '5490 Ft', '5710 Ft', '5675 Ft'],
    correctAnswer: 0,
    explanation: '0,3 · 5640 + 0,6 · 5710 + 0,1 · 5120 = 1692 + 3426 + 512 = 5630 Ft. (5490 Ft az egyszerű átlag.)'
  },
  {
    id: 'ev12-q16',
    questionTypeBadge: 'Céltábla',
    level: 2,
    question: 'A céltábla belső körének átmérője feleakkora, mint a külsőé, a két átmérő merőleges. Egy nyílvessző véletlenszerűen eltalálja. Mennyi a találat értékének várható értéke?',
    figure: FIG_TARGET,
    options: ['22,5', '30', '15', '26,25'],
    correctAnswer: 0,
    explanation: 'A belső kör területe a teljes ¼-e. P(40) = P(50) = 2 · 1/16 = 1/8, P(10) = P(20) = 2 · 3/16 = 3/8. E = (3 · 10 + 3 · 20 + 40 + 50) / 8 = 180 / 8 = 22,5. (30 az értékek egyszerű átlaga.)'
  },
  {
    id: 'ev12-q17',
    questionTypeBadge: 'Kockadobás',
    level: 2,
    question: 'Egy játékban a nyeremény a kockával dobott szám négyzete (forintban). Mennyi a nyeremény várható értéke?',
    options: ['≈ 15,17 Ft', '12,25 Ft', '21 Ft', '18 Ft'],
    correctAnswer: 0,
    explanation: 'E = (1 + 4 + 9 + 16 + 25 + 36) / 6 = 91 / 6 ≈ 15,17 Ft. (12,25 = 3,5² – a várható érték négyzete nem a négyzet várható értéke.)'
  },
  {
    id: 'ev12-q18',
    questionTypeBadge: 'Pénzérme',
    level: 2,
    question: 'Három szabályos pénzérmét feldobunk. Mennyi a dobott fejek számának várható értéke?',
    options: ['1,5', '1', '2', '3/8'],
    correctAnswer: 0,
    explanation: 'P(0) = 1/8, P(1) = 3/8, P(2) = 3/8, P(3) = 1/8; E = (0 + 3 + 6 + 3) / 8 = 12 / 8 = 1,5.'
  },
  {
    id: 'ev12-q19',
    questionTypeBadge: 'Sorsjegy',
    level: 2,
    question: '1000 sorsjegy 80%-a nem nyer, 10%-án 700 Ft, 9%-án 2000 Ft, a többin 10 000 Ft a nyeremény. Mennyi egy sorsjegy nyereményének várható értéke?',
    options: ['350 Ft', '3175 Ft', '1270 Ft', '250 Ft'],
    correctAnswer: 0,
    explanation: 'A többi 1%. E = 0,1 · 700 + 0,09 · 2000 + 0,01 · 10 000 = 70 + 180 + 100 = 350 Ft.'
  },
  {
    id: 'ev12-q20',
    questionTypeBadge: 'Kupon',
    level: 2,
    question: 'A kuponok 90%-a 1000 Ft, 8%-a 2000 Ft, a többi 8000 Ft értékű. Mennyi egy kupon értékének várható értéke?',
    options: ['1220 Ft', '3667 Ft', '1060 Ft', '1160 Ft'],
    correctAnswer: 0,
    explanation: 'A többi 2%. E = 0,9 · 1000 + 0,08 · 2000 + 0,02 · 8000 = 900 + 160 + 160 = 1220 Ft.'
  },
  // ------------------------------- 3. szint -------------------------------
  {
    id: 'ev12-q21',
    questionTypeBadge: 'Hiányzó valószínűség',
    level: 3,
    question: 'A táblázat egy játék nyereményeit mutatja. A nyeremény várható értéke 130 Ft. Mennyi annak a valószínűsége, hogy 500 Ft-ot nyerünk?',
    figure: FIG_DIST,
    options: ['0,2', '0,3', '0,26', '0,5'],
    correctAnswer: 0,
    explanation: 'P(100) = x, P(500) = 0,5 − x. 100x + 500(0,5 − x) = 130 → 250 − 400x = 130 → x = 0,3, így P(500) = 0,2. (0,3 a 100 Ft valószínűsége.)'
  },
  {
    id: 'ev12-q22',
    questionTypeBadge: 'Tét meghatározása',
    level: 3,
    question: 'Egy kockajátékban hatos dobásnál 600 Ft-ot nyerünk, egyébként semmit. Mekkora legyen a tét, hogy hosszú távon se a játékos, se a szervező ne nyerjen?',
    options: ['100 Ft', '600 Ft', '500 Ft', '120 Ft'],
    correctAnswer: 0,
    explanation: 'E = 600 · 1/6 = 100 Ft. Ha a tét éppen a várható nyeremény, a nettó nyereség várható értéke 0.'
  },
  {
    id: 'ev12-q23',
    questionTypeBadge: 'Várható hozam',
    level: 3,
    question: 'Egy részvény jelenlegi árfolyama 5330 Ft, jövő évi árfolyamának várható értéke 5630 Ft. Mekkora a várható hozam (két tizedesjegyre)?',
    options: ['5,63%', '5,33%', '300%', '94,67%'],
    correctAnswer: 0,
    explanation: '5630 / 5330 ≈ 1,0563, tehát a várható hozam ≈ 5,63%. (300 Ft a növekedés forintban.)'
  },
  {
    id: 'ev12-q24',
    questionTypeBadge: 'Középponti szög',
    level: 3,
    question: 'Mennyi a nyeremény várható értéke az ábrán látható szerencsekerék egy pörgetésénél (két tizedesjegyre)?',
    figure: FIG_ANGLES,
    options: ['≈ 1102,78 Ft', '1320 Ft', '≈ 1020,83 Ft', '≈ 1250,00 Ft'],
    correctAnswer: 0,
    explanation: 'E = (300 · 80 + 2000 · 60 + 400 · 100 + 900 · 70 + 3000 · 50) / 360 = 397 000 / 360 ≈ 1102,78 Ft. (1320 Ft az öt nyeremény egyszerű átlaga.)'
  },
  {
    id: 'ev12-q25',
    questionTypeBadge: 'Kockázat (szórás)',
    level: 3,
    question: 'Az A részvény hozama 0,5 valószínűséggel 22%, 0,4 valószínűséggel −12%, 0,1 valószínűséggel 8%; várható hozama 7%. Mekkora a hozam szórása?',
    figure: FIG_STOCKS,
    options: ['≈ 16,0%', '257%', '≈ 14,3%', '≈ 8,6%'],
    correctAnswer: 0,
    explanation: 'Eltérések: 15, −19, 1. Szórásnégyzet: 0,5 · 225 + 0,4 · 361 + 0,1 · 1 = 257, σ = √257 ≈ 16,0%. (257 a szórásnégyzet, 8,6% a B részvény szórása.)'
  },
  {
    id: 'ev12-q26',
    questionTypeBadge: 'Diverzifikáció',
    level: 3,
    question: 'A pénz fele az A, fele a B részvényben: a hozam 0,5 valószínűséggel 10%, 0,4-del 2%, 0,1-del 9%, várható értéke 6,7%. Mekkora a szórás?',
    options: ['≈ 3,85%', '≈ 12,3%', '≈ 14,81%', '≈ 1,93%'],
    correctAnswer: 0,
    explanation: 'Eltérések: 3,3; −4,7; 2,3. Szórásnégyzet: 0,5 · 10,89 + 0,4 · 22,09 + 0,1 · 5,29 = 14,81, σ ≈ 3,85% – kisebb, mint az A (16,0%) és a B (8,6%) kockázata. (≈ 12,3% a két szórás átlaga lenne.)'
  },
  {
    id: 'ev12-q27',
    questionTypeBadge: 'Középponti szög',
    level: 3,
    question: 'Mennyi a nyeremény várható értéke az ábrán látható szerencsekerék egy pörgetésénél (két tizedesjegyre)?',
    figure: FIG_TP_WHEEL,
    options: ['≈ 1166,67 Ft', '2175 Ft', '≈ 1083,33 Ft', '≈ 1416,67 Ft'],
    correctAnswer: 0,
    explanation: 'E = (3000 · 60 + 200 · 150 + 5000 · 30 + 500 · 120) / 360 = 420 000 / 360 ≈ 1166,67 Ft. (2175 Ft a négy nyeremény egyszerű átlaga.)'
  },
  {
    id: 'ev12-q28',
    questionTypeBadge: 'Két kocka',
    level: 3,
    question: 'Két szabályos dobókockával dobunk. Mennyi a dobott számok összegének várható értéke?',
    options: ['7', '6', '3,5', '12'],
    correctAnswer: 0,
    explanation: 'A 36 egyformán valószínű dobáspár összegeinek súlyozott átlaga 7 – vagy egyszerűbben: 3,5 + 3,5 = 7. (A 7 egyben a legvalószínűbb összeg is.)'
  },
  {
    id: 'ev12-q29',
    questionTypeBadge: 'Szervező haszna',
    level: 3,
    question: 'Egy sorsjegy nyereményének várható értéke 350 Ft, ára 500 Ft. Mennyi a kereskedő haszna, ha mind az 1000 sorsjegyet eladja?',
    options: ['150 000 Ft', '350 000 Ft', '500 000 Ft', '150 Ft'],
    correctAnswer: 0,
    explanation: 'Bevétel 1000 · 500 = 500 000 Ft, kifizetett nyeremény 1000 · 350 = 350 000 Ft, a haszon 150 000 Ft.'
  },
  {
    id: 'ev12-q30',
    questionTypeBadge: 'Dobások száma',
    level: 3,
    question: 'Egy érmét addig dobunk fel, amíg fejet nem kapunk, de legfeljebb háromszor. Mennyi a dobások számának várható értéke?',
    options: ['1,75', '2', '1,5', '2,25'],
    correctAnswer: 0,
    explanation: 'P(1 dobás) = ½, P(2) = ¼, P(3) = ¼ (a 3. dobás után mindenképp megállunk). E = 1 · ½ + 2 · ¼ + 3 · ¼ = 1,75.'
  }
];

export const ExpectedValue12Quiz: React.FC<{
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
      topicId="g12-stat-varhato-ertek-quiz"
      subtopicId="a-varhato-ertek"
      title="9. A várható érték – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: szerencsekerekek, sorsjegyek, várható hozam és kockázat."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      questions={EXPECTED_VALUE_12_QUESTIONS}
      cheatSheets={[
        {
          title: 'A várható érték',
          items: [
            'E = x₁ · p₁ + x₂ · p₂ + … + xₙ · pₙ',
            'p₁ + p₂ + … + pₙ = 1',
            'Csak akkor értelmezhető, ha minden kimenetel valós szám.',
            'Nem azonos a legvalószínűbb eredménnyel.'
          ]
        },
        {
          title: 'Szerencsekerék, játékok',
          items: [
            'Cikk valószínűsége: középponti szög / 360°.',
            'Szervező várható nyeresége: tét − E(nyeremény).',
            'Kocka: E = 3,5; n érme fejeinek száma: E = n / 2.',
            'Két kocka összege: E = 7.'
          ]
        },
        {
          title: 'Hozam és kockázat',
          items: [
            'Várható hozam: a hozamok valószínűségekkel súlyozott átlaga.',
            'Szórásnégyzet: (xᵢ − E)² súlyozott átlaga; szórás: ennek gyöke.',
            'A: 7%, σ ≈ 16,0%; B: 6,4%, σ ≈ 8,6%; fele-fele: 6,7%, σ ≈ 3,85%.',
            'Diverzifikáció: több befektetéssel csökkenhet a kockázat.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ExpectedValue12Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ExpectedValue12Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ExpectedValue12Quiz;
