import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MulCard, LineCard, PriceMini, RelCard } from './WrittenMulExamG3CardFigures';

interface WrittenMulExamG3MatcherProps {
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
    title: '1. szint: Írásbeli szorzás',
    description: 'Szorozz írásban! Kezdd az egyesekkel!',
    pairs: [
      { id: 'wmm1', left: '', promptFigure: <MulCard a={232} d={3} />, right: '696' },
      { id: 'wmm2', left: '', promptFigure: <MulCard a={214} d={3} />, right: '642' },
      { id: 'wmm3', left: '', promptFigure: <MulCard a={157} d={2} />, right: '314' },
      { id: 'wmm4', left: '', promptFigure: <MulCard a={243} d={3} />, right: '729' },
      { id: 'wmm5', left: '', promptFigure: <MulCard a={118} d={5} />, right: '590' },
      { id: 'wmm6', left: '123 · 2', right: '246' },
      { id: 'wmm7', left: '201 · 4', right: '804' },
      { id: 'wmm8', left: '216 · 4', right: '864' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Becsülj!',
    description: 'Kerekíts tízesre, és szorozz! Párosítsd a becsléssel!',
    pairs: [
      { id: 'wmm9', left: '335 · 2', promptFigure: <LineCard n={335} />, right: '≈ 680' },
      { id: 'wmm10', left: '214 · 3', promptFigure: <LineCard n={214} />, right: '≈ 630' },
      { id: 'wmm11', left: '187 · 4', promptFigure: <LineCard n={187} />, right: '≈ 760' },
      { id: 'wmm12', left: '296 · 3', promptFigure: <LineCard n={296} />, right: '≈ 900' },
      { id: 'wmm13', left: '124 · 5', right: '≈ 600' },
      { id: 'wmm14', left: '412 · 2', right: '≈ 820' },
      { id: 'wmm15', left: '158 · 3', right: '≈ 480' },
      { id: 'wmm16', left: '229 · 4', right: '≈ 920' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Vegyes feladatok',
    description: 'Következtess, és figyelj a sorrendre!',
    pairs: [
      { id: 'wmm17', left: '', promptFigure: <PriceMini n1={2} p1={150} n2={4} />, right: '300 Ft' },
      { id: 'wmm18', left: '', promptFigure: <PriceMini n1={3} p1={210} n2={9} />, right: '630 Ft' },
      { id: 'wmm19', left: '', promptFigure: <RelCard top="4 · 30 = 120" bottom="8 · 30 =" op="· 2" />, right: '240' },
      { id: 'wmm20', left: '', promptFigure: <RelCard top="6 · 7 = 42" bottom="6 · 70 =" op="· 10" />, right: '420' },
      { id: 'wmm21', left: '348 + 126 · 2', right: '600' },
      { id: 'wmm22', left: '2 · (180 + 95)', right: '550' },
      { id: 'wmm23', left: '1000 − 3 · 215', right: '355' },
      { id: 'wmm24', left: '(125 + 205) · 3', right: '990' }
    ]
  }
];

export const WRITTEN_MUL_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const WrittenMulExamG3Matcher: React.FC<WrittenMulExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-wmul-tudasproba-matcher',
  topicTitle = '6. Megálló – tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Gyakorold a fejezet feladatait!"
      levels={WRITTEN_MUL_EXAM_G3_MATCHER_LEVELS}
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

export default WrittenMulExamG3Matcher;
