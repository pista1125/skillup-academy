import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard150, CoinsCard, ChainCard, BarCard150, CompareCard150, PyramidCard, WindowCard } from './Count100ExamG2CardFigures';

interface Count100ExamG2MatcherProps {
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
    title: '1. szint: Számok 100-ig',
    description: 'Olvasd le a rudakat, a százas táblát és a pénzt, és párosítsd a számmal!',
    pairs: [
      { id: 'c100xm1', left: '', right: '64', promptFigure: <RodsCard150 tens={6} ones={4} /> },
      { id: 'c100xm2', left: '7 tízes és 2 egyes', right: '72' },
      { id: 'c100xm3', left: '', right: '57', promptFigure: <WindowCard center={47} ask="down" /> },
      { id: 'c100xm4', left: 'harmincnyolc', right: '38' },
      { id: 'c100xm5', left: '', right: '90', promptFigure: <RodsCard150 tens={9} /> },
      { id: 'c100xm6', left: '□, 50, 51', right: '49' },
      { id: 'c100xm7', left: '', right: '80 Ft', promptFigure: <CoinsCard coins={[50, 20, 10]} /> },
      { id: 'c100xm8', left: '10-zel több, mint 25', right: '35' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Összeadás és kivonás',
    description: 'Számolj tízesátlépéssel is, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'c100xm9', left: '', right: '65', promptFigure: <BarCard150 segs={[{ label: '38', v: 38 }, { label: '27', v: 27 }]} total="?" /> },
      { id: 'c100xm10', left: '47 + 36', right: '83' },
      { id: 'c100xm11', left: '', right: '35', promptFigure: <ChainCard start="82" op="− 47" /> },
      { id: 'c100xm12', left: '63 − 8', right: '55' },
      { id: 'c100xm13', left: '', right: '73', promptFigure: <PyramidCard rows={[['?'], ['46', '27']]} /> },
      { id: 'c100xm14', left: '91 − 57', right: '34' },
      { id: 'c100xm15', left: '', right: '25', promptFigure: <CompareCard150 top={['81', 81]} bottom={['56', 56]} diff="?" /> },
      { id: 'c100xm16', left: '56 + 28', right: '84' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Fejtörők és szöveges feladatok',
    description: 'Két lépés, piramis, csapdák – gondold végig!',
    pairs: [
      { id: 'c100xm17', left: '', right: '62', promptFigure: <PyramidCard rows={[['?'], ['', ''], ['12', '15', '20']]} /> },
      { id: 'c100xm18', left: 'Levente 63. Ez 18-cal több, mint Hannáé. Hanna?', right: '45' },
      {
        id: 'c100xm19',
        left: '',
        right: '27',
        promptFigure: (
          <BarCard150
            segs={[
              { label: '28', v: 28 },
              { label: '45', v: 45 },
              { label: '?', v: 27 }
            ]}
            total="100"
          />
        )
      },
      { id: 'c100xm20', left: '45 + 27 − 30', right: '42' },
      { id: 'c100xm21', left: '', right: '41', promptFigure: <CompareCard150 top={['26', 26]} bottom={['?', 41]} diff="15" /> },
      { id: 'c100xm22', left: 'Van 100 Ft. Költ 45 Ft-ot és 38 Ft-ot. Marad?', right: '17 Ft' },
      { id: 'c100xm23', left: '', right: '49', promptFigure: <ChainCard start="74" op="− 25" /> },
      { id: 'c100xm24', left: '58 < □ < 61, és □ páratlan', right: '59' }
    ]
  }
];

export const COUNT100_EXAM_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const Count100ExamG2Matcher: React.FC<Count100ExamG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c100-tudasproba-matcher',
  topicTitle = '6. Megálló – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Párosítsd a számokat, műveleteket és fejtörőket az eredménnyel!"
      levels={COUNT100_EXAM_G2_MATCHER_LEVELS}
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

export default Count100ExamG2Matcher;
