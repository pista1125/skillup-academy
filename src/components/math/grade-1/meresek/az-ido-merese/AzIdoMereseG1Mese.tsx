import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import {
  ActivityRowScene,
  ClockScene,
  ClocksScene,
  HelloScene,
  NapszakScene,
  PartyScene,
  SeasonsScene,
  TwoClocksScene,
  WeekScene,
  dayOpt,
  objOpt,
  seasonOpt,
  skyOpt,
} from './AzIdoMereseG1Scenes';
import { ClockSetPlayground } from './AzIdoMereseG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <HelloScene />,
    text: 'Zümi meghívott minket!',
    say: 'Szia! Pötyi vagyok. Nézd, Zümi meghívót hozott: szombaton délután 4 órakor mézes uzsonna lesz! Csigusz nagyon lassan mászik, ezért időben el kell indulnia. Segítesz kitalálni, mikor induljunk?',
    mood: 'cheer',
  },
  {
    scene: <NapszakScene />,
    text: 'A napszakok.',
    say: 'Reggel felkel a nap. Délelőtt egyre feljebb mászik, délben van a legmagasabban. Délután lefelé indul, este lemegy. Éjjel a hold és a csillagok világítanak. Ezek a napszakok.',
    task: {
      ask: 'Melyik képen van délben?',
      options: [skyOpt(2), skyOpt(0), skyOpt(5)],
      hint: 'Délben a nap a legmagasabban jár. Keresd meg, hol van a legfeljebb!',
    },
  },
  {
    scene: <ActivityRowScene acts={['reggeli', 'ebed', 'alvas']} />,
    text: 'Pötyi napja.',
    say: 'Pötyi reggel reggelizik, délben ebédel, éjjel pedig alszik a puha ágyában.',
    task: {
      ask: 'Mikor alszik Pötyi?',
      options: [skyOpt(5), skyOpt(2), skyOpt(0)],
      hint: 'Akkor alszunk, amikor sötét van, és kint vannak a csillagok.',
      praise: 'Úgy van! Éjjel alszunk, amikor a hold világít.',
    },
  },
  {
    scene: <NapszakScene hide={5} />,
    text: 'Előtte és utána.',
    say: 'A napszakok mindig ugyanúgy követik egymást: reggel, délelőtt, délben, délután, este. És utána mi jön?',
    task: {
      ask: 'Mi jön az este után?',
      options: [skyOpt(5), skyOpt(0), skyOpt(3)],
      hint: 'Este lemegy a nap. Utána sötét lesz. Melyik képen sötét?',
      praise: 'Ügyes! Az este után jön az éjjel, és az éjjel után újra reggel lesz.',
    },
  },
  {
    scene: <WeekScene nums />,
    text: 'A hét napjai.',
    say: 'Hétfő, kedd, szerda, csütörtök, péntek, szombat, vasárnap. Ezek a hét napjai. A naptárban a vasárnap piros.',
    task: {
      ask: 'Hány napból áll egy hét?',
      options: [7, 6, 5],
      hint: 'Mutass rá minden naptárlapra, és számold meg őket!',
      praise: 'Úgy van! Egy hét 7 napból áll.',
    },
  },
  {
    scene: <WeekScene days={[0, 1, 2]} hide={2} today={0} />,
    text: 'Ma hétfő van.',
    say: 'Ma hétfő van, a hét első napja. A hétfő után jön a kedd. És mi jön a kedd után?',
    task: {
      ask: 'Melyik nap jön a kedd után?',
      options: [dayOpt(2), dayOpt(0), dayOpt(4)],
      hint: 'Mondd el sorban: hétfő, kedd, és utána?',
    },
  },
  {
    scene: <WeekScene today={0} party={5} sleeps />,
    text: 'Hányat alszunk szombatig?',
    say: 'Ma hétfő van, az uzsonna szombaton lesz. Minden este lefekszünk aludni. A kis holdak mutatják, mikor alszunk. Hányat kell aludni szombatig?',
    task: {
      ask: 'Hányat alszunk szombatig?',
      options: [5, 6, 4],
      hint: 'Számold meg a kis holdakat a naptárlapok között!',
      praise: 'Úgy van! Még 5-öt kell aludni, és szombat lesz.',
    },
  },
  {
    scene: <SeasonsScene months />,
    text: 'Egy évben 4 évszak van.',
    say: 'Tavasz, nyár, ősz és tél: ez a 4 évszak. Minden évszak 3 hónapig tart. Tavasszal virágzik a fa, nyáron meleg van, ősszel lehullanak a levelek, télen esik a hó.',
    task: {
      ask: 'Mikor fürdünk a tóban?',
      say: 'Melyik évszakban fürdünk a tóban, amikor nagy a meleg?',
      options: [seasonOpt(1), seasonOpt(3), seasonOpt(2)],
      hint: 'Fürdeni akkor jó, amikor erősen süt a nap, és nagy a meleg.',
    },
  },
  {
    scene: <ClocksScene />,
    text: 'Az időt órával mérjük.',
    say: 'A hosszúságot rúddal mértük. Az időt órával mérjük. Van ébresztőóra, kakukkos óra és karóra. Régen napórát is használtak: annak az árnyéka mutatja az időt.',
    task: {
      ask: 'Melyikkel mérjük az időt?',
      options: [objOpt('vekker'), objOpt('merleg'), objOpt('meterrud')],
      hint: 'A mérleggel a tömeget, a méterrúddal a hosszúságot mérjük. Melyiknek van számlapja?',
    },
  },
  {
    scene: <ClockScene h={3} />,
    text: 'Kismutató és nagymutató.',
    say: 'Az órának két mutatója van. A hosszú kék a nagymutató, a rövid piros a kismutató. Ha a nagymutató felfelé, a 12-re mutat, akkor a kismutató megmutatja, hány óra van.',
    task: {
      ask: 'Hány órát mutat az óra?',
      options: [3, 9, 4],
      hint: 'A rövid piros kismutatót nézd! Melyik számra mutat?',
      praise: 'Ügyes! A kismutató a hármasra mutat: ez 3 óra.',
    },
  },
  {
    scene: <TwoClocksScene a={{ h: 1, who: 'csiga' }} b={{ who: 'meh' }} arrow="3 óra" />,
    text: 'Csigusz 1 órakor indul.',
    say: 'Szombat lett! Csigusz 1 órakor indul el. 3 óra hosszat mászik Zümi kertjéig. Hány órakor ér oda?',
    task: {
      ask: 'Hány órára ér oda Csigusz?',
      options: [4, 3, 2],
      hint: 'Indulj az 1-ről, és lépj tovább hármat a számlapon!',
      praise: 'Úgy van! 1 meg 3 az 4. Csigusz épp 4 órára ér oda!',
    },
  },
  {
    scene: <PartyScene />,
    text: 'Pontosan 4 óra van!',
    say: 'Szombat délután van, az óra pontosan 4 órát mutat. Csigusz időben odaért, kezdődik a mézes uzsonna! Megtanultuk a napszakokat, a hét napjait, az évszakokat és az órát. Ügyes voltál! Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const AzIdoMereseG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="4. Az idő mérése"
    storyTitle="Pötyi és Zümi mézes uzsonnája"
    badge="1. OSZTÁLY • V. MÉRÉSEK • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<ClockSetPlayground />}
    playgroundTitle="Játszótér: állítsd be az órát!"
    parentNote="A gyerek megismeri a napszakokat (reggel, délelőtt, délben, délután, este, éjjel) és a sorrendjüket, a hét 7 napját (melyik nap van előtte, utána), a 4 évszakot, és leolvassa az egész órákat a számlapos órán (a nagymutató a 12-n, a kismutató mutatja az órát). Otthon nézzék meg együtt a naptárt: hányat kell még aludni a következő hétvégéig? Hány órát mutat most az óra?"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AzIdoMereseG1Mese;
