import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { BinomialCoefficientsMatcher } from './BinomialCoefficientsMatcher';
import { BinomialCoefficientsSorter } from './BinomialCoefficientsSorter';

const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Számozott rekeszek sora; a színes jelölők csak a fajtákat mutatják, a választ nem. */
const SlotsFig: React.FC<{ n: number; caption: string; legend?: { color: string; label: string }[] }> = ({ n, caption, legend = [] }) => {
  const w = Math.min(26, 220 / n);
  const x0 = 120 - (n * w) / 2;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <text x={x0 + i * w + w / 2} y="34" fontSize="9" textAnchor="middle" fill="#64748b">{i + 1}.</text>
          <rect x={x0 + i * w + 2} y="40" width={w - 4} height={w - 4} rx="4" fill="#ffffff" stroke="#a855f7" strokeWidth="1.5" />
          <text x={x0 + i * w + w / 2} y={40 + (w - 4) / 2 + 4} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#7e22ce">?</text>
        </g>
      ))}
      {legend.map((l, i) => (
        <g key={l.label}>
          <circle cx={60 + i * 110} cy="92" r="7" fill={l.color} stroke="#334155" />
          <text x={72 + i * 110} y="96" fontSize="11" fill="#0f172a">{l.label}</text>
        </g>
      ))}
      <text x="120" y="130" fontSize="11" textAnchor="middle" fill="#334155">{caption}</text>
    </svg>
  );
};

/** n pont (ember vagy körvonalon lévő pont) összekötések nélkül. */
const PointsFig: React.FC<{ n: number; caption: string; circle?: boolean; label?: (i: number) => string }> = ({ n, caption, circle, label }) => {
  const cx = 120;
  const cy = 68;
  const R = 46;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      {circle && <circle cx={cx} cy={cy} r={R} fill="none" stroke="#94a3b8" strokeDasharray="4 3" />}
      {Array.from({ length: n }, (_, i) => {
        const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
        const x = cx + R * Math.cos(a);
        const y = cy + R * Math.sin(a);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={circle ? 4 : 8} fill={circle ? '#0f766e' : '#cbd5e1'} stroke="#475569" />
            {label && (
              <text x={cx + (R + 12) * Math.cos(a)} y={cy + (R + 12) * Math.sin(a) + 4} fontSize="10" textAnchor="middle" fontWeight="bold" fill="#134e4a">{label(i)}</text>
            )}
          </g>
        );
      })}
      <text x="120" y="142" fontSize="11" textAnchor="middle" fill="#334155">{caption}</text>
    </svg>
  );
};

const MuseumFig: React.FC = () => {
  const rows = [
    ['10.00–11.00', 22, 2],
    ['11.01–12.00', 30, 10],
    ['12.01–13.00', 35, 45],
    ['13.01–14.00', 40, 36],
    ['14.01–15.00', 37, 43]
  ] as const;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      {['Óra', 'Érkezők', 'Távozók'].map((h, i) => (
        <text key={h} x={[50, 135, 200][i]} y="16" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#334155">{h}</text>
      ))}
      <line x1="8" y1="22" x2="232" y2="22" stroke="#94a3b8" />
      {rows.map((r, i) => (
        <g key={r[0]}>
          <text x="50" y={38 + i * 20} fontSize="10" textAnchor="middle" fill="#0f172a">{r[0]}</text>
          <text x="135" y={38 + i * 20} fontSize="10" textAnchor="middle" fill="#047857">{r[1]}</text>
          <text x="200" y={38 + i * 20} fontSize="10" textAnchor="middle" fill="#b91c1c">{r[2]}</text>
        </g>
      ))}
      <text x="120" y="142" fontSize="10" textAnchor="middle" fill="#334155">14 órakor bent: ? fő</text>
    </svg>
  );
};

const BINOMIAL_COEFFICIENTS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Fogalom és alapértékek (1–10)
  {
    id: 'bc-q1',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit ad meg az (n alatt k) binomiális együttható?',
    options: [
      'Hányféleképpen választhatunk ki n különböző elem közül k darabot, ha nem számít a sorrend',
      'Hányféleképpen állíthatunk sorba n különböző elemet',
      'Hányféleképpen választhatunk ki n elem közül k darabot, ha számít a sorrend',
      'Hány k jegyű szám képezhető n számjegyből ismétléssel'
    ],
    correctAnswer: 0,
    explanation: '(n alatt k) a sorrend nélküli kiválasztások száma, azaz egy n elemű halmaz k elemű részhalmazainak száma.'
  },
  {
    id: 'bc-q2',
    level: 1,
    questionTypeBadge: 'Kiszámítás',
    question: 'Mennyi (5 alatt 2)?',
    options: ['10', '20', '25', '5'],
    correctAnswer: 0,
    explanation: '(5 alatt 2) = 5 · 4 / 2! = 20 / 2 = 10. A 20 a sorrendet is figyelembe vevő kiválasztások száma lenne.'
  },
  {
    id: 'bc-q3',
    level: 1,
    questionTypeBadge: 'Speciális érték',
    question: 'Mennyi (6 alatt 0)?',
    options: ['1', '0', '6', 'Nincs értelmezve'],
    correctAnswer: 0,
    explanation: 'Egy 6 elemű halmaznak egyetlen 0 elemű részhalmaza van, az üres halmaz. Ezért (6 alatt 0) = 1.'
  },
  {
    id: 'bc-q4',
    level: 1,
    questionTypeBadge: 'Kiszámítás',
    question: 'Mennyi (7 alatt 3)?',
    options: ['35', '210', '21', '343'],
    correctAnswer: 0,
    explanation: '(7 alatt 3) = 7 · 6 · 5 / 3! = 210 / 6 = 35. A 210 a rendezett kiválasztások száma, a 343 = 7³.'
  },
  {
    id: 'bc-q5',
    level: 1,
    questionTypeBadge: 'Szimmetria',
    question: 'Melyik egyenlő (11 alatt 6)-tal?',
    options: ['(11 alatt 5)', '(11 alatt 7)', '(6 alatt 11)', '11 · 6'],
    correctAnswer: 0,
    explanation: 'Szimmetria: (n alatt k) = (n alatt n − k), így (11 alatt 6) = (11 alatt 5) = 462. Ha 6 gyerek kimegy, azzal az 5 bent maradót is kiválasztottuk.'
  },
  {
    id: 'bc-q6',
    level: 1,
    questionTypeBadge: 'Kézfogás',
    figure: <PointsFig n={7} caption="7 ember – ? kézfogás" />,
    question: '7 ember közül mindenki mindenkivel kezet fog. Hány kézfogás történik?',
    options: ['21', '42', '49', '14'],
    correctAnswer: 0,
    explanation: 'Egy kézfogás két ember rendezetlen párja: (7 alatt 2) = 7 · 6 / 2 = 21.'
  },
  {
    id: 'bc-q7',
    level: 1,
    questionTypeBadge: 'Számít a sorrend',
    question: '7 ember közül választunk egy titkárt és egy jegyzőt. Hányféleképpen tehetjük meg?',
    options: ['42', '21', '14', '49'],
    correctAnswer: 0,
    explanation: 'A két szerep különböző, ezért számít a sorrend: 7 · 6 = 42. (Ugyanaz az ember nem lehet mindkettő.)'
  },
  {
    id: 'bc-q8',
    level: 1,
    questionTypeBadge: 'Számológép',
    question: 'Melyik számológép-funkcióval számolható ki közvetlenül az (n alatt k)?',
    options: ['nCr', 'nPr', 'x!', 'xʸ'],
    correctAnswer: 0,
    explanation: 'Az nCr funkció (kombináció) adja (n alatt k)-t, pl. 11 nCr 6 = 462. Az nPr a sorrendet is figyelembe veszi.'
  },
  {
    id: 'bc-q9',
    level: 1,
    questionTypeBadge: 'Részhalmazok',
    question: 'Összesen hány részhalmaza van egy 7 elemű halmaznak?',
    options: ['128', '127', '64', '49'],
    correctAnswer: 0,
    explanation: '1 + 7 + 21 + 35 + 35 + 21 + 7 + 1 = 128 = 2⁷ (az üres halmazt és magát a halmazt is beleszámolva).'
  },
  {
    id: 'bc-q10',
    level: 1,
    questionTypeBadge: 'Speciális érték',
    question: 'Mennyi (n alatt 1), ha n ≥ 1?',
    options: ['n', '1', 'n − 1', 'n!'],
    correctAnswer: 0,
    explanation: 'n elem közül 1-et n-féleképpen választhatunk: (n alatt 1) = n.'
  },

  // LEVEL 2: Tankönyvi alkalmazások (11–20)
  {
    id: 'bc-q11',
    level: 2,
    questionTypeBadge: 'Sálminta',
    figure: <SlotsFig n={7} caption="7 rekesz: melyik 3-ba kerül sima szem?" legend={[{ color: '#c026d3', label: '3 sima' }, { color: '#ffffff', label: '4 fordított' }]} />,
    question: 'Anita hétszemenként ismétlődő mintát köt, a 7 szemből 3 sima, 4 fordított. Hányféle minta közül választhat?',
    options: ['35', '210', '128', '21'],
    correctAnswer: 0,
    explanation: 'A 7 rekesz közül kell kiválasztani a 3 sima szem helyét, a sorrend nem számít: (7 alatt 3) = 35.'
  },
  {
    id: 'bc-q12',
    level: 2,
    questionTypeBadge: 'Kétféle elem sorban',
    figure: <SlotsFig n={8} caption="8 hely – ? sorrend" legend={[{ color: '#ef4444', label: '3 piros' }, { color: '#facc15', label: '5 sárga' }]} />,
    question: '3 egyforma piros és 5 egyforma sárga elemet rendezünk sorba. Hányféle sorrend lehetséges?',
    options: ['56', '336', '40 320', '15'],
    correctAnswer: 0,
    explanation: 'A 8 hely közül kiválasztjuk a 3 piros helyét: (8 alatt 3) = 56 = (8 alatt 5). A 40 320 = 8! a különböző elemek sorrendjeinek száma lenne.'
  },
  {
    id: 'bc-q13',
    level: 2,
    questionTypeBadge: 'Kiválasztás',
    question: 'Kamillának 11 tantárgya van, hétfőn 6-ból van egy-egy órája. Hányféleképpen választható ki a 6 tantárgy?',
    options: ['462', '332 640', '66', '720'],
    correctAnswer: 0,
    explanation: 'Csak az számít, melyik 6 tantárgy: (11 alatt 6) = 462.'
  },
  {
    id: 'bc-q14',
    level: 2,
    questionTypeBadge: 'Órarend',
    question: 'Hány különböző hétfői órarendje lehetne Kamillának (11 tantárgyból 6 óra, mindegyik tárgyból legfeljebb egy)?',
    options: ['332 640', '462', '720', '1 771 561'],
    correctAnswer: 0,
    explanation: 'Az órarendben számít a sorrend: 11 · 10 · 9 · 8 · 7 · 6 = 332 640 = 462 · 6!. Az 1 771 561 = 11⁶ ismétlést is megengedne.'
  },
  {
    id: 'bc-q15',
    level: 2,
    questionTypeBadge: 'Kártya',
    question: 'A 32 lapos magyar kártyából 3 lapot osztanak nekünk. Hányféle lehet ez a kezdő 3 lap?',
    options: ['4960', '29 760', '32 768', '96'],
    correctAnswer: 0,
    explanation: 'A kézben lévő lapok sorrendje nem számít: (32 alatt 3) = 32 · 31 · 30 / 6 = 4960.'
  },
  {
    id: 'bc-q16',
    level: 2,
    questionTypeBadge: 'Szakaszok',
    figure: <PointsFig n={7} circle caption="7 pont a körvonalon – ? szakasz" label={(i) => String.fromCharCode(65 + i)} />,
    question: 'Egy körvonalon 7 különböző pontot veszünk fel, és mindegyiket összekötjük mindegyikkel. Hány szakaszt rajzolunk?',
    options: ['21', '42', '7', '35'],
    correctAnswer: 0,
    explanation: 'Egy szakaszt két végpontja határoz meg, az AB és BA ugyanaz: (7 alatt 2) = 21.'
  },
  {
    id: 'bc-q17',
    level: 2,
    questionTypeBadge: 'Számít a sorrend?',
    question: 'Melyik feladat eredménye (7 alatt 2) = 7 · 6 / 2?',
    options: [
      '7 kosárlabdacsapat körmérkőzésének meccsszáma',
      '7 ember mindegyike SMS-t küld mindenki másnak – az üzenetek száma',
      '7 sziget mindegyikéről hajó indul minden másikra – a hajók száma',
      '7 ember közül titkárt és jegyzőt választunk'
    ],
    correctAnswer: 0,
    explanation: 'A meccsnél A–B és B–A ugyanaz, ezért 21. Az SMS, a hajó és a két szerep esetén számít az irány/szerep: 7 · 6 = 42.'
  },
  {
    id: 'bc-q18',
    level: 2,
    questionTypeBadge: 'Képlet',
    question: 'Melyik a binomiális együttható faktoriálisos alakja?',
    options: ['n! / (k! · (n − k)!)', 'n! / k!', 'n! / (n − k)!', 'k! · (n − k)! / n!'],
    correctAnswer: 0,
    explanation: 'A szorzatos alakot (n − k)!-sal bővítve: (n alatt k) = n! / (k! · (n − k)!). Az n!/(n − k)! a rendezett kiválasztások száma.'
  },
  {
    id: 'bc-q19',
    level: 2,
    questionTypeBadge: 'Kiválasztás',
    question: 'Csilla 15 színből választ ki 4 színt egy karkötőhöz. Hányféleképpen teheti meg?',
    options: ['1365', '32 760', '60', '50 625'],
    correctAnswer: 0,
    explanation: 'A színek sorrendje nem számít: (15 alatt 4) = 15 · 14 · 13 · 12 / 24 = 1365.'
  },
  {
    id: 'bc-q20',
    level: 2,
    questionTypeBadge: 'Kétféle elem sorban',
    figure: <SlotsFig n={9} caption="egy sor: 9 gyöngy – ? féle" legend={[{ color: '#a855f7', label: '6 lila' }, { color: '#facc15', label: '3 sárga' }]} />,
    question: 'A karkötő egy sora 6 lila és 3 sárga gyöngyből áll. Hányféle sort állíthat össze Csilla?',
    options: ['84', '504', '18', '362 880'],
    correctAnswer: 0,
    explanation: 'A 9 hely közül kiválasztjuk a 3 sárga helyét: (9 alatt 3) = 84 (= (9 alatt 6)).'
  },

  // LEVEL 3: Összetettebb feladatok (21–30)
  {
    id: 'bc-q21',
    level: 3,
    questionTypeBadge: 'Számjegyek',
    figure: <SlotsFig n={4} caption="4 jegyű szám – ? darab" legend={[{ color: '#e2e8f0', label: '4 db 1-es' }, { color: '#94a3b8', label: '2 db 2-es' }]} />,
    question: 'Hány 4 jegyű pozitív egész írható fel 4 db egyes és 2 db kettes számjegy felhasználásával (nem kell mindet felhasználni)?',
    options: ['11', '15', '6', '16'],
    correctAnswer: 0,
    explanation: 'Legfeljebb 2 kettes lehet: 0 kettes: 1; 1 kettes: (4 alatt 1) = 4; 2 kettes: (4 alatt 2) = 6. Összesen 11.'
  },
  {
    id: 'bc-q22',
    level: 3,
    questionTypeBadge: 'Kompetenciamérés',
    figure: <MuseumFig />,
    question: 'A múzeumba 10 és 14 óra között 22 + 30 + 35 + 40 látogató érkezett, és 2 + 10 + 45 + 36 távozott. A riporter a 14 órakor bent lévők közül 3 embert választ. Hányféleképpen?',
    options: ['5984', '35 904', '4060', '6545'],
    correctAnswer: 0,
    explanation: 'Bent: 127 − 93 = 34 fő. A sorrend nem számít: (34 alatt 3) = 5984.'
  },
  {
    id: 'bc-q23',
    level: 3,
    questionTypeBadge: 'Kártya',
    question: 'A 32 lapos kártyából kaptunk 3 lapot. A maradék pakliból még 2 lapot húzunk. Hányféle lehet ez a két lap?',
    options: ['406', '812', '496', '378'],
    correctAnswer: 0,
    explanation: '32 − 3 = 29 lap maradt: (29 alatt 2) = 29 · 28 / 2 = 406.'
  },
  {
    id: 'bc-q24',
    level: 3,
    questionTypeBadge: 'Szimmetria',
    question: 'Miért igaz, hogy egy 7 elemű halmaznak ugyanannyi 3 elemű, mint 4 elemű részhalmaza van?',
    options: [
      'Mert minden 3 elemű részhalmaz kiválasztása egyben a kimaradó 4 elem kiválasztása',
      'Mert 3 + 4 = 7 páratlan',
      'Mert minden részhalmaznak legalább 3 eleme van',
      'Mert 3! = 4! / 4'
    ],
    correctAnswer: 0,
    explanation: 'Kölcsönösen egyértelmű megfeleltetés: részhalmaz ↔ komplementere. Ezért (7 alatt 3) = (7 alatt 4) = 35.'
  },
  {
    id: 'bc-q25',
    level: 3,
    questionTypeBadge: 'Szimmetria',
    question: 'Kamillának kedden 5 tantárgya van a 11-ből. Az 5 keddi tantárgy vagy a kimaradó 6 kiválasztására van több lehetőség?',
    options: [
      'Ugyanannyi: (11 alatt 5) = (11 alatt 6) = 462',
      'Az 5 kiválasztására, mert kevesebb elemet kell választani',
      'A 6 kiválasztására, mert több elemet kell választani',
      'Az 5 kiválasztására: 55 440 a 462 helyett'
    ],
    correctAnswer: 0,
    explanation: 'Ha kiválasztjuk az 5 keddi tárgyat, ezzel meghatároztuk a kimaradó 6-ot is, és fordítva: (11 alatt 5) = (11 alatt 6) = 462.'
  },
  {
    id: 'bc-q26',
    level: 3,
    questionTypeBadge: 'Órarend',
    question: 'Hány különböző keddi órarend készíthető az 5 kiválasztott tantárgyból (mindegyikből 1 óra)?',
    options: ['120', '720', '462', '55 440'],
    correctAnswer: 0,
    explanation: 'Az 5 tárgyat sorba rendezzük: 5! = 120. A hétfői 6 tárgyból 6! = 720 – tehát kedden kevesebb.'
  },
  {
    id: 'bc-q27',
    level: 3,
    questionTypeBadge: 'Kiválasztás',
    question: 'Egy 10 fős csoportból 4 fős, egyenrangú tagokból álló csapatot választunk. Hányféleképpen?',
    options: ['210', '5040', '40', '24'],
    correctAnswer: 0,
    explanation: '(10 alatt 4) = 10 · 9 · 8 · 7 / 4! = 5040 / 24 = 210.'
  },
  {
    id: 'bc-q28',
    level: 3,
    questionTypeBadge: 'Kézfogás',
    question: 'Egy csoportban mindenki mindenkivel egyszer kezet fogott, összesen 45 kézfogás történt. Hányan voltak?',
    options: ['10', '9', '45', '15'],
    correctAnswer: 0,
    explanation: '(n alatt 2) = n(n − 1)/2 = 45 ⇒ n(n − 1) = 90 ⇒ n = 10.'
  },
  {
    id: 'bc-q29',
    level: 3,
    questionTypeBadge: 'Számjegyek',
    question: 'Hány 4 jegyű pozitív egész írható fel 3 db egyes és 3 db kettes számjegy felhasználásával?',
    options: ['14', '16', '20', '8'],
    correctAnswer: 0,
    explanation: 'Minden 4 hosszú 1–2 sorozat jó, kivéve az 1111-et és a 2222-t (abból nincs elég számjegy): 2⁴ − 2 = 14. Vagy: 4 + 6 + 4 = 14.'
  },
  {
    id: 'bc-q30',
    level: 3,
    questionTypeBadge: 'Számít a sorrend?',
    question: 'Egy 20 fős osztályban a) 2 egyenrangú felelőst, b) egy osztálytitkárt és egy helyettest választanak. Hány lehetőség van az a), illetve a b) esetben?',
    options: ['190 és 380', '380 és 190', '190 és 190', '400 és 380'],
    correctAnswer: 0,
    explanation: 'a) Egyenrangú szerep, a sorrend nem számít: (20 alatt 2) = 190. b) Két különböző szerep: 20 · 19 = 380.'
  }
];

export const BinomialCoefficientsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId="g11-comb-binomialis-quiz"
      subtopicId="binomialis-egyutthatok"
      title="4. Binomiális együtthatók – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: az (n alatt k) jelentése, kiszámítása, szimmetriája és tankönyvi alkalmazásai."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • KVÍZ"
      questions={BINOMIAL_COEFFICIENTS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az (n alatt k)',
          items: [
            'n különböző elemből k kiválasztása, sorrend nélkül.',
            '= egy n elemű halmaz k elemű részhalmazainak száma.',
            '(n alatt k) = n · (n − 1) · … · (n − k + 1) / k!',
            '(n alatt k) = n! / (k! · (n − k)!); számológépen: n nCr k'
          ]
        },
        {
          title: 'Fontos értékek',
          items: [
            '(n alatt 0) = (n alatt n) = 1, (0 alatt 0) = 1',
            '(n alatt 1) = n, (n alatt 2) = n(n − 1)/2',
            'Szimmetria: (n alatt k) = (n alatt n − k)',
            'Részhalmazok száma összesen: 2ⁿ'
          ]
        },
        {
          title: 'Számít-e a sorrend?',
          items: [
            'Kézfogás, szakasz, meccs, kártyalapok: NEM ⇒ (n alatt k)',
            'SMS, hajó, titkár + jegyző, órarend: IGEN ⇒ n · (n − 1) · …',
            'Kétféle egyforma elem sorba: (n alatt k), k az egyik fajta száma',
            'Tankönyv: sál 35, 8 hely 56, 11-ből 6: 462, 32 lapból 3: 4960'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <BinomialCoefficientsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <BinomialCoefficientsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default BinomialCoefficientsQuiz;
