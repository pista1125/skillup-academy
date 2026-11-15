import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VectorSubtractionMatcherProps {
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

const VECTOR_SUBTRACTION_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Szabályok',
    description: 'Párosítsd a fogalmat, kifejezést a megfelelő szabállyal vagy eredménnyel!',
    pairs: [
      { id: 'vsm1', left: '→c − →b, ha →c = →a + →b', right: '→a' },
      { id: 'vsm2', left: '→c − →b szerkesztése (közös kezdőpont)', right: 'A kivonandó végpontjából a kisebbítendő végpontjába' },
      { id: 'vsm3', left: '→a − →b', right: '→a + (−→b)' },
      { id: 'vsm4', left: '−(→a − →b)', right: '→b − →a' },
      { id: 'vsm5', left: 'Paralelogramma közös pontból induló átlója', right: '→a + →b' },
      { id: 'vsm6', left: 'Paralelogramma másik átlója (→b végétől →a végéig)', right: '→a − →b' },
      { id: 'vsm7', left: 'Változás', right: 'Végállapot − kezdőállapot' },
      { id: 'vsm8', left: 'A pilóta levegőhöz viszonyított sebessége', right: '→e − →s' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Különbségek pontokkal',
    description: 'Párosítsd a különbséget az eredményével! (ABCD paralelogramma.)',
    pairs: [
      { id: 'vsm9', left: '→AB − →AC', right: '→CB' },
      { id: 'vsm10', left: '→OB − →OA', right: '→AB' },
      { id: 'vsm11', left: '→AB − →CB', right: '→AC' },
      { id: 'vsm12', left: '→AB − →AD', right: '→DB' },
      { id: 'vsm13', left: '→BA − →BC', right: '→CA' },
      { id: 'vsm14', left: '→PQ − →PQ', right: '→0' },
      { id: 'vsm15', left: '→AB − →BA', right: '2 · →AB' },
      { id: 'vsm16', left: '→XA − →XB', right: '→BA' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Egyszerűsítés és hosszak',
    description: 'Párosítsd a kifejezést vagy az adatokat az eredménnyel!',
    pairs: [
      { id: 'vsm17', left: '→c + →d − →a + (−→c) − →d', right: '−→a' },
      { id: 'vsm18', left: '→a + →b − (→b − →a) + (−→a)', right: '→a' },
      { id: 'vsm19', left: '(→a − →b) + (→b − →a)', right: '→0' },
      { id: 'vsm20', left: 'Téglalap (6 cm × 2,5 cm): |→BA − →BC|', right: '6,5 cm' },
      { id: 'vsm21', left: 'Rombusz, |→BA + →BC| = 8 cm, |→BA − →BC| = 6 cm: az oldal', right: '5 cm' },
      { id: 'vsm22', left: '|→a| = 5, |→b| = 3, 60°: |→a − →b|', right: '√19 ≈ 4,36' },
      { id: 'vsm23', left: '|→a| = |→b| = 4, 120°: |→a − →b|', right: '4√3 ≈ 6,93' },
      { id: 'vsm24', left: '|→a| = 3, |→b| = 4, merőlegesek: |→a − →b|', right: '5' }
    ]
  }
];

const VECTOR_SUBTRACTION_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: VECTOR_SUBTRACTION_MATCHER_LEVELS_LIST[0],
  2: VECTOR_SUBTRACTION_MATCHER_LEVELS_LIST[1],
  3: VECTOR_SUBTRACTION_MATCHER_LEVELS_LIST[2]
};

export const VectorSubtractionMatcher: React.FC<VectorSubtractionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-vektor-kulonbseg-matcher',
  topicTitle = '2. Két vektor különbsége – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="ket-vektor-kulonbsege"
      title={topicTitle}
      subtitle="Gyakorold a különbségvektor szerkesztését, a pontokkal felírt különbségeket és a különbségvektor hosszát!"
      levels={VECTOR_SUBTRACTION_MATCHER_LEVELS}
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

export default VectorSubtractionMatcher;
