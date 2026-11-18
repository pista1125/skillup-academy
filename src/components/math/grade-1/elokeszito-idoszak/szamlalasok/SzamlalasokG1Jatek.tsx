import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Hand, IconGroup } from '../../shared/G1Pics';
import { Potyi } from '../../shared/Potyi';
import {
  AnimalTable,
  BallHeap,
  DotBall,
  DotCard,
  Domino2,
  GroupPic,
  HandsRow,
  MixRow,
  NUM_ATTR,
  NUM_WORD,
  SockHeap,
  SpotMushroom,
  Thing,
  ThingCard,
  THING_NAME,
  TwoGrids,
  ballOpt,
  dominoOpt,
  dotOpt,
  groupOpt,
  mushOpt,
  thingOpt,
} from './SzamlalasokG1Scenes';

const MIX: Thing[] = ['alma', 'gomba', 'eper', 'level', 'korte'];

export const SZAMLALASOK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – kis mennyiségek (1–5) párosítása pöttyökkel
  { id: 's1', level: 1, badge: 'Számlálás', ask: 'Hány labda? Melyik kártya illik?', say: 'Számold meg a labdákat! Melyik kártyán van ugyanannyi pötty?', scene: <IconGroup icon="labda" n={3} className="w-48 h-auto mx-auto" />, options: [dotOpt(3), dotOpt(1), dotOpt(5)], hint: 'Mutass rá mindegyik labdára, és számolj!' },
  { id: 's2', level: 1, badge: 'Számlálás', ask: 'Hány hal? Melyik kártya illik?', say: 'Számold meg a halakat! Melyik kártyán van ugyanannyi pötty?', scene: <IconGroup icon="hal" n={2} className="w-36 h-auto mx-auto" />, options: [dotOpt(2), dotOpt(4), dotOpt(3)], hint: 'Számold meg a halakat, aztán a pöttyöket is!' },
  { id: 's3', level: 1, badge: 'Ugyanannyi', ask: 'Hol van annyi alma, ahány pötty?', say: 'Nézd a kártyát! Melyik képen van ugyanannyi alma, ahány pötty?', scene: <DotCard n={4} className="w-24 h-24 mx-auto" />, options: [groupOpt('alma', 4), groupOpt('alma', 3), groupOpt('alma', 5)], hint: 'Számold meg a pöttyöket, aztán az almákat!' },
  { id: 's4', level: 1, badge: 'Taps', ask: 'Ennyit tapsolj! Melyik kártya?', say: 'Annyit tapsolj, ahány tenyeret látsz! Melyik kártyán van ugyanannyi pötty?', scene: <HandsRow seq={['p', 'p', 'p']} />, options: [dotOpt(3), dotOpt(2), dotOpt(4)], hint: 'Minden tenyér egy taps. Számold a tapsokat!' },
  { id: 's5', level: 1, badge: 'Számlálás', ask: 'Hány virág? Melyik kártya illik?', say: 'Hány virágot látsz? Melyik kártya illik hozzá?', scene: <IconGroup icon="virag" n={1} className="w-24 h-auto mx-auto" />, options: [dotOpt(1), dotOpt(2), dotOpt(3)], hint: 'Csak egy virág van. Hol van egy pötty?' },
  { id: 's6', level: 1, badge: 'Ugyanannyi', ask: 'Hol van annyi csillag, ahány pötty?', scene: <DotCard n={2} className="w-24 h-24 mx-auto" />, options: [groupOpt('csillag', 2), groupOpt('csillag', 1), groupOpt('csillag', 3)], hint: 'A kártyán két pötty van. Számold a csillagokat!' },
  { id: 's7', level: 1, badge: 'Koppantás', ask: 'Ennyit koppants! Melyik kártya?', say: 'Annyit koppants az asztalon, ahány öklöt látsz! Melyik kártya illik hozzá?', scene: <HandsRow seq={['f', 'f', 'f', 'f']} />, options: [dotOpt(4), dotOpt(5), dotOpt(3)], hint: 'Minden ököl egy koppantás. Számolj!' },
  { id: 's8', level: 1, badge: 'Számlálás', ask: 'Hány katica? Melyik kártya illik?', say: 'Számold meg a katicákat! Melyik kártyán van ugyanannyi pötty?', scene: <IconGroup icon="katica" n={5} className="w-56 h-auto mx-auto" />, options: [dotOpt(5), dotOpt(4), dotOpt(6)], hint: 'Mutass rá mindegyik katicára! Egyiket se hagyd ki!' },
  // 2. szint – mit számolunk, táblázat, kupac, pöttyök
  { id: 's9', level: 2, badge: 'Mit számolunk?', ask: 'Hány gyümölcs van a sorban?', say: 'Csak a gyümölcsöket számold! Hány gyümölcs van a sorban?', scene: <MixRow things={MIX} />, options: [dotOpt(3), dotOpt(5), dotOpt(2)], hint: 'A gomba és a levél nem gyümölcs. Az almát, az epret és a körtét számold!' },
  { id: 's10', level: 2, badge: 'Mit számolunk?', ask: 'Hány NEM gyümölcs van itt?', say: 'Most azokat számold, amelyek nem gyümölcsök! Hány ilyen van?', scene: <MixRow things={MIX} />, options: [dotOpt(2), dotOpt(3), dotOpt(5)], hint: 'Az alma, az eper és a körte gyümölcs. Mi maradt?' },
  { id: 's11', level: 2, badge: 'Táblázat', ask: 'Hány méh van a táblázatban?', scene: <AnimalTable />, options: [dotOpt(3), dotOpt(2), dotOpt(4)], hint: 'Csak a méheket számold, sorról sorra!' },
  { id: 's12', level: 2, badge: 'Táblázat', ask: 'Melyik állatból van a legtöbb?', scene: <AnimalTable />, options: [thingOpt('pillango'), thingOpt('meh'), thingOpt('katica')], hint: 'Számold meg külön mindegyik állatot!' },
  { id: 's13', level: 2, badge: 'Kupac', ask: 'Hány labda van a kupacban?', scene: <BallHeap n={5} />, options: [dotOpt(5), dotOpt(4), dotOpt(3)], hint: 'Mindegyik labda más színű. Számold a színeket!' },
  { id: 's14', level: 2, badge: 'Ugyanannyi pötty', ask: 'Melyik labdán van annyi pötty?', say: 'Melyik labdán van ugyanannyi pötty, mint a kártyán?', scene: <DotCard n={5} className="w-24 h-24 mx-auto" />, options: [ballOpt(5), ballOpt(4, '#60a5fa'), ballOpt(6, '#f472b6')], hint: 'Számold meg a pöttyöket a kártyán is, a labdán is!' },
  { id: 's15', level: 2, badge: 'Dominó', ask: 'Hány alma kell a dominóhoz?', say: 'Annyi almát szedj, ahány pötty van a dominón összesen! Melyik kép az?', scene: <Domino2 left={5} right={1} className="w-48 h-auto mx-auto" />, options: [groupOpt('alma', 6), groupOpt('alma', 5), groupOpt('alma', 7)], hint: 'A dominó mindkét felén számold a pöttyöket!' },
  { id: 's16', level: 2, badge: 'Párja', ask: 'Melyik gomba a párja?', say: 'Keresd meg a gomba párját: ugyanannyi pötty legyen a kalapján!', scene: <SpotMushroom n={3} className="w-28 h-28 mx-auto" />, options: [mushOpt(3), mushOpt(2), mushOpt(4)], hint: 'Számold meg a fehér pöttyöket a kalapon!' },
  // 3. szint – vegyes mozdulatok, összesen, nehezebb kupac
  { id: 's17', level: 3, badge: 'Postásjáték', ask: 'Pötyi ennyit koppantott. Melyik kártya?', say: 'Pötyi ennyiszer koppantott a hátadra. Ugyanannyit adsz tovább. Melyik kártya illik hozzá?', scene: <HandsRow seq={['f', 'f', 'f', 'f', 'f']} />, options: [dotOpt(5), dotOpt(4), dotOpt(6)], hint: 'Számold meg az öklöket, egyiket se hagyd ki!' },
  { id: 's18', level: 3, badge: 'Összesen', ask: 'Hány rajz van a két rácsban összesen?', say: 'Számold meg a rajzokat mindkét rácsban együtt! Hány van összesen?', scene: <TwoGrids left={[null, null, 'labda', null, 'alma', null, 'csillag', null, null]} right={[null, 'hal', null, null, null, null, null, null, 'eper']} />, options: [dotOpt(5), dotOpt(3), dotOpt(2)], hint: 'Az egyik rácsban is számolj, a másikban is, és folytasd tovább!' },
  { id: 's19', level: 3, badge: 'Taps és koppantás', ask: 'Hányat tapsolsz?', say: 'Utánozd a sort: tenyér a taps, ököl a koppantás. Hányat tapsolsz összesen?', scene: <HandsRow seq={['p', 'f', 'f', 'p', 'p']} />, options: [dotOpt(3), dotOpt(2), dotOpt(5)], hint: 'Csak a nyitott tenyereket számold, az öklöket nem!' },
  { id: 's20', level: 3, badge: 'Kupac', ask: 'Hány zokni van a kupacban?', scene: <SockHeap n={4} />, options: [dotOpt(4), dotOpt(3), dotOpt(5)], hint: 'Mindegyik zokni más színű. Számold a színeket!' },
  { id: 's21', level: 3, badge: 'Táblázat', ask: 'Hány csiga van a táblázatban?', scene: <AnimalTable />, options: [dotOpt(2), dotOpt(3), dotOpt(1)], hint: 'Nézd végig mindegyik sort! Csak a csigákat számold.' },
  { id: 's22', level: 3, badge: 'Számlálás', ask: 'Hány pötty van Pötyi hátán?', scene: <Potyi dots={6} mood="happy" className="w-40 h-40 mx-auto" />, options: [dotOpt(6), dotOpt(5), dotOpt(4)], hint: 'Mindkét szárnyán számolj, egyik pöttyöt se hagyd ki!' },
  { id: 's23', level: 3, badge: 'Ujjak', ask: 'Hány ujj van fent? Melyik kártya?', say: 'Hány ujjat mutat a kéz? Melyik kártyán van ugyanannyi pötty?', scene: <Hand fingers={4} className="w-32 h-32 mx-auto" />, options: [dotOpt(4), dotOpt(5), dotOpt(3)], hint: 'Csak a felemelt ujjakat számold!' },
  { id: 's24', level: 3, badge: 'Dominó', ask: 'Melyik dominó illik a halakhoz?', say: 'Számold meg a halakat! Melyik dominón van összesen ugyanannyi pötty?', scene: <IconGroup icon="hal" n={7} perRow={4} className="w-56 h-auto mx-auto" />, options: [dominoOpt(5, 2), dominoOpt(4, 2), dominoOpt(5, 3)], hint: 'A dominó két felén együtt számold a pöttyöket!' },
];

const card = (t: Thing, n: number) => ({ figure: <GroupPic thing={t} n={n} className="w-24 h-20" />, say: `${NUM_ATTR[n]} ${THING_NAME[t]}` });
const dots = (n: number) => ({ figure: <DotCard n={n} className="w-16 h-16" />, say: `${NUM_WORD[n]} pötty` });

export const SZAMLALASOK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Keresd meg a pöttykártyát, amelyiken ugyanannyi pötty van, ahány tárgy a képen!',
    pairs: [
      { a: card('alma', 1), b: dots(1) },
      { a: card('labda', 2), b: dots(2) },
      { a: card('eper', 3), b: dots(3) },
      { a: card('hal', 4), b: dots(4) },
    ],
  },
  2: {
    say: 'Hány ujj van fent? Keresd meg a képet, amelyiken ugyanannyi tárgy van!',
    pairs: [2, 3, 4, 5].map((n, i) => ({ a: { figure: <Hand fingers={n} className="w-16 h-16" />, say: `${NUM_WORD[n]} ujj` }, b: card((['csillag', 'korte', 'virag', 'szilva'] as Thing[])[i], n) })),
  },
  3: {
    say: 'Számold meg a dominó pöttyeit összesen! Keresd meg a képet, amelyiken ugyanannyi tárgy van!',
    pairs: [
      { a: { figure: <Domino2 left={2} right={2} className="w-28 h-auto" />, say: 'dominó: kettő és kettő' }, b: card('alma', 4) },
      { a: { figure: <Domino2 left={3} right={2} className="w-28 h-auto" />, say: 'dominó: három és kettő' }, b: card('eper', 5) },
      { a: { figure: <Domino2 left={5} right={1} className="w-28 h-auto" />, say: 'dominó: öt és egy' }, b: card('labda', 6) },
      { a: { figure: <Domino2 left={5} right={2} className="w-28 h-auto" />, say: 'dominó: öt és kettő' }, b: card('csillag', 7) },
    ],
  },
};

const thingItem = (t: Thing) => ({ figure: <ThingCard thing={t} />, say: THING_NAME[t] });

export const SZAMLALASOK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Gyümölcs vagy nem gyümölcs? Tedd a jó kosárba!',
    bins: [
      { label: 'Gyümölcs', figure: <ThingCard thing="alma" className="w-12 h-12" />, say: 'gyümölcs' },
      { label: 'Nem gyümölcs', figure: <ThingCard thing="gomba" className="w-12 h-12" />, say: 'nem gyümölcs' },
    ],
    items: [
      { item: thingItem('alma'), bin: 0 },
      { item: thingItem('eper'), bin: 0 },
      { item: thingItem('korte'), bin: 0 },
      { item: thingItem('szilva'), bin: 0 },
      { item: thingItem('gomba'), bin: 1 },
      { item: thingItem('level'), bin: 1 },
      { item: thingItem('csiga'), bin: 1 },
      { item: thingItem('labda'), bin: 1 },
    ],
  },
  2: {
    say: 'Számold meg! Annyi tárgy van a képen, mint az egyik kártyán a pötty. Melyik kosárba való?',
    bins: [
      { label: '● ●', figure: <DotCard n={2} className="w-12 h-12" />, say: 'kettő' },
      { label: '● ● ●', figure: <DotCard n={3} className="w-12 h-12" />, say: 'három' },
    ],
    items: [
      { item: card('alma', 2), bin: 0 },
      { item: card('hal', 3), bin: 1 },
      { item: card('korte', 2), bin: 0 },
      { item: card('csillag', 3), bin: 1 },
      { item: { figure: <Hand fingers={2} className="w-16 h-16" />, say: 'két ujj' }, bin: 0 },
      { item: { figure: <Hand fingers={3} className="w-16 h-16" />, say: 'három ujj' }, bin: 1 },
      { item: card('szilva', 3), bin: 1 },
      { item: card('labda', 2), bin: 0 },
    ],
  },
  3: {
    say: 'Három kosár van: három, négy és öt pötty. Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: '● ● ●', figure: <DotCard n={3} className="w-12 h-12" />, say: 'három' },
      { label: '● ● ● ●', figure: <DotCard n={4} className="w-12 h-12" />, say: 'négy' },
      { label: '● ● ● ● ●', figure: <DotCard n={5} className="w-12 h-12" />, say: 'öt' },
    ],
    items: [
      { item: card('eper', 3), bin: 0 },
      { item: card('virag', 4), bin: 1 },
      { item: card('alma', 5), bin: 2 },
      { item: { figure: <Hand fingers={4} className="w-16 h-16" />, say: 'négy ujj' }, bin: 1 },
      { item: { figure: <Hand fingers={5} className="w-16 h-16" />, say: 'öt ujj' }, bin: 2 },
      { item: { figure: <Domino2 left={2} right={1} className="w-28 h-auto" />, say: 'dominó: kettő és egy' }, bin: 0 },
      { item: { figure: <Domino2 left={3} right={2} className="w-28 h-auto" />, say: 'dominó: három és kettő' }, bin: 2 },
      { item: { figure: <Domino2 left={2} right={2} className="w-28 h-auto" />, say: 'dominó: kettő és kettő' }, bin: 1 },
      { item: { figure: <DotBall n={3} />, say: 'labda három pöttyel' }, bin: 0 },
    ],
  },
};

export const SzamlalasokG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="7. Számlálások"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • JÁTÉK"
    base="g1-prep-szamlalasok"
    chapterId="elokeszito-idoszak"
    questions={SZAMLALASOK_G1_QUESTIONS}
    pairs={SZAMLALASOK_G1_PAIRS}
    sort={SZAMLALASOK_G1_SORT}
    {...props}
  />
);

export default SzamlalasokG1Jatek;
