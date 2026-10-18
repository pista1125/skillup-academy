import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard,
  GeometryFigureGrid,
  GeometrySvgFrame
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  MoveHorizontal,
  Compass,
  Ruler,
  Box,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LinesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const LinesTheory: React.FC<LinesTheoryProps> = ({ onBack, onStartQuiz }) => {
  // ========================================================
  // INTERAKTÍV EGYENES-LABORATÓRIUM ÁLLAPOTAI
  // ========================================================
  const [activeTab, setActiveTab] = useState<'plane' | 'space' | 'construction'>('plane');

  // 1. Síkbeli viszonyok állapota
  const [planeMode, setPlaneMode] = useState<'parallel' | 'perpendicular' | 'intersecting'>('perpendicular');
  const [intersectAngle, setIntersectAngle] = useState<number>(45);

  // 2. Térbeli kocka élek kiválasztása
  // Referencia él: 'AB' (kocka alsó elülső éle)
  const [spaceRelation, setSpaceRelation] = useState<'parallel' | 'perpendicular' | 'skew'>('skew');

  // 3. Szerkesztési lépések állapota (0..2)
  const [constructionStep, setConstructionStep] = useState<number>(0);

  return (
    <TheoryTemplate
      title="7. Egyenesek síkban, térben"
      subtitle="Metsző, merőleges, párhuzamos és kitérő egyenesek kölcsönös helyzete, távolsága és szerkesztése"
      documentId="g5-geom-lines-theory-content"
      pdfFilename="5_osztaly_III_geometria_7_egyenesek_sikban_terben_tananyag.pdf"
      badgeText="📐 5. Osztály • III. Geometria"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: "Kiemelt alapszabály",
        formula: "Síkban: metsző (1 pont) • merőleges (90°) • párhuzamos (0 pont) | Térben: kitérő (nincs közös sík)"
      }}
      practiceTitle="Készen állsz az egyenesek és szerkesztések gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* ======================================================== */}
      {/* 1. SZEKCIÓ: EGYENESEK A SÍKBAN */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-lines-plane"
        number={1}
        title="Egyenesek kölcsönös helyzete a síkban"
        badge="Síkbeli helyzetek"
        badgeColor="indigo"
      >
        <TheoryCard title="Milyen helyzetben lehet két egyenes egy síkon?">
          {/* Kiemelt alapszabály kártya az elején */}
          <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-1 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Kiemelt alapszabály a síkbeli egyenesekre:
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy síkban két különböző egyenesnek vagy <strong>pontosan egy közös pontja van</strong> (metsző egyenesek, speciális esetük a 90°-os merőleges egyenesek), vagy <strong>egyetlen közös pontja sincs</strong> (párhuzamos egyenesek).
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egy síkban (például a füzeted lapján vagy a táblán) két egyenes háromféle kölcsönös helyzetben lehet:
          </p>

          <GeometryFigureGrid columns={3}>
            <GeometryFigureCard
              title="1. Metsző egyenesek"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <line x1="5" y1="30" x2="55" y2="10" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
                  <line x1="15" y1="5" x2="45" y2="35" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="30" cy="20" r="3" fill="#1e1b4b" />
                  <text x="35" y="22" className="text-[10px] font-black fill-slate-900">P</text>
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Pontosan 1 közös pontjuk van (a metszéspont: P).',
                'Halmazos jelölés: e ∩ f = {P}.',
                '4 szöget zárnak be: a csúcsszögek egyenlők, a mellékszögek összege 180°.'
              ]}
              explanation="Példa: olló két szára, vasúti váltó, X betű."
            />

            <GeometryFigureCard
              title="2. Merőleges egyenesek (⊥)"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <line x1="5" y1="20" x2="55" y2="20" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
                  <line x1="30" y1="5" x2="30" y2="35" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" />
                  {/* Magyar derékszög jelölés: negyedkörív + pont */}
                  <path d="M 38 20 A 8 8 0 0 0 30 12" fill="none" stroke="#047857" strokeWidth="1.2" />
                  <circle cx="34" cy="16" r="1" fill="#047857" />
                  <circle cx="30" cy="20" r="2.5" fill="#1e1b4b" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Speciális metsző egyenesek: pontosan 90°-os szöget zárnak be.',
                'Jelölése: e ⊥ f (olvasd: e merőleges f-re).',
                'A magyar szabványban negyedkörívvel és benne egy ponttal jelöljük!'
              ]}
              explanation="Példa: füzetlap sarkai, ablakkeret, koordinátatengelyek."
            />

            <GeometryFigureCard
              title="3. Párhuzamos egyenesek (∥)"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <line x1="5" y1="12" x2="55" y2="12" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" />
                  <line x1="5" y1="28" x2="55" y2="28" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Egy síkban fekszenek és nincs közös pontjuk (e ∩ f = ∅).',
                'Jelölése: e ∥ f (olvasd: e párhuzamos f-fel).',
                'Távolságuk mindenhol állandó: soha, a végtelenben sem találkoznak.'
              ]}
              explanation="Példa: egyenes vasúti sínpár, vonalas füzet vonalai, zebra csíkjai."
            />
          </GeometryFigureGrid>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 2. SZEKCIÓ: TÁVOLSÁGOK MÉRÉSE A SÍKBAN */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-lines-distance"
        number={2}
        title="Távolság mérése: pont és egyenes, párhuzamosok távolsága"
        badge="Távolság"
        badgeColor="purple"
      >
        <TheoryCard title="Hogyan mérjük a geometriai távolságot?">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2">
              <span className="text-xs font-bold text-purple-900 dark:text-purple-200 block">
                1. Pont és egyenes távolsága
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Egy külső <strong>P pont és egy e egyenes távolsága</strong> a pontból az egyenesre bocsátott <strong>merőleges szakasz (PT) hossza</strong>.
                Ez a legrövidebb út a pont és az egyenes bármely pontja között!
              </p>
              <div className="text-[11px] font-mono text-purple-800 dark:text-purple-300">
                d(P, e) = |PT|, ahol PT ⊥ e
              </div>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2">
              <span className="text-xs font-bold text-purple-900 dark:text-purple-200 block">
                2. Két párhuzamos egyenes távolsága
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Két párhuzamos egyenes (e ∥ f) távolsága a rájuk <strong>merőleges összekötő szakasz hossza</strong>.
                Mivel a párhuzamosok sehol sem közelednek és sehol sem távolodnak, ez a távolság <strong>mindenütt ugyanakkora</strong> (állandó).
              </p>
              <div className="text-[11px] font-mono text-purple-800 dark:text-purple-300">
                d(e, f) = állandó
              </div>
            </div>
          </div>

          <TheoryCallout variant="warning" title="Fontos szabály a távolság méréséről">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Távolságot <strong>sosem mérünk ferdén</strong>! Ha ferdén teszed oda a vonalzót, hosszabb szakaszt kapsz, mint a valódi távolság.
              A matematika és a fizika törvényei szerint a távolság mindig a <strong>legrövidebb összekötő út</strong>, azaz a merőleges szakasz.
            </p>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 3. SZEKCIÓ: EGYENESEK A TÉRBEN ÉS A KITÉRŐ EGYENESEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-lines-space"
        number={3}
        title="Egyenesek a térben: a kitérő egyenesek fogalma"
        badge="Térbeli geometria"
        badgeColor="orange"
      >
        <TheoryCard title="Mi történik, ha kilépünk a síkból a 3D térbe?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A háromdimenziós térben olyan egyenespárok is léteznek, amelyek síkban soha nem fordulhatnának elő.
            Ezek a <strong>kitérő egyenesek</strong>:
          </p>

          <div className="p-4 bg-orange-50 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-800 mb-4">
            <div className="text-xs font-bold text-orange-900 dark:text-orange-200 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-600" />
              A kitérő egyenesek pontos definíciója:
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              Két egyenes <strong>kitérő</strong>, ha <strong>nincsenek egy síkban</strong>.
              Ebből következik, hogy <strong>nem metszik egymást</strong>, és <strong>nem is párhuzamosak</strong>!
            </p>
          </div>

          <div className="mb-6">
            <TheoryTable
              headers={['Egyenesek viszonya', 'Van-e közös sík?', 'Közös pontok száma', 'Példa a valóságban / Kockán']}
              rows={[
                ['Metsző egyenesek', 'Igen (egysíkúak)', '1 közös pont', 'Kocka egy csúcsban találkozó élei (pl. AB és BC)'],
                ['Párhuzamos egyenesek', 'Igen (egysíkúak)', '0 közös pont (vagy egybeesnek)', 'Kocka szemközti párhuzamos élei (pl. AB és EF)'],
                ['Kitérő egyenesek', 'NINCS közös sík', '0 közös pont (nem találkoznak)', 'Autópálya és felüljáró; kocka élei: AB és CG']
              ]}
            />
          </div>

          {/* KITÉRŐ EGYENESEK VIZUÁLIS ÁBRÁI (3 KÁRTYÁS RÁCS) */}
          <div className="mt-4">
            <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-orange-600" />
              Kitérő egyenesek szemléltetése a térben
            </h4>

            <GeometryFigureGrid columns={3}>
              <GeometryFigureCard
                title="1. Kitérő egyenesek (Két sík modellje)"
                figure={
                  <svg className="w-24 h-16 sm:w-28 sm:h-20 mx-auto" viewBox="0 0 100 65" fill="none">
                    {/* Felső sík S1 */}
                    <polygon points="25,5 95,5 75,28 5,28" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 1" opacity="0.8" />
                    <line x1="12" y1="20" x2="88" y2="12" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="89" y="14" className="text-[9px] font-black fill-indigo-700">e</text>
                    <text x="18" y="12" className="text-[7.5px] font-bold fill-indigo-500">S₁ sík</text>

                    {/* Alsó sík S2 */}
                    <polygon points="25,35 95,35 75,58 5,58" fill="#ffedd5" stroke="#ea580c" strokeWidth="1" strokeDasharray="2 1" opacity="0.8" />
                    <line x1="30" y1="36" x2="70" y2="56" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" />
                    <text x="73" y="58" className="text-[9px] font-black fill-orange-700">f</text>
                    <text x="18" y="42" className="text-[7.5px] font-bold fill-orange-500">S₂ sík</text>
                  </svg>
                }
                figureHeight="h-16 sm:h-20 min-h-0"
                properties={[
                  'e az S₁ felső síkban fekszik, f az S₂ alsó síkban fut.',
                  'e és f nem párhuzamosak, mégsem metszik egymást.',
                  'Nincs olyan közös sík, amely mindkettőt tartalmazná.'
                ]}
                explanation="Két külön szinten futó egyenes: a térbeli kitérő egyenesek alapmodellje."
              />

              <GeometryFigureCard
                title="2. Kocka kitérő élei (AB és CG)"
                figure={
                  <svg className="w-20 h-16 sm:w-24 sm:h-20 mx-auto" viewBox="0 0 80 65" fill="none">
                    {/* Kocka szürke élei */}
                    <rect x="15" y="25" width="35" height="35" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
                    <line x1="15" y1="25" x2="35" y2="8" stroke="#cbd5e1" strokeWidth="1.2" />
                    <line x1="50" y1="25" x2="70" y2="8" stroke="#cbd5e1" strokeWidth="1.2" />
                    <line x1="50" y1="60" x2="70" y2="43" stroke="#cbd5e1" strokeWidth="1.2" />
                    <line x1="35" y1="8" x2="70" y2="8" stroke="#cbd5e1" strokeWidth="1.2" />
                    {/* CG él kiemelve narancssárgával */}
                    <line x1="70" y1="8" x2="70" y2="43" stroke="#ea580c" strokeWidth="3" />
                    {/* AB él kiemelve pirossal */}
                    <line x1="15" y1="60" x2="50" y2="60" stroke="#dc2626" strokeWidth="3.5" />
                    <circle cx="15" cy="60" r="2" fill="#dc2626" />
                    <text x="8" y="63" className="text-[8px] font-black fill-red-700">A</text>
                    <circle cx="50" cy="60" r="2" fill="#dc2626" />
                    <text x="52" y="64" className="text-[8px] font-black fill-red-700">B</text>
                    <circle cx="70" cy="43" r="2" fill="#ea580c" />
                    <text x="73" y="46" className="text-[8px] font-black fill-orange-700">C</text>
                    <circle cx="70" cy="8" r="2" fill="#ea580c" />
                    <text x="73" y="10" className="text-[8px] font-black fill-orange-700">G</text>
                  </svg>
                }
                figureHeight="h-16 sm:h-20 min-h-0"
                properties={[
                  'AB él: elöl fut vízszintesen.',
                  'CG él: hátul fut függőlegesen.',
                  'Nincs közös pontjuk és nem egyirányúak: kitérő élek.'
                ]}
                explanation="Egy kocka bármely éléhez pontosan 4 másik kitérő él tartozik a térben."
              />

              <GeometryFigureCard
                title="3. Autópálya és felüljáró (Híd)"
                figure={
                  <svg className="w-24 h-16 sm:w-28 sm:h-20 mx-auto" viewBox="0 0 100 65" fill="none">
                    {/* Alsó út ferdén */}
                    <path d="M 5 55 L 95 15" stroke="#94a3b8" strokeWidth="12" strokeLinecap="round" />
                    <path d="M 5 55 L 95 15" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="4 4" strokeLinecap="round" />
                    <text x="12" y="58" className="text-[7.5px] font-black fill-slate-700">Alsó út</text>

                    {/* Felső felüljáró híd keresztbe */}
                    <path d="M 20 10 L 80 50" stroke="#0284c7" strokeWidth="10" strokeLinecap="round" />
                    <path d="M 20 10 L 80 50" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="3 3" />
                    <text x="75" y="44" className="text-[7.5px] font-black fill-sky-800">Felüljáró</text>

                    {/* Magasságkülönbség jelölése szaggatottan a kereszteződésnél */}
                    <line x1="50" y1="35" x2="50" y2="28" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="1 1" />
                    <circle cx="50" cy="28" r="1.5" fill="#ea580c" />
                    <circle cx="50" cy="35" r="1.5" fill="#ea580c" />
                  </svg>
                }
                figureHeight="h-16 sm:h-20 min-h-0"
                properties={[
                  'Felülről nézve a nyomvonalak keresztezik egymást.',
                  'A valóságban eltérő magasságban haladnak el.',
                  'Az autók nem ütköznek, mert az utak kitérő egyenesek.'
                ]}
                explanation="A mindennapi élet legfontosabb mérnöki példája a kitérő egyenesekre."
              />
            </GeometryFigureGrid>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 4. SZEKCIÓ: SZERKESZTÉSEK VONALZÓVAL ÉS KÖRZŐVEL */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-lines-constructions"
        number={4}
        title="Alapszerkesztések vonalzóval és körzővel"
        badge="Szerkesztések"
        badgeColor="emerald"
      >
        <TheoryCard title="Hogyan szerkesztünk pontosan merőlegest és párhuzamost?">
          <GeometryFigureGrid columns={3}>
            <GeometryFigureCard
              title="1. Merőleges derékszögű vonalzóval"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <line x1="5" y1="30" x2="55" y2="30" stroke="#4f46e5" strokeWidth="2" />
                  {/* Derékszögű vonalzó háromszöge */}
                  <polygon points="15,30 35,30 15,8" fill="#d1fae5" stroke="#047857" strokeWidth="1.2" />
                  <line x1="15" y1="5" x2="15" y2="35" stroke="#ec4899" strokeWidth="1.8" strokeDasharray="2 1" />
                  <path d="M 20 30 A 5 5 0 0 0 15 25" fill="none" stroke="#047857" strokeWidth="1" />
                  <circle cx="17.5" cy="27.5" r="0.7" fill="#047857" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'A derékszögű vonalzó egyik befogóját az egyenesre illesztjük.',
                'A másik befogó mentén megrajzoljuk a merőleges egyenest.',
                'A két egyenes pontosan 90°-ot zár be.'
              ]}
              explanation="Eszköz: derékszögű (vagy geo-) vonalzó."
            />

            <GeometryFigureCard
              title="2. Párhuzamos vonalzó eltolásával"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  {/* Vezető egyenes alul */}
                  <line x1="5" y1="34" x2="55" y2="34" stroke="#94a3b8" strokeWidth="1" />
                  {/* Eltolt vonalzó */}
                  <polygon points="10,25 35,25 10,10" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1" />
                  <line x1="5" y1="25" x2="55" y2="25" stroke="#4f46e5" strokeWidth="1.8" />
                  <line x1="5" y1="12" x2="55" y2="12" stroke="#9333ea" strokeWidth="1.8" />
                  <path d="M 28 20 L 28 15 M 26 17 L 28 15 L 30 17" stroke="#4338ca" strokeWidth="1.2" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Két vonalzót használunk: egy vezető és egy rajzoló vonalzót.',
                'A rajzoló vonalzót a vezető vonalzó mentén csúsztatjuk el.',
                'Így tetszőleges távolságú párhuzamos egyenes húzható.'
              ]}
              explanation="Eszköz: 2 db vonalzó (vezetővonalzó módszer)."
            />

            <GeometryFigureCard
              title="3. Szakaszfelező merőleges körzővel"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <line x1="10" y1="20" x2="50" y2="20" stroke="#312e81" strokeWidth="1.5" />
                  <line x1="30" y1="4" x2="30" y2="36" stroke="#ec4899" strokeWidth="1.8" />
                  <circle cx="30" cy="9" r="1.5" fill="#dc2626" />
                  <circle cx="30" cy="31" r="1.5" fill="#dc2626" />
                  <circle cx="30" cy="20" r="2" fill="#831843" />
                  <path d="M 35 20 A 5 5 0 0 0 30 15" fill="none" stroke="#047857" strokeWidth="1" />
                  <circle cx="32.5" cy="17.5" r="0.7" fill="#047857" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'A szakasz végpontjaiból azonos sugarú köríveket húzunk.',
                'A sugár nagyobb a szakasz felénél.',
                'A két metszéspontot összekötve megkapjuk a felező merőlegest.'
              ]}
              explanation="Eredmény: felezi a szakaszt és merőleges rá."
            />
          </GeometryFigureGrid>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* INTERAKTÍV EGYENES- ÉS TÉR-LABORATÓRIUM (A 4. PONT UTÁN) */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10 border-2 border-indigo-500/30 rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 border-b border-indigo-200 dark:border-indigo-900/50 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-indigo-600 text-white shadow-sm">
                <MoveHorizontal className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
                Interaktív Egyenes- és Térlaboratórium
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Próbáld ki a síkbeli egyenespárok szögét, fedezd fel a kitérő éleket a 3D kockán, és kövesd a körzős szerkesztést!
            </p>
          </div>

          {/* Fülek */}
          <div className="flex gap-1.5 bg-slate-200/80 dark:bg-slate-800/80 p-1 rounded-xl self-stretch sm:self-auto">
            <Button
              size="sm"
              variant={activeTab === 'plane' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", activeTab === 'plane' && "bg-indigo-600 text-white")}
              onClick={() => setActiveTab('plane')}
            >
              <MoveHorizontal className="w-3.5 h-3.5 mr-1" />
              Síkbeli egyenesek
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'space' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", activeTab === 'space' && "bg-indigo-600 text-white")}
              onClick={() => setActiveTab('space')}
            >
              <Box className="w-3.5 h-3.5 mr-1" />
              Térbeli élek (Kocka)
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'construction' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", activeTab === 'construction' && "bg-indigo-600 text-white")}
              onClick={() => setActiveTab('construction')}
            >
              <Compass className="w-3.5 h-3.5 mr-1" />
              Szerkesztés
            </Button>
          </div>
        </div>

        {/* 1. FÜL: SÍKBELI EGYENESEK SZIMULÁTORA */}
        {activeTab === 'plane' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Bal oldal: Interaktív SVG vetítővászon */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900 flex flex-col items-center justify-between shadow-inner min-h-[260px]">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
                  e egyenes (kék) és f egyenes (lila)
                </span>
                <Badge variant="secondary" className="font-mono text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {planeMode === 'parallel' && 'e ∥ f (Párhuzamosak)'}
                  {planeMode === 'perpendicular' && 'e ⊥ f (Merőlegesek, 90°)'}
                  {planeMode === 'intersecting' && `e ∩ f = {P} (${intersectAngle}°)`}
                </Badge>
              </div>

              <div className="my-auto py-2">
                <svg className="w-64 h-48 sm:w-80 sm:h-52 mx-auto drop-shadow-md" viewBox="0 0 240 160" fill="none">
                  {/* Háttér négyzetháló */}
                  <defs>
                    <pattern id="grid-plane-2" width="20" height="20" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="20" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="0" x2="0" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="240" height="160" fill="url(#grid-plane-2)" rx="8" />

                  {/* 1. EGYENES: e (mindig vízszintes kék egyenes y = 80 magasságban) */}
                  <line x1="15" y1="80" x2="225" y2="80" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
                  <text x="228" y="78" className="text-xs font-black fill-indigo-700">e</text>

                  {/* 2. EGYENES: f (állapottól függ) */}
                  {planeMode === 'parallel' && (
                    <g>
                      {/* f egyenes párhuzamosan 40 px-szel feljebb */}
                      <line x1="15" y1="40" x2="225" y2="40" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" />
                      <text x="228" y="38" className="text-xs font-black fill-purple-700">f</text>

                      {/* Távolságjelző merőleges vonalzó */}
                      <line x1="120" y1="40" x2="120" y2="80" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 2" />
                      {/* Magyar derékszög negyedkörív + pont */}
                      <path d="M 128 80 A 8 8 0 0 0 120 72" fill="none" stroke="#ea580c" strokeWidth="1.2" />
                      <circle cx="124" cy="76" r="0.9" fill="#ea580c" />
                      <text x="125" y="63" className="text-[10px] font-bold fill-orange-700">d = állandó</text>
                    </g>
                  )}

                  {planeMode === 'perpendicular' && (
                    <g>
                      {/* f egyenes függőlegesen x = 120-nál */}
                      <line x1="120" y1="15" x2="120" y2="145" stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" />
                      <text x="124" y="22" className="text-xs font-black fill-purple-700">f</text>

                      {/* Metszéspont P */}
                      <circle cx="120" cy="80" r="3.5" fill="#4338ca" />
                      <text x="128" y="94" className="text-xs font-black fill-slate-900 dark:fill-slate-100">P</text>

                      {/* MAGYAR DERÉKSZÖG JELÖLÉS: negyedkörív + pont */}
                      <path d="M 136 80 A 16 16 0 0 0 120 64" fill="none" stroke="#059669" strokeWidth="1.8" />
                      <circle cx="128" cy="72" r="1.3" fill="#047857" />
                      <text x="138" y="70" className="text-[10px] font-bold fill-emerald-700">90°</text>
                    </g>
                  )}

                  {planeMode === 'intersecting' && (
                    <g>
                      {/* f egyenes elforgatva P(120, 80) körül */}
                      {(() => {
                        const rad = (intersectAngle * Math.PI) / 180;
                        const len = 90;
                        const x1 = 120 - len * Math.cos(rad);
                        const y1 = 80 + len * Math.sin(rad);
                        const x2 = 120 + len * Math.cos(rad);
                        const y2 = 80 - len * Math.sin(rad);
                        return (
                          <>
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9333ea" strokeWidth="2.5" strokeLinecap="round" />
                            <text x={x2 + 4} y={y2 + 4} className="text-xs font-black fill-purple-700">f</text>
                          </>
                        );
                      })()}
                      <circle cx="120" cy="80" r="3.5" fill="#4338ca" />
                      <text x="128" y="96" className="text-xs font-black fill-slate-900 dark:fill-slate-100">P</text>

                      {/* Szögív */}
                      <path
                        d={`M 145 80 A 25 25 0 0 0 ${120 + 25 * Math.cos((intersectAngle * Math.PI) / 180)} ${80 - 25 * Math.sin((intersectAngle * Math.PI) / 180)}`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                      />
                      <text x="150" y="74" className="text-[10px] font-bold fill-amber-700">{intersectAngle}°</text>
                    </g>
                  )}
                </svg>
              </div>

              <div className="w-full text-center text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                {planeMode === 'parallel' && 'Nincs közös pont (e ∩ f = ∅), a távolságuk mindenhol azonos!'}
                {planeMode === 'perpendicular' && 'Pontosan 1 közös pont (metszéspont), a bezárt szög 90° (derékszög)!'}
                {planeMode === 'intersecting' && 'Pontosan 1 közös pont (metszéspont), 4 szöget zárnak be!'}
              </div>
            </div>

            {/* Jobb oldal: Vezérlők és beállítások */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Válaszd ki az egyenesek helyzetét a síkban:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    size="sm"
                    variant={planeMode === 'perpendicular' ? 'default' : 'outline'}
                    className={cn("justify-start font-bold text-xs h-9", planeMode === 'perpendicular' && "bg-indigo-600 text-white")}
                    onClick={() => setPlaneMode('perpendicular')}
                  >
                    <span className="mr-2 font-mono text-sm">⊥</span>
                    Merőleges egyenesek (90°-os metszés)
                  </Button>
                  <Button
                    size="sm"
                    variant={planeMode === 'parallel' ? 'default' : 'outline'}
                    className={cn("justify-start font-bold text-xs h-9", planeMode === 'parallel' && "bg-indigo-600 text-white")}
                    onClick={() => setPlaneMode('parallel')}
                  >
                    <span className="mr-2 font-mono text-sm">∥</span>
                    Párhuzamos egyenesek (nincs közös pont)
                  </Button>
                  <Button
                    size="sm"
                    variant={planeMode === 'intersecting' ? 'default' : 'outline'}
                    className={cn("justify-start font-bold text-xs h-9", planeMode === 'intersecting' && "bg-indigo-600 text-white")}
                    onClick={() => setPlaneMode('intersecting')}
                  >
                    <span className="mr-2 font-mono text-sm">✕</span>
                    Ferde metsző egyenesek (tetszőleges szög)
                  </Button>
                </div>
              </div>

              {planeMode === 'intersecting' && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-900 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-amber-900 dark:text-amber-200">
                    <span>Hegyesszög nagysága:</span>
                    <span className="font-mono">{intersectAngle}°</span>
                  </div>
                  <Slider
                    value={[intersectAngle]}
                    onValueChange={val => setIntersectAngle(val[0])}
                    min={15}
                    max={75}
                    step={5}
                    className="w-full"
                  />
                  <div className="text-[11px] text-amber-800 dark:text-amber-300">
                    Mellékszög nagysága: <span className="font-mono font-bold">180° - {intersectAngle}° = {180 - intersectAngle}°</span>
                  </div>
                </div>
              )}

              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                <div className="font-bold">Síkbeli alapszabály:</div>
                <div>A síkban két egyenes vagy <strong>metszi egymást</strong> (1 közös pont), vagy <strong>párhuzamos</strong> (0 közös pont), vagy <strong>egybeesik</strong> (végtelen sok közös pont).</div>
              </div>
            </div>
          </div>
        )}

        {/* 2. FÜL: TÉRBELI KOCKA ÉLEK ÉS KITÉRŐ EGYENESEK */}
        {activeTab === 'space' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Bal oldal: 3D Izometrikus Kocka Élvizsgáló */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900 flex flex-col items-center justify-between shadow-inner min-h-[270px]">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-red-600 rounded inline-block" />
                  Referencia él: <strong className="text-red-700 font-black">AB</strong> (alsó elülső él)
                </span>
                <Badge variant="secondary" className="font-mono text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {spaceRelation === 'parallel' && 'Párhuzamos élek (3 db)'}
                  {spaceRelation === 'perpendicular' && 'Merőlegesen metsző élek (4 db)'}
                  {spaceRelation === 'skew' && 'Kitérő élek (4 db)'}
                </Badge>
              </div>

              {/* 3D Kocka ábra */}
              <div className="my-auto py-3">
                <svg className="w-56 h-48 sm:w-64 sm:h-56 mx-auto drop-shadow-md" viewBox="0 0 200 180" fill="none">
                  {/* Hátsó takart élek */}
                  <line x1="80" y1="100" x2="160" y2="120" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="80" y1="100" x2="40" y2="130" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="80" y1="100" x2="80" y2="30" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Felső lap élei */}
                  <line x1="40" y1="60" x2="120" y2="80" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="120" y1="80" x2="160" y2="50" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="160" y1="50" x2="80" y2="30" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="80" y1="30" x2="40" y2="60" stroke="#94a3b8" strokeWidth="2" />

                  {/* Függőleges élek */}
                  <line x1="40" y1="130" x2="40" y2="60" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="120" y1="150" x2="120" y2="80" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="160" y1="120" x2="160" y2="50" stroke="#94a3b8" strokeWidth="2" />

                  {/* Elülső alsó élek */}
                  <line x1="120" y1="150" x2="160" y2="120" stroke="#94a3b8" strokeWidth="2" />

                  {/* KIEMELT ÉLEK ÁLLAPOTTÓL FÜGGŐEN */}
                  {spaceRelation === 'parallel' && (
                    <g>
                      <line x1="80" y1="100" x2="160" y2="120" stroke="#059669" strokeWidth="3" strokeDasharray="3 2" />
                      <line x1="40" y1="60" x2="120" y2="80" stroke="#059669" strokeWidth="3.5" />
                      <line x1="80" y1="30" x2="160" y2="50" stroke="#059669" strokeWidth="3" />
                    </g>
                  )}

                  {spaceRelation === 'perpendicular' && (
                    <g>
                      <line x1="40" y1="130" x2="80" y2="100" stroke="#2563eb" strokeWidth="3" strokeDasharray="3 2" />
                      <line x1="120" y1="150" x2="160" y2="120" stroke="#2563eb" strokeWidth="3.5" />
                      <line x1="40" y1="130" x2="40" y2="60" stroke="#2563eb" strokeWidth="3.5" />
                      <line x1="120" y1="150" x2="120" y2="80" stroke="#2563eb" strokeWidth="3.5" />
                    </g>
                  )}

                  {spaceRelation === 'skew' && (
                    <g>
                      <line x1="80" y1="100" x2="80" y2="30" stroke="#ea580c" strokeWidth="3.5" strokeDasharray="3 2" />
                      <line x1="160" y1="120" x2="160" y2="50" stroke="#ea580c" strokeWidth="3.5" />
                      <line x1="40" y1="60" x2="80" y2="30" stroke="#ea580c" strokeWidth="3.5" />
                      <line x1="120" y1="80" x2="160" y2="50" stroke="#ea580c" strokeWidth="3.5" />
                    </g>
                  )}

                  {/* REFERENCIA ÉL: AB (erős piros) */}
                  <line x1="40" y1="130" x2="120" y2="150" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />

                  {/* Csúcsok feliratai */}
                  <circle cx="40" cy="130" r="3.5" fill="#dc2626" />
                  <text x="30" y="142" className="text-[11px] font-black fill-red-700">A</text>
                  <circle cx="120" cy="150" r="3.5" fill="#dc2626" />
                  <text x="122" y="164" className="text-[11px] font-black fill-red-700">B</text>

                  <circle cx="160" cy="120" r="2.5" fill="#64748b" />
                  <text x="168" y="124" className="text-[10px] font-bold fill-slate-600">C</text>
                  <circle cx="80" cy="100" r="2.5" fill="#64748b" />
                  <text x="70" y="98" className="text-[10px] font-bold fill-slate-600">D</text>

                  <circle cx="40" cy="60" r="2.5" fill="#64748b" />
                  <text x="30" y="58" className="text-[10px] font-bold fill-slate-600">E</text>
                  <circle cx="120" cy="80" r="2.5" fill="#64748b" />
                  <text x="126" y="82" className="text-[10px] font-bold fill-slate-600">F</text>
                  <circle cx="160" cy="50" r="2.5" fill="#64748b" />
                  <text x="168" y="48" className="text-[10px] font-bold fill-slate-600">G</text>
                  <circle cx="80" cy="30" r="2.5" fill="#64748b" />
                  <text x="74" y="24" className="text-[10px] font-bold fill-slate-600">H</text>
                </svg>
              </div>

              <div className="w-full text-center text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                {spaceRelation === 'parallel' && 'AB-vel párhuzamos: DC, EF, HG (ugyanabba az irányba futnak, nem metszik egymást)'}
                {spaceRelation === 'perpendicular' && 'AB-t derékszögben metsző élek: AD, BC, AE, BF (csatlakoznak A vagy B csúcshoz)'}
                {spaceRelation === 'skew' && 'AB-hez képest KITÉRŐ élek: DH, CG, EH, FG (külön síkban vannak, sosem találkoznak!)'}
              </div>
            </div>

            {/* Jobb oldal: Élek magyarázata */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Válaszd ki az AB élhez viszonyított helyzetet:
              </span>

              <div className="grid grid-cols-1 gap-2">
                <Button
                  size="sm"
                  variant={spaceRelation === 'skew' ? 'default' : 'outline'}
                  className={cn("justify-start font-bold text-xs h-9", spaceRelation === 'skew' && "bg-orange-600 text-white")}
                  onClick={() => setSpaceRelation('skew')}
                >
                  <span className="mr-2">⚡</span>
                  Kitérő élek (se nem párhuzamos, se nem metsző)
                </Button>
                <Button
                  size="sm"
                  variant={spaceRelation === 'parallel' ? 'default' : 'outline'}
                  className={cn("justify-start font-bold text-xs h-9", spaceRelation === 'parallel' && "bg-emerald-600 text-white")}
                  onClick={() => setSpaceRelation('parallel')}
                >
                  <span className="mr-2 font-mono text-sm">∥</span>
                  Párhuzamos élek (3 db azonos irányú él)
                </Button>
                <Button
                  size="sm"
                  variant={spaceRelation === 'perpendicular' ? 'default' : 'outline'}
                  className={cn("justify-start font-bold text-xs h-9", spaceRelation === 'perpendicular' && "bg-blue-600 text-white")}
                  onClick={() => setSpaceRelation('perpendicular')}
                >
                  <span className="mr-2 font-mono text-sm">⊥</span>
                  Merőlegesen metsző élek (4 db csatlakozó él)
                </Button>
              </div>

              <div className="p-3.5 bg-orange-50 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-900 text-xs text-orange-950 dark:text-orange-200 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-orange-600" />
                  Mi az a kitérő egyenes a valóságban?
                </div>
                <p className="leading-relaxed text-[11px] text-slate-700 dark:text-slate-300">
                  Gondolj egy <strong>autópálya felüljáróra</strong>: az alul haladó autóút és a felette átívelő híd egyenesei nem párhuzamosak, mégsem metszik egymást, mert különböző magasságban (külön síkban) futnak.
                  Ilyen egyenesek a síkban nem létezhetnek, <strong>csak a 3D térben</strong>!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. FÜL: SZERKESZTÉSI LÉPÉSEK (SZAKASZFELEZŐ MERŐLEGES) */}
        {activeTab === 'construction' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-200 dark:border-indigo-900">
              <div className="flex gap-2">
                {[0, 1, 2].map(step => (
                  <Button
                    key={`step-btn-${step}`}
                    size="sm"
                    variant={constructionStep === step ? 'default' : 'outline'}
                    className={cn("text-xs font-bold", constructionStep === step && "bg-indigo-600 text-white")}
                    onClick={() => setConstructionStep(step)}
                  >
                    {step + 1}. Lépés
                  </Button>
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Szakaszfelező merőleges szerkesztése körzővel és vonalzóval
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-indigo-200 dark:border-indigo-900 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Animált / Lépésről lépésre SVG */}
              <div className="md:col-span-6 flex justify-center">
                <svg className="w-64 h-52 sm:w-72 sm:h-56 mx-auto" viewBox="0 0 200 160" fill="none">
                  {/* Alapszakasz AB */}
                  <line x1="40" y1="80" x2="160" y2="80" stroke="#312e81" strokeWidth="2.5" />
                  <circle cx="40" cy="80" r="3.5" fill="#4338ca" />
                  <text x="30" y="84" className="text-xs font-black fill-indigo-900 dark:fill-indigo-200">A</text>
                  <circle cx="160" cy="80" r="3.5" fill="#4338ca" />
                  <text x="168" y="84" className="text-xs font-black fill-indigo-900 dark:fill-indigo-200">B</text>

                  {/* 1. Lépés: Körív A-ból */}
                  {constructionStep >= 0 && (
                    <path
                      d="M 100 20 A 70 70 0 0 1 100 140"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                      fill="none"
                    />
                  )}

                  {/* 2. Lépés: Körív B-ből azonos sugárral */}
                  {constructionStep >= 1 && (
                    <g>
                      <path
                        d="M 100 20 A 70 70 0 0 0 100 140"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        fill="none"
                      />
                      {/* Metszéspontok P1 és P2 */}
                      <circle cx="100" cy="38" r="3" fill="#dc2626" />
                      <text x="106" y="38" className="text-[10px] font-bold fill-red-600">P₁</text>
                      <circle cx="100" cy="122" r="3" fill="#dc2626" />
                      <text x="106" y="126" className="text-[10px] font-bold fill-red-600">P₂</text>
                    </g>
                  )}

                  {/* 3. Lépés: Összekötő szakaszfelező merőleges egyenes */}
                  {constructionStep >= 2 && (
                    <g>
                      <line x1="100" y1="10" x2="100" y2="150" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
                      <text x="105" y="18" className="text-xs font-black fill-pink-700">f</text>

                      {/* Felezőpont F */}
                      <circle cx="100" cy="80" r="3" fill="#831843" />
                      <text x="104" y="94" className="text-[10px] font-black fill-pink-900 dark:fill-pink-200">F</text>

                      {/* Magyar derékszög jelölés F-nél (negyedkörív + pont) */}
                      <path d="M 108 80 A 8 8 0 0 0 100 72" fill="none" stroke="#047857" strokeWidth="1.2" />
                      <circle cx="104" cy="76" r="1" fill="#047857" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Lépés leírása */}
              <div className="md:col-span-6 space-y-3">
                <Badge className="bg-indigo-600 text-white font-bold text-xs">
                  {constructionStep + 1}. lépés a 3-ból
                </Badge>

                {constructionStep === 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                      1. Körív húzása az A pontból
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Nyisd ki a körzőt úgy, hogy a nyílása <strong>szemmel láthatóan nagyobb legyen a szakasz felénél</strong>!
                      Szúrd a körző hegyét az A pontba, és rajzolj egy körívet a szakasz felett és alatt.
                    </p>
                  </div>
                )}

                {constructionStep === 1 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                      2. Körív húzása a B pontból UGYANAZZAL a sugárral
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      <strong>Nagyon fontos:</strong> a körzőnyílást tilos elállítani!
                      Szúrd a körzőt a B pontba, és mesd el az előző körívet felül és alul is.
                      A két metszéspontot jelöljük <span className="font-mono font-bold text-red-600">P₁</span> és <span className="font-mono font-bold text-red-600">P₂</span> betűkkel.
                    </p>
                  </div>
                )}

                {constructionStep === 2 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                      3. A metszéspontok összekötése vonalzóval
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Illeszd a vonalzót a P₁ és P₂ pontokra, és húzz egy egyenest.
                      Ez az egyenes (<span className="font-mono font-bold text-pink-700">f</span>) a szakaszfelező merőleges:
                      pontosan a <strong>felezőpontban (F)</strong> metszi az AB szakaszt, és <strong>merőleges rá (90°)</strong>!
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={constructionStep === 0}
                    onClick={() => setConstructionStep(s => Math.max(0, s - 1))}
                    className="text-xs font-bold"
                  >
                    Előző lépés
                  </Button>
                  <Button
                    size="sm"
                    disabled={constructionStep === 2}
                    onClick={() => setConstructionStep(s => Math.min(2, s + 1))}
                    className="text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Következő lépés <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 5. SZEKCIÓ: GYAKORI HIBÁK ÉS TÉVHITEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-lines-traps"
        number={5}
        title="Gyakori hibák és tévhitek az egyeneseknél"
        badge="Csapdák"
        badgeColor="rose"
      >
        <TheoryTrapBox
          traps={[
            {
              title: '1. Csapda: „Ha két egyenes nem metszi egymást, akkor biztosan párhuzamosak”',
              wrong: 'Azt hinni, hogy minden nem metsző egyenespár párhuzamos.',
              correct: 'Ez a szabály CSAK A SÍKBAN igaz! A 3D térben a nem metsző egyenesek lehetnek KITÉRŐK is, ha nincsenek egy síkban.',
              explanation: 'Gondolj a felüljáróra és az alatta áthaladó útra: nem metszik egymást, mégsem párhuzamosak.'
            },
            {
              title: '2. Csapda: A távolság ferde mérése',
              wrong: 'Ferdén odatenni a vonalzót a két párhuzamos egyenes közé.',
              correct: 'Két párhuzamos egyenes (vagy pont és egyenes) távolsága MINDIG a merőlegesen mért szakasz hossza!',
              explanation: 'A távolság definíció szerint a legrövidebb út, ami mindig merőleges.'
            },
            {
              title: '3. Csapda: „A merőleges egyenesek nem metsző egyenesek” tévhit',
              wrong: 'Külön kategóriaként kezelni a metsző és a merőleges egyeneseket.',
              correct: 'A merőleges egyenesek SPECIÁLIS metsző egyenesek! Ugyanúgy pontosan 1 közös metszéspontjuk van, de a bezárt szögük speciálisan 90°.',
              explanation: 'Minden merőleges egyenes metsző, de nem minden metsző egyenes merőleges.'
            },
            {
              title: '4. Csapda: Szakaszfelező szerkesztésénél túl kicsi körzőnyílás',
              wrong: 'A szakasz felénél kisebb sugárral próbálkozni.',
              correct: 'Ha a körzőnyílás kisebb a szakasz felénél, a két körív sosem éri el egymást, nem lesz metszéspont!',
              explanation: 'A körző nyílásának szemmel láthatóan nagyobbnak kell lennie a szakasz felénél.'
            },
            {
              title: '5. Csapda: Szakaszok vs. Egyenesek összekeverése',
              wrong: 'Azt mondani két szakaszra, hogy párhuzamosak, mert nem érnek össze a füzetben.',
              correct: 'A szakaszok végesek, de az egyenesek mindkét irányban a VÉGTELENBE tartanak. Ha a szakaszokat gondolatban meghosszabbítva találkoznak, akkor metsző egyenesekről beszélünk!',
              explanation: 'Mindig az egyenes teljes, végtelen vonalát kell elképzelni.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LinesTheory;
