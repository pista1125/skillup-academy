import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine } from '../../shared/G1Pics';
import { DominoPair, ExprScene, FriendsScene, HopLine, PotyiTenScene, TensRod, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { ForestScene, MachineScene, ThreeBaskets } from './ATizenhetG1Scenes';
import { BackToTenPlayground } from './ATizenhetG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <FriendsScene mood="wow" />,
    text: 'Eső után gombák nőttek!',
    say: 'Egész éjjel esett az eső. Reggelre a Számkert melletti erdőben kibújtak a gombák. Pötyi, Zümi és Csigusz kosarat fogott, és elindult gombát nézni.',
    mood: 'wow',
  },
  {
    scene: <ForestScene n={10} nb={7} />,
    text: 'Hány gomba nőtt?',
    say: '10 piros és 7 barna gomba nőtt az erdőben. Hány gomba van összesen?',
    task: { ask: 'Hány gomba nőtt az erdőben?', options: [17, 16, 15], hint: 'A 10 piros után számolj tovább a barnákkal: 11, 12…' },
  },
  {
    scene: <PotyiTenScene ones={7} label="10 + 7 = 17" />,
    text: '1 tízes és 7 egyes: 17',
    say: 'Pötyi két szárnya tele van: ez egy tízes. A levélen 7 pötty van: ez 7 egyes. Egy tízes és hét egyes: ez a tizenhét. 10 meg 7 az 17.',
    dots: 10,
    mood: 'cheer',
  },
  {
    scene: (
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef3c7" />
        <svg x="20" y="8" width="440" height="90" viewBox="0 0 540 112">
          <TwoFrames a={17} className="" />
        </svg>
        <svg x="20" y="104" width="440" height="64" viewBox="0 0 626 70">
          <TensRod n={17} className="" />
        </svg>
        <svg x="110" y="170" width="260" height="62" viewBox="0 0 340 80">
          <DominoPair ones={7} className="" />
        </svg>
      </svg>
    ),
    text: 'Így is 17.',
    say: 'Fent az első keret tele van, a másodikban 7 korong van. Középen egy tízesrúd és 7 kis kocka. Lent két dominó: 10 pötty és még 7 pötty. Mindegyik tizenhét.',
    task: { ask: 'Hány egyes kocka van a rúd mellett?', options: [7, 6, 8], hint: 'Csak a kis sárga kockákat számold, a narancs rudat ne!' },
  },
  {
    scene: <NumberLine max={17} mark={[17]} />,
    text: 'A 17 a 16 után jön.',
    say: 'Ez a számegyenes. A 16 után jön a 17, ott van a piros pötty. A 17 páratlan szám: ha a gombákat párba rakjuk, egy egyedül marad.',
    task: { ask: 'Melyik a 17 kisebb szomszédja?', options: [16, 15, 7], hint: 'A kisebb szomszéd közvetlenül a 17 előtt áll a számegyenesen.' },
  },
  {
    scene: <MachineScene input={12} op="+ 5" output="?" />,
    text: 'Zümi gépe hozzáad 5-öt.',
    say: 'Zümi épített egy számológépet. Ami bemegy, ahhoz a gép mindig hozzáad 5-öt. Most a 12 ment be. Melyik szám jön ki?',
    task: { ask: 'Melyik szám jön ki a gépből?', options: [17, 16, 7], hint: 'A gép hozzáad 5-öt: 12 meg 5. Számolj a 12-től tovább ötöt!' },
  },
  {
    scene: <TwoFrames a={9} b={8} />,
    text: '9 + 8: előbb a tízig!',
    say: 'Pötyi 9 piros gombát talált, Csigusz 8 barnát. A korongok mutatják: a 9-hez előbb annyit teszünk, hogy 10 legyen. Hány kell?',
    task: { ask: 'Hány kell a 9-hez, hogy 10 legyen?', options: [1, 2, 3], hint: 'Az első keretben 9 piros korong van. Hány kék fér még mellé, hogy tele legyen?' },
  },
  {
    scene: <ExprScene text={['9 + 8 = ?', '9 + 1 + 7 = ?']} />,
    text: '9 + 1 + 7',
    say: 'A 8-ból 1 kellett a tízhez, maradt még 7. 9 meg 1 az 10, és 10 meg 7 az… Mennyi?',
    task: { ask: '9 + 8 = ?', options: [17, 16, 15], hint: 'Előbb a tízig: 9 meg 1. Aztán a 10-hez még 7.' },
  },
  {
    scene: <TwoFrames a={17} crossed={8} />,
    text: '17 − 8: előbb vissza a tízig!',
    say: '17 gombából 8-at egy őzike megevett, ezeket áthúztuk. Pötyi így számol: előbb 7-et vesz el, az 10. Aztán még 1-et. 17 elvéve 7 elvéve 1.',
    task: { ask: '17 − 8 = ?', options: [9, 10, 8], hint: 'Előbb 17-ből 7: az 10. A 10-ből még 1-et vegyél el!' },
  },
  {
    scene: <HopLine max={17} from={17} icon="csiga" jumps={[{ from: 17, to: 10 }, { from: 10, to: 8 }]} question={8} />,
    text: 'Csigusz visszafelé mászik.',
    say: 'Csigusz a 17-ről indul visszafelé. Előbb 7-et mászik, így a 10-hez ér. Aztán még 2-t. Ez 17 elvéve 9. Hová ér?',
    task: { ask: 'Hová ér Csigusz?', options: [8, 9, 7], hint: 'A 10-ről még 2-t lép vissza: 9, aztán…' },
  },
  {
    scene: <ThreeBaskets counts={[6, 5, 6]} total="?" />,
    text: 'Három kosár gomba',
    say: 'A három barát hazafelé összeszámolta a gombákat. Pötyi kosarában 6, Zümiében 5, Csiguszéban 6 gomba van. 6 meg 5 meg 6, az mennyi?',
    task: { ask: 'Hány gomba van a három kosárban?', options: [17, 16, 15], hint: 'Előbb 6 meg 5 az 11. Aztán az 11-hez még 6.' },
  },
  {
    scene: <FriendsScene number={17} mood="cheer" />,
    text: 'Megtaláltad a tizenhetet!',
    say: 'Hurrá! 17 gomba, egy tízes és hét egyes. Előre és visszafelé is átléptünk a tízen. Gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const ATizenhetG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="7. A tizenhét"
    storyTitle="Pötyi és a gombaerdő"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<BackToTenPlayground />}
    playgroundTitle="Játszótér: vissza a tízig!"
    parentNote="A gyerek megismeri a 17-et: 1 tízes és 7 egyes (két tízes keret, tízesrúd, dominó), helyét a számegyenesen. A tízen átlépő összeadást (9 + 8 = 9 + 1 + 7) és kivonást (17 − 8 = 17 − 7 − 1) a könyv módszerével, előbb a tízig számolva gyakorolja, a „számológéppel” szabályt követ, és három számot ad össze. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATizenhetG1Mese;
