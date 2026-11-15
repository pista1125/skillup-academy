import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DivisibilityProblemsMatcherProps {
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

const DIVISIBILITY_PROBLEMS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Összetett oszthatósági szabályok',
    description: 'Párosítsd az osztót a vele egyenértékű feltétellel!',
    pairs: [
      { id: 'dpm1', left: '6-tal osztható', right: '2-vel és 3-mal osztható' },
      { id: 'dpm2', left: '10-zel osztható', right: '0-ra végződik' },
      { id: 'dpm3', left: '100-zal osztható', right: '00-ra végződik' },
      { id: 'dpm4', left: '12-vel osztható', right: '3-mal és 4-gyel osztható' },
      { id: 'dpm5', left: '15-tel osztható', right: '3-mal és 5-tel osztható' },
      { id: 'dpm6', left: '45-tel osztható', right: '5-tel és 9-cel osztható' },
      { id: 'dpm7', left: '18-cal osztható', right: '2-vel és 9-cel osztható' },
      { id: 'dpm8', left: '36-tal osztható', right: '4-gyel és 9-cel osztható' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számolások',
    description: 'Párosítsd a kifejezést az értékével!',
    pairs: [
      { id: 'dpm9', left: '1260 prímtényezős alakja', right: '2² · 3² · 5 · 7' },
      { id: 'dpm10', left: '1260 pozitív osztóinak száma', right: '36' },
      { id: 'dpm11', left: '(3575; 3125)', right: '25' },
      { id: 'dpm12', left: '(5120; 4480)', right: '640' },
      { id: 'dpm13', left: '[72; 15]', right: '360' },
      { id: 'dpm14', left: '[75; 40]', right: '600' },
      { id: 'dpm15', left: 'lkkt = 48, lnko = 6: a két szám', right: '6 és 48' },
      { id: 'dpm16', left: '2⁵ − 2', right: '30 = 5 · 6' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szöveges feladatok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'dpm17', left: 'Országgyűlési és elnökválasztás egy évben, 2017 után', right: '2022' },
      { id: 'dpm18', left: 'Országgyűlési és EP-választás egy évben, 2014 után', right: '2034' },
      { id: 'dpm19', left: 'Mindhárom választás ugyanabban az évben', right: 'soha' },
      { id: 'dpm20', left: '8 és 5 percenként induló buszok: első közös indulás 6.00 után', right: '6.40' },
      { id: 'dpm21', left: 'Bonbonos dobozok (4 × 16 × 20 cm): legkisebb karton', right: '80 × 80 × 80 cm' },
      { id: 'dpm22', left: 'Ennyi bonbonos doboz fér a legkisebb kartonba', right: '400' },
      { id: 'dpm23', left: 'A második legkisebb megfelelő karton', right: '80 × 80 × 160 cm' },
      { id: 'dpm24', left: '(3xy; xy) = 3 megoldásainak száma', right: '12' }
    ]
  }
];

const DIVISIBILITY_PROBLEMS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIVISIBILITY_PROBLEMS_MATCHER_LEVELS_LIST[0],
  2: DIVISIBILITY_PROBLEMS_MATCHER_LEVELS_LIST[1],
  3: DIVISIBILITY_PROBLEMS_MATCHER_LEVELS_LIST[2]
};

export const DivisibilityProblemsMatcher: React.FC<DivisibilityProblemsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-oszthatosagi-feladatok-matcher',
  topicTitle = '6. Oszthatósági feladatok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="oszthatosagi-feladatok"
      title={topicTitle}
      subtitle="Párosítsd az összetett oszthatósági szabályokat, a számolásokat és a szöveges feladatok eredményeit!"
      levels={DIVISIBILITY_PROBLEMS_MATCHER_LEVELS}
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

export default DivisibilityProblemsMatcher;
