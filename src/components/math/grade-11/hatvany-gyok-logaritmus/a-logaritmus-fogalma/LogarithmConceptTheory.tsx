import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  LogConceptConditionsSvg,
  LogConceptDefinitionSvg,
  LogConceptGraphSvg,
  LogConceptSlideRuleSvg,
  LogConceptTripleSvg
} from './LogarithmConceptFigures';

/** logₐ b jelölése alsó indexszel. */
const L: React.FC<{ b: React.ReactNode; children: React.ReactNode }> = ({ b, children }) => (
  <span className="whitespace-nowrap">
    log<sub className="text-[0.7em]">{b}</sub> {children}
  </span>
);

const fmt = (x: number, d = 4) => {
  if (!Number.isFinite(x)) return '–';
  const s = Number(x.toFixed(d)).toString();
  return s.replace('.', ',').replace('-', '−');
};

/** Ha x jó közelítéssel p/q (q ≤ 12), visszaadja a tört alakot. */
const asFraction = (x: number): string | null => {
  for (let q = 1; q <= 12; q++) {
    const p = Math.round(x * q);
    if (Math.abs(p / q - x) < 1e-9) {
      if (q === 1) return String(p).replace('-', '−');
      return `${p < 0 ? '−' : ''}${Math.abs(p)}/${q}`;
    }
  }
  return null;
};

const parseNum = (s: string) => {
  const t = s.trim().replace(/,/g, '.').replace(/−/g, '-');
  if (t.includes('/')) {
    const [p, q] = t.split('/');
    return Number(p) / Number(q);
  }
  return t === '' ? NaN : Number(t);
};

const BASE_PRESETS = ['2', '3', '5', '10', '0,5', '49', '1', '−2'];

export const LogarithmConceptTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: kitevőkereső
  const [aStr, setAStr] = useState<string>('2');
  const [bStr, setBStr] = useState<string>('128');
  const [guessStr, setGuessStr] = useState<string>('6');
  const a = parseNum(aStr);
  const b = parseNum(bStr);
  const aOk = Number.isFinite(a) && a > 0 && a !== 1;
  const bOk = Number.isFinite(b) && b > 0;
  const x = aOk && bOk ? Math.log(b) / Math.log(a) : NaN;
  const frac = Number.isFinite(x) ? asFraction(x) : null;
  const guess = parseNum(guessStr);
  const guessVal = aOk && Number.isFinite(guess) ? Math.pow(a, guess) : NaN;
  const reason = !Number.isFinite(a)
    ? 'Adj meg egy számot alapnak!'
    : a === 1
      ? 'Az 1-es alapú logaritmust nem értelmezzük: 1 minden hatványa 1.'
      : a <= 0
        ? 'A logaritmus alapja csak pozitív szám lehet (a 0 és a negatív számok tört kitevős hatványait nem értelmeztük).'
        : !bOk
          ? 'Az argumentum csak pozitív lehet: pozitív szám minden hatványa pozitív.'
          : '';

  // grafikon: y = aˣ, x ∈ [−4; 4], y-tengely: 0 … ymax
  const ymax = bOk ? Math.max(4, Math.min(b * 1.4, 1e6)) : 10;
  const toS = (xx: number, yy: number): [number, number] => [170 + xx * 36, 210 - (yy / ymax) * 185];
  let d = '';
  if (aOk) {
    let pen = false;
    for (let i = 0; i <= 200; i++) {
      const xx = -4 + (8 * i) / 200;
      const yy = Math.pow(a, xx);
      if (yy > ymax * 1.05) {
        pen = false;
        continue;
      }
      const [sx, sy] = toS(xx, yy);
      d += `${pen ? 'L' : 'M'} ${sx.toFixed(1)} ${sy.toFixed(1)} `;
      pen = true;
    }
  }
  const showPoint = Number.isFinite(x) && Math.abs(x) <= 4;

  // Labor II: logarléc
  const [m1, setM1] = useState<number>(2);
  const [m2, setM2] = useState<number>(3);
  const SC = 1.6; // px / mm a laborban (1 dekád = 250 mm = 400 px)
  const len1 = 250 * Math.log10(m1);
  const len2 = 250 * Math.log10(m2);
  const prod = m1 * m2;
  const overflow = prod > 10;
  const shown = overflow ? prod / 10 : prod;
  const ticks = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10];
  const X0 = 20;
  const tongueShift = overflow ? (len1 - 250) * SC : len1 * SC;

  return (
    <TheoryTemplate
      topicId="g11-hatvany-gyok-logaritmus"
      subtopicId="a-logaritmus-fogalma"
      title="10. A logaritmus fogalma"
      subtitle="Hatványérték, hatványalap vagy hatványkitevő? Ha a kitevőt keressük, logaritmust számolunk: logₐ b az a kitevő, amelyre a-t emelve b-t kapunk. Ráadás: a logarléc."
      badge="11. OSZTÁLY • III. HATVÁNY, GYÖK, LOGARITMUS • TANANYAG"
      themeColor="violet"
      pdfFilename="11_osztaly_a_logaritmus_fogalma_tananyag.pdf"
      practiceTitle="Készen állsz a logaritmusos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A LOGARITMUS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                a<sup>x</sup> = b ⇔ x = <L b="a">b</L> &nbsp;&nbsp;|&nbsp;&nbsp; a<sup>
                  <L b="a">b</L>
                </sup>{' '}
                = b
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Feltételek:</strong> a &gt; 0, a ≠ 1 (az alap) és b &gt; 0 (az argumentum, régiesen numerus).</li>
              <li>A logaritmus mindig <strong>hatványkitevőt</strong> jelöl; a hatvány alapja a logaritmus alapja.</li>
              <li>Pl. <L b="5">25</L> = 2, <L b="3">(1/9)</L> = −2, <L b="49">7</L> = 1/2, <L b="2">128</L> = 7.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. KF 1 */}
      <TheorySection title="1. Kidolgozott feladat: hatványérték, alap vagy kitevő?" badge="Tankönyv 102. o." badgeColor="violet">
        <LogConceptTripleSvg />
        <TheoryTable
          headers={['', 'x = 5⁶', 'y⁷ = 2187', '2ᶻ = 128']}
          rows={[
            ['Az ismeretlen az a valós szám, …', '… amely 5-nek a 6. hatványa', '… amelynek a 7. hatványa 2187', '… amelyre a 2-t emelve 128-at kapunk'],
            ['Az ismeretlen szerepe', 'hatványérték', 'hatványalap', 'hatványkitevő'],
            ['A művelet', 'hatványozás', 'gyökvonás', 'logaritmus'],
            ['Megoldás fejben', 'x = 15 625', 'y = 3', 'z = 7'],
            ['Szimbólumokkal', 'x = 15 625', 'y = ⁷√2187 = 3', 'z = log₂ 128 = 7']
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Olvasd így" badge="log₂ 128" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              <L b="2">128</L>: „kettes alapú logaritmus 128” – az a valós kitevő, amelyre a 2-t emelve 128-at kapunk. A logaritmus művelet segítségével a
              <strong> hatványkitevőket</strong> tudjuk kifejezni.
            </p>
          </TheoryCard>
          <TheoryCard title="További példák" badge="Kitevő keresése" badgeColor="indigo">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><L b="5">25</L> = 2, mert 5² = 25.</li>
              <li><L b="3">(1/9)</L> = −2, mert 3⁻² = 1/9.</li>
              <li><L b="49">7</L> = 1/2, mert {'49^{1/2}'} = √49 = 7.</li>
              <li><L b="2">∛(1/2)</L> = −1/3, mert {'2^{-1/3}'} = ∛(1/2).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. KF 2 */}
      <TheorySection title="2. Kidolgozott feladat: amikor fejben nem megy" badge="Tankönyv 103. o." badgeColor="indigo">
        <p className="text-sm text-slate-700 leading-relaxed">
          Az egyenletek típusa ugyanaz, de a számértékek miatt fejben nem tudunk számolni: a pontos megoldást a műveletek szimbólumaival adjuk meg, a közelítő értéket számológéppel.
        </p>
        <TheoryTable
          headers={['Egyenlet', '7x = 5^{2/3}', 'y⁷ = 923', '2ᶻ = 412']}
          rows={[
            ['Az ismeretlen szerepe', 'hatványérték (annak 7-szerese)', 'hatványalap', 'hatványkitevő'],
            ['A művelet', 'hatványozás', 'gyökvonás', 'logaritmus'],
            ['Pontos megoldás', 'x = (1/7) · ∛25', 'y = ⁷√923', 'z = log₂ 412'],
            ['Közelítő érték (2 tizedes)', 'x ≈ 0,42', 'y ≈ 2,65', 'z ≈ 8,69']
          ]}
        />
        <TheoryCallout type="info" title="Ellenőrzés becsléssel">
          2⁸ = 256 &lt; 412 &lt; 512 = 2⁹, ezért <L b="2">412</L> 8 és 9 közé esik – a számológép 8,69-et ad. Hasonlóan 2⁷ = 128 &lt; 923 &lt; 2187 = 3⁷, így ⁷√923 2 és 3 közé esik.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Elmélet */}
      <TheorySection title="3. A logaritmus definíciója" badge="Elmélet" badgeColor="teal">
        <LogConceptDefinitionSvg />
        <TheoryCallout type="success" title="Definíció">
          Legyenek a és b pozitív valós számok és a ≠ 1. Ekkor <L b="a">b</L> azt a kitevőt jelenti, amelyre az a számot emelve a b számot kapjuk. A <L b="a">b</L> kifejezésben
          (olvasd: „a alapú logaritmus b”) a az <strong>alap</strong>, b a <strong>logaritmus argumentuma</strong> (régies nevén numerusa).
        </TheoryCallout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Megjegyzések" badge="1–3." badgeColor="violet">
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
              <li>A logaritmus minden esetben hatványkitevőt jelöl; a hatvány alapja a logaritmus alapjával azonos.</li>
              <li>Az a<sup>x</sup> = b egyenlet megoldása: x = <L b="a">b</L>.</li>
              <li>
                A definíció képlettel: a<sup><L b="a">b</L></sup> = b.
              </li>
            </ol>
          </TheoryCard>
          <TheoryCard title="Miért kellenek a feltételek? (4.)" badge="a > 0, a ≠ 1, b > 0" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az 1 minden hatványa 1, ezért az 1-es alapú logaritmust nem értelmezzük.</li>
              <li>A 0 negatív és nulladik hatványát nem értelmeztük ⇒ 0 alapú logaritmus sincs.</li>
              <li>Negatív számok racionális (irracionális) hatványait sem értelmeztük ⇒ az alap nem lehet negatív.</li>
              <li>Pozitív szám minden hatványa pozitív ⇒ b &gt; 0.</li>
            </ul>
          </TheoryCard>
        </div>
        <LogConceptConditionsSvg />
        <LogConceptGraphSvg />
      </TheorySection>

      {/* 4. Feladatok */}
      <TheorySection title="4. Feladatok megoldása" badge="Tankönyv 104. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Logaritmusjelöléssel (1. feladat)" badge="Minta: 2ˣ = 0,25" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Minta: 2<sup>x</sup> = 0,25 ⇒ x = <L b="2">0,25</L> = −2.</li>
              <li>2<sup>x</sup> = 32 ⇒ x = <L b="2">32</L> = 5.</li>
              <li>2<sup>x</sup> = 1/16 ⇒ x = <L b="2">(1/16)</L> = −4.</li>
              <li>10<sup>x</sup> = 100 000 000 ⇒ x = <L b="10">10⁸</L> = 8.</li>
              <li>10<sup>x</sup> = ⁷√100 ⇒ x = <L b="10">⁷√100</L> = 2/7.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hiányzó számok (2. feladat)" badge="Minta: 6,25 = 2,5²" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>169 = 13² ⇒ <L b="13">169</L> = 2; 343 = 7³ ⇒ <L b="7">343</L> = 3.</li>
              <li>4 = {'16^{1/2}'} ⇒ <L b="16">4</L> = 1/2; 8 = 2³ ⇒ <L b="2">8</L> = 3.</li>
              <li>0,25 = 4⁻¹ ⇒ <L b="4">0,25</L> = −1; 625 = 5⁴ ⇒ <L b="5">625</L> = 4.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hármas alapú logaritmusok (3. feladat)" badge="log₃" badgeColor="indigo">
            <TheoryTable
              headers={['b', '1', '3', '9', '27', '81', '1/3', '1/9', '1/27', '1/81']}
              rows={[['log₃ b', '0', '1', '2', '3', '4', '−1', '−2', '−3', '−4']]}
            />
          </TheoryCard>
          <TheoryCard title="D) Hatványalakba írás (4–5. feladat)" badge="k = ?" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><L b="k">25</L> = 2 ⇔ k² = 25, k &gt; 0 ⇒ <strong>k = 5</strong>.</li>
              <li><L b="5">k</L> = 3 ⇔ 5³ = k ⇒ <strong>k = 125</strong>.</li>
              <li><L b="4">4</L> = k ⇔ 4<sup>k</sup> = 4 ⇒ <strong>k = 1</strong>.</li>
              <li>A definíció képlete szerint: 2<sup><L b="2">5</L></sup> = 5; 7<sup><L b="7">8</L></sup> = 8; 9<sup><L b="9">0,6</L></sup> = 0,6; 0,4<sup><L b="0,4">7</L></sup> = 7.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Számítsd ki! (6. feladat)" badge="Összeg, szorzat" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> <L b="2">2</L> + <L b="2">4</L> + <L b="4">2</L> + <L b="4">4</L> = 1 + 2 + 1/2 + 1 = <strong>4,5</strong>.</li>
              <li><strong>b)</strong> <L b="0,5">2</L> + <L b="0,5">4</L> + <L b="0,5">8</L> = −1 − 2 − 3 = <strong>−6</strong>.</li>
              <li><strong>c)</strong> <L b="3">3</L> · <L b="3">2</L> · <L b="3">1</L> = <strong>0</strong>, mert <L b="3">1</L> = 0.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Házi feladatok" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> <L b="2">a</L> nincs értelmezve a = −8, −2, 0 esetén; a = 1, 2, 8, 32, 64, 128, 256, 1024, 2048 esetén rendre 0, 1, 3, 5, 6, 7, 8, 10, 11.</li>
              <li><strong>HF 2.</strong> 3-as alapú logaritmusa 0-nak az 1, 1-nek a 3, 3-nak a 27, 9-nek a 3⁹ = 19 683.</li>
              <li><strong>HF 3.</strong> <L b="4">4</L> = 1, <L b="4">1</L> = 0, <L b="4">2</L> = 1/2, <L b="4">(1/4)</L> = −1; <L b="9">3</L> = 1/2, <L b="9">(1/3)</L> = −1/2, <L b="9">9</L> = 1, <L b="9">1</L> = 0, <L b="9">81</L> = 2; 5<sup><L b="5">3</L></sup> = 3, 6<sup><L b="6">(2/3)</L></sup> = 2/3, 0,5<sup><L b="0,5">8</L></sup> = 8.</li>
              <li><strong>HF 4.</strong> a) <L b="4">64</L> + <L b="5">125</L> = 3 + 3 = <strong>6</strong>; b) <L b="64">4</L> − <L b="25">5</L> = 1/3 − 1/2 = <strong>−1/6</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: negatív argumentum, negatív alap" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A logaritmus kitevő – de csak pozitív alapra és pozitív argumentumra"
          wrong="log₂ (−8) = −3, mert 2³ = 8; logₖ 25 = 2 ⇒ k = ±5"
          wrongExplanation="2⁻³ = 1/8, nem −8: a 2 egyetlen hatványa sem negatív, ezért log₂ (−8) nincs értelmezve. A logₖ 25 = 2 egyenletben k a logaritmus alapja, ami csak pozitív (és 1-től különböző) lehet, így a −5 nem megoldás."
          correct="log₂ 8 = 3, log₂ (1/8) = −3, log₂ (−8) nincs értelmezve; logₖ 25 = 2 ⇒ k = 5"
          correctExplanation="Negatív eredmény (kitevő) lehet, negatív argumentum vagy alap nem. Mindig ellenőrizd: a > 0, a ≠ 1, b > 0."
          tip="Írd át hatványalakba: logₐ b = x ⇔ aˣ = b. Ha az átírt egyenletnek nincs értelme, a logaritmusnak sincs."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Kitevőkereső" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-slate-600 mb-1">Alap (a) – gyorsgombok:</div>
                <div className="flex flex-wrap gap-2">
                  {BASE_PRESETS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setAStr(p)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${p === aStr ? 'bg-violet-600 text-white' : 'bg-violet-100 text-violet-800 hover:bg-violet-200'}`}
                    >
                      a = {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">alap a</label>
                  <input value={aStr} onChange={(e) => setAStr(e.target.value)} className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm" aria-label="alap" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">argumentum b</label>
                  <input value={bStr} onChange={(e) => setBStr(e.target.value)} className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm" aria-label="argumentum" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">tipped: x</label>
                  <input value={guessStr} onChange={(e) => setGuessStr(e.target.value)} className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm" aria-label="tipp" />
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1">
                {reason ? (
                  <div className="text-rose-700 font-bold">{reason}</div>
                ) : (
                  <>
                    <div>
                      Tipped ellenőrzése: {aStr}<sup>{guessStr}</sup> ≈ {fmt(guessVal)}{' '}
                      {Math.abs(guessVal - b) < 1e-9 * Math.max(1, b) ? (
                        <strong className="text-emerald-700">= b, eltaláltad!</strong>
                      ) : guessVal < b ? (
                        <span className={a > 1 ? 'text-amber-700' : 'text-sky-700'}>&lt; b ⇒ {a > 1 ? 'nagyobb' : 'kisebb'} kitevő kell</span>
                      ) : (
                        <span className={a > 1 ? 'text-sky-700' : 'text-amber-700'}>&gt; b ⇒ {a > 1 ? 'kisebb' : 'nagyobb'} kitevő kell</span>
                      )}
                    </div>
                    <div className="text-lg">
                      <L b={aStr}>{bStr}</L> = <strong className="text-violet-700">{frac ?? `≈ ${fmt(x)}`}</strong>
                    </div>
                    <div className="font-mono text-xs">
                      Hatványalakban: {aStr}<sup>{frac ?? fmt(x)}</sup> = {bStr} &nbsp;|&nbsp; {aStr}<sup>log<sub>{aStr}</sub> {bStr}</sup> = {bStr}
                    </div>
                  </>
                )}
              </div>
              <TheoryCallout type="tip" title="Próbáld ki!">
                a = 49, b = 7 ⇒ 1/2; a = 3, b = 1/9 ⇒ −2 (törtet is beírhatsz); a = 2, b = 412 ⇒ ≈ 8,69. Az a = 1, a = −2 vagy b = −8 esetén a labor megmondja, miért nincs értelmezve.
              </TheoryCallout>
            </div>
            <svg viewBox="0 0 340 230" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1="20" y1="210" x2="325" y2="210" stroke="#64748b" strokeWidth="1.5" />
              <line x1="170" y1="15" x2="170" y2="220" stroke="#64748b" strokeWidth="1.5" />
              {[-4, -3, -2, -1, 1, 2, 3, 4].map((t) => (
                <text key={t} x={toS(t, 0)[0]} y="222" fontSize="9" textAnchor="middle" fill="#64748b">
                  {String(t).replace('-', '−')}
                </text>
              ))}
              {aOk && <path d={d} fill="none" stroke="#7c3aed" strokeWidth="2.5" />}
              {bOk && (
                <g>
                  <line x1="20" y1={toS(0, b)[1]} x2="325" y2={toS(0, b)[1]} stroke="#f59e0b" strokeDasharray="5 4" strokeWidth="1.5" />
                  <text x="24" y={toS(0, b)[1] - 4} fontSize="10" fill="#b45309">
                    y = {bStr}
                  </text>
                </g>
              )}
              {showPoint && (
                <g>
                  <line x1={toS(x, b)[0]} y1={toS(x, b)[1]} x2={toS(x, b)[0]} y2="210" stroke="#be185d" strokeDasharray="3 3" />
                  <circle cx={toS(x, b)[0]} cy={toS(x, b)[1]} r="5" fill="#be185d" />
                  <text x={toS(x, b)[0]} y="205" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#be185d">
                    x = {frac ?? fmt(x, 2)}
                  </text>
                </g>
              )}
              {Number.isFinite(x) && !showPoint && (
                <text x="170" y="30" fontSize="10" textAnchor="middle" fill="#be185d">
                  A metszéspont kívül esik az ábrán (x ≈ {fmt(x, 2)}).
                </text>
              )}
              <text x="320" y="28" fontSize="10" textAnchor="end" fill="#7c3aed">
                {aOk ? `y = ${aStr}ˣ` : ''}
              </text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 7. Ráadás + Labor II */}
      <TheorySection title="7. Ráadás és Interaktív Laboratórium II: A logarléc" badge="Tankönyv 105. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-4">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Az 1620-as évek elején <strong>Edmund Gunter</strong> skálára vitte a logaritmustáblázat adatait; 1630-ban <strong>William Oughtred</strong> körlogarlécet készített,
              majd a kettőt egyesítve létrejött a mai értelemben vett logarléc. Mérnökök, bankárok, sőt az Apollo-program űrhajósai is használták; az 1980-as években a zsebszámológépek
              szorították ki.
            </p>
            <p>
              Működési elve: számok <strong>szorzatát a logaritmusok összegével</strong>, hányadosát a logaritmusok különbségével számoljuk. A léceken a távolságok a számok
              (tízes alapú) logaritmusával arányosak: lg 2 ≙ 75,26 mm, lg 3 ≙ 119,28 mm, és 75,26 + 119,28 = 194,54 mm ≙ lg 6.
            </p>
          </div>
          <LogConceptSlideRuleSvg />
        </div>
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">első tényező: {fmt(m1, 2)}</label>
              <input type="range" min="1" max="10" step="0.1" value={m1} onChange={(e) => setM1(Number(e.target.value))} className="w-full accent-amber-600" aria-label="első tényező" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">második tényező: {fmt(m2, 2)}</label>
              <input type="range" min="1" max="10" step="0.1" value={m2} onChange={(e) => setM2(Number(e.target.value))} className="w-full accent-purple-600" aria-label="második tényező" />
            </div>
          </div>
          <svg viewBox="0 0 440 150" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
            {/* nyelv */}
            <g transform={`translate(${tongueShift},0)`}>
              <rect x={X0} y="30" width={250 * SC} height="34" fill="#ede9fe" stroke="#7c3aed" />
              {ticks.map((t) => (
                <g key={t}>
                  <line x1={X0 + 250 * SC * Math.log10(t)} y1="52" x2={X0 + 250 * SC * Math.log10(t)} y2="64" stroke="#5b21b6" />
                  <text x={X0 + 250 * SC * Math.log10(t)} y="46" fontSize="9" textAnchor="middle" fill="#5b21b6">
                    {String(t).replace('.', ',')}
                  </text>
                </g>
              ))}
            </g>
            {/* alsó skála */}
            <rect x={X0} y="64" width={250 * SC} height="34" fill="#fef3c7" stroke="#b45309" />
            {ticks.map((t) => (
              <g key={t}>
                <line x1={X0 + 250 * SC * Math.log10(t)} y1="64" x2={X0 + 250 * SC * Math.log10(t)} y2="76" stroke="#78350f" />
                <text x={X0 + 250 * SC * Math.log10(t)} y="90" fontSize="9" textAnchor="middle" fill="#78350f">
                  {String(t).replace('.', ',')}
                </text>
              </g>
            ))}
            <line
              x1={X0 + 250 * SC * Math.log10(shown)}
              y1="22"
              x2={X0 + 250 * SC * Math.log10(shown)}
              y2="106"
              stroke="#db2777"
              strokeWidth="2"
            />
            <text x={X0 + 250 * SC * Math.log10(shown)} y="120" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#db2777">
              {fmt(shown, 3)}
            </text>
            <text x="220" y="142" fontSize="10" textAnchor="middle" fill="#475569">
              {overflow ? 'A nyelv 10-es jelét állítottuk az első tényező fölé (túlcsordulás).' : 'A nyelv 1-es jelét állítottuk az első tényező fölé.'}
            </text>
          </svg>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div className="font-mono">
              lg {fmt(m1, 2)} ≙ {fmt(len1, 2)} mm, lg {fmt(m2, 2)} ≙ {fmt(len2, 2)} mm ⇒ összeg: {fmt(len1 + len2, 2)} mm
            </div>
            <div>
              {overflow ? (
                <>
                  Az összeg több mint 250 mm (egy teljes skála), ezért a leolvasott érték {fmt(shown, 3)}, amit 10-zel szorzunk:{' '}
                </>
              ) : (
                <>A leolvasott érték: </>
              )}
              <strong className="text-purple-700">
                {fmt(m1, 2)} · {fmt(m2, 2)} = {fmt(prod, 3)}
              </strong>
            </div>
          </div>
          <TheoryCallout type="success" title="Ellenőrizd a tankönyvi példát!">
            2 · 3: a 3 fölé állítjuk a nyelv 1-es jelét, és a nyelv 2-es jele alatt leolvassuk a 6-ot (75,26 mm + 119,28 mm = 194,54 mm). A tízes alapú logaritmusról (lg) a következő leckében lesz szó.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LogarithmConceptTheory;
