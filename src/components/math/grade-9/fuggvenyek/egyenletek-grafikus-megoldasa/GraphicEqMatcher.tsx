import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { IntersectionConceptSvg, CasesOfSolutionsSvg, AbsLinearIntersectionSvg } from './GraphicEqFigures';

export interface GraphicEqMatcherProps {
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
    title: '1. Szint: Egyenletek Szétbontása Függvényekre',
    subtitle: 'Párosítsd az egyenleteket a grafikus ábrázoláshoz szétbontott két oldalukkal!',
    pairs: [
      {
        id: 'gm1-1',
        prompt: 'x² = 2x + 3',
        value: 'f(x) = x² (parabola) és g(x) = 2x + 3 (egyenes)',
        figure: <IntersectionConceptSvg size={70} />
      },
      {
        id: 'gm1-2',
        prompt: '|x - 3| = 4',
        value: 'f(x) = |x - 3| (V-alak) és g(x) = 4 (vízszintes egyenes)',
        figure: <AbsLinearIntersectionSvg size={70} />
      },
      {
        id: 'gm1-3',
        prompt: '(x + 1)² - 4 = 0',
        value: 'f(x) = (x + 1)² és g(x) = 4 (átrendezve a konstanst)',
      },
      {
        id: 'gm1-4',
        prompt: '√(x + 2) = x',
        value: 'f(x) = √(x + 2) (gyökfüggvény) és g(x) = x (főátló)',
      },
      {
        id: 'gm1-5',
        prompt: '|x + 2| = -x + 4',
        value: 'f(x) = |x + 2| és g(x) = -x + 4 (csökkenő egyenes)',
      },
      {
        id: 'gm1-6',
        prompt: 'x² + 1 = 2',
        value: 'f(x) = x² + 1 és g(x) = 2',
      }
    ]
  },
  2: {
    title: '2. Szint: Grafikus Megoldáshalmazok',
    subtitle: 'Párosítsd az egyenleteket a grafikonról leolvasott megoldáshalmazukkal!',
    pairs: [
      {
        id: 'gm2-1',
        prompt: 'x² = 4',
        value: 'x ∈ {-2; 2} (két metszéspont az y = 4 magasságban)',
        figure: <CasesOfSolutionsSvg size={70} />
      },
      {
        id: 'gm2-2',
        prompt: '|x - 5| = 2',
        value: 'x ∈ {3; 7} (az 5-től vett távolság 2 egység)',
      },
      {
        id: 'gm2-3',
        prompt: 'x² = 2x',
        value: 'x ∈ {0; 2} (origóban és a (2; 4) pontban metszik egymást)',
      },
      {
        id: 'gm2-4',
        prompt: '|x| = -3',
        value: 'M = ∅ (nincs metszéspont, a V-alak y ≥ 0, az egyenes alatta fut)',
      },
      {
        id: 'gm2-5',
        prompt: '√x = 3',
        value: 'x = 9 (egyetlen metszéspont a (9; 3) koordinátánál)',
      },
      {
        id: 'gm2-6',
        prompt: '(x - 1)² = 0',
        value: 'x = 1 (a parabola csúcspontja érinti az x-tengelyt)',
      }
    ]
  },
  3: {
    title: '3. Szint: Megoldások Száma',
    subtitle: 'Párosítsd az egyenleteket a valós gyökeik (metszéspontjaik) számával!',
    pairs: [
      {
        id: 'gm3-1',
        prompt: 'x² = -5',
        value: '0 megoldás (a parabola és a negatív vízszintes egyenes nem találkozik)'
      },
      {
        id: 'gm3-2',
        prompt: '(x - 3)² = 0',
        value: '1 megoldás (csúcsponti érintés)'
      },
      {
        id: 'gm3-3',
        prompt: '|x| = 5',
        value: '2 megoldás (x₁ = -5 és x₂ = 5)'
      },
      {
        id: 'gm3-4',
        prompt: '√x = -2',
        value: '0 megoldás (a négyzetgyök értékkészlete nemnegatív: Rg = [0; ∞[)'
      },
      {
        id: 'gm3-5',
        prompt: 'x² = x + 6',
        value: '2 megoldás (x₁ = -2 és x₂ = 3)'
      },
      {
        id: 'gm3-6',
        prompt: '|x - 1| = 0',
        value: '1 megoldás (a V-alak csúcsa érinti a tengelyt: x = 1)'
      }
    ]
  }
};

export const GraphicEqMatcher: React.FC<GraphicEqMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'egyenletek-grafikus-megoldasa',
  topicTitle = 'Egyenletek Grafikus Megoldása'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      title="Grafikus Egyenletmegoldó Párosító"
      subtitle="Kapcsold össze az egyenleteket a hozzájuk tartozó függvényekkel és leolvasott megoldásaikkal!"
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

