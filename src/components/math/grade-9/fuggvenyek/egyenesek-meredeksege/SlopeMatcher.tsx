import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  SlopeTriangleSvg,
  SlopeTypesSvg,
  ParallelPerpendicularSvg
} from './SlopeFigures';

interface SlopeMatcherProps {
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
    title: '1. Szint: Meredekségi Alapfogalmak és Képletek',
    subtitle: 'Párosítsd a matematikai leírásokat és iránymutatókat!',
    pairs: [
      {
        id: 'sm1-1',
        prompt: 'm = Δy / Δx képlet',
        value: 'Meredekség (iránymutató) kiszámítása két pontból',
        figure: <SlopeTriangleSvg size={70} />
      },
      {
        id: 'sm1-2',
        prompt: 'm > 0',
        value: 'Emelkedő egyenes (hegyesszög az x tengellyel)'
      },
      {
        id: 'sm1-3',
        prompt: 'm < 0',
        value: 'Süllyedő egyenes (tompaszög az x tengellyel)'
      },
      {
        id: 'sm1-4',
        prompt: 'm = 0',
        value: 'Vízszintes egyenes (x tengellyel párhuzamos)'
      },
      {
        id: 'sm1-5',
        prompt: 'Δx = 0 (függőleges egyenes)',
        value: 'Nincs meredeksége (nullával osztás, nem függvény)'
      },
      {
        id: 'sm1-6',
        prompt: 'm₁ = m₂',
        value: 'Párhuzamos egyenesek feltétele'
      }
    ]
  },
  2: {
    title: '2. Szint: Meredekség Számítása Két Pontból',
    subtitle: 'Mekkora az egyenes meredeksége a megadott pontpárokon áthaladva?',
    pairs: [
      {
        id: 'sm2-1',
        prompt: 'P₁(1; 2) és P₂(3; 8)',
        value: 'm = (8 - 2) / (3 - 1) = 6 / 2 = 3'
      },
      {
        id: 'sm2-2',
        prompt: 'P₁(0; 5) és P₂(2; 1)',
        value: 'm = (1 - 5) / (2 - 0) = -4 / 2 = -2'
      },
      {
        id: 'sm2-3',
        prompt: 'P₁(-1; 4) és P₂(3; 4)',
        value: 'm = (4 - 4) / 4 = 0 (vízszintes egyenes)'
      },
      {
        id: 'sm2-4',
        prompt: 'P₁(2; 1) és P₂(6; 3)',
        value: 'm = (3 - 1) / (6 - 2) = 2 / 4 = 0.5'
      },
      {
        id: 'sm2-5',
        prompt: 'P₁(3; -2) és P₂(3; 5)',
        value: 'Δx = 0 ➔ Függőleges, nincs meredeksége'
      },
      {
        id: 'sm2-6',
        prompt: 'P₁(-2; -3) és P₂(1; 3)',
        value: 'm = (3 - (-3)) / (1 - (-2)) = 6 / 3 = 2'
      }
    ]
  },
  3: {
    title: '3. Szint: Párhuzamos és Merőleges Meredekségek',
    subtitle: 'Párosítsd az adott egyenes meredekségét a rá merőleges vagy párhuzamos egyenessel!',
    pairs: [
      {
        id: 'sm3-1',
        prompt: 'm₁ = 2 meredekségre merőleges',
        value: 'm₂ = -1/2 = -0.5',
        figure: <ParallelPerpendicularSvg size={70} />
      },
      {
        id: 'sm3-2',
        prompt: 'm₁ = -4 meredekségre merőleges',
        value: 'm₂ = +1/4 = 0.25'
      },
      {
        id: 'sm3-3',
        prompt: 'm₁ = 1 meredekségre merőleges',
        value: 'm₂ = -1'
      },
      {
        id: 'sm3-4',
        prompt: 'y = 3x - 7 egyenessel párhuzamos',
        value: 'm₂ = 3'
      },
      {
        id: 'sm3-5',
        prompt: 'y = -(1/3)x + 2 egyenesre merőleges',
        value: 'm₂ = 3'
      },
      {
        id: 'sm3-6',
        prompt: 'x tengellyel párhuzamos egyenesre merőleges',
        value: 'Függőleges egyenes (nincs meredeksége)'
      }
    ]
  }
};

export const SlopeMatcher: React.FC<SlopeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'egyenesek-meredeksege',
  topicTitle = 'Egyenesek meredeksége'
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
      activityType="g9-func-meredekseg-matcher"
    />
  );
};

