import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProportionalDivisionSorterProps {
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
    title: '1. Szint: Hány Részre Osztunk?',
    subtitle: 'Határozd meg az arányrészek összegét (a + b vagy a + b + c)!',
    categories: [
      {
        id: 'cat-5',
        name: '5 részre osztás',
        description: 'A tagok összege 5 (pl. 2 : 3 vagy 1 : 4)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-6',
        name: '6 részre osztás',
        description: 'A tagok összege 6 (pl. 1 : 5 vagy 1 : 2 : 3)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-8',
        name: '8 részre osztás',
        description: 'A tagok összege 8 (pl. 3 : 5 vagy 1 : 7)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      { id: 'pds1-1', label: '2 : 3', category: 'cat-5' },
      { id: 'pds1-2', label: '1 : 5', category: 'cat-6' },
      { id: 'pds1-3', label: '3 : 5', category: 'cat-8' },
      { id: 'pds1-4', label: '1 : 4', category: 'cat-5' },
      { id: 'pds1-5', label: '1 : 2 : 3', category: 'cat-6' },
      { id: 'pds1-6', label: '1 : 7', category: 'cat-8' },
      { id: 'pds1-7', label: '4 : 1', category: 'cat-5' },
      { id: 'pds1-8', label: '5 : 1', category: 'cat-6' },
      { id: 'pds1-9', label: '5 : 3', category: 'cat-8' },
      { id: 'pds1-10', label: '1 : 1 : 3', category: 'cat-5' },
      { id: 'pds1-11', label: '2 : 2 : 2', category: 'cat-6' },
      { id: 'pds1-12', label: '1 : 3 : 4', category: 'cat-8' }
    ]
  },
  2: {
    title: '2. Szint: 1 Arányrész Értéke',
    subtitle: 'Számítsd ki, hogy a megadott összeg felosztásakor mennyit ér 1 arányrész!',
    categories: [
      {
        id: 'cat-100',
        name: '1 rész = 100',
        description: 'Összeg / részek = 100',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-200',
        name: '1 rész = 200',
        description: 'Összeg / részek = 200',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-300',
        name: '1 rész = 300',
        description: 'Összeg / részek = 300',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      { id: 'pds2-1', label: '500 elosztva 2 : 3 arányban', category: 'cat-100' },
      { id: 'pds2-2', label: '1000 elosztva 2 : 3 arányban', category: 'cat-200' },
      { id: 'pds2-3', label: '900 elosztva 1 : 2 arányban', category: 'cat-300' },
      { id: 'pds2-4', label: '600 elosztva 1 : 5 arányban', category: 'cat-100' },
      { id: 'pds2-5', label: '800 elosztva 1 : 3 arányban', category: 'cat-200' },
      { id: 'pds2-6', label: '1500 elosztva 2 : 3 arányban', category: 'cat-300' },
      { id: 'pds2-7', label: '800 elosztva 3 : 5 arányban', category: 'cat-100' },
      { id: 'pds2-8', label: '1200 elosztva 1 : 5 arányban', category: 'cat-200' },
      { id: 'pds2-9', label: '1200 elosztva 1 : 3 arányban', category: 'cat-300' },
      { id: 'pds2-10', label: '400 elosztva 1 : 3 arányban', category: 'cat-100' },
      { id: 'pds2-11', label: '1600 elosztva 3 : 5 arányban', category: 'cat-200' },
      { id: 'pds2-12', label: '2400 elosztva 3 : 5 arányban', category: 'cat-300' }
    ]
  },
  3: {
    title: '3. Szint: A Kisebbik Rész Nagysága',
    subtitle: 'Számítsd ki a szétosztás után a kisebbik összeg értékét!',
    categories: [
      {
        id: 'cat-min-200',
        name: 'Kisebbik rész = 200 Ft',
        description: 'A kisebb aránytaghoz 200 Ft jut',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-min-300',
        name: 'Kisebbik rész = 300 Ft',
        description: 'A kisebb aránytaghoz 300 Ft jut',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-min-400',
        name: 'Kisebbik rész = 400 Ft',
        description: 'A kisebb aránytaghoz 400 Ft jut',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 'pds3-1', label: '1000 Ft szétosztva 1 : 4 arányban', category: 'cat-min-200' },
      { id: 'pds3-2', label: '1200 Ft szétosztva 1 : 3 arányban', category: 'cat-min-300' },
      { id: 'pds3-3', label: '2000 Ft szétosztva 1 : 4 arányban', category: 'cat-min-400' },
      { id: 'pds3-4', label: '600 Ft szétosztva 1 : 2 arányban', category: 'cat-min-200' },
      { id: 'pds3-5', label: '900 Ft szétosztva 1 : 2 arányban', category: 'cat-min-300' },
      { id: 'pds3-6', label: '1200 Ft szétosztva 1 : 2 arányban', category: 'cat-min-400' },
      { id: 'pds3-7', label: '1400 Ft szétosztva 1 : 6 arányban', category: 'cat-min-200' },
      { id: 'pds3-8', label: '1500 Ft szétosztva 1 : 4 arányban', category: 'cat-min-300' },
      { id: 'pds3-9', label: '1600 Ft szétosztva 1 : 3 arányban', category: 'cat-min-400' },
      { id: 'pds3-10', label: '500 Ft szétosztva 2 : 3 arányban', category: 'cat-min-200' },
      { id: 'pds3-11', label: '750 Ft szétosztva 2 : 3 arányban', category: 'cat-min-300' },
      { id: 'pds3-12', label: '1000 Ft szétosztva 2 : 3 arányban', category: 'cat-min-400' }
    ]
  }
};

export const ProportionalDivisionSorter: React.FC<ProportionalDivisionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-ratio-division-sorter',
  topicTitle = 'Arányos osztás (Csoportosító)'
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
      themeColor="amber"
      grade={6}
      chapterId="arany-szazalek-szoveges-feladatok"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};
export default ProportionalDivisionSorter;
