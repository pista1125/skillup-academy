import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RootIdentitiesSorterProps {
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
    title: 'Értelmezhetőség a valós számok körében',
    subtitle: 'Válaszd szét a helyesen értelmezett pozitív értékeket, a nullát és a nem értelmezett kifejezéseket!',
    categories: [
      {
        id: 'cat-pos',
        name: 'Értelmezett pozitív érték (> 0)',
        description: 'Pozitív gyök alatti szám vagy negatív szám négyzete gyök alatt',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-zero',
        name: 'Értelmezett nulla (= 0)',
        description: 'Nulla négyzetgyöke (√0 = 0)',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
      },
      {
        id: 'cat-invalid',
        name: 'Nem értelmezett a valós számok körében',
        description: 'Negatív radikandus (a < 0)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'ris1-1', text: '√64', categoryId: 'cat-pos' },
      { id: 'ris1-2', text: '√((-8)²)', categoryId: 'cat-pos' },
      { id: 'ris1-3', text: '√(5 · 20)', categoryId: 'cat-pos' },
      { id: 'ris1-4', text: '√(1 / 4)', categoryId: 'cat-pos' },

      { id: 'ris1-5', text: '√0', categoryId: 'cat-zero' },
      { id: 'ris1-6', text: '√(3 - 3)', categoryId: 'cat-zero' },
      { id: 'ris1-7', text: '√0²', categoryId: 'cat-zero' },
      { id: 'ris1-8', text: '√(0 · 25)', categoryId: 'cat-zero' },

      { id: 'ris1-9', text: '√(-16)', categoryId: 'cat-invalid' },
      { id: 'ris1-10', text: '√(-1)', categoryId: 'cat-invalid' },
      { id: 'ris1-11', text: '√(-49)', categoryId: 'cat-invalid' },
      { id: 'ris1-12', text: '√(5 - 10)', categoryId: 'cat-invalid' }
    ]
  },
  2: {
    title: 'Racionális vagy irracionális gyök?',
    subtitle: 'Döntsd el a kifejezés pontos értéke alapján, hogy felírható-e két egész szám hányadosaként!',
    categories: [
      {
        id: 'cat-rational',
        name: 'Racionális szám (pontos egész vagy tört)',
        description: 'Négyzetszámok gyöke vagy egyszerűsíthető kifejezés',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-irrational',
        name: 'Irracionális szám (nem szakaszos tizedestört)',
        description: 'Nem négyzetszámok négyzetgyöke',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      }
    ],
    items: [
      { id: 'ris2-1', text: '√36', categoryId: 'cat-rational' },
      { id: 'ris2-2', text: '√(4 / 9)', categoryId: 'cat-rational' },
      { id: 'ris2-3', text: '√1,44', categoryId: 'cat-rational' },
      { id: 'ris2-4', text: '√2 · √8', categoryId: 'cat-rational' },
      { id: 'ris2-5', text: '√0,25', categoryId: 'cat-rational' },
      { id: 'ris2-6', text: '√100', categoryId: 'cat-rational' },

      { id: 'ris2-7', text: '√2', categoryId: 'cat-irrational' },
      { id: 'ris2-8', text: '√3', categoryId: 'cat-irrational' },
      { id: 'ris2-9', text: '√5', categoryId: 'cat-irrational' },
      { id: 'ris2-10', text: '√8', categoryId: 'cat-irrational' },
      { id: 'ris2-11', text: '√20', categoryId: 'cat-irrational' },
      { id: 'ris2-12', text: '√50', categoryId: 'cat-irrational' }
    ]
  },
  3: {
    title: 'Kifejezések nagysága',
    subtitle: 'Számítsd ki vagy becsüld meg a gyökös kifejezés értékét, és csoportosítsd nagyság szerint!',
    categories: [
      {
        id: 'cat-lt5',
        name: 'Értéke 5-nél kisebb (< 5)',
        description: '4 vagy annál kisebb számértékek',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
      },
      {
        id: 'cat-5to10',
        name: 'Értéke 5 és 10 közé esik (5 ≤ x ≤ 10)',
        description: '5 és 10 közötti határú értékek',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300'
      },
      {
        id: 'cat-gt10',
        name: 'Értéke 10-nél nagyobb (> 10)',
        description: '10 feletti pontos számértékek',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      }
    ],
    items: [
      { id: 'ris3-1', text: '√9', categoryId: 'cat-lt5' },
      { id: 'ris3-2', text: '√2 · √8', categoryId: 'cat-lt5' },
      { id: 'ris3-3', text: '√(25 - 9)', categoryId: 'cat-lt5' },
      { id: 'ris3-4', text: '√12 : √3', categoryId: 'cat-lt5' },

      { id: 'ris3-5', text: '√25', categoryId: 'cat-5to10' },
      { id: 'ris3-6', text: '√3 · √27', categoryId: 'cat-5to10' },
      { id: 'ris3-7', text: '√50 : √2', categoryId: 'cat-5to10' },
      { id: 'ris3-8', text: '√64', categoryId: 'cat-5to10' },

      { id: 'ris3-9', text: '√144', categoryId: 'cat-gt10' },
      { id: 'ris3-10', text: '√288 : √2', categoryId: 'cat-gt10' },
      { id: 'ris3-11', text: '√400', categoryId: 'cat-gt10' },
      { id: 'ris3-12', text: '√5 · √45', categoryId: 'cat-gt10' }
    ]
  }
};

export const RootIdentitiesSorter: React.FC<RootIdentitiesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hatvanyozas-negyzetgyok',
  topicTitle = '5. A gyökvonás azonosságai'
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
      title="A gyökvonás azonosságai csoportosító játék"
      subtitle="Csoportosítsd a gyökös kifejezéseket értelmezhetőségük, racionális voltuk és nagyságuk szerint!"
      themeColor="teal"
    />
  );
};
