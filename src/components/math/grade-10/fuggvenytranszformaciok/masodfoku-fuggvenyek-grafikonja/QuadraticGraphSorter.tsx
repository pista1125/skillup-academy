import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface QuadraticGraphSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Zérushelyek száma a valós számok halmazán',
    subtitle: 'Válogasd szét a másodfokú függvényeket aszerint, hogy hány pontban találkoznak az x-tengellyel!',
    categories: [
      {
        id: 'two-roots',
        name: '2 zérushely (metszi a tengelyt)',
        color: 'blue',
        description: 'A parabola két pontban metszi az x-tengelyt (D > 0)'
      },
      {
        id: 'one-root',
        name: '1 zérushely (érinti a tengelyt)',
        color: 'emerald',
        description: 'A csúcspont pontosan a tengelyre esik: v = 0 (D = 0)'
      },
      {
        id: 'zero-roots',
        name: 'Nincs zérushely (lebeg)',
        color: 'rose',
        description: 'A grafikon nem éri el az x-tengelyt (D < 0)'
      }
    ],
    items: [
      { id: 'qgs1-1', text: 'f(x) = (x - 2)² - 4', categoryId: 'two-roots' },
      { id: 'qgs1-2', text: 'f(x) = -(x + 1)² + 9', categoryId: 'two-roots' },
      { id: 'qgs1-3', text: 'f(x) = x² - 6x', categoryId: 'two-roots' },
      { id: 'qgs1-4', text: 'f(x) = 2x² - 8', categoryId: 'two-roots' },

      { id: 'qgs1-5', text: 'f(x) = (x - 3)²', categoryId: 'one-root' },
      { id: 'qgs1-6', text: 'f(x) = -(x + 5)²', categoryId: 'one-root' },
      { id: 'qgs1-7', text: 'f(x) = x² - 4x + 4', categoryId: 'one-root' },
      { id: 'qgs1-8', text: 'f(x) = 2(x + 1)²', categoryId: 'one-root' },

      { id: 'qgs1-9', text: 'f(x) = (x - 1)² + 3', categoryId: 'zero-roots' },
      { id: 'qgs1-10', text: 'f(x) = -(x + 2)² - 5', categoryId: 'zero-roots' },
      { id: 'qgs1-11', text: 'f(x) = x² + 4', categoryId: 'zero-roots' },
      { id: 'qgs1-12', text: 'f(x) = -2(x - 3)² - 1', categoryId: 'zero-roots' }
    ]
  },
  2: {
    title: 'A szimmetriatengely elhelyezkedése (u)',
    subtitle: 'Válogasd szét a függvényeket a szimmetriatengelyük (x = u) pozíciója szerint!',
    categories: [
      {
        id: 'axis-left',
        name: 'Balra tolódott (u < 0)',
        color: 'indigo',
        description: 'A szimmetriatengely az origótól balra helyezkedik el'
      },
      {
        id: 'axis-center',
        name: 'Az y-tengely (u = 0)',
        color: 'emerald',
        description: 'Tengelyesen szimmetrikus az y-tengelyre, páros függvény'
      },
      {
        id: 'axis-right',
        name: 'Jobbra tolódott (u > 0)',
        color: 'purple',
        description: 'A szimmetriatengely az origótól jobbra helyezkedik el'
      }
    ],
    items: [
      { id: 'qgs2-1', text: 'f(x) = x² + 6x + 2', categoryId: 'axis-left' },
      { id: 'qgs2-2', text: 'f(x) = 2(x + 4)² - 1', categoryId: 'axis-left' },
      { id: 'qgs2-3', text: 'f(x) = -x² - 2x + 5', categoryId: 'axis-left' },
      { id: 'qgs2-4', text: 'g(x) = x² + 8x', categoryId: 'axis-left' },

      { id: 'qgs2-5', text: 'f(x) = x² - 7', categoryId: 'axis-center' },
      { id: 'qgs2-6', text: 'f(x) = -3x² + 5', categoryId: 'axis-center' },
      { id: 'qgs2-7', text: 'f(x) = 0.5x²', categoryId: 'axis-center' },
      { id: 'qgs2-8', text: 'f(x) = -x² - 4', categoryId: 'axis-center' },

      { id: 'qgs2-9', text: 'f(x) = x² - 8x + 1', categoryId: 'axis-right' },
      { id: 'qgs2-10', text: 'f(x) = -(x - 5)² + 2', categoryId: 'axis-right' },
      { id: 'qgs2-11', text: 'f(x) = 2x² - 4x', categoryId: 'axis-right' },
      { id: 'qgs2-12', text: 'g(x) = -x² + 6x', categoryId: 'axis-right' }
    ]
  },
  3: {
    title: 'A függvény előjele és értékkészlete',
    subtitle: 'Csoportosítsd a függvényeket aszerint, hogy milyen előjelű értékeket vehetnek fel!',
    categories: [
      {
        id: 'non-negative',
        name: 'Mindig nemnegatív (f(x) ≥ 0)',
        color: 'emerald',
        description: 'A grafikon soha nem megy az x-tengely alá'
      },
      {
        id: 'non-positive',
        name: 'Mindig nempozitív (f(x) ≤ 0)',
        color: 'rose',
        description: 'A grafikon soha nem emelkedik az x-tengely fölé'
      },
      {
        id: 'sign-changes',
        name: 'Előjelet vált (pozitív és negatív is)',
        color: 'amber',
        description: 'Átmegy a tengelyen, vannak pozitív és negatív értékei is'
      }
    ],
    items: [
      { id: 'qgs3-1', text: 'f(x) = (x - 2)²', categoryId: 'non-negative' },
      { id: 'qgs3-2', text: 'f(x) = x² + 3', categoryId: 'non-negative' },
      { id: 'qgs3-3', text: 'f(x) = 2(x + 1)² + 5', categoryId: 'non-negative' },
      { id: 'qgs3-4', text: 'f(x) = 0.5x² + 1', categoryId: 'non-negative' },

      { id: 'qgs3-5', text: 'f(x) = -(x + 4)²', categoryId: 'non-positive' },
      { id: 'qgs3-6', text: 'f(x) = -x² - 2', categoryId: 'non-positive' },
      { id: 'qgs3-7', text: 'f(x) = -3(x - 1)² - 4', categoryId: 'non-positive' },
      { id: 'qgs3-8', text: 'f(x) = -(x - 5)²', categoryId: 'non-positive' },

      { id: 'qgs3-9', text: 'f(x) = x² - 4', categoryId: 'sign-changes' },
      { id: 'qgs3-10', text: 'f(x) = -(x - 2)² + 9', categoryId: 'sign-changes' },
      { id: 'qgs3-11', text: 'f(x) = 2x² - 8x', categoryId: 'sign-changes' },
      { id: 'qgs3-12', text: 'f(x) = -x² + 1', categoryId: 'sign-changes' }
    ]
  }
};

export const QuadraticGraphSorter: React.FC<QuadraticGraphSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-transz-masodfoku-grafikon-sorter',
  topicTitle = 'Másodfokú függvények grafikonja - Csoportosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

