import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { ICONS, IconName } from '../../shared/G1Pics';
import {
  Arrow,
  CrossGrid,
  Dir,
  FishFoodScene,
  GrowPic,
  PlaceScene,
  Pos,
  RowScene,
  Who,
  arrowOpt,
  betweenOpt,
  drawIcon,
  growOpt,
  headOpt,
  hiveOpt,
  iconName,
  iconOpt,
  placeOpt,
  POS_SAY,
  WHO_SAY,
  DIR_SAY,
} from './TajekozodasG1Scenes';

const GRID = { up: 'alma', down: 'labda', left: 'virag', right: 'gomba' } as const;

/** Két ikon egy kártyán (a „mi cserélt helyet?” kérdéshez). */
const twoOpt = (a: IconName, b: IconName) => ({
  figure: (
    <svg viewBox="0 0 120 70">
      <rect x="3" y="3" width="114" height="64" rx="14" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {ICONS[a]({ x: 34, y: 35, s: 1.2 })}
      {ICONS[b]({ x: 86, y: 35, s: 1.2 })}
    </svg>
  ),
  say: `${iconName(a)} és ${iconName(b)}`,
});

const twoAnimals = (p1: Pos, p2: Pos) => ({
  figure: <PlaceScene pos={p1} who="meh" second={{ pos: p2, who: 'csiga' }} />,
  say: `Zümi ${POS_SAY[p1]}, Csigusz ${POS_SAY[p2]}`,
});

export const TAJEKOZODAS_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – fölött, alatt, kint, bent, nyilak
  { id: 't1', level: 1, badge: 'Fölött, alatt', ask: 'Hol van Zümi a gomba fölött?', say: 'Melyik képen van Zümi a gomba fölött?', options: [placeOpt('folott'), placeOpt('alatt'), placeOpt('mellett')], hint: 'Fölött azt jelenti: magasabban, a gomba teteje fölött.' },
  { id: 't2', level: 1, badge: 'Fölött, alatt', ask: 'Hol van Csigusz a gomba alatt?', say: 'Melyik képen van Csigusz a gomba alatt?', options: [placeOpt('alatt', 'csiga'), placeOpt('folott', 'csiga'), placeOpt('mellett', 'csiga')], hint: 'Alatt azt jelenti: a gomba kalapja alá bújt.' },
  { id: 't3', level: 1, badge: 'Irányok', ask: 'Melyik nyíl mutat fölfelé?', options: [arrowOpt('up'), arrowOpt('down'), arrowOpt('right')], hint: 'Fölfelé az ég felé mutat.' },
  { id: 't4', level: 1, badge: 'Irányok', ask: 'Melyik nyíl mutat lefelé?', options: [arrowOpt('down'), arrowOpt('up'), arrowOpt('left')], hint: 'Lefelé a föld felé, a lábad felé mutat.' },
  { id: 't5', level: 1, badge: 'Kint, bent', ask: 'Hol van Zümi bent?', say: 'Melyik képen van Zümi bent a kaptárban?', options: [hiveOpt(true), hiveOpt(false)], hint: 'Ott kint repül. Hol bújt be a házába?' },
  { id: 't6', level: 1, badge: 'Között', ask: 'Hol van Csigusz a virágok között?', say: 'Melyik képen mászik Csigusz a két virág között?', options: [betweenOpt('kozott'), betweenOpt('bal'), betweenOpt('jobb')], hint: 'Között azt jelenti: egyik virág az egyik oldalán, a másik a másikon.' },
  { id: 't7', level: 1, badge: 'Jobbra, balra', ask: 'Melyik hal úszik jobbra?', say: 'Melyik hal úszik jobbra, a jobb kezed felé?', options: [headOpt('hal', 'right'), headOpt('hal', 'left')], hint: 'Nézd, merre van a hal feje! Jobbra a jobb kezed felé.' },
  { id: 't8', level: 1, badge: 'Irányok', ask: 'Melyik nyíl mutat jobbra?', options: [arrowOpt('right'), arrowOpt('left'), arrowOpt('up')], hint: 'Emeld fel a jobb kezed! Arra mutasson a nyíl.' },
  // 2. szint – előtt, mögött, mellett, lépegető, előbb-később
  { id: 't9', level: 2, badge: 'Előtt, mögött', ask: 'Hol van Zümi a gomba előtt?', say: 'Melyik képen van Zümi a gomba előtt?', options: [placeOpt('elott'), placeOpt('mogott'), placeOpt('mellett')], hint: 'Előtte egészen látszik, és közelebb van hozzád.' },
  { id: 't10', level: 2, badge: 'Előtt, mögött', ask: 'Hol bújt Zümi a gomba mögé?', say: 'Melyik képen bújt Zümi a gomba mögé?', options: [placeOpt('mogott'), placeOpt('elott'), placeOpt('folott')], hint: 'Mögötte csak egy kicsit látszik ki, a gomba eltakarja.' },
  { id: 't11', level: 2, badge: 'Lépegető', ask: 'Mi van Pötyi fölött?', scene: <CrossGrid around={GRID} />, options: [iconOpt('alma'), iconOpt('labda'), iconOpt('virag')], hint: 'Fölötte azt jelenti: Pötyi feje fölött, fönt.' },
  { id: 't12', level: 2, badge: 'Lépegető', ask: 'Mi van Pötyitől balra?', scene: <CrossGrid around={GRID} />, options: [iconOpt('virag'), iconOpt('gomba'), iconOpt('labda')], hint: 'Balra a bal kezed felé van. Melyik oldal az?' },
  { id: 't13', level: 2, badge: 'Jobbra, balra', ask: 'Melyik csiga mászik balra?', say: 'Melyik csiga mászik balra, a bal kezed felé?', options: [headOpt('csiga', 'left'), headOpt('csiga', 'right')], hint: 'Nézd, merre van a csiga feje és szarva!' },
  { id: 't14', level: 2, badge: 'Előbb, később', ask: 'Mi volt a legelőbb?', say: 'A magból virág lesz. Melyik volt a legelőbb?', options: [growOpt(1), growOpt(2), growOpt(3)], hint: 'A virág a végén nyílik ki. Mi volt legelőször a földben?' },
  { id: 't15', level: 2, badge: 'Mellett', ask: 'Hol van Zümi a gomba mellett?', say: 'Melyik képen pihen Zümi a gomba mellett?', options: [placeOpt('mellett'), placeOpt('alatt'), placeOpt('folott')], hint: 'Mellette azt jelenti: az oldalánál, a földön.' },
  { id: 't16', level: 2, badge: 'Irányok', ask: 'Melyik nyíl mutat balra?', options: [arrowOpt('left'), arrowOpt('right'), arrowOpt('down'), arrowOpt('up')], hint: 'Emeld fel a bal kezed! Arra mutasson a nyíl.' },
  // 3. szint – sorrend, lépés, változás, két dolog egyszerre
  { id: 't17', level: 3, badge: 'Között', ask: 'Mi van a labda és a virág között?', scene: <RowScene icons={['labda', 'alma', 'virag', 'gomba']} />, options: [iconOpt('alma'), iconOpt('gomba'), iconOpt('csillag')], hint: 'Keresd meg a labdát és a virágot! Mi van a kettő között?' },
  { id: 't18', level: 3, badge: 'Jobbra, balra', ask: 'Mi van a csillagtól jobbra?', scene: <RowScene icons={['hal', 'csillag', 'eper']} />, options: [iconOpt('eper'), iconOpt('hal'), iconOpt('alma')], hint: 'Az a csillagtól balra van. A jobb kezed felé nézz!' },
  { id: 't19', level: 3, badge: 'Lépegető', ask: 'Pötyi lép egyet fölfelé. Mit talál?', say: 'Pötyi lép egyet fölfelé. Mit talál ott?', scene: <CrossGrid around={GRID} />, options: [iconOpt('alma'), iconOpt('labda'), iconOpt('gomba')], hint: 'Fölfelé lépett, nem lefelé. Mi van fönt?' },
  { id: 't20', level: 3, badge: 'Lépegető', ask: 'Pötyi lép egyet balra. Mit talál?', say: 'Pötyi lép egyet balra. Mit talál ott?', scene: <CrossGrid around={GRID} />, options: [iconOpt('virag'), iconOpt('gomba'), iconOpt('alma')], hint: 'Az jobbra van. Balra a bal kezed felé!' },
  {
    id: 't21',
    level: 3,
    badge: 'Mi változott?',
    ask: 'Mi cserélt helyet?',
    say: 'Fent az első sor, lent a második. Melyik kettő cserélt helyet?',
    scene: (
      <svg viewBox="0 0 260 210" className="w-full max-w-[300px] h-auto mx-auto">
        <svg x="0" y="0" width="260" height="100" viewBox="0 0 260 100"><RowScene icons={['csillag', 'labda', 'alma']} className="" /></svg>
        <svg x="0" y="110" width="260" height="100" viewBox="0 0 260 100"><RowScene icons={['alma', 'labda', 'csillag']} className="" /></svg>
      </svg>
    ),
    options: [twoOpt('csillag', 'alma'), twoOpt('labda', 'alma'), twoOpt('labda', 'csillag')],
    hint: 'A labda középen maradt. Mi került a másik szélre?',
  },
  { id: 't22', level: 3, badge: 'Előbb, később', ask: 'Mi lesz belőle később?', say: 'Ez egy kis hajtás. Mi lesz belőle később?', scene: <GrowPic stage={2} className="w-32 h-32 mx-auto" />, options: [growOpt(3), growOpt(1)], hint: 'A mag volt előbb. Később mi nyílik ki?' },
  { id: 't23', level: 3, badge: 'Fölött, alatt', ask: 'Zümi fölött, Csigusz alatt. Melyik kép?', say: 'Melyik képen van Zümi a gomba fölött, és Csigusz a gomba alatt?', options: [twoAnimals('folott', 'alatt'), twoAnimals('alatt', 'folott'), twoAnimals('folott', 'mellett')], hint: 'Mindkettőt nézd meg! Zümi legyen fönt, Csigusz a kalap alatt.' },
  { id: 't24', level: 3, badge: 'Irányok', ask: 'Merre ússzon a hal az eleségért?', say: 'A hal éhes. Merre ússzon, hogy elérje az eleséget?', scene: <FishFoodScene foodRight />, options: [arrowOpt('right'), arrowOpt('left'), arrowOpt('up')], hint: 'Nézd meg, hol van az eleség! Arra ússzon.' },
];

const dirCard = (dir: Dir) => {
  const rot = { up: -90, down: 90, left: 0, right: 0 }[dir];
  return {
    figure: (
      <svg viewBox="0 0 100 80" className="w-24 h-20">
        <rect x="2" y="2" width="96" height="76" rx="14" fill="#e0f2fe" stroke="#94a3b8" strokeWidth="3" />
        {drawIcon('madar', 50, 40, 1.4, { rotate: rot, flip: dir === 'left' })}
      </svg>
    ),
    say: `${DIR_SAY[dir]} repülő madár`,
  };
};

const gridCard = (dir: Dir) => ({ figure: <CrossGrid around={{ [dir]: 'alma' } as Partial<Record<Dir, IconName>>} className="w-24 h-24" />, say: `az alma Pötyitől ${DIR_SAY[dir]}` });

export const TAJEKOZODAS_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Merre repül a madár? Keresd meg a nyilat, amelyik arra mutat!',
    pairs: (['up', 'down', 'left', 'right'] as Dir[]).map((d) => ({ a: dirCard(d), b: { figure: <Arrow dir={d} className="w-16 h-16" />, say: `${DIR_SAY[d]} mutató nyíl` } })),
  },
  2: {
    say: 'Hol van Zümi? Keresd meg, hol van Csigusz ugyanott!',
    pairs: (['folott', 'alatt', 'mellett', 'elott'] as Pos[]).map((p) => ({
      a: { figure: <PlaceScene pos={p} who="meh" className="w-28 h-auto" />, say: `${WHO_SAY.meh} ${POS_SAY[p]}` },
      b: { figure: <PlaceScene pos={p} who="csiga" className="w-28 h-auto" />, say: `${WHO_SAY.csiga} ${POS_SAY[p]}` },
    })),
  },
  3: {
    say: 'Merre van az alma Pötyitől? Párosítsd azzal a nyíllal, amelyik arra mutat!',
    pairs: (['up', 'down', 'left', 'right'] as Dir[]).map((d) => ({ a: gridCard(d), b: { figure: <Arrow dir={d} className="w-16 h-16" />, say: `${DIR_SAY[d]} mutató nyíl` } })),
  },
};

const placeItem = (pos: Pos, who: Who) => ({ figure: <PlaceScene pos={pos} who={who} className="w-full h-auto" />, say: `${WHO_SAY[who]} ${POS_SAY[pos]}` });

export const TAJEKOZODAS_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'A gomba fölött vagy a gomba alatt van az állat? Tedd a jó kosárba!',
    bins: [
      { label: 'Fölött', figure: <Arrow dir="up" className="w-12 h-12" />, say: 'fölött' },
      { label: 'Alatt', figure: <Arrow dir="down" className="w-12 h-12" />, say: 'alatt' },
    ],
    items: (['meh', 'csiga', 'katica'] as Who[]).flatMap((w) => [
      { item: placeItem('folott', w), bin: 0 },
      { item: placeItem('alatt', w), bin: 1 },
    ]),
  },
  2: {
    say: 'Balra vagy jobbra megy? Nézd meg, merre van a feje!',
    bins: [
      { label: 'Balra', figure: <Arrow dir="left" color="#dc2626" className="w-12 h-12" />, say: 'balra' },
      { label: 'Jobbra', figure: <Arrow dir="right" color="#2563eb" className="w-12 h-12" />, say: 'jobbra' },
    ],
    items: (['hal', 'csiga', 'madar', 'meh'] as IconName[]).flatMap((ic) => [
      { item: headOpt(ic, 'left'), bin: 0 },
      { item: headOpt(ic, 'right'), bin: 1 },
    ]),
  },
  3: {
    say: 'Előtt, mögött vagy mellett? Hol van az állat a gombához képest?',
    bins: [
      { label: 'Előtt', say: 'a gomba előtt' },
      { label: 'Mögött', say: 'a gomba mögött' },
      { label: 'Mellett', say: 'a gomba mellett' },
    ],
    items: (['meh', 'csiga', 'katica'] as Who[]).flatMap((w) => [
      { item: placeItem('elott', w), bin: 0 },
      { item: placeItem('mogott', w), bin: 1 },
      { item: placeItem('mellett', w), bin: 2 },
    ]),
  },
};

export const TajekozodasG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="6. Tájékozódás"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • JÁTÉK"
    base="g1-prep-tajekozodas"
    chapterId="elokeszito-idoszak"
    questions={TAJEKOZODAS_G1_QUESTIONS}
    pairs={TAJEKOZODAS_G1_PAIRS}
    sort={TAJEKOZODAS_G1_SORT}
    {...props}
  />
);

export default TajekozodasG1Jatek;
