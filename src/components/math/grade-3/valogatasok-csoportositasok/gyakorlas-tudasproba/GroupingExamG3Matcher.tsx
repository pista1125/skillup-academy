import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { B } from './GroupingExamG3Parts';
import { OneBlockCard, CodeCard, VennDotCard, CardsCard, BallsCard, OutfitCard, PathsCard, ScoopsCard } from './GroupingExamG3CardFigures';

interface GroupingExamG3MatcherProps {
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

const GROUPING_EXAM_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Lap és leírás',
    description: 'Melyik leírás illik a laphoz?',
    pairs: [
      { id: 'gexm1_0', left: '', promptFigure: <OneBlockCard b={B('piros', 'kor', true, true)} />, right: 'nagy, piros, lyukas kör' },
      { id: 'gexm1_1', left: '', promptFigure: <OneBlockCard b={B('kek', 'negyzet', false, false)} />, right: 'kicsi, kék, nem lyukas négyzet' },
      { id: 'gexm1_2', left: '', promptFigure: <OneBlockCard b={B('sarga', 'haromszog', true, false)} />, right: 'nagy, sárga, nem lyukas háromszög' },
      { id: 'gexm1_3', left: '', promptFigure: <OneBlockCard b={B('zold', 'kor', false, true)} />, right: 'kicsi, zöld, lyukas kör' },
      { id: 'gexm1_4', left: 'Mit mutatnak a jelek?', promptFigure: <CodeCard b={B('kek', 'haromszog', true, true)} />, right: 'nagy, kék, lyukas háromszög' },
      { id: 'gexm1_5', left: 'Hányféle forma van a készletben?', right: '3 forma' },
      { id: 'gexm1_6', left: 'Hányféle szín van a készletben?', right: '4 szín' },
      { id: 'gexm1_7', left: 'Hány lap van a készletben?', right: '48 lap' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Halmazábra',
    description: 'Mit tudsz arról, ami a pötty helyén van?',
    pairs: [
      { id: 'gexm2_0', left: 'A pötty helyén lévő lap…', promptFigure: <VennDotCard a="piros" b="lyukas" r="ab" />, right: 'piros és lyukas' },
      { id: 'gexm2_1', left: 'A pötty helyén lévő lap…', promptFigure: <VennDotCard a="piros" b="lyukas" r="a" />, right: 'piros, de nem lyukas' },
      { id: 'gexm2_2', left: 'A pötty helyén lévő lap…', promptFigure: <VennDotCard a="piros" b="lyukas" r="b" />, right: 'lyukas, de nem piros' },
      { id: 'gexm2_3', left: 'A pötty helyén lévő lap…', promptFigure: <VennDotCard a="piros" b="lyukas" r="out" />, right: 'se nem piros, se nem lyukas' },
      { id: 'gexm2_4', left: 'Karikák: páros, háromjegyű. Hová kerül a 7?', right: 'a karikákon kívülre' },
      { id: 'gexm2_5', left: '12 gyerek a foci karikában, ebből 4 a közös részben. Hányan csak focisták?', right: '8 gyerek' },
      { id: 'gexm2_6', left: 'Mi kerül a „páros” és a „páratlan” karika közös részébe?', right: 'semmi, a közös rész üres' },
      { id: 'gexm2_7', left: 'Minden kerek tízes páros. Hogyan rajzoljuk a két karikát?', right: 'karika a karikában' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Sorrend és lehetőség',
    description: 'Hány lehetőség van? Igaz vagy hamis?',
    pairs: [
      { id: 'gexm3_0', left: 'Hány háromjegyű szám?', promptFigure: <CardsCard digits={[2, 0, 4]} />, right: '4 szám' },
      { id: 'gexm3_1', left: 'Hányféle sorrend?', promptFigure: <BallsCard balls={['piros', 'kek', 'zold']} />, right: '6 sorrend' },
      { id: 'gexm3_2', left: 'Hányféle öltözet?', promptFigure: <OutfitCard shirts={['piros', 'kek']} pants={['zold', 'barna', 'lila', 'sarga']} />, right: '8 öltözet' },
      { id: 'gexm3_3', left: 'Hány útvonal vezet a zöldtől a pirosig?', promptFigure: <PathsCard a={3} b={3} />, right: '9 útvonal' },
      { id: 'gexm3_4', left: '2 különböző gombóc, a sorrend mindegy', promptFigure: <ScoopsCard flavours={['rozsa', 'barna', 'sarga']} />, right: '3 pár' },
      { id: 'gexm3_5', left: '„Minden lap piros.” Az egyik lap kék.', right: 'hamis' },
      { id: 'gexm3_6', left: '„Van olyan szám, amelyik páros.” Számok: 13, 20, 35', right: 'igaz' },
      { id: 'gexm3_7', left: '4 barát, mindenki mindenkivel egyszer kezet fog', right: '6 kézfogás' }
    ]
  }
];

export const GROUPING_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: GROUPING_EXAM_G3_MATCHER_LEVELS_LIST[0],
  2: GROUPING_EXAM_G3_MATCHER_LEVELS_LIST[1],
  3: GROUPING_EXAM_G3_MATCHER_LEVELS_LIST[2]
};

export const GroupingExamG3Matcher: React.FC<GroupingExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-grp-tudasproba-matcher',
  topicTitle = '4. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Párosítsd a lapokat, a halmazábrákat és a lehetőségeket!"
      levels={GROUPING_EXAM_G3_MATCHER_LEVELS}
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

export default GroupingExamG3Matcher;
