import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SimultaneousDrawMatcherProps {
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

const SIMULTANEOUS_DRAW_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Binomiális együttható ↔ érték',
    description: 'Számold ki a binomiális együtthatót, és párosítsd az értékével!',
    pairs: [
      { id: 'sdm1', left: '(10 alatt 3)', right: '120' },
      { id: 'sdm2', left: '(10 alatt 4)', right: '210' },
      { id: 'sdm3', left: '(10 alatt 2)', right: '45' },
      { id: 'sdm4', left: '(10 alatt 5)', right: '252' },
      { id: 'sdm5', left: '(5 alatt 2)', right: '10' },
      { id: 'sdm6', left: '(6 alatt 3)', right: '20' },
      { id: 'sdm7', left: '(28 alatt 2)', right: '378' },
      { id: 'sdm8', left: '(14 alatt 2)', right: '91' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Egyenlő kifejezések',
    description: 'Kösd össze az egyenlőket!',
    pairs: [
      { id: 'sdm9', left: '(10 alatt 7)', right: '10! / (3! · 7!)' },
      { id: 'sdm10', left: '(10 alatt 6)', right: '10 · 9 · 8 · 7 / 4!' },
      { id: 'sdm11', left: '(10 alatt 8)', right: '10 · 9 / 2' },
      { id: 'sdm12', left: '(n alatt 1)', right: 'n' },
      { id: 'sdm13', left: '(n alatt 0)', right: '1' },
      { id: 'sdm14', left: '(90 alatt 5)', right: '43 949 268' },
      { id: 'sdm15', left: '(85 alatt 5)', right: '32 801 517' },
      { id: 'sdm16', left: '(32 alatt 3)', right: '4960' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Helyzet ↔ valószínűség',
    description: 'Egyszerre választunk ki elemeket. Párosítsd a helyzetet a valószínűséggel!',
    pairs: [
      { id: 'sdm17', left: '28 faktosból (15 tizenegyedikes) 2 diák: mindkettő 11.-es', right: '5/18' },
      { id: 'sdm18', left: '28 faktosból (13 tizenkettedikes) 2 diák: mindkettő 12.-es', right: '13/63' },
      { id: 'sdm19', left: '14 könyvből (10 prózai) 2: mindkettő prózai', right: '45/91' },
      { id: 'sdm20', left: '14 könyvből (4 vers) 2: mindkettő vers', right: '6/91' },
      { id: 'sdm21', left: '14 könyvből (2 Dosztojevszkij) 2: mindkettő Dosztojevszkij', right: '1/91' },
      { id: 'sdm22', left: '1–20 közül 2 szám: mindkettő osztója a 20-nak', right: '3/38' },
      { id: 'sdm23', left: '3 piros, 2 kék golyó, 2 húzás: mindkettő piros', right: '3/10' },
      { id: 'sdm24', left: '5 fehér, 3 fekete golyó, 3 húzás: mind fehér', right: '5/28' }
    ]
  }
};

export const SimultaneousDrawMatcher: React.FC<SimultaneousDrawMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-egyszerre-huzas-matcher',
  topicTitle = '10. Két vagy több elemet húzunk egyszerre – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="ket-vagy-tobb-elem-egyszerre"
      title={topicTitle}
      subtitle="Párosítsd a binomiális együtthatókat az értékükkel, az egyenlő kifejezéseket egymással, a helyzeteket a valószínűséggel!"
      levels={SIMULTANEOUS_DRAW_MATCHER_LEVELS}
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

export default SimultaneousDrawMatcher;
