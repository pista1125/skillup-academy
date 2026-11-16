import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ArithmeticSummaryMatcher } from './ArithmeticSummaryMatcher';
import { ArithmeticSummarySorter } from './ArithmeticSummarySorter';
import { A_BLUE, A_RED, A_GREEN, A_PURPLE, A_INK } from './arKit';

const QSVG: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 160 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const FIG_FACT = (
  <QSVG h={120}>
    <text x="120" y="30" fontSize="13" textAnchor="middle" fill={A_BLUE} fontWeight="bold">90 = 2 · 3² · 5</text>
    <text x="120" y="56" fontSize="13" textAnchor="middle" fill={A_RED} fontWeight="bold">75 = 3 · 5²</text>
    <text x="120" y="92" fontSize="13" textAnchor="middle" fill={A_GREEN} fontWeight="bold">(90; 75) = ?</text>
  </QSVG>
);

const FIG_BIN = (
  <QSVG h={110}>
    {['1', '0', '1', '1', '1', '1'].map((d, i) => (
      <g key={i}>
        <rect x={22 + i * 34} y="28" width="28" height="30" rx="6" fill="#dbeafe" stroke={A_BLUE} />
        <text x={36 + i * 34} y="48" fontSize="14" fontWeight="bold" textAnchor="middle" fill={A_INK}>{d}</text>
        <text x={36 + i * 34} y="76" fontSize="10" textAnchor="middle" fill="#475569">{[32, 16, 8, 4, 2, 1][i]}</text>
      </g>
    ))}
    <text x="120" y="98" fontSize="11" textAnchor="middle" fill={A_RED} fontWeight="bold">101111₂ = ? (tízes számrendszerben)</text>
  </QSVG>
);

const FIG_BASE5 = (
  <QSVG h={110}>
    {['3', '0', '1', '4'].map((d, i) => (
      <g key={i}>
        <rect x={40 + i * 42} y="28" width="34" height="32" rx="6" fill="#dbeafe" stroke={A_BLUE} />
        <text x={57 + i * 42} y="50" fontSize="15" fontWeight="bold" textAnchor="middle" fill={A_INK}>{d}</text>
        <text x={57 + i * 42} y="78" fontSize="9.5" textAnchor="middle" fill="#475569">{['125', '25', '5', '1'][i]}</text>
      </g>
    ))}
    <text x="214" y="50" fontSize="12" textAnchor="middle" fill={A_BLUE} fontWeight="bold">₅</text>
    <text x="120" y="100" fontSize="11" textAnchor="middle" fill={A_RED} fontWeight="bold">6-os számrendszerben: ?</text>
  </QSVG>
);

const FIG_TAX = (
  <QSVG h={150}>
    <rect x="30" y="30" width="180" height="22" fill="#dbeafe" stroke={A_BLUE} />
    <text x="120" y="45" fontSize="10.5" textAnchor="middle" fill={A_INK}>eladási ár: 7,8 millió Ft</text>
    <rect x="30" y="62" width="120" height="22" fill="#fee2e2" stroke={A_RED} />
    <text x="90" y="77" fontSize="10" textAnchor="middle" fill={A_INK}>vételár: 5,2</text>
    <rect x="150" y="62" width="9" height="22" fill="#fde68a" stroke="#d97706" />
    <text x="190" y="77" fontSize="9.5" textAnchor="middle" fill={A_INK}>költség 0,4</text>
    <rect x="159" y="94" width="51" height="22" fill="#dcfce7" stroke={A_GREEN} />
    <text x="110" y="109" fontSize="10" textAnchor="end" fill={A_GREEN} fontWeight="bold">adóalap →</text>
    <text x="120" y="138" fontSize="11" textAnchor="middle" fill={A_PURPLE} fontWeight="bold">adó: az adóalap 15%-a = ?</text>
  </QSVG>
);

const FIG_DECAY = (
  <QSVG h={150}>
    <line x1="25" x2="225" y1="120" y2="120" stroke={A_INK} />
    {[0, 1, 2, 3, 4].map((t) => {
      const v = 7.8 * 0.97 ** t;
      const h = (v / 7.8) * 80;
      return (
        <g key={t}>
          <rect x={40 + t * 38} y={120 - h} width="26" height={h} fill={t === 4 ? '#fde68a' : '#bfdbfe'} stroke={A_BLUE} />
          <text x={53 + t * 38} y="136" fontSize="9.5" textAnchor="middle" fill="#475569">{t}. év</text>
          <text x={53 + t * 38} y={114 - h} fontSize="9.5" textAnchor="middle" fill={A_INK}>
            {t === 0 ? '7,8' : t === 4 ? '?' : ''}
          </text>
        </g>
      );
    })}
    <text x="120" y="20" fontSize="10.5" textAnchor="middle" fill={A_RED} fontWeight="bold">évente −3% (millió Ft)</text>
  </QSVG>
);

const FIG_SHIPS = (
  <QSVG h={120}>
    <line x1="15" x2="225" y1="50" y2="50" stroke={A_BLUE} strokeWidth="2" />
    <line x1="15" x2="225" y1="85" y2="85" stroke={A_RED} strokeWidth="2" />
    {Array.from({ length: 11 }, (_, i) => (
      <circle key={`a${i}`} cx={20 + i * 18} cy="50" r="3.5" fill={A_BLUE} />
    ))}
    {Array.from({ length: 10 }, (_, i) => (
      <circle key={`b${i}`} cx={20 + i * 20} cy="85" r="3.5" fill={A_RED} />
    ))}
    <text x="20" y="38" fontSize="10" fill={A_BLUE} fontWeight="bold">AngryMan: 18 naponta</text>
    <text x="20" y="105" fontSize="10" fill={A_RED} fontWeight="bold">BigBlue: 20 naponta</text>
    <text x="205" y="72" fontSize="13" fill={A_PURPLE} fontWeight="bold">?</text>
  </QSVG>
);

export const ARITHMETIC_SUMMARY_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'ar-q1',
    questionTypeBadge: 'Számhalmazok',
    level: 1,
    question: 'Melyik szám irracionális?',
    options: ['√2', '0,1666…', '5/7', '√9'],
    correctAnswer: 0,
    explanation: '√2 nem írható fel két egész szám hányadosaként. 0,1666… = 1/6 végtelen szakaszos, √9 = 3 egész.'
  },
  {
    id: 'ar-q2',
    questionTypeBadge: 'Prímszám',
    level: 1,
    question: 'Melyik szám prím?',
    options: ['2', '1', '15', '49'],
    correctAnswer: 0,
    explanation: 'A 2-nek pontosan két pozitív osztója van. Az 1 nem prím (egy osztója van), 15 = 3 · 5, 49 = 7².'
  },
  {
    id: 'ar-q3',
    questionTypeBadge: 'LNKO',
    figure: FIG_FACT,
    level: 1,
    question: 'Mennyi a 90 és a 75 legnagyobb közös osztója?',
    options: ['15', '5', '450', '3'],
    correctAnswer: 0,
    explanation: 'Közös prímtényezők a kisebb kitevőn: 3 · 5 = 15.'
  },
  {
    id: 'ar-q4',
    questionTypeBadge: 'LKKT',
    level: 1,
    question: 'Mennyi a 90 és a 75 legkisebb közös többszöröse?',
    options: ['450', '900', '6750', '15'],
    correctAnswer: 0,
    explanation: '90 = 2 · 3² · 5, 75 = 3 · 5²: minden prím a nagyobb kitevőn: 2 · 3² · 5² = 450. (6750 a két szám szorzata.)'
  },
  {
    id: 'ar-q5',
    questionTypeBadge: 'Hatványozás',
    level: 1,
    question: 'Mivel egyenlő 2³ · 2⁴?',
    options: ['2⁷', '2¹²', '4⁷', '2¹'],
    correctAnswer: 0,
    explanation: 'Azonos alapú hatványok szorzásakor a kitevőket összeadjuk: 2³⁺⁴ = 2⁷ = 128.'
  },
  {
    id: 'ar-q6',
    questionTypeBadge: 'Logaritmus',
    level: 1,
    question: 'Mennyi log₂ 8?',
    options: ['3', '4', '2', '1/3'],
    correctAnswer: 0,
    explanation: '2³ = 8, tehát a 2-t a 3. hatványra kell emelni.'
  },
  {
    id: 'ar-q7',
    questionTypeBadge: 'Százalék',
    level: 1,
    question: 'Mennyi 72-nek a 15%-a?',
    options: ['10,8', '4,8', '108', '1,08'],
    correctAnswer: 0,
    explanation: '72 / 100 · 15 = 10,8.'
  },
  {
    id: 'ar-q8',
    questionTypeBadge: 'Négyzetgyök',
    level: 1,
    question: 'Mennyi √((−5)²)?',
    options: ['5', '−5', '±5', '25'],
    correctAnswer: 0,
    explanation: '√(a²) = |a|, így √((−5)²) = √25 = 5. A négyzetgyök sosem negatív.'
  },
  {
    id: 'ar-q9',
    questionTypeBadge: 'n-edik gyök',
    level: 1,
    question: 'Mennyi ⁵√(−32)?',
    options: ['−2', '2', 'nincs értelmezve', '−16'],
    correctAnswer: 0,
    explanation: 'Páratlan kitevőjű gyök negatív számból is vonható: (−2)⁵ = −32.'
  },
  {
    id: 'ar-q10',
    questionTypeBadge: 'Intervallum',
    level: 1,
    question: 'Mit jelent a ]−2; 1[ intervallum?',
    options: ['−2 < x < 1', '−2 ≤ x ≤ 1', '−2 ≤ x < 1', '−2 < x ≤ 1'],
    correctAnswer: 0,
    explanation: 'Kifelé fordított szögletes zárójel: nyílt végpont, a −2 és az 1 nem tartozik az intervallumhoz.'
  },
  // ---------- 2. szint ----------
  {
    id: 'ar-q11',
    questionTypeBadge: 'Százalékszámítás',
    level: 2,
    question: 'Egy autó értéke egy év alatt 6%-kal csökkent, így most 2 280 000 Ft-ot ér. Mennyi volt az értéke egy éve (egész forintra kerekítve)?',
    options: ['2 425 532 Ft', '2 416 800 Ft', '2 143 200 Ft', '2 400 000 Ft'],
    correctAnswer: 0,
    explanation: 'x · 0,94 = 2 280 000 ⇒ x ≈ 2 425 532 Ft. (A 2 416 800 = 2 280 000 · 1,06 hibás: a 6% az eredeti értékre vonatkozik.)'
  },
  {
    id: 'ar-q12',
    questionTypeBadge: 'Százalékszámítás',
    level: 2,
    question: 'Egy iskola tanulóinak 28%-a végzős, a végzősök 75%-a, vagyis 168 diák egyetemre készül. Hány diák jár az iskolába?',
    options: ['800', '224', '600', '1176'],
    correctAnswer: 0,
    explanation: 'Végzősök: 168 / 0,75 = 224; összes: 224 / 0,28 = 800. (A 224 csak a végzősök száma.)'
  },
  {
    id: 'ar-q13',
    questionTypeBadge: 'Kettes számrendszer',
    figure: FIG_BIN,
    level: 2,
    question: 'Mennyi a kettes számrendszerben felírt 101111 szám értéke tízes számrendszerben?',
    options: ['47', '45', '63', '111'],
    correctAnswer: 0,
    explanation: '32 + 0 + 8 + 4 + 2 + 1 = 47.'
  },
  {
    id: 'ar-q14',
    questionTypeBadge: 'Oszthatóság',
    level: 2,
    question: 'Hány olyan 5A7B alakú négyjegyű szám van (A, B számjegyek), amely osztható 15-tel?',
    options: ['7', '4', '6', '10'],
    correctAnswer: 0,
    explanation: '5-tel: B = 0 vagy 5; 3-mal: a jegyösszeg osztható 3-mal. B = 0: A ∈ {0; 3; 6; 9}, B = 5: A ∈ {1; 4; 7} – összesen 7.'
  },
  {
    id: 'ar-q15',
    questionTypeBadge: 'Logaritmus',
    level: 2,
    question: 'Mennyi log₉ 3?',
    options: ['1/2', '3', '1/3', '2'],
    correctAnswer: 0,
    explanation: '9^{1/2} = √9 = 3, ezért log₉ 3 = 1/2. (log₃ 9 lenne 2.)'
  },
  {
    id: 'ar-q16',
    questionTypeBadge: 'Törtkitevő',
    level: 2,
    question: 'Mennyi 8^{2/3}?',
    options: ['4', '16/3', '2', '64'],
    correctAnswer: 0,
    explanation: '8^{2/3} = ∛(8²) = ∛64 = 4 (vagy (∛8)² = 2² = 4).'
  },
  {
    id: 'ar-q17',
    questionTypeBadge: 'Hatványazonosság',
    level: 2,
    question: 'A 2-nek hányadik hatványával egyenlő 8^{-3/4}?',
    options: ['2^{-9/4}', '2^{-3/4}', '2^{-12}', '2^{9/4}'],
    correctAnswer: 0,
    explanation: '8 = 2³, így 8^{-3/4} = (2³)^{-3/4} = 2^{-9/4} (a kitevők szorzódnak).'
  },
  {
    id: 'ar-q18',
    questionTypeBadge: 'Fordított arányosság',
    level: 2,
    question: '21 egyforma gép 4,4 óra alatt gyártaná le a megrendelést. Hány perc alatt végez 18 ugyanilyen gép?',
    options: ['308 perc', '226 perc', '264 perc', '320 perc'],
    correctAnswer: 0,
    explanation: 'A gépszám és az idő fordítottan arányos: 21 · 4,4 / 18 ≈ 5,133 óra = 308 perc. (226 perc az egyenes arányosság hibás alkalmazása.)'
  },
  {
    id: 'ar-q19',
    questionTypeBadge: 'Értelmezési tartomány',
    level: 2,
    question: 'Hány olyan x természetes szám van, amelyre értelmezett a √(47 − 3x) kifejezés?',
    options: ['16', '15', '47', '17'],
    correctAnswer: 0,
    explanation: '47 − 3x ≥ 0 ⇒ x ≤ 15,67, így x = 0; 1; …; 15: 16 szám (a 0 is természetes szám).'
  },
  {
    id: 'ar-q20',
    questionTypeBadge: 'Áttérés más alapra',
    level: 2,
    question: 'Melyik egyenlő log₄ 3-mal?',
    options: ['log₂ 3 / 2', '2 · log₂ 3', 'log₂ 3 − 2', 'lg 3 · lg 4'],
    correctAnswer: 0,
    explanation: 'log₄ 3 = log₂ 3 / log₂ 4 = log₂ 3 / 2.'
  },
  // ---------- 3. szint ----------
  {
    id: 'ar-q21',
    questionTypeBadge: 'Számrendszerek',
    figure: FIG_BASE5,
    level: 3,
    question: 'Írd át 6-os számrendszerbe az 5-ös számrendszerbeli 3014 számot!',
    options: ['1440₆', '384₆', '4410₆', '1044₆'],
    correctAnswer: 0,
    explanation: '3014₅ = 3 · 125 + 1 · 5 + 4 = 384; 384 = 1 · 216 + 4 · 36 + 4 · 6 + 0, tehát 1440₆.'
  },
  {
    id: 'ar-q22',
    questionTypeBadge: 'Adószámítás',
    figure: FIG_TAX,
    level: 3,
    question: 'Kovács úr 7,8 millió Ft-ért adja el a lakását, az új 5,2 millióba kerül, a költségek 0,4 millió Ft. Az adó az „eladási ár − (vételár + költségek)” 15%-a. Mennyi az adó?',
    options: ['330 000 Ft', '390 000 Ft', '450 000 Ft', '1 170 000 Ft'],
    correctAnswer: 0,
    explanation: 'Adóalap: 7,8 − 5,6 = 2,2 millió; 15%-a 330 000 Ft. (390 000: a költséget kihagyva; 1 170 000: a teljes eladási ár 15%-a.)'
  },
  {
    id: 'ar-q23',
    questionTypeBadge: 'Csökkenés kamatos módon',
    figure: FIG_DECAY,
    level: 3,
    question: 'A 7,8 millió Ft-os lakás értéke évente 3%-kal csökken. Mennyit ér 4 teljes év után (kb.)?',
    options: ['6,91 millió Ft', '6,86 millió Ft', '7,57 millió Ft', '6,24 millió Ft'],
    correctAnswer: 0,
    explanation: '7,8 · 0,97⁴ ≈ 6,905 millió Ft. (6,86 a 4 · 3% = 12% egyszeri levonása – hibás.)'
  },
  {
    id: 'ar-q24',
    questionTypeBadge: 'Átlagos növekedés',
    level: 3,
    question: 'A Föld népessége 19 hónap alatt 7,753 milliárdról 7,963 milliárdra nőtt. Mekkora volt a havi átlagos növekedés?',
    options: ['kb. 0,14%', 'kb. 2,7%', 'kb. 1,4%', 'kb. 0,027%'],
    correctAnswer: 0,
    explanation: 'q¹⁹ = 7,963 / 7,753 ≈ 1,027 ⇒ q = 1,027^{1/19} ≈ 1,0014, azaz havi kb. 0,14%. (2,7% a teljes 19 hónapos növekedés.)'
  },
  {
    id: 'ar-q25',
    questionTypeBadge: 'LKKT a gyakorlatban',
    figure: FIG_SHIPS,
    level: 3,
    question: 'Az egyik hajó 18, a másik 20 naponként indul ugyanabból a kikötőből; március 1-jén együtt indultak. Hány nap múlva indulnak legközelebb ismét együtt?',
    options: ['180', '360', '38', '2'],
    correctAnswer: 0,
    explanation: '[18; 20] = 2² · 3² · 5 = 180 nap, vagyis augusztus 28-án. (2 a legnagyobb közös osztó.)'
  },
  {
    id: 'ar-q26',
    questionTypeBadge: 'Maradékos osztás',
    level: 3,
    question: 'Ha egy iskola diákjai 6-, 8-, 9- vagy 10-esével állnak sorba, mindig 4 diák marad az utolsó sorra. Hány diák van, ha kevesebb, mint 500?',
    options: ['364', '360', '184', '124'],
    correctAnswer: 0,
    explanation: 'A létszám − 4 osztható [6; 8; 9; 10] = 360-nal ⇒ 364. (124: 120 = [6; 8; 10], de 9-cel nem osztható.)'
  },
  {
    id: 'ar-q27',
    questionTypeBadge: 'Számjegyes fejtörő',
    level: 3,
    question: 'Melyik a legkisebb 6-ra végződő természetes szám, amely négyszeresére nő, ha a végéről a 6-ost az elejére tesszük?',
    options: ['153 846', '615 384', '102 564', '16'],
    correctAnswer: 0,
    explanation: '153 846 · 4 = 615 384, és ez éppen a 6-os előre helyezésével kapható. (102 564 · 4 = 410 256 – ott a 4-es vándorol.)'
  },
  {
    id: 'ar-q28',
    questionTypeBadge: 'Számrendszer alapja',
    level: 3,
    question: 'Melyik n alapú számrendszerben igaz, hogy 20123ₙ = 539?',
    options: ['n = 4', 'n = 5', 'n = 3', 'n = 6'],
    correctAnswer: 0,
    explanation: '2n⁴ + n² + 2n + 3 = 539; n = 4: 512 + 16 + 8 + 3 = 539. (n = 3 nem lehet, mert van 3-as jegy.)'
  },
  {
    id: 'ar-q29',
    questionTypeBadge: 'Logaritmus a gyakorlatban',
    level: 3,
    question: 'Egy egérmozdulat bonyolultsági indexe ID = log₂ (2x / d), ahol x a távolság, d a célpont átmérője. Mennyi az ID, ha x = 8 cm és d = 0,5 cm?',
    options: ['5', '32', '4', '16'],
    correctAnswer: 0,
    explanation: '2x / d = 16 / 0,5 = 32 = 2⁵, így ID = 5. (4-szer akkora távolságnál log₂ 128 = 7 lenne.)'
  },
  {
    id: 'ar-q30',
    questionTypeBadge: 'Prímtényezők',
    level: 3,
    question: 'Egy négyjegyű kód prímtényezős felbontásában mind a négy egyjegyű prím (2, 3, 5, 7) szerepel. Melyik számjegy szerepel biztosan minden ilyen kódban?',
    options: ['0', '2', '5', '1'],
    correctAnswer: 0,
    explanation: 'A kód 2 · 3 · 5 · 7 = 210 többszöröse, tehát 10-zel osztható: az utolsó jegye 0. (Négyzetszám nem lehet: 210² = 44 100 ötjegyű.)'
  }
];

export const ArithmeticSummaryQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId="g12-sum-szamtan-quiz"
      subtopicId="szamtan"
      title="3. Számtan – Kvíz"
      subtitle="30 érettségi típusú kérdés 3 szinten: számhalmazok, oszthatóság, LNKO, LKKT, hatvány, gyök, logaritmus, számrendszerek, százalék."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • KVÍZ"
      questions={ARITHMETIC_SUMMARY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Oszthatóság',
          items: ['prím: pontosan 2 pozitív osztó; az 1 nem prím', 'LNKO: közös prímek, kisebb kitevő', 'LKKT: összes prím, nagyobb kitevő', '(a; b) · [a; b] = a · b']
        },
        {
          title: 'Hatvány, gyök, log',
          items: ['aⁿ · aᵐ = aⁿ⁺ᵐ, (aⁿ)ᵐ = aⁿᵐ, a⁻ⁿ = 1/aⁿ', '√(a²) = |a|', 'a^{p/q} = q-adik gyök alatt aᵖ', 'logₐ b = lg b / lg a']
        },
        {
          title: 'Százalék, számrendszer',
          items: ['p%-os növekedés: · (1 + p/100)', 'p%-os csökkenés: · (1 − p/100)', 'n alapú: helyi értékek 1; n; n²; …', 'átváltás: a legnagyobb hatványtól lefelé']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ArithmeticSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ArithmeticSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ArithmeticSummaryQuiz;
