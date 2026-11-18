import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Div9G2Matcher } from './Div9G2Matcher';
import { Div9G2Sorter } from './Div9G2Sorter';
import { BOX_COLORS, DIV9_FONT, JumpLinePart, NineBoxPart, NineRowsPart, PlatePart } from './Div9G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** n korong 9-es sorokban, az első `groups` sor bekarikázva. */
const GroupedFig: React.FC<{ n: number; groups: number }> = ({ n, groups }) => {
  const gap = n > 54 ? 19 : 22;
  const rows = Math.ceil(n / 9);
  const h = 30 + rows * gap;
  return (
    <QFig h={h}>
      <NineRowsPart x={130 - 4 * gap} y={24} n={n} gap={gap} r={gap * 0.33} groups={groups} />
    </QFig>
  );
};

/** 9 tányér kérdőjellel, fölöttük a „kosár” felirata. */
const PlatesFig: React.FC<{ pile: string }> = ({ pile }) => (
  <QFig h={100}>
    <rect x="70" y="10" width="120" height="32" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="130" y="32" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
      {pile}
    </text>
    {Array.from({ length: 9 }, (_, i) => (
      <PlatePart key={i} cx={22 + i * 27} cy={72} w={25} question />
    ))}
  </QFig>
);

/** Szöcske: első ugrás 9, szaggatott vonal a célig. */
const JumpsToFig: React.FC<{ target: number }> = ({ target }) => {
  const x = 18;
  const w = 222;
  const u = w / 90;
  return (
    <QFig h={110}>
      <JumpLinePart x={x} y={72} w={w} jumps={1} fontSize={10} />
      <text x={x + 4.5 * u} y={44} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ea580c">
        9
      </text>
      <line x1={x + 9 * u} y1={60} x2={x + target * u} y2={60} stroke="#ea580c" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx={x + target * u} cy={72} r="5" fill={UNK} />
      <text x={Math.min(x + target * u, 236)} y={50} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
        {target}
      </text>
    </QFig>
  );
};

/** Nyíl: from —label→ to */
const ArrowFig: React.FC<{ from: string; label: string; to: string }> = ({ from, label, to }) => {
  const box = (x: number, t: string) => (
    <g>
      <rect x={x} y={34} width="60" height="44" rx="10" fill={t === '?' ? '#fee2e2' : '#ffedd5'} stroke={t === '?' ? UNK : '#ea580c'} strokeWidth="2.5" />
      <text x={x + 30} y={64} textAnchor="middle" fontSize="22" fontWeight="bold" fill={t === '?' ? UNK : '#7c2d12'}>
        {t}
      </text>
    </g>
  );
  return (
    <QFig h={96}>
      {box(24, from)}
      <path d="M 90 50 Q 130 18 166 50" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      <polygon points="168,52 158,48 164,40" fill="#7c3aed" />
      <text x="130" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6d28d9">
        {label}
      </text>
      {box(176, to)}
    </QFig>
  );
};

/** Tízes trükk: a szám két jegye, a tízesek kiemelve. */
const TensFig: React.FC<{ n: number }> = ({ n }) => {
  const s = String(n);
  return (
    <QFig h={90}>
      <rect x="22" y="22" width="36" height="44" rx="6" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" />
      <text x="40" y="53" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#92400e">
        {s[0]}
      </text>
      <rect x="60" y="22" width="36" height="44" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
      <text x="78" y="53" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#475569">
        {s[1]}
      </text>
      <text x="104" y="53" fontSize="22" fontWeight="bold" fill="#334155">
        : 9
      </text>
      <text x="138" y="53" fontSize="20" fill="#0369a1">
        →
      </text>
      <text x="160" y="53" fontSize="22" fontWeight="bold" fill="#92400e">
        {s[0]} + 1 = <tspan fill={UNK}>?</tspan>
      </text>
    </QFig>
  );
};

/** rows sor, soronként 9 korong (bekarikázás nélkül, lila). */
const ArrayFig: React.FC<{ rows: number }> = ({ rows }) => {
  const gap = 18;
  const h = 30 + rows * gap;
  return (
    <QFig h={h}>
      <NineRowsPart x={130 - 4 * gap} y={22} n={rows * 9} gap={gap} r={6.2} restColor="#8b5cf6" />
    </QFig>
  );
};

const CompareFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={80}>
    <rect x="14" y="18" width="96" height="44" rx="10" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
    <text x="62" y="47" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#7c2d12">
      {left}
    </text>
    <circle cx="130" cy="40" r="17" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="130" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <rect x="154" y="18" width="92" height="44" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="200" y="47" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#075985">
      {right}
    </text>
  </QFig>
);

/** ? darab kilences doboz = total */
const BoxesQFig: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={90}>
    <text x="58" y="56" textAnchor="middle" fontSize="30" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <text x="84" y="56" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#334155">
      ·
    </text>
    <NineBoxPart x={100} y={22} size={46} color="#f97316" />
    <text x="196" y="56" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </QFig>
);

/** n kilences doboz + `rest` kimaradt golyó. */
const BoxesPlusFig: React.FC<{ n: number; rest: number }> = ({ n, rest }) => {
  const size = 30;
  const g = 34;
  const x0 = 130 - ((n - 1) * g + size) / 2;
  return (
    <QFig h={100}>
      {Array.from({ length: n }, (_, i) => (
        <NineBoxPart key={i} x={x0 + i * g} y={16} size={size} color={BOX_COLORS[i % BOX_COLORS.length]} />
      ))}
      {Array.from({ length: rest }, (_, i) => (
        <circle key={`r${i}`} cx={130 - ((rest - 1) * 18) / 2 + i * 18} cy={74} r="7" fill="#0ea5e9" stroke="#0c4a6e" strokeWidth="1.5" />
      ))}
    </QFig>
  );
};

/** Szalagos ábra: felső sáv 1 egység (?), alsó 9 egység, összesen `total`. */
const BarsFig: React.FC<{ total: number; names: [string, string] }> = ({ total, names }) => {
  const cw = 19;
  const x0 = 56;
  return (
    <QFig h={110}>
      <text x="10" y="34" fontSize="13" fontWeight="bold" fill="#334155">
        {names[0]}
      </text>
      <rect x={x0} y="18" width={cw} height="24" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
      <text x={x0 + cw / 2} y="35" textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>
        ?
      </text>
      <text x="10" y="70" fontSize="13" fontWeight="bold" fill="#334155">
        {names[1]}
      </text>
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={x0 + i * cw} y="54" width={cw} height="24" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
      ))}
      <path d={`M ${x0} 84 Q ${x0} 92 ${x0 + 10} 92 L ${x0 + 4.5 * cw - 6} 92 Q ${x0 + 4.5 * cw} 92 ${x0 + 4.5 * cw} 100 Q ${x0 + 4.5 * cw} 92 ${x0 + 4.5 * cw + 6} 92 L ${x0 + 9 * cw - 10} 92 Q ${x0 + 9 * cw} 92 ${x0 + 9 * cw} 84`} fill="none" stroke="#334155" strokeWidth="1.8" />
      <text x={x0 + 9 * cw + 14} y="96" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7c2d12">
        {total}
      </text>
    </QFig>
  );
};

const MachineFig: React.FC<{ start: number; ops: string[] }> = ({ start, ops }) => {
  const n = ops.length + 1;
  const w = 40;
  const gap = (240 - n * w) / ops.length;
  return (
    <QFig h={84}>
      {Array.from({ length: n }, (_, i) => {
        const bx = 10 + i * (w + gap);
        const label = i === 0 ? String(start) : i === n - 1 ? '?' : '';
        return (
          <g key={i}>
            <rect x={bx} y={36} width={w} height={34} rx="8" fill={label === '?' ? '#fee2e2' : '#ffedd5'} stroke={label === '?' ? UNK : '#ea580c'} strokeWidth="2" />
            <text x={bx + w / 2} y={60} textAnchor="middle" fontSize="18" fontWeight="bold" fill={label === '?' ? UNK : '#7c2d12'}>
              {label}
            </text>
            {i < ops.length && (
              <>
                <path d={`M ${bx + w + 2} 46 Q ${bx + w + gap / 2} 22 ${bx + w + gap - 2} 46`} fill="none" stroke="#7c3aed" strokeWidth="2" />
                <text x={bx + w + gap / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6d28d9">
                  {ops[i]}
                </text>
              </>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

/** 9 darab 10 forintos érme. */
const CoinsFig: React.FC = () => (
  <QFig h={96}>
    <text x="130" y="24" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
      90 Ft, 9 gyerek
    </text>
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <circle cx={26 + i * 26} cy={60} r="12" fill="#fcd34d" stroke="#a16207" strokeWidth="2" />
        <text x={26 + i * 26} y={64} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713f12">
          10
        </text>
      </g>
    ))}
    <text x="130" y="88" textAnchor="middle" fontSize="11" fill="#64748b">
      egy érme = 10 Ft
    </text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIV9_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'div9g2-q1',
    level: 1,
    questionTypeBadge: 'Csoportosítás',
    figure: <GroupedFig n={27} groups={3} />,
    question: 'Kilencesével karikáztuk be a korongokat. Hány csoport lett?',
    options: ['3', '2', '4', '18'],
    correctAnswer: 0,
    explanation: '3 karika lett. 27 : 9 = 3, mert 3 · 9 = 27.'
  },
  {
    id: 'div9g2-q2',
    level: 1,
    questionTypeBadge: 'Osztás',
    question: 'Mennyi 45 : 9?',
    options: ['5', '4', '36', '6'],
    correctAnswer: 0,
    explanation: '5 · 9 = 45, ezért 45 : 9 = 5. A 36 az lenne, ha kivonnál: 45 − 9.'
  },
  {
    id: 'div9g2-q3',
    level: 1,
    questionTypeBadge: 'Szétosztás',
    figure: <PlatesFig pile="18 eper" />,
    question: '18 epret 9 tányérra teszünk egyformán. Mennyi jut egy tányérra?',
    options: ['2', '9', '3', '1'],
    correctAnswer: 0,
    explanation: 'Minden tányér kap 1-et, aztán még 1-et. 18 : 9 = 2.'
  },
  {
    id: 'div9g2-q4',
    level: 1,
    questionTypeBadge: 'Osztás',
    question: 'Mennyi 81 : 9?',
    options: ['9', '8', '72', '1'],
    correctAnswer: 0,
    explanation: '9 · 9 = 81, ezért 81 : 9 = 9.'
  },
  {
    id: 'div9g2-q5',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <JumpsToFig target={36} />,
    question: 'A szöcske mindig 9-et ugrik. Hány ugrással ér a 36-ra?',
    options: ['4', '3', '5', '27'],
    correctAnswer: 0,
    explanation: '9, 18, 27, 36: ez 4 ugrás. 36 : 9 = 4.'
  },
  {
    id: 'div9g2-q6',
    level: 1,
    questionTypeBadge: 'Szorzás segít',
    figure: <ArrowFig from="54" label=": 9" to="?" />,
    question: '6 · 9 = 54. Mennyi 54 : 9?',
    options: ['6', '9', '45', '5'],
    correctAnswer: 0,
    explanation: 'A szorzás segít: 6 · 9 = 54, ezért 54 : 9 = 6.'
  },
  {
    id: 'div9g2-q7',
    level: 1,
    questionTypeBadge: 'Egy kilences',
    question: 'Mennyi 9 : 9?',
    options: ['1', '0', '9', '18'],
    correctAnswer: 0,
    explanation: 'A 9-ben pont 1 kilences van. 9 : 9 = 1.'
  },
  {
    id: 'div9g2-q8',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: 'Mennyi 0 : 9?',
    options: ['0', '9', '1', '3'],
    correctAnswer: 0,
    explanation: 'Ha nincs mit szétosztani, senki nem kap semmit. 0 : 9 = 0.'
  },
  {
    id: 'div9g2-q9',
    level: 1,
    questionTypeBadge: 'Hány tálca?',
    figure: <BoxesQFig total={63} />,
    question: 'Egy tálcára 9 muffin fér. Hány tálca kell 63 muffinhoz?',
    options: ['7', '6', '8', '54'],
    correctAnswer: 0,
    explanation: '7 · 9 = 63, ezért 63 : 9 = 7 tálca.'
  },
  {
    id: 'div9g2-q10',
    level: 1,
    questionTypeBadge: 'Tíz kilences',
    figure: <GroupedFig n={90} groups={10} />,
    question: 'Hány kilences csoport van a 90-ben?',
    options: ['10', '9', '81', '1'],
    correctAnswer: 0,
    explanation: '10 karika van a képen. 90 : 9 = 10, mert 10 · 9 = 90.'
  },

  // ----- 2. szint -----
  {
    id: 'div9g2-q11',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <ArrowFig from="?" label=": 9" to="8" />,
    question: 'Melyik számot osztottuk 9-cel, ha 8 lett az eredmény?',
    options: ['72', '17', '81', '63'],
    correctAnswer: 0,
    explanation: 'Szorozz vissza: 8 · 9 = 72. Próba: 72 : 9 = 8.'
  },
  {
    id: 'div9g2-q12',
    level: 2,
    questionTypeBadge: 'Tízesek + 1',
    figure: <TensFig n={63} />,
    question: 'Használd a trükköt! Mennyi 63 : 9?',
    options: ['7', '6', '8', '54'],
    correctAnswer: 0,
    explanation: 'A 63-ban 6 tízes van. 6 + 1 = 7. Próba: 7 · 9 = 63.'
  },
  {
    id: 'div9g2-q13',
    level: 2,
    questionTypeBadge: 'Egy kép, két osztás',
    figure: <ArrayFig rows={4} />,
    question: '36 : 9 = 4. Mennyi 36 : 4?',
    options: ['9', '4', '6', '32'],
    correctAnswer: 0,
    explanation: '4 sor van, soronként 9 korong. Ezért 36 : 4 = 9.'
  },
  {
    id: 'div9g2-q14',
    level: 2,
    questionTypeBadge: 'Maradék',
    figure: <GroupedFig n={22} groups={2} />,
    question: 'Hány korong maradt ki a karikákból?',
    options: ['4', '2', '5', '3'],
    correctAnswer: 0,
    explanation: '2 karika = 18 korong. 22 − 18 = 4 maradt ki. Ez a maradék.'
  },
  {
    id: 'div9g2-q15',
    level: 2,
    questionTypeBadge: 'Melyik osztás?',
    question: 'Melyik osztás eredménye 7?',
    options: ['63 : 9', '54 : 9', '72 : 9', '45 : 9'],
    correctAnswer: 0,
    explanation: '7 · 9 = 63, ezért 63 : 9 = 7. A többi: 6, 8, 5.'
  },
  {
    id: 'div9g2-q16',
    level: 2,
    questionTypeBadge: 'Szétosztás',
    figure: <PlatesFig pile="45 cseresznye" />,
    question: '45 szem cseresznyét 9 tálkába osztunk egyformán. Mennyi jut egy tálkába?',
    options: ['5', '4', '36', '9'],
    correctAnswer: 0,
    explanation: '5 · 9 = 45, ezért 45 : 9 = 5 szem jut egy tálkába.'
  },
  {
    id: 'div9g2-q17',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig left="54 : 9" right="5" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '54 : 9 = 6, és 6 nagyobb, mint 5. Tehát 54 : 9 > 5.'
  },
  {
    id: 'div9g2-q18',
    level: 2,
    questionTypeBadge: 'Csoport és maradék',
    figure: <GroupedFig n={41} groups={4} />,
    question: 'Hány kilences csoport lett, és mennyi maradt?',
    options: ['4 csoport, maradt 5', '3 csoport, maradt 14', '5 csoport, maradt 0', '4 csoport, maradt 4'],
    correctAnswer: 0,
    explanation: '4 karika = 36 korong. 41 − 36 = 5 maradt. Ellenőrzés: 4 · 9 + 5 = 41.'
  },
  {
    id: 'div9g2-q19',
    level: 2,
    questionTypeBadge: 'Hiányzó osztó',
    question: 'Mi kerül a □ helyére? 72 : □ = 8',
    options: ['9', '8', '64', '7'],
    correctAnswer: 0,
    explanation: '8 · 9 = 72, ezért 72 : 9 = 8. Tehát □ = 9.'
  },
  {
    id: 'div9g2-q20',
    level: 2,
    questionTypeBadge: 'Maradék nélkül',
    question: 'Melyik számot lehet maradék nélkül 9-es csoportokra osztani?',
    options: ['54', '46', '64', '52'],
    correctAnswer: 0,
    explanation: '54 : 9 = 6, mert 6 · 9 = 54. A többinél marad valami.'
  },

  // ----- 3. szint -----
  {
    id: 'div9g2-q21',
    level: 3,
    questionTypeBadge: 'Kilencszer annyi',
    figure: <BarsFig total={36} names={['Anna', 'Pisti']} />,
    question: 'Pistinek 36 golyója van. Ez 9-szer annyi, mint Annáé. Hány golyója van Annának?',
    options: ['4', '27', '45', '9'],
    correctAnswer: 0,
    explanation: 'Pisti 9 egyforma részből áll. Egy rész: 36 : 9 = 4. Annának 4 golyója van.'
  },
  {
    id: 'div9g2-q22',
    level: 3,
    questionTypeBadge: 'Csónakok',
    figure: <GroupedFig n={50} groups={0} />,
    question: '50 gyerek csónakázik. Egy csónakba 9 gyerek ül. Hány csónak lesz tele? Hány gyerek marad?',
    options: ['5 csónak tele, maradt 5', '4 csónak tele, maradt 14', '6 csónak tele, maradt 4', '5 csónak tele, maradt 4'],
    correctAnswer: 0,
    explanation: '5 · 9 = 45, 6 · 9 = 54 már túl sok. 50 − 45 = 5 gyerek marad.'
  },
  {
    id: 'div9g2-q23',
    level: 3,
    questionTypeBadge: 'Hány csónak kell?',
    figure: <GroupedFig n={40} groups={4} />,
    question: '40 gyerek csónakázik. Egy csónakba 9 ül. Hány csónak kell, hogy mindenki beüljön?',
    options: ['5', '4', '6', '36'],
    correctAnswer: 0,
    explanation: '4 csónak tele lesz (36 gyerek). 4 gyerek marad, nekik is kell egy csónak: 5 csónak.'
  },
  {
    id: 'div9g2-q24',
    level: 3,
    questionTypeBadge: 'Ellenőrzés',
    figure: <GroupedFig n={58} groups={6} />,
    question: '58 korong: 6 csoport lett, és maradt 4. Melyik az ellenőrzés?',
    options: ['6 · 9 + 4 = 58', '6 · 9 − 4 = 58', '6 + 9 + 4 = 58', '4 · 9 + 6 = 58'],
    correctAnswer: 0,
    explanation: '6 csoport, mindegyikben 9: 6 · 9 = 54. Hozzá a maradék: 54 + 4 = 58.'
  },
  {
    id: 'div9g2-q25',
    level: 3,
    questionTypeBadge: 'Mekkora a maradék?',
    question: 'Ha 9-cel osztunk, melyik szám NEM lehet a maradék?',
    options: ['9', '8', '5', '0'],
    correctAnswer: 0,
    explanation: 'A maradék mindig kevesebb, mint 9. Ha 9 maradna, abból még egy csoport lenne!'
  },
  {
    id: 'div9g2-q26',
    level: 3,
    questionTypeBadge: 'Számológép',
    figure: <MachineFig start={27} ops={[': 9', '+ 6']} />,
    question: 'Kezdd a 27-tel! Oszd el 9-cel, aztán adj hozzá 6-ot! Mit kapsz?',
    options: ['9', '3', '33', '24'],
    correctAnswer: 0,
    explanation: '27 : 9 = 3, és 3 + 6 = 9. Figyelj a sorrendre!'
  },
  {
    id: 'div9g2-q27',
    level: 3,
    questionTypeBadge: 'Zsebpénz',
    figure: <CoinsFig />,
    question: 'Nagyi 90 Ft-ot oszt szét 9 unokája között egyformán. Mennyi jut egy unokának?',
    options: ['10 Ft', '9 Ft', '81 Ft', '20 Ft'],
    correctAnswer: 0,
    explanation: '90 : 9 = 10. Mindenki kap egy 10 forintost.'
  },
  {
    id: 'div9g2-q28',
    level: 3,
    questionTypeBadge: 'Visszafelé maradékkal',
    figure: <BoxesPlusFig n={7} rest={2} />,
    question: '7 teli kilences doboz van, és még 2 golyó kimaradt. Hány golyó van összesen?',
    options: ['65', '63', '72', '61'],
    correctAnswer: 0,
    explanation: '7 · 9 = 63 golyó a dobozokban. 63 + 2 = 65 golyó.'
  },
  {
    id: 'div9g2-q29',
    level: 3,
    questionTypeBadge: 'Könyvespolc',
    question: 'Egy polcra 9 könyv fér. 70 könyvünk van. Hány polc lesz tele, és hány könyv marad?',
    options: ['7 polc tele, maradt 7', '8 polc tele, maradt 0', '6 polc tele, maradt 16', '7 polc tele, maradt 8'],
    correctAnswer: 0,
    explanation: '7 · 9 = 63, 8 · 9 = 72 már túl sok. 70 − 63 = 7 könyv marad.'
  },
  {
    id: 'div9g2-q30',
    level: 3,
    questionTypeBadge: 'Legnagyobb',
    question: 'Melyik osztás eredménye a legnagyobb?',
    options: ['72 : 9', '63 : 9', '36 : 6', '35 : 5'],
    correctAnswer: 0,
    explanation: '72 : 9 = 8, 63 : 9 = 7, 36 : 6 = 6, 35 : 5 = 7. A 8 a legnagyobb.'
  }
];

export const Div9G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="osztas"
    topicId="g2-osztas-9-quiz"
    subtopicId="osztas-9-cel"
    title="8. Osztás 9-cel – Kvíz"
    subtitle="30 feladat 3 szinten: csoportosítás és szétosztás, a 9-es bennfoglaló tábla, tízesek + 1 trükk, maradékos osztás 9-cel."
    badge="2. OSZTÁLY • V. OSZTÁS • KVÍZ"
    questions={DIV9_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A 9-es bennfoglaló tábla',
        items: ['9 : 9 = 1, 18 : 9 = 2, 27 : 9 = 3', '36 : 9 = 4, 45 : 9 = 5, 54 : 9 = 6', '63 : 9 = 7, 72 : 9 = 8', '81 : 9 = 9, 90 : 9 = 10']
      },
      {
        title: 'Trükkök',
        items: ['A szorzás segít: 7 · 9 = 63 → 63 : 9 = 7', 'Tízesek + 1: 54 → 5 + 1 = 6', '36 : 9 = 4 és 36 : 4 = 9', 'Kilencszer annyi visszafelé: osztunk 9-cel']
      },
      {
        title: 'Maradékos osztás',
        items: ['Karikázz be kilencesével!', '48 korong: 5 csoport, maradt 3', 'Ellenőrzés: 5 · 9 + 3 = 48', 'A maradék kevesebb, mint 9!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Div9G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Div9G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Div9G2Quiz;
