import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExpectedValue12SorterProps {
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

const EV_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Statisztika vagy valószínűségszámítás?',
    description: 'Hová tartozik a fogalom? És mikor nem értelmezhető a várható érték?',
    categories: [
      { id: 'stat', name: 'statisztikai fogalom', color: 'blue' },
      { id: 'val', name: 'valószínűségszámítási fogalom', color: 'emerald' },
      { id: 'nincs', name: 'nincs várható érték (a kimenetel nem szám)', color: 'rose' }
    ],
    items: [
      { id: 'evs1', text: 'relatív gyakoriság', categoryId: 'stat' },
      { id: 'evs2', text: 'átlag', categoryId: 'stat' },
      { id: 'evs3', text: 'súlyozott átlag', categoryId: 'stat' },
      { id: 'evs4', text: 'valószínűség', categoryId: 'val' },
      { id: 'evs5', text: 'várható érték', categoryId: 'val' },
      { id: 'evs6', text: 'eseménytér', categoryId: 'val' },
      { id: 'evs7', text: 'a kihúzott kártyalap színe', categoryId: 'nincs' },
      { id: 'evs8', text: 'a kihúzott golyó színe', categoryId: 'nincs' },
      { id: 'evs9', text: 'melyik pizzát választja a megkérdezett diák', categoryId: 'nincs' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Kinek kedvez a játék?',
    description: 'Hasonlítsd össze a várható nyereményt a téttel!',
    categories: [
      { id: 'jat', name: 'a játékosnak kedvez (E > tét)', color: 'emerald' },
      { id: 'egy', name: 'egyik félnek sem (E = tét)', color: 'slate' },
      { id: 'szerv', name: 'a szervezőnek kedvez (E < tét)', color: 'rose' }
    ],
    items: [
      { id: 'evs10', text: 'érme: fej → 300 Ft, írás → 0 Ft; tét 100 Ft', categoryId: 'jat' },
      { id: 'evs11', text: 'kocka: a dobott szám · 100 Ft; tét 300 Ft', categoryId: 'jat' },
      { id: 'evs12', text: 'két érme: 2 fej → 1000 Ft, egyébként 0; tét 200 Ft', categoryId: 'jat' },
      { id: 'evs13', text: 'kocka: hatos → 600 Ft, egyébként 0; tét 100 Ft', categoryId: 'egy' },
      { id: 'evs14', text: 'érme: fej → 200 Ft, írás → 0 Ft; tét 100 Ft', categoryId: 'egy' },
      { id: 'evs15', text: 'kerék 4 egyenlő cikkel: 0, 100, 200, 500 Ft; tét 200 Ft', categoryId: 'egy' },
      { id: 'evs16', text: 'a vurstli kereke (E = 400 Ft); tét 500 Ft', categoryId: 'szerv' },
      { id: 'evs17', text: 'kocka: a dobott szám · 100 Ft; tét 400 Ft', categoryId: 'szerv' },
      { id: 'evs18', text: 'sorsjegy (E = 350 Ft); ára 500 Ft', categoryId: 'szerv' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mennyi a várható érték?',
    description: 'Csoportosítsd az eloszlásokat a várható értékük szerint!',
    categories: [
      { id: 'e1', name: 'E = 1', color: 'blue' },
      { id: 'e2', name: 'E = 2', color: 'purple' },
      { id: 'e35', name: 'E = 3,5', color: 'amber' }
    ],
    items: [
      { id: 'evs19', text: 'fejek száma 2 pénzérme feldobásakor', categoryId: 'e1' },
      { id: 'evs20', text: '0 (p = 0,9) vagy 10 (p = 0,1)', categoryId: 'e1' },
      { id: 'evs21', text: '−2 (p = 0,25) vagy 2 (p = 0,75)', categoryId: 'e1' },
      { id: 'evs22', text: 'fejek száma 4 pénzérme feldobásakor', categoryId: 'e2' },
      { id: 'evs23', text: '6 (p = 1/3) vagy 0 (p = 2/3)', categoryId: 'e2' },
      { id: 'evs24', text: '−1 (p = 0,25) vagy 3 (p = 0,75)', categoryId: 'e2' },
      { id: 'evs25', text: 'egy szabályos kockával dobott szám', categoryId: 'e35' },
      { id: 'evs26', text: 'két kockával dobott számok összegének fele', categoryId: 'e35' },
      { id: 'evs27', text: '14 (p = 0,25) vagy 0 (p = 0,75)', categoryId: 'e35' }
    ]
  }
};

export const ExpectedValue12Sorter: React.FC<ExpectedValue12SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-varhato-ertek-sorter',
  topicTitle = '9. A várható érték – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="a-varhato-ertek"
      title={topicTitle}
      subtitle="Rendszerezd a fogalmakat, a játékokat és a várható értékeket!"
      levels={EV_SORTER_LEVELS}
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

export default ExpectedValue12Sorter;
