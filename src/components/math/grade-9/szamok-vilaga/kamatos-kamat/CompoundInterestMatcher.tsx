import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CompoundInterestMatcherProps {
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
    title: '1. Szint: Pénzügyi Fogalmak és Képletek (Könnyű)',
    subtitle: 'Párosítsd a pénzügyi alapfogalmakat a matematikai leírásukkal!',
    pairs: [
      {
        id: 'cim-1-1',
        prompt: 'Kezdőtőke (T₀)',
        value: 'A periódus elején elhelyezett vagy felvett induló összeg'
      },
      {
        id: 'cim-1-2',
        prompt: 'Kamatláb (p)',
        value: 'Százalékban kifejezett hozam vagy hiteldíj (pl. 8%)'
      },
      {
        id: 'cim-1-3',
        prompt: 'Kamattényező (q) növekedésnél',
        value: 'q = 1 + p/100 (pl. 8% esetén q = 1,08)'
      },
      {
        id: 'cim-1-4',
        prompt: 'Kamatos kamat alaptétele',
        value: 'Tₙ = T₀ · (1 + p/100)ⁿ = T₀ · qⁿ (exponenciális)'
      },
      {
        id: 'cim-1-5',
        prompt: 'Egyszerű kamat képlete',
        value: 'Tₙ = T₀ + n · (T₀ · p/100) (lineáris növekedés)'
      },
      {
        id: 'cim-1-6',
        prompt: 'Amortizációs tényező (q)',
        value: 'q = 1 - p/100 (pl. 15% értékvesztésnél q = 0,85)'
      },
      {
        id: 'cim-1-7',
        prompt: 'EBKM mutató fogalma',
        value: 'Egységesített Betéti Kamatláb Mutató (betétek hozama)'
      },
      {
        id: 'cim-1-8',
        prompt: 'THM mutató fogalma',
        value: 'Teljes Hiteldíj Mutató (hitelek teljes éves költsége)'
      }
    ]
  },
  2: {
    title: '2. Szint: Számítások és Kamatozási Periódusok (Közepes)',
    subtitle: 'Párosítsd a konkrét pénzügyi helyzeteket a kiszámított eredményükkel!',
    pairs: [
      {
        id: 'cim-2-1',
        prompt: '100 000 Ft betét 1 évre 8%-os kamatra',
        value: '108 000 Ft (100 000 · 1,08)'
      },
      {
        id: 'cim-2-2',
        prompt: '1 000 000 Ft 2 évre 6%-os kamatos kamatra',
        value: '1 123 600 Ft (1M · 1,06²)'
      },
      {
        id: 'cim-2-3',
        prompt: '500 000 Ft 3 évre 10%-os egyszerű kamatra',
        value: '650 000 Ft (3 · 50 000 Ft kamat)'
      },
      {
        id: 'cim-2-4',
        prompt: '8 000 000 Ft-os autó értéke 2 év múlva (10%/év)',
        value: '6 480 000 Ft (8M · 0,90²)'
      },
      {
        id: 'cim-2-5',
        prompt: '200 000 Ft 2 év múlva 10%-os kamatos kamattal',
        value: '242 000 Ft (200 000 · 1,21)'
      },
      {
        id: 'cim-2-6',
        prompt: 'Havi kamatláb évi 12%-os kamat mellett',
        value: '1% (havi kamattényező: q = 1,01)'
      },
      {
        id: 'cim-2-7',
        prompt: 'Félévente tőkésített 100 000 Ft 1 év múlva (5%/félév)',
        value: '110 250 Ft (100 000 · 1,05²)'
      },
      {
        id: 'cim-2-8',
        prompt: '10%-os kamatos kamat összesített növekedése 3 év alatt',
        value: '+33,1% (mert 1,1³ = 1,331)'
      }
    ]
  },
  3: {
    title: '3. Szint: Érettségi és Összetett Pénzügyi Modellek (Nehéz)',
    subtitle: 'Párosítsd a komplex gazdasági feladatokat a pontos végeredményükkel!',
    pairs: [
      {
        id: 'cim-3-1',
        prompt: 'Babakötvény: 500 000 Ft 18 év múlva (8%/év)',
        value: 'kb. 1 998 010 Ft (csaknem megnégyszereződik)'
      },
      {
        id: 'cim-3-2',
        prompt: '72-es szabály szerinti duplázódás (p = 8%)',
        value: 'kb. 9 év alatt (72 / 8 = 9)'
      },
      {
        id: 'cim-3-3',
        prompt: 'Kezdőtőke, ha 4 év múlva 2 524 954 Ft lesz (6%)',
        value: 'T₀ = 2 000 000 Ft'
      },
      {
        id: 'cim-3-4',
        prompt: '1 000 000 Ft vásárlóereje 10 év múlva 5% inflációnál',
        value: 'kb. 598 737 Ft (1M · 0,95¹⁰)'
      },
      {
        id: 'cim-3-5',
        prompt: 'Reálhozam (9% névleges kamat, 6% infláció)',
        value: 'kb. 2,83% (mert 1,09 / 1,06 ≈ 1,0283)'
      },
      {
        id: 'cim-3-6',
        prompt: 'Futamidő (n) duplázódáskor logaritmussal',
        value: 'n = lg 2 / lg q'
      },
      {
        id: 'cim-3-7',
        prompt: 'Kamatláb, ha 1 200 000 Ft 2 év alatt 1 346 700 Ft lesz',
        value: 'p = 5,9% (mert q = √1,12225 = 1,059)'
      },
      {
        id: 'cim-3-8',
        prompt: 'Telefon értéke 40% alá esik (20%/év amortizáció)',
        value: '5 év múlva (mert 0,8⁵ ≈ 32,8% < 40%)'
      }
    ]
  }
};

export const CompoundInterestMatcher: React.FC<CompoundInterestMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-szamok-kamatos-kamat-matcher',
  topicTitle = 'Kamatos kamat'
}) => {
  const activeLevel = currentLevel || level;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`ci-matcher-${activeLevel}`}
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      pairs={config.pairs}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="indigo"
    />
  );
};

export default CompoundInterestMatcher;
