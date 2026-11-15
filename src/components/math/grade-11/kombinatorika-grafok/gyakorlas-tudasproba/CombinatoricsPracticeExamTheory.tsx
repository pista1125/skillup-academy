import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  LicensePlatesSvg,
  BusTicketSvg,
  AcquaintanceGraphSvg,
  HandshakeGraphSvg,
  PhoneKeypadSvg,
  CountingModelTreeSvg
} from './CombinatoricsPracticeExamFigures';

const fmtInt = (x: number) => (Number.isFinite(x) ? Math.round(x).toLocaleString('hu-HU') : '–');

const factorial = (n: number) => {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};
const variation = (n: number, k: number) => {
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return r;
};
const binom = (n: number, k: number) => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};

/** Binomiális együttható (n alatt a k) jelölése. */
const Binom: React.FC<{ n: React.ReactNode; k: React.ReactNode }> = ({ n, k }) => (
  <span className="inline-flex items-center align-middle mx-0.5">
    <span className="text-lg leading-none">(</span>
    <span className="inline-flex flex-col items-center text-[0.8em] leading-tight px-0.5">
      <span>{n}</span>
      <span>{k}</span>
    </span>
    <span className="text-lg leading-none">)</span>
  </span>
);

/** Havel–Hakimi: létezik-e egyszerű gráf (hurok- és többszörös él nélkül) az adott fokszámokkal? */
const isGraphical = (degrees: number[]): boolean => {
  const d = [...degrees];
  for (;;) {
    d.sort((a, b) => b - a);
    while (d.length && d[d.length - 1] === 0) d.pop();
    if (d.length === 0) return true;
    const first = d.shift()!;
    if (first > d.length) return false;
    for (let i = 0; i < first; i++) {
      d[i] -= 1;
      if (d[i] < 0) return false;
    }
  }
};

const DEGREE_PRESETS: { name: string; v: string }[] = [
  { name: 'Koccintás (érettségi 2017)', v: '1; 2; 2; 3; 3; 6; 6' },
  { name: 'Focicsapat (T I/2.)', v: '0; 1; 2; 2; 2; 5; 0; 0; 4; 4; 2' },
  { name: 'Ismeretségek (érettségi 2005)', v: '3; 2; 2; 1' },
  { name: 'Asztalitenisz (9. lecke)', v: '7; 7; 6; 6; 5; 5; 5; 5' },
  { name: 'Csapda: páros összeg', v: '1; 1; 3; 3' }
];

export const CombinatoricsPracticeExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: modellválasztó kalkulátor
  const [n, setN] = useState<number>(7);
  const [k, setK] = useState<number>(3);
  const [allElements, setAllElements] = useState<boolean>(false);
  const [ordered, setOrdered] = useState<boolean>(true);
  const [repeat, setRepeat] = useState<boolean>(false);

  const effK = allElements ? n : k;
  let modelName = '';
  let formula: React.ReactNode = '';
  let value = 0;
  let example = '';
  if (allElements) {
    modelName = 'Permutáció (ismétlés nélküli)';
    formula = `${n}! = ${Array.from({ length: n }, (_, i) => n - i).join(' · ')}`;
    value = factorial(n);
    example = `${n} gyerek leül egy ${n} személyes padra.`;
  } else if (!ordered) {
    modelName = 'Kombináció (ismétlés nélküli)';
    formula = (
      <>
        <Binom n={n} k={k} /> = {variation(n, k)} : {k}!
      </>
    );
    value = k > n ? 0 : binom(n, k);
    example = `${n} fős csoportból ${k} felelő, ha ugyanazt a feladatot kapják.`;
  } else if (repeat) {
    modelName = 'Ismétléses variáció';
    formula = `${n}^${k} = ${Array.from({ length: k }, () => n).join(' · ')}`;
    value = Math.pow(n, k);
    example = `${k} hosszú kód ${n} jelből, egy jel többször is szerepelhet.`;
  } else {
    modelName = 'Variáció (ismétlés nélküli)';
    formula = `${Array.from({ length: Math.max(0, k) }, (_, i) => n - i).join(' · ')}`;
    value = k > n ? 0 : variation(n, k);
    example = `${n} fős csoportból ${k} felelő, ha mindenki más feladatot kap.`;
  }

  // Labor II: fokszámsorozat-ellenőrző
  const [degText, setDegText] = useState<string>(DEGREE_PRESETS[0].v);
  const degrees = degText
    .split(/[;\s]+/)
    .map((s) => s.trim())
    .filter((s) => s !== '')
    .map((s) => Number(s));
  const parsedOk = degrees.length > 0 && degrees.every((d) => Number.isInteger(d) && d >= 0);
  const degSum = parsedOk ? degrees.reduce((a, b) => a + b, 0) : NaN;
  const vertexCount = degrees.length;
  const maxDeg = parsedOk ? Math.max(...degrees) : NaN;
  const oddCount = parsedOk ? degrees.filter((d) => d % 2 === 1).length : NaN;
  const sumEven = parsedOk && degSum % 2 === 0;
  const maxOk = parsedOk && maxDeg <= vertexCount - 1;
  const graphical = parsedOk && sumEven && maxOk && isGraphical(degrees);

  return (
    <TheoryTemplate
      topicId="g11-kombinatorika-grafok"
      subtopicId="gyakorlas-tudasproba"
      title="10. Gyakorlás, tudáspróba"
      subtitle="A kombinatorika és gráfok fejezet összefoglalása: permutáció, variáció, kombináció, esetszétválasztás, fokszámok és teljes gráfok – rejtvény, érettségi feladatok és két tudáspróba."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="11_osztaly_kombinatorika_grafok_gyakorlas_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a kombinatorika és gráfok tudáspróbára?"
      practiceSubtitle="Mérd fel tudásodat a fejezet egészét átfogó, 3 szintre bontott kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A FEJEZET ESZKÖZTÁRA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center space-y-1">
              <div className="font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">n! · n(n − 1)…(n − k + 1) · nᵏ · (n alatt a k) = n! / (k! (n − k)!)</div>
              <div className="font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">fokszámok összege = 2 · élek száma · teljes gráf: n(n − 1) / 2 él</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Három kérdés: mind az n elemet sorba rendezzük? Számít a sorrend? Ismétlődhet egy elem?</li>
              <li>„Legalább egy” típusú kérdésnél sokszor egyszerűbb a komplementer: összes − rossz esetek.</li>
              <li>A fokszámok összege mindig páros, ezért páratlan fokú csúcsból páros sok van.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglaló */}
      <TheorySection title="1. A fejezet összefoglalása" badge="Ismétlés" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Sorba rendezés, kiválasztás (1–3. lecke)" badge="Alapesetek" badgeColor="indigo">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>n különböző elem sorba rendezése: <strong>n! = n · (n − 1) · … · 1</strong>; 0! = 1.</li>
              <li>k elem kiválasztása, ha számít a sorrend: <strong>n · (n − 1) · … · (n − k + 1)</strong>.</li>
              <li>Ha egy elem többször is választható: <strong>nᵏ</strong> (itt k &gt; n is lehet, pl. tesztkitöltés).</li>
              <li>Ha nem számít a sorrend: <strong><Binom n="n" k="k" /> = n(n − 1)…(n − k + 1) / k!</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Binomiális együtthatók (4. lecke)" badge="Tulajdonságok" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><Binom n="n" k="k" /> = n! / (k! · (n − k)!).</li>
              <li>Szimmetria: <Binom n="n" k="k" /> = <Binom n="n" k="n − k" />, pl. <Binom n={9} k={4} /> = <Binom n={9} k={5} /> = 126.</li>
              <li><Binom n="n" k={0} /> = <Binom n="n" k="n" /> = 1, <Binom n="n" k={1} /> = n.</li>
              <li>Egy n elemű halmaz összes részhalmazainak száma 2ⁿ.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Esetszétválasztás (6. lecke)" badge="Stratégia" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egymást kizáró esetekre bontunk, az esetek számát <strong>összeadjuk</strong>.</li>
              <li>Egymás utáni, független döntések számát <strong>összeszorozzuk</strong>.</li>
              <li>Komplementer: „legyen fiú” = összes − „csak lányok”.</li>
              <li>Feltételes hely (pl. első jegy nem 0) – azzal kezdjük a számolást.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Gráfok (8–9. lecke)" badge="Modellezés" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Csúcsok: a halmaz elemei; élek: a kapcsolatok; fokszám: a csúcsból kiinduló élek száma.</li>
              <li><strong>Fokszámok összege = 2 · élek száma</strong>, ezért mindig páros.</li>
              <li>n pontú teljes gráf: minden csúcs fokszáma n − 1, élszáma <Binom n="n" k={2} /> = n(n − 1) / 2.</li>
              <li>Egyszerű gráfban (hurok- és többszörös él nélkül) n csúcs esetén a fokszám legfeljebb n − 1.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mt-4">
          <CountingModelTreeSvg />
          <TheoryTable
            headers={['Helyzet', 'Modell', 'Példa']}
            rows={[
              ['mind az n elem sorba', 'n!', '8 gyerek egy padon: 8! = 40 320'],
              ['k elem, számít a sorrend', 'n(n − 1)…(n − k + 1)', '3 felelő, más feladat: 17 · 16 · 15 = 4080'],
              ['k elem, ismétlődhet', 'nᵏ', '10 kérdéses teszt 4 válasszal: 4¹⁰'],
              ['k elem, nem számít a sorrend', 'n alatt a k', '3 felelő, ugyanaz a feladat: 680']
            ]}
          />
        </div>
      </TheorySection>

      {/* 2. Rejtvény */}
      <TheorySection title="2. Rejtvény: melyik hungarikum?" badge="1. feladat" badgeColor="violet">
        <TheoryTable
          headers={['Kérdés', 'Számolás', 'Eredmény', 'Betű']}
          rows={[
            ['8 gyerek egy padon, Zsófi az egyik szélen', 'Zsófi 2 helyre, a többiek 7!-féleképpen: 2 · 5040', '10 080', 'R'],
            ['{p; a; l; i; 1; 2; 3}: 3 betű, majd 4 számjegy', '4³ · 3⁴ (ismétlődhetnek – 4 jegy csak 3 számjegyből!)', '5184', 'E'],
            ['Négyjegyű páros számok 7-es jegy nélkül', '8 · 9 · 9 · 5 (első jegy ≠ 0, 7; utolsó 0, 2, 4, 6, 8)', '3240', 'D'],
            ['3 gyümölcsnap novemberben (30 nap)', '(30 alatt a 3) = 30 · 29 · 28 / 6', '4060', 'E'],
            ['5 csúcs, 7 él: fokszámösszeg', '2 · 7', '14', 'N'],
            ['8 pontú teljes gráf élszáma', '8 · 7 / 2', '28', 'H']
          ]}
        />
        <TheoryCallout type="success" title="A megfejtés">
          A betűk R, E, D, E, N, H – átrendezve <strong>HEREND</strong>: a hungarikum a <strong>herendi porcelán</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Gyakorló feladatok */}
      <TheorySection title="3. Gyakorló feladatok kidolgozva" badge="Tankönyv 74. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="2. Rendszámok" badge="Ismétléses variáció" badgeColor="sky">
            <LicensePlatesSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>BBB-SzSzSz: 26³ · 10³ = 17 576 000.</li>
              <li><strong>a)</strong> B-Sz-B-Sz-B-Sz: 26³ · 10³ – ugyanannyi (1-szeres).</li>
              <li><strong>b)</strong> BB-BB-SzSz: 26⁴ · 10² = 45 697 600 – 2,6-szeres.</li>
              <li><strong>c)</strong> BB-SzSz-SzSz: 26² · 10⁴ = 6 760 000 – ≈ 0,38-szoros (10/26).</li>
              <li><strong>d)</strong> BB-BB-SzSzSz: 26⁴ · 10³ = 456 976 000 – <strong>26-szoros, ez a legtöbb</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Buszjegy lyukasztása" badge="Kombináció" badgeColor="amber">
            <BusTicketSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 2–5 lyuk: <Binom n={9} k={2} /> + <Binom n={9} k={3} /> + <Binom n={9} k={4} /> + <Binom n={9} k={5} /> = 36 + 84 + 126 + 126 = <strong>372</strong>.</li>
              <li><strong>b)</strong> A 3 × 3-as mezőben 4 szimmetrikus pár és a középső mező van; 5 lyuknál a közép lyukas, és 2 párt választunk: <Binom n={4} k={2} /> = <strong>6</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Koccintás (érettségi, 2017)" badge="Fokszámösszeg" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1 + 2 + 2 + 3 + 3 + 6 + 6 = 23 – <strong>páratlan</strong>, pedig a fokszámok összege az élek kétszerese.</li>
              <li>Másik indoklás: a két 6-os fokú ember mind a 6 társával koccintott, így mindenki legalább 2 koccintásban vett részt – de valaki csak 1-ben.</li>
              <li><strong>Nem lehetséges.</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="5. Álláshirdetés (érettségi, 2005)" badge="Gráf" badgeColor="indigo">
            <AcquaintanceGraphSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Élek: A–B, A–C, B–C (osztálytársak), A–D (kosárlabda).</li>
              <li><strong>b)</strong> Két ismerős kiválasztása = élek száma = <strong>4</strong>.</li>
              <li><strong>c)</strong> Az összes pár <Binom n={4} k={2} /> = 6, ebből 4 ismerős ⇒ <strong>2 kézfogás</strong> (B–D, C–D).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Tudáspróba I. */}
      <TheorySection title="4. Tudáspróba I. – megoldások" badge="Tankönyv 75. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Pingpongbajnokság, 6 játékos" badge="Teljes gráf" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Mindenki mindenkivel: <Binom n={6} k={2} /> = <strong>15</strong> mérkőzés.</li>
              <li><strong>b)</strong> Két 3 fős csoport: 2 · <Binom n={3} k={2} /> = 6, majd 3 helyosztó ⇒ <strong>9</strong> mérkőzés.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. Kézfogások a focicsapatban (érettségi, 2014)" badge="Fokszámösszeg" badgeColor="sky">
            <HandshakeGraphSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Egy lehetséges gráf az ábrán (a 3 nullás játékos izolált csúcs).</li>
              <li><strong>b)</strong> 0 + 1 + 2 + 2 + 2 + 5 + 0 + 0 + 4 + 4 + 2 = 22 ⇒ <strong>11 kézfogás</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Három felelő 17 főből" badge="Számít-e a sorrend?" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Ugyanaz a feladat – nem számít a sorrend: <Binom n={17} k={3} /> = <strong>680</strong>.</li>
              <li><strong>b)</strong> Mindenki más feladatot kap – számít, ki melyiket: 17 · 16 · 15 = <strong>4080</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Moziban: Hajni és Bence ne üljön egymás mellett" badge="Komplementer" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Összes ülésrend: 4! = 24.</li>
              <li>Egymás mellett: „összeragasztjuk” őket: 3! · 2 = 12.</li>
              <li>Nem egymás mellett: 24 − 12 = <strong>12</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="5. Személyi igazolvány okmányazonosítója" badge="Ismétléses variáció" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Nem igaz: a jelsorozat 0-val is kezdődhet (pl. 012345), az nem hatjegyű szám.</li>
              <li><strong>b)</strong> Hatjegyű számok: 9 · 10⁵ = <strong>900 000</strong>.</li>
              <li><strong>c)</strong> Hat számjegyből álló jelsorozat: 10⁶ = <strong>1 000 000</strong>.</li>
              <li><strong>d)</strong> Betűpár: 26² = <strong>676</strong>.</li>
              <li><strong>e)</strong> 10⁶ · 676 = 676 000 000 &gt; 10 000 000 ⇒ <strong>igen</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Tudáspróba II. */}
      <TheorySection title="5. Tudáspróba II. – megoldások" badge="Tankönyv 75. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Hány csúcsa van a teljes gráfnak?" badge="n(n − 1)/2" badgeColor="indigo">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Minden fokszám 8 = n − 1 ⇒ <strong>n = 9</strong>.</li>
              <li><strong>b)</strong> n(n − 1) / 2 = 171 ⇒ n(n − 1) = 342 = 19 · 18 ⇒ <strong>n = 19</strong>.</li>
              <li><strong>c)</strong> Fokszámösszeg 210 ⇒ 105 él ⇒ n(n − 1) = 210 = 15 · 14 ⇒ <strong>n = 15</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. Közlekedésbiztonsági teszt (10 kérdés, 4 válasz)" badge="Ismétléses variáció" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 4¹⁰ = <strong>1 048 576</strong> kitöltés.</li>
              <li><strong>b)</strong> Első 5 jó (1-féle), második 5 rossz (3-féle): 1⁵ · 3⁵ = <strong>243</strong>.</li>
              <li><strong>c)</strong> Pontosan egy hibás: 10 helyen lehet, ott 3-féle rossz válasz ⇒ 10 · 3 = <strong>30</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Ötfős küldöttség 27 tanulóból (15 lány, 12 fiú)" badge="Komplementer" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> <Binom n={27} k={5} /> = <strong>80 730</strong>.</li>
              <li><strong>b)</strong> Legyen fiú = összes − csak lány: 80 730 − <Binom n={15} k={5} /> = 80 730 − 3003 = <strong>77 727</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Hatjegyű páros számok, amelyekben van 0" badge="Komplementer" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Összes hatjegyű páros: 9 · 10⁴ · 5 = 450 000.</li>
              <li>Ezek közül 0 nélküliek: 9⁵ · 4 = 236 196 (utolsó jegy 2, 4, 6 vagy 8).</li>
              <li>Van benne 0: 450 000 − 236 196 = <strong>213 804</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="5. Zsuzsi telefonszáma (érettségi alapján, 2011)" badge="Esetszétválasztás" badgeColor="violet">
            <PhoneKeypadSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>7 különböző jegy két oszlopból: csak a 4 jegyű középső {'{2; 5; 8; 0}'} és egy 3 jegyű szélső oszlop jöhet szóba (2 választás).</li>
              <li>Középső oszlop elöl: első jegy ≠ 0 ⇒ (4! − 3!) · 3! = 18 · 6 = 108, két szélső oszloppal 216.</li>
              <li>Szélső oszlop elöl: 3! · 4! = 144, kétféle szélső oszloppal 288.</li>
              <li>Összesen <strong>504</strong> telefonszám.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: rossz modell vagy dupla számlálás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Számít-e a sorrend? – és a fokszámok összege nem az élek száma"
          wrong="17 fős csoportból 3 felelő ugyanazzal a feladattal: 17 · 16 · 15 = 4080; 11 kézfogás-szám összege 22 ⇒ 22 kézfogás"
          wrongExplanation="Ha a három felelő ugyanazt a feladatot kapja, akkor az A–B–C és a C–B–A kiválasztás ugyanaz: a 3! = 6 sorrendet egynek kell számolni. A kézfogásoknál minden kézfogást két játékos is beírt, így a fokszámösszeg az élszám kétszerese."
          correct="17 · 16 · 15 / 3! = 680 kiválasztás; 22 : 2 = 11 kézfogás"
          correctExplanation="Kombináció = variáció osztva a kiválasztott elemek sorrendjeinek számával (k!). Gráfban: élek száma = fokszámösszeg / 2."
          tip="Kérdezd meg: ha felcserélek két kiválasztott elemet, más eredményt kapok? Ha nem – oszd el k!-sal."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Modellválasztó kalkulátor" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">elemek száma n: {n}</label>
              <input
                type="range"
                min="1"
                max="20"
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
                className="w-full accent-indigo-600"
                aria-label="elemek száma"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                kiválasztott elemek száma k: {effK} {allElements ? '(mind)' : ''}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={k}
                disabled={allElements}
                onChange={(e) => setK(Number(e.target.value))}
                className="w-full accent-rose-600 disabled:opacity-40"
                aria-label="kiválasztott elemek száma"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Mind az n elemet sorba rendezzük', val: allElements, set: setAllElements },
              { label: 'Számít a sorrend', val: ordered, set: setOrdered, disabled: allElements },
              { label: 'Egy elem többször is választható', val: repeat, set: setRepeat, disabled: allElements || !ordered }
            ].map((t) => (
              <button
                key={t.label}
                onClick={() => t.set(!t.val)}
                disabled={t.disabled}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                  t.val ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-indigo-800 border-indigo-300'
                } disabled:opacity-40`}
              >
                {t.val ? '✓ ' : '✗ '}
                {t.label}
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div className="font-bold text-indigo-900">{modelName}</div>
            <div className="font-mono">{formula}</div>
            <div className="text-lg">
              Lehetőségek száma: <strong className="text-indigo-700">{fmtInt(value)}</strong>
            </div>
            {!allElements && !repeat && k > n && (
              <div className="text-rose-700 text-xs font-bold">k &gt; n: ismétlés nélkül nem lehet n elemből k-t választani.</div>
            )}
            <div className="text-xs text-slate-500 italic">Példa: {example}</div>
          </div>
          <TheoryCallout type="tip" title="Hasonlítsd össze!">
            n = 17, k = 3: a sorrend számít ⇒ 4080; nem számít ⇒ 680 – éppen 3! = 6-szor kevesebb. Kapcsold be az ismétlést: 17³ = 4913.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Létezik-e ilyen gráf?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Fokszámok (pontosvesszővel vagy szóközzel elválasztva)</label>
            <input
              type="text"
              value={degText}
              onChange={(e) => setDegText(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono"
              aria-label="fokszámok"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {DEGREE_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => setDegText(p.v)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            {parsedOk ? (
              <>
                <div>Csúcsok száma: <strong>{vertexCount}</strong>; fokszámok összege: <strong>{degSum}</strong></div>
                <div>
                  1. ellenőrzés – páros-e az összeg? {sumEven ? <span className="text-emerald-700 font-bold">igen ⇒ {degSum / 2} él</span> : <span className="text-rose-700 font-bold">nem (páratlan fokú csúcsok: {oddCount}) ⇒ nincs ilyen gráf</span>}
                </div>
                <div>
                  2. ellenőrzés – legnagyobb fokszám ≤ n − 1 = {vertexCount - 1}? {maxOk ? <span className="text-emerald-700 font-bold">igen</span> : <span className="text-rose-700 font-bold">nem ({maxDeg}) ⇒ nincs egyszerű gráf</span>}
                </div>
                <div>
                  3. ellenőrzés – lépésenkénti lebontás (a legnagyobb fokú csúcsot összekötjük a következőkkel):{' '}
                  {sumEven && maxOk ? (
                    graphical ? <span className="text-emerald-700 font-bold">sikerül</span> : <span className="text-rose-700 font-bold">elakad</span>
                  ) : (
                    <span className="text-slate-400">–</span>
                  )}
                </div>
                <div className="pt-1 text-base">
                  {graphical ? (
                    <span className="text-emerald-700 font-bold">Létezik ilyen (hurok- és többszörös él nélküli) gráf, {degSum / 2} éllel.</span>
                  ) : (
                    <span className="text-rose-700 font-bold">Nincs ilyen egyszerű gráf.</span>
                  )}
                </div>
                {vertexCount >= 2 && (
                  <div className="text-xs text-slate-500">
                    Összehasonlításul: a {vertexCount} pontú teljes gráfnak {fmtInt(binom(vertexCount, 2))} éle van.
                  </div>
                )}
              </>
            ) : (
              <div className="text-rose-700 font-bold">Adj meg nemnegatív egész fokszámokat!</div>
            )}
          </div>
          <TheoryCallout type="info" title="Figyeld meg!">
            Az „1; 1; 3; 3” sorozat összege páros (8), mégsem létezik egyszerű gráf: a két 3-as fokú csúcs mindkét 1-es fokú csúccsal össze lenne kötve, így azok fokszáma legalább 2 lenne. A páros összeg szükséges, de nem elégséges feltétel!
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CombinatoricsPracticeExamTheory;
