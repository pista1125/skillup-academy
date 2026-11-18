import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, ICONS, NumberLine, TenFrame } from '../../shared/G1Pics';
import { EqCard, HopLine, TwoHands } from '../a-nyolc/ANyolcG1Scenes';
import { COLORS, PairUpScene, TreeScene, TwoRows, XBox, XCompare, XMini } from '../a-kilenc/AKilencG1Scenes';
import { ArrowCard, PlatesScene, TrayScene } from '../szamolas-0-tol-9-ig/Szamolas0Tol9IgG1Scenes';
import { ANIMAL_QUEUE, GARLAND, GarlandScene, OrdinalStrip, PodiumScene, RacerPic, SLEDS9, SledPic, StartQueue, ord } from '../a-sorszamnevek/ASorszamnevekG1Scenes';
import { GridScene, MailboxesScene, MugPattern, MugPic, PieceTree, ScarfScene } from './Megallo9G1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const sign = (t: string, say: string) => sm(<BigSign text={t} />, say);
const racer = (who: 'potyi' | 'zumi' | 'csigusz') => sm(<RacerPic who={who} />, who === 'potyi' ? 'Pötyi' : who === 'zumi' ? 'Zümi' : 'Csigusz');
const icon = (name: 'madar' | 'pillango' | 'meh' | 'csiga', say: string) =>
  sm(
    <svg viewBox="0 0 100 90" className="w-24 h-auto">
      <rect x="3" y="3" width="94" height="84" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {ICONS[name]({ x: 50, y: 46, s: 1.5 })}
    </svg>,
    say
  );
const sleds = SLEDS9.map((c) => ({ icon: 'szanko' as const, color: COLORS[c] }));
const sled = (pos: number, name: string) => sm(<SledPic color={COLORS[SLEDS9[pos - 1]]} />, `${name} szánkó`);
const GRID = [
  { r: 1, c: 2, k: 'haromszog' as const },
  { r: 2, c: 1, k: 'negyzet' as const },
  { r: 3, c: 3, k: 'kor' as const },
];
const QUEUE2 = [{ icon: 'madar' as const }, { icon: 'meh' as const }, { icon: 'pillango' as const }, { icon: 'potyi' as const }, { icon: 'csiga' as const }];

export const MEGALLO9_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – a kilenc, egyszerű képes műveletek, első/második
  { id: 'm1', level: 1, badge: 'Számlálás', ask: 'Hány dísz van a fán?', scene: <TreeScene filled={9} />, options: [9, 8, 7], hint: 'Soronként számolj, fentről lefelé! Egyet se hagyj ki.' },
  { id: 'm2', level: 1, badge: 'Számjegy', ask: 'Melyik a kilences?', options: [sign('9', 'kilences'), sign('6', 'hatos'), sign('8', 'nyolcas')], hint: 'A kilencesnek fent van a kerek feje, lent a lába. A hatos fordítva áll.' },
  { id: 'm3', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', say: 'Két kezet látsz. Hány ujj van fent összesen?', scene: <TwoHands n={9} />, options: [9, 8, 7], hint: 'Az egyik kézen 5 ujj van. Számolj tovább a másikon!' },
  { id: 'm4', level: 1, badge: 'Dominó', ask: 'Hány pötty van a dominón?', scene: <Domino left={5} right={4} className="w-48 h-auto mx-auto" />, options: [9, 8, 7], hint: 'Számold meg a bal oldalt, aztán számolj tovább a jobb oldallal!' },
  { id: 'm5', level: 1, badge: 'Számlálás', ask: 'Hány toboz van?', scene: <XBox icon="toboz" n={7} className="w-56 h-auto mx-auto" />, options: [7, 9, 8], hint: 'Nem mindig kilenc van! Mutass rá mindegyikre.' },
  { id: 'm6', level: 1, badge: 'Sorszám', ask: 'Ki lett a második?', say: 'Nézd a dobogót! Ki lett a második?', scene: <PodiumScene order={['csigusz', 'zumi', 'potyi']} />, options: [racer('zumi'), racer('csigusz'), racer('potyi')], hint: 'Keresd a 2 és pont jelet a dobogón!' },
  { id: 'm7', level: 1, badge: 'Sorszám', ask: 'Melyik szánkó az első?', say: 'Melyik szánkó az első? Az első a zászlóhoz legközelebb áll.', scene: <StartQueue items={sleds} />, options: [sled(1, 'kék'), sled(9, 'türkiz'), sled(4, 'piros')], hint: 'Az első az, amelyik a zászló mellett áll.' },
  { id: 'm8', level: 1, badge: 'Összeadás', ask: '5 + 4 = ?', say: '5 csillag és 4 szív alakú süti van a tálcán. Hány süti van összesen?', scene: <TrayScene a={5} b={4} />, options: [9, 8, 1], hint: 'Számold meg a csillagokat, aztán számolj tovább a szívekkel!' },
  { id: 'm9', level: 1, badge: 'Kivonás', ask: '9 − 3 = ?', say: '9 süti volt, hármat megettek. Hány maradt?', scene: <TrayScene a={9} crossed={3} />, options: [6, 5, 7], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 'm10', level: 1, badge: 'Számegyenes', ask: 'Mi jön a 8 után?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={9} question={9} />, options: [9, 7, 6], hint: 'Eggyel több, mint 8.' },
  { id: 'm11', level: 1, badge: 'Páratlan', ask: 'Páros vagy páratlan a 9?', say: 'Kilenc díszt párba állítottunk. Páros vagy páratlan a 9?', scene: <PairUpScene n={9} />, options: [{ label: 'páratlan', say: 'páratlan' }, { label: 'páros', say: 'páros' }], hint: 'Nézd meg az utolsó oszlopot! Jutott mindegyiknek pár?' },
  { id: 'm12', level: 1, badge: 'Jelölés', ask: 'Melyik jelenti: első?', say: 'Melyik jelenti azt, hogy első?', options: [ord(1), { label: '1', say: 'egy' }, ord(7)], hint: 'A sorszám után pontot teszünk.' },
  // 2. szint – becslés, nyíl, nyitott mondat, minták, sorszámok
  { id: 'm13', level: 2, badge: 'Összeadás', ask: 'Hány sál van összesen?', say: 'Sárga és zöld sálak száradnak. Hány sál van összesen?', scene: <ScarfScene a={5} b={4} />, options: [9, 8, 5], hint: 'Mutass rá mindegyik sálra, és számolj! Egyet se számolj kétszer.' },
  { id: 'm14', level: 2, badge: 'Nyíl szerint', ask: 'Mi kerül a □ helyére?', say: 'Kezdd a 6-nál, és adj hozzá 3-at. Mi kerül az üres négyzetbe?', scene: <ArrowCard from={6} op="+3" />, options: [9, 8, 3], hint: 'Kezdd a 6-nál, és számolj tovább hármat: 7, 8…' },
  { id: 'm15', level: 2, badge: 'Nyitott mondat', ask: '8 + □ = 9', say: '8 meg valahány egyenlő 9. Melyik szám kell az üres négyzetbe?', scene: <EqCard text="8 + □ = 9" />, options: [1, 2, 0], hint: 'A 9 közvetlenül a 8 után jön. Hányat kell lépni?' },
  { id: 'm16', level: 2, badge: 'Kiegészítés', ask: 'Hányat lépett Csigusz?', say: 'Csigusz az 5-ről a 9-re mászott. Hányat lépett?', scene: <HopLine from={5} to={9} max={9} hideTarget={false} />, options: [4, 5, 3], hint: 'Számold meg az íveket!' },
  { id: 'm17', level: 2, badge: 'Minta', ask: 'Milyen színű a következő bögre?', say: 'A minta: 3 kék, 2 piros, aztán újra. Milyen színű lesz a kérdőjeles bögre?', scene: <MugPattern pattern="BBBRR" shown={7} />, options: [sm(<MugPic color="#3b82f6" />, 'kék bögre'), sm(<MugPic color="#ef4444" />, 'piros bögre')], hint: 'A második körben hány kék van már? Három kék kell, mielőtt jön a piros.' },
  { id: 'm18', level: 2, badge: 'Táblázat', ask: 'Hányadik oszlopban van a kör?', say: 'Az oszlopokat balról számoljuk. Hányadik oszlopban van a piros kör?', scene: <GridScene items={GRID} />, options: [ord(3), ord(2), ord(1)], hint: 'Az oszlopok számai fent, a rózsaszín mezőkben vannak.' },
  { id: 'm19', level: 2, badge: 'Sorszám', ask: 'Hányadik zsákban van a sál?', say: 'Hányadik zsákban van a sál?', scene: <GarlandScene items={GARLAND} />, options: [ord(7), ord(6), ord(8)], hint: 'Keresd meg a sálat, aztán nézd meg a fölötte lévő számot!' },
  { id: 'm20', level: 2, badge: 'Előtte', ask: 'Ki áll közvetlenül Pötyi előtt?', say: 'Az első a zászlónál áll. Ki áll közvetlenül Pötyi előtt?', scene: <StartQueue items={ANIMAL_QUEUE} />, options: [icon('madar', 'madár'), icon('pillango', 'pillangó'), racer('zumi')], hint: 'Előtte: egy hellyel közelebb a zászlóhoz.' },
  { id: 'm21', level: 2, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '8 csengő, és 9 csengő. Melyik jel kell középre?', scene: <XCompare icon="csengo" a={8} b={9} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A jel hegye a kevesebb felé mutat.' },
  { id: 'm22', level: 2, badge: 'Mennyivel több?', ask: 'Mennyivel több a piros?', say: 'Fent 9 piros dísz van, lent 5 kék. Mennyivel több a piros?', scene: <TwoRows icon="disz" a={9} b={5} />, options: [4, 5, 3], hint: 'Számold meg azokat a piros díszeket, amelyek alatt nincs kék!' },
  { id: 'm23', level: 2, badge: 'Sorszám', ask: 'Hol van kiszínezve a 6. dísz?', say: 'Hol van kiszínezve a hatodik dísz?', options: [sm(<OrdinalStrip k={6} mode="place" />, 'csak egy színes dísz'), sm(<OrdinalStrip k={6} mode="count" />, 'hat színes dísz')], hint: 'A hatodik csak egy dísz: balról a hatodik helyen áll.' },
  { id: 'm24', level: 2, badge: 'Nyitott mondat', ask: '9 − □ = 5', say: '9-ből valahányat elvettünk, és 5 maradt. Melyik szám kell az üres négyzetbe?', scene: <EqCard text="9 − □ = 5" />, options: [4, 5, 3], hint: 'Lépj visszafelé a 9-től az 5-ig! Hányat léptél?' },
  // 3. szint – fejtörők, három szám, két lépés, történetek
  { id: 'm25', level: 3, badge: 'Fejtörő', ask: 'Melyik ládába megy a levél?', say: 'Nem az 5 + 4 ládába megy. Nem a 8 − 2 ládába. És nem a 2 + 2 + 4 ládába. Melyikbe megy?', scene: <MailboxesScene numbers={[6, 7, 8, 9]} />, options: [7, 9, 6, 8], hint: 'Számold ki mindhárom súgást! Azok a ládák nem jók. Melyik marad?' },
  { id: 'm26', level: 3, badge: 'Három szám', ask: '3 + 2 + 4 = ?', say: 'Három tányéron 3, 2 és 4 süti van. Hány süti van együtt?', scene: <PlatesScene per={[3, 2, 4]} />, options: [9, 8, 7], hint: 'Előbb 3 + 2 = 5. Aztán számolj tovább négyet!' },
  { id: 'm27', level: 3, badge: 'Két lépés', ask: '9 − 4 − 2 = ?', say: 'Két lépésben számolj! 9-ből vegyél el 4-et, aztán még 2-t.', scene: <EqCard text="9 − 4 − 2 = ?" />, options: [3, 5, 4], hint: 'Előbb 9 − 4 = 5. Aztán az 5-ből vegyél el 2-t!' },
  { id: 'm28', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Bal oldalon 5 + 3, jobb oldalon 9. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="5 + 3 ? 9" />, options: ['<', '>', '='], hint: 'Mennyi 5 + 3? Több vagy kevesebb, mint 9?' },
  { id: 'm29', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Bal oldalon 9 − 0, jobb oldalon 4 + 5. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="9 − 0 ? 4 + 5" />, options: ['=', '<', '>'], hint: 'Számold ki mindkét oldalt, aztán hasonlítsd össze!' },
  { id: 'm30', level: 3, badge: 'Nyitott mondat', ask: '□ − 3 = 6', say: 'Valahányból elvettünk 3-at, és 6 maradt. Mennyi volt az elején?', scene: <EqCard text="□ − 3 = 6" />, options: [9, 3, 8], hint: 'Ami maradt, meg amit elvettünk: 6 + 3. Ennyi volt az elején.' },
  { id: 'm31', level: 3, badge: 'Kis történet', ask: 'Hányadik lett Csigusz?', say: 'Csigusz a nyolcadik volt a sorban. Két szánkó kiállt előle a sorból. Hányadik lett Csigusz?', scene: <StartQueue items={[...sleds.slice(0, 7), { icon: 'csiga' }]} labels />, options: [ord(6), ord(7), ord(9)], hint: 'Ha előle ketten kiállnak, két hellyel előrébb kerül.' },
  { id: 'm32', level: 3, badge: 'Előtte', ask: 'Hányan állnak Pötyi előtt?', say: 'Pötyi a negyedik a sorban. Hányan állnak előtte?', scene: <StartQueue items={QUEUE2} />, options: [3, 4, 5], hint: 'Számold meg, kik állnak Pötyi és a zászló között! Pötyit ne számold.' },
  { id: 'm33', level: 3, badge: 'Logikai lapok', ask: 'Hány lapból áll a fenyő?', say: 'Ezt a fenyőt háromszögekből és egy négyzetből rakták ki. Hány lapból áll összesen?', scene: <PieceTree big={false} />, options: [5, 4, 6], hint: 'A háromszögeket is, a csúcson lévő négyzetet is számold! A fejjel lefelé álló háromszög is egy lap.' },
  { id: 'm34', level: 3, badge: 'Kis történet', ask: 'Hány levél maradt?', say: 'Zümi 9 levelet vitt. 4-et a madaraknak adott, 3-at a pillangóknak. Hány levél maradt nála?', scene: <XBox icon="boritek" n={9} crossed={7} className="w-56 h-auto mx-auto" />, options: [2, 3, 5], hint: 'Előbb 9 − 4 = 5. Aztán az 5-ből vegyél el 3-at!' },
  { id: 'm35', level: 3, badge: 'Nyitott mondat', ask: '6 + 3 > □ > 7', say: 'Melyik szám kisebb, mint 6 + 3, és nagyobb, mint 7?', scene: <EqCard text="6 + 3 > □ > 7" />, options: [8, 9, 7], hint: 'Mennyi 6 + 3? Melyik szám van e között és a 7 között?' },
  { id: 'm36', level: 3, badge: 'Kakukktojás', ask: 'Melyiknek NEM 9 az eredménye?', say: 'Két műveletnek 9 az eredménye. Melyiknek nem?', options: ['3 + 3 + 2', '4 + 5', '9 − 0'], hint: 'Számold ki mindhármat! Melyik nem 9?' },
];

export const MEGALLO9_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd a képet a számmal! Koppints bal oldalon egy képre, aztán jobb oldalon a számra!',
    pairs: [
      { a: sm(<XMini icon="disz" n={9} />, 'díszek'), b: 9 },
      { a: sm(<TwoHands n={7} className="w-24 h-auto" />, 'két kéz'), b: 7 },
      { a: sm(<Domino left={4} right={4} className="w-24 h-auto" />, 'dominó'), b: 8 },
      { a: sm(<TenFrame n={6} className="w-24 h-auto" />, 'korongok'), b: 6 },
    ],
  },
  2: {
    say: 'Számold ki! Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '6 + 3', b: 9 },
      { a: '9 − 5', b: 4 },
      { a: '2 + 5', b: 7 },
      { a: '9 − 8', b: 1 },
      { a: '3 + 3 + 2', b: 8 },
    ],
  },
  3: {
    say: 'Melyik szám, vagy melyik sorszám illik hozzá? Párosítsd!',
    pairs: [
      { a: '4 + □ = 9', b: 5 },
      { a: '□ − 2 = 7', b: 9 },
      { a: sm(<OrdinalStrip k={3} mode="place" className="w-40 h-auto" />, 'díszek'), b: ord(3) },
      { a: sm(<OrdinalStrip k={8} mode="place" className="w-40 h-auto" />, 'díszek'), b: ord(8) },
    ],
  },
};

export const MEGALLO9_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Páros vagy páratlan? Tedd a számot a jó kosárba!',
    bins: [
      { label: 'Páros', figure: <PairUpScene n={4} className="w-16 h-auto" />, say: 'páros' },
      { label: 'Páratlan', figure: <PairUpScene n={5} className="w-20 h-auto" />, say: 'páratlan' },
    ],
    items: [
      { item: 9, bin: 1 },
      { item: 4, bin: 0 },
      { item: 7, bin: 1 },
      { item: 2, bin: 0 },
      { item: 5, bin: 1 },
      { item: 8, bin: 0 },
      { item: 1, bin: 1 },
      { item: 6, bin: 0 },
    ],
  },
  2: {
    say: 'Számold ki! Pont 9 az eredmény, vagy nem 9?',
    bins: [
      { label: 'Pont 9', figure: <BigSign text="9" className="w-12 h-12" />, say: 'pont kilenc' },
      { label: 'Nem 9', say: 'nem kilenc' },
    ],
    items: [
      { item: '7 + 2', bin: 0 },
      { item: '3 + 6', bin: 0 },
      { item: '9 − 0', bin: 0 },
      { item: '1 + 8', bin: 0 },
      { item: '5 + 3', bin: 1 },
      { item: '9 − 1', bin: 1 },
      { item: '2 + 2 + 2', bin: 1 },
      { item: '4 + 4', bin: 1 },
    ],
  },
  3: {
    say: 'Számold ki! Az eredmény kevesebb, mint 7, pont 7, vagy több, mint 7?',
    bins: [
      { label: '< 7', say: 'kevesebb, mint hét' },
      { label: '7', say: 'pont hét' },
      { label: '> 7', say: 'több, mint hét' },
    ],
    items: [
      { item: '9 − 5', bin: 0 },
      { item: '2 + 2 + 2', bin: 0 },
      { item: '9 − 8', bin: 0 },
      { item: '9 − 2', bin: 1 },
      { item: '4 + 3', bin: 1 },
      { item: '1 + 3 + 3', bin: 1 },
      { item: '6 + 3', bin: 2 },
      { item: '8 − 0', bin: 2 },
      { item: '5 + 3', bin: 2 },
    ],
  },
};

export const Megallo9G1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="16. Megálló"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-megallo-9"
    chapterId="szamkorbovites-10-ig"
    questions={MEGALLO9_G1_QUESTIONS}
    pairs={MEGALLO9_G1_PAIRS}
    sort={MEGALLO9_G1_SORT}
    {...props}
  />
);

export default Megallo9G1Jatek;
