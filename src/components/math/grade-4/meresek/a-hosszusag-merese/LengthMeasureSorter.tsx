import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LengthMeasureSorterProps {
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

const LENGTH_MEASURE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik egységgel mérjük?',
    description: 'Döntsd el, melyik mértékegységgel érdemes megadni a hosszúságot!',
    categories: [
      { id: 'mm', name: 'milliméter (mm)', color: 'emerald' },
      { id: 'm', name: 'méter (m)', color: 'blue' },
      { id: 'km', name: 'kilométer (km)', color: 'purple' }
    ],
    items: [
      { id: 'lms1', text: 'a füzet vastagsága', categoryId: 'mm' },
      { id: 'lms2', text: 'egy hangya hossza', categoryId: 'mm' },
      { id: 'lms3', text: 'egy gomb szélessége', categoryId: 'mm' },
      { id: 'lms4', text: 'az osztályterem hossza', categoryId: 'm' },
      { id: 'lms5', text: 'a tornaterem szélessége', categoryId: 'm' },
      { id: 'lms6', text: 'egy fa magassága', categoryId: 'm' },
      { id: 'lms7', text: 'Budapest és Pécs távolsága', categoryId: 'km' },
      { id: 'lms8', text: 'egy egész napos kerékpártúra útja', categoryId: 'km' },
      { id: 'lms9', text: 'a Balaton hossza', categoryId: 'km' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kevesebb, mint 1 m, pont 1 m vagy több?',
    description: 'Váltsd át fejben, és tedd a hosszúságot a jó csoportba!',
    categories: [
      { id: 'lt', name: '< 1 m', color: 'rose' },
      { id: 'eq', name: '= 1 m', color: 'amber' },
      { id: 'gt', name: '> 1 m', color: 'teal' }
    ],
    items: [
      { id: 'lms10', text: '80 cm', categoryId: 'lt' },
      { id: 'lms11', text: '99 cm', categoryId: 'lt' },
      { id: 'lms12', text: '900 mm', categoryId: 'lt' },
      { id: 'lms13', text: '100 cm', categoryId: 'eq' },
      { id: 'lms14', text: '1000 mm', categoryId: 'eq' },
      { id: 'lms15', text: '10 dm', categoryId: 'eq' },
      { id: 'lms16', text: '120 cm', categoryId: 'gt' },
      { id: 'lms17', text: '15 dm', categoryId: 'gt' },
      { id: 'lms18', text: '1 m 5 cm', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Biztos, lehet vagy lehetetlen?',
    description: 'Benedek és Bendegúz a 20 m-es út két végéről indul egymás felé. Döntsd el az állításokról!',
    categories: [
      { id: 'sure', name: 'Biztos', color: 'emerald' },
      { id: 'maybe', name: 'Lehet, de nem biztos', color: 'amber' },
      { id: 'never', name: 'Lehetetlen', color: 'rose' }
    ],
    items: [
      { id: 'lms19', text: 'A találkozásig a két fiú együtt 20 m-t tett meg.', categoryId: 'sure' },
      { id: 'lms20', text: 'Ha mindketten 1 m-eseket lépnek, 10–10 lépés után találkoznak.', categoryId: 'sure' },
      { id: 'lms21', text: 'Luca oda-vissza naponta legalább 3 km-t gyalogol (1500 m-re lakik).', categoryId: 'sure' },
      { id: 'lms22', text: 'Benedek és Bendegúz ugyanakkora távolságot tett meg a találkozásig.', categoryId: 'maybe' },
      { id: 'lms23', text: 'Mindkét fiú ugyanakkorákat lépett.', categoryId: 'maybe' },
      { id: 'lms24', text: 'A fiúk pontosan 10–10 lépés után találkoztak.', categoryId: 'maybe' },
      { id: 'lms25', text: 'Mindkét fiú külön-külön 20 m-t tett meg a találkozásig.', categoryId: 'never' },
      { id: 'lms26', text: 'A „vasútállomás 2 km” tábla azt jelenti, hogy 200 m van hátra.', categoryId: 'never' },
      { id: 'lms27', text: 'Benedek a találkozásig 25 m-t ment.', categoryId: 'never' }
    ]
  }
];

const LENGTH_MEASURE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LENGTH_MEASURE_SORTER_LEVELS_LIST[0],
  2: LENGTH_MEASURE_SORTER_LEVELS_LIST[1],
  3: LENGTH_MEASURE_SORTER_LEVELS_LIST[2]
};

export const LengthMeasureSorter: React.FC<LengthMeasureSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-meas-hosszusag-sorter',
  topicTitle = '1. A hosszúság mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-hosszusag-merese"
      title={topicTitle}
      subtitle="Csoportosítsd a hosszúságokat mértékegység, nagyság és valószínűség szerint!"
      levels={LENGTH_MEASURE_SORTER_LEVELS}
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

export default LengthMeasureSorter;
