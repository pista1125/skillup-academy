import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityPracticeSorterProps {
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

const PROBABILITY_PRACTICE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Melyik modellel számolunk?',
    description: 'Sorold be a feladatot a megfelelő modellhez!',
    categories: [
      { id: 'classic', name: 'kedvező / összes (egy kísérlet)', color: 'violet' },
      { id: 'without', name: 'visszatevés nélküli mintavétel', color: 'rose' },
      { id: 'binom', name: 'binomiális eloszlás', color: 'emerald' }
    ],
    items: [
      { id: 'pps1', text: 'egy kockadobásnál prímszámot dobunk', categoryId: 'classic' },
      { id: 'pps2', text: 'egy golyót húzunk 4 piros és 6 fehér közül', categoryId: 'classic' },
      { id: 'pps3', text: 'két érmét dobva legalább egy fej lesz', categoryId: 'classic' },
      { id: 'pps4', text: 'lottón 5 találatunk lesz', categoryId: 'without' },
      { id: 'pps5', text: '10 tanulóból 3-at sorsolunk ki, köztük 2 lány lesz', categoryId: 'without' },
      { id: 'pps6', text: '50 gyöngyből egyszerre kiveszünk 5-öt, 1 selejtes', categoryId: 'without' },
      { id: 'pps7', text: '6 mérésből pontosan egy nagyobb a felső kvartilisnél', categoryId: 'binom' },
      { id: 'pps8', text: '10 pirítósból pontosan 7 esik a vajas felére', categoryId: 'binom' },
      { id: 'pps9', text: '5 gyöngyöt húzunk visszatevéssel, 1 selejtes', categoryId: 'binom' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Melyik a rövidebb út?',
    description: 'Döntsd el, hogyan számolnál a legkevesebb taggal!',
    categories: [
      { id: 'direct', name: 'közvetlen összeadás', color: 'blue' },
      { id: 'compl', name: 'komplementerrel: 1 − …', color: 'amber' },
      { id: 'single', name: 'egyetlen tag: pontosan k', color: 'teal' }
    ],
    items: [
      { id: 'pps10', text: '10 kockadobásból legfeljebb 2 hatos', categoryId: 'direct' },
      { id: 'pps11', text: '10 pirítósból 7-nél több esik a vajas felére', categoryId: 'direct' },
      { id: 'pps12', text: '10 kockadobásból legalább 8 hatos', categoryId: 'direct' },
      { id: 'pps13', text: '6 órából legalább két órán felel', categoryId: 'compl' },
      { id: 'pps14', text: '50 palack között van hibás', categoryId: 'compl' },
      { id: 'pps15', text: '10 pirítósból legfeljebb 7 esik a vajas felére', categoryId: 'compl' },
      { id: 'pps16', text: '10 pirítósból pontosan 7 a vajas felére', categoryId: 'single' },
      { id: 'pps17', text: '50 palackból pontosan 4 hibás', categoryId: 'single' },
      { id: 'pps18', text: '6 mérésből pontosan egy nagyobb 15,9-nél', categoryId: 'single' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mekkora a valószínűség?',
    description: 'Számold ki vagy becsüld meg a valószínűséget, és sorold be!',
    categories: [
      { id: 'small', name: 'kisebb, mint 0,05', color: 'rose' },
      { id: 'mid', name: '0,05 és 0,5 között', color: 'blue' },
      { id: 'big', name: 'nagyobb, mint 0,5', color: 'emerald' }
    ],
    items: [
      { id: 'pps19', text: 'Bence legalább két órán felel', categoryId: 'small' },
      { id: 'pps20', text: 'Judit éppen a helyes bolygósorrendet adja meg', categoryId: 'small' },
      { id: 'pps21', text: '6 mérésből mind a (14,5; 15,9] sávba esik', categoryId: 'small' },
      { id: 'pps22', text: '10 fős buszon van vírushordozó (2%)', categoryId: 'mid' },
      { id: 'pps23', text: '30 fős buszon van vírushordozó (2%)', categoryId: 'mid' },
      { id: 'pps24', text: '6 mérésből pontosan egy nagyobb 15,9-nél', categoryId: 'mid' },
      { id: 'pps25', text: '6 mérésből legalább egy nagyobb 15,9-nél', categoryId: 'big' },
      { id: 'pps26', text: '10 kockadobásból legfeljebb 2 hatos', categoryId: 'big' },
      { id: 'pps27', text: '10 pirítósból legfeljebb 7 esik a vajas felére', categoryId: 'big' }
    ]
  }
};

export const ProbabilityPracticeSorter: React.FC<ProbabilityPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-valoszinuseg-gyakorlas-sorter',
  topicTitle = '14. Gyakorlás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="gyakorlas-valoszinuseg"
      title={topicTitle}
      subtitle="Válaszd ki a modellt és a rövidebb számolási utat, majd becsüld meg a valószínűséget!"
      levels={PROBABILITY_PRACTICE_SORTER_LEVELS}
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

export default ProbabilityPracticeSorter;
