import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { FIG, Fig, FigRow, Figure, PC, Piece, PieceRow, RuleScene, figOpt, flip, mirror, recolor, without } from './PalcikakEsKorongokG1Scenes';

const sm = 'w-16 h-16';
const pc = (kind: React.ComponentProps<typeof Piece>['kind'], c: PC, say: string, className?: string) => ({ figure: <Piece kind={kind} c={c} className={className} />, say });
const fc = (f: Figure, say: string) => ({ figure: <Fig f={f} className={sm} />, say });

const redUp: Figure = [{ k: 's', x1: 16, y1: 72, x2: 104, y2: 72, c: 'piros' }, { k: 'd', x: 60, y: 56, c: 'piros' }];
const blueDown: Figure = [{ k: 's', x1: 16, y1: 48, x2: 104, y2: 48, c: 'kek' }, { k: 'd', x: 60, y: 64, c: 'kek' }];
const blueUp: Figure = [{ k: 's', x1: 16, y1: 72, x2: 104, y2: 72, c: 'kek' }, { k: 'd', x: 60, y: 56, c: 'kek' }];
const fence5 = (cols: (PC | null)[]): Figure => [
  ...cols.flatMap((c, i): Figure => (c ? [{ k: 's', x1: 14 + i * 23, y1: 24, x2: 14 + i * 23, y2: 106, c }] : [])),
  { k: 's', x1: 8, y1: 46, x2: 112, y2: 46, c: 'sarga' },
  { k: 's', x1: 8, y1: 86, x2: 112, y2: 86, c: 'sarga' },
];

export const PALCIKAK_ES_KORONGOK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – elemek, szín, irány, egyszerű másolás
  { id: 'p1', level: 1, badge: 'Korong', ask: 'Melyik a korong?', options: [pc('korong', 'piros', 'piros korong'), pc('allo', 'piros', 'piros pálcika')], hint: 'A korong kerek és lapos, mint egy gomb.' },
  { id: 'p2', level: 1, badge: 'Pálcika', ask: 'Melyik a pálcika?', options: [pc('ferde', 'sarga', 'sárga pálcika'), pc('korong', 'sarga', 'sárga korong')], hint: 'A pálcika hosszú és vékony, mint egy kis bot.' },
  { id: 'p3', level: 1, badge: 'Álló, fekvő', ask: 'Melyik pálcika áll?', options: [pc('allo', 'kek', 'álló pálcika'), pc('fekvo', 'kek', 'fekvő pálcika')], hint: 'Az álló pálcika fentről lefelé megy, mint egy fa.' },
  { id: 'p4', level: 1, badge: 'Álló, fekvő', ask: 'Melyik pálcika fekszik?', options: [pc('fekvo', 'piros', 'fekvő pálcika'), pc('allo', 'piros', 'álló pálcika'), pc('ferde', 'piros', 'ferde pálcika')], hint: 'A fekvő pálcika úgy van, mint aki alszik: balról jobbra.' },
  { id: 'p5', level: 1, badge: 'Szín', ask: 'Melyik korong kék?', options: [pc('korong', 'kek', 'kék korong'), pc('korong', 'piros', 'piros korong')], hint: 'Kék, mint az ég.' },
  { id: 'p6', level: 1, badge: 'Szín', ask: 'Melyik pálcika zöld?', options: [pc('allo', 'zold', 'zöld pálcika'), pc('allo', 'sarga', 'sárga pálcika'), pc('allo', 'piros', 'piros pálcika')], hint: 'Zöld, mint a fű.' },
  { id: 'p7', level: 1, badge: 'Minta szerint', ask: 'Melyik ugyanolyan, mint a minta?', scene: <FigRow figs={[FIG.kapu]} />, options: [figOpt(FIG.kapu, 'ugyanolyan kapu'), figOpt(recolor(FIG.kapu, { piros: 'zold' }), 'zöld tetejű kapu')], hint: 'Nézd meg a kapu tetejét! Milyen színű a mintán?' },
  { id: 'p8', level: 1, badge: 'Minta szerint', ask: 'Melyiket rakta ki Pötyi?', say: 'Pötyi nyalókát rakott ki: fent a korong, alatta a pálcika. Melyik az?', scene: <FigRow figs={[FIG.nyaloka]} />, options: [figOpt(FIG.nyaloka, 'fent a korong'), figOpt(flip(FIG.nyaloka), 'lent a korong')], hint: 'A mintán a korong fent van.' },
  // 2. szint – hiányzó elem, sor, irány, színcsere
  { id: 'p9', level: 2, badge: 'Mi hiányzik?', ask: 'Mi hiányzik a babáról?', say: 'Az első a minta. A második babáról lemaradt valami. Mi hiányzik?', scene: <FigRow figs={[FIG.baba, without(FIG.baba, 4)]} />, options: [pc('ferde', 'zold', 'zöld pálcika'), pc('korong', 'piros', 'piros korong'), pc('fekvo', 'sarga', 'sárga pálcika')], hint: 'Nézd meg a baba lábait a mintán!' },
  { id: 'p10', level: 2, badge: 'Mi hiányzik?', ask: 'Mi hiányzik a házról?', say: 'Az első ház a minta. A másodikról mi hiányzik?', scene: <FigRow figs={[FIG.haz, FIG.haz.slice(0, 4)]} />, options: [pc('teto', 'piros', 'piros tető'), pc('allo', 'kek', 'kék pálcika'), pc('korong', 'piros', 'piros korong')], hint: 'Nézd meg a ház tetejét a mintán!' },
  { id: 'p11', level: 2, badge: 'Sor folytatása', ask: 'Mi jön ezután?', say: 'Piros korong, kék korong, piros korong, kék korong. Mi jön ezután?', scene: <PieceRow items={[{ kind: 'korong', c: 'piros' }, { kind: 'korong', c: 'kek' }, { kind: 'korong', c: 'piros' }, { kind: 'korong', c: 'kek' }, null]} />, options: [pc('korong', 'piros', 'piros korong'), pc('korong', 'kek', 'kék korong'), pc('allo', 'piros', 'piros pálcika')], hint: 'Mondd ki hangosan: piros, kék, piros, kék… és most?' },
  { id: 'p12', level: 2, badge: 'Sor folytatása', ask: 'Mi jön ezután?', say: 'Álló, fekvő, álló, fekvő. Mi jön ezután?', scene: <PieceRow items={[{ kind: 'allo', c: 'sarga' }, { kind: 'fekvo', c: 'sarga' }, { kind: 'allo', c: 'sarga' }, { kind: 'fekvo', c: 'sarga' }, null]} />, options: [pc('allo', 'sarga', 'álló pálcika'), pc('fekvo', 'sarga', 'fekvő pálcika'), pc('ferde', 'sarga', 'ferde pálcika')], hint: 'A fekvő után mindig álló jön.' },
  { id: 'p13', level: 2, badge: 'Irány', ask: 'Melyik ugyanolyan, mint a minta?', say: 'Nézd meg a széket! Merre néz a háttámlája? Melyik ugyanolyan?', scene: <FigRow figs={[FIG.szek]} />, options: [figOpt(FIG.szek, 'balra a támla'), figOpt(mirror(FIG.szek), 'jobbra a támla')], hint: 'A mintán a támla a bal oldalon van.' },
  { id: 'p14', level: 2, badge: 'Színcsere', ask: 'Melyik lett a varázslat után?', say: 'A szabály: ami sárga, az piros lesz. Melyik lett a létrából?', scene: <RuleScene rules={[['sarga', 'piros']]} model={recolor(FIG.letra, { piros: 'kek' })} />, options: [figOpt(recolor(FIG.letra, { piros: 'kek', sarga: 'piros' }), 'piros oldalú létra'), figOpt(recolor(FIG.letra, { piros: 'kek' }), 'sárga oldalú létra'), figOpt(recolor(FIG.letra, { piros: 'kek', sarga: 'zold' }), 'zöld oldalú létra')], hint: 'Csak a sárga változik, pirosra. A kék marad kék.' },
  { id: 'p15', level: 2, badge: 'Figurák', ask: 'Melyik a létra?', options: [figOpt(FIG.letra, 'létra'), figOpt(FIG.kerites, 'kerítés'), figOpt(FIG.asztal, 'asztal')], hint: 'A létrán fokok vannak, azon lehet felmászni.' },
  { id: 'p16', level: 2, badge: 'Kakukktojás', ask: 'Melyik nem ugyanolyan?', say: 'Két nap ugyanolyan, egy más. Melyik a más?', options: [figOpt(recolor(FIG.nap, { piros: 'kek' }), 'kék közepű nap'), figOpt(FIG.nap, 'piros közepű nap'), { figure: <Fig f={FIG.nap} />, say: 'ez is piros közepű nap' }], hint: 'Nézd meg a napok közepét!' },
  // 3. szint – két szabály, utasítás, irány, minta a sorban
  { id: 'p17', level: 3, badge: 'Színcsere', ask: 'Melyik lett a varázslat után?', say: 'Két szabály van: ami sárga, az piros lesz, ami piros, az kék lesz. Melyik lett a virágból?', scene: <RuleScene rules={[['sarga', 'piros'], ['piros', 'kek']]} model={FIG.virag} />, options: [figOpt(recolor(FIG.virag, { sarga: 'piros', piros: 'kek' }), 'kék közepű, piros szirmú'), figOpt(recolor(FIG.virag, { sarga: 'piros' }), 'piros közepű, piros szirmú'), figOpt(recolor(FIG.virag, { piros: 'kek' }), 'kék közepű, sárga szirmú')], hint: 'Mindkét szabály kell: a sárga szirmok pirosak, a piros közép kék lesz.' },
  { id: 'p18', level: 3, badge: 'Csináld, amit mondok', ask: 'Mi lett belőle?', say: 'Hallgasd meg! Tegyél egy fekvő piros pálcikát. Alá, a két végéhez állíts egy-egy kék pálcikát. Mi lett belőle?', options: [figOpt(FIG.asztal, 'asztal'), figOpt(FIG.szek, 'szék'), figOpt(FIG.haz, 'ház')], hint: 'Csak három pálcika kell: fent egy fekvő piros, alatta két álló kék.' },
  { id: 'p19', level: 3, badge: 'Sor folytatása', ask: 'Mi jön ezután?', say: 'Piros pálcika, fölötte korong. Kék pálcika, alatta korong. Piros pálcika, fölötte korong. Mi jön ezután?', scene: <FigRow figs={[redUp, blueDown, redUp, null]} />, options: [figOpt(blueDown, 'kék pálcika, alatta korong'), figOpt(blueUp, 'kék pálcika, fölötte korong'), figOpt(redUp, 'piros pálcika, fölötte korong')], hint: 'A kék pálcikánál a korong mindig alul van.' },
  { id: 'p20', level: 3, badge: 'Irány', ask: 'Melyik ugyanolyan, mint a minta?', say: 'Nézd meg jól a rollert! Melyik ugyanolyan? Figyelj az irányára is!', scene: <FigRow figs={[mirror(FIG.roller)]} />, options: [figOpt(mirror(FIG.roller), 'balra néző roller'), figOpt(FIG.roller, 'jobbra néző roller'), figOpt(flip(mirror(FIG.roller)), 'fejjel lefelé álló roller')], hint: 'Nézd meg, merre megy a deszka, és hol vannak a kerekek!' },
  { id: 'p21', level: 3, badge: 'Csináld, amit mondok', ask: 'Melyik Zümi kapuja?', say: 'Zümi kapuja: két álló kék pálcika, a tetejükön egy fekvő piros pálcika. Melyik az?', options: [figOpt(FIG.kapu, 'kék oszlop, piros tető'), figOpt(recolor(FIG.kapu, { kek: 'piros', piros: 'kek' }), 'piros oszlop, kék tető'), figOpt(recolor(FIG.kapu, { kek: 'zold' }), 'zöld oszlop, piros tető')], hint: 'Az oszlopok kékek, a teteje piros legyen!' },
  { id: 'p22', level: 3, badge: 'Mi hiányzik?', ask: 'Melyik léc hiányzik?', say: 'A kerítés lécei: piros, kék, piros, aztán hiányzik egy, aztán megint piros. Melyik léc hiányzik?', scene: <Fig f={fence5(['piros', 'kek', 'piros', null, 'piros'])} missing={{ x: 83, y: 66 }} className="w-48 h-48 mx-auto" />, options: [pc('allo', 'kek', 'álló kék pálcika'), pc('allo', 'piros', 'álló piros pálcika'), pc('fekvo', 'kek', 'fekvő kék pálcika')], hint: 'A színek váltakoznak: piros, kék, piros… Az álló lécek közé álló kell.' },
  { id: 'p23', level: 3, badge: 'Színcsere', ask: 'Melyik lett a varázslat után?', say: 'A szabály: ami kék, az zöld lesz. Melyik lett a rollerből?', scene: <RuleScene rules={[['kek', 'zold']]} model={FIG.roller} />, options: [figOpt(recolor(FIG.roller, { kek: 'zold' }), 'zöld kerekű roller'), figOpt(recolor(FIG.roller, { sarga: 'zold' }), 'zöld vázú roller'), figOpt(FIG.roller, 'kék kerekű roller')], hint: 'Csak a kék kerekek változnak.' },
  { id: 'p24', level: 3, badge: 'Elemek', ask: 'Melyik épült csak pálcikákból?', say: 'Melyik figurához nem kellett egy korong sem?', options: [figOpt(FIG.haz, 'ház'), figOpt(FIG.nap, 'nap'), figOpt(FIG.baba, 'pálcikababa')], hint: 'Keresd azt, amelyiken nincs kerek korong!' },
];

export const PALCIKAK_ES_KORONGOK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd a pálcikát az ugyanolyan színű koronggal!',
    pairs: [
      { a: pc('allo', 'piros', 'piros pálcika', sm), b: pc('korong', 'piros', 'piros korong', sm) },
      { a: pc('allo', 'kek', 'kék pálcika', sm), b: pc('korong', 'kek', 'kék korong', sm) },
      { a: pc('allo', 'sarga', 'sárga pálcika', sm), b: pc('korong', 'sarga', 'sárga korong', sm) },
      { a: pc('allo', 'zold', 'zöld pálcika', sm), b: pc('korong', 'zold', 'zöld korong', sm) },
    ],
  },
  2: {
    say: 'Keresd meg az ugyanolyan figurát!',
    pairs: [
      { a: fc(FIG.haz, 'ház'), b: fc(FIG.haz, 'ugyanolyan ház') },
      { a: fc(FIG.nap, 'nap'), b: fc(FIG.nap, 'ugyanolyan nap') },
      { a: fc(FIG.letra, 'létra'), b: fc(FIG.letra, 'ugyanolyan létra') },
      { a: fc(FIG.baba, 'pálcikababa'), b: fc(FIG.baba, 'ugyanolyan baba') },
      { a: fc(FIG.fagyi, 'fagyi'), b: fc(FIG.fagyi, 'ugyanolyan fagyi') },
    ],
  },
  3: {
    say: 'Varázslat: ami sárga, az piros lesz. Melyik lett a figurából?',
    pairs: [
      { a: fc(FIG.nap, 'sárga sugarú nap'), b: fc(recolor(FIG.nap, { sarga: 'piros' }), 'piros sugarú nap') },
      { a: fc(FIG.fagyi, 'sárga tölcsér'), b: fc(recolor(FIG.fagyi, { sarga: 'piros' }), 'piros tölcsér') },
      { a: fc(FIG.szek, 'sárga támlájú szék'), b: fc(recolor(FIG.szek, { sarga: 'piros' }), 'piros szék') },
      { a: fc(FIG.nyaloka, 'sárga pálcikás nyalóka'), b: fc(recolor(FIG.nyaloka, { sarga: 'piros' }), 'piros nyalóka') },
    ],
  },
};

export const PALCIKAK_ES_KORONGOK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Pálcika vagy korong? Tedd a jó dobozba!',
    bins: [
      { label: 'Pálcika', figure: <Piece kind="ferde" c="sarga" className="w-10 h-10" />, say: 'pálcika' },
      { label: 'Korong', figure: <Piece kind="korong" c="piros" className="w-10 h-10" />, say: 'korong' },
    ],
    items: [
      { item: pc('allo', 'piros', 'piros pálcika', sm), bin: 0 },
      { item: pc('korong', 'kek', 'kék korong', sm), bin: 1 },
      { item: pc('fekvo', 'zold', 'zöld pálcika', sm), bin: 0 },
      { item: pc('korong', 'sarga', 'sárga korong', sm), bin: 1 },
      { item: pc('ferde', 'kek', 'kék pálcika', sm), bin: 0 },
      { item: pc('korong', 'piros', 'piros korong', sm), bin: 1 },
      { item: pc('allo', 'sarga', 'sárga pálcika', sm), bin: 0 },
    ],
  },
  2: {
    say: 'Álló vagy fekvő pálcika? Hová való?',
    bins: [
      { label: 'Álló', figure: <Piece kind="allo" c="kek" className="w-10 h-10" />, say: 'álló' },
      { label: 'Fekvő', figure: <Piece kind="fekvo" c="kek" className="w-10 h-10" />, say: 'fekvő' },
    ],
    items: [
      { item: pc('allo', 'piros', 'piros álló', sm), bin: 0 },
      { item: pc('fekvo', 'sarga', 'sárga fekvő', sm), bin: 1 },
      { item: pc('allo', 'zold', 'zöld álló', sm), bin: 0 },
      { item: pc('fekvo', 'piros', 'piros fekvő', sm), bin: 1 },
      { item: pc('allo', 'sarga', 'sárga álló', sm), bin: 0 },
      { item: pc('fekvo', 'zold', 'zöld fekvő', sm), bin: 1 },
      { item: pc('fekvo', 'kek', 'kék fekvő', sm), bin: 1 },
      { item: pc('allo', 'kek', 'kék álló', sm), bin: 0 },
    ],
  },
  3: {
    say: 'Csak pálcikából épült, vagy kell hozzá korong is?',
    bins: [
      { label: 'Csak pálcika', figure: <Piece kind="teto" c="kek" className="w-10 h-10" />, say: 'csak pálcika' },
      { label: 'Korong is', figure: <Fig f={FIG.nyaloka} className="w-10 h-10" />, say: 'pálcika és korong' },
    ],
    items: [
      { item: fc(FIG.haz, 'ház'), bin: 0 },
      { item: fc(FIG.nap, 'nap'), bin: 1 },
      { item: fc(FIG.letra, 'létra'), bin: 0 },
      { item: fc(FIG.baba, 'pálcikababa'), bin: 1 },
      { item: fc(FIG.kapu, 'kapu'), bin: 0 },
      { item: fc(FIG.roller, 'roller'), bin: 1 },
      { item: fc(FIG.szek, 'szék'), bin: 0 },
      { item: fc(FIG.virag, 'virág'), bin: 1 },
      { item: fc(FIG.asztal, 'asztal'), bin: 0 },
    ],
  },
};

export const PalcikakEsKorongokG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="4. Pálcikák és korongok"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • JÁTÉK"
    base="g1-prep-palcikak-es-korongok"
    chapterId="elokeszito-idoszak"
    questions={PALCIKAK_ES_KORONGOK_G1_QUESTIONS}
    pairs={PALCIKAK_ES_KORONGOK_G1_PAIRS}
    sort={PALCIKAK_ES_KORONGOK_G1_SORT}
    {...props}
  />
);

export default PalcikakEsKorongokG1Jatek;
