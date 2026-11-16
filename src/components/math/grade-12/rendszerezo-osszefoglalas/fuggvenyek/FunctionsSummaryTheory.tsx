import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { PlotBox, Axes, curvePath, mapX, mapY, F_BLUE, F_RED, F_GREEN } from './plotKit';
import { MappingSvg, BasicFunctionsSvg, TransformationsSvg, LinearExampleSvg, ShiftExampleSvg, ReciprocalExampleSvg } from './FunctionsSummaryFigures';

const numIn = 'w-20 px-2 py-1 rounded-lg border border-slate-300 text-sm font-mono';

const fmt = (x: number, d = 3): string => {
  if (!Number.isFinite(x)) return '–';
  const r = Math.round(x * 10 ** d) / 10 ** d;
  let s = r.toFixed(d);
  if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
  return (s === '-0' ? '0' : s).replace('.', ',').replace('-', '−');
};
const signed = (v: number) => (v >= 0 ? `+ ${fmt(v)}` : `− ${fmt(-v)}`);

type BaseId = 'sq' | 'abs' | 'sqrt' | 'rec' | 'exp';
const BASES: { id: BaseId; name: string; f: (x: number) => number; inner: (s: string) => string; dom?: (x: number) => boolean }[] = [
  { id: 'sq', name: 'x²', f: (x) => x * x, inner: (s) => `(${s})²` },
  { id: 'abs', name: '|x|', f: (x) => Math.abs(x), inner: (s) => `|${s}|` },
  { id: 'sqrt', name: '√x', f: (x) => (x >= 0 ? Math.sqrt(x) : NaN), inner: (s) => `√(${s})`, dom: (x) => x >= 0 },
  { id: 'rec', name: '1/x', f: (x) => 1 / x, inner: (s) => `1/(${s})`, dom: (x) => x !== 0 },
  { id: 'exp', name: '2ˣ', f: (x) => 2 ** x, inner: (s) => `2^(${s})` }
];

export const FunctionsSummaryTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I – transzformációk
  const [base, setBase] = useState<BaseId>('sq');
  const [u, setU] = useState<number>(-3);
  const [v, setV] = useState<number>(-4);
  const [k, setK] = useState<number>(1);
  const [absOuter, setAbsOuter] = useState<boolean>(false);
  // Labor II – lineáris függvény két pontból
  const [P, setP] = useState<number[]>([-5, 6, 5, -2]);
  const [x0, setX0] = useState<number>(123);
  const [y0, setY0] = useState<number>(456);

  const B = BASES.find((b) => b.id === base) ?? BASES[0];
  const g = (x: number) => {
    const y = k * B.f(x - u) + v;
    return absOuter ? Math.abs(y) : y;
  };
  const inner = u === 0 ? 'x' : u > 0 ? `x − ${fmt(u)}` : `x + ${fmt(-u)}`;
  const core = B.id === 'exp' ? (u === 0 ? '2ˣ' : `2^(${inner})`) : B.id === 'rec' && u === 0 ? '1/x' : B.id === 'sq' && u === 0 ? 'x²' : B.id === 'abs' && u === 0 ? '|x|' : B.id === 'sqrt' && u === 0 ? '√x' : B.inner(inner);
  const kPart = k === 1 ? '' : k === -1 ? '−' : `${fmt(k)} · `;
  const vPart = v === 0 ? '' : ` ${signed(v)}`;
  const formula = absOuter ? `g(x) = |${kPart}${core}${vPart}|` : `g(x) = ${kPart}${core}${vPart}`;

  const tb: PlotBox = { x0: 25, y0: 15, w: 290, h: 220, xmin: -8, xmax: 8, ymin: -6, ymax: 8 };
  const segments = (fn: (x: number) => number, shift: number) => {
    if (B.id === 'rec') return [curvePath(tb, fn, tb.xmin, shift - 0.05), curvePath(tb, fn, shift + 0.05, tb.xmax)];
    if (B.id === 'sqrt') return [curvePath(tb, fn, shift, tb.xmax)];
    return [curvePath(tb, fn)];
  };

  const notes = useMemo(() => {
    const out: string[] = [];
    if (u !== 0) out.push(`eltolás az x tengely mentén ${u > 0 ? '+' : ''}${fmt(u)}-tal`);
    if (k !== 1) out.push(Math.abs(k) !== 1 ? `${fmt(Math.abs(k))}-szoros nyújtás/zsugorítás az y tengely irányában` : '');
    if (k < 0) out.push('tükrözés az x tengelyre');
    if (v !== 0) out.push(`eltolás az y tengely mentén ${v > 0 ? '+' : ''}${fmt(v)}-tal`);
    if (absOuter) out.push('az x tengely alatti rész tükrözése (abszolút érték)');
    if (u !== 0 || v !== 0) out.push(`összesen (k = 1 esetén): eltolás a v(${fmt(u)}; ${fmt(v)}) vektorral`);
    return out.filter(Boolean);
  }, [u, v, k, absOuter]);

  const special = B.id === 'sq' || B.id === 'abs' ? { x: u, y: absOuter ? Math.abs(v) : v, label: k > 0 ? 'minimumhely' : 'maximumhely' } : B.id === 'sqrt' ? { x: u, y: absOuter ? Math.abs(v) : v, label: 'kezdőpont' } : null;

  const lin = useMemo(() => {
    const [x1, y1, x2, y2] = P;
    if (x1 === x2) return null;
    const a = (y2 - y1) / (x2 - x1);
    const b = y1 - a * x1;
    return { a, b, zero: a !== 0 ? -b / a : NaN };
  }, [P]);
  const lb: PlotBox = useMemo(() => {
    const R = Math.max(8, Math.ceil(1.3 * Math.max(...P.map((t) => Math.abs(t)))));
    return { x0: 25, y0: 15, w: 230, h: 220, xmin: -R, xmax: R, ymin: -R, ymax: R };
  }, [P]);
  const lstep = lb.xmax > 20 ? 5 : lb.xmax > 10 ? 2 : 1;
  const setPi = (i: number, val: number) => setP((cur) => cur.map((x, j) => (j === i ? val : x)));

  return (
    <TheoryTemplate
      topicId="g12-rendszerezo-osszefoglalas"
      subtopicId="fuggvenyek"
      title="5. Függvények – összefoglalás"
      subtitle="Értelmezési tartomány, értékkészlet, zérushely, szélsőérték, monotonitás, kölcsönösen egyértelmű függvény és inverz, alapfüggvények, transzformációk."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_fuggvenyek_osszefoglalas_tananyag.pdf"
      practiceTitle="Készen állsz a függvényes érettségi feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — FÜGGVÉNYTRANSZFORMÁCIÓK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">g(x) = f(x − u) + v: eltolás a v(u; v) vektorral</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>f(x − 4): jobbra 4-gyel (a zárójelen belüli előjel „fordítva” hat); f(x) − 3: lefelé 3-mal.</li>
              <li>2 · f(x): nyújtás az y tengely irányában; −f(x): tükrözés az x tengelyre; |f(x)|: az x tengely alatti rész tükrözése.</li>
              <li>Függvény: az értelmezési tartomány minden eleméhez pontosan egy elemet rendel.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Fogalmak, tételek, módszerek" badge="Tankönyv 128–130. o." badgeColor="indigo">
        <TheoryTable
          headers={['', 'Fogalom', 'Lényeg']}
          rows={[
            ['D', 'Függvény', 'az A halmaz minden eleméhez a B halmaz pontosan egy elemét rendelő hozzárendelés; értelmezési tartomány A, képhalmaz B'],
            ['D', 'Értékkészlet', 'B azon elemei, amelyeket valamely értelmezési tartománybeli elemhez hozzárendelünk'],
            ['D', 'Hozzárendelési szabály, jelölések', 'f: ℕ → ℝ, x ↦ 3x; D_f = ℕ, R_f = {0; 3; 6; …}; g: ℝ → ℝ, g(x) = |x|, R_g = [0; ∞['],
            ['D', 'Helyettesítési érték', 'f(x₀): a képhalmaz x₀-hoz rendelt eleme; pl. f(5) = 15, g(−7,2) = 7,2'],
            ['D', 'Kölcsönösen egyértelmű függvény', 'különböző elemekhez különböző értékeket rendel (3x igen, |x| nem: |−3| = |3|)'],
            ['D', 'Megfordítás (inverz)', 'kölcsönösen egyértelmű f esetén f⁻¹ minden y-hoz azt az x-et rendeli, amelyre f(x) = y; pl. 3x ↔ x/3, vas ↔ Fe'],
            ['M', 'Grafikon', 'az (x₀; f(x₀)) pontok összessége a koordináta-rendszerben'],
            ['D', 'Zérushely, szélsőérték', 'zérushely: f(x₀) = 0; maximum / minimum: az értékkészlet legnagyobb / legkisebb eleme (ha létezik), és a hozzá tartozó hely'],
            ['D', 'Monotonitás', 'monoton nő: nagyobb x-hez legalább akkora érték; szigorúan nő: nagyobb érték; csökkenés hasonlóan']
          ]}
        />
        <MappingSvg />
      </TheorySection>

      <TheorySection title="2. Alapfüggvények és transzformációk" badge="Tankönyv 131–132. o." badgeColor="blue">
        <TheoryTable
          headers={['', 'Függvény', 'Tulajdonságok']}
          rows={[
            ['D', 'Lineáris: f(x) = ax + b', 'egyenes, meredeksége a, az y tengelyt (0; b)-ben metszi; a = 0 konstans, a ≠ 0 elsőfokú (szigorúan monoton), b = 0 egyenes arányosság'],
            ['D', 'Fordított arányosság: f(x) = a/x', 'D = ℝ ∖ {0}; 1/x: R = ℝ ∖ {0}, nincs zérushely, x < 0 és x > 0 esetén is szigorúan csökken, nincs szélsőérték'],
            ['D', 'Abszolútérték: f(x) = |x|', 'R = [0; ∞[; zérushely 0; ]−∞; 0]-n csökken, [0; ∞[-en nő; minimum 0 az x = 0 helyen'],
            ['D', 'Másodfokú: f(x) = ax² + bx + c', 'alapfüggvény x²: R = [0; ∞[, minimum 0 az x = 0-ban; pl. x² − 8x + 18 = (x − 4)² + 2'],
            ['D', 'Négyzetgyök: f(x) = √x', 'D = [0; ∞[, R = [0; ∞[, zérushely 0, szigorúan nő, minimum 0'],
            ['D', 'Exponenciális: f(x) = aˣ', 'a > 0, a ≠ 1; R = ]0; ∞[, nincs zérushely, nincs szélsőérték; a > 1 nő, 0 < a < 1 csökken'],
            ['M', 'Transzformáció', 'eltolás, nyújtás vagy zsugorítás, tükrözés; pl. (x − 4)², x² − 3, 2x², |x² − 3|']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <BasicFunctionsSvg />
          <TransformationsSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladat: lineáris függvény két pontból" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Az f lineáris függvény grafikonján az A(−5; 6) és a B(5; −2) rácspont van. Add meg f-et, számold ki f(123)-at, oldd meg f(x) = 456-ot és f(x) &lt; 0-t!</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>f(x) = ax + b: 6 = −5a + b és −2 = 5a + b ⇒ a = −0,8, b = 2: <strong>f(x) = −0,8x + 2</strong>.</li>
              <li>f(123) = −0,8 · 123 + 2 = <strong>−96,4</strong>.</li>
              <li>456 = −0,8x + 2 ⇒ <strong>x = −567,5</strong>.</li>
              <li>Zérushely: 0 = −0,8x + 2 ⇒ x = 2,5; f szigorúan csökken, ezért f(x) &lt; 0 ⇔ <strong>x &gt; 2,5</strong>.</li>
            </ol>
          </div>
          <LinearExampleSvg />
        </div>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladat: eltolás vektorral" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>f(x) = x²; g grafikonja f grafikonjának v(−3; −4) vektorral való eltoltja. Jellemezd mindkét függvényt, és add meg, hol metszi g a h(x) = −3 egyenest!</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>g(x) = (x + 3)² − 4</strong>.
              </li>
              <li>Zérushelyek: f-é 0; g-é −5 és −1 (g(−5) = g(−1) = 0).</li>
              <li>Minimum: f-nek x = 0-ban 0, g-nek x = −3-ban −4; maximumuk nincs.</li>
              <li>Értékkészlet: [0; ∞[, illetve [−4; ∞[.</li>
              <li>f: ]−∞; 0]-n szigorúan csökken, [0; ∞[-en nő; g: ]−∞; −3]-on csökken, [−3; ∞[-en nő.</li>
              <li>(x + 3)² − 4 = −3 ⇒ (x + 3)² = 1 ⇒ <strong>x = −4 vagy x = −2</strong>.</li>
            </ul>
          </div>
          <ShiftExampleSvg />
        </div>
      </TheorySection>

      <TheorySection title="5. Kidolgozott feladat: 1/x + 2, abszolút érték, leszűkítés" badge="Mintapélda" badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <ReciprocalExampleSvg />
          <ul className="list-disc pl-5 space-y-1">
            <li>f(x) = 1/x + 2: az 1/x grafikonjának eltolása a v(0; 2) vektorral; értékkészlete ℝ ∖ {'{2}'}, szélsőértéke nincs.</li>
            <li>g = |f|: az x tengely alá eső részt tükrözzük; értékkészlet [0; ∞[, maximum nincs, minimum 0 ott, ahol 1/x + 2 = 0 ⇒ x = −1/2.</li>
            <li>h = f az [1; 4] intervallumon: h(1) = 3, h(4) = 2,25, és h csökken, így értékkészlete [2,25; 3].</li>
          </ul>
        </div>
      </TheorySection>

      <TheorySection title="6. Megoldott feladatok a blokkból" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Alapfeladatok" badge="A2.–A11." badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>2x² − x − 1 zérushelyei: 1 és −1/2; 0,5x − 8 zérushelye 16; −7x + 16 = 13 ⇒ x = 3/7.</li>
              <li>A(−3; 2), B(5; 4) ⇒ f(x) = 0,25x + 2,75; 9x + 5 értéke x = −1/2-nél 0,5.</li>
              <li>−(7/3)x + 22 szigorúan monoton csökkenő (a &lt; 0).</li>
              <li>{'{1; 2; 3}'} → {'{5; 6; 7}'}: 3³ = 27 függvény, ebből 3! = 6 kölcsönösen egyértelmű.</li>
              <li>f(x) = 5x − 2, g(x) = (x + 4)², h(x) = −|x|, i(x) = √x + 6.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Ferde hajítás (P1.)" badge="Másodfokú modell" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>f(x) = −(x − 2)² + 9: f(0) = −4 + 9 = 5 m a kilövési magasság.</li>
              <li>Legmagasabb pont: 2 s-nál 9 m.</li>
              <li>8 m: (x − 2)² = 1 ⇒ 1 s és 3 s múlva.</li>
              <li>Talajra ér: (x − 2)² = 9 ⇒ x = 5 s (a −1 nem jó).</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="C) Csomagküldés és grafikus megoldás" badge="P2., P3." badgeColor="emerald">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>3 − 2x = x² ⇒ x² + 2x − 3 = 0 ⇒ x = −3 vagy 1; f(x) &gt; g(x), ha −3 &lt; x &lt; 1.</li>
              <li>f(x) = 12x + 640 (x dkg): fix díj 640 Ft, 12 Ft/dkg; 450 g = 45 dkg ⇒ 1180 Ft; 1600 Ft ⇒ 80 dkg = 0,8 kg.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Exponenciális modell" badge="P5., Ráadás" badgeColor="rose">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Sörhab: f(t) = 14 · 0,991ᵗ mm; kezdetben 14 mm, 1 perc után ≈ 8,1 mm.</li>
              <li>3 mm: 0,991ᵗ = 3/14 ⇒ t = lg(3/14) / lg 0,991 ≈ 170,4 s.</li>
              <li>Ellátás: D(h) = √(12 740h + h²); a 455 m-es kilátóból ≈ 76 km; 300 km-hez h ≈ 7,06 km.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Tipikus hiba: merre tol a zárójelen belüli szám?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="f(x − 4) jobbra tol, nem balra"
          wrong="g(x) = (x − 4)² grafikonja az x² grafikonjának 4 egységgel balra tolt képe."
          wrongExplanation="A g az x = 4 helyen veszi fel azt az értéket (0-t), amit f a 0-ban: a csúcs a 4-be kerül."
          correct="(x − 4)²: eltolás jobbra 4-gyel, v(4; 0); (x + 3)² − 4: eltolás a v(−3; −4) vektorral."
          correctExplanation="A függvényen kívüli tag (+v) viszont „egyenesen” hat: x² − 3 lefelé tol 3-mal."
          tip="Ellenőrizd egy nevezetes ponttal (csúcs, zérushely) behelyettesítéssel!"
        />
        <TheoryCallout type="info" title="Értékkészlet vs. képhalmaz">
          A képhalmaz az, „ahová” a függvény képez (pl. ℝ), az értékkészlet csak a ténylegesen felvett értékek halmaza (pl. x² esetén [0; ∞[).
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium I: függvénytranszformátor" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-1.5">
                {BASES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBase(b.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${base === b.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-100'}`}
                  >
                    f(x) = {b.name}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Vízszintes eltolás: u = {fmt(u)}</label>
                <input type="range" min="-5" max="5" step="0.5" value={u} onChange={(e) => setU(Number(e.target.value))} className="w-full accent-blue-600" aria-label="u" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Függőleges eltolás: v = {fmt(v)}</label>
                <input type="range" min="-5" max="5" step="0.5" value={v} onChange={(e) => setV(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="v" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Szorzó (nyújtás, tükrözés): k = {fmt(k)}</label>
                <input type="range" min="-3" max="3" step="0.5" value={k} onChange={(e) => setK(Number(e.target.value) || 0.5)} className="w-full accent-rose-600" aria-label="k" />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <input type="checkbox" checked={absOuter} onChange={(e) => setAbsOuter(e.target.checked)} /> abszolút érték a teljes kifejezésre
              </label>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-blue-900 space-y-1">
                <div className="font-mono font-bold">{formula}</div>
                <ul className="list-disc pl-4 text-xs space-y-0.5">
                  {notes.length ? notes.map((n) => <li key={n}>{n}</li>) : <li>nincs transzformáció – ez az alapfüggvény</li>}
                </ul>
                {special && (
                  <div className="text-xs">
                    Nevezetes pont: ({fmt(special.x)}; {fmt(special.y)}) – {special.label}
                  </div>
                )}
              </div>
            </div>
            <svg viewBox="0 0 330 250" className="w-full max-w-md h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
              <rect x="1" y="1" width="328" height="248" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
              <Axes b={tb} stepX={2} stepY={2} />
              {segments(B.f, 0).map((d, i) => (
                <path key={`f${i}`} d={d} fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="5 3" />
              ))}
              {segments(g, u).map((d, i) => (
                <path key={`g${i}`} d={d} fill="none" stroke={F_BLUE} strokeWidth="2.4" />
              ))}
              {special && special.x >= tb.xmin && special.x <= tb.xmax && special.y >= tb.ymin && special.y <= tb.ymax && (
                <circle cx={mapX(tb, special.x)} cy={mapY(tb, special.y)} r="4.5" fill={F_RED} />
              )}
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Interaktív Laboratórium II: lineáris függvény két pontból" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3 text-sm">
              {[0, 1].map((r) => (
                <div key={r} className="flex flex-wrap items-center gap-2">
                  <span className="font-bold">{r === 0 ? 'A(' : 'B('}</span>
                  <input type="number" value={P[2 * r]} onChange={(e) => setPi(2 * r, Number(e.target.value))} className={numIn} aria-label={`x${r + 1}`} />
                  <span>;</span>
                  <input type="number" value={P[2 * r + 1]} onChange={(e) => setPi(2 * r + 1, Number(e.target.value))} className={numIn} aria-label={`y${r + 1}`} />
                  <span className="font-bold">)</span>
                </div>
              ))}
              <div className="flex flex-wrap gap-2">
                {[
                  { t: 'Kidolgozott 1.', v: [-5, 6, 5, -2] },
                  { t: 'A3. feladat', v: [-3, 2, 5, 4] },
                  { t: 'konstans', v: [-4, 3, 4, 3] }
                ].map((p) => (
                  <button key={p.t} onClick={() => setP(p.v)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-purple-100">
                    {p.t}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span>f(</span>
                <input type="number" value={x0} onChange={(e) => setX0(Number(e.target.value))} className={numIn} aria-label="x0" />
                <span>) = ?</span>
                <span className="ml-3">f(x) =</span>
                <input type="number" value={y0} onChange={(e) => setY0(Number(e.target.value))} className={numIn} aria-label="y0" />
                <span>⇒ x = ?</span>
              </div>
              {lin ? (
                <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900 space-y-1">
                  <div>
                    a = ({fmt(P[3])} − {fmt(P[1])}) / ({fmt(P[2])} − {fmt(P[0])}) = <strong>{fmt(lin.a, 4)}</strong>, b = <strong>{fmt(lin.b, 4)}</strong>
                  </div>
                  <div className="font-mono font-bold">
                    f(x) = {fmt(lin.a, 4)}x {signed(Math.round(lin.b * 1e4) / 1e4)}
                  </div>
                  <div className="text-xs">
                    f({fmt(x0)}) = {fmt(lin.a * x0 + lin.b, 4)};{' '}
                    {lin.a !== 0 ? `f(x) = ${fmt(y0)} ⇒ x = ${fmt((y0 - lin.b) / lin.a, 4)}` : lin.b === y0 ? 'minden x megoldás' : 'nincs ilyen x (konstans függvény)'}
                  </div>
                  <div className="text-xs">
                    {lin.a > 0 ? `szigorúan monoton nő; zérushely: ${fmt(lin.zero, 4)}` : lin.a < 0 ? `szigorúan monoton csökken; zérushely: ${fmt(lin.zero, 4)}` : lin.b === 0 ? 'konstans 0: minden szám zérushely' : 'konstans függvény, nincs zérushely'}
                  </div>
                </div>
              ) : (
                <div className="text-rose-700 font-bold">A két pont első koordinátája nem lehet egyenlő (az nem függvény grafikonja)!</div>
              )}
            </div>
            <svg viewBox="0 0 270 250" className="w-full max-w-sm h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
              <rect x="1" y="1" width="268" height="248" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
              <Axes b={lb} stepX={lstep} stepY={lstep} />
              {lin && <path d={curvePath(lb, (x) => lin.a * x + lin.b)} fill="none" stroke={F_BLUE} strokeWidth="2.2" />}
              <circle cx={mapX(lb, P[0])} cy={mapY(lb, P[1])} r="5" fill={F_RED} />
              <circle cx={mapX(lb, P[2])} cy={mapY(lb, P[3])} r="5" fill={F_RED} />
              {lin && Number.isFinite(lin.zero) && Math.abs(lin.zero) <= lb.xmax && <circle cx={mapX(lb, lin.zero)} cy={mapY(lb, 0)} r="4" fill={F_GREEN} />}
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FunctionsSummaryTheory;
