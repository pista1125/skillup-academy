import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ScientificCalculationSorterProps {
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
    title: '1. Szint: Utólagos Normálás és Korrekció (Könnyű)',
    subtitle: 'Milyen lépés szükséges a kapott köztes alak szabályos normálalakká tételéhez?',
    categories: [
      {
        id: 'cat-ready',
        name: 'Kész szabályos alak',
        description: 'A kapott mantissza már eleve az 1 ≤ |a| < 10 sávba esik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-shift-left',
        name: 'Vessző balra, kitevő NŐ',
        description: 'A kapott mantissza ≥ 10, így 1-gyel balra lépünk, k növekszik',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-shift-right',
        name: 'Vessző jobbra, kitevő CSÖKKEN',
        description: 'A kapott mantissza < 1, így 1-gyel jobbra lépünk, k csökken',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      { id: 'scs-1-1', label: '(2 · 10³) · (3 · 10⁴) = 6 · 10⁷', category: 'cat-ready' },
      { id: 'scs-1-2', label: '(8 · 10⁶) / (2 · 10²) = 4 · 10⁴', category: 'cat-ready' },
      { id: 'scs-1-3', label: '(3 · 10⁵) + (4 · 10⁵) = 7 · 10⁵', category: 'cat-ready' },
      { id: 'scs-1-4', label: '(9 · 10⁻⁴) - (1 · 10⁻⁴) = 8 · 10⁻⁴', category: 'cat-ready' },
      { id: 'scs-1-5', label: '(4 · 10⁵) · (5 · 10³) = 20 · 10⁸', category: 'cat-shift-left' },
      { id: 'scs-1-6', label: '(6 · 10⁴) · (3 · 10⁶) = 18 · 10¹⁰', category: 'cat-shift-left' },
      { id: 'scs-1-7', label: '(7 · 10²) · (8 · 10⁻⁵) = 56 · 10⁻³', category: 'cat-shift-left' },
      { id: 'scs-1-8', label: '(5 · 10⁷) + (8 · 10⁷) = 13 · 10⁷', category: 'cat-shift-left' },
      { id: 'scs-1-9', label: '(2 · 10⁸) / (5 · 10³) = 0,4 · 10⁵', category: 'cat-shift-right' },
      { id: 'scs-1-10', label: '(1 · 10⁴) / (8 · 10²) = 0,125 · 10²', category: 'cat-shift-right' },
      { id: 'scs-1-11', label: '(3 · 10⁻²) / (6 · 10⁻⁴) = 0,5 · 10²', category: 'cat-shift-right' },
      { id: 'scs-1-12', label: '(4 · 10⁵) - (3,8 · 10⁵) = 0,2 · 10⁵', category: 'cat-shift-right' }
    ]
  },
  2: {
    title: '2. Szint: SI Prefixumok Csoportosítása (Közepes)',
    subtitle: 'Csoportosítsd a mértékegység-előtagokat a nagyságrendi hatványuk szerint!',
    categories: [
      {
        id: 'cat-macro',
        name: 'Nagyító prefixek (10³ – 10¹²)',
        description: 'Pozitív kitevőjű többszörösök: kilo, Mega, Giga, Tera',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-micro',
        name: 'Kicsinyítő prefixek (10⁻³ – 10⁻¹²)',
        description: 'Negatív kitevőjű törtrészek: milli, mikro, nano, piko',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-base',
        name: 'Alapegység nagyságrend (10⁰ = 1)',
        description: 'Előtag nélküli alapegységek, ahol a szorzótényező pontosan 1',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'scs-2-1', label: 'Tera (T, 10¹²)', category: 'cat-macro' },
      { id: 'scs-2-2', label: 'Giga (G, 10⁹)', category: 'cat-macro' },
      { id: 'scs-2-3', label: 'Mega (M, 10⁶)', category: 'cat-macro' },
      { id: 'scs-2-4', label: 'kilo (k, 10³)', category: 'cat-macro' },
      { id: 'scs-2-5', label: 'milli (m, 10⁻³)', category: 'cat-micro' },
      { id: 'scs-2-6', label: 'mikro (µ, 10⁻⁶)', category: 'cat-micro' },
      { id: 'scs-2-7', label: 'nano (n, 10⁻⁹)', category: 'cat-micro' },
      { id: 'scs-2-8', label: 'piko (p, 10⁻¹²)', category: 'cat-micro' },
      { id: 'scs-2-9', label: '1 méter (10⁰ m)', category: 'cat-base' },
      { id: 'scs-2-10', label: '1 másodperc (10⁰ s)', category: 'cat-base' },
      { id: 'scs-2-11', label: '1 Joule (10⁰ J)', category: 'cat-base' },
      { id: 'scs-2-12', label: '1 Watt (10⁰ W)', category: 'cat-base' }
    ]
  },
  3: {
    title: '3. Szint: Helyes Műveleti Stratégia (Nehéz)',
    subtitle: 'Milyen matematikai lépéssel kell megoldani az adott feladatot?',
    categories: [
      {
        id: 'cat-direct-power',
        name: 'Kitevők összeadása / kivonása',
        description: 'Szorzás és osztás: mantisszák művelete, kitevők közvetlen összevonása',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-align-exponent',
        name: 'Közös kitevőre hozás (Kiemelés)',
        description: 'Összeadás és kivonás: előbb a tizedesvessző léptetésével közös kitevőt készítünk',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-power-mult',
        name: 'Kitevők összeszorzása (Hatványozás)',
        description: '(a · 10ᵏ)ⁿ = aⁿ · 10ᵏ·ⁿ, ahol a hatványkitevőket szorozzuk',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      { id: 'scs-3-1', label: '(3 · 10⁵) · (2 · 10⁴) kiszámítása', category: 'cat-direct-power' },
      { id: 'scs-3-2', label: '(8 · 10⁹) / (4 · 10³) kiszámítása', category: 'cat-direct-power' },
      { id: 'scs-3-3', label: '(1,5 · 10⁻²) · (6 · 10⁻⁵) kiszámítása', category: 'cat-direct-power' },
      { id: 'scs-3-4', label: '(7 · 10⁻⁴) / (2 · 10⁻⁸) kiszámítása', category: 'cat-direct-power' },
      { id: 'scs-3-5', label: '4,2 · 10⁶ + 3 · 10⁵ kiszámítása', category: 'cat-align-exponent' },
      { id: 'scs-3-6', label: '8 · 10⁴ - 5 · 10³ kiszámítása', category: 'cat-align-exponent' },
      { id: 'scs-3-7', label: '9,5 · 10⁻³ + 4 · 10⁻⁴ kiszámítása', category: 'cat-align-exponent' },
      { id: 'scs-3-8', label: '6 · 10⁵ - 2,5 · 10⁴ kiszámítása', category: 'cat-align-exponent' },
      { id: 'scs-3-9', label: '(2 · 10⁴)³ kiszámítása', category: 'cat-power-mult' },
      { id: 'scs-3-10', label: '(3 · 10⁻²)² kiszámítása', category: 'cat-power-mult' },
      { id: 'scs-3-11', label: '(1 · 10⁵)⁴ kiszámítása', category: 'cat-power-mult' },
      { id: 'scs-3-12', label: '(5 · 10⁻³)² kiszámítása', category: 'cat-power-mult' }
    ]
  }
};

export const ScientificCalculationSorter: React.FC<ScientificCalculationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-szamok-szamolas-normalalak-sorter',
  topicTitle = 'Számolás normálalakkal'
}) => {
  const activeLevel = currentLevel || level;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`sc-sorter-${activeLevel}`}
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
      themeColor="amber"
    />
  );
};

export default ScientificCalculationSorter;
