import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Basket, BigThing, Button, ButtonScene, COL, GroupRing, GroupRingFig, SchoolBagScene, ShelfScene, Thing, ThingName, ThingRow, TwoBasketsScene, TwoBoxesScene, thing } from './ValogatasokG1Scenes';

const fruitBasket = { figure: <Basket sign={[{ n: 'alma' }, { n: 'banan' }]} />, say: 'gyümölcsös kosár' };
const vegBasket = { figure: <Basket sign={[{ n: 'repa' }, { n: 'uborka' }]} />, say: 'zöldséges kosár' };
const btn = (say: string, color: string, big = true, holes: 2 | 4 = 4, square = false) => ({ figure: <Button color={color} big={big} holes={holes} square={square} />, say });
const card = (n: ThingName, say: string, color?: string, s?: number) => ({ figure: <Thing n={n} color={color} s={s} className="w-16 h-16" />, say });
const colorDots = (
  <svg viewBox="0 0 120 100" className="w-28 h-24">
    <rect x="4" y="4" width="112" height="92" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    <circle cx="36" cy="38" r="15" fill={COL.piros} stroke="#1f2937" strokeWidth="2" />
    <circle cx="84" cy="38" r="15" fill={COL.kek} stroke="#1f2937" strokeWidth="2" />
    <circle cx="60" cy="72" r="15" fill={COL.sarga} stroke="#1f2937" strokeWidth="2" />
  </svg>
);
const bySize = (
  <svg viewBox="0 0 120 100" className="w-28 h-24">
    <rect x="4" y="4" width="112" height="92" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    <circle cx="44" cy="52" r="28" fill="#94a3b8" stroke="#1f2937" strokeWidth="3" />
    <circle cx="94" cy="66" r="12" fill="#94a3b8" stroke="#1f2937" strokeWidth="3" />
  </svg>
);
const byKind = <GroupRing items={[{ n: 'alma' }, { n: 'maci' }]} ring="#64748b" />;
const howOptions = (first: 'szin' | 'fajta') => {
  const szin = { figure: colorDots, say: 'szín szerint' };
  const fajta = { figure: byKind, say: 'fajta szerint' };
  const nagysag = { figure: bySize, say: 'nagyság szerint' };
  return first === 'szin' ? [szin, fajta, nagysag] : [fajta, szin, nagysag];
};

export const VALOGATASOK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés: fajta, szín
  { id: 'v1', level: 1, badge: 'Fajta szerint', ask: 'Melyik gyümölcs?', options: [thing('alma'), thing('labda'), thing('ceruza')], hint: 'A labdával játszunk, a ceruzával rajzolunk. Melyiket lehet megenni?' },
  { id: 'v2', level: 1, badge: 'Fajta szerint', ask: 'Mi való az iskolatáskába?', scene: <SchoolBagScene />, options: [thing('fuzet'), thing('maci'), thing('labda')], hint: 'A maci és a labda játék. Mibe rajzolunk az iskolában?' },
  { id: 'v3', level: 1, badge: 'Szín szerint', ask: 'Melyik labda piros?', options: [thing('labda', 'piros labda', COL.piros), thing('labda', 'kék labda', COL.kek), thing('labda', 'sárga labda', COL.sarga)], hint: 'Ez nem piros. Olyat keress, mint a piros alma!' },
  { id: 'v4', level: 1, badge: 'Fajta szerint', ask: 'Melyik állat?', options: [thing('hal'), thing('auto'), thing('virag')], hint: 'Az autó jármű, a virág növény. Melyik úszik a vízben?' },
  { id: 'v5', level: 1, badge: 'Fajta szerint', ask: 'Mi való a játékpolcra?', scene: <ShelfScene />, options: [thing('maci'), thing('fuzet'), thing('ceruza')], hint: 'A füzet és a ceruza az iskolatáskába kell. Mivel játszunk?' },
  { id: 'v6', level: 1, badge: 'Ugyanolyan', ask: 'Melyik ugyanolyan?', say: 'Nézd meg a halat! Melyik ugyanolyan, mint ez?', scene: <BigThing n="hal" color={COL.kek} />, options: [thing('hal', 'kék hal', COL.kek), thing('hal', 'narancssárga hal', COL.narancs), thing('madar', 'kék madár', COL.kek)], hint: 'Nézd meg, mi ez, és milyen színű! Mindkettő stimmeljen.' },
  { id: 'v7', level: 1, badge: 'Fajta szerint', ask: 'Melyik zöldség?', options: [thing('repa'), thing('eper'), thing('banan')], hint: 'Az eper és a banán édes gyümölcs. Melyik nő a földben?' },
  { id: 'v8', level: 1, badge: 'Szín szerint', ask: 'Melyik virág sárga?', options: [thing('virag', 'sárga virág', COL.sarga), thing('virag', 'piros virág', COL.piros), thing('virag', 'kék virág', COL.kek)], hint: 'Ez nem sárga. Olyat keress, mint a nap!' },
  // 2. szint – kakukktojás, kosarak, csoportok
  { id: 'v9', level: 2, badge: 'Kakukktojás', ask: 'Melyik nem illik a sorba?', say: 'Nézd meg a sort! Melyik nem illik a többihez?', scene: <ThingRow items={[{ n: 'alma' }, { n: 'korte' }, { n: 'auto' }, { n: 'banan' }]} />, options: [thing('auto'), thing('korte'), thing('banan')], hint: 'Ez gyümölcs, ez beillik. Mi nem gyümölcs a sorban?' },
  { id: 'v10', level: 2, badge: 'Kosárba válogatás', ask: 'Hová való a répa?', scene: <TwoBasketsScene item="repa" />, options: [vegBasket, fruitBasket], hint: 'A répa zöldség. Keresd a kosarat, amin répa van!' },
  { id: 'v11', level: 2, badge: 'Kakukktojás', ask: 'Melyik nem illik a sorba?', say: 'Ezek majdnem mind pirosak. Melyik nem illik a sorba?', scene: <ThingRow items={[{ n: 'labda', color: COL.piros }, { n: 'hal', color: COL.kek }, { n: 'auto', color: COL.piros }, { n: 'virag', color: COL.piros }]} />, options: [thing('hal', 'kék hal', COL.kek), thing('labda', 'piros labda', COL.piros), thing('auto', 'piros autó', COL.piros)], hint: 'Nézd meg a színeket! Melyik nem piros?' },
  { id: 'v12', level: 2, badge: 'Kakukktojás', ask: 'Melyik nem ruha?', say: 'Csigusz ruhákat pakol. Melyik nem illik a sorba?', scene: <ThingRow items={[{ n: 'zokni' }, { n: 'sapka' }, { n: 'hajo' }, { n: 'polo' }]} />, options: [thing('hajo'), thing('zokni'), thing('sapka')], hint: 'Ezt fel lehet venni. Mit nem lehet felvenni?' },
  { id: 'v13', level: 2, badge: 'Kosárba válogatás', ask: 'Hová való a körte?', scene: <TwoBasketsScene item="korte" />, options: [fruitBasket, vegBasket], hint: 'A körte édes gyümölcs, a fán nő. Melyik kosáron van gyümölcs?' },
  { id: 'v14', level: 2, badge: 'Csoportok', ask: 'Hová tartozik a madár?', say: 'Hová tartozik a madár: az állatokhoz, a járművekhez, vagy az ételekhez?', scene: <BigThing n="madar" />, options: [{ figure: <GroupRingFig kind="allat" />, say: 'állatok' }, { figure: <GroupRingFig kind="jarmu" />, say: 'járművek' }, { figure: <GroupRingFig kind="etel" />, say: 'ételek' }], hint: 'A madár élőlény. Hol vannak az állatok?' },
  { id: 'v15', level: 2, badge: 'Csoportok', ask: 'Hová tartozik a bicikli?', say: 'Hová tartozik a bicikli: az állatokhoz, a járművekhez, vagy az ételekhez?', scene: <BigThing n="bicikli" />, options: [{ figure: <GroupRingFig kind="jarmu" />, say: 'járművek' }, { figure: <GroupRingFig kind="allat" />, say: 'állatok' }, { figure: <GroupRingFig kind="etel" />, say: 'ételek' }], hint: 'A biciklivel közlekedünk. Hol van az autó és a hajó?' },
  { id: 'v16', level: 2, badge: 'Ugyanolyan', ask: 'Keresd meg a párját!', say: 'Ez egy nagy, piros gomb, négy lyukkal. Melyik ugyanolyan?', scene: <ButtonScene color={COL.piros} big holes={4} />, options: [btn('nagy piros gomb, négy lyukkal', COL.piros, true, 4), btn('nagy piros gomb, két lyukkal', COL.piros, true, 2), btn('nagy kék gomb', COL.kek, true, 4)], hint: 'Nézd meg a színét és a lyukakat is!' },
  // 3. szint – hogyan válogattunk, két szempont, kis történetek
  { id: 'v17', level: 3, badge: 'Mi szerint válogattunk?', ask: 'Mi szerint válogatott Pötyi?', say: 'Pötyi két csoportba rakta a dolgokat. Az egyikben piros dolgok vannak, a másikban sárgák. Mi szerint válogatott? A színes pöttyök a színt jelentik.', scene: <TwoBoxesScene left={[{ n: 'alma' }, { n: 'labda', color: COL.piros }, { n: 'auto', color: COL.piros }]} right={[{ n: 'banan' }, { n: 'csillag' }, { n: 'labda', color: COL.sarga }]} />, options: howOptions('szin'), hint: 'Nézd meg a színeket a két csoportban!' },
  { id: 'v18', level: 3, badge: 'Mi szerint válogattunk?', ask: 'Most mi szerint válogatott?', say: 'Az egyik csoportban gyümölcsök vannak, a másikban játékok. Mi szerint válogatott Pötyi? Az alma és a maci képe a fajtát jelenti.', scene: <TwoBoxesScene left={[{ n: 'alma' }, { n: 'banan' }, { n: 'korte' }]} right={[{ n: 'labda' }, { n: 'maci' }, { n: 'kocka' }]} />, options: howOptions('fajta'), hint: 'A színek keverednek. Mi egyforma egy csoportban?' },
  { id: 'v19', level: 3, badge: 'Kakukktojás', ask: 'Melyik gomb más?', say: 'Három gomb kerek. Melyik gomb más, mint a többi?', scene: <svg viewBox="0 0 400 110"><svg x="0" y="5" width="100" height="100" viewBox="0 0 100 100"><Button color={COL.zold} className="" /></svg><svg x="100" y="5" width="100" height="100" viewBox="0 0 100 100"><Button color={COL.zold} className="" /></svg><svg x="200" y="5" width="100" height="100" viewBox="0 0 100 100"><Button color={COL.zold} square className="" /></svg><svg x="300" y="5" width="100" height="100" viewBox="0 0 100 100"><Button color={COL.zold} className="" /></svg></svg>, options: [btn('szögletes gomb', COL.zold, true, 4, true), btn('kerek gomb', COL.zold)], hint: 'Mind zöld. Nézd meg a formájukat!' },
  { id: 'v20', level: 3, badge: 'Kakukktojás', ask: 'Melyik alma más?', say: 'Nézd meg az almákat! Melyik más, mint a többi?', scene: <ThingRow items={[{ n: 'alma' }, { n: 'alma' }, { n: 'alma', s: 0.5 }, { n: 'alma' }]} />, options: [thing('alma', 'kicsi alma', undefined, 0.5), thing('alma', 'nagy alma')], hint: 'Mind piros. Nézd meg, mekkorák!' },
  { id: 'v21', level: 3, badge: 'Mese-feladat', ask: 'Mit tegyen Zümi az uzsonnás dobozba?', say: 'Zümi uzsonnát visz a kirándulásra. Mit tegyen az uzsonnás dobozba?', options: [thing('kifli'), thing('ceruza'), thing('zokni')], hint: 'A ceruzát és a zoknit nem lehet megenni. Mi az uzsonna?' },
  { id: 'v22', level: 3, badge: 'Kosárba válogatás', ask: 'Mi került rossz kosárba?', say: 'Csigusz a gyümölcsös kosárba pakolt. Valamit eltévesztett. Mi került rossz kosárba?', scene: <TwoBasketsScene left={[{ n: 'alma' }, { n: 'uborka' }, { n: 'korte' }]} right={[{ n: 'repa' }]} />, options: [thing('uborka'), thing('alma'), thing('korte')], hint: 'Az alma és a körte gyümölcs. Melyik zöldség?' },
  { id: 'v23', level: 3, badge: 'Két szempont', ask: 'Melyik piros és gyümölcs?', say: 'Melyik piros, és közben gyümölcs is?', options: [thing('eper'), thing('labda', 'piros labda', COL.piros), thing('banan')], hint: 'A labda piros, de nem gyümölcs. A banán gyümölcs, de sárga.' },
  { id: 'v24', level: 3, badge: 'Ugyanolyan', ask: 'Keresd meg a párját!', say: 'Ez egy kicsi, kék gomb, két lyukkal. Melyik ugyanolyan?', scene: <ButtonScene color={COL.kek} big={false} holes={2} />, options: [btn('kicsi kék gomb, két lyukkal', COL.kek, false, 2), btn('nagy kék gomb, két lyukkal', COL.kek, true, 2), btn('kicsi kék gomb, négy lyukkal', COL.kek, false, 4), btn('kicsi zöld gomb, két lyukkal', COL.zold, false, 2)], hint: 'Nézd meg a színét, a nagyságát és a lyukakat is!' },
];

export const VALOGATASOK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Keresd meg mindegyiknek az ugyanolyan párját!',
    pairs: [
      { a: card('alma', 'alma'), b: card('alma', 'alma párja') },
      { a: card('maci', 'maci'), b: card('maci', 'maci párja') },
      { a: card('hal', 'hal'), b: card('hal', 'hal párja') },
      { a: card('ceruza', 'ceruza'), b: card('ceruza', 'ceruza párja') },
    ],
  },
  2: {
    say: 'Ugyanolyan színű párt keress! A piroshoz pirosat, a kékhez kéket.',
    pairs: [
      { a: card('labda', 'piros labda', COL.piros), b: card('auto', 'piros autó', COL.piros) },
      { a: card('labda', 'kék labda', COL.kek), b: card('hal', 'kék hal', COL.kek) },
      { a: card('labda', 'sárga labda', COL.sarga), b: card('csillag', 'sárga csillag', COL.sarga) },
      { a: card('labda', 'zöld labda', COL.zold), b: card('level', 'zöld levél', COL.zold) },
      { a: card('labda', 'lila labda', COL.lila), b: card('szolo', 'lila szőlő', COL.lila) },
    ],
  },
  3: {
    say: 'Mi illik össze? A tárgyat párosítsd a helyével!',
    pairs: [
      { a: card('ceruza', 'ceruza'), b: { figure: <svg viewBox="0 0 140 120" className="w-20 h-16"><rect x="30" y="20" width="80" height="90" rx="18" fill="#8b5cf6" stroke="#4c1d95" strokeWidth="5" /><rect x="44" y="60" width="52" height="34" rx="8" fill="#a78bfa" stroke="#4c1d95" strokeWidth="4" /></svg>, say: 'iskolatáska' } },
      { a: card('alma', 'alma'), b: { figure: <Basket sign={[{ n: 'korte' }]} className="w-20 h-16" />, say: 'gyümölcsös kosár' } },
      { a: card('repa', 'répa'), b: { figure: <Basket sign={[{ n: 'uborka' }]} className="w-20 h-16" />, say: 'zöldséges kosár' } },
      { a: card('hal', 'hal'), b: { figure: <svg viewBox="0 0 120 80" className="w-20 h-14"><ellipse cx="60" cy="44" rx="54" ry="30" fill="#7dd3fc" stroke="#0284c7" strokeWidth="4" /><path d="M24 44 Q40 34 56 44 T88 44" fill="none" stroke="#fff" strokeWidth="4" /></svg>, say: 'tó' } },
      { a: card('zokni', 'zokni'), b: { figure: <svg viewBox="0 0 120 100" className="w-20 h-16"><rect x="20" y="10" width="80" height="84" rx="6" fill="#d97706" stroke="#78350f" strokeWidth="4" /><path d="M60 10 V94" stroke="#78350f" strokeWidth="4" /><circle cx="52" cy="52" r="4" fill="#78350f" /><circle cx="68" cy="52" r="4" fill="#78350f" /></svg>, say: 'ruhásszekrény' } },
    ],
  },
};

export const VALOGATASOK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Gyümölcs vagy játék? Tedd a jó kosárba!',
    bins: [
      { label: 'Gyümölcs', figure: <Basket sign={[{ n: 'alma' }]} className="w-16 h-14" />, say: 'gyümölcs' },
      { label: 'Játék', figure: <Basket sign={[{ n: 'labda' }]} color="#7c3aed" className="w-16 h-14" />, say: 'játék' },
    ],
    items: [
      { item: card('alma', 'alma'), bin: 0 },
      { item: card('labda', 'labda'), bin: 1 },
      { item: card('banan', 'banán'), bin: 0 },
      { item: card('maci', 'maci'), bin: 1 },
      { item: card('eper', 'eper'), bin: 0 },
      { item: card('kocka', 'játékkocka'), bin: 1 },
      { item: card('korte', 'körte'), bin: 0 },
    ],
  },
  2: {
    say: 'Szín szerint válogass! Piros, kék vagy sárga?',
    bins: [
      { label: 'Piros', figure: <svg viewBox="0 0 40 40" className="w-10 h-10"><circle cx="20" cy="20" r="16" fill={COL.piros} stroke="#1f2937" strokeWidth="2" /></svg>, say: 'piros' },
      { label: 'Kék', figure: <svg viewBox="0 0 40 40" className="w-10 h-10"><circle cx="20" cy="20" r="16" fill={COL.kek} stroke="#1f2937" strokeWidth="2" /></svg>, say: 'kék' },
      { label: 'Sárga', figure: <svg viewBox="0 0 40 40" className="w-10 h-10"><circle cx="20" cy="20" r="16" fill={COL.sarga} stroke="#1f2937" strokeWidth="2" /></svg>, say: 'sárga' },
    ],
    items: [
      { item: card('auto', 'piros autó', COL.piros), bin: 0 },
      { item: card('hal', 'kék hal', COL.kek), bin: 1 },
      { item: card('csillag', 'sárga csillag', COL.sarga), bin: 2 },
      { item: card('eper', 'piros eper'), bin: 0 },
      { item: card('sapka', 'kék sapka', COL.kek), bin: 1 },
      { item: card('banan', 'sárga banán'), bin: 2 },
      { item: card('virag', 'piros virág', COL.piros), bin: 0 },
      { item: card('konyv', 'kék könyv', COL.kek), bin: 1 },
    ],
  },
  3: {
    say: 'Állat, jármű vagy étel? Hová való?',
    bins: [
      { label: 'Állat', figure: <GroupRingFig kind="allat" />, say: 'állatok' },
      { label: 'Jármű', figure: <GroupRingFig kind="jarmu" />, say: 'járművek' },
      { label: 'Étel', figure: <GroupRingFig kind="etel" />, say: 'ételek' },
    ],
    items: [
      { item: card('madar', 'madár'), bin: 0 },
      { item: card('hajo', 'hajó'), bin: 1 },
      { item: card('kifli', 'kifli'), bin: 2 },
      { item: card('pillango', 'pillangó'), bin: 0 },
      { item: card('auto', 'autó'), bin: 1 },
      { item: card('eper', 'eper'), bin: 2 },
      { item: card('meh', 'méh'), bin: 0 },
      { item: card('bicikli', 'bicikli'), bin: 1 },
      { item: card('kenyer', 'kenyér'), bin: 2 },
    ],
  },
};

export const ValogatasokG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="1. Válogatások"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • JÁTÉK"
    base="g1-prep-valogatasok"
    chapterId="elokeszito-idoszak"
    questions={VALOGATASOK_G1_QUESTIONS}
    pairs={VALOGATASOK_G1_PAIRS}
    sort={VALOGATASOK_G1_SORT}
    {...props}
  />
);

export default ValogatasokG1Jatek;
