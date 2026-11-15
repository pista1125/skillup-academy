import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExpectedValueMatcherProps {
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

const EXPECTED_VALUE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a hozzá tartozó jelentéssel vagy párjával!',
    pairs: [
      { id: 'evm1', left: 'relatív gyakoriság (statisztika)', right: 'valószínűség' },
      { id: 'evm2', left: 'átlag, súlyozott átlag (statisztika)', right: 'várható érték' },
      { id: 'evm3', left: 'a várható érték jele', right: 'E (vagy M)' },
      { id: 'evm4', left: 'méltányos (igazságos) játék', right: 'a nyeremény várható értéke 0' },
      { id: 'evm5', left: 'a valószínűségek összege teljes felsorolásnál', right: '1' },
      { id: 'evm6', left: 'E < 0 a játékos nyereményére', right: 'a játék a szervezőnek kedvez' },
      { id: 'evm7', left: 'nagyszámú kísérlet átlaga', right: 'a várható érték körül ingadozik' },
      { id: 'evm8', left: 'a legvalószínűbb kimenetel', right: 'nem feltétlenül egyezik a várható értékkel' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Kísérlet ↔ várható érték',
    description: 'Párosítsd a kísérletet a várható értékkel!',
    pairs: [
      { id: 'evm9', left: 'egy kockával dobott szám', right: '3,5' },
      { id: 'evm10', left: 'két kockával dobott összeg', right: '7' },
      { id: 'evm11', left: 'három kockával dobott összeg', right: '10,5' },
      { id: 'evm12', left: '3 érmét feldobva a fejek száma', right: '1,5' },
      { id: 'evm13', left: '1 érmét feldobva a fejek száma', right: '0,5' },
      { id: 'evm14', left: 'tombola: 500 szelvényből 10 nyer 1000 Ft-ot', right: '20 Ft' },
      { id: 'evm15', left: 'a kereskedő 10 000 sorsjegye', right: '13,8 Ft' },
      { id: 'evm16', left: '100 sorsjegyből 5 nyer 1000 Ft-ot', right: '50 Ft' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Eloszlástáblázat ↔ várható érték',
    description: 'Számold ki a várható értéket, és párosítsd! (érték: valószínűség)',
    pairs: [
      { id: 'evm17', left: '0: 0,5;  10: 0,5', right: '5' },
      { id: 'evm18', left: '1: 0,2;  2: 0,5;  3: 0,3', right: '2,1' },
      { id: 'evm19', left: '0: 0,98;  500: 0,02', right: '10' },
      { id: 'evm20', left: '−50: 1/6;  15: 5/6', right: '25/6 ≈ 4,17' },
      { id: 'evm21', left: '0: 0,25;  1: 0,5;  2: 0,25', right: '1' },
      { id: 'evm22', left: '5428: 0,6;  4370: 0,4', right: '5004,8' },
      { id: 'evm23', left: '40: 0,25;  −10: 0,5;  −20: 0,25', right: '0' },
      { id: 'evm24', left: '0: 2/30;  1: 4/30;  2: 6/30;  3: 10/30;  4: 8/30', right: '2,6' }
    ]
  }
};

export const ExpectedValueMatcher: React.FC<ExpectedValueMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-stat-varhato-ertek-matcher',
  topicTitle = '9. Várható érték – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="varhato-ertek"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat, a kísérleteket és az eloszlástáblázatokat a várható értékkel!"
      levels={EXPECTED_VALUE_MATCHER_LEVELS}
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

export default ExpectedValueMatcher;
