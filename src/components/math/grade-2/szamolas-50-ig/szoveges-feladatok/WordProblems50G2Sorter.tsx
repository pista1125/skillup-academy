import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { DotsCard, BarCard, CompareCard } from './WordProblems50G2CardFigures';

interface WordProblems50G2SorterProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mit kérdez a feladat?',
    description: 'Összesen hány? Mennyi maradt? Vagy mennyivel több? Válogasd szét!',
    categories: [
      { id: 'osszes', name: 'Összesen hány?', color: 'sky' },
      { id: 'marad', name: 'Mennyi maradt?', color: 'rose' },
      { id: 'tobb', name: 'Mennyivel több?', color: 'amber' }
    ],
    items: [
      { id: 'wp50s1', text: 'Van 23 piros és 4 kék.', categoryId: 'osszes' },
      { id: 'wp50s2', text: '', categoryId: 'osszes', figure: <DotsCard a={15} b={6} small /> },
      { id: 'wp50s3', text: '', categoryId: 'osszes', figure: <BarCard parts={[{ v: 20, size: 20 }, { v: 9, size: 9, color: 'green' }]} total="?" small /> },
      { id: 'wp50s4', text: 'Volt 30. Elfogyott 8.', categoryId: 'marad' },
      { id: 'wp50s5', text: '', categoryId: 'marad', figure: <DotsCard a={30} crossed={8} small /> },
      { id: 'wp50s6', text: 'A 25 madárból 5 elrepült.', categoryId: 'marad' },
      { id: 'wp50s7', text: 'Gabi 20, Ben 26. Ki mennyivel több?', categoryId: 'tobb' },
      { id: 'wp50s8', text: '', categoryId: 'tobb', figure: <CompareCard rows={[{ size: 35, text: 35 }, { size: 28, text: 28 }]} diff="?" small /> },
      { id: 'wp50s9', text: '', categoryId: 'tobb', figure: <CompareCard rows={[{ size: 19, text: 19 }, { size: 12, text: 12 }]} diff="?" small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'e25', name: 'Eredmény: 25', color: 'blue' },
      { id: 'e30', name: 'Eredmény: 30', color: 'emerald' },
      { id: 'e35', name: 'Eredmény: 35', color: 'purple' }
    ],
    items: [
      { id: 'wp50s10', text: 'Van 19. Kap még 6-ot.', categoryId: 'e25' },
      { id: 'wp50s11', text: '', categoryId: 'e25', figure: <BarCard parts={[{ v: 17, size: 17 }, { v: 8, size: 8, color: 'green' }]} total="?" small /> },
      { id: 'wp50s12', text: 'Volt 32. Elment 7.', categoryId: 'e25' },
      { id: 'wp50s13', text: '', categoryId: 'e30', figure: <DotsCard a={34} crossed={4} small /> },
      { id: 'wp50s14', text: 'Anna 22. Bori 8-cal több. Bori?', categoryId: 'e30' },
      { id: 'wp50s15', text: '', categoryId: 'e30', figure: <CompareCard rows={[{ size: 39, text: 39 }, { size: 30, text: '?' }]} diff="9" small /> },
      { id: 'wp50s16', text: 'Volt 50. Elvittek 15-öt.', categoryId: 'e35' },
      { id: 'wp50s17', text: '', categoryId: 'e35', figure: <BarCard parts={[{ v: 27, size: 27 }, { v: 8, size: 8, color: 'green' }]} total="?" small /> },
      { id: 'wp50s18', text: '', categoryId: 'e35', figure: <BarCard parts={[{ v: '?', size: 35 }, { v: 8, size: 8, color: 'rose' }]} total={43} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hogyan számolsz?',
    description: 'Vigyázz a csavaros szövegre! Összeadás, kivonás vagy két lépés kell?',
    categories: [
      { id: 'plus', name: 'Összeadás (+)', color: 'sky' },
      { id: 'minus', name: 'Kivonás (−)', color: 'rose' },
      { id: 'two', name: 'Két lépés', color: 'amber' }
    ],
    items: [
      { id: 'wp50s19', text: 'Bea 17. Dóri 8-cal több. Dóri?', categoryId: 'plus' },
      { id: 'wp50s20', text: 'Lili 24, ez 5-tel kevesebb, mint Zsófié. Zsófi?', categoryId: 'plus' },
      { id: 'wp50s21', text: '', categoryId: 'plus', figure: <BarCard parts={[{ v: 15, size: 15 }, { v: 9, size: 9, color: 'green' }]} total="?" small /> },
      { id: 'wp50s22', text: '32 kacsa, ez 7-tel több, mint a liba. Liba?', categoryId: 'minus' },
      { id: 'wp50s23', text: '', categoryId: 'minus', figure: <CompareCard rows={[{ size: 31, text: 31 }, { size: 23, text: 23 }]} diff="?" small /> },
      { id: 'wp50s24', text: '', categoryId: 'minus', figure: <DotsCard a={26} crossed={9} small /> },
      { id: 'wp50s25', text: 'Volt 40. Evett 8-at. Adott 10-et.', categoryId: 'two' },
      { id: 'wp50s26', text: 'Kapott 12-t és 15-öt. Elvesztett 6-ot.', categoryId: 'two' },
      {
        id: 'wp50s27',
        text: '',
        categoryId: 'two',
        figure: <BarCard parts={[{ v: 14, size: 14 }, { v: 11, size: 11, color: 'green' }, { v: '?', size: 12 }]} total={37} small />
      }
    ]
  }
];

export const WORD_PROBLEMS50_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const WordProblems50G2Sorter: React.FC<WordProblems50G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c50-szoveges-sorter',
  topicTitle = '5. Szöveges feladatok – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Válogasd szét a szöveges feladatokat kérdés, eredmény és számolási mód szerint!"
      levels={WORD_PROBLEMS50_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
    />
  );
};

export default WordProblems50G2Sorter;
