import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CirclePartsSvg,
  LineCirclePositionsSvg,
  TangentSegmentsSvg
} from './CircleFigures';

interface CircleMatcherProps {
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
    title: '1. Szint: A Kör Részei és Alapfogalmak',
    subtitle: 'Párosítsd a kör geometriai elemeit a helyes definíciójukkal!',
    pairs: [
      {
        id: 'cm1-1',
        prompt: 'Átmérő (d)',
        value: 'A kör leghosszabb húrja (d = 2r)',
        figure: <CirclePartsSvg size={65} />
      },
      {
        id: 'cm1-2',
        prompt: 'Húr',
        value: 'A körvonal két tetszőleges pontját összekötő szakasz'
      },
      {
        id: 'cm1-3',
        prompt: 'Körcikk',
        value: 'Két sugár és egy körív által határolt síkrész'
      },
      {
        id: 'cm1-4',
        prompt: 'Körszelet',
        value: 'Egy húr és egy körív által határolt síkrész'
      },
      {
        id: 'cm1-5',
        prompt: 'Érintő egyenes',
        value: 'Pontosan 1 közös pontja van a körrel (d = r)',
        figure: <LineCirclePositionsSvg size={65} />
      },
      {
        id: 'cm1-6',
        prompt: 'Szelő egyenes',
        value: 'Pontosan 2 pontban metszi a kört (d < r)'
      }
    ]
  },
  2: {
    title: '2. Szint: Érintők és Számítások',
    subtitle: 'Keresd meg az érintőhöz és a húrokhoz kapcsolódó képleteket és értékeket!',
    pairs: [
      {
        id: 'cm2-1',
        prompt: 'Érintési sugár és érintő kapcsolata',
        value: 'Mindig egymásra merőlegesek (OE ⊥ e)'
      },
      {
        id: 'cm2-2',
        prompt: 'Külső pontból húzott érintőszakaszok',
        value: 'Egyenlő hosszúak: |PE₁| = |PE₂|',
        figure: <TangentSegmentsSvg size={65} />
      },
      {
        id: 'cm2-3',
        prompt: 'r = 5 cm, P távolsága a középponttól d = 13 cm',
        value: 'Érintőszakasz hossza: e = √(13² - 5²) = 12 cm'
      },
      {
        id: 'cm2-4',
        prompt: 'r = 10 cm, húr távolsága d = 6 cm',
        value: 'Húr hossza: h = 2 · √(10² - 6²) = 16 cm'
      },
      {
        id: 'cm2-5',
        prompt: 'Érintőnégyszög szemközti oldalai',
        value: 'a + c = b + d (összegük egyenlő)'
      },
      {
        id: 'cm2-6',
        prompt: 'Két kívülről érintkező kör középpontjainak távolsága',
        value: 'd = r₁ + r₂'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Geometriai és Számításos Feladatok',
    subtitle: 'Párosítsd a haladó érintő- és húrfeladatokat a megoldásaikkal!',
    pairs: [
      {
        id: 'cm3-1',
        prompt: 'r = 8 cm, a húr hossza 16 cm',
        value: 'A húr átmérő, távolsága a középponttól d = 0'
      },
      {
        id: 'cm3-2',
        prompt: 'Két koncentrikus kör sugara 10 cm és 6 cm',
        value: 'A belső kör érintőjéből kimetszett húrhossz: 2 · √(10² - 6²) = 16 cm'
      },
      {
        id: 'cm3-3',
        prompt: 'Érintőnégyszög oldalai: a = 5 cm, b = 8 cm, c = 11 cm',
        value: 'd = 5 + 11 - 8 = 8 cm (húrtrapéz/deltoid)'
      },
      {
        id: 'cm3-4',
        prompt: 'P pontból húzott érintők 60°-os szöget zárnak be',
        value: 'Az O, E₁, P, E₂ deltoid O-nál lévő szöge 120°'
      },
      {
        id: 'cm3-5',
        prompt: 'P pontból húzott érintők 90°-os szöget zárnak be',
        value: 'Az OE₁PE₂ négyszög négyzet, |OP| = r√2'
      },
      {
        id: 'cm3-6',
        prompt: 'Két belülről érintkező kör középponti távolsága',
        value: 'd = |r₁ - r₂|'
      }
    ]
  }
};

export const CircleMatcher: React.FC<CircleMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'A kör'
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
      themeColor="rose"
      storageKey="grade9-circle-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};

