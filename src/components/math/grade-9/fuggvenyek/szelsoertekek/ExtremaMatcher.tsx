import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ExtremaConceptSvg, VertexFormulaSvg, IntervalExtremaSvg } from './ExtremaFigures';

export interface ExtremaMatcherProps {
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
    title: '1. Szint: Szélsőérték Alapfogalmak és Jelölések',
    subtitle: 'Párosítsd a kifejezéseket és formulákat a szabatos jelentésükkel!',
    pairs: [
      {
        id: 'em1-1',
        prompt: 'Szélsőérték helye (x₀)',
        value: 'Az x-tengely azon bemeneti értéke, ahol a legkisebb vagy legnagyobb érték kialakul',
        figure: <ExtremaConceptSvg size={70} />
      },
      {
        id: 'em1-2',
        prompt: 'Szélsőérték értéke (y₀)',
        value: 'A felvett minimális vagy maximális magasság az y-tengelyen: f(x₀)'
      },
      {
        id: 'em1-3',
        prompt: 'Globális minimum feltétele',
        value: 'Minden x ∈ D_f esetén f(x) ≥ f(x₀)'
      },
      {
        id: 'em1-4',
        prompt: 'Globális maximum feltétele',
        value: 'Minden x ∈ D_f esetén f(x) ≤ f(x₀)'
      },
      {
        id: 'em1-5',
        prompt: 'Nem konstans lineáris f(x) = mx + b az ℝ halmazon',
        value: 'Nincs se minimuma, se maximuma (minden határon túl nő és csökken)'
      },
      {
        id: 'em1-6',
        prompt: 'Csúcsponti alak: a(x - u)² + v',
        value: 'A szélsőérték helye u, értéke pedig v',
        figure: <VertexFormulaSvg size={70} />
      }
    ]
  },
  2: {
    title: '2. Szint: Függvények Szélsőértéke ℝ-en',
    subtitle: 'Párosítsd a hozzárendelési utasításokat a pontos szélsőértékükkel!',
    pairs: [
      {
        id: 'em2-1',
        prompt: 'f(x) = (x - 3)² + 5',
        value: 'Minimum: helye x = 3, értéke y = 5'
      },
      {
        id: 'em2-2',
        prompt: 'g(x) = -(x + 2)² - 1',
        value: 'Maximum: helye x = -2, értéke y = -1'
      },
      {
        id: 'em2-3',
        prompt: 'h(x) = |x - 4| - 6',
        value: 'Minimum: helye x = 4, értéke y = -6'
      },
      {
        id: 'em2-4',
        prompt: 'p(x) = -2|x + 1| + 3',
        value: 'Maximum: helye x = -1, értéke y = 3'
      },
      {
        id: 'em2-5',
        prompt: 'q(x) = x² + 8',
        value: 'Minimum: helye x = 0, értéke y = 8'
      },
      {
        id: 'em2-6',
        prompt: 'r(x) = -x²',
        value: 'Maximum: helye x = 0, értéke y = 0'
      }
    ]
  },
  3: {
    title: '3. Szint: Szélsőérték Zárt Intervallumon',
    subtitle: 'Párosítsd az adott intervallumra szűkített függvényt a szélsőérték-párral!',
    pairs: [
      {
        id: 'em3-1',
        prompt: 'f(x) = 2x - 3, ha x ∈ [1; 5]',
        value: 'Min: x = 1-nél y = -1; Max: x = 5-nél y = 7',
        figure: <IntervalExtremaSvg size={70} />
      },
      {
        id: 'em3-2',
        prompt: 'g(x) = -x + 4, ha x ∈ [0; 6]',
        value: 'Min: x = 6-nál y = -2; Max: x = 0-nál y = 4'
      },
      {
        id: 'em3-3',
        prompt: 'h(x) = x², ha x ∈ [-2; 3]',
        value: 'Min: x = 0-nál y = 0; Max: x = 3-nál y = 9'
      },
      {
        id: 'em3-4',
        prompt: 'p(x) = (x - 2)² + 1, ha x ∈ [3; 5]',
        value: 'Min: x = 3-nál y = 2; Max: x = 5-nél y = 10'
      },
      {
        id: 'em3-5',
        prompt: 'k(x) = |x|, ha x ∈ [-4; 1]',
        value: 'Min: x = 0-nál y = 0; Max: x = -4-nél y = 4'
      },
      {
        id: 'em3-6',
        prompt: 'c(x) = 7, ha x ∈ [-5; 5]',
        value: 'Minden pontban egyszerre min és max: y = 7'
      }
    ]
  }
};

export const ExtremaMatcher: React.FC<ExtremaMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'szelsoertekek',
  topicTitle = 'Függvények Szélsőértékei'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      title="Szélsőérték Párosító"
      subtitle="Keresd meg a függvényekhez és szituációkhoz tartozó helyes szélsőértékeket!"
      levels={matcherLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

