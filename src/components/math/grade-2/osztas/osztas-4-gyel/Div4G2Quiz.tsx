import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Div4G2Matcher } from './Div4G2Matcher';
import { Div4G2Sorter } from './Div4G2Sorter';
import { DIV4_FONT, DotRowsPart, FourBoxPart, JumpLinePart, PlatePart } from './Div4G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** n korong 8-as sorokban, az első `groups` négyes bekarikázva. */
const GroupedFig: React.FC<{ n: number; groups: number }> = ({ n, groups }) => {
  const gap = 26;
  const rows = Math.ceil(n / 8);
  const h = 30 + rows * gap;
  return (
    <QFig h={h}>
      <DotRowsPart x={39} y={28} n={n} perRow={8} gap={gap} r={8} groups={groups} />
    </QFig>
  );
};

/** 4 tányér: `counts` a tányérokon lévő sütik, vagy '?' ; `pile`: kosár felirat. */
const PlatesFig: React.FC<{ counts?: number[]; pile?: string }> = ({ counts, pile }) => (
  <QFig h={pile ? 118 : 84}>
    {pile && (
      <g>
        <rect x="80" y="10" width="100" height="32" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="130" y="32" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
          {pile}
        </text>
      </g>
    )}
    {[0, 1, 2, 3].map((i) => (
      <PlatePart key={i} cx={40 + i * 60} cy={pile ? 84 : 44} w={54} count={counts ? counts[i] : 0} question={!counts} />
    ))}
  </QFig>
);

const JumpsFig: React.FC<{ target: number }> = ({ target }) => {
  const x = 20;
  const w = 220;
  const u = w / 40;
  return (
    <QFig h={110}>
      <JumpLinePart x={x} y={72} w={w} jumps={1} />
      <text x={x + 2 * u} y={44} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">
        4
      </text>
      <line x1={x + 4 * u} y1={60} x2={x + target * u} y2={60} stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 3" />
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
      <rect x={x} y={34} width="60" height="44" rx="10" fill={t === '?' ? '#fee2e2' : '#ede9fe'} stroke={t === '?' ? UNK : '#7c3aed'} strokeWidth="2.5" />
      <text x={x + 30} y={64} textAnchor="middle" fontSize="22" fontWeight="bold" fill={t === '?' ? UNK : '#4c1d95'}>
        {t}
      </text>
    </g>
  );
  return (
    <QFig h={96}>
      {box(24, from)}
      <path d="M 90 50 Q 130 18 166 50" fill="none" stroke="#dc2626" strokeWidth="2.5" />
      <polygon points="168,52 158,48 164,40" fill="#dc2626" />
      <text x="130" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">
        {label}
      </text>
      {box(176, to)}
    </QFig>
  );
};

/** Kétszer felezés: n → ? → ? */
const HalveFig: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={84}>
    {[
      [String(n), 14],
      ['?', 104],
      ['?', 194]
    ].map(([t, x]) => (
      <g key={x as number}>
        <rect x={x as number} y={30} width="52" height="40" rx="10" fill={t === '?' ? '#fee2e2' : '#cffafe'} stroke={t === '?' ? UNK : '#0891b2'} strokeWidth="2.5" />
        <text x={(x as number) + 26} y={57} textAnchor="middle" fontSize="20" fontWeight="bold" fill={t === '?' ? UNK : '#155e75'}>
          {t}
        </text>
      </g>
    ))}
    {[66, 156].map((x) => (
      <g key={x}>
        <line x1={x + 4} y1={50} x2={x + 32} y2={50} stroke="#0e7490" strokeWidth="2.5" />
        <polygon points={`${x + 36},50 ${x + 28},45 ${x + 28},55`} fill="#0e7490" />
        <text x={x + 19} y={24} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0e7490">
          fele
        </text>
      </g>
    ))}
  </QFig>
);

/** n korong tízes sorokban. */
const DotsFig: React.FC<{ n: number; color?: string }> = ({ n, color = '#ef4444' }) => {
  const gap = 22;
  const rows = Math.ceil(n / 10);
  const h = 26 + rows * gap;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={31 + (i % 10) * gap + (i % 10 >= 5 ? 6 : 0)} cy={24 + Math.floor(i / 10) * gap} r="8" fill={color} stroke="#1e293b" strokeWidth="1.2" />
      ))}
    </QFig>
  );
};

const CompareFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={80}>
    <rect x="14" y="18" width="96" height="44" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <text x="62" y="47" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#4c1d95">
      {left}
    </text>
    <circle cx="130" cy="40" r="17" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="130" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <rect x="150" y="18" width="96" height="44" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="198" y="47" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#075985">
      {right}
    </text>
  </QFig>
);

const SticksFig: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={90}>
    {Array.from({ length: n }, (_, i) => (
      <g key={i} transform={`translate(${36 + i * 26} 18)`}>
        <rect x="-3" y="0" width="6" height="54" rx="3" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
        <circle cx="0" cy="2" r="4" fill="#dc2626" />
      </g>
    ))}
  </QFig>
);

/** ? · zacskó(4) = total */
const BagFig: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={92}>
    <text x="40" y="58" textAnchor="middle" fontSize="28" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <text x="64" y="58" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">
      ·
    </text>
    <path d="M 84 36 L 136 36 L 142 82 L 78 82 Z" fill="#fde68a" stroke="#a16207" strokeWidth="2.5" />
    {[
      [98, 52],
      [120, 52],
      [98, 70],
      [120, 70]
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="7" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
    ))}
    <text x="200" y="66" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </QFig>
);

const Bunny: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx="-4" cy="-16" rx="3" ry="9" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
    <ellipse cx="4" cy="-16" rx="3" ry="9" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
    <circle cx="0" cy="0" r="9" fill="#f8fafc" stroke="#475569" strokeWidth="1.8" />
    <circle cx="-3" cy="-1" r="1.3" fill="#1e293b" />
    <circle cx="3" cy="-1" r="1.3" fill="#1e293b" />
  </g>
);

const BunniesFig: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={112}>
    {Array.from({ length: n }, (_, i) => (
      <Bunny key={i} x={24 + (i % 11) * 21} y={40} />
    ))}
    <rect x="70" y="66" width="120" height="36" rx="8" fill="#ffffff" stroke="#475569" strokeWidth="2.5" />
    {[0, 1, 2, 3, 4].map((b) => (
      <line key={b} x1={86 + b * 22} y1={66} x2={86 + b * 22} y2={102} stroke="#cbd5e1" strokeWidth="1.5" />
    ))}
    <text x="130" y="90" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
      1 ketrec: 4 nyúl
    </text>
  </QFig>
);

const ChainFig: React.FC<{ start: number; ops: [string, string] }> = ({ start, ops }) => (
  <QFig h={84}>
    {[0, 1, 2].map((i) => {
      const bx = 10 + i * 100;
      const label = i === 0 ? String(start) : i === 2 ? '?' : '';
      return (
        <g key={i}>
          <rect x={bx} y={36} width="40" height="34" rx="8" fill={label === '?' ? '#fee2e2' : '#ede9fe'} stroke={label === '?' ? UNK : '#7c3aed'} strokeWidth="2" />
          <text x={bx + 20} y={60} textAnchor="middle" fontSize="18" fontWeight="bold" fill={label === '?' ? UNK : '#4c1d95'}>
            {label}
          </text>
          {i < 2 && (
            <>
              <path d={`M ${bx + 42} 46 Q ${bx + 70} 20 ${bx + 98} 46`} fill="none" stroke="#ea580c" strokeWidth="2" />
              <text x={bx + 70} y={24} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#c2410c">
                {ops[i]}
              </text>
            </>
          )}
        </g>
      );
    })}
  </QFig>
);

const CarFig: React.FC<{ wheels: number }> = ({ wheels }) => (
  <QFig h={96}>
    <g transform="translate(34 22)">
      {[
        [-5, 6],
        [37, 6],
        [-5, 36],
        [37, 36]
      ].map(([wx, wy], i) => (
        <rect key={i} x={wx} y={wy} width="10" height="14" rx="2" fill="#1e293b" />
      ))}
      <rect x="0" y="0" width="42" height="56" rx="10" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
      <rect x="7" y="10" width="28" height="12" rx="3" fill="#bfdbfe" />
    </g>
    <text x="96" y="56" fontSize="15" fontWeight="bold" fill="#334155">
      = 4 kerék
    </text>
    <rect x="176" y="32" width="70" height="36" rx="8" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="211" y="56" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
      {wheels} kerék
    </text>
  </QFig>
);

const BoxIconFig: React.FC = () => (
  <QFig h={80}>
    <FourBoxPart x={108} y={16} size={48} />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIV4_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'div4g2-q1',
    level: 1,
    questionTypeBadge: 'Négyes csoportok',
    figure: <GroupedFig n={12} groups={3} />,
    question: '12 korongot négyesével bekarikáztunk. Mennyi 12 : 4?',
    options: ['3', '4', '8', '16'],
    correctAnswer: 0,
    explanation: '3 karika lett, mindegyikben 4 korong. 12 : 4 = 3, mert 3 · 4 = 12.'
  },
  {
    id: 'div4g2-q2',
    level: 1,
    questionTypeBadge: 'Szétosztás',
    figure: <PlatesFig counts={[2, 2, 2, 2]} />,
    question: '8 sütit 4 tányérra osztottunk szét. Mennyi jut egy tányérra?',
    options: ['2', '4', '1', '12'],
    correctAnswer: 0,
    explanation: 'Minden tányéron 2 süti van. 8 : 4 = 2, mert 2 · 4 = 8.'
  },
  {
    id: 'div4g2-q3',
    level: 1,
    questionTypeBadge: 'Bennfoglaló tábla',
    question: 'Mennyi 20 : 4?',
    options: ['5', '4', '16', '24'],
    correctAnswer: 0,
    explanation: '5 · 4 = 20, tehát 20 : 4 = 5. A 16 az lenne, ha kivonnál: 20 − 4.'
  },
  {
    id: 'div4g2-q4',
    level: 1,
    questionTypeBadge: 'Egy négyes',
    figure: <BoxIconFig />,
    question: 'Mennyi 4 : 4?',
    options: ['1', '0', '4', '8'],
    correctAnswer: 0,
    explanation: 'A 4-ben a 4 egyszer van meg: 4 : 4 = 1.'
  },
  {
    id: 'div4g2-q5',
    level: 1,
    questionTypeBadge: 'Bennfoglaló tábla',
    question: 'Mennyi 40 : 4?',
    options: ['10', '36', '4', '44'],
    correctAnswer: 0,
    explanation: '10 · 4 = 40, tehát 40 : 4 = 10.'
  },
  {
    id: 'div4g2-q6',
    level: 1,
    questionTypeBadge: 'Szorzás segít',
    question: 'Melyik szorzás segít kiszámolni a 24 : 4-et?',
    options: ['6 · 4 = 24', '4 + 4 = 8', '5 · 4 = 20', '24 − 4 = 20'],
    correctAnswer: 0,
    explanation: 'Keresd a 24-et a 4-es táblában: 6 · 4 = 24. Ezért 24 : 4 = 6.'
  },
  {
    id: 'div4g2-q7',
    level: 1,
    questionTypeBadge: 'Negyede',
    figure: <ArrowFig from="16" label="negyede" to="?" />,
    question: 'Mennyi a 16 negyede?',
    options: ['4', '8', '12', '2'],
    correctAnswer: 0,
    explanation: 'A negyede: 16 : 4 = 4, mert 4 · 4 = 16. A 8 a 16 fele lenne.'
  },
  {
    id: 'div4g2-q8',
    level: 1,
    questionTypeBadge: 'Kenguruugrás',
    figure: <JumpsFig target={12} />,
    question: 'A kenguru mindig 4-et ugrik. Hány ugrással ér a 12-re?',
    options: ['3', '4', '8', '6'],
    correctAnswer: 0,
    explanation: '4, 8, 12: ez 3 ugrás. 12 : 4 = 3.'
  },
  {
    id: 'div4g2-q9',
    level: 1,
    questionTypeBadge: 'Maradék',
    figure: <GroupedFig n={9} groups={2} />,
    question: 'Hány korong maradt ki a karikákból?',
    options: ['1', '2', '0', '5'],
    correctAnswer: 0,
    explanation: '2 karika = 8 korong. 9 korongból 1 maradt ki. Ez a maradék.'
  },
  {
    id: 'div4g2-q10',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksFig n={8} />,
    question: 'Egy négyzethez 4 pálcika kell. Hány négyzetet raksz ki 8 pálcikából?',
    options: ['2', '4', '32', '12'],
    correctAnswer: 0,
    explanation: '8 : 4 = 2. Két négyzet lesz, mert 2 · 4 = 8.'
  },

  // ---------- 2. szint ----------
  {
    id: 'div4g2-q11',
    level: 2,
    questionTypeBadge: 'Bennfoglaló tábla',
    question: 'Mennyi 28 : 4?',
    options: ['7', '6', '8', '24'],
    correctAnswer: 0,
    explanation: '7 · 4 = 28, tehát 28 : 4 = 7.'
  },
  {
    id: 'div4g2-q12',
    level: 2,
    questionTypeBadge: 'Felezd kétszer',
    figure: <HalveFig n={32} />,
    question: 'Felezd meg a 32-t, aztán a felét is! Mennyi 32 : 4?',
    options: ['8', '16', '28', '9'],
    correctAnswer: 0,
    explanation: '32 fele 16, a 16 fele 8. Tehát 32 : 4 = 8. A 16 csak az első felezés.'
  },
  {
    id: 'div4g2-q13',
    level: 2,
    questionTypeBadge: 'Bennfoglaló tábla',
    question: 'Mennyi 36 : 4?',
    options: ['9', '8', '32', '12'],
    correctAnswer: 0,
    explanation: '9 · 4 = 36, tehát 36 : 4 = 9. A 12 a 36 : 3 lenne.'
  },
  {
    id: 'div4g2-q14',
    level: 2,
    questionTypeBadge: 'Visszafelé',
    figure: <ArrowFig from="?" label="negyede" to="6" />,
    question: 'Melyik szám kerül a □ helyére? □ : 4 = 6',
    options: ['24', '10', '2', '28'],
    correctAnswer: 0,
    explanation: 'Szorozz vissza: 6 · 4 = 24. Ellenőrzés: 24 : 4 = 6.'
  },
  {
    id: 'div4g2-q15',
    level: 2,
    questionTypeBadge: 'Osztozkodás',
    figure: <PlatesFig pile="24 golyó" />,
    question: '4 gyerek 24 golyón osztozik egyformán. Hány golyó jut egy gyereknek?',
    options: ['6', '20', '28', '5'],
    correctAnswer: 0,
    explanation: '24 : 4 = 6, mert 6 · 4 = 24. Mindenki 6 golyót kap.'
  },
  {
    id: 'div4g2-q16',
    level: 2,
    questionTypeBadge: 'Hány zacskó?',
    figure: <BagFig total={20} />,
    question: '20 almát 4-esével zacskóba teszünk. Hány zacskó lesz?',
    options: ['5', '16', '4', '6'],
    correctAnswer: 0,
    explanation: '20 : 4 = 5, mert 5 · 4 = 20. Öt zacskó lesz.'
  },
  {
    id: 'div4g2-q17',
    level: 2,
    questionTypeBadge: 'Csoport és maradék',
    figure: <GroupedFig n={14} groups={3} />,
    question: 'Hány négyes csoport lett, és mennyi maradt?',
    options: ['3 csoport, maradt 2', '2 csoport, maradt 6', '4 csoport, maradt 0', '3 csoport, maradt 1'],
    correctAnswer: 0,
    explanation: '3 karika = 12 korong. 14 − 12 = 2 maradt. Ellenőrzés: 3 · 4 + 2 = 14.'
  },
  {
    id: 'div4g2-q18',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig left="32 : 4" right="7" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '32 : 4 = 8. A 8 nagyobb, mint 7, ezért 32 : 4 > 7.'
  },
  {
    id: 'div4g2-q19',
    level: 2,
    questionTypeBadge: 'Melyik igaz?',
    question: 'Melyik osztás igaz?',
    options: ['12 : 4 = 3', '16 : 4 = 3', '8 : 4 = 4', '20 : 4 = 4'],
    correctAnswer: 0,
    explanation: 'Ellenőrizd szorzással: 3 · 4 = 12. A többi rossz: 16 : 4 = 4, 8 : 4 = 2, 20 : 4 = 5.'
  },
  {
    id: 'div4g2-q20',
    level: 2,
    questionTypeBadge: 'Hány ugrás?',
    figure: <JumpsFig target={40} />,
    question: 'A kenguru mindig 4-et ugrik. Hány ugrással ér a 40-re?',
    options: ['10', '9', '4', '20'],
    correctAnswer: 0,
    explanation: '40 : 4 = 10, mert 10 · 4 = 40. A 20 ugrás a 2-t ugró békáé lenne.'
  },

  // ---------- 3. szint ----------
  {
    id: 'div4g2-q21',
    level: 3,
    questionTypeBadge: 'Eper a tálkákban',
    figure: <DotsFig n={18} />,
    question: 'Anna 18 epret tesz 4 tálkába, egyformán. Hány jut egy tálkába? Mennyi marad?',
    options: ['4 jut, maradt 2', '3 jut, maradt 6', '5 jut, maradt 2', '4 jut, maradt 1'],
    correctAnswer: 0,
    explanation: '4 · 4 = 16, ez belefér a 18-ba. 18 − 16 = 2 eper marad. (5 · 4 = 20 már túl sok.)'
  },
  {
    id: 'div4g2-q22',
    level: 3,
    questionTypeBadge: 'Hány ketrec kell?',
    figure: <BunniesFig n={11} />,
    question: '11 kisnyúl van. Egy ketrecbe 4 fér. Hány ketrec kell, hogy mindegyik nyúl helyet kapjon?',
    options: ['3', '2', '4', '7'],
    correctAnswer: 0,
    explanation: '2 ketrecbe 8 nyúl fér, 3 nyúl kimarad. Nekik is kell egy ketrec: 3 ketrec kell.'
  },
  {
    id: 'div4g2-q23',
    level: 3,
    questionTypeBadge: 'Matricák',
    question: '4 gyerek 26 matricán osztozik egyformán. Hány matrica marad?',
    options: ['2', '6', '0', '4'],
    correctAnswer: 0,
    explanation: '6 · 4 = 24, mindenki 6-ot kap. 26 − 24 = 2 matrica marad.'
  },
  {
    id: 'div4g2-q24',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'A tálban 12 dió volt. Tettünk bele még 8-at. 4 mókus osztozik rajta egyformán. Mennyi jut egy mókusnak?',
    options: ['5', '11', '4', '20'],
    correctAnswer: 0,
    explanation: 'Előbb add össze: 12 + 8 = 20 dió. Aztán ossz: 20 : 4 = 5.'
  },
  {
    id: 'div4g2-q25',
    level: 3,
    questionTypeBadge: 'Visszafelé maradékkal',
    question: '5 négyes csoport lett, és maradt 3 korong. Hány korong volt?',
    options: ['23', '20', '17', '8'],
    correctAnswer: 0,
    explanation: '5 · 4 = 20 korong van a csoportokban. 20 + 3 = 23.'
  },
  {
    id: 'div4g2-q26',
    level: 3,
    questionTypeBadge: 'Számolólánc',
    figure: <ChainFig start={36} ops={[': 4', '+ 3']} />,
    question: 'Kezdd a 36-tal! Oszd el 4-gyel, aztán adj hozzá 3-at! Mit kapsz?',
    options: ['12', '9', '13', '39'],
    correctAnswer: 0,
    explanation: '36 : 4 = 9, és 9 + 3 = 12.'
  },
  {
    id: 'div4g2-q27',
    level: 3,
    questionTypeBadge: 'Mekkora a maradék?',
    question: 'Ha 4-gyel osztunk, melyik szám NEM lehet a maradék?',
    options: ['4', '3', '1', '2'],
    correctAnswer: 0,
    explanation: 'A maradék mindig kevesebb, mint 4. Ha 4 maradna, abból még egy csoport lenne!'
  },
  {
    id: 'div4g2-q28',
    level: 3,
    questionTypeBadge: 'Melyik szám negyede?',
    figure: <ArrowFig from="?" label="negyede" to="8" />,
    question: 'Melyik számnak a negyede a 8?',
    options: ['32', '2', '12', '4'],
    correctAnswer: 0,
    explanation: 'Szorozz vissza: 8 · 4 = 32. A 32 negyede 8.'
  },
  {
    id: 'div4g2-q29',
    level: 3,
    questionTypeBadge: 'Parkoló',
    figure: <CarFig wheels={24} />,
    question: 'A parkolóban az autóknak összesen 24 kereke van. Hány autó áll ott?',
    options: ['6', '20', '8', '28'],
    correctAnswer: 0,
    explanation: 'Egy autónak 4 kereke van. 24 : 4 = 6 autó.'
  },
  {
    id: 'div4g2-q30',
    level: 3,
    questionTypeBadge: 'Csomagolás',
    figure: <DotsFig n={30} color="#ec4899" />,
    question: 'Kata 30 cukrot 4-esével csomagol. Hány teli csomag lesz? Hány cukor marad?',
    options: ['7 csomag, maradt 2', '8 csomag, maradt 0', '6 csomag, maradt 6', '7 csomag, maradt 3'],
    correctAnswer: 0,
    explanation: '7 · 4 = 28, és 30 − 28 = 2. (8 · 4 = 32, az már több, mint 30.)'
  }
];

export const Div4G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="osztas"
    topicId="g2-osztas-4-quiz"
    subtopicId="osztas-4-gyel"
    title="3. Osztás 4-gyel – Kvíz"
    subtitle="30 feladat 3 szinten: csoportosítás és szétosztás, a 4-es bennfoglaló tábla, negyede, maradékos osztás 4-gyel."
    badge="2. OSZTÁLY • V. OSZTÁS • KVÍZ"
    questions={DIV4_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A 4-es bennfoglaló tábla',
        items: ['4 : 4 = 1, 8 : 4 = 2, 12 : 4 = 3', '16 : 4 = 4, 20 : 4 = 5, 24 : 4 = 6', '28 : 4 = 7, 32 : 4 = 8', '36 : 4 = 9, 40 : 4 = 10']
      },
      {
        title: 'Trükkök',
        items: ['Szorzás segít: 7 · 4 = 28 → 28 : 4 = 7', 'Felezd kétszer: 36 → 18 → 9', 'Negyede = 4 egyenlő rész', 'Ellenőrizz szorzással!']
      },
      {
        title: 'Maradékos osztás',
        items: ['Karikázz be négyesével!', '23 korong: 5 csoport, maradt 3', 'Ellenőrzés: 5 · 4 + 3 = 23', 'A maradék kevesebb, mint 4!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Div4G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Div4G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Div4G2Quiz;
