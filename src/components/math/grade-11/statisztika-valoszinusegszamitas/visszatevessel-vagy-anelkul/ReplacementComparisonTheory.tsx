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
  ReplacementComparisonQualitySvg,
  ReplacementComparisonModelsSvg,
  ReplacementComparisonBusSvg,
  ReplacementComparisonLeftHandedSvg,
  ReplacementComparisonVoucher250Svg,
  ReplacementComparisonVoucher2500Svg,
  ReplacementComparisonPotionSvg,
  ReplacementComparisonBars,
  rcBinomialP,
  rcHyperP,
  rcFmt
} from './ReplacementComparisonFigures';

/** Tört JSX-ben. */
const Frac: React.FC<{ num: React.ReactNode; den: React.ReactNode }> = ({ num, den }) => (
  <span className="inline-flex flex-col items-center align-middle mx-1">
    <span className="px-1">{num}</span>
    <span className="px-1 border-t border-current">{den}</span>
  </span>
);

/** Binomiális együttható JSX-ben. */
const Binom: React.FC<{ n: React.ReactNode; k: React.ReactNode }> = ({ n, k }) => (
  <span className="inline-flex items-center align-middle mx-0.5">
    <span className="text-2xl leading-none font-light">(</span>
    <span className="inline-flex flex-col items-center leading-tight text-xs font-semibold px-0.5">
      <span>{n}</span>
      <span>{k}</span>
    </span>
    <span className="text-2xl leading-none font-light">)</span>
  </span>
);

/** Egy minta „jó” elemeinek száma visszatevéssel / visszatevés nélkül. */
const sampleCount = (N: number, S: number, n: number, replace: boolean): number => {
  let c = 0;
  if (replace) {
    for (let i = 0; i < n; i++) if (Math.random() * N < S) c++;
    return c;
  }
  // visszatevés nélkül: a maradék arányával húzunk
  let left = N;
  let good = S;
  for (let i = 0; i < n; i++) {
    if (Math.random() * left < good) {
      c++;
      good--;
    }
    left--;
  }
  return c;
};

const PRESETS = [
  { t: 'selejt: 50 / 20, minta 15', N: 50, pct: 40, n: 15, a: 5, b: 7 },
  { t: 'busz: 60 / 12, minta 10', N: 60, pct: 20, n: 10, a: 0, b: 1 },
  { t: 'vetélkedő: 60 / 12, minta 5', N: 60, pct: 20, n: 5, a: 2, b: 5 },
  { t: 'utalvány: 250 / 75, minta 20', N: 250, pct: 30, n: 20, a: 5, b: 7 },
  { t: 'utalvány: 2500 / 750, minta 20', N: 2500, pct: 30, n: 20, a: 5, b: 7 }
];

export const ReplacementComparisonTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: eloszlások összehasonlítása + szimuláció
  const [N, setN] = useState<number>(50);
  const [pct, setPct] = useState<number>(40);
  const [n, setNs] = useState<number>(15);
  const [simWith, setSimWith] = useState<number[] | null>(null);
  const [simWithout, setSimWithout] = useState<number[] | null>(null);
  const [simRuns, setSimRuns] = useState<number>(0);
  const S = Math.round((N * pct) / 100);
  const nn = Math.min(n, N, 30);
  const p = S / N;
  const ks = Array.from({ length: nn + 1 }, (_, k) => k);
  const distWith = ks.map((k) => rcBinomialP(nn, k, p));
  const distWithout = ks.map((k) => rcHyperP(N, S, nn, k));
  const maxDiff = Math.max(...ks.map((k) => Math.abs(distWith[k] - distWithout[k])));
  const resetSim = () => {
    setSimWith(null);
    setSimWithout(null);
    setSimRuns(0);
  };
  const simulate = (times: number) => {
    const w = new Array(nn + 1).fill(0);
    const wo = new Array(nn + 1).fill(0);
    for (let t = 0; t < times; t++) {
      w[sampleCount(N, S, nn, true)]++;
      wo[sampleCount(N, S, nn, false)]++;
    }
    setSimWith(w.map((c) => c / times));
    setSimWithout(wo.map((c) => c / times));
    setSimRuns(times);
  };

  // Labor II: intervallum-valószínűség és ismétlődés
  const [a, setA] = useState<number>(5);
  const [b, setB] = useState<number>(7);
  const lo = Math.min(a, b, nn);
  const hi = Math.min(Math.max(a, b), nn);
  let intWith = 0;
  let intWithout = 0;
  for (let k = lo; k <= hi; k++) {
    intWith += distWith[k] ?? 0;
    intWithout += distWithout[k] ?? 0;
  }
  // visszatevéssel: mennyi a valószínűsége, hogy minden kiválasztott elem különböző?
  let allDistinct = 1;
  for (let i = 0; i < nn; i++) allDistinct *= (N - i) / N;

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="visszatevessel-vagy-anelkul"
      title="15. Ráadás – Visszatevéssel vagy anélkül?"
      subtitle="Ugyanazt a kérdést kétféle mintavétellel is megválaszolhatjuk. Mennyire tér el a binomiális és a visszatevés nélküli modell eredménye – és mikor mindegy, melyiket választjuk?"
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_visszatevessel_vagy_anelkul_tananyag.pdf"
      practiceTitle="Készen állsz a két mintavétel összehasonlítására?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KÉTFÉLE MINTAVÉTEL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center text-sm font-bold text-sky-900 dark:text-sky-200">
                visszatevéssel: P(k) = <Binom n="n" k="k" /> · p<sup>k</sup> · (1 − p)<sup>n − k</sup>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center text-sm font-bold text-amber-900 dark:text-amber-200">
                visszatevés nélkül: P(k) = <Frac num={<><Binom n="S" k="k" /> · <Binom n="N − S" k="n − k" /></>} den={<Binom n="N" k="n" />} />
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>N = a sokaság (populáció) elemszáma, S = a vizsgált tulajdonságú elemek száma, p = S/N, n = a minta elemszáma.</li>
              <li>A két eredmény eltér, de ha a sokaság sokkal nagyobb a mintánál, a különbség szinte eltűnik – ilyenkor a (gyakran olcsóbb) visszatevéses modell is jó közelítés.</li>
              <li>Ha egy elemet (embert) csak egyszer választhatunk, a pontos modell a visszatevés nélküli.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: minőség-ellenőrzés kétféleképpen" badge="Tankönyv 202. o." badgeColor="sky">
        <div className="space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            Egy gép által gyártott 50 munkadarab közül 20 selejtes (40%). A minőség-ellenőrzés során 15 munkadarabot vizsgálnak meg. Azt várjuk, hogy a 15 között is 40% körüli lesz a selejtesek száma, azaz 5, 6 vagy 7. Mekkora ennek a valószínűsége, ha a) visszatevéssel, b) visszatevés nélkül ellenőriznek?
          </p>
          <ReplacementComparisonQualitySvg />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TheoryCard title="a) Visszatevéssel – binomiális eloszlás" badge="Megoldás" badgeColor="sky">
              <div className="text-sm text-slate-700 space-y-2">
                <p>Minden alkalommal ugyanazt a kísérletet végezzük el: selejtest 0,4, jót 0,6 valószínűséggel választunk. A 15 független húzásból 5, 6 vagy 7 selejtes:</p>
                <p>
                  <Binom n={15} k={5} /> · 0,4<sup>5</sup> · 0,6<sup>10</sup> + <Binom n={15} k={6} /> · 0,4<sup>6</sup> · 0,6<sup>9</sup> + <Binom n={15} k={7} /> · 0,4<sup>7</sup> · 0,6<sup>8</sup>
                </p>
                <p>≈ 0,186 + 0,207 + 0,177 ≈ <strong>0,57</strong></p>
              </div>
            </TheoryCard>
            <TheoryCard title="b) Visszatevés nélkül – kedvező / összes" badge="Megoldás" badgeColor="amber">
              <div className="text-sm text-slate-700 space-y-2">
                <p>
                  Az 50 darabból <Binom n={50} k={15} /> módon választható ki a 15 (összes eset). Pontosan k selejtes: <Binom n={20} k="k" /> · <Binom n={30} k="15 − k" /> módon.
                </p>
                <p>
                  <Frac
                    num={
                      <>
                        <Binom n={20} k={5} />
                        <Binom n={30} k={10} /> + <Binom n={20} k={6} />
                        <Binom n={30} k={9} /> + <Binom n={20} k={7} />
                        <Binom n={30} k={8} />
                      </>
                    }
                    den={<Binom n={50} k={15} />}
                  />{' '}
                  ≈ 0,207 + 0,246 + 0,202 ≈ <strong>0,65</strong>
                </p>
              </div>
            </TheoryCard>
          </div>
          <TheoryCallout type="info" title="Mit látunk?">
            Van különbség a kétféle mintavétel valószínűsége között (0,57 és 0,65), de nem túl nagy. A különbség még kisebb, ha nem 50 munkadarab van, hanem sokkal több. Visszatevés nélkül az arány „visszahúz” a 40% felé: ha már sok selejtest kihúztunk, kevesebb marad – ezért a várt érték körüli k-k valószínűbbek.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: a két modell összevetése" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryTable
              headers={['Szempont', 'Visszatevéssel', 'Visszatevés nélkül']}
              rows={[
                ['Egy elem többször?', 'igen, újra kihúzható', 'nem, legfeljebb egyszer'],
                ['A húzások', 'függetlenek, p végig ugyanannyi', 'hatnak egymásra, az arány változik'],
                ['Képlet', '(n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ', '(S alatt k)(N − S alatt n − k) / (N alatt n)'],
                ['Mi kell hozzá?', 'csak p és n', 'N, S és n'],
                ['Tipikus helyzet', 'kockadobás, nagy népesség, gyakoriság alapján ismert p', 'sorsolás, lottó, egyszerre húzás, kis sokaság']
              ]}
            />
            <TheoryCallout type="tip" title="Megjegyzés a költségekről">
              Ha az egyik mintavételi eljárás jelentős többletköltséggel jár a másikhoz képest, nem jelent nagy kockázatot, ha helyette a másikat választják – feltéve, hogy a sokaság jóval nagyobb a mintánál.
            </TheoryCallout>
          </div>
          <ReplacementComparisonModelsSvg />
        </div>
      </TheorySection>

      {/* 3. Ráadás: nagy populáció */}
      <TheorySection title="3. Nagyobb populáció: szinte eltűnik a különbség" badge="Tankönyv 204–205. o." badgeColor="teal">
        <div className="space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            Egy 250 fős összejövetelen a megjelentek 30%-a (75 fő) nyugdíjas korú. 20 könyvutalványt sorsolnak ki. Mennyi a valószínűsége, hogy k utalványt nyugdíjas korú nyer, ha a) mindenki csak egy utalványt nyerhet; b) mindenki több utalványt is nyerhet?
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              a) visszatevés nélkül: P(k) = <Frac num={<><Binom n={75} k="k" /> · <Binom n={175} k="20 − k" /></>} den={<Binom n={250} k={20} />} />
            </div>
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
              b) visszatevéssel: P(k) = <Binom n={20} k="k" /> · 0,3<sup>k</sup> · 0,7<sup>20 − k</sup>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ReplacementComparisonVoucher250Svg />
            <ReplacementComparisonVoucher2500Svg />
          </div>
          <TheoryTable
            headers={['k', '250 fő, visszatevés nélkül', '2500 fő, visszatevés nélkül', 'visszatevéssel (bármekkora N)']}
            rows={[4, 5, 6, 7, 8].map((k) => [
              String(k),
              rcFmt(rcHyperP(250, 75, 20, k), 4),
              rcFmt(rcHyperP(2500, 750, 20, k), 4),
              rcFmt(rcBinomialP(20, k, 0.3), 4)
            ])}
          />
          <TheoryCallout type="info" title="Közvélemény-kutatás">
            Egy több tízezer vagy több millió lakosú populációban több száz, esetleg több ezer embert kérdeznek meg. Sokkal olcsóbb visszatevéses mintavételt szervezni: ekkor ugyan nincs kizárva, hogy valakit kétszer kérdeznek meg, de a népes populáció miatt ennek igen kicsi a valószínűsége. Az eredmény gyakorlatilag ugyanaz, mint ha mindenkit legfeljebb egyszer kérdeztek volna meg.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. Feladatok */}
      <TheorySection title="4. Feladatok: metró, busz, balkezesek, bájital" badge="Tankönyv 202–203. o." badgeColor="emerald">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <TheoryCard title="1. feladat: jegyellenőrzés a metrón" badge="Feladat" badgeColor="emerald">
                <p className="text-sm text-slate-700">
                  Egy utasnak 0,92 valószínűséggel van érvényes jegye. Az ellenőr 50 utast ellenőrzött. A főnök csak a legalább 5%-os valószínűségű eseményt fogadja el.
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                  <li>a) mindenkinek volt jegye: 0,92<sup>50</sup> ≈ <strong>0,0155</strong> &lt; 0,05;</li>
                  <li>b) senkinek sem volt: 0,08<sup>50</sup> ≈ 1,4 · 10<sup>−55</sup>.</li>
                </ul>
                <p className="text-sm text-slate-700 mt-1">
                  A főnök <strong>egyik állítást sem</strong> fogadja el (a nagy népesség miatt visszatevéses modellel számolunk).
                </p>
              </TheoryCard>
              <TheoryCard title="2. feladat: tanulóbérletek a buszon" badge="Feladat" badgeColor="sky">
                <p className="text-sm text-slate-700">60 utas, közülük 12 (20%) tanulóbérletes; az ellenőr 10 jegyet néz meg.</p>
                <TheoryTable
                  headers={['k', '0', '1', '2', '3', '4', '5', '6']}
                  rows={[
                    ['visszatevéssel', ...[0, 1, 2, 3, 4, 5, 6].map((k) => rcFmt(rcBinomialP(10, k, 0.2)))],
                    ['visszatevés nélkül', ...[0, 1, 2, 3, 4, 5, 6].map((k) => rcFmt(rcHyperP(60, 12, 10, k)))]
                  ]}
                />
                <p className="text-sm text-slate-700 mt-1">
                  Az eltérések kicsik, nem nagyon fontos, hogy 10 különböző utast kérdezzen. b) Bence legfeljebb egyszer: (59/60)<sup>10</sup> + 10 · (1/60) · (59/60)<sup>9</sup> ≈ <strong>0,989</strong>.
                </p>
              </TheoryCard>
            </div>
            <ReplacementComparisonBusSvg />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TheoryCard title="3. feladat: balkezesek a csoportban" badge="Feladat" badgeColor="violet">
              <p className="text-sm text-slate-700">A balkezesek aránya kb. 11%. Bence 17 fős csoportjában 3 balkezes van.</p>
              <TheoryTable
                headers={['k', '0', '1', '2', '3', '4', '5', '6']}
                rows={[['P(k)', ...[0, 1, 2, 3, 4, 5, 6].map((k) => rcFmt(rcBinomialP(17, k, 0.11), 4))]]}
              />
              <p className="text-sm text-slate-700 mt-1">
                c) A 3 balkezes egyáltalán nem szokatlan (≈ 0,177), bár az 1 vagy 2 a legvalószínűbb. d) P(1 ≤ k ≤ 4) ≈ <strong>0,830</strong>.
              </p>
            </TheoryCard>
            <ReplacementComparisonLeftHandedSvg />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TheoryCard title="4. feladat: Tomi bájitala" badge="Feladat" badgeColor="amber">
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>a) visszatevés nélkül 3 húzás, nincs maszlag: (8 alatt 3) / (12 alatt 3) = 56/220 = 14/55 ≈ <strong>0,255</strong></li>
                <li>b) visszatevéssel 4 húzás, van maszlag: 1 − (8/12)<sup>4</sup> = 1 − 16/81 = 65/81 ≈ <strong>0,802</strong></li>
                <li>c) (1 + x)/(12 + x) &gt; 0,3 ⇔ x &gt; 3,71…, tehát legalább <strong>4</strong> galócát kell vennie.</li>
                <li>
                  d) egyszerre 3, pontosan 2 mandragóra: (3 alatt 2) · 9 / 220 = 27/220 ≈ 0,123; visszatevéssel 3, legalább 2 mandragóra: 3 · (1/4)<sup>2</sup> · (3/4) + (1/4)<sup>3</sup> = 10/64 ≈ 0,156 – ez a <strong>nagyobb</strong>.
                </li>
              </ul>
            </TheoryCard>
            <ReplacementComparisonPotionSvg />
          </div>
          <TheoryTable
            headers={['Házi feladat', 'Modell', 'Eredmény']}
            rows={[
              ['1. b) 24 diákból (15 tizenkettedikes) 3: mind 12.-es', 'csak visszatevés nélkül (egy diák egyszer)', '455/2024 ≈ 0,225'],
              ['1. c) két 12.-es és egy 11.-es', 'visszatevés nélkül', '(15 alatt 2) · 9 / 2024 = 945/2024 ≈ 0,467'],
              ['2. a) 60 nézőből (12 barát) 5 játékos: pontosan 2 barát', 'visszatevés nélkül', '≈ 0,209'],
              ['2. b) legalább 2 barát', 'visszatevés nélkül', '1 − P(0) − P(1) ≈ 0,259'],
              ['3. a) 64 csomagból (4 űrhajós) 5: pontosan 2 űrhajós', 'visszatevés nélkül', '(4 alatt 2)(60 alatt 3) / (64 alatt 5) ≈ 0,027'],
              ['3. b) nem lesz űrhajós', 'visszatevés nélkül', '(60 alatt 5) / (64 alatt 5) ≈ 0,716']
            ]}
          />
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: binomiális képlet, ahol valaki csak egyszer választható" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="24 jelentkezőből (15 tizenkettedikes) 3 diákot sorsolnak ki. Mennyi a valószínűsége, hogy mindhárom tizenkettedikes?"
          wrong="(15/24)³ ≈ 0,244"
          wrongExplanation="Ez a visszatevéses modell: úgy számol, mintha ugyanazt a diákot többször is kisorsolhatnák. Egy diák azonban csak egyszer utazhat ki."
          correct="(15 alatt 3) / (24 alatt 3) = 455/2024 ≈ 0,225"
          correctExplanation="Visszatevés nélküli modell, vagy egymás után: 15/24 · 14/23 · 13/22 ≈ 0,225. Kis sokaságnál (24 fő) a két eredmény már érezhetően eltér."
          tip="Először döntsd el: kiválasztható-e ugyanaz az elem többször? Ha nem, a pontos modell a visszatevés nélküli; a binomiális csak közelítés, ami nagy sokaságnál jó."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: a két eloszlás egymás mellett" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">sokaság mérete (N): {N}</label>
              <input type="range" min={20} max={3000} step={10} value={N} onChange={(e) => { setN(Number(e.target.value)); resetSim(); }} className="w-full accent-sky-600" aria-label="sokaság mérete" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a vizsgált tulajdonság aránya: {pct}% (S = {S})</label>
              <input type="range" min={5} max={95} step={5} value={pct} onChange={(e) => { setPct(Number(e.target.value)); resetSim(); }} className="w-full accent-amber-600" aria-label="arány" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">minta mérete (n): {nn}</label>
              <input type="range" min={1} max={30} value={n} onChange={(e) => { setNs(Number(e.target.value)); resetSim(); }} className="w-full accent-teal-600" aria-label="minta mérete" />
            </div>
          </div>
          <ReplacementComparisonBars
            withRep={distWith}
            withoutRep={distWithout}
            empiricalWith={simWith ?? undefined}
            empiricalWithout={simWithout ?? undefined}
            xLabel="a vizsgált tulajdonságú elemek száma a mintában (k)"
            title={`N = ${N}, S = ${S}, n = ${nn}`}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-sky-50 rounded-xl border border-sky-200 p-3">
              minta / sokaság: <strong>{rcFmt((nn / N) * 100, 1)}%</strong>
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-3">
              legnagyobb eltérés egy k-nál: <strong>{rcFmt(maxDiff, 4)}</strong>
            </div>
            <div className={`rounded-xl border p-3 ${maxDiff < 0.01 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
              {maxDiff < 0.01 ? 'A két modell gyakorlatilag ugyanazt adja.' : 'Érezhető a különbség – számít, melyik modellt választjuk.'}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => simulate(1000)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-100 text-sky-900 hover:bg-sky-200">
              1000 mintavétel mindkét módon
            </button>
            <button onClick={() => simulate(10000)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-100 text-sky-900 hover:bg-sky-200">
              10 000 mintavétel
            </button>
            <button onClick={resetSim} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
              szimuláció törlése
            </button>
            <span className="text-xs text-slate-600">{simRuns > 0 ? `A karikák a ${simRuns.toLocaleString('hu-HU')} szimulált minta relatív gyakoriságai.` : 'A szimuláció relatív gyakoriságai karikákként jelennek meg.'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((ps) => (
              <button
                key={ps.t}
                onClick={() => {
                  setN(ps.N);
                  setPct(ps.pct);
                  setNs(ps.n);
                  setA(ps.a);
                  setB(ps.b);
                  resetSim();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100"
              >
                {ps.t}
              </button>
            ))}
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: intervallum-valószínűség és ismétlődés" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            A fenti beállításokkal (N = {N}, S = {S}, n = {nn}) számold ki, mennyi a valószínűsége, hogy a mintában a vizsgált tulajdonságú elemek száma {lo} és {hi} közé esik!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alsó határ: {lo}</label>
              <input type="range" min={0} max={nn} value={Math.min(a, nn)} onChange={(e) => setA(Number(e.target.value))} className="w-full accent-teal-600" aria-label="alsó határ" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">felső határ: {hi}</label>
              <input type="range" min={0} max={nn} value={Math.min(b, nn)} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-teal-600" aria-label="felső határ" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-sky-50 rounded-xl border border-sky-200 p-4">
              <div className="font-bold text-sky-800">visszatevéssel</div>
              <div className="text-xs text-slate-600">Σ (n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ, p = {rcFmt(p, 3)}</div>
              <div className="text-lg font-black text-sky-900">{rcFmt(intWith, 4)}</div>
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
              <div className="font-bold text-amber-800">visszatevés nélkül</div>
              <div className="text-xs text-slate-600">Σ (S alatt k)(N − S alatt n − k) / (N alatt n)</div>
              <div className="text-lg font-black text-amber-900">{rcFmt(intWithout, 4)}</div>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <div className="font-bold text-slate-800">különbség</div>
              <div className="text-lg font-black text-slate-900">{rcFmt(Math.abs(intWith - intWithout), 4)}</div>
            </div>
          </div>
          <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 text-sm text-slate-700">
            <strong>Megkérdezhetünk-e valakit kétszer?</strong> Visszatevéses mintavételnél annak a valószínűsége, hogy az n = {nn} kiválasztott mind különböző:{' '}
            {N} / {N} · {N - 1} / {N} · … · {N - nn + 1} / {N} ≈ <strong>{rcFmt(allDistinct, 4)}</strong>. Tehát legalább egy elem ismétlődik{' '}
            <strong>{rcFmt(1 - allDistinct, 4)}</strong> valószínűséggel. Nagy N mellett ez nagyon kicsi – ezért mindegy, melyik mintavételt választjuk.
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ReplacementComparisonTheory;
