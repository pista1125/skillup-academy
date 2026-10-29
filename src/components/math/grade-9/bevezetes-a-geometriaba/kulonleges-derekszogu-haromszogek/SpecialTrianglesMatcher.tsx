import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  HalfEquilateralSvg,
  IsoscelesRightSvg,
  SpecialTrianglesComparisonSvg
} from './SpecialTrianglesFigures';

interface SpecialTrianglesMatcherProps {
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
    title: '1. Szint: Alaparányok és Oldalszámítások',
    subtitle: 'Párosítsd a bázisoldalból adódó pontos oldalértékeket!',
    pairs: [
      {
        id: 'sm1-1',
        prompt: '30°-60°-90°: rövid befogó a = 5 cm',
        value: 'átfogó c = 10 cm, hosszú befogó b = 5√3 cm',
        figure: <HalfEquilateralSvg size={65} />
      },
      {
        id: 'sm1-2',
        prompt: '45°-45°-90°: befogó a = 7 cm',
        value: 'átfogó c = 7√2 cm',
        figure: <IsoscelesRightSvg size={65} />
      },
      {
        id: 'sm1-3',
        prompt: '30°-kal szemközti oldal tulajdonsága',
        value: 'Pontosan fele az átfogónak (a = c / 2)'
      },
      {
        id: 'sm1-4',
        prompt: '45°-45°-90° oldalaránya',
        value: '1 : 1 : √2'
      },
      {
        id: 'sm1-5',
        prompt: '30°-60°-90° oldalaránya',
        value: '1 : √3 : 2'
      },
      {
        id: 'sm1-6',
        prompt: '30°-60°-90°: rövid befogó a = 1 cm',
        value: 'b = √3 cm, c = 2 cm'
      }
    ]
  },
  2: {
    title: '2. Szint: Visszaszámolás Átfogóból és Befogóból',
    subtitle: 'Keresd meg az ismeretlen oldalakat adott átfogó vagy hosszabbik befogó esetén!',
    pairs: [
      {
        id: 'sm2-1',
        prompt: '30°-60°-90°: átfogó c = 12 cm',
        value: 'a = 6 cm, b = 6√3 cm'
      },
      {
        id: 'sm2-2',
        prompt: '45°-45°-90°: átfogó c = 8√2 cm',
        value: 'befogók a = b = 8 cm'
      },
      {
        id: 'sm2-3',
        prompt: '30°-60°-90°: hosszabbik befogó b = 9√3 cm',
        value: 'a = 9 cm, c = 18 cm'
      },
      {
        id: 'sm2-4',
        prompt: '45°-45°-90°: átfogó c = 10 cm',
        value: 'befogók a = b = 5√2 cm (10 / √2)'
      },
      {
        id: 'sm2-5',
        prompt: '30°-60°-90°: átfogó c = 20 cm',
        value: 'a = 10 cm, b = 10√3 cm'
      },
      {
        id: 'sm2-6',
        prompt: '30°-60°-90°: hosszabbik befogó b = 3 cm',
        value: 'a = √3 cm, c = 2√3 cm'
      }
    ]
  },
  3: {
    title: '3. Szint: Geometriai Alakzatok és Alkalmazások',
    subtitle: 'Párosítsd a sokszögekhez és testekhez kapcsolódó összefüggéseket!',
    pairs: [
      {
        id: 'sm3-1',
        prompt: 'a oldalú szabályos háromszög magassága',
        value: 'm = (a · √3) / 2',
        figure: <SpecialTrianglesComparisonSvg size={65} />
      },
      {
        id: 'sm3-2',
        prompt: 'a oldalú négyzet átlója',
        value: 'd = a · √2'
      },
      {
        id: 'sm3-3',
        prompt: 'a élű kocka lapátlója',
        value: 'd = a · √2 (45°-45°-90° háromszög)'
      },
      {
        id: 'sm3-4',
        prompt: 'a élű kocka testátlója',
        value: 'D = a · √3'
      },
      {
        id: 'sm3-5',
        prompt: 'a oldalú szabályos hatszög szemközti oldalainak távolsága',
        value: '2 · ((a√3)/2) = a√3'
      },
      {
        id: 'sm3-6',
        prompt: '45°-45°-90° háromszög területe',
        value: 'T = a² / 2 (a befogóból)'
      }
    ]
  }
};

export const SpecialTrianglesMatcher: React.FC<SpecialTrianglesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Különleges derékszögű háromszögek'
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
      themeColor="amber"
      storageKey="grade9-special-triangles-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};

