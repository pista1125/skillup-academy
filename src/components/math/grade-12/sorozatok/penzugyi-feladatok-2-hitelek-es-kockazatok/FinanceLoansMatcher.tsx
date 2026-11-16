import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FinanceLoansMatcherProps {
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

const FINANCE_LOANS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Hiteles fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'flm1', left: 'hitel (tőke)', right: 'a banktól felvett pénzösszeg' },
      { id: 'flm2', left: 'törlesztőrészlet', right: 'az időszakonként befizetett összeg' },
      { id: 'flm3', left: 'kamatrész', right: 'az adott időszak tőketartozásának kamata' },
      { id: 'flm4', left: 'tőketörlesztés', right: 'a részletből a tőketartozást csökkentő rész' },
      { id: 'flm5', left: 'egyösszegű visszafizetés', right: 'T · qⁿ a futamidő végén' },
      { id: 'flm6', left: 'egyenlő részletek', right: 'az egyre csökkenő tartozással, mértani sorozattal számolva' },
      { id: 'flm7', left: 'árfolyamkockázat', right: 'a deviza árfolyama a futamidő alatt megváltozik' },
      { id: 'flm8', left: 'a kockázat egy mérőszáma', right: 'szórás' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Képletek',
    description: 'Párosítsd a mennyiséget a képletével!',
    pairs: [
      { id: 'flm9', left: 'tartozás a k-adik részlet után', right: 'Tₖ = Tₖ₋₁ · q − x' },
      { id: 'flm10', left: 'egyenlő részlet', right: 'x = T · qⁿ · (q − 1)/(qⁿ − 1)' },
      { id: 'flm11', left: 'a részletek „felkamatolt” összege', right: 'x · (qⁿ − 1)/(q − 1)' },
      { id: 'flm12', left: 'kamatrész', right: 'Tₖ₋₁ · (q − 1)' },
      { id: 'flm13', left: 'tőkerész', right: 'x − kamatrész' },
      { id: 'flm14', left: 'teljes kamatteher', right: 'n · x − T' },
      { id: 'flm15', left: 'évi 12%, negyedéves részlet: q', right: '1,03' },
      { id: 'flm16', left: 'Tamás együtthatója: 1,1² + 1,1 + 1', right: '3,31' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'flm17', left: 'Tamás: 2 000 000 Ft, 3 év, 10%, egy összegben', right: '2 662 000 Ft' },
      { id: 'flm18', left: 'Tamás: 3 egyenlő éves részlet', right: '≈ 804 230 Ft' },
      { id: 'flm19', left: '2 000 000 Ft, 1 év, 8%, egy összegben', right: '2 160 000 Ft' },
      { id: 'flm20', left: '2 000 000 Ft, 8%, 2 × 500 000 Ft után a 3. év végén', right: '1 396 224 Ft' },
      { id: 'flm21', left: 'Kálmán: 1 000 000 Ft, 12%, 4 negyedéves részlet', right: '≈ 269 027 Ft' },
      { id: 'flm22', left: 'Judit: 38 500 Ft kamat 350 000 Ft után', right: '11%' },
      { id: 'flm23', left: 'Szilárd: 500 000 Ft, 13%, 3 részlet', right: '≈ 211 761 Ft' },
      { id: 'flm24', left: 'Antal tőketartozása az 1. részlet után', right: '156 905 Ft' }
    ]
  }
};

export const FinanceLoansMatcher: React.FC<FinanceLoansMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-seq-hitelek-matcher',
  topicTitle = '9. Pénzügyi feladatok II. – hitelek és kockázatok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="penzugyi-feladatok-2-hitelek-es-kockazatok"
      title={topicTitle}
      subtitle="Gyakorold a hitelek fogalmait, a törlesztőrészlet képleteit és a tankönyvi feladatokat!"
      levels={FINANCE_LOANS_MATCHER_LEVELS}
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

export default FinanceLoansMatcher;
