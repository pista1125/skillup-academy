import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  MathText
} from '../TheoryTemplate';
import {
  FunctionMachineSvg,
  FenceOptimizationSvg,
  PricingParadoxSvg,
  DomainRestrictionSvg
} from './ConcreteFunctionsFigures';
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Scale,
  Layers,
  Sparkles,
  Maximize2,
  TrendingUp,
  Sliders,
  DollarSign,
  Package,
  Compass
} from 'lucide-react';

interface ConcreteFunctionsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ConcreteFunctionsTheory: React.FC<ConcreteFunctionsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab 1: Kerítés Optimalizáló Állapot ---
  const [fenceMode, setFenceMode] = useState<'4sides' | '1wall' | 'corner'>('4sides');
  const [fenceLength, setFenceLength] = useState<number>(46); // m (tankönyvi alapadat: 20 db 2,3 m-es elem = 46 m)
  const [fenceX, setFenceX] = useState<number>(11.5); // m szélesség

  // Számítások a kerítéshez
  let fenceY = 0;
  let maxArea = 0;
  let optimalX = 0;
  let currentArea = 0;
  let maxXAllowed = fenceLength;

  if (fenceMode === '4sides') {
    // 2x + 2y = K  =>  y = K/2 - x
    maxXAllowed = fenceLength / 2;
    const safeX = Math.min(Math.max(fenceX, 0.5), maxXAllowed - 0.5);
    fenceY = Math.max(0, fenceLength / 2 - safeX);
    currentArea = safeX * fenceY;
    optimalX = fenceLength / 4;
    maxArea = optimalX * optimalX;
  } else if (fenceMode === '1wall') {
    // 2x + y = K  =>  y = K - 2x
    maxXAllowed = fenceLength / 2;
    const safeX = Math.min(Math.max(fenceX, 0.5), maxXAllowed - 0.5);
    fenceY = Math.max(0, fenceLength - 2 * safeX);
    currentArea = safeX * fenceY;
    optimalX = fenceLength / 4;
    maxArea = optimalX * (fenceLength - 2 * optimalX);
  } else {
    // x + y = K  =>  y = K - x
    maxXAllowed = fenceLength;
    const safeX = Math.min(Math.max(fenceX, 0.5), maxXAllowed - 0.5);
    fenceY = Math.max(0, fenceLength - safeX);
    currentArea = safeX * fenceY;
    optimalX = fenceLength / 2;
    maxArea = optimalX * optimalX;
  }

  // --- Interactive Lab 2: Ár- és Bevétel Modellező Állapot ---
  const [basePrice, setBasePrice] = useState<number>(4000); // Ft (szurkolói mez alapár)
  const [discountPerItem, setDiscountPerItem] = useState<number>(200); // Ft/db
  const [itemCount, setItemCount] = useState<number>(10); // vásárolt darabszám

  // Számítások az árképzéshez
  const unitPrice = Math.max(0, basePrice - itemCount * discountPerItem);
  const totalRevenue = itemCount * unitPrice;
  const optimalItemCount = Math.round(basePrice / (2 * discountPerItem));
  const maxRevenue = optimalItemCount * Math.max(0, basePrice - optimalItemCount * discountPerItem);
  const isParadox = itemCount > optimalItemCount;

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • IV. FÜGGVÉNYTRANSZFORMÁCIÓK • TANANYAG"
      title="Függvények egy-egy konkrét problémához"
      subtitle="Valós jelenségek, gazdasági összefüggések és geometriai optimalizálás matematikai modellezése."
      themeColor="blue"
      quickRule={{
        label: 'FONTOS SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-blue-600 dark:text-blue-400 font-black">Függvénykapcsolat:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>x</MathText> (bemenet) ⟹ <MathText>y = f(x)</MathText> (pontosan egy kimenet)
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Kordon optimalizálás:</span>
              <span className="text-slate-800 dark:text-slate-100">
                4 oldal: <MathText>T(x) = x(K/2 - x)</MathText> &nbsp;|&nbsp; 1 fal: <MathText>T(x) = x(K - 2x)</MathText> &nbsp;|&nbsp; Sarok: <MathText>T(x) = x(K - x)</MathText>
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-amber-600 dark:text-amber-400 font-black">Reális korlátok:</span>
              <span className="text-slate-800 dark:text-slate-100">
                Hossz, idő: <MathText>x &gt; 0</MathText> &nbsp;|&nbsp; Darabszám: <MathText>x ∈ ℕ</MathText> &nbsp;|&nbsp; Nemnegatív méretek!
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-purple-600 dark:text-purple-400 font-black">Leárazási bevétel:</span>
              <span className="text-slate-800 dark:text-slate-100">
                <MathText>F(x) = x · E(x)</MathText> &nbsp;|&nbsp; Csúcspont felett: <span className="text-rose-500 font-bold">Paradoxon (kevesebb bevétel!)</span>
              </span>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz indítása"
    >
      {/* 1. SZEKCIÓ: A FÜGGVÉNY FOGALMA A VALÓ ÉLETBEN */}
      <TheorySection
        number={1}
        title="A függvény fogalma a mindennapi életben"
        icon={<Compass className="w-5 h-5 text-blue-500" />}
        badge="ALAPFOGALOM"
        badgeColor="blue"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A való világban lépten-nyomon olyan jelenségekkel találkozunk, ahol az egyik mennyiség
          értéke egy másik mennyiségtől függ. Amikor egy mennyiség változása egyértelműen meghatározza
          egy másik mennyiség értékét, a matematikában <strong>függvénykapcsolatról</strong> beszélünk.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <TheoryCard title="Független változó (bemenet)">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Általában <strong>x</strong>-szel jelöljük. Ez az a mennyiség, amit szabadon megválaszthatunk,
              beállíthatunk vagy mérhetünk (pl. vásárolt termékek darabszáma, eltelt idő, a kerítés szélessége).
            </p>
          </TheoryCard>

          <TheoryCard title="Függő változó (kimenet)">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Általában <strong>y</strong>-nal vagy <strong>f(x)</strong>-szel jelöljük. Értékét a bemenet
              és a hozzárendelési szabály egyértelműen meghatározza (pl. fizetendő végösszeg, a bekerített terület nagysága).
            </p>
          </TheoryCard>
        </div>

        <div className="my-3 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <FunctionMachineSvg size={260} />
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2">
            A függvény működése mint egy automata gép: a bemeneti x értékből a szabály előállítja a pontosan egy kimeneti y értéket.
          </p>
        </div>

        <TheoryCallout title="A függvények négy egyenrangú megadási módja" variant="info">
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 dark:text-slate-300">
            <li><strong>Képlettel (hozzárendelési szabállyal):</strong> Precíz algebrai leírás, pl. <code>T(x) = x · (23 - x)</code>.</li>
            <li><strong>Értéktáblázattal:</strong> Konkrét bemenet-kimenet párok gyűjteménye (pl. mérések, kísérletek eredményei).</li>
            <li><strong>Grafikonnal:</strong> Vizuális görbe koordináta-rendszerben, amely azonnal megmutatja a trendeket és szélsőértékeket.</li>
            <li><strong>Szöveges szabállyal:</strong> Természetes nyelven megfogalmazott leírás (pl. „Minden vásárolt póló után 200 Ft engedmény jár”).</li>
          </ul>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: ELMÉLETI VS. REÁLIS ÉRTELMEZÉSI TARTOMÁNY */}
      <TheorySection
        number={2}
        title="Elméleti vs. Reális értelmezési tartomány (Df)"
        icon={<Scale className="w-5 h-5 text-indigo-500" />}
        badge="FONTOS KORLÁTOZÁS"
        badgeColor="indigo"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A tiszta algebrában egy másodfokú kifejezésbe, mint az <code>f(x) = x · (23 - x)</code>,
          bármilyen valós számot (akár negatív számot vagy milliárdot is) behelyettesíthetünk.
          A <strong>gyakorlati modellezésben</strong> azonban a fizikai valóság szigorú korlátokat szab!
        </p>

        <div className="my-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <DomainRestrictionSvg size={280} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TheoryCard title="Nemnegativitási korlát">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Egy téglalap oldalhossza, egy víztartály térfogata vagy az eltelt idő soha nem lehet negatív:
              <strong> x &gt; 0</strong>. Ha a kerület K = 46 m, akkor a szélesség sem érheti el a K/2 = 23 métert.
            </p>
          </TheoryCard>

          <TheoryCard title="Diszkrét (egész) darabszám">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              DVD-lemezt, pólót vagy koncertjegyet csak egész számú darabban vásárolhatunk:
              <strong> x ∈ ℕ</strong>. A függvény grafikonja ilyenkor nem folytonos vonal, hanem pontok sorozata!
            </p>
          </TheoryCard>

          <TheoryCard title="Felső kapacitáskorlát">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Az akció szabályzata korlátozhatja a vásárlást (pl. legfeljebb 10 lemez vásárolható: <strong>0 ≤ x ≤ 10</strong>),
              vagy egy rendezvényterem befogadóképessége véges.
            </p>
          </TheoryCard>
        </div>

        <TheoryTrapBox title="Típushiba: A negatív méretek csapdája">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Ha a kordon szélességére felírt <code>T(x) = x · (23 - x)</code> egyenletbe <code>x = -5</code>-öt
            helyettesítünk, matematikailag <code>(-5) · 28 = -140</code>-et kapunk.
            Ennek azonban semmi köze a valósághoz! A modell <strong>kizárólag a 0 &lt; x &lt; 23 nyílt intervallumon érvényes</strong>,
            mert mindkét oldalnak pozitív hosszúságúnak kell lennie!
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* 3. SZEKCIÓ: GEOMETRIAI OPTIMALIZÁLÁS – A KORDON FELADAT */}
      <TheorySection
        number={3}
        title="Geometriai optimalizálás – A kordon és kerítés problémája"
        icon={<Maximize2 className="w-5 h-5 text-emerald-500" />}
        badge="TANKÖNYVI MODELL"
        badgeColor="emerald"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A tankönyv nyitó feladatában 20 db 2,3 méteres kordon elemmel kerítünk el egy területet
          (összhossz: <strong>K = 46 m</strong>). Három elrendezési módot vizsgálunk meg:
        </p>

        <div className="my-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <FenceOptimizationSvg size={300} />
        </div>

        <div className="space-y-3 mt-3">
          <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
            <div className="font-bold text-sm text-emerald-900 dark:text-emerald-300 mb-1">
              1. Szituáció: Szabad terület bekerítése (4 oldal kerítés)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Kerület összefüggése: <code>2x + 2y = 46  ⟹  y = 23 - x</code>.<br />
              Területfüggvény: <strong>T(x) = x · (23 - x) = -x² + 23x</strong>.<br />
              Ez egy lefelé nyíló parabola. Zérushelyei x = 0 és x = 23. A parabola csúcspontja a két zérushely számtani közepén van:
              <strong> x = 11,5 m</strong>. Ekkor y = 11,5 m (négyzet alak!), és a maximális terület:
              <strong> T_max = 11,5 · 11,5 = 132,25 m²</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800/60">
            <div className="font-bold text-sm text-blue-900 dark:text-blue-300 mb-1">
              2. Szituáció: Egy épület fala mentén (3 oldal kerítés)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A hosszú oldalhoz nem kell kerítés: <code>2x + y = 46  ⟹  y = 46 - 2x</code>.<br />
              Területfüggvény: <strong>T(x) = x · (46 - 2x) = -2x² + 46x</strong>.<br />
              Zérushelyek: x = 0 és x = 23. A maximum a csúcspontban van: <strong>x = 11,5 m</strong>.<br />
              A fal menti oldal ekkor <code>y = 46 - 2 · 11,5 = 23 m</code> (kétszerese a szélességnek!).<br />
              Maximális terület: <strong>T_max = 11,5 · 23 = 264,5 m²</strong> — pontosan a <strong>duplája</strong> a 4 oldalas területnek!
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/60">
            <div className="font-bold text-sm text-amber-900 dark:text-amber-300 mb-1">
              3. Szituáció: Sarokba illesztve (2 oldal fal, 2 oldal kerítés)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Két szomszédos oldal a fal, így csak a másik két oldalhoz kell kerítés: <code>x + y = 46  ⟹  y = 46 - x</code>.<br />
              Területfüggvény: <strong>T(x) = x · (46 - x) = -x² + 46x</strong>.<br />
              A csúcspont: <strong>x = 23 m</strong>, ekkor y = 23 m (ismét négyzet!).<br />
              Maximális terület: <strong>T_max = 23 · 23 = 529 m²</strong> — a szabadon álló terület <strong>négyszerese</strong>!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: KÖZGAZDASÁGI MODELLEZÉS ÉS A LEÁRAZÁSI PARADOXON */}
      <TheorySection
        number={4}
        title="Közgazdasági modellezés és a leárazási paradoxon"
        icon={<DollarSign className="w-5 h-5 text-amber-500" />}
        badge="GAZDASÁGI CSAPDA"
        badgeColor="amber"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
          A gazdasági életben a boltvezetők gyakran hirdetnek mennyiségi kedvezményt.
          Ám ha a kedvezmény mértékét nem határolják be körültekintően, <strong>abszurd gazdasági paradoxon</strong> alakulhat ki!
        </p>

        <div className="my-2 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
          <PricingParadoxSvg size={290} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <TheoryCard title="A labdarúgó mezek leárazási modellje">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Alapár: 4000 Ft. Minden vásárolt póló után darabonként 200 Ft engedmény jár.<br />
              • Egységár: <code>E(x) = 4000 - 200x</code> (Ft/db)<br />
              • Fizetendő összeg: <code>F(x) = x · (4000 - 200x) = 4000x - 200x²</code><br />
              <strong>10 póló ára:</strong> 10 · (4000 - 2000) = <strong>20 000 Ft</strong> (Csúcspont / Maximum!)<br />
              <strong>15 póló ára:</strong> 15 · (4000 - 3000) = 15 · 1000 = <strong>15 000 Ft</strong>!<br />
              <span className="text-rose-600 font-bold">Paradoxon:</span> 15 pólóért kevesebbet fizetünk, mint 10-ért!
              20 pólónál pedig <code>F(20) = 20 · 0 = 0 Ft</code>, ingyen elvihető lenne az egész készlet!
            </p>
          </TheoryCard>

          <TheoryCard title="A DVD-csomag és a legkedvezőbb egységár">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Csomagár képlete: <code>A(x) = [(x - 3)² + 7] · 100</code> Ft.<br />
              • <strong>Összár minimuma:</strong> Mivel (x-3)² ≥ 0, a legkisebb érték <code>x = 3</code>-nál van:
              <code>A(3) = 7 · 100 = 700 Ft</code>.<br />
              • <strong>Egységár:</strong> <code>E(x) = A(x) / x</code>.<br />
              3 lemeznél: 700 / 3 ≈ 233,3 Ft/db.<br />
              4 lemeznél: <code>A(4) = (1 + 7) · 100 = 800 Ft ⟹ E(4) = 800 / 4 = 200 Ft/db</code>!<br />
              A <strong>legjobb egységár x = 4-nél</strong> érhető el, nem pedig x = 3-nál!
            </p>
          </TheoryCard>
        </div>

        <TheoryCallout title="Hogyan javítható ki a matematikai modell?" variant="warning">
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            A boltvezetőnek <strong>alsó korlátot (minimum egységárat)</strong> kell bevezetnie,
            például: <em>„Az egységár a kedvezmény után sem csökkenhet 1500 Ft alá”</em>.
            Ekkor a függvény szakaszonként értelmezetté válik: amíg x ≤ 12, addig az egységár csökken,
            utána viszont állandó 1500 Ft/db marad, megszüntetve a paradoxont.
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV LABORATÓRIUMOK */}
      <TheorySection
        number={5}
        title="Interaktív Laboratóriumok – Szimulálj valós modelleket!"
        icon={<Sliders className="w-5 h-5 text-indigo-500" />}
        badge="SZIMULÁCIÓ"
        badgeColor="indigo"
      >
        {/* LABOR 1: KORDON KERÍTÉS SZIMULÁTOR */}
        <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-700 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-sm text-emerald-300">
                1. Kordon Terület-Optimalizáló Szimulátor
              </h4>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
              Interaktív geometriai modell
            </span>
          </div>

          {/* Model selector buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setFenceMode('4sides');
                setFenceX(fenceLength / 4);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                fenceMode === '4sides'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              1. Szabad terület (4 oldal kerítés)
            </button>
            <button
              onClick={() => {
                setFenceMode('1wall');
                setFenceX(fenceLength / 4);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                fenceMode === '1wall'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              2. Fal mellett (3 oldal kerítés)
            </button>
            <button
              onClick={() => {
                setFenceMode('corner');
                setFenceX(fenceLength / 2);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                fenceMode === 'corner'
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              3. Sarokba zárt (2 oldal kerítés)
            </button>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Rendelkezésre álló kerítéshossz (K):</span>
                <span className="font-bold text-emerald-400">{fenceLength} m</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                step="2"
                value={fenceLength}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setFenceLength(val);
                  setFenceX(Math.min(fenceX, val / 2));
                }}
                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Szélesség (x):</span>
                <span className="font-bold text-emerald-400">{fenceX.toFixed(1)} m</span>
              </div>
              <input
                type="range"
                min="1"
                max={Math.max(2, Math.floor(maxXAllowed - 1))}
                step="0.5"
                value={fenceX}
                onChange={(e) => setFenceX(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Live Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
              <div className="text-[11px] text-slate-400">Szélesség (x)</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">{fenceX.toFixed(1)} m</div>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
              <div className="text-[11px] text-slate-400">Hosszúság (y)</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">{fenceY.toFixed(1)} m</div>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-emerald-500/40 text-center">
              <div className="text-[11px] text-emerald-300">Pillanatnyi terület</div>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{currentArea.toFixed(1)} m²</div>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-amber-500/40 text-center">
              <div className="text-[11px] text-amber-300">Lehetséges maximum</div>
              <div className="text-base font-bold text-amber-400 font-mono mt-0.5">{maxArea.toFixed(1)} m²</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">x = {optimalX.toFixed(1)} m-nél</div>
            </div>
          </div>
        </div>

        {/* LABOR 2: ÁR ÉS BEVÉTEL SZIMULÁTOR */}
        <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-700 space-y-4 mt-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <h4 className="font-bold text-sm text-blue-300">
                2. Ár- és Bevétel Modellező Szimulátor
              </h4>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-mono">
              F(x) = x · (Alapár - d · x)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Alapár:</span>
                <span className="font-bold text-blue-400">{basePrice} Ft</span>
              </div>
              <input
                type="range"
                min="2000"
                max="6000"
                step="500"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Kedvezmény darabonként:</span>
                <span className="font-bold text-blue-400">{discountPerItem} Ft/db</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="50"
                value={discountPerItem}
                onChange={(e) => setDiscountPerItem(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Vásárolt darabszám (x):</span>
                <span className="font-bold text-amber-400">{itemCount} db</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Results Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-center">
              <div className="text-[11px] text-slate-400">Egységár ekkor</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">{unitPrice.toLocaleString('hu-HU')} Ft/db</div>
            </div>
            <div className={`p-3 bg-slate-800/80 rounded-xl border text-center ${
              isParadox ? 'border-rose-500/70 bg-rose-950/20' : 'border-blue-500/40'
            }`}>
              <div className="text-[11px] text-slate-300">Összes bevétel F(x)</div>
              <div className="text-base font-bold text-white font-mono mt-0.5">{totalRevenue.toLocaleString('hu-HU')} Ft</div>
              {isParadox && (
                <div className="text-[10px] text-rose-400 font-bold mt-1">⚠️ Paradoxon zóna! (csökkenő bevétel)</div>
              )}
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-emerald-500/40 text-center">
              <div className="text-[11px] text-emerald-300">Maximális lehetséges bevétel</div>
              <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{maxRevenue.toLocaleString('hu-HU')} Ft</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">Pontosan x = {optimalItemCount} db-nál</div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORLATI TANÁCSOK ÉS VIZSGASTRATÉGIA */}
      <TheorySection
        number={6}
        title="Gyakorlati tanácsok és modellezési stratégiák"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        badge="STRATÉGIA"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. Nevezd el a változókat!">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Minden szöveges feladatnál írd le pontosan a füzet szélére: <em>„Legyen x az eladott darabszám, és f(x) a bevétel forintban”</em>.
              A mértékegységek rögzítése megvéd a nagyságrendi hibáktól!
            </p>
          </TheoryCard>

          <TheoryCard title="2. Ellenőrizd a reális értelmezési tartományt!">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mielőtt bármit kiszámolnál, gondold végig: lehet-e x negatív? Lehet-e tört? Mi a fizikai felső határ?
              Ha a kapott matematikai megoldás kívül esik a reális tartományon, a feladatnak nincs gyakorlati megoldása.
            </p>
          </TheoryCard>

          <TheoryCard title="3. Keresd a szélsőértéket a szimmetriából!">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Másodfokú összefüggéseknél <code>(pl. T(x) = x(23-x))</code> nem kell bonyolult képletekkel bajlódnod:
              a zérushelyek (0 és 23) számtani közepe azonnal megadja a csúcspont helyét: <code>(0 + 23)/2 = 11,5</code>!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

