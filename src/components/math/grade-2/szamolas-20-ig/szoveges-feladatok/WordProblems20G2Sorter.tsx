import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CompareBarsCard,
  EqualPairShareCard,
  MissingPartStripCard,
  StripCrossCard,
  StripJoinCard,
  TokensPurseCard,
  TwoStepBusCard,
  UnknownDataCard,
} from './WordProblems20G2CardFigures';

interface WordProblems20G2SorterProps {
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
  [key: string]: unknown;
}

const WORDPROBLEMS20_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Összeadás, kivonás vagy két lépés?',
    description: 'Döntsd el, melyik művelettel oldod meg a feladatot!',
    categories: [
      { id: 'plus', name: 'Összeadás (+)', color: 'emerald' },
      { id: 'minus', name: 'Kivonás (−)', color: 'rose' },
      { id: 'two', name: 'Két lépés (+ és −)', color: 'sky' },
    ],
    items: [
      { id: 'wp20s1', text: 'Kék és piros golyók együtt.', categoryId: 'plus', figure: <StripJoinCard a={7} b={9} small /> },
      { id: 'wp20s2', text: 'Volt 8 dióm, kaptam még 6-ot.', categoryId: 'plus' },
      { id: 'wp20s3', text: '5 kék és 12 sárga gyöngyöt fűztem.', categoryId: 'plus' },
      { id: 'wp20s4', text: '16 lufiból 5 kipukkadt.', categoryId: 'minus', figure: <StripCrossCard total={16} gone={5} small /> },
      { id: 'wp20s5', text: '18 oldalból 10 kész. Mennyi van hátra?', categoryId: 'minus', figure: <MissingPartStripCard whole={18} part={10} small /> },
      { id: 'wp20s6', text: '14 verébből 8 elrepült.', categoryId: 'minus' },
      { id: 'wp20s7', text: '11 utas, 4 fel, 6 le.', categoryId: 'two', figure: <TwoStepBusCard onBoard="11" up={4} down={6} small /> },
      { id: 'wp20s8', text: '19 zsetonból vettem 6 és 8 zsetonos dolgot.', categoryId: 'two', figure: <TokensPurseCard money={19} prices={[6, 8]} small /> },
      { id: 'wp20s9', text: '6 fiú és 8 lány épített várat, de 3 elment.', categoryId: 'two' },
    ],
  },
  {
    level: 2,
    title: '2. szint: Vigyázz a „több” és „kevesebb” szóra!',
    description: 'Kihez képest van több vagy kevesebb? Válassz jó műveletet!',
    categories: [
      { id: 'plus', name: 'Összeadás (+)', color: 'emerald' },
      { id: 'minus', name: 'Kivonás (−)', color: 'rose' },
      { id: 'half', name: 'Egyenlő két rész (□ + □)', color: 'amber' },
    ],
    items: [
      { id: 'wp20s10', text: 'Matyi 9 éves, bátyja 5 évvel idősebb. A bátyja?', categoryId: 'plus' },
      { id: 'wp20s11', text: 'Az alsó 5-tel több, mint 9.', categoryId: 'plus', figure: <CompareBarsCard top="9" diff={5} kind="more" small /> },
      { id: 'wp20s12', text: 'Nóra 8 gólt lőtt, 4-gyel kevesebbet, mint Soma. Soma?', categoryId: 'plus', figure: <CompareBarsCard top="8" diff={4} kind="more" small /> },
      { id: 'wp20s13', text: 'Az alsó 6-tal kevesebb, mint 15.', categoryId: 'minus', figure: <CompareBarsCard top="15" diff={6} kind="less" small /> },
      { id: 'wp20s14', text: 'Vince 17 kagylót talált, 5-tel többet, mint Flóra. Flóra?', categoryId: 'minus', figure: <CompareBarsCard top="17" diff={5} kind="less" small /> },
      { id: 'wp20s15', text: 'Egyik tálban 16 dió van, a másikban 7-tel kevesebb.', categoryId: 'minus' },
      { id: 'wp20s16', text: '14 szilvát két tálkába egyenlően osztunk.', categoryId: 'half', figure: <EqualPairShareCard total={14} small /> },
      { id: 'wp20s17', text: '18 matricát két testvér ugyanannyira oszt.', categoryId: 'half', figure: <EqualPairShareCard total={18} small /> },
      { id: 'wp20s18', text: '12 korongot két egyforma kupacba rakunk.', categoryId: 'half' },
    ],
  },
  {
    level: 3,
    title: '3. szint: Egy lépés, két lépés vagy hiányzik adat?',
    description: 'Nézd meg jól a történetet: meg tudod oldani, és hány lépésből?',
    categories: [
      { id: 'one', name: 'Egy lépés elég', color: 'sky' },
      { id: 'two', name: 'Két lépés kell', color: 'purple' },
      { id: 'miss', name: 'Hiányzik egy adat', color: 'slate' },
    ],
    items: [
      { id: 'wp20s19', text: '15 almából 7-et megettünk.', categoryId: 'one', figure: <StripCrossCard total={15} gone={7} small /> },
      { id: 'wp20s20', text: '9 sárga és 8 piros virág nyílt ki.', categoryId: 'one' },
      { id: 'wp20s21', text: '17 fős padon már 11-en ülnek. Mennyi üres?', categoryId: 'one' },
      { id: 'wp20s22', text: '20 zsetonból két dolgot veszek. Mennyi marad?', categoryId: 'two', figure: <TokensPurseCard money={20} prices={[7, 5]} small /> },
      { id: 'wp20s23', text: '13 utasból 4 leszállt, majd 6 felszállt.', categoryId: 'two', figure: <TwoStepBusCard onBoard="13" up={6} down={4} small /> },
      { id: 'wp20s24', text: 'Hanga 11 matricát, Rézi 3-mal kevesebbet gyűjtött. Mennyi együtt?', categoryId: 'two' },
      { id: 'wp20s25', text: 'A buszról 6 utas leszállt. Hányan maradtak?', categoryId: 'miss', figure: <TwoStepBusCard onBoard="?" down={6} small /> },
      { id: 'wp20s26', text: 'A polcon 9 könyv van és néhány füzet. Hány darab van összesen?', categoryId: 'miss', figure: <UnknownDataCard known={9} /> },
      { id: 'wp20s27', text: 'Marci 4-gyel több gesztenyét talált, mint Bence. Hányat talált Marci?', categoryId: 'miss' },
    ],
  },
];

export const WORDPROBLEMS20_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WORDPROBLEMS20_G2_SORTER_LEVELS_LIST[0],
  2: WORDPROBLEMS20_G2_SORTER_LEVELS_LIST[1],
  3: WORDPROBLEMS20_G2_SORTER_LEVELS_LIST[2],
};

export const WordProblems20G2Sorter: React.FC<WordProblems20G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c20-szoveges-sorter',
  topicTitle = '6. Szöveges feladatok – Csoportosító',
  ...rest
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : 1);
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Válogasd szét a szöveges feladatokat művelet, csapda és lépésszám szerint!"
      levels={WORDPROBLEMS20_G2_SORTER_LEVELS}
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

export default WordProblems20G2Sorter;
