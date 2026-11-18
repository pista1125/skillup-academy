import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { TenFrame } from '../../shared/G1Pics';
import { CountBox, EqCard, MiniBox } from '../a-nyolc/ANyolcG1Scenes';
import { PicEq } from '../szamolas-0-tol-8-ig/Szamolas0Tol8IgG1Scenes';
import { HAMIS, IGAZ, TruthIcon } from './NyitottMondatokG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const B = '#bae6fd';
const ASK = 'Melyik szám illik a □ helyére?';
const SAY = (s: string) => `${s} Melyik szám bújt el a doboz alatt?`;

export const NYITOTT_MONDATOK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – nyitott mondat képpel
  { id: 'nm1', level: 1, badge: 'Hozzáadás', ask: ASK, say: SAY('3 fehér hógolyó meg néhány kék, az 5.'), scene: <PicEq pic={<CountBox icon="hogolyo" n={3} nb={2} colorB={B} />} eq="3 + □ = 5" />, options: [2, 3, 5], hint: 'Számold meg a kék hógolyókat!' },
  { id: 'nm2', level: 1, badge: 'Hozzáadás', ask: ASK, say: SAY('4 piros korong meg néhány kék, az 8.'), scene: <PicEq pic={<TenFrame n={4} second={4} />} eq="4 + □ = 8" />, options: [4, 3, 8], hint: 'Számold meg a kék korongokat!' },
  { id: 'nm3', level: 1, badge: 'Hozzáadás', ask: ASK, say: SAY('6 piros alma meg néhány zöld, az 8.'), scene: <PicEq pic={<CountBox icon="alma" n={6} nb={2} colorB="#22c55e" />} eq="6 + □ = 8" />, options: [2, 1, 3], hint: 'Számolj tovább a 6-tól a 8-ig!' },
  { id: 'nm4', level: 1, badge: 'Hozzáadás', ask: ASK, say: SAY('Néhány piros korong meg 5 kék, az 6.'), scene: <PicEq pic={<TenFrame n={1} second={5} />} eq="□ + 5 = 6" />, options: [1, 0, 6], hint: 'Számold meg a piros korongokat!' },
  { id: 'nm5', level: 1, badge: 'Elvétel', ask: ASK, say: SAY('8 hógolyóból néhányat áthúztunk, és 5 maradt.'), scene: <PicEq pic={<CountBox icon="hogolyo" n={8} crossed={3} />} eq="8 − □ = 5" />, options: [3, 5, 2], hint: 'Az áthúzottakat számold meg!' },
  { id: 'nm6', level: 1, badge: 'Elvétel', ask: ASK, say: SAY('7 virágból néhányat áthúztunk, és 2 maradt.'), scene: <PicEq pic={<CountBox icon="virag" n={7} crossed={5} />} eq="7 − □ = 2" />, options: [5, 2, 4], hint: 'Az áthúzott virágokat számold meg!' },
  { id: 'nm7', level: 1, badge: 'Hozzáadás', ask: ASK, say: SAY('Néhány narancssárga hal meg 2 kék, az 7.'), scene: <PicEq pic={<CountBox icon="hal" n={5} nb={2} colorB="#3b82f6" />} eq="□ + 2 = 7" />, options: [5, 2, 4], hint: 'Számold meg a narancssárga halakat!' },
  { id: 'nm8', level: 1, badge: 'Hozzáadás', ask: ASK, say: SAY('3 piros sapka meg néhány kék, az 8.'), scene: <PicEq pic={<CountBox icon="sapka" n={3} nb={5} color="#ef4444" colorB="#3b82f6" />} eq="3 + □ = 8" />, options: [5, 3, 4], hint: 'Számold meg a kék sapkákat!' },
  // 2. szint – egyenlőtlenség (egy jó válasz), kép nélküli nyitott mondat
  { id: 'nm9', level: 2, badge: 'Kisebb, mint', ask: 'Melyik szám teszi igazzá?', say: 'Valahány kisebb, mint 4. Melyik szám teszi igazzá?', scene: <EqCard text="□ < 4" />, options: [2, 4, 6], hint: 'Próbáld ki mindegyiket! A 4 nem kisebb, mint 4.' },
  { id: 'nm10', level: 2, badge: 'Nagyobb, mint', ask: 'Melyik szám teszi igazzá?', say: 'Valahány nagyobb, mint 5. Melyik szám teszi igazzá?', scene: <EqCard text="□ > 5" />, options: [7, 5, 3], hint: 'Az 5 után jövő számok nagyobbak, mint 5.' },
  { id: 'nm11', level: 2, badge: 'Kisebb, mint', ask: 'Melyik szám teszi igazzá?', say: 'Valahány kisebb, mint 8. Melyik szám teszi igazzá?', scene: <EqCard text="□ < 8" />, options: [7, 8], hint: 'A 8 nem kisebb, mint 8. Melyik van előtte?' },
  { id: 'nm12', level: 2, badge: 'Nagyobb, mint', ask: 'Melyik szám teszi igazzá?', say: 'Valahány nagyobb, mint 2. Melyik szám teszi igazzá?', scene: <EqCard text="□ > 2" />, options: [3, 2, 0], hint: 'A 2 nem nagyobb, mint 2. Keress nagyobbat!' },
  { id: 'nm13', level: 2, badge: 'Két feltétel', ask: 'Melyik szám teszi igazzá?', say: 'A szám nagyobb, mint 2, és kisebb, mint 6. Melyik jó?', scene: <EqCard text="2 < □ < 6" />, options: [4, 1, 7], hint: 'A szám a 2 és a 6 között legyen a számegyenesen!' },
  { id: 'nm14', level: 2, badge: 'Nem igaz', ask: 'Melyik szám NEM teszi igazzá?', say: 'Valahány kisebb, mint 4. Melyik szám nem jó ide?', scene: <EqCard text="□ < 4" />, options: [5, 1, 3], hint: 'Két szám kisebb, mint 4. Melyik nem az?' },
  { id: 'nm15', level: 2, badge: 'Elvétel', ask: ASK, say: '8 elvéve valahány egyenlő 4. Melyik szám bújt el?', scene: <EqCard text="8 − □ = 4" />, options: [4, 3, 5], hint: 'Próbáld ki: 8 elvéve ennyi, az 4 lesz?' },
  { id: 'nm16', level: 2, badge: 'Hozzáadás', ask: ASK, say: 'Valahány meg 3 egyenlő 7. Melyik szám bújt el?', scene: <EqCard text="□ + 3 = 7" />, options: [4, 3, 5], hint: 'Mennyi kell a 3-hoz, hogy 7 legyen? Számolj tovább a 3-tól!' },
  // 3. szint – igaz/hamis, nagyobb ismeretlen, kis történetek
  { id: 'nm17', level: 3, badge: 'Igaz vagy hamis?', ask: 'Igaz vagy hamis?', say: '5 meg 3 egyenlő 8. Igaz vagy hamis? A zöld pipa: igaz. A piros kereszt: hamis.', scene: <EqCard text="5 + 3 = 8" />, options: [IGAZ, HAMIS], hint: 'Számold ki az 5 meg 3-at! Annyi, mint 8?' },
  { id: 'nm18', level: 3, badge: 'Igaz vagy hamis?', ask: 'Igaz vagy hamis?', say: '8 elvéve 3 egyenlő 4. Igaz vagy hamis?', scene: <EqCard text="8 − 3 = 4" />, options: [HAMIS, IGAZ], hint: 'Számold ki: 8 elvéve 3. Annyi, mint 4?' },
  { id: 'nm19', level: 3, badge: 'Igaz vagy hamis?', ask: 'Igaz vagy hamis?', say: '6 nagyobb, mint 4 meg 3. Igaz vagy hamis?', scene: <EqCard text="6 > 4 + 3" />, options: [HAMIS, IGAZ], hint: 'Előbb számold ki a 4 meg 3-at! Aztán hasonlítsd a 6-hoz.' },
  { id: 'nm20', level: 3, badge: 'Mennyi volt?', ask: ASK, say: 'Valahány elvéve 5 egyenlő 3. Hány volt az elején?', scene: <EqCard text="□ − 5 = 3" />, options: [8, 2, 7], hint: 'Ami maradt, meg amit elvettünk: 3 meg 5.' },
  { id: 'nm21', level: 3, badge: 'Mennyi volt?', ask: ASK, say: 'Valahány elvéve 2 egyenlő 6. Hány volt az elején?', scene: <EqCard text="□ − 2 = 6" />, options: [8, 4, 6], hint: 'Ami maradt, meg amit elvettünk: 6 meg 2.' },
  { id: 'nm22', level: 3, badge: 'Kis történet', ask: 'Hány virágot szedett még Zümi?', say: 'Zümi 2 virágot szedett, aztán még néhányat. Most 7 virága van. Hányat szedett még?', scene: <EqCard text="2 + □ = 7" />, options: [5, 4, 6], hint: 'Számolj tovább a 2-től a 7-ig, és figyeld, hányat mondtál!' },
  { id: 'nm23', level: 3, badge: 'Két feltétel', ask: 'Melyik szám teszi igazzá?', say: 'A szám nagyobb, mint 6, és kisebb, mint 8. Melyik jó?', scene: <EqCard text="6 < □ < 8" />, options: [7, 6, 8], hint: 'Csak egy szám van a 6 és a 8 között.' },
  { id: 'nm24', level: 3, badge: 'Kis történet', ask: 'Hány hópehely olvadt el?', say: 'Csigusz házán 8 hópehely ült. Néhány elolvadt, és 6 maradt. Hány hópehely olvadt el?', scene: <EqCard text="8 − □ = 6" />, options: [2, 6, 3], hint: 'Számolj vissza a 8-tól a 6-ig: hányat léptél?' },
];

export const NYITOTT_MONDATOK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Melyik szám bújt el? Párosítsd a nyitott mondatot a jó számmal!',
    pairs: [
      { a: '3 + □ = 5', b: 2 },
      { a: '4 + □ = 8', b: 4 },
      { a: '□ + 1 = 7', b: 6 },
      { a: '5 + □ = 8', b: 3 },
    ],
  },
  2: {
    say: 'Elvételes nyitott mondatok. Melyik szám illik a doboz helyére?',
    pairs: [
      { a: '8 − □ = 7', b: 1 },
      { a: '6 − □ = 1', b: 5 },
      { a: '□ − 2 = 6', b: 8 },
      { a: '□ − 4 = 3', b: 7 },
      { a: '7 − □ = 7', b: 0 },
    ],
  },
  3: {
    say: 'Melyik képhez melyik nyitott mondat illik? Nézd meg a színeket és az áthúzásokat!',
    pairs: [
      { a: sm(<MiniBox icon="hogolyo" n={5} nb={3} colorB={B} />, 'öt fehér, három kék'), b: '5 + □ = 8' },
      { a: sm(<MiniBox icon="hogolyo" n={2} nb={4} colorB={B} />, 'két fehér, négy kék'), b: '2 + □ = 6' },
      { a: sm(<MiniBox icon="hogolyo" n={7} crossed={3} />, 'hétből három áthúzva'), b: '7 − □ = 4' },
      { a: sm(<MiniBox icon="hogolyo" n={8} crossed={6} />, 'nyolcból hat áthúzva'), b: '8 − □ = 2' },
    ],
  },
};

const ok = <TruthIcon ok className="w-10 h-10" />;
const no = <TruthIcon ok={false} className="w-10 h-10" />;

export const NYITOTT_MONDATOK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Igaz vagy hamis? Számold ki, és tedd a jó kosárba!',
    bins: [
      { label: 'Igaz', figure: ok, say: 'igaz' },
      { label: 'Hamis', figure: no, say: 'hamis' },
    ],
    items: [
      { item: '2 + 3 = 5', bin: 0 },
      { item: '4 + 4 = 8', bin: 0 },
      { item: '6 − 1 = 4', bin: 1 },
      { item: '3 + 5 = 7', bin: 1 },
      { item: '8 − 2 = 6', bin: 0 },
      { item: '7 − 7 = 1', bin: 1 },
    ],
  },
  2: {
    say: 'Valahány kisebb, mint 4. Melyik szám teszi igazzá? A jókat az igaz kosárba tedd!',
    bins: [
      { label: '□ < 4 igaz', figure: ok, say: 'igaz' },
      { label: 'Hamis', figure: no, say: 'hamis' },
    ],
    items: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((v) => ({ item: v, bin: v < 4 ? 0 : 1 })),
  },
  3: {
    say: 'A szám nagyobb, mint 2, és kisebb, mint 6. Melyik számok teszik igazzá?',
    bins: [
      { label: '2 < □ < 6 igaz', figure: ok, say: 'igaz' },
      { label: 'Hamis', figure: no, say: 'hamis' },
    ],
    items: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((v) => ({ item: v, bin: v > 2 && v < 6 ? 0 : 1 })),
  },
};

export const NyitottMondatokG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="11. Nyitott mondatok"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-nyitott-mondatok"
    chapterId="szamkorbovites-10-ig"
    questions={NYITOTT_MONDATOK_G1_QUESTIONS}
    pairs={NYITOTT_MONDATOK_G1_PAIRS}
    sort={NYITOTT_MONDATOK_G1_SORT}
    {...props}
  />
);

export default NyitottMondatokG1Jatek;
