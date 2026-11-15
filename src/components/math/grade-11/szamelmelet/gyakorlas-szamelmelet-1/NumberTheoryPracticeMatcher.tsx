import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberTheoryPracticeMatcherProps {
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

const NUMBER_THEORY_PRACTICE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak és szabályok',
    description: 'Párosítsd a fogalmat a meghatározásával vagy a szabállyal!',
    pairs: [
      { id: 'ntpm1', left: 'Prímszám', right: 'Pontosan két pozitív osztója van' },
      { id: 'ntpm2', left: 'Relatív prímek', right: 'Legnagyobb közös osztójuk 1' },
      { id: 'ntpm3', left: '(a; b) · [a; b]', right: 'a · b' },
      { id: 'ntpm4', left: 'Véges tizedes tört', right: 'A nevező prímtényezői csak 2 és 5' },
      { id: 'ntpm5', left: '4-gyel való oszthatóság', right: 'Az utolsó két jegyből álló szám dönt' },
      { id: 'ntpm6', left: '9-cel való oszthatóság', right: 'A számjegyek összege dönt' },
      { id: 'ntpm7', left: 'Ellenpélda', right: 'Megcáfol egy „ha…, akkor” állítást' },
      { id: 'ntpm8', left: 'ℚ, a racionális számok halmaza', right: 'Zárt mind a négy alapműveletre' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számolások',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'ntpm9', left: 'A 72 prímtényezős alakja', right: '2³ · 3²' },
      { id: 'ntpm10', left: 'A 72 osztóinak száma', right: '12' },
      { id: 'ntpm11', left: '(48; 75)', right: '3' },
      { id: 'ntpm12', left: '[48; 75]', right: '1200' },
      { id: 'ntpm13', left: '[8; 9; 10; 12]', right: '360' },
      { id: 'ntpm14', left: 'A 13 579 ötös maradéka', right: '4' },
      { id: 'ntpm15', left: '10011010₂', right: '154' },
      { id: 'ntpm16', left: '5/6 tizedes tört alakja', right: '0,8(3) = 0,8333…' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi és érettségi feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'ntpm17', left: 'Facsemeték: 8, 9, 10 vagy 12 fás sorok, mindig 5 marad, kevesebb mint 500', right: '365' },
      { id: 'ntpm18', left: 'Dominók, amelyeken a pöttyök szorzata prím', right: '3' },
      { id: 'ntpm19', left: 'A kapitány kora, ha a szorzat 25 756', right: '47' },
      { id: 'ntpm20', left: 'A kapitány kora, ha a szorzat 6401', right: '37' },
      { id: 'ntpm21', left: 'A számrendszer alapja, ha 6 · 9 = 42', right: '13' },
      { id: 'ntpm22', left: 'A 20-nál kisebb pozitív prímek összege', right: '77' },
      { id: 'ntpm23', left: 'Az 1260 osztóinak száma', right: '36' },
      { id: 'ntpm24', left: 'Legkisebb b, amellyel 2⁴ · 3⁵ · 5² · 7 · 11² · b négyzetszám', right: '21' }
    ]
  }
];

const NUMBER_THEORY_PRACTICE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBER_THEORY_PRACTICE_MATCHER_LEVELS_LIST[0],
  2: NUMBER_THEORY_PRACTICE_MATCHER_LEVELS_LIST[1],
  3: NUMBER_THEORY_PRACTICE_MATCHER_LEVELS_LIST[2]
};

export const NumberTheoryPracticeMatcher: React.FC<NumberTheoryPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-gyakorlas-matcher',
  topicTitle = '9. Gyakorlás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="gyakorlas-szamelmelet-1"
      title={topicTitle}
      subtitle="Párosítsd a fejezet fogalmait, a számolásokat és a tankönyvi feladatokat az eredményeikkel!"
      levels={NUMBER_THEORY_PRACTICE_MATCHER_LEVELS}
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

export default NumberTheoryPracticeMatcher;
