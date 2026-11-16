import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MeasurementsOutlookMatcher } from './MeasurementsOutlookMatcher';
import { MeasurementsOutlookSorter } from './MeasurementsOutlookSorter';
import { TANKS, animalIcon } from './MeasurementsOutlookFigures';

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

const SHORT = ['traktor', 'autóbusz', 'személyautó', 'helikopter'];

/** Tartály-diagram (felirat nélküli oszlopok) */
const TankFig: React.FC = () => {
  const x0 = 76;
  const sc = 0.18;
  return (
    <QFig h={130}>
      {[0, 200, 400, 600, 800].map((v) => (
        <g key={v}>
          <line x1={x0 + v * sc} y1="10" x2={x0 + v * sc} y2="104" stroke="#e2e8f0" />
          <text x={x0 + v * sc} y="116" textAnchor="middle" fontSize="8" fill="#475569">{v}</text>
        </g>
      ))}
      {[100, 300, 500, 700].map((v) => (
        <line key={v} x1={x0 + v * sc} y1="10" x2={x0 + v * sc} y2="104" stroke="#f1f5f9" />
      ))}
      {TANKS.map((t, i) => (
        <g key={t.n}>
          <text x={x0 - 4} y={27 + i * 22} textAnchor="end" fontSize="9" fill="#334155">{SHORT[i]}</text>
          <rect x={x0} y={17 + i * 22} width={t.v * sc} height="13" rx="2" fill={t.c} />
        </g>
      ))}
      <line x1={x0} y1="104" x2={x0 + 800 * sc + 4} y2="104" stroke="#334155" />
      <text x="232" y="126" textAnchor="end" fontSize="8" fill="#475569">liter</text>
    </QFig>
  );
};

/** Három üveg adott állapotban */
const JugsFig: React.FC<{ s: [number, number, number]; note?: string }> = ({ s, note }) => {
  const caps = [8, 5, 3];
  const hs = [80, 50, 30];
  return (
    <QFig h={130}>
      {caps.map((c, i) => {
        const x = 30 + i * 70;
        const bottom = 100;
        const lvl = bottom - (hs[i] * s[i]) / c;
        return (
          <g key={c}>
            <rect x={x} y={lvl} width="40" height={bottom - lvl} fill="#a855f7" opacity="0.75" />
            <path d={`M ${x} ${bottom - hs[i] - 4} L ${x} ${bottom} L ${x + 40} ${bottom} L ${x + 40} ${bottom - hs[i] - 4}`} fill="none" stroke="#334155" strokeWidth="2" />
            <text x={x + 20} y="114" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">{c} literes</text>
            <text x={x + 20} y={bottom - hs[i] - 8} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6b21a8">{s[i]} l</text>
          </g>
        );
      })}
      {note && <text x="120" y="126" textAnchor="middle" fontSize="9" fontWeight="bold" fill={UNK}>{note}</text>}
    </QFig>
  );
};

/** Béka-ugrások egy idővonalon */
const FrogFig: React.FC<{ a: number; b: number; jumps: number; note: string }> = ({ a, b, jumps, note }) => {
  const sc = 200 / (jumps * b);
  return (
    <QFig h={120}>
      {[
        { y: 44, len: b, c: '#16a34a', t: `erdei béka: ${b} cm` },
        { y: 92, len: a, c: '#ca8a04', t: `kecskebéka: ${a} cm` }
      ].map((r) => (
        <g key={r.y}>
          <line x1="20" y1={r.y} x2="225" y2={r.y} stroke="#334155" />
          {Array.from({ length: jumps }, (_, k) => {
            const p = 20 + k * r.len * sc;
            const q = 20 + (k + 1) * r.len * sc;
            return <path key={k} d={`M ${p} ${r.y} Q ${(p + q) / 2} ${r.y - 18} ${q} ${r.y}`} fill="none" stroke={r.c} strokeWidth="2" />;
          })}
          <text x="20" y={r.y + 13} fontSize="9" fill="#334155">{r.t}</text>
        </g>
      ))}
      <text x="120" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill={UNK}>{note}</text>
    </QFig>
  );
};

/** Cserearány (emoji) */
const TradeFig: React.FC<{ rows: [string, number, string, number][]; note: string }> = ({ rows, note }) => (
  <QFig h={40 + rows.length * 40}>
    {rows.map(([l, ln, r, rn], i) => (
      <g key={i}>
        {Array.from({ length: ln }, (_, k) => (
          animalIcon(l, 16 + k * 26, 44 + i * 40, 20, `l${k}`)
        ))}
        <text x="84" y={40 + i * 40} fontSize="18" fontWeight="bold" fill="#0f172a">=</text>
        {Array.from({ length: rn }, (_, k) => (
          animalIcon(r, 104 + k * 26, 44 + i * 40, 20, `r${k}`)
        ))}
      </g>
    ))}
    <text x="120" y={30 + rows.length * 40} textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>{note}</text>
  </QFig>
);

/** Golyós doboz */
const BoxFig: React.FC<{ red?: number; blue?: number; note: string }> = ({ red, blue, note }) => (
  <QFig h={120}>
    <path d="M 40 40 L 40 96 L 200 96 L 200 40" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
    <circle cx="80" cy="70" r="12" fill="#dc2626" />
    <text x="80" y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">{red ?? '?'}</text>
    <circle cx="160" cy="70" r="12" fill="#2563eb" />
    <text x="160" y="74" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">{blue ?? '?'}</text>
    <text x="80" y="54" textAnchor="middle" fontSize="9" fill="#334155">piros</text>
    <text x="160" y="54" textAnchor="middle" fontSize="9" fill="#334155">kék</text>
    <text x="120" y="112" textAnchor="middle" fontSize="10" fontWeight="bold" fill={UNK}>{note}</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const MEASUREMENTS_OUTLOOK_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'mo-q1',
    level: 1,
    questionTypeBadge: 'Diagram',
    figure: <TankFig />,
    question: 'Melyik járműnek van a legnagyobb tartálya?',
    options: ['a mezőgazdasági helikopternek', 'az autóbusznak', 'a traktornak', 'a személyautónak'],
    correctAnswer: 0,
    explanation: 'A helikopter vegyszertartálya 800 l, ez a leghosszabb oszlop.'
  },
  {
    id: 'mo-q2',
    level: 1,
    questionTypeBadge: 'Diagram',
    figure: <TankFig />,
    question: 'Hány liter fér a személyautó üzemanyagtartályába?',
    options: ['50 l', '100 l', '5 l', '500 l'],
    correctAnswer: 0,
    explanation: 'Az oszlop a 0 és a 100 közötti vonal feléig ér: 50 l.'
  },
  {
    id: 'mo-q3',
    level: 1,
    questionTypeBadge: 'Diagram',
    figure: <TankFig />,
    question: 'Hány liter fér a traktor üzemanyagtartályába?',
    options: ['100 l', '50 l', '200 l', '300 l'],
    correctAnswer: 0,
    explanation: 'A traktor oszlopa a 100-as vonalig ér.'
  },
  {
    id: 'mo-q4',
    level: 1,
    questionTypeBadge: 'Űrtartalom',
    question: 'Nagyapa 8 liter szőlőlét kapott, és a felét odaadja a barátjának. Hány liter ez?',
    options: ['4 l', '2 l', '16 l', '5 l'],
    correctAnswer: 0,
    explanation: '8 l fele: 8 : 2 = 4 l.'
  },
  {
    id: 'mo-q5',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: 'A kecskebéka 1 méteres ugrásokat tesz. Hány centiméter egy ugrása?',
    options: ['100 cm', '10 cm', '1000 cm', '1 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm.'
  },
  {
    id: 'mo-q6',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: 'Az erdei béka 185 cm-t ugrik. Hogyan mondjuk ezt méterrel és centiméterrel?',
    options: ['1 m 85 cm', '18 m 5 cm', '1 m 8 cm', '185 m'],
    correctAnswer: 0,
    explanation: '100 cm = 1 m, marad 85 cm. 185 cm = 1 m 85 cm.'
  },
  {
    id: 'mo-q7',
    level: 1,
    questionTypeBadge: 'Csere',
    figure: <TradeFig rows={[['🐴', 2, '🫏', 4]]} note="1 ló = ? szamár" />,
    question: 'Két lóért négy szamarat adnak. Hány szamár jár egy lóért?',
    options: ['2', '4', '8', '1'],
    correctAnswer: 0,
    explanation: '4 szamár : 2 ló = 2 szamár egy lóért.'
  },
  {
    id: 'mo-q8',
    level: 1,
    questionTypeBadge: 'Valószínűség',
    question: 'Mona dobozában piros és kék golyók vannak. Becsukott szemmel kiveszel 1 golyót. Biztos, hogy piros lesz?',
    options: ['Lehet, de nem biztos.', 'Biztos.', 'Lehetetlen.', 'Csak kék lehet.'],
    correctAnswer: 0,
    explanation: 'Mindkét színből van a dobozban, ezért lehet piros is, kék is.'
  },
  {
    id: 'mo-q9',
    level: 1,
    questionTypeBadge: 'Űrtartalom',
    figure: <JugsFig s={[8, 0, 0]} />,
    question: 'Mennyi fér összesen az 5 literes és a 3 literes üvegbe?',
    options: ['8 l', '15 l', '2 l', '53 l'],
    correctAnswer: 0,
    explanation: '5 l + 3 l = 8 l. Pont annyi, amennyi szőlőlé van.'
  },
  {
    id: 'mo-q10',
    level: 1,
    questionTypeBadge: 'Valószínűség',
    question: 'Mona dobozában csak piros és kék golyók vannak. Lehet-e zöld golyót húzni?',
    options: ['Lehetetlen.', 'Biztos.', 'Lehet, de nem biztos.', 'Csak ha 7-et húzol.'],
    correctAnswer: 0,
    explanation: 'Zöld golyó nincs a dobozban, ezért lehetetlen zöldet húzni.'
  },

  // ---------- 2. szint ----------
  {
    id: 'mo-q11',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <TankFig />,
    question: 'Hány literrel fér több az autóbusz tartályába, mint a traktoréba?',
    options: ['200 l', '400 l', '300 l', '100 l'],
    correctAnswer: 0,
    explanation: '300 l − 100 l = 200 l.'
  },
  {
    id: 'mo-q12',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <TankFig />,
    question: 'Mekkora a különbség a legnagyobb és a legkisebb tartály között?',
    options: ['750 l', '700 l', '850 l', '500 l'],
    correctAnswer: 0,
    explanation: 'Legnagyobb: helikopter 800 l, legkisebb: személyautó 50 l. 800 − 50 = 750 l.'
  },
  {
    id: 'mo-q13',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <TankFig />,
    question: 'Hány személyautó-tartályt lehetne megtölteni a helikopter tartályában lévő 800 literrel?',
    options: ['16', '8', '40', '160'],
    correctAnswer: 0,
    explanation: '800 l : 50 l = 16.'
  },
  {
    id: 'mo-q14',
    level: 2,
    questionTypeBadge: 'Különbség',
    figure: <FrogFig a={100} b={185} jumps={1} note="1 ugrás után: ? cm előny" />,
    question: 'Egy ugrás után mennyivel van előrébb az erdei béka (185 cm) a kecskebékánál (100 cm)?',
    options: ['85 cm', '285 cm', '185 cm', '95 cm'],
    correctAnswer: 0,
    explanation: '185 cm − 100 cm = 85 cm.'
  },
  {
    id: 'mo-q15',
    level: 2,
    questionTypeBadge: 'Különbség',
    figure: <FrogFig a={100} b={185} jumps={2} note="2 ugrás után: ? cm előny" />,
    question: 'Két ugrás után mennyivel van előrébb az erdei béka?',
    options: ['170 cm', '85 cm', '370 cm', '270 cm'],
    correctAnswer: 0,
    explanation: 'Minden ugrásnál 85 cm-rel nő a különbség: 2 · 85 = 170 cm. (370 cm − 200 cm = 170 cm.)'
  },
  {
    id: 'mo-q16',
    level: 2,
    questionTypeBadge: 'Csere',
    figure: <TradeFig rows={[['🫏', 2, '🐐', 5]]} note="4 szamár = ? kecske" />,
    question: 'Két szamárért öt kecskét adnak. Hány kecske jár négy szamárért?',
    options: ['10', '20', '9', '8'],
    correctAnswer: 0,
    explanation: '4 szamár kétszer annyi, mint 2 szamár, ezért 2 · 5 = 10 kecske.'
  },
  {
    id: 'mo-q17',
    level: 2,
    questionTypeBadge: 'Csere',
    question: 'Két lóért négy szamarat adnak. Hány szamár jár négy lóért?',
    options: ['8', '6', '16', '4'],
    correctAnswer: 0,
    explanation: '4 ló = 2 · 2 ló, ezért 2 · 4 = 8 szamár.'
  },
  {
    id: 'mo-q18',
    level: 2,
    questionTypeBadge: 'Átöntés',
    figure: <JugsFig s={[8, 0, 0]} note="8 l-esből az 5 l-esbe öntünk" />,
    question: 'A tele 8 literes üvegből teletöltjük az üres 5 literest. Mennyi marad a 8 literesben?',
    options: ['3 l', '5 l', '4 l', '13 l'],
    correctAnswer: 0,
    explanation: '8 l − 5 l = 3 l marad.'
  },
  {
    id: 'mo-q19',
    level: 2,
    questionTypeBadge: 'Valószínűség',
    question: 'Mona dobozából legkevesebb 7 golyót kell kivenni, hogy biztosan legyen köztük piros. Hány kék golyó van a dobozban?',
    options: ['6', '7', '8', '13'],
    correctAnswer: 0,
    explanation: 'A legrosszabb esetben először az összes kéket húzzuk ki, és a 7. már biztosan piros. Tehát 6 kék van.'
  },
  {
    id: 'mo-q20',
    level: 2,
    questionTypeBadge: 'Hosszúság',
    question: 'Az erdei béka 185 cm-t ugrik egyszerre. Milyen messze van a rajttól 3 ugrás után?',
    options: ['5 m 55 cm', '3 m 85 cm', '5 m 5 cm', '18 m 5 cm'],
    correctAnswer: 0,
    explanation: '3 · 185 cm = 555 cm = 5 m 55 cm.'
  },

  // ---------- 3. szint ----------
  {
    id: 'mo-q21',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <FrogFig a={100} b={185} jumps={5} note="Hányadik ugrásnál 425 cm az előny?" />,
    question: 'Hányadik ugrásnál volt az erdei béka 425 cm-rel a kecskebéka előtt?',
    options: ['az 5. ugrásnál', 'a 2. ugrásnál', 'a 4. ugrásnál', 'a 6. ugrásnál'],
    correctAnswer: 0,
    explanation: 'Ugrásonként 85 cm-rel nő az előny. 425 : 85 = 5. Ellenőrzés: 925 cm − 500 cm = 425 cm.'
  },
  {
    id: 'mo-q22',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: (
      <TradeFig
        rows={[
          ['🐴', 2, '🫏', 4],
          ['🫏', 2, '🐐', 5]
        ]}
        note="4 ló = ? kecske"
      />
    ),
    question: 'A debridai vásárban két lóért négy szamarat, két szamárért öt kecskét adnak. Hány kecskét kell adni négy lóért?',
    options: ['20', '10', '8', '16'],
    correctAnswer: 0,
    explanation: '4 ló = 8 szamár. 8 szamár = 4 · 2 szamár = 4 · 5 kecske = 20 kecske.'
  },
  {
    id: 'mo-q23',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <BoxFig blue={6} note="legalább 13 kell, hogy biztosan legyen kétféle" />,
    question: 'Mona dobozában 6 kék golyó van. Legkevesebb 13 golyót kell kivenni, hogy biztosan legyen kétféle színű. Hány piros golyó van?',
    options: ['12', '13', '7', '6'],
    correctAnswer: 0,
    explanation: 'A legrosszabb esetben először az összes piros jön ki, és csak a 13. lesz kék. Tehát 12 piros van.'
  },
  {
    id: 'mo-q24',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <BoxFig note="7 → biztosan piros • 13 → biztosan kétféle" />,
    question: 'Hány golyó van összesen Mona dobozában?',
    options: ['18', '20', '13', '19'],
    correctAnswer: 0,
    explanation: '6 kék (mert 7 kell a pirosig) és 12 piros (mert 13 kell a kétféléhez): 6 + 12 = 18.'
  },
  {
    id: 'mo-q25',
    level: 3,
    questionTypeBadge: 'Átöntés',
    figure: <JugsFig s={[3, 2, 3]} note="a 3 l-esből a 8 l-esbe öntünk" />,
    question: 'Most a 8 literesben 3 l, az 5 literesben 2 l, a 3 literesben 3 l van. A 3 literest a 8 literesbe öntjük. Mennyi lesz a 8 literesben?',
    options: ['6 l', '5 l', '3 l', '8 l'],
    correctAnswer: 0,
    explanation: '3 l + 3 l = 6 l. A 8 literesbe ez belefér.'
  },
  {
    id: 'mo-q26',
    level: 3,
    questionTypeBadge: 'Átöntés',
    question: 'Melyik állapotnál sikerült kimérni a 4 litert nagyapa barátjának? (8 literes – 5 literes – 3 literes)',
    options: ['4 l – 4 l – 0 l', '1 l – 4 l – 3 l', '6 l – 2 l – 0 l', '3 l – 5 l – 0 l'],
    correctAnswer: 0,
    explanation: 'A cél: két üvegben 4-4 liter legyen. Ez a 4 l – 4 l – 0 l állapot. Az 1 – 4 – 3 még nem jó, abból még egy átöntés kell.'
  },
  {
    id: 'mo-q27',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <TankFig />,
    question: 'Hányszorosa a helikopter vegyszertartálya a traktor üzemanyagtartályának?',
    options: ['8-szorosa', '7-szerese', '700-szorosa', '80-szorosa'],
    correctAnswer: 0,
    explanation: '800 l : 100 l = 8. (A 700 a különbség, nem a hányados.)'
  },
  {
    id: 'mo-q28',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <FrogFig a={100} b={150} jumps={6} note="Hányadik ugrásnál 300 cm az előny?" />,
    question: 'Egy másik versenyen a kecskebéka 100 cm-t, egy gyors béka 150 cm-t ugrik egyszerre. Hányadik ugrásnál lesz a gyors béka 300 cm-rel előrébb?',
    options: ['a 6. ugrásnál', 'a 2. ugrásnál', 'a 3. ugrásnál', 'az 5. ugrásnál'],
    correctAnswer: 0,
    explanation: 'Ugrásonként 150 − 100 = 50 cm-rel nő az előny. 300 : 50 = 6.'
  },
  {
    id: 'mo-q29',
    level: 3,
    questionTypeBadge: 'Csere',
    question: 'Két lóért négy szamarat, két szamárért öt kecskét adnak. Hány kecskét kell adni 3 lóért?',
    options: ['15', '12', '10', '30'],
    correctAnswer: 0,
    explanation: '3 ló = 6 szamár. 6 szamár = 3 · 2 szamár = 3 · 5 = 15 kecske.'
  },
  {
    id: 'mo-q30',
    level: 3,
    questionTypeBadge: 'Valószínűség',
    figure: <BoxFig red={5} blue={9} note="Hányat kell kivenni, hogy biztosan legyen piros?" />,
    question: 'Egy dobozban 5 piros és 9 kék golyó van. Legkevesebb hány golyót kell becsukott szemmel kivenni, hogy biztosan legyen köztük piros?',
    options: ['10', '6', '9', '14'],
    correctAnswer: 0,
    explanation: 'A legrosszabb esetben először mind a 9 kék jön ki, a 10. már biztosan piros.'
  }
];

export const MeasurementsOutlookQuiz: React.FC<{
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
      topicId="g4-meas-kitekinto-quiz"
      subtopicId="kitekinto"
      title="8. Kitekintő – Kvíz"
      subtitle="30 feladat 3 szinten: tartály-diagram, átöntögetés, békaverseny, vásári csere és golyóhúzás."
      badge="4. OSZTÁLY • II. MÉRÉSEK • KVÍZ"
      questions={MEASUREMENTS_OUTLOOK_QUESTIONS}
      cheatSheets={[
        {
          title: 'Diagram és tartályok',
          items: ['személyautó 50 l, traktor 100 l', 'autóbusz 300 l, helikopter 800 l', 'Különbség: kivonás (800 − 50 = 750)', 'Hányszoros: osztás (800 : 100 = 8)']
        },
        {
          title: 'Békák és csere',
          items: [
            'Előny egy ugrás alatt: 185 − 100 = 85 cm',
            'Keresett előny : egy ugrás előnye = ugrások száma',
            '2 ló = 4 szamár; 2 szamár = 5 kecske',
            '4 ló = 8 szamár = 20 kecske'
          ]
        },
        {
          title: 'Átöntés és golyók',
          items: [
            'Üvegek: 8 l, 5 l, 3 l – cél: 4 l + 4 l',
            'Öntéskor: amíg az egyik ki nem ürül vagy a másik meg nem telik',
            'Biztosan legyen piros: a kék golyók száma + 1',
            'Lehetetlen: ami nincs a dobozban'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MeasurementsOutlookMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MeasurementsOutlookSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MeasurementsOutlookQuiz;
