import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { LottoSplitSvg, HypergeometricSvg, TwoClassesSvg, SideEffectBinomialSvg, PizzaPieSvg, FairnessBarsSvg } from './Sampling12Figures';
import { SFig, SText, S_BLUE, S_AMBER, S_AXIS, S_GRID, S_RED, hu } from './statKit';

/** Álló binomiális együttható (n alatt k). */
const Bn: React.FC<{ n: React.ReactNode; k: React.ReactNode }> = ({ n, k }) => (
  <span className="inline-flex items-center align-middle mx-0.5">
    <span className="text-lg leading-none">(</span>
    <span className="inline-flex flex-col items-center text-[0.8em] leading-tight px-0.5">
      <span>{n}</span>
      <span>{k}</span>
    </span>
    <span className="text-lg leading-none">)</span>
  </span>
);

const binom = (n: number, k: number) => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
};
const binP = (n: number, k: number, p: number) => binom(n, k) * p ** k * (1 - p) ** (n - k);
const hypP = (N: number, M: number, n: number, k: number) => (binom(M, k) * binom(N - M, n - k)) / binom(N, n);
const f4 = (x: number) => hu(x, 4);

export const Sampling12Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: binomiális eloszlás
  const [n, setN] = useState<number>(10);
  const [pp, setPp] = useState<number>(25);
  const [k, setK] = useState<number>(2);
  const p = pp / 100;
  const dist = useMemo(() => Array.from({ length: n + 1 }, (_, i) => binP(n, i, p)), [n, p]);
  const kk = Math.min(k, n);
  const cum = dist.slice(0, kk + 1).reduce((s, x) => s + x, 0);
  const mode = dist.reduce((b, x, i) => (x > dist[b] + 1e-12 ? i : b), 0);
  const maxP = Math.max(...dist);

  // Labor II: visszatevéssel vagy anélkül?
  const [N, setNN] = useState<number>(20);
  const [M, setM] = useState<number>(5);
  const [m, setm] = useState<number>(4);
  const MM = Math.min(M, N);
  const mm = Math.min(m, N);
  const hyp = Array.from({ length: mm + 1 }, (_, i) => hypP(N, MM, mm, i));
  const bin = Array.from({ length: mm + 1 }, (_, i) => binP(mm, i, MM / N));
  const top = Math.max(...hyp, ...bin, 0.01);

  return (
    <TheoryTemplate
      topicId="g12-statisztika-valoszinuseg"
      subtopicId="mintavetelek"
      title="10. Mintavételek"
      subtitle="Visszatevés nélküli és visszatevéses mintavétel: lottó, osztálylétszámok, mellékhatások, palacsinták."
      badge="12. OSZTÁLY • III. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_mintavetelek_tananyag.pdf"
      practiceTitle="Készen állsz a mintavételes feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KÉTFÉLE MINTAVÉTEL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
                <div className="text-[11px] font-bold text-indigo-700">visszatevés nélkül</div>
                <span className="font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">
                  P(k) = <Bn n="M" k="k" /> · <Bn n="N − M" k="n − k" /> / <Bn n="N" k="n" />
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
                <div className="text-[11px] font-bold text-indigo-700">visszatevéssel (binomiális eloszlás)</div>
                <span className="font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">
                  P(k) = <Bn n="n" k="k" /> · p<sup>k</sup> · (1 − p)<sup>n − k</sup>
                </span>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>N</strong> elem, ebből <strong>M</strong> rendelkezik a tulajdonsággal; <strong>n</strong> elemet választunk, <strong>k</strong> a kedvezők
                száma.
              </li>
              <li>Visszatevéses mintavételnél ugyanazt a kísérletet ismételjük n-szer, mindegyik p valószínűséggel kedvező.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Bevezető: a kéttalálatos lottószelvény" badge="Tankönyv 96. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az ötöslottóban 90 számból húznak ki 5-öt. Kéttalálatos a szelvény, ha 2 számot eltaláltunk, 3-at nem: 2 szám a kihúzott 5 közül, 3 szám a maradék
              85 közül kerül ki.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Összes eset: <Bn n="90" k="5" /> = 43 949 268.
              </li>
              <li>
                Kedvező esetek: <Bn n="5" k="2" /> · <Bn n="85" k="3" /> = 10 · 98 770 (a 2 találat bármely 3 nem nyerő számhármassal párosítható).
              </li>
              <li>
                P = 10 · 98 770 / 43 949 268 ≈ <strong>0,0225</strong>.
              </li>
            </ul>
          </div>
          <LottoSplitSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Elmélet: mintavételek (ismétlés)" badge="Elmélet" badgeColor="teal">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            A mintavétel során kiválasztunk néhány elemet egy halmaz elemei közül, és általában azt vizsgáljuk, hogy a kiválasztottak közül hány rendelkezik egy
            adott tulajdonsággal. A kiválasztás történhet <strong>visszatevés nélkül</strong> vagy <strong>visszatevéssel</strong>.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
          <TheoryCard title="Visszatevés nélküli mintavétel" badge="ismétlés" badgeColor="emerald">
            <HypergeometricSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700">
              N elem közül M rendelkezik, N − M nem rendelkezik egy tulajdonsággal. Visszatevés nélkül n elemet választunk. Annak a valószínűsége, hogy pontosan
              k rendelkezik a tulajdonsággal: P(k) = <Bn n="M" k="k" /> · <Bn n="N − M" k="n − k" /> / <Bn n="N" k="n" />.
            </p>
          </TheoryCard>
          <TheoryCard title="Visszatevéses mintavétel – binomiális eloszlás" badge="ismétlés" badgeColor="purple">
            <p className="text-sm text-slate-700">
              A már vizsgált elemeket visszatesszük, így minden kiválasztásnál ugyanazt a kísérletet ismételjük. Ha n-szer ismétlünk egy kísérletet, és mindegyik
              p valószínűséggel kedvező, akkor
            </p>
            <p className="text-center font-mono font-bold text-purple-900 my-2">
              P(pontosan k kedvező) = <Bn n="n" k="k" /> · p<sup>k</sup> · (1 − p)<sup>n − k</sup>
            </p>
            <p className="text-xs text-slate-500">
              <Bn n="n" k="k" /> adja meg, hányféleképpen választható ki az n kísérletből az a k, amelyik kedvező lesz.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat 1.: két végzős osztály" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>A 12. a osztályba 11 lány és 13 fiú, a 12. b osztályba 15 lány és 10 fiú jár.</p>
            <p>
              <strong>a)</strong> Az érettségielnök mindkét osztályból egy-egy diákot választ. Összesen 24 · 25 = 600 lehetőség, ebből két lány 11 · 15 = 165
              esetben: P = 165 / 600 = <strong>0,275</strong>.
            </p>
            <p>
              <strong>b)</strong> Egy újságíró a 49 végzős közül választ kettőt: <Bn n="49" k="2" /> = 1176 lehetőség, a 26 lányból <Bn n="26" k="2" /> = 325 kedvező.
              P = 325 / 1176 ≈ <strong>0,276</strong>. Ez visszatevés nélküli mintavétel.
            </p>
          </div>
          <TwoClassesSvg />
        </div>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladat 2.: mellékhatások" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy gyógyszernél 3% a mellékhatás valószínűsége. 100 alkalommal vizsgálnak meg egy-egy véletlenszerűen kiválasztott beteget (akár ugyanazt többször):
              ugyanaz a kísérlet ismétlődik 100-szor, ezért a <strong>binomiális eloszlás</strong> írja le.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>a)</strong> Egyik esetben sem: 0,97<sup>100</sup> ≈ <strong>0,048</strong> (kb. 5%).
              </li>
              <li>
                <strong>b)</strong> Éppen három esetben: <Bn n="100" k="3" /> · 0,03<sup>3</sup> · 0,97<sup>97</sup> ≈ <strong>0,227</strong> (kb. 23%).
              </li>
              <li>
                <strong>c)</strong> Háromnál kevesebb esetben: <Bn n="100" k="2" /> · 0,03<sup>2</sup> · 0,97<sup>98</sup> + <Bn n="100" k="1" /> · 0,03 · 0,97
                <sup>99</sup> + 0,97<sup>100</sup> ≈ <strong>0,420</strong> (kb. 42%).
              </li>
            </ol>
          </div>
          <SideEffectBinomialSvg />
        </div>
      </TheorySection>

      <TheorySection title="5. Feladatok a tankönyvből" badge="Feladatok" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Sándor kedvenc lottószámai" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Négyzetszámok 90-ig: 1, 4, 9, …, 81 (9 db); köbszámok: 1, 8, 27, 64 (4 db); az 1 és a 64 mindkettő → 9 + 4 − 2 = 11 kedvenc szám.</li>
              <li>
                a) <Bn n="11" k="5" /> / <Bn n="90" k="5" /> = 462 / 43 949 268 ≈ 0,0000105.
              </li>
              <li>
                b) <Bn n="11" k="3" /> · <Bn n="79" k="2" /> / <Bn n="90" k="5" /> = 165 · 3081 / 43 949 268 ≈ 0,0116.
              </li>
              <li>
                c) 11 · <Bn n="79" k="4" /> / <Bn n="90" k="5" /> ≈ 0,376.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Palacsinták és szerencsekerék" badge="2–3. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>
                Palacsinta (n = 8, p = 0,1): pontosan 1: 8 · 0,1 · 0,9<sup>7</sup> ≈ 0,383; pontosan 2: 28 · 0,01 · 0,9<sup>6</sup> ≈ 0,149; legfeljebb 2:
                0,9<sup>8</sup> + 0,383 + 0,149 ≈ 0,962.
              </li>
              <li>
                Kerék (n = 10, p = 0,25): pontosan 2: 45 · 0,25<sup>2</sup> · 0,75<sup>8</sup> ≈ 0,282; pontosan 3: 120 · 0,25<sup>3</sup> · 0,75<sup>7</sup> ≈
                0,250; kétszer vagy háromszor: ≈ 0,532.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <TheoryCard title="C) Kedvenc pizza – 5 tanulót választunk" badge="4. feladat" badgeColor="emerald">
            <PizzaPieSvg className="w-full max-w-[260px] h-auto mx-auto mb-2" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>80° → 8 fő Margherita, 120° → 12 fő Carbonara, 160° → 16 fő pepperónis (36 fő).</li>
              <li>
                a) <Bn n="8" k="5" /> / <Bn n="36" k="5" /> = 56 / 376 992 ≈ 0,00015; b) <Bn n="12" k="2" /> · <Bn n="24" k="3" /> / <Bn n="36" k="5" /> ≈ 0,354;
                c) 16 · <Bn n="20" k="4" /> / <Bn n="36" k="5" /> ≈ 0,206.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Kosárra dobások – binomiális együtthatók" badge="5. feladat" badgeColor="indigo">
            <TheoryTable
              headers={['kérdés', 'együttható', 'érték']}
              rows={[
                ['9 dobásból 3 talált', '(9 alatt 3)', '84'],
                ['9 mellé, 3 talált (12 dobás)', '(12 alatt 3)', '220'],
                ['12 mellé, 3 talált (15 dobás)', '(15 alatt 3)', '455 – ez hiányzott'],
                ['9 dobásból 4 talált', '(9 alatt 4)', '126'],
                ['9 mellé, 4 talált (13 dobás)', '(13 alatt 4)', '715']
              ]}
            />
          </TheoryCard>
        </div>
        <TheoryCard title="E) Házi feladatok" badge="HF 1–4." badgeColor="rose">
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>
              <strong>1. (érettségi 2021)</strong> {'{1; 2; 3; 4; 5}'}-ből két különböző szám: <Bn n="5" k="2" /> = 10 pár; az átlag egész, ha azonos paritásúak:
              {' {1; 3}, {1; 5}, {3; 5}, {2; 4}'} → 4 / 10 = <strong>0,4</strong>.
            </li>
            <li>
              <strong>2.</strong> Legalább hármas: p = 4/6 = 2/3. a) (2/3)<sup>4</sup> = 16/81 ≈ <strong>0,198</strong>; b) <Bn n="4" k="2" /> · (2/3)<sup>2</sup> · (1/3)
              <sup>2</sup> = 24/81 ≈ <strong>0,296</strong>.
            </li>
            <li>
              <strong>3.</strong> p<sup>2</sup> = 0,64 → p = <strong>0,8</strong>.
            </li>
            <li>
              <strong>4. (érettségi 2022)</strong> 5 natúr, 15 csokis edényből 4: 5 · <Bn n="15" k="3" /> / <Bn n="20" k="4" /> = 2275 / 4845 ≈{' '}
              <strong>0,470</strong>.
            </li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="6. Ráadás: „Az élet nem igazságos…”" badge="Ráadás" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Bence és Hajni 4 házimunkáról egyenként pénzfeldobással dönt. A legvalószínűbb az „igazságos” 2–2 eset, de ennek valószínűsége csak{' '}
              <Bn n="4" k="2" /> / 16 = <strong>0,375</strong>, míg az, hogy NEM 2–2 lesz: <strong>0,625</strong>.
            </p>
            <p>
              100 feladatnál az 50–50 eset valószínűsége csak ≈ 0,08, a 0,92 esélyű „igazságtalan” kimenetel majdnem 12-szer valószínűbb.
            </p>
          </div>
          <FairnessBarsSvg />
        </div>
      </TheorySection>

      <TheorySection title="7. Tipikus hiba: hiányzó binomiális együttható, rossz modell" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ne felejtsd el a sorrendeket – és válaszd jól a modellt!"
          wrong="A 100 vizsgálatból pontosan 3 mellékhatás valószínűsége 0,03³ · 0,97⁹⁷ ≈ 0,0000014."
          wrongExplanation="Ez csak egyetlen konkrét sorrend (pl. az első három beteg) valószínűsége. A 3 mellékhatásos eset (100 alatt 3)-féleképpen helyezkedhet el."
          correct="(100 alatt 3) · 0,03³ · 0,97⁹⁷ ≈ 0,227."
          correctExplanation="Visszatevéses (ismételt) kísérletnél binomiális, visszatevés nélküli (egyszerre húzott) mintánál a hipergeometrikus képlet a jó modell."
          tip="Kérdezd meg magadtól: változik-e a kedvező valószínűség húzásról húzásra? Ha igen, visszatevés nélküli a mintavétel."
        />
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium I: Binomiális eloszlás" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600">kísérletek száma n = {n}</label>
              <input type="range" min="1" max="30" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-indigo-600" aria-label="n" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600">kedvező valószínűség p = {hu(p, 2)}</label>
              <input type="range" min="1" max="99" value={pp} onChange={(e) => setPp(Number(e.target.value))} className="w-full accent-amber-600" aria-label="p" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600">k = {kk}</label>
              <input type="range" min="0" max={n} value={kk} onChange={(e) => setK(Number(e.target.value))} className="w-full accent-rose-600" aria-label="k" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              ['palacsinta', 8, 10, 1],
              ['szerencsekerék', 10, 25, 2],
              ['pók (tudáspróba)', 5, 70, 1],
              ['4 házimunka', 4, 50, 2]
            ].map(([t, a, b, c]) => (
              <button
                key={t as string}
                onClick={() => {
                  setN(a as number);
                  setPp(b as number);
                  setK(c as number);
                }}
                className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200"
              >
                {t}
              </button>
            ))}
          </div>
          <SFig w={320} h={150} className="w-full max-w-[520px] h-auto mx-auto">
            {[0, 0.5, 1].map((t) => (
              <g key={t}>
                <line x1={30} y1={125 - t * 100} x2={312} y2={125 - t * 100} stroke={S_GRID} />
                <SText x={27} y={128 - t * 100} t={hu(t * maxP, 3)} s={6.5} a="end" c={S_AXIS} />
              </g>
            ))}
            {dist.map((v, i) => {
              const slot = 282 / (n + 1);
              return (
                <g key={i}>
                  <rect
                    x={30 + i * slot + slot * 0.12}
                    y={125 - (v / maxP) * 100}
                    width={slot * 0.76}
                    height={(v / maxP) * 100}
                    fill={i === kk ? S_RED : i < kk ? S_AMBER : S_BLUE}
                    opacity={0.85}
                  />
                  {(n <= 15 || i % 2 === 0) && <SText x={30 + i * slot + slot / 2} y={136} t={String(i)} s={6.5} c={S_AXIS} />}
                </g>
              );
            })}
            <line x1={30} y1={125} x2={312} y2={125} stroke={S_AXIS} />
            <SText x={171} y={147} t="piros: P(pontosan k) · sárga + piros: P(legfeljebb k)" s={7} c={S_AXIS} />
          </SFig>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            {[
              [`P(pontosan ${kk})`, f4(dist[kk])],
              [`P(legfeljebb ${kk})`, f4(cum)],
              [`P(legalább ${kk})`, f4(1 - cum + dist[kk])],
              ['legvalószínűbb k', String(mode)]
            ].map(([t, v]) => (
              <div key={t} className="bg-indigo-50 rounded-xl p-2 border border-indigo-200">
                <div className="text-[11px] text-slate-500">{t}</div>
                <div className="font-mono font-black text-indigo-900">{v}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600">
            P(pontosan {kk}) = ({n} alatt {kk}) · {hu(p, 2)}
            <sup>{kk}</sup> · {hu(1 - p, 2)}
            <sup>{n - kk}</sup> = {hu(binom(n, kk), 0)} · … ≈ {f4(dist[kk])}. A kedvező kimenetelek számának várható értéke n · p = {hu(n * p, 2)}.
          </p>
        </div>
      </TheorySection>

      <TheorySection title="9. Interaktív Laboratórium II: Visszatevéssel vagy anélkül?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600">összes elem N = {N}</label>
              <input type="range" min="5" max="60" value={N} onChange={(e) => setNN(Number(e.target.value))} className="w-full accent-purple-600" aria-label="N" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600">kedvező elemek M = {MM}</label>
              <input type="range" min="1" max={N} value={MM} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="M" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600">mintanagyság n = {mm}</label>
              <input
                type="range"
                min="1"
                max={Math.min(N, 10)}
                value={Math.min(mm, 10)}
                onChange={(e) => setm(Number(e.target.value))}
                className="w-full accent-amber-600"
                aria-label="mintanagyság"
              />
            </div>
          </div>
          <SFig w={320} h={150} className="w-full max-w-[520px] h-auto mx-auto" title="kék: visszatevés nélkül · sárga: visszatevéssel">
            {hyp.map((v, i) => {
              const slot = 280 / (mm + 1);
              const x = 30 + i * slot;
              return (
                <g key={i}>
                  <rect x={x + slot * 0.1} y={125 - (v / top) * 95} width={slot * 0.38} height={(v / top) * 95} fill={S_BLUE} opacity={0.85} />
                  <rect x={x + slot * 0.5} y={125 - (bin[i] / top) * 95} width={slot * 0.38} height={(bin[i] / top) * 95} fill={S_AMBER} opacity={0.85} />
                  <SText x={x + slot / 2} y={137} t={String(i)} s={7} c={S_AXIS} />
                </g>
              );
            })}
            <line x1={30} y1={125} x2={310} y2={125} stroke={S_AXIS} />
          </SFig>
          <TheoryTable
            headers={['k', 'visszatevés nélkül', `visszatevéssel (p = ${hu(MM / N, 3)})`]}
            rows={hyp.map((v, i) => [String(i), f4(v), f4(bin[i])])}
          />
          <TheoryCallout type="info" title="Mit figyelhetsz meg?">
            Ha N sokkal nagyobb a mintánál, a két eloszlás alig tér el (egy-egy elem kivétele alig változtat az arányon). Kis N-nél a visszatevés nélküli
            mintavétel „koncentráltabb”: a szélső értékek kevésbé valószínűek. <span className="text-rose-600">Pl. N = 20, M = 5, n = 4: a müzlis házi feladat.</span>
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Sampling12Theory;
