import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersApplicationMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapvető Azonosságok és Értékeik',
    subtitle: 'Párosítsd az azonos alapú és kitevőjű műveleteket a helyes hatványalakkal és értékkel!',
    pairs: [
      {
        id: 'p1',
        prompt: '2⁴ · 2³',
        value: '2⁷ = 128 (4 + 3 = 7)'
      },
      {
        id: 'p2',
        prompt: '3⁶ : 3²',
        value: '3⁴ = 81 (6 - 2 = 4)'
      },
      {
        id: 'p3',
        prompt: '(2²)³',
        value: '2⁶ = 64 (2 · 3 = 6)'
      },
      {
        id: 'p4',
        prompt: '(2 · 5)³',
        value: '10³ = 1 000 (2³ · 5³)'
      },
      {
        id: 'p5',
        prompt: '(1/2)⁴',
        value: '1/16 (1⁴ / 2⁴)'
      },
      {
        id: 'p6',
        prompt: 'x³ · x⁵',
        value: 'x⁸ (alap marad, kitevők összeadódnak)'
      },
      {
        id: 'p7',
        prompt: 'y⁷ : y³',
        value: 'y⁴ (7 - 3 = 4)'
      },
      {
        id: 'p8',
        prompt: '5³ : 5³',
        value: '5⁰ = 1 (bármely nemnulla szám 0. hatványa)'
      }
    ]
  },
  2: {
    title: '2. Szint: Zárójelek, Algebra és Átírások',
    subtitle: 'Párosítsd a kifejezéseket az egyszerűsített alakjukkal és közös alapra hozott formájukkal!',
    pairs: [
      {
        id: 'p9',
        prompt: '(3a)²',
        value: '9a² (mindkét tényező négyzeten)'
      },
      {
        id: 'p10',
        prompt: '4³ 2-es alappal',
        value: '2⁶ (mivel 4 = 2², így (2²)³)'
      },
      {
        id: 'p11',
        prompt: '8² 2-es alappal',
        value: '2⁶ (mivel 8 = 2³, így (2³)²)'
      },
      {
        id: 'p12',
        prompt: '6³ : 2³',
        value: '(6/2)³ = 3³ = 27'
      },
      {
        id: 'p13',
        prompt: '2⁴ + 2⁴',
        value: '2 · 2⁴ = 2⁵ = 32'
      },
      {
        id: 'p14',
        prompt: '25² · 4²',
        value: '(25 · 4)² = 100² = 10 000'
      },
      {
        id: 'p15',
        prompt: '(2x²)³',
        value: '8x⁶ (2³ · (x²)³ = 8x⁶)'
      },
      {
        id: 'p16',
        prompt: '(-2)³ · (-2)²',
        value: '(-2)⁵ = -32 (páratlan kitevő)'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Kifejezések és Emeletes Törtek',
    subtitle: 'Egyszerűsítsd a többlépéses hatványos feladatokat és találd meg a párokat!',
    pairs: [
      {
        id: 'p17',
        prompt: '(2⁷ · 2³) : 2⁶',
        value: '2⁴ = 16 (2¹⁰ : 2⁶ = 2⁴)'
      },
      {
        id: 'p18',
        prompt: '3⁵ + 3⁵ + 3⁵',
        value: '3 · 3⁵ = 3⁶ = 729'
      },
      {
        id: 'p19',
        prompt: '(4² · 8²) / 2⁸',
        value: '2² = 4 (2⁴ · 2⁶ = 2¹⁰, 2¹⁰/2⁸ = 2²)'
      },
      {
        id: 'p20',
        prompt: '(0,5)³ · 2³',
        value: '(0,5 · 2)³ = 1³ = 1'
      },
      {
        id: 'p21',
        prompt: '9³ / 3⁴',
        value: '3² = 9 ((3²)³ = 3⁶, 3⁶/3⁴ = 3²)'
      },
      {
        id: 'p22',
        prompt: '(x³ y²)²',
        value: 'x⁶ y⁴ (mindkét kitevő szorzódik 2-vel)'
      },
      {
        id: 'p23',
        prompt: '10⁵ / 2⁵',
        value: '(10/2)⁵ = 5⁵ = 3 125'
      },
      {
        id: 'p24',
        prompt: '2¹⁰ · 5¹⁰',
        value: '10¹⁰ (tízmilliárd)'
      }
    ]
  }
};

export const PowersApplicationMatcher: React.FC<PowersApplicationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-application',
  topicTitle = '2. Hatványok alkalmazása'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Hatványozás Azonosságai – Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a kifejezéseket az azonosságokkal számolt eredménnyel!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

export default PowersApplicationMatcher;
