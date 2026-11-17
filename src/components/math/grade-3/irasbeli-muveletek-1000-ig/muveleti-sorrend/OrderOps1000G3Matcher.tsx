import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ChainCard, StackCard } from './OrderOps1000G3CardFigures';

interface Props {
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

export const ORDER_OPS_1000_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Csak + és −',
    description: 'Balról jobbra számolj, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'oo1000m1', left: '', promptFigure: <ChainCard start="400" ops={['− 150', '+ 250']} />, right: '500' },
      { id: 'oo1000m2', left: '', promptFigure: <ChainCard start="700" ops={['+ 200', '− 500']} />, right: '400' },
      { id: 'oo1000m3', left: '', promptFigure: <ChainCard start="650" ops={['− 250', '− 300']} />, right: '100' },
      { id: 'oo1000m4', left: '', promptFigure: <ChainCard start="380" ops={['+ 120', '− 200']} />, right: '300' },
      { id: 'oo1000m5', left: '', promptFigure: <ChainCard start="645" ops={['− 280', '+ 136']} />, right: '501' },
      { id: 'oo1000m6', left: '900 − 450 + 150', right: '600' },
      { id: 'oo1000m7', left: '820 − 120 − 500', right: '200' },
      { id: 'oo1000m8', left: '275 + 325 + 100', right: '700' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Szorzás és osztás előbb',
    description: 'A kiemelt rész az első lépés. Számolj, és párosíts!',
    pairs: [
      { id: 'oo1000m9', left: '', promptFigure: <StackCard rows={['520 +', '40 · 6']} hl={1} />, right: '760' },
      { id: 'oo1000m10', left: '', promptFigure: <StackCard rows={['900 −', '7 · 80']} hl={1} />, right: '340' },
      { id: 'oo1000m11', left: '', promptFigure: <StackCard rows={['360 : 4', '+ 210']} hl={0} />, right: '300' },
      { id: 'oo1000m12', left: '', promptFigure: <StackCard rows={['1000 −', '480 : 8']} hl={1} />, right: '940' },
      { id: 'oo1000m13', left: '', promptFigure: <StackCard rows={['3 · 200', '+ 150']} hl={0} />, right: '750' },
      { id: 'oo1000m14', left: '80 · 5 − 120', right: '280' },
      { id: 'oo1000m15', left: '640 − 270 : 9', right: '610' },
      { id: 'oo1000m16', left: '6 · 90 + 6 · 10', right: '600' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Zárójel',
    description: 'A zárójel belsejét számold először!',
    pairs: [
      { id: 'oo1000m17', left: '', promptFigure: <StackCard rows={['(600 − 150)', ': 5']} hl={0} />, right: '90' },
      { id: 'oo1000m18', left: '', promptFigure: <StackCard rows={['1000 −', '(380 + 270)']} hl={1} />, right: '350' },
      { id: 'oo1000m19', left: '', promptFigure: <StackCard rows={['4 ·', '(130 + 70)']} hl={1} />, right: '800' },
      { id: 'oo1000m20', left: '', promptFigure: <StackCard rows={['850 −', '(460 − 210)']} hl={1} />, right: '600' },
      { id: 'oo1000m21', left: '', promptFigure: <StackCard rows={['(275 + 125)', ': 8']} hl={0} />, right: '50' },
      { id: 'oo1000m22', left: '700 − (5 · 60)', right: '400' },
      { id: 'oo1000m23', left: '(930 − 450) : 6', right: '80' },
      { id: 'oo1000m24', left: '2 · (365 − 245)', right: '240' }
    ]
  }
};

export const OrderOps1000G3Matcher: React.FC<Props> = ({
  level = 1,
  currentLevel,
  topicId = 'g3-wops-sorrend-matcher',
  topicTitle = '3. A műveletek sorrendje és a zárójelek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      topicId={topicId}
      subtopicId="muveleti-sorrend"
      title={topicTitle}
      subtitle="Párosítsd a műveletsort az eredményével!"
      levels={ORDER_OPS_1000_G3_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      {...rest}
    />
  );
};

export default OrderOps1000G3Matcher;
