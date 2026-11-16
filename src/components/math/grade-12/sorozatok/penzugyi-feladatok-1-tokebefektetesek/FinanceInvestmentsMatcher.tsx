import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FinanceInvestmentsMatcherProps {
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

const FINANCE_INV_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Pénzügyi fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'fim1', left: 'tőke', right: 'a bankba tett, lekötött pénzösszeg' },
      { id: 'fim2', left: 'kamat', right: 'az a pénzösszeg, amivel a tőke megnő' },
      { id: 'fim3', left: 'kamatláb', right: 'megadja, hogy a kamat hány százaléka a tőkének' },
      { id: 'fim4', left: 'egyszerű kamatozás', right: 'a kamat nem adódik a tőkéhez' },
      { id: 'fim5', left: 'kamatos kamatozás', right: 'a kamat a tőkéhez adódik, és vele együtt kamatozik' },
      { id: 'fim6', left: 'gyűjtőjáradék', right: 'rendszeresen azonos összeget teszünk a számlára' },
      { id: 'fim7', left: 'kamattényező (q)', right: '1 + p/100' },
      { id: 'fim8', left: 'kamatadó', right: 'a kamatjóváíráskor az államnak fizetendő adó' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Képletek és tényezők',
    description: 'Párosítsd a helyzetet a megfelelő képlettel vagy értékkel!',
    pairs: [
      { id: 'fim9', left: 'K₀ tőke n év után, kamatos kamattal', right: 'K₀ · qⁿ' },
      { id: 'fim10', left: 'K₀ tőke n év után, egyszerű kamattal', right: 'K₀ · (1 + n · p/100)' },
      { id: 'fim11', left: 'periódus eleji befizetés, n periódus', right: 'x · q · (qⁿ − 1)/(q − 1)' },
      { id: 'fim12', left: 'évi 6%, havi jóváírás: havi tényező', right: '1,005' },
      { id: 'fim13', left: 'évi 8%, negyedéves jóváírás: éves hozam', right: '≈ 8,24%' },
      { id: 'fim14', left: 'évi 12%, havi jóváírás: éves hozam', right: '≈ 12,68%' },
      { id: 'fim15', left: 'havonta 1%-os értékcsökkenés tényezője', right: '0,99' },
      { id: 'fim16', left: 'ismeretlen kamattényező', right: 'q = ⁿ√(Kₙ/K₀)' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'fim17', left: 'Dalma: havi 20 000 Ft, 6%, 2 év', right: '≈ 511 182 Ft' },
      { id: 'fim18', left: '6 millió → 7 millió Ft 5 év alatt: kamatláb', right: '≈ 3,13%' },
      { id: 'fim19', left: 'autó (−1%/hó) értéke 2 év múlva', right: '≈ 4 714 069 Ft' },
      { id: 'fim20', left: 'autó (−1%/hó) felére csökken', right: '≈ 69 hónap' },
      { id: 'fim21', left: 'Ferenc gyűjtőszámlája a 4. év végén', right: '≈ 1 209 735 Ft' },
      { id: 'fim22', left: 'Dávid egy befizetése (1 140 000 Ft-hoz)', right: '≈ 239 963 Ft' },
      { id: 'fim23', left: 'Csilla: 500 000 Ft, 8%, 18 év', right: '≈ 1 998 010 Ft' },
      { id: 'fim24', left: 'Zsuzsa: 5 × 350 000 Ft, 7,5%', right: '≈ 2 185 407 Ft' }
    ]
  }
};

export const FinanceInvestmentsMatcher: React.FC<FinanceInvestmentsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-seq-tokebefektetes-matcher',
  topicTitle = '8. Pénzügyi feladatok I. – tőkebefektetések – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="penzugyi-feladatok-1-tokebefektetesek"
      title={topicTitle}
      subtitle="Gyakorold a pénzügyi fogalmakat, a kamatos kamat és a gyűjtőjáradék képleteit és a tankönyvi feladatokat!"
      levels={FINANCE_INV_MATCHER_LEVELS}
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

export default FinanceInvestmentsMatcher;
