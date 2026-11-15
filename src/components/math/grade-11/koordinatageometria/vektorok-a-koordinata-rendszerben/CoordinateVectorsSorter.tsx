import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CoordinateVectorsSorterProps {
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

const COORDINATE_VECTORS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Párhuzamos vagy merőleges?',
    description: 'Hogyan viszonyul a vektor az →u(2; −1) vektorhoz?',
    categories: [
      { id: 'par', name: 'Párhuzamos →u-val', color: 'blue' },
      { id: 'perp', name: 'Merőleges →u-ra', color: 'emerald' },
      { id: 'none', name: 'Egyik sem', color: 'slate' }
    ],
    items: [
      { id: 'cvs1', text: '(4; −2)', categoryId: 'par' },
      { id: 'cvs2', text: '(−2; 1)', categoryId: 'par' },
      { id: 'cvs3', text: '(−3; 1,5)', categoryId: 'par' },
      { id: 'cvs4', text: '(1; 2)', categoryId: 'perp' },
      { id: 'cvs5', text: '(−2; −4)', categoryId: 'perp' },
      { id: 'cvs6', text: '(3; 6)', categoryId: 'perp' },
      { id: 'cvs7', text: '(2; 1)', categoryId: 'none' },
      { id: 'cvs8', text: '(1; −2)', categoryId: 'none' },
      { id: 'cvs9', text: '(−1; −1)', categoryId: 'none' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Milyen hosszú?',
    description: 'Számítsd ki a vektor hosszát, és tedd a megfelelő csoportba!',
    categories: [
      { id: 'five', name: 'Hossza 5', color: 'blue' },
      { id: 'ten', name: 'Hossza √10', color: 'purple' },
      { id: 'thirteen', name: 'Hossza 13', color: 'amber' }
    ],
    items: [
      { id: 'cvs10', text: '→v(3; 4)', categoryId: 'five' },
      { id: 'cvs11', text: '→w(0; −5)', categoryId: 'five' },
      { id: 'cvs12', text: '→AB, ha A(1; 2) és B(4; 6)', categoryId: 'five' },
      { id: 'cvs13', text: '→p(1; 3)', categoryId: 'ten' },
      { id: 'cvs14', text: '→r(−3; 1)', categoryId: 'ten' },
      { id: 'cvs15', text: '→GO, ha G(−3; 1) és O az origó', categoryId: 'ten' },
      { id: 'cvs16', text: '→b(12; 5)', categoryId: 'thirteen' },
      { id: 'cvs17', text: '→a(5; −12)', categoryId: 'thirteen' },
      { id: 'cvs18', text: '→PQ, ha P(−2; 1) és Q(3; 13)', categoryId: 'thirteen' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz, hamis vagy adatfüggő?',
    description: 'Mindig igaz, hamis, vagy a konkrét vektoroktól függ?',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'Adatfüggő', color: 'amber' }
    ],
    items: [
      { id: 'cvs19', text: 'Egyenlő vektorok koordinátái egyenlők', categoryId: 'true' },
      { id: 'cvs20', text: 'Egy vektor és az ellentettje egyenlő hosszú', categoryId: 'true' },
      { id: 'cvs21', text: 'A 90°-kal elforgatott vektor hossza nem változik', categoryId: 'true' },
      { id: 'cvs22', text: '→AB koordinátái: kezdőpont mínusz végpont', categoryId: 'false' },
      { id: 'cvs23', text: 'Bármely két vektorra |→a + →b| = |→a| + |→b|', categoryId: 'false' },
      { id: 'cvs24', text: '(v₁; v₂) +90°-os elforgatottja (v₂; −v₁)', categoryId: 'false' },
      { id: 'cvs25', text: 'Egy rácspontok közötti vektor hossza egész szám', categoryId: 'depends' },
      { id: 'cvs26', text: 'Két vektor összege hosszabb mindkét vektornál', categoryId: 'depends' },
      { id: 'cvs27', text: 'Egy pont helyvektorának első koordinátája pozitív', categoryId: 'depends' }
    ]
  }
];

const COORDINATE_VECTORS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COORDINATE_VECTORS_SORTER_LEVELS_LIST[0],
  2: COORDINATE_VECTORS_SORTER_LEVELS_LIST[1],
  3: COORDINATE_VECTORS_SORTER_LEVELS_LIST[2]
};

export const CoordinateVectorsSorter: React.FC<CoordinateVectorsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-vektor-koordinatak-sorter',
  topicTitle = '5. Vektorok a koordináta-rendszerben – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="vektorok-a-koordinata-rendszerben"
      title={topicTitle}
      subtitle="Rendszerezd a vektorokat párhuzamosság, merőlegesség és hossz szerint, és döntsd el, mely állítások igazak!"
      levels={COORDINATE_VECTORS_SORTER_LEVELS}
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

export default CoordinateVectorsSorter;
