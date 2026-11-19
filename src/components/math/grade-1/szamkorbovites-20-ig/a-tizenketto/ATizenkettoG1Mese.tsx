import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { DigitTrace, ICONS } from '../../shared/G1Pics';
import { PotyiScene, SeqStrip, TwoFrames } from '../a-tizenegy/ATizenegyG1Scenes';
import { BalloonsScene, DiceScene } from './ATizenkettoG1Scenes';
import { DiceBoardPlayground } from './ATizenkettoG1Parts';

const thing = (icon: 'alma' | 'eper' | 'labda' | 'auto', say: string) => ({
  figure: (
    <svg viewBox="0 0 80 80" className="w-20 h-20">
      <rect x="3" y="3" width="74" height="74" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {ICONS[icon]({ x: 40, y: 42, s: 1.4 })}
    </svg>
  ),
  say,
});

const PAGES: MesePage[] = [
  {
    scene: <PotyiScene dots={10} mood="cheer" friends />,
    text: 'Ma Pötyi születésnapja van!',
    say: 'Ma Pötyi születésnapja van! Zsúrt rendez a Számkertben. Zümi és Csigusz korán reggel jön segíteni: lufit fújnak és terítenek.',
    mood: 'cheer',
  },
  {
    scene: <BalloonsScene n={12} />,
    text: 'Hány lufit fújtak fel?',
    say: 'Nézd, mennyi lufi! Számold meg őket! Mutass rá mindegyikre, és számolj hangosan!',
    task: { ask: 'Hány lufi van?', options: [12, 11, 10], hint: 'Fent 6 lufi, lent is 6. Számolj tovább a felső sor után!' },
  },
  {
    scene: <TwoFrames a={10} b={2} />,
    text: '1 tízes és 2 egyes',
    say: 'Csigusz minden lufihoz egy korongot tett a keretbe. Az első keret megtelt: ez 1 tízes. A második keretben 2 korong van: 2 egyes. 1 tízes és 2 egyes: tizenkettő.',
    task: { ask: 'Hány egyes van a 12-ben?', say: 'Hány egyes van a tizenkettőben? Hány kék korong van a második keretben?', options: [2, 1, 12], hint: 'A teli keret a tízes. A második keretben lévő korongok az egyesek. Számold meg!' },
  },
  {
    scene: <DigitTrace digit="12" className="w-56 h-40 mx-auto" />,
    text: 'Így írjuk: 12',
    say: 'A tizenkettőt is két számjeggyel írjuk. Elöl egy egyes: ez az 1 tízes. Mellé egy kettes: ez a 2 egyes. Rajzold le a levegőbe!',
    dots: 10,
  },
  {
    scene: <SeqStrip items={[10, '?', 12]} />,
    text: 'A 11 szomszédai',
    say: 'Most már tudjuk a tizenkettőt is! A 12 a 11 után jön. A 11-nek két szomszédja van: a 10 és a 12. Melyik szám van a 10 és a 12 között?',
    task: { ask: 'Melyik szám van középen?', options: [11, 9, 1], hint: 'Számolj: 10, aztán? Utána jön a 12.' },
  },
  {
    scene: <TwoFrames a={6} b={6} />,
    text: '6 meg 6: 12',
    say: 'A tortára 12 eper kerül. Pötyi úgy rakja, hogy a torta mindkét felére 6 jusson: 6 piros és 6 kék korong. 6 meg 6 az 12. A 12 párba állítható.',
    task: { ask: 'Páros vagy páratlan a 12?', say: 'Minden korongnak jut párja. Páros vagy páratlan a 12?', options: ['páros', 'páratlan'], hint: 'Ha mindenkinek jut pár, és nem marad ki senki, az páros szám.' },
  },
  {
    scene: <BalloonsScene n={12} popped={2} />,
    text: 'Pukk! Pukk!',
    say: 'Jaj! Csigusz nekiment a lufiknak a csigaházával. Pukk, pukk: 2 lufi kipukkadt. 12-ből elvettünk 2-t.',
    task: { ask: 'Hány lufi maradt?', options: [10, 11, 2], hint: 'Két lufi áthúzva. A 12-ből 2-t veszünk el. A tízes marad!' },
  },
  {
    scene: <TwoFrames a={8} b={4} />,
    text: '8 + 4: előbb 10, aztán 12',
    say: 'Az asztalon 8 pohár van, Zümi hoz még 4-et. Az első keretbe 2 fér még: 8 meg 2 az 10. A maradék 2 a második keretbe megy: 10 meg 2 az 12.',
    task: { ask: 'Mennyi 8 + 4?', say: 'Mennyi 8 meg 4?', options: [12, 11, 10], hint: 'Előbb töltsd meg a keretet: 8 meg 2 az 10. Aztán még 2.' },
  },
  {
    scene: <TwoFrames a={12} crossed={4} />,
    text: '12 − 4: előbb 2, aztán még 2',
    say: 'A 12 sütiből a vendégek megettek 4-et. Előbb a második keretből tűnik el 2: marad 10. Aztán még 2: marad 8.',
    task: { ask: 'Hány süti maradt?', options: [8, 9, 10], hint: 'Előbb 2-t vegyél el: 10 marad. A 10-ből még 2-t.' },
  },
  {
    scene: <DiceScene a={6} b={6} />,
    text: 'Dobókockás játék',
    say: 'Zsúr után kockáznak. Aki dob, összeadja a pöttyöket. Pötyi 6-ot és 6-ot dobott! Mennyi 6 meg 6?',
    task: { ask: 'Mennyi a két kocka együtt?', options: [12, 11, 10], hint: 'Az egyik kockán 6 pötty van. Számolj tovább a másikkal: 7, 8, …' },
  },
  {
    text: 'Mi nem illik közé?',
    say: 'Rendet raknak. Az ennivaló az asztalra kerül, a játék a dobozba. Melyik NEM ennivaló?',
    task: { ask: 'Melyik NEM ennivaló?', options: [thing('labda', 'labda'), thing('alma', 'alma'), thing('eper', 'eper')], hint: 'Az almát és az epret meg lehet enni. És a harmadikat?' },
  },
  {
    scene: <PotyiScene number={12} mood="cheer" friends />,
    text: 'Boldog születésnapot, Pötyi!',
    say: 'Hurrá! 12 lufi, 12 süti, 12 pötty a kockákon. A tizenkettő 1 tízes és 2 egyes. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 10,
  },
];

export const ATizenkettoG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="2. A tizenkettő"
    storyTitle="Pötyi születésnapja"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<DiceBoardPlayground />}
    playgroundTitle="Játszótér: területfoglaló kockával"
    parentNote="A gyerek megismeri a 12-t mint 1 tízest és 2 egyest, megtanulja az írását, és hogy a 11 két szomszédja a 10 és a 12. Látja, hogy a 12 páros (6 + 6), és a könyv módszerével számol 12-ig: 8 + 4-nél előbb 10-re pótol, 12 − 4-nél előbb a 10-ig vesz el. A kockás játékban két kocka pöttyeit adja össze. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATizenkettoG1Mese;
