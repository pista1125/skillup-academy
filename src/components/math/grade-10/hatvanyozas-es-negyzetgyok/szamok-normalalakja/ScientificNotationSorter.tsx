import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ScientificNotationSorterProps {
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
    title: 'Szabályos normálalak vagy hibás mantissza?',
    subtitle: 'Döntsd el a mantissza nagysága alapján, hogy a kifejezés szabályos normálalak-e!',
    categories: [
      {
        id: 'cat-valid',
        name: 'Szabályos normálalak (1 ≤ |a| < 10)',
        description: 'Pontosan egy nem nulla számjegy áll a tizedesvessző előtt',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-too-large',
        name: 'Túl nagy mantissza (|a| ≥ 10)',
        description: 'Több számjegy áll a tizedesvessző előtt (pl. 24 · 10⁵)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'cat-too-small',
        name: 'Túl kicsi mantissza (|a| < 1)',
        description: 'Nullával kezdődik a tizedestört (pl. 0,4 · 10³)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'sns1-1', text: '3,45 · 10⁶', categoryId: 'cat-valid' },
      { id: 'sns1-2', text: '1,0 · 10⁻⁴', categoryId: 'cat-valid' },
      { id: 'sns1-3', text: '9,99 · 10⁸', categoryId: 'cat-valid' },
      { id: 'sns1-4', text: '-7,2 · 10³', categoryId: 'cat-valid' },

      { id: 'sns1-5', text: '24 · 10⁵', categoryId: 'cat-too-large' },
      { id: 'sns1-6', text: '10 · 10³', categoryId: 'cat-too-large' },
      { id: 'sns1-7', text: '105 · 10⁻²', categoryId: 'cat-too-large' },
      { id: 'sns1-8', text: '48,5 · 10⁶', categoryId: 'cat-too-large' },

      { id: 'sns1-9', text: '0,45 · 10³', categoryId: 'cat-too-small' },
      { id: 'sns1-10', text: '0,02 · 10⁷', categoryId: 'cat-too-small' },
      { id: 'sns1-11', text: '0,99 · 10⁻⁵', categoryId: 'cat-too-small' },
      { id: 'sns1-12', text: '0,001 · 10²', categoryId: 'cat-too-small' }
    ]
  },
  2: {
    title: 'Nagyságrend és a kitevő előjele',
    subtitle: 'Csoportosítsd a normálalakú számokat nagyságrendjük és kitevőjük szerint!',
    categories: [
      {
        id: 'cat-macro',
        name: 'Makro-nagyságrend (k > 0, x ≥ 10)',
        description: 'Nagy számok, a tizedesvesszőt balra toltuk',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-300'
      },
      {
        id: 'cat-unit',
        name: 'Egységnyi nagyságrend (k = 0, 1 ≤ x < 10)',
        description: '1 és 10 közé eső számok (10⁰ = 1)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300'
      },
      {
        id: 'cat-micro',
        name: 'Mikro-nagyságrend (k < 0, 0 < x < 1)',
        description: 'Nagyon apró számok, a tizedesvesszőt jobbra toltuk',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      }
    ],
    items: [
      { id: 'sns2-1', text: '3 · 10⁸', categoryId: 'cat-macro' },
      { id: 'sns2-2', text: '1,496 · 10¹¹', categoryId: 'cat-macro' },
      { id: 'sns2-3', text: '5,97 · 10²⁴', categoryId: 'cat-macro' },
      { id: 'sns2-4', text: '2,5 · 10³', categoryId: 'cat-macro' },

      { id: 'sns2-5', text: '5,4 · 10⁰', categoryId: 'cat-unit' },
      { id: 'sns2-6', text: '1,0 · 10⁰', categoryId: 'cat-unit' },
      { id: 'sns2-7', text: '9,8 · 10⁰', categoryId: 'cat-unit' },
      { id: 'sns2-8', text: '3,14 · 10⁰', categoryId: 'cat-unit' },

      { id: 'sns2-9', text: '1,6 · 10⁻¹⁹', categoryId: 'cat-micro' },
      { id: 'sns2-10', text: '9,1 · 10⁻³¹', categoryId: 'cat-micro' },
      { id: 'sns2-11', text: '2,5 · 10⁻⁶', categoryId: 'cat-micro' },
      { id: 'sns2-12', text: '8 · 10⁻³', categoryId: 'cat-micro' }
    ]
  },
  3: {
    title: 'SI prefixumok és nagyságrendi tartományok',
    subtitle: 'Sorold be a fizikai mennyiségeket az alapegységbeli 10-es kitevőjük nagysága szerint!',
    categories: [
      {
        id: 'cat-giga',
        name: 'Giga vagy nagyobb (≥ 10⁹)',
        description: 'Giga, Tera és annál nagyobb mértékek',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300'
      },
      {
        id: 'cat-kilo-mega',
        name: 'Kilo és Mega tartomány (10³ – 10⁶)',
        description: 'Ezer és millió közötti szorzók',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'cat-milli-sub',
        name: 'Milli vagy kisebb (≤ 10⁻³)',
        description: 'Milli, mikro, nano és piko tartomány',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'sns3-1', text: '2 Terabájt (TB)', categoryId: 'cat-giga' },
      { id: 'sns3-2', text: '5 Gigawatt (GW)', categoryId: 'cat-giga' },
      { id: 'sns3-3', text: '1,5 · 10¹⁰ méter', categoryId: 'cat-giga' },
      { id: 'sns3-4', text: '4,2 · 10¹¹ Joule', categoryId: 'cat-giga' },

      { id: 'sns3-5', text: '5 Megawatt (MW)', categoryId: 'cat-kilo-mega' },
      { id: 'sns3-6', text: '400 Kilowatt (kW)', categoryId: 'cat-kilo-mega' },
      { id: 'sns3-7', text: '25 kilométer (km)', categoryId: 'cat-kilo-mega' },
      { id: 'sns3-8', text: '8 Megabájt (MB)', categoryId: 'cat-kilo-mega' },

      { id: 'sns3-9', text: '3 milliméter (mm)', categoryId: 'cat-milli-sub' },
      { id: 'sns3-10', text: '50 mikrométer (μm)', categoryId: 'cat-milli-sub' },
      { id: 'sns3-11', text: '4 nanométer (nm)', categoryId: 'cat-milli-sub' },
      { id: 'sns3-12', text: '2 pikométer (pm)', categoryId: 'cat-milli-sub' }
    ]
  }
};

export const ScientificNotationSorter: React.FC<ScientificNotationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hatvanyozas-negyzetgyok',
  topicTitle = '4. Számok normálalakja'
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
      title="Számok normálalakja csoportosító játék"
      subtitle="Csoportosítsd a kifejezéseket szabályosságuk, nagyságrendjük és SI prefixumuk szerint!"
      themeColor="emerald"
    />
  );
};

