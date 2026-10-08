import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LargeNumbersPowersSorterProps {
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
    title: '1. Szint: Hatványértékek Előjele és Különleges Esetek',
    subtitle: 'Döntsd el, hogy az adott hatvány kifejezés értéke pozitív, negatív, vagy pontosan 0 illetve 1!',
    categories: [
      {
        id: 'cat-positive',
        name: 'Pozitív érték (> 0)',
        description: 'Páros kitevő negatív alapnál, vagy pozitív alap bármely hatványa',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-negative',
        name: 'Negatív érték (< 0)',
        description: 'Páratlan kitevő negatív alapnál, vagy zárójel nélküli mínusz előjel',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-zero-one',
        name: 'Pontosan 0 vagy 1',
        description: 'Nulladik hatványok (a⁰ = 1), 1 hatványai, vagy 0 pozitív kitevőjű hatványai',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's1-1', label: '(-3)⁴ = +81', category: 'cat-positive' },
      { id: 's1-2', label: '(-5)² = +25', category: 'cat-positive' },
      { id: 's1-3', label: '2⁵ = +32', category: 'cat-positive' },
      { id: 's1-4', label: '(-1)¹⁰⁰ (páros kitevő)', category: 'cat-positive' },
      { id: 's1-5', label: '(-2)³ = -8', category: 'cat-negative' },
      { id: 's1-6', label: '-4² = -16 (zárójel nélkül!)', category: 'cat-negative' },
      { id: 's1-7', label: '(-1)⁹⁹ (páratlan kitevő)', category: 'cat-negative' },
      { id: 's1-8', label: '-10⁴ = -10 000 (-(10⁴))', category: 'cat-negative' },
      { id: 's1-9', label: '7⁰ = 1 (a⁰ = 1, ha a ≠ 0)', category: 'cat-zero-one' },
      { id: 's1-10', label: '(-9)⁰ = 1 (zárójelben, 0. kitevő)', category: 'cat-zero-one' },
      { id: 's1-11', label: '0⁵ = 0 (0 · 0 · 0 · 0 · 0)', category: 'cat-zero-one' },
      { id: 's1-12', label: '1²⁰²⁴ = 1 (1 bármely hatványa)', category: 'cat-zero-one' }
    ]
  },
  2: {
    title: '2. Szint: Normálalak Felismerése és Hibái',
    subtitle: 'Szabályos a normálalak, vagy az első tényező túl nagy (a ≥ 10), esetleg túl kicsi (a < 1)?',
    categories: [
      {
        id: 'cat-valid-scientific',
        name: 'Szabályos normálalak',
        description: 'a · 10ⁿ alakú, ahol pontosan 1 ≤ a < 10 és n egész szám',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      },
      {
        id: 'cat-too-large',
        name: 'Túl nagy: a ≥ 10',
        description: 'Nem normálalak, mert az első tényező 10 vagy annál nagyobb',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300'
      },
      {
        id: 'cat-too-small',
        name: 'Túl kicsi: a < 1',
        description: 'Nem normálalak, mert az első tényező nem éri el az 1-et',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: '3,8 · 10⁵ (1 ≤ 3,8 < 10)', category: 'cat-valid-scientific' },
      { id: 's2-2', label: '1,0 · 10⁸ (1 még megengedett)', category: 'cat-valid-scientific' },
      { id: 's2-3', label: '9,99 · 10⁴ (9,99 még < 10)', category: 'cat-valid-scientific' },
      { id: 's2-4', label: '5 · 10³ (egész szám 1 és 10 között)', category: 'cat-valid-scientific' },
      { id: 's2-5', label: '45 · 10⁶ (45 ≥ 10, nem normálalak)', category: 'cat-too-large' },
      { id: 's2-6', label: '10 · 10⁴ (az első tényező pont 10)', category: 'cat-too-large' },
      { id: 's2-7', label: '350 · 10² (350 jóval nagyobb mint 10)', category: 'cat-too-large' },
      { id: 's2-8', label: '12,4 · 10⁵ (12,4 > 10, helyesen: 1,24 · 10⁶)', category: 'cat-too-large' },
      { id: 's2-9', label: '0,6 · 10⁷ (0,6 < 1, túl kicsi)', category: 'cat-too-small' },
      { id: 's2-10', label: '0,08 · 10⁴ (0,08 < 1, helyesen: 8 · 10²)', category: 'cat-too-small' },
      { id: 's2-11', label: '0,95 · 10³ (0,95 nem éri el az 1-et)', category: 'cat-too-small' },
      { id: 's2-12', label: '0,001 · 10⁸ (0,001 < 1, helyesen: 1 · 10⁵)', category: 'cat-too-small' }
    ]
  },
  3: {
    title: '3. Szint: Nagyságrendek és 10-hatványok Besorolása',
    subtitle: 'Válogasd szét a kifejezéseket és valós adatokat az értékeik nagyságrendje szerint!',
    categories: [
      {
        id: 'cat-thousand',
        name: 'Ezres nagyságrend (10³ – 10⁵)',
        description: 'Néhány ezer és százezer között (4–6 számjegy, kilo-)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-million',
        name: 'Milliós nagyságrend (10⁶ – 10⁸)',
        description: 'Egymillió és százmillió között (7–9 számjegy, mega-)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300'
      },
      {
        id: 'cat-billion-plus',
        name: 'Milliárd és afölött (10⁹+)',
        description: 'Egymilliárd, billió és csillagászati értékek (10+ számjegy, giga-, tera-)',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300'
      }
    ],
    items: [
      { id: 's3-1', label: '4,2 · 10⁴ (42 000, negyvenkétezer)', category: 'cat-thousand' },
      { id: 's3-2', label: '8 · 10³ (8 000, nyolcezer)', category: 'cat-thousand' },
      { id: 's3-3', label: '6,5 · 10⁵ (650 000, hatszázötvenezer)', category: 'cat-thousand' },
      { id: 's3-4', label: '10⁴ (10 000, tízezer)', category: 'cat-thousand' },
      { id: 's3-5', label: '3 · 10⁶ (3 000 000, hárommillió)', category: 'cat-million' },
      { id: 's3-6', label: '9,6 · 10⁶ (Magyarország lakossága kb. 9,6 millió fő)', category: 'cat-million' },
      { id: 's3-7', label: '5,4 · 10⁷ (54 000 000, ötvennégymillió)', category: 'cat-million' },
      { id: 's3-8', label: '10⁸ (100 000 000, százmillió)', category: 'cat-million' },
      { id: 's3-9', label: '8 · 10⁹ (A Föld lakossága: kb. 8 milliárd ember)', category: 'cat-billion-plus' },
      { id: 's3-10', label: '1,5 · 10¹¹ m (Nap–Föld távolság: 150 milliárd méter)', category: 'cat-billion-plus' },
      { id: 's3-11', label: '4,5 · 10⁹ év (A Föld kora kb. 4,5 milliárd év)', category: 'cat-billion-plus' },
      { id: 's3-12', label: '10¹² (1 billió = 1 000 000 000 000)', category: 'cat-billion-plus' }
    ]
  }
};

export const LargeNumbersPowersSorter: React.FC<LargeNumbersPowersSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-large-numbers',
  topicTitle = '1. Nagy számok és a hatványalak'
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
      title="Nagy számok és Hatványok Csoportosító"
      subtitle="Válaszd ki az elemet, és helyezd el a megfelelő kategóriában!"
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

export default LargeNumbersPowersSorter;
