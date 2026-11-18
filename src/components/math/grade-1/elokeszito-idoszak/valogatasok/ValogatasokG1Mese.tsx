import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Basket, BigThing, GroupRingFig, Button, ButtonScene, COL, GardenScene, HelloScene, MessScene, SchoolBagScene, ThingRow, TidyScene, TwoBasketsScene, thing } from './ValogatasokG1Scenes';
import { SortBasketsPlayground } from './ValogatasokG1Parts';

const basketOpt = (fruit: boolean) => ({
  figure: <Basket sign={fruit ? [{ n: 'alma' }, { n: 'banan' }] : [{ n: 'repa' }, { n: 'uborka' }]} />,
  say: fruit ? 'gyümölcsös kosár' : 'zöldséges kosár',
});

const PAGES: MesePage[] = [
  {
    scene: <HelloScene />,
    text: 'Szia! Pötyi vagyok.',
    say: 'Szia! Pötyi vagyok, a kis piros katica. Látod a pöttyeimet a hátamon? Később ezekkel fogunk számolni. Én a Számkertben lakom. Gyere be velem!',
    mood: 'cheer',
  },
  {
    scene: <GardenScene />,
    text: 'Ez a Számkert.',
    say: 'Ez a Számkert, az én kertem. Van itt almafa, virág és egy kis tó. Itt lakik a barátom, Zümi, a méh, és Csigusz, a csiga. Minden nap együtt játszunk, és sok mindent megtanulunk.',
  },
  {
    scene: <MessScene />,
    text: 'Jaj, minden összekeveredett!',
    say: 'Jaj! Éjjel nagy szél fújt a Számkertben. Minden összekeveredett: gyümölcs, zöldség, játék és ceruza. Segítesz rendet rakni? Válogassuk szét a dolgokat!',
    mood: 'wow',
  },
  {
    text: 'Mi való a gyümölcsös kosárba?',
    say: 'Először a gyümölcsöket szedjük össze. Melyik gyümölcs? Koppints rá!',
    task: {
      ask: 'Melyik gyümölcs?',
      options: [thing('korte'), thing('labda'), thing('ceruza')],
      hint: 'A labdával játszunk, a ceruzával rajzolunk. Melyiket lehet megenni?',
    },
  },
  {
    scene: <TwoBasketsScene left={[{ n: 'alma' }, { n: 'korte' }]} right={[{ n: 'uborka' }]} item="repa" />,
    text: 'Gyümölcs ide, zöldség oda.',
    say: 'Két kosarunk van. Az egyikbe a gyümölcs kerül, a másikba a zöldség. A kosáron lévő kép megmutatja, mi való bele. Hová tegyük a répát?',
    task: {
      ask: 'Hová való a répa?',
      options: [basketOpt(false), basketOpt(true)],
      hint: 'A répa zöldség, a földben nő. Keresd a kosarat, amin répa van!',
    },
  },
  {
    scene: <ThingRow items={[{ n: 'virag', color: COL.piros }, { n: 'virag', color: COL.piros }, { n: 'virag', color: COL.piros }]} />,
    text: 'Szín szerint is válogathatunk.',
    say: 'Zümi a virágokat válogatja. Ezek mind piros virágok. Szín szerint válogatott. Melyik virág illik még ide?',
    task: {
      ask: 'Melyik illik a piros virágokhoz?',
      options: [thing('virag', 'piros virág', COL.piros), thing('virag', 'kék virág', COL.kek), thing('virag', 'sárga virág', COL.sarga)],
      hint: 'Ez nem piros. Keresd a piros virágot!',
    },
  },
  {
    scene: <SchoolBagScene />,
    text: 'Csigusz iskolába megy.',
    say: 'Csigusz is iskolába indul. Becsomagolja a táskáját. Mit tegyen bele? Ami az iskolában kell!',
    task: {
      ask: 'Mi való az iskolatáskába?',
      options: [thing('ceruza'), thing('maci'), thing('labda')],
      hint: 'A maci és a labda játék, az a polcon marad. Mivel rajzolunk az iskolában?',
    },
  },
  {
    scene: <ThingRow items={[{ n: 'alma' }, { n: 'banan' }, { n: 'auto' }, { n: 'korte' }]} />,
    text: 'Melyik nem illik a sorba?',
    say: 'Nézd meg ezt a sort! Három gyümölcs van benne, és valami más is. Melyik nem illik a többihez?',
    task: {
      ask: 'Melyik nem illik ide?',
      options: [thing('auto'), thing('banan'), thing('korte')],
      hint: 'Ez gyümölcs, ezt meg lehet enni. Mi nem gyümölcs a sorban?',
    },
  },
  {
    scene: <ButtonScene color={COL.piros} big holes={4} />,
    text: 'Keresd meg a párját!',
    say: 'Pötyi talált egy gombot. Ez egy nagy, piros gomb, négy lyukkal. Keresd meg az ugyanolyat!',
    task: {
      ask: 'Melyik ugyanolyan?',
      options: [
        { figure: <Button color={COL.piros} big holes={4} />, say: 'nagy piros gomb' },
        { figure: <Button color={COL.kek} big holes={4} />, say: 'nagy kék gomb' },
        { figure: <Button color={COL.piros} big={false} holes={4} />, say: 'kis piros gomb' },
      ],
      hint: 'Nézd meg a színét és a nagyságát is! Mindkettő legyen ugyanolyan.',
    },
  },
  {
    scene: <BigThing n="madar" />,
    text: 'Ő hova tartozik?',
    say: 'Egy madárka is erre repült. Ő hova tartozik? Az állatokhoz, a járművekhez, vagy az ételekhez?',
    task: {
      ask: 'Hová tartozik a madár?',
      options: [
        { figure: <GroupRingFig kind="allat" />, say: 'állatok' },
        { figure: <GroupRingFig kind="jarmu" />, say: 'járművek' },
        { figure: <GroupRingFig kind="etel" />, say: 'ételek' },
      ],
      hint: 'A madár él, repül, enni kér. Hol vannak az élőlények?',
    },
  },
  {
    scene: <TidyScene />,
    text: 'Rendet raktunk!',
    say: 'Hurrá! Minden a helyére került. Válogattunk fajta szerint, szín szerint, és megkerestük, mi nem illik a sorba. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const ValogatasokG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="1. Válogatások"
    storyTitle="Pötyi és a nagy szél a Számkertben"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • MESE"
    pages={PAGES}
    playground={<SortBasketsPlayground />}
    playgroundTitle="Játszótér: tedd a jó kosárba!"
    parentNote="A gyerek megismeri Pötyit és a Számkertet, és megtanul tárgyakat szétválogatni: fajta szerint (gyümölcs, zöldség, játék, iskolai holmi, állat, jármű) és szín szerint. Megkeresi, mi nem illik a sorba, és ugyanolyan tárgyat keres. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ValogatasokG1Mese;
