import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PermutationsMatcherProps {
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

const PERMUTATIONS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Faktoriálisok',
    description: 'Párosítsd a kifejezést az értékével!',
    pairs: [
      { id: 'pmm1', left: '0!', right: '1' },
      { id: 'pmm2', left: '3!', right: '6' },
      { id: 'pmm3', left: '4!', right: '24' },
      { id: 'pmm4', left: '5!', right: '120' },
      { id: 'pmm5', left: '6!', right: '720' },
      { id: 'pmm6', left: '7!', right: '5040' },
      { id: 'pmm7', left: '10! : 9!', right: '10' },
      { id: 'pmm8', left: '(5!)²', right: '14 400' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Sorrendek megkötésekkel',
    description: 'Párosítsd a feladatot a sorrendek számával!',
    pairs: [
      { id: 'pmm9', left: '5 vadállat felvonulása', right: '120' },
      { id: 'pmm10', left: '5 állat, a tigris és az oroszlán közvetlenül egymás után', right: '48' },
      { id: 'pmm11', left: '5 állat, a tigris és az oroszlán nem egymás után', right: '72' },
      { id: 'pmm12', left: '5 állat körbevonul, senki sem „első”', right: '24' },
      { id: 'pmm13', left: '3 lány és 3 fiú váltakozva (lány, fiú, …)', right: '36' },
      { id: 'pmm14', left: '7 fiú és 7 lány táncoló párokba', right: '5040' },
      { id: 'pmm15', left: '4 színházi hely, Anna és Béla egymás mellett', right: '12' },
      { id: 'pmm16', left: '10 számjegykártya csökkenő sorrendben', right: '1' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Nagy esetszámok',
    description: 'Párosítsd a tankönyvi feladatot az eredményével!',
    pairs: [
      { id: 'pmm17', left: 'Öttusa: 5 A, 4 B, 3 C akadály, típuson belül szabad sorrend', right: '17 280' },
      { id: 'pmm18', left: '10 tanuló a tornapadon', right: '3 628 800' },
      { id: 'pmm19', left: '10 tanuló, Csilla és Panni egymás mellett', right: '725 760' },
      { id: 'pmm20', left: '10 tanuló, Zoli és Gábor nem egymás mellett', right: '2 903 040' },
      { id: 'pmm21', left: '10 tanuló, Csilla–Panni egymás mellett, Zoli–Gábor nem', right: '564 480' },
      { id: 'pmm22', left: '12 tanuló kimegy, Csilla és Panni a két utolsó', right: '7 257 600' },
      { id: 'pmm23', left: '12 tanuló kimegy, Zoli, Gábor és Peti az első három', right: '2 177 280' },
      { id: 'pmm24', left: 'Tízjegyű számok a 10 számjegykártyából', right: '3 265 920' }
    ]
  }
];

const PERMUTATIONS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: PERMUTATIONS_MATCHER_LEVELS_LIST[0],
  2: PERMUTATIONS_MATCHER_LEVELS_LIST[1],
  3: PERMUTATIONS_MATCHER_LEVELS_LIST[2]
};

export const PermutationsMatcher: React.FC<PermutationsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-comb-sorba-rendezes-matcher',
  topicTitle = '2. Sorba rendezés – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="sorba-rendezes"
      title={topicTitle}
      subtitle="Gyakorold a faktoriálist és a sorba rendezést: rögzített helyek, egymás melletti és nem egymás melletti elemek!"
      levels={PERMUTATIONS_MATCHER_LEVELS}
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

export default PermutationsMatcher;
