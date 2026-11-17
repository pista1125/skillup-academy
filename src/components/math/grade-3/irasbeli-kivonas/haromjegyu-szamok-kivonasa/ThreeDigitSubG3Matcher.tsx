import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniCoins, MiniDiscs, MiniBuy } from './ThreeDigitSubG3CardFigures';

interface ThreeDigitSubG3MatcherProps {
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

const LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kerek százast veszünk el',
    description: 'Mennyi marad? Csak a százasok változnak!',
    pairs: [
      { id: 'tdsm1_0', left: 'Mennyi marad?', promptFigure: <MiniCoins coins={[100, 100, 100, 50, 20]} crossed={1} />, right: '270 Ft' },
      { id: 'tdsm1_1', left: 'Mennyi marad?', promptFigure: <MiniCoins coins={[100, 100, 100, 100, 10, 5]} crossed={2} />, right: '215 Ft' },
      { id: 'tdsm1_2', left: '430 − 300', promptFigure: <MiniDiscs sz={4} t={3} csz={3} />, right: '130' },
      { id: 'tdsm1_3', left: '352 − 100', promptFigure: <MiniDiscs sz={3} t={5} e={2} csz={1} />, right: '252' },
      { id: 'tdsm1_4', left: '476 − 200', right: '276' },
      { id: 'tdsm1_5', left: '338 − 100', right: '238' },
      { id: 'tdsm1_6', left: '495 − 300', right: '195' },
      { id: 'tdsm1_7', left: '260 − 200', right: '60' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kerek tízesek, felváltás',
    description: '1 százas = 10 tízes. Párosítsd!',
    pairs: [
      { id: 'tdsm2_0', left: '460 − 230', promptFigure: <MiniDiscs sz={4} t={6} csz={2} ct={3} />, right: '230' },
      { id: 'tdsm2_1', left: '380 − 120', promptFigure: <MiniDiscs sz={3} t={8} csz={1} ct={2} />, right: '260' },
      { id: 'tdsm2_2', left: 'Mennyi marad?', promptFigure: <MiniBuy wallet={430} kind="ball" price={250} />, right: '180' },
      { id: 'tdsm2_3', left: 'Mennyi marad?', promptFigure: <MiniBuy wallet={350} kind="kite" price={160} />, right: '190' },
      { id: 'tdsm2_4', left: '420 − 180', right: '240' },
      { id: 'tdsm2_5', left: '410 − 330', right: '80' },
      { id: 'tdsm2_6', left: '360 − 190', right: '170' },
      { id: 'tdsm2_7', left: '490 − 220', right: '270' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi marad 500-ból?',
    description: 'Pótolj 500-ig! Párosítsd a vásárlást a maradékkal!',
    pairs: [
      { id: 'tdsm3_0', left: '', promptFigure: <MiniBuy wallet={500} kind="robot" price={320} />, right: '180' },
      { id: 'tdsm3_1', left: '', promptFigure: <MiniBuy wallet={500} kind="bear" price={415} />, right: '85' },
      { id: 'tdsm3_2', left: '', promptFigure: <MiniBuy wallet={500} kind="puzzle" price={365} />, right: '135' },
      { id: 'tdsm3_3', left: '', promptFigure: <MiniBuy wallet={500} kind="kite" price={245} />, right: '255' },
      { id: 'tdsm3_4', left: '500 − 285', right: '215' },
      { id: 'tdsm3_5', left: '500 − 160', right: '340' },
      { id: 'tdsm3_6', left: '500 − 455', right: '45' },
      { id: 'tdsm3_7', left: 'Mennyi kell a 375-höz, hogy 500 legyen?', right: '125' }
    ]
  }
];

export const THREE_DIGIT_SUB_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const ThreeDigitSubG3Matcher: React.FC<ThreeDigitSubG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wsub-haromjegyu-matcher',
  topicTitle = '1. Háromjegyű számok kivonása – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId={topicId}
      subtopicId="haromjegyu-szamok-kivonasa"
      title={topicTitle}
      subtitle="Párosítsd a kivonásokat a különbségükkel!"
      levels={THREE_DIGIT_SUB_G3_MATCHER_LEVELS}
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

export default ThreeDigitSubG3Matcher;
