import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { IconGroup, NumberLine } from '../../shared/G1Pics';
import { ExprScene, HousesScene, OpScene, SeqStrip } from '../a-het/AHetG1Scenes';

const after = (n: number, say: string) => ({ figure: <HousesScene houses={[{ label: n, hi: true }, { label: '?' }]} />, say });

export const SZAMSZOMSZEDOK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – előtte, utána
  { id: 'n1', level: 1, badge: 'Utána', ask: 'Mi jön a 3 után?', say: 'Melyik szám jön a hármas után a számegyenesen?', scene: <NumberLine max={7} mark={[3]} question={4} />, options: [4, 2, 5], hint: 'Utána azt jelenti: eggyel tovább jobbra.' },
  { id: 'n2', level: 1, badge: 'Előtte', ask: 'Mi van a 2 előtt?', say: 'Melyik szám van a kettes előtt a számegyenesen?', scene: <NumberLine max={7} mark={[2]} question={1} />, options: [1, 3, 0], hint: 'Előtte azt jelenti: eggyel visszább, balra.' },
  { id: 'n3', level: 1, badge: 'Házsor', ask: 'Ki lakik középen?', say: 'Kettő, valami, négy. Melyik szám lakik középen?', scene: <HousesScene houses={[{ label: 2 }, { label: '?', who: 'potyi' }, { label: 4 }]} />, options: [3, 5, 1], hint: 'Számolj sorban: kettő, és utána?' },
  { id: 'n4', level: 1, badge: 'Házsor', ask: 'Melyik szám hiányzik?', say: 'Valami, öt, hat. Melyik szám hiányzik az első házról?', scene: <HousesScene houses={[{ label: '?' }, { label: 5 }, { label: 6 }]} />, options: [4, 7, 3], hint: 'Az ötös előtt melyik szám áll?' },
  { id: 'n5', level: 1, badge: 'Házsor', ask: 'Melyik szám hiányzik?', say: 'Négy, öt, valami. Melyik szám hiányzik az utolsó házról?', scene: <HousesScene houses={[{ label: 4 }, { label: 5 }, { label: '?' }]} />, options: [6, 3, 7], hint: 'Az ötös után melyik szám jön?' },
  { id: 'n6', level: 1, badge: 'Utána', ask: 'Mi jön a 0 után?', say: 'Melyik szám jön a nulla után?', scene: <NumberLine max={7} mark={[0]} question={1} />, options: [1, 2, 7], hint: 'A nulla után az első lépés.' },
  { id: 'n7', level: 1, badge: 'Eggyel több', ask: 'Ha jön még egy, hány lesz?', say: 'Öt alma van. Ha jön még egy, hány alma lesz?', scene: <IconGroup icon="alma" n={5} className="w-60 h-auto mx-auto" />, options: [6, 4, 5], hint: 'Eggyel több: a nagyobb szomszéd. Mi jön az öt után?' },
  { id: 'n8', level: 1, badge: 'Eggyel kevesebb', ask: 'Ha egy elúszik, hány marad?', say: 'Hat hal úszik. Egy elúszik. Hány marad?', scene: <OpScene icon="hal" a={6} b={1} op="−" />, options: [5, 7, 6], hint: 'Eggyel kevesebb: a kisebb szomszéd. Mi van a hat előtt?' },
  // 2. szint – kisebb és nagyobb szomszéd
  { id: 'n9', level: 2, badge: 'Kisebb szomszéd', ask: 'Melyik a 4 kisebb szomszédja?', say: 'Melyik a négy kisebb szomszédja? Az, amelyik előtte áll.', scene: <NumberLine max={7} mark={[4]} />, options: [3, 5, 2], hint: 'A kisebb szomszéd eggyel kevesebb, balra van.' },
  { id: 'n10', level: 2, badge: 'Nagyobb szomszéd', ask: 'Melyik a 6 nagyobb szomszédja?', say: 'Melyik a hat nagyobb szomszédja? Az, amelyik utána jön.', scene: <NumberLine max={7} mark={[6]} />, options: [7, 5, 4], hint: 'A nagyobb szomszéd eggyel több, jobbra van.' },
  { id: 'n11', level: 2, badge: 'Két szomszéd', ask: 'Kik az 5 szomszédai?', say: 'Kik laknak az ötös ház két oldalán?', scene: <HousesScene houses={[{ label: '?' }, { label: 5, hi: true }, { label: '?' }]} />, options: ['4 és 6', '3 és 5', '5 és 7'], hint: 'Egy szám előtte, egy utána. Magát az ötöt ne válaszd!' },
  { id: 'n12', level: 2, badge: 'Két szomszéd', ask: 'Kik a 3 szomszédai?', say: 'Kik a hármas szomszédai a számegyenesen?', scene: <NumberLine max={7} mark={[3]} hideLabels={[2, 4]} />, options: ['2 és 4', '1 és 3', '3 és 5'], hint: 'Közvetlenül a hármas előtt és után nézd!' },
  { id: 'n13', level: 2, badge: 'Szomszéd és jel', ask: 'Melyik szám kell a kérdőjel helyére?', say: 'Kettő kisebb, mint valami, és az kisebb, mint négy. Melyik szám az?', scene: <ExprScene text="2 < ? < 4" />, options: [3, 1, 5], hint: 'A kettő és a négy között egyetlen szám van.' },
  { id: 'n14', level: 2, badge: 'Között', ask: 'Melyik szám van a 4 és a 6 között?', scene: <SeqStrip items={[4, '?', 6]} />, options: [5, 3, 7], hint: 'Számolj a négytől: négy, és utána?' },
  { id: 'n15', level: 2, badge: 'Számegyenes', ask: 'Melyik szám hiányzik?', say: 'Melyik szám van a kérdőjel helyén a számegyenesen?', scene: <NumberLine max={7} question={5} />, options: [5, 4, 6], hint: 'Nézd a szomszédait: négy és hat. Mi van köztük?' },
  { id: 'n16', level: 2, badge: 'Visszafelé', ask: 'Melyik szám hiányzik?', say: 'Hat, öt, valami, három. Visszafelé számolunk. Melyik szám hiányzik?', scene: <SeqStrip items={[6, 5, '?', 3]} />, options: [4, 2, 7], hint: 'Visszafelé mindig a kisebb szomszéd jön. Mi van az öt előtt?' },
  // 3. szint – lépések, páros-páratlan, történetek
  { id: 'n17', level: 3, badge: 'Kisebb szomszéd', ask: 'Ki lakik a 7 előtt?', say: 'A hetes ház előtt ki lakik? Melyik szám?', scene: <HousesScene houses={[{ label: '?' }, { label: 7, hi: true }]} />, options: [6, 5, 4], hint: 'A hét kisebb szomszédja eggyel kevesebb.' },
  { id: 'n18', level: 3, badge: 'Lépés előre', ask: 'Hová ér Csigusz?', say: 'Csigusz a kettesen áll. Egyet lép előre. Hová ér?', scene: <NumberLine max={7} mark={[2]} question={3} jumps={[{ from: 2, to: 3 }]} />, options: [3, 1, 4], hint: 'Előre egy lépés: a nagyobb szomszéd.' },
  { id: 'n19', level: 3, badge: 'Lépés hátra', ask: 'Hová ér Zümi?', say: 'Zümi a hatoson ül. Egyet repül vissza. Hová ér?', scene: <NumberLine max={7} mark={[6]} question={5} jumps={[{ from: 6, to: 5 }]} />, options: [5, 7, 4], hint: 'Vissza egy lépés: a kisebb szomszéd.' },
  { id: 'n20', level: 3, badge: 'Páros, páratlan', ask: 'A 4 szomszédai milyenek?', say: 'A négy szomszédai a három és az öt. Ezek párosak, vagy páratlanok?', scene: <NumberLine max={7} mark={[3, 5]} />, options: ['páratlanok', 'párosak'], hint: 'A három és az öt nem állítható párba. Mindig marad egy.' },
  { id: 'n21', level: 3, badge: 'Két szomszéd', ask: 'Kinek a szomszédai: 3 és 5?', say: 'A három és az öt kinek a szomszédai? Ki lakik köztük?', scene: <HousesScene houses={[{ label: 3 }, { label: '?', hi: true }, { label: 5 }]} />, options: [4, 2, 6], hint: 'Aki a három és az öt között lakik.' },
  { id: 'n22', level: 3, badge: 'Szomszédok', ask: 'Melyik pár NEM szomszéd?', say: 'Melyik két szám nem szomszédja egymásnak?', options: ['2 és 4', '2 és 3', '6 és 7'], hint: 'A szomszédok közvetlenül egymás mellett állnak, nincs köztük más szám.' },
  { id: 'n23', level: 3, badge: 'Szomszéd és jel', ask: 'Melyik szám kell a kérdőjel helyére?', say: 'Valami kisebb, mint hat, és hat kisebb, mint hét. Melyik szám a hat kisebb szomszédja?', scene: <ExprScene text="? < 6 < 7" />, options: [5, 4, 7], hint: 'A hat előtt közvetlenül melyik szám áll?' },
  { id: 'n24', level: 3, badge: 'Történet', ask: 'Hányas házban lakik Zümi?', say: 'Pötyi a hármas házban lakik. Zümi a nagyobb szomszédjában. Hányas házban lakik Zümi?', scene: <HousesScene houses={[{ label: 3, who: 'potyi' }, { label: '?', who: 'meh' }]} />, options: [4, 2, 5], hint: 'A nagyobb szomszéd a hármas után jön.' },
];

export const SZAMSZOMSZEDOK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Ki lakik utána? Koppints a házsorra, aztán a számra, ami a kérdőjel helyére kell!',
    pairs: [
      { a: after(2, 'kettő, és utána?'), b: 3 },
      { a: after(4, 'négy, és utána?'), b: 5 },
      { a: after(0, 'nulla, és utána?'), b: 1 },
      { a: after(6, 'hat, és utána?'), b: 7 },
    ],
  },
  2: {
    say: 'Párosítsd a számot a két szomszédjával!',
    pairs: [
      { a: 2, b: '1 és 3' },
      { a: 4, b: '3 és 5' },
      { a: 6, b: '5 és 7' },
      { a: 1, b: '0 és 2' },
    ],
  },
  3: {
    say: 'Melyik szám van a kettő között? Párosítsd!',
    pairs: [
      { a: { label: '3 < ? < 5', say: 'három és öt között' }, b: 4 },
      { a: { label: '0 < ? < 2', say: 'nulla és kettő között' }, b: 1 },
      { a: { label: '5 < ? < 7', say: 'öt és hét között' }, b: 6 },
      { a: { label: '1 < ? < 3', say: 'egy és három között' }, b: 2 },
    ],
  },
};

export const SZAMSZOMSZEDOK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Szomszédja a hármasnak, vagy nem? Tedd a jó kosárba!',
    bins: [
      { label: 'A 3 szomszédja', say: 'a három szomszédja' },
      { label: 'Nem szomszéd', say: 'nem szomszéd' },
    ],
    items: [
      { item: 2, bin: 0 },
      { item: 0, bin: 1 },
      { item: 4, bin: 0 },
      { item: 6, bin: 1 },
      { item: 7, bin: 1 },
      { item: 1, bin: 1 },
      { item: 5, bin: 1 },
    ],
  },
  2: {
    say: 'A négy előtt, vagy a négy után áll a szám? Tedd a jó kosárba!',
    bins: [
      { label: 'A 4 előtt', say: 'a négy előtt, kisebb, mint négy' },
      { label: 'A 4 után', say: 'a négy után, nagyobb, mint négy' },
    ],
    items: [
      { item: 3, bin: 0 },
      { item: 6, bin: 1 },
      { item: 0, bin: 0 },
      { item: 5, bin: 1 },
      { item: 1, bin: 0 },
      { item: 7, bin: 1 },
      { item: 2, bin: 0 },
    ],
  },
  3: {
    say: 'Szomszédok, vagy nem szomszédok? Tedd a számpárt a jó kosárba!',
    bins: [
      { label: 'Szomszédok', say: 'szomszédok' },
      { label: 'Nem szomszédok', say: 'nem szomszédok' },
    ],
    items: [
      { item: '3 és 4', bin: 0 },
      { item: '2 és 4', bin: 1 },
      { item: '5 és 6', bin: 0 },
      { item: '1 és 5', bin: 1 },
      { item: '0 és 1', bin: 0 },
      { item: '3 és 5', bin: 1 },
      { item: '6 és 7', bin: 0 },
      { item: '4 és 7', bin: 1 },
    ],
  },
};

export const SzamszomszedokG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="7. Számszomszédok"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-szamszomszedok"
    chapterId="szamkorbovites-10-ig"
    questions={SZAMSZOMSZEDOK_G1_QUESTIONS}
    pairs={SZAMSZOMSZEDOK_G1_PAIRS}
    sort={SZAMSZOMSZEDOK_G1_SORT}
    {...props}
  />
);

export default SzamszomszedokG1Jatek;
