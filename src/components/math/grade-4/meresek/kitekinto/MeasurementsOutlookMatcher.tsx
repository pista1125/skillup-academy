import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MeasurementsOutlookMatcherProps {
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

const MEASUREMENTS_OUTLOOK_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Tartályok és ugrások',
    description: 'Párosítsd az adatokat!',
    pairs: [
      { id: 'mom1', left: 'traktor üzemanyagtartálya', right: '100 l' },
      { id: 'mom2', left: 'autóbusz üzemanyagtartálya', right: '300 l' },
      { id: 'mom3', left: 'személyautó üzemanyagtartálya', right: '50 l' },
      { id: 'mom4', left: 'helikopter vegyszertartálya', right: '800 l' },
      { id: 'mom5', left: 'a kecskebéka ugrása: 1 m', right: '100 cm' },
      { id: 'mom6', left: 'az erdei béka ugrása: 185 cm', right: '1 m 85 cm' },
      { id: 'mom7', left: '8 liter szőlőlé fele', right: '4 l' },
      { id: 'mom8', left: '2 ló', right: '4 szamár' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Lépésről lépésre',
    description: 'Számold ki, és párosítsd!',
    pairs: [
      { id: 'mom9', left: '2 szamár', right: '5 kecske' },
      { id: 'mom10', left: '4 szamár', right: '10 kecske' },
      { id: 'mom11', left: '1 ló', right: '2 szamár' },
      { id: 'mom12', left: '4 ló', right: '8 szamár' },
      { id: 'mom13', left: 'az erdei béka 2 ugrása', right: '370 cm' },
      { id: 'mom14', left: 'a kecskebéka 2 ugrása', right: '200 cm' },
      { id: 'mom15', left: 'az előny 1 ugrás után', right: '85 cm' },
      { id: 'mom16', left: 'az előny 3 ugrás után', right: '255 cm' }
    ]
  },
  {
    level: 3,
    title: '3. szint: A fejtörők megoldásai',
    description: 'Párosítsd a kérdést a megoldással!',
    pairs: [
      { id: 'mom17', left: 'Hány kecske jár 4 lóért?', right: '20 kecske' },
      { id: 'mom18', left: 'Hányadik ugrásnál 425 cm az előny?', right: 'az 5. ugrásnál' },
      { id: 'mom19', left: 'Hány piros golyója van Monának?', right: '12' },
      { id: 'mom20', left: 'Hány kék golyója van Monának?', right: '6' },
      { id: 'mom21', left: 'a legnagyobb és a legkisebb tartály különbsége', right: '750 l' },
      { id: 'mom22', left: 'a helikopter tartálya hányszorosa a traktorénak?', right: '8-szorosa' },
      { id: 'mom23', left: 'hány autótartályt tölt meg 800 l?', right: '16' },
      { id: 'mom24', left: 'Hány kecske jár 3 lóért?', right: '15 kecske' }
    ]
  }
];

const MEASUREMENTS_OUTLOOK_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MEASUREMENTS_OUTLOOK_MATCHER_LEVELS_LIST[0],
  2: MEASUREMENTS_OUTLOOK_MATCHER_LEVELS_LIST[1],
  3: MEASUREMENTS_OUTLOOK_MATCHER_LEVELS_LIST[2]
};

export const MeasurementsOutlookMatcher: React.FC<MeasurementsOutlookMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-meas-kitekinto-matcher',
  topicTitle = '8. Kitekintő – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="kitekinto"
      title={topicTitle}
      subtitle="Párosítsd a tartályokat, az ugrásokat, a cseréket és a fejtörők megoldásait!"
      levels={MEASUREMENTS_OUTLOOK_MATCHER_LEVELS}
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

export default MeasurementsOutlookMatcher;
