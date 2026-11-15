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
  ExpGraphTaskSvg,
  LogNumberLineSvg,
  DecayHundredthSvg,
  LifeExpectancySvg,
  RichterScaleSvg
} from './LogPractice1Figures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  return Number(x.toFixed(d)).toLocaleString('hu-HU', { maximumFractionDigits: d });
};
/** Normál alak: m · 10^k */
const sci = (x: number) => {
  if (!Number.isFinite(x) || x <= 0) return '–';
  const k = Math.floor(Math.log10(x));
  const m = x / Math.pow(10, k);
  return (
    <>
      {fmt(m, 2)} · 10<sup>{k}</sup>
    </>
  );
};
const parseNum = (s: string) => {
  const t = s.trim().replace(/\s/g, '').replace(',', '.').replace('−', '-');
  if (t.includes('/')) {
    const [a, b] = t.split('/').map(Number);
    return b ? a / b : NaN;
  }
  return t === '' ? NaN : Number(t);
};

type Drill = { q: string; answers: number[]; tol: number; hint: string; solution: string };
const DRILLS: Drill[] = [
  { q: 'log₃ 81 = ?', answers: [4], tol: 1e-9, hint: '3 hányadik hatványa a 81?', solution: '3⁴ = 81, tehát log₃ 81 = 4.' },
  { q: 'log₂ (3 − x) = 0, x = ?', answers: [2], tol: 1e-9, hint: 'log₂ y = 0 ⇔ y = 1', solution: '3 − x = 2⁰ = 1 ⇒ x = 2 (és x < 3 teljesül).' },
  { q: '4ˣ = 8, x = ? (tizedes tört)', answers: [1.5], tol: 1e-9, hint: 'Írd fel mindkét oldalt 2 hatványaként!', solution: '2²ˣ = 2³ ⇒ 2x = 3 ⇒ x = 1,5.' },
  { q: '2ˣ = 10, x = ? (3 tizedesjegy)', answers: [3.322], tol: 0.0006, hint: 'x = lg 10 / lg 2', solution: 'x = 1 / lg 2 ≈ 3,322.' },
  { q: 'log₁₆ x = −1/2, x = ?', answers: [0.25], tol: 1e-9, hint: 'x = 16 a −1/2-ediken', solution: 'x = 1 / √16 = 1/4 = 0,25.' },
  { q: 'log₂ x² = 4, x = ? (az egyik megoldás)', answers: [4, -4], tol: 1e-9, hint: 'x² = 2⁴', solution: 'x² = 16 ⇒ x = 4 vagy x = −4 (mindkettő jó, mert x² > 0).' },
  { q: 'lg x = −2, x = ?', answers: [0.01], tol: 1e-9, hint: 'x = 10⁻²', solution: 'x = 10⁻² = 0,01.' },
  { q: '3 · 5ˣ = 75, x = ?', answers: [2], tol: 1e-9, hint: 'Előbb oszd el 3-mal!', solution: '5ˣ = 25 = 5² ⇒ x = 2.' }
];

export const LogPractice1Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: Richter-skála
  const [mag, setMag] = useState<number>(9.3);
  const [mag2, setMag2] = useState<number>(7.3);
  const energy = (M: number) => Math.pow(10, 1.5 * (M + 4.42));
  const ratio = Math.pow(10, 1.5 * (mag - mag2));

  // Labor II: érettségi gyorsteszt
  const [drill, setDrill] = useState<number>(0);
  const [answer, setAnswer] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [solved, setSolved] = useState<number[]>([]);
  const cur = DRILLS[drill];
  const val = parseNum(answer);
  const ok = Number.isFinite(val) && cur.answers.some((a) => Math.abs(a - val) <= cur.tol);

  const choose = (i: number) => {
    setDrill(i);
    setAnswer('');
    setChecked(false);
    setShowHint(false);
  };
  const check = () => {
    setChecked(true);
    if (ok && !solved.includes(drill)) {
      setSolved((s) => [...s, drill]);
      setScore((s) => s + 1);
    }
  };

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="gyakorlas-logaritmus-1"
      title="13. Gyakorlás"
      subtitle="Érettségi feladatok exponenciális függvényre, logaritmusos és exponenciális egyenletekre, valamint logaritmikus képletekre (élettartam, Richter-skála)."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_logaritmus_gyakorlas_1_tananyag.pdf"
      practiceTitle="Készen állsz a logaritmusos érettségi feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'ÖSSZEFOGLALÓ — HATVÁNY ÉS LOGARITMUS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              log<sub>a</sub> b = c  ⇔  a<sup>c</sup> = b   (a &gt; 0, a ≠ 1, b &gt; 0)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Exponenciális egyenlet:</strong> aˣ = b ⇒ x = lg b / lg a; ha lehet, írjunk közös alapot (4ˣ = 8 ⇒ 2²ˣ = 2³).
              </li>
              <li>
                <strong>Logaritmusos egyenlet:</strong> log<sub>a</sub> f(x) = c ⇒ f(x) = a<sup>c</sup>; mindig ellenőrizzük, hogy f(x) &gt; 0.
              </li>
              <li>
                <strong>Exponenciális függvény:</strong> f(x) = aˣ értékkészlete pozitív; a &gt; 1 esetén nő, 0 &lt; a &lt; 1 esetén csökken.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglaló */}
      <TheorySection title="1. Összefoglaló: amit eddig tanultunk" badge="Ismétlés" badgeColor="violet">
        <TheoryTable
          headers={['Téma', 'Szabály', 'Példa']}
          rows={[
            ['Hatványozás azonosságai', 'aⁿ · aᵐ = aⁿ⁺ᵐ, (aⁿ)ᵐ = aⁿᵐ, a⁻ⁿ = 1/aⁿ', '2³ · 2⁴ = 2⁷'],
            ['n-edik gyök, törtkitevő', 'a^{p/q} = (q-adik gyök a)ᵖ', '8^{2/3} = (∛8)² = 4'],
            ['Kamatos kamat', 'Tₙ = T₀ · (1 + p/100)ⁿ', '100 000 · 1,05³ = 115 762,5'],
            ['Exponenciális függvény', 'x ↦ aˣ, értékkészlet: pozitív számok', '0,5ˣ csökkenő'],
            ['Felezési idő', 'm(t) = m₀ · (1/2)^{t/T}', 'T = 8 nap: 80 g → 10 g 24 nap alatt'],
            ['Logaritmus', 'log_a b = c ⇔ aᶜ = b', 'log₃ 81 = 4'],
            ['Tízes alapú logaritmus', 'lg b = log₁₀ b; log_a b = lg b / lg a', '2ˣ = 10 ⇒ x ≈ 3,322']
          ]}
        />
      </TheorySection>

      {/* 2. Exponenciális függvény */}
      <TheorySection title="2. Érettségi 2013: egy exponenciális függvény grafikonja" badge="1. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              Az ábrán az f: [−2; 1] → R, f(x) = aˣ függvény grafikonja látható. a) Add meg az f értékkészletét! b) Határozd meg az a értékét!
            </p>
            <TheoryCard title="Megoldás" badge="Kidolgozva" badgeColor="emerald">
              <ul className="list-disc pl-5 space-y-1">
                <li>A grafikon csökkenő, így a legnagyobb érték az x = −2-nél, a legkisebb az x = 1-nél van: f(−2) = 4 és f(1) = 0,5.</li>
                <li>
                  <strong>a)</strong> Értékkészlet: <strong>[0,5; 4]</strong>.
                </li>
                <li>
                  <strong>b)</strong> f(1) = a¹ = 0,5, tehát <strong>a = 1/2</strong>. Ellenőrzés: (1/2)⁻² = 2² = 4. ✓
                </li>
              </ul>
            </TheoryCard>
          </div>
          <ExpGraphTaskSvg />
        </div>
      </TheorySection>

      {/* 3. Egyenletek */}
      <TheorySection title="3. Logaritmusos és exponenciális egyenletek (érettségi)" badge="2–4. feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="2. a) log₁₆ x = −1/2 (2007)" badge="Logaritmus" badgeColor="violet">
            <p className="text-sm text-slate-700">
              A definíció szerint x = 16<sup>−1/2</sup> = 1 / √16 = <strong>1/4</strong>. Pozitív, tehát megfelel.
            </p>
            <LogNumberLineSvg className="w-full h-auto mt-2" />
          </TheoryCard>
          <TheoryCard title="2. b) log₂ x² = 4 (2012)" badge="Logaritmus" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A definíció szerint x² = 2⁴ = 16.</li>
              <li>
                x = <strong>4</strong> vagy x = <strong>−4</strong>. Mindkettő megoldás, mert x² mindkét esetben pozitív (16), így a logaritmus értelmezett.
              </li>
              <li>Gyakori hiba: csak a 4-et megadni.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. 2ˣ = 10, három tizedesjegyre (2016)" badge="Exponenciális" badgeColor="sky">
            <p className="text-sm text-slate-700">
              x = log₂ 10 = lg 10 / lg 2 = 1 / 0,30103 ≈ <strong>3,322</strong>. Becslés: 2³ = 8 &lt; 10 &lt; 16 = 2⁴. ✓
            </p>
          </TheoryCard>
          <TheoryCard title="4. Radioaktív bomlás (2015)" badge="Hatvány" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              Kezdetben 6 · 10²³ részecske, percenként a századrészére csökken: 10 perc után 6 · 10²³ · (10⁻²)¹⁰ = 6 · 10²³⁻²⁰ = <strong>6 · 10³ = 6000</strong>.
            </p>
            <DecayHundredthSvg className="w-full h-auto mt-2" />
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Képletek */}
      <TheorySection title="4. Logaritmikus képletek a valóságban" badge="5–6. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryCard title="5. Várható élettartam és GDP" badge="Érettségi nyomán" badgeColor="amber">
              <p className="text-center font-mono font-bold text-violet-900 mb-2">
                É = 75,5 − 5 · 10<sup>(6000 − G) / 6090</sup>
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>
                  <strong>a)</strong> G = 1090: kitevő 4910 / 6090 ≈ 0,8062, 10<sup>0,8062</sup> ≈ 6,40 ⇒ É ≈ 75,5 − 32,0 ≈ <strong>43,5 év</strong>.
                </li>
                <li>
                  <strong>b)</strong> G = 3 · 1090 = 3270: kitevő ≈ 0,4483, 10<sup>0,4483</sup> ≈ 2,81 ⇒ É ≈ 61,5 év, tehát kb. <strong>18 évvel nő</strong>.
                </li>
                <li>
                  <strong>c)</strong> É = 68: 5 · 10<sup>k</sup> = 7,5 ⇒ 10<sup>k</sup> = 1,5 ⇒ k = lg 1,5 ≈ 0,1761 ⇒ 6000 − G ≈ 1072 ⇒ <strong>G ≈ 4928 USD</strong>.
                </li>
              </ul>
            </TheoryCard>
            <LifeExpectancySvg />
          </div>
          <div className="space-y-3">
            <TheoryCard title="6. Richter-skála: M = −4,42 + (2/3) · lg E (2011)" badge="Érettségi" badgeColor="rose">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>
                  <strong>a)</strong> E = 1,344 · 10¹⁴ J: lg E ≈ 14,128 ⇒ M ≈ −4,42 + 9,419 ≈ <strong>5,0</strong>.
                </li>
                <li>
                  <strong>b)</strong> M = 9,3: lg E = 1,5 · (9,3 + 4,42) = 20,58 ⇒ E ≈ <strong>3,8 · 10²⁰ J</strong>.
                </li>
                <li>
                  <strong>c)</strong> 2-vel nagyobb M: lg E 1,5 · 2 = 3-mal nagyobb ⇒ <strong>1000-szer</strong> akkora energia.
                </li>
              </ul>
            </TheoryCard>
            <RichterScaleSvg />
          </div>
        </div>
      </TheorySection>

      {/* 5. Házi feladat */}
      <TheorySection title="5. Házi feladatok – ellenőrizd az eredményed!" badge="Házi feladat" badgeColor="slate">
        <TheoryTable
          headers={['Feladat', 'Megoldás', 'Eredmény']}
          rows={[
            ['1. log₃ 81 (2009)', '3⁴ = 81', '4'],
            ['2. a) log₂ (3 − x) értelmezése (2014)', '3 − x > 0', 'x < 3'],
            ['2. b) log₂ (3 − x) = 0', '3 − x = 1', 'x = 2'],
            ['3. 4ˣ = 8 (2018)', '2²ˣ = 2³', 'x = 1,5'],
            ['4. f(x) = 0,122 · 2^{0,822x} = 25 (2019 nyomán)', '2^{0,822x} ≈ 204,9 ⇒ x ≈ 9,34', '2012 + 9,34 → 2021'],
            ['5. a) lg pₘ = 0,8 · lg 20 + 0,301 (2011)', 'lg pₘ ≈ 1,342', 'pₘ ≈ 22 Pa'],
            ['5. b) lg 50 = 0,8 · lg pᵥ + 0,301', 'lg pᵥ ≈ 1,747', 'pᵥ ≈ 55,9 Pa']
          ]}
        />
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: elveszett megoldás, elfelejtett feltétel" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="log₂ x² = 4"
          wrong="2 · log₂ x = 4 ⇒ log₂ x = 2 ⇒ x = 4"
          wrongExplanation="A log₂ x² = 2 · log₂ x átalakítás csak x > 0 esetén igaz, így elveszítjük a negatív megoldást."
          correct="x² = 2⁴ = 16 ⇒ x = 4 vagy x = −4"
          correctExplanation="Közvetlenül a definíciót használjuk: a logaritmus argumentuma x², ami mindkét esetben 16 > 0. Mindkét szám megoldás."
          tip="Logaritmusos egyenletnél mindig írd fel az értelmezési tartományt (pl. log₂ (3 − x)-nél x < 3), és a végén ellenőrizz!"
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Richter-skála kalkulátor" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">1. földrengés erőssége: M₁ = {fmt(mag, 1)}</label>
              <input type="range" min="1" max="9.5" step="0.1" value={mag} onChange={(e) => setMag(Number(e.target.value))} className="w-full accent-violet-600" aria-label="első magnitúdó" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">2. földrengés erőssége: M₂ = {fmt(mag2, 1)}</label>
              <input type="range" min="1" max="9.5" step="0.1" value={mag2} onChange={(e) => setMag2(Number(e.target.value))} className="w-full accent-fuchsia-600" aria-label="második magnitúdó" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              [9.3, 7.3, 'Szumátra vs. 2-vel kisebb'],
              [5, 4, '+1 magnitúdó'],
              [9.3, 5, 'Szumátra vs. Nagaszaki']
            ].map(([a, b, n]) => (
              <button
                key={String(n)}
                onClick={() => {
                  setMag(Number(a));
                  setMag2(Number(b));
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-50 text-violet-800 hover:bg-violet-100"
              >
                {n}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-violet-50 rounded-xl border border-violet-200 p-4 space-y-1">
              <div className="font-bold text-violet-800">E₁ (M₁ = {fmt(mag, 1)})</div>
              <div>lg E₁ = 1,5 · (M₁ + 4,42) = {fmt(1.5 * (mag + 4.42), 3)}</div>
              <div>
                E₁ ≈ <strong>{sci(energy(mag))} J</strong>
              </div>
            </div>
            <div className="bg-fuchsia-50 rounded-xl border border-fuchsia-200 p-4 space-y-1">
              <div className="font-bold text-fuchsia-800">E₂ (M₂ = {fmt(mag2, 1)})</div>
              <div>lg E₂ = 1,5 · (M₂ + 4,42) = {fmt(1.5 * (mag2 + 4.42), 3)}</div>
              <div>
                E₂ ≈ <strong>{sci(energy(mag2))} J</strong>
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 space-y-1">
              <div className="font-bold text-amber-800">Arány</div>
              <div>
                E₁ / E₂ = 10<sup>1,5 · ({fmt(mag - mag2, 1)})</sup>
              </div>
              <div>
                ≈ <strong>{ratio >= 1e4 || ratio < 0.01 ? sci(ratio) : fmt(ratio, 2)}</strong>-szeres
              </div>
            </div>
          </div>
          <TheoryCallout type="tip" title="Miért logaritmus?">
            Az energiák 10⁵-től 10²¹ jouleig terjednek – a logaritmus ezt a hatalmas tartományt egy 1-től 9-ig terjedő, könnyen kezelhető skálára „zsugorítja”.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: érettségi gyorsteszt" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {DRILLS.map((d, i) => (
              <button
                key={d.q}
                onClick={() => choose(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  drill === i ? 'bg-emerald-600 text-white' : solved.includes(i) ? 'bg-emerald-200 text-emerald-900' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                {i + 1}. {solved.includes(i) ? '✓' : ''}
              </button>
            ))}
            <span className="self-center text-xs font-bold text-slate-600">
              Pontszám: {score} / {DRILLS.length}
            </span>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3 text-sm text-slate-700">
            <div className="text-lg font-black text-slate-900 font-mono">{cur.q}</div>
            <div className="flex flex-wrap gap-2 items-center">
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  setChecked(false);
                }}
                className="px-3 py-2 rounded-lg border border-emerald-200 font-mono w-40"
                aria-label="válasz"
                placeholder="pl. 1,5 vagy 1/4"
              />
              <button onClick={check} className="px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 text-white">
                Ellenőrzés
              </button>
              <button onClick={() => setShowHint(true)} className="px-4 py-2 rounded-lg text-sm font-bold bg-amber-100 text-amber-800">
                Tipp
              </button>
              <button onClick={() => choose((drill + 1) % DRILLS.length)} className="px-4 py-2 rounded-lg text-sm font-bold bg-slate-100 text-slate-700">
                Következő
              </button>
            </div>
            {showHint && <div className="text-amber-800">Tipp: {cur.hint}</div>}
            {checked && (
              <div className={`font-bold ${ok ? 'text-emerald-700' : 'text-rose-700'}`}>
                {ok ? `Helyes! ${cur.solution}` : 'Még nem jó – próbáld újra, vagy kérj tippet!'}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LogPractice1Theory;
