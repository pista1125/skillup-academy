import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TransformationsOverviewSvg,
  PolygonDiagonalsAnglesSvg
} from './SummaryFigures';

interface SummaryMatcherProps {
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
    title: '1. Szint: Transzformációk Alaptulajdonságai',
    subtitle: 'Párosítsd az egybevágóságokat a fixpontjaikkal és iránytartásukkal!',
    pairs: [
      {
        id: 'sm1-1',
        prompt: 'Tengelyes tükrözés',
        value: 'Irányváltó, fixpontjai a tengely pontjai',
        figure: <TransformationsOverviewSvg size={70} />
      },
      {
        id: 'sm1-2',
        prompt: 'Középpontos tükrözés',
        value: 'Iránytartó, egyetlen fixpontja az O pont (180°-os síkbeli forgatás)'
      },
      {
        id: 'sm1-3',
        prompt: 'Párhuzamos eltolás (v ≠ 0)',
        value: 'Iránytartó, nincs egyetlen fixpontja sem a síkban'
      },
      {
        id: 'sm1-4',
        prompt: 'Forgatás (0° < α < 360°)',
        value: 'Iránytartó, egyetlen fixpontja az O forgáscentrum'
      },
      {
        id: 'sm1-5',
        prompt: 'Csúsztatva tükrözés',
        value: 'Irányváltó, tengelyes tükrözés és azzal párhuzamos eltolás kompozíciója'
      },
      {
        id: 'sm1-6',
        prompt: 'Kétszeri tükrözés ugyanarra a tengelyre',
        value: 'Identitás (helybenhagyás: minden pont az eredeti helyén marad)'
      }
    ]
  },
  2: {
    title: '2. Szint: Sokszögek Átlói és Szögei',
    subtitle: 'Kösd össze az oldalszámot a belső szögösszeggel és az átlók számával!',
    pairs: [
      {
        id: 'sm2-1',
        prompt: 'Háromszög (n = 3)',
        value: 'Belső szögek összege 180°, átlók száma 0',
        figure: <PolygonDiagonalsAnglesSvg size={70} />
      },
      {
        id: 'sm2-2',
        prompt: 'Négyszög (n = 4)',
        value: 'Belső szögek összege 360°, átlók száma 2'
      },
      {
        id: 'sm2-3',
        prompt: 'Ötszög (n = 5)',
        value: 'Belső szögek összege 540°, átlók száma 5 (ötágú csillag)'
      },
      {
        id: 'sm2-4',
        prompt: 'Hatszög (n = 6)',
        value: 'Belső szögek összege 720°, átlók száma 9'
      },
      {
        id: 'sm2-5',
        prompt: 'Nyolcszög (n = 8)',
        value: 'Belső szögek összege 1080°, átlók száma 20'
      },
      {
        id: 'sm2-6',
        prompt: 'Tízszög (n = 10)',
        value: 'Belső szögek összege 1440°, átlók száma 35'
      }
    ]
  },
  3: {
    title: '3. Szint: Érettségi Típusfeladatok és Eredmények',
    subtitle: 'Párosítsd a vizsgafeladatokat a helyes geometriai végeredményekkel!',
    pairs: [
      {
        id: 'sm3-1',
        prompt: 'Húrtrapéz: a = 18, c = 8, b = 13',
        value: 'Magassága m = 12 cm, Területe T = 156 cm² (x = 5 cm)'
      },
      {
        id: 'sm3-2',
        prompt: 'Rombusz: e = 12 cm, f = 16 cm',
        value: 'Oldala a = 10 cm, Területe T = 96 cm² (magassága m = 9,6 cm)'
      },
      {
        id: 'sm3-3',
        prompt: 'Deltoid: e = 10 cm, f = 6 cm',
        value: 'Területe T = 30 cm² (átlók szorzatának fele)'
      },
      {
        id: 'sm3-4',
        prompt: 'Négyzet: d = 10 cm átlóval',
        value: 'Területe T = 50 cm² (d² / 2 = 100 / 2)'
      },
      {
        id: 'sm3-5',
        prompt: 'Két párhuzamos tengelyre tükrözés (d = 5 cm)',
        value: '10 cm nagyságú merőleges eltolással egyenértékű'
      },
      {
        id: 'sm3-6',
        prompt: 'Varignon-tétel konvex négyszögre',
        value: 'Az oldalfelezők által bezárt terület pontosan T / 2'
      }
    ]
  }
};

export const SummaryMatcher: React.FC<SummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-trans-osszefoglalas-matcher',
  topicTitle = '8. Gyakorlás, tudáspróba'
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

(SummaryMatcher as any).matcherLevels = matcherLevels;

