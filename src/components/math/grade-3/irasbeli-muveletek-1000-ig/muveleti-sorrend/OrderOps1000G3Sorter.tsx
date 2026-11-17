import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SmallChain, SmallWallet, SmallBag } from './OrderOps1000G3CardFigures';

interface Props {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

export const ORDER_OPS_1000_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Mi az első lépés?',
    description: 'Melyik műveletet végzed el először?',
    categories: [
      { id: 'br', name: 'Először: a zárójel', color: 'orange' },
      { id: 'md', name: 'Először: · vagy :', color: 'purple' },
      { id: 'lr', name: 'Balról az első (csak + és −)', color: 'sky' }
    ],
    items: [
      { id: 'oo1000s1', text: '1000 − (500 + 300)', categoryId: 'br', figure: <SmallWallet money="1000" tags={['500', '300']} /> },
      { id: 'oo1000s2', text: '800 − (250 + 150)', categoryId: 'br', figure: <SmallWallet money="800" tags={['250', '150']} /> },
      { id: 'oo1000s3', text: '(640 − 240) : 4', categoryId: 'br' },
      { id: 'oo1000s4', text: '520 + 40 · 6', categoryId: 'md' },
      { id: 'oo1000s5', text: '900 − 360 : 4', categoryId: 'md' },
      { id: 'oo1000s6', text: '3 · 200 + 150', categoryId: 'md' },
      { id: 'oo1000s7', text: '645 − 280 + 136', categoryId: 'lr', figure: <SmallChain start="645" ops={['− 280', '+ 136']} /> },
      { id: 'oo1000s8', text: '700 + 200 − 500', categoryId: 'lr', figure: <SmallChain start="700" ops={['+ 200', '− 500']} /> },
      { id: 'oo1000s9', text: '950 − 450 − 300', categoryId: 'lr', figure: <SmallChain start="950" ops={['− 450', '− 300']} /> }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Számolj jó sorrendben, és tedd a helyére!',
    categories: [
      { id: 'r300', name: 'Eredménye 300', color: 'emerald' },
      { id: 'r500', name: 'Eredménye 500', color: 'amber' },
      { id: 'r700', name: 'Eredménye 700', color: 'rose' }
    ],
    items: [
      { id: 'oo1000s10', text: '450 + 150 − 300', categoryId: 'r300', figure: <SmallChain start="450" ops={['+ 150', '− 300']} /> },
      { id: 'oo1000s11', text: '1000 − (400 + 300)', categoryId: 'r300', figure: <SmallWallet money="1000" tags={['400', '300']} /> },
      { id: 'oo1000s12', text: '900 − 6 · 100', categoryId: 'r300' },
      { id: 'oo1000s13', text: '380 + 270 − 150', categoryId: 'r500', figure: <SmallChain start="380" ops={['+ 270', '− 150']} /> },
      { id: 'oo1000s14', text: '1000 − (260 + 240)', categoryId: 'r500', figure: <SmallWallet money="1000" tags={['260', '240']} /> },
      { id: 'oo1000s15', text: '100 + 8 · 50', categoryId: 'r500' },
      { id: 'oo1000s16', text: '925 − 325 + 100', categoryId: 'r700', figure: <SmallChain start="925" ops={['− 325', '+ 100']} /> },
      { id: 'oo1000s17', text: '1000 − (180 + 120)', categoryId: 'r700', figure: <SmallWallet money="1000" tags={['180', '120']} /> },
      { id: 'oo1000s18', text: '900 − 400 : 2', categoryId: 'r700' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mit tesz a zárójel?',
    description: 'Számold ki zárójellel és zárójel nélkül is! Mi történik?',
    categories: [
      { id: 'same', name: 'Zárójel nélkül is ugyanannyi', color: 'sky' },
      { id: 'more', name: 'Zárójel nélkül több lenne', color: 'emerald' },
      { id: 'less', name: 'Zárójel nélkül kevesebb lenne', color: 'rose' }
    ],
    items: [
      { id: 'oo1000s19', text: '400 + (200 + 100)', categoryId: 'same' },
      { id: 'oo1000s20', text: '500 + (2 · 90)', categoryId: 'same' },
      { id: 'oo1000s21', text: '(700 − 200) − 100', categoryId: 'same' },
      { id: 'oo1000s22', text: '600 − (200 + 100)', categoryId: 'more', figure: <SmallWallet money="600" tags={['200', '100']} /> },
      { id: 'oo1000s23', text: '1000 − (450 + 250)', categoryId: 'more', figure: <SmallWallet money="1000" tags={['450', '250']} /> },
      { id: 'oo1000s24', text: '900 − (300 + 400)', categoryId: 'more', figure: <SmallWallet money="900" tags={['300', '400']} /> },
      { id: 'oo1000s25', text: '600 − (300 − 100)', categoryId: 'less' },
      { id: 'oo1000s26', text: '4 · (50 + 30)', categoryId: 'less', figure: <SmallBag k="4×" top="50" bottom="+30" /> },
      { id: 'oo1000s27', text: '(200 + 100) · 3', categoryId: 'less', figure: <SmallBag k="×3" top="200" bottom="+100" after /> }
    ]
  }
};

export const OrderOps1000G3Sorter: React.FC<Props> = ({
  level = 1,
  currentLevel,
  topicId = 'g3-wops-sorrend-sorter',
  topicTitle = '3. A műveletek sorrendje és a zárójelek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-muveletek-1000-ig"
      topicId={topicId}
      subtopicId="muveleti-sorrend"
      title={topicTitle}
      subtitle="Válogasd szét a műveletsorokat!"
      levels={ORDER_OPS_1000_G3_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      {...rest}
    />
  );
};

export default OrderOps1000G3Sorter;
