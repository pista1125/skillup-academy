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
  FileCode,
  Layers,
  HelpCircle,
  Hash,
  Scale
} from 'lucide-react';
import {
  TriangleClassificationSvg,
  TriangleInequalitySvg,
  TriangleAnglesSvg,
  IsoscelesAndEquilateralSvg
} from './TrianglesFigures';

interface TrianglesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const TrianglesTheory: React.FC<TrianglesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV HÁROMSZÖG LABOR ÁLLAPOTOK ---
  const [sideA, setSideA] = useState<number>(5);
  const [sideB, setSideB] = useState<number>(6);
  const [sideC, setSideC] = useState<number>(7);

  // Háromszög-egyenlőtlenség és típus kiértékelése
  const triangleAnalysis = useMemo(() => {
    const valid = sideA + sideB > sideC && sideA + sideC > sideB && sideB + sideC > sideA;

    if (!valid) {
      return {
        valid: false,
        typeName: 'Nem alkothat háromszöget',
        typeDesc: 'A háromszög-egyenlőtlenség sérül: a két rövidebb oldal összege nem éri el vagy csak eléri a leghosszabb oldalt.',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        perimeter: null,
        angles: null
      };
    }

    // Típus oldalak szerint
    let sideType = 'Általános';
    if (sideA === sideB && sideB === sideC) {
      sideType = 'Szabályos (egyenlő oldalú)';
    } else if (sideA === sideB || sideA === sideC || sideB === sideC) {
      sideType = 'Egyenlő szárú';
    }

    // Szögek számítása koszinusztétellel a vizualizációhoz
    const cosAlpha = (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC);
    const cosBeta = (sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC);
    const cosGamma = (sideA * sideA + sideB * sideB - sideC * sideC) / (2 * sideA * sideB);

    const degAlpha = Math.round((Math.acos(Math.max(-1, Math.min(1, cosAlpha))) * 180) / Math.PI);
    const degBeta = Math.round((Math.acos(Math.max(-1, Math.min(1, cosBeta))) * 180) / Math.PI);
    const degGamma = 180 - degAlpha - degBeta;

    // Típus szögek szerint
    let angleType = 'Hegyesszögű';
    const maxAngle = Math.max(degAlpha, degBeta, degGamma);
    if (maxAngle === 90) {
      angleType = 'Derékszögű';
    } else if (maxAngle > 90) {
      angleType = 'Tompaszögű';
    }

    const perimeter = sideA + sideB + sideC;

    return {
      valid: true,
      typeName: `${sideType}, ${angleType}`,
      typeDesc: `Sikeresen szerkeszthető háromszög. Belső szögei hozzávetőlegesen: α ≈ ${degAlpha}°, β ≈ ${degBeta}°, γ ≈ ${degGamma}°.`,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      perimeter,
      angles: { alpha: degAlpha, beta: degBeta, gamma: degGamma }
    };
  }, [sideA, sideB, sideC]);

  return (
    <TheoryTemplate
      title="2. Általános és szimmetrikus háromszögek"
      subtitle="Háromszögek csoportosítása, háromszög-egyenlőtlenség, belső és külső szögösszegek, szimmetriák"
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • 2. TÉMAKÖR"
      themeColor="blue"
      documentId="triangles-theory"
      pdfFilename="9_osztaly_altalanos_es_szimmetrikus_haromszogek.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Háromszögek Legfontosabb Alapszabályai',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-black">Háromszög-egyenlőtlenség:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">a + b &gt; c, a + c &gt; b, b + c &gt; a</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-black">Belső szögek összege:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">α + β + γ = 180°</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 dark:text-emerald-400 font-black">Külső szög tétele:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">α' = β + γ</span>
              <span className="text-slate-500 font-normal text-xs">(külső szögek összege = 360°)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-600 dark:text-purple-400 font-black">Egyenlő szárú háromszög:</span>
              <span className="font-mono text-slate-800 dark:text-slate-100">alapon fekvő szögek egyenlők (α = β)</span>
            </div>
          </div>
        )
      }}
    >
      {/* =========================================================================
          1. SZEKCIÓ: HÁROMSZÖGEK CSOPORTOSÍTÁSA
      ========================================================================= */}
      <TheorySection
        title="1. A háromszögek csoportosítása oldalak és szögek szerint"
        icon={<Triangle className="w-6 h-6 text-blue-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              A háromszög a sík három nem egy egyenesbe eső pontja (a csúcsok) által meghatározott szakaszok zárt sokszöge.
              Osztályozásuk két szempont – az oldalaik hossza és a belső szögeik nagysága – szerint történik:
            </p>
            <ul className="space-y-2 text-xs">
              <li className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                <strong className="text-blue-900 block text-sm">Oldalak hossza szerint:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                  <li><strong>Általános háromszög:</strong> mindhárom oldala különböző hosszúságú ($a \ne b \ne c$).</li>
                  <li><strong>Egyenlő szárú háromszög:</strong> legalább két oldala egyenlő ($a = b$). A harmadik oldal az <em>alap</em>, a két egyenlő oldal a <em>szár</em>.</li>
                  <li><strong>Szabályos (egyenlő oldalú) háromszög:</strong> mindhárom oldala egyenlő ($a = b = c$).</li>
                </ul>
              </li>
              <li className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                <strong className="text-emerald-900 block text-sm">Szögek nagysága szerint:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
                  <li><strong>Hegyesszögű háromszög:</strong> mindhárom belső szöge hegyesszög ($&lt; 90^\circ$).</li>
                  <li><strong>Derékszögű háromszög:</strong> pontosan egy derékszöge ($90^\circ$) van. A derékszöget bezáró oldalak a <em>befogók</em>, a szemközti leghosszabb oldal az <em>átfogó</em>.</li>
                  <li><strong>Tompaszögű háromszög:</strong> pontosan egy tompaszöge ($&gt; 90^\circ$) van.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <TriangleClassificationSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: A HÁROMSZÖG-EGYENLŐTLENSÉG
      ========================================================================= */}
      <TheorySection
        title="2. A háromszög-egyenlőtlenség (Szerkeszthetőség)"
        icon={<Scale className="w-6 h-6 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <p>
              Nem bármilyen három pozitív számból alkotható háromszög! A síkban a két pont közötti legrövidebb út az egyenes szakasz.
              Ezért ha két csúcs között a harmadik csúcson keresztül teszünk kitérőt, az út mindig hosszabb:
            </p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <span className="font-bold text-amber-900 block text-sm">A háromszög-egyenlőtlenség tétele:</span>
              <p className="text-xs text-slate-700 font-mono font-bold">
                a + b &gt; c &nbsp;&nbsp;és&nbsp;&nbsp; a + c &gt; b &nbsp;&nbsp;és&nbsp;&nbsp; b + c &gt; a
              </p>
            </div>
            <TheoryCallout variant="tip" title="Gyakorlati gyorsellenőrzési szabály">
              A feladatokban elegendő <strong>a két rövidebb oldal összegét</strong> összehasonlítani <strong>a leghosszabb oldallal</strong>!
              Ha a két rövidebb összege szigorúan nagyobb a legnagyobbnál, a háromszög biztosan létezik (szerkeszthető).
            </TheoryCallout>
          </div>
          <div className="flex justify-center">
            <TriangleInequalitySvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: BELSŐ ÉS KÜLSŐ SZÖGEK TÉTELEI
      ========================================================================= */}
      <TheorySection
        title="3. Belső és külső szögek összefüggései"
        icon={<Layers className="w-6 h-6 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
              <span className="font-bold text-blue-900 block text-sm">1. Belső szögek összege:</span>
              <p className="text-sm font-mono font-bold text-blue-700">α + β + γ = 180°</p>
              <p className="text-xs text-slate-600">
                Bármely háromszög három belső szögének összege pontosan egyenesszöget (180°) ad.
              </p>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
              <span className="font-bold text-rose-900 block text-sm">2. Külső szög tétele:</span>
              <p className="text-sm font-mono font-bold text-rose-700">α' = β + γ, &nbsp; β' = α + γ, &nbsp; γ' = α + β</p>
              <p className="text-xs text-slate-600">
                A háromszög bármely külső szöge egyenlő a két nem mellette fekvő belső szög összegével.
              </p>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
              <span className="font-bold text-purple-900 block text-sm">3. Külső szögek összege:</span>
              <p className="text-sm font-mono font-bold text-purple-700">α' + β' + γ' = 360°</p>
              <p className="text-xs text-slate-600">
                A csúcsonként vett három külső szög összege bármely konvex sokszögben (így háromszögben is) mindig 360°.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <TriangleAnglesSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: OLDALAK ÉS SZÖGEK KAPCSOLATA
      ========================================================================= */}
      <TheorySection
        title="4. Oldalak és szögek közötti relációk"
        icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />}
      >
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
          <p>
            Egy háromszögben az oldalak hossza és a velük szemközti szögek nagysága szoros összhangban áll egymással:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <strong className="text-slate-900 block text-sm mb-1">Nagyobb oldallal szemben nagyobb szög:</strong>
              <p className="font-mono font-bold text-blue-700 text-sm">a &gt; b ⟺ α &gt; β</p>
              <p className="text-xs text-slate-600 mt-1">
                A leghosszabb oldallal szemben mindig a legnagyobb belső szög, a legrövidebb oldallal szemben a legkisebb belső szög fekszik.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              <strong className="text-slate-900 block text-sm mb-1">Egyenlő oldalakkal szemben egyenlő szögek:</strong>
              <p className="font-mono font-bold text-purple-700 text-sm">a = b ⟺ α = β</p>
              <p className="text-xs text-slate-600 mt-1">
                Ha két oldal egyenlő, a szemközti szögek is egyenlők (ez az egyenlő szárú háromszög alaptétele).
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: EGYENLŐ SZÁRÚ ÉS SZABÁLYOS HÁROMSZÖG
      ========================================================================= */}
      <TheorySection
        title="5. Egyenlő szárú és szabályos háromszög szimmetriái"
        icon={<FileCode className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-1.5">
              <strong className="text-purple-900 block text-sm">Egyenlő szárú háromszög (a = b):</strong>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                <li>Az alapon fekvő két belső szög egyenlő: <code className="font-bold">α = β</code>.</li>
                <li><strong>1 szimmetriatengelye</strong> van (az alap felezőmerőlegese).</li>
                <li>A szárak metszéspontjából húzott magasságvonal (<code className="font-bold">m_c</code>) egyszerre <strong>szögfelező, súlyvonal és oldalfelező merőleges</strong>.</li>
              </ul>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 space-y-1.5">
              <strong className="text-blue-900 block text-sm">Szabályos háromszög (a = b = c):</strong>
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                <li>Mindhárom belső szöge pontosan <code className="font-bold">60°</code> (<code className="font-bold">180° / 3 = 60°</code>).</li>
                <li><strong>3 szimmetriatengelye</strong> van (a három oldalfelező merőleges).</li>
                <li>Középpontosan nem szimmetrikus, de 120°-os forgásszimmetriával rendelkezik.</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <IsoscelesAndEquilateralSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          INTERAKTÍV HÁROMSZÖG ÉPÍTŐ LABOR (A TANANYAG VÉGÉN)
      ========================================================================= */}
      <TheoryCard
        title="Interaktív Háromszög Építő & Egyenlőtlenség Labor"
        icon={<Sliders className="w-6 h-6 text-blue-600" />}
      >
        <div className="space-y-6">
          <p className="text-slate-600 leading-relaxed text-sm">
            Állítsd be az $a, b, c$ oldalak hosszát a csúszkákkal! Figyeld meg, hogy mikor teljesül a háromszög-egyenlőtlenség,
            milyen típusú háromszög jön létre, és mekkorák a számított belső szögei!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
            {/* Bal: Csúszkák */}
            <div className="md:col-span-6 space-y-4">
              {/* Oldal a */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>a oldal hossza:</span>
                  <span className="font-mono text-blue-600">{sideA} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={sideA}
                  onChange={(e) => setSideA(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Oldal b */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>b oldal hossza:</span>
                  <span className="font-mono text-emerald-600">{sideB} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={sideB}
                  onChange={(e) => setSideB(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Oldal c */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>c oldal hossza:</span>
                  <span className="font-mono text-purple-600">{sideC} cm</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={sideC}
                  onChange={(e) => setSideC(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>

              {/* Összegek vizsgálata */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5 font-mono">
                <div className={sideA + sideB > sideC ? 'text-emerald-700' : 'text-rose-600 font-bold'}>
                  a + b = {sideA + sideB} {sideA + sideB > sideC ? '>' : '≤'} c ({sideC}) {sideA + sideB > sideC ? '✓' : '✗'}
                </div>
                <div className={sideA + sideC > sideB ? 'text-emerald-700' : 'text-rose-600 font-bold'}>
                  a + c = {sideA + sideC} {sideA + sideC > sideB ? '>' : '≤'} b ({sideB}) {sideA + sideC > sideB ? '✓' : '✗'}
                </div>
                <div className={sideB + sideC > sideA ? 'text-emerald-700' : 'text-rose-600 font-bold'}>
                  b + c = {sideB + sideC} {sideB + sideC > sideA ? '>' : '≤'} a ({sideA}) {sideB + sideC > sideA ? '✓' : '✗'}
                </div>
              </div>
            </div>

            {/* Jobb: Eredmény kártya */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Szerkeszthetőség</span>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${triangleAnalysis.badgeColor}`}>
                    {triangleAnalysis.valid ? 'Létező Háromszög' : 'Nem Szerkeszthető'}
                  </span>
                </div>
                <div className="font-bold text-slate-800 text-sm">{triangleAnalysis.typeName}</div>
                <p className="text-xs text-slate-600">{triangleAnalysis.typeDesc}</p>
              </div>

              {triangleAnalysis.valid && triangleAnalysis.angles && (
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider block">Számított adatok</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Kerület:</span>
                      <span className="font-mono font-bold text-slate-800">{triangleAnalysis.perimeter} cm</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Belső szögek összege:</span>
                      <span className="font-mono font-bold text-blue-600">180°</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </TheoryCard>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS CSAPDÁK DOBOZ
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus hibák és érettségi csapdák a háromszögeknél"
        traps={[
          {
            wrong: 'Azt hisszük, hogy ha a + b = c, akkor még létrejön a háromszög.',
            correct: 'Ha a + b = c, a háromszög elfajul egyetlen szakasszá (a harmadik csúcs ráesik az oldalra). A háromszög létezéséhez a szigorú egyenlőtlenség szükséges: a + b > c!',
            explanation: 'Például a 3 cm, 4 cm, 7 cm oldalhosszak nem alkotnak háromszöget, mert 3 + 4 = 7.'
          },
          {
            wrong: 'Egy tompaszögű háromszögben több tompaszöget keresünk.',
            correct: 'Egy háromszögben legfeljebb EGYETLEN derékszög vagy tompaszög lehet, hiszen két tompaszög összege már meghaladná a 180°-ot!',
            explanation: 'A tompaszögű és a derékszögű háromszög másik két szöge mindig hegyesszög.'
          },
          {
            wrong: 'A külső szöget összetévesztjük a 360° - belső szöggel.',
            correct: 'A háromszög külső szöge a belső szög MELLÉKSZÖGE, tehát α\' = 180° - α, és NEM 360° - α!',
            explanation: 'A külső szög az oldal meghosszabbításával képzett szög, egy egyenest alkot a belső szöggel.'
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryCard
        title="Háromszögek Tulajdonságainak Gyors Áttekintője"
        icon={<Hash className="w-6 h-6 text-blue-600" />}
      >
        <TheoryTable
          headers={['Háromszög típusa', 'Oldalak kapcsolata', 'Szögek tulajdonsága', 'Szimmetriatengelyek száma']}
          rows={[
            ['Általános', 'a ≠ b ≠ c (minden oldal más)', 'α ≠ β ≠ γ', '0 szimmetriatengely'],
            ['Egyenlő szárú', 'Két oldal egyenlő (a = b)', 'Alapi szögek egyenlők (α = β)', '1 szimmetriatengely'],
            ['Szabályos (egyenlő oldalú)', 'Minden oldal egyenlő (a = b = c)', 'Minden szög pontosan 60°', '3 szimmetriatengely'],
            ['Derékszögű', 'Befogók és átfogó', 'Egy 90°-os szög (két hegyesszög összege 90°)', 'Általánosban 0, egyenlő szárúban 1'],
            ['Tompaszögű', 'Legnagyobb oldallal szemben tompaszög', 'Egy szög > 90° (másik kettő hegyesszög)', 'Általánosban 0, egyenlő szárúban 1']
          ]}
        />
      </TheoryCard>
    </TheoryTemplate>
  );
};

