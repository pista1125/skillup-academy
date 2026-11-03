import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  LinearGeneralFormSvg,
  FastPlottingSvg,
  LinearParametersSvg
} from './LinearFigures';

interface LinearMatcherProps {
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
    title: '1. Szint: Lineáris Függvény Fogalmak és Paraméterek',
    subtitle: 'Párosítsd a kifejezéseket a matematikai leírásukkal!',
    pairs: [
      {
        id: 'lm1-1',
        prompt: 'f(x) = mx + b',
        value: 'A lineáris függvény általános alakja',
        figure: <LinearGeneralFormSvg size={70} />
      },
      {
        id: 'lm1-2',
        prompt: 'm paraméter',
        value: 'Meredekség (iránymutató, x együtthatója)'
      },
      {
        id: 'lm1-3',
        prompt: 'b paraméter',
        value: 'y-tengelymetszet értéke: M_y(0; b)'
      },
      {
        id: 'lm1-4',
        prompt: 'x₀ = -b / m',
        value: 'Zérushely (az x-tengely metszéspontja)'
      },
      {
        id: 'lm1-5',
        prompt: 'm = 0 esetén: f(x) = b',
        value: 'Konstans függvény (vízszintes egyenes)'
      },
      {
        id: 'lm1-6',
        prompt: 'b = 0 esetén: f(x) = mx',
        value: 'Egyenes arányosság (origón átmenő egyenes)'
      }
    ]
  },
  2: {
    title: '2. Szint: Képletek és Zérushelyek Párosítása',
    subtitle: 'Számold ki az egyes függvények zérushelyét (f(x) = 0 megoldását)!',
    pairs: [
      {
        id: 'lm2-1',
        prompt: 'f(x) = 2x - 6',
        value: 'Zérushely: x₀ = 3 (mert 2·3 - 6 = 0)'
      },
      {
        id: 'lm2-2',
        prompt: 'f(x) = -3x + 12',
        value: 'Zérushely: x₀ = 4 (mert -3·4 + 12 = 0)'
      },
      {
        id: 'lm2-3',
        prompt: 'f(x) = 5x + 10',
        value: 'Zérushely: x₀ = -2 (mert 5·(-2) + 10 = 0)'
      },
      {
        id: 'lm2-4',
        prompt: 'f(x) = -x - 7',
        value: 'Zérushely: x₀ = -7 (mert -(-7) - 7 = 0)'
      },
      {
        id: 'lm2-5',
        prompt: 'f(x) = 4x',
        value: 'Zérushely: x₀ = 0 (origón megy át)'
      },
      {
        id: 'lm2-6',
        prompt: 'f(x) = 8 (konstans)',
        value: 'Nincs zérushelye (soha nem éri el a 0-t)'
      }
    ]
  },
  3: {
    title: '3. Szint: Tulajdonságok és Egyenletek',
    subtitle: 'Melyik képlet felel meg a megadott geometriai feltételeknek?',
    pairs: [
      {
        id: 'lm3-1',
        prompt: 'Meredeksége m = 2 és y-metszete b = 3',
        value: 'y = 2x + 3',
        figure: <FastPlottingSvg size={70} />
      },
      {
        id: 'lm3-2',
        prompt: 'Meredeksége m = -1 és y-metszete b = -4',
        value: 'y = -x - 4'
      },
      {
        id: 'lm3-3',
        prompt: 'Párhuzamos az y = 3x - 1-gyel és átmegy a (0; 5) ponton',
        value: 'y = 3x + 5'
      },
      {
        id: 'lm3-4',
        prompt: 'Merőleges az y = 2x + 1-re és átmegy az origón',
        value: 'y = -0.5x'
      },
      {
        id: 'lm3-5',
        prompt: 'Zérushelye x₀ = 2 és y-metszete b = -6',
        value: 'y = 3x - 6 (m = 6/2 = 3)'
      },
      {
        id: 'lm3-6',
        prompt: 'Vízszintes egyenes y = -2 magasságban',
        value: 'y = -2'
      }
    ]
  }
};

export const LinearMatcher: React.FC<LinearMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'linearis-fuggvenyek',
  topicTitle = 'Lineáris függvények'
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
      activityType="g9-func-linearis-matcher"
    />
  );
};

