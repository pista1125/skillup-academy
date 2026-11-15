import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  ProbabilityPracticeAtLeastAtMostSvg,
  ProbabilityPracticeBoxPlotSvg,
  ProbabilityPracticeToastSvg,
  ProbabilityPracticeVirusSvg,
  ProbabilityPracticePlanetsSvg,
  ProbabilityPracticeModelMapSvg
} from './ProbabilityPracticeFigures';

/** Magyar formátum: tizedesvessző, legfeljebb `d` tizedesjegy; nagyon kicsi számnál normálalak. */
const fmt = (x: number, d = 4): string => {
  if (!Number.isFinite(x)) return '–';
  if (x !== 0 && Math.abs(x) < Math.pow(10, -d)) return x.toExponential(2).replace('.', ',');
  const r = Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
  return r.toLocaleString('hu-HU', { maximumFractionDigits: d });
};

const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};

const Binom: React.FC<{ n: React.ReactNode; k: React.ReactNode }> = ({ n, k }) => (
  <span className="inline-flex items-center align-middle mx-0.5">
    <span className="text-[1.6em] font-light leading-none">(</span>
    <span className="inline-flex flex-col items-center leading-tight text-[0.85em] font-semibold">
      <span>{n}</span>
      <span>{k}</span>
    </span>
    <span className="text-[1.6em] font-light leading-none">)</span>
  </span>
);

const Sup: React.FC<{ children: React.ReactNode }> = ({ children }) => <sup className="text-[0.7em]">{children}</sup>;

type Mode = 'eq' | 'atLeast' | 'atMost' | 'more' | 'less';
const MODES: { id: Mode; label: string }[] = [
  { id: 'eq', label: 'pontosan k' },
  { id: 'atLeast', label: 'legalább k' },
  { id: 'atMost', label: 'legfeljebb k' },
  { id: 'more', label: 'k-nál több' },
  { id: 'less', label: 'k-nál kevesebb' }
];

const LAB_PRESETS: { name: string; n: number; p: number; k: number; mode: Mode }[] = [
  { name: 'Bence: legalább 2 felelés', n: 6, p: 0.05, k: 2, mode: 'atLeast' },
  { name: 'pirítós: 7-nél több', n: 10, p: 0.62, k: 7, mode: 'more' },
  { name: 'pirítós: legfeljebb 7', n: 10, p: 0.62, k: 7, mode: 'atMost' },
  { name: 'kocka 10-szer: legalább 8 hatos', n: 10, p: 1 / 6, k: 8, mode: 'atLeast' },
  { name: 'palackok: legfeljebb 4 hibás', n: 50, p: 0.08, k: 4, mode: 'atMost' },
  { name: 'mérés: legalább egyszer > Q₃', n: 6, p: 0.25, k: 1, mode: 'atLeast' }
];

export const ProbabilityPracticeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: legalább / legfeljebb kalkulátor
  const [n, setN] = useState<number>(10);
  const [p, setP] = useState<number>(0.62);
  const [k, setK] = useState<number>(7);
  const [mode, setMode] = useState<Mode>('more');
  const kk = Math.min(k, n);
  const dist = useMemo(() => Array.from({ length: n + 1 }, (_, j) => binom(n, j) * Math.pow(p, j) * Math.pow(1 - p, n - j)), [n, p]);
  const inSet = (j: number): boolean =>
    mode === 'eq' ? j === kk : mode === 'atLeast' ? j >= kk : mode === 'atMost' ? j <= kk : mode === 'more' ? j > kk : j < kk;
  const chosen = dist.reduce((s, v, j) => (inSet(j) ? s + v : s), 0);
  const chosenCount = dist.filter((_, j) => inSet(j)).length;
  const useComplement = chosenCount > (n + 1) / 2;
  const compList = dist.map((_, j) => j).filter((j) => !inSet(j));
  const setList = dist.map((_, j) => j).filter((j) => inSet(j));
  const maxD = Math.max(...dist, 1e-9);
  const modeLabel = MODES.find((m) => m.id === mode)?.label.replace('k', String(kk)) ?? '';

  // Labor II: legalább egy – hány kísérlet kell?
  const [q, setQ] = useState<number>(0.02);
  const [target, setTarget] = useState<number>(0.5);
  const [m, setM] = useState<number>(30);
  const atLeastOne = 1 - Math.pow(1 - q, m);
  const minN = useMemo(() => {
    let i = 0;
    while (1 - Math.pow(1 - q, i) < target && i < 100000) i++;
    return i;
  }, [q, target]);
  const curveMax = Math.max(60, Math.min(400, Math.ceil(minN * 1.3)), m);
  const sx = (x: number) => 50 + (x / curveMax) * 490;
  const sy = (y: number) => 200 - y * 170;
  const curve = Array.from({ length: 121 }, (_, i) => {
    const x = (i / 120) * curveMax;
    return `${sx(x)},${sy(1 - Math.pow(1 - q, x))}`;
  }).join(' ');

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="gyakorlas-valoszinuseg"
      title="14. Gyakorlás"
      subtitle="Valószínűségszámítás összefoglaló gyakorlás: legalább, legfeljebb, komplementer, binomiális eloszlás és egy érettségi feladat."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_valoszinuseg_gyakorlas_tananyag.pdf"
      practiceTitle="Készen állsz a valószínűségszámítási gyakorlásra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott vegyes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — LEGALÁBB, LEGFELJEBB',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              P(legalább 2) = 1 − [P(0) + P(1)];  P(legfeljebb 2) = P(0) + P(1) + P(2)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az összes lehetséges kimenetel valószínűségének összege 1 – ezért sokszor egyszerűbb a komplementerrel számolni.</li>
              <li>
                <strong>Legalább egy:</strong> 1 − P(egyszer sem) = 1 − (1 − p)<Sup>n</Sup>.
              </li>
              <li>A „legalább 2” és a „legfeljebb 2” NEM egymás komplementere: mindkettőben benne van a „pontosan 2”.</li>
              <li>
                Pontosan k: <Binom n="n" k="k" /> · p<Sup>k</Sup> · (1 − p)<Sup>n − k</Sup> (binomiális eloszlás, 13. lecke).
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglaló */}
      <TheorySection title="1. Összefoglaló: amit eddig tanultunk a valószínűségről" badge="Összefoglaló" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryTable
            headers={['Lecke', 'Lényeg', 'Képlet / módszer']}
            rows={[
              ['7. Valószínűség – ismétlés', 'egyenlően valószínű kimenetelek', 'P = kedvező esetek / összes eset; P(nem A) = 1 − P(A)'],
              ['9. Várható érték', 'a kimenetelek súlyozott átlaga', 'E = x₁ · p₁ + … + xₙ · pₙ; méltányos játék: E = 0'],
              ['10. Két vagy több elem egyszerre', 'a sorrend nem számít', 'kedvező és összes eset binomiális együtthatókkal'],
              ['11. Visszatevés nélküli mintavétel', 'N elem, köztük K „jó”; n-et húzunk', '(K alatt k) · (N − K alatt n − k) / (N alatt n)'],
              ['12. Ugyanazt többször', 'független kísérletek', 'szorzás: pⁿ, n · p · (1 − p)ⁿ⁻¹'],
              ['13. Visszatevéses mintavétel', 'binomiális eloszlás', '(n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ']
            ]}
          />
          <ProbabilityPracticeModelMapSvg />
        </div>
      </TheorySection>

      {/* 2. Legalább, legfeljebb */}
      <TheorySection title="2. Elmélet: legalább, legfeljebb" badge="Tankönyv 200–201. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Ha egy kísérletben az összes lehetséges kimenetel valószínűségét összeadjuk, 1-et kapunk. Ez sokat segít, ha azt kérdezik, mennyi a valószínűsége, hogy <strong>legalább</strong> kétszer bekövetkezik egy esemény.
            </p>
            <p>
              5-ször végzünk el egy kísérletet; az esemény bekövetkezéseinek száma 0, 1, 2, 3, 4 vagy 5 lehet.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Legfeljebb kétszer:</strong> 0, 1 vagy 2 alkalommal, tehát P(legfeljebb 2) = P(0) + P(1) + P(2).
              </li>
              <li>
                <strong>Legalább kétszer:</strong> 2, 3, 4 vagy 5 alkalommal. Ezt úgy a legkönnyebb kiszámítani, ha 1-ből kivonjuk a 0 és az 1 bekövetkezés valószínűségét: P(legalább 2) = 1 − [P(0) + P(1)].
              </li>
            </ul>
            <TheoryCallout type="warning" title="Figyeld meg!">
              A „legalább kétszer” és a „legfeljebb kétszer” nem egymás komplementere: mindkettő tartalmazza azt az esetet, amikor az esemény pontosan kétszer következik be. A „legalább 2” komplementere a „legfeljebb 1”.
            </TheoryCallout>
          </div>
          <ProbabilityPracticeAtLeastAtMostSvg />
        </div>
      </TheorySection>

      {/* 3. Bence és a dobozdiagram */}
      <TheorySection title="3. Feladatok: Bence felelése és a mérési eredmények" badge="Tankönyv 200. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="1. feladat: felel-e Bence?" badge="Feladat" badgeColor="amber">
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                Bence 6 órájának mindegyikén kb. 0,05 valószínűséggel felel, ezért arra gondol, hogy 6 · 0,05 = 0,3 a valószínűsége, hogy valamelyik órán felelni fog.
              </p>
              <p>
                <strong>a)</strong> Nem jól gondolkodik: a „felel az 1. órán”, „felel a 2. órán”, … események nem zárják ki egymást (több órán is felelhet), ezért nem adhatók össze. Helyesen a komplementerrel:
              </p>
              <p className="font-mono text-center">P(legalább egyszer) = 1 − 0,95<Sup>6</Sup> ≈ <strong>0,2649</strong></p>
              <p>
                <strong>b)</strong> Legalább két órán: 1 − [P(0) + P(1)] = 1 − 0,95<Sup>6</Sup> − 6 · 0,05 · 0,95<Sup>5</Sup> ≈ 1 − 0,7351 − 0,2321 ≈ <strong>0,0328</strong>.
              </p>
            </div>
          </TheoryCard>
          <div className="space-y-3">
            <TheoryCard title="2. feladat: mérési eredmények dobozdiagramja" badge="Feladat" badgeColor="sky">
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  Egy újabb mérési eredmény 0,25 valószínűséggel legfeljebb akkora, mint az alsó kvartilis (14,5), és 0,25 valószínűséggel nagyobb a felső kvartilisnél (15,9). A következő 6 mérésből:
                </p>
                <p>
                  <strong>a)</strong> pontosan egyszer nagyobb, mint 15,9: <Binom n="6" k="1" /> · 0,25 · 0,75<Sup>5</Sup> ≈ <strong>0,356</strong>;
                </p>
                <p>
                  <strong>b)</strong> legalább egyszer nagyobb, mint 15,9: 1 − 0,75<Sup>6</Sup> ≈ <strong>0,822</strong>;
                </p>
                <p>
                  <strong>c)</strong> mind a 6 a (14,5; 15,9] sávba esik (p = 0,5): 0,5<Sup>6</Sup> = 1/64 ≈ <strong>0,0156</strong>.
                </p>
              </div>
            </TheoryCard>
            <ProbabilityPracticeBoxPlotSvg />
          </div>
        </div>
      </TheorySection>

      {/* 4. Pirítós */}
      <TheorySection title="4. Feladat: a vajas pirítós a vajas felére esik (p = 0,62)" badge="Tankönyv 200. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Egy 2000-ben végzett kísérletsorozat szerint a lepottyanó vajas pirítós kb. 0,62 valószínűséggel esik a vajas felére. 10 szeletből:</p>
            <TheoryTable
              headers={['Kérdés', 'Számolás', 'Eredmény']}
              rows={[
                ['a) egy sem esik a vajas felére', '0,38¹⁰', '≈ 0,00006'],
                ['b) mindegyik a vajas felére esik', '0,62¹⁰', '≈ 0,0084'],
                ['c) lesz, amelyik nem a vajas felére esik', '1 − 0,62¹⁰', '≈ 0,9916'],
                ['d) pontosan 7 esik a vajas felére', '(10 alatt 7) · 0,62⁷ · 0,38³', '≈ 0,2319'],
                ['e) 7-nél több', 'P(8) + P(9) + P(10)', '≈ 0,2017'],
                ['f) legfeljebb 7', '1 − [P(8) + P(9) + P(10)]', '≈ 0,7983']
              ]}
            />
            <p className="text-xs text-slate-500">Az f) az e) komplementere – ezért 3 tag összeadása elég a 8 helyett.</p>
          </div>
          <ProbabilityPracticeToastSvg />
        </div>
      </TheorySection>

      {/* 5. Vírus és érettségi */}
      <TheorySection title="5. Feladatok: vírushordozó a buszon és egy érettségi feladat" badge="Tankönyv 201. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryCard title="4. feladat: van-e vírushordozó a buszon?" badge="Feladat" badgeColor="rose">
              <div className="space-y-1 text-sm text-slate-700">
                <p>Egy lakos 0,02 valószínűséggel hordozza a vírust. „Van vírushordozó” = legalább egy van, ennek ellentéte: senki sem hordozza.</p>
                <ul className="list-disc pl-5 font-mono">
                  <li>a) 30 fő: 1 − 0,98<Sup>30</Sup> ≈ 0,4545 (kb. 45%)</li>
                  <li>b) 20 fő: 1 − 0,98<Sup>20</Sup> ≈ 0,3324</li>
                  <li>c) 10 fő: 1 − 0,98<Sup>10</Sup> ≈ 0,1829</li>
                </ul>
              </div>
            </TheoryCard>
            <ProbabilityPracticeVirusSvg />
          </div>
          <div className="space-y-3">
            <TheoryCard title="5. feladat (érettségi, 2020): a Naprendszer bolygói" badge="Érettségi" badgeColor="violet">
              <div className="space-y-2 text-sm text-slate-700">
                <p>
                  Judit biztos abban, hogy a Föld a 3., a Neptunusz a 8.; tudja, hogy az első két helyen a Merkúr és a Vénusz áll, de a sorrendjüket csak tippeli; a többi négy bolygót véletlenszerűen írja be.
                </p>
                <p>
                  <strong>a)</strong> A Merkúr–Vénusz sorrend 1/2 valószínűséggel jó, a maradék 4 bolygó 4! = 24-féle sorrendjéből 1 jó: P = 1/2 · 1/24 = <strong>1/48 ≈ 0,0208</strong>.
                </p>
                <p>
                  <strong>b)</strong> 8 cédulából kétszer húzunk. Visszatevéssel: P(legalább egyszer Föld) = 1 − (7/8)<Sup>2</Sup> = 15/64 ≈ 0,234. Visszatevés nélkül: 1 − 7/8 · 6/7 = 1/4 = 0,25. Tehát <strong>visszatevés nélkül nagyobb</strong> a valószínűség.
                </p>
              </div>
            </TheoryCard>
            <ProbabilityPracticePlanetsSvg />
          </div>
        </div>
      </TheorySection>

      {/* 6. Házi feladatok */}
      <TheorySection title="6. Házi feladatok – megoldásokkal" badge="Tankönyv 201. o." badgeColor="slate">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TheoryCard title="1. 50 gyöngy, 10 selejtes, 5 húzás visszatevéssel" badge="Házi" badgeColor="slate">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>p = 10/50 = 0,2</li>
              <li>a) nincs selejtes: 0,8<Sup>5</Sup> = 0,32768</li>
              <li>b) mind selejtes: 0,2<Sup>5</Sup> = 0,00032</li>
              <li>c) a selejtesek aránya 20%, azaz 5-ből 1: 5 · 0,2 · 0,8<Sup>4</Sup> = 0,4096</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. kocka 10-szer" badge="Házi" badgeColor="slate">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>a) egy hatos sem: (5/6)<Sup>10</Sup> ≈ 0,1615</li>
              <li>b) mind hatos: (1/6)<Sup>10</Sup> ≈ 1,65 · 10<Sup>−8</Sup></li>
              <li>c) legalább 8 hatos: P(8) + P(9) + P(10) ≈ 0,0000194</li>
              <li>d) legfeljebb 2 hatos: P(0) + P(1) + P(2) ≈ 0,7752</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. 50 palack, a hibás valószínűsége 0,08" badge="Házi" badgeColor="slate">
            <ul className="text-sm text-slate-700 space-y-1">
              <li>a) nincs hibás: 0,92<Sup>50</Sup> ≈ 0,0155</li>
              <li>b) nincs hibátlan: 0,08<Sup>50</Sup> ≈ 1,4 · 10<Sup>−55</Sup></li>
              <li>c) van hibás: 1 − 0,92<Sup>50</Sup> ≈ 0,9845</li>
              <li>d) van hibátlan: 1 − 0,08<Sup>50</Sup> ≈ 1</li>
              <li>e) pontosan 4 hibás: (50 alatt 4) · 0,08<Sup>4</Sup> · 0,92<Sup>46</Sup> ≈ 0,2037</li>
              <li>f) legfeljebb 4 hibás: P(0) + … + P(4) ≈ 0,6290</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: valószínűségek összeadása, amikor az esetek nem zárják ki egymást" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Bence 6 órán, mindegyiken 0,05 valószínűséggel felel. Mennyi a valószínűsége, hogy valamelyik órán felel?"
          wrong="6 · 0,05 = 0,3"
          wrongExplanation="Összeadni csak egymást kizáró esetek valószínűségét szabad. Bence több órán is felelhet, így ezeket az eseteket többször számoljuk. (20 órával így 1-et, 30 órával 1,5-et kapnánk – lehetetlen!)"
          correct="1 − 0,95⁶ ≈ 0,2649"
          correctExplanation="A „legalább egyszer” ellentéte az „egyszer sem”: ennek valószínűsége 0,95⁶, ezt vonjuk ki 1-ből."
          tip="Ugyanez a hiba a vírusos feladatnál: 30 · 0,02 = 0,6 helyett a helyes érték 1 − 0,98³⁰ ≈ 0,45."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: legalább, legfeljebb – kalkulátor" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Válaszd ki a kérdés típusát! A kalkulátor kiemeli a hozzá tartozó oszlopokat, és megmutatja, hogy közvetlenül vagy a komplementerrel egyszerűbb-e számolni.
          </p>
          <div className="flex flex-wrap gap-2">
            {LAB_PRESETS.map((pr) => (
              <button
                key={pr.name}
                onClick={() => {
                  setN(pr.n);
                  setP(pr.p);
                  setK(pr.k);
                  setMode(pr.mode);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100"
              >
                {pr.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kísérletek száma: n = {n}</label>
              <input type="range" min={1} max={50} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-sky-600" aria-label="kísérletek száma" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">siker valószínűsége: p = {fmt(p, 3)}</label>
              <input type="range" min={0.01} max={0.99} step={0.01} value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="siker valószínűsége" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">határ: k = {kk}</label>
              <input type="range" min={0} max={n} value={kk} onChange={(e) => setK(Number(e.target.value))} className="w-full accent-amber-600" aria-label="határ k" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {MODES.map((md) => (
              <button
                key={md.id}
                onClick={() => setMode(md.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${mode === md.id ? 'bg-sky-600 text-white border-sky-700' : 'bg-white text-sky-800 border-sky-200'}`}
              >
                {md.label}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 560 200" className="w-full h-auto max-w-2xl mx-auto" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="556" height="196" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <line x1="30" y1="170" x2="545" y2="170" stroke="#334155" />
            {dist.map((v, j) => {
              const bw = 515 / (n + 1);
              const x = 30 + j * bw;
              const h = (v / maxD) * 140;
              const sel = inSet(j);
              return (
                <g key={j}>
                  <rect x={x + bw * 0.12} y={170 - h} width={bw * 0.76} height={h} rx="1.5" fill={sel ? '#0284c7' : '#cbd5e1'} />
                  {(n <= 20 || j % 5 === 0) && (
                    <text x={x + bw / 2} y="184" fontSize={n > 20 ? 8 : 10} textAnchor="middle" fill={sel ? '#0369a1' : '#64748b'} fontWeight={sel ? 'bold' : 'normal'}>
                      {j}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-sky-50 rounded-xl border border-sky-200 p-4 space-y-1">
              <div className="font-bold text-sky-800">P({modeLabel})</div>
              <div className="text-2xl font-black text-sky-900">≈ {fmt(chosen, 4)}</div>
              <div className="text-xs text-slate-600">a kiemelt oszlopok: {setList.length === 0 ? 'nincs ilyen eset' : setList.length > 8 ? `${setList[0]}, …, ${setList[setList.length - 1]} (${setList.length} tag)` : setList.join(', ')}</div>
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 space-y-1">
              <div className="font-bold text-amber-800">Melyik út rövidebb?</div>
              {useComplement ? (
                <div>
                  Komplementerrel: 1 − [{compList.length > 6 ? `P(${compList[0]}) + … + P(${compList[compList.length - 1]})` : compList.map((j) => `P(${j})`).join(' + ') || '0'}] – csak {compList.length} tagot kell kiszámolni.
                </div>
              ) : (
                <div>
                  Közvetlenül: {setList.length > 6 ? `P(${setList[0]}) + … + P(${setList[setList.length - 1]})` : setList.map((j) => `P(${j})`).join(' + ') || '0'} – {setList.length} tag.
                </div>
              )}
              <div className="text-xs text-slate-600">ellenőrzés: a komplementer valószínűsége ≈ {fmt(1 - chosen, 4)}, a kettő összege 1.</div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: legalább egy – hány kísérlet kell?" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Egy ritka esemény (pl. vírushordozó utas, selejtes termék) egy kísérletben p valószínűségű. Hány kísérletnél lesz a „legalább egyszer bekövetkezik” valószínűsége elég nagy?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">p = {fmt(q * 100, 1)}%</label>
              <input type="range" min={0.005} max={0.3} step={0.005} value={q} onChange={(e) => setQ(Number(e.target.value))} className="w-full accent-rose-600" aria-label="ritka esemény valószínűsége" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kísérletek száma: n = {m}</label>
              <input type="range" min={1} max={300} value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-teal-600" aria-label="kísérletek száma II" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-slate-600 mb-1">célérték</span>
              <div className="flex gap-1">
                {[0.5, 0.9, 0.95, 0.99].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTarget(t)}
                    className={`px-2 py-1 rounded-lg text-xs font-bold border-2 ${target === t ? 'bg-teal-600 text-white border-teal-700' : 'bg-teal-50 text-teal-800 border-teal-200'}`}
                  >
                    {fmt(t * 100, 0)}%
                  </button>
                ))}
              </div>
            </div>
          </div>
          <svg viewBox="0 0 560 230" className="w-full h-auto max-w-2xl mx-auto" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="556" height="226" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <line x1={sx(0)} y1={sy(t)} x2={sx(curveMax)} y2={sy(t)} stroke="#e2e8f0" />
                <text x={sx(0) - 5} y={sy(t) + 4} fontSize="9" textAnchor="end" fill="#64748b">
                  {fmt(t, 2)}
                </text>
              </g>
            ))}
            <line x1={sx(0)} y1={sy(target)} x2={sx(curveMax)} y2={sy(target)} stroke="#0d9488" strokeDasharray="6 4" />
            <polyline points={curve} fill="none" stroke="#e11d48" strokeWidth="2.5" />
            {minN <= curveMax && (
              <g>
                <line x1={sx(minN)} y1={sy(0)} x2={sx(minN)} y2={sy(target)} stroke="#0d9488" strokeDasharray="3 3" />
                <text x={sx(minN) + 4} y={sy(0) - 6} fontSize="10" fill="#0f766e" fontWeight="bold">
                  n = {minN}
                </text>
              </g>
            )}
            <circle cx={sx(m)} cy={sy(atLeastOne)} r="5" fill="#be123c" />
            <line x1={sx(0)} y1={sy(0)} x2={sx(curveMax)} y2={sy(0)} stroke="#334155" />
            <text x={sx(curveMax)} y="220" fontSize="10" textAnchor="end" fill="#64748b">
              n (0 … {curveMax})
            </text>
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 space-y-1">
              <div className="font-bold text-rose-800">n = {m} kísérlet</div>
              <div className="font-mono">
                P(legalább egy) = 1 − {fmt(1 - q, 3)}
                <Sup>{m}</Sup> ≈ <strong>{fmt(atLeastOne, 4)}</strong>
              </div>
              <div className="text-xs text-slate-600">
                a hibás „összeadós” becslés: {m} · {fmt(q, 3)} = {fmt(m * q, 3)}
                {m * q > 1 ? ' – ez már nagyobb 1-nél, tehát biztosan nem valószínűség!' : ''}
              </div>
            </div>
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1">
              <div className="font-bold text-teal-800">Legalább {fmt(target * 100, 0)}% eléréséhez</div>
              <div>
                legalább <strong>{minN}</strong> kísérlet kell (1 − {fmt(1 - q, 3)}
                <Sup>{minN}</Sup> ≈ {fmt(1 - Math.pow(1 - q, minN), 4)})
              </div>
              <div className="text-xs text-slate-600">2%-os vírushordozásnál 35 utas kell ahhoz, hogy nagyobb eséllyel legyen vírushordozó a buszon, mint ne.</div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ProbabilityPracticeTheory;
