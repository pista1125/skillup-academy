import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersApplicationSorterProps {
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
    title: '1. Szint: Melyik Hatványazonosságot Kell Alkalmazni?',
    subtitle: 'Válogasd szét a kifejezéseket a megoldásukhoz szükséges szabály típusa szerint!',
    categories: [
      {
        id: 'cat-same-base',
        name: 'Azonos alapúak szorzása / osztása',
        description: 'aⁿ · aᵏ = aⁿ⁺ᵏ vagy aⁿ : aᵏ = aⁿ⁻ᵏ (alap változatlan, kitevőkkel számolunk)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-power-of-power',
        name: 'Hatvány hatványozása',
        description: '(aⁿ)ᵏ = aⁿ·ᵏ (egy hatvány van újabb kitevőre emelve, kitevők szorzódnak)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      },
      {
        id: 'cat-same-exp',
        name: 'Azonos kitevő: Szorzat vagy tört',
        description: '(a · b)ⁿ = aⁿ · bⁿ vagy (a/b)ⁿ = aⁿ/bⁿ (azonos kitevő összevonása vagy szétbontása)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      }
    ],
    items: [
      { id: 's1-1', label: '2⁵ · 2³ = 2⁸', category: 'cat-same-base' },
      { id: 's1-2', label: '7⁹ : 7⁴ = 7⁵', category: 'cat-same-base' },
      { id: 's1-3', label: 'x⁴ · x · x² = x⁷', category: 'cat-same-base' },
      { id: 's1-4', label: '10⁸ : 10³ = 10⁵', category: 'cat-same-base' },
      { id: 's1-5', label: '(3⁴)² = 3⁸', category: 'cat-power-of-power' },
      { id: 's1-6', label: '(10³)⁵ = 10¹⁵', category: 'cat-power-of-power' },
      { id: 's1-7', label: '(x²)⁴ = x⁸', category: 'cat-power-of-power' },
      { id: 's1-8', label: '[(-2)³]² = (-2)⁶ = +64', category: 'cat-power-of-power' },
      { id: 's1-9', label: '(2 · 5)⁴ = 2⁴ · 5⁴ = 10⁴', category: 'cat-same-exp' },
      { id: 's1-10', label: '(3/4)³ = 3³ / 4³ = 27/64', category: 'cat-same-exp' },
      { id: 's1-11', label: '4⁵ · 25⁵ = (4 · 25)⁵ = 100⁵', category: 'cat-same-exp' },
      { id: 's1-12', label: '18³ : 6³ = (18 : 6)³ = 3³', category: 'cat-same-exp' }
    ]
  },
  2: {
    title: '2. Szint: Állítások és Szabályok Igazságértéke',
    subtitle: 'Döntsd el a hatványos összefüggésekről, hogy mindig igazak, hibás csapdák, vagy csak speciálisan érvényesek!',
    categories: [
      {
        id: 'cat-true',
        name: 'Mindig Igaz (Azonosság)',
        description: 'Minden megengedett alap és kitevő esetén matematikailag helyes',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'Mindig Hamis (Tipikus hiba!)',
        description: 'Téves szabály vagy hibás kitevő-művelet',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-conditional',
        name: 'Csak Speciális Esetre Igaz',
        description: 'Egyforma tagok összeadására vagy paritási feltételre teljesül',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'aⁿ · aᵏ = aⁿ⁺ᵏ (azonos alapok szorzása)', category: 'cat-true' },
      { id: 's2-2', label: '(aⁿ)ᵏ = aⁿ·ᵏ (hatványozás hatványozása)', category: 'cat-true' },
      { id: 's2-3', label: '(a · b)ⁿ = aⁿ · bⁿ (szorzat hatványozása)', category: 'cat-true' },
      { id: 's2-4', label: 'a⁰ = 1 minden a ≠ 0 valós számra', category: 'cat-true' },
      { id: 's2-5', label: '2³ + 2⁴ = 2⁷ (összeadáskor kitevők NEM adódnak össze!)', category: 'cat-false' },
      { id: 's2-6', label: '(3x)² = 3x² (a 3 sincs négyzetre emelve: 9x² a jó!)', category: 'cat-false' },
      { id: 's2-7', label: 'a⁶ : a² = a³ (osztásnál kivonni kell: a⁴!)', category: 'cat-false' },
      { id: 's2-8', label: '(2³)² = 2⁵ (szorozni kell a kitevőket: 2⁶!)', category: 'cat-false' },
      { id: 's2-9', label: '2⁴ + 2⁴ = 2⁵ (két egyforma tag: 2 · 2⁴ = 2⁵)', category: 'cat-conditional' },
      { id: 's2-10', label: '3⁶ + 3⁶ + 3⁶ = 3⁷ (három egyforma tag: 3 · 3⁶)', category: 'cat-conditional' },
      { id: 's2-11', label: '(-a)ⁿ = aⁿ (csak akkor igaz, ha n páros!)', category: 'cat-conditional' },
      { id: 's2-12', label: '2ˣ = 32 esetén x = 5 (2⁵ = 32)', category: 'cat-conditional' }
    ]
  },
  3: {
    title: '3. Szint: Kiszámított Értékek Nagysága',
    subtitle: 'Válogasd szét a kifejezéseket aszerint, hogy az eredményük 1 alatti tört, 1 és 100 közötti, vagy 100 feletti!',
    categories: [
      {
        id: 'cat-less-than-1',
        name: '1-nél kisebb (0 < érték < 1)',
        description: 'Valódi törtek és 1 alatti tizedestörtek hatványai',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300'
      },
      {
        id: 'cat-between-1-100',
        name: '1 és 100 között (1 ≤ érték ≤ 100)',
        description: 'Közepes méretű egész számok és egyszerűsített törtek',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-above-100',
        name: '100-nál nagyobb érték (> 100)',
        description: 'Nagyobb hatványértékek és ezer feletti szorzatok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's3-1', label: '(1/2)³ = 1/8 = 0,125', category: 'cat-less-than-1' },
      { id: 's3-2', label: '(2/5)² = 4/25 = 0,16', category: 'cat-less-than-1' },
      { id: 's3-3', label: '(0,1)² = 0,01', category: 'cat-less-than-1' },
      { id: 's3-4', label: '3² / 3⁴ = 1/3² = 1/9', category: 'cat-less-than-1' },
      { id: 's3-5', label: '(2⁵ · 2³) / 2⁶ = 2² = 4', category: 'cat-between-1-100' },
      { id: 's3-6', label: '6³ : 2³ = (6/2)³ = 27', category: 'cat-between-1-100' },
      { id: 's3-7', label: '(2³)² = 2⁶ = 64', category: 'cat-between-1-100' },
      { id: 's3-8', label: '7⁴ / 7⁴ = 7⁰ = 1', category: 'cat-between-1-100' },
      { id: 's3-9', label: '(2 · 5)³ = 10³ = 1 000', category: 'cat-above-100' },
      { id: 's3-10', label: '2⁴ · 2⁴ = 2⁸ = 256', category: 'cat-above-100' },
      { id: 's3-11', label: '4² · 25² = 100² = 10 000', category: 'cat-above-100' },
      { id: 's3-12', label: '3³ · 3² = 3⁵ = 243', category: 'cat-above-100' }
    ]
  }
};

export const PowersApplicationSorter: React.FC<PowersApplicationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-application',
  topicTitle = '2. Hatványok alkalmazása'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Hatványozás Alkalmazása – Csoportosító"
      subtitle="Válaszd ki az elemet, és helyezd el a megfelelő szabály vagy értéktartomány szerint!"
      themeColor="amber"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default PowersApplicationSorter;
