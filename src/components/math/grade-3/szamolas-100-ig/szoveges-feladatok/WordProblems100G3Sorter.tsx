import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WordProblems100G3SorterProps {
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

const WORD_PROBLEMS_100_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Összeadás, kivonás vagy szorzás?',
    description: 'Melyik művelettel oldod meg?',
    categories: [
      { id: 'plus', name: 'Összeadás (+)', color: 'emerald' },
      { id: 'minus', name: 'Kivonás (−)', color: 'rose' },
      { id: 'times', name: 'Szorzás (·)', color: 'sky' }
    ],
    items: [
      { id: 'wp100s1', text: '35 lány és 28 fiú. Hány gyerek?', categoryId: 'plus' },
      { id: 'wp100s2', text: 'Volt 40 Ft-om, kaptam még 30 Ft-ot.', categoryId: 'plus' },
      { id: 'wp100s3', text: '17 kacsa úszott, jött még 8.', categoryId: 'plus' },
      { id: 'wp100s4', text: '50 lufiból 12 kipukkadt.', categoryId: 'minus' },
      { id: 'wp100s5', text: '64 oldalból 40-et már elolvastam. Mennyi van hátra?', categoryId: 'minus' },
      { id: 'wp100s6', text: '33 utasból 11 leszállt.', categoryId: 'minus' },
      { id: 'wp100s7', text: '7 padon 3-3 gyerek ül.', categoryId: 'times' },
      { id: 'wp100s8', text: '5 zacskóban 8-8 dió van.', categoryId: 'times' },
      { id: 'wp100s9', text: 'Egy póknak 8 lába van. Hány lába van 4 póknak?', categoryId: 'times' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Vigyázz a „több” és „kevesebb” szóra!',
    description: 'Melyik művelet kell valójában?',
    categories: [
      { id: 'plus', name: 'Összeadás (+)', color: 'emerald' },
      { id: 'minus', name: 'Kivonás (−)', color: 'rose' },
      { id: 'div', name: 'Osztás (:)', color: 'amber' }
    ],
    items: [
      { id: 'wp100s10', text: 'Pisti 25 éves. Anyja 9 évvel idősebb. Hány éves az anyja?', categoryId: 'plus' },
      { id: 'wp100s11', text: 'A kék szalag 30 cm. A piros 6 cm-rel hosszabb. Milyen hosszú a piros?', categoryId: 'plus' },
      { id: 'wp100s12', text: 'Ági 42 cm-t ugrott. Ez 8 cm-rel kevesebb, mint amennyit Mari ugrott. Mennyit ugrott Mari?', categoryId: 'plus' },
      { id: 'wp100s13', text: 'A piros szalag 52 cm. Ez 9 cm-rel hosszabb a kéknél. Milyen hosszú a kék?', categoryId: 'minus' },
      { id: 'wp100s14', text: 'Az egyik kosárban 48 szilva van, a másikban 7-tel kevesebb.', categoryId: 'minus' },
      { id: 'wp100s15', text: 'Ottó 61 kg. Ez 5 kg-mal több, mint Béla. Hány kg Béla?', categoryId: 'minus' },
      { id: 'wp100s16', text: '36 matricát 4 gyerek egyenlően oszt el.', categoryId: 'div' },
      { id: 'wp100s17', text: '45 liter vizet 5 literes vödrökbe töltünk. Hány vödör?', categoryId: 'div' },
      { id: 'wp100s18', text: '28 gyerek 7 egyforma csapatot alkot. Hányan vannak egy csapatban?', categoryId: 'div' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány lépés kell?',
    description: 'Egy lépés, két lépés, vagy hiányzik egy adat?',
    categories: [
      { id: 'one', name: 'Egy lépés elég', color: 'sky' },
      { id: 'two', name: 'Két lépés kell', color: 'purple' },
      { id: 'miss', name: 'Hiányzik egy adat', color: 'slate' }
    ],
    items: [
      { id: 'wp100s19', text: '6 sorban 5-5 tulipán. Hány tulipán?', categoryId: 'one' },
      { id: 'wp100s20', text: '80 Ft volt, 35 Ft-ot költöttem. Mennyi maradt?', categoryId: 'one' },
      { id: 'wp100s21', text: '27 fiú és 31 lány. Hány gyerek?', categoryId: 'one' },
      { id: 'wp100s22', text: '4 dobozban 9-9 golyó, kivettem 6-ot. Hány maradt?', categoryId: 'two' },
      { id: 'wp100s23', text: '70 Ft-om volt. Vettem egy 20 Ft-os és egy 15 Ft-os dolgot. Mennyi maradt?', categoryId: 'two' },
      { id: 'wp100s24', text: '23 kék golyó, a pirosból 6-tal több. Hány golyó van összesen?', categoryId: 'two' },
      { id: 'wp100s25', text: 'Dobozokban 8-8 kréta van. Hány kréta van összesen?', categoryId: 'miss' },
      { id: 'wp100s26', text: 'A buszról 7-en leszálltak. Hányan maradtak?', categoryId: 'miss' },
      { id: 'wp100s27', text: 'Dani 3 cm-rel magasabb Ákosnál. Milyen magas Dani?', categoryId: 'miss' }
    ]
  }
];

const WORD_PROBLEMS_100_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WORD_PROBLEMS_100_G3_SORTER_LEVELS_LIST[0],
  2: WORD_PROBLEMS_100_G3_SORTER_LEVELS_LIST[1],
  3: WORD_PROBLEMS_100_G3_SORTER_LEVELS_LIST[2]
};

export const WordProblems100G3Sorter: React.FC<WordProblems100G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c100-szoveges-sorter',
  topicTitle = '5. Szöveges feladatok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Válogasd szét a szöveges feladatokat!"
      levels={WORD_PROBLEMS_100_G3_SORTER_LEVELS}
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

export default WordProblems100G3Sorter;
