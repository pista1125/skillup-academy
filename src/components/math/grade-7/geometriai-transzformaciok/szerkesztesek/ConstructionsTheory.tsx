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
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Sliders,
  Compass,
  Check,
  BookOpen,
  HelpCircle,
  Hash,
  Divide,
  Circle as CircleIcon,
  CircleDot,
  Lightbulb,
  Maximize2,
  Minimize2,
  Ruler,
  Layers,
  Triangle,
  Pencil,
  ArrowRight,
  Eye,
  CheckSquare
} from 'lucide-react';
import { MathText, Fraction } from '@/components/math/shared/MathText';

interface ConstructionsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ConstructionsTheory: React.FC<ConstructionsTheoryProps> = ({ onBack, onStartQuiz }) => {
  // Interactive simulator state: tab selection
  const [activeLabTab, setActiveLabTab] = useState<'bisector' | 'angle-bisector' | 'notable-angles' | 'triangle'>('bisector');

  // Simulator step controls (1 to 4)
  const [stepBisector, setStepBisector] = useState<number>(3);
  const [stepAngleBisector, setStepAngleBisector] = useState<number>(3);
  const [selectedAngle, setSelectedAngle] = useState<60 | 90 | 30 | 45 | 75 | 120>(60);
  const [triangleType, setTriangleType] = useState<'sss' | 'sas' | 'asa'>('sss');

  return (
    <TheoryTemplate
      title="13. Szerkesztések"
      subtitle="Euklideszi alapszerkesztések körzővel és vonalzóval: szakaszfelezés, merőlegesek, szögmásolás, szögfelezés, nevezetes szögek és háromszögszerkesztések"
      badgeText="7. OSZTÁLY • GEOMETRIA • 📖 TANANYAG"
      themeColor="teal"
      pdfFilename="7_osztaly_geometriai_szerkesztesek.pdf"
      quickRule={{
        label: 'A szerkesztések aranyszabályai',
        formula: 'Euklideszi eszközök: körző + egyélű vonalzó | Szakaszfelező: |PA| = |PB| | Szögfelező: d(P,a) = d(P,b) | 60°: szabályos 3-szög | 90°: 180° felezése | 3-szög: a+b > c'
      }}
      estimatedTime="40-45 perc"
      difficulty="Közepes"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZEKCIÓ: AZ EUKLIDESZI SZERKESZTÉSEK SZABÁLYAI */}
      <TheorySection
        number={1}
        title="Az Euklideszi Szerkesztések Alapszabályai"
        badgeColor="teal"
        icon={<Pencil className="w-5 h-5 text-teal-600" />}
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          A geometriai szerkesztések az ókori görög matematikus, Eukleidész óta szigorú szabályok szerint zajlanak.
          Kizárólag két ideális eszközt használhatunk: <strong>beosztás nélküli egyenes vonalzót</strong> és <strong>körzőt</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="1. A Vonalzó Szerepe"
            variant="teal"
            badge="Egyenesek & Szakaszok"
            properties={[
              'Megengedett: Két adott pont összekötése egyenessel vagy szakasszal.',
              'Megengedett: Egy meglévő szakasz meghosszabbítása egyenes vonalban.',
              'SZIGORÚAN TILOS: Hosszúságot mérni a vonalzó beosztásával!',
              'SZIGORÚAN TILOS: Derékszöget felrajzolni a vonalzó sarkával!'
            ]}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A vonalzó az elméleti geometriában <em>egyélű és jelölés nélküli</em>. Kizárólag az egyenesség biztosítására és pontok összekötésére szolgál.
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. A Körző Szerepe"
            variant="cyan"
            badge="Távolságok & Körívek"
            properties={[
              'Megengedett: Adott pont köré adott sugárral kör vagy körív rajzolása.',
              'Megengedett: Távolság (szakaszhossz) levétele és átvitele másik helyre.',
              'Megengedett: Két körív vagy körív és egyenes metszéspontjának meghatározása.',
              'A körző a távolságok és arányok átvitelének egyedüli hiteles eszköze!'
            ]}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              A körző a pontok mértani helyét hozza létre: minden pontja pontosan azonos távolságra van a tű beszúrási pontjától.
            </p>
          </TheoryCard>
        </div>

        {/* 4 Lépéses Szerkesztési Módszertan Callout */}
        <TheoryCallout
          variant="teal"
          title="A szerkesztési feladatok hivatalos 4 lépése:"
          icon={<CheckSquare className="w-5 h-5 text-teal-600" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs mt-2">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60">
              <strong className="text-teal-800 dark:text-teal-300 block mb-0.5">1. Elemzés & Vázlat</strong>
              Szabadkézi rajz, adott adatok színessel való kiemelése és az összefüggések keresése.
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60">
              <strong className="text-teal-800 dark:text-teal-300 block mb-0.5">2. Szerkesztés menete</strong>
              Lépések pontos leírása matematikai jelölésekkel (pl. <MathText>k(A, r) ∩ k(B, r)</MathText>).
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60">
              <strong className="text-teal-800 dark:text-teal-300 block mb-0.5">3. Pontos szerkesztés</strong>
              A rajz precíz kivitelezése hegyes ceruzával, körzővel és vonalzóval.
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60">
              <strong className="text-teal-800 dark:text-teal-300 block mb-0.5">4. Bizonyítás & Diszkusszió</strong>
              Indoklás (miért jó a kapott alakzat), és hány megoldás létezik a feltételek mellett.
            </div>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZEKCIÓ: SZAKASZFELEZŐ MERŐLEGES ÉS SZAKASZFELEZÉS */}
      <TheorySection
        number={2}
        title="Szakaszfelező Merőleges és Szakaszfelezés"
        badgeColor="teal"
        icon={<Compass className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
          <div className="lg:col-span-7 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              A szakaszfelező merőleges (<em>f</em><sub>AB</sub>) szerkesztése:
            </h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Körzőnyílás beállítása:</strong> Nyissuk a körzőt a szakasz felénél szemmel láthatóan nagyobbra: <MathText>r &gt; |AB| / 2</MathText>.
              </li>
              <li>
                <strong>Körívezés az <MathText>A</MathText> pontból:</strong> Húzzunk köríveket a szakasz mindkét oldalán (fenn és lenn).
              </li>
              <li>
                <strong>Körívezés a <MathText>B</MathText> pontból:</strong> Ugyanezzel az <MathText>r</MathText> sugárral messük el az előző íveket. Megkapjuk az <MathText>M₁</MathText> és <MathText>M₂</MathText> pontokat.
              </li>
              <li>
                <strong>Összekötés:</strong> A vonalzóval összekötjük az <MathText>M₁</MathText> és <MathText>M₂</MathText> pontokat. Ez az egyenes a szakasz <strong>felezőmerőlegese</strong> (<MathText>f</MathText>), és ahol elmetszi az <MathText>AB</MathText> szakaszt, ott van a szakasz <MathText>F</MathText> <strong>felezőpontja</strong>.
              </li>
            </ol>

            <div className="p-3 bg-teal-50/70 dark:bg-slate-900 rounded-xl border border-teal-200 dark:border-teal-900/60 font-medium">
              ⭐ <strong>Mértani hely tétel:</strong> A sík azon pontjainak halmaza, amelyek a szakasz két végpontjától egyenlő távolságra vannak (<MathText>|PA| = |PB|</MathText>), a szakasz felezőmerőleges egyenese!
            </div>
          </div>

          {/* SVG Diagram: Perpendicular bisector */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-teal-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
            <svg viewBox="0 0 240 180" className="w-full max-w-[220px]">
              {/* Segment AB */}
              <line x1="40" y1="90" x2="200" y2="90" stroke="#0f766e" strokeWidth="2.5" />
              <circle cx="40" cy="90" r="3.5" fill="#0f766e" />
              <circle cx="200" cy="90" r="3.5" fill="#0f766e" />
              <text x="28" y="94" className="text-[11px] font-bold fill-teal-900 dark:fill-teal-200">A</text>
              <text x="206" y="94" className="text-[11px] font-bold fill-teal-900 dark:fill-teal-200">B</text>

              {/* Arcs from A */}
              <path d="M 120 20 A 90 90 0 0 1 120 50" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M 120 130 A 90 90 0 0 1 120 160" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 2" />

              {/* Arcs from B */}
              <path d="M 120 20 A 90 90 0 0 0 120 50" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M 120 130 A 90 90 0 0 0 120 160" fill="none" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="3 2" />

              {/* Intersection points M1 and M2 */}
              <circle cx="120" cy="35" r="3" fill="#e11d48" />
              <circle cx="120" cy="145" r="3" fill="#e11d48" />
              <text x="126" y="38" className="text-[9px] font-bold fill-rose-600">M₁</text>
              <text x="126" y="148" className="text-[9px] font-bold fill-rose-600">M₂</text>

              {/* Bisector line */}
              <line x1="120" y1="15" x2="120" y2="165" stroke="#e11d48" strokeWidth="2" />
              <text x="124" y="24" className="text-[11px] font-bold fill-rose-600">f</text>

              {/* Midpoint F */}
              <circle cx="120" cy="90" r="3.5" fill="#4f46e5" />
              <text x="124" y="85" className="text-[10px] font-bold fill-indigo-700">F</text>

              {/* Right angle symbol at F (Hungarian standard: circular arc + dot) */}
              <path d="M 120 78 A 12 12 0 0 1 132 90" fill="none" stroke="#e11d48" strokeWidth="1.3" />
              <circle cx="125" cy="85" r="1.3" fill="#e11d48" />
            </svg>
            <span className="text-[11px] text-slate-500 text-center mt-2">
              Az <MathText>f</MathText> egyenes egyszerre merőleges <MathText>AB</MathText>-re és felezi is azt (<MathText>|AF| = |FB|</MathText>).
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: MERŐLEGESEK ÁLLÍTÁSA ÉS BOCSÁTÁSA */}
      <TheorySection
        number={3}
        title="Merőleges Szerkesztése Adott Ponton Keresztül"
        badgeColor="teal"
        icon={<Ruler className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Merőleges állítása pontban */}
          <Card className="p-4 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">1. Merőleges állítása</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">P ∈ e (rajta van)</span>
              </div>
              <div className="bg-teal-50/50 dark:bg-slate-950 p-3 rounded-xl border border-teal-100 dark:border-slate-800 mb-3 flex justify-center">
                <svg viewBox="0 0 160 90" className="w-36 h-20">
                  <line x1="10" y1="65" x2="150" y2="65" stroke="#64748b" strokeWidth="1.8" />
                  <circle cx="80" cy="65" r="3" fill="#0f766e" />
                  <text x="82" y="78" className="text-[9px] font-bold fill-teal-900">P</text>
                  {/* Symmetrical points A, B */}
                  <circle cx="50" cy="65" r="2" fill="#0284c7" />
                  <circle cx="110" cy="65" r="2" fill="#0284c7" />
                  <text x="46" y="77" className="text-[8px] font-bold fill-sky-700">A</text>
                  <text x="112" y="77" className="text-[8px] font-bold fill-sky-700">B</text>
                  {/* Arcs above */}
                  <path d="M 70 20 A 45 45 0 0 1 90 20" fill="none" stroke="#14b8a6" strokeWidth="1.2" />
                  <circle cx="80" cy="20" r="2.5" fill="#e11d48" />
                  <line x1="80" y1="10" x2="80" y2="80" stroke="#e11d48" strokeWidth="1.8" />
                  <text x="84" y="16" className="text-[9px] font-bold fill-rose-600">m</text>
                </svg>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                A <MathText>P</MathText> pontból azonos <MathText>r</MathText> sugárral kimetszünk két pontot (<MathText>A</MathText> és <MathText>B</MathText>) az egyenesen, majd megszerkesztjük az <MathText>AB</MathText> szakasz felezőmerőlegesét.
              </p>
            </div>
            <div className="mt-2 p-2 rounded-xl bg-teal-50 dark:bg-slate-800 text-center text-xs font-bold text-teal-800 dark:text-teal-300">
              Visszavezetés: P lesz az AB szakasz felezőpontja!
            </div>
          </Card>

          {/* Merőleges bocsátása külső pontból */}
          <Card className="p-4 bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">2. Merőleges bocsátása</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800">P ∉ e (külső pont)</span>
              </div>
              <div className="bg-cyan-50/50 dark:bg-slate-950 p-3 rounded-xl border border-cyan-100 dark:border-slate-800 mb-3 flex justify-center">
                <svg viewBox="0 0 160 90" className="w-36 h-20">
                  <line x1="10" y1="60" x2="150" y2="60" stroke="#64748b" strokeWidth="1.8" />
                  <circle cx="80" cy="18" r="3" fill="#0891b2" />
                  <text x="84" y="18" className="text-[9px] font-bold fill-cyan-900">P</text>
                  {/* Arc from P cutting e */}
                  <path d="M 45 60 A 55 55 0 0 0 115 60" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="45" cy="60" r="2.5" fill="#0284c7" />
                  <circle cx="115" cy="60" r="2.5" fill="#0284c7" />
                  <text x="40" y="72" className="text-[8px] font-bold fill-sky-700">A</text>
                  <text x="116" y="72" className="text-[8px] font-bold fill-sky-700">B</text>
                  {/* Intersection below */}
                  <circle cx="80" cy="80" r="2" fill="#e11d48" />
                  <line x1="80" y1="10" x2="80" y2="85" stroke="#e11d48" strokeWidth="1.8" />
                </svg>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                A külső <MathText>P</MathText> pontból akkora körívet húzunk, amely két pontban (<MathText>A, B</MathText>) metszi az egyenest. Az <MathText>AB</MathText> felezőmerőlegese garantáltan átmegy <MathText>P</MathText>-n!
              </p>
            </div>
            <div className="mt-2 p-2 rounded-xl bg-cyan-50 dark:bg-slate-800 text-center text-xs font-bold text-cyan-800 dark:text-cyan-300">
              Visszavezetés: szimmetria tengely húzása P és az AB húr között!
            </div>
          </Card>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: PÁRHUZAMOS SZERKESZTÉSE */}
      <TheorySection
        number={4}
        title="Párhuzamos Egyenes Szerkesztése Külső Ponton Át"
        badgeColor="teal"
        icon={<Layers className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <p>
              Adott egy <MathText>e</MathText> egyenes és egy rá nem illeszkedő <MathText>P</MathText> pont. Feladat: megszerkeszteni a <MathText>P</MathText>-n átmenő, <MathText>e</MathText>-vel párhuzamos <MathText>p</MathText> egyenest (<MathText>p ∥ e</MathText>).
            </p>
            <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-800 dark:text-slate-100">
                A szerkesztés 3 egyszerű lépése váltószögekkel:
              </div>
              <div>1. Vegyünk fel egy tetszőleges <MathText>Q</MathText> pontot az <MathText>e</MathText> egyenesen, és kössük össze a <MathText>P</MathText> ponttal.</div>
              <div>2. A keletkező <MathText>α</MathText> szöget másoljuk át a <MathText>P</MathText> csúcsba <strong>váltószögként</strong> a <MathText>PQ</MathText> egyenes másik oldalára.</div>
              <div>3. A kapott új félegyenes meghosszabbítása adja a keresett <MathText>p</MathText> párhuzamos egyenest.</div>
            </div>
            <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-teal-800 dark:text-teal-300 font-bold text-xs">
              💡 Miért működik? Két egyenes pontosan akkor párhuzamos, ha bármely metsző egyenessel alkotott váltószögeik egyenlők (<MathText>α = α'</MathText>)!
            </div>
          </div>

          <div className="md:col-span-5 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-teal-200 dark:border-slate-800 flex flex-col items-center shadow-xs">
            <svg viewBox="0 0 200 130" className="w-full max-w-[200px]">
              {/* Line e */}
              <line x1="20" y1="100" x2="180" y2="100" stroke="#0f766e" strokeWidth="2" />
              <text x="185" y="104" className="text-[10px] font-bold fill-teal-800">e</text>
              <circle cx="60" cy="100" r="3" fill="#0f766e" />
              <text x="56" y="115" className="text-[9px] font-bold fill-teal-800">Q</text>

              {/* Point P */}
              <circle cx="120" cy="40" r="3" fill="#4f46e5" />
              <text x="116" y="32" className="text-[9px] font-bold fill-indigo-700">P</text>

              {/* Transversal line PQ */}
              <line x1="45" y1="115" x2="135" y2="25" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" />

              {/* Angle alpha at Q */}
              <path d="M 85 100 A 25 25 0 0 1 72 88" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
              <text x="82" y="93" className="text-[9px] font-bold fill-amber-700">α</text>

              {/* Angle alpha' at P (alternate angle) */}
              <path d="M 95 40 A 25 25 0 0 1 108 52" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
              <text x="96" y="52" className="text-[9px] font-bold fill-amber-700">α'</text>

              {/* Parallel line p */}
              <line x1="20" y1="40" x2="180" y2="40" stroke="#4f46e5" strokeWidth="2.2" />
              <text x="185" y="44" className="text-[10px] font-bold fill-indigo-700">p ∥ e</text>
            </svg>
            <span className="text-[11px] text-slate-500 text-center mt-2">
              Egyállású vagy váltószögek felmásolásával pontos párhuzamos húzható.
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: SZÖGMÁSOLÁS ÉS SZÖGFELEZÉS */}
      <TheorySection
        number={5}
        title="Szögmásolás és Szögfelezés"
        badgeColor="teal"
        icon={<Compass className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Szögmásolás */}
          <Card className="p-4 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Szögmásolás</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">Szög átvitele</span>
              </div>
              <div className="bg-teal-50/50 dark:bg-slate-950 p-3 rounded-xl border border-teal-100 dark:border-slate-800 mb-3 flex justify-center">
                <svg viewBox="0 0 160 85" className="w-36 h-20">
                  <line x1="20" y1="70" x2="140" y2="70" stroke="#0f766e" strokeWidth="2" />
                  <line x1="20" y1="70" x2="90" y2="20" stroke="#0f766e" strokeWidth="2" />
                  <path d="M 60 70 A 40 40 0 0 0 45 42" fill="none" stroke="#f59e0b" strokeWidth="1.8" />
                  <circle cx="60" cy="70" r="2.5" fill="#f59e0b" />
                  <circle cx="45" cy="42" r="2.5" fill="#f59e0b" />
                  <line x1="60" y1="70" x2="45" y2="42" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="56" y="54" className="text-[8px] font-bold fill-rose-600">húrhossz</text>
                  <circle cx="20" cy="70" r="3" fill="#0f766e" />
                  <text x="12" y="74" className="text-[9px] font-bold fill-teal-900">O</text>
                </svg>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                1. Tetszőleges <MathText>r</MathText> sugárral körívezünk a csúcsból.<br />
                2. Ugyanezzel az <MathText>r</MathText>-rel körívezünk az új félegyenes kezdőpontjából.<br />
                3. Körzőnyílásba vesszük a két szár közötti húrhosszt, és felmérjük!
              </p>
            </div>
            <div className="mt-2 p-2 rounded-xl bg-teal-50 dark:bg-slate-800 text-center text-xs font-bold text-teal-800 dark:text-teal-300">
              Alapelv: Egyenlő sugarú körökben egyenlő húrokhoz egyenlő középponti szögek tartoznak!
            </div>
          </Card>

          {/* Szögfelezés */}
          <Card className="p-4 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Szögfelezés</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">f_α félegyenes</span>
              </div>
              <div className="bg-emerald-50/50 dark:bg-slate-950 p-3 rounded-xl border border-emerald-100 dark:border-slate-800 mb-3 flex justify-center">
                <svg viewBox="0 0 160 85" className="w-36 h-20">
                  <line x1="20" y1="70" x2="140" y2="70" stroke="#047857" strokeWidth="2" />
                  <line x1="20" y1="70" x2="90" y2="15" stroke="#047857" strokeWidth="2" />
                  <circle cx="55" cy="70" r="2.5" fill="#059669" />
                  <circle cx="43" cy="42" r="2.5" fill="#059669" />
                  {/* Intersection M inside */}
                  <circle cx="95" cy="45" r="2.5" fill="#e11d48" />
                  <line x1="20" y1="70" x2="120" y2="40" stroke="#e11d48" strokeWidth="2" />
                  <text x="122" y="38" className="text-[9px] font-bold fill-rose-600">f_α</text>
                  <text x="60" y="64" className="text-[8px] font-bold fill-emerald-700">α/2</text>
                  <text x="50" y="50" className="text-[8px] font-bold fill-emerald-700">α/2</text>
                </svg>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                1. A csúcsból körívezzük mindkét szárat (<MathText>A, B</MathText>).<br />
                2. Az <MathText>A</MathText> és <MathText>B</MathText> pontokból azonos sugárral egymást metsző íveket húzunk (<MathText>M</MathText>).<br />
                3. A csúcsot és <MathText>M</MathText>-et összekötő félegyenes felezi a szöget!
              </p>
            </div>
            <div className="mt-2 p-2 rounded-xl bg-emerald-50 dark:bg-slate-800 text-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
              ⭐ Mértani hely: A szögfelező pontjai egyenlő távolságra vannak a szögszáraktól!
            </div>
          </Card>
        </div>
      </TheorySection>

      {/* 6. SZEKCIÓ: NEVEZETES SZÖGEK SZERKESZTÉSE */}
      <TheorySection
        number={6}
        title="Nevezetes Szögek Szerkesztése Szögmérő Nélkül"
        badgeColor="teal"
        icon={<Hash className="w-5 h-5 text-teal-600" />}
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
          A geometriában szögmérő nélkül is pontosan előállíthatók a legfontosabb szögek a <strong>szabályos háromszög (60°)</strong> és az <strong>egyenesszög felezésének (90°)</strong> kombinációival:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
          {/* 60 deg */}
          <Card className="p-3 bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 rounded-xl text-center">
            <span className="text-base font-black text-teal-700 block mb-1">60°</span>
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Szabályos 3-szög</div>
            <p className="text-[10px] text-slate-500">
              Szakasz felmérése, mindkét végpontból azonos sugarú körívek metszése.
            </p>
          </Card>

          {/* 90 deg */}
          <Card className="p-3 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 rounded-xl text-center">
            <span className="text-base font-black text-indigo-700 block mb-1">90°</span>
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Merőleges</div>
            <p className="text-[10px] text-slate-500">
              Egyenesszög (180°) felezése vagy felezőmerőleges állítása.
            </p>
          </Card>

          {/* 30 deg */}
          <Card className="p-3 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 rounded-xl text-center">
            <span className="text-base font-black text-emerald-700 block mb-1">30°</span>
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">60° / 2</div>
            <p className="text-[10px] text-slate-500">
              A megszerkesztett 60°-os szög szögfelezőjének meghúzása.
            </p>
          </Card>

          {/* 45 deg */}
          <Card className="p-3 bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 rounded-xl text-center">
            <span className="text-base font-black text-cyan-700 block mb-1">45°</span>
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">90° / 2</div>
            <p className="text-[10px] text-slate-500">
              A megszerkesztett derékszög (90°) szögfelezőjének meghúzása.
            </p>
          </Card>

          {/* 75 deg */}
          <Card className="p-3 bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 rounded-xl text-center">
            <span className="text-base font-black text-amber-700 block mb-1">75°</span>
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">45° + 30°</div>
            <p className="text-[10px] text-slate-500">
              Vagy: 60° és 90° közötti 30°-os szög elfelezése (60° + 15°).
            </p>
          </Card>

          {/* 120 deg */}
          <Card className="p-3 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-xl text-center">
            <span className="text-base font-black text-rose-700 block mb-1">120°</span>
            <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">60° + 60°</div>
            <p className="text-[10px] text-slate-500">
              Két egymáshoz illeszkedő 60°-os szög egymás utáni felmérése.
            </p>
          </Card>
        </div>
      </TheorySection>

      {/* 7. SZEKCIÓ: HÁROMSZÖGEK SZERKESZTÉSE (4 ALAPESET) */}
      <TheorySection
        number={7}
        title="Háromszögek Szerkesztése a 4 Egybevágósági Alapeset Alapján"
        badgeColor="teal"
        icon={<Triangle className="w-5 h-5 text-teal-600" />}
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          Egy háromszög akkor határozható meg egyértelműen (egybevágóság erejéig), ha az alábbi 4 alapeset valamelyike teljesül, és az adatok kielégítik a <strong>háromszög-egyenlőtlenséget</strong> (<MathText>a + b &gt; c</MathText> és <MathText>α + β + γ = 180°</MathText>).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <TheoryCard
            title="1. Három oldal adott (o-o-o)"
            variant="teal"
            badge="Oldal - Oldal - Oldal"
            properties={[
              'Adott adatok: a, b, c oldalak.',
              '1. Lépés: Felvesszük a c alapot vonalzóval, kijelölve az A és B csúcsokat.',
              '2. Lépés: A csúcsból b sugarú körívet, B csúcsból a sugarú körívet húzunk.',
              '3. Lépés: A két körív metszéspontja adja a C csúcsot.',
              'Feltétel: Csak akkor van megoldás, ha a + b > c, a + c > b, b + c > a!'
            ]}
          />

          <TheoryCard
            title="2. Két oldal és a közbezárt szög (o-sz-o)"
            variant="cyan"
            badge="Oldal - Szög - Oldal"
            properties={[
              'Adott adatok: a, b és a közbezárt γ szög.',
              '1. Lépés: Felrajzoljuk a γ szöget a C csúcsban.',
              '2. Lépés: A szög egyik szárára felmérjük a b oldalt (A csúcs), másikra az a oldalt (B csúcs).',
              '3. Lépés: Összekötjük az A és B pontokat a harmadik (c) oldallal.',
              'Feltétel: A szögnek hegyes-, derék- vagy tompaszögnek kell lennie (0° < γ < 180°).'
            ]}
          />

          <TheoryCard
            title="3. Egy oldal és a rajta fekvő két szög (sz-o-sz)"
            variant="emerald"
            badge="Szög - Oldal - Szög"
            properties={[
              'Adott adatok: c oldal és a rajta fekvő α és β szögek.',
              '1. Lépés: Felmérjük a c szakaszt (A és B csúcsok).',
              '2. Lépés: Az A csúcsban felmérjük az α szöget, a B csúcsban a β szöget.',
              '3. Lépés: A két szögszár metszéspontja határozza meg a C csúcsot.',
              'Feltétel: Csak akkor metszenek, ha α + β < 180°!'
            ]}
          />

          <TheoryCard
            title="4. Két oldal és a nagyobbikkal szemközti szög (o-o-sz)"
            variant="indigo"
            badge="Oldal - Oldal - Szög"
            properties={[
              'Adott adatok: a, b oldalak és az a oldallal szemközti α szög (ahol a ≥ b).',
              '1. Lépés: Felrajzoljuk az α szöget az A csúcsban, szárára felmérjük a b oldalt (C csúcs).',
              '2. Lépés: A C csúcsból a sugarú körívet húzunk, ami elmetszi a másik szögszárat (B csúcs).',
              'Fontos: Ha a nagyobb oldallal szemközti a szög, pontosan 1 megoldás van.',
              'Vigyázat: Ha a kisebb oldallal szemközti a szög, 0, 1 vagy 2 megoldás is lehet!'
            ]}
          />
        </div>
      </TheorySection>

      {/* 8. SZEKCIÓ: INTERAKTÍV SZERKESZTÉS SZIMULÁTOR */}
      <TheorySection
        number={8}
        title="Interaktív Szerkesztési Laboratórium"
        badgeColor="teal"
        icon={<Sliders className="w-5 h-5 text-teal-600" />}
      >
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-teal-50/40 via-white to-cyan-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-teal-950/20 border-teal-200 dark:border-teal-900/50 shadow-sm">
          {/* Simulator Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-teal-100 dark:border-teal-900/40 pb-3">
            <Button
              variant={activeLabTab === 'bisector' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveLabTab('bisector')}
              className={activeLabTab === 'bisector' ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}
            >
              <Compass className="w-4 h-4 mr-1.5" /> 1. Szakaszfelezés
            </Button>
            <Button
              variant={activeLabTab === 'angle-bisector' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveLabTab('angle-bisector')}
              className={activeLabTab === 'angle-bisector' ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}
            >
              <RotateCw className="w-4 h-4 mr-1.5" /> 2. Szögfelezés
            </Button>
            <Button
              variant={activeLabTab === 'notable-angles' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveLabTab('notable-angles')}
              className={activeLabTab === 'notable-angles' ? 'bg-teal-600 hover:bg-teal-700 text-white' : ''}
            >
              <Hash className="w-4 h-4 mr-1.5" /> 3. Nevezetes szögek
            </Button>
          </div>

          {/* TAB 1: SZAKASZFELEZÉS LÉPÉSRŐL LÉPÉSRE */}
          {activeLabTab === 'bisector' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Lépésválasztó:</span>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={stepBisector === s ? 'default' : 'outline'}
                        onClick={() => setStepBisector(s)}
                        className={`flex-1 text-xs ${stepBisector === s ? 'bg-teal-600 text-white' : ''}`}
                      >
                        {s}. Lépés
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
                  {stepBisector === 1 && (
                    <>
                      <strong className="text-teal-800 dark:text-teal-300 block">1. Lépés: Adott az AB szakasz</strong>
                      <p className="text-slate-600 dark:text-slate-300">
                        Vegyük fel az <MathText>AB</MathText> szakaszt. A körzőt nyissuk a szakasz felénél nagyobbra.
                      </p>
                    </>
                  )}
                  {stepBisector === 2 && (
                    <>
                      <strong className="text-teal-800 dark:text-teal-300 block">2. Lépés: Körívezés mindkét végpontból</strong>
                      <p className="text-slate-600 dark:text-slate-300">
                        Az <MathText>A</MathText> és <MathText>B</MathText> pontokból azonos sugárral köríveket húzunk fenn és lenn. A metszéspontok: <MathText>M₁</MathText> és <MathText>M₂</MathText>.
                      </p>
                    </>
                  )}
                  {stepBisector === 3 && (
                    <>
                      <strong className="text-teal-800 dark:text-teal-300 block">3. Lépés: Felezőmerőleges és F pont</strong>
                      <p className="text-slate-600 dark:text-slate-300">
                        Az <MathText>M₁M₂</MathText> egyenes a felezőmerőleges (<MathText>f</MathText>), és ahol metszi az <MathText>AB</MathText> szakaszt, ott van az <MathText>F</MathText> felezőpont.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* SVG Canvas for Bisector */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-teal-200 dark:border-slate-800 shadow-inner">
                <svg viewBox="0 0 300 200" className="w-full max-w-[280px] sm:max-w-[320px] aspect-[3/2]">
                  {/* Base segment AB */}
                  <line x1="50" y1="100" x2="250" y2="100" stroke="#0f766e" strokeWidth="2.5" />
                  <circle cx="50" cy="100" r="4" fill="#0f766e" />
                  <circle cx="250" cy="100" r="4" fill="#0f766e" />
                  <text x="36" y="105" className="text-[12px] font-bold fill-teal-900 dark:fill-teal-200">A</text>
                  <text x="256" y="105" className="text-[12px] font-bold fill-teal-900 dark:fill-teal-200">B</text>

                  {/* Step 2 Arcs */}
                  {stepBisector >= 2 && (
                    <>
                      {/* Arcs from A */}
                      <path d="M 150 20 A 115 115 0 0 1 150 60" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="3 2" />
                      <path d="M 150 140 A 115 115 0 0 1 150 180" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="3 2" />
                      {/* Arcs from B */}
                      <path d="M 150 20 A 115 115 0 0 0 150 60" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="3 2" />
                      <path d="M 150 140 A 115 115 0 0 0 150 180" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="3 2" />
                      {/* Intersection points */}
                      <circle cx="150" cy="38" r="3.5" fill="#e11d48" />
                      <circle cx="150" cy="162" r="3.5" fill="#e11d48" />
                      <text x="156" y="42" className="text-[10px] font-bold fill-rose-600">M₁</text>
                      <text x="156" y="166" className="text-[10px] font-bold fill-rose-600">M₂</text>
                    </>
                  )}

                  {/* Step 3 Line f and point F */}
                  {stepBisector >= 3 && (
                    <>
                      <line x1="150" y1="15" x2="150" y2="185" stroke="#e11d48" strokeWidth="2.2" />
                      <text x="156" y="24" className="text-[12px] font-black fill-rose-600">f</text>
                      <circle cx="150" cy="100" r="4.5" fill="#4f46e5" />
                      <circle cx="150" cy="100" r="2" fill="#ffffff" />
                      <text x="156" y="95" className="text-[11px] font-black fill-indigo-700">F (felezőpont)</text>
                      {/* Right angle marker (Hungarian standard: circular arc + dot) */}
                      <path d="M 150 85 A 15 15 0 0 1 165 100" fill="none" stroke="#e11d48" strokeWidth="1.5" />
                      <circle cx="156.5" cy="93.5" r="1.8" fill="#e11d48" />
                    </>
                  )}
                </svg>
              </div>
            </div>
          )}

          {/* TAB 2: SZÖGFELEZÉS LÉPÉSRŐL LÉPÉSRE */}
          {activeLabTab === 'angle-bisector' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Lépésválasztó:</span>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={stepAngleBisector === s ? 'default' : 'outline'}
                        onClick={() => setStepAngleBisector(s)}
                        className={`flex-1 text-xs ${stepAngleBisector === s ? 'bg-teal-600 text-white' : ''}`}
                      >
                        {s}. Lépés
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
                  {stepAngleBisector === 1 && (
                    <>
                      <strong className="text-teal-800 dark:text-teal-300 block">1. Lépés: Szögszárak kimetszése</strong>
                      <p className="text-slate-600 dark:text-slate-300">
                        Az <MathText>O</MathText> csúcsból tetszőleges sugarú körívvel elmetsszük mindkét szárat (<MathText>A</MathText> és <MathText>B</MathText> pontok).
                      </p>
                    </>
                  )}
                  {stepAngleBisector === 2 && (
                    <>
                      <strong className="text-teal-800 dark:text-teal-300 block">2. Lépés: Belső metszéspont megszerkesztése</strong>
                      <p className="text-slate-600 dark:text-slate-300">
                        Az <MathText>A</MathText> és <MathText>B</MathText> pontokból azonos sugarú köríveket húzunk a szögtartomány belsejébe, amelyek metszik egymást az <MathText>M</MathText> pontban.
                      </p>
                    </>
                  )}
                  {stepAngleBisector === 3 && (
                    <>
                      <strong className="text-teal-800 dark:text-teal-300 block">3. Lépés: A szögfelező meghúzása</strong>
                      <p className="text-slate-600 dark:text-slate-300">
                        Az <MathText>O</MathText> csúcsból kiindulva átfektetjük a félegyenest az <MathText>M</MathText> ponton. Ez a szögfelező (<MathText>f_α</MathText>).
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* SVG Canvas for Angle Bisector */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-teal-200 dark:border-slate-800 shadow-inner">
                <svg viewBox="0 0 300 200" className="w-full max-w-[280px] sm:max-w-[320px] aspect-[3/2]">
                  {/* Rays from O */}
                  <line x1="50" y1="160" x2="250" y2="160" stroke="#0f766e" strokeWidth="2.5" />
                  <line x1="50" y1="160" x2="190" y2="30" stroke="#0f766e" strokeWidth="2.5" />
                  <circle cx="50" cy="160" r="4" fill="#0f766e" />
                  <text x="36" y="165" className="text-[12px] font-bold fill-teal-900 dark:fill-teal-200">O</text>

                  {/* Step 1 Arc from O */}
                  {stepAngleBisector >= 1 && (
                    <>
                      <path d="M 130 160 A 80 80 0 0 0 106.6 95.7" fill="none" stroke="#0891b2" strokeWidth="1.8" strokeDasharray="3 2" />
                      <circle cx="130" cy="160" r="3.5" fill="#0891b2" />
                      <circle cx="106.6" cy="95.7" r="3.5" fill="#0891b2" />
                      <text x="132" y="174" className="text-[10px] font-bold fill-cyan-800">A</text>
                      <text x="96" y="94" className="text-[10px] font-bold fill-cyan-800">B</text>
                    </>
                  )}

                  {/* Step 2 Arcs from A and B */}
                  {stepAngleBisector >= 2 && (
                    <>
                      <path d="M 195 90 A 70 70 0 0 1 190 120" fill="none" stroke="#14b8a6" strokeWidth="1.8" />
                      <path d="M 180 100 A 70 70 0 0 0 205 110" fill="none" stroke="#14b8a6" strokeWidth="1.8" />
                      <circle cx="192" cy="107" r="4" fill="#e11d48" />
                      <text x="200" y="112" className="text-[11px] font-black fill-rose-600">M</text>
                    </>
                  )}

                  {/* Step 3 Bisector ray */}
                  {stepAngleBisector >= 3 && (
                    <>
                      <line x1="50" y1="160" x2="230" y2="92" stroke="#e11d48" strokeWidth="2.5" />
                      <text x="236" y="92" className="text-[12px] font-black fill-rose-600">f_α</text>
                      <text x="110" y="152" className="text-[10px] font-bold fill-emerald-700">α/2</text>
                      <text x="95" y="132" className="text-[10px] font-bold fill-emerald-700">α/2</text>
                    </>
                  )}
                </svg>
              </div>
            </div>
          )}

          {/* TAB 3: NEVEZETES SZÖGEK */}
          {activeLabTab === 'notable-angles' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700 block mb-2">Válassz egy nevezetes szöget:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {([60, 90, 30, 45, 75, 120] as const).map((ang) => (
                      <Button
                        key={ang}
                        size="sm"
                        variant={selectedAngle === ang ? 'default' : 'outline'}
                        onClick={() => setSelectedAngle(ang)}
                        className={`text-xs font-bold ${selectedAngle === ang ? 'bg-teal-600 text-white' : ''}`}
                      >
                        {ang}°
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-teal-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
                  <div className="font-bold text-teal-800 dark:text-teal-300">
                    A(z) {selectedAngle}°-os szög előállítása:
                  </div>
                  {selectedAngle === 60 && (
                    <p className="text-slate-600 dark:text-slate-300">
                      Egy félegyenes kezdőpontjából (<MathText>O</MathText>) felmérünk egy <MathText>r</MathText> sugarat (<MathText>A</MathText>). Mindkét pontból azonos <MathText>r</MathText> sugárral körívezünk $\rightarrow$ szabályos háromszög, minden szöge pontosan 60°!
                    </p>
                  )}
                  {selectedAngle === 90 && (
                    <p className="text-slate-600 dark:text-slate-300">
                      Egyenesre merőleges állítása a felezőmerőleges módszerével. Az egyenesszög (180°) pontosan feleződik: <MathText>180° / 2 = 90°</MathText>.
                    </p>
                  )}
                  {selectedAngle === 30 && (
                    <p className="text-slate-600 dark:text-slate-300">
                      Először megszerkesztjük a 60°-os szöget szabályos háromszöggel, majd annak meghúzzuk a szögfelezőjét: <MathText>60° / 2 = 30°</MathText>.
                    </p>
                  )}
                  {selectedAngle === 45 && (
                    <p className="text-slate-600 dark:text-slate-300">
                      Először megszerkesztjük a 90°-os derékszöget, majd megszerkesztjük a szögfelezőjét: <MathText>90° / 2 = 45°</MathText>.
                    </p>
                  )}
                  {selectedAngle === 75 && (
                    <p className="text-slate-600 dark:text-slate-300">
                      Összetett szerkesztés: 60° és 90° közötti 30°-os különbséget elfelezzük (+15°), így <MathText>60° + 15° = 75°</MathText> (vagy <MathText>45° + 30° = 75°</MathText>).
                    </p>
                  )}
                  {selectedAngle === 120 && (
                    <p className="text-slate-600 dark:text-slate-300">
                      Két darab 60°-os szög egymás mellé szerkesztése a körzőnyílás kétszeres felmérésével: <MathText>60° + 60° = 120°</MathText>.
                    </p>
                  )}
                </div>
              </div>

              {/* Visual Angle SVG */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center bg-white dark:bg-slate-950 p-4 rounded-2xl border border-teal-200 dark:border-slate-800 shadow-inner">
                {(() => {
                  const ox = 70;
                  const oy = 150;
                  const armLen = 150;
                  const rad = (selectedAngle * Math.PI) / 180;
                  const endX = ox + armLen * Math.cos(rad);
                  const endY = oy - armLen * Math.sin(rad);
                  const arcR = 50;
                  const arcEndX = ox + arcR * Math.cos(rad);
                  const arcEndY = oy - arcR * Math.sin(rad);

                  return (
                    <svg viewBox="0 0 280 200" className="w-full max-w-[260px] aspect-[7/5]">
                      {/* Base arm */}
                      <line x1={ox} y1={oy} x2={ox + armLen} y2={oy} stroke="#0f766e" strokeWidth="2.5" />
                      {/* Angled arm */}
                      <line x1={ox} y1={oy} x2={endX} y2={endY} stroke="#0f766e" strokeWidth="2.5" />
                      {/* Arc */}
                      <path
                        d={`M ${ox + arcR} ${oy} A ${arcR} ${arcR} 0 0 0 ${arcEndX} ${arcEndY}`}
                        fill="#14b8a6"
                        fillOpacity="0.2"
                        stroke="#0d9488"
                        strokeWidth="2"
                      />
                      {/* Center O */}
                      <circle cx={ox} cy={oy} r="4" fill="#0f766e" />
                      {selectedAngle === 90 && (
                        <circle cx={ox + 22} cy={oy - 22} r="2.8" fill="#0d9488" />
                      )}
                      <text x={ox - 16} y={oy + 4} className="text-[12px] font-bold fill-teal-900 dark:fill-teal-200">O</text>
                      <text x={ox + 35} y={oy - 15} className="text-[13px] font-black fill-teal-700 dark:fill-teal-300">
                        {selectedAngle}°
                      </text>
                    </svg>
                  );
                })()}
              </div>
            </div>
          )}
        </Card>
      </TheorySection>

      {/* 9. SZEKCIÓ: KIDOLGOZOTT MINTAFELADATOK */}
      <TheorySection
        number={9}
        title="Lépésről Lépésre Kidolgozott Mintapéldák"
        badgeColor="teal"
        icon={<BookOpen className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-4">
          {/* Example 1 */}
          <Card className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                1. Mintapélda
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                Szakaszfelező merőleges alkalmazása húrhoz
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
              Egy körben adott egy <MathText>AB</MathText> húr. Hogyan találhatjuk meg a kör középpontját kizárólag a húr segítségével, ha adott egy másik <MathText>CD</MathText> húr is?
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
              <div>
                <strong>1. Lépés: Alapelv felidézése:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  Tudjuk, hogy a kör középpontja (<MathText>O</MathText>) egyenlő távolságra van a körvonal minden pontjától (<MathText>|OA| = |OB|</MathText>). Ezért <MathText>O</MathText> rajta van az <MathText>AB</MathText> szakasz felezőmerőlegesén!
                </div>
              </div>
              <div>
                <strong>2. Lépés: Szerkesztés menete:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  Szerkesszük meg az <MathText>AB</MathText> húr <MathText>f₁</MathText> felezőmerőlegesét, majd a <MathText>CD</MathText> húr <MathText>f₂</MathText> felezőmerőlegesét.
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold">
                Válasz: A két felezőmerőleges metszéspontja (<MathText>f₁ ∩ f₂</MathText>) pontosan a kör <MathText>O</MathText> középpontja!
              </div>
            </div>
          </Card>

          {/* Example 2 */}
          <Card className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                2. Mintapélda
              </span>
              <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                Háromszögszerkesztés vizsgálata (Létezik-e?)
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3">
              Megszerkeszthető-e az a háromszög, amelynek oldalai: a) <MathText>a = 5 cm, b = 7 cm, c = 10 cm</MathText>, illetve b) <MathText>a = 3 cm, b = 4 cm, c = 8 cm</MathText>?
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2">
              <div>
                <strong>a) eset vizsgálata:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  A két kisebb oldal összege: <MathText>5 + 7 = 12 cm &gt; 10 cm</MathText>. A háromszög-egyenlőtlenség teljesül, a háromszög megszerkeszthető (a körívek 2 pontban metszik egymást).
                </div>
              </div>
              <div>
                <strong>b) eset vizsgálata:</strong>
                <div className="mt-1 pl-3 text-slate-700 dark:text-slate-200">
                  A két kisebb oldal összege: <MathText>3 + 4 = 7 cm &lt; 8 cm</MathText>. Mivel <MathText>7 &lt; 8</MathText>, a két körív el sem éri egymást, nem keletkezik metszéspont!
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold">
                Válasz: Az a) háromszög megszerkeszthető, a b) háromszög NEM létezik!
              </div>
            </div>
          </Card>
        </div>
      </TheorySection>

      {/* 10. SZEKCIÓ: TÍPUSHIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={10}
        title="Típushibák és Csapdák a Szerkesztéseknél"
        badgeColor="teal"
        icon={<AlertTriangle className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: A vonalzó használata mérésre"
            trap="„A vonalzómmal lemérem a 4 cm-t, bejelölöm a ceruzámmal, és kész a szakaszfelezés.”"
            wrong="NEM szerkesztés! A geometria nyelvén a mérés nem minősül euklideszi szerkesztésnek."
            solution="Távolságot és felezést kizárólag körzővel végzett ívezéssel és egyenes vonalzóval szabad szerkeszteni!"
          />

          <TheoryTrapBox
            title="2. Csapda: Túl kicsi körzőnyílás szakaszfelezéskor"
            trap="„A szakasz felénél kisebbre nyitom a körzőt, hogy kisebb helyet foglaljon az ív.”"
            wrong="A körívek el sem fogják érni egymást, nem jön létre metszéspont!"
            solution="Mindig garantáltan a szakasz felénél nagyobbra kell nyitni a körzőt (r > |AB| / 2), különben nincs metszéspont."
          />

          <TheoryTrapBox
            title="3. Csapda: A körzőnyílás elmozdulása ívezés közben"
            trap="„Nem baj, ha véletlenül összébb csúszik a körző, mikor a másik csúcsból húzom az ívet.”"
            wrong="Ha megváltozik a sugár, a kapott egyenes nem lesz merőleges, és nem a felezőpontban metszi a szakaszt!"
            solution="A két csúcsból (A és B) szigorúan azonos körzőnyílással kell körívezni, mert csak ekkor érvényesül a szimmetria."
          />

          <TheoryTrapBox
            title="4. Csapda: Háromszög-egyenlőtlenség ellenőrzésének elmulasztása"
            trap="„Bármilyen három megadott számból meg lehet szerkeszteni egy háromszöget.”"
            wrong="Ha a két rövidebb oldal összege kisebb vagy egyenlő a leghosszabb oldallal, a körívek nem metszik egymást!"
            solution="Szerkesztés előtt mindig ellenőrizd: a + b > c! Ha ez nem áll fenn, a feladatnak nincs megoldása."
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ConstructionsTheory;
