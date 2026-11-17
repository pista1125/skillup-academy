import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PieCard, BarCard, GridCard } from './EqualPartsG3CardFigures';
import { equalAngles, equalCuts } from './EqualPartsG3Parts';

interface EqualPartsG3MatcherProps {
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

const ONE = [true];

const EQUAL_PARTS_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány egyenlő rész?',
    description: 'Számold meg a részeket!',
    pairs: [
      { id: 'eqpm1', left: 'Hány?', promptFigure: <PieCard bounds={equalAngles(2)} cake />, right: '2 rész' },
      { id: 'eqpm2', left: 'Hány?', promptFigure: <PieCard bounds={equalAngles(3)} />, right: '3 rész' },
      { id: 'eqpm3', left: 'Hány?', promptFigure: <BarCard cuts={equalCuts(4)} />, right: '4 rész' },
      { id: 'eqpm4', left: 'Hány?', promptFigure: <BarCard cuts={equalCuts(5)} />, right: '5 rész' },
      { id: 'eqpm5', left: 'Hány?', promptFigure: <PieCard bounds={equalAngles(6)} cake />, right: '6 rész' },
      { id: 'eqpm6', left: 'Hány?', promptFigure: <GridCard rows={2} cols={4} />, right: '8 rész' },
      { id: 'eqpm7', left: 'Hány?', promptFigure: <GridCard rows={2} cols={5} />, right: '10 rész' },
      { id: 'eqpm8', left: 'Hány?', promptFigure: <GridCard rows={3} cols={4} />, right: '12 rész' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mi a neve egy résznek?',
    description: 'Hány egyenlő részre osztottuk? Mi a piros rész neve?',
    pairs: [
      { id: 'eqpm9', left: '', promptFigure: <PieCard bounds={equalAngles(2)} colored={ONE} color="#ef4444" />, right: '1 ketted' },
      { id: 'eqpm10', left: '', promptFigure: <BarCard cuts={equalCuts(3)} colored={ONE} color="#ef4444" />, right: '1 harmad' },
      { id: 'eqpm11', left: '', promptFigure: <PieCard bounds={equalAngles(4)} colored={ONE} color="#ef4444" />, right: '1 negyed' },
      { id: 'eqpm12', left: '', promptFigure: <BarCard cuts={equalCuts(5)} colored={ONE} color="#ef4444" />, right: '1 ötöd' },
      { id: 'eqpm13', left: '6 egyenlő részből 1', right: '1 hatod' },
      { id: 'eqpm14', left: '8 egyenlő részből 1', right: '1 nyolcad' },
      { id: 'eqpm15', left: '10 egyenlő részből 1', right: '1 tized' },
      { id: 'eqpm16', left: 'nem vágtuk fel', promptFigure: <PieCard bounds={[0, 360]} colored={ONE} color="#ef4444" />, right: '1 egész' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hajtogatás és vágás',
    description: 'Mi lesz belőle? Keresd meg a képét!',
    pairs: [
      { id: 'eqpm17', left: 'A lapot 1-szer félbehajtod, kinyitod.', right: '', valueFigure: <GridCard rows={1} cols={2} dashed /> },
      { id: 'eqpm18', left: 'A lapot 2-szer félbehajtod, kinyitod.', right: '', valueFigure: <GridCard rows={2} cols={2} dashed /> },
      { id: 'eqpm19', left: 'A lapot 3-szor félbehajtod, kinyitod.', right: '', valueFigure: <GridCard rows={2} cols={4} dashed /> },
      { id: 'eqpm20', left: 'A csíkot 2 helyen vágod el.', right: '', valueFigure: <BarCard cuts={equalCuts(3)} /> },
      { id: 'eqpm21', left: 'A csíkot 5 helyen vágod el.', right: '', valueFigure: <BarCard cuts={equalCuts(6)} /> },
      { id: 'eqpm22', left: 'A tortát 1-szer vágod át középen.', right: '', valueFigure: <PieCard bounds={equalAngles(2)} cake /> },
      { id: 'eqpm23', left: 'A tortát 2-szer vágod át középen, keresztben.', right: '', valueFigure: <PieCard bounds={equalAngles(4)} cake /> },
      { id: 'eqpm24', left: 'A tortát 4-szer vágod át középen.', right: '', valueFigure: <PieCard bounds={equalAngles(8)} cake /> }
    ]
  }
];

export const EQUAL_PARTS_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: EQUAL_PARTS_G3_MATCHER_LEVELS_LIST[0],
  2: EQUAL_PARTS_G3_MATCHER_LEVELS_LIST[1],
  3: EQUAL_PARTS_G3_MATCHER_LEVELS_LIST[2]
};

export const EqualPartsG3Matcher: React.FC<EqualPartsG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-frac-reszek-matcher',
  topicTitle = '1. Egyenlő részekre osztás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId={topicId}
      subtopicId="bevezetes"
      title={topicTitle}
      subtitle="Párosítsd a felvágott egészeket a részek számával és nevével!"
      levels={EQUAL_PARTS_G3_MATCHER_LEVELS}
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

export default EqualPartsG3Matcher;
