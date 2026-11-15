import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DataStatisticsSorterProps {
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
    title: '1. szint: Melyik középértékre igaz?',
    description: 'Sorold be az állítást az átlaghoz, a mediánhoz vagy a móduszhoz!',
    categories: [
      { id: 'mean', name: 'Átlag', color: 'blue' },
      { id: 'median', name: 'Medián', color: 'violet' },
      { id: 'mode', name: 'Módusz', color: 'amber' }
    ],
    items: [
      { id: 'dss1', text: 'az adatok összege osztva az adatok számával', categoryId: 'mean' },
      { id: 'dss2', text: 'egyetlen kiugró adat is erősen eltolja', categoryId: 'mean' },
      { id: 'dss3', text: 'a tűzoltós példában 3', categoryId: 'mean' },
      { id: 'dss4', text: 'a nagyság szerint rendezett sor közepén áll', categoryId: 'median' },
      { id: 'dss5', text: 'páros számú adatnál a két középső átlaga', categoryId: 'median' },
      { id: 'dss6', text: 'a tűzoltós példában 2', categoryId: 'median' },
      { id: 'dss7', text: 'a leggyakrabban előforduló adat', categoryId: 'mode' },
      { id: 'dss8', text: 'több is lehet belőle egy adatsokaságban', categoryId: 'mode' },
      { id: 'dss9', text: 'a tűzoltós példában 1', categoryId: 'mode' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Átlag vagy medián a nagyobb?',
    description: 'Hasonlítsd össze az adatsokaság átlagát és mediánját!',
    categories: [
      { id: 'gt', name: 'Átlag > medián', color: 'rose' },
      { id: 'eq', name: 'Átlag = medián', color: 'emerald' },
      { id: 'lt', name: 'Átlag < medián', color: 'blue' }
    ],
    items: [
      { id: 'dss10', text: '1; 2; 3; 4; 20', categoryId: 'gt' },
      { id: 'dss11', text: '10; 15; 18; 18; 18; 20; 20; 24; 32; 55', categoryId: 'gt' },
      { id: 'dss12', text: '0; 1; 1; 2; 14', categoryId: 'gt' },
      { id: 'dss13', text: '2; 4; 6; 8; 10', categoryId: 'eq' },
      { id: 'dss14', text: '5; 5; 5', categoryId: 'eq' },
      { id: 'dss15', text: '1; 3; 3; 5', categoryId: 'eq' },
      { id: 'dss16', text: '1; 18; 19; 20', categoryId: 'lt' },
      { id: 'dss17', text: '0; 9; 10; 11', categoryId: 'lt' },
      { id: 'dss18', text: '2; 50; 51; 52; 53', categoryId: 'lt' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mi változik? (kiinduló adatok: 1; 2; 3; 4; 5)',
    description: 'Az 1, 2, 3, 4, 5 számsokaság átlaga és mediánja is 3. Mi változik a módosítás után?',
    categories: [
      { id: 'mean', name: 'Csak az átlag változik', color: 'amber' },
      { id: 'median', name: 'Csak a medián változik', color: 'violet' },
      { id: 'both', name: 'Mindkettő változik', color: 'rose' }
    ],
    items: [
      { id: 'dss19', text: 'az 5-öt 10-re cseréljük', categoryId: 'mean' },
      { id: 'dss20', text: 'az 1-et 0-ra cseréljük', categoryId: 'mean' },
      { id: 'dss21', text: 'a 4-et 5-re cseréljük', categoryId: 'mean' },
      { id: 'dss22', text: 'a 3-at és az 5-öt is 4-re cseréljük', categoryId: 'median' },
      { id: 'dss23', text: 'az 1-et és a 3-at is 2-re cseréljük', categoryId: 'median' },
      { id: 'dss24', text: 'az 1-et 0-ra, a 3-at 4-re cseréljük', categoryId: 'median' },
      { id: 'dss25', text: 'a 3-at 6-ra cseréljük', categoryId: 'both' },
      { id: 'dss26', text: 'hozzáveszünk egy 10-est', categoryId: 'both' },
      { id: 'dss27', text: 'elhagyjuk az 1-et', categoryId: 'both' }
    ]
  }
};

export const DataStatisticsSorter: React.FC<DataStatisticsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-adatrendezes-sorter',
  topicTitle = '1. Adatrendezés – statisztikai jellemzők – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="adatrendezes-statisztikai-jellemzok"
      title={topicTitle}
      subtitle="Csoportosítsd a jellemzőket, az adatsokaságokat és az adatváltoztatásokat!"
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

export default DataStatisticsSorter;
