import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniAdd, MiniSub, ChainCard, MiniBar, MiniRoute, MiniRows, MiniCoins } from './WrittenOps1000ExamG3CardFigures';

interface Props {
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

export const WRITTEN_OPS_1000_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Írásban számolok',
    description: 'Számold ki írásban, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'wo1000em1', left: '', promptFigure: <MiniAdd xs={[347, 285]} />, right: '632' },
      { id: 'wo1000em2', left: '', promptFigure: <MiniAdd xs={[469, 238]} />, right: '707' },
      { id: 'wo1000em3', left: '', promptFigure: <MiniSub a={824} b={367} />, right: '457' },
      { id: 'wo1000em4', left: '', promptFigure: <MiniSub a={1000} b={385} />, right: '615' },
      { id: 'wo1000em5', left: '', promptFigure: <MiniAdd xs={[156, 243, 318]} />, right: '717' },
      { id: 'wo1000em6', left: '705 − 269', right: '436' },
      { id: 'wo1000em7', left: '600 − 274', right: '326' },
      { id: 'wo1000em8', left: '528 + 395', right: '923' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Sorrend és hiányzó szám',
    description: 'Figyelj a sorrendre! Melyik szám illik a □ helyére?',
    pairs: [
      { id: 'wo1000em9', left: '□ + 375 = 850', promptFigure: <MiniBar whole="850" a="□" b="375" />, right: '475' },
      { id: 'wo1000em10', left: '□ − 286 = 437', promptFigure: <MiniBar whole="□" a="286" b="437" wa={0.4} />, right: '723' },
      { id: 'wo1000em11', left: '', promptFigure: <ChainCard start="640" ops={['− 285', '+ 170']} />, right: '525' },
      { id: 'wo1000em12', left: '', promptFigure: <ChainCard start="815" ops={['− 390', '− 125']} />, right: '300' },
      { id: 'wo1000em13', left: '500 − 40 · 6', right: '260' },
      { id: 'wo1000em14', left: '(720 − 360) : 4', right: '90' },
      { id: 'wo1000em15', left: '900 − (250 + 380)', right: '270' },
      { id: 'wo1000em16', left: '1000 − (195 + 405)', right: '400' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Szöveges feladatok',
    description: 'Gondold végig, számolj, aztán párosíts!',
    pairs: [
      { id: 'wo1000em17', left: 'Milyen hosszú az egész út?', promptFigure: <MiniRoute d1="386" d2="459" />, right: '845 m' },
      { id: 'wo1000em18', left: 'Veszel egy 385 Ft-os könyvet. Mennyi marad?', promptFigure: <MiniCoins coins={[200, 200, 200, 200, 100]} />, right: '515 Ft' },
      { id: 'wo1000em19', left: 'Hétfőn 315 jegy fogyott, kedden 146-tal több. Hány a két napon?', promptFigure: <MiniRows a="315" diff="+146" more />, right: '776 jegy' },
      { id: 'wo1000em20', left: 'Sárga: 530 golyó, zöld: 175-tel kevesebb. Hány együtt?', promptFigure: <MiniRows a="530" diff="−175" more={false} />, right: '885 golyó' },
      { id: 'wo1000em21', left: 'Gondoltam egy számot. Elvettem belőle 375-öt, 448 lett.', right: '823' },
      { id: 'wo1000em22', left: 'Két szám összege 1000. Az egyik 638. Mennyi a másik?', right: '362' },
      { id: 'wo1000em23', left: '1000 Ft-ból veszel 2 füzetet, mindegyik 250 Ft. Mennyi marad?', right: '500 Ft' },
      { id: 'wo1000em24', left: '4 sor, soronként 90 szék. 85 szék foglalt. Hány szabad?', right: '275 szék' }
    ]
  }
};

export const WrittenOps1000ExamG3Matcher: React.FC<Props> = ({
  level = 1,
  currentLevel,
  topicId = 'g3-wops-tudasproba-matcher',
  topicTitle = '5. Megálló – tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Párosítsd a feladatot a megoldásával!"
      levels={WRITTEN_OPS_1000_EXAM_G3_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      {...rest}
    />
  );
};

export default WrittenOps1000ExamG3Matcher;
