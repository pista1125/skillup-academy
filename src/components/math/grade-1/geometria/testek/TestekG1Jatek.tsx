import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign } from '../../shared/G1Pics';
import { line } from '../vonalak/VonalakG1Scenes';
import { shp } from '../sikidomok/SikidomokG1Scenes';
import {
  BlockWallScene,
  FeelySackScene,
  GateScene,
  LooseCubesScene,
  SolidFig,
  SolidRowScene,
  TowersScene,
  flat,
  obj,
  solid,
  tower,
} from './TestekG1Scenes';

const Y = '#facc15';
const B = '#3b82f6';

export const TESTEK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – test vagy síkidom, gurul-e, kocka, számlálás
  { id: 't1', level: 1, badge: 'Kocka', ask: 'Melyik a kocka?', options: [solid('kocka', Y), solid('teglatest', Y), solid('gomb', Y)], hint: 'A kocka minden lapja egyforma négyzet, mint a dobókockáé.' },
  { id: 't2', level: 1, badge: 'Gurul', ask: 'Melyik gurul?', options: [solid('gomb', B), solid('kocka', B), solid('gula', B)], hint: 'Ennek lapos oldalai és sarkai vannak. Melyik gömbölyű?' },
  { id: 't3', level: 1, badge: 'Nem gurul', ask: 'Melyik NEM gurul?', options: [solid('kocka', '#22c55e'), solid('gomb', '#22c55e'), solid('fekvohenger', '#22c55e')], hint: 'Ez gömbölyű, ez gurul. Melyiknek vannak sarkai?' },
  { id: 't4', level: 1, badge: 'Torony', ask: 'Hány kockából épült a torony?', scene: <TowersScene heights={[3]} className="w-32 h-auto mx-auto" />, options: [3, 2, 4], hint: 'Mutass rá mindegyik kockára alulról felfelé!' },
  { id: 't5', level: 1, badge: 'Test vagy síkidom', ask: 'Melyik a test?', say: 'Melyik test? Melyiket tudod kézbe venni és egymásra rakni?', options: [solid('kocka', '#ef4444'), flat('negyzet', '#ef4444'), flat('kor', '#ef4444')], hint: 'Ez lapos, mint a papír. Melyik nem lapos?' },
  { id: 't6', level: 1, badge: 'Testek a tárgyakban', ask: 'Melyik test olyan, mint a labda?', scene: <svg viewBox="0 0 80 80" className="w-24 h-24 mx-auto"><circle cx="40" cy="40" r="30" fill="#fff" stroke="#1e293b" strokeWidth="3" /><path d="M40 10 V70 M10 40 H70" stroke="#ef4444" strokeWidth="5" /></svg>, options: [solid('gomb', '#a855f7'), solid('kocka', '#a855f7'), solid('kup', '#a855f7')], hint: 'A labda gömbölyű, nincs sarka.' },
  { id: 't7', level: 1, badge: 'Magasabb torony', ask: 'Melyik torony magasabb?', options: [tower(5), tower(2)], hint: 'Melyik ér feljebb? Számold meg a kockákat!' },
  { id: 't8', level: 1, badge: 'Számlálás', ask: 'Hány kocka van a fűben?', scene: <LooseCubesScene n={5} />, options: [5, 4, 6], hint: 'Mutass rá mindegyik kockára, és számold!' },
  // 2. szint – építmények, tapintás, tárgyak
  { id: 't9', level: 2, badge: 'Építmény', ask: 'Hány elemből épült a kapu?', scene: <GateScene />, options: [4, 3, 5], hint: 'A tetőt is számold! Mutass rá mindegyik elemre!' },
  { id: 't10', level: 2, badge: 'Építmény', ask: 'Hány kockából épült?', say: 'Hány kockából épült ez a fal?', scene: <BlockWallScene cols={2} rows={3} />, options: [6, 3, 5], hint: 'Két oszlop van. Számold meg az egyiket, aztán a másikat is!' },
  { id: 't11', level: 2, badge: 'Tapintás', ask: 'Mi lehet a zsákban?', say: 'Csigusz a zsákba nyúl. Gömbölyű, nincs sarka, és gurul. Mi lehet az?', scene: <FeelySackScene />, options: [obj('labda'), obj('dobokocka'), obj('ajandek')], hint: 'Ennek sarkai vannak. Melyik gömbölyű?' },
  { id: 't12', level: 2, badge: 'Tapintás', ask: 'Mi lehet a zsákban?', say: 'Most sarkai vannak, és minden oldala egyforma négyzet. Mi lehet az?', scene: <FeelySackScene />, options: [obj('dobokocka'), obj('labda'), obj('pohar')], hint: 'Ez gömbölyű. Melyiknek van sok sarka és egyforma lapja?' },
  { id: 't13', level: 2, badge: 'Testek a tárgyakban', ask: 'Melyik olyan, mint ez a test?', say: 'Melyik tárgy olyan alakú, mint ez a test?', scene: <SolidFig k="henger" color="#22c55e" className="w-28 h-28 mx-auto" />, options: [obj('pohar'), obj('labda'), obj('ajandek')], hint: 'A test alja és teteje kerek, és egyenesen áll. Melyik tárgy ilyen?' },
  { id: 't14', level: 2, badge: 'Testek a tárgyakban', ask: 'Melyik olyan, mint a kocka?', scene: <SolidFig k="kocka" color={Y} className="w-28 h-28 mx-auto" />, options: [obj('dobokocka'), obj('sapka'), obj('labda')], hint: 'A kocka minden lapja egyforma négyzet. Melyik tárgy ilyen?' },
  { id: 't15', level: 2, badge: 'Építés', ask: 'Melyik tetejére nem tehetsz kockát?', say: 'Melyik test tetejére nem tudsz kockát rakni, mert leesne?', options: [solid('kup', '#f97316'), solid('kocka', '#f97316'), solid('teglatest', '#f97316')], hint: 'Ennek lapos teteje van, ide jól rátehető a kocka. Melyik hegyes?' },
  { id: 't16', level: 2, badge: 'Torony', ask: 'Melyik torony illik a számhoz?', scene: <BigSign text="4" className="w-20 h-20 mx-auto" />, options: [tower(4), tower(3), tower(5)], hint: 'Számold meg a kockákat mindegyik toronyban!' },
  // 3. szint – két lépés, csoportosítás
  { id: 't17', level: 3, badge: 'Tornyok', ask: 'Hány kocka kell összesen?', say: 'Az alaprajzon a számok mutatják, hány kocka van a tornyokban. Hány kocka kell összesen?', scene: <TowersScene heights={[1, 3, 2]} numbers hideTowers className="w-64 h-auto mx-auto" />, options: [6, 5, 4], hint: 'Add össze a számokat: 1, meg 3, meg 2.' },
  { id: 't18', level: 3, badge: 'Tornyok', ask: 'Melyik szám a legmagasabb toronyé?', say: 'Melyik szám mutatja a legmagasabb tornyot?', scene: <TowersScene heights={[2, 4, 3]} numbers hideTowers className="w-64 h-auto mx-auto" />, options: [4, 3, 2], hint: 'Amelyikben a legtöbb kocka van, az a legmagasabb.' },
  { id: 't19', level: 3, badge: 'Melyik nem illik', ask: 'Melyik nem illik a többi közé?', say: 'Három test és egy lapos forma. Melyik nem illik közéjük?', options: [flat('kor', '#a855f7'), solid('gomb', '#a855f7'), solid('kocka', '#a855f7'), solid('henger', '#a855f7')], hint: 'Ezt kézbe veheted. Melyik lapos, mint a papír?' },
  { id: 't20', level: 3, badge: 'Melyik nem illik', ask: 'Melyik nem illik a többi közé?', say: 'Három lapos síkidom és egy test. Melyik nem illik közéjük?', options: [solid('kocka', B), flat('negyzet', B), flat('haromszog', B), flat('kor', B)], hint: 'Ez lapos síkidom. Melyik nem lapos?' },
  { id: 't21', level: 3, badge: 'Torony', ask: 'Hány kocka marad a tornyon?', say: 'Pötyi tornyában 4 kocka volt. Zümi levett 1 kockát. Hány kocka maradt?', scene: <TowersScene heights={[4]} className="w-32 h-auto mx-auto" />, options: [3, 5, 4], hint: 'Ha leveszünk egyet, kevesebb lesz.' },
  { id: 't22', level: 3, badge: 'Torony', ask: 'Milyen magas lesz a torony?', say: 'Csigusz egy 3 kockás tornyot rak egy 2 kockás toronyra. Hány kockás lesz?', scene: <TowersScene heights={[3, 2]} className="w-44 h-auto mx-auto" />, options: [5, 4, 6], hint: 'Számold meg az összes kockát mindkét toronyban!' },
  { id: 't23', level: 3, badge: 'Gurul', ask: 'Hány test gurul?', say: 'Hány test gurul a képen?', scene: <SolidRowScene items={[{ k: 'gomb' }, { k: 'kocka' }, { k: 'fekvohenger' }, { k: 'teglatest' }, { k: 'gomb' }]} />, options: [3, 2, 5], hint: 'A gömbölyűek gurulnak. A fekvő konzervdoboz alakú is!' },
  { id: 't24', level: 3, badge: 'Építmény', ask: 'Hány kockából épült?', say: 'Hány kockából épült ez a fal? Két oszlop, mindegyikben 4 kocka.', scene: <BlockWallScene cols={2} rows={4} />, options: [8, 4, 6], hint: 'Számold meg az egyik oszlopot, aztán folytasd a másikkal!' },
];

export const TESTEK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Melyik tárgy olyan, mint a test? Párosítsd!',
    pairs: [
      { a: solid('gomb', '#ef4444'), b: obj('labda') },
      { a: solid('kocka', '#ef4444'), b: obj('dobokocka') },
      { a: solid('henger', '#ef4444'), b: obj('pohar') },
      { a: solid('kup', '#ef4444'), b: obj('sapka') },
    ],
  },
  2: {
    say: 'Hány kockából épült a torony? Párosítsd a számmal!',
    pairs: [
      { a: tower(2), b: 2 },
      { a: tower(3), b: 3 },
      { a: tower(5), b: 5 },
      { a: tower(4), b: 4 },
    ],
  },
  3: {
    say: 'Ha a testet papírra teszed, és körberajzolod az alját, milyen síkidomot kapsz? Párosítsd!',
    pairs: [
      { a: solid('kocka', Y), b: shp('negyzet', '#3b82f6') },
      { a: solid('henger', Y), b: shp('kor', '#3b82f6') },
      { a: solid('teglatest', Y), b: shp('teglalap', '#3b82f6') },
      { a: solid('teto', Y, 'tető alakú test, a végével lefelé'), b: shp('haromszog', '#3b82f6') },
    ],
  },
};

export const TESTEK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Test vagy lapos síkidom? Tedd a jó kosárba!',
    bins: [
      { label: 'Test', figure: <SolidFig k="kocka" color={Y} className="w-12 h-12" frame={false} />, say: 'test' },
      { label: 'Síkidom', figure: <svg viewBox="0 0 60 60" className="w-12 h-12"><rect x="12" y="12" width="36" height="36" fill={Y} stroke="#a16207" strokeWidth="3" /></svg>, say: 'lapos síkidom' },
    ],
    items: [
      { item: solid('kocka', '#ef4444'), bin: 0 },
      { item: flat('negyzet', '#ef4444'), bin: 1 },
      { item: solid('gomb', '#22c55e'), bin: 0 },
      { item: flat('kor', '#22c55e'), bin: 1 },
      { item: solid('henger', B), bin: 0 },
      { item: flat('haromszog', B), bin: 1 },
      { item: solid('teglatest', '#a855f7'), bin: 0 },
      { item: flat('teglalap', '#a855f7'), bin: 1 },
    ],
  },
  2: {
    say: 'Gurul vagy nem gurul? Tedd a jó kosárba!',
    bins: [
      { label: 'Gurul', figure: <SolidFig k="gomb" color="#ef4444" className="w-12 h-12" frame={false} />, say: 'gurul' },
      { label: 'Nem gurul', figure: <SolidFig k="kocka" color={Y} className="w-12 h-12" frame={false} />, say: 'nem gurul' },
    ],
    items: [
      { item: solid('gomb', B), bin: 0 },
      { item: solid('kocka', B), bin: 1 },
      { item: solid('fekvohenger', B), bin: 0 },
      { item: solid('teglatest', B), bin: 1 },
      { item: obj('labda'), bin: 0 },
      { item: obj('dobokocka'), bin: 1 },
      { item: solid('gula', B), bin: 1 },
      { item: obj('ajandek'), bin: 1 },
    ],
  },
  3: {
    say: 'Vonal, síkidom vagy test? Tedd a jó zsákba!',
    bins: [
      { label: 'Vonal', say: 'vonalak' },
      { label: 'Síkidom', say: 'síkidomok' },
      { label: 'Test', say: 'testek' },
    ],
    items: [
      { item: line('hullam', '#db2777'), bin: 0 },
      { item: line('egyenes', '#db2777'), bin: 0 },
      { item: shp('haromszog', '#22c55e'), bin: 1 },
      { item: shp('kor', '#22c55e'), bin: 1 },
      { item: shp('teglalap', '#22c55e'), bin: 1 },
      { item: solid('kocka', Y), bin: 2 },
      { item: solid('henger', Y), bin: 2 },
      { item: solid('gula', Y), bin: 2 },
      { item: line('csigavonal', '#db2777'), bin: 0 },
    ],
  },
};

export const TestekG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="3. Testek"
    badge="1. OSZTÁLY • IV. GEOMETRIA • JÁTÉK"
    base="g1-geo-testek"
    chapterId="geometria"
    questions={TESTEK_G1_QUESTIONS}
    pairs={TESTEK_G1_PAIRS}
    sort={TESTEK_G1_SORT}
    {...props}
  />
);

export default TestekG1Jatek;
