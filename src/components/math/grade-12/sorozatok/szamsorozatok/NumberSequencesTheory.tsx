import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { SeqPlot, fmt, fmtInt } from './seqKit';
import { StairsSvg, SequenceFunctionSvg, PointGraphSvg, JokeTreeSvg, RepeatingDecimalSvg } from './NumberSequencesFigures';

type FormulaKey = 'sq' | 'odd' | 'recip' | 'alt' | 'frac' | 'log' | 'binom' | 'digit';
const FORMULAS: Record<FormulaKey, { label: string; f: (n: number) => number }> = {
  sq: { label: 'aₙ = n²', f: (n) => n * n },
  odd: { label: 'aₙ = 2n − 1', f: (n) => 2 * n - 1 },
  recip: { label: 'aₙ = 1/n', f: (n) => 1 / n },
  alt: { label: 'aₙ = (−1)ⁿ', f: (n) => (n % 2 === 0 ? 1 : -1) },
  frac: { label: 'aₙ = n/(n + 1)', f: (n) => n / (n + 1) },
  log: { label: 'aₙ = log₄ n', f: (n) => Math.log(n) / Math.log(4) },
  binom: { label: 'aₙ = n(n − 1)/2', f: (n) => (n * (n - 1)) / 2 },
  digit: { label: 'aₙ = 5/7 n-edik tizedesjegye', f: (n) => Number('714285'[(n - 1) % 6]) }
};

const stairCount = (n: number, maxStep: number): number[] => {
  const a: number[] = [];
  for (let k = 1; k <= n; k++) {
    let v = 0;
    for (let s = 1; s <= maxStep; s++) {
      if (k - s === 0) v += 1;
      else if (k - s > 0) v += a[k - s - 1];
    }
    a.push(v);
  }
  return a;
};

const listWalks = (n: number, maxStep: number): number[][] => {
  const out: number[][] = [];
  const rec = (left: number, path: number[]) => {
    if (out.length > 40) return;
    if (left === 0) {
      out.push(path);
      return;
    }
    for (let s = 1; s <= maxStep && s <= left; s++) rec(left - s, [...path, s]);
  };
  rec(n, []);
  return out;
};

export const NumberSequencesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [fk, setFk] = useState<FormulaKey>('sq');
  const [count, setCount] = useState<number>(8);
  const [k, setK] = useState<number>(5);
  // Labor II
  const [stairs, setStairs] = useState<number>(8);
  const [maxStep, setMaxStep] = useState<number>(2);

  const values = useMemo(() => Array.from({ length: count }, (_, i) => FORMULAS[fk].f(i + 1)), [fk, count]);
  const kk = Math.min(k, count);
  const stairSeq = useMemo(() => stairCount(stairs, maxStep), [stairs, maxStep]);
  const walks = useMemo(() => (stairs <= 6 ? listWalks(stairs, maxStep) : []), [stairs, maxStep]);

  return (
    <TheoryTemplate
      topicId="g12-sorozatok"
      subtopicId="szamsorozatok"
      title="1. Számsorozatok"
      subtitle="A lépcsőzés lehetőségeitől a periodikus tizedes törtig: a sorozat mint függvény, a tagok jelölése és a pontgrafikon."
      badge="12. OSZTÁLY • II. SOROZATOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_szamsorozatok_tananyag.pdf"
      practiceTitle="Készen állsz a számsorozatos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A SOROZAT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">sorozat: ℤ⁺ → ℝ függvény, n ↦ aₙ</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                A sorozat valós számok <strong>végtelen sok tagból álló</strong> felsorolása: a₁; a₂; a₃; …; aₙ; …
              </li>
              <li>
                Jelölés: a sorozat {'{aₙ}'}, az n-edik (általános) tag <strong>aₙ</strong>.
              </li>
              <li>Ábrázolás: pontgrafikon – különálló pontok (n; aₙ), összekötés nélkül.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Kidolgozott feladat: hányféleképpen mehetünk fel a lépcsőn?" badge="Tankönyv 52. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy lépcsőn felfelé haladva minden lépésnél <strong>1 vagy 2 fokot</strong> lépünk. Hányféleképpen juthatunk fel a 2., a 4., illetve a 8. fokra?
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Az 1. fokra egyféleképpen léphetünk: a₁ = 1.</li>
              <li>A 2. fokra kétféleképpen: egy 2-es lépéssel vagy két 1-essel: a₂ = 2.</li>
              <li>
                A 3. fokra a 2. fokról (utolsó lépés 1) vagy az 1. fokról (utolsó lépés 2) érkezünk: a₃ = a₂ + a₁ = 3.
              </li>
              <li>Ugyanígy a₄ = a₃ + a₂ = 3 + 2 = 5.</li>
              <li>
                Általában n ≥ 3 esetén {'a_n = a_{n−1} + a_{n−2}'}: minden tag az előző kettőből számolható.
              </li>
            </ol>
            <TheoryTable headers={['a₁', 'a₂', 'a₃', 'a₄', 'a₅', 'a₆', 'a₇', 'a₈']} rows={[['1', '2', '3', '5', '8', '13', '21', '34']]} />
            <p>
              Válasz: a 2. fokra 2, a 4. fokra 5, a 8. fokra <strong>34</strong> különböző módon juthatunk fel.
            </p>
          </div>
          <StairsSvg />
        </div>
        <TheoryCallout type="warning" title="Óvatosan a folytatással!">
          Az első három tag 1; 2; 3 – de a következő nem 4, hanem 5. Néhány tagból nem dönthető el, hogyan folytatódik egy sorozat; a szabályt (itt a lépcsőzés logikáját) kell ismernünk.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="2. A sorozat fogalma" badge="Elmélet" badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Sorozatról</strong> (számsorozatról) beszélünk, ha valós számoknak egy <strong>végtelen sok tagból álló felsorolását</strong> adjuk meg.
            </p>
            <p>
              A sorozat olyan <strong>függvény</strong>, amelynek értelmezési tartománya a pozitív egész számok halmaza (ℤ⁺), képhalmaza a valós számok halmaza. Az 1-hez az első tagot, a 2-höz a második tagot, …, az n-hez az n-edik tagot rendeli: n ↦ aₙ.
            </p>
            <TheoryTable
              headers={['Jelölés', 'Jelentés']}
              rows={[
                ['{aₙ}', 'a sorozat'],
                ['a₁; a₂; a₃; …', 'a sorozat 1., 2., 3., … tagja'],
                ['aₙ', 'az n-edik (általános) tag'],
                ['a₁₈', 'a 18. tag (pl. a lépcsőn a 18. fokra jutás lehetőségeinek száma)']
              ]}
            />
          </div>
          <SequenceFunctionSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. A sorozat ábrázolása: pontgrafikon" badge="Elmélet" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PointGraphSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Mivel az értelmezési tartomány csak a pozitív egészekből áll, a sorozat grafikonja a koordináta-rendszerben <strong>különálló pontok</strong> halmaza: (1; a₁), (2; a₂), (3; a₃), …
            </p>
            <p>
              Példa (tankönyvi 4. feladat): a {'{kₙ}'} sorozat tagjai 0; 1; 3; 6; 10; 15; … – ez a sorozat megegyezik az i(n) = (n² − n)/2 függvénnyel a pozitív egészeken, mert (n² − n)/2 = n(n − 1)/2 (n elemből kiválasztható párok száma).
            </p>
            <p>
              Egy sorozat <strong>tagjait felsorolhatjuk</strong> is egy képlet alapján (házi feladat 3.): aₙ = (60 + n)/n: 61; 31; 21; 16; 13; … – bₙ = n/(n + 1): 1/2; 2/3; 3/4; 4/5; 5/6; … – cₙ = log₄ n: 0; 1/2; log₄ 3; 1; log₄ 5; …
            </p>
          </div>
        </div>
        <TheoryCard title="Grafikonról a hozzárendelési szabályig" badge="1. feladat" badgeColor="sky">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <SeqPlot values={[6, 3, 2, 1.5, 1.2, 1, 6 / 7]} title="a)" />
              <p className="text-sm text-slate-700">
                Pontok: 6; 3; 2; 1,5; 1,2; 1; … – a tag és a sorszám szorzata mindig 6: <strong>aₙ = 6/n</strong>.
              </p>
            </div>
            <div className="space-y-2">
              <SeqPlot values={[3.75, 3.5, 3.25, 3, 2.75, 2.5, 2.25]} title="b)" />
              <p className="text-sm text-slate-700">
                Pontok: 3,75; 3,5; 3,25; 3; … – lépésenként 1/4-del csökken: <strong>bₙ = 4 − n/4</strong> = (16 − n)/4.
              </p>
            </div>
            <div className="space-y-2">
              <SeqPlot values={[1, 2, 4, 8]} title="c)" />
              <p className="text-sm text-slate-700">
                Pontok: 1; 2; 4; 8 – minden tag az előző kétszerese: <strong>cₙ = 2ⁿ⁻¹</strong>.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladatok a leckéből" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Visszafelé a lépcsőn" badge="2. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>a₁₈, a₁₉, a₂₀: hányféleképpen juthatunk fel a 18., 19., 20. fokra.</li>
              <li>Adott a₁₈ = 4181 és a₂₀ = 10 946.</li>
              <li>
                a₂₀ = a₁₉ + a₁₈ ⇒ a₁₉ = 10 946 − 4181 = <strong>6765</strong>.
              </li>
              <li>
                a₁₉ = a₁₈ + a₁₇ ⇒ a₁₇ = 6765 − 4181 = <strong>2584</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Számjegyek sorozata" badge="3. feladat" badgeColor="purple">
            <RepeatingDecimalSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>5/7 = 0,714285714285…: a 6 jegyű szakasz ismétlődik.</li>
              <li>8 = 6 + 2 → a 2. jegy: <strong>1</strong>; 90 = 15 · 6 → a 6. jegy: <strong>5</strong>; 970 = 161 · 6 + 4 → a 4. jegy: <strong>2</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) A vicc terjedése" badge="Házi feladat 1." badgeColor="emerald">
            <JokeTreeSvg className="w-full h-auto mb-3" />
            <TheoryTable
              headers={['', 'hétfő', 'kedd', 'szerda', 'csüt.', 'péntek', 'szombat']}
              rows={[
                ['új hallgató', '3', '9', '27', '81', '243', '729'],
                ['összesen', '4', '13', '40', '121', '364', '1093']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="D) A hüllőállomány modellje" badge="Házi feladat 2." badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Kezdetben 201 egyed; évente duplázódik, majd 200 egyed elpusztul.</li>
              <li>Képlet a következő évre: {'a_{n+1} = 2 · a_n − 200'}.</li>
              <li>Egyedszámok: 201; 202; 204; 208; 216; 232; 264; 328; 456; 712.</li>
              <li>
                Az állomány <strong>nem marad közel azonos</strong>: a 200 fölötti többlet (1; 2; 4; 8; …) évente duplázódik, aₙ = 200 + 2ⁿ⁻¹.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: néhány tagból „kitalált” szabály" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az első néhány tag nem határozza meg a sorozatot"
          wrong="1; 2; 3; … biztosan a pozitív egészek sorozata, tehát a 4. tag 4."
          wrongExplanation="A lépcsős feladatban is 1; 2; 3 az első három tag, mégis a₄ = 5. Véges sok taghoz végtelen sok különböző szabály illeszthető."
          correct="Egy sorozatot a hozzárendelési szabály (képlet, rekurzió vagy pontos utasítás) határoz meg, nem néhány tagja."
          correctExplanation="Ha csak tagokat látunk, a sejtett szabályt mindig a feladat szövegével kell igazolnunk."
          tip="A pontgrafikon pontjait se kösd össze: a sorozatnak nincs „1,5-edik” tagja."
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: Pontgrafikon-rajzoló" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-semibold text-slate-600 mb-1">Válassz sorozatot!</span>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(FORMULAS) as FormulaKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setFk(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${fk === key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                    >
                      {FORMULAS[key].label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Ábrázolt tagok száma: {count}</label>
                <input type="range" min="3" max="16" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-blue-600" aria-label="tagok száma" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kiemelt tag sorszáma: k = {kk}</label>
                <input type="range" min="1" max={count} value={kk} onChange={(e) => setK(Number(e.target.value))} className="w-full accent-rose-600" aria-label="kiemelt tag" />
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-sm text-blue-900">
                <div className="font-bold">{FORMULAS[fk].label}</div>
                <div className="font-mono mt-1">
                  a{String(kk).split('').map((c) => String.fromCharCode(0x2080 + Number(c))).join('')} = {fmt(values[kk - 1], 4)}
                </div>
                <div className="text-xs text-slate-600 mt-2 break-words">Tagok: {values.map((v) => fmt(v, 3)).join('; ')}; …</div>
              </div>
            </div>
            <SeqPlot values={values} highlight={[kk - 1]} className="w-full max-w-md h-auto mx-auto" w={320} h={210} />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: Lépcsőszámláló" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A lépcsőfok sorszáma: n = {stairs}</label>
                <input type="range" min="1" max="20" value={stairs} onChange={(e) => setStairs(Number(e.target.value))} className="w-full accent-purple-600" aria-label="lépcsőfok" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[2, 3].map((s) => (
                  <button
                    key={s}
                    onClick={() => setMaxStep(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${maxStep === s ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    egyszerre {s === 2 ? '1 vagy 2' : '1, 2 vagy 3'} fok
                  </button>
                ))}
              </div>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-4 text-sm text-purple-900">
                <div className="text-xs text-purple-700 mb-1">Lehetőségek száma az n-edik fokig:</div>
                <div className="font-black text-2xl">{fmtInt(stairSeq[stairs - 1])}</div>
                <div className="text-xs text-slate-600 mt-2">
                  Szabály: {maxStep === 2 ? 'aₙ = aₙ₋₁ + aₙ₋₂ (a₁ = 1, a₂ = 2)' : 'aₙ = aₙ₋₁ + aₙ₋₂ + aₙ₋₃ (a₁ = 1, a₂ = 2, a₃ = 4)'}
                </div>
              </div>
              <div className="text-xs text-slate-600 break-words">Sorozat: {stairSeq.map(fmtInt).join('; ')}</div>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700">
              {stairs <= 6 ? (
                <>
                  <div className="font-bold mb-2">Az összes lépéssorozat (n ≤ 6 esetén felsoroljuk):</div>
                  <div className="flex flex-wrap gap-1.5">
                    {walks.map((w, i) => (
                      <span key={i} className={`px-2 py-0.5 rounded-md font-mono text-xs ${w[w.length - 1] === 1 ? 'bg-emerald-100 text-emerald-800' : w[w.length - 1] === 2 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                        {w.join('+')}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs mt-3">
                    Zöld: utolsó lépés 1 · piros: utolsó lépés 2{maxStep === 3 ? ' · sárga: utolsó lépés 3' : ''} – a csoportok mérete éppen az előző tagok.
                  </div>
                </>
              ) : (
                <div>
                  n &gt; 6 esetén már túl sok a lehetőség a felsoroláshoz – a rekurzió viszont pillanatok alatt kiszámolja: {fmtInt(stairSeq[stairs - 1])}.
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NumberSequencesTheory;
