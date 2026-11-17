import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ArrangementsG3Matcher } from './ArrangementsG3Matcher';
import { ArrangementsG3Sorter } from './ArrangementsG3Sorter';
import { FONT, UNK, B, Block, LogicBlock, Ball, DigitCard, Kid, Tower, Shirt, Pants, Scoop, T, PalName } from './ArrangementsG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Cards: React.FC<{ digits: (string | number)[] }> = ({ digits }) => {
  const n = digits.length;
  const w = 40;
  const gap = 14;
  const x0 = 120 - (n * w + (n - 1) * gap) / 2;
  return (
    <QFig h={90}>
      {digits.map((d, i) => (
        <DigitCard key={i} x={x0 + i * (w + gap)} y={16} d={d} w={w} h={56} fs={32} fill={String(d) === '0' ? '#fef3c7' : '#ffffff'} />
      ))}
    </QFig>
  );
};

const Balls: React.FC<{ balls: PalName[] }> = ({ balls }) => {
  const step = 56;
  const x0 = 120 - ((balls.length - 1) * step) / 2;
  return (
    <QFig h={80}>
      {balls.map((c, i) => (
        <Ball key={i} x={x0 + i * step} y={40} r={20} c={c} sw={3} />
      ))}
    </QFig>
  );
};

const Towers: React.FC<{ heights: number[] }> = ({ heights }) => {
  const cols: PalName[] = ['piros', 'kek', 'zold', 'sarga'];
  const step = 60;
  const x0 = 120 - ((heights.length - 1) * step) / 2;
  return (
    <QFig h={140}>
      <line x1="16" y1="112" x2="224" y2="112" stroke="#334155" strokeWidth="3" />
      {heights.map((h, i) => (
        <g key={i}>
          <Tower x={x0 + i * step} y={112} n={h} s={14} c={cols[i % 4]} />
          <T x={x0 + i * step} y={132} s={16}>{'ABCD'[i]}</T>
        </g>
      ))}
    </QFig>
  );
};

/** Logikai lapok egy keretben (számozva vagy anélkül). */
const Blocks: React.FC<{ blocks: Block[]; numbered?: boolean }> = ({ blocks, numbered = false }) => {
  const n = blocks.length;
  const step = 228 / n;
  return (
    <QFig h={numbered ? 112 : 96}>
      {blocks.map((b, i) => (
        <g key={i}>
          <LogicBlock b={b} x={6 + step * (i + 0.5)} y={48} k={n > 4 ? 0.85 : 1} />
          {numbered && <T x={6 + step * (i + 0.5)} y={100} s={14}>{i + 1}.</T>}
        </g>
      ))}
    </QFig>
  );
};

/** Számok egy halmazban (keretben). */
const NumSet: React.FC<{ nums: number[] }> = ({ nums }) => {
  const pos = [
    [60, 42],
    [150, 36],
    [196, 76],
    [100, 82],
    [44, 104],
    [160, 112]
  ];
  return (
    <QFig h={136}>
      <rect x="14" y="12" width="212" height="112" rx="26" fill="#ecfeff" stroke="#0891b2" strokeWidth="2.5" />
      {nums.map((n, i) => (
        <T key={i} x={pos[i][0]} y={pos[i][1] + 7} s={20}>{n}</T>
      ))}
    </QFig>
  );
};

const KidsRow: React.FC<{ kids: [PalName, string][] }> = ({ kids }) => {
  const step = 70;
  const x0 = 120 - ((kids.length - 1) * step) / 2;
  return (
    <QFig h={110}>
      {kids.map(([c, name], i) => (
        <g key={i}>
          <Kid x={x0 + i * step} y={80} c={c} letter={name[0]} h={62} />
          <T x={x0 + i * step} y={100} s={13}>{name}</T>
        </g>
      ))}
    </QFig>
  );
};

const Arr: React.FC<{ x1: number; y1: number; x2: number; y2: number }> = ({ x1, y1, x2, y2 }) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const L = 10;
  const p = (s: number) => `${(x2 - L * Math.cos(a + s)).toFixed(1)},${(y2 - L * Math.sin(a + s)).toFixed(1)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - 5 * Math.cos(a)} y2={y2 - 5 * Math.sin(a)} stroke="#0f766e" strokeWidth="3" strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${p(0.45)} ${p(-0.45)}`} fill="#0f766e" />
    </g>
  );
};

/** Nyilas ábra 3 gyerekkel: a nyíl az alacsonyabbtól a magasabb felé mutat. */
const ArrowKids: React.FC = () => (
  <QFig h={150}>
    <Kid x={40} y={126} c="sarga" letter="B" h={52} />
    <Kid x={120} y={74} c="lila" letter="K" h={52} />
    <Kid x={200} y={126} c="zold" letter="D" h={52} />
    <T x={40} y={144} s={12}>Bori</T>
    <T x={120} y={14} s={12}>Kata</T>
    <T x={200} y={144} s={12}>Dani</T>
    <Arr x1={56} y1={90} x2={100} y2={58} />
    <Arr x1={182} y1={104} x2={62} y2={104} />
  </QFig>
);

/** Felírt sorrendek, egy hiányzik. */
const OrderList: React.FC = () => {
  const rows: PalName[][] = [
    ['piros', 'kek', 'zold'],
    ['piros', 'zold', 'kek'],
    ['kek', 'piros', 'zold'],
    ['kek', 'zold', 'piros'],
    ['zold', 'piros', 'kek']
  ];
  return (
    <QFig h={150}>
      {rows.map((r, i) => {
        const cx = i < 3 ? 62 : 178;
        const cy = 28 + (i % 3) * 44;
        return (
          <g key={i}>
            {r.map((c, k) => (
              <Ball key={k} x={cx - 30 + k * 30} y={cy} r={12} c={c} />
            ))}
          </g>
        );
      })}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <circle cx={148 + k * 30} cy={116} r={12} fill="#fee2e2" stroke={UNK} strokeWidth="2.5" strokeDasharray="4 3" />
          <T x={148 + k * 30} y={121} s={14} c={UNK}>?</T>
        </g>
      ))}
    </QFig>
  );
};

const Outfits: React.FC<{ shirts: PalName[]; pants: PalName[] }> = ({ shirts, pants }) => {
  const row = (items: PalName[], y: number, shirt: boolean) => {
    const x0 = 120 - ((items.length - 1) * 50) / 2;
    return items.map((c, i) => (shirt ? <Shirt key={i} x={x0 + i * 50} y={y} c={c} r={18} /> : <Pants key={i} x={x0 + i * 50} y={y} c={c} r={18} />));
  };
  return (
    <QFig h={124}>
      {row(shirts, 36, true)}
      {row(pants, 90, false)}
    </QFig>
  );
};

const Podium: React.FC = () => (
  <QFig h={150}>
    <rect x="90" y="88" width="60" height="50" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
    <rect x="30" y="104" width="60" height="34" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
    <rect x="150" y="114" width="60" height="24" fill="#fed7aa" stroke="#9a3412" strokeWidth="2.5" />
    <T x={120} y={120} s={20}>1</T>
    <T x={60} y={128} s={18}>2</T>
    <T x={180} y={132} s={16}>3</T>
    {[60, 120, 180].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy={[78, 62, 88][i]} r={14} fill="#fee2e2" stroke={UNK} strokeWidth="2.5" strokeDasharray="4 3" />
        <T x={x} y={[84, 68, 94][i]} s={16} c={UNK}>?</T>
      </g>
    ))}
    <T x={120} y={24} s={12} c="#475569" w="normal">Dorka, Olivér, Hanna</T>
  </QFig>
);

const Snails: React.FC = () => (
  <QFig h={120}>
    <line x1="210" y1="10" x2="210" y2="110" stroke="#0f172a" strokeWidth="3" strokeDasharray="6 4" />
    <T x={210} y={116} s={11} c="#475569" w="normal">cél</T>
    {(['piros', 'kek', 'zold'] as PalName[]).map((c, i) => {
      const y = 30 + i * 34;
      return (
        <g key={c}>
          <line x1="14" y1={y + 10} x2="200" y2={y + 10} stroke="#cbd5e1" strokeWidth="2" />
          <ellipse cx={60} cy={y + 5} rx={24} ry={6} fill="#e7c9a9" stroke="#78350f" strokeWidth="2" />
          <circle cx={60} cy={y - 4} r={12} fill={c === 'piros' ? '#ef4444' : c === 'kek' ? '#3b82f6' : '#22c55e'} stroke="#334155" strokeWidth="2.5" />
          <line x1={80} y1={y} x2={86} y2={y - 12} stroke="#78350f" strokeWidth="2" />
          <circle cx={86} cy={y - 13} r={2.5} fill="#78350f" />
        </g>
      );
    })}
  </QFig>
);

const DogCards: React.FC = () => {
  const dogs: [string, string, string, string][] = [
    ['Bodri', '6 éves', 'barna', '#b45309'],
    ['Folti', '5 éves', 'fekete', '#334155'],
    ['Morzsi', '3 éves', 'fekete', '#334155'],
    ['Csoki', '7 éves', 'barna', '#b45309']
  ];
  return (
    <QFig h={104}>
      {dogs.map(([n, a, c, col], i) => (
        <g key={n}>
          <rect x={8 + i * 57} y="10" width="54" height="84" rx="10" fill="#ffffff" stroke={col} strokeWidth="3" />
          <T x={35 + i * 57} y={34} s={13}>{n}</T>
          <T x={35 + i * 57} y={58} s={12} w="normal">{a}</T>
          <T x={35 + i * 57} y={80} s={12} w="normal" c={col}>{c}</T>
        </g>
      ))}
    </QFig>
  );
};

const Scoops: React.FC<{ flavours: PalName[] }> = ({ flavours }) => {
  const step = 60;
  const x0 = 120 - ((flavours.length - 1) * step) / 2;
  return (
    <QFig h={100}>
      {flavours.map((c, i) => (
        <Scoop key={i} x={x0 + i * step} y={34} c={c} r={18} />
      ))}
    </QFig>
  );
};

const Routes: React.FC = () => (
  <QFig h={120}>
    {[-30, 30].map((o, i) => (
      <path key={i} d={`M30 60 Q75 ${60 + o * 1.4} 120 60`} fill="none" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" />
    ))}
    {[-34, 0, 34].map((o, i) => (
      <path key={i} d={`M120 60 Q165 ${60 + o * 1.4} 210 60`} fill="none" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
    ))}
    <rect x="16" y="46" width="28" height="28" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="2.5" />
    <path d="M12 48 L30 32 L48 48 Z" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="120" cy="60" r="13" fill="#22c55e" stroke="#14532d" strokeWidth="2.5" />
    <rect x="196" y="42" width="30" height="34" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
    <T x={30} y={100} s={12}>ház</T>
    <T x={120} y={100} s={12}>park</T>
    <T x={211} y={100} s={12}>iskola</T>
  </QFig>
);

const FourKids: React.FC = () => (
  <QFig h={140}>
    <Kid x={60} y={60} c="piros" letter="A" h={48} />
    <Kid x={180} y={60} c="kek" letter="B" h={48} />
    <Kid x={60} y={128} c="zold" letter="C" h={48} />
    <Kid x={180} y={128} c="sarga" letter="D" h={48} />
    <T x={120} y={82} s={28} c={UNK}>?</T>
  </QFig>
);

const OneShirtPants: React.FC = () => (
  <QFig h={124}>
    {(['piros', 'kek', 'zold'] as PalName[]).map((c, i) => (
      <Shirt key={c} x={70 + i * 50} y={36} c={c} r={18} />
    ))}
    <Pants x={120} y={90} c="barna" r={18} />
  </QFig>
);

const KidsAges: React.FC = () => (
  <QFig h={112}>
    {([
      ['narancs', 'Dani', '8 éves'],
      ['lila', 'Kata', '10 éves'],
      ['zold', 'Bori', '9 éves']
    ] as [PalName, string, string][]).map(([c, n, a], i) => (
      <g key={n}>
        <Kid x={50 + i * 70} y={66} c={c} letter={n[0]} h={56} />
        <T x={50 + i * 70} y={84} s={13}>{n}</T>
        <T x={50 + i * 70} y={102} s={12} w="normal" c="#475569">{a}</T>
      </g>
    ))}
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ARRANGEMENTS_G3_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'arr-g3-q1',
    level: 1,
    questionTypeBadge: 'Sorba rendezés',
    figure: <Towers heights={[4, 2, 6]} />,
    question: 'Rakd sorba a tornyokat a legalacsonyabbtól! Melyik a jó sorrend?',
    options: ['B, A, C', 'C, A, B', 'A, B, C', 'B, C, A'],
    correctAnswer: 0,
    explanation: 'B 2 kocka, A 4 kocka, C 6 kocka. A legalacsonyabb a B, aztán az A, végül a C.'
  },
  {
    id: 'arr-g3-q2',
    level: 1,
    questionTypeBadge: 'Csökkenő sorrend',
    question: 'Melyik sor csökkenő? (A legnagyobbal kezdődik.)',
    options: ['410, 401, 140', '140, 401, 410', '401, 410, 140', '410, 140, 401'],
    correctAnswer: 0,
    explanation: 'Csökkenő sorrend: mindig kisebb jön. 410 > 401 > 140. A többi sorban valahol nagyobb szám jön.'
  },
  {
    id: 'arr-g3-q3',
    level: 1,
    questionTypeBadge: 'Hányféle sorrend?',
    figure: <KidsRow kids={[['kek', 'Levi'], ['rozsa', 'Panna']]} />,
    question: 'Hányféle sorrendben állhat be a 2 gyerek a sorba?',
    options: ['2', '1', '3', '4'],
    correctAnswer: 0,
    explanation: 'Levi, Panna vagy Panna, Levi. Ez 2 sorrend.'
  },
  {
    id: 'arr-g3-q4',
    level: 1,
    questionTypeBadge: 'Számkártyák',
    figure: <Cards digits={[5, 8]} />,
    question: 'Melyik két kétjegyű számot rakhatod ki a 2 kártyából?',
    options: ['58 és 85', '55 és 88', '50 és 80', '58 és 13'],
    correctAnswer: 0,
    explanation: 'Mindkét kártyát egyszer teszed le: 5 és 8, vagy 8 és 5. Így 58 és 85 lesz.'
  },
  {
    id: 'arr-g3-q5',
    level: 1,
    questionTypeBadge: 'Igaz vagy hamis?',
    figure: <Blocks blocks={[B('piros', 'kor', true, false), B('piros', 'haromszog', false, true), B('piros', 'negyzet', true, true), B('piros', 'kor', false, false)]} />,
    question: '„Mindegyik lap piros.” Igaz vagy hamis?',
    options: ['Igaz', 'Hamis'],
    correctAnswer: 0,
    explanation: 'Nézd meg egyenként: mind a 4 lap piros. Az állítás igaz.'
  },
  {
    id: 'arr-g3-q6',
    level: 1,
    questionTypeBadge: 'Igaz vagy hamis?',
    figure: <Blocks blocks={[B('kek', 'kor', true, false), B('piros', 'negyzet', false, false), B('sarga', 'haromszog', true, true), B('kek', 'negyzet', true, true)]} />,
    question: '„Van olyan lap, amelyik zöld.” Igaz vagy hamis?',
    options: ['Hamis', 'Igaz'],
    correctAnswer: 0,
    explanation: 'Egyetlen zöld lapot sem látsz. Kék, piros, sárga, kék. Az állítás hamis.'
  },
  {
    id: 'arr-g3-q7',
    level: 1,
    questionTypeBadge: 'Sorba rendezés',
    figure: <KidsAges />,
    question: 'Ki a legidősebb?',
    options: ['Kata', 'Bori', 'Dani'],
    correctAnswer: 0,
    explanation: 'Sorba rakva: Dani 8, Bori 9, Kata 10 éves. A legidősebb Kata.'
  },
  {
    id: 'arr-g3-q8',
    level: 1,
    questionTypeBadge: 'Minden, van olyan',
    figure: <NumSet nums={[12, 40, 36, 28]} />,
    question: 'Melyik állítás igaz a számokra?',
    options: ['Minden szám páros.', 'Van olyan szám, amelyik páratlan.', 'Minden szám háromjegyű.', 'Egyik szám sem kerek tízes.'],
    correctAnswer: 0,
    explanation: 'A 12, 40, 36, 28 mind páros. Háromjegyű nincs köztük. A 40 kerek tízes.'
  },
  {
    id: 'arr-g3-q9',
    level: 1,
    questionTypeBadge: 'Öltözetek',
    figure: <OneShirtPants />,
    question: '3 pólód és 1 nadrágod van. Hányféleképpen öltözhetsz fel?',
    options: ['3', '1', '4', '6'],
    correctAnswer: 0,
    explanation: 'A nadrág mindig ugyanaz. Csak a pólót választod: 3 póló, 3 öltözet.'
  },
  {
    id: 'arr-g3-q10',
    level: 1,
    questionTypeBadge: 'Növekvő sorrend',
    question: 'Rakd növekvő sorrendbe: 305, 350, 53. Melyik lesz az első?',
    options: ['53', '305', '350'],
    correctAnswer: 0,
    explanation: 'Növekvő sorrend: a legkisebb jön előre. Az 53 kétjegyű, ez a legkisebb: 53, 305, 350.'
  },
  // ----- 2. szint -----
  {
    id: 'arr-g3-q11',
    level: 2,
    questionTypeBadge: 'Hányféle sorrend?',
    figure: <Balls balls={['piros', 'kek', 'zold']} />,
    question: 'Hányféle sorrendben rakhatod egymás mellé a 3 golyót?',
    options: ['6', '3', '9', '4'],
    correctAnswer: 0,
    explanation: 'Piros elöl: 2 sorrend. Kék elöl: 2. Zöld elöl: 2. Összesen 3 · 2 = 6.'
  },
  {
    id: 'arr-g3-q12',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    figure: <Cards digits={[1, 2, 4]} />,
    question: 'Hány háromjegyű számot rakhatsz ki? Minden kártyát egyszer használsz.',
    options: ['6', '3', '9', '4'],
    correctAnswer: 0,
    explanation: '124, 142, 214, 241, 412, 421. Ez 6 szám. Minden számjegy 2-szer áll elöl.'
  },
  {
    id: 'arr-g3-q13',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    figure: <Cards digits={[2, 0, 3]} />,
    question: 'Hány háromjegyű számot rakhatsz ki? Minden kártyát egyszer használsz.',
    options: ['4', '6', '3', '2'],
    correctAnswer: 0,
    explanation: '203, 230, 302, 320. A 0 nem állhat elöl, mert a 023 nem háromjegyű. Ezért csak 4 szám van.'
  },
  {
    id: 'arr-g3-q14',
    level: 2,
    questionTypeBadge: 'Legnagyobb szám',
    figure: <Cards digits={[4, 1, 3]} />,
    question: 'Melyik a legnagyobb háromjegyű szám, amit kirakhatsz?',
    options: ['431', '413', '341', '134'],
    correctAnswer: 0,
    explanation: 'A legnagyobb jegy kerül előre: 4. Aztán a 3, végül az 1. Így 431.'
  },
  {
    id: 'arr-g3-q15',
    level: 2,
    questionTypeBadge: 'Legkisebb szám',
    figure: <Cards digits={[2, 0, 4]} />,
    question: 'Melyik a legkisebb háromjegyű szám, amit kirakhatsz?',
    options: ['204', '024', '240', '402'],
    correctAnswer: 0,
    explanation: 'A 0 nem állhat elöl. Elöl a 2, aztán a 0, végül a 4: 204. A 024 nem háromjegyű.'
  },
  {
    id: 'arr-g3-q16',
    level: 2,
    questionTypeBadge: 'Öltözetek',
    figure: <Outfits shirts={['piros', 'kek', 'zold']} pants={['barna', 'lila']} />,
    question: 'Hányféleképpen öltözhetsz fel? Egy pólót és egy nadrágot veszel fel.',
    options: ['6', '5', '9', '3'],
    correctAnswer: 0,
    explanation: 'Mindegyik pólóhoz 2 nadrág illik. 3 póló, mindegyikhez 2: 3 · 2 = 6. Nem adunk össze!'
  },
  {
    id: 'arr-g3-q17',
    level: 2,
    questionTypeBadge: 'Nyilas ábra',
    figure: <ArrowKids />,
    question: 'A nyíl az alacsonyabbtól a magasabb felé mutat. Ki a legmagasabb?',
    options: ['Kata', 'Bori', 'Dani'],
    correctAnswer: 0,
    explanation: 'Dani → Bori: Bori magasabb Daninál. Bori → Kata: Kata magasabb Borinál. A legmagasabb Kata.'
  },
  {
    id: 'arr-g3-q18',
    level: 2,
    questionTypeBadge: 'Hiányzó sorrend',
    figure: <OrderList />,
    question: 'Felírtuk a 3 golyó sorrendjeit. Melyik hiányzik?',
    options: ['zöld, kék, piros', 'piros, kék, zöld', 'kék, zöld, piros', 'zöld, piros, kék'],
    correctAnswer: 0,
    explanation: 'Zöld elöl 2 sorrend van: zöld, piros, kék és zöld, kék, piros. A második hiányzik.'
  },
  {
    id: 'arr-g3-q19',
    level: 2,
    questionTypeBadge: 'Rendszerezés',
    question: '3 golyót raksz sorba: piros, kék, zöld. Hány sorrend kezdődik a kékkel?',
    options: ['2', '1', '3', '6'],
    correctAnswer: 0,
    explanation: 'Ha a kék elöl van, a másik kettő kétféleképpen jöhet: kék, piros, zöld és kék, zöld, piros.'
  },
  {
    id: 'arr-g3-q20',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    figure: <Cards digits={[3, 6, 9]} />,
    question: 'Hány kétjegyű számot rakhatsz ki? Egy számba 2 különböző kártyát teszel.',
    options: ['6', '3', '9', '2'],
    correctAnswer: 0,
    explanation: '36, 39, 63, 69, 93, 96. Mindegyik jegy 2-szer áll elöl: 3 · 2 = 6.'
  },
  // ----- 3. szint -----
  {
    id: 'arr-g3-q21',
    level: 3,
    questionTypeBadge: 'Feltétel',
    figure: <Podium />,
    question: 'Dorka, Olivér és Hanna áll a dobogóra. Olivér nem lehet első. Hány sorrend lehet?',
    options: ['4', '6', '3', '2'],
    correctAnswer: 0,
    explanation: 'Összesen 6 sorrend van. Ebből 2-ben Olivér az első. Marad 6 – 2 = 4.'
  },
  {
    id: 'arr-g3-q22',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <Cards digits={[1, 4, 6]} />,
    question: 'Hány 500-nál kisebb háromjegyű számot rakhatsz ki?',
    options: ['4', '6', '2', '3'],
    correctAnswer: 0,
    explanation: 'Elöl csak az 1 vagy a 4 állhat. 146, 164, 416, 461. A 614 és a 641 nagyobb 500-nál. Ez 4 szám.'
  },
  {
    id: 'arr-g3-q23',
    level: 3,
    questionTypeBadge: 'Ki hányadik?',
    figure: <Snails />,
    question: 'A kék csiga nem lett első. A zöld a kék után ért célba. Melyik csiga nyert?',
    options: ['a piros', 'a kék', 'a zöld'],
    correctAnswer: 0,
    explanation: 'A zöld a kék után jött, tehát a zöld nem első. A kék sem első. Csak a piros nyerhetett.'
  },
  {
    id: 'arr-g3-q24',
    level: 3,
    questionTypeBadge: 'Két feltétel',
    figure: <DogCards />,
    question: 'Melyik kutya idősebb 4 évesnél, és nem barna?',
    options: ['Folti', 'Bodri', 'Morzsi', 'Csoki'],
    correctAnswer: 0,
    explanation: '4 évesnél idősebb: Bodri, Folti, Csoki. Ezek közül nem barna: Folti. Morzsi csak 3 éves.'
  },
  {
    id: 'arr-g3-q25',
    level: 3,
    questionTypeBadge: 'Páros számok',
    figure: <Cards digits={[1, 2, 3]} />,
    question: 'Hány páros háromjegyű számot rakhatsz ki? Minden kártyát egyszer használsz.',
    options: ['2', '3', '6', '1'],
    correctAnswer: 0,
    explanation: 'Páros szám a 2-re végződik. A 2 a végén áll, elöl 1 vagy 3: 132 és 312. Ez 2 szám.'
  },
  {
    id: 'arr-g3-q26',
    level: 3,
    questionTypeBadge: 'Minden, van olyan',
    figure: <NumSet nums={[105, 240, 33, 412, 98]} />,
    question: 'Melyik állítás igaz a számokra?',
    options: ['Van olyan szám, amelyik 400-nál nagyobb.', 'Minden szám háromjegyű.', 'Nincs olyan szám, amelyik páros.', 'Minden szám páratlan.'],
    correctAnswer: 0,
    explanation: 'A 412 nagyobb 400-nál, tehát „van olyan” igaz. A 33 és a 98 kétjegyű. A 240 páros.'
  },
  {
    id: 'arr-g3-q27',
    level: 3,
    questionTypeBadge: 'Választás',
    figure: <Scoops flavours={['rozsa', 'barna', 'sarga']} />,
    question: 'Eper, csoki, vanília. 2 különböző gombócot kérsz. A sorrend mindegy. Hányféleképpen választhatsz?',
    options: ['3', '6', '2', '9'],
    correctAnswer: 0,
    explanation: 'Eper-csoki, eper-vanília, csoki-vanília. A csoki-eper ugyanaz, mint az eper-csoki. Ez 3 lehetőség.'
  },
  {
    id: 'arr-g3-q28',
    level: 3,
    questionTypeBadge: 'Útvonalak',
    figure: <Routes />,
    question: 'Hányféleképpen juthatsz el a háztól az iskoláig, ha a parkon át mész?',
    options: ['6', '5', '3', '2'],
    correctAnswer: 0,
    explanation: 'A parkig 2 út vezet. Mindegyik után 3 út jön. 2 · 3 = 6 útvonal.'
  },
  {
    id: 'arr-g3-q29',
    level: 3,
    questionTypeBadge: 'Tedd igazzá!',
    figure: <Blocks numbered blocks={[B('kek', 'kor', true, true), B('sarga', 'negyzet', false, true), B('piros', 'haromszog', true, false), B('zold', 'kor', false, true), B('piros', 'negyzet', true, true)]} />,
    question: 'Egy lapot elveszel. Utána igaz lesz: „Mindegyik lap lyukas.” Melyiket veszed el?',
    options: ['a 3. lapot', 'az 1. lapot', 'a 2. lapot', 'az 5. lapot'],
    correctAnswer: 0,
    explanation: 'Csak a 3. lap (piros háromszög) nem lyukas. Ha elveszed, a többi mind lyukas.'
  },
  {
    id: 'arr-g3-q30',
    level: 3,
    questionTypeBadge: 'Párok',
    figure: <FourKids />,
    question: '4 barát kezet fog. Mindenki mindenkivel egyszer. Hány kézfogás lesz?',
    options: ['6', '12', '4', '8'],
    correctAnswer: 0,
    explanation: 'A kezet fog B-vel, C-vel, D-vel: 3. B még C-vel, D-vel: 2. C még D-vel: 1. 3 + 2 + 1 = 6.'
  }
];

export const ArrangementsG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId="g3-grp-lehetosegek-quiz"
      subtopicId="sorba-rendezes-lehetosegek"
      title="3. Sorba rendezés és lehetőségek – Kvíz"
      subtitle="30 feladat 3 szinten: sorrendek, számkártyák, lehetőségek, igaz vagy hamis."
      badge="3. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • KVÍZ"
      questions={ARRANGEMENTS_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Sorba rendezés',
          items: ['Növekvő: a legkisebbtől a legnagyobbig.', 'Csökkenő: a legnagyobbtól a legkisebbig.', 'Nyilas ábra: kövesd a nyilakat!']
        },
        {
          title: 'Hányféle?',
          items: ['2 dolog: 2 sorrend. 3 dolog: 6 sorrend.', 'Rendszerezz: előbb az első helyet rögzítsd!', 'Háromjegyű szám elején nem állhat 0.', '2 póló, 3 nadrág: 2 · 3 = 6 öltözet.']
        },
        {
          title: 'Igaz vagy hamis?',
          items: ['„Minden”: egy rossz is elég, és hamis.', '„Van olyan”: egy jó is elég, és igaz.', '„Egyik sem / nincs olyan”: egy sem lehet.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ArrangementsG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ArrangementsG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ArrangementsG3Quiz;
