import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowerRootLogSorterProps {
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

const POWER_ROOT_LOG_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik művelet kell?',
    description: 'Hatvány, gyök vagy logaritmus? Döntsd el, mi az ismeretlen: a hatványérték, az alap vagy a kitevő!',
    categories: [
      { id: 'pow', name: 'Hatványozás', color: 'emerald' },
      { id: 'root', name: 'Gyökvonás', color: 'sky' },
      { id: 'log', name: 'Logaritmus', color: 'violet' }
    ],
    items: [
      { id: 'prls1', text: 'E(25) = 500 · 1,056²⁵ = ?', categoryId: 'pow' },
      { id: 'prls2', text: 'f(8) = 51 · 1,667⁸ = ?', categoryId: 'pow' },
      { id: 'prls3', text: 'B(33) = 3800 · 0,945³³ = ?', categoryId: 'pow' },
      { id: 'prls4', text: 'q³⁷ = 7,6; q = ?', categoryId: 'root' },
      { id: 'prls5', text: 'q³⁰ = 10 / 10,71; q = ?', categoryId: 'root' },
      { id: 'prls6', text: 'x⁵ = 32; x = ?', categoryId: 'root' },
      { id: 'prls7', text: '1,056ᵗ = 6; t = ?', categoryId: 'log' },
      { id: 'prls8', text: '0,945ᵗ = 0,5; t = ?', categoryId: 'log' },
      { id: 'prls9', text: '1,065ⁿ = 285,7; n = ?', categoryId: 'log' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Növekszik vagy csökken?',
    description: 'A c · qᵗ modellben (c > 0) a q alapján döntsd el, milyen a folyamat!',
    categories: [
      { id: 'up', name: 'Exponenciális növekedés', color: 'emerald' },
      { id: 'down', name: 'Exponenciális csökkenés', color: 'rose' },
      { id: 'const', name: 'Állandó', color: 'slate' }
    ],
    items: [
      { id: 'prls10', text: 'E(t) = 500 · 1,056ᵗ', categoryId: 'up' },
      { id: 'prls11', text: 'f(x) = 51 · 1,667ˣ', categoryId: 'up' },
      { id: 'prls12', text: 'H(n) = 350 000 · 1,065ⁿ', categoryId: 'up' },
      { id: 'prls13', text: 'B(t) = 3800 · 0,945ᵗ', categoryId: 'down' },
      { id: 'prls14', text: 'N(n) = 10,71 · 0,9977ⁿ', categoryId: 'down' },
      { id: 'prls15', text: 'm(t) = 80 · (1/2)ᵗ', categoryId: 'down' },
      { id: 'prls16', text: 'g(t) = 7 · 1ᵗ', categoryId: 'const' },
      { id: 'prls17', text: 'h(t) = 300 · (5/5)ᵗ', categoryId: 'const' },
      { id: 'prls18', text: 'k(t) = 42 · 1,000ᵗ', categoryId: 'const' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mekkora a megoldás?',
    description: 'Számológép nélkül becsüld meg az aˣ = b egyenlet megoldását!',
    categories: [
      { id: 'big', name: 'x > 1', color: 'violet' },
      { id: 'mid', name: '0 < x < 1', color: 'amber' },
      { id: 'neg', name: 'x < 0', color: 'rose' }
    ],
    items: [
      { id: 'prls19', text: '3ˣ = 20', categoryId: 'big' },
      { id: 'prls20', text: '1,056ˣ = 6', categoryId: 'big' },
      { id: 'prls21', text: '2ˣ = 3,5', categoryId: 'big' },
      { id: 'prls22', text: '2ˣ = 1,5', categoryId: 'mid' },
      { id: 'prls23', text: '10ˣ = 5', categoryId: 'mid' },
      { id: 'prls24', text: '1,056ˣ = 1,05', categoryId: 'mid' },
      { id: 'prls25', text: '2ˣ = 0,3', categoryId: 'neg' },
      { id: 'prls26', text: '10ˣ = 0,5', categoryId: 'neg' },
      { id: 'prls27', text: '0,945ˣ = 1,2', categoryId: 'neg' }
    ]
  }
];

const POWER_ROOT_LOG_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: POWER_ROOT_LOG_SORTER_LEVELS_LIST[0],
  2: POWER_ROOT_LOG_SORTER_LEVELS_LIST[1],
  3: POWER_ROOT_LOG_SORTER_LEVELS_LIST[2]
};

export const PowerRootLogSorter: React.FC<PowerRootLogSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-logaritmus-modellek-sorter',
  topicTitle = '12. Hatvány, gyök, logaritmus – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="hatvany-gyok-es-logaritmus"
      title={topicTitle}
      subtitle="Rendszerezd az exponenciális feladatokat: melyik művelet kell, nő vagy csökken a folyamat, és mekkora a megoldás!"
      levels={POWER_ROOT_LOG_SORTER_LEVELS}
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

export default PowerRootLogSorter;
