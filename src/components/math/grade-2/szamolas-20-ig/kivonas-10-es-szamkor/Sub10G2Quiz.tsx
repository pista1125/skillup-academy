import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Sub10G2Matcher } from './Sub10G2Matcher';
import { Sub10G2Sorter } from './Sub10G2Sorter';
import { DiscG, Line010G } from './Sub10G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák (0–10 kivonás, világos kártyaháttér, sötét szöveg, ? pirossal)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const FONT = 'system-ui, Segoe UI, sans-serif';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 115 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Korongok áthúzással. */
const DiscsSubFig: React.FC<{ total: number; taken: number }> = ({ total, taken }) => {
  const cols = total <= 5 ? total : Math.ceil(total / 2);
  const rows = total <= 5 ? 1 : 2;
  const r = 10.5;
  const dx = 30;
  const dy = 28;
  const ox = 120 - ((cols - 1) * dx) / 2;
  const oy = (rows === 1 ? 52 : 38);
  return (
    <QFig h={108}>
      {Array.from({ length: total }, (_, i) => (
        <DiscG
          key={i}
          cx={ox + (i % cols) * dx}
          cy={oy + Math.floor(i / cols) * dy}
          r={r}
          crossed={i >= total - taken}
        />
      ))}
      <text x="120" y="96" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
        {total} korong, {taken} áthúzva
      </text>
    </QFig>
  );
};

/** 10-es gyöngysor kivonással. */
const BeadSubFig: React.FC<{ taken: number; label: string }> = ({ taken, label }) => {
  const bx = (i: number) => 21 + i * 22;
  const by = (i: number) => 46 + Math.sin(i * 0.6) * 6;
  return (
    <QFig h={100}>
      <path d="M 10 48 Q 70 34 120 46 T 230 46" fill="none" stroke="#65a30d" strokeWidth="2" />
      {Array.from({ length: 10 }, (_, i) => {
        const isTaken = i >= 10 - taken;
        return (
          <g key={i}>
            <circle
              cx={bx(i)}
              cy={by(i)}
              r="8.5"
              fill={isTaken ? '#e2e8f0' : '#fb923c'}
              stroke={isTaken ? '#64748b' : '#c2410c'}
              strokeWidth="1.8"
            />
            {isTaken && (
              <g stroke={UNK} strokeWidth="2.2" strokeLinecap="round">
                <line x1={bx(i) - 5} y1={by(i) - 5} x2={bx(i) + 5} y2={by(i) + 5} />
                <line x1={bx(i) + 5} y1={by(i) - 5} x2={bx(i) - 5} y2={by(i) + 5} />
              </g>
            )}
          </g>
        );
      })}
      <text x="120" y="84" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#1e293b">
        {label}
      </text>
    </QFig>
  );
};

/** 0–10 számegyenes visszaugrással. */
const LineJumpFig: React.FC<{
  from: number;
  to: number;
  label: string;
  markStart: string;
  markEnd: string;
}> = ({ from, to, label, markStart, markEnd }) => (
  <QFig h={104}>
    <Line010G from={from} to={to} jumpLabel={label} markStart={markStart} markEnd={markEnd} y={64} x0={20} x1={216} />
  </QFig>
);

/** Két sor összehasonlítása (mennyivel több). */
const CompareRowsFig: React.FC<{ top: number; bottom: number; topLabel: string; botLabel: string }> = ({
  top,
  bottom,
  topLabel,
  botLabel
}) => (
  <QFig h={104}>
    <text x="14" y="34" fontSize="11" fontWeight="bold" fill="#b91c1c">{topLabel}:</text>
    {Array.from({ length: top }, (_, i) => (
      <circle key={`t${i}`} cx={64 + i * 22} cy="30" r="8" fill="#f87171" stroke="#b91c1c" strokeWidth="1.5" />
    ))}
    <text x="14" y="68" fontSize="11" fontWeight="bold" fill="#0369a1">{botLabel}:</text>
    {Array.from({ length: bottom }, (_, i) => (
      <circle key={`b${i}`} cx={64 + i * 22} cy="64" r="8" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
    ))}
    <text x="120" y="92" textAnchor="middle" fontSize="11" fill="#475569">
      Mennyivel több a {topLabel}?
    </text>
  </QFig>
);

/** 2×5 tízeskeret kivonással. */
const TenFrameFig: React.FC<{ total: number; taken: number }> = ({ total, taken }) => {
  const cell = 30;
  const x0 = 45;
  const y0 = 18;
  return (
    <QFig h={104}>
      <rect x={x0} y={y0} width={5 * cell} height={2 * cell} fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
      {[1, 2, 3, 4].map((c) => (
        <line key={c} x1={x0 + c * cell} y1={y0} x2={x0 + c * cell} y2={y0 + 2 * cell} stroke="#94a3b8" strokeWidth="1.2" />
      ))}
      <line x1={x0} y1={y0 + cell} x2={x0 + 5 * cell} y2={y0 + cell} stroke="#94a3b8" strokeWidth="1.2" />
      {Array.from({ length: total }, (_, i) => {
        const cx = x0 + (i % 5) * cell + cell / 2;
        const cy = y0 + Math.floor(i / 5) * cell + cell / 2;
        const isTaken = i >= total - taken;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="10" fill={isTaken ? '#e2e8f0' : '#2563eb'} stroke={isTaken ? '#64748b' : '#1e3a8a'} strokeWidth="1.5" />
            {isTaken && (
              <g stroke={UNK} strokeWidth="2.6" strokeLinecap="round">
                <line x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} />
                <line x1={cx + 6} y1={cy - 6} x2={cx - 6} y2={cy + 6} />
              </g>
            )}
          </g>
        );
      })}
      <text x="120" y="94" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
        {total} − {taken} = ?
      </text>
    </QFig>
  );
};

/** Műveletcsalád képkártya (piros négyzetek + kék körök). */
const FamilyFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={96}>
    <rect x="20" y="14" width="200" height="58" rx="8" fill="#ffffff" stroke="#fdba74" strokeWidth="1.5" />
    {Array.from({ length: a }, (_, i) => (
      <rect key={`s${i}`} x={34 + i * 24} y="24" width="16" height="16" rx="3" fill="#f87171" stroke="#b91c1c" strokeWidth="1.5" />
    ))}
    {Array.from({ length: b }, (_, i) => (
      <circle key={`c${i}`} cx={42 + i * 24} cy="56" r="7.5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
    ))}
    <text x="120" y="88" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#9a3412">
      {a} piros és {b} kék (összesen {a + b})
    </text>
  </QFig>
);

/** Kiemelt egyenletkártya ismeretlennel. */
const BoxEqFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={76}>
    <rect x="24" y="14" width="192" height="48" rx="10" fill="#fff7ed" stroke="#fb923c" strokeWidth="2" />
    <text x="120" y="46" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">
      {left} {right}
    </text>
  </QFig>
);

/** Kivonókerék-szelet ábra. */
const WheelSingleFig: React.FC<{ center: number; sub: number }> = ({ center, sub }) => (
  <QFig h={92}>
    <rect x="34" y="24" width="46" height="44" rx="8" fill="#facc15" stroke="#854d0e" strokeWidth="2.2" />
    <text x="57" y="53" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{center}</text>
    <line x1="86" y1="48" x2="146" y2="48" stroke="#334155" strokeWidth="2.5" />
    <path d="M 140 42 L 149 48 L 140 54" fill="none" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="116" y="38" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#be123c">− {sub}</text>
    <circle cx="176" cy="46" r="20" fill="#fee2e2" stroke={UNK} strokeWidth="2.2" />
    <text x="176" y="53" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Két kifejezés összehasonlító kártya. */
const CompareCardsFig: React.FC<{ left: string; right: string; mid?: string }> = ({ left, right, mid = '□' }) => (
  <QFig h={78}>
    <rect x="18" y="16" width="76" height="46" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="56" y="46" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{left}</text>
    <rect x="104" y="23" width="32" height="32" rx="6" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="120" y="45" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>{mid}</text>
    <rect x="146" y="16" width="76" height="46" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="184" y="46" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{right}</text>
  </QFig>
);

/** Nyitott egyenlőtlenség kártya (0–10 számokkal). */
const IneqBoxFig: React.FC<{ expr: string }> = ({ expr }) => (
  <QFig h={84}>
    <text x="120" y="34" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{expr}</text>
    <text x="120" y="64" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#475569">
      0   1   2   3   4   5   6   7   8   9   10
    </text>
  </QFig>
);

/** Nyíllánc ábra két lépéssel. */
const ChainFig: React.FC<{ start: number; op1: string; op2: string }> = ({ start, op1, op2 }) => (
  <QFig h={86}>
    <circle cx="38" cy="48" r="18" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" />
    <text x="38" y="54" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a8a">{start}</text>
    <line x1="58" y1="48" x2="98" y2="48" stroke="#334155" strokeWidth="2" />
    <path d="M 94 43 L 101 48 L 94 53" fill="none" stroke="#334155" strokeWidth="2" />
    <text x="79" y="36" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#be123c">{op1}</text>
    <circle cx="120" cy="48" r="16" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" />
    <line x1="138" y1="48" x2="178" y2="48" stroke="#334155" strokeWidth="2" />
    <path d="M 174 43 L 181 48 L 174 53" fill="none" stroke="#334155" strokeWidth="2" />
    <text x="159" y="36" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">{op2}</text>
    <circle cx="200" cy="48" r="18" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="200" y="54" textAnchor="middle" fontSize="19" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// 30 kérdés (10 × 1. szint, 10 × 2. szint, 10 × 3. szint)
// ---------------------------------------------------------------------------
export const SUB10_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'sub10g2-q1',
    level: 1,
    questionTypeBadge: 'Elvétel',
    figure: <DiscsSubFig total={9} taken={4} />,
    question: '9 korongból áthúztunk 4-et. Mennyi maradt?',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: '9 − 4 = 5. Ellenőrzés: 5 + 4 = 9.'
  },
  {
    id: 'sub10g2-q2',
    level: 1,
    questionTypeBadge: 'Gyöngysor',
    figure: <BeadSubFig taken={4} label="10 gyöngy, 4 áthúzva" />,
    question: 'A 10 gyöngyből 4-et elveszünk. Hány gyöngy marad a fonalon?',
    options: ['6', '4', '5', '7'],
    correctAnswer: 0,
    explanation: '10 − 4 = 6. A 6 és a 4 együtt 10.'
  },
  {
    id: 'sub10g2-q3',
    level: 1,
    questionTypeBadge: 'Alapművelet',
    question: 'Mennyi 8 − 3?',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: '8-ból elveszünk 3-at, marad 5. Ellenőrzés: 5 + 3 = 8.'
  },
  {
    id: 'sub10g2-q4',
    level: 1,
    questionTypeBadge: 'Nullával kivonás',
    figure: <DiscsSubFig total={9} taken={0} />,
    question: 'A képen 9 korong van, és egyet sem vettünk el. Mennyi 9 − 0?',
    options: ['9', '0', '8', '10'],
    correctAnswer: 0,
    explanation: 'Ha 0-t veszünk el, minden megmarad: 9 − 0 = 9.'
  },
  {
    id: 'sub10g2-q5',
    level: 1,
    questionTypeBadge: 'Önmagából kivonás',
    figure: <DiscsSubFig total={6} taken={6} />,
    question: 'Mind a 6 korongot áthúztuk. Mennyi 6 − 6?',
    options: ['0', '6', '1', '5'],
    correctAnswer: 0,
    explanation: 'Ha mindet elvesszük, nem marad semmi: 6 − 6 = 0.'
  },
  {
    id: 'sub10g2-q6',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineJumpFig from={8} to={5} label="− 3" markStart="8" markEnd="?" />,
    question: 'Indulj a 8-ról, és lépj 3-at vissza! Melyik számhoz érsz?',
    options: ['5', '6', '4', '3'],
    correctAnswer: 0,
    explanation: 'A 8-tól visszafelé számolunk: 7, 6, 5. Tehát 8 − 3 = 5.'
  },
  {
    id: 'sub10g2-q7',
    level: 1,
    questionTypeBadge: 'Különbség',
    figure: <CompareRowsFig top={7} bottom={4} topLabel="piros" botLabel="kék" />,
    question: 'Mennyivel több a piros korong, mint a kék?',
    options: ['3', '4', '7', '10'],
    correctAnswer: 0,
    explanation: '7 piros és 4 kék van. A különbség: 7 − 4 = 3.'
  },
  {
    id: 'sub10g2-q8',
    level: 1,
    questionTypeBadge: 'Hiányzó rész',
    question: 'Egy dobozban 10 ceruza volt. Most már csak 2 van benne. Hány ceruzát vettek ki?',
    options: ['8', '2', '7', '9'],
    correctAnswer: 0,
    explanation: '10 − 2 = 8 ceruzát vettek ki. Ellenőrzés: 8 + 2 = 10.'
  },
  {
    id: 'sub10g2-q9',
    level: 1,
    questionTypeBadge: 'Tízeskeret',
    figure: <TenFrameFig total={10} taken={7} />,
    question: 'A 10-es keretből 7 korongot áthúztunk. Mennyi 10 − 7?',
    options: ['3', '7', '2', '4'],
    correctAnswer: 0,
    explanation: '10 − 7 = 3. A kereten jól látszik, hogy 3 kék korong maradt.'
  },
  {
    id: 'sub10g2-q10',
    level: 1,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Végezd el: 9 − 5. Páros vagy páratlan a különbség?',
    options: ['páros (4)', 'páratlan (4)', 'páros (5)', 'páratlan (3)'],
    correctAnswer: 0,
    explanation: '9 − 5 = 4. A 4 páros szám.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'sub10g2-q11',
    level: 2,
    questionTypeBadge: 'Műveletcsalád',
    figure: <FamilyFig a={2} b={7} />,
    question: 'A képen 2 piros négyzet és 7 kék kör van. Melyik művelet NEM tartozik ehhez a képhez?',
    options: ['9 − 5 = 4', '2 + 7 = 9', '9 − 2 = 7', '9 − 7 = 2'],
    correctAnswer: 0,
    explanation: 'A 2, a 7 és a 9 alkot műveletcsaládot. A 9 − 5 = 4 nem ehhez a képhez tartozik.'
  },
  {
    id: 'sub10g2-q12',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik összeadással ellenőrizheted ezt a kivonást: 8 − 5 = 3?',
    options: ['3 + 5 = 8', '8 − 3 = 5', '5 − 3 = 2', '3 + 4 = 7'],
    correctAnswer: 0,
    explanation: 'A kivonást összeadással ellenőrizzük: a különbséget (3) és a kivonandót (5) összeadjuk: 3 + 5 = 8.'
  },
  {
    id: 'sub10g2-q13',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <BoxEqFig left="9 − □" right="= 4" />,
    question: 'Melyik szám hiányzik a négyzetből? 9 − □ = 4',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: '9-ből 4 marad, tehát 9 − 4 = 5-öt vettünk el. 9 − 5 = 4.'
  },
  {
    id: 'sub10g2-q14',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <BoxEqFig left="□ − 3" right="= 6" />,
    question: 'Melyik szám hiányzik a sor elejéről? □ − 3 = 6',
    options: ['9', '3', '6', '8'],
    correctAnswer: 0,
    explanation: 'A maradékot és az elvett részt összeadjuk: 6 + 3 = 9. Ellenőrzés: 9 − 3 = 6.'
  },
  {
    id: 'sub10g2-q15',
    level: 2,
    questionTypeBadge: 'Nullás kivonás',
    question: 'Pótold a hiányzó számot: □ − 8 = 0',
    options: ['8', '0', '1', '9'],
    correctAnswer: 0,
    explanation: 'Akkor marad 0, ha ugyanannyit veszünk el: 8 − 8 = 0.'
  },
  {
    id: 'sub10g2-q16',
    level: 2,
    questionTypeBadge: 'Kivonókerék',
    figure: <WheelSingleFig center={10} sub={8} />,
    question: 'Nézd a kivonókereket! Mennyi 10 − 8?',
    options: ['2', '8', '3', '1'],
    correctAnswer: 0,
    explanation: '10 − 8 = 2. Ellenőrzés: 2 + 8 = 10.'
  },
  {
    id: 'sub10g2-q17',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineJumpFig from={10} to={3} label="− ?" markStart="10" markEnd="3" />,
    question: 'A 10-ről visszaléptünk a 3-ra. Hányat léptünk vissza?',
    options: ['7', '3', '6', '8'],
    correctAnswer: 0,
    explanation: '10 − 3 = 7, tehát 7-et léptünk vissza. Ellenőrzés: 10 − 7 = 3.'
  },
  {
    id: 'sub10g2-q18',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareCardsFig left="9 − 4" right="7 − 3" />,
    question: 'Melyik jel kerül közéjük? 9 − 4 □ 7 − 3',
    options: ['>', '<', '=', 'nem dönthető el'],
    correctAnswer: 0,
    explanation: '9 − 4 = 5, 7 − 3 = 4. Mivel 5 nagyobb, mint 4, a > jel kerül közéjük.'
  },
  {
    id: 'sub10g2-q19',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik kivonás eredménye a LEGKISEBB?',
    options: ['10 − 7', '9 − 5', '8 − 3', '10 − 4'],
    correctAnswer: 0,
    explanation: '10 − 7 = 3, 9 − 5 = 4, 8 − 3 = 5, 10 − 4 = 6. A legkisebb a 3.'
  },
  {
    id: 'sub10g2-q20',
    level: 2,
    questionTypeBadge: 'Gyöngysor',
    figure: <BeadSubFig taken={8} label="10 gyöngyből 2 maradt" />,
    question: '10 gyöngyből 2 maradt meg. Hányat húztunk át?',
    options: ['8', '2', '7', '9'],
    correctAnswer: 0,
    explanation: '10 − 2 = 8 gyöngyöt húztunk át.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'sub10g2-q21',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: <IneqBoxFig expr="10 − 7 > □" />,
    question: 'Mely számok (0 és 10 között) tehetők a □ helyére? 10 − 7 > □',
    options: ['0, 1, 2', '1, 2, 3', '0, 1, 2, 3', '4, 5, 6'],
    correctAnswer: 0,
    explanation: '10 − 7 = 3. A 3-nál kisebb számok 0 és 10 között: 0, 1 és 2. (A 3 már nem jó, mert 3 nem nagyobb 3-nál!)'
  },
  {
    id: 'sub10g2-q22',
    level: 3,
    questionTypeBadge: 'Kétlépéses',
    question: 'Mennyi 10 − 4 − 2?',
    options: ['4', '6', '8', '2'],
    correctAnswer: 0,
    explanation: 'Előbb 10 − 4 = 6, aztán 6 − 2 = 4.'
  },
  {
    id: 'sub10g2-q23',
    level: 3,
    questionTypeBadge: 'Vegyes lánc',
    figure: <ChainFig start={7} op1="− 5" op2="+ 6" />,
    question: 'Számolj sorban! 7 − 5 + 6 = ?',
    options: ['8', '2', '6', '9'],
    correctAnswer: 0,
    explanation: 'Először 7 − 5 = 2, majd 2 + 6 = 8.'
  },
  {
    id: 'sub10g2-q24',
    level: 3,
    questionTypeBadge: 'Hiányzó művelet',
    figure: <BoxEqFig left="8 ○ 3" right="= 5" />,
    question: 'Melyik műveleti jel hiányzik a körből? 8 ○ 3 = 5',
    options: ['−', '+', '=', '<'],
    correctAnswer: 0,
    explanation: 'A 8 kisebb lett (5), ezért kivonunk: 8 − 3 = 5.'
  },
  {
    id: 'sub10g2-q25',
    level: 3,
    questionTypeBadge: 'Szöveges',
    question: 'Lilinek 9 matricája volt, Bencének 5-tel kevesebb. Hány matricája van Bencének?',
    options: ['4', '5', '9', '3'],
    correctAnswer: 0,
    explanation: '5-tel kevesebb, vagyis 9 − 5 = 4 matricája van Bencének.'
  },
  {
    id: 'sub10g2-q26',
    level: 3,
    questionTypeBadge: 'Egyenlőség',
    figure: <CompareCardsFig left="10 − 3" right="9 − □" mid="=" />,
    question: 'Melyik szám teszi igazzá az egyenlőséget? 10 − 3 = 9 − □',
    options: ['2', '3', '7', '1'],
    correctAnswer: 0,
    explanation: 'A bal oldal 10 − 3 = 7. A jobb oldal is 7 legyen: 9 − 2 = 7.'
  },
  {
    id: 'sub10g2-q27',
    level: 3,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Melyik kivonás eredménye PÁRATLAN szám?',
    options: ['10 − 3', '8 − 2', '9 − 5', '7 − 7'],
    correctAnswer: 0,
    explanation: '10 − 3 = 7 (páratlan). A többi: 8 − 2 = 6, 9 − 5 = 4, 7 − 7 = 0 (mind páros).'
  },
  {
    id: 'sub10g2-q28',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <LineJumpFig from={9} to={4} label="− 5" markStart="?" markEnd="4" />,
    question: 'Egy számról 5-öt visszaléptünk, és a 4-re érkeztünk. Melyik számról indultunk?',
    options: ['9', '1', '4', '8'],
    correctAnswer: 0,
    explanation: 'A 4-ből lépjünk előre 5-öt: 4 + 5 = 9. Ellenőrzés: 9 − 5 = 4.'
  },
  {
    id: 'sub10g2-q29',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Mi a LEGNAGYOBB szám, amit a □ helyére írhatsz? 9 − □ > 4',
    options: ['4', '5', '3', '6'],
    correctAnswer: 0,
    explanation: 'Próbáljuk ki: 9 − 4 = 5, és 5 > 4 igaz! A 9 − 5 = 4 már nem nagyobb 4-nél. Tehát a legnagyobb jó szám a 4.'
  },
  {
    id: 'sub10g2-q30',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <ChainFig start={10} op1="− 4" op2="− 3" />,
    question: 'Zsófi 10 gesztenyéből előbb 4-et adott Marcinak, majd 3-at Tominak. Hány gesztenyéje maradt Zsófinak?',
    options: ['3', '7', '6', '4'],
    correctAnswer: 0,
    explanation: '10 − 4 = 6, majd 6 − 3 = 3 gesztenyéje maradt.'
  }
];

export const Sub10G2Quiz: React.FC<{
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
      topicId="g2-c20-kivonas10-quiz"
      subtopicId="kivonas-10-es-szamkor"
      title="3. Kivonás 10-es számkör – Kvíz"
      subtitle="30 feladat 3 szinten: elvétel, különbség, műveletcsalád, ellenőrzés összeadással és hiányzó számok."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • KVÍZ"
      questions={SUB10_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'A kivonás részei',
          items: [
            '8 − 3 = 5 (kisebbítendő − kivonandó = különbség)',
            'Nulla kivonása: 9 − 0 = 9',
            'Önmagából kivonás: 7 − 7 = 0'
          ]
        },
        {
          title: 'Ellenőrzés és műveletcsalád',
          items: [
            '9 − 4 = 5, mert 5 + 4 = 9',
            '4 + 5 = 9 és 5 + 4 = 9',
            '9 − 4 = 5 és 9 − 5 = 4'
          ]
        },
        {
          title: 'Hiányzó számok',
          items: [
            '9 − □ = 4 → 9 − 4 = 5',
            '□ − 3 = 6 → 6 + 3 = 9',
            'Nyitott mondat: 0 is lehet megoldás!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Sub10G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Sub10G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Sub10G2Quiz;
