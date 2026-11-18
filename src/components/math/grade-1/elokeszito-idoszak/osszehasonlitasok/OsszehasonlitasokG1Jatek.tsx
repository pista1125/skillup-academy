import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Branch, Carrot, COL, Disc, Flower, House, Kid, Lineup, Pencil, Plank, Ribbon, Road, Shadow, Shape, Sized, SizeRow, SnailRaceScene, Square, Stroke, Tower, Tree } from './OsszehasonlitasokG1Scenes';
import { OBJ } from '../valogatasok/ValogatasokG1Scenes';

const o = (figure: React.ReactNode, say: string) => ({ figure, say });
const sm = 'w-16 h-16';
const snail = (color: string, say: string) => o(<svg viewBox="0 0 100 100" className="w-24 h-24">{OBJ.csiga({ x: 50, y: 52, s: 1.8, color })}</svg>, say);

export const OSSZEHASONLITASOK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – két dolog összehasonlítása
  { id: 'o1', level: 1, badge: 'Magasabb, alacsonyabb', ask: 'Melyik fa magasabb?', options: [o(<Tree h={0.95} />, 'magasabb fa'), o(<Tree h={0.45} />, 'alacsonyabb fa')], hint: 'Nézd meg, melyik fa ér feljebb!' },
  { id: 'o2', level: 1, badge: 'Hosszabb, rövidebb', ask: 'Melyik szalag hosszabb?', options: [o(<Ribbon len={0.9} color={COL.piros} />, 'piros szalag'), o(<Ribbon len={0.45} color={COL.kek} />, 'kék szalag')], hint: 'Mindkettő ugyanott kezdődik. Melyik ér tovább?' },
  { id: 'o3', level: 1, badge: 'Nagyobb, kisebb', ask: 'Melyik labda nagyobb?', options: [o(<Sized n="labda" s={1.3} />, 'nagy labda'), o(<Sized n="labda" s={0.6} />, 'kis labda')], hint: 'Ez a kisebb. Melyik foglal több helyet?' },
  { id: 'o4', level: 1, badge: 'Szélesebb, keskenyebb', ask: 'Melyik út szélesebb?', options: [o(<Road w={0.85} />, 'széles út'), o(<Road w={0.3} />, 'keskeny út')], hint: 'Ez keskeny. Melyiken férne el két autó egymás mellett?' },
  { id: 'o5', level: 1, badge: 'Hosszabb, rövidebb', ask: 'Melyik ceruza rövidebb?', options: [o(<Pencil len={0.45} color={COL.zold} />, 'zöld ceruza'), o(<Pencil len={0.9} color={COL.lila} />, 'lila ceruza')], hint: 'Ez a hosszabb. Melyik ér véget hamarabb?' },
  { id: 'o6', level: 1, badge: 'Magasabb, alacsonyabb', ask: 'Melyik virág alacsonyabb?', options: [o(<Flower h={0.35} color={COL.lila} />, 'lila virág'), o(<Flower h={0.95} color={COL.sarga} />, 'sárga virág')], hint: 'Ez a magasabb. Melyik marad lejjebb?' },
  { id: 'o7', level: 1, badge: 'Vastagabb, vékonyabb', ask: 'Melyik ág vékonyabb?', options: [o(<Branch t={4} />, 'vékony ág'), o(<Branch t={16} />, 'vastag ág')], hint: 'Ez a vastag ág. Melyik olyan, mint egy szál?' },
  { id: 'o8', level: 1, badge: 'Nagyobb, kisebb', ask: 'Melyik alma kisebb?', options: [o(<Sized n="alma" s={0.6} />, 'kis alma'), o(<Sized n="alma" s={1.3} />, 'nagy alma')], hint: 'Ez a nagyobb. Keresd a picit!' },
  // 2. szint – a „leg…”, több dolog, alak, árnyék
  { id: 'o9', level: 2, badge: 'Legmagasabb', ask: 'Melyik fa a legmagasabb?', options: [o(<Tree h={1} />, 'legmagasabb fa'), o(<Tree h={0.8} />, 'magas fa'), o(<Tree h={0.55} />, 'közepes fa'), o(<Tree h={0.3} />, 'kicsi fa')], hint: 'Nézd meg a koronákat! Melyik van a legfeljebb?' },
  { id: 'o10', level: 2, badge: 'Leghosszabb', ask: 'Melyik répa a leghosszabb?', options: [o(<Carrot len={1} />, 'leghosszabb répa'), o(<Carrot len={0.65} />, 'közepes répa'), o(<Carrot len={0.35} />, 'rövid répa')], hint: 'Mind ugyanott kezdődik. Melyik hegye ér a legmesszebbre?' },
  { id: 'o11', level: 2, badge: 'Legkeskenyebb', ask: 'Melyik léc a legkeskenyebb?', say: 'Csigusz kerítést fest. Melyik kerítésléc a legkeskenyebb?', options: [o(<Plank w={0.3} />, 'legkeskenyebb léc'), o(<Plank w={0.65} />, 'közepes léc'), o(<Plank w={1} />, 'legszélesebb léc')], hint: 'Ez szélesebb. Melyik a legvékonyabb csík?' },
  { id: 'o12', level: 2, badge: 'Legvastagabb', ask: 'Melyik vonal a legvastagabb?', say: 'Zümi ecsettel festett. Melyik vonal a legvastagabb?', options: [o(<Stroke t={16} />, 'legvastagabb vonal'), o(<Stroke t={9} />, 'közepes vonal'), o(<Stroke t={3} />, 'vékony vonal'), o(<Stroke t={6} />, 'vékonyabb vonal')], hint: 'Melyik vonal a legkövérebb?' },
  { id: 'o13', level: 2, badge: 'Legkisebb', ask: 'Melyik kör a legkisebb?', options: [o(<Disc r={10} />, 'legkisebb kör'), o(<Disc r={20} />, 'kisebb kör'), o(<Disc r={30} />, 'nagyobb kör'), o(<Disc r={40} />, 'legnagyobb kör')], hint: 'Keresd a legpicibb kört!' },
  { id: 'o14', level: 2, badge: 'Legmesszebb', ask: 'Melyik csiga jutott a legmesszebbre?', say: 'Csigaverseny! Mind ugyanonnan indult. Melyik csiga jutott a legmesszebbre?', scene: <SnailRaceScene snails={[{ color: COL.zold, dist: 0.6 }, { color: COL.sarga, dist: 0.35 }, { color: COL.piros, dist: 0.92 }]} />, options: [snail(COL.piros, 'piros csiga'), snail(COL.zold, 'zöld csiga'), snail(COL.sarga, 'sárga csiga')], hint: 'Nézd meg, melyik csík a leghosszabb!' },
  { id: 'o15', level: 2, badge: 'Ugyanolyan alakú', ask: 'Melyik ugyanolyan alakú?', say: 'Nézd meg a kék kört! Melyik ugyanolyan alakú? A szín most nem számít.', scene: <Lineup>{[<Shape key="a" k="kor" color={COL.kek} className="" />]}</Lineup>, options: [o(<Shape k="kor" color={COL.sarga} />, 'sárga kör'), o(<Shape k="negyzet" color={COL.kek} />, 'kék négyzet'), o(<Shape k="haromszog" color={COL.sarga} />, 'sárga háromszög')], hint: 'A szín nem számít. Melyik kerek?' },
  { id: 'o16', level: 2, badge: 'Árnyékkép', ask: 'Melyik a hal árnyéka?', scene: <Lineup>{[<Sized key="a" n="hal" s={1} className="" />]}</Lineup>, options: [o(<Shadow n="hal" />, 'hal árnyéka'), o(<Shadow n="madar" />, 'madár árnyéka'), o(<Shadow n="csiga" />, 'csiga árnyéka')], hint: 'Nézd meg a farkát! A halnak úszója van.' },
  // 3. szint – több szempont, sorba rendezés, kis történetek
  { id: 'o17', level: 3, badge: 'Legalacsonyabb', ask: 'Ki a legalacsonyabb gyerek?', say: 'A gyerekek sorba álltak. Ki a legalacsonyabb?', options: [o(<Kid h={0.5} shirt={COL.zold} />, 'zöld pólós'), o(<Kid h={0.75} shirt={COL.piros} />, 'piros pólós'), o(<Kid h={1} shirt={COL.kek} />, 'kék pólós'), o(<Kid h={0.62} shirt={COL.sarga} />, 'sárga pólós')], hint: 'Nézd meg a fejüket! Kié van a legalul?' },
  { id: 'o18', level: 3, badge: 'Legszélesebb', ask: 'Melyik ház a legszélesebb?', options: [o(<House w={1} h={0.5} />, 'legszélesebb ház'), o(<House w={0.4} h={1} />, 'magas, keskeny ház'), o(<House w={0.6} h={0.7} />, 'közepes ház')], hint: 'Ne a magasságát nézd, hanem azt, mennyire széles!' },
  { id: 'o19', level: 3, badge: 'Ugyanakkora', ask: 'Melyik ugyanakkora, mint ez?', say: 'Nézd meg a zöld négyzetet! Melyik ugyanakkora, mint ez?', scene: <Lineup>{[<Square key="a" a={48} className="" />]}</Lineup>, options: [o(<Square a={48} color={COL.kek} />, 'ugyanakkora'), o(<Square a={72} color={COL.kek} />, 'nagyobb'), o(<Square a={26} color={COL.kek} />, 'kisebb')], hint: 'A szín más, de a nagyság legyen ugyanaz!' },
  { id: 'o20', level: 3, badge: 'Két szempont', ask: 'Melyik ház magas és keskeny?', options: [o(<House w={0.4} h={1} />, 'magas, keskeny'), o(<House w={1} h={1} />, 'magas, széles'), o(<House w={0.4} h={0.4} />, 'alacsony, keskeny')], hint: 'Mindkettő kell: legyen magas is, és keskeny is!' },
  { id: 'o21', level: 3, badge: 'Mese-feladat', ask: 'Zümi a legrövidebb ceruzát kéri.', say: 'Zümi a legrövidebb ceruzát kéri. Melyiket adjuk neki?', options: [o(<Pencil len={0.35} color={COL.piros} />, 'legrövidebb ceruza'), o(<Pencil len={0.55} color={COL.kek} />, 'rövid ceruza'), o(<Pencil len={0.75} color={COL.zold} />, 'hosszabb ceruza'), o(<Pencil len={0.95} color={COL.sarga} />, 'leghosszabb ceruza')], hint: 'Mind ugyanott kezdődik. Melyik ér véget a leghamarabb?' },
  { id: 'o22', level: 3, badge: 'Sorba rendezés', ask: 'Melyik sor jó: kicsitől a nagyig?', say: 'Melyik sorban állnak a körök kicsitől a nagyig?', options: [o(<SizeRow rs={[8, 14, 22]} />, 'kicsi, közepes, nagy'), o(<SizeRow rs={[22, 14, 8]} />, 'nagy, közepes, kicsi'), o(<SizeRow rs={[14, 8, 22]} />, 'összevissza')], hint: 'Az elején legyen a legkisebb, a végén a legnagyobb!' },
  { id: 'o23', level: 3, badge: 'Magasabb, alacsonyabb', ask: 'Melyik torony a legmagasabb?', say: 'Három tornyot építettünk kockákból. Melyik a legmagasabb? Ne a kockákat nézd, hanem azt, meddig ér a torony!', options: [o(<Tower n={3} a={24} color={COL.kek} />, 'kék torony'), o(<Tower n={5} a={10} color={COL.piros} />, 'piros torony'), o(<Tower n={4} a={14} color={COL.zold} />, 'zöld torony')], hint: 'Nem a több kocka a magasabb! Nézd meg, melyik ér a legfeljebb.' },
  { id: 'o24', level: 3, badge: 'Árnyékkép', ask: 'Melyik a körte árnyéka?', scene: <Lineup>{[<Sized key="a" n="korte" s={1} className="" />]}</Lineup>, options: [o(<Shadow n="korte" />, 'körte árnyéka'), o(<Shadow n="alma" />, 'alma árnyéka'), o(<Shadow n="eper" />, 'eper árnyéka')], hint: 'A körte alul kövér, fölül keskeny. Melyik árnyék ilyen?' },
];

export const OSSZEHASONLITASOK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd a tárgyat az árnyékával!',
    pairs: [
      { a: o(<Sized n="alma" s={1} className={sm} />, 'alma'), b: o(<Shadow n="alma" className={sm} />, 'alma árnyéka') },
      { a: o(<Sized n="hal" s={1} className={sm} />, 'hal'), b: o(<Shadow n="hal" className={sm} />, 'hal árnyéka') },
      { a: o(<Sized n="maci" s={1} className={sm} />, 'maci'), b: o(<Shadow n="maci" className={sm} />, 'maci árnyéka') },
      { a: o(<Sized n="csillag" s={1} className={sm} />, 'csillag'), b: o(<Shadow n="csillag" className={sm} />, 'csillag árnyéka') },
    ],
  },
  2: {
    say: 'Ugyanolyan alakú párt keress! A szín most nem számít.',
    pairs: [
      { a: o(<Shape k="kor" color={COL.piros} className={sm} />, 'piros kör'), b: o(<Shape k="kor" color={COL.kek} className={sm} />, 'kék kör') },
      { a: o(<Shape k="negyzet" color={COL.piros} className={sm} />, 'piros négyzet'), b: o(<Shape k="negyzet" color={COL.sarga} className={sm} />, 'sárga négyzet') },
      { a: o(<Shape k="haromszog" color={COL.piros} className={sm} />, 'piros háromszög'), b: o(<Shape k="haromszog" color={COL.zold} className={sm} />, 'zöld háromszög') },
      { a: o(<Shape k="teglalap" color={COL.piros} className={sm} />, 'piros téglalap'), b: o(<Shape k="teglalap" color={COL.lila} className={sm} />, 'lila téglalap') },
    ],
  },
  3: {
    say: 'Keresd meg az ugyanolyan hosszú párt! A szalaghoz ugyanolyan hosszú ceruza kell.',
    pairs: [
      { a: o(<Ribbon len={0.3} color={COL.piros} className={sm} />, 'nagyon rövid szalag'), b: o(<Pencil len={0.3} className={sm} />, 'nagyon rövid ceruza') },
      { a: o(<Ribbon len={0.55} color={COL.piros} className={sm} />, 'rövid szalag'), b: o(<Pencil len={0.55} className={sm} />, 'rövid ceruza') },
      { a: o(<Ribbon len={0.75} color={COL.piros} className={sm} />, 'hosszabb szalag'), b: o(<Pencil len={0.75} className={sm} />, 'hosszabb ceruza') },
      { a: o(<Ribbon len={1} color={COL.piros} className={sm} />, 'leghosszabb szalag'), b: o(<Pencil len={1} className={sm} />, 'leghosszabb ceruza') },
    ],
  },
};

export const OSSZEHASONLITASOK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Nagy vagy kicsi? Tedd a jó kosárba!',
    bins: [
      { label: 'Nagy', figure: <Disc r={36} color={COL.piros} className="w-12 h-12" />, say: 'nagy' },
      { label: 'Kicsi', figure: <Disc r={14} color={COL.piros} className="w-12 h-12" />, say: 'kicsi' },
    ],
    items: [
      { item: o(<Sized n="alma" s={1.4} className={sm} />, 'nagy alma'), bin: 0 },
      { item: o(<Sized n="alma" s={0.55} className={sm} />, 'kis alma'), bin: 1 },
      { item: o(<Sized n="labda" s={1.4} className={sm} />, 'nagy labda'), bin: 0 },
      { item: o(<Sized n="labda" s={0.55} className={sm} />, 'kis labda'), bin: 1 },
      { item: o(<Sized n="csillag" s={1.4} className={sm} />, 'nagy csillag'), bin: 0 },
      { item: o(<Sized n="csillag" s={0.55} className={sm} />, 'kis csillag'), bin: 1 },
      { item: o(<Sized n="maci" s={0.55} className={sm} />, 'kis maci'), bin: 1 },
    ],
  },
  2: {
    say: 'Hosszú vagy rövid? Hová való?',
    bins: [
      { label: 'Hosszú', figure: <Ribbon len={1} className="w-12 h-12" />, say: 'hosszú' },
      { label: 'Rövid', figure: <Ribbon len={0.3} className="w-12 h-12" />, say: 'rövid' },
    ],
    items: [
      { item: o(<Pencil len={1} className={sm} />, 'hosszú ceruza'), bin: 0 },
      { item: o(<Pencil len={0.3} className={sm} />, 'rövid ceruza'), bin: 1 },
      { item: o(<Carrot len={1} className={sm} />, 'hosszú répa'), bin: 0 },
      { item: o(<Carrot len={0.3} className={sm} />, 'rövid répa'), bin: 1 },
      { item: o(<Ribbon len={0.95} color={COL.zold} className={sm} />, 'hosszú zöld szalag'), bin: 0 },
      { item: o(<Ribbon len={0.25} color={COL.sarga} className={sm} />, 'rövid sárga szalag'), bin: 1 },
      { item: o(<Pencil len={0.95} color={COL.piros} className={sm} />, 'hosszú piros ceruza'), bin: 0 },
      { item: o(<Carrot len={0.35} className={sm} />, 'pici répa'), bin: 1 },
    ],
  },
  3: {
    say: 'Magas vagy alacsony? Válogasd szét!',
    bins: [
      { label: 'Magas', figure: <Tree h={1} className="w-12 h-12" />, say: 'magas' },
      { label: 'Alacsony', figure: <Tree h={0.3} className="w-12 h-12" />, say: 'alacsony' },
    ],
    items: [
      { item: o(<Tree h={0.95} crown={COL.zold} className={sm} />, 'magas fa'), bin: 0 },
      { item: o(<Tree h={0.3} crown={COL.zold} className={sm} />, 'alacsony fa'), bin: 1 },
      { item: o(<House w={0.4} h={1} className={sm} />, 'magas ház'), bin: 0 },
      { item: o(<House w={0.6} h={0.3} className={sm} />, 'alacsony ház'), bin: 1 },
      { item: o(<Flower h={1} color={COL.sarga} className={sm} />, 'magas virág'), bin: 0 },
      { item: o(<Flower h={0.25} color={COL.lila} className={sm} />, 'alacsony virág'), bin: 1 },
      { item: o(<Kid h={1} shirt={COL.kek} className={sm} />, 'magas gyerek'), bin: 0 },
      { item: o(<Tower n={2} a={12} className={sm} />, 'alacsony torony'), bin: 1 },
      { item: o(<Tower n={5} a={15} className={sm} />, 'magas torony'), bin: 0 },
    ],
  },
};

export const OsszehasonlitasokG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="2. Összehasonlítások"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • JÁTÉK"
    base="g1-prep-osszehasonlitasok"
    chapterId="elokeszito-idoszak"
    questions={OSSZEHASONLITASOK_G1_QUESTIONS}
    pairs={OSSZEHASONLITASOK_G1_PAIRS}
    sort={OSSZEHASONLITASOK_G1_SORT}
    {...props}
  />
);

export default OsszehasonlitasokG1Jatek;
