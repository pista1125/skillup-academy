import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { JumpsCard, ArrayCard, ChainCard, CoinsCard } from '../../szorzas/gyakorlas-tudasproba/MultExamG2CardFigures';
import { PlatesCard, RemainderCard, BoatsCard } from './DivExamG2CardFigures';

interface DivExamG2MatcherProps {
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

const DIV_EXAM_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Csoportosítás és szétosztás',
    description: 'Párosítsd a képet vagy az osztást az eredménnyel!',
    pairs: [
      { id: 'g2dxm1', left: 'Mennyi jut egy tányérra?', promptFigure: <PlatesCard pile={12} plates={3} />, right: '4' },
      { id: 'g2dxm2', left: 'Hány ugrás?', promptFigure: <JumpsCard step={5} jumps={6} endLabel="30" askJumps />, right: '6' },
      { id: 'g2dxm3', left: 'A 16 fele', promptFigure: <ArrayCard rows={2} cols={8} />, right: '8' },
      { id: 'g2dxm4', left: 'Hány pötty van egy sorban?', promptFigure: <ArrayCard rows={3} cols={5} />, right: '5' },
      { id: 'g2dxm5', left: '9 : 9', right: '1' },
      { id: 'g2dxm6', left: '0 : 5', right: '0' },
      { id: 'g2dxm7', left: '30 : 10', right: '3' },
      { id: 'g2dxm8', left: '14 : 2', right: '7' },
    ],
  },
  {
    level: 2,
    title: '2. szint: Minden tábla és maradék',
    description: 'Osztás, -ad része, hiányzó szám és maradékos osztás.',
    pairs: [
      { id: 'g2dxm9', left: '56 : 8', right: '7' },
      { id: 'g2dxm10', left: '□ : 6 = 9', right: '54' },
      { id: 'g2dxm11', left: 'a 32 negyede', right: '8' },
      { id: 'g2dxm12', left: '', promptFigure: <RemainderCard n={17} d={5} />, right: '3 csoport, maradt 2' },
      { id: 'g2dxm13', left: '', promptFigure: <RemainderCard n={11} d={4} />, right: '2 csoport, maradt 3' },
      { id: 'g2dxm14', left: 'Hány ugrás?', promptFigure: <JumpsCard step={8} jumps={6} endLabel="48" askJumps />, right: '6' },
      { id: 'g2dxm15', left: 'Mennyi jut egy tányérra?', promptFigure: <PlatesCard pile={40} plates={8} />, right: '5' },
      { id: 'g2dxm16', left: '70 : 7', right: '10' },
    ],
  },
  {
    level: 3,
    title: '3. szint: Két lépés és „hány kell?”',
    description: 'Gondold végig lépésről lépésre!',
    pairs: [
      { id: 'g2dxm17', left: 'Hány csónak kell?', promptFigure: <BoatsCard total={22} each={5} />, right: '5' },
      { id: 'g2dxm18', left: '5-ösével: 7 csoport, maradt 3. Hány volt?', right: '38' },
      { id: 'g2dxm19', left: '', promptFigure: <ChainCard start={36} ops={[': 4', '· 3']} />, right: '27' },
      { id: 'g2dxm20', left: '72 : 8 + 9', right: '18' },
      { id: 'g2dxm21', left: '', promptFigure: <RemainderCard n={29} d={9} />, right: '3 csoport, maradt 2' },
      { id: 'g2dxm22', left: 'a 18 felének a harmada', right: '3' },
      { id: 'g2dxm23', left: 'Hány ugrás?', promptFigure: <JumpsCard step={7} jumps={9} endLabel="63" askJumps />, right: '9' },
      { id: 'g2dxm24', left: 'Hány 10 Ft-os ér ennyit?', promptFigure: <CoinsCard values={[50, 10, 10, 10]} />, right: '8' },
    ],
  },
];

export const DIV_EXAM_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: DIV_EXAM_G2_MATCHER_LEVELS_LIST[0],
  2: DIV_EXAM_G2_MATCHER_LEVELS_LIST[1],
  3: DIV_EXAM_G2_MATCHER_LEVELS_LIST[2],
};

export const DivExamG2Matcher: React.FC<DivExamG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-osztas-tudasproba-matcher',
  topicTitle = '10. Gyakorlás, tudáspróba – Párosító Játék',
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Az V. témakör összefoglalása: párosítsd a feladatot az eredményével!"
      themeColor="purple"
      levels={DIV_EXAM_G2_MATCHER_LEVELS}
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

export default DivExamG2Matcher;
