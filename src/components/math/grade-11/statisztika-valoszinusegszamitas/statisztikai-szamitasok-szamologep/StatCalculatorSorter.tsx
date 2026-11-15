import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatCalculatorSorterProps {
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

const STAT_CALCULATOR_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Mit mér a kijelző sora?',
    description: 'Sorold be a számológép „1-változós stat” kijelzőjének sorait!',
    categories: [
      { id: 'center', name: 'Középérték / helyzeti mutató', color: 'blue' },
      { id: 'spread', name: 'Szóródási mutató', color: 'amber' },
      { id: 'other', name: 'Összeg vagy elemszám', color: 'slate' }
    ],
    items: [
      { id: 'scs1', text: 'x̄', categoryId: 'center' },
      { id: 'scs2', text: 'Med', categoryId: 'center' },
      { id: 'scs3', text: 'Q₁', categoryId: 'center' },
      { id: 'scs4', text: 'σx', categoryId: 'spread' },
      { id: 'scs5', text: 'sx', categoryId: 'spread' },
      { id: 'scs6', text: 'σ²x', categoryId: 'spread' },
      { id: 'scs7', text: 'Σx', categoryId: 'other' },
      { id: 'scs8', text: 'Σx²', categoryId: 'other' },
      { id: 'scs9', text: 'n', categoryId: 'other' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mit fogad el az érettségi?',
    description: 'A „Fontos tudnivalók” szerint melyik géppel végzett számítás hogyan számít?',
    categories: [
      { id: 'ok', name: 'Indoklás nélkül elfogadható művelet', color: 'emerald' },
      { id: 'stat', name: 'Statisztikai mutató – ha a feladat nem kér részletszámítást', color: 'sky' },
      { id: 'no', name: 'Indoklás nélküli lépés – nem jár érte pont', color: 'rose' }
    ],
    items: [
      { id: 'scs10', text: '12! kiszámítása', categoryId: 'ok' },
      { id: 'scs11', text: 'sin 35° értéke', categoryId: 'ok' },
      { id: 'scs12', text: 'nullára rendezett másodfokú egyenlet gyökei', categoryId: 'ok' },
      { id: 'scs13', text: 'egy adatsor átlaga', categoryId: 'stat' },
      { id: 'scs14', text: 'egy adatsor szórása', categoryId: 'stat' },
      { id: 'scs15', text: 'átlag gyakorisági táblázatból', categoryId: 'stat' },
      { id: 'scs16', text: 'egyenletrendszer megoldása a géppel', categoryId: 'no' },
      { id: 'scs17', text: 'harmadfokú egyenlet gépi megoldása', categoryId: 'no' },
      { id: 'scs18', text: 'szórás géppel, ha a feladat a részletszámítást kéri', categoryId: 'no' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: σx vagy sx?',
    description: 'Melyik szórásra igaz az állítás: csak a torzítottra (σx), csak a torzítatlanra (sx), vagy mindkettőre?',
    categories: [
      { id: 'sigma', name: 'Csak σx-re', color: 'blue' },
      { id: 's', name: 'Csak sx-re', color: 'amber' },
      { id: 'both', name: 'Mindkettőre', color: 'violet' }
    ],
    items: [
      { id: 'scs19', text: 'n-nel osztunk', categoryId: 'sigma' },
      { id: 'scs20', text: 'ezt tanultuk az adatsokaság szórásaként', categoryId: 'sigma' },
      { id: 'scs21', text: 'torzított szórás', categoryId: 'sigma' },
      { id: 'scs22', text: 'n − 1-gyel osztunk', categoryId: 's' },
      { id: 'scs23', text: 'torzítatlan szórás', categoryId: 's' },
      { id: 'scs24', text: 'egyetlen adatra nem értelmezhető', categoryId: 's' },
      { id: 'scs25', text: 'nemnegatív szám', categoryId: 'both' },
      { id: 'scs26', text: '0, ha minden adat egyenlő (n ≥ 2)', categoryId: 'both' },
      { id: 'scs27', text: 'nem változik, ha minden adathoz 5-öt adunk', categoryId: 'both' }
    ]
  }
};

export const StatCalculatorSorter: React.FC<StatCalculatorSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-szamologep-sorter',
  topicTitle = '5. Ráadás – Statisztikai számítások számológéppel – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="statisztikai-szamitasok-szamologep"
      title={topicTitle}
      subtitle="Rendszerezd a kijelző sorait, az érettségi szabályait és a kétféle szórás tulajdonságait!"
      levels={STAT_CALCULATOR_SORTER_LEVELS}
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

export default StatCalculatorSorter;
