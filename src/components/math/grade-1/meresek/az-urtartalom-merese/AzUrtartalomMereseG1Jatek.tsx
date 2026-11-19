import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { ICONS } from '../../shared/G1Pics';
import {
  AmountFig,
  CompareScene,
  CupsToVesselScene,
  GlassFig,
  LiterScene,
  MeasureJugFig,
  MeasureScene,
  PotJugsScene,
  PourScene,
  TrayFig,
  TripsScene,
  VesselFig,
  VesselKind,
} from './AzUrtartalomMereseG1Scenes';

const SAY_TO: Record<VesselKind, string> = {
  pohar: 'a pohár',
  bogre: 'a bögre',
  csesze: 'a csésze',
  kanal: 'a kanál',
  vodor: 'a vödör',
  kanna: 'a locsolókanna',
  hordo: 'a hordó',
  palack: 'a palack',
  labas: 'a lábas',
  kancso: 'a kancsó',
  kupak: 'a kupak',
};
const v = (k: VesselKind) => ({ figure: <VesselFig k={k} />, say: SAY_TO[k] });
const gl = (fill: number, say: string) => ({ figure: <GlassFig fill={fill} />, say });
const amt = (t: string, say: string) => ({ figure: <AmountFig text={t} />, say });
const dl = (n: number) => ({ label: `${n} dl`, say: `${n} deciliter` });
const jug = (n: number) => ({ figure: <MeasureJugFig dl={n} />, say: `mérőedény, benne ${n} deciliter víz` });
const tray = (n: number) => ({ figure: <TrayFig n={n} />, say: `${n} pohár a tálcán` });
const who = (icon: 'meh' | 'csiga', say: string) => ({
  figure: (
    <svg viewBox="0 0 60 60" className="w-20 h-20">
      {ICONS[icon]({ x: 30, y: 30, s: 1.2 })}
    </svg>
  ),
  say,
});

export const AZ_URTARTALOM_MERESE_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – több, kevesebb fér bele; üres, tele; pohárral mérés
  { id: 'u1', level: 1, badge: 'Több fér bele', ask: 'Melyikbe fér több víz?', options: [v('bogre'), v('kanal')], hint: 'A kanálba csak egy korty fér. Melyik a nagyobb edény?' },
  { id: 'u2', level: 1, badge: 'Kevesebb fér bele', ask: 'Melyikbe fér kevesebb víz?', options: [v('pohar'), v('vodor')], hint: 'A nagyobbat választottad. Most az kell, amelyikbe kevesebb fér!' },
  { id: 'u3', level: 1, badge: 'Üres, tele', ask: 'Melyik pohár üres?', options: [gl(0, 'üres pohár'), gl(1, 'tele pohár'), gl(0.5, 'félig teli pohár')], hint: 'Az üres pohárban egy csepp víz sincs. Melyik az?' },
  { id: 'u4', level: 1, badge: 'Üres, tele', ask: 'Melyik pohár van tele?', options: [gl(1, 'tele pohár'), gl(0.5, 'félig teli pohár'), gl(0.2, 'kevés víz a pohárban')], hint: 'A teli pohárban a víz egészen a tetejéig ér.' },
  { id: 'u5', level: 1, badge: 'Mérés pohárral', ask: 'Hány pohár víz fért a vödörbe?', scene: <CupsToVesselScene rows={[{ k: 'vodor', n: 6 }]} />, options: [6, 5, 7], hint: 'Mutass rá minden pohárra, és számold meg őket!' },
  { id: 'u6', level: 1, badge: 'A legtöbb fér bele', ask: 'Melyikbe fér a legtöbb víz?', options: [v('hordo'), v('kanna'), v('csesze')], hint: 'Melyik a legnagyobb edény? Abba fér a legtöbb.' },
  { id: 'u7', level: 1, badge: 'Belefér-e?', ask: 'Mi történik a bögrével?', say: 'A teli vödör vizét a bögrébe öntjük. Mi történik?', scene: <PourScene from="vodor" to="bogre" />, options: [{ figure: <GlassFig fill={1} overflow />, say: 'kifolyik a víz' }, { figure: <GlassFig fill={0.4} />, say: 'belefér' }], hint: 'A vödörbe sokkal több víz fér, mint a bögrébe. Elfér az a sok víz a bögrében?' },
  { id: 'u8', level: 1, badge: 'Mérés pohárral', ask: 'Hány pohár víz van a tálcán?', scene: <TrayFig n={5} className="w-full max-w-[420px] h-auto" />, options: [5, 4, 6], hint: 'Mutass rá minden pohárra!' },
  // 2. szint – deciliter, liter, mérőedény, jelek
  { id: 'u9', level: 2, badge: 'Deciliter', ask: 'Hány dl víz van a tálcán?', say: 'Minden pohár 1 deciliter. Hány deciliter víz van a tálcán?', scene: <TrayFig n={7} label className="w-full max-w-[420px] h-auto" />, options: [7, 6, 8], hint: 'Minden pohár 1 deciliter. Számold meg a poharakat!' },
  { id: 'u10', level: 2, badge: 'Mérőedény', ask: 'Hány dl víz van a mérőedényben?', say: 'Hány deciliter víz van a mérőedényben?', scene: <MeasureScene dl={3} />, options: [3, 2, 4], hint: 'Alulról számold a vonalakat a víz tetejéig!' },
  { id: 'u11', level: 2, badge: 'Mérőedény', ask: 'Hány dl víz van a mérőedényben?', say: 'Most hány deciliter víz van a mérőedényben?', scene: <MeasureScene dl={6} />, options: [6, 5, 7], hint: 'Minden vonal 1 deciliter. Alulról számolj!' },
  { id: 'u12', level: 2, badge: 'Jelek: <, >, =', ask: 'csésze □ bögre', say: 'A csészébe kevesebb fér, mint a bögrébe. Melyik jel kell közéjük?', scene: <CompareScene a="csesze" b="bogre" />, options: ['<', '>', '='], hint: 'A jel szája arra nyílik, amelyikbe több fér.' },
  { id: 'u13', level: 2, badge: 'Jelek: <, >, =', ask: 'hordó □ kanna', say: 'Melyik jel kell a hordó és a locsolókanna közé?', scene: <CompareScene a="hordo" b="kanna" />, options: ['>', '<', '='], hint: 'A hordóba több fér. A jel szája a hordó felé nyílik.' },
  { id: 'u14', level: 2, badge: 'Liter', ask: 'Hány liter víz volt a lábasban?', say: 'A lábas vizét 1 literes kancsókba öntöttük. Hány liter víz volt a lábasban?', scene: <PotJugsScene n={2} />, options: [2, 1, 3], hint: 'Minden kancsó 1 liter. Számold meg a kancsókat!' },
  { id: 'u15', level: 2, badge: 'Kisebb edény – többször', ask: 'Kinek kell többször fordulnia?', say: 'Zümi kis pohárral, Csigusz nagy bögrével hordja a vizet. Kinek kell többször fordulnia?', scene: <TripsScene small={7} big={3} />, options: [who('meh', 'Zümi, a kis pohárral'), who('csiga', 'Csigusz, a nagy bögrével')], hint: 'A kis pohárba kevés fér. Akkor sokszor vagy kevésszer kell fordulni?' },
  { id: 'u16', level: 2, badge: '1 l = 10 dl', ask: 'Hány dl 1 liter?', say: 'Hány deciliter 1 liter? Számold meg a poharakat!', scene: <LiterScene />, options: [10, 8, 1], hint: 'Az 1 literes kancsóból ennyi 1 deciliteres pohár telt meg. Számold meg!' },
  // 3. szint – számolás dl-rel és l-rel
  { id: 'u17', level: 3, badge: 'Számolás dl-rel', ask: '4 dl + 3 dl = ? dl', say: 'A mérőedényben 4 deciliter víz van. Beleöntünk még 3 pohárral, mindegyik 1 deciliter. Hány deciliter lesz?', scene: <MeasureScene dl={4} cups={3} />, options: [7, 6, 1], hint: 'Ez összeadás. Számolj 4-től hármat tovább!' },
  { id: 'u18', level: 3, badge: 'Kiegészítés 1 literre', ask: '6 dl + ? dl = 10 dl', say: 'A mérőedényben 6 deciliter víz van. Hány deciliter kell még, hogy 1 liter, vagyis 10 deciliter legyen?', scene: <MeasureScene dl={6} />, options: [4, 3, 6], hint: 'Számolj 6-tól 10-ig! Hányat léptél?' },
  { id: 'u19', level: 3, badge: 'Számolás dl-rel', ask: 'Mennyi víz maradt a kancsóban?', say: 'Az 1 literes kancsóban 10 deciliter víz volt. Pötyi 2 decilitert ivott, Csigusz 3 decilitert. Hány deciliter maradt?', scene: <MeasureScene dl={10} />, options: [5, 7, 8], hint: '10-ből vedd el a 2-t, aztán a 3-at is!' },
  { id: 'u20', level: 3, badge: 'Liter és deciliter', ask: 'Melyik a több?', say: 'Melyik a több: 1 liter vagy 2 deciliter?', options: [amt('1 l', '1 liter'), amt('2 dl', '2 deciliter')], hint: '1 liter 10 deciliter. Az több vagy kevesebb, mint 2 deciliter?' },
  { id: 'u21', level: 3, badge: '1 l = 10 dl', ask: '10 dl □ 1 l', say: 'Melyik jel kell a 10 deciliter és az 1 liter közé?', options: ['=', '<', '>'], hint: 'Emlékszel? 10 kis pohár tölti meg az 1 literes kancsót.' },
  { id: 'u22', level: 3, badge: 'A legkevesebb fér bele', ask: 'Melyikbe fért a legkevesebb víz?', say: 'Pohárral mértük meg az edényeket. Melyikbe fért a legkevesebb víz?', scene: <CupsToVesselScene rows={[{ k: 'kanna', n: 5 }, { k: 'vodor', n: 7 }, { k: 'bogre', n: 2 }]} />, options: [v('bogre'), v('kanna'), v('vodor')], hint: 'Amelyik mellett a legkevesebb pohár van, abba fér a legkevesebb.' },
  { id: 'u23', level: 3, badge: 'Liter', ask: 'Hány liter víz volt a hordóban?', say: 'A hordó vizét 1 literes kancsókba öntöttük. Hány liter víz volt benne?', scene: <PotJugsScene n={4} pot="hordo" />, options: [4, 3, 5], hint: 'Minden kancsó 1 liter. Számold meg őket!' },
  { id: 'u24', level: 3, badge: 'Számolás dl-rel', ask: '10 dl − 6 dl = ? dl', say: 'Az 1 literes kancsóban 10 deciliter szörp volt. Kiöntöttünk belőle 6 decilitert. Hány deciliter maradt?', scene: <MeasureScene dl={10} />, options: [4, 6, 3], hint: '10-ből vegyél el 6-ot! Ujjaidon is megnézheted.' },
];

export const AZ_URTARTALOM_MERESE_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Hány pohár van a tálcán? Párosítsd a számmal!',
    pairs: [
      { a: tray(2), b: 2 },
      { a: tray(3), b: 3 },
      { a: tray(5), b: 5 },
      { a: tray(6), b: 6 },
    ],
  },
  2: {
    say: 'Hány deciliter víz van a mérőedényben? Párosítsd!',
    pairs: [
      { a: jug(2), b: dl(2) },
      { a: jug(4), b: dl(4) },
      { a: jug(7), b: dl(7) },
      { a: jug(9), b: dl(9) },
    ],
  },
  3: {
    say: 'Mennyi kell még, hogy 1 liter, vagyis 10 deciliter legyen? Párosítsd!',
    pairs: [
      { a: jug(3), b: dl(7) },
      { a: jug(6), b: dl(4) },
      { a: jug(9), b: dl(1) },
      { a: jug(8), b: dl(2) },
    ],
  },
};

export const AZ_URTARTALOM_MERESE_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Üres vagy tele? Tedd a jó kosárba!',
    bins: [
      { label: 'Üres', figure: <GlassFig fill={0} className="w-8 h-10" />, say: 'üres' },
      { label: 'Tele', figure: <GlassFig fill={1} className="w-8 h-10" />, say: 'tele' },
    ],
    items: [
      { item: gl(0, 'üres pohár'), bin: 0 },
      { item: gl(1, 'teli pohár'), bin: 1 },
      { item: jug(0), bin: 0 },
      { item: jug(10), bin: 1 },
      { item: { figure: <TrayFig n={3} />, say: 'három teli pohár' }, bin: 1 },
      { item: { figure: <VesselFig k="kancso" fill={0} />, say: 'üres kancsó' }, bin: 0 },
      { item: { figure: <VesselFig k="kancso" fill={0.95} />, say: 'teli kancsó' }, bin: 1 },
      { item: gl(0, 'még egy üres pohár'), bin: 0 },
    ],
  },
  2: {
    say: 'Sok víz fér bele, vagy kevés? Tedd a jó kosárba!',
    bins: [
      { label: 'Sok', figure: <VesselFig k="hordo" className="w-10 h-10" />, say: 'sok fér bele' },
      { label: 'Kevés', figure: <VesselFig k="kanal" className="w-10 h-10" />, say: 'kevés fér bele' },
    ],
    items: [
      { item: v('vodor'), bin: 0 },
      { item: v('hordo'), bin: 0 },
      { item: v('kanna'), bin: 0 },
      { item: v('labas'), bin: 0 },
      { item: v('kanal'), bin: 1 },
      { item: v('kupak'), bin: 1 },
      { item: v('csesze'), bin: 1 },
      { item: v('pohar'), bin: 1 },
    ],
  },
  3: {
    say: 'Kevesebb, mint 1 liter, pontosan 1 liter, vagy több, mint 1 liter?',
    bins: [
      { label: 'Kevesebb', figure: <MeasureJugFig dl={4} className="w-8 h-12" />, say: 'kevesebb, mint 1 liter' },
      { label: '1 liter', figure: <MeasureJugFig dl={10} className="w-8 h-12" />, say: 'pontosan 1 liter' },
      { label: 'Több', figure: <AmountFig text="3 l" className="w-14 h-8" />, say: 'több, mint 1 liter' },
    ],
    items: [
      { item: amt('5 dl', '5 deciliter'), bin: 0 },
      { item: amt('2 dl', '2 deciliter'), bin: 0 },
      { item: amt('9 dl', '9 deciliter'), bin: 0 },
      { item: amt('10 dl', '10 deciliter'), bin: 1 },
      { item: amt('1 l', '1 liter'), bin: 1 },
      { item: amt('2 l', '2 liter'), bin: 2 },
      { item: amt('4 l', '4 liter'), bin: 2 },
      { item: amt('10 l', '10 liter'), bin: 2 },
    ],
  },
};

export const AzUrtartalomMereseG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="3. Az űrtartalom mérése"
    badge="1. OSZTÁLY • V. MÉRÉSEK • JÁTÉK"
    base="g1-meas-az-urtartalom-merese"
    chapterId="meresek"
    questions={AZ_URTARTALOM_MERESE_G1_QUESTIONS}
    pairs={AZ_URTARTALOM_MERESE_G1_PAIRS}
    sort={AZ_URTARTALOM_MERESE_G1_SORT}
    {...props}
  />
);

export default AzUrtartalomMereseG1Jatek;
