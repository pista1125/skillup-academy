import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  BaseAndHeightAreaSVG,
  RightTriangleAreaSVG,
  EquilateralTriangleAreaSVG,
  HeronAndCirclesAreaSVG
} from './TriangleAreaFigures';

interface TriangleAreaMatcherProps {
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

export const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Területképletek és Neveik',
    subtitle: 'Párosítsd a területképleteket a megfelelő háromszögtípussal és névvel!',
    pairs: [
      {
        id: 'tam1-1',
        prompt: 'Alap és magasság szorzata',
        value: 'T = (a · m_a) / 2 = (b · m_b) / 2 = (c · m_c) / 2',
        figure: <BaseAndHeightAreaSVG size={65} />
      },
      {
        id: 'tam1-2',
        prompt: 'Derékszögű háromszög területe',
        value: 'T = (a · b) / 2 (a két befogó szorzatának fele)',
        figure: <RightTriangleAreaSVG size={65} />
      },
      {
        id: 'tam1-3',
        prompt: 'Szabályos háromszög területe',
        value: 'T = (a² · √3) / 4',
        figure: <EquilateralTriangleAreaSVG size={65} />
      },
      {
        id: 'tam1-4',
        prompt: 'Hérón-képlet (három oldal ismeretében)',
        value: 'T = √[s(s-a)(s-b)(s-c)]',
        figure: <HeronAndCirclesAreaSVG size={65} />
      },
      {
        id: 'tam1-5',
        prompt: 'Terület a beírt kör sugarával',
        value: 'T = r · s (ahol s = (a+b+c)/2 a félkerület)'
      },
      {
        id: 'tam1-6',
        prompt: 'Terület a körülírt kör sugarával',
        value: 'T = (a · b · c) / (4R)'
      }
    ]
  },
  2: {
    title: '2. Szint: Kifejezések és Méretek',
    subtitle: 'Párosítsd az ismeretlen mennyiségek kifejezéseit a megfelelő képlettel!',
    pairs: [
      {
        id: 'tam2-1',
        prompt: 'Magasság kifejezése a területből',
        value: 'm_a = (2 · T) / a'
      },
      {
        id: 'tam2-2',
        prompt: 'Beírt kör sugara a területből',
        value: 'r = T / s'
      },
      {
        id: 'tam2-3',
        prompt: 'Körülírt kör sugara a területből',
        value: 'R = (a · b · c) / (4 · T)'
      },
      {
        id: 'tam2-4',
        prompt: 'Szabályos háromszög magassága',
        value: 'm = (a · √3) / 2'
      },
      {
        id: 'tam2-5',
        prompt: 'Félkerület (s) definíciója',
        value: 's = (a + b + c) / 2 = K / 2'
      },
      {
        id: 'tam2-6',
        prompt: 'Derékszögű átfogóhoz tartozó magassága',
        value: 'm_c = (a · b) / c'
      }
    ]
  },
  3: {
    title: '3. Szint: Számításos Feladatok Konkrét Méretekkel',
    subtitle: 'Keresd meg a geometriai feladatok pontos numerikus végeredményét!',
    pairs: [
      {
        id: 'tam3-1',
        prompt: 'Alap a = 12 cm, magasság m_a = 5 cm. Mekkora a terület?',
        value: '30 cm² (mert 12 · 5 / 2 = 30 cm²)'
      },
      {
        id: 'tam3-2',
        prompt: 'Derékszögű befogók a = 6 cm és b = 8 cm. Mekkora a terület?',
        value: '24 cm² (mert 6 · 8 / 2 = 24 cm²)'
      },
      {
        id: 'tam3-3',
        prompt: 'Szabályos háromszög oldala a = 4 cm. Mennyi a területe?',
        value: '4√3 cm² ≈ 6.93 cm² (mert 4²√3 / 4 = 4√3 cm²)'
      },
      {
        id: 'tam3-4',
        prompt: 'Oldalak 13, 14, 15 cm (s = 21, T = 84 cm²). Mekkora a beírt kör sugara (r)?',
        value: '4 cm (mert r = T / s = 84 / 21 = 4 cm)'
      },
      {
        id: 'tam3-5',
        prompt: 'Terület T = 48 cm², alap a = 12 cm. Mekkora a magasság (m_a)?',
        value: '8 cm (mert m_a = 2 · 48 / 12 = 8 cm)'
      },
      {
        id: 'tam3-6',
        prompt: 'Derékszögű háromszög befogói 6 és 8 cm (c = 10 cm). Mennyi az m_c magasság?',
        value: '4.8 cm (mert m_c = 6 · 8 / 10 = 4.8 cm)'
      }
    ]
  }
};

export const TriangleAreaMatcher: React.FC<TriangleAreaMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Háromszögek kerülete és területe'
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
      themeColor="emerald"
      storageKey="grade9-triangle-area-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};

