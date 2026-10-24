import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  NumberSetsVennSvg,
  SubsetVennSvg,
  ElementBelongingSvg,
  EmptySetSvg,
  PowerSetTreeSvg
} from './SetsFigures';

interface SetsSorterProps {
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
    title: '1. Szint: Számok Besorolása a Legszűkebb Számhalmazba',
    subtitle: 'Húzd a számokat a legszűkebb nevezetes számhalmaz csoportjába!',
    categories: [
      {
        id: 'cat-n',
        name: 'Természetes számok (ℕ)',
        description: 'Nemnegatív egész számok {0, 1, 2, 3, ...}',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-z-only',
        name: 'Egész, de nem természetes (ℤ \\ ℕ)',
        description: 'Szigorúan negatív egész számok {..., -3, -2, -1}',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-q-or-irrac',
        name: 'Tört vagy Irracionális (ℚ \\ ℤ vagy ℚ*)',
        description: 'Valódi törtek, tizedestörtek és irracionális gyökök',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      { id: 'ss1-1', label: '0', category: 'cat-n' },
      { id: 'ss1-2', label: '7', category: 'cat-n' },
      { id: 'ss1-3', label: '√25', category: 'cat-n' },
      { id: 'ss1-4', label: '1024', category: 'cat-n' },
      { id: 'ss1-5', label: '-4', category: 'cat-z-only' },
      { id: 'ss1-6', label: '-17', category: 'cat-z-only' },
      { id: 'ss1-7', label: '-√16', category: 'cat-z-only' },
      { id: 'ss1-8', label: '-100', category: 'cat-z-only' },
      { id: 'ss1-9', label: '3/4', category: 'cat-q-or-irrac' },
      { id: 'ss1-10', label: '-2,5', category: 'cat-q-or-irrac' },
      { id: 'ss1-11', label: '√2', category: 'cat-q-or-irrac', figure: <NumberSetsVennSvg size={65} /> },
      { id: 'ss1-12', label: 'π', category: 'cat-q-or-irrac' }
    ]
  },
  2: {
    title: '2. Szint: Halmazelméleti Állítások Igazságtartalma',
    subtitle: 'Döntsd el, hogy az állítás Mindig Igaz, Mindig Hamis, vagy Feltételtől Függ!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Mindig Igaz',
        description: 'Minden halmazra vagy számra kivétel nélkül érvényes alaptétel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-always-false',
        name: 'Mindig Hamis',
        description: 'Matematikai képtelenség, logikai vagy jelölési hiba',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-conditional',
        name: 'Feltételtől Függ',
        description: 'Csak bizonyos speciális halmazok vagy elemek esetén teljesül',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'ss2-1', label: '∅ ⊆ A bármely A halmazra', category: 'cat-always-true', figure: <EmptySetSvg size={65} /> },
      { id: 'ss2-2', label: 'A ⊆ A bármely A halmazra', category: 'cat-always-true' },
      { id: 'ss2-3', label: 'ℕ ⊂ ℤ', category: 'cat-always-true' },
      { id: 'ss2-4', label: 'Ha A ⊆ B és B ⊆ C, akkor A ⊆ C', category: 'cat-always-true', figure: <SubsetVennSvg size={65} /> },
      { id: 'ss2-5', label: '∅ ∈ A minden A halmaz esetén', category: 'cat-always-false' },
      { id: 'ss2-6', label: '|A| = -3', category: 'cat-always-false' },
      { id: 'ss2-7', label: 'A ⊂ A', category: 'cat-always-false' },
      { id: 'ss2-8', label: '7 ∈ ∅', category: 'cat-always-false' },
      { id: 'ss2-9', label: 'A = B (két tetszőleges halmaz)', category: 'cat-conditional' },
      { id: 'ss2-10', label: 'A ⊆ B (két tetszőleges halmaz)', category: 'cat-conditional' },
      { id: 'ss2-11', label: '|A| = 5 (egy adott halmaz)', category: 'cat-conditional' },
      { id: 'ss2-12', label: '1 ∈ A (egy adott halmaz)', category: 'cat-conditional' }
    ]
  },
  3: {
    title: '3. Szint: Reláció Típusok és Részhalmazok Kategorizálása',
    subtitle: 'Különböztesd meg az eleme relációt, a részhalmaz relációt és a részhalmaz-számlálást!',
    categories: [
      {
        id: 'cat-elem',
        name: 'Eleme Reláció (∈ vagy ∉)',
        description: 'Egy stacionárius elem és egy halmaz közvetlen kapcsolata',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-subset',
        name: 'Részhalmaz Reláció (⊆ vagy ⊂)',
        description: 'Két halmaz közötti teljes beágyazódási kapcsolat',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-power',
        name: 'Részhalmazok Száma (2ⁿ)',
        description: 'Hatványhalmaz mérete vagy részhalmaz-számlálási feladat',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'ss3-1', label: '5 ∈ {1, 3, 5, 7}', category: 'cat-elem', figure: <ElementBelongingSvg size={65} /> },
      { id: 'ss3-2', label: '4 ∉ {1, 3, 5}', category: 'cat-elem' },
      { id: 'ss3-3', label: 'x ∈ A reláció', category: 'cat-elem' },
      { id: 'ss3-4', label: '-2 ∈ ℤ', category: 'cat-elem' },
      { id: 'ss3-5', label: '{2, 4} ⊆ {1, 2, 3, 4, 5}', category: 'cat-subset', figure: <SubsetVennSvg size={65} /> },
      { id: 'ss3-6', label: '{1} ⊂ {1, 2, 3}', category: 'cat-subset' },
      { id: 'ss3-7', label: 'ℕ ⊂ ℚ', category: 'cat-subset' },
      { id: 'ss3-8', label: '∅ ⊆ {5, 9}', category: 'cat-subset', figure: <EmptySetSvg size={65} /> },
      { id: 'ss3-9', label: '3 elemű halmaz összes részhalmazának száma', category: 'cat-power', figure: <PowerSetTreeSvg size={65} /> },
      { id: 'ss3-10', label: '4 elemű halmaz hatványhalmazának mérete', category: 'cat-power' },
      { id: 'ss3-11', label: 'n elemű halmaz valódi részhalmazainak száma', category: 'cat-power' },
      { id: 'ss3-12', label: 'Az üres halmaz összes részhalmazának száma', category: 'cat-power' }
    ]
  }
};

export const SetsSorter: React.FC<SetsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g9-komb-halmazok-sorter'}
      topicTitle={topicTitle || '9. Osztály - Halmazok Alapjai Csoportosító'}
    />
  );
};

export default SetsSorter;
