import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatProbPracticeExamMatcherProps {
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

const STAT_PROB_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Statisztikai fogalmak',
    description: 'Párosítsd a jellemzőt a jelentésével!',
    pairs: [
      { id: 'spm1', left: 'átlag', right: 'az adatok összege osztva az elemszámmal' },
      { id: 'spm2', left: 'medián', right: 'a rendezett adatsor középső eleme' },
      { id: 'spm3', left: 'módusz', right: 'a leggyakoribb adat' },
      { id: 'spm4', left: 'terjedelem', right: 'a legnagyobb és a legkisebb adat különbsége' },
      { id: 'spm5', left: 'félterjedelem', right: 'Q₃ − Q₁' },
      { id: 'spm6', left: 'szórás', right: 'az átlagtól való eltérések négyzetátlagának gyöke' },
      { id: 'spm7', left: 'alsó kvartilis', right: 'az adatok kb. negyede kisebb vagy egyenlő nála' },
      { id: 'spm8', left: 'relatív gyakoriság', right: 'gyakoriság osztva az összes adat számával' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Adatsokaság ↔ jellemző',
    description: 'Számold ki a jellemzőt, és párosítsd az értékével!',
    pairs: [
      { id: 'spm9', left: '2; 4; 4; 5; 10 átlaga', right: '5' },
      { id: 'spm10', left: '1; 3; 8; 10 mediánja', right: '5,5' },
      { id: 'spm11', left: '12; 7; 19; 4 terjedelme', right: '15' },
      { id: 'spm12', left: '1 és 3 szórása', right: '1' },
      { id: 'spm13', left: '2; 4; 4; 4; 5; 5; 7; 9 szórása', right: '2' },
      { id: 'spm14', left: 'a kördiagram 24 osztályzatának átlaga', right: '3' },
      { id: 'spm15', left: 'a 19 tömegmérés módusza', right: '37 g' },
      { id: 'spm16', left: 'a tudáspróba 13 adatának alsó kvartilise', right: '15,5' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Valószínűség és várható érték',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'spm17', left: 'részvény jövő évi árának várható értéke', right: '3264 Ft' },
      { id: 'spm18', left: 'különleges kocka (1, 1, 1, 3, 3, 6) várható értéke', right: '2,5' },
      { id: 'spm19', left: 'automata (p = 0,8): 5 napból legalább 4', right: '≈ 0,737' },
      { id: 'spm20', left: 'díszkő (p = 0,99): 21 dobozból legalább 20', right: '≈ 0,981' },
      { id: 'spm21', left: '1–50 közül 3 szám: mind páros', right: '≈ 0,117' },
      { id: 'spm22', left: 'ötös lottó: 0 találat', right: '≈ 0,746' },
      { id: 'spm23', left: 'két kocka: az összeg 7', right: '1/6' },
      { id: 'spm24', left: 'két kocka: a nagyobbik szám 6', right: '11/36' }
    ]
  }
};

export const StatProbPracticeExamMatcher: React.FC<StatProbPracticeExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-tudasproba-matcher',
  topicTitle = '16. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Párosítsd a statisztikai fogalmakat, az adatsokaságok jellemzőit és a valószínűségi feladatok eredményeit!"
      levels={STAT_PROB_EXAM_MATCHER_LEVELS}
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

export default StatProbPracticeExamMatcher;
