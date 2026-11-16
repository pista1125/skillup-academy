import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenMulOneDigitMatcher } from './WrittenMulOneDigitMatcher';
import { WrittenMulOneDigitSorter } from './WrittenMulOneDigitSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';
const COLS = ['#16a34a', '#dc2626', '#0ea5e9', '#eab308'];
const HEADS = ['E', 'sz', 't', 'e'];

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Írásbeli szorzás: szorzandó · szorzó, alatta a szorzat. „????” = egyetlen piros „?”. */
const QMul: React.FC<{ a: string; m: string; result: string; note?: string }> = ({ a, m, result, note }) => {
  const xs = [70, 100, 130, 160];
  const h = note ? 140 : 120;
  const cells = (row: string, y: number, key: string, color: string) =>
    row
      .padStart(4, ' ')
      .split('')
      .map((d, i) => (
        <text key={`${key}${i}`} x={xs[i]} y={y} textAnchor="middle" fontSize="19" fontWeight="bold" fill={d === '?' ? C_UNK : color}>
          {d.trim()}
        </text>
      ));
  return (
    <QFig h={h}>
      {HEADS.map((hd, i) => (
        <g key={hd}>
          <rect x={xs[i] - 13} y="12" width="26" height="16" fill={COLS[i]} />
          <text x={xs[i]} y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">{hd}</text>
          <rect x={xs[i] - 13} y="28" width="26" height="76" fill={COLS[i]} opacity="0.12" />
        </g>
      ))}
      {cells(a, 55, 'a', '#0f172a')}
      <text x="198" y="55" textAnchor="middle" fontSize="19" fontWeight="bold" fill={m === '?' ? C_UNK : '#7c3aed'}>· {m}</text>
      <line x1="50" y1="68" x2="220" y2="68" stroke="#0f172a" strokeWidth="2" />
      {result === '????' ? (
        <text x="115" y="96" textAnchor="middle" fontSize="20" fontWeight="bold" fill={C_UNK}>?</text>
      ) : (
        cells(result, 96, 'r', '#1d4ed8')
      )}
      {note && (
        <text x="120" y="126" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">{note}</text>
      )}
    </QFig>
  );
};

/** Egyszerű adat-táblázat. */
const QTable: React.FC<{ title: string; rows: { k: string; v: string }[] }> = ({ title, rows }) => (
  <QFig h={38 + rows.length * 22}>
    <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">{title}</text>
    {rows.map((r, i) => (
      <g key={r.k}>
        <rect x="16" y={30 + i * 22} width="208" height="20" rx="4" fill={i % 2 ? '#fff7ed' : '#ffedd5'} />
        <text x="24" y={44 + i * 22} fontSize="11" fontWeight="bold" fill="#334155">{r.k}</text>
        <text x="216" y={44 + i * 22} textAnchor="end" fontSize="12" fontWeight="bold" fill={r.v.includes('?') ? C_UNK : '#9a3412'}>{r.v}</text>
      </g>
    ))}
  </QFig>
);

/** Ismétlődő csoportok: n doboz, mindegyikben ugyanannyi. */
const QGroups: React.FC<{ count: number; each: string; label: string; unit: string }> = ({ count, each, label, unit }) => {
  // 5-nél több csoportnál 4 doboz + „…”, hogy az ábra ne mutasson kevesebb csoportot a szövegnél
  const shown = count > 5 ? 4 : count;
  return (
    <QFig h={120}>
      {Array.from({ length: shown }).map((_, i) => (
        <g key={i}>
          <rect x={14 + i * 44} y="20" width="38" height="44" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
          <text x={33 + i * 44} y="47" textAnchor="middle" fontSize={each.length >= 6 ? 8.5 : 10} fontWeight="bold" fill="#1e3a8a">{each}</text>
        </g>
      ))}
      {count > 5 && (
        <text x={33 + 4 * 44} y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a8a">…</text>
      )}
      <text x="120" y="86" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{label}</text>
      <text x="120" y="106" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>Összesen: ? {unit}</text>
    </QFig>
  );
};

/** Számegyenes-szakasz két határral, a „?” közöttük. */
const QBetween: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={100}>
    <line x1="20" y1="55" x2="220" y2="55" stroke="#0f172a" strokeWidth="2" />
    <circle cx="50" cy="55" r="5" fill="#fff" stroke="#0f172a" strokeWidth="2" />
    <circle cx="190" cy="55" r="5" fill="#fff" stroke="#0f172a" strokeWidth="2" />
    <text x="50" y="82" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{left}</text>
    <text x="190" y="82" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{right}</text>
    <text x="120" y="45" textAnchor="middle" fontSize="18" fontWeight="bold" fill={C_UNK}>?</text>
    <line x1="58" y1="55" x2="182" y2="55" stroke="#7c3aed" strokeWidth="5" opacity="0.4" />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const WRITTEN_MUL1_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'wm1-q1',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="1623" m="2" result="????" />,
    question: 'Egy óceánjárón 1623 kétszemélyes kabin van. Legfeljebb hány személy lakhat bennük?',
    options: ['3246', '2246', '3236', '3446'],
    correctAnswer: 0,
    explanation: '1623 · 2: egyesek 2 · 3 = 6, tízesek 2 · 2 = 4, százasok 2 · 6 = 12 → leírom a 2-t, maradt 1, ezresek 2 · 1 = 2, és még 1: 3. Összesen 3246 személy.'
  },
  {
    id: 'wm1-q2',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg a szorzatot a szorzandó százasra kerekítésével: 1623 · 2 ≈ ?',
    options: ['3200', '3000', '3400', '4000'],
    correctAnswer: 0,
    explanation: '1623 ≈ 1600, és 1600 · 2 = 3200. (Ezresre kerekítve 2000 · 2 = 4000 lenne, de most százasra kerekítünk.)'
  },
  {
    id: 'wm1-q3',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="2324" m="3" result="????" />,
    question: 'Mennyi 2324 · 3?',
    options: ['6972', '6962', '6872', '6982'],
    correctAnswer: 0,
    explanation: 'Egyesek: 3 · 4 = 12, leírom a 2-t, maradt 1. Tízesek: 3 · 2 = 6, és még 1: 7. Százasok: 3 · 3 = 9. Ezresek: 3 · 2 = 6. A szorzat 6972.'
  },
  {
    id: 'wm1-q4',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="1114" m="5" result="????" />,
    question: 'Mennyi 1114 · 5?',
    options: ['5570', '5550', '5070', '5670'],
    correctAnswer: 0,
    explanation: 'Egyesek: 5 · 4 = 20, leírom a 0-t, maradt 2. Tízesek: 5 · 1 = 5, és még 2: 7. Százasok: 5 · 1 = 5. Ezresek: 5 · 1 = 5. A szorzat 5570.'
  },
  {
    id: 'wm1-q5',
    level: 1,
    questionTypeBadge: 'Műveleti nevek',
    question: 'Az 1623 · 2 = 3246 szorzásban mi a neve a 3246-nak?',
    options: ['szorzat', 'szorzandó', 'szorzó', 'összeg'],
    correctAnswer: 0,
    explanation: 'szorzandó · szorzó = szorzat. Az 1623 a szorzandó, a 2 a szorzó, a 3246 a szorzat.'
  },
  {
    id: 'wm1-q6',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Hogyan ellenőrizheted összeadással, hogy 1623 · 2 = 3246?',
    options: ['1623 + 1623 = 3246', '1623 + 2 = 3246', '3246 + 2 = 1623', '1623 + 3246 = 2'],
    correctAnswer: 0,
    explanation: 'Kétszer 1623 ugyanannyi, mint 1623 + 1623. Ha ez is 3246, jól szoroztál.'
  },
  {
    id: 'wm1-q7',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="1216" m="4" result="????" />,
    question: 'Mennyi 1216 · 4?',
    options: ['4864', '4844', '4764', '4874'],
    correctAnswer: 0,
    explanation: 'Egyesek: 4 · 6 = 24, leírom a 4-et, maradt 2. Tízesek: 4 · 1 = 4, és még 2: 6. Százasok: 4 · 2 = 8. Ezresek: 4 · 1 = 4. A szorzat 4864.'
  },
  {
    id: 'wm1-q8',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="1041" m="8" result="????" />,
    question: 'Mennyi 1041 · 8?',
    options: ['8328', '8028', '8228', '8320'],
    correctAnswer: 0,
    explanation: 'Egyesek: 8 · 1 = 8. Tízesek: 8 · 4 = 32, leírom a 2-t, maradt 3. Százasok: 8 · 0 = 0, és még 3: 3. Ezresek: 8 · 1 = 8. A szorzat 8328.'
  },
  {
    id: 'wm1-q9',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A Nemzeti Múzeumban pénteken 1244 jegy kelt el, szombaton háromszor annyi. Hány jegyet adtak el szombaton?',
    options: ['3732', '3622', '3722', '1247'],
    correctAnswer: 0,
    explanation: '„Háromszor annyi” → szorzunk 3-mal: 1244 · 3. Egyesek: 12, leírom a 2-t, maradt 1. Tízesek: 3 · 4 = 12, és még 1: 13, leírom a 3-at, maradt 1. Százasok: 6 + 1 = 7. Ezresek: 3. Szombaton 3732 jegy kelt el.'
  },
  {
    id: 'wm1-q10',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QGroups count={9} each="112 fő" label="9 hajóút, mindegyiken 112 turista" unit="fő" />,
    question: 'Egy dunai hajó 112 turistát szállíthat. Októberben 9-szer tette meg az utat. Legfeljebb hány utast szállított?',
    options: ['1008', '998', '1018', '121'],
    correctAnswer: 0,
    explanation: '112 · 9: egyesek 9 · 2 = 18, leírom a 8-at, maradt 1. Tízesek: 9 · 1 = 9, és még 1: 10, leírom a 0-t, maradt 1. Százasok: 9 · 1 = 9, és még 1: 10. Legfeljebb 1008 utast.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'wm1-q11',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="2549" m="3" result="????" />,
    question: 'Mennyi 2549 · 3?',
    options: ['7647', '6527', '7547', '7657'],
    correctAnswer: 0,
    explanation: 'Egyesek: 27 → 7, maradt 2. Tízesek: 12 + 2 = 14 → 4, maradt 1. Százasok: 15 + 1 = 16 → 6, maradt 1. Ezresek: 6 + 1 = 7. A szorzat 7647. A 6527-ben elfelejtették a maradékokat.'
  },
  {
    id: 'wm1-q12',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="956" m="9" result="????" />,
    question: 'Mennyi 956 · 9?',
    options: ['8604', '8504', '8614', '8104'],
    correctAnswer: 0,
    explanation: 'Egyesek: 9 · 6 = 54 → 4, maradt 5. Tízesek: 9 · 5 = 45, és még 5: 50 → 0, maradt 5. Százasok: 9 · 9 = 81, és még 5: 86. A szorzat 8604.'
  },
  {
    id: 'wm1-q13',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="1356" m="6" result="????" />,
    question: 'Mennyi 1356 · 6?',
    options: ['8136', '6806', '8036', '8146'],
    correctAnswer: 0,
    explanation: 'Egyesek: 36 → 6, maradt 3. Tízesek: 30 + 3 = 33 → 3, maradt 3. Százasok: 18 + 3 = 21 → 1, maradt 2. Ezresek: 6 + 2 = 8. A szorzat 8136.'
  },
  {
    id: 'wm1-q14',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg a szorzandó százasra kerekítésével: 1174 · 4 ≈ ?',
    options: ['4800', '4400', '5000', '4696'],
    correctAnswer: 0,
    explanation: '1174 ≈ 1200 (a 74 felfelé kerekedik). 1200 · 4 = 4800. A 4696 a pontos szorzat, nem a becslés.'
  },
  {
    id: 'wm1-q15',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: (
      <QTable
        title="Cukrászműhely – háromszor annyi"
        rows={[
          { k: 'Rákóczi-túrós', v: '1458 db' },
          { k: 'Rigójancsi (3-szor annyi)', v: '? db' }
        ]}
      />
    ),
    question: 'Háromszor annyi rigójancsit sütnek, mint Rákóczi-túróst. Rákóczi-túrósból 1458 készül. Hány rigójancsi?',
    options: ['4374', '3254', '4364', '1461'],
    correctAnswer: 0,
    explanation: '1458 · 3: egyesek 24 → 4, maradt 2. Tízesek: 15 + 2 = 17 → 7, maradt 1. Százasok: 12 + 1 = 13 → 3, maradt 1. Ezresek: 3 + 1 = 4. 4374 rigójancsi.'
  },
  {
    id: 'wm1-q16',
    level: 2,
    questionTypeBadge: 'Láncszámolás',
    question: 'Végezd el a láncszámolást! 372 · 4 · 3 · 2 = ?',
    options: ['8928', '4464', '2976', '8828'],
    correctAnswer: 0,
    explanation: '372 · 4 = 1488, 1488 · 3 = 4464, 4464 · 2 = 8928. A 4464-nél még nem vagy kész!'
  },
  {
    id: 'wm1-q17',
    level: 2,
    questionTypeBadge: 'Hiányzó szorzó',
    figure: <QMul a="965" m="?" result="5790" />,
    question: 'Keresd meg a szorzót! 965 · □ = 5790',
    options: ['6', '5', '7', '8'],
    correctAnswer: 0,
    explanation: 'Az egyeseknél □ · 5-nek 0-ra kell végződnie, és a becslés: 1000 · 6 = 6000 közel van. Próba: 965 · 6 = 5790. ✔'
  },
  {
    id: 'wm1-q18',
    level: 2,
    questionTypeBadge: 'Hiányzó szorzandó',
    figure: <QMul a="????" m="6" result="4134" />,
    question: 'Pótold a szorzandót! □ · 6 = 4134',
    options: ['689', '679', '699', '698'],
    correctAnswer: 0,
    explanation: 'A szorzandót osztással kapjuk: 4134 : 6 = 689. Ellenőrzés: 689 · 6 = 4134.'
  },
  {
    id: 'wm1-q19',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A Nemzeti Színház nézőterére 619 néző fér. Novemberben 9-szer játszották az előadást telt házzal. Hány jegyet adtak el?',
    options: ['5571', '5471', '5561', '628'],
    correctAnswer: 0,
    explanation: '619 · 9: egyesek 81 → 1, maradt 8. Tízesek: 9 + 8 = 17 → 7, maradt 1. Százasok: 54 + 1 = 55. Összesen 5571 jegy.'
  },
  {
    id: 'wm1-q20',
    level: 2,
    questionTypeBadge: 'Számszomszédok',
    question: 'Mikor nyílt meg a Nyugati pályaudvar? A 268 és a 7 szorzatának nagyobb egyes szomszédja.',
    options: ['1877', '1876', '1875', '1867'],
    correctAnswer: 0,
    explanation: '268 · 7 = 1876. Ennek nagyobb egyes szomszédja: 1877. A pályaudvar 1877-ben nyílt meg.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'wm1-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QTable
        title="Budavári Sikló – egy útra"
        rows={[
          { k: 'Felnőtt menetjegy', v: '1200 Ft' },
          { k: 'Gyermekjegy (3–14 év)', v: '700 Ft' },
          { k: '3 év alatt', v: 'ingyenes' }
        ]}
      />
    ),
    question: '4 felnőtt, 2 tízéves és 3 kétéves gyerek utazik felfelé a Siklóval. Mennyit fizetnek összesen?',
    options: ['6200 Ft', '8300 Ft', '4800 Ft', '6300 Ft'],
    correctAnswer: 0,
    explanation: 'Felnőttek: 1200 · 4 = 4800 Ft. Tízévesek: 700 · 2 = 1400 Ft. A kétévesek ingyen utaznak. 4800 + 1400 = 6200 Ft.'
  },
  {
    id: 'wm1-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QTable
        title="Budavári Sikló – retúr"
        rows={[
          { k: 'Felnőtt retúrjegy', v: '1800 Ft' },
          { k: 'Gyermekretúrjegy', v: '1100 Ft' },
          { k: 'Egy útra összesen volt', v: '6200 Ft' }
        ]}
      />
    ),
    question: 'Ugyanez a család (4 felnőtt, 2 tízéves, 3 kétéves) retúrjegyet vesz. Mennyivel fizetnek többet, mint egy útra?',
    options: ['3200 Ft', '9400 Ft', '3100 Ft', '2800 Ft'],
    correctAnswer: 0,
    explanation: 'Retúr: 1800 · 4 + 1100 · 2 = 7200 + 2200 = 9400 Ft. Különbség: 9400 − 6200 = 3200 Ft-tal többet.'
  },
  {
    id: 'wm1-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Az Eiffel-toronyba a nap első felében 4718-an váltottak jegyet, a második felében kétszer ennyien. Hányan a második felében?',
    options: ['9436', '8426', '14 154', '9446'],
    correctAnswer: 0,
    explanation: '4718 · 2: egyesek 16 → 6, maradt 1. Tízesek: 2 + 1 = 3. Százasok: 14 → 4, maradt 1. Ezresek: 8 + 1 = 9. A második felében 9436-an. (A 14 154 az egész napra jutna.)'
  },
  {
    id: 'wm1-q24',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: (
      <QTable
        title="Távolság Budapesttől"
        rows={[
          { k: 'Madrid', v: '2522 km' },
          { k: 'Róma', v: '1217 km' },
          { k: 'Moszkva', v: '1824 km' },
          { k: 'Berlin', v: '874 km' }
        ]}
      />
    ),
    question: 'Gábor bácsi Madridba és Berlinbe is elutazott, oda-vissza. Mennyivel hosszabb a madridi oda-vissza út a berlininél?',
    options: ['3296 km', '1648 km', '3396 km', '6792 km'],
    correctAnswer: 0,
    explanation: 'Madrid oda-vissza: 2522 · 2 = 5044 km. Berlin oda-vissza: 874 · 2 = 1748 km. Különbség: 5044 − 1748 = 3296 km.'
  },
  {
    id: 'wm1-q25',
    level: 3,
    questionTypeBadge: 'Gondolkodtató',
    question: 'Gábor bácsi oda-vissza útja az 5000 km felénél 66 km-rel kevesebb. Melyik városba utazik? (Róma 1217 km, Moszkva 1824 km, Berlin 874 km, Madrid 2522 km)',
    options: ['Rómába', 'Moszkvába', 'Berlinbe', 'Madridba'],
    correctAnswer: 0,
    explanation: '5000 fele 2500, 66-tal kevesebb: 2434 km. Ez az oda-vissza út, tehát egy út 2434 : 2 = 1217 km. Ez Róma! (1217 · 2 = 2434)'
  },
  {
    id: 'wm1-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QGroups count={8} each="945 km" label="8 óra repülés, óránként 945 km" unit="km" />,
    question: 'Egy repülőgép óránként 945 km-t tesz meg. Mekkora utat tesz meg 8 óra alatt?',
    options: ['7560 km', '7520 km', '7460 km', '953 km'],
    correctAnswer: 0,
    explanation: '945 · 8: egyesek 40 → 0, maradt 4. Tízesek: 32 + 4 = 36 → 6, maradt 3. Százasok: 72 + 3 = 75. 7560 km.'
  },
  {
    id: 'wm1-q27',
    level: 3,
    questionTypeBadge: 'Mértékegység',
    question: 'Egy étterembe havonta háromszor szállítanak, alkalmanként 1250 kg alapanyagot. Mennyi árut kapnak egy hónapban?',
    options: ['3750 kg', '3650 kg', '1253 kg', '3760 kg'],
    correctAnswer: 0,
    explanation: '1250 · 3: egyesek 0. Tízesek: 15 → 5, maradt 1. Százasok: 6 + 1 = 7. Ezresek: 3. Összesen 3750 kg.'
  },
  {
    id: 'wm1-q28',
    level: 3,
    questionTypeBadge: 'Mértékegység',
    figure: (
      <QTable
        title="Egy lépés hossza"
        rows={[
          { k: 'Bence', v: '670 mm' },
          { k: 'Balázs', v: '810 mm' },
          { k: '5 lépéssel: Balázs − Bence', v: '? mm' }
        ]}
      />
    ),
    question: 'Bence lépése 670 mm, Balázsé 810 mm. Mennyivel jut messzebb Balázs 5 lépéssel, mint Bence?',
    options: ['700 mm', '140 mm', '600 mm', '7000 mm'],
    correctAnswer: 0,
    explanation: 'Balázs: 810 · 5 = 4050 mm. Bence: 670 · 5 = 3350 mm. Különbség: 4050 − 3350 = 700 mm. (Egy lépésnél csak 140 mm a különbség, 5 lépésnél ötször annyi.)'
  },
  {
    id: 'wm1-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy óceánjárón az utasok fele, vagyis 1641 ember az első emeleten lakik. Hány utas van összesen a hajón?',
    options: ['3282', '2282', '820', '3292'],
    correctAnswer: 0,
    explanation: 'Ha 1641 a fele, akkor az egész kétszer ennyi: 1641 · 2 = 3282 utas. (A 820 a 1641 fele lenne – az rossz irány!)'
  },
  {
    id: 'wm1-q30',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: <QBetween left="654 · 7" right="663 · 7" />,
    question: 'Melyik szám teszi igazzá? 663 · 7 > □ > 654 · 7',
    options: ['4600', '4578', '4641', '4700'],
    correctAnswer: 0,
    explanation: '663 · 7 = 4641 és 654 · 7 = 4578. A □ ezek között van: 4578 < □ < 4641. A 4600 jó. A 4578 és a 4641 nem, mert a jel „nagyobb”, nem „nagyobb vagy egyenlő”.'
  }
];

export const WrittenMulOneDigitQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId="g4-wops-szorzas-egyjegyu-quiz"
      subtopicId="irasbeli-szorzas-egyjegyu-szammal"
      title="2. Írásbeli szorzás egyjegyű számmal – Kvíz"
      subtitle="30 feladat 3 szinten: becslés, írásbeli szorzás maradékkal, hiányzó tényezők, szöveges feladatok."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • KVÍZ"
      questions={WRITTEN_MUL1_QUESTIONS}
      cheatSheets={[
        {
          title: 'Írásbeli szorzás lépései',
          items: [
            'Kezdd az egyesekkel: 2 · 3 e = 6 e',
            'Ha 10 vagy több: 2 · 6 sz = 12 sz → leírom a 2-t, maradt 1',
            'Előbb szorozz, utána add hozzá a maradékot: 2 · 1 + 1 = 3',
            'Az utolsó helyen az egész számot leírod (pl. 86).'
          ]
        },
        {
          title: 'Becslés és ellenőrzés',
          items: [
            'Becslés: a szorzandót kerekítsd százasra! 1623 ≈ 1600, 1600 · 2 = 3200',
            'Ellenőrzés összeadással: 1623 · 2 = 1623 + 1623',
            'Hiányzó szorzandó: osztással! □ · 6 = 4134 → 4134 : 6',
            'szorzandó · szorzó = szorzat'
          ]
        },
        {
          title: 'Szöveges feladatok',
          items: [
            '„Háromszor annyi” → · 3',
            '„Oda-vissza” → · 2',
            'Ha 1641 a fele, az egész 1641 · 2',
            'Több rész esetén: szorozz, aztán add össze (1200 · 4 + 700 · 2)'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WrittenMulOneDigitMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <WrittenMulOneDigitSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default WrittenMulOneDigitQuiz;
