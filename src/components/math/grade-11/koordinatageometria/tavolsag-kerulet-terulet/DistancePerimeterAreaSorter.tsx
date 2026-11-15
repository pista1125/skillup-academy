import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DistancePerimeterAreaSorterProps {
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

const DISTANCE_PERIMETER_AREA_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen messze vannak?',
    description: 'Számítsd ki a két pont távolságát, és tedd a megfelelő csoportba!',
    categories: [
      { id: 'five', name: 'Távolság: 5', color: 'blue' },
      { id: 'ten', name: 'Távolság: 10', color: 'purple' },
      { id: 'thirteen', name: 'Távolság: 13', color: 'amber' }
    ],
    items: [
      { id: 'dpas1', text: 'A(1; 2) és B(4; 6)', categoryId: 'five' },
      { id: 'dpas2', text: 'O(0; 0) és P(−3; 4)', categoryId: 'five' },
      { id: 'dpas3', text: 'K(2; −1) és L(−1; 3)', categoryId: 'five' },
      { id: 'dpas4', text: 'O(0; 0) és Q(−6; 8)', categoryId: 'ten' },
      { id: 'dpas5', text: 'A(7; −3) és C(1; 5)', categoryId: 'ten' },
      { id: 'dpas6', text: 'E(−2; −3) és F(6; 3)', categoryId: 'ten' },
      { id: 'dpas7', text: 'A(1; 2) és B(6; −10)', categoryId: 'thirteen' },
      { id: 'dpas8', text: 'O(0; 0) és R(12; 5)', categoryId: 'thirteen' },
      { id: 'dpas9', text: 'G(−5; 1) és H(7; 6)', categoryId: 'thirteen' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Távolság, kerület vagy terület?',
    description: 'Melyik mennyiséget kell kiszámítani a kérdés megválaszolásához?',
    categories: [
      { id: 'dist', name: 'Távolság', color: 'blue' },
      { id: 'per', name: 'Kerület', color: 'emerald' },
      { id: 'area', name: 'Terület', color: 'amber' }
    ],
    items: [
      { id: 'dpas10', text: 'Milyen messze van Miami San Juantól?', categoryId: 'dist' },
      { id: 'dpas11', text: 'Milyen hosszú a négyzet átlója?', categoryId: 'dist' },
      { id: 'dpas12', text: 'Milyen messze van a P pont az origótól?', categoryId: 'dist' },
      { id: 'dpas13', text: 'Mennyi kerítés kell a sokszög alakú telek köré?', categoryId: 'per' },
      { id: 'dpas14', text: 'Hány km a Bermuda-háromszög körbehajózása?', categoryId: 'per' },
      { id: 'dpas15', text: 'Mennyi szegélyléc kell a szoba falai mentén?', categoryId: 'per' },
      { id: 'dpas16', text: 'Mennyi fűmag kell a telek bevetéséhez?', categoryId: 'area' },
      { id: 'dpas17', text: 'Mekkora a Bermuda-háromszög által határolt tengerrész?', categoryId: 'area' },
      { id: 'dpas18', text: 'Hány csempe kell a padló lefedéséhez?', categoryId: 'area' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz, hamis vagy adatfüggő?',
    description: 'Mindig igaz, hamis, vagy a konkrét pontoktól függ?',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'Adatfüggő', color: 'amber' }
    ],
    items: [
      { id: 'dpas19', text: 'Az AB és a BA távolság egyenlő', categoryId: 'true' },
      { id: 'dpas20', text: 'A sokszög területe nem nagyobb a befoglaló téglalap területénél', categoryId: 'true' },
      { id: 'dpas21', text: 'A valós terület a térképi terület és a lépték négyzetének szorzata', categoryId: 'true' },
      { id: 'dpas22', text: 'Bármely két pontra AB = |b₁ − a₁| + |b₂ − a₂|', categoryId: 'false' },
      { id: 'dpas23', text: 'A derékszögű háromszög területe a két befogó szorzata', categoryId: 'false' },
      { id: 'dpas24', text: 'A négyzet területe az átlója négyzetével egyenlő', categoryId: 'false' },
      { id: 'dpas25', text: 'Két rácspont távolsága egész szám', categoryId: 'depends' },
      { id: 'dpas26', text: 'Egy rácspont csúcsú háromszög területe egész szám', categoryId: 'depends' },
      { id: 'dpas27', text: 'A befoglaló téglalapból levágott részek mind háromszögek', categoryId: 'depends' }
    ]
  }
];

const DISTANCE_PERIMETER_AREA_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DISTANCE_PERIMETER_AREA_SORTER_LEVELS_LIST[0],
  2: DISTANCE_PERIMETER_AREA_SORTER_LEVELS_LIST[1],
  3: DISTANCE_PERIMETER_AREA_SORTER_LEVELS_LIST[2]
};

export const DistancePerimeterAreaSorter: React.FC<DistancePerimeterAreaSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-tavolsag-terulet-sorter',
  topicTitle = '6. Távolság, kerület, terület – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="tavolsag-kerulet-terulet"
      title={topicTitle}
      subtitle="Csoportosíts távolság szerint, döntsd el, mit kell kiszámolni, és mely állítások igazak!"
      levels={DISTANCE_PERIMETER_AREA_SORTER_LEVELS}
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

export default DistancePerimeterAreaSorter;
