import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FactorizationSorterProps {
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
    title: '1. Szint: A Szorzattá Alakítás Elsődleges Módszere',
    subtitle: 'Melyik módszerrel érdemes kezdeni a megadott kifejezés szorzattá alakítását?',
    categories: [
      {
        id: 'cat-common-factor',
        name: 'Közös Tényező Kiemelése',
        description: 'Minden tag osztható egy közös számmal vagy betűvel',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-diff-squares',
        name: 'Négyzetek Különbsége (a² - b²)',
        description: 'Két négyzetszám kivonása egymásból',
        badgeColor: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300'
      },
      {
        id: 'cat-perfect-sq',
        name: 'Teljes Négyzet (a² ± 2ab + b²)',
        description: 'Háromtagú kifejezés (a ± b)² alakra',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Kiemelés
      { id: 'fs1-1', label: '4x² + 8x', category: 'cat-common-factor' },
      { id: 'fs1-2', label: '3x - 12', category: 'cat-common-factor' },
      { id: 'fs1-3', label: '5x² - 10', category: 'cat-common-factor' },
      { id: 'fs1-4', label: 'a²b - ab²', category: 'cat-common-factor' },
      // Négyzetek különbsége
      { id: 'fs1-5', label: 'x² - 16', category: 'cat-diff-squares' },
      { id: 'fs1-6', label: '4x² - 49', category: 'cat-diff-squares' },
      { id: 'fs1-7', label: '9 - y²', category: 'cat-diff-squares' },
      { id: 'fs1-8', label: '25a² - 1', category: 'cat-diff-squares' },
      // Teljes négyzet
      { id: 'fs1-9', label: 'x² + 6x + 9', category: 'cat-perfect-sq' },
      { id: 'fs1-10', label: 'x² - 8x + 16', category: 'cat-perfect-sq' },
      { id: 'fs1-11', label: '4x² + 4x + 1', category: 'cat-perfect-sq' },
      { id: 'fs1-12', label: '9x² - 12x + 4', category: 'cat-perfect-sq' }
    ]
  },
  2: {
    title: '2. Szint: Szorzattá Alakíthatóság a Valós Számokon',
    subtitle: 'Hány tényezőre bontható fel a kifejezés a valós számok halmazán?',
    categories: [
      {
        id: 'cat-two-factors',
        name: 'Két Tényezős Szorzat',
        description: 'Két elsőfokú kifejezés szorzata',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-three-factors',
        name: 'Három Tényezős Szorzat',
        description: 'Konstans szorzó + 2 zárójel vagy x · (...) · (...)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-not-factorable',
        name: 'Nem Alakítható Szorzattá (R-en)',
        description: 'Négyzetek összege, nincs valós zérushelye',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Két tényező
      { id: 'fs2-1', label: 'x² - 9', category: 'cat-two-factors' }, // (x-3)(x+3)
      { id: 'fs2-2', label: 'x² + 4x', category: 'cat-two-factors' }, // x(x+4)
      { id: 'fs2-3', label: 'x² + 10x + 25', category: 'cat-two-factors' }, // (x+5)(x+5)
      { id: 'fs2-4', label: '4x² - 1', category: 'cat-two-factors' }, // (2x-1)(2x+1)
      // Három tényező
      { id: 'fs2-5', label: '2x² - 18', category: 'cat-three-factors' }, // 2(x-3)(x+3)
      { id: 'fs2-6', label: '3x² - 12', category: 'cat-three-factors' }, // 3(x-2)(x+2)
      { id: 'fs2-7', label: 'x³ - 4x', category: 'cat-three-factors' }, // x(x-2)(x+2)
      { id: 'fs2-8', label: '5x² + 20x + 20', category: 'cat-three-factors' }, // 5(x+2)²
      // Nem bontható valósban
      { id: 'fs2-9', label: 'x² + 9', category: 'cat-not-factorable' },
      { id: 'fs2-10', label: 'x² + 1', category: 'cat-not-factorable' },
      { id: 'fs2-11', label: '4x² + 25', category: 'cat-not-factorable' }
    ]
  },
  3: {
    title: '3. Szint: Gyökök és Lineáris Tényezők Tartalmazása',
    subtitle: 'Melyik lineáris tényezőt tartalmazza a kifejezés szorzatalakja?',
    categories: [
      {
        id: 'cat-has-x-minus-2',
        name: 'Tartalmazza az (x - 2) tényezőt',
        description: 'A kifejezés zérushelye x = 2',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-has-x-plus-3',
        name: 'Tartalmazza az (x + 3) tényezőt',
        description: 'A kifejezés zérushelye x = -3',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-has-neither',
        name: 'Egyiket Sem Tartalmazza',
        description: 'Sem az (x - 2), sem az (x + 3) nem osztója',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      }
    ],
    items: [
      // (x - 2)
      { id: 'fs3-1', label: 'x² - 4', category: 'cat-has-x-minus-2' }, // (x-2)(x+2)
      { id: 'fs3-2', label: 'x² - 4x + 4', category: 'cat-has-x-minus-2' }, // (x-2)²
      { id: 'fs3-3', label: '3x - 6', category: 'cat-has-x-minus-2' }, // 3(x-2)
      { id: 'fs3-4', label: 'x² - 2x', category: 'cat-has-x-minus-2' }, // x(x-2)
      // (x + 3)
      { id: 'fs3-5', label: 'x² - 9', category: 'cat-has-x-plus-3' }, // (x-3)(x+3)
      { id: 'fs3-6', label: 'x² + 6x + 9', category: 'cat-has-x-plus-3' }, // (x+3)²
      { id: 'fs3-7', label: '2x + 6', category: 'cat-has-x-plus-3' }, // 2(x+3)
      { id: 'fs3-8', label: 'x² + 3x', category: 'cat-has-x-plus-3' }, // x(x+3)
      // Egyik sem
      { id: 'fs3-9', label: 'x² - 16', category: 'cat-has-neither' },
      { id: 'fs3-10', label: 'x² - 25', category: 'cat-has-neither' },
      { id: 'fs3-11', label: '5x + 20', category: 'cat-has-neither' }
    ]
  }
};

export const FactorizationSorter: React.FC<FactorizationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-egyenletek-azonossagok',
  topicTitle = 'Szorzattá alakítás'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="violet"
      storageKey="grade9-factorization-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};
