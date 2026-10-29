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
  Move,
  Calculator
} from 'lucide-react';
import {
  BaseAndHeightAreaSVG,
  RightTriangleAreaSVG,
  EquilateralTriangleAreaSVG,
  HeronAndCirclesAreaSVG
} from './TriangleAreaFigures';

interface TriangleAreaTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const TriangleAreaTheory: React.FC<TriangleAreaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV HÁROMSZÖG TERÜLET ÉS SUGÁR KALKULÁTOR LABOR ÁLLAPOTOK ---
  const [sideA, setSideA] = useState<number>(13);
  const [sideB, setSideB] = useState<number>(14);
  const [sideC, setSideC] = useState<number>(15);

  // Számítások Hérón-képlettel és sugarakkal
  const areaData = useMemo(() => {
    const a = sideA;
    const b = sideB;
    const c = sideC;

    // Háromszög-egyenlőtlenség ellenőrzése:
    const isValid = a + b > c && a + c > b && b + c > a;

    if (!isValid) {
      return {
        isValid: false,
        K: (a + b + c).toFixed(1),
        s: ((a + b + c) / 2).toFixed(1),
        T: 'Nem szerkeszthető',
        r: '-',
        R: '-',
        m_a: '-',
        m_b: '-',
        m_c: '-'
      };
    }

    const K = a + b + c;
    const s = K / 2;
    const radicand = s * (s - a) * (s - b) * (s - c);
    const T = Math.sqrt(Math.max(0, radicand));

    const r = s > 0 ? T / s : 0;
    const R = T > 0 ? (a * b * c) / (4 * T) : 0;

    const m_a = (2 * T) / a;
    const m_b = (2 * T) / b;
    const m_c = (2 * T) / c;

    return {
      isValid: true,
      K: K.toFixed(1),
      s: s.toFixed(1),
      T: T.toFixed(2),
      r: r.toFixed(2),
      R: R.toFixed(2),
      m_a: m_a.toFixed(2),
      m_b: m_b.toFixed(2),
      m_c: m_c.toFixed(2)
    };
  }, [sideA, sideB, sideC]);

  return (
    <TheoryTemplate
      title="12. Háromszögek kerülete és területe"
      subtitle="Alap és magasság szorzata, derékszögű és szabályos háromszögek, a Hérón-képlet, valamint a beírt és körülírt körök sugarai"
      grade={9}
      chapterId="bevezetes-a-geometriaba"
      topicId="g9-geom-haromszog-kerulet-terulet"
      themeColor="emerald"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "A legfontosabb területképletek egy pillantásra",
        formula: "T = \\frac{a \\cdot m_a}{2} = \\sqrt{s(s-a)(s-b)(s-c)} = r \\cdot s = \\frac{abc}{4R}",
        rules: [
          "Alap és magasság: T = (a · m_a) / 2 = (b · m_b) / 2 = (c · m_c) / 2. Mindig az adott oldalhoz tartozó magasságot kell használni!",
          "Derékszögű háromszög: Mivel a két befogó merőleges egymásra, kölcsönösen egymás magasságai: T = (a · b) / 2.",
          "Szabályos háromszög (a oldal): Magassága m = (a√3)/2, területe T = (a²√3)/4.",
          "Hérón-képlet: Ha mindhárom oldal ismert és nincs megadva szög vagy magasság: s = (a+b+c)/2 a félkerület, ekkor T = √[s(s-a)(s-b)(s-c)].",
          "Körök sugarai a területből: Beírt kör sugara r = T / s, körülírt kör sugara R = (abc) / (4T)."
        ]
      }}
    >
      {/* 1. FEJEZET: Alap és magasság, derékszögű háromszög */}
      <TheorySection
        title="1. Az alap és magasság képlete és a derékszögű háromszög területe"
        badge="1. Alapképletek"
        color="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Bármely síkbeli háromszög területe a megfelelő oldal (alap) és a hozzá tartozó
              magasság szorzatának a <strong>fele</strong>, mivel minden háromszög kiegészíthető
              egy kétszer akkora területű paralelogrammává vagy téglalappá.
            </p>

            <TheoryCard title="A háromszög területe alapból és magasságból" color="emerald">
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-emerald-300 dark:border-emerald-700 font-mono text-center font-bold text-sm text-emerald-900 dark:text-emerald-200">
                T = (a · m_a) / 2 = (b · m_b) / 2 = (c · m_c) / 2
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                Fontos: a három szorzat értéke mindig egyenlő! Ha az egyik oldal hosszabb, a hozzá tartozó magasság arányosan rövidebb:
                a · m_a = b · m_b = c · m_c = 2T.
              </p>
            </TheoryCard>

            <TheoryCard title="Derékszögű háromszög területe" color="teal">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Derékszögű háromszögben a két befogó ($a$ és $b$) merőleges egymásra, így $m_a = b$ és $m_b = a$.
                Ezért a terület közvetlenül a két befogó szorzatának a fele:
              </p>
              <div className="mt-1 text-center font-mono font-bold text-sm text-teal-800 dark:text-teal-200">
                T = (a · b) / 2
              </div>
            </TheoryCard>
          </div>

          <div className="flex flex-col gap-4 justify-center items-center">
            <BaseAndHeightAreaSVG size={310} />
            <RightTriangleAreaSVG size={310} />
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: Szabályos háromszög területe */}
      <TheorySection
        title="2. Szabályos (egyenlő oldalú) háromszög magassága és területe"
        badge="2. Szabályos alakzat"
        color="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <EquilateralTriangleAreaSVG />
          </div>

          <div className="space-y-4 order-1 md:order-2">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Szabályos háromszögben mindhárom oldal egyenlő ($a$), és mindhárom szög $60^\circ$.
              A magasság és a terület egyetlen adatból, az <strong>oldalhosszból ($a$)</strong> közvetlenül kifejezhető!
            </p>

            <TheoryCard title="Szabályos háromszög levezetett képletei" color="purple">
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Magasság Pitagorasz-tétellel:</strong> A felezett alappal (a/2):
                  m = √(a² - (a/2)²) = √((3a²)/4) = (a · √3) / 2.
                </p>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded border border-purple-300 dark:border-purple-700 font-mono text-center font-bold text-sm text-purple-900 dark:text-purple-200">
                  m = (a · √3) / 2
                </div>
                <p className="mt-1">
                  <strong>Terület behelyettesítéssel:</strong> T = (a · m) / 2 = (a² · √3) / 4.
                </p>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded border border-purple-300 dark:border-purple-700 font-mono text-center font-bold text-sm text-purple-900 dark:text-purple-200">
                  T = (a² · √3) / 4
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout type="tip" title="Példa gyors fejszámolásra">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Ha egy szabályos háromszög oldala a = 6 cm:
                m = (6 · √3) / 2 = 3√3 cm ≈ 5.20 cm,
                T = (6² · √3) / 4 = (36√3) / 4 = 9√3 cm² ≈ 15.59 cm².
              </p>
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: A Hérón-képlet */}
      <TheorySection
        title="3. A Hérón-képlet: Területszámítás kizárólag a három oldalból"
        badge="3. Hérón tétele"
        color="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Alexandriai Hérón (i. sz. 1. század) görög matematikus és mérnök alkotta meg a képletet,
              amely lehetővé teszi a háromszög területének kiszámítását akkor is, ha <strong>egyetlen magasságot vagy szöget sem ismerünk</strong>,
              csupán a három oldal hosszát ($a, b, c$).
            </p>

            <TheoryCard title="A Hérón-képlet képlete" color="blue">
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <p>1. Lépés: Kiszámítjuk a <strong>félkerületet ($s$)</strong>:</p>
                <div className="p-1.5 bg-blue-50 dark:bg-blue-950/40 rounded text-center font-mono font-bold text-blue-900 dark:text-blue-200">
                  s = (a + b + c) / 2
                </div>
                <p>2. Lépés: Alkalmazzuk a Hérón-képletet:</p>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded border border-blue-300 dark:border-blue-700 font-mono text-center font-bold text-sm text-blue-900 dark:text-blue-200">
                  T = √[s(s - a)(s - b)(s - c)]
                </div>
              </div>
            </TheoryCard>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-bold text-slate-900 dark:white">Klasszikus példa (13, 14, 15 oldalú háromszög):</p>
              <p>• s = (13 + 14 + 15) / 2 = 42 / 2 = 21 cm.</p>
              <p>• s - a = 21 - 13 = 8, s - b = 21 - 14 = 7, s - c = 21 - 15 = 6.</p>
              <p>• T = √(21 · 8 · 7 · 6) = √7056 = 84 cm².</p>
            </div>
          </div>

          <div className="flex justify-center">
            <HeronAndCirclesAreaSVG />
          </div>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: Terület a beírt és körülírt kör sugarával */}
      <TheorySection
        title="4. Területképletek a beírt (r) és körülírt (R) kör sugarával"
        badge="4. Sugár-összefüggések"
        color="rose"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A területképletek nemcsak a terület kiszámítására alkalmasak, hanem a háromszög
            beírt és körülírt körei <strong>sugarának meghatározására</strong> is!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Beírt kör sugara: T = r · s" color="rose">
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p>
                  A beírt kör középpontját ($I$) a három csúccsal összekötve három olyan kis háromszög
                  keletkezik, amelyek magassága pontosan a beírt kör $r$ sugara.
                </p>
                <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded border border-rose-300 dark:border-rose-700 font-mono text-center font-bold text-sm text-rose-900 dark:text-rose-200">
                  T = (a · r)/2 + (b · r)/2 + (c · r)/2 = r · (a + b + c)/2 = r · s
                </div>
                <p className="font-semibold text-rose-800 dark:text-rose-300 text-center mt-1">
                  Ebből a beírt kör sugara: r = T / s.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Körülírt kör sugara: T = abc / (4R)" color="indigo">
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p>
                  A körülírt kör $R$ sugara a három oldal szorzatának és a terület négyszeresének hányadosa:
                </p>
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded border border-indigo-300 dark:border-indigo-700 font-mono text-center font-bold text-sm text-indigo-900 dark:text-indigo-200">
                  T = (a · b · c) / (4R)  ⇒  R = (a · b · c) / (4T)
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Például a fenti (13, 14, 15) háromszögnél (T = 84):
                  R = (13 · 14 · 15) / (4 · 84) = 2730 / 336 = 8.125 cm.
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. FEJEZET: Interaktív Háromszög Területkalkulátor Labor */}
      <TheorySection
        title="5. Interaktív Háromszög Terület & Sugár Kalkulátor"
        badge="Élő laboratórium"
        color="emerald"
      >
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-600" />
                Élő Hérón-képlet & Geometriai Elemző
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Állítsd be a három oldal hosszát, az algoritmus élőben számolja a Hérón-területet, félkerületet, magasságokat és sugarakat!
              </p>
            </div>

            {/* Állapotjelző */}
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${
              areaData.isValid
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-red-100 text-red-900 border-red-300'
            }`}>
              {areaData.isValid ? 'Szerkeszthető háromszög' : 'Nem szerkeszthető! (a+b ≤ c)'}
            </div>
          </div>

          {/* 3 oldal beállítása csúszkákkal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>"a" oldal:</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-300">{sideA} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="30"
                step="1"
                value={sideA}
                onChange={(e) => setSideA(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>"b" oldal:</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-300">{sideB} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="30"
                step="1"
                value={sideB}
                onChange={(e) => setSideB(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>"c" oldal:</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-300">{sideC} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="30"
                step="1"
                value={sideC}
                onChange={(e) => setSideC(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          </div>

          {/* Eredménykártyák élő adatokkal */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 bg-emerald-50/70 dark:bg-slate-800/80 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">Kerület (K)</span>
              <strong className="text-base font-mono text-slate-900 dark:text-white">{areaData.K} cm</strong>
            </div>

            <div className="p-3 bg-teal-50/70 dark:bg-slate-800/80 rounded-xl border border-teal-200 dark:border-teal-800 text-center">
              <span className="text-[10px] uppercase font-bold text-teal-800 dark:text-teal-300 block mb-0.5">Félkerület (s)</span>
              <strong className="text-base font-mono text-slate-900 dark:text-white">{areaData.s} cm</strong>
            </div>

            <div className="p-3 bg-blue-50/70 dark:bg-slate-800/80 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-800 dark:text-blue-300 block mb-0.5">Hérón Terület (T)</span>
              <strong className="text-base font-mono text-blue-700 dark:text-blue-200">{areaData.T} cm²</strong>
            </div>

            <div className="p-3 bg-pink-50/70 dark:bg-slate-800/80 rounded-xl border border-pink-200 dark:border-pink-800 text-center">
              <span className="text-[10px] uppercase font-bold text-pink-800 dark:text-pink-300 block mb-0.5">Beírt sugár (r)</span>
              <strong className="text-base font-mono text-slate-900 dark:text-white">{areaData.r} cm</strong>
            </div>

            <div className="p-3 bg-purple-50/70 dark:bg-slate-800/80 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-[10px] uppercase font-bold text-purple-800 dark:text-purple-300 block mb-0.5">Körülírt sugár (R)</span>
              <strong className="text-base font-mono text-slate-900 dark:text-white">{areaData.R} cm</strong>
            </div>

            <div className="p-3 bg-amber-50/70 dark:bg-slate-800/80 rounded-xl border border-amber-200 dark:border-amber-800 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block mb-0.5">m_c magasság</span>
              <strong className="text-base font-mono text-slate-900 dark:text-white">{areaData.m_c} cm</strong>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* CSAPDÁK ÉS TIPUSHIBAK */}
      <TheoryTrapBox
        traps={[
          {
            title: "Nem összetartozó alap és magasság szorzása",
            description: "Gyakori hiba az 'a' oldalt az 'm_b' vagy 'm_c' magassággal megszorozni! Mindig a szorzatban szereplő oldalhoz tartozó magasságot kell venni: T = (a · m_a) / 2 = (b · m_b) / 2 = (c · m_c) / 2.",
            severity: "critical"
          },
          {
            title: "Hérón-képletben s a kerület vagy a félkerület?",
            description: "A Hérón-képletben 's' szigorúan a FÉLKERÜLETET jelenti: s = (a + b + c) / 2. Ha a teljes kerületet helyettesíted be, az eredmény négyszer akkora hibás érték lesz!",
            severity: "critical"
          },
          {
            title: "Szabályos háromszög képletének általánosítása",
            description: "A T = (a²√3)/4 képlet KIZÁRÓLAG szabályos (egyenlő oldalú, 60°-os) háromszögre érvényes! Nem alkalmazható egyenlő szárú vagy általános háromszögekre.",
            severity: "warning"
          },
          {
            title: "Derékszögű háromszög átfogójának szorzása a magassággal",
            description: "Derékszögű háromszögben T = (a · b) / 2 a befogókkal, de ha az átfogót használod, az átfogóhoz tartozó m_c magassággal kell szorozni: T = (c · m_c) / 2. A két befogó nem szorozható össze az átfogóval!",
            severity: "info"
          }
        ]}
      />

      {/* ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheoryTable
        title="Háromszögek területképleteinek összehasonlító táblázata"
        headers={["Képlet típusa", "Mikor használjuk?", "Pontos matematikai képlet", "Kifejezhető egyéb mennyiség"]}
        rows={[
          [
            "Alap és magasság",
            "Ismert egy oldal és a hozzá tartozó magasság",
            "T = (a · m_a) / 2",
            "m_a = (2T) / a"
          ],
          [
            "Derékszögű háromszög",
            "Ismert a két befogó (a és b)",
            "T = (a · b) / 2",
            "m_c = (a · b) / c"
          ],
          [
            "Szabályos háromszög",
            "Ismert az egyenlő oldal hossza (a)",
            "T = (a² · √3) / 4",
            "m = (a · √3) / 2"
          ],
          [
            "Hérón-képlet",
            "Ismert a három oldal (a, b, c), nincs szög",
            "T = √[s(s-a)(s-b)(s-c)]",
            "s = (a + b + c) / 2"
          ],
          [
            "Beírt kör sugara",
            "Ismert a terület és a félkerület",
            "T = r · s",
            "r = T / s"
          ],
          [
            "Körülírt kör sugara",
            "Ismert a három oldal és a terület",
            "T = (a · b · c) / (4R)",
            "R = (a · b · c) / (4T)"
          ]
        ]}
      />
    </TheoryTemplate>
  );
};

