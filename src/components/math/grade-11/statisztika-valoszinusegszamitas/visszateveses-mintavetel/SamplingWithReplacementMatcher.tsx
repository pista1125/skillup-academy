import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SamplingWithReplacementMatcherProps {
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

const SAMPLING_WITH_REPLACEMENT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat vagy a képlet részét a jelentésével!',
    pairs: [
      { id: 'swrm1', left: 'visszatevéses mintavétel', right: 'minden húzás ugyanazok közül az elemek közül történik' },
      { id: 'swrm2', left: '(n alatt k) a képletben', right: 'kiválasztjuk, hányadik kísérletek lesznek sikeresek' },
      { id: 'swrm3', left: 'pᵏ a képletben', right: 'a kiválasztott k kísérlet sikeres' },
      { id: 'swrm4', left: '(1 − p)^{n−k} a képletben', right: 'a többi n − k kísérlet nem sikeres' },
      { id: 'swrm5', left: 'binomiális eloszlás', right: '(n alatt k) · pᵏ · (1 − p)^{n−k}' },
      { id: 'swrm6', left: '(n alatt 0)', right: '1' },
      { id: 'swrm7', left: '(n alatt 1)', right: 'n' },
      { id: 'swrm8', left: '100 000 elemből 200 kiválasztása', right: 'a visszatevéses és a visszatevés nélküli eredmény közel azonos' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Binomiális együtthatók',
    description: 'Számold ki a binomiális együtthatót, és párosítsd az értékével!',
    pairs: [
      { id: 'swrm9', left: '(5 alatt 3)', right: '10' },
      { id: 'swrm10', left: '(8 alatt 2)', right: '28' },
      { id: 'swrm11', left: '(10 alatt 2)', right: '45' },
      { id: 'swrm12', left: '(7 alatt 4)', right: '35' },
      { id: 'swrm13', left: '(6 alatt 3)', right: '20' },
      { id: 'swrm14', left: '(10 alatt 5)', right: '252' },
      { id: 'swrm15', left: '(15 alatt 2)', right: '105' },
      { id: 'swrm16', left: '(6 alatt 4)', right: '15' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Helyzet ↔ valószínűség',
    description: 'Számold ki a binomiális valószínűséget, és párosítsd!',
    pairs: [
      { id: 'swrm17', left: '5 kísérlet (p = 0,8): pontosan 3 siker', right: '≈ 0,205' },
      { id: 'swrm18', left: 'Ferkó (p = 0,15) 5 lövése: 0 találat', right: '≈ 0,4437' },
      { id: 'swrm19', left: 'Ferkó 5 lövése: pontosan 1 találat', right: '≈ 0,3915' },
      { id: 'swrm20', left: 'Tünde 3 palacsintája (p = 0,2): pontosan 1 szakad el', right: '0,384' },
      { id: 'swrm21', left: 'Tünde 3 palacsintája: mind elszakad', right: '0,008' },
      { id: 'swrm22', left: '10 érmedobás: pontosan 5 fej', right: '≈ 0,246' },
      { id: 'swrm23', left: '8 kockadobás: pontosan 2 hatos', right: '≈ 0,2605' },
      { id: 'swrm24', left: '15 termék (p = 0,03): pontosan 1 selejtes', right: '≈ 0,2938' }
    ]
  }
};

export const SamplingWithReplacementMatcher: React.FC<SamplingWithReplacementMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-visszateveses-matcher',
  topicTitle = '13. Visszatevéses mintavétel – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="visszateveses-mintavetel"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat, a binomiális együtthatókat és a helyzeteket a valószínűségükkel!"
      levels={SAMPLING_WITH_REPLACEMENT_MATCHER_LEVELS}
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

export default SamplingWithReplacementMatcher;
