import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NumeralSystems1Matcher } from './NumeralSystems1Matcher';
import { NumeralSystems1Sorter } from './NumeralSystems1Sorter';
import { BaseNum } from './NumeralSystems1Figures';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Bitsor helyi értékekkel; a valódi értékek helyén „?”. */
const BitsFig: React.FC<{ bits: string }> = ({ bits }) => {
  const n = bits.length;
  const cw = Math.min(28, 220 / n);
  const x0 = 120 - (n * cw) / 2;
  return (
    <svg viewBox="0 0 240 110" className={FIG_CLASS}>
      {bits.split('').map((b, i) => (
        <g key={i}>
          <text x={x0 + i * cw + cw / 2 - 1} y="22" fontSize="9" textAnchor="middle" fill="#64748b">{2 ** (n - 1 - i)}</text>
          <rect x={x0 + i * cw} y="30" width={cw - 3} height={cw - 3} rx="4" fill={b === '1' ? '#10b981' : '#e2e8f0'} stroke={b === '1' ? '#047857' : '#94a3b8'} />
          <text x={x0 + i * cw + (cw - 3) / 2} y={30 + (cw - 3) / 2 + 5} fontSize="13" textAnchor="middle" fontWeight="bold" fill={b === '1' ? '#ffffff' : '#64748b'}>{b}</text>
        </g>
      ))}
      <BaseNum x={110} y={92} value={bits} base="2" size={13} anchor="end" />
      <text x="118" y="92" fontSize="13" fill="#0f172a">= ?</text>
    </svg>
  );
};

/** Helyiérték-táblázat tetszőleges alapszámmal. */
const PlaceFig: React.FC<{ digits: string; base: number }> = ({ digits, base }) => {
  const n = digits.length;
  const cw = 44;
  const x0 = 120 - (n * cw) / 2 + 20;
  return (
    <svg viewBox="0 0 240 120" className={FIG_CLASS}>
      <text x={x0 - 6} y="34" fontSize="8.5" textAnchor="end" fill="#475569">helyi é.</text>
      <text x={x0 - 6} y="68" fontSize="8.5" textAnchor="end" fill="#475569">alaki é.</text>
      {digits.split('').map((d, i) => {
        const pw = n - 1 - i;
        return (
          <g key={i}>
            <rect x={x0 + i * cw} y="18" width={cw - 4} height="24" rx="4" fill="#d1fae5" stroke="#059669" />
            <text x={x0 + i * cw + (cw - 4) / 2} y="35" fontSize="11" textAnchor="middle" fill="#065f46">
              {pw === 0 ? '1' : base}
              {pw > 1 && <tspan fontSize="7.5" dy="-5">{pw}</tspan>}
            </text>
            <rect x={x0 + i * cw} y="50" width={cw - 4} height="28" rx="4" fill="#ffffff" stroke="#94a3b8" />
            <text x={x0 + i * cw + (cw - 4) / 2} y="70" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">{d}</text>
          </g>
        );
      })}
      <BaseNum x={110} y={104} value={digits} base={base} size={13} anchor="end" />
      <text x="118" y="104" fontSize="13" fill="#0f172a">= ?</text>
    </svg>
  );
};

/** Csomagolás: dobozok szintjei. */
const PackFig: React.FC<{ per: number; label: string }> = ({ per, label }) => (
  <svg viewBox="0 0 240 110" className={FIG_CLASS}>
    <rect x="15" y="20" width="60" height="50" rx="6" fill="#d1fae5" stroke="#047857" />
    <text x="45" y="42" fontSize="9" textAnchor="middle" fill="#065f46">karton</text>
    <text x="45" y="58" fontSize="9" textAnchor="middle" fill="#065f46">{per} doboz</text>
    <rect x="90" y="28" width="50" height="40" rx="6" fill="#dbeafe" stroke="#2563eb" />
    <text x="115" y="46" fontSize="9" textAnchor="middle" fill="#1e3a8a">díszdoboz</text>
    <text x="115" y="60" fontSize="9" textAnchor="middle" fill="#1e3a8a">{per} bonbon</text>
    {[0, 1, 2].map((k) => (
      <circle key={k} cx={162 + k * 12} cy="48" r="4" fill="#92400e" />
    ))}
    <text x="174" y="66" fontSize="9" textAnchor="middle" fill="#92400e">bonbon</text>
    <text x="120" y="96" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">{label}</text>
  </svg>
);

export const NUMERAL_SYSTEMS1_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'ns1-q1',
    level: 1,
    questionTypeBadge: 'Számjegyek',
    question: 'Hány és milyen számjegyet használunk a nyolcas számrendszerben?',
    options: ['8 számjegyet: 0, 1, …, 7', '9 számjegyet: 0, 1, …, 8', '7 számjegyet: 1, …, 7', '10 számjegyet: 0, 1, …, 9'],
    correctAnswer: 0,
    explanation: 'Minden számrendszerben annyi számjegy kell, amennyi az alapszám. A nyolcasban 0-tól 7-ig; a 8 már „egy csomag”: 8 = 10₈.'
  },
  {
    id: 'ns1-q2',
    level: 1,
    questionTypeBadge: 'Számjegyek',
    question: 'Melyek a kettes számrendszer számjegyei?',
    options: ['0 és 1', '1 és 2', '0, 1 és 2', 'Csak az 1'],
    correctAnswer: 0,
    explanation: 'A kettes számrendszerben két számjegy van: 0 és 1. A 2 = 10₂.'
  },
  {
    id: 'ns1-q3',
    level: 1,
    questionTypeBadge: 'Számjegyek',
    question: 'A tizenkettes számrendszerben további számjegyek híján betűket is használunk. Mit jelöl az A és a B?',
    options: ['A = 10, B = 11', 'A = 11, B = 12', 'A = 1, B = 2', 'A = 12, B = 13'],
    correctAnswer: 0,
    explanation: 'A 12-es számrendszer számjegyei: 0, 1, …, 9, A = 10, B = 11. A 12 már 10₁₂.'
  },
  {
    id: 'ns1-q4',
    level: 1,
    questionTypeBadge: 'Helyi érték',
    question: 'Mi a 3-as számjegy valódi értéke az 1347-ben (tízes számrendszer)?',
    options: ['300', '3', '100', '30'],
    correctAnswer: 0,
    explanation: '1347 = 1 · 10³ + 3 · 10² + 4 · 10 + 7. A 3 alaki értéke 3, helyi értéke 100, valódi értéke 3 · 100 = 300.'
  },
  {
    id: 'ns1-q5',
    level: 1,
    questionTypeBadge: 'Kettes számrendszer',
    question: 'Mennyi a 101₂ a tízes számrendszerben?',
    figure: <BitsFig bits="101" />,
    options: ['5', '101', '3', '6'],
    correctAnswer: 0,
    explanation: '101₂ = 1 · 4 + 0 · 2 + 1 · 1 = 5.'
  },
  {
    id: 'ns1-q6',
    level: 1,
    questionTypeBadge: 'Helyi érték',
    question: 'Bence a 12-es csomagolás szerint 943₁₂-t írt fel (9 karton, 4 díszdoboz, 3 bonbon). Melyik összeget jelenti ez?',
    figure: <PackFig per={12} label="943₁₂ bonbon = ?" />,
    options: ['9 · 12² + 4 · 12 + 3', '9 · 12³ + 4 · 12² + 3 · 12', '9 + 4 + 3 + 12', '9 · 100 + 4 · 10 + 3'],
    correctAnswer: 0,
    explanation: 'Egy karton 12 · 12 = 12² bonbon, egy díszdoboz 12 bonbon: 9 · 12² + 4 · 12 + 3 = 1296 + 48 + 3 = 1347.'
  },
  {
    id: 'ns1-q7',
    level: 1,
    questionTypeBadge: 'Kettes számrendszer',
    question: 'Mennyi az 1000₂ a tízes számrendszerben?',
    options: ['8', '1000', '16', '4'],
    correctAnswer: 0,
    explanation: 'A kettes számrendszer helyi értékei jobbról: 1, 2, 4, 8. 1000₂ = 1 · 2³ = 8.'
  },
  {
    id: 'ns1-q8',
    level: 1,
    questionTypeBadge: 'Kettes számrendszer',
    question: 'A legnagyobb „8 bites szám” az 11111111₂. Mennyi ez a tízes számrendszerben?',
    figure: <BitsFig bits="11111111" />,
    options: ['255', '256', '128', '511'],
    correctAnswer: 0,
    explanation: '128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255 = 2⁸ − 1. (256 = 100000000₂ már 9 bites.)'
  },
  {
    id: 'ns1-q9',
    level: 1,
    questionTypeBadge: 'Informatika',
    question: 'Melyik magyar származású matematikus nevéhez fűződik a kettes számrendszer számítógépes (technikai) alkalmazása?',
    options: ['Neumann János', 'Bolyai János', 'Erdős Pál', 'Eötvös Loránd'],
    correctAnswer: 0,
    explanation: 'Neumann János (1903–1957) alkotta meg a számítógépek alapjául szolgáló elveket, melyek egyike a kettes számrendszer használata.'
  },
  {
    id: 'ns1-q10',
    level: 1,
    questionTypeBadge: 'Számjegyek',
    question: 'Melyik jelölés HIBÁS (nem létező szám)?',
    options: ['1702₇', '1702₈', '1702₉', '1702₁₂'],
    correctAnswer: 0,
    explanation: 'A hetes számrendszer számjegyei 0–6, a 7 nem lehet számjegy benne. A 8-as, 9-es és 12-es számrendszerben a 7 megengedett.'
  },
  // ---------- 2. szint ----------
  {
    id: 'ns1-q11',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Írd át a 20123₄ számot tízes számrendszerbe!',
    figure: <PlaceFig digits="20123" base={4} />,
    options: ['539', '20123', '515', '155'],
    correctAnswer: 0,
    explanation: '20123₄ = 2 · 4⁴ + 0 · 4³ + 1 · 4² + 2 · 4 + 3 = 512 + 0 + 16 + 8 + 3 = 539.'
  },
  {
    id: 'ns1-q12',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Írd át az 1A7B₁₂ számot tízes számrendszerbe!',
    figure: <PlaceFig digits="1A7B" base={12} />,
    options: ['3263', '1711', '2183', '3264'],
    correctAnswer: 0,
    explanation: '1A7B₁₂ = 1 · 1728 + 10 · 144 + 7 · 12 + 11 = 1728 + 1440 + 84 + 11 = 3263.'
  },
  {
    id: 'ns1-q13',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: '8 bonbon kerül egy díszdobozba, 8 díszdoboz egy kartonba. A számláló: 725₈. Hány bonbonról van szó?',
    figure: <PackFig per={8} label="725₈ bonbon = ?" />,
    options: ['469', '725', '461', '3781'],
    correctAnswer: 0,
    explanation: '725₈ = 7 · 64 + 2 · 8 + 5 = 448 + 16 + 5 = 469.'
  },
  {
    id: 'ns1-q14',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Hogyan írható fel a 469 a tizenkettes számrendszerben?',
    options: ['331₁₂', '391₁₂', '3A1₁₂', '133₁₂'],
    correctAnswer: 0,
    explanation: '469 : 12 = 39, maradék 1; 39 : 12 = 3, maradék 3. Tehát 469 = 3 · 144 + 3 · 12 + 1 = 331₁₂.'
  },
  {
    id: 'ns1-q15',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Mennyi a 2113₄ a tízes számrendszerben?',
    options: ['151', '2113', '87', '157'],
    correctAnswer: 0,
    explanation: '2113₄ = 2 · 64 + 1 · 16 + 1 · 4 + 3 = 128 + 16 + 4 + 3 = 151.'
  },
  {
    id: 'ns1-q16',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Mennyi a 3114₅ a tízes számrendszerben?',
    options: ['409', '384', '3114', '411'],
    correctAnswer: 0,
    explanation: '3114₅ = 3 · 125 + 1 · 25 + 1 · 5 + 4 = 375 + 25 + 5 + 4 = 409.'
  },
  {
    id: 'ns1-q17',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik állítás igaz a 6142₇ és a 6142₈ számokra?',
    options: ['6142₈ = 3170 a nagyobb, 6142₇ = 2137', '6142₇ = 3170 a nagyobb, 6142₈ = 2137', 'Egyenlők, mert ugyanazok a számjegyek', '6142₈ = 3170, 6142₇ = 3170'],
    correctAnswer: 0,
    explanation: '6142₇ = 6 · 343 + 49 + 28 + 2 = 2137; 6142₈ = 6 · 512 + 64 + 32 + 2 = 3170. Nagyobb alapszámnál ugyanazok a jegyek nagyobb számot jelentenek.'
  },
  {
    id: 'ns1-q18',
    level: 2,
    questionTypeBadge: 'Kettes számrendszer',
    question: 'Mennyi az 10011010₂ a tízes számrendszerben?',
    figure: <BitsFig bits="10011010" />,
    options: ['154', '77', '308', '156'],
    correctAnswer: 0,
    explanation: 'A bekapcsolt bitek helyi értékei: 128 + 16 + 8 + 2 = 154.'
  },
  {
    id: 'ns1-q19',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'A csomagológép különböző bonbonokat különböző csoportosításban dobozol: 1000₆ + 100₈ + 101₂. Hány bonbon ez összesen?',
    options: ['285', '1201', '216', '293'],
    correctAnswer: 0,
    explanation: '1000₆ = 6³ = 216, 100₈ = 8² = 64, 101₂ = 5. Összesen 216 + 64 + 5 = 285.'
  },
  {
    id: 'ns1-q20',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Melyik szám NEM egyenlő 100-zal?',
    options: ['100₇', '144₈', '1100100₂', '84₁₂'],
    correctAnswer: 0,
    explanation: '100₇ = 7² = 49. A többi mind 100: 144₈ = 64 + 32 + 4, 1100100₂ = 64 + 32 + 4, 84₁₂ = 96 + 4.'
  },
  // ---------- 3. szint ----------
  {
    id: 'ns1-q21',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a helyes növekvő sorrend? 43₆; 43₇; 43₈; 34₆; 34₇; 34₈',
    options: [
      '34₆ < 34₇ < 43₆ < 34₈ < 43₇ < 43₈',
      '34₆ < 34₇ < 34₈ < 43₆ < 43₇ < 43₈',
      '34₆ < 43₆ < 34₇ < 34₈ < 43₇ < 43₈',
      '43₆ < 34₆ < 43₇ < 34₇ < 43₈ < 34₈'
    ],
    correctAnswer: 0,
    explanation: '34₆ = 22, 34₇ = 25, 43₆ = 27, 34₈ = 28, 43₇ = 31, 43₈ = 35. A 43₆ kisebb, mint a 34₈!'
  },
  {
    id: 'ns1-q22',
    level: 3,
    questionTypeBadge: 'Összeadás',
    question: 'Mennyi 1000₅ + 100₅ + 10₅ + 1₅ az ötös számrendszerben?',
    options: ['1111₅', '11110₅', '1234₅', '1000₅'],
    correctAnswer: 0,
    explanation: 'Helyi értékenként adunk össze, átvitel nincs: 1111₅ (= 125 + 25 + 5 + 1 = 156).'
  },
  {
    id: 'ns1-q23',
    level: 3,
    questionTypeBadge: 'Összeadás',
    question: 'Mennyi 20000₅ + 3000₅ + 20₅ + 3₅ az ötös számrendszerben?',
    options: ['23023₅', '23230₅', '23032₅', '20323₅'],
    correctAnswer: 0,
    explanation: 'A jegyek helyi érték szerint: 2 · 5⁴, 3 · 5³, 0 · 5², 2 · 5, 3 ⇒ 23023₅ (= 1638).'
  },
  {
    id: 'ns1-q24',
    level: 3,
    questionTypeBadge: 'Összeadás',
    question: 'Mennyi 555₆ + 1₆ a hatos számrendszerben?',
    options: ['1000₆', '556₆', '560₆', '600₆'],
    correctAnswer: 0,
    explanation: 'A hatos számrendszerben 5 + 1 = 10₆, így minden helyen átvitel keletkezik: 555₆ + 1₆ = 1000₆ (= 216). (A 6-os számjegy nem is létezik a hatosban.)'
  },
  {
    id: 'ns1-q25',
    level: 3,
    questionTypeBadge: 'Alapszám keresése',
    question: 'Bonifác: „Összesen 1000 diák volt a táborban, közülük 143 lány és 302 fiú.” Melyik számrendszerben beszélt?',
    options: ['Ötös számrendszerben', 'Hatos számrendszerben', 'Négyes számrendszerben', 'Nyolcas számrendszerben'],
    correctAnswer: 0,
    explanation: 'n³ = (n² + 4n + 3) + (3n² + 2), azaz n³ − 4n² − 4n − 5 = 0, és n = 5 megoldás: 125 = 48 + 77. A négyes nem lehet, mert van 4-es számjegy.'
  },
  {
    id: 'ns1-q26',
    level: 3,
    questionTypeBadge: 'Kettes számrendszer',
    question: 'A 6700 = 4096 + 2048 + 512 + 32 + 8 + 4. Hány jegyű a 6700 a kettes számrendszerben?',
    options: ['13', '12', '14', '6'],
    correctAnswer: 0,
    explanation: 'A legnagyobb tag 4096 = 2¹², így a legmagasabb helyi érték a 13. jegy: 6700 = 1101000101100₂ (13 jegy).'
  },
  {
    id: 'ns1-q27',
    level: 3,
    questionTypeBadge: 'Hexadecimális',
    question: '6700 = 1 · 4096 + 10 · 256 + 2 · 16 + 12 · 1. Hogyan írjuk fel a 16-os számrendszerben?',
    options: ['1A2C₁₆', '1A2B₁₆', '1C2A₁₆', '1A1C₁₆'],
    correctAnswer: 0,
    explanation: 'A = 10, C = 12, és a jegyek sorrendje a helyi értékek szerint 16³, 16², 16, 1: 1A2C₁₆. (1A2B₁₆ = 6699, 1C2A₁₆ = 7210, 1A1C₁₆ = 6684.)'
  },
  {
    id: 'ns1-q28',
    level: 3,
    questionTypeBadge: 'Alapszám keresése',
    question: 'A 362-t egy másik számrendszerben felírva az utolsó számjegy 2. Melyik lehet ez a számrendszer?',
    options: ['A 9-es', 'A 7-es', 'A 11-es', 'A 13-as'],
    correctAnswer: 0,
    explanation: 'Az utolsó jegy az n-nel való osztás maradéka, így n | 362 − 2 = 360. 360 = 9 · 40, de 362-nek 7-tel osztva 5, 11-gyel 10, 13-mal 11 a maradéka.'
  },
  {
    id: 'ns1-q29',
    level: 3,
    questionTypeBadge: 'Alapszám keresése',
    question: 'A 362-t egy másik számrendszerben felírva az első számjegy 2. Melyik lehet ez a számrendszer?',
    options: ['A 12-es (262₁₂)', 'A 7-es', 'A 9-es', 'A 16-os'],
    correctAnswer: 0,
    explanation: '362 = 2 · 144 + 6 · 12 + 2 = 262₁₂. A többi: 362 = 1025₇ = 442₉ = 16A₁₆, ezek első jegye 1, 4, 1.'
  },
  {
    id: 'ns1-q30',
    level: 3,
    questionTypeBadge: 'Kombinatorika',
    question: 'Hány olyan pozitív egész szám van, amelynek a hatos számrendszerbeli alakjában minden számjegy különböző?',
    options: ['1630', '720', '1950', '600'],
    correctAnswer: 0,
    explanation: 'k jegyű ilyen szám: az első jegy 5-féle (nem 0), a többi a maradék 5 jegyből sorban: 1 jegyű 5, 2 jegyű 5 · 5 = 25, 3 jegyű 100, 4 jegyű 300, 5 jegyű 600, 6 jegyű 600. Összesen 1630.'
  }
];

export const NumeralSystems1Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId="g11-num-szamrendszer-elso-quiz"
      subtopicId="szamrendszerek-1"
      title="7. Számrendszerek I. – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: számjegyek, helyi érték, átírás tízes számrendszerbe, kettes és tizenhatos számrendszer."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      questions={NUMERAL_SYSTEMS1_QUESTIONS}
      cheatSheets={[
        {
          title: 'Helyiérték-táblázat',
          items: [
            'n-es számrendszer: n számjegy (0, 1, …, n − 1)',
            'Helyi értékek jobbról: 1, n, n², n³, …',
            'valódi érték = alaki érték · helyi érték',
            '20123₄ = 2 · 256 + 0 + 16 + 8 + 3 = 539'
          ]
        },
        {
          title: 'Kettes és tizenhatos számrendszer',
          items: [
            'Bitek: 128, 64, 32, 16, 8, 4, 2, 1',
            '10011010₂ = 154; 11111111₂ = 255',
            'A = 10, B = 11, C = 12, D = 13, E = 14, F = 15',
            '6700 = 1101000101100₂ = 1A2C₁₆'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            '943₁₂ = 1347; 725₈ = 469 = 331₁₂',
            '1A7B₁₂ = 3263',
            '2113₄ = 151; 3114₅ = 409; 6142₇ = 2137; 6142₈ = 3170',
            'Bonifác: ötös számrendszer (125 = 48 + 77)'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NumeralSystems1Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NumeralSystems1Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default NumeralSystems1Quiz;
