import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NumeralSystems2Matcher } from './NumeralSystems2Matcher';
import { NumeralSystems2Sorter } from './NumeralSystems2Sorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Helyiérték-táblázat: fejléc + számjegyek ("?" jelöli az ismeretlent). */
const PlaceFig: React.FC<{ heads: string[]; digits: string[]; note?: string }> = ({ heads, digits, note }) => {
  const w = 220 / heads.length;
  return (
    <svg viewBox="0 0 240 130" className={FIG_CLASS}>
      {heads.map((h, i) => (
        <g key={i}>
          <rect x={10 + i * w} y="14" width={w - 4} height="30" rx="6" fill="#d1fae5" stroke="#047857" />
          <text x={10 + i * w + (w - 4) / 2} y="34" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">{h}</text>
          <rect x={10 + i * w} y="50" width={w - 4} height="36" rx="6" fill="#ffffff" stroke="#94a3b8" />
          <text x={10 + i * w + (w - 4) / 2} y="74" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#0f172a">{digits[i]}</text>
        </g>
      ))}
      {note && <text x="120" y="112" fontSize="11.5" textAnchor="middle" fill="#334155">{note}</text>}
    </svg>
  );
};

/** Bitek csoportosítása: a csoportok alatt "?". */
const GroupFig: React.FC<{ groups: string[]; label: string }> = ({ groups, label }) => {
  const w = 220 / groups.length;
  return (
    <svg viewBox="0 0 240 130" className={FIG_CLASS}>
      {groups.map((g, i) => (
        <g key={i}>
          <rect x={10 + i * w} y="20" width={w - 6} height="30" rx="6" fill={i % 2 ? '#e0f2fe' : '#d1fae5'} stroke="#64748b" />
          <text x={10 + i * w + (w - 6) / 2} y="40" fontSize="13" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="#0f172a">{g}</text>
          <line x1={10 + i * w + (w - 6) / 2} y1="52" x2={10 + i * w + (w - 6) / 2} y2="70" stroke="#94a3b8" strokeDasharray="3 3" />
          <circle cx={10 + i * w + (w - 6) / 2} cy="84" r="12" fill="#047857" />
          <text x={10 + i * w + (w - 6) / 2} y="89" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#ffffff">?</text>
        </g>
      ))}
      <text x="120" y="120" fontSize="11.5" textAnchor="middle" fill="#334155">{label}</text>
    </svg>
  );
};

/** Írásbeli összeadás kettesben, az eredmény helyén "?". */
const AdditionFig: React.FC = () => (
  <svg viewBox="0 0 240 130" className={FIG_CLASS}>
    {' 1101100'.split('').map((d, i) => (
      <text key={`a${i}`} x={50 + i * 20} y="34" fontSize="16" textAnchor="middle" fontFamily="monospace" fill="#0f172a">{d.trim()}</text>
    ))}
    <text x="30" y="60" fontSize="16" textAnchor="middle" fill="#0f172a">+</text>
    {'  101010'.split('').map((d, i) => (
      <text key={`b${i}`} x={50 + i * 20} y="60" fontSize="16" textAnchor="middle" fontFamily="monospace" fill="#0f172a">{d.trim()}</text>
    ))}
    <line x1="24" y1="70" x2="206" y2="70" stroke="#0f172a" strokeWidth="2" />
    <text x="120" y="96" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#047857">? (kettes számrendszerben)</text>
  </svg>
);

/** Peti kártyái: kiemelt, megnevezett kártyák. */
const CardsFig: React.FC<{ chosen: string[] }> = ({ chosen }) => (
  <svg viewBox="0 0 240 130" className={FIG_CLASS}>
    {[
      { l: 'A', first: '1 3 5 7' },
      { l: 'B', first: '2 3 6 7' },
      { l: 'C', first: '4 5 6 7' },
      { l: 'D', first: '16 17 18' },
      { l: 'E', first: '8 9 10 11' }
    ].map((c, i) => (
      <g key={c.l}>
        <rect x={8 + i * 46} y="16" width="40" height="70" rx="6" fill={chosen.includes(c.l) ? '#d1fae5' : '#f8fafc'} stroke={chosen.includes(c.l) ? '#047857' : '#cbd5e1'} strokeWidth="2" />
        <text x={28 + i * 46} y="36" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">{c.l}</text>
        <text x={28 + i * 46} y="58" fontSize="7.5" textAnchor="middle" fill="#475569">{c.first}</text>
        <text x={28 + i * 46} y="72" fontSize="7.5" textAnchor="middle" fill="#475569">…</text>
      </g>
    ))}
    <text x="120" y="112" fontSize="11.5" textAnchor="middle" fill="#334155">Pista: „{chosen.join(', ')} kártyán van” – gondolt szám: ?</text>
  </svg>
);

const NUMERAL_SYSTEMS_2_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: alapok (1–10)
  {
    id: 'ns2-q1',
    level: 1,
    questionTypeBadge: 'Átváltás',
    question: 'Írjuk fel a 315-öt 6-os számrendszerben! (315 = 52 · 6 + 3; 52 = 8 · 6 + 4; 8 = 1 · 6 + 2)',
    figure: <PlaceFig heads={['216', '36', '6', '1']} digits={['?', '?', '?', '?']} note="315 tojás: raklap, doboz, tojástartó, tojás" />,
    options: ['1243₆', '3421₆', '1234₆', '2143₆'],
    correctAnswer: 0,
    explanation: 'A maradékok 3, 4, 2, majd az utolsó hányados 1. Alulról felfelé olvasva 1243₆. Ellenőrzés: 216 + 2 · 36 + 4 · 6 + 3 = 315.'
  },
  {
    id: 'ns2-q2',
    level: 1,
    questionTypeBadge: 'Helyi érték',
    question: 'Mennyi a 10₁₆ (tizenhatos számrendszerben felírt „egy-nulla”) értéke tízes számrendszerben?',
    options: ['16', '10', '2', '160'],
    correctAnswer: 0,
    explanation: '10₁₆ = 1 · 16 + 0 = 16. Minden számrendszerben a „10” maga az alapszám.'
  },
  {
    id: 'ns2-q3',
    level: 1,
    questionTypeBadge: 'Számjegyek',
    question: 'A tizenhatos számrendszerben melyik számot jelöli az F számjegy?',
    options: ['15-öt', '16-ot', '14-et', '6-ot'],
    correctAnswer: 0,
    explanation: 'A 16-os rendszer jegyei: 0–9, A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. A 16 már kétjegyű: 10₁₆.'
  },
  {
    id: 'ns2-q4',
    level: 1,
    questionTypeBadge: 'Számjegyek',
    question: 'Hány különböző számjegyre van szükség a 12-es számrendszerben?',
    options: ['12-re: 0–9, A és B', '11-re: 1–9, A és B', '13-ra: 0–9, A, B és C', '10-re: 0–9'],
    correctAnswer: 0,
    explanation: 'b alapú számrendszerben b darab számjegy kell (0-tól b − 1-ig). A 12-esben a 10-et A, a 11-et B jelöli.'
  },
  {
    id: 'ns2-q5',
    level: 1,
    questionTypeBadge: 'Csoportosítás',
    question: 'Hogyan csoportosítjuk egy kettes számrendszerbeli szám jegyeit, ha 8-as számrendszerbe szeretnénk átírni?',
    options: ['Hármasával, jobbról kezdve', 'Hármasával, balról kezdve', 'Kettesével, jobbról kezdve', 'Négyesével, jobbról kezdve'],
    correctAnswer: 0,
    explanation: '8 = 2³, ezért egy nyolcas jegy pontosan 3 bitnek felel meg. Az egyesek helyétől, vagyis jobbról kezdünk; a bal szélső csoport lehet hiányos.'
  },
  {
    id: 'ns2-q6',
    level: 1,
    questionTypeBadge: 'Csoportosítás',
    question: 'Írd át az 1011₂ számot négyes számrendszerbe!',
    figure: <GroupFig groups={['10', '11']} label="1011₂ kettes csoportokban → négyes jegyek" />,
    options: ['23₄', '32₄', '113₄', '11₄'],
    correctAnswer: 0,
    explanation: '10 | 11 → 10₂ = 2 és 11₂ = 3, tehát 1011₂ = 23₄. Ellenőrzés: 11 = 2 · 4 + 3.'
  },
  {
    id: 'ns2-q7',
    level: 1,
    questionTypeBadge: 'Összeadás',
    question: 'Mennyi 1₂ + 1₂ kettes számrendszerben?',
    options: ['10₂', '2₂', '11₂', '0₂'],
    correctAnswer: 0,
    explanation: '1 + 1 = 2, ami kettes számrendszerben 10₂: az adott helyi értéken 0-t írunk, és 1-et átviszünk. A „2” jegy nem is létezik a kettes rendszerben.'
  },
  {
    id: 'ns2-q8',
    level: 1,
    questionTypeBadge: '16-os rendszer',
    question: 'Melyik a legnagyobb kétjegyű szám a tizenhatos számrendszerben, tízes számrendszerben felírva?',
    options: ['255 (FF₁₆)', '256 (100₁₆)', '99 (99₁₆)', '240 (F0₁₆)'],
    correctAnswer: 0,
    explanation: 'FF₁₆ = 15 · 16 + 15 = 255 = 256 − 1. A 100₁₆ = 256 már háromjegyű.'
  },
  {
    id: 'ns2-q9',
    level: 1,
    questionTypeBadge: 'Párosság',
    question: 'Melyik szám páros az alábbiak közül?',
    options: ['10110₂', '1011₂', '4531₆', '111₂'],
    correctAnswer: 0,
    explanation: 'Páros alapszámnál az utolsó jegy dönt: 10110₂ 0-ra végződik, tehát páros (= 22). Az 1011₂ = 11, a 111₂ = 7 és a 4531₆ = 1063 páratlan.'
  },
  {
    id: 'ns2-q10',
    level: 1,
    questionTypeBadge: 'Csoportosítás',
    question: 'Melyik négy bit felel meg az A₁₆ számjegynek?',
    options: ['1010', '1011', '0101', '1100'],
    correctAnswer: 0,
    explanation: 'A = 10 = 8 + 2 = 1010₂. (1011₂ = 11 = B, 1100₂ = 12 = C, 0101₂ = 5.)'
  },

  // LEVEL 2: átváltások (11–20)
  {
    id: 'ns2-q11',
    level: 2,
    questionTypeBadge: 'Kettesből tízesbe',
    question: 'Írd fel az 1011101111₂ számot 10-es számrendszerben!',
    options: ['751', '763', '687', '1006'],
    correctAnswer: 0,
    explanation: 'A helyi értékek: 512 + 0 + 128 + 64 + 32 + 0 + 8 + 4 + 2 + 1 = 751.'
  },
  {
    id: 'ns2-q12',
    level: 2,
    questionTypeBadge: 'Tízesből kettesbe',
    question: 'Írd fel a 491-et kettes számrendszerben!',
    options: ['111101011₂', '110101111₂', '111011011₂', '111101101₂'],
    correctAnswer: 0,
    explanation: '491 = 256 + 128 + 64 + 32 + 8 + 2 + 1, így 111101011₂. (A 110101111₂ a maradékok fordított sorrendje = 431.)'
  },
  {
    id: 'ns2-q13',
    level: 2,
    questionTypeBadge: 'Átváltás',
    question: 'Írd át az 542-t nyolcas számrendszerbe!',
    options: ['1036₈', '1403₈', '2302₈', '6301₈'],
    correctAnswer: 0,
    explanation: '542 = 67 · 8 + 6; 67 = 8 · 8 + 3; 8 = 1 · 8 + 0; 1 = 0 · 8 + 1. Alulról felfelé: 1036₈. (1403 a 7-es, 2302 a 6-os alak.)'
  },
  {
    id: 'ns2-q14',
    level: 2,
    questionTypeBadge: '12-es rendszer',
    question: 'Írd át az ABA₁₂ számot tízes számrendszerbe! (A = 10, B = 11)',
    figure: <PlaceFig heads={['144', '12', '1']} digits={['A', 'B', 'A']} note="ABA₁₂ = ?" />,
    options: ['1582', '1715', '1570', '1442'],
    correctAnswer: 0,
    explanation: 'ABA₁₂ = 10 · 144 + 11 · 12 + 10 = 1440 + 132 + 10 = 1582. (1715 a BAB₁₂ értéke.)'
  },
  {
    id: 'ns2-q15',
    level: 2,
    questionTypeBadge: '12-es rendszer',
    question: 'Írd át a 420-at tizenkettes számrendszerbe!',
    options: ['2B0₁₂', '2A0₁₂', '360₁₂', '1B0₁₂'],
    correctAnswer: 0,
    explanation: '420 = 35 · 12 + 0; 35 = 2 · 12 + 11; 2 = 0 · 12 + 2. Alulról: 2, B, 0 → 2B0₁₂. Ellenőrzés: 2 · 144 + 11 · 12 = 420.'
  },
  {
    id: 'ns2-q16',
    level: 2,
    questionTypeBadge: 'Kártyatrükk',
    question: 'Peti kártyatrükkjében Pista azt mondja, hogy a gondolt szám az A, a C és az E kártyán van (A: 1-es, C: 4-es, E: 8-as helyi érték). Melyik számra gondolt?',
    figure: <CardsFig chosen={['A', 'C', 'E']} />,
    options: ['13', '14', '11', '21'],
    correctAnswer: 0,
    explanation: 'Minden kártya egy kettes helyi érték: a megnevezett kártyák első számait adjuk össze: 1 + 4 + 8 = 13 = 1101₂.'
  },
  {
    id: 'ns2-q17',
    level: 2,
    questionTypeBadge: 'Csoportosítás',
    question: 'Írd át a 110000111₂ számot négyes számrendszerbe!',
    figure: <GroupFig groups={['1', '10', '00', '01', '11']} label="110000111₂ jobbról kettes csoportokban" />,
    options: ['12013₄', '30031₄', '13021₄', '21013₄'],
    correctAnswer: 0,
    explanation: 'Jobbról kettesével: 1 | 10 | 00 | 01 | 11 → 1, 2, 0, 1, 3, azaz 12013₄. (A 30031₄ a balról kezdett, hibás csoportosítás eredménye.)'
  },
  {
    id: 'ns2-q18',
    level: 2,
    questionTypeBadge: 'Csoportosítás',
    question: 'Írd át a 3012₄ számot kettes számrendszerbe!',
    options: ['11000110₂', '11010010₂', '1100110₂', '11000011₂'],
    correctAnswer: 0,
    explanation: 'Minden négyes jegy két bit: 3 → 11, 0 → 00, 1 → 01, 2 → 10. Tehát 11000110₂ (= 198).'
  },
  {
    id: 'ns2-q19',
    level: 2,
    questionTypeBadge: '16-os rendszer',
    question: 'Írd át a 7AD₁₆ számot kettes számrendszerbe!',
    options: ['11110101101₂', '11110110101₂', '1111010111₂', '11101011101₂'],
    correctAnswer: 0,
    explanation: '7 → 0111, A = 10 → 1010, D = 13 → 1101. Egymás mellé írva, a kezdő 0-t elhagyva: 11110101101₂.'
  },
  {
    id: 'ns2-q20',
    level: 2,
    questionTypeBadge: 'Négyes rendszer',
    question: 'Egy négyes számrendszerben felírt négyjegyű szám első jegye 3, második jegye 1. Melyik lehet ennek tízes számrendszerbeli alakja?',
    figure: <PlaceFig heads={['64', '16', '4', '1']} digits={['3', '1', '?', '?']} note="31 _ _₄ = ?" />,
    options: ['215', '207', '224', '192'],
    correctAnswer: 0,
    explanation: 'A szám 3 · 64 + 1 · 16 = 208 és 3133₄ = 223 közé esik. 215 = 3113₄ jó; 207 = 3033₄, 224 = 3200₄, 192 = 3000₄ nem.'
  },

  // LEVEL 3: nehezebb feladatok (21–30)
  {
    id: 'ns2-q21',
    level: 3,
    questionTypeBadge: '16-os rendszer',
    question: 'Írd fel az 1110111100010101₂ számot 16-os számrendszerben!',
    figure: <GroupFig groups={['1110', '1111', '0001', '0101']} label="négyes csoportok → 16-os jegyek" />,
    options: ['EF15₁₆', 'FE51₁₆', '1EF5₁₆', '51FE₁₆'],
    correctAnswer: 0,
    explanation: '1110 = 14 = E, 1111 = 15 = F, 0001 = 1, 0101 = 5, tehát EF15₁₆.'
  },
  {
    id: 'ns2-q22',
    level: 3,
    questionTypeBadge: '8-as rendszer',
    question: 'Írd fel az 1110111100010101₂ számot 8-as számrendszerben!',
    options: ['167425₈', '167452₈', '357021₈', '735214₈'],
    correctAnswer: 0,
    explanation: 'Jobbról hármasával: 1 | 110 | 111 | 100 | 010 | 101 → 1, 6, 7, 4, 2, 5. Tehát 167425₈.'
  },
  {
    id: 'ns2-q23',
    level: 3,
    questionTypeBadge: 'Összeadás',
    question: 'Végezd el kettes számrendszerben: 1101100₂ + 101010₂ = ?',
    figure: <AdditionFig />,
    options: ['10010110₂', '10001110₂', '1111110₂', '10010010₂'],
    correctAnswer: 0,
    explanation: 'Írásban, átvitelekkel: 10010110₂. Tízesben: 108 + 42 = 150 = 128 + 16 + 4 + 2. (1111110₂ = 126 az átvitelek elhagyásával jönne ki.)'
  },
  {
    id: 'ns2-q24',
    level: 3,
    questionTypeBadge: 'Szorzás',
    question: 'Az ötös számrendszerben elvégzett 4#20₅ · 30₅ = 224#00₅ szorzásban a # ugyanazt az ismeretlen számjegyet jelöli. Melyik ez?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 0,
    explanation: '4120₅ · 30₅ = 535 · 15 = 8025 = 224100₅, mindkét # helyén 1 áll. (# = 2 esetén 232100₅, # = 3 esetén 240100₅, # = 4 esetén 243100₅ lenne a szorzat.)'
  },
  {
    id: 'ns2-q25',
    level: 3,
    questionTypeBadge: 'Ismeretlen alap',
    question: 'Milyen alapú számrendszerben igaz, hogy 12ₓ + 112ₓ + 1112ₓ = 1241ₓ?',
    options: ['5', '4', '6', '7'],
    correctAnswer: 0,
    explanation: 'A 4-es jegy miatt x ≥ 5. Összegezve: x³ + 2x² + 3x + 6 = x³ + 2x² + 4x + 1 ⇒ x = 5. (x = 6 és 7 esetén a két oldal különbözik.)'
  },
  {
    id: 'ns2-q26',
    level: 3,
    questionTypeBadge: 'Ismeretlen alap',
    question: '„A 145 kiskutya” – a rajzfilmben 101 kiskutya szerepel. Melyik számrendszerben írták fel a címet?',
    options: ['8-as', '9-es', '7-es', '6-os'],
    correctAnswer: 0,
    explanation: 'b² + 4b + 5 = 101 ⇒ b² + 4b − 96 = 0 ⇒ b = 8 (a negatív gyök nem jó). Ellenőrzés: 64 + 32 + 5 = 101.'
  },
  {
    id: 'ns2-q27',
    level: 3,
    questionTypeBadge: '16-os rendszer',
    question: 'Hány háromjegyű szám van a tizenhatos számrendszerben?',
    options: ['3840', '4096', '4095', '3600'],
    correctAnswer: 0,
    explanation: 'Az első jegy 15-féle (nem lehet 0), a másik kettő 16-16-féle: 15 · 16 · 16 = 3840. (Másképp: 4095 − 255 = 3840.)'
  },
  {
    id: 'ns2-q28',
    level: 3,
    questionTypeBadge: 'Párosság',
    question: 'Melyik szám páratlan az alábbiak közül?',
    options: ['4324₅', '20121₃', '10110₂', '2134₅'],
    correctAnswer: 0,
    explanation: 'Páratlan alapnál a jegyek összegének párossága dönt: 4 + 3 + 2 + 4 = 13 páratlan, így 4324₅ (= 589) páratlan. 20121₃ (összeg 6) és 2134₅ (összeg 10) páros, 10110₂ 0-ra végződik.'
  },
  {
    id: 'ns2-q29',
    level: 3,
    questionTypeBadge: 'Maradékok',
    question: 'Melyik az a legkisebb, 5-nél nagyobb egész szám, amely 7-es, 8-as és 9-es számrendszerben felírva is 5-re végződik?',
    options: ['509', '504', '1013', '257'],
    correctAnswer: 0,
    explanation: 'Az utolsó jegy az alapszámmal vett osztási maradék, így n − 5 osztható 7-tel, 8-cal és 9-cel, azaz [7; 8; 9] = 504-gyel. A legkisebb: 504 + 5 = 509 (a következő 1013).'
  },
  {
    id: 'ns2-q30',
    level: 3,
    questionTypeBadge: 'Ismeretlen alap',
    question: 'Legyen m a legkisebb pozitív egész, amely n alapú számrendszerben kétjegyű, p pedig a legnagyobb, amely q alapú számrendszerben még háromjegyű. Mennyi n · q, ha m · p = 130?',
    options: ['15', '10', '26', '65'],
    correctAnswer: 0,
    explanation: 'm = 10ₙ = n, p = q³ − 1. n · (q³ − 1) = 130 = 2 · 5 · 13; q³ − 1 lehetséges értékei 7, 26, 63, 124… közül csak a 26 osztója a 130-nak ⇒ q = 3, n = 5, n · q = 15.'
  }
];

export const NumeralSystems2Quiz: React.FC<{
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
      topicId="g11-num-szamrendszer-masodik-quiz"
      subtopicId="szamrendszerek-2"
      title="8. Számrendszerek II. – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: ismételt osztás, 12-es és 16-os rendszer, bitek csoportosítása, összeadás kettesben és ismeretlen alapszám."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • KVÍZ"
      questions={NUMERAL_SYSTEMS_2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Átváltás ismételt osztással',
          items: [
            'Osszuk el a számot az alapszámmal, majd a hányadost újra…',
            '…amíg a hányados 0 nem lesz.',
            'A maradékokat alulról felfelé olvassuk.',
            '315 = 1243₆; 491 = 111101011₂; 420 = 2B0₁₂'
          ]
        },
        {
          title: 'Csoportosítás (jobbról!)',
          items: [
            '2 → 4: kettes csoportok (4 = 2²)',
            '2 → 8: hármas csoportok (8 = 2³)',
            '2 → 16: négyes csoportok (16 = 2⁴)',
            '1110111100010101₂ = 167425₈ = EF15₁₆'
          ]
        },
        {
          title: 'Hasznos tények',
          items: [
            '16-os jegyek: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15',
            'Kettesben: 1 + 1 = 10₂ (átvitel)',
            'Páros alap: az utolsó jegy dönt a párosságról',
            'Páratlan alap: a jegyek összege dönt a párosságról'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NumeralSystems2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NumeralSystems2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default NumeralSystems2Quiz;
