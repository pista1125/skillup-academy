import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TrigGroupCompetitionMatcher } from './TrigGroupCompetitionMatcher';
import { TrigGroupCompetitionSorter } from './TrigGroupCompetitionSorter';

// --- Kvízábrák (csak ebben a fájlban) ---
const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';
const STROKE = '#334155';
const ACCENT = '#dc2626';
const LBL = { fontSize: 12, fill: '#0f172a', fontFamily: 'sans-serif' } as const;
const SMALL = { fontSize: 10, fill: '#0f172a', fontFamily: 'sans-serif' } as const;
const ASK = { fontSize: 13, fill: ACCENT, fontWeight: 700, fontFamily: 'sans-serif' } as const;

// Paralelogramma az átlóival: A(30,120) B(170,120) C(215,30) D(75,30), M = átlók metszéspontja.
const ParallelogramDiagonalsFig: React.FC<{ variant: 'halves' | 'long' | 'short' | 'area' }> = ({ variant }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <polygon points="30,120 170,120 215,30 75,30" fill="#eef2ff" stroke={STROKE} strokeWidth="2" />
    <line x1="30" y1="120" x2="215" y2="30" stroke="#6366f1" strokeWidth="1.5" />
    <line x1="170" y1="120" x2="75" y2="30" stroke="#6366f1" strokeWidth="1.5" />
    <circle cx="122.5" cy="75" r="2.2" fill="#0f172a" />
    <text x="18" y="134" style={LBL}>A</text>
    <text x="172" y="136" style={LBL}>B</text>
    <text x="218" y="28" style={LBL}>C</text>
    <text x="64" y="26" style={LBL}>D</text>
    <text x="118" y="68" style={SMALL}>M</text>
    {variant === 'halves' ? (
      <>
        <text x="120" y="146" textAnchor="middle" style={SMALL}>AC = 50 mm, BD = 30 mm</text>
        <text x="72" y="90" style={ASK}>?</text>
        <text x="152" y="94" style={ASK}>?</text>
      </>
    ) : (
      <>
        <text x="72" y="90" style={SMALL}>25</text>
        <text x="174" y="64" style={SMALL}>25</text>
        <text x="152" y="94" style={SMALL}>15</text>
        <text x="106" y="44" style={SMALL}>15</text>
        {variant !== 'short' && (
          <>
            <path d="M 109.9 81.1 A 14 14 0 0 0 132.7 84.6" fill="none" stroke={ACCENT} strokeWidth="1.5" />
            <text x="118.5" y="104" textAnchor="middle" style={SMALL}>120°</text>
          </>
        )}
        {variant === 'short' && (
          <>
            <path d="M 109.9 81.1 A 14 14 0 0 1 112.3 65.4" fill="none" stroke={ACCENT} strokeWidth="1.5" />
            <text x="95" y="74" textAnchor="middle" style={SMALL}>60°</text>
            <text x="40" y="76" style={ASK}>?</text>
          </>
        )}
        {variant === 'long' && <text x="100" y="138" style={ASK}>?</text>}
        {variant === 'area' && <text x="20" y="22" style={ASK}>T = ?</text>}
      </>
    )}
  </svg>
);

// Paralelogramma 10 mm és 70 mm oldallal, 150°-os szöggel.
const ThinParallelogramFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <polygon points="15,115 185,115 237,85 67,85" fill="#eef2ff" stroke={STROKE} strokeWidth="2" />
    <path d="M 173 115 A 12 12 0 0 1 195.4 109" fill="none" stroke={ACCENT} strokeWidth="1.5" />
    <text x="172" y="72" textAnchor="middle" style={SMALL}>150°</text>
    <line x1="174" y1="75" x2="181" y2="106" stroke="#94a3b8" strokeWidth="0.8" />
    <text x="100" y="132" textAnchor="middle" style={SMALL}>70 mm</text>
    <text x="214" y="114" style={SMALL}>10 mm</text>
    <text x="110" y="104" textAnchor="middle" style={ASK}>T = ?</text>
  </svg>
);

// Torony: a PQB háromszög a vízszintes talajon, B a torony talppontja, T a csúcsa.
const TowerFig: React.FC<{ variant: 'angle' | 'side' | 'height' }> = ({ variant }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <polygon points="25,135 165,135 120,100" fill="#f1f5f9" stroke={STROKE} strokeWidth="1.5" />
    <line x1="120" y1="100" x2="120" y2="18" stroke={STROKE} strokeWidth="3" />
    <text x="14" y="146" style={LBL}>P</text>
    <text x="168" y="147" style={LBL}>Q</text>
    <text x="108" y="99" style={LBL}>B</text>
    <text x="125" y="18" style={LBL}>T</text>
    {variant !== 'height' ? (
      <>
        <path d="M 41 135 A 16 16 0 0 0 40 129.5" fill="none" stroke={ACCENT} strokeWidth="1.5" />
        <text x="47" y="131" style={SMALL}>53°</text>
        <path d="M 149 135 A 16 16 0 0 1 152.4 125.2" fill="none" stroke={ACCENT} strokeWidth="1.5" />
        <text x="127" y="131" style={SMALL}>42°</text>
        <text x="95" y="148" textAnchor="middle" style={SMALL}>PQ = 15 m</text>
        {variant === 'angle' && (
          <>
            <path d="M 108.7 104.2 A 12 12 0 0 0 129.5 107.4" fill="none" stroke={ACCENT} strokeWidth="1.5" />
            <text x="114" y="124" style={ASK}>?</text>
          </>
        )}
        {variant === 'side' && <text x="150" y="112" style={ASK}>?</text>}
      </>
    ) : (
      <>
        <line x1="165" y1="135" x2="120" y2="18" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M 120 88 A 12 12 0 0 1 129.5 107.4" fill="none" stroke={STROKE} strokeWidth="1.2" />
        <circle cx="125.9" cy="97.1" r="1.8" fill={STROKE} />
        <path d="M 150.8 123.9 A 18 18 0 0 1 158.6 118.2" fill="none" stroke={ACCENT} strokeWidth="1.5" />
        <text x="160" y="112" style={SMALL}>72°</text>
        <text x="118" y="128" textAnchor="middle" style={SMALL}>QB ≈ 12,03 m</text>
        <text x="104" y="62" style={ASK}>?</text>
      </>
    )}
  </svg>
);

// Háromszög: α = 37° az A csúcsnál, b = AC = 74 mm, a = BC = 50 mm.
const SsaTriangleFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <polygon points="20,130 183.6,130 138.2,40.9" fill="#eef2ff" stroke={STROKE} strokeWidth="2" />
    <path d="M 38 130 A 18 18 0 0 0 34.4 119.2" fill="none" stroke={ACCENT} strokeWidth="1.5" />
    <text x="46" y="124" style={SMALL}>37°</text>
    <path d="M 167.6 130 A 16 16 0 0 1 176.3 115.7" fill="none" stroke={ACCENT} strokeWidth="1.5" />
    <text x="158" y="122" style={LBL}>β</text>
    <text x="8" y="142" style={LBL}>A</text>
    <text x="186" y="142" style={LBL}>B</text>
    <text x="136" y="34" style={LBL}>C</text>
    <text x="72" y="80" textAnchor="end" style={SMALL}>b = 74 mm</text>
    <text x="166" y="82" style={SMALL}>a = 50 mm</text>
    <text x="232" y="20" textAnchor="end" style={ASK}>sin β = ?</text>
  </svg>
);

// 20 cm sugarú kör, 110°-os középponti szög, a kisebbik körszelet satírozva.
const CircleSegmentFig: React.FC = () => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <circle cx="120" cy="85" r="55" fill="none" stroke={STROKE} strokeWidth="1.5" />
    <path d="M 74.95 53.45 A 55 55 0 0 1 165.05 53.45 Z" fill="#fecaca" stroke={STROKE} strokeWidth="1.5" />
    <line x1="120" y1="85" x2="74.95" y2="53.45" stroke={STROKE} strokeWidth="1.2" strokeDasharray="4 3" />
    <line x1="120" y1="85" x2="165.05" y2="53.45" stroke={STROKE} strokeWidth="1.2" strokeDasharray="4 3" />
    <circle cx="120" cy="85" r="2" fill="#0f172a" />
    <path d="M 108.5 77 A 14 14 0 0 1 131.5 77" fill="none" stroke={ACCENT} strokeWidth="1.5" />
    <text x="120" y="70" textAnchor="middle" style={SMALL}>110°</text>
    <text x="124" y="98" style={SMALL}>O</text>
    <text x="92" y="82" textAnchor="end" style={SMALL}>r = 20 cm</text>
    <text x="120" y="47" textAnchor="middle" style={ASK}>T = ?</text>
  </svg>
);

// Trapéz: AB = 57 cm, DC = 41 cm, AD = 38 cm, A-nál 73°.
const TrapezoidFig: React.FC<{ diagonal: 'BD' | 'AC' }> = ({ diagonal }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <polygon points="20,130 220,130 199,30 55,30" fill="#eef2ff" stroke={STROKE} strokeWidth="2" />
    {diagonal === 'BD' ? (
      <>
        <line x1="220" y1="130" x2="55" y2="30" stroke="#6366f1" strokeWidth="1.8" />
        <text x="140" y="72" style={ASK}>?</text>
      </>
    ) : (
      <>
        <line x1="20" y1="130" x2="199" y2="30" stroke="#6366f1" strokeWidth="1.8" />
        <text x="96" y="74" style={ASK}>?</text>
      </>
    )}
    <path d="M 36 130 A 16 16 0 0 0 25.3 114.9" fill="none" stroke={ACCENT} strokeWidth="1.5" />
    <text x="38" y="120" style={SMALL}>73°</text>
    <text x="8" y="142" style={LBL}>A</text>
    <text x="222" y="142" style={LBL}>B</text>
    <text x="202" y="26" style={LBL}>C</text>
    <text x="44" y="26" style={LBL}>D</text>
    <text x="120" y="145" textAnchor="middle" style={SMALL}>57 cm</text>
    <text x="127" y="24" textAnchor="middle" style={SMALL}>41 cm</text>
    <text x="34" y="80" textAnchor="end" style={SMALL}>38 cm</text>
  </svg>
);

// Húrnégyszög 2 cm sugarú körben; középponti szögek 70°, 120°, 110° és a negyedik.
const CyclicQuadFig: React.FC<{ variant: 'side' | 'area' }> = ({ variant }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <circle cx="120" cy="78" r="60" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
    <polygon points="120,18 176.4,57.5 109.6,137.1 68,48" fill="#eef2ff" stroke={STROKE} strokeWidth="2" />
    {[[120, 18], [176.4, 57.5], [109.6, 137.1], [68, 48]].map(([x, y], i) => (
      <line key={i} x1="120" y1="78" x2={x} y2={y} stroke={STROKE} strokeWidth="1" strokeDasharray="3 3" />
    ))}
    <circle cx="120" cy="78" r="2" fill="#0f172a" />
    <text x="124" y="84" style={SMALL}>K</text>
    <text x="132" y="62" style={SMALL}>70°</text>
    <text x="137" y="96" style={SMALL}>120°</text>
    <text x="88" y="94" style={SMALL}>110°</text>
    {variant === 'side' ? (
      <>
        <text x="104" y="62" style={ASK}>?</text>
        <text x="84" y="28" textAnchor="end" style={ASK}>?</text>
      </>
    ) : (
      <>
        <text x="102" y="62" style={SMALL}>60°</text>
        <text x="20" y="22" style={ASK}>T = ?</text>
      </>
    )}
    <text x="236" y="146" textAnchor="end" style={SMALL}>r = 2 cm</text>
  </svg>
);

const TRIG_GROUP_COMPETITION_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Az eszköztár (1–10)
  {
    id: 'tgc-q1',
    questionTypeBadge: 'Nevezetes érték',
    level: 1,
    question: 'Mennyi sin 150°?',
    options: ['0,5', '−0,5', '≈ 0,866', '≈ −0,866'],
    correctAnswer: 0,
    explanation: 'sin 150° = sin(180° − 30°) = sin 30° = 0,5. Tompaszög szinusza pozitív.'
  },
  {
    id: 'tgc-q2',
    questionTypeBadge: 'Kiegészítő szögek',
    level: 1,
    question: 'Melyik összefüggés igaz minden 0° és 180° közötti α szögre?',
    options: ['sin(180° − α) = sin α', 'sin(180° − α) = −sin α', 'sin(180° − α) = cos α', 'cos(180° − α) = cos α'],
    correctAnswer: 0,
    explanation: 'Kiegészítő (pótló) szögek szinusza egyenlő; koszinuszuk viszont egymás ellentettje: cos(180° − α) = −cos α.'
  },
  {
    id: 'tgc-q3',
    questionTypeBadge: 'Koszinusztétel',
    level: 1,
    question: 'Hogyan szól a koszinusztétel a γ szöggel szemközti c oldalra?',
    options: ['c² = a² + b² − 2ab · cos γ', 'c² = a² + b² + 2ab · cos γ', 'c = a + b − 2ab · cos γ', 'c² = a² + b² − ab · cos γ'],
    correctAnswer: 0,
    explanation: 'c² = a² + b² − 2ab · cos γ; γ = 90° esetén visszakapjuk Pitagorasz tételét.'
  },
  {
    id: 'tgc-q4',
    questionTypeBadge: 'Szinusztétel',
    level: 1,
    question: 'Hogyan szól a szinusztétel?',
    options: [
      'Az oldalak aránya egyenlő a velük szemközti szögek szinuszainak arányával',
      'Az oldalak aránya egyenlő a velük szemközti szögek arányával',
      'Az oldalak aránya egyenlő a mellettük fekvő szögek szinuszainak arányával',
      'Az oldalak négyzetének aránya egyenlő a szemközti szögek szinuszainak arányával'
    ],
    correctAnswer: 0,
    explanation: 'a : b = sin α : sin β (és ugyanígy a többi oldalpárra). A szögek aránya nem egyezik meg az oldalak arányával.'
  },
  {
    id: 'tgc-q5',
    questionTypeBadge: 'Területképlet',
    level: 1,
    question: 'Mekkora annak a paralelogrammának a területe, amelynek oldalai a és b, közbezárt szögük γ?',
    options: ['T = a · b · sin γ', 'T = a · b · sin γ / 2', 'T = a · b · cos γ', 'T = (a + b) · sin γ'],
    correctAnswer: 0,
    explanation: 'Az átló két egybevágó, a · b · sin γ / 2 területű háromszögre bontja a paralelogrammát, így T = a · b · sin γ.'
  },
  {
    id: 'tgc-q6',
    questionTypeBadge: 'Paralelogramma',
    figure: <ParallelogramDiagonalsFig variant="halves" />,
    level: 1,
    question: 'Egy paralelogramma átlói 30 mm és 50 mm hosszúak. Milyen hosszú szakaszokra bontja az átlókat a metszéspontjuk?',
    options: ['15 mm és 25 mm', '10 mm és 20 mm', '30 mm és 50 mm', '20 mm és 40 mm'],
    correctAnswer: 0,
    explanation: 'A paralelogramma átlói felezik egymást: 30 : 2 = 15 mm, 50 : 2 = 25 mm.'
  },
  {
    id: 'tgc-q7',
    questionTypeBadge: 'Nevezetes érték',
    level: 1,
    question: 'Mennyi cos 120°?',
    options: ['−0,5', '0,5', '≈ −0,866', '≈ 0,866'],
    correctAnswer: 0,
    explanation: 'cos 120° = −cos 60° = −0,5. Tompaszög koszinusza negatív.'
  },
  {
    id: 'tgc-q8',
    questionTypeBadge: 'Kiegészítő szögek',
    level: 1,
    question: 'Ha két 0° és 180° közötti szögnek ugyanakkora a szinusza, de a két szög különböző, mennyi az összegük?',
    options: ['180°', '90°', '360°', 'Bármennyi lehet'],
    correctAnswer: 0,
    explanation: 'sin β = sin(180° − β), és 0° és 180° között csak ez a két szög tartozik ugyanahhoz a szinuszértékhez. Ezért adódott a 4. feladatban D = 180.'
  },
  {
    id: 'tgc-q9',
    questionTypeBadge: 'Szinuszgörbe',
    level: 1,
    question: 'A szinuszgörbe 0° és 180° között melyik szögnél éri el a legnagyobb értékét?',
    options: ['90°-nál, az értéke 1', '180°-nál, az értéke 1', '45°-nál, az értéke 1', '90°-nál, az értéke 0,5'],
    correctAnswer: 0,
    explanation: 'sin 90° = 1, a görbe a 90°-os függőleges egyenesre szimmetrikus, és 0°-nál, 180°-nál 0 az értéke.'
  },
  {
    id: 'tgc-q10',
    questionTypeBadge: 'Módszerválasztás',
    level: 1,
    question: 'Két oldal és a közbezárt szög ismert, a harmadik oldal kell. Melyik eszközt használod?',
    options: ['A koszinusztételt', 'A szinusztételt', 'A tangens definícióját', 'A körcikk képletét'],
    correctAnswer: 0,
    explanation: 'Két oldal és a közbezárt szög esetén a koszinusztétel közvetlenül megadja a harmadik oldalt (ez volt az 1. feladat).'
  },

  // LEVEL 2: A versenyfeladatok (11–20)
  {
    id: 'tgc-q11',
    questionTypeBadge: 'Koszinusztétel',
    figure: <ParallelogramDiagonalsFig variant="long" />,
    level: 2,
    question: 'Paralelogramma átlói 30 és 50 mm, a közbezárt tompaszög 120°. Mekkora a hosszabbik oldala?',
    options: ['35 mm', '≈ 21,79 mm', '≈ 29,15 mm', '40 mm'],
    correctAnswer: 0,
    explanation: 'A 120°-os szög a hosszabbik oldallal szemközti: √(15² + 25² − 2 · 15 · 25 · cos 120°) = √(850 + 375) = √1225 = 35 mm.'
  },
  {
    id: 'tgc-q12',
    questionTypeBadge: 'Koszinusztétel',
    figure: <ParallelogramDiagonalsFig variant="short" />,
    level: 2,
    question: 'Ugyanebben a paralelogrammában mekkora a rövidebbik oldal?',
    options: ['≈ 21,79 mm', '35 mm', '≈ 29,15 mm', '15 mm'],
    correctAnswer: 0,
    explanation: 'A 60°-os szöggel: √(15² + 25² − 2 · 15 · 25 · cos 60°) = √(850 − 375) = √475 ≈ 21,79 mm. (√850 ≈ 29,15 a derékszögű esetnek felelne meg.)'
  },
  {
    id: 'tgc-q13',
    questionTypeBadge: 'Kerület',
    level: 2,
    question: 'Mennyi az 1. feladat paralelogrammájának kerülete, ha előbb mm-re kerekítjük az oldalakat?',
    options: ['114 mm', '≈ 113,6 mm', '57 mm', '80 mm'],
    correctAnswer: 0,
    explanation: 'Kerekített oldalak: 35 és 22 mm, K = 2 · (35 + 22) = 114 mm, így A = 1 + 1 + 4 = 6. (A kerekítés nélküli 113,6 mm nem a kért érték.)'
  },
  {
    id: 'tgc-q14',
    questionTypeBadge: 'Területképlet',
    figure: <ThinParallelogramFig />,
    level: 2,
    question: 'Mekkora a 10 mm és 70 mm oldalú paralelogramma területe, ha az oldalak szöge 150°?',
    options: ['350 mm²', '700 mm²', '175 mm²', '≈ 606,2 mm²'],
    correctAnswer: 0,
    explanation: 'T = 10 · 70 · sin 150° = 700 · 0,5 = 350 mm². (175 a fél paralelogramma, 606,2 a koszinusszal számolt hibás érték.)'
  },
  {
    id: 'tgc-q15',
    questionTypeBadge: 'Szögösszeg',
    figure: <TowerFig variant="angle" />,
    level: 2,
    question: 'A 3. feladatban PQ = 15 m, PQB∠ = 42°, QPB∠ = 53°. Mekkora a PBQ szög?',
    options: ['85°', '95°', '42°', '11°'],
    correctAnswer: 0,
    explanation: 'A háromszög belső szögeinek összege 180°: 180° − 42° − 53° = 85°.'
  },
  {
    id: 'tgc-q16',
    questionTypeBadge: 'Szinusztétel',
    figure: <TowerFig variant="side" />,
    level: 2,
    question: 'Mekkora a torony talppontja és a Q pont távolsága (QB) a 3. feladatban?',
    options: ['≈ 12,03 m', '≈ 10,08 m', '≈ 11,98 m', '15 m'],
    correctAnswer: 0,
    explanation: 'Szinusztétel: QB : 15 = sin 53° : sin 85° ⇒ QB = 15 · sin 53° / sin 85° ≈ 12,03 m. (A 10,08 m a PB távolság.)'
  },
  {
    id: 'tgc-q17',
    questionTypeBadge: 'Tangens',
    figure: <TowerFig variant="height" />,
    level: 2,
    question: 'Milyen magas a torony, ha Q-ból 72°-os emelkedési szögben látszik a csúcsa (QB ≈ 12,03 m)?',
    options: ['≈ 37 m', '≈ 31 m', '≈ 46 m', '≈ 11 m'],
    correctAnswer: 0,
    explanation: 'TB = QB · tg 72° ≈ 12,03 · 3,078 ≈ 37,01 m, így C = 37. (≈ 46 m jönne ki, ha PQ-val számolnánk.)'
  },
  {
    id: 'tgc-q18',
    questionTypeBadge: 'Szinusztétel',
    figure: <SsaTriangleFig />,
    level: 2,
    question: 'A 4. feladatban a = 50 mm, b = 74 mm, α = 37°. Mennyi sin β?',
    options: ['≈ 0,8907', '≈ 0,4066', '≈ 0,6018', '≈ 1,1225'],
    correctAnswer: 0,
    explanation: 'sin β = b · sin α / a = 74 · sin 37° / 50 ≈ 0,8907. (A 0,4066 a fordított arány, 0,6018 maga sin 37°.)'
  },
  {
    id: 'tgc-q19',
    questionTypeBadge: 'Körszelet',
    figure: <CircleSegmentFig />,
    level: 2,
    question: 'Mekkora a 20 cm sugarú kör 110°-os középponti szögéhez tartozó (kisebbik) körszelet területe?',
    options: ['≈ 196 cm²', '≈ 384 cm²', '≈ 188 cm²', '≈ 572 cm²'],
    correctAnswer: 0,
    explanation: 'Körcikk ≈ 383,97 cm², háromszög: 20² · sin 110° / 2 ≈ 187,94 cm², körszelet ≈ 196,03 cm² ⇒ E = 196.'
  },
  {
    id: 'tgc-q20',
    questionTypeBadge: 'Kifejezés értéke',
    level: 2,
    question: 'A = 6, B = 0, C = 37, D = 180, E = 196. Mennyi (15 · A − D/2) · C − B² + E?',
    options: ['196', '0', '37', '3526'],
    correctAnswer: 0,
    explanation: '15 · 6 − 180/2 = 90 − 90 = 0, így 0 · 37 − 0² + 196 = 196.'
  },

  // LEVEL 3: Stratégia és házi feladatok (21–30)
  {
    id: 'tgc-q21',
    questionTypeBadge: 'Versenystratégia',
    level: 3,
    question: 'Miért nem kellett a versenyen kiszámolni a torony magasságát (C)?',
    options: [
      'Mert 15 · A − D/2 = 0, így C szorzója nulla',
      'Mert B = 0, és B-vel szorozzuk C-t',
      'Mert a torony magassága a feladatból leolvasható',
      'Mert C mindig egyenlő E-vel'
    ],
    correctAnswer: 0,
    explanation: 'A = 6 és D = 180 ⇒ 15 · 6 − 180 / 2 = 0. A zárójel nulla, tehát C bármekkora lehet, a szorzat 0. Ezt érdemes volt a számolás előtt észrevenni.'
  },
  {
    id: 'tgc-q22',
    questionTypeBadge: 'Versenystratégia',
    level: 3,
    question: 'Melyik betű értéke állapítható meg teljesen számolás nélkül, a szinusz tulajdonsága alapján?',
    options: ['D (a két β összege 180°)', 'A (a kerület számjegyösszege)', 'E (a körszelet területe)', 'C (a torony magassága)'],
    correctAnswer: 0,
    explanation: 'A két lehetséges β szinusza egyenlő, ezért kiegészítő szögek: β₁ + β₂ = 180° – számolni sem kell.'
  },
  {
    id: 'tgc-q23',
    questionTypeBadge: 'Megoldások száma',
    level: 3,
    question: 'Hány háromszög felel meg a 4. feladat adatainak (a = 50 mm, b = 74 mm, α = 37°)?',
    options: ['2', '1', '0', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'β₁ ≈ 62,96° és β₂ ≈ 117,04°; α + β₂ ≈ 154° < 180°, így mindkét háromszög létezik.'
  },
  {
    id: 'tgc-q24',
    questionTypeBadge: 'Területképlet',
    figure: <ParallelogramDiagonalsFig variant="area" />,
    level: 3,
    question: 'Mekkora az 1. feladat paralelogrammájának területe (átlók 30 és 50 mm, szögük 120°)?',
    options: ['≈ 649,5 mm²', '≈ 1299 mm²', '750 mm²', '770 mm²'],
    correctAnswer: 0,
    explanation: 'Az átlók 4 háromszögre bontják: T = 4 · ½ · 15 · 25 · sin 120° = 30 · 50 · sin 120° / 2 ≈ 649,5 mm².'
  },
  {
    id: 'tgc-q25',
    questionTypeBadge: 'Koszinusztétel',
    level: 3,
    question: 'Mennyi az 1. feladat paralelogrammájában a két oldal négyzetének összege (a² + b²)?',
    options: ['1700 mm²', '3400 mm²', '850 mm²', '2500 mm²'],
    correctAnswer: 0,
    explanation: '35² + (√475)² = 1225 + 475 = 1700 = (30² + 50²) / 2. A két koszinusztételben a ±2 · 15 · 25 · cos 60° tagok kiesnek.'
  },
  {
    id: 'tgc-q26',
    questionTypeBadge: 'Koszinusztétel',
    figure: <TrapezoidFig diagonal="BD" />,
    level: 3,
    question: 'Trapéz (HF 1.): alapok 57 és 41 cm, a hosszabb alapon fekvő 73°-os szög melletti szár 38 cm. Milyen hosszú a 73°-os csúcsból nem induló (BD) átló?',
    options: ['≈ 58,5 cm', '≈ 63,5 cm', '≈ 77,2 cm', '≈ 36,7 cm'],
    correctAnswer: 0,
    explanation: 'Az ABD háromszögben AB = 57, AD = 38, a közbezárt szög 73°: BD² = 57² + 38² − 2 · 57 · 38 · cos 73° ⇒ BD ≈ 58,5 cm. (77,2 cm a +2ab · cos előjelhibával jönne ki.)'
  },
  {
    id: 'tgc-q27',
    questionTypeBadge: 'Koszinusztétel',
    figure: <TrapezoidFig diagonal="AC" />,
    level: 3,
    question: 'Ugyanebben a trapézban milyen hosszú a 73°-os csúcsból induló AC átló?',
    options: ['≈ 63,5 cm', '≈ 58,5 cm', '≈ 49,0 cm', '≈ 69,3 cm'],
    correctAnswer: 0,
    explanation: 'Az ACD háromszögben AD = 38, DC = 41, a D-nél lévő szög 180° − 73° = 107°: AC² = 38² + 41² − 2 · 38 · 41 · cos 107° ⇒ AC ≈ 63,5 cm.'
  },
  {
    id: 'tgc-q28',
    questionTypeBadge: 'Húrnégyszög',
    figure: <CyclicQuadFig variant="side" />,
    level: 3,
    question: 'Egy 2 cm sugarú körbe írt húrnégyszög három oldalához 70°, 120° és 110° középponti szög tartozik. Mekkora a negyedik oldalé, és milyen hosszú ez az oldal?',
    options: ['60°, 2 cm', '60°, ≈ 1,73 cm', '120°, ≈ 3,46 cm', '80°, ≈ 2,57 cm'],
    correctAnswer: 0,
    explanation: '360° − 70° − 120° − 110° = 60°. A 60°-os középponti szögű háromszög szabályos, így az oldal a sugárral egyenlő: 2 cm.'
  },
  {
    id: 'tgc-q29',
    questionTypeBadge: 'Területképlet',
    figure: <CyclicQuadFig variant="area" />,
    level: 3,
    question: 'Mekkora az előző húrnégyszög területe?',
    options: ['≈ 7,22 cm²', '≈ 14,45 cm²', '≈ 12,57 cm²', '≈ 11,04 cm²'],
    correctAnswer: 0,
    explanation: 'A K középpont 4 háromszögre bontja: ½ · 2² · (sin 70° + sin 120° + sin 110° + sin 60°) ≈ 7,22 cm². (12,57 cm² a kör területe, 11,04 a kerület cm-ben.)'
  },
  {
    id: 'tgc-q30',
    questionTypeBadge: 'Szinuszgörbe',
    level: 3,
    question: 'A szinuszgörbe tankönyvi táblázata szerint mennyi sin 105°?',
    options: ['≈ 0,9659 (= sin 75°)', '≈ −0,9659', '≈ 0,2588 (= sin 15°)', '1,05'],
    correctAnswer: 0,
    explanation: 'sin 105° = sin(180° − 75°) = sin 75° ≈ 0,9659 – a görbe a 90°-ra szimmetrikus.'
  }
];

export const TrigGroupCompetitionQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="trigonometria"
      topicId="g11-trig-csoportverseny-quiz"
      subtopicId="csoportverseny"
      title="15. Csoportverseny – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a versenyfeladatok lépései, a fejezet eszköztára és a versenystratégia."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={TRIG_GROUP_COMPETITION_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az eszköztár',
          items: [
            'Szinusztétel: a : b = sin α : sin β',
            'Koszinusztétel: c² = a² + b² − 2ab · cos γ',
            'Háromszög: T = a · b · sin γ / 2; paralelogramma: T = a · b · sin γ',
            'sin(180° − α) = sin α; cos(180° − α) = −cos α'
          ]
        },
        {
          title: 'A verseny betűi',
          items: [
            'A = 6 (oldalak 35 és 22 mm, K = 114 mm)',
            'B = 0 (T = 350 mm²); C = 37 (torony ≈ 37,01 m)',
            'D = 180 (β₁ + β₂); E = 196 (körszelet ≈ 196,03 cm²)',
            '(15 · A − D/2) · C − B² + E = 196'
          ]
        },
        {
          title: 'Versenytaktika',
          items: [
            'Először nézd meg a 6. feladat képletét – mi esik ki?',
            'Két megoldás: a szinusz a tompaszögre is ugyanannyi.',
            'Kerekíts ott, ahol a feladat kéri (1. feladat: előbb az oldalak).',
            'Javítani csak egyszer lehet – ellenőrizz felírás előtt!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TrigGroupCompetitionMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TrigGroupCompetitionSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TrigGroupCompetitionQuiz;
