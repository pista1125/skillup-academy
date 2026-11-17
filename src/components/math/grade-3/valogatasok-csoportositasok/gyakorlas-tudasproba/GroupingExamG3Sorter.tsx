import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { B, Block, blockName } from './GroupingExamG3Parts';
import { OneBlockCard, CardsCard, BallsCard, OutfitCard, PathsCard, ScoopsCard } from './GroupingExamG3CardFigures';

interface GroupingExamG3SorterProps {
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

let uid = 0;
const it = (categoryId: string, text: string, figure?: React.ReactNode): SorterItem => ({ id: `gexs${++uid}`, text, figure, categoryId });
const blk = (categoryId: string, b: Block, asText = false) => (asText ? it(categoryId, blockName(b)) : it(categoryId, '', <OneBlockCard b={b} small />));
const num = (categoryId: string, n: number, card = false) => (card ? it(categoryId, '', <CardsCard digits={String(n).split('')} small />) : it(categoryId, String(n)));

const GROUPING_EXAM_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Nagy? Lyukas?',
    description: 'Nézd meg a méretét és a lyukat! Hová kerül a lap?',
    categories: [
      { id: 'nl', name: 'nagy és lyukas', color: 'emerald' },
      { id: 'nn', name: 'nagy, de nem lyukas', color: 'sky' },
      { id: 'k', name: 'kicsi', color: 'amber' }
    ],
    items: [
      blk('nl', B('piros', 'kor', true, true)),
      blk('nl', B('kek', 'negyzet', true, true)),
      blk('nl', B('sarga', 'haromszog', true, true)),
      blk('nl', B('zold', 'kor', true, true)),
      blk('nl', B('piros', 'haromszog', true, true)),
      blk('nl', B('zold', 'negyzet', true, true), true),
      blk('nl', B('kek', 'kor', true, true), true),
      blk('nl', B('sarga', 'negyzet', true, true), true),
      blk('nl', B('kek', 'haromszog', true, true), true),
      blk('nn', B('piros', 'negyzet', true, false)),
      blk('nn', B('kek', 'kor', true, false)),
      blk('nn', B('zold', 'haromszog', true, false)),
      blk('nn', B('sarga', 'kor', true, false)),
      blk('nn', B('kek', 'haromszog', true, false)),
      blk('nn', B('piros', 'kor', true, false), true),
      blk('nn', B('sarga', 'haromszog', true, false), true),
      blk('nn', B('zold', 'negyzet', true, false), true),
      blk('nn', B('kek', 'negyzet', true, false), true),
      blk('k', B('piros', 'kor', false, true)),
      blk('k', B('kek', 'negyzet', false, false)),
      blk('k', B('sarga', 'haromszog', false, true)),
      blk('k', B('zold', 'kor', false, false)),
      blk('k', B('piros', 'negyzet', false, false)),
      blk('k', B('kek', 'haromszog', false, true), true),
      blk('k', B('zold', 'negyzet', false, true), true),
      blk('k', B('sarga', 'kor', false, false), true),
      blk('k', B('piros', 'haromszog', false, false), true)
    ]
  },
  {
    level: 2,
    title: '2. szint: Hová kerül a halmazábrában?',
    description: 'A két karika: „páros” és „háromjegyű”. Hová kerül a szám?',
    categories: [
      { id: 'ab', name: 'a közös részbe', color: 'purple' },
      { id: 'egy', name: 'csak az egyik karikába', color: 'sky' },
      { id: 'sem', name: 'egyik karikába sem', color: 'amber' }
    ],
    items: [
      num('ab', 124, true),
      num('ab', 300, true),
      num('ab', 456, true),
      num('ab', 208, true),
      num('ab', 110),
      num('ab', 498),
      num('ab', 362),
      num('ab', 250),
      num('ab', 104),
      num('egy', 48, true),
      num('egy', 135, true),
      num('egy', 90, true),
      num('egy', 401, true),
      num('egy', 12),
      num('egy', 333),
      num('egy', 76),
      num('egy', 499),
      num('egy', 205),
      num('sem', 7, true),
      num('sem', 35, true),
      num('sem', 81, true),
      num('sem', 99, true),
      num('sem', 13),
      num('sem', 57),
      num('sem', 1),
      num('sem', 63),
      num('sem', 45)
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány lehetőség?',
    description: 'Számold meg a lehetőségeket! 6-nál kevesebb, pontosan 6, vagy több?',
    categories: [
      { id: 'kev', name: '6-nál kevesebb', color: 'sky' },
      { id: 'hat', name: 'pontosan 6', color: 'emerald' },
      { id: 'tobb', name: '6-nál több', color: 'rose' }
    ],
    items: [
      it('kev', 'Sorba rakod őket.', <BallsCard balls={['piros', 'kek']} small />),
      it('kev', 'Háromjegyű számok', <CardsCard digits={[3, 0, 1]} small />),
      it('kev', 'Öltözetek', <OutfitCard shirts={['piros']} pants={['zold', 'barna', 'lila']} small />),
      it('kev', 'Útvonalak', <PathsCard a={2} b={2} small />),
      it('kev', '2 különböző gombóc, a sorrend mindegy', <ScoopsCard flavours={['rozsa', 'barna', 'sarga']} small />),
      it('kev', '2 gyerek áll sorba.'),
      it('kev', '3 gyerek a dobogón, Levi az első.'),
      it('kev', '4 ízből 1 gombócot kérsz.'),
      it('kev', 'Kétjegyű számok a 7 és a 0 kártyából'),
      it('hat', 'Sorba rakod őket.', <BallsCard balls={['piros', 'kek', 'zold']} small />),
      it('hat', 'Háromjegyű számok', <CardsCard digits={[1, 2, 4]} small />),
      it('hat', 'Öltözetek', <OutfitCard shirts={['piros', 'kek']} pants={['zold', 'barna', 'lila']} small />),
      it('hat', 'Útvonalak', <PathsCard a={3} b={2} small />),
      it('hat', '2 különböző gombóc, a sorrend mindegy', <ScoopsCard flavours={['rozsa', 'barna', 'sarga', 'zold']} small />),
      it('hat', '3 zászlót teszel sorba.'),
      it('hat', '4 barát kezet fog, mindenki mindenkivel.'),
      it('hat', 'Kétjegyű számok a 3, 5, 8 kártyákból'),
      it('hat', '3 könyvet raksz sorba a polcon.'),
      it('tobb', 'Öltözetek', <OutfitCard shirts={['piros', 'kek']} pants={['zold', 'barna', 'lila', 'sarga']} small />),
      it('tobb', 'Útvonalak', <PathsCard a={3} b={3} small />),
      it('tobb', 'Öltözetek', <OutfitCard shirts={['piros', 'kek', 'narancs']} pants={['zold', 'barna', 'lila']} small />),
      it('tobb', 'Útvonalak', <PathsCard a={2} b={4} small />),
      it('tobb', 'Sorba rakod őket.', <BallsCard balls={['piros', 'kek', 'zold', 'sarga']} small />),
      it('tobb', '4 gyerek áll sorba.'),
      it('tobb', '3 póló és 4 nadrág: öltözetek'),
      it('tobb', '5 sapka és 2 sál: hányféle szett?'),
      it('tobb', '4 póló és 2 nadrág: öltözetek')
    ]
  }
];

export const GROUPING_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: GROUPING_EXAM_G3_SORTER_LEVELS_LIST[0],
  2: GROUPING_EXAM_G3_SORTER_LEVELS_LIST[1],
  3: GROUPING_EXAM_G3_SORTER_LEVELS_LIST[2]
};

export const GroupingExamG3Sorter: React.FC<GroupingExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-grp-tudasproba-sorter',
  topicTitle = '4. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Válogass lapokat, számokat és lehetőségeket!"
      levels={GROUPING_EXAM_G3_SORTER_LEVELS}
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

export default GroupingExamG3Sorter;
