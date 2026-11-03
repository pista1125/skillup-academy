import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  BaseAbsValueSvg,
  TransformedAbsValueSvg,
  NegativeAbsValueSvg
} from './AbsValueFigures';

interface AbsValueMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Abszolútérték Alapok és Eltolások',
    subtitle: 'Párosítsd a képleteket a hozzájuk tartozó csúcsponttal!',
    pairs: [
      {
        id: 'am1-1',
        prompt: 'f(x) = |x|',
        value: 'Csúcspont az origóban: C(0; 0)',
        figure: <BaseAbsValueSvg size={70} />
      },
      {
        id: 'am1-2',
        prompt: 'f(x) = |x - 3|',
        value: 'Csúcspont: C(3; 0) (3 egység jobbra)'
      },
      {
        id: 'am1-3',
        prompt: 'f(x) = |x + 2|',
        value: 'Csúcspont: C(-2; 0) (2 egység balra)'
      },
      {
        id: 'am1-4',
        prompt: 'f(x) = |x| + 4',
        value: 'Csúcspont: C(0; 4) (4 egység fel)'
      },
      {
        id: 'am1-5',
        prompt: 'f(x) = |x| - 5',
        value: 'Csúcspont: C(0; -5) (5 egység le)'
      },
      {
        id: 'am1-6',
        prompt: 'f(x) = -|x|',
        value: 'Lefelé nyíló V-alak (x tengelyre tükrözve)'
      }
    ]
  },
  2: {
    title: '2. Szint: Képletek és Csúcspontok C(u; v)',
    subtitle: 'Olvasd le a csúcspontot és a szélsőérték típusát!',
    pairs: [
      {
        id: 'am2-1',
        prompt: 'f(x) = |x - 4| + 2',
        value: 'Csúcs: C(4; 2) ➔ Minimum y = 2',
        figure: <TransformedAbsValueSvg size={70} />
      },
      {
        id: 'am2-2',
        prompt: 'f(x) = |x + 3| - 5',
        value: 'Csúcs: C(-3; -5) ➔ Minimum y = -5'
      },
      {
        id: 'am2-3',
        prompt: 'f(x) = -|x - 1| + 6',
        value: 'Csúcs: C(1; 6) ➔ Maximum y = 6'
      },
      {
        id: 'am2-4',
        prompt: 'f(x) = -|x + 5| - 2',
        value: 'Csúcs: C(-5; -2) ➔ Maximum y = -2'
      },
      {
        id: 'am2-5',
        prompt: 'f(x) = 2|x| - 3',
        value: 'Csúcs: C(0; -3) ➔ Minimum y = -3 (szűkebb szárak)'
      },
      {
        id: 'am2-6',
        prompt: 'f(x) = -3|x - 2|',
        value: 'Csúcs: C(2; 0) ➔ Maximum y = 0'
      }
    ]
  },
  3: {
    title: '3. Szint: Értékkészlet és Zérushelyek',
    subtitle: 'Párosítsd a függvényeket az értékkészletükkel és zérushelyeikkel!',
    pairs: [
      {
        id: 'am3-1',
        prompt: 'f(x) = |x - 2| - 3',
        value: 'R_f = [-3; +∞[, 2 zérushely: x = -1 és x = 5'
      },
      {
        id: 'am3-2',
        prompt: 'f(x) = -|x + 1| + 4',
        value: 'R_f = ]-∞; 4], 2 zérushely: x = -5 és x = 3',
        figure: <NegativeAbsValueSvg size={70} />
      },
      {
        id: 'am3-3',
        prompt: 'f(x) = |x - 5| + 1',
        value: 'R_f = [1; +∞[, Nincs zérushely (tengely felett van)'
      },
      {
        id: 'am3-4',
        prompt: 'f(x) = -|x| - 2',
        value: 'R_f = ]-∞; -2], Nincs zérushely (tengely alatt van)'
      },
      {
        id: 'am3-5',
        prompt: 'f(x) = |x + 3|',
        value: 'R_f = [0; +∞[, 1 zérushely (csúcs): x₀ = -3'
      },
      {
        id: 'am3-6',
        prompt: 'f(x) = -|x - 4|',
        value: 'R_f = ]-∞; 0], 1 zérushely (csúcs): x₀ = 4'
      }
    ]
  }
};

export const AbsValueMatcher: React.FC<AbsValueMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'abszoluterteek-fuggveny',
  topicTitle = 'Abszolútérték-függvény'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      activityType="g9-func-abszolut-matcher"
    />
  );
};

