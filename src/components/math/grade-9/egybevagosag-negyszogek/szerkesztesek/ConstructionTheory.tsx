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
  SegmentBisectorSvg,
  AngleBisectorSvg,
  ConstructibleAnglesSvg
} from './ConstructionFigures';
import {
  Compass,
  Ruler,
  Sliders,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConstructionTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ConstructionTheory: React.FC<ConstructionTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV SZERKESZTÉSI LÉPÉS-LABOR ÁLLAPOTOK ---
  const [selectedTask, setSelectedTask] = useState<'bisector' | 'angle' | 'sixty'>('bisector');
  const [step, setStep] = useState<number>(1);

  const taskData = {
    bisector: {
      title: 'Szakaszfelező merőleges szerkesztése',
      totalSteps: 3,
      steps: [
        {
          num: 1,
          name: 'Kiindulási állapot és körzőnyílás',
          desc: 'Adott az AB szakasz. Körzőnyílásba veszünk egy R sugarat, amely szemre nagyobb, mint a szakasz fele (R > AB/2).'
        },
        {
          num: 2,
          name: 'Körívek rajzolása a két végpontból',
          desc: 'Az A pontból, majd a B pontból is változatlan R sugárral köríveket húzunk a szakasz mindkét oldalára. A körívek két pontban metszik egymást (P és Q).'
        },
        {
          num: 3,
          name: 'A metszéspontok összekötése',
          desc: 'Vonalzóval összekötjük a P és Q metszéspontokat. A PQ egyenes a szakaszfelező merőleges (f_AB), amely az F felezőpontban metszi és merőlegesen felezi az AB szakaszt.'
        }
      ]
    },
    angle: {
      title: 'Szögfelező szerkesztése',
      totalSteps: 3,
      steps: [
        {
          num: 1,
          name: 'Szárak elmetszése',
          desc: 'A szög V csúcsából tetszőleges R sugárral körívet húzunk, amely a szög mindkét szárát elmetszi (K és L pontok).'
        },
        {
          num: 2,
          name: 'Körívek a metszéspontokból',
          desc: 'A K és L pontokból azonos r sugárral köríveket húzunk a szögtartomány belsejébe, ezek metszéspontja legyen P.'
        },
        {
          num: 3,
          name: 'A szögfelező félegyenes megrajzolása',
          desc: 'A V csúcsot összekötjük a P metszésponttal. A VP félegyenes a szög szögfelezője (f_α), melynek minden pontja egyenlő távol van a száraktól.'
        }
      ]
    },
    sixty: {
      title: '60°-os szög szerkesztése (Szabályos háromszög)',
      totalSteps: 3,
      steps: [
        {
          num: 1,
          name: 'Kezdő félegyenes és alapkörív',
          desc: 'Félvonalat rajzolunk O kezdőponttal. O-ból tetszőleges R sugárral körívet húzunk, elmetszve a félegyenest az A pontban.'
        },
        {
          num: 2,
          name: 'Sugár átmásolása A pontból',
          desc: 'Változatlan R körzőnyílással az A pontból körívet húzunk, amely elmetszi az előző körívet a B pontban.'
        },
        {
          num: 3,
          name: 'A 60°-os szár megrajzolása',
          desc: 'Az O kezdőpontot összekötjük a B ponttal. Az AOB szög pontosan 60°-os, hiszen az OAB háromszög minden oldala egyenlő (R).'
        }
      ]
    }
  };

  const currentTask = taskData[selectedTask];

  return (
    <TheoryTemplate
      title="4. Szerkesztések"
      subtitle="Euklideszi alapszerkesztések körzővel és vonalzóval, merőlegesek és párhuzamosak, nevezetes szögek és sokszögek felépítése 9. osztályban"
      badge="9. Osztály • VI. Egybevágóság, négyszögek"
      topicBadge="9. OSZTÁLY • VI. EGYBEVÁGÓSÁG • 4. SZERKESZTÉSEK"
      onBack={onBack}
      onSwitchToQuiz={onStartQuiz}
      practiceTitle="Készen állsz a szerkesztési feladványokra?"
      practiceSubtitle="Tedd próbára tudásodat a 30 válogatott feladatból álló, 3 szintre bontott interaktív kvízben!"
      practiceButtonText="Kvíz indítása"
      quickRule={{
        label: "Aranyszabály: Euklideszi szerkesztési eszközök",
        formula: "Körző (távolság másolása, körívek) + Egyélű vonalzó (egyenesek húzása metszéspontokon át)",
        align: "center"
      }}
    >
      {/* =========================================================================
          1. RÉSZ: EUKLIDESZI ALAPSZERKESZTÉSEK
      ========================================================================= */}
      <TheorySection
        title="1. Euklideszi alapszerkesztések körzővel és vonalzóval"
        icon={<Compass className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="A geometriai szerkesztés eszközei és a mértani helyek"
          icon={<Ruler className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A klasszikus geometriában (euklideszi szerkesztés) <strong>kizárólag két eszközt</strong> használhatunk: beosztás nélküli <strong>egyélű vonalzót</strong> (két pont összekötésére) és <strong>körzőt</strong> (adott pont körüli adott sugarú körív megrajzolására).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-4">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <SegmentBisectorSvg size={300} />
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900">
                <span className="font-bold text-blue-900 dark:text-blue-200">1. Szakaszfelező merőleges:</span>
                <p className="mt-1">
                  A sík azon pontjainak mértani helye, amelyek egyenlő távol vannak a szakasz két végpontjától (|PA| = |PB|).
                </p>
                <div className="font-mono text-xs text-blue-800 dark:text-blue-300 mt-1">
                  Körívek sugara: R &gt; AB / 2 mindkét végpontból.
                </div>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-900">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">2. Szögfelező:</span>
                <p className="mt-1">
                  A szögtartomány azon pontjainak mértani helye, amelyek egyenlő távol vannak a szög két szárától: d(P, e) = d(P, f).
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-900">
                <span className="font-bold text-purple-900 dark:text-purple-200">3. Szakasz- és szögmásolás:</span>
                <p className="mt-1">
                  Szakasz átmásolása körzőnyílással; szög átmásolása azonos sugarú körívek és a szárak közötti húrhossz kimérésével.
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. RÉSZ: MERŐLEGES ÉS PÁRHUZAMOS EGYENESEK
      ========================================================================= */}
      <TheorySection
        title="2. Merőleges és párhuzamos egyenesek szerkesztése"
        icon={<Ruler className="w-6 h-6 text-indigo-600" />}
      >
        <TheoryCard
          title="Merőleges állítása pontból és párhuzamos szerkesztése"
          icon={<Compass className="w-5 h-5 text-indigo-600" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-2">
            <div className="flex justify-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <AngleBisectorSvg size={300} />
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-900">
                <span className="font-bold text-indigo-900 dark:text-indigo-200">Merőleges állítása az egyenes P pontjában:</span>
                <p className="mt-1">
                  A P pontból mindkét irányba azonos távolságot mérünk az egyenesen (A és B pontok), majd az AB szakaszra szakaszfelező merőlegest állítunk.
                </p>
              </div>

              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-lg border border-teal-200 dark:border-teal-900">
                <span className="font-bold text-teal-900 dark:text-teal-200">Merőleges bocsátása külső P pontból:</span>
                <p className="mt-1">
                  A külső P pontból körívet húzunk, amely két pontban (A és B) metszi az egyenest. Az AB szakasz felezőmerőlegese átmegy P-n és merőleges az egyenesre.
                </p>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-900">
                <span className="font-bold text-amber-900 dark:text-amber-200">Párhuzamos egyenes szerkesztése P ponton át:</span>
                <p className="mt-1">
                  Tetszőleges metsző egyenest húzunk P-n át, majd átmásoljuk a keletkező váltószöget a P ponthoz (váltószögek egyenlősége $\implies$ párhuzamosság).
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          3. RÉSZ: NEVEZETES SZÖGEK ÉS SOKSZÖGEK
      ========================================================================= */}
      <TheorySection
        title="3. Nevezetes szögek és sokszögek szerkesztése"
        icon={<Sparkles className="w-6 h-6 text-purple-600" />}
      >
        <TheoryCard
          title="Mely szögek szerkeszthetők meg körzővel és vonalzóval?"
          icon={<Sparkles className="w-5 h-5 text-purple-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Alapszögekből (60° és 90°) szögfelezésekkel és szögösszeadásokkal/kivonásokkal minden olyan szög megszerkeszthető, amely a <strong>15° többszöröse</strong>!
          </p>

          <div className="flex justify-center my-4">
            <ConstructibleAnglesSvg size={440} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2 text-xs md:text-sm">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900 space-y-2">
              <h4 className="font-bold text-purple-900 dark:text-purple-200">
                A szerkesztési feladat 4 elengedhetetlen lépése:
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300 text-xs">
                <li><strong>1. Elemzés:</strong> Vázlatrajz készítése, adott adatok feltüntetése, geometriai összefüggések (tételek, mértani helyek) keresése.</li>
                <li><strong>2. Szerkesztés menete:</strong> A lépések pontos, tömör leírása (pl. félegyenes felvétele, körívek metszéspontjai).</li>
                <li><strong>3. Bizonyítás:</strong> Annak igazolása, hogy a kapott alakzat valóban rendelkezik a megadott adatokkal és tulajdonságokkal.</li>
                <li><strong>4. Diszkusszió (Megvitatás):</strong> Annak vizsgálata, hogy a megadott adatoktól függően hány megoldás létezik (0, 1 vagy több).</li>
              </ol>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 space-y-2">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-200">
                Háromszögek egyértelmű szerkesztési esetei:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 text-xs">
                <li><strong>Három oldal (ooo):</strong> Ha teljesül a háromszög-egyenlőtlenség: a + b &gt; c, a + c &gt; b, b + c &gt; a.</li>
                <li><strong>Két oldal és közbezárt szög (oszó):</strong> Mindig pontosan 1 megoldás van.</li>
                <li><strong>Egy oldal és két rajta fekvő szög (szosz):</strong> Ha a két szög összege &lt; 180°.</li>
                <li><strong>Két oldal és a nagyobbikkal szemközti szög:</strong> Pontosan 1 megoldás.</li>
              </ul>
            </div>
          </div>
        </TheoryCard>

        {/* CSAPDÁK ÉS TÉVHITEK */}
        <TheoryTrapBox
          title="Típushibák és bukási pontok a szerkesztési feladatoknál"
          traps={[
            {
              trap: "Bármilyen háromszög megszerkeszthető három tetszőleges oldalhosszból.",
              correction: "NEM! A háromszög-egyenlőtlenségnek kötelezően teljesülnie kell: bármely két oldal összege szigorúan nagyobb kell legyen a harmadiknál (pl. a = 2, b = 3, c = 6 esetén nincs háromszög, mert 2 + 3 < 6)."
            },
            {
              trap: "A szögfelezéshez meg kell mérni a szög nagyságát szögmérővel.",
              correction: "Az euklideszi geometriában a szögmérő és a vonalzó beosztásának használata TILOS! A szögfelezés tisztán körzővel, körívek metszéspontjainak segítségével történik."
            },
            {
              trap: "Minden egész fokú szög megszerkeszthető körzővel és vonalzóval.",
              correction: "NEM! A klasszikus szerkesztéssel csak a 15° többszörösei (valamint a Fermat-prímekből származó szögek) szerkeszthetők meg. Például a 20°-os szög vagy egy tetszőleges szög harmadolása (szögharmadolás) bizonyítottan lehetetlen körzővel és vonalzóval!"
            },
            {
              trap: "A szerkesztés menetének leírása elhagyható, ha a rajz pontos.",
              correction: "A dolgozatokban és az érettségin a rajz mellé KÖTELEZŐ a szerkesztés lépéseinek szöveges vagy szimbólumos leírása és az elemzés vázlata!"
            }
          ]}
        />
      </TheorySection>

      {/* =========================================================================
          4. RÉSZ: INTERAKTÍV LABOR: SZERKESZTÉSI LÉPÉS-VIZSGÁLÓ
      ========================================================================= */}
      <TheorySection
        title="4. Interaktív Labor: Lépésről Lépésre Szerkesztő Szimulátor"
        icon={<Sliders className="w-6 h-6 text-blue-600" />}
      >
        <TheoryCard
          title="Kövesd végig a kulcsfontosságú szerkesztések lépéseit interaktívan!"
          icon={<Compass className="w-5 h-5 text-blue-600" />}
        >
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Válaszd ki a kívánt alapszerkesztést, majd a navigációs gombokkal lépegess végig a szerkesztés lépésein!
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            {/* Feladatválasztó */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">Szerkesztés:</span>
              <Button
                variant={selectedTask === 'bisector' ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setSelectedTask('bisector'); setStep(1); }}
                className="h-8 text-xs font-bold rounded-lg"
              >
                Szakaszfelező merőleges
              </Button>
              <Button
                variant={selectedTask === 'angle' ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setSelectedTask('angle'); setStep(1); }}
                className="h-8 text-xs font-bold rounded-lg"
              >
                Szögfelező
              </Button>
              <Button
                variant={selectedTask === 'sixty' ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setSelectedTask('sixty'); setStep(1); }}
                className="h-8 text-xs font-bold rounded-lg"
              >
                60°-os szög
              </Button>
            </div>

            {/* Lépés navigátor és leírás */}
            <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {currentTask.title}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {step}. Lépés: {currentTask.steps[step - 1].name}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400 mr-1">
                    {step} / {currentTask.totalSteps}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={step === 1}
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    disabled={step === currentTask.totalSteps}
                    onClick={() => setStep((s) => Math.min(currentTask.totalSteps, s + 1))}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Lépés leírása */}
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {currentTask.steps[step - 1].desc}
              </p>

              {/* Lépésjelző folyamatjelző pontok */}
              <div className="flex items-center gap-2 pt-2">
                {currentTask.steps.map((st) => (
                  <button
                    key={st.num}
                    onClick={() => setStep(st.num)}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      step === st.num
                        ? 'bg-blue-600'
                        : step > st.num
                        ? 'bg-blue-300 dark:bg-blue-800'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>
    </TheoryTemplate>
  );
};

