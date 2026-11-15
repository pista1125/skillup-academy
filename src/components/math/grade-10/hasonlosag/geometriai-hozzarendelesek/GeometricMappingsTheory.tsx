import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  TransformationHierarchySvg,
  OrthogonalProjectionSvg,
  SundialProjectionSvg,
  TechnicalDrawingViewsSvg,
  VectorWorkProjectionSvg
} from './GeometricMappingsFigures';
import {
  GitMerge,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Check,
  X,
  Layers,
  Compass,
  Sun,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeometricMappingsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface Scenario {
  id: string;
  title: string;
  category: string;
  source: string;
  description: string;
  takeaway: string;
}

const scenarios: Scenario[] = [
  {
    id: 'sc1',
    title: 'A Napóra működési elve',
    category: 'Párhuzamos vetítés',
    source: 'Csillagászati és optikai vetítés',
    description: 'A Nap fénysugaraival párhuzamos vetítést hozunk létre a számlap síkjára. Az árnyékháromszög alakja és szögei a Nap állásától függően folyamatosan változnak.',
    takeaway: 'A párhuzamos vetítés térből síkba képez le (dimenziócsökkenés), nem távolságtartó és nem szögtartó!'
  },
  {
    id: 'sc2',
    title: 'Műszaki vetületek (Monge-rendszer)',
    category: 'Mérnöki ábrázolás',
    source: 'Ábrázoló geometria (Monge-képsíkok)',
    description: 'Egy 3D testet egymásra merőleges képsíkokra (elölnézet, felülnézet, oldalnézet) vetítünk. A vetületek együtt egyértelműen rögzítik a térbeli test formáját.',
    takeaway: 'A vetület síkbeli kép; egyenként információt veszítenek, de a három nézet együtt meghatározza a testet.'
  },
  {
    id: 'sc3',
    title: 'Erővektor munkája a fizikában',
    category: 'Fizikai alkalmazás',
    source: 'Mechanikai munkavégzés',
    description: 'Mechanikai munkát csak az erővektor elmozdulás irányú merőleges vetülete végez: W = F_∥ · s = F · s · cos(α). Ha az erő merőleges az elmozdulásra (α = 90°), W = 0!',
    takeaway: 'A merőleges vetület nagysága |F| · cos(α), ez határozza meg a hatásos fizikai erőt.'
  },
  {
    id: 'sc4',
    title: 'Árnyjáték illúziója',
    category: 'Dimenzióvesztés',
    source: 'Térbeli testek árnyékvetülete',
    description: 'Különböző testek árnyékát vizsgálva a henger, a téglatest és a hasáb adhat téglalap alakú árnyékot, de a GÖMB párhuzamos vetülete mindig kör vagy ellipszis.',
    takeaway: 'A gömb semmilyen vetítési irányból sem adhat téglalap alakú árnyékot!'
  },
  {
    id: 'sc5',
    title: 'Kockaépítmények felülnézete',
    category: 'Térszemlélet',
    source: 'Térbeli építmények vetületei',
    description: 'A felülnézeti rácsban a számok az oszlopok magasságát mutatják. Elöl- és oldalnézetben az adott nézési vonalba eső magasságok MAXIMUMA látszik.',
    takeaway: 'A vetületi képen az egymás mögötti testek közül a legmagasabb pont fedi el az alacsonyabbakat.'
  },
  {
    id: 'sc6',
    title: 'Transzformációk összetétele (János terve)',
    category: 'Hasonlóság definíciója',
    source: 'Transzformációk kompozíciója',
    description: 'A túl nagy rajzot János 1:4 arányban kicsinyíti (középpontos hasonlóság), elküldi e-mailben, majd a mérnök kinyomtatja és elforgatja az asztalon (egybevágóság).',
    takeaway: 'Hasonlóság = Középpontos hasonlóság és Egybevágóság egymásutánja (kompozíciója)!'
  }
];

export const GeometricMappingsTheory: React.FC<GeometricMappingsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív modul 1 állapota (szög a vetülethez)
  const [angleDeg, setAngleDeg] = useState<number>(30);

  // Interaktív modul 2 állapota (kiválasztott szcenárió)
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc1');

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];

  // Számítások az 1. modulhoz
  const baseSegmentLength = 10; // 10 cm
  const rad = (angleDeg * Math.PI) / 180;
  const projectedLength = (baseSegmentLength * Math.cos(rad)).toFixed(2);
  const cosVal = Math.cos(rad).toFixed(3);

  return (
    <TheoryTemplate
      title="3. Geometriai hozzárendelések"
      subtitle="A sík geometriai leképezései, a transzformációk rendszere, merőleges vetítés és műszaki alkalmazások"
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      themeColor="rose"
      pdfExportId="grade10-geometric-mappings-theory"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — GEOMETRIAI HOZZÁRENDELÉSEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80">
              <span className="text-xs font-black text-rose-900 dark:text-rose-200 block mb-1">
                ✓ Merőleges vetítés és transzformációs hierarchia:
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs font-black text-rose-900 dark:text-rose-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-rose-300">
                  |a&apos;| = |a| · cos(α) ≤ |a|
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-rose-300">
                  W = F · s · cos(α)
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Geometriai transzformáció:</strong> Kölcsönösen egyértelmű (bijektív) leképezés a teljes síkról önmagára.
              </li>
              <li>
                <strong>Részhalmaz-lánc:</strong> Hozzárendelések $\supset$ Transzformációk $\supset$ Hasonlóságok ($\lambda &gt; 0$) $\supset$ Egybevágóságok ($\lambda = 1$).
              </li>
              <li>
                <strong>Vetítés:</strong> Nem bijektív (dimenziócsökkenés); merőleges szakasz képe pont, $r$ sugarú kör képe $2r$ hosszúságú szakasz.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. FEJEZET */}
      <TheorySection
        title="1. A geometriai hozzárendelések és transzformációk fogalma"
        icon={<GitMerge className="w-5 h-5 text-indigo-500" />}
      >
        <TheoryCard title="Függvények pontok között" variant="normal">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-xs sm:text-sm">
            Az algebrában megszoktuk, hogy számokhoz számokat rendelünk hozzá (pl. <MathText text="x \mapsto x^2" />).
            A geometriában ugyanígy értelmezhetünk függvényeket, amelyek <strong>ponthalmazhoz ponthalmazt</strong> rendelnek hozzá.
            Ezeket <strong>geometriai hozzárendeléseknek</strong> vagy leképezéseknek nevezzük.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="space-y-3">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900">
                <h5 className="font-bold text-xs text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Mikor beszélünk Geometriai Transzformációról?
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Egy geometriai leképezés akkor <strong>transzformáció</strong>, ha:
                </p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside mt-1">
                  <li><strong>Kölcsönösen egyértelmű (bijektív):</strong> minden pontnak pontosan egy képe van, és minden képpontnak egyetlen ősképe létezik.</li>
                  <li><strong>A teljes alaphalmazt önmagára képezi le:</strong> az értelmezési tartomány és az értékkészlet ugyanaz a ponthalmaz (pl. a teljes sík).</li>
                </ul>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900">
                <h5 className="font-bold text-xs text-amber-900 dark:text-amber-300 mb-1">
                  Egybevágóság vs. Hasonlóság kapcsolata
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Az egybevágósági transzformációk (<MathText text="\lambda = 1" />, távolságtartók) <strong>valódi részhalmazát</strong> alkotják
                  a hasonlósági transzformációk halmazának! Minden egybevágóság hasonlóság, de nem minden hasonlóság egybevágóság.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <TransformationHierarchySvg size={280} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. FEJEZET */}
      <TheorySection
        title="2. A merőleges vetítés geometriája és speciális esetei"
        icon={<Activity className="w-5 h-5 text-indigo-500" />}
      >
        <TheoryCard title="Miért nem transzformáció a merőleges vetítés?" variant="highlight">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
            A sík pontjait merőlegesen vetítve egy <MathText text="e" /> egyenesre egy olyan hozzárendelést kapunk, amely
            <strong>nem távolságtartó és nem szögtartó</strong>. A vetítés során a dimenzió csökken (2D sík ↦ 1D egyenes),
            így egyetlen képpontba végtelen sok pont vetül (a vetítővonal pontjai).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4">
            <div className="flex items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <OrthogonalProjectionSvg size={280} />
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-sky-600 block mb-0.5">1. Szakasz vetülete:</span>
                Hossza legfeljebb akkora, mint az eredeti: <MathText text="|a'| = |a| \cdot \cos(\alpha) \le |a|" />.
                Egyenlő csak akkor lehet, ha a szakasz párhuzamos <MathText text="e" />-vel (<MathText text="\alpha = 0^\circ" />).
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600 block mb-0.5">2. Merőleges szakasz vetülete:</span>
                Ha a szakasz merőleges a vetületi egyenesre (<MathText text="\alpha = 90^\circ" />), akkor <MathText text="\cos(90^\circ) = 0" />,
                így a teljes szakasz <strong>egyetlen ponttá zsugorodik</strong>!
              </div>

              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-purple-600 block mb-0.5">3. Körvonal vetülete:</span>
                A körvonal merőleges vetülete az egyenesen egy <strong><MathText text="2r" /> hosszúságú zárt szakasz</strong> (a kör átmérője).
              </div>
            </div>
          </div>

          <TheoryTable
            headers={['Alakzat a síkon', 'Képe az e egyenesen', 'Mikor maximális a méret?', 'Invariáns-e?']}
            rows={[
              ['Pont', 'Pont', 'Mindig 1 pont', 'Igen'],
              ['Szakasz (|a|)', 'Szakasz (|a| · cos α)', 'Ha a ∥ e (α = 0°)', 'Nem (rövidül)'],
              ['e-re merőleges szakasz', 'Egyetlen pont', 'Hossza 0', 'Nem (ponttá válik)'],
              ['Körvonal (sugarú r)', 'Szakasz (hossza 2r)', 'Mindig 2r', 'Nem (dimenziócsökkenés)'],
              ['Derékszögű 3szög befogói', 'p és q szakaszok az átfogón', 'Összegük p + q = c', 'Metrikus összefüggés']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* 3. FEJEZET */}
      <TheorySection
        title="3. Műszaki rajzok, Napóra és Dimenziócsökkenés"
        icon={<Sun className="w-5 h-5 text-indigo-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A Napóra Párhuzamos Vetítése" variant="normal">
            <div className="flex items-center justify-center p-2 mb-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <SundialProjectionSvg size={260} />
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A Nap hatalmas távolsága miatt a Földre érkező sugarak párhuzamosnak tekinthetők.
              Az árnyékvető háromszög alapja (<MathText text="BC" />) rögzített a számlapon, de az <MathText text="A" /> csúcs árnyéka
              a nap során végigvándorol a számlapon, létrehozva az időmérést.
            </p>
          </TheoryCard>

          <TheoryCard title="Műszaki Vetületek: Monge-képsíkok" variant="normal">
            <div className="flex items-center justify-center p-2 mb-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <TechnicalDrawingViewsSvg size={260} />
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A mérnöki gyakorlatban a testeket három merőleges vetülettel ábrázoljuk:
              <strong>elölnézet</strong>, <strong>felülnézet</strong> és <strong>oldalnézet</strong>.
              Bár az egyes nézetek dimenziócsökkenéssel járnak, a három nézet együtt egyértelműen meghatározza a 3D alakzatot.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. FEJEZET */}
      <TheorySection
        title="4. Fizikai Munkavégzés és Erővektor Vetülete"
        icon={<Layers className="w-5 h-5 text-indigo-500" />}
      >
        <TheoryCard title="Mechanikai munka: W = F · s · cos(α)" variant="normal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="space-y-3">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                A fizikában akkor beszélünk munkavégzésről, ha erő hatására elmozdulás történik.
                A mechanikai munkát úgy számítjuk ki, hogy az elmozdulás nagyságát megszorozzuk az erő
                <strong>elmozdulás irányába eső merőleges vetületével</strong>:
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900">
                <div className="font-mono text-sm font-black text-emerald-800 dark:text-emerald-300 text-center">
                  <MathText text="W = F_{\parallel} \cdot s = F \cdot s \cdot \cos(\alpha)" />
                </div>
              </div>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                <li>Ha <MathText text="\alpha = 0^\circ" />: az erő az elmozdulás irányába hat ⟹ maximális munka (<MathText text="W = F \cdot s" />).</li>
                <li>Ha <MathText text="\alpha = 90^\circ" />: az erő merőleges az elmozdulásra ⟹ a vetület 0, <strong>nincs munkavégzés</strong> (<MathText text="W = 0" />).</li>
                <li>Ha <MathText text="90^\circ < \alpha \le 180^\circ" />: fékezőerő ⟹ negatív munka.</li>
              </ul>
            </div>

            <div className="flex items-center justify-center p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <VectorWorkProjectionSvg size={280} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. FEJEZET: INTERAKTÍV LABORATÓRIUMOK */}
      <TheorySection
        title="5. Interaktív Laboratóriumok és Szimulációk"
        icon={<Zap className="w-5 h-5 text-indigo-500" />}
      >
        {/* INTERAKTÍV MODUL 1: DINAMIKUS VETÜLET KALKULÁTOR */}
        <TheoryCard title="Laboratórium I: Dinamikus Merőleges Vetület & Szakaszrövidülés" variant="highlight">
          <p className="text-slate-700 dark:text-slate-300 mb-4 text-xs sm:text-sm">
            Változtasd meg a szakasz hajlásszögét (<MathText text="\alpha" />), és vizsgáld meg, hogyan rövidül meg a merőleges vetülete az egyenesen!
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-bold text-slate-500 mr-2">Hajlásszög (α):</span>
            {[0, 30, 45, 60, 90].map((deg) => (
              <Button
                key={deg}
                size="sm"
                variant={angleDeg === deg ? 'default' : 'outline'}
                onClick={() => setAngleDeg(deg)}
                className={`text-xs font-bold h-8 px-3 rounded-xl ${angleDeg === deg
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                  }`}
              >
                {deg}°
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-center bg-white dark:bg-slate-950 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
              <OrthogonalProjectionSvg size={280} />
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Eredeti szakasz hossza (|a|):</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{baseSegmentLength} cm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Szög koszinusza (cos {angleDeg}°):</span>
                  <span className="font-mono font-bold text-indigo-600">{cosVal}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 dark:border-slate-700 pt-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Merőleges vetület (|a'|):</span>
                  <span className="font-mono font-black text-rose-600 dark:text-rose-400 text-sm">
                    {projectedLength} cm
                  </span>
                </div>
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900 text-slate-700 dark:text-slate-300">
                {angleDeg === 0 && '✓ Párhuzamos állás: a vetület hossza pontosan megegyezik az eredetivel (10 cm).'}
                {angleDeg > 0 && angleDeg < 90 && `Ferdeszögű állás: a szakasz ${projectedLength} cm-re rövidül le.`}
                {angleDeg === 90 && '✗ Merőleges állás: a szakasz egyetlen ponttá zsugorodik (hossza 0 cm)!'}
              </div>
            </div>
          </div>
        </TheoryCard>

        {/* INTERAKTÍV MODUL 2: SZCENÁRIÓTÁR */}
        <div className="mt-6">
          <TheoryCard title="Laboratórium II: Valós Életbeli Szcenáriók" variant="highlight">
            <p className="text-slate-700 dark:text-slate-300 mb-3 text-xs sm:text-sm">
              Válassz egy szcenáriót a gyakorlati példák és térszemléleti feladatok közül!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all text-left border ${selectedScenarioId === sc.id
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                    }`}
                >
                  <div className="truncate font-semibold">{sc.title}</div>
                  <div
                    className={`text-[10px] truncate ${selectedScenarioId === sc.id ? 'text-indigo-100' : 'text-indigo-600 dark:text-indigo-400'
                      }`}
                  >
                    {sc.category}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Forrás: {activeScenario.source}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-900 border border-indigo-300">
                  {activeScenario.category}
                </span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
                <strong>Leírás:</strong> {activeScenario.description}
              </div>

              <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-200">
                <strong>Matematikai tanulság:</strong> {activeScenario.takeaway}
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GeometricMappingsTheory;

