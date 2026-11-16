import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MulRelationsMatcher } from './MulRelationsMatcher';
import { MulRelationsSorter } from './MulRelationsSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Szorzások egymás alatt, a „?” piros. */
const QRows: React.FC<{ rows: [string, string][]; note?: string }> = ({ rows, note }) => {
  const h = 24 + rows.length * 34 + (note ? 18 : 0);
  return (
    <QFig h={h}>
      {rows.map(([l, r], i) => (
        <g key={l}>
          <rect x="30" y={14 + i * 34} width="100" height="26" rx="6" fill="#fff" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="80" y={32 + i * 34} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">{l}</text>
          <text x="145" y={32 + i * 34} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">=</text>
          <rect x="160" y={14 + i * 34} width="60" height="26" rx="6" fill={r === '?' ? '#fee2e2' : '#dcfce7'} stroke={r === '?' ? C_UNK : '#16a34a'} strokeWidth="1.5" />
          <text x="190" y={32 + i * 34} textAnchor="middle" fontSize="13" fontWeight="bold" fill={r === '?' ? C_UNK : '#166534'}>{r}</text>
        </g>
      ))}
      {note && (
        <text x="120" y={h - 8} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6d28d9">{note}</text>
      )}
    </QFig>
  );
};

/** Kéttsoros táblázat (pl. mennyiség → ár). */
const QPairTable: React.FC<{ head: [string, string]; cols: [string, string][] }> = ({ head, cols }) => {
  const w = 180 / cols.length;
  return (
    <QFig h={96}>
      <rect x="10" y="16" width="44" height="30" fill="#0891b2" />
      <text x="32" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">{head[0]}</text>
      <rect x="10" y="46" width="44" height="30" fill="#0e7490" />
      <text x="32" y="66" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">{head[1]}</text>
      {cols.map(([t, b], i) => (
        <g key={`${t}-${i}`}>
          <rect x={54 + i * w} y="16" width={w} height="30" fill="#fff" stroke="#67e8f9" />
          <text x={54 + i * w + w / 2} y="36" textAnchor="middle" fontSize="12" fontWeight="bold" fill={t === '?' ? C_UNK : '#0f172a'}>{t}</text>
          <rect x={54 + i * w} y="46" width={w} height="30" fill="#f0fdfa" stroke="#67e8f9" />
          <text x={54 + i * w + w / 2} y="66" textAnchor="middle" fontSize="11" fontWeight="bold" fill={b === '?' ? C_UNK : '#0f766e'}>{b}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Madarak napi útja oszlopdiagramon. */
const QBirds: React.FC = () => {
  const data: [string, number, string][] = [
    ['seregély', 40, '#2563eb'],
    ['gólya', 200, '#059669'],
    ['sarki csér', 300, '#ea580c']
  ];
  const x0 = 70;
  const s = 0.38;
  return (
    <QFig h={140}>
      {[0, 100, 200, 300, 400].map((v) => (
        <g key={v}>
          <line x1={x0 + v * s} y1="12" x2={x0 + v * s} y2="108" stroke="#cbd5e1" />
          <text x={x0 + v * s} y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">{v}</text>
        </g>
      ))}
      {[50, 150, 250, 350].map((v) => (
        <line key={v} x1={x0 + v * s} y1="12" x2={x0 + v * s} y2="108" stroke="#e2e8f0" strokeDasharray="2 2" />
      ))}
      <line x1={x0} y1="108" x2={x0 + 400 * s} y2="108" stroke="#0f172a" strokeWidth="1.6" />
      <text x="232" y="134" textAnchor="end" fontSize="10" fill="#334155">km / nap</text>
      {data.map(([n, km, c], i) => (
        <g key={n}>
          <text x={x0 - 5} y={32 + i * 30} textAnchor="end" fontSize="10" fontWeight="bold" fill="#334155">{n}</text>
          <rect x={x0} y={20 + i * 30} width={km * s} height="16" rx="2" fill={c} />
        </g>
      ))}
    </QFig>
  );
};

/** Nyíllánc. */
const QChain: React.FC<{ start: string; ops: string[]; boxes: string[] }> = ({ start, ops, boxes }) => {
  const step = 200 / (ops.length + 0.4);
  return (
    <QFig h={96}>
      <defs>
        <marker id="mrArr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#2563eb" />
        </marker>
      </defs>
      <text x="22" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{start}</text>
      {ops.map((op, i) => {
        const x0 = 36 + i * step;
        const bx = x0 + step - 42;
        return (
          <g key={i}>
            <line x1={x0} y1="55" x2={bx - 2} y2="55" stroke="#2563eb" strokeWidth="1.8" markerEnd="url(#mrArr)" />
            <text x={(x0 + bx) / 2} y="44" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">{op}</text>
            <rect x={bx} y="40" width="42" height="28" rx="4" fill="#fff" stroke="#0f172a" strokeWidth="1.4" />
            <text x={bx + 21} y="59" textAnchor="middle" fontSize="12" fontWeight="bold" fill={boxes[i] === '?' ? C_UNK : '#1d4ed8'}>{boxes[i]}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Sorozat ugrásnyilakkal. */
const QSeq: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 220 / items.length;
  return (
    <QFig h={90}>
      {items.map((t, i) => (
        <g key={i}>
          <text x={10 + w * i + w / 2} y="62" textAnchor="middle" fontSize="13" fontWeight="bold" fill={t === '?' ? C_UNK : '#0f172a'}>{t}</text>
          {i < items.length - 1 && (
            <path d={`M${10 + w * i + w / 2} 44 Q${10 + w * (i + 0.5) + w / 2} 22 ${10 + w * (i + 1) + w / 2 - 4} 42`} fill="none" stroke="#64748b" strokeWidth="1.4" />
          )}
        </g>
      ))}
    </QFig>
  );
};

/** Szabálytáblázat ◇, △, ○ (munkafüzet II. 65. o., 7. feladat). */
const QRule: React.FC<{ cols: [string, string, string][] }> = ({ cols }) => {
  const w = 170 / cols.length;
  const shape = (r: number, cx: number, cy: number) =>
    r === 0 ? (
      <path d={`M${cx} ${cy - 9} L${cx + 9} ${cy} L${cx} ${cy + 9} L${cx - 9} ${cy} Z`} fill="none" stroke="#2563eb" strokeWidth="1.8" />
    ) : r === 1 ? (
      <path d={`M${cx} ${cy - 9} L${cx + 9} ${cy + 7} L${cx - 9} ${cy + 7} Z`} fill="none" stroke="#dc2626" strokeWidth="1.8" />
    ) : (
      <circle cx={cx} cy={cy} r="8" fill="none" stroke="#16a34a" strokeWidth="1.8" />
    );
  return (
    <QFig h={124}>
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <rect x="20" y={12 + r * 30} width="40" height="30" fill="#fff" stroke="#94a3b8" />
          {shape(r, 40, 27 + r * 30)}
          {cols.map((c, i) => (
            <g key={i}>
              <rect x={60 + i * w} y={12 + r * 30} width={w} height="30" fill="#fff" stroke="#94a3b8" />
              <text x={60 + i * w + w / 2} y={32 + r * 30} textAnchor="middle" fontSize="12" fontWeight="bold" fill={c[r] === '?' ? C_UNK : '#0f172a'}>{c[r]}</text>
            </g>
          ))}
        </g>
      ))}
      <text x="120" y="114" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569">Az első oszlopokból találd ki a szabályt!</text>
    </QFig>
  );
};

/** Két téglalap egymás mellett (összevonás). */
const QDistrib: React.FC<{ a: string; b: string; m: string }> = ({ a, b, m }) => (
  <QFig h={120}>
    <rect x="20" y="18" width="70" height="56" fill="#bbf7d0" stroke="#15803d" strokeWidth="1.6" />
    <rect x="90" y="18" width="110" height="56" fill="#86efac" stroke="#15803d" strokeWidth="1.6" />
    <text x="55" y="50" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">{a} · {m}</text>
    <text x="145" y="50" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">{b} · {m}</text>
    <text x="55" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">{a}</text>
    <text x="145" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">{b}</text>
    <text x="212" y="50" fontSize="11" fontWeight="bold" fill="#166534">{m}</text>
    <text x="120" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>Összesen: ?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const MUL_RELATIONS_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'mr-q1',
    level: 1,
    questionTypeBadge: 'Tényezők változása',
    figure: <QRows rows={[['126 · 23', '2898'], ['226 · 23', '?']]} note="A szorzandó 100-zal nőtt." />,
    question: '126 · 23 = 2898. Mennyi 226 · 23?',
    options: ['5198', '2998', '3898', '4898'],
    correctAnswer: 0,
    explanation: 'A szorzandó 100-zal nőtt, ezért a szorzat 100 · 23 = 2300-zal nő: 2898 + 2300 = 5198. (A 2998-nál csak 100-at adtak hozzá.)'
  },
  {
    id: 'mr-q2',
    level: 1,
    questionTypeBadge: 'Duplázás, felezés',
    figure: <QRows rows={[['61 · 80', '4880'], ['122 · 40', '?']]} note="· 2 és : 2" />,
    question: '61 · 80 = 4880. Mennyi 122 · 40?',
    options: ['4880', '9760', '2440', '4800'],
    correctAnswer: 0,
    explanation: 'A szorzandó kétszeresére nőtt (61 → 122), a szorzó a felére csökkent (80 → 40). Ilyenkor a szorzat nem változik: 4880.'
  },
  {
    id: 'mr-q3',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a nagyobb szorzat: 199 · 10 vagy 199 · 20?',
    options: ['199 · 20, mert a szorzó kétszer akkora.', '199 · 10, mert a 10 kerekebb szám.', 'Egyenlők, mert a szorzandó ugyanaz.', 'Számolás nélkül nem lehet eldönteni.'],
    correctAnswer: 0,
    explanation: 'A szorzandó ugyanaz, a 20 a 10 kétszerese, ezért 199 · 20 kétszer akkora: 3980, míg 199 · 10 = 1990.'
  },
  {
    id: 'mr-q4',
    level: 1,
    questionTypeBadge: 'Következtetés',
    figure: <QPairTable head={['kg', 'Ft']} cols={[['10', '1400'], ['20', '?']]} />,
    question: '10 kg burgonya 1400 Ft. Mennyibe kerül 20 kg burgonya?',
    options: ['2800 Ft', '1400 Ft', '1420 Ft', '3400 Ft'],
    correctAnswer: 0,
    explanation: '20 kg a 10 kg kétszerese, ezért az ára is kétszeres: 1400 · 2 = 2800 Ft.'
  },
  {
    id: 'mr-q5',
    level: 1,
    questionTypeBadge: 'Következtetés',
    figure: <QPairTable head={['kg', 'Ft']} cols={[['3', '900'], ['9', '?']]} />,
    question: '3 kg körte 900 Ft. Mennyibe kerül 9 kg körte?',
    options: ['2700 Ft', '8100 Ft', '1800 Ft', '906 Ft'],
    correctAnswer: 0,
    explanation: '9 kg a 3 kg háromszorosa, ezért 900 · 3 = 2700 Ft. (A 8100 akkor jön ki, ha a 900 Ft-ot 1 kg árának hiszed.)'
  },
  {
    id: 'mr-q6',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Manó 5 napos nyaralásán minden napra 425 Ft költőpénze jutott. Mennyi pénze volt összesen?',
    options: ['2125 Ft', '430 Ft', '2025 Ft', '2100 Ft'],
    correctAnswer: 0,
    explanation: '425 · 5: 5 · 5 = 25, leírom az 5-öt, maradt 2; 5 · 2 = 10, és még 2: 12, leírom a 2-t, maradt 1; 5 · 4 = 20, és még 1: 21. Összesen 2125 Ft.'
  },
  {
    id: 'mr-q7',
    level: 1,
    questionTypeBadge: 'Diagram',
    figure: <QBirds />,
    question: 'Olvasd le a diagramról! A gólya 1 nap alatt 200 km-t repül. Hány km-t repül 1 hét alatt?',
    options: ['1400 km', '207 km', '1200 km', '2100 km'],
    correctAnswer: 0,
    explanation: '1 hét = 7 nap. 200 · 7 = 1400 km. (A 2100 km a sarki csér 1 heti útja.)'
  },
  {
    id: 'mr-q8',
    level: 1,
    questionTypeBadge: 'Gondolkodj!',
    question: 'Egy gyertya 75 perc alatt ég el. Mennyi idő alatt ég el 15 ugyanilyen gyertya, ha egyszerre gyújtjuk meg őket?',
    options: ['75 perc', '1125 perc', '5 perc', '90 perc'],
    correctAnswer: 0,
    explanation: 'Egyszerre égnek, ezért egyszerre is fogynak el: 75 perc alatt. Itt nem kell szorozni!'
  },
  {
    id: 'mr-q9',
    level: 1,
    questionTypeBadge: 'Következtetés',
    figure: <QPairTable head={['fő', 'Ft']} cols={[['10', '3200'], ['20', '?']]} />,
    question: 'A túzokrezervátumba 10 főnek 3200 Ft a belépő. Mennyi 20 főnek?',
    options: ['6400 Ft', '3220 Ft', '3400 Ft', '640 Ft'],
    correctAnswer: 0,
    explanation: '20 fő kétszer annyi, mint 10 fő, ezért 3200 · 2 = 6400 Ft.'
  },
  {
    id: 'mr-q10',
    level: 1,
    questionTypeBadge: 'Többszörös',
    question: 'Egy szám 7-szerese 448. Mennyi a 14-szerese?',
    options: ['896', '455', '448', '6272'],
    correctAnswer: 0,
    explanation: 'A 14-szeres a 7-szeresnek a kétszerese: 448 · 2 = 896. (A 6272 akkor jön ki, ha a 448-at szorzod 14-gyel.)'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'mr-q11',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Mennyivel nagyobb 241 · 22, mint 241 · 21?',
    options: ['241-gyel', '1-gyel', '22-vel', '21-gyel'],
    correctAnswer: 0,
    explanation: '241 · 22 = 241 · 21 + 241, vagyis eggyel több 241 van benne. 5302 − 5061 = 241.'
  },
  {
    id: 'mr-q12',
    level: 2,
    questionTypeBadge: 'Tényezők változása',
    figure: <QRows rows={[['159 · 44', '6996'], ['159 · 22', '?']]} />,
    question: '159 · 44 = 6996. Mennyi 159 · 22?',
    options: ['3498', '6974', '3398', '6996'],
    correctAnswer: 0,
    explanation: 'A szorzó a felére csökkent (44 → 22), ezért a szorzat is a felére csökken: 6996 : 2 = 3498.'
  },
  {
    id: 'mr-q13',
    level: 2,
    questionTypeBadge: 'Duplázás, felezés',
    question: 'Melyik szorzat egyenlő a 120 · 21 szorzattal?',
    options: ['60 · 42', '60 · 21', '240 · 42', '120 · 42'],
    correctAnswer: 0,
    explanation: 'A 120-at felezzük (60), a 21-et duplázzuk (42): a szorzat nem változik. 120 · 21 = 60 · 42 = 2520.'
  },
  {
    id: 'mr-q14',
    level: 2,
    questionTypeBadge: 'Összevonás',
    figure: <QDistrib a="26" b="45" m="14" />,
    question: '26 · 14 + 45 · 14 = (26 + 45) · 14. Mennyi az eredmény?',
    options: ['994', '409', '1008', '984'],
    correctAnswer: 0,
    explanation: '26 + 45 = 71, és 71 · 14 = 284 + 710 = 994. (A 409 akkor jön ki, ha a 45-öt elfelejted megszorozni 14-gyel.)'
  },
  {
    id: 'mr-q15',
    level: 2,
    questionTypeBadge: 'Összevonás',
    question: '62 · 32 − 62 · 16 = 62 · □. Melyik szám kerül a □ helyére?',
    options: ['16', '48', '32', '2'],
    correctAnswer: 0,
    explanation: '32 darab 62-ből elveszünk 16 darab 62-t, marad 32 − 16 = 16 darab 62. Tehát □ = 16, és 62 · 16 = 992.'
  },
  {
    id: 'mr-q16',
    level: 2,
    questionTypeBadge: 'Összevonás',
    question: 'Mennyi 27 · 37 − 27 · 17?',
    options: ['540', '999', '1080', '520'],
    correctAnswer: 0,
    explanation: '27 · 37 − 27 · 17 = 27 · (37 − 17) = 27 · 20 = 540. (A 999 csak a 27 · 37.)'
  },
  {
    id: 'mr-q17',
    level: 2,
    questionTypeBadge: 'Láncszorzás',
    figure: <QChain start="29" ops={['· 10', '· 20']} boxes={['290', '?']} />,
    question: 'A 29-et megszorozzuk 10-zel, majd 20-szal. Mennyi lesz a végeredmény?',
    options: ['5800', '870', '580', '2900'],
    correctAnswer: 0,
    explanation: '29 · 10 = 290, és 290 · 20 = 5800. Egyetlen szorzással: 29 · 200 = 5800. (A 870 = 29 · 30, ott összeadtad a 10-et és a 20-at.)'
  },
  {
    id: 'mr-q18',
    level: 2,
    questionTypeBadge: 'Következtetés',
    figure: <QPairTable head={['kg', 'Ft']} cols={[['8', '1600'], ['2', '?']]} />,
    question: '8 kg alma 1600 Ft. Mennyibe kerül 2 kg alma?',
    options: ['400 Ft', '3200 Ft', '800 Ft', '200 Ft'],
    correctAnswer: 0,
    explanation: '2 kg a 8 kg negyede, ezért az ár is a negyede: 1600 : 4 = 400 Ft. (1 kg 200 Ft, 2 kg 400 Ft.)'
  },
  {
    id: 'mr-q19',
    level: 2,
    questionTypeBadge: 'Következtetés',
    question: '5 db jégkrém 3000 Ft. Mennyibe kerül 15 db jégkrém?',
    options: ['9000 Ft', '3010 Ft', '6000 Ft', '4500 Ft'],
    correctAnswer: 0,
    explanation: '15 db az 5 db háromszorosa, ezért 3000 · 3 = 9000 Ft.'
  },
  {
    id: 'mr-q20',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Manó 1 hét alatt 7 · 425 = 2975 Ft-ot költ. Mennyit költene 2 hét alatt, ha ugyanennyi a napi pénze?',
    options: ['5950 Ft', '2975 Ft', '5850 Ft', '8925 Ft'],
    correctAnswer: 0,
    explanation: '2 hét kétszer annyi, mint 1 hét: 2975 · 2 = 5950 Ft. (A 8925 Ft 3 hétre jönne ki.)'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'mr-q21',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <QBirds />,
    question: 'Olvasd le a diagramról a sarki csér napi útját! Hány km-t repül 3 hét alatt?',
    options: ['6300 km', '900 km', '2100 km', '6000 km'],
    correctAnswer: 0,
    explanation: 'A sarki csér naponta 300 km-t repül. 3 hét = 21 nap: 300 · 21 = 6300 km. (A 900 km csak 3 nap.)'
  },
  {
    id: 'mr-q22',
    level: 3,
    questionTypeBadge: 'Tényezők változása',
    figure: <QRows rows={[['135 · 23', '3105'], ['135 · 25', '?']]} note="A szorzó 2-vel nőtt." />,
    question: 'A Lepkefutamon 135 gyerek egyenként 23-féle lepkét látott: 135 · 23 = 3105. Mennyi lenne, ha mindegyik 25-féle lepkét látott volna?',
    options: ['3375', '3107', '3240', '3130'],
    correctAnswer: 0,
    explanation: 'Mindenki 2-vel több lepkét lát, ez 135 · 2 = 270-nel több: 3105 + 270 = 3375. (A 3240-nél csak 1 · 135-öt adtak hozzá.)'
  },
  {
    id: 'mr-q23',
    level: 3,
    questionTypeBadge: 'Következtetés',
    figure: <QPairTable head={['fő', 'Ft']} cols={[['30', '9600'], ['31', '?']]} />,
    question: '30 főnek 9600 Ft a belépő (fejenként 320 Ft). Mennyi 31 főnek?',
    options: ['9920 Ft', '9600 Ft', '9930 Ft', '9820 Ft'],
    correctAnswer: 0,
    explanation: '31 fő = 30 fő + 1 fő, ezért 9600 + 320 = 9920 Ft.'
  },
  {
    id: 'mr-q24',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <QSeq items={['101', '202', '217', '434', '449', '?']} />,
    question: 'Folytasd a sorozatot! 101, 202, 217, 434, 449, ?',
    options: ['898', '464', '913', '1796'],
    correctAnswer: 0,
    explanation: 'A szabály: · 2, aztán + 15, felváltva. 101 · 2 = 202, 202 + 15 = 217, 217 · 2 = 434, 434 + 15 = 449, most szorzás jön: 449 · 2 = 898.'
  },
  {
    id: 'mr-q25',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <QSeq items={['132', '396', '241', '723', '568', '?']} />,
    question: 'Folytasd a sorozatot! 132, 396, 241, 723, 568, ?',
    options: ['1704', '413', '1136', '1549'],
    correctAnswer: 0,
    explanation: 'A szabály: · 3, aztán − 155, felváltva. 132 · 3 = 396, 396 − 155 = 241, 241 · 3 = 723, 723 − 155 = 568, most szorzás jön: 568 · 3 = 1704.'
  },
  {
    id: 'mr-q26',
    level: 3,
    questionTypeBadge: 'Szabály',
    figure: <QRule cols={[['18', '20', '460'], ['15', '30', '550'], ['32', '75', '?']]} />,
    question: 'A táblázat szabálya: ○ = ◇ · △ + 100 (18 · 20 + 100 = 460). Mennyi a ○, ha ◇ = 32 és △ = 75?',
    options: ['2500', '2400', '207', '2600'],
    correctAnswer: 0,
    explanation: '32 · 75 = 160 + 2240 = 2400, és még 100: 2500. (A 2400-nál elmaradt a + 100.)'
  },
  {
    id: 'mr-q27',
    level: 3,
    questionTypeBadge: 'Szabály',
    figure: <QRule cols={[['18', '20', '460'], ['60', '40', '2500'], ['90', '?', '6400']]} />,
    question: 'Ugyanez a szabály: ○ = ◇ · △ + 100. Mennyi a △, ha ◇ = 90 és ○ = 6400?',
    options: ['70', '71', '64', '7'],
    correctAnswer: 0,
    explanation: 'Vegyük el a 100-at: 6400 − 100 = 6300. 90 · △ = 6300, tehát △ = 70, mert 90 · 70 = 6300.'
  },
  {
    id: 'mr-q28',
    level: 3,
    questionTypeBadge: 'Láncszorzás',
    figure: <QChain start="57" ops={['· 6', '· 8']} boxes={['342', '?']} />,
    question: 'Az 57-et megszorozzuk 6-tal, aztán 8-cal. Melyik egyetlen szorzással kapjuk ugyanezt?',
    options: ['57 · 48', '57 · 14', '57 · 68', '57 · 2'],
    correctAnswer: 0,
    explanation: '6 · 8 = 48, ezért 57 · 6 · 8 = 57 · 48 = 2736. (Az 57 · 14-nél összeadtad a 6-ot és a 8-at.)'
  },
  {
    id: 'mr-q29',
    level: 3,
    questionTypeBadge: 'Többszörös',
    question: 'Egy szám 20-szorosa 1800. Mennyi a 2-szerese?',
    options: ['180', '900', '3600', '18'],
    correctAnswer: 0,
    explanation: 'A 2-szeres a 20-szorosnak a tizede: 1800 : 10 = 180. (A szám maga 90, és 90 · 2 = 180.)'
  },
  {
    id: 'mr-q30',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Döntsd el számolás nélkül! Mit mondhatunk a 120 · 21 és a 30 · 84 szorzatról?',
    options: ['Egyenlők.', 'A 120 · 21 a nagyobb.', 'A 30 · 84 a nagyobb.', 'A 30 · 84 négyszer akkora.'],
    correctAnswer: 0,
    explanation: 'A 120 a 30 négyszerese, a 84 a 21 négyszerese. Az egyik tényező 4-szer kisebb, a másik 4-szer nagyobb, ezért a szorzat ugyanaz: 2520.'
  }
];

export const MulRelationsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId="g4-wmult-osszefuggesek-quiz"
      subtopicId="osszefuggesek-kovetkeztetesek"
      title="3. Összefüggések, következtetések – Kvíz"
      subtitle="30 feladat 3 szinten: a szorzat változása, következtetés, összevonás, sorozatok és szabályok."
      badge="4. OSZTÁLY • VII. ÍRÁSBELI SZORZÁS • KVÍZ"
      questions={MUL_RELATIONS_QUESTIONS}
      cheatSheets={[
        {
          title: 'A szorzat változása',
          items: [
            'Egyik tényező · 2 → a szorzat · 2',
            'Egyik tényező : 2 → a szorzat : 2',
            'Egyik · 2, másik : 2 → nem változik: 61 · 80 = 122 · 40',
            'A szorzó 1-gyel nő → a szorzat a szorzandóval nő'
          ]
        },
        {
          title: 'Következtetés',
          items: [
            '10 kg 1400 Ft → 20 kg 2800 Ft',
            '8 kg 1600 Ft → 1 kg 200 Ft → 2 kg 400 Ft',
            '1 hét = 7 nap, 2 hét = 14 nap, 3 hét = 21 nap',
            'Egyszerre égő gyertyák: nem kell szorozni!'
          ]
        },
        {
          title: 'Összevonás, láncok',
          items: [
            '26 · 14 + 45 · 14 = 71 · 14',
            '27 · 37 − 27 · 17 = 27 · 20',
            '· 10, aztán · 10 = · 100',
            '· 6, aztán · 8 = · 48'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MulRelationsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MulRelationsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MulRelationsQuiz;
