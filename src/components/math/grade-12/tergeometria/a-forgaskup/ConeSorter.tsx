import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConeSorterProps {
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

const SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik forgástest keletkezik?',
    description: 'Csoportosítsd a forgatásokat a keletkező test szerint!',
    categories: [
      { id: 'cone', name: 'Forgáskúp', color: 'indigo' },
      { id: 'cyl', name: 'Forgáshenger', color: 'emerald' },
      { id: 'frus', name: 'Csonkakúp', color: 'amber' }
    ],
    items: [
      { id: 'cones1', text: 'egyenlő szárú háromszög a szimmetriatengelye körül', categoryId: 'cone' },
      { id: 'cones2', text: 'derékszögű háromszög az egyik befogója körül', categoryId: 'cone' },
      { id: 'cones3', text: 'a triangulum a felfüggesztése körül', categoryId: 'cone' },
      { id: 'cones4', text: 'téglalap az egyik oldala körül', categoryId: 'cyl' },
      { id: 'cones5', text: 'négyzet a középvonala körül', categoryId: 'cyl' },
      { id: 'cones6', text: 'téglalap a szimmetriatengelye körül', categoryId: 'cyl' },
      { id: 'cones7', text: 'szimmetrikus trapéz a szimmetriatengelye körül', categoryId: 'frus' },
      { id: 'cones8', text: 'derékszögű trapéz a derékszögű szára körül', categoryId: 'frus' },
      { id: 'cones9', text: 'egy kúp alaplappal párhuzamos síkkal levágott alsó része', categoryId: 'frus' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kicsi, közepes vagy nagy nyílásszög?',
    description: 'Döntsd el, mekkora a kúp nyílásszöge!',
    categories: [
      { id: 'lt60', name: 'φ < 60°', color: 'teal' },
      { id: 'eq', name: '60° ≤ φ ≤ 90°', color: 'purple' },
      { id: 'gt90', name: 'φ > 90°', color: 'rose' }
    ],
    items: [
      { id: 'cones10', text: 'r = 5, M = 12', categoryId: 'lt60' },
      { id: 'cones11', text: 'alkotó 24 mm, átmérő 2 cm', categoryId: 'lt60' },
      { id: 'cones12', text: 'átfogó 51, befogó 24, hosszabbik befogó körül', categoryId: 'lt60' },
      { id: 'cones13', text: 'szabályos háromszög tengelymetszet', categoryId: 'eq' },
      { id: 'cones14', text: 'r = M', categoryId: 'eq' },
      { id: 'cones15', text: 'T = 1256,6 cm², M = K/4', categoryId: 'eq' },
      { id: 'cones16', text: '6 és 8 cm befogó, a 6 cm-es körül', categoryId: 'gt90' },
      { id: 'cones17', text: 'r = 2M', categoryId: 'gt90' },
      { id: 'cones18', text: 'a 120°-os szárszögű háromszög forgatása', categoryId: 'gt90' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kúpszeletek',
    description: 'Milyen görbét vág ki a sík a kúppalástból (a sík nem megy át a csúcson)?',
    categories: [
      { id: 'circle', name: 'Kör vagy ellipszis', color: 'blue' },
      { id: 'parab', name: 'Parabolaív', color: 'emerald' },
      { id: 'hyper', name: 'Hiperbolaív', color: 'amber' }
    ],
    items: [
      { id: 'cones19', text: 'a sík merőleges a tengelyre', categoryId: 'circle' },
      { id: 'cones20', text: 'a sík minden alkotót metsz', categoryId: 'circle' },
      { id: 'cones21', text: 'a sík kissé ferde, de minden alkotót metsz', categoryId: 'circle' },
      { id: 'cones22', text: 'a sík pontosan egy alkotóval párhuzamos', categoryId: 'parab' },
      { id: 'cones23', text: 'a sík az alkotóval párhuzamos és a tengelytől eltolt', categoryId: 'parab' },
      { id: 'cones24', text: 'a fényszóró tükrének keresztmetszete', categoryId: 'parab' },
      { id: 'cones25', text: 'a sík két alkotóval párhuzamos', categoryId: 'hyper' },
      { id: 'cones26', text: 'a sík párhuzamos a tengellyel', categoryId: 'hyper' },
      { id: 'cones27', text: 'a sík a kettős kúp mindkét felét metszi', categoryId: 'hyper' }
    ]
  }
];

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SORTER_LEVELS_LIST[0],
  2: SORTER_LEVELS_LIST[1],
  3: SORTER_LEVELS_LIST[2]
};

export const ConeSorter: React.FC<ConeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-forgaskup-sorter',
  topicTitle = '12. A forgáskúp – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-forgaskup"
      title={topicTitle}
      subtitle="Rendszerezd a forgástesteket, a kúp adatait és a kúpszeleteket!"
      levels={SORTER_LEVELS}
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

export default ConeSorter;
