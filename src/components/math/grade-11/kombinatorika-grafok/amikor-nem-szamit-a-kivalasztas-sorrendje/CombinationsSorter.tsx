import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinationsSorterProps {
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

const COMBINATIONS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számít-e a sorrend?',
    description: 'Döntsd el, számít-e a kiválasztás sorrendje, és ismétlődhet-e egy elem!',
    categories: [
      { id: 'norep', name: 'Számít a sorrend, nincs ismétlés', color: 'blue' },
      { id: 'rep', name: 'Számít a sorrend, lehet ismétlés', color: 'emerald' },
      { id: 'noorder', name: 'Nem számít a sorrend', color: 'amber' }
    ],
    items: [
      { id: 'cms1', text: '9 unokából 3: bevásárlás, csomagolás, táborhely-előkészítés', categoryId: 'norep' },
      { id: 'cms2', text: '3 küldött irodalom-, történelem- és földrajzvetélkedőre', categoryId: 'norep' },
      { id: 'cms3', text: '2 különböző nyeremény, mindenki csak egyet nyerhet', categoryId: 'norep' },
      { id: 'cms4', text: '2 különböző nyeremény, egy ember mindkettőt is nyerheti', categoryId: 'rep' },
      { id: 'cms5', text: '4 jegyű PIN-kód', categoryId: 'rep' },
      { id: 'cms6', text: '6 kérdéses teszt kitöltése A–D válaszokkal', categoryId: 'rep' },
      { id: 'cms7', text: 'A röplabdabajnokság mérkőzései', categoryId: 'noorder' },
      { id: 'cms8', text: '3 lyuk a buszjegy 9 száma közül', categoryId: 'noorder' },
      { id: 'cms9', text: '2 lap egyszerre kihúzása 5 lapból', categoryId: 'noorder' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány elemű részhalmaz?',
    description: 'Sorold be a feladatot aszerint, hogy hány elemet választunk ki (sorrend nélkül)!',
    categories: [
      { id: 'two', name: 'n alatt a 2 = n · (n − 1) / 2!', color: 'blue' },
      { id: 'three', name: 'n alatt a 3 = n · (n − 1) · (n − 2) / 3!', color: 'purple' },
      { id: 'four', name: 'n alatt a 4 = n · (n − 1) · (n − 2) · (n − 3) / 4!', color: 'rose' }
    ],
    items: [
      { id: 'cms10', text: '7 résztvevő kézfogásai', categoryId: 'two' },
      { id: 'cms11', text: '6 csapat egyfordulós bajnokságának meccsei', categoryId: 'two' },
      { id: 'cms12', text: 'Konvex hétszög csúcsai közötti szakaszok', categoryId: 'two' },
      { id: 'cms13', text: '9 unokából 3 főzi a paprikás krumplit', categoryId: 'three' },
      { id: 'cms14', text: '25 tanulóból 3 küldött a matematikavetélkedőre', categoryId: 'three' },
      { id: 'cms15', text: 'Buszjegy 9 számából 3 kilyukasztva', categoryId: 'three' },
      { id: 'cms16', text: 'A 9 elemű H halmaz 4 elemű részhalmazai', categoryId: 'four' },
      { id: 'cms17', text: 'A lift első négyese a 12 fős társaságból', categoryId: 'four' },
      { id: 'cms18', text: 'Buszjegy 9 számából 4 kilyukasztva', categoryId: 'four' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'Az adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'cms19', text: 'n alatt az 1 = n', categoryId: 'true' },
      { id: 'cms20', text: 'n alatt az n = 1', categoryId: 'true' },
      { id: 'cms21', text: 'Sorban kiválasztva k!-szor annyi lehetőség van, mint sorrend nélkül', categoryId: 'true' },
      { id: 'cms22', text: '10 alatt a 3 = 10 · 9 · 8', categoryId: 'false' },
      { id: 'cms23', text: '6 csapat egyfordulós bajnokságában 30 meccs van', categoryId: 'false' },
      { id: 'cms24', text: 'A 90 számból húzott 5 lottószámnál számít a húzás sorrendje', categoryId: 'false' },
      { id: 'cms25', text: 'n alatt a k nagyobb n-nél', categoryId: 'depends' },
      { id: 'cms26', text: 'n alatt a k páros szám', categoryId: 'depends' },
      { id: 'cms27', text: 'Két egyforma nyeremény kisorsolása n résztvevő között n · (n − 1) / 2-féle lehet', categoryId: 'depends' }
    ]
  }
];

const COMBINATIONS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COMBINATIONS_SORTER_LEVELS_LIST[0],
  2: COMBINATIONS_SORTER_LEVELS_LIST[1],
  3: COMBINATIONS_SORTER_LEVELS_LIST[2]
};

export const CombinationsSorter: React.FC<CombinationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-comb-kombinacio-sorter',
  topicTitle = '3. Amikor nem számít a kiválasztás sorrendje – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="amikor-nem-szamit-a-kivalasztas-sorrendje"
      title={topicTitle}
      subtitle="Rendszerezd, mikor számít a sorrend, hány elemet választunk ki, és mely állítások igazak!"
      levels={COMBINATIONS_SORTER_LEVELS}
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

export default CombinationsSorter;
