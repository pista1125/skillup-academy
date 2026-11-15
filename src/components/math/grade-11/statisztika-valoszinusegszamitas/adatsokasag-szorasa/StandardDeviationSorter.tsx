import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StandardDeviationSorterProps {
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

const STANDARD_DEVIATION_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Hogyan változik a szórás?',
    description: 'Egy (nem csupa egyenlő adatból álló) adatsokasággal végzett változtatás után nő, csökken vagy nem változik a szórás?',
    categories: [
      { id: 'up', name: 'A szórás nő', color: 'rose' },
      { id: 'down', name: 'A szórás csökken', color: 'emerald' },
      { id: 'same', name: 'A szórás nem változik', color: 'slate' }
    ],
    items: [
      { id: 'sds1', text: 'minden adatot megszorzunk 2-vel', categoryId: 'up' },
      { id: 'sds2', text: 'a legnagyobb adatot tovább növeljük', categoryId: 'up' },
      { id: 'sds3', text: 'a legkisebb adatot tovább csökkentjük', categoryId: 'up' },
      { id: 'sds4', text: 'minden adatot elosztunk 2-vel', categoryId: 'down' },
      { id: 'sds5', text: 'hozzáveszünk egy, az átlaggal egyenlő adatot', categoryId: 'down' },
      { id: 'sds6', text: 'a legnagyobb adatot közelítjük az átlaghoz (fölötte marad)', categoryId: 'down' },
      { id: 'sds7', text: 'minden adathoz hozzáadunk 3-at', categoryId: 'same' },
      { id: 'sds8', text: 'minden adatból kivonunk 10-et', categoryId: 'same' },
      { id: 'sds9', text: 'az adatokat más sorrendben írjuk fel', categoryId: 'same' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mekkora a szórás?',
    description: 'Számítsd ki a szórást, és sorold be az adatsokaságot!',
    categories: [
      { id: 'zero', name: 'σ = 0', color: 'slate' },
      { id: 'small', name: '0 < σ < 2', color: 'teal' },
      { id: 'big', name: 'σ ≥ 2', color: 'violet' }
    ],
    items: [
      { id: 'sds10', text: '7; 7; 7', categoryId: 'zero' },
      { id: 'sds11', text: '3; 3', categoryId: 'zero' },
      { id: 'sds12', text: '−1; −1; −1; −1', categoryId: 'zero' },
      { id: 'sds13', text: '4; 5', categoryId: 'small' },
      { id: 'sds14', text: '1; 2; 3', categoryId: 'small' },
      { id: 'sds15', text: '10; 11; 12; 13', categoryId: 'small' },
      { id: 'sds16', text: '0; 4', categoryId: 'big' },
      { id: 'sds17', text: '1; 9', categoryId: 'big' },
      { id: 'sds18', text: '2; 4; 4; 4; 5; 5; 7; 9', categoryId: 'big' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Statisztikai fogalmak rendszerezése',
    description: 'Középérték (helyzeti mutató), szóródási mutató vagy diagramtípus?',
    categories: [
      { id: 'center', name: 'Középérték / helyzeti mutató', color: 'blue' },
      { id: 'spread', name: 'Szóródási mutató', color: 'amber' },
      { id: 'chart', name: 'Diagramtípus', color: 'emerald' }
    ],
    items: [
      { id: 'sds19', text: 'átlag', categoryId: 'center' },
      { id: 'sds20', text: 'medián', categoryId: 'center' },
      { id: 'sds21', text: 'módusz', categoryId: 'center' },
      { id: 'sds22', text: 'szórás', categoryId: 'spread' },
      { id: 'sds23', text: 'terjedelem', categoryId: 'spread' },
      { id: 'sds24', text: 'félterjedelem (Q₃ − Q₁)', categoryId: 'spread' },
      { id: 'sds25', text: 'dobozdiagram', categoryId: 'chart' },
      { id: 'sds26', text: 'oszlopdiagram', categoryId: 'chart' },
      { id: 'sds27', text: 'kördiagram', categoryId: 'chart' }
    ]
  }
};

export const StandardDeviationSorter: React.FC<StandardDeviationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-szoras-sorter',
  topicTitle = '4. Adatsokaság szórása – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="adatsokasag-szorasa"
      title={topicTitle}
      subtitle="Döntsd el, hogyan változik a szórás, becsüld meg a nagyságát, és rendszerezd a statisztikai fogalmakat!"
      levels={STANDARD_DEVIATION_SORTER_LEVELS}
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

export default StandardDeviationSorter;
