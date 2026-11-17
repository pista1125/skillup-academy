import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { B, Block } from './ArrangementsG3Parts';
import { TowersCard, BallsCard, KidsCard, CardsCard, OutfitCard, PathsCard, ScoopsCard, BlocksCard } from './ArrangementsG3CardFigures';

interface ArrangementsG3SorterProps {
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
const it = (categoryId: string, text: string, figure?: React.ReactNode): SorterItem => ({ id: `ars${++uid}`, text, figure, categoryId });
const tw = (categoryId: string, heights: number[]) => it(categoryId, '', <TowersCard heights={heights} small />);
const bl = (categoryId: string, text: string, blocks: Block[]) => it(categoryId, text, <BlocksCard blocks={blocks} small />);

const ARRANGEMENTS_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen a sorrend?',
    description: 'Balról jobbra nézd! Nő, csökken vagy összevissza?',
    categories: [
      { id: 'nov', name: 'növekvő sorrend', color: 'emerald' },
      { id: 'csokk', name: 'csökkenő sorrend', color: 'sky' },
      { id: 'ossze', name: 'összevissza', color: 'amber' }
    ],
    items: [
      tw('nov', [2, 4, 6]),
      tw('nov', [1, 3, 4, 7]),
      tw('nov', [3, 5, 6]),
      tw('nov', [1, 2, 5]),
      it('nov', '45, 120, 302'),
      it('nov', '199, 200, 201'),
      it('nov', '98, 189, 410'),
      it('nov', '250, 255, 260, 265'),
      it('nov', '7, 70, 407'),
      tw('csokk', [6, 4, 1]),
      tw('csokk', [7, 5, 3, 2]),
      tw('csokk', [5, 3, 2]),
      tw('csokk', [6, 5, 2, 1]),
      it('csokk', '500, 450, 400'),
      it('csokk', '321, 312, 231'),
      it('csokk', '160, 106, 61'),
      it('csokk', '480, 408, 84'),
      it('csokk', '299, 290, 209'),
      tw('ossze', [3, 6, 2]),
      tw('ossze', [5, 2, 4, 7]),
      tw('ossze', [2, 5, 1]),
      tw('ossze', [4, 1, 6]),
      it('ossze', '120, 102, 210'),
      it('ossze', '330, 303, 333'),
      it('ossze', '45, 54, 50'),
      it('ossze', '401, 410, 140'),
      it('ossze', '88, 188, 18')
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány lehetőség?',
    description: 'Számold meg a lehetőségeket! Hányféle?',
    categories: [
      { id: 'k2', name: '2 lehetőség', color: 'sky' },
      { id: 'k4', name: '4 lehetőség', color: 'amber' },
      { id: 'k6', name: '6 lehetőség', color: 'emerald' }
    ],
    items: [
      it('k2', 'Sorba rakod őket.', <BallsCard balls={['piros', 'kek']} small />),
      it('k2', 'Sorba állnak.', <KidsCard kids={['lila', 'zold']} small />),
      it('k2', 'Kétjegyű számok', <CardsCard digits={[4, 7]} small />),
      it('k2', 'Öltözetek', <OutfitCard shirts={['piros', 'kek']} pants={['barna']} small />),
      it('k2', 'Útvonalak', <PathsCard a={1} b={2} small />),
      it('k2', '3 gyerek áll sorba. Bence mindig az első.'),
      it('k2', 'Az 1, 4, 2 kártyákból háromjegyű szám, az 1-es áll elöl.'),
      it('k2', '3 golyó sorban, a piros mindig középen.'),
      it('k2', 'Kétjegyű számok a 6 és a 9 kártyából'),
      it('k4', 'Öltözetek', <OutfitCard shirts={['zold', 'sarga']} pants={['kek', 'lila']} small />),
      it('k4', 'Háromjegyű számok', <CardsCard digits={[2, 0, 4]} small />),
      it('k4', 'Háromjegyű számok', <CardsCard digits={[1, 0, 3]} small />),
      it('k4', 'Útvonalak', <PathsCard a={2} b={2} small />),
      it('k4', '1 gombócot kérsz.', <ScoopsCard flavours={['rozsa', 'barna', 'sarga', 'zold']} small />),
      it('k4', '3 gyerek a dobogón. Hanna nem lehet első.'),
      it('k4', 'Az 1, 4, 6 kártyákból 500-nál kisebb háromjegyű számok'),
      it('k4', '2 sapka és 2 sál: hányféle szett?'),
      it('k4', 'Háromjegyű számok a 4, 0, 1 kártyákból'),
      it('k6', 'Sorba rakod őket.', <BallsCard balls={['piros', 'kek', 'zold']} small />),
      it('k6', 'Sorba állnak.', <KidsCard kids={['lila', 'zold', 'narancs']} small />),
      it('k6', 'Háromjegyű számok', <CardsCard digits={[1, 2, 3]} small />),
      it('k6', 'Öltözetek', <OutfitCard shirts={['piros', 'kek']} pants={['zold', 'barna', 'lila']} small />),
      it('k6', 'Útvonalak', <PathsCard a={3} b={2} small />),
      it('k6', 'Kétjegyű számok a 2, 5, 7 kártyákból'),
      it('k6', '3 póló és 2 nadrág: hányféle öltözet?'),
      it('k6', '4 gyerekből 2 lesz ügyeletes.'),
      it('k6', '3 zászlót teszel sorba a falon.')
    ]
  },
  {
    level: 3,
    title: '3. szint: Mindegyik, van olyan, egyik sem',
    description: 'Olvasd el a kérdést! Igaz mindegyikre, csak néhányra, vagy egyikre sem?',
    categories: [
      { id: 'mind', name: 'Mindegyikre igaz', color: 'emerald' },
      { id: 'van', name: 'Van olyan, de nem mind', color: 'amber' },
      { id: 'sem', name: 'Egyikre sem igaz', color: 'rose' }
    ],
    items: [
      bl('mind', 'piros?', [B('piros', 'kor', true, true), B('piros', 'negyzet', false, false), B('piros', 'haromszog', true, false)]),
      bl('mind', 'kör?', [B('kek', 'kor', true, false), B('sarga', 'kor', false, true), B('zold', 'kor', true, true)]),
      bl('mind', 'lyukas?', [B('zold', 'negyzet', true, true), B('piros', 'haromszog', true, true), B('kek', 'kor', false, true)]),
      bl('mind', 'nagy?', [B('sarga', 'haromszog', true, false), B('kek', 'negyzet', true, true), B('piros', 'kor', true, false)]),
      bl('mind', 'kicsi?', [B('zold', 'negyzet', false, false), B('piros', 'kor', false, true), B('kek', 'haromszog', false, false)]),
      it('mind', 'páros? 14, 230, 408'),
      it('mind', 'háromjegyű? 105, 340, 499'),
      it('mind', '300-nál kisebb? 99, 210, 299'),
      it('mind', 'kerek tízes? 40, 170, 360'),
      bl('van', 'piros?', [B('piros', 'kor', true, false), B('kek', 'kor', true, false), B('piros', 'negyzet', true, true)]),
      bl('van', 'lyukas?', [B('kek', 'kor', true, true), B('kek', 'negyzet', true, false), B('zold', 'haromszog', true, true)]),
      bl('van', 'háromszög?', [B('sarga', 'haromszog', true, false), B('kek', 'haromszog', false, false), B('sarga', 'kor', true, false)]),
      bl('van', 'nagy?', [B('zold', 'negyzet', true, false), B('zold', 'kor', false, false), B('kek', 'kor', true, true)]),
      bl('van', 'négyzet?', [B('sarga', 'negyzet', false, true), B('piros', 'negyzet', true, false), B('zold', 'kor', false, false)]),
      it('van', 'páratlan? 21, 46, 135'),
      it('van', 'háromjegyű? 98, 100, 250'),
      it('van', 'kerek százas? 200, 250, 400'),
      it('van', '400-nál nagyobb? 399, 401, 340'),
      bl('sem', 'piros?', [B('kek', 'kor', true, false), B('zold', 'negyzet', true, true), B('sarga', 'haromszog', true, false)]),
      bl('sem', 'lyukas?', [B('piros', 'kor', true, false), B('sarga', 'negyzet', true, false), B('kek', 'haromszog', false, false)]),
      bl('sem', 'háromszög?', [B('piros', 'kor', true, true), B('kek', 'negyzet', true, false), B('sarga', 'kor', false, false)]),
      bl('sem', 'nagy?', [B('zold', 'kor', false, true), B('piros', 'negyzet', false, false), B('kek', 'haromszog', false, true)]),
      bl('sem', 'kör?', [B('piros', 'negyzet', true, true), B('zold', 'haromszog', true, false), B('kek', 'negyzet', false, false)]),
      it('sem', 'páros? 15, 237, 409'),
      it('sem', 'kétjegyű? 102, 7, 350'),
      it('sem', '100-nál kisebb? 120, 305, 499'),
      it('sem', 'kerek tízes? 45, 132, 401')
    ]
  }
];

export const ARRANGEMENTS_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ARRANGEMENTS_G3_SORTER_LEVELS_LIST[0],
  2: ARRANGEMENTS_G3_SORTER_LEVELS_LIST[1],
  3: ARRANGEMENTS_G3_SORTER_LEVELS_LIST[2]
};

export const ArrangementsG3Sorter: React.FC<ArrangementsG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-grp-lehetosegek-sorter',
  topicTitle = '3. Sorba rendezés és lehetőségek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="sorba-rendezes-lehetosegek"
      title={topicTitle}
      subtitle="Nézd meg a sorrendet, számold meg a lehetőségeket, és válogass!"
      levels={ARRANGEMENTS_G3_SORTER_LEVELS}
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

export default ArrangementsG3Sorter;
