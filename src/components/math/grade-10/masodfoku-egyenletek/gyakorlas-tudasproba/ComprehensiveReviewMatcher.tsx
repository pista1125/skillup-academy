import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ComprehensiveReviewMatcherProps {
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
    title: 'Egyenlettípus és a leggyorsabb megoldási stratégia',
    subtitle: 'Párosítsd a másodfokú egyenletet a legcélravezetőbb, leggyorsabb megoldási módszerrel!',
    pairs: [
      { id: 'crm1-1', left: '3x² - 12x = 0', right: 'Kiemelés: 3x(x - 4) = 0 ⟹ x₁=0, x₂=4' },
      { id: 'crm1-2', left: '2x² - 50 = 0', right: 'Közvetlen gyökvonás: x² = 25 ⟹ x = ±5' },
      { id: 'crm1-3', left: 'x² - 6x + 9 = 0', right: 'Azonosság felismerése: (x - 3)² = 0 ⟹ x = 3' },
      { id: 'crm1-4', left: '2x² - 7x + 3 = 0', right: 'Megoldóképlet alkalmazása: D = 49 - 24 = 25' },
      { id: 'crm1-5', left: 'x⁴ - 13x² + 36 = 0', right: 'Új ismeretlen bevezetése: u = x² (u ≥ 0)' },
      { id: 'crm1-6', left: '(x + 1)/(x - 2) = 4/x', right: 'Kikötés (x ≠ 0, 2), majd szorzás a közös nevezővel' },
      { id: 'crm1-7', left: 'x² + 9 = 0', right: 'Közvetlen vizsgálat: x² = -9 ⟹ nincs valós gyök' },
      { id: 'crm1-8', left: '4x² + 20x = 0', right: 'Kiemelés: 4x(x + 5) = 0 ⟹ x₁=0, x₂=-5' }
    ]
  },
  2: {
    title: 'Egyenlet, diszkrimináns és megoldáshalmaz',
    subtitle: 'Párosítsd az egyenletet a diszkrimináns értékével és a pontos gyökökkel!',
    pairs: [
      { id: 'crm2-1', left: 'x² - 7x + 10 = 0', right: 'D = 9 > 0 ⟹ gyökök: { 2; 5 }' },
      { id: 'crm2-2', left: 'x² + 4x + 4 = 0', right: 'D = 0 ⟹ egyetlen kettős gyök: x = -2' },
      { id: 'crm2-3', left: 'x² - 2x + 5 = 0', right: 'D = -16 < 0 ⟹ nincs valós gyök (∅)' },
      { id: 'crm2-4', left: '3x² - 5x - 2 = 0', right: 'D = 49 > 0 ⟹ gyökök: { 2; -1/3 }' },
      { id: 'crm2-5', left: 'x² - 8x + 16 = 0', right: 'D = 0 ⟹ egyetlen kettős gyök: x = 4' },
      { id: 'crm2-6', left: '2x² + 3x + 4 = 0', right: 'D = -23 < 0 ⟹ nincs valós megoldás (∅)' },
      { id: 'crm2-7', left: 'x² - 1 = 0', right: 'D = 4 > 0 ⟹ gyökök: { -1; 1 }' },
      { id: 'crm2-8', left: 'x² - 3x - 10 = 0', right: 'D = 49 > 0 ⟹ gyökök: { 5; -2 }' }
    ]
  },
  3: {
    title: 'Szöveges és visszavezethető problémák modellje',
    subtitle: 'Párosítsd a valós feladat szövegét a felállítandó matematikai egyenlettel!',
    pairs: [
      { id: 'crm3-1', left: 'Téglalap oldalai x és x + 4, területe 45', right: 'x(x + 4) = 45 (x > 0 kizárja a negatív gyököt)' },
      { id: 'crm3-2', left: 'Derékszögű háromszög befogói x és x + 7, átfogója 13', right: 'x² + (x + 7)² = 13² = 169' },
      { id: 'crm3-3', left: '60 km-es távon a gyorsabb vonat sebessége v + 20, ideje 1/2 órával kevesebb', right: '60/v - 60/(v + 20) = 0,5' },
      { id: 'crm3-4', left: 'Közös munka: A gép t óra alatt, B gép t + 3 óra alatt, együtt 2 óra alatt kész', right: '1/t + 1/(t + 3) = 1/2' },
      { id: 'crm3-5', left: 'Termék ára kétszer nőtt p%-kal, 100 Ft-ról 144 Ft-ra nőtt', right: '100 · (1 + p/100)² = 144' },
      { id: 'crm3-6', left: '60 000 Ft költséget n helyett n - 3 fő fizet, fejenként 1000 Ft-tal több', right: '60000/(n - 3) - 60000/n = 1000' },
      { id: 'crm3-7', left: 'Folyami hajó 24 km-t tesz meg oda-vissza, v_f = 2 km/h, összes idő 5 óra', right: '24/(v + 2) + 24/(v - 2) = 5' },
      { id: 'crm3-8', left: 'Biquadratikus: x⁴ - 10x² + 9 = 0 helyettesítéssel', right: 'u² - 10u + 9 = 0 és u = x² (u ≥ 0)' }
    ]
  }
};

export const ComprehensiveReviewMatcher: React.FC<ComprehensiveReviewMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-masodfoku-egyenletek',
  topicTitle = 'Gyakorlás, tudáspróba'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Gyakorlás és Tudáspróba Párosító"
      subtitle="Kösse össze az egyenleteket, modelleket és a megoldási szabályokat!"
      badge="Párosító Kihívás"
      color="violet"
    />
  );
};

