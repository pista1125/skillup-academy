import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ClassMidpointsSorterProps {
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

const CLASS_MIDPOINTS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Melyik osztályba esik?',
    description: 'Havi csapadék (mm). Osztályok: 1–25, 26–50, 51–75 mm. Hová tartozik az adat?',
    categories: [
      { id: 'c1', name: '1–25 mm (osztályközép 13)', color: 'blue' },
      { id: 'c2', name: '26–50 mm (osztályközép 38)', color: 'emerald' },
      { id: 'c3', name: '51–75 mm (osztályközép 63)', color: 'amber' }
    ],
    items: [
      { id: 'cmps1', text: '13 mm', categoryId: 'c1' },
      { id: 'cmps2', text: '20 mm', categoryId: 'c1' },
      { id: 'cmps3', text: '25 mm', categoryId: 'c1' },
      { id: 'cmps4', text: '26 mm', categoryId: 'c2' },
      { id: 'cmps5', text: '38 mm', categoryId: 'c2' },
      { id: 'cmps6', text: '50 mm', categoryId: 'c2' },
      { id: 'cmps7', text: '51 mm', categoryId: 'c3' },
      { id: 'cmps8', text: '68 mm', categoryId: 'c3' },
      { id: 'cmps9', text: '74 mm', categoryId: 'c3' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Helyes osztályba sorolás?',
    description: 'Egész értékű adatok 0-tól 30-ig. Csoportosítsd a beosztásokat!',
    categories: [
      { id: 'ok', name: 'helyes', color: 'emerald' },
      { id: 'overlap', name: 'hibás: átfedő osztályok', color: 'rose' },
      { id: 'gap', name: 'hibás: kimaradó adatok', color: 'amber' }
    ],
    items: [
      { id: 'cmps10', text: '0–9; 10–19; 20–30', categoryId: 'ok' },
      { id: 'cmps11', text: '0–14; 15–30', categoryId: 'ok' },
      { id: 'cmps12', text: '0–5; 6–10; 11–20; 21–30', categoryId: 'ok' },
      { id: 'cmps13', text: '0–10; 10–20; 20–30', categoryId: 'overlap' },
      { id: 'cmps14', text: '0–15; 12–30', categoryId: 'overlap' },
      { id: 'cmps15', text: '0–20; 20–30', categoryId: 'overlap' },
      { id: 'cmps16', text: '0–9; 11–19; 20–30', categoryId: 'gap' },
      { id: 'cmps17', text: '1–10; 11–20; 21–30', categoryId: 'gap' },
      { id: 'cmps18', text: '0–9; 10–19; 20–29', categoryId: 'gap' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Melyik érték?',
    description: 'Szögek: 50 vásárló, 8 osztály (120–124, …, 155–159). Csoportosítsd a számításokat az eredményük szerint!',
    categories: [
      { id: 'mean', name: '140,4 (átlag)', color: 'blue' },
      { id: 'med', name: '137 (medián)', color: 'purple' },
      { id: 'wrong', name: '139,5 (hibás átlag)', color: 'rose' }
    ],
    items: [
      { id: 'cmps19', text: '7020 / 50', categoryId: 'mean' },
      { id: 'cmps20', text: 'osztályközepek gyakoriságokkal súlyozott átlaga', categoryId: 'mean' },
      { id: 'cmps21', text: 'Σ fᵢ · kᵢ / Σ fᵢ', categoryId: 'mean' },
      { id: 'cmps22', text: 'a 25. és a 26. adat osztályközepe', categoryId: 'med' },
      { id: 'cmps23', text: 'a 135–139 osztály közepe', categoryId: 'med' },
      { id: 'cmps24', text: 'a leggyakoribb osztály osztályközepe', categoryId: 'med' },
      { id: 'cmps25', text: '(122 + 127 + … + 157) / 8', categoryId: 'wrong' },
      { id: 'cmps26', text: 'az osztályközepek súlyozás nélküli átlaga', categoryId: 'wrong' },
      { id: 'cmps27', text: '(120 + 159) / 2', categoryId: 'wrong' }
    ]
  }
};

export const ClassMidpointsSorter: React.FC<ClassMidpointsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-osztalykozepek-sorter',
  topicTitle = '4. Számítások osztályközepekkel – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="szamitasok-osztalykozepekkel"
      title={topicTitle}
      subtitle="Rendszerezd az adatok osztályait, az osztályba sorolás szabályait és az osztályközepes eredményeket!"
      levels={CLASS_MIDPOINTS_SORTER_LEVELS}
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

export default ClassMidpointsSorter;
