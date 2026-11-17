import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortTag, SortTagMul } from './ProductEstimateG3CardFigures';

interface ProductEstimateG3SorterProps {
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
    description: 'Melyik kerek százashoz van közelebb? 5-től felfelé!',
    categories: [
      { id: 'r300', name: '≈ 300', color: 'sky' },
      { id: 'r400', name: '≈ 400', color: 'amber' },
      { id: 'r500', name: '≈ 500', color: 'rose' }
    ],
    items: [
      { id: 'ests1', text: '', figure: <SortTag v={251} />, categoryId: 'r300' },
      { id: 'ests2', text: '', figure: <SortTag v={286} />, categoryId: 'r300' },
      { id: 'ests3', text: '349', categoryId: 'r300' },
      { id: 'ests4', text: '', figure: <SortTag v={350} />, categoryId: 'r400' },
      { id: 'ests5', text: '', figure: <SortTag v={372} />, categoryId: 'r400' },
      { id: 'ests6', text: '449', categoryId: 'r400' },
      { id: 'ests7', text: '', figure: <SortTag v={450} />, categoryId: 'r500' },
      { id: 'ests8', text: '', figure: <SortTag v={463} />, categoryId: 'r500' },
      { id: 'ests9', text: '538', categoryId: 'r500' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Becsülj tízesre!',
    description: 'Kerekítsd tízesre, szorozz, és tedd a jó dobozba!',
    categories: [
      { id: 'b600', name: '≈ 600', color: 'emerald' },
      { id: 'b800', name: '≈ 800', color: 'amber' },
      { id: 'b900', name: '≈ 900', color: 'purple' }
    ],
    items: [
      { id: 'ests10', text: '', figure: <SortTagMul v={304} m={2} />, categoryId: 'b600' },
      { id: 'ests11', text: '', figure: <SortTagMul v={198} m={3} />, categoryId: 'b600' },
      { id: 'ests12', text: '151 · 4', categoryId: 'b600' },
      { id: 'ests13', text: '', figure: <SortTagMul v={402} m={2} />, categoryId: 'b800' },
      { id: 'ests14', text: '', figure: <SortTagMul v={198} m={4} />, categoryId: 'b800' },
      { id: 'ests15', text: '161 · 5', categoryId: 'b800' },
      { id: 'ests16', text: '', figure: <SortTagMul v={452} m={2} />, categoryId: 'b900' },
      { id: 'ests17', text: '', figure: <SortTagMul v={179} m={5} />, categoryId: 'b900' },
      { id: 'ests18', text: '303 · 3', categoryId: 'b900' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Több vagy kevesebb?',
    description: 'Becsülj tízesre! A pontos szorzat több, kevesebb vagy pont annyi?',
    categories: [
      { id: 'tobb', name: 'Több lesz', color: 'emerald' },
      { id: 'kev', name: 'Kevesebb lesz', color: 'rose' },
      { id: 'pont', name: 'Pont annyi', color: 'sky' }
    ],
    items: [
      { id: 'ests19', text: '', figure: <SortTagMul v={213} m={3} />, categoryId: 'tobb' },
      { id: 'ests20', text: '', figure: <SortTagMul v={142} m={4} />, categoryId: 'tobb' },
      { id: 'ests21', text: '321 · 2', categoryId: 'tobb' },
      { id: 'ests22', text: '', figure: <SortTagMul v={157} m={2} />, categoryId: 'kev' },
      { id: 'ests23', text: '', figure: <SortTagMul v={238} m={3} />, categoryId: 'kev' },
      { id: 'ests24', text: '196 · 4', categoryId: 'kev' },
      { id: 'ests25', text: '', figure: <SortTagMul v={240} m={3} />, categoryId: 'pont' },
      { id: 'ests26', text: '', figure: <SortTagMul v={310} m={2} />, categoryId: 'pont' },
      { id: 'ests27', text: '150 · 5', categoryId: 'pont' }
    ]
  }
];

export const PRODUCT_ESTIMATE_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const ProductEstimateG3Sorter: React.FC<ProductEstimateG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wmul-becsles-sorter',
  topicTitle = '2. A szorzat becslése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="a-szorzat-becslese"
      title={topicTitle}
      subtitle="Kerekíts, becsülj, és válogasd szét!"
      levels={PRODUCT_ESTIMATE_G3_SORTER_LEVELS}
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

export default ProductEstimateG3Sorter;
