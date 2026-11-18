import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import {
  BetweenScene,
  CrossGrid,
  GrowPic,
  HideSeekScene,
  HiveScene,
  LeftRightScene,
  PlaceScene,
  arrowOpt,
  growOpt,
  headOpt,
  hiveOpt,
  iconOpt,
  placeOpt,
} from './TajekozodasG1Scenes';
import { PlacePlayground } from './TajekozodasG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <HideSeekScene />,
    text: 'Bújócskázunk!',
    say: 'Szia! Pötyi vagyok. Ma Zümivel, a méhecskével bújócskázunk. Segíts megtalálni őt! Figyeld ezeket a szavakat: fölött, alatt, mellett, előtt, mögött.',
    mood: 'cheer',
  },
  {
    scene: <PlaceScene pos="folott" />,
    text: 'Zümi a gomba fölött.',
    say: 'Megvan Zümi! A gomba fölött repül. Fölötte, vagyis magasabban van, mint a gomba.',
  },
  {
    text: 'Hol van Zümi alatt?',
    say: 'Zümi most a gomba alá bújt. Melyik képen van Zümi a gomba alatt?',
    task: {
      ask: 'Zümi a gomba alatt. Melyik kép?',
      say: 'Melyik képen van Zümi a gomba alatt?',
      options: [placeOpt('alatt'), placeOpt('folott'), placeOpt('mellett')],
      hint: 'Ott nem a gomba kalapja alatt van. Keresd, ahol a kalap alatt bújik!',
    },
  },
  {
    text: 'Zümi a gomba előtt.',
    say: 'Zümi a gomba mögé bújt, csak egy kicsit látszott ki. Most előbújt, és a gomba elé állt. Melyik képen van Zümi a gomba előtt?',
    task: {
      ask: 'Hol van Zümi a gomba előtt?',
      options: [placeOpt('elott'), placeOpt('mogott'), placeOpt('folott')],
      hint: 'Ott a gomba eltakarja Zümit, vagy fönt van. Előtte egészen látszik!',
    },
  },
  {
    scene: <BetweenScene at="kozott" />,
    text: 'Csigusz a virágok között.',
    say: 'Nézd, ott jön Csigusz, a csiga! A két virág között mászik: egyik virág az egyik oldalán, a másik a másikon.',
  },
  {
    scene: <HiveScene inside />,
    text: 'Kint vagy bent?',
    say: 'Zümi hazarepült. Most bent van a kaptárban. De mindjárt kijön! Melyik képen van Zümi kint?',
    task: { ask: 'Hol van Zümi kint?', options: [hiveOpt(false), hiveOpt(true)], hint: 'Ott Zümi még bent van a házában. Hol repül kint?' },
  },
  {
    scene: <LeftRightScene />,
    text: 'Balra és jobbra.',
    say: 'Emeld fel a jobb kezed! Amerre a jobb kezed van, arra van a jobbra. A másik oldal a balra. A kék nyíl jobbra mutat, a piros nyíl balra.',
  },
  {
    text: 'Melyik hal úszik jobbra?',
    say: 'Két hal úszik a tóban. Melyik úszik jobbra, a jobb kezed felé?',
    task: { ask: 'Melyik hal úszik jobbra?', options: [headOpt('hal', 'right'), headOpt('hal', 'left')], hint: 'Ez a hal a bal kezed felé úszik. Nézd, merre van a feje!' },
  },
  {
    scene: <CrossGrid around={{ up: 'alma', down: 'labda', left: 'virag', right: 'gomba' }} />,
    text: 'Mi van Pötyitől jobbra?',
    say: 'Pötyi középen ül. Fölötte alma, alatta labda van. Mi van Pötyitől jobbra?',
    task: { ask: 'Mi van Pötyitől jobbra?', options: [iconOpt('gomba'), iconOpt('virag'), iconOpt('alma')], hint: 'Az a másik oldalon van. Mutasd a jobb kezeddel!' },
  },
  {
    text: 'Merre mutat a nyíl?',
    say: 'Zümi fölfelé repül, az ég felé. Melyik nyíl mutat fölfelé?',
    task: { ask: 'Melyik nyíl mutat fölfelé?', options: [arrowOpt('up'), arrowOpt('down'), arrowOpt('left'), arrowOpt('right')], hint: 'Fölfelé az ég felé, a fejed teteje felé mutat.' },
  },
  {
    scene: (
      <svg viewBox="0 0 330 110" className="w-full max-w-[400px] h-auto mx-auto">
        <svg x="5" y="5" width="100" height="100" viewBox="0 0 100 100"><GrowPic stage={1} className="" /></svg>
        <svg x="115" y="5" width="100" height="100" viewBox="0 0 100 100"><GrowPic stage={2} className="" /></svg>
        <svg x="225" y="5" width="100" height="100" viewBox="0 0 100 100"><GrowPic stage={3} className="" /></svg>
      </svg>
    ),
    text: 'Előbb és később.',
    say: 'Pötyi elültetett egy magot. Előbb csak a mag volt a földben. Később kibújt egy kis hajtás. Még később virág lett belőle. Melyik volt a legelőbb?',
    task: { ask: 'Mi volt a legelőbb?', options: [growOpt(1), growOpt(2), growOpt(3)], hint: 'A virág csak a végén nyílt ki. Mi volt a földben legelőször?' },
  },
  {
    scene: <PlaceScene pos="mellett" />,
    text: 'Megtaláltad Zümit!',
    say: 'Hurrá! Zümi most a gomba mellett pihen. Mindig megtaláltad. Fölött, alatt, előtt, mögött, között, kint, bent, jobbra, balra. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const TajekozodasG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="6. Tájékozódás"
    storyTitle="Pötyi és Zümi bújócskája"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<PlacePlayground />}
    playgroundTitle="Játszótér: hová tegyem?"
    parentNote="A gyerek a helyzetet kifejező szavakat gyakorolja (fölött, alatt, mellett, előtt, mögött, között, kint, bent), megkülönbözteti a jobbra és balra irányt, a nyilak irányát, és azt, mi történt előbb és később. Otthon is játszhattok: „Tedd a macit az asztal alá!”"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default TajekozodasG1Mese;
