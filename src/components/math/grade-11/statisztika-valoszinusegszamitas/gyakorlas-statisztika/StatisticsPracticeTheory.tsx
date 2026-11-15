import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  StatisticsPracticeAgePieSvg,
  StatisticsPracticeAgeBoxPlotSvg,
  StatisticsPracticeTwelveNumbersSvg,
  StatisticsPracticeSplitTimesSvg,
  StatisticsPracticeMissingDataSvg,
  StatisticsPracticeBoxPlot
} from './StatisticsPracticeFigures';

/* ---------- statisztikai segédfüggvények (a tankönyv kvartilis-módszerével) ---------- */
const median = (sorted: number[]): number => {
  const n = sorted.length;
  if (n === 0) return NaN;
  return n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
};

interface StatisticsSummary {
  n: number;
  sorted: number[];
  mean: number;
  median: number;
  modes: number[];
  min: number;
  max: number;
  q1: number;
  q3: number;
  sigma: number;
}

/** Páratlan elemszámnál a mediánt kihagyjuk a két félből (tankönyvi módszer). */
const summarizeData = (data: number[]): StatisticsSummary | null => {
  if (data.length === 0) return null;
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((s, x) => s + x, 0) / n;
  const h = Math.floor(n / 2);
  const lower = sorted.slice(0, h);
  const upper = sorted.slice(n % 2 ? h + 1 : h);
  const freq = new Map<number, number>();
  sorted.forEach((x) => freq.set(x, (freq.get(x) ?? 0) + 1));
  const top = Math.max(...freq.values());
  const modes = top === 1 && n > 1 ? [] : [...freq.entries()].filter(([, f]) => f === top).map(([v]) => v);
  const sigma = Math.sqrt(sorted.reduce((s, x) => s + (x - mean) ** 2, 0) / n);
  return {
    n,
    sorted,
    mean,
    median: median(sorted),
    modes,
    min: sorted[0],
    max: sorted[n - 1],
    q1: n > 1 ? median(lower) : sorted[0],
    q3: n > 1 ? median(upper) : sorted[0],
    sigma
  };
};

const fmtHu = (x: number, digits = 2): string => {
  if (!Number.isFinite(x)) return '–';
  const r = Math.round(x * 10 ** digits) / 10 ** digits;
  return String(r).replace('.', ',').replace('-', '−');
};

const parseDataList = (text: string): number[] =>
  text
    .split(/[;\s]+/)
    .map((t) => t.trim().replace(',', '.').replace('−', '-'))
    .filter((t) => t.length > 0)
    .map(Number)
    .filter((x) => Number.isFinite(x))
    .slice(0, 60);

const PRESETS: { label: string; text: string }[] = [
  { label: '12 szám (2. feladat)', text: '6; 4; 5; 5; 1; 10; 7; 6; 11; 2; 6; 5' },
  { label: 'HF 2. (x = 20)', text: '18; 21; 15; 20; 20; 18; 16; 22; 20' },
  { label: 'Milák részidői', text: '24,66; 28,22; 28,69; 29,16' },
  { label: 'Kosárlabda (HF 1.)', text: '77; 60; 83; 73; 90; 67' },
  { label: 'Kezdőcsapat (HF 3.)', text: '19; 22; 22; 24; 26; 31' }
];

export const StatisticsPracticeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: adatsor-elemző
  const [dataText, setDataText] = useState<string>(PRESETS[0].text);
  const data = useMemo(() => parseDataList(dataText), [dataText]);
  const s = summarizeData(data);
  const axisFrom = s ? Math.floor(s.min - Math.max(1, (s.max - s.min) * 0.1)) : 0;
  const axisTo = s ? Math.ceil(s.max + Math.max(1, (s.max - s.min) * 0.1)) : 10;
  const axisStep = Math.max(1, Math.ceil((axisTo - axisFrom) / 10));

  // Labor II: új adat hozzávétele
  const [baseText, setBaseText] = useState<string>('2; 4; 4; 4; 5; 5; 7; 9');
  const base = useMemo(() => parseDataList(baseText), [baseText]);
  const sb = summarizeData(base);
  const [newValue, setNewValue] = useState<number>(5);
  const after = summarizeData([...base, newValue]);
  const change = (a: number, b: number) => (Math.abs(a - b) < 1e-9 ? 'nem változott' : b > a ? 'nőtt' : 'csökkent');

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="gyakorlas-statisztika"
      title="6. Gyakorlás"
      subtitle="Statisztikai összefoglaló érettségi feladatokkal: kördiagram, medián és kvartilisek, dobozdiagram, hiányzó adat és szórás."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_statisztika_gyakorlas_tananyag.pdf"
      practiceTitle="Készen állsz a statisztikai gyakorlásra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — STATISZTIKAI MUTATÓK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              x̄ = (x₁ + … + xₙ) / n;   σ = √( ((x₁ − x̄)² + … + (xₙ − x̄)²) / n )
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Középértékek:</strong> átlag, medián (a rendezett sor közepe), módusz (a leggyakoribb adat).
              </li>
              <li>
                <strong>Kvartilisek:</strong> a mediánnal kettéosztjuk a rendezett adatsort (páratlan elemszámnál a mediánt elhagyjuk), és vesszük a két fél mediánját: Q1 és Q3.
              </li>
              <li>
                <strong>Szóródás:</strong> terjedelem = max − min; félterjedelem = Q3 − Q1; szórás σ.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglaló */}
      <TheorySection title="1. Összefoglaló: amit eddig tanultunk" badge="Összefoglalás" badgeColor="sky">
        <div className="space-y-4">
          <TheoryTable
            headers={['Mutató', 'Jelentése', 'Példa: 1, 2, 3, 3, 4, 5, 5, 6, 6']}
            rows={[
              ['átlag (x̄)', 'az adatok összege osztva a darabszámmal', '35 / 9 ≈ 3,89'],
              ['medián (Me)', 'a nagyság szerint rendezett sor középső eleme (páros n: a két középső átlaga)', '4'],
              ['módusz', 'a legtöbbször előforduló adat (több is lehet)', '3; 5 és 6'],
              ['alsó kvartilis (Q1)', 'az alsó fél mediánja', '(2 + 3) / 2 = 2,5'],
              ['felső kvartilis (Q3)', 'a felső fél mediánja', '(5 + 6) / 2 = 5,5'],
              ['terjedelem', 'legnagyobb − legkisebb adat', '6 − 1 = 5'],
              ['félterjedelem', 'Q3 − Q1 (az adatok kb. 50%-a ebbe a sávba esik)', '5,5 − 2,5 = 3'],
              ['szórás (σ)', 'az átlagtól való eltérések négyzetes átlagának négyzetgyöke', '≈ 1,66']
            ]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCallout type="info" title="Dobozdiagram">
              A doboz két széle Q1 és Q3, a dobozon belüli vonal a medián, a „bajuszok” a minimumig és a maximumig tartanak. Kiugró adat az, amely Q1-nél legalább a félterjedelem másfélszeresével kisebb, vagy Q3-nál legalább ennyivel nagyobb.
            </TheoryCallout>
            <TheoryCallout type="tip" title="Hogyan változnak a mutatók?">
              Ha minden adathoz c-t adunk, az átlag, a medián és a kvartilisek c-vel nőnek, a szórás és a terjedelem nem változik. Ha minden adatot k-szorosára (k &gt; 0) változtatunk, minden mutató – a szórás is – k-szorosára változik.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 2. Kördiagram */}
      <TheorySection title="2. Érettségi feladat (2020): életkorok a kördiagramon (1. feladat)" badge="Tankönyv 178. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy több száz fős gimnázium diákjainak életkor szerinti megoszlását mutatja a kördiagram. Állapítsuk meg a <strong>terjedelmet, a móduszt és a mediánt</strong>, és készítsünk dobozdiagramot!
            </p>
            <TheoryCard title="Megoldás" badge="Lépésenként" badgeColor="sky">
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Terjedelem: 20 − 14 = <strong>6 év</strong>.</li>
                <li>Módusz: a legnagyobb szelet, a 23% → <strong>16 év</strong>.</li>
                <li>
                  Halmozott relatív gyakoriságok: 14 év: 14%, 15 év: 32%, 16 év: 55%, 17 év: 76%, 18 év: 86%, 19 év: 94%, 20 év: 100%.
                </li>
                <li>Medián: az 50% a 16 évesek közé esik → <strong>Me = 16 év</strong>.</li>
                <li>Q1: a 25% a 15 évesek közé esik → Q1 = 15; Q3: a 75% a 17 évesek közé esik → Q3 = 17.</li>
                <li>Átlag (súlyozott): 14 · 0,14 + 15 · 0,18 + … + 20 · 0,06 = 16,43 év.</li>
              </ul>
            </TheoryCard>
          </div>
          <div className="space-y-3">
            <StatisticsPracticeAgePieSvg />
            <StatisticsPracticeAgeBoxPlotSvg />
          </div>
        </div>
      </TheorySection>

      {/* 3. Tizenkét szám */}
      <TheorySection title="3. Érettségi feladat alapján (2009): melyik számot hagyjuk el? (2. feladat)" badge="Tankönyv 178. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Adott 12 szám: 6; 4; 5; 5; 1; 10; 7; 6; 11; 2; 6; 5. Melyik a legnagyobb olyan szám, amelynek elhagyásával a megmaradt 11 szám
              a) mediánja 6; b) alsó kvartilise 4; c) felső kvartilise 7?
            </p>
            <p>
              Rendezve: 1, 2, 4, 5, 5, 5, 6, 6, 6, 7, 10, 11. A 11 megmaradó számnál a medián a <strong>6.</strong>, az alsó kvartilis a <strong>3.</strong>, a felső kvartilis a <strong>9.</strong> elem.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> A 6. elem csak akkor lesz 6, ha egy 6-nál kisebb számot hagyunk el; ezek közül a legnagyobb az <strong>5</strong>. (Egy 6-os elhagyásakor a medián 5 maradna.)
              </li>
              <li>
                <strong>b)</strong> Az első három elem (1, 2, 4) változatlan marad, ha egy 4-nél nagyobbat hagyunk el – a legnagyobb ilyen a <strong>11</strong>.
              </li>
              <li>
                <strong>c)</strong> A 9. elem akkor lesz 7, ha a 7 előtti számok egyikét hagyjuk el; a legnagyobb ilyen a <strong>6</strong>.
              </li>
            </ul>
          </div>
          <StatisticsPracticeTwelveNumbersSvg />
        </div>
      </TheorySection>

      {/* 4. Szórás, új adat */}
      <TheorySection title="4. Érettségi feladat alapján (2021): új adat és a szórás (3. feladat)" badge="Tankönyv 178–179. o." badgeColor="violet">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Két kisvállalkozás négy-négy dolgozójának havi fizetését és a cégen belüli átlagot ábrázolja a tankönyvi diagram. <strong>a)</strong> Annál a cégnél nagyobb a szórás, ahol a fizetések jobban eltérnek az átlagtól.
            <strong> b)</strong> Ha az M. Kft.-hez felvett új dolgozó után nem változott az átlag, akkor az új fizetés éppen a korábbi <strong>átlaggal egyenlő</strong>.
          </p>
          <TheoryCard title="c) Mi történik a szórással, ha az átlagot adjuk hozzá új adatként?" badge="Általánosan" badgeColor="violet">
            <p className="text-sm">
              Az eltérés-négyzetek összege nem változik (az új adat eltérése 0), de az osztó n helyett n + 1 lesz:
            </p>
            <p className="font-mono text-center my-2">σ′² = n · σ² / (n + 1), tehát σ′ = σ · √(n / (n + 1)) &lt; σ (ha σ &gt; 0).</p>
            <p className="text-sm">
              Példa: 1, 1, 5, 5 → x̄ = 3, σ = 2. Hozzávéve a 3-at: σ′ = 2 · √(4/5) ≈ 1,79. A szórás <strong>csökken</strong> (ha minden adat egyenlő volt, 0 marad).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Milák */}
      <TheorySection title="5. Részidők szórása – Milák Kristóf világcsúcsa (4. feladat)" badge="Tankönyv 179. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Részidők: 50 m: 24,66; 100 m: 52,88; 150 m: 1:21,57 = 81,57 s; 200 m: 1:50,73 = 110,73 s.
            </p>
            <TheoryTable
              headers={['Szakasz', 'Számolás', 'Idő (s)', 'xᵢ − x̄', '(xᵢ − x̄)²']}
              rows={[
                ['1.', '24,66', '24,66', '−3,0225', '9,1355'],
                ['2.', '52,88 − 24,66', '28,22', '0,5375', '0,2889'],
                ['3.', '81,57 − 52,88', '28,69', '1,0075', '1,0151'],
                ['4.', '110,73 − 81,57', '29,16', '1,4775', '2,1830']
              ]}
            />
            <p>
              Átlag: 110,73 / 4 = 27,6825 s. Szórásnégyzet: 12,6225 / 4 ≈ 3,1556, így <strong>σ ≈ 1,78 s</strong>. Az első szakasz azért ilyen gyors, mert a rajtnál fejesugrással indul a versenyző.
            </p>
          </div>
          <StatisticsPracticeSplitTimesSvg />
        </div>
      </TheorySection>

      {/* 6. Házi feladatok */}
      <TheorySection title="6. Házi feladatok – kidolgozva" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="HF 1. (érettségi, 2021): hiányzó pontszám" badge="Feladat" badgeColor="amber">
            <p className="text-sm text-slate-700">
              Eddig 77 + 60 + 83 + 73 + 90 = 383 pont. Hat mérkőzés 75-ös átlagához 6 · 75 = 450 pont kell, így a következő mérkőzésen <strong>450 − 383 = 67</strong> pontot kell szerezni.
            </p>
          </TheoryCard>
          <TheoryCard title="HF 3. (érettségi, 2012): vízilabdacsapat" badge="Feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a) Az életkorok összege 289, az átlag 289 / 13 ≈ <strong>22,2 év</strong>.</li>
              <li>
                b) Hat játékos, összeg 6 · 24 = 144. A medián 23 ⇒ a 3. és a 4. életkor összege 46; az egyetlen módusz 22 ⇒ 22, 22, 24 a középen. A szélsők különbsége 12, és a keretben szereplő életkorok közül csak a <strong>19, 22, 22, 24, 26, 31</strong> felel meg.
              </li>
            </ul>
          </TheoryCard>
          <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TheoryCard title="HF 2.: a hiányzó adat" badge="Feladat" badgeColor="sky">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>Az ismert adatok: 15, 16, 18, 18, 20, 20, 21, 22. A terjedelem 7 = 22 − 15, így a hiányzó adat 15 és 22 közé esik.</li>
                <li>A medián (9 adatnál az 5. elem) csak akkor 20, ha a hiányzó adat legalább 20.</li>
                <li>Q1 = (16 + 18) / 2 = 17 teljesül; Q3 = 20,5 csak akkor, ha a felső fél 20, 20, 21, 22 → a hiányzó adat <strong>20</strong>.</li>
                <li>Átlag: 170 / 9 ≈ 18,89; szórás: <strong>σ ≈ 2,18</strong>.</li>
              </ul>
            </TheoryCard>
            <StatisticsPracticeMissingDataSvg />
          </div>
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: félterjedelem ≠ a terjedelem fele" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mennyi a 15, 16, 18, 18, 20, 20, 20, 21, 22 adatsor félterjedelme?"
          wrong="(22 − 15) / 2 = 3,5, mert a félterjedelem a terjedelem fele"
          wrongExplanation="A félterjedelem nem a terjedelem fele! Itt csak véletlenül jön ki ugyanaz a szám – a 12 szám esetén (terjedelem 10, félterjedelem 6,5 − 4,5 = 2) már nem."
          correct="Félterjedelem = Q3 − Q1 = 20,5 − 17 = 3,5"
          correctExplanation="A félterjedelem a két kvartilis különbsége, azt a sávot adja meg, amelybe az adatok középső kb. 50%-a esik."
          tip="Páratlan elemszámnál a kvartilisekhez a mediánt hagyd ki a két félből, páros elemszámnál egyszerűen felezd meg a rendezett adatsort."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: adatsor-elemző dobozdiagrammal" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">adatok (pontosvesszővel vagy szóközzel elválasztva, tizedesvessző is jó)</label>
            <input
              type="text"
              value={dataText}
              onChange={(e) => setDataText(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-sky-200 font-mono"
              aria-label="adatok"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setDataText(p.text)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100"
              >
                {p.label}
              </button>
            ))}
          </div>
          {!s ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">Adj meg legalább egy számot!</div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm font-mono bg-slate-50 rounded-lg p-2 border border-slate-200">
                rendezve (n = {s.n}): {s.sorted.map((x) => fmtHu(x)).join('; ')}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                {[
                  ['átlag', fmtHu(s.mean, 3)],
                  ['medián', fmtHu(s.median)],
                  ['módusz', s.modes.length ? s.modes.map((x) => fmtHu(x)).join('; ') : 'nincs'],
                  ['terjedelem', fmtHu(s.max - s.min)],
                  ['szórás σ', fmtHu(s.sigma, 3)],
                  ['minimum', fmtHu(s.min)],
                  ['Q1', fmtHu(s.q1)],
                  ['Q3', fmtHu(s.q3)],
                  ['maximum', fmtHu(s.max)],
                  ['félterjedelem', fmtHu(s.q3 - s.q1)]
                ].map(([k, v]) => (
                  <div key={k} className="bg-sky-50 rounded-xl border border-sky-200 p-2 text-center">
                    <div className="text-[11px] text-sky-700 font-semibold">{k}</div>
                    <div className="font-bold text-sky-950">{v}</div>
                  </div>
                ))}
              </div>
              <svg viewBox="0 0 440 120" className="w-full max-w-xl mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="436" height="116" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
                <StatisticsPracticeBoxPlot
                  min={s.min}
                  q1={s.q1}
                  med={s.median}
                  q3={s.q3}
                  max={s.max}
                  axisFrom={axisFrom}
                  axisTo={axisTo}
                  step={axisStep}
                  x0={30}
                  x1={410}
                  y={46}
                />
              </svg>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: hogyan változnak a mutatók egy új adattól?" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">az eredeti adatsor</label>
              <input
                type="text"
                value={baseText}
                onChange={(e) => setBaseText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-violet-200 font-mono"
                aria-label="eredeti adatsor"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">az új adat: {fmtHu(newValue)}</label>
              <input
                type="range"
                min={-10}
                max={30}
                step={0.5}
                value={newValue}
                onChange={(e) => setNewValue(Number(e.target.value))}
                className="w-full accent-violet-600"
                aria-label="új adat"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => sb && setNewValue(Math.round(sb.mean * 2) / 2)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 text-violet-800 hover:bg-violet-100"
                >
                  az átlagot veszem hozzá
                </button>
                <button
                  onClick={() => sb && setNewValue(Math.min(30, sb.max + 10))}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 text-violet-800 hover:bg-violet-100"
                >
                  kiugró adat
                </button>
              </div>
            </div>
          </div>
          {!sb || !after ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">Adj meg legalább egy számot!</div>
          ) : (
            <TheoryTable
              headers={['Mutató', 'Előtte', 'Utána', 'Változás']}
              rows={[
                ['elemszám', String(sb.n), String(after.n), 'nőtt'],
                ['átlag', fmtHu(sb.mean, 3), fmtHu(after.mean, 3), change(sb.mean, after.mean)],
                ['medián', fmtHu(sb.median), fmtHu(after.median), change(sb.median, after.median)],
                ['terjedelem', fmtHu(sb.max - sb.min), fmtHu(after.max - after.min), change(sb.max - sb.min, after.max - after.min)],
                ['szórás σ', fmtHu(sb.sigma, 3), fmtHu(after.sigma, 3), change(sb.sigma, after.sigma)]
              ]}
            />
          )}
          <TheoryCallout type="tip" title="Figyeld meg!">
            Ha az új adat éppen az átlag, az átlag nem változik, a szórás viszont csökken (3. feladat c). Egy kiugró adat az átlagot és a szórást erősen elmozdítja, a mediánt alig.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default StatisticsPracticeTheory;
