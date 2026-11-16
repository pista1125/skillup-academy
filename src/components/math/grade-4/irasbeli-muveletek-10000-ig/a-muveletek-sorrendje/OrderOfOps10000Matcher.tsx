import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface OrderOfOps10000MatcherProps {
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

const ORDER10K_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Munkafüzeti műveletsorok',
    description: 'Számold ki a füzetedben, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'oo10m1', left: '4264 − 1316 · 3', right: '316' },
      { id: 'oo10m2', left: '(4264 − 1316) · 3', right: '8844' },
      { id: 'oo10m3', left: '9464 − 3518 + 1325', right: '7271' },
      { id: 'oo10m4', left: '5 · 1614 : 3', right: '2690' },
      { id: 'oo10m5', left: '1386 + 2634 : 6', right: '1825' },
      { id: 'oo10m6', left: '(1386 + 2634) : 6', right: '670' },
      { id: 'oo10m7', left: '8569 − 1456 · 3', right: '4201' },
      { id: 'oo10m8', left: '9468 : 4 + 5628', right: '7995' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Épületek és vasúti kocsik',
    description: 'Melyik épület vagy kocsi műveletsorához melyik szám tartozik?',
    pairs: [
      { id: 'oo10m9', left: 'Soproni tűztorony: 7343 − 6252 : 6', right: '6301' },
      { id: 'oo10m10', left: 'Tihanyi apátság: 8654 − 4 · 838', right: '5302' },
      { id: 'oo10m11', left: 'Esztergomi bazilika: (7344 − 6252) : 6', right: '182' },
      { id: 'oo10m12', left: 'Szegedi dóm: 2524 : 4 + 4364 : 4', right: '1722' },
      { id: 'oo10m13', left: 'Pécsi székesegyház: (2524 + 4360) : 4', right: '1721' },
      { id: 'oo10m14', left: 'Parlament: 7338 : 6 − 6252 : 6', right: '181' },
      { id: 'oo10m15', left: 'N kocsi: 2658 + 7161 : 3', right: '5045' },
      { id: 'oo10m16', left: 'T kocsi: (2658 + 7161) : 3', right: '3273' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szövegből műveletsor',
    description: 'Melyik műveletsor illik a szöveghez?',
    pairs: [
      { id: 'oo10m17', left: 'A 6540 és a 3120 összegének a harmada', right: '(6540 + 3120) : 3' },
      { id: 'oo10m18', left: 'A 8915 és a 4875 különbségének a fele', right: '(8915 − 4875) : 2' },
      { id: 'oo10m19', left: 'Az 5543 és a 4129 különbségének az ötszöröse', right: '(5543 − 4129) · 5' },
      { id: 'oo10m20', left: 'Az 1312 és a 2879 összegének a kétszerese', right: '(1312 + 2879) · 2' },
      { id: 'oo10m21', left: 'A 2550 fele és a 3450 fele együtt', right: '2550 : 2 + 3450 : 2' },
      { id: 'oo10m22', left: '3 könyv 450 Ft-ért és még egy 1450 Ft-os', right: '3 · 450 + 1450' },
      { id: 'oo10m23', left: '3 csomag, mindegyikben egy 450 és egy 1450 Ft-os', right: '3 · (450 + 1450)' },
      { id: 'oo10m24', left: 'Visszajáró 10 000-ből: bakancs 6450 Ft + 3 zokni 285 Ft-ért', right: '10 000 − (6450 + 3 · 285)' }
    ]
  }
];

const ORDER10K_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ORDER10K_MATCHER_LEVELS_LIST[0],
  2: ORDER10K_MATCHER_LEVELS_LIST[1],
  3: ORDER10K_MATCHER_LEVELS_LIST[2]
};

export const OrderOfOps10000Matcher: React.FC<OrderOfOps10000MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wops-sorrend-matcher',
  topicTitle = '7. A műveletek sorrendje – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="a-muveletek-sorrendje"
      title={topicTitle}
      subtitle="Párosítsd a 10 000-es műveletsorokat az eredményükkel és a szöveggel!"
      levels={ORDER10K_MATCHER_LEVELS}
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

export default OrderOfOps10000Matcher;
