import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Div3G2Matcher } from './Div3G2Matcher';
import { Div3G2Sorter } from './Div3G2Sorter';
import { DIV3_FONT, PlatePart, RingedDotsPart, JumpBackPart } from './Div3G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 110 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV3_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** 3 tányér `each` sütivel, mellette `rest` kimaradt süti. */
const PlatesQ: React.FC<{ each: number; rest?: number }> = ({ each, rest = 0 }) => {
  const shift = rest > 0 ? -18 : 0;
  return (
    <QFig h={76}>
      {[0, 1, 2].map((p) => (
        <PlatePart key={p} cx={52 + p * 78 + shift} cy={38} w={70} count={each} />
      ))}
      {Array.from({ length: rest }, (_, i) => (
        <circle key={`r${i}`} cx={236} cy={28 + i * 18} r="6" fill="#f59e0b" stroke="#78350f" strokeWidth="1.2" />
      ))}
    </QFig>
  );
};

/** Doboz `n` sütivel + 3 üres tányér „?”-lel. */
const PileQ: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={84}>
    <rect x="14" y="20" width="54" height="44" rx="8" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
    <text x="41" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill="#78350f">
      {n}
    </text>
    <path d="M 72 42 L 86 42" stroke="#0891b2" strokeWidth="3" />
    <path d="M 83 36 L 91 42 L 83 48 Z" fill="#0891b2" />
    {[0, 1, 2].map((p) => (
      <PlatePart key={p} cx={120 + p * 52} cy={42} w={48} unknown />
    ))}
  </QFig>
);

const RingsQ: React.FC<{ n: number; ringed?: number }> = ({ n, ringed = 0 }) => {
  const perRow = 6;
  const rows = Math.ceil(n / perRow);
  const step = 26;
  return (
    <QFig h={rows * step + 18}>
      <RingedDotsPart x={130 - (5 * step) / 2} y={22} n={n} ringed={ringed} perRow={perRow} step={step} r={9} color={ringed > 0 ? '#94a3b8' : '#3b82f6'} />
    </QFig>
  );
};

const JumpBackQ: React.FC<{ start: number }> = ({ start }) => (
  <QFig h={88}>
    <JumpBackPart x0={14} y={56} unit={228 / 30} start={start} labels={[0, start]} fontSize={12} />
  </QFig>
);

const ThirdArrowQ: React.FC<{ from: string; to: string }> = ({ from, to }) => (
  <QFig h={84}>
    <rect x="22" y="20" width="60" height="44" rx="10" fill="#fff" stroke="#e11d48" strokeWidth="3" />
    <text x="52" y="51" textAnchor="middle" fontSize="22" fontWeight="900" fill={from === '?' ? UNK : '#881337'}>
      {from}
    </text>
    <line x1="88" y1="42" x2="166" y2="42" stroke="#0891b2" strokeWidth="4" />
    <path d="M 160 34 L 172 42 L 160 50 Z" fill="#0891b2" />
    <text x="128" y="34" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0e7490">
      harmada
    </text>
    <rect x="178" y="20" width="60" height="44" rx="10" fill="#fff" stroke="#e11d48" strokeWidth="3" />
    <text x="208" y="51" textAnchor="middle" fontSize="22" fontWeight="900" fill={to === '?' ? UNK : '#881337'}>
      {to}
    </text>
  </QFig>
);

const ArrayQ: React.FC<{ rows: number; cols: number }> = ({ rows, cols }) => {
  const step = 26;
  const w = (cols - 1) * step;
  return (
    <QFig h={(rows - 1) * step + 40}>
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        return <circle key={i} cx={130 - w / 2 + c * step} cy={20 + r * step} r="9" fill={['#ef4444', '#3b82f6', '#f59e0b'][r]} stroke="#1e293b" strokeWidth="1.2" />;
      })}
    </QFig>
  );
};

const StarPath = (cx: number, cy: number, R: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? R : R * 0.45;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
};

const StickersQ: React.FC = () => (
  <QFig h={84}>
    {Array.from({ length: 20 }, (_, i) => {
      const cx = 22 + (i % 10) * 24;
      const cy = 24 + Math.floor(i / 10) * 34;
      const gone = i >= 18;
      return (
        <g key={i}>
          <polygon points={StarPath(cx, cy, 10)} fill={gone ? '#e2e8f0' : '#facc15'} stroke={gone ? '#94a3b8' : '#a16207'} strokeWidth="1.3" />
          {gone && <line x1={cx - 10} y1={cy - 10} x2={cx + 10} y2={cy + 10} stroke={UNK} strokeWidth="3" />}
        </g>
      );
    })}
  </QFig>
);

const SticksQ: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={76}>
    {Array.from({ length: n }, (_, i) => {
      const x = 130 - ((n - 1) * 13) / 2 + i * 13;
      return <line key={i} x1={x} y1={16} x2={x} y2={60} stroke={['#f59e0b', '#ef4444', '#3b82f6'][i % 3]} strokeWidth="5" strokeLinecap="round" />;
    })}
  </QFig>
);

const TeamsQ: React.FC = () => (
  <QFig h={96}>
    <text x="130" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
      15 gyerek, 3 csapat
    </text>
    {[0, 1, 2].map((t) => (
      <g key={t}>
        <circle cx={52 + t * 78} cy={62} r="26" fill={['#dbeafe', '#dcfce7', '#fee2e2'][t]} stroke={['#2563eb', '#16a34a', '#dc2626'][t]} strokeWidth="3" />
        <text x={52 + t * 78} y={70} textAnchor="middle" fontSize="22" fontWeight="900" fill={UNK}>
          ?
        </text>
      </g>
    ))}
    <text x="52" y="30" textAnchor="middle" fontSize="13" fontWeight="900" fill="#2563eb">+ 1</text>
  </QFig>
);

const ThirdTableQ: React.FC = () => {
  const top = ['9', '12', '27', '?'];
  const bottom = ['3', '4', '9', '10'];
  return (
    <QFig h={96}>
      <text x="40" y="38" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">szám</text>
      <text x="40" y="74" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">harmada</text>
      <rect x="76" y="12" width="172" height="72" rx="8" fill="#fff" stroke="#fda4af" />
      <line x1="76" y1="48" x2="248" y2="48" stroke="#fda4af" />
      {top.map((t, i) => (
        <g key={i}>
          <text x={98 + i * 43} y={37} textAnchor="middle" fontSize="16" fontWeight="900" fill={t === '?' ? UNK : '#0f172a'}>
            {t}
          </text>
          <text x={98 + i * 43} y={73} textAnchor="middle" fontSize="16" fontWeight="900" fill="#be123c">
            {bottom[i]}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const PencilsQ: React.FC = () => (
  <QFig h={92}>
    {Array.from({ length: 14 }, (_, i) => {
      const x = 22 + i * 16;
      return (
        <g key={i}>
          <rect x={x - 4} y={18} width="8" height="40" fill={['#ef4444', '#3b82f6', '#22c55e', '#f59e0b'][i % 4]} stroke="#1e293b" strokeWidth="1" />
          <path d={`M ${x - 4} 58 L ${x} 68 L ${x + 4} 58 Z`} fill="#fde68a" stroke="#1e293b" strokeWidth="1" />
        </g>
      );
    })}
    <text x="130" y="86" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
      14 ceruza – egy dobozba 3 fér
    </text>
  </QFig>
);

const JumpRemQ: React.FC = () => {
  const unit = 228 / 30;
  const X = (v: number) => 14 + v * unit;
  return (
    <QFig h={92}>
      <line x1={X(0) - 4} y1={58} x2={X(30) + 8} y2={58} stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 31 }, (_, v) => (
        <line key={v} x1={X(v)} y1={v % 10 === 0 ? 51 : 54} x2={X(v)} y2={v % 10 === 0 ? 65 : 62} stroke="#334155" strokeWidth={v % 10 === 0 ? 1.8 : 1.1} />
      ))}
      {[0, 10, 20].map((v) => (
        <text key={v} x={X(v)} y={78} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
          {v}
        </text>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M ${X(i * 3)} 55 Q ${X(i * 3 + 1.5)} 36 ${X(i * 3 + 3)} 55`} fill="none" stroke="#7c3aed" strokeWidth="2.2" />
      ))}
      <path d={`M ${X(27)} 55 Q ${X(28)} 44 ${X(29)} 55`} fill="none" stroke="#16a34a" strokeWidth="2.6" />
      <text x={X(28)} y={34} textAnchor="middle" fontSize="12" fontWeight="900" fill="#16a34a">+ 2</text>
      <text x={X(29)} y={80} textAnchor="middle" fontSize="14" fontWeight="900" fill={UNK}>?</text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIV3_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'div3g2-q1',
    level: 1,
    questionTypeBadge: 'Hármasával',
    figure: <RingsQ n={12} />,
    question: '12 gyöngyöt hármasával fűzünk fel. Hány hármas lesz?',
    options: ['4', '3', '9', '12'],
    correctAnswer: 0,
    explanation: 'Karikázz be mindig 3-at: 4 karika lesz. 12 : 3 = 4, mert 4 · 3 = 12.'
  },
  {
    id: 'div3g2-q2',
    level: 1,
    questionTypeBadge: 'Tányérok',
    figure: <PlatesQ each={2} />,
    question: '6 sütit tettünk 3 tányérra egyenlően. Mennyi jut egy tányérra?',
    options: ['2', '3', '6', '9'],
    correctAnswer: 0,
    explanation: 'Minden tányéron 2 süti van. 6 : 3 = 2, mert 2 · 3 = 6.'
  },
  {
    id: 'div3g2-q3',
    level: 1,
    questionTypeBadge: 'Visszaugrás',
    figure: <JumpBackQ start={9} />,
    question: '9 : 3 = ?',
    options: ['3', '6', '12', '1'],
    correctAnswer: 0,
    explanation: 'A 9-től hármasával 0-ig: 3 ugrás. 9 : 3 = 3, mert 3 · 3 = 9.'
  },
  {
    id: 'div3g2-q4',
    level: 1,
    questionTypeBadge: 'Osztás',
    question: '15 : 3 = ?',
    options: ['5', '12', '18', '4'],
    correctAnswer: 0,
    explanation: '5 · 3 = 15, ezért 15 : 3 = 5.'
  },
  {
    id: 'div3g2-q5',
    level: 1,
    questionTypeBadge: 'Mindenkinek egy',
    figure: <PlatesQ each={1} />,
    question: '3 almát osztunk szét 3 gyerek között. Mennyi jut egynek?',
    options: ['1', '0', '3', '6'],
    correctAnswer: 0,
    explanation: 'Mindenki kap egyet: 3 : 3 = 1.'
  },
  {
    id: 'div3g2-q6',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik szorzás bizonyítja, hogy 18 : 3 = 6?',
    options: ['6 · 3 = 18', '6 + 3 = 9', '18 − 3 = 15', '18 + 3 = 21'],
    correctAnswer: 0,
    explanation: 'Az osztást szorzással ellenőrizzük: 6 · 3 = 18. Jó!'
  },
  {
    id: 'div3g2-q7',
    level: 1,
    questionTypeBadge: 'Nulla',
    figure: <PlatesQ each={0} />,
    question: '0 : 3 = ?',
    options: ['0', '3', '1', '30'],
    correctAnswer: 0,
    explanation: 'Ha nincs semmi, egyik tányérra sem jut semmi: 0 : 3 = 0.'
  },
  {
    id: 'div3g2-q8',
    level: 1,
    questionTypeBadge: 'Kimaradt',
    figure: <RingsQ n={7} ringed={2} />,
    question: 'Hány korong maradt ki a karikákból?',
    options: ['1', '2', '3', '0'],
    correctAnswer: 0,
    explanation: '7 korong: 2 karika (6 korong), és 1 kimaradt.'
  },
  {
    id: 'div3g2-q9',
    level: 1,
    questionTypeBadge: 'Harmada',
    figure: <ThirdArrowQ from="6" to="?" />,
    question: 'Mennyi a 6 harmada?',
    options: ['2', '3', '18', '9'],
    correctAnswer: 0,
    explanation: 'A 6-ot 3 egyenlő részre osztjuk: 2 + 2 + 2. A 6 harmada 2.'
  },
  {
    id: 'div3g2-q10',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: '30 : 3 = ?',
    options: ['10', '27', '33', '3'],
    correctAnswer: 0,
    explanation: '10 · 3 = 30, ezért 30 : 3 = 10.'
  },

  // ---------- 2. szint ----------
  {
    id: 'div3g2-q11',
    level: 2,
    questionTypeBadge: 'Sorok',
    figure: <ArrayQ rows={3} cols={7} />,
    question: '21 pötty van 3 egyforma sorban. Hány pötty van egy sorban?',
    options: ['7', '3', '18', '24'],
    correctAnswer: 0,
    explanation: '21 : 3 = 7, mert 7 · 3 = 21. Számold meg az egyik sort: 7.'
  },
  {
    id: 'div3g2-q12',
    level: 2,
    questionTypeBadge: 'Osztás',
    question: '24 : 3 = ?',
    options: ['8', '7', '21', '6'],
    correctAnswer: 0,
    explanation: '8 · 3 = 24, ezért 24 : 3 = 8.'
  },
  {
    id: 'div3g2-q13',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: '□ : 3 = 9. Mennyi a □?',
    options: ['27', '3', '12', '6'],
    correctAnswer: 0,
    explanation: 'Szorozz vissza: 9 · 3 = 27. Tehát 27 : 3 = 9.'
  },
  {
    id: 'div3g2-q14',
    level: 2,
    questionTypeBadge: 'Szétosztás',
    figure: <PileQ n={18} />,
    question: '18 epret osztunk 3 tányérra egyenlően. Mennyi jut egyre?',
    options: ['6', '5', '15', '9'],
    correctAnswer: 0,
    explanation: '6 · 3 = 18, ezért 18 : 3 = 6. Minden tányérra 6 eper jut.'
  },
  {
    id: 'div3g2-q15',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel kerül a □ helyére?   27 : 3 □ 2 · 3',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '27 : 3 = 9 és 2 · 3 = 6. A 9 több, tehát 27 : 3 > 2 · 3.'
  },
  {
    id: 'div3g2-q16',
    level: 2,
    questionTypeBadge: 'Maradék',
    figure: <RingsQ n={10} />,
    question: '10 golyót teszünk hármasával dobozokba. Hány doboz telik meg, és mennyi marad?',
    options: ['3 doboz, 1 marad', '3 doboz, 0 marad', '4 doboz, 1 marad', '2 doboz, 4 marad'],
    correctAnswer: 0,
    explanation: '3 · 3 = 9, és 9 + 1 = 10. Tehát 3 doboz telik meg, és 1 golyó marad.'
  },
  {
    id: 'div3g2-q17',
    level: 2,
    questionTypeBadge: 'Hányszor van meg?',
    figure: <JumpBackQ start={13} />,
    question: 'Hányszor van meg a 3 a 13-ban? Mennyi marad?',
    options: ['4-szer, marad 1', '3-szor, marad 4', '4-szer, marad 3', '5-ször, marad 0'],
    correctAnswer: 0,
    explanation: '13-tól vissza: 10, 7, 4, 1 – ez 4 ugrás, és 1 maradt. 4 · 3 = 12, 12 + 1 = 13.'
  },
  {
    id: 'div3g2-q18',
    level: 2,
    questionTypeBadge: 'Jutott és maradt',
    figure: <PlatesQ each={4} rest={2} />,
    question: '14 kekszet osztottunk szét 3 tányérra. Mennyi jutott egyre, és mennyi maradt?',
    options: ['4 jutott, 2 maradt', '4 jutott, 0 maradt', '5 jutott, 2 maradt', '3 jutott, 2 maradt'],
    correctAnswer: 0,
    explanation: 'Minden tányéron 4 keksz van, mellette 2 maradt. 4 · 3 = 12, 12 + 2 = 14.'
  },
  {
    id: 'div3g2-q19',
    level: 2,
    questionTypeBadge: 'Semmi se marad',
    question: 'Melyik számot lehet hármasával csoportosítani úgy, hogy semmi se maradjon?',
    options: ['18', '19', '20', '17'],
    correctAnswer: 0,
    explanation: '18 = 6 · 3, nem marad semmi. A 17-nél 2, a 19-nél 1, a 20-nál 2 marad.'
  },
  {
    id: 'div3g2-q20',
    level: 2,
    questionTypeBadge: 'Melyik szám harmada?',
    figure: <ThirdArrowQ from="?" to="7" />,
    question: 'Melyik szám harmada a 7?',
    options: ['21', '10', '4', '24'],
    correctAnswer: 0,
    explanation: 'Szorozz vissza: 7 · 3 = 21. A 21 harmada 7.'
  },

  // ---------- 3. szint ----------
  {
    id: 'div3g2-q21',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <StickersQ />,
    question: '20 matricából 2-t elajándékoztál. A többit 3 lapra osztod egyenlően. Mennyi jut egy lapra?',
    options: ['6', '7', '5', '18'],
    correctAnswer: 0,
    explanation: 'Előbb: 20 − 2 = 18. Aztán: 18 : 3 = 6 matrica jut egy lapra.'
  },
  {
    id: 'div3g2-q22',
    level: 3,
    questionTypeBadge: 'Tojásdobozok',
    question: '22 tojást teszünk 3-as dobozokba. Hány doboz telik meg, és mennyi marad?',
    options: ['7 doboz, 1 marad', '6 doboz, 4 marad', '7 doboz, 0 marad', '8 doboz, 1 marad'],
    correctAnswer: 0,
    explanation: '7 · 3 = 21, a 8 · 3 = 24 már sok. 22 − 21 = 1 tojás marad.'
  },
  {
    id: 'div3g2-q23',
    level: 3,
    questionTypeBadge: 'Melyik igaz?',
    question: 'Melyik igaz?',
    options: ['24 : 3 = 8, mert 8 · 3 = 24', '24 : 3 = 7, mert 7 · 3 = 24', '24 : 3 = 21, mert 24 − 3 = 21', '24 : 3 = 6, mert 6 · 3 = 24'],
    correctAnswer: 0,
    explanation: '8 · 3 = 24 igaz. A 7 · 3 csak 21, a 6 · 3 csak 18, a kivonás pedig nem osztás.'
  },
  {
    id: 'div3g2-q24',
    level: 3,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksQ n={17} />,
    question: 'Egy háromszöghöz 3 pálcika kell. 17 pálcikád van. Hány háromszög lesz, és mennyi marad?',
    options: ['5 háromszög, 2 marad', '6 háromszög, 1 marad', '5 háromszög, 1 marad', '4 háromszög, 5 marad'],
    correctAnswer: 0,
    explanation: '5 · 3 = 15, a 6 · 3 = 18 már sok. 17 − 15 = 2 pálcika marad.'
  },
  {
    id: 'div3g2-q25',
    level: 3,
    questionTypeBadge: 'Mekkora maradék?',
    question: 'Hármasával csoportosítunk. Melyik szám lehet a maradék?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 0,
    explanation: 'A maradék csak 0, 1 vagy 2 lehet. Ha 3 vagy több maradna, abból még egy csoport lenne.'
  },
  {
    id: 'div3g2-q26',
    level: 3,
    questionTypeBadge: 'Csapatok',
    figure: <TeamsQ />,
    question: '15 gyerek 3 egyforma csapatba áll. Az egyik csapatba még 1 gyerek jön. Hányan lesznek ott?',
    options: ['6', '5', '4', '16'],
    correctAnswer: 0,
    explanation: 'Előbb: 15 : 3 = 5 gyerek egy csapatban. Aztán: 5 + 1 = 6.'
  },
  {
    id: 'div3g2-q27',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: <ThirdTableQ />,
    question: 'Melyik szám harmada a 10?',
    options: ['30', '13', '7', '3'],
    correctAnswer: 0,
    explanation: 'Szorozz vissza: 10 · 3 = 30. A 30 harmada 10.'
  },
  {
    id: 'div3g2-q28',
    level: 3,
    questionTypeBadge: 'Mérleg',
    question: 'Melyik jel kerül a □ helyére?   18 : 3 □ 12 : 3 + 2',
    options: ['=', '>', '<'],
    correctAnswer: 0,
    explanation: 'Bal oldal: 18 : 3 = 6. Jobb oldal: 12 : 3 = 4, és 4 + 2 = 6. Egyenlők!'
  },
  {
    id: 'div3g2-q29',
    level: 3,
    questionTypeBadge: 'Elég doboz',
    figure: <PencilsQ />,
    question: 'Egy dobozba 3 ceruza fér. Hány doboz kell, hogy mind a 14 ceruza elférjen?',
    options: ['5', '4', '2', '6'],
    correctAnswer: 0,
    explanation: '4 doboz = 12 ceruza, és marad 2. Ennek a 2-nek is kell egy doboz: 4 + 1 = 5.'
  },
  {
    id: 'div3g2-q30',
    level: 3,
    questionTypeBadge: 'Visszafelé gondolkodás',
    figure: <JumpRemQ />,
    question: 'Melyik számban van meg a 3 kilencszer, és marad még 2?',
    options: ['29', '27', '28', '30'],
    correctAnswer: 0,
    explanation: '9 · 3 = 27, és még 2: 27 + 2 = 29.'
  }
];

export const Div3G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="osztas"
    topicId="g2-osztas-3-quiz"
    subtopicId="osztas-3-mal"
    title="2. Osztás 3-mal – Kvíz"
    subtitle="30 feladat 3 szinten: csoportosítás hármasával, szétosztás, a harmada, ellenőrzés szorzással, maradékos osztás."
    badge="2. OSZTÁLY • V. OSZTÁS • KVÍZ"
    questions={DIV3_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Kétféle osztás',
        items: ['Hármasával: hány csoport lesz?', '3 felé: mennyi jut egynek?', '12 : 3 = 4', 'A 12 harmada 4']
      },
      {
        title: 'Ellenőrizz szorzással!',
        items: ['18 : 3 = 6, mert 6 · 3 = 18', '21 : 3 = 7, mert 7 · 3 = 21', '27 : 3 = 9, mert 9 · 3 = 27', '0 : 3 = 0, 30 : 3 = 10']
      },
      {
        title: 'Maradékos osztás 3-mal',
        items: ['14: 4 csoport, maradt 2', 'Ellenőrzés: 4 · 3 = 12, 12 + 2 = 14', 'A maradék csak 0, 1 vagy 2', 'Ha 3 maradna, lenne még egy csoport']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Div3G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Div3G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Div3G2Quiz;
