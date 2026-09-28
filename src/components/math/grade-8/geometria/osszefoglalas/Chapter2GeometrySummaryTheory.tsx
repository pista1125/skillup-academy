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
  Award,
  Shapes,
  Maximize2,
  Minimize2,
  Compass,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRightLeft,
  Ruler,
  Sliders,
  RotateCw,
  Eye,
  Percent,
  Lightbulb
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface Chapter2GeometrySummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type TransformType = 'axial' | 'central' | 'translate' | 'similarity';

export const Chapter2GeometrySummaryTheory: React.FC<Chapter2GeometrySummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Simulator mode
  const [selectedTransform, setSelectedTransform] = useState<TransformType>('similarity');
  const [scaleFactor, setScaleFactor] = useState<number>(2);

  // Self-test states
  const [selfTestAnswer, setSelfTestAnswer] = useState<number | null>(null);
  const [selfTestSubmitted, setSelfTestSubmitted] = useState<boolean>(false);

  return (
    <TheoryTemplate
      documentId="grade-8-geometria-osszefoglalas"
      pdfFilename="8_osztaly_geometria_osszefoglalas_tananyag.pdf"
      title="7. Geometria Összefoglalás"
      subtitle="Egybevágóságok, transzformációk invariánsai, hasonlóság (k), középpontos hasonlóság (λ) és szerkesztések teljes rendszerezése"
      emoji="🏆"
      topicBadge="8. Osztály • II. Témakör: Geometria"
      badgeText="8. Osztály • Matematika"
      estimatedReadTime="18 perc"
      quickRule={{
        label: "A Geometria Fejezet Főösszefüggései",
        formula: "Egybevágóság: k = 1   |   Hasonlóság: K'/K = k, T'/T = k²   |   Középpontos hasonlóság: OP' = |λ|·OP"
      }}
      themeColor="teal"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* SECTION 1: Egybevágósági Transzformációk és Invariánsok */}
      <TheorySection
        number={1}
        title="Egybevágósági transzformációk és invariánsok rendszerezése"
        badge="Távolságtartás, körüljárás és fix elemek"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          A geometriai transzformációk a sík pontjaihoz a sík pontjait rendelik hozzá.
          Az <strong>egybevágósági transzformációk</strong> közös alapvető tulajdonsága a <strong>távolságtartás</strong>:
          bármely két pont távolsága megegyezik a képpontjaik távolságával (<MathText>{"|A'B'| = |AB|"}</MathText>).
          Emiatt az alakzat mérete és alakja szigorúan változatlan marad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="A 4 alapvető egybevágóság"
            icon={<Shapes className="w-5 h-5 text-teal-600" />}
            color="teal"
          >
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded">
                <strong>1. Tengelyes tükrözés:</strong> az egyetlen <strong>orientációváltó</strong> alapleképezés (megfordítja a körüljárási irányt). Fixegyenese maga a tükörtengely (<MathText>{"t"}</MathText>), melynek minden pontja fixpont.
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded">
                <strong>2. Középpontos tükrözés:</strong> 180°-os forgatás az <MathText>{"O"}</MathText> centrum körül. Irányítástartó. Egyetlen fixpontja az <MathText>{"O"}</MathText> pont. Bármely rajta átmenő egyenes invariáns.
              </div>
              <div className="p-2 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded">
                <strong>3. Párhuzamos eltolás (vektorral):</strong> minden pontot adott irányban adott távolságra visz el. Nincs fixpontja (ha <MathText>{"\\vec{v} \\neq \\vec{0}"}</MathText>). Irányítástartó.
              </div>
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded">
                <strong>4. Forgatás (pont körül szöggel):</strong> egyetlen fixpontja a forgás középpontja. Irányítástartó.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Invariáns tulajdonságok (megmaradó értékek)"
            icon={<Sparkles className="w-5 h-5 text-blue-600" />}
            color="blue"
          >
            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
              <li><strong>Távolságtartó:</strong> <MathText>{"|A'B'| = |AB|"}</MathText>.</li>
              <li><strong>Szögtartó:</strong> <MathText>{"\\alpha' = \\alpha"}</MathText>.</li>
              <li><strong>Egyenestartó:</strong> egyenes képe egyenes.</li>
              <li><strong>Párhuzamosságtartó:</strong> <MathText>{"e \\parallel f \\implies e' \\parallel f'"}</MathText>.</li>
              <li><strong>Területtartó:</strong> <MathText>{"T' = T"}</MathText> és kerülettartó (<MathText>{"K' = K"}</MathText>).</li>
              <li><strong>Körüljárási irány:</strong> tengelyes tükrözésnél megfordul, a másik háromnál megmarad!</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 2: Háromszögek Egybevágósági és Hasonlósági Alapesetei */}
      <TheorySection
        number={2}
        title="Háromszögek egybevágósági és hasonlósági alapeseteinek párhuzama"
        badge="Összehasonlító elemzés"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          A geometriai bizonyítások gerincét a háromszögek összehasonlítása adja.
          Figyeld meg a szép analógiát az egybevágósági és hasonlósági alapesetek között:
        </p>

        <TheoryTable
          headers={['Eset kódja', 'Egybevágósági alapeset (k = 1)', 'Hasonlósági alapeset (k > 0)', 'Gyakorlati tanács']}
          rows={[
            [
              <strong key="1">sz-sz (Szögek)</strong>,
              'sz-o-sz (két szög és a közbezárt oldal egyenlő)',
              <strong>sz-sz: két szög megegyezik</strong>,
              'Hasonlóságnál a leggyakoribb! Mivel a belső szögek összege 180°, két szög egyezése garantálja a harmadikat is.'
            ],
            [
              <strong key="2">o-o-o (Oldalak)</strong>,
              'o-o-o: mindhárom oldal egyenlő (a=a\', b=b\', c=c\')',
              <strong>o-o-o: mindhárom oldalpár aránya egyenlő</strong>,
              'a\'/a = b\'/b = c\'/c = k. Ha az oldalak aránya megegyezik, a háromszögek hasonlók.'
            ],
            [
              <strong key="3">o-sz-o (Oldal-szög)</strong>,
              'o-sz-o: két oldal és a közbezárt szög egyenlő',
              <strong>o-sz-o: két oldal aránya és a közbezárt szög egyenlő</strong>,
              'a\'/a = b\'/b = k és γ\' = γ. A közbezárt szög azonossága kulcsfontosságú.'
            ],
            [
              <strong key="4">d-o-o (Nagyobb szög)</strong>,
              'd-o-o: két oldal és a nagyobbikkal szemközti szög egyenlő',
              <strong>d-o-o: két oldal aránya és a nagyobbikkal szemközti szög egyenlő</strong>,
              'Két derékszögű háromszög hasonló, ha az átfogójuk és egy befogójuk aránya egyenlő, vagy egyetlen hegyesszögük megegyezik.'
            ]
          ]}
        />
      </TheorySection>

      {/* SECTION 3: Hasonlósági Arány, Kerület- és Területarány */}
      <TheorySection
        number={3}
        title="Hasonlósági arány (k), kerületek és területek aránya"
        badge="Dimenziók és skálázás"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          A geometriai hasonlóságban az összes hosszméret <MathText>{"k"}</MathText>-szorosára változik.
          De mi történik a kerülettel, a területtel és a térbeli testek térfogatával?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <TheoryCard
            title="Hosszak és Kerület: k-szoros"
            icon={<Maximize2 className="w-5 h-5 text-blue-600" />}
            color="blue"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Minden egydimenziós hosszméret (oldal, magasság, súlyvonal, körsugár, kerület) pontosan <MathText>{"k"}</MathText>-szorosára nő:
            </p>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded font-bold text-center text-blue-900 dark:text-blue-200 text-xs">
              <MathText>{"\\frac{K'}{K} = k \\quad \\text{és} \\quad |A'B'| = k \\cdot |AB|"}</MathText>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Ha <MathText>{"k = 3"}</MathText>, a kerület pontosan 3-szorosa lesz az eredetinek.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Terület: k²-szeres (négyzetes!)"
            icon={<Layers className="w-5 h-5 text-purple-600" />}
            color="purple"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              A síkidomok kétdimenziósak (szélesség és hosszúság is <MathText>{"k"}</MathText>-szoros), így a terület a hasonlósági arány <strong>négyzetével</strong> arányos:
            </p>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded font-black text-center text-purple-950 dark:text-purple-200 text-xs">
              <MathText>{"\\frac{T'}{T} = k^2 \\implies T' = k^2 \\cdot T"}</MathText>
            </div>
            <p className="text-[11px] text-purple-700 dark:text-purple-300 font-semibold mt-2">
              Ha <MathText>{"k = 3"}</MathText>, a terület <MathText>{"3^2 = 9"}</MathText>-szeresére nő!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Térfogat: k³-szoros (köbös!)"
            icon={<Shapes className="w-5 h-5 text-emerald-600" />}
            color="emerald"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Hasonló térbeli testek (gömbök, kockák, hengerek) esetén a térfogat háromdimenziós, így a hasonlósági arány <strong>köbével</strong> arányos:
            </p>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded font-black text-center text-emerald-900 dark:text-emerald-200 text-xs">
              <MathText>{"\\frac{V'}{V} = k^3 \\implies V' = k^3 \\cdot V"}</MathText>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Ha egy kocka éleit megkétszerezzük (<MathText>{"k = 2"}</MathText>), térfogata <MathText>{"2^3 = 8"}</MathText>-szorosára nő!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 4: Középpontos Hasonlóság és Párhuzamos Szelők Tétele */}
      <TheorySection
        number={4}
        title="Középpontos hasonlóság (λ) és a párhuzamos szelők tétele"
        badge="A hasonlóság szerkezeti motorja"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          A <strong>középpontos hasonlóság</strong> a sík egy kitüntetett <MathText>{"O"}</MathText> pontjához (centrumához)
          és egy <MathText>{"\\lambda \\neq 0"}</MathText> valós számhoz rögzíti a pontok elmozdulását:
          <MathText>{"OP' = |\\lambda| \\cdot OP"}</MathText>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="A λ arányszám előjele és speciális esetei"
            icon={<ArrowRightLeft className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          >
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
              <li><MathText>{"\\lambda > 0"}</MathText>: <MathText>{"P"}</MathText> és <MathText>{"P'"}</MathText> az <MathText>{"O"}</MathText> azonos oldalán állnak az <MathText>{"OP"}</MathText> félegyenesen.</li>
              <li><MathText>{"\\lambda < 0"}</MathText>: <MathText>{"P'"}</MathText> az ellentétes félegyenesre esik, <MathText>{"O"}</MathText> a <MathText>{"P"}</MathText> és <MathText>{"P'"}</MathText> között fekszik (180°-os átfordulás).</li>
              <li><MathText>{"\\lambda = 1"}</MathText>: <strong>Identitás</strong> (minden pont fixpont).</li>
              <li><MathText>{"\\lambda = -1"}</MathText>: <strong>Középpontos tükrözés</strong> az <MathText>{"O"}</MathText> pontra!</li>
              <li><MathText>{"|\\lambda| > 1"}</MathText>: Nagyítás | <MathText>{"0 < |\\lambda| < 1"}</MathText>: Kicsinyítés.</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Párhuzamos szelők és sugarak tétele"
            icon={<Compass className="w-5 h-5 text-teal-600" />}
            color="teal"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Ha egy szögtartomány szárait párhuzamos egyenesekkel metsszük el:
            </p>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-lg text-center font-bold text-teal-900 dark:text-teal-200 text-xs">
              <MathText>{"\\frac{OA'}{OA} = \\frac{OB'}{OB} = \\frac{A'B'}{AB} = |\\lambda| \\quad \\text{és} \\quad \\frac{AA'}{OA} = \\frac{BB'}{OB}"}</MathText>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Ez a tétel biztosítja a magasságmérést, az árnyékmódszert, a szakaszok arányos felosztását és a negyedik arányos szerkesztését!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 5: Szerkesztési Eljárások Gyors Rendszerezése */}
      <TheorySection
        number={5}
        title="Szerkesztési eljárások gyors összefoglalója"
        badge="Körző és vonalzó alkalmazásai"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <TheoryCard
            title="Szakaszosztás m : k arányban"
            icon={<Ruler className="w-5 h-5 text-amber-600" />}
            color="amber"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Segédfélegyenesre <MathText>{"m + k"}</MathText> darab egyenlő körosztást mérünk.
              Az utolsó pontot kötjük <MathText>{"B"}</MathText>-vel, és az <MathText>{"m"}</MathText>-edik ponton át húzunk párhuzamost.
            </p>
            <div className="p-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded text-center text-xs font-bold text-amber-800">
              <MathText>{"\\frac{AP}{PB} = \\frac{m}{k}"}</MathText>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Negyedik arányos: x = (b·c)/a"
            icon={<Shapes className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Szögszárra felmérjük az <MathText>{"a"}</MathText> és folytatólagosan <MathText>{"b"}</MathText> szakaszt, a másik szárra <MathText>{"c"}</MathText>-t.
              Párhuzamos szelőkkel kijelöljük a keresett <MathText>{"x"}</MathText> szakaszt.
            </p>
            <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded text-center text-xs font-bold text-indigo-800">
              <MathText>{"a : b = c : x"}</MathText>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Aranymetszés: Φ ≈ 1,618"
            icon={<Percent className="w-5 h-5 text-rose-600" />}
            color="rose"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              A szakaszt úgy osztjuk két részre (<MathText>{"a > b"}</MathText>), hogy a kisebb rész úgy aránylik a nagyobbhoz,
              mint a nagyobb az egészhez:
            </p>
            <div className="p-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded text-center text-xs font-bold text-rose-800">
              <MathText>{"\\frac{b}{a} = \\frac{a}{a+b} \\implies \\Phi \\approx 1,618"}</MathText>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 6: Tipikus Csapdák és Témazáró Önellenőrző */}
      <TheorySection
        number={6}
        title="Tipikus vizsgacsapdák és Témazáró Önellenőrző"
        badge="Felkészülés a dolgozatra"
      >
        <div className="space-y-4 my-6">
          <TheoryTrapBox
            title="1. Csapda: A területek aránya k², nem k!"
            description="Gyakori hiba: „Ha egy háromszög oldalai 4-szeresükre nőnek, a területe is 4-szeres lesz.” NEM! A terület 4² = 16-szorosára nő! A kerülete nő 4-szeresére."
          />

          <TheoryTrapBox
            title="2. Csapda: Középpontos hasonlóságnál a távolság mindig abszolútérték!"
            description="Ha λ = -2, a képpont centrumtól mért távolsága nem -10 cm, hanem OP' = |-2| · 5 = 10 cm! A negatív előjel a geometriai irányt (ellentétes félegyenes, 180° átfordulás) jelenti."
          />

          <TheoryTrapBox
            title="3. Csapda: Két szög egyezése elégséges a hasonlósághoz, de nem az egybevágósághoz!"
            description="Két háromszög hasonló, ha két-két szögük egyenlő (sz-sz). Viszont egybevágósághoz legalább egy megfelelő oldalpár azonossága is kötelező (sz-o-sz)."
          />
        </div>

        {/* Self-test */}
        <div className="mt-8 p-6 bg-teal-50/60 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              Témazáró Átfogó Önellenőrző Kérdés
            </h4>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
            Egy derékszögű háromszög befogói <MathText>{"a = 6\\text{ cm}"}</MathText> és <MathText>{"b = 8\\text{ cm}"}</MathText>.
            Középpontos hasonlósággal képezzük le <MathText>{"\\lambda = -2"}</MathText> aránnyal.
            Mekkora a képháromszög átfogója (<MathText>{"c'"}</MathText>) és területe (<MathText>{"T'"}</MathText>)?
          </p>

          <div className="space-y-2">
            {[
              {
                id: 0,
                text: "c' = 20 cm és T' = 96 cm² [c = √(6²+8²) = 10 cm ⟹ c' = |-2|·10 = 20 cm; T = (6·8)/2 = 24 cm² ⟹ T' = (-2)²·24 = 96 cm²]",
                isCorrect: true
              },
              {
                id: 1,
                text: "c' = -20 cm és T' = -48 cm²",
                isCorrect: false
              },
              {
                id: 2,
                text: "c' = 20 cm és T' = 48 cm²",
                isCorrect: false
              },
              {
                id: 3,
                text: "c' = 10 cm és T' = 24 cm²",
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
                      ? 'bg-teal-100 dark:bg-teal-900/60 border-teal-400 text-teal-900 dark:text-teal-100 font-semibold'
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
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold"
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
                    ? '🎉 Kitűnő! Pontosan kiszámoltad: az átfogó 10 cm · 2 = 20 cm, a terület pedig 24 cm² · 4 = 96 cm².'
                    : 'Nem egészen! Az átfogó Pitagorasz-tétellel c = 10 cm, így c\' = 20 cm. A terület T = 24 cm², így T\' = (-2)² · 24 = 4 · 24 = 96 cm².'}
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

export default Chapter2GeometrySummaryTheory;
