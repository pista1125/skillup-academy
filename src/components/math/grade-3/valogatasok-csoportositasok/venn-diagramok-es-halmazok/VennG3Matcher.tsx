import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { B } from './VennG3Parts';
import { MiniVenn, VBlockCard } from './VennG3CardFigures';

interface VennG3MatcherProps {
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

const VENN_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik rész?',
    description: 'Mi kerül a színes részbe? Keresd meg a párját!',
    pairs: [
      { id: 'vnm1', left: '', promptFigure: <MiniVenn id="vnm1" a="piros" b="lyukas" shade="a" />, right: '', valueFigure: <VBlockCard b={B('piros', 'negyzet', true, false)} /> },
      { id: 'vnm2', left: '', promptFigure: <MiniVenn id="vnm2" a="piros" b="lyukas" shade="ab" />, right: '', valueFigure: <VBlockCard b={B('piros', 'kor', true, true)} /> },
      { id: 'vnm3', left: '', promptFigure: <MiniVenn id="vnm3" a="piros" b="lyukas" shade="b" />, right: '', valueFigure: <VBlockCard b={B('kek', 'haromszog', true, true)} /> },
      { id: 'vnm4', left: '', promptFigure: <MiniVenn id="vnm4" a="piros" b="lyukas" shade="out" />, right: '', valueFigure: <VBlockCard b={B('sarga', 'kor', true, false)} /> },
      { id: 'vnm5', left: '', promptFigure: <MiniVenn id="vnm5" a="páros" b="háromjegyű" shade="a" />, right: '48' },
      { id: 'vnm6', left: '', promptFigure: <MiniVenn id="vnm6" a="páros" b="háromjegyű" shade="ab" />, right: '236' },
      { id: 'vnm7', left: '', promptFigure: <MiniVenn id="vnm7" a="páros" b="háromjegyű" shade="b" />, right: '175' },
      { id: 'vnm8', left: '', promptFigure: <MiniVenn id="vnm8" a="páros" b="háromjegyű" shade="out" />, right: '9' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hová kerül?',
    description: 'Hol a csillag? Oda kerül a szám vagy a lap.',
    pairs: [
      { id: 'vnm9', left: '64', right: '', valueFigure: <MiniVenn id="vnm9" a="páros" b="kétjegyű" mark="ab" /> },
      { id: 'vnm10', left: '240', right: '', valueFigure: <MiniVenn id="vnm10" a="páros" b="kétjegyű" mark="a" /> },
      { id: 'vnm11', left: '57', right: '', valueFigure: <MiniVenn id="vnm11" a="páros" b="kétjegyű" mark="b" /> },
      { id: 'vnm12', left: '305', right: '', valueFigure: <MiniVenn id="vnm12" a="páros" b="kétjegyű" mark="out" /> },
      { id: 'vnm13', left: '', promptFigure: <VBlockCard b={B('kek', 'kor', true, false)} />, right: '', valueFigure: <MiniVenn id="vnm13" a="kék" b="nagy" mark="ab" /> },
      { id: 'vnm14', left: '', promptFigure: <VBlockCard b={B('kek', 'negyzet', false, true)} />, right: '', valueFigure: <MiniVenn id="vnm14" a="kék" b="nagy" mark="a" /> },
      { id: 'vnm15', left: '', promptFigure: <VBlockCard b={B('zold', 'haromszog', true, false)} />, right: '', valueFigure: <MiniVenn id="vnm15" a="kék" b="nagy" mark="b" /> },
      { id: 'vnm16', left: '', promptFigure: <VBlockCard b={B('sarga', 'kor', false, true)} />, right: '', valueFigure: <MiniVenn id="vnm16" a="kék" b="nagy" mark="out" /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Olvasd le!',
    description: 'A számok mutatják, hány lap vagy szám van az egyes részekben.',
    pairs: [
      { id: 'vnm17', left: 'Hány piros?', promptFigure: <MiniVenn id="vnm17" a="piros" b="lyukas" counts={{ a: 3, ab: 2, b: 4, out: 1 }} />, right: '5' },
      { id: 'vnm18', left: 'Hány lyukas?', promptFigure: <MiniVenn id="vnm18" a="piros" b="lyukas" counts={{ a: 3, ab: 2, b: 4, out: 1 }} />, right: '6' },
      { id: 'vnm19', left: 'Hány csak piros?', promptFigure: <MiniVenn id="vnm19" a="piros" b="lyukas" counts={{ a: 3, ab: 2, b: 4, out: 1 }} />, right: '3' },
      { id: 'vnm20', left: 'Hány van a két karikában összesen?', promptFigure: <MiniVenn id="vnm20" a="piros" b="lyukas" counts={{ a: 3, ab: 2, b: 4, out: 1 }} />, right: '9' },
      { id: 'vnm21', left: 'Hány páros?', promptFigure: <MiniVenn id="vnm21" a="páros" b="kétjegyű" counts={{ a: 5, ab: 2, b: 8, out: 4 }} />, right: '7' },
      { id: 'vnm22', left: 'Hány kétjegyű?', promptFigure: <MiniVenn id="vnm22" a="páros" b="kétjegyű" counts={{ a: 5, ab: 2, b: 8, out: 4 }} />, right: '10' },
      { id: 'vnm23', left: 'Hány van a közös részben?', promptFigure: <MiniVenn id="vnm23" a="páros" b="kétjegyű" counts={{ a: 5, ab: 2, b: 8, out: 4 }} />, right: '2' },
      { id: 'vnm24', left: 'Hány nincs egyik karikában sem?', promptFigure: <MiniVenn id="vnm24" a="páros" b="kétjegyű" counts={{ a: 5, ab: 2, b: 8, out: 4 }} />, right: '4' }
    ]
  }
];

export const VENN_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: VENN_G3_MATCHER_LEVELS_LIST[0],
  2: VENN_G3_MATCHER_LEVELS_LIST[1],
  3: VENN_G3_MATCHER_LEVELS_LIST[2]
};

export const VennG3Matcher: React.FC<VennG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-grp-venn-matcher',
  topicTitle = '2. Venn-diagramok és halmazok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="venn-diagramok-es-halmazok"
      title={topicTitle}
      subtitle="Párosítsd a halmazábra részeit a számokkal és a lapokkal!"
      levels={VENN_G3_MATCHER_LEVELS}
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

export default VennG3Matcher;
