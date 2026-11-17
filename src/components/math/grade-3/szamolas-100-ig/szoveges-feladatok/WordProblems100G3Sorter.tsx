import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { JoinCard, BalloonCard, BusCard, DotRowsCard, BoxesCard, BarsCard, ShareCard, PurseCard, UnknownBoxesCard } from './WordProblems100G3CardFigures';

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
      { id: 'wp100s1', text: 'Lányok és fiúk. Hány gyerek?', categoryId: 'plus', figure: <JoinCard a={35} b={28} small /> },
      { id: 'wp100s2', text: 'Volt 40 Ft-om, kaptam még 30 Ft-ot.', categoryId: 'plus' },
      { id: 'wp100s3', text: '17 kacsa úszott, jött még 8.', categoryId: 'plus' },
      { id: 'wp100s4', text: '50 lufiból 12 kipukkadt.', categoryId: 'minus', figure: <BalloonCard total={50} gone={12} small /> },
      { id: 'wp100s5', text: '64 oldalból 40-et már elolvastam. Mennyi van hátra?', categoryId: 'minus' },
      { id: 'wp100s6', text: '33 utasból 11 leszállt.', categoryId: 'minus', figure: <BusCard onBoard="33" down={11} small /> },
      { id: 'wp100s7', text: '7 padon 3-3 gyerek ül.', categoryId: 'times', figure: <DotRowsCard rows={7} cols={3} small color="#60a5fa" /> },
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
      { id: 'wp100s11', text: 'A kék szalag 30 cm. A piros 6 cm-rel hosszabb. Milyen hosszú a piros?', categoryId: 'plus', figure: <BarsCard top="30" diff={6} kind="more" small /> },
      { id: 'wp100s12', text: 'Ági 42 cm-t ugrott. Ez 8 cm-rel kevesebb, mint amennyit Mari ugrott. Mennyit ugrott Mari?', categoryId: 'plus', figure: <BarsCard top="42" diff={8} kind="more" small /> },
      { id: 'wp100s13', text: 'A kék szalag 52 cm. Ez 9 cm-rel hosszabb a pirosnál. Milyen hosszú a piros?', categoryId: 'minus', figure: <BarsCard top="52" diff={9} kind="less" small /> },
      { id: 'wp100s14', text: 'Az egyik kosárban 48 szilva van, a másikban 7-tel kevesebb.', categoryId: 'minus' },
      { id: 'wp100s15', text: 'Ottó 61 kg. Ez 5 kg-mal több, mint Béla. Hány kg Béla?', categoryId: 'minus', figure: <BarsCard top="61" diff={5} kind="less" small /> },
      { id: 'wp100s16', text: '36 matricát 4 gyerek egyenlően oszt el.', categoryId: 'div', figure: <ShareCard total={36} people={4} small /> },
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
      { id: 'wp100s19', text: '6 sorban 5-5 tulipán. Hány tulipán?', categoryId: 'one', figure: <DotRowsCard rows={6} cols={5} small /> },
      { id: 'wp100s20', text: '80 Ft volt, 35 Ft-ot költöttem. Mennyi maradt?', categoryId: 'one' },
      { id: 'wp100s21', text: '27 fiú és 31 lány. Hány gyerek?', categoryId: 'one' },
      { id: 'wp100s22', text: '4 dobozban 9-9 golyó, kivettem 6-ot. Hány maradt?', categoryId: 'two', figure: <BoxesCard n={4} each={9} small /> },
      { id: 'wp100s23', text: '70 Ft-om volt. Vettem egy 20 Ft-os és egy 15 Ft-os dolgot. Mennyi maradt?', categoryId: 'two', figure: <PurseCard money={70} prices={[20, 15]} small /> },
      { id: 'wp100s24', text: '23 kék golyó, a pirosból 6-tal több. Hány golyó van összesen?', categoryId: 'two' },
      { id: 'wp100s25', text: 'Dobozokban 8-8 kréta van. Hány kréta van összesen?', categoryId: 'miss', figure: <UnknownBoxesCard each={8} /> },
      { id: 'wp100s26', text: 'A buszról 7-en leszálltak. Hányan maradtak?', categoryId: 'miss', figure: <BusCard onBoard="?" down={7} small /> },
      { id: 'wp100s27', text: 'Dani 3 cm-rel magasabb Ákosnál. Milyen magas Dani?', categoryId: 'miss' }
    ]
  }
];

export const WORD_PROBLEMS_100_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
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
