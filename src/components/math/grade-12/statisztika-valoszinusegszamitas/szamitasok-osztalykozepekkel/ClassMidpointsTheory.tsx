import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { NailsHistogramSvg, MidpointConceptSvg, RainfallHistogramSvg, WireToleranceSvg, ScoresHistogramSvg } from './ClassMidpointsFigures';
import { SFig, SBarChart, S_TEAL, hu } from './statKit';

const RAIN = [13, 68, 60, 12, 38, 133, 74, 46, 37, 95, 20, 50, 63, 28, 13, 34, 47, 22, 19, 34, 26, 14, 53, 67];

const meanSd = (vals: number[], freqs: number[]) => {
  const n = freqs.reduce((a, b) => a + b, 0);
  if (!n) return { n: 0, mean: NaN, sd: NaN };
  const mean = vals.reduce((s, x, i) => s + x * freqs[i], 0) / n;
  const v = vals.reduce((s, x, i) => s + freqs[i] * (x - mean) ** 2, 0) / n;
  return { n, mean, sd: Math.sqrt(v) };
};

type Preset = { name: string; unit: string; classes: [number, number][]; freqs: number[] };
const PRESETS: Preset[] = [
  { name: 'szögek (érettségi 2020)', unit: 'db', classes: [[120, 124], [125, 129], [130, 134], [135, 139], [140, 144], [145, 149], [150, 154], [155, 159]], freqs: [1, 2, 6, 17, 10, 7, 5, 2] },
  { name: 'dolgozat pontszámai', unit: 'pont', classes: [[0, 30], [31, 40], [41, 50], [51, 60], [61, 70], [71, 80], [81, 90], [91, 100]], freqs: [0, 2, 8, 21, 9, 9, 1, 0] },
  { name: 'huzaldarabok (mm)', unit: 'mm', classes: [[11.8, 12.8], [12.9, 13.9], [14.0, 15.0], [15.1, 16.1], [16.2, 17.2]], freqs: [2, 4, 13, 5, 1] },
  { name: 'érettségi pontszámok (2018)', unit: 'pont', classes: [[0, 20], [21, 30], [31, 40], [41, 50], [51, 60], [61, 70], [71, 80], [81, 90], [91, 100]], freqs: [0, 8, 12, 8, 18, 20, 12, 16, 6] },
  { name: 'tojások tömege (g)', unit: 'g', classes: [[45, 53], [53, 63], [63, 73], [73, 81]], freqs: [90, 452, 563, 95] }
];

export const ClassMidpointsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: osztályszélesség
  const [width, setWidth] = useState<number>(25);
  const lab1 = useMemo(() => {
    const k = Math.ceil(133 / width);
    const classes = Array.from({ length: k }, (_, i) => [i * width + 1, (i + 1) * width] as [number, number]);
    const freqs = classes.map(([a, b]) => RAIN.filter((x) => x >= a && x <= b).length);
    const mids = classes.map(([a, b]) => (a + b) / 2);
    const est = meanSd(mids, freqs);
    const tru = meanSd(RAIN, RAIN.map(() => 1));
    return { classes, freqs, mids, est, tru };
  }, [width]);

  // Labor II: osztályközepes számoló
  const [pi, setPi] = useState<number>(0);
  const [freqs, setFreqs] = useState<number[]>(PRESETS[0].freqs);
  const preset = PRESETS[pi];
  const mids = preset.classes.map(([a, b]) => (a + b) / 2);
  const ms = meanSd(mids, freqs);
  const cum = freqs.reduce<number[]>((acc, f, i) => [...acc, (acc[i - 1] ?? 0) + f], []);
  const medianClass = (() => {
    if (!ms.n) return -1;
    const pos = ms.n / 2;
    return cum.findIndex((c) => c >= pos);
  })();

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="szamitasok-osztalykozepekkel"
      title="4. Számítások osztályközepekkel"
      subtitle="Osztályokba sorolt adatok átlaga, mediánja és szórása – szögektől a csapadékon át a huzaldarabokig."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="emerald"
      pdfFilename="12_osztaly_szamitasok_osztalykozepekkel_tananyag.pdf"
      practiceTitle="Készen állsz az osztályközepes feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — OSZTÁLYKÖZÉP',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
                osztályközép = (alsó határ + felső határ) / 2 · x̄ ≈ (f₁ · k₁ + … + fₘ · kₘ) / n
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az osztályoknak nem lehet közös része, és együtt minden adatot le kell fedniük.</li>
              <li>A statisztikai jellemzőket úgy számoljuk, mintha minden adat a hozzá tartozó osztályközéppel (k) lenne egyenlő (f: gyakoriság).</li>
              <li>Túl kevés osztály torzít, túl sok osztály nehezíti az elemzést.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Osztályba sorolás és osztályközép" badge="Tankönyv 84. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Az osztályba sorolás segítségével áttekinthetően lehet rendezni, ábrázolni és elemezni az adatokat.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Semelyik két osztálynak <strong>nem lehet közös része</strong>, és együtt az osztályok <strong>fedjék le az összes adatot</strong>.
              </li>
              <li>Torzíthat, ha túl kevés osztályt hozunk létre, és nehezíti az elemzést, ha túl sok az osztály (a dolgozatokat például 5 osztályba – jegyekre – soroljuk).</li>
              <li>
                <strong>Osztályközép:</strong> az osztályt határoló két érték számtani közepe.
              </li>
              <li>Osztályokba sorolt adatok jellemzőit úgy számoljuk, mintha minden adat a hozzá tartozó osztályközéppel lenne egyenlő.</li>
            </ul>
          </div>
          <MidpointConceptSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Kidolgozott feladat: hány szöget vettek?" badge="Érettségi 2020" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <NailsHistogramSvg />
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>50 ember vett egy-egy marék (kb. 10 dkg) acélszöget; a darabszámokat 8 osztályba soroltuk.</li>
            <li>Osztályközepek: (120 + 124) / 2 = 122, majd 127; 132; 137; 142; 147; 152; 157.</li>
            <li>
              <strong>Medián:</strong> 50 adat → a 25. és a 26. adat átlaga. A kumulált gyakoriságok: 1; 3; 9; 26; … – mindkét adat a 135–139 osztályba esik, így a
              medián <strong>137</strong>.
            </li>
            <li>
              <strong>Átlag:</strong> (1 · 122 + 2 · 127 + 6 · 132 + 17 · 137 + 10 · 142 + 7 · 147 + 5 · 152 + 2 · 157) / 50 = 7020 / 50 = <strong>140,4</strong>.
            </li>
          </ul>
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok a tankönyvből" badge="Feladatok" badgeColor="sky">
        <TheoryCard title="A) Békéscsaba havi csapadéka 2020–2021" badge="2. feladat" badgeColor="sky">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <RainfallHistogramSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                <strong>a)</strong> Gyakoriságok: 7; 9; 6; 1; 1 – osztályközepek: 13; 38; 63; 88; 117 mm.
              </li>
              <li>
                <strong>b)</strong> x̄ ≈ (7 · 13 + 9 · 38 + 6 · 63 + 88 + 117) / 24 = 1016 / 24 ≈ <strong>42,3 mm</strong> (a 24 eredeti adat átlaga 44,4 mm).
              </li>
              <li>
                <strong>c)</strong> σ ≈ <strong>26,2 mm</strong> (az osztályközepekkel).
              </li>
              <li>
                <strong>d)</strong> Az átlagtól a szórásnál közelebb (16,2 és 68,5 mm között) az eredeti adatok közül 17 van: 17 / 24 ≈ <strong>70,8%</strong>. Az
                osztályközepekkel számolva csak a 38 és 63 mm-es osztály (9 + 6 = 15 adat) esik ide: 15 / 24 = <strong>62,5%</strong> – a válasz változik.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="B) Egy dolgozat pontszámai (50 tanuló)" badge="3. feladat" badgeColor="purple">
            <ScoresHistogramSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Osztályközepek: 15; 35,5; 45,5; …; 95,5.</li>
              <li>
                x̄ = (2 · 35,5 + 8 · 45,5 + 21 · 55,5 + 9 · 65,5 + 9 · 75,5 + 85,5) / 50 = 2955 / 50 = <strong>59,1 pont</strong>.
              </li>
              <li>
                σ ≈ <strong>11,3 pont</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) A huzalvágó robot ellenőrzése" badge="4. feladat" badgeColor="emerald">
            <WireToleranceSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                <strong>a)</strong> 14,5 ± 1,6 mm → 12,9–16,1 mm: 4 + 13 + 5 = 22 a 25 darabból, azaz <strong>88%</strong> felel meg.
              </li>
              <li>
                <strong>b)</strong> Osztályközepek: 12,3; 13,4; 14,5; 15,6; 16,7 → x̄ = 361,4 / 25 ≈ <strong>14,46 mm</strong>.
              </li>
              <li>
                <strong>c)</strong> σ ≈ <strong>1,01 mm</strong> &lt; 1,2 mm, tehát a minta alapján nem kell állítani a robot működésén.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="D) Házi feladatok: érettségi pontszámok és tojások" badge="HF 1–2." badgeColor="rose">
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>
              <strong>HF 1. (érettségi 2018):</strong> a lehetséges legmagasabb átlag a felső határokkal: (8 · 30 + 12 · 40 + … + 6 · 100) / 100 = <strong>66 pont</strong>;
              osztályközepekkel: <strong>61,5 pont</strong>.
            </li>
            <li>
              <strong>HF 2.:</strong> S: 45–53 g, M: 53–63 g, L: 63–73 g, XL: 73–81 g (legkisebb tojás 45 g, legnagyobb 81 g). Osztályközepek: 49; 58; 68; 77 g, darabszámok 90;
              452; 563; 95 → x̄ ≈ <strong>63,5 g</strong>, σ ≈ <strong>7,1 g</strong>.
            </li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="4. Tipikus hiba: az osztályhatárok és a gyakoriságok" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ne az osztályok számával ossz!"
          wrong="Szögek: (122 + 127 + 132 + 137 + 142 + 147 + 152 + 157) / 8 = 139,5."
          wrongExplanation="Ez csak az osztályközepek egyszerű átlaga; figyelmen kívül hagyja, hogy az egyes osztályokba hány adat esik."
          correct="Súlyozott átlag a gyakoriságokkal: 7020 / 50 = 140,4."
          correctExplanation="Minden osztályközepet annyiszor számolunk, ahány adat az osztályba esik, és az adatok számával (50) osztunk."
          tip="Az osztályközepes eredmény csak közelítés: a csapadékadatoknál a valódi átlag 44,4 mm, az osztályközepes 42,3 mm."
        />
        <TheoryTable
          headers={['Osztály', 'Osztályközép', 'Megjegyzés']}
          rows={[
            ['120–124 db', '122', 'egész értékű adatok: (120 + 124) / 2'],
            ['31–40 pont', '35,5', 'a határok átlaga, nem feltétlenül egész'],
            ['11,8–12,8 mm', '12,3', 'tizedes határok'],
            ['M: 53–63 g', '58', 'a határon lévő tojás a felsőbb kategóriába kerül']
          ]}
        />
      </TheorySection>

      <TheorySection title="5. Interaktív Laboratórium I: Osztályszélesség – becsült és valódi átlag" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <p className="text-sm text-slate-700">A békéscsabai 24 havi csapadékadatot (mm) soroljuk osztályokba: 1–h, (h + 1)–2h, …</p>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Osztályszélesség: h = {width} mm ({lab1.classes.length} osztály)</label>
                <input type="range" min="5" max="70" step="5" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="osztályszélesség" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">becsült átlag / szórás</div>
                  <div className="font-mono font-black text-emerald-900">
                    {hu(lab1.est.mean, 2)} / {hu(lab1.est.sd, 2)} mm
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-[11px] text-slate-500">valódi átlag / szórás</div>
                  <div className="font-mono font-black text-slate-900">
                    {hu(lab1.tru.mean, 2)} / {hu(lab1.tru.sd, 2)} mm
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-700">
                Az átlag eltérése: <strong>{hu(Math.abs(lab1.est.mean - lab1.tru.mean), 2)} mm</strong>. Keskenyebb osztályokkal a becslés általában pontosabb, de
                több osztály nehezebben áttekinthető.
              </p>
            </div>
            <SFig w={300} h={170} className="w-full max-w-[420px] h-auto mx-auto">
              <SBarChart
                x0={30}
                y0={140}
                w={260}
                h={110}
                yMax={Math.max(...lab1.freqs, 1)}
                ticks={[0, Math.max(...lab1.freqs, 1)]}
                showValues={lab1.classes.length <= 14}
                color={S_TEAL}
                gap={0.05}
                labelSize={lab1.classes.length > 8 ? 5.5 : 7}
                tickFmt={(v) => String(v)}
                data={lab1.classes.map(([a, b], i) => ({ label: lab1.classes.length > 10 ? (i % 2 ? '' : String(a)) : `${a}–${b}`, value: lab1.freqs[i] }))}
              />
            </SFig>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium II: Osztályközepes számoló" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => {
                  setPi(i);
                  setFreqs(p.freqs);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${pi === i ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-center border-collapse">
              <thead>
                <tr className="bg-teal-50">
                  <th className="border border-slate-200 p-1.5">osztály ({preset.unit})</th>
                  <th className="border border-slate-200 p-1.5">osztályközép</th>
                  <th className="border border-slate-200 p-1.5">gyakoriság (írható)</th>
                  <th className="border border-slate-200 p-1.5">kumulált gyakoriság</th>
                </tr>
              </thead>
              <tbody>
                {preset.classes.map(([a, b], i) => (
                  <tr key={i} className={i === medianClass ? 'bg-amber-50' : ''}>
                    <td className="border border-slate-200 p-1.5">
                      {hu(a, 1)}–{hu(b, 1)}
                    </td>
                    <td className="border border-slate-200 p-1.5 font-mono">{hu(mids[i], 2)}</td>
                    <td className="border border-slate-200 p-1">
                      <input
                        type="number"
                        min={0}
                        value={freqs[i] ?? 0}
                        onChange={(e) => setFreqs(freqs.map((f, j) => (j === i ? Math.max(0, Number(e.target.value) || 0) : f)))}
                        className="w-20 border border-slate-300 rounded px-1 py-0.5 text-center"
                        aria-label={`gyakoriság ${i + 1}`}
                      />
                    </td>
                    <td className="border border-slate-200 p-1.5 font-mono">{cum[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="bg-teal-50 rounded-xl p-2 border border-teal-200">
              <div className="text-[11px] text-slate-500">adatok száma</div>
              <div className="font-mono font-black text-teal-900">{ms.n}</div>
            </div>
            <div className="bg-teal-50 rounded-xl p-2 border border-teal-200">
              <div className="text-[11px] text-slate-500">átlag (osztályközepekkel)</div>
              <div className="font-mono font-black text-teal-900">{hu(ms.mean, 3)}</div>
            </div>
            <div className="bg-teal-50 rounded-xl p-2 border border-teal-200">
              <div className="text-[11px] text-slate-500">szórás</div>
              <div className="font-mono font-black text-teal-900">{hu(ms.sd, 3)}</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
              <div className="text-[11px] text-slate-500">a medián osztálya</div>
              <div className="font-mono font-black text-amber-900">
                {medianClass >= 0 ? `${hu(preset.classes[medianClass][0], 1)}–${hu(preset.classes[medianClass][1], 1)}` : '–'}
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">A sárga sor az az osztály, amelyben a kumulált gyakoriság először éri el az adatok felét.</p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ClassMidpointsTheory;
