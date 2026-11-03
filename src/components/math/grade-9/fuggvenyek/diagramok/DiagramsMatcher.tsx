import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  BarChartSvg,
  PieChartSvg,
  LineChartSvg
} from './DiagramsFigures';

interface DiagramsMatcherProps {
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
    title: '1. Szint: Diagramtípusok és Fő Jellemzőik',
    subtitle: 'Párosítsd a diagramfajtákat a legjellemzőbb matematikai céljukkal!',
    pairs: [
      {
        id: 'dm1-1',
        prompt: 'Oszlopdiagram',
        value: 'Különálló kategóriák összehasonlítása',
        figure: <BarChartSvg size={70} />
      },
      {
        id: 'dm1-2',
        prompt: 'Kördiagram',
        value: 'Rész-egész arányok (100% ➔ 360°)',
        figure: <PieChartSvg size={70} />
      },
      {
        id: 'dm1-3',
        prompt: 'Vonaldiagram',
        value: 'Időbeli változások és trendek',
        figure: <LineChartSvg size={70} />
      },
      {
        id: 'dm1-4',
        prompt: 'Sávdiagram',
        value: 'Hosszú feliratú kategóriák vízszintesen'
      },
      {
        id: 'dm1-5',
        prompt: 'Függőleges tengely skálája',
        value: '0-ról indul az aránytartáshoz'
      },
      {
        id: 'dm1-6',
        prompt: 'Gyakorisági poligon',
        value: 'Oszloptetők felezőpontjainak összekötése'
      }
    ]
  },
  2: {
    title: '2. Szint: Százalék és Kördiagram Középponti Szögek',
    subtitle: 'Párosítsd a százalékos részesedéseket a megfelelő fokos szektorszöggel!',
    pairs: [
      {
        id: 'dm2-1',
        prompt: '50% (félkör)',
        value: '180°'
      },
      {
        id: 'dm2-2',
        prompt: '25% (negyedkör)',
        value: '90°'
      },
      {
        id: 'dm2-3',
        prompt: '10% részesedés',
        value: '36°'
      },
      {
        id: 'dm2-4',
        prompt: '40% részesedés',
        value: '144°'
      },
      {
        id: 'dm2-5',
        prompt: '12,5% (egynyolcad rész)',
        value: '45°'
      },
      {
        id: 'dm2-6',
        prompt: '1% részesedés',
        value: '3,6°'
      }
    ]
  },
  3: {
    title: '3. Szint: Kritikus Elemzés és Megtévesztő Diagramok',
    subtitle: 'Párosítsd a diagramhibákat a következményükkel!',
    pairs: [
      {
        id: 'dm3-1',
        prompt: 'Csonkolt tengely (nem 0-ról indul)',
        value: 'Kis különbség hatalmasnak tűnik'
      },
      {
        id: 'dm3-2',
        prompt: '3D döntött tortadiagram',
        value: 'Az elülső körcikk nagyobbnak látszik'
      },
      {
        id: 'dm3-3',
        prompt: 'Piktogram hossz és magasság duplázása',
        value: 'Négyszeres területnövekedés'
      },
      {
        id: 'dm3-4',
        prompt: 'Egyenlőtlen időközök az X tengelyen',
        value: 'Eltorzult meredekség és trend'
      },
      {
        id: 'dm3-5',
        prompt: 'Vonaldiagram negatív meredeksége',
        value: 'Csökkenő tendencia az időben'
      },
      {
        id: 'dm3-6',
        prompt: 'Kördiagram szögösszege 370°',
        value: 'Hibás megszerkesztés (≠ 360°)'
      }
    ]
  }
};

export const DiagramsMatcher: React.FC<DiagramsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-func-diagramok-matcher',
  topicTitle = '2. Diagramok'
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
      grade={9}
      chapterId="fuggvenyek"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={matcherLevels}
    />
  );
};

