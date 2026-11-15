import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatisticsPracticeSorterProps {
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

const STATISTICS_PRACTICE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Középérték, szóródási mutató vagy diagram?',
    description: 'Sorold be a fogalmakat!',
    categories: [
      { id: 'center', name: 'Középérték', color: 'blue' },
      { id: 'spread', name: 'Szóródási mutató', color: 'violet' },
      { id: 'chart', name: 'Diagramtípus', color: 'emerald' }
    ],
    items: [
      { id: 'stps1', text: 'átlag', categoryId: 'center' },
      { id: 'stps2', text: 'medián', categoryId: 'center' },
      { id: 'stps3', text: 'módusz', categoryId: 'center' },
      { id: 'stps4', text: 'terjedelem', categoryId: 'spread' },
      { id: 'stps5', text: 'félterjedelem (Q3 − Q1)', categoryId: 'spread' },
      { id: 'stps6', text: 'szórás', categoryId: 'spread' },
      { id: 'stps7', text: 'kördiagram', categoryId: 'chart' },
      { id: 'stps8', text: 'oszlopdiagram', categoryId: 'chart' },
      { id: 'stps9', text: 'dobozdiagram', categoryId: 'chart' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Hogyan változik a mutató? (adatsor: 2, 4, 6, 8, 10)',
    description: 'Mi történik a megadott mutatóval a változtatás után?',
    categories: [
      { id: 'up', name: 'Nő', color: 'emerald' },
      { id: 'down', name: 'Csökken', color: 'rose' },
      { id: 'same', name: 'Nem változik', color: 'slate' }
    ],
    items: [
      { id: 'stps10', text: 'minden adathoz 3-at adunk → átlag', categoryId: 'up' },
      { id: 'stps11', text: 'minden adatot megkétszerezünk → szórás', categoryId: 'up' },
      { id: 'stps12', text: 'hozzávesszük a 20-at → medián', categoryId: 'up' },
      { id: 'stps13', text: 'hozzávesszük a 6-ot → szórás', categoryId: 'down' },
      { id: 'stps14', text: 'elhagyjuk a 10-et → átlag', categoryId: 'down' },
      { id: 'stps15', text: 'elhagyjuk a 10-et → terjedelem', categoryId: 'down' },
      { id: 'stps16', text: 'hozzávesszük a 6-ot → átlag', categoryId: 'same' },
      { id: 'stps17', text: 'minden adathoz 3-at adunk → szórás', categoryId: 'same' },
      { id: 'stps18', text: 'hozzávesszük a 6-ot → medián', categoryId: 'same' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mekkora a szórás?',
    description: 'Számítsd ki az adatsokaság szórását, és sorold be!',
    categories: [
      { id: 'small', name: 'σ < 1', color: 'sky' },
      { id: 'mid', name: '1 ≤ σ < 2', color: 'amber' },
      { id: 'big', name: 'σ ≥ 2', color: 'rose' }
    ],
    items: [
      { id: 'stps19', text: '4, 4, 4, 4, 6', categoryId: 'small' },
      { id: 'stps20', text: '6, 6, 7, 7', categoryId: 'small' },
      { id: 'stps21', text: '3, 3, 4, 5, 5', categoryId: 'small' },
      { id: 'stps22', text: '3, 5, 7', categoryId: 'mid' },
      { id: 'stps23', text: '1, 2, 3, 4, 5', categoryId: 'mid' },
      { id: 'stps24', text: '1, 2, 3, 4', categoryId: 'mid' },
      { id: 'stps25', text: '3, 7', categoryId: 'big' },
      { id: 'stps26', text: '1, 4, 7', categoryId: 'big' },
      { id: 'stps27', text: '1, 9, 9, 1', categoryId: 'big' }
    ]
  }
};

export const StatisticsPracticeSorter: React.FC<StatisticsPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-statisztika-gyakorlas-sorter',
  topicTitle = '6. Gyakorlás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="gyakorlas-statisztika"
      title={topicTitle}
      subtitle="Rendszerezd a statisztikai fogalmakat, a változtatások hatását és az adatsorokat a szórásuk szerint!"
      levels={STATISTICS_PRACTICE_SORTER_LEVELS}
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

export default StatisticsPracticeSorter;
