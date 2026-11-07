import React, { useState } from 'react';
import { TheoryTemplate, TheoryCardItem } from '../TheoryTemplate';
import {
  ThreeLinearPlanesSvg,
  LineAndCircleSvg,
  LineAndParabolaSvg,
  SymmetricSystemsSvg,
  ChairsAndTripsSvg,
  CoffeeMixtureSvg,
  ElevationMotionSvg
} from './CompositeEquationsFigures';
import {
  Calculator,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Compass,
  Layers,
  Split,
  RotateCcw,
  Sliders,
  Move,
  Target,
  Zap,
  TrendingUp
} from 'lucide-react';

interface CompositeEquationsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const CompositeEquationsTheory: React.FC<CompositeEquationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív szimuláció állapota ---
  // Parabola csúcs alakja: y = a(x - u)² + v
  const [parabolaA, setParabolaA] = useState<number>(1);
  const [parabolaU, setParabolaU] = useState<number>(0);
  const [parabolaV, setParabolaV] = useState<number>(0);

  // Egyenes alakja: y = mx + c
  const [slopeM, setSlopeM] = useState<number>(1);
  const [constC, setConstC] = useState<number>(2);

  // Ha a csúszka véletlenül 0-ra állna, a parabola ne fajuljon el egyenessé:
  const effectiveA = Math.abs(parabolaA) < 0.05 ? (parabolaA >= 0 ? 0.25 : -0.25) : parabolaA;

  // Algebrai levezetés:
  // a(x - u)² + v = mx + c ⟹ a·x² - (2au + m)·x + (a·u² + v - c) = 0
  const aCoeff = effectiveA;
  const bCoeff = -(2 * effectiveA * parabolaU + slopeM);
  const cCoeff = effectiveA * parabolaU * parabolaU + parabolaV - constC;
  const discriminant = bCoeff * bCoeff - 4 * aCoeff * cCoeff;

  let solutionInfo = '';
  let solutionStatus: 'two' | 'one' | 'none' = 'none';
  let solX1: number | null = null;
  let solX2: number | null = null;
  let solY1: number | null = null;
  let solY2: number | null = null;

  if (discriminant > 0.0001) {
    solX1 = (-bCoeff + Math.sqrt(discriminant)) / (2 * aCoeff);
    solX2 = (-bCoeff - Math.sqrt(discriminant)) / (2 * aCoeff);
    solY1 = slopeM * solX1 + constC;
    solY2 = slopeM * solX2 + constC;
    solutionInfo = `D = ${discriminant.toFixed(2)} > 0 ⟹ 2 különböző metszéspont (Szelő)`;
    solutionStatus = 'two';
  } else if (Math.abs(discriminant) <= 0.0001) {
    solX1 = -bCoeff / (2 * aCoeff);
    solY1 = slopeM * solX1 + constC;
    solutionInfo = `D = 0 ⟹ 1 érintési pont (Érintő)`;
    solutionStatus = 'one';
  } else {
    solutionInfo = `D = ${discriminant.toFixed(2)} < 0 ⟹ Nincs valós metszéspont (Kitérő)`;
    solutionStatus = 'none';
  }

  // Koordinátarendszer transzformáció:
  // SVG koordináták: 520px széles, 340px magas
  const originX = 260;
  const originY = 180;
  const scale = 20; // 20 px / egység

  const toSvgX = (x: number) => originX + x * scale;
  const toSvgY = (y: number) => originY - y * scale;

  // Parabola ív minta pontjai
  const parabolaPoints: string[] = [];
  for (let x = -11; x <= 11; x += 0.15) {
    const y = effectiveA * Math.pow(x - parabolaU, 2) + parabolaV;
    if (y >= -7 && y <= 12) {
      parabolaPoints.push(`${parabolaPoints.length === 0 ? 'M' : 'L'} ${toSvgX(x).toFixed(1)} ${toSvgY(y).toFixed(1)}`);
    }
  }
  const parabolaSvgPath = parabolaPoints.join(' ');

  // Egyenes végpontjai
  const lineX1 = -11;
  const lineY1 = slopeM * lineX1 + constC;
  const lineX2 = 11;
  const lineY2 = slopeM * lineX2 + constC;

  // Gyorsbeállítási minták (Presets)
  const applyPreset = (preset: 'secant' | 'tangent' | 'miss' | 'downward' | 'shifted') => {
    if (preset === 'secant') {
      setParabolaA(1);
      setParabolaU(0);
      setParabolaV(0);
      setSlopeM(1);
      setConstC(2);
    } else if (preset === 'tangent') {
      setParabolaA(1);
      setParabolaU(0);
      setParabolaV(0);
      setSlopeM(2);
      setConstC(-1);
    } else if (preset === 'miss') {
      setParabolaA(1);
      setParabolaU(0);
      setParabolaV(0);
      setSlopeM(1);
      setConstC(-2);
    } else if (preset === 'downward') {
      setParabolaA(-1);
      setParabolaU(1);
      setParabolaV(4);
      setSlopeM(0.5);
      setConstC(2);
    } else if (preset === 'shifted') {
      setParabolaA(0.5);
      setParabolaU(2);
      setParabolaV(-2);
      setSlopeM(-1);
      setConstC(1);
    }
  };

  const theoryCards: TheoryCardItem[] = [
    {
      id: 'card-three-variables',
      title: '1. Háromismeretlenes Lineáris Egyenletrendszerek',
      subtitle: 'Gauss-féle lépcsős elimináció: 3 ➔ 2 ➔ 1 ismeretlen',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            A <strong>háromismeretlenes elsőfokú egyenletrendszer</strong> általános alakja három változót
            (<code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded font-mono">x, y, z</code>) és
            három lineáris egyenletet tartalmaz. A térbeli analitikus geometriában minden ilyen egyenlet egy síkot határoz meg.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="font-bold text-blue-900 block text-sm">1. Lépés: Kiesés</span>
              <span className="text-xs text-blue-800">
                Válasszunk ki egy változót (pl. z-t). Két különböző egyenletpárból elimináljuk z-t!
              </span>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="font-bold text-purple-900 block text-sm">2. Lépés: 2x2 rendszer</span>
              <span className="text-xs text-purple-800">
                A megmaradó két ismeretlenre (x és y) egy szokásos kétismeretlenes rendszert kapunk, amit megoldunk.
              </span>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="font-bold text-emerald-900 block text-sm">3. Lépés: Visszafejtés</span>
              <span className="text-xs text-emerald-800">
                A kapott x és y értékét behelyettesítjük valamelyik eredeti egyenletbe, megkapva z értékét: (x; y; z).
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-100 rounded-lg border border-slate-300 font-mono text-xs space-y-1">
            <div className="text-slate-900 font-bold">Tankönyvi példa:</div>
            <div>I.   x + y + z = 6</div>
            <div>II.  2x − y + z = 3</div>
            <div>III. x + 2y − z = 2</div>
            <div className="text-indigo-600 font-semibold pt-1">
              (I) + (III) ⟹ 2x + 3y = 8  és  (II) + (III) ⟹ 3x + y = 5 ⟹ x = 1, y = 2, z = 3 ✓
            </div>
          </div>
        </div>
      ),
      figure: <ThreeLinearPlanesSvg size={240} />
    },
    {
      id: 'card-quadratic-systems',
      title: '2. Elsőfokú és Másodfokú Egyenletrendszerek',
      subtitle: 'Behelyettesítés, diszkrimináns és geometriai metszéspontok',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Gyakran találkozunk olyan rendszerekkel, ahol az egyik egyenlet <strong>elsőfokú</strong>, a másik
            pedig <strong>másodfokú</strong> (pl. egy kör egyenlete: <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded font-mono">x² + y² = r²</code>, vagy parabola: <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded font-mono">y = ax² + bx + c</code>).
          </p>

          <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg text-sm text-amber-900">
            <strong>Megoldási aranyszabály:</strong> Mindig az <em>elsőfokú</em> egyenletből fejezzük ki az egyik ismeretlent,
            és írjuk be a <em>másodfokú</em> egyenletbe! Így egyismeretlenes másodfokú egyenletet kapunk.
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span><strong>D &gt; 0:</strong> Két valós gyök ⟹ <strong>2 metszéspont</strong> (az egyenes szelő).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              <span><strong>D = 0:</strong> Egyetlen valós gyök ⟹ <strong>1 érintési pont</strong> (az egyenes érintő).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
              <span><strong>D &lt; 0:</strong> Nincs valós gyök ⟹ <strong>0 metszéspont</strong> (az egyenes elkerüli a görbét).</span>
            </div>
          </div>
        </div>
      ),
      figure: <LineAndCircleSvg size={240} />
    },
    {
      id: 'card-symmetric-systems',
      title: '3. Szimmetrikus Kétismeretlenes Rendszerek',
      subtitle: 'Összeg (S) és szorzat (P) szerkezete, Viète-formulák',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Egy egyenletrendszert <strong>szimmetrikusnak</strong> nevezünk, ha a változók (<code className="bg-slate-100 px-1 font-mono">x</code> és <code className="bg-slate-100 px-1 font-mono">y</code>)
            felcserélésével az egyenletek változatlanok maradnak.
          </p>

          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-sm">
            <div className="font-bold text-purple-900 mb-1">Klasszikus alapeset:</div>
            <div className="font-mono text-xs text-purple-800 space-y-0.5">
              <div>I.  x + y = S  (Összeg)</div>
              <div>II. x · y = P  (Szorzat)</div>
            </div>
            <p className="mt-2 text-xs text-purple-900">
              A <strong>Viète-formulák</strong> szerint x és y pontosan a következő másodfokú egyenlet két valós gyöke:
            </p>
            <div className="mt-1 font-mono text-center font-bold text-purple-950 bg-white p-1 rounded border border-purple-300">
              u² − S·u + P = 0
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Példa: ha <code className="font-mono">x + y = 14</code> és <code className="font-mono">x · y = 45</code>, akkor az egyenlet <code className="font-mono">u² − 14u + 45 = 0</code>, amelynek gyökei 9 és 5. Ezért a megoldáspárok: <strong>(9; 5) és (5; 9)</strong>.
          </p>
        </div>
      ),
      figure: <SymmetricSystemsSvg size={240} />
    },
    {
      id: 'card-word-chairs',
      title: '4. Szöveges Modellezés: Inverz Arányosság (Székek és Fordulók)',
      subtitle: 'Tankönyvi feladat: A szorzatok (xy) algebrai kiesése',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Gyakoriak azok a szöveges problémák, ahol egy mennyiség két ismeretlen szorzataként áll elő:
            <code className="bg-slate-100 font-mono text-pink-600 px-1">Összes = x (darab/menet) · y (menetek száma)</code>.
          </p>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2">
            <div className="font-bold text-slate-800">A tankönyvi levezetés (40. oldal):</div>
            <div>• Ha 1-gyel több széket viszünk: (x + 1)(y − 2) = xy ⟹ xy − 2x + y − 2 = xy ⟹ <strong>−2x + y = 2</strong></div>
            <div>• Ha 1-gyel kevesebb széket viszünk: (x − 1)(y + 4) = xy ⟹ xy + 4x − y − 4 = xy ⟹ <strong>4x − y = 4</strong></div>
          </div>

          <p className="text-sm">
            Bár a zárójelek felbontásakor megjelenik az <code className="font-mono">xy</code> tag, mindkét oldalon azonnal kiejtik egymást!
            Az összeadásos módszerrel: <code className="font-mono">2x = 6 ⟹ x = 3</code>, visszahelyettesítve <code className="font-mono">y = 8</code>.
            Így az összes szék száma: <strong>3 · 8 = 24 darab</strong>.
          </p>
        </div>
      ),
      figure: <ChairsAndTripsSvg size={240} />
    },
    {
      id: 'card-word-coffee',
      title: '5. Keverési és Gazdasági Rendszerek',
      subtitle: 'Kétismeretlenes mérlegek: Tömeg és Érték egyidejű egyensúlya',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Keverési, ötvözeti és pénzügyi feladatoknál a felírandó két egyenlet logikája mindig két különálló mérleget alkot:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <span className="font-bold text-amber-900 block mb-1">1. Mennyiségi mérleg</span>
              <span>A két komponens tömegének, térfogatának összege adja a kész keverék teljes mennyiségét:</span>
              <div className="font-mono font-bold text-amber-950 mt-1">x + y = Össztömeg</div>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="font-bold text-emerald-900 block mb-1">2. Érték / Hatóanyag mérleg</span>
              <span>A komponensek belső értéke (forint, gramm tiszta hatóanyag) összeadódik:</span>
              <div className="font-mono font-bold text-emerald-950 mt-1">Ár₁·x + Ár₂·y = Ár_keverék · Össztömeg</div>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Tankönyvi kávépélda: 3000 Ft-osból x kg, 4000 Ft-osból y kg, cél: 17,5 kg 3600 Ft/kg-os keverék.
            x + y = 17,5 és 3000x + 4000y = 63 000 ⟹ <strong>x = 7 kg és y = 10,5 kg</strong>.
          </p>
        </div>
      ),
      figure: <CoffeeMixtureSvg size={240} />
    },
    {
      id: 'card-word-motion',
      title: '6. Mozgásos Feladatok Változó Terepen',
      subtitle: 's = v · t, lejtők és emelkedők felcserélődése oda-vissza úton',
      content: (
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            Összetett mozgásos feladatoknál (pl. tankönyv 41. o. autós túra) a mozgás több szakaszból áll:
            emelkedőből, vízszintes fennsíkból és lejtőből.
          </p>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-1">
            <span className="font-bold text-blue-900 block mb-1">Kulcsfontosságú fizikai-matematikai összefüggés:</span>
            <div>Minden szakaszra: <code className="font-mono font-bold">t = s / v</code> (az idők összeadódnak).</div>
            <div>A visszaúton az <strong>emelkedőből lejtő</strong> lesz (nagyobb sebesség), a <strong>lejtőből emelkedő</strong> (kisebb sebesség)!</div>
          </div>

          <p className="text-xs text-slate-600">
            Ez kétismeretlenes lineáris törtes egyenletrendszert ad s₁-re és s₂-re, amely az idők összegével pontosan megoldható.
          </p>
        </div>
      ),
      figure: <ElevationMotionSvg size={240} />
    }
  ];

  return (
    <TheoryTemplate
      title="3. Egyenletrendszerek – Elmélet és Modellezés"
      subtitle="Háromismeretlenes lineáris, másodfokú rendszerek és valós életszerű szöveges modellek"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 9. LECKE"
      themeColor="purple"
      pdfFilename="10_osztaly_egyenletrendszerek_3_osszetett.pdf"
      ruleTitle="Összetett és másodfokú rendszerek alapelve"
      ruleFormula="Mindig az elsőfokú egyenletből fejezzük ki az egyik ismeretlent, és írjuk be a másodfokúba: így egyismeretlenes másodfokú egyenlethez jutunk!"
      practiceTitle="Készen állsz az összetett feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben és a logikai feladatokban!"
      cards={theoryCards}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      interactiveSection={
        <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 space-y-6">
          {/* Fejléc és diszkrimináns állapotjelző */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-indigo-500/20 text-indigo-400 rounded-lg">
                  <Calculator className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  Dinamikus Interaktív Labor: Parabola és Egyenes Kölcsönös Helyzete
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Mozgasd a csúszkákat, és figyeld a koordinátarendszerben valós időben elmozduló görbéket és a metszéspontokat!
              </p>
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                solutionStatus === 'two'
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : solutionStatus === 'one'
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                  : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
              }`}
            >
              {solutionInfo}
            </div>
          </div>

          {/* Gyorsbeállítási minták (Presets) */}
          <div className="flex flex-wrap items-center gap-2 pb-2">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 mr-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Minták:
            </span>
            <button
              type="button"
              onClick={() => applyPreset('secant')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center gap-1"
            >
              <Target className="w-3 h-3 text-emerald-400" /> Szelő (2 pont)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('tangent')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-500/50 transition-all flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" /> Érintő (1 pont)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('miss')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-rose-300 border border-slate-700 hover:border-rose-500/50 transition-all flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3 text-rose-400" /> Kitérő (0 pont)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('downward')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 hover:border-purple-500/50 transition-all flex items-center gap-1"
            >
              <TrendingUp className="w-3 h-3 text-purple-400 rotate-180" /> Lefelé nyíló (a = -1)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('shifted')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center gap-1"
            >
              <Move className="w-3 h-3 text-cyan-400" /> Eltolt parabola
            </button>
          </div>

          {/* Fő szimulációs elrendezés: Bal oldal csúszkák, jobb oldal koordinátarendszer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Bal oldali vezérlőpult (5 csúszka + irányváltó) */}
            <div className="lg:col-span-5 space-y-4">
              {/* 1. Kártya: Parabola paraméterei */}
              <div className="p-4 bg-slate-800/80 rounded-xl border border-purple-500/30 space-y-3.5">
                <div className="flex items-center justify-between pb-1 border-b border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                    <span className="text-xs font-bold text-purple-200 uppercase tracking-wider">
                      Parabola: y = a(x − u)² + v
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setParabolaA(-parabolaA)}
                    title="Parabola megfordítása függőlegesen"
                    className="text-[11px] px-2 py-0.5 rounded bg-purple-900/50 hover:bg-purple-800 text-purple-300 border border-purple-700 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> ± Irányváltás
                  </button>
                </div>

                {/* 1. csúszka: a (nyílás és irány) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Nyílás iránya és szélessége (a):</span>
                    <span className="font-mono text-purple-300 font-bold">
                      {effectiveA > 0 ? `+${effectiveA}` : effectiveA}
                      <span className="text-[10px] text-slate-400 font-normal ml-1">
                        ({effectiveA > 0 ? 'Felfelé' : 'Lefelé'} {Math.abs(effectiveA) > 1 ? ', szűk' : Math.abs(effectiveA) < 1 ? ', tág' : ''})
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="2"
                    step="0.25"
                    value={parabolaA}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setParabolaA(val === 0 ? 0.25 : val);
                    }}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>

                {/* 2. csúszka: u (vízszintes eltolás) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Csúcspont vízszintes helye (u):</span>
                    <span className="font-mono text-purple-300 font-bold">{parabolaU}</span>
                  </div>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    step="0.5"
                    value={parabolaU}
                    onChange={(e) => setParabolaU(parseFloat(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>

                {/* 3. csúszka: v (függőleges eltolás) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Csúcspont függőleges helye (v):</span>
                    <span className="font-mono text-purple-300 font-bold">{parabolaV}</span>
                  </div>
                  <input
                    type="range"
                    min="-4"
                    max="5"
                    step="0.5"
                    value={parabolaV}
                    onChange={(e) => setParabolaV(parseFloat(e.target.value))}
                    className="w-full accent-purple-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* 2. Kártya: Egyenes paraméterei */}
              <div className="p-4 bg-slate-800/80 rounded-xl border border-cyan-500/30 space-y-3.5">
                <div className="flex items-center gap-2 pb-1 border-b border-slate-700/60">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <span className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
                    Egyenes: y = mx + c
                  </span>
                </div>

                {/* 4. csúszka: m (meredekség) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Meredekség (m):</span>
                    <span className="font-mono text-cyan-300 font-bold">{slopeM}</span>
                  </div>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.5"
                    value={slopeM}
                    onChange={(e) => setSlopeM(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* 5. csúszka: c (eltolás) */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Tengelymetszet (c):</span>
                    <span className="font-mono text-cyan-300 font-bold">{constC}</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.5"
                    value={constC}
                    onChange={(e) => setConstC(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Jobb oldali Dinamikus Koordinátarendszer SVG */}
            <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-700 p-3 flex flex-col items-center shadow-inner relative overflow-hidden">
              <svg
                viewBox="0 0 520 340"
                className="w-full h-auto max-h-[380px] select-none"
              >
                {/* Rácsvonalak */}
                <g stroke="#334155" strokeWidth="0.7" strokeDasharray="2,2" opacity="0.6">
                  {[-10, -8, -6, -4, -2, 2, 4, 6, 8, 10].map((x) => (
                    <line key={`gx-${x}`} x1={toSvgX(x)} y1="15" x2={toSvgX(x)} y2="325" />
                  ))}
                  {[-6, -4, -2, 2, 4, 6].map((y) => (
                    <line key={`gy-${y}`} x1="15" y1={toSvgY(y)} x2="505" y2={toSvgY(y)} />
                  ))}
                </g>

                {/* Főtengelyek */}
                <line x1="15" y1={originY} x2="505" y2={originY} stroke="#64748b" strokeWidth="1.8" />
                <line x1={originX} y1="325" x2={originX} y2="15" stroke="#64748b" strokeWidth="1.8" />
                <polygon points="508,180 500,176 500,184" fill="#64748b" />
                <polygon points="260,12 256,20 264,20" fill="#64748b" />
                <text x="502" y="172" fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
                <text x="268" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold">y</text>
                <text x="250" y="194" fill="#64748b" fontSize="9" fontFamily="monospace">0</text>

                {/* Tengelyosztások */}
                {[-10, -8, -6, -4, -2, 2, 4, 6, 8, 10].map((x) => (
                  <text key={`tx-${x}`} x={toSvgX(x)} y={originY + 14} fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    {x}
                  </text>
                ))}
                {[-6, -4, -2, 2, 4, 6].map((y) => (
                  <text key={`ty-${y}`} x={originX - 8} y={toSvgY(y) + 3} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace">
                    {y}
                  </text>
                ))}

                {/* Dinamikus Parabola ív */}
                {parabolaSvgPath && (
                  <path d={parabolaSvgPath} fill="none" stroke="#c084fc" strokeWidth="3" strokeLinecap="round" />
                )}

                {/* Parabola csúcspont (C) */}
                <g transform={`translate(${toSvgX(parabolaU)}, ${toSvgY(parabolaV)})`}>
                  <polygon points="0,-5 5,0 0,5 -5,0" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="7" y="-12" width="54" height="15" rx="3" fill="rgba(15, 23, 42, 0.85)" stroke="#a855f7" strokeWidth="0.8" />
                  <text x="34" y="-1" fill="#e9d5ff" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    C({parabolaU}; {parabolaV})
                  </text>
                </g>

                {/* Dinamikus Egyenes */}
                <line
                  x1={toSvgX(lineX1)}
                  y1={toSvgY(lineY1)}
                  x2={toSvgX(lineX2)}
                  y2={toSvgY(lineY2)}
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Metszéspontok vagy érintési pont megjelenítése */}
                {solX1 !== null && solY1 !== null && (
                  <g>
                    {/* Vetítővonalak P1 */}
                    <line x1={toSvgX(solX1)} y1={originY} x2={toSvgX(solX1)} y2={toSvgY(solY1)} stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1={originX} y1={toSvgY(solY1)} x2={toSvgX(solX1)} y2={toSvgY(solY1)} stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />

                    {/* P1 pont */}
                    <circle cx={toSvgX(solX1)} cy={toSvgY(solY1)} r="8" fill="#ef4444" opacity="0.3" className="animate-ping" />
                    <circle cx={toSvgX(solX1)} cy={toSvgY(solY1)} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                    <rect
                      x={toSvgX(solX1) + (solX1 >= 0 ? 8 : -72)}
                      y={toSvgY(solY1) - 10}
                      width="64"
                      height="18"
                      rx="4"
                      fill="rgba(15, 23, 42, 0.9)"
                      stroke="#ef4444"
                      strokeWidth="1.2"
                    />
                    <text
                      x={toSvgX(solX1) + (solX1 >= 0 ? 40 : -40)}
                      y={toSvgY(solY1) + 3}
                      fill="#fca5a5"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      P₁({solX1.toFixed(1)}; {solY1.toFixed(1)})
                    </text>
                  </g>
                )}

                {solX2 !== null && solY2 !== null && Math.abs(solX1! - solX2) > 0.001 && (
                  <g>
                    {/* Vetítővonalak P2 */}
                    <line x1={toSvgX(solX2)} y1={originY} x2={toSvgX(solX2)} y2={toSvgY(solY2)} stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1={originX} y1={toSvgY(solY2)} x2={toSvgX(solX2)} y2={toSvgY(solY2)} stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />

                    {/* P2 pont */}
                    <circle cx={toSvgX(solX2)} cy={toSvgY(solY2)} r="8" fill="#ef4444" opacity="0.3" className="animate-ping" />
                    <circle cx={toSvgX(solX2)} cy={toSvgY(solY2)} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                    <rect
                      x={toSvgX(solX2) + (solX2 >= 0 ? 8 : -72)}
                      y={toSvgY(solY2) - 10}
                      width="64"
                      height="18"
                      rx="4"
                      fill="rgba(15, 23, 42, 0.9)"
                      stroke="#ef4444"
                      strokeWidth="1.2"
                    />
                    <text
                      x={toSvgX(solX2) + (solX2 >= 0 ? 40 : -40)}
                      y={toSvgY(solY2) + 3}
                      fill="#fca5a5"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      P₂({solX2.toFixed(1)}; {solY2.toFixed(1)})
                    </text>
                  </g>
                )}

                {/* Ha nincs metszéspont (D < 0) */}
                {solutionStatus === 'none' && (
                  <g transform="translate(260, 50)">
                    <rect x="-120" y="-12" width="240" height="24" rx="6" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="1" />
                    <text x="0" y="4" fill="#fda4af" fontSize="10.5" fontWeight="bold" textAnchor="middle">
                      D &lt; 0 ⟹ Nincs valós metszéspont (Kitérő)
                    </text>
                  </g>
                )}

                {/* Jelmagyarázat */}
                <g transform="translate(18, 22)">
                  <rect width="115" height="48" rx="5" fill="rgba(15, 23, 42, 0.85)" stroke="#334155" strokeWidth="0.8" />
                  <line x1="8" y1="14" x2="24" y2="14" stroke="#c084fc" strokeWidth="2.5" />
                  <text x="30" y="17" fill="#e9d5ff" fontSize="9" fontWeight="bold">Parabola</text>
                  <line x1="8" y1="32" x2="24" y2="32" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="30" y="35" fill="#bae6fd" fontSize="9" fontWeight="bold">Egyenes</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Eredmény dobozok: Algebrai alak és koordináták */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Egyenletrendszer algebrai alakja:
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-purple-300">
                  I. y = {effectiveA === 1 ? '' : effectiveA === -1 ? '−' : `${effectiveA} · `}
                  (x {parabolaU >= 0 ? `− ${parabolaU}` : `+ ${Math.abs(parabolaU)}`})² {parabolaV >= 0 ? `+ ${parabolaV}` : `− ${Math.abs(parabolaV)}`}
                </div>
                <div className="text-cyan-300">
                  II. y = {slopeM}x {constC >= 0 ? `+ ${constC}` : `− ${Math.abs(constC)}`}
                </div>
              </div>
              <div className="text-xs text-slate-300 pt-1 font-mono border-t border-slate-700/50 mt-1">
                Közös egyenlet: {aCoeff !== 1 ? `${aCoeff}x²` : 'x²'}{' '}
                {bCoeff >= 0 ? `+ ${bCoeff.toFixed(2)}x` : `− ${Math.abs(bCoeff).toFixed(2)}x`}{' '}
                {cCoeff >= 0 ? `+ ${cCoeff.toFixed(2)}` : `− ${Math.abs(cCoeff).toFixed(2)}`} = 0
              </div>
              <div className="text-[11px] text-amber-300 font-mono">
                Diszkrimináns: D = ({bCoeff.toFixed(2)})² − 4·({aCoeff})·({cCoeff.toFixed(2)}) = {discriminant.toFixed(2)}
              </div>
            </div>

            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Metszéspontok koordinátái:
              </div>
              {solutionStatus === 'two' && solX1 !== null && solX2 !== null && solY1 !== null && solY2 !== null ? (
                <div className="space-y-1.5 font-mono text-sm">
                  <div className="text-emerald-400 font-bold">
                    P₁ = ({solX1.toFixed(2)}; {solY1.toFixed(2)})
                  </div>
                  <div className="text-emerald-400 font-bold">
                    P₂ = ({solX2.toFixed(2)}; {solY2.toFixed(2)})
                  </div>
                  <div className="text-xs text-slate-400 pt-1">
                    A diszkrimináns pozitív (D &gt; 0), így az egyenes két pontban metszi a parabolát (szelő).
                  </div>
                </div>
              ) : solutionStatus === 'one' && solX1 !== null && solY1 !== null ? (
                <div className="space-y-1.5 font-mono text-sm">
                  <div className="text-amber-400 font-bold">
                    Érintési pont: P₁ = ({solX1.toFixed(2)}; {solY1.toFixed(2)})
                  </div>
                  <div className="text-xs text-slate-400 pt-1">
                    A diszkrimináns nulla (D = 0), a másodfokú egyenletnek egyetlen valós gyöke van: az egyenes érinti a parabolát.
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5 text-sm">
                  <div className="text-rose-400 font-bold">
                    Nincs valós metszéspont! (∅)
                  </div>
                  <div className="text-xs text-slate-400 pt-1 leading-relaxed">
                    A diszkrimináns negatív (D = {discriminant.toFixed(2)} &lt; 0), ezért a másodfokú egyenletnek nincs valós megoldása. Az egyenes elhalad a parabola mellett (kitérő).
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      }
      tips={[
        {
          title: '3-ismeretlenes rendszereknél a szisztematikusság a kulcs!',
          content: 'Sose próbáld mindhárom egyenletet egyszerre össze-vissza kombinálni. Mindig rögzítsd: "Először kiejtem a z-t az I. és II-ből, majd az I. és III-ból!" Így garantáltan kétismeretlenes rendszerhez jutsz hiba nélkül.'
        },
        {
          title: 'Másodfokú rendszereknél ellenőrizd az összes megoldáspárt!',
          content: 'Ha a másodfokú egyenletből két x értéket (x₁ és x₂) kapsz, mindkettőhöz külön-külön ki kell számolni a hozzá tartozó y₁ és y₂ értéket. A megoldás rendezett számpárok halmaza: {(x₁; y₁), (x₂; y₂)}.'
        },
        {
          title: 'Szöveges feladatoknál a szövegkörnyezet a végső szűrő!',
          content: 'Negatív vagy tört eredmény embereknél, székeknél, állatoknál fizikai képtelenség. A kapott algebrai gyököket mindig vesd össze a feladat reális kikötéseivel!'
        }
      ]}
    />
  );
};

