import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BlocksCard, NumberLineCard, ChocoCard, FirstStepCard } from './Count100ExamG3CardFigures';

interface Count100ExamG3MatcherProps {
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

const COUNT100_EXAM_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Számok és számszomszédok",
    description: "Párosítsd a leírást a számmal!",
    pairs: [
      { id: 'g3c100exm1', left: "", promptFigure: <BlocksCard t={4} e={9} />, right: "49" },
      { id: 'g3c100exm2', left: "hatvanhárom", right: "63" },
      { id: 'g3c100exm3', left: "a 70 kisebb egyes szomszédja", promptFigure: <NumberLineCard from={64} to={75} mark={70} ask={69} />, right: "69" },
      { id: 'g3c100exm4', left: "a 85 nagyobb tízes szomszédja", promptFigure: <NumberLineCard from={79} to={91} mark={85} ask={90} />, right: "90" },
      { id: 'g3c100exm5', left: "", promptFigure: <BlocksCard t={2} e={15} />, right: "35" },
      { id: 'g3c100exm6', left: "a legnagyobb kétjegyű szám", right: "99" },
      { id: 'g3c100exm7', left: "a legkisebb kétjegyű páratlan szám", right: "11" },
      { id: 'g3c100exm8', left: "a 44 kisebb tízes szomszédja", promptFigure: <NumberLineCard from={39} to={51} mark={44} ask={40} />, right: "40" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Szorzótábla és osztás",
    description: "Számold ki, és párosítsd az eredménnyel!",
    pairs: [
      { id: 'g3c100exm9', left: "6 · 7", promptFigure: <ChocoCard rows={6} cols={7} />, right: "42" },
      { id: 'g3c100exm10', left: "8 · 8", promptFigure: <ChocoCard rows={8} cols={8} />, right: "64" },
      { id: 'g3c100exm11', left: "9 · 3", promptFigure: <ChocoCard rows={3} cols={9} />, right: "27" },
      { id: 'g3c100exm12', left: "72 : 8", right: "9" },
      { id: 'g3c100exm13', left: "56 : 7", right: "8" },
      { id: 'g3c100exm14', left: "10 · 10", right: "100" },
      { id: 'g3c100exm15', left: "45 : 9", right: "5" },
      { id: 'g3c100exm16', left: "4 · 4", promptFigure: <ChocoCard rows={4} cols={4} />, right: "16" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Műveleti sorrend és zárójel",
    description: "Előbb a zárójel, aztán a szorzás és az osztás!",
    pairs: [
      { id: 'g3c100exm17', left: "", promptFigure: <FirstStepCard tokens={['5', '+', '3', '·', '4']} from={2} to={4} />, right: "17" },
      { id: 'g3c100exm18', left: "", promptFigure: <FirstStepCard tokens={['(', '5', '+', '3', ')', '·', '4']} from={0} to={4} />, right: "32" },
      { id: 'g3c100exm19', left: "", promptFigure: <FirstStepCard tokens={['40', '−', '20', ':', '5']} from={2} to={4} />, right: "36" },
      { id: 'g3c100exm20', left: "", promptFigure: <FirstStepCard tokens={['(', '40', '−', '20', ')', ':', '5']} from={0} to={4} />, right: "4" },
      { id: 'g3c100exm21', left: "7 · 9 − 29", right: "34" },
      { id: 'g3c100exm22', left: "2 · (36 − 27)", right: "18" },
      { id: 'g3c100exm23', left: "64 − 72 : 9", right: "56" },
      { id: 'g3c100exm24', left: "9 · (13 − 8)", right: "45" }
    ]
  }
];

export const COUNT100_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COUNT100_EXAM_G3_MATCHER_LEVELS_LIST[0],
  2: COUNT100_EXAM_G3_MATCHER_LEVELS_LIST[1],
  3: COUNT100_EXAM_G3_MATCHER_LEVELS_LIST[2]
};

export const Count100ExamG3Matcher: React.FC<Count100ExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c100-tudasproba-matcher',
  topicTitle = "8. Megálló – tudáspróba – Párosító játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Az egész I. fejezet: párosítsd a feladatot a megoldásával!"
      levels={COUNT100_EXAM_G3_MATCHER_LEVELS}
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

export default Count100ExamG3Matcher;
