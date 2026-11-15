import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GcdLcmSorterProps {
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

const GCD_LCM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: LNKO vagy LKKT kell?',
    description: 'Döntsd el, mivel oldható meg a feladat!',
    categories: [
      { id: 'gcd', name: 'Legnagyobb közös osztó', color: 'emerald' },
      { id: 'lcm', name: 'Legkisebb közös többszörös', color: 'blue' },
      { id: 'other', name: 'Egyik sem: osztók, prímek', color: 'slate' }
    ],
    items: [
      { id: 'gls1', text: 'Legszélesebb tapétacsík a 240 és a 320 cm-es falra', categoryId: 'gcd' },
      { id: 'gls2', text: 'Legnagyobb négyzetek a 84 × 126 cm-es téglalapban', categoryId: 'gcd' },
      { id: 'gls3', text: 'Legkevesebb négyzetes járólap a 3,3 × 4,2 m-es padlóra', categoryId: 'gcd' },
      { id: 'gls4', text: 'Mikor indul újra egyszerre a 8 és a 6 napos aukció?', categoryId: 'lcm' },
      { id: 'gls5', text: 'Legkisebb díjalap, ha 6, 8 vagy 10 díjazott lehet', categoryId: 'lcm' },
      { id: 'gls6', text: 'Legkisebb négyzet 84 × 126 cm-es téglalapokból kirakva', categoryId: 'lcm' },
      { id: 'gls7', text: 'Prímszám-e a 211?', categoryId: 'other' },
      { id: 'gls8', text: 'Hány pozitív osztója van a 450-nek?', categoryId: 'other' },
      { id: 'gls9', text: 'Hány menedékhely között osztható szét egyenlően 81 takaró?', categoryId: 'other' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Milyen viszonyban van a két szám?',
    description: 'Vizsgáld meg a számpár legnagyobb közös osztóját!',
    categories: [
      { id: 'coprime', name: 'Relatív prímek (LNKO = 1)', color: 'teal' },
      { id: 'divides', name: 'A kisebbik osztója a nagyobbiknak', color: 'purple' },
      { id: 'other', name: 'LNKO > 1, de a kisebbik nem osztó', color: 'amber' }
    ],
    items: [
      { id: 'gls10', text: '22 és 75', categoryId: 'coprime' },
      { id: 'gls11', text: '15 és 22', categoryId: 'coprime' },
      { id: 'gls12', text: '740 és 63', categoryId: 'coprime' },
      { id: 'gls13', text: '36 és 180', categoryId: 'divides' },
      { id: 'gls14', text: '39 és 351', categoryId: 'divides' },
      { id: 'gls15', text: '12 és 144', categoryId: 'divides' },
      { id: 'gls16', text: '18 és 120', categoryId: 'other' },
      { id: 'gls17', text: '240 és 320', categoryId: 'other' },
      { id: 'gls18', text: '84 és 126', categoryId: 'other' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a legnagyobb közös osztó?',
    description: 'Számold ki a legnagyobb közös osztót, és sorold be!',
    categories: [
      { id: 'g6', name: 'LNKO = 6', color: 'emerald' },
      { id: 'g12', name: 'LNKO = 12', color: 'blue' },
      { id: 'g24', name: 'LNKO = 24', color: 'rose' }
    ],
    items: [
      { id: 'gls19', text: '(18; 120)', categoryId: 'g6' },
      { id: 'gls20', text: '(30; 42)', categoryId: 'g6' },
      { id: 'gls21', text: '(54; 60)', categoryId: 'g6' },
      { id: 'gls22', text: '(36; 60)', categoryId: 'g12' },
      { id: 'gls23', text: '(24; 84)', categoryId: 'g12' },
      { id: 'gls24', text: '(48; 180)', categoryId: 'g12' },
      { id: 'gls25', text: '(4536; 528)', categoryId: 'g24' },
      { id: 'gls26', text: '(72; 120)', categoryId: 'g24' },
      { id: 'gls27', text: '(288; 528; 936)', categoryId: 'g24' }
    ]
  }
];

const GCD_LCM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: GCD_LCM_SORTER_LEVELS_LIST[0],
  2: GCD_LCM_SORTER_LEVELS_LIST[1],
  3: GCD_LCM_SORTER_LEVELS_LIST[2]
};

export const GcdLcmSorter: React.FC<GcdLcmSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-lnko-lkkt-sorter',
  topicTitle = '3. Legnagyobb közös osztó, legkisebb közös többszörös – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="lnko-lkkt"
      title={topicTitle}
      subtitle="Döntsd el, mikor kell LNKO és mikor LKKT, vizsgáld a számpárokat, és csoportosíts a legnagyobb közös osztó szerint!"
      levels={GCD_LCM_SORTER_LEVELS}
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

export default GcdLcmSorter;
