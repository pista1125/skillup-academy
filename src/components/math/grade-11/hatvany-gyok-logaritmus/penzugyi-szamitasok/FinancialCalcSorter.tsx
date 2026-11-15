import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FinancialCalcSorterProps {
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

const items = (prefix: string, start: number, list: [string, string][]) =>
  list.map(([text, categoryId], i) => ({ id: `${prefix}${start + i}`, text, categoryId }));

const FINANCIAL_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Nő, csökken vagy nem változik?',
    description: 'Válogasd szét a változásokat az összesített szorzó szerint!',
    categories: [
      { id: 'up', name: 'Nő (szorzó > 1)', color: 'emerald' },
      { id: 'down', name: 'Csökken (szorzó < 1)', color: 'rose' },
      { id: 'same', name: 'Nem változik (szorzó = 1)', color: 'sky' }
    ],
    items: items('fins', 1, [
      ['évi 6%-os kamatos kamat 10 évig', 'up'],
      ['ötször egymás után 106%-ra emelt ár', 'up'],
      ['heti 5%-os áremelés 20 hétig', 'up'],
      ['évi 20%-os értékcsökkenés 3 évig', 'down'],
      ['+5%, majd −5%', 'down'],
      ['+10%, majd −10%', 'down'],
      ['+25%, majd −20%', 'same'],
      ['+100%, majd −50%', 'same'],
      ['0%-os kamat 10 évig', 'same']
    ])
  },
  {
    level: 2,
    title: '2. szint: Melyik művelet adja a választ?',
    description: 'Mi az ismeretlen az Aₙ = A · (1 + p/100)ⁿ képletben, és hogyan számoljuk ki?',
    categories: [
      { id: 'pow', name: 'Hatványozás (Aₙ a kérdés)', color: 'violet' },
      { id: 'root', name: 'Gyökvonás (p a kérdés)', color: 'amber' },
      { id: 'trial', name: 'Próbálgatás (n a kérdés)', color: 'teal' }
    ],
    items: items('fins', 10, [
      ['Mennyi lesz 500 000 Ft 10 év múlva 6%-kal?', 'pow'],
      ['Mennyit ér a 3,5 M Ft-os autó 3 év múlva (−20%/év)?', 'pow'],
      ['Mennyi a nadrág ára 10 hét után (+5%/hét)?', 'pow'],
      ['Mekkora kamatláb mellett duplázódik 10 év alatt?', 'root'],
      ['Hány %-kal csökkent évente az autó értéke 5 év alatt?', 'root'],
      ['Mekkora évi gyarapodás kell az 5 év alatti duplázódáshoz?', 'root'],
      ['Hány év alatt duplázódik 6%-kal?', 'trial'],
      ['Hány év alatt háromszorozódik 18%-kal?', 'trial'],
      ['Hány hét után lesz tízszeres a nadrág ára?', 'trial']
    ])
  },
  {
    level: 3,
    title: '3. szint: Hányszorosára nő?',
    description: 'Becsüld meg (vagy számold ki) az összesített szorzót!',
    categories: [
      { id: 'lt2', name: 'Kevesebb mint kétszeres', color: 'sky' },
      { id: 'b23', name: '2- és 3-szoros között', color: 'violet' },
      { id: 'gt3', name: 'Több mint háromszoros', color: 'orange' }
    ],
    items: items('fins', 19, [
      ['1,06¹⁰', 'lt2'],
      ['1,06¹¹', 'lt2'],
      ['1,075⁹', 'lt2'],
      ['1,06¹²', 'b23'],
      ['1,18⁵', 'b23'],
      ['1,05²⁰', 'b23'],
      ['1,18⁷', 'gt3'],
      ['1,05²⁵', 'gt3'],
      ['1,1¹²', 'gt3']
    ])
  }
];

const FINANCIAL_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: FINANCIAL_SORTER_LEVELS_LIST[0],
  2: FINANCIAL_SORTER_LEVELS_LIST[1],
  3: FINANCIAL_SORTER_LEVELS_LIST[2]
};

export const FinancialCalcSorter: React.FC<FinancialCalcSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-exp-penzugyek-sorter',
  topicTitle = '6. Pénzügyi számítások – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="penzugyi-szamitasok"
      title={topicTitle}
      subtitle="Rendszerezd a pénzügyi változásokat: nő vagy csökken, mi az ismeretlen, és hányszorosára nő a tőke?"
      levels={FINANCIAL_SORTER_LEVELS}
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

export default FinancialCalcSorter;
