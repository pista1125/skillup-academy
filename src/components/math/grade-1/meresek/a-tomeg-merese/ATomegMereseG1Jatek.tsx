import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Potyi } from '../../shared/Potyi';
import { BallScalesScene, BigScaleScene, IconFig, ItemFig, ItemKind, ITEM_SAY, SacksScene, ScaleFig, SeesawScene } from './ATomegMereseG1Scenes';

const az = (w: string) => (/^[aáeéiíoóöőuúüű]/i.test(w) ? 'az' : 'a');
const it = (k: ItemKind, label?: string) => ({ figure: <ItemFig k={k} label={label} />, say: label ? `${label.replace('kg', 'kilogrammos')} zsák` : `${az(ITEM_SAY[k])} ${ITEM_SAY[k]}` });
const sc = (tilt: -1 | 0 | 1, l: ItemKind | number, r: ItemKind | number, say: string) => ({
  figure: <ScaleFig tilt={tilt} left={typeof l === 'number' ? { balls: l } : [{ k: l }]} right={typeof r === 'number' ? { balls: r } : [{ k: r }]} />,
  say,
});
const kg = (n: number) => ({ label: `${n} kg`, say: `${n} kilogramm` });
const expr = (t: string, say: string) => ({ label: t, say });

export const A_TOMEG_MERESE_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – nehezebb, könnyebb, egyensúly
  { id: 't1', level: 1, badge: 'Nehezebb, könnyebb', ask: 'Ki a könnyebb?', say: 'Pötyi és Csigusz libikókázik. Ki a könnyebb?', scene: <SeesawScene heavyRight />, options: [{ figure: <Potyi className="w-20 h-20" />, say: 'Pötyi' }, { figure: <IconFig icon="csiga" />, say: 'Csigusz' }], hint: 'A könnyebb vége fent van. Ki van fent?' },
  { id: 't2', level: 1, badge: 'Kétkarú mérleg', ask: 'Melyik a nehezebb?', scene: <BigScaleScene tilt={1} left={[{ k: 'dinnye' }]} right={[{ k: 'alma' }]} />, options: [it('dinnye'), it('alma')], hint: 'Melyik serpenyő van lent? Ami benne van, az a nehezebb.' },
  { id: 't3', level: 1, badge: 'Kétkarú mérleg', ask: 'Melyik a könnyebb?', scene: <BigScaleScene tilt={-1} left={[{ k: 'eper' }]} right={[{ k: 'korte' }]} />, options: [it('eper'), it('korte')], hint: 'A könnyebb oldal felemelkedik. Melyik serpenyő van fent?' },
  { id: 't4', level: 1, badge: 'Egyensúly', ask: 'Melyik mérleg áll egyensúlyban?', options: [sc(0, 'alma', 'alma', 'alma és alma, egyenesen áll'), sc(1, 'tok', 'alma', 'tök és alma, a tök lent'), sc(-1, 'alma', 'dinnye', 'alma és dinnye, a dinnye lent')], hint: 'Ez a mérleg ferde. Keresd azt, amelyik egyenesen áll!' },
  { id: 't5', level: 1, badge: 'Kétkarú mérleg', ask: 'Melyik a nehezebb: a zsák vagy a méz?', scene: <BigScaleScene tilt={-1} left={[{ k: 'zsak', s: 1 }]} right={[{ k: 'mez', s: 1 }]} />, options: [it('mez'), { figure: <ItemFig k="zsak" />, say: 'a zsák' }], hint: 'Nézd meg, melyik oldal süllyedt le!' },
  { id: 't6', level: 1, badge: 'Mérés golyókkal', ask: 'Hány golyó nehéz az alma?', scene: <BigScaleScene tilt={0} left={[{ k: 'alma' }]} right={{ balls: 2 }} />, options: [2, 1, 3], hint: 'Számold meg a golyókat a másik serpenyőben!' },
  { id: 't7', level: 1, badge: 'Nehéz, könnyű', ask: 'Melyiket nehezebb felemelni?', say: 'Melyiket nehezebb felemelni: a követ vagy a tollat?', options: [it('ko'), it('toll')], hint: 'A toll szinte semmit sem nyom. Melyik húzza le a kezed?' },
  { id: 't8', level: 1, badge: 'Nehéz, könnyű', ask: 'Melyik a legnehezebb?', say: 'A valóságban melyik a legnehezebb?', options: [it('tok'), it('eper'), it('level')], hint: 'Gondold el, melyiket lenne a legnehezebb felemelni!' },
  // 2. szint – golyók, jelek, kilogramm
  { id: 't9', level: 2, badge: 'Mérés golyókkal', ask: 'Hány golyó nehéz a körte?', scene: <BigScaleScene tilt={0} left={[{ k: 'korte' }]} right={{ balls: 5 }} />, options: [5, 4, 6], hint: 'Mutass rá minden golyóra, és számold meg őket!' },
  { id: 't10', level: 2, badge: 'Nagyobb ≠ nehezebb', ask: 'Melyik a nehezebb?', say: 'A nagy léggömb vagy a kis kő a nehezebb?', scene: <BigScaleScene tilt={1} left={[{ k: 'ko' }]} right={[{ k: 'lufi' }]} />, options: [it('ko'), it('lufi')], hint: 'A léggömb nagy, de a mérleg mást mutat. Melyik oldal van lent?' },
  { id: 't11', level: 2, badge: 'Jelek: <, >, =', ask: 'alma □ dinnye', say: 'Melyik jel kell az alma és a dinnye közé?', scene: <BigScaleScene tilt={-1} left={[{ k: 'alma' }]} right={[{ k: 'dinnye' }]} />, options: ['<', '>', '='], hint: 'A jel szája a nehezebb felé nyílik. A dinnye oldala van lent.' },
  { id: 't12', level: 2, badge: 'Jelek: <, >, =', ask: 'Melyik jel kell a két oldal közé?', say: 'A mérleg egyenesen áll. Melyik jel kell a két oldal közé?', scene: <BigScaleScene tilt={0} left={{ balls: 3 }} right={[{ k: 'mez' }]} />, options: ['=', '<', '>'], hint: 'Ha a mérleg egyenesen áll, a két oldal ugyanolyan nehéz.' },
  { id: 't13', level: 2, badge: 'Jelek: <, >, =', ask: 'tök □ eper', say: 'Melyik jel kell a tök és az eper közé?', scene: <BigScaleScene tilt={1} left={[{ k: 'tok' }]} right={[{ k: 'eper' }]} />, options: ['>', '<', '='], hint: 'A tök oldala van lent. A jel szája a nehezebb felé nyílik.' },
  { id: 't14', level: 2, badge: 'A kilogramm', ask: 'Melyik nehezebb 1 kg-nál?', say: 'A valóságban melyik nehezebb 1 kilogrammnál?', options: [it('dinnye'), it('eper'), it('gomba')], hint: '1 kilogramm olyan nehéz, mint egy zacskó liszt. Mi nehezebb annál?' },
  { id: 't15', level: 2, badge: 'A kilogramm', ask: 'Melyik a nehezebb?', say: 'A tököt az 1 kilogrammos súllyal mérjük. Melyik a nehezebb?', scene: <BigScaleScene tilt={1} left={[{ k: 'tok', s: 1 }]} right={[{ k: 'suly', s: 1 }]} />, options: [it('tok'), { figure: <ItemFig k="suly" />, say: 'az 1 kilogrammos súly' }], hint: 'Melyik serpenyő van lent?' },
  { id: 't16', level: 2, badge: 'Összehasonlítás golyókkal', ask: 'Melyik a nehezebb?', say: 'Az alma 2 golyó, a körte 4 golyó. Melyik a nehezebb?', scene: <BallScalesScene rows={[{ k: 'alma', n: 2 }, { k: 'korte', n: 4 }]} />, options: [it('korte'), it('alma')], hint: 'Amelyikhez több golyó kell, az a nehezebb.' },
  // 3. szint – számolás kg-mal, sorba rendezés golyókkal
  { id: 't17', level: 3, badge: 'Számolás kg-mal', ask: '4 kg + 3 kg = ? kg', say: 'Csigusz vett 4 kilogramm krumplit és 3 kilogramm almát. Hány kilogramm összesen?', scene: <SacksScene sacks={[{ label: '4 kg' }, { label: '3 kg' }]} sign={['+']} />, options: [7, 6, 1], hint: 'Ez összeadás. Számolj 4-től hármat tovább!' },
  { id: 't18', level: 3, badge: 'Számolás kg-mal', ask: '10 kg − 4 kg = ? kg', say: 'A zsákban 10 kilogramm krumpli volt. Pötyi kivett belőle 4 kilogrammot. Hány kilogramm maradt?', scene: <SacksScene sacks={[{ label: '10 kg' }, { label: '4 kg' }]} sign={['−']} />, options: [6, 4, 7], hint: '10-ből vegyél el 4-et! Ujjaidon is megnézheted.' },
  { id: 't19', level: 3, badge: 'Sorozat', ask: '2 kg, 4 kg, 6 kg, ? Mi jön?', say: 'A zsákok egyre nehezebbek: 2 kilogramm, 4 kilogramm, 6 kilogramm. Hány kilogramm a következő?', scene: <SacksScene sacks={[{ label: '2 kg', s: 1.3 }, { label: '4 kg', s: 1.6 }, { label: '6 kg', s: 1.9 }, { label: '? kg', s: 2.2 }]} />, options: [8, 7, 10], hint: 'Mindig 2-vel több. Mennyi 6 meg 2?' },
  { id: 't20', level: 3, badge: 'Legnehezebb', ask: 'Melyik a legnehezebb?', say: 'Az alma 3, a körte 5, az eper 1 golyó. Melyik a legnehezebb?', scene: <BallScalesScene rows={[{ k: 'alma', n: 3 }, { k: 'korte', n: 5 }, { k: 'eper', n: 1 }]} />, options: [it('korte'), it('alma'), it('eper')], hint: 'Keresd meg, melyikhez kell a legtöbb golyó!' },
  { id: 't21', level: 3, badge: 'Legkönnyebb', ask: 'Melyik a legkönnyebb?', say: 'A méz 6, az alma 3, a körte 5 golyó. Melyik a legkönnyebb?', scene: <BallScalesScene rows={[{ k: 'mez', n: 6 }, { k: 'alma', n: 3 }, { k: 'korte', n: 5 }]} />, options: [it('alma'), it('mez'), it('korte')], hint: 'A legkönnyebbhez kell a legkevesebb golyó.' },
  { id: 't22', level: 3, badge: 'Egyensúly golyókkal', ask: 'Hány golyó kell még?', say: 'A körte 5 golyó nehéz. A másik oldalon csak 3 golyó van. Hány golyót kell még tenni, hogy egyensúlyban legyen?', scene: <BigScaleScene tilt={1} left={[{ k: 'korte' }]} right={{ balls: 3 }} />, options: [2, 3, 5], hint: '3 golyó van, 5 kellene. Hány hiányzik még?' },
  { id: 't23', level: 3, badge: 'Számolás kg-mal', ask: '1 kg + 1 kg + 2 kg = ? kg', say: 'Pötyi kosarában 1 kilogramm liszt, 1 kilogramm só és 2 kilogramm krumpli van. Hány kilogramm összesen?', scene: <SacksScene sacks={[{ label: '1 kg' }, { label: '1 kg' }, { label: '2 kg' }]} sign={['+', '+']} />, options: [4, 3, 5], hint: 'Előbb az első kettőt add össze, aztán a harmadikat is!' },
  { id: 't24', level: 3, badge: 'Számolás kg-mal', ask: 'Mennyi maradt Pötyinél?', say: 'Pötyi 5 kilogramm almát vett. 2 kilogrammot odaadott Csigusznak. Hány kilogramm maradt neki?', scene: <SacksScene sacks={[{ label: '5 kg' }, { label: '2 kg' }]} sign={['−']} />, options: [3, 2, 7], hint: 'Ha odaad belőle, kevesebb marad. 5-ből vegyél el 2-t!' },
];

export const A_TOMEG_MERESE_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Hány golyó nehéz? Párosítsd a mérleget a számmal!',
    pairs: [
      { a: sc(0, 'eper', 1, 'eper és 1 golyó'), b: 1 },
      { a: sc(0, 'alma', 2, 'alma és 2 golyó'), b: 2 },
      { a: sc(0, 'mez', 4, 'méz és 4 golyó'), b: 4 },
      { a: sc(0, 'korte', 5, 'körte és 5 golyó'), b: 5 },
    ],
  },
  2: {
    say: 'Melyik jel illik a mérleghez? Párosítsd!',
    pairs: [
      { a: sc(1, 'dinnye', 'alma', 'a dinnye lent, az alma fent'), b: '>' },
      { a: sc(-1, 'eper', 'tok', 'az eper fent, a tök lent'), b: '<' },
      { a: sc(0, 'korte', 'korte', 'körte és körte, egyenesen áll'), b: '=' },
    ],
  },
  3: {
    say: 'Számold ki! Párosítsd az eredménnyel!',
    pairs: [
      { a: expr('2 kg + 3 kg', '2 kilogramm meg 3 kilogramm'), b: kg(5) },
      { a: expr('4 kg + 4 kg', '4 kilogramm meg 4 kilogramm'), b: kg(8) },
      { a: expr('10 kg − 3 kg', '10 kilogramm elvéve 3 kilogramm'), b: kg(7) },
      { a: expr('6 kg − 5 kg', '6 kilogramm elvéve 5 kilogramm'), b: kg(1) },
    ],
  },
};

export const A_TOMEG_MERESE_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Nehéz vagy könnyű? Tedd a jó kosárba!',
    bins: [
      { label: 'Nehéz', figure: <ItemFig k="ko" className="w-10 h-10" />, say: 'nehéz' },
      { label: 'Könnyű', figure: <ItemFig k="toll" className="w-10 h-10" />, say: 'könnyű' },
    ],
    items: [
      { item: it('ko'), bin: 0 },
      { item: it('auto'), bin: 0 },
      { item: it('zsak'), bin: 0 },
      { item: it('dinnye'), bin: 0 },
      { item: it('toll'), bin: 1 },
      { item: it('level'), bin: 1 },
      { item: it('pillango'), bin: 1 },
      { item: it('virag'), bin: 1 },
    ],
  },
  2: {
    say: 'Melyik oldal nehezebb? Tedd a jó kosárba a mérleget!',
    bins: [
      { label: 'Bal', figure: <ScaleFig tilt={1} left={{ balls: 3 }} right={{ balls: 1 }} className="w-14 h-10" />, say: 'a bal oldal nehezebb' },
      { label: 'Egyforma', figure: <ScaleFig tilt={0} left={{ balls: 2 }} right={{ balls: 2 }} className="w-14 h-10" />, say: 'egyforma nehéz' },
      { label: 'Jobb', figure: <ScaleFig tilt={-1} left={{ balls: 1 }} right={{ balls: 3 }} className="w-14 h-10" />, say: 'a jobb oldal nehezebb' },
    ],
    items: [
      { item: sc(1, 'tok', 'eper', 'tök és eper'), bin: 0 },
      { item: sc(-1, 'alma', 'dinnye', 'alma és dinnye'), bin: 2 },
      { item: sc(0, 'alma', 'alma', 'alma és alma'), bin: 1 },
      { item: sc(1, 'ko', 'lufi', 'kő és léggömb'), bin: 0 },
      { item: sc(0, 'korte', 4, 'körte és 4 golyó'), bin: 1 },
      { item: sc(-1, 'eper', 'mez', 'eper és méz'), bin: 2 },
      { item: sc(-1, 2, 6, '2 golyó és 6 golyó'), bin: 2 },
      { item: sc(1, 5, 1, '5 golyó és 1 golyó'), bin: 0 },
    ],
  },
  3: {
    say: 'A valóságban nehezebb 1 kilogrammnál, vagy könnyebb?',
    bins: [
      { label: 'Nehezebb', figure: <ItemFig k="zsak" label="5 kg" className="w-10 h-10" />, say: 'nehezebb 1 kilogrammnál' },
      { label: 'Könnyebb', figure: <ItemFig k="eper" className="w-10 h-10" />, say: 'könnyebb 1 kilogrammnál' },
    ],
    items: [
      { item: it('dinnye'), bin: 0 },
      { item: it('tok'), bin: 0 },
      { item: it('zsak', '5 kg'), bin: 0 },
      { item: it('auto'), bin: 0 },
      { item: it('alma'), bin: 1 },
      { item: it('eper'), bin: 1 },
      { item: it('gomba'), bin: 1 },
      { item: it('katica'), bin: 1 },
    ],
  },
};

export const ATomegMereseG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="2. A tömeg mérése"
    badge="1. OSZTÁLY • V. MÉRÉSEK • JÁTÉK"
    base="g1-meas-a-tomeg-merese"
    chapterId="meresek"
    questions={A_TOMEG_MERESE_G1_QUESTIONS}
    pairs={A_TOMEG_MERESE_G1_PAIRS}
    sort={A_TOMEG_MERESE_G1_SORT}
    {...props}
  />
);

export default ATomegMereseG1Jatek;
