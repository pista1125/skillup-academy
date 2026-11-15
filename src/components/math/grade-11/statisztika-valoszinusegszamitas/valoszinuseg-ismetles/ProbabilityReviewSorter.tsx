import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityReviewSorterProps {
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

const PROBABILITY_REVIEW_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Biztos, lehetetlen vagy véletlen? (egy kockadobás)',
    description: 'Szabályos dobókockával dobunk egyszer. Sorold be az eseményeket!',
    categories: [
      { id: 'sure', name: 'Biztos esemény (P = 1)', color: 'emerald' },
      { id: 'imp', name: 'Lehetetlen esemény (P = 0)', color: 'rose' },
      { id: 'rand', name: 'Véletlen esemény (0 < P < 1)', color: 'blue' }
    ],
    items: [
      { id: 'prrs1', text: 'a dobott szám osztója 5!-nak', categoryId: 'sure' },
      { id: 'prrs2', text: 'a dobott szám 7-nél kisebb', categoryId: 'sure' },
      { id: 'prrs3', text: 'a dobott szám pozitív egész', categoryId: 'sure' },
      { id: 'prrs4', text: '7-est dobunk', categoryId: 'imp' },
      { id: 'prrs5', text: 'a dobott szám 0', categoryId: 'imp' },
      { id: 'prrs6', text: 'a dobott szám osztható 7-tel', categoryId: 'imp' },
      { id: 'prrs7', text: 'prímszámot dobunk', categoryId: 'rand' },
      { id: 'prrs8', text: 'páros számot dobunk', categoryId: 'rand' },
      { id: 'prrs9', text: 'a dobott szám osztója 5-nek', categoryId: 'rand' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Kisebb, egyenlő vagy nagyobb, mint 1/2?',
    description: 'Számítsd ki a valószínűséget, és hasonlítsd össze 1/2-del!',
    categories: [
      { id: 'lt', name: 'P < 1/2', color: 'amber' },
      { id: 'eq', name: 'P = 1/2', color: 'slate' },
      { id: 'gt', name: 'P > 1/2', color: 'violet' }
    ],
    items: [
      { id: 'prrs10', text: 'kockával négyzetszámot dobunk', categoryId: 'lt' },
      { id: 'prrs11', text: 'kockával 5-tel osztható számot dobunk', categoryId: 'lt' },
      { id: 'prrs12', text: 'két kockával az összeg 7', categoryId: 'lt' },
      { id: 'prrs13', text: 'kockával prímszámot dobunk', categoryId: 'eq' },
      { id: 'prrs14', text: 'kockával páratlan számot dobunk', categoryId: 'eq' },
      { id: 'prrs15', text: '2 fiú és 2 lány leül: a lányok nem szomszédok', categoryId: 'eq' },
      { id: 'prrs16', text: 'kockával a 6 egyik osztóját dobjuk', categoryId: 'gt' },
      { id: 'prrs17', text: 'a dobott szám faktoriálisa páros', categoryId: 'gt' },
      { id: 'prrs18', text: 'két kockával a szorzat páros', categoryId: 'gt' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Két kocka – mennyi a valószínűség?',
    description: 'Számold meg a kedvező cellákat a 6 × 6-os táblázatban!',
    categories: [
      { id: 'p6', name: 'P = 1/6 (6 eset)', color: 'sky' },
      { id: 'p9', name: 'P = 1/9 (4 eset)', color: 'teal' },
      { id: 'p4', name: 'P = 1/4 (9 eset)', color: 'rose' }
    ],
    items: [
      { id: 'prrs19', text: 'az összeg 7', categoryId: 'p6' },
      { id: 'prrs20', text: 'a két szám egyenlő', categoryId: 'p6' },
      { id: 'prrs21', text: 'a szorzat prímszám', categoryId: 'p6' },
      { id: 'prrs22', text: 'a szorzat 12', categoryId: 'p9' },
      { id: 'prrs23', text: 'az összeg 5', categoryId: 'p9' },
      { id: 'prrs24', text: 'az összeg 9', categoryId: 'p9' },
      { id: 'prrs25', text: 'a szorzat páratlan', categoryId: 'p4' },
      { id: 'prrs26', text: 'mindkét szám páros', categoryId: 'p4' },
      { id: 'prrs27', text: 'a nagyobbik dobás 5', categoryId: 'p4' }
    ]
  }
};

export const ProbabilityReviewSorter: React.FC<ProbabilityReviewSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-valoszinuseg-ismetles-sorter',
  topicTitle = '7. Valószínűség – ismétlés – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="valoszinuseg-ismetles"
      title={topicTitle}
      subtitle="Rendszerezd az eseményeket: biztos, lehetetlen vagy véletlen, és mekkora a valószínűségük!"
      levels={PROBABILITY_REVIEW_SORTER_LEVELS}
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

export default ProbabilityReviewSorter;
