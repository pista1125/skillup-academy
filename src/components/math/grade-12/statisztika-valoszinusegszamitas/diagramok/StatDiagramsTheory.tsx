import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { DetergentMisleadingSvg, BoxPlotAnatomySvg, SwimmerBoxPlotSvg, BeamonOutlierSvg, MilakBoxPlotsSvg, StaffPieSvg } from './StatDiagramsFigures';
import { SFig, SBarChart, SBoxPlot, SText, S_RED, S_GREEN, S_PURPLE, hu } from './statKit';

const fmt = (x: number, d = 3) => hu(x, d);

const median = (s: number[]) => {
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
};

/** Tankönyvi kvartilis-módszer: páratlan n-nél a mediánt elhagyjuk, a két fél mediánja Q₁ és Q₃. */
const boxStats = (a: number[]) => {
  const s = [...a].sort((x, y) => x - y);
  const n = s.length;
  if (n < 2) return null;
  const lo = s.slice(0, Math.floor(n / 2));
  const hi = s.slice(Math.ceil(n / 2));
  const q1 = median(lo);
  const q2 = median(s);
  const q3 = median(hi);
  const iqr = q3 - q1;
  const lf = q1 - 1.5 * iqr;
  const uf = q3 + 1.5 * iqr;
  const inside = s.filter((x) => x >= lf && x <= uf);
  const outliers = s.filter((x) => x < lf || x > uf);
  return { s, n, q0: s[0], q1, q2, q3, q4: s[n - 1], iqr, lf, uf, wlo: inside[0], whi: inside[inside.length - 1], outliers, mean: s.reduce((p, x) => p + x, 0) / n };
};

const parse = (t: string) =>
  t
    .split(/[;\s]+/)
    .map((x) => x.replace(',', '.'))
    .filter((x) => x !== '')
    .map(Number)
    .filter((x) => Number.isFinite(x));

const PRESETS: [string, string][] = [
  ['Tamás (kidolgozott)', '50,59; 50,62; 50,62; 50,7; 50,7; 50,7; 50,76; 50,76; 50,76; 50,79; 50,81'],
  ['Milák – elődöntő (s)', '112,39; 114,01; 114,20; 114,32; 114,50; 114,79; 114,87; 114,91'],
  ['Milák – döntő (s)', '110,34; 113,37; 113,61; 114,29; 114,92; 115,20; 115,52; 115,54'],
  ['Beamon, 1968 (m)', '8,90; 8,19; 8,16; 8,12; 8,09; 8,02; 7,97; 7,94; 7,94; 7,93; 7,90; 7,89; 7,71; 7,66; 7,51; 7,44'],
  ['góllövőlista', '31; 15; 15; 13; 13; 13; 11; 11; 11; 10; 10']
];

const SALES = [9114, 9128, 9141, 9155, 9170, 9185];
const MONTHS = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.'];

export const StatDiagramsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: dobozdiagram-készítő
  const [text, setText] = useState<string>(PRESETS[3][1]);
  const bs = useMemo(() => boxStats(parse(text)), [text]);
  // Labor II: félrevezető tengely
  const [axisStart, setAxisStart] = useState<number>(9100);
  const visualRatio = (SALES[5] - axisStart) / (SALES[0] - axisStart);
  const realGrowth = (SALES[5] / SALES[0] - 1) * 100;
  const visualGrowth = (visualRatio - 1) * 100;

  const boxFig = (() => {
    if (!bs) return null;
    const pad = (bs.q4 - bs.q0) * 0.08 || 1;
    const lo = Math.min(bs.q0, bs.lf) - pad;
    const hi = Math.max(bs.q4, bs.uf) + pad;
    const X = (v: number) => 20 + ((v - lo) / (hi - lo)) * 300;
    const step = (hi - lo) / 6;
    const ticks = Array.from({ length: 7 }, (_, i) => lo + i * step);
    return (
      <SFig w={340} h={150} className="w-full max-w-[520px] h-auto mx-auto">
        <SBoxPlot q={[bs.wlo, bs.q1, bs.q2, bs.q3, bs.whi]} outliers={bs.outliers} axMin={lo} axMax={hi} ticks={ticks} x0={20} w={300} y={70} bh={30} tickFmt={(v) => hu(v, 2)} />
        {[bs.lf, bs.uf].map((f, i) => (
          <g key={i}>
            <line x1={X(f)} y1={30} x2={X(f)} y2={104} stroke={S_RED} strokeDasharray="4 3" strokeWidth={1.2} />
            <SText x={X(f)} y={26} t={i ? 'felső határ' : 'alsó határ'} s={7} c={S_RED} />
          </g>
        ))}
        {bs.s.map((v, i) => (
          <circle key={i} cx={X(v)} cy={112} r={2} fill={S_PURPLE} fillOpacity={0.6} />
        ))}
      </SFig>
    );
  })();

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="diagramok"
      title="3. Diagramok"
      subtitle="Félrevezető oszlop- és vonaldiagramok, a dobozdiagram öt adata és a kiugró adatok – világcsúcsokkal és edzésidőkkel."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="purple"
      pdfFilename="12_osztaly_diagramok_tananyag.pdf"
      practiceTitle="Készen állsz a diagramos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — DOBOZDIAGRAM ÉS KIUGRÓ ADAT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-center">
              <span className="font-mono text-base font-black text-purple-900 dark:text-purple-200">
                kiugró: x &gt; Q₃ + 1,5 · (Q₃ − Q₁) vagy x &lt; Q₁ − 1,5 · (Q₃ − Q₁)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Öt adat: <strong>minimum Q₀, alsó kvartilis Q₁, medián Q₂, felső kvartilis Q₃, maximum Q₄</strong> – mindegyik részbe az adatok ≈ 25%-a esik.
              </li>
              <li>
                <strong>Terjedelem</strong> = Q₄ − Q₀; <strong>félterjedelem</strong> = Q₃ − Q₁.
              </li>
              <li>Oszlopdiagramnál a függőleges tengely induljon 0-tól, különben az arányok torzulnak.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Bevezető: a mosópor „erőteljes” növekedése" badge="Tankönyv 80. o." badgeColor="purple">
        <DetergentMisleadingSvg />
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed mt-3">
          <p>
            Első ránézésre úgy tűnik, hogy az eladások az év első 6 hónapjában erőteljesen nőttek. Figyelmesebben nézve: januárban 9114 kg, júniusban
            9185 kg – ez mindössze <strong>≈ 0,8%-os</strong> növekedés.
          </p>
          <p>
            A félreértést az okozza, hogy a függőleges tengelyen <strong>nem 0-tól indul a beosztás</strong>, így a diagram nem arányos. A 0-tól induló
            diagramon az oszlopok területe (és magassága) arányos az eladott mennyiséggel: jól látszik, hogy a havi eladások lényegesen nem változtak – viszont a
            kismértékű növekedés alig látható. (A közbülső hónapok értékei az ábrán szemléltetők.)
          </p>
        </div>
      </TheorySection>

      <TheorySection title="2. Félrevezető diagramok" badge="Feladatok" badgeColor="rose">
        <TheoryTable
          headers={['Trükk', 'Hatás', 'Tankönyvi példa']}
          rows={[
            ['a függőleges tengely nem 0-tól indul', 'a kis különbségek nagynak látszanak', 'mosópor-eladás; mozi bevétele (4000 ezer Ft-tól induló tengely)'],
            ['más lépték a tengelyeken', 'ugyanaz az adatsor meredeknek vagy laposnak látszik', 'felújított játszóterek vonaldiagramja két napilapban'],
            ['csak kiválasztott évek ábrázolása', 'elrejti a közbülső emelkedéseket', '„A munkanélküliség folyamatos csökkenése városunkban”']
          ]}
        />
        <TheoryCallout type="warning" title="A munkanélküliségi cikk (3. feladat)">
          A szerző csak néhány év adatát ábrázolta, ezért úgy tűnik, mintha a munkanélküliség folyamatosan csökkent volna; a közbülső évek adatai szerint
          azonban közben emelkedések is voltak. A cím ne állítson folyamatos csökkenést; helyesebb pl.: „Hullámzó, de összességében csökkenő munkanélküliség városunkban”.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat: Tamás edzésidői" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SwimmerBoxPlotSvg />
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>
              <strong>a)</strong> A legjobb idő a legkisebb adat: <strong>50,59 s</strong>.
            </li>
            <li>
              <strong>b)</strong> Az adatok legalább 50%-a ≥ a medián (50,7 s), ezért <strong>nem</strong> lehet, hogy a mérések 60%-ában 50,7 s-nél jobb időt úszott.
            </li>
            <li>
              <strong>c)</strong> Az adatok legalább 75%-a ≤ 50,76 s (Q₃), ezért <strong>nem</strong> lehet, hogy a mérések 40%-ában 50,76 s-nél gyengébb eredményt ért el.
            </li>
            <li>
              <strong>d)</strong> Lehetséges, pl.: 50,59; 50,62; 50,62; 50,7; 50,7; 50,7; 50,76; 50,76; 50,76; 50,79; 50,81 – összeg 557,81, átlag 50,71 (3. adat
              Q₁, 6. adat a medián, 9. adat Q₃).
            </li>
          </ul>
        </div>
      </TheorySection>

      <TheorySection title="4. A dobozdiagram készítése (ismétlés)" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
            <li>Az adatokat növekvő sorrendbe állítjuk (a szélsőséges, kiugró adatokat az elemző kihagyhatja).</li>
            <li>A legkisebb adat a minimum (Q₀), a legnagyobb a maximum (Q₄).</li>
            <li>Páratlan elemszámnál a középső adat, párosnál a két középső átlaga a medián (Q₂).</li>
            <li>A mediánnal kettéosztjuk az adatsokaságot (páratlan elemszámnál a mediánt elhagyjuk).</li>
            <li>A két rész mediánja az alsó kvartilis (Q₁) és a felső kvartilis (Q₃).</li>
          </ol>
          <BoxPlotAnatomySvg />
        </div>
        <TheoryCallout type="info" title="Kiugró adat">
          Kiugró adatról beszélünk, ha egy adat jelentősen eltér a többitől (nagy szórásnál vagy mérési hiba miatt is keletkezhet). Kiugró az az adat, amely a
          felső kvartilisnél a félterjedelem másfélszeresénél többel nagyobb, vagy az alsó kvartilisnél ennél többel kisebb. A dobozdiagramon a bajusz az utolsó
          még nem kiugró adatig tart, a kiugró adatokat különálló pontok jelölik.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Kidolgozott feladatok: kiugró adatok a sportban" badge="Feladatok" badgeColor="sky">
        <TheoryCard title="A) Milák Kristóf világcsúcsa – 200 m pillangó, 2022" badge="4. feladat" badgeColor="sky">
          <MilakBoxPlotsSvg className="w-full max-w-[560px] h-auto mx-auto mb-3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <ul className="list-disc pl-5 space-y-1">
              <li>Elődöntő (s): 112,39; 114,01; 114,20; 114,32; 114,50; 114,79; 114,87; 114,91.</li>
              <li>Q₁ = 114,105; Q₂ = 114,41; Q₃ = 114,83; félterjedelem 0,725.</li>
              <li>
                Alsó határ: 114,105 − 1,5 · 0,725 ≈ 113,02 s → az 1:52,39 <strong>kiugró</strong>; a bajusz 1:54,01-ig tart.
              </li>
            </ul>
            <ul className="list-disc pl-5 space-y-1">
              <li>Döntő (s): 110,34; 113,37; 113,61; 114,29; 114,92; 115,20; 115,52; 115,54.</li>
              <li>Q₁ = 113,49; Q₂ = 114,605; Q₃ = 115,36; félterjedelem 1,87.</li>
              <li>
                Alsó határ: 113,49 − 2,805 = 110,685 s → az 1:50,34-es világcsúcs <strong>kiugró</strong>; a bajusz 1:53,37-ig tart.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="B) Bob Beamon 8,90 m-es ugrása (1968)" badge="5. feladat" badgeColor="purple">
            <BeamonOutlierSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>16 adat: Q₁ = (7,89 + 7,71) / 2 = 7,8; Q₂ = 7,94; Q₃ = (8,12 + 8,09) / 2 = 8,105 m.</li>
              <li>Felső határ: 8,105 + 1,5 · 0,305 = 8,5625 m → a 8,90 m kiugró adat; a bajusz 8,19 m-ig tart.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Góllövőlista 2021–22 és létszámnyilvántartás" badge="Házi feladat 1., 3." badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                Gólok: 10; 10; 11; 11; 11; 13; 13; 13; 15; 15; 31. Q₁ = 11, Q₂ = 13, Q₃ = 15, felső határ 15 + 1,5 · 4 = 21 → a 31 gól kiugró.
              </li>
              <li>
                Létszám: a pihenőnapokra az azt megelőző munkanap létszáma kerül (pl. febr. 4–5. → 35 fő). A 28 nap összege 1070, az átlagos állományi létszám
                1070 / 28 ≈ 38,2 → egész számban <strong>38 fő</strong>.
              </li>
            </ul>
            <StaffPieSvg className="w-full h-auto mt-2" />
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Tipikus hiba: kvartilis páratlan elemszámnál" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A mediánt nem számoljuk bele a két félbe"
          wrong="3; 5; 7; 8; 10; 12; 15 → alsó fél: 3; 5; 7; 8, így Q₁ = 6."
          wrongExplanation="Páratlan elemszámnál a medián (8) nem tartozik egyik félhez sem."
          correct="Alsó fél: 3; 5; 7 → Q₁ = 5; felső fél: 10; 12; 15 → Q₃ = 12."
          correctExplanation="A tankönyvi eljárás: a mediánnal kettéosztjuk az adatokat, páratlan elemszámnál a mediánt elhagyjuk, és a két rész mediánját vesszük."
          tip="Kiugró adat esetén a bajusz NEM a maximumig/minimumig tart, hanem az utolsó, még nem kiugró adatig."
        />
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium I: Dobozdiagram-készítő kiugró adatokkal" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Adatok (pontosvesszővel vagy szóközzel elválasztva)</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono" aria-label="adatok" />
            <div className="flex flex-wrap gap-2 mt-2">
              {PRESETS.map(([n, v]) => (
                <button key={n} onClick={() => setText(v)} className="px-3 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
                  {n}
                </button>
              ))}
            </div>
          </div>
          {bs ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                {[
                  ['Q₀ (min.)', bs.q0],
                  ['Q₁', bs.q1],
                  ['Q₂ (medián)', bs.q2],
                  ['Q₃', bs.q3],
                  ['Q₄ (max.)', bs.q4],
                  ['terjedelem', bs.q4 - bs.q0],
                  ['félterjedelem', bs.iqr],
                  ['alsó határ', bs.lf],
                  ['felső határ', bs.uf],
                  ['átlag', bs.mean]
                ].map(([t, v]) => (
                  <div key={t as string} className="bg-purple-50 rounded-xl p-2 border border-purple-200">
                    <div className="text-[11px] text-slate-500">{t}</div>
                    <div className="font-mono font-black text-purple-900">{fmt(v as number)}</div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700">
                Rendezve: {bs.s.map((x) => hu(x, 3)).join('; ')}
                <br />
                {bs.outliers.length ? (
                  <span className="text-rose-700 font-semibold">
                    Kiugró adat: {bs.outliers.map((x) => hu(x, 3)).join('; ')} – a bajusz {hu(bs.wlo, 3)}-tól {hu(bs.whi, 3)}-ig tart.
                  </span>
                ) : (
                  <span className="text-emerald-700 font-semibold">Nincs kiugró adat – a bajusz a minimumtól a maximumig tart.</span>
                )}
              </div>
              {boxFig}
            </>
          ) : (
            <p className="text-sm text-rose-600">Adj meg legalább két számot!</p>
          )}
        </div>
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium II: Hol kezdődjön a tengely?" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A függőleges tengely kezdőértéke: {axisStart} kg</label>
                <input type="range" min="0" max="9110" step="10" value={axisStart} onChange={(e) => setAxisStart(Number(e.target.value))} className="w-full accent-rose-600" aria-label="tengely kezdőértéke" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-rose-50 rounded-xl p-2 border border-rose-200">
                  <div className="text-[11px] text-slate-500">a júniusi oszlop / januári oszlop (látszat)</div>
                  <div className="font-mono font-black text-rose-900">{hu(visualRatio, 2)}-szeres</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">valódi arány</div>
                  <div className="font-mono font-black text-emerald-900">{hu(SALES[5] / SALES[0], 4)}-szeres</div>
                </div>
              </div>
              <p className="text-sm text-slate-700">
                Látszólagos növekedés: <strong className="text-rose-700">{hu(visualGrowth, 1)}%</strong>, valódi növekedés:{' '}
                <strong className="text-emerald-700">{hu(realGrowth, 2)}%</strong>.
              </p>
              <p className="text-xs text-slate-500">Az oszlop magassága csak akkor arányos az eladott mennyiséggel, ha a tengely 0-tól indul.</p>
            </div>
            <SFig w={260} h={170} className="w-full max-w-[360px] h-auto mx-auto">
              <SBarChart
                x0={44}
                y0={145}
                w={205}
                h={115}
                yMin={axisStart}
                yMax={9200}
                ticks={[axisStart, Math.round((axisStart + 9200) / 2), 9200]}
                data={SALES.map((v, i) => ({ label: MONTHS[i], value: v }))}
                color={axisStart > 0 ? S_RED : S_GREEN}
                labelSize={7.5}
                tickFmt={(v) => String(v)}
              />
            </SFig>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default StatDiagramsTheory;
