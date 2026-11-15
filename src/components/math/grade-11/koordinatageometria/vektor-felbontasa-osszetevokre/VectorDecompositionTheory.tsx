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
  CatamaranLakeSvg,
  CatamaranComponentsSvg,
  DecompositionStepsSvg,
  HangingWeightSvg,
  InclineForcesSvg,
  GridDecompositionSvg,
  VDGrid,
  VDArrow,
  VDLabel,
  VDRightAngle,
  VDPoint
} from './VectorDecompositionFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d);
  const clean = Number(s) === 0 ? (0).toFixed(d) : s;
  return clean.replace('.', ',').replace('-', '−');
};
const fmtN = (x: number) => {
  const r = Math.round(x * 100) / 100;
  return String(r).replace('.', ',').replace('-', '−');
};

type Basis = { name: string; a: VDPoint; b: VDPoint };

const BASES: Basis[] = [
  { name: 'a(2; 1), b(1; 3)', a: [2, 1], b: [1, 3] },
  { name: 'a(2; 0), b(1; 2)', a: [2, 0], b: [1, 2] },
  { name: 'a(3; 1), b(−1; 2)', a: [3, 1], b: [-1, 2] },
  { name: 'i(1; 0), j(0; 1)', a: [1, 0], b: [0, 1] }
];

/** Feladványok: [bázis indexe, m, n] – a célvektor v = m·a + n·b. */
const CHALLENGES: [number, number, number][] = [
  [0, 2, 1],
  [1, -1, 2],
  [2, 1, -1],
  [0, 1.5, -1],
  [3, -3, 2],
  [2, -1, -1.5]
];

export const VectorDecompositionTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: felbontás négyzetrácson
  const [basisIdx, setBasisIdx] = useState<number>(0);
  const [m, setM] = useState<number>(1);
  const [n, setN] = useState<number>(1);
  const [challenge, setChallenge] = useState<number | null>(null);

  // Labor II: lejtő
  const [alpha, setAlpha] = useState<number>(30);
  const [weight, setWeight] = useState<number>(50);

  // ---- Labor I számítások ----
  const basis = BASES[basisIdx];
  const [a1, a2] = basis.a;
  const [b1, b2] = basis.b;
  const ma: VDPoint = [m * a1, m * a2];
  const nb: VDPoint = [n * b1, n * b2];
  const v: VDPoint = [ma[0] + nb[0], ma[1] + nb[1]];
  const target: VDPoint | null =
    challenge === null
      ? null
      : (() => {
          const [, cm, cn] = CHALLENGES[challenge];
          const cb = BASES[CHALLENGES[challenge][0]];
          return [cm * cb.a[0] + cn * cb.b[0], cm * cb.a[1] + cn * cb.b[1]] as VDPoint;
        })();
  const solved = target !== null && Math.abs(target[0] - v[0]) < 1e-9 && Math.abs(target[1] - v[1]) < 1e-9;
  const pts: VDPoint[] = [[0, 0], basis.a, basis.b, ma, nb, v, ...(target ? [target] : [])];
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const gx0 = Math.floor(Math.min(...xs)) - 1;
  const gx1 = Math.ceil(Math.max(...xs)) + 1;
  const gy0 = Math.floor(Math.min(...ys)) - 1;
  const gy1 = Math.ceil(Math.max(...ys)) + 1;
  const cell = Math.max(10, Math.min(36, Math.floor(Math.min(380 / (gx1 - gx0), 300 / (gy1 - gy0)))));

  const startChallenge = () => {
    const next = challenge === null ? 0 : (challenge + 1) % CHALLENGES.length;
    setChallenge(next);
    setBasisIdx(CHALLENGES[next][0]);
    setM(0);
    setN(0);
  };

  // ---- Labor II számítások ----
  const gPar = weight * Math.sin(toRad(alpha));
  const gPerp = weight * Math.cos(toRad(alpha));
  const S0 = { x: 40, y: 230 };
  const run = Math.min(380, 260 / Math.tan(toRad(alpha)));
  const S1 = { x: S0.x + run, y: S0.y };
  const ST = { x: S1.x, y: S0.y - run * Math.tan(toRad(alpha)) };
  const dir = { x: Math.cos(toRad(alpha)), y: -Math.sin(toRad(alpha)) };
  const nor = { x: -Math.sin(toRad(alpha)), y: -Math.cos(toRad(alpha)) };
  const along = (run / Math.cos(toRad(alpha))) * 0.55;
  const Cb = { x: S0.x + dir.x * along + nor.x * 18, y: S0.y + dir.y * along + nor.y * 18 };
  const scaleG = 1.6; // képpont / N
  const gLen = weight * scaleG;
  const Ge = { x: Cb.x, y: Cb.y + gLen };
  const Pe = { x: Cb.x - dir.x * gPar * scaleG, y: Cb.y - dir.y * gPar * scaleG };
  const Ne = { x: Cb.x - nor.x * gPerp * scaleG, y: Cb.y - nor.y * gPerp * scaleG };
  const lab2H = Math.max(260, Ge.y + 20);
  const minY = Math.min(ST.y - 10, Cb.y - 40, 0);

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="vektor-felbontasa-osszetevokre"
      title="4. Ráadás – Vektor felbontása összetevőkre"
      subtitle="Mennyi idő alatt ér át a katamarán a túlsó partra? Egy vektor felírása két nem párhuzamos vektor számszorosainak összegeként – szerkesztéssel és számolással."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_vektor_felbontasa_tananyag.pdf"
      practiceTitle="Készen állsz a vektorfelbontásos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — VEKTOR FELBONTÁSA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                →v = m · →a + n · →b (m, n ∈ ℝ; →a ∦ →b)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Ha →a és →b a sík két <strong>nem párhuzamos</strong> vektora, akkor a sík bármely →v vektora <strong>egyértelműen</strong> felbontható →a és →b irányú összetevőkre.
              </li>
              <li>
                Az <strong>összetevők</strong> (m · →a és n · →b) annak a paralelogrammának az oldalvektorai, amelynek átlója →v.
              </li>
              <li>
                Merőleges irányoknál: az összetevők hossza <strong>|→v| · cos φ</strong> és <strong>|→v| · sin φ</strong>, ahol φ a →v és az első irány szöge.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: átkel a katamarán" badge="Tankönyv 224. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Katamarán indul egy mesterséges tó egyik partjáról (A). A vízi jármű 1 másodperc alatt <strong>12 m</strong>-t mozdul el, az elmozdulás vektora (→r) mindvégig <strong>30°</strong>-os szöget zár be a parttal. A szemközti part <strong>1,2 km</strong>-re van.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>a)</strong> Mennyi idő alatt ér át a katamarán a szemközti partra (B-be)?</li>
              <li>
                <strong>b)</strong> A parttal párhuzamos úton egy autóra szerelt, a partra merőlegesen beállított kamera filmezi a katamaránt. Mekkora sebességgel haladjon az autó, hogy a katamarán mindig a látómező közepén legyen?
              </li>
            </ul>
          </div>
          <CatamaranLakeSvg />
        </div>
      </TheorySection>

      {/* 2. Megoldás összetevőkkel */}
      <TheorySection title="2. Megoldás: bontsuk fel az elmozdulást!" badge="Kidolgozott feladat" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <CatamaranComponentsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Az →r elmozdulásvektort felírjuk két vektor összegeként: →r = →rₘ + →rₚ, ahol →rₘ <strong>merőleges</strong> a partra, →rₚ <strong>párhuzamos</strong> vele.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>|→rₘ| azt mutatja, másodpercenként hány méterrel kerül közelebb a katamarán a túlparthoz.</li>
              <li>|→rₚ| azt mutatja, másodpercenként hány méterrel kerül távolabb az AC egyenestől.</li>
              <li>
                A derékszögű háromszög egy szabályos háromszög fele (30°, 60°, 90°), ezért |→rₘ| = 12 : 2 = <strong>6 m</strong>, |→rₚ| = 6√3 ≈ <strong>10,4 m</strong>.
              </li>
              <li><strong>a)</strong> 1200 m : 6 m = <strong>200 másodperc</strong> alatt ér át (3 perc 20 s).</li>
              <li>
                <strong>b)</strong> Az autónak másodpercenként 10,4 m-t kell megtennie: 10,4 m/s · 3,6 ≈ <strong>37,4 km/h</strong>.
              </li>
            </ul>
            <p className="text-xs text-slate-500">
              Megjegyzés: a feladat vektorok nélkül is megoldható, de a felbontás azonnal két független, egyszerű kérdésre bontja: „mennyit halad át?” és „mennyit sodródik oldalra?”.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. Elmélet */}
      <TheorySection title="3. Elmélet: a felbontás tétele és a szerkesztés" badge="Elmélet" badgeColor="indigo">
        <TheoryCard title="Vektor felbontása két adott irányba" badge="Tétel" badgeColor="blue">
          <p className="text-sm text-slate-700 leading-relaxed">
            Legyen →a és →b a sík két nem párhuzamos vektora. Ekkor a sík egy tetszőleges →v vektora <strong>egyértelműen</strong> felbontható az →a és →b vektorokkal párhuzamos összetevőkre, vagyis →v előáll az →a és →b számszorosainak összegeként:
            <strong> →v = m · →a + n · →b</strong>, ahol m ∈ ℝ, n ∈ ℝ és →a ∦ →b.
          </p>
        </TheoryCard>
        <DecompositionStepsSvg />
        <TheoryTable
          headers={['Helyzet', 'Felbontható?', 'Megjegyzés']}
          rows={[
            ['→a ∦ →b (nem párhuzamosak)', 'igen, egyértelműen', 'm és n egyetlen számpár'],
            ['→v ∥ →a', 'igen', '→v = m · →a + 0 · →b, a →b irányú összetevő nullvektor'],
            ['→v = →0 (nullvektor)', 'igen', '→v = 0 · →a + 0 · →b'],
            ['→a ∥ →b és →v nem párhuzamos velük', 'nem', 'm · →a + n · →b mindig az →a egyenesével párhuzamos'],
            ['→a ∥ →b és →v is párhuzamos velük', 'igen, de nem egyértelműen', 'végtelen sok (m; n) pár jó']
          ]}
        />
        <TheoryCallout type="info" title="Mit jelent az együttható előjele és nagysága?">
          m &gt; 0: az összetevő →a-val egyirányú; m &lt; 0: ellentétes irányú; |m| megmutatja, hányszor olyan hosszú az összetevő, mint →a. Például 1/3 · →u az →u harmada, −2 · →c a →c-vel ellentétes irányú és kétszer olyan hosszú.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Kidolgozott feladatok */}
      <TheorySection title="4. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Felbontás négyzetrácson" badge="Rácsos feladat" badgeColor="sky">
            <GridDecompositionSvg className="w-full h-auto max-w-sm mx-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A rácsban →a 2 egységet jobbra, 1-et fel; →b 1-et jobbra, 3-at fel mutat; →v 5-öt jobbra és 5-öt fel.</li>
              <li>Keressük m-et és n-et: 2m + n = 5 és m + 3n = 5.</li>
              <li>Az első egyenletből n = 5 − 2m; behelyettesítve m + 15 − 6m = 5 ⇒ <strong>m = 2</strong>, <strong>n = 1</strong>.</li>
              <li>Tehát <strong>→v = 2→a + →b</strong> – a sárga paralelogramma oldalvektorai 2→a és →b.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Fonálon függő 20 N súlyú tárgy" badge="4. feladat" badgeColor="purple">
            <HangingWeightSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A két fonáldarab a vízszintessel 60°-os, illetve 30°-os szöget zár be, így egymással 180° − 60° − 30° = <strong>90°</strong>-ot.</li>
              <li>A →G súlyerőt a két fonállal párhuzamos összetevőre bontjuk: a paralelogramma most téglalap, →G az átlója.</li>
              <li>A 30°-os fonállal párhuzamos összetevő: |→G₁| = 20 · sin 30° = <strong>10 N</strong>.</li>
              <li>A 60°-os fonállal párhuzamos összetevő: |→G₂| = 20 · sin 60° = 10√3 ≈ <strong>17,3 N</strong>.</li>
              <li>Ellenőrzés: 10² + 17,32² ≈ 400 = 20². A meredekebb fonalat nagyobb erő feszíti.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Együtthatók 0-val" badge="3. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>→u = 2→b + 0→c</strong>: →u a →b kétszerese, a →c irányú összetevő a nullvektor.</li>
              <li><strong>→v = 0→b + (−2)→c</strong>: →v a →c-vel ellentétes irányú, kétszer olyan hosszú vektor.</li>
              <li><strong>→w = 0→b + 0→c</strong>: →w a nullvektor (hossza 0, iránya tetszőleges).</li>
            </ul>
            <p className="text-xs text-slate-500 mt-2">
              Ha a →v vektor párhuzamos az egyik iránnyal, a másik irányú összetevő együtthatója 0.
            </p>
          </TheoryCard>
          <TheoryCard title="D) Mikor NEM bontható fel egy vektor?" badge="2. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Szabályos hatszögben a szemközti oldalak párhuzamosak. Ha a két megadott vektor egymással párhuzamos (például két szemközti oldal vektora), akkor m · →a + n · →b mindig ugyanazzal az egyenessel párhuzamos.</li>
              <li>Ezért egy rájuk <strong>nem párhuzamos</strong> vektor ilyen összetevőkre <strong>nem</strong> bontható fel.</li>
              <li>Két nem párhuzamos vektor (pl. a hatszög két szomszédos oldalának vektora) esetén a felbontás mindig létezik, és egyértelmű.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Vektorok megrajzolása együtthatókból" badge="Házi feladat 1." badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>→p = 1/3 · →u + 1 · →v</strong>: →u harmadához hozzáfűzzük →v-t.</li>
              <li><strong>→q = −1 · →u + 3/2 · →v</strong>: →u ellentettjéhez fűzzük →v másfélszeresét.</li>
              <li><strong>→s = →u − 2→v</strong>: →u-hoz a →v-vel ellentétes, kétszer olyan hosszú vektort fűzzük.</li>
              <li>Az összeadás sorrendje tetszőleges (a paralelogramma két útja ugyanoda vezet).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Merőleges összetevők általában" badge="Összefoglalás" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Ha a két irány merőleges, a paralelogramma téglalap, és az összetevők a derékszögű háromszög befogói.</li>
              <li>Ha →v az első iránnyal φ szöget zár be: az összetevők hossza |→v| · cos φ és |→v| · sin φ.</li>
              <li>Pitagorasz-tétel: (|→v| cos φ)² + (|→v| sin φ)² = |→v|².</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Kitekintés: lejtő */}
      <TheorySection title="5. Kitekintés a fizikába: erők a lejtőn" badge="Alkalmazás" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <InclineForcesSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy α hajlásszögű lejtőn álló test →G súlyerejét célszerű a <strong>lejtővel párhuzamos</strong> és a <strong>lejtőre merőleges</strong> összetevőre bontani.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A →G és a lejtőre merőleges összetevő szöge éppen α (merőleges szárú szögek).</li>
              <li>A lejtő irányú összetevő – ez gyorsítja lefelé a testet: <strong>G∥ = G · sin α</strong>.</li>
              <li>A merőleges összetevő – ez nyomja a lejtőhöz: <strong>G⊥ = G · cos α</strong>.</li>
              <li>Például G = 50 N és α = 30° esetén G∥ = 25 N és G⊥ ≈ 43,3 N.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: az összetevők hosszát összeadni" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A vektorok összeadódnak, a hosszaik nem!"
          wrong="|→r| = |→rₘ| + |→rₚ|, tehát 12 = 6 + 10,4"
          wrongExplanation="A felbontás vektoregyenlőség: →r = →rₘ + →rₚ. A hosszak csak akkor adódnának össze, ha a két összetevő egyirányú lenne. A katamarán példájában 6 + 10,4 = 16,4 ≠ 12."
          correct="→r = →rₘ + →rₚ, és merőleges összetevőknél |→r|² = |→rₘ|² + |→rₚ|²"
          correctExplanation="6² + (6√3)² = 36 + 108 = 144 = 12². Gyakori további hiba a sin és a cos felcserélése: mindig nézd meg, melyik összetevő melyik szöggel szomszédos!"
          tip="Az a szög koszinuszával szorozz, amelyik az összetevő és a felbontandó vektor között van."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Felbontás négyzetrácson" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {BASES.map((bs, k) => (
                  <button
                    key={bs.name}
                    onClick={() => {
                      setBasisIdx(k);
                      setChallenge(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      k === basisIdx ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    {bs.name}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">m (az →a együtthatója): {fmtN(m)}</label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={m}
                  onChange={(e) => setM(Number(e.target.value))}
                  className="w-full accent-blue-600"
                  aria-label="m együttható"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">n (a →b együtthatója): {fmtN(n)}</label>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={n}
                  onChange={(e) => setN(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  aria-label="n együttható"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>m · →a = ({fmtN(ma[0])}; {fmtN(ma[1])})</div>
                <div>n · →b = ({fmtN(nb[0])}; {fmtN(nb[1])})</div>
                <div>
                  <strong>→v = m · →a + n · →b = ({fmtN(v[0])}; {fmtN(v[1])})</strong>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={startChallenge}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200"
                >
                  {challenge === null ? 'Feladvány indítása' : 'Következő feladvány'}
                </button>
                {target && (
                  <span className={`text-xs font-bold ${solved ? 'text-emerald-700' : 'text-slate-600'}`}>
                    {solved
                      ? `Kész! (${fmtN(target[0])}; ${fmtN(target[1])}) = ${fmtN(m)} · →a + ${fmtN(n)} · →b`
                      : `Állítsd be m-et és n-et úgy, hogy →v a szaggatott (${fmtN(target[0])}; ${fmtN(target[1])}) célvektor legyen!`}
                  </span>
                )}
              </div>
              {target && !solved && (
                <p className="text-xs text-slate-500 italic">
                  Segítség: {a1}m + {b1 < 0 ? `(${fmtN(b1)})` : b1}n = {fmtN(target[0])} és {a2}m + {b2 < 0 ? `(${fmtN(b2)})` : b2}n = {fmtN(target[1])}.
                </p>
              )}
            </div>
            <VDGrid
              x0={gx0}
              x1={gx1}
              y0={gy0}
              y1={gy1}
              cell={cell}
              axes
              className="w-full h-auto bg-slate-50 rounded-xl"
              polygons={[
                {
                  pts: [[0, 0], ma, v, nb],
                  fill: 'rgba(250,204,21,0.15)',
                  stroke: '#eab308',
                  dashed: true
                }
              ]}
              vectors={[
                ...(target ? [{ from: [0, 0] as VDPoint, to: target, color: '#f59e0b', dashed: true, width: 2 }] : []),
                { from: [0, 0], to: ma, color: '#60a5fa', width: 4 },
                { from: [0, 0], to: nb, color: '#34d399', width: 4 },
                { from: [0, 0], to: basis.a, label: basisIdx === 3 ? 'i' : 'a', color: '#1e3a8a', side: -1 },
                { from: [0, 0], to: basis.b, label: basisIdx === 3 ? 'j' : 'b', color: '#065f46', side: 1 },
                { from: [0, 0], to: v, label: 'v', color: '#dc2626', side: 1, at: 0.7 }
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Erők a lejtőn" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a lejtő hajlásszöge α: {alpha}°</label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={alpha}
                  onChange={(e) => setAlpha(Number(e.target.value))}
                  className="w-full accent-rose-600"
                  aria-label="lejtő hajlásszöge"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a test súlya G: {weight} N</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-purple-600"
                  aria-label="a test súlya"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>G∥ = G · sin α = {weight} · {fmt(Math.sin(toRad(alpha)), 3)} ≈ <strong>{fmt(gPar, 1)} N</strong></div>
                <div>G⊥ = G · cos α = {weight} · {fmt(Math.cos(toRad(alpha)), 3)} ≈ <strong>{fmt(gPerp, 1)} N</strong></div>
                <div className="text-xs text-slate-500">
                  Ellenőrzés: G∥² + G⊥² ≈ {fmt(gPar * gPar + gPerp * gPerp, 1)} = G² = {weight * weight}
                </div>
                <div className="text-xs text-slate-500">
                  A hosszak összege: {fmt(gPar + gPerp, 1)} N ≠ {weight} N – a vektorok adódnak össze, nem a hosszak!
                </div>
              </div>
              <TheoryCallout type="tip" title="Figyeld meg!">
                α = 30°-nál a lejtő irányú összetevő pontosan a súly fele. Minél meredekebb a lejtő, annál nagyobb G∥, és annál kisebb a lejtőt nyomó G⊥.
              </TheoryCallout>
            </div>
            <svg
              viewBox={`0 ${minY} 460 ${lab2H - minY}`}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
            >
              <polygon
                points={`${S0.x},${S0.y} ${S1.x},${S1.y} ${ST.x},${ST.y}`}
                fill="#e2e8f0"
                stroke="#475569"
                strokeWidth="2"
              />
              <VDRightAngle V={S1} P={S0} Q={ST} r={13} />
              <path
                d={`M ${S0.x + 46} ${S0.y} A 46 46 0 0 0 ${(S0.x + 46 * dir.x).toFixed(1)} ${(S0.y + 46 * dir.y).toFixed(1)}`}
                fill="none"
                stroke="#b91c1c"
                strokeWidth="1.5"
              />
              <text x={S0.x + 52} y={S0.y - 6} fontSize="12" fontWeight="bold" fill="#b91c1c">
                {alpha}°
              </text>
              <g transform={`rotate(${-alpha} ${Cb.x} ${Cb.y})`}>
                <rect x={Cb.x - 22} y={Cb.y - 18} width="44" height="36" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />
              </g>
              <polygon
                points={`${Cb.x},${Cb.y} ${Pe.x},${Pe.y} ${Ge.x},${Ge.y} ${Ne.x},${Ne.y}`}
                fill="none"
                stroke="#94a3b8"
                strokeDasharray="4 3"
              />
              <VDRightAngle V={Cb} P={Pe} Q={Ne} r={11} />
              <VDArrow x1={Cb.x} y1={Cb.y} x2={Ge.x} y2={Ge.y} color="#dc2626" width={3} />
              <VDArrow x1={Cb.x} y1={Cb.y} x2={Pe.x} y2={Pe.y} color="#2563eb" width={2.6} />
              <VDArrow x1={Cb.x} y1={Cb.y} x2={Ne.x} y2={Ne.y} color="#059669" width={2.6} />
              <VDLabel x={Ge.x + 14} y={Ge.y - 4} text="G" color="#b91c1c" size={14} />
              <VDLabel x={Pe.x - 16} y={Pe.y - 8} text="G_∥" color="#1d4ed8" />
              <VDLabel x={Ne.x + 18} y={Ne.y + 2} text="G_⊥" color="#047857" />
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default VectorDecompositionTheory;
