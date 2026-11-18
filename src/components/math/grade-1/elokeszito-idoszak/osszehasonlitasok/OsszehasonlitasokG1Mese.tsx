import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Branch, COL, Disc, Lineup, PodiumScene, RaceStartScene, Ribbon, Road, Shadow, Shape, SnailRaceScene, TallShortScene, Tree } from './OsszehasonlitasokG1Scenes';
import { CompareRacePlayground } from './OsszehasonlitasokG1Parts';
import { OBJ } from '../valogatasok/ValogatasokG1Scenes';

const o = (figure: React.ReactNode, say: string) => ({ figure, say });

const PAGES: MesePage[] = [
  {
    scene: <RaceStartScene />,
    text: 'Ma verseny van a Számkertben!',
    say: 'Szia, itt vagyok újra, Pötyi! Ma nagy verseny van a Számkertben. Zümi és Csigusz is eljött. Nem azt nézzük, ki a gyorsabb, hanem azt, mi a magasabb, a hosszabb és a nagyobb. Segítesz összehasonlítani?',
    mood: 'cheer',
  },
  {
    scene: <TallShortScene />,
    text: 'Magasabb és alacsonyabb.',
    say: 'Nézd ezt a két virágot! A sárga virág magasabb, feljebb ér. A lila virág alacsonyabb, lejjebb marad.',
  },
  {
    scene: (
      <Lineup>
        {[<Tree key="a" h={0.55} className="" />, <Tree key="b" h={1} className="" />, <Tree key="c" h={0.35} className="" />, <Tree key="d" h={0.75} className="" />]}
      </Lineup>
    ),
    text: 'Melyik fa a legmagasabb?',
    say: 'Az első versenyző: a fák. Melyik fa a legmagasabb? Az, amelyik a legfeljebb ér.',
    task: {
      ask: 'Melyik fa a legmagasabb?',
      options: [o(<Tree h={1} />, 'legmagasabb fa'), o(<Tree h={0.75} />, 'magas fa'), o(<Tree h={0.35} />, 'kicsi fa')],
      hint: 'Nézd meg, melyik fa koronája van a legfeljebb!',
    },
  },
  {
    scene: (
      <Lineup>
        {[<Ribbon key="a" len={0.5} color={COL.piros} className="" />, <Ribbon key="b" len={0.95} color={COL.zold} className="" />]}
      </Lineup>
    ),
    text: 'Hosszabb és rövidebb.',
    say: 'Zümi két szalagot hozott. Mindkettő ugyanott kezdődik. A zöld szalag tovább ér, az a hosszabb. A piros a rövidebb.',
    task: {
      ask: 'Melyik szalag hosszabb?',
      options: [o(<Ribbon len={0.95} color={COL.zold} />, 'zöld szalag'), o(<Ribbon len={0.5} color={COL.piros} />, 'piros szalag')],
      hint: 'Nézd meg, melyik ér tovább jobbra!',
    },
  },
  {
    scene: (
      <Lineup bg="#dcfce7">
        {[<Road key="a" w={0.3} className="" />, <Road key="b" w={0.9} className="" />, <Road key="c" w={0.55} className="" />]}
      </Lineup>
    ),
    text: 'Szélesebb és keskenyebb.',
    say: 'Csigusz a kerti utakat nézi. Az egyik út széles, sok minden elfér rajta egymás mellett. A másik keskeny, csak egy csiga fér el rajta. Melyik út a legszélesebb?',
    task: {
      ask: 'Melyik út a legszélesebb?',
      options: [o(<Road w={0.9} />, 'legszélesebb út'), o(<Road w={0.55} />, 'közepes út'), o(<Road w={0.3} />, 'keskeny út')],
      hint: 'Ez keskenyebb. Melyik út a legkövérebb csík?',
    },
  },
  {
    scene: (
      <Lineup>
        {[<Branch key="a" t={16} className="" />, <Branch key="b" t={4} className="" />]}
      </Lineup>
    ),
    text: 'Vastagabb és vékonyabb.',
    say: 'Pötyi két ágra szállt. Az egyik ág vastag és erős. A másik ág vékony, mint egy szál. Pötyi a vékonyabb ágon hintázik. Melyik az?',
    task: {
      ask: 'Melyik ág vékonyabb?',
      options: [o(<Branch t={4} />, 'vékony ág'), o(<Branch t={16} />, 'vastag ág')],
      hint: 'Ez a vastagabb. Melyik ág olyan, mint egy szál?',
    },
  },
  {
    text: 'Nagyobb és kisebb.',
    say: 'Zümi pöttyös labdákat gurít. Melyik a legkisebb labda? Az, amelyik a legpicibb.',
    task: {
      ask: 'Melyik a legkisebb?',
      options: [o(<Disc r={12} color={COL.sarga} />, 'legkisebb'), o(<Disc r={26} color={COL.sarga} />, 'közepes'), o(<Disc r={40} color={COL.sarga} />, 'legnagyobb')],
      hint: 'Ez nagyobb. Keresd a legpicibbet!',
    },
  },
  {
    scene: <SnailRaceScene snails={[{ color: COL.narancs, dist: 0.45 }, { color: COL.kek, dist: 0.9 }, { color: COL.lila, dist: 0.65 }]} />,
    text: 'Csigaverseny!',
    say: 'Most jön a csigaverseny! Mind a három csiga ugyanonnan indult. Melyik csiga jutott a legmesszebbre? A csíkjuk megmutatja.',
    task: {
      ask: 'Melyik csiga jutott a legmesszebbre?',
      options: [
        { figure: <svg viewBox="0 0 100 100" className="w-24 h-24">{OBJ.csiga({ x: 50, y: 52, s: 1.8, color: COL.kek })}</svg>, say: 'kék csiga' },
        { figure: <svg viewBox="0 0 100 100" className="w-24 h-24">{OBJ.csiga({ x: 50, y: 52, s: 1.8, color: COL.lila })}</svg>, say: 'lila csiga' },
        { figure: <svg viewBox="0 0 100 100" className="w-24 h-24">{OBJ.csiga({ x: 50, y: 52, s: 1.8, color: COL.narancs })}</svg>, say: 'narancssárga csiga' },
      ],
      hint: 'Nézd meg, melyik csíkja a leghosszabb!',
    },
  },
  {
    scene: <Lineup>{[<Shape key="a" k="haromszog" color={COL.kek} className="" />]}</Lineup>,
    text: 'Ugyanolyan alakú.',
    say: 'Pötyi talált egy kék háromszöget. Melyik ugyanolyan alakú? A színe most nem számít, csak a formája!',
    task: {
      ask: 'Melyik ugyanolyan alakú?',
      options: [o(<Shape k="haromszog" color={COL.piros} />, 'piros háromszög'), o(<Shape k="kor" color={COL.piros} />, 'piros kör'), o(<Shape k="negyzet" color={COL.piros} />, 'piros négyzet')],
      hint: 'Ennek nincs három csúcsa. Keresd a háromszöget!',
    },
  },
  {
    scene: <Lineup>{[<Shape key="a" k="csillag" color={COL.sarga} className="" />]}</Lineup>,
    text: 'Kié ez az árnyék?',
    say: 'Süt a nap, mindennek van árnyéka. Az árnyék sötét, de ugyanolyan alakú, mint a tárgy. Melyik a csillag árnyéka?',
    task: {
      ask: 'Melyik a csillag árnyéka?',
      options: [o(<Shadow k="csillag" />, 'csillag árnyéka'), o(<Shadow k="sziv" />, 'szív árnyéka'), o(<Shadow k="kor" />, 'kör árnyéka')],
      hint: 'Nézd meg az ágait! A csillagnak csúcsai vannak.',
    },
  },
  {
    scene: <PodiumScene />,
    text: 'Mindenki nyert!',
    say: 'Vége a versenynek! Összehasonlítottuk, mi magasabb, alacsonyabb, hosszabb, rövidebb, szélesebb, keskenyebb, vastagabb, vékonyabb, nagyobb és kisebb. Ügyes voltál! Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const OsszehasonlitasokG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="2. Összehasonlítások"
    storyTitle="Pötyi és a nagy kerti verseny"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • MESE"
    pages={PAGES}
    playground={<CompareRacePlayground />}
    playgroundTitle="Játszótér: Pötyi mérőversenye"
    parentNote="A gyerek tárgyakat hasonlít össze szemre: magasabb–alacsonyabb, hosszabb–rövidebb, szélesebb–keskenyebb, vastagabb–vékonyabb, nagyobb–kisebb, és megkeresi a legnagyobbat, legkisebbet. Ugyanolyan alakú formát és árnyékképet keres. Számolni még nem kell; a mesét a gép felolvassa."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default OsszehasonlitasokG1Mese;
