import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GroupCompetitionSorterProps {
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
    title: 'Gyakori típushibák osztályozása',
    subtitle: 'Válogasd szét a hibás levezetéseket aszerint, hogy milyen jellegű hibát követtek el bennük!',
    categories: [
      {
        id: 'cat-sign',
        name: 'Előjel- & Zárójelhiba',
        description: 'b = -5 esetén b² = -25, vagy -b esetén az előjel nem váltott.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-denominator',
        name: 'Nevező- & Osztáshiba',
        description: 'Osztás 2-vel 2a helyett, vagy ismeretlennel leosztva nullagyök vesztése.',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-domain',
        name: 'Kikötés- & Hamis gyök hiba',
        description: 'Nullával való osztás nevezőben, négyzetre emelésből származó hamis gyök.',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'gcs1-1', content: 'b = -4 esetén b² = -16 leírása', categoryId: 'cat-sign' },
      { id: 'gcs1-2', content: '4x² - 12x = 0 leosztása x-szel (4x - 12 = 0 ⟹ x = 3)', categoryId: 'cat-denominator' },
      { id: 'gcs1-3', content: 'Törtesnél az x = 2 gyököt elfogadjuk (x - 2) nevező mellett', categoryId: 'cat-domain' },
      { id: 'gcs1-4', content: '2x² + 6x - 8 = 0 megoldásánál a nevezőbe 2-t írunk 4 helyett', categoryId: 'cat-denominator' },
      { id: 'gcs1-5', content: 'b = -7 esetén a képlet elé -7 kerül +7 helyett', categoryId: 'cat-sign' },
      { id: 'gcs1-6', content: '√(x + 5) = x - 1 egyenletnél x = -1 gyököt nem ellenőrizzük', categoryId: 'cat-domain' },
      { id: 'gcs1-7', content: '(-3)² = -9 számolása a diszkriminánsban', categoryId: 'cat-sign' },
      { id: 'gcs1-8', content: 'x² = 25 egyenlet megoldása csak x = 5 (-5 elfelejtve)', categoryId: 'cat-denominator' },
      { id: 'gcs1-9', content: 'Szöveges mozgásnál v = -50 km/h elfogadása válaszként', categoryId: 'cat-domain' }
    ]
  },
  2: {
    title: 'Diszkrimináns villámgyors becslése',
    subtitle: 'Sorold be az egyenleteket a valós gyökök száma szerint fejszámolással!',
    categories: [
      {
        id: 'cat-two-roots',
        name: '2 valós gyök (D > 0)',
        description: 'a és c eltérő előjelű (ac < 0), vagy nagy b² érték.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one-root',
        name: '1 kettős gyök (D = 0)',
        description: 'Teljes négyzet (x ± d)² = 0, diszkrimináns pontosan nulla.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-zero-roots',
        name: '0 valós gyök (D < 0)',
        description: 'Pozitív négyzet plusz pozitív konstans, nincs valós megoldás.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'gcs2-1', content: '3x² + 5x - 7 = 0 (ac < 0)', categoryId: 'cat-two-roots' },
      { id: 'gcs2-2', content: 'x² - 8x + 16 = 0 (x - 4)²', categoryId: 'cat-one-root' },
      { id: 'gcs2-3', content: 'x² + 2x + 10 = 0 (D = 4 - 40 < 0)', categoryId: 'cat-zero-roots' },
      { id: 'gcs2-4', content: '2x² - 9 = 0 (ac < 0)', categoryId: 'cat-two-roots' },
      { id: 'gcs2-5', content: '4x² + 12x + 9 = 0 (2x + 3)²', categoryId: 'cat-one-root' },
      { id: 'gcs2-6', content: 'x² + 25 = 0 (tiszta pozitív)', categoryId: 'cat-zero-roots' },
      { id: 'gcs2-7', content: '-x² + 4x + 5 = 0 (ac = -5 < 0)', categoryId: 'cat-two-roots' },
      { id: 'gcs2-8', content: 'x² - 2x + 1 = 0', categoryId: 'cat-one-root' },
      { id: 'gcs2-9', content: '2x² + x + 3 = 0 (D = 1 - 24 < 0)', categoryId: 'cat-zero-roots' }
    ]
  },
  3: {
    title: 'A 4 fős váltócsapat feladatkörei',
    subtitle: 'Válogasd szét a lépéseket az adott csapattag felelősségi köre szerint!',
    categories: [
      {
        id: 'cat-analyst',
        name: '1. Elemző',
        description: '0-ra rendezés, együtthatók azonosítása, kikötések kijelölése.',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-calc',
        name: '2. Számoló',
        description: 'Diszkrimináns D = b² - 4ac kiszámítása, gyökök számának meghatározása.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-solver',
        name: '3. Megoldó',
        description: 'A megoldóképlet behelyettesítése, x₁ és x₂ számszerű kiszámítása.',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-checker',
        name: '4. Ellenőr',
        description: 'Viète-kontroll, hamis és negatív gyökök kiszűrése, szöveges válasz.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'gcs3-1', content: 'Kikötés felírása: nevező ≠ 0', categoryId: 'cat-analyst' },
      { id: 'gcs3-2', content: 'D = (-6)² - 4 · 1 · 8 = 4 kiszámítása', categoryId: 'cat-calc' },
      { id: 'gcs3-3', content: 'x₁,₂ = (6 ± 2) / 2 ⟹ x₁ = 4, x₂ = 2', categoryId: 'cat-solver' },
      { id: 'gcs3-4', content: 'A v = -15 km/h sebességgyök elvetése a szöveg alapján', categoryId: 'cat-checker' },
      { id: 'gcs3-5', content: 'Egyenlet 0-ra rendezése: 2x² - 5x - 3 = 0', categoryId: 'cat-analyst' },
      { id: 'gcs3-6', content: 'Gyökök számának megállapítása: D > 0 ⟹ 2 valós gyök', categoryId: 'cat-calc' },
      { id: 'gcs3-7', content: 'x kiemelése: x(3x - 12) = 0 ⟹ x₁ = 0, x₂ = 4', categoryId: 'cat-solver' },
      { id: 'gcs3-8', content: 'Viète-ellenőrzés: 4 + 2 = 6 = -(-6)/1', categoryId: 'cat-checker' }
    ]
  }
};

export const GroupCompetitionSorter: React.FC<GroupCompetitionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-masodfoku-egyenletek',
  topicTitle = 'Csoportverseny Csoportosító'
}) => {
  const activeLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      levelConfig={sorterLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

