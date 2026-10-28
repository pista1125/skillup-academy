import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  MonomialStructureSvg,
  EvaluationMachineSvg,
  TextToFormulaSvg
} from './VariablesFigures';

interface VariablesMatcherProps {
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
    title: '1. Szint: Kifejezések Helyettesítési Értéke (x = 2)',
    subtitle: 'Párosítsd a kifejezéseket a pontos helyettesítési értékükkel x = 2 esetén!',
    pairs: [
      {
        id: 'vm1-1',
        prompt: '3x - 1',
        value: '5',
        figure: <EvaluationMachineSvg size={65} />
      },
      {
        id: 'vm1-2',
        prompt: 'x² + 3',
        value: '7'
      },
      {
        id: 'vm1-3',
        prompt: '2x² - x',
        value: '6'
      },
      {
        id: 'vm1-4',
        prompt: '4 - 3x',
        value: '-2'
      },
      {
        id: 'vm1-5',
        prompt: '(x + 1)²',
        value: '9'
      },
      {
        id: 'vm1-6',
        prompt: '10 / x + 1',
        value: '6'
      }
    ]
  },
  2: {
    title: '2. Szint: Szövegből Kifejezés Párosító',
    subtitle: 'Párosítsd a szöveges matematikai leírásokat a megfelelő algebrai formulával!',
    pairs: [
      {
        id: 'vm2-1',
        prompt: 'Egy szám 4-szeresénél 3-mal kisebb',
        value: '4x - 3',
        figure: <TextToFormulaSvg size={65} />
      },
      {
        id: 'vm2-2',
        prompt: 'Egy számnál 3-mal kisebb szám 4-szerese',
        value: '4(x - 3)'
      },
      {
        id: 'vm2-3',
        prompt: 'Két szám összegének négyzete',
        value: '(a + b)²'
      },
      {
        id: 'vm2-4',
        prompt: 'Két szám négyzetének összege',
        value: 'a² + b²'
      },
      {
        id: 'vm2-5',
        prompt: 'Egy szám fele növelve 5-tel',
        value: 'x / 2 + 5'
      },
      {
        id: 'vm2-6',
        prompt: 'Egy szám és ellentettjének szorzata',
        value: '-x²'
      }
    ]
  },
  3: {
    title: '3. Szint: Monomok Anatómia és Haladó Helyettesítés',
    subtitle: 'Párosítsd a monomok tulajdonságait és a negatív behelyettesítések eredményét!',
    pairs: [
      {
        id: 'vm3-1',
        prompt: '-5x²y³ fokszáma',
        value: '5-ödfokú (2+3)',
        figure: <MonomialStructureSvg size={65} />
      },
      {
        id: 'vm3-2',
        prompt: '-x együtthatója',
        value: '-1'
      },
      {
        id: 'vm3-3',
        prompt: '(3a) / 4 együtthatója',
        value: '3/4'
      },
      {
        id: 'vm3-4',
        prompt: '-3x² értéke x = -2 esetén',
        value: '-12'
      },
      {
        id: 'vm3-5',
        prompt: '(-3x)² értéke x = -2 esetén',
        value: '36'
      },
      {
        id: 'vm3-6',
        prompt: '7 mint konstans monom foka',
        value: '0-adfokú'
      }
    ]
  }
};

export const VariablesMatcher: React.FC<VariablesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-egyenletek-azonossagok',
  topicTitle = 'A betűk szerepe a számolásban'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      storageKey="grade9-variables-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • PÁROSÍTÓ JÁTÉK"
    />
  );
};

