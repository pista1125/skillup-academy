import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TeamChallengeRelaySvg,
  ErrorHuntStepAnalysisSvg,
  SpeedVieteDuelSvg,
  SignChartSprintSvg,
  ScoreboardTournamentSvg
} from './GroupCompetitionFigures';

interface GroupCompetitionMatcherProps {
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
    title: 'Villámfeladványok: Egyenlet és valós gyökök',
    subtitle: 'Párosítsd a másodfokú és hiányos egyenleteket a pontos gyökeikkel fejben!',
    pairs: [
      {
        id: 'gcm1-1',
        prompt: 'x² - 10x + 21 = 0',
        promptFigure: <SpeedVieteDuelSvg size={42} />,
        value: 'x₁ = 3, x₂ = 7 (szorzat 21, összeg 10)'
      },
      {
        id: 'gcm1-2',
        prompt: 'x² + 4x - 12 = 0',
        value: 'x₁ = -6, x₂ = 2 (szorzat -12, összeg -4)'
      },
      {
        id: 'gcm1-3',
        prompt: '2x² - 8 = 0',
        value: 'x₁ = -2, x₂ = 2 (hiányos: x² = 4)'
      },
      {
        id: 'gcm1-4',
        prompt: '3x² + 15x = 0',
        value: 'x₁ = -5, x₂ = 0 (kiemelés: 3x(x + 5) = 0)'
      },
      {
        id: 'gcm1-5',
        prompt: 'x² - 6x + 9 = 0',
        value: 'x = 3 (kétszeres gyök: (x - 3)² = 0)'
      },
      {
        id: 'gcm1-6',
        prompt: 'x² + 25 = 0',
        value: 'Nincs valós megoldás (x² = -25 lehetetlen)'
      },
      {
        id: 'gcm1-7',
        prompt: 'x² - 5x = 14',
        value: 'x₁ = -2, x₂ = 7 (átrendezve: x² - 5x - 14 = 0)'
      },
      {
        id: 'gcm1-8',
        prompt: 'x² - 100 = 0',
        value: 'x₁ = -10, x₂ = 10 ((x - 10)(x + 10) = 0)'
      }
    ]
  },
  2: {
    title: 'Detektív kihívás: Hibakeresés és leleplezés',
    subtitle: 'Párosítsd az elrontott levezetést a pontos hiba típusával és okával!',
    pairs: [
      {
        id: 'gcm2-1',
        prompt: '√(x + 2) = -3 levezetése x = 7 eredménnyel',
        promptFigure: <ErrorHuntStepAnalysisSvg size={42} />,
        value: 'Hamis gyök: négyzetgyök értéke nem lehet negatív (√9 = 3 ≠ -3)'
      },
      {
        id: 'gcm2-2',
        prompt: 'x² = 7x mindkét oldalának leosztása x-szel',
        value: 'Gyökvesztés: az x = 0 gyök eltűnt az ismeretlennel osztás miatt'
      },
      {
        id: 'gcm2-3',
        prompt: '-2x < 10 megoldása mint x < -5',
        value: 'Előjelhiba: negatívval osztva a relációjel megfordul (x > -5)'
      },
      {
        id: 'gcm2-4',
        prompt: '(x - 3)/(x - 3) = 1 megoldása mint x ∈ ℝ',
        value: 'Kikötés hiánya: x ≠ 3, mert a nevező nem lehet 0'
      },
      {
        id: 'gcm2-5',
        prompt: '(x - 1)(x - 4) > 0 megoldása mint 1 < x < 4',
        value: 'Téves intervallum: a parabola a gyökökön kívül pozitív (x < 1 vagy x > 4)'
      },
      {
        id: 'gcm2-6',
        prompt: '√(2x - 6) értelmezési tartománya valós számokon',
        value: 'Gyök alatti kikötés: 2x - 6 ≥ 0, azaz x ≥ 3'
      },
      {
        id: 'gcm2-7',
        prompt: 'x² + 4 = 0 megoldása mint x = ±2',
        value: 'Negatív szám négyzete: x² = -4 nem lehetséges a valós számok halmazán'
      },
      {
        id: 'gcm2-8',
        prompt: '(x + 2)/(x - 1) ≤ 0 megoldása mint [-2; 1] zárt intervallum',
        value: 'Nevező zárt zárójele hibás: x = 1 nem tartozhat a megoldáshoz ([-2; 1[)'
      }
    ]
  },
  3: {
    title: 'Bajnokok ligája: Összetett egyenletek és egyenlőtlenségek',
    subtitle: 'Párosítsd az algebrai kifejezéseket és egyenleteket a pontos megoldáshalmazukkal!',
    pairs: [
      {
        id: 'gcm3-1',
        prompt: '|2x - 4| = 6',
        promptFigure: <ScoreboardTournamentSvg size={42} />,
        value: 'x₁ = -1 és x₂ = 5 (2x - 4 = 6 vagy 2x - 4 = -6)'
      },
      {
        id: 'gcm3-2',
        prompt: '|x + 3| < 2',
        value: '-5 < x < -1 (távolság a -3-tól kisebb 2-nél)'
      },
      {
        id: 'gcm3-3',
        prompt: '(x - 1)²(x + 4) ≤ 0',
        value: 'x ≤ -4 vagy x = 1 (a négyzetes tag nemnegatív, 1-nél külön pont)'
      },
      {
        id: 'gcm3-4',
        prompt: '(x² - 4)/(x + 2) = 0',
        value: 'Csak x = 2 (x = -2 esetén a nevező 0 lenne, ezért kizárva)'
      },
      {
        id: 'gcm3-5',
        prompt: 'x + 6/x = 5  (x ≠ 0)',
        value: 'x₁ = 2 és x₂ = 3 (átrendezve: x² - 5x + 6 = 0)'
      },
      {
        id: 'gcm3-6',
        prompt: 'x² - 6x + k = 0 pontosan egy valós gyökkel rendelkezik',
        value: 'k = 9 (mert a diszkrimináns D = 36 - 4k = 0)'
      },
      {
        id: 'gcm3-7',
        prompt: '2x² - 7x + 3 = 0 gyökei',
        value: 'x₁ = 1/2 és x₂ = 3 ((2x - 1)(x - 3) = 0)'
      },
      {
        id: 'gcm3-8',
        prompt: 'x² - (k + 1)x + k = 0 gyökei k paraméter esetén',
        value: 'x₁ = 1 és x₂ = k bármely valós k paraméterre'
      }
    ]
  }
};

export const GroupCompetitionMatcher: React.FC<GroupCompetitionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-eq-csoportverseny-matcher',
  topicTitle = '8. Csoportverseny'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <MatcherTemplate
      level={activeLevel}
      levelConfigs={matcherLevels}
      themeColor="pink"
      topicId={topicId}
      topicTitle={topicTitle}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

