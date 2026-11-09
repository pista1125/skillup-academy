import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticeApplicationMatcherProps {
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
    title: 'Bekerítési feladatok és maximális terület',
    subtitle: 'Párosítsd a kordon típusát és hosszát a kialakuló maximális területtel!',
    pairs: [
      {
        id: 'pam1-1',
        prompt: 'K = 20 m (szabad 4 oldal)',
        value: 'Négyzet: 5×5 m, T = 25 m²'
      },
      {
        id: 'pam1-2',
        prompt: 'K = 20 m (1 fal mentén 3 oldal)',
        value: 'Téglalap: 5×10 m, T = 50 m²'
      },
      {
        id: 'pam1-3',
        prompt: 'K = 40 m (szabad 4 oldal)',
        value: 'Négyzet: 10×10 m, T = 100 m²'
      },
      {
        id: 'pam1-4',
        prompt: 'K = 40 m (1 fal mentén 3 oldal)',
        value: 'Téglalap: 10×20 m, T = 200 m²'
      },
      {
        id: 'pam1-5',
        prompt: 'K = 24 m (szabad 4 oldal)',
        value: 'Négyzet: 6×6 m, T = 36 m²'
      },
      {
        id: 'pam1-6',
        prompt: 'K = 24 m (1 fal mentén 3 oldal)',
        value: 'Téglalap: 6×12 m, T = 72 m²'
      },
      {
        id: 'pam1-7',
        prompt: 'K = 12 m (szabad 4 oldal)',
        value: 'Négyzet: 3×3 m, T = 9 m²'
      },
      {
        id: 'pam1-8',
        prompt: 'K = 12 m (1 fal mentén 3 oldal)',
        value: 'Téglalap: 3×6 m, T = 18 m²'
      }
    ]
  },
  2: {
    title: 'Hajítási és mozgásfüggvények szélsőértékei',
    subtitle: 'Párosítsd a magasságfüggvényeket a csúcspontjukkal és a maximális magasságukkal!',
    pairs: [
      {
        id: 'pam2-1',
        prompt: 'h(t) = -5t² + 10t + 40',
        value: 't = 1 s, h_max = 45 m'
      },
      {
        id: 'pam2-2',
        prompt: 'h(t) = -5t² + 20t',
        value: 't = 2 s, h_max = 20 m'
      },
      {
        id: 'pam2-3',
        prompt: 'h(t) = -5t² + 30t + 15',
        value: 't = 3 s, h_max = 60 m'
      },
      {
        id: 'pam2-4',
        prompt: 'h(t) = -5t² + 40t',
        value: 't = 4 s, h_max = 80 m'
      },
      {
        id: 'pam2-5',
        prompt: 'h(t) = -5t² + 10t',
        value: 't = 1 s, h_max = 5 m'
      },
      {
        id: 'pam2-6',
        prompt: 'm(t) = 1.5t² - 45t + 2100',
        value: 't = 15 év, min = 1762.5 kg'
      },
      {
        id: 'pam2-7',
        prompt: 'h(t) = -5t² + 20t + 25',
        value: 't = 2 s, h_max = 45 m'
      },
      {
        id: 'pam2-8',
        prompt: 'h(t) = -5t² + 60t',
        value: 't = 6 s, h_max = 180 m'
      }
    ]
  },
  3: {
    title: 'Grafikus egyenletek és egyenlőtlenségek',
    subtitle: 'Párosítsd a grafikus egyenleteket és egyenlőtlenségeket a pontos megoldáshalmazukkal!',
    pairs: [
      {
        id: 'pam3-1',
        prompt: '(x - 2)² - 1 = x - 1',
        value: 'Metszéspontok: x ∈ {1, 4}'
      },
      {
        id: 'pam3-2',
        prompt: '(x - 2)² - 1 ≤ x - 1',
        value: 'Alatta halad: x ∈ [1; 4]'
      },
      {
        id: 'pam3-3',
        prompt: '|x - 1| = 2',
        value: 'Vízszintes metszet: x ∈ {-1, 3}'
      },
      {
        id: 'pam3-4',
        prompt: '|x - 1| ≤ 2',
        value: 'Alatta halad: x ∈ [-1; 3]'
      },
      {
        id: 'pam3-5',
        prompt: 'x² - 4 = 0',
        value: 'Tengelymetszetek: x ∈ {-2, 2}'
      },
      {
        id: 'pam3-6',
        prompt: 'x² - 4 < 0',
        value: 'Tengely alatt: x ∈ ]-2; 2['
      },
      {
        id: 'pam3-7',
        prompt: '-(x - 3)² + 4 = 0',
        value: 'Tengelymetszetek: x ∈ {1, 5}'
      },
      {
        id: 'pam3-8',
        prompt: '-(x - 3)² + 4 > 0',
        value: 'Tengely felett: x ∈ ]1; 5['
      }
    ]
  }
};

export const PracticeApplicationMatcher: React.FC<PracticeApplicationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-transz-alkalmazas-matcher',
  topicTitle = 'Gyakorlás, alkalmazás - Párosító'
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
    />
  );
};

