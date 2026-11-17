import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { OpsSmall, GroupsSmall } from './OrderOpsMulG3CardFigures';

interface OrderOpsMulG3SorterProps {
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

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mit számolsz először?',
    description: 'Nézd meg a műveleti jeleket! Melyik lépés az első?',
    categories: [
      { id: 'zar', name: 'A zárójelben lévőt', color: 'purple' },
      { id: 'szor', name: 'A szorzást', color: 'orange' },
      { id: 'bal', name: 'Balról az elsőt', color: 'sky' }
    ],
    items: [
      { id: 'oos1', text: '3 · (250 − 120)', categoryId: 'zar', figure: <OpsSmall pattern="• · ( • − • )" /> },
      { id: 'oos2', text: '(125 + 205) · 3', categoryId: 'zar', figure: <OpsSmall pattern="( • + • ) · •" /> },
      { id: 'oos3', text: '900 − (160 + 240)', categoryId: 'zar' },
      { id: 'oos4', text: '250 + 120 · 4', categoryId: 'szor', figure: <OpsSmall pattern="• + • · •" /> },
      { id: 'oos5', text: '750 − 124 · 3', categoryId: 'szor', figure: <OpsSmall pattern="• − • · •" /> },
      { id: 'oos6', text: '4 · 125 + 95', categoryId: 'szor' },
      { id: 'oos7', text: '500 − 120 + 80', categoryId: 'bal', figure: <OpsSmall pattern="• − • + •" /> },
      { id: 'oos8', text: '340 + 260 − 150', categoryId: 'bal', figure: <OpsSmall pattern="• + • − •" /> },
      { id: 'oos9', text: '980 − 400 − 75', categoryId: 'bal' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'r600', name: 'Az eredmény 600', color: 'emerald' },
      { id: 'r720', name: 'Az eredmény 720', color: 'amber' },
      { id: 'r840', name: 'Az eredmény 840', color: 'rose' }
    ],
    items: [
      { id: 'oos10', text: '2 · 250 + 100', categoryId: 'r600', figure: <GroupsSmall n={2} v={250} e={100} mode="plus" /> },
      { id: 'oos11', text: '3 · (150 + 50)', categoryId: 'r600', figure: <GroupsSmall n={3} v={150} e={50} mode="pack" /> },
      { id: 'oos12', text: '1000 − 2 · 200', categoryId: 'r600' },
      { id: 'oos13', text: '4 · 150 + 120', categoryId: 'r720', figure: <GroupsSmall n={4} v={150} e={120} mode="plus" /> },
      { id: 'oos14', text: '(300 + 60) · 2', categoryId: 'r720', figure: <GroupsSmall n={2} v={300} e={60} mode="pack" /> },
      { id: 'oos15', text: '1000 − 2 · 140', categoryId: 'r720' },
      { id: 'oos16', text: '4 · 200 + 40', categoryId: 'r840' },
      { id: 'oos17', text: '(250 + 170) · 2', categoryId: 'r840', figure: <GroupsSmall n={2} v={250} e={170} mode="pack" /> },
      { id: 'oos18', text: '3 · 300 − 60', categoryId: 'r840', figure: <GroupsSmall n={3} v={300} e={60} mode="minus" /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik terv illik?',
    description: 'Olvasd el, és nézd meg a képet! Melyik tervvel számolsz?',
    categories: [
      { id: 'plus', name: '□ · □ + □', color: 'emerald' },
      { id: 'pack', name: '(□ + □) · □', color: 'purple' },
      { id: 'minus', name: '□ · □ − □', color: 'rose' }
    ],
    items: [
      { id: 'oos19', text: '3 doboz, mindben 140 szög, és még 60 szög', categoryId: 'plus', figure: <GroupsSmall n={3} v={140} e={60} mode="plus" /> },
      { id: 'oos20', text: '4 zsák, mindben 125 kg, és még 80 kg', categoryId: 'plus', figure: <GroupsSmall n={4} v={125} e={80} mode="plus" /> },
      { id: 'oos21', text: '2 busz, mindben 115 utas, és 45-en gyalog jönnek', categoryId: 'plus' },
      { id: 'oos22', text: '2 kosár, mindben 150 alma és 90 körte', categoryId: 'pack', figure: <GroupsSmall n={2} v={150} e={90} mode="pack" /> },
      { id: 'oos23', text: '3 nap, naponta délelőtt 120, délután 85 jegy', categoryId: 'pack', figure: <GroupsSmall n={3} v={120} e={85} mode="pack" /> },
      { id: 'oos24', text: '4 polc, mindegyiken fent 110, lent 95 könyv', categoryId: 'pack' },
      { id: 'oos25', text: '3 csomag, mindben 210 lap; 90 lap elfogyott', categoryId: 'minus', figure: <GroupsSmall n={3} v={210} e={90} mode="minus" /> },
      { id: 'oos26', text: '2 doboz, mindben 325 gyöngy; 140 elgurult', categoryId: 'minus', figure: <GroupsSmall n={2} v={325} e={140} mode="minus" /> },
      { id: 'oos27', text: '5 zacskó, mindben 160 g dió; 75 g-ot megettünk', categoryId: 'minus' }
    ]
  }
];

export const ORDER_OPS_MUL_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const OrderOpsMulG3Sorter: React.FC<OrderOpsMulG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wmul-sorrend-sorter',
  topicTitle = '5. A műveletek sorrendje – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="a-muveletek-sorrendje"
      title={topicTitle}
      subtitle="Válogasd szét a műveletsorokat!"
      levels={ORDER_OPS_MUL_G3_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default OrderOpsMulG3Sorter;
