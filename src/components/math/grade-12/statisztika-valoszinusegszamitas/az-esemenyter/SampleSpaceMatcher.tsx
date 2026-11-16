import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SampleSpaceMatcherProps {
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

const SAMPLE_SPACE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Alapfogalmak",
    description: "Párosítsd a fogalmat a jelentésével!",
    pairs: [
      { id: 'ssm1', left: "elemi esemény", right: "a véletlen kísérlet egy lehetséges kimenetele" },
      { id: 'ssm2', left: "eseménytér (H)", right: "az elemi események halmaza" },
      { id: 'ssm3', left: "esemény", right: "az eseménytér részhalmaza" },
      { id: 'ssm4', left: "biztos esemény", right: "olyan esemény, amely biztosan bekövetkezik" },
      { id: 'ssm5', left: "lehetetlen esemény", right: "olyan esemény, amely nem következhet be" },
      { id: 'ssm6', left: "Ā (A komplementere)", right: "pontosan akkor következik be, amikor A nem" },
      { id: 'ssm7', left: "egymást kizáró események", right: "egyszerre nem következhetnek be" },
      { id: 'ssm8', left: "FIF (10, 20, 50 Ft)", right: "10 Ft: fej, 20 Ft: írás, 50 Ft: fej" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Mekkora az eseménytér?",
    description: "Párosítsd a kísérletet az elemi események számával!",
    pairs: [
      { id: 'ssm9', left: "egy kockadobás", right: "6" },
      { id: 'ssm10', left: "egy pénzérme feldobása", right: "2" },
      { id: 'ssm11', left: "két pénzérme feldobása", right: "4" },
      { id: 'ssm12', left: "három különböző pénzérme", right: "8" },
      { id: 'ssm13', left: "két játék kezdője négy barát közül", right: "16" },
      { id: 'ssm14', left: "öt pénzérme feldobása", right: "32" },
      { id: 'ssm15', left: "egy dobókocka és egy pénzérme", right: "12" },
      { id: 'ssm16', left: "fehér és fekete dobókocka", right: "36" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Két dobókocka eseményei",
    description: "Hány elemi eseményből áll az esemény? (fehér és fekete kocka)",
    pairs: [
      { id: 'ssm17', left: "van hatos dobás", right: "11" },
      { id: 'ssm18', left: "egyik dobás sem hatos", right: "25" },
      { id: 'ssm19', left: "pontosan az egyik dobás hatos", right: "10" },
      { id: 'ssm20', left: "mindkét dobás hatos", right: "1" },
      { id: 'ssm21', left: "a dobások összege 8", right: "5" },
      { id: 'ssm22', left: "a dobások összege kisebb, mint 9", right: "26" },
      { id: 'ssm23', left: "van olyan dobás, amelyik nem hatos", right: "35" },
      { id: 'ssm24', left: "a két dobás egyenlő", right: "6" }
    ]
  }
};

export const SampleSpaceMatcher: React.FC<SampleSpaceMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-esemenyter-matcher',
  topicTitle = "5. Az eseménytér – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="az-esemenyter"
      title={topicTitle}
      subtitle="Gyakorold az eseménytér fogalmait, az eseményterek méretét és az események elemi eseményeinek számát!"
      levels={SAMPLE_SPACE_MATCHER_LEVELS}
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

export default SampleSpaceMatcher;
