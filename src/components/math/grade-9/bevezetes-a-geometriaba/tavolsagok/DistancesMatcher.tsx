import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  PointLineDistanceSvg,
  ParallelDistanceSvg,
  LociSvg
} from './DistancesFigures';

interface DistancesMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Távolság-definíciók',
    subtitle: 'Párosítsd a távolságtípusokat a helyes geometriai definíciójukkal!',
    pairs: [
      {
        id: 'dm1-1',
        prompt: 'Pont és egyenes távolsága',
        value: 'A pontból az egyenesre bocsátott merőleges szakasz hossza',
        figure: <PointLineDistanceSvg size={65} />
      },
      {
        id: 'dm1-2',
        prompt: 'Két pont távolsága',
        value: 'Az őket összekötő szakasz hossza'
      },
      {
        id: 'dm1-3',
        prompt: 'Két párhuzamos egyenes távolsága',
        value: 'Közös merőleges szakaszuk hossza',
        figure: <ParallelDistanceSvg size={65} />
      },
      {
        id: 'dm1-4',
        prompt: 'Két ponttól egyenlő távol lévő pontok halmaza',
        value: 'A két pontot összekötő szakasz felezőmerőlegese'
      },
      {
        id: 'dm1-5',
        prompt: 'Adott ponttól r távolságra lévő síkbeli pontok',
        value: 'Az adott pont körüli r sugarú körvonal'
      },
      {
        id: 'dm1-6',
        prompt: 'A merőleges szakasz tulajdonsága',
        value: 'Mindig a legrövidebb összekötő szakasz'
      }
    ]
  },
  2: {
    title: '2. Szint: Nevezetes Mértani Helyek Párosítása',
    subtitle: 'Keresd meg a geometriai ponthalmazokhoz tartozó pontos feltételeket!',
    pairs: [
      {
        id: 'dm2-1',
        prompt: 'Két metsző egyenestől egyenlő távolságra lévő pontok',
        value: 'A szögfelező egyenesek párja (egymásra merőlegesek)',
        figure: <LociSvg size={65} />
      },
      {
        id: 'dm2-2',
        prompt: 'Két párhuzamos egyenestől egyenlő távolságra lévő pontok',
        value: 'A középpárhuzamos egyenes'
      },
      {
        id: 'dm2-3',
        prompt: 'Egy egyenestől adott d távolságra lévő pontok halmaza',
        value: 'Két darab, az egyenessel párhuzamos egyenes'
      },
      {
        id: 'dm2-4',
        prompt: 'A háromszög oldalfelező merőlegeseinek metszéspontja',
        value: 'A körülírt kör középpontja (mindhárom csúcstól egyenlő távol)'
      },
      {
        id: 'dm2-5',
        prompt: 'A háromszög belső szögfelezőinek metszéspontja',
        value: 'A beírt kör középpontja (mindhárom oldaltól egyenlő távol)'
      },
      {
        id: 'dm2-6',
        prompt: 'Egy pont koordinátái P(3; 4) távolsága az origótól',
        value: 'd = √(3² + 4²) = 5 egység'
      }
    ]
  },
  3: {
    title: '3. Szint: Számítások és Síkbeli Távolságok',
    subtitle: 'Párosítsd a geometriai konfigurációk pontos távolságértékeit!',
    pairs: [
      {
        id: 'dm3-1',
        prompt: 'P(2; 5) pont távolsága az x tengelytől (y = 0)',
        value: 'd = |5| = 5 egység'
      },
      {
        id: 'dm3-2',
        prompt: 'P(2; 5) pont távolsága az y tengelytől (x = 0)',
        value: 'd = |2| = 2 egység'
      },
      {
        id: 'dm3-3',
        prompt: 'y = 3 és y = 8 párhuzamos egyenesek távolsága',
        value: 'd = 8 - 3 = 5 egység'
      },
      {
        id: 'dm3-4',
        prompt: 'y = -2 és y = 6 egyenesek középpárhuzamosának egyenlete',
        value: 'y = (-2 + 6) / 2 = 2'
      },
      {
        id: 'dm3-5',
        prompt: 'r = 10 cm sugarú kör 12 cm-es húrjának távolsága a középponttól',
        value: 'd = √(10² - 6²) = 8 cm'
      },
      {
        id: 'dm3-6',
        prompt: 'A(1; 2) és B(4; 6) pontok távolsága',
        value: 'd = √((4-1)² + (6-2)²) = √(9 + 16) = 5 egység'
      }
    ]
  }
};

export const DistancesMatcher: React.FC<DistancesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Távolságok'
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
      themeColor="cyan"
      storageKey="grade9-distances-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};
