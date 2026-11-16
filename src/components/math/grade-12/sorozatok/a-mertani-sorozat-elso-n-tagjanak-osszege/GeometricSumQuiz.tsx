import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { GeometricSumMatcher } from './GeometricSumMatcher';
import { GeometricSumSorter } from './GeometricSumSorter';
import { QFig, SeqBarChart, SText, S_BLUE, S_RED, S_AMBER, S_GREEN } from './seqKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const FIG_Q1 = (
  <QFig>
    <SeqBarChart values={[3, 6, 12, 24, 48]} x={30} y={20} w={190} h={110} showValues valueDigits={0} />
    <SText x={120} y={156} t="a₁ = 3, q = 2 · S₅ = ?" s={11} c={S_RED} b />
  </QFig>
);

const FIG_Q6 = (
  <QFig>
    <SeqBarChart values={[5, -5, 5, -5, 5, -5, 5, -5]} x={30} y={16} w={190} h={110} />
    <SText x={120} y={156} t="a₁ = 5, q = −1 · S₈ = ?" s={11} c={S_RED} b />
  </QFig>
);

const FIG_CHESS = (
  <QFig>
    {Array.from({ length: 16 }, (_, k) => {
      const r = Math.floor(k / 8);
      const c = k % 8;
      return <rect key={k} x={12 + c * 27} y={60 + (1 - r) * 27} width={27} height={27} fill={(r + c) % 2 === 0 ? '#78350f' : '#fde68a'} opacity={0.85} />;
    })}
    {['1', '2', '4', '8'].map((t, c) => (
      <SText key={t} x={25.5 + c * 27} y={108} t={t} s={10} c={c % 2 === 0 ? '#fef3c7' : '#0f172a'} b />
    ))}
    <SText x={120} y={40} t="minden mezőn kétszer annyi szem" s={10.5} />
    <SText x={120} y={150} t="(a sakktábla alsó két sora)" s={10} c="#475569" />
  </QFig>
);

const FIG_Q11 = (
  <QFig>
    <SeqBarChart values={Array.from({ length: 20 }, (_, i) => 600 * 0.9 ** i)} x={30} y={16} w={196} h={110} labelEvery={5} highlight={[0]} />
    <SText x={36} y={26} t="600" s={9.5} c={S_AMBER} a="start" />
    <SText x={120} y={156} t="q = 0,9 · 20 nap · S₂₀ = ?" s={11} c={S_RED} b />
  </QFig>
);

const FIG_Q14 = (
  <QFig>
    {[1, 2, 4, 8].map((cnt, r) => {
      const y = 132 - r * 32;
      return (
        <g key={r}>
          {Array.from({ length: cnt }, (_, i) => (
            <circle key={i} cx={20 + (170 / cnt) * (i + 0.5)} cy={y} r={6} fill={r === 0 ? S_AMBER : S_BLUE} />
          ))}
          <SText x={212} y={y + 4} t={r === 0 ? 'én' : String(cnt)} s={10.5} c={r === 0 ? S_AMBER : S_BLUE} b />
        </g>
      );
    })}
    <SText x={120} y={20} t="… 10 generáció: összesen ? ős" s={10.5} c={S_RED} b />
  </QFig>
);

const FIG_Q19 = (
  <QFig>
    <SeqBarChart values={[8, 9.6, 11.52, 13.82, 16.59, 19.91]} x={30} y={30} w={190} h={96} maxV={25} showValues valueDigits={1} />
    <SText x={120} y={18} t="minden nap 20%-kal hosszabb darab" s={10} />
    <SText x={120} y={156} t="Hányadik napon lesz kész a 2 m-es sál?" s={10.5} c={S_RED} b />
  </QFig>
);

const FIG_Q29 = (
  <QFig>
    <SeqBarChart values={Array.from({ length: 22 }, (_, i) => 600 * 0.9 ** i)} x={30} y={14} w={196} h={112} refY={100} refLabel="100" labelEvery={5} />
    <SText x={120} y={156} t="Mikor lesz a napi szám először 100 alatt?" s={10.5} c={S_RED} b />
  </QFig>
);

const FIG_Q30 = (
  <QFig>
    <SeqBarChart
      values={Array.from({ length: 12 }, (_, i) => 600 * 0.9 ** i)}
      line={Array.from({ length: 12 }, (_, i) => 6000 * (1 - 0.9 ** (i + 1)))}
      x={30}
      y={14}
      w={196}
      h={112}
      maxV={6500}
      lineColor={S_GREEN}
    />
    <SText x={120} y={156} t="zöld: Sₙ – melyik szám alatt marad?" s={10.5} c={S_RED} b />
  </QFig>
);

const GEOMETRIC_SUM_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'gs-q1',
    questionTypeBadge: 'Összegképlet',
    figure: FIG_Q1,
    level: 1,
    question: 'Egy mértani sorozat első tagja 3, kvóciense 2. Mennyi az első 5 tag összege?',
    options: ['93', '45', '96', '48'],
    correctAnswer: 0,
    explanation: 'S₅ = 3 · (2⁵ − 1) / (2 − 1) = 3 · 31 = 93. Ellenőrzés: 3 + 6 + 12 + 24 + 48 = 93.'
  },
  {
    id: 'gs-q2',
    questionTypeBadge: 'Összegképlet',
    level: 1,
    question: 'Mennyi az 1; 3; 9; 27; … mértani sorozat első 4 tagjának összege?',
    options: ['40', '27', '121', '81'],
    correctAnswer: 0,
    explanation: 'a₁ = 1, q = 3: S₄ = (3⁴ − 1) / (3 − 1) = 80 / 2 = 40 (1 + 3 + 9 + 27).'
  },
  {
    id: 'gs-q3',
    questionTypeBadge: 'q = 1 eset',
    level: 1,
    question: 'Egy mértani sorozat első tagja 7, kvóciense 1. Mennyi az első 10 tag összege?',
    options: ['70', '7', '10', 'nem értelmezhető, mert 0-val osztanánk'],
    correctAnswer: 0,
    explanation: 'q = 1 esetén minden tag 7, így S₁₀ = 10 · 7 = 70. Az a₁(qⁿ − 1)/(q − 1) képlet itt nem használható, de az összeg létezik.'
  },
  {
    id: 'gs-q4',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik a mértani sorozat első n tagjának összegképlete, ha q ≠ 1?',
    options: ['Sₙ = a₁ · (qⁿ − 1) / (q − 1)', 'Sₙ = a₁ · (qⁿ⁻¹ − 1) / (q − 1)', 'Sₙ = (a₁ + aₙ) / 2 · n', 'Sₙ = a₁ · qⁿ⁻¹'],
    correctAnswer: 0,
    explanation: 'q · Sₙ − Sₙ = a₁qⁿ − a₁, ebből Sₙ = a₁(qⁿ − 1)/(q − 1). A (a₁ + aₙ)/2 · n a számtani sorozat összege, az a₁qⁿ⁻¹ pedig az n-edik tag.'
  },
  {
    id: 'gs-q5',
    questionTypeBadge: 'Kettő hatványai',
    level: 1,
    question: 'Mennyi az 1 + 2 + 4 + … + 2⁹ összeg?',
    options: ['1023', '1024', '512', '2047'],
    correctAnswer: 0,
    explanation: 'Ez 10 tag (2⁰-tól 2⁹-ig): S₁₀ = (2¹⁰ − 1)/(2 − 1) = 1023.'
  },
  {
    id: 'gs-q6',
    questionTypeBadge: 'Váltakozó előjel',
    figure: FIG_Q6,
    level: 1,
    question: 'Egy mértani sorozat első tagja 5, kvóciense −1. Mennyi az első 8 tag összege?',
    options: ['0', '5', '−5', '40'],
    correctAnswer: 0,
    explanation: 'A tagok 5; −5; 5; −5; … – párosával kiejtik egymást, 8 tagnál S₈ = 0. Képlettel: 5 · ((−1)⁸ − 1)/(−2) = 0.'
  },
  {
    id: 'gs-q7',
    questionTypeBadge: 'Összegképlet',
    level: 1,
    question: 'Mennyi a 2 + 6 + 18 + 54 + 162 összeg?',
    options: ['242', '486', '240', '162'],
    correctAnswer: 0,
    explanation: 'a₁ = 2, q = 3, n = 5: S₅ = 2 · (3⁵ − 1)/2 = 243 − 1 = 242.'
  },
  {
    id: 'gs-q8',
    questionTypeBadge: 'Csökkenő sorozat',
    level: 1,
    question: 'Egy mértani sorozat első tagja 64, kvóciense 0,5. Mennyi az első 6 tag összege?',
    options: ['126', '128', '63', '192'],
    correctAnswer: 0,
    explanation: '64 + 32 + 16 + 8 + 4 + 2 = 126; képlettel 64 · (1 − 0,5⁶)/(1 − 0,5) = 128 · 63/64 = 126.'
  },
  {
    id: 'gs-q9',
    questionTypeBadge: 'Levezetés',
    level: 1,
    question: 'Az összegképlet levezetésénél miért vonjuk ki q · Sₙ-ből Sₙ-t?',
    options: [
      'Mert a két összeg közbülső tagjai megegyeznek, így csak két tag marad: a₁qⁿ − a₁',
      'Mert így az összes tag kiesik, és Sₙ = 0 adódik',
      'Mert így megkapjuk a sorozat n-edik tagját',
      'Mert a kivonás után a kvóciens kiesik a képletből'
    ],
    correctAnswer: 0,
    explanation: 'q·Sₙ = a₁q + … + a₁qⁿ és Sₙ = a₁ + a₁q + … + a₁qⁿ⁻¹ közös tagjai kiesnek: q·Sₙ − Sₙ = a₁qⁿ − a₁.'
  },
  {
    id: 'gs-q10',
    questionTypeBadge: 'Sakktábla',
    figure: FIG_CHESS,
    level: 1,
    question: 'Sissa kérése szerint hány búzaszem kerül a sakktábla 64. (utolsó) mezőjére?',
    options: ['2⁶³', '2⁶⁴', '2⁶⁴ − 1', '64 · 2'],
    correctAnswer: 0,
    explanation: 'A k-adik mezőn 2ᵏ⁻¹ szem van, így a 64. mezőn 2⁶³. Az összes mezőn együtt 2⁶⁴ − 1 szem van.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'gs-q11',
    questionTypeBadge: 'Járvány',
    figure: FIG_Q11,
    level: 2,
    question: 'Egy járvány csökkenő fázisában az első napon 600 új megbetegedés van, és mindennap az előző napi szám 90%-a. Kb. hányan betegednek meg az első 20 nap alatt?',
    options: ['≈ 5271', '12 000', '6000', '≈ 5189'],
    correctAnswer: 0,
    explanation: 'a₁ = 600, q = 0,9: S₂₀ = 600 · (0,9²⁰ − 1)/(0,9 − 1) ≈ 5271. (12 000 = 20 · 600 lenne változatlan számnál; ≈ 5189 csak 19 nap.)'
  },
  {
    id: 'gs-q12',
    questionTypeBadge: 'Két tagból',
    level: 2,
    question: 'Egy mértani sorozat első tagja 18, második tagja 27. Mennyi az első négy tag összege?',
    options: ['146,25', '60,75', '85,5', '237,375'],
    correctAnswer: 0,
    explanation: 'q = 27/18 = 1,5. S₄ = 18 + 27 + 40,5 + 60,75 = 146,25 (vagy 18 · (1,5⁴ − 1)/0,5).'
  },
  {
    id: 'gs-q13',
    questionTypeBadge: 'Váltakozó előjel',
    level: 2,
    question: 'Egy mértani sorozat első tagja 49, kvóciense −1. Mennyi az első 79 tag összege?',
    options: ['49', '0', '−49', '3871'],
    correctAnswer: 0,
    explanation: '78 tag párosával 0-t ad, a 79. tag 49: S₇₉ = 49 · ((−1)⁷⁹ − 1)/(−2) = 49.'
  },
  {
    id: 'gs-q14',
    questionTypeBadge: 'Családfa',
    figure: FIG_Q14,
    level: 2,
    question: 'Összesen hány ősünket kellene felkutatni, ha 10 generációra visszamenőleg (szülők, nagyszülők, …) mindegyikükről tudni szeretnénk valamit?',
    options: ['2046', '1024', '2048', '1022'],
    correctAnswer: 0,
    explanation: '2 + 4 + … + 2¹⁰: a₁ = 2, q = 2, n = 10, S₁₀ = 2 · (2¹⁰ − 1) = 2046. (1024 csak a 10. generáció.)'
  },
  {
    id: 'gs-q15',
    questionTypeBadge: 'Tagszám',
    level: 2,
    question: 'Egy mértani sorozat első tagja 2, kvóciense 3. Hány tagot adtunk össze, ha az összeg 177 146?',
    options: ['11', '10', '12', '9'],
    correctAnswer: 0,
    explanation: '2 · (3ⁿ − 1)/(3 − 1) = 3ⁿ − 1 = 177 146 ⇒ 3ⁿ = 177 147 = 3¹¹ ⇒ n = 11.'
  },
  {
    id: 'gs-q16',
    questionTypeBadge: 'Összegképlet',
    level: 2,
    question: 'Mennyi az 1 + 10 + 100 + … mértani sorozat első 6 tagjának összege?',
    options: ['111 111', '1 000 000', '100 000', '111 110'],
    correctAnswer: 0,
    explanation: 'S₆ = (10⁶ − 1)/(10 − 1) = 999 999 / 9 = 111 111.'
  },
  {
    id: 'gs-q17',
    questionTypeBadge: 'Fogyókúra',
    level: 2,
    question: 'Egy 120 kg-os ember hetente aktuális súlyának 1,5%-át adja le. Kb. hány kilót fogy 5 hét alatt?',
    options: ['≈ 8,73 kg', '9 kg', '≈ 111,27 kg', '7,5 kg'],
    correctAnswer: 0,
    explanation: 'A heti fogyások: 1,8; 1,8 · 0,985; … ⇒ S₅ = 1,8 · (1 − 0,985⁵)/0,015 ≈ 8,73 kg (= 120 − 120 · 0,985⁵). A 9 kg minden héten 1,8 kg-mal számolna.'
  },
  {
    id: 'gs-q18',
    questionTypeBadge: 'Hízás',
    level: 2,
    question: 'Egy 42 kg-osra lefogyott ember hetente súlyának 1%-át nyeri vissza. Hány hét után éri el ismét a 65 kg-ot?',
    options: ['44 hét', '43 hét', '55 hét', '23 hét'],
    correctAnswer: 0,
    explanation: '42 · 1,01ⁿ ≥ 65 ⇒ n ≥ lg(65/42)/lg 1,01 ≈ 43,9 ⇒ a 44. hét után. (55 hét akkor lenne, ha mindig a 42 kg 1%-át hízná.)'
  },
  {
    id: 'gs-q19',
    questionTypeBadge: 'Érettségi 2007',
    figure: FIG_Q19,
    level: 2,
    question: 'Szabó nagymama az első napon 8 cm sálat köt, és minden további napon 20%-kal többet, mint előző nap. Hány nap alatt készül el a 2 méteres sál?',
    options: ['10 nap', '9 nap', '25 nap', '12 nap'],
    correctAnswer: 0,
    explanation: '8 · (1,2ⁿ − 1)/0,2 ≥ 200 ⇒ 1,2ⁿ ≥ 6 ⇒ n ≥ 9,83. S₉ ≈ 166,4 cm, S₁₀ ≈ 207,7 cm, tehát 10 nap.'
  },
  {
    id: 'gs-q20',
    questionTypeBadge: 'Negatív kvóciens',
    level: 2,
    question: 'Egy mértani sorozat első tagja 3, kvóciense −2. Mennyi az első 6 tag összege?',
    options: ['−63', '63', '189', '−189'],
    correctAnswer: 0,
    explanation: 'S₆ = 3 · ((−2)⁶ − 1)/(−2 − 1) = 3 · 63/(−3) = −63. Ellenőrzés: 3 − 6 + 12 − 24 + 48 − 96 = −63.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'gs-q21',
    questionTypeBadge: 'Két megoldás',
    level: 3,
    question: 'Egy mértani sorozat második tagja 20, negyedik tagja 500. Mennyi lehet az első hat tag összege?',
    options: ['15 624 vagy 10 416', 'csak 15 624', '15 624 vagy −15 624', 'csak 10 416'],
    correctAnswer: 0,
    explanation: 'q² = 25 ⇒ q = 5 (a₁ = 4, S₆ = 4 · 15 624/4 = 15 624) vagy q = −5 (a₁ = −4, S₆ = −4 · 15 624/(−6) = 10 416).'
  },
  {
    id: 'gs-q22',
    questionTypeBadge: 'Járványterjedés',
    level: 3,
    question: 'Egy tartományban az első héten 520 sertés fertőződik meg, és az új fertőzések száma hetente 35%-kal nő. Kb. hány sertés fertőződik meg összesen 5 hét alatt?',
    options: ['≈ 5176', '2600', '≈ 1727', '≈ 3449'],
    correctAnswer: 0,
    explanation: 'a₁ = 520, q = 1,35: S₅ = 520 · (1,35⁵ − 1)/0,35 ≈ 5176. (≈ 1727 csak az 5. heti szám, ≈ 3449 a 4 heti összeg.)'
  },
  {
    id: 'gs-q23',
    questionTypeBadge: 'Tagszám',
    level: 3,
    question: 'Egy mértani sorozat első tagja 512, kvóciense 0,5, az első n tag összege 1023. Mennyi n?',
    options: ['10', '9', '11', '512'],
    correctAnswer: 0,
    explanation: '512 · (1 − 0,5ⁿ)/0,5 = 1024 · (1 − 0,5ⁿ) = 1023 ⇒ 0,5ⁿ = 1/1024 ⇒ n = 10 (az utolsó tag a₁₀ = 1).'
  },
  {
    id: 'gs-q24',
    questionTypeBadge: 'Egyenlőtlenség',
    level: 3,
    question: 'Legalább hány tagját kell összeadni az 1; 2; 4; 8; … sorozatnak, hogy az összeg nagyobb legyen 1000-nél?',
    options: ['10', '9', '11', '500'],
    correctAnswer: 0,
    explanation: '2ⁿ − 1 > 1000 ⇒ 2ⁿ > 1001 ⇒ n ≥ 10 (S₉ = 511, S₁₀ = 1023).'
  },
  {
    id: 'gs-q25',
    questionTypeBadge: 'Logaritmus',
    level: 3,
    question: 'A 120 kg-os ember hetente súlyának 1,5%-át adja le. Hány hét múlva lesz legfeljebb 85 kg-os?',
    options: ['23 hét', '22 hét', '19 hét', '35 hét'],
    correctAnswer: 0,
    explanation: '120 · 0,985ⁿ ≤ 85 ⇒ n ≥ lg(85/120)/lg 0,985 ≈ 22,8 ⇒ 23 hét. (19 hét: 35 kg/1,8 kg lineáris becslés.)'
  },
  {
    id: 'gs-q26',
    questionTypeBadge: 'Sakktábla',
    figure: FIG_CHESS,
    level: 3,
    question: 'Hány búzaszem van összesen a sakktábla első 32 mezőjén Sissa szabálya szerint?',
    options: ['4 294 967 295', '4 294 967 296', '2 147 483 648', '2 147 483 647'],
    correctAnswer: 0,
    explanation: 'S₃₂ = 2³² − 1 = 4 294 967 295. (2³¹ = 2 147 483 648 a 32. mezőn lévő szemek száma.)'
  },
  {
    id: 'gs-q27',
    questionTypeBadge: 'Képletátalakítás',
    level: 3,
    question: 'Melyik kifejezés egyenlő a₁ · (qⁿ − 1)/(q − 1)-gyel minden q ≠ 1 esetén?',
    options: ['a₁ · (1 − qⁿ)/(1 − q)', 'a₁ · (1 − qⁿ)/(q − 1)', 'a₁ · (qⁿ − 1)/(1 − q)', 'a₁ · qⁿ/(q − 1)'],
    correctAnswer: 0,
    explanation: 'A számlálót és a nevezőt is −1-gyel szorozva a tört értéke nem változik: (qⁿ − 1)/(q − 1) = (1 − qⁿ)/(1 − q). Ez 0 < q < 1 esetén kényelmesebb.'
  },
  {
    id: 'gs-q28',
    questionTypeBadge: 'Összegből sorozat',
    level: 3,
    question: 'Egy mértani sorozat első n tagjának összege minden n-re Sₙ = 3ⁿ − 1. Mennyi a sorozat első tagja és kvóciense?',
    options: ['a₁ = 2, q = 3', 'a₁ = 3, q = 3', 'a₁ = 1, q = 3', 'a₁ = 2, q = 2'],
    correctAnswer: 0,
    explanation: 'a₁ = S₁ = 2, a₂ = S₂ − S₁ = 8 − 2 = 6 ⇒ q = 3. Valóban: 2 · (3ⁿ − 1)/(3 − 1) = 3ⁿ − 1.'
  },
  {
    id: 'gs-q29',
    questionTypeBadge: 'Járvány',
    figure: FIG_Q29,
    level: 3,
    question: 'A járványmodellben (a₁ = 600, q = 0,9) hányadik napon lesz az új megbetegedések száma először 100-nál kevesebb?',
    options: ['a 19. napon', 'a 18. napon', 'a 17. napon', 'a 6. napon'],
    correctAnswer: 0,
    explanation: '600 · 0,9ⁿ⁻¹ < 100 ⇒ n − 1 > lg(1/6)/lg 0,9 ≈ 17,01 ⇒ n − 1 ≥ 18 ⇒ n = 19 (a₁₈ ≈ 100,06, a₁₉ ≈ 90,06).'
  },
  {
    id: 'gs-q30',
    questionTypeBadge: 'Korlát',
    figure: FIG_Q30,
    level: 3,
    question: 'A járványmodellben (a₁ = 600, q = 0,9) akármeddig tart is a folyamat, az összes megbetegedés száma melyik számot nem éri el soha?',
    options: ['6000', '5271', '12 000', '≈ 667'],
    correctAnswer: 0,
    explanation: 'Sₙ = 600 · (1 − 0,9ⁿ)/(1 − 0,9) = 6000 · (1 − 0,9ⁿ) < 6000, mert 0,9ⁿ > 0. A 5271 csak 20 nap összege, amit el is ér.'
  }
];

export const GeometricSumQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="sorozatok"
      topicId="g12-seq-mertani-osszeg-quiz"
      subtopicId="a-mertani-sorozat-elso-n-tagjanak-osszege"
      title="6. A mértani sorozat első n tagjának összege – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: összegképlet, q = 1 és negatív q, ismeretlen tagszám, járvány, sál, sakktábla."
      badge="12. OSZTÁLY • II. SOROZATOK • KVÍZ"
      questions={GEOMETRIC_SUM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az összegképlet',
          items: [
            'Sₙ = a₁ + a₁q + … + a₁qⁿ⁻¹ (n tag).',
            'q ≠ 1: Sₙ = a₁ · (qⁿ − 1)/(q − 1).',
            'q = 1: Sₙ = n · a₁.',
            '0 < q < 1: Sₙ = a₁ · (1 − qⁿ)/(1 − q).'
          ]
        },
        {
          title: 'Ismeretlen n',
          items: [
            'Rendezzük qⁿ = … alakra.',
            'n = lg(…)/lg q (logaritmussal).',
            'Egyenlőtlenségnél a legkisebb egész n kell.',
            '0 < q < 1 esetén lg q < 0: a reláció megfordul!'
          ]
        },
        {
          title: 'Nevezetes összegek',
          items: [
            '1 + 2 + 4 + … + 2ⁿ⁻¹ = 2ⁿ − 1.',
            'Sakktábla: 2⁶⁴ − 1 ≈ 1,84 · 10¹⁹ szem.',
            'q = −1: Sₙ = a₁ (n páratlan) vagy 0 (n páros).',
            'Járvány: S₂₀ = 600 · (0,9²⁰ − 1)/(0,9 − 1) ≈ 5271.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <GeometricSumMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <GeometricSumSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default GeometricSumQuiz;
