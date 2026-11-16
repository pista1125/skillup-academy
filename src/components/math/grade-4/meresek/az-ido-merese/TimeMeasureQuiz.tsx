import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TimeMeasureMatcher } from './TimeMeasureMatcher';
import { TimeMeasureSorter } from './TimeMeasureSorter';
import { ClockFace, TIMETABLE } from './TimeMeasureFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Egy mutatós óra, alatta felirat */
const ClockFig: React.FC<{ h: number; m: number; caption: string }> = ({ h, m, caption }) => (
  <QFig h={150}>
    <ClockFace cx={120} cy={66} r={52} hour={h} minute={m} />
    <text x="120" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill={caption.includes('?') ? UNK : '#0f172a'}>{caption}</text>
  </QFig>
);

/** Két óra: kezdés és vége */
const TwoClocksFig: React.FC<{ a: [number, number]; b: [number, number]; la: string; lb: string }> = ({ a, b, la, lb }) => (
  <QFig h={140}>
    <ClockFace cx={62} cy={62} r={42} hour={a[0]} minute={a[1]} />
    <ClockFace cx={178} cy={62} r={42} hour={b[0]} minute={b[1]} />
    <text x="62" y="126" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{la}</text>
    <text x="178" y="126" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{lb}</text>
    <text x="120" y="66" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Digitális kijelzők: kezdés → vége */
const DigitalFig: React.FC<{ a: string; b: string; la: string; lb: string }> = ({ a, b, la, lb }) => (
  <QFig h={110}>
    {[
      { x: 20, t: a, l: la },
      { x: 140, t: b, l: lb }
    ].map((d) => (
      <g key={d.x}>
        <rect x={d.x} y="24" width="80" height="40" rx="8" fill="#0f172a" />
        <text x={d.x + 40} y="52" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#4ade80" fontFamily="monospace">{d.t}</text>
        <text x={d.x + 40} y="84" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{d.l}</text>
      </g>
    ))}
    <text x="120" y="50" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>→ ? →</text>
  </QFig>
);

/** Menetrend */
const TimetableFig: React.FC = () => (
  <QFig h={160}>
    <rect x="50" y="10" width="140" height="140" rx="8" fill="#ffffff" stroke="#1e3a8a" strokeWidth="2" />
    <text x="120" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">Menetrend</text>
    {TIMETABLE.map((r, i) => (
      <g key={r.stop}>
        <text x="62" y={52 + i * 17} fontSize="11" fontWeight="bold" fill="#0f172a">{r.stop}</text>
        <text x="178" y={52 + i * 17} textAnchor="end" fontSize="11" fontWeight="bold" fill="#0f172a">{r.time}</text>
      </g>
    ))}
  </QFig>
);

/** Eredménytábla */
const ResultsFig: React.FC<{ title: string; rows: [string, string][] }> = ({ title, rows }) => (
  <QFig h={34 + rows.length * 18}>
    <text x="120" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412">{title}</text>
    {rows.map((r, i) => (
      <g key={r[0]}>
        <rect x="20" y={28 + i * 18} width="200" height="17" fill={i % 2 ? '#ffedd5' : '#fff7ed'} />
        <text x="28" y={41 + i * 18} fontSize="10.5" fill="#0f172a">{r[0]}</text>
        <text x="212" y={41 + i * 18} textAnchor="end" fontSize="10.5" fontWeight="bold" fill="#0f172a">{r[1]}</text>
      </g>
    ))}
  </QFig>
);

/** Hanna útja */
const RouteFig: React.FC = () => {
  const pts = [
    { x: 18, y: 100 },
    { x: 78, y: 50 },
    { x: 138, y: 100 },
    { x: 180, y: 56 },
    { x: 222, y: 96 }
  ];
  const labels = ['negyedóra', '24 perc', '660 mp', '10 perc'];
  const colors = ['#16a34a', '#2563eb', '#dc2626', '#9333ea'];
  const lp: { x: number; y: number; a: 'start' | 'middle' | 'end' }[] = [
    { x: 34, y: 58, a: 'middle' },
    { x: 96, y: 92, a: 'end' },
    { x: 166, y: 96, a: 'start' },
    { x: 214, y: 62, a: 'middle' }
  ];
  return (
    <QFig h={130}>
      {pts.slice(0, -1).map((p, i) => {
        const q = pts[i + 1];
        return (
          <g key={i}>
            <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={colors[i]} strokeWidth="4" strokeLinecap="round" />
            <text x={lp[i].x} y={lp[i].y} textAnchor={lp[i].a} fontSize="10" fontWeight="bold" fill={colors[i]}>{labels[i]}</text>
          </g>
        );
      })}
      <text x="18" y="118" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">RAJT</text>
      <text x="222" y="114" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">CÉL</text>
      <text x="120" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>Összesen: ? perc</text>
    </QFig>
  );
};

/** Állatkert: mikor értek oda, meddig maradtak */
const ZooFig: React.FC = () => (
  <QFig h={120}>
    {[
      { n: 'majmok', a: '09:28', b: '10:05', c: '#a16207' },
      { n: 'oroszlánok', a: '10:10', b: '10:28', c: '#ea580c' },
      { n: 'vízilovak', a: '10:32', b: '10:48', c: '#2563eb' },
      { n: 'zsiráfok', a: '11:03', b: '11:25', c: '#16a34a' }
    ].map((d, i) => (
      <g key={d.n}>
        <rect x={12 + i * 56} y="20" width="52" height="80" rx="8" fill="#ffffff" stroke={d.c} strokeWidth="2" />
        <text x={38 + i * 56} y="40" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill={d.c}>{d.n}</text>
        <rect x={17 + i * 56} y="50" width="42" height="18" rx="3" fill="#f5d0fe" />
        <text x={38 + i * 56} y="63" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">{d.a}</text>
        <rect x={17 + i * 56} y="72" width="42" height="18" rx="3" fill="#e9d5ff" />
        <text x={38 + i * 56} y="85" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">{d.b}</text>
      </g>
    ))}
    <text x="120" y="114" textAnchor="middle" fontSize="9" fill="#475569">felül: érkezés • alul: indulás tovább</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const TIME_MEASURE_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'tm-q1',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Hány perc 1 óra?',
    options: ['60 perc', '100 perc', '24 perc', '30 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. Az órán a nagymutató 60 perc alatt megy körbe.'
  },
  {
    id: 'tm-q2',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Hány óra 1 nap?',
    options: ['24 óra', '12 óra', '60 óra', '7 óra'],
    correctAnswer: 0,
    explanation: '1 nap = 24 óra. Ezalatt a kismutató kétszer megy körbe.'
  },
  {
    id: 'tm-q3',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockFig h={7} m={30} caption="? óra ? perc" />,
    question: 'Mennyi időt mutat az óra?',
    options: ['fél 8', 'fél 7', 'negyed 8', 'háromnegyed 7'],
    correctAnswer: 0,
    explanation: 'A kismutató a 7 és a 8 között van, a nagymutató a 6-on. 7 óra 30 perc = fél 8.'
  },
  {
    id: 'tm-q4',
    level: 1,
    questionTypeBadge: 'Óra',
    question: 'Hogyan írjuk számokkal a „negyed tíz” időpontot délelőtt?',
    options: ['9 óra 15 perc', '10 óra 15 perc', '9 óra 45 perc', '10 óra 25 perc'],
    correctAnswer: 0,
    explanation: 'A negyed tíz azt jelenti: 9 óra után eltelt egy negyedóra, azaz 15 perc. 9 óra 15 perc.'
  },
  {
    id: 'tm-q5',
    level: 1,
    questionTypeBadge: 'Óra',
    question: 'Hogyan írjuk számokkal a „háromnegyed hét” időpontot reggel?',
    options: ['6 óra 45 perc', '7 óra 45 perc', '6 óra 15 perc', '7 óra 15 perc'],
    correctAnswer: 0,
    explanation: 'Háromnegyed hét: 6 óra után eltelt háromnegyed óra, azaz 45 perc. 6 óra 45 perc.'
  },
  {
    id: 'tm-q6',
    level: 1,
    questionTypeBadge: 'Napszak',
    figure: <ClockFig h={3} m={0} caption="délután: ? óra" />,
    question: 'Délután van. Hány órát mutat az óra?',
    options: ['15 óra', '3 óra', '13 óra', '12 óra'],
    correctAnswer: 0,
    explanation: 'Délután 12-t adunk hozzá: 3 + 12 = 15. Az óra 15 órát mutat.'
  },
  {
    id: 'tm-q7',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Hány másodperc 1 perc?',
    options: ['60 másodperc', '100 másodperc', '10 másodperc', '30 másodperc'],
    correctAnswer: 0,
    explanation: '1 perc = 60 másodperc.'
  },
  {
    id: 'tm-q8',
    level: 1,
    questionTypeBadge: 'Időtartam',
    question: 'Melyik mondat fejez ki IDŐTARTAMOT (azt, hogy mennyi ideig)?',
    options: [
      'A sportnap 8 órán át tartott.',
      'Az első versenyszámot 8 óra 15 perckor indították.',
      'A sportnapot április 25-én rendezték.',
      'A frissítőt 14 óra 30 perckor kínálták.'
    ],
    correctAnswer: 0,
    explanation: 'A „8 órán át” azt mondja meg, mennyi ideig tartott. A többi időpont: azt mondja meg, mikor.'
  },
  {
    id: 'tm-q9',
    level: 1,
    questionTypeBadge: 'Óra',
    question: 'Hányszor megy körbe a kismutató 1 nap alatt?',
    options: ['2-szer', '1-szer', '24-szer', '12-szer'],
    correctAnswer: 0,
    explanation: 'A kismutató 12 óra alatt megy körbe. 1 nap 24 óra, ezért 2-szer.'
  },
  {
    id: 'tm-q10',
    level: 1,
    questionTypeBadge: 'Napszak',
    question: 'Melyik napszakban szoktunk tízórait enni?',
    options: ['délelőtt', 'délután', 'este', 'éjszaka'],
    correctAnswer: 0,
    explanation: 'A tízórait délelőtt, az iskolában esszük. Délután uzsonnázunk, este vacsorázunk.'
  },

  // ---------- 2. szint ----------
  {
    id: 'tm-q11',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '120 másodperc = ? perc',
    options: ['2 perc', '12 perc', '20 perc', '1 perc 20 másodperc'],
    correctAnswer: 0,
    explanation: '60 másodperc = 1 perc, ezért 120 másodperc = 120 : 60 = 2 perc.'
  },
  {
    id: 'tm-q12',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '3 perc = ? másodperc',
    options: ['180 másodperc', '30 másodperc', '300 másodperc', '63 másodperc'],
    correctAnswer: 0,
    explanation: '1 perc = 60 másodperc, ezért 3 perc = 3 · 60 = 180 másodperc.'
  },
  {
    id: 'tm-q13',
    level: 2,
    questionTypeBadge: 'Menetrend',
    figure: <TimetableFig />,
    question: 'Hány perc a busz menetideje a Hídtól a Központig?',
    options: ['21 perc', '19 perc', '33 perc', '12 perc'],
    correctAnswer: 0,
    explanation: 'A Hídtól 7:12-kor indul, a Központba 7:33-kor ér. 33 − 12 = 21 perc.'
  },
  {
    id: 'tm-q14',
    level: 2,
    questionTypeBadge: 'Menetrend',
    figure: <TimetableFig />,
    question: 'Karesz a Központnál száll fel a buszra. Hány perc alatt ér az Iskola megállóig?',
    options: ['13 perc', '23 perc', '46 perc', '7 perc'],
    correctAnswer: 0,
    explanation: 'Központ: 7:33, Iskola: 7:46. 46 − 33 = 13 perc.'
  },
  {
    id: 'tm-q15',
    level: 2,
    questionTypeBadge: 'Óra',
    question: 'Délután „fél 5 múlt 10 perccel” van. Hogyan írjuk ezt számokkal?',
    options: ['16 óra 40 perc', '17 óra 40 perc', '16 óra 10 perc', '15 óra 40 perc'],
    correctAnswer: 0,
    explanation: 'Fél 5 = 4 óra 30 perc. 10 perccel később 4 óra 40 perc. Délután: 16 óra 40 perc.'
  },
  {
    id: 'tm-q16',
    level: 2,
    questionTypeBadge: 'Óra',
    question: 'Hogyan írjuk számokkal: „öt perc múlva fél négy”?',
    options: ['3 óra 25 perc', '3 óra 35 perc', '4 óra 25 perc', '2 óra 25 perc'],
    correctAnswer: 0,
    explanation: 'Fél négy = 3 óra 30 perc. Öt perccel előtte: 3 óra 25 perc.'
  },
  {
    id: 'tm-q17',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'A rekordkísérlet 48 órán át tartott. Hány nap ez?',
    options: ['2 nap', '4 nap', '24 nap', '3 nap'],
    correctAnswer: 0,
    explanation: '1 nap = 24 óra. 48 : 24 = 2, tehát 2 nap.'
  },
  {
    id: 'tm-q18',
    level: 2,
    questionTypeBadge: 'Időtartam',
    figure: <ZooFig />,
    question: 'Mennyi időt töltött a Kovács család a majmoknál?',
    options: ['37 perc', '77 perc', '23 perc', '43 perc'],
    correctAnswer: 0,
    explanation: '9:28 → 10:00 = 32 perc, 10:00 → 10:05 = 5 perc. 32 + 5 = 37 perc. (A 77 akkor jön ki, ha 100 percnek veszed az órát.)'
  },
  {
    id: 'tm-q19',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Hány hónap háromnegyed év?',
    options: ['9 hónap', '3 hónap', '75 hónap', '8 hónap'],
    correctAnswer: 0,
    explanation: '1 év = 12 hónap. Negyed év = 12 : 4 = 3 hónap, háromnegyed év = 3 · 3 = 9 hónap.'
  },
  {
    id: 'tm-q20',
    level: 2,
    questionTypeBadge: 'Időeredmény',
    figure: (
      <ResultsFig
        title="1000 m gyaloglás (perc:másodperc)"
        rows={[
          ['Kiss Péter', '7:05'],
          ['Nagy Antal', '8:09'],
          ['Kovács Áron', '8:53'],
          ['Balogh Béla', '7:03']
        ]}
      />
    ),
    question: 'Ki gyalogolt a leggyorsabban?',
    options: ['Balogh Béla', 'Kiss Péter', 'Kovács Áron', 'Nagy Antal'],
    correctAnswer: 0,
    explanation: 'Az a leggyorsabb, akinek a legkevesebb idő kellett: 7:03 kevesebb, mint 7:05. Balogh Béla.'
  },

  // ---------- 3. szint ----------
  {
    id: 'tm-q21',
    level: 3,
    questionTypeBadge: 'Időtartam',
    figure: <DigitalFig a="16:27" b="17:50" la="főzni kezd" lb="kész az étel" />,
    question: 'Édesanya 16 óra 27 perckor kezdett főzni, és 17 óra 50 perckor lett kész az étel. Mennyi ideig főtt a vacsora?',
    options: ['1 óra 23 perc', '1 óra 33 perc', '1 óra 50 perc', '2 óra 23 perc'],
    correctAnswer: 0,
    explanation: '16:27 → 17:00 = 33 perc, 17:00 → 17:50 = 50 perc. 33 + 50 = 83 perc = 1 óra 23 perc.'
  },
  {
    id: 'tm-q22',
    level: 3,
    questionTypeBadge: 'Időtartam',
    figure: <RouteFig />,
    question: 'Hanna útja négy részből állt: negyedóra, 24 perc, 660 másodperc és 10 perc. Hány perc alatt ért célba?',
    options: ['60 perc', '115 perc', '49 perc', '45 perc'],
    correctAnswer: 0,
    explanation: 'Negyedóra = 15 perc, 660 másodperc = 11 perc. 15 + 24 + 11 + 10 = 60 perc.'
  },
  {
    id: 'tm-q23',
    level: 3,
    questionTypeBadge: 'Menetrend',
    figure: <TimetableFig />,
    question: 'Kitti a Hídnál lakik, és busszal jár iskolába. Mennyi ideig utazik naponta oda és vissza összesen (ugyanennyi a menetidő visszafelé is)?',
    options: ['68 perc', '34 perc', '58 perc', '46 perc'],
    correctAnswer: 0,
    explanation: 'Híd 7:12 → Iskola 7:46: 34 perc. Oda és vissza: 2 · 34 = 68 perc.'
  },
  {
    id: 'tm-q24',
    level: 3,
    questionTypeBadge: 'Menetrend',
    figure: <TimetableFig />,
    question: 'Boldizsár naponta összesen 50 percet utazik (oda és vissza ugyanannyit). Hol száll fel reggel?',
    options: ['a Dombtetőnél', 'a Hídnál', 'a Parknál', 'a Központnál'],
    correctAnswer: 0,
    explanation: 'Egy út 50 : 2 = 25 perc. Dombtető 7:21 → Iskola 7:46 = 25 perc.'
  },
  {
    id: 'tm-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy lágytojás 3 perc alatt fő meg. Hány másodperc alatt főzünk meg 8 tojást, ha egyesével főzzük őket?',
    options: ['1440 másodperc', '180 másodperc', '240 másodperc', '2400 másodperc'],
    correctAnswer: 0,
    explanation: '8 · 3 perc = 24 perc. 24 · 60 = 1440 másodperc. (Ha egyszerre főznénk, csak 3 perc, azaz 180 másodperc kellene.)'
  },
  {
    id: 'tm-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question:
      'A 24 tagú osztály lángost rendel. Egyszerre 3 lángos sül, egy sütés 3 perc. 10 óra 8 perckor rendeltek. Mikor lesz kész az összes lángos?',
    options: ['10 óra 32 perckor', '11 óra 20 perckor', '10 óra 11 perckor', '10 óra 24 perckor'],
    correctAnswer: 0,
    explanation: '24 : 3 = 8 sütés, 8 · 3 = 24 perc. 10 óra 8 perc + 24 perc = 10 óra 32 perc.'
  },
  {
    id: 'tm-q27',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy tojás 3 perc alatt fő meg. Hány perc alatt főzhetünk meg 30 tojást, ha egyszerre 10 fér a fazékba?',
    options: ['9 perc', '90 perc', '3 perc', '30 perc'],
    correctAnswer: 0,
    explanation: '30 : 10 = 3 adag. 3 · 3 perc = 9 perc.'
  },
  {
    id: 'tm-q28',
    level: 3,
    questionTypeBadge: 'Időeredmény',
    figure: (
      <ResultsFig
        title="maratoni futás (óra:perc:másodperc)"
        rows={[
          ['legjobb magyar', '2:38:47'],
          ['világrekord', '2:03:38']
        ]}
      />
    ),
    question: 'Mennyi a különbség a legjobb magyar eredmény és a világrekord között?',
    options: ['35 perc 9 másodperc', '36 perc 9 másodperc', '35 perc 49 másodperc', '41 perc 9 másodperc'],
    correctAnswer: 0,
    explanation: 'Mindkettő 2 óra. 38 perc − 3 perc = 35 perc, 47 másodperc − 38 másodperc = 9 másodperc. A különbség 35 perc 9 másodperc.'
  },
  {
    id: 'tm-q29',
    level: 3,
    questionTypeBadge: 'Időeredmény',
    figure: (
      <ResultsFig
        title="800 m síkfutás (perc:másodperc)"
        rows={[
          ['Kitti', '3:09'],
          ['Fanni', '2:56'],
          ['Máté', '2:52'],
          ['Rebeka', '3:10'],
          ['Robi', '3:12'],
          ['Lili', '3:05']
        ]}
      />
    ),
    question: 'Hány másodperc az eltérés az első és az utolsó célba érő eredménye között?',
    options: ['20 másodperc', '60 másodperc', '40 másodperc', '2 másodperc'],
    correctAnswer: 0,
    explanation: 'Első Máté (2:52 = 172 mp), utolsó Robi (3:12 = 192 mp). 192 − 172 = 20 másodperc.'
  },
  {
    id: 'tm-q30',
    level: 3,
    questionTypeBadge: 'Időtartam',
    figure: <TwoClocksFig a={[8, 15]} b={[2, 28]} la="rajt: délelőtt" lb="cél: délután" />,
    question: 'Az első versenyszámot 8 óra 15 perckor indították, az utolsó versenyző 14 óra 28 perckor ért célba. Mennyi idő telt el?',
    options: ['6 óra 13 perc', '6 óra 43 perc', '5 óra 13 perc', '22 óra 43 perc'],
    correctAnswer: 0,
    explanation: '8:15 → 14:15 = 6 óra, 14:15 → 14:28 = 13 perc. Összesen 6 óra 13 perc.'
  }
];

export const TimeMeasureQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="meresek"
      topicId="g4-meas-ido-quiz"
      subtopicId="az-ido-merese"
      title="6. Az idő mérése – Kvíz"
      subtitle="30 feladat 3 szinten: óra leolvasása, napszakok, menetrend, időtartamok és átváltások."
      badge="4. OSZTÁLY • II. MÉRÉSEK • KVÍZ"
      questions={TIME_MEASURE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mértékegységek',
          items: ['1 perc = 60 másodperc', '1 óra = 60 perc', '1 nap = 24 óra', '1 hét = 7 nap, 1 év = 12 hónap']
        },
        {
          title: 'Óra leolvasása',
          items: [
            'negyed 10 = 9 óra 15 perc',
            'fél 8 = 7 óra 30 perc',
            'háromnegyed 7 = 6 óra 45 perc',
            'délután +12: 3 óra 30 perc = 15 óra 30 perc'
          ]
        },
        {
          title: 'Időtartam számolása',
          items: [
            'Időtartam = vége − kezdete',
            'Lépj az egész óráig, aztán tovább: 9:28 → 10:00 → 10:05',
            'perc:másodperc → másodperc: 7:05 = 7 · 60 + 5 = 425',
            'Időeredménynél a kevesebb idő a jobb!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TimeMeasureMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TimeMeasureSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TimeMeasureQuiz;
