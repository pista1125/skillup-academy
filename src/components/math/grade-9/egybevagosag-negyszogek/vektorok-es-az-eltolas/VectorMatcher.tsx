import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  VectorBasicsSvg,
  VectorAdditionSvg,
  TranslationSvg,
  ScalarMultiplicationSvg
} from './VectorFigures';

interface VectorMatcherProps {
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
    title: '1. Szint: Vektor Alapfogalmak és Szabályok',
    subtitle: 'Párosítsd a vektorok alaptulajdonságait és tételeit a meghatározásukkal!',
    pairs: [
      {
        id: 'vm1-1',
        prompt: 'Vektor fogalma',
        value: 'Irányított szakasz (kezdő- és végpont)',
        figure: <VectorBasicsSvg size={70} />
      },
      {
        id: 'vm1-2',
        prompt: 'Nullvektor (0)',
        value: 'Hossza 0, iránya tetszőleges'
      },
      {
        id: 'vm1-3',
        prompt: 'Ellentett vektor (−v)',
        value: 'Azonos hossz és állás, ellentétes irány'
      },
      {
        id: 'vm1-4',
        prompt: 'Háromszög-szabály láncolása',
        value: 'AB + BC = AC'
      },
      {
        id: 'vm1-5',
        prompt: 'Eltolás fixpontjai (ha v ≠ 0)',
        value: 'Nincs egyetlen fixpontja sem'
      },
      {
        id: 'vm1-6',
        prompt: 'Eltolás körüljárási iránya',
        value: 'Megmarad (iránytartó transzformáció)'
      }
    ]
  },
  2: {
    title: '2. Szint: Vektorműveletek Koordinátákkal',
    subtitle: 'Párosítsd a megadott vektoros feladványokat a pontos számértékekkel!',
    pairs: [
      {
        id: 'vm2-1',
        prompt: 'a(3; 2) és b(4; 5) összege (a + b)',
        value: '(7; 7)',
        figure: <VectorAdditionSvg size={70} />
      },
      {
        id: 'vm2-2',
        prompt: 'a(6; 1) és b(2; 4) különbsége (a − b)',
        value: '(4; −3)'
      },
      {
        id: 'vm2-3',
        prompt: 'v(3; −4) vektor hossza (|v|)',
        value: '5 egység'
      },
      {
        id: 'vm2-4',
        prompt: '−2 · (4; −3) skaláris szorzat',
        value: '(−8; 6)'
      },
      {
        id: 'vm2-5',
        prompt: 'P(1; 3) eltolása v(5; 2) vektorral',
        value: 'P\'(6; 5)'
      },
      {
        id: 'vm2-6',
        prompt: 'A(2; 1) és B(8; 7) szakasz felezőpontja',
        value: 'F(5; 4)'
      }
    ]
  },
  3: {
    title: '3. Szint: Vektortételek és Geometriai Kifejezések',
    subtitle: 'Kösd össze az összefüggéseket a geometriai jelentésükkel!',
    pairs: [
      {
        id: 'vm3-1',
        prompt: 'Háromszög súlypontjának helyvektora',
        value: 's = (a + b + c) / 3',
        figure: <TranslationSvg size={70} />
      },
      {
        id: 'vm3-2',
        prompt: 'Zárt sokszög élvektorainak összege',
        value: '0 (nullvektor)'
      },
      {
        id: 'vm3-3',
        prompt: 'v(6; 8) irányú egységvektor',
        value: '(0,6; 0,8)'
      },
      {
        id: 'vm3-4',
        prompt: 'Paralelogramma átlói közös kezdőpontból',
        value: 'Főátló: a + b, mellékátló: a − b'
      },
      {
        id: 'vm3-5',
        prompt: 'Eltolások egymásutánja (v₁ majd v₂)',
        value: 'Eltolás a v₁ + v₂ vektorral'
      },
      {
        id: 'vm3-6',
        prompt: 'Háromszög középvonalának vektora',
        value: 'F₁F₂ = 1/2 · BC'
      }
    ]
  }
};

export const VectorMatcher: React.FC<VectorMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-trans-vektorok',
  topicTitle = '2. Vektorok és az eltolás'
}) => {
  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={matcherLevels}
      initialLevel={currentLevel || level}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

