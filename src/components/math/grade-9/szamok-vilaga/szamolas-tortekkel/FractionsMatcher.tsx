import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CommonDenominatorSvg,
  ComplexFractionSvg,
  FractionMultDivSvg
} from './FractionsFigures';

interface FractionsMatcherProps {
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
    title: '1. Szint: Alapvető Törtműveletek (Könnyű)',
    subtitle: 'Párosítsd a törtműveleteket a pontos, legegyszerűbb végeredményükkel!',
    pairs: [
      {
        id: 'fm1-1',
        prompt: '1/2 + 1/3',
        value: '5/6',
        figure: <CommonDenominatorSvg size={65} />
      },
      {
        id: 'fm1-2',
        prompt: '3/4 - 1/2',
        value: '1/4'
      },
      {
        id: 'fm1-3',
        prompt: '2/3 · 3/4',
        value: '1/2',
        figure: <FractionMultDivSvg size={65} />
      },
      {
        id: 'fm1-4',
        prompt: '3/5 : 2/5',
        value: '3/2'
      },
      {
        id: 'fm1-5',
        prompt: '5/8 bővítve 3-mal',
        value: '15/24'
      },
      {
        id: 'fm1-6',
        prompt: '28/56 legegyszerűbb alakja',
        value: '1/2'
      },
      {
        id: 'fm1-7',
        prompt: '4/7 reciproka',
        value: '7/4'
      },
      {
        id: 'fm1-8',
        prompt: '0,4 tört alakban',
        value: '2/5'
      }
    ]
  },
  2: {
    title: '2. Szint: Emeletes Törtek és Reciprokok (Közepes)',
    subtitle: 'Párosítsd a kifejezéseket a kiszámított legegyszerűbb alakjukkal!',
    pairs: [
      {
        id: 'fm2-1',
        prompt: '(2/3) / (4/5)',
        value: '5/6',
        figure: <ComplexFractionSvg size={65} />
      },
      {
        id: 'fm2-2',
        prompt: '(1/2 + 1/4) : 3',
        value: '1/4'
      },
      {
        id: 'fm2-3',
        prompt: '(1 + 1/5) / (1 - 1/5)',
        value: '3/2'
      },
      {
        id: 'fm2-4',
        prompt: '2 : (3/4)',
        value: '8/3'
      },
      {
        id: 'fm2-5',
        prompt: '(2/3) : 4',
        value: '1/6'
      },
      {
        id: 'fm2-6',
        prompt: '-3/8 reciproka',
        value: '-8/3'
      },
      {
        id: 'fm2-7',
        prompt: '2,5 reciproka',
        value: '2/5'
      },
      {
        id: 'fm2-8',
        prompt: '45-nek a 4/9 része',
        value: '20'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Műveletek és Törtrészek (Nehéz)',
    subtitle: 'Párosítsd az összetettebb törtkifejezéseket a végeredményükkel!',
    pairs: [
      {
        id: 'fm3-1',
        prompt: '7/9 - 3/2',
        value: '-13/18'
      },
      {
        id: 'fm3-2',
        prompt: '2/7 : 5/3',
        value: '6/35'
      },
      {
        id: 'fm3-3',
        prompt: '(3/4) / (9/8)',
        value: '2/3',
        figure: <ComplexFractionSvg size={65} />
      },
      {
        id: 'fm3-4',
        prompt: '28-nak a 2/7 része',
        value: '8'
      },
      {
        id: 'fm3-5',
        prompt: '(1 - 1/12) · (1 - 3/11)',
        value: '2/3'
      },
      {
        id: 'fm3-6',
        prompt: '(1/2) / (1/3 + 1/6)',
        value: '1'
      },
      {
        id: 'fm3-7',
        prompt: '(-5/6) · (-3/10)',
        value: '1/4'
      },
      {
        id: 'fm3-8',
        prompt: '32/44 egyszerűsítve',
        value: '8/11'
      }
    ]
  }
};

export const FractionsMatcher: React.FC<FractionsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-szamok-tortek-matcher',
  topicTitle = '9. Osztály - Számolás Törtekkel Párosító'
}) => {
  return (
    <MatcherTemplate
      levels={matcherLevels}
      currentLevel={currentLevel || level}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="cyan"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

export default FractionsMatcher;
