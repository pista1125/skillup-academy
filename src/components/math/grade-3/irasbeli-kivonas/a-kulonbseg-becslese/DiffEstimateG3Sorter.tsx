import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortRound, SortCheck } from './DiffEstimateG3CardFigures';
import { SortPlace } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3CardFigures';

interface DiffEstimateG3SorterProps {
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

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kerekítsd százasra!',
    description: 'Melyik kerek százashoz van közelebb a szám?',
    categories: [
      { id: 'r200', name: '≈ 200', color: 'sky' },
      { id: 'r300', name: '≈ 300', color: 'amber' },
      { id: 'r400', name: '≈ 400', color: 'emerald' }
    ],
    items: [
      { id: 'dess1', text: '', figure: <SortRound n={249} />, categoryId: 'r200' },
      { id: 'dess2', text: '', figure: <SortRound n={163} />, categoryId: 'r200' },
      { id: 'dess3', text: '151', categoryId: 'r200' },
      { id: 'dess4', text: '', figure: <SortRound n={250} />, categoryId: 'r300' },
      { id: 'dess5', text: '', figure: <SortRound n={312} />, categoryId: 'r300' },
      { id: 'dess6', text: '289', categoryId: 'r300' },
      { id: 'dess7', text: '', figure: <SortRound n={350} />, categoryId: 'r400' },
      { id: 'dess8', text: '', figure: <SortRound n={449} />, categoryId: 'r400' },
      { id: 'dess9', text: '381', categoryId: 'r400' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Becsülj tízesre!',
    description: 'Kerekíts tízesre, vonj ki, és tedd a jó dobozba!',
    categories: [
      { id: 'b150', name: '≈ 150', color: 'rose' },
      { id: 'b230', name: '≈ 230', color: 'sky' },
      { id: 'b310', name: '≈ 310', color: 'emerald' }
    ],
    items: [
      { id: 'dess10', text: '', figure: <SortPlace a={298} b={147} />, categoryId: 'b150' },
      { id: 'dess11', text: '', figure: <SortPlace a={233} b={84} />, categoryId: 'b150' },
      { id: 'dess12', text: '414 − 262', categoryId: 'b150' },
      { id: 'dess13', text: '', figure: <SortPlace a={377} b={148} />, categoryId: 'b230' },
      { id: 'dess14', text: '', figure: <SortPlace a={451} b={219} />, categoryId: 'b230' },
      { id: 'dess15', text: '342 − 108', categoryId: 'b230' },
      { id: 'dess16', text: '', figure: <SortPlace a={455} b={146} />, categoryId: 'b310' },
      { id: 'dess17', text: '', figure: <SortPlace a={489} b={182} />, categoryId: 'b310' },
      { id: 'dess18', text: '362 − 49', categoryId: 'b310' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Jó lehet az eredmény?',
    description: 'Becsülj tízesre, és nézd meg, közel van-e a kiszámolt eredmény!',
    categories: [
      { id: 'jo', name: 'Jó lehet', color: 'emerald' },
      { id: 'nagy', name: 'Rossz: túl nagy', color: 'rose' },
      { id: 'kicsi', name: 'Rossz: túl kicsi', color: 'amber' }
    ],
    items: [
      { id: 'dess19', text: '', figure: <SortCheck a={382} b={145} r={237} />, categoryId: 'jo' },
      { id: 'dess20', text: '', figure: <SortCheck a={463} b={218} r={245} />, categoryId: 'jo' },
      { id: 'dess21', text: '315 − 128 = 187', categoryId: 'jo' },
      { id: 'dess22', text: '', figure: <SortCheck a={382} b={145} r={337} />, categoryId: 'nagy' },
      { id: 'dess23', text: '', figure: <SortCheck a={463} b={218} r={345} />, categoryId: 'nagy' },
      { id: 'dess24', text: '412 − 188 = 324', categoryId: 'nagy' },
      { id: 'dess25', text: '', figure: <SortCheck a={315} b={128} r={87} />, categoryId: 'kicsi' },
      { id: 'dess26', text: '', figure: <SortCheck a={451} b={219} r={132} />, categoryId: 'kicsi' },
      { id: 'dess27', text: '489 − 182 = 207', categoryId: 'kicsi' }
    ]
  }
];

export const DIFF_ESTIMATE_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const DiffEstimateG3Sorter: React.FC<DiffEstimateG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wsub-becsles-sorter',
  topicTitle = '2. A különbség becslése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId={topicId}
      subtopicId="a-kulonbseg-becslese"
      title={topicTitle}
      subtitle="Becsülj, és válogasd szét a számokat és a kivonásokat!"
      levels={DIFF_ESTIMATE_G3_SORTER_LEVELS}
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

export default DiffEstimateG3Sorter;
