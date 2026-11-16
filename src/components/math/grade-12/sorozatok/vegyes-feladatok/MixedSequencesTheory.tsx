import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ArithVsGeoSvg, HalvingNumberLineSvg, TriangleCakeSvg, PavingRowsSvg, MeansSvg, PumpkinPyramidSvg } from './MixedSequencesFigures';
import { SeqBarChart, SText, fmtHu, S_BLUE, S_RED } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

const EPS = 1e-9;

type Kind = { arith: boolean; geo: boolean; d?: number; q?: number };

const classify = (v: number[]): Kind => {
  const diffs = v.slice(1).map((x, i) => x - v[i]);
  const arith = diffs.every((d) => Math.abs(d - diffs[0]) < EPS);
  const noZero = v.every((x) => Math.abs(x) > EPS);
  const ratios = noZero ? v.slice(1).map((x, i) => x / v[i]) : [];
  const geo = noZero && ratios.every((r) => Math.abs(r - ratios[0]) < EPS);
  return { arith, geo, d: arith ? diffs[0] : undefined, q: geo ? ratios[0] : undefined };
};

const PRESETS: { label: string; v: number[] }[] = [
  { label: '5; 8; 11; 14', v: [5, 8, 11, 14] },
  { label: '2; 6; 18; 54', v: [2, 6, 18, 54] },
  { label: '1; 4; 9; 16', v: [1, 4, 9, 16] },
  { label: '7; 7; 7; 7', v: [7, 7, 7, 7] },
  { label: '16; −8; 4; −2', v: [16, -8, 4, -2] },
  { label: '1; 1; 2; 3', v: [1, 1, 2, 3] }
];

export const MixedSequencesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: felismerő
  const [vals, setVals] = useState<string[]>(['5', '8', '11', '14']);
  // Labor II: összegverseny
  const [a1, setA1] = useState<number>(10);
  const [d, setD] = useState<number>(2);
  const [q, setQ] = useState<number>(1.2);
  const [target, setTarget] = useState<number>(1000);

  const nums = vals.map((s) => Number(s.replace(',', '.')));
  const valid = nums.every((x) => Number.isFinite(x));
  const kind = valid ? classify(nums) : { arith: false, geo: false };
  let verdict = 'egyik sem (se nem számtani, se nem mértani)';
  if (kind.arith && kind.geo) verdict = 'számtani is (d = 0) és mértani is (q = 1)';
  else if (kind.arith) verdict = `számtani sorozat, d = ${fmtHu(kind.d ?? 0, 3)}`;
  else if (kind.geo) verdict = `mértani sorozat, q = ${fmtHu(kind.q ?? 0, 3)}`;
  const next = kind.arith ? nums[3] + (kind.d ?? 0) : kind.geo ? nums[3] * (kind.q ?? 1) : undefined;

  const race = useMemo(() => {
    let sa = 0;
    let sg = 0;
    let na: number | null = null;
    let ng: number | null = null;
    const A: number[] = [];
    const G: number[] = [];
    for (let n = 1; n <= 200; n++) {
      sa += a1 + (n - 1) * d;
      sg += a1 * q ** (n - 1);
      if (n <= 30) {
        A.push(sa);
        G.push(sg);
      }
      if (na === null && sa > target) na = n;
      if (ng === null && sg > target) ng = n;
    }
    return { na, ng, A, G };
  }, [a1, d, q, target]);

  return (
    <TheoryTemplate
      topicId="g12-sorozatok"
      subtopicId="vegyes-feladatok"
      title="7. Vegyes feladatok"
      subtitle="Számtani és mértani sorozatok együtt: tagszám, egyenlőtlenségek, torta, járólapok, számtani és mértani közép."
      badge="12. OSZTÁLY • II. SOROZATOK • TANANYAG"
      themeColor="teal"
      pdfFilename="12_osztaly_sorozatok_vegyes_feladatok_tananyag.pdf"
      practiceTitle="Készen állsz a vegyes sorozatfeladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — MELYIK SOROZAT?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center">
              <span className="font-mono text-base font-black text-teal-900 dark:text-teal-200">
                állandó különbség (d) ⇒ számtani · állandó hányados (q) ⇒ mértani
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Számtani: aₙ = a₁ + (n − 1)d, Sₙ = (a₁ + aₙ)/2 · n = (2a₁ + (n − 1)d)/2 · n.</li>
              <li>Mértani: aₙ = a₁qⁿ⁻¹, Sₙ = a₁(qⁿ − 1)/(q − 1), ha q ≠ 1.</li>
              <li>„Legalább/legfeljebb hány tag?” ⇒ egyenlőtlenség, a végén egészre kerekítünk és ellenőrzünk.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Számtani vagy mértani? Képlettár" badge="Ismétlés" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ArithVsGeoSvg />
          <TheoryTable
            headers={['', 'Számtani sorozat', 'Mértani sorozat']}
            rows={[
              ['definíció', 'aₙ − aₙ₋₁ = d (állandó)', 'aₙ / aₙ₋₁ = q (állandó, ≠ 0)'],
              ['n-edik tag', 'aₙ = a₁ + (n − 1)d', 'aₙ = a₁ · qⁿ⁻¹'],
              ['első n tag összege', 'Sₙ = (a₁ + aₙ)/2 · n', 'Sₙ = a₁(qⁿ − 1)/(q − 1)'],
              ['közép', 'aₙ = (aₙ₋₁ + aₙ₊₁)/2', 'aₙ² = aₙ₋₁ · aₙ₊₁'],
              ['ismeretlen n', 'másodfokú egyenlet', 'exponenciális egyenlet (logaritmus)']
            ]}
          />
        </div>
      </TheorySection>

      <TheorySection title="2. Kidolgozott feladatok: tagszám és egyenlőtlenség" badge="Tankönyv 64. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Hány tagot adtunk össze?" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Számtani sorozat: a₁ = 5, d = 2, Sₙ = 357.</li>
              <li>Sₙ = (2 · 5 + (n − 1) · 2)/2 · n = n(n + 4) = 357 ⇒ n² + 4n − 357 = 0.</li>
              <li>
                n = 17 (a másik gyök −21 negatív). Ellenőrzés: 17 · 21 = 357, tehát <strong>17 tagot</strong> adtunk össze.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) 1000 alatti tagok és összegek" badge="2. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Mértani sorozat: a₁ = 16, q = 1,07.</li>
              <li>
                a) 16 · 1,07ⁿ⁻¹ &lt; 1000 ⇒ n − 1 &lt; lg 62,5 / lg 1,07 ≈ 61,1 ⇒ n ≤ 62: <strong>62 tag</strong> kisebb 1000-nél.
              </li>
              <li>
                b) 16 · (1,07ⁿ − 1)/0,07 &lt; 1000 ⇒ 1,07ⁿ &lt; 5,375 ⇒ n ≤ 24: legfeljebb <strong>24 tagot</strong> adhattunk össze (S₂₄ ≈ 930,8; S₂₅ ≈ 1012,0).
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) A felező sorozat összege sosem éri el a 2-t" badge="3. feladat" badgeColor="emerald">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <HalvingNumberLineSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>b₁ = 1, q = 1/2: Sₙ = (1 − (1/2)ⁿ)/(1 − 1/2) = 2 − (1/2)ⁿ⁻¹.</li>
              <li>S₅ = 31/16 ≈ 1,938; S₁₀ = 1023/512 ≈ 1,998; S₁₅ = 32 767/16 384 ≈ 2,000; S₂₀ = 1 048 575/524 288 ≈ 2,000.</li>
              <li>
                Bence állítása <strong>igaz</strong>: (1/2)ⁿ⁻¹ &gt; 0, ezért Sₙ &lt; 2 minden n-re – ezredekre kerekítve viszont már 2,000 jön ki!
              </li>
            </ul>
          </div>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok: torta és járólapok" badge="Tankönyv 64. o." badgeColor="orange">
        <TheoryCard title="D) Csilla emeletes tortája" badge="4. feladat" badgeColor="rose">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <TriangleCakeSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                Az új háromszög oldala a 10 és 20 cm-es szakaszok közti 60°-os szöggel szemben: √(10² + 20² − 2 · 10 · 20 · cos 60°) = √300 = 10√3 ≈ 17,32 cm. Az arány q = 1/√3.
              </li>
              <li>
                Oldalak: 30; 10√3; 10; 10/√3 cm. A cukordíszítés a kerületek összege: 3 · 30 · (1 − (1/√3)⁴)/(1 − 1/√3) ≈ <strong>189,3 cm</strong>.
              </li>
              <li>
                Területek: mértani sorozat q² = 1/3 hányadossal: 389,7 · (1 − (1/3)⁴)/(1 − 1/3) ≈ 577,4 cm². 10% hulladékkal: 577,4 / 0,9 ≈ <strong>641,5 cm²</strong> tészta.
              </li>
              <li>
                Marcipán (1 cm magas szinteket feltételezve): felülről a legnagyobb háromszög (≈ 389,7 cm²) + oldalfalak (189,3 cm · 1 cm) ≈ <strong>579 cm²</strong>.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <TheoryCard title="E) Angéla járólapjai (érettségi feladat, 2009)" badge="5. feladat" badgeColor="indigo">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <PavingRowsSvg className="w-full h-auto" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₁ = 8, d = 2: Sₙ = (16 + 2(n − 1))/2 · n = n(n + 7) = 858 ⇒ n² + 7n − 858 = 0 ⇒ <strong>n = 26 sor</strong>.</li>
              <li>Az utolsó sor: a₂₆ = 8 + 25 · 2 = 58 lap.</li>
              <li>4 csomag = 900 lap; bordó 4 · 36 = 144, szürke 756.</li>
              <li>Bordót rakott le: 8 + 58 + 2 · 24 = 114; szürkét: 858 − 114 = 744.</li>
              <li>
                Kimaradt: <strong>30 bordó és 12 szürke</strong> járólap.
              </li>
            </ul>
          </div>
        </TheoryCard>
        <TheoryCard title="F) Számtani és mértani sorozat közös tagjai (érettségi feladat, 2006)" badge="6. feladat" badgeColor="teal">
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>Mértani: b₁ = 5, b₃ = 5q², b₅ = 5q⁴. Számtani: a₁ = 5, a₄ = 5 + 3d, a₁₆ = 5 + 15d.</li>
            <li>5q² = 5 + 3d és 5q⁴ = 5 + 15d ⇒ q⁴ − 1 = 5(q² − 1) ⇒ (q² − 1)(q² − 4) = 0.</li>
            <li>
              q² = 4 ⇒ <strong>q = 2 vagy q = −2, d = 5</strong>; q² = 1 ⇒ q = ±1, d = 0 (konstans 5-ös sorozat – „elfajuló” megoldás).
            </li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="4. Ráadás: számtani és mértani közép, négyzetszámok összege" badge="Tankönyv 65. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MeansSvg />
          <PumpkinPyramidSvg />
        </div>
        <TheoryCallout type="info" title="Házi feladatok tanulságai">
          Faiskola: 40 csemete, soronként +4, összesen 1020 ⇒ n(38 + 2n) = 1020 ⇒ <strong>15 sor</strong>. a₁ = 10 és Sₙ &gt; 1000: számtani sorozatnál (d = 2) n(n + 9) &gt; 1000 ⇒ legalább{' '}
          <strong>28</strong> tag; mértani sorozatnál (q = 1,2) 1,2ⁿ &gt; 21 ⇒ legalább <strong>17</strong> tag. Mértani sorozat, q = −3, S₁₀ = −7381 ⇒ a₁ = 0,5, a₇ = 364,5.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: két tagból a köztes tag" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A mértani közép előjele"
          wrong="a₅ = 4 és a₉ = 324 ⇒ a₇² = 1296 ⇒ a₇ = 36 vagy a₇ = −36."
          wrongExplanation="a₇ = a₅ · q², és q² > 0, ezért a₇ előjele mindig ugyanaz, mint a₅-é. A −36 nem lehet a sorozat 7. tagja."
          correct="a₇ = a₅ · q² = 4 · 9 = 36 (q² = √(324/4) = 9, q = ±3)."
          correctExplanation="Ha a két tag sorszáma közötti különbség páros, az ugyanolyan előjelű tagok közötti tag előjele is ugyanaz; q előjele viszont kétféle lehet."
          tip="Szomszédos tagoknál (aₙ₋₁, aₙ, aₙ₊₁) aₙ előjele bármilyen lehet: 4; ±6; 9 is mértani sorozat."
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: Számtani, mértani vagy egyik sem?" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setVals(p.v.map(String))}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-blue-100"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {vals.map((v, i) => (
                  <label key={i} className="text-xs font-semibold text-slate-600">
                    a<sub>{i + 1}</sub>
                    <input
                      value={v}
                      onChange={(e) => setVals(vals.map((x, j) => (j === i ? e.target.value : x)))}
                      className="w-full mt-1 px-2 py-1 border border-slate-300 rounded-lg font-mono text-sm"
                      aria-label={`a${i + 1}`}
                    />
                  </label>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 text-sm text-blue-900">
                <div className="text-xs text-blue-700 mb-1">Ítélet:</div>
                <div className="font-black text-base">{valid ? verdict : 'adj meg négy számot!'}</div>
                {valid && (
                  <div className="text-xs text-slate-600 mt-2">
                    Különbségek: {nums.slice(1).map((x, i) => fmtHu(x - nums[i], 3)).join('; ')} · Hányadosok:{' '}
                    {nums.every((x) => x !== 0) ? nums.slice(1).map((x, i) => fmtHu(x / nums[i], 3)).join('; ') : 'nincs (0 tag)'}
                    {next !== undefined && <> · a₅ = {fmtHu(next, 3)}</>}
                  </div>
                )}
              </div>
            </div>
            <svg viewBox="0 0 320 220" className="w-full h-auto" role="img" aria-label="a beírt tagok pontgrafikonja">
              {valid && <SeqBarChart values={nums} x={40} y={20} w={260} h={170} points color={kind.geo && !kind.arith ? S_RED : S_BLUE} showValues valueDigits={2} />}
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: Melyik összeg éri el előbb a célt?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Közös első tag: a₁ = {a1}</label>
                <input type="range" min="1" max="50" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="w-full accent-purple-600" aria-label="első tag" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Számtani sorozat különbsége: d = {d}</label>
                <input type="range" min="0" max="20" value={d} onChange={(e) => setD(Number(e.target.value))} className="w-full accent-blue-600" aria-label="differencia" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Mértani sorozat hányadosa: q = {fmtHu(q, 2)}</label>
                <input type="range" min="1.05" max="2" step="0.05" value={q} onChange={(e) => setQ(Number(e.target.value))} className="w-full accent-rose-600" aria-label="kvóciens" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Cél: Sₙ &gt; {target}</label>
                <input type="range" min="100" max="5000" step="100" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="w-full accent-amber-600" aria-label="cél" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-[11px] text-slate-500">számtani: legalább</div>
                  <div className="font-mono font-black text-blue-900">{race.na ?? '> 200'} tag</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-2 border border-rose-200">
                  <div className="text-[11px] text-slate-500">mértani: legalább</div>
                  <div className="font-mono font-black text-rose-900">{race.ng ?? '> 200'} tag</div>
                </div>
              </div>
              <p className="text-xs text-slate-600">Az alapbeállítás a tankönyv házi feladata: a₁ = 10, d = 2 ⇒ 28 tag; q = 1,2 ⇒ 17 tag.</p>
            </div>
            <svg viewBox="0 0 320 230" className="w-full h-auto" role="img" aria-label="a két részletösszeg-sorozat">
              <SeqBarChart values={race.A.slice(0, 30)} x={40} y={20} w={260} h={170} line={race.G.slice(0, 30)} lineColor={S_RED} color={S_BLUE} refY={target} refLabel="cél" maxV={target * 1.6} labelEvery={5} />
              <SText x={170} y={224} t="kék oszlop: számtani Sₙ · piros vonal: mértani Sₙ" s={10} c="#475569" />
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MixedSequencesTheory;
