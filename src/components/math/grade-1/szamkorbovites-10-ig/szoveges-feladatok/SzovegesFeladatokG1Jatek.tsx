import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign } from '../../shared/G1Pics';
import { CountBox, MiniBox, SnowmanScene } from '../a-nyolc/ANyolcG1Scenes';
import { FeederScene, PotyiWingsScene, TwoRowsScene } from '../a-tiz/ATizG1Scenes';
import { PinsScene } from '../szamolas-0-tol-10-ig/Szamolas0Tol10IgG1Scenes';
import { ArrowCard, FallenButtonsExtra, MoreLessScene, SpeakerFig, TwoPilesScene } from './SzovegesFeladatokG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const big = 'w-full max-w-[340px] h-auto mx-auto';
const rows = (a: number, b: number, say: string) => sm(<TwoRowsScene a={a} b={b} icon="hogolyo" />, say);

export const SZOVEGES_FELADATOK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – rövid mese képpel, egy lépés
  { id: 'f1', level: 1, badge: 'Összesen', ask: 'Hány hógolyót gyúrtak összesen?', say: 'Pötyi 3 hógolyót gyúrt, Zümi 2-t. Hány hógolyót gyúrtak összesen?', scene: <TwoPilesScene a={3} b={2} />, options: [5, 1, 4], hint: 'Rakd össze a két kupacot, és számold meg mindet!' },
  { id: 'f2', level: 1, badge: 'Maradt', ask: 'Hány madár maradt az etetőn?', say: '5 madár ült az etetőn. 2 elrepült. Hány madár maradt?', scene: <FeederScene birds={3} away={2} />, options: [3, 2, 5], hint: 'A repülőket ne számold, csak az etetőn ülőket!' },
  { id: 'f3', level: 1, badge: 'Maradt', ask: 'Hány alma maradt?', say: 'A tányéron 6 alma volt. Csigusz megevett 1-et. Hány alma maradt?', scene: <CountBox icon="alma" n={6} crossed={1} className={big} />, options: [5, 6, 7], hint: 'Az áthúzott almát Csigusz megette. Ne számold!' },
  { id: 'f4', level: 1, badge: 'Jött még', ask: 'Hány madár lesz az etetőn?', say: 'Az etetőn 4 madár ült. Jött még 4. Hány madár lesz az etetőn?', scene: <FeederScene birds={4} coming={4} />, options: [8, 4, 7], hint: 'Számolj tovább a 4-től a jövő madarakkal!' },
  { id: 'f5', level: 1, badge: 'Kép a meséhez', ask: 'Melyik kép illik a meséhez?', say: 'Csigusz talált 4 gombát. Melyik kép illik a meséhez?', options: [sm(<CountBox icon="gomba" n={4} />, 'négy gomba'), sm(<CountBox icon="gomba" n={3} />, 'három gomba'), sm(<CountBox icon="gomba" n={5} />, 'öt gomba')], hint: 'Számold meg a gombákat mindegyik képen!' },
  { id: 'f6', level: 1, badge: 'Maradt', ask: 'Hány bábu áll még?', say: '10 bábu állt. Zümi gurított, és 5 eldőlt. Hány bábu áll még?', scene: <PinsScene standing={5} fallen={5} />, options: [5, 10, 4], hint: 'Csak az álló bábukat számold!' },
  { id: 'f7', level: 1, badge: 'Összesen', ask: 'Hány sapka van összesen?', say: 'Zümi 6 piros sapkát és 1 kék sapkát kötött. Hány sapkát kötött összesen?', scene: <CountBox icon="sapka" n={6} nb={1} color="#ef4444" colorB="#3b82f6" className={big} />, options: [7, 6, 5], hint: 'Számolj tovább a 6-tól a kék sapkával!' },
  { id: 'f8', level: 1, badge: 'Maradt', ask: 'Hány hógolyó maradt?', say: 'Pötyinek 9 hógolyója volt. 2 elolvadt. Hány hógolyója maradt?', scene: <CountBox icon="hogolyo" n={9} crossed={2} className={big} />, options: [7, 2, 9], hint: 'Az áthúzottak elolvadtak. Ne számold őket!' },
  // 2. szint – melyik művelet illik a meséhez?
  { id: 'f9', level: 2, badge: 'Melyik művelet?', ask: 'Melyik művelet illik a meséhez?', say: 'Pötyi 5 hógolyót gyúrt, Zümi 4-et. Hány hógolyót gyúrtak összesen? Melyik művelet illik a meséhez?', scene: <TwoPilesScene a={5} b={4} />, options: ['5 + 4', '5 − 4', '4 − 1'], hint: 'Összesen kell: összerakjuk a kupacokat. Több lesz.' },
  { id: 'f10', level: 2, badge: 'Melyik művelet?', ask: 'Melyik művelet illik a meséhez?', say: '8 madár ült az etetőn. 3 elrepült. Hány maradt? Melyik művelet illik a meséhez?', scene: <FeederScene birds={5} away={3} />, options: ['8 − 3', '8 + 3', '5 − 3'], hint: 'Elrepültek: kevesebb lett. Hány madár volt az elején?' },
  { id: 'f11', level: 2, badge: 'Melyik művelet?', ask: 'Melyik művelet illik a meséhez?', say: 'Csigusz 6 levelet gyűjtött, aztán még 2-t. Hány levele van? Melyik művelet illik a meséhez?', scene: <CountBox icon="level" n={6} nb={2} colorB="#f59e0b" className={big} />, options: ['6 + 2', '6 − 2', '2 + 2'], hint: 'Gyűjtött még: több lett. Hány levéllel kezdte?' },
  { id: 'f12', level: 2, badge: 'Melyik művelet?', ask: 'Melyik művelet illik a meséhez?', say: '10 bábu állt. 4 eldőlt. Hány bábu áll még? Melyik művelet illik a meséhez?', scene: <PinsScene standing={6} fallen={4} />, options: ['10 − 4', '4 + 4', '4 − 1'], hint: 'Eldőltek: kevesebb áll. 10-ből indulunk.' },
  { id: 'f13', level: 2, badge: 'Összesen', ask: 'Hány virága van Züminek?', say: 'Zümi 3 virágot szedett, aztán még 3-at. Hány virága van?', scene: <CountBox icon="virag" n={3} nb={3} colorB="#a855f7" className={big} />, options: [6, 3, 5], hint: 'Számolj tovább a 3-tól még hármat!' },
  { id: 'f14', level: 2, badge: 'Kép a meséhez', ask: 'Melyik kép illik a meséhez?', say: 'Az etetőn 6 madár ült. 2 elrepült. Melyik kép illik a meséhez?', options: [sm(<CountBox icon="madar" n={6} crossed={2} />, 'hat madár, kettő áthúzva'), sm(<CountBox icon="madar" n={6} nb={2} colorB="#fb923c" />, 'hat madár, és jött még kettő'), sm(<CountBox icon="madar" n={4} />, 'négy madár')], hint: 'A mesében 6 madár volt, és 2 elment. Hol van 6, ebből 2 áthúzva?' },
  { id: 'f15', level: 2, badge: 'Maradt', ask: 'Hány hógolyó maradt a dobozban?', say: 'A dobozban 10 hógolyó volt. Pötyi kivett 3-at. Hány hógolyó maradt a dobozban?', scene: <CountBox icon="hogolyo" n={10} crossed={3} className={big} />, options: [7, 3, 6], hint: 'Az áthúzottakat Pötyi kivette. Ne számold őket!' },
  { id: 'f16', level: 2, badge: 'Melyik mondat igaz?', ask: 'Melyik illik a meséhez?', say: 'Csigusz reggel 4 epret evett, délben 2-t. Hány epret evett összesen? Melyik illik a meséhez?', scene: <CountBox icon="eper" n={4} nb={2} className={big} />, options: ['4 + 2 = 6', '4 + 2 = 5', '4 − 2 = 2'], hint: 'Összesen kell: összeadás. Számold ki pontosan!' },
  // 3. szint – több / kevesebb, hány volt, kiegészítés
  { id: 'f17', level: 3, badge: 'Ennyivel több', ask: 'Hány virágot talált Csigusz?', say: 'Zümi 5 virágot talált. Csigusz 2-vel többet. Hány virágot talált Csigusz?', scene: <MoreLessScene a={5} diff={2} more icon="virag" />, options: [7, 3, 5], hint: '2-vel több: tegyél hozzá 2-t az 5-höz!' },
  { id: 'f18', level: 3, badge: 'Ennyivel kevesebb', ask: 'Hány hógolyót gyúrt Zümi?', say: 'Pötyi 9 hógolyót gyúrt. Zümi 3-mal kevesebbet. Hány hógolyót gyúrt Zümi?', scene: <MoreLessScene a={9} diff={3} more={false} icon="hogolyo" whoA="potyi" whoB="meh" />, options: [6, 3, 9], hint: '3-mal kevesebb: vegyél el 3-at a 9-ből!' },
  { id: 'f19', level: 3, badge: 'Hány volt?', ask: 'Hány gomb volt a hóemberen?', say: 'A hóemberről leesett 4 gomb. 3 gomb maradt rajta. Hány gomb volt rajta az elején?', scene: <SnowmanScene buttons={3} extra={<FallenButtonsExtra down={4} />} />, options: [7, 1, 4], hint: 'Rakd vissza a leesett gombokat! Számold meg a fentieket és a lentieket együtt.' },
  { id: 'f20', level: 3, badge: 'Kiegészítés', ask: 'Hány pötty kell még Pötyinek?', say: 'Pötyinek 6 pöttye van. Hány pötty kell még, hogy 10 legyen?', scene: <PotyiWingsScene dots={6} label={10} />, options: [4, 3, 6], hint: 'Számolj tovább a 6-tól a 10-ig: 7, 8, 9, 10. Hányat számoltál?' },
  { id: 'f21', level: 3, badge: 'Melyik művelet?', ask: 'Melyik művelet illik a meséhez?', say: 'Zümi 4 gombát talált. Csigusz 2-vel többet. Hány gombát talált Csigusz? Melyik művelet illik a meséhez?', scene: <MoreLessScene a={4} diff={2} more icon="gomba" />, options: ['4 + 2', '4 − 2'], hint: 'Több: hozzáadunk.' },
  { id: 'f22', level: 3, badge: 'Melyik művelet?', ask: 'Melyik művelet illik a meséhez?', say: 'Pötyi 7 csillagot rajzolt a hóba. Zümi 2-vel kevesebbet. Hány csillagot rajzolt Zümi? Melyik művelet illik a meséhez?', scene: <MoreLessScene a={7} diff={2} more={false} icon="csillag" whoA="potyi" whoB="meh" />, options: ['7 − 2', '7 + 2'], hint: 'Kevesebb: elveszünk.' },
  { id: 'f23', level: 3, badge: 'Hány volt?', ask: 'Hány eper volt a tányéron?', say: 'Csigusz megevett 3 epret. 5 eper maradt a tányéron. Hány eper volt a tányéron az elején?', scene: <CountBox icon="eper" n={8} crossed={3} className={big} />, options: [8, 2, 5], hint: 'Számold meg az áthúzottakat is! Azok is ott voltak az elején.' },
  { id: 'f24', level: 3, badge: 'Mennyivel több?', ask: 'Mennyivel több hógolyót gyúrt Zümi?', say: 'Fent Zümi 9 hógolyója, lent Pötyi 6 hógolyója. Mennyivel több hógolyót gyúrt Zümi?', scene: <TwoRowsScene a={9} b={6} icon="hogolyo" />, options: [3, 2, 6], hint: 'Párosítsd őket! Hány fenti hógolyónak nem jut pár?' },
];

export const SZOVEGES_FELADATOK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Melyik művelet illik a képhez? Párosítsd!',
    pairs: [
      { a: sm(<MiniBox icon="hogolyo" n={3} nb={2} colorB="#93c5fd" />, 'három és még kettő hógolyó'), b: '3 + 2' },
      { a: sm(<MiniBox icon="alma" n={6} crossed={2} />, 'hat alma, kettőt megettek'), b: '6 − 2' },
      { a: sm(<MiniBox icon="madar" n={4} nb={4} colorB="#fb923c" />, 'négy madár, és jött még négy'), b: '4 + 4' },
      { a: sm(<MiniBox icon="csillag" n={9} crossed={5} />, 'kilenc csillag, ötöt áthúztunk'), b: '9 − 5' },
    ],
  },
  2: {
    say: 'Számold ki! Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '7 + 3', b: 10 },
      { a: '8 − 4', b: 4 },
      { a: '5 + 1', b: 6 },
      { a: '9 − 7', b: 2 },
      { a: '3 + 5', b: 8 },
    ],
  },
  3: {
    say: 'Mennyivel több van fent? Párosítsd a képet a számmal!',
    pairs: [
      { a: rows(7, 5, 'fent hét, lent öt'), b: 2 },
      { a: rows(6, 3, 'fent hat, lent három'), b: 3 },
      { a: rows(5, 4, 'fent öt, lent négy'), b: 1 },
      { a: rows(8, 4, 'fent nyolc, lent négy'), b: 4 },
    ],
  },
};

export const SZOVEGES_FELADATOK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Hozzáadtunk vagy elvettünk? Tedd a képet a jó kosárba!',
    bins: [
      { label: '+', figure: <BigSign text="+" className="w-12 h-12" />, say: 'összeadás, több lett' },
      { label: '−', figure: <BigSign text="−" className="w-12 h-12" />, say: 'kivonás, kevesebb lett' },
    ],
    items: [
      { item: sm(<MiniBox icon="hogolyo" n={5} nb={2} colorB="#93c5fd" />, 'jött még két hógolyó'), bin: 0 },
      { item: sm(<MiniBox icon="alma" n={7} crossed={3} />, 'hármat megettek'), bin: 1 },
      { item: sm(<MiniBox icon="madar" n={3} nb={3} colorB="#fb923c" />, 'jött még három madár'), bin: 0 },
      { item: sm(<MiniBox icon="eper" n={8} crossed={1} />, 'egyet megettek'), bin: 1 },
      { item: sm(<MiniBox icon="level" n={2} nb={6} colorB="#f59e0b" />, 'gyűjtött még hat levelet'), bin: 0 },
      { item: sm(<MiniBox icon="csillag" n={10} crossed={4} />, 'négyet áthúztunk'), bin: 1 },
      { item: sm(<MiniBox icon="sapka" n={4} nb={1} colorB="#f97316" />, 'kötött még egy sapkát'), bin: 0 },
    ],
  },
  2: {
    say: 'Nézd a nyilat! Jön valami a kosárba, vagy kimegy belőle? Tedd a jó helyre!',
    bins: [
      { label: 'Jön, több lesz', figure: <BigSign text="+" className="w-12 h-12" />, say: 'jön, több lesz' },
      { label: 'Megy, kevesebb lesz', figure: <BigSign text="−" className="w-12 h-12" />, say: 'megy, kevesebb lesz' },
    ],
    items: [
      { item: sm(<ArrowCard icon="madar" n={3} dir="in" />, 'három madár jön'), bin: 0 },
      { item: sm(<ArrowCard icon="alma" n={2} dir="out" />, 'két alma kimegy'), bin: 1 },
      { item: sm(<ArrowCard icon="hogolyo" n={4} dir="in" />, 'négy hógolyó jön'), bin: 0 },
      { item: sm(<ArrowCard icon="eper" n={1} dir="out" />, 'egy eper kimegy'), bin: 1 },
      { item: sm(<ArrowCard icon="csillag" n={5} dir="out" />, 'öt csillag kimegy'), bin: 1 },
      { item: sm(<ArrowCard icon="gomba" n={2} dir="in" />, 'két gomba jön'), bin: 0 },
    ],
  },
  3: {
    say: 'Koppints a kártyára, és hallgasd meg a mesét! Több lett a végén, vagy kevesebb?',
    bins: [
      { label: 'Több lett', figure: <BigSign text="+" className="w-12 h-12" />, say: 'több lett' },
      { label: 'Kevesebb lett', figure: <BigSign text="−" className="w-12 h-12" />, say: 'kevesebb lett' },
    ],
    items: [
      { item: sm(<SpeakerFig icon="madar" />, 'Az etetőn 5 madár ült. 2 elrepült.'), bin: 1 },
      { item: sm(<SpeakerFig icon="hogolyo" />, 'Pötyi gyúrt 3 hógolyót, aztán még 4-et.'), bin: 0 },
      { item: sm(<SpeakerFig icon="alma" />, 'Csigusznak 6 almája volt. Megevett 2-t.'), bin: 1 },
      { item: sm(<SpeakerFig icon="virag" />, 'Zümi 4 virágot szedett, aztán még 1-et.'), bin: 0 },
      { item: sm(<SpeakerFig icon="sapka" />, 'A fogason 7 sapka lógott. 3-at levettek.'), bin: 1 },
      { item: sm(<SpeakerFig icon="csillag" />, 'Az égen 2 csillag ragyogott. Kigyúlt még 5.'), bin: 0 },
      { item: sm(<SpeakerFig icon="gomba" />, 'Csigusz talált 8 gombát. 4-et odaadott Züminek.'), bin: 1 },
    ],
  },
};

export const SzovegesFeladatokG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="19. Szöveges feladatok"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-szoveges-feladatok"
    chapterId="szamkorbovites-10-ig"
    questions={SZOVEGES_FELADATOK_G1_QUESTIONS}
    pairs={SZOVEGES_FELADATOK_G1_PAIRS}
    sort={SZOVEGES_FELADATOK_G1_SORT}
    {...props}
  />
);

export default SzovegesFeladatokG1Jatek;
