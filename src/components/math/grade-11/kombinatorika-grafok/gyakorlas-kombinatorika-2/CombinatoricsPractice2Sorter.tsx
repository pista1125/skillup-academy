import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinatoricsPractice2SorterProps {
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

const COMBINATORICS_PRACTICE2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számít a sorrend? Lehet ismétlés?',
    description: 'Döntsd el, melyik modell illik a feladathoz!',
    categories: [
      { id: 'var', name: 'Számít a sorrend, nincs ismétlés', color: 'blue' },
      { id: 'varrep', name: 'Számít a sorrend, lehet ismétlés', color: 'purple' },
      { id: 'comb', name: 'Nem számít a sorrend', color: 'emerald' }
    ],
    items: [
      { id: 'cp2s1', text: 'A 8 fős döntő első 3 helyezettje', categoryId: 'var' },
      { id: 'cp2s2', text: 'Titkár és jegyző 10 gyerek közül', categoryId: 'var' },
      { id: 'cp2s3', text: '5 gyerek sorba állítása', categoryId: 'var' },
      { id: 'cp2s4', text: '7 karakteres kód a 0 és 1 jegyekből', categoryId: 'varrep' },
      { id: 'cp2s5', text: 'Dobókockával 3 egymás utáni dobás', categoryId: 'varrep' },
      { id: 'cp2s6', text: '4 jegyű PIN-kód', categoryId: 'varrep' },
      { id: 'cp2s7', text: '10 elemű halmaz 4 elemű részhalmazai', categoryId: 'comb' },
      { id: 'cp2s8', text: '7 csapat körmérkőzésének meccsei', categoryId: 'comb' },
      { id: 'cp2s9', text: 'Hányadikra húzta Zoli a 7 almából a 2 hibásat', categoryId: 'comb' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik ötlet a leggyorsabb?',
    description: 'Válogasd szét a feladatokat a legegyszerűbb megoldási ötlet szerint!',
    categories: [
      { id: 'compl', name: 'Komplementer: összes − „rossz”', color: 'rose' },
      { id: 'cases', name: 'Esetszétválasztás: összeadás', color: 'amber' },
      { id: 'mult', name: 'Egyetlen szorzat (szorzási szabály)', color: 'teal' }
    ],
    items: [
      { id: 'cp2s10', text: 'Háromjegyű számok, amelyekben van 9-es', categoryId: 'compl' },
      { id: 'cp2s11', text: 'Négyjegyű számok, amelyekben van 0', categoryId: 'compl' },
      { id: 'cp2s12', text: '6 vízsugár 3 színnel, de nem mind azonos színű', categoryId: 'compl' },
      { id: 'cp2s13', text: '{1; …; 9} legfeljebb 3 elemű részhalmazai', categoryId: 'cases' },
      { id: 'cp2s14', text: 'Juci és Piri egymás mellett VAGY egymással szemben ül', categoryId: 'cases' },
      { id: 'cp2s15', text: 'Legfeljebb kétszínű kitűző (egyszínű vagy kétszínű)', categoryId: 'cases' },
      { id: 'cp2s16', text: 'Háromjegyű számok csupa páros jeggyel', categoryId: 'mult' },
      { id: 'cp2s17', text: '3 házaspár sorban, mindenki a párja mellett', categoryId: 'mult' },
      { id: 'cp2s18', text: 'Négysávos zászló 6 színből, szomszédos sávok különbözők', categoryId: 'mult' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hibakeresés',
    description: 'Helyes a gondolatmenet, vagy kimaradnak, illetve többször számolódnak esetek?',
    categories: [
      { id: 'ok', name: 'Helyes gondolatmenet', color: 'emerald' },
      { id: 'miss', name: 'Kimaradnak esetek', color: 'amber' },
      { id: 'double', name: 'Többször számolt esetek', color: 'rose' }
    ],
    items: [
      { id: 'cp2s19', text: 'Van benne 9-es: 900 − 8 · 9 · 9 = 252', categoryId: 'ok' },
      { id: 'cp2s20', text: 'Van benne 9-es: 81 + 72 + 72 + 9 + 9 + 8 + 1 = 252', categoryId: 'ok' },
      { id: 'cp2s21', text: 'Zászló (két-két azonos sáv): 3 · 6 · 5 = 90', categoryId: 'ok' },
      { id: 'cp2s22', text: 'Van benne 9-es: az első jegy 9, a többi bármi, 1 · 10 · 10 = 100', categoryId: 'miss' },
      { id: 'cp2s23', text: 'Van benne 9-es: az utolsó jegy 9, 9 · 10 · 1 = 90', categoryId: 'miss' },
      { id: 'cp2s24', text: 'Kétízű háromgombócos fagylalt sorrenddel: 6 · 5 = 30', categoryId: 'miss' },
      { id: 'cp2s25', text: 'Van benne 9-es: 100 + 90 + 90 = 280', categoryId: 'double' },
      { id: 'cp2s26', text: 'Szökőkút 3-3 színnel: 3 · 2 · C(6; 3) = 120', categoryId: 'double' },
      { id: 'cp2s27', text: '4 fiú és 4 lány táncoló párjai (sorrend nem számít): 4! · 4! = 576', categoryId: 'double' }
    ]
  }
];

const COMBINATORICS_PRACTICE2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COMBINATORICS_PRACTICE2_SORTER_LEVELS_LIST[0],
  2: COMBINATORICS_PRACTICE2_SORTER_LEVELS_LIST[1],
  3: COMBINATORICS_PRACTICE2_SORTER_LEVELS_LIST[2]
};

export const CombinatoricsPractice2Sorter: React.FC<CombinatoricsPractice2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-comb-gyakorlas-masodik-sorter',
  topicTitle = '7. Gyakorlás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="gyakorlas-kombinatorika-2"
      title={topicTitle}
      subtitle="Rendszerezd a feladatokat modell és megoldási ötlet szerint, és keresd meg a hibás gondolatmeneteket!"
      levels={COMBINATORICS_PRACTICE2_SORTER_LEVELS}
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

export default CombinatoricsPractice2Sorter;
