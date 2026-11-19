import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import {
  ActivityRowScene,
  CLOCK_RIMS,
  ClockFig,
  ClockScene,
  ObjFig,
  RIM_SAY,
  SeasonFig,
  SeasonsScene,
  SkyFig,
  TwoClocksScene,
  WeekScene,
  NapszakScene,
  actOpt,
  dayOpt,
  objOpt,
  seasonOpt,
  skyOpt,
} from './AzIdoMereseG1Scenes';

/** Óra válaszkártyának: a kerete színe különbözteti meg (a felolvasás nem árulja el az órát). */
const clockOpt = (h: number, c: number) => ({ figure: <ClockFig h={h} rim={CLOCK_RIMS[c]} />, say: RIM_SAY[c] });
const potyiOpt = { figure: <Potyi mood="happy" dots={7} className="w-20 h-20" />, say: 'Pötyi' };
const zumiOpt = {
  figure: (
    <svg viewBox="0 0 60 60" className="w-20 h-20">
      {ICONS.meh({ x: 30, y: 30, s: 1.2 })}
    </svg>
  ),
  say: 'Zümi',
};
const moonOpt = {
  figure: (
    <svg viewBox="0 0 80 80" className="w-20 h-20">
      <rect x="2" y="2" width="76" height="76" rx="12" fill="#1e3a8a" />
      <circle cx="40" cy="40" r="22" fill="#fef08a" />
      <circle cx="52" cy="32" r="20" fill="#1e3a8a" />
      {ICONS.csillag({ x: 62, y: 62, s: 0.3 })}
      {ICONS.csillag({ x: 18, y: 18, s: 0.25 })}
    </svg>
  ),
  say: 'a hold',
};

const CLOCK_HINT = 'A rövid piros kismutatót nézd! Melyik számra mutat?';

export const AZ_IDO_MERESE_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – napszakok, a hét, egész órák felismerése
  { id: 'i1', level: 1, badge: 'Napszakok', ask: 'Melyik képen van éjjel?', options: [skyOpt(5), skyOpt(2), skyOpt(0)], hint: 'Éjjel sötét van, a hold és a csillagok világítanak.' },
  { id: 'i2', level: 1, badge: 'Napszakok', ask: 'Melyik képen van délben?', options: [skyOpt(2), skyOpt(5), skyOpt(4)], hint: 'Délben a nap a legmagasabban jár az égen.' },
  { id: 'i3', level: 1, badge: 'Napszakok', ask: 'Mit csinál Pötyi éjjel?', options: [actOpt('alvas'), actOpt('ebed'), actOpt('jatek')], hint: 'Éjjel, amikor sötét van, mindenki pihen.' },
  { id: 'i4', level: 1, badge: 'A hét napjai', ask: 'Hány napból áll egy hét?', say: 'Itt van a hét összes napja. Hány napból áll egy hét?', scene: <WeekScene />, options: [7, 5, 6], hint: 'Mutass rá minden naptárlapra, és számold meg őket!' },
  { id: 'i5', level: 1, badge: 'Egész órák', ask: 'Hány órát mutat az óra?', scene: <ClockScene h={2} names={false} />, options: [2, 1, 3], hint: CLOCK_HINT },
  { id: 'i6', level: 1, badge: 'Egész órák', ask: 'Hány órát mutat az óra?', scene: <ClockScene h={6} names={false} />, options: [6, 5, 7], hint: CLOCK_HINT },
  { id: 'i7', level: 1, badge: 'Mivel mérjük az időt?', ask: 'Melyikkel mérjük az időt?', options: [objOpt('karora'), objOpt('merleg'), objOpt('rud')], hint: 'A mérleg a tömeget, a rúd a hosszúságot méri. Melyiknek van számlapja?' },
  { id: 'i8', level: 1, badge: 'Évszakok', ask: 'Melyik képen van tél?', options: [seasonOpt(3), seasonOpt(1), seasonOpt(0)], hint: 'Télen hull a hó, és a fák ágai csupaszok.' },
  // 2. szint – sorrend: előtte, utána; órák leolvasása
  { id: 'i9', level: 2, badge: 'Előtte, utána', ask: 'Mi jön az este után?', scene: <NapszakScene hide={5} />, options: [skyOpt(5), skyOpt(0), skyOpt(3)], hint: 'Este lemegy a nap. Utána sötét lesz.' },
  { id: 'i10', level: 2, badge: 'Előtte, utána', ask: 'Mi jön a reggel után?', say: 'Reggel, kérdőjel, délben. Melyik napszak jön a reggel után?', scene: <NapszakScene show={[0, 1, 2]} hide={1} />, options: [skyOpt(1), skyOpt(4), skyOpt(5)], hint: 'Reggel felkel a nap, délben a legmagasabban van. Közben egyre feljebb mászik.' },
  { id: 'i11', level: 2, badge: 'A hét napjai', ask: 'Melyik nap jön a kedd után?', scene: <WeekScene days={[0, 1, 2]} hide={2} />, options: [dayOpt(2), dayOpt(0), dayOpt(4)], hint: 'Mondd el sorban: hétfő, kedd, és utána?' },
  { id: 'i12', level: 2, badge: 'A hét napjai', ask: 'Melyik nap van a hétfő előtt?', scene: <WeekScene days={[5, 6, 0, 1]} hide={1} />, options: [dayOpt(6), dayOpt(1), dayOpt(4)], hint: 'Mondd el visszafelé: kedd, hétfő, és előtte?' },
  { id: 'i13', level: 2, badge: 'A hét napjai', ask: 'Melyik nappal kezdődik a hét?', say: 'Melyik a hét első napja? Melyik nappal kezdődik a hét?', scene: <WeekScene nums hide={0} />, options: [dayOpt(0), dayOpt(6), dayOpt(2)], hint: 'Melyik nap jön a kedd előtt?' },
  { id: 'i14', level: 2, badge: 'Egész órák', ask: 'Hány órát mutat az óra?', scene: <ClockScene h={9} names={false} />, options: [9, 3, 10], hint: 'A kismutatót nézd! A rövid piros mutató hová mutat: jobbra vagy balra?' },
  { id: 'i15', level: 2, badge: 'Egész órák', ask: 'Melyik óra mutat 7 órát?', options: [clockOpt(7, 0), clockOpt(5, 1), clockOpt(8, 2)], hint: 'Keresd meg a 7-et a számlapon! Melyik óra rövid piros mutatója mutat oda?' },
  { id: 'i16', level: 2, badge: 'Napszakok', ask: 'Mikor ebédel Pötyi?', scene: <ActivityRowScene acts={['ebed']} arrows={false} />, options: [skyOpt(2), skyOpt(5), skyOpt(0)], hint: 'Az ebéd a nap közepén van, amikor a nap a legmagasabban jár.' },
  // 3. szint – számolás napokkal és órákkal, korábban, igaz-hamis
  { id: 'i17', level: 3, badge: 'A hét napjai', ask: 'Hány napot megyünk iskolába?', say: 'Hétfőtől péntekig megyünk iskolába. Hány nap ez?', scene: <WeekScene />, options: [5, 7, 2], hint: 'Számold meg a naptárlapokat hétfőtől péntekig!' },
  { id: 'i18', level: 3, badge: 'Hányat alszunk?', ask: 'Hányat alszunk szombatig?', say: 'Ma szerda van. Szombaton lesz az uzsonna. Hányat kell aludni addig?', scene: <WeekScene today={2} party={5} sleeps />, options: [3, 4, 2], hint: 'Számold meg a kis holdakat a MA lap és a mézesbödön között!' },
  { id: 'i19', level: 3, badge: 'Évszakok', ask: 'Egy évszak hány hónapból áll?', scene: <SeasonsScene months />, options: [3, 4, 2], hint: 'Nézd meg a kis naptárlapokat egy évszak alatt! Mindegyik egy hónap.' },
  { id: 'i20', level: 3, badge: 'Évszakok', ask: 'Melyik évszak jön a tél után?', scene: <SeasonsScene order={[3, 0]} hide={1} />, options: [seasonOpt(0), seasonOpt(2), seasonOpt(1)], hint: 'A tél után kinyílik a hóvirág, és kizöldülnek a fák.' },
  { id: 'i21', level: 3, badge: 'Számolás órával', ask: 'Hány órára ér oda Csigusz?', say: 'Csigusz 2 órakor indul, és 3 óra hosszat mászik. Hány órakor ér oda?', scene: <TwoClocksScene a={{ h: 2, who: 'csiga' }} b={{ who: 'meh' }} arrow="3 óra" />, options: [5, 3, 6], hint: 'Indulj a 2-ről, és lépj tovább hármat a számlapon!' },
  { id: 'i22', level: 3, badge: 'Előbb, később', ask: 'Ki kel fel korábban?', say: 'Zümi 8 órakor kel fel, Pötyi 7 órakor. Ki kel fel korábban?', scene: <TwoClocksScene a={{ h: 8, who: 'meh' }} b={{ h: 7, who: 'potyi' }} />, options: [potyiOpt, zumiOpt], hint: 'Melyik szám jön előbb, ha számolsz: a 7 vagy a 8?' },
  { id: 'i23', level: 3, badge: 'Előbb, később', ask: 'Mit csinált Pötyi előbb?', say: 'Pötyi reggelizett, és elment iskolába. Mit csinált előbb?', options: [actOpt('reggeli'), actOpt('iskola')], hint: 'Gondolj a saját reggeledre! Mit csinálsz, mielőtt elindulsz?' },
  { id: 'i24', level: 3, badge: 'Igaz vagy hamis?', ask: 'Igaz vagy hamis? A szerda előtt péntek van.', scene: <WeekScene />, options: ['hamis', 'igaz'], hint: 'Keresd meg a szerdát! Melyik nap áll közvetlenül előtte?' },
];

export const AZ_IDO_MERESE_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Hány órát mutat az óra? Párosítsd a számmal!',
    pairs: [
      { a: clockOpt(2, 0), b: 2 },
      { a: clockOpt(5, 1), b: 5 },
      { a: clockOpt(8, 2), b: 8 },
      { a: clockOpt(10, 3), b: 10 },
    ],
  },
  2: {
    say: 'Mit csinál Pötyi ebben a napszakban? Párosítsd!',
    pairs: [
      { a: skyOpt(0), b: actOpt('reggeli') },
      { a: skyOpt(1), b: actOpt('iskola') },
      { a: skyOpt(2), b: actOpt('ebed') },
      { a: skyOpt(5), b: actOpt('alvas') },
    ],
  },
  3: {
    say: 'Melyik évszakhoz illik? Párosítsd!',
    pairs: [
      { a: seasonOpt(3), b: objOpt('szanko') },
      { a: seasonOpt(1), b: objOpt('napernyo') },
      { a: seasonOpt(2), b: objOpt('szolo') },
      { a: seasonOpt(0), b: objOpt('hovirag') },
    ],
  },
};

export const AZ_IDO_MERESE_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Nappal van, vagy éjjel? Tedd a jó kosárba!',
    bins: [
      { label: 'Nappal', figure: <SkyFig t={2} className="w-14 h-10" />, say: 'nappal' },
      { label: 'Éjjel', figure: <SkyFig t={5} className="w-14 h-10" />, say: 'éjjel' },
    ],
    items: [
      { item: skyOpt(0), bin: 0 },
      { item: skyOpt(2), bin: 0 },
      { item: skyOpt(3), bin: 0 },
      { item: actOpt('ebed'), bin: 0 },
      { item: actOpt('iskola'), bin: 0 },
      { item: skyOpt(5), bin: 1 },
      { item: actOpt('alvas'), bin: 1 },
      { item: moonOpt, bin: 1 },
    ],
  },
  2: {
    say: 'Télen vagy nyáron használjuk? Tedd a jó kosárba!',
    bins: [
      { label: 'Tél', figure: <SeasonFig s={3} className="w-14 h-12" />, say: 'tél' },
      { label: 'Nyár', figure: <SeasonFig s={1} className="w-14 h-12" />, say: 'nyár' },
    ],
    items: [
      { item: objOpt('szanko'), bin: 0 },
      { item: objOpt('napernyo'), bin: 1 },
      { item: objOpt('hoember'), bin: 0 },
      { item: objOpt('uszogumi'), bin: 1 },
      { item: objOpt('sapka'), bin: 0 },
      { item: objOpt('fagyi'), bin: 1 },
    ],
  },
  3: {
    say: 'Időt vagy hosszúságot mérünk vele? Tedd a jó kosárba!',
    bins: [
      { label: 'Időt', figure: <ObjFig k="vekker" className="w-12 h-12" />, say: 'időt mérünk vele' },
      { label: 'Hosszúságot', figure: <ObjFig k="meterrud" className="w-12 h-12" />, say: 'hosszúságot mérünk vele' },
    ],
    items: [
      { item: objOpt('vekker'), bin: 0 },
      { item: objOpt('rud'), bin: 1 },
      { item: objOpt('karora'), bin: 0 },
      { item: objOpt('meroszalag'), bin: 1 },
      { item: objOpt('kakukkos'), bin: 0 },
      { item: objOpt('meterrud'), bin: 1 },
      { item: objOpt('napora'), bin: 0 },
    ],
  },
};

export const AzIdoMereseG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="4. Az idő mérése"
    badge="1. OSZTÁLY • V. MÉRÉSEK • JÁTÉK"
    base="g1-meas-az-ido-merese"
    chapterId="meresek"
    questions={AZ_IDO_MERESE_G1_QUESTIONS}
    pairs={AZ_IDO_MERESE_G1_PAIRS}
    sort={AZ_IDO_MERESE_G1_SORT}
    {...props}
  />
);

export default AzIdoMereseG1Jatek;
