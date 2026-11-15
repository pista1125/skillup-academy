import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ReplacementComparisonMatcherProps {
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

const REPLACEMENT_COMPARISON_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'rcm1', left: 'visszatevéses mintavétel', right: 'minden húzás előtt ugyanaz az összetétel' },
      { id: 'rcm2', left: 'visszatevés nélküli mintavétel', right: 'minden elem legfeljebb egyszer kerül a mintába' },
      { id: 'rcm3', left: 'binomiális eloszlás', right: '(n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ' },
      { id: 'rcm4', left: 'egyszerre húzás', right: 'ugyanaz, mint a visszatevés nélküli húzás' },
      { id: 'rcm5', left: 'populáció (sokaság)', right: 'az összes vizsgálható elem' },
      { id: 'rcm6', left: 'minta', right: 'a kiválasztott, megvizsgált elemek' },
      { id: 'rcm7', left: 'összes eset visszatevés nélkül', right: '(N alatt n)' },
      { id: 'rcm8', left: 'p = S / N', right: 'a vizsgált tulajdonság aránya a sokaságban' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Urna – 4 piros, 6 kék golyó',
    description: 'Két golyót húzunk. Párosítsd a helyzetet a valószínűségével!',
    pairs: [
      { id: 'rcm9', left: 'visszatevéssel: mindkettő piros', right: '4/25' },
      { id: 'rcm10', left: 'visszatevés nélkül: mindkettő piros', right: '2/15' },
      { id: 'rcm11', left: 'visszatevéssel: egyik sem piros', right: '9/25' },
      { id: 'rcm12', left: 'visszatevés nélkül: egyik sem piros', right: '1/3' },
      { id: 'rcm13', left: 'visszatevés nélkül: az első piros után a második kék', right: '2/3' },
      { id: 'rcm14', left: 'visszatevéssel: az első piros után a második is piros', right: '2/5' },
      { id: 'rcm15', left: 'visszatevéssel: pontosan egy piros', right: '12/25' },
      { id: 'rcm16', left: 'visszatevés nélkül: pontosan egy piros', right: '8/15' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Tankönyvi helyzetek',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'rcm17', left: '50 darab (20 selejtes), 15 vizsgált, visszatevéssel: 5–7 selejtes', right: '≈ 0,57' },
      { id: 'rcm18', left: '50 darab (20 selejtes), 15 vizsgált, visszatevés nélkül: 5–7 selejtes', right: '≈ 0,65' },
      { id: 'rcm19', left: 'metró (p = 0,92): 50 utasból mindenkinek van jegye', right: '≈ 0,0155' },
      { id: 'rcm20', left: 'busz (60 / 12), 10 ellenőrzés visszatevéssel: 0 tanulóbérletes', right: '≈ 0,107' },
      { id: 'rcm21', left: 'busz (60 / 12), 10 különböző utas: 0 tanulóbérletes', right: '≈ 0,087' },
      { id: 'rcm22', left: 'Tomi, 3 húzás visszatevés nélkül: nincs maszlag', right: '14/55' },
      { id: 'rcm23', left: 'Tomi, 4 húzás visszatevéssel: van maszlag', right: '65/81' },
      { id: 'rcm24', left: '24 jelentkezőből (15 tizenkettedikes) 3: mind 12.-es', right: '455/2024' }
    ]
  }
};

export const ReplacementComparisonMatcher: React.FC<ReplacementComparisonMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-visszatevessel-vagy-anelkul-matcher',
  topicTitle = '15. Ráadás – Visszatevéssel vagy anélkül? – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="visszatevessel-vagy-anelkul"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat, az urnás valószínűségeket és a tankönyvi feladatok eredményeit!"
      levels={REPLACEMENT_COMPARISON_MATCHER_LEVELS}
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

export default ReplacementComparisonMatcher;
