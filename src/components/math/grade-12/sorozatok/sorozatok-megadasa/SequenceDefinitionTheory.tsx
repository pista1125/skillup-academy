import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { SeqPlot, fmt } from './seqKit';
import { OddSumSquaresSvg, DefinitionModesSvg, Mod8ChainSvg, GuardScheduleSvg, PeriodicRecursionSvg } from './SequenceDefinitionFigures';

type Preset = { name: string; mode: 1 | 2; a1: number; a2: number; p: number; s: number };
const PRESETS: Preset[] = [
  { name: '2. feladat a): a₁ = 3, aₙ = 2aₙ₋₁ − 4', mode: 1, a1: 3, a2: 0, p: 2, s: -4 },
  { name: 'HF 3.: a₁ = 5, aₙ = −2aₙ₋₁ + 1', mode: 1, a1: 5, a2: 0, p: -2, s: 1 },
  { name: '3. feladat b): b₁ = 8, bₙ = bₙ₋₁ : 2', mode: 1, a1: 8, a2: 0, p: 0.5, s: 0 },
  { name: '3. feladat c): c₁ = 3, c₂ = 1, cₙ = cₙ₋₁ − cₙ₋₂', mode: 2, a1: 3, a2: 1, p: 1, s: -1 },
  { name: 'Lépcső: a₁ = 1, a₂ = 2, aₙ = aₙ₋₁ + aₙ₋₂', mode: 2, a1: 1, a2: 2, p: 1, s: 1 }
];

const WITH: Record<number, string> = { 2: '2-vel', 3: '3-mal', 4: '4-gyel', 5: '5-tel', 6: '6-tal', 7: '7-tel', 8: '8-cal', 9: '9-cel', 10: '10-zel', 11: '11-gyel', 12: '12-vel' };

const sub = (n: number) =>
  String(n)
    .split('')
    .map((c) => String.fromCharCode(0x2080 + Number(c)))
    .join('');

export const SequenceDefinitionTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: maradékos sorozatok
  const [m, setM] = useState<number>(8);
  const [r, setR] = useState<number>(5);
  // Labor II: rekurziógép
  const [mode, setMode] = useState<1 | 2>(1);
  const [a1, setA1] = useState<number>(3);
  const [a2, setA2] = useState<number>(1);
  const [p, setP] = useState<number>(2);
  const [s, setS] = useState<number>(-4);

  const rr = Math.min(r, m - 1);
  const first = rr === 0 ? m : rr;
  const shift = m - first; // aₙ = m·n − shift
  const byRule = Array.from({ length: 8 }, (_, i) => first + i * m);
  const byFormula = Array.from({ length: 8 }, (_, i) => m * (i + 1) - shift);

  const rec = useMemo(() => {
    const out: number[] = [a1];
    if (mode === 2) out.push(a2);
    while (out.length < 10) {
      const k = out.length;
      out.push(mode === 1 ? p * out[k - 1] + s : p * out[k - 1] + s * out[k - 2]);
    }
    return out;
  }, [mode, a1, a2, p, s]);

  const applyPreset = (pr: Preset) => {
    setMode(pr.mode);
    setA1(pr.a1);
    setA2(pr.a2);
    setP(pr.p);
    setS(pr.s);
  };

  const ruleText =
    mode === 1
      ? `a₁ = ${fmt(a1)}, aₙ = ${fmt(p)} · aₙ₋₁ ${s < 0 ? '−' : '+'} ${fmt(Math.abs(s))}`
      : `a₁ = ${fmt(a1)}, a₂ = ${fmt(a2)}, aₙ = ${fmt(p)} · aₙ₋₁ ${s < 0 ? '−' : '+'} ${fmt(Math.abs(s))} · aₙ₋₂`;

  return (
    <TheoryTemplate
      topicId="g12-sorozatok"
      subtopicId="sorozatok-megadasa"
      title="2. Sorozatok megadása"
      subtitle="Képlettel, rekurzióval vagy utasítással: ugyanaz a sorozat többféleképpen is leírható."
      badge="12. OSZTÁLY • II. SOROZATOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_sorozatok_megadasa_tananyag.pdf"
      practiceTitle="Készen állsz a sorozatok megadásáról szóló feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A SOROZAT MEGADÁSA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">képlet · rekurzió · utasítás</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Képlettel:</strong> aₙ-t n függvényében adjuk meg, pl. aₙ = 3n + 2.
              </li>
              <li>
                <strong>Rekurzív módon:</strong> aₙ-t az előtte álló tag(ok)ból számoljuk – ekkor az első (néhány) tagot is meg kell adni.
              </li>
              <li>
                <strong>Utasítással (körülírással):</strong> pl. a pozitív négyzetszámok növekvő sorozata.
              </li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Bevezető: a páratlan számok összege" badge="Tankönyv 54. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Adjuk össze az első néhány pozitív páratlan számot:</p>
            <p className="font-mono text-center">1 = 1;  1 + 3 = 4;  1 + 3 + 5 = 9;  1 + 3 + 5 + 7 = 16</p>
            <p>
              Az első n pozitív páratlan szám összege <strong>n²</strong>. Az ábra magyarázza: minden újabb páratlan szám egy „L” alakban rakható a négyzet köré, és eggyel nagyobb oldalú négyzetet kapunk.
            </p>
            <p>Az 1; 4; 9; 16; … sorozat így háromféleképpen is megadható (az n-edik pozitív páratlan szám 2n − 1):</p>
            <TheoryTable
              headers={['képlettel', 'összegként', 'rekurzív módon']}
              rows={[['aₙ = n²', 'aₙ = 1 + 3 + … + (2n − 1)', 'a₁ = 1 és aₙ = aₙ₋₁ + (2n − 1)']]}
            />
          </div>
          <OddSumSquaresSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. A sorozat megadásának módjai" badge="Elmélet" badgeColor="blue">
        <DefinitionModesSvg />
        <TheoryTable
          headers={['Mód', 'Leírás', 'Példa']}
          rows={[
            ['képlettel', 'az n-edik tag n függvényében (n ∈ ℤ⁺)', 'aₙ = 3n + 2'],
            ['rekurzív módon', 'az n-edik tag az előtte álló tag(ok) ismeretében; az első tag(ok)at is meg kell adni', 'a₁ = 1, a₂ = 2, n > 2 esetén aₙ = aₙ₋₁ + aₙ₋₂'],
            ['utasítással, körülírással', 'szavakkal pontosan leírjuk a tagokat', 'a pozitív négyzetszámok növekvő sorozata; 3/11 n-edik tizedesjegye']
          ]}
        />
        <TheoryCallout type="info" title="Mennyi kezdőtagot kell megadni?">
          Annyit, hogy a rekurzióval a további tagok kiszámolhatók legyenek: ha aₙ csak aₙ₋₁-től függ, elég a₁; ha aₙ₋₁-től és aₙ₋₂-től, akkor a₁ és a₂ is kell.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat: 8-cal osztva 5 maradékot adó számok" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Adjuk meg rekurzív módon, illetve képlettel a 8-cal osztva 5 maradékot adó pozitív számok növekvő sorozatát!</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Az első tagok: 5; 13; 21; 29; 37. Az egymás utáni tagok különbsége állandó, 8.</li>
              <li>
                <strong>Rekurzió:</strong> a₁ = 5 és n &gt; 1 esetén aₙ = aₙ₋₁ + 8.
              </li>
              <li>
                A számok 8k + 5 alakúak (k ∈ ℕ), de az első tag (5) a k = 0-hoz tartozik, ez az n = 1. Ezért k helyére n − 1-et írunk.
              </li>
              <li>
                <strong>Képlet:</strong> aₙ = 8(n − 1) + 5 = <strong>8n − 3</strong>.
              </li>
              <li>Ellenőrzés más úton: a 8; 16; 24; 32; … számok mindegyikéből 3-at levonva kapjuk a tagokat.</li>
            </ol>
          </div>
          <Mod8ChainSvg />
        </div>
      </TheorySection>

      <TheorySection title="4. További megoldott feladatok" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Képlet és rekurzió (1. feladat)" badge="1. feladat" badgeColor="sky">
            <TheoryTable
              headers={['Sorozat', 'Első öt tag', 'Képlet', 'Rekurzió']}
              rows={[
                ['páros pozitív egészek', '2; 4; 6; 8; 10', 'aₙ = 2n', 'a₁ = 2, aₙ = aₙ₋₁ + 2'],
                ['természetes számok', '0; 1; 2; 3; 4', 'aₙ = n − 1', 'a₁ = 0, aₙ = aₙ₋₁ + 1'],
                ['3-mal osztva 1 maradék', '1; 4; 7; 10; 13', 'aₙ = 3n − 2', 'a₁ = 1, aₙ = aₙ₋₁ + 3'],
                ['7-tel osztva 4 maradék', '4; 11; 18; 25; 32', 'aₙ = 7n − 3', 'a₁ = 4, aₙ = aₙ₋₁ + 7']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="B) Rekurzív sorozatok (2–3. feladat)" badge="2–3. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₁ = 3, aₙ = 2aₙ₋₁ − 4: 3; 2; 0; −4; −12; −28; −60; −124.</li>
              <li>a₁ = 5, minden tag 2-vel nagyobb az előzőnél: 5; 7; 9; 11; 13; 15, képlettel aₙ = 2n + 3.</li>
              <li>b₁ = 8, minden tag az előző fele: 8; 4; 2; 1; 1/2; 1/4, képlettel bₙ = 16/2ⁿ.</li>
              <li>c₁ = 3, c₂ = 1, cₙ = cₙ₋₁ − cₙ₋₂: 3; 1; −2; −3; −1; 2; … hat tagonként ismétlődik.</li>
            </ul>
            <PeriodicRecursionSvg className="w-full h-auto mt-3" />
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) A biztonsági őr (érettségi, 2021 nyomán)" badge="5. feladat" badgeColor="emerald">
            <GuardScheduleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A beosztás 6 naponként ismétlődik (4 munkanap, 2 pihenő).</li>
              <li>
                100 = 16 · 6 + 4 → a ciklus 4. napja: <strong>dolgozik</strong>.
              </li>
              <li>
                A 100. nap reggelén 99 nap telt el: 99 = 16 · 6 + 3 → 16 · 4 + 3 = <strong>67</strong> munkanap.
              </li>
              <li>
                A 125. nap reggelén: 124 = 20 · 6 + 4 → 20 · 4 + 4 = <strong>84</strong> munkanap.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Váltakozó előjelű sorozatok" badge="4. feladat, HF" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>aₙ = 8 · (−1)ⁿ: a₁ = −8, a₂ = 8, a₃ = −8, a₄ = 8, a₁₂ = 8, a₁₇ = −8.</li>
              <li>Értékkészlete kételemű: {'{−8; 8}'}. Az első 25 tag összege: 12 pár (0) + a₂₅ = −8.</li>
              <li>HF: páratlan sorszámú tagok 24, párosak −23: S₁₀ = 5 · 1 = 5, S₁₅ = 7 · 1 + 24 = 31.</li>
              <li>HF (érettségi, 2021): a₁ = 5, minden tag az előző (−2)-szeresénél 1-gyel nagyobb: a₂ = −9, a₃ = 19, a₆ = −149.</li>
              <li>HF: cₙ = n(n − 1) + 2: c₁ = 2, c₁₀ = 92, c₁₀₀ = 9902; cₙ = 8, 74, 602 ⇒ n = 3, 9, 25.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: elcsúszott sorszám" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A k = 0 nem az első tag sorszáma"
          wrong="A 8-cal osztva 5 maradékot adó számok sorozata: aₙ = 8n + 5."
          wrongExplanation="Ekkor a₁ = 13 lenne, az 5 kimaradna. A 8k + 5 alakban k = 0, 1, 2, … fut, a sorozat indexe viszont n = 1, 2, 3, …"
          correct="k helyére n − 1-et írunk: aₙ = 8(n − 1) + 5 = 8n − 3."
          correctExplanation="Mindig ellenőrizd a képletet az első tagra: a₁ = 8 · 1 − 3 = 5 ✓."
          tip="Rekurzív megadásnál a kezdőtag(ok) nélkül a sorozat nincs meghatározva!"
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: Maradékos sorozatok – képlet és rekurzió" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Osztó: m = {m}</label>
                <input type="range" min="2" max="12" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-blue-600" aria-label="osztó" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Maradék: r = {rr}</label>
                <input type="range" min="0" max={m - 1} value={rr} onChange={(e) => setR(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="maradék" />
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 text-sm text-blue-900 space-y-1">
                <div>
                  <strong>Utasítás:</strong> {WITH[m]} osztva {rr} maradékot adó pozitív egészek növekvő sorozata
                </div>
                <div>
                  <strong>Rekurzió:</strong> a₁ = {first}, aₙ = aₙ₋₁ + {m}
                </div>
                <div>
                  <strong>Képlet:</strong> aₙ = {m}n{shift === 0 ? '' : ` − ${shift}`}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <TheoryTable
                headers={['n', ...byRule.map((_, i) => String(i + 1))]}
                rows={[
                  ['rekurzióval', ...byRule.map((v) => String(v))],
                  ['képlettel', ...byFormula.map((v) => String(v))]
                ]}
              />
              <div className="text-xs text-emerald-700 font-bold text-center">
                {byRule.every((v, i) => v === byFormula[i]) ? '✓ A két megadás ugyanazt a sorozatot adja.' : '✗ Eltérés!'}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: Rekurziógép" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((pr) => (
                  <button key={pr.name} onClick={() => applyPreset(pr)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-purple-100">
                    {pr.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {[1, 2].map((md) => (
                  <button
                    key={md}
                    onClick={() => setMode(md as 1 | 2)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === md ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {md === 1 ? 'aₙ = p · aₙ₋₁ + s' : 'aₙ = p · aₙ₋₁ + s · aₙ₋₂'}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">a₁ = {fmt(a1)}</label>
                  <input type="range" min="-10" max="10" step="1" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="w-full accent-purple-600" aria-label="a1" />
                </div>
                {mode === 2 && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">a₂ = {fmt(a2)}</label>
                    <input type="range" min="-10" max="10" step="1" value={a2} onChange={(e) => setA2(Number(e.target.value))} className="w-full accent-purple-600" aria-label="a2" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">p = {fmt(p)}</label>
                  <input type="range" min="-3" max="3" step="0.5" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-blue-600" aria-label="p" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">s = {fmt(s)}</label>
                  <input type="range" min="-6" max="6" step="1" value={s} onChange={(e) => setS(Number(e.target.value))} className="w-full accent-amber-600" aria-label="s" />
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-sm text-purple-900">
                <div className="font-bold">{ruleText}</div>
                <div className="text-xs text-slate-700 mt-2 break-words">
                  {rec.map((v, i) => `a${sub(i + 1)} = ${fmt(v, 3)}`).join(';  ')}
                </div>
              </div>
            </div>
            <SeqPlot values={rec} className="w-full max-w-md h-auto mx-auto" w={320} h={210} />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SequenceDefinitionTheory;
