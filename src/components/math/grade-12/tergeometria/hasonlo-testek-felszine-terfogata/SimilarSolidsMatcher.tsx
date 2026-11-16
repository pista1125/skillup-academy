import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SimilarSolidsMatcherProps {
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

const SIMILAR_SOLIDS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Arányok',
    description: 'Párosítsd a mennyiséget a hasonló testek közötti arányával (k: hasonlósági arány)!',
    pairs: [
      { id: 'simm1', left: 'Élek, sugarak, magasságok aránya', right: 'k' },
      { id: 'simm2', left: 'Testek felszínének aránya', right: 'k²' },
      { id: 'simm3', left: 'Testek térfogatának aránya', right: 'k³' },
      { id: 'simm4', left: 'Gömb sugara 3-szoros ⇒ felszíne', right: '9-szeres' },
      { id: 'simm5', left: '2 × 2 × 2-es kocka kis kockáinak száma', right: '8' },
      { id: 'simm6', left: '4 × 4 × 4-es kocka felszíne : kis kocka felszíne', right: '16' },
      { id: 'simm7', left: '25 × 25 × 25-ös kocka kis kockáinak száma', right: '15 625' },
      { id: 'simm8', left: 'Két tetszőleges gömb', right: 'mindig hasonló' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyik arányból a másik',
    description: 'Párosítsd az ismert arányt a keresett aránnyal!',
    pairs: [
      { id: 'simm9', left: 'k = 3 ⇒ térfogatarány', right: '27' },
      { id: 'simm10', left: 'k = 5 ⇒ felszínarány', right: '25' },
      { id: 'simm11', left: 'felszínarány 16 ⇒ térfogatarány', right: '64' },
      { id: 'simm12', left: 'térfogatarány 8 ⇒ felszínarány', right: '4-szeres' },
      { id: 'simm13', left: 'térfogatarány 1000 ⇒ k', right: '10' },
      { id: 'simm14', left: 'k = 1/2 ⇒ térfogatarány', right: '1/8' },
      { id: 'simm15', left: 'térfogatarány 4 ⇒ felszínarány', right: '∛16 ≈ 2,52' },
      { id: 'simm16', left: 'k = 1/50 (makett) ⇒ felszínarány', right: '1/2500' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'simm17', left: 'Betonkocka 126 cm, üreg 63 cm ⇒ V_üreg : V_maradék', right: '1/7' },
      { id: 'simm18', left: 'Betonkocka 126 cm, üreg 21 cm ⇒ V_üreg : V_maradék', right: '1/215' },
      { id: 'simm19', left: 'Minyon (59 cm²) 3-szoros nagyításának felszíne', right: '531 cm²' },
      { id: 'simm20', left: 'Minyon (30 cm³) 3-szoros nagyításának térfogata', right: '810 cm³' },
      { id: 'simm21', left: 'Marcipán 22 mm → bonbon 30 mm: térfogatarány', right: '≈ 2,54' },
      { id: 'simm22', left: '340 db 22 mm-es marcipángolyó térfogata', right: '≈ 1,90 dm³' },
      { id: 'simm23', left: 'Henger V-je 4-szeres, nagyított r = 7 cm ⇒ eredeti r', right: '≈ 4,4 cm' },
      { id: 'simm24', left: '2 cm-es golyó → 1 mm-es sörétek: felszínarány', right: '20-szoros' }
    ]
  }
];

const SIMILAR_SOLIDS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SIMILAR_SOLIDS_MATCHER_LEVELS_LIST[0],
  2: SIMILAR_SOLIDS_MATCHER_LEVELS_LIST[1],
  3: SIMILAR_SOLIDS_MATCHER_LEVELS_LIST[2]
};

export const SimilarSolidsMatcher: React.FC<SimilarSolidsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-hasonlo-testek-matcher',
  topicTitle = '8. Hasonló testek felszíne, térfogata – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="hasonlo-testek-felszine-terfogata"
      title={topicTitle}
      subtitle="Gyakorold a k, k², k³ arányokat és a tankönyvi feladatokat!"
      levels={SIMILAR_SOLIDS_MATCHER_LEVELS}
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

export default SimilarSolidsMatcher;
