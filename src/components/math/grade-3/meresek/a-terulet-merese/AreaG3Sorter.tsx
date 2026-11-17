import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardShape, CardIcon } from './AreaG3CardFigures';
import { S, splitHalves, Cell, Half } from './AreaG3Parts';

interface AreaG3SorterProps {
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

const sh = (str: string, pal: 'blue' | 'green' | 'orange' = 'green') => <CardShape cells={S(str)} size="s" pal={pal} />;
const hv = (cells: Cell[], halves: Half[], pal: 'blue' | 'green' | 'orange' | 'purple' = 'purple') => <CardShape cells={cells} halves={halves} size="s" pal={pal} />;

export const AREA_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Mekkora a terület?',
    description: 'Számold meg a kis négyzeteket, és tedd a jó dobozba!',
    categories: [
      { id: 'a5', name: '5 kis négyzet', color: 'sky' },
      { id: 'a6', name: '6 kis négyzet', color: 'emerald' },
      { id: 'a7', name: '7 kis négyzet', color: 'rose' }
    ],
    items: [
      { id: 'ars1', label: '', figure: sh('#####', 'blue'), categoryId: 'a5' },
      { id: 'ars2', label: '', figure: sh('##|##|#.', 'blue'), categoryId: 'a5' },
      { id: 'ars3', label: '', figure: sh('###|.#.|.#.', 'blue'), categoryId: 'a5' },
      { id: 'ars4', label: '', figure: sh('#..|###|..#', 'blue'), categoryId: 'a5' },
      { id: 'ars5', label: '', figure: sh('.#.|###|.#.', 'blue'), categoryId: 'a5' },
      { id: 'ars6', label: '', figure: sh('#.#|###', 'blue'), categoryId: 'a5' },
      { id: 'ars7', label: '2 + 3 kis négyzet', categoryId: 'a5' },
      { id: 'ars8', label: 'Egy sorban 5 kis négyzet', categoryId: 'a5' },
      { id: 'ars9', label: '4 + 1 kis négyzet', categoryId: 'a5' },
      { id: 'ars10', label: '', figure: sh('###|###'), categoryId: 'a6' },
      { id: 'ars11', label: '', figure: sh('####|#...|#...'), categoryId: 'a6' },
      { id: 'ars12', label: '', figure: sh('#...|####|...#'), categoryId: 'a6' },
      { id: 'ars13', label: '', figure: sh('.##|##.|#..|#..'), categoryId: 'a6' },
      { id: 'ars14', label: '', figure: sh('##.|.##|.##'), categoryId: 'a6' },
      { id: 'ars15', label: '', figure: sh('#.#|###|#..'), categoryId: 'a6' },
      { id: 'ars16', label: '3 + 3 kis négyzet', categoryId: 'a6' },
      { id: 'ars17', label: '2 sor, mindegyikben 3 kis négyzet', categoryId: 'a6' },
      { id: 'ars18', label: '4 + 2 kis négyzet', categoryId: 'a6' },
      { id: 'ars19', label: '', figure: sh('###|###|#..', 'orange'), categoryId: 'a7' },
      { id: 'ars20', label: '', figure: sh('#..|#..|###|.##', 'orange'), categoryId: 'a7' },
      { id: 'ars21', label: '', figure: sh('.#.|###|###', 'orange'), categoryId: 'a7' },
      { id: 'ars22', label: '', figure: sh('####|...#|..##', 'orange'), categoryId: 'a7' },
      { id: 'ars23', label: '', figure: sh('#.#.|####|.#..', 'orange'), categoryId: 'a7' },
      { id: 'ars24', label: '', figure: sh('##..|.###|..##', 'orange'), categoryId: 'a7' },
      { id: 'ars25', label: '4 + 3 kis négyzet', categoryId: 'a7' },
      { id: 'ars26', label: '5 + 2 kis négyzet', categoryId: 'a7' },
      { id: 'ars27', label: '8 − 1 kis négyzet', categoryId: 'a7' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Fél négyzetek is',
    description: '2 fél négyzet = 1 kis négyzet. Mekkora a terület?',
    categories: [
      { id: 'h4', name: '4 kis négyzet', color: 'amber' },
      { id: 'h5', name: '5 kis négyzet', color: 'sky' },
      { id: 'h6', name: '6 kis négyzet', color: 'purple' }
    ],
    items: [
      { id: 'ars28', label: '', figure: hv(S('###'), [[0, 1, 'tr'], [2, 1, 'tl']]), categoryId: 'h4' },
      { id: 'ars29', label: '', figure: hv([], splitHalves(S('##|##'))), categoryId: 'h4' },
      { id: 'ars30', label: '', figure: hv(S('.#.|.#.'), [[0, 0, 'br'], [0, 1, 'tr'], [2, 0, 'bl'], [2, 1, 'tl']]), categoryId: 'h4' },
      { id: 'ars31', label: '', figure: hv(S('##|.#'), [[0, 1, 'tr'], [2, 0, 'bl']]), categoryId: 'h4' },
      { id: 'ars32', label: '', figure: hv(S('#.|##'), [[1, 0, 'bl'], [2, 1, 'bl']]), categoryId: 'h4' },
      { id: 'ars33', label: '8 fél négyzet', categoryId: 'h4' },
      { id: 'ars34', label: '2 dominó', categoryId: 'h4' },
      { id: 'ars35', label: '3 egész és 2 fél négyzet', categoryId: 'h4' },
      { id: 'ars36', label: '2 + 2 kis négyzet', categoryId: 'h4' },
      { id: 'ars37', label: '', figure: hv(S('##|##'), [[2, 0, 'bl'], [2, 1, 'tl']], 'blue'), categoryId: 'h5' },
      { id: 'ars38', label: '', figure: hv(S('..|##|##'), [[0, 0, 'br'], [1, 0, 'bl']], 'blue'), categoryId: 'h5' },
      { id: 'ars39', label: '', figure: hv(S('.#.|.#.|.#.'), [[0, 0, 'br'], [0, 2, 'tr'], [2, 0, 'bl'], [2, 2, 'tl']], 'blue'), categoryId: 'h5' },
      { id: 'ars40', label: '', figure: hv(S('###|#..'), [[1, 1, 'tl'], [2, 1, 'tl']], 'blue'), categoryId: 'h5' },
      { id: 'ars41', label: '', figure: hv([], splitHalves(S('###|##.')), 'blue'), categoryId: 'h5' },
      { id: 'ars42', label: '10 fél négyzet', categoryId: 'h5' },
      { id: 'ars43', label: '4 egész és 2 fél négyzet', categoryId: 'h5' },
      { id: 'ars44', label: '2 dominó és 1 kis négyzet', categoryId: 'h5' },
      { id: 'ars45', label: '3 + 2 kis négyzet', categoryId: 'h5' },
      {
        id: 'ars46',
        label: '',
        figure: hv(S('..##|.##.'), [[1, 0, 'br'], [4, 0, 'tl'], [0, 1, 'br'], [3, 1, 'tl']], 'orange'),
        categoryId: 'h6'
      },
      { id: 'ars47', label: '', figure: hv(S('#####'), [[0, 1, 'tr'], [4, 1, 'tl']], 'orange'), categoryId: 'h6' },
      { id: 'ars48', label: '', figure: hv(S('.##.|.##.'), [[0, 0, 'br'], [0, 1, 'tr'], [3, 0, 'bl'], [3, 1, 'tl']], 'orange'), categoryId: 'h6' },
      { id: 'ars49', label: '', figure: hv([], splitHalves(S('###|###')), 'orange'), categoryId: 'h6' },
      { id: 'ars50', label: '', figure: hv(S('##|##|#.'), [[1, 2, 'tl'], [2, 0, 'bl']], 'orange'), categoryId: 'h6' },
      { id: 'ars51', label: '12 fél négyzet', categoryId: 'h6' },
      { id: 'ars52', label: '3 dominó', categoryId: 'h6' },
      { id: 'ars53', label: '5 egész és 2 fél négyzet', categoryId: 'h6' },
      { id: 'ars54', label: '4 egész és 4 fél négyzet', categoryId: 'h6' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Kerület vagy terület?',
    description: 'Mit kell megmérni? A határt körben, a belsejét, vagy valami mást?',
    categories: [
      { id: 'ter', name: 'Terület (a belseje)', color: 'emerald' },
      { id: 'ker', name: 'Kerület (a határ körben)', color: 'rose' },
      { id: 'mas', name: 'Más mérés', color: 'slate' }
    ],
    items: [
      { id: 'ars55', label: 'Hány csempe fedi a falat?', figure: <CardIcon kind="tiles" />, categoryId: 'ter' },
      { id: 'ars56', label: 'Hány kis négyzet fedi le a szőnyeget?', figure: <CardIcon kind="carpet" />, categoryId: 'ter' },
      { id: 'ars57', label: 'Mennyi gyep kell a kertbe?', figure: <CardIcon kind="lawn" />, categoryId: 'ter' },
      { id: 'ars58', label: 'Hány kis négyzet a síkidom?', figure: sh('##.|###'), categoryId: 'ter' },
      { id: 'ars59', label: 'Hány járólap kell a teraszra?', categoryId: 'ter' },
      { id: 'ars60', label: 'Hány matrica fedi le a füzet borítóját?', categoryId: 'ter' },
      { id: 'ars61', label: 'Hány kendő fedi le az asztalt?', categoryId: 'ter' },
      { id: 'ars62', label: 'Hány térkő kell az udvarra?', categoryId: 'ter' },
      { id: 'ars63', label: 'Hány papírlap fedi le a táblát?', categoryId: 'ter' },
      { id: 'ars64', label: 'Milyen hosszú kerítés kell a kert köré?', figure: <CardIcon kind="fence" />, categoryId: 'ker' },
      { id: 'ars65', label: 'Mennyi csipke kell a terítő szélére?', figure: <CardIcon kind="lace" />, categoryId: 'ker' },
      { id: 'ars66', label: 'Milyen hosszú a képkeret körben?', figure: <CardIcon kind="frame" />, categoryId: 'ker' },
      { id: 'ars67', label: 'Mennyi mérőszalag kell az asztal körül?', figure: <CardIcon kind="tape" />, categoryId: 'ker' },
      { id: 'ars68', label: 'Hány métert futsz a pálya körül?', categoryId: 'ker' },
      { id: 'ars69', label: 'Milyen hosszú szegély kell az ágyás köré?', categoryId: 'ker' },
      { id: 'ars70', label: 'Mennyi fonal kell a síkidom körberakásához?', categoryId: 'ker' },
      { id: 'ars71', label: 'Hány lépés a játszótér körül?', categoryId: 'ker' },
      { id: 'ars72', label: 'Milyen hosszú szalag fér a doboz teteje köré?', categoryId: 'ker' },
      { id: 'ars73', label: 'Milyen nehéz a dinnye?', figure: <CardIcon kind="scale" />, categoryId: 'mas' },
      { id: 'ars74', label: 'Mennyi víz fér a kancsóba?', figure: <CardIcon kind="jug" />, categoryId: 'mas' },
      { id: 'ars75', label: 'Meddig tart a mese?', figure: <CardIcon kind="clock" />, categoryId: 'mas' },
      { id: 'ars76', label: 'Hány kg a zsák krumpli?', figure: <CardIcon kind="scale" />, categoryId: 'mas' },
      { id: 'ars77', label: 'Milyen magas a fa?', categoryId: 'mas' },
      { id: 'ars78', label: 'Hány liter tej van az üvegben?', categoryId: 'mas' },
      { id: 'ars79', label: 'Mennyi ideig tart a szünet?', categoryId: 'mas' },
      { id: 'ars80', label: 'Milyen hosszú a ceruza?', categoryId: 'mas' },
      { id: 'ars81', label: 'Hány dl üdítő van a pohárban?', categoryId: 'mas' }
    ]
  }
};

export const AreaG3Sorter: React.FC<AreaG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-meas-terulet-sorter',
  topicTitle = '7. A terület mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-terulet-merese"
      title={topicTitle}
      subtitle="Számold meg, mekkora a terület, és válogasd szét!"
      levels={AREA_G3_SORTER_LEVELS}
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

export default AreaG3Sorter;
