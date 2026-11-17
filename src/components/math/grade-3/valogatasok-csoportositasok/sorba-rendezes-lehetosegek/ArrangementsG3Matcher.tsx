import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardsCard, BallsCard, OutfitCard, PathsCard, ScoopsCard, TowersCard } from './ArrangementsG3CardFigures';

interface ArrangementsG3MatcherProps {
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

const ARRANGEMENTS_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számkártyák',
    description: 'Rakd sorba a kártyákat! Melyik számot kapod?',
    pairs: [
      { id: 'arm1_0', left: 'a nagyobb szám', promptFigure: <CardsCard digits={[4, 7]} />, right: '74' },
      { id: 'arm1_1', left: 'a kisebb szám', promptFigure: <CardsCard digits={[9, 2]} />, right: '29' },
      { id: 'arm1_2', left: 'a legnagyobb szám', promptFigure: <CardsCard digits={[3, 1, 4]} />, right: '431' },
      { id: 'arm1_3', left: 'a legkisebb szám', promptFigure: <CardsCard digits={[2, 0, 5]} />, right: '205' },
      { id: 'arm1_4', left: 'a kisebb szám', promptFigure: <CardsCard digits={[8, 5]} />, right: '58' },
      { id: 'arm1_5', left: 'a legnagyobb szám', promptFigure: <CardsCard digits={[1, 0, 4]} />, right: '410' },
      { id: 'arm1_6', left: 'A 3, 6, 1 kártyákból a legkisebb háromjegyű szám', right: '136' },
      { id: 'arm1_7', left: 'A 2, 4, 3 kártyákból a legnagyobb háromjegyű szám', right: '432' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hányféle?',
    description: 'Hány lehetőség van? Párosítsd!',
    pairs: [
      { id: 'arm2_0', left: 'Hányféle sorrend?', promptFigure: <BallsCard balls={['piros', 'kek']} />, right: '2 sorrend' },
      { id: 'arm2_1', left: 'Hányféle sorrend?', promptFigure: <BallsCard balls={['sarga', 'zold', 'lila']} />, right: '6 sorrend' },
      { id: 'arm2_2', left: 'Hányféle öltözet?', promptFigure: <OutfitCard shirts={['piros', 'kek']} pants={['zold', 'barna', 'lila', 'sarga']} />, right: '8 öltözet' },
      { id: 'arm2_3', left: 'Hányféle öltözet?', promptFigure: <OutfitCard shirts={['piros', 'kek', 'narancs']} pants={['zold', 'barna', 'lila']} />, right: '9 öltözet' },
      { id: 'arm2_4', left: 'Hány háromjegyű szám?', promptFigure: <CardsCard digits={[3, 0, 1]} />, right: '4 szám' },
      { id: 'arm2_5', left: 'Hány útvonal vezet a zöldtől a pirosig?', promptFigure: <PathsCard a={2} b={5} />, right: '10 útvonal' },
      { id: 'arm2_6', left: '2 különböző gombóc, a sorrend mindegy', promptFigure: <ScoopsCard flavours={['rozsa', 'barna', 'sarga']} />, right: '3 lehetőség' },
      { id: 'arm2_7', left: '1 póló és 1 nadrág', right: '1 öltözet' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Gondolkodj!',
    description: 'Melyik szám? Ki az? Párosítsd!',
    pairs: [
      { id: 'arm3_0', left: 'a legnagyobb páros háromjegyű szám', promptFigure: <CardsCard digits={[3, 4, 1]} />, right: '314' },
      { id: 'arm3_1', left: 'a páratlan háromjegyű szám', promptFigure: <CardsCard digits={[2, 3, 0]} />, right: '203' },
      { id: 'arm3_2', left: 'a legkisebb páros háromjegyű szám', promptFigure: <CardsCard digits={[4, 1, 0]} />, right: '104' },
      { id: 'arm3_3', left: 'a 300-hoz legközelebbi háromjegyű szám', promptFigure: <CardsCard digits={[2, 4, 1]} />, right: '241' },
      { id: 'arm3_4', left: 'A 3, 5, 0 kártyákból a legkisebb háromjegyű szám', right: '305' },
      { id: 'arm3_5', left: 'Levi magasabb Dórinál. Panna magasabb Levinél. Ki a legalacsonyabb?', right: 'Dóri' },
      { id: 'arm3_6', left: 'Kata 9 éves. Dani 2 évvel idősebb Katánál. Bori 1 évvel fiatalabb Katánál. Ki a legidősebb?', right: 'Dani' },
      { id: 'arm3_7', left: 'Melyik a második legmagasabb torony?', promptFigure: <TowersCard heights={[3, 6, 5, 2]} letters />, right: 'a C torony' }
    ]
  }
];

export const ARRANGEMENTS_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ARRANGEMENTS_G3_MATCHER_LEVELS_LIST[0],
  2: ARRANGEMENTS_G3_MATCHER_LEVELS_LIST[1],
  3: ARRANGEMENTS_G3_MATCHER_LEVELS_LIST[2]
};

export const ArrangementsG3Matcher: React.FC<ArrangementsG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-grp-lehetosegek-matcher',
  topicTitle = '3. Sorba rendezés és lehetőségek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="sorba-rendezes-lehetosegek"
      title={topicTitle}
      subtitle="Párosítsd a feladatot a jó válasszal!"
      levels={ARRANGEMENTS_G3_MATCHER_LEVELS}
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

export default ArrangementsG3Matcher;
