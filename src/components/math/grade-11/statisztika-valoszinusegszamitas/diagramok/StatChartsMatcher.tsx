import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatChartsMatcherProps {
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

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalom ↔ jelentés',
    description: 'Párosítsd a diagramtípust vagy fogalmat a leírásával!',
    pairs: [
      { id: 'scm1', left: 'oszlopdiagram', right: 'gyakoriságok összehasonlítása oszlopmagassággal' },
      { id: 'scm2', left: 'kördiagram', right: 'részek aránya az egészhez, középponti szöggel' },
      { id: 'scm3', left: 'sávdiagram', right: 'százalékos megoszlás egyetlen téglalapon' },
      { id: 'scm4', left: 'vonaldiagram', right: 'egy mennyiség időbeli változásának követése' },
      { id: 'scm5', left: 'korfa', right: 'a népesség megoszlása kor és nem szerint' },
      { id: 'scm6', left: 'gyakorisági táblázat', right: 'az értékek és előfordulásuk száma' },
      { id: 'scm7', left: 'relatív gyakoriság', right: 'gyakoriság osztva az összes adat számával' },
      { id: 'scm8', left: 'súlyozott átlag', right: 'Σ (érték · gyakoriság) : Σ gyakoriság' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Arány ↔ középponti szög',
    description: 'Mekkora középponti szög tartozik az arányhoz a kördiagramon?',
    pairs: [
      { id: 'scm9', left: '25%', right: '90°' },
      { id: 'scm10', left: '50%', right: '180°' },
      { id: 'scm11', left: '10%', right: '36°' },
      { id: 'scm12', left: '5%', right: '18°' },
      { id: 'scm13', left: '1/3 rész', right: '120°' },
      { id: 'scm14', left: '75%', right: '270°' },
      { id: 'scm15', left: '20%', right: '72°' },
      { id: 'scm16', left: '12,5%', right: '45°' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Darabszám ↔ középponti szög',
    description: 'A zenekar 45, az osztály 30 főből áll. Mekkora szelet tartozik a csoporthoz?',
    pairs: [
      { id: 'scm17', left: '20 fő a 45-ből', right: '160°' },
      { id: 'scm18', left: '16 fő a 45-ből', right: '128°' },
      { id: 'scm19', left: '7 fő a 45-ből', right: '56°' },
      { id: 'scm20', left: '2 fő a 45-ből', right: '16°' },
      { id: 'scm21', left: '2 diák a 30-ból', right: '24°' },
      { id: 'scm22', left: '10 diák a 30-ból', right: '120°' },
      { id: 'scm23', left: '11 diák a 30-ból', right: '132°' },
      { id: 'scm24', left: '7 diák a 30-ból', right: '84°' }
    ]
  }
};

export const StatChartsMatcher: React.FC<StatChartsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-diagramok-matcher',
  topicTitle = '2. Diagramok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="diagramok"
      title={topicTitle}
      subtitle="Párosítsd a diagramtípusokat a felhasználásukkal, a százalékokat és a darabszámokat a középponti szögükkel!"
      levels={MATCHER_LEVELS}
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

export default StatChartsMatcher;
