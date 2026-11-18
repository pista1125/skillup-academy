import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { DotsCard, BarCard, CompareCard } from './WordProblems50G2CardFigures';

interface WordProblems50G2MatcherProps {
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
    title: '1. szint: Mennyi lesz?',
    description: 'Olvasd el vagy nézd meg a képet, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'wp50m1', left: '', right: '24', promptFigure: <DotsCard a={20} b={4} /> },
      { id: 'wp50m2', left: 'Volt 30 alma. Elfogyott 10.', right: '20' },
      { id: 'wp50m3', left: '', right: '17', promptFigure: <BarCard parts={[{ v: 12, size: 12 }, { v: 5, size: 5, color: 'green' }]} total="?" /> },
      { id: 'wp50m4', left: 'Van 15 virág. Kap még 3-at.', right: '18' },
      { id: 'wp50m5', left: '', right: '25', promptFigure: <DotsCard a={28} crossed={3} /> },
      { id: 'wp50m6', left: 'Volt 40 lufi. Elvitt 9-et.', right: '31' },
      {
        id: 'wp50m7',
        left: '',
        right: '6',
        promptFigure: <CompareCard rows={[{ size: 16, text: 16 }, { size: 10, text: 10 }]} diff="?" />
      },
      { id: 'wp50m8', left: 'Van 22 kréta. Kap még 22-t.', right: '44' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik művelet?',
    description: 'Melyik művelettel számolsz? Párosítsd a történetet a művelettel!',
    pairs: [
      { id: 'wp50m9', left: 'Volt 26 golyó. Kapott még 7-et.', right: '26 + 7' },
      { id: 'wp50m10', left: 'Volt 34 golyó. Elgurult 8.', right: '34 − 8' },
      {
        id: 'wp50m11',
        left: '',
        right: '45 − 19',
        promptFigure: <BarCard parts={[{ v: 19, size: 19 }, { v: '?', size: 26 }]} total={45} />
      },
      { id: 'wp50m12', left: 'Peti 15 éves. Zoli 6 évvel idősebb.', right: '15 + 6' },
      {
        id: 'wp50m13',
        left: '',
        right: '30 − 12',
        promptFigure: <CompareCard rows={[{ size: 30, text: 30 }, { size: 18, text: '?' }]} diff="12" />
      },
      { id: 'wp50m14', left: 'Két kosárban 18 és 24 alma. Összesen?', right: '18 + 24' },
      {
        id: 'wp50m15',
        left: '',
        right: '27 + 16',
        promptFigure: <BarCard parts={[{ v: 27, size: 27 }, { v: 16, size: 16, color: 'green' }]} total="?" />
      },
      { id: 'wp50m16', left: '', right: '41 − 5', promptFigure: <DotsCard a={41} crossed={5} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Két lépés és csavaros szöveg',
    description: 'Gondold végig lépésenként! Vigyázz a „több” és „kevesebb” szóra!',
    pairs: [
      { id: 'wp50m17', left: 'Volt 50. Elvett 20-at, aztán 15-öt.', right: '15' },
      {
        id: 'wp50m18',
        left: '',
        right: '14',
        promptFigure: <BarCard parts={[{ v: 12, size: 12 }, { v: 14, size: 14, color: 'green' }, { v: '?', size: 14 }]} total={40} />
      },
      { id: 'wp50m19', left: 'Lili 35 cm. Ez 9 cm-rel több, mint Bencéé. Bence?', right: '26 cm' },
      {
        id: 'wp50m20',
        left: '',
        right: '32',
        promptFigure: <CompareCard rows={[{ size: 32, text: '?' }, { size: 24, text: 24 }]} diff="8" />
      },
      { id: 'wp50m21', left: 'Volt 16. Kapott 9-et. Adott 5-öt.', right: '20' },
      {
        id: 'wp50m22',
        left: '',
        right: '36',
        promptFigure: <BarCard parts={[{ v: 18, size: 18 }, { v: 18, size: 18, color: 'green' }]} total="?" />
      },
      { id: 'wp50m23', left: 'Elköltött 23 Ft-ot. Maradt 19 Ft. Mennyi volt?', right: '42 Ft' },
      {
        id: 'wp50m24',
        left: '',
        right: '13',
        promptFigure: <CompareCard rows={[{ size: 40, text: 40 }, { size: 27, text: 27 }]} diff="?" />
      }
    ]
  }
];

export const WORD_PROBLEMS50_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const WordProblems50G2Matcher: React.FC<WordProblems50G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c50-szoveges-matcher',
  topicTitle = '5. Szöveges feladatok – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Párosítsd a történeteket, a szalagos ábrákat és az eredményeket!"
      levels={WORD_PROBLEMS50_G2_MATCHER_LEVELS}
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

export default WordProblems50G2Matcher;
