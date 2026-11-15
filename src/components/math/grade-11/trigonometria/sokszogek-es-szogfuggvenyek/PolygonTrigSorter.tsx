import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PolygonTrigSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const POLYGON_TRIG_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen a tangens?',
    description: 'Csoportosítsd a kifejezéseket aszerint, hogy a tangens pozitív, negatív vagy nincs értelmezve!',
    categories: [
      { id: 'pos', name: 'tg > 0 (hegyesszög)', color: 'emerald' },
      { id: 'neg', name: 'tg < 0 (tompaszög)', color: 'rose' },
      { id: 'none', name: 'Nincs tangense (derékszög)', color: 'slate' }
    ],
    items: [
      { id: 'pts1', text: 'tg 30°', categoryId: 'pos' },
      { id: 'pts2', text: 'tg 89°', categoryId: 'pos' },
      { id: 'pts3', text: 'A 42°-os szárszögű háromszög alapon fekvő szögének tangense', categoryId: 'pos' },
      { id: 'pts4', text: 'tg 91°', categoryId: 'neg' },
      { id: 'pts5', text: 'tg 135°', categoryId: 'neg' },
      { id: 'pts6', text: 'A szabályos hatszög belső szögének (120°) tangense', categoryId: 'neg' },
      { id: 'pts7', text: 'tg 90°', categoryId: 'none' },
      { id: 'pts8', text: 'A téglalap egyik szögének tangense', categoryId: 'none' },
      { id: 'pts9', text: 'A derékszögű háromszög legnagyobb szögének tangense', categoryId: 'none' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik eszközzel számolunk?',
    description: 'Döntsd el, melyik összefüggés adja közvetlenül a keresett mennyiséget!',
    categories: [
      { id: 'cos', name: 'Koszinusztétel', color: 'blue' },
      { id: 'sin', name: 'Szinusztétel', color: 'purple' },
      { id: 'area', name: 'Területképlet (½ · a · b · sin γ)', color: 'amber' }
    ],
    items: [
      { id: 'pts10', text: 'A töltés rézsűszögei a 3,8 – 4,2 – 5,5 m-es háromszögből', categoryId: 'cos' },
      { id: 'pts11', text: 'A Pécs–Budapest–Győr háromszög szögei a három távolságból', categoryId: 'cos' },
      { id: 'pts12', text: 'Kaposvár–Miskolc távolság: 260 km, 160 km és a közbezárt 91°', categoryId: 'cos' },
      { id: 'pts13', text: 'Előremetszés: BP a 300 m-es BC-ből és a 40°, 60°-os szögekből', categoryId: 'sin' },
      { id: 'pts14', text: 'Kaposvár–Tatabánya: ismert a 126°-os szög és a vele szemközti oldal, valamint egy másik oldal', categoryId: 'sin' },
      { id: 'pts15', text: 'Egy oldal és két szög ismert, egy másik oldal a kérdés', categoryId: 'sin' },
      { id: 'pts16', text: 'A Pécs–Budapest–Győr háromszög területe a két oldalból és a közbezárt szögből', categoryId: 'area' },
      { id: 'pts17', text: 'A 48 cm-es oldalú, 39 cm-es súlyvonalú háromszög területe', categoryId: 'area' },
      { id: 'pts18', text: 'A közbezárt szög, ha a terület 60 cm² és az oldalak 15 cm, 16 cm', categoryId: 'area' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat (0° < α < 180°)!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'pts19', text: 'tg(180° − α) = −tg α (α ≠ 90°)', categoryId: 'true' },
      { id: 'pts20', text: 'A paralelogramma területe a·b·sin α, akár hegyes-, akár tompaszöggel számolunk', categoryId: 'true' },
      { id: 'pts21', text: 'tg 135° = −tg 45°', categoryId: 'true' },
      { id: 'pts22', text: 'tg 90° = 0', categoryId: 'false' },
      { id: 'pts23', text: 'A tompaszög tangense pozitív', categoryId: 'false' },
      { id: 'pts24', text: 'Ha egy háromszögben sin γ = 0,5, akkor γ csak 30° lehet', categoryId: 'false' },
      { id: 'pts25', text: 'tg α > 1', categoryId: 'depends' },
      { id: 'pts26', text: 'Egy háromszög legnagyobb szögének tangense negatív', categoryId: 'depends' },
      { id: 'pts27', text: 'Egy paralelogramma egyik szögének tangense pozitív', categoryId: 'depends' }
    ]
  }
];

const POLYGON_TRIG_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: POLYGON_TRIG_SORTER_LEVELS_LIST[0],
  2: POLYGON_TRIG_SORTER_LEVELS_LIST[1],
  3: POLYGON_TRIG_SORTER_LEVELS_LIST[2]
};

export const PolygonTrigSorter: React.FC<PolygonTrigSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-sokszogek-sorter',
  topicTitle = '13. Sokszögek és szögfüggvények – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="sokszogek-es-szogfuggvenyek"
      title={topicTitle}
      subtitle="Rendszerezd a tangens előjelét, a sokszögfeladatok számolási eszközeit és az állításokat!"
      levels={POLYGON_TRIG_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default PolygonTrigSorter;
