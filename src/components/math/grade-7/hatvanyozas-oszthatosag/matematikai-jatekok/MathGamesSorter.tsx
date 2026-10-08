import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MathGamesSorterProps {
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
    title: '1. Szint: Nyerő vagy Vesztő Pozíció a 21-es Játékban?',
    subtitle: 'Válogasd szét a számokat aszerint, hogy kulcsfontosságú nyerő pozíciónak számítanak-e (lépés: 1–3)!',
    categories: [
      {
        id: 'cat-winning-pos',
        name: 'Nyerő kulcspozíció',
        description: '21 - 4k értékek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-losing-pos',
        name: 'Nem kulcspozíció',
        description: 'Köztes értékek',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's1-1', label: '1', category: 'cat-winning-pos' },
      { id: 's1-2', label: '5', category: 'cat-winning-pos' },
      { id: 's1-3', label: '9', category: 'cat-winning-pos' },
      { id: 's1-4', label: '13', category: 'cat-winning-pos' },
      { id: 's1-5', label: '17', category: 'cat-winning-pos' },
      { id: 's1-6', label: '21', category: 'cat-winning-pos' },
      { id: 's1-7', label: '2', category: 'cat-losing-pos' },
      { id: 's1-8', label: '4', category: 'cat-losing-pos' },
      { id: 's1-9', label: '7', category: 'cat-losing-pos' },
      { id: 's1-10', label: '10', category: 'cat-losing-pos' },
      { id: 's1-11', label: '14', category: 'cat-losing-pos' },
      { id: 's1-12', label: '18', category: 'cat-losing-pos' }
    ]
  },
  2: {
    title: '2. Szint: Ki Rendelkezik Nyerő Stratégiával?',
    subtitle: 'Csoportosítsd a számversenyeket aszerint, hogy a kezdő vagy a második játékos nyerhet-e biztosan!',
    categories: [
      {
        id: 'cat-first-player',
        name: 'Kezdő játékos nyer',
        description: 'Cél nem osztható a ciklussal',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-second-player',
        name: 'Második játékos nyer',
        description: 'Cél osztható a ciklussal',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Cél: 21, lépés: 1–3', category: 'cat-first-player' },
      { id: 's2-2', label: 'Cél: 25, lépés: 1–3', category: 'cat-first-player' },
      { id: 's2-3', label: 'Cél: 31, lépés: 1–4', category: 'cat-first-player' },
      { id: 's2-4', label: 'Cél: 16, lépés: 1–2', category: 'cat-first-player' },
      { id: 's2-5', label: 'Cél: 22, lépés: 1–3', category: 'cat-first-player' },
      { id: 's2-6', label: 'Cél: 11, lépés: 1–4', category: 'cat-first-player' },
      { id: 's2-7', label: 'Cél: 20, lépés: 1–3', category: 'cat-second-player' },
      { id: 's2-8', label: 'Cél: 100, lépés: 1–3', category: 'cat-second-player' },
      { id: 's2-9', label: 'Cél: 30, lépés: 1–4', category: 'cat-second-player' },
      { id: 's2-10', label: 'Cél: 15, lépés: 1–2', category: 'cat-second-player' },
      { id: 's2-11', label: 'Cél: 40, lépés: 1–3', category: 'cat-second-player' },
      { id: 's2-12', label: 'Cél: 50, lépés: 1–4', category: 'cat-second-player' }
    ]
  },
  3: {
    title: '3. Szint: A Biztos Nyerő Stratégia Jellege',
    subtitle: 'Válogasd szét a matematikai játékokat a győzelemhez vezető fő elv szerint!',
    categories: [
      {
        id: 'cat-modulo',
        name: 'Kiegészítő / Moduláris elv',
        description: 'Lépéspárok összege k+1',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-symmetry',
        name: 'Szimmetrikus tükrözés',
        description: 'Középpontos másolás',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      },
      {
        id: 'cat-parity',
        name: 'Paritás és oszthatóság',
        description: 'Páros/páratlan állapot',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: '21-es számverseny', category: 'cat-modulo' },
      { id: 's3-2', label: '100-as összegző játék', category: 'cat-modulo' },
      { id: 's3-3', label: 'Bábulépkedés célszámig', category: 'cat-modulo' },
      { id: 's3-4', label: 'Kockadobásos cél-elérés', category: 'cat-modulo' },
      { id: 's3-5', label: 'Érmelerakás kerek asztalra', category: 'cat-symmetry' },
      { id: 's3-6', label: 'Dominók szimmetrikus táblán', category: 'cat-symmetry' },
      { id: 's3-7', label: 'Vonalhúzás szimmetrikus rácson', category: 'cat-symmetry' },
      { id: 's3-8', label: 'Körlapok tükrözött lefedése', category: 'cat-symmetry' },
      { id: 's3-9', label: 'Osztókivonós játék', category: 'cat-parity' },
      { id: 's3-10', label: 'Páros kavicsok felezése', category: 'cat-parity' },
      { id: 's3-11', label: '9-cel osztható szám készítése', category: 'cat-parity' },
      { id: 's3-12', label: 'Lépések paritásának megőrzése', category: 'cat-parity' }
    ]
  }
};

export const MathGamesSorter: React.FC<MathGamesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-games',
  topicTitle = '10. Matematikai játékok'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      levels={sorterLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="rose"
    />
  );
};

export default MathGamesSorter;
