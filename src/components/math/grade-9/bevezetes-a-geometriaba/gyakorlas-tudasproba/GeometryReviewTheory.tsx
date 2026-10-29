import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Triangle,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Compass,
  Circle,
  HelpCircle,
  Award,
  Layers,
  Calculator,
  BookmarkCheck
} from 'lucide-react';
import {
  ComprehensiveGeometryOverviewSVG,
  PythagorasAndSpecialTrianglesSVG,
  ThalesAndTangentsSummarySVG,
  TriangleAreaMasterFormulasSVG
} from './GeometryReviewFigures';

interface GeometryReviewTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const GeometryReviewTheory: React.FC<GeometryReviewTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV ÁTFOGÓ GEOMETRIA LABOR ÁLLAPOTOK ---
  const [sideA, setSideA] = useState<number>(13);
  const [sideB, setSideB] = useState<number>(14);
  const [sideC, setSideC] = useState<number>(15);

  // Előre beállított minták
  const applyPreset = (a: number, b: number, c: number) => {
    setSideA(a);
    setSideB(b);
    setSideC(c);
  };

  // Dinamikus számítások
  const stats = useMemo(() => {
    const a = sideA;
    const b = sideB;
    const c = sideC;

    const isValidTriangle = a + b > c && a + c > b && b + c > a;

    if (!isValidTriangle) {
      return {
        isValid: false,
        error: 'A háromszög-egyenlőtlenség sérül: bármely két oldal összege szigorúan nagyobb kell legyen a harmadiknál!'
      };
    }

    const perimeter = a + b + c;
    const s = perimeter / 2;
    const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));

    const ha = area > 0 ? (2 * area) / a : 0;
    const hb = area > 0 ? (2 * area) / b : 0;
    const hc = area > 0 ? (2 * area) / c : 0;

    const r = area > 0 && s > 0 ? area / s : 0;
    const R = area > 0 ? (a * b * c) / (4 * area) : 0;

    // Szögek koszinusztétellel (fokban)
    const cosA = Math.max(-1, Math.min(1, (b * b + c * c - a * a) / (2 * b * c)));
    const cosB = Math.max(-1, Math.min(1, (a * a + c * c - b * b) / (2 * a * c)));
    const cosC = Math.max(-1, Math.min(1, (a * a + b * b - c * c) / (2 * a * b)));

    const alpha = (Math.acos(cosA) * 180) / Math.PI;
    const beta = (Math.acos(cosB) * 180) / Math.PI;
    const gamma = (Math.acos(cosC) * 180) / Math.PI;

    // Típusmeghatározás
    const sidesSorted = [a, b, c].sort((x, y) => x - y);
    const [s1, s2, s3] = sidesSorted;
    const diff = Math.abs(s1 * s1 + s2 * s2 - s3 * s3);

    let angleType = 'Hegyesszögű';
    if (diff < 0.001) {
      angleType = 'Derékszögű (Pitagoraszi)';
    } else if (s1 * s1 + s2 * s2 < s3 * s3) {
      angleType = 'Tompaszögű';
    }

    let symmetryType = 'Általános (különböző oldalú)';
    if (Math.abs(a - b) < 0.001 && Math.abs(b - c) < 0.001) {
      symmetryType = 'Szabályos (egyenlő oldalú)';
    } else if (
      Math.abs(a - b) < 0.001 ||
      Math.abs(b - c) < 0.001 ||
      Math.abs(a - c) < 0.001
    ) {
      symmetryType = 'Egyenlő szárú';
    }

    return {
      isValid: true,
      perimeter,
      s,
      area,
      ha,
      hb,
      hc,
      r,
      R,
      alpha,
      beta,
      gamma,
      angleType,
      symmetryType
    };
  }, [sideA, sideB, sideC]);

  return (
    <TheoryTemplate
      title="13. Gyakorlás, tudáspróba"
      subtitle="A IV. Bevezetés a geometriába fejezet átfogó összefoglalása, képlettára és érettségi felkészítője"
      themeColor="red"
      badgeText="9. OSZTÁLY • IV. GEOMETRIA • TUDÁSPRÓBA ÖSSZEFOGLALÓ"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: 'A Fejezet Legfontosabb Törvényszerűségei Egy Pillantásra',
        points: [
          'Háromszög-egyenlőtlenség: a + b > c (a két kisebb oldal összege nagyobb a leghosszabbnál).',
          'Szögek: Belső szögek összege 180°, külső szögek összege 360°. Külső szög = két nem mellette fekvő belső összege.',
          'Pitagorasz-tétel: a² + b² = c² (kizárólag derékszögű háromszögre). Megfordítás: ha a² + b² = c², akkor derékszögű.',
          'Különleges háromszögek: 30°-60°-90° (oldalai a, a√3, 2a) és 45°-45°-90° (oldalai a, a, a√2).',
          'Nevezetes pontok: O (körülírt kör kp.), I (beírt kör kp.), M (magasságpont), S (súlypont, 2:1 arányban oszt).',
          'Euler-egyenes: M, S, O egy egyenesen fekszik, és MS : SO = 2 : 1.',
          'Thalész-tétel: A kör átmérőjének bármely kerületi pontjából 90°-os szög alatt látszik az átmérő.',
          'Területképletek: T = (a · m_a)/2 = (a · b)/2 (derékszögű) = (a²√3)/4 (szabályos) = √[s(s-a)(s-b)(s-c)] = r · s = abc / (4R).'
        ]
      }}
    >
      {/* 1. RÉSZ: Szögek, távolságok és alapidomok */}
      <TheorySection
        title="1. Szögek, Távolságok és Geometriai Alapfogalmak"
        subtitle="Szögpárok, háromszög belső és külső szögei, valamint a mértani helyek"
        icon={<Compass className="w-6 h-6 text-red-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Szögek és Szögpárok Kapcsolatai"
            icon={<Sparkles className="w-5 h-5 text-red-500" />}
          >
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Csúcsszögek:</strong> Két egyenes metszésekor keletkező szemközti szögek <strong>mindig egyenlők</strong> (α = α').
              </li>
              <li>
                <strong>Mellékszögek:</strong> Egy egyenes egy pontjából kiinduló két egymás melletti szög összege <strong>180°</strong> (α + β = 180°).
              </li>
              <li>
                <strong>Párhuzamos szárú szögek:</strong>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-xs text-slate-600">
                  <li><strong>Egyállású és váltószögek:</strong> egyenlő nagyságúak (pl. Z-alak és F-alak).</li>
                  <li><strong>Társszögek:</strong> összegük 180° (pl. U-alak).</li>
                </ul>
              </li>
              <li>
                <strong>Merőleges szárú szögek:</strong> vagy egyenlő nagyságúak, vagy összegük 180°.
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="A Háromszög Szögtételei és Egyenlőtlensége"
            icon={<Triangle className="w-5 h-5 text-red-500" />}
          >
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Belső szögek összege:</strong> Bármely síkbeli háromszögben:
                <div className="bg-red-50 text-red-900 font-bold px-3 py-1.5 rounded-lg text-center my-1">
                  α + β + γ = 180°
                </div>
              </li>
              <li>
                <strong>Külső szög tétele:</strong> Egy külső szög egyenlő a két nem mellette fekvő belső szög összegével:
                <div className="bg-slate-100 text-slate-800 font-mono text-xs px-2 py-1 rounded text-center my-1">
                  α' = β + γ, &nbsp; β' = α + γ, &nbsp; γ' = α + β
                </div>
              </li>
              <li>
                <strong>Külső szögek összege:</strong> Bármely konvex sokszögben (így háromszögben is) <strong>360°</strong>.
              </li>
              <li>
                <strong>Háromszög-egyenlőtlenség:</strong> Csak akkor szerkeszthető háromszög, ha a két rövidebb oldal összege nagyobb a harmadiknál:
                <span className="font-bold text-red-700"> a + b &gt; c</span>.
              </li>
            </ul>
          </TheoryCard>
        </div>

        <TheoryCallout
          title="Alapvető Mértani Helyek a Síkon"
          icon={<Compass className="w-5 h-5 text-red-600" />}
          variant="red"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700 mt-1">
            <div className="bg-white p-2.5 rounded-lg border border-red-200">
              <strong className="text-red-900 block mb-1">1. Szakaszfelező merőleges:</strong>
              A sík azon pontjainak halmaza, amelyek a szakasz két végpontjától (A és B) egyenlő távolságra vannak.
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-red-200">
              <strong className="text-red-900 block mb-1">2. Szögfelező:</strong>
              A szögtartomány azon pontjainak halmaza, amelyek a szög két szárától (egyenesétől) egyenlő távolságra fekszenek.
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-red-200">
              <strong className="text-red-900 block mb-1">3. Körvonal:</strong>
              A sík azon pontjainak halmaza, amelyek egy adott O ponttól r rögzített távolságra vannak.
            </div>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 2. RÉSZ: Pitagorasz és különleges derékszögű háromszögek */}
      <TheorySection
        title="2. A Pitagorasz-tétel és Különleges Derékszögű Háromszögek"
        subtitle="Derékszögű összefüggések, magasságtétel, valamint a 30-60-90 és 45-45-90 arányai"
        icon={<Layers className="w-6 h-6 text-red-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A Pitagorasz-tétel és Megfordítása"
            icon={<BookmarkCheck className="w-5 h-5 text-red-500" />}
          >
            <div className="space-y-2 text-sm text-slate-700">
              <p>
                <strong>Tétel:</strong> Bármely derékszögű háromszögben a két befogó négyzetének összege egyenlő az átfogó négyzetével:
              </p>
              <div className="bg-red-100 text-red-950 font-bold text-center py-2 rounded-lg text-base">
                a² + b² = c²
              </div>
              <p>
                <strong>Átfogó és befogók kifejezése:</strong>
                <br />
                c = √(a² + b²), &nbsp; a = √(c² - b²), &nbsp; b = √(c² - a²).
              </p>
              <p>
                <strong>A tétel megfordítása:</strong> Ha egy háromszög három oldalára fennáll, hogy a² + b² = c², akkor a háromszög <strong>garantáltan derékszögű</strong>, és a c oldal a derékszöggel szemközti átfogó!
              </p>
              <p className="text-xs text-slate-600">
                <strong>Pitagoraszi számhármasok:</strong> (3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25), (20, 21, 29).
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Különleges Derékszögű Háromszögek"
            icon={<PythagorasAndSpecialTrianglesSVG size={180} className="mx-auto" />}
          >
            <div className="space-y-2 text-xs text-slate-700 mt-2">
              <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <strong className="text-blue-900 block">30° - 60° - 90° Háromszög (Szabályos háromszög fele):</strong>
                Oldalak aránya: <span className="font-bold text-blue-800">a : a√3 : 2a</span>.
                <br />
                A 30°-os szöggel szemközti befogó pontosan <strong>fele az átfogónak</strong> (a = c/2)!
                A hosszabb befogó: b = a√3.
              </div>
              <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                <strong className="text-red-900 block">45° - 45° - 90° Háromszög (Négyzet fele):</strong>
                Oldalak aránya: <span className="font-bold text-red-800">a : a : a√2</span>.
                <br />
                A két befogó egyenlő (egyenlő szárú derékszögű). Az átfogó: c = a√2 (a négyzet átlója).
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout
          title="Derékszögű Háromszög Tételpárja: Magasság- és Befogótétel"
          icon={<Lightbulb className="w-5 h-5 text-amber-600" />}
          variant="amber"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <strong className="text-amber-900 block mb-1">Magasságtétel (m_c² = p · q):</strong>
              Az átfogóhoz tartozó magasság mértani közepe az átfogó két szeletének:
              <br />
              <span className="font-bold font-mono text-sm text-amber-800">m_c = √(p · q)</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-200">
              <strong className="text-amber-900 block mb-1">Befogótétel (a² = c · p,  b² = c · q):</strong>
              Bármelyik befogó mértani közepe a teljes átfogónak és a befogó átfogóra eső merőleges vetületének:
              <br />
              <span className="font-bold font-mono text-sm text-amber-800">a = √(c · p), &nbsp; b = √(c · q)</span>
            </div>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 3. RÉSZ: Nevezetes vonalak, pontok és a Thalész-tétel */}
      <TheorySection
        title="3. Nevezetes Vonalak, Pontok és a Thalész-tétel"
        subtitle="O, I, M, S elhelyezkedése, az Euler-egyenes és az érintőszerkesztések"
        icon={<ComprehensiveGeometryOverviewSVG size={180} className="mx-auto" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A Négy Nevezetes Pont és Euler-egyenes"
            icon={<Sparkles className="w-5 h-5 text-red-500" />}
          >
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">O</span>
                <div>
                  <strong>Körülírt kör középpontja:</strong> Oldalfelező merőlegesek metszéspontja. Hegyesszögűnél belül, derékszögűnél az <strong>átfogó felezőpontja</strong>, tompaszögűnél a háromszögön <strong>kívül</strong> van.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">I</span>
                <div>
                  <strong>Beírt kör középpontja:</strong> Belső szögfelezők metszéspontja. <strong>MINDIG a háromszög belsejében</strong> helyezkedik el!
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">M</span>
                <div>
                  <strong>Magasságpont:</strong> Magasságvonalak metszéspontja. Hegyesszögűnél belül, derékszögűnél a <strong>derékszögű csúcsban</strong>, tompaszögűnél kívül található.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded">S</span>
                <div>
                  <strong>Súlypont:</strong> Súlyvonalak metszéspontja. Mindig belül van, és a súlyvonalakat <strong>2 : 1 arányban osztja</strong> (a csúcstól mért szakasz a kétszerese az oldalfelező felé esőnek).
                </div>
              </div>
              <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 mt-2">
                <strong>Euler-egyenes:</strong> Nem szabályos háromszögben M, S és O egy egyenesen fekszik, és <strong>MS : SO = 2 : 1</strong>! Szabályos háromszögben e négy pont egybeesik!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Thalész Tétele és Érintőszerkesztések"
            icon={<ThalesAndTangentsSummarySVG size={180} className="mx-auto" />}
          >
            <div className="space-y-2 text-xs text-slate-700 mt-2">
              <p>
                <strong>Thalész-tétel:</strong> Ha egy kör AB átmérőjének két végpontját összekötjük a körvonal bármely más C pontjával, az ACB szög garantáltan <strong>90°-os derékszög</strong> lesz!
              </p>
              <p>
                <strong>Thalész-tétel megfordítása:</strong> Bármely derékszögű háromszög átfogója mint átmérő fölé rajzolt kör átmegy a harmadik csúcson (az átfogóhoz tartozó súlyvonal hossza = c/2 = R).
              </p>
              <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                <strong className="text-red-900 block mb-1">Érintőszerkesztés külső P pontból:</strong>
                1. Összekötjük a kör O középpontját a külső P ponttal (OP szakasz).
                <br />
                2. Megkeressük OP F felezőpontját.
                <br />
                3. F középponttal, F-O sugárral megrajzoljuk a Thalész-kört.
                <br />
                4. A két kör metszéspontjai lesznek az E₁ és E₂ érintési pontok (ahol OE ⊥ PE).
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. RÉSZ: Kerület- és területképletek rendszere */}
      <TheorySection
        title="4. Kerület- és Területképletek Átfogó Rendszere"
        subtitle="Alap-magasság, derékszögű, szabályos, Hérón-képlet és a beírt/körülírt sugarak kapcsolata"
        icon={<TriangleAreaMasterFormulasSVG size={180} className="mx-auto" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Alapvető Területképletek"
            icon={<Calculator className="w-5 h-5 text-red-500" />}
          >
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <strong className="text-slate-900 block text-sm mb-1">1. Alap és magasság szorzata:</strong>
                <span className="font-bold text-red-700 text-sm">T = (a · m_a) / 2 = (b · m_b) / 2 = (c · m_c) / 2</span>
                <p className="mt-1 text-slate-600">Magasság kifejezése: m_a = (2T) / a.</p>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <strong className="text-slate-900 block text-sm mb-1">2. Derékszögű háromszög:</strong>
                <span className="font-bold text-red-700 text-sm">T = (a · b) / 2</span>
                <p className="mt-1 text-slate-600">A két befogó szorzatának fele. Átfogóhoz tartozó magasság: m_c = (a · b) / c.</p>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                <strong className="text-slate-900 block text-sm mb-1">3. Szabályos háromszög (a oldal):</strong>
                <span className="font-bold text-red-700 text-sm">T = (a² · √3) / 4</span>
                <p className="mt-1 text-slate-600">Magasság: m = (a · √3) / 2. Beírt kör: r = m/3. Körülírt kör: R = 2m/3.</p>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Hérón-képlet és a Nevezetes Sugarak"
            icon={<Circle className="w-5 h-5 text-red-500" />}
          >
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                <strong className="text-amber-950 block text-sm mb-1">Hérón-képlet (három oldal ismeretében):</strong>
                <p>Félkerület: <strong>s = (a + b + c) / 2</strong></p>
                <div className="bg-white text-amber-900 font-bold p-1.5 rounded border border-amber-300 text-center my-1 text-sm">
                  T = √[ s · (s - a) · (s - b) · (s - c) ]
                </div>
                <p className="text-slate-600">Nem igényel magasságot vagy szöget, tetszőleges háromszögre működik!</p>
              </div>

              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg">
                <strong className="text-purple-950 block text-sm mb-1">Sugaras Területképletek:</strong>
                <ul className="space-y-1.5">
                  <li>
                    <strong>Beírt kör sugara:</strong> T = r · s &nbsp;⇒&nbsp; <span className="font-bold text-purple-700">r = T / s</span>
                  </li>
                  <li>
                    <strong>Körülírt kör sugara:</strong> T = (a · b · c) / (4R) &nbsp;⇒&nbsp; <span className="font-bold text-purple-700">R = (abc) / (4T)</span>
                  </li>
                  <li>
                    <strong>Derékszögű speciális sugarai:</strong> R = c / 2 &nbsp;és&nbsp; r = (a + b - c) / 2.
                  </li>
                </ul>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. RÉSZ: Interaktív Átfogó Geometria & Képlettár Labor */}
      <TheorySection
        title="5. Interaktív Átfogó Geometria & Képlettár Labor"
        subtitle="Állítsd be a három oldal hosszát, és figyeld meg az összes összefüggést, sugarat és magasságot élőben!"
        icon={<Sliders className="w-6 h-6 text-red-600" />}
      >
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          {/* Gyors sablon gombok */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Gyors minta választása:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyPreset(3, 4, 5)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-100 hover:bg-red-200 text-red-800 transition"
              >
                Pitagoraszi (3 - 4 - 5)
              </button>
              <button
                onClick={() => applyPreset(5, 12, 13)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-800 transition"
              >
                Nagy Pitagoraszi (5 - 12 - 13)
              </button>
              <button
                onClick={() => applyPreset(6, 6, 6)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition"
              >
                Szabályos (6 - 6 - 6)
              </button>
              <button
                onClick={() => applyPreset(10, 10, 12)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-800 transition"
              >
                Egyenlő szárú (10 - 10 - 12)
              </button>
              <button
                onClick={() => applyPreset(13, 14, 15)}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 transition"
              >
                Hérón-klasszikus (13 - 14 - 15)
              </button>
            </div>
          </div>

          {/* Csúszkák */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-700 text-sm">"a" oldal:</span>
                <span className="font-mono font-bold text-red-600 text-base">{sideA} cm</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={sideA}
                onChange={(e) => setSideA(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-700 text-sm">"b" oldal:</span>
                <span className="font-mono font-bold text-red-600 text-base">{sideB} cm</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={sideB}
                onChange={(e) => setSideB(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-700 text-sm">"c" oldal:</span>
                <span className="font-mono font-bold text-red-600 text-base">{sideC} cm</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={sideC}
                onChange={(e) => setSideC(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Élő elemzés eredménydoboz */}
          {stats.isValid ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <div className="text-xs text-slate-500 font-medium">Kerület (K) és s</div>
                <div className="text-lg font-bold text-slate-800">
                  K = {stats.perimeter} cm
                </div>
                <div className="text-xs text-slate-500">
                  s = {stats.s} cm
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-red-200 text-center">
                <div className="text-xs text-red-600 font-medium">Terület (T)</div>
                <div className="text-lg font-bold text-red-700">
                  {stats.area.toFixed(2)} cm²
                </div>
                <div className="text-xs text-slate-500">
                  Hérón-képlettel
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center">
                <div className="text-xs text-emerald-600 font-medium">Beírt kör sugara (r)</div>
                <div className="text-lg font-bold text-emerald-700">
                  r = {stats.r.toFixed(2)} cm
                </div>
                <div className="text-xs text-slate-500">
                  r = T / s
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-blue-200 text-center">
                <div className="text-xs text-blue-600 font-medium">Körülírt kör sugara (R)</div>
                <div className="text-lg font-bold text-blue-700">
                  R = {stats.R.toFixed(2)} cm
                </div>
                <div className="text-xs text-slate-500">
                  R = abc / 4T
                </div>
              </div>

              {/* További adatok kártya */}
              <div className="col-span-2 md:col-span-4 bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-600">Háromszög besorolása:</span>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      {stats.angleType}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-900 border border-indigo-300">
                      {stats.symmetryType}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs text-slate-700">
                  <div>
                    <span className="font-bold text-slate-800">Magasságok:</span>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5 font-mono text-slate-600">
                      <li>m_a = {stats.ha.toFixed(2)} cm</li>
                      <li>m_b = {stats.hb.toFixed(2)} cm</li>
                      <li>m_c = {stats.hc.toFixed(2)} cm</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">Belső szögek (közelítőleg):</span>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5 font-mono text-slate-600">
                      <li>α ≈ {stats.alpha.toFixed(1)}°</li>
                      <li>β ≈ {stats.beta.toFixed(1)}°</li>
                      <li>γ ≈ {stats.gamma.toFixed(1)}°</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-100 border border-red-300 rounded-xl text-red-900 text-sm flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 flex-shrink-0 text-red-600" />
              <span>{stats.error}</span>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 6. RÉSZ: Tipikus csapdák és hibák */}
      <TheoryTrapBox
        traps={[
          {
            trap: 'Pitagorasz-tétel alkalmazása nem derékszögű háromszögre',
            explanation: 'Az a² + b² = c² képlet kizárólag és egyedül derékszögű háromszögekre érvényes! Tompaszögű háromszögben a leghosszabb oldal négyzete nagyobb (c² > a² + b²), hegyesszögűben kisebb (c² < a² + b²).'
          },
          {
            trap: 'A derékszög angolszász négyzetes jelölése a magyar dolgozatban',
            explanation: 'A magyar geometriai szabványban a derékszöget körcikk ívvel és benne egy ponttal jelöljük! Nem rajzolunk kis négyzetet a sarokba.'
          },
          {
            trap: 'A súlypont osztásarányának felcserélése (1:2 vs 2:1)',
            explanation: 'A súlypont a súlyvonalat 2 : 1 arányban osztja úgy, hogy a HOSSZABB szakasz mindig a CSÚCS felé esik, a rövidebb szakasz pedig az oldalfelező felé! Tehát CSÚCS-S = 2/3 · s_a, míg S-OLDAL = 1/3 · s_a.'
          },
          {
            trap: 'A Thalész-tétel feltételének figyelmen kívül hagyása',
            explanation: 'A Thalész-tétel csak akkor ad 90°-ot, ha az egyik oldal a KÖR ÁTMÉRŐJE, és a szemközti csúcs a körvonalon fekszik. Bármely más húr esetén a szög nem 90° lesz!'
          },
          {
            trap: 'A Hérón-képletben s helyett a teljes kerület (K) behelyettesítése',
            explanation: 'A Hérón-képletben az "s" betű mindig a FÉLKERÜLETET jelenti: s = (a + b + c) / 2. Ha a teljes K kerületet helyettesíted be, a terület hibás, túl nagy értéket fog adni.'
          }
        ]}
      />

      {/* 7. RÉSZ: Fejezeti Nagy Képlettáblázat */}
      <TheoryTable
        title="IV. Fejezet: Bevezetés a Geometriába – Nagy Képlettár"
        headers={['Fogalom / Tétel', 'Képlet / Összefüggés', 'Érvényességi Kör', 'Gyakori Alkalmazás']}
        rows={[
          [
            'Belső szögösszeg',
            'α + β + γ = 180°',
            'Minden síkbeli háromszög',
            'Harmadik szög kiszámítása két ismert szögből'
          ],
          [
            'Külső szög tétele',
            'α\' = β + γ',
            'Minden háromszög',
            'Gyors szögszámítás belső szög kiszámítása nélkül'
          ],
          [
            'Háromszög-egyenlőtlenség',
            'a + b > c',
            'Bármely háromszög létezése',
            'Szerkeszthetőség eldöntése 3 adott oldalhosszból'
          ],
          [
            'Pitagorasz-tétel',
            'a² + b² = c²',
            'Derékszögű háromszögek',
            'Hiányzó oldal, átló, magasság kiszámítása'
          ],
          [
            '30°-60°-90° Háromszög',
            'a,  a√3,  2a',
            'Szabályos háromszög fele',
            'Középszintű érettségi tipikus háromszöge'
          ],
          [
            '45°-45°-90° Háromszög',
            'a,  a,  a√2',
            'Egyenlő szárú derékszögű (négyzet fele)',
            'Négyzet átlójának gyors kiszámítása'
          ],
          [
            'Magasságtétel',
            'm_c² = p · q',
            'Derékszögű háromszög',
            'Átfogóhoz tartozó magasság mértani közepe'
          ],
          [
            'Befogótétel',
            'a² = c · p,  b² = c · q',
            'Derékszögű háromszög',
            'Befogó mértani közepe az átfogónak és szeletének'
          ],
          [
            'Thalész-tétel',
            'ACB∠ = 90°',
            'Átmérő fölé emelt háromszög',
            'Érintők szerkesztése külső pontból'
          ],
          [
            'Súlypont osztásaránya',
            'CS : SF = 2 : 1',
            'Minden háromszög',
            'Súlyvonal részeinek kiszámítása'
          ],
          [
            'Euler-egyenes',
            'MS : SO = 2 : 1',
            'Nem szabályos háromszög',
            'M, S, O kollinearitása (egy egyenesen fekvése)'
          ],
          [
            'Alap-magasság terület',
            'T = (a · m_a) / 2',
            'Minden háromszög',
            'Általános terület- és magasságszámítás'
          ],
          [
            'Derékszögű terület',
            'T = (a · b) / 2',
            'Derékszögű háromszög',
            'Két befogó szorzatának fele'
          ],
          [
            'Szabályos háromszög területe',
            'T = (a² · √3) / 4',
            'Szabályos háromszög',
            'Terület egyedül az a oldalból'
          ],
          [
            'Hérón-képlet',
            'T = √[s(s-a)(s-b)(s-c)]',
            'Minden háromszög (3 oldal ismert)',
            'Területszámítás szög és magasság nélkül'
          ],
          [
            'Beírt kör sugara',
            'r = T / s',
            'Minden háromszög',
            'Belső érintő kör sugarának számítása'
          ],
          [
            'Körülírt kör sugara',
            'R = (abc) / (4T)',
            'Minden háromszög',
            'Csúcsokon átmenő kör sugarának számítása'
          ]
        ]}
      />
    </TheoryTemplate>
  );
};

