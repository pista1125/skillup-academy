import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WordProblems1000Matcher } from './WordProblems1000Matcher';
import { WordProblems1000Sorter } from './WordProblems1000Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek. Az ismeretlen: piros „?”.
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
const ink = (t: string) => (t.includes('?') ? UNK : '#0f172a');

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 130 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f0fdfa" stroke="#99f6e4" />
    {children}
  </svg>
);

/** Szakaszos ábra: részek (címke + felirat) egy sorban, alatta kapcsos zárójellel az egész. */
const BarFig: React.FC<{ parts: { w: number; label: string; name?: string; color: string }[]; whole: string }> = ({ parts, whole }) => {
  const total = parts.reduce((s, p) => s + p.w, 0);
  let x = 16;
  return (
    <QFig h={120}>
      {parts.map((p, i) => {
        const w = (p.w / total) * 228;
        const x0 = x;
        x += w;
        return (
          <g key={i}>
            <text x={x0 + w / 2} y="24" fontSize="12" fontWeight="bold" textAnchor="middle" fill={ink(p.label)}>{p.label}</text>
            <rect x={x0} y="32" width={w} height="28" rx="5" fill={p.color} stroke="#ffffff" strokeWidth="2" />
            {p.name && (
              <text x={x0 + w / 2} y="50" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">{p.name}</text>
            )}
          </g>
        );
      })}
      <path d="M16 68 Q16 80 28 80 H118 Q130 80 130 92 Q130 80 142 80 H232 Q244 80 244 68" fill="none" stroke="#475569" strokeWidth="1.5" />
      <text x="130" y="110" fontSize="13" fontWeight="bold" textAnchor="middle" fill={ink(whole)}>{whole}</text>
    </QFig>
  );
};

/** Futópálya 0-tól a célig, két jelölt pont. */
const TrackFig: React.FC<{ total: number; marks: { at: number; label: string; color: string }[]; note?: string }> = ({ total, marks, note }) => (
  <QFig h={110}>
    <line x1="20" y1="56" x2="240" y2="56" stroke="#334155" strokeWidth="3" />
    <text x="20" y="80" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">rajt</text>
    <text x="240" y="80" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">cél 🏁</text>
    <text x="130" y="22" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f766e">{total} m</text>
    {marks.map((m) => {
      const x = 20 + (m.at / total) * 220;
      return (
        <g key={m.label}>
          <circle cx={x} cy="56" r="7" fill={m.color} />
          <text x={x} y="42" fontSize="11" fontWeight="bold" textAnchor="middle" fill={m.color}>{m.label}</text>
        </g>
      );
    })}
    {note && (
      <text x="130" y="100" fontSize="11" fontWeight="bold" textAnchor="middle" fill={ink(note)}>{note}</text>
    )}
  </QFig>
);

/** Párok a számegyenesen. */
const PairsFig: React.FC = () => (
  <QFig h={100}>
    <line x1="12" y1="62" x2="250" y2="62" stroke="#334155" strokeWidth="2" />
    {Array.from({ length: 11 }, (_, i) => (
      <g key={i}>
        <line x1={20 + i * 22} y1="56" x2={20 + i * 22} y2="68" stroke="#334155" strokeWidth="1.5" />
        <circle cx={20 + i * 22 - 4} cy="44" r="4" fill="#60a5fa" />
        <circle cx={20 + i * 22 + 4} cy="44" r="4" fill="#f472b6" />
      </g>
    ))}
    <text x="20" y="82" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#334155">0</text>
    <text x="42" y="82" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#334155">50 cm</text>
    <text x="130" y="22" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f766e">11 pár</text>
    <text x="210" y="92" fontSize="11" fontWeight="bold" textAnchor="middle" fill={UNK}>hossz: ?</text>
  </QFig>
);

/** Színes rudak. */
const RodsFig: React.FC<{ rods: { n: number; label: string; color: string }[]; total: string }> = ({ rods, total }) => {
  const u = 18;
  let x = 14;
  return (
    <QFig h={110}>
      {rods.map((r, ri) => {
        const x0 = x;
        x += r.n * u + 10;
        return (
          <g key={ri}>
            <text x={x0 + (r.n * u) / 2} y="28" fontSize="10" fontWeight="bold" textAnchor="middle" fill={ink(r.label)}>{r.label}</text>
            {Array.from({ length: r.n }, (_, i) => (
              <rect key={i} x={x0 + i * u} y="36" width={u} height={u} fill={r.color} stroke="#475569" />
            ))}
          </g>
        );
      })}
      <text x="130" y="88" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0f172a">együtt: {total}</text>
    </QFig>
  );
};

/** Pénzérmék két gyereknél. */
const CoinsFig: React.FC = () => (
  <QFig h={100}>
    <text x="64" y="22" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#3f6212">Máté</text>
    <text x="190" y="22" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#3f6212">Ádám</text>
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={22 + i * 26} cy="52" r="11" fill="#facc15" stroke="#a16207" />
    ))}
    <circle cx={100} cy="52" r="11" fill="#cbd5e1" stroke="#64748b" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <circle key={i} cx={140 + (i % 4) * 26} cy={i < 4 ? 44 : 70} r="11" fill="#facc15" stroke="#a16207" />
    ))}
    <circle cx={192} cy="70" r="11" fill="#cbd5e1" stroke="#64748b" />
    <text x="64" y="88" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">350 Ft</text>
    <text x="230" y="88" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">650 Ft</text>
  </QFig>
);

/** Kis táblázat. */
const TableFig: React.FC<{ head: string[]; rows: string[][] }> = ({ head, rows }) => {
  const cw = 240 / head.length;
  return (
    <QFig h={30 + (rows.length + 1) * 24}>
      {head.map((h, i) => (
        <g key={i}>
          <rect x={10 + i * cw} y="14" width={cw} height="24" fill="#14b8a6" stroke="#fff" />
          <text x={10 + i * cw + cw / 2} y="30" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">{h}</text>
        </g>
      ))}
      {rows.map((r, ri) =>
        r.map((c, ci) => (
          <g key={`${ri}-${ci}`}>
            <rect x={10 + ci * cw} y={38 + ri * 24} width={cw} height="24" fill={ci === 0 ? '#ccfbf1' : '#ffffff'} stroke="#99f6e4" />
            <text x={10 + ci * cw + cw / 2} y={54 + ri * 24} fontSize="10.5" fontWeight="bold" textAnchor="middle" fill={ink(c)}>{c}</text>
          </g>
        ))
      )}
    </QFig>
  );
};

/** Elágazásos rajz: D az első, utána ? ágak. */
const TreeFig: React.FC = () => (
  <QFig h={120}>
    <text x="28" y="66" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#0f172a">D</text>
    {['A', 'B', 'Cs'].map((t, i) => (
      <g key={t}>
        <line x1="38" y1="62" x2="92" y2={26 + i * 36} stroke="#475569" />
        <text x="104" y={30 + i * 36} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0f766e">{t}</text>
        <line x1="116" y1={26 + i * 36} x2="160" y2={18 + i * 36} stroke="#94a3b8" />
        <line x1="116" y1={26 + i * 36} x2="160" y2={34 + i * 36} stroke="#94a3b8" />
        <text x="172" y={22 + i * 36} fontSize="11" fontWeight="bold" textAnchor="middle" fill={UNK}>?</text>
        <text x="172" y={38 + i * 36} fontSize="11" fontWeight="bold" textAnchor="middle" fill={UNK}>?</text>
      </g>
    ))}
    <text x="225" y="66" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">1. 2. 3. 4.</text>
  </QFig>
);

/** Hordó a folyadékkal. */
const BarrelFig: React.FC = () => (
  <QFig h={130}>
    <rect x="70" y="20" width="70" height="96" rx="12" fill="#fef3c7" stroke="#92400e" strokeWidth="3" />
    <rect x="73" y="56" width="64" height="57" rx="9" fill="#93c5fd" />
    <line x1="70" y1="44" x2="140" y2="44" stroke="#92400e" strokeWidth="2" />
    <line x1="70" y1="92" x2="140" y2="92" stroke="#92400e" strokeWidth="2" />
    <text x="105" y="88" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">410 l</text>
    <text x="200" y="36" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#92400e">a hordó: 650 l</text>
    <text x="200" y="70" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#2563eb">+ 320 l</text>
    <text x="200" y="104" fontSize="13" fontWeight="bold" textAnchor="middle" fill={UNK}>? l lesz benne</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const WORD_PROBLEMS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'wp-q1',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <BarFig parts={[{ w: 485, label: '485 Ft', name: 'van', color: '#5eead4' }, { w: 465, label: '?', name: 'hiányzik', color: '#fde68a' }]} whole="950 Ft – a könyv ára" />,
    question: 'Csaba egy 950 Ft-os könyvet szeretne venni. Most 485 Ft-ja van. Hány forintot kell még gyűjtenie?',
    options: ['465 Ft', '1435 Ft', '565 Ft', '475 Ft'],
    correctAnswer: 0,
    explanation: '950 − 485 = 465. Ellenőrzés: 485 + 465 = 950 ✓ Csabának még 465 Ft-ot kell gyűjtenie.'
  },
  {
    id: 'wp-q2',
    level: 1,
    questionTypeBadge: 'Felesleges adat',
    question: 'Egy iskola 385 alsó tagozatos tanulója közül 189 lány, 196 fiú. Színházba 329-en jelentkeztek. Hányan nem mentek színházba?',
    options: ['56', '714', '66', '196'],
    correctAnswer: 0,
    explanation: '385 − 329 = 56. A lányok és fiúk száma felesleges adat. 56 alsós nem ment színházba.'
  },
  {
    id: 'wp-q3',
    level: 1,
    questionTypeBadge: 'Részek',
    figure: (
      <BarFig
        parts={[
          { w: 1, label: '154', color: '#2dd4bf' },
          { w: 1, label: '', color: '#ccfbf1' },
          { w: 1, label: '', color: '#ccfbf1' },
          { w: 1, label: '', color: '#ccfbf1' },
          { w: 1, label: '', color: '#ccfbf1' }
        ]}
        whole="az iskola: ? tanuló"
      />
    ),
    question: 'A sportnapon a tanulók ötödrésze, vagyis 154 gyerek versenyzett. Hány tanuló jár az iskolába?',
    options: ['770', '159', '750', '308'],
    correctAnswer: 0,
    explanation: '154 az 5 egyenlő rész közül 1. Az egész: 154 · 5 = 770. A 750 csak a becslés (150 · 5).'
  },
  {
    id: 'wp-q4',
    level: 1,
    questionTypeBadge: 'Útszakasz',
    figure: <BarFig parts={[{ w: 780, label: '780 m', name: 'megtették', color: '#5eead4' }, { w: 160, label: '?', color: '#fde68a' }]} whole="940 m – az út a forrásig" />,
    question: 'A túrázók egy 940 m hosszú úton haladnak a forráshoz. Megtettek már 780 m-t. Milyen messze vannak még a forrástól?',
    options: ['160 m', '1720 m', '260 m', '240 m'],
    correctAnswer: 0,
    explanation: '940 − 780 = 160. Ellenőrzés: 780 + 160 = 940 ✓ Még 160 m-re vannak a forrástól.'
  },
  {
    id: 'wp-q5',
    level: 1,
    questionTypeBadge: 'Fele',
    figure: <TrackFig total={800} marks={[{ at: 400, label: 'Manó', color: '#2563eb' }]} note="Manó a táv felénél jár. A célig: ?" />,
    question: 'Egy 800 m-es futóversenyen Manó megtette a táv felét. Hány méterre van Manó a céltól?',
    options: ['400 m', '800 m', '200 m', '1600 m'],
    correctAnswer: 0,
    explanation: 'A 800 m fele: 800 : 2 = 400 m. Ha a felét megtette, a másik fele van még hátra: 400 m.'
  },
  {
    id: 'wp-q6',
    level: 1,
    questionTypeBadge: 'Hiányzó adat',
    question: '„Benedek 5 kört futott az iskolai futópályán. Hány métert tett meg?” Melyik adat hiányzik a megoldáshoz?',
    options: ['Hány méter egy kör', 'Benedek életkora', 'Hány percig futott', 'Az iskola neve'],
    correctAnswer: 0,
    explanation: 'Ha tudjuk, hány méter egy kör, akkor 5-tel szorozva megkapjuk az egészet. Például 400 m-es pályán 5 · 400 = 2000 m.'
  },
  {
    id: 'wp-q7',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: <CoinsFig />,
    question: 'Máténak 350 Ft-ja, Ádámnak 650 Ft-ja van. Mennyi pénzük van összesen?',
    options: ['1000 Ft', '300 Ft', '900 Ft', '1100 Ft'],
    correctAnswer: 0,
    explanation: '350 + 650 = 1000. Együtt 1000 Ft-juk van. (A 300 Ft a különbség lenne.)'
  },
  {
    id: 'wp-q8',
    level: 1,
    questionTypeBadge: 'Logika',
    question: 'Ákos alulmaradt Ferkóval szemben; Bence kisebbet ugrott, mint Dénes; Dénes ugyanakkorát ugrott, mint Ákos. Ki ugrott a legmesszebbre?',
    options: ['Ferkó', 'Ákos', 'Dénes', 'Bence'],
    correctAnswer: 0,
    explanation: 'Ferkó többet ugrott Ákosnál. Dénes = Ákos, Bence még kevesebbet ugrott. Sorrend: Ferkó > Ákos = Dénes > Bence.'
  },
  {
    id: 'wp-q9',
    level: 1,
    questionTypeBadge: 'Kevesebb',
    question: 'Az egyik tóba 550 halivadékot telepítettek, a másikba 430-cal kevesebbet. Hány ivadék került a második tóba?',
    options: ['120', '980', '220', '130'],
    correctAnswer: 0,
    explanation: '„430-cal kevesebb” → kivonás: 550 − 430 = 120. (A 980 az lenne, ha összeadnád.)'
  },
  {
    id: 'wp-q10',
    level: 1,
    questionTypeBadge: 'Párok',
    question: 'A 4. b osztályba 22 gyerek jár. Párosával állnak sorba. Hány pár lesz?',
    options: ['11', '44', '20', '24'],
    correctAnswer: 0,
    explanation: 'Egy párban 2 gyerek van: 22 : 2 = 11 pár.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'wp-q11',
    level: 2,
    questionTypeBadge: 'Szakaszos ábra',
    figure: (
      <BarFig
        parts={[
          { w: 88, label: '88', name: 'lány', color: '#fdba74' },
          { w: 264, label: '3 · 88', name: 'fiú', color: '#7dd3fc' },
          { w: 261, label: '?', name: 'felnőtt', color: '#e2e8f0' }
        ]}
        whole="613 versenyző"
      />
    ),
    question: 'A futóversenyre 613 versenyző nevezett. A gyerekek közül 88 lány és háromszor ennyi fiú. Hány felnőtt vett részt?',
    options: ['261', '525', '349', '437'],
    correctAnswer: 0,
    explanation: 'Fiúk: 3 · 88 = 264. Gyerekek: 88 + 264 = 352. Felnőttek: 613 − 352 = 261.'
  },
  {
    id: 'wp-q12',
    level: 2,
    questionTypeBadge: 'Távolság',
    figure: (
      <TrackFig
        total={800}
        marks={[
          { at: 265, label: 'Mona', color: '#db2777' },
          { at: 400, label: 'Manó', color: '#2563eb' }
        ]}
        note="Mona 535 m-re van a céltól. Köztük: ?"
      />
    ),
    question: 'A 800 m-es versenyen Manó a táv felénél jár, Mona pedig 535 m-re van a céltól. Hány méter van köztük?',
    options: ['135 m', '265 m', '935 m', '400 m'],
    correctAnswer: 0,
    explanation: 'Manó 400 m-re van a céltól (800 fele). Mona 535 m-re. 535 − 400 = 135 m. Manó van közelebb a célhoz.'
  },
  {
    id: 'wp-q13',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <PairsFig />,
    question: '22 gyerek párosával áll sorban. A párok egymástól 50 cm-re állnak. Milyen hosszú a sor (az első pártól az utolsóig)?',
    options: ['5 m', '5 m 50 cm', '11 m', '10 m'],
    correctAnswer: 0,
    explanation: '11 pár van, köztük csak 10 köz! 10 · 50 cm = 500 cm = 5 m. (Az 5 m 50 cm a gyakori hiba: 11 közzel számolt.)'
  },
  {
    id: 'wp-q14',
    level: 2,
    questionTypeBadge: 'Igazságos osztozás',
    figure: <CoinsFig />,
    question: 'Máténak 350 Ft-ja, Ádámnak 650 Ft-ja van. Hány forintot adjon Ádám Máténak, hogy ugyanannyi pénzük legyen?',
    options: ['150 Ft', '300 Ft', '500 Ft', '100 Ft'],
    correctAnswer: 0,
    explanation: 'Együtt 1000 Ft, ennek fele 500 Ft. Ádám 650 − 500 = 150 Ft-ot ad. Ekkor mindkettőjüknek 500 Ft-ja lesz. (A 300 Ft a teljes különbség – annak csak a fele kell!)'
  },
  {
    id: 'wp-q15',
    level: 2,
    questionTypeBadge: 'Színes rudak',
    figure: (
      <RodsFig
        rods={[
          { n: 1, label: '?', color: '#fde68a' },
          { n: 4, label: '4-szer akkora', color: '#5eead4' }
        ]}
        total="1 m = 100 cm"
      />
    ),
    question: 'Péter egy 1 m-es lécet két darabra fűrészelt. Az egyik darab négyszer akkora, mint a másik. Mekkorák a darabok?',
    options: ['20 cm és 80 cm', '25 cm és 75 cm', '25 cm és 100 cm', '40 cm és 60 cm'],
    correctAnswer: 0,
    explanation: '1 + 4 = 5 egyenlő rész. 100 cm : 5 = 20 cm a kisebb, 4 · 20 = 80 cm a nagyobb. Ellenőrzés: 20 + 80 = 100 ✓'
  },
  {
    id: 'wp-q16',
    level: 2,
    questionTypeBadge: 'Idő',
    question: 'Karcsi bácsi 480 percig horgászott. Pista bácsi ennek a felénél fél órával többet töltött a stégen. Hány percig horgászott Pista bácsi?',
    options: ['270 perc', '510 perc', '240 perc', '250 perc'],
    correctAnswer: 0,
    explanation: '480 fele: 240 perc. Fél óra = 30 perc. 240 + 30 = 270 perc.'
  },
  {
    id: 'wp-q17',
    level: 2,
    questionTypeBadge: 'Két lépés',
    question: 'Karesz egy 4 napos kerékpártúrán volt. Az első 3 napon 56–56 km-t tekertek. Hány km-t tettek meg az utolsó napon, ha az egész út 213 km volt?',
    options: ['45 km', '157 km', '55 km', '168 km'],
    correctAnswer: 0,
    explanation: '3 nap: 3 · 56 = 168 km. Utolsó nap: 213 − 168 = 45 km.'
  },
  {
    id: 'wp-q18',
    level: 2,
    questionTypeBadge: 'Felesleges adat',
    question: 'A gerely legalább 260 cm hosszú. Karesz 510 dm-re dobta, 1 m-rel távolabbra, mint Manó. Manó 2 m-rel rövidebbet dobott, mint Gábor. Ki lett az első?',
    options: ['Gábor', 'Karesz', 'Manó', 'Nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: 'Karesz 510 dm = 51 m. Manó 50 m. Gábor 50 + 2 = 52 m. Sorrend: Gábor, Karesz, Manó. A gerely hossza felesleges adat.'
  },
  {
    id: 'wp-q19',
    level: 2,
    questionTypeBadge: 'Pénz',
    question: 'Dominiknak és Zalánnak 50 és 20 forintosokban összesen 500 Ft-ja van. 8 db ötvenforintosuk van. Hány húszforintosuk van?',
    options: ['5', '10', '2', '50'],
    correctAnswer: 0,
    explanation: '8 · 50 = 400 Ft. Maradék: 500 − 400 = 100 Ft. 100 : 20 = 5 db húszforintos.'
  },
  {
    id: 'wp-q20',
    level: 2,
    questionTypeBadge: 'Idő',
    question: 'A 18 órakor kezdődő meccsre délután 4 órától engedték be a szurkolókat. Este 9 órára ürült ki a stadion. Hány órát töltött ott, aki elsőként jött és utolsóként ment?',
    options: ['5 órát', '2 órát', '3 órát', '9 órát'],
    correctAnswer: 0,
    explanation: 'Délután 4 óra = 16 óra, este 9 óra = 21 óra. 21 − 16 = 5 óra.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'wp-q21',
    level: 3,
    questionTypeBadge: 'Színes rudak',
    figure: (
      <RodsFig
        rods={[
          { n: 1, label: 'Kristóf', color: '#ffffff' },
          { n: 3, label: 'anyukája', color: '#93c5fd' },
          { n: 6, label: 'nagymama: ?', color: '#a78bfa' }
        ]}
        total="110 év"
      />
    ),
    question: 'Kristóf anyukája háromszor olyan idős, mint Kristóf, a nagymamája pedig hatszor annyi éves. Együtt 110 évesek. Hány éves a nagymama?',
    options: ['66', '60', '33', '55'],
    correctAnswer: 0,
    explanation: '1 + 3 + 6 = 10 rész. 110 : 10 = 11 (Kristóf). Nagymama: 6 · 11 = 66 év. Ellenőrzés: 11 + 33 + 66 = 110 ✓'
  },
  {
    id: 'wp-q22',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: (
      <TableFig
        head={['', '1 perc', '2 perc', '…']}
        rows={[
          ['Ádám', '140 m', '280 m', '?'],
          ['Roland', '60 m', '120 m', '?'],
          ['Együtt', '200 m', '400 m', '?']
        ]}
      />
    ),
    question: 'Ádám és Roland egymástól 1000 m-re laknak, egyszerre elindulnak egymás felé. Ádám percenként 140 m-t, Roland 60 m-t tesz meg. Hány perc múlva találkoznak?',
    options: ['5 perc', '7 perc', '10 perc', '4 perc'],
    correctAnswer: 0,
    explanation: 'Percenként együtt 140 + 60 = 200 m-rel kerülnek közelebb. 1000 : 200 = 5 perc.'
  },
  {
    id: 'wp-q23',
    level: 3,
    questionTypeBadge: 'Táblázat',
    question: 'Ádám (140 m percenként) és Roland (60 m percenként) 5 perc múlva találkozott. Hány métert tett meg Ádám a találkozásig?',
    options: ['700 m', '300 m', '500 m', '1000 m'],
    correctAnswer: 0,
    explanation: '5 · 140 = 700 m. (Roland 5 · 60 = 300 m-t ment, együtt 1000 m ✓)'
  },
  {
    id: 'wp-q24',
    level: 3,
    questionTypeBadge: 'Próbálgatás',
    figure: (
      <TableFig
        head={['5 ágyas', '6 ágyas', 'ágy']}
        rows={[
          ['30', '0', '150'],
          ['20', '10', '160'],
          ['?', '?', '164']
        ]}
      />
    ),
    question: 'Egy táborban 30 szoba van, mindegyik 5 vagy 6 ágyas. Összesen 164 ágy van. Hány 6 ágyas szoba van?',
    options: ['14', '16', '15', '4'],
    correctAnswer: 0,
    explanation: 'Ha mind 5 ágyas lenne: 150 ágy. 164 − 150 = 14 ágy hiányzik; minden 6 ágyas szoba 1-gyel több. Tehát 14 hatágyas és 16 ötágyas: 14 · 6 + 16 · 5 = 84 + 80 = 164 ✓'
  },
  {
    id: 'wp-q25',
    level: 3,
    questionTypeBadge: 'Elágazásos rajz',
    figure: <TreeFig />,
    question: 'Alex, Barna, Csaba és Dániel versenyt fut. Hányféle sorrendben érhetnek célba, ha Dániel fut be elsőnek?',
    options: ['6', '24', '3', '4'],
    correctAnswer: 0,
    explanation: 'Dániel után a 2. hely 3-féle lehet, a 3. hely 2-féle, a 4. már csak 1: 3 · 2 · 1 = 6 sorrend.'
  },
  {
    id: 'wp-q26',
    level: 3,
    questionTypeBadge: 'Gondolkodj!',
    question: 'Bendegúz 10 osztálytársát hívta meg. Egy 20 szeletes tortát rendeltek, hogy mindenkinek 2-2 szelet jusson. Két gyereknek mégis csak 1-1 szelet jutott. Miért?',
    options: [
      'Mert Bendegúzzal együtt 11-en voltak, ehhez 22 szelet kellett volna',
      'Mert 10 gyereknek 20 szelet nem elég',
      'Mert a torta 22 szeletes volt',
      'Mert két gyerek nem kért tortát'
    ],
    correctAnswer: 0,
    explanation: '10 osztálytárs + Bendegúz = 11 gyerek. 11 · 2 = 22 szelet kellett volna, de csak 20 volt.'
  },
  {
    id: 'wp-q27',
    level: 3,
    questionTypeBadge: 'Kombinatorika',
    question: 'Ötféle színű szalvéta kapható: sárga, piros, kék, zöld, fehér. Hányféleképpen vehetsz 3 különböző színűt? (A sorrend nem számít.)',
    options: ['10', '15', '60', '5'],
    correctAnswer: 0,
    explanation: 'Írd le rendszerezve a kezdőbetűkkel: SPK, SPZ, SPF, SKZ, SKF, SZF, PKZ, PKF, PZF, KZF – ez 10 lehetőség.'
  },
  {
    id: 'wp-q28',
    level: 3,
    questionTypeBadge: 'Pénz',
    question: 'Dominiknak és Zalánnak csak 50 és 20 forintosuk van, összesen 500 Ft. Legfeljebb hány pénzérméjük lehet?',
    options: ['25', '10', '35', '50'],
    correctAnswer: 0,
    explanation: 'A legtöbb érme akkor van, ha mind húszforintos: 500 : 20 = 25 érme. (Ha mind 50-es, csak 10 érme.)'
  },
  {
    id: 'wp-q29',
    level: 3,
    questionTypeBadge: 'Gondolkodj!',
    figure: <BarrelFig />,
    question: 'Egy 650 literes hordóban 410 liter folyadék van. Ha beleöntünk még 320 litert, mennyi folyadék lesz a hordóban?',
    options: ['650 l, mert megtelik (80 l kifolyik)', '730 l', '240 l', '970 l'],
    correctAnswer: 0,
    explanation: '410 + 320 = 730 lenne, de a hordóba csak 650 l fér. A hordó megtelik, 730 − 650 = 80 l kifolyik.'
  },
  {
    id: 'wp-q30',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    question: 'Karesz 510 dm-re dobta a gerelyt, 1 m-rel távolabbra, mint Manó. Manó 2 m-rel rövidebbet dobott, mint Gábor. Milyen messzire dobott Gábor?',
    options: ['52 m', '50 m', '512 dm', '49 m'],
    correctAnswer: 0,
    explanation: '510 dm = 51 m (Karesz). Manó: 51 − 1 = 50 m. Gábor: 50 + 2 = 52 m. (Az 512 dm-nél összekeverted a métert és a decimétert: 1 m = 10 dm.)'
  }
];

export const WordProblems1000Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId="g4-count-szoveges-quiz"
      subtopicId="szoveges-feladatok"
      title="6. Szöveges feladatok – Kvíz"
      subtitle="30 feladat 3 szinten: egylépéses és többlépéses szöveges feladatok, rajzok, táblázatok, felesleges és hiányzó adatok."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      themeColor="teal"
      questions={WORD_PROBLEMS_QUESTIONS}
      cheatSheets={[
        {
          title: 'A megoldás lépései',
          items: [
            '1. Jegyezd le az adatokat! Mit kérdeznek?',
            '2. Írj műveletet, vagy rajzolj, készíts táblázatot!',
            '3. Becsüld meg az eredményt! 4. Számolj!',
            '5. Ellenőrizz! 6. Válaszolj egész mondattal!'
          ]
        },
        {
          title: 'Kulcsszavak',
          items: [
            '„… -cal több” → összeadás; „… -cal kevesebb” → kivonás',
            '„háromszor ennyi” → szorzás 3-mal',
            '„ötödrésze 154” → az egész: 154 · 5',
            '„fele”, „egyenlően osztozik” → osztás 2-vel'
          ]
        },
        {
          title: 'Rajzolj!',
          items: [
            'Szakaszos ábra: részek és az egész',
            'Számegyenes: 11 pár között 10 köz van!',
            'Színes rudak: 1 + 3 + 6 = 10 rész → 110 : 10',
            'Táblázat: percről percre; elágazásos rajz: sorrendek'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WordProblems1000Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <WordProblems1000Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default WordProblems1000Quiz;
