import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FinanceInvestmentsSorterProps {
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

const FINANCE_INV_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Milyen modell?',
    description: 'Csoportosítsd a folyamatokat aszerint, hogyan változik az érték!',
    categories: [
      { id: 'lin', name: 'lineáris (számtani sorozat)', color: 'blue' },
      { id: 'grow', name: 'exponenciális növekedés (q > 1)', color: 'emerald' },
      { id: 'decay', name: 'exponenciális csökkenés (0 < q < 1)', color: 'rose' }
    ],
    items: [
      { id: 'fis1', text: 'egyszerű kamat: a kamatot évente kivesszük', categoryId: 'lin' },
      { id: 'fis2', text: 'az autó havonta 50 000 Ft-ot veszít az értékéből', categoryId: 'lin' },
      { id: 'fis3', text: 'a persely tartalma havonta 2000 Ft-tal nő', categoryId: 'lin' },
      { id: 'fis4', text: 'betét évi 5%-os kamatos kamattal', categoryId: 'grow' },
      { id: 'fis5', text: '24 dollár évi 6,5%-kal 338 évig', categoryId: 'grow' },
      { id: 'fis6', text: 'betét negyedéves jóváírással, évi 8%', categoryId: 'grow' },
      { id: 'fis7', text: 'az autó értéke havonta 1%-kal csökken', categoryId: 'decay' },
      { id: 'fis8', text: 'a gép értéke évente 15%-kal csökken', categoryId: 'decay' },
      { id: 'fis9', text: 'a pénz vásárlóértéke évi 4%-os inflációnál', categoryId: 'decay' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mit kell kiszámolni?',
    description: 'Döntsd el, mi az ismeretlen a feladatban!',
    categories: [
      { id: 'kn', name: 'a végösszeg', color: 'purple' },
      { id: 'p', name: 'a kamatláb', color: 'amber' },
      { id: 'n', name: 'az időtartam', color: 'teal' }
    ],
    items: [
      { id: 'fis10', text: 'Mennyi lesz Dalma számláján 2 év múlva?', categoryId: 'kn' },
      { id: 'fis11', text: 'Mennyi gyűlt össze Csilla 18. születésnapjára?', categoryId: 'kn' },
      { id: 'fis12', text: 'Mennyit ér az autó 2 év múlva?', categoryId: 'kn' },
      { id: 'fis13', text: '6 millióból 5 év alatt 7 millió lett: évi hány %?', categoryId: 'p' },
      { id: 'fis14', text: '3 millióból 12 év alatt 4,7 millió lett: évi hány %?', categoryId: 'p' },
      { id: 'fis15', text: 'Csongor 400 000 Ft-ja 2 millió lett: félévi hány %?', categoryId: 'p' },
      { id: 'fis16', text: 'Hány hónap alatt csökken a felére az autó értéke?', categoryId: 'n' },
      { id: 'fis17', text: 'Hány év alatt duplázódik a tőke 6%-on?', categoryId: 'n' },
      { id: 'fis18', text: 'Hány év után gyűlik össze 1,6 millió Ft?', categoryId: 'n' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 't', name: 'igaz', color: 'emerald' },
      { id: 'f', name: 'hamis', color: 'rose' },
      { id: 'd', name: 'a feltételektől függ', color: 'amber' }
    ],
    items: [
      { id: 'fis19', text: 'Évi 8%, negyedéves jóváírásnál a hozam több mint 8%.', categoryId: 't' },
      { id: 'fis20', text: 'Gyűjtőjáradéknál az első befizetés kamatozik a legtöbbször.', categoryId: 't' },
      { id: 'fis21', text: '10%-os kamatos kamattal 2 év alatt 21%-kal nő a tőke.', categoryId: 't' },
      { id: 'fis22', text: 'Havonta 1%-os csökkenés 2 év alatt pontosan 24% csökkenés.', categoryId: 'f' },
      { id: 'fis23', text: 'Évi 6%, havi jóváírásnál a havi tényező 1,06.', categoryId: 'f' },
      { id: 'fis24', text: 'Egyszerű kamatozásnál a kamat is kamatozik.', categoryId: 'f' },
      { id: 'fis25', text: 'A 9,8%-os éves jóváírás jobb a 9,6%-os havinál.', categoryId: 'd' },
      { id: 'fis26', text: 'A kamatos kamat 5 év alatt több, mint az egyszerű kamat.', categoryId: 'd' },
      { id: 'fis27', text: 'A gyűjtőszámla egyenlege 5 év után 2 millió Ft fölött van.', categoryId: 'd' }
    ]
  }
};

export const FinanceInvestmentsSorter: React.FC<FinanceInvestmentsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-seq-tokebefektetes-sorter',
  topicTitle = '8. Pénzügyi feladatok I. – tőkebefektetések – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="penzugyi-feladatok-1-tokebefektetesek"
      title={topicTitle}
      subtitle="Rendszerezd a pénzügyi folyamatokat modell, ismeretlen és állítások szerint!"
      levels={FINANCE_INV_SORTER_LEVELS}
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

export default FinanceInvestmentsSorter;
