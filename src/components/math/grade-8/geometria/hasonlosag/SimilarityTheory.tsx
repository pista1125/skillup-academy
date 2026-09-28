import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Maximize2,
  Minimize2,
  Compass,
  Shapes,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sun,
  Trees,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface SimilarityTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type ExperimentTab = 'scale' | 'shadow' | 'midline';

export const SimilarityTheory: React.FC<SimilarityTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Experiment selector
  const [selectedTab, setSelectedTab] = useState<ExperimentTab>('scale');
  // Dynamic scale factor k (0.5 to 2.5)
  const [scaleK, setScaleK] = useState<number>(2);

  // Self-test state
  const [selfTestAnswer, setSelfTestAnswer] = useState<number | null>(null);
  const [selfTestSubmitted, setSelfTestSubmitted] = useState<boolean>(false);

  // Derived metrics for scale experiment
  const baseA = 4;
  const baseB = 3;
  const baseC = 5;
  const baseP = baseA + baseB + baseC; // 12 cm
  const baseArea = (baseA * baseB) / 2; // 6 cm²

  const scaledA = (baseA * scaleK).toFixed(1);
  const scaledB = (baseB * scaleK).toFixed(1);
  const scaledC = (baseC * scaleK).toFixed(1);
  const scaledP = (baseP * scaleK).toFixed(1);
  const scaledArea = (baseArea * scaleK * scaleK).toFixed(1);

  return (
    <TheoryTemplate
      documentId="grade-8-geometria-hasonlosag"
      pdfFilename="8_osztaly_geometria_hasonlosag_tananyag.pdf"
      title="4. Hasonlóság"
      subtitle="A geometriai hasonlóság fogalma, a hasonlósági arány (k), háromszögek hasonlósági alapesetei, kerületek és területek aránya"
      emoji="📐"
      topicBadge="8. Osztály • II. Témakör: Geometria"
      badgeText="8. Osztály • Matematika"
      estimatedReadTime="14 perc"
      quickRule={{
        label: "Hasonlósági Főösszefüggések",
        formula: "|A'B'| = k · |AB|   |   K' = k · K   |   T' = k² · T"
      }}
      themeColor="teal"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* SECTION 1: A Hasonlóság Fogalma és a Hasonlósági Arány */}
      <TheorySection
        number={1}
        title="A geometriai hasonlóság fogalma és a hasonlósági arány (k)"
        badge="Alapfogalmak és invariánsok"
      >
        <p className="text-slate-700 leading-relaxed text-base">
          A mindennapi életben gyakran mondjuk két dologra, hogy „hasonlóak”, ha alakjuk megegyezik,
          de a méretük eltérő – például egy épület és annak makettje, egy fénykép és annak nagyítása,
          vagy egy térkép és a valóság. A matematikában a <strong>geometriai hasonlóság</strong> szigorú,
          pontosan definiált transzformáció.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="A hasonlósági leképezés definíciója"
            icon={<Shapes className="w-5 h-5 text-blue-600" />}
            color="blue"
          >
            <p className="text-sm text-slate-600 mb-2">
              Egy geometriai leképezést <strong>hasonlósági transzformációnak</strong> nevezünk, ha
              bármely két <MathText>{"P"}</MathText> és <MathText>{"Q"}</MathText> pont távolságához képest
              a megfelelő <MathText>{"P'"}</MathText> és <MathText>{"Q'"}</MathText> képpontok távolsága
              mindig ugyanannyiszorosára változik:
            </p>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center font-bold text-blue-900 text-base">
              <MathText>{"|P'Q'| = k \\cdot |PQ| \\quad (k > 0)"}</MathText>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              A pozitív <MathText>{"k"}</MathText> szám a <strong>hasonlóság aránya</strong> (hasonlósági arányszám).
            </p>
          </TheoryCard>

          <TheoryCard
            title="A hasonlósági arány (k) esetei"
            icon={<Maximize2 className="w-5 h-5 text-teal-600" />}
            color="teal"
          >
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                <strong>{"k > 1"}: Nagyítás</strong> — A képalakzat minden szakasza hosszabb az eredetinél.
              </div>
              <div className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-900">
                <strong>{"k = 1"}: Egybevágóság!</strong> — Az egybevágóság a hasonlóság speciális esete (<MathText>{"|P'Q'| = |PQ|"}</MathText>).
              </div>
              <div className="p-2 bg-indigo-50 border border-indigo-200 rounded text-indigo-900">
                <strong>{"0 < k < 1"}: Kicsinyítés</strong> — A képalakzat minden szakasza rövidebb az eredetinél.
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout
          title="Invariánsok: Mi változik és mi marad szigorúan változatlan?"
          icon={<Sparkles className="w-5 h-5 text-purple-600" />}
          color="purple"
        >
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
            <li>
              <strong>Szögtartás:</strong> A megfelelő belső szögek nagysága <em>pontosan egyenlő marad</em> (<MathText>{"\\alpha' = \\alpha, \\beta' = \\beta, \\gamma' = \\gamma"}</MathText>). A szögek <strong>nem</strong> szorzódnak meg <MathText>{"k"}</MathText>-val!
            </li>
            <li>
              <strong>Alaktartás:</strong> A hasonlóság megőrzi az alakzat formáját (kör képe kör, négyzet képe négyzet, derékszögű háromszög képe derékszögű háromszög).
            </li>
            <li>
              <strong>Egyenestartás és párhuzamosságtartás:</strong> Egyenes képe egyenes, párhuzamos egyenesek képe párhuzamos egyenes.
            </li>
            <li>
              <strong>Aránytartás:</strong> Bármely két szakasz aránya az alakzaton belül megegyezik a képalakzat megfelelő szakaszainak arányával.
            </li>
          </ul>
        </TheoryCallout>
      </TheorySection>

      {/* SECTION 2: Háromszögek Hasonlóságának Alapesetei */}
      <TheorySection
        number={2}
        title="A háromszögek hasonlóságának 4 alapesete"
        badge="Geometriai kritériumok"
      >
        <p className="text-slate-700 leading-relaxed text-base">
          Ahogy az egybevágóságnál, a háromszögek hasonlóságának igazolásához sincs szükség mind a hat adat
          (3 oldal és 3 szög) egyenkénti ellenőrzésére. Elegendő az alábbi <strong>4 alapeset</strong> valamelyikének teljesülése:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <GeometryFigureCard
            title="1. Két szög egyenlő (sz-sz alapeset)"
            description="Két-két megfelelő szögük egyenlő. Mivel a belső szögek összege 180°, a harmadik szög automatikusan egyenlő."
            figure={
              <svg viewBox="0 0 200 90" className="w-full h-24 mx-auto">
                <polygon points="20,75 70,75 50,25" fill="#eff6ff" className="stroke-blue-600 stroke-[1.8]" />
                <path d="M 32 75 A 12 12 0 0 0 27 63" fill="none" className="stroke-amber-500 stroke-[1.5]" />
                <path d="M 60 75 A 12 12 0 0 1 56 65" fill="none" className="stroke-emerald-500 stroke-[1.5]" />
                <text x="33" y="72" className="text-[8px] font-bold fill-amber-700">α</text>
                <text x="56" y="72" className="text-[8px] font-bold fill-emerald-700">β</text>

                <polygon points="100,80 185,80 151,15" fill="#eff6ff" className="stroke-blue-600 stroke-[1.8]" />
                <path d="M 120 80 A 20 20 0 0 0 112 60" fill="none" className="stroke-amber-500 stroke-[1.5]" />
                <path d="M 168 80 A 20 20 0 0 1 161 63" fill="none" className="stroke-emerald-500 stroke-[1.5]" />
                <text x="122" y="76" className="text-[9px] font-bold fill-amber-700">α' = α</text>
                <text x="156" y="76" className="text-[9px] font-bold fill-emerald-700">β' = β</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="2. Három oldal aránya páronként egyenlő (o-o-o)"
            description="Mindhárom megfelelő oldalpár aránya azonos k konstanssal egyenlő: a'/a = b'/b = c'/c = k."
            figure={
              <svg viewBox="0 0 200 90" className="w-full h-24 mx-auto">
                <polygon points="25,75 75,75 50,30" fill="#f0fdf4" className="stroke-emerald-600 stroke-[1.8]" />
                <text x="45" y="85" className="text-[8px] font-bold fill-emerald-800">c</text>
                <text x="28" y="50" className="text-[8px] font-bold fill-emerald-800">b</text>
                <text x="66" y="50" className="text-[8px] font-bold fill-emerald-800">a</text>

                <polygon points="105,80 185,80 145,15" fill="#f0fdf4" className="stroke-emerald-600 stroke-[1.8]" />
                <text x="140" y="88" className="text-[8px] font-bold fill-emerald-800">k·c</text>
                <text x="115" y="45" className="text-[8px] font-bold fill-emerald-800">k·b</text>
                <text x="168" y="45" className="text-[8px] font-bold fill-emerald-800">k·a</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="3. Két oldal aránya és közbezárt szög (o-sz-o)"
            description="Két-két oldal aránya megegyezik (a'/a = b'/b = k), és a két oldal által bezárt szög pontosan egyenlő (γ' = γ)."
            figure={
              <svg viewBox="0 0 200 90" className="w-full h-24 mx-auto">
                <polygon points="25,75 75,75 40,25" fill="#faf5ff" className="stroke-purple-600 stroke-[1.8]" />
                <path d="M 43 35 A 12 12 0 0 1 48 30" fill="none" className="stroke-rose-500 stroke-[1.5]" />
                <text x="46" y="43" className="text-[8px] font-bold fill-rose-700">γ</text>
                <text x="24" y="48" className="text-[8px] font-bold fill-purple-800">b</text>
                <text x="58" y="48" className="text-[8px] font-bold fill-purple-800">a</text>

                <polygon points="105,80 185,80 129,15" fill="#faf5ff" className="stroke-purple-600 stroke-[1.8]" />
                <path d="M 133 30 A 18 18 0 0 1 141 22" fill="none" className="stroke-rose-500 stroke-[1.5]" />
                <text x="136" y="40" className="text-[8px] font-bold fill-rose-700">γ' = γ</text>
                <text x="108" y="45" className="text-[8px] font-bold fill-purple-800">k·b</text>
                <text x="162" y="45" className="text-[8px] font-bold fill-purple-800">k·a</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="4. Két oldal aránya és nagyobbik szöge (d-o-o)"
            description="Két-két oldal aránya megegyezik, és a nagyobbik oldallal szemközti megfelelő szögük egyenlő."
            figure={
              <svg viewBox="0 0 200 90" className="w-full h-24 mx-auto">
                <polygon points="20,75 80,75 55,25" fill="#fff7ed" className="stroke-amber-600 stroke-[1.8]" />
                <path d="M 32 75 A 14 14 0 0 0 28 62" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
                <text x="35" y="70" className="text-[8px] font-bold fill-indigo-700">α</text>
                <text x="70" y="48" className="text-[8px] font-bold fill-amber-800">a (nagyobb)</text>

                <polygon points="105,80 190,80 155,20" fill="#fff7ed" className="stroke-amber-600 stroke-[1.8]" />
                <path d="M 122 80 A 20 20 0 0 0 116 62" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
                <text x="124" y="75" className="text-[9px] font-bold fill-indigo-700">α' = α</text>
                <text x="168" y="45" className="text-[8px] font-bold fill-amber-800">k·a</text>
              </svg>
            }
          />
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Nevezetes mindig hasonló alakzatok:
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            • <strong>Bármely két szabályos háromszög</strong> hasonló (minden szögük 60°).<br />
            • <strong>Bármely két kör</strong> hasonló.<br />
            • <strong>Bármely két négyzet</strong> hasonló.<br />
            • <strong>Két derékszögű háromszög</strong> hasonló, ha egyetlen hegyesszögük megegyezik (pl. 30°–60°–90°).<br />
            • <strong>Két egyenlő szárú háromszög</strong> hasonló, ha a szárszögük vagy az alapon fekvő szögük megegyezik.
          </p>
        </div>
      </TheorySection>

      {/* SECTION 3: Interaktív Hasonlósági Labor */}
      <TheorySection
        number={3}
        title="Interaktív hasonlósági laboratórium"
        badge="Dinamikus kísérlet és szimuláció"
      >
        <p className="text-slate-700 leading-relaxed text-base mb-4">
          Próbáld ki a lenti interaktív kísérleteket! Figyeld meg, hogyan változik az alakzatok mérete,
          kerülete és területe a hasonlósági arányszám (<MathText>{"k"}</MathText>) függvényében!
        </p>

        {/* Experiment tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedTab('scale')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedTab === 'scale'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            1. Skálázási labor (k-szorzó)
          </button>
          <button
            onClick={() => setSelectedTab('shadow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedTab === 'shadow'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            2. Árnyékmódszer (Fa magassága)
          </button>
          <button
            onClick={() => setSelectedTab('midline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedTab === 'midline'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            3. Háromszög-középvonal (k = 1/2)
          </button>
        </div>

        {/* TAB 1: SCALE EXPERIMENT */}
        {selectedTab === 'scale' && (
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Dinamikus derékszögű háromszög skálázása
                </h4>
                <p className="text-xs text-slate-500">
                  Eredeti befogók: <MathText>{"a = 4\\text{ cm}, b = 3\\text{ cm}, c = 5\\text{ cm}"}</MathText>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">Hasonlósági arány:</span>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded font-black text-sm">
                  k = {scaleK}
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="mb-6 max-w-md mx-auto">
              <label className="block text-xs font-semibold text-slate-600 mb-2 text-center">
                Húzd a csúszkát a hasonlósági arány módosításához (0.5 – 2.5):
              </label>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.5"
                value={scaleK}
                onChange={(e) => setScaleK(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1 mt-1">
                <span>0.5 (Kicsinyítés)</span>
                <span>1.0 (Egybevágó)</span>
                <span>1.5</span>
                <span>2.0</span>
                <span>2.5 (Nagyítás)</span>
              </div>
            </div>

            {/* Visual SVG Comparison */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-6 flex flex-col md:flex-row items-center justify-around gap-4">
              <div className="text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Eredeti háromszög (k = 1)
                </span>
                <svg viewBox="0 0 120 100" className="w-28 h-24 mx-auto">
                  <polygon points="20,80 80,80 20,35" fill="#eff6ff" className="stroke-blue-600 stroke-[2]" />
                  <path d="M 20 70 L 30 70 L 30 80" fill="none" className="stroke-blue-700 stroke-[1]" />
                  <text x="45" y="92" className="text-[9px] font-bold fill-blue-800">a = 4 cm</text>
                  <text x="2" y="60" className="text-[9px] font-bold fill-blue-800">b = 3 cm</text>
                  <text x="55" y="52" className="text-[9px] font-bold fill-blue-800">c = 5 cm</text>
                </svg>
                <div className="text-xs font-semibold text-slate-700 mt-2">
                  <p>Kerület: <span className="font-bold">12 cm</span></p>
                  <p>Terület: <span className="font-bold text-blue-700">6 cm²</span></p>
                </div>
              </div>

              <div className="text-center text-slate-400 font-black text-lg">
                ➔
              </div>

              <div className="text-center">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  Hasonló háromszög (k = {scaleK})
                </span>
                <svg viewBox="0 0 180 140" className="w-40 h-32 mx-auto">
                  <polygon
                    points={`20,110 ${20 + 25 * scaleK * 1.3},110 20,${110 - 20 * scaleK * 1.3}`}
                    fill="#e0e7ff"
                    className="stroke-indigo-600 stroke-[2]"
                  />
                  <path
                    d={`M 20 ${110 - 10} L 30 ${110 - 10} L 30 110`}
                    fill="none"
                    className="stroke-indigo-700 stroke-[1]"
                  />
                  <text x={20 + 10 * scaleK} y="125" className="text-[9px] font-bold fill-indigo-900">
                    a' = {scaledA} cm
                  </text>
                  <text x="0" y={110 - 10 * scaleK} className="text-[9px] font-bold fill-indigo-900">
                    b' = {scaledB} cm
                  </text>
                  <text x={20 + 15 * scaleK} y={110 - 12 * scaleK} className="text-[9px] font-bold fill-indigo-900">
                    c' = {scaledC} cm
                  </text>
                </svg>
                <div className="text-xs font-semibold text-slate-700 mt-2">
                  <p>
                    Kerület: <span className="font-bold text-indigo-700">{scaledP} cm</span>{' '}
                    <span className="text-slate-400">({scaleK}·12)</span>
                  </p>
                  <p>
                    Terület:{' '}
                    <span className="font-bold text-rose-600">{scaledArea} cm²</span>{' '}
                    <span className="text-rose-400">
                      ({scaleK}² = {scaleK * scaleK}·6)
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Comparison summary box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-slate-500 font-semibold block">Oldalak aránya:</span>
                <span className="text-blue-900 font-bold text-sm">
                  k = {scaleK}
                </span>
              </div>
              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                <span className="text-slate-500 font-semibold block">Kerületek aránya (K'/K):</span>
                <span className="text-indigo-900 font-bold text-sm">
                  k = {scaleK}
                </span>
              </div>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
                <span className="text-slate-500 font-semibold block">Területek aránya (T'/T):</span>
                <span className="text-rose-700 font-black text-sm">
                  k² = {(scaleK * scaleK).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SHADOW EXPERIMENT */}
        {selectedTab === 'shadow' && (
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              Thalész-féle magasságmérés az árnyékok segítségével
            </h4>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Az ókori matematikus, Milétoszi Thalész a piramisok magasságát úgy határozta meg, hogy megvárta
              azt a napszakot, amikor az ő saját árnyéka pontosan akkora volt, mint a magassága.
              Általános esetben: a napsugarak párhuzamos érkezése miatt a bot és a fa által vetett árnyék
              <strong> hasonló derékszögű háromszögeket</strong> alkot (sz-sz alapeset: 90° és a beesési szög).
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
              <svg viewBox="0 0 320 120" className="w-full h-36 mx-auto">
                {/* Sun */}
                <circle cx="20" cy="20" r="10" className="fill-amber-400 stroke-amber-500 stroke-[1.5]" />
                <line x1="20" y1="5" x2="20" y2="0" className="stroke-amber-400 stroke-[1.5]" />
                <line x1="20" y1="35" x2="20" y2="40" className="stroke-amber-400 stroke-[1.5]" />
                <line x1="5" y1="20" x2="0" y2="20" className="stroke-amber-400 stroke-[1.5]" />
                <line x1="35" y1="20" x2="40" y2="20" className="stroke-amber-400 stroke-[1.5]" />

                {/* Ground */}
                <line x1="10" y1="105" x2="310" y2="105" className="stroke-slate-400 stroke-[2]" />

                {/* Stick */}
                <line x1="80" y1="105" x2="80" y2="70" className="stroke-amber-800 stroke-[3] stroke-linecap-round" />
                <line x1="80" y1="105" x2="115" y2="105" className="stroke-slate-700 stroke-[3] stroke-linecap-round" />
                <line x1="80" y1="70" x2="115" y2="105" className="stroke-amber-400 stroke-[1.5] stroke-dasharray-[2,2]" />
                <text x="82" y="85" className="text-[7px] font-bold fill-amber-900">m = 1 m</text>
                <text x="85" y="113" className="text-[7px] font-bold fill-slate-700">á = 1.5 m</text>

                {/* Tree */}
                <rect x="220" y="45" width="8" height="60" fill="#78350f" />
                <circle cx="224" cy="35" r="22" fill="#15803d" />
                <line x1="224" y1="105" x2="305" y2="105" className="stroke-slate-700 stroke-[3] stroke-linecap-round" />
                <line x1="224" y1="15" x2="305" y2="105" className="stroke-amber-400 stroke-[1.5] stroke-dasharray-[2,2]" />
                <text x="232" y="60" className="text-[8px] font-bold fill-emerald-950">M = ?</text>
                <text x="245" y="113" className="text-[7px] font-bold fill-slate-700">Á = 9 m</text>
              </svg>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 space-y-1">
              <p><strong>A hasonlóság felírása:</strong> A bot és a fa árnyékháromszögei hasonlók (<MathText>{"\\triangle \\sim \\triangle'"}</MathText>).</p>
              <p>
                Hasonlósági arány az árnyékokból: <MathText>{"k = \\frac{\\text{Fa árnyéka}}{\\text{Bot árnyéka}} = \\frac{9\\text{ m}}{1.5\\text{ m}} = 6"}</MathText>.
              </p>
              <p>
                A fa magassága tehát a bot magasságának 6-szorosa: <MathText>{"M = 6 \\cdot 1\\text{ m} = 6\\text{ m}"}</MathText>!
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: MIDLINE EXPERIMENT */}
        {selectedTab === 'midline' && (
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              A háromszög középvonala mint k = 1/2 arányú hasonlóság
            </h4>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              A háromszög két oldalának felezőpontját összekötő szakaszt <strong>középvonalnak</strong> nevezzük.
              A középvonal párhuzamos a harmadik oldallal és fele akkora hosszú, mint az.
              Ezáltal egy <MathText>{"k = \\frac{1}{2}"}</MathText> hasonlósági arányú kisebb háromszöget vág le a csúcsnál!
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
              <svg viewBox="0 0 240 120" className="w-full h-36 mx-auto">
                <polygon points="30,105 210,105 120,20" fill="#f8fafc" className="stroke-slate-600 stroke-[2]" />
                <polygon points="75,62.5 165,62.5 120,20" fill="#ede9fe" className="stroke-purple-600 stroke-[2]" />
                <circle cx="75" cy="62.5" r="3" className="fill-purple-700" />
                <circle cx="165" cy="62.5" r="3" className="fill-purple-700" />
                <text x="60" y="65" className="text-[8px] font-bold fill-purple-900">F₁</text>
                <text x="170" y="65" className="text-[8px] font-bold fill-purple-900">F₂</text>
                <text x="110" y="58" className="text-[8px] font-bold fill-purple-900">c/2</text>
                <text x="115" y="115" className="text-[8px] font-bold fill-slate-800">c</text>
                <text x="110" y="38" className="text-[9px] font-bold fill-purple-700">T/4</text>
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-950">
                <strong>Kerület aránya:</strong><br />
                Minden oldal feleződött (<MathText>{"k = 1/2"}</MathText>), így a levágott kis háromszög kerülete pontosan a fele az eredetiének: <MathText>{"K' = \\frac{1}{2}K"}</MathText>.
              </div>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-950">
                <strong>Terület aránya:</strong><br />
                A terület a hasonlósági arány négyzetével csökken: <MathText>{"k^2 = (1/2)^2 = 1/4"}</MathText>. A levágott háromszög területe pontosan a <strong>negyede</strong> az eredeti háromszög területének!
              </div>
            </div>
          </div>
        )}
      </TheorySection>

      {/* SECTION 4: Kerület, Terület Aránya és Buktatók */}
      <TheorySection
        number={4}
        title="Kerületek, területek aránya és gyakori buktatók"
        badge="Fontos szabályok és tévhitek"
      >
        <p className="text-slate-700 leading-relaxed text-base mb-4">
          A geometriai feladatok és a felvételi leggyakoribb hibái abból adódnak, hogy a diákok
          a lineáris méretek (oldalak, kerület) arányát összekeverik a másodfokú (terület) aránnyal.
        </p>

        {/* COMPARISON TABLE */}
        <TheoryTable
          headers={['Geometriai mennyiség', 'Hasonlósági arány', 'Képlet', 'Példa (k = 3 nagyítás)']}
          rows={[
            ['Megfelelő oldalak, magasságok', 'k-szoros', "|A'B'| = k · |AB|", '3-szorosára nő (pl. 2 cm ➔ 6 cm)'],
            ['Belső szögek', '1-szeres (VÁLTOZATLAN!)', "α' = α", 'Pontosan ugyanakkora marad (pl. 40° ➔ 40°)'],
            ['Kerület (K)', 'k-szoros', "K' = k · K", '3-szorosára nő (pl. 10 cm ➔ 30 cm)'],
            ['Terület (T)', 'k²-szeres (NÉGYZETES!)', "T' = k² · T", '3² = 9-szeresére nő! (pl. 5 cm² ➔ 45 cm²)'],
            ['Térfogat (V, tértesteknél)', 'k³-szoros (KÖBÖS!)', "V' = k³ · V", '3³ = 27-szeresére nő! (pl. 2 l ➔ 54 l)']
          ]}
        />

        {/* TRAP BOX */}
        <div className="mt-6">
          <TheoryTrapBox
            wrong="„Ha egy háromszög minden oldalát megduplázzuk (k = 2), akkor a területe is a duplájára (2-szeresére) nő.”"
            correct="Ha az oldalak a 2-szeresükre nőnek, a terület a 2² = 4-szeresére nő!"
            explanation="A terület két egymásra merőleges lineáris méret (pl. alap · magasság / 2) szorzata. Mivel mind az alap, mind a magasság 2-szeresére nőtt, a terület szorzata 2 · 2 = 4-szeres lesz."
          />
        </div>

        <div className="mt-4">
          <TheoryTrapBox
            wrong="„Ha egy alakzatot kétszeresére nagyítunk (k = 2), a 30°-os szöge 60°-osra nő.”"
            correct="A hasonlóságnál a szögek SZIGORÚAN VÁLTOZATLANOK maradnak (szögtartás: 30° ➔ 30°)!"
            explanation="A hasonlósági transzformáció szögtartó. Ha a szögek megváltoznának, az alakzat formája torzulna, nem lenne hasonló. A nagyításnál csak a vonalak hossza nő, az általuk bezárt szög nem."
          />
        </div>
      </TheorySection>

      {/* SECTION 5: Interaktív Önellenőrző Kérdés */}
      <TheorySection
        number={5}
        title="Interaktív önellenőrzés"
        badge="Teszteld a tudásod!"
      >
        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            Gondolkodtató kérdés:
          </h4>
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            Egy háromszög területe <MathText>{"T = 18\\text{ cm}^2"}</MathText>. Egy hozzá hasonló másik háromszög területe{' '}
            <MathText>{"T' = 72\\text{ cm}^2"}</MathText>. Hányszorosa a nagyobbik háromszög kerülete a kisebbik háromszög kerületének?
          </p>

          <div className="space-y-2 mb-4">
            {[
              { id: 0, text: '4-szerese (k = 72 / 18 = 4)' },
              { id: 1, text: '2-szerese (k = √(72 / 18) = √4 = 2)' },
              { id: 2, text: '16-szorosa (k² = 16)' },
              { id: 3, text: 'A kerületek aránya nem határozható meg az oldalak hossza nélkül.' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  if (!selfTestSubmitted) setSelfTestAnswer(opt.id);
                }}
                disabled={selfTestSubmitted}
                className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
                  selfTestAnswer === opt.id
                    ? 'border-blue-600 bg-blue-100/70 text-blue-950 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className="inline-block w-6 font-bold text-blue-700">
                  {String.fromCharCode(65 + opt.id)}:
                </span>
                {opt.text}
              </button>
            ))}
          </div>

          {!selfTestSubmitted ? (
            <Button
              onClick={() => {
                if (selfTestAnswer !== null) setSelfTestSubmitted(true);
              }}
              disabled={selfTestAnswer === null}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2"
            >
              Válasz ellenőrzése
            </Button>
          ) : (
            <div
              className={`p-4 rounded-lg text-xs leading-relaxed border ${
                selfTestAnswer === 1
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {selfTestAnswer === 1 ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Helyes válasz! (B)
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Sajnos nem helyes! A helyes válasz a B (2-szerese).
                  </>
                )}
              </div>
              <p>
                <strong>Magyarázat:</strong> A területek aránya a hasonlósági arány négyzete:{' '}
                <MathText>{"k^2 = \\frac{T'}{T} = \\frac{72}{18} = 4"}</MathText>. Ebből a hasonlóság aránya{' '}
                <MathText>{"k = \\sqrt{4} = 2"}</MathText>. Mivel a kerületek aránya megegyezik a hasonlósági aránnyal (<MathText>{"K'/K = k"}</MathText>), a nagyobbik háromszög kerülete pontosan <strong>2-szerese</strong> a kisebbikének!
              </p>
              <Button
                onClick={() => {
                  setSelfTestSubmitted(false);
                  setSelfTestAnswer(null);
                }}
                variant="outline"
                className="mt-3 text-xs h-7 border-slate-300"
              >
                Újrapróbálkozás
              </Button>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SimilarityTheory;
