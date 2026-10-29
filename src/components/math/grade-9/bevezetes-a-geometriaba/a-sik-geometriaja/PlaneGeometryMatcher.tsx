import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  GeometricPrimitivesSvg,
  AngleTypesSvg,
  AdjacentAndVerticalAnglesSvg,
  ParallelTransversalAnglesSvg,
  ComplementaryAnglesSvg
} from './PlaneGeometryFigures';

interface PlaneGeometryMatcherProps {
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
    title: '1. Szint: Szögértékek és Szögfajták',
    subtitle: 'Párosítsd a fokban megadott szögeket a geometriai szögfajta megnevezésével!',
    pairs: [
      {
        id: 'pm1-1',
        prompt: '42°',
        value: 'Hegyesszög',
        figure: <AngleTypesSvg size={65} />
      },
      {
        id: 'pm1-2',
        prompt: '90°',
        value: 'Derékszög'
      },
      {
        id: 'pm1-3',
        prompt: '135°',
        value: 'Tompaszög'
      },
      {
        id: 'pm1-4',
        prompt: '180°',
        value: 'Egyenesszög'
      },
      {
        id: 'pm1-5',
        prompt: '240°',
        value: 'Homorúszög'
      },
      {
        id: 'pm1-6',
        prompt: '360°',
        value: 'Teljesszög'
      }
    ]
  },
  2: {
    title: '2. Szint: Szögek és Mellékszögeik (Összegük = 180°)',
    subtitle: 'Párosítsd össze a szomszédos mellékszögeket, amelyek összege pontosan 180°!',
    pairs: [
      {
        id: 'pm2-1',
        prompt: '35°',
        value: '145°',
        figure: <AdjacentAndVerticalAnglesSvg size={65} />
      },
      {
        id: 'pm2-2',
        prompt: '70°',
        value: '110°'
      },
      {
        id: 'pm2-3',
        prompt: '90°',
        value: '90°'
      },
      {
        id: 'pm2-4',
        prompt: '125°',
        value: '55°'
      },
      {
        id: 'pm2-5',
        prompt: '160°',
        value: '20°'
      },
      {
        id: 'pm2-6',
        prompt: '48°',
        value: '132°'
      }
    ]
  },
  3: {
    title: '3. Szint: Nevezetes Szögpárok és Geometriai Tulajdonságaik',
    subtitle: 'Párosítsd a szögpárt a helyes matematikai képlettel vagy állítással!',
    pairs: [
      {
        id: 'pm3-1',
        prompt: 'Csúcsszögek',
        value: 'α = α\' (Nagyságuk mindig egyenlő)',
        figure: <AdjacentAndVerticalAnglesSvg size={65} />
      },
      {
        id: 'pm3-2',
        prompt: 'Mellékszögek',
        value: 'α + β = 180° (Összegük egyenesszög)'
      },
      {
        id: 'pm3-3',
        prompt: 'Pótszögek',
        value: 'α + β = 90° (Összegük derékszög)',
        figure: <ComplementaryAnglesSvg size={65} />
      },
      {
        id: 'pm3-4',
        prompt: 'Váltószögek (e ∥ f)',
        value: 'α = α₂ (Z-alak, egyenlőek)',
        figure: <ParallelTransversalAnglesSvg size={65} />
      },
      {
        id: 'pm3-5',
        prompt: 'Egyállású szögek (e ∥ f)',
        value: 'α = α₁ (F-alak, egyenlőek)'
      },
      {
        id: 'pm3-6',
        prompt: 'Társszögek (e ∥ f)',
        value: 'α + β = 180° (C-alak, összegük 180°)'
      }
    ]
  }
};

export const PlaneGeometryMatcher: React.FC<PlaneGeometryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'A sík geometriája'
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
      storageKey="grade9-plane-geometry-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};
