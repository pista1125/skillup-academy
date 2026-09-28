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
  Target,
  Maximize2,
  Minimize2,
  Compass,
  Shapes,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Sun,
  Layers,
  ArrowRightLeft,
  Eye,
  Sliders,
  RotateCw,
  Lightbulb
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface CentralSimilarityTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const CentralSimilarityTheory: React.FC<CentralSimilarityTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Dynamic scale factor lambda (-2.5 to 2.5, skipping 0)
  const [lambda, setLambda] = useState<number>(1.5);

  // Self-test states
  const [selfTestAnswer, setSelfTestAnswer] = useState<number | null>(null);
  const [selfTestSubmitted, setSelfTestSubmitted] = useState<boolean>(false);

  // Center point O
  const Ox = 210;
  const Oy = 135;

  // Base triangle A, B, C coordinates
  const Ax = 260;
  const Ay = 100;
  const Bx = 295;
  const By = 155;
  const Cx = 245;
  const Cy = 165;

  // Image points A', B', C'
  const Apx = Ox + lambda * (Ax - Ox);
  const Apy = Oy + lambda * (Ay - Oy);
  const Bpx = Ox + lambda * (Bx - Ox);
  const Bpy = Oy + lambda * (By - Oy);
  const Cpx = Ox + lambda * (Cx - Ox);
  const Cpy = Oy + lambda * (Cy - Oy);

  // Base distance OA
  const distOA = Math.sqrt((Ax - Ox) ** 2 + (Ay - Oy) ** 2);
  const distOAp = Math.sqrt((Apx - Ox) ** 2 + (Apy - Oy) ** 2);

  // Quick preset handler
  const setPreset = (val: number) => {
    setLambda(val);
  };

  return (
    <TheoryTemplate
      documentId="grade-8-geometria-kozeppontos-hasonlosag"
      pdfFilename="8_osztaly_geometria_kozeppontos_hasonlosag_tananyag.pdf"
      title="5. A középpontos hasonlóság"
      subtitle="A középpontos hasonlóság fogalma, a hasonlósági arány (λ), tulajdonságai, párhuzamos szelők és sugarak tétele"
      emoji="🎯"
      topicBadge="8. Osztály • II. Témakör: Geometria"
      badgeText="8. Osztály • Matematika"
      estimatedReadTime="15 perc"
      quickRule={{
        label: "Középpontos Hasonlóság Alapképlete",
        formula: "OP' = |λ| · OP   |   e' ∥ e   |   λ = -1 ⟹ Középpontos tükrözés"
      }}
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* SECTION 1: A Középpontos Hasonlóság Fogalma és a Centrum */}
      <TheorySection
        number={1}
        title="A középpontos hasonlóság fogalma és a centrum (O)"
        badge="Definíció és geometriai felépítés"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          Az általános geometriai hasonlóság tetszőleges pontpár távolságát arányosan változtatja meg.
          A <strong>középpontos hasonlóság</strong> ennél speciálisabb, szigorúan kötött geometriai leképezés:
          minden pont elmozdulását egy kitüntetett ponthoz, a <strong>hasonlóság középpontjához (centrumához, <MathText>{"O"}</MathText>)</strong> rögzíti,
          és a pontokat a centrumból induló sugarak mentén helyezi át.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="A középpontos hasonlóság pontos definíciója"
            icon={<Target className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Adott a síkban egy <MathText>{"O"}</MathText> pont (<strong>centrum</strong>) és egy{' '}
              <MathText>{"\\lambda \\neq 0"}</MathText> valós szám (<strong>hasonlósági arányszám</strong>).
              A leképezés a sík bármely <MathText>{"P"}</MathText> pontjához olyan <MathText>{"P'"}</MathText> képpontot rendel, amelyre:
            </p>
            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <MathText>{"P'"}</MathText> illeszkedik az <MathText>{"OP"}</MathText> egyenesre.
              </li>
              <li>
                A centrumtól mért távolság: <MathText>{"OP' = |\\lambda| \\cdot OP"}</MathText>.
              </li>
              <li>
                Az <MathText>{"O"}</MathText> centrum képe önmaga: <MathText>{"O' = O"}</MathText> (<strong>fixpont</strong>).
              </li>
            </ul>
            <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg text-center font-bold text-indigo-900 dark:text-indigo-200 text-sm">
              <MathText>{"OP' = |\\lambda| \\cdot OP \\quad (\\lambda \\neq 0)"}</MathText>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A λ arányszám előjelének jelentése"
            icon={<ArrowRightLeft className="w-5 h-5 text-violet-600" />}
            color="violet"
          >
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-900 dark:text-emerald-200">
                <strong>Pozitív arány (<MathText>{"\\lambda > 0"}</MathText>):</strong>
                <p className="text-xs mt-1 text-slate-600 dark:text-slate-400">
                  <MathText>{"P'"}</MathText> az <MathText>{"O"}</MathText>-ból kiinduló <MathText>{"OP"}</MathText> <strong>félegyenesen</strong> van.
                  Az eredeti pont és a képpont a centrum azonos oldalán fekszik.
                </p>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-900 dark:text-amber-200">
                <strong>Negatív arány (<MathText>{"\\lambda < 0"}</MathText>):</strong>
                <p className="text-xs mt-1 text-slate-600 dark:text-slate-400">
                  <MathText>{"P'"}</MathText> az <MathText>{"OP"}</MathText> <strong>ellentétes irányú félegyenesén</strong> van.
                  Az <MathText>{"O"}</MathText> pont a <MathText>{"P"}</MathText> és <MathText>{"P'"}</MathText> pontok között helyezkedik el (180°-os átfordulás).
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Visual illustration of positive and negative lambda */}
        <div className="my-6 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 text-center">
            A képpont elhelyezkedése a centrumból induló egyenesen
          </h4>
          <svg viewBox="0 0 540 120" className="w-full max-w-2xl mx-auto h-28 sm:h-36">
            {/* Axis line */}
            <line x1="30" y1="60" x2="510" y2="60" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Center O */}
            <circle cx="240" cy="60" r="6" fill="#4f46e5" />
            <text x="240" y="42" textAnchor="middle" className="text-[12px] font-black fill-indigo-600 dark:fill-indigo-400">O (Centrum)</text>
            
            {/* Original point P */}
            <circle cx="340" cy="60" r="5" fill="#0284c7" />
            <text x="340" y="45" textAnchor="middle" className="text-[11px] font-bold fill-sky-600 dark:fill-sky-400">P</text>
            <text x="290" y="78" textAnchor="middle" className="text-[9px] font-semibold fill-slate-500">OP = 4 cm</text>

            {/* P' with lambda = +1.5 */}
            <circle cx="390" cy="60" r="5" fill="#10b981" />
            <text x="390" y="45" textAnchor="middle" className="text-[11px] font-bold fill-emerald-600 dark:fill-emerald-400">P' (λ = 1,5)</text>
            <text x="365" y="93" textAnchor="middle" className="text-[8px] font-bold fill-emerald-600 dark:fill-emerald-400">OP' = 1,5 · 4 = 6 cm</text>
            <path d="M 340 60 C 365 72, 365 72, 390 60" fill="none" stroke="#10b981" strokeWidth="1.5" />

            {/* P' with lambda = -1 */}
            <circle cx="140" cy="60" r="5" fill="#f59e0b" />
            <text x="140" y="45" textAnchor="middle" className="text-[11px] font-bold fill-amber-600 dark:fill-amber-400">P' (λ = -1)</text>
            <text x="190" y="78" textAnchor="middle" className="text-[9px] font-bold fill-amber-600 dark:fill-amber-400">OP' = 4 cm (tükörkép)</text>

            {/* P' with lambda = -2 */}
            <circle cx="40" cy="60" r="5" fill="#ef4444" />
            <text x="40" y="45" textAnchor="middle" className="text-[11px] font-bold fill-rose-600 dark:fill-rose-400">P' (λ = -2)</text>
            <text x="140" y="93" textAnchor="middle" className="text-[8px] font-bold fill-rose-600 dark:fill-rose-400">OP' = |-2| · 4 = 8 cm</text>
          </svg>
        </div>
      </TheorySection>

      {/* SECTION 2: Speciális Arányszámok és Geometriai Jelentésük */}
      <TheorySection
        number={2}
        title="Speciális arányszámok és geometriai hatásaik"
        badge="Középpontos tükrözés, identitás, arányok"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          A geometriai hasonlósági arány abszolútértékét <MathText>{"k = |\\lambda|"}</MathText> jelöli.
          A <MathText>{"\\lambda"}</MathText> értékétől függően a transzformáció lehet nagyítás, kicsinyítés,
          vagy akár egy korábban már tanult egybevágósági transzformáció is:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <TheoryCard
            title="Nagyítás: |λ| > 1"
            icon={<Maximize2 className="w-5 h-5 text-blue-600" />}
            color="blue"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              A képalakzat minden szakasza és távolsága hosszabb az eredetinél.
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded text-center text-xs font-bold text-blue-900 dark:text-blue-200">
              Példák: <MathText>{"\\lambda = 2"}</MathText>, <MathText>{"\\lambda = 3"}</MathText>, <MathText>{"\\lambda = -2,5"}</MathText>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Megjegyzés: <MathText>{"\\lambda = -2"}</MathText> esetén is <strong>nagyítás</strong> történik, csak 180°-os átfordulással!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Kicsinyítés: 0 < |λ| < 1"
            icon={<Minimize2 className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              A képalakzat minden szakasza és távolsága rövidebb az eredetinél.
            </p>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded text-center text-xs font-bold text-indigo-900 dark:text-indigo-200">
              Példák: <MathText>{"\\lambda = 0,5 = \\frac{1}{2}"}</MathText>, <MathText>{"\\lambda = -\\frac{1}{3}"}</MathText>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              A háromszög középvonalai az oldalakkal párhuzamosak, a csúcsból nézve <MathText>{"\\lambda = 0,5"}</MathText> arányú kicsinyítést alkotnak.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Egybevágóság: |λ| = 1"
            icon={<Shapes className="w-5 h-5 text-emerald-600" />}
            color="emerald"
          >
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded text-emerald-900 dark:text-emerald-200">
                <strong><MathText>{"\\lambda = 1"}</MathText>: Identitás</strong>
                <br />Minden pont önmagába megy át, az egész sík helyben marad.
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded text-amber-900 dark:text-amber-200">
                <strong><MathText>{"\\lambda = -1"}</MathText>: Középpontos tükrözés</strong>
                <br /><MathText>{"OP' = OP"}</MathText> és <MathText>{"O"}</MathText> felezőpont: pontosan a középpontos tükrözés definíciója!
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryTable
          headers={['λ arányszám', 'Elnevezés', 'Távolság (OP\')', 'Irány / Félegyenes', 'Geometriai jelleg']}
          rows={[
            [
              <strong key="1">λ = 1</strong>,
              'Identitás',
              'OP\' = OP',
              'Azonos (helyben marad)',
              'Távolságtartó (egybevágóság)'
            ],
            [
              <strong key="2" className="text-amber-600 dark:text-amber-400">λ = -1</strong>,
              'Középpontos tükrözés',
              'OP\' = OP',
              'Ellentétes (O a felezőpont)',
              'Távolságtartó (egybevágóság)'
            ],
            [
              <strong key="3">λ &gt; 1 (pl. λ = 2)</strong>,
              'Nagyítás',
              'OP\' &gt; OP (2 · OP)',
              'Azonos félegyenes',
              'Hasonlóság (k = λ)'
            ],
            [
              <strong key="4">0 &lt; λ &lt; 1 (pl. λ = 0,5)</strong>,
              'Kicsinyítés',
              'OP\' &lt; OP (0,5 · OP)',
              'Azonos félegyenes',
              'Hasonlóság (k = λ)'
            ],
            [
              <strong key="5" className="text-rose-600 dark:text-rose-400">λ &lt; -1 (pl. λ = -2)</strong>,
              'Negatív nagyítás',
              'OP\' = |-2| · OP = 2 · OP',
              'Ellentétes félegyenes (180°)',
              'Hasonlóság (k = 2) + fordulat'
            ],
            [
              <strong key="6">-1 &lt; λ &lt; 0 (pl. λ = -0,5)</strong>,
              'Negatív kicsinyítés',
              'OP\' = |-0,5| · OP = 0,5 · OP',
              'Ellentétes félegyenes (180°)',
              'Hasonlóság (k = 0,5) + fordulat'
            ]
          ]}
        />
      </TheorySection>

      {/* SECTION 3: Főbb Geometriai Tulajdonságok és Invariánsok */}
      <TheorySection
        number={3}
        title="Főbb geometriai tulajdonságok és invariánsok"
        badge="Párhuzamosság, szögtartás, kerület és terület"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          A középpontos hasonlóság a geometriai transzformációk egyik legszabályosabb képviselője.
          Az alábbi tulajdonságok kiemelten fontosak feladatmegoldáskor és szerkesztéskor:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="Egyenes képe vele PÁRHUZAMOS egyenes"
            icon={<Compass className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          >
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p>
                <strong>1. eset (<MathText>{"O \\notin e"}</MathText>):</strong> Ha az egyenes nem halad át a centrumon, képe vele
                szigorúan <strong>párhuzamos</strong> egyenes:
              </p>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded font-bold text-center text-indigo-900 dark:text-indigo-200 text-sm">
                <MathText>{"e' \\parallel e"}</MathText>
              </div>
              <p>
                <strong>2. eset (<MathText>{"O \\in e"}</MathText>):</strong> Ha az egyenes átmegy az <MathText>{"O"}</MathText> centrumon, képe
                önmaga: <MathText>{"e' = e"}</MathText>. Az ilyen egyenest <strong>invariáns egyenesnek</strong> nevezzük
                (az egyenes helyben marad, bár pontjai elmozdulnak rajta).
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Szögtartás és körüljárási irány"
            icon={<Sparkles className="w-5 h-5 text-teal-600" />}
            color="teal"
          >
            <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <p>
                <strong>Szögtartó leképezés:</strong> Bármely szög képe vele megegyező nagyságú szög:
              </p>
              <div className="p-2 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded font-bold text-center text-teal-900 dark:text-teal-200 text-sm">
                <MathText>{"\\alpha' = \\alpha"}</MathText>
              </div>
              <p>
                <strong>Irányítástartó:</strong> Az alakzatok körüljárási iránya változatlan marad (óramutató járásával megegyező marad megegyező,
                ellentétes marad ellentétes).
              </p>
            </div>
          </TheoryCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="Szakaszok és kerületek aránya"
            icon={<Maximize2 className="w-5 h-5 text-blue-600" />}
            color="blue"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Bármely két pont <MathText>{"A"}</MathText> és <MathText>{"B"}</MathText> távolságához képest a képpontok távolsága
              <MathText>{"|\\lambda|"}</MathText>-szorosára nő vagy csökken:
            </p>
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg text-center font-bold text-blue-900 dark:text-blue-200 text-sm">
              <MathText>{"|A'B'| = |\\lambda| \\cdot |AB| \\quad \\text{és} \\quad K' = |\\lambda| \\cdot K"}</MathText>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              A sokszög kerülete pontosan <MathText>{"|\\lambda|"}</MathText>-szorosa az eredeti kerületnek.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Területek aránya: λ²"
            icon={<Layers className="w-5 h-5 text-purple-600" />}
            color="purple"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Mivel a síkidomok kétirányú (szélesség és magasság) kiterjedéssel rendelkeznek, a terület a hasonlósági arány
              <strong>négyzetével</strong> arányos:
            </p>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-lg text-center font-black text-purple-900 dark:text-purple-200 text-sm">
              <MathText>{"T' = \\lambda^2 \\cdot T = |\\lambda|^2 \\cdot T"}</MathText>
            </div>
            <p className="text-xs text-purple-700 dark:text-purple-300 font-semibold mt-2">
              Még negatív aránynál is pozitív a terület! Pl. ha <MathText>{"\\lambda = -3"}</MathText>, akkor <MathText>{"T' = (-3)^2 \\cdot T = 9 \\cdot T"}</MathText>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 4: Interaktív Középpontos Hasonlóság Labor */}
      <TheorySection
        number={4}
        title="Interaktív Labor: Középpontos Hasonlóság Szimulátor"
        badge="Dinamikus geometriai kísérlet"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base mb-4">
          Állítsd be a <MathText>{"\\lambda"}</MathText> arányszám értékét a csúszkával vagy a gyorsgombokkal!
          Figyeld meg a centrumból (<MathText>{"O"}</MathText>) kiinduló sugarakat, az eredeti kék <MathText>{"ABC"}</MathText> háromszög és a képháromszög
          (<MathText>{"A'B'C'"}</MathText>) elhelyezkedését, oldalainak párhuzamosságát, valamint a távolságok és területek változását!
        </p>

        {/* Interactive Simulator Box */}
        <div className="p-6 bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 dark:from-slate-900 dark:via-slate-850 dark:to-indigo-950/30 rounded-3xl border border-indigo-200 dark:border-indigo-800 shadow-md">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-indigo-100 dark:border-indigo-900">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Hasonlósági arány:</span>
              <span className="px-3 py-1 bg-indigo-600 text-white rounded-full font-mono font-bold text-base shadow-sm">
                λ = {lambda > 0 ? `+${lambda.toFixed(1)}` : lambda.toFixed(1)}
              </span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold mr-1">Gyorsbeállítás:</span>
              <Button
                size="sm"
                variant={lambda === 2 ? 'default' : 'outline'}
                className="h-8 text-xs font-semibold"
                onClick={() => setPreset(2)}
              >
                λ = +2 (Nagyítás)
              </Button>
              <Button
                size="sm"
                variant={lambda === 0.5 ? 'default' : 'outline'}
                className="h-8 text-xs font-semibold"
                onClick={() => setPreset(0.5)}
              >
                λ = +0,5 (Kicsinyítés)
              </Button>
              <Button
                size="sm"
                variant={lambda === -1 ? 'default' : 'outline'}
                className="h-8 text-xs font-semibold border-amber-500 text-amber-700 dark:text-amber-300"
                onClick={() => setPreset(-1)}
              >
                λ = -1 (Középpontos tükrözés!)
              </Button>
              <Button
                size="sm"
                variant={lambda === -1.5 ? 'default' : 'outline'}
                className="h-8 text-xs font-semibold border-rose-500 text-rose-700 dark:text-rose-300"
                onClick={() => setPreset(-1.5)}
              >
                λ = -1,5 (Negatív)
              </Button>
              <Button
                size="sm"
                variant={lambda === 1 ? 'default' : 'outline'}
                className="h-8 text-xs font-semibold"
                onClick={() => setPreset(1)}
              >
                λ = 1 (Identitás)
              </Button>
            </div>
          </div>

          {/* Slider input */}
          <div className="my-5 flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500">-2,5</span>
            <input
              type="range"
              min="-2.5"
              max="2.5"
              step="0.1"
              value={lambda}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                // Skip zero
                if (Math.abs(val) < 0.1) {
                  setLambda(val < 0 ? -0.2 : 0.2);
                } else {
                  setLambda(val);
                }
              }}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-xs font-bold text-slate-500">+2,5</span>
          </div>

          {/* Dynamic SVG Visualisation */}
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 overflow-hidden shadow-inner">
            <svg
              viewBox="0 0 460 270"
              className="w-full h-64 sm:h-72 select-none"
            >
              {/* Grid Background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/40" />
                </pattern>
              </defs>
              <rect width="460" height="270" fill="url(#grid)" />

              {/* Projection Rays through O extending in both directions */}
              {/* Ray OA */}
              <line
                x1={Ox - 2.6 * (Ax - Ox)}
                y1={Oy - 2.6 * (Ay - Oy)}
                x2={Ox + 2.6 * (Ax - Ox)}
                y2={Oy + 2.6 * (Ay - Oy)}
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              {/* Ray OB */}
              <line
                x1={Ox - 2.6 * (Bx - Ox)}
                y1={Oy - 2.6 * (By - Oy)}
                x2={Ox + 2.6 * (Bx - Ox)}
                y2={Oy + 2.6 * (By - Oy)}
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              {/* Ray OC */}
              <line
                x1={Ox - 2.6 * (Cx - Ox)}
                y1={Oy - 2.6 * (Cy - Oy)}
                x2={Ox + 2.6 * (Cx - Ox)}
                y2={Oy + 2.6 * (Cy - Oy)}
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />

              {/* Image Triangle A'B'C' (Rendered first if under, or color according to sign) */}
              <polygon
                points={`${Apx},${Apy} ${Bpx},${Bpy} ${Cpx},${Cpy}`}
                fill={lambda < 0 ? 'rgba(244, 63, 94, 0.2)' : 'rgba(124, 58, 237, 0.25)'}
                stroke={lambda < 0 ? '#e11d48' : '#7c3aed'}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Original Triangle ABC */}
              <polygon
                points={`${Ax},${Ay} ${Bx},${By} ${Cx},${Cy}`}
                fill="rgba(59, 130, 246, 0.25)"
                stroke="#2563eb"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Original Triangle Vertices */}
              <circle cx={Ax} cy={Ay} r="4.5" fill="#2563eb" />
              <text x={Ax + 8} y={Ay - 4} className="text-[11px] font-bold fill-blue-700 dark:fill-blue-300">A</text>

              <circle cx={Bx} cy={By} r="4.5" fill="#2563eb" />
              <text x={Bx + 8} y={By + 6} className="text-[11px] font-bold fill-blue-700 dark:fill-blue-300">B</text>

              <circle cx={Cx} cy={Cy} r="4.5" fill="#2563eb" />
              <text x={Cx - 14} y={Cy + 14} className="text-[11px] font-bold fill-blue-700 dark:fill-blue-300">C</text>

              {/* Center point O */}
              <circle cx={Ox} cy={Oy} r="6.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
              <text x={Ox - 16} y={Oy - 10} className="text-[12px] font-black fill-indigo-700 dark:fill-indigo-300">O</text>

              {/* Image Triangle Vertices */}
              <circle cx={Apx} cy={Apy} r="5" fill={lambda < 0 ? '#e11d48' : '#7c3aed'} />
              <text
                x={Apx + (lambda > 0 ? 8 : -18)}
                y={Apy + (lambda > 0 ? -4 : 14)}
                className={`text-[11px] font-extrabold ${lambda < 0 ? 'fill-rose-700 dark:fill-rose-300' : 'fill-purple-700 dark:fill-purple-300'}`}
              >
                A'
              </text>

              <circle cx={Bpx} cy={Bpy} r="5" fill={lambda < 0 ? '#e11d48' : '#7c3aed'} />
              <text
                x={Bpx + (lambda > 0 ? 8 : -18)}
                y={Bpy + (lambda > 0 ? 6 : -4)}
                className={`text-[11px] font-extrabold ${lambda < 0 ? 'fill-rose-700 dark:fill-rose-300' : 'fill-purple-700 dark:fill-purple-300'}`}
              >
                B'
              </text>

              <circle cx={Cpx} cy={Cpy} r="5" fill={lambda < 0 ? '#e11d48' : '#7c3aed'} />
              <text
                x={Cpx + (lambda > 0 ? -14 : 8)}
                y={Cpy + (lambda > 0 ? 14 : -4)}
                className={`text-[11px] font-extrabold ${lambda < 0 ? 'fill-rose-700 dark:fill-rose-300' : 'fill-purple-700 dark:fill-purple-300'}`}
              >
                C'
              </text>

              {/* Side parallelism indicator text */}
              <text x="15" y="25" className="text-[10px] font-bold fill-slate-500">
                Párhuzamos oldalak: A'B' ∥ AB | B'C' ∥ BC | C'A' ∥ CA
              </text>
              <text x="15" y="42" className="text-[10px] font-bold fill-slate-500">
                {lambda > 0 ? 'Irány: Azonos oldalú sugarak (0°)' : 'Irány: Átfordulás az O ponton át (180°)'}
              </text>
            </svg>
          </div>

          {/* Dynamic Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-500">Transzformáció jellege</span>
              <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300 mt-1">
                {Math.abs(lambda) === 1
                  ? (lambda === 1 ? 'Identitás (helybenhagyás)' : 'Középpontos tükrözés!')
                  : (Math.abs(lambda) > 1 ? `Nagyítás (${Math.abs(lambda).toFixed(1)}×)` : `Kicsinyítés (${Math.abs(lambda).toFixed(1)}×)`)}
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-500">Távolságarány (|λ|)</span>
              <p className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200 mt-1">
                OP' / OP = {Math.abs(lambda).toFixed(1)}
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-500">Kerületarány (K' / K)</span>
              <p className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {Math.abs(lambda).toFixed(1)}×
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-500">Területarány (T' / T = λ²)</span>
              <p className="text-sm font-mono font-bold text-purple-600 dark:text-purple-400 mt-1">
                {(lambda * lambda).toFixed(2)}×
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 5: Párhuzamos Szelők és Sugarak Tétele */}
      <TheorySection
        number={5}
        title="Párhuzamos szelők és sugarak tétele"
        badge="A hasonlóság gyakorlati alaptétele"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          Ha egy pontból (<MathText>{"O"}</MathText>) kiinduló két félegyenest (szögszárakat) két párhuzamos egyenessel elmetszünk,
          a középpontos hasonlóság miatt a keletkező szakaszok aránya szigorúan megegyezik:
        </p>

        <div className="my-6 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <svg viewBox="0 0 480 180" className="w-full max-w-xl mx-auto h-40 sm:h-48">
            {/* Rays from O */}
            <line x1="40" y1="90" x2="440" y2="20" stroke="#64748b" strokeWidth="2" />
            <line x1="40" y1="90" x2="440" y2="160" stroke="#64748b" strokeWidth="2" />

            {/* Parallel secants */}
            <line x1="180" y1="10" x2="180" y2="170" stroke="#3b82f6" strokeWidth="2.5" />
            <line x1="360" y1="10" x2="360" y2="170" stroke="#8b5cf6" strokeWidth="2.5" />

            {/* O vertex */}
            <circle cx="40" cy="90" r="5" fill="#4f46e5" />
            <text x="25" y="95" className="text-[12px] font-black fill-indigo-700 dark:fill-indigo-300">O</text>

            {/* Points A and B on first secant */}
            <circle cx="180" cy="65.5" r="4.5" fill="#3b82f6" />
            <text x="165" y="60" className="text-[11px] font-bold fill-blue-700 dark:fill-blue-300">A</text>

            <circle cx="180" cy="114.5" r="4.5" fill="#3b82f6" />
            <text x="165" y="132" className="text-[11px] font-bold fill-blue-700 dark:fill-blue-300">B</text>

            {/* Points A' and B' on second secant */}
            <circle cx="360" cy="34" r="5" fill="#8b5cf6" />
            <text x="370" y="35" className="text-[11px] font-bold fill-purple-700 dark:fill-purple-300">A'</text>

            <circle cx="360" cy="146" r="5" fill="#8b5cf6" />
            <text x="370" y="152" className="text-[11px] font-bold fill-purple-700 dark:fill-purple-300">B'</text>

            {/* Secant labels */}
            <text x="180" y="178" textAnchor="middle" className="text-[10px] font-bold fill-blue-600">e</text>
            <text x="360" y="178" textAnchor="middle" className="text-[10px] font-bold fill-purple-600">e' (e' ∥ e)</text>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="1. Párhuzamos szelőszakaszok tétele"
            icon={<Shapes className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              A párhuzamos egyenesek által a szögszárakból kivágott szakaszok hossza egyenesen arányos a csúcstól mért távolságokkal:
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg text-center font-bold text-indigo-900 dark:text-indigo-200 text-sm">
              <MathText>{"\\frac{OA'}{OA} = \\frac{OB'}{OB} = \\frac{A'B'}{AB} = |\\lambda|"}</MathText>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              A párhuzamos szelőszakaszok aránya pontosan megegyezik a hasonlóság arányával!
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Szelőszakaszok a szögszárakon"
            icon={<Compass className="w-5 h-5 text-violet-600" />}
            color="violet"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              A párhuzamosok a szárakon egymással arányos darabokat vágnak le:
            </p>
            <div className="p-3 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 rounded-lg text-center font-bold text-violet-900 dark:text-violet-200 text-sm">
              <MathText>{"\\frac{AA'}{OA} = \\frac{BB'}{OB}"}</MathText>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Ezt a tételt használjuk fel ismeretlen szakaszok kiszámítására, magasságmérésre és szakaszok egyenlő részekre való osztására.
            </p>
          </TheoryCard>
        </div>

        {/* Real-world / advanced mathematical connection */}
        <TheoryCallout
          title="Tudtad? A háromszög súlypontja mint hasonlósági centrum"
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        >
          <p className="text-sm text-slate-700 dark:text-slate-300">
            A háromszög súlypontja (<MathText>{"S"}</MathText>) a súlyvonalakat 2:1 arányban osztja.
            Ha az <MathText>{"S"}</MathText> pontot választjuk középpontnak és <MathText>{"\\lambda = -\\frac{1}{2}"}</MathText> aránnyal
            középpontosan hasonlítjuk a háromszöget, akkor a csúcsok képei pontosan a szemközti oldalak felezőpontjai lesznek!
            Ez az oka annak, hogy az oldalfelező pontok alkotta háromszög területe negyede (<MathText>{"(-\\frac{1}{2})^2 = \\frac{1}{4}"}</MathText>)
            az eredeti háromszög területének.
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* SECTION 6: Tipikus Csapdák és Önellenőrző */}
      <TheorySection
        number={6}
        title="Tipikus tévhitek, csapdák és Önellenőrző"
        badge="Gyakori hibák megelőzése"
      >
        <div className="space-y-4 my-6">
          <TheoryTrapBox
            title="1. Csapda: A távolság nem lehet negatív!"
            description="Ha a feladatban λ = -2,5, a képpont távolsága a centrumtól NEM -15 cm, hanem +15 cm! A képletben abszolútérték szerepel: OP' = |-2,5| · 6 cm = 15 cm. A negatív előjel a geometriai irányt (az O pont ellentétes oldalára esést) jelenti, nem a távolság mértékét."
          />

          <TheoryTrapBox
            title="2. Csapda: A területarány négyzetes (λ²), nem egyszeres!"
            description="Ha egy alakzatot λ = -3 arányú középpontos hasonlósággal képezünk le, az új terület NEM -3-szorosa és NEM is 3-szorosa az eredetinek, hanem (-3)² = 9-szerese! A negatív szám négyzete mindig pozitív."
          />

          <TheoryTrapBox
            title="3. Csapda: A centrumon átmenő egyenesek pontjai nem fixek!"
            description="Bár a centrumon áthaladó e egyenes képe önmaga (e' = e, invariáns egyenes), ez nem jelenti azt, hogy a pontjai helyben maradnak. A pontok végigcsúsznak az egyenesen: az egyetlen fixpont a síkban a hasonlóság O középpontja (ha λ ≠ 1)."
          />
        </div>

        {/* Interactive Self-Test Card */}
        <div className="mt-8 p-6 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              Gyors Önellenőrző Kérdés
            </h4>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
            Egy <MathText>{"O"}</MathText> centrumú középpontos hasonlóság aránya <MathText>{"\\lambda = -2"}</MathText>.
            Az eredeti <MathText>{"P"}</MathText> pont távolsága a centrumtól <MathText>{"OP = 5\\text{ cm}"}</MathText>,
            az alakzat területe <MathText>{"T = 12\\text{ cm}^2"}</MathText>.
            Mekkora a <MathText>{"P'"}</MathText> pont távolsága az <MathText>{"O"}</MathText>-tól, és mekkora a képalakzat területe (<MathText>{"T'"}</MathText>)?
          </p>

          <div className="space-y-2">
            {[
              {
                id: 0,
                text: "OP' = 10 cm és T' = 48 cm² (OP' = |-2| · 5 = 10 cm, T' = (-2)² · 12 = 48 cm²)",
                isCorrect: true
              },
              {
                id: 1,
                text: "OP' = -10 cm és T' = -24 cm²",
                isCorrect: false
              },
              {
                id: 2,
                text: "OP' = 10 cm és T' = 24 cm²",
                isCorrect: false
              },
              {
                id: 3,
                text: "OP' = 2,5 cm és T' = 3 cm²",
                isCorrect: false
              }
            ].map((option) => {
              const isSelected = selfTestAnswer === option.id;
              const showCorrectness = selfTestSubmitted;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (!selfTestSubmitted) {
                      setSelfTestAnswer(option.id);
                    }
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-center justify-between ${
                    showCorrectness
                      ? option.isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                        : isSelected
                        ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-900 dark:text-rose-200'
                        : 'bg-white dark:bg-slate-800 border-slate-200 opacity-60'
                      : isSelected
                      ? 'bg-indigo-100 dark:bg-indigo-900/60 border-indigo-400 text-indigo-900 dark:text-indigo-100 font-semibold'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <span>{option.text}</span>
                  {showCorrectness && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {showCorrectness && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between">
            {!selfTestSubmitted ? (
              <Button
                size="sm"
                disabled={selfTestAnswer === null}
                onClick={() => setSelfTestSubmitted(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
              >
                Válasz ellenőrzése
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-bold ${
                    selfTestAnswer === 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {selfTestAnswer === 0
                    ? '🎉 Helyes válasz! Pontosan alkalmaztad az abszolútértékes távolságot és a négyzetes területarányt.'
                    : 'Nem egészen! A távolság: OP\' = |-2| · 5 = 10 cm, a terület pedig T\' = (-2)² · 12 = 4 · 12 = 48 cm².'}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelfTestAnswer(null);
                    setSelfTestSubmitted(false);
                  }}
                  className="text-xs"
                >
                  Újra
                </Button>
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CentralSimilarityTheory;
