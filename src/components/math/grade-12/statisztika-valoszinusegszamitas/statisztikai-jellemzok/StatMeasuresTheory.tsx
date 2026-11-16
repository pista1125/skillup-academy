import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { StockPricesSvg, ReturnsBarSvg, DeviationTableSvg, StdDevStepsSvg, VolleyballHeightsSvg } from './StatMeasuresFigures';
import { SFig, SText, S_BLUE, S_RED, S_AMBER, S_AXIS } from './statKit';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

const stats = (a: number[]) => {
  const n = a.length;
  if (!n) return null;
  const s = [...a].sort((x, y) => x - y);
  const mean = a.reduce((p, x) => p + x, 0) / n;
  const median = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
  const cnt = new Map<number, number>();
  a.forEach((x) => cnt.set(x, (cnt.get(x) ?? 0) + 1));
  const maxC = Math.max(...cnt.values());
  const modes = maxC > 1 ? [...cnt.entries()].filter(([, c]) => c === maxC).map(([v]) => v).sort((x, y) => x - y) : [];
  const variance = a.reduce((p, x) => p + (x - mean) ** 2, 0) / n;
  return { n, s, mean, median, modes, range: s[n - 1] - s[0], variance, sd: Math.sqrt(variance) };
};

const parse = (t: string) =>
  t
    .split(/[;\s]+/)
    .map((x) => x.replace(',', '.'))
    .filter((x) => x !== '')
    .map(Number)
    .filter((x) => Number.isFinite(x));

export const StatMeasuresTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: adatsor-szerkesztő
  const [text, setText] = useState<string>('168; 168; 170; 170; 170; 171; 171; 171; 171; 172; 172; 172; 175; 175; 175');
  const data = useMemo(() => parse(text), [text]);
  const st = useMemo(() => stats(data), [data]);
  // Labor II: két részvény
  const [ra, setRa] = useState<number[]>([6, 11, -2, 5]);
  const [rb, setRb] = useState<number[]>([10, -4, 12, 2]);
  const sa = stats(ra)!;
  const sb = stats(rb)!;
  const sameMean = Math.abs(sa.mean - sb.mean) < 1e-9;
  const relA = sa.mean !== 0 ? sa.sd / Math.abs(sa.mean) : Infinity;
  const relB = sb.mean !== 0 ? sb.sd / Math.abs(sb.mean) : Infinity;
  let verdict: string;
  if (sameMean) verdict = sa.sd === sb.sd ? 'Egyforma átlag és szórás: egyformán kockázatosak.' : `Az átlagos hozam azonos, ezért a nagyobb szórású ${sa.sd > sb.sd ? 'A' : 'B'} részvény a kockázatosabb.`;
  else verdict = `Az átlagok eltérnek, ezért a relatív szórást (σ / x̄) hasonlítjuk össze: a(z) ${relA > relB ? 'A' : 'B'} részvény a kockázatosabb.`;

  // pontdiagram a laborhoz
  const plot = (() => {
    if (!st) return null;
    const lo = Math.min(st.s[0], st.mean - st.sd);
    const hi = Math.max(st.s[st.n - 1], st.mean + st.sd);
    const span = hi - lo || 1;
    const X = (v: number) => 20 + ((v - lo) / span) * 280;
    const stack = new Map<number, number>();
    return (
      <SFig w={320} h={130} className="w-full max-w-[460px] h-auto mx-auto">
        <rect x={X(st.mean - st.sd)} y={20} width={X(st.mean + st.sd) - X(st.mean - st.sd)} height={80} fill={S_AMBER} fillOpacity={0.12} />
        <line x1={X(st.mean)} y1={18} x2={X(st.mean)} y2={102} stroke={S_RED} strokeWidth={1.6} strokeDasharray="4 3" />
        <SText x={X(st.mean)} y={14} t={`x̄ = ${fmt(st.mean)}`} s={8} c={S_RED} b />
        <line x1={X(st.median)} y1={22} x2={X(st.median)} y2={102} stroke={S_BLUE} strokeWidth={1.2} />
        <SText x={X(st.mean - st.sd)} y={30} t="x̄ − σ" s={7} c={S_AMBER} a="start" />
        <SText x={X(st.mean + st.sd)} y={30} t="x̄ + σ" s={7} c={S_AMBER} a="end" />
        {st.s.map((v, i) => {
          const k = stack.get(v) ?? 0;
          stack.set(v, k + 1);
          return <circle key={i} cx={X(v)} cy={96 - k * 9} r={3.6} fill={S_BLUE} fillOpacity={0.8} />;
        })}
        <line x1={20} y1={104} x2={300} y2={104} stroke={S_AXIS} />
        <SText x={20} y={118} t={fmt(lo)} s={7.5} c={S_AXIS} a="start" />
        <SText x={300} y={118} t={fmt(hi)} s={7.5} c={S_AXIS} a="end" />
        <SText x={160} y={118} t="kék vonal: medián · sáv: x̄ ± σ" s={7.5} c={S_AXIS} />
      </SFig>
    );
  })();

  const slider = (arr: number[], set: (a: number[]) => void, i: number, color: string, name: string) => (
    <div key={name + i}>
      <label className="block text-[11px] font-semibold text-slate-600">
        {name} {2019 + i}: {arr[i]}%
      </label>
      <input
        type="range"
        min="-15"
        max="25"
        value={arr[i]}
        onChange={(e) => set(arr.map((v, j) => (j === i ? Number(e.target.value) : v)))}
        className={`w-full ${color}`}
        aria-label={`${name} ${2019 + i}`}
      />
    </div>
  );

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="statisztikai-jellemzok"
      title="2. Statisztikai jellemzők"
      subtitle="Átlag, medián, módusz, terjedelem – és a szórás, amellyel a befektetések kockázatát mérik."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_statisztikai_jellemzok_tananyag.pdf"
      practiceTitle="Készen állsz a statisztikai jellemzők feladataira?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A SZÓRÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
                σ = √( ((x₁ − x̄)² + (x₂ − x̄)² + … + (xₙ − x̄)²) / n )
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>x̄</strong> az adatok átlaga, <strong>σ</strong> a szórás, <strong>σ²</strong> a szórásnégyzet.
              </li>
              <li>A szórás azt méri, mennyire szóródnak az adatok az átlag körül (mértékegysége az adatokéval egyezik).</li>
              <li>Azonos átlagos hozam esetén a nagyobb szórású részvény a kockázatosabb; eltérő átlagnál a relatív szórást (σ / x̄) hasonlítjuk.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Bevezető: a hozam és a kockázat" badge="Tankönyv 78. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Ha egy részvény árfolyama egy év alatt 5%-kal nő, a <strong>hozama</strong> 5%; ha 5%-kal csökken, a hozama −5%.
            </p>
            <p>
              Ha egy részvény hozama három egymás utáni évben 6%, 4%, 5%, az átlagos hozam 5%. Egy másik részvény hozama ugyanekkor 10%, −2%, 10%: az átlag
              6% – magasabb, de jóval nagyobb a hozam <strong>szórása</strong> (≈ 5,66% a ≈ 0,82%-kal szemben), ezért ez a részvény kockázatosabb.
            </p>
            <p className="text-xs text-slate-500">
              (A múltbeli hozamok és szórások a jövőbeli árfolyamokról nem adnak egyértelmű információt.)
            </p>
          </div>
          <StockPricesSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Ismétlés: a statisztikai jellemzők" badge="Elmélet" badgeColor="teal">
        <TheoryTable
          headers={['Jellemző', 'Meghatározás', 'Példa: 6; 11; −2; 5']}
          rows={[
            ['átlag (x̄)', 'az adatok összege osztva az adatok számával', '(6 + 11 − 2 + 5) / 4 = 5'],
            ['medián', 'a nagyság szerint rendezett adatok középső eleme (páros számnál a két középső átlaga)', '−2; 5; 6; 11 → (5 + 6) / 2 = 5,5'],
            ['módusz', 'a leggyakoribb adat (lehet több is, vagy nincs)', 'nincs (mind egyszer szerepel)'],
            ['terjedelem', 'a legnagyobb és a legkisebb adat különbsége', '11 − (−2) = 13'],
            ['szórás (σ)', 'az átlagtól való eltérések négyzetei átlagának négyzetgyöke', '√21,5 ≈ 4,64'],
            ['relatív szórás', 'σ / x̄', '4,64 / 5 ≈ 0,93']
          ]}
        />
        <div className="mt-4">
          <StdDevStepsSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat: melyik részvény kockázatosabb?" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700">
            <TheoryTable
              headers={['Év', '2018', '2019', '2020', '2021', '2022']}
              rows={[
                ['A árfolyam (Ft)', '2600', '2756', '3060', '3000', '3150'],
                ['A hozam', '–', '6%', '11%', '−2%', '5%'],
                ['B árfolyam (Ft)', '4700', '5170', '4963', '5560', '5670'],
                ['B hozam', '–', '10%', '−4%', '12%', '2%']
              ]}
            />
            <p>
              Pl. 2756 / 2600 = 1,06, tehát 2019-ben az A hozama 6%; 4963 / 5170 = 0,96, a B hozama 2020-ban −4%.
            </p>
          </div>
          <ReturnsBarSvg />
        </div>
        <DeviationTableSvg className="w-full max-w-[600px] h-auto mx-auto my-3" />
        <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
          <li>Az átlagos hozam mindkét részvénynél 5%: (6 + 11 − 2 + 5) / 4 = 5 és (10 − 4 + 12 + 2) / 4 = 5.</li>
          <li>
            σ<sub>A</sub> = √((1 + 36 + 49 + 0) / 4) = √21,5 ≈ <strong>4,64%</strong>, σ<sub>B</sub> = √((25 + 81 + 49 + 9) / 4) = √41 ≈ <strong>6,40%</strong>.
          </li>
          <li>
            Az átlagos hozam azonos, ezért a nagyobb szórású <strong>B részvény a kockázatosabb</strong> – éves hozama változékonyabb volt.
          </li>
        </ul>
        <TheoryCallout type="info" title="Relatív szórás">
          Ha két részvény átlagos hozama különböző, akkor a relatív szórást vesszük figyelembe: a szórást elosztjuk az átlaggal (σ / x̄).
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. További feladatok a tankönyvből" badge="Feladatok" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Árfolyam 2015–2019" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Árfolyamok: 6150; 7380; 7011; 8063; 8789 Ft.</li>
              <li>Hozamok: 7380 / 6150 = 1,2 → 20%; 7011 / 7380 = 0,95 → −5%; 8063 / 7011 ≈ 1,15 → 15%; 8789 / 8063 ≈ 1,09 → 9%.</li>
              <li>
                Átlag: (20 − 5 + 15 + 9) / 4 = <strong>9,75%</strong>; szórás: √((10,25² + 14,75² + 5,25² + 0,75²) / 4) ≈ <strong>9,36%</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hozamok 15%, 12%, 3%, 8%" badge="Házi feladat 1." badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Átlag: (15 + 12 + 3 + 8) / 4 = <strong>9,5%</strong>.</li>
              <li>Eltérések: 5,5; 2,5; −6,5; −1,5 → négyzetek: 30,25; 6,25; 42,25; 2,25 (összeg 81).</li>
              <li>
                σ = √(81 / 4) = √20,25 = <strong>4,5%</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Serdülő-röplabdacsapat testmagassága (gyakorisági táblázat)" badge="Házi feladat 2." badgeColor="emerald">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <VolleyballHeightsSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Gyakoriságok: 168 cm (2), 170 cm (3), 171 cm (4), 172 cm (3), 175 cm (3); összesen 15 játékos.</li>
              <li>
                Súlyozott átlag: (2 · 168 + 3 · 170 + 4 · 171 + 3 · 172 + 3 · 175) / 15 = 2571 / 15 = <strong>171,4 cm</strong>.
              </li>
              <li>
                Szórás: √((2 · 3,4² + 3 · 1,4² + 4 · 0,4² + 3 · 0,6² + 3 · 3,6²) / 15) = √(69,6 / 15) ≈ <strong>2,15 cm</strong>.
              </li>
              <li>Módusz: 171 cm, medián (8. adat): 171 cm.</li>
            </ul>
          </div>
        </TheoryCard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="D) A nehézségi gyorsulás 40 mérése" badge="2. feladat" badgeColor="amber">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                Gyakorisági táblázat (m/s²): 9,70 (2), 9,75 (7), 9,80 (10), 9,85 (8), 9,90 (7), 9,95 (6); összesen 40 mérés.
              </li>
              <li>Módusz: <strong>9,80</strong> (10-szer mérték).</li>
              <li>Medián: a halmozott gyakoriságok 2; 9; 19; 27; …, a 20. és 21. adat 9,85 → medián <strong>9,85</strong>.</li>
              <li>
                Átlag: (2 · 9,70 + 7 · 9,75 + 10 · 9,80 + 8 · 9,85 + 7 · 9,90 + 6 · 9,95) / 40 = 393,45 / 40 ≈ <strong>9,84</strong>.
              </li>
              <li>Szórás: σ² ≈ 0,00525, σ ≈ <strong>0,072</strong> m/s².</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Fiúk és lányok a négy végzős osztályban" badge="3. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A diagramról: 12. a: 18 fiú, 14 lány; 12. b: 24 fiú, 6 lány; 12. c: 18 fiú, 17 lány; 12. d: 12 fiú, 15 lány.</li>
              <li>a) A legkisebb létszámú osztály a 12. d (27 fő): 15 / 12 = 1,25 → a lányok száma a fiúkénak <strong>125%</strong>-a.</li>
              <li>
                b) Lányok: 14; 6; 17; 15 → terjedelem <strong>11</strong>, átlag <strong>13</strong>, szórás √((1 + 49 + 16 + 4) / 4) = √17,5 ≈{' '}
                <strong>4,18</strong>.
              </li>
              <li>c) 12. b: 30 · 4,1 = 123, a lányoké 6 · 4,5 = 27, a 24 fiúé 96 → átlaguk <strong>4,0</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: a szórásnégyzet nem a szórás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ne felejts el gyököt vonni!"
          wrong="Az A részvény hozamának szórása 21,5%."
          wrongExplanation="A 21,5 az eltérésnégyzetek átlaga, vagyis a szórásnégyzet (σ²). Ennek mértékegysége „százalék a négyzeten”, nem összevethető a hozamokkal."
          correct="σ = √21,5 ≈ 4,64%."
          correctExplanation="A szórást a szórásnégyzetből gyökvonással kapjuk; így a mértékegysége ugyanaz, mint az adatoké."
          tip="Gyakori hiba az is, ha az eltérések négyzete helyett az eltéréseket átlagolod – azok összege mindig 0!"
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: Adatsor-szerkesztő" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Adatok (pontosvesszővel vagy szóközzel elválasztva, tizedesvessző is jó)</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono"
              aria-label="adatok"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                ['röplabdacsapat', '168; 168; 170; 170; 170; 171; 171; 171; 171; 172; 172; 172; 175; 175; 175'],
                ['A részvény', '6; 11; -2; 5'],
                ['B részvény', '10; -4; 12; 2'],
                ['1. feladat hozamai', '20; -5; 15; 9']
              ].map(([n, v]) => (
                <button key={n} onClick={() => setText(v)} className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                  {n}
                </button>
              ))}
            </div>
          </div>
          {st ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                {[
                  ['n', String(st.n)],
                  ['átlag x̄', fmt(st.mean)],
                  ['medián', fmt(st.median)],
                  ['módusz', st.modes.length ? st.modes.map((m) => fmt(m, 1)).join('; ') : 'nincs'],
                  ['terjedelem', fmt(st.range)],
                  ['szórásnégyzet σ²', fmt(st.variance)],
                  ['szórás σ', fmt(st.sd)],
                  ['relatív szórás σ / x̄', st.mean !== 0 ? fmt(st.sd / Math.abs(st.mean)) : '–']
                ].map(([t, v]) => (
                  <div key={t} className="bg-indigo-50 rounded-xl p-2 border border-indigo-200">
                    <div className="text-[11px] text-slate-500">{t}</div>
                    <div className="font-mono font-black text-indigo-900">{v}</div>
                  </div>
                ))}
              </div>
              {plot}
            </>
          ) : (
            <p className="text-sm text-rose-600">Adj meg legalább egy számot!</p>
          )}
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: Melyik részvény a kockázatosabb?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-black text-blue-700">A részvény hozamai</div>
              {ra.map((_, i) => slider(ra, setRa, i, 'accent-blue-600', 'A'))}
            </div>
            <div className="space-y-2">
              <div className="text-sm font-black text-amber-700">B részvény hozamai</div>
              {rb.map((_, i) => slider(rb, setRb, i, 'accent-amber-600', 'B'))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center">
            <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
              <div className="text-[11px] text-slate-500">A: x̄ / σ</div>
              <div className="font-mono font-black text-blue-900">
                {fmt(sa.mean)}% / {fmt(sa.sd)}%
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
              <div className="text-[11px] text-slate-500">B: x̄ / σ</div>
              <div className="font-mono font-black text-amber-900">
                {fmt(sb.mean)}% / {fmt(sb.sd)}%
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-2 border border-purple-200 col-span-2 sm:col-span-1">
              <div className="text-[11px] text-slate-500">relatív szórás A / B</div>
              <div className="font-mono font-black text-purple-900">
                {Number.isFinite(relA) ? fmt(relA) : '–'} / {Number.isFinite(relB) ? fmt(relB) : '–'}
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-sm text-purple-900 font-semibold">{verdict}</div>
          <button
            onClick={() => {
              setRa([6, 11, -2, 5]);
              setRb([10, -4, 12, 2]);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700"
          >
            vissza a tankönyvi adatokhoz
          </button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default StatMeasuresTheory;
