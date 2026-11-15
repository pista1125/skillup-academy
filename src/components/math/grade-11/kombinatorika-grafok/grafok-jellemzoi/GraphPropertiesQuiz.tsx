import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { GraphPropertiesMatcher } from './GraphPropertiesMatcher';
import { GraphPropertiesSorter } from './GraphPropertiesSorter';

// ---- Kis gráfrajzoló a kvízkérdések ábráihoz (a végeredményt nem árulja el) ----
type MV = { id: string; x: number; y: number; label?: string; note?: string };

const MiniGraph: React.FC<{ v: MV[]; e?: [string, string][]; loops?: string[]; title?: string }> = ({
  v,
  e = [],
  loops = [],
  title
}) => {
  const pos = Object.fromEntries(v.map((p) => [p.id, p]));
  return (
    <svg viewBox="0 0 240 150" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="238" height="148" rx="10" fill="#f0fdf4" stroke="#bbf7d0" />
      {title && (
        <text x="120" y="16" fontSize="10.5" textAnchor="middle" fontWeight="bold" fill="#334155">
          {title}
        </text>
      )}
      {e.map(([a, b]) => (
        <line key={a + b} x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y} stroke="#0f766e" strokeWidth="2.2" />
      ))}
      {loops.map((id) => (
        <circle key={`loop-${id}`} cx={pos[id].x} cy={pos[id].y - 16} r="13" fill="none" stroke="#dc2626" strokeWidth="2.2" />
      ))}
      {v.map((p) => (
        <g key={p.id}>
          <circle cx={p.x} cy={p.y} r="6.5" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
          {p.label && (
            <text x={p.x - 14} y={p.y + 4} fontSize="11.5" fontWeight="bold" textAnchor="end" fill="#0f172a">
              {p.label}
            </text>
          )}
          {p.note && (
            <text x={p.x} y={p.y + 20} fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#b45309">
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

const FIG_A_BCD = (
  <MiniGraph
    title="Az A csúcs fokszáma: ?"
    v={[
      { id: 'A', x: 120, y: 75, label: 'A' },
      { id: 'B', x: 50, y: 40, label: 'B' },
      { id: 'C', x: 200, y: 45, label: 'C' },
      { id: 'D', x: 130, y: 132, label: 'D' }
    ]}
    e={[
      ['A', 'B'],
      ['A', 'C'],
      ['A', 'D']
    ]}
  />
);

const FIG_FOUR = (
  <MiniGraph title="4 tag, mindenkinek 2 ismerőse: ? él" v={ringV(4, 120, 82, 45, ['A', 'B', 'C', 'D'], ['2', '2', '2', '2'])} />
);

const FIG_VILLAGES = (
  <MiniGraph title="5 falu – legalább ? út kell" v={ringV(5, 120, 82, 48, ['A', 'B', 'C', 'D', 'E'])} />
);

const FIG_LOOP_ABC = (
  <MiniGraph
    title="Az A csúcs fokszáma: ?"
    v={[
      { id: 'A', x: 120, y: 70, label: 'A' },
      { id: 'B', x: 55, y: 125, label: 'B' },
      { id: 'C', x: 185, y: 125, label: 'C' }
    ]}
    e={[
      ['A', 'B'],
      ['A', 'C']
    ]}
    loops={['A']}
  />
);

const FIG_FIVE_DOTS = (
  <MiniGraph title="5 csúcs – legfeljebb ? él" v={ringV(5, 120, 82, 48, ['A', 'B', 'C', 'D', 'E'])} />
);

const FIG_3331 = (
  <MiniGraph
    title="Előírt fokszámok – lerajzolható?"
    v={[
      { id: 'A', x: 70, y: 45, label: 'A', note: '3' },
      { id: 'B', x: 180, y: 45, label: 'B', note: '3' },
      { id: 'C', x: 180, y: 115, label: 'C', note: '3' },
      { id: 'D', x: 70, y: 115, label: 'D', note: '1' }
    ]}
  />
);

const FIG_LOOP_PATH = (
  <MiniGraph
    title="Fokszámok összege: ?"
    v={[
      { id: 'A', x: 50, y: 95, label: 'A' },
      { id: 'B', x: 120, y: 95, label: 'B' },
      { id: 'C', x: 190, y: 95, label: 'C' }
    ]}
    e={[
      ['A', 'B'],
      ['B', 'C']
    ]}
    loops={['A']}
  />
);

const GRAPH_PROPERTIES_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapfogalmak (1–10)
  {
    id: 'gp-q1',
    level: 1,
    questionTypeBadge: 'Csúcs',
    question: 'Mit jelölnek egy gráf csúcsai?',
    options: ['A halmaz elemeit', 'Az elemek közötti kapcsolatokat', 'A kapcsolatok számát', 'A valós távolságokat'],
    correctAnswer: 0,
    explanation: 'A csúcsok a gráf pontjai, ezek jelzik a halmaz elemeit (pl. embereket, falvakat, megállókat).'
  },
  {
    id: 'gp-q2',
    level: 1,
    questionTypeBadge: 'Él',
    question: 'Mit szemléltetnek egy gráf élei?',
    options: ['Az elemek közötti kapcsolatokat', 'A halmaz elemeit', 'A csúcsok fokszámát', 'A gráf színeit'],
    correctAnswer: 0,
    explanation: 'Az élek a csúcsokat összekötő vonalak, az elemek közötti kapcsolatokat (ismeretség, út, mérkőzés …) jelzik.'
  },
  {
    id: 'gp-q3',
    level: 1,
    questionTypeBadge: 'Fokszám',
    question: 'Mi egy csúcs fokszáma?',
    options: [
      'Az adott csúcsból kiinduló élek száma',
      'A gráf csúcsainak száma',
      'A csúcs távolsága a legközelebbi csúcstól',
      'A gráf éleinek száma'
    ],
    correctAnswer: 0,
    explanation: 'A fokszám az adott csúcsból kiinduló élek száma.'
  },
  {
    id: 'gp-q4',
    level: 1,
    questionTypeBadge: 'Hurokél',
    question: 'Mennyivel növeli egy hurokél annak a csúcsnak a fokszámát, amelyhez tartozik?',
    options: ['2-vel', '1-gyel', '0-val', '4-gyel'],
    correctAnswer: 0,
    explanation: 'A hurokél kezdő- és végpontja ugyanaz a csúcs, így mindkét vége ott számít: a fokszám 2-vel nő.'
  },
  {
    id: 'gp-q5',
    level: 1,
    questionTypeBadge: 'Él',
    question: 'Melyik állítás igaz a gráf éleire?',
    options: [
      'Az él mindig csúcstól csúcsig tart',
      'Egy él vége lehet „a levegőben”, csúcs nélkül',
      'Két él metszéspontja mindig új csúcs',
      'Az élnek mindig egyenes szakasznak kell lennie'
    ],
    correctAnswer: 0,
    explanation: 'Az él mindig csúcstól csúcsig tart, lehet görbe vonal is, és két él keresztezése nem csúcs.'
  },
  {
    id: 'gp-q6',
    level: 1,
    questionTypeBadge: 'Gráfrajzolás',
    question: 'Két rajz ugyanazt a gráfot ábrázolja, ha …',
    options: [
      'ugyanazok a csúcsok és ugyanazok a csúcspárok vannak összekötve',
      'a csúcsok ugyanott helyezkednek el a lapon',
      'az élek ugyanolyan hosszúak',
      'egyik rajzon sincs keresztező él'
    ],
    correctAnswer: 0,
    explanation: 'Egy gráf sokféleképpen lerajzolható; csak az számít, melyik csúcs melyikkel van összekötve.'
  },
  {
    id: 'gp-q7',
    level: 1,
    questionTypeBadge: 'Fokszám',
    figure: FIG_A_BCD,
    question: 'A gráfban az A csúcsból élek mennek B-be, C-be és D-be, más él A-ból nem indul. Mennyi A fokszáma?',
    options: ['3', '4', '2', '1'],
    correctAnswer: 0,
    explanation: 'Három él indul ki A-ból (AB, AC, AD), így A fokszáma 3.'
  },
  {
    id: 'gp-q8',
    level: 1,
    questionTypeBadge: 'Ismeretségi gráf',
    figure: FIG_FOUR,
    question: 'Egy négytagú csoportban mindenkinek pontosan két ismerőse van. Hány ismeretség (él) van?',
    options: ['4', '8', '2', '6'],
    correctAnswer: 0,
    explanation: 'A fokszámok összege 4 · 2 = 8, minden ismeretség két tagnál számít: 8 / 2 = 4. (Ez egy négyszög, A–B–C–D–A.)'
  },
  {
    id: 'gp-q9',
    level: 1,
    questionTypeBadge: 'Izolált csúcs',
    question: 'Mi az izolált csúcs?',
    options: ['Olyan csúcs, amelynek fokszáma 0', 'Olyan csúcs, amelyen hurokél van', 'A legnagyobb fokszámú csúcs', 'Két él metszéspontja'],
    correctAnswer: 0,
    explanation: 'Az izolált csúcsból egyetlen él sem indul ki, fokszáma 0.'
  },
  {
    id: 'gp-q10',
    level: 1,
    questionTypeBadge: 'Metrótérkép',
    question: 'Mit ismert fel Harry Beck a londoni metrótérkép tervezésekor?',
    options: [
      'Az utasokat csak az érdekli, hol kell átszállni és hányadik megállónál kell leszállni',
      'A térképnek pontosan kell mutatnia a valós távolságokat',
      'A metróvonalaknak az utcák alatt kell haladniuk',
      'A megállók számát nem kell jelölni'
    ],
    correctAnswer: 0,
    explanation: 'Beck sémás térképe a kapcsolatokat (átszállások, megállók sorrendje) mutatja, nem a valós földrajzot – ez a gráfos gondolkodás lényege.'
  },

  // LEVEL 2: Fokszámok és élek (11–20)
  {
    id: 'gp-q11',
    level: 2,
    questionTypeBadge: 'Fokszámösszeg',
    question: 'Egy gráfnak 7 éle van. Mennyi a fokszámok összege?',
    options: ['14', '7', '21', '49'],
    correctAnswer: 0,
    explanation: 'Minden él két csúcs fokszámába számít bele: 2 · 7 = 14.'
  },
  {
    id: 'gp-q12',
    level: 2,
    questionTypeBadge: 'Fokszámösszeg',
    question: 'Egy gráf csúcsainak fokszámai: 3, 3, 2, 2, 2. Hány éle van?',
    options: ['6', '12', '5', '10'],
    correctAnswer: 0,
    explanation: 'A fokszámok összege 12, az élek száma ennek fele: 6.'
  },
  {
    id: 'gp-q13',
    level: 2,
    questionTypeBadge: 'Ismeretségi gráf',
    question: 'Egy sakkdöntő 5 versenyzője közül egy mindenkit ismer, a többiek 2-2 embert. Hány ismeretség van?',
    options: ['6', '12', '8', '10'],
    correctAnswer: 0,
    explanation: 'Fokszámok: 4, 2, 2, 2, 2, összegük 12, így 12 / 2 = 6 ismeretség.'
  },
  {
    id: 'gp-q14',
    level: 2,
    questionTypeBadge: 'Összefüggőség',
    figure: FIG_VILLAGES,
    question: 'Legalább hány út kell ahhoz, hogy 5 falu közül bármelyikből bármelyikbe eljuthassunk (minden út két falut köt össze)?',
    options: ['4', '5', '10', '3'],
    correctAnswer: 0,
    explanation: 'Minden új út legfeljebb két addig különálló részt köt össze; 5 különálló faluból 4 út kell, hogy egyetlen összefüggő rész legyen.'
  },
  {
    id: 'gp-q15',
    level: 2,
    questionTypeBadge: 'Hurokél',
    figure: FIG_LOOP_ABC,
    question: 'Az A csúcson van egy hurokél, és A-ból még két él indul B-be és C-be. Mennyi A fokszáma?',
    options: ['4', '3', '2', '5'],
    correctAnswer: 0,
    explanation: 'A hurokél 2-vel, a két másik él 1-1-gyel növeli a fokszámot: 2 + 1 + 1 = 4.'
  },
  {
    id: 'gp-q16',
    level: 2,
    questionTypeBadge: 'Fokszámösszeg',
    question: 'Egy 6 csúcsú gráfban a fokszámok összege 16. Hány éle van?',
    options: ['8', '16', '32', '6'],
    correctAnswer: 0,
    explanation: 'Élek száma = fokszámösszeg / 2 = 16 / 2 = 8.'
  },
  {
    id: 'gp-q17',
    level: 2,
    questionTypeBadge: 'Fokszámösszeg',
    question: 'Egy 6 csúcsú gráf fokszámai: 1, 1, 1, 2, 3, 4. Hány éle van?',
    options: ['6', '12', '4', '7'],
    correctAnswer: 0,
    explanation: '1 + 1 + 1 + 2 + 3 + 4 = 12, az élek száma 6.'
  },
  {
    id: 'gp-q18',
    level: 2,
    questionTypeBadge: 'Fokszámösszeg',
    question: 'Egy 5 csúcsú gráf fokszámai: 4, 3, 3, 2, 2. Hány éle van?',
    options: ['7', '14', '5', '10'],
    correctAnswer: 0,
    explanation: 'A fokszámok összege 14, az élek száma 7.'
  },
  {
    id: 'gp-q19',
    level: 2,
    questionTypeBadge: 'Fokszám',
    question: 'Legfeljebb mekkora lehet egy csúcs fokszáma egy 6 csúcsú gráfban, ha nincs hurokél és két csúcs között legfeljebb egy él fut?',
    options: ['5', '6', '4', '12'],
    correctAnswer: 0,
    explanation: 'Egy csúcs legfeljebb a többi 5 csúccsal lehet összekötve, így a fokszáma legfeljebb 5.'
  },
  {
    id: 'gp-q20',
    level: 2,
    questionTypeBadge: 'Ismeretségi gráf',
    question: 'Mely ábrázolás helyes egy négytagú csoportra, amelyben mindenkinek pontosan két ismerőse van?',
    options: [
      'Egy négy csúcsú „kör”: A–B–C–D–A',
      'Egy csillag: A össze van kötve B-vel, C-vel és D-vel',
      'Két különálló él: A–B és C–D',
      'Teljes gráf: mindenki mindenkivel össze van kötve'
    ],
    correctAnswer: 0,
    explanation: 'A négyszögben minden csúcs fokszáma 2. A csillagban A fokszáma 3, a két különálló élnél 1-1, a teljes gráfban 3-3.'
  },

  // LEVEL 3: Létezik-e ilyen gráf? (21–30)
  {
    id: 'gp-q21',
    level: 3,
    questionTypeBadge: 'Létezik-e?',
    question: 'Létezik-e 5 csúcsú gráf, amelyben minden csúcs fokszáma 3?',
    options: [
      'Nem, mert a fokszámok összege 15, páratlan',
      'Igen, egy ötszög ilyen',
      'Igen, a teljes gráf ilyen',
      'Nem, mert 5 csúcsnál a fokszám legfeljebb 2'
    ],
    correctAnswer: 0,
    explanation: 'A fokszámok összege az élek számának kétszerese, tehát páros. 5 · 3 = 15 páratlan, így ilyen gráf nincs. (Az ötszögben a fokszámok 2-k, a teljes gráfban 4-ek.)'
  },
  {
    id: 'gp-q22',
    level: 3,
    questionTypeBadge: 'Élszám',
    figure: FIG_FIVE_DOTS,
    question: 'Legfeljebb hány éle lehet egy 5 csúcsú gráfnak, ha nincs hurokél és két csúcs között legfeljebb egy él fut?',
    options: ['10', '20', '25', '5'],
    correctAnswer: 0,
    explanation: 'Minden csúcspár között legfeljebb egy él: C(5; 2) = 10. (A 20 = 5 · 4 minden élt kétszer számol.)'
  },
  {
    id: 'gp-q23',
    level: 3,
    questionTypeBadge: 'Létezik-e?',
    question: 'Létezik-e 7 csúcsú gráf, amelyben minden csúcs fokszáma ugyanaz a d szám? Melyik d esetén NEM?',
    options: ['d = 3', 'd = 2', 'd = 4', 'd = 6'],
    correctAnswer: 0,
    explanation: 'A fokszámösszeg 7d, ennek párosnak kell lennie, így d páros. d = 3-nál 21 adódna. (d = 2: hétszög; d = 6: teljes gráf; d = 4: a teljes gráf „kiegészítője” egy hétszögnek.)'
  },
  {
    id: 'gp-q24',
    level: 3,
    questionTypeBadge: 'Létezik-e?',
    figure: FIG_3331,
    question: 'Lerajzolható-e hurokél és többszörös él nélkül egy 4 csúcsú gráf 3, 3, 3, 1 fokszámokkal?',
    options: [
      'Nem: a három 3-as fokú csúcs mindegyike a többi hárommal össze van kötve, így a negyedik fokszáma 3 lenne',
      'Igen, mert a fokszámok összege páros',
      'Igen, egy négyszöggel és egy átlóval',
      'Nem, mert a fokszámok összege páratlan'
    ],
    correctAnswer: 0,
    explanation: 'Az összeg 10 páros, ez szükséges, de nem elég. 4 csúcsnál a 3-as fok azt jelenti, hogy az adott csúcs mindenkivel össze van kötve, így a negyedik csúcsnak legalább 3 szomszédja lenne.'
  },
  {
    id: 'gp-q25',
    level: 3,
    questionTypeBadge: 'Paritás',
    question: 'Lehet-e egy gráfban pontosan 3 páratlan fokszámú csúcs?',
    options: [
      'Nem, a páratlan fokszámú csúcsok száma mindig páros',
      'Igen, ha a gráfnak legalább 3 csúcsa van',
      'Igen, ha van hurokél',
      'Csak akkor, ha a gráf teljes'
    ],
    correctAnswer: 0,
    explanation: 'A fokszámok összege páros; ha páratlan sok páratlan szám szerepelne benne, az összeg páratlan lenne. Ez hurokélekkel is igaz, mert a hurokél 2-vel növel.'
  },
  {
    id: 'gp-q26',
    level: 3,
    questionTypeBadge: 'Fokszámösszeg',
    question: 'Egy 8 csúcsú gráfban minden csúcs fokszáma 3. Hány éle van?',
    options: ['12', '24', '8', '11'],
    correctAnswer: 0,
    explanation: 'Fokszámösszeg 8 · 3 = 24, az élek száma 12.'
  },
  {
    id: 'gp-q27',
    level: 3,
    questionTypeBadge: 'Létezik-e?',
    question: 'Létezik-e 6 csúcsú, 7 élű gráf, amelyben minden csúcs fokszáma legfeljebb 3?',
    options: [
      'Igen, mert a szükséges fokszámösszeg 14 ≤ 6 · 3 = 18',
      'Nem, mert 7 páratlan',
      'Nem, mert legalább egy csúcs fokszáma 4 lenne',
      'Csak hurokéllel'
    ],
    correctAnswer: 0,
    explanation: 'A fokszámösszeg 14 lesz, például 3, 3, 2, 2, 2, 2 fokszámokkal (pl. egy hatszög és egy átló). Az élek száma lehet páratlan, csak a fokszámösszeg páros.'
  },
  {
    id: 'gp-q28',
    level: 3,
    questionTypeBadge: 'Hurokél',
    figure: FIG_LOOP_PATH,
    question: 'Egy 3 csúcsú gráfban A-n hurokél van, és élek futnak A–B és B–C között. Mennyi a fokszámok összege?',
    options: ['6', '5', '4', '3'],
    correctAnswer: 0,
    explanation: 'Fokszámok: A = 2 + 1 = 3, B = 2, C = 1, összegük 6 = 2 · 3 él. A tétel hurokéllel is teljesül.'
  },
  {
    id: 'gp-q29',
    level: 3,
    questionTypeBadge: 'Teljes gráf',
    question: 'Egy 6 csapatos bajnokságban mindenki mindenkivel egyszer játszik. Hány mérkőzésből áll a bajnokság?',
    options: ['15', '30', '36', '6'],
    correctAnswer: 0,
    explanation: 'Minden mérkőzés egy él a 6 csúcsú teljes gráfban: C(6; 2) = 6 · 5 / 2 = 15.'
  },
  {
    id: 'gp-q30',
    level: 3,
    questionTypeBadge: 'Létezik-e?',
    question: 'Létezik-e egyszerű gráf (hurok- és többszörös él nélkül) 6 csúcsra 1, 2, 2, 2, 3, 3 fokszámokkal?',
    options: [
      'Nem, mert a fokszámok összege 13, páratlan',
      'Igen, 6 éllel',
      'Igen, 13 éllel',
      'Nem, mert a 3 túl nagy fokszám'
    ],
    correctAnswer: 0,
    explanation: '1 + 2 + 2 + 2 + 3 + 3 = 13 páratlan, de a fokszámösszeg mindig páros (az élek számának kétszerese), tehát nincs ilyen gráf.'
  }
];

export const GraphPropertiesQuiz: React.FC<{
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
      topicId="g11-comb-grafok-jellemzoi-quiz"
      subtopicId="grafok-jellemzoi"
      title="8. Gráfok jellemzői – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: csúcsok, élek, fokszámok, hurokél, és létezik-e adott fokszámú gráf."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • KVÍZ"
      questions={GRAPH_PROPERTIES_QUESTIONS}
      cheatSheets={[
        {
          title: 'Fogalmak',
          items: [
            'Csúcs: a halmaz eleme; él: két elem közötti kapcsolat',
            'Fokszám: a csúcsból kiinduló élek száma',
            'Hurokél: a fokszámot 2-vel növeli',
            'Izolált csúcs: fokszáma 0'
          ]
        },
        {
          title: 'Rajzolás',
          items: [
            'Egy gráf sokféleképpen lerajzolható',
            'Csak az számít, mely csúcsok vannak összekötve',
            'Az él csúcstól csúcsig tart',
            'Két él keresztezése nem csúcs'
          ]
        },
        {
          title: 'Fokszám és élszám',
          items: [
            'Fokszámok összege = 2 · élek száma',
            'A fokszámösszeg mindig páros',
            'Páratlan fokú csúcsból páros sok van',
            'n csúcson (egyszerű gráf) a fokszám ≤ n − 1, élszám ≤ C(n; 2)'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <GraphPropertiesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <GraphPropertiesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default GraphPropertiesQuiz;
