import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PermutationsSorterProps {
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

const PERMUTATIONS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik ötlet segít?',
    description: 'Döntsd el, melyik módszerrel érdemes a megkötéses sorba rendezést megoldani!',
    categories: [
      { id: 'fix', name: 'Rögzítjük a kötött helyű elemeket', color: 'blue' },
      { id: 'block', name: 'Egy elemnek tekintjük (· 2)', color: 'amber' },
      { id: 'compl', name: 'Az összesből kivonjuk az egymás mellettieket', color: 'rose' }
    ],
    items: [
      { id: 'pms1', text: '9 tanuló, András a bal, Bence a jobb szélen', categoryId: 'fix' },
      { id: 'pms2', text: '12 tanuló kimegy, Csilla és Panni a két utolsó', categoryId: 'fix' },
      { id: 'pms3', text: 'Tízjegyű szám a 10 kártyából, amely osztható 10-zel', categoryId: 'fix' },
      { id: 'pms4', text: 'A tigris és az oroszlán közvetlenül egymás után', categoryId: 'block' },
      { id: 'pms5', text: 'Csilla és Panni egymás mellett a tornapadon', categoryId: 'block' },
      { id: 'pms6', text: 'Anna és Béla egymás mellett a színházban', categoryId: 'block' },
      { id: 'pms7', text: 'A tigris és az oroszlán nem egymás után', categoryId: 'compl' },
      { id: 'pms8', text: 'Zoli és Gábor nem ül egymás mellett', categoryId: 'compl' },
      { id: 'pms9', text: 'Anna és Béla nem ül egymás mellett', categoryId: 'compl' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a sorrendek száma?',
    description: 'Számold ki, és sorold be az eredményt!',
    categories: [
      { id: 'small', name: 'Kevesebb mint 100', color: 'emerald' },
      { id: 'mid', name: '100 és 10 000 között', color: 'blue' },
      { id: 'big', name: 'Több mint 10 000', color: 'rose' }
    ],
    items: [
      { id: 'pms10', text: '5 állat körbevonul, senki sem „első”', categoryId: 'small' },
      { id: 'pms11', text: '3 lány és 3 fiú váltakozva ül le', categoryId: 'small' },
      { id: 'pms12', text: '5 állat, a tigris és az oroszlán nem egymás után', categoryId: 'small' },
      { id: 'pms13', text: '5 vadállat felvonulása', categoryId: 'mid' },
      { id: 'pms14', text: '7 fiú és 7 lány táncoló párokba', categoryId: 'mid' },
      { id: 'pms15', text: 'Jegyek a 35 állomásos gyorsvasúton', categoryId: 'mid' },
      { id: 'pms16', text: 'Öttusa: 12 akadály, típusonként rögzített sorrendben', categoryId: 'big' },
      { id: 'pms17', text: '9 tanuló egy sorban', categoryId: 'big' },
      { id: 'pms18', text: 'Tízjegyű számok a 10 számjegykártyából', categoryId: 'big' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'n értékétől függ', color: 'amber' }
    ],
    items: [
      { id: 'pms19', text: '0! = 1', categoryId: 'true' },
      { id: 'pms20', text: 'n! = n · (n − 1)! (n ≥ 1)', categoryId: 'true' },
      { id: 'pms21', text: 'n elem körbe rendezéseinek száma (n − 1)!', categoryId: 'true' },
      { id: 'pms22', text: '0! = 0', categoryId: 'false' },
      { id: 'pms23', text: '(5!)² = 10!', categoryId: 'false' },
      { id: 'pms24', text: '5! + 6! = 11!', categoryId: 'false' },
      { id: 'pms25', text: 'n! osztható 10-zel', categoryId: 'depends' },
      { id: 'pms26', text: 'n! nagyobb 1000-nél', categoryId: 'depends' },
      { id: 'pms27', text: 'n! páros szám', categoryId: 'depends' }
    ]
  }
];

const PERMUTATIONS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: PERMUTATIONS_SORTER_LEVELS_LIST[0],
  2: PERMUTATIONS_SORTER_LEVELS_LIST[1],
  3: PERMUTATIONS_SORTER_LEVELS_LIST[2]
};

export const PermutationsSorter: React.FC<PermutationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-comb-sorba-rendezes-sorter',
  topicTitle = '2. Sorba rendezés – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="sorba-rendezes"
      title={topicTitle}
      subtitle="Rendszerezd a megkötéses sorba rendezések módszereit, az esetszámokat és a faktoriálisról szóló állításokat!"
      levels={PERMUTATIONS_SORTER_LEVELS}
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

export default PermutationsSorter;
