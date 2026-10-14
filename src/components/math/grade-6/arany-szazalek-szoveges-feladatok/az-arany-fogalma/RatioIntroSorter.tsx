import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RatioIntroSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Arány Értéke az 1-hez Képest',
    subtitle: 'Hasonlítsd össze az arány előtagját és utótagját: kisebb mint 1, egyenlő 1-gyel vagy nagyobb 1-nél?',
    categories: [
      {
        id: 'cat-less',
        name: 'Kisebb mint 1 (a < b)',
        description: 'Az előtag kisebb, mint az utótag (valódi tört)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-equal',
        name: 'Pontosan 1 (a = b)',
        description: 'A két tag egyenlő nagyságú',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-greater',
        name: 'Nagyobb mint 1 (a > b)',
        description: 'Az előtag nagyobb, mint az utótag (többszörös)',
        badgeColor: 'bg-orange-100 text-orange-800 border-orange-300'
      }
    ],
    items: [
      { id: 's1-1', label: '2 : 5', category: 'cat-less' },
      { id: 's1-2', label: '7 : 3', category: 'cat-greater' },
      { id: 's1-3', label: '6 : 6', category: 'cat-equal' },
      { id: 's1-4', label: '3 : 10', category: 'cat-less' },
      { id: 's1-5', label: '12 : 4', category: 'cat-greater' },
      { id: 's1-6', label: '15 : 15', category: 'cat-equal' },
      { id: 's1-7', label: '1 : 8', category: 'cat-less' },
      { id: 's1-8', label: '20 : 5', category: 'cat-greater' },
      { id: 's1-9', label: '100 : 100', category: 'cat-equal' },
      { id: 's1-10', label: '9 : 11', category: 'cat-less' },
      { id: 's1-11', label: '50 : 25', category: 'cat-greater' },
      { id: 's1-12', label: '0,8 : 0,8', category: 'cat-equal' }
    ]
  },
  2: {
    title: '2. Szint: Egyszerűsített Arányértékek',
    subtitle: 'Válogasd szét az arányokat az egyszerűsített alakjuk szerint!',
    categories: [
      {
        id: 'cat-1-2',
        name: '1 : 2 arány (Fele)',
        description: 'Az első tag a másodiknak a fele',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-2-3',
        name: '2 : 3 arány (Kétharmada)',
        description: 'Egyszerűsítve pontosan 2 a 3-hoz',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-3-4',
        name: '3 : 4 arány (Háromnegyede)',
        description: 'Egyszerűsítve pontosan 3 a 4-hez',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      { id: 's2-1', label: '5 : 10', category: 'cat-1-2' },
      { id: 's2-2', label: '8 : 12', category: 'cat-2-3' },
      { id: 's2-3', label: '9 : 12', category: 'cat-3-4' },
      { id: 's2-4', label: '15 : 30', category: 'cat-1-2' },
      { id: 's2-5', label: '14 : 21', category: 'cat-2-3' },
      { id: 's2-6', label: '15 : 20', category: 'cat-3-4' },
      { id: 's2-7', label: '0,5 : 1', category: 'cat-1-2' },
      { id: 's2-8', label: '20 : 30', category: 'cat-2-3' },
      { id: 's2-9', label: '30 : 40', category: 'cat-3-4' },
      { id: 's2-10', label: '25 : 50', category: 'cat-1-2' },
      { id: 's2-11', label: '10 : 15', category: 'cat-2-3' },
      { id: 's2-12', label: '6 : 8', category: 'cat-3-4' }
    ]
  },
  3: {
    title: '3. Szint: Mértékegységes és Törtes Arányok',
    subtitle: 'Váltsd közös mértékegységre a mennyiségeket és csoportosítsd őket!',
    categories: [
      {
        id: 'cat-1-4',
        name: '1 : 4 arányúak',
        description: 'Negyedrész (pl. 250 g : 1 kg vagy 15 perc : 1 óra)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-1-5',
        name: '1 : 5 arányúak',
        description: 'Ötödrész (pl. 20 cm : 1 m vagy 2 dl : 1 l)',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-2-5',
        name: '2 : 5 arányúak',
        description: 'Kétötöd rész (pl. 400 m : 1 km vagy 20 dkg : 50 dkg)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's3-1', label: '250 g : 1 kg', category: 'cat-1-4' },
      { id: 's3-2', label: '20 cm : 1 m', category: 'cat-1-5' },
      { id: 's3-3', label: '400 m : 1 km', category: 'cat-2-5' },
      { id: 's3-4', label: '15 perc : 1 óra', category: 'cat-1-4' },
      { id: 's3-5', label: '2 dl : 1 l', category: 'cat-1-5' },
      { id: 's3-6', label: '20 dkg : 50 dkg', category: 'cat-2-5' },
      { id: 's3-7', label: '0,25 : 1', category: 'cat-1-4' },
      { id: 's3-8', label: '12 perc : 1 óra', category: 'cat-1-5' },
      { id: 's3-9', label: '4 dl : 1 l', category: 'cat-2-5' },
      { id: 's3-10', label: '1/4 : 1', category: 'cat-1-4' },
      { id: 's3-11', label: '0,2 : 1', category: 'cat-1-5' },
      { id: 's3-12', label: '0,4 : 1', category: 'cat-2-5' }
    ]
  }
};

export const RatioIntroSorter: React.FC<RatioIntroSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-ratio-intro-sorter',
  topicTitle = 'Az arány fogalma (Csoportosító)'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
      themeColor="orange"
      grade={6}
      chapterId="arany-szazalek-szoveges-feladatok"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};
export default RatioIntroSorter;
