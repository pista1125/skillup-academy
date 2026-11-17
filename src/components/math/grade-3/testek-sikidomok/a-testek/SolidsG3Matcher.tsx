import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SolidKind } from './SolidsG3Parts';
import { SolidCard, PlanCard, BuildingCard } from './SolidsG3CardFigures';

interface SolidsG3MatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const L1: [SolidKind, string][] = [
  ['kocka', 'dobókocka'],
  ['teglatest', 'cipősdoboz'],
  ['gomb', 'labda'],
  ['henger', 'konzervdoboz'],
  ['kup', 'fagyitölcsér'],
  ['piramis4', 'egyiptomi piramis'],
  ['sator', 'kemping sátor'],
  ['felgomb', 'fejjel lefelé fordított tál']
];

const L2: { plan: number[][]; build: boolean }[] = [
  { plan: [[1, 1, 1]], build: true },
  { plan: [[2, 1], [1, 0]], build: false },
  { plan: [[3, 2]], build: true },
  { plan: [[3, 2, 1]], build: false },
  { plan: [[2, 2], [2, 1]], build: true },
  { plan: [[4, 2], [1, 1]], build: false },
  { plan: [[3, 3, 3]], build: true },
  { plan: [[2, 2, 2], [2, 1, 1]], build: false }
];
const total = (p: number[][]) => p.flat().reduce((a, b) => a + b, 0);

const L3: [string, SolidKind][] = [
  ['Minden lapja négyzet.', 'kocka'],
  ['4 háromszög alakú lap határolja.', 'piramis3'],
  ['1 négyzet és 4 háromszög alakú lapja van.', 'piramis4'],
  ['2 háromszög és 3 téglalap alakú lapja van.', 'sator'],
  ['2 kör alakú lapja és görbe része van.', 'henger'],
  ['1 kör alakú lapja van, a teteje hegyes.', 'kup'],
  ['Nincs lapja, akárhogy teszed, gurul.', 'gomb'],
  ['1 kör alakú lapja van, a teteje gömbölyű.', 'felgomb']
];

const SOLIDS_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mire hasonlít?',
    description: 'Melyik tárgy hasonlít a testre?',
    pairs: L1.map(([k, t], i) => ({ id: `solm${i + 1}`, left: '', promptFigure: <SolidCard kind={k} />, right: t }))
  },
  {
    level: 2,
    title: '2. szint: Hány kocka?',
    description: 'Hány kis kockából áll? Az alaprajzon add össze a számokat!',
    pairs: L2.map(({ plan, build }, i) => ({
      id: `solm${i + 9}`,
      left: build ? 'Hány kocka?' : 'alaprajz',
      promptFigure: build ? <BuildingCard plan={plan} /> : <PlanCard plan={plan} />,
      right: `${total(plan)} kocka`
    }))
  },
  {
    level: 3,
    title: '3. szint: Melyik test ez?',
    description: 'Olvasd el, és keresd meg a testet!',
    pairs: L3.map(([t, k], i) => ({ id: `solm${i + 17}`, left: t, right: '', valueFigure: <SolidCard kind={k} /> }))
  }
];

export const SOLIDS_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SOLIDS_G3_MATCHER_LEVELS_LIST[0],
  2: SOLIDS_G3_MATCHER_LEVELS_LIST[1],
  3: SOLIDS_G3_MATCHER_LEVELS_LIST[2]
};

export const SolidsG3Matcher: React.FC<SolidsG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-geom-testek-matcher',
  topicTitle = '1. A testek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId={topicId}
      subtopicId="a-testek"
      title={topicTitle}
      subtitle="Párosítsd a testeket a tárgyakkal, az építményeket a kockák számával!"
      levels={SOLIDS_G3_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default SolidsG3Matcher;
