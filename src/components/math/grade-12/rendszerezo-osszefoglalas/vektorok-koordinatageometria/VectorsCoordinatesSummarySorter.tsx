import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VectorsCoordinatesSummarySorterProps {
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

const VECTORS_COORDINATES_SUMMARY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Az y = 2x − 9 egyeneshez képest",
    description: "Párhuzamos (vagy egybeeső), merőleges, vagy egyik sem?",
    categories: [
      { id: 'par', name: "párhuzamos vele", color: 'blue' },
      { id: 'mer', name: "merőleges rá", color: 'emerald' },
      { id: 'egyik', name: "egyik sem", color: 'rose' }
    ],
    items: [
      { id: 'vcs101', text: "y = 2x + 5", categoryId: 'par' },
      { id: 'vcs102', text: "y = 2x", categoryId: 'par' },
      { id: 'vcs103', text: "y = 2x − 1", categoryId: 'par' },
      { id: 'vcs104', text: "2x − y = 0", categoryId: 'par' },
      { id: 'vcs105', text: "y − 2x = 7", categoryId: 'par' },
      { id: 'vcs106', text: "4x − 2y = 3", categoryId: 'par' },
      { id: 'vcs107', text: "y = 2(x + 3)", categoryId: 'par' },
      { id: 'vcs108', text: "y = 2x + 0,5", categoryId: 'par' },
      { id: 'vcs109', text: "6x − 3y = 1", categoryId: 'par' },
      { id: 'vcs110', text: "y = −0,5x", categoryId: 'mer' },
      { id: 'vcs111', text: "y = −x/2 + 4", categoryId: 'mer' },
      { id: 'vcs112', text: "x + 2y = 6", categoryId: 'mer' },
      { id: 'vcs113', text: "y = −0,5x − 9", categoryId: 'mer' },
      { id: 'vcs114', text: "2y = −x", categoryId: 'mer' },
      { id: 'vcs115', text: "y = −(x − 1)/2", categoryId: 'mer' },
      { id: 'vcs116', text: "x + 2y = 0", categoryId: 'mer' },
      { id: 'vcs117', text: "y = 3 − 0,5x", categoryId: 'mer' },
      { id: 'vcs118', text: "3x + 6y = 2", categoryId: 'mer' },
      { id: 'vcs119', text: "y = −2x + 5", categoryId: 'egyik' },
      { id: 'vcs120', text: "y = 0,5x", categoryId: 'egyik' },
      { id: 'vcs121', text: "x = 2", categoryId: 'egyik' },
      { id: 'vcs122', text: "y = −9", categoryId: 'egyik' },
      { id: 'vcs123', text: "y = x − 9", categoryId: 'egyik' },
      { id: 'vcs124', text: "y = 3x − 9", categoryId: 'egyik' },
      { id: 'vcs125', text: "2x + y = 0", categoryId: 'egyik' },
      { id: 'vcs126', text: "x − 2y = 0", categoryId: 'egyik' },
      { id: 'vcs127', text: "y = −x/3", categoryId: 'egyik' }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Pont és kör",
    description: "A pont az (x − 2)² + (y + 5)² = 9 körön belül, a körvonalon vagy kívül van?",
    categories: [
      { id: 'in', name: "a körön belül", color: 'emerald' },
      { id: 'on', name: "a körvonalon", color: 'blue' },
      { id: 'out', name: "a körön kívül", color: 'rose' }
    ],
    items: [
      { id: 'vcs201', text: "(2; −5)", categoryId: 'in' },
      { id: 'vcs202', text: "(0; −3)", categoryId: 'in' },
      { id: 'vcs203', text: "(3; −5)", categoryId: 'in' },
      { id: 'vcs204', text: "(2; −3)", categoryId: 'in' },
      { id: 'vcs205', text: "(1; −6)", categoryId: 'in' },
      { id: 'vcs206', text: "(4; −4)", categoryId: 'in' },
      { id: 'vcs207', text: "(2; −7)", categoryId: 'in' },
      { id: 'vcs208', text: "(3; −6)", categoryId: 'in' },
      { id: 'vcs209', text: "(0; −5)", categoryId: 'in' },
      { id: 'vcs210', text: "(5; −5)", categoryId: 'on' },
      { id: 'vcs211', text: "(−1; −5)", categoryId: 'on' },
      { id: 'vcs212', text: "(2; −2)", categoryId: 'on' },
      { id: 'vcs213', text: "(2; −8)", categoryId: 'on' },
      { id: 'vcs214', text: "(2 + √5; −3)", categoryId: 'on' },
      { id: 'vcs215', text: "(0; −5 + √5)", categoryId: 'on' },
      { id: 'vcs216', text: "(4; −5 + √5)", categoryId: 'on' },
      { id: 'vcs217', text: "(0; −5 − √5)", categoryId: 'on' },
      { id: 'vcs218', text: "(2 − √5; −7)", categoryId: 'on' },
      { id: 'vcs219', text: "(0; 0)", categoryId: 'out' },
      { id: 'vcs220', text: "(6; −5)", categoryId: 'out' },
      { id: 'vcs221', text: "(2; 0)", categoryId: 'out' },
      { id: 'vcs222', text: "(−2; −5)", categoryId: 'out' },
      { id: 'vcs223', text: "(5; −2)", categoryId: 'out' },
      { id: 'vcs224', text: "(−1; −8)", categoryId: 'out' },
      { id: 'vcs225', text: "(2; −9)", categoryId: 'out' },
      { id: 'vcs226', text: "(5; −8)", categoryId: 'out' },
      { id: 'vcs227', text: "(0; −8)", categoryId: 'out' }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Milyen alakzat egyenlete?",
    description: "Egyenes, kör, vagy egyik sem (nem egyenes és nem kör)?",
    categories: [
      { id: 'egy', name: "egyenes", color: 'blue' },
      { id: 'kor', name: "kör", color: 'purple' },
      { id: 'mas', name: "egyik sem", color: 'amber' }
    ],
    items: [
      { id: 'vcs301', text: "y = −3x + 6", categoryId: 'egy' },
      { id: 'vcs302', text: "x = −2", categoryId: 'egy' },
      { id: 'vcs303', text: "y = 5", categoryId: 'egy' },
      { id: 'vcs304', text: "9x − 9y = 9", categoryId: 'egy' },
      { id: 'vcs305', text: "2x + 3y = 12", categoryId: 'egy' },
      { id: 'vcs306', text: "y = x/3 + 5/3", categoryId: 'egy' },
      { id: 'vcs307', text: "y − 1 = 4(x + 2)", categoryId: 'egy' },
      { id: 'vcs308', text: "x + y = 0", categoryId: 'egy' },
      { id: 'vcs309', text: "3x = 7", categoryId: 'egy' },
      { id: 'vcs310', text: "(x − 1)² + (y − 3)² = 10", categoryId: 'kor' },
      { id: 'vcs311', text: "x² + y² = 13", categoryId: 'kor' },
      { id: 'vcs312', text: "(x + 5)² + (y − 4)² = 41", categoryId: 'kor' },
      { id: 'vcs313', text: "x² + (y − 5)² = 100", categoryId: 'kor' },
      { id: 'vcs314', text: "(x + 12)² + (y − 5)² = 169", categoryId: 'kor' },
      { id: 'vcs315', text: "x² + y² = 6,5", categoryId: 'kor' },
      { id: 'vcs316', text: "(x − 6)² + (y + 9)² = 169", categoryId: 'kor' },
      { id: 'vcs317', text: "(x + 3)² + (y − 5)² = 18", categoryId: 'kor' },
      { id: 'vcs318', text: "(x − 2)² + (y + 5)² = 9", categoryId: 'kor' },
      { id: 'vcs319', text: "y = x²", categoryId: 'mas' },
      { id: 'vcs320', text: "x² + y² = −4", categoryId: 'mas' },
      { id: 'vcs321', text: "y = 2ˣ", categoryId: 'mas' },
      { id: 'vcs322', text: "y = |x|", categoryId: 'mas' },
      { id: 'vcs323', text: "x · y = 1", categoryId: 'mas' },
      { id: 'vcs324', text: "x² − y² = 1", categoryId: 'mas' },
      { id: 'vcs325', text: "y = √x", categoryId: 'mas' },
      { id: 'vcs326', text: "(x − 1)² + y = 4", categoryId: 'mas' },
      { id: 'vcs327', text: "x² + 2y² = 8", categoryId: 'mas' }
    ]
  }
};

export const VectorsCoordinatesSummarySorter: React.FC<VectorsCoordinatesSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-sum-vektorok-koordinatageometria-sorter',
  topicTitle = "9. Vektorok, koordinátageometria – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="vektorok-koordinatageometria"
      title={topicTitle}
      subtitle="Csoportosítsd az egyenesek kapcsolatát, a pontok helyzetét a körhöz képest és az egyenleteket!"
      levels={VECTORS_COORDINATES_SUMMARY_SORTER_LEVELS}
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

export default VectorsCoordinatesSummarySorter;
