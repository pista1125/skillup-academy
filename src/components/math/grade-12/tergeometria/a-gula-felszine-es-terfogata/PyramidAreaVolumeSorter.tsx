import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PyramidAreaVolumeSorterProps {
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

const SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hosszúság, terület vagy térfogat?',
    description: 'Csoportosítsd a mennyiségeket a mértékegységük szerint!',
    categories: [
      { id: 'len', name: 'Hosszúság (cm)', color: 'blue' },
      { id: 'area', name: 'Terület (cm²)', color: 'emerald' },
      { id: 'vol', name: 'Térfogat (cm³)', color: 'amber' }
    ],
    items: [
      { id: 'pavs1', text: 'testmagasság M', categoryId: 'len' },
      { id: 'pavs2', text: 'oldallap magassága mₒ', categoryId: 'len' },
      { id: 'pavs3', text: 'oldalél b', categoryId: 'len' },
      { id: 'pavs4', text: 'palást T_palást', categoryId: 'area' },
      { id: 'pavs5', text: 'felszín A', categoryId: 'area' },
      { id: 'pavs6', text: 'alaplap területe', categoryId: 'area' },
      { id: 'pavs7', text: 'V = T · M / 3', categoryId: 'vol' },
      { id: 'pavs8', text: 'a tejszínes doboz befogadóképessége', categoryId: 'vol' },
      { id: 'pavs9', text: 'a³√2 / 12', categoryId: 'vol' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a gúla térfogata?',
    description: 'Számold ki a térfogatot, és sorold a megfelelő csoportba!',
    categories: [
      { id: 'lt100', name: 'V < 100 cm³', color: 'teal' },
      { id: 'mid', name: '100 cm³ ≤ V ≤ 500 cm³', color: 'purple' },
      { id: 'gt500', name: 'V > 500 cm³', color: 'rose' }
    ],
    items: [
      { id: 'pavs10', text: 'T = 24 cm², M = 5 cm', categoryId: 'lt100' },
      { id: 'pavs11', text: 'a = 8 cm, M = 3 cm', categoryId: 'lt100' },
      { id: 'pavs12', text: '6 cm élű szabályos tetraéder', categoryId: 'lt100' },
      { id: 'pavs13', text: 'a = 6 cm, M = 10 cm', categoryId: 'mid' },
      { id: 'pavs14', text: 'tejszínes doboz (három 10 cm-es él)', categoryId: 'mid' },
      { id: 'pavs15', text: 'a = 10 cm, b = 13 cm', categoryId: 'mid' },
      { id: 'pavs16', text: 'rombusz alap 18 és 15 cm, M = 15 cm', categoryId: 'gt500' },
      { id: 'pavs17', text: 'hatoldalú: a = 12 cm, b = 13 cm', categoryId: 'gt500' },
      { id: 'pavs18', text: 'minden éle 30 cm, négyzet alapú', categoryId: 'gt500' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Felszínhez, térfogathoz vagy mindkettőhöz?',
    description: 'Döntsd el, mire van szükség az adott adat kiszámításához!',
    categories: [
      { id: 'A', name: 'Csak a felszínhez kell', color: 'emerald' },
      { id: 'V', name: 'Csak a térfogathoz kell', color: 'blue' },
      { id: 'both', name: 'Mindkettőhöz kell', color: 'amber' }
    ],
    items: [
      { id: 'pavs19', text: 'az oldallapok magassága mₒ', categoryId: 'A' },
      { id: 'pavs20', text: 'az oldallapok területe', categoryId: 'A' },
      { id: 'pavs21', text: 'a ragasztási ráhagyás (5%)', categoryId: 'A' },
      { id: 'pavs22', text: 'a testmagasság M', categoryId: 'V' },
      { id: 'pavs23', text: 'a harmadolás (· 1/3)', categoryId: 'V' },
      { id: 'pavs24', text: 'a csúcs és az alapsík távolsága', categoryId: 'V' },
      { id: 'pavs25', text: 'az alaplap területe', categoryId: 'both' },
      { id: 'pavs26', text: 'az alapél hossza (szabályos gúlánál)', categoryId: 'both' },
      { id: 'pavs27', text: 'az alaplap alakja', categoryId: 'both' }
    ]
  }
];

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SORTER_LEVELS_LIST[0],
  2: SORTER_LEVELS_LIST[1],
  3: SORTER_LEVELS_LIST[2]
};

export const PyramidAreaVolumeSorter: React.FC<PyramidAreaVolumeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-gula-felszin-terfogat-sorter',
  topicTitle = '11. A gúla felszíne és térfogata – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-gula-felszine-es-terfogata"
      title={topicTitle}
      subtitle="Rendszerezd a mennyiségeket, a gúlák térfogatát és a számolási lépéseket!"
      levels={SORTER_LEVELS}
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

export default PyramidAreaVolumeSorter;
