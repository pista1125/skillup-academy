import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { OpenSentencesMatcher } from './OpenSentencesMatcher';
import { OpenSentencesSorter } from './OpenSentencesSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált). Az ismeretlen: piros „?”.
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 140 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#fffbeb" stroke="#fcd34d" />
    {children}
  </svg>
);

/** Mérleg: bal tányéron „?” és egy szám, jobb tányéron a végeredmény. */
const BalanceFig: React.FC<{ known: string; total: string }> = ({ known, total }) => (
  <QFig>
    <polygon points="130,48 116,128 144,128" fill="#94a3b8" />
    <line x1="30" y1="48" x2="230" y2="48" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
    <circle cx="130" cy="48" r="5" fill="#f59e0b" />
    <rect x="20" y="88" width="84" height="6" rx="3" fill="#cbd5e1" />
    <rect x="156" y="88" width="84" height="6" rx="3" fill="#cbd5e1" />
    <line x1="40" y1="48" x2="24" y2="88" stroke="#94a3b8" />
    <line x1="40" y1="48" x2="100" y2="88" stroke="#94a3b8" />
    <line x1="220" y1="48" x2="160" y2="88" stroke="#94a3b8" />
    <line x1="220" y1="48" x2="236" y2="88" stroke="#94a3b8" />
    <rect x="24" y="62" width="32" height="26" rx="4" fill="#fde047" stroke="#ca8a04" />
    <text x="40" y="80" fontSize="15" fontWeight="bold" textAnchor="middle" fill={UNK}>?</text>
    <rect x="60" y="62" width="42" height="26" rx="4" fill="#93c5fd" stroke="#2563eb" />
    <text x="81" y="80" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">{known}</text>
    <rect x="170" y="62" width="56" height="26" rx="4" fill="#86efac" stroke="#16a34a" />
    <text x="198" y="80" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#14532d">{total}</text>
    <text x="130" y="24" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">Egyensúlyban van!</text>
  </QFig>
);

/** Szakaszos ábra: egész felül, két rész alul (az egyik „?”). */
const BarFig: React.FC<{ whole: string; a: string; b: string; ratio?: number }> = ({ whole, a, b, ratio = 0.62 }) => {
  const w = 220;
  const wa = Math.round(w * ratio);
  return (
    <QFig h={120}>
      <text x="130" y="26" fontSize="14" fontWeight="bold" textAnchor="middle" fill={whole.includes('?') ? UNK : '#0f172a'}>{whole}</text>
      <path d="M20 40 Q20 32 30 32 H230 Q240 32 240 40" fill="none" stroke="#475569" strokeWidth="1.5" />
      <rect x="20" y="48" width={wa} height="30" rx="5" fill="#38bdf8" />
      <rect x={20 + wa} y="48" width={w - wa} height="30" rx="5" fill="#fde047" stroke="#ca8a04" />
      <text x={20 + wa / 2} y="98" fontSize="14" fontWeight="bold" textAnchor="middle" fill={a.includes('?') ? UNK : '#0f172a'}>{a}</text>
      <text x={20 + wa + (w - wa) / 2} y="98" fontSize="14" fontWeight="bold" textAnchor="middle" fill={b.includes('?') ? UNK : '#0f172a'}>{b}</text>
    </QFig>
  );
};

type Shape = 'circle' | 'tri' | 'sq';
const ShapeIcon: React.FC<{ s: Shape; x: number; y: number; c: string }> = ({ s, x, y, c }) =>
  s === 'circle' ? (
    <circle cx={x} cy={y} r="11" fill={c} />
  ) : s === 'tri' ? (
    <polygon points={`${x},${y - 12} ${x - 12},${y + 10} ${x + 12},${y + 10}`} fill={c} />
  ) : (
    <rect x={x - 11} y={y - 11} width="22" height="22" rx="3" fill={c} />
  );

/** Jeles egyenlőség: n darab azonos jel összeadva = eredmény. */
const SymbolRowFig: React.FC<{ rows: { items: { s: Shape; c: string }[]; result: string }[] }> = ({ rows }) => (
  <QFig h={30 + rows.length * 44}>
    {rows.map((r, ri) => {
      const y = 34 + ri * 44;
      return (
        <g key={ri}>
          {r.items.map((it, i) => (
            <g key={i}>
              <ShapeIcon s={it.s} x={28 + i * 44} y={y} c={it.c} />
              {i < r.items.length - 1 && (
                <text x={50 + i * 44} y={y + 6} fontSize="17" fontWeight="bold" textAnchor="middle" fill="#334155">+</text>
              )}
            </g>
          ))}
          <text x={14 + r.items.length * 44} y={y + 6} fontSize="16" fontWeight="bold" fill="#334155">= {r.result}</text>
        </g>
      );
    })}
  </QFig>
);

/** Számkártyák egy nyitott mondat mellett. */
const CardsFig: React.FC<{ sentence: string; cards: string[] }> = ({ sentence, cards }) => (
  <QFig h={120}>
    <rect x="40" y="14" width="180" height="38" rx="12" fill="#fb923c" />
    <text x="130" y="40" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#fff">{sentence}</text>
    {cards.map((c, i) => (
      <g key={c}>
        <rect x={22 + i * 56} y="68" width="48" height="34" rx="7" fill="#fde047" stroke="#ca8a04" />
        <text x={46 + i * 56} y="91" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#1e293b">{c}</text>
      </g>
    ))}
  </QFig>
);

/** Számegyenes 0-tól 9-ig, a megoldások helye „?”-lel. */
const NumberLineFig: React.FC<{ title: string }> = ({ title }) => (
  <QFig h={100}>
    <text x="130" y="24" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#5b21b6">{title}</text>
    <line x1="14" y1="58" x2="248" y2="58" stroke="#334155" strokeWidth="2" />
    <polygon points="250,58 242,53 242,63" fill="#334155" />
    {Array.from({ length: 10 }, (_, i) => (
      <g key={i}>
        <line x1={22 + i * 24} y1="52" x2={22 + i * 24} y2="64" stroke="#334155" strokeWidth="2" />
        <text x={22 + i * 24} y="82" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">{i}</text>
      </g>
    ))}
    <text x="130" y="44" fontSize="12" fontWeight="bold" textAnchor="middle" fill={UNK}>Melyek a jó számok?</text>
  </QFig>
);

/** Gondoltam egy számra: nyilas lánc. */
const ArrowChainFig: React.FC<{ op1: string; op2: string; result: string }> = ({ op1, op2, result }) => (
  <QFig h={110}>
    <defs>
      <marker id="osqArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#475569" />
      </marker>
    </defs>
    {[
      { x: 12, t: '?' },
      { x: 100, t: '' },
      { x: 188, t: result }
    ].map((b) => (
      <g key={b.x}>
        <rect x={b.x} y="56" width="60" height="30" rx="15" fill="#fff" stroke="#fb923c" strokeWidth="2" />
        <text x={b.x + 30} y="76" fontSize="15" fontWeight="bold" textAnchor="middle" fill={b.t === '?' ? UNK : '#0f172a'}>{b.t}</text>
      </g>
    ))}
    <path d="M48 52 Q86 18 124 52" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#osqArrow)" />
    <path d="M136 52 Q174 18 212 52" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#osqArrow)" />
    <text x="86" y="28" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#2563eb">{op1}</text>
    <text x="174" y="28" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#2563eb">{op2}</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const OPEN_SENTENCES_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'os-q1',
    level: 1,
    questionTypeBadge: 'Hiányzó tag',
    figure: <BalanceFig known="240" total="600" />,
    question: 'Melyik szám teszi igazzá? □ + 240 = 600',
    options: ['360', '840', '460', '260'],
    correctAnswer: 0,
    explanation: 'Az összegből (600) elveszed az ismert tagot (240): 600 − 240 = 360. Ellenőrzés: 360 + 240 = 600 ✓'
  },
  {
    id: 'os-q2',
    level: 1,
    questionTypeBadge: 'Hiányzó kivonandó',
    figure: <BarFig whole="720" a="450" b="?" />,
    question: 'Melyik szám teszi igazzá? 720 − □ = 450',
    options: ['270', '1170', '370', '330'],
    correctAnswer: 0,
    explanation: 'A 720-ból kell annyit elvenni, hogy 450 maradjon: 720 − 450 = 270. Ellenőrzés: 720 − 270 = 450 ✓'
  },
  {
    id: 'os-q3',
    level: 1,
    questionTypeBadge: 'Hiányzó tényező',
    question: 'Melyik szám teszi igazzá? 8 · □ = 560',
    options: ['70', '7', '552', '80'],
    correctAnswer: 0,
    explanation: 'Elosztod a szorzatot az ismert tényezővel: 560 : 8 = 70. Ellenőrzés: 8 · 70 = 560 ✓ (A 7 csak 56-ot adna.)'
  },
  {
    id: 'os-q4',
    level: 1,
    questionTypeBadge: 'Hiányzó osztandó',
    question: 'Melyik szám teszi igazzá? □ : 6 = 80',
    options: ['480', '86', '74', '560'],
    correctAnswer: 0,
    explanation: 'Visszaszorzol: 80 · 6 = 480. Ellenőrzés: 480 : 6 = 80 ✓'
  },
  {
    id: 'os-q5',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Melyik nyitott mondat?',
    options: ['A gólyának □ lába van.', 'A gólyának 2 lába van.', '5 + 3 = 8', '10 > 7'],
    correctAnswer: 0,
    explanation: 'A nyitott mondatban üres hely van (□). A többi mondat kész állítás: el tudjuk dönteni, hogy igaz-e.'
  },
  {
    id: 'os-q6',
    level: 1,
    questionTypeBadge: 'Igaz állítás',
    question: 'Mit írj a □ helyére, hogy igaz legyen? „□ egyjegyű szám van.”',
    options: ['10', '9', '1', '99'],
    correctAnswer: 0,
    explanation: 'Az egyjegyű számok: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Ez 10 szám – a 0-t se felejtsd ki!'
  },
  {
    id: 'os-q7',
    level: 1,
    questionTypeBadge: 'Jelek',
    figure: <SymbolRowFig rows={[{ items: [{ s: 'circle', c: '#facc15' }, { s: 'circle', c: '#facc15' }], result: '100' }]} />,
    question: 'Az azonos jelek azonos számot jelölnek. ● + ● = 100. Mennyi a ●?',
    options: ['50', '100', '200', '25'],
    correctAnswer: 0,
    explanation: 'Két egyforma szám összege 100, ezért egy ● a 100 fele: 100 : 2 = 50. Ellenőrzés: 50 + 50 = 100 ✓'
  },
  {
    id: 'os-q8',
    level: 1,
    questionTypeBadge: 'Egyenlőtlenség',
    figure: <CardsFig sentence="367 > □ > 67" cards={['365', '403', '67', '368']} />,
    question: 'Melyik cédula teszi igazzá a nyitott mondatot? 367 > □ > 67',
    options: ['365', '403', '67', '368'],
    correctAnswer: 0,
    explanation: 'A számnak 367-nél kisebbnek ÉS 67-nél nagyobbnak kell lennie. A 365 ilyen. A 403 és a 368 túl nagy, a 67 pedig nem nagyobb 67-nél.'
  },
  {
    id: 'os-q9',
    level: 1,
    questionTypeBadge: 'Igaz állítás',
    question: 'Mit írj a □ helyére, hogy igaz legyen? „Magyarország legnagyobb folyója a □.”',
    options: ['Duna', 'Tisza', 'Balaton', 'Dráva'],
    correctAnswer: 0,
    explanation: 'Magyarország legnagyobb folyója a Duna. A Balaton tó, nem folyó.'
  },
  {
    id: 'os-q10',
    level: 1,
    questionTypeBadge: 'Hiányzó kisebbítendő',
    figure: <BarFig whole="?" a="560" b="330" ratio={0.6} />,
    question: 'Melyik szám teszi igazzá? □ − 560 = 330',
    options: ['890', '230', '330', '790'],
    correctAnswer: 0,
    explanation: 'Elvettünk 560-at, és 330 maradt. Az eredeti szám: 330 + 560 = 890. Ellenőrzés: 890 − 560 = 330 ✓ (A 230 rossz irányú számolás.)'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'os-q11',
    level: 2,
    questionTypeBadge: 'Jelek',
    figure: (
      <SymbolRowFig
        rows={[{ items: [{ s: 'sq', c: '#38bdf8' }, { s: 'sq', c: '#38bdf8' }, { s: 'sq', c: '#38bdf8' }], result: '180' }]}
      />
    ),
    question: '■ + ■ + ■ = 180. Mennyi a ■?',
    options: ['60', '90', '540', '177'],
    correctAnswer: 0,
    explanation: 'Három egyforma szám összege 180: 180 : 3 = 60. Ellenőrzés: 60 + 60 + 60 = 180 ✓ (A 90 két ■ esetén lenne jó.)'
  },
  {
    id: 'os-q12',
    level: 2,
    questionTypeBadge: 'Jelek',
    figure: (
      <SymbolRowFig
        rows={[
          {
            items: [
              { s: 'tri', c: '#22c55e' },
              { s: 'tri', c: '#22c55e' },
              { s: 'tri', c: '#22c55e' },
              { s: 'tri', c: '#22c55e' }
            ],
            result: '200'
          }
        ]}
      />
    ),
    question: '▲ + ▲ + ▲ + ▲ = 200. Mennyi a ▲?',
    options: ['50', '800', '40', '196'],
    correctAnswer: 0,
    explanation: 'Négy egyforma szám összege 200: 200 : 4 = 50. Ellenőrzés: 50 + 50 + 50 + 50 = 200 ✓'
  },
  {
    id: 'os-q13',
    level: 2,
    questionTypeBadge: 'Szövegből nyitott mondat',
    figure: <BarFig whole="250 m" a="200 m" b="?" ratio={0.78} />,
    question: 'Sanyi leúszott már 200 métert. Hány métert kell még leúsznia, ha az edzésadagja 250 m? Melyik nyitott mondat illik a szöveghez?',
    options: ['200 m + □ m = 250 m', '200 m + 250 m = □ m', '□ m − 200 m = 250 m', '250 m + □ m = 200 m'],
    correctAnswer: 0,
    explanation: 'Már megvan 200 m, ehhez jön még □ m, és összesen 250 m lesz: 200 m + □ m = 250 m. A megoldás □ = 50.'
  },
  {
    id: 'os-q14',
    level: 2,
    questionTypeBadge: 'Megoldások száma',
    figure: <NumberLineFig title="5 > □" />,
    question: 'Hány szám teszi igazzá az 5 > □ nyitott mondatot? (A 0 is számít.)',
    options: ['5', '4', '6', '1'],
    correctAnswer: 0,
    explanation: 'A jó számok: 0, 1, 2, 3, 4. Ez 5 szám. Az 5 már nem jó, mert 5 nem nagyobb 5-nél.'
  },
  {
    id: 'os-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó tag',
    figure: <BarFig whole="741" a="562" b="?" ratio={0.7} />,
    question: 'Melyik szám teszi igazzá? 562 + □ = 741',
    options: ['179', '1303', '221', '189'],
    correctAnswer: 0,
    explanation: '741 − 562 = 179. Ellenőrzés: 562 + 179 = 741 ✓ (Az 1303 az, ha összeadod a két számot.)'
  },
  {
    id: 'os-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó kivonandó',
    figure: <BarFig whole="803" a="427" b="?" ratio={0.53} />,
    question: 'Melyik szám teszi igazzá? 803 − □ = 427',
    options: ['376', '1230', '424', '386'],
    correctAnswer: 0,
    explanation: '803 − 427 = 376. Ellenőrzés: 803 − 376 = 427 ✓ (A 386 akkor jön ki, ha elfelejted a tízesátlépést.)'
  },
  {
    id: 'os-q17',
    level: 2,
    questionTypeBadge: 'Hiányzó tényező',
    question: 'Melyik szám teszi igazzá? 4 · □ = 360',
    options: ['90', '9', '356', '1440'],
    correctAnswer: 0,
    explanation: '360 : 4 = 90. Ellenőrzés: 4 · 90 = 360 ✓ (A 9 csak 36-ot adna.)'
  },
  {
    id: 'os-q18',
    level: 2,
    questionTypeBadge: 'Hiányzó osztandó',
    question: 'Melyik szám teszi igazzá? □ : 7 = 50',
    options: ['350', '57', '43', '7'],
    correctAnswer: 0,
    explanation: 'Visszaszorzol: 50 · 7 = 350. Ellenőrzés: 350 : 7 = 50 ✓'
  },
  {
    id: 'os-q19',
    level: 2,
    questionTypeBadge: 'Egyenlőtlenség',
    question: 'Melyik szám NEM teszi igazzá? □ + 40 < 100',
    options: ['60', '59', '20', '0'],
    correctAnswer: 0,
    explanation: '60 + 40 = 100, és a 100 nem kisebb 100-nál! A 59 (99 < 100), a 20 és a 0 igazzá teszi.'
  },
  {
    id: 'os-q20',
    level: 2,
    questionTypeBadge: 'Jelek',
    figure: <SymbolRowFig rows={[{ items: [{ s: 'tri', c: '#ef4444' }, { s: 'tri', c: '#ef4444' }], result: '1000' }]} />,
    question: '▲ + ▲ = 1000. Mennyi a piros ▲?',
    options: ['500', '2000', '998', '250'],
    correctAnswer: 0,
    explanation: 'Két egyforma szám összege 1000: 1000 : 2 = 500. Ellenőrzés: 500 + 500 = 1000 ✓'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'os-q21',
    level: 3,
    questionTypeBadge: 'Számolj előbb!',
    question: 'Melyik a LEGNAGYOBB szám, amely igazzá teszi? 37 · 10 − 350 > □',
    options: ['19', '20', '21', '370'],
    correctAnswer: 0,
    explanation: 'Előbb számolj: 37 · 10 = 370, 370 − 350 = 20. Tehát 20 > □. A legnagyobb ilyen szám a 19 (a 20 már nem jó).'
  },
  {
    id: 'os-q22',
    level: 3,
    questionTypeBadge: 'Számolj előbb!',
    question: 'Melyik a LEGNAGYOBB szám, amely igazzá teszi? 500 : 10 + 413 > □',
    options: ['462', '463', '464', '412'],
    correctAnswer: 0,
    explanation: '500 : 10 = 50, 50 + 413 = 463. Tehát 463 > □, a legnagyobb ilyen szám a 462.'
  },
  {
    id: 'os-q23',
    level: 3,
    questionTypeBadge: 'Zárójel',
    question: 'Melyik a LEGKISEBB szám, amely igazzá teszi? (590 − 340) · 3 < □',
    options: ['751', '750', '749', '251'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 590 − 340 = 250, aztán 250 · 3 = 750. Tehát 750 < □. A legkisebb ilyen szám a 751.'
  },
  {
    id: 'os-q24',
    level: 3,
    questionTypeBadge: 'Műveletsor',
    question: 'Melyik szám teszi igazzá? 980 − 450 − 50 + 320 + 170 = □',
    options: ['970', '870', '1070', '960'],
    correctAnswer: 0,
    explanation: 'Balról jobbra haladj: 980 − 450 = 530, 530 − 50 = 480, 480 + 320 = 800, 800 + 170 = 970.'
  },
  {
    id: 'os-q25',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    figure: <ArrowChainFig op1="· 3" op2="+ 60" result="300" />,
    question: 'Gondoltam egy számra. Megszoroztam 3-mal, és hozzáadtam 60-at. 300-at kaptam. Melyik számra gondoltam?',
    options: ['80', '120', '100', '1080'],
    correctAnswer: 0,
    explanation: 'Visszafelé fordított műveletekkel: 300 − 60 = 240, majd 240 : 3 = 80. Ellenőrzés: 80 · 3 + 60 = 300 ✓'
  },
  {
    id: 'os-q26',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    figure: <ArrowChainFig op1="· 2" op2="· 10" result="800" />,
    question: 'Gondoltam egy számra. A kétszeresét megszoroztam 10-zel, és 800-at kaptam. Melyik számra gondoltam?',
    options: ['40', '80', '400', '16000'],
    correctAnswer: 0,
    explanation: 'Visszafelé: 800 : 10 = 80, majd 80 : 2 = 40. Ellenőrzés: 40 · 2 = 80, 80 · 10 = 800 ✓ (A 80 csak az első lépés visszafelé.)'
  },
  {
    id: 'os-q27',
    level: 3,
    questionTypeBadge: 'Számolj előbb!',
    question: 'Melyik a LEGKISEBB szám, amely igazzá teszi? 220 − □ < 800 : 8 : 4',
    options: ['196', '195', '245', '25'],
    correctAnswer: 0,
    explanation: 'Jobb oldal: 800 : 8 = 100, 100 : 4 = 25. Tehát 220 − □ < 25. Ha □ = 195, akkor 25 marad, ami nem kisebb 25-nél. Ha □ = 196, akkor 24 < 25 ✓'
  },
  {
    id: 'os-q28',
    level: 3,
    questionTypeBadge: 'Számolj előbb!',
    question: 'Melyik a LEGNAGYOBB szám, amely igazzá teszi? 487 + 58 − 229 > □',
    options: ['315', '316', '305', '317'],
    correctAnswer: 0,
    explanation: '487 + 58 = 545, 545 − 229 = 316. Tehát 316 > □, a legnagyobb ilyen szám a 315. (A 305 akkor jön ki, ha elfelejted az átvitelt: 535-öt számolsz.)'
  },
  {
    id: 'os-q29',
    level: 3,
    questionTypeBadge: 'Jelek',
    figure: (
      <SymbolRowFig
        rows={[
          { items: [{ s: 'circle', c: '#facc15' }, { s: 'circle', c: '#facc15' }], result: '100' },
          { items: [{ s: 'circle', c: '#facc15' }, { s: 'sq', c: '#38bdf8' }], result: '130' }
        ]}
      />
    ),
    question: '● + ● = 100 és ● + ■ = 130. Mennyi a ■?',
    options: ['80', '30', '130', '65'],
    correctAnswer: 0,
    explanation: 'Az első sorból ● = 50. A második sorban 50 + ■ = 130, tehát ■ = 130 − 50 = 80.'
  },
  {
    id: 'os-q30',
    level: 3,
    questionTypeBadge: 'Szövegből nyitott mondat',
    question: 'Csaba egy 950 Ft-os könyvet szeretne venni. Most 485 Ft-ja van. Melyik nyitott mondat és megoldás helyes?',
    options: ['485 + □ = 950, □ = 465', '485 + 950 = □, □ = 1435', '950 + □ = 485, □ = 465', '485 + □ = 950, □ = 565'],
    correctAnswer: 0,
    explanation: 'A meglévő 485 Ft-hoz még □ Ft kell, hogy 950 Ft legyen: 485 + □ = 950. □ = 950 − 485 = 465. Csabának még 465 Ft-ot kell gyűjtenie.'
  }
];

export const OpenSentencesQuiz: React.FC<{
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
      topicId="g4-count-nyitott-mondatok-quiz"
      subtopicId="nyitott-mondatok"
      title="5. Nyitott mondatok – Kvíz"
      subtitle="30 feladat 3 szinten: hiányzó számok, igaz és hamis állítások, jeles feladványok, gondoltam egy számra."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      themeColor="amber"
      questions={OPEN_SENTENCES_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mi a nyitott mondat?',
          items: [
            'Van benne üres hely: □, △, ○.',
            'Ha beírunk valamit, igaz vagy hamis állítás lesz.',
            'Azonos jel helyére azonos szám kerül.',
            'Mindig ellenőrizz: írd vissza a számot!'
          ]
        },
        {
          title: 'Visszafelé számolás',
          items: [
            '□ + 240 = 600 → □ = 600 − 240',
            '□ − 560 = 330 → □ = 330 + 560',
            '720 − □ = 450 → □ = 720 − 450',
            '□ · 6 = 480 → □ = 480 : 6;  □ : 9 = 80 → □ = 80 · 9'
          ]
        },
        {
          title: 'Kisebb és nagyobb jel',
          items: [
            '20 > □ : a 20 NEM jó, csak 0, 1, …, 19.',
            'Előbb számold ki a műveleteket, aztán keress számot!',
            'Az 5 > □ megoldásai: 0, 1, 2, 3, 4 (5 szám).',
            '367 > □ > 67: mindkét feltételnek teljesülnie kell.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <OpenSentencesMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <OpenSentencesSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default OpenSentencesQuiz;
