import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BarCard150, CompareCard150 } from './WordProblems100G2CardFigures';

interface WordProblems100G2MatcherProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik művelet?',
    description: 'Olvasd el vagy nézd meg a szalagot, és keresd meg a hozzá illő műveletet!',
    pairs: [
      { id: 'wp100m1', left: '', right: '25 + 13', promptFigure: <BarCard150 segs={[{ label: '25', v: 25 }, { label: '13', v: 13 }]} total="?" /> },
      { id: 'wp100m2', left: 'Volt 47, elment 12. Hány maradt?', right: '47 − 12' },
      {
        id: 'wp100m3',
        left: '',
        right: '50 − 20',
        promptFigure: <BarCard150 segs={[{ label: '?', v: 30 }, { label: '20', v: 20, crossed: true }]} total="50" />
      },
      { id: 'wp100m4', left: 'Van 30, kap még 16-ot. Mennyi lesz?', right: '30 + 16' },
      { id: 'wp100m5', left: '', right: '44 + 10', promptFigure: <CompareCard150 top={['44', 44]} bottom={['?', 54]} diff="10" /> },
      { id: 'wp100m6', left: 'Volt 64 Ft, elköltött 21-et. Mennyi maradt?', right: '64 − 21' },
      { id: 'wp100m7', left: '', right: '70 − 20', promptFigure: <CompareCard150 top={['70', 70]} bottom={['?', 50]} diff="20" /> },
      { id: 'wp100m8', left: 'Kell 80, van 60. Mennyi kell még?', right: '80 − 60' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Számold ki, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'wp100m9', left: '', right: '65', promptFigure: <BarCard150 segs={[{ label: '38', v: 38 }, { label: '27', v: 27 }]} total="?" /> },
      { id: 'wp100m10', left: '72 cseresznyéből 36-ot megettek. Hány maradt?', right: '36' },
      { id: 'wp100m11', left: '', right: '35', promptFigure: <BarCard150 segs={[{ label: '65', v: 65 }, { label: '?', v: 35 }]} total="100" /> },
      { id: 'wp100m12', left: 'Nóra 45. Ábel 19-cel többet. Ábel?', right: '64' },
      { id: 'wp100m13', left: '', right: '24', promptFigure: <CompareCard150 top={['74', 74]} bottom={['50', 50]} diff="?" /> },
      { id: 'wp100m14', left: '90 cm szalagból 35 cm-t levágnak. Mennyi marad?', right: '55 cm' },
      { id: 'wp100m15', left: '', right: '46', promptFigure: <CompareCard150 top={['54', 54]} bottom={['?', 46]} diff="8" /> },
      { id: 'wp100m16', left: 'Kell 50, van 28. Hány hiányzik?', right: '22' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Két lépés és csapdák',
    description: 'Gondold végig: kinek van több? Hány lépés kell?',
    pairs: [
      { id: 'wp100m17', left: 'Levente 58. Ez 14-gyel több, mint Zsófié. Zsófi?', right: '44' },
      {
        id: 'wp100m18',
        left: '',
        right: '25',
        promptFigure: (
          <BarCard150
            segs={[
              { label: '40', v: 40 },
              { label: '35', v: 35 },
              { label: '?', v: 25 }
            ]}
            total="100"
          />
        )
      },
      { id: 'wp100m19', left: 'Vett 24-et, majd 30-at. Elhasznált 15-öt. Maradt?', right: '39' },
      { id: 'wp100m20', left: '', right: '43', promptFigure: <CompareCard150 top={['?', 43]} bottom={['28', 28]} diff="15" /> },
      { id: 'wp100m21', left: 'Villamoson 51-en. Le 18, fel 7. Most?', right: '40' },
      {
        id: 'wp100m22',
        left: '',
        right: '69',
        promptFigure: (
          <BarCard150
            segs={[
              { label: '23', v: 23 },
              { label: '31', v: 31 },
              { label: '15', v: 15 }
            ]}
            total="?"
          />
        )
      },
      { id: 'wp100m23', left: 'Van 90 Ft. Vesz egy 35 és egy 20 Ft-osat. Marad?', right: '35 Ft' },
      { id: 'wp100m24', left: '', right: '15', promptFigure: <CompareCard150 top={['61', 61]} bottom={['46', 46]} diff="?" /> }
    ]
  }
];

export const WORD_PROBLEMS100_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const WordProblems100G2Matcher: React.FC<WordProblems100G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c100-szoveges-matcher',
  topicTitle = '5. Szöveges feladatok – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Párosítsd a történeteket és a szalagokat a művelettel vagy az eredménnyel!"
      levels={WORD_PROBLEMS100_G2_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
    />
  );
};

export default WordProblems100G2Matcher;
