import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogarithmConceptSorterProps {
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

const items = (prefix: string, list: [string, string][]) => list.map(([text, categoryId], i) => ({ id: `${prefix}${i + 1}`, text, categoryId }));

const LOGARITHM_CONCEPT_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen az értéke?',
    description: 'Válogasd szét a kifejezéseket! Figyelj az alap és az argumentum feltételeire.',
    categories: [
      { id: 'posint', name: 'Pozitív egész', color: 'emerald' },
      { id: 'neg', name: 'Negatív szám', color: 'sky' },
      { id: 'undef', name: 'Nincs értelmezve', color: 'rose' }
    ],
    items: items('lgcs1-', [
      ['log₂ 8', 'posint'],
      ['log₃ 81', 'posint'],
      ['log₁₀ 1000', 'posint'],
      ['log₂ (1/4)', 'neg'],
      ['log₃ (1/27)', 'neg'],
      ['log₀,₅ 8', 'neg'],
      ['log₂ (−8)', 'undef'],
      ['log₁ 5', 'undef'],
      ['log₃ 0', 'undef']
    ])
  },
  {
    level: 2,
    title: '2. szint: Melyik művelet kell?',
    description: 'Mi az ismeretlen szerepe a hatványban, és melyik művelettel kapjuk meg?',
    categories: [
      { id: 'pow', name: 'Hatványozás (hatványérték)', color: 'teal' },
      { id: 'root', name: 'Gyökvonás (hatványalap)', color: 'sky' },
      { id: 'log', name: 'Logaritmus (hatványkitevő)', color: 'violet' }
    ],
    items: items('lgcs2-', [
      ['x = 5⁶', 'pow'],
      ['7x = 5^{2/3}', 'pow'],
      ['x = 2¹⁰', 'pow'],
      ['y⁷ = 2187', 'root'],
      ['y⁷ = 923', 'root'],
      ['y³ = 64', 'root'],
      ['2ᶻ = 128', 'log'],
      ['2ᶻ = 412', 'log'],
      ['10ᶻ = 100 000 000', 'log']
    ])
  },
  {
    level: 3,
    title: '3. szint: Mekkora a logaritmus?',
    description: 'Becsüld meg a logaritmus értékét!',
    categories: [
      { id: 'neg', name: 'Negatív', color: 'rose' },
      { id: 'small', name: '0 és 1 között', color: 'amber' },
      { id: 'big', name: '1-nél nagyobb', color: 'emerald' }
    ],
    items: items('lgcs3-', [
      ['log₂ (1/4)', 'neg'],
      ['log₀,₅ 8', 'neg'],
      ['log₉ (1/3)', 'neg'],
      ['log₄₉ 7', 'small'],
      ['log₆₄ 4', 'small'],
      ['log₅ 2', 'small'],
      ['log₂ 412', 'big'],
      ['log₃ 19', 'big'],
      ['log₂ 10', 'big']
    ])
  }
];

const LOGARITHM_CONCEPT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LOGARITHM_CONCEPT_SORTER_LEVELS_LIST[0],
  2: LOGARITHM_CONCEPT_SORTER_LEVELS_LIST[1],
  3: LOGARITHM_CONCEPT_SORTER_LEVELS_LIST[2]
};

export const LogarithmConceptSorter: React.FC<LogarithmConceptSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-logaritmus-fogalom-sorter',
  topicTitle = '10. A logaritmus fogalma – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="a-logaritmus-fogalma"
      title={topicTitle}
      subtitle="Rendszerezd a logaritmusokat: értelmezett-e, melyik művelet kell, és mekkora az értéke!"
      levels={LOGARITHM_CONCEPT_SORTER_LEVELS}
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

export default LogarithmConceptSorter;
