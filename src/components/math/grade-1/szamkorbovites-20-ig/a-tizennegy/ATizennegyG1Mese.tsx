import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine } from '../../shared/G1Pics';
import { DominoPair, ExprScene, FriendsScene, PotyiTenScene, TensRod, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { AquariumScene, PairsScene } from './ATizennegyG1Scenes';
import { NetSortPlayground } from './ATizennegyG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <FriendsScene mood="wow" bg="pond" />,
    text: 'Csigusz akváriumot kapott!',
    say: 'Csigusz nagy meglepetést kapott: egy üveg akváriumot! Pötyi és Zümi segítettek halakat hozni bele a tóból. Nézzük, hány hal úszkál benne!',
    mood: 'wow',
  },
  {
    scene: <AquariumScene n={14} />,
    text: 'Hány hal úszik?',
    say: 'Az akváriumban színes halak úszkálnak. Számold meg őket! Mutass rá mindegyikre!',
    task: { ask: 'Hány hal úszik az akváriumban?', options: [14, 13, 12], hint: 'Mutass rá minden halra, egyet se hagyj ki! A 10 után számolj tovább: 11, 12…' },
  },
  {
    scene: <PotyiTenScene ones={4} label="10 + 4 = 14" />,
    text: '1 tízes és 4 egyes: 14',
    say: 'Pötyi két szárnya tele van: ez egy tízes. A levélen még 4 pötty van: ez 4 egyes. Egy tízes és négy egyes: ez a tizennégy. 10 meg 4 az 14.',
    dots: 10,
    mood: 'cheer',
  },
  {
    scene: (
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef3c7" />
        <svg x="20" y="8" width="440" height="90" viewBox="0 0 540 112">
          <TwoFrames a={14} className="" />
        </svg>
        <svg x="50" y="104" width="380" height="64" viewBox="0 0 512 70">
          <TensRod n={14} className="" />
        </svg>
        <svg x="110" y="170" width="260" height="62" viewBox="0 0 340 80">
          <DominoPair ones={4} className="" />
        </svg>
      </svg>
    ),
    text: 'Így is 14.',
    say: 'Fent az első keret tele van, a másodikban 4 korong van. Középen egy tízesrúd és 4 kis kocka. Lent két dominó: 10 pötty és még 4 pötty. Mindegyik tizennégy.',
    task: { ask: 'Hány egyes kocka van a rúd mellett?', options: [4, 3, 5], hint: 'Csak a kis sárga kockákat számold, a narancs rudat ne!' },
  },
  {
    scene: <NumberLine max={14} mark={[14]} />,
    text: 'A 14 a 13 után jön.',
    say: 'Ez a számegyenes. A 13 után jön a 14, ott van a piros pötty. Melyik szám áll közvetlenül előtte?',
    task: { ask: 'Melyik a 14 kisebb szomszédja?', options: [13, 12, 4], hint: 'A kisebb szomszéd közvetlenül a 14 előtt áll a számegyenesen.' },
  },
  {
    scene: <PairsScene n={14} />,
    text: 'Kettesével: 2, 4, 6 … 14',
    say: 'Csigusz a hálóval mindig 2 halat emel ki, hogy megnézze őket. Számoljunk kettesével: 2, 4, 6, 8, 10, 12, 14. Minden halnak van párja, egy sem marad egyedül: a 14 páros szám.',
    task: { ask: 'Hányszor merítette a hálót Csigusz?', say: 'Minden hálóban 2 hal van. Hány háló van? Hányszor merítette a hálót Csigusz?', options: [7, 6, 14], hint: 'Ne a halakat számold, hanem a hálókat! Mutass rá mindegyikre.' },
  },
  {
    scene: <AquariumScene n={14} left={6} color="#f97316" />,
    text: 'Jobbra vagy balra úszik?',
    say: 'Nézd a halak fejét! Van, amelyik jobbra úszik, és van, amelyik balra. Hány hal úszik balra?',
    task: { ask: 'Hány hal úszik balra?', options: [6, 8, 5], hint: 'Csak azokat számold, amelyiknek a feje balra néz, a te bal kezed felé!' },
  },
  {
    scene: <TwoFrames a={11} b={3} />,
    text: '11 + 3',
    say: 'Az akváriumban 11 hal úszkált: ezek a piros korongok. Zümi beletett még 3 halat: ezek a kékek. Hány hal van most az akváriumban?',
    task: { ask: '11 + 3 = ?', options: [14, 13, 8], hint: 'A 11-től számolj tovább hármat: 12, 13…' },
  },
  {
    scene: <TwoFrames a={9} b={5} />,
    text: '9 + 5: előbb a tízig!',
    say: 'Pötyi 9 csigát hozott a tóból, Zümi még 5-öt. A kékekből 1 még az első keretbe fér, így az tele lesz. Hány kell a 9-hez, hogy 10 legyen?',
    task: { ask: 'Hány kell a 9-hez, hogy 10 legyen?', options: [1, 2, 4], hint: 'Az első keretben 9 piros korong van. Hány kék fér még mellé, hogy tele legyen?' },
  },
  {
    scene: <ExprScene text={['9 + 5 = ?', '9 + 1 + 4 = ?']} />,
    text: '9 + 1 + 4',
    say: 'Az 5-ből 1 kellett a tízhez, maradt még 4. 9 meg 1 az 10, és 10 meg 4 az… Mennyi?',
    task: { ask: '9 + 5 = ?', options: [14, 13, 15], hint: 'Előbb a tízig: 9 meg 1. Aztán a 10-hez még 4.' },
  },
  {
    scene: <TwoFrames a={14} crossed={6} />,
    text: '14 − 6: előbb vissza a tízig!',
    say: 'Csigusz 6 halat visszavitt a tóba, ezeket áthúztuk. Pötyi így számol: előbb 4-et vesz el, az 10. Aztán még 2-t. 14 elvéve 4 elvéve 2.',
    task: { ask: '14 − 6 = ?', options: [8, 10, 9], hint: 'Előbb 14-ből 4: az 10. A 10-ből még 2-t vegyél el!' },
  },
  {
    scene: <FriendsScene number={14} mood="cheer" bg="pond" />,
    text: 'Megtaláltad a tizennégyet!',
    say: 'Hurrá! 14 hal az akváriumban: egy tízes és négy egyes. Kettesével is eljutottunk a 14-ig, és a tízen is átléptünk. Gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const ATizennegyG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="4. A tizennégy"
    storyTitle="Pötyi és Csigusz akváriuma"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<NetSortPlayground />}
    playgroundTitle="Játszótér: melyik hálóba?"
    parentNote="A gyerek megismeri a 14-et: 1 tízes és 4 egyes (két tízes keret, tízesrúd, dominó), helyét a számegyenesen, és hogy páros szám; kettesével számol 14-ig, és megkülönbözteti a jobbra és balra úszó halakat. A tízen átlépő összeadást és kivonást a könyv módszerével gyakorolja: előbb a tízig, aztán tovább (9 + 5 = 9 + 1 + 4, 14 − 6 = 14 − 4 − 2). A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATizennegyG1Mese;
