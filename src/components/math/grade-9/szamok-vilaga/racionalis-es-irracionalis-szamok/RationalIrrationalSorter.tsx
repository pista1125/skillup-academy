import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RationalIrrationalSorterProps {
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
    title: '1. Szint: Racionális vagy Irracionális?',
    subtitle: 'Húzd a számokat a megfelelő halmaz kártyadobozába!',
    categories: [
      {
        id: 'cat-rat',
        name: 'Racionális szám (ℚ)',
        description: 'Felírható két egész hányadosaként (egész, véges tizedes vagy szakaszos)',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-irrat',
        name: 'Irracionális szám (ℚ*)',
        description: 'Nem írható fel két egész hányadosaként (végtelen nem szakaszos)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'ris1-1', label: '3/5', category: 'cat-rat' },
      { id: 'ris1-2', label: '0,125', category: 'cat-rat' },
      { id: 'ris1-3', label: '0,(3)', category: 'cat-rat' },
      { id: 'ris1-4', label: '√49', category: 'cat-rat' },
      { id: 'ris1-5', label: '−8', category: 'cat-rat' },
      { id: 'ris1-6', label: '0', category: 'cat-rat' },
      { id: 'ris1-7', label: '√(144/25)', category: 'cat-rat' },
      { id: 'ris1-8', label: '√3', category: 'cat-irrat' },
      { id: 'ris1-9', label: 'π', category: 'cat-irrat' },
      { id: 'ris1-10', label: '√2 + 1', category: 'cat-irrat' },
      { id: 'ris1-11', label: '0,1010010001...', category: 'cat-irrat' },
      { id: 'ris1-12', label: '2 · π', category: 'cat-irrat' }
    ]
  },
  2: {
    title: '2. Szint: Tizedestört Alakok Besorolása',
    subtitle: 'Csoportosítsd a számokat a tizedestört alakjuk jellege szerint!',
    categories: [
      {
        id: 'cat-term',
        name: 'Véges tizedestört',
        description: 'Az egyszerűsített nevezőben kizárólag 2 és/vagy 5 prím szerepel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-per',
        name: 'Végtelen szakaszos',
        description: 'Racionális szám, de a nevező tartalmaz 2-től és 5-től eltérő prímosztót is',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-nonper',
        name: 'Végtelen nem szakaszos',
        description: 'Irracionális szám (ℚ*), nincs benne ismétlődő periódus',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'ris2-1', label: '7/4', category: 'cat-term' },
      { id: 'ris2-2', label: '3/8', category: 'cat-term' },
      { id: 'ris2-3', label: '9/60', category: 'cat-term' },
      { id: 'ris2-4', label: '11/25', category: 'cat-term' },
      { id: 'ris2-5', label: '1/3', category: 'cat-per' },
      { id: 'ris2-6', label: '5/6', category: 'cat-per' },
      { id: 'ris2-7', label: '23/37', category: 'cat-per' },
      { id: 'ris2-8', label: '2/11', category: 'cat-per' },
      { id: 'ris2-9', label: '√5', category: 'cat-nonper' },
      { id: 'ris2-10', label: 'π / 2', category: 'cat-nonper' },
      { id: 'ris2-11', label: '√8', category: 'cat-nonper' },
      { id: 'ris2-12', label: '0,123456789101112...', category: 'cat-nonper' }
    ]
  },
  3: {
    title: '3. Szint: Besorolás a Négy Alaphalmazba',
    subtitle: 'Helyezd el az elemeket a legszűkebb nevezetes számhalmazba (ℕ, ℤ \\ ℕ, ℚ \\ ℤ, ℚ*)!',
    categories: [
      {
        id: 'cat-n',
        name: 'Természetes számok (ℕ)',
        description: '0 és a pozitív egész számok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-z-only',
        name: 'Negatív egész (ℤ \\ ℕ)',
        description: 'Szigorúan negatív egész számok',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-q-only',
        name: 'Tört racionális (ℚ \\ ℤ)',
        description: 'Nem egész racionális számok',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-qstar',
        name: 'Irracionális (ℚ*)',
        description: 'Valós, de nem felírható két egész hányadosaként',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'ris3-1', label: '√100', category: 'cat-n' },
      { id: 'ris3-2', label: '0', category: 'cat-n' },
      { id: 'ris3-3', label: '(−4)²', category: 'cat-n' },
      { id: 'ris3-4', label: '√18 / √2', category: 'cat-n' },
      { id: 'ris3-5', label: '−15', category: 'cat-z-only' },
      { id: 'ris3-6', label: '−√64', category: 'cat-z-only' },
      { id: 'ris3-7', label: '28 / (−4)', category: 'cat-z-only' },
      { id: 'ris3-8', label: '0,(27)', category: 'cat-q-only' },
      { id: 'ris3-9', label: '−3,75', category: 'cat-q-only' },
      { id: 'ris3-10', label: '5/12', category: 'cat-q-only' },
      { id: 'ris3-11', label: '√7', category: 'cat-qstar' },
      { id: 'ris3-12', label: '3 − π', category: 'cat-qstar' }
    ]
  }
};

export const RationalIrrationalSorter: React.FC<RationalIrrationalSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'racionalis-es-irracionalis-szamok',
  topicTitle = 'Racionális és irracionális számok'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      title="Racionális és Irracionális Számok Csoportosító"
      subtitle="Rendszerezd a számokat tulajdonságaik alapján!"
      badge="CSOPORTOSÍTÓ"
      topicTitle={topicTitle}
      levelConfigs={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default RationalIrrationalSorter;
