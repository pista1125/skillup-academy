import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Shapes,
  Maximize2,
  Triangle,
  Square,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calculator,
  RotateCcw,
  Sliders,
  Scale
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface GeometricEquationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const GeometricEquationsTheory: React.FC<GeometricEquationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Labor Állapotok ---
  const [activeLabTab, setActiveLabTab] = useState<'rect' | 'triangle'>('rect');

  // 1. Fül: Téglalap Területváltozási Modellező
  // Eredeti téglalap: x és x + diffX
  const [origX, setOrigX] = useState<number>(6); // cm (rövidebb oldal x)
  const [diffX, setDiffX] = useState<number>(4); // cm (hosszabb oldal: x + diffX)
  const [deltaA, setDeltaA] = useState<number>(2); // cm (növelés az 1. oldalon)
  const [deltaB, setDeltaB] = useState<number>(3); // cm (növelés a 2. oldalon)

  // Számítások a téglalaphoz
  const origA = origX;
  const origB = origX + diffX;
  const origArea = origA * origB;
  const origPerimeter = 2 * (origA + origB);

  const newA = origA + deltaA;
  const newB = origB + deltaB;
  const newArea = newA * newB;
  const newPerimeter = 2 * (newA + newB);

  const deltaArea = newArea - origArea;
  // Algebrai levezetés:
  // (x + deltaA)(x + diffX + deltaB) - x(x + diffX)
  // = x^2 + (diffX + deltaA + deltaB)x + deltaA*(diffX + deltaB) - x^2 - diffX*x
  // = (deltaA + deltaB)x + deltaA*(diffX + deltaB)
  const linearCoeff = deltaA + deltaB;
  const constantTerm = deltaA * (diffX + deltaB);

  // 2. Fül: Háromszög Belső Szögek Aránya Modellező
  const [ratio1, setRatio1] = useState<number>(2);
  const [ratio2, setRatio2] = useState<number>(3);
  const [ratio3, setRatio3] = useState<number>(4);

  const ratioSum = ratio1 + ratio2 + ratio3;
  const onePartAngle = 180 / ratioSum;
  const angleAlpha = ratio1 * onePartAngle;
  const angleBeta = ratio2 * onePartAngle;
  const angleGamma = ratio3 * onePartAngle;

  const triangleType =
    Math.round(angleAlpha) === 90 || Math.round(angleBeta) === 90 || Math.round(angleGamma) === 90
      ? 'Derékszögű háromszög'
      : angleAlpha > 90 || angleBeta > 90 || angleGamma > 90
      ? 'Tompaszögű háromszög'
      : 'Hegyesszögű háromszög';

  return (
    <TheoryTemplate
      title="5. Szöveges geometriai feladatok"
      subtitle="Geometriai alakzatok kerületének, területének, belső és külső szögeinek algebrai kifejezése és kiszámítása elsőfokú egyenletekkel."
      badge="8. Osztály • III. Témakör"
      badgeColor="emerald"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        title: "A Geometriai Egyenletmegoldás Alapszabályai",
        formula: (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-mono text-center">
            <span>K = 2(a + b) • T = a · b</span>
            <span className="hidden sm:inline text-emerald-400">|</span>
            <span>α + β + γ = 180° • S_n = (n - 2) · 180°</span>
          </div>
        ),
        description: "Mindig készíts vázlatrajzot, jelöld az ismeretlent (x), írd fel a kerület/terület vagy szögösszeg képletét, és az eredményt mindig ellenőrizd geometriai szempontból is (pozitív oldalhosszúságok és háromszög-egyenlőtlenség)!"
      }}
    >
      {/* 1. Szekció: Háromszögek Belső és Külső Szögei */}
      <TheorySection
        number={1}
        title="Háromszögek Belső és Külső Szögei"
        icon={<Triangle className="w-5 h-5 text-emerald-600" />}
        badge="Szögek egyenletekkel"
        badgeColor="emerald"
      >
        <TheoryCard
          title="A Háromszög Belső Szögeinek Összege: α + β + γ = 180°"
          badge="Alaptétel"
          badgeColor="emerald"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Minden síkbeli háromszögben a három belső szög összege pontosan <strong>180°</strong>. Ha a feladat a szögek arányát, különbségét vagy egymáshoz viszonyított nagyságát adja meg, a szögeket egyetlen ismeretlen <MathText>x</MathText> segítségével fejezzük ki, majd felírjuk az összegüket:
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center">
              <div className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-400">Háromszög Belső Szögösszeg Egyenlete</div>
              <div className="text-2xl font-black text-emerald-900 dark:text-emerald-100 font-mono my-1">
                α + β + γ = 180°
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Arányos megadás esetén: <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">k₁·x + k₂·x + k₃·x = 180°</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60">
                <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300 mb-1">
                  1. Általános Háromszög
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Bármilyen háromszögben:
                  <br />
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 block mt-1">
                    α + β + γ = 180°
                  </span>
                  Külső szög tétel: egy külső szög egyenlő a két nem mellette fekvő belső szög összegével: <span className="font-mono font-bold">α' = β + γ</span>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/60">
                <div className="font-bold text-xs text-teal-800 dark:text-teal-300 mb-1">
                  2. Egyenlő Szárú Háromszög
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Az alapon fekvő két szög egyenlő (<MathText>α = β</MathText>).
                  <br />
                  <span className="font-mono font-bold text-teal-700 dark:text-teal-300 block mt-1">
                    2α + γ = 180°
                  </span>
                  A szárszög: <MathText>γ = 180° - 2α</MathText>.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60">
                <div className="font-bold text-xs text-blue-800 dark:text-blue-300 mb-1">
                  3. Derékszögű Háromszög
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A derékszög 90°, így a két hegyesszög összege mindig <strong>90°</strong> (pótszögek):
                  <br />
                  <span className="font-mono font-bold text-blue-700 dark:text-blue-300 block mt-1">
                    α + β = 90°
                  </span>
                </p>
              </div>
            </div>

            <TheoryCallout
              title="Tipikus Szögarányos Példa"
              variant="tip"
              icon={<Lightbulb className="w-5 h-5 text-emerald-600" />}
            >
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                Ha egy háromszög szögeinek aránya <MathText>2 : 3 : 5</MathText>, akkor:
                <br />
                <span className="font-mono font-bold text-emerald-800 dark:text-emerald-200">
                  2x + 3x + 5x = 180° ⇒ 10x = 180° ⇒ x = 18°
                </span>
                <br />
                A szögek: <MathText>2 \cdot 18° = 36°</MathText>, <MathText>3 \cdot 18° = 54°</MathText>, és <MathText>5 \cdot 18° = 90°</MathText>. Mivel a legnagyobb szög 90°, ez egy <strong>derékszögű háromszög</strong>!
              </p>
            </TheoryCallout>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. Szekció: Konvex Sokszögek Belső Szögei és Átlói */}
      <TheorySection
        number={2}
        title="Sokszögek Belső Szögei és Átlói"
        icon={<Shapes className="w-5 h-5 text-emerald-600" />}
        badge="Sokszögek"
        badgeColor="emerald"
      >
        <TheoryCard
          title="Konvex n-oldalú Sokszögek Képletei"
          badge="Sn = (n - 2) · 180°"
          badgeColor="emerald"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Bármely konvex <MathText>n</MathText>-oldalú sokszög felbontható <MathText>(n - 2)</MathText> darab háromszögre egyetlen csúcsából kiinduló átlókkal. Mivel minden háromszög belső szögösszege 180°, a sokszög belső szögeinek összege:
            </p>

            <TheoryTable
              headers={['Fogalom / Tulajdonság', 'Képlet', 'Példa: 6-szög (n = 6)', 'Példa: 8-szög (n = 8)']}
              rows={[
                ['Egy csúcsból húzható átlók', 'n - 3', '6 - 3 = 3 db', '8 - 3 = 5 db'],
                ['Háromszögekre bontás száma', 'n - 2', '6 - 2 = 4 db', '8 - 2 = 6 db'],
                [
                  'Belső szögek összege (Sₙ)',
                  'Sₙ = (n - 2) · 180°',
                  '4 · 180° = 720°',
                  '6 · 180° = 1080°'
                ],
                [
                  'Összes átlók száma (Á)',
                  <Fraction key="diag" num="n · (n - 3)" den="2" size="sm" />,
                  <span key="d6" className="inline-flex items-center gap-1">
                    <Fraction num="6 · 3" den="2" size="sm" />
                    <span>= 9 db</span>
                  </span>,
                  <span key="d8" className="inline-flex items-center gap-1">
                    <Fraction num="8 · 5" den="2" size="sm" />
                    <span>= 20 db</span>
                  </span>
                ],
                [
                  'Szabályos sokszög 1 belső szöge',
                  <Fraction key="reg" num="(n - 2) · 180°" den="n" size="sm" />,
                  <span key="r6" className="inline-flex items-center gap-1">
                    <Fraction num="720°" den="6" size="sm" />
                    <span>= 120°</span>
                  </span>,
                  <span key="r8" className="inline-flex items-center gap-1">
                    <Fraction num="1080°" den="8" size="sm" />
                    <span>= 135°</span>
                  </span>
                ],
                ['Külső szögek összege', 'Mindig 360°', '360°', '360°']
              ]}
            />

            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-amber-800 dark:text-amber-300">Felvételi egyenlet típus:</strong>
              <br />
              <em>„Melyik az a sokszög, amelynek belső szögeinek összege 1440°?”</em>
              <div className="my-1.5 p-2 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 font-mono text-center font-bold text-amber-900 dark:text-amber-200">
                (n - 2) · 180° = 1440° &implies; n - 2 = 8 &implies; n = 10 (tízszög!)
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. Szekció: Téglalapok Kerülete, Területe és Oldalváltoztatása */}
      <TheorySection
        number={3}
        title="Téglalapok Kerülete és Területváltoztatása"
        icon={<Square className="w-5 h-5 text-emerald-600" />}
        badge="Kerület & Terület"
        badgeColor="emerald"
      >
        <TheoryCard
          title="A Klasszikus Oldalváltoztatási Modell (x² kiesése)"
          badge="Felvételi Kedvenc"
          badgeColor="emerald"
        >
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A 8. osztályos felvételik egyik leggyakoribb feladattípusa, amikor egy téglalap vagy négyzet oldalait valamennyivel megnöveljük vagy lecsökkentjük, és megadják a terület változását. Bár a terület kiszámításakor <MathText>x^2</MathText> keletkezik, az egyenlet felírásakor a másodfokú tag <strong>kiesik</strong>, így tiszta elsőfokú egyenletet kapunk!
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border border-emerald-300 dark:border-emerald-800">
              <div className="text-xs uppercase font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                A Területváltozás Modellezésének 4 Lépése:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">1. Eredeti oldalak</div>
                  <div className="font-mono text-slate-600 dark:text-slate-300">a = x</div>
                  <div className="font-mono text-slate-600 dark:text-slate-300">b = x + d</div>
                  <div className="font-mono font-bold text-emerald-800 dark:text-emerald-200 mt-1">T₁ = x(x + d)</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900">
                  <div className="font-bold text-teal-700 dark:text-teal-400 mb-1">2. Új oldalak</div>
                  <div className="font-mono text-slate-600 dark:text-slate-300">a' = x + p</div>
                  <div className="font-mono text-slate-600 dark:text-slate-300">b' = x + d + q</div>
                  <div className="font-mono font-bold text-teal-800 dark:text-teal-200 mt-1">T₂ = a' · b'</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900">
                  <div className="font-bold text-blue-700 dark:text-blue-400 mb-1">3. Egyenlet felírása</div>
                  <div className="font-mono text-slate-600 dark:text-slate-300">T₂ - T₁ = ΔT</div>
                  <div className="font-mono font-bold text-blue-800 dark:text-blue-200 mt-1">x² tag kiesik!</div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900">
                  <div className="font-bold text-indigo-700 dark:text-indigo-400 mb-1">4. Ellenőrzés</div>
                  <div className="text-slate-600 dark:text-slate-300">Számold ki T₁-et és T₂-t, vond ki őket: egyezik-e a ΔT-vel?</div>
                </div>
              </div>
            </div>

            <TheoryCallout
              title="Példa: Téglalap Területnövekedése"
              variant="example"
              icon={<Maximize2 className="w-5 h-5 text-emerald-600" />}
            >
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <div><em>Egy téglalap egyik oldala 4 cm-rel hosszabb a másiknál. Ha mindkét oldalt 2 cm-rel megnöveljük, a területe 36 cm²-rel nő. Mekkorák az eredeti oldalak?</em></div>
                <div className="font-mono text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-1">
                  <div>Eredeti téglalap: <MathText>a = x</MathText>, <MathText>b = x + 4</MathText> <ArrowRight className="inline w-3.5 h-3.5" /> <MathText>T_1 = x(x + 4) = x^2 + 4x</MathText></div>
                  <div>Megnövelt téglalap: <MathText>a' = x + 2</MathText>, <MathText>b' = x + 6</MathText> <ArrowRight className="inline w-3.5 h-3.5" /> <MathText>T_2 = (x + 2)(x + 6) = x^2 + 8x + 12</MathText></div>
                  <div className="font-bold text-emerald-800 dark:text-emerald-300">Egyenlet: T₂ - T₁ = 36</div>
                  <div>(x² + 8x + 12) - (x² + 4x) = 36</div>
                  <div>x² + 8x + 12 - x² - 4x = 36</div>
                  <div>4x + 12 = 36 ⇒ 4x = 24 ⇒ x = 6 cm</div>
                </div>
                <div><strong>Válasz:</strong> Az eredeti oldalak <strong>6 cm és 10 cm</strong> hosszúak. (Ellenőrzés: <MathText>T_1 = 6 \cdot 10 = 60</MathText> cm², <MathText>T_2 = 8 \cdot 12 = 96</MathText> cm², különbség: <MathText>96 - 60 = 36</MathText> cm²! Helyes!)</div>
              </div>
            </TheoryCallout>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szekció: Háromszögek, Trapézok és Pitagorasz-tétel */}
      <TheorySection
        number={4}
        title="Trapézok, Háromszögek és Pitagorasz-összefüggések"
        icon={<Compass className="w-5 h-5 text-emerald-600" />}
        badge="Síkidomok & Pitagorasz"
        badgeColor="emerald"
      >
        <TheoryCard
          title="Trapéz Területe és Pitagorasz-tétel Algebrai Kapcsolata"
          badge="Összetett Képletek"
          badgeColor="emerald"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Shapes className="w-4 h-4 text-emerald-600" />
                  Trapéz Területének Képlete
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 text-center font-mono font-bold text-emerald-800 dark:text-emerald-200 flex items-center justify-center gap-2">
                  <span>T =</span>
                  <Fraction num="a + c" den="2" size="md" />
                  <span>· m</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A két párhuzamos alap összege felezve (középvonal) szorozva a magassággal. Ha az egyik alap <MathText>x</MathText>, a másik <MathText>2x</MathText> vagy <MathText>x + d</MathText>, közvetlenül behelyettesítünk.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Triangle className="w-4 h-4 text-emerald-600" />
                  Pitagorasz-tétel Derékszögű Háromszögben
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 text-center font-mono font-bold text-emerald-800 dark:text-emerald-200">
                  a² + b² = c²
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  A két befogó négyzetösszege egyenlő az átfogó négyzetével. Ha például egy derékszögű háromszög átfogója <MathText>x + 2</MathText>, befogói 6 és <MathText>x</MathText>:
                  <br />
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 block mt-1">
                    6² + x² = (x + 2)² &implies; 36 + x² = x² + 4x + 4 &implies; 4x = 32 &implies; x = 8
                  </span>
                </p>
              </div>
            </div>

            <TheoryTrapBox
              title="Veszélyes Csapda: A Háromszög-egyenlőtlenség!"
              icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
            >
              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>Geometriai feladatoknál az egyenlet algebrai megoldása után <strong>KÖTELEZŐ</strong> ellenőrizni, hogy a kapott oldalhosszúságokból valóban szerkeszthető-e háromszög:</div>
                <div className="font-mono font-bold text-rose-800 dark:text-rose-300 bg-white dark:bg-slate-900 p-2 rounded-lg border border-rose-300 text-center">
                  a + b &gt; c &nbsp;és&nbsp; a + c &gt; b &nbsp;és&nbsp; b + c &gt; a
                </div>
                <div>Bármely két oldal összegének szigorúan <strong>nagyobbnak</strong> kell lennie a harmadik oldalnál! Ha <MathText>a + b \le c</MathText>, akkor a háromszög nem létezik (a szárak nem érnek össze vagy egy egyenesre esnek).</div>
              </div>
            </TheoryTrapBox>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. Szekció: Interaktív Geometria Labor Szimulátor */}
      <TheorySection
        number={5}
        title="Interaktív Geometria Labor Szimulátor"
        icon={<Sliders className="w-5 h-5 text-emerald-600" />}
        badge="Szimulátor"
        badgeColor="emerald"
      >
        <TheoryCard
          title="Modellezd valós időben a területváltozást és a szögek arányait!"
          badge="Interaktív Geometria"
          badgeColor="emerald"
        >
          {/* Fülváltó */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Válaszd ki a kísérleti témát:
            </span>
            <div className="flex gap-2">
              <Button
                variant={activeLabTab === 'rect' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLabTab('rect')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeLabTab === 'rect'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                    : 'border-emerald-200 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                <Square className="w-3.5 h-3.5" />
                Téglalap Területváltozás
              </Button>
              <Button
                variant={activeLabTab === 'triangle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveLabTab('triangle')}
                className={`rounded-xl text-xs font-bold gap-1.5 ${
                  activeLabTab === 'triangle'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                    : 'border-emerald-200 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                <Triangle className="w-3.5 h-3.5" />
                Háromszög Szögarányok
              </Button>
            </div>
          </div>

          {/* TAB 1: Téglalap Labor */}
          {activeLabTab === 'rect' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 space-y-4">
                {/* Paraméter csúszkák */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-emerald-800 dark:text-emerald-300">Rövidebb oldal (x):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-black">{origX} cm</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="15"
                      step="1"
                      value={origX}
                      onChange={(e) => setOrigX(parseInt(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-teal-800 dark:text-teal-300">Oldalkülönbség (+d):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-teal-600 text-white font-black">+{diffX} cm</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={diffX}
                      onChange={(e) => setDiffX(parseInt(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-sky-800 dark:text-sky-300">1. Oldalnövekedés:</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-sky-600 text-white font-black">+{deltaA} cm</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={deltaA}
                      onChange={(e) => setDeltaA(parseInt(e.target.value))}
                      className="w-full accent-sky-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-indigo-800 dark:text-indigo-300">2. Oldalnövekedés:</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-black">+{deltaB} cm</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={deltaB}
                      onChange={(e) => setDeltaB(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                {/* Vektoros SVG Téglalap Vizualizáció */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-emerald-50/40 dark:from-slate-900 dark:to-slate-950 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>📐 Eredeti és Megnövelt Téglalap Rétegei:</span>
                    <span className="text-emerald-700 dark:text-emerald-300 font-mono font-bold bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      Területnövekedés: +{deltaArea} cm²
                    </span>
                  </div>

                  {/* SVG Canvas (Skálázott téglalapok rajza) */}
                  <svg
                    viewBox="0 0 700 280"
                    className="w-full h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 drop-shadow-sm"
                  >
                    <defs>
                      <pattern id="origGrid" width="12" height="12" patternUnits="userSpaceOnUse">
                        <rect width="12" height="12" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="0.8" />
                      </pattern>
                      <pattern id="stripeStripA" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="10" stroke="#38bdf8" strokeWidth="2.5" />
                      </pattern>
                      <pattern id="stripeStripB" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                        <line x1="0" y1="0" x2="0" y2="10" stroke="#818cf8" strokeWidth="2.5" />
                      </pattern>
                    </defs>

                    {/* Skálázási paraméterek: 1 cm = scale Px */}
                    {(() => {
                      const maxW = newB;
                      const maxH = newA;
                      const pxPerCm = Math.min(420 / Math.max(1, maxW), 180 / Math.max(1, maxH));
                      const origW_px = origB * pxPerCm;
                      const origH_px = origA * pxPerCm;
                      const deltaW_px = deltaB * pxPerCm;
                      const deltaH_px = deltaA * pxPerCm;

                      const startX = 60;
                      const startY = 50;

                      return (
                        <g>
                          {/* 1. Eredeti Téglalap (Bal felső blokk) */}
                          <rect
                            x={startX}
                            y={startY}
                            width={origW_px}
                            height={origH_px}
                            fill="url(#origGrid)"
                            stroke="#059669"
                            strokeWidth="2.5"
                            rx="3"
                          />
                          <text
                            x={startX + origW_px / 2}
                            y={startY + origH_px / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="13"
                            fontWeight="bold"
                            fill="#065f46"
                          >
                            T₁ = {origArea} cm² ({origA}×{origB})
                          </text>

                          {/* 2. Jobb oldali hozzáadott sáv: deltaB szélességű, origA magasságú */}
                          <rect
                            x={startX + origW_px}
                            y={startY}
                            width={deltaW_px}
                            height={origH_px}
                            fill="#e0f2fe"
                            stroke="#0284c7"
                            strokeWidth="2"
                            strokeDasharray="4 2"
                            rx="2"
                          />
                          <text
                            x={startX + origW_px + deltaW_px / 2}
                            y={startY + origH_px / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="10"
                            fontWeight="bold"
                            fill="#0369a1"
                          >
                            +{origA * deltaB} cm²
                          </text>

                          {/* 3. Alsó hozzáadott sáv: origB szélességű, deltaA magasságú */}
                          <rect
                            x={startX}
                            y={startY + origH_px}
                            width={origW_px}
                            height={deltaH_px}
                            fill="#ede9fe"
                            stroke="#6366f1"
                            strokeWidth="2"
                            strokeDasharray="4 2"
                            rx="2"
                          />
                          <text
                            x={startX + origW_px / 2}
                            y={startY + origH_px + deltaH_px / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="10"
                            fontWeight="bold"
                            fill="#4338ca"
                          >
                            +{origB * deltaA} cm²
                          </text>

                          {/* 4. Sarok hozzáadott téglalap: deltaB × deltaA */}
                          <rect
                            x={startX + origW_px}
                            y={startY + origH_px}
                            width={deltaW_px}
                            height={deltaH_px}
                            fill="#fef3c7"
                            stroke="#d97706"
                            strokeWidth="2"
                            strokeDasharray="3 2"
                            rx="2"
                          />
                          <text
                            x={startX + origW_px + deltaW_px / 2}
                            y={startY + origH_px + deltaH_px / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="10"
                            fontWeight="bold"
                            fill="#b45309"
                          >
                            +{deltaA * deltaB} cm²
                          </text>

                          {/* Méretnyilak és feliratok */}
                          {/* Felső szélesség (Eredeti b = x + diffX) */}
                          <line x1={startX} y1={startY - 12} x2={startX + origW_px} y2={startY - 12} stroke="#059669" strokeWidth="1.5" />
                          <text x={startX + origW_px / 2} y={startY - 16} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#047857">
                            b = {origB} cm
                          </text>

                          {/* Felső megnövelt szélesség (+deltaB) */}
                          <line x1={startX + origW_px} y1={startY - 12} x2={startX + origW_px + deltaW_px} y2={startY - 12} stroke="#0284c7" strokeWidth="1.5" />
                          <text x={startX + origW_px + deltaW_px / 2} y={startY - 16} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0284c7">
                            +{deltaB}
                          </text>

                          {/* Bal oldali magasság (Eredeti a = x) */}
                          <line x1={startX - 12} y1={startY} x2={startX - 12} y2={startY + origH_px} stroke="#059669" strokeWidth="1.5" />
                          <text x={startX - 18} y={startY + origH_px / 2} textAnchor="end" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill="#047857">
                            a = {origA} cm
                          </text>

                          {/* Bal oldali megnövelt magasság (+deltaA) */}
                          <line x1={startX - 12} y1={startY + origH_px} x2={startX - 12} y2={startY + origH_px + deltaH_px} stroke="#6366f1" strokeWidth="1.5" />
                          <text x={startX - 18} y={startY + origH_px + deltaH_px / 2} textAnchor="end" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill="#6366f1">
                            +{deltaA}
                          </text>

                          {/* Jobb oldali összefoglaló kártya az SVG-ben */}
                          <g transform="translate(520, 60)">
                            <rect x="0" y="0" width="160" height="150" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                            <text x="80" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
                              SZÁMÍTÁSOK
                            </text>
                            <line x1="15" y1="30" x2="145" y2="30" stroke="#e2e8f0" strokeWidth="1" />

                            <text x="15" y="50" fontSize="10" fill="#475569">Eredeti T₁: <tspan fontWeight="bold" fill="#059669">{origArea} cm²</tspan></text>
                            <text x="15" y="70" fontSize="10" fill="#475569">Új T₂: <tspan fontWeight="bold" fill="#2563eb">{newArea} cm²</tspan></text>
                            <text x="15" y="90" fontSize="10" fill="#475569">Különbség (ΔT): <tspan fontWeight="bold" fill="#d97706">+{deltaArea} cm²</tspan></text>

                            <line x1="15" y1="102" x2="145" y2="102" stroke="#e2e8f0" strokeWidth="1" />
                            <text x="15" y="120" fontSize="9" fontWeight="bold" fill="#059669">Eredeti K₁ = {origPerimeter} cm</text>
                            <text x="15" y="136" fontSize="9" fontWeight="bold" fill="#2563eb">Új K₂ = {newPerimeter} cm</text>
                          </g>
                        </g>
                      );
                    })()}
                  </svg>

                  {/* Élő Algebrai Egyenlet Levezetés Doboz */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 space-y-1.5 text-xs">
                    <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                      <span>Algebrai Egyenlet felírása (ismeretlen: x = {origX} cm):</span>
                      <span className="font-mono bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded text-emerald-800 dark:text-emerald-300 font-bold">
                        T₂ - T₁ = {deltaArea}
                      </span>
                    </div>
                    <div className="font-mono text-slate-700 dark:text-slate-300 space-y-1 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div>(x + {deltaA}) · (x + {diffX + deltaB}) - x · (x + {diffX}) = {deltaArea}</div>
                      <div>x² + ({diffX + deltaB + deltaA})x + {deltaA * (diffX + deltaB)} - x² - {diffX}x = {deltaArea}</div>
                      <div className="text-emerald-700 dark:text-emerald-300 font-bold">
                        {linearCoeff}x + {constantTerm} = {deltaArea} ⇒ {linearCoeff}x = {deltaArea - constantTerm} ⇒ x = {origX} cm
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Háromszög Szögarány Labor */}
          {activeLabTab === 'triangle' && (
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 space-y-4">
                {/* Szögarány csúszkák */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-emerald-800 dark:text-emerald-300">1. Szög aránya (k₁):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-emerald-600 text-white font-black">{ratio1} rész</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={ratio1}
                      onChange={(e) => setRatio1(parseInt(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="text-[11px] text-slate-500 font-mono">
                      α = {angleAlpha.toFixed(1)}°
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-teal-800 dark:text-teal-300">2. Szög aránya (k₂):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-teal-600 text-white font-black">{ratio2} rész</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={ratio2}
                      onChange={(e) => setRatio2(parseInt(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="text-[11px] text-slate-500 font-mono">
                      β = {angleBeta.toFixed(1)}°
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-indigo-800 dark:text-indigo-300">3. Szög aránya (k₃):</span>
                      <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-black">{ratio3} rész</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={ratio3}
                      onChange={(e) => setRatio3(parseInt(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                    <div className="text-[11px] text-slate-500 font-mono">
                      γ = {angleGamma.toFixed(1)}°
                    </div>
                  </div>
                </div>

                {/* Vektoros SVG Háromszög Rajz és Szögívek */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-50 to-teal-50/40 dark:from-slate-900 dark:to-slate-950 border border-teal-200 dark:border-teal-900/60 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>🔺 Arányos Háromszög Valós Idejű Modellje:</span>
                    <span className="text-teal-700 dark:text-teal-300 font-mono font-bold bg-teal-100 dark:bg-teal-950 px-2.5 py-0.5 rounded-full border border-teal-300">
                      Típus: {triangleType}
                    </span>
                  </div>

                  {/* Dinamikus SVG Háromszög */}
                  <svg
                    viewBox="0 0 600 240"
                    className="w-full h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 drop-shadow-sm"
                  >
                    {(() => {
                      // Számoljuk ki a 3 csúcs koordinátáját adott szögekkel szinusztétellel
                      const rAlpha = (angleAlpha * Math.PI) / 180;
                      const rBeta = (angleBeta * Math.PI) / 180;
                      const rGamma = (angleGamma * Math.PI) / 180;

                      // Relatív oldalhosszúságok: a ~ sin(α), b ~ sin(β), c ~ sin(γ)
                      const sinA = Math.sin(rAlpha);
                      const sinB = Math.sin(rBeta);
                      const sinG = Math.max(0.08, Math.sin(rGamma));

                      // Normalizált koordináták
                      const rawAx = 0;
                      const rawBx = sinG;
                      const rawCx = sinB * Math.cos(rAlpha);
                      const rawCy = -sinB * sinA;

                      const minX = Math.min(rawAx, rawBx, rawCx);
                      const maxX = Math.max(rawAx, rawBx, rawCx);
                      const spanX = Math.max(0.1, maxX - minX);

                      const minY = rawCy; // negatív magasság
                      const maxY = 0;
                      const spanY = Math.max(0.1, maxY - minY);

                      // Célterület: szélesség max 420px, magasság max 120px
                      const scale = Math.min(420 / spanX, 120 / spanY);

                      // Középre igazítás az SVG vásznon (600 × 240)
                      const offsetX = (600 - spanX * scale) / 2 - minX * scale;
                      const baseY = 188;

                      const ax = offsetX + rawAx * scale;
                      const ay = baseY;
                      const bx = offsetX + rawBx * scale;
                      const by = baseY;
                      const cx = offsetX + rawCx * scale;
                      const cy = baseY + rawCy * scale;

                      return (
                        <g>
                          {/* Háromszög test */}
                          <polygon
                            points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
                            fill="#ccfbf1"
                            stroke="#0f766e"
                            strokeWidth="3"
                            strokeLinejoin="round"
                          />

                          {/* Csúcs pontok */}
                          <circle cx={ax} cy={ay} r="5" fill="#0d9488" />
                          <circle cx={bx} cy={by} r="5" fill="#0d9488" />
                          <circle cx={cx} cy={cy} r="5" fill="#0d9488" />

                          {/* Csúcs feliratok */}
                          <text x={ax - 14} y={ay + 6} fontSize="14" fontWeight="bold" fill="#0f766e">A</text>
                          <text x={bx + 12} y={by + 6} fontSize="14" fontWeight="bold" fill="#0f766e">B</text>
                          <text x={cx} y={cy - 12} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f766e">C</text>

                          {/* Szög jelvények */}
                          <g transform={`translate(${ax + 32}, ${ay - 12})`}>
                            <rect x="-24" y="-10" width="48" height="18" rx="6" fill="#0d9488" />
                            <text x="0" y="3" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
                              α={angleAlpha.toFixed(0)}°
                            </text>
                          </g>

                          <g transform={`translate(${bx - 32}, ${by - 12})`}>
                            <rect x="-24" y="-10" width="48" height="18" rx="6" fill="#0f766e" />
                            <text x="0" y="3" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
                              β={angleBeta.toFixed(0)}°
                            </text>
                          </g>

                          <g transform={`translate(${cx}, ${cy - 28})`}>
                            <rect x="-24" y="-10" width="48" height="18" rx="6" fill="#115e59" />
                            <text x="0" y="3" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
                              γ={angleGamma.toFixed(0)}°
                            </text>
                          </g>
                        </g>
                      );
                    })()}
                  </svg>

                  {/* Kiszámolt Telemetria */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-center">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Összes arányrész:</div>
                      <div className="text-base font-black text-emerald-600 font-mono my-0.5">
                        {ratio1} + {ratio2} + {ratio3} = {ratioSum} rész
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        1 rész = 180° / {ratioSum} = {onePartAngle.toFixed(2)}°
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-800">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Kiszámolt Szögek:</div>
                      <div className="text-xs text-slate-700 dark:text-slate-300 font-mono my-1 space-y-0.5">
                        <div>α = {ratio1} · {onePartAngle.toFixed(1)}° = <span className="font-bold text-teal-600">{angleAlpha.toFixed(1)}°</span></div>
                        <div>β = {ratio2} · {onePartAngle.toFixed(1)}° = <span className="font-bold text-teal-600">{angleBeta.toFixed(1)}°</span></div>
                        <div>γ = {ratio3} · {onePartAngle.toFixed(1)}° = <span className="font-bold text-teal-600">{angleGamma.toFixed(1)}°</span></div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Ellenőrzés (Összeg):</div>
                      <div className="text-base font-black text-indigo-700 dark:text-indigo-300 font-mono my-0.5">
                        {(angleAlpha + angleBeta + angleGamma).toFixed(0)}° = 180°
                      </div>
                      <div className="text-[10px] text-emerald-600 font-bold flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Tökéletes szögösszeg!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TheoryCard>
      </TheorySection>

      {/* 6. Szekció: Részletesen Kidolgozott Mintapéldák */}
      <TheorySection
        number={6}
        title="Részletesen Kidolgozott Mintapéldák a Tankönyvből"
        icon={<Calculator className="w-5 h-5 text-emerald-600" />}
        badge="Mintapéldák"
        badgeColor="emerald"
      >
        {/* 1. MINTAPÉLDA */}
        <TheoryCard
          title="1. Mintapélda: Téglalap oldalváltoztatása és területnövekedése"
          badge="Téglalap modell"
          badgeColor="emerald"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">
              <strong>Feladat:</strong> Egy téglalap egyik oldala 5 cm-rel hosszabb a másiknál. Ha a rövidebbik oldalt 3 cm-rel, a hosszabbikat 2 cm-rel megnöveljük, a téglalap területe 66 cm²-rel lesz nagyobb. Mekkorák voltak az eredeti téglalap oldalai és kerülete?
            </p>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono">
              <div className="font-bold text-emerald-700 dark:text-emerald-300">1. Lépés: Ismeretlenek felírása</div>
              <div>Eredeti rövidebb oldal: a = x</div>
              <div>Eredeti hosszabb oldal: b = x + 5</div>
              <div>Eredeti terület: T₁ = x · (x + 5) = x² + 5x</div>
              <div className="pt-1 font-bold text-teal-700 dark:text-teal-300">2. Lépés: Új méretek és új terület</div>
              <div>Új oldalak: a' = x + 3, b' = (x + 5) + 2 = x + 7</div>
              <div>Új terület: T₂ = (x + 3)(x + 7) = x² + 10x + 21</div>
              <div className="pt-1 font-bold text-blue-700 dark:text-blue-300">3. Lépés: Egyenlet felírása és megoldása (T₂ - T₁ = 66)</div>
              <div>(x² + 10x + 21) - (x² + 5x) = 66</div>
              <div>x² + 10x + 21 - x² - 5x = 66</div>
              <div>5x + 21 = 66 ⇒ 5x = 45 ⇒ x = 9 cm</div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-mono">
              <strong>Eredeti oldalak:</strong> a = 9 cm, b = 9 + 5 = 14 cm.
              <br />
              <strong>Eredeti kerület:</strong> K = 2(a + b) = 2(9 + 14) = 2 · 23 = 46 cm.
            </div>

            <p className="text-[11px] text-slate-500">
              <strong>Ellenőrzés:</strong> Eredeti terület: <MathText>9 \cdot 14 = 126</MathText> cm². Új oldalak: 12 cm és 16 cm. Új terület: <MathText>12 \cdot 16 = 192</MathText> cm². Különbség: <MathText>192 - 126 = 66</MathText> cm². Pontosan egyezik!
            </p>
          </div>
        </TheoryCard>

        {/* 2. MINTAPÉLDA */}
        <TheoryCard
          title="2. Mintapélda: Trapéz alapjainak meghatározása területről"
          badge="Trapéz modell"
          badgeColor="teal"
        >
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            <p className="font-medium text-slate-800 dark:text-slate-100">
              <strong>Feladat:</strong> Egy trapéz területe 84 cm², magassága 7 cm. Az egyik párhuzamos alapja 4 cm-rel hosszabb a másik alap kétszeresénél. Számítsd ki a trapéz két párhuzamos alapjának hosszát!
            </p>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono">
              <div className="font-bold text-teal-700 dark:text-teal-300">1. Lépés: Ismeretlenek és képlet</div>
              <div>Rövidebb alap: c = x</div>
              <div>Hosszabb alap: a = 2x + 4</div>
              <div>Magasság: m = 7 cm, Terület: T = 84 cm²</div>
              <div className="pt-1 font-bold text-blue-700 dark:text-blue-300">2. Lépés: Egyenlet felírása</div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>T =</span>
                <Fraction num="a + c" den="2" size="sm" />
                <span>· m ⇒ 84 =</span>
                <Fraction num="(2x + 4) + x" den="2" size="sm" />
                <span>· 7</span>
              </div>
              <div className="pt-1 font-bold text-indigo-700 dark:text-indigo-300">3. Lépés: Megoldás</div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>84 =</span>
                <Fraction num="3x + 4" den="2" size="sm" />
                <span>· 7</span>
                <span className="text-slate-400 mx-1">|</span>
                <span className="text-slate-500 text-[11px]">osztunk 7-tel</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>12 =</span>
                <Fraction num="3x + 4" den="2" size="sm" />
                <span className="text-slate-400 mx-1">|</span>
                <span className="text-slate-500 text-[11px]">szorzunk 2-vel</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>24 = 3x + 4 &implies; 3x = 20 &implies; x =</span>
                <Fraction num="20" den="3" size="sm" />
                <span>= 6</span>
                <Fraction num="2" den="3" size="sm" />
                <span>cm</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-300 dark:border-teal-800 text-teal-900 dark:text-teal-200 font-mono">
              <strong>Rövidebb alap (c):</strong> <Fraction num="20" den="3" size="sm" /> cm ≈ 6,67 cm.
              <br />
              <strong>Hosszabb alap (a):</strong> 2 · <Fraction num="20" den="3" size="sm" /> + 4 = <Fraction num="40" den="3" size="sm" /> + <Fraction num="12" den="3" size="sm" /> = <Fraction num="52" den="3" size="sm" /> cm ≈ 17,33 cm.
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};
