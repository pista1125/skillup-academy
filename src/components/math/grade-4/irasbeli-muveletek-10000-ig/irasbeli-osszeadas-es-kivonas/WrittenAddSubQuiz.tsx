import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenAddSubMatcher } from './WrittenAddSubMatcher';
import { WrittenAddSubSorter } from './WrittenAddSubSorter';

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

/** Négyjegyű írásbeli művelet E–sz–t–e oszlopokban. A „?” piros; a „????” eredmény egyetlen „?”. */
const QColumn: React.FC<{ rows: string[]; result: string; sign: '+' | '−'; note?: string }> = ({ rows, result, sign, note }) => {
  const xs = [95, 125, 155, 185];
  const ys = rows.map((_, i) => 52 + i * 28);
  const lineY = ys[ys.length - 1] + 10;
  const resY = lineY + 26;
  const h = resY + (note ? 30 : 14);
  const cells = (row: string, y: number, key: string) =>
    row
      .padStart(4, ' ')
      .split('')
      .map((d, i) => (
        <text key={`${key}${i}`} x={xs[i]} y={y} textAnchor="middle" fontSize="19" fontWeight="bold" fill={d === '?' ? C_UNK : '#0f172a'}>
          {d.trim()}
        </text>
      ));
  return (
    <QFig h={h}>
      {HEADS.map((hd, i) => (
        <g key={hd}>
          <rect x={xs[i] - 13} y="12" width="26" height="16" fill={COLS[i]} />
          <text x={xs[i]} y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">{hd}</text>
          <rect x={xs[i] - 13} y="28" width="26" height={resY - 18} fill={COLS[i]} opacity="0.12" />
        </g>
      ))}
      {rows.map((r, i) => cells(r, ys[i], `r${i}`))}
      <text x={xs[0] - 30} y={ys[ys.length - 1]} textAnchor="middle" fontSize="19" fontWeight="bold" fill="#0f172a">{sign}</text>
      <line x1={xs[0] - 40} y1={lineY} x2={xs[3] + 16} y2={lineY} stroke="#0f172a" strokeWidth="2" />
      {result === '????' ? (
        <text x={(xs[1] + xs[2]) / 2} y={resY} textAnchor="middle" fontSize="20" fontWeight="bold" fill={C_UNK}>?</text>
      ) : (
        cells(result, resY, 'res')
      )}
      {note && (
        <text x="120" y={resY + 22} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">{note}</text>
      )}
    </QFig>
  );
};

/** Egyszerű adat-táblázat (címke – érték) a „?” értékkel. */
const QTable: React.FC<{ title: string; rows: { k: string; v: string }[] }> = ({ title, rows }) => (
  <QFig h={38 + rows.length * 22}>
    <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">{title}</text>
    {rows.map((r, i) => (
      <g key={r.k}>
        <rect x="16" y={30 + i * 22} width="208" height="20" rx="4" fill={i % 2 ? '#e0f2fe' : '#f0f9ff'} />
        <text x="24" y={44 + i * 22} fontSize="11" fontWeight="bold" fill="#334155">{r.k}</text>
        <text x="216" y={44 + i * 22} textAnchor="end" fontSize="12" fontWeight="bold" fill={r.v.includes('?') ? C_UNK : '#0c4a6e'}>{r.v}</text>
      </g>
    ))}
  </QFig>
);

/** Árcédulák. */
const QPrices: React.FC<{ items: { n: string; p: string }[]; note: string }> = ({ items, note }) => {
  const w = 216 / items.length;
  return (
    <QFig h={110}>
      {items.map((it, i) => (
        <g key={it.n}>
          <rect x={12 + i * w} y="14" width={w - 6} height="58" rx="7" fill="#fff" stroke="#c026d3" strokeWidth="1.5" />
          <text x={12 + i * w + (w - 6) / 2} y="38" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#334155">{it.n}</text>
          <text x={12 + i * w + (w - 6) / 2} y="60" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#86198f">{it.p}</text>
        </g>
      ))}
      <text x="120" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{note}</text>
    </QFig>
  );
};

/** Szakaszos ábra: egész hossz két részre bontva, az egyik rész „?”. */
const QBarSplit: React.FC<{ total: string; known: string; unit: string; knownLabel: string; restLabel: string; knownFrac?: number }> = ({
  total,
  known,
  unit,
  knownLabel,
  restLabel,
  knownFrac = 0.52
}) => {
  const x0 = 16;
  const w = 208;
  const k = Math.round(w * knownFrac);
  return (
    <QFig h={120}>
      <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">Összesen: {total} {unit}</text>
      <line x1={x0} y1="34" x2={x0 + w} y2="34" stroke="#334155" strokeWidth="1.5" />
      <line x1={x0} y1="29" x2={x0} y2="39" stroke="#334155" strokeWidth="1.5" />
      <line x1={x0 + w} y1="29" x2={x0 + w} y2="39" stroke="#334155" strokeWidth="1.5" />
      <rect x={x0} y="46" width={k} height="30" fill="#93c5fd" stroke="#1d4ed8" />
      <rect x={x0 + k} y="46" width={w - k} height="30" fill="#fde68a" stroke="#b45309" />
      <text x={x0 + k / 2} y="66" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">{known} {unit}</text>
      <text x={x0 + k + (w - k) / 2} y="67" textAnchor="middle" fontSize="16" fontWeight="bold" fill={C_UNK}>?</text>
      <text x={x0 + k / 2} y="96" textAnchor="middle" fontSize="10" fill="#334155">{knownLabel}</text>
      <text x={x0 + k + (w - k) / 2} y="96" textAnchor="middle" fontSize="10" fill="#334155">{restLabel}</text>
    </QFig>
  );
};

/** Repülőút két szakasza. */
const QFlight: React.FC<{ a: string; b: string; c: string; d1: string; d2: string }> = ({ a, b, c, d1, d2 }) => (
  <QFig h={110}>
    {[a, b, c].map((n, i) => (
      <g key={n}>
        <rect x={10 + i * 78} y="20" width="64" height="26" rx="6" fill="#e0f2fe" stroke="#0284c7" />
        <text x={42 + i * 78} y="37" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#075985">{n}</text>
      </g>
    ))}
    {[0, 1].map((i) => (
      <g key={i}>
        <line x1={76 + i * 78} y1="33" x2={86 + i * 78} y2="33" stroke="#ea580c" strokeWidth="2" />
        <rect x={44 + i * 78} y="58" width="74" height="20" rx="5" fill="#fed7aa" />
        <text x={81 + i * 78} y="72" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c2d12">{i === 0 ? d1 : d2}</text>
      </g>
    ))}
    <text x="120" y="98" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>Összesen: ? km</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const WRITTEN_ADDSUB_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'was-q1',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <QColumn rows={['3845', '2850']} sign="+" result="????" />,
    question: 'Laci vonatjegye 3845 Ft, a hajójegye 2850 Ft volt. Mennyibe került összesen?',
    options: ['6695 Ft', '5695 Ft', '6595 Ft', '6795 Ft'],
    correctAnswer: 0,
    explanation: 'Egyesek: 5 + 0 = 5. Tízesek: 4 + 5 = 9. Százasok: 8 + 8 = 16, leírom a 6-ot, maradt 1. Ezresek: 3 + 2 + 1 = 6. Összesen 6695 Ft.'
  },
  {
    id: 'was-q2',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg százasra kerekített értékekkel: 3845 + 2850 ≈ ?',
    options: ['6700', '7000', '6600', '6800'],
    correctAnswer: 0,
    explanation: '3845 ≈ 3800 és 2850 ≈ 2900 (a 850 felfelé kerekedik). 3800 + 2900 = 6700. A 7000 az ezresre kerekített becslés lenne.'
  },
  {
    id: 'was-q3',
    level: 1,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QColumn rows={['7212', '5410']} sign="−" result="????" />,
    question: 'Számítsd ki a 7212 és az 5410 különbségét!',
    options: ['1802', '2202', '2802', '1812'],
    correctAnswer: 0,
    explanation: 'Egyesek: 2 − 0 = 2. Tízesek: 1 − 1 = 0. Százasok: 4 meg mennyi a 12? 8, maradt 1. Ezresek: 5 + 1 = 6, 6 meg mennyi a 7? 1. A különbség 1802.'
  },
  {
    id: 'was-q4',
    level: 1,
    questionTypeBadge: 'Műveleti nevek',
    question: 'A 7212 − 5410 = 1802 kivonásban mi a neve az 5410-nek?',
    options: ['kivonandó', 'kisebbítendő', 'különbség', 'tag'],
    correctAnswer: 0,
    explanation: 'A kivonásban: kisebbítendő − kivonandó = különbség. Az 5410-et vonjuk ki, ezért ez a kivonandó.'
  },
  {
    id: 'was-q5',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <QColumn rows={['3246', '2415']} sign="+" result="????" />,
    question: 'Mennyi 3246 + 2415?',
    options: ['5661', '5651', '5561', '5671'],
    correctAnswer: 0,
    explanation: 'Egyesek: 6 + 5 = 11, leírom az 1-et, maradt 1. Tízesek: 4 + 1 + 1 = 6. Százasok: 2 + 4 = 6. Ezresek: 3 + 2 = 5. Az összeg 5661.'
  },
  {
    id: 'was-q6',
    level: 1,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QColumn rows={['5846', '2415']} sign="−" result="????" />,
    question: 'Mennyi 5846 − 2415?',
    options: ['3431', '3441', '3331', '3421'],
    correctAnswer: 0,
    explanation: 'Egyesek: 5 meg mennyi a 6? 1. Tízesek: 1 meg mennyi a 4? 3. Százasok: 4 meg mennyi a 8? 4. Ezresek: 2 meg mennyi az 5? 3. A különbség 3431.'
  },
  {
    id: 'was-q7',
    level: 1,
    questionTypeBadge: 'Felváltás',
    figure: <QColumn rows={['7212', '5410']} sign="−" result="??02" note="2 százasból nem lehet 4-et elvenni!" />,
    question: 'Mona 1 ezrest felváltott 10 százasra. Hány százasból vette el így a 4 százast?',
    options: ['12 százasból', '2 százasból', '10 százasból', '6 százasból'],
    correctAnswer: 0,
    explanation: 'Volt 2 százas, és kapott még 10-et a felváltott ezresből: 2 + 10 = 12 százas. 12 sz − 4 sz = 8 sz.'
  },
  {
    id: 'was-q8',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Hogyan ellenőrizheted a kivonás eredményét?',
    options: [
      'A különbséghez hozzáadom a kivonandót.',
      'A különbségből kivonom a kivonandót.',
      'Felcserélem a kisebbítendőt és a kivonandót.',
      'A kisebbítendőhöz hozzáadom a különbséget.'
    ],
    correctAnswer: 0,
    explanation: 'Különbség + kivonandó = kisebbítendő. Például: 1802 + 5410 = 7212, tehát a 7212 − 5410 = 1802 jó.'
  },
  {
    id: 'was-q9',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QFlight a="Budapest" b="Párizs" c="Róma" d1="1246 km" d2="1106 km" />,
    question: 'Gabriella Budapestről Párizsba, onnan Rómába repült. Hány kilométert utazott?',
    options: ['2352 km', '2342 km', '140 km', '2252 km'],
    correctAnswer: 0,
    explanation: '1246 + 1106: egyesek 6 + 6 = 12, leírom a 2-t, maradt 1. Tízesek: 4 + 0 + 1 = 5. Százasok: 2 + 1 = 3. Ezresek: 1 + 1 = 2. Összesen 2352 km.'
  },
  {
    id: 'was-q10',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    question: 'Melyik helyi értéken kezdjük az írásbeli összeadást?',
    options: ['az egyeseknél', 'az ezreseknél', 'a százasoknál', 'mindegy, hol kezdjük'],
    correctAnswer: 0,
    explanation: 'Mindig a legkisebb helyi értéken, az egyeseknél kezdünk, utána jönnek a tízesek, a százasok, végül az ezresek. Így tudjuk továbbvinni a maradékot.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'was-q11',
    level: 2,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <QColumn rows={['2548', '3278']} sign="+" result="????" />,
    question: 'Mennyi 2548 + 3278?',
    options: ['5826', '5716', '5816', '5726'],
    correctAnswer: 0,
    explanation: 'Egyesek: 8 + 8 = 16, leírom a 6-ot, maradt 1. Tízesek: 4 + 7 + 1 = 12, leírom a 2-t, maradt 1. Százasok: 5 + 2 + 1 = 8. Ezresek: 2 + 3 = 5. Az összeg 5826.'
  },
  {
    id: 'was-q12',
    level: 2,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QColumn rows={['7426', '4813']} sign="−" result="????" />,
    question: 'Mennyi 7426 − 4813?',
    options: ['2613', '3613', '3413', '2617'],
    correctAnswer: 0,
    explanation: 'Egyesek: 3 meg mennyi a 6? 3. Tízesek: 1 meg mennyi a 2? 1. Százasok: 8 meg mennyi a 4? Nem megy, 8 meg mennyi a 14? 6, maradt 1. Ezresek: 4 + 1 = 5, 5 meg mennyi a 7? 2. A különbség 2613.'
  },
  {
    id: 'was-q13',
    level: 2,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QColumn rows={['6300', '3649']} sign="−" result="????" />,
    question: 'Mennyi 6300 − 3649?',
    options: ['2651', '3761', '3349', '2751'],
    correctAnswer: 0,
    explanation: 'Egyesek: 9 meg mennyi a 10? 1, maradt 1. Tízesek: 4 + 1 = 5, 5 meg mennyi a 10? 5, maradt 1. Százasok: 6 + 1 = 7, 7 meg mennyi a 13? 6, maradt 1. Ezresek: 3 + 1 = 4, 4 meg mennyi a 6? 2. A különbség 2651.'
  },
  {
    id: 'was-q14',
    level: 2,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QColumn rows={['8000', '2873']} sign="−" result="????" />,
    question: 'Mennyi 8000 − 2873?',
    options: ['5127', '6237', '6873', '5137'],
    correctAnswer: 0,
    explanation: 'Egyesek: 3 meg mennyi a 10? 7, maradt 1. Tízesek: 8 meg mennyi a 10? 2, maradt 1. Százasok: 9 meg mennyi a 10? 1, maradt 1. Ezresek: 3 meg mennyi a 8? 5. A különbség 5127. Ellenőrzés: 5127 + 2873 = 8000.'
  },
  {
    id: 'was-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <QColumn rows={['2624', '????']} sign="+" result="4251" />,
    question: 'Pótold a hiányzó számot! 2624 + □ = 4251',
    options: ['1627', '6875', '1637', '1737'],
    correctAnswer: 0,
    explanation: 'A hiányzó tagot kivonással kapjuk: 4251 − 2624 = 1627. Ellenőrzés: 2624 + 1627 = 4251.'
  },
  {
    id: 'was-q16',
    level: 2,
    questionTypeBadge: 'Különbség változása',
    question: '4876 − 1325 = 3551. Mennyi 4976 − 1425?',
    options: ['3551', '3751', '3651', '3451'],
    correctAnswer: 0,
    explanation: 'A kisebbítendőhöz is és a kivonandóhoz is 100-at adtunk. Ha mindkettőt ugyanannyival növeljük, a különbség nem változik: 3551.'
  },
  {
    id: 'was-q17',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg százasra kerekített értékekkel: 7864 − 3243 ≈ ?',
    options: ['4700', '5000', '4600', '4800'],
    correctAnswer: 0,
    explanation: '7864 ≈ 7900 és 3243 ≈ 3200. 7900 − 3200 = 4700. (Ezresre kerekítve 8000 − 3000 = 5000 lenne.)'
  },
  {
    id: 'was-q18',
    level: 2,
    questionTypeBadge: 'Több tag',
    figure: <QColumn rows={['2568', '4213', '78']} sign="+" result="????" />,
    question: 'Mennyi 2568 + 4213 + 78?',
    options: ['6859', '6849', '6759', '7859'],
    correctAnswer: 0,
    explanation: 'Egyesek: 8 + 3 + 8 = 19, leírom a 9-et, maradt 1. Tízesek: 6 + 1 + 7 + 1 = 15, leírom az 5-öt, maradt 1. Százasok: 5 + 2 + 1 = 8. Ezresek: 2 + 4 = 6. Az összeg 6859.'
  },
  {
    id: 'was-q19',
    level: 2,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Melyik számra gondoltam? A 3662-nél 4879-cel nagyobb.',
    options: ['8541', '1217', '7431', '8441'],
    correctAnswer: 0,
    explanation: '„Nagyobb” → összeadunk: 3662 + 4879 = 8541. Az 1217 a különbségük lenne, a 7431-ben elmaradt a maradék.'
  },
  {
    id: 'was-q20',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <QColumn rows={['8541', '????']} sign="−" result="3658" />,
    question: 'Mennyi a kivonandó, ha a kisebbítendő 8541, a különbség 3658?',
    options: ['4883', '12 199', '4983', '4873'],
    correctAnswer: 0,
    explanation: 'A kivonandót kivonással kapjuk: 8541 − 3658 = 4883. Ellenőrzés: 3658 + 4883 = 8541.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'was-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QBarSplit total="7546" known="3778" unit="néző" knownLabel="1. előadás" restLabel="2. előadás" />,
    question: 'Egy cirkusz két előadásán összesen 7546 néző volt. Az elsőn 3778-an. Hányan voltak a második előadáson?',
    options: ['3768', '4878', '4232', '3868'],
    correctAnswer: 0,
    explanation: '7546 − 3778: egyesek 8 meg mennyi a 16? 8, maradt 1. Tízesek: 8 meg mennyi a 14? 6, maradt 1. Százasok: 8 meg mennyi a 15? 7, maradt 1. Ezresek: 4 meg mennyi a 7? 3. A második előadáson 3768-an voltak.'
  },
  {
    id: 'was-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A Fővárosi Nagycirkusz telt házas előadására 648 felnőtt- és 1202 gyerekjegyet adtak el. Legfeljebb hányan nézhetik meg egyszerre az előadást?',
    options: ['1850', '1840', '554', '1750'],
    correctAnswer: 0,
    explanation: 'Telt ház volt, tehát az összes hely elkelt: 648 + 1202 = 1850 néző.'
  },
  {
    id: 'was-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Ugyanezen az előadáson 1202 gyerek és 648 felnőtt volt. Mennyivel több gyerek volt, mint felnőtt?',
    options: ['554', '1664', '1446', '654'],
    correctAnswer: 0,
    explanation: '„Mennyivel több?” → kivonunk: 1202 − 648. Egyesek: 8 meg mennyi a 12? 4, maradt 1. Tízesek: 5 meg mennyi a 10? 5, maradt 1. Százasok: 7 meg mennyi a 12? 5, maradt 1. Ezresek: 1 − 1 = 0. 554-gyel több gyerek volt.'
  },
  {
    id: 'was-q24',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: (
      <QTable
        title="A világ leghosszabb folyói"
        rows={[
          { k: 'Amazonas', v: '6992 km' },
          { k: 'Nílus', v: '6853 km' },
          { k: 'Jangce', v: '6300 km' },
          { k: 'Mississippi', v: '6212 km' },
          { k: 'Ob', v: '5410 km' }
        ]}
      />
    ),
    question: 'Mennyivel hosszabb az Amazonas, mint a Jangce?',
    options: ['692 km', '792 km', '682 km', '592 km'],
    correctAnswer: 0,
    explanation: '6992 − 6300 = 692. Az Amazonas 692 km-rel hosszabb.'
  },
  {
    id: 'was-q25',
    level: 3,
    questionTypeBadge: 'Vásárlás',
    figure: (
      <QPrices
        items={[
          { n: 'hálózsák', p: '3900 Ft' },
          { n: 'kulacs', p: '2490 Ft' },
          { n: 'hátizsák', p: '4200 Ft' },
          { n: 'sátor', p: '6100 Ft' },
          { n: 'lámpa', p: '1490 Ft' }
        ]}
        note="Robi 10 000 Ft-tal fizetett, 1410 Ft-ot kapott vissza."
      />
    ),
    question: 'Robi 10 000 Ft-tal fizetett, és 1410 Ft-ot kapott vissza. Mit vásárolt?',
    options: ['6100 Ft + 2490 Ft', '3900 Ft + 4200 Ft', '4200 Ft + 2490 Ft + 1490 Ft', '3900 Ft + 2490 Ft + 1490 Ft'],
    correctAnswer: 0,
    explanation: 'Robi 10 000 − 1410 = 8590 Ft-ot költött. 6100 + 2490 = 8590. A többi: 8100, 8180, 7880 Ft.'
  },
  {
    id: 'was-q26',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    figure: <QBarSplit total="10 km" known="5213" unit="m" knownLabel="megtett táv" restLabel="hátralévő táv" />,
    question: 'Egy úszóversenyen 10 km-t kell leúszni. Éva már 5213 métert megtett. Hány métert kell még úsznia?',
    options: ['4787 m', '4797 m', '5787 m', '5213 m'],
    correctAnswer: 0,
    explanation: '10 km = 10 000 m. 10 000 − 5213 = 4787. Ellenőrzés: 5213 + 4787 = 10 000.'
  },
  {
    id: 'was-q27',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QBarSplit total="10 000" known="4537" unit="kg" knownLabel="már felpakolt" restLabel="még felpakolható" knownFrac={0.45} />,
    question: 'Egy teherautó 10 000 kg árut tud elszállítani. Már 4537 kg-ot felpakoltak. Mennyit pakolhatnak még fel?',
    options: ['5463 kg', '5563 kg', '5473 kg', '6573 kg'],
    correctAnswer: 0,
    explanation: '10 000 − 4537 = 5463 kg. Ellenőrzés: 4537 + 5463 = 10 000.'
  },
  {
    id: 'was-q28',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: (
      <QTable
        title="A Duna jobb partjának hossza"
        rows={[
          { k: 'Németország', v: '659 km' },
          { k: 'Ausztria', v: '351 km' },
          { k: 'Magyarország', v: '? km' },
          { k: 'Szerbia', v: '450 km' },
          { k: 'Románia', v: '374 km' },
          { k: 'Egyéb országok', v: '632 km' },
          { k: 'Összesen', v: '2883 km' }
        ]}
      />
    ),
    question: 'Hány kilométer hosszú a Duna jobb partja Magyarországon?',
    options: ['417 km', '2466 km', '427 km', '517 km'],
    correctAnswer: 0,
    explanation: 'Előbb összeadjuk a többi országot: 659 + 351 + 450 + 374 + 632 = 2466. Aztán: 2883 − 2466 = 417 km.'
  },
  {
    id: 'was-q29',
    level: 3,
    questionTypeBadge: 'Évszám',
    question: 'Az ópusztaszeri fa évgyűrűire évszámokat véstek. Melyik évszámra gondoltam? 4925 − 4029 = ?',
    options: ['896, a honfoglalás', '906', '904', '996'],
    correctAnswer: 0,
    explanation: 'Egyesek: 9 meg mennyi a 15? 6, maradt 1. Tízesek: 3 meg mennyi a 2? Nem megy, 3 meg mennyi a 12? 9, maradt 1. Százasok: 1 meg mennyi a 9? 8. Ezresek: 4 − 4 = 0. Az eredmény 896, a honfoglalás éve.'
  },
  {
    id: 'was-q30',
    level: 3,
    questionTypeBadge: 'Számszomszédok',
    question: 'Melyik számra gondoltam? A 9124 és az 5286 különbségének kisebb százas szomszédja.',
    options: ['3800', '3900', '3838', '3840'],
    correctAnswer: 0,
    explanation: '9124 − 5286 = 3838. A 3838 kisebb százas szomszédja a 3800 (a nagyobb a 3900).'
  }
];

export const WrittenAddSubQuiz: React.FC<{
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
      topicId="g4-wops-osszeadas-kivonas-quiz"
      subtopicId="irasbeli-osszeadas-es-kivonas"
      title="1. Írásbeli összeadás és kivonás – Kvíz"
      subtitle="30 feladat 3 szinten: becslés, négyjegyű számok írásbeli összeadása és kivonása, hiányzó számok, szöveges feladatok."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • KVÍZ"
      questions={WRITTEN_ADDSUB_QUESTIONS}
      cheatSheets={[
        {
          title: 'Írásbeli összeadás',
          items: [
            'Helyi érték szerint írd egymás alá: E, sz, t, e.',
            'Kezdd az egyesekkel! 8 + 8 = 16 → leírom a 6-ot, maradt 1.',
            'A maradékot add hozzá a következő helyi értékhez.',
            'Ellenőrzés: cseréld fel a tagokat!'
          ]
        },
        {
          title: 'Írásbeli kivonás',
          items: [
            'Kezdd az egyesekkel, a felső számból vonj ki!',
            'Pótlással: „4 meg mennyi a 2? Nem megy. 4 meg mennyi a 12? 8, maradt 1.”',
            'A maradék 1-et a következő helyen a kivonandóhoz add!',
            'Ellenőrzés: különbség + kivonandó = kisebbítendő.'
          ]
        },
        {
          title: 'Becslés és nevek',
          items: [
            'Százasra: 3845 ≈ 3800, 2850 ≈ 2900 → B: 6700',
            'Ezresre: 3845 ≈ 4000, 2850 ≈ 3000 → B: 7000',
            'tag + tag = összeg',
            'kisebbítendő − kivonandó = különbség'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WrittenAddSubMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <WrittenAddSubSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default WrittenAddSubQuiz;
