import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SimultaneousDrawSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const SIMULTANEOUS_DRAW_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Melyikkel egyenlő?',
    description: 'Sorold be a kifejezést aszerint, hogy melyik binomiális együtthatóval egyenlő!',
    categories: [
      { id: 'c3', name: '= (10 alatt 3) = 120', color: 'blue' },
      { id: 'c4', name: '= (10 alatt 4) = 210', color: 'emerald' },
      { id: 'c2', name: '= (10 alatt 2) = 45', color: 'amber' }
    ],
    items: [
      { id: 'sds1', text: '(10 alatt 7)', categoryId: 'c3' },
      { id: 'sds2', text: '10 · 9 · 8 / 3!', categoryId: 'c3' },
      { id: 'sds3', text: '10! / (3! · 7!)', categoryId: 'c3' },
      { id: 'sds4', text: '(10 alatt 6)', categoryId: 'c4' },
      { id: 'sds5', text: '10 · 9 · 8 · 7 / 4!', categoryId: 'c4' },
      { id: 'sds6', text: '10! / (4! · 6!)', categoryId: 'c4' },
      { id: 'sds7', text: '(10 alatt 8)', categoryId: 'c2' },
      { id: 'sds8', text: '10 · 9 / 2', categoryId: 'c2' },
      { id: 'sds9', text: '10! / (2! · 8!)', categoryId: 'c2' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mekkora a valószínűség?',
    description: 'Számold ki a valószínűséget (egyszerre húzunk), és sorold be!',
    categories: [
      { id: 'low', name: 'p < 0,1', color: 'rose' },
      { id: 'mid', name: '0,1 ≤ p < 0,5', color: 'teal' },
      { id: 'high', name: 'p ≥ 0,5', color: 'violet' }
    ],
    items: [
      { id: 'sds10', text: '14 könyvből (4 vers) 2: mindkettő vers', categoryId: 'low' },
      { id: 'sds11', text: '14 könyvből (2 Dosztojevszkij) 2: mindkettő Dosztojevszkij', categoryId: 'low' },
      { id: 'sds12', text: '32 lapból (8 makk) 3: mindegyik makk', categoryId: 'low' },
      { id: 'sds13', text: '28 faktosból (15 tizenegyedikes) 2: mindkettő 11.-es', categoryId: 'mid' },
      { id: 'sds14', text: '28 faktosból (13 tizenkettedikes) 2: mindkettő 12.-es', categoryId: 'mid' },
      { id: 'sds15', text: '32 lapból (8 makk) 3: egyik sem makk', categoryId: 'mid' },
      { id: 'sds16', text: 'ötös lottó: 0 találat', categoryId: 'high' },
      { id: 'sds17', text: 'ötös lottó: mind az 5 szám nagyobb 10-nél', categoryId: 'high' },
      { id: 'sds18', text: '20 termékből (3 hibás) 2: egyik sem hibás', categoryId: 'high' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Melyik képlet kell?',
    description: 'n elemből k-t húzunk egyszerre, a vizsgált csoport m elemű. Melyik képlettel számolunk?',
    categories: [
      { id: 'all', name: 'mindegyik a csoportból: (m alatt k) / (n alatt k)', color: 'blue' },
      { id: 'none', name: 'egyik sem: (n − m alatt k) / (n alatt k)', color: 'amber' },
      { id: 'atleast', name: 'legalább egy: 1 − (n − m alatt k) / (n alatt k)', color: 'emerald' }
    ],
    items: [
      { id: 'sds19', text: 'lottó: mind az 5 megjelölt szám nyerő (csoport: nyerő számok)', categoryId: 'all' },
      { id: 'sds20', text: '3 lap: mindegyik makk (csoport: makk)', categoryId: 'all' },
      { id: 'sds21', text: '2 könyv: mindkettő vers (csoport: versek)', categoryId: 'all' },
      { id: 'sds22', text: 'lottó: egyik megjelölt szám sem nyerő (csoport: nyerő számok)', categoryId: 'none' },
      { id: 'sds23', text: '3 lap: egyik sem makk (csoport: makk)', categoryId: 'none' },
      { id: 'sds24', text: '4 pohár: egyik sem csorba (csoport: csorbák)', categoryId: 'none' },
      { id: 'sds25', text: 'lottó: legalább egy találat (csoport: nyerő számok)', categoryId: 'atleast' },
      { id: 'sds26', text: '3 lap: van köztük makk (csoport: makk)', categoryId: 'atleast' },
      { id: 'sds27', text: '4 pohár: legalább egy csorba (csoport: csorbák)', categoryId: 'atleast' }
    ]
  }
};

export const SimultaneousDrawSorter: React.FC<SimultaneousDrawSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-egyszerre-huzas-sorter',
  topicTitle = '10. Két vagy több elemet húzunk egyszerre – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="ket-vagy-tobb-elem-egyszerre"
      title={topicTitle}
      subtitle="Csoportosítsd a binomiális együtthatókat, a valószínűségeket és a megfelelő képleteket!"
      levels={SIMULTANEOUS_DRAW_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default SimultaneousDrawSorter;
