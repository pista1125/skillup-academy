import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenOpsExamMatcher } from './WrittenOpsExamMatcher';
import { WrittenOpsExamSorter } from './WrittenOpsExamSorter';
import { ColumnOp, MulLayout, ShortDivLayout } from './WrittenOpsExamFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const QAdd: React.FC<{ a: string; b: string; r?: string; op?: '+' | '−' }> = ({ a, b, r = '????', op = '+' }) => (
  <ColumnOp rows={[a, b]} op={op} result={r} className="w-full max-w-[220px] h-auto mx-auto" />
);

const QMul: React.FC<{ a: string; b: string; r?: string }> = ({ a, b, r = '????' }) => (
  <MulLayout a={a} b={b} result={r} className="w-full max-w-[220px] h-auto mx-auto" />
);

const QDiv: React.FC<{ n: number; d: number }> = ({ n, d }) => (
  <ShortDivLayout dividend={n} divisor={d} showQuotient={false} showRows={false} className="w-full max-w-[240px] h-auto mx-auto" />
);

/** Műveletsor-kártya, a jelek lilák, a zárójel narancs. */
const QExpr: React.FC<{ expr: string; tail?: string }> = ({ expr, tail = '= ?' }) => {
  const toks = expr.replace(/\(/g, '( ').replace(/\)/g, ' )').split(' ').filter(Boolean);
  const widths = toks.map((t) => (t.length <= 1 ? 12 : t.length * 10 + 4));
  const total = widths.reduce((a, b) => a + b, 0) + (tail ? 40 : 0);
  const scale = Math.min(1, 222 / total);
  let x = 120 - (total * scale) / 2;
  return (
    <QFig h={70}>
      {toks.map((t, i) => {
        const w = widths[i] * scale;
        const cx = x + w / 2;
        x += w;
        const isOp = ['+', '−', '·', ':'].includes(t);
        const isPar = t === '(' || t === ')';
        return (
          <text key={i} x={cx} y="42" textAnchor="middle" fontSize={18 * Math.max(scale, 0.7)} fontWeight="bold" fill={isOp ? '#7c3aed' : isPar ? '#ea580c' : t.includes('□') ? C_UNK : '#0f172a'}>
            {t}
          </text>
        );
      })}
      {tail && (
        <text x={x + 20 * scale} y="42" textAnchor="middle" fontSize={18 * Math.max(scale, 0.7)} fontWeight="bold" fill={C_UNK}>
          {tail}
        </text>
      )}
    </QFig>
  );
};

/** Kétsoros táblázat; a „?” piros. */
const QTable: React.FC<{ top: string; bottom: string; tops: string[]; bottoms: string[] }> = ({ top, bottom, tops, bottoms }) => {
  const lw = 84;
  const cw = Math.min(42, (226 - lw) / tops.length);
  return (
    <QFig h={96}>
      <g transform="translate(7 14)">
        <rect x="0" y="0" width={lw} height="34" fill="#ffe4e6" stroke="#be123c" />
        <rect x="0" y="34" width={lw} height="34" fill="#ffe4e6" stroke="#be123c" />
        <text x={lw / 2} y="21" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#881337">{top}</text>
        <text x={lw / 2} y="55" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#881337">{bottom}</text>
        {tops.map((t, i) => (
          <g key={i}>
            <rect x={lw + i * cw} y="0" width={cw} height="34" fill="#ffffff" stroke="#be123c" />
            <rect x={lw + i * cw} y="34" width={cw} height="34" fill="#ffffff" stroke="#be123c" />
            <text x={lw + i * cw + cw / 2} y="21" textAnchor="middle" fontSize="11" fontWeight="bold" fill={t === '?' ? C_UNK : '#0f172a'}>{t}</text>
            <text x={lw + i * cw + cw / 2} y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill={bottoms[i] === '?' ? C_UNK : '#0f172a'}>{bottoms[i]}</text>
          </g>
        ))}
      </g>
    </QFig>
  );
};

/** Nyíllánc. */
const QChain: React.FC<{ boxes: string[]; ops: string[] }> = ({ boxes, ops }) => {
  const n = boxes.length;
  const bw = 52;
  const gap = (220 - n * bw) / (n - 1);
  const xs = boxes.map((_, i) => 10 + i * (bw + gap));
  return (
    <QFig h={74}>
      {boxes.map((b, i) => {
        const unk = b.includes('?');
        return (
          <g key={i}>
            <rect x={xs[i]} y="32" width={bw} height="26" rx="13" fill={unk ? '#fee2e2' : '#ffe4e6'} stroke={unk ? C_UNK : '#be123c'} strokeWidth="1.5" />
            <text x={xs[i] + bw / 2} y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill={unk ? C_UNK : '#0f172a'}>{b}</text>
            {i < n - 1 && (
              <g>
                <line x1={xs[i] + bw + 2} y1="45" x2={xs[i + 1] - 4} y2="45" stroke="#be123c" strokeWidth="1.6" />
                <polygon points={`${xs[i + 1] - 2},45 ${xs[i + 1] - 8},41 ${xs[i + 1] - 8},49`} fill="#be123c" />
                <text x={(xs[i] + bw + xs[i + 1]) / 2} y="26" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#881337">{ops[i]}</text>
              </g>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

/** Halmazábra „?” jelölt helyekkel. */
const QVenn: React.FC = () => (
  <QFig h={130}>
    <ellipse cx="92" cy="70" rx="70" ry="48" fill="#60a5fa" opacity="0.35" stroke="#1d4ed8" strokeWidth="1.5" />
    <ellipse cx="148" cy="70" rx="70" ry="48" fill="#f472b6" opacity="0.35" stroke="#be185d" strokeWidth="1.5" />
    <text x="60" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1d4ed8">2 többszöröse</text>
    <text x="182" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be185d">5 többszöröse</text>
    <text x="120" y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill={C_UNK}>?</text>
    <text x="60" y="76" textAnchor="middle" fontSize="11" fill="#0f172a">7656</text>
    <text x="182" y="76" textAnchor="middle" fontSize="11" fill="#0f172a">2965</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések – 1. szint (30)
// ---------------------------------------------------------------------------
const L1: QuizQuestion[] = [
  {
    id: 'ex-q1',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    figure: <QAdd a="3845" b="2850" />,
    question: 'Laci vonatjegye 3845 Ft, hajójegye 2850 Ft. Mennyi az útiköltsége összesen?',
    options: ['6695 Ft', '5695 Ft', '6795 Ft', '6605 Ft'],
    correctAnswer: 0,
    explanation: '5 + 0 = 5; 4 + 5 = 9; 8 + 8 = 16, leírom a 6-ot, marad 1; 3 + 2 + 1 = 6. Az eredmény 6695 Ft.'
  },
  {
    id: 'ex-q2',
    level: 1,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QAdd a="7212" b="5410" op="−" />,
    question: 'Mennyi 7212 − 5410?',
    options: ['1802', '2202', '1812', '2802'],
    correctAnswer: 0,
    explanation: '0 meg 2 az 2; 1 meg 0 az 1; 4 meg 8 az 12, marad 1; 5 + 1 = 6, 6 meg 1 az 7. Az eredmény 1802. Ellenőrzés: 1802 + 5410 = 7212.'
  },
  {
    id: 'ex-q3',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg a 3845 + 2850 összeget százasra kerekített értékekkel!',
    options: ['3800 + 2900 = 6700', '4000 + 3000 = 7000', '3800 + 2800 = 6600', '3900 + 2900 = 6800'],
    correctAnswer: 0,
    explanation: '3845 ≈ 3800 (a 45 kevesebb 50-nél), 2850 ≈ 2900 (az 50-et felfelé kerekítjük). 3800 + 2900 = 6700.'
  },
  {
    id: 'ex-q4',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    question: 'Melyik számra gondoltam? A 2346 és az 5428 összege.',
    options: ['7774', '7764', '7674', '3082'],
    correctAnswer: 0,
    explanation: '6 + 8 = 14, leírom a 4-et, marad 1; 4 + 2 + 1 = 7; 3 + 4 = 7; 2 + 5 = 7. Az összeg 7774.'
  },
  {
    id: 'ex-q5',
    level: 1,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QAdd a="8256" b="4324" op="−" />,
    question: 'Melyik számra gondoltam? A 8256 és a 4324 különbsége.',
    options: ['3932', '4132', '3832', '3942'],
    correctAnswer: 0,
    explanation: '4 meg 2 az 6; 2 meg 3 az 5; 3 meg 9 az 12, marad 1; 4 + 1 = 5, 5 meg 3 az 8. A különbség 3932.'
  },
  {
    id: 'ex-q6',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="1623" b="2" />,
    question: 'Egy hajón 1623 kétszemélyes kabin van. Legfeljebb hány személy lakhat bennük?',
    options: ['3246', '2246', '3226', '3446'],
    correctAnswer: 0,
    explanation: '2 · 3 = 6; 2 · 2 = 4; 2 · 6 = 12, leírom a 2-t, marad 1; 2 · 1 = 2, + 1 = 3. Tehát 3246 személy.'
  },
  {
    id: 'ex-q7',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="1346" b="4" />,
    question: 'Melyik számra gondoltam? Az 1346 négyszerese.',
    options: ['5384', '4264', '5374', '5484'],
    correctAnswer: 0,
    explanation: '4 · 6 = 24 (4, marad 2); 4 · 4 = 16, + 2 = 18 (8, marad 1); 4 · 3 = 12, + 1 = 13 (3, marad 1); 4 · 1 = 4, + 1 = 5. Az eredmény 5384.'
  },
  {
    id: 'ex-q8',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Melyik számra gondoltam? A 297 és a 9 szorzata.',
    options: ['2673', '2663', '2573', '2683'],
    correctAnswer: 0,
    explanation: '9 · 7 = 63 (3, marad 6); 9 · 9 = 81, + 6 = 87 (7, marad 8); 9 · 2 = 18, + 8 = 26. Az eredmény 2673.'
  },
  {
    id: 'ex-q9',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Melyik a jó becslés az 1623 · 2 szorzatra (a szorzandót százasra kerekítve)?',
    options: ['1600 · 2 = 3200', '1700 · 2 = 3400', '2000 · 2 = 4000', '1600 + 2 = 1602'],
    correctAnswer: 0,
    explanation: '1623 ≈ 1600, mert a 23 kevesebb 50-nél. 1600 · 2 = 3200 – a pontos 3246 közel van hozzá.'
  },
  {
    id: 'ex-q10',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="2324" b="3" />,
    question: 'Mennyi 2324 · 3?',
    options: ['6972', '6962', '6672', '6982'],
    correctAnswer: 0,
    explanation: '3 · 4 = 12 (2, marad 1); 3 · 2 = 6, + 1 = 7; 3 · 3 = 9; 3 · 2 = 6. Az eredmény 6972.'
  },
  {
    id: 'ex-q11',
    level: 1,
    questionTypeBadge: 'Írásbeli osztás',
    figure: <QDiv n={3693} d={3} />,
    question: 'Mennyi 3693 : 3?',
    options: ['1231', '1213', '1331', '1232'],
    correctAnswer: 0,
    explanation: '3 E : 3 = 1 E; 6 sz : 3 = 2 sz; 9 t : 3 = 3 t; 3 e : 3 = 1 e. A hányados 1231. Ellenőrzés: 1231 · 3 = 3693.'
  },
  {
    id: 'ex-q12',
    level: 1,
    questionTypeBadge: 'Írásbeli osztás',
    figure: <QDiv n={2872} d={2} />,
    question: 'A tolltartó 2872 Ft, a festék feleannyiba kerül. Mennyibe kerül a festék?',
    options: ['1436 Ft', '1416 Ft', '1446 Ft', '1336 Ft'],
    correctAnswer: 0,
    explanation: '2 : 2 = 1; 8 : 2 = 4; 7 : 2 = 3, marad 1; 12 : 2 = 6. A festék 1436 Ft.'
  },
  {
    id: 'ex-q13',
    level: 1,
    questionTypeBadge: 'Osztás bontással',
    question: '2820 : 2 = 2000 : 2 + 800 : 2 + 20 : 2. Mennyi az eredmény?',
    options: ['1410', '141', '1401', '1420'],
    correctAnswer: 0,
    explanation: '2000 : 2 = 1000, 800 : 2 = 400, 20 : 2 = 10. Együtt 1000 + 400 + 10 = 1410.'
  },
  {
    id: 'ex-q14',
    level: 1,
    questionTypeBadge: 'Maradékos osztás',
    figure: <QDiv n={224} d={3} />,
    question: 'Egy 224 cm-es szalagot 3 egyenlő részre vágunk. Hány cm egy rész, és mennyi marad?',
    options: ['74 cm, marad 2 cm', '74 cm, marad 1 cm', '75 cm, nem marad semmi', '7 cm, marad 4 cm'],
    correctAnswer: 0,
    explanation: '22 : 3 = 7, marad 1; 14 : 3 = 4, marad 2. Tehát 74 cm, marad 2 cm. Ellenőrzés: 74 · 3 + 2 = 224.'
  },
  {
    id: 'ex-q15',
    level: 1,
    questionTypeBadge: 'Írásbeli osztás',
    figure: <QDiv n={3150} d={3} />,
    question: 'A diákjegy 3150 Ft harmada. Mennyi ez?',
    options: ['1050 Ft', '105 Ft', '1005 Ft', '1150 Ft'],
    correctAnswer: 0,
    explanation: '3 : 3 = 1; 1 : 3 = 0, marad 1 (ide 0 kerül!); 15 : 3 = 5; 0 : 3 = 0. A hányados 1050.'
  },
  {
    id: 'ex-q16',
    level: 1,
    questionTypeBadge: 'Többszörösök',
    question: 'Melyik szám többszöröse a 2-nek?',
    options: ['7602', '4561', '2965', '2983'],
    correctAnswer: 0,
    explanation: 'A 2 többszörösei a páros számok: 0-ra, 2-re, 4-re, 6-ra vagy 8-ra végződnek. A 7602 2-re végződik.'
  },
  {
    id: 'ex-q17',
    level: 1,
    questionTypeBadge: 'Többszörösök',
    question: 'Melyik szám többszöröse az 5-nek?',
    options: ['2865', '5218', '7602', '4561'],
    correctAnswer: 0,
    explanation: 'Az 5 többszörösei 0-ra vagy 5-re végződnek. A 2865 5-re végződik.'
  },
  {
    id: 'ex-q18',
    level: 1,
    questionTypeBadge: 'Többszörösök',
    figure: <QVenn />,
    question: 'Melyik szám kerül a halmazábra közös részébe (a 2-nek és az 5-nek is többszöröse)?',
    options: ['4310', '2965', '7656', '4561'],
    correctAnswer: 0,
    explanation: 'A 2-nek és az 5-nek is többszöröse a 0-ra végződő szám: 4310. (A 2965 csak az 5-nek, a 7656 csak a 2-nek többszöröse.)'
  },
  {
    id: 'ex-q19',
    level: 1,
    questionTypeBadge: 'Következtetés',
    figure: <QTable top="Gyerekek (fő)" bottom="Jegyek ára (Ft)" tops={['1', '4']} bottoms={['325', '?']} />,
    question: 'Egy vonatjegy 325 Ft. Mennyit fizet 4 gyerek összesen?',
    options: ['1300 Ft', '329 Ft', '1200 Ft', '975 Ft'],
    correctAnswer: 0,
    explanation: '4 jegy ára 4 · 325 Ft = 1300 Ft.'
  },
  {
    id: 'ex-q20',
    level: 1,
    questionTypeBadge: 'Következtetés',
    figure: <QTable top="Idő (perc)" bottom="Fordulat" tops={['1', '3']} bottoms={['1850', '?']} />,
    question: 'A propeller percenként 1850 fordulatot tesz. Hányat fordul 3 perc alatt?',
    options: ['5550', '1853', '3700', '5450'],
    correctAnswer: 0,
    explanation: '3 perc alatt háromszor annyit: 3 · 1850 = 5550.'
  },
  {
    id: 'ex-q21',
    level: 1,
    questionTypeBadge: 'Következtetés',
    question: '240 palántát 4 kertész ültet el egyenlően. Hány palántát ültet egy kertész?',
    options: ['60', '960', '236', '80'],
    correctAnswer: 0,
    explanation: 'Négyen osztoznak a munkán: 240 : 4 = 60 palánta jut egy kertészre.'
  },
  {
    id: 'ex-q22',
    level: 1,
    questionTypeBadge: 'Egyenlő hányados',
    question: 'Melyik osztás eredménye ugyanannyi, mint a 12 : 4-é?',
    options: ['120 : 40', '120 : 4', '12 : 40', '1200 : 4'],
    correctAnswer: 0,
    explanation: 'Az osztandót és az osztót is tízszeresére növeltük, így a hányados nem változik: 120 : 40 = 3 = 12 : 4.'
  },
  {
    id: 'ex-q23',
    level: 1,
    questionTypeBadge: 'Hiányzó szám',
    figure: <QExpr expr="□ − 2223 = 3229" tail="" />,
    question: 'Melyik szám kerül a □ helyére? □ − 2223 = 3229',
    options: ['5452', '1006', '5442', '5352'],
    correctAnswer: 0,
    explanation: 'A kisebbítendőt összeadással kapjuk: 3229 + 2223 = 5452. Ellenőrzés: 5452 − 2223 = 3229.'
  },
  {
    id: 'ex-q24',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Hogyan ellenőrzöd a 3693 : 3 = 1231 osztást?',
    options: ['1231 · 3 = 3693', '3693 · 3', '1231 : 3', '3693 − 1231'],
    correctAnswer: 0,
    explanation: 'Az osztást szorzással ellenőrizzük: a hányadost megszorozzuk az osztóval, és az osztandót kell kapnunk.'
  },
  {
    id: 'ex-q25',
    level: 1,
    questionTypeBadge: 'Összevonás',
    figure: <QChain boxes={['9426', '4713', '1571']} ops={[': 2', ': 3']} />,
    question: 'Előbb 2-vel, aztán 3-mal osztunk. Melyik egyetlen osztás adja ugyanezt?',
    options: [': 6', ': 5', '· 6', ': 1'],
    correctAnswer: 0,
    explanation: 'A felének a harmada a hatoda: 2 · 3 = 6. Valóban 9426 : 6 = 1571.'
  },
  {
    id: 'ex-q26',
    level: 1,
    questionTypeBadge: 'Hiányzó szám',
    figure: <QExpr expr="2624 + □ = 4251" tail="" />,
    question: 'Melyik szám kerül a □ helyére? 2624 + □ = 4251',
    options: ['1627', '6875', '1637', '2627'],
    correctAnswer: 0,
    explanation: 'A hiányzó tagot kivonással kapjuk: 4251 − 2624 = 1627. Ellenőrzés: 2624 + 1627 = 4251.'
  },
  {
    id: 'ex-q27',
    level: 1,
    questionTypeBadge: 'Műveletek sorrendje',
    figure: <QExpr expr="3564 − 215 · 2" />,
    question: 'Mennyi 3564 − 215 · 2?',
    options: ['3134', '6698', '3349', '3144'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 215 · 2 = 430. Utána 3564 − 430 = 3134.'
  },
  {
    id: 'ex-q28',
    level: 1,
    questionTypeBadge: 'Műveletek sorrendje',
    figure: <QExpr expr="8456 − 2158 + 1325" />,
    question: 'Mennyi 8456 − 2158 + 1325?',
    options: ['7623', '4973', '7613', '6298'],
    correctAnswer: 0,
    explanation: 'Csak kivonás és összeadás van, balról jobbra: 8456 − 2158 = 6298, 6298 + 1325 = 7623.'
  },
  {
    id: 'ex-q29',
    level: 1,
    questionTypeBadge: 'Műveletek sorrendje',
    figure: <QExpr expr="3 · (8346 − 7659)" />,
    question: 'Mennyi 3 · (8346 − 7659)?',
    options: ['2061', '687', '2051', '1961'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 8346 − 7659 = 687. Utána 3 · 687 = 2061.'
  },
  {
    id: 'ex-q30',
    level: 1,
    questionTypeBadge: 'Műveletek sorrendje',
    question: 'Melyik műveletet végzed el először a 9572 − 1416 · 5 műveletsorban?',
    options: ['1416 · 5', '9572 − 1416', 'balról az elsőt', '9572 · 5'],
    correctAnswer: 0,
    explanation: 'A szorzás megelőzi a kivonást, ezért először 1416 · 5 = 7080, utána 9572 − 7080 = 2492.'
  }
];

// ---------------------------------------------------------------------------
// Kérdések – 2. szint (30)
// ---------------------------------------------------------------------------
const L2: QuizQuestion[] = [
  {
    id: 'ex-q31',
    level: 2,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QAdd a="6300" b="3649" op="−" />,
    question: 'Mennyi 6300 − 3649?',
    options: ['2651', '3349', '2751', '2661'],
    correctAnswer: 0,
    explanation: '9 meg 1 az 10, marad 1; 4 + 1 = 5, 5 meg 5 az 10, marad 1; 6 + 1 = 7, 7 meg 6 az 13, marad 1; 3 + 1 = 4, 4 meg 2 az 6. Az eredmény 2651.'
  },
  {
    id: 'ex-q32',
    level: 2,
    questionTypeBadge: 'Írásbeli kivonás',
    figure: <QAdd a="8000" b="2873" op="−" />,
    question: 'Mennyi 8000 − 2873?',
    options: ['5127', '6237', '5137', '5227'],
    correctAnswer: 0,
    explanation: '3 meg 7 az 10, marad 1; 8 meg 2 az 10, marad 1; 9 meg 1 az 10, marad 1; 3 meg 5 az 8. Az eredmény 5127. Ellenőrzés: 5127 + 2873 = 8000.'
  },
  {
    id: 'ex-q33',
    level: 2,
    questionTypeBadge: 'Írásbeli kivonás',
    question: 'Mennyi 9007 − 2879?',
    options: ['6128', '7872', '6138', '6228'],
    correctAnswer: 0,
    explanation: '9 meg 8 az 17, marad 1; 8 meg 2 az 10, marad 1; 9 meg 1 az 10, marad 1; 3 meg 6 az 9. Az eredmény 6128.'
  },
  {
    id: 'ex-q34',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <QExpr expr="7548 − □ = 2319" tail="" />,
    question: 'Melyik szám kerül a □ helyére? 7548 − □ = 2319',
    options: ['5229', '9867', '5239', '5329'],
    correctAnswer: 0,
    explanation: 'A kivonandót kivonással kapjuk: 7548 − 2319 = 5229. Ellenőrzés: 7548 − 5229 = 2319.'
  },
  {
    id: 'ex-q35',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A Tisza a szabályozás előtt 1419 km hosszú volt, ma 962 km. Hány kilométerrel lett rövidebb?',
    options: ['457 km-rel', '557 km-rel', '543 km-rel', '2381 km-rel'],
    correctAnswer: 0,
    explanation: '1419 − 962 = 457. A Tisza 457 km-rel lett rövidebb.'
  },
  {
    id: 'ex-q36',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="2549" b="3" />,
    question: 'Mennyi 2549 · 3?',
    options: ['7647', '6527', '7637', '7547'],
    correctAnswer: 0,
    explanation: '3 · 9 = 27 (7, marad 2); 3 · 4 = 12, + 2 = 14 (4, marad 1); 3 · 5 = 15, + 1 = 16 (6, marad 1); 3 · 2 = 6, + 1 = 7. Az eredmény 7647.'
  },
  {
    id: 'ex-q37',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul a="956" b="9" />,
    question: 'Mennyi 956 · 9?',
    options: ['8604', '8504', '8614', '8154'],
    correctAnswer: 0,
    explanation: '9 · 6 = 54 (4, marad 5); 9 · 5 = 45, + 5 = 50 (0, marad 5); 9 · 9 = 81, + 5 = 86. Az eredmény 8604.'
  },
  {
    id: 'ex-q38',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy múzeumba naponta 1244 látogató érkezik. Hányan jönnek 3 nap alatt?',
    options: ['3732', '3632', '3722', '3742'],
    correctAnswer: 0,
    explanation: '3 · 1244: 3 · 4 = 12 (2, marad 1); 3 · 4 = 12, + 1 = 13 (3, marad 1); 3 · 2 = 6, + 1 = 7; 3 · 1 = 3. Összesen 3732 látogató.'
  },
  {
    id: 'ex-q39',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Mennyi a 4718 kétszerese?',
    options: ['9436', '8436', '9426', '9416'],
    correctAnswer: 0,
    explanation: '2 · 8 = 16 (6, marad 1); 2 · 1 = 2, + 1 = 3; 2 · 7 = 14 (4, marad 1); 2 · 4 = 8, + 1 = 9. Az eredmény 9436.'
  },
  {
    id: 'ex-q40',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A moziteremben 295 hely van, és naponta 2 telt házas vetítés volt. Hány jegyet adtak el 3 nap alatt?',
    options: ['1770', '885', '590', '1180'],
    correctAnswer: 0,
    explanation: '3 nap alatt 3 · 2 = 6 vetítés volt. 6 · 295 = 1770 jegy.'
  },
  {
    id: 'ex-q41',
    level: 2,
    questionTypeBadge: 'Maradékos osztás',
    figure: <QDiv n={7319} d={4} />,
    question: 'Mennyi 7319 : 4, és mennyi a maradék?',
    options: ['1829, marad 3', '1829, marad 1', '1828, marad 7', '1839, marad 3'],
    correctAnswer: 0,
    explanation: '7 : 4 = 1, marad 3; 33 : 4 = 8, marad 1; 11 : 4 = 2, marad 3; 39 : 4 = 9, marad 3. Ellenőrzés: 1829 · 4 + 3 = 7319.'
  },
  {
    id: 'ex-q42',
    level: 2,
    questionTypeBadge: 'Írásbeli osztás',
    question: 'Mennyi az 5840 ötöde?',
    options: ['1168', '1068', '1178', '1160'],
    correctAnswer: 0,
    explanation: '5 : 5 = 1; 8 : 5 = 1, marad 3; 34 : 5 = 6, marad 4; 40 : 5 = 8. Az eredmény 1168.'
  },
  {
    id: 'ex-q43',
    level: 2,
    questionTypeBadge: 'Írásbeli osztás',
    figure: <QDiv n={734} d={2} />,
    question: 'A busz 734 m-t tett meg, ennek felénél megállt. Hány méternél állt meg?',
    options: ['367 m-nél', '357 m-nél', '377 m-nél', '732 m-nél'],
    correctAnswer: 0,
    explanation: '7 : 2 = 3, marad 1; 13 : 2 = 6, marad 1; 14 : 2 = 7. Az eredmény 367 m.'
  },
  {
    id: 'ex-q44',
    level: 2,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Mennyi 9277 : 8, és mennyi a maradék?',
    options: ['1159, marad 5', '1159, marad 3', '1158, marad 13', '1169, marad 5'],
    correctAnswer: 0,
    explanation: '9 : 8 = 1, marad 1; 12 : 8 = 1, marad 4; 47 : 8 = 5, marad 7; 77 : 8 = 9, marad 5. Ellenőrzés: 1159 · 8 + 5 = 9277.'
  },
  {
    id: 'ex-q45',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A Béke-barlang 7182 m hosszú. Mennyi a hosszának a harmada?',
    options: ['2394 m', '2384 m', '2494 m', '7179 m'],
    correctAnswer: 0,
    explanation: '7 : 3 = 2, marad 1; 11 : 3 = 3, marad 2; 28 : 3 = 9, marad 1; 12 : 3 = 4. Az eredmény 2394 m.'
  },
  {
    id: 'ex-q46',
    level: 2,
    questionTypeBadge: 'Többszörösök',
    question: 'Mely számjegyek kerülhetnek a 345■ szám végére, hogy az 5 többszöröse legyen?',
    options: ['0 vagy 5', 'csak az 5', '0, 2, 4, 6 vagy 8', 'bármelyik számjegy'],
    correctAnswer: 0,
    explanation: 'Az 5 többszörösei 0-ra vagy 5-re végződnek: 3450 és 3455.'
  },
  {
    id: 'ex-q47',
    level: 2,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik állítás HAMIS?',
    options: [
      'Nincs a 2 többszörösei között olyan szám, amely az 5-nek is többszöröse.',
      'Minden páros szám a 2 többszöröse.',
      'Ha egy szám 0-ra végződik, akkor a 2-nek, az 5-nek és a 10-nek is többszöröse.',
      'Nincs olyan páratlan szám, amely a 2 többszöröse.'
    ],
    correctAnswer: 0,
    explanation: 'Ez hamis, mert például a 10, a 4310 vagy a 9100 a 2-nek és az 5-nek is többszöröse.'
  },
  {
    id: 'ex-q48',
    level: 2,
    questionTypeBadge: 'Többszörösök',
    question: 'Melyik szám többszöröse a 10-nek?',
    options: ['9100', '9105', '5552', '1175'],
    correctAnswer: 0,
    explanation: 'A 10 többszörösei 0-ra végződnek: 9100.'
  },
  {
    id: 'ex-q49',
    level: 2,
    questionTypeBadge: 'Következtetés',
    figure: <QTable top="Emelet" bottom="Utasok (fő)" tops={['legfelső', 'összesen']} bottoms={['424', '?']} />,
    question: 'Az óceánjáró legfelső emeletén az utasok negyede van, 424 fő. Hányan utaznak összesen a hajón?',
    options: ['1696', '106', '1272', '428'],
    correctAnswer: 0,
    explanation: 'Ha 424 a negyede, akkor az egész a négyszerese: 424 · 4 = 1696 utas.'
  },
  {
    id: 'ex-q50',
    level: 2,
    questionTypeBadge: 'Következtetés',
    question: 'A legfelső emeleten 424 fő van, ez az utasok negyede. Hányan vannak a többi fedélzeten?',
    options: ['1272', '1696', '424', '1700'],
    correctAnswer: 0,
    explanation: 'A többi fedélzeten a háromnegyed rész van: 3 · 424 = 1272 (vagy 1696 − 424 = 1272).'
  },
  {
    id: 'ex-q51',
    level: 2,
    questionTypeBadge: 'Fordított összefüggés',
    question: 'A 4080 Ft-os társasjátékot 8 barát veszi meg egyenlően. Mennyit fizet egy barát?',
    options: ['510 Ft', '4088 Ft', '4072 Ft', '501 Ft'],
    correctAnswer: 0,
    explanation: '4080 : 8: 40 : 8 = 5, marad 0; 8 : 8 = 1; 0 : 8 = 0. Egy barát 510 Ft-ot fizet.'
  },
  {
    id: 'ex-q52',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Ági egy lépése 6 dm. Hány lépéssel teszi meg a 83 m 4 dm távolságot?',
    options: ['139 lépéssel', '834 lépéssel', '278 lépéssel', '13 lépéssel'],
    correctAnswer: 0,
    explanation: '83 m 4 dm = 834 dm. 834 : 6 = 139 lépés.'
  },
  {
    id: 'ex-q53',
    level: 2,
    questionTypeBadge: 'Gondoltam egy számra',
    figure: <QChain boxes={['?', '', '7200']} ops={['+ 2400', '· 2']} />,
    question: 'A számhoz hozzáadtam 2400-at, az összeget megszoroztam 2-vel, és 7200 lett. Melyik számra gondoltam?',
    options: ['1200', '2400', '3600', '4800'],
    correctAnswer: 0,
    explanation: 'Visszafelé az utolsó lépéstől: 7200 : 2 = 3600, 3600 − 2400 = 1200.'
  },
  {
    id: 'ex-q54',
    level: 2,
    questionTypeBadge: 'Osztandó',
    question: 'Mennyi az osztandó, ha az osztó 7, a hányados 528, a maradék 2?',
    options: ['3698', '3696', '3694', '535'],
    correctAnswer: 0,
    explanation: '528 · 7 = 3696, ehhez hozzáadjuk a maradékot: 3696 + 2 = 3698.'
  },
  {
    id: 'ex-q55',
    level: 2,
    questionTypeBadge: 'Nyíllánc',
    figure: <QChain boxes={['6823', 'G', 'H = ?']} ops={['− 1564', '− 1436']} />,
    question: '6823 − 1564 = G, aztán G − 1436 = H. Mennyi H?',
    options: ['3823', '5259', '3833', '2823'],
    correctAnswer: 0,
    explanation: 'Két kivonás helyett elvehetjük az összegüket: 1564 + 1436 = 3000, 6823 − 3000 = 3823.'
  },
  {
    id: 'ex-q56',
    level: 2,
    questionTypeBadge: 'Nyíllánc',
    figure: <QChain boxes={['1066', 'P', 'Q = ?']} ops={['· 2', '· 3']} />,
    question: '1066 · 2 = P, aztán P · 3 = Q. Mennyi Q?',
    options: ['6396', '2132', '5330', '6386'],
    correctAnswer: 0,
    explanation: 'P = 2132, Q = 2132 · 3 = 6396. Egy lépésben: 1066 · 6 = 6396.'
  },
  {
    id: 'ex-q57',
    level: 2,
    questionTypeBadge: 'Műveletek sorrendje',
    figure: <QExpr expr="(1836 + 2364) · 2" />,
    question: 'Mennyi (1836 + 2364) · 2?',
    options: ['8400', '6564', '4200', '8300'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 1836 + 2364 = 4200. Utána 4200 · 2 = 8400.'
  },
  {
    id: 'ex-q58',
    level: 2,
    questionTypeBadge: 'Műveletek sorrendje',
    figure: <QExpr expr="9572 − 1416 · 5" />,
    question: 'Mennyi 9572 − 1416 · 5?',
    options: ['2492', '2592', '7080', '8156'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 1416 · 5 = 7080. Utána 9572 − 7080 = 2492.'
  },
  {
    id: 'ex-q59',
    level: 2,
    questionTypeBadge: 'Műveletek sorrendje',
    figure: <QExpr expr="4 · 2 · 346" />,
    question: 'Mennyi 4 · 2 · 346?',
    options: ['2768', '2468', '1384', '2778'],
    correctAnswer: 0,
    explanation: 'Balról jobbra: 4 · 2 = 8, 8 · 346 = 2768.'
  },
  {
    id: 'ex-q60',
    level: 2,
    questionTypeBadge: 'Szövegből műveletsor',
    question: 'Melyik számra gondoltam? Az 1312 és a 2879 összegének a kétszerese.',
    options: ['8382', '7070', '4191', '8282'],
    correctAnswer: 0,
    explanation: '(1312 + 2879) · 2 = 4191 · 2 = 8382.'
  }
];

// ---------------------------------------------------------------------------
// Kérdések – 3. szint (30)
// ---------------------------------------------------------------------------
const L3: QuizQuestion[] = [
  {
    id: 'ex-q61',
    level: 3,
    questionTypeBadge: 'Többtagú összeadás',
    figure: <QTable top="Évfolyam" bottom="Tanulók" tops={['4.', '5.', '6.', '7.', '8.']} bottoms={['1776', '1296', '2070', '2346', '1278']} />,
    question: 'Hány versenyző jelentkezett összesen a természetismereti vetélkedőre?',
    options: ['8766', '8666', '8776', '7766'],
    correctAnswer: 0,
    explanation: '1776 + 1296 = 3072, + 2070 = 5142, + 2346 = 7488, + 1278 = 8766 versenyző.'
  },
  {
    id: 'ex-q62',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A Vörös Listán 2754 állat-, 2464 növény-, 1 gomba- és 1 barnamoszatfaj szerepelt. Hány faj ez összesen?',
    options: ['5220', '5218', '5120', '5222'],
    correctAnswer: 0,
    explanation: '2754 + 2464 = 5218, + 1 + 1 = 5220 faj.'
  },
  {
    id: 'ex-q63',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    figure: <QAdd a="■" b="3776" r="4134" />,
    question: 'Melyik szám áll a ■ helyén? ■ + 3776 = 4134',
    options: ['358', '7910', '368', '1358'],
    correctAnswer: 0,
    explanation: 'A hiányzó tag: 4134 − 3776 = 358. Ellenőrzés: 358 + 3776 = 4134.'
  },
  {
    id: 'ex-q64',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    figure: <QAdd a="5766" b="■" r="4793" op="−" />,
    question: 'Melyik szám áll a ■ helyén? 5766 − ■ = 4793',
    options: ['973', '983', '1973', '873'],
    correctAnswer: 0,
    explanation: 'A kivonandó: 5766 − 4793 = 973. Ellenőrzés: 5766 − 973 = 4793.'
  },
  {
    id: 'ex-q65',
    level: 3,
    questionTypeBadge: 'Vásárlás',
    question: 'Robi a kempingboltban 10 000 Ft-tal fizetett, és 1410 Ft-ot kapott vissza. Mit vett? (3900, 2490, 4200, 6100, 1490 Ft-os termékek)',
    options: ['a 6100 és a 2490 Ft-os terméket', 'a 4200 és a 3900 Ft-os terméket', 'a 6100 és az 1490 Ft-os terméket', 'a 3900, a 2490 és az 1490 Ft-os terméket'],
    correctAnswer: 0,
    explanation: 'Robi 10 000 − 1410 = 8590 Ft-ot költött. 6100 + 2490 = 8590. (4200 + 3900 = 8100, 6100 + 1490 = 7590, 3900 + 2490 + 1490 = 7880.)'
  },
  {
    id: 'ex-q66',
    level: 3,
    questionTypeBadge: 'Műveletsor',
    figure: <QExpr expr="1534 · 5 − 7596" />,
    question: 'Mennyi 1534 · 5 − 7596?',
    options: ['74', '7670', '64', '174'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 1534 · 5 = 7670. Utána 7670 − 7596 = 74.'
  },
  {
    id: 'ex-q67',
    level: 3,
    questionTypeBadge: 'Műveletsor',
    figure: <QExpr expr="2225 − 547 · 4" />,
    question: 'Mennyi 2225 − 547 · 4?',
    options: ['37', '2188', '47', '137'],
    correctAnswer: 0,
    explanation: 'Először a szorzás: 547 · 4 = 2188. Utána 2225 − 2188 = 37.'
  },
  {
    id: 'ex-q68',
    level: 3,
    questionTypeBadge: 'Hiányzó szorzandó',
    figure: <QMul a="■" b="3" r="2193" />,
    question: 'Melyik szám áll a ■ helyén? ■ · 3 = 2193',
    options: ['731', '6579', '721', '2190'],
    correctAnswer: 0,
    explanation: 'A szorzandót osztással kapjuk: 2193 : 3 = 731. Ellenőrzés: 731 · 3 = 2193.'
  },
  {
    id: 'ex-q69',
    level: 3,
    questionTypeBadge: 'Hiányzó szorzandó',
    figure: <QMul a="■" b="5" r="2225" />,
    question: 'Melyik szám áll a ■ helyén? ■ · 5 = 2225',
    options: ['445', '455', '1112', '2220'],
    correctAnswer: 0,
    explanation: '2225 : 5 = 445. Ellenőrzés: 445 · 5 = 2225.'
  },
  {
    id: 'ex-q70',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A II. hullámvasút-pálya 438 m hosszú. Hány métert tenne meg Máté, ha 5 kört menne rajta?',
    options: ['2190 m-t', '2150 m-t', '443 m-t', '2040 m-t'],
    correctAnswer: 0,
    explanation: '5 · 438: 5 · 8 = 40 (0, marad 4); 5 · 3 = 15, + 4 = 19 (9, marad 1); 5 · 4 = 20, + 1 = 21. Összesen 2190 m.'
  },
  {
    id: 'ex-q71',
    level: 3,
    questionTypeBadge: 'Negyede, négyszerese',
    question: 'Melyik számnak a negyede az 1824?',
    options: ['7296', '456', '1828', '7286'],
    correctAnswer: 0,
    explanation: 'Ha 1824 a negyede, akkor a szám a négyszerese: 1824 · 4 = 7296. (Az 1824 negyede 456 lenne – ez másik kérdés.)'
  },
  {
    id: 'ex-q72',
    level: 3,
    questionTypeBadge: 'Negyede, négyszerese',
    question: 'Melyik számnak a négyszerese az 1824?',
    options: ['456', '7296', '1820', '446'],
    correctAnswer: 0,
    explanation: 'A számot osztással kapjuk: 1824 : 4 = 456. Ellenőrzés: 456 · 4 = 1824.'
  },
  {
    id: 'ex-q73',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: '9-féle kitűzőből fajtánként ugyanannyit gyártottak, összesen 8055 darabot. Hány darab készült egy fajtából?',
    options: ['895', '905', '985', '8046'],
    correctAnswer: 0,
    explanation: '8055 : 9: 80 : 9 = 8, marad 8; 85 : 9 = 9, marad 4; 45 : 9 = 5. Fajtánként 895 darab.'
  },
  {
    id: 'ex-q74',
    level: 3,
    questionTypeBadge: 'Hiányzó osztandó',
    figure: <QExpr expr="□ : 7 = 1356" tail="" />,
    question: 'Melyik szám kerül a □ helyére? □ : 7 = 1356',
    options: ['9492', '193', '9482', '1363'],
    correctAnswer: 0,
    explanation: 'Az osztandót szorzással kapjuk: 1356 · 7 = 9492. Ellenőrzés: 9492 : 7 = 1356.'
  },
  {
    id: 'ex-q75',
    level: 3,
    questionTypeBadge: 'Maradék a szövegben',
    question: '5000 turistát kell átvinni a Balatonon egy 400 férőhelyes katamaránnal. Legalább hány fordulóra van szükség?',
    options: ['13', '12', '125', '14'],
    correctAnswer: 0,
    explanation: '5000 : 400 = 12, marad 200. A maradék 200 turista miatt még egy forduló kell: 12 + 1 = 13.'
  },
  {
    id: 'ex-q76',
    level: 3,
    questionTypeBadge: 'Többszörösök',
    question: 'Melyik számjegy kerülhet a 735■ szám végére, hogy a 2-nek és az 5-nek is többszöröse legyen?',
    options: ['csak a 0', 'csak az 5', '0 vagy 5', '0, 2, 4, 6 vagy 8'],
    correctAnswer: 0,
    explanation: 'A 2 és az 5 többszöröse is csak a 0-ra végződő szám lehet: 7350.'
  },
  {
    id: 'ex-q77',
    level: 3,
    questionTypeBadge: 'Páros, páratlan',
    question: 'A kisebbítendő páratlan, a kivonandó páros szám (például 4963 − 4658). Milyen lesz a különbség?',
    options: ['páratlan', 'páros', 'lehet páros is, páratlan is', 'mindig 0-ra végződik'],
    correctAnswer: 0,
    explanation: 'Páratlanból párost elvéve páratlan marad: 4963 − 4658 = 305, ami páratlan.'
  },
  {
    id: 'ex-q78',
    level: 3,
    questionTypeBadge: 'Többszörösök',
    question: 'Attila pontszáma a 2-nek és az 5-nek is többszöröse. Hány pontot érhetett el?',
    options: ['9240', '6755', '7656', '2965'],
    correctAnswer: 0,
    explanation: 'A 2 és az 5 többszöröse is 0-ra végződik: 9240. A 6755 és a 2965 csak az 5-nek, a 7656 csak a 2-nek többszöröse.'
  },
  {
    id: 'ex-q79',
    level: 3,
    questionTypeBadge: 'Következtetés',
    question: 'Anna egy 600 m-es kört fut. Első nap 3 kört futott, és mindennap eggyel többet fut. Hány métert fut az ötödik napon?',
    options: ['4200 m-t', '3000 m-t', '4800 m-t', '1800 m-t'],
    correctAnswer: 0,
    explanation: 'Napok: 3, 4, 5, 6, 7 kör. Az 5. napon 7 kör: 7 · 600 m = 4200 m.'
  },
  {
    id: 'ex-q80',
    level: 3,
    questionTypeBadge: 'Következtetés',
    figure: <QTable top="Nap" bottom="Táv (m)" tops={['1.', '2.', '3.', '4.', '5.']} bottoms={['1800', '2400', '3000', '3600', '?']} />,
    question: 'Anna mindennap egy 600 m-es körrel többet fut (első nap 3 kört). Hányadik napon fut először 5 km-nél többet?',
    options: ['a 7. napon', 'a 6. napon', 'a 8. napon', 'a 9. napon'],
    correctAnswer: 0,
    explanation: '5 km = 5000 m. A 6. napon 8 kör = 4800 m (még kevesebb), a 7. napon 9 kör = 5400 m – ez már több 5000 m-nél.'
  },
  {
    id: 'ex-q81',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    question: 'Péter 3 óra alatt 24 km-t kerékpározott. Az 1. órában a táv ötödét, a 2. órában a maradék felét tette meg. Hány métert tett meg a 3. órában?',
    options: ['9600 m-t', '4800 m-t', '7200 m-t', '8000 m-t'],
    correctAnswer: 0,
    explanation: '24 km = 24 000 m. Ötöde 4800 m, maradt 19 200 m. Ennek fele 9600 m a 2. órában, a 3. órára a másik fele, 9600 m marad.'
  },
  {
    id: 'ex-q82',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Budapesttől Pozsonyig 200 km. Onnan Varsóig még az eddigi táv ötszörösénél 326 km-rel kevesebb. Milyen messze van Varsó Budapesttől?',
    options: ['874 km', '674 km', '1526 km', '1074 km'],
    correctAnswer: 0,
    explanation: 'Pozsony–Varsó: 5 · 200 − 326 = 1000 − 326 = 674 km. Budapest–Varsó: 200 + 674 = 874 km.'
  },
  {
    id: 'ex-q83',
    level: 3,
    questionTypeBadge: 'Sorozat',
    question: 'Egy sorozat 427-tel nő: 265 · 5, aztán ■ · 2. Melyik szám a ■?',
    options: ['876', '1752', '1325', '851'],
    correctAnswer: 0,
    explanation: '265 · 5 = 1325. A következő tag 1325 + 427 = 1752. ■ · 2 = 1752, tehát ■ = 1752 : 2 = 876.'
  },
  {
    id: 'ex-q84',
    level: 3,
    questionTypeBadge: 'Sorozat',
    question: 'A 427-tel növekvő sorozat harmadik tagja 2179, és ez így jön ki: ■ − 3549. Melyik szám a ■?',
    options: ['5728', '1370', '5718', '6155'],
    correctAnswer: 0,
    explanation: 'A kisebbítendőt összeadással kapjuk: 2179 + 3549 = 5728. Ellenőrzés: 5728 − 3549 = 2179.'
  },
  {
    id: 'ex-q85',
    level: 3,
    questionTypeBadge: 'Hiányzó tényező',
    figure: <QExpr expr="4 · □ = 3912" tail="" />,
    question: 'Melyik szám kerül a □ helyére? 4 · □ = 3912',
    options: ['978', '3916', '988', '3908'],
    correctAnswer: 0,
    explanation: '3912 : 4: 39 : 4 = 9, marad 3; 31 : 4 = 7, marad 3; 32 : 4 = 8. Az eredmény 978.'
  },
  {
    id: 'ex-q86',
    level: 3,
    questionTypeBadge: 'Jelek helyett számok',
    figure: <QExpr expr="(□ − ◇) · △" />,
    question: 'Legyen □ = 8992, ◇ = 8327, △ = 4. Mennyi (□ − ◇) · △?',
    options: ['2660', '665', '2560', '2670'],
    correctAnswer: 0,
    explanation: 'Zárójel: 8992 − 8327 = 665. Utána 665 · 4 = 2660.'
  },
  {
    id: 'ex-q87',
    level: 3,
    questionTypeBadge: 'Jelek helyett számok',
    figure: <QExpr expr="□ + ○ : △ − ◇" />,
    question: 'Legyen □ = 8992, ○ = 2236, △ = 4, ◇ = 8327. Mennyi □ + ○ : △ − ◇?',
    options: ['1224', '559', '2725', '1234'],
    correctAnswer: 0,
    explanation: 'Először az osztás: 2236 : 4 = 559. Utána balról jobbra: 8992 + 559 = 9551, 9551 − 8327 = 1224.'
  },
  {
    id: 'ex-q88',
    level: 3,
    questionTypeBadge: 'Jelek helyett számok',
    figure: <QExpr expr="(□ − ○) : △" />,
    question: 'Legyen □ = 8992, ○ = 2236, △ = 4. Mennyi (□ − ○) : △?',
    options: ['1689', '6756', '8433', '1679'],
    correctAnswer: 0,
    explanation: 'Zárójel: 8992 − 2236 = 6756. Utána 6756 : 4 = 1689.'
  },
  {
    id: 'ex-q89',
    level: 3,
    questionTypeBadge: 'Rejtvény',
    question: 'A 37, 74, 148 sorozatot kétszerezéssel folytatjuk 6 taggal. A betűk: 296 = T, 592 = I, 1184 = SZ, 2368 = A, 4736 = F, 9472 = A. Mi volt az év fája 2011-ben?',
    options: ['tiszafa', 'tölgyfa', 'kőrisfa', 'szilfa'],
    correctAnswer: 0,
    explanation: '148 · 2 = 296 (T), · 2 = 592 (I), · 2 = 1184 (SZ), · 2 = 2368 (A), · 2 = 4736 (F), · 2 = 9472 (A). Összeolvasva: TISZAFA.'
  },
  {
    id: 'ex-q90',
    level: 3,
    questionTypeBadge: 'Könyvjelzők',
    question: 'A könyvjelzőkön ezek a számok vannak: 6473, 7156, 3524, 4582, 5418, 2844. Melyik az ötezernél 1476-tal kisebb szám?',
    options: ['3524', '4582', '2844', '6476'],
    correctAnswer: 0,
    explanation: '5000 − 1476 = 3524. (A 4582 a 2291 kétszerese, a 2844 a 8532 harmada.)'
  }
];

const EXAM_QUESTIONS: QuizQuestion[] = [...L1, ...L2, ...L3];

export const WrittenOpsExamQuiz: React.FC<{
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
      topicId="g4-wops-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="8. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: írásbeli összeadás, kivonás, szorzás, osztás, többszörösök, következtetések, műveletsorok."
      badge="4. OSZTÁLY • III. ÍRÁSBELI MŰVELETEK • TUDÁSPRÓBA"
      questions={EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Írásbeli + − ·',
          items: [
            'Helyi érték szerint egymás alá írjuk.',
            'Az egyesekkel kezdünk, a maradékot továbbvisszük.',
            'Kivonás: 4 meg 8 az 12, marad 1 → a kivonandó következő jegyéhez adjuk.',
            'Ellenőrzés: tagcserével, összeadással.'
          ]
        },
        {
          title: 'Írásbeli osztás',
          items: [
            'A legnagyobb helyi értékkel kezdünk.',
            'Becslés: hány jegyű a hányados?',
            'Ha nincs meg az osztó, 0 kerül a hányadosba (3150 : 3 = 1050).',
            'Ellenőrzés: hányados · osztó + maradék = osztandó.'
          ]
        },
        {
          title: 'Többszörösök és sorrend',
          items: [
            '2 többszöröse: páros; 5 többszöröse: 0 vagy 5 a vége; 10 többszöröse: 0 a vége.',
            'Sorrend: ( ) → · és : → + és −',
            'Visszafelé: az utolsó lépést csináld vissza először!',
            'Egyről többre, többről egyre következtetünk.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WrittenOpsExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <WrittenOpsExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default WrittenOpsExamQuiz;
