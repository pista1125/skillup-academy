import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MulDiv1000Matcher } from './MulDiv1000Matcher';
import { MulDiv1000Sorter } from './MulDiv1000Sorter';
import { Ladybug } from './MulDiv1000Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';
const COLS = ['#dc2626', '#0ea5e9', '#eab308'];

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Katicák lábakkal. */
const QLadybugs: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={110}>
    {Array.from({ length: n }).map((_, i) => (
      <Ladybug key={i} x={40 + i * 54} y={48} s={0.95} />
    ))}
    <text x="120" y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>? láb</text>
  </QFig>
);

/** Cukorkák szétosztása: n pötty, k doboz. */
const QShare: React.FC<{ total: number; kids: number }> = ({ total, kids }) => (
  <QFig h={120}>
    {Array.from({ length: total }).map((_, i) => (
      <circle key={i} cx={22 + (i % 13) * 15} cy={22 + Math.floor(i / 13) * 15} r="5.5" fill="#f472b6" stroke="#9d174d" strokeWidth="0.8" />
    ))}
    {Array.from({ length: kids }).map((_, i) => (
      <g key={`k${i}`}>
        <circle cx={60 + i * 60} cy="70" r="10" fill="#fde68a" stroke="#a16207" />
        <circle cx={56 + i * 60} cy="68" r="1.4" fill="#0f172a" />
        <circle cx={64 + i * 60} cy="68" r="1.4" fill="#0f172a" />
        <path d={`M ${55 + i * 60} 73 Q ${60 + i * 60} 77 ${65 + i * 60} 73`} fill="none" stroke="#0f172a" strokeWidth="1" />
        <rect x={48 + i * 60} y="82" width="24" height="12" rx="3" fill="#e0f2fe" stroke="#0284c7" />
      </g>
    ))}
    <text x="120" y="112" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>
      {total} : {kids} = ?, maradék: ?
    </text>
  </QFig>
);

/** Virág: középen osztó, egy kiemelt szirom. */
const QFlower: React.FC<{ center: number; petals: number[]; mark: number }> = ({ center, petals, mark }) => (
  <QFig h={140}>
    {petals.map((p, i) => {
      const a = (-90 + i * (360 / petals.length)) * (Math.PI / 180);
      const cx = 120 + Math.cos(a) * 40;
      const cy = 70 + Math.sin(a) * 40;
      return (
        <g key={p}>
          <circle cx={cx} cy={cy} r="21" fill={p === mark ? '#fde68a' : '#d9f99d'} stroke={p === mark ? C_UNK : '#4d7c0f'} strokeWidth={p === mark ? 2.5 : 1.2} />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1a2e05">{p}</text>
        </g>
      );
    })}
    <circle cx="120" cy="70" r="17" fill="#facc15" stroke="#a16207" />
    <text x="120" y="77" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{center}</text>
  </QFig>
);

/** Érmék darabszámmal. */
const QCoins: React.FC<{ coins: { v: number; n: number; name: string }[] }> = ({ coins }) => {
  const w = 216 / coins.length;
  return (
    <QFig h={120}>
      {coins.map((c, i) => {
        const cx = 12 + i * w + w / 2;
        return (
          <g key={c.v}>
            <circle cx={cx} cy="42" r="22" fill={c.v === 50 ? '#e5e7eb' : '#fde68a'} stroke={c.v === 50 ? '#6b7280' : '#a16207'} strokeWidth="2.5" />
            <text x={cx} y="48" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{c.v}</text>
            <text x={cx} y="80" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#713f12">{c.name}</text>
            <text x={cx} y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">{c.n} db</text>
          </g>
        );
      })}
      <text x="120" y="114" textAnchor="middle" fontSize="11" fontWeight="bold" fill={C_UNK}>Összesen: ? Ft</text>
    </QFig>
  );
};

/** Írásbeli szorzás elrendezése: abc · m, alatta az eredmény vagy „?”. */
const QMult: React.FC<{ a: string; m: string; result?: string; arrow?: 'm' | 'a' | 'r' }> = ({ a, m, result, arrow }) => {
  const xs = [80, 108, 136];
  const digits = a.padStart(3, ' ').split('');
  return (
    <QFig h={130}>
      {['sz', 't', 'e'].map((h, i) => (
        <g key={h}>
          <rect x={xs[i] - 12} y="12" width="24" height="16" fill={COLS[i]} />
          <text x={xs[i]} y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">{h}</text>
          <rect x={xs[i] - 12} y="28" width="24" height="76" fill={COLS[i]} opacity="0.12" />
        </g>
      ))}
      {digits.map((d, i) => (
        <text key={i} x={xs[i]} y="54" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{d.trim()}</text>
      ))}
      <text x="160" y="54" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">·</text>
      <text x="180" y="54" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#15803d">{m}</text>
      <line x1="66" y1="62" x2="150" y2="62" stroke="#0f172a" strokeWidth="2" />
      {result ? (
        result.padStart(3, ' ').split('').map((d, i) => (
          <text key={`r${i}`} x={xs[i]} y="92" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0284c7">{d.trim()}</text>
        ))
      ) : (
        xs.map((x, i) => <text key={`q${i}`} x={x} y="92" textAnchor="middle" fontSize="20" fontWeight="bold" fill={C_UNK}>?</text>)
      )}
      {arrow === 'm' && (
        <g>
          <line x1="180" y1="70" x2="180" y2="100" stroke={C_UNK} strokeWidth="2" />
          <polygon points="180,64 176,72 184,72" fill={C_UNK} />
          <text x="180" y="118" textAnchor="middle" fontSize="15" fontWeight="bold" fill={C_UNK}>?</text>
        </g>
      )}
    </QFig>
  );
};

/** Táblázat (triatlon). */
const QTable: React.FC<{ head: string[]; rows: string[][] }> = ({ head, rows }) => {
  const cw = 216 / head.length;
  return (
    <QFig h={30 + rows.length * 26 + 14}>
      {head.map((h, i) => (
        <g key={h}>
          <rect x={12 + i * cw} y="12" width={cw} height="24" fill="#f59e0b" stroke="#fff" />
          <text x={12 + i * cw + cw / 2} y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">{h}</text>
        </g>
      ))}
      {rows.map((r, j) =>
        r.map((c, i) => (
          <g key={`${j}-${i}`}>
            <rect x={12 + i * cw} y={36 + j * 26} width={cw} height="26" fill={i === 0 ? '#fde68a' : '#fef3c7'} stroke="#fff" />
            <text x={12 + i * cw + cw / 2} y={53 + j * 26} textAnchor="middle" fontSize="11" fontWeight="bold" fill={c.includes('?') ? C_UNK : '#0f172a'}>
              {c}
            </text>
          </g>
        ))
      )}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const MULDIV_1000_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'md1000-q1',
    level: 1,
    questionTypeBadge: 'Szorzótábla',
    question: 'Mennyi 7 · 8?',
    options: ['56', '54', '48', '15'],
    correctAnswer: 0,
    explanation: '7 · 8 = 56. Segít: 7 · 7 = 49, és még egy 7: 49 + 7 = 56.'
  },
  {
    id: 'md1000-q2',
    level: 1,
    questionTypeBadge: 'Bennfoglalás',
    question: 'Mennyi 40 : 8?',
    options: ['5', '4', '6', '32'],
    correctAnswer: 0,
    explanation: 'Hányszor van meg a 8 a 40-ben? 5 · 8 = 40, tehát 40 : 8 = 5.'
  },
  {
    id: 'md1000-q3',
    level: 1,
    questionTypeBadge: 'Hiányzó tényező',
    question: 'Melyik szám hiányzik? 6 · □ = 30',
    options: ['5', '6', '24', '36'],
    correctAnswer: 0,
    explanation: '6 · 5 = 30, ezért a hiányzó szám az 5. (Kiszámolhatod osztással is: 30 : 6 = 5.)'
  },
  {
    id: 'md1000-q4',
    level: 1,
    questionTypeBadge: 'Szorzás képről',
    figure: <QLadybugs n={4} />,
    question: 'Egy katicának 6 lába van. Hány lába van összesen a 4 katicának?',
    options: ['24', '10', '20', '28'],
    correctAnswer: 0,
    explanation: '6 + 6 + 6 + 6 = 24, szorzással: 4 · 6 = 24.'
  },
  {
    id: 'md1000-q5',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A darunak 2 lába van. Hány lába van 5 darunak?',
    options: ['10', '7', '20', '25'],
    correctAnswer: 0,
    explanation: '5 daru, mindegyiknek 2 lába: 5 · 2 = 10.'
  },
  {
    id: 'md1000-q6',
    level: 1,
    questionTypeBadge: 'Kerek számok',
    question: 'Mennyi 50 · 10?',
    options: ['500', '60', '5000', '510'],
    correctAnswer: 0,
    explanation: 'Ha 10-zel szorzunk, a szám végére egy 0-t írunk: 50 · 10 = 500.'
  },
  {
    id: 'md1000-q7',
    level: 1,
    questionTypeBadge: 'Kerek számok',
    question: 'Mennyi 400 : 2?',
    options: ['200', '398', '800', '20'],
    correctAnswer: 0,
    explanation: '4 százas fele 2 százas: 400 : 2 = 200.'
  },
  {
    id: 'md1000-q8',
    level: 1,
    questionTypeBadge: 'Elnevezések',
    figure: <QMult a="214" m="3" result="642" arrow="m" />,
    question: 'A 214 · 3 = 642 szorzásban mi a neve a 3-nak?',
    options: ['szorzó', 'szorzandó', 'szorzat', 'összeg'],
    correctAnswer: 0,
    explanation: 'Szorzandó · szorzó = szorzat. A 214 a szorzandó, a 3 a szorzó, a 642 a szorzat. A szorzandó és a szorzó együtt a tényezők.'
  },
  {
    id: 'md1000-q9',
    level: 1,
    questionTypeBadge: 'Maradékos osztás',
    figure: <QShare total={13} kids={3} />,
    question: '13 cukorkát 3 gyerek igazságosan eloszt. Hányat kap egy gyerek, és mennyi marad?',
    options: ['4-et kap, marad 1', '3-at kap, marad 4', '4-et kap, nem marad semmi', '5-öt kap, marad 2'],
    correctAnswer: 0,
    explanation: '4 · 3 = 12, és 13 − 12 = 1. Mindenki 4-et kap, 1 marad. (5 · 3 = 15 már több lenne 13-nál.)'
  },
  {
    id: 'md1000-q10',
    level: 1,
    questionTypeBadge: 'Kerek számok',
    question: 'Mennyi 9 · 90?',
    options: ['810', '99', '8100', '81'],
    correctAnswer: 0,
    explanation: '9 · 9 = 81, tehát 9 · 9 tízes = 81 tízes = 810.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'md1000-q11',
    level: 2,
    questionTypeBadge: 'Kerek számok',
    question: 'Mennyi 2 · 340?',
    options: ['680', '640', '342', '6800'],
    correctAnswer: 0,
    explanation: '2 · 300 = 600 és 2 · 40 = 80. Együtt 600 + 80 = 680.'
  },
  {
    id: 'md1000-q12',
    level: 2,
    questionTypeBadge: 'Kerek számok',
    question: 'Mennyi 640 : 80?',
    options: ['8', '80', '560', '9'],
    correctAnswer: 0,
    explanation: '64 tízesben a 8 tízes 8-szor van meg, mert 8 · 80 = 640.'
  },
  {
    id: 'md1000-q13',
    level: 2,
    questionTypeBadge: 'Kerek számok',
    question: 'Mennyi 1000 : 50?',
    options: ['20', '200', '2', '50'],
    correctAnswer: 0,
    explanation: '50 · 2 = 100, tehát 50 · 20 = 1000. Így 1000 : 50 = 20.'
  },
  {
    id: 'md1000-q14',
    level: 2,
    questionTypeBadge: 'Maradék',
    question: 'Ha egy számot 3-mal osztunk, mennyi lehet a maradék?',
    options: ['0, 1 vagy 2', '0, 1, 2 vagy 3', 'csak 1', '1, 2 vagy 3'],
    correctAnswer: 0,
    explanation: 'A maradék mindig kisebb, mint az osztó. 3-mal osztva tehát 0, 1 vagy 2 maradhat.'
  },
  {
    id: 'md1000-q15',
    level: 2,
    questionTypeBadge: 'Maradékos osztás',
    figure: <QFlower center={3} petals={[13, 24, 23, 17, 29]} mark={29} />,
    question: 'Oszd el a sárga szirmon lévő számot a középen lévő számmal! Mennyi a hányados és a maradék?',
    options: ['9, maradék 2', '8, maradék 5', '9, maradék 1', '10, maradék 1'],
    correctAnswer: 0,
    explanation: '29 : 3 → 9 · 3 = 27, és 29 − 27 = 2. Tehát 9, maradék 2. (A maradék nem lehet 5, mert az nagyobb a 3-nál.)'
  },
  {
    id: 'md1000-q16',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: (
      <QCoins
        coins={[
          { v: 5, n: 8, name: 'nagy kócsag' },
          { v: 20, n: 3, name: 'nőszirom' }
        ]}
      />
    ),
    question: 'A zsebedben 8 darab 5 Ft-os (nagy kócsagos) és 3 darab 20 Ft-os (nőszirmos) érme van. Mennyi pénzed van?',
    options: ['100 Ft', '175 Ft', '11 Ft', '80 Ft'],
    correctAnswer: 0,
    explanation: '8 · 5 = 40 Ft és 3 · 20 = 60 Ft. Együtt 40 + 60 = 100 Ft.'
  },
  {
    id: 'md1000-q17',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: (
      <QTable
        head={['Táv', 'Úszás (m)', 'Kerékpár (km)']}
        rows={[
          ['Gyermektáv', '60 · 5', '720 : 90'],
          ['Serdülőtáv', '5 · 100', '360 : 30 = ?']
        ]}
      />
    ),
    question: 'Hány km hosszú a serdülőtáv kerékpáros szakasza? (360 : 30)',
    options: ['12 km', '120 km', '9 km', '330 km'],
    correctAnswer: 0,
    explanation: '36 tízesben a 3 tízes 12-szer van meg: 12 · 30 = 360. Tehát 12 km.'
  },
  {
    id: 'md1000-q18',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg a 214 · 3 szorzatot! A 214-et tízesre kerekítsd!',
    options: ['630', '600', '642', '660'],
    correctAnswer: 0,
    explanation: '214 ≈ 210, és 210 · 3 = 630. (A 642 a pontos szorzat, nem a becslés.)'
  },
  {
    id: 'md1000-q19',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMult a="214" m="3" />,
    question: 'Számold ki írásban: 214 · 3 = ?',
    options: ['642', '632', '217', '652'],
    correctAnswer: 0,
    explanation: '3 · 4 = 12, leírom a 2-t, maradt 1. 3 · 1 = 3, meg 1, az 4. 3 · 2 = 6. A szorzat: 642.'
  },
  {
    id: 'md1000-q20',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik összeadással ellenőrizheted, hogy 214 · 3 = 642?',
    options: ['214 + 214 + 214', '214 + 3', '3 + 3 + 3', '642 + 3'],
    correctAnswer: 0,
    explanation: 'A 214 · 3 azt jelenti, hogy háromszor vesszük a 214-et: 214 + 214 + 214 = 642.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'md1000-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QMult a="92" m="7" />,
    question: 'Az évfolyamra 92 tanuló jár. Mindenki 7 növényt préselt le. Hány préselt növény lett összesen?',
    options: ['644', '634', '99', '654'],
    correctAnswer: 0,
    explanation: '92 · 7: 7 · 2 = 14, leírom a 4-et, maradt 1. 7 · 9 = 63, meg 1, az 64. Összesen 644 növény.'
  },
  {
    id: 'md1000-q22',
    level: 3,
    questionTypeBadge: 'Párosítás',
    figure: <QTable head={['A', 'B', 'C', 'D']} rows={[['123 · 3', '98 · 4', '213 · 4', '142 · 6'], ['114 · 3', '57 · 6', '49 · 8', '']]} />,
    question: 'Ezek közül melyik szorzásnak NINCS párja (ugyanakkora eredményű társa)? 123 · 3, 98 · 4, 213 · 4, 142 · 6, 114 · 3, 57 · 6, 49 · 8',
    options: ['123 · 3', '98 · 4', '57 · 6', '213 · 4'],
    correctAnswer: 0,
    explanation: '98 · 4 = 49 · 8 = 392, 213 · 4 = 142 · 6 = 852, 114 · 3 = 57 · 6 = 342. Csak a 123 · 3 = 369 marad pár nélkül.'
  },
  {
    id: 'md1000-q23',
    level: 3,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMult a="148" m="6" />,
    question: 'Számold ki írásban: 148 · 6 = ?',
    options: ['888', '648', '868', '828'],
    correctAnswer: 0,
    explanation: '6 · 8 = 48 → 8, maradt 4. 6 · 4 = 24, meg 4, az 28 → 8, maradt 2. 6 · 1 = 6, meg 2, az 8. A szorzat: 888.'
  },
  {
    id: 'md1000-q24',
    level: 3,
    questionTypeBadge: 'Osztás kerek számokkal',
    figure: <QTable head={['1. kocsi', '2. kocsi', '3. kocsi']} rows={[['180 : 9', '490 : 70', '720 : 80'], ['?', '?', '?']]} />,
    question: 'A kisvasút három kocsiján ezek az osztások állnak: 180 : 9, 490 : 70, 720 : 80. A hányadosok összege megmutatja, hányan ülnek a három kocsiban. Hányan ülnek bennük?',
    options: ['36', '34', '46', '26'],
    correctAnswer: 0,
    explanation: '180 : 9 = 20, 490 : 70 = 7, 720 : 80 = 9. Összesen 20 + 7 + 9 = 36 utas.'
  },
  {
    id: 'md1000-q25',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: (
      <QCoins
        coins={[
          { v: 50, n: 9, name: 'kerecsensólyom' },
          { v: 5, n: 7, name: 'nagy kócsag' },
          { v: 20, n: 6, name: 'nőszirom' }
        ]}
      />
    ),
    question: 'A zsebedben 9 darab 50 Ft-os, 7 darab 5 Ft-os és 6 darab 20 Ft-os érme van. Mennyi pénzed van?',
    options: ['605 Ft', '615 Ft', '585 Ft', '22 Ft'],
    correctAnswer: 0,
    explanation: '9 · 50 = 450, 7 · 5 = 35, 6 · 20 = 120. Összesen 450 + 35 + 120 = 605 Ft.'
  },
  {
    id: 'md1000-q26',
    level: 3,
    questionTypeBadge: 'Biztos vagy lehetetlen?',
    question: 'Csenge kivett a pénztárcájából 3 egyforma magyar pénzérmét (5, 10, 20, 50, 100 vagy 200 Ft-osat). Mit gondolsz: értékük együtt több, mint 600 Ft?',
    options: ['Lehetetlen', 'Biztos', 'Lehet, de nem biztos', 'Csak ha 100 Ft-osak'],
    correctAnswer: 0,
    explanation: 'A legnagyobb érme a 200 Ft-os. 3 · 200 = 600, ez sem több 600-nál. Ezért lehetetlen.'
  },
  {
    id: 'md1000-q27',
    level: 3,
    questionTypeBadge: 'Hiányzó osztandó',
    question: 'Melyik számot osztottuk el 8-cal, ha a hányados 6 és a maradék 5? □ : 8 = 6, maradék 5',
    options: ['53', '48', '43', '19'],
    correctAnswer: 0,
    explanation: 'Visszafelé számolunk: 6 · 8 = 48, és még hozzáadjuk a maradékot: 48 + 5 = 53.'
  },
  {
    id: 'md1000-q28',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik szorzat a legnagyobb?',
    options: ['78 · 6', '9 · 48', '7 · 62', '8 · 56'],
    correctAnswer: 0,
    explanation: '78 · 6 = 468, 9 · 48 = 432, 7 · 62 = 434, 8 · 56 = 448. A legnagyobb a 468.'
  },
  {
    id: 'md1000-q29',
    level: 3,
    questionTypeBadge: 'Maradék',
    question: 'Ha 4-gyel osztunk, melyik a legnagyobb maradék, ami előfordulhat?',
    options: ['3', '4', '2', '5'],
    correctAnswer: 0,
    explanation: 'A maradék kisebb, mint az osztó. 4-gyel osztva a maradék 0, 1, 2 vagy 3 lehet, a legnagyobb a 3.'
  },
  {
    id: 'md1000-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Szilvásváradon 20 pisztrángot fogtak ki. Mindegyik legalább 25 dkg-os volt. Legalább mennyi volt a halak együttes tömege?',
    options: ['500 dkg', '45 dkg', '250 dkg', '5000 dkg'],
    correctAnswer: 0,
    explanation: '20 · 25 = 2 · 25 tízes = 50 tízes = 500. Legalább 500 dkg (ez 5 kg).'
  }
];

export const MulDiv1000Quiz: React.FC<{
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
      topicId="g4-count-szorzas-1000-quiz"
      subtopicId="szorzas-osztas-1000-ig"
      title="3. Szorzás és osztás 1000-ig – Kvíz"
      subtitle="30 feladat 3 szinten: szorzótábla, maradékos osztás, kerek számok, írásbeli szorzás."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      questions={MULDIV_1000_QUESTIONS}
      cheatSheets={[
        {
          title: 'Szorzótábla és osztás',
          items: [
            'szorzandó · szorzó = szorzat (a két tényező)',
            '6 · □ = 30 → □ = 30 : 6 = 5',
            'Osztás ellenőrzése szorzással: 40 : 8 = 5, mert 5 · 8 = 40.',
            'Maradékos osztás: 13 : 3 = 4, maradék 1 (4 · 3 + 1 = 13)'
          ]
        },
        {
          title: 'Kerek számok',
          items: [
            '4 · 60 = 240, mert 4 · 6 = 24',
            '9 · 90 = 81 tízes = 810',
            '640 : 80 = 8, mert 64 : 8 = 8',
            '1000 : 50 = 20, mert 50 · 20 = 1000'
          ]
        },
        {
          title: 'Írásbeli szorzás',
          items: [
            'Becsülj tízesre kerekítve: 214 ≈ 210, 210 · 3 = 630',
            'Az egyesekkel kezdj: 3 · 4 = 12 → 2, maradt 1',
            'A maradékot add hozzá a következő szorzathoz!',
            'Ellenőrzés összeadással: 214 + 214 + 214 = 642'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MulDiv1000Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MulDiv1000Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MulDiv1000Quiz;
