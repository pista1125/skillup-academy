import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Sub20G2Matcher } from './Sub20G2Matcher';
import { Sub20G2Sorter } from './Sub20G2Sorter';
import { SUB20_FONT, TwentyFrameSubPart, NumberLine020SubPart } from './Sub20G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 115 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** 2 × 10-es keret kivonáshoz (nem mutatja a választ). */
const FrameQFig: React.FC<{ total: number; crossed: number; note?: string }> = ({ total, crossed, note }) => (
  <QFig h={note ? 96 : 80}>
    <TwentyFrameSubPart x={18} y={14} cell={22} total={total} crossed={crossed} highlightTenRow />
    {note && (
      <text x="130" y="84" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#334155">
        {note}
      </text>
    )}
  </QFig>
);

/** 0–20-as számegyenes kérdéshez. */
const LineQFig: React.FC<{
  labels: number[];
  hops: { from: number; to: number; label: string; color: string }[];
  dots: { v: number; color: string }[];
}> = ({ labels, hops, dots }) => (
  <QFig h={110}>
    <NumberLine020SubPart x0={16} x1={236} y={66} labels={labels} hops={hops} dots={dots} />
  </QFig>
);

/** 20-as kivonókerék-szelet kérdéshez. */
const WheelQFig: React.FC<{ subLabel: string; outLabel: string }> = ({ subLabel, outLabel }) => (
  <QFig h={96}>
    <rect x="30" y="26" width="48" height="44" rx="8" fill="#facc15" stroke="#854d0e" strokeWidth="2.5" />
    <text x="54" y="55" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">20</text>
    <line x1="84" y1="48" x2="170" y2="48" stroke="#475569" strokeWidth="2.5" />
    <path d="M 164 41 L 173 48 L 164 55" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="102" y="20" width="48" height="22" rx="6" fill="#fef3c7" stroke="#f59e0b" />
    <text x="126" y="36" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b45309">{subLabel}</text>
    <circle cx="204" cy="48" r="22" fill={outLabel === '?' ? '#fee2e2' : '#ffffff'} stroke={outLabel === '?' ? UNK : '#0f172a'} strokeWidth="2.5" />
    <text x="204" y="55" textAnchor="middle" fontSize="19" fontWeight="bold" fill={outLabel === '?' ? UNK : '#0f172a'}>{outLabel}</text>
  </QFig>
);

/** Kétoldali mérleg kérdéshez. */
const BalanceQFig: React.FC<{ leftExpr: string; rightExpr: string; eq?: boolean }> = ({
  leftExpr,
  rightExpr,
  eq = true
}) => (
  <QFig h={104}>
    <polygon points="130,68 116,94 144,94" fill="#475569" />
    <line x1="36" y1="68" x2="224" y2="68" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
    <rect x="20" y="22" width="84" height="38" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    <text x="62" y="47" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e3a8a">{leftExpr}</text>
    <text x="130" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{eq ? '=' : '□'}</text>
    <rect x="156" y="22" width="84" height="38" rx="8" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="198" y="47" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#991b1b">{rightExpr}</text>
  </QFig>
);

/** Bontás ága: 14 - 7 = 14 - 4 - ? */
const DecompQFig: React.FC<{ total: number; sub: number; firstStep: number }> = ({
  total,
  sub,
  firstStep
}) => (
  <QFig h={105}>
    <text x="130" y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">
      {total} − <tspan fill={UNK}>{sub}</tspan>
    </text>
    <line x1="142" y1="38" x2="116" y2="56" stroke={UNK} strokeWidth="2" />
    <line x1="148" y1="38" x2="174" y2="56" stroke={UNK} strokeWidth="2" />
    <text x="130" y="80" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">
      {total} − <tspan fill="#16a34a">{firstStep}</tspan> − <tspan fill={UNK}>□</tspan>
    </text>
  </QFig>
);

/** Szabálytábla kérdéshez. */
const RuleTableQFig: React.FC<{ rule: string; ins: number[]; outs: string[] }> = ({
  rule,
  ins,
  outs
}) => (
  <QFig h={96}>
    <text x="130" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f766e">
      Szabály: {rule}
    </text>
    <rect x="18" y="30" width="60" height="26" fill="#ccfbf1" stroke="#0d9488" />
    <text x="48" y="48" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#134e4a">Bemenet</text>
    <rect x="18" y="56" width="60" height="26" fill="#f0fdfa" stroke="#0d9488" />
    <text x="48" y="74" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#134e4a">Kimenet</text>
    {ins.map((v, i) => {
      const isQ = outs[i] === '?';
      return (
        <g key={i}>
          <rect x={78 + i * 54} y="30" width="54" height="26" fill="#ffffff" stroke="#0d9488" />
          <text x={105 + i * 54} y="48" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{v}</text>
          <rect x={78 + i * 54} y="56" width="54" height="26" fill={isQ ? '#fee2e2' : '#ffffff'} stroke="#0d9488" />
          <text x={105 + i * 54} y="74" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isQ ? UNK : '#0f172a'}>{outs[i]}</text>
        </g>
      );
    })}
  </QFig>
);

/** Műveletlánc kérdéshez. */
const ChainQFig: React.FC<{
  vals: string[];
  ops: string[];
}> = ({ vals, ops }) => {
  const xs = [28, 80, 132, 184, 232];
  return (
    <QFig h={100}>
      {ops.map((op, i) => {
        const mx = (xs[i] + xs[i + 1]) / 2;
        const isAdd = op.startsWith('+');
        const col = isAdd ? '#16a34a' : '#dc2626';
        return (
          <g key={i}>
            <path d={`M ${xs[i] + 12} 46 Q ${mx} 26 ${xs[i + 1] - 13} 46`} fill="none" stroke={col} strokeWidth="1.8" />
            <text x={mx} y="30" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={col}>{op}</text>
          </g>
        );
      })}
      {vals.map((v, i) => {
        const isQ = v === '?';
        return (
          <g key={i}>
            <rect x={xs[i] - 13} y="48" width="26" height="26" rx="5" fill={isQ ? '#fee2e2' : '#ffffff'} stroke={isQ ? UNK : '#475569'} strokeWidth="1.8" />
            <text x={xs[i]} y="66" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={isQ ? UNK : '#0f172a'}>{v}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Hiányzó szám kártya. */
const BoxEqQFig: React.FC<{ expr: string }> = ({ expr }) => (
  <QFig h={76}>
    <rect x="24" y="16" width="212" height="44" rx="10" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
    <text x="130" y="45" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{expr}</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// 30 kérdés (10 / szint)
// ---------------------------------------------------------------------------
export const SUB20_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 's20g2-q1',
    level: 1,
    questionTypeBadge: 'Visszalépés 10-re',
    figure: <FrameQFig total={14} crossed={4} note="14 korongból 4-et áthúztunk." />,
    question: 'Mennyi marad? 14 − 4 = ?',
    options: ['10', '11', '9', '4'],
    correctAnswer: 0,
    explanation: 'A 14-ből elvesszük a 4 egyest, így pontosan a teljes tízes marad: 14 − 4 = 10.'
  },
  {
    id: 's20g2-q2',
    level: 1,
    questionTypeBadge: '10 elvétele',
    figure: <FrameQFig total={17} crossed={10} note="17 korongból 10-et elvettünk." />,
    question: 'Mennyi 17 − 10?',
    options: ['7', '10', '17', '8'],
    correctAnswer: 0,
    explanation: 'Ha a 17-ből elvesszük a 10-et, csak a 7 egyes marad: 17 − 10 = 7.'
  },
  {
    id: 's20g2-q3',
    level: 1,
    questionTypeBadge: 'Tízesátlépés nélkül',
    question: 'Tudod, hogy 9 − 4 = 5. Mennyi akkor 19 − 4?',
    options: ['15', '14', '5', '16'],
    correctAnswer: 0,
    explanation: 'A tízes megmarad, csak az egyesekből veszünk el: 9 − 4 = 5, ezért 19 − 4 = 15.'
  },
  {
    id: 's20g2-q4',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: (
      <LineQFig
        labels={[0, 10, 18, 20]}
        hops={[{ from: 18, to: 13, label: '−5', color: '#dc2626' }]}
        dots={[{ v: 18, color: '#0f172a' }, { v: 13, color: '#dc2626' }]}
      />
    ),
    question: 'A 18-ról 5-öt lépünk vissza. Melyik számhoz érünk?',
    options: ['13', '14', '12', '15'],
    correctAnswer: 0,
    explanation: '8 − 5 = 3, így 18 − 5 = 13.'
  },
  {
    id: 's20g2-q5',
    level: 1,
    questionTypeBadge: '20-as keret',
    figure: <FrameQFig total={16} crossed={4} note="Hány korong maradt?" />,
    question: 'Mennyi 16 − 4?',
    options: ['12', '13', '11', '20'],
    correctAnswer: 0,
    explanation: '6 − 4 = 2, a 10 pedig megmarad. Ezért 16 − 4 = 12.'
  },
  {
    id: 's20g2-q6',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Kiszámoltad, hogy 17 − 5 = 12. Melyik összeadással ellenőrzöd?',
    options: ['12 + 5 = 17', '12 + 8 = 20', '17 − 12 = 5', '7 + 5 = 12'],
    correctAnswer: 0,
    explanation: 'A különbséget és a kivonandót adjuk össze: 12 + 5 = 17.'
  },
  {
    id: 's20g2-q7',
    level: 1,
    questionTypeBadge: 'Tízesátlépés nélkül',
    question: 'Mennyi 15 − 15?',
    options: ['0', '1', '15', '10'],
    correctAnswer: 0,
    explanation: 'Ha egy számból pontosan önmagát vesszük el, nem marad semmi: 15 − 15 = 0.'
  },
  {
    id: 's20g2-q8',
    level: 1,
    questionTypeBadge: '0 kivonása',
    question: 'Mennyi 19 − 0?',
    options: ['19', '0', '18', '9'],
    correctAnswer: 0,
    explanation: 'Ha 0-t vonunk ki, nem veszünk el semmit, tehát 19 marad.'
  },
  {
    id: 's20g2-q9',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: (
      <LineQFig
        labels={[0, 5, 11, 16, 20]}
        hops={[{ from: 16, to: 11, label: '−?', color: '#dc2626' }]}
        dots={[{ v: 16, color: '#0f172a' }, { v: 11, color: '#16a34a' }]}
      />
    ),
    question: 'A 16-ról a 11-re léptünk vissza. Mennyit vontunk ki?',
    options: ['5', '6', '4', '7'],
    correctAnswer: 0,
    explanation: '16 − 11 = 5, tehát 5-öt léptünk vissza. Ellenőrzés: 11 + 5 = 16.'
  },
  {
    id: 's20g2-q10',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <BalanceQFig leftExpr="17 − 5" rightExpr="14 − 2" eq={false} />,
    question: 'Melyik jel kerül a □ helyére? 17 − 5 □ 14 − 2',
    options: ['=', '<', '>', '+'],
    correctAnswer: 0,
    explanation: '17 − 5 = 12, és 14 − 2 = 12 is. A két oldal egyenlő!'
  },

  // ---------------- 2. szint ----------------
  {
    id: 's20g2-q11',
    level: 2,
    questionTypeBadge: 'Tízesátlépés',
    figure: <FrameQFig total={13} crossed={5} note="13 korongból 5-öt áthúztunk." />,
    question: 'Mennyi 13 − 5?',
    options: ['8', '9', '7', '18'],
    correctAnswer: 0,
    explanation: 'Előbb 10-re lépünk: 13 − 3 = 10, aztán még 2-t elveszünk: 10 − 2 = 8.'
  },
  {
    id: 's20g2-q12',
    level: 2,
    questionTypeBadge: 'Bontás 10-re',
    figure: <DecompQFig total={14} sub={7} firstStep={4} />,
    question: 'Hogyan bontod tovább? 14 − 7 = 14 − 4 − □',
    options: ['3', '4', '2', '7'],
    correctAnswer: 0,
    explanation: 'A 7-et 4-re és 3-ra bontjuk (4 + 3 = 7). Így 14 − 4 − 3 = 10 − 3 = 7.'
  },
  {
    id: 's20g2-q13',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: (
      <LineQFig
        labels={[0, 7, 10, 15, 20]}
        hops={[
          { from: 15, to: 10, label: '−5', color: '#16a34a' },
          { from: 10, to: 7, label: '−3', color: '#dc2626' }
        ]}
        dots={[{ v: 15, color: '#0f172a' }, { v: 10, color: '#16a34a' }, { v: 7, color: '#dc2626' }]}
      />
    ),
    question: 'Mennyi 15 − 8?',
    options: ['7', '8', '6', '9'],
    correctAnswer: 0,
    explanation: '15 − 5 = 10, aztán 10 − 3 = 7. Vagyis 15 − 8 = 7.'
  },
  {
    id: 's20g2-q14',
    level: 2,
    questionTypeBadge: 'Tízesátlépés',
    question: 'Mennyi 12 − 6?',
    options: ['6', '7', '5', '8'],
    correctAnswer: 0,
    explanation: '12 − 2 = 10, és 10 − 4 = 6. Ellenőrzés: 6 + 6 = 12.'
  },
  {
    id: 's20g2-q15',
    level: 2,
    questionTypeBadge: 'Kivonókerék',
    figure: <WheelQFig subLabel="−7" outLabel="?" />,
    question: 'Mit írunk a 20-as kivonókeréken a ? helyére?',
    options: ['13', '14', '12', '7'],
    correctAnswer: 0,
    explanation: '20 − 7 = 13, mert 13 + 7 = 20.'
  },
  {
    id: 's20g2-q16',
    level: 2,
    questionTypeBadge: '20-as keret',
    figure: <FrameQFig total={11} crossed={4} note="11 korongból 4-et áthúztunk." />,
    question: 'Mennyi 11 − 4?',
    options: ['7', '8', '6', '15'],
    correctAnswer: 0,
    explanation: '11 − 1 = 10, aztán még 3-at elveszünk: 10 − 3 = 7.'
  },
  {
    id: 's20g2-q17',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik összeadás igazolja, hogy 14 − 8 = 6?',
    options: ['6 + 8 = 14', '14 + 6 = 20', '8 + 8 = 16', '6 + 6 = 12'],
    correctAnswer: 0,
    explanation: 'A különbség (6) és a kivonandó (8) összege a kisebbítendőt (14) adja: 6 + 8 = 14.'
  },
  {
    id: 's20g2-q18',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <BalanceQFig leftExpr="15 − 7" rightExpr="16 − 9" eq={false} />,
    question: 'Melyik jel kerül középre? 15 − 7 □ 16 − 9',
    options: ['>', '<', '=', '−'],
    correctAnswer: 0,
    explanation: '15 − 7 = 8, és 16 − 9 = 7. Mivel 8 nagyobb, mint 7, a > jel a helyes.'
  },
  {
    id: 's20g2-q19',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám hiányzik? 16 − □ = 9',
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    explanation: '16-ból 7-et kell elvenni, hogy 9 maradjon: 16 − 7 = 9 (és 9 + 7 = 16).'
  },
  {
    id: 's20g2-q20',
    level: 2,
    questionTypeBadge: 'Szabálytábla',
    figure: <RuleTableQFig rule="− 6" ins={[14, 11, 13]} outs={['8', '5', '?']} />,
    question: 'A táblázat szabálya: − 6. Melyik szám kerül a ? helyére?',
    options: ['7', '6', '8', '19'],
    correctAnswer: 0,
    explanation: '13 − 6 = 13 − 3 − 3 = 10 − 3 = 7.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 's20g2-q21',
    level: 3,
    questionTypeBadge: 'Kétjegyű − kétjegyű',
    figure: (
      <LineQFig
        labels={[0, 5, 10, 18, 20]}
        hops={[
          { from: 18, to: 10, label: '−8', color: '#16a34a' },
          { from: 10, to: 5, label: '−5', color: '#7c3aed' }
        ]}
        dots={[{ v: 18, color: '#0f172a' }, { v: 10, color: '#16a34a' }, { v: 5, color: '#7c3aed' }]}
      />
    ),
    question: 'Mennyi 18 − 13?',
    options: ['5', '6', '4', '15'],
    correctAnswer: 0,
    explanation: '18 − 8 = 10, majd még 5-öt elveszünk: 10 − 5 = 5. (Vagy 18 − 10 − 3 = 5.)'
  },
  {
    id: 's20g2-q22',
    level: 3,
    questionTypeBadge: 'Stratégia',
    question: 'Hogyan számolod ki a 16 − 12-t, ha előbb 10-re lépsz vissza?',
    options: ['16 − 6 − 6', '16 − 6 − 2', '16 − 10 − 6', '16 − 2 − 6'],
    correctAnswer: 0,
    explanation: '16 − 6 = 10. A 12-ből még 6 maradt (6 + 6 = 12), ezért 16 − 6 − 6 = 4.'
  },
  {
    id: 's20g2-q23',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    figure: <BoxEqQFig expr="□ − 7 = 8" />,
    question: 'Melyik szám kerül a □ helyére?',
    options: ['15', '1', '14', '16'],
    correctAnswer: 0,
    explanation: 'A kisebbítendőt összeadással kapjuk meg: 8 + 7 = 15. Ellenőrzés: 15 − 7 = 8.'
  },
  {
    id: 's20g2-q24',
    level: 3,
    questionTypeBadge: 'Kétoldali egyenlet',
    figure: <BalanceQFig leftExpr="17 − 5" rightExpr="19 − ?" />,
    question: 'Egyensúlyban van a mérleg: 17 − 5 = 19 − □. Mennyi a □?',
    options: ['7', '12', '8', '5'],
    correctAnswer: 0,
    explanation: 'A bal oldal 17 − 5 = 12. A 19-ből 7-et kell elvenni, hogy 12 maradjon: 19 − 7 = 12.'
  },
  {
    id: 's20g2-q25',
    level: 3,
    questionTypeBadge: 'Műveletlánc',
    figure: <ChainQFig vals={['18', '10', '7', '13', '?']} ops={['−8', '−3', '+6', '−9']} />,
    question: 'Kövesd a nyilakat! Melyik szám kerül a lánc végén a ? helyére?',
    options: ['4', '5', '3', '6'],
    correctAnswer: 0,
    explanation: 'Az utolsó szám 13, ebből 9-et vonunk ki: 13 − 9 = 4.'
  },
  {
    id: 's20g2-q26',
    level: 3,
    questionTypeBadge: 'Kétoldali egyenlet',
    question: 'Melyik szám illik a □ helyére? 20 − □ = 6 + 7',
    options: ['7', '13', '8', '6'],
    correctAnswer: 0,
    explanation: 'A jobb oldal 6 + 7 = 13. 20 − 7 = 13, tehát □ = 7.'
  },
  {
    id: 's20g2-q27',
    level: 3,
    questionTypeBadge: 'Kivonókerék',
    figure: <WheelQFig subLabel="−?" outLabel="12" />,
    question: 'A 20-as kivonókeréken 12 jött ki. Mennyit vontunk ki?',
    options: ['8', '7', '9', '6'],
    correctAnswer: 0,
    explanation: '20 − 12 = 8, és 12 + 8 = 20. Tehát 8-at vontunk ki.'
  },
  {
    id: 's20g2-q28',
    level: 3,
    questionTypeBadge: 'Egyenlőtlenség',
    question: 'A 0–20-as számkörben hány különböző számot írhatsz a ▲ helyére: ▲ < 14 − 8?',
    options: ['6', '5', '7', '8'],
    correctAnswer: 0,
    explanation: '14 − 8 = 6, tehát ▲ < 6. A 0, 1, 2, 3, 4, 5 számok jók, ez 6 darab szám.'
  },
  {
    id: 's20g2-q29',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <ChainQFig vals={['20', '17', '14', '11', '?']} ops={['−3', '−3', '−3', '−3']} />,
    question: 'Folytasd a szabályos sorozatot! Melyik szám kerül a ? helyére?',
    options: ['8', '9', '7', '10'],
    correctAnswer: 0,
    explanation: 'Minden lépésben 3-at vonunk ki: 11 − 3 = 8.'
  },
  {
    id: 's20g2-q30',
    level: 3,
    questionTypeBadge: 'Egyenlőtlenség',
    question: 'Melyik a legnagyobb szám a 0–20-as számkörben, ami a ▲ helyére írható: 16 − 9 > ▲ + 2?',
    options: ['4', '5', '6', '3'],
    correctAnswer: 0,
    explanation: '16 − 9 = 7, tehát 7 > ▲ + 2. Ha ▲ = 4, akkor 4 + 2 = 6 < 7 (jó). Az 5 már nem jó, mert 5 + 2 = 7.'
  }
];

export const Sub20G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId="g2-c20-kivonas20-quiz"
      subtopicId="kivonas-20-as-szamkor"
      title="5. Kivonás 20-as számkör – Kvíz"
      subtitle="30 feladat 3 szinten: visszalépés 10-re, tízesátlépés nélkül és tízesátlépéssel, kétjegyűből kétjegyű, ellenőrzés és nyitott mondatok."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • KVÍZ"
      themeColor="teal"
      questions={SUB20_G2_QUESTIONS}
      cheatSheets={[
        {
          title: '10-re lépés és kistesó',
          items: [
            '14 − 4 = 10 (az egyesek elvétele)',
            '16 − 10 = 6 (a tízes elvétele)',
            '8 − 3 = 5 → 18 − 3 = 15',
            '19 − 0 = 19,  15 − 15 = 0'
          ]
        },
        {
          title: 'Tízesátlépés két lépésben',
          items: [
            '14 − 7 = 14 − 4 − 3 = 10 − 3 = 7',
            'Előbb lépj vissza 10-re!',
            'Aztán vedd el a maradékot a 10-ből!',
            'Ellenőrzés: 7 + 7 = 14'
          ]
        },
        {
          title: 'Kétjegyűből kétjegyű & hiányzó szám',
          items: [
            '17 − 13: 17 − 10 − 3 vagy 17 − 3 − 10 vagy 17 − 7 − 6',
            '□ − 7 = 8 → 8 + 7 = 15',
            '16 − □ = 9 → 16 − 9 = 7'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Sub20G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Sub20G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Sub20G2Quiz;
