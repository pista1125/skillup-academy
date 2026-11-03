import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SlopeSorterProps {
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
    title: '1. Szint: Meredekség Előjele és Iránya',
    subtitle: 'Sorold be a képleteket és pontpárokat az egyenes jellege szerint!',
    categories: [
      {
        id: 'cat-rising',
        name: 'Emelkedő Egyenes (m > 0)',
        description: 'Balról jobbra felfelé tart, pozitív meredekség',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-falling',
        name: 'Süllyedő Egyenes (m < 0)',
        description: 'Balról jobbra lefelé tart, negatív meredekség',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-horizontal',
        name: 'Vízszintes Egyenes (m = 0)',
        description: 'Párhuzamos az x tengellyel, nulla meredekség',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // Emelkedő
      { id: 'ss1-1', label: 'f(x) = 3x - 4', category: 'cat-rising' },
      { id: 'ss1-2', label: 'P₁(1; 2) és P₂(4; 8) pontokon átmenő egyenes (m = 2)', category: 'cat-rising' },
      { id: 'ss1-3', label: 'f(x) = 0.5x + 10', category: 'cat-rising' },
      { id: 'ss1-4', label: 'Egyenes, amely 45°-os hegyesszöget zár be az x tengellyel', category: 'cat-rising' },
      // Süllyedő
      { id: 'ss1-5', label: 'g(x) = -2x + 5', category: 'cat-falling' },
      { id: 'ss1-6', label: 'P₁(0; 4) és P₂(3; 1) pontokon átmenő egyenes (m = -1)', category: 'cat-falling' },
      { id: 'ss1-7', label: 'h(x) = -0.2x', category: 'cat-falling' },
      { id: 'ss1-8', label: 'Egyenes, amely 135°-os tompaszöget zár be az x tengellyel', category: 'cat-falling' },
      // Vízszintes
      { id: 'ss1-9', label: 'f(x) = 5 (konstans)', category: 'cat-horizontal' },
      { id: 'ss1-10', label: 'P₁(-2; 3) és P₂(5; 3) pontokon átmenő egyenes', category: 'cat-horizontal' },
      { id: 'ss1-11', label: 'g(x) = -2', category: 'cat-horizontal' },
      { id: 'ss1-12', label: 'x tengely egyenlete (y = 0)', category: 'cat-horizontal' }
    ]
  },
  2: {
    title: '2. Szint: Geometriai Viszony az y = 2x - 3 Egyeneshez',
    subtitle: 'Hogyan viszonyulnak a megadott egyenesek az m = 2 meredekségű referencia-egyeneshez?',
    categories: [
      {
        id: 'cat-parallel',
        name: 'Párhuzamos (m = 2)',
        description: 'Azonos meredekség: m₁ = m₂ = 2',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-perpendicular',
        name: 'Merőleges (m = -0.5)',
        description: 'Negatív reciprok: m₁ · m₂ = -1 ➔ m = -1/2',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-intersecting',
        name: 'Metsző, de NEM merőleges',
        description: 'Különböző meredekség, de nem negatív reciprok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Párhuzamos
      { id: 'ss2-1', label: 'y = 2x + 7', category: 'cat-parallel' },
      { id: 'ss2-2', label: 'P₁(0; 1) és P₂(2; 5) pontokon átmenő egyenes (m = 2)', category: 'cat-parallel' },
      { id: 'ss2-3', label: 'y = 2x - 100', category: 'cat-parallel' },
      { id: 'ss2-4', label: '2x - y = 8 egyenletű egyenes (átrendezve y = 2x - 8)', category: 'cat-parallel' },
      // Merőleges
      { id: 'ss2-5', label: 'y = -0.5x + 3', category: 'cat-perpendicular' },
      { id: 'ss2-6', label: 'y = -(1/2)x - 4', category: 'cat-perpendicular' },
      { id: 'ss2-7', label: 'P₁(0; 4) és P₂(4; 2) pontokon átmenő egyenes (m = -2/4 = -0.5)', category: 'cat-perpendicular' },
      { id: 'ss2-8', label: 'x + 2y = 6 (átrendezve y = -0.5x + 3)', category: 'cat-perpendicular' },
      // Metsző, nem merőleges
      { id: 'ss2-9', label: 'y = 3x - 1 (m = 3)', category: 'cat-intersecting' },
      { id: 'ss2-10', label: 'y = -2x + 1 (m = -2, ellentett de nem reciprok!)', category: 'cat-intersecting' },
      { id: 'ss2-11', label: 'y = 0.5x (reciprok, de nem negatív!)', category: 'cat-intersecting' },
      { id: 'ss2-12', label: 'y = 4 (vízszintes egyenes)', category: 'cat-intersecting' }
    ]
  },
  3: {
    title: '3. Szint: Meredekség Nagysága (|m| értéke)',
    subtitle: 'Csoportosítsd az egyeneseket a meredekségük abszolút értéke szerint!',
    categories: [
      {
        id: 'cat-steep',
        name: 'Meredek egyenes (|m| > 1)',
        description: 'Meredekebb a 45°-nál, Δy nagyobb, mint Δx',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-flat',
        name: 'Lankás / Lapos egyenes (0 < |m| < 1)',
        description: 'Laposabb a 45°-nál, Δx nagyobb, mint Δy',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-special',
        name: 'Határeset (|m| = 1 vagy m = 0 / nincs m)',
        description: 'Pontosan 45°-os, vízszintes vagy függőleges',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      // Meredek
      { id: 'ss3-1', label: 'y = 4x', category: 'cat-steep' },
      { id: 'ss3-2', label: 'y = -3x + 1', category: 'cat-steep' },
      { id: 'ss3-3', label: 'm = -5', category: 'cat-steep' },
      { id: 'ss3-4', label: 'P₁(1; 1) és P₂(2; 6) (m = 5)', category: 'cat-steep' },
      // Lankás
      { id: 'ss3-5', label: 'y = 0.25x - 3', category: 'cat-flat' },
      { id: 'ss3-6', label: 'y = -(1/3)x', category: 'cat-flat' },
      { id: 'ss3-7', label: 'm = 0.8', category: 'cat-flat' },
      { id: 'ss3-8', label: 'P₁(0; 0) és P₂(10; 2) (m = 0.2)', category: 'cat-flat' },
      // Határeset
      { id: 'ss3-9', label: 'y = x (m = 1, 45°-os)', category: 'cat-special' },
      { id: 'ss3-10', label: 'y = -x + 4 (m = -1, 135°-os)', category: 'cat-special' },
      { id: 'ss3-11', label: 'y = 6 (m = 0, vízszintes)', category: 'cat-special' },
      { id: 'ss3-12', label: 'x = 3 (függőleges, nincs meredeksége)', category: 'cat-special' }
    ]
  }
};

export const SlopeSorter: React.FC<SlopeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'egyenesek-meredeksege',
  topicTitle = 'Egyenesek meredeksége'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      activityType="g9-func-meredekseg-sorter"
    />
  );
};

