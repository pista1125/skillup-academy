import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Chapter2KnowledgeTestSorterProps {
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
    title: '1. Szint: Számok és Halmazok Osztályozása (Könnyű)',
    subtitle: 'Sorold be a számokat a legszűkebb megfelelő számhalmaz-kategóriába!',
    categories: [
      {
        id: 'cat-integers',
        name: 'Egész számok (ℤ)',
        description: 'Pozitív és negatív egész számok, valamint a nulla',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-fractions',
        name: 'Tört racionálisak (ℚ \\ ℤ)',
        description: 'Nem egész, de két egész hányadosaként felírható számok',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-irrationals',
        name: 'Irracionális számok (ℝ \\ ℚ)',
        description: 'Végtelen nem szakaszos tizedestörtek, gyökök, π',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'cs-1-1', label: '-8 (negatív egész)', category: 'cat-integers' },
      { id: 'cs-1-2', label: '0 (természetes egész)', category: 'cat-integers' },
      { id: 'cs-1-3', label: '√49 (= 7 egész szám)', category: 'cat-integers' },
      { id: 'cs-1-4', label: '-24 / 4 (= -6 egész szám)', category: 'cat-integers' },
      { id: 'cs-1-5', label: '3 / 4 (közönséges tört)', category: 'cat-fractions' },
      { id: 'cs-1-6', label: '-2,5 (véges tizedestört)', category: 'cat-fractions' },
      { id: 'cs-1-7', label: '0,3̇ (0,333... = 1/3)', category: 'cat-fractions' },
      { id: 'cs-1-8', label: '7 / 8 (közönséges tört)', category: 'cat-fractions' },
      { id: 'cs-1-9', label: '√2 (irracionális)', category: 'cat-irrationals' },
      { id: 'cs-1-10', label: 'π (Ludolph-féle szám)', category: 'cat-irrationals' },
      { id: 'cs-1-11', label: '√7 (nem négyzetszám gyöke)', category: 'cat-irrationals' },
      { id: 'cs-1-12', label: '1 - √3 (irracionális különbség)', category: 'cat-irrationals' }
    ]
  },
  2: {
    title: '2. Szint: Kifejezések Értéktartománya (Közepes)',
    subtitle: 'Csoportosítsd a matematikai kifejezéseket azok numerikus értéke szerint!',
    categories: [
      {
        id: 'cat-negative',
        name: 'Negatív értékek (x < 0)',
        description: 'Nullánál kisebb valós számok',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-small-pos',
        name: '0 és 1 közötti értékek (0 < x < 1)',
        description: 'Pozitív valódi törtek és kis tizedesek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-large-pos',
        name: '1-nél nagyobb értékek (x > 1)',
        description: 'Egynél nagyobb pozitív számok és hatványok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'cs-2-1', label: '-3² (értéke: -9)', category: 'cat-negative' },
      { id: 'cs-2-2', label: '-√25 (értéke: -5)', category: 'cat-negative' },
      { id: 'cs-2-3', label: '(-2)³ (értéke: -8)', category: 'cat-negative' },
      { id: 'cs-2-4', label: '1 - √5 (értéke kb. -1,236)', category: 'cat-negative' },
      { id: 'cs-2-5', label: '2⁻³ (értéke: 1/8 = 0,125)', category: 'cat-small-pos' },
      { id: 'cs-2-6', label: '(0,5)² (értéke: 0,25)', category: 'cat-small-pos' },
      { id: 'cs-2-7', label: '√0,49 (értéke: 0,7)', category: 'cat-small-pos' },
      { id: 'cs-2-8', label: '4 · 10⁻² (értéke: 0,04)', category: 'cat-small-pos' },
      { id: 'cs-2-9', label: '2⁵ (értéke: 32)', category: 'cat-large-pos' },
      { id: 'cs-2-10', label: '√81 (értéke: 9)', category: 'cat-large-pos' },
      { id: 'cs-2-11', label: '1,08⁴ (értéke kb. 1,36)', category: 'cat-large-pos' },
      { id: 'cs-2-12', label: '3,2 · 10³ (értéke: 3200)', category: 'cat-large-pos' }
    ]
  },
  3: {
    title: '3. Szint: Folyamatok és Matematikai Modellek (Nehéz)',
    subtitle: 'Sorold be a gyakorlati jelenségeket a megfelelő matematikai modell alá!',
    categories: [
      {
        id: 'cat-direct',
        name: 'Egyenes arányosság (y / x = k)',
        description: 'Kétszer annyi bemenethez kétszer annyi kimenet tartozik',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-inverse',
        name: 'Fordított arányosság (x · y = k)',
        description: 'Kétszer akkora értékhez feleakkora partner tartozik',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-exponential',
        name: 'Exponenciális modell (Tₙ = T₀ · qⁿ)',
        description: 'Évről évre azonos százalékos szorzótényezővel változik',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'cs-3-1', label: 'Vásárolt alma tömege és a fizetendő ár', category: 'cat-direct' },
      { id: 'cs-3-2', label: 'Állandó sebességgel haladó autó útja az idő függvényében', category: 'cat-direct' },
      { id: 'cs-3-3', label: 'Munkaórák száma és az órabér alapú fizetés', category: 'cat-direct' },
      { id: 'cs-3-4', label: 'Üzemanyag mennyisége és a megtett távolság', category: 'cat-direct' },
      { id: 'cs-3-5', label: 'Munkások száma és az árokásás időtartama', category: 'cat-inverse' },
      { id: 'cs-3-6', label: 'Adott távolság megtételének sebessége és menetideje', category: 'cat-inverse' },
      { id: 'cs-3-7', label: 'Téglalap oldalai rögzített terület esetén (a · b = T)', category: 'cat-inverse' },
      { id: 'cs-3-8', label: 'Közös nyeremény egy főre jutó része a nyertesek számával', category: 'cat-inverse' },
      { id: 'cs-3-9', label: 'Lekötött bankbetét egyenlege kamatos kamattal (Tₙ = T₀ · qⁿ)', category: 'cat-exponential' },
      { id: 'cs-3-10', label: 'Személyautó amortizációja évi fix 15%-os értékvesztéssel', category: 'cat-exponential' },
      { id: 'cs-3-11', label: 'Baktériumtenyészet óránkénti megduplázódása', category: 'cat-exponential' },
      { id: 'cs-3-12', label: 'Pénz vásárlóerejének romlása évi fix 8%-os infláció mellett', category: 'cat-exponential' }
    ]
  }
};

export const Chapter2KnowledgeTestSorter: React.FC<Chapter2KnowledgeTestSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-szamok-tudasproba-sorter',
  topicTitle = 'II. Fejezeti Összefoglalás & Tudáspróba'
}) => {
  const activeLevel = currentLevel || level;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`c2-test-sorter-${activeLevel}`}
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

export default Chapter2KnowledgeTestSorter;
