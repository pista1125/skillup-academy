import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Sampling12MatcherProps {
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

const SAMPLING_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalmak és jelölések',
    description: 'Párosítsd a fogalmat vagy jelölést a jelentésével!',
    pairs: [
      { id: 'smm1', left: 'visszatevés nélküli mintavétel', right: 'a kiválasztott elemet nem tesszük vissza' },
      { id: 'smm2', left: 'visszatevéses mintavétel', right: 'minden kiválasztásnál ugyanazt a kísérletet ismételjük' },
      { id: 'smm3', left: 'binomiális eloszlás', right: '(n alatt k) · p^k · (1 − p)^{n − k}' },
      { id: 'smm4', left: '(N alatt n)', right: 'az összes lehetséges n elemű minta száma' },
      { id: 'smm5', left: 'M', right: 'a tulajdonsággal rendelkező elemek száma' },
      { id: 'smm6', left: 'N − M', right: 'a tulajdonsággal nem rendelkező elemek száma' },
      { id: 'smm7', left: '(n alatt k) a binomiális képletben', right: 'hányféleképpen lehet k kedvező az n kísérletből' },
      { id: 'smm8', left: '1 − p', right: 'egy kísérlet kedvezőtlen kimenetelének valószínűsége' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Binomiális együtthatók',
    description: 'Párosítsd a binomiális együtthatót az értékével!',
    pairs: [
      { id: 'smm9', left: '(9 alatt 3)', right: '84' },
      { id: 'smm10', left: '(12 alatt 3)', right: '220' },
      { id: 'smm11', left: '(15 alatt 3)', right: '455' },
      { id: 'smm12', left: '(9 alatt 4)', right: '126' },
      { id: 'smm13', left: '(13 alatt 4)', right: '715' },
      { id: 'smm14', left: '(5 alatt 2)', right: '10' },
      { id: 'smm15', left: '(49 alatt 2)', right: '1176' },
      { id: 'smm16', left: '(26 alatt 2)', right: '325' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Feladatok eredménye',
    description: 'Párosítsd a feladatot a valószínűséggel!',
    pairs: [
      { id: 'smm17', left: 'ötöslottó: pontosan 2 találat', right: '≈ 0,0225' },
      { id: 'smm18', left: 'egy-egy diák a 12. a-ból és a 12. b-ből: mindkettő lány', right: '0,275' },
      { id: 'smm19', left: 'két diák a 49 végzősből: mindkettő lány', right: '≈ 0,276' },
      { id: 'smm20', left: '100 vizsgálat, p = 0,03: egyszer sem mellékhatás', right: '≈ 0,048' },
      { id: 'smm21', left: '100 vizsgálat, p = 0,03: pontosan 3 mellékhatás', right: '≈ 0,227' },
      { id: 'smm22', left: '8 palacsinta, p = 0,1: pontosan 1 szakad el', right: '≈ 0,383' },
      { id: 'smm23', left: '20 edényből 4 (5 natúr): pontosan 1 natúr', right: '≈ 0,470' },
      { id: 'smm24', left: 'p² = 0,64 (két új mező, mindkétszer nő)', right: 'p = 0,8' }
    ]
  }
};

export const Sampling12Matcher: React.FC<Sampling12MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-mintavetelek-matcher',
  topicTitle = '10. Mintavételek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="mintavetelek"
      title={topicTitle}
      subtitle="Gyakorold a visszatevéses és a visszatevés nélküli mintavételt!"
      levels={SAMPLING_MATCHER_LEVELS}
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

export default Sampling12Matcher;
