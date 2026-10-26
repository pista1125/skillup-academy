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
    title: '1. Szint: Mantissza Érvényessége (Könnyű)',
    subtitle: 'Kategorizáld a felírásokat az a · 10ᵏ mantissza szabálya (1 ≤ |a| < 10) alapján!',
    categories: [
      {
        id: 'cat-valid',
        name: 'Szabályos normálalak',
        description: 'A mantissza 1 és 10 közé esik (1 ≤ |a| < 10)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-too-large',
        name: 'Túl nagy mantissza (|a| ≥ 10)',
        description: 'A mantissza legalább 10, még osztani kell 10 hatványával',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-too-small',
        name: 'Túl kicsi mantissza (|a| < 1)',
        description: 'A mantissza 1-nél kisebb tizedestört, szorozni kell 10 hatványával',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'sn-s1-1', label: '3,45 · 10⁶', category: 'cat-valid' },
      { id: 'sn-s1-2', label: '8 · 10⁻⁴', category: 'cat-valid' },
      { id: 'sn-s1-3', label: '1,0 · 10⁰', category: 'cat-valid' },
      { id: 'sn-s1-4', label: '-7,2 · 10¹²', category: 'cat-valid' },
      { id: 'sn-s1-5', label: '45 · 10³', category: 'cat-too-large' },
      { id: 'sn-s1-6', label: '12,8 · 10⁻⁵', category: 'cat-too-large' },
      { id: 'sn-s1-7', label: '10 · 10⁴ (a 10 nem megengedett!)', category: 'cat-too-large' },
      { id: 'sn-s1-8', label: '100 · 10⁻²', category: 'cat-too-large' },
      { id: 'sn-s1-9', label: '0,45 · 10⁶', category: 'cat-too-small' },
      { id: 'sn-s1-10', label: '0,08 · 10⁻²', category: 'cat-too-small' },
      { id: 'sn-s1-11', label: '0,999 · 10⁸', category: 'cat-too-small' },
      { id: 'sn-s1-12', label: '-0,6 · 10⁻⁴', category: 'cat-too-small' }
    ]
  },
  2: {
    title: '2. Szint: Kitevő Jellege és Nagyságrend (Közepes)',
    subtitle: 'Csoportosítsd a mennyiségeket a 10 kitevőjének előjele és nagyságrendje szerint!',
    categories: [
      {
        id: 'cat-macro',
        name: 'Nagy szám (k > 0)',
        description: 'Értéke legalább 10, pozitív kitevőjű tízhatvány szorzata',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-micro',
        name: 'Kis tizedestört (k < 0)',
        description: '0 és 1 közötti pozitív érték, negatív kitevőjű tízhatvány szorzata',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-unit',
        name: 'Egységnyi nagyságrend (k = 0)',
        description: 'Értéke 1 és 10 közé esik, kitevője pontosan 0 (10⁰ = 1)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'sn-s2-1', label: '1,5 · 10⁸ km (Föld-Nap távolság)', category: 'cat-macro' },
      { id: 'sn-s2-2', label: '6,022 · 10²³ (Avogadro-szám)', category: 'cat-macro' },
      { id: 'sn-s2-3', label: '3 · 10⁴ (30 000)', category: 'cat-macro' },
      { id: 'sn-s2-4', label: '9,9 · 10¹ (99)', category: 'cat-macro' },
      { id: 'sn-s2-5', label: '1,6 · 10⁻¹⁹ C (Elemi töltés)', category: 'cat-micro' },
      { id: 'sn-s2-6', label: '5 · 10⁻⁶ m (Vörösvértest mérete)', category: 'cat-micro' },
      { id: 'sn-s2-7', label: '2,4 · 10⁻¹ (0,24)', category: 'cat-micro' },
      { id: 'sn-s2-8', label: '8 · 10⁻³ (0,008)', category: 'cat-micro' },
      { id: 'sn-s2-9', label: '5 · 10⁰ (5)', category: 'cat-unit' },
      { id: 'sn-s2-10', label: '1,414 · 10⁰ (kb. √2)', category: 'cat-unit' },
      { id: 'sn-s2-11', label: '9,8 · 10⁰ m/s² (Nehézségi gyorsulás)', category: 'cat-unit' },
      { id: 'sn-s2-12', label: '3,14 · 10⁰ (kb. π)', category: 'cat-unit' }
    ]
  },
  3: {
    title: '3. Szint: Vesszőléptetés és Javítás Iránya (Nehéz)',
    subtitle: 'Milyen lépéssel alakítható át a kifejezés szabályos normálalakká?',
    categories: [
      {
        id: 'cat-shift-left',
        name: 'Vessző balra tolása (k nő)',
        description: 'A mantisszát osztjuk 10 hatványával, ezért a kitevő növekszik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-shift-right',
        name: 'Vessző jobbra tolása (k csökken)',
        description: 'A mantisszát szorozzuk 10 hatványával, ezért a kitevő csökken',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-no-shift',
        name: 'Kész alak (nem kell léptetni)',
        description: 'A felírás már eleve szabályos a · 10ᵏ alakban van',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      }
    ],
    items: [
      { id: 'sn-s3-1', label: '52 000 átírása normálalakra', category: 'cat-shift-left' },
      { id: 'sn-s3-2', label: '450 · 10³ javítása szabályos normálalakra', category: 'cat-shift-left' },
      { id: 'sn-s3-3', label: '18,2 · 10⁻⁴ javítása szabályos alakra', category: 'cat-shift-left' },
      { id: 'sn-s3-4', label: '3 000 000 felírása normálalakban', category: 'cat-shift-left' },
      { id: 'sn-s3-5', label: '0,00078 átírása normálalakra', category: 'cat-shift-right' },
      { id: 'sn-s3-6', label: '0,05 · 10⁶ javítása szabályos alakra', category: 'cat-shift-right' },
      { id: 'sn-s3-7', label: '0,3 · 10⁻² javítása szabályos alakra', category: 'cat-shift-right' },
      { id: 'sn-s3-8', label: '0,000004 felírása normálalakban', category: 'cat-shift-right' },
      { id: 'sn-s3-9', label: '7,25 · 10⁵ ellenőrzése', category: 'cat-no-shift' },
      { id: 'sn-s3-10', label: '1,0 · 10⁻⁹ ellenőrzése', category: 'cat-no-shift' },
      { id: 'sn-s3-11', label: '9,99 · 10² ellenőrzése', category: 'cat-no-shift' },
      { id: 'sn-s3-12', label: '4 · 10⁰ ellenőrzése', category: 'cat-no-shift' }
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
  topicId = 'g9-szamok-normalalak-sorter',
  topicTitle = 'Számok normálalakja'
}) => {
  const activeLevel = currentLevel || level;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`sn-sorter-${activeLevel}`}
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
      themeColor="emerald"
    />
  );
};

export default ScientificNotationSorter;
