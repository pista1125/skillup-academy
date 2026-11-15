import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PowerRootLogMatcher } from './PowerRootLogMatcher';
import { PowerRootLogSorter } from './PowerRootLogSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Exponenciális görbe c · aᵗ; vagy egy t-hez kérdezett érték (askT), vagy egy szinthez kérdezett t (askY). */
const CurveFig: React.FC<{ c: number; a: number; tMax: number; yMax: number; label: string; askT?: number; askY?: number; tLabel?: string }> = ({
  c,
  a,
  tMax,
  yMax,
  label,
  askT,
  askY,
  tLabel = 't'
}) => {
  const xOf = (t: number) => 30 + (t / tMax) * 195;
  const yOf = (v: number) => 125 - (v / yMax) * 105;
  const pts = Array.from({ length: 61 }, (_, i) => (i / 60) * tMax)
    .map((t) => `${xOf(t).toFixed(1)},${yOf(c * Math.pow(a, t)).toFixed(1)}`)
    .join(' ');
  const tY = askY !== undefined ? Math.log(askY / c) / Math.log(a) : 0;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="30" y1="125" x2="232" y2="125" stroke="#334155" strokeWidth="1.5" />
      <line x1="30" y1="125" x2="30" y2="12" stroke="#334155" strokeWidth="1.5" />
      <text x="234" y="140" fontSize="9" textAnchor="end" fill="#334155">{tLabel}</text>
      <polyline points={pts} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      <text x="36" y="18" fontSize="10" fill="#4c1d95" fontWeight="bold">{label}</text>
      {askT !== undefined && (
        <>
          <line x1={xOf(askT)} y1="125" x2={xOf(askT)} y2={yOf(c * Math.pow(a, askT))} stroke="#0f766e" strokeDasharray="3 2" />
          <line x1="30" y1={yOf(c * Math.pow(a, askT))} x2={xOf(askT)} y2={yOf(c * Math.pow(a, askT))} stroke="#0f766e" strokeDasharray="3 2" />
          <circle cx={xOf(askT)} cy={yOf(c * Math.pow(a, askT))} r="3.5" fill="#0f766e" />
          <text x={xOf(askT)} y="138" fontSize="9" textAnchor="middle" fill="#0f766e" fontWeight="bold">{askT}</text>
          <text x="26" y={yOf(c * Math.pow(a, askT)) + 4} fontSize="11" textAnchor="end" fill="#db2777" fontWeight="bold">?</text>
        </>
      )}
      {askY !== undefined && (
        <>
          <line x1="30" y1={yOf(askY)} x2={xOf(tY)} y2={yOf(askY)} stroke="#db2777" strokeDasharray="3 2" />
          <line x1={xOf(tY)} y1={yOf(askY)} x2={xOf(tY)} y2="125" stroke="#db2777" strokeDasharray="3 2" />
          <circle cx={xOf(tY)} cy={yOf(askY)} r="3.5" fill="#db2777" />
          <text x="27" y={yOf(askY) + 3} fontSize="8" textAnchor="end" fill="#0f766e" fontWeight="bold">{askY}</text>
          <text x={xOf(tY)} y="138" fontSize="11" textAnchor="middle" fill="#db2777" fontWeight="bold">?</text>
        </>
      )}
    </svg>
  );
};

/** Két adat közti időszak: kezdő- és végérték, a növekedési tényező „?”. */
const FactorFig: React.FC<{ start: string; end: string; span: string }> = ({ start, end, span }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <rect x="8" y="50" width="70" height="44" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
    <text x="43" y="77" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">{start}</text>
    <rect x="162" y="50" width="70" height="44" rx="8" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
    <text x="197" y="77" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#9d174d">{end}</text>
    <line x1="78" y1="72" x2="162" y2="72" stroke="#475569" strokeWidth="1.5" />
    <polygon points="162,72 155,68 155,76" fill="#475569" />
    <text x="120" y="62" fontSize="10" textAnchor="middle" fill="#475569" fontWeight="bold">{span}</text>
    <text x="120" y="90" fontSize="11" textAnchor="middle" fill="#db2777" fontWeight="bold">· q = ?</text>
    <text x="120" y="124" fontSize="10" textAnchor="middle" fill="#475569">minden lépésben q-szoros</text>
  </svg>
);

const POWER_ROOT_LOG_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1 (1–10)
  {
    id: 'prl-q1',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Melyik képlet adja az aˣ = b egyenlet megoldását (a > 0, a ≠ 1, b > 0)?',
    options: ['x = lg b / lg a', 'x = lg a / lg b', 'x = lg(b / a)', 'x = lg b − lg a'],
    correctAnswer: 0,
    explanation: 'aˣ = b ⇒ x = log_a b, és tízes alapra áttérve log_a b = lg b / lg a.'
  },
  {
    id: 'prl-q2',
    level: 1,
    questionTypeBadge: 'Exponenciális egyenlet',
    question: 'Mennyi x, ha 2ˣ = 32?',
    options: ['5', '16', '4', '6'],
    correctAnswer: 0,
    explanation: '32 = 2⁵, tehát x = 5 (lg 32 / lg 2 = 5).'
  },
  {
    id: 'prl-q3',
    level: 1,
    questionTypeBadge: 'Modell',
    question: 'Az E(t) = 500 · 1,056ᵗ modellben mennyi az 1988. decemberi (t = 0) érték?',
    options: ['500', '528', '1', '0'],
    correctAnswer: 0,
    explanation: 'E(0) = 500 · 1,056⁰ = 500 · 1 = 500.'
  },
  {
    id: 'prl-q4',
    level: 1,
    questionTypeBadge: 'Növekedési ütem',
    question: 'Az E(t) = 500 · 1,056ᵗ modell szerint hány százalékkal nőtt havonta az új esetek száma?',
    options: ['5,6%-kal', '56%-kal', '105,6%-kal', '0,56%-kal'],
    correctAnswer: 0,
    explanation: '1,056 = 1 + 0,056, tehát havonta 5,6%-os a növekedés.'
  },
  {
    id: 'prl-q5',
    level: 1,
    questionTypeBadge: 'Egyenletrendezés',
    question: 'A 3000 = 500 · 1,056ᵗ egyenletből 500-zal osztva mit kapunk?',
    options: ['1,056ᵗ = 6', '1,056ᵗ = 2500', '528ᵗ = 3000', '1,056ᵗ = 1/6'],
    correctAnswer: 0,
    explanation: '3000 / 500 = 6, tehát 1,056ᵗ = 6. (Az 500 · 1,056 nem vonható össze 528-cá, mert a kitevő csak az 1,056-ra vonatkozik.)'
  },
  {
    id: 'prl-q6',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Melyik egyenlő log₁,₀₅₆ 6-tal?',
    options: ['lg 6 / lg 1,056', '6 / 1,056', 'lg 1,056 / lg 6', 'lg 6 − lg 1,056'],
    correctAnswer: 0,
    explanation: 'Áttérés tízes alapú logaritmusra: log_a b = lg b / lg a, tehát log₁,₀₅₆ 6 = lg 6 / lg 1,056.'
  },
  {
    id: 'prl-q7',
    level: 1,
    questionTypeBadge: 'Időpont',
    question: 'Melyik hónap van 25 hónappal 1988 decembere után?',
    options: ['1991. január', '1990. december', '1991. február', '1990. január'],
    correctAnswer: 0,
    explanation: '1988. dec. + 24 hónap = 1990. dec.; még 1 hónap: 1991. január.'
  },
  {
    id: 'prl-q8',
    level: 1,
    questionTypeBadge: 'Csökkenés',
    question: 'A B(t) = 3800 · 0,945ᵗ modell szerint havonta hány százalékkal csökken az esetszám?',
    options: ['5,5%-kal', '94,5%-kal', '0,55%-kal', '9,45%-kal'],
    correctAnswer: 0,
    explanation: '0,945 = 1 − 0,055, tehát havonta 5,5%-os a csökkenés.'
  },
  {
    id: 'prl-q9',
    level: 1,
    questionTypeBadge: 'Művelet',
    question: 'Ha a qⁿ = c összefüggésben q (az alap) ismeretlen, n és c ismert, melyik művelettel kapjuk meg q-t?',
    options: ['Gyökvonással', 'Logaritmussal', 'Hatványozással', 'Kivonással'],
    correctAnswer: 0,
    explanation: 'Ha az alap hiányzik, gyököt vonunk: q = ⁿ√c. Logaritmust akkor veszünk, ha a kitevő ismeretlen.'
  },
  {
    id: 'prl-q10',
    level: 1,
    questionTypeBadge: 'Exponenciális egyenlet',
    question: 'Mennyi x, ha 10ˣ = 1000?',
    options: ['3', '100', '30', '4'],
    correctAnswer: 0,
    explanation: '1000 = 10³, tehát x = lg 1000 = 3.'
  },

  // LEVEL 2 (11–20)
  {
    id: 'prl-q11',
    level: 2,
    questionTypeBadge: 'Hatvány',
    question: 'Az E(t) = 500 · 1,056ᵗ modell szerint kb. hány új esetet diagnosztizáltak 1991 januárjában (t = 25)?',
    figure: <CurveFig c={500} a={1.056} tMax={37} yMax={4000} label="E(t) = 500 · 1,056ᵗ" askT={25} />,
    options: ['≈ 1950', '≈ 1200', '≈ 13 200', '≈ 2840'],
    correctAnswer: 0,
    explanation: 'E(25) = 500 · 1,056²⁵ ≈ 500 · 3,905 ≈ 1950.'
  },
  {
    id: 'prl-q12',
    level: 2,
    questionTypeBadge: 'Logaritmus',
    question: 'Oldd meg: 1,056ᵗ = 6. Melyik a legjobb közelítés?',
    options: ['t ≈ 32,9', 't ≈ 5,7', 't ≈ 0,03', 't ≈ 7,8'],
    correctAnswer: 0,
    explanation: 't = lg 6 / lg 1,056 ≈ 0,7782 / 0,02366 ≈ 32,88. (A 6 / 1,056 ≈ 5,7 tipikus hibás „egyszerűsítés”.)'
  },
  {
    id: 'prl-q13',
    level: 2,
    questionTypeBadge: 'Logaritmus',
    question: 'Az E(t) = 500 · 1,056ᵗ modell szerint kb. hány hónap alatt érte el a havi esetszám az 1500-at?',
    figure: <CurveFig c={500} a={1.056} tMax={37} yMax={4000} label="E(t) = 500 · 1,056ᵗ" askY={1500} />,
    options: ['≈ 20,2 hónap', '≈ 2,8 hónap', '≈ 32,9 hónap', '≈ 12,7 hónap'],
    correctAnswer: 0,
    explanation: '1500 / 500 = 3, így 1,056ᵗ = 3 ⇒ t = lg 3 / lg 1,056 ≈ 20,16 hónap (1990 augusztusa körül).'
  },
  {
    id: 'prl-q14',
    level: 2,
    questionTypeBadge: 'Százalék',
    question: '2002 végén kb. 7 millió, 2008 végén kb. 12 millió mobiltelefon-előfizetés volt. Hány százalékkal nőtt a számuk?',
    options: ['≈ 71,4%-kal', '≈ 41,7%-kal', '≈ 5%-kal', '≈ 171,4%-kal'],
    correctAnswer: 0,
    explanation: '12 / 7 ≈ 1,714, tehát kb. 71,4%-os a növekedés. (41,7% = 5/12 a csökkenés lenne visszafelé.)'
  },
  {
    id: 'prl-q15',
    level: 2,
    questionTypeBadge: 'Hatvány',
    question: 'f(x) = 51 · 1,667ˣ (ezer előfizető), x az 1992 vége óta eltelt évek száma. Kb. hány előfizető volt 2000 végén?',
    options: ['≈ 3 millió', '≈ 1,8 millió', '≈ 8,5 millió', '≈ 680 ezer'],
    correctAnswer: 0,
    explanation: 'x = 8: f(8) = 51 · 1,667⁸ ≈ 3041 ezer ≈ 3 millió. (1,8 millió x = 7-hez, 8,5 millió x = 10-hez tartozna.)'
  },
  {
    id: 'prl-q16',
    level: 2,
    questionTypeBadge: 'Növekedési tényező',
    question: 'Az E(t) = 500 · 1,056ᵗ modell szerint hányszorosára nőtt a havi esetszám 1989 januárja és decembere között (11 hónap)?',
    options: ['≈ 1,82-szeresére', '≈ 1,92-szeresére', '≈ 1,62-szeresére', '≈ 6,16-szorosára'],
    correctAnswer: 0,
    explanation: '11 hónap alatt a szorzó 1,056¹¹ ≈ 1,82. (1,92 = 1,056¹² lenne; 1,62 = 1 + 11 · 0,056 a hibás lineáris számolás.)'
  },
  {
    id: 'prl-q17',
    level: 2,
    questionTypeBadge: 'Felezési idő',
    question: 'B(t) = 3800 · 0,945ᵗ. Kb. mennyi a folyamat „felezési ideje”?',
    figure: <CurveFig c={3800} a={0.945} tMax={36} yMax={4000} label="B(t) = 3800 · 0,945ᵗ" askY={1900} />,
    options: ['≈ 12,25 hónap', '≈ 0,53 hónap', '≈ 9,1 hónap', '≈ 18,4 hónap'],
    correctAnswer: 0,
    explanation: '0,945ᵗ = 0,5 ⇒ t = lg 0,5 / lg 0,945 ≈ (−0,3010) / (−0,02457) ≈ 12,25 hónap.'
  },
  {
    id: 'prl-q18',
    level: 2,
    questionTypeBadge: 'Exponenciális egyenlet',
    question: 'Oldd meg: 5 · 2ˣ = 80.',
    options: ['x = 4', 'x = 16', 'x = 3', 'x = 8'],
    correctAnswer: 0,
    explanation: '2ˣ = 80 / 5 = 16 = 2⁴, tehát x = 4.'
  },
  {
    id: 'prl-q19',
    level: 2,
    questionTypeBadge: 'Logaritmus',
    question: 'Oldd meg: 3ˣ = 20. Melyik a legjobb közelítés?',
    options: ['x ≈ 2,73', 'x ≈ 6,67', 'x ≈ 0,37', 'x ≈ 1,30'],
    correctAnswer: 0,
    explanation: 'x = lg 20 / lg 3 ≈ 1,3010 / 0,4771 ≈ 2,73. Ellenőrzés: 3² = 9 < 20 < 27 = 3³.'
  },
  {
    id: 'prl-q20',
    level: 2,
    questionTypeBadge: 'Duplázódás',
    question: 'Évi 5%-os kamattal kb. hány év alatt duplázódik meg egy betét (1,05ˣ = 2)?',
    options: ['≈ 14,2 év', '≈ 20 év', '≈ 40 év', '≈ 10 év'],
    correctAnswer: 0,
    explanation: 'x = lg 2 / lg 1,05 ≈ 0,3010 / 0,02119 ≈ 14,2 év. (20 év a kamatos kamat nélküli, lineáris becslés lenne.)'
  },

  // LEVEL 3 (21–30)
  {
    id: 'prl-q21',
    level: 3,
    questionTypeBadge: 'Érettségi',
    question:
      '1991 januárjában kb. 350 000 mobilhívást indítottak, és ettől kezdve havonta kb. 6,5%-kal nőtt a hívások száma. Melyik évben volt az a hónap, amelyben a havi hívásszám először elérte a 100 milliót?',
    figure: <CurveFig c={0.35} a={1.065} tMax={96} yMax={150} label="millió hívás / hó" askY={100} tLabel="n" />,
    options: ['1998', '1996', '1999', '2002'],
    correctAnswer: 0,
    explanation: '1,065ⁿ = 10⁸ / 350 000 ≈ 285,7 ⇒ n = lg 285,7 / lg 1,065 ≈ 89,8, tehát n = 90. 1991 januárja + 90 hónap = 1998 júliusa.'
  },
  {
    id: 'prl-q22',
    level: 3,
    questionTypeBadge: 'Gyök',
    question: '1988 végén havi 500, 37 hónappal később havi 3800 új eset volt. Mekkora a havi növekedési tényező (q), ha a folyamat exponenciális?',
    figure: <FactorFig start="500" end="3800" span="37 hónap" />,
    options: ['q ≈ 1,056', 'q ≈ 7,6', 'q ≈ 0,205', 'q ≈ 1,205'],
    correctAnswer: 0,
    explanation: '500 · q³⁷ = 3800 ⇒ q³⁷ = 7,6 ⇒ q = ³⁷√7,6 ≈ 1,056. (0,205 = 7,6 / 37 a hibás osztás.)'
  },
  {
    id: 'prl-q23',
    level: 3,
    questionTypeBadge: 'Gyök',
    question: 'Magyarország népessége 1980-ban 10,71 millió, 2010-ben 10 millió volt. Exponenciális csökkenést feltételezve hány százalékkal csökken évente?',
    figure: <FactorFig start="10,71 M" end="10 M" span="30 év" />,
    options: ['≈ 0,23%-kal', '≈ 2,3%-kal', '≈ 6,6%-kal', '≈ 0,71%-kal'],
    correctAnswer: 0,
    explanation: 'q = ³⁰√(10 / 10,71) ≈ 0,99772, tehát évi kb. 0,23%-os csökkenés. (6,6% a teljes 30 éves csökkenés.)'
  },
  {
    id: 'prl-q24',
    level: 3,
    questionTypeBadge: 'Logaritmus',
    question: 'Ha a népesség évente q ≈ 0,99772-szeresére változik (1980-ban 10,71 millió), melyik évben éri el várhatóan a 9 millió főt?',
    options: ['2056-ban', '2040-ben', '2030-ban', '2076-ban'],
    correctAnswer: 0,
    explanation: 'qⁿ = 9 / 10,71 ⇒ n = lg(9 / 10,71) / lg q ≈ 76,1 év, tehát 1980 + 76 = 2056-ban.'
  },
  {
    id: 'prl-q25',
    level: 3,
    questionTypeBadge: 'Csökkenés',
    question: 'B(t) = 3800 · 0,945ᵗ, ahol t = 0 1992 decembere. Kb. hány új esetet regisztráltak 1995 szeptemberében a modell szerint?',
    options: ['≈ 588', '≈ 1927', '≈ 209', '≈ 3591'],
    correctAnswer: 0,
    explanation: '1992. dec. → 1995. szept.: 33 hónap. B(33) = 3800 · 0,945³³ ≈ 588. (1927 a t = 12-höz, 3591 a t = 1-hez tartozik; 209 = 0,055 · 3800 csak az első havi csökkenés.)'
  },
  {
    id: 'prl-q26',
    level: 3,
    questionTypeBadge: 'Időpont',
    question: 'Az E(t) = 500 · 1,056ᵗ modell szerint (t = 0: 1988. december) melyik hónapban érte el a havi esetszám a 3000-et?',
    options: ['1991. szeptember', '1989. május', '1991. január', '1990. szeptember'],
    correctAnswer: 0,
    explanation: 't = lg 6 / lg 1,056 ≈ 32,88 ≈ 33 hónap. 1988. dec. + 33 hónap = 1991. szeptember.'
  },
  {
    id: 'prl-q27',
    level: 3,
    questionTypeBadge: 'Növekedési tényező',
    question: 'Az E(t) = 500 · 1,056ᵗ modell szerint hányszorosára nőtt a havi esetszám 1989 januárja és 1990 decembere között?',
    options: ['≈ 3,5-szeresére', '≈ 3,7-szeresére', '≈ 2,29-szeresére', '≈ 1,82-szeresére'],
    correctAnswer: 0,
    explanation: '1989. jan. → 1990. dec.: 23 hónap, 1,056²³ ≈ 3,50. (3,7 ≈ 1,056²⁴; 2,29 = 1 + 23 · 0,056 lineárisan.)'
  },
  {
    id: 'prl-q28',
    level: 3,
    questionTypeBadge: 'Érvényességi kör',
    question: 'Hány havi új esetet jósolna az E(t) = 500 · 1,056ᵗ modell 1993 decemberére, ha figyelmen kívül hagynánk a 0 ≤ t ≤ 37 érvényességi kört?',
    options: ['≈ 13 146', '≈ 6837', '≈ 25 280', '≈ 2180'],
    correctAnswer: 0,
    explanation: '1988. dec. → 1993. dec.: t = 60, E(60) = 500 · 1,056⁶⁰ ≈ 13 146. A valóságban 1992-től már csökkent az esetszám, ezért a modell itt nem érvényes.'
  },
  {
    id: 'prl-q29',
    level: 3,
    questionTypeBadge: 'Exponenciális egyenlet',
    question: 'Oldd meg: 2ˣ⁺¹ = 7. Melyik a legjobb közelítés?',
    options: ['x ≈ 1,81', 'x ≈ 2,81', 'x ≈ 2,5', 'x ≈ 0,85'],
    correctAnswer: 0,
    explanation: '2ˣ⁺¹ = 2 · 2ˣ = 7 ⇒ 2ˣ = 3,5 ⇒ x = lg 3,5 / lg 2 ≈ 1,81. (2,81 lenne x + 1.)'
  },
  {
    id: 'prl-q30',
    level: 3,
    questionTypeBadge: 'Duplázódás',
    question: 'Az E(t) = 500 · 1,056ᵗ modellben kb. hány havonta duplázódik meg a havi új esetek száma?',
    options: ['≈ 12,7 havonta', '≈ 17,9 havonta', '≈ 5,6 havonta', '≈ 2 havonta'],
    correctAnswer: 0,
    explanation: '1,056ᵗ = 2 ⇒ t = lg 2 / lg 1,056 ≈ 0,3010 / 0,02366 ≈ 12,7 hónap. (17,9 = 1 / 0,056 hibás becslés.)'
  }
];

export const PowerRootLogQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId="g11-exp-logaritmus-modellek-quiz"
      subtopicId="hatvany-gyok-es-logaritmus"
      title="12. Hatvány, gyök, logaritmus – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: exponenciális modellek, aˣ = b megoldása logaritmussal, növekedési tényező gyökvonással, érettségi feladatok."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={POWER_ROOT_LOG_QUESTIONS}
      cheatSheets={[
        {
          title: 'Exponenciális egyenlet',
          items: [
            'aˣ = b ⇒ x = log_a b = lg b / lg a',
            'c · aˣ = b: előbb osztunk c-vel, aztán logaritmus',
            'lg b / lg a ≠ b / a – nem „egyszerűsíthető”!',
            '1,056ᵗ = 6 ⇒ t ≈ 32,88'
          ]
        },
        {
          title: 'A BSE-modell',
          items: [
            'E(t) = 500 · 1,056ᵗ, t = 0: 1988. december',
            'érvényességi kör: 0 ≤ t ≤ 37',
            'havi 5,6%-os növekedés; E(25) ≈ 1950',
            '3000 eset: t ≈ 33 → 1991. szeptember'
          ]
        },
        {
          title: 'Hatvány, gyök, logaritmus',
          items: [
            'qⁿ = ? → hatványozás',
            'q = ? (n, c ismert) → gyök: q = ⁿ√c',
            'n = ? (q, c ismert) → logaritmus: n = lg c / lg q',
            '500 · q³⁷ = 3800 ⇒ q = ³⁷√7,6 ≈ 1,056'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PowerRootLogMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PowerRootLogSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default PowerRootLogQuiz;
