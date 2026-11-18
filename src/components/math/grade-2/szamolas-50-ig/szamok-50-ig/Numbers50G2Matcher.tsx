import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard, CoinsCard, EggsCard, NumberLineCard, SequenceCard } from './Numbers50G2CardFigures';

interface Numbers50G2MatcherProps {
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

const NUMBERS50_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Tízesek és egyesek',
    description: 'Számold meg a rudakat és a kockákat! Párosítsd a számmal!',
    pairs: [
      { id: 'n50m1', left: '', right: '23', promptFigure: <BlocksCard tens={2} ones={3} /> },
      { id: 'n50m2', left: '', right: '31', promptFigure: <BlocksCard tens={3} ones={1} /> },
      { id: 'n50m3', left: '4 tízes + 5 egyes', right: '45' },
      { id: 'n50m4', left: '', right: '50', promptFigure: <BlocksCard tens={5} ones={0} /> },
      { id: 'n50m5', left: 'huszonnyolc', right: '28' },
      { id: 'n50m6', left: '', right: '35', promptFigure: <CoinsCard coins={[20, 10, 5]} /> },
      { id: 'n50m7', left: 'negyvenkettő', right: '42' },
      { id: 'n50m8', left: '', right: '39', promptFigure: <BlocksCard tens={3} ones={9} /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számegyenes és szomszédok',
    description: 'Hová mutat a nyíl? Melyik szám a szomszéd?',
    pairs: [
      { id: 'n50m9', left: '', right: '33', promptFigure: <NumberLineCard from={30} to={40} arrowAt={33} /> },
      { id: 'n50m10', left: '', right: '47', promptFigure: <NumberLineCard from={40} to={50} arrowAt={47} /> },
      { id: 'n50m11', left: '24 < □ < 26', right: '25' },
      { id: 'n50m12', left: '30 < 38 < □ (tízes szomszéd)', right: '40' },
      { id: 'n50m13', left: '', right: '21', promptFigure: <NumberLineCard from={20} to={30} arrowAt={21} /> },
      { id: 'n50m14', left: 'Ez jön a 49 után.', right: '50' },
      { id: 'n50m15', left: 'Ez áll a 32 előtt.', right: '31' },
      { id: 'n50m16', left: '', right: '44', promptFigure: <NumberLineCard from={40} to={50} arrowAt={44} /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Sorozatok és rejtvények',
    description: 'Folytasd a sort, vagy fejtsd meg, melyik szám van a képen!',
    pairs: [
      { id: 'n50m17', left: '', right: '36', promptFigure: <SequenceCard items={['30', '32', '34']} /> },
      { id: 'n50m18', left: '', right: '30', promptFigure: <SequenceCard items={['45', '40', '35']} /> },
      { id: 'n50m19', left: 'A legnagyobb szám az 1 és 3 kártyából', right: '31' },
      { id: 'n50m20', left: 'Tízesem 4, egyesem 2', right: '42' },
      { id: 'n50m21', left: '', right: '45', promptFigure: <CoinsCard coins={[20, 20, 5]} /> },
      { id: 'n50m22', left: '', right: '29', promptFigure: <EggsCard trays={2} eggs={9} /> },
      { id: 'n50m23', left: '', right: '43', promptFigure: <SequenceCard items={['49', '47', '45']} /> },
      { id: 'n50m24', left: '', right: '34', promptFigure: <BlocksCard tens={2} ones={14} /> }
    ]
  }
];

export const NUMBERS50_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBERS50_G2_MATCHER_LEVELS_LIST[0],
  2: NUMBERS50_G2_MATCHER_LEVELS_LIST[1],
  3: NUMBERS50_G2_MATCHER_LEVELS_LIST[2]
};

export const Numbers50G2Matcher: React.FC<Numbers50G2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-c50-szamok-matcher',
  topicTitle = '1. Számok 50-ig – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId={topicId}
      subtopicId="szamok-50-ig"
      title={topicTitle}
      subtitle="Párosítsd a képeket, a szavakat és a számokat!"
      levels={NUMBERS50_G2_MATCHER_LEVELS}
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

export default Numbers50G2Matcher;
