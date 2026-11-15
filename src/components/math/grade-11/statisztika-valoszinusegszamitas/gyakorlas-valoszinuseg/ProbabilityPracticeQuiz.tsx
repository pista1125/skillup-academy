import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ProbabilityPracticeMatcher } from './ProbabilityPracticeMatcher';
import { ProbabilityPracticeSorter } from './ProbabilityPracticeSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Sikerszámok 0…n dobozokban, a kiemeltek színesek; a többi szürke. */
const CountsFig: React.FC<{ n: number; sel: number[]; caption?: string }> = ({ n, sel, caption }) => {
  const w = Math.min(34, 220 / (n + 1));
  const x0 = 120 - ((n + 1) * w) / 2;
  return (
    <svg viewBox="0 0 240 80" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="76" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {Array.from({ length: n + 1 }, (_, k) => {
        const on = sel.includes(k);
        return (
          <g key={k}>
            <rect x={x0 + k * w + 2} y="16" width={w - 4} height="28" rx="6" fill={on ? '#e0f2fe' : '#ffffff'} stroke={on ? '#0369a1' : '#cbd5e1'} strokeWidth={on ? 2 : 1} />
            <text x={x0 + k * w + w / 2} y="35" fontSize="12" fontWeight="bold" textAnchor="middle" fill={on ? '#0369a1' : '#94a3b8'}>
              {k}
            </text>
          </g>
        );
      })}
      {caption && (
        <text x="120" y="64" fontSize="10" textAnchor="middle" fill="#334155">
          {caption}
        </text>
      )}
    </svg>
  );
};

/** A 2. feladat dobozdiagramja Q₁ = 14,5 és Q₃ = 15,9 értékkel. */
const BoxFig: React.FC<{ caption?: string }> = ({ caption }) => {
  const sx = (v: number) => 20 + (v - 12) * 33;
  return (
    <svg viewBox="0 0 240 110" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="106" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1={sx(12.6)} y1="45" x2={sx(14.5)} y2="45" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={sx(15.9)} y1="45" x2={sx(17.4)} y2="45" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x={sx(14.5)} y="30" width={sx(15.9) - sx(14.5)} height="30" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.8" />
      <text x={sx(14.5)} y="24" fontSize="9" textAnchor="middle" fill="#0369a1" fontWeight="bold">
        Q₁ = 14,5
      </text>
      <text x={sx(15.9)} y="24" fontSize="9" textAnchor="middle" fill="#0369a1" fontWeight="bold">
        Q₃ = 15,9
      </text>
      <line x1="15" y1="75" x2="225" y2="75" stroke="#0f172a" />
      {[12, 13, 14, 15, 16, 17, 18].map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1="72" x2={sx(v)} y2="78" stroke="#0f172a" />
          <text x={sx(v)} y="88" fontSize="9" textAnchor="middle" fill="#0f172a">
            {v}
          </text>
        </g>
      ))}
      {caption && (
        <text x="120" y="102" fontSize="9" textAnchor="middle" fill="#334155">
          {caption}
        </text>
      )}
    </svg>
  );
};

/** Pirítósszeletek: vajas fele lefelé (sárga sáv alul) vagy felfelé. */
const ToastFig: React.FC<{ caption: string }> = ({ caption }) => (
  <svg viewBox="0 0 240 90" className={FIG_CLASS}>
    <rect x="2" y="2" width="236" height="86" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {Array.from({ length: 10 }, (_, i) => (
      <g key={i}>
        <rect x={14 + i * 22} y="22" width="18" height="22" rx="4" fill="#fcd34d" stroke="#b45309" strokeWidth="1.2" />
        <rect x={14 + i * 22} y="40" width="18" height="4" fill="#fef9c3" stroke="#b45309" strokeWidth="0.6" />
        <text x={23 + i * 22} y="37" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#78350f">
          ?
        </text>
      </g>
    ))}
    <text x="120" y="64" fontSize="9.5" textAnchor="middle" fill="#334155">
      10 szelet, mindegyik 0,62 valószínűséggel a vajas felére esik
    </text>
    <text x="120" y="79" fontSize="9.5" textAnchor="middle" fill="#0369a1" fontWeight="bold">
      {caption}
    </text>
  </svg>
);

/** Busz utasokkal (az utasok száma a feliratban). */
const BusFig: React.FC<{ people: number }> = ({ people }) => (
  <svg viewBox="0 0 240 90" className={FIG_CLASS}>
    <rect x="2" y="2" width="236" height="86" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="20" y="15" width="200" height="45" rx="10" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
    {Array.from({ length: 7 }, (_, i) => (
      <rect key={i} x={30 + i * 26} y="22" width="20" height="16" rx="3" fill="#e0f2fe" stroke="#0369a1" />
    ))}
    <circle cx="55" cy="62" r="9" fill="#334155" />
    <circle cx="185" cy="62" r="9" fill="#334155" />
    <text x="120" y="83" fontSize="10" textAnchor="middle" fill="#334155">
      {people} utas, mindegyik 2% eséllyel vírushordozó
    </text>
  </svg>
);

/** Bolygók sorrendje: Föld 3., Neptunusz 8., az első két hely tipp. */
const PlanetsFig: React.FC = () => {
  const labels = ['M/V', 'V/M', 'Föld', '?', '?', '?', '?', 'Nept.'];
  return (
    <svg viewBox="0 0 240 70" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="66" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {labels.map((l, i) => {
        const sure = i === 2 || i === 7;
        const two = i < 2;
        return (
          <g key={i}>
            <rect x={10 + i * 28} y="16" width="25" height="26" rx="5" fill={sure ? '#d1fae5' : two ? '#fef3c7' : '#e0f2fe'} stroke={sure ? '#047857' : two ? '#b45309' : '#0369a1'} />
            <text x={22.5 + i * 28} y="33" fontSize={l.length > 3 ? 6.5 : 8} fontWeight="bold" textAnchor="middle" fill="#0f172a">
              {l}
            </text>
            <text x={22.5 + i * 28} y="54" fontSize="8" textAnchor="middle" fill="#64748b">
              {i + 1}.
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Urna piros és fehér golyókkal. */
const UrnFig: React.FC<{ red: number; white: number; caption: string }> = ({ red, white, caption }) => {
  const n = red + white;
  const perRow = Math.min(n, 6);
  return (
    <svg viewBox="0 0 240 110" className={FIG_CLASS}>
      <rect x="2" y="2" width="236" height="106" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <path d="M 55 25 L 55 82 Q 55 92 65 92 L 175 92 Q 185 92 185 82 L 185 25" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={70 + (i % perRow) * 20} cy={78 - Math.floor(i / perRow) * 19} r="8" fill={i < red ? '#f43f5e' : '#ffffff'} stroke={i < red ? '#be123c' : '#64748b'} strokeWidth="1.3" />
      ))}
      <text x="120" y="17" fontSize="10" textAnchor="middle" fill="#334155">
        {caption}
      </text>
    </svg>
  );
};

const PROBABILITY_PRACTICE_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'pp-q1',
    level: 1,
    questionTypeBadge: 'Klasszikus valószínűség',
    question: 'Egy szabályos dobókockával egyszer dobunk. Mennyi a valószínűsége, hogy prímszámot dobunk?',
    options: ['1/2', '1/3', '2/3', '1/6'],
    correctAnswer: 0,
    explanation: 'A prímek: 2, 3, 5 – 3 kedvező eset a 6-ból: 3/6 = 1/2. (Az 1 nem prím.)'
  },
  {
    id: 'pp-q2',
    level: 1,
    questionTypeBadge: 'Komplementer',
    question: 'Egy esemény valószínűsége 0,3. Mennyi a valószínűsége, hogy az esemény NEM következik be?',
    options: ['0,7', '0,3', '−0,3', '1,3'],
    correctAnswer: 0,
    explanation: 'P(nem A) = 1 − P(A) = 1 − 0,3 = 0,7.'
  },
  {
    id: 'pp-q3',
    level: 1,
    questionTypeBadge: 'Várható érték',
    question: 'Mennyi a szabályos dobókockával dobott szám várható értéke?',
    options: ['3,5', '3', '6', '21'],
    correctAnswer: 0,
    explanation: 'E = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 21/6 = 3,5.'
  },
  {
    id: 'pp-q4',
    level: 1,
    questionTypeBadge: 'Legfeljebb',
    question: 'Egy kísérletet 5-ször végzünk el. Mely bekövetkezési számok tartoznak a „legfeljebb kétszer következik be” eseményhez?',
    figure: <CountsFig n={5} sel={[]} caption="az esemény bekövetkezéseinek száma" />,
    options: ['0, 1, 2', '2, 3, 4, 5', '0, 1', 'csak a 2'],
    correctAnswer: 0,
    explanation: 'Legfeljebb kétszer = 0, 1 vagy 2 alkalommal: P(legfeljebb 2) = P(0) + P(1) + P(2).'
  },
  {
    id: 'pp-q5',
    level: 1,
    questionTypeBadge: 'Legalább',
    question: 'Egy kísérletet 5-ször végzünk el. Melyik képlettel számolható a legegyszerűbben a „legalább kétszer következik be” valószínűsége?',
    figure: <CountsFig n={5} sel={[2, 3, 4, 5]} caption="legalább kétszer" />,
    options: ['1 − [P(0) + P(1)]', 'P(0) + P(1) + P(2)', '1 − P(2)', 'P(2) · P(3) · P(4) · P(5)'],
    correctAnswer: 0,
    explanation: 'A „legalább 2” komplementere a „0 vagy 1”, ezért P(legalább 2) = 1 − [P(0) + P(1)].'
  },
  {
    id: 'pp-q6',
    level: 1,
    questionTypeBadge: 'Komplementer',
    question: 'Egymás komplementerei-e a „legalább kétszer” és a „legfeljebb kétszer” bekövetkezik események?',
    options: [
      'Nem, mert mindkettő tartalmazza a „pontosan kétszer” esetet',
      'Igen, mert együtt kiadják az összes lehetőséget',
      'Igen, mert valószínűségük összege mindig 1',
      'Nem, mert egyikük valószínűsége mindig 0'
    ],
    correctAnswer: 0,
    explanation: 'Komplementer eseményeknek nincs közös esete. Itt a „pontosan 2” mindkettőben benne van, így valószínűségük összege 1 + P(2).'
  },
  {
    id: 'pp-q7',
    level: 1,
    questionTypeBadge: 'Komplementer',
    question: 'A vajas pirítós 0,62 valószínűséggel esik a vajas felére. Mennyi a valószínűsége, hogy egy leeső szelet NEM a vajas felére esik?',
    options: ['0,38', '0,62', '0,5', '1,62'],
    correctAnswer: 0,
    explanation: '1 − 0,62 = 0,38.'
  },
  {
    id: 'pp-q8',
    level: 1,
    questionTypeBadge: 'Klasszikus valószínűség',
    question: 'Egy urnában 4 piros és 6 fehér golyó van. Egy golyót húzunk. Mennyi a valószínűsége, hogy piros?',
    figure: <UrnFig red={4} white={6} caption="egy húzás" />,
    options: ['0,4', '0,6', '4/6', '0,25'],
    correctAnswer: 0,
    explanation: '4 kedvező eset a 10-ből: 4/10 = 0,4. (4/6 a piros és fehér golyók aránya, nem valószínűség.)'
  },
  {
    id: 'pp-q9',
    level: 1,
    questionTypeBadge: 'Modellválasztás',
    question: 'Melyik esetben számolhatunk a binomiális eloszlással (n alatt k) · pᵏ · (1 − p)^{n−k}?',
    options: [
      'Visszatevéses húzásnál, illetve független kísérletek ismétlésénél',
      'Visszatevés nélküli húzásnál kevés elem közül',
      'Csak akkor, ha p = 0,5',
      'Csak egyetlen kísérletnél'
    ],
    correctAnswer: 0,
    explanation: 'A binomiális eloszlás feltétele, hogy a siker valószínűsége minden lépésben ugyanaz legyen – ez visszatevéses húzásnál és független ismétlésnél teljesül.'
  },
  {
    id: 'pp-q10',
    level: 1,
    questionTypeBadge: 'Hibakeresés',
    question: 'Bence 6 órája mindegyikén 0,05 valószínűséggel felel. Miért hibás, hogy „6 · 0,05 = 0,3 a valószínűsége, hogy valamelyik órán felel”?',
    options: [
      'Mert az esetek nem zárják ki egymást: több órán is felelhet',
      'Mert szorzás helyett osztani kellene',
      'Mert 0,05 helyett 0,95-tel kellene számolni',
      'Nem hibás, ez a helyes eredmény'
    ],
    correctAnswer: 0,
    explanation: 'Összeadni csak egymást kizáró események valószínűségét lehet. Helyesen: 1 − 0,95⁶ ≈ 0,2649.'
  },
  // ---------- 2. szint ----------
  {
    id: 'pp-q11',
    level: 2,
    questionTypeBadge: 'Legalább egy',
    question: 'Bence 6 órája mindegyikén (egymástól függetlenül) 0,05 valószínűséggel felel. Mennyi a valószínűsége, hogy legalább egy órán felel?',
    options: ['≈ 0,2649', '0,3', '≈ 0,7351', '0,05'],
    correctAnswer: 0,
    explanation: '1 − P(egyik órán sem) = 1 − 0,95⁶ ≈ 1 − 0,7351 = 0,2649.'
  },
  {
    id: 'pp-q12',
    level: 2,
    questionTypeBadge: 'Binomiális eloszlás',
    question: 'Mennyi a valószínűsége, hogy 10 leeső vajas pirítósból (p = 0,62) egy sem esik a vajas felére?',
    figure: <ToastFig caption="egy sem esik a vajas felére" />,
    options: ['≈ 0,00006', '≈ 0,0084', '0,38', '≈ 0,62'],
    correctAnswer: 0,
    explanation: 'Mind a 10 a másik felére esik: 0,38¹⁰ ≈ 0,0000628.'
  },
  {
    id: 'pp-q13',
    level: 2,
    questionTypeBadge: 'Komplementer',
    question: 'Mennyi a valószínűsége, hogy 10 leeső vajas pirítós (p = 0,62) között lesz olyan, amelyik NEM a vajas felére esik?',
    figure: <ToastFig caption="legalább egy nem a vajas felére esik" />,
    options: ['≈ 0,9916', '≈ 0,0084', '0,38', '0,6'],
    correctAnswer: 0,
    explanation: 'Az ellentéte: mindegyik a vajas felére esik (0,62¹⁰ ≈ 0,0084). Így 1 − 0,0084 ≈ 0,9916.'
  },
  {
    id: 'pp-q14',
    level: 2,
    questionTypeBadge: 'Legalább egy',
    question: 'Egy lakos 0,02 valószínűséggel vírushordozó. Mennyi a valószínűsége, hogy egy 30 fős buszon van vírushordozó?',
    figure: <BusFig people={30} />,
    options: ['≈ 0,4545', '0,6', '≈ 0,5455', '0,02'],
    correctAnswer: 0,
    explanation: '1 − 0,98³⁰ ≈ 1 − 0,5455 = 0,4545 (kb. 45%). A 30 · 0,02 = 0,6 hibás összeadás.'
  },
  {
    id: 'pp-q15',
    level: 2,
    questionTypeBadge: 'Legalább egy',
    question: 'Egy lakos 0,02 valószínűséggel vírushordozó. Mennyi a valószínűsége, hogy egy 10 fős buszon van vírushordozó?',
    figure: <BusFig people={10} />,
    options: ['≈ 0,1829', '0,2', '≈ 0,8171', '0,02'],
    correctAnswer: 0,
    explanation: '1 − 0,98¹⁰ ≈ 1 − 0,8171 = 0,1829.'
  },
  {
    id: 'pp-q16',
    level: 2,
    questionTypeBadge: 'Visszatevéses húzás',
    question: '50 gyöngy közül 10 selejtes. Az ellenőr 5-ször választ egy gyöngyöt, megvizsgálja, majd visszateszi. Mennyi a valószínűsége, hogy nem talál selejtest?',
    options: ['0,32768', '0,2', '0,00032', '0,67232'],
    correctAnswer: 0,
    explanation: 'p(selejtes) = 10/50 = 0,2, így mind az 5 jó: 0,8⁵ = 0,32768.'
  },
  {
    id: 'pp-q17',
    level: 2,
    questionTypeBadge: 'Visszatevéses húzás',
    question: '50 gyöngy közül 10 selejtes. 5-ször húzunk visszatevéssel. Mennyi a valószínűsége, hogy mindegyik kiválasztott gyöngy selejtes?',
    options: ['0,00032', '0,2', '0,32768', '0,04'],
    correctAnswer: 0,
    explanation: '0,2⁵ = 0,00032.'
  },
  {
    id: 'pp-q18',
    level: 2,
    questionTypeBadge: 'Binomiális eloszlás',
    question: '50 gyöngy közül 10 selejtes (20%). 5-ször húzunk visszatevéssel. Mennyi a valószínűsége, hogy a mintában is 20% lesz a selejtesek aránya?',
    options: ['0,4096', '0,2', '0,08192', '1'],
    correctAnswer: 0,
    explanation: '5 gyöngy 20%-a 1 gyöngy: (5 alatt 1) · 0,2 · 0,8⁴ = 5 · 0,08192 = 0,4096.'
  },
  {
    id: 'pp-q19',
    level: 2,
    questionTypeBadge: 'Dobozdiagram',
    question: 'Egy újabb mérés 0,25 valószínűséggel nagyobb a felső kvartilisnél (15,9). Mennyi a valószínűsége, hogy a következő 6 mérésből pontosan egy lesz 15,9-nél nagyobb?',
    figure: <BoxFig caption="P(x > 15,9) = 0,25" />,
    options: ['≈ 0,356', '0,25', '≈ 0,059', '≈ 0,822'],
    correctAnswer: 0,
    explanation: '(6 alatt 1) · 0,25 · 0,75⁵ = 6 · 0,0593 ≈ 0,356.'
  },
  {
    id: 'pp-q20',
    level: 2,
    questionTypeBadge: 'Érettségi feladat',
    question: 'Judit tudja, hogy a Föld a 3., a Neptunusz a 8. bolygó; az első két hely Merkúr és Vénusz, de sorrendjüket tippeli; a maradék 4 bolygót véletlenszerűen írja be. Mennyi a valószínűsége, hogy éppen a helyes sorrendet adja meg?',
    figure: <PlanetsFig />,
    options: ['1/48', '1/24', '1/2', '1/40 320'],
    correctAnswer: 0,
    explanation: 'A két első hely 1/2 eséllyel jó, a 4 bolygó 4! = 24 sorrendjéből 1 jó: 1/2 · 1/24 = 1/48. (1/40 320 = 1/8! – ha semmit sem tudna.)'
  },
  // ---------- 3. szint ----------
  {
    id: 'pp-q21',
    level: 3,
    questionTypeBadge: 'Legalább',
    question: 'Bence 6 órája mindegyikén 0,05 valószínűséggel felel. Mennyi a valószínűsége, hogy legalább két órán felel?',
    figure: <CountsFig n={6} sel={[2, 3, 4, 5, 6]} caption="legalább 2 felelés = 1 − [P(0) + P(1)]" />,
    options: ['≈ 0,0328', '≈ 0,2649', '≈ 0,2321', '≈ 0,9672'],
    correctAnswer: 0,
    explanation: '1 − 0,95⁶ − 6 · 0,05 · 0,95⁵ ≈ 1 − 0,7351 − 0,2321 = 0,0328.'
  },
  {
    id: 'pp-q22',
    level: 3,
    questionTypeBadge: 'Binomiális eloszlás',
    question: 'Mennyi a valószínűsége, hogy 10 leeső vajas pirítósból (p = 0,62) pontosan 7 esik a vajas felére?',
    figure: <ToastFig caption="pontosan 7 a vajas felére" />,
    options: ['≈ 0,2319', '≈ 0,0019', '0,7', '0,62'],
    correctAnswer: 0,
    explanation: '(10 alatt 7) · 0,62⁷ · 0,38³ = 120 · 0,00193 ≈ 0,2319.'
  },
  {
    id: 'pp-q23',
    level: 3,
    questionTypeBadge: 'Több mint',
    question: 'Mennyi a valószínűsége, hogy 10 leeső vajas pirítósból (p = 0,62) 7-nél több esik a vajas felére?',
    figure: <CountsFig n={10} sel={[8, 9, 10]} caption="7-nél több: 8, 9 vagy 10" />,
    options: ['≈ 0,2017', '≈ 0,4336', '≈ 0,7983', '≈ 0,0084'],
    correctAnswer: 0,
    explanation: 'P(8) + P(9) + P(10) ≈ 0,1419 + 0,0514 + 0,0084 = 0,2017. (0,4336 a „legalább 7”.)'
  },
  {
    id: 'pp-q24',
    level: 3,
    questionTypeBadge: 'Legfeljebb',
    question: 'Mennyi a valószínűsége, hogy 10 leeső vajas pirítósból (p = 0,62) legfeljebb 7 esik a vajas felére?',
    figure: <CountsFig n={10} sel={[0, 1, 2, 3, 4, 5, 6, 7]} caption="legfeljebb 7" />,
    options: ['≈ 0,7983', '≈ 0,2017', '≈ 0,2319', '≈ 0,5664'],
    correctAnswer: 0,
    explanation: 'A „legfeljebb 7” a „7-nél több” komplementere: 1 − 0,2017 = 0,7983.'
  },
  {
    id: 'pp-q25',
    level: 3,
    questionTypeBadge: 'Dobozdiagram',
    question: 'Egy újabb mérés 0,25 valószínűséggel nagyobb, mint 15,9. Mennyi a valószínűsége, hogy a következő 6 mérésből legalább egyszer kapunk 15,9-nél nagyobbat?',
    figure: <BoxFig caption="6 újabb mérés" />,
    options: ['≈ 0,822', '≈ 0,178', '≈ 0,356', '1,5'],
    correctAnswer: 0,
    explanation: '1 − 0,75⁶ ≈ 1 − 0,178 = 0,822. (6 · 0,25 = 1,5 > 1 – nem lehet valószínűség.)'
  },
  {
    id: 'pp-q26',
    level: 3,
    questionTypeBadge: 'Dobozdiagram',
    question: 'Egy mérési eredmény 0,25 valószínűséggel legfeljebb 14,5 (Q₁), és 0,25 valószínűséggel nagyobb, mint 15,9 (Q₃). Mennyi a valószínűsége, hogy 6 mérésből mindegyik nagyobb, mint 14,5, és legfeljebb 15,9?',
    figure: <BoxFig caption="mind a 6 a dobozba esik?" />,
    options: ['≈ 0,0156', '0,5', '≈ 0,0002', '≈ 0,178'],
    correctAnswer: 0,
    explanation: 'Egy mérés 1 − 0,25 − 0,25 = 0,5 valószínűséggel esik a dobozba: 0,5⁶ = 1/64 ≈ 0,0156.'
  },
  {
    id: 'pp-q27',
    level: 3,
    questionTypeBadge: 'Érettségi feladat',
    question: 'A 8 bolygó nevét cédulákra írjuk, és kétszer húzunk. Visszatevéses vagy visszatevés nélküli húzásnál nagyobb a valószínűsége, hogy legalább az egyik cédulán a Föld szerepel?',
    options: [
      'Visszatevés nélkül (1/4 > 15/64)',
      'Visszatevéssel (15/64 > 1/4)',
      'Egyenlő a két valószínűség',
      'Nem lehet eldönteni'
    ],
    correctAnswer: 0,
    explanation: 'Visszatevéssel: 1 − (7/8)² = 15/64 ≈ 0,234. Visszatevés nélkül: 1 − 7/8 · 6/7 = 1/4 = 0,25 = 16/64. Tehát visszatevés nélkül nagyobb.'
  },
  {
    id: 'pp-q28',
    level: 3,
    questionTypeBadge: 'Legfeljebb',
    question: 'Szabályos dobókockát 10-szer feldobunk. Mennyi a valószínűsége, hogy legfeljebb 2-szer dobunk hatost?',
    figure: <CountsFig n={10} sel={[0, 1, 2]} caption="legfeljebb 2 hatos" />,
    options: ['≈ 0,7752', '≈ 0,2907', '≈ 0,2248', '≈ 0,1615'],
    correctAnswer: 0,
    explanation: 'P(0) + P(1) + P(2) ≈ 0,1615 + 0,3230 + 0,2907 = 0,7752.'
  },
  {
    id: 'pp-q29',
    level: 3,
    questionTypeBadge: 'Legalább egy',
    question: 'Egy gép 0,08 valószínűséggel gyárt hibás palackot. Mennyi a valószínűsége, hogy 50 palack között van hibás?',
    options: ['≈ 0,9845', '≈ 0,0155', '4', '0,08'],
    correctAnswer: 0,
    explanation: '1 − 0,92⁵⁰ ≈ 1 − 0,0155 = 0,9845. (50 · 0,08 = 4 a hibás palackok várható száma, nem valószínűség.)'
  },
  {
    id: 'pp-q30',
    level: 3,
    questionTypeBadge: 'Binomiális eloszlás',
    question: 'Egy gép 0,08 valószínűséggel gyárt hibás palackot. Mennyi a valószínűsége, hogy 50 palack között pontosan 4 hibás van?',
    options: ['≈ 0,2037', '≈ 0,6290', '0,08', '≈ 0,0155'],
    correctAnswer: 0,
    explanation: '(50 alatt 4) · 0,08⁴ · 0,92⁴⁶ = 230 300 · 0,08⁴ · 0,92⁴⁶ ≈ 0,2037. (0,6290 a „legfeljebb 4”.)'
  }
];

export const ProbabilityPracticeQuiz: React.FC<{
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
      topicId="g11-stat-valoszinuseg-gyakorlas-quiz"
      subtopicId="gyakorlas-valoszinuseg"
      title="14. Gyakorlás – Kvíz"
      subtitle="30 vegyes tesztkérdés 3 nehézségi szinten: komplementer, legalább, legfeljebb, binomiális eloszlás, érettségi típusú feladatok."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • KVÍZ"
      themeColor="cyan"
      questions={PROBABILITY_PRACTICE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Legalább, legfeljebb',
          items: [
            'legfeljebb 2: P(0) + P(1) + P(2)',
            'legalább 2: 1 − [P(0) + P(1)]',
            'legalább egy: 1 − (1 − p)ⁿ',
            '„legalább 2” és „legfeljebb 2” NEM komplementerek'
          ]
        },
        {
          title: 'Modellek',
          items: [
            'klasszikus: kedvező / összes',
            'visszatevés nélkül: (K alatt k)(N−K alatt n−k) / (N alatt n)',
            'visszatevéssel: (n alatt k) · pᵏ · (1 − p)^{n−k}',
            'várható érték: E = Σ xᵢ · pᵢ'
          ]
        },
        {
          title: 'Gyakori hibák',
          items: [
            'nem kizáró esetek valószínűségét nem adjuk össze (6 · 0,05 ≠ P)',
            'n · p a várható darabszám, nem valószínűség',
            'a valószínűség mindig 0 és 1 közé esik',
            'pontosan k: ne maradjon le a binomiális együttható'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ProbabilityPracticeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ProbabilityPracticeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ProbabilityPracticeQuiz;
