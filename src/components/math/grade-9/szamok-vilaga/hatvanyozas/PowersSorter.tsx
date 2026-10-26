import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersSorterProps {
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
    title: '1. Szint: Hatványértékek Előjele és Jellege (Könnyű)',
    subtitle: 'Rendszerezd a kifejezéseket előjelük és értékük szerint!',
    categories: [
      {
        id: 'cat-positive',
        name: 'Pozitív érték (> 0)',
        description: 'Páros kitevőjű negatív számok vagy tetszőleges kitevőjű pozitív alapok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-negative',
        name: 'Negatív érték (< 0)',
        description: 'Páratlan kitevőjű negatív számok vagy zárójel nélküli előjelek',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-one',
        name: 'Pontosan 1 (Egy)',
        description: 'Bármely nemnulla szám nulladik hatványa vagy az 1 tetszőleges hatványa',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'pws1-1', label: '(-2)⁴ = +16', category: 'cat-positive' },
      { id: 'pws1-2', label: '(-3)⁶ = +729', category: 'cat-positive' },
      { id: 'pws1-3', label: '5⁻² = 1/25 = 0,04', category: 'cat-positive' },
      { id: 'pws1-4', label: '(-0,5)⁻² = (-2)² = +4', category: 'cat-positive' },
      { id: 'pws1-5', label: '(-2)³ = -8', category: 'cat-negative' },
      { id: 'pws1-6', label: '-2⁴ = -16 (zárójel nélkül!)', category: 'cat-negative' },
      { id: 'pws1-7', label: '(-5)¹ = -5', category: 'cat-negative' },
      { id: 'pws1-8', label: '-10⁰ = -(1) = -1', category: 'cat-negative' },
      { id: 'pws1-9', label: '7⁰ = 1', category: 'cat-one' },
      { id: 'pws1-10', label: '(-12)⁰ = 1 (zárójelben)', category: 'cat-one' },
      { id: 'pws1-11', label: '1⁻⁹⁹ = 1', category: 'cat-one' },
      { id: 'pws1-12', label: '(3/7)⁰ = 1', category: 'cat-one' }
    ]
  },
  2: {
    title: '2. Szint: Alkalmazandó Hatványozási Azonosság (Közepes)',
    subtitle: 'Melyik hatványműveleti szabályt alkalmazzuk a kifejezés összevonására?',
    categories: [
      {
        id: 'cat-add-exp',
        name: 'Kitevők összeadása (aⁿ · aᵐ = aⁿ⁺ᵐ)',
        description: 'Azonos alapú hatványok szorzása',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-sub-exp',
        name: 'Kitevők kivonása (aⁿ / aᵐ = aⁿ⁻ᵐ)',
        description: 'Azonos alapú hatványok osztása',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-mult-exp',
        name: 'Kitevők szorzása ((aⁿ)ᵐ = aⁿᵐ)',
        description: 'Hatvány hatványozása',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'pws2-1', label: '3⁴ · 3⁸ = 3¹²', category: 'cat-add-exp' },
      { id: 'pws2-2', label: '2⁻³ · 2⁷ = 2⁴', category: 'cat-add-exp' },
      { id: 'pws2-3', label: 'x⁵ · x = x⁶', category: 'cat-add-exp' },
      { id: 'pws2-4', label: '10² · 10³ · 10⁴ = 10⁹', category: 'cat-add-exp' },
      { id: 'pws2-5', label: '5¹⁰ / 5³ = 5⁷', category: 'cat-sub-exp' },
      { id: 'pws2-6', label: '2⁴ / 2⁹ = 2⁻⁵', category: 'cat-sub-exp' },
      { id: 'pws2-7', label: 'y⁸ : y³ = y⁵', category: 'cat-sub-exp' },
      { id: 'pws2-8', label: '7⁻² / 7⁻⁵ = 7³', category: 'cat-sub-exp' },
      { id: 'pws2-9', label: '(2³)² = 2⁶', category: 'cat-mult-exp' },
      { id: 'pws2-10', label: '(x⁴)⁻² = x⁻⁸', category: 'cat-mult-exp' },
      { id: 'pws2-11', label: '((3²)³)² = 3¹²', category: 'cat-mult-exp' },
      { id: 'pws2-12', label: '(10⁻²)⁻³ = 10⁶', category: 'cat-mult-exp' }
    ]
  },
  3: {
    title: '3. Szint: Algebrai Megoldási Stratégia (Haladó)',
    subtitle: 'Válaszd ki az adott érettségi típusú kifejezéshez illő leghatékonyabb módszert!',
    categories: [
      {
        id: 'cat-same-base',
        name: 'Közös alapra hozás',
        description: 'Különböző alapok átírása közös prímhatványra (pl. 4 és 8 -> 2ⁿ)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-factor-out',
        name: 'Közös tényező kiemelése',
        description: 'Összegből vagy különbségből a legkisebb kitevőjű hatvány kiemelése',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-same-exp',
        name: 'Azonos kitevő összevonása',
        description: 'Különböző alapok közös kitevő alá rendezése: aⁿ · bⁿ = (ab)ⁿ vagy aⁿ / bⁿ = (a/b)ⁿ',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      }
    ],
    items: [
      { id: 'pws3-1', label: '4³ · 8² kiszámítása 2-es alapú hatványként', category: 'cat-same-base' },
      { id: 'pws3-2', label: '9⁵ / 27² egyszerűsítése 3-as alapú hatványként', category: 'cat-same-base' },
      { id: 'pws3-3', label: '25⁴ · 125⁻² átalakítása 5-ös alapú hatványként', category: 'cat-same-base' },
      { id: 'pws3-4', label: '2³⁰⁰ és 4¹⁴⁰ nagyságrendi összehasonlítása', category: 'cat-same-base' },
      { id: 'pws3-5', label: '(2¹⁰ + 2¹²) / 2¹⁰ kifejezés egyszerűsítése', category: 'cat-factor-out' },
      { id: 'pws3-6', label: '3⁷ + 3⁶ átalakítása 3⁶(3 + 1) szorzattá', category: 'cat-factor-out' },
      { id: 'pws3-7', label: '(5¹⁵ - 5¹³) / 24 tört értéke kiemeléssel', category: 'cat-factor-out' },
      { id: 'pws3-8', label: '2 · 7⁹ + 5 · 7⁹ összevonása 7 · 7⁹ = 7¹⁰ alakra', category: 'cat-factor-out' },
      { id: 'pws3-9', label: '2⁵ · 5⁵ kiszámítása (2 · 5)⁵ = 10⁵-ként', category: 'cat-same-exp' },
      { id: 'pws3-10', label: '12⁴ / 4⁴ kiszámítása (12 / 4)⁴ = 3⁴-ként', category: 'cat-same-exp' },
      { id: 'pws3-11', label: '(0,5)⁷ · 2⁷ összevonása (0,5 · 2)⁷ = 1-re', category: 'cat-same-exp' },
      { id: 'pws3-12', label: '18³ / 6³ kiszámítása (18 / 6)³ = 3³ = 27-re', category: 'cat-same-exp' }
    ]
  }
};

export const PowersSorter: React.FC<PowersSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-szamok-hatvany-sorter',
  topicTitle = 'Hatványozás'
}) => {
  const activeLevel = currentLevel || level;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`powers-sorter-${activeLevel}`}
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      categories={config.categories}
      items={config.items}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="purple"
    />
  );
};

export default PowersSorter;
