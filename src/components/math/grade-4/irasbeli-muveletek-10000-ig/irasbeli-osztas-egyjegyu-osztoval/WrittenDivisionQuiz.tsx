import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenDivisionMatcher } from './WrittenDivisionMatcher';
import { WrittenDivisionSorter } from './WrittenDivisionSorter';

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

/** Osztás helyiérték-oszlopokkal: „osztandó : osztó = ?”. Opcionálisan becslő pontok. */
const QDiv: React.FC<{ a: string; d: string; q?: string; note?: string }> = ({ a, d, q = '?', note }) => {
  const n = a.length;
  const heads = HEADS.slice(4 - n);
  const cols = COLS.slice(4 - n);
  const xs = Array.from({ length: n }).map((_, i) => 40 + i * 28);
  const h = note ? 110 : 90;
  const after = xs[n - 1] + 20;
  return (
    <QFig h={h}>
      {heads.map((hd, i) => (
        <g key={hd}>
          <rect x={xs[i] - 12} y="14" width="24" height="16" fill={cols[i]} />
          <text x={xs[i]} y="26" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">{hd}</text>
          <rect x={xs[i] - 12} y="30" width="24" height="40" fill={cols[i]} opacity="0.12" />
        </g>
      ))}
      {a.split('').map((ch, i) => (
        <text key={i} x={xs[i]} y="58" textAnchor="middle" fontSize="20" fontWeight="bold" fill={ch === '?' ? C_UNK : '#0f172a'}>{ch}</text>
      ))}
      <text x={after} y="58" fontSize="20" fontWeight="bold" fill="#0f172a">
        : <tspan fill={d === '?' ? C_UNK : '#0f172a'}>{d}</tspan> = <tspan fill={q.includes('?') ? C_UNK : '#7c3aed'}>{q}</tspan>
      </text>
      {note && (
        <text x="120" y="96" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">{note}</text>
      )}
    </QFig>
  );
};

/** Bontás dobozokban: 2820 : 2 = 2000 : 2 + 800 : 2 + 20 : 2. */
const QSplit: React.FC<{ parts: string[]; total: string }> = ({ parts, total }) => (
  <QFig h={110}>
    <text x="120" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">{total} = ?</text>
    {parts.map((p, i) => (
      <g key={p}>
        <rect x={12 + i * 76} y="40" width="66" height="28" rx="6" fill="#fff" stroke={COLS[i]} strokeWidth="2" />
        <text x={45 + i * 76} y="59" textAnchor="middle" fontSize="12" fontWeight="bold" fill={COLS[i]}>{p}</text>
        <text x={45 + i * 76} y="94" textAnchor="middle" fontSize="16" fontWeight="bold" fill={C_UNK}>?</text>
        {i < parts.length - 1 && <text x={83 + i * 76} y="94" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">+</text>}
      </g>
    ))}
  </QFig>
);

/** Szakasz egyenlő részekre osztva, az egyik rész „?”. */
const QParts: React.FC<{ total: string; parts: number; unit: string; label?: string; shade?: number }> = ({ total, parts, unit, label, shade }) => {
  const restQ = shade !== undefined;
  const w = 208 / parts;
  return (
    <QFig h={110}>
      <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">{total} {unit}</text>
      <line x1="16" y1="32" x2="224" y2="32" stroke="#334155" strokeWidth="1.5" />
      {Array.from({ length: parts }).map((_, i) => (
        <g key={i}>
          <rect x={16 + i * w} y="40" width={w} height="30" fill={shade !== undefined && i < shade ? '#a7f3d0' : '#e0e7ff'} stroke="#4338ca" />
          {!restQ && i === 0 && <text x={16 + w / 2} y="61" textAnchor="middle" fontSize="15" fontWeight="bold" fill={C_UNK}>?</text>}
        </g>
      ))}
      {restQ && (
        <text x={16 + (shade as number) * w + ((parts - (shade as number)) * w) / 2} y="61" textAnchor="middle" fontSize="15" fontWeight="bold" fill={C_UNK}>
          ?
        </text>
      )}
      {label && <text x="120" y="94" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{label}</text>}
    </QFig>
  );
};

/** Árcédulák. */
const QPrices: React.FC<{ items: { n: string; p: string }[]; note: string }> = ({ items, note }) => {
  const w = 216 / items.length;
  return (
    <QFig h={110}>
      {items.map((it, i) => (
        <g key={it.n}>
          <rect x={12 + i * w} y="14" width={w - 6} height="58" rx="7" fill="#fff" stroke="#c026d3" strokeWidth="1.5" />
          <text x={12 + i * w + (w - 6) / 2} y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">{it.n}</text>
          <text x={12 + i * w + (w - 6) / 2} y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#86198f">{it.p}</text>
        </g>
      ))}
      <text x="120" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{note}</text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const WRITTEN_DIV_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'wd-q1',
    level: 1,
    questionTypeBadge: 'Osztás bontással',
    figure: <QParts total="2840" parts={2} unit="Ft" label="2 nap, mindkét napra ugyanannyi" />,
    question: 'Mona 2840 Ft zsebpénzt visz a 2 napos kirándulásra. A felét költi el az első napon. Mennyi az?',
    options: ['1420 Ft', '1402 Ft', '1240 Ft', '5680 Ft'],
    correctAnswer: 0,
    explanation: '2840 : 2 = 2000 : 2 + 800 : 2 + 40 : 2 = 1000 + 400 + 20 = 1420 Ft.'
  },
  {
    id: 'wd-q2',
    level: 1,
    questionTypeBadge: 'Osztás bontással',
    figure: <QSplit parts={['2000 : 2', '800 : 2', '20 : 2']} total="2820 : 2" />,
    question: 'Számold ki bontással! 2820 : 2 = ?',
    options: ['1410', '1401', '1041', '1420'],
    correctAnswer: 0,
    explanation: '2000 : 2 = 1000, 800 : 2 = 400, 20 : 2 = 10. Összesen 1000 + 400 + 10 = 1410.'
  },
  {
    id: 'wd-q3',
    level: 1,
    questionTypeBadge: 'Írásbeli osztás',
    figure: <QDiv a="3693" d="3" />,
    question: 'Egy versenyre 3693 tanuló jelentkezett, harmaduk külföldön él. Hányan élnek külföldön?',
    options: ['1231', '1321', '123', '1213'],
    correctAnswer: 0,
    explanation: '3 E : 3 = 1 E, 6 sz : 3 = 2 sz, 9 t : 3 = 3 t, 3 e : 3 = 1 e. A hányados 1231. Ellenőrzés: 1231 · 3 = 3693.'
  },
  {
    id: 'wd-q4',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <QDiv a="3693" d="3" q=". . . ." note="Hány jegyű lesz a hányados?" />,
    question: 'Becsülj! Melyik igaz a 3693 : 3 hányadosára?',
    options: ['1000 < a hányados < 2000', '100 < a hányados < 200', '2000 < a hányados < 3000', '3000 < a hányados < 4000'],
    correctAnswer: 0,
    explanation: 'A 3 ezresben megvan a 3, ezért a hányados négyjegyű. 3000 : 3 = 1000 és 6000 : 3 = 2000, ezért 1000 és 2000 között lesz.'
  },
  {
    id: 'wd-q5',
    level: 1,
    questionTypeBadge: 'Írásbeli osztás',
    figure: <QDiv a="750" d="3" />,
    question: 'Három lány 750 Ft-ért vett gyöngyöt, és egyformán fizetnek. Mennyit ad egy lány?',
    options: ['250 Ft', '25 Ft', '205 Ft', '2250 Ft'],
    correctAnswer: 0,
    explanation: '7 sz : 3 = 2 sz, marad 1 sz. 1 sz + 5 t = 15 t, 15 t : 3 = 5 t. 0 e : 3 = 0 e. Mindenki 250 Ft-ot ad.'
  },
  {
    id: 'wd-q6',
    level: 1,
    questionTypeBadge: 'Műveleti nevek',
    question: 'A 3693 : 3 = 1231 osztásban mi a neve a 3-nak?',
    options: ['osztó', 'osztandó', 'hányados', 'maradék'],
    correctAnswer: 0,
    explanation: 'osztandó : osztó = hányados. A 3693 az osztandó, a 3 az osztó, az 1231 a hányados.'
  },
  {
    id: 'wd-q7',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Hogyan ellenőrizheted, hogy 3693 : 3 = 1231?',
    options: ['1231 · 3 = 3693', '1231 : 3 = 3693', '3693 · 3 = 1231', '1231 + 3 = 3693'],
    correctAnswer: 0,
    explanation: 'Az osztást szorzással ellenőrizzük: hányados · osztó = osztandó. 1231 · 3 = 3693 ✔'
  },
  {
    id: 'wd-q8',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QPrices items={[{ n: '4 bögre', p: '4800 Ft' }, { n: '1 bögre', p: '? Ft' }]} note="Mennyibe kerül 1 bögre?" />,
    question: '4 bögre 4800 Ft-ba kerül. Mennyibe kerül 1 bögre?',
    options: ['1200 Ft', '120 Ft', '1020 Ft', '19 200 Ft'],
    correctAnswer: 0,
    explanation: '4800 : 4: 4 E : 4 = 1 E, 8 sz : 4 = 2 sz, 0 t : 4 = 0 t, 0 e : 4 = 0 e. 1 bögre 1200 Ft.'
  },
  {
    id: 'wd-q9',
    level: 1,
    questionTypeBadge: 'Írásbeli osztás',
    figure: <QDiv a="848" d="2" />,
    question: 'Mennyi 848 : 2?',
    options: ['424', '442', '4024', '244'],
    correctAnswer: 0,
    explanation: '8 sz : 2 = 4 sz, 4 t : 2 = 2 t, 8 e : 2 = 4 e. A hányados 424.'
  },
  {
    id: 'wd-q10',
    level: 1,
    questionTypeBadge: 'Írásbeli osztás',
    figure: <QDiv a="9366" d="3" />,
    question: 'Mennyi 9366 : 3?',
    options: ['3122', '3212', '312', '3022'],
    correctAnswer: 0,
    explanation: '9 E : 3 = 3 E, 3 sz : 3 = 1 sz, 6 t : 3 = 2 t, 6 e : 3 = 2 e. A hányados 3122.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'wd-q11',
    level: 2,
    questionTypeBadge: 'Írásbeli osztás',
    figure: <QDiv a="2872" d="2" />,
    question: 'A tolltartó 2872 Ft, a temperafesték feleennyibe kerül. Mennyibe kerül a temperafesték?',
    options: ['1436 Ft', '1431 Ft', '1416 Ft', '1336 Ft'],
    correctAnswer: 0,
    explanation: '2 : 2 = 1, 8 : 2 = 4, 7 : 2 = 3, marad 1. A maradék mellé lehozzuk a 2-t: 12 : 2 = 6. 1436 Ft. Az 1431-ben elfelejtették a maradékot.'
  },
  {
    id: 'wd-q12',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QParts total="734" parts={2} unit="m (oda-vissza)" label="odaút + visszaút" />,
    question: 'A gyerekeknek a busztól a barlang bejáratáig oda-vissza 734 métert kellett gyalogolniuk. Milyen messze állt meg a busz?',
    options: ['367 m', '362 m', '377 m', '1468 m'],
    correctAnswer: 0,
    explanation: '734 : 2: 7 : 2 = 3, marad 1 → 13 : 2 = 6, marad 1 → 14 : 2 = 7. A busz 367 méterre állt meg. Ellenőrzés: 367 · 2 = 734.'
  },
  {
    id: 'wd-q13',
    level: 2,
    questionTypeBadge: 'Maradékos osztás',
    figure: <QParts total="224" parts={3} unit="cm szalag" label="3 egyforma darab – marad valami?" />,
    question: 'Egy 224 cm-es szalagot 3 egyenlő részre vágnak, egész centiméterekre. Milyen hosszú egy rész, és mennyi marad?',
    options: ['74 cm, marad 2 cm', '74 cm, marad 1 cm', '75 cm, nem marad semmi', '73 cm, marad 5 cm'],
    correctAnswer: 0,
    explanation: '22 : 3 = 7, marad 1. 14 : 3 = 4, marad 2. 224 : 3 = 74, marad 2. Ellenőrzés: 74 · 3 = 222, 222 + 2 = 224.'
  },
  {
    id: 'wd-q14',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Pistinek 5840 Ft-ja van, Lacinak ennek az ötöde. Mennyi pénze van Lacinak?',
    options: ['1168 Ft', '1186 Ft', '1068 Ft', '29 200 Ft'],
    correctAnswer: 0,
    explanation: '„Ötöde” → osztunk 5-tel: 5840 : 5. 5 : 5 = 1, 8 : 5 = 1, marad 3 → 34 : 5 = 6, marad 4 → 40 : 5 = 8. Lacinak 1168 Ft-ja van.'
  },
  {
    id: 'wd-q15',
    level: 2,
    questionTypeBadge: 'Nulla a hányadosban',
    figure: <QDiv a="3150" d="3" />,
    question: 'A felnőtt barlangi belépő 3150 Ft, a diákjegy ennek harmada. Mennyibe kerül a diákjegy?',
    options: ['1050 Ft', '105 Ft', '1005 Ft', '1500 Ft'],
    correctAnswer: 0,
    explanation: '3 : 3 = 1. 1 : 3 = 0, marad 1 – ide 0 kerül a hányadosba! 15 : 3 = 5. 0 : 3 = 0. A diákjegy 1050 Ft.'
  },
  {
    id: 'wd-q16',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A Baradlamanó túra 5 gyereknek összesen 8250 Ft-ba került. Mennyit fizetett 1 gyerek?',
    options: ['1650 Ft', '1605 Ft', '1550 Ft', '165 Ft'],
    correctAnswer: 0,
    explanation: '8 : 5 = 1, marad 3 → 32 : 5 = 6, marad 2 → 25 : 5 = 5 → 0 : 5 = 0. Egy gyerek 1650 Ft-ot fizetett.'
  },
  {
    id: 'wd-q17',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: <QDiv a="224" d="3" q=". . ?" note="Megvan-e a 3 a 2 százasban?" />,
    question: 'Hány jegyű lesz a 224 : 3 hányadosa?',
    options: ['kétjegyű', 'egyjegyű', 'háromjegyű', 'négyjegyű'],
    correctAnswer: 0,
    explanation: 'A 2 százasban nincs meg a 3, ezért a 22 tízessel kezdünk. Így csak tízesek és egyesek lesznek: kétjegyű a hányados (74).'
  },
  {
    id: 'wd-q18',
    level: 2,
    questionTypeBadge: 'Írásbeli osztás',
    question: 'Mennyi a hányados, ha az osztó 4, az osztandó 8456?',
    options: ['2114', '2141', '2104', '211'],
    correctAnswer: 0,
    explanation: '8 : 4 = 2, 4 : 4 = 1, 5 : 4 = 1, marad 1 → 16 : 4 = 4. A hányados 2114.'
  },
  {
    id: 'wd-q19',
    level: 2,
    questionTypeBadge: 'Hiányzó osztandó',
    figure: <QDiv a="????" d="5" q="1112" />,
    question: 'Mennyi az osztandó, ha az osztó 5, a hányados 1112?',
    options: ['5560', '1117', '5550', '5660'],
    correctAnswer: 0,
    explanation: 'Az osztandót szorzással kapjuk: hányados · osztó = 1112 · 5 = 5560.'
  },
  {
    id: 'wd-q20',
    level: 2,
    questionTypeBadge: 'Maradékos osztás',
    figure: <QDiv a="7319" d="4" />,
    question: 'Mennyi 7319 : 4?',
    options: ['1829, marad 3', '1829, marad 1', '1830', '1827, marad 11'],
    correctAnswer: 0,
    explanation: '7 : 4 = 1, marad 3 → 33 : 4 = 8, marad 1 → 11 : 4 = 2, marad 3 → 39 : 4 = 9, marad 3. Ellenőrzés: 1829 · 4 = 7316, 7316 + 3 = 7319.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'wd-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QPrices items={[{ n: 'fizettem', p: '5000 Ft' }, { n: 'visszakaptam', p: '400 Ft' }, { n: '1 kitűző', p: '? Ft' }]} note="4 egyforma kitűzőt vettem." />,
    question: '4 egyforma kitűzőt vettem. 5000 Ft-tal fizettem, és 400 Ft-ot kaptam vissza. Mennyibe került egy kitűző?',
    options: ['1150 Ft', '1250 Ft', '1100 Ft', '4600 Ft'],
    correctAnswer: 0,
    explanation: 'A kitűzők ára: 5000 − 400 = 4600 Ft. Egy kitűző: 4600 : 4 = 1150 Ft. (Az 1250 Ft akkor lenne, ha elfelejtenéd levonni a visszajárót.)'
  },
  {
    id: 'wd-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Apa 10 000 Ft-ért vett 1 inget és 5 egyforma pólót. Az ing 4500 Ft volt. Mennyibe került egy póló?',
    options: ['1100 Ft', '5500 Ft', '2000 Ft', '1000 Ft'],
    correctAnswer: 0,
    explanation: 'Pólók összesen: 10 000 − 4500 = 5500 Ft. Egy póló: 5500 : 5 = 1100 Ft.'
  },
  {
    id: 'wd-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QParts total="7182" parts={3} unit="m – Béke-barlang" label="A zöld részt már megtették." shade={1} />,
    question: 'A Béke-barlang 7182 m hosszú. Egy csoport az út harmadáig jutott. Hány métert kell még megtenniük?',
    options: ['4788 m', '2394 m', '4778 m', '7179 m'],
    correctAnswer: 0,
    explanation: 'Az út harmada: 7182 : 3 = 2394 m. Még hátravan: 7182 − 2394 = 4788 m (ez a két harmad, 2394 · 2).'
  },
  {
    id: 'wd-q24',
    level: 3,
    questionTypeBadge: 'Nulla a hányadosban',
    figure: <QParts total="3030" parts={6} unit="m – Szabadság-barlang" label="A zöld részt már megtették." shade={1} />,
    question: 'A Szabadság-barlang 3030 m hosszú. Egy csoport az út hatodáig jutott. Hány métert kell még megtenniük?',
    options: ['2525 m', '505 m', '2535 m', '3024 m'],
    correctAnswer: 0,
    explanation: 'A hatoda: 3030 : 6 → 30 : 6 = 5, 3 : 6 = 0 (marad 3), 30 : 6 = 5 → 505 m. Még hátravan: 3030 − 505 = 2525 m.'
  },
  {
    id: 'wd-q25',
    level: 3,
    questionTypeBadge: 'Láncszámolás',
    question: 'Végezd el a láncszámolást! 9072 : 3 : 4 : 6 = ?',
    options: ['126', '756', '3024', '136'],
    correctAnswer: 0,
    explanation: '9072 : 3 = 3024, 3024 : 4 = 756, 756 : 6 = 126.'
  },
  {
    id: 'wd-q26',
    level: 3,
    questionTypeBadge: 'Maradék',
    question: 'Melyik osztásnál marad 5?',
    options: ['1421 : 6', '236 : 6', '962 : 2', '1124 : 4'],
    correctAnswer: 0,
    explanation: '1421 : 6 = 236, marad 5. A többi: 236 : 6 = 39, marad 2; 962 : 2 = 481; 1124 : 4 = 281 (nem marad semmi).'
  },
  {
    id: 'wd-q27',
    level: 3,
    questionTypeBadge: 'Maradék',
    figure: <QDiv a="9277" d="8" q="?, marad ?" />,
    question: 'Emma levelének irányítószáma a 9277 : 8 osztás maradékával kezdődik. Mennyi a maradék?',
    options: ['5', '1159', '7', '3'],
    correctAnswer: 0,
    explanation: '9 : 8 = 1, marad 1 → 12 : 8 = 1, marad 4 → 47 : 8 = 5, marad 7 → 77 : 8 = 9, marad 5. 9277 : 8 = 1159, marad 5.'
  },
  {
    id: 'wd-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A diákjegy a 3150 Ft-os felnőttjegy harmada. Mennyit fizet összesen 4 diák?',
    options: ['4200 Ft', '1050 Ft', '4250 Ft', '12 600 Ft'],
    correctAnswer: 0,
    explanation: 'Egy diákjegy: 3150 : 3 = 1050 Ft. 4 diák: 1050 · 4 = 4200 Ft.'
  },
  {
    id: 'wd-q29',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik a legnagyobb szám, amely igazzá teszi? 7344 : 2 > □ + 100',
    options: ['3571', '3572', '3672', '3772'],
    correctAnswer: 0,
    explanation: '7344 : 2 = 3672. 3672 > □ + 100, tehát □ + 100 legfeljebb 3671, vagyis □ legfeljebb 3571.'
  },
  {
    id: 'wd-q30',
    level: 3,
    questionTypeBadge: 'Hányados tulajdonsága',
    question: 'Melyik osztás hányadosában 5 a számjegyek összege?',
    options: ['917 : 7', '968 : 8', '764 : 2', '755 : 5'],
    correctAnswer: 0,
    explanation: '917 : 7 = 131, és 1 + 3 + 1 = 5. A többi: 968 : 8 = 121 (összeg 4), 764 : 2 = 382 (13), 755 : 5 = 151 (7).'
  }
];

export const WrittenDivisionQuiz: React.FC<{
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
      topicId="g4-wops-osztas-quiz"
      subtopicId="irasbeli-osztas-egyjegyu-osztoval"
      title="3. Írásbeli osztás egyjegyű osztóval – Kvíz"
      subtitle="30 feladat 3 szinten: osztás bontással, becslés, írásbeli osztás, maradék, szöveges feladatok."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • KVÍZ"
      questions={WRITTEN_DIV_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az osztás lépései',
          items: [
            'Becsülj: 3\'693 : 3 = . . . . → négyjegyű lesz',
            'Kezdd a legnagyobb helyi értékkel: 3 E : 3 = 1 E',
            'A maradék mellé hozd le a következő számjegyet: 1 t + 2 e = 12 e',
            'Ha nincs meg az osztó, a hányadosba 0 kerül (3150 : 3 = 1050)'
          ]
        },
        {
          title: 'Maradék és ellenőrzés',
          items: [
            'A maradék mindig kisebb az osztónál.',
            'Ellenőrzés: hányados · osztó + maradék = osztandó',
            '224 : 3 = 74, marad 2 → 74 · 3 + 2 = 224',
            'osztandó : osztó = hányados'
          ]
        },
        {
          title: 'Szöveges feladatok',
          items: [
            '„fele” → : 2, „harmada” → : 3, „ötöde” → : 5',
            '„oda-vissza 734 m” → az egyik út 734 : 2',
            'Előbb számold ki, mennyit kell elosztani (5000 − 400)!',
            '„Mennyi van még hátra?” → egész − rész'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WrittenDivisionMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <WrittenDivisionSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default WrittenDivisionQuiz;
