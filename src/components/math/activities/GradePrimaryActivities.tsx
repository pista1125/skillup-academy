import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

// Lazy loaded activity components
const BuildingBlocksComparison = lazy(() => import("@/components/math/grade-4/szamolas-10000-ig/BuildingBlocksComparison").then(m => ({ default: m.BuildingBlocksComparison })))
const FractionsModule = lazy(() => import("@/components/math/grade-4/tortszamok").then(m => ({ default: m.FractionsModule }))) as any;
const Grade1MathModule = lazy(() => import("@/components/math/grade-1/Grade1MathModule").then(m => ({ default: m.Grade1MathModule }))) as any;
const Grade2MathModule = lazy(() => import("@/components/math/grade-2/Grade2MathModule").then(m => ({ default: m.Grade2MathModule }))) as any;
const MathColoringGame = lazy(() => import("@/components/math/games/coloring/MathColoringGame").then(m => ({ default: m.MathColoringGame })))
const MathQuiz = lazy(() => import("@/components/math/shared/MathQuiz").then(m => ({ default: m.MathQuiz })))
const MathSnakeGame = lazy(() => import("@/components/math/games/snake/MathSnakeGame").then(m => ({ default: m.MathSnakeGame })))
const MoneyCountingQuiz = lazy(() => import("@/components/math/grade-4/meresek/MoneyCountingQuiz").then(m => ({ default: m.MoneyCountingQuiz })))
const TowerBuilderGame = lazy(() => import("@/components/math/games/toronyepites/TowerBuilderGame").then(m => ({ default: m.TowerBuilderGame })))

export const GradePrimaryActivities: React.FC<ActivityRouterProps> = ({
  activityType,
  onBack,
  onActivitySelect,
  setActivityType: setActivityTypeProp,
  selectedGrade,
  selectedTopic,
  handleMaterialSelect,
  handleQuizComplete,
  percentMode,
  vennLevel
}) => {
  const handleBack = onBack;
  const handleActivitySelect = onActivitySelect;
  const setActivityType = (type: string) => {
    if (setActivityTypeProp) {
      setActivityTypeProp(type);
    } else {
      onActivitySelect(type, typeof selectedTopic === 'object' ? selectedTopic?.id : selectedTopic);
    }
  };

  if (!activityType) return null;

  if (activityType === 'fractions' || activityType?.startsWith('fractions-') || activityType?.startsWith('decimal-')) {
    return (
      <FractionsModule
        onBack={handleBack}
        initialView={activityType}
        onStartActivity={(type: any) => handleActivitySelect(type)}
      />
    );
  }
  if (activityType === 'grade1-basic' || activityType?.startsWith('grade1-')) {
    return (
      <Grade1MathModule
        onBack={handleBack}
        initialView={activityType}
        onStartActivity={(type: any) => handleActivitySelect(type)}
      />
    );
  }
  if (activityType === 'grade2-basic' || activityType?.startsWith('grade2-')) {
    return (
      <Grade2MathModule
        onBack={handleBack}
        initialView={activityType}
        onStartActivity={(type: any) => handleActivitySelect(type)}
      />
    );
  }

  return (
    <>
                  {activityType === 'grade3-addition-quiz' && (
                    <MathQuiz onBack={handleBack} grade={3} type="addition" />
                  )}

                  {activityType === 'grade3-subtraction-quiz' && (
                    <MathQuiz onBack={handleBack} grade={3} type="subtraction" />
                  )}

                  {activityType === 'grade3-multiplication-quiz' && (
                    <MathQuiz onBack={handleBack} grade={3} type="multiplication" />
                  )}

                  {activityType === 'grade3-division-quiz' && (
                    <MathQuiz onBack={handleBack} grade={3} type="division" />
                  )}

                  {(activityType === 'grade3-alapmuveletek' || activityType === 'grade3-quiz' || activityType === 'grade3-rounding-quiz' || activityType === 'grade3-word-problems-quiz') && (
                    <MathQuiz onBack={handleBack} grade={3} type="mixed" />
                  )}

                  {activityType === 'grade3-blocks' && (
                    <BuildingBlocksComparison onBack={handleBack} />
                  )}

                  {activityType === 'grade3-snake' && (
                    <MathSnakeGame onBack={handleBack} grade={3} />
                  )}

                  {activityType === 'grade3-tower-builder' && (
                    <TowerBuilderGame onBack={handleBack} grade={3} />
                  )}

                  {activityType === 'grade3-money-quiz' && (
                    <MoneyCountingQuiz onBack={handleBack} difficulty="easy" />
                  )}

                  {(activityType === 'tower-builder' || activityType === 'grade2-blocks' || activityType === 'grade3-blocks' || activityType === 'grade3-tower-builder') && (
                    <TowerBuilderGame onBack={handleBack} grade={typeof selectedGrade === 'number' && selectedGrade <= 4 ? selectedGrade : 1} />
                  )}

                  {(activityType === 'coloring' || activityType === 'grade2-coloring' || activityType === 'grade3-coloring') && (
                    <MathColoringGame onBack={handleBack} grade={typeof selectedGrade === 'number' && selectedGrade <= 4 ? selectedGrade : 1} />
                  )}
    </>
  );
};
