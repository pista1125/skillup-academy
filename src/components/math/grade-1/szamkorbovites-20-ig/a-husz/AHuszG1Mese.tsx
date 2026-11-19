import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine } from '../../shared/G1Pics';
import { DominoPair, ExprScene, FriendsScene, ScatterScene, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { BasketsScene, HandsFeetScene, PairsScene, RodsScene } from './AHuszG1Scenes';
import { RodsPlayground } from './AHuszG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <FriendsScene mood="wow" />,
    text: 'Megérett az eper!',
    say: 'Nyár eleje van a Számkertben. Zümi nagy hírt hozott: megérett az eper! Pötyi, Zümi és Csigusz két kosárral indult az epres kertbe.',
    mood: 'wow',
  },
  {
    scene: <ScatterScene icon="eper" n={20} />,
    text: 'Hány eper érett meg?',
    say: 'Nézd, mennyi piros eper! Számold meg őket! Mutass rá mindegyikre.',
    task: { ask: 'Hány eper érett meg?', options: [20, 19, 18], hint: 'Mutass rá mindegyikre, és számolj hangosan! Egyet se hagyj ki.' },
  },
  {
    scene: <BasketsScene n={20} />,
    text: '2 teli kosár: 2 tízes.',
    say: 'Mindegyik kosárba 10 eper fér. Az első kosár tele van: ez 1 tízes. A második is tele van: ez még 1 tízes. 2 tízes és 0 egyes: ez a húsz.',
    dots: 10,
    task: { ask: 'Hány teli kosár van?', options: [2, 1, 20], hint: 'Ne az epreket számold, hanem a kosarakat!' },
  },
  {
    scene: (
      <svg viewBox="0 0 480 264">
        <rect x="0" y="0" width="480" height="264" rx="18" fill="#fef3c7" />
        <svg x="20" y="8" width="440" height="90" viewBox="0 0 540 112">
          <TwoFrames a={10} b={10} className="" />
        </svg>
        <svg x="30" y="104" width="420" height="96" viewBox="0 0 480 110">
          <RodsScene n={20} className="" />
        </svg>
        <svg x="110" y="196" width="260" height="62" viewBox="0 0 340 80">
          <DominoPair ones={10} className="" />
        </svg>
      </svg>
    ),
    text: 'Így is 20.',
    say: 'Fent két teli tízes keret. Középen két tízesrúd. Lent két dominó, mindegyiken 10 pötty. Mindegyik húsz: 2 tízes.',
    task: { ask: 'Hány egyes kocka van a rudak mellett?', options: [0, 2, 10], hint: 'Nézd meg jól: van sárga kocka a narancs rudak mellett?' },
  },
  {
    scene: <ExprScene text="10 + 10 = ?" />,
    text: '10 + 10',
    say: 'Pötyi kosarában 10 eper van, Zümi kosarában is 10. 10 meg 10, az mennyi?',
    task: { ask: '10 + 10 = ?', options: [20, 11, 19], hint: 'Egy tízes meg egy tízes: az 2 tízes. Hogy hívjuk a 2 tízest?' },
  },
  {
    scene: <NumberLine max={20} mark={[20]} />,
    text: 'A 20 a 19 után jön.',
    say: 'Ez a számegyenes. A 19 után jön a 20, ott van a piros pötty. A 20 a kisebb szomszédjánál, a 19-nél eggyel több.',
    task: { ask: 'Melyik a 20 kisebb szomszédja?', options: [19, 18, 10], hint: 'A kisebb szomszéd közvetlenül a 20 előtt áll a számegyenesen.' },
  },
  {
    scene: <PairsScene n={20} />,
    text: 'Kettesével: 2, 4, … 20',
    say: 'Csigusz párba rakta az epreket. Számoljunk kettesével: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20. Mindegyik epernek jutott párja.',
    task: { ask: 'A 20 páros vagy páratlan?', options: ['páros', 'páratlan'], hint: 'Nézd meg: maradt eper pár nélkül? Ha nem maradt, a szám páros.' },
  },
  {
    scene: <HandsFeetScene />,
    text: '5, 10, 15, 20',
    say: 'Pötyi megkérdezte: Hány ujjad van a két kezeden és a két lábadon? Számoljunk ötösével: 5, 10, 15, 20!',
    task: { ask: 'Hány ujj van a két kézen és a két lábon?', options: [20, 10, 15], hint: 'Ötösével számolj: minden kéznél és lábnál mondj ötöt tovább!' },
  },
  {
    scene: <TwoFrames a={14} />,
    text: '14 + ? = 20',
    say: 'Zümi 14 epret szedett. Mennyit szedjen még, hogy 20 legyen? Számold meg az üres helyeket a keretekben!',
    task: { ask: 'Hány kell a 14-hez, hogy 20 legyen?', options: [6, 4, 5], hint: 'A második keretben számold meg az üres helyeket! A 14 után: 15, 16, …, 20.' },
  },
  {
    scene: <BasketsScene n={20} crossed={8} />,
    text: '20 − 8',
    say: 'Csigusz elvitt 8 epret a nagymamájának. Ezeket áthúztuk. Hány eper maradt a kosarakban?',
    task: { ask: '20 − 8 = ?', options: [12, 13, 11], hint: 'Az első kosár tele maradt, az 10. Hány eper nincs áthúzva a második kosárban?' },
  },
  {
    scene: <ExprScene text={['12 − 7 = ?', '12 − 2 − 5 = ?']} />,
    text: '12 − 7: előbb a tízig vissza!',
    say: '12 eperből 7-et megettek a barátok. Pötyi úgy számol, ahogy már tudod: előbb 2-t vesz el, az 10. Aztán még 5-öt. Mennyi maradt?',
    task: { ask: '12 − 7 = ?', options: [5, 6, 4], hint: 'Előbb 12-ből 2: az 10. A 10-ből még 5-öt vegyél el!' },
  },
  {
    scene: <FriendsScene number={20} mood="cheer" />,
    text: 'Megtaláltad a húszat!',
    say: 'Hurrá! 20 eper, két teli kosár, 2 tízes. A húsz páros szám, és most már 20-ig mindent meg tudunk számolni. Gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const AHuszG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="10. A húsz"
    storyTitle="Pötyi és az epres kosarak"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<RodsPlayground />}
    playgroundTitle="Játszótér: rudak és kockák"
    parentNote="A gyerek megismeri a 20-at: 2 tízes és 0 egyes (két teli kosár, két tízes keret, két tízesrúd, két dominó), helyét a számegyenesen, és hogy páros szám. Kettesével és ötösével számol 20-ig, kiegészít 20-ra (14 + 6), elvesz a 20-ból, és a könyv módszerével a tízen át is kivon (12 − 7 = 12 − 2 − 5). A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AHuszG1Mese;
