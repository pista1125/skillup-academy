import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AddSub10000Matcher } from './AddSub10000Matcher';
import { AddSub10000Sorter } from './AddSub10000Sorter';
import { Coin100, JumpLine, PyramidDrawing } from './AddSub10000Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Ugrások számegyenesen, a végeredmény helyén "?". */
const JumpFig: React.FC<{ min: number; max: number; start: number; jumps: number[] }> = ({ min, max, start, jumps }) => {
  const end = jumps.reduce((s, j) => s + j, start);
  const sx = (n: number) => 24 + ((436 - 24) * (n - min)) / (max - min);
  return (
    <svg viewBox="0 0 460 130" className="w-full max-w-[320px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="458" height="128" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <JumpLine min={min} max={max} start={start} jumps={jumps} y={92} />
      <text x={sx(start)} y="122" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{start}</text>
      <text x={sx(end)} y="72" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Százasérmék két csoportban. */
const CoinsFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={110}>
    {Array.from({ length: a }, (_, i) => (
      <Coin100 key={`a${i}`} x={18 + (i % 4) * 22} y={22 + Math.floor(i / 4) * 22} r={10} />
    ))}
    <text x="120" y="56" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#334155">+</text>
    {Array.from({ length: b }, (_, i) => (
      <Coin100 key={`b${i}`} x={156 + (i % 4) * 22} y={22 + Math.floor(i / 4) * 22} r={10} />
    ))}
    <text x="120" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>Mennyi összesen? ?</text>
  </QFig>
);

const PyrFig: React.FC<{ rows: (number | null)[][] }> = ({ rows }) => (
  <QFig h={120}>
    <PyramidDrawing rows={rows} />
  </QFig>
);

/** Vendéglős oszlopdiagram, kiemelt hónappal. */
const ChartFig: React.FC<{ highlight: number }> = ({ highlight }) => {
  const months = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.'];
  const blue = [1000, 1000, 3000, 4000, 5000];
  const red = [1000, 2000, 2000, 5000, 2000];
  const y0 = 128;
  const k = 108 / 6000;
  return (
    <QFig h={150}>
      {[0, 2000, 4000, 6000].map((v) => (
        <g key={v}>
          <line x1="40" y1={y0 - v * k} x2="232" y2={y0 - v * k} stroke="#e2e8f0" />
          <text x="36" y={y0 - v * k + 3} textAnchor="end" fontSize="8.5" fill="#475569">{v}</text>
        </g>
      ))}
      {[1000, 3000, 5000].map((v) => (
        <line key={v} x1="40" y1={y0 - v * k} x2="232" y2={y0 - v * k} stroke="#f1f5f9" strokeDasharray="2 2" />
      ))}
      {months.map((m, i) => {
        const x = 50 + i * 37;
        return (
          <g key={m} opacity={i === highlight ? 1 : 0.35}>
            <rect x={x} y={y0 - blue[i] * k} width="12" height={blue[i] * k} fill="#0ea5e9" />
            <rect x={x + 13} y={y0 - red[i] * k} width="12" height={red[i] * k} fill="#e11d48" />
            <text x={x + 12} y={y0 + 12} textAnchor="middle" fontSize="9" fill="#334155">{m}</text>
          </g>
        );
      })}
      <line x1="40" y1={y0} x2="232" y2={y0} stroke="#334155" />
      <rect x="44" y="8" width="9" height="9" fill="#0ea5e9" />
      <text x="56" y="16" fontSize="9" fill="#334155">Illatosrét</text>
      <rect x="120" y="8" width="9" height="9" fill="#e11d48" />
      <text x="132" y="16" fontSize="9" fill="#334155">Tavirózsa</text>
    </QFig>
  );
};

/** Csillék tömeggel. */
const CartsFig: React.FC<{ masses: string[] }> = ({ masses }) => (
  <QFig h={90}>
    {masses.map((m, i) => {
      const x = 10 + i * 56;
      return (
        <g key={i}>
          <path d={`M ${x} 22 L ${x + 52} 22 L ${x + 46} 60 L ${x + 6} 60 Z`} fill={m === '?' ? '#fee2e2' : '#fca5a5'} stroke="#7f1d1d" strokeWidth="1.5" />
          <text x={x + 26} y="46" textAnchor="middle" fontSize="11" fontWeight="bold" fill={m === '?' ? UNK : '#7f1d1d'}>{m}</text>
          <circle cx={x + 14} cy="67" r="6" fill="#7f1d1d" />
          <circle cx={x + 38} cy="67" r="6" fill="#7f1d1d" />
          <text x={x + 26} y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">{'ABCD'[i]}</text>
        </g>
      );
    })}
    <text x="120" y="86" textAnchor="middle" fontSize="10" fill="#334155">Összesen: 5000 kg</text>
  </QFig>
);

export const ADD_SUB_10000_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'as10k-q1',
    level: 1,
    questionTypeBadge: 'Kerek ezresek',
    question: '3000 + 4000 = ?',
    options: ['7000', '6000', '8000', '700'],
    correctAnswer: 0,
    explanation: '3 + 4 = 7, tehát 3 ezres + 4 ezres = 7 ezres = 7000.'
  },
  {
    id: 'as10k-q2',
    level: 1,
    questionTypeBadge: 'Kerek ezresek',
    question: '5000 − 2000 = ?',
    options: ['3000', '7000', '2000', '300'],
    correctAnswer: 0,
    explanation: '5 − 2 = 3, tehát 5 ezres − 2 ezres = 3 ezres = 3000.'
  },
  {
    id: 'as10k-q3',
    level: 1,
    questionTypeBadge: 'Százasokkal',
    figure: <CoinsFig a={11} b={12} />,
    question: '11 darab százas meg 12 darab százas. Hány fabatka ez összesen?',
    options: ['2300', '230', '2200', '3200'],
    correctAnswer: 0,
    explanation: '11 sz + 12 sz = 23 sz, vagyis 1100 + 1200 = 2300.'
  },
  {
    id: 'as10k-q4',
    level: 1,
    questionTypeBadge: 'Összeadás',
    question: '4200 + 2300 = ?',
    options: ['6500', '6400', '6600', '5500'],
    correctAnswer: 0,
    explanation: '4000 + 2000 = 6000 és 200 + 300 = 500. Együtt 6500.'
  },
  {
    id: 'as10k-q5',
    level: 1,
    questionTypeBadge: 'Kivonás',
    question: '9800 − 6500 = ?',
    options: ['3300', '3200', '3400', '4300'],
    correctAnswer: 0,
    explanation: '98 sz − 65 sz = 33 sz = 3300. Ellenőrzés: 3300 + 6500 = 9800.'
  },
  {
    id: 'as10k-q6',
    level: 1,
    questionTypeBadge: 'Pótlás',
    question: 'Mennyit kell hozzáadni az 1800-hoz, hogy megkapd a nagyobb ezres szomszédját, a 2000-et?',
    options: ['200', '300', '800', '1200'],
    correctAnswer: 0,
    explanation: '1800 + 200 = 2000. (18 sz + 2 sz = 20 sz.)'
  },
  {
    id: 'as10k-q7',
    level: 1,
    questionTypeBadge: 'Pótlás',
    question: 'Mennyit kell hozzáadni a 8300-hoz, hogy 9000 legyen?',
    options: ['700', '800', '1700', '300'],
    correctAnswer: 0,
    explanation: '8300 + 700 = 9000, mert 3 sz + 7 sz = 10 sz = 1 ezres.'
  },
  {
    id: 'as10k-q8',
    level: 1,
    questionTypeBadge: 'Kerek ezresek',
    question: '10 000 − 4000 = ?',
    options: ['6000', '4000', '7000', '600'],
    correctAnswer: 0,
    explanation: '10 − 4 = 6, tehát 10 ezres − 4 ezres = 6 ezres = 6000.'
  },
  {
    id: 'as10k-q9',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: <JumpFig min={1000} max={7000} start={1500} jumps={[5000, 300]} />,
    question: '1500 + 5300 = ?',
    options: ['6800', '6300', '5800', '680'],
    correctAnswer: 0,
    explanation: '1500 + 5000 = 6500, majd 6500 + 300 = 6800.'
  },
  {
    id: 'as10k-q10',
    level: 1,
    questionTypeBadge: 'Pénz',
    question: 'Tóninak és Teónak együtt 10 000 fabatkája van. Tóninak 3000 fabatkája van. Mennyi van Teónak?',
    options: ['7000', '6000', '8000', '13 000'],
    correctAnswer: 0,
    explanation: '10 000 − 3000 = 7000. Ellenőrzés: 3000 + 7000 = 10 000.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'as10k-q11',
    level: 2,
    questionTypeBadge: 'Ezresátlépés',
    figure: <JumpFig min={3000} max={10000} start={3400} jumps={[5000, 700]} />,
    question: '3400 + 5700 = ?',
    options: ['9100', '8100', '9000', '9200'],
    correctAnswer: 0,
    explanation: 'Jancsi módszere: 3400 + 5000 = 8400, majd 8400 + 700 = 9100. (Bence: 34 sz + 57 sz = 91 sz.)'
  },
  {
    id: 'as10k-q12',
    level: 2,
    questionTypeBadge: 'Ezresátlépés',
    figure: <JumpFig min={2000} max={9000} start={8200} jumps={[-5000, -300]} />,
    question: '8200 − 5300 = ?',
    options: ['2900', '3100', '3900', '2800'],
    correctAnswer: 0,
    explanation: '8200 − 5000 = 3200, majd 3200 − 300 = 2900. (82 sz − 53 sz = 29 sz.)'
  },
  {
    id: 'as10k-q13',
    figure: <JumpFig min={2000} max={8000} start={2600} jumps={[4000, 500]} />,
    level: 2,
    questionTypeBadge: 'Ezresátlépés',
    question: '2600 + 4500 = ?',
    options: ['7100', '6100', '7000', '7200'],
    correctAnswer: 0,
    explanation: '26 sz + 45 sz = 71 sz = 7100. Ha elfelejted az átlépést, 6100 jönne ki.'
  },
  {
    id: 'as10k-q14',
    figure: <JumpFig min={2000} max={10000} start={9100} jumps={[-6000, -700]} />,
    level: 2,
    questionTypeBadge: 'Ezresátlépés',
    question: '9100 − 6700 = ?',
    options: ['2400', '3600', '3400', '2600'],
    correctAnswer: 0,
    explanation: '9100 − 6000 = 3100, majd 3100 − 700 = 2400. Ellenőrzés: 2400 + 6700 = 9100.'
  },
  {
    id: 'as10k-q15',
    level: 2,
    questionTypeBadge: 'Csoportosítás',
    question: 'Csoportosítsd ügyesen a tagokat! 1200 + 2500 + 500 + 800 = ?',
    options: ['5000', '4000', '4900', '5100'],
    correctAnswer: 0,
    explanation: '(1200 + 800) + (2500 + 500) = 2000 + 3000 = 5000.'
  },
  {
    id: 'as10k-q16',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A kerti koboldok májusban 3700 dl szörpöt készítettek, 1200 dl-rel kevesebbet, mint júniusban. Mennyit készítettek júniusban?',
    options: ['4900 dl', '2500 dl', '4800 dl', '3700 dl'],
    correctAnswer: 0,
    explanation: 'Júniusban 1200 dl-rel többet készítettek, mint májusban: 3700 + 1200 = 4900 dl. A „kevesebb” szó itt nem kivonást jelent!'
  },
  {
    id: 'as10k-q17',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A piacon 1600 kg körtét és 700 kg-mal több almát adtak el. Hány kg alma és körte fogyott el összesen?',
    options: ['3900 kg', '2300 kg', '3800 kg', '4600 kg'],
    correctAnswer: 0,
    explanation: 'Alma: 1600 + 700 = 2300 kg. Összesen: 1600 + 2300 = 3900 kg.'
  },
  {
    id: 'as10k-q18',
    level: 2,
    questionTypeBadge: 'Pénz',
    question: '10 000 fabatkával fizettem. 1600 fabatkáért gyümölcsöt, 4600 fabatkáért ruhát vettem. Mennyit kaptam vissza?',
    options: ['3800', '6200', '4800', '2800'],
    correctAnswer: 0,
    explanation: 'Elköltöttem 1600 + 4600 = 6200 fabatkát. Visszajár 10 000 − 6200 = 3800.'
  },
  {
    id: 'as10k-q19',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <ChartFig highlight={4} />,
    question: 'Májusban mennyivel több vendége volt az Illatosrét vendéglőnek, mint a Tavirózsának?',
    options: ['3000', '7000', '2000', '1000'],
    correctAnswer: 0,
    explanation: 'Májusban az Illatosrétnek 5000, a Tavirózsának 2000 vendége volt: 5000 − 2000 = 3000.'
  },
  {
    id: 'as10k-q20',
    level: 2,
    questionTypeBadge: 'Összegpiramis',
    figure: <PyrFig rows={[[200, 700, 1100, 500], [null, null, null], [null, null], [null]]} />,
    question: 'Az összegpiramisban mindig az alatta lévő két szám összege kerül egy téglalapba. Melyik szám kerül a csúcsra?',
    options: ['6100', '2500', '5100', '6200'],
    correctAnswer: 0,
    explanation: '2. sor: 900, 1800, 1600. 3. sor: 2700, 3400. Csúcs: 2700 + 3400 = 6100. (A 2500 csak az alsó sor összege.)'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'as10k-q21',
    level: 3,
    questionTypeBadge: 'Összegpiramis',
    figure: <PyrFig rows={[[700, null, 1100, null], [1600, null, 2300], [null, 4300], [null]]} />,
    question: 'Melyik szám kerül az alsó sorban a 700 mellé (a bal oldali „?” helyére)?',
    options: ['900', '2300', '1000', '800'],
    correctAnswer: 0,
    explanation: 'A 700 és a keresett szám összege 1600. Ezért 1600 − 700 = 900.'
  },
  {
    id: 'as10k-q22',
    level: 3,
    questionTypeBadge: 'Összegpiramis',
    figure: <PyrFig rows={[[700, 900, 1100, null], [1600, null, 2300], [null, 4300], [null]]} />,
    question: 'Töltsd ki a piramist! Melyik szám kerül a csúcsra?',
    options: ['7900', '5900', '7800', '8900'],
    correctAnswer: 0,
    explanation: '900 + 1100 = 2000, így a 3. sor: 1600 + 2000 = 3600 és 2000 + 2300 = 4300. Csúcs: 3600 + 4300 = 7900.'
  },
  {
    id: 'as10k-q23',
    figure: <JumpFig min={2000} max={7000} start={6500} jumps={[-1100, -1100, -1100]} />,
    level: 3,
    questionTypeBadge: 'Sorozat',
    question: 'Folytasd a sorozatot! A szabály: −1100. 6500, 5400, 4300, ?',
    options: ['3200', '3300', '3100', '2200'],
    correctAnswer: 0,
    explanation: '4300 − 1100 = 3200. (4300 − 1000 = 3300, majd − 100 = 3200.)'
  },
  {
    id: 'as10k-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Debridán a kobold szülők együttes életkora 6000 év. Az anya 3600 éves. Hány éves az apa?',
    options: ['2400', '2600', '3400', '9600'],
    correctAnswer: 0,
    explanation: '6000 − 3600 = 2400. Ellenőrzés: 3600 + 2400 = 6000.'
  },
  {
    id: 'as10k-q25',
    level: 3,
    questionTypeBadge: 'Hiányzó tag',
    figure: <CartsFig masses={['800 kg', '1400 kg', '?', '1700 kg']} />,
    question: 'A pónik 4 csillét húznak, együtt 5000 kg-ot. Hány kg a C csille?',
    options: ['1100 kg', '1200 kg', '2100 kg', '1300 kg'],
    correctAnswer: 0,
    explanation: 'A három ismert csille: 800 + 1400 + 1700 = 3900 kg. A C csille: 5000 − 3900 = 1100 kg.'
  },
  {
    id: 'as10k-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Kobold anya a piacon vett egy láda almát (1200 fabatka), egy zsák krumplit (2000), egy tál diót (800) és befőttet (1600). Mennyit költött?',
    options: ['5600', '5400', '4600', '6600'],
    correctAnswer: 0,
    explanation: 'Ügyesen párosítva: (1200 + 800) + (2000 + 1600) = 2000 + 3600 = 5600.'
  },
  {
    id: 'as10k-q27',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: '3300 + □ < 6000. Melyik a legnagyobb kerek százas, amely a □ helyére írható?',
    options: ['2600', '2700', '3300', '2800'],
    correctAnswer: 0,
    explanation: '3300 + 2700 = 6000, ez nem kisebb 6000-nél. 3300 + 2600 = 5900 < 6000, ezért 2600 a legnagyobb.'
  },
  {
    id: 'as10k-q28',
    level: 3,
    questionTypeBadge: 'Összeadás',
    question: 'Melyik összeg pontosan 10 000?',
    options: ['3800 + 6200', '4600 + 5300', '2700 + 7200', '1900 + 8000'],
    correctAnswer: 0,
    explanation: '38 sz + 62 sz = 100 sz = 10 000. A többi összeg 9900 – ott hiányzik még 100.'
  },
  {
    id: 'as10k-q29',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Szálláshelyek vendégei: Fátyol 7700, Pehely 9200, Lepel 5800, Gomoly 1900 fő. Melyik állítás igaz?',
    options: [
      'A Lepel és a Gomoly vendégei együtt annyian vannak, mint a Fátyol vendégei.',
      'A Pehely és a Gomoly vendégei együtt 10 000-en vannak.',
      'A Fátyolban 2000-rel többen voltak, mint a Lepelben.',
      'A Pehelyben 8300-zal többen voltak, mint a Gomolyban.'
    ],
    correctAnswer: 0,
    explanation: '5800 + 1900 = 7700, ez éppen a Fátyol vendégeinek száma. (9200 + 1900 = 11 100; 7700 − 5800 = 1900; 9200 − 1900 = 7300.)'
  },
  {
    id: 'as10k-q30',
    level: 3,
    questionTypeBadge: 'Hiányzó tag',
    question: '7400 − □ = 2600. Melyik szám kerül a □ helyére?',
    options: ['4800', '5800', '4200', '10 000'],
    correctAnswer: 0,
    explanation: '7400 − 2600 = 4800. Ellenőrzés: 7400 − 4800 = 2600. ✓'
  }
];

export const AddSub10000Quiz: React.FC<{
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
      topicId="g4-count-osszeadas-10000-quiz"
      subtopicId="osszeadas-kivonas-10000-ig"
      title="11. Összeadás és kivonás 10 000-ig – Kvíz"
      subtitle="30 feladat 3 szinten: kerek ezresek és százasok összeadása, kivonása, pótlás, szöveges feladatok."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      questions={ADD_SUB_10000_QUESTIONS}
      cheatSheets={[
        {
          title: 'Kerek ezresek, százasok',
          items: [
            '3 + 4 = 7 → 3000 + 4000 = 7000',
            '11 sz + 12 sz = 23 sz → 1100 + 1200 = 2300',
            '10 − 4 = 6 → 10 000 − 4000 = 6000',
            'Pótlás: 8300 + 700 = 9000'
          ]
        },
        {
          title: 'Három módszer (3400 + 5700)',
          items: [
            'Bence: 34 sz + 57 sz = 91 sz = 9100',
            'Jancsi: 3400 + 5000 + 700 = 9100',
            'Marci: 3400 + 700 + 5000 = 9100',
            'Kivonásnál ugyanígy: 8200 − 5000 − 300 = 2900'
          ]
        },
        {
          title: 'Figyelj!',
          items: [
            'Átlépés: 2600 + 4500 = 7100 (nem 6100)',
            '„1200-zal kevesebb, mint júniusban” → júniusban több volt!',
            'Ellenőrizz: 2400 + 6700 = 9100',
            'Csoportosíts: 1200 + 800 = 2000'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AddSub10000Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AddSub10000Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default AddSub10000Quiz;
