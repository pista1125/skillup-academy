import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CompareBarsCard,
  EqualPairShareCard,
  MissingPartStripCard,
  StripCrossCard,
  StripJoinCard,
  TokensPurseCard,
  TwoStepBusCard,
} from './WordProblems20G2CardFigures';

interface WordProblems20G2MatcherProps {
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
  [key: string]: unknown;
}

const WORDPROBLEMS20_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik számfeladat?',
    description: 'Párosítsd a rövid történetet vagy az ábrát a helyes számfeladattal!',
    pairs: [
      { id: 'wp20m1', left: 'A fán 15 veréb ült, 6 elrepült.', right: '15 − 6' },
      { id: 'wp20m2', left: '7 piros és 8 sárga falevél.', right: '7 + 8' },
      { id: 'wp20m3', left: 'Hányan vannak együtt?', promptFigure: <StripJoinCard a={9} b={5} />, right: '9 + 5' },
      { id: 'wp20m4', left: 'Hány lufi maradt?', promptFigure: <StripCrossCard total={16} gone={7} />, right: '16 − 7' },
      { id: 'wp20m5', left: 'Mennyi hiányzik még?', promptFigure: <MissingPartStripCard whole={20} part={12} />, right: '20 − 12' },
      { id: 'wp20m6', left: 'Hány gyöngy összesen?', promptFigure: <StripJoinCard a={8} b={11} />, right: '8 + 11' },
      { id: 'wp20m7', left: 'Hány maradt?', promptFigure: <StripCrossCard total={13} gone={4} />, right: '13 − 4' },
      { id: 'wp20m8', left: 'A 19 oldalas könyvből 8 oldal kész. Mennyi van hátra?', right: '19 − 8' },
    ],
  },
  {
    level: 2,
    title: '2. szint: Több vagy kevesebb? (Vigyázz a csapdára!)',
    description: 'Számold ki, mennyit ér a kérdőjel, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'wp20m9', left: '', promptFigure: <CompareBarsCard top="11" diff={5} kind="more" />, right: '16' },
      { id: 'wp20m10', left: '', promptFigure: <CompareBarsCard top="17" diff={8} kind="less" />, right: '9' },
      { id: 'wp20m11', left: '', promptFigure: <CompareBarsCard top="8" diff={6} kind="more" />, right: '14' },
      { id: 'wp20m12', left: '', promptFigure: <CompareBarsCard top="15" diff={7} kind="less" />, right: '8' },
      { id: 'wp20m13', left: 'Flóra 19 kagylót talált, 6-tal többet, mint Lotti. Lotti:', right: '13' },
      { id: 'wp20m14', left: 'Soma 9 gólt lőtt, 3-mal kevesebbet, mint Vince. Vince:', right: '12' },
      { id: 'wp20m15', left: 'Egyenlő két részre osztva:', promptFigure: <EqualPairShareCard total={14} />, right: '7' },
      { id: 'wp20m16', left: 'Bence 14 éves, 9 évvel idősebb a húgánál. A húga:', right: '5' },
    ],
  },
  {
    level: 3,
    title: '3. szint: Két lépés és egyenlő elosztás',
    description: 'Számold ki a történetet, és párosítsd a helyes válasszal!',
    pairs: [
      { id: 'wp20m17', left: '20 zsetonból maradt:', promptFigure: <TokensPurseCard money={20} prices={[6, 5]} />, right: '9 zseton' },
      { id: 'wp20m18', left: 'Hány utas van most?', promptFigure: <TwoStepBusCard onBoard="12" up={5} down={3} />, right: '14 utas' },
      { id: 'wp20m19', left: 'Mennyi hiányzik?', promptFigure: <MissingPartStripCard whole={19} part={11} />, right: '8 darab' },
      { id: 'wp20m20', left: 'Egy tálkába kerül:', promptFigure: <EqualPairShareCard total={12} />, right: '6 szem' },
      { id: 'wp20m21', left: '6 piros és 7 zöld virág, 2 elhervadt. Maradt:', right: '11 virág' },
      { id: 'wp20m22', left: '18 golyóból 4 zöld, a többi egyenlően kék és piros. Kék:', right: '7 golyó' },
      { id: 'wp20m23', left: 'Hány utas van most?', promptFigure: <TwoStepBusCard onBoard="16" up={3} down={7} />, right: '12 utas' },
      { id: 'wp20m24', left: 'Eszter 9 matricát, Bence 3-mal kevesebbet gyűjtött. Együtt:', right: '15 matrica' },
    ],
  },
];

export const WORDPROBLEMS20_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WORDPROBLEMS20_G2_MATCHER_LEVELS_LIST[0],
  2: WORDPROBLEMS20_G2_MATCHER_LEVELS_LIST[1],
  3: WORDPROBLEMS20_G2_MATCHER_LEVELS_LIST[2],
};

export const WordProblems20G2Matcher: React.FC<WordProblems20G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c20-szoveges-matcher',
  topicTitle = '6. Szöveges feladatok – Párosító',
  ...rest
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : 1);
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Párosítsd a történeteket és ábrákat a számfeladattal vagy az eredménnyel!"
      levels={WORDPROBLEMS20_G2_MATCHER_LEVELS}
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

export default WordProblems20G2Matcher;
