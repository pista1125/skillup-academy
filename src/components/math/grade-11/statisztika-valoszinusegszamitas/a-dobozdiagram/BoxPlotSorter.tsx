import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface BoxPlotSorterProps {
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

const BOX_PLOT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Hová esik az adat?',
    description: 'Dobozdiagram: min = 10, Q₁ = 14, medián = 20, Q₃ = 26, max = 34. Melyik részbe esik a szám?',
    categories: [
      { id: 'left', name: 'Bal oldali vonal (min és Q₁ között)', color: 'blue' },
      { id: 'box', name: 'A dobozba (Q₁ és Q₃ között)', color: 'violet' },
      { id: 'right', name: 'Jobb oldali vonal (Q₃ és max között)', color: 'amber' }
    ],
    items: [
      { id: 'bps1', text: '11', categoryId: 'left' },
      { id: 'bps2', text: '12', categoryId: 'left' },
      { id: 'bps3', text: '13', categoryId: 'left' },
      { id: 'bps4', text: '15', categoryId: 'box' },
      { id: 'bps5', text: '18', categoryId: 'box' },
      { id: 'bps6', text: '25', categoryId: 'box' },
      { id: 'bps7', text: '27', categoryId: 'right' },
      { id: 'bps8', text: '30', categoryId: 'right' },
      { id: 'bps9', text: '33', categoryId: 'right' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mit mond a dobozdiagram?',
    description: 'Költőpénz dobozdiagramja (ezer Ft): min = 1, Q₁ = 3, medián = 6, Q₃ = 9, max = 15. Igaz, hamis vagy nem dönthető el?',
    categories: [
      { id: 'true', name: 'Igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'unknown', name: 'Nem dönthető el', color: 'slate' }
    ],
    items: [
      { id: 'bps10', text: 'A gyerekek kb. felénél legfeljebb 6000 Ft volt.', categoryId: 'true' },
      { id: 'bps11', text: 'A terjedelem 14 000 Ft.', categoryId: 'true' },
      { id: 'bps12', text: 'A félterjedelem 6000 Ft.', categoryId: 'true' },
      { id: 'bps13', text: 'A gyerekek 75%-ánál legalább 9000 Ft volt.', categoryId: 'false' },
      { id: 'bps14', text: 'A legkevesebb pénz 3000 Ft volt.', categoryId: 'false' },
      { id: 'bps15', text: 'A félterjedelem a terjedelem fele.', categoryId: 'false' },
      { id: 'bps16', text: 'Átlagosan 8500 Ft volt a gyerekeknél.', categoryId: 'unknown' },
      { id: 'bps17', text: 'Volt, akinél pontosan 12 000 Ft volt.', categoryId: 'unknown' },
      { id: 'bps18', text: 'Pontosan 20 gyerek ment a kirándulásra.', categoryId: 'unknown' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Kiugró adat vagy sem?',
    description: 'Q₁ = 20, Q₃ = 30. Kiugró az az adat, amely Q₁-nél legalább 1,5 · (Q₃ − Q₁)-gyel kisebb, vagy Q₃-nál legalább ennyivel nagyobb.',
    categories: [
      { id: 'low', name: 'Alsó kiugró adat (≤ 5)', color: 'blue' },
      { id: 'normal', name: 'Nem kiugró adat', color: 'emerald' },
      { id: 'high', name: 'Felső kiugró adat (≥ 45)', color: 'rose' }
    ],
    items: [
      { id: 'bps19', text: '2', categoryId: 'low' },
      { id: 'bps20', text: '4', categoryId: 'low' },
      { id: 'bps21', text: '5', categoryId: 'low' },
      { id: 'bps22', text: '6', categoryId: 'normal' },
      { id: 'bps23', text: '25', categoryId: 'normal' },
      { id: 'bps24', text: '44', categoryId: 'normal' },
      { id: 'bps25', text: '45', categoryId: 'high' },
      { id: 'bps26', text: '50', categoryId: 'high' },
      { id: 'bps27', text: '60', categoryId: 'high' }
    ]
  }
};

export const BoxPlotSorter: React.FC<BoxPlotSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-dobozdiagram-sorter',
  topicTitle = '3. A dobozdiagram – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="a-dobozdiagram"
      title={topicTitle}
      subtitle="Helyezd el az adatokat a dobozdiagramon, értelmezd az állításokat, és ismerd fel a kiugró adatokat!"
      levels={BOX_PLOT_SORTER_LEVELS}
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

export default BoxPlotSorter;
