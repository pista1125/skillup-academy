import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ParallelogramDissectionSvg,
  TrapezoidDissectionSvg,
  RhombusKiteAreaSvg
} from './AreaFigures';

interface AreaMatcherProps {
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
    title: '1. Szint: Alapvető Területképletek',
    subtitle: 'Párosítsd a nevezetes négyszögeket a megfelelő területképleteikkel!',
    pairs: [
      {
        id: 'am1-1',
        prompt: 'Téglalap területe',
        value: 'T = a · b (két szomszédos oldal szorzata)'
      },
      {
        id: 'am1-2',
        prompt: 'Paralelogramma területe',
        value: 'T = a · m_a = b · m_b (alap és a hozzá tartozó magasság szorzata)',
        figure: <ParallelogramDissectionSvg size={70} />
      },
      {
        id: 'am1-3',
        prompt: 'Trapéz területe',
        value: 'T = ((a + c) / 2) · m = k · m (középvonal és magasság szorzata)',
        figure: <TrapezoidDissectionSvg size={70} />
      },
      {
        id: 'am1-4',
        prompt: 'Rombusz és Deltoid területe',
        value: 'T = (e · f) / 2 (a két merőleges átló szorzatának a fele)',
        figure: <RhombusKiteAreaSvg size={70} />
      },
      {
        id: 'am1-5',
        prompt: 'Négyzet területe az átlóból',
        value: 'T = d² / 2 (az átló négyzetének a fele)'
      },
      {
        id: 'am1-6',
        prompt: 'Átdarabolás elve',
        value: 'Egybevágó részek áthelyezésével a terület nagysága változatlan marad'
      }
    ]
  },
  2: {
    title: '2. Szint: Számítási Példák és Eredmények',
    subtitle: 'Kösd össze az adott adatokból álló feladatokat a helyes kiszámított területtel!',
    pairs: [
      {
        id: 'am2-1',
        prompt: 'Paralelogramma: a = 10 cm, m_a = 6 cm',
        value: 'T = 60 cm² (10 · 6)'
      },
      {
        id: 'am2-2',
        prompt: 'Trapéz: a = 12 cm, c = 4 cm, m = 5 cm',
        value: 'T = 40 cm² (k = 8 cm, 8 · 5)'
      },
      {
        id: 'am2-3',
        prompt: 'Rombusz: e = 10 cm, f = 8 cm',
        value: 'T = 40 cm² ((10 · 8) / 2)'
      },
      {
        id: 'am2-4',
        prompt: 'Négyzet: átlója d = 6 cm',
        value: 'T = 18 cm² (6² / 2 = 36 / 2)'
      },
      {
        id: 'am2-5',
        prompt: 'Deltoid: e = 14 cm, f = 5 cm',
        value: 'T = 35 cm² ((14 · 5) / 2)'
      },
      {
        id: 'am2-6',
        prompt: 'Húrtrapéz: a = 10 cm, c = 4 cm, m = 4 cm',
        value: 'T = 28 cm² (7 · 4)'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Geometriai Összefüggések',
    subtitle: 'Párosítsd a geometriai összefüggéseket a pontos leírásukkal és képletükkel!',
    pairs: [
      {
        id: 'am3-1',
        prompt: 'Varignon-paralelogramma területe (T_V)',
        value: 'T_V = T / 2 (bármely négyszög esetén pontosan a terület fele)'
      },
      {
        id: 'am3-2',
        prompt: 'Húrtrapéz alapon levágott x szakasza',
        value: 'x = (a − c) / 2 (a szimmetria miatt a magasság által levágott vetület)'
      },
      {
        id: 'am3-3',
        prompt: 'Rombusz oldala az átlókból',
        value: 'a² = (e/2)² + (f/2)² (Pitagorasz-tétel a merőleges félátlókra)'
      },
      {
        id: 'am3-4',
        prompt: 'Rombusz magassága (m)',
        value: 'm = T / a = (e · f) / (2a)'
      },
      {
        id: 'am3-5',
        prompt: 'Trapéz szárain fekvő két háromszög',
        value: 'Területük szigorúan megegyezik minden trapézban: T₁ = T₂'
      },
      {
        id: 'am3-6',
        prompt: 'Hasonló négyszögek területaránya',
        value: 'T\' / T = λ² (a hasonlósági arány négyzete)'
      }
    ]
  }
};

export const AreaMatcher: React.FC<AreaMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-trans-terulet-matcher',
  topicTitle = '7. Nevezetes négyszögek területe'
}) => {
  return (
    <MatcherTemplate
      level={currentLevel || level}
      currentLevel={currentLevel || level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      grade={9}
      chapterId="egybevagosag-negyszogek"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={matcherLevels}
      levelConfigs={matcherLevels}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
    />
  );
};

(AreaMatcher as any).matcherLevels = matcherLevels;

