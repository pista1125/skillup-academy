import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupsCard, ArrayCard, JumpsCard, CoinsCard, ChainCard } from './MultExamG2CardFigures';

interface MultExamG2MatcherProps {
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

const MULT_EXAM_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Képek és szorzatok',
    description: 'Számold ki, mennyi! Párosítsd a képet vagy a szorzást az eredménnyel!',
    pairs: [
      { id: 'g2mxm1', left: '', promptFigure: <GroupsCard sizes={[4, 4, 4]} />, right: '12' },
      { id: 'g2mxm2', left: '', promptFigure: <ArrayCard rows={2} cols={7} />, right: '14' },
      { id: 'g2mxm3', left: '', promptFigure: <JumpsCard step={5} jumps={4} />, right: '20' },
      { id: 'g2mxm4', left: '', promptFigure: <CoinsCard values={[10, 10, 10, 10, 10, 10]} />, right: '60 Ft' },
      { id: 'g2mxm5', left: '', promptFigure: <GroupsCard sizes={[2, 2, 2, 2, 2]} />, right: '10' },
      { id: 'g2mxm6', left: '3 · 3', right: '9' },
      { id: 'g2mxm7', left: '8 · 2', right: '16' },
      { id: 'g2mxm8', left: '1 · 7', right: '7' },
    ],
  },
  {
    level: 2,
    title: '2. szint: Minden tábla',
    description: 'A teljes szorzótábla: szorzat, hiányzó tényező, -szorosa.',
    pairs: [
      { id: 'g2mxm9', left: 'a 6 négyszerese', right: '24' },
      { id: 'g2mxm10', left: '7 · 7', right: '49' },
      { id: 'g2mxm11', left: '', promptFigure: <JumpsCard step={8} jumps={6} />, right: '48' },
      { id: 'g2mxm12', left: '', promptFigure: <ArrayCard rows={3} cols={9} />, right: '27' },
      { id: 'g2mxm13', left: '', promptFigure: <GroupsCard sizes={[9, 9, 9, 9]} />, right: '36' },
      { id: 'g2mxm14', left: '', promptFigure: <CoinsCard values={[5, 5, 5, 5, 5, 5, 5, 5]} />, right: '40 Ft' },
      { id: 'g2mxm15', left: '□ · 9 = 63', right: '7' },
      { id: 'g2mxm16', left: '6 · 9', right: '54' },
    ],
  },
  {
    level: 3,
    title: '3. szint: Két lépés és fejtörők',
    description: 'Gondold végig lépésről lépésre!',
    pairs: [
      { id: 'g2mxm17', left: '', promptFigure: <ChainCard start={4} ops={['· 2', '· 4']} />, right: '32' },
      { id: 'g2mxm18', left: '', promptFigure: <GroupsCard sizes={[4, 4, 2, 2, 2]} />, right: '14' },
      { id: 'g2mxm19', left: '5 · 8 − 7', right: '33' },
      { id: 'g2mxm20', left: '3 · 7 = 21, akkor 6 · 7 = ?', right: '42' },
      { id: 'g2mxm21', left: '', promptFigure: <ArrayCard rows={7} cols={8} />, right: '56' },
      { id: 'g2mxm22', left: '', promptFigure: <JumpsCard step={9} jumps={8} endLabel="72" askJumps />, right: '8' },
      { id: 'g2mxm23', left: '', promptFigure: <CoinsCard values={[50, 20, 10, 10]} />, right: '90 Ft' },
      { id: 'g2mxm24', left: '10 · 10 − 1', right: '99' },
    ],
  },
];

export const MULT_EXAM_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MULT_EXAM_G2_MATCHER_LEVELS_LIST[0],
  2: MULT_EXAM_G2_MATCHER_LEVELS_LIST[1],
  3: MULT_EXAM_G2_MATCHER_LEVELS_LIST[2],
};

export const MultExamG2Matcher: React.FC<MultExamG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-szorzas-tudasproba-matcher',
  topicTitle = '10. Gyakorlás, tudáspróba – Párosító Játék',
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="A IV. témakör összefoglalása: párosítsd a feladatot az eredményével!"
      themeColor="rose"
      levels={MULT_EXAM_G2_MATCHER_LEVELS}
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

export default MultExamG2Matcher;
