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
  ChapterMapSvg,
  SaplingRowsSvg,
  DominoPrimeSvg,
  NineMultiplesSvg,
  SetsVennSvg
} from './NumberTheoryPracticeFigures';

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = (e: number) => (e === 1 ? '' : String(e).split('').map((c) => SUP[Number(c)]).join(''));
const fmtInt = (x: number) => x.toLocaleString('hu-HU');
const WITH_SUFFIX: Record<number, string> = { 2: '-vel', 3: '-mal', 4: '-gyel', 5: '-tel', 6: '-tal', 7: '-tel', 8: '-cal', 9: '-cel', 10: '-zel', 11: '-gyel', 12: '-vel' };

/** Prímtényezős felbontás: [[prím, kitevő], …] */
const factorize = (n: number): [number, number][] => {
  const res: [number, number][] = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) {
      m /= p;
      e++;
    }
    if (e) res.push([p, e]);
  }
  if (m > 1) res.push([m, 1]);
  return res;
};
const showFactors = (f: [number, number][]) => (f.length === 0 ? '1' : f.map(([p, e]) => `${p}${sup(e)}`).join(' · '));
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const clampInt = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.floor(Number.isFinite(x) ? x : lo)));

export const NumberTheoryPracticeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: prímtényezős műhely
  const [aRaw, setARaw] = useState<number>(360);
  const [bRaw, setBRaw] = useState<number>(84);

  // Labor II: maradékok
  const [xRaw, setXRaw] = useState<number>(86420);
  const [yRaw, setYRaw] = useState<number>(13579);
  const [mod, setMod] = useState<number>(4);

  const a = clampInt(aRaw, 1, 100000);
  const b = clampInt(bRaw, 1, 100000);
  const fa = useMemo(() => factorize(a), [a]);
  const fb = useMemo(() => factorize(b), [b]);
  const g = gcd(a, b);
  const l = (a / g) * b;
  const primes = Array.from(new Set([...fa.map((x) => x[0]), ...fb.map((x) => x[0])])).sort((u, v) => u - v);
  const expOf = (f: [number, number][], p: number) => f.find((x) => x[0] === p)?.[1] ?? 0;
  const divCount = (f: [number, number][]) => f.reduce((acc, [, e]) => acc * (e + 1), 1);
  const productSquare = primes.every((p) => (expOf(fa, p) + expOf(fb, p)) % 2 === 0);

  const x = clampInt(xRaw, 0, 999999);
  const y = clampInt(yRaw, 0, 999999);
  const rx = x % mod;
  const ry = y % mod;
  const exprs = [
    { name: 'x + y', byRem: `${rx} + ${ry} = ${rx + ry}`, rem: (rx + ry) % mod, real: (x + y) % mod },
    { name: 'x + 4y', byRem: `${rx} + 4 · ${ry} = ${rx + 4 * ry}`, rem: (rx + 4 * ry) % mod, real: (x + 4 * y) % mod },
    { name: 'x · y', byRem: `${rx} · ${ry} = ${rx * ry}`, rem: (rx * ry) % mod, real: Number((BigInt(x) * BigInt(y)) % BigInt(mod)) },
    { name: 'y² · x', byRem: `${ry}² · ${rx} = ${ry * ry * rx}`, rem: (ry * ry * rx) % mod, real: Number((BigInt(y) * BigInt(y) * BigInt(x)) % BigInt(mod)) }
  ];

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="gyakorlas-szamelmelet-1"
      title="9. Gyakorlás"
      subtitle="A számelmélet fejezet összefoglalása: számhalmazok, osztók és prímek, lnko és lkkt, oszthatósági szabályok és maradékok, logika, számrendszerek – érettségi típusú feladatokkal."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_szamelmelet_gyakorlas_tananyag.pdf"
      practiceTitle="Készen állsz a vegyes számelméleti feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A PRÍMTÉNYEZŐS ALAK MINDENT ELÁRUL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              (a; b): közös prímek a kisebbik kitevőn · [a; b]: minden prím a nagyobbik kitevőn · (a; b) · [a; b] = a · b
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az osztók száma: n = p₁ᵅ · p₂ᵝ · … esetén (α + 1)(β + 1)…, pl. 72 = 2³ · 3² ⇒ 4 · 3 = 12 osztó.</li>
              <li>Összetett szabály: ha egy szám osztható a-val és b-vel, és a, b <strong>relatív prímek</strong>, akkor osztható a · b-vel is (12: 3 és 4; 72: 8 és 9).</li>
              <li>Összeg, különbség, szorzat maradéka kiszámolható a tagok, tényezők maradékából.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglalás */}
      <TheorySection title="1. A fejezet eddigi anyaga dióhéjban" badge="Összefoglalás" badgeColor="emerald">
        <ChapterMapSvg />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <TheoryCard title="Számhalmazok (1. lecke)" badge="ℕ ⊂ ℤ ⊂ ℚ" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>ℕ zárt az összeadásra és szorzásra; a kivonás kivezet belőle (ℤ), az osztás ℤ-ből (ℚ).</li>
              <li>ℚ zárt mind a négy alapműveletre (0-val nem osztunk).</li>
              <li>Egy tovább nem egyszerűsíthető tört akkor véges tizedes tört, ha a nevező prímtényezői csak 2 és 5: 7/25 = 0,28; különben végtelen szakaszos: 5/6 = 0,8333… = 0,8(3).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Osztó, prím, lnko, lkkt (2–3. lecke)" badge="Prímtényezők" badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Prímszám: pontosan két pozitív osztója van (az 1 nem prím, a 2 az egyetlen páros prím).</li>
              <li>A számelmélet alaptétele: a prímtényezős felbontás egyértelmű.</li>
              <li>(24; 36) = 12, [24; 36] = 72, és 12 · 72 = 24 · 36. Relatív prímek: (a; b) = 1.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Szabályok és maradékok (4–6. lecke)" badge="Oszthatóság" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>2, 5, 10: utolsó jegy; 4, 25: utolsó két jegy; 8: utolsó három jegy; 3, 9: jegyösszeg.</li>
              <li>6 = 2 · 3, 12 = 3 · 4, 15 = 3 · 5, 45 = 5 · 9, 72 = 8 · 9 – mindig relatív prím tényezőkkel!</li>
              <li>A „ha…, akkor” állítás hamis, ha van <strong>ellenpélda</strong>: 4 | 12 és 6 | 12, de 24 ∤ 12.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Számrendszerek (7–8. lecke)', 'Módszer', 'Példa']}
          rows={[
            ['b alapúból tízesbe', 'helyiérték-táblázat: jegy · bᵏ összege', '20123₄ = 512 + 16 + 8 + 3 = 539'],
            ['tízesből b alapúba', 'ismételt maradékos osztás b-vel, maradékok alulról', '315 = 1243₆'],
            ['kettesből 4-esbe, 8-asba, 16-osba', '2, 3, illetve 4 bites csoportok jobbról', '1110111100010101₂ = 167425₈ = EF15₁₆'],
            ['ismeretlen alap', 'egyenlet a helyi értékekből', '6 · 9 = 42 ⇒ 4b + 2 = 54 ⇒ b = 13']
          ]}
        />
      </TheorySection>

      {/* 2. Kidolgozott feladatok I */}
      <TheorySection title="2. Kidolgozott feladatok: lnko, lkkt, prímtényezős alak" badge="Tankönyv 150. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) A b szám kitevői (2. feladat)" badge="Feladat" badgeColor="teal">
            <p className="text-sm text-slate-700 mb-2">
              a = 2⁴ · 3⁵ · 5² · 7 · 11², b = 2ᵏ · 3ˡ · 5ᵐ · 7ⁿ · 11ᵖ. Milyen kitevők adódnak, ha
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> (a; b) = 2⁴ · 3² · 7 · 11: k ≥ 4, l = 2, m = 0, n ≥ 1, p = 1.</li>
              <li><strong>b)</strong> [a; b] = 2⁶ · 3⁵ · 5³ · 7³ · 11⁶: k = 6, 0 ≤ l ≤ 5, m = 3, n = 3, p = 6.</li>
              <li><strong>c)</strong> a · b = 2¹⁰ · 3⁶ · 5³ · 7² · 11⁵: b = 2⁶ · 3 · 5 · 7 · 11³ (k = 6, l = m = n = 1, p = 3).</li>
              <li><strong>d)</strong> a · b négyzetszám: k, m, p páros, l, n páratlan (a legkisebb ilyen b = 3 · 7 = 21).</li>
              <li><strong>e)</strong> 720 = 2⁴ · 3² · 5 | b: k ≥ 4, l ≥ 2, m ≥ 1.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Facsemeték (3. feladat)" badge="Lkkt" badgeColor="emerald">
            <SaplingRowsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> A csemeték számánál 5-tel kisebb szám osztható 8-cal, 9-cel, 10-zel és 12-vel, így [8; 9; 10; 12] = 2³ · 3² · 5 = 360 többszöröse. 500 alatt: 360 + 5 = <strong>365</strong> csemete.</li>
              <li><strong>b)</strong> 365 = 5 · 73: soronként 5 és 9 közötti egyenlő számú fa csak 5 lehet ⇒ <strong>73 sor, soronként 5 fa</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Dominók (4. feladat, érettségi 2018)" badge="Prímek" badgeColor="sky">
            <DominoPrimeSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700">
              Egy szorzat csak akkor prím, ha az egyik tényező 1, a másik prím. A 0–6 pöttyök között a prímek 2, 3, 5, így az 1-2, 1-3, 1-5 dominók jók: <strong>3</strong> ilyen dominó van.
            </p>
          </TheoryCard>
          <TheoryCard title="D) A hajóskapitány (HF 2.)" badge="Prímtényezők" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 25 756 = 2² · 47 · 137. A hajó 137 m, a kapitány <strong>47 éves</strong>, 4 gyermeke van (egy 137 éves kapitány nem reális).</li>
              <li><strong>b)</strong> 6401 = 37 · 173: a hajó 173 m, a kapitány <strong>37 éves</strong>, 1 gyermeke van.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladatok II */}
      <TheorySection title="3. Kidolgozott feladatok: oszthatóság, maradékok, logika" badge="Tankönyv 150–151. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="E) Maradékok számolás nélkül (5. feladat)" badge="Maradékok" badgeColor="purple">
            <p className="text-sm text-slate-700 mb-2">p = 86 420, q = 13 579, r = 123 456. Maradékaik 2-vel, 3-mal, 4-gyel, 5-tel osztva:</p>
            <TheoryTable
              headers={['', ': 2', ': 3', ': 4', ': 5']}
              rows={[
                ['p', '0', '2', '0', '0'],
                ['q', '1', '1', '3', '4'],
                ['r', '0', '0', '0', '1'],
                ['p + q', '1', '0', '3', '4'],
                ['p + q + r', '1', '0', '3', '0'],
                ['p + 4q', '0', '0', '0', '1'],
                ['p · q', '0', '2', '0', '0'],
                ['q² · r', '0', '0', '0', '1']
              ]}
            />
            <p className="text-xs text-slate-500 mt-2">Pl. hármas maradék: p jegyösszege 20 → 2, q jegyösszege 25 → 1, így p · q maradéka 2 · 1 = 2.</p>
          </TheoryCard>
          <TheoryCard title="F) Igaz-e? (6. feladat)" badge="Oszthatóság" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 9 | 10²⁰²¹ − 1: igaz, mert a különbség 2021 darab 9-es jegyből áll.</li>
              <li><strong>b)</strong> 12 | 10²⁰²² + 632: igaz – utolsó két jegye 32 (4 | 32), jegyösszege 1 + 6 + 3 + 2 = 12 (3 | 12), és (3; 4) = 1.</li>
              <li><strong>c)</strong> 75 | 10²⁰²² − 55: hamis – a szám …945-re végződik, ezért 25-tel nem osztható.</li>
              <li><strong>d)</strong> 72 | 10¹⁰²⁴ + 101 024: igaz – utolsó három jegye 024 (8 | 24), jegyösszege 1 + 1 + 1 + 2 + 4 = 9, és (8; 9) = 1.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="G) Gondolatolvasó ábra (7. feladat)" badge="9 többszörösei" badgeColor="emerald">
            <NineMultiplesSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700">
              Ha a kétjegyű szám 10a + b, akkor 10a + b − (a + b) = <strong>9a</strong>, ami mindig 9, 18, …, 81 valamelyike. A táblázatban mind a 9 többszöröse mellett <strong>ugyanaz a szimbólum</strong> áll, ezért „lát a jövőbe” a feladat írója.
            </p>
          </TheoryCard>
          <TheoryCard title="H) Halmazok és állítások (HF 1., 4., 5.)" badge="Érettségi" badgeColor="sky">
            <SetsVennSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>52: A és C eleme, B-nek nem; 78: A és B eleme; 124: csak C eleme; 216: B és C eleme; 114: csak B eleme.</li>
              <li>Hamis: „6 | n és 10 | n ⇒ 60 | n” (ellenpélda 30); „(a; b) mindig kisebb mindkét számnál” ((3; 6) = 3); „(a; b) nem lehet 1”.</li>
              <li>Igaz: a 20-nál kisebb prímek összege 77, páratlan; (a; b) osztója a + b-nek; 29 | b ⇒ 29 | 17b; 72 | b ⇒ 9 | b vagy 16 | b (mert 9 | b).</li>
              <li>Hamis következtetések: 6 | b és 9 | b ⇒ 54 | b (18); 3 | b és 7 | b ⇒ 10 | b (21).</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Galaxis útikalauz stopposoknak (HF 3.)">
          „Hatszor kilenc: negyvenkettő.” Ha a 42 egy b alapú számrendszerben értendő, akkor 4b + 2 = 54, azaz <strong>b = 13</strong>: 6 · 9 = 42₁₃.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: nem relatív prím tényezők" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Osztható 4-gyel és 6-tal ⇒ osztható 24-gyel?"
          wrong="4 | n és 6 | n, tehát 4 · 6 = 24 | n"
          wrongExplanation="A szorzásos összevonás csak relatív prím osztóknál működik. A 4 és a 6 közös osztója 2, ezért a 12 ellenpélda: 4 | 12 és 6 | 12, de 24 ∤ 12."
          correct="4 | n és 6 | n ⇒ [4; 6] = 12 | n"
          correctExplanation="Két szám közös többszörösei éppen a legkisebb közös többszörös többszörösei. Ugyanígy: 6 | b és 9 | b ⇒ 18 | b (nem 54); 6 | n és 10 | n ⇒ 30 | n (nem 60)."
          tip="Összetett oszthatósági szabálynál mindig relatív prím tényezőkre bonts: 12 = 3 · 4, 72 = 8 · 9, 45 = 5 · 9."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Prímtényezős műhely" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a (1–100 000)</label>
              <input type="number" min={1} max={100000} value={aRaw} onChange={(e) => setARaw(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-emerald-300 font-mono" aria-label="a szám" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">b (1–100 000)</label>
              <input type="number" min={1} max={100000} value={bRaw} onChange={(e) => setBRaw(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-emerald-300 font-mono" aria-label="b szám" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              [24, 36],
              [365, 360],
              [1260, 72],
              [25756, 6401],
              [48, 75]
            ].map(([u, v]) => (
              <button
                key={`${u}-${v}`}
                onClick={() => {
                  setARaw(u);
                  setBRaw(v);
                }}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              >
                {u} és {v}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-emerald-50 text-emerald-900">
                <tr>
                  <th className="p-2 text-left">Szám</th>
                  <th className="p-2 text-left">Prímtényezős alak</th>
                  {primes.map((p) => (
                    <th key={p} className="p-2 text-right font-mono">{p}</th>
                  ))}
                  <th className="p-2 text-right">Osztók száma</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { n: a, f: fa },
                  { n: b, f: fb },
                  { n: g, f: factorize(g), label: '(a; b)' },
                  { n: l, f: factorize(l), label: '[a; b]' }
                ].map((row, i) => (
                  <tr key={i} className={`border-t border-slate-200 ${i >= 2 ? 'bg-emerald-50/50' : ''}`}>
                    <td className="p-2 font-mono font-bold">{row.label ? `${row.label} = ${fmtInt(row.n)}` : fmtInt(row.n)}</td>
                    <td className="p-2 font-mono">{showFactors(row.f)}</td>
                    {primes.map((p) => (
                      <td key={p} className="p-2 text-right font-mono">{expOf(row.f, p)}</td>
                    ))}
                    <td className="p-2 text-right font-bold">{divCount(row.f)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-900">
              Ellenőrzés: (a; b) · [a; b] = {fmtInt(g)} · {fmtInt(l)} = {fmtInt(g * l)} = a · b ✓
            </div>
            <div className={`rounded-xl border p-3 ${g === 1 ? 'border-sky-200 bg-sky-50 text-sky-900' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
              {g === 1 ? 'a és b relatív prímek.' : `a és b nem relatív prímek (közös osztó: ${g}).`}{' '}
              a · b {productSquare ? 'négyzetszám (minden kitevő páros).' : 'nem négyzetszám (van páratlan kitevő).'}
            </div>
          </div>
          <p className="text-xs text-slate-500">A kitevők oszlopaiból olvasd le: az lnko-ban a kisebbik, az lkkt-ben a nagyobbik kitevő szerepel.</p>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Maradékok számolás nélkül" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">x</label>
              <input type="number" min={0} max={999999} value={xRaw} onChange={(e) => setXRaw(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-purple-300 font-mono" aria-label="x szám" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">y</label>
              <input type="number" min={0} max={999999} value={yRaw} onChange={(e) => setYRaw(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-purple-300 font-mono" aria-label="y szám" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">osztó: {mod}</label>
              <input type="range" min="2" max="12" value={mod} onChange={(e) => setMod(Number(e.target.value))} className="w-full accent-purple-600" aria-label="osztó" />
            </div>
          </div>
          <div className="text-sm text-slate-700">
            x maradéka: <strong>{rx}</strong>, y maradéka: <strong>{ry}</strong> ({mod}{WITH_SUFFIX[mod]} osztva)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-purple-50 text-purple-900">
                <tr>
                  <th className="p-2 text-left">Kifejezés</th>
                  <th className="p-2 text-left">Maradékokkal számolva</th>
                  <th className="p-2 text-right">Maradék</th>
                  <th className="p-2 text-right">Valódi maradék</th>
                </tr>
              </thead>
              <tbody>
                {exprs.map((e) => (
                  <tr key={e.name} className="border-t border-slate-200">
                    <td className="p-2 font-mono font-bold">{e.name}</td>
                    <td className="p-2 font-mono">{e.byRem} → {e.rem}</td>
                    <td className="p-2 text-right font-black text-purple-800">{e.rem}</td>
                    <td className="p-2 text-right font-mono">{e.real} {e.real === e.rem ? '✓' : '✗'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => {
              setXRaw(86420);
              setYRaw(13579);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
          >
            Tankönyvi számok: p = 86 420, q = 13 579
          </button>
          <TheoryCallout type="tip" title="Miért működik?">
            Ha x = k · m + r₁ és y = j · m + r₂, akkor x + y és x · y maradéka ugyanaz, mint r₁ + r₂, illetve r₁ · r₂ maradéka – a többi tag osztható m-mel. Így óriási szorzatok maradéka is fejben kiszámolható.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NumberTheoryPracticeTheory;
