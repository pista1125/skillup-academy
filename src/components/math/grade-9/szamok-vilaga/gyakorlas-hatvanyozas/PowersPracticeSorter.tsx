import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersPracticeSorterProps {
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
    title: '1. Szint: Kifejezések Egyszerűsítési Módszere (Könnyű)',
    subtitle: 'Milyen algebrai lépéssel indulunk a kifejezés legegyszerűbb alakra hozásához?',
    categories: [
      {
        id: 'cat-prime',
        name: 'Prímalapokra bontás',
        description: 'Összetett számok (4, 6, 8, 9, 12) átírása prímhatványokká',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-move',
        name: 'Törtvonalon átmozgatás',
        description: 'Negatív kitevőjű tényezők le- vagy felküldése a törtvonalon',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-power',
        name: 'Szorzat vagy tört hatványozása',
        description: 'Zárójel felbontása: minden belső tényező kitevőre emelése',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'pps1-1', label: '6⁴ / (2³ · 3⁴) átírása prímekre', category: 'cat-prime' },
      { id: 'pps1-2', label: '8² · 4³ átalakítása 2 hatványaként', category: 'cat-prime' },
      { id: 'pps1-3', label: '9⁵ / 27³ egyszerűsítése 3 hatványaként', category: 'cat-prime' },
      { id: 'pps1-4', label: '12³ felírása (2² · 3)³ prímhatványként', category: 'cat-prime' },
      { id: 'pps1-5', label: 'x⁻³ / y⁻² átírása pozitív kitevőkre: y² / x³', category: 'cat-move' },
      { id: 'pps1-6', label: 'a · b⁻⁴ átalakítása a / b⁴ törtalakra', category: 'cat-move' },
      { id: 'pps1-7', label: '1 / 5⁻³ átírása pozitív 5³-ra', category: 'cat-move' },
      { id: 'pps1-8', label: '(x⁻² y³) / z⁻¹ átmozgatása: (y³ z) / x²', category: 'cat-move' },
      { id: 'pps1-9', label: '(3x²)³ kifejtése 27x⁶-ra', category: 'cat-power' },
      { id: 'pps1-10', label: '(2/5)³ kiszámítása 8/125-re', category: 'cat-power' },
      { id: 'pps1-11', label: '(a⁴ b⁻³)⁻² kifejtése a⁻⁸ b⁶-ra', category: 'cat-power' },
      { id: 'pps1-12', label: '(5x)⁴ felbontása 625x⁴-re', category: 'cat-power' }
    ]
  },
  2: {
    title: '2. Szint: Összehasonlítási és Kiemelési Stratégiák (Közepes)',
    subtitle: 'Milyen matematikai stratégiával oldjuk meg az adott feladatot?',
    categories: [
      {
        id: 'cat-common-base',
        name: 'Közös alapra hozás',
        description: 'Az alapok ugyanannak a számnak a hatványai (pl. 4 és 8 -> 2)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-common-exp',
        name: 'Közös kitevőre hozás',
        description: 'A kitevők közös osztójának kiemelése (pl. 300 és 200 -> 100)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-factor',
        name: 'Közös tényező kiemelése',
        description: 'Hatványok összege vagy különbsége esetén a legkisebb kitevő kiemelése',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'pps2-1', label: '4¹⁵ és 8¹⁰ összehasonlítása 2³⁰ alapon', category: 'cat-common-base' },
      { id: 'pps2-2', label: '9⁴ és 27² összehasonlítása 3 hatványaként', category: 'cat-common-base' },
      { id: 'pps2-3', label: '25¹⁰ és 5²² viszonyának eldöntése', category: 'cat-common-base' },
      { id: 'pps2-4', label: '16³ és 8⁴ összehasonlítása 2-es alapon', category: 'cat-common-base' },
      { id: 'pps2-5', label: '2³⁰⁰ és 3²⁰⁰ összehasonlítása 100-as kitevővel', category: 'cat-common-exp' },
      { id: 'pps2-6', label: '3⁴⁰ és 5²⁰ összehasonlítása 20-as kitevővel', category: 'cat-common-exp' },
      { id: 'pps2-7', label: '2⁵⁰ és 5²⁰ összehasonlítása 10-es kitevővel', category: 'cat-common-exp' },
      { id: 'pps2-8', label: '4³⁰ és 3⁶⁰ viszonya 30-as közös kitevővel', category: 'cat-common-exp' },
      { id: 'pps2-9', label: '(2¹⁰ + 2¹²) / 2¹⁰ számlálójának átalakítása', category: 'cat-factor' },
      { id: 'pps2-10', label: '(3ⁿ⁺¹ + 3ⁿ) / 3ⁿ számlálójának rendezése', category: 'cat-factor' },
      { id: 'pps2-11', label: '5¹⁰⁰ - 5⁹⁸ szorzattá alakítása 5⁹⁸(24)-re', category: 'cat-factor' },
      { id: 'pps2-12', label: '(7⁸ + 7⁶) / 50 tört egyszerűsítése', category: 'cat-factor' }
    ]
  },
  3: {
    title: '3. Szint: Speciális Esetek és Érettségi Csapdák (Haladó)',
    subtitle: 'Rendszerezd az érettségin gyakori trükkös eseteket és típusokat!',
    categories: [
      {
        id: 'cat-fraction-base',
        name: 'Tört alap (0 < a < 1)',
        description: '1-nél kisebb pozitív alapnál a nagyobb kitevőhöz KISEBB érték tartozik',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-tower',
        name: 'Toronyhatvány és műveleti sorrend',
        description: 'Zárójelek hiányában a hatványozás fentről lefelé hajtódik végre',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-identity-sum',
        name: 'Azonos tagok összeadása',
        description: 'Egyforma tagok összege szorzásba megy át (pl. 3ˣ + 3ˣ + 3ˣ = 3 · 3ˣ)',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      }
    ],
    items: [
      { id: 'pps3-1', label: '(0,5)³ > (0,5)⁵ reláció felismerése', category: 'cat-fraction-base' },
      { id: 'pps3-2', label: '(1/3)⁴ < (1/3)² viszony indoklása', category: 'cat-fraction-base' },
      { id: 'pps3-3', label: '(0,2)⁻³ = 5³ = 125 reciprokos kiszámítása', category: 'cat-fraction-base' },
      { id: 'pps3-4', label: '(3/4)⁻² = (4/3)² = 16/9 átírása', category: 'cat-fraction-base' },
      { id: 'pps3-5', label: '2³² = 2⁹ = 512 kiszámítása fentről lefelé', category: 'cat-tower' },
      { id: 'pps3-6', label: '(2³)² = 2⁶ = 64 szorzási azonossága', category: 'cat-tower' },
      { id: 'pps3-7', label: '-3² = -9 előjeles sorrend értelmezése', category: 'cat-tower' },
      { id: 'pps3-8', label: '(-3)² = +9 zárójeles hatványérték', category: 'cat-tower' },
      { id: 'pps3-9', label: '3ˣ + 3ˣ + 3ˣ = 3 · 3ˣ = 3^(x+1)', category: 'cat-identity-sum' },
      { id: 'pps3-10', label: '2ⁿ + 2ⁿ = 2 · 2ⁿ = 2^(n+1)', category: 'cat-identity-sum' },
      { id: 'pps3-11', label: '5ᵏ + 5ᵏ + 5ᵏ + 5ᵏ = 4 · 5ᵏ', category: 'cat-identity-sum' },
      { id: 'pps3-12', label: '10 · 10ⁿ = 10^(n+1) átalakítása', category: 'cat-identity-sum' }
    ]
  }
};

export const PowersPracticeSorter: React.FC<PowersPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-szamok-gyakorlas-hatvany-sorter',
  topicTitle = 'Hatványozás Gyakorlása'
}) => {
  const activeLevel = currentLevel || level;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`powprac-sorter-${activeLevel}`}
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
      themeColor="rose"
    />
  );
};

export default PowersPracticeSorter;
