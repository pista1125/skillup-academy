import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricEquationsSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Alakzatok és Fő Geometriai Fogalmak',
    subtitle: 'Sorold be az állításokat és képleteket Háromszögek, Téglalapok vagy Trapézok & Sokszögek kategóriába!',
    categories: [
      {
        id: 'cat-triangle',
        name: 'Háromszögek és Szögek',
        description: 'Belső szögek összege 180°, pótszögek, külső szögek',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-rect',
        name: 'Téglalapok és Négyzetek',
        description: 'Kerület K = 2(a+b), terület T = a·b, oldalváltoztatások',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-trap-poly',
        name: 'Trapézok és Sokszögek',
        description: 'Trapéz T = (a+c)·m/2, n-szög belső szögei és átlói',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'A belső szögek összege mindig pontosan 180°: α + β + γ = 180°',
        category: 'cat-triangle'
      },
      {
        id: 's2',
        label: 'A derékszögű háromszög két hegyesszöge pótszög: α + β = 90°',
        category: 'cat-triangle'
      },
      {
        id: 's3',
        label: 'Bármely külső szög egyenlő a két nem mellette fekvő belső szög összegével',
        category: 'cat-triangle'
      },
      {
        id: 's4',
        label: 'Egyenlő szárú háromszögben az alapon fekvő szögek egyenlőek: α = β',
        category: 'cat-triangle'
      },
      {
        id: 's5',
        label: 'Kerületképlet: K = 2 · (a + b)',
        category: 'cat-rect'
      },
      {
        id: 's6',
        label: 'Területképlet: T = a · b',
        category: 'cat-rect'
      },
      {
        id: 's7',
        label: 'Ha az egyik oldal x, a 4 cm-rel hosszabb másik oldal x + 4',
        category: 'cat-rect'
      },
      {
        id: 's8',
        label: 'A négyzet mind a négy oldala egyenlő: K = 4a és T = a²',
        category: 'cat-rect'
      },
      {
        id: 's9',
        label: 'A terület az alapok számtani közepe szorozva a magassággal: T = ((a + c) · m) / 2',
        category: 'cat-trap-poly'
      },
      {
        id: 's10',
        label: 'A konvex n-szög belső szögeinek összege: Sₙ = (n - 2) · 180°',
        category: 'cat-trap-poly'
      },
      {
        id: 's11',
        label: 'A konvex sokszög összes átlóinak száma: Á = (n · (n - 3)) / 2',
        category: 'cat-trap-poly'
      },
      {
        id: 's12',
        label: 'Szimmetrikus trapézban a két szár hossza megegyezik: b = d',
        category: 'cat-trap-poly'
      }
    ]
  },
  2: {
    title: '2. Szint: Geometriai Egyenletmodellek Besorolása',
    subtitle: 'Milyen geometriai összefüggést ír le az adott algebrai egyenlet?',
    categories: [
      {
        id: 'cat-eq-angle',
        name: 'Szögarány és Szögösszeg Egyenlet',
        description: '180°-os vagy 90°-os felbontás x-re kifejezve',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-eq-rect',
        name: 'Téglalap Kerület / Területváltozás',
        description: '2(a+b) = K vagy (a+d₁)(b+d₂) = T_új',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-eq-trap-pyth',
        name: 'Trapéz / Sokszög / Pitagorasz',
        description: 'Magasság, átlószám, belső szögösszeg és derékszög',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: '2x + 3x + 4x = 180° (szögek aránya 2 : 3 : 4)',
        category: 'cat-eq-angle'
      },
      {
        id: 's14',
        label: 'x + (x + 24°) = 90° (derékszögű háromszög hegyesszögei)',
        category: 'cat-eq-angle'
      },
      {
        id: 's15',
        label: 'α + 2α + 2α = 180° (egyenlő szárú háromszög alap és szárszögei)',
        category: 'cat-eq-angle'
      },
      {
        id: 's16',
        label: 'x + (x + 10°) + (x + 20°) = 180° (egymást követő szögek)',
        category: 'cat-eq-angle'
      },
      {
        id: 's17',
        label: '2 · (x + (x + 5)) = 46 (téglalap kerülete 46 cm)',
        category: 'cat-eq-rect'
      },
      {
        id: 's18',
        label: '(x + 3) · (x + 7) = x · (x + 4) + 45 (területváltozás)',
        category: 'cat-eq-rect'
      },
      {
        id: 's19',
        label: '2 · (a + 3a) = 64 (egyik oldal 3-szorosa a másiknak)',
        category: 'cat-eq-rect'
      },
      {
        id: 's20',
        label: '(a + 2)² - a² = 28 (négyzet oldalát 2 cm-rel növelve)',
        category: 'cat-eq-rect'
      },
      {
        id: 's21',
        label: '((x + (x + 6)) · 8) / 2 = 72 (trapéz alapjai és területe)',
        category: 'cat-eq-trap-pyth'
      },
      {
        id: 's22',
        label: '(n - 2) · 180° = 1080° (konvex sokszög belső szögösszege)',
        category: 'cat-eq-trap-pyth'
      },
      {
        id: 's23',
        label: '(n · (n - 3)) / 2 = 35 (sokszög átlóinak száma 35)',
        category: 'cat-eq-trap-pyth'
      },
      {
        id: 's24',
        label: 'x² + 12² = (x + 4)² (Pitagorasz-tétel derékszögű háromszögben)',
        category: 'cat-eq-trap-pyth'
      }
    ]
  },
  3: {
    title: '3. Szint: Szöveges Feladatok Típusa és Modellje',
    subtitle: 'Határozd meg, melyik geometriai témakörbe tartozik a szöveges feladat!',
    categories: [
      {
        id: 'cat-task-triangle',
        name: 'Háromszög Szöveges Feladat',
        description: 'Szögarányok, külső szögek, egyenlő szárú háromszögek',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-task-rect',
        name: 'Téglalap és Telek Területfeladat',
        description: 'Oldalarányok, telek kerítése, területnövekedés',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-task-poly',
        name: 'Trapéz és Sokszög Feladat',
        description: 'Párhuzamos oldalak, átlók száma, n-szög csúcsai',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: 'Egy háromszög egyik szöge 20°-kal nagyobb a másiknál, a harmadik a legkisebb kétszerese.',
        category: 'cat-task-triangle'
      },
      {
        id: 's26',
        label: 'Egyenlő szárú háromszög szárszöge 36°-kal kisebb az alapon fekvő szögeknél. Mekkorák a szögei?',
        category: 'cat-task-triangle'
      },
      {
        id: 's27',
        label: 'Egy háromszög külső szöge 110°, a vele nem szomszédos belső szögei aránya 2 : 3.',
        category: 'cat-task-triangle'
      },
      {
        id: 's28',
        label: 'Derékszögű háromszögben az egyik hegyesszög 4-szerese a másiknak. Határozd meg a szögeket!',
        category: 'cat-task-triangle'
      },
      {
        id: 's29',
        label: 'Egy téglalap alakú kert kerülete 120 m. Hossza 10 m-rel nagyobb a szélességénél.',
        category: 'cat-task-rect'
      },
      {
        id: 's30',
        label: 'Egy téglalap oldalait 2 cm-rel és 3 cm-rel növelve a területe 41 cm²-rel nő. Mekkorák az eredeti oldalak?',
        category: 'cat-task-rect'
      },
      {
        id: 's31',
        label: 'Négyzet alakú járólap oldalait 5 cm-rel megnövelve a területe 175 cm²-rel lett nagyobb.',
        category: 'cat-task-rect'
      },
      {
        id: 's32',
        label: 'Egy téglalap oldalainak aránya 3 : 5, kerülete 64 cm. Mekkora a területe?',
        category: 'cat-task-rect'
      },
      {
        id: 's33',
        label: 'Hány oldalú az a konvex sokszög, amelynek egy csúcsából 7 átló húzható?',
        category: 'cat-task-poly'
      },
      {
        id: 's34',
        label: 'Melyik az a sokszög, amelynek belső szögeinek összege 1260°?',
        category: 'cat-task-poly'
      },
      {
        id: 's35',
        label: 'Egy trapéz hosszabb alapja 6 cm-rel több a rövidebbnél, területe 60 cm², magassága 6 cm.',
        category: 'cat-task-poly'
      },
      {
        id: 's36',
        label: 'Egy szimmetrikus trapéz kerülete 44 cm, szárai 10 cm-esek, alapjainak aránya 1 : 2.',
        category: 'cat-task-poly'
      }
    ]
  }
};

export const GeometricEquationsSorter: React.FC<GeometricEquationsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-eq-geometry-sorter',
  topicTitle = 'Szöveges Geometriai Csoportosító'
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Szöveges Geometriai Csoportosító"
      subtitle="Kategorizáld az alakzatok tulajdonságait, algebrai modelljeit és geometriai szöveges feladatait!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      themeColor="emerald"
      topicId={topicId}
      topicTitle={topicTitle}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default GeometricEquationsSorter;
