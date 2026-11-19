import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import {
  AraszScene,
  BeadsFig,
  BenchSticksScene,
  FlowerFig,
  HeightScene,
  IconFig,
  LenFig,
  MeterScene,
  PathsScene,
  RealFig,
  RibbonRodsScene,
  ShoeFig,
  StepsScene,
  StickRowFig,
  StripFig,
  TowerFig,
  TowersScene,
  TwoToolsScene,
  VsRodFig,
  vsRod,
} from './AHosszusagMereseG1Scenes';

const ribbon = (len: number, color: string, say: string) => ({ figure: <LenFig len={len} color={color} />, say });
const pencil = (len: number, color: string, say: string) => ({ figure: <LenFig k="ceruza" len={len} color={color} />, say });
const beads = (n: number, color: string, say: string) => ({ figure: <BeadsFig n={n} color={color} />, say });
const fl = (h: number, color: string, say: string) => ({ figure: <FlowerFig h={h} color={color} />, say });
const strip = (wide: boolean, color: string, say: string) => ({ figure: <StripFig wide={wide} color={color} />, say });
const real = (k: Parameters<typeof RealFig>[0]['k'], say: string) => ({ figure: <RealFig k={k} />, say });
const icon = (k: Parameters<typeof IconFig>[0]['icon'], say: string) => ({ figure: <IconFig icon={k} />, say });
const tower = (n: number) => ({ figure: <TowerFig n={n} />, say: `${n} rúd magas torony` });
const dm = (n: number) => ({ label: `${n} dm`, say: `${n} deciméter` });
const m = (n: number) => ({ label: `${n} m`, say: `${n} méter` });

export const A_HOSSZUSAG_MERESE_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – összehasonlítás, számlálás
  { id: 'h1', level: 1, badge: 'Hosszabb, rövidebb', ask: 'Melyik szalag a hosszabb?', options: [ribbon(210, '#22c55e', 'a zöld szalag'), ribbon(130, '#ef4444', 'a piros szalag')], hint: 'Mindkettő ugyanonnan indul. Melyiknek a vége van messzebb?' },
  { id: 'h2', level: 1, badge: 'Hosszabb, rövidebb', ask: 'Melyik ceruza a legrövidebb?', options: [pencil(90, '#3b82f6', 'a kék ceruza'), pencil(200, '#ef4444', 'a piros ceruza'), pencil(150, '#22c55e', 'a zöld ceruza')], hint: 'A leghosszabbat keresed? Most a legrövidebb kell: amelyiknek a hegye a legközelebb van.' },
  { id: 'h3', level: 1, badge: 'Magasabb, alacsonyabb', ask: 'Melyik virág a legmagasabb?', options: [fl(180, '#a855f7', 'a lila virág'), fl(110, '#facc15', 'a sárga virág'), fl(140, '#ef4444', 'a piros virág')], hint: 'Melyiknek ér a feje a legfeljebb?' },
  { id: 'h4', level: 1, badge: 'Magasabb, alacsonyabb', ask: 'Melyik torony a legalacsonyabb?', options: [tower(3), tower(7), tower(5)], hint: 'A legmagasabbat választottad? Most azt keresd, amelyik a legkisebb!' },
  { id: 'h5', level: 1, badge: 'Mérés pálcikával', ask: 'Hány pálcika hosszú a pad?', say: 'Pötyi pálcikákkal mérte meg a padot. Hány pálcika hosszú?', scene: <BenchSticksScene n={4} />, options: [4, 3, 5], hint: 'Mutass rá minden pálcikára, és számold meg őket!' },
  { id: 'h6', level: 1, badge: 'Széles, keskeny', ask: 'Melyik szalag a keskenyebb?', options: [strip(false, '#f472b6', 'keskeny rózsaszín szalag'), strip(true, '#38bdf8', 'széles kék szalag')], hint: 'A keskeny szalag vékony csík. Melyik a vékonyabb?' },
  { id: 'h7', level: 1, badge: 'Mérés lépéssel', ask: 'Hány lépés az út?', say: 'Pötyi végiglépkedett a kerti úton. Hány lépés volt?', scene: <StepsScene small={7} />, options: [7, 6, 8], hint: 'Mutass rá minden lábnyomra, és számold meg őket!' },
  { id: 'h8', level: 1, badge: 'Hosszabb, rövidebb', ask: 'Melyik gyöngysor a leghosszabb?', say: 'Zümi gyöngyöt fűzött. Melyik gyöngysor a leghosszabb?', options: [beads(7, '#a855f7', 'hét gyöngy'), beads(4, '#22c55e', 'négy gyöngy'), beads(5, '#ef4444', 'öt gyöngy')], hint: 'Ugyanakkorák a gyöngyök. Amelyikben több van, az hosszabb.' },
  // 2. szint – mérés araszzal, rúddal, deciméter, méter
  { id: 'h9', level: 2, badge: 'Mérés araszzal', ask: 'Hány arasz hosszú az asztal?', scene: <AraszScene n={3} />, options: [3, 2, 4], hint: 'Számold meg a kék íveket! Mindegyik egy arasz.' },
  { id: 'h10', level: 2, badge: 'A rúd: 1 dm', ask: 'Melyik rövidebb a rúdnál?', say: 'Melyik tárgy rövidebb a narancssárga rúdnál?', options: [vsRod('radir', 0.6), vsRod('ceruza', 1.7, '#22c55e'), vsRod('ecset', 2.2)], hint: 'A rúd vége a narancs szaggatott vonalnál van. Melyik nem éri el?' },
  { id: 'h11', level: 2, badge: 'A rúd: 1 dm', ask: 'Melyik hosszabb a rúdnál?', say: 'Melyik tárgy hosszabb a narancssárga rúdnál?', options: [vsRod('szalag', 2.5, '#3b82f6'), vsRod('katica', 0.5), vsRod('kulcs', 0.8)], hint: 'Melyik nyúlik túl a narancs szaggatott vonalon?' },
  { id: 'h12', level: 2, badge: 'Magasság dm-ben', ask: 'Hány dm magas a cserép virággal?', say: 'Hány deciméter magas a virágcserép a virággal együtt?', scene: <HeightScene n={3} what="cserep" />, options: [3, 2, 4], hint: 'Számold meg a rudakat alulról a szaggatott vonalig!' },
  { id: 'h13', level: 2, badge: 'Magasság dm-ben', ask: 'Hány dm magas a szék?', say: 'Hány deciméter magas a szék?', scene: <HeightScene n={5} what="szek" />, options: [5, 4, 6], hint: 'Minden rúd 1 deciméter. Számold meg őket!' },
  { id: 'h14', level: 2, badge: 'Mérés fonallal', ask: 'Kinek az útja rövidebb?', say: 'Zümi egyenesen repült, Csigusz kanyargott. Kinek az útja rövidebb?', scene: <PathsScene />, options: [icon('meh', 'Zümi útja'), icon('csiga', 'Csigusz útja')], hint: 'A kanyargós utat ha kiegyenesítenéd, messzebbre érne. Melyik a rövidebb?' },
  { id: 'h15', level: 2, badge: 'Mérés rúddal', ask: 'Hány rúd hosszú a szalag?', scene: <RibbonRodsScene ribbons={[{ n: 6, color: '#a855f7' }]} />, options: [6, 5, 7], hint: 'Számold meg a narancssárga rudakat a szalag alatt!' },
  { id: 'h16', level: 2, badge: 'Méter és deciméter', ask: 'Hány dm 1 méter?', say: 'Hány deciméter 1 méter? Számold meg a rudakat!', scene: <MeterScene />, options: [10, 9, 5], hint: 'Számold meg a narancssárga rudakat a méterrúd alatt!' },
  // 3. szint – mértékegység mérete, becslés, számolás dm-rel
  { id: 'h17', level: 3, badge: 'Kisebb egység – több darab', ask: 'Melyikből kell több a padhoz?', say: 'A padot megmérjük a rövid pálcikával és a hosszú pálcával is. Melyikből kell több?', scene: <TwoToolsScene />, options: [{ figure: <StickRowFig n={1} className="w-16 h-10" />, say: 'a rövid pálcikából' }, { figure: <svg viewBox="0 0 170 40" className="w-40 h-10"><path d="M6 20 H164" stroke="#a16207" strokeWidth="8" strokeLinecap="round" /></svg>, say: 'a hosszú pálcából' }], hint: 'A rövid pálcika kevés helyet takar le. Abból sok kell, vagy kevés?' },
  { id: 'h18', level: 3, badge: 'Kisebb egység – több darab', ask: 'Melyikkel kell kevesebbet lépni?', say: 'Ugyanazt az utat lemérjük kis cipővel és nagy csizmával. Melyikkel kell kevesebbet lépni?', options: [{ figure: <ShoeFig big />, say: 'a nagy csizmával' }, { figure: <ShoeFig />, say: 'a kis cipővel' }], hint: 'Nagy lépéssel gyorsabban végigérsz. Melyik lép nagyot?' },
  { id: 'h19', level: 3, badge: 'Számolás dm-rel', ask: '2 dm piros, 7 dm sárga. Összesen?', say: 'Pötyinek 2 deciméter piros és 7 deciméter sárga szalagja van. Hány deciméter összesen?', scene: <RibbonRodsScene ribbons={[{ n: 2, color: '#ef4444', label: '2 dm' }, { n: 7, color: '#facc15', label: '7 dm' }]} showRods={false} />, options: [9, 8, 5], hint: 'Add össze: 2 meg 7. Számolj tovább 7-től kettőt!' },
  { id: 'h20', level: 3, badge: 'Számolás dm-rel', ask: '10 dm-ből levágunk 4 dm-t. Mennyi marad?', say: 'A szalag 10 deciméter. Levágunk belőle 4 deciméteret. Hány deciméter marad?', scene: <RibbonRodsScene ribbons={[{ n: 10, color: '#22c55e' }]} cut={4} />, options: [6, 4, 5], hint: 'Ne az áthúzottakat számold! Azokat számold, amelyek megmaradnak.' },
  { id: 'h21', level: 3, badge: 'Becslés: 1 méter', ask: 'Melyik magasabb 1 méternél?', say: 'A valóságban melyik magasabb 1 méternél?', options: [real('fa', 'a fa'), icon('virag', 'a virág'), icon('labda', 'a labda')], hint: '1 méter körülbelül a derekadig ér. Melyik nagyobb nálad is?' },
  { id: 'h22', level: 3, badge: 'Becslés: 1 deciméter', ask: 'Melyik rövidebb 1 dm-nél?', say: 'A valóságban melyik rövidebb 1 deciméternél, a narancssárga rúdnál?', options: [icon('katica', 'a katica'), real('bicikli', 'a bicikli'), real('pad', 'a pad')], hint: 'A rúd olyan hosszú, mint a tenyered. Melyik fér el a tenyereden?' },
  { id: 'h23', level: 3, badge: 'Magasság rúddal', ask: 'Hány rúd a legmagasabb torony?', say: 'Három torony épült rudakból. Hány rúd magas a legmagasabb?', scene: <TowersScene towers={[{ n: 5, color: '#3b82f6' }, { n: 8, color: '#ef4444' }, { n: 4, color: '#22c55e' }]} />, options: [8, 5, 4], hint: 'Előbb keresd meg a legmagasabbat, aztán számold meg a rudjait!' },
  { id: 'h24', level: 3, badge: 'Mennyivel hosszabb?', ask: 'Mennyivel hosszabb a kék szalag?', say: 'A kék szalag 5 rúd, a piros 3 rúd hosszú. Mennyivel hosszabb a kék?', scene: <RibbonRodsScene ribbons={[{ n: 5, color: '#3b82f6' }, { n: 3, color: '#ef4444' }]} />, options: [2, 3, 8], hint: 'Nézd meg, hány rúd lóg túl a piros szalag végén!' },
];

export const A_HOSSZUSAG_MERESE_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Hány pálcika van a sorban? Párosítsd a számmal!',
    pairs: [
      { a: { figure: <StickRowFig n={2} />, say: 'két pálcika' }, b: 2 },
      { a: { figure: <StickRowFig n={3} />, say: 'három pálcika' }, b: 3 },
      { a: { figure: <StickRowFig n={4} />, say: 'négy pálcika' }, b: 4 },
      { a: { figure: <StickRowFig n={5} />, say: 'öt pálcika' }, b: 5 },
    ],
  },
  2: {
    say: 'Hány deciméter magas a torony? Minden rúd 1 deciméter. Párosítsd!',
    pairs: [
      { a: tower(2), b: dm(2) },
      { a: tower(4), b: dm(4) },
      { a: tower(6), b: dm(6) },
      { a: tower(9), b: dm(9) },
    ],
  },
  3: {
    say: 'Milyen magas vagy hosszú lehet a valóságban? Párosítsd!',
    pairs: [
      { a: real('haz', 'a ház'), b: m(10) },
      { a: real('fa', 'a fa'), b: m(5) },
      { a: real('bicikli', 'a bicikli'), b: m(1) },
      { a: { figure: <LenFig k="ceruza" len={120} color="#22c55e" />, say: 'a ceruza' }, b: dm(2) },
    ],
  },
};

export const A_HOSSZUSAG_MERESE_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Széles vagy keskeny a szalag? Tedd a jó kosárba!',
    bins: [
      { label: 'Széles', figure: <StripFig wide color="#94a3b8" className="w-14 h-8" />, say: 'széles' },
      { label: 'Keskeny', figure: <StripFig wide={false} color="#94a3b8" className="w-14 h-8" />, say: 'keskeny' },
    ],
    items: [
      { item: strip(true, '#ef4444', 'széles piros szalag'), bin: 0 },
      { item: strip(false, '#ef4444', 'keskeny piros szalag'), bin: 1 },
      { item: strip(true, '#22c55e', 'széles zöld szalag'), bin: 0 },
      { item: strip(false, '#22c55e', 'keskeny zöld szalag'), bin: 1 },
      { item: strip(false, '#a855f7', 'keskeny lila szalag'), bin: 1 },
      { item: strip(true, '#facc15', 'széles sárga szalag'), bin: 0 },
      { item: strip(false, '#3b82f6', 'keskeny kék szalag'), bin: 1 },
    ],
  },
  2: {
    say: 'A valóságban magasabb 1 méternél, vagy alacsonyabb? Tedd a jó kosárba!',
    bins: [
      { label: 'Magasabb', figure: <RealFig k="fa" className="w-10 h-10" />, say: 'magasabb 1 méternél' },
      { label: 'Alacsonyabb', figure: <IconFig icon="gomba" className="w-10 h-10" />, say: 'alacsonyabb 1 méternél' },
    ],
    items: [
      { item: real('fa', 'fa'), bin: 0 },
      { item: real('haz', 'ház'), bin: 0 },
      { item: real('lampa', 'lámpaoszlop'), bin: 0 },
      { item: icon('virag', 'virág'), bin: 1 },
      { item: icon('labda', 'labda'), bin: 1 },
      { item: icon('alma', 'alma'), bin: 1 },
      { item: icon('katica', 'katica'), bin: 1 },
      { item: icon('gomba', 'gomba'), bin: 1 },
    ],
  },
  3: {
    say: 'Rövidebb, ugyanolyan hosszú, vagy hosszabb, mint a narancssárga rúd?',
    bins: [
      { label: 'Rövidebb', figure: <VsRodFig k="palcika" rel={0.5} className="w-16 h-8" />, say: 'rövidebb a rúdnál' },
      { label: 'Ugyanolyan', figure: <VsRodFig k="palcika" rel={1} className="w-16 h-8" />, say: 'ugyanolyan hosszú, mint a rúd' },
      { label: 'Hosszabb', figure: <VsRodFig k="palcika" rel={2} className="w-16 h-8" />, say: 'hosszabb a rúdnál' },
    ],
    items: [
      { item: vsRod('radir', 0.6), bin: 0 },
      { item: vsRod('katica', 0.4), bin: 0 },
      { item: vsRod('szalag', 1, '#ef4444'), bin: 1 },
      { item: vsRod('palcika', 1), bin: 1 },
      { item: vsRod('ceruza', 1.8, '#3b82f6'), bin: 2 },
      { item: vsRod('ecset', 2.3), bin: 2 },
      { item: vsRod('kulcs', 0.7), bin: 0 },
      { item: vsRod('szalag', 2.6, '#22c55e'), bin: 2 },
    ],
  },
};

export const AHosszusagMereseG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="1. A hosszúság mérése"
    badge="1. OSZTÁLY • V. MÉRÉSEK • JÁTÉK"
    base="g1-meas-a-hosszusag-merese"
    chapterId="meresek"
    questions={A_HOSSZUSAG_MERESE_G1_QUESTIONS}
    pairs={A_HOSSZUSAG_MERESE_G1_PAIRS}
    sort={A_HOSSZUSAG_MERESE_G1_SORT}
    {...props}
  />
);

export default AHosszusagMereseG1Jatek;
