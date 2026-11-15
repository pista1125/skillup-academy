import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { LogPractice1Matcher } from './LogPractice1Matcher';
import { LogPractice1Sorter } from './LogPractice1Sorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Az f: [−2; 1] → R, f(x) = aˣ grafikonja rácson (a = 1/2), az alap nincs feltüntetve. */
const ExpTaskFig: React.FC = () => {
  const u = 24;
  const X = (x: number) => 120 + x * u;
  const Y = (y: number) => 130 - y * u;
  const pts = Array.from({ length: 41 }, (_, i) => -2 + (i / 40) * 3)
    .map((x) => `${X(x).toFixed(1)},${Y(Math.pow(0.5, x)).toFixed(1)}`)
    .join(' ');
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
        <line key={`v${i}`} x1={X(i)} y1={Y(0)} x2={X(i)} y2={Y(4.6)} stroke="#e2e8f0" />
      ))}
      {[1, 2, 3, 4].map((j) => (
        <line key={`h${j}`} x1={X(-3)} y1={Y(j)} x2={X(3)} y2={Y(j)} stroke="#e2e8f0" />
      ))}
      <line x1={X(-3.3)} y1={Y(0)} x2={X(3.4)} y2={Y(0)} stroke="#334155" strokeWidth="1.3" />
      <line x1={X(0)} y1={Y(-0.2)} x2={X(0)} y2={Y(4.9)} stroke="#334155" strokeWidth="1.3" />
      <text x={X(1)} y={Y(0) + 11} fontSize="9" textAnchor="middle" fill="#334155">1</text>
      <text x={X(0) - 4} y={Y(1) + 3} fontSize="9" textAnchor="end" fill="#334155">1</text>
      <text x={X(3.4)} y={Y(0) - 3} fontSize="9" fill="#334155">x</text>
      <text x={X(0) + 4} y={Y(4.7)} fontSize="9" fill="#334155">y</text>
      <polyline points={pts} fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      <circle cx={X(-2)} cy={Y(4)} r="3" fill="#7c3aed" />
      <circle cx={X(1)} cy={Y(0.5)} r="3" fill="#7c3aed" />
      <text x={X(1) + 6} y={Y(0.5) - 5} fontSize="10" fontWeight="bold" fill="#4c1d95">y = aˣ</text>
    </svg>
  );
};

/** Számegyenes egy jelölt ponttal, „?” felirattal. */
const NumberLineFig: React.FC<{ label: string }> = ({ label }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    <text x="120" y="40" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#4c1d95">{label}</text>
    <line x1="15" y1="90" x2="228" y2="90" stroke="#334155" strokeWidth="1.5" />
    <polygon points="228,90 220,86 220,94" fill="#334155" />
    {[0, 1, 2].map((v) => (
      <g key={v}>
        <line x1={30 + v * 90} y1="84" x2={30 + v * 90} y2="96" stroke="#334155" strokeWidth="1.5" />
        <text x={30 + v * 90} y="112" fontSize="10" textAnchor="middle" fill="#334155">{v}</text>
      </g>
    ))}
    <text x="120" y="135" fontSize="10" textAnchor="middle" fill="#64748b">hol van a megoldás?</text>
  </svg>
);

/** Richter-skála: két magnitúdó, az energiaarány „?”. */
const RichterFig: React.FC<{ m1: string; m2: string }> = ({ m1, m2 }) => (
  <svg viewBox="0 0 240 150" className={FIG_CLASS}>
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <rect x={12 + i * 24} y="40" width="22" height="30" rx="3" fill={`hsl(262, 70%, ${85 - i * 7}%)`} />
        <text x={23 + i * 24} y="60" fontSize="10" textAnchor="middle" fill={i < 4 ? '#2e1065' : '#ffffff'} fontWeight="bold">{i + 1}</text>
      </g>
    ))}
    <text x="120" y="28" fontSize="10" textAnchor="middle" fill="#334155">M = −4,42 + (2/3) · lg E</text>
    <text x="60" y="98" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#7c3aed">M₁ = {m1}</text>
    <text x="180" y="98" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#db2777">M₂ = {m2}</text>
    <text x="120" y="130" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">E₁ / E₂ = ?</text>
  </svg>
);

const LOG_PRACTICE_1_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1 (1–10)
  {
    id: 'lp1-q1',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Add meg a log₃ 81 kifejezés pontos értékét!',
    options: ['4', '27', '3', '9'],
    correctAnswer: 0,
    explanation: '3⁴ = 81, tehát log₃ 81 = 4.'
  },
  {
    id: 'lp1-q2',
    level: 1,
    questionTypeBadge: 'Értelmezési tartomány',
    question: 'Mely valós számokra értelmezhető a log₂ (3 − x) kifejezés?',
    options: ['x < 3', 'x > 3', 'x ≠ 3', 'x > 0'],
    correctAnswer: 0,
    explanation: 'A logaritmus argumentuma pozitív kell legyen: 3 − x > 0 ⇔ x < 3.'
  },
  {
    id: 'lp1-q3',
    level: 1,
    questionTypeBadge: 'Logaritmusos egyenlet',
    question: 'Oldd meg: log₂ (3 − x) = 0.',
    options: ['x = 2', 'x = 3', 'x = 1', 'x = 0'],
    correctAnswer: 0,
    explanation: '3 − x = 2⁰ = 1 ⇒ x = 2. Ez kisebb 3-nál, tehát megfelel.'
  },
  {
    id: 'lp1-q4',
    level: 1,
    questionTypeBadge: 'Exponenciális egyenlet',
    question: 'Oldd meg: 4ˣ = 8. Az eredményt tizedes tört alakban add meg!',
    options: ['x = 1,5', 'x = 2', 'x = 0,5', 'x = 1,25'],
    correctAnswer: 0,
    explanation: '4ˣ = 2²ˣ és 8 = 2³, így 2x = 3, x = 1,5.'
  },
  {
    id: 'lp1-q5',
    level: 1,
    questionTypeBadge: 'Exponenciális egyenlet',
    question: 'Oldd meg: 2ˣ = 10. Három tizedesjegyre kerekítve:',
    options: ['x ≈ 3,322', 'x = 5', 'x ≈ 0,301', 'x ≈ 3,162'],
    correctAnswer: 0,
    explanation: 'x = lg 10 / lg 2 = 1 / 0,30103 ≈ 3,322. (3,162 ≈ √10, 0,301 = lg 2.)'
  },
  {
    id: 'lp1-q6',
    level: 1,
    questionTypeBadge: 'Exponenciális függvény',
    question: 'Az ábrán az f: [−2; 1] → R, f(x) = aˣ függvény grafikonja látható. Mennyi a?',
    figure: <ExpTaskFig />,
    options: ['a = 1/2', 'a = 2', 'a = 4', 'a = −2'],
    correctAnswer: 0,
    explanation: 'A grafikon átmegy az (1; 0,5) ponton: a¹ = 0,5, tehát a = 1/2. Ellenőrzés: (1/2)⁻² = 4.'
  },
  {
    id: 'lp1-q7',
    level: 1,
    questionTypeBadge: 'Értékkészlet',
    question: 'Az ábrán az f: [−2; 1] → R, f(x) = aˣ függvény grafikonja látható. Mi f értékkészlete?',
    figure: <ExpTaskFig />,
    options: ['[0,5; 4]', '[−2; 1]', ']0; +∞[', '[0; 4]'],
    correctAnswer: 0,
    explanation: 'A függvény csökkenő: f(−2) = 4 a legnagyobb, f(1) = 0,5 a legkisebb érték, tehát Rf = [0,5; 4]. ([−2; 1] az értelmezési tartomány.)'
  },
  {
    id: 'lp1-q8',
    level: 1,
    questionTypeBadge: 'Tízes alapú logaritmus',
    question: 'Mennyi lg 1000?',
    options: ['3', '100', '10', '30'],
    correctAnswer: 0,
    explanation: '10³ = 1000, tehát lg 1000 = 3.'
  },
  {
    id: 'lp1-q9',
    level: 1,
    questionTypeBadge: 'Logaritmus',
    question: 'Mennyi log₅ 1?',
    options: ['0', '1', '5', 'nincs értelmezve'],
    correctAnswer: 0,
    explanation: 'Bármely megengedett alapra a⁰ = 1, tehát log₅ 1 = 0.'
  },
  {
    id: 'lp1-q10',
    level: 1,
    questionTypeBadge: 'Tízes alapú logaritmus',
    question: 'Melyik x-re igaz, hogy lg x = −2?',
    options: ['x = 0,01', 'x = −100', 'x = −20', 'x = 0,2'],
    correctAnswer: 0,
    explanation: 'lg x = −2 ⇔ x = 10⁻² = 0,01.'
  },

  // LEVEL 2 (11–20)
  {
    id: 'lp1-q11',
    level: 2,
    questionTypeBadge: 'Logaritmusos egyenlet',
    question: 'Oldd meg a pozitív valós számok halmazán: log₁₆ x = −1/2.',
    figure: <NumberLineFig label="log₁₆ x = −1/2" />,
    options: ['x = 1/4', 'x = −4', 'x = −8', 'x = 4'],
    correctAnswer: 0,
    explanation: 'x = 16^{-1/2} = 1 / √16 = 1/4. (4 lenne az 1/2 kitevőhöz, −8 a hibás „16 · (−1/2)”.)'
  },
  {
    id: 'lp1-q12',
    level: 2,
    questionTypeBadge: 'Logaritmusos egyenlet',
    question: 'Mely x valós számokra teljesül: log₂ x² = 4?',
    options: ['x = 4 vagy x = −4', 'csak x = 4', 'x = 2 vagy x = −2', 'csak x = 2'],
    correctAnswer: 0,
    explanation: 'x² = 2⁴ = 16 ⇒ x = ±4. Mindkettőre x² = 16 > 0, tehát mindkettő megoldás.'
  },
  {
    id: 'lp1-q13',
    level: 2,
    questionTypeBadge: 'Bomlás',
    question: 'A radioaktív részecskék száma kezdetben 6 · 10²³, és percenként az előző érték századrészére csökken. Hány részecske marad 10 perc után?',
    options: ['6 · 10³', '6 · 10¹³', '6 · 10²¹', '6 · 10⁻⁷'],
    correctAnswer: 0,
    explanation: '6 · 10²³ · (10⁻²)¹⁰ = 6 · 10²³⁻²⁰ = 6 · 10³ = 6000. (6 · 10¹³ tizedrészre csökkenésnél jönne ki.)'
  },
  {
    id: 'lp1-q14',
    level: 2,
    questionTypeBadge: 'Képlet',
    question: 'É = 75,5 − 5 · 10^{(6000 − G)/6090}. Kb. mennyi a várható élettartam, ha G = 1090 USD?',
    options: ['≈ 43,5 év', '≈ 61,5 év', '≈ 69,1 év', '≈ 32,0 év'],
    correctAnswer: 0,
    explanation: '(6000 − 1090) / 6090 ≈ 0,8062; 10^{0,8062} ≈ 6,40; É ≈ 75,5 − 5 · 6,40 ≈ 43,5 év. (32,0 csak a levont tag.)'
  },
  {
    id: 'lp1-q15',
    level: 2,
    questionTypeBadge: 'Richter-skála',
    question: 'M = −4,42 + (2/3) · lg E. Mekkora erősségű az a földrengés, amelyben E = 1,344 · 10¹⁴ joule energia szabadul fel?',
    options: ['M ≈ 5,0', 'M ≈ 9,4', 'M ≈ 14,1', 'M ≈ 4,7'],
    correctAnswer: 0,
    explanation: 'lg E ≈ 14,128; (2/3) · 14,128 ≈ 9,419; M ≈ −4,42 + 9,419 ≈ 5,0.'
  },
  {
    id: 'lp1-q16',
    level: 2,
    questionTypeBadge: 'Richter-skála',
    question: 'Két földrengés erőssége 2-vel tér el a Richter-skálán. Hányszor akkora energia szabadul fel az erősebbikben?',
    figure: <RichterFig m1="M + 2" m2="M" />,
    options: ['1000-szer', '100-szor', '2-szer', '20-szor'],
    correctAnswer: 0,
    explanation: 'lg E = 1,5 · (M + 4,42), így ΔM = 2 esetén Δ lg E = 3, tehát az energiák aránya 10³ = 1000.'
  },
  {
    id: 'lp1-q17',
    level: 2,
    questionTypeBadge: 'Törtkitevő',
    question: 'Mennyi 8^{2/3}?',
    options: ['4', '16/3', '2', '64'],
    correctAnswer: 0,
    explanation: '8^{2/3} = (∛8)² = 2² = 4.'
  },
  {
    id: 'lp1-q18',
    level: 2,
    questionTypeBadge: 'Exponenciális egyenlet',
    question: 'Oldd meg: 3 · 5ˣ = 75.',
    options: ['x = 2', 'x = 25', 'x = 3', 'x = 5'],
    correctAnswer: 0,
    explanation: '5ˣ = 75 / 3 = 25 = 5² ⇒ x = 2.'
  },
  {
    id: 'lp1-q19',
    level: 2,
    questionTypeBadge: 'Kamatos kamat',
    question: '100 000 Ft-ot évi 5%-os kamatos kamatra teszünk. Mennyi lesz 3 év múlva?',
    options: ['115 762,5 Ft', '115 000 Ft', '105 000 Ft', '157 625 Ft'],
    correctAnswer: 0,
    explanation: '100 000 · 1,05³ = 115 762,5 Ft. (115 000 Ft az egyszerű kamat lenne.)'
  },
  {
    id: 'lp1-q20',
    level: 2,
    questionTypeBadge: 'Képlet',
    question: 'Egy műszerre lg pₘ = 0,8 · lg pᵥ + 0,301 (pₘ: mért, pᵥ: valódi nyomás, Pa). Kb. mennyit mér a műszer 20 Pa valódi nyomásnál?',
    options: ['≈ 22 Pa', '≈ 16,3 Pa', '≈ 1,34 Pa', '≈ 40 Pa'],
    correctAnswer: 0,
    explanation: 'lg pₘ = 0,8 · 1,30103 + 0,301 ≈ 1,3418 ⇒ pₘ = 10^{1,3418} ≈ 22 Pa. (1,34 csak lg pₘ.)'
  },

  // LEVEL 3 (21–30)
  {
    id: 'lp1-q21',
    level: 3,
    questionTypeBadge: 'Képlet',
    question: 'É = 75,5 − 5 · 10^{(6000 − G)/6090}. 2005-ben G = 1090 volt; 2020-ra G a háromszorosára nő. Kb. mennyivel nő a várható élettartam?',
    options: ['≈ 18 évvel', '≈ 3 évvel', '≈ 43 évvel', '≈ 87 évvel'],
    correctAnswer: 0,
    explanation: 'G = 3270: 10^{2730/6090} ≈ 2,81, É ≈ 75,5 − 14,0 ≈ 61,5 év. A változás 61,5 − 43,5 ≈ 18 év.'
  },
  {
    id: 'lp1-q22',
    level: 3,
    questionTypeBadge: 'Logaritmus',
    question: 'É = 75,5 − 5 · 10^{(6000 − G)/6090}. Egy országban É = 68 év. Kb. mekkora ott G?',
    options: ['≈ 4928 USD', '≈ 1072 USD', '≈ 5824 USD', '≈ 3530 USD'],
    correctAnswer: 0,
    explanation: '5 · 10^k = 7,5 ⇒ 10^k = 1,5 ⇒ k = lg 1,5 ≈ 0,1761; 6000 − G = 6090 · 0,1761 ≈ 1072 ⇒ G ≈ 4928. (1072 a 6000 − G értéke.)'
  },
  {
    id: 'lp1-q23',
    level: 3,
    questionTypeBadge: 'Richter-skála',
    question: 'A 2004-es szumátrai földrengés erőssége 9,3 volt. Kb. mekkora energia szabadult fel (M = −4,42 + (2/3) · lg E)?',
    options: ['≈ 3,8 · 10²⁰ J', '≈ 5,2 · 10¹³ J', '≈ 1,4 · 10¹⁴ J', '≈ 2,1 · 10¹⁹ J'],
    correctAnswer: 0,
    explanation: 'lg E = 1,5 · (9,3 + 4,42) = 20,58 ⇒ E = 10^{20,58} ≈ 3,8 · 10²⁰ J. (5,2 · 10¹³ ≈ 10^{13,72} – elmaradt az 1,5-es szorzó.)'
  },
  {
    id: 'lp1-q24',
    level: 3,
    questionTypeBadge: 'Modell',
    question: 'Az elektromos autók száma (millió) f(x) = 0,122 · 2^{0,822x}, x a 2012 óta eltelt évek száma. Melyik évben érheti el a 25 milliót?',
    options: ['2021', '2019', '2024', '2016'],
    correctAnswer: 0,
    explanation: '2^{0,822x} = 25 / 0,122 ≈ 204,9 ⇒ 0,822x = lg 204,9 / lg 2 ≈ 7,68 ⇒ x ≈ 9,34, tehát 2012 + 9,34 → 2021.'
  },
  {
    id: 'lp1-q25',
    level: 3,
    questionTypeBadge: 'Képlet',
    question: 'lg pₘ = 0,8 · lg pᵥ + 0,301. Mennyi valójában a nyomás, ha a műszer 50 Pa-t mutat?',
    options: ['≈ 55,9 Pa', '≈ 45,6 Pa', '≈ 62,5 Pa', '≈ 1,75 Pa'],
    correctAnswer: 0,
    explanation: 'lg pᵥ = (lg 50 − 0,301) / 0,8 ≈ (1,69897 − 0,301) / 0,8 ≈ 1,7475 ⇒ pᵥ ≈ 55,9 Pa. (62,5 = 50 / 0,8 hibás „lg nélküli” számolás.)'
  },
  {
    id: 'lp1-q26',
    level: 3,
    questionTypeBadge: 'Richter-skála',
    question: 'Hányszor akkora energia szabadult fel a 9,3-es szumátrai földrengésben, mint egy 5,0-s erősségűben?',
    figure: <RichterFig m1="9,3" m2="5,0" />,
    options: ['≈ 2,8 millió-szor', '≈ 4,3-szer', '≈ 20 000-szer', '≈ 1,86-szor'],
    correctAnswer: 0,
    explanation: 'Δ lg E = 1,5 · (9,3 − 5,0) = 6,45 ⇒ E₁ / E₂ = 10^{6,45} ≈ 2,8 · 10⁶. (1,86 = 9,3 / 5 hibás arány.)'
  },
  {
    id: 'lp1-q27',
    level: 3,
    questionTypeBadge: 'Felezési idő',
    question: 'Egy izotóp felezési ideje 8 nap. Hány nap alatt csökken 80 g-ja 10 g-ra?',
    options: ['24 nap', '64 nap', '56 nap', '32 nap'],
    correctAnswer: 0,
    explanation: '80 → 40 → 20 → 10: 3 felezés, 3 · 8 = 24 nap. (1/2)^{t/8} = 1/8 ⇒ t/8 = 3.'
  },
  {
    id: 'lp1-q28',
    level: 3,
    questionTypeBadge: 'Duplázódás',
    question: 'Évi 3%-os kamatos kamattal kb. hány év alatt duplázódik meg egy összeg?',
    options: ['≈ 23,4 év', '≈ 33,3 év', '≈ 66,7 év', '≈ 6,7 év'],
    correctAnswer: 0,
    explanation: '1,03ⁿ = 2 ⇒ n = lg 2 / lg 1,03 ≈ 0,30103 / 0,012837 ≈ 23,45 év. (33,3 = 100 / 3 az egyszerű kamatos becslés.)'
  },
  {
    id: 'lp1-q29',
    level: 3,
    questionTypeBadge: 'Exponenciális egyenlet',
    question: 'Oldd meg: 2ˣ⁺¹ = 7. Melyik a legjobb közelítés?',
    options: ['x ≈ 1,807', 'x ≈ 2,807', 'x ≈ 2,5', 'x ≈ 0,845'],
    correctAnswer: 0,
    explanation: '2 · 2ˣ = 7 ⇒ 2ˣ = 3,5 ⇒ x = lg 3,5 / lg 2 ≈ 1,807. (2,807 = log₂ 7 lenne x + 1.)'
  },
  {
    id: 'lp1-q30',
    level: 3,
    questionTypeBadge: 'Exponenciális függvény',
    question: 'Az f(x) = aˣ függvény átmegy a (−2; 9) ponton. Mennyi f(1)?',
    options: ['1/3', '3', '−3', '1/9'],
    correctAnswer: 0,
    explanation: 'a⁻² = 9 ⇒ a² = 1/9 ⇒ a = 1/3 (a > 0). f(1) = 1/3. (3 lenne, ha a⁻² helyett a²-tel számolnánk.)'
  }
];

export const LogPractice1Quiz: React.FC<{
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
      topicId="g11-exp-log-gyakorlas-elso-quiz"
      subtopicId="gyakorlas-logaritmus-1"
      title="13. Gyakorlás – Kvíz"
      subtitle="30 érettségi típusú tesztkérdés 3 nehézségi szinten: logaritmusos és exponenciális egyenletek, exponenciális függvény, Richter-skála és más logaritmikus képletek."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={LOG_PRACTICE_1_QUESTIONS}
      cheatSheets={[
        {
          title: 'Logaritmus',
          items: [
            'log_a b = c ⇔ aᶜ = b (a > 0, a ≠ 1, b > 0)',
            'log_a 1 = 0; log_a a = 1; lg 1000 = 3',
            'log_a f(x) = c ⇒ f(x) = aᶜ, majd ellenőrzés',
            'log₂ x² = 4 ⇒ x = ±4'
          ]
        },
        {
          title: 'Exponenciális egyenlet',
          items: [
            'Közös alap: 4ˣ = 8 ⇒ 2²ˣ = 2³ ⇒ x = 1,5',
            'aˣ = b ⇒ x = lg b / lg a (2ˣ = 10 ⇒ x ≈ 3,322)',
            'c · aˣ = b: előbb osztunk c-vel',
            'f(x) = aˣ: a > 1 nő, 0 < a < 1 csökken'
          ]
        },
        {
          title: 'Képletek',
          items: [
            'Richter: M = −4,42 + (2/3) · lg E',
            'ΔM = 2 ⇒ 1000-szeres energia',
            'É = 75,5 − 5 · 10^{(6000 − G)/6090}',
            'Kamatos kamat: T₀ · (1 + p/100)ⁿ'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <LogPractice1Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <LogPractice1Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default LogPractice1Quiz;
