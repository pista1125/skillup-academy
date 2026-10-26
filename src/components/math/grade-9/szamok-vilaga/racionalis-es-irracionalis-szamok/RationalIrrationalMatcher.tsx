import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  DecimalsClassificationTreeSvg,
  Sqrt2ConstructionSvg,
  PeriodicRemainderCycleSvg
} from './RationalIrrationalFigures';

interface RationalIrrationalMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Tizedestört és Tört Alakok Párosítása (Könnyű)',
    subtitle: 'Párosítsd a tizedestört alakot a pontos közönséges tört megfelelőjével!',
    pairs: [
      {
        id: 'rim1-1',
        prompt: '0,(3)',
        value: '1/3',
        figure: <DecimalsClassificationTreeSvg size={65} />
      },
      {
        id: 'rim1-2',
        prompt: '0,(6)',
        value: '2/3'
      },
      {
        id: 'rim1-3',
        prompt: '0,1(6)',
        value: '1/6'
      },
      {
        id: 'rim1-4',
        prompt: '0,(27)',
        value: '3/11'
      },
      {
        id: 'rim1-5',
        prompt: '0,375',
        value: '3/8'
      },
      {
        id: 'rim1-6',
        prompt: '1,75',
        value: '7/4'
      },
      {
        id: 'rim1-7',
        prompt: '0,(9)',
        value: '1'
      },
      {
        id: 'rim1-8',
        prompt: '0,(142857)',
        value: '1/7'
      }
    ]
  },
  2: {
    title: '2. Szint: Számok és Legszűkebb Számhalmazuk (Közepes)',
    subtitle: 'Keresd meg minden számhoz a legszűkebb számhalmazt, amelybe beletartozik!',
    pairs: [
      {
        id: 'rim2-1',
        prompt: '−√49',
        value: 'ℤ⁻ (Negatív egész szám)',
        figure: <Sqrt2ConstructionSvg size={65} />
      },
      {
        id: 'rim2-2',
        prompt: '√18 / √2',
        value: 'ℕ (Természetes szám, mert értéke 3)'
      },
      {
        id: 'rim2-3',
        prompt: 'π − 3',
        value: 'ℚ* (Irracionális szám)'
      },
      {
        id: 'rim2-4',
        prompt: '0,(45)',
        value: 'ℚ \\ ℤ (Tört racionális szám)'
      },
      {
        id: 'rim2-5',
        prompt: '0,1010010001...',
        value: 'ℚ* (Végtelen nem szakaszos)'
      },
      {
        id: 'rim2-6',
        prompt: '0 (Nulla)',
        value: 'ℕ (A legkisebb természetes szám)'
      },
      {
        id: 'rim2-7',
        prompt: '√(9/16)',
        value: 'ℚ⁺ \\ ℤ (Pozitív tört racionális, 3/4)'
      },
      {
        id: 'rim2-8',
        prompt: '12 / (−3)',
        value: 'ℤ⁻ (Negatív egész szám, értéke −4)'
      }
    ]
  },
  3: {
    title: '3. Szint: Nevezők Prímtényezői és Bizonyítás (Gondolkodtató)',
    subtitle: 'Kösd össze az egyszerűsített nevezők felbontását és a bizonyítás logikai lépéseit!',
    pairs: [
      {
        id: 'rim3-1',
        prompt: 'Nevező: 2³ · 5²',
        value: 'Véges tizedestört (csak 2 és 5 prímosztó)',
        figure: <PeriodicRemainderCycleSvg size={65} />
      },
      {
        id: 'rim3-2',
        prompt: 'Nevező: 3 · 5',
        value: 'Végtelen szakaszos (a 3-as prím miatt)'
      },
      {
        id: 'rim3-3',
        prompt: 'Nevező: 7 (Osztás 7-tel)',
        value: 'Legfeljebb 6 jegyű szakasz (Skatulya-elv)'
      },
      {
        id: 'rim3-4',
        prompt: '√2 = p/q (lnko=1)',
        value: 'Indirekt feltevés a racionális alakra'
      },
      {
        id: 'rim3-5',
        prompt: 'p² = 2q²',
        value: 'p² páros, amiből következik: p is páros'
      },
      {
        id: 'rim3-6',
        prompt: '(2k)² = 2q²  ⟹  q² = 2k²',
        value: 'q² páros, amiből következik: q is páros'
      },
      {
        id: 'rim3-7',
        prompt: 'p és q is páros szám',
        value: 'Ellentmondás! A tört mégis egyszerűsíthető 2-vel'
      },
      {
        id: 'rim3-8',
        prompt: '1² + 1² = (√2)²',
        value: 'Egységnégyzet átlója a számegyenesen'
      }
    ]
  }
};

export const RationalIrrationalMatcher: React.FC<RationalIrrationalMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'racionalis-es-irracionalis-szamok',
  topicTitle = 'Racionális és irracionális számok'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      title="Racionális és Irracionális Számok Párosító"
      subtitle="Keresd meg az összetartozó matematikai párokat!"
      badge="PÁROSÍTÓ"
      topicTitle={topicTitle}
      levelConfigs={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

export default RationalIrrationalMatcher;
