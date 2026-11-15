import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DivisibilityLogicMatcherProps {
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

const DIVISIBILITY_LOGIC_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Logikai alapfogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'dlm1', left: 'Állítás (kijelentés)', right: 'Kijelentő mondat, amelyről egyértelműen eldönthető, igaz-e' },
      { id: 'dlm2', left: 'Tagadás (negáció)', right: 'Igaz, ha az eredeti állítás hamis' },
      { id: 'dlm3', left: '„és” (konjunkció)', right: 'Igaz, ha mindkét kijelentés igaz' },
      { id: 'dlm4', left: 'Megengedő „vagy” (diszjunkció)', right: 'Igaz, ha legalább az egyik kijelentés igaz' },
      { id: 'dlm5', left: 'Kizáró „vagy-vagy”', right: 'Igaz, ha pontosan az egyik kijelentés igaz' },
      { id: 'dlm6', left: '„ha…, akkor” (implikáció)', right: 'Csak akkor hamis, ha az előtag igaz és az utótag hamis' },
      { id: 'dlm7', left: '„akkor és csak akkor” (ekvivalencia)', right: 'Igaz, ha a két kijelentés logikai értéke megegyezik' },
      { id: 'dlm8', left: 'A „de” kötőszó', right: 'Az „és” műveletet fejezi ki' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tagadások',
    description: 'Párosítsd a kijelentést a tagadásával!',
    pairs: [
      { id: 'dlm9', left: 'A 6 páros szám.', right: 'A 6 páratlan szám.' },
      { id: 'dlm10', left: 'Az 1 prímszám.', right: 'Az 1 nem prímszám.' },
      { id: 'dlm11', left: 'Minden kétjegyű prímszám páratlan.', right: 'Van páros kétjegyű prímszám.' },
      { id: 'dlm12', left: 'Van olyan prímszám, ami páros.', right: 'Minden prímszám páratlan.' },
      { id: 'dlm13', left: 'Minden prímszámnak pontosan 2 osztója van.', right: 'Van olyan prímszám, amelynek nem pontosan 2 osztója van.' },
      { id: 'dlm14', left: 'Bármelyik természetes számnak végtelen sok többszöröse van.', right: 'Van olyan természetes szám, amelynek csak véges sok többszöröse van.' },
      { id: 'dlm15', left: 'Létezik olyan természetes szám, ami osztható 0-val.', right: 'Egyik természetes szám sem osztható 0-val.' },
      { id: 'dlm16', left: 'Létezik páratlan prímszám.', right: 'Minden prímszám páros.' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Állítások megfordítása',
    description: 'Párosítsd az állítást a megfordításával!',
    pairs: [
      { id: 'dlm17', left: 'Ha 4 | n, akkor n páros.', right: 'Ha n páros, akkor 4 | n.' },
      { id: 'dlm18', left: 'Ha 3 | n, akkor 9 | n.', right: 'Ha 9 | n, akkor 3 | n.' },
      { id: 'dlm19', left: 'Ha 12 | n, akkor 4 | n.', right: 'Ha 4 | n, akkor 12 | n.' },
      { id: 'dlm20', left: 'Ha 12 | n, akkor 6 | n.', right: 'Ha 6 | n, akkor 12 | n.' },
      { id: 'dlm21', left: 'Ha n osztója 24-nek, akkor osztója 12-nek.', right: 'Ha n osztója 12-nek, akkor osztója 24-nek.' },
      { id: 'dlm22', left: 'Ha 3 | n, akkor n számjegyeinek összege osztható 3-mal.', right: 'Ha n számjegyeinek összege osztható 3-mal, akkor 3 | n.' },
      { id: 'dlm23', left: 'Ha ez az autó Ferrari, akkor Olaszországban gyártották.', right: 'Ha ezt az autót Olaszországban gyártották, akkor Ferrari.' },
      { id: 'dlm24', left: 'Ha két szám különböző összetett szám, akkor relatív prímek.', right: 'Ha két szám relatív prím, akkor különböző összetett számok.' }
    ]
  }
];

const DIVISIBILITY_LOGIC_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIVISIBILITY_LOGIC_MATCHER_LEVELS_LIST[0],
  2: DIVISIBILITY_LOGIC_MATCHER_LEVELS_LIST[1],
  3: DIVISIBILITY_LOGIC_MATCHER_LEVELS_LIST[2]
};

export const DivisibilityLogicMatcher: React.FC<DivisibilityLogicMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-oszthatosag-logika-matcher',
  topicTitle = '5. Oszthatóság és logika – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="oszthatosag-es-logika"
      title={topicTitle}
      subtitle="Párosítsd a logikai műveleteket, a tagadásokat és az állítások megfordítását!"
      levels={DIVISIBILITY_LOGIC_MATCHER_LEVELS}
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

export default DivisibilityLogicMatcher;
