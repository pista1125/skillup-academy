import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsCard150, LineCard150, ChartCard, CoinCard150 } from './Numbers100G2CardFigures';

interface Numbers100G2MatcherProps {
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

const NUMBERS100_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Rudak, kockák, számok',
    description: 'Egy rúd 10, egy kocka 1. Párosítsd a képet a számmal!',
    pairs: [
      { id: 'n100m1', left: '', right: '62', promptFigure: <RodsCard150 tens={6} ones={2} /> },
      { id: 'n100m2', left: '', right: '75', promptFigure: <RodsCard150 tens={7} ones={5} /> },
      { id: 'n100m3', left: '', right: '58', promptFigure: <RodsCard150 tens={5} ones={8} /> },
      { id: 'n100m4', left: '', right: '91', promptFigure: <RodsCard150 tens={9} ones={1} /> },
      { id: 'n100m5', left: '8 tízes', right: '80' },
      { id: 'n100m6', left: '6 tízes + 7 egyes', right: '67' },
      { id: 'n100m7', left: '', right: '100', promptFigure: <RodsCard150 tens={10} ones={0} /> },
      { id: 'n100m8', left: 'hetvenhárom', right: '73' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számegyenes és százas tábla',
    description: 'Hová mutat a nyíl? Mi bújt el a ? helyén? Kik a szomszédok?',
    pairs: [
      { id: 'n100m9', left: '', right: '68', promptFigure: <LineCard150 from={60} to={70} at={68} /> },
      { id: 'n100m10', left: '', right: '83', promptFigure: <LineCard150 from={80} to={90} at={83} /> },
      { id: 'n100m11', left: '', right: '64', promptFigure: <ChartCard known={54} dr={1} dc={0} /> },
      { id: 'n100m12', left: '', right: '80', promptFigure: <ChartCard known={79} dr={0} dc={1} /> },
      { id: 'n100m13', left: 'A 70 tízes szomszédai', right: '60 és 80' },
      { id: 'n100m14', left: 'A 88 egyes szomszédai', right: '87 és 89' },
      { id: 'n100m15', left: 'A 95 tízes szomszédai', right: '90 és 100' },
      { id: 'n100m16', left: '', right: '97', promptFigure: <LineCard150 from={90} to={100} at={97} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Fejtörők',
    description: 'Számold össze a pénzt, cserélj be 10 kockát, lépj a táblán!',
    pairs: [
      { id: 'n100m17', left: '', right: '80 Ft', promptFigure: <CoinCard150 coins={[50, 20, 10]} /> },
      { id: 'n100m18', left: '', right: '70 Ft', promptFigure: <CoinCard150 coins={[20, 20, 20, 10]} /> },
      { id: 'n100m19', left: '', right: '55', promptFigure: <RodsCard150 tens={4} ones={15} /> },
      { id: 'n100m20', left: '7 tízes + 12 egyes', right: '82' },
      { id: 'n100m21', left: 'Tízesek helyén 9, egyesek helyén 0', right: '90' },
      { id: 'n100m22', left: '', right: '56', promptFigure: <ChartCard known={36} dr={2} dc={0} /> },
      { id: 'n100m23', left: 'Pont középen a 60 és a 70 között', right: '65' },
      { id: 'n100m24', left: '', right: '78', promptFigure: <RodsCard150 tens={6} ones={18} /> }
    ]
  }
];

export const NUMBERS100_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBERS100_G2_MATCHER_LEVELS_LIST[0],
  2: NUMBERS100_G2_MATCHER_LEVELS_LIST[1],
  3: NUMBERS100_G2_MATCHER_LEVELS_LIST[2]
};

export const Numbers100G2Matcher: React.FC<Numbers100G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c100-szamok-matcher',
  topicTitle = '1. Számok 100-ig – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="szamok-100-ig"
      title={topicTitle}
      subtitle="Párosítsd a rudakat, a számegyenest és a fejtörőket a számokkal!"
      levels={NUMBERS100_G2_MATCHER_LEVELS}
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

export default Numbers100G2Matcher;
