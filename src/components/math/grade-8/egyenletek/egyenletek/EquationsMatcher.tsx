import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alap Egyenletek és Szabályok',
    subtitle: 'Párosítsd az egyenleteket a megoldásukkal (gyökükkel) és a legfontosabb alapelvekkel!',
    pairs: [
      {
        id: 'p1',
        prompt: '3x = 6',
        value: 'x = 2'
      },
      {
        id: 'p2',
        prompt: 'x + 7 = 10',
        value: 'x = 3'
      },
      {
        id: 'p3',
        prompt: '2x - 1 = 7',
        value: 'x = 4'
      },
      {
        id: 'p4',
        prompt: 'x / 3 = 5',
        value: 'x = 15'
      },
      {
        id: 'p5',
        prompt: '12 - x = 4',
        value: 'x = 8'
      },
      {
        id: 'p6',
        prompt: '-2x = 12',
        value: 'x = -6'
      },
      {
        id: 'p7',
        prompt: '4x + 5 = 5',
        value: 'x = 0'
      },
      {
        id: 'p8',
        prompt: 'Mérlegelv alapszabálya',
        value: 'Mindkét oldalon azonos művelet'
      },
      {
        id: 'p9',
        prompt: 'Törtes egyenletnél kikötés',
        value: 'Nevező ≠ 0'
      },
      {
        id: 'p10',
        prompt: 'Nullával való osztás (: 0)',
        value: 'Szigorúan tilos!'
      }
    ]
  },
  2: {
    title: '2. Szint: Zárójelek, Törtek és Számolás',
    subtitle: 'Párosítsd a zárójeles, törtes egyenleteket a gyökükkel és az átalakítási szabályokkal!',
    pairs: [
      {
        id: 'p11',
        prompt: '2(x + 3) = 14',
        value: 'x = 4'
      },
      {
        id: 'p12',
        prompt: '3(x - 2) = 9',
        value: 'x = 5'
      },
      {
        id: 'p13',
        prompt: '-(x - 4) = 1',
        value: 'x = 3'
      },
      {
        id: 'p14',
        prompt: '(x + 2) / 3 = 4',
        value: 'x = 10'
      },
      {
        id: 'p15',
        prompt: '4x - x + 2 = 20',
        value: 'x = 6'
      },
      {
        id: 'p16',
        prompt: '5x - 7 = 2x + 14',
        value: 'x = 7'
      },
      {
        id: 'p17',
        prompt: 'Zárójelbontás: -(3x - 5)',
        value: '-3x + 5'
      },
      {
        id: 'p18',
        prompt: 'Zárójelbontás: -2(x - 4)',
        value: '-2x + 8'
      },
      {
        id: 'p19',
        prompt: 'Tört megszüntetése: x/2 + x/3',
        value: 'Szorzás LKKT-vel (· 6)'
      },
      {
        id: 'p20',
        prompt: 'Ellenőrzés menete',
        value: 'Behelyettesítés az eredetibe'
      }
    ]
  },
  3: {
    title: '3. Szint: Speciális Esetek és Összetett Feladatok',
    subtitle: 'Párosítsd az összetettebb egyenleteket, felvételi típusokat és a különleges kimeneteleket!',
    pairs: [
      {
        id: 'p21',
        prompt: '4(x - 1) = 2x + 12',
        value: 'x = 8'
      },
      {
        id: 'p22',
        prompt: '(2x + 1) / 3 = (x + 7) / 2',
        value: 'x = 19'
      },
      {
        id: 'p23',
        prompt: '|x - 2| = 7 negatív gyöke',
        value: 'x = -5'
      },
      {
        id: 'p24',
        prompt: 'Gondoltam egy számot: feléhez 5-öt adva 13',
        value: 'x = 16'
      },
      {
        id: 'p25',
        prompt: 'Két szomszédos egész összege 25',
        value: '12 és 13'
      },
      {
        id: 'p26',
        prompt: '0 · x = 0 egyenlet',
        value: 'Azonosság (Minden szám jó)'
      },
      {
        id: 'p27',
        prompt: '0 · x = 7 egyenlet',
        value: 'Ellentmondás (M = ∅)'
      },
      {
        id: 'p28',
        prompt: '(x - 4) / (x - 4) = 0',
        value: 'Hamis gyök (x = 4 tilos!)'
      },
      {
        id: 'p29',
        prompt: 'Mindkét oldal osztása x-szel (: x)',
        value: 'Gyökvesztést okozhat (ha x = 0)'
      },
      {
        id: 'p30',
        prompt: 'Mindkét oldal négyzetre emelése',
        value: 'Hamis gyök keletkezhet'
      }
    ]
  }
};

export const EquationsMatcher: React.FC<EquationsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-eq-basic-matcher',
  topicTitle = '1. Egyenletek Párosító'
}) => {
  return (
    <MatcherTemplate
      level={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="purple"
      badge="8. Osztály • III. Egyenletek"
      levels={matcherLevels}
    />
  );
};

export default EquationsMatcher;
