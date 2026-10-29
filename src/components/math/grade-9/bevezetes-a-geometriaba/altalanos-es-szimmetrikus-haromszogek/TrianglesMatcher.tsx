import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TriangleClassificationSvg,
  TriangleInequalitySvg,
  TriangleAnglesSvg,
  IsoscelesAndEquilateralSvg
} from './TrianglesFigures';

interface TrianglesMatcherProps {
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
    title: '1. Szint: Háromszögek Típusai és Alaptulajdonságaik',
    subtitle: 'Párosítsd a háromszögfajtákat a legfőbb geometriai jellemzőjükkel!',
    pairs: [
      {
        id: 'tm1-1',
        prompt: 'Szabályos háromszög',
        value: 'Minden szöge pontosan 60°',
        figure: <IsoscelesAndEquilateralSvg size={65} />
      },
      {
        id: 'tm1-2',
        prompt: 'Derékszögű háromszög',
        value: 'Két hegyesszögének összege 90°',
        figure: <TriangleClassificationSvg size={65} />
      },
      {
        id: 'tm1-3',
        prompt: 'Egyenlő szárú háromszög',
        value: 'Alapon fekvő belső szögei egyenlők'
      },
      {
        id: 'tm1-4',
        prompt: 'Tompaszögű háromszög',
        value: 'Pontosan egy 90°-nál nagyobb szöge van'
      },
      {
        id: 'tm1-5',
        prompt: 'Hegyesszögű háromszög',
        value: 'Mindhárom belső szöge kisebb, mint 90°'
      },
      {
        id: 'tm1-6',
        prompt: 'Általános háromszög',
        value: 'Mindhárom oldala különböző hosszúságú'
      }
    ]
  },
  2: {
    title: '2. Szint: Belső Szögek Kiszámítása (Összeg = 180°)',
    subtitle: 'Két belső szög ismeretében keresd meg a harmadik belső szög nagyságát!',
    pairs: [
      {
        id: 'tm2-1',
        prompt: '50° és 60° mellett',
        value: '70°',
        figure: <TriangleAnglesSvg size={65} />
      },
      {
        id: 'tm2-2',
        prompt: '45° és 45° mellett',
        value: '90° (derékszög)'
      },
      {
        id: 'tm2-3',
        prompt: '30° és 40° mellett',
        value: '110° (tompaszög)'
      },
      {
        id: 'tm2-4',
        prompt: '60° és 60° mellett',
        value: '60° (szabályos)'
      },
      {
        id: 'tm2-5',
        prompt: '25° és 75° mellett',
        value: '80°'
      },
      {
        id: 'tm2-6',
        prompt: '20° és 130° mellett',
        value: '30°'
      }
    ]
  },
  3: {
    title: '3. Szint: Háromszög-egyenlőtlenség és Szerkeszthetőség',
    subtitle: 'Párosítsd a három oldalhosszt a szerkeszthetőségi besorolásával!',
    pairs: [
      {
        id: 'tm3-1',
        prompt: '3 cm, 4 cm, 5 cm',
        value: 'Szerkeszthető derékszögű háromszög',
        figure: <TriangleInequalitySvg size={65} />
      },
      {
        id: 'tm3-2',
        prompt: '5 cm, 5 cm, 8 cm',
        value: 'Szerkeszthető egyenlő szárú háromszög'
      },
      {
        id: 'tm3-3',
        prompt: '2 cm, 3 cm, 6 cm',
        value: 'Nem létezik (2 + 3 < 6)'
      },
      {
        id: 'tm3-4',
        prompt: '4 cm, 4 cm, 8 cm',
        value: 'Nem létezik (4 + 4 = 8, elfajuló)'
      },
      {
        id: 'tm3-5',
        prompt: '6 cm, 6 cm, 6 cm',
        value: 'Szerkeszthető szabályos háromszög'
      },
      {
        id: 'tm3-6',
        prompt: '7 cm, 9 cm, 13 cm',
        value: 'Szerkeszthető általános háromszög'
      }
    ]
  }
};

export const TrianglesMatcher: React.FC<TrianglesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Általános és szimmetrikus háromszögek'
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
      storageKey="grade9-triangles-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};

