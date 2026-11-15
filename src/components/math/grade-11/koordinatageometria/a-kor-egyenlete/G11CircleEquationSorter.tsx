import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11CircleEquationSorterProps {
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

const G11_CIRCLE_EQUATION_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hol van a pont az x² + y² = 25 körhöz képest?',
    description: 'Számold ki x² + y² értékét, és hasonlítsd össze 25-tel!',
    categories: [
      { id: 'on', name: 'A körön', color: 'emerald' },
      { id: 'in', name: 'A körön belül', color: 'blue' },
      { id: 'out', name: 'A körön kívül', color: 'rose' }
    ],
    items: [
      { id: 'ces1', text: '(3; 4)', categoryId: 'on' },
      { id: 'ces2', text: '(−5; 0)', categoryId: 'on' },
      { id: 'ces3', text: '(−3; −4)', categoryId: 'on' },
      { id: 'ces4', text: '(3,4; −3,4)', categoryId: 'in' },
      { id: 'ces5', text: '(−2; 4)', categoryId: 'in' },
      { id: 'ces6', text: '(1; 1)', categoryId: 'in' },
      { id: 'ces7', text: '(2,5; 4,5)', categoryId: 'out' },
      { id: 'ces8', text: '(4; 4)', categoryId: 'out' },
      { id: 'ces9', text: '(−5; 1)', categoryId: 'out' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hol van a pont az (x + 4)² + (y − 2)² = 25 körhöz képest?',
    description: 'Helyettesítsd be a pontot a bal oldalba!',
    categories: [
      { id: 'on', name: 'A körön', color: 'emerald' },
      { id: 'in', name: 'A körön belül', color: 'blue' },
      { id: 'out', name: 'A körön kívül', color: 'rose' }
    ],
    items: [
      { id: 'ces10', text: 'A(−1; −2)', categoryId: 'on' },
      { id: 'ces11', text: 'B(1; 2)', categoryId: 'on' },
      { id: 'ces12', text: 'C(−8; 5)', categoryId: 'on' },
      { id: 'ces13', text: '(−4; 2)', categoryId: 'in' },
      { id: 'ces14', text: '(−2; 3)', categoryId: 'in' },
      { id: 'ces15', text: '(−6; 0)', categoryId: 'in' },
      { id: 'ces16', text: 'D(−2; −3)', categoryId: 'out' },
      { id: 'ces17', text: '(2; 2)', categoryId: 'out' },
      { id: 'ces18', text: '(0; 6)', categoryId: 'out' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mit ír le az egyenlet?',
    description: 'Teljes négyzetté kiegészítés után nézd meg a jobb oldal előjelét!',
    categories: [
      { id: 'circle', name: 'Kört', color: 'blue' },
      { id: 'point', name: 'Egyetlen pontot', color: 'amber' },
      { id: 'empty', name: 'Semmit (üres halmaz)', color: 'rose' }
    ],
    items: [
      { id: 'ces19', text: 'x² + y² − 6x + 4y − 12 = 0', categoryId: 'circle' },
      { id: 'ces20', text: 'x² + y² + 8x − 2y + 8 = 0', categoryId: 'circle' },
      { id: 'ces21', text: '(x − 1)² + (y + 2)² = 0,01', categoryId: 'circle' },
      { id: 'ces22', text: 'x² + y² + 4x − 6y + 13 = 0', categoryId: 'point' },
      { id: 'ces23', text: '(x − 3)² + (y + 1)² = 0', categoryId: 'point' },
      { id: 'ces24', text: 'x² + y² = 0', categoryId: 'point' },
      { id: 'ces25', text: 'x² + y² − 10x + 30 = 0', categoryId: 'empty' },
      { id: 'ces26', text: '(x + 2)² + y² = −4', categoryId: 'empty' },
      { id: 'ces27', text: 'x² + y² + 2y + 5 = 0', categoryId: 'empty' }
    ]
  }
];

const G11_CIRCLE_EQUATION_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: G11_CIRCLE_EQUATION_SORTER_LEVELS_LIST[0],
  2: G11_CIRCLE_EQUATION_SORTER_LEVELS_LIST[1],
  3: G11_CIRCLE_EQUATION_SORTER_LEVELS_LIST[2]
};

export const G11CircleEquationSorter: React.FC<G11CircleEquationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-kor-egyenlete-sorter',
  topicTitle = '11. A kör egyenlete – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="a-kor-egyenlete"
      title={topicTitle}
      subtitle="Döntsd el a pontokról, hogy a körön, belül vagy kívül vannak, és ismerd fel, mikor ír le kört az egyenlet!"
      levels={G11_CIRCLE_EQUATION_SORTER_LEVELS}
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

export default G11CircleEquationSorter;
