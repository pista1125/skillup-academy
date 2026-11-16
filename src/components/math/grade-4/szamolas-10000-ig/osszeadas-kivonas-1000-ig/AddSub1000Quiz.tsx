import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AddSub1000Matcher } from './AddSub1000Matcher';
import { AddSub1000Sorter } from './AddSub1000Sorter';

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

/** Írásbeli művelet oszlopokban; a „?” pirossal; opcionális nyíl egy sorhoz. */
const QColumn: React.FC<{ top: string; bottom: string; result: string; sign: '+' | '−'; arrowRow?: 0 | 1 | 2 }> = ({
  top,
  bottom,
  result,
  sign,
  arrowRow
}) => {
  const n = Math.max(3, top.length, bottom.length, result.length);
  const xs = Array.from({ length: n }).map((_, i) => 150 - (n - 1 - i) * 30);
  const heads = n === 4 ? ['E', 'sz', 't', 'e'] : ['sz', 't', 'e'];
  const colors = n === 4 ? ['#16a34a', ...COLS] : COLS;
  const ys = [50, 82, 124];
  const cells = (row: string, y: number, key: string) =>
    row.padStart(n, ' ').split('').map((d, i) => (
      <text key={`${key}${i}`} x={xs[i]} y={y} textAnchor="middle" fontSize="20" fontWeight="bold" fill={d === '?' ? C_UNK : '#0f172a'}>
        {d.trim()}
      </text>
    ));
  return (
    <QFig h={145}>
      {heads.map((h, i) => (
        <g key={h}>
          <rect x={xs[i] - 13} y="12" width="26" height="16" fill={colors[i]} />
          <text x={xs[i]} y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#fff">{h}</text>
          <rect x={xs[i] - 13} y="28" width="26" height="104" fill={colors[i]} opacity="0.12" />
        </g>
      ))}
      {cells(top, ys[0], 't')}
      {cells(bottom, ys[1], 'b')}
      {result === '???' ? (
        <text x={xs[n - 2]} y={ys[2]} textAnchor="middle" fontSize="20" fontWeight="bold" fill={C_UNK}>?</text>
      ) : (
        cells(result, ys[2], 'r')
      )}
      <text x={xs[0] - 26} y={ys[1]} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{sign}</text>
      <line x1={xs[0] - 34} y1="94" x2="166" y2="94" stroke="#0f172a" strokeWidth="2" />
      {arrowRow !== undefined && (
        <g>
          <line x1="205" y1={ys[arrowRow] - 6} x2="170" y2={ys[arrowRow] - 6} stroke={C_UNK} strokeWidth="2" />
          <polygon points={`168,${ys[arrowRow] - 6} 176,${ys[arrowRow] - 10} 176,${ys[arrowRow] - 2}`} fill={C_UNK} />
          <text x="216" y={ys[arrowRow] - 1} textAnchor="middle" fontSize="16" fontWeight="bold" fill={C_UNK}>?</text>
        </g>
      )}
    </QFig>
  );
};

/** Ugrások a számegyenesen. */
const QJumps: React.FC<{ from: number; to: number; start: number; jumps: number[]; labels: number[] }> = ({ from, to, start, jumps, labels }) => {
  const x0 = 16;
  const x1 = 220;
  const sx = (v: number) => x0 + ((x1 - x0) * (v - from)) / (to - from);
  let cur = start;
  return (
    <QFig h={120}>
      <line x1={x0} y1="88" x2={x1 + 8} y2="88" stroke="#0f172a" strokeWidth="1.8" />
      <polygon points={`${x1 + 12},88 ${x1 + 5},84 ${x1 + 5},92`} fill="#0f172a" />
      {labels.map((v) => (
        <g key={v}>
          <line x1={sx(v)} x2={sx(v)} y1="81" y2="95" stroke="#334155" strokeWidth="1.3" />
          <text x={sx(v)} y="110" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">{v}</text>
        </g>
      ))}
      {jumps.map((j, i) => {
        const a = cur;
        const b = cur + j;
        cur = b;
        const mid = (sx(a) + sx(b)) / 2;
        return (
          <g key={i}>
            <path d={`M ${sx(a)} 84 Q ${mid} ${40 - i * 4} ${sx(b)} 84`} fill="none" stroke={i % 2 ? '#ec4899' : '#6366f1'} strokeWidth="2.5" />
            <text x={mid} y={52 - i * 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill={i % 2 ? '#db2777' : '#4f46e5'}>
              {j > 0 ? `+${j}` : `−${-j}`}
            </text>
          </g>
        );
      })}
      <circle cx={sx(start)} cy="88" r="4" fill="#4f46e5" />
      <circle cx={sx(cur)} cy="88" r="5" fill={C_UNK} />
      <text x={sx(cur)} y="74" textAnchor="middle" fontSize="14" fontWeight="bold" fill={C_UNK}>?</text>
    </QFig>
  );
};

/** Árcédulák. */
const QPrices: React.FC<{ items: { n: string; p: number }[]; note: string }> = ({ items, note }) => {
  const w = 216 / items.length;
  return (
    <QFig h={110}>
      {items.map((it, i) => (
        <g key={it.n}>
          <rect x={12 + i * w} y="14" width={w - 6} height="58" rx="7" fill="#fff" stroke="#c026d3" strokeWidth="1.5" />
          <text x={12 + i * w + (w - 6) / 2} y="38" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#334155">{it.n}</text>
          <text x={12 + i * w + (w - 6) / 2} y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#86198f">{it.p} Ft</text>
        </g>
      ))}
      <text x="120" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{note}</text>
    </QFig>
  );
};

/** Hordó literrel. */
const QBarrel: React.FC = () => (
  <QFig h={150}>
    <path d="M 70 20 Q 55 80 70 135 L 150 135 Q 165 80 150 20 Z" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
    <path d="M 64 75 Q 60 105 70 135 L 150 135 Q 160 105 156 75 Z" fill="#60a5fa" opacity="0.8" />
    <line x1="60" y1="45" x2="160" y2="45" stroke="#92400e" strokeWidth="2" />
    <line x1="60" y1="110" x2="160" y2="110" stroke="#92400e" strokeWidth="2" />
    <text x="110" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">410 l</text>
    <text x="110" y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">650 l fér bele</text>
    <text x="200" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb">+ 320 l</text>
    <text x="200" y="100" textAnchor="middle" fontSize="16" fontWeight="bold" fill={C_UNK}>?</text>
  </QFig>
);

/** Jegyek napszakonként. */
const QTickets: React.FC<{ rows: { t: string; n: number }[] }> = ({ rows }) => (
  <QFig h={40 + rows.length * 28}>
    {rows.map((r, i) => (
      <g key={r.t}>
        <rect x="20" y={14 + i * 28} width="200" height="24" rx="6" fill={i % 2 ? '#e0f2fe' : '#dbeafe'} />
        <text x="32" y={31 + i * 28} fontSize="12" fontWeight="bold" fill="#1e3a8a">🎟 {r.t}</text>
        <text x="208" y={31 + i * 28} textAnchor="end" fontSize="13" fontWeight="bold" fill="#0f172a">{r.n} jegy</text>
      </g>
    ))}
    <text x="120" y={30 + rows.length * 28} textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>Összesen: ?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const ADDSUB_1000_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'as1000-q1',
    level: 1,
    questionTypeBadge: 'Fejben összeadás',
    question: 'Mennyi 200 + 800?',
    options: ['1000', '900', '100', '1100'],
    correctAnswer: 0,
    explanation: '2 százas + 8 százas = 10 százas, az 1000.'
  },
  {
    id: 'as1000-q2',
    level: 1,
    questionTypeBadge: 'Fejben kivonás',
    question: 'Mennyi 600 − 300?',
    options: ['300', '900', '200', '330'],
    correctAnswer: 0,
    explanation: '6 százasból elveszünk 3 százast, marad 3 százas: 300.'
  },
  {
    id: 'as1000-q3',
    level: 1,
    questionTypeBadge: 'Fejben összeadás',
    question: 'Mennyi 230 + 60?',
    options: ['290', '830', '236', '300'],
    correctAnswer: 0,
    explanation: 'A tízesekhez adjuk a tízeseket: 3 tízes + 6 tízes = 9 tízes. 230 + 60 = 290.'
  },
  {
    id: 'as1000-q4',
    level: 1,
    questionTypeBadge: 'Fejben kivonás',
    question: 'Mennyi 760 − 30?',
    options: ['730', '460', '790', '757'],
    correctAnswer: 0,
    explanation: '6 tízesből elveszünk 3 tízest, marad 3 tízes. 760 − 30 = 730.'
  },
  {
    id: 'as1000-q5',
    level: 1,
    questionTypeBadge: 'Elnevezések',
    figure: <QColumn top="448" bottom="263" result="711" sign="+" arrowRow={2} />,
    question: 'Mi a neve az összeadás eredményének (a nyíllal jelölt számnak)?',
    options: ['összeg', 'tag', 'különbség', 'kisebbítendő'],
    correctAnswer: 0,
    explanation: 'Az összeadásban szereplő számok a tagok, az eredmény az összeg.'
  },
  {
    id: 'as1000-q6',
    level: 1,
    questionTypeBadge: 'Elnevezések',
    figure: <QColumn top="931" bottom="456" result="475" sign="−" arrowRow={1} />,
    question: 'Mi a neve a kivonásban a nyíllal jelölt számnak?',
    options: ['kivonandó', 'kisebbítendő', 'különbség', 'tag'],
    correctAnswer: 0,
    explanation: 'Kisebbítendő − kivonandó = különbség. A 456-ot vonjuk ki, ez a kivonandó.'
  },
  {
    id: 'as1000-q7',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <QJumps from={200} to={450} start={250} jumps={[100, 70]} labels={[200, 250, 300, 350, 400, 450]} />,
    question: '250 + 170 = 250 + 100 + 70. Hová érkezünk a két ugrás után?',
    options: ['420', '320', '520', '350'],
    correctAnswer: 0,
    explanation: '250 + 100 = 350, aztán 350 + 70 = 420.'
  },
  {
    id: 'as1000-q8',
    level: 1,
    questionTypeBadge: 'Kiegészítés 1000-re',
    question: 'Mennyit kell a 300-hoz adni, hogy 1000 legyen? 300 + □ = 1000',
    options: ['700', '600', '800', '1300'],
    correctAnswer: 0,
    explanation: '3 százashoz még 7 százas kell, hogy 10 százas, vagyis 1000 legyen.'
  },
  {
    id: 'as1000-q9',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QPrices items={[{ n: 'Kis-Balaton Ház', p: 450 }, { n: 'Bivalyrezervátum', p: 350 }]} note="Mennyibe kerül a kettő együtt?" />,
    question: 'Az egyik belépő 450 Ft, a másik 350 Ft. Mennyibe kerül a két belépő együtt?',
    options: ['800 Ft', '700 Ft', '900 Ft', '100 Ft'],
    correctAnswer: 0,
    explanation: '450 + 350 = 450 + 50 + 300 = 500 + 300 = 800 Ft.'
  },
  {
    id: 'as1000-q10',
    level: 1,
    questionTypeBadge: 'Fejben kivonás',
    question: 'Mennyi 100 − 20?',
    options: ['80', '120', '98', '60'],
    correctAnswer: 0,
    explanation: '10 tízesből elveszünk 2 tízest, marad 8 tízes: 80.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'as1000-q11',
    level: 2,
    questionTypeBadge: 'Fejben összeadás',
    question: 'Mennyi 340 + 390?',
    options: ['730', '630', '740', '620'],
    correctAnswer: 0,
    explanation: '340 + 300 = 640, majd 640 + 90 = 730.'
  },
  {
    id: 'as1000-q12',
    level: 2,
    questionTypeBadge: 'Fejben kivonás',
    figure: <QJumps from={100} to={450} start={420} jumps={[-200, -90]} labels={[100, 200, 300, 400]} />,
    question: 'Mennyi 420 − 290? (Először 200-at, aztán 90-et ugorj vissza!)',
    options: ['130', '230', '170', '140'],
    correctAnswer: 0,
    explanation: '420 − 200 = 220, majd 220 − 90 = 130.'
  },
  {
    id: 'as1000-q13',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg a 448 + 263 összegét százasra kerekített értékekkel!',
    options: ['700', '600', '800', '711'],
    correctAnswer: 0,
    explanation: '448 ≈ 400 és 263 ≈ 300. A becslés: 400 + 300 = 700. (A 711 a pontos összeg, nem a becslés.)'
  },
  {
    id: 'as1000-q14',
    level: 2,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <QColumn top="448" bottom="263" result="???" sign="+" />,
    question: 'Számold ki írásban: 448 + 263 = ?',
    options: ['711', '601', '611', '701'],
    correctAnswer: 0,
    explanation: 'Egyesek: 8 + 3 = 11, leírom az 1-et, maradt 1. Tízesek: 4 + 6 + 1 = 11, leírom az 1-et, maradt 1. Százasok: 4 + 2 + 1 = 7. Eredmény: 711.'
  },
  {
    id: 'as1000-q15',
    level: 2,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QColumn top="931" bottom="456" result="???" sign="−" />,
    question: 'Számold ki írásban: 931 − 456 = ?',
    options: ['475', '525', '485', '585'],
    correctAnswer: 0,
    explanation: '6 meg mennyi a 11? 5, maradt 1. 5 + 1 = 6, 6 meg mennyi a 13? 7, maradt 1. 4 + 1 = 5, 5 meg mennyi a 9? 4. Eredmény: 475.'
  },
  {
    id: 'as1000-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám hiányzik? □ + 250 = 520',
    options: ['270', '770', '370', '230'],
    correctAnswer: 0,
    explanation: 'Kivonással kapjuk meg: 520 − 250 = 270. Ellenőrzés: 270 + 250 = 520.'
  },
  {
    id: 'as1000-q17',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám hiányzik? 620 − □ = 370',
    options: ['250', '990', '350', '150'],
    correctAnswer: 0,
    explanation: '620 − 370 = 250. Ellenőrzés: 620 − 250 = 370.'
  },
  {
    id: 'as1000-q18',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik művelettel ellenőrizheted, hogy 931 − 456 = 475 jó-e?',
    options: ['475 + 456', '931 + 456', '475 − 456', '931 + 475'],
    correctAnswer: 0,
    explanation: 'A különbséghez hozzáadjuk a kivonandót, és a kisebbítendőt kell kapnunk: 475 + 456 = 931.'
  },
  {
    id: 'as1000-q19',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QTickets rows={[{ t: 'délelőtt', n: 540 }, { t: 'délután', n: 280 }, { t: 'este', n: 120 }]} />,
    question: 'A strandra délelőtt 540, délután 280, este 120 jegyet adtak el. Hány látogató volt aznap?',
    options: ['940', '840', '820', '1040'],
    correctAnswer: 0,
    explanation: '540 + 280 = 820, majd 820 + 120 = 940 látogató.'
  },
  {
    id: 'as1000-q20',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy iskola 450 tanulója közül 170-en táboroztak nyáron. Hányan nem voltak táborban?',
    options: ['280', '620', '380', '220'],
    correctAnswer: 0,
    explanation: '450 − 170 = 450 − 100 − 70 = 350 − 70 = 280 gyerek nem táborozott.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'as1000-q21',
    level: 3,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <QColumn top="476" bottom="295" result="???" sign="+" />,
    question: 'A gyülekezőhelyen 476 fecske ült, még 295 leszállt melléjük. Hány fecske van ott most?',
    options: ['771', '661', '671', '761'],
    correctAnswer: 0,
    explanation: '6 + 5 = 11 → 1, maradt 1. 7 + 9 + 1 = 17 → 7, maradt 1. 4 + 2 + 1 = 7. Tehát 771 fecske.'
  },
  {
    id: 'as1000-q22',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik számra gondoltam? A 328 és a 129 összegénél 415-tel nagyobb.',
    options: ['872', '457', '862', '544'],
    correctAnswer: 0,
    explanation: 'Először az összeg: 328 + 129 = 457. Ennél 415-tel nagyobb: 457 + 415 = 872.'
  },
  {
    id: 'as1000-q23',
    level: 3,
    questionTypeBadge: 'Vásárlás',
    figure: (
      <QPrices
        items={[{ n: 'Plakát', p: 290 }, { n: 'Könyv', p: 530 }, { n: 'Képeslap', p: 70 }, { n: 'Kitűző', p: 80 }, { n: 'Mágnes', p: 450 }]}
        note="Dávidnak 1000 Ft-ja van."
      />
    ),
    question: 'Dávid plakátot, hűtőmágnest és képeslapot vett 1000 Ft-ból. Mennyi pénze maradt?',
    options: ['190 Ft', '810 Ft', '290 Ft', '210 Ft'],
    correctAnswer: 0,
    explanation: 'A vásárlás: 290 + 450 + 70 = 810 Ft. Maradt: 1000 − 810 = 190 Ft.'
  },
  {
    id: 'as1000-q24',
    level: 3,
    questionTypeBadge: 'Vásárlás',
    figure: (
      <QPrices
        items={[{ n: 'Plakát', p: 290 }, { n: 'Könyv', p: 530 }, { n: 'Képeslap', p: 70 }, { n: 'Kitűző', p: 80 }, { n: 'Mágnes', p: 450 }]}
        note="Melyik hármat NEM tudja megvenni 1000 Ft-ból?"
      />
    ),
    question: 'Melyik három ajándékot NEM tudja megvenni Dávid 1000 Ft-ból?',
    options: ['könyv, hűtőmágnes, kitűző', 'plakát, könyv, kitűző', 'plakát, hűtőmágnes, kitűző', 'plakát, könyv, képeslap'],
    correctAnswer: 0,
    explanation: '530 + 450 + 80 = 1060 Ft, ez több 1000-nél. A többi: 900 Ft, 820 Ft és 890 Ft – ezekre van elég pénze.'
  },
  {
    id: 'as1000-q25',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám teszi igazzá? 370 + 100 − 350 > □',
    options: ['119', '120', '121', '820'],
    correctAnswer: 0,
    explanation: 'Bal oldal: 370 + 100 = 470, 470 − 350 = 120. A □ helyére 120-nál kisebb szám kell, ezek közül a 119.'
  },
  {
    id: 'as1000-q26',
    level: 3,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QColumn top="952" bottom="786" result="???" sign="−" />,
    question: 'Számold ki írásban: 952 − 786 = ?',
    options: ['166', '234', '176', '266'],
    correctAnswer: 0,
    explanation: '6 meg mennyi a 12? 6, maradt 1. 8 + 1 = 9, 9 meg mennyi a 15? 6, maradt 1. 7 + 1 = 8, 8 meg mennyi a 9? 1. Eredmény: 166.'
  },
  {
    id: 'as1000-q27',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A túrázók 940 m hosszú úton mennek a forráshoz. Már megtettek 780 m-t. Milyen messze van még a forrás?',
    options: ['160 m', '1720 m', '260 m', '240 m'],
    correctAnswer: 0,
    explanation: 'A hátralévő út: 940 − 780 = 160 m. (780 + 160 = 940 ✔)'
  },
  {
    id: 'as1000-q28',
    level: 3,
    questionTypeBadge: 'Kivonás 1000-ből',
    figure: <QColumn top="1000" bottom="657" result="???" sign="−" />,
    question: 'Bence a 1000 − 657 kivonás eredményét kereste a plakáton. Melyik számot találta?',
    options: ['343', '443', '353', '457'],
    correctAnswer: 0,
    explanation: '657 + 343 = 1000, tehát 1000 − 657 = 343. Pótolj: 657 + 3 = 660, + 40 = 700, + 300 = 1000.'
  },
  {
    id: 'as1000-q29',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'A legkisebb háromjegyű páratlan szám és a 648 összegénél 87-tel nagyobb számra gondoltam. Melyik ez?',
    options: ['836', '835', '749', '846'],
    correctAnswer: 0,
    explanation: 'A legkisebb háromjegyű páratlan szám a 101. 101 + 648 = 749, és 749 + 87 = 836.'
  },
  {
    id: 'as1000-q30',
    level: 3,
    questionTypeBadge: 'Gondolkodtató',
    figure: <QBarrel />,
    question: 'Egy 650 literes hordóban 410 liter víz van. Beleöntünk még 320 litert. Mennyi víz lesz a hordóban?',
    options: ['650 liter, a többi kifolyik', '730 liter', '320 liter', '240 liter'],
    correctAnswer: 0,
    explanation: '410 + 320 = 730 liter lenne, de a hordóba csak 650 liter fér. Ezért 650 liter lesz benne, 80 liter kifolyik.'
  }
];

export const AddSub1000Quiz: React.FC<{
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
      topicId="g4-count-osszeadas-1000-quiz"
      subtopicId="osszeadas-kivonas-1000-ig"
      title="2. Összeadás és kivonás 1000-ig – Kvíz"
      subtitle="30 feladat 3 szinten: fejben számolás, becslés, írásbeli összeadás és kivonás, szöveges feladatok."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      questions={ADDSUB_1000_QUESTIONS}
      cheatSheets={[
        {
          title: 'Fejben számolás',
          items: [
            'Bontsd részekre: 250 + 170 = 250 + 100 + 70 = 420',
            'Kivonásnál is: 450 − 170 = 450 − 100 − 70 = 280',
            'Kiegészítés 1000-re: 730 + 270 = 1000',
            'Kerek százasok: 2 százas + 8 százas = 1000'
          ]
        },
        {
          title: 'Írásbeli összeadás és kivonás',
          items: [
            'Becsülj százasra kerekítve: 448 + 263 ≈ 400 + 300 = 700',
            'Helyi érték szerint írd egymás alá, kezdd az egyesekkel!',
            'Az átvitelt (maradékot) vidd tovább a következő helyre.',
            'Kivonás pótlással: „6 meg mennyi a 11? 5, maradt 1.”'
          ]
        },
        {
          title: 'Nevek és ellenőrzés',
          items: [
            'tag + tag = összeg',
            'kisebbítendő − kivonandó = különbség',
            'Összeadás ellenőrzése: cseréld fel a tagokat!',
            'Kivonás ellenőrzése: különbség + kivonandó = kisebbítendő'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AddSub1000Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AddSub1000Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default AddSub1000Quiz;
