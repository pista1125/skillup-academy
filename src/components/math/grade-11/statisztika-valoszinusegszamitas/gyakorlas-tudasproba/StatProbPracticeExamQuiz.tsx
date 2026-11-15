import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { StatProbPracticeExamMatcher } from './StatProbPracticeExamMatcher';
import { StatProbPracticeExamSorter } from './StatProbPracticeExamSorter';
import { StatProbExamGradesPieSvg, StatProbExamVennSvg, StatProbExamStockSvg, StatProbExamSpecialDieSvg } from './StatProbPracticeExamFigures';
import { StatisticsPracticeBoxPlot } from '../gyakorlas-statisztika/StatisticsPracticeFigures';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Dobozdiagram tengellyel (értékek nélkül – le kell olvasni). */
const BoxFig: React.FC<{ min: number; q1: number; med: number; q3: number; max: number; from: number; to: number; step?: number }> = ({ min, q1, med, q3, max, from, to, step = 1 }) => (
  <svg viewBox="0 0 300 120" className={FIG_CLASS}>
    <rect x="2" y="2" width="296" height="116" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <StatisticsPracticeBoxPlot min={min} q1={q1} med={med} q3={q3} max={max} axisFrom={from} axisTo={to} step={step} x0={20} x1={280} y={48} />
  </svg>
);

/** Gyakorisági táblázat. */
const FreqFig: React.FC<{ values: (number | string)[]; freq: (number | string)[]; head?: string }> = ({ values, freq, head = 'adat' }) => {
  const w = Math.min(36, 220 / values.length);
  const x0 = 70;
  return (
    <svg viewBox={`0 0 ${x0 + values.length * w + 12} 74`} className={FIG_CLASS}>
      <rect x="2" y="2" width={x0 + values.length * w + 8} height="70" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
      <text x={x0 - 6} y="29" fontSize="10" textAnchor="end" fill="#334155">
        {head}
      </text>
      <text x={x0 - 6} y="55" fontSize="10" textAnchor="end" fill="#334155">
        gyakoriság
      </text>
      {values.map((v, i) => (
        <g key={i}>
          <rect x={x0 + i * w} y="12" width={w} height="26" fill="#e0f2fe" stroke="#0284c7" />
          <text x={x0 + i * w + w / 2} y="29" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
            {v}
          </text>
          <rect x={x0 + i * w} y="38" width={w} height="26" fill="#ffffff" stroke="#0284c7" />
          <text x={x0 + i * w + w / 2} y="55" fontSize="11" textAnchor="middle" fill="#0f172a">
            {freq[i]}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Urna golyókkal. */
const UrnFig: React.FC<{ reds: number; blues: number; caption: string }> = ({ reds, blues, caption }) => {
  const total = reds + blues;
  const cols = Math.min(6, total);
  const step = 24;
  const rows = Math.ceil(total / cols);
  const w = cols * step;
  const x0 = 120 - w / 2 + step / 2;
  const bottom = 24 + rows * step + 4;
  return (
    <svg viewBox="0 0 240 140" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="136" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <path
        d={`M ${120 - w / 2 - 8} 10 L ${120 - w / 2 - 8} ${bottom - 8} Q ${120 - w / 2 - 8} ${bottom} ${120 - w / 2} ${bottom} L ${120 + w / 2} ${bottom} Q ${120 + w / 2 + 8} ${bottom} ${120 + w / 2 + 8} ${bottom - 8} L ${120 + w / 2 + 8} 10`}
        fill="#f1f5f9"
        stroke="#64748b"
        strokeWidth="1.5"
      />
      {Array.from({ length: total }, (_, i) => (
        <circle key={i} cx={x0 + (i % cols) * step} cy={24 + Math.floor(i / cols) * step} r="9.5" fill={i < reds ? '#fb7185' : '#38bdf8'} stroke={i < reds ? '#be123c' : '#0369a1'} strokeWidth="1.3" />
      ))}
      <text x="120" y={Math.min(bottom + 18, 116)} fontSize="10" textAnchor="middle" fill="#334155">
        {reds} piros, {blues} kék golyó
      </text>
      <text x="120" y={Math.min(bottom + 32, 131)} fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0c4a6e">
        {caption}
      </text>
    </svg>
  );
};

/** Kördiagram szögekkel. */
const PieFig: React.FC<{ slices: { label: string; deg: number; color: string }[] }> = ({ slices }) => {
  const cx = 120;
  const cy = 80;
  const R = 60;
  let acc = 90;
  const pt = (deg: number, r: number) => ({ x: cx + r * Math.cos((deg * Math.PI) / 180), y: cy - r * Math.sin((deg * Math.PI) / 180) });
  return (
    <svg viewBox="0 0 240 160" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="156" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {slices.map((s) => {
        const a0 = acc;
        acc -= s.deg;
        const a1 = acc;
        const p0 = pt(a0, R);
        const p1 = pt(a1, R);
        const mid = pt((a0 + a1) / 2, R * 0.62);
        return (
          <g key={s.label}>
            <path d={`M ${cx} ${cy} L ${p0.x} ${p0.y} A ${R} ${R} 0 ${s.deg > 180 ? 1 : 0} 1 ${p1.x} ${p1.y} Z`} fill={s.color} stroke="#ffffff" strokeWidth="2" />
            <text x={mid.x} y={mid.y + 3} fontSize="9" textAnchor="middle" fill="#ffffff" fontWeight="bold">
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Két kocka. */
const DiceFig: React.FC<{ caption: string }> = ({ caption }) => (
  <svg viewBox="0 0 240 120" className={FIG_CLASS}>
    <rect x="2" y="2" width="236" height="116" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="58" y="18" width="54" height="54" rx="9" fill="#ffffff" stroke="#334155" strokeWidth="1.8" />
    {[
      [72, 32],
      [85, 45],
      [98, 58]
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="4.5" fill="#0f172a" />
    ))}
    <rect x="128" y="18" width="54" height="54" rx="9" fill="#fef3c7" stroke="#92400e" strokeWidth="1.8" />
    {[
      [142, 32],
      [168, 32],
      [142, 58],
      [168, 58]
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="4.5" fill="#0f172a" />
    ))}
    <text x="120" y="98" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      {caption}
    </text>
  </svg>
);

const MASS_FREQ = <FreqFig head="tömeg (g)" values={[33, 35, 36, 37, 38, 40]} freq={[2, 4, 4, 6, 2, 1]} />;
const TP2_FREQ = <FreqFig values={[14, 15, 16, 17, 18, 19, 20]} freq={[1, 2, 3, 3, 2, 1, 1]} />;
const GRADES_PIE = <StatProbExamGradesPieSvg className={FIG_CLASS} />;

const STAT_PROB_EXAM_QUESTIONS: QuizQuestion[] = [
  // ───────────── LEVEL 1 (30) ─────────────
  {
    id: 'sp-q1',
    level: 1,
    questionTypeBadge: 'Átlag',
    question: 'Mennyi a 2; 4; 4; 5; 10 adatok átlaga?',
    options: ['5', '4', '4,5', '25'],
    correctAnswer: 0,
    explanation: '(2 + 4 + 4 + 5 + 10) / 5 = 25 / 5 = 5. (A 4 a medián és a módusz.)'
  },
  {
    id: 'sp-q2',
    level: 1,
    questionTypeBadge: 'Medián',
    question: 'Mennyi a 3; 8; 1; 7; 5 adatsokaság mediánja?',
    options: ['5', '1', '4,8', '7'],
    correctAnswer: 0,
    explanation: 'Rendezve: 1; 3; 5; 7; 8. A középső (3.) elem az 5. (A 4,8 az átlag; az 1 a nem rendezett sor középső eleme.)'
  },
  {
    id: 'sp-q3',
    level: 1,
    questionTypeBadge: 'Medián',
    question: 'Mennyi a 2; 4; 6; 9 adatsokaság mediánja?',
    options: ['5', '4', '6', '5,25'],
    correctAnswer: 0,
    explanation: 'Páros elemszámnál a két középső elem átlaga: (4 + 6) / 2 = 5. (5,25 az átlag.)'
  },
  {
    id: 'sp-q4',
    level: 1,
    questionTypeBadge: 'Módusz',
    question: 'Mennyi a 2; 3; 3; 5; 5; 5; 7 adatsokaság módusza?',
    options: ['5', '3', '4,29', '7'],
    correctAnswer: 0,
    explanation: 'A leggyakoribb adat az 5 (háromszor fordul elő).'
  },
  {
    id: 'sp-q5',
    level: 1,
    questionTypeBadge: 'Terjedelem',
    question: 'Mennyi a 12; 7; 19; 4 adatsokaság terjedelme?',
    options: ['15', '12', '19', '7'],
    correctAnswer: 0,
    explanation: 'Terjedelem = legnagyobb − legkisebb = 19 − 4 = 15.'
  },
  {
    id: 'sp-q6',
    level: 1,
    questionTypeBadge: 'Kördiagram',
    question: 'Egy 24 fős osztályban 6 tanuló kapott elégségest. Hány fokos körcikk tartozik hozzájuk a kördiagramon?',
    options: ['90°', '60°', '6°', '144°'],
    correctAnswer: 0,
    explanation: 'Egy tanuló 360° / 24 = 15°, így 6 tanuló 6 · 15° = 90°.'
  },
  {
    id: 'sp-q7',
    level: 1,
    questionTypeBadge: 'Kördiagram',
    question: 'A 24 fős osztály kördiagramján a jelesek körcikke 45°-os. Hány jeles dolgozat volt?',
    figure: GRADES_PIE,
    options: ['3', '45', '4', '2'],
    correctAnswer: 0,
    explanation: 'Egy tanuló 15°-nak felel meg: 45° / 15° = 3.'
  },
  {
    id: 'sp-q8',
    level: 1,
    questionTypeBadge: 'Relatív gyakoriság',
    question: 'A 24 tanulóból 9 kapott közepest. Mennyi a közepes relatív gyakorisága?',
    options: ['0,375', '9', '0,09', '0,24'],
    correctAnswer: 0,
    explanation: 'Relatív gyakoriság = gyakoriság / összes = 9 / 24 = 0,375.'
  },
  {
    id: 'sp-q9',
    level: 1,
    questionTypeBadge: 'Dobozdiagram',
    question: 'Olvasd le a dobozdiagramról a mediánt!',
    figure: <BoxFig min={11} q1={14} med={16} q3={19} max={22} from={10} to={23} />,
    options: ['16', '14', '19', '16,5'],
    correctAnswer: 0,
    explanation: 'A medián a dobozon belüli (piros) vonal: 16. A doboz két széle Q₁ = 14 és Q₃ = 19.'
  },
  {
    id: 'sp-q10',
    level: 1,
    questionTypeBadge: 'Dobozdiagram',
    question: 'Mennyi a dobozdiagrammal ábrázolt adatsokaság félterjedelme (Q₃ − Q₁)?',
    figure: <BoxFig min={2} q1={4} med={7} q3={10} max={13} from={0} to={14} />,
    options: ['6', '11', '3', '7'],
    correctAnswer: 0,
    explanation: 'Q₁ = 4, Q₃ = 10, így a félterjedelem 10 − 4 = 6. (11 a terjedelem: 13 − 2.)'
  },
  {
    id: 'sp-q11',
    level: 1,
    questionTypeBadge: 'Szórás',
    question: 'Egy adatsokaság mind a 15 eleme 222. Mennyi a szórása?',
    options: ['0', '222', '1', '15'],
    correctAnswer: 0,
    explanation: 'Minden adat egyenlő az átlaggal, minden eltérés 0, így a szórás 0.'
  },
  {
    id: 'sp-q12',
    level: 1,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi az 1 és a 3 adatokból álló adatsokaság szórása?',
    options: ['1', '2', '√2', '0'],
    correctAnswer: 0,
    explanation: 'Átlag 2, eltérések −1 és 1; √((1 + 1) / 2) = √1 = 1.'
  },
  {
    id: 'sp-q13',
    level: 1,
    questionTypeBadge: 'Klasszikus valószínűség',
    question: 'Egy szabályos dobókockával dobunk. Mennyi a valószínűsége, hogy páros számot dobunk?',
    options: ['1/2', '1/3', '1/6', '2/3'],
    correctAnswer: 0,
    explanation: 'Kedvező: 2, 4, 6 (3 eset), összes: 6. P = 3/6 = 1/2.'
  },
  {
    id: 'sp-q14',
    level: 1,
    questionTypeBadge: 'Klasszikus valószínűség',
    question: 'Mennyi a valószínűsége, hogy egy kockadobás eredménye legalább 5?',
    options: ['1/3', '1/6', '1/2', '5/6'],
    correctAnswer: 0,
    explanation: 'Kedvező: 5, 6 (2 eset): 2/6 = 1/3.'
  },
  {
    id: 'sp-q15',
    level: 1,
    questionTypeBadge: 'Komplementer',
    question: 'Egy esemény valószínűsége 0,3. Mennyi a komplementer (ellentett) esemény valószínűsége?',
    options: ['0,7', '0,3', '−0,3', '1,3'],
    correctAnswer: 0,
    explanation: 'P(nem A) = 1 − P(A) = 1 − 0,3 = 0,7.'
  },
  {
    id: 'sp-q16',
    level: 1,
    questionTypeBadge: 'Két kocka',
    question: 'Két szabályos kockával dobunk. Mennyi a valószínűsége, hogy a dobott számok összege 7?',
    figure: <DiceFig caption="két kocka: 36 egyenlően valószínű kimenetel" />,
    options: ['1/6', '7/36', '1/12', '1/11'],
    correctAnswer: 0,
    explanation: 'A 7-es összeg: (1;6), (2;5), (3;4), (4;3), (5;2), (6;1) – 6 eset a 36-ból: 6/36 = 1/6.'
  },
  {
    id: 'sp-q17',
    level: 1,
    questionTypeBadge: 'Független ismétlés',
    question: 'Egy érmét háromszor feldobunk. Mennyi a valószínűsége, hogy mindháromszor fej lesz?',
    options: ['1/8', '1/6', '3/8', '1/2'],
    correctAnswer: 0,
    explanation: '(1/2) · (1/2) · (1/2) = 1/8.'
  },
  {
    id: 'sp-q18',
    level: 1,
    questionTypeBadge: 'Várható érték',
    question: 'Mennyi egy szabályos dobókockával dobott szám várható értéke?',
    options: ['3,5', '3', '4', '6'],
    correctAnswer: 0,
    explanation: 'E = (1 + 2 + 3 + 4 + 5 + 6) / 6 = 21 / 6 = 3,5.'
  },
  {
    id: 'sp-q19',
    level: 1,
    questionTypeBadge: 'Várható érték',
    question: 'A különleges kocka 3 lapján 1, 2 lapján 3, egy lapján 6 pont van. Mennyi egy dobás várható értéke?',
    figure: <StatProbExamSpecialDieSvg className={FIG_CLASS} />,
    options: ['2,5', '3,33', '3,5', '2'],
    correctAnswer: 0,
    explanation: 'E = 1 · 3/6 + 3 · 2/6 + 6 · 1/6 = (3 + 6 + 6) / 6 = 15/6 = 2,5. (3,33 = (1 + 3 + 6)/3 súlyozás nélkül.)'
  },
  {
    id: 'sp-q20',
    level: 1,
    questionTypeBadge: 'Méltányos játék',
    question: 'Mikor nevezünk egy szerencsejátékot méltányosnak (igazságosnak)?',
    options: ['ha a nyeremény várható értéke 0', 'ha a nyerés valószínűsége 1/2', 'ha mindenki nyer egyszer', 'ha a tét 0 Ft'],
    correctAnswer: 0,
    explanation: 'Méltányos a játék, ha a játékos nyereményének várható értéke 0: hosszú távon egyik fél sem jár jobban.'
  },
  {
    id: 'sp-q21',
    level: 1,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Mennyi az (5 alatt 2) értéke?',
    options: ['10', '20', '25', '7'],
    correctAnswer: 0,
    explanation: '(5 alatt 2) = 5 · 4 / 2 = 10.'
  },
  {
    id: 'sp-q22',
    level: 1,
    questionTypeBadge: 'Binomiális együttható',
    question: 'Hányféleképpen választhatunk ki 10 tanuló közül 3-at (a sorrend nem számít)?',
    options: ['120', '720', '30', '1000'],
    correctAnswer: 0,
    explanation: '(10 alatt 3) = 10 · 9 · 8 / 3! = 720 / 6 = 120. (720 a sorrendet is számolná.)'
  },
  {
    id: 'sp-q23',
    level: 1,
    questionTypeBadge: 'Egyszerre húzás',
    question: 'Egyszerre 2 golyót húzunk. Mennyi a valószínűsége, hogy mindkettő piros?',
    figure: <UrnFig reds={3} blues={2} caption="egyszerre 2 golyót húzunk" />,
    options: ['3/10', '9/25', '3/5', '1/10'],
    correctAnswer: 0,
    explanation: '(3 alatt 2) / (5 alatt 2) = 3 / 10. (9/25 a visszatevéses eredmény lenne.)'
  },
  {
    id: 'sp-q24',
    level: 1,
    questionTypeBadge: 'Modellválasztás',
    question: 'Az ötös lottó sorsolása (90 számból 5) milyen mintavétel?',
    options: ['visszatevés nélküli', 'visszatevéses', 'binomiális', 'független ismétlés'],
    correctAnswer: 0,
    explanation: 'A kihúzott számot nem teszik vissza, minden szám legfeljebb egyszer szerepel.'
  },
  {
    id: 'sp-q25',
    level: 1,
    questionTypeBadge: 'Független ismétlés',
    question: 'Egy játékos 0,7 valószínűséggel értékesít egy büntetőt. Mennyi a valószínűsége, hogy két büntetőből mindkettőt értékesíti?',
    options: ['0,49', '1,4', '0,7', '0,21'],
    correctAnswer: 0,
    explanation: 'Független kísérletek: 0,7 · 0,7 = 0,49.'
  },
  {
    id: 'sp-q26',
    level: 1,
    questionTypeBadge: 'Képlet',
    question: 'Egy kísérletben a siker valószínűsége p. Mennyi a valószínűsége, hogy n független ismétlésből pontosan k-szor sikerül?',
    options: ['(n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ', 'pᵏ', 'k · p', '(n alatt k) · pⁿ'],
    correctAnswer: 0,
    explanation: 'Binomiális eloszlás: egy sorrend valószínűsége pᵏ(1 − p)ⁿ⁻ᵏ, és (n alatt k)-féle sorrend van.'
  },
  {
    id: 'sp-q27',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit mutat meg a szórás?',
    options: ['mennyire térnek el az adatok az átlagtól', 'a leggyakoribb adatot', 'a középső adatot', 'az adatok számát'],
    correctAnswer: 0,
    explanation: 'A szórás az adatok átlagtól való eltérését (szóródását) jellemzi. A leggyakoribb a módusz, a középső a medián.'
  },
  {
    id: 'sp-q28',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Egy adatsokaságba egy nagyon nagy (kiugró) érték kerül. Melyik jellemző változik a legkevésbé?',
    options: ['a medián', 'az átlag', 'a terjedelem', 'a szórás'],
    correctAnswer: 0,
    explanation: 'A medián csak a középső helyzetű adattól függ, ezért a kiugró értékek alig befolyásolják. Az átlag, a terjedelem és a szórás jelentősen nőhet.'
  },
  {
    id: 'sp-q29',
    level: 1,
    questionTypeBadge: 'Kvartilis',
    question: 'Mit jelent az alsó kvartilis (Q₁)?',
    options: ['az adatoknak kb. a negyede kisebb vagy egyenlő nála', 'az adatoknak a fele kisebb nála', 'a legkisebb adat', 'az átlag negyede'],
    correctAnswer: 0,
    explanation: 'Az alsó kvartilisnél az adatoknak (közelítőleg) a negyede kisebb vagy egyenlő; a medián a felére, a felső kvartilis a háromnegyedére igaz.'
  },
  {
    id: 'sp-q30',
    level: 1,
    questionTypeBadge: 'Logika',
    question: 'Igaz-e: ha egy adatsokaság átlaga 0, akkor az összes adat egyenlő?',
    options: ['hamis, pl. −1 és 1', 'igaz, mindig', 'igaz, ha az adatok egészek', 'csak páros elemszámnál igaz'],
    correctAnswer: 0,
    explanation: 'Ellenpélda: a −1; 1 adatok átlaga 0, de nem egyenlők. (Ha viszont a szórás 0, akkor minden adat egyenlő.)'
  },

  // ───────────── LEVEL 2 (30) ─────────────
  {
    id: 'sp-q31',
    level: 2,
    questionTypeBadge: 'Átlag',
    question: '19 tanuló tömegmérésének eredményei a táblázatban láthatók. Mennyi a mérések átlaga grammra kerekítve?',
    figure: MASS_FREQ,
    options: ['36 g', '37 g', '35 g', '36,5 g'],
    correctAnswer: 0,
    explanation: 'Összeg: 2 · 33 + 4 · 35 + 4 · 36 + 6 · 37 + 2 · 38 + 40 = 688; 688 / 19 ≈ 36,21 ⇒ 36 g.'
  },
  {
    id: 'sp-q32',
    level: 2,
    questionTypeBadge: 'Módusz',
    question: 'Mennyi a tömegmérések módusza?',
    figure: MASS_FREQ,
    options: ['37 g', '36 g', '6', '35 g'],
    correctAnswer: 0,
    explanation: 'A 37 g fordul elő a legtöbbször (6-szor). A 6 a gyakoriság, nem az adat.'
  },
  {
    id: 'sp-q33',
    level: 2,
    questionTypeBadge: 'Medián',
    question: 'Mennyi a 19 tömegmérés mediánja?',
    figure: MASS_FREQ,
    options: ['36 g', '37 g', '35 g', '36,5 g'],
    correctAnswer: 0,
    explanation: '19 adat esetén a medián a 10. elem. A rendezett sorban 2 db 33, 4 db 35 (6. elemig), 4 db 36 (7.–10. elem): a 10. elem 36 g.'
  },
  {
    id: 'sp-q34',
    level: 2,
    questionTypeBadge: 'Kvartilis',
    question: 'Mennyi a 19 tömegmérés alsó kvartilise?',
    figure: MASS_FREQ,
    options: ['35 g', '33 g', '36 g', '34 g'],
    correctAnswer: 0,
    explanation: 'Páratlan elemszám: a mediánt (10. elem) elhagyjuk, az alsó 9 adat (33, 33, 35, 35, 35, 35, 36, 36, 36) mediánja az 5. elem: 35 g.'
  },
  {
    id: 'sp-q35',
    level: 2,
    questionTypeBadge: 'Átlag',
    question: 'A kördiagram a 24 tanuló osztályzatait mutatja (egy tanuló 15°). Mennyi az osztályzatok átlaga?',
    figure: GRADES_PIE,
    options: ['3', '3,25', '2,75', '3,5'],
    correctAnswer: 0,
    explanation: 'Gyakoriságok: 5-ös 3, 4-es 4, 3-as 9, 2-es 6, 1-es 2. Átlag = (15 + 16 + 27 + 12 + 2) / 24 = 72 / 24 = 3.'
  },
  {
    id: 'sp-q36',
    level: 2,
    questionTypeBadge: 'Medián',
    question: 'Mennyi a kördiagramon ábrázolt 24 osztályzat mediánja?',
    figure: GRADES_PIE,
    options: ['3', '2', '4', '3,5'],
    correctAnswer: 0,
    explanation: 'Rendezve: 2 db 1-es, 6 db 2-es (3.–8.), 9 db 3-as (9.–17.). A 12. és 13. elem is 3, így a medián 3.'
  },
  {
    id: 'sp-q37',
    level: 2,
    questionTypeBadge: 'Kvartilis',
    question: 'Mennyi a táblázatban megadott 13 adat alsó kvartilise?',
    figure: TP2_FREQ,
    options: ['15,5', '15', '16', '14,5'],
    correctAnswer: 0,
    explanation: 'A medián a 7. adat (17). Az alsó 6 adat: 14, 15, 15, 16, 16, 16; mediánja (15 + 16) / 2 = 15,5.'
  },
  {
    id: 'sp-q38',
    level: 2,
    questionTypeBadge: 'Dobozdiagram',
    question: 'A táblázat 13 adatából dobozdiagramot készítünk. Hol lesz a doboz jobb széle (Q₃)?',
    figure: TP2_FREQ,
    options: ['18', '17', '18,5', '19'],
    correctAnswer: 0,
    explanation: 'A felső 6 adat (a medián elhagyása után): 17, 17, 18, 18, 19, 20; mediánja (18 + 18) / 2 = 18.'
  },
  {
    id: 'sp-q39',
    level: 2,
    questionTypeBadge: 'Várható érték',
    question: 'Egy részvény ma 3200 Ft. Jövőre 0,2 eséllyel nem változik, 0,4 eséllyel 15%-kal nő, 0,4 eséllyel 10%-kal csökken. Mennyi a jövő évi ár várható értéke?',
    figure: <StatProbExamStockSvg className={FIG_CLASS} />,
    options: ['3264 Ft', '3280 Ft', '3200 Ft', '3253 Ft'],
    correctAnswer: 0,
    explanation: 'E = 0,2 · 3200 + 0,4 · 3680 + 0,4 · 2880 = 640 + 1472 + 1152 = 3264 Ft.'
  },
  {
    id: 'sp-q40',
    level: 2,
    questionTypeBadge: 'Visszatevés nélkül',
    question: 'Az 1; 2; …; 50 számok közül véletlenszerűen kiválasztunk hármat. Mennyi a valószínűsége, hogy mindhárom páros?',
    options: ['≈ 0,117', '0,125', '≈ 0,5', '≈ 0,019'],
    correctAnswer: 0,
    explanation: '(25 alatt 3) / (50 alatt 3) = 2300 / 19 600 ≈ 0,117. (0,125 = (1/2)³ visszatevéssel lenne.)'
  },
  {
    id: 'sp-q41',
    level: 2,
    questionTypeBadge: 'Visszatevés nélkül',
    question: 'Az 1–50 számok közül hármat választunk. Mennyi a valószínűsége, hogy kettő osztható 5-tel, egy pedig nem?',
    options: ['≈ 0,092', '≈ 0,096', '≈ 0,0023', '≈ 0,4'],
    correctAnswer: 0,
    explanation: '10 szám osztható 5-tel, 40 nem: (10 alatt 2) · 40 / (50 alatt 3) = 45 · 40 / 19 600 = 1800 / 19 600 ≈ 0,092.'
  },
  {
    id: 'sp-q42',
    level: 2,
    questionTypeBadge: 'Venn-diagram',
    question: 'A 36 fős osztályból 4 tanulót választunk. Mennyi a valószínűsége, hogy egyikük sem olvasta a két könyv egyikét sem?',
    figure: <StatProbExamVennSvg className={FIG_CLASS} />,
    options: ['≈ 0,017', '≈ 0,023', '≈ 0,389', '≈ 0,15'],
    correctAnswer: 0,
    explanation: '36 − 12 − 10 = 14 tanuló egyiket sem olvasta: (14 alatt 4) / (36 alatt 4) = 1001 / 58 905 ≈ 0,017. (0,023 ≈ (14/36)⁴ visszatevéssel.)'
  },
  {
    id: 'sp-q43',
    level: 2,
    questionTypeBadge: 'Binomiális',
    question: 'Az automata 0,8 valószínűséggel ad szénsavmentes vizet. Anna 5 napon kér. Mennyi a valószínűsége, hogy legalább 4 napon szénsavmentest kap?',
    options: ['≈ 0,737', '≈ 0,410', '≈ 0,328', '0,8'],
    correctAnswer: 0,
    explanation: '(5 alatt 4) · 0,8⁴ · 0,2 + 0,8⁵ = 0,4096 + 0,32768 ≈ 0,737.'
  },
  {
    id: 'sp-q44',
    level: 2,
    questionTypeBadge: 'Binomiális',
    question: 'A dobozok 0,01 valószínűséggel kapnak rossz matricát. Péter 21 szürke jelzésű dobozt választ. Mennyi a valószínűsége, hogy legalább 20-ban valóban szürke kő van?',
    options: ['≈ 0,981', '≈ 0,810', '≈ 0,172', '0,99'],
    correctAnswer: 0,
    explanation: '0,99²¹ + 21 · 0,01 · 0,99²⁰ ≈ 0,8097 + 0,1718 ≈ 0,981.'
  },
  {
    id: 'sp-q45',
    level: 2,
    questionTypeBadge: 'Logika',
    question: '17 dolgozat (1–5-ös jegyek): a medián 4. Igaz-e, hogy a dolgozatok több mint fele jobb hármasnál?',
    options: ['igaz', 'hamis', 'nem dönthető el', 'csak akkor, ha az átlag 4'],
    correctAnswer: 0,
    explanation: 'A medián a 9. jegy, és 4; a rendezett sorban a 9.–17. jegy legalább 4-es: ez 9 dolgozat, több mint 17/2.'
  },
  {
    id: 'sp-q46',
    level: 2,
    questionTypeBadge: 'Logika',
    question: '17 dolgozat (1–5-ös jegyek) terjedelme 4. Igaz-e, hogy nincs hármasnál rosszabb dolgozat?',
    options: ['hamis, mert van 1-es', 'igaz', 'nem dönthető el', 'igaz, ha a módusz 4'],
    correctAnswer: 0,
    explanation: 'Terjedelem 4 csak 5 − 1 = 4 lehet, tehát van 1-es (és 5-ös) dolgozat.'
  },
  {
    id: 'sp-q47',
    level: 2,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a 2; 4; 4; 4; 5; 5; 7; 9 adatsokaság szórása?',
    options: ['2', '4', '5', '√2'],
    correctAnswer: 0,
    explanation: 'Átlag 5; eltérésnégyzetek: 9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32; 32/8 = 4; szórás √4 = 2.'
  },
  {
    id: 'sp-q48',
    level: 2,
    questionTypeBadge: 'Két kocka',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy az összeg legalább 10?',
    figure: <DiceFig caption="összeg ≥ 10?" />,
    options: ['1/6', '1/12', '1/4', '5/36'],
    correctAnswer: 0,
    explanation: 'Összeg 10: 3 eset, 11: 2 eset, 12: 1 eset; 6/36 = 1/6.'
  },
  {
    id: 'sp-q49',
    level: 2,
    questionTypeBadge: 'Két kocka',
    question: 'Két kockával dobunk. Mennyi a valószínűsége, hogy a nagyobbik dobott szám 6?',
    figure: <DiceFig caption="a nagyobbik szám 6?" />,
    options: ['11/36', '1/6', '1/36', '1/3'],
    correctAnswer: 0,
    explanation: 'P(max = 6) = 1 − P(mindkettő ≤ 5) = 1 − 25/36 = 11/36.'
  },
  {
    id: 'sp-q50',
    level: 2,
    questionTypeBadge: 'Várható érték',
    question: 'Három érmét dobunk fel. Mennyi a fejek számának várható értéke?',
    options: ['1,5', '1', '2', '3/8'],
    correctAnswer: 0,
    explanation: 'P(0; 1; 2; 3 fej) = 1/8; 3/8; 3/8; 1/8. E = 0 + 3/8 + 6/8 + 3/8 = 12/8 = 1,5.'
  },
  {
    id: 'sp-q51',
    level: 2,
    questionTypeBadge: 'Lottó',
    question: 'Mennyi a valószínűsége, hogy egy ötös lottó szelvény egyetlen találatot sem ér el?',
    options: ['≈ 0,746', '≈ 0,254', '≈ 0,944', '≈ 0,056'],
    correctAnswer: 0,
    explanation: '(85 alatt 5) / (90 alatt 5) = 32 801 517 / 43 949 268 ≈ 0,746.'
  },
  {
    id: 'sp-q52',
    level: 2,
    questionTypeBadge: 'Egyszerre húzás',
    question: '28 diák közül 15 tizenegyedikes. Két diákot választunk. Mennyi a valószínűsége, hogy mindkettő tizenegyedikes?',
    options: ['5/18', '≈ 0,287', '15/28', '13/63'],
    correctAnswer: 0,
    explanation: '(15 alatt 2) / (28 alatt 2) = 105 / 378 = 5/18 ≈ 0,278. (0,287 ≈ (15/28)² visszatevéssel.)'
  },
  {
    id: 'sp-q53',
    level: 2,
    questionTypeBadge: 'Visszatevéssel',
    question: 'Két golyót húzunk visszatevéssel. Mennyi a valószínűsége, hogy mindkettő piros?',
    figure: <UrnFig reds={4} blues={6} caption="2 húzás visszatevéssel" />,
    options: ['4/25', '2/15', '2/5', '16/45'],
    correctAnswer: 0,
    explanation: '4/10 · 4/10 = 16/100 = 4/25. (2/15 = 4/10 · 3/9 a visszatevés nélküli eredmény.)'
  },
  {
    id: 'sp-q54',
    level: 2,
    questionTypeBadge: 'Binomiális',
    question: 'A metrón egy utasnak 0,92 valószínűséggel van jegye. Mennyi a valószínűsége, hogy 50 ellenőrzött utasnak mind van?',
    options: ['≈ 0,0155', '0,92', '≈ 0,46', '≈ 0,08'],
    correctAnswer: 0,
    explanation: '0,92⁵⁰ ≈ 0,0155 – ez kisebb, mint 5%, ezért a főnök nem hinné el.'
  },
  {
    id: 'sp-q55',
    level: 2,
    questionTypeBadge: 'Binomiális',
    question: 'Tízszer feldobunk egy érmét. Mennyi a valószínűsége, hogy pontosan 5 fej lesz?',
    options: ['≈ 0,246', '0,5', '≈ 0,0010', '≈ 0,05'],
    correctAnswer: 0,
    explanation: '(10 alatt 5) / 2¹⁰ = 252 / 1024 ≈ 0,246.'
  },
  {
    id: 'sp-q56',
    level: 2,
    questionTypeBadge: 'Visszatevés nélkül',
    question: 'Egy zsákban 12 összetevő van, közülük 4 csattanó maszlag. Visszatevés nélkül hármat húzunk. Mennyi a valószínűsége, hogy nincs köztük maszlag?',
    options: ['14/55', '8/27', '1/3', '41/55'],
    correctAnswer: 0,
    explanation: '(8 alatt 3) / (12 alatt 3) = 56 / 220 = 14/55 ≈ 0,255. (8/27 = (2/3)³ visszatevéssel.)'
  },
  {
    id: 'sp-q57',
    level: 2,
    questionTypeBadge: 'Független ismétlés',
    question: 'Mennyi a valószínűsége, hogy egy kockával dobva először a harmadik dobásra lesz hatos?',
    options: ['25/216', '1/216', '1/6', '1/2'],
    correctAnswer: 0,
    explanation: 'Az első két dobás nem hatos, a harmadik hatos: (5/6) · (5/6) · (1/6) = 25/216 ≈ 0,116.'
  },
  {
    id: 'sp-q58',
    level: 2,
    questionTypeBadge: 'Komplementer',
    question: 'Négyszer dobunk egy kockával. Mennyi a valószínűsége, hogy legalább egyszer hatost dobunk?',
    options: ['≈ 0,518', '2/3', '≈ 0,482', '1/1296'],
    correctAnswer: 0,
    explanation: '1 − (5/6)⁴ = 1 − 625/1296 ≈ 0,518. (A 4 · 1/6 = 2/3 hibás: az esetek átfedik egymást.)'
  },
  {
    id: 'sp-q59',
    level: 2,
    questionTypeBadge: 'Kördiagram',
    question: 'Egy adat relatív gyakorisága 0,15. Hány fokos körcikk tartozik hozzá a kördiagramon?',
    options: ['54°', '15°', '45°', '36°'],
    correctAnswer: 0,
    explanation: 'Szög = relatív gyakoriság · 360° = 0,15 · 360° = 54°.'
  },
  {
    id: 'sp-q60',
    level: 2,
    questionTypeBadge: 'Várható érték',
    question: '100 sorsjegyből 5 nyer 1000 Ft-ot, a többi semmit. Mennyi egy sorsjegy nyereményének várható értéke?',
    options: ['50 Ft', '1000 Ft', '5 Ft', '200 Ft'],
    correctAnswer: 0,
    explanation: 'E = 0,95 · 0 + 0,05 · 1000 = 50 Ft.'
  },

  // ───────────── LEVEL 3 (30) ─────────────
  {
    id: 'sp-q61',
    level: 3,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a kördiagramon ábrázolt 24 osztályzat szórása (átlaguk 3)?',
    figure: GRADES_PIE,
    options: ['≈ 1,12', '1,25', '≈ 1,04', '≈ 1,5'],
    correctAnswer: 0,
    explanation: '(2 · 4 + 6 · 1 + 9 · 0 + 4 · 1 + 3 · 4) / 24 = 30/24 = 1,25 a szórásnégyzet; a szórás √1,25 ≈ 1,12.'
  },
  {
    id: 'sp-q62',
    level: 3,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a 19 tömegmérés szórása (átlag ≈ 36,21 g)?',
    figure: MASS_FREQ,
    options: ['≈ 1,64 g', '≈ 2,69 g', '≈ 1,21 g', '≈ 7 g'],
    correctAnswer: 0,
    explanation: 'Az eltérésnégyzetek átlaga ≈ 2,69 (ez a szórásnégyzet), a szórás √2,69 ≈ 1,64 g. (7 a terjedelem.)'
  },
  {
    id: 'sp-q63',
    level: 3,
    questionTypeBadge: 'Dobozdiagram',
    question: 'Melyik állítás igaz a dobozdiagrammal ábrázolt adatsokaságra?',
    figure: <BoxFig min={11} q1={14} med={16} q3={19} max={22} from={10} to={23} />,
    options: ['az adatok kb. fele 14 és 19 közé esik', 'az átlag biztosan 16', 'a terjedelem 5', 'az adatok fele kisebb, mint 14'],
    correctAnswer: 0,
    explanation: 'Q₁ = 14 és Q₃ = 19 között van az adatok kb. fele. Az átlag nem olvasható le; a terjedelem 22 − 11 = 11; 14 alatt kb. a negyed van.'
  },
  {
    id: 'sp-q64',
    level: 3,
    questionTypeBadge: 'Transzformáció',
    question: 'Egy adatsokaság minden eleméhez 5-öt adunk. Hogyan változik a szórás?',
    options: ['nem változik', '5-tel nő', '5-szörösére nő', '25-tel nő'],
    correctAnswer: 0,
    explanation: 'Az átlag is 5-tel nő, így az átlagtól való eltérések – és velük a szórás – változatlanok.'
  },
  {
    id: 'sp-q65',
    level: 3,
    questionTypeBadge: 'Transzformáció',
    question: 'Egy adatsokaság minden elemét megszorozzuk 2-vel. Hogyan változik a szórás?',
    options: ['kétszeresére nő', 'nem változik', 'négyszeresére nő', '2-vel nő'],
    correctAnswer: 0,
    explanation: 'Minden eltérés kétszeres lesz; a szórásnégyzet négyszeres, a szórás kétszeres.'
  },
  {
    id: 'sp-q66',
    level: 3,
    questionTypeBadge: 'Átlag',
    question: '17 dolgozat jegyeinek átlaga két tizedesjegyre kerekítve 3,41. Mennyi a jegyek összege?',
    options: ['58', '57', '59', '3,41 · 17 = 57,97, nem egész'],
    correctAnswer: 0,
    explanation: 'Az összeg egész szám: 57/17 ≈ 3,35, 58/17 ≈ 3,41, 59/17 ≈ 3,47. Tehát az összeg 58.'
  },
  {
    id: 'sp-q67',
    level: 3,
    questionTypeBadge: 'Átlag',
    question: 'Öt adat átlaga 6. Egy hatodik adatként a 12-t is hozzávesszük. Mennyi lesz az új átlag?',
    options: ['7', '9', '6', '6,5'],
    correctAnswer: 0,
    explanation: 'Az öt adat összege 30; az új összeg 42, 42 / 6 = 7.'
  },
  {
    id: 'sp-q68',
    level: 3,
    questionTypeBadge: 'Venn-diagram',
    question: 'A 36 fős osztályból 4 tanulót választunk. Mennyi a valószínűsége, hogy hárman A gyűrűk urát, egy pedig az Alkonyatot olvasta?',
    figure: <StatProbExamVennSvg className={FIG_CLASS} />,
    options: ['≈ 0,037', '≈ 0,0037', '≈ 0,15', '≈ 0,0045'],
    correctAnswer: 0,
    explanation: '(12 alatt 3) · (10 alatt 1) / (36 alatt 4) = 220 · 10 / 58 905 = 2200 / 58 905 ≈ 0,037.'
  },
  {
    id: 'sp-q69',
    level: 3,
    questionTypeBadge: 'Visszatevés nélkül',
    question: '24 jelentkezőből (15 tizenkettedikes, 9 tizenegyedikes) hármat sorsolnak ki. Mennyi a valószínűsége, hogy két tizenkettedikes és egy tizenegyedikes lesz?',
    options: ['≈ 0,467', '≈ 0,439', '≈ 0,225', '≈ 0,267'],
    correctAnswer: 0,
    explanation: '(15 alatt 2) · 9 / (24 alatt 3) = 945 / 2024 ≈ 0,467. (0,439 a visszatevéses közelítés; 0,225: mind 12.-es.)'
  },
  {
    id: 'sp-q70',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: '50 munkadarabból 20 selejtes; 15-öt vizsgálnak. Az „5, 6 vagy 7 selejtes” valószínűsége az egyik módszerrel ≈ 0,57, a másikkal ≈ 0,65. Melyik melyik?',
    options: ['0,57 visszatevéssel, 0,65 visszatevés nélkül', '0,65 visszatevéssel, 0,57 visszatevés nélkül', 'mindkettő visszatevés nélküli', 'nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'Visszatevéssel (binomiális, p = 0,4) ≈ 0,57; visszatevés nélkül (kedvező/összes) ≈ 0,65 – itt jobban a várt 40% körül marad az eredmény.'
  },
  {
    id: 'sp-q71',
    level: 3,
    questionTypeBadge: 'Visszatevés nélkül',
    question: 'A buszon 60 utas közül 12 tanulóbérletes. Az ellenőr 10 különböző utast kérdez meg. Mennyi a valószínűsége, hogy egyik sem tanulóbérletes?',
    options: ['≈ 0,087', '≈ 0,107', '0,8', '≈ 0,2'],
    correctAnswer: 0,
    explanation: '(48 alatt 10) / (60 alatt 10) ≈ 0,087. (0,8¹⁰ ≈ 0,107 a visszatevéses érték.)'
  },
  {
    id: 'sp-q72',
    level: 3,
    questionTypeBadge: 'Visszatevés nélkül',
    question: '64 LEGO-figurás csomagból 4 rejt űrhajóst. Mennyi a valószínűsége, hogy 5 megvásárolt figura között nincs űrhajós?',
    options: ['≈ 0,716', '≈ 0,724', '≈ 0,284', '≈ 0,938'],
    correctAnswer: 0,
    explanation: '(60 alatt 5) / (64 alatt 5) ≈ 0,716. (Visszatevéssel (15/16)⁵ ≈ 0,724 lenne.)'
  },
  {
    id: 'sp-q73',
    level: 3,
    questionTypeBadge: 'Binomiális',
    question: 'Egy alkatrész 0,1 valószínűséggel hibás. Mennyi a valószínűsége, hogy 10 alkatrész közül legfeljebb 1 hibás?',
    options: ['≈ 0,736', '≈ 0,349', '≈ 0,387', '0,9'],
    correctAnswer: 0,
    explanation: '0,9¹⁰ + 10 · 0,1 · 0,9⁹ ≈ 0,349 + 0,387 ≈ 0,736.'
  },
  {
    id: 'sp-q74',
    level: 3,
    questionTypeBadge: 'Független ismétlés',
    question: 'A vajas pirítós 0,62 valószínűséggel esik a vajas felére. Mennyi a valószínűsége, hogy 10 leeső szeletből mindegyik a vajas felére esik?',
    options: ['≈ 0,0084', '0,62', '≈ 0,62 · 10', '≈ 0,992'],
    correctAnswer: 0,
    explanation: '0,62¹⁰ ≈ 0,0084.'
  },
  {
    id: 'sp-q75',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Mennyi a valószínűsége, hogy 10 leeső vajas pirítós közül lesz olyan, amelyik nem a vajas felére esik (p = 0,62)?',
    options: ['≈ 0,992', '≈ 0,38', '≈ 0,0084', '≈ 0,0000635'],
    correctAnswer: 0,
    explanation: 'Komplementer: 1 − 0,62¹⁰ ≈ 1 − 0,0084 ≈ 0,992.'
  },
  {
    id: 'sp-q76',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'Bence mind a 6 órán 0,05 valószínűséggel felel. Mennyi a valószínűsége, hogy valamelyik órán felelni fog?',
    options: ['≈ 0,265', '0,3', '≈ 0,735', '0,05'],
    correctAnswer: 0,
    explanation: '1 − 0,95⁶ ≈ 1 − 0,735 ≈ 0,265. Bence 6 · 0,05 = 0,3-es becslése túl nagy, mert a „két órán is felel” eseteket többször számolja.'
  },
  {
    id: 'sp-q77',
    level: 3,
    questionTypeBadge: 'Binomiális',
    question: 'Bence mind a 6 órán 0,05 valószínűséggel felel. Mennyi a valószínűsége, hogy legalább két órán felel?',
    options: ['≈ 0,033', '≈ 0,232', '≈ 0,0025', '≈ 0,265'],
    correctAnswer: 0,
    explanation: '1 − 0,95⁶ − 6 · 0,05 · 0,95⁵ ≈ 1 − 0,735 − 0,232 ≈ 0,033.'
  },
  {
    id: 'sp-q78',
    level: 3,
    questionTypeBadge: 'Méltányos játék',
    question: 'Egy kockajátékban ha nem hatost dobsz, 10 Ft-ot kapsz; ha hatost, x Ft-ot fizetsz. Mekkora x esetén méltányos a játék?',
    options: ['50 Ft', '10 Ft', '60 Ft', '5/6 Ft'],
    correctAnswer: 0,
    explanation: 'E = (5/6) · 10 − (1/6) · x = 0 ⇔ x = 50 Ft.'
  },
  {
    id: 'sp-q79',
    level: 3,
    questionTypeBadge: 'Várható érték',
    question: 'Két kockával dobunk. Mennyi a nagyobbik dobott szám várható értéke?',
    figure: <DiceFig caption="a nagyobbik szám várható értéke?" />,
    options: ['161/36 ≈ 4,47', '3,5', '6', '7'],
    correctAnswer: 0,
    explanation: 'P(max = k) = (2k − 1)/36. E = (1 · 1 + 2 · 3 + 3 · 5 + 4 · 7 + 5 · 9 + 6 · 11) / 36 = 161/36 ≈ 4,47.'
  },
  {
    id: 'sp-q80',
    level: 3,
    questionTypeBadge: 'Várható érték',
    question: 'Az urnából visszatevés nélkül 3 golyót húzunk. Mennyi a kihúzott piros golyók számának várható értéke?',
    figure: <UrnFig reds={4} blues={6} caption="3 golyó visszatevés nélkül" />,
    options: ['1,2', '1', '1,5', '0,4'],
    correctAnswer: 0,
    explanation: 'E = n · S / N = 3 · 4/10 = 1,2 – ugyanannyi, mint visszatevéssel.'
  },
  {
    id: 'sp-q81',
    level: 3,
    questionTypeBadge: 'Binomiális',
    question: 'Egy kísérletben a siker valószínűsége 0,4; 15-ször ismételjük meg. Melyik sikerszám a legvalószínűbb?',
    options: ['6', '5', '7', '8'],
    correctAnswer: 0,
    explanation: 'P(5) ≈ 0,186, P(6) ≈ 0,207, P(7) ≈ 0,177: a 6 a legvalószínűbb (és ez 15 · 0,4 = 6 is).'
  },
  {
    id: 'sp-q82',
    level: 3,
    questionTypeBadge: 'Visszatevés nélkül',
    question: 'Az 1–50 számok közül hármat választunk. Mennyi a valószínűsége, hogy mindhárom nagyobb 40-nél?',
    options: ['≈ 0,0061', '0,008', '≈ 0,2', '≈ 0,0005'],
    correctAnswer: 0,
    explanation: 'A 41–50 számok (10 db) közül kell mindhármat választani: (10 alatt 3) / (50 alatt 3) = 120 / 19 600 ≈ 0,0061. (0,008 = 0,2³ visszatevéssel.)'
  },
  {
    id: 'sp-q83',
    level: 3,
    questionTypeBadge: 'Szórás',
    question: 'Mennyi a 14; 15; 15; 16; 16; 16; 17; 17; 17; 18; 18; 19; 20 adatsokaság szórása (átlag ≈ 16,77)?',
    figure: TP2_FREQ,
    options: ['≈ 1,62', '≈ 2,64', '6', '≈ 1,13'],
    correctAnswer: 0,
    explanation: 'Az eltérésnégyzetek átlaga ≈ 2,64 (szórásnégyzet), így a szórás ≈ √2,64 ≈ 1,62.'
  },
  {
    id: 'sp-q84',
    level: 3,
    questionTypeBadge: 'Kördiagram',
    question: 'A 24 osztályzat közül a közepesek relatív gyakorisága 0,375. Hány fokos a közepesek körcikke?',
    figure: <PieFig slices={[{ label: '45°', deg: 45, color: '#059669' }, { label: '60°', deg: 60, color: '#0284c7' }, { label: '?', deg: 135, color: '#7c3aed' }, { label: '90°', deg: 90, color: '#d97706' }, { label: '30°', deg: 30, color: '#e11d48' }]} />,
    options: ['135°', '37,5°', '120°', '150°'],
    correctAnswer: 0,
    explanation: '0,375 · 360° = 135°. Ellenőrzés: a többi körcikk összesen 45° + 60° + 90° + 30° = 225°, és 360° − 225° = 135°.'
  },
  {
    id: 'sp-q85',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Egy 30%-ban nyugdíjasokból álló társaságban 20 utalványt sorsolnak. Mi történik, ha a létszám 250-ről 2500-ra nő?',
    options: ['a visszatevés nélküli eloszlás még közelebb kerül a binomiálishoz', 'a binomiális eloszlás megváltozik', 'a két eloszlás egyre jobban eltér', 'a nyugdíjasok várhatóan több utalványt nyernek'],
    correctAnswer: 0,
    explanation: 'A binomiális eloszlás (n = 20, p = 0,3) nem függ a létszámtól; a visszatevés nélküli nagy sokaságnál szinte egybeesik vele.'
  },
  {
    id: 'sp-q86',
    level: 3,
    questionTypeBadge: 'Ismétlődés',
    question: '250 fő között 20 utalványt sorsolnak visszatevéssel (valaki többet is nyerhet). Mennyi a valószínűsége, hogy valaki legalább kettőt nyer?',
    options: ['≈ 0,54', '≈ 0,08', '20/250', '≈ 0,005'],
    correctAnswer: 0,
    explanation: 'P(mind különböző) = 250 · 249 · … · 231 / 250²⁰ ≈ 0,458, így 1 − 0,458 ≈ 0,54.'
  },
  {
    id: 'sp-q87',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Egy zsák 12 összetevőjéből 3 mandragóra. Melyik nagyobb: egyszerre hármat húzva pontosan 2 mandragóra, vagy visszatevéssel hármat húzva legalább 2?',
    options: ['a visszatevéses „legalább 2” (≈ 0,156)', 'az egyszerre húzott „pontosan 2” (≈ 0,123)', 'egyenlők', 'mindkettő 0,25'],
    correctAnswer: 0,
    explanation: 'Egyszerre: (3 alatt 2) · 9 / 220 = 27/220 ≈ 0,123; visszatevéssel: 3 · (1/4)² · (3/4) + (1/4)³ = 10/64 ≈ 0,156.'
  },
  {
    id: 'sp-q88',
    level: 3,
    questionTypeBadge: 'Szórás',
    question: 'A 4; 4; 4; 4 adatokhoz hozzávesszük a 8-at. Mennyi lesz az új adatsokaság szórása?',
    options: ['1,6', '0', '0,8', '2'],
    correctAnswer: 0,
    explanation: 'Új átlag: 24/5 = 4,8. Eltérésnégyzetek: 4 · 0,64 + 3,2² = 2,56 + 10,24 = 12,8; 12,8 / 5 = 2,56; szórás √2,56 = 1,6.'
  },
  {
    id: 'sp-q89',
    level: 3,
    questionTypeBadge: 'Lottó',
    question: 'Mennyi a valószínűsége, hogy egy ötös lottó szelvény pontosan 1 találatos?',
    options: ['≈ 0,230', '≈ 0,056', '≈ 0,746', '5/90'],
    correctAnswer: 0,
    explanation: '(5 alatt 1) · (85 alatt 4) / (90 alatt 5) ≈ 0,230.'
  },
  {
    id: 'sp-q90',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: '21 szürke jelzésű dobozból (rossz matrica: 0,01) mennyi a valószínűsége, hogy legfeljebb 19-ben van valóban szürke kő?',
    options: ['≈ 0,019', '≈ 0,981', '≈ 0,19', '0,01'],
    correctAnswer: 0,
    explanation: 'A „legalább 20 jó” valószínűsége ≈ 0,981, ennek komplementere: 1 − 0,981 ≈ 0,019.'
  }
];

export const StatProbPracticeExamQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId="g11-stat-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="16. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 tesztkérdés (szintenként 30) a teljes fejezetből: átlag, medián, módusz, diagramok, dobozdiagram, szórás, valószínűség, várható érték, egyszerre húzás, visszatevéses és visszatevés nélküli mintavétel."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={STAT_PROB_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Statisztikai jellemzők',
          items: [
            'átlag = összeg / elemszám; medián: középső elem',
            'kvartilisek: a két „fél” mediánja (páratlan n: a mediánt elhagyjuk)',
            'terjedelem = max − min; félterjedelem = Q₃ − Q₁',
            'szórás = √(eltérésnégyzetek átlaga); kördiagram: szög = rel. gyak. · 360°'
          ]
        },
        {
          title: 'Valószínűség, várható érték',
          items: [
            'P = kedvező / összes; P(nem A) = 1 − P(A)',
            'E = x₁p₁ + x₂p₂ + … + xₙpₙ; méltányos: E = 0',
            'egyszerre / visszatevés nélkül: (S alatt k)(N − S alatt n − k) / (N alatt n)',
            'visszatevéssel: (n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ'
          ]
        },
        {
          title: 'Ellenőrzött eredmények',
          items: [
            '24 osztályzat: átlag 3, szórás ≈ 1,12',
            'tömegmérés: átlag ≈ 36 g, Me 36, Mo 37, Q₁ 35, Q₃ 37',
            'részvény: 3264 Ft; különleges kocka: 2,5',
            'automata: ≈ 0,737; díszkő: ≈ 0,981'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <StatProbPracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <StatProbPracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default StatProbPracticeExamQuiz;
