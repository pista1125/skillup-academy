import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatChartsSorterProps {
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

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Melyik diagram illik az adatokhoz?',
    description: 'Válaszd ki a legszemléletesebb diagramtípust!',
    categories: [
      { id: 'bar', name: 'Oszlopdiagram', color: 'blue' },
      { id: 'pie', name: 'Kördiagram', color: 'amber' },
      { id: 'line', name: 'Vonaldiagram', color: 'violet' }
    ],
    items: [
      { id: 'scs1', text: 'a dobott összegek gyakorisága 20 dobásból', categoryId: 'bar' },
      { id: 'scs2', text: 'a jegyek gyakorisága egy dolgozatnál', categoryId: 'bar' },
      { id: 'scs3', text: 'az országok csapatainak góljai', categoryId: 'bar' },
      { id: 'scs4', text: 'a zenekar összetétele (az egész részei)', categoryId: 'pie' },
      { id: 'scs5', text: 'a szavazatok megoszlása a pártok között', categoryId: 'pie' },
      { id: 'scs6', text: 'a napi internetezési idő megoszlása az osztályban', categoryId: 'pie' },
      { id: 'scs7', text: 'egy hét napi középhőmérséklete', categoryId: 'line' },
      { id: 'scs8', text: 'egy részvény árfolyama egy éven át', categoryId: 'line' },
      { id: 'scs9', text: 'Magyarország népessége 1950 és 2020 között', categoryId: 'line' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mi derül ki a sávdiagramról? (320 tanuló jegyei)',
    description: 'A sávdiagram a jegyek halmozott százalékait mutatja. Mit olvashatunk le közvetlenül, mit kell kiszámolni, és mi nem határozható meg?',
    categories: [
      { id: 'read', name: 'Közvetlenül leolvasható', color: 'emerald' },
      { id: 'calc', name: 'Számolással meghatározható', color: 'blue' },
      { id: 'none', name: 'Nem határozható meg', color: 'slate' }
    ],
    items: [
      { id: 'scs10', text: 'a jegyek módusza (a legszélesebb sáv)', categoryId: 'read' },
      { id: 'scs11', text: 'a jegyek mediánja (az 50%-os pont sávja)', categoryId: 'read' },
      { id: 'scs12', text: 'melyik jegy volt a legritkább', categoryId: 'read' },
      { id: 'scs13', text: 'a jegyek átlaga', categoryId: 'calc' },
      { id: 'scs14', text: 'a 4-esek száma', categoryId: 'calc' },
      { id: 'scs15', text: 'a 3-asok középponti szöge kördiagramon', categoryId: 'calc' },
      { id: 'scs16', text: 'melyik tanuló kapott 5-öst', categoryId: 'none' },
      { id: 'scs17', text: 'a fiúk jegyeinek átlaga', categoryId: 'none' },
      { id: 'scs18', text: 'a félévi jegyek módusza', categoryId: 'none' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Igaz vagy hamis? (színházba járás)',
    description: '120 fiatalabb (52,5% / 35% / 12,5%) és 80 idősebb (18,75% / 37,5% / 43,75%) válaszadó. Igaz, hamis, vagy nem dönthető el a diagramból?',
    categories: [
      { id: 't', name: 'Igaz', color: 'emerald' },
      { id: 'f', name: 'Hamis', color: 'rose' },
      { id: 'u', name: 'Nem dönthető el', color: 'slate' }
    ],
    items: [
      { id: 'scs19', text: '15 legalább 40 éves jár 5-nél kevesebbszer', categoryId: 't' },
      { id: 'scs20', text: 'a megkérdezettek 36%-a jár 5–10 alkalommal', categoryId: 't' },
      { id: 'scs21', text: 'a 40 év alattiak több mint fele 5-nél kevesebbszer jár', categoryId: 't' },
      { id: 'scs22', text: 'a 10-nél többször járók aránya 28,125%', categoryId: 'f' },
      { id: 'scs23', text: 'több 40 év alatti jár 10-nél többször, mint legalább 40 éves', categoryId: 'f' },
      { id: 'scs24', text: 'az 5–10 alkalommal járók száma a két csoportban egyenlő', categoryId: 'f' },
      { id: 'scs25', text: 'a legalább 40 évesek között a nők aránya', categoryId: 'u' },
      { id: 'scs26', text: 'hányan jártak pontosan 7-szer színházba', categoryId: 'u' },
      { id: 'scs27', text: 'a 40 év alattiak átlagéletkora', categoryId: 'u' }
    ]
  }
};

export const StatChartsSorter: React.FC<StatChartsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-diagramok-sorter',
  topicTitle = '2. Diagramok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="diagramok"
      title={topicTitle}
      subtitle="Válaszd ki a megfelelő diagramtípust, és döntsd el, mi olvasható le egy diagramról!"
      levels={SORTER_LEVELS}
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

export default StatChartsSorter;
