import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine } from '../../shared/G1Pics';
import { ExprScene, HousesScene, PotyiScene } from '../a-het/AHetG1Scenes';
import { NeighbourPlayground } from './SzamszomszedokG1Parts';

const STREET = [0, 1, 2, 3, 4, 5, 6, 7].map((v) => ({
  label: v as number | '?',
  who: v === 2 ? ('meh' as const) : v === 3 ? ('potyi' as const) : v === 4 ? ('csiga' as const) : undefined,
}));

const PAGES: MesePage[] = [
  {
    scene: <HousesScene houses={STREET} />,
    text: 'A Számutca',
    say: 'A Számkertben van egy kis utca, a Számutca. A házakon sorban számok vannak: nulla, egy, kettő, és így tovább, egészen hétig. Itt laknak Pötyiék.',
    mood: 'cheer',
  },
  {
    scene: <HousesScene houses={STREET.map((h) => (h.who === 'potyi' ? { ...h, label: '?' as const, hi: true } : h))} />,
    text: 'Hol lakik Pötyi?',
    say: 'Pötyi házáról leesett a szám. Nézd meg, melyik szám jön a kettes után!',
    task: { ask: 'Hányas házban lakik Pötyi?', options: [3, 2, 4], hint: 'Számolj sorban a nullás háztól: nulla, egy, kettő, és utána?' },
  },
  {
    scene: <HousesScene houses={[{ label: 2, who: 'meh' }, { label: 3, who: 'potyi', hi: true }, { label: 4, who: 'csiga' }]} />,
    text: 'Pötyi szomszédai',
    say: 'Pötyi mellett egyik oldalon Zümi lakik, a másikon Csigusz. Ők Pötyi szomszédai. A hármas előtt a kettes lakik, utána a négyes. A kettő és a négy a három számszomszédai.',
    dots: 3,
  },
  {
    scene: <NumberLine max={7} mark={[2, 3, 4]} />,
    text: 'Előtte 2, utána 4.',
    say: 'A számegyenesen is így van. A hármas előtt a kettő áll, ez a kisebb szomszéd. A hármas után a négy jön, ez a nagyobb szomszéd.',
  },
  {
    scene: <NumberLine max={7} mark={[5]} question={6} />,
    text: 'Ki jön utána?',
    say: 'Nézd a piros pöttyöt az ötösnél! Melyik szám jön utána?',
    task: { ask: 'Mi jön az 5 után?', options: [6, 4, 7], hint: 'Utána azt jelenti: eggyel tovább jobbra. Ne ugorj át semmit!' },
  },
  {
    scene: <NumberLine max={7} mark={[6]} question={5} />,
    text: 'Ki van előtte?',
    say: 'Most a hatosnál van a pötty. Melyik szám van előtte?',
    task: { ask: 'Mi van a 6 előtt?', options: [5, 7, 4], hint: 'Előtte azt jelenti: eggyel visszább, balra.' },
  },
  {
    scene: <ExprScene text="2 < 3 < 4" />,
    text: 'Kisebb és nagyobb szomszéd',
    say: 'A kisebb szomszéd eggyel kevesebb, a nagyobb szomszéd eggyel több. Kettő kisebb, mint három, és három kisebb, mint négy.',
    dots: 3,
  },
  {
    scene: <NumberLine max={7} mark={[4]} question={3} jumps={[{ from: 4, to: 3 }]} />,
    text: 'Csigusz egyet lép hátra.',
    say: 'Csigusz a négyesen áll. Egyet lép hátra, visszafelé. Hová ér?',
    task: { ask: 'Hová ér Csigusz?', options: [3, 5, 2], hint: 'Hátra azt jelenti: a kisebb szomszédhoz. Csak egyet lépj!' },
  },
  {
    scene: <HousesScene houses={[{ label: '?' }, { label: 1, hi: true }, { label: '?' }]} />,
    text: 'Kik az 1 szomszédai?',
    say: 'Az egyes háznak is van két szomszédja. Kik azok?',
    task: { ask: 'Kik az 1 szomszédai?', options: ['0 és 2', '1 és 3', '2 és 3'], hint: 'Egy szám előtte, egy utána. Előtte a legkisebb szám áll.' },
  },
  {
    scene: <HousesScene houses={[{ label: 0, hi: true }, { label: 1 }, { label: 6 }, { label: 7, hi: true }]} />,
    text: 'Az utca eleje és vége',
    say: 'A nullás ház az utca eleje: előtte nincs semmi. A hetes ház előtt a hatos lakik. A hetes után is lesz még ház, de azt majd később ismerjük meg!',
    mood: 'think',
  },
  {
    scene: <NumberLine max={7} mark={[2, 4]} />,
    text: 'A 3 páratlan. És a szomszédai?',
    say: 'A három páratlan szám. A piros pöttyök a szomszédainál vannak: a kettőnél és a négynél.',
    task: { ask: 'A 3 szomszédai milyenek?', say: 'A hármas szomszédai a kettő és a négy. Ezek párosak, vagy páratlanok?', options: ['párosak', 'páratlanok'], hint: 'A kettő és a négy párba állítható. Akkor milyen szám?', praise: 'Ügyes! Páratlan szám mellett mindig páros lakik, páros mellett pedig páratlan.' },
  },
  {
    scene: <PotyiScene dots={7} mood="cheer" friends />,
    text: 'Megismerted a számszomszédokat!',
    say: 'Hurrá! Minden számnak van egy kisebb szomszédja, előtte, és egy nagyobb, utána. Most gyere, játsszunk a Számutcában!',
    mood: 'cheer',
  },
];

export const SzamszomszedokG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="7. Számszomszédok"
    storyTitle="Pötyi és a Számutca"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<NeighbourPlayground />}
    playgroundTitle="Játszótér: szomszédkereső"
    parentNote="A gyerek megtanulja, hogy minden számnak van egy kisebb (előtte álló) és egy nagyobb (utána álló) számszomszédja, és ezt a számegyenesen, házsoron és jelekkel (2 < 3 < 4) is látja 0-tól 7-ig. Megfigyeli, hogy a páros számok szomszédai páratlanok. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default SzamszomszedokG1Mese;
