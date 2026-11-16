import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatMeasuresSorterProps {
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

const STAT_MEASURES_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Melyik jellemző?',
    description: 'Adatsor: 2; 3; 3; 5; 7. Melyik jellemzőhöz tartozik az érték vagy a leírás?',
    categories: [
      { id: 'atl', name: 'átlag (4)', color: 'blue' },
      { id: 'mod', name: 'módusz (3)', color: 'emerald' },
      { id: 'ter', name: 'terjedelem (5)', color: 'amber' }
    ],
    items: [
      { id: 'smes1', text: '(2 + 3 + 3 + 5 + 7) / 5', categoryId: 'atl' },
      { id: 'smes2', text: 'az adatok összege / az adatok száma', categoryId: 'atl' },
      { id: 'smes3', text: 'x̄', categoryId: 'atl' },
      { id: 'smes4', text: 'a leggyakoribb adat', categoryId: 'mod' },
      { id: 'smes5', text: 'kétszer szerepel az adatsorban', categoryId: 'mod' },
      { id: 'smes6', text: 'itt egyenlő a mediánnal', categoryId: 'mod' },
      { id: 'smes7', text: '7 − 2', categoryId: 'ter' },
      { id: 'smes8', text: 'legnagyobb − legkisebb adat', categoryId: 'ter' },
      { id: 'smes9', text: 'csak a két szélső adattól függ', categoryId: 'ter' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mekkora a szórás?',
    description: 'Csoportosítsd az adatsorokat a szórásuk szerint!',
    categories: [
      { id: 's0', name: 'σ = 0', color: 'slate' },
      { id: 's3', name: 'σ = 3', color: 'purple' },
      { id: 's5', name: 'σ = 5', color: 'rose' }
    ],
    items: [
      { id: 'smes10', text: '5; 5; 5; 5', categoryId: 's0' },
      { id: 'smes11', text: '−2; −2; −2', categoryId: 's0' },
      { id: 'smes12', text: 'minden adat egyenlő az átlaggal', categoryId: 's0' },
      { id: 'smes13', text: '7; 7; 7; 13; 13; 13', categoryId: 's3' },
      { id: 'smes14', text: '2; 2; 8; 8', categoryId: 's3' },
      { id: 'smes15', text: 'szórásnégyzete 9', categoryId: 's3' },
      { id: 'smes16', text: '0; 10', categoryId: 's5' },
      { id: 'smes17', text: '−5; 5', categoryId: 's5' },
      { id: 'smes18', text: 'szórásnégyzete 25', categoryId: 's5' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Hogyan változik a szórás?',
    description: 'Mi történik a szórással a változtatás után?',
    categories: [
      { id: 'same', name: 'nem változik', color: 'emerald' },
      { id: 'up', name: 'nő', color: 'rose' },
      { id: 'down', name: 'csökken', color: 'blue' }
    ],
    items: [
      { id: 'smes19', text: 'minden adathoz 10-et adunk', categoryId: 'same' },
      { id: 'smes20', text: 'minden adatból 3-at kivonunk', categoryId: 'same' },
      { id: 'smes21', text: 'minden adatot −1-gyel szorzunk', categoryId: 'same' },
      { id: 'smes22', text: 'minden adatot megkétszerezünk (nem mind egyenlő)', categoryId: 'up' },
      { id: 'smes23', text: '2; 4; 6; 8 → hozzáveszünk egy 20-at', categoryId: 'up' },
      { id: 'smes24', text: '2; 4; 6; 8 → a 8 helyett 18 szerepel', categoryId: 'up' },
      { id: 'smes25', text: '2; 4; 6; 8 → hozzávesszük az 5-öt', categoryId: 'down' },
      { id: 'smes26', text: 'minden adatot megfelezünk (nem mind egyenlő)', categoryId: 'down' },
      { id: 'smes27', text: '2; 4; 6; 8 → a 2 helyett 4 szerepel', categoryId: 'down' }
    ]
  }
};

export const StatMeasuresSorter: React.FC<StatMeasuresSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-jellemzok-sorter',
  topicTitle = '2. Statisztikai jellemzők – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="statisztikai-jellemzok"
      title={topicTitle}
      subtitle="Rendszerezd a középértékeket, a szórásokat és a szórás változását!"
      levels={STAT_MEASURES_SORTER_LEVELS}
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

export default StatMeasuresSorter;
