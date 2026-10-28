import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LinearSystemsSorterProps {
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
    title: '1. Szint: Legcélszerűbb Megoldási Módszer',
    subtitle: 'Melyik algebrai módszert érdemes választani a rendszer felépítése alapján?',
    categories: [
      {
        id: 'cat-subst',
        name: 'Behelyettesítő módszer',
        description: 'Van olyan ismeretlen, amelynek együtthatója 1 vagy -1',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      },
      {
        id: 'cat-elim',
        name: 'Egyenlő együtthatók (Kiküszöbölés)',
        description: 'Ellentett vagy azonos együtthatók vannak x-re/y-ra',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-prep',
        name: 'Rendezés / Törtek eltüntetése először',
        description: 'Zárójelek vagy nevezők szerepelnek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Behelyettesítés
      { id: 'ls1-1', label: 'x = 3y + 4 és 2x - y = 10', category: 'cat-subst' },
      { id: 'ls1-2', label: 'y = 5 - 2x és 3x + 4y = 12', category: 'cat-subst' },
      { id: 'ls1-3', label: 'x + 2y = 8 és 3x - 5y = 1', category: 'cat-subst' },
      { id: 'ls1-4', label: '2x - y = 7 és 4x + 3y = 21', category: 'cat-subst' },
      // Egyenlő együtthatók
      { id: 'ls1-5', label: '3x + 2y = 19 és 2x - 2y = 6', category: 'cat-elim' },
      { id: 'ls1-6', label: '4x + 3y = 25 és 4x - 5y = 1', category: 'cat-elim' },
      { id: 'ls1-7', label: '2x + 5y = 20 és 3x - 5y = 5', category: 'cat-elim' },
      { id: 'ls1-8', label: '3x + 4y = 18 és 5x + 6y = 28', category: 'cat-elim' },
      // Előkészítés
      { id: 'ls1-9', label: '2(x + y) - 3 = 4x és y + 1 = 2(x - 3)', category: 'cat-prep' },
      { id: 'ls1-10', label: 'x/2 + y/3 = 5 és x/4 - y/6 = 1', category: 'cat-prep' },
      { id: 'ls1-11', label: '3(x - 2) + 4y = 10 és 2(x + 1) - y = 5', category: 'cat-prep' },
      { id: 'ls1-12', label: '(x + y)/3 = 4 és (x - y)/2 = 1', category: 'cat-prep' }
    ]
  },
  2: {
    title: '2. Szint: Megoldások Száma és Geometriai Helyzet',
    subtitle: 'Határozd meg a rendszer megoldáshalmazát a két egyenes helyzete alapján!',
    categories: [
      {
        id: 'cat-one-solution',
        name: 'Pontosan 1 számpár (Metsző egyenesek)',
        description: 'Az együtthatók aránya nem egyezik meg',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-no-solution',
        name: 'Nincs megoldás (Párhuzamos, M = ∅)',
        description: 'x és y aránya azonos, de a konstans nem',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-infinite-solutions',
        name: 'Végtelen sok (Egybeeső egyenesek)',
        description: 'Az egyenletek egymás számszorosai',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // 1 megoldás
      { id: 'ls2-1', label: 'x + y = 6 és x - y = 2', category: 'cat-one-solution' },
      { id: 'ls2-2', label: '2x + y = 10 és x - 3y = -2', category: 'cat-one-solution' },
      { id: 'ls2-3', label: '3x + 2y = 12 és x + y = 5', category: 'cat-one-solution' },
      { id: 'ls2-4', label: '4x - y = 7 és 2x + 3y = 14', category: 'cat-one-solution' },
      // Nincs megoldás
      { id: 'ls2-5', label: 'x + y = 5 és x + y = 9', category: 'cat-no-solution' },
      { id: 'ls2-6', label: '2x + 4y = 12 és x + 2y = 8', category: 'cat-no-solution' },
      { id: 'ls2-7', label: '3x - y = 4 és 6x - 2y = 15', category: 'cat-no-solution' },
      { id: 'ls2-8', label: '4x + 2y = 10 és 2x + y = 1', category: 'cat-no-solution' },
      // Végtelen sok
      { id: 'ls2-9', label: 'x + y = 5 és 2x + 2y = 10', category: 'cat-infinite-solutions' },
      { id: 'ls2-10', label: '2x - 3y = 6 és 4x - 6y = 12', category: 'cat-infinite-solutions' },
      { id: 'ls2-11', label: 'x - 2y = 4 és -2x + 4y = -8', category: 'cat-infinite-solutions' },
      { id: 'ls2-12', label: '3x + y = 9 és 6x + 2y = 18', category: 'cat-infinite-solutions' }
    ]
  },
  3: {
    title: '3. Szint: A Megoldáspár (x; y) Előjelei',
    subtitle: 'Határozd meg fejben az ismeretlenek előjeleit!',
    categories: [
      {
        id: 'cat-both-pos',
        name: 'Mindkettő pozitív (x > 0, y > 0)',
        description: 'A metszéspont az I. síknegyedben van',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-mixed-signs',
        name: 'Vegyes előjelű (+ és -)',
        description: 'A II. vagy IV. síknegyedbe esik a pont',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-has-zero',
        name: 'Legalább az egyik 0 (Tengelypont)',
        description: 'A metszéspont az x vagy y tengelyen van',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // Mindkettő pozitív
      { id: 'ls3-1', label: 'x + y = 7 és x - y = 1 → (4; 3)', category: 'cat-both-pos' },
      { id: 'ls3-2', label: '2x + y = 8 és x = 2 → (2; 4)', category: 'cat-both-pos' },
      { id: 'ls3-3', label: 'x + 2y = 11 és x = 3 → (3; 4)', category: 'cat-both-pos' },
      { id: 'ls3-4', label: '3x + y = 10 és y = 1 → (3; 1)', category: 'cat-both-pos' },
      // Vegyes előjelű
      { id: 'ls3-5', label: 'x + y = 2 és x - y = 8 → (5; -3)', category: 'cat-mixed-signs' },
      { id: 'ls3-6', label: 'x = -2 és y = 5 → (-2; 5)', category: 'cat-mixed-signs' },
      { id: 'ls3-7', label: '2x + y = -1 és x = 1 → (1; -3)', category: 'cat-mixed-signs' },
      { id: 'ls3-8', label: 'x + y = -2 és x - y = 6 → (2; -4)', category: 'cat-mixed-signs' },
      // Nullát tartalmaz
      { id: 'ls3-9', label: 'x + y = 5 és x - y = 5 → (5; 0)', category: 'cat-has-zero' },
      { id: 'ls3-10', label: '2x + 3y = 0 és x - y = 0 → (0; 0)', category: 'cat-has-zero' },
      { id: 'ls3-11', label: 'x + 2y = 6 és x = 0 → (0; 3)', category: 'cat-has-zero' },
      { id: 'ls3-12', label: '3x - 4y = 12 és y = 0 → (4; 0)', category: 'cat-has-zero' }
    ]
  }
};

export const LinearSystemsSorter: React.FC<LinearSystemsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-egyenlet-rendszerek-quiz',
  topicTitle = 'Elsőfokú kétismeretlenes egyenletrendszer'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      levels={sorterLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      color="red"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

