import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SequencesPracticeExamMatcher } from './SequencesPracticeExamMatcher';
import { SequencesPracticeExamSorter } from './SequencesPracticeExamSorter';
import { QFig, SeqBarChart, SText, S_BLUE, S_RED, S_GREEN, S_AMBER, S_INK, S_PURPLE } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const pointsFig = (v: number[], caption: string, c = S_BLUE) => (
  <QFig>
    <SeqBarChart values={v} x={30} y={16} w={190} h={110} points color={c} showValues valueDigits={0} />
    <SText x={120} y={156} t={caption} s={10.5} c={S_RED} b />
  </QFig>
);

const FIG_STAIRS = (
  <QFig>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={30 + i * 40} y={130 - (i + 1) * 24} width={40} height={(i + 1) * 24} fill={i % 2 ? '#e0e7ff' : '#c7d2fe'} stroke={S_BLUE} />
    ))}
    {['1', '2', '3', '?'].map((t, i) => (
      <SText key={i} x={50 + i * 40} y={124 - (i + 1) * 24} t={t} s={12} c={S_RED} b />
    ))}
    <SText x={120} y={150} t="egyszerre 1 vagy 2 fok" s={10.5} c={S_INK} />
  </QFig>
);

const FIG_SQUARES = (
  <QFig>
    {[0, 1, 2, 3].map((k) => {
      const s = 110 / Math.SQRT2 ** k;
      const cx = 120;
      const cy = 78;
      const pts =
        k % 2 === 0
          ? [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy + s / 2]]
          : [[cx, cy - s / Math.SQRT2], [cx + s / Math.SQRT2, cy], [cx, cy + s / Math.SQRT2], [cx - s / Math.SQRT2, cy]];
      return <polygon key={k} points={pts.map((p) => p.join(',')).join(' ')} fill={['#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8'][k]} stroke={S_INK} strokeWidth="1.2" />;
    })}
    <SText x={120} y={152} t="8 cm oldalú négyzet, oldalfelező pontok" s={10} c={S_INK} />
  </QFig>
);

const FIG_NAILS = (
  <QFig>
    <SeqBarChart values={[1, 2, 4, 8, 16, 32, 64, 128]} x={30} y={16} w={190} h={110} showValues valueDigits={0} color={S_AMBER} />
    <SText x={120} y={156} t="patkószegek ára (fillér): 1, 2, 4, …" s={10.5} c={S_RED} b />
  </QFig>
);

const FIG_INHERIT = (
  <QFig>
    {Array.from({ length: 7 }, (_, k) => {
      const prev = 1 - 0.8 ** k;
      const p = 0.2 * 0.8 ** k;
      return <rect key={k} x={14 + prev * 212} y={56} width={p * 212} height={40} fill={['#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'][k]} stroke="#fff" />;
    })}
    <rect x={14 + (1 - 0.8 ** 7) * 212} y={56} width={0.8 ** 7 * 212} height={40} fill={S_GREEN} opacity={0.7} />
    <SText x={120} y={40} t="1., 2., …, 7. fiú: a maradék 20%-a" s={10.5} />
    <SText x={120} y={124} t="zöld: jótékony cél – ? %" s={10.5} c={S_RED} b />
  </QFig>
);

const FIG_SALARY = (
  <QFig>
    <SeqBarChart
      values={Array.from({ length: 48 }, (_, i) => 200 + 5 * i)}
      line={Array.from({ length: 48 }, (_, i) => 200 * 1.02 ** i)}
      x={30}
      y={16}
      w={196}
      h={110}
      color={S_BLUE}
      lineColor={S_RED}
      labelEvery={12}
      maxV={520}
    />
    <SText x={120} y={156} t="kék: +5000 Ft/hó · piros: +2%/hó" s={10} c={S_INK} b />
  </QFig>
);

const FIG_SIERP = (() => {
  const tris: [number, number][][] = [];
  const rec = (a: [number, number], b: [number, number], c: [number, number], d: number) => {
    if (d === 0) {
      tris.push([a, b, c]);
      return;
    }
    const m = (p: [number, number], q: [number, number]): [number, number] => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    rec(a, m(a, b), m(a, c), d - 1);
    rec(m(a, b), b, m(b, c), d - 1);
    rec(m(a, c), m(b, c), c, d - 1);
  };
  rec([120, 14], [30, 130], [210, 130], 3);
  return (
    <QFig>
      <polygon points="120,14 30,130 210,130" fill="#fff" stroke={S_INK} />
      {tris.map((t, i) => (
        <polygon key={i} points={t.map((p) => p.join(',')).join(' ')} fill={S_INK} />
      ))}
      <SText x={120} y={152} t="Sierpiński-háromszög (4. ábra)" s={10.5} c={S_RED} b />
    </QFig>
  );
})();

const FIG_RABBITS = (
  <QFig>
    {[1, 1, 2, 3, 5].map((f, i) => (
      <g key={i}>
        <SText x={34} y={28 + i * 24} t={['jan.', 'febr.', 'márc.', 'ápr.', 'máj.'][i]} s={9.5} a="end" />
        {Array.from({ length: f }, (_, j) => (
          <circle key={j} cx={48 + j * 18} cy={24 + i * 24} r={6.5} fill={S_PURPLE} opacity={0.85} />
        ))}
      </g>
    ))}
    <SText x={175} y={80} t="… 1 év után?" s={11} c={S_RED} b />
  </QFig>
);

const FIG_GUARD = (
  <QFig>
    {Array.from({ length: 12 }, (_, i) => (
      <g key={i}>
        <rect x={12 + i * 18} y={60} width={16} height={26} rx={3} fill={i % 6 < 4 ? S_BLUE : '#cbd5e1'} />
        <SText x={20 + i * 18} y={102} t={String(i + 1)} s={8.5} c="#475569" />
      </g>
    ))}
    <SText x={120} y={40} t="4 nap munka (kék), 2 nap pihenő" s={10.5} />
    <SText x={120} y={130} t="január 1-jétől kezdve …" s={10} c={S_RED} b />
  </QFig>
);

const FIG_TAMAS = (
  <QFig>
    <SeqBarChart values={[2.2, 1.535, 0.804]} line={[2.2 - 0.804, 1.535 - 0.804, 0]} x={40} y={16} w={170} h={110} maxV={2.4} color={S_RED} lineColor={S_GREEN} />
    <SText x={120} y={156} t="tartozás kamattal (piros) és részlet után (zöld)" s={9.5} c={S_INK} b />
  </QFig>
);

const FIG_VERA = pointsFig(
  Array.from({ length: 25 }, (_, i) => 1 + i / 6),
  '25 feladat: 1 perc, majd egyenletesen több',
  S_GREEN
);

const PRACTICE_EXAM_QUESTIONS: QuizQuestion[] = [
  // =================== 1. szint (30) ===================
  {
    id: 'pe-q1',
    questionTypeBadge: 'Sorozat fogalma',
    level: 1,
    question: 'A sorozat olyan függvény, amelynek értelmezési tartománya …',
    options: ['a pozitív egész számok halmaza', 'a valós számok halmaza', 'a természetes számok és a 0', 'az egész számok halmaza'],
    correctAnswer: 0,
    explanation: 'A sorozat ℤ⁺ → ℝ függvény: az 1-hez az első tagot, a 2-höz a második tagot, …, n-hez az n-edik tagot rendeli.'
  },
  {
    id: 'pe-q2',
    questionTypeBadge: 'Képlettel megadva',
    level: 1,
    question: 'Mennyi az aₙ = 3n + 2 sorozat 5. tagja?',
    options: ['17', '15', '35', '11'],
    correctAnswer: 0,
    explanation: 'a₅ = 3 · 5 + 2 = 17.'
  },
  {
    id: 'pe-q3',
    questionTypeBadge: 'Képlettel megadva',
    level: 1,
    question: 'Mennyi a bₙ = n² − n sorozat 4. tagja?',
    options: ['12', '16', '8', '20'],
    correctAnswer: 0,
    explanation: 'b₄ = 16 − 4 = 12.'
  },
  {
    id: 'pe-q4',
    questionTypeBadge: 'Rekurzió',
    level: 1,
    question: 'a₁ = 3, és n > 1 esetén aₙ = 2 · aₙ₋₁ − 4. Mennyi a₃?',
    options: ['0', '2', '−4', '8'],
    correctAnswer: 0,
    explanation: 'a₂ = 2 · 3 − 4 = 2, a₃ = 2 · 2 − 4 = 0.'
  },
  {
    id: 'pe-q5',
    questionTypeBadge: 'Fibonacci',
    level: 1,
    question: 'A Fibonacci-sorozat: f₁ = f₂ = 1, fₙ = fₙ₋₂ + fₙ₋₁. Mennyi f₈?',
    options: ['21', '13', '34', '16'],
    correctAnswer: 0,
    explanation: '1; 1; 2; 3; 5; 8; 13; 21 – a 8. tag 21.'
  },
  {
    id: 'pe-q6',
    questionTypeBadge: 'Lépcső',
    figure: FIG_STAIRS,
    level: 1,
    question: 'Egy lépcsőn egyszerre 1 vagy 2 fokot léphetünk. Az 1., 2., 3. fokra 1, 2, 3 féleképpen juthatunk. Hányféleképpen juthatunk a 4. fokra?',
    options: ['5', '4', '6', '8'],
    correctAnswer: 0,
    explanation: 'Az utolsó lépés 1 (a 3. fokról) vagy 2 (a 2. fokról): a₄ = a₃ + a₂ = 3 + 2 = 5.'
  },
  {
    id: 'pe-q7',
    questionTypeBadge: 'Megadás',
    level: 1,
    question: 'Melyik képlet adja meg a 8-cal osztva 5 maradékot adó pozitív egészek növekvő sorozatát (5; 13; 21; …)?',
    options: ['aₙ = 8n − 3', 'aₙ = 8n + 5', 'aₙ = 5n + 8', 'aₙ = 8n − 5'],
    correctAnswer: 0,
    explanation: 'a₁ = 5, d = 8: aₙ = 5 + 8(n − 1) = 8n − 3. (8n + 5 a 13-mal kezdődne.)'
  },
  {
    id: 'pe-q8',
    questionTypeBadge: 'Váltakozó sorozat',
    level: 1,
    question: 'Mennyi az aₙ = 8 · (−1)ⁿ sorozat 17. tagja?',
    options: ['−8', '8', '−136', '136'],
    correctAnswer: 0,
    explanation: '17 páratlan, így (−1)¹⁷ = −1, a₁₇ = −8.'
  },
  {
    id: 'pe-q9',
    questionTypeBadge: 'Számtani sorozat',
    level: 1,
    question: 'Egy számtani sorozat első tagja 2, differenciája 3. Mennyi a 10. tagja?',
    options: ['29', '32', '30', '1024'],
    correctAnswer: 0,
    explanation: 'a₁₀ = 2 + 9 · 3 = 29.'
  },
  {
    id: 'pe-q10',
    questionTypeBadge: 'Differencia',
    level: 1,
    question: 'Egy számtani sorozatban a₁₂ = 40 és a₁₅ = 46. Mennyi a differencia?',
    options: ['2', '6', '3', '−2'],
    correctAnswer: 0,
    explanation: 'a₁₅ − a₁₂ = 3d = 6 ⇒ d = 2.'
  },
  {
    id: 'pe-q11',
    questionTypeBadge: 'Számtani sorozat',
    level: 1,
    question: 'A 33-nál nagyobb páros számok növekvő sorozata számtani sorozat. Melyik a 77. tagja?',
    options: ['186', '188', '154', '184'],
    correctAnswer: 0,
    explanation: 'a₁ = 34, d = 2: a₇₇ = 34 + 76 · 2 = 186.'
  },
  {
    id: 'pe-q12',
    questionTypeBadge: 'Gauss',
    level: 1,
    question: 'A kis Gauss az 1-től 40-ig terjedő számokat adta össze párosítással (1 + 40, 2 + 39, …). Mennyi az összeg?',
    options: ['820', '800', '1640', '840'],
    correctAnswer: 0,
    explanation: '20 pár, mindegyik összege 41: 20 · 41 = 820 = (1 + 40)/2 · 40.'
  },
  {
    id: 'pe-q13',
    questionTypeBadge: 'Páratlan számok',
    level: 1,
    question: 'Mennyi az első 10 pozitív páratlan szám összege (1 + 3 + … + 19)?',
    options: ['100', '110', '90', '200'],
    correctAnswer: 0,
    explanation: 'Az első n páratlan szám összege n²: 10² = 100.'
  },
  {
    id: 'pe-q14',
    questionTypeBadge: 'Mértani sorozat',
    level: 1,
    question: 'Egy mértani sorozat első tagja 3, kvóciense 2. Mennyi a 6. tagja?',
    options: ['96', '192', '48', '13'],
    correctAnswer: 0,
    explanation: 'a₆ = 3 · 2⁵ = 96.'
  },
  {
    id: 'pe-q15',
    questionTypeBadge: 'Kvóciens',
    level: 1,
    question: 'Mennyi a 8; 4; 2; 1; … mértani sorozat kvóciense?',
    options: ['1/2', '2', '−4', '−1/2'],
    correctAnswer: 0,
    explanation: 'q = 4/8 = 1/2.'
  },
  {
    id: 'pe-q16',
    questionTypeBadge: 'Két megoldás',
    level: 1,
    question: 'Egy mértani sorozatban a₁₂ = 10 és a₁₄ = 40. Mennyi lehet a kvóciens?',
    options: ['2 vagy −2', 'csak 2', '4', '15'],
    correctAnswer: 0,
    explanation: 'a₁₄/a₁₂ = q² = 4 ⇒ q = 2 vagy q = −2.'
  },
  {
    id: 'pe-q17',
    questionTypeBadge: 'Mértani összeg',
    level: 1,
    question: 'Mennyi a 2 + 4 + 8 + 16 + 32 összeg?',
    options: ['62', '64', '32', '30'],
    correctAnswer: 0,
    explanation: 'a₁ = 2, q = 2, n = 5: S₅ = 2 · (2⁵ − 1) = 62.'
  },
  {
    id: 'pe-q18',
    questionTypeBadge: 'Felismerés',
    level: 1,
    question: 'Milyen sorozat az 5; 5; 5; 5; … állandó sorozat?',
    options: ['számtani (d = 0) és mértani (q = 1) is', 'csak számtani', 'csak mértani', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'A különbségek állandóan 0, a hányadosok állandóan 1.'
  },
  {
    id: 'pe-q19',
    questionTypeBadge: 'Számtani közép',
    level: 1,
    question: 'A 6; x; 14 számok egy számtani sorozat egymást követő tagjai. Mennyi x?',
    options: ['10', '√84', '8', '20'],
    correctAnswer: 0,
    explanation: 'x = (6 + 14)/2 = 10.'
  },
  {
    id: 'pe-q20',
    questionTypeBadge: 'Mértani közép',
    level: 1,
    question: 'A 2; x; 18 pozitív számok egy mértani sorozat egymást követő tagjai. Mennyi x?',
    options: ['6', '10', '9', '36'],
    correctAnswer: 0,
    explanation: 'x² = 2 · 18 = 36, x > 0 ⇒ x = 6.'
  },
  {
    id: 'pe-q21',
    questionTypeBadge: 'Kamatos kamat',
    level: 1,
    question: '100 000 Ft-ot 2 évre lekötünk évi 10%-os kamatos kamatra. Mennyi lesz a számlán?',
    options: ['121 000 Ft', '120 000 Ft', '110 000 Ft', '200 000 Ft'],
    correctAnswer: 0,
    explanation: '100 000 · 1,1² = 121 000 Ft.'
  },
  {
    id: 'pe-q22',
    questionTypeBadge: 'Kamattényező',
    level: 1,
    question: 'Mekkora a kamattényező évi 4%-os kamatlábnál?',
    options: ['1,04', '0,04', '1,4', '0,96'],
    correctAnswer: 0,
    explanation: 'q = 1 + 4/100 = 1,04.'
  },
  {
    id: 'pe-q23',
    questionTypeBadge: 'Egymásba írt négyzetek',
    figure: FIG_SQUARES,
    level: 1,
    question: 'Egy 8 cm oldalú négyzet oldalfelező pontjait összekötjük, majd ezt ismételjük. Mekkora a második négyzet területe?',
    options: ['32 cm²', '16 cm²', '64 cm²', '48 cm²'],
    correctAnswer: 0,
    explanation: 'A beírt négyzet területe az eredeti fele (hasonlósági arány 1/√2, területarány 1/2): 64/2 = 32 cm².'
  },
  {
    id: 'pe-q24',
    questionTypeBadge: 'Modellezés',
    level: 1,
    question: 'A világ gabonatermelése 1960-ban kb. 824 millió tonna volt, és évente kb. 27 millió tonnával nőtt. Mennyi a számtani modell szerint az 1970-es érték?',
    options: ['1094 millió tonna', '1067 millió tonna', '851 millió tonna', '1121 millió tonna'],
    correctAnswer: 0,
    explanation: '10 év alatt 10 · 27 = 270-nel nő: 824 + 270 = 1094 millió tonna.'
  },
  {
    id: 'pe-q25',
    questionTypeBadge: 'Monotonitás',
    level: 1,
    question: 'Melyik sorozat szigorúan monoton csökkenő?',
    options: ['aₙ = 12 − 5n', 'aₙ = n² + n', 'aₙ = (−1)ⁿ', 'aₙ = 2ⁿ'],
    correctAnswer: 0,
    explanation: 'aₙ₊₁ − aₙ = −5 < 0, tehát a 12 − 5n számtani sorozat csökkenő. A (−1)ⁿ váltakozik, a másik kettő nő.'
  },
  {
    id: 'pe-q26',
    questionTypeBadge: 'Periodikus',
    figure: FIG_GUARD,
    level: 1,
    question: 'Egy biztonsági őr 4 napot dolgozik, 2 napot pihen, és így tovább; január 1-jén kezdett dolgozni. Dolgozik vagy pihen az év 100. napján?',
    options: ['dolgozik', 'pihen', 'a hét napjától függ', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'A ciklus 6 napos: 100 = 16 · 6 + 4, a ciklus 4. napja munkanap.'
  },
  {
    id: 'pe-q27',
    questionTypeBadge: 'Mértani növekedés',
    level: 1,
    question: 'Hajni hétfőn 3 barátnőjének mondta el a viccet; ezután mindenki, aki megtudta, másnap 3 újabb embernek mondta el. Hányan hallották szombaton először?',
    options: ['729', '243', '18', '1093'],
    correctAnswer: 0,
    explanation: 'Hétfő 3, kedd 9, szerda 27, csütörtök 81, péntek 243, szombat 3⁶ = 729.'
  },
  {
    id: 'pe-q28',
    questionTypeBadge: 'Patkószegek',
    figure: FIG_NAILS,
    level: 1,
    question: 'Az első patkószeg 1 fillér, minden további kétszer annyi, mint az előző. Mennyibe kerül az 5. szeg?',
    options: ['16 fillér', '32 fillér', '10 fillér', '31 fillér'],
    correctAnswer: 0,
    explanation: 'a₅ = 1 · 2⁴ = 16 fillér. (31 fillér az első 5 szeg együtt.)'
  },
  {
    id: 'pe-q29',
    questionTypeBadge: 'Szimmetrikus jelölés',
    level: 1,
    question: 'Tibor minden hónapban 100 Ft-tal többet tesz a perselybe; április–júniusban összesen 8100 Ft-ot tett be. Mennyit tett be májusban?',
    options: ['2700 Ft', '2600 Ft', '2800 Ft', '2025 Ft'],
    correctAnswer: 0,
    explanation: '(c − 100) + c + (c + 100) = 3c = 8100 ⇒ c = 2700 Ft (januárban 2300 Ft).'
  },
  {
    id: 'pe-q30',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Melyik állítás igaz a mértani sorozatra?',
    options: ['Egyik tagja és a kvóciense sem lehet 0', 'A tagjai mindig pozitívak', 'A kvóciense mindig nagyobb 1-nél', 'Mindig monoton'],
    correctAnswer: 0,
    explanation: 'A definíció szerint aₙ/aₙ₋₁ 0-tól különböző állandó, így egyik tag sem 0. Negatív q-nál a tagok előjele váltakozik, és nem monoton.'
  },

  // =================== 2. szint (30) ===================
  {
    id: 'pe-q31',
    questionTypeBadge: 'Tudáspróba 1.',
    level: 2,
    question: 'Egy számtani sorozat második tagja 5, nyolcadik tagja 14. Mennyi a differencia?',
    options: ['1,5', '9', '1,8', '2'],
    correctAnswer: 0,
    explanation: 'a₈ − a₂ = 6d = 9 ⇒ d = 1,5.'
  },
  {
    id: 'pe-q32',
    questionTypeBadge: 'Tudáspróba 1.',
    level: 2,
    question: 'Egy számtani sorozatban a₂ = 5 és a₈ = 14. Mennyi az első 20 tag összege?',
    options: ['355', '320', '385', '710'],
    correctAnswer: 0,
    explanation: 'd = 1,5, a₁ = 3,5, a₂₀ = 3,5 + 19 · 1,5 = 32; S₂₀ = (3,5 + 32)/2 · 20 = 355.'
  },
  {
    id: 'pe-q33',
    questionTypeBadge: 'Tudáspróba 3.',
    level: 2,
    question: 'Egy számtani sorozat első tagja 8, differenciája 1,5. Hány tagot adtunk össze, ha az összeg 1233?',
    options: ['36', '34', '38', '27'],
    correctAnswer: 0,
    explanation: 'n(16 + 1,5(n − 1))/2 = 1233 ⇒ 3n² + 29n − 4932 = 0 ⇒ n = 36.'
  },
  {
    id: 'pe-q34',
    questionTypeBadge: 'Tudáspróba 2.',
    figure: FIG_NAILS,
    level: 2,
    question: 'Betyár lovat ingyen adják, csak a 32 patkószegért kell fizetni: az első 1 fillér, minden további kétszer annyi. Mennyiért lehet megvenni Betyárt?',
    options: ['≈ 42 949 673 Ft', '≈ 21 474 837 Ft', '≈ 10 Ft', '32 Ft'],
    correctAnswer: 0,
    explanation: 'S₃₂ = 2³² − 1 = 4 294 967 295 fillér ≈ 42 949 673 Ft. (A 32. szeg egymagában ≈ 21,5 millió Ft.)'
  },
  {
    id: 'pe-q35',
    questionTypeBadge: 'Tudáspróba 4.',
    figure: FIG_INHERIT,
    level: 2,
    question: 'A gazda 7 fia közül a legidősebb a vagyon 20%-át, a következő a maradék 80% 20%-át kapja, és így tovább. A vagyon hány százalékát kapja a középső (4.) fiú?',
    options: ['10,24%', '20%', '12,8%', '8,192%'],
    correctAnswer: 0,
    explanation: 'A k-adik fiú része 0,2 · 0,8ᵏ⁻¹: 0,2 · 0,8³ = 0,1024 = 10,24%.'
  },
  {
    id: 'pe-q36',
    questionTypeBadge: 'Tudáspróba 4.',
    figure: FIG_INHERIT,
    level: 2,
    question: 'A gazda hagyatékánál (7 fiú, mindegyik a maradék 20%-át kapja) a vagyon hány százaléka jut a legkisebb (7.) fiúnak?',
    options: ['≈ 5,24%', '≈ 6,55%', '≈ 4,19%', '≈ 2,86%'],
    correctAnswer: 0,
    explanation: '0,2 · 0,8⁶ ≈ 0,0524 ⇒ ≈ 5,24%. (≈ 6,55% a 6. fiú része.)'
  },
  {
    id: 'pe-q37',
    questionTypeBadge: 'Tudáspróba 5.',
    level: 2,
    question: 'Kinga öt éven át minden év elején 450 000 Ft-ot tesz gyűjtőszámlára, 9%, év végi jóváírás. Kb. mennyi lesz a számlán öt év után?',
    options: ['≈ 2 935 501 Ft', '2 250 000 Ft', '≈ 2 693 120 Ft', '≈ 3 461 000 Ft'],
    correctAnswer: 0,
    explanation: 'S₅ = 450 000 · 1,09 · (1,09⁵ − 1)/0,09 ≈ 2 935 501 Ft. (≈ 2 693 120 Ft év végi befizetéssel.)'
  },
  {
    id: 'pe-q38',
    questionTypeBadge: 'Számtani összeg',
    level: 2,
    question: 'Egy számtani sorozat 15. tagja 21, első 15 tagjának összege 52,5. Mennyi az első tag és a differencia?',
    options: ['a₁ = −14, d = 2,5', 'a₁ = 7, d = 1', 'a₁ = −28, d = 3,5', 'a₁ = 14, d = 0,5'],
    correctAnswer: 0,
    explanation: '(a₁ + 21)/2 · 15 = 52,5 ⇒ a₁ = −14; 14d = 21 − (−14) = 35 ⇒ d = 2,5.'
  },
  {
    id: 'pe-q39',
    questionTypeBadge: 'Vetélkedő',
    level: 2,
    question: '29 000 Ft jutalmat osztottak ki: az első 3800 Ft-ot kapott, a további helyezettek rendre 200 Ft-tal kevesebbet. Hány versenyzőt jutalmaztak?',
    options: ['10', '29', '8', '12'],
    correctAnswer: 0,
    explanation: 'n(7800 − 200n)/2 = 29 000 ⇒ n² − 39n + 290 = 0 ⇒ n = 10 vagy 29; 29-nél a jutalom negatív lenne, így 10.'
  },
  {
    id: 'pe-q40',
    questionTypeBadge: 'Mértani tag',
    level: 2,
    question: 'Egy mértani sorozatban b₁ = 120, q = 0,5. Mennyi b₁₀?',
    options: ['0,234375', '0,46875', '60', '0,1171875'],
    correctAnswer: 0,
    explanation: 'b₁₀ = 120 · 0,5⁹ = 120/512 = 0,234375.'
  },
  {
    id: 'pe-q41',
    questionTypeBadge: 'Mértani összeg',
    level: 2,
    question: 'Egy mértani sorozatban b₁ = −5, q = 3. Mennyi az első 8 tag összege?',
    options: ['−16 400', '−10 935', '16 400', '−32 800'],
    correctAnswer: 0,
    explanation: 'S₈ = −5 · (3⁸ − 1)/(3 − 1) = −5 · 6560/2 = −16 400. (−10 935 a 8. tag.)'
  },
  {
    id: 'pe-q42',
    questionTypeBadge: 'Mértani tag',
    level: 2,
    question: 'Egy mértani sorozatban q = −2 és b₄ = 72. Mennyi b₁?',
    options: ['−9', '9', '−18', '−36'],
    correctAnswer: 0,
    explanation: 'b₄ = b₁ · (−2)³ = −8b₁ = 72 ⇒ b₁ = −9.'
  },
  {
    id: 'pe-q43',
    questionTypeBadge: 'Mértani összeg',
    level: 2,
    question: 'Egy mértani sorozatban q = 2, és az első 5 tag összege 155. Mennyi az első tag?',
    options: ['5', '31', '10', '2,5'],
    correctAnswer: 0,
    explanation: 'S₅ = b₁ · (2⁵ − 1) = 31b₁ = 155 ⇒ b₁ = 5 (b₅ = 80).'
  },
  {
    id: 'pe-q44',
    questionTypeBadge: 'Egyenlőtlenség',
    level: 2,
    question: 'Egy mértani sorozat harmadik tagja is és kvóciense is 1/2. Hány tagot kell összeadni az elsőtől kezdve, hogy az összeg 3,8-nél nagyobb legyen?',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: 'a₁ = 2: Sₙ = 4(1 − 0,5ⁿ) > 3,8 ⇒ 0,5ⁿ < 0,05 ⇒ n ≥ 5 (S₄ = 3,75; S₅ = 3,875).'
  },
  {
    id: 'pe-q45',
    questionTypeBadge: 'Számtani összeg',
    level: 2,
    question: 'Mennyi az 50-nél kisebb kétjegyű pozitív egész számok összege?',
    options: ['1180', '1225', '1215', '1130'],
    correctAnswer: 0,
    explanation: '10-től 49-ig 40 szám: (10 + 49)/2 · 40 = 1180.'
  },
  {
    id: 'pe-q46',
    questionTypeBadge: 'Első tag',
    level: 2,
    question: 'Egy számtani sorozat negyedik tagja 31, hatodik tagja 51. Mennyi az első tagja?',
    options: ['1', '11', '−9', '21'],
    correctAnswer: 0,
    explanation: '2d = 20 ⇒ d = 10; a₁ = 31 − 3 · 10 = 1.'
  },
  {
    id: 'pe-q47',
    questionTypeBadge: 'Mértani összeg',
    level: 2,
    question: 'Összeadtuk az aₙ = 0,08 · 2ⁿ⁻¹ sorozat első tizenöt tagját. Mennyi az összeg?',
    options: ['2621,36', '1310,72', '2621,44', '5242,72'],
    correctAnswer: 0,
    explanation: 'S₁₅ = 0,08 · (2¹⁵ − 1) = 0,08 · 32 767 = 2621,36 (legkisebb helyi értékű számjegye 6).'
  },
  {
    id: 'pe-q48',
    questionTypeBadge: 'Érettségi 2017',
    figure: FIG_VERA,
    level: 2,
    question: 'Vera 25 feladatra 75 percet szán: az elsőre 1 percet, utána mindig ugyanannyival többet. Összesen mennyi időt szán az utolsó 4 feladatra?',
    options: ['19 percet', '20 percet', '12 percet', '16 percet'],
    correctAnswer: 0,
    explanation: '25(2 + 24d)/2 = 75 ⇒ d = 1/6; a₂₂ + a₂₃ + a₂₄ + a₂₅ = 4,5 + 4 2/3 + 4 5/6 + 5 = 19 perc.'
  },
  {
    id: 'pe-q49',
    questionTypeBadge: 'Webszerver',
    level: 2,
    question: 'Egy gép 1, majd 3, 5, … másodperc várakozás után próbál újracsatlakozni (mindig +2 mp). Összesen hány másodperc a tíz várakozás?',
    options: ['100 mp', '19 mp', '110 mp', '90 mp'],
    correctAnswer: 0,
    explanation: 'Az első 10 páratlan szám összege 10² = 100 mp (a 10. várakozás 19 mp).'
  },
  {
    id: 'pe-q50',
    questionTypeBadge: 'Webszerver',
    level: 2,
    question: 'Ha a gép az első 1 másodperc után a várakozási időt mindig 10%-kal növeli, kb. hány másodpercet vár a tizedik újrapróbálkozás előtt?',
    options: ['≈ 2,36 mp', '≈ 2,59 mp', '1,9 mp', '≈ 15,94 mp'],
    correctAnswer: 0,
    explanation: 'a₁₀ = 1 · 1,1⁹ ≈ 2,36 mp. (≈ 2,59 = 1,1¹⁰; ≈ 15,94 mp a tíz várakozás összege.)'
  },
  {
    id: 'pe-q51',
    questionTypeBadge: 'Fraktál',
    figure: FIG_SIERP,
    level: 2,
    question: 'A Sierpiński-háromszög minden lépésben minden fekete háromszöget 3 kisebbre bont (a középsőt kifehérítjük). Az 1. ábrán 1 fekete háromszög van. Hány lesz a 20. ábrán?',
    options: ['3¹⁹', '3²⁰', '3 · 20', '4¹⁹'],
    correctAnswer: 0,
    explanation: 'Mértani sorozat: a₁ = 1, q = 3 ⇒ a₂₀ = 3¹⁹ = 1 162 261 467.'
  },
  {
    id: 'pe-q52',
    questionTypeBadge: 'Képlettel megadva',
    level: 2,
    question: 'Mennyi a cₙ = n(n − 1) + 2 sorozat 10. tagja, és hányadik tagja a 602?',
    options: ['c₁₀ = 92, a 602 a 25. tag', 'c₁₀ = 92, a 602 a 24. tag', 'c₁₀ = 110, a 602 a 25. tag', 'c₁₀ = 90, a 602 a 30. tag'],
    correctAnswer: 0,
    explanation: 'c₁₀ = 10 · 9 + 2 = 92; n(n − 1) = 600 ⇒ n = 25.'
  },
  {
    id: 'pe-q53',
    questionTypeBadge: 'Érettségi 2021',
    level: 2,
    question: 'Egy sorozat első tagja 5; a második tagtól kezdve minden tag az előző tag (−2)-szeresénél 1-gyel nagyobb. Mennyi a harmadik tag?',
    options: ['19', '−9', '21', '−19'],
    correctAnswer: 0,
    explanation: 'a₂ = −2 · 5 + 1 = −9, a₃ = −2 · (−9) + 1 = 19 (a₆ = −149).'
  },
  {
    id: 'pe-q54',
    questionTypeBadge: 'Hányadik tag?',
    level: 2,
    question: 'Egy számtani sorozat 28. tagja 96, 32. tagja 112. Hányadik tagja a sorozatnak a 192?',
    options: ['52.', '48.', '24.', '56.'],
    correctAnswer: 0,
    explanation: '4d = 16 ⇒ d = 4; 96 + 4(n − 28) = 192 ⇒ n − 28 = 24 ⇒ n = 52.'
  },
  {
    id: 'pe-q55',
    questionTypeBadge: 'Stadion',
    level: 2,
    question: 'Egy stadion első sorában 340 ülés van, minden következő sorban 30-cal több. Hány ülőhely van, ha 27 sor van?',
    options: ['19 710', '10 530', '9 180', '20 520'],
    correctAnswer: 0,
    explanation: 'a₂₇ = 340 + 26 · 30 = 1120; S₂₇ = (340 + 1120)/2 · 27 = 19 710.'
  },
  {
    id: 'pe-q56',
    questionTypeBadge: 'Faállomány',
    level: 2,
    question: 'Egy erdő faállománya évente 2%-kal csökken; 2010-ben 12 000 m³ volt. Kb. mennyi volt 2020-ban?',
    options: ['≈ 9805 m³', '9600 m³', '≈ 9609 m³', '≈ 10 004 m³'],
    correctAnswer: 0,
    explanation: '12 000 · 0,98¹⁰ ≈ 9805 m³. (9600 m³ lineáris 20%-os csökkenés lenne.)'
  },
  {
    id: 'pe-q57',
    questionTypeBadge: 'Kamatos kamat',
    level: 2,
    question: 'Zoltán 3 millió Ft-ot tesz bankba évi 3,5%-os kamatos kamatra, évenkénti jóváírással. Kb. mennyi lesz a számlán 6 év múlva?',
    options: ['≈ 3 687 766 Ft', '3 630 000 Ft', '≈ 3 563 059 Ft', '≈ 3 816 838 Ft'],
    correctAnswer: 0,
    explanation: '3 000 000 · 1,035⁶ ≈ 3 687 766 Ft. (3 630 000 Ft egyszerű kamatnál.)'
  },
  {
    id: 'pe-q58',
    questionTypeBadge: 'Értékcsökkenés',
    level: 2,
    question: 'Egy 21,5 millió Ft-os gép értéke évente 15%-kal csökken. Kb. mennyit ér 3 év múlva?',
    options: ['≈ 13,2 millió Ft', '≈ 11,8 millió Ft', '≈ 15,5 millió Ft', '≈ 12,8 millió Ft'],
    correctAnswer: 0,
    explanation: '21,5 · 0,85³ ≈ 13,2 millió Ft. (≈ 11,8 = 21,5 · 0,55 a lineáris 45%-os csökkenés lenne.)'
  },
  {
    id: 'pe-q59',
    questionTypeBadge: 'Sakktábla',
    level: 2,
    question: 'Sissa kérése: a sakktábla 1. mezőjére 1, a 2.-ra 2, a 3.-ra 4 búzaszem, és így tovább. Hány szem kerülne összesen a 64 mezőre?',
    options: ['2⁶⁴ − 1', '2⁶⁴', '2⁶³', '64²'],
    correctAnswer: 0,
    explanation: 'S₆₄ = (2⁶⁴ − 1)/(2 − 1) = 2⁶⁴ − 1 ≈ 1,84 · 10¹⁹.'
  },
  {
    id: 'pe-q60',
    questionTypeBadge: 'Hitel',
    figure: FIG_TAMAS,
    level: 2,
    question: 'Tamás 2 000 000 Ft hitelt 3 egyenlő éves részletben fizet vissza, évi 10%. Kb. mekkora egy részlet?',
    options: ['≈ 804 230 Ft', '≈ 887 333 Ft', '≈ 733 333 Ft', '≈ 666 667 Ft'],
    correctAnswer: 0,
    explanation: '2 662 000 = (1,21 + 1,1 + 1)x = 3,31x ⇒ x ≈ 804 230 Ft.'
  },

  // =================== 3. szint (30) ===================
  {
    id: 'pe-q61',
    questionTypeBadge: 'Számtani összeg',
    level: 3,
    question: 'Egy számtani sorozat 15. tagja 21, első 15 tagjának összege −52,5. Mennyi az első tag és a differencia?',
    options: ['a₁ = −28, d = 3,5', 'a₁ = −14, d = 2,5', 'a₁ = −7, d = 2', 'a₁ = 28, d = −0,5'],
    correctAnswer: 0,
    explanation: '(a₁ + 21)/2 · 15 = −52,5 ⇒ a₁ + 21 = −7 ⇒ a₁ = −28; 14d = 49 ⇒ d = 3,5.'
  },
  {
    id: 'pe-q62',
    questionTypeBadge: 'Érettségi 2016',
    figure: FIG_SALARY,
    level: 3,
    question: 'Péter induló fizetése 200 000 Ft. I.: havonta +5000 Ft, II.: havonta +2%, négy éven át. Melyik ad nagyobb összjövedelmet 4 év alatt?',
    options: ['a II., ≈ 15 870 704 Ft', 'az I., 15 240 000 Ft', 'egyformák', 'az I., ≈ 16 974 449 Ft'],
    correctAnswer: 0,
    explanation: 'I.: 48 · (400 000 + 47 · 5000)/2 = 15 240 000 Ft; II.: 200 000 · (1,02⁴⁸ − 1)/0,02 ≈ 15 870 704 Ft.'
  },
  {
    id: 'pe-q63',
    questionTypeBadge: 'Érettségi 2016',
    figure: FIG_SALARY,
    level: 3,
    question: 'Péter I. ajánlatában (200 000 Ft, havonta +5000 Ft, 48 hónap) mennyi a 48. havi fizetés és a 4 év összjövedelme?',
    options: ['435 000 Ft és 15 240 000 Ft', '440 000 Ft és 15 360 000 Ft', '435 000 Ft és 10 440 000 Ft', '≈ 507 269 Ft és 15 870 704 Ft'],
    correctAnswer: 0,
    explanation: 'a₄₈ = 200 000 + 47 · 5000 = 435 000 Ft; S₄₈ = (200 000 + 435 000)/2 · 48 = 15 240 000 Ft.'
  },
  {
    id: 'pe-q64',
    questionTypeBadge: 'Csoportverseny',
    level: 3,
    question: 'A csoportverseny eredményei: K = 20, L = 5, M = 1180, N = 1, P = 2, Q = 7, R = 6. Mennyi az (M/K)x² − (R · Q + 3)x − 2(L · N + P) = 0 egyenlet pozitív gyöke?',
    options: ['1', '45/59', '14/59', '2'],
    correctAnswer: 0,
    explanation: '59x² − 45x − 14 = 0 ⇒ x = (45 ± √(2025 + 3304))/118 = (45 ± 73)/118 ⇒ x = 1 (a másik gyök −14/59).'
  },
  {
    id: 'pe-q65',
    questionTypeBadge: 'Érettségi 2021',
    level: 3,
    question: 'Anna 21 napos edzéstervében az első napon 200 m-t, a 21. napon 5200 m-t úszik, a napi távok számtani sorozatot alkotnak. Összesen hány métert úszik?',
    options: ['56 700 m', '54 000 m', '109 200 m', '58 800 m'],
    correctAnswer: 0,
    explanation: 'S₂₁ = (200 + 5200)/2 · 21 = 56 700 m.'
  },
  {
    id: 'pe-q66',
    questionTypeBadge: 'Érettségi 2021',
    level: 3,
    question: 'Anna másik tervében a napi távok (200 m → 5200 m, 21 nap) mértani sorozatot alkotnak. Kb. hány métert úszik összesen?',
    options: ['≈ 33 461 m', '56 700 m', '≈ 28 261 m', '≈ 39 382 m'],
    correctAnswer: 0,
    explanation: 'q²⁰ = 26 ⇒ q ≈ 1,1769; S₂₁ = 200 · (q²¹ − 1)/(q − 1) ≈ 33 461 m.'
  },
  {
    id: 'pe-q67',
    questionTypeBadge: 'Fraktál',
    figure: FIG_SIERP,
    level: 3,
    question: 'A Sierpiński-háromszögben minden lépésben a fekete rész 3/4-e marad fekete. Az eredeti terület kb. hányad része fekete a 20. ábrán?',
    options: ['≈ 0,42%', '≈ 0,32%', '≈ 5,6%', '≈ 25%'],
    correctAnswer: 0,
    explanation: 'T₂₀ = (3/4)¹⁹ · T₁ ≈ 0,0042 · T₁ ⇒ ≈ 0,42%. (≈ 0,32% = (3/4)²⁰.)'
  },
  {
    id: 'pe-q68',
    questionTypeBadge: 'Rekurzió',
    figure: FIG_SIERP,
    level: 3,
    question: 'Melyik rekurzív képlet adja meg a Sierpiński-háromszög n-edik ábrájának fekete területét az előzőből?',
    options: ['Tₙ = 3/4 · Tₙ₋₁', 'Tₙ = Tₙ₋₁ − 1/4', 'Tₙ = 3 · Tₙ₋₁', 'Tₙ = 1/4 · Tₙ₋₁'],
    correctAnswer: 0,
    explanation: 'A középvonalak 4 egybevágó részre bontják a háromszöget, ebből 1 lesz fehér: a fekete terület 3/4-e marad.'
  },
  {
    id: 'pe-q69',
    questionTypeBadge: 'Fibonacci',
    figure: FIG_RABBITS,
    level: 3,
    question: 'Fibonacci nyulai: f₁ = f₂ = 1, fₙ = fₙ₋₂ + fₙ₋₁. A megfigyelés kezdete után egy évvel (f₁₃) hány nyúlpár él?',
    options: ['233', '144', '377', '89'],
    correctAnswer: 0,
    explanation: '1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233 – f₁₃ = 233 pár (az eredetin kívül 232 pár = 464 nyúl).'
  },
  {
    id: 'pe-q70',
    questionTypeBadge: 'Rekurzió',
    figure: FIG_STAIRS,
    level: 3,
    question: 'A lépcsőfeladatban (aₙ = aₙ₋₁ + aₙ₋₂) a₁₈ = 4181 és a₂₀ = 10 946. Mennyi a₁₇?',
    options: ['2584', '6765', '1597', '3382'],
    correctAnswer: 0,
    explanation: 'a₁₉ = a₂₀ − a₁₈ = 6765, a₁₇ = a₁₉ − a₁₈ = 2584.'
  },
  {
    id: 'pe-q71',
    questionTypeBadge: 'Periodikus',
    level: 3,
    question: 'Az 5/7 tizedes tört alakjában milyen számjegy áll a tizedesvessző utáni 90. helyen?',
    options: ['5', '7', '1', '8'],
    correctAnswer: 0,
    explanation: '5/7 = 0,714285 714285…, a periódus 6 hosszú; 90 osztható 6-tal, így a periódus utolsó jegye: 5.'
  },
  {
    id: 'pe-q72',
    questionTypeBadge: 'Rekurzió',
    level: 3,
    question: 'Egy hüllőállomány kezdetben 201 egyed; évente megduplázódik, majd 200 egyed elpusztul (aₙ = 2aₙ₋₁ − 200). Hány egyed lesz a 10. évben?',
    options: ['712', '201', '210', '456'],
    correctAnswer: 0,
    explanation: '201, 202, 204, 208, 216, 232, 264, 328, 456, 712 – aₙ = 200 + 2ⁿ⁻¹, tehát nem marad közel azonos!'
  },
  {
    id: 'pe-q73',
    questionTypeBadge: 'Érettségi 2022',
    level: 3,
    question: 'Egy számtani sorozat első három tagjának összege 18; a 3. és 4. tag összege 28-cal nagyobb az 1. és 2. tag összegénél. Mennyi a₁ és d?',
    options: ['a₁ = −1, d = 7', 'a₁ = 6, d = 0', 'a₁ = 1, d = 7', 'a₁ = −8, d = 14'],
    correctAnswer: 0,
    explanation: '3a₁ + 3d = 18 ⇒ a₁ + d = 6; (a₃ + a₄) − (a₁ + a₂) = 4d = 28 ⇒ d = 7, a₁ = −1.'
  },
  {
    id: 'pe-q74',
    questionTypeBadge: 'Érettségi 2017',
    level: 3,
    question: 'A strandbüfé július 1–3-án összesen 165 l, július 15-én 198 l üdítőt rendelt, a napi rendelés naponta ugyanannyival nő. Hány litert rendelnek július 31-én?',
    options: ['374 l', '363 l', '385 l', '242 l'],
    correctAnswer: 0,
    explanation: 'a₂ = 165/3 = 55; a₁₅ − a₂ = 13d = 143 ⇒ d = 11; a₃₁ = 55 + 29 · 11 = 374 l.'
  },
  {
    id: 'pe-q75',
    questionTypeBadge: 'Érettségi 2006',
    level: 3,
    question: '55 egymást követő pozitív páratlan szám összege 3905. Melyik az első és az utolsó szám?',
    options: ['17 és 125', '19 és 127', '15 és 123', '71 és 125'],
    correctAnswer: 0,
    explanation: 'Átlag = 3905/55 = 71 (ez a 28., középső tag); az első 71 − 27 · 2 = 17, az utolsó 71 + 27 · 2 = 125.'
  },
  {
    id: 'pe-q76',
    questionTypeBadge: 'Érettségi 2015',
    level: 3,
    question: 'A nagyszülők 18 hónapon át tesznek félre, minden hónapban 200 Ft-tal többet, összesen 90 000 Ft-ot. Mennyit tesznek félre az első és az utolsó alkalommal?',
    options: ['3300 Ft és 6700 Ft', '5000 Ft és 8400 Ft', '1600 Ft és 5000 Ft', '3200 Ft és 6800 Ft'],
    correctAnswer: 0,
    explanation: '18(2a₁ + 17 · 200)/2 = 90 000 ⇒ 2a₁ + 3400 = 10 000 ⇒ a₁ = 3300 Ft, a₁₈ = 3300 + 3400 = 6700 Ft.'
  },
  {
    id: 'pe-q77',
    questionTypeBadge: 'Mértani sorozat',
    level: 3,
    question: 'Egy mértani sorozat első tagja 8, a második és harmadik tag összege 16. Mennyi lehet a negyedik tag?',
    options: ['8 vagy −64', 'csak 8', '−64 vagy 64', 'csak −64'],
    correctAnswer: 0,
    explanation: '8q + 8q² = 16 ⇒ q² + q − 2 = 0 ⇒ q = 1 (a₄ = 8) vagy q = −2 (a₄ = 8 · (−8) = −64).'
  },
  {
    id: 'pe-q78',
    questionTypeBadge: 'Mértani sorozat',
    level: 3,
    question: 'Egy mértani sorozat második tagja 1600, negyedik tagja 4. Mennyi lehet az első tagja?',
    options: ['32 000 vagy −32 000', 'csak 32 000', '80 vagy −80', '6400'],
    correctAnswer: 0,
    explanation: 'q² = 4/1600 = 1/400 ⇒ q = ±1/20; a₁ = 1600/q = ±32 000.'
  },
  {
    id: 'pe-q79',
    questionTypeBadge: 'Egyenlőtlenség',
    level: 3,
    question: 'Egy mértani sorozat 3. tagja 32, 6. tagja 108. Hány tagja kisebb 1 000 000-nál?',
    options: ['28', '27', '29', '35'],
    correctAnswer: 0,
    explanation: 'q³ = 108/32 = 27/8 ⇒ q = 1,5; a₁ = 32/2,25 ≈ 14,22. a₁ · 1,5ⁿ⁻¹ < 10⁶ ⇒ n − 1 < lg(70 312,5)/lg 1,5 ≈ 27,5 ⇒ n ≤ 28.'
  },
  {
    id: 'pe-q80',
    questionTypeBadge: 'Hitel',
    level: 3,
    question: 'Szilárd 500 000 Ft hitelt 3 egyenlő éves részletben törleszt, a kamatláb 13%. Kb. mekkora a részlet?',
    options: ['≈ 211 761 Ft', '≈ 240 483 Ft', '≈ 188 333 Ft', '≈ 166 667 Ft'],
    correctAnswer: 0,
    explanation: 'x = 500 000 · 1,13³ · 0,13/(1,13³ − 1) ≈ 211 761 Ft.'
  },
  {
    id: 'pe-q81',
    questionTypeBadge: 'Mértani közép',
    level: 3,
    question: 'Egy mértani sorozat 5. tagja 4, 9. tagja 324. Mennyi a 7. tagja?',
    options: ['36', '36 vagy −36', '164', '−36'],
    correctAnswer: 0,
    explanation: 'a₇ = a₅ · q², ahol q² = 9 (q⁴ = 81), így a₇ = 36; q² > 0 miatt a₇ nem lehet negatív.'
  },
  {
    id: 'pe-q82',
    questionTypeBadge: 'Hitel',
    level: 3,
    question: 'Kálmán 1 000 000 Ft hitelt 1 év alatt, évi 12%-kal, 4 egyenlő negyedéves részletben törleszt. Kb. mekkora a részlet?',
    options: ['≈ 269 027 Ft', '280 000 Ft', '250 000 Ft', '≈ 262 500 Ft'],
    correctAnswer: 0,
    explanation: 'q = 1,03: x = 1 000 000 · 1,03⁴ · 0,03/(1,03⁴ − 1) ≈ 269 027 Ft.'
  },
  {
    id: 'pe-q83',
    questionTypeBadge: 'Gyűjtőjáradék',
    level: 3,
    question: 'Dalma minden hónap elején 20 000 Ft-ot tesz gyűjtőszámlára, évi 6%, havi jóváírás. Kb. mennyi lesz a számlán 2 év múlva?',
    options: ['≈ 511 182 Ft', '≈ 508 639 Ft', '480 000 Ft', '≈ 539 520 Ft'],
    correctAnswer: 0,
    explanation: 'S₂₄ = 20 000 · 1,005 · (1,005²⁴ − 1)/0,005 ≈ 511 182 Ft.'
  },
  {
    id: 'pe-q84',
    questionTypeBadge: 'Két megoldás',
    level: 3,
    question: 'Egy mértani sorozat 2. tagja 20, 4. tagja 500. Mennyi lehet az első hat tag összege?',
    options: ['15 624 vagy 10 416', 'csak 15 624', '15 624 vagy −15 624', 'csak 10 416'],
    correctAnswer: 0,
    explanation: 'q = 5, a₁ = 4: S₆ = 15 624; q = −5, a₁ = −4: S₆ = −4 · 15 624/(−6) = 10 416.'
  },
  {
    id: 'pe-q85',
    questionTypeBadge: 'Kamatos kamat',
    level: 3,
    question: 'Ha az 1626-ban kapott 24 dollárt évi 7%-ra fektették volna, 338 év múlva 24 · 1,07³³⁸ ≈ 205 milliárd dollárt érne. Hányszorosa ez a 6,5%-os 42 milliárdnak?',
    options: ['≈ 4,9-szerese', '≈ 1,08-szorosa', '≈ 0,5%-kal több', '≈ 2-szerese'],
    correctAnswer: 0,
    explanation: '205/42 ≈ 4,9 = (1,07/1,065)³³⁸ – a fél százalékpontnyi különbség 338 év alatt közel ötszörös eltérést okoz.'
  },
  {
    id: 'pe-q86',
    questionTypeBadge: 'Részletösszeg',
    level: 3,
    question: 'Egy sorozat páratlan sorszámú tagjai 24, páros sorszámú tagjai −23. Mennyi az első 15 tag összege?',
    options: ['31', '5', '7', '−23'],
    correctAnswer: 0,
    explanation: '8 db 24-es és 7 db −23-as tag: 192 − 161 = 31. (Az első 10 tag összege 5.)'
  },
  {
    id: 'pe-q87',
    questionTypeBadge: 'Váltakozó sorozat',
    level: 3,
    question: 'Mennyi az aₙ = 8 · (−1)ⁿ sorozat első 25 tagjának összege, és hány elemű az értékkészlete?',
    options: ['−8; 2 elemű', '0; 2 elemű', '8; 25 elemű', '−8; 25 elemű'],
    correctAnswer: 0,
    explanation: 'A tagok −8; 8; −8; …: 24 tag párosával 0-t ad, marad a₂₅ = −8. Az értékkészlet {−8; 8}.'
  },
  {
    id: 'pe-q88',
    questionTypeBadge: 'Periodikus',
    figure: FIG_GUARD,
    level: 3,
    question: 'A biztonsági őr (4 nap munka, 2 nap pihenő, január 1-jén kezdett) az év 125. napjának reggelén hány ledolgozott munkanappal rendelkezik?',
    options: ['84', '83', '80', '82'],
    correctAnswer: 0,
    explanation: 'Előtte 124 nap telt el: 124 = 20 · 6 + 4 ⇒ 20 · 4 + 4 = 84 munkanap.'
  },
  {
    id: 'pe-q89',
    questionTypeBadge: 'Számtani közép',
    level: 3,
    question: 'Egy számtani sorozat 10., 11. és 12. tagjának összege 63, a differencia 5. Mennyi az első tag?',
    options: ['−29', '21', '−24', '−34'],
    correctAnswer: 0,
    explanation: 'a₁₁ = 63/3 = 21 (a₁₀ és a₁₂ számtani közepe); a₁ = 21 − 10 · 5 = −29.'
  },
  {
    id: 'pe-q90',
    questionTypeBadge: 'Számtani összeg',
    level: 3,
    question: 'Mennyi a pozitív egész számok összege 100-tól 1000-ig (a végpontokat is beleértve)?',
    options: ['495 550', '495 000', '500 500', '450 550'],
    correctAnswer: 0,
    explanation: '901 szám, (100 + 1000)/2 · 901 = 550 · 901 = 495 550.'
  }
];

export const SequencesPracticeExamQuiz: React.FC<{
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
      topicId="g12-seq-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="10. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 tesztkérdés 3 nehézségi szinten a teljes fejezetből: sorozatok megadása, számtani és mértani sorozatok, összegek, pénzügyi feladatok."
      badge="12. OSZTÁLY • II. SOROZATOK • KVÍZ"
      questions={PRACTICE_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számtani sorozat',
          items: ['aₙ = a₁ + (n − 1)d', 'aᵢ − aⱼ = (i − j)d', 'Sₙ = (a₁ + aₙ)/2 · n', 'aₙ = (aₙ₋₁ + aₙ₊₁)/2']
        },
        {
          title: 'Mértani sorozat',
          items: ['aₙ = a₁ · qⁿ⁻¹', 'aᵢ/aⱼ = qⁱ⁻ʲ (páros kitevőnél ± q)', 'Sₙ = a₁(qⁿ − 1)/(q − 1), q ≠ 1', 'aₙ² = aₙ₋₁ · aₙ₊₁']
        },
        {
          title: 'Pénzügyek',
          items: ['Kₙ = K₀ · qⁿ, q = 1 + p/100', 'gyűjtőjáradék: x · q(qⁿ − 1)/(q − 1)', 'hitelrészlet: x = T · qⁿ(q − 1)/(qⁿ − 1)', 'havi kamatláb: p/12 %']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SequencesPracticeExamMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <SequencesPracticeExamSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default SequencesPracticeExamQuiz;
