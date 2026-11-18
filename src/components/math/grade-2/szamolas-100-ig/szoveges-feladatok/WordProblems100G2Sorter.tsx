import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BarCard80, CompareCard80 } from './WordProblems100G2CardFigures';

interface WordProblems100G2SorterProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mit kérdeznek?',
    description: 'Összesen? Maradt? Vagy mennyi kell még? Tedd a jó dobozba!',
    categories: [
      { id: 'sum', name: 'Összesen? (+)', color: 'blue' },
      { id: 'left', name: 'Maradt? (−)', color: 'rose' },
      { id: 'need', name: 'Mennyi kell még?', color: 'purple' }
    ],
    items: [
      { id: 'wp100s1', text: '', categoryId: 'sum', figure: <BarCard80 segs={[{ label: '30', v: 30 }, { label: '25', v: 25 }]} total="?" /> },
      { id: 'wp100s2', text: 'Kapott még 14-et. Mennyi lett?', categoryId: 'sum' },
      { id: 'wp100s3', text: 'Piros 32, kék 17. Hány összesen?', categoryId: 'sum' },
      { id: 'wp100s4', text: '', categoryId: 'left', figure: <BarCard80 segs={[{ label: '?', v: 28 }, { label: '20', v: 20, crossed: true }]} total="48" /> },
      { id: 'wp100s5', text: 'Volt 66, elfogyott 30. Mennyi maradt?', categoryId: 'left' },
      { id: 'wp100s6', text: '', categoryId: 'left', figure: <BarCard80 segs={[{ label: '?', v: 40 }, { label: '15', v: 15, crossed: true }]} total="55" /> },
      { id: 'wp100s7', text: '', categoryId: 'need', figure: <BarCard80 segs={[{ label: '40', v: 40 }, { label: '?', v: 20 }]} total="60" /> },
      { id: 'wp100s8', text: 'Kell 90, van 70. Mennyi hiányzik?', categoryId: 'need' },
      { id: 'wp100s9', text: '', categoryId: 'need', figure: <BarCard80 segs={[{ label: '55', v: 55 }, { label: '?', v: 45 }]} total="100" /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Számold ki, és tedd a kártyát a jó eredményhez!',
    categories: [
      { id: 'r25', name: 'Eredmény: 25', color: 'sky' },
      { id: 'r40', name: 'Eredmény: 40', color: 'emerald' },
      { id: 'r55', name: 'Eredmény: 55', color: 'amber' }
    ],
    items: [
      { id: 'wp100s10', text: 'Volt 60, elvittek 35-öt.', categoryId: 'r25' },
      { id: 'wp100s11', text: '', categoryId: 'r25', figure: <CompareCard80 top={['45', 45]} bottom={['?', 25]} diff="20" /> },
      { id: 'wp100s12', text: '', categoryId: 'r25', figure: <BarCard80 segs={[{ label: '75', v: 75 }, { label: '?', v: 25 }]} total="100" /> },
      { id: 'wp100s13', text: 'Ábel 28. Nóra 12-vel többet.', categoryId: 'r40' },
      { id: 'wp100s14', text: '', categoryId: 'r40', figure: <BarCard80 segs={[{ label: '22', v: 22 }, { label: '18', v: 18 }]} total="?" /> },
      { id: 'wp100s15', text: '', categoryId: 'r40', figure: <CompareCard80 top={['52', 52]} bottom={['?', 40]} diff="12" /> },
      { id: 'wp100s16', text: 'Volt 90 cm, levágtak 35 cm-t.', categoryId: 'r55' },
      { id: 'wp100s17', text: '', categoryId: 'r55', figure: <BarCard80 segs={[{ label: '30', v: 30 }, { label: '25', v: 25 }]} total="?" /> },
      { id: 'wp100s18', text: 'Kell 80, van 25. Mennyi hiányzik?', categoryId: 'r55' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik művelet kell?',
    description: 'Vigyázz a „több” és a „kevesebb” szóval! Gondold végig, kinek van több.',
    categories: [
      { id: 'plus', name: 'Összeadás (+)', color: 'blue' },
      { id: 'minus', name: 'Kivonás (−)', color: 'rose' },
      { id: 'two', name: 'Két lépés', color: 'purple' }
    ],
    items: [
      { id: 'wp100s19', text: 'Zsófi 30. Ez 15-tel kevesebb, mint Emmáé. Emma?', categoryId: 'plus' },
      { id: 'wp100s20', text: '', categoryId: 'plus', figure: <CompareCard80 top={['?', 45]} bottom={['30', 30]} diff="15" /> },
      { id: 'wp100s21', text: 'Elköltött 20-at, maradt 45. Mennyi volt?', categoryId: 'plus' },
      { id: 'wp100s22', text: 'Levente 58. Ez 14-gyel több, mint Zsófié. Zsófi?', categoryId: 'minus' },
      { id: 'wp100s23', text: '', categoryId: 'minus', figure: <CompareCard80 top={['58', 58]} bottom={['?', 44]} diff="14" /> },
      { id: 'wp100s24', text: '', categoryId: 'minus', figure: <CompareCard80 top={['61', 61]} bottom={['46', 46]} diff="?" /> },
      { id: 'wp100s25', text: 'Volt 51. Leszállt 18, felszállt 7.', categoryId: 'two' },
      {
        id: 'wp100s26',
        text: '',
        categoryId: 'two',
        figure: (
          <BarCard80
            segs={[
              { label: '40', v: 40 },
              { label: '35', v: 35 },
              { label: '?', v: 25 }
            ]}
            total="100"
          />
        )
      },
      { id: 'wp100s27', text: 'Ábel 35. Nóra 10-zel több. Együtt?', categoryId: 'two' }
    ]
  }
];

export const WORD_PROBLEMS100_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const WordProblems100G2Sorter: React.FC<WordProblems100G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c100-szoveges-sorter',
  topicTitle = '5. Szöveges feladatok – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Válogasd szét a feladatokat kérdés, eredmény és művelet szerint!"
      levels={WORD_PROBLEMS100_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
    />
  );
};

export default WordProblems100G2Sorter;
