import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard, DotsCard, BarCard, CompareCard, JumpTensCard } from './Count50ExamG2CardFigures';

interface Count50ExamG2MatcherProps {
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
    title: '1. szint: Számok 50-ig',
    description: 'Melyik szám ez? Párosítsd a képet vagy a szöveget a számmal!',
    pairs: [
      { id: 'c50xm1', left: '', right: '36', promptFigure: <RodsCard tens={3} ones={6} /> },
      { id: 'c50xm2', left: 'negyvenkettő', right: '42' },
      { id: 'c50xm3', left: '', right: '29', promptFigure: <RodsCard tens={2} ones={9} /> },
      { id: 'c50xm4', left: '4 tízes és 5 egyes', right: '45' },
      { id: 'c50xm5', left: '', right: '31', promptFigure: <DotsCard a={31} /> },
      { id: 'c50xm6', left: 'a 49 utáni szám', right: '50' },
      { id: 'c50xm7', left: '', right: '18', promptFigure: <RodsCard tens={1} ones={8} /> },
      { id: 'c50xm8', left: '3 tízes', right: '30' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számolás tízesátlépéssel',
    description: 'Számold ki, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'c50xm9', left: '38 + 7', right: '45' },
      {
        id: 'c50xm10',
        left: '',
        right: '35',
        promptFigure: <BarCard parts={[{ v: 26, size: 26 }, { v: 9, size: 9, color: 'green' }]} total="?" />
      },
      { id: 'c50xm11', left: '43 − 6', right: '37' },
      { id: 'c50xm12', left: '', right: '25', promptFigure: <DotsCard a={32} crossed={7} /> },
      { id: 'c50xm13', left: '28 + 15', right: '43' },
      {
        id: 'c50xm14',
        left: '',
        right: '14',
        promptFigure: <CompareCard rows={[{ size: 41, text: 41 }, { size: 27, text: 27 }]} diff="?" />
      },
      { id: 'c50xm15', left: '50 − 26', right: '24' },
      { id: 'c50xm16', left: '', right: '44', promptFigure: <RodsCard tens={2} ones={4} add={2} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó szám és szöveg',
    description: 'Keresd meg a □ vagy a ? értékét!',
    pairs: [
      { id: 'c50xm17', left: '26 + □ = 33', right: '7' },
      {
        id: 'c50xm18',
        left: '',
        right: '25',
        promptFigure: <BarCard parts={[{ v: '?', size: 25 }, { v: 16, size: 16, color: 'green' }]} total={41} />
      },
      { id: 'c50xm19', left: '□ − 8 = 34', right: '42' },
      {
        id: 'c50xm20',
        left: '',
        right: '29',
        promptFigure: <CompareCard rows={[{ size: 36, text: 36 }, { size: 29, text: '?' }]} diff="7" />
      },
      { id: 'c50xm21', left: 'Gondoltam egy számot. Hozzáadtam 15-öt, 42 lett.', right: '27' },
      {
        id: 'c50xm22',
        left: '',
        right: '18',
        promptFigure: (
          <BarCard
            parts={[{ v: 18, size: 18 }, { v: 14, size: 14, color: 'green' }, { v: '?', size: 18 }]}
            total={50}
          />
        )
      },
      { id: 'c50xm23', left: '40 − □ = 32', right: '8' },
      { id: 'c50xm24', left: '', right: '17', promptFigure: <JumpTensCard start={47} count={3} dir="−" /> }
    ]
  }
];

export const COUNT50_EXAM_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const Count50ExamG2Matcher: React.FC<Count50ExamG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c50-tudasproba-matcher',
  topicTitle = '6. Megálló – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Párosítsd a számokat, a műveleteket és a hiányzó számokat 50-ig!"
      levels={COUNT50_EXAM_G2_MATCHER_LEVELS}
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

export default Count50ExamG2Matcher;
