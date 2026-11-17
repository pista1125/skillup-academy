import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WordProblems100G3Matcher } from './WordProblems100G3Matcher';
import { WordProblems100G3Sorter } from './WordProblems100G3Sorter';
import { ClockFace } from './WordProblems100G3Clock';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const fit = (s: string, w: number, size: number) => Math.min(size, Math.floor((w - 6) / (s.length * 0.62)));
const lab = (s: string, x: number, y: number, size = 12) => (
  <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight="bold" fill={s.includes('?') ? UNK : '#0f172a'}>
    {s}
  </text>
);

/** Egész szalag fölül, két rész alul. ratio = az első rész aránya. */
const PartsFig: React.FC<{ whole: string; a: string; b: string; ratio: number; caption?: string }> = ({ whole, a, b, ratio, caption }) => {
  const x0 = 20;
  const w = 200;
  const wa = Math.round(w * ratio);
  return (
    <QFig h={caption ? 116 : 100}>
      <rect x={x0} y="14" width={w} height="26" rx="5" fill="#fed7aa" stroke="#c2410c" />
      {lab(whole, x0 + w / 2, 32, 13)}
      <rect x={x0} y="54" width={wa} height="26" rx="5" fill="#bbf7d0" stroke="#15803d" />
      {lab(a, x0 + wa / 2, 72, fit(a, wa, 13))}
      <rect x={x0 + wa} y="54" width={w - wa} height="26" rx="5" fill="#bfdbfe" stroke="#1d4ed8" />
      {lab(b, x0 + wa + (w - wa) / 2, 72, fit(b, w - wa, 13))}
      {caption && (
        <text x="120" y="102" textAnchor="middle" fontSize="11" fill="#475569">{caption}</text>
      )}
    </QFig>
  );
};

/** Két szalag összehasonlítása. */
const CompareFig: React.FC<{ topName: string; top: string; botName: string; bot: string; diff: string; topLonger: boolean }> = ({ topName, top, botName, bot, diff, topLonger }) => {
  const long = 150;
  const short = 112;
  const x0 = 70;
  const tl = topLonger ? long : short;
  const bl = topLonger ? short : long;
  return (
    <QFig h={110}>
      <text x="10" y="32" fontSize="11" fontWeight="bold" fill="#334155">{topName}</text>
      <rect x={x0} y="16" width={tl} height="24" rx="5" fill="#fda4af" stroke="#be123c" />
      {lab(top, x0 + tl / 2, 33, 13)}
      <text x="10" y="74" fontSize="11" fontWeight="bold" fill="#334155">{botName}</text>
      <rect x={x0} y="58" width={bl} height="24" rx="5" fill="#7dd3fc" stroke="#0369a1" />
      {lab(bot, x0 + bl / 2, 75, 13)}
      {topLonger ? (
        <rect x={x0 + short} y="58" width={long - short} height="24" rx="5" fill="none" stroke="#a16207" strokeDasharray="4 3" />
      ) : (
        <rect x={x0 + short} y="16" width={long - short} height="24" rx="5" fill="none" stroke="#a16207" strokeDasharray="4 3" />
      )}
      <text x={x0 + long} y="100" textAnchor="end" fontSize="11" fontWeight="bold" fill="#a16207">{diff}</text>
    </QFig>
  );
};

/** Csoportok: dobozok pöttyökkel vagy kérdőjellel. */
const GroupsFig: React.FC<{ groups: number; per?: number; label: string; color?: string; extra?: number }> = ({ groups, per, label, color = '#f59e0b', extra }) => {
  const w = Math.min(44, (extra ? 168 : 212) / groups);
  return (
    <QFig h={110}>
      {Array.from({ length: groups }, (_, i) => {
        const x = 14 + i * w;
        return (
          <g key={i}>
            <rect x={x} y="14" width={w - 4} height="62" rx="6" fill="#ede9fe" stroke="#7c3aed" />
            {per !== undefined
              ? Array.from({ length: per }, (_, j) => (
                  <circle key={j} cx={x + 9 + (j % 2) * (w - 22)} cy={24 + Math.floor(j / 2) * 11} r="3.6" fill={color} stroke="#78350f" strokeWidth="0.5" />
                ))
              : lab('?', x + (w - 4) / 2, 50, 15)}
          </g>
        );
      })}
      {extra !== undefined && (
        <g>
          <rect x="186" y="14" width="44" height="62" rx="6" fill="#fef3c7" stroke="#d97706" />
          {lab(String(extra), 208, 42, 14)}
          <text x="208" y="60" textAnchor="middle" fontSize="9" fill="#92400e">külön</text>
        </g>
      )}
      <text x="120" y="96" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5b21b6">{label}</text>
    </QFig>
  );
};

const TwoClocksFig: React.FC<{ h1: number; h2?: number; l1: string; l2: string }> = ({ h1, h2, l1, l2 }) => (
  <QFig h={130}>
    <ClockFace hour={h1} cx={62} cy={58} r={40} label={l1} />
    {h2 !== undefined ? (
      <ClockFace hour={h2} cx={178} cy={58} r={40} label={l2} />
    ) : (
      <g>
        <circle cx="178" cy="58" r="40" fill="#fff" stroke="#1e293b" strokeWidth="3" strokeDasharray="6 4" />
        {lab('?', 178, 66, 26)}
        <text x="178" y="116" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{l2}</text>
      </g>
    )}
  </QFig>
);

const TableFig: React.FC<{ rows: { head: string; cells: string[] }[] }> = ({ rows }) => {
  const hw = 78;
  const n = rows[0].cells.length;
  const cw = (224 - hw) / n;
  return (
    <QFig h={22 + rows.length * 30}>
      {rows.map((r, i) => (
        <g key={r.head}>
          <rect x="8" y={12 + i * 30} width={hw} height="30" fill="#fef3c7" stroke="#d97706" />
          <text x="13" y={31 + i * 30} fontSize="11" fontWeight="bold" fill="#78350f">{r.head}</text>
          {r.cells.map((c, j) => (
            <g key={j}>
              <rect x={8 + hw + j * cw} y={12 + i * 30} width={cw} height="30" fill="#fff" stroke="#d97706" />
              {lab(c, 8 + hw + j * cw + cw / 2, 32 + i * 30, 12)}
            </g>
          ))}
        </g>
      ))}
    </QFig>
  );
};

const Hat: React.FC<{ x: number; y: number; c: string }> = ({ x, y, c }) => (
  <g>
    <path d={`M ${x - 16} ${y} Q ${x} ${y - 30} ${x + 16} ${y} Z`} fill={c} stroke="#1e293b" />
    <rect x={x - 20} y={y - 2} width="40" height="7" rx="3" fill={c} stroke="#1e293b" />
  </g>
);

const ScarfFig: React.FC<{ hats: string[]; scarves: string[]; crossed?: number }> = ({ hats, scarves, crossed }) => (
  <QFig h={120}>
    <text x="60" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">sapkák</text>
    {hats.map((c, i) => (
      <Hat key={i} x={30 + i * 46} y={58} c={c} />
    ))}
    <text x="180" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">sálak</text>
    {scarves.map((c, i) => (
      <g key={i}>
        <rect x="150" y={32 + i * 24} width="60" height="12" rx="5" fill={c} stroke="#1e293b" />
        <rect x="195" y={42 + i * 24} width="9" height="10" rx="2" fill={c} stroke="#1e293b" />
        {crossed === i && <line x1="144" y1={30 + i * 24} x2="216" y2={50 + i * 24} stroke={UNK} strokeWidth="3" />}
      </g>
    ))}
    <text x="120" y="108" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>Hányféle öltözék?</text>
  </QFig>
);

const BreadFig: React.FC = () => (
  <QFig h={120}>
    <text x="60" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">kenyér</text>
    {['#d6a35c', '#8b5a2b', '#f1d9a6'].map((c, i) => (
      <ellipse key={c} cx="60" cy={38 + i * 26} rx="34" ry="10" fill={c} stroke="#5b3a1a" />
    ))}
    <text x="178" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">feltét</text>
    {[
      { c: '#facc15', n: 'sajt' },
      { c: '#f87171', n: 'sonka' },
      { c: '#86efac', n: 'uborka' }
    ].map((f, i) => (
      <g key={f.n}>
        <rect x="140" y={30 + i * 26} width="40" height="16" rx="4" fill={f.c} stroke="#334155" />
        <text x="186" y={42 + i * 26} fontSize="11" fill="#334155">{f.n}</text>
        {i === 0 && <line x1="136" y1={28} x2="184" y2={48} stroke={UNK} strokeWidth="3" />}
      </g>
    ))}
    <text x="120" y="112" textAnchor="middle" fontSize="11" fill="#475569">A sajt elfogyott.</text>
  </QFig>
);

const PriceFig: React.FC<{ have: string; items: { n: string; p: string; c: string }[] }> = ({ have, items }) => (
  <QFig h={110}>
    <circle cx="42" cy="50" r="28" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <text x="42" y="55" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">{have}</text>
    <text x="42" y="96" textAnchor="middle" fontSize="11" fill="#475569">ennyi volt</text>
    {items.map((it, i) => (
      <g key={it.n}>
        <rect x={96 + i * 72} y="26" width="62" height="46" rx="8" fill={it.c} stroke="#334155" />
        <text x={127 + i * 72} y="45" textAnchor="middle" fontSize="11" fill="#1e293b">{it.n}</text>
        <text x={127 + i * 72} y="63" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">{it.p}</text>
      </g>
    ))}
    {lab('maradt: ?', 160, 96, 12)}
  </QFig>
);

const BerryFig: React.FC = () => (
  <QFig h={120}>
    {Array.from({ length: 35 }, (_, i) => (
      <circle key={i} cx={18 + (i % 9) * 15} cy={20 + Math.floor(i / 9) * 17} r="5.5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="0.6" />
    ))}
    <text x="78" y="104" textAnchor="middle" fontSize="11" fill="#475569">35 szem eper</text>
    <path d="M 160 40 Q 192 78 224 40 Z" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.5" />
    {[0, 1, 2, 3, 4].map((j) => (
      <circle key={j} cx={172 + j * 10} cy="35" r="4.5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="0.6" />
    ))}
    <text x="192" y="84" textAnchor="middle" fontSize="11" fill="#0369a1">1 tálka: 5 szem</text>
    <text x="192" y="104" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>? tálka</text>
  </QFig>
);

const TablesFig: React.FC = () => (
  <QFig h={120}>
    {Array.from({ length: 6 }, (_, i) => {
      const cx = 40 + (i % 3) * 80;
      const cy = 34 + Math.floor(i / 3) * 46;
      return (
        <g key={i}>
          <rect x={cx - 14} y={cy - 9} width="28" height="18" rx="3" fill="#d6a35c" stroke="#5b3a1a" />
          {[
            [0, -16],
            [0, 16],
            [-22, 0],
            [22, 0]
          ].map(([dx, dy], j) => (
            <rect key={j} x={cx + dx - 5} y={cy + dy - 5} width="10" height="10" rx="2" fill="#60a5fa" stroke="#1e3a8a" />
          ))}
        </g>
      );
    })}
    <text x="120" y="112" textAnchor="middle" fontSize="11" fill="#475569">üres szék: 5</text>
  </QFig>
);

export const WORD_PROBLEMS_100_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'wp100-q1',
    level: 1,
    questionTypeBadge: 'Összevonás',
    figure: <PartsFig whole="? alma" a="23 piros" b="14 zöld" ratio={0.62} />,
    question: 'A kosárban 23 piros és 14 zöld alma van. Hány alma van a kosárban?',
    options: ['37', '9', '36', '47'],
    correctAnswer: 0,
    explanation: 'A két rész együtt adja az egészet: 23 + 14 = 37. A kosárban 37 alma van.'
  },
  {
    id: 'wp100-q2',
    level: 1,
    questionTypeBadge: 'Elvétel',
    figure: <PartsFig whole="45 utas" a="? maradt" b="12 leszállt" ratio={0.7} />,
    question: 'A buszon 45 utas ült. A megállóban 12 utas leszállt. Hányan maradtak a buszon?',
    options: ['33', '57', '43', '32'],
    correctAnswer: 0,
    explanation: 'Leszálltak, tehát kevesebben lettek: 45 − 12 = 33. A buszon 33 utas maradt.'
  },
  {
    id: 'wp100-q3',
    level: 1,
    questionTypeBadge: '-val több',
    figure: <CompareFig topName="Tomi" top="?" botName="Panni" bot="30" diff="8-cal több" topLonger />,
    question: 'Panninak 30 gyöngye van. Tominak 8-cal több. Hány gyöngye van Tominak?',
    options: ['38', '22', '37', '48'],
    correctAnswer: 0,
    explanation: 'Tominak több van, ezért hozzáadunk: 30 + 8 = 38. Tominak 38 gyöngye van.'
  },
  {
    id: 'wp100-q4',
    level: 1,
    questionTypeBadge: 'Szorzás',
    figure: <GroupsFig groups={4} per={5} label="4 tányér, mindegyiken 5 szelet" color="#f87171" />,
    question: '4 tányéron 5-5 szelet dinnye van. Hány szelet dinnye van összesen?',
    options: ['20', '9', '25', '15'],
    correctAnswer: 0,
    explanation: 'Minden tányéron ugyanannyi van: 4 · 5 = 20. Összesen 20 szelet dinnye van.'
  },
  {
    id: 'wp100-q5',
    level: 1,
    questionTypeBadge: 'Osztás',
    figure: <GroupsFig groups={3} label="18 ceruza, 3 gyerek – egy gyereknek ?" />,
    question: '18 ceruzát 3 gyerek egyenlően oszt el. Hány ceruzát kap egy gyerek?',
    options: ['6', '15', '21', '5'],
    correctAnswer: 0,
    explanation: 'Egyenlő részekre osztunk: 18 : 3 = 6. Egy gyerek 6 ceruzát kap. Ellenőrzés: 3 · 6 = 18.'
  },
  {
    id: 'wp100-q6',
    level: 1,
    questionTypeBadge: '5 lépés',
    question: 'Mi a szöveges feladat megoldásának első lépése?',
    options: ['Kigyűjtöm az adatokat.', 'Leírom a választ.', 'Ellenőrzöm a számolást.', 'Kiszámolom az eredményt.'],
    correctAnswer: 0,
    explanation: 'Először elolvasom a feladatot, és kigyűjtöm az adatokat. Utána jön a terv, a számolás, az ellenőrzés és a válasz.'
  },
  {
    id: 'wp100-q7',
    level: 1,
    questionTypeBadge: 'Számfeladat',
    question: 'A polcon 50 könyv volt. Kivettünk 20-at. Hány könyv maradt? Melyik számfeladat illik ide?',
    options: ['50 − 20 = □', '50 + 20 = □', '50 · 2 = □', '□ + 50 = 20'],
    correctAnswer: 0,
    explanation: 'Kivettünk, tehát kevesebb lett: 50 − 20 = 30. 30 könyv maradt.'
  },
  {
    id: 'wp100-q8',
    level: 1,
    questionTypeBadge: 'Szorzás',
    figure: <GroupsFig groups={6} per={4} label="6 kisautó, mindegyiknek 4 kereke" color="#334155" />,
    question: 'Egy kisautónak 4 kereke van. Hány kereke van 6 kisautónak?',
    options: ['24', '10', '20', '28'],
    correctAnswer: 0,
    explanation: '6-szor 4 kerék: 6 · 4 = 24. A 6 kisautónak 24 kereke van.'
  },
  {
    id: 'wp100-q9',
    level: 1,
    questionTypeBadge: 'Osztás',
    figure: <BerryFig />,
    question: '35 szem eperből 5 szemet teszünk egy tálkába. Hány tálka telik meg?',
    options: ['7', '30', '40', '6'],
    correctAnswer: 0,
    explanation: 'Hányszor van meg az 5 a 35-ben? 35 : 5 = 7. 7 tálka telik meg. Ellenőrzés: 7 · 5 = 35.'
  },
  {
    id: 'wp100-q10',
    level: 1,
    questionTypeBadge: 'Válasz',
    question: 'A kérdés: Hány macska van az udvaron? Az eredmény: 9. Melyik a jó válasz?',
    options: ['Az udvaron 9 macska van.', '9 + 3 = 12', 'Az udvaron 9 kutya van.', '9 macska ment el.'],
    correctAnswer: 0,
    explanation: 'A válasz egy teljes mondat, amely pontosan a kérdésre felel: Az udvaron 9 macska van.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'wp100-q11',
    level: 2,
    questionTypeBadge: 'Hiányzó rész',
    figure: <PartsFig whole="80 darab" a="46 a helyén" b="? hiányzik" ratio={0.575} />,
    question: 'A kirakós 80 darabos. Már 46 darab a helyén van. Hány darab hiányzik még?',
    options: ['34', '44', '36', '24'],
    correctAnswer: 0,
    explanation: 'Az egészből elveszem a kész részt: 80 − 46 = 34. Ellenőrzés: 46 + 34 = 80. Még 34 darab hiányzik.'
  },
  {
    id: 'wp100-q12',
    level: 2,
    questionTypeBadge: 'Vigyázz!',
    figure: <CompareFig topName="piros" top="52 cm" botName="kék" bot="?" diff="9 cm" topLonger />,
    question: 'A piros szalag 52 cm. Ez 9 cm-rel hosszabb a kéknél. Milyen hosszú a kék szalag?',
    options: ['43 cm', '61 cm', '53 cm', '42 cm'],
    correctAnswer: 0,
    explanation: 'A piros a hosszabb, a kék a rövidebb. Ezért kivonunk: 52 − 9 = 43. A kék szalag 43 cm.'
  },
  {
    id: 'wp100-q13',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: (
      <TableFig
        rows={[
          { head: 'doboz', cells: ['1', '2', '3', '7'] },
          { head: 'tojás', cells: ['6', '12', '18', '?'] }
        ]}
      />
    ),
    question: 'Egy dobozban 6 tojás van. Hány tojás van 7 dobozban?',
    options: ['42', '36', '48', '13'],
    correctAnswer: 0,
    explanation: 'Minden dobozban 6 tojás van: 7 · 6 = 42. 7 dobozban 42 tojás van.'
  },
  {
    id: 'wp100-q14',
    level: 2,
    questionTypeBadge: 'Idő',
    figure: <TwoClocksFig h1={3} h2={5} l1="kezdés: 15 óra" l2="vége: 17 óra" />,
    question: 'Az edzés 15 órakor kezdődött és 17 órakor ért véget. Hány óráig tartott?',
    options: ['2 óráig', '3 óráig', '1 óráig', '32 óráig'],
    correctAnswer: 0,
    explanation: '15-től 17-ig: 16, 17 – ez 2 óra. 17 − 15 = 2. Az edzés 2 óráig tartott.'
  },
  {
    id: 'wp100-q15',
    level: 2,
    questionTypeBadge: 'Elágazás',
    figure: <ScarfFig hats={['#ef4444', '#3b82f6']} scarves={['#facc15', '#22c55e', '#a855f7']} />,
    question: 'Van 2 sapkád és 3 sálad. 1 sapkát és 1 sálat veszel fel. Hányféleképpen öltözhetsz fel?',
    options: ['6', '5', '3', '8'],
    correctAnswer: 0,
    explanation: 'Mindkét sapkához 3 sál illik: 2 · 3 = 6. Rajzolj elágazást: minden sapkából 3 ág indul.'
  },
  {
    id: 'wp100-q16',
    level: 2,
    questionTypeBadge: '-val kevesebb',
    figure: <CompareFig topName="tulipán" top="64" botName="nárcisz" bot="?" diff="9-cel kevesebb" topLonger />,
    question: 'A kertben 64 tulipán nyílik. Nárciszból 9-cel kevesebb. Hány nárcisz nyílik?',
    options: ['55', '73', '54', '65'],
    correctAnswer: 0,
    explanation: 'Nárciszból kevesebb van, ezért kivonunk: 64 − 9 = 55. 55 nárcisz nyílik.'
  },
  {
    id: 'wp100-q17',
    level: 2,
    questionTypeBadge: 'Osztás',
    question: '72 matricát 8 gyerek egyenlően oszt szét. Hány matricát kap egy gyerek?',
    options: ['9', '8', '64', '80'],
    correctAnswer: 0,
    explanation: '72 : 8 = 9, mert 8 · 9 = 72. Egy gyerek 9 matricát kap.'
  },
  {
    id: 'wp100-q18',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <PriceFig have="100 Ft" items={[{ n: 'ceruza', p: '65 Ft', c: '#bae6fd' }]} />,
    question: 'Bence 100 Ft-jából 65 Ft-ért ceruzát vett. Mennyi pénze maradt?',
    options: ['35 Ft', '45 Ft', '25 Ft', '165 Ft'],
    correctAnswer: 0,
    explanation: '100 − 65 = 35. Ellenőrzés: 65 + 35 = 100. Bencének 35 Ft-ja maradt.'
  },
  {
    id: 'wp100-q19',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Kata így számolt: 47 + 25 = 72. Melyik számolással ellenőrizheti?',
    options: ['72 − 25 = 47', '72 + 25 = 97', '47 − 25 = 22', '25 + 72 = 97'],
    correctAnswer: 0,
    explanation: 'Az összeadást kivonással ellenőrizzük: 72 − 25 = 47. Visszakaptuk a 47-et, tehát jó volt.'
  },
  {
    id: 'wp100-q20',
    level: 2,
    questionTypeBadge: 'Szakaszos ábra',
    figure: <PartsFig whole="? cm" a="38 cm" b="27 cm" ratio={0.585} caption="sárga csík + zöld csík" />,
    question: 'A sárga csík 38 cm, a zöld 27 cm. Egymás után tesszük őket. Milyen hosszú lesz a csík?',
    options: ['65 cm', '11 cm', '55 cm', '66 cm'],
    correctAnswer: 0,
    explanation: 'A két rész együtt adja az egészet: 38 + 27 = 65. A csík 65 cm hosszú lesz.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'wp100-q21',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <GroupsFig groups={3} per={8} extra={15} label="3 csomag, mindegyikben 8 + 15 kártya" color="#60a5fa" />,
    question: 'Gergő 3 csomag kártyát vett. Mindegyikben 8 kártya van. Már volt 15 kártyája. Hány kártyája lett?',
    options: ['39', '26', '24', '9'],
    correctAnswer: 0,
    explanation: '1. lépés: 3 · 8 = 24 új kártya. 2. lépés: 24 + 15 = 39. Gergőnek 39 kártyája lett.'
  },
  {
    id: 'wp100-q22',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'A tavon 26 kacsa úszott. Jött még 14 kacsa, aztán 9 elrepült. Hány kacsa maradt a tavon?',
    options: ['31', '49', '40', '21'],
    correctAnswer: 0,
    explanation: '1. lépés: 26 + 14 = 40. 2. lépés: 40 − 9 = 31. 31 kacsa maradt a tavon.'
  },
  {
    id: 'wp100-q23',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: (
      <PriceFig
        have="50 Ft"
        items={[
          { n: 'radír', p: '18 Ft', c: '#fbcfe8' },
          { n: 'ceruza', p: '25 Ft', c: '#bae6fd' }
        ]}
      />
    ),
    question: 'Zsófi 50 Ft-ot vitt a boltba. Vett egy 18 Ft-os radírt és egy 25 Ft-os ceruzát. Mennyi pénze maradt?',
    options: ['7 Ft', '43 Ft', '32 Ft', '17 Ft'],
    correctAnswer: 0,
    explanation: '1. lépés: 50 − 18 = 32. 2. lépés: 32 − 25 = 7. Zsófinak 7 Ft-ja maradt. (A 43 Ft az, amennyit elköltött.)'
  },
  {
    id: 'wp100-q24',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <TablesFig />,
    question: 'Az ebédlőben 6 asztal van. Mindegyik mellett 4 szék. 5 szék üres, a többin gyerek ül. Hány gyerek ül?',
    options: ['19', '29', '24', '15'],
    correctAnswer: 0,
    explanation: '1. lépés: 6 · 4 = 24 szék. 2. lépés: 24 − 5 = 19. 19 gyerek ül az ebédlőben.'
  },
  {
    id: 'wp100-q25',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <CompareFig topName="2. polc" top="?" botName="1. polc" bot="32" diff="7-tel több" topLonger />,
    question: 'Az 1. polcon 32 könyv van. A 2. polcon 7-tel több. Hány könyv van a két polcon összesen?',
    options: ['71', '39', '64', '57'],
    correctAnswer: 0,
    explanation: '1. lépés: a 2. polcon 32 + 7 = 39 könyv van. 2. lépés: 32 + 39 = 71. A két polcon 71 könyv van.'
  },
  {
    id: 'wp100-q26',
    level: 3,
    questionTypeBadge: 'Próbálgatás',
    figure: (
      <TableFig
        rows={[
          { head: 'öccse', cells: ['3', '4', '5', '?'] },
          { head: 'Dóri', cells: ['6', '8', '10', '?'] },
          { head: 'együtt', cells: ['9', '12', '15', '18'] }
        ]}
      />
    ),
    question: 'Dóri kétszer annyi idős, mint az öccse. Együtt 18 évesek. Hány éves Dóri?',
    options: ['12 éves', '6 éves', '9 éves', '16 éves'],
    correctAnswer: 0,
    explanation: 'Próbálgass! Öccse 6, Dóri 12: 6 + 12 = 18. Ez jó! Dóri 12 éves. (A 6 az öccse kora.)'
  },
  {
    id: 'wp100-q27',
    level: 3,
    questionTypeBadge: 'Idő',
    figure: <TwoClocksFig h1={4} l1="kezdés: 16 óra" l2="vége" />,
    question: 'A film 16 órakor kezdődik, és 2 óráig tart. Utána még 1 órát sétálunk. Hány órakor ér véget a séta?',
    options: ['19 órakor', '18 órakor', '17 órakor', '20 órakor'],
    correctAnswer: 0,
    explanation: '1. lépés: 16 + 2 = 18, ekkor ér véget a film. 2. lépés: 18 + 1 = 19. A séta 19 órakor ér véget.'
  },
  {
    id: 'wp100-q28',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <GroupsFig groups={5} label="40 alma, 5 kosár – egy kosárban ?" color="#22c55e" />,
    question: '40 almát 5 kosárba rakunk egyenlően. Az egyik kosárból 3 almát megettünk. Hány alma maradt abban a kosárban?',
    options: ['5', '8', '37', '7'],
    correctAnswer: 0,
    explanation: '1. lépés: 40 : 5 = 8 alma jut egy kosárba. 2. lépés: 8 − 3 = 5. Abban a kosárban 5 alma maradt.'
  },
  {
    id: 'wp100-q29',
    level: 3,
    questionTypeBadge: 'Elágazás',
    figure: <BreadFig />,
    question: '3-féle kenyér és 3-féle feltét volt. A sajt elfogyott. Hányféle szendvicset készíthetsz 1 kenyérből és 1 feltétből?',
    options: ['6', '9', '5', '8'],
    correctAnswer: 0,
    explanation: 'Csak 2 feltét maradt. Minden kenyérhez 2 feltét: 3 · 2 = 6. Sajttal együtt 9 lett volna.'
  },
  {
    id: 'wp100-q30',
    level: 3,
    questionTypeBadge: 'Terv',
    question: 'A dobozban 45 golyó volt. Levi kivett 9-et, Noémi 6-ot. Hány golyó maradt? Melyik terv jó?',
    options: ['45 − 9 = 36,  36 − 6 = 30', '45 − 9 = 36,  36 + 6 = 42', '45 + 9 = 54,  54 + 6 = 60', '9 + 6 = 15,  45 + 15 = 60'],
    correctAnswer: 0,
    explanation: 'Mindketten kivettek, ezért kétszer vonunk ki: 45 − 9 = 36, aztán 36 − 6 = 30. 30 golyó maradt.'
  }
];

export const WordProblems100G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId="g3-c100-szoveges-quiz"
      subtopicId="szoveges-feladatok"
      title="5. Szöveges feladatok – Kvíz"
      subtitle="30 feladat 3 szinten: összevonás, elvétel, több-kevesebb, szorzás, osztás, kétlépéses feladatok."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • KVÍZ"
      questions={WORD_PROBLEMS_100_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az 5 lépés',
          items: ['1. Adatok: mit tudunk?', '2. Terv: számfeladat', '3. Számolás', '4. Ellenőrzés', '5. Válasz mondatban']
        },
        {
          title: 'Melyik művelet?',
          items: ['együtt, összesen, több lett: +', 'elment, maradt, kevesebb: −', 'mindegyikben ugyanannyi: ·', 'egyenlően elosztjuk, hányszor van meg: :']
        },
        {
          title: 'Vigyázz!',
          items: ['Kinek van több? Kinek van kevesebb?', '„52 cm, ez 9 cm-rel hosszabb a kéknél” → 52 − 9', 'Két lépés: mindkettőt számold ki!', 'Erre kérdeztek? Nézd meg a mértékegységet is!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WordProblems100G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <WordProblems100G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default WordProblems100G3Quiz;
