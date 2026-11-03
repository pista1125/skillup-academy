import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  PropertiesChecklistSvg,
  ParitySymmetrySvg,
  BoundednessSvg
} from './CharacterizationFigures';

interface CharacterizationMatcherProps {
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
    title: '1. Szint: A Függvényjellemzés Alapfogalmai',
    subtitle: 'Párosítsd a matematikai fogalmakat a jelentésükkel!',
    pairs: [
      {
        id: 'cm1-1',
        prompt: 'Értelmezési tartomány (D_f)',
        value: 'Azon x bemeneti értékek halmaza, ahol a függvény értelmezve van',
        figure: <PropertiesChecklistSvg size={70} />
      },
      {
        id: 'cm1-2',
        prompt: 'Értékkészlet (R_f)',
        value: 'Azon y értékek összessége, amelyeket a függvény felvesz'
      },
      {
        id: 'cm1-3',
        prompt: 'Zérushely (x₀)',
        value: 'Az x tengely metszéspontja: f(x₀) = 0'
      },
      {
        id: 'cm1-4',
        prompt: 'Páros függvény: f(-x) = f(x)',
        value: 'Tengelyesen szimmetrikus az y tengelyre'
      },
      {
        id: 'cm1-5',
        prompt: 'Páratlan függvény: f(-x) = -f(x)',
        value: 'Középpontosan szimmetrikus az origóra'
      },
      {
        id: 'cm1-6',
        prompt: 'Alulról korlátos függvény',
        value: 'Létezik olyan k szám, hogy minden x-re f(x) ≥ k'
      }
    ]
  },
  2: {
    title: '2. Szint: Függvények és Paritásuk',
    subtitle: 'Melyik függvény páros, páratlan vagy egyik sem?',
    pairs: [
      {
        id: 'cm2-1',
        prompt: 'f(x) = x²',
        value: 'PÁROS függvény (y-tengelyre tükrös parabola)',
        figure: <ParitySymmetrySvg size={70} />
      },
      {
        id: 'cm2-2',
        prompt: 'f(x) = |x|',
        value: 'PÁROS függvény (y-tengelyre tükrös V-alak)'
      },
      {
        id: 'cm2-3',
        prompt: 'f(x) = 5 (konstans)',
        value: 'PÁROS függvény (vízszintes egyenes)'
      },
      {
        id: 'cm2-4',
        prompt: 'f(x) = 3x (egyenes arányosság)',
        value: 'PÁRATLAN függvény (origóra tükrös)'
      },
      {
        id: 'cm2-5',
        prompt: 'f(x) = 1 / x (hiperbola)',
        value: 'PÁRATLAN függvény (I. és III. negyed szimmetria)'
      },
      {
        id: 'cm2-6',
        prompt: 'f(x) = 2x - 3',
        value: 'SEM PÁROS, SEM PÁRATLAN (eltolt egyenes)'
      }
    ]
  },
  3: {
    title: '3. Szint: Értékkészletek és Korlátosság',
    subtitle: 'Párosítsd a függvényeket az értékkészletükkel és korlátosságukkal!',
    pairs: [
      {
        id: 'cm3-1',
        prompt: 'f(x) = x² - 5',
        value: 'R_f = [-5; +∞[ ➔ Alulról korlátos (k = -5)',
        figure: <BoundednessSvg size={70} />
      },
      {
        id: 'cm3-2',
        prompt: 'f(x) = -|x| + 4',
        value: 'R_f = ]-∞; 4] ➔ Felülről korlátos (K = 4)'
      },
      {
        id: 'cm3-3',
        prompt: 'f(x) = 7 (konstans)',
        value: 'R_f = {7} ➔ Mindkét oldalról korlátos (k = 7, K = 7)'
      },
      {
        id: 'cm3-4',
        prompt: 'f(x) = 3x - 1',
        value: 'R_f = ℝ ➔ Nem korlátos (sem alulról, sem felülről)'
      },
      {
        id: 'cm3-5',
        prompt: 'f(x) = |x - 2| + 1',
        value: 'R_f = [1; +∞[ ➔ Alulról korlátos (k = 1)'
      },
      {
        id: 'cm3-6',
        prompt: 'f(x) = 6 / x',
        value: 'R_f = ℝ \\ {0} ➔ Nem korlátos'
      }
    ]
  }
};

export const CharacterizationMatcher: React.FC<CharacterizationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'fuggvenyek-jellemzese',
  topicTitle = 'Függvények jellemzése'
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
      activityType="g9-func-jellemzes-matcher"
    />
  );
};

