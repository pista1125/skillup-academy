import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Domino, NumberLine, BigSign } from '../../shared/G1Pics';
import { Box6, Compare6, Disks, Fingers, Mini6, PotyiDotsScene, RowScene, SignRow } from '../a-hat/AHatG1Scenes';
import { ChainScene, ExprCompare, MixRowScene } from '../szamolas-0-tol-6-ig/Szamolas0Tol6IgG1Scenes';
import { PairUpScene, PARATLAN, PAROS, ParityIcon } from '../paros-es-paratlan-szamok/ParosEsParatlanSzamokG1Scenes';
import { DotBug, HAMIS, IGAZ, LadybugOpScene, ShrinkScene } from './Megallo6G1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const dom = (n: number, say: string) => sm(<Domino left={n} single />, say);
const bug = (n: number, say: string) => sm(<DotBug n={n} className="w-20 h-20" />, say);
const eq = (s: string) => <SignRow items={s.split(' ')} />;
const GREEN = '#84cc16';

export const MEGALLO_6_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás, egyszerű műveletek képről
  { id: 'm6-1', level: 1, badge: 'Számlálás', ask: 'Hány katica van itt?', scene: <RowScene icon="katica" n={6} />, options: [6, 5, 4], hint: 'Mutass rá mindegyikre, egyenként!' },
  { id: 'm6-2', level: 1, badge: 'Számjegy', ask: 'Melyik a hatos?', options: [sm(<BigSign text="6" />, 'hatos'), sm(<BigSign text="5" />, 'ötös'), sm(<BigSign text="3" />, 'hármas')], hint: 'A hatos fent kanyarral indul, alul kerek pocakja van.' },
  { id: 'm6-3', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <Fingers n={6} className="w-56 h-32 mx-auto" />, options: [6, 5, 4], hint: 'Számold meg mindkét kezet!' },
  { id: 'm6-4', level: 1, badge: 'Dominó', ask: 'Melyik dominó illik a 6-hoz?', scene: <BigSign text="6" className="w-24 h-24 mx-auto" />, options: [dom(6, 'hat pötty'), dom(4, 'négy pötty')], hint: 'Számold meg a pöttyöket! Hat legyen.' },
  { id: 'm6-5', level: 1, badge: 'Összeadás', ask: '5 + 1 = ?', say: 'Öt piros alma meg egy zöld. Mennyi öt meg egy?', scene: <RowScene icon="alma" n={5} n2={1} color2={GREEN} />, options: [6, 5, 4], hint: 'Ötöt látsz pirosat. Számolj tovább a zölddel!' },
  { id: 'm6-6', level: 1, badge: 'Kivonás', ask: '6 − 1 = ?', say: 'Hat eper volt, egyet megettek. Mennyi hat elvéve egy?', scene: <RowScene icon="eper" n={6} crossed={1} />, options: [5, 6, 4], hint: 'Az áthúzottat ne számold!' },
  { id: 'm6-7', level: 1, badge: 'Páros', ask: 'Jutott mindenkinek pár?', say: 'Hat katica táncol. Jutott mindenkinek pár?', scene: <PairUpScene icon="katica" n={6} />, options: ['igen', 'nem'], hint: 'Nézd meg: mindenki fogja valakinek a kezét?' },
  { id: 'm6-8', level: 1, badge: 'Páratlan', ask: 'Páros vagy páratlan?', say: 'Három méh jött a bálba. Páros vagy páratlan?', scene: <PairUpScene icon="meh" n={3} />, options: [PARATLAN, PAROS], hint: 'Nézd meg a szélén álló méhet! Van párja?' },
  { id: 'm6-9', level: 1, badge: 'Összeadás', ask: '3 + 2 = ?', say: 'Három piros meg két kék korong. Mennyi három meg kettő?', scene: <Disks a={3} b={2} className="w-40 h-32 mx-auto" />, options: [5, 6, 4], hint: 'Számold meg a pirosakat, és számolj tovább a kékekkel!' },
  { id: 'm6-10', level: 1, badge: 'Számlálás', ask: 'Hány pötty van Pötyi hátán?', scene: <PotyiDotsScene dots={4} />, options: [4, 5, 6], hint: 'Mutass rá minden pöttyre!' },
  { id: 'm6-11', level: 1, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Hat labda, és négy labda. Melyik jel kell középre?', scene: <Compare6 icon="labda" a={6} b={4} />, options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye arra mutasson!' },
  { id: 'm6-12', level: 1, badge: 'Kivonás', ask: 'Hány gomba maradt?', say: 'Négy gomba volt. Csigusz mind a négyet megette. Hány gomba maradt?', scene: <RowScene icon="gomba" n={4} crossed={4} />, options: [0, 4, 1], hint: 'Mind át van húzva. Maradt egy is?' },
  // 2. szint – számok kép nélkül, számegyenes, nyíl, sorozat, igaz-hamis
  { id: 'm6-13', level: 2, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={6} question={5} />, options: [5, 4, 6], hint: 'A négy és a hat között melyik szám van?' },
  { id: 'm6-14', level: 2, badge: 'Kivonás', ask: '6 − 4 = ?', say: 'Mennyi hat elvéve négy?', scene: eq('6 − 4 = ?'), options: [2, 3, 1], hint: 'Mutass hat ujjat, és hajts le négyet!' },
  { id: 'm6-15', level: 2, badge: 'Összeadás', ask: '2 + 4 = ?', say: 'Mennyi kettő meg négy?', scene: eq('2 + 4 = ?'), options: [6, 5, 4], hint: 'Kezdd a nagyobbal: négy, és még kettő.' },
  { id: 'm6-16', level: 2, badge: 'Összeadás', ask: '? = 1 + 3', say: 'Mennyivel egyenlő egy meg három?', scene: eq('? = 1 + 3'), options: [4, 3, 5], hint: 'Itt az eredmény elöl áll. Három, és még egy.' },
  { id: 'm6-17', level: 2, badge: 'Nyilak', ask: 'Mi kerül a ? helyére?', say: 'A négyesből hárommal visszalépünk. Mi kerül a kérdőjel helyére?', scene: <ChainScene start={4} ops={['−3']} values={['?']} />, options: [1, 2, 0], hint: 'Négyről lépj vissza hármat: három, kettő, egy.' },
  { id: 'm6-18', level: 2, badge: 'Páros szám', ask: 'Melyik szám páros?', options: [2, 1, 5], hint: 'Rakd ki korongokkal, és állítsd párba! Melyiknél nem marad egy sem egyedül?' },
  { id: 'm6-19', level: 2, badge: 'A nulla', ask: 'A 0 páros vagy páratlan?', say: 'A nulla páros vagy páratlan szám?', options: [PAROS, PARATLAN], hint: 'Gondolj a színes számegyenesre: a páros számok pirosak. Minden második szám páros: hat, négy, kettő, és…' },
  { id: 'm6-20', level: 2, badge: 'Katicapöttyök', ask: 'Melyik katica illik ide?', say: 'Hat elvéve öt. Melyik katica hátán van annyi pötty, amennyi az eredmény?', scene: <LadybugOpScene op="6 − 5" />, options: [bug(1, 'egy pötty'), bug(2, 'két pötty'), bug(3, 'három pötty')], hint: 'Mutass hat ujjat, és hajts le ötöt!' },
  { id: 'm6-21', level: 2, badge: 'Sorozat', ask: 'Hány alma lesz a következőben?', say: 'Nézd meg, hogyan változik az almák száma a dobozokban! Hány alma lesz a következőben?', scene: <ShrinkScene icon="alma" counts={[6, 5, 4]} />, options: [3, 2, 4], hint: 'Hat, öt, négy… Mennyivel lesz kevesebb minden dobozban?' },
  { id: 'm6-22', level: 2, badge: 'Igaz vagy hamis', ask: 'Hat alma van a dobozban?', say: 'Csigusz azt mondja: hat alma van a dobozban. Igaz vagy hamis?', scene: <Box6 icon="alma" n={6} className="w-44 h-36 mx-auto" />, options: [IGAZ, HAMIS], hint: 'Számold meg az almákat egyenként!' },
  { id: 'm6-23', level: 2, badge: 'Művelet a képhez', ask: 'Melyik illik a képhez?', say: 'Négy rózsaszín virág és két lila virág. Melyik művelet illik a képhez?', scene: <RowScene icon="virag" n={4} n2={2} color2="#a855f7" />, options: ['4 + 2', '4 + 1', '6 − 2'], hint: 'Hány rózsaszín virág van? És hány lila? Ezeket adjuk össze.' },
  { id: 'm6-24', level: 2, badge: 'Rejtett rész', ask: 'Hány alma bújik a levél alatt?', say: 'Hat alma van. Hármat látsz, a többi a levél alatt bújik. Hány alma van a levél alatt?', scene: <RowScene icon="alma" n={3} hidden tag="6" />, options: [3, 2, 4], hint: 'Három látszik. Számolj tovább hatig!' },
  // 3. szint – két lépés, összehasonlítás műveletekkel, páros eredmény, történetek
  { id: 'm6-25', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Hat elvéve kettő, és egy meg kettő. Melyik jel kell középre?', scene: <ExprCompare left="6 − 2" right="1 + 2" />, options: ['>', '<', '='], hint: 'Számold ki mindkét oldalt! Melyik lett több?' },
  { id: 'm6-26', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Három meg három, és hat elvéve nulla. Melyik jel kell középre?', scene: <ExprCompare left="3 + 3" right="6 − 0" />, options: ['=', '<', '>'], hint: 'Számold ki mindkét oldalt! Ugyanannyi lett?' },
  { id: 'm6-27', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Öt elvéve négy, és nulla meg kettő. Melyik jel kell középre?', scene: <ExprCompare left="5 − 4" right="0 + 2" />, options: ['<', '>', '='], hint: 'Bal oldalon egy lesz, jobb oldalon kettő. A hegye a kevesebb felé mutat.' },
  { id: 'm6-28', level: 3, badge: 'Nyilak', ask: 'Mi lesz a végén?', say: 'A kettesből előbb néggyel előre, aztán hárommal vissza. Mi kerül a kérdőjel helyére?', scene: <ChainScene start={2} ops={['+4', '−3']} values={['', '?']} />, options: [3, 2, 4], hint: 'Előbb: kettő meg négy. Ami kijön, abból vegyél el hármat!' },
  { id: 'm6-29', level: 3, badge: 'Három szám', ask: '2 + 2 + 2 = ?', say: 'Két alma, két eper és két gomba. Mennyi kettő meg kettő meg kettő?', scene: <MixRowScene groups={[{ icon: 'alma', n: 2 }, { icon: 'eper', n: 2 }, { icon: 'gomba', n: 2 }]} />, options: [6, 4, 5], hint: 'Kettő meg kettő az négy. Adj hozzá még kettőt!' },
  { id: 'm6-30', level: 3, badge: 'Kakukktojás', ask: 'Melyik NEM hat?', say: 'Három művelet eredménye hat. Melyiké nem?', options: ['3 + 2', '6 − 0', '4 + 2', '1 + 5'], hint: 'Számold ki mindegyiket az ujjaidon!' },
  { id: 'm6-31', level: 3, badge: 'Páros eredmény', ask: '2 + 3: páros vagy páratlan?', say: 'Számold ki: kettő meg három. Az eredmény páros vagy páratlan?', scene: eq('2 + 3 = ?'), options: [PARATLAN, PAROS], hint: 'Előbb számold ki! Aztán állítsd párba a korongokat.' },
  { id: 'm6-32', level: 3, badge: 'Páros eredmény', ask: 'Melyiknek páratlan az eredménye?', say: 'Számold ki mindet! Melyiknek páratlan az eredménye?', options: ['6 − 3', '2 + 2', '6 − 6'], hint: 'Számold ki mindegyiket! A nulla és a négy páros.' },
  { id: 'm6-33', level: 3, badge: 'Igaz vagy hamis', ask: 'Igaz vagy hamis?', say: 'Pötyi ezt írta: hat nagyobb, mint öt. Igaz vagy hamis?', scene: eq('6 > 5'), options: [IGAZ, HAMIS], hint: 'A számegyenesen a hat az öt után jön. Melyik a nagyobb?' },
  { id: 'm6-34', level: 3, badge: 'Igaz vagy hamis', ask: 'Igaz vagy hamis?', say: 'Zümi ezt írta: négy nagyobb, mint hat. Igaz vagy hamis?', scene: eq('4 > 6'), options: [HAMIS, IGAZ], hint: 'Négy alma és hat alma: melyikből van több?' },
  { id: 'm6-35', level: 3, badge: 'Szöveges feladat', ask: 'Hány virágra nem szállt még?', say: 'Hat virág nyílik. Zümi négyre már rászállt. Hány virágra nem szállt még?', scene: <RowScene icon="virag" n={6} />, options: [2, 4, 3], hint: 'Hat virág van, négyen már járt. Hat elvéve négy.' },
  { id: 'm6-36', level: 3, badge: 'Szöveges feladat', ask: 'Páros vagy páratlan?', say: 'Csigusz reggel három levelet evett, este még hármat. Páros vagy páratlan lett a levelek száma?', scene: <RowScene icon="level" n={3} n2={3} color2="#f59e0b" />, options: [PAROS, PARATLAN], hint: 'Számold meg az összes levelet! Aztán párosíts.' },
];

export const MEGALLO_6_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon arra, ami illik hozzá!',
    pairs: [
      { a: 6, b: sm(<Mini6 icon="alma" n={6} />, 'hat alma') },
      { a: 4, b: sm(<Domino left={4} single className="w-14 h-14" />, 'négy pötty') },
      { a: 2, b: sm(<Fingers n={2} className="w-16 h-16" />, 'két ujj') },
      { a: 0, b: sm(<Mini6 icon="alma" n={0} />, 'üres doboz') },
    ],
  },
  2: {
    say: 'Számold ki! Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '6 − 1', b: 5 },
      { a: '2 + 1', b: 3 },
      { a: '4 + 2', b: 6 },
      { a: '6 − 5', b: 1 },
    ],
  },
  3: {
    say: 'Katicapöttyök! Számold ki, és keresd meg a katicát, amelyiknek annyi pöttye van!',
    pairs: [
      { a: '6 − 2', b: sm(<DotBug n={4} />, 'négy pötty') },
      { a: '3 + 3', b: sm(<DotBug n={6} />, 'hat pötty') },
      { a: '5 − 4', b: sm(<DotBug n={1} />, 'egy pötty') },
      { a: '2 + 0', b: sm(<DotBug n={2} />, 'két pötty') },
      { a: '1 + 4', b: sm(<DotBug n={5} />, 'öt pötty') },
    ],
  },
};

const PP_BINS = [
  { label: 'páros', figure: <ParityIcon even className="w-16 h-10" />, say: 'páros' },
  { label: 'páratlan', figure: <ParityIcon even={false} className="w-16 h-10" />, say: 'páratlan' },
];

export const MEGALLO_6_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Számold meg! Páros vagy páratlan? Tedd a jó kosárba!',
    bins: PP_BINS,
    items: [
      { item: sm(<Mini6 icon="alma" n={2} />, 'két alma'), bin: 0 },
      { item: sm(<Mini6 icon="hal" n={5} />, 'öt hal'), bin: 1 },
      { item: sm(<Mini6 icon="gomba" n={6} />, 'hat gomba'), bin: 0 },
      { item: sm(<Mini6 icon="virag" n={3} />, 'három virág'), bin: 1 },
      { item: sm(<Mini6 icon="eper" n={4} />, 'négy eper'), bin: 0 },
      { item: sm(<Mini6 icon="labda" n={1} />, 'egy labda'), bin: 1 },
    ],
  },
  2: {
    say: 'Számold ki! Öt lesz vagy hat?',
    bins: [
      { label: '5', say: 'öt' },
      { label: '6', say: 'hat' },
    ],
    items: [
      { item: '5 + 1', bin: 1 },
      { item: '3 + 2', bin: 0 },
      { item: '6 − 0', bin: 1 },
      { item: '6 − 1', bin: 0 },
      { item: '2 + 4', bin: 1 },
      { item: '4 + 1', bin: 0 },
      { item: '3 + 3', bin: 1 },
      { item: '5 − 0', bin: 0 },
    ],
  },
  3: {
    say: 'Számold ki! Páros vagy páratlan lett az eredmény?',
    bins: PP_BINS,
    items: [
      { item: '2 + 4', bin: 0 },
      { item: '6 − 1', bin: 1 },
      { item: '3 + 0', bin: 1 },
      { item: '6 − 6', bin: 0 },
      { item: '1 + 3', bin: 0 },
      { item: '5 − 2', bin: 1 },
      { item: '4 − 2', bin: 0 },
      { item: '2 + 3', bin: 1 },
    ],
  },
};

export const Megallo6G1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="4. Megálló"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-megallo-6"
    chapterId="szamkorbovites-10-ig"
    questions={MEGALLO_6_G1_QUESTIONS}
    pairs={MEGALLO_6_G1_PAIRS}
    sort={MEGALLO_6_G1_SORT}
    {...props}
  />
);

export default Megallo6G1Jatek;
