import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PossibilitiesSorterProps {
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

const POSSIBILITIES_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: 2, 4 vagy 6 lehetőség?",
    description: "Számold meg a lehetőségeket!",
    categories: [
      { id: 'k2', name: "2 lehetőség", color: 'sky' },
      { id: 'k4', name: "4 lehetőség", color: 'emerald' },
      { id: 'k6', name: "6 lehetőség", color: 'amber' }
    ],
    items: [
      { id: 'pvs1', text: "A és B sorrendje", categoryId: 'k2' },
      { id: 'pvs2', text: "a szülők közrefogják a kisfiút", categoryId: 'k2' },
      { id: 'pvs3', text: "1-es és 2-es kártya: kétjegyű számok", categoryId: 'k2' },
      { id: 'pvs4', text: "2 sapka és 2 sál", categoryId: 'k4' },
      { id: 'pvs5', text: "0, 5, 7 kártya: háromjegyű számok", categoryId: 'k4' },
      { id: 'pvs6', text: "kék – nem kék és radíros – nem radíros csoportok", categoryId: 'k4' },
      { id: 'pvs7', text: "3 gyerek sorrendje", categoryId: 'k6' },
      { id: 'pvs8', text: "1, 2, 3 kártya: háromjegyű számok", categoryId: 'k6' },
      { id: 'pvs9', text: "4 tó párjai (AB = BA)", categoryId: 'k6' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Milyen feladat?",
    description: "Sorrend, csoport vagy két választás egymás után?",
    categories: [
      { id: 'sorrend', name: "Sorrend: ki hányadik?", color: 'indigo' },
      { id: 'csoport', name: "Pár vagy csoport: kik vannak együtt?", color: 'emerald' },
      { id: 'ket', name: "Két választás egymás után", color: 'rose' }
    ],
    items: [
      { id: 'pvs10', text: "dobogós helyezések", categoryId: 'sorrend' },
      { id: 'pvs11', text: "libasorban a kilátóhoz", categoryId: 'sorrend' },
      { id: 'pvs12', text: "futóverseny célba érése", categoryId: 'sorrend' },
      { id: 'pvs13', text: "tavak párba állítása", categoryId: 'csoport' },
      { id: 'pvs14', text: "kézfogások a barátok között", categoryId: 'csoport' },
      { id: 'pvs15', text: "3 szalvéta vásárlása 5 színből", categoryId: 'csoport' },
      { id: 'pvs16', text: "sapka és sál", categoryId: 'ket' },
      { id: 'pvs17', text: "leves és főétel", categoryId: 'ket' },
      { id: 'pvs18', text: "szín és alak a logikai lapon", categoryId: 'ket' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Kevesebb, pont 6 vagy több?",
    description: "Becsülj vagy számolj: hány lehetőség van?",
    categories: [
      { id: 'kev', name: "Kevesebb, mint 6", color: 'sky' },
      { id: 'hat', name: "Pontosan 6", color: 'amber' },
      { id: 'tobb', name: "Több, mint 6", color: 'rose' }
    ],
    items: [
      { id: 'pvs19', text: "0, 5, 7 kártya háromjegyű számai", categoryId: 'kev' },
      { id: 'pvs20', text: "Csaba 2., Dániel Barna előtt (4 fiú)", categoryId: 'kev' },
      { id: 'pvs21', text: "3 gyerek párjai (AB = BA)", categoryId: 'kev' },
      { id: 'pvs22', text: "Dániel az első, a többi 3 fiú sorrendje", categoryId: 'hat' },
      { id: 'pvs23', text: "2 szín · 3 alak logikai lapjai", categoryId: 'hat' },
      { id: 'pvs24', text: "4 tó párjai (AB = BA)", categoryId: 'hat' },
      { id: 'pvs25', text: "4 fiú bármilyen sorrendje", categoryId: 'tobb' },
      { id: 'pvs26', text: "5 tó párjai (AB = BA)", categoryId: 'tobb' },
      { id: 'pvs27', text: "Alex megelőzi Barnát és Csabát (4 fiú)", categoryId: 'tobb' }
    ]
  }
];

const POSSIBILITIES_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: POSSIBILITIES_SORTER_LEVELS_LIST[0],
  2: POSSIBILITIES_SORTER_LEVELS_LIST[1],
  3: POSSIBILITIES_SORTER_LEVELS_LIST[2]
};

export const PossibilitiesSorter: React.FC<PossibilitiesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-group-lehetosegek-sorter',
  topicTitle = "3. Hányféle lehetőség van? – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="hanyfele-lehetoseg-van"
      title={topicTitle}
      subtitle="Csoportosítsd a feladatokat: hány lehetőség van, és milyen fajta a feladat?"
      levels={POSSIBILITIES_SORTER_LEVELS}
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

export default PossibilitiesSorter;
