import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CommonLogarithmMatcher } from './CommonLogarithmMatcher';
import { CommonLogarithmSorter } from './CommonLogarithmSorter';

const QSVG = 'w-full max-w-[280px] h-auto mx-auto';

/** y = 10ˣ és az y = 4 egyenes; a metszéspont x-koordinátája ismeretlen. */
const GRAPH_10X_FIG = (() => {
  const toS = (x: number, y: number): [number, number] => [90 + x * 100, 140 - y * 25];
  let d = '';
  for (let i = 0; i <= 100; i++) {
    const x = -0.8 + (1.5 * i) / 100;
    const [sx, sy] = toS(x, Math.pow(10, x));
    d += `${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)} `;
  }
  const [px, py] = toS(Math.log10(4), 4);
  return (
    <svg viewBox="0 0 240 160" className={QSVG}>
      <line x1="5" y1="140" x2="235" y2="140" stroke="#94a3b8" />
      <line x1="90" y1="5" x2="90" y2="155" stroke="#94a3b8" />
      <text x="190" y="152" fontSize="9" textAnchor="middle" fill="#64748b">1</text>
      {[1, 2, 3, 4].map((t) => (
        <text key={t} x="85" y={toS(0, t)[1] + 3} fontSize="9" textAnchor="end" fill="#64748b">{t}</text>
      ))}
      <path d={d} fill="none" stroke="#7c3aed" strokeWidth="2.2" />
      <line x1="5" y1={py} x2="235" y2={py} stroke="#f59e0b" strokeDasharray="5 4" />
      <text x="232" y={py - 4} fontSize="10" textAnchor="end" fill="#b45309">y = 4</text>
      <line x1={px} y1={py} x2={px} y2="140" stroke="#be185d" strokeDasharray="3 3" />
      <circle cx={px} cy={py} r="3.5" fill="#be185d" />
      <text x={px + 4} y="134" fontSize="11" fontWeight="bold" fill="#b91c1c">x = ?</text>
      <text x="20" y="20" fontSize="10" fill="#7c3aed">y = 10ˣ</text>
    </svg>
  );
})();

/** Számegyenes a 10 hatványaival és az 572 helyével. */
const SCALE_FIG = (
  <svg viewBox="0 0 240 80" className={QSVG}>
    <line x1="10" y1="40" x2="230" y2="40" stroke="#334155" strokeWidth="1.5" />
    {['1', '10', '100', '1000', '10 000'].map((l, i) => (
      <g key={l}>
        <line x1={20 + i * 50} y1="33" x2={20 + i * 50} y2="47" stroke="#334155" strokeWidth="1.5" />
        <text x={20 + i * 50} y="62" fontSize="9" textAnchor="middle" fill="#334155">{l}</text>
      </g>
    ))}
    <circle cx={20 + Math.log10(572) * 50} cy="40" r="4" fill="#be185d" />
    <text x={20 + Math.log10(572) * 50} y="26" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#be185d">572</text>
    <text x="120" y="77" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#b91c1c">lg 572 = ?</text>
  </svg>
);

/** Tőke évi 15%-os kamattal – mikor éri el a háromszorosát? */
const INTEREST_FIG = (
  <svg viewBox="0 0 240 150" className={QSVG}>
    <line x1="15" y1="130" x2="235" y2="130" stroke="#64748b" />
    <line x1="15" y1={130 - 3 * 32} x2="235" y2={130 - 3 * 32} stroke="#db2777" strokeDasharray="4 3" />
    <text x="232" y={130 - 3 * 32 - 4} fontSize="10" textAnchor="end" fill="#9d174d">3A</text>
    {[0, 1, 2, 3, 4, 5].map((n) => {
      const v = Math.pow(1.15, n);
      return (
        <g key={n}>
          <rect x={22 + n * 26} y={130 - v * 32} width="20" height={v * 32} fill="#c4b5fd" rx="2" />
          <text x={32 + n * 26} y="142" fontSize="8" textAnchor="middle" fill="#334155">{n}</text>
        </g>
      );
    })}
    <text x="200" y="120" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#b91c1c">?</text>
    <text x="70" y="14" fontSize="10" textAnchor="middle" fill="#334155">A · 1,15ˣ</text>
  </svg>
);

/** 0,83ᵗ csökkenő görbe, a 0,5-ös szintnél ismeretlen t. */
const DECAY_FIG = (() => {
  const toS = (t: number, y: number): [number, number] => [25 + t * 25, 130 - y * 110];
  let d = '';
  for (let i = 0; i <= 100; i++) {
    const t = (8 * i) / 100;
    const [x, y] = toS(t, Math.pow(0.83, t));
    d += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  const T = Math.log10(0.5) / Math.log10(0.83);
  const [px, py] = toS(T, 0.5);
  return (
    <svg viewBox="0 0 240 150" className={QSVG}>
      <line x1="25" y1="130" x2="235" y2="130" stroke="#94a3b8" />
      <line x1="25" y1="130" x2="25" y2="10" stroke="#94a3b8" />
      <text x="20" y={toS(0, 1)[1] + 3} fontSize="9" textAnchor="end" fill="#64748b">1</text>
      <text x="20" y={py + 3} fontSize="9" textAnchor="end" fill="#64748b">0,5</text>
      <path d={d} fill="none" stroke="#7c3aed" strokeWidth="2.2" />
      <line x1="25" y1={py} x2={px} y2={py} stroke="#be185d" strokeDasharray="3 3" />
      <line x1={px} y1={py} x2={px} y2="130" stroke="#be185d" strokeDasharray="3 3" />
      <circle cx={px} cy={py} r="3.5" fill="#be185d" />
      <text x={px} y="144" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#b91c1c">t = ?</text>
      <text x="230" y="40" fontSize="10" textAnchor="end" fill="#7c3aed">y = 0,83ᵗ</text>
    </svg>
  );
})();

const COMMON_LOG_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1 (1–10)
  {
    id: 'clg-q1',
    level: 1,
    questionTypeBadge: 'lg számológéppel',
    question: 'Az ábrán az y = 10ˣ grafikonja és az y = 4 egyenes látható. Mennyi a metszéspont x-koordinátája (4 tizedesjegyre)?',
    figure: GRAPH_10X_FIG,
    options: ['≈ 0,6021', '0,4', '≈ 1,3863', '0,25'],
    correctAnswer: 0,
    explanation: 'x = lg 4 ≈ 0,60206, mert 10^{0,60206} ≈ 4. (Az 1,3863 a természetes alapú logaritmus, a 0,4 és a 0,25 tippelés.)'
  },
  {
    id: 'clg-q2',
    level: 1,
    questionTypeBadge: 'Jelölés',
    question: 'Mit jelent az lg jel?',
    options: ['A tízes alapú logaritmust: lg b = log₁₀ b', 'A kettes alapú logaritmust', 'A logaritmus abszolút értékét', 'Bármely alapú logaritmust'],
    correctAnswer: 0,
    explanation: 'A gyakori használat miatt a log₁₀ helyett az lg szimbólumot használjuk.'
  },
  {
    id: 'clg-q3',
    level: 1,
    questionTypeBadge: 'Tízes logaritmus',
    question: 'Mennyi lg 1000 értéke?',
    options: ['3', '100', '4', '30'],
    correctAnswer: 0,
    explanation: '10³ = 1000, ezért lg 1000 = 3.'
  },
  {
    id: 'clg-q4',
    level: 1,
    questionTypeBadge: 'Tízes logaritmus',
    question: 'Mennyi lg 0,01 értéke?',
    options: ['−2', '2', '−1', '0,02'],
    correctAnswer: 0,
    explanation: '0,01 = 10⁻², ezért lg 0,01 = −2.'
  },
  {
    id: 'clg-q5',
    level: 1,
    questionTypeBadge: 'lg számológéppel',
    question: 'Mennyi lg 2 értéke 4 tizedesjegyre kerekítve?',
    options: ['0,3010', '0,2000', '0,6931', '0,5000'],
    correctAnswer: 0,
    explanation: 'lg 2 ≈ 0,30103 (10^{0,3010} ≈ 2). A 0,6931 a természetes alapú logaritmus (ln 2).'
  },
  {
    id: 'clg-q6',
    level: 1,
    questionTypeBadge: 'Hatványalak',
    question: 'Hogyan írható fel a 4 a 10 hatványaként?',
    options: ['4 ≈ 10^{0,60206}', '4 = 10^{0,4}', '4 = 10^{4}', '4 ≈ 10^{2,5}'],
    correctAnswer: 0,
    explanation: 'Minden pozitív szám b = 10^{lg b} alakú; lg 4 ≈ 0,60206.'
  },
  {
    id: 'clg-q7',
    level: 1,
    questionTypeBadge: 'Számítás',
    question: 'Mennyi lg 5 + lg 2 értéke?',
    options: ['1', '0,7', 'lg 7', '10'],
    correctAnswer: 0,
    explanation: 'lg 5 ≈ 0,6990 és lg 2 ≈ 0,3010, összegük 1,0000 = lg 10.'
  },
  {
    id: 'clg-q8',
    level: 1,
    questionTypeBadge: 'Áttérés',
    question: 'Melyik képlettel számolható ki logₐ b tízes alapú logaritmussal?',
    options: ['(lg b)/(lg a)', '(lg a)/(lg b)', 'lg b − lg a', 'lg (a · b)'],
    correctAnswer: 0,
    explanation: 'logₐ b = (lg b)/(lg a): a számlálóba az argumentum, a nevezőbe az alap logaritmusa kerül.'
  },
  {
    id: 'clg-q9',
    level: 1,
    questionTypeBadge: 'lg számológéppel',
    question: 'Mennyi lg 572 értéke 4 tizedesjegyre?',
    figure: SCALE_FIG,
    options: ['2,7574', '0,7574', '3,7574', '57,2000'],
    correctAnswer: 0,
    explanation: '100 < 572 < 1000, ezért 2 < lg 572 < 3; számológéppel lg 572 ≈ 2,7574.'
  },
  {
    id: 'clg-q10',
    level: 1,
    questionTypeBadge: 'lg számológéppel',
    question: 'Mennyi lg 0,836 értéke 4 tizedesjegyre?',
    options: ['−0,0778', '0,0778', '−0,8360', '−1,0778'],
    correctAnswer: 0,
    explanation: '0,1 < 0,836 < 1, ezért −1 < lg 0,836 < 0; számológéppel ≈ −0,0778.'
  },

  // LEVEL 2 (11–20)
  {
    id: 'clg-q11',
    level: 2,
    questionTypeBadge: 'Kamatos kamat',
    question: 'Hány év alatt háromszorozódik meg az évi 15%-os kamatos kamattal gyarapodó tőke?',
    figure: INTEREST_FIG,
    options: ['8 év alatt (x ≈ 7,86)', '20 év alatt', '13 év alatt', '3 év alatt'],
    correctAnswer: 0,
    explanation: '1,15ˣ = 3 ⇒ x = (lg 3)/(lg 1,15) ≈ 7,86; a kamatot évente írják jóvá, így a 8. év végére. (20 = 3 : 0,15 és a 13 év a lineáris gondolkodás hibája.)'
  },
  {
    id: 'clg-q12',
    level: 2,
    questionTypeBadge: 'Áttérés',
    question: 'Mennyi log₃ 20 értéke 4 tizedesjegyre?',
    options: ['≈ 2,7268', '≈ 0,3667', '≈ 0,8239', '≈ 6,6667'],
    correctAnswer: 0,
    explanation: 'log₃ 20 = (lg 20)/(lg 3) ≈ 1,3010 : 0,4771 ≈ 2,7268. (0,3667 a fordított hányados, 0,8239 = lg (20 : 3).)'
  },
  {
    id: 'clg-q13',
    level: 2,
    questionTypeBadge: 'Áttérés',
    question: 'Mennyi log₂ 5 értéke 2 tizedesjegyre?',
    options: ['≈ 2,32', '≈ 0,43', '≈ 2,50', '≈ 0,40'],
    correctAnswer: 0,
    explanation: 'log₂ 5 = (lg 5)/(lg 2) ≈ 0,6990 : 0,3010 ≈ 2,32. Becslés: 2² = 4 < 5 < 8 = 2³.'
  },
  {
    id: 'clg-q14',
    level: 2,
    questionTypeBadge: 'Áttérés',
    question: 'Mennyi log₀,₂ 15 értéke 4 tizedesjegyre?',
    options: ['≈ −1,6826', '≈ 1,6826', '≈ −0,5943', '≈ 1,8751'],
    correctAnswer: 0,
    explanation: 'log₀,₂ 15 = (lg 15)/(lg 0,2) ≈ 1,1761 : (−0,6990) ≈ −1,6826; ellenőrzés: 0,2^{−1,6826} ≈ 15.'
  },
  {
    id: 'clg-q15',
    level: 2,
    questionTypeBadge: 'Áttérés',
    question: 'Mennyi log₆ 703 értéke 2 tizedesjegyre?',
    options: ['≈ 3,66', '≈ 2,07', '≈ 117,17', '≈ 0,27'],
    correctAnswer: 0,
    explanation: '(lg 703)/(lg 6) ≈ 2,8470 : 0,7782 ≈ 3,66. Becslés: 6³ = 216 < 703 < 1296 = 6⁴.'
  },
  {
    id: 'clg-q16',
    level: 2,
    questionTypeBadge: 'Áttérés',
    question: 'Mennyi log₁,₀₅ 0,2 értéke 2 tizedesjegyre?',
    options: ['≈ −32,99', '≈ 32,99', '≈ −0,03', '≈ −0,70'],
    correctAnswer: 0,
    explanation: '(lg 0,2)/(lg 1,05) ≈ −0,6990 : 0,0212 ≈ −32,99. Az 1-nél nagyobb alapnak egy 1-nél kisebb szám negatív kitevőjű hatványa.'
  },
  {
    id: 'clg-q17',
    level: 2,
    questionTypeBadge: 'Egyenlet',
    question: 'Oldd meg: 8,5 · 10ˣ = 212,5 (ezredre kerekítve)!',
    options: ['x ≈ 1,398', 'x ≈ 2,327', 'x = 25', 'x ≈ 0,040'],
    correctAnswer: 0,
    explanation: '10ˣ = 212,5 : 8,5 = 25 ⇒ x = lg 25 ≈ 1,398. (2,327 ≈ lg 212,5 – kimaradt az osztás.)'
  },
  {
    id: 'clg-q18',
    level: 2,
    questionTypeBadge: 'Pontos érték',
    question: 'Számológép nélkül: mennyi log_{1/5} 25?',
    options: ['−2', '2', '−1/2', '5'],
    correctAnswer: 0,
    explanation: '(1/5)⁻² = 5² = 25, ezért a keresett kitevő −2.'
  },
  {
    id: 'clg-q19',
    level: 2,
    questionTypeBadge: 'Áttérés',
    question: 'Mennyi log₄,₅ 21 értéke 2 tizedesjegyre?',
    options: ['≈ 2,02', '≈ 4,67', '≈ 0,49', '≈ 0,67'],
    correctAnswer: 0,
    explanation: '(lg 21)/(lg 4,5) ≈ 1,3222 : 0,6532 ≈ 2,02. (4,67 = 21 : 4,5; 0,67 = lg (21 : 4,5).)'
  },
  {
    id: 'clg-q20',
    level: 2,
    questionTypeBadge: 'Felezési idő',
    question: 'A lázcsillapító hatóanyagára 0,83ᵗ = 0,5. Mennyi t ezredre kerekítve, logaritmussal számolva?',
    figure: DECAY_FIG,
    options: ['t = (lg 0,5)/(lg 0,83) ≈ 3,720', 't = (lg 0,83)/(lg 0,5) ≈ 0,269', 't = 0,5 : 0,83 ≈ 0,602', 't = lg 0,5 − lg 0,83 ≈ −0,220'],
    correctAnswer: 0,
    explanation: 't = log₀,₈₃ 0,5 = (lg 0,5)/(lg 0,83) ≈ 3,720 óra – egyezik a táblázatos közelítéssel.'
  },

  // LEVEL 3 (21–30)
  {
    id: 'clg-q21',
    level: 3,
    questionTypeBadge: 'Egyenlet',
    question: 'Oldd meg: 4,55 · 1,2ˣ = 3,64 (ezredre kerekítve)!',
    options: ['x ≈ −1,224', 'x ≈ 1,224', 'x ≈ −0,097', 'x ≈ 7,089'],
    correctAnswer: 0,
    explanation: '1,2ˣ = 3,64 : 4,55 = 0,8 ⇒ x = (lg 0,8)/(lg 1,2) ≈ −1,224.'
  },
  {
    id: 'clg-q22',
    level: 3,
    questionTypeBadge: 'Egyenlet',
    question: 'Oldd meg: 4,2^(−2x) = 5,3 (ezredre kerekítve)!',
    options: ['x ≈ −0,581', 'x ≈ 0,581', 'x ≈ −1,162', 'x ≈ −0,631'],
    correctAnswer: 0,
    explanation: '−2x = (lg 5,3)/(lg 4,2) ≈ 1,1621 ⇒ x ≈ −0,581. (−1,162 esetén elmaradt a 2-vel osztás.)'
  },
  {
    id: 'clg-q23',
    level: 3,
    questionTypeBadge: 'Egyenlet',
    question: 'Oldd meg: 6^(x+2) = 30 (ezredre kerekítve)!',
    options: ['x ≈ −0,102', 'x ≈ 1,898', 'x ≈ 3,898', 'x ≈ 3'],
    correctAnswer: 0,
    explanation: 'x + 2 = (lg 30)/(lg 6) ≈ 1,898 ⇒ x ≈ −0,102. (1,898 maga az x + 2 értéke.)'
  },
  {
    id: 'clg-q24',
    level: 3,
    questionTypeBadge: 'Egyenlet',
    question: 'Oldd meg: 1,06ˣ = 2 (ezredre kerekítve)!',
    options: ['x ≈ 11,896', 'x ≈ 16,667', 'x ≈ 1,887', 'x ≈ 0,084'],
    correctAnswer: 0,
    explanation: 'x = log₁,₀₆ 2 = (lg 2)/(lg 1,06) ≈ 11,896. (16,667 = 100 : 6, a lineáris becslés.)'
  },
  {
    id: 'clg-q25',
    level: 3,
    questionTypeBadge: 'Felezési idő',
    question: 'M(t) = 105 · 1,24^(−t). Mennyi a kezdeti érték és a felezési idő (ezredre)?',
    options: ['M(0) = 105, T ≈ 3,222', 'M(0) = 105, T ≈ 0,310', 'M(0) = 130,2, T ≈ 3,222', 'M(0) = 105, T ≈ 2,083'],
    correctAnswer: 0,
    explanation: 'M(0) = 105 · 1 = 105. 1,24^(−T) = 0,5 ⇔ 1,24^T = 2 ⇒ T = (lg 2)/(lg 1,24) ≈ 3,222.'
  },
  {
    id: 'clg-q26',
    level: 3,
    questionTypeBadge: 'Egyenlet',
    question: 'Oldd meg: 10^(3x) = 8,4 (ezredre kerekítve)!',
    options: ['x ≈ 0,308', 'x ≈ 0,924', 'x ≈ 2,800', 'x ≈ 0,975'],
    correctAnswer: 0,
    explanation: '3x = lg 8,4 ≈ 0,9243 ⇒ x ≈ 0,308. (0,924 a 3x értéke; 2,8 = 8,4 : 3.)'
  },
  {
    id: 'clg-q27',
    level: 3,
    questionTypeBadge: 'Egyenlet',
    question: 'Oldd meg: 2^(−x) = 17 (ezredre kerekítve)!',
    options: ['x ≈ −4,087', 'x ≈ 4,087', 'x ≈ −8,500', 'x ≈ −1,230'],
    correctAnswer: 0,
    explanation: '−x = (lg 17)/(lg 2) ≈ 4,087 ⇒ x ≈ −4,087.'
  },
  {
    id: 'clg-q28',
    level: 3,
    questionTypeBadge: 'Áttérés',
    question: 'Mennyi log₁₀₀ 50 értéke 4 tizedesjegyre?',
    options: ['≈ 0,8495', '≈ 0,5000', '≈ 1,1772', '≈ 0,6990'],
    correctAnswer: 0,
    explanation: '(lg 50)/(lg 100) ≈ 1,6990 : 2 ≈ 0,8495. (0,5 = 50 : 100; 1,1772 a fordított hányados.)'
  },
  {
    id: 'clg-q29',
    level: 3,
    questionTypeBadge: 'Áttérés',
    question: 'Mennyi log₀,₁ 2 értéke 4 tizedesjegyre?',
    options: ['≈ −0,3010', '≈ 0,3010', '≈ −3,3219', '≈ 0,2000'],
    correctAnswer: 0,
    explanation: 'lg 0,1 = −1, ezért log₀,₁ 2 = (lg 2)/(−1) ≈ −0,3010. (−3,3219 a fordított hányados.)'
  },
  {
    id: 'clg-q30',
    level: 3,
    questionTypeBadge: 'Pontos érték',
    question: 'Számológép nélkül: mennyi log_{1/4} (1/64)?',
    options: ['3', '−3', '1/3', '16'],
    correctAnswer: 0,
    explanation: '(1/4)³ = 1/64, ezért a keresett kitevő 3. (log₄ (1/64) lenne −3.)'
  }
];

export const CommonLogarithmQuiz: React.FC<{
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
      topicId="g11-exp-tizes-logaritmus-quiz"
      subtopicId="tizes-alapu-logaritmus"
      title="11. A tízes alapú logaritmus használata – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: lg számológéppel, áttérés tízes alapra, exponenciális egyenletek megoldása, kamatos kamat és felezési idő."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • KVÍZ"
      questions={COMMON_LOG_QUESTIONS}
      cheatSheets={[
        {
          title: 'Tízes alapú logaritmus',
          items: ['lg b = log₁₀ b', 'b = 10^{lg b} (b > 0)', 'lg 1 = 0, lg 10 = 1, lg 0,01 = −2', 'lg 2 ≈ 0,3010, lg 4 ≈ 0,6021']
        },
        {
          title: 'Áttérés',
          items: ['logₐ b = (lg b)/(lg a)', 'Számláló: argumentum, nevező: alap', 'log₃ 20 ≈ 2,7268', 'log₀,₂ 15 ≈ −1,6826']
        },
        {
          title: 'Egyenletek',
          items: ['c · qˣ = d ⇒ qˣ = d : c', 'qˣ = r ⇒ x = (lg r)/(lg q)', '1,15ˣ = 3 ⇒ x ≈ 7,86', '0,83ᵗ = 0,5 ⇒ t ≈ 3,720']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CommonLogarithmMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <CommonLogarithmSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default CommonLogarithmQuiz;
