import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Domino } from '../../shared/G1Pics';
import { Box6, Mini6, RowScene, SignRow } from '../a-hat/AHatG1Scenes';
import { PairDots, PairUpScene, PARATLAN, PAROS, ParityIcon, ParityLine, SocksScene, sock } from './ParosEsParatlanSzamokG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const eq = (s: string) => <SignRow items={s.split(' ')} />;
const Sock: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 60 60" className="w-14 h-14">
    {sock(32, 30, color, 1.2)}
  </svg>
);
const pd = (n: number, say: string) => sm(<PairDots n={n} />, say);

export const PAROS_ES_PARATLAN_SZAMOK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – párba állítás képen
  { id: 'pp1', level: 1, badge: 'Párba állítás', ask: 'Jutott mindenkinek pár?', say: 'Négy katica táncol. Jutott mindenkinek pár?', scene: <PairUpScene icon="katica" n={4} />, options: ['igen', 'nem'], hint: 'Nézd meg: mindenki fogja valakinek a kezét?' },
  { id: 'pp2', level: 1, badge: 'Párba állítás', ask: 'Jutott mindenkinek pár?', say: 'Három katica jött a bálba. Jutott mindenkinek pár?', scene: <PairUpScene icon="katica" n={3} />, options: ['nem', 'igen'], hint: 'Nézd meg a szélén állót! Fogja valaki a kezét?' },
  { id: 'pp3', level: 1, badge: 'Számlálás', ask: 'Hány zokni lóg a kötélen?', scene: <SocksScene n={4} />, options: [4, 2, 5], hint: 'Ne a párokat számold, hanem minden zoknit egyenként!' },
  { id: 'pp4', level: 1, badge: 'Páros', ask: 'Páros vagy páratlan?', say: 'Két méh táncol párban. Páros vagy páratlan?', scene: <PairUpScene icon="meh" n={2} />, options: [PAROS, PARATLAN], hint: 'Ha mindenkinek van párja, az páros. Van, aki egyedül maradt?' },
  { id: 'pp5', level: 1, badge: 'Páratlan', ask: 'Páros vagy páratlan?', say: 'Öt méh jött a bálba. Páros vagy páratlan?', scene: <PairUpScene icon="meh" n={5} />, options: [PARATLAN, PAROS], hint: 'Nézd meg a szélén álló méhet! Van párja?' },
  { id: 'pp6', level: 1, badge: 'Párba állítás', ask: 'Hányan maradtak pár nélkül?', say: 'Három katica táncol. Hányan maradtak pár nélkül?', scene: <PairUpScene icon="katica" n={3} />, options: [1, 0, 2], hint: 'A zöld keretben párok vannak. Ki áll a kereten kívül?' },
  { id: 'pp7', level: 1, badge: 'Párba állítás', ask: 'Hol jutott mindenkinek pár?', options: [pd(6, 'hat korong, mind párban'), pd(5, 'öt korong'), pd(3, 'három korong')], hint: 'Keresd azt, ahol egyik korong sem áll egyedül!' },
  { id: 'pp8', level: 1, badge: 'Páratlan', ask: 'Páros vagy páratlan?', say: 'Egyetlen zokni lóg a kötélen. Páros vagy páratlan?', scene: <SocksScene n={1} />, options: [PARATLAN, PAROS], hint: 'Egy zokni van. Van párja?' },
  // 2. szint – számok, számegyenes, képek párba állítás nélkül
  { id: 'pp9', level: 2, badge: 'Páros szám', ask: 'Melyik szám páros?', options: [4, 3, 5], hint: 'Rakj ki annyi korongot, és állítsd párba! Melyiknél nem marad egy sem egyedül?' },
  { id: 'pp10', level: 2, badge: 'Páratlan szám', ask: 'Melyik szám páratlan?', options: [5, 2, 6], hint: 'Páratlannál egy egyedül marad. Próbáld ki az ujjaiddal!' },
  { id: 'pp11', level: 2, badge: 'A nulla', ask: 'A 0 páros vagy páratlan?', say: 'Nézd a számegyenest! A nulla páros vagy páratlan?', scene: <ParityLine question={0} />, options: [PAROS, PARATLAN], hint: 'Minden második szám páros: hat, négy, kettő… Melyik jön a kettő előtt kettővel?' },
  { id: 'pp12', level: 2, badge: 'Páros', ask: 'Páros vagy páratlan?', say: 'Hány alma van a dobozban? Páros vagy páratlan?', scene: <Box6 icon="alma" n={6} className="w-40 h-32 mx-auto" />, options: [PAROS, PARATLAN], hint: 'Az almák fent és lent párban állnak. Marad egy egyedül?' },
  { id: 'pp13', level: 2, badge: 'Páratlan', ask: 'Páros vagy páratlan?', say: 'Hány hal van a dobozban? Páros vagy páratlan?', scene: <Box6 icon="hal" n={3} className="w-40 h-32 mx-auto" />, options: [PARATLAN, PAROS], hint: 'Párosítsd a halakat kettesével! Marad egy egyedül?' },
  { id: 'pp14', level: 2, badge: 'Számegyenes', ask: 'Páros vagy páratlan a ? helyén?', say: 'A számegyenesen a páros számok pirosak, a páratlanok kékek. Milyen szám van a kérdőjel helyén?', scene: <ParityLine question={3} />, options: [PARATLAN, PAROS], hint: 'Nézd a szomszédait! A kettő és a négy piros. Milyen színű lesz a kettő közötti?' },
  { id: 'pp15', level: 2, badge: 'Dominó', ask: 'Melyik dominón páros a pötty?', options: [sm(<Domino left={4} single />, 'négy pötty'), sm(<Domino left={3} single />, 'három pötty'), sm(<Domino left={5} single />, 'öt pötty')], hint: 'Számold meg a pöttyöket, és párosítsd őket!' },
  { id: 'pp16', level: 2, badge: 'Páros', ask: 'Hol van páros számú virág?', options: [sm(<Box6 icon="virag" n={4} />, 'négy virág'), sm(<Box6 icon="virag" n={5} />, 'öt virág'), sm(<Box6 icon="virag" n={3} />, 'három virág')], hint: 'Számold meg a virágokat! Párba állíthatod mindet?' },
  // 3. szint – műveletek eredménye, kiegészítés
  { id: 'pp17', level: 3, badge: 'Művelet', ask: '3 + 3: páros vagy páratlan?', say: 'Számold ki: három meg három. Az eredmény páros vagy páratlan?', scene: eq('3 + 3 = ?'), options: [PAROS, PARATLAN], hint: 'Előbb számold ki! Aztán állítsd párba a korongokat.' },
  { id: 'pp18', level: 3, badge: 'Művelet', ask: '4 + 1: páros vagy páratlan?', say: 'Számold ki: négy meg egy. Az eredmény páros vagy páratlan?', scene: eq('4 + 1 = ?'), options: [PARATLAN, PAROS], hint: 'Előbb számold ki! A négy párban áll – és az egy?' },
  { id: 'pp19', level: 3, badge: 'Művelet', ask: '6 − 4: páros vagy páratlan?', say: 'Számold ki: hat elvéve négy. Az eredmény páros vagy páratlan?', scene: eq('6 − 4 = ?'), options: [PAROS, PARATLAN], hint: 'Előbb számold ki az ujjaidon! Utána nézd meg, jut-e mindenkinek pár.' },
  { id: 'pp20', level: 3, badge: 'Művelet', ask: '5 − 5: páros vagy páratlan?', say: 'Számold ki: öt elvéve öt. Az eredmény páros vagy páratlan?', scene: eq('5 − 5 = ?'), options: [PAROS, PARATLAN], hint: 'Ha mindent elveszünk, nulla marad. Nézd meg a számegyenesen, milyen színű a nulla!' },
  { id: 'pp21', level: 3, badge: 'Kakukktojás', ask: 'Melyik NEM páros?', say: 'Három szám páros. Melyik nem az?', options: [3, 2, 6, 0], hint: 'Rakd ki korongokkal, és párosíts! Hol marad egy egyedül?' },
  { id: 'pp22', level: 3, badge: 'Kiegészítés', ask: 'Hány katica kell még a tánchoz?', say: 'Öt katica jött a bálba. Hány katica kell még, hogy mindenki párban táncoljon?', scene: <PairUpScene icon="katica" n={5} />, options: [1, 2, 0], hint: 'Csak a magányos katicának kell pár.' },
  { id: 'pp23', level: 3, badge: 'Sorrend', ask: 'Melyik páros szám jön a 2 után?', say: 'Melyik a következő páros szám a kettő után?', scene: <ParityLine colored={false} />, options: [4, 3, 6], hint: 'Minden második szám páros. A kettő után ugorj kettőt!' },
  { id: 'pp24', level: 3, badge: 'Szöveges feladat', ask: 'Páros lett vagy páratlan?', say: 'Zümi három virágot hozott, Csigusz még kettőt. Páros vagy páratlan lett a virágok száma?', scene: <RowScene icon="virag" n={3} n2={2} color2="#a855f7" ringSecond />, options: [PARATLAN, PAROS], hint: 'Számold meg az összes virágot! Aztán párosíts.' },
];

export const PAROS_ES_PARATLAN_SZAMOK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Keress párt a zokniknak! Koppints bal oldalon egy zoknira, aztán jobb oldalon a párjára!',
    pairs: [
      { a: sm(<Sock color="#ef4444" />, 'piros zokni'), b: sm(<Sock color="#ef4444" />, 'piros zokni') },
      { a: sm(<Sock color="#3b82f6" />, 'kék zokni'), b: sm(<Sock color="#3b82f6" />, 'kék zokni') },
      { a: sm(<Sock color="#22c55e" />, 'zöld zokni'), b: sm(<Sock color="#22c55e" />, 'zöld zokni') },
      { a: sm(<Sock color="#facc15" />, 'sárga zokni'), b: sm(<Sock color="#facc15" />, 'sárga zokni') },
    ],
  },
  2: {
    say: 'Számold meg a korongokat! Párosítsd a képet a számmal!',
    pairs: [
      { a: pd(6, 'hat korong'), b: 6 },
      { a: pd(5, 'öt korong'), b: 5 },
      { a: pd(4, 'négy korong'), b: 4 },
      { a: pd(3, 'három korong'), b: 3 },
    ],
  },
  3: {
    say: 'Számold ki! Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '3 + 3', b: 6 },
      { a: '4 + 1', b: 5 },
      { a: '6 − 4', b: 2 },
      { a: '5 − 5', b: 0 },
    ],
  },
};

const bins = [
  { label: 'páros', figure: <ParityIcon even className="w-16 h-10" />, say: 'páros' },
  { label: 'páratlan', figure: <ParityIcon even={false} className="w-16 h-10" />, say: 'páratlan' },
];

export const PAROS_ES_PARATLAN_SZAMOK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Jutott mindenkinek pár? Ha igen, a páros kosárba tedd! Ha egy egyedül maradt, a páratlanba!',
    bins,
    items: [
      { item: pd(2, 'két korong'), bin: 0 },
      { item: pd(4, 'négy korong'), bin: 0 },
      { item: pd(6, 'hat korong'), bin: 0 },
      { item: pd(1, 'egy korong'), bin: 1 },
      { item: pd(3, 'három korong'), bin: 1 },
      { item: pd(5, 'öt korong'), bin: 1 },
    ],
  },
  2: {
    say: 'Páros vagy páratlan szám? Tedd a jó kosárba! A nullára is figyelj!',
    bins,
    items: [
      { item: 0, bin: 0 },
      { item: 1, bin: 1 },
      { item: 2, bin: 0 },
      { item: 3, bin: 1 },
      { item: 4, bin: 0 },
      { item: 5, bin: 1 },
      { item: 6, bin: 0 },
      { item: sm(<Mini6 icon="eper" n={5} />, 'öt eper'), bin: 1 },
    ],
  },
  3: {
    say: 'Számold ki! Páros vagy páratlan lett az eredmény?',
    bins,
    items: [
      { item: '3 + 3', bin: 0 },
      { item: '4 + 1', bin: 1 },
      { item: '1 + 1', bin: 0 },
      { item: '6 − 4', bin: 0 },
      { item: '5 − 5', bin: 0 },
      { item: '6 − 5', bin: 1 },
      { item: '2 + 1', bin: 1 },
      { item: '6 − 3', bin: 1 },
    ],
  },
};

export const ParosEsParatlanSzamokG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="3. Páros és páratlan számok"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-paros-es-paratlan-szamok"
    chapterId="szamkorbovites-10-ig"
    questions={PAROS_ES_PARATLAN_SZAMOK_G1_QUESTIONS}
    pairs={PAROS_ES_PARATLAN_SZAMOK_G1_PAIRS}
    sort={PAROS_ES_PARATLAN_SZAMOK_G1_SORT}
    {...props}
  />
);

export default ParosEsParatlanSzamokG1Jatek;
