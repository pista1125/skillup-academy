import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Div8G2Matcher } from './Div8G2Matcher';
import { Div8G2Sorter } from './Div8G2Sorter';
import { DIV8_FONT, DotRowsPart, JumpLinePart, OctopusPart, PlatePart } from './Div8G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** n korong soronként 8-asával, az első `groups` sor bekarikázva. */
const GroupedDotsFig: React.FC<{ n: number; groups?: number }> = ({ n, groups = 0 }) => {
  const rows = Math.ceil(n / 8);
  const gap = 18;
  return (
    <QFig h={24 + rows * gap}>
      <DotRowsPart x={67} y={20} n={n} gap={gap} r={6} groups={groups} />
    </QFig>
  );
};

/** Számegyenes 0–80. `target`: csak az első ugrás és a célszám. */
const JumpsFig: React.FC<{ jumps?: number; target?: number }> = ({ jumps = 0, target }) => {
  const x = 16;
  const w = 222;
  const u = w / 80;
  return (
    <QFig h={110}>
      {target !== undefined ? (
        <>
          <JumpLinePart x={x} y={72} w={w} jumps={1} />
          <text x={x + 4 * u} y={40} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4f46e5">
            8
          </text>
          <line x1={x + 8 * u} y1={62} x2={x + target * u} y2={62} stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx={x + target * u} cy={72} r="5" fill={UNK} />
          <text x={x + target * u} y={52} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
            {target}
          </text>
        </>
      ) : (
        <JumpLinePart x={x} y={72} w={w} jumps={jumps} endQuestion />
      )}
    </QFig>
  );
};

/** total darab szétosztása 8 tányérra / gyereknek / karkötőre (mind „?”). */
const SharingFig: React.FC<{ total: number; kind: 'plate' | 'kid' | 'ring'; label: string }> = ({ total, kind, label }) => (
  <QFig h={124}>
    <rect x="70" y="8" width="120" height="26" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="130" y="27" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#78350f">
      {total} {label}
    </text>
    {Array.from({ length: 8 }, (_, i) => {
      const cx = 40 + (i % 4) * 60;
      const cy = 60 + Math.floor(i / 4) * 40;
      if (kind === 'plate') return <PlatePart key={i} cx={cx} cy={cy} w={50} question />;
      if (kind === 'ring')
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="15" fill="none" stroke="#a855f7" strokeWidth="4" />
            <text x={cx} y={cy + 6} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
              ?
            </text>
          </g>
        );
      return (
        <g key={i}>
          <circle cx={cx} cy={cy - 4} r="11" fill="#fde68a" stroke="#92400e" strokeWidth="1.8" />
          <circle cx={cx - 4} cy={cy - 6} r="1.6" fill="#1e293b" />
          <circle cx={cx + 4} cy={cy - 6} r="1.6" fill="#1e293b" />
          <path d={`M ${cx - 4} ${cy - 1} Q ${cx} ${cy + 3} ${cx + 4} ${cy - 1}`} fill="none" stroke="#1e293b" strokeWidth="1.4" />
          <text x={cx + 20} y={cy + 2} textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>
            ?
          </text>
        </g>
      );
    })}
  </QFig>
);

/** rows sor, soronként 8 korong. */
const ArrayFig: React.FC<{ rows: number }> = ({ rows }) => {
  const gap = rows > 5 ? 12 : 16;
  return (
    <QFig h={26 + rows * gap}>
      {Array.from({ length: rows * 8 }, (_, i) => (
        <circle
          key={i}
          cx={130 - (7 * gap) / 2 + (i % 8) * gap}
          cy={20 + Math.floor(i / 8) * gap}
          r={gap * 0.36}
          fill="#6366f1"
          stroke="#1e293b"
          strokeWidth="1"
        />
      ))}
    </QFig>
  );
};

/** start —nyolcada→ ? */
const ArrowFig: React.FC<{ start: number }> = ({ start }) => (
  <QFig h={96}>
    <defs>
      <marker id="div8q-arr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#e11d48" />
      </marker>
    </defs>
    <circle cx="60" cy="56" r="26" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
    <text x="60" y="65" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#7c2d12">
      {start}
    </text>
    <path d="M 90 56 L 166 56" stroke="#e11d48" strokeWidth="3.5" markerEnd="url(#div8q-arr)" />
    <text x="128" y="42" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#e11d48">
      nyolcada
    </text>
    <circle cx="200" cy="56" r="26" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" />
    <text x="200" y="65" textAnchor="middle" fontSize="26" fontWeight="bold" fill={UNK}>
      ?
    </text>
  </QFig>
);

/** ? · polip = total kar */
const OctopusFig: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={96}>
    <text x="46" y="58" textAnchor="middle" fontSize="30" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <text x="72" y="58" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#334155">
      ·
    </text>
    <OctopusPart cx={112} cy={44} s={1.1} />
    <text x="196" y="58" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">
      = {total}
    </text>
    <text x="196" y="80" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
      kar
    </text>
  </QFig>
);

/** Felezés háromszor. */
const HalveFig: React.FC<{ start: number }> = ({ start }) => {
  const vals = [start, start / 2, start / 4];
  return (
    <QFig h={84}>
      {vals.map((v, i) => (
        <g key={i}>
          <rect x={14 + i * 62} y={26} width="44" height="36" rx="8" fill="#ffffff" stroke="#0369a1" strokeWidth="2.5" />
          <text x={36 + i * 62} y={51} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0c4a6e">
            {v}
          </text>
          <text x={67 + i * 62} y={50} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">
            →
          </text>
          <text x={67 + i * 62} y={24} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">
            fele
          </text>
        </g>
      ))}
      <rect x={200} y={26} width="44" height="36" rx="8" fill="#fde68a" stroke="#0369a1" strokeWidth="2.5" />
      <text x={222} y={51} textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>
        ?
      </text>
    </QFig>
  );
};

/** 8 matrica, együtt 64 Ft. */
const StickersFig: React.FC = () => (
  <QFig h={100}>
    {Array.from({ length: 8 }, (_, i) => {
      const cx = 30 + i * 29;
      const pts = Array.from({ length: 10 }, (_, k) => {
        const a = (Math.PI / 5) * k - Math.PI / 2;
        const rr = k % 2 === 0 ? 12 : 5;
        return `${(cx + rr * Math.cos(a)).toFixed(1)},${(38 + rr * Math.sin(a)).toFixed(1)}`;
      }).join(' ');
      return <polygon key={i} points={pts} fill="#facc15" stroke="#a16207" strokeWidth="1.5" />;
    })}
    <rect x="76" y="62" width="108" height="24" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="130" y="79" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
      8 db: 64 Ft
    </text>
  </QFig>
);

/** Lufi 8 Ft, 50 Ft-os érme. */
const BalloonFig: React.FC = () => (
  <QFig h={110}>
    <ellipse cx="70" cy="42" rx="22" ry="27" fill="#f87171" stroke="#991b1b" strokeWidth="2" />
    <polygon points="66,68 74,68 70,74" fill="#991b1b" />
    <path d="M 70 74 Q 64 86 72 100" fill="none" stroke="#475569" strokeWidth="1.8" />
    <rect x="98" y="34" width="70" height="22" rx="11" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="133" y="50" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">
      1 db: 8 Ft
    </text>
    <circle cx="214" cy="55" r="28" fill="#fcd34d" stroke="#a16207" strokeWidth="3" />
    <circle cx="214" cy="55" r="22" fill="none" stroke="#a16207" strokeWidth="1.5" />
    <text x="214" y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#713f12">
      50
    </text>
    <text x="214" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">
      Ft
    </text>
  </QFig>
);

/** Ádám 72 matricája = 8 egyforma rész; Zsófinak 1 rész. */
const BarsFig: React.FC = () => {
  const u = 22;
  return (
    <QFig h={104}>
      <text x="12" y="34" fontSize="13" fontWeight="bold" fill="#334155">
        Zsófi
      </text>
      <rect x={64} y={18} width={u} height="22" rx="3" fill="#a5b4fc" stroke="#3730a3" strokeWidth="1.8" />
      <text x={64 + u / 2} y={34} textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>
        ?
      </text>
      <text x="12" y="74" fontSize="13" fontWeight="bold" fill="#334155">
        Ádám
      </text>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={64 + i * u} y={58} width={u} height="22" rx="3" fill="#fdba74" stroke="#9a3412" strokeWidth="1.8" />
      ))}
      <path d={`M 64 86 L 64 92 L ${64 + 8 * u} 92 L ${64 + 8 * u} 86`} fill="none" stroke="#334155" strokeWidth="1.8" />
      <text x={64 + 4 * u} y={102} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        72
      </text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIV8_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'div8g2-q1',
    level: 1,
    questionTypeBadge: 'Csoportosítás',
    figure: <GroupedDotsFig n={24} groups={3} />,
    question: 'A golyókat nyolcasával karikáztuk be. Hány nyolcas csoport lett?',
    options: ['3', '4', '16', '2'],
    correctAnswer: 0,
    explanation: '3 karika van, mindegyikben 8 golyó. 24 : 8 = 3, mert 3 · 8 = 24.'
  },
  {
    id: 'div8g2-q2',
    level: 1,
    questionTypeBadge: 'Ugrások',
    figure: <JumpsFig jumps={5} />,
    question: 'Mennyi 40 : 8?',
    options: ['5', '32', '4', '48'],
    correctAnswer: 0,
    explanation: '5 nyolcas ugrás vezet a 40-hez. 40 : 8 = 5, mert 5 · 8 = 40.'
  },
  {
    id: 'div8g2-q3',
    level: 1,
    questionTypeBadge: 'Szétosztás',
    figure: <SharingFig total={16} kind="plate" label="süti" />,
    question: '16 sütit 8 tányérra osztunk egyenlően. Mennyi jut egy tányérra?',
    options: ['2', '8', '4', '24'],
    correctAnswer: 0,
    explanation: 'Minden tányér kap egyet, aztán még egyet. 16 : 8 = 2.'
  },
  {
    id: 'div8g2-q4',
    level: 1,
    questionTypeBadge: 'Egy nyolcas',
    question: 'Mennyi 8 : 8?',
    options: ['1', '0', '8', '16'],
    correctAnswer: 0,
    explanation: 'A 8-ban egy nyolcas van. 8 : 8 = 1, mert 1 · 8 = 8.'
  },
  {
    id: 'div8g2-q5',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: 'Mennyi 0 : 8?',
    options: ['0', '8', '1', '80'],
    correctAnswer: 0,
    explanation: 'Ha nincs süti, senkinek sem jut. 0 : 8 = 0, mert 0 · 8 = 0.'
  },
  {
    id: 'div8g2-q6',
    level: 1,
    questionTypeBadge: 'Szorzás segít',
    figure: <ArrayFig rows={6} />,
    question: '6 · 8 = 48. Mennyi 48 : 8?',
    options: ['6', '8', '40', '7'],
    correctAnswer: 0,
    explanation: 'A szorzás visszafelé: 6 sor, soronként 8. 48 : 8 = 6.'
  },
  {
    id: 'div8g2-q7',
    level: 1,
    questionTypeBadge: 'Nyolcada',
    figure: <ArrowFig start={32} />,
    question: 'Mennyi a 32 nyolcada?',
    options: ['4', '24', '8', '3'],
    correctAnswer: 0,
    explanation: 'A nyolcada: 32 : 8 = 4, mert 4 · 8 = 32. A 24 rossz: ott 8-at vontál ki.'
  },
  {
    id: 'div8g2-q8',
    level: 1,
    questionTypeBadge: 'Polipok',
    figure: <OctopusFig total={56} />,
    question: 'Egy polipnak 8 karja van. 56 kart látsz. Hány polip úszik ott?',
    options: ['7', '6', '8', '48'],
    correctAnswer: 0,
    explanation: 'Nyolcasával 56-ig: 8, 16, 24, 32, 40, 48, 56. Ez 7 polip. 56 : 8 = 7.'
  },
  {
    id: 'div8g2-q9',
    level: 1,
    questionTypeBadge: 'Tíz nyolcas',
    question: 'Mennyi 80 : 8?',
    options: ['10', '72', '8', '1'],
    correctAnswer: 0,
    explanation: '10 · 8 = 80, ezért 80 : 8 = 10.'
  },
  {
    id: 'div8g2-q10',
    level: 1,
    questionTypeBadge: 'Maradék',
    figure: <GroupedDotsFig n={19} groups={2} />,
    question: 'Hány korong maradt ki a karikákból?',
    options: ['3', '2', '8', '5'],
    correctAnswer: 0,
    explanation: '2 karika = 16 korong. 19 − 16 = 3 maradt ki. Ez a maradék.'
  },

  // ----- 2. szint -----
  {
    id: 'div8g2-q11',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Mi kerül a □ helyére? □ : 8 = 7',
    options: ['56', '15', '1', '49'],
    correctAnswer: 0,
    explanation: 'Melyik számban van 7 nyolcas? 7 · 8 = 56. A 15 rossz: az 7 + 8.'
  },
  {
    id: 'div8g2-q12',
    level: 2,
    questionTypeBadge: 'Felezd háromszor',
    figure: <HalveFig start={64} />,
    question: 'Mennyi 64 : 8? Felezd háromszor!',
    options: ['8', '16', '4', '56'],
    correctAnswer: 0,
    explanation: '64 fele 32, annak fele 16, annak fele 8. Tehát 64 : 8 = 8.'
  },
  {
    id: 'div8g2-q13',
    level: 2,
    questionTypeBadge: 'Csoport és maradék',
    figure: <GroupedDotsFig n={30} groups={3} />,
    question: 'Hány nyolcas csoport lett, és mennyi maradt?',
    options: ['3 csoport, maradt 6', '2 csoport, maradt 14', '4 csoport, maradt 2', '3 csoport, maradt 5'],
    correctAnswer: 0,
    explanation: '3 karika = 24 korong. 30 − 24 = 6 maradt. Ellenőrzés: 3 · 8 + 6 = 30.'
  },
  {
    id: 'div8g2-q14',
    level: 2,
    questionTypeBadge: 'Szőlő 8 gyereknek',
    figure: <SharingFig total={72} kind="kid" label="szem szőlő" />,
    question: '8 gyerek 72 szem szőlőn osztozik egyenlően. Hány szem jut egy gyereknek?',
    options: ['9', '64', '8', '80'],
    correctAnswer: 0,
    explanation: '72 : 8 = 9, mert 9 · 8 = 72. Mindenki 9 szemet kap.'
  },
  {
    id: 'div8g2-q15',
    level: 2,
    questionTypeBadge: 'Melyik jel?',
    question: 'Melyik jel kerül a ○ helyére? 56 : 8 ○ 6',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '56 : 8 = 7. A 7 több, mint 6, ezért 56 : 8 > 6.'
  },
  {
    id: 'div8g2-q16',
    level: 2,
    questionTypeBadge: 'Szorzásból osztás',
    figure: <ArrayFig rows={5} />,
    question: '5 · 8 = 40. Melyik osztás igaz?',
    options: ['40 : 8 = 5', '40 : 8 = 32', '5 : 8 = 40', '40 : 8 = 6'],
    correctAnswer: 0,
    explanation: '5 sor, soronként 8 korong: 40. Ha 40-et nyolcasával rakunk, 5 sor lesz. 40 : 8 = 5.'
  },
  {
    id: 'div8g2-q17',
    level: 2,
    questionTypeBadge: 'Egy darab ára',
    figure: <StickersFig />,
    question: '8 egyforma matrica 64 Ft. Mennyibe kerül 1 matrica?',
    options: ['8 Ft', '56 Ft', '72 Ft', '6 Ft'],
    correctAnswer: 0,
    explanation: '64 : 8 = 8. Egy matrica 8 Ft. Ellenőrzés: 8 · 8 = 64.'
  },
  {
    id: 'div8g2-q18',
    level: 2,
    questionTypeBadge: 'Szétosztás maradékkal',
    figure: <GroupedDotsFig n={27} />,
    question: '8 nyuszi között 27 répát osztunk el egyenlően. Mennyi jut egy nyuszinak, és mennyi marad?',
    options: ['3 jut, maradt 3', '2 jut, maradt 11', '4 jut, maradt 0', '3 jut, maradt 2'],
    correctAnswer: 0,
    explanation: 'Minden sor egy kör: mind a 8 nyuszi kap 1 répát. 3 teli sor van, és 3 répa marad. 3 · 8 + 3 = 27.'
  },
  {
    id: 'div8g2-q19',
    level: 2,
    questionTypeBadge: 'Hány ugrás?',
    figure: <JumpsFig target={48} />,
    question: 'Hány 8-as ugrás visz 0-tól 48-ig?',
    options: ['6', '5', '8', '40'],
    correctAnswer: 0,
    explanation: '8, 16, 24, 32, 40, 48: ez 6 ugrás. 48 : 8 = 6.'
  },
  {
    id: 'div8g2-q20',
    level: 2,
    questionTypeBadge: 'Mekkora a maradék?',
    question: 'Ha 8-cal osztunk, melyik szám NEM lehet a maradék?',
    options: ['8', '7', '0', '5'],
    correctAnswer: 0,
    explanation: 'A maradék mindig kevesebb, mint 8. Ha 8 maradna, abból még egy csoport lenne!'
  },

  // ----- 3. szint -----
  {
    id: 'div8g2-q21',
    level: 3,
    questionTypeBadge: 'Hány asztal kell?',
    figure: <GroupedDotsFig n={38} groups={4} />,
    question: '38 gyerek ül le. Egy asztalhoz 8 gyerek fér. Hány asztal kell, hogy mindenki leüljön?',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: '4 asztal tele lesz (4 · 8 = 32). 6 gyerek marad, nekik is kell egy asztal. 4 + 1 = 5 asztal.'
  },
  {
    id: 'div8g2-q22',
    level: 3,
    questionTypeBadge: 'Visszafelé maradékkal',
    question: '5 nyolcas csoport lett, és maradt 3 korong. Hány korong volt?',
    options: ['43', '40', '16', '35'],
    correctAnswer: 0,
    explanation: '5 · 8 = 40, és még 3 maradt: 40 + 3 = 43.'
  },
  {
    id: 'div8g2-q23',
    level: 3,
    questionTypeBadge: 'Lufik',
    figure: <BalloonFig />,
    question: 'Egy lufi 8 Ft. Petrának 50 Ft-ja van. Legfeljebb hány lufit vehet, és mennyi pénze marad?',
    options: ['6 lufi, marad 2 Ft', '5 lufi, marad 10 Ft', '7 lufi, marad 0 Ft', '6 lufi, marad 8 Ft'],
    correctAnswer: 0,
    explanation: '6 · 8 = 48 Ft, a 7 · 8 = 56 Ft már sok. 50 − 48 = 2 Ft marad.'
  },
  {
    id: 'div8g2-q24',
    level: 3,
    questionTypeBadge: 'Karkötők',
    figure: <SharingFig total={48} kind="ring" label="gyöngy" />,
    question: 'Lilla 48 gyöngyből 8 egyforma karkötőt fűz. Hány gyöngy kerül egy karkötőre?',
    options: ['6', '40', '8', '56'],
    correctAnswer: 0,
    explanation: '48 : 8 = 6, mert 6 · 8 = 48. Minden karkötőre 6 gyöngy kerül.'
  },
  {
    id: 'div8g2-q25',
    level: 3,
    questionTypeBadge: 'Nyolcszor annyi',
    figure: <BarsFig />,
    question: 'Ádámnak 72 matricája van. Ez 8-szor annyi, mint Zsófié. Hány matricája van Zsófinak?',
    options: ['9', '64', '80', '8'],
    correctAnswer: 0,
    explanation: 'Ádám 72 matricája 8 egyforma rész. Egy rész: 72 : 8 = 9. Zsófinak 9 van.'
  },
  {
    id: 'div8g2-q26',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'A tálon 40 süti van. 8-at félreteszünk. A többit 8 gyerek kapja egyenlően. Mennyi jut egy gyereknek?',
    options: ['4', '5', '3', '32'],
    correctAnswer: 0,
    explanation: '40 − 8 = 32 süti marad. 32 : 8 = 4. Egy gyereknek 4 jut.'
  },
  {
    id: 'div8g2-q27',
    level: 3,
    questionTypeBadge: 'Nincs maradék',
    question: 'Melyik számot lehet maradék nélkül nyolcasával csoportosítani?',
    options: ['56', '50', '60', '70'],
    correctAnswer: 0,
    explanation: '56 = 7 · 8, nem marad semmi. 50-ből 2, 60-ból 4, 70-ből 6 marad.'
  },
  {
    id: 'div8g2-q28',
    level: 3,
    questionTypeBadge: 'Felezd háromszor',
    figure: <HalveFig start={80} />,
    question: '80 fele 40, annak fele 20. Mennyi 80 : 8?',
    options: ['10', '20', '5', '72'],
    correctAnswer: 0,
    explanation: 'Még egyszer felezz: 20 fele 10. Tehát 80 : 8 = 10.'
  },
  {
    id: 'div8g2-q29',
    level: 3,
    questionTypeBadge: 'Csoport és maradék',
    figure: <GroupedDotsFig n={45} />,
    question: '45 korongot rakunk nyolcasával. Hány csoport lesz, és mennyi marad?',
    options: ['5 csoport, maradt 5', '4 csoport, maradt 13', '6 csoport, maradt 0', '5 csoport, maradt 4'],
    correctAnswer: 0,
    explanation: '5 · 8 = 40, a 6 · 8 = 48 már sok. 45 − 40 = 5 marad. Ellenőrzés: 5 · 8 + 5 = 45.'
  },
  {
    id: 'div8g2-q30',
    level: 3,
    questionTypeBadge: 'Hány kisbusz kell?',
    question: 'Egy kisbuszba 8 gyerek fér. 34 gyerek kirándul. Hány kisbusz kell?',
    options: ['5', '4', '2', '6'],
    correctAnswer: 0,
    explanation: '4 kisbusz tele lesz (4 · 8 = 32). 2 gyerek marad, nekik is kell egy busz: 5 kisbusz.'
  }
];

export const Div8G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="osztas"
    topicId="g2-osztas-8-quiz"
    subtopicId="osztas-8-cal"
    title="7. Osztás 8-cal – Kvíz"
    subtitle="30 feladat 3 szinten: csoportosítás és szétosztás, a 8-as bennfoglaló tábla, nyolcada, maradékos osztás 8-cal."
    badge="2. OSZTÁLY • V. OSZTÁS • KVÍZ"
    questions={DIV8_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Osztás 8-cal',
        items: ['16 : 8 = 2, 24 : 8 = 3, 32 : 8 = 4', '40 : 8 = 5, 48 : 8 = 6, 56 : 8 = 7', '64 : 8 = 8, 72 : 8 = 9', '80 : 8 = 10'],
      },
      {
        title: 'Nyolcada',
        items: ['Szorzás segít: 7 · 8 = 56 → 56 : 8 = 7', 'Felezd háromszor!', '48 → 24 → 12 → 6', '0 : 8 = 0, 8 : 8 = 1']
      },
      {
        title: 'Maradékos osztás',
        items: ['Karikázz be nyolcasával!', '35 korong: 4 csoport, maradt 3', 'Ellenőrzés: 4 · 8 + 3 = 35', 'A maradék kevesebb, mint 8!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Div8G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Div8G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Div8G2Quiz;
