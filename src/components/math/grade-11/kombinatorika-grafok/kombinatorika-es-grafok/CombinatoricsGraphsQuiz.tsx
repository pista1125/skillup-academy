import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CombinatoricsGraphsMatcher } from './CombinatoricsGraphsMatcher';
import { CombinatoricsGraphsSorter } from './CombinatoricsGraphsSorter';

// ---- Kis gráfrajzoló a kvízkérdések ábráihoz ----
type MV = { id: string; x: number; y: number; label?: string; note?: string };

const MiniGraph: React.FC<{
  v: MV[];
  e?: [string, string][];
  title?: string;
  w?: number;
  h?: number;
}> = ({ v, e = [], title, w = 240, h = 150 }) => {
  const pos = Object.fromEntries(v.map((p) => [p.id, p]));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {title && (
        <text x={w / 2} y="16" fontSize="10.5" textAnchor="middle" fontWeight="bold" fill="#334155">
          {title}
        </text>
      )}
      {e.map(([a, b]) => (
        <line key={a + b} x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y} stroke="#2563eb" strokeWidth="2" />
      ))}
      {v.map((p) => (
        <g key={p.id}>
          <circle cx={p.x} cy={p.y} r="6" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1.5" />
          {p.label && (
            <text x={p.x} y={p.y - 10} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0f172a">
              {p.label}
            </text>
          )}
          {p.note && (
            <text x={p.x} y={p.y + 19} fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#b45309">
              {p.note}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

const ringV = (n: number, cx: number, cy: number, r: number, labels?: string[], notes?: string[]): MV[] =>
  Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return { id: `v${i}`, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), label: labels?.[i], note: notes?.[i] };
  });

const TT_FIG = (
  <MiniGraph
    title="8 versenyző – eddig lejátszott meccsek száma"
    w={240}
    h={170}
    v={ringV(8, 120, 95, 55, undefined, ['7', '7', '6', '6', '5', '5', '5', '5'])}
  />
);

const ROADS_FIG = (
  <MiniGraph
    title="5 település, 6 út"
    v={ringV(5, 120, 85, 50, ['A', 'B', 'C', 'D', 'E'])}
    e={[
      ['v0', 'v1'],
      ['v1', 'v2'],
      ['v2', 'v3'],
      ['v3', 'v4'],
      ['v4', 'v0'],
      ['v0', 'v2']
    ]}
  />
);

const COMBINATORICS_GRAPHS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Teljes gráf, fokszámtétel, csúcs vagy él (1–10)
  {
    id: 'cg-q1',
    level: 1,
    questionTypeBadge: 'Teljes gráf',
    question: 'Mikor nevezünk egy gráfot teljes gráfnak?',
    options: [
      'Ha bármely két csúcsa között pontosan egy él fut',
      'Ha minden csúcsán van hurokél',
      'Ha minden csúcs fokszáma páros',
      'Ha nincs benne izolált csúcs'
    ],
    correctAnswer: 0,
    explanation: 'A teljes gráfban bármely két csúcs között pontosan egy él fut.'
  },
  {
    id: 'cg-q2',
    level: 1,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hány éle van az n pontú teljes gráfnak?',
    options: ['n · (n − 1) / 2', 'n · (n − 1)', 'n²', '2n'],
    correctAnswer: 0,
    explanation: 'Annyi, ahányféleképpen az n csúcsból 2-t kiválaszthatunk, sorrend nélkül: C(n; 2) = n · (n − 1) / 2.'
  },
  {
    id: 'cg-q3',
    level: 1,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hány éle van az 5 pontú teljes gráfnak?',
    figure: <MiniGraph title="5 pontú teljes gráf: ? él" v={ringV(5, 120, 85, 50, ['A', 'B', 'C', 'D', 'E'])} />,
    options: ['10', '20', '25', '5'],
    correctAnswer: 0,
    explanation: 'C(5; 2) = 5 · 4 / 2 = 10. A 20 = 5 · 4 minden élt kétszer számolna.'
  },
  {
    id: 'cg-q4',
    level: 1,
    questionTypeBadge: 'Teljes gráf',
    question: 'Mennyi az n pontú teljes gráf egy csúcsának fokszáma?',
    options: ['n − 1', 'n', 'n · (n − 1) / 2', '2'],
    correctAnswer: 0,
    explanation: 'Minden csúcs a többi n − 1 csúccsal van összekötve.'
  },
  {
    id: 'cg-q5',
    level: 1,
    questionTypeBadge: 'Fokszámtétel',
    question: 'Mit mond ki a fokszámok összegére vonatkozó tétel?',
    options: [
      'A fokszámok összege az élek számának kétszerese',
      'A fokszámok összege egyenlő az élek számával',
      'A fokszámok összege egyenlő a csúcsok számával',
      'A fokszámok összege mindig páratlan'
    ],
    correctAnswer: 0,
    explanation: 'Fokszámok összege = 2 · élek száma, mert minden él két csúcsnál számít bele.'
  },
  {
    id: 'cg-q6',
    level: 1,
    questionTypeBadge: 'Fokszámtétel',
    question: 'Milyen szám a gráf fokszámainak összege?',
    options: ['Mindig páros', 'Mindig páratlan', 'Mindig a csúcsok számával egyenlő', 'Lehet páros és páratlan is'],
    correctAnswer: 0,
    explanation: 'Mivel az élek számának kétszerese, mindig páros (hurokél esetén is).'
  },
  {
    id: 'cg-q7',
    level: 1,
    questionTypeBadge: 'Fokszámtétel',
    question: 'Egy gráfnak 9 éle van. Mennyi a fokszámainak összege?',
    options: ['18', '9', '81', '36'],
    correctAnswer: 0,
    explanation: '2 · 9 = 18.'
  },
  {
    id: 'cg-q8',
    level: 1,
    questionTypeBadge: 'Teljes gráf',
    question: '6 ember találkozik, mindenki mindenkivel egyszer kezet fog. Hány kézfogás történik?',
    options: ['15', '30', '36', '12'],
    correctAnswer: 0,
    explanation: 'A 6 pontú teljes gráf élei: C(6; 2) = 15.'
  },
  {
    id: 'cg-q9',
    level: 1,
    questionTypeBadge: 'Csúcsok közül',
    question: 'Az ábrán 5 település és a köztük lévő 6 út látható. Hányféleképpen választhatunk ki 2 települést?',
    figure: ROADS_FIG,
    options: ['10', '15', '20', '6'],
    correctAnswer: 0,
    explanation: 'Az 5 település (csúcs) közül választunk: C(5; 2) = 10. (A 15 az utak közüli választás lenne.)'
  },
  {
    id: 'cg-q10',
    level: 1,
    questionTypeBadge: 'Élek közül',
    question: 'Ugyanebben a gráfban (5 település, 6 út) hányféleképpen választhatunk ki 2 utat?',
    figure: ROADS_FIG,
    options: ['15', '10', '30', '12'],
    correctAnswer: 0,
    explanation: 'A 6 út (él) közül választunk: C(6; 2) = 15.'
  },

  // LEVEL 2: Tankönyvi feladatok (11–20)
  {
    id: 'cg-q11',
    level: 2,
    questionTypeBadge: 'Fokszámtétel',
    question: '8 versenyző körmérkőzésén ketten 7, ketten 6, négyen 5 meccset játszottak eddig. Hány mérkőzés zajlott le?',
    figure: TT_FIG,
    options: ['23', '46', '28', '18'],
    correctAnswer: 0,
    explanation: '2 · 7 + 2 · 6 + 4 · 5 = 46; minden meccset két versenyző számol, így 46 / 2 = 23.'
  },
  {
    id: 'cg-q12',
    level: 2,
    questionTypeBadge: 'Teljes gráf',
    question: 'Ugyanebben a bajnokságban (8 versenyző, eddig 23 meccs) hány mérkőzés van még hátra?',
    figure: TT_FIG,
    options: ['5', '33', '10', '18'],
    correctAnswer: 0,
    explanation: 'A teljes bajnokság C(8; 2) = 28 meccs, hátra van 28 − 23 = 5. (A 33 = 56 − 23 a 8 · 7 = 56-ból számolna.)'
  },
  {
    id: 'cg-q13',
    level: 2,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hány csúcsa van annak a teljes gráfnak, amelynek 36 éle van?',
    options: ['9', '6', '8', '18'],
    correctAnswer: 0,
    explanation: 'n · (n − 1) / 2 = 36 ⇒ n · (n − 1) = 72 = 9 · 8 ⇒ n = 9.'
  },
  {
    id: 'cg-q14',
    level: 2,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hány csúcsa van annak a teljes gráfnak, amelyben a fokszámok összege 156?',
    options: ['13', '12', '78', '156'],
    correctAnswer: 0,
    explanation: 'Az élek száma 156 / 2 = 78; n · (n − 1) = 156 = 13 · 12 ⇒ n = 13.'
  },
  {
    id: 'cg-q15',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'Egy eljegyzésen a Tóth családból öten vannak. Hány koccintás történik a Tóth család tagjai között, ha mindenki mindenkivel egyszer koccint?',
    options: ['10', '20', '25', '5'],
    correctAnswer: 0,
    explanation: 'C(5; 2) = 10.'
  },
  {
    id: 'cg-q16',
    level: 2,
    questionTypeBadge: 'Kombináció',
    question: 'A Lengyel családból nyolcan vannak az eljegyzésen. Hány koccintás történik a Lengyel család tagjai között?',
    options: ['28', '56', '64', '16'],
    correctAnswer: 0,
    explanation: 'C(8; 2) = 8 · 7 / 2 = 28.'
  },
  {
    id: 'cg-q17',
    level: 2,
    questionTypeBadge: 'Szorzási szabály',
    question: 'Hány koccintás történik a Tóth család (5 fő) és a Lengyel család (8 fő) tagjai KÖZÖTT?',
    figure: (
      <MiniGraph
        title="Tóth (5 fő) – Lengyel (8 fő): ? koccintás"
        w={240}
        h={150}
        v={[
          ...Array.from({ length: 5 }, (_, i) => ({ id: `t${i}`, x: 50, y: 32 + i * 26 })),
          ...Array.from({ length: 8 }, (_, i) => ({ id: `l${i}`, x: 190, y: 28 + i * 16 }))
        ]}
      />
    ),
    options: ['40', '78', '13', '38'],
    correctAnswer: 0,
    explanation: 'Minden Tóth mindegyik Lengyellel koccint: 5 · 8 = 40. (A 78 = C(13; 2) az összes koccintás.)'
  },
  {
    id: 'cg-q18',
    level: 2,
    questionTypeBadge: 'Ismeretségi gráf',
    question: 'Öt résztvevő: A mindenkit ismer, B mindenkit E kivételével, C két embert, D hármat ismer. Kiket ismer E?',
    figure: (
      <MiniGraph
        title="A és B ismeretségei berajzolva"
        v={[
          { id: 'A', x: 120, y: 34, label: 'A' },
          { id: 'B', x: 200, y: 80, label: 'B' },
          { id: 'C', x: 170, y: 130, label: 'C' },
          { id: 'D', x: 70, y: 130, label: 'D' },
          { id: 'E', x: 40, y: 80, label: 'E ?' }
        ]}
        e={[
          ['A', 'B'],
          ['A', 'C'],
          ['A', 'D'],
          ['A', 'E'],
          ['B', 'C'],
          ['B', 'D']
        ]}
      />
    ),
    options: ['A-t és D-t', 'Csak A-t', 'A-t és C-t', 'A-t, C-t és D-t'],
    correctAnswer: 0,
    explanation: 'C-t A és B ismeri, így C ismerősei pontosan ők. D-nek A és B mellé kell még egy ismerős; C már nem lehet, így E. Tehát E ismerősei: A és D.'
  },
  {
    id: 'cg-q19',
    level: 2,
    questionTypeBadge: 'Teljes gráf',
    question: 'Az öt résztvevő mindegyike mindenkivel pontosan egyszer koccint. Hány koccintás történik?',
    options: ['10', '20', '7', '25'],
    correctAnswer: 0,
    explanation: 'Az 5 pontú teljes gráf élei: C(5; 2) = 10.'
  },
  {
    id: 'cg-q20',
    level: 2,
    questionTypeBadge: 'Fokszámtétel',
    question: 'Van-e olyan gráf, amelynek 5 csúcsa, 7 éle van, és a fokszámok összege 12?',
    options: [
      'Nincs, mert 7 él esetén a fokszámösszeg 14',
      'Van, például egy ötszög két átlóval',
      'Van, mert 12 páros',
      'Nincs, mert 5 csúcsú gráfnak legfeljebb 5 éle lehet'
    ],
    correctAnswer: 0,
    explanation: 'Fokszámösszeg = 2 · élszám = 14 ≠ 12. (5 csúcson egyébként akár 10 él is lehet.)'
  },

  // LEVEL 3: Érettségi és összetett feladatok (21–30)
  {
    id: 'cg-q21',
    level: 3,
    questionTypeBadge: 'Komplementer',
    question: 'A közösségi oldal 6 felhasználója között az ábrán látható ismeretségek vannak. Hány olyan pár van, akik még NEM ismerősei egymásnak?',
    figure: (
      <MiniGraph
        title="Ki kivel ismerős?"
        w={240}
        h={160}
        v={ringV(6, 120, 88, 52, ['Anna', 'Bence', 'Cili', 'Dénes', 'Edit', 'Feri'])}
        e={[
          ['v0', 'v2'],
          ['v0', 'v3'],
          ['v0', 'v4'],
          ['v0', 'v5'],
          ['v2', 'v5'],
          ['v1', 'v4']
        ]}
      />
    ),
    options: ['9', '6', '15', '30'],
    correctAnswer: 0,
    explanation: 'Összes pár: C(6; 2) = 15; ismerős pár (él): 6. Nem ismerősök: 15 − 6 = 9.'
  },
  {
    id: 'cg-q22',
    level: 3,
    questionTypeBadge: 'Élek közül',
    question: 'Ugyanebben a 6 fős közösségben hányféleképpen választhatunk ki egy olyan párost, akik ismerik egymást?',
    options: ['6', '9', '15', '12'],
    correctAnswer: 0,
    explanation: 'Az ismerős párok a gráf élei: Anna–Cili, Anna–Dénes, Anna–Edit, Anna–Feri, Cili–Feri, Bence–Edit, összesen 6.'
  },
  {
    id: 'cg-q23',
    level: 3,
    questionTypeBadge: 'Teljes gráf',
    question: 'Hét csapat körmérkőzést játszik, eddig 9 mérkőzést játszottak le. Hány mérkőzés van hátra?',
    options: ['12', '33', '5', '40'],
    correctAnswer: 0,
    explanation: 'Összesen C(7; 2) = 21 mérkőzés, 21 − 9 = 12 van hátra. (A 33 = 42 − 9 a 7 · 6 = 42-ből indulna.)'
  },
  {
    id: 'cg-q24',
    level: 3,
    questionTypeBadge: 'Élek közül',
    question: 'Hányféleképpen választhatunk ki a 9 lejátszott mérkőzés közül hármat (sorrend nélkül) statisztikai elemzéshez?',
    options: ['84', '504', '27', '729'],
    correctAnswer: 0,
    explanation: 'C(9; 3) = 9 · 8 · 7 / 6 = 84. Az 504 a sorrendet is figyelembe venné.'
  },
  {
    id: 'cg-q25',
    level: 3,
    questionTypeBadge: 'Csúcsok közül',
    question: 'Egy teljes gráfnak 120 éle van. Hányféleképpen választható ki 4 csúcsa (sorrend nélkül)?',
    options: ['1820', '43 680', '8 214 570', '210'],
    correctAnswer: 0,
    explanation: 'n · (n − 1) = 240 ⇒ n = 16. C(16; 4) = 1820. (A 43 680 = 16 · 15 · 14 · 13 sorrenddel számolna, a 8 214 570 az élek közüli választás.)'
  },
  {
    id: 'cg-q26',
    level: 3,
    questionTypeBadge: 'Élek közül',
    question: 'Ugyanebben a 120 élű teljes gráfban hányféleképpen választható ki 4 él (sorrend nélkül)?',
    options: ['8 214 570', '1820', '480', '207 360 000'],
    correctAnswer: 0,
    explanation: 'A 120 él közül választunk: C(120; 4) = 120 · 119 · 118 · 117 / 24 = 8 214 570.'
  },
  {
    id: 'cg-q27',
    level: 3,
    questionTypeBadge: 'Fokszámtétel',
    question: 'Van-e olyan 7 csúcsú gráf, amelyben minden csúcs fokszáma 3?',
    options: [
      'Nincs, mert a fokszámok összege 21, páratlan',
      'Van, például egy hétszög',
      'Van, mert 3 < 7',
      'Nincs, mert 7 csúcsnál a fokszám legfeljebb 2'
    ],
    correctAnswer: 0,
    explanation: '7 · 3 = 21 páratlan, a fokszámösszeg viszont mindig páros. (A hétszög csúcsainak fokszáma 2.)'
  },
  {
    id: 'cg-q28',
    level: 3,
    questionTypeBadge: 'Fokszámtétel',
    question: 'Van-e olyan 7 csúcsú gráf, amelyben minden csúcs fokszáma egyenlő?',
    options: [
      'Van, például egy hétszög (minden fokszám 2)',
      'Nincs, mert 7 páratlan',
      'Nincs, mert a fokszámösszeg páratlan lenne',
      'Csak hurokélekkel'
    ],
    correctAnswer: 0,
    explanation: 'A közös fokszámnak párosnak kell lennie (7d páros). d = 0, 2, 4, 6 mind megvalósítható, pl. hétszög vagy a 7 pontú teljes gráf.'
  },
  {
    id: 'cg-q29',
    level: 3,
    questionTypeBadge: 'Esetszétválasztás',
    question: 'Az eljegyzésen 13-an vannak (5 Tóth, 8 Lengyel), és mindenki mindenkivel egyszer koccint. Melyik számítás adja helyesen az összes koccintás számát?',
    options: ['10 + 28 + 40 = 78', '10 + 28 = 38', '13 · 12 = 156', '5 · 8 = 40'],
    correctAnswer: 0,
    explanation: 'Családon belül 10 és 28, a családok között 40; összesen 78 = C(13; 2).'
  },
  {
    id: 'cg-q30',
    level: 3,
    questionTypeBadge: 'Fokszámtétel',
    question: '8 versenyző válaszai a lejátszott meccseik számára: 7, 7, 6, 6, 5, 5, 5, 4. Mit állapíthatunk meg?',
    options: [
      'Valaki rosszul emlékszik, mert a válaszok összege 45, páratlan',
      '22,5 mérkőzés zajlott le',
      '45 mérkőzés zajlott le',
      'Még 5,5 mérkőzés van hátra'
    ],
    correctAnswer: 0,
    explanation: 'A válaszok összege a fokszámösszeg, ennek párosnak kell lennie. 45 páratlan, tehát a válaszok nem lehetnek mind igazak.'
  }
];

export const CombinatoricsGraphsQuiz: React.FC<{
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
      topicId="g11-comb-kombinatorika-grafok-quiz"
      subtopicId="kombinatorika-es-grafok"
      title="9. Kombinatorika és gráfok – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: teljes gráf, a fokszámok összege, kiválasztás csúcsok vagy élek közül, érettségi feladatok."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • KVÍZ"
      questions={COMBINATORICS_GRAPHS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Teljes gráf',
          items: [
            'Bármely két csúcs között pontosan egy él',
            'Élek száma: C(n; 2) = n · (n − 1) / 2',
            'Minden fokszám n − 1',
            '36 él ⇒ 9 csúcs; 78 él ⇒ 13; 120 él ⇒ 16'
          ]
        },
        {
          title: 'Fokszámok összege',
          items: [
            'Fokszámok összege = 2 · élek száma',
            'Mindig páros – páratlan összeg ⇒ nincs ilyen gráf',
            'Hurokéllel is igaz',
            'Asztalitenisz: 46 / 2 = 23 lejátszott, 28 − 23 = 5 hátra'
          ]
        },
        {
          title: 'Csúcs vagy él?',
          items: [
            '2 település az 5-ből: C(5; 2) = 10',
            '2 út a 6-ból: C(6; 2) = 15',
            'Két csoport között: szorzás (5 · 8 = 40)',
            'Nem ismerős párok: C(n; 2) − élek száma'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CombinatoricsGraphsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CombinatoricsGraphsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CombinatoricsGraphsQuiz;
