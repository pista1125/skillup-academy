import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SetSortingMatcher } from './SetSortingMatcher';
import { SetSortingSorter } from './SetSortingSorter';
import { Venn2, OtterBoatSvg, NestedSetsSvg, Venn3Frame, LogicBlock, BlockColor, BlockShape } from './SetSortingFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QCLS = 'w-full max-w-[300px] h-auto mx-auto';

const FIG_OTTER = <OtterBoatSvg className={QCLS} />;

const animalFig = (q: string) => (
  <Venn2 className={QCLS} frame="ÁLLATOK" labelA="Madár" labelB="Háziállat" onlyA={['🦩 flamingó']} onlyB={['🐕 kutya']} pending={q} fontSize={11} />
);

const mf5Fig = (q: string) => (
  <Venn2 className={QCLS} frame="Négyjegyű számok" labelA="Az 50 többszörösei" labelB="A 20 többszörösei" pending={q} fontSize={12} />
);

const numFig = (q: string) => <Venn2 className={QCLS} frame="Számok" labelA="Páros számok" labelB="Négyjegyű számok" colorB="#2563eb" pending={q} fontSize={12} />;

const boxFig = (title: string, nums: string[], color = '#16a34a') => (
  <svg viewBox="0 0 240 130" className="w-full max-w-[260px] h-auto mx-auto" fontFamily="system-ui, sans-serif">
    <ellipse cx="120" cy="70" rx="112" ry="54" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2.2" />
    <rect x="62" y="6" width="116" height="22" rx="6" fill="#ffffff" stroke={color} strokeWidth="1.6" />
    <text x="120" y="21" fontSize="11" fontWeight="bold" textAnchor="middle" fill={color}>
      {title}
    </text>
    {nums.map((n, i) => (
      <text key={n} x={52 + (i % 4) * 46} y={i < 4 ? 62 : 92} fontSize="12.5" fontWeight="bold" textAnchor="middle" fill="#1e293b">
        {n}
      </text>
    ))}
  </svg>
);

const FIG_ODD_A = boxFig('Melyik nem illik?', ['4920', '3517', '8864', '2792', '9756', '1550', '6328'], '#dc2626');
const FIG_MF6_5 = boxFig('5 többszörösei', ['210', '525', '303', '850', '1000', '8005', '125'], '#16a34a');
const FIG_MF6_2 = boxFig('2 többszörösei', ['6300', '720', '410', '215', '10 000', '540', '900'], '#dc2626');

const FIG_MF5_COUNT = (
  <svg viewBox="0 0 360 60" className="w-full max-w-[320px] h-auto mx-auto" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="356" height="56" rx="10" fill="#fff1f2" stroke="#fda4af" />
    {['2350', '4580', '5600', '7200', '8060', '9500', '4200', '8150', '1040', '1530'].map((n, i) => (
      <text key={n} x={34 + (i % 5) * 72} y={i < 5 ? 24 : 46} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#9f1239">
        {n}
      </text>
    ))}
  </svg>
);

const FIG_NESTED = <NestedSetsSvg className={QCLS} />;

const FIG_NESTED_Q = (
  <svg viewBox="0 0 360 220" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="352" height="212" rx="12" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />
    <rect x="4" y="4" width="76" height="22" rx="8" fill="#15803d" />
    <text x="14" y="19" fontSize="11" fontWeight="bold" fill="#fff">
      Növény
    </text>
    <ellipse cx="200" cy="122" rx="146" ry="86" fill="#bbf7d0" fillOpacity="0.6" stroke="#16a34a" strokeWidth="2.2" />
    <text x="200" y="54" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#166534">
      Gyümölcs
    </text>
    <ellipse cx="228" cy="140" rx="92" ry="48" fill="#fecaca" fillOpacity="0.7" stroke="#dc2626" strokeWidth="2.2" />
    <text x="228" y="140" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#991b1b">
      Szörp készülhet belőle
    </text>
    <text x="30" y="200" fontSize="13" fontWeight="bold" fill="#dc2626">
      ?
    </text>
  </svg>
);

const shapesFig = (
  <svg viewBox="0 0 360 200" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="352" height="192" rx="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
    <rect x="4" y="4" width="80" height="22" rx="8" fill="#3b82f6" />
    <text x="14" y="19" fontSize="11" fontWeight="bold" fill="#fff">
      Síkidomok
    </text>
    <path d="M 20 40 L 160 40 L 90 180 Z" fill="#fee2e2" stroke="#b91c1c" strokeWidth="2" />
    <text x="90" y="58" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#991b1b">
      Görbe vonal határolja
    </text>
    <rect x="180" y="36" width="168" height="152" rx="18" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
    <text x="264" y="54" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#9a3412">
      Sokszögek
    </text>
    <ellipse cx="264" cy="136" rx="72" ry="38" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
    <text x="264" y="114" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#166534">
      Négyszögek
    </text>
  </svg>
);

const curvedStraightFig = (
  <svg viewBox="0 0 360 200" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="352" height="192" rx="12" fill="#f8fafc" stroke="#94a3b8" />
    <rect x="16" y="30" width="196" height="150" rx="18" fill="#bbf7d0" fillOpacity="0.7" stroke="#16a34a" strokeWidth="2" />
    <rect x="130" y="44" width="216" height="146" rx="18" fill="#7dd3fc" fillOpacity="0.45" stroke="#0284c7" strokeWidth="2" />
    <text x="24" y="24" fontSize="10.5" fontWeight="bold" fill="#166534">
      C: görbe vonal is határolja
    </text>
    <text x="338" y="184" fontSize="10.5" fontWeight="bold" textAnchor="end" fill="#075985">
      D: egyenes vonal is határolja
    </text>
    <circle cx="60" cy="90" r="20" fill="#fff" stroke="#334155" strokeWidth="1.6" />
    <path d="M 70 132 A 20 20 0 1 0 70 168 A 15 15 0 1 1 70 132 Z" fill="#fff" stroke="#334155" strokeWidth="1.6" />
    <polygon points="280,70 300,95 280,120 260,95" fill="#fff" stroke="#334155" strokeWidth="1.6" />
    <polygon points="250,150 330,150 315,175 265,175" fill="#fff" stroke="#334155" strokeWidth="1.6" transform="translate(0,-10)" />
    <text x="172" y="120" fontSize="22" fontWeight="bold" textAnchor="middle" fill="#dc2626">
      ?
    </text>
  </svg>
);

const logicFig = (color: BlockColor, shape: BlockShape, holed: boolean) => (
  <svg viewBox="0 0 360 240" className={QCLS}>
    <Venn3Frame />
    <rect x="290" y="14" width="62" height="62" rx="10" fill="#ffffff" stroke="#94a3b8" />
    <LogicBlock x={321} y={45} shape={shape} color={color} holed={holed} s={34} />
  </svg>
);

const ops9Fig = (
  <svg viewBox="0 0 300 110" className="w-full max-w-[300px] h-auto mx-auto" fontFamily="system-ui, sans-serif">
    {[
      ['1500', '#dc2626'],
      ['2800', '#2563eb'],
      ['7200', '#16a34a']
    ].map(([t, c], i) => (
      <g key={t}>
        <rect x={10 + i * 98} y="10" width="86" height="90" rx="8" fill="#fff" stroke={c} strokeWidth="2" />
        <rect x={30 + i * 98} y="10" width="66" height="22" fill="#fff" stroke={c} strokeWidth="1.5" />
        <text x={63 + i * 98} y="26" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1e293b">
          {t}
        </text>
      </g>
    ))}
  </svg>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const SET_SORTING_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'ss-q1',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: FIG_OTTER,
    question: 'Kik csónakáztak, de nem nézték a vidraetetést?',
    options: ['András, Zsuzsi és Józsi', 'Éva, Zsolti és Sári', 'Dóri, Tamás és Lajos', 'Mind a 11 csónakázó gyerek'],
    correctAnswer: 0,
    explanation: 'Csak a kék keret azon része kell, amelyik nincs benne a zöldben: András, Zsuzsi és Józsi.'
  },
  {
    id: 'ss-q2',
    level: 1,
    questionTypeBadge: 'Közös rész',
    figure: FIG_OTTER,
    question: 'Hány gyerek vett részt mindkét programon?',
    options: ['8', '5', '3', '13'],
    correctAnswer: 0,
    explanation: 'A két keret közös részében 8 név van: Éva, Zsolti, Sári, Magdi, Gertrúd, Tibi, Sanyi és Anti.'
  },
  {
    id: 'ss-q3',
    level: 1,
    questionTypeBadge: 'Halmazábra',
    figure: animalFig('🦆 kacsa'),
    question: 'Hova kerül a kacsa a halmazábrában?',
    options: ['A két karika közös részébe', 'Csak a Madár karikába', 'Csak a Háziállat karikába', 'A karikákon kívülre'],
    correctAnswer: 0,
    explanation: 'A kacsa madár is, és háziállat is. Mindkét címke igaz rá, ezért a közös részbe kerül.'
  },
  {
    id: 'ss-q4',
    level: 1,
    questionTypeBadge: 'Halmazábra',
    figure: animalFig('🦌 őz'),
    question: 'Hova kerül az őz?',
    options: ['A karikákon kívülre, de az ÁLLATOK keretbe', 'Csak a Madár karikába', 'Csak a Háziállat karikába', 'A közös részbe'],
    correctAnswer: 0,
    explanation: 'Az őz nem madár és nem háziállat. Állat viszont, ezért a kereten belül, a karikákon kívül a helye.'
  },
  {
    id: 'ss-q5',
    level: 1,
    questionTypeBadge: 'Halmazábra',
    figure: animalFig('🐴 ló'),
    question: 'Hova kerül a ló?',
    options: ['Csak a Háziállat karikába', 'Csak a Madár karikába', 'A közös részbe', 'A kereten kívülre'],
    correctAnswer: 0,
    explanation: 'A ló háziállat, de nem madár. Ezért a Háziállat karikába kerül, a közös részen kívül.'
  },
  {
    id: 'ss-q6',
    level: 1,
    questionTypeBadge: 'Halmazábra',
    figure: animalFig('🦉 bagoly'),
    question: 'Hova kerül a bagoly?',
    options: ['Csak a Madár karikába', 'A közös részbe', 'Csak a Háziállat karikába', 'A karikákon kívülre'],
    correctAnswer: 0,
    explanation: 'A bagoly madár, de vadon él, nem háziállat. Ezért csak a Madár karikába kerül.'
  },
  {
    id: 'ss-q7',
    level: 1,
    questionTypeBadge: 'Kakukktojás',
    figure: FIG_ODD_A,
    question: 'Melyik szám a kakukktojás?',
    options: ['3517', '1550', '9756', '4920'],
    correctAnswer: 0,
    explanation: 'Mindegyik szám páros, csak a 3517 páratlan (7-re végződik). A halmaz címe lehet: Páros számok.'
  },
  {
    id: 'ss-q8',
    level: 1,
    questionTypeBadge: 'Címke',
    question: 'A halmaz címkéje: „Páros számok”. Melyik szám NEM kerülhet bele?',
    options: ['3063', '4016', '7000', '8808'],
    correctAnswer: 0,
    explanation: 'A 3063 utolsó számjegye 3, ezért páratlan. A 4016, a 7000 és a 8808 páros.'
  },
  {
    id: 'ss-q9',
    level: 1,
    questionTypeBadge: 'Nem illik bele',
    figure: FIG_MF6_5,
    question: 'Melyik szám nem illik az „5 többszörösei” halmazba?',
    options: ['303', '525', '850', '8005'],
    correctAnswer: 0,
    explanation: 'Az 5 többszörösei 0-ra vagy 5-re végződnek. A 303 3-ra végződik, ezért nem illik bele.'
  },
  {
    id: 'ss-q10',
    level: 1,
    questionTypeBadge: 'Nem illik bele',
    figure: FIG_MF6_2,
    question: 'Melyik szám nem illik a „2 többszörösei” halmazba?',
    options: ['215', '410', '10 000', '6300'],
    correctAnswer: 0,
    explanation: 'A 2 többszörösei a páros számok. A 215 5-re végződik, páratlan, ezért nem illik bele.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'ss-q11',
    level: 2,
    questionTypeBadge: 'Számok halmazai',
    figure: mf5Fig('5600'),
    question: 'Hova kerül az 5600?',
    options: ['A két karika közös részébe', 'Csak Az 50 többszörösei karikába', 'Csak A 20 többszörösei karikába', 'A karikákon kívülre'],
    correctAnswer: 0,
    explanation: '5600 = 112 · 50 és 5600 = 280 · 20. Mindkettőnek többszöröse, ezért a közös részbe kerül.'
  },
  {
    id: 'ss-q12',
    level: 2,
    questionTypeBadge: 'Számok halmazai',
    figure: mf5Fig('2350'),
    question: 'Hova kerül a 2350?',
    options: ['Csak Az 50 többszörösei karikába', 'A közös részbe', 'Csak A 20 többszörösei karikába', 'A karikákon kívülre'],
    correctAnswer: 0,
    explanation: '2350 = 47 · 50, tehát az 50 többszöröse. A 20 többszörösei 20, 40, 60, 80, 00 végűek – a 2350 50-re végződik, ezért nem a 20 többszöröse.'
  },
  {
    id: 'ss-q13',
    level: 2,
    questionTypeBadge: 'Számok halmazai',
    figure: mf5Fig('1040'),
    question: 'Hova kerül az 1040?',
    options: ['Csak A 20 többszörösei karikába', 'Csak Az 50 többszörösei karikába', 'A közös részbe', 'A karikákon kívülre'],
    correctAnswer: 0,
    explanation: '1040 = 52 · 20, tehát a 20 többszöröse. Az 50 többszörösei 00-ra vagy 50-re végződnek, az 1040 nem.'
  },
  {
    id: 'ss-q14',
    level: 2,
    questionTypeBadge: 'Számok halmazai',
    figure: mf5Fig('1530'),
    question: 'Hova kerül az 1530?',
    options: ['A karikákon kívülre, de a keretbe', 'Csak Az 50 többszörösei karikába', 'Csak A 20 többszörösei karikába', 'A közös részbe'],
    correctAnswer: 0,
    explanation: 'Az 1530 30-ra végződik: nem 50-nek és nem 20-nak a többszöröse. Négyjegyű viszont, ezért a kereten belül marad.'
  },
  {
    id: 'ss-q15',
    level: 2,
    questionTypeBadge: 'Páros és négyjegyű',
    figure: numFig('6606'),
    question: 'Hova kerül a 6606?',
    options: ['A Páros számok és a Négyjegyű számok közös részébe', 'Csak a Páros számok karikába', 'Csak a Négyjegyű számok karikába', 'A karikákon kívülre'],
    correctAnswer: 0,
    explanation: 'A 6606 6-ra végződik, tehát páros, és négy számjegye van. Mindkét címke igaz → közös rész.'
  },
  {
    id: 'ss-q16',
    level: 2,
    questionTypeBadge: 'Páros és négyjegyű',
    figure: numFig('475'),
    question: 'Hova kerül a 475?',
    options: ['A karikákon kívülre, de a Számok keretbe', 'Csak a Páros számok karikába', 'Csak a Négyjegyű számok karikába', 'A közös részbe'],
    correctAnswer: 0,
    explanation: 'A 475 páratlan (5-re végződik) és háromjegyű. Egyik címke sem igaz rá.'
  },
  {
    id: 'ss-q17',
    level: 2,
    questionTypeBadge: 'Halmaz a halmazban',
    figure: FIG_NESTED_Q,
    question: 'Ebben a halmazábrában hova kerül a málna?',
    options: ['A „Szörp készülhet belőle” karikába', 'A Gyümölcs karikába, de a belső karikán kívül', 'A Növény keretbe, a karikákon kívül', 'A kereten kívülre'],
    correctAnswer: 0,
    explanation: 'A málna gyümölcs, és szörp is készülhet belőle, ezért a legbelső karikába kerül.'
  },
  {
    id: 'ss-q18',
    level: 2,
    questionTypeBadge: 'Halmaz a halmazban',
    figure: FIG_NESTED_Q,
    question: 'Hova kerül a burgonya?',
    options: ['A Növény keretbe, a karikákon kívülre', 'A Gyümölcs karikába', 'A „Szörp készülhet belőle” karikába', 'A kereten kívülre'],
    correctAnswer: 0,
    explanation: 'A burgonya növény, de nem gyümölcs. Ezért a kereten belül, a Gyümölcs karikán kívül a helye.'
  },
  {
    id: 'ss-q19',
    level: 2,
    questionTypeBadge: 'Összeadás + halmaz',
    question: 'Számold ki: 1640 + 870. Hova kerül az összeg, ha a karikák: „Páros” és benne „Számjegyeinek összege 15”?',
    options: ['A Páros karikába, de a belső karikán kívül', 'A belső karikába (számjegyösszeg 15)', 'A karikákon kívülre', 'Egyik helyre sem tehető'],
    correctAnswer: 0,
    explanation: '1640 + 870 = 2510. Páros, mert 0-ra végződik. Számjegyeinek összege 2 + 5 + 1 + 0 = 8, nem 15. Ezért csak a Páros karikába kerül.'
  },
  {
    id: 'ss-q20',
    level: 2,
    questionTypeBadge: 'Címke',
    question: 'Melyik szám kerülhet a „Kétjegyű számok, számjegyeik összege 11” halmazba?',
    options: ['47', '48', '57', '209'],
    correctAnswer: 0,
    explanation: '4 + 7 = 11, és a 47 kétjegyű. A 48 és az 57 számjegyösszege 12, a 209 összege 11, de háromjegyű.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'ss-q21',
    level: 3,
    questionTypeBadge: 'Művelet + halmaz',
    figure: ops9Fig,
    question: 'Melyik halmazba írod az 500 · 9 − 1700 művelet betűjelét?',
    options: ['2800', '1500', '7200', 'Egyikbe sem'],
    correctAnswer: 0,
    explanation: 'Először szorzunk: 500 · 9 = 4500. Aztán kivonunk: 4500 − 1700 = 2800.'
  },
  {
    id: 'ss-q22',
    level: 3,
    questionTypeBadge: 'Művelet + halmaz',
    figure: ops9Fig,
    question: 'Melyik halmazba írod az 1000 · 6 + 6 · 200 művelet betűjelét?',
    options: ['7200', '2800', '1500', 'Egyikbe sem'],
    correctAnswer: 0,
    explanation: 'A szorzásokat végezzük el először: 1000 · 6 = 6000 és 6 · 200 = 1200. Összegük 6000 + 1200 = 7200.'
  },
  {
    id: 'ss-q23',
    level: 3,
    questionTypeBadge: 'Logikai lapok',
    figure: logicFig('kék', 'háromszög', true),
    question: 'Egy kék, lyukas háromszöget válogatunk. Melyik számú részbe kerül?',
    options: ['5', '4', '2', '6'],
    correctAnswer: 0,
    explanation: 'Kék? igen. Lyukas? igen. Háromszög? igen. Mindhárom karikában benne van → a közepén lévő 5. részbe kerül.'
  },
  {
    id: 'ss-q24',
    level: 3,
    questionTypeBadge: 'Logikai lapok',
    figure: logicFig('sárga', 'négyzet', false),
    question: 'Hova kerül a sárga, nem lyukas négyzet?',
    options: ['8', '3', '7', '1'],
    correctAnswer: 0,
    explanation: 'Nem kék, nem lyukas, nem háromszög. Egyik karikába sem kerül, ezért a karikákon kívüli 8. részbe.'
  },
  {
    id: 'ss-q25',
    level: 3,
    questionTypeBadge: 'Logikai lapok',
    figure: logicFig('piros', 'kör', true),
    question: 'Hova kerül a piros, lyukas kör?',
    options: ['3', '6', '2', '8'],
    correctAnswer: 0,
    explanation: 'Kék? nem. Lyukas? igen. Háromszög? nem. Csak a Lyukas karikában van → 3. rész.'
  },
  {
    id: 'ss-q26',
    level: 3,
    questionTypeBadge: 'Síkidomok',
    figure: curvedStraightFig,
    question: 'A C halmazba azok a síkidomok kerülnek, amelyeket görbe vonal is határol, a D-be azok, amelyeket egyenes vonal is. Hova kerül a félkör?',
    options: ['A C és a D közös részébe', 'Csak a C halmazba', 'Csak a D halmazba', 'Egyikbe sem'],
    correctAnswer: 0,
    explanation: 'A félkört egy görbe vonal (az ív) és egy egyenes vonal (az átmérő) határolja. Mindkettő igaz → közös rész.'
  },
  {
    id: 'ss-q27',
    level: 3,
    questionTypeBadge: 'Síkidomok',
    figure: shapesFig,
    question: 'Hova kerül a téglalap ebben az ábrában?',
    options: ['A Négyszögek karikába (a Sokszögeken belül)', 'A Sokszögek közé, de a Négyszögeken kívülre', 'A „Görbe vonal határolja” részbe', 'Csak a Síkidomok keretbe'],
    correctAnswer: 0,
    explanation: 'A téglalap sokszög, és 4 oldala van, tehát négyszög. A Négyszögek karika a Sokszögeken belül van.'
  },
  {
    id: 'ss-q28',
    level: 3,
    questionTypeBadge: 'Síkidomok',
    figure: shapesFig,
    question: 'Hova kerül a hatszög?',
    options: ['A Sokszögek közé, de a Négyszögeken kívülre', 'A Négyszögek karikába', 'A „Görbe vonal határolja” részbe', 'Csak a Síkidomok keretbe'],
    correctAnswer: 0,
    explanation: 'A hatszöget 6 egyenes szakasz határolja: sokszög, de nem négyszög.'
  },
  {
    id: 'ss-q29',
    level: 3,
    questionTypeBadge: 'Leolvasás',
    figure: FIG_OTTER,
    question: 'Hány gyerek nézte a vidraetetést összesen?',
    options: ['13', '5', '8', '16'],
    correctAnswer: 0,
    explanation: 'A zöld keretbe a közös rész is beletartozik: 5 gyerek csak vidraetetést nézett, 8 mindkettőn ott volt. 5 + 8 = 13.'
  },
  {
    id: 'ss-q30',
    level: 3,
    questionTypeBadge: 'Számolás a halmazban',
    figure: FIG_MF5_COUNT,
    question: 'Ezeket a számokat válogatjuk „Az 50 többszörösei” és „A 20 többszörösei” karikába. Hány szám kerül a közös részbe?',
    options: ['4', '6', '7', '2'],
    correctAnswer: 0,
    explanation: 'A közös részbe az kerül, ami 50-nek és 20-nak is többszöröse: 5600, 7200, 9500, 4200 – ez 4 szám (mind 00-ra végződik).'
  }
];

export const SetSortingQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId="g4-group-halmazok-quiz"
      subtopicId="valogatasok-halmazokba"
      title="1. Válogatások halmazokba – Kvíz"
      subtitle="30 feladat 3 szinten: halmazábrák olvasása, közös rész, karikán kívüli rész, kakukktojás, számok és logikai lapok válogatása."
      badge="4. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • KVÍZ"
      questions={SET_SORTING_QUESTIONS}
      cheatSheets={[
        {
          title: 'Hova kerül?',
          items: [
            'Csak az egyik címke igaz → abba a karikába (a közös részen kívül).',
            'Mindkét címke igaz → a közös részbe.',
            'Egyik sem igaz → a karikákon kívülre, de a keretbe.',
            'Mindig nézd meg MINDKÉT címkét!'
          ]
        },
        {
          title: 'Számok jelei',
          items: [
            'Páros: 0, 2, 4, 6, 8 az utolsó számjegy.',
            '5 többszörösei: 0-ra vagy 5-re végződnek.',
            '50 többszörösei: 00-ra vagy 50-re végződnek.',
            '20 többszörösei: 00, 20, 40, 60, 80 végűek.'
          ]
        },
        {
          title: 'Logikai lapok (Kék, Lyukas, Háromszög)',
          items: [
            '1 csak kék · 3 csak lyukas · 7 csak háromszög',
            '2 kék és lyukas · 4 kék és háromszög · 6 lyukas és háromszög',
            '5 mindhárom · 8 egyik sem',
            'Tedd fel a három kérdést sorban!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SetSortingMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <SetSortingSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default SetSortingQuiz;
