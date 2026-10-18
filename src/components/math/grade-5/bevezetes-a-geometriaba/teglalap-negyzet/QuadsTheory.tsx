import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureGrid,
  GeometryFigureCard,
  FormulaFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  Square,
  RectangleHorizontal,
  Ruler,
  Maximize2,
  Sparkles,
  Split,
  Eye,
  CheckCircle2,
  Sliders,
  Grid
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface QuadsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const QuadsTheory: React.FC<QuadsTheoryProps> = ({ onBack, onStartQuiz }) => {
  // --- Interaktív laboratórium állapota ---
  const [activeTab, setActiveTab] = useState<'rectangle' | 'square' | 'compare'>('rectangle');

  // Téglalap csúszkák
  const [rectA, setRectA] = useState<number>(5); // szélesség: 2..8 egység
  const [rectB, setRectB] = useState<number>(3); // magasság: 2..6 egység
  const [showRectDiagonals, setShowRectDiagonals] = useState<boolean>(true);
  const [showRectAxes, setShowRectAxes] = useState<boolean>(false);
  const [showRectGrid, setShowRectGrid] = useState<boolean>(true);

  // Négyzet csúszka
  const [sqA, setSqA] = useState<number>(4); // oldalhossz: 2..7 egység
  const [showSqDiagonals, setShowSqDiagonals] = useState<boolean>(true);
  const [showSqAxes, setShowSqAxes] = useState<boolean>(false);
  const [showSqGrid, setShowSqGrid] = useState<boolean>(true);

  // Összehasonlító fül kiválasztott tulajdonsága
  const [selectedProperty, setSelectedProperty] = useState<string>('sides');

  return (
    <TheoryTemplate
      title="8. Téglalap, négyzet"
      subtitle="A téglalap és a négyzet oldalai, belső szögei, átlói, szimmetriatengelyei és kerülete, területe négyzetrácson"
      documentId="g5-geom-quads-theory-content"
      pdfFilename="5_osztaly_III_geometria_8_teglalap_negyzet_tananyag.pdf"
      badgeText="📐 5. Osztály • III. Geometria"
      themeColor="rose"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: "Kiemelt alapszabály",
        formula: "Téglalap: 4 derékszög • 2 szimmetriatengely • K = 2(a+b), T = a · b | Négyzet: 4 egyenlő oldal • 4 tengely • K = 4a, T = a²"
      }}
      practiceTitle="Készen állsz a téglalapok és négyzetek gyakorlására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* ======================================================== */}
      {/* 1. SZEKCIÓ: A TÉGLALAP ÉS A NÉGYZET FOGALMA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-quads-basics"
        number={1}
        title="A téglalap és a négyzet fogalma, alkotóelemei"
        badge="Fogalmak"
        badgeColor="rose"
      >
        <TheoryCard title="Milyen négyszög a téglalap és a négyzet?">
          {/* Kiemelt alapszabály kártya az elején */}
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 space-y-1 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-900 dark:text-rose-200">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              Kiemelt alapszabály a téglalapra és négyzetre:
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              A <strong>téglalap</strong> olyan négyszög, amelynek minden belső szöge derékszög ($90^\circ$).
              A <strong>négyzet</strong> olyan speciális téglalap, amelynek minden oldala egyenlő hosszú.
              Ezért <em>minden négyzet téglalap, de nem minden téglalap négyzet!</em>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A mindennapi életben szinte mindenhol velük találkozunk: a könyvek lapjai, az ajtók, ablakok, csempék és a füzetünk négyzethálói mind téglalapok és négyzetek.
          </p>

          <GeometryFigureGrid columns={2}>
            {/* 1. KÁRTYA: TÉGLALAP */}
            <GeometryFigureCard
              title="A téglalap tulajdonságai"
              figure={
                <svg className="w-32 h-20 mx-auto" viewBox="0 0 100 65" fill="none">
                  {/* Téglalap teste */}
                  <rect x="15" y="12" width="70" height="42" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" rx="1" />
                  {/* Csúcsok */}
                  <circle cx="15" cy="54" r="2" fill="#be123c" />
                  <text x="8" y="58" className="text-[8px] font-black fill-rose-900">A</text>
                  <circle cx="85" cy="54" r="2" fill="#be123c" />
                  <text x="88" y="58" className="text-[8px] font-black fill-rose-900">B</text>
                  <circle cx="85" cy="12" r="2" fill="#be123c" />
                  <text x="88" y="12" className="text-[8px] font-black fill-rose-900">C</text>
                  <circle cx="15" cy="12" r="2" fill="#be123c" />
                  <text x="8" y="12" className="text-[8px] font-black fill-rose-900">D</text>

                  {/* Oldalak jelölése */}
                  <text x="48" y="62" className="text-[9px] font-bold fill-rose-800">a</text>
                  <text x="48" y="9" className="text-[9px] font-bold fill-rose-800">a</text>
                  <text x="89" y="36" className="text-[9px] font-bold fill-rose-800">b</text>
                  <text x="7" y="36" className="text-[9px] font-bold fill-rose-800">b</text>

                  {/* 4 Magyar derékszög jelölés (negyedkörív + pont) */}
                  <path d="M 23 54 A 8 8 0 0 0 15 46" fill="none" stroke="#be123c" strokeWidth="1" />
                  <circle cx="18.5" cy="50.5" r="0.8" fill="#be123c" />

                  <path d="M 77 54 A 8 8 0 0 1 85 46" fill="none" stroke="#be123c" strokeWidth="1" />
                  <circle cx="81.5" cy="50.5" r="0.8" fill="#be123c" />

                  <path d="M 77 12 A 8 8 0 0 0 85 20" fill="none" stroke="#be123c" strokeWidth="1" />
                  <circle cx="81.5" cy="15.5" r="0.8" fill="#be123c" />

                  <path d="M 23 12 A 8 8 0 0 1 15 20" fill="none" stroke="#be123c" strokeWidth="1" />
                  <circle cx="18.5" cy="15.5" r="0.8" fill="#be123c" />
                </svg>
              }
              figureHeight="h-20 sm:h-24 min-h-0"
              properties={[
                '4 belső szöge mind derékszög: 4 · 90° = 360°.',
                'Szemközti oldalai párhuzamosak és egyenlő hosszúak (AB ∥ CD, AD ∥ BC).',
                'Szomszédos oldalai merőlegesek egymásra (a ⊥ b).',
                'Általában két különböző oldalhossza van: a (hosszúság) és b (szélesség).'
              ]}
              explanation="Jelölése: ABCD téglalap, ahol az óramutató járásával ellentétesen betűzzük a csúcsokat."
            />

            {/* 2. KÁRTYA: NÉGYZET */}
            <GeometryFigureCard
              title="A négyzet tulajdonságai"
              figure={
                <svg className="w-24 h-20 mx-auto" viewBox="0 0 80 65" fill="none">
                  {/* Négyzet teste */}
                  <rect x="18" y="10" width="45" height="45" fill="#fce7f3" stroke="#db2777" strokeWidth="2" rx="1" />
                  {/* Csúcsok */}
                  <circle cx="18" cy="55" r="2" fill="#9d174d" />
                  <text x="10" y="59" className="text-[8px] font-black fill-pink-900">A</text>
                  <circle cx="63" cy="55" r="2" fill="#9d174d" />
                  <text x="66" y="59" className="text-[8px] font-black fill-pink-900">B</text>
                  <circle cx="63" cy="10" r="2" fill="#9d174d" />
                  <text x="66" y="10" className="text-[8px] font-black fill-pink-900">C</text>
                  <circle cx="18" cy="10" r="2" fill="#9d174d" />
                  <text x="10" y="10" className="text-[8px] font-black fill-pink-900">D</text>

                  {/* Oldalak egyenlősége: mind a */}
                  <text x="39" y="63" className="text-[9px] font-bold fill-pink-800">a</text>
                  <text x="39" y="7" className="text-[9px] font-bold fill-pink-800">a</text>
                  <text x="67" y="35" className="text-[9px] font-bold fill-pink-800">a</text>
                  <text x="9" y="35" className="text-[9px] font-bold fill-pink-800">a</text>

                  {/* Magyar derékszög jelölések */}
                  <path d="M 26 55 A 8 8 0 0 0 18 47" fill="none" stroke="#db2777" strokeWidth="1" />
                  <circle cx="21.5" cy="51.5" r="0.8" fill="#db2777" />

                  <path d="M 55 55 A 8 8 0 0 1 63 47" fill="none" stroke="#db2777" strokeWidth="1" />
                  <circle cx="59.5" cy="51.5" r="0.8" fill="#db2777" />

                  <path d="M 55 10 A 8 8 0 0 0 63 18" fill="none" stroke="#db2777" strokeWidth="1" />
                  <circle cx="59.5" cy="13.5" r="0.8" fill="#db2777" />

                  <path d="M 26 10 A 8 8 0 0 1 18 18" fill="none" stroke="#db2777" strokeWidth="1" />
                  <circle cx="21.5" cy="13.5" r="0.8" fill="#db2777" />
                </svg>
              }
              figureHeight="h-20 sm:h-24 min-h-0"
              properties={[
                'MINDEN oldala egyenlő hosszú: a = b = c = d.',
                '4 belső szöge mind derékszög (4 · 90° = 360°).',
                'Szemközti oldalai párhuzamosak, szomszédos oldalai merőlegesek.',
                'A négyszögek világának legsymmetricusabb alakzata (szabályos négyszög).'
              ]}
              explanation="A négyzet a téglalap egyenrangú oldalhosszúságú, tökéletesen szabályos esete."
            />
          </GeometryFigureGrid>

          {/* Venn-diagramos kapcsolat */}
          <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-4">
            <div className="w-48 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-44 h-28" viewBox="0 0 140 90" fill="none">
                {/* Téglalapok halmaza: nagy kék ovális */}
                <ellipse cx="70" cy="45" rx="64" ry="40" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
                <text x="25" y="24" className="text-[10px] font-black fill-indigo-800">Téglalapok</text>

                {/* Négyzetek belső halmaza: rózsaszín kör belül */}
                <ellipse cx="85" cy="50" rx="36" ry="26" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" strokeDasharray="3 1" />
                <text x="65" y="53" className="text-[10px] font-black fill-pink-800">Négyzetek</text>
              </svg>
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                A téglalap és a négyzet halmazelméleti kapcsolata:
              </h4>
              <p className="leading-relaxed">
                A <strong>négyzetek halmaza részhalmaza a téglalapok halmazának</strong> (<MathText>{'\\text{Négyzetek} \\subseteq \\text{Téglalapok}'}</MathText>).
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-600 dark:text-slate-400">
                <li><strong>Igaz állítás:</strong> Minden négyzet téglalap (mivel minden szöge derékszög).</li>
                <li><strong>Hamis állítás:</strong> Minden téglalap négyzet (mert nem minden téglalap oldalai egyenlők).</li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 2. SZEKCIÓ: ÁTLÓK TULAJDONSÁGAI ÉS METSZÉSPONTJA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-quads-diagonals"
        number={2}
        title="Átlók tulajdonságai és metszéspontja"
        badge="Átlók"
        badgeColor="purple"
      >
        <TheoryCard title="Mit tudunk a téglalap és a négyzet átlóiról?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Az <strong>átló</strong> a négyszög két nem szomszédos (szemközti) csúcsát összekötő szakasz.
            Mindkét alakzatnak <strong>pontosan 2 átlója</strong> van (<MathText>{'AC = e'}</MathText> és <MathText>{'BD = f'}</MathText>), de a tulajdonságaikban van egy lényeges különbség!
          </p>

          <GeometryFigureGrid columns={2}>
            {/* TÉGLALAP ÁTLÓI */}
            <GeometryFigureCard
              title="A téglalap átlói"
              figure={
                <svg className="w-32 h-20 mx-auto" viewBox="0 0 100 65" fill="none">
                  {/* Téglalap keret */}
                  <rect x="15" y="12" width="70" height="42" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  {/* Átló 1: AC */}
                  <line x1="15" y1="54" x2="85" y2="12" stroke="#4f46e5" strokeWidth="2.2" />
                  {/* Átló 2: BD */}
                  <line x1="15" y1="12" x2="85" y2="54" stroke="#9333ea" strokeWidth="2.2" />
                  {/* Metszéspont M */}
                  <circle cx="50" cy="33" r="2.5" fill="#e11d48" />
                  <text x="50" y="27" className="text-[8px] font-black fill-rose-700 text-center">M</text>

                  {/* Csúcsok */}
                  <text x="7" y="58" className="text-[7.5px] font-bold fill-slate-700">A</text>
                  <text x="88" y="58" className="text-[7.5px] font-bold fill-slate-700">B</text>
                  <text x="88" y="12" className="text-[7.5px] font-bold fill-slate-700">C</text>
                  <text x="7" y="12" className="text-[7.5px] font-bold fill-slate-700">D</text>

                  {/* 4 egyenlő fél-átló jelölése kis vonalkákkal */}
                  <circle cx="32.5" cy="43.5" r="1" fill="#4f46e5" />
                  <circle cx="67.5" cy="22.5" r="1" fill="#4f46e5" />
                  <circle cx="32.5" cy="22.5" r="1" fill="#9333ea" />
                  <circle cx="67.5" cy="43.5" r="1" fill="#9333ea" />
                </svg>
              }
              figureHeight="h-20 sm:h-24 min-h-0"
              properties={[
                'Az átlók EGYENLŐ hosszúak: |AC| = |BD| (e = f).',
                'Az átlók FELEZIK egymást: M pont mindkét átló pontos felezőpontja.',
                'A 4 keletkező fél-átló hossza mind egyenlő: |AM| = |BM| = |CM| = |DM|.',
                'NEM merőlegesek egymásra! (Két hegyesszöget és két tompaszöget zárnak be).'
              ]}
              explanation="Mivel minden csúcs egyenlő távol van az M metszésponttól, a téglalap köré kör írható!"
            />

            {/* NÉGYZET ÁTLÓI */}
            <GeometryFigureCard
              title="A négyzet átlói"
              figure={
                <svg className="w-24 h-20 mx-auto" viewBox="0 0 80 65" fill="none">
                  {/* Négyzet keret */}
                  <rect x="18" y="10" width="45" height="45" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  {/* Átló 1: AC */}
                  <line x1="18" y1="55" x2="63" y2="10" stroke="#db2777" strokeWidth="2.2" />
                  {/* Átló 2: BD */}
                  <line x1="18" y1="10" x2="63" y2="55" stroke="#db2777" strokeWidth="2.2" />
                  {/* Metszéspont M */}
                  <circle cx="40.5" cy="32.5" r="2.5" fill="#be123c" />
                  <text x="45" y="36" className="text-[8px] font-black fill-rose-700">M</text>

                  {/* Derékszög jelölés a metszéspontnál (negyedkörív + pont a felső háromszögben a két átló között) */}
                  <path d="M 44.7 28.3 A 6 6 0 0 0 36.3 28.3" fill="none" stroke="#be123c" strokeWidth="1" />
                  <circle cx="40.5" cy="28.8" r="0.6" fill="#be123c" />

                  {/* Csúcsok */}
                  <text x="10" y="58" className="text-[7.5px] font-bold fill-slate-700">A</text>
                  <text x="66" y="58" className="text-[7.5px] font-bold fill-slate-700">B</text>
                  <text x="66" y="10" className="text-[7.5px] font-bold fill-slate-700">C</text>
                  <text x="10" y="10" className="text-[7.5px] font-bold fill-slate-700">D</text>

                  {/* 45 fokos szögek jelölése */}
                  <text x="23" y="51" className="text-[6.5px] font-black fill-pink-700">45°</text>
                </svg>
              }
              figureHeight="h-20 sm:h-24 min-h-0"
              properties={[
                'Az átlók EGYENLŐ hosszúak: |AC| = |BD| (e = f).',
                'Az átlók FELEZIK egymást.',
                'MERŐLEGESEK egymásra: e ⊥ f (pontosan 90°-ot zárnak be)!',
                'FELEZIK a belső derékszögeket: mindkét 90°-ot két 45°-os szögre osztják.'
              ]}
              explanation="A négyzet átlói 4 darab egybevágó, egyenlő szárú derékszögű háromszögre bontják a négyzetet."
            />
          </GeometryFigureGrid>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 3. SZEKCIÓ: TENGELYES SZIMMETRIA (TÜKÖRTENGELYEK) */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-quads-symmetry"
        number={3}
        title="Tengelyes szimmetria: tükörtengelyek száma és helyzete"
        badge="Szimmetria"
        badgeColor="indigo"
      >
        <TheoryCard title="Hány tükörtengelye van a téglalapnak és a négyzetnek?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Egy alakzat <strong>tengelyesen szimmetrikus</strong>, ha van olyan egyenese (tükörtengelye), amelyre tükrözve az alakzat pontosan önmagába megy át.
            Gondolj a papírhajtogatásra: ha a tengely mentén félbehajtod a lapot, a két fél pontosan lefedi egymást!
          </p>

          <GeometryFigureGrid columns={2}>
            {/* TÉGLALAP SZIMMETRIÁJA: 2 TENGELY */}
            <GeometryFigureCard
              title="A téglalap: PONTOSAN 2 szimmetriatengely"
              figure={
                <svg className="w-32 h-20 mx-auto" viewBox="0 0 100 65" fill="none">
                  {/* Téglalap keret */}
                  <rect x="15" y="12" width="70" height="42" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />

                  {/* Függőleges oldalfelező tengely t1 */}
                  <line x1="50" y1="5" x2="50" y2="60" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 2" />
                  <text x="52" y="9" className="text-[7.5px] font-black fill-red-600">t₁</text>

                  {/* Vízszintes oldalfelező tengely t2 */}
                  <line x1="8" y1="33" x2="92" y2="33" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 2" />
                  <text x="86" y="30" className="text-[7.5px] font-black fill-red-600">t₂</text>

                  {/* Hibás átló szaggatott szürkével */}
                  <line x1="15" y1="54" x2="85" y2="12" stroke="#94a3b8" strokeWidth="1" strokeDasharray="1 2" />
                  <text x="65" y="24" className="text-[6.5px] font-bold fill-slate-400">nem tengely!</text>
                </svg>
              }
              figureHeight="h-20 sm:h-24 min-h-0"
              properties={[
                'A 2 tükörtengely a szemközti oldalak felezőmerőlegese (t₁ és t₂).',
                'Egy függőleges és egy vízszintes tengely.',
                'KRITIKUS: A téglalap átlói NEM tükörtengelyek! Ha átlósan hajtod össze a füzetlapot, a csúcsok elcsúsznak egymástól.',
                'A tengelyek egymásra merőlegesek és a középpontban metszik egymást.'
              ]}
              explanation="Összesen: 2 tükörtengely (mindkettő oldalfelező)."
            />

            {/* NÉGYZET SZIMMETRIÁJA: 4 TENGELY */}
            <GeometryFigureCard
              title="A négyzet: PONTOSAN 4 szimmetriatengely"
              figure={
                <svg className="w-24 h-20 mx-auto" viewBox="0 0 80 65" fill="none">
                  {/* Négyzet keret */}
                  <rect x="18" y="10" width="45" height="45" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />

                  {/* 2 Oldalfelező tengely kékkel */}
                  <line x1="40.5" y1="3" x2="40.5" y2="62" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="3 2" />
                  <line x1="10" y1="32.5" x2="71" y2="32.5" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="3 2" />

                  {/* 2 Átlós tengely pirossal */}
                  <line x1="12" y1="61" x2="69" y2="4" stroke="#dc2626" strokeWidth="1.8" strokeDasharray="3 2" />
                  <line x1="12" y1="4" x2="69" y2="61" stroke="#dc2626" strokeWidth="1.8" strokeDasharray="3 2" />

                  <circle cx="40.5" cy="32.5" r="2" fill="#1e293b" />
                </svg>
              }
              figureHeight="h-20 sm:h-24 min-h-0"
              properties={[
                '2 darab oldalfelező merőleges tengely (vízszintes és függőleges).',
                '2 darab átlós tükörtengely (a négyzet átlói egyben tükörtengelyek is!).',
                'Ha a négyzetet az átlója mentén hajtod félbe, a szemközti oldalak és csúcsok tökéletesen fedik egymást.',
                'Mind a 4 tengely a négyzet középpontjában (az átlók metszéspontjában) találkozik.'
              ]}
              explanation="Összesen: 4 tükörtengely (2 oldalfelező + 2 átló)."
            />
          </GeometryFigureGrid>

          {/* Összefoglaló összehasonlító táblázat */}
          <div className="mt-5">
            <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-600" />
              A téglalap és a négyzet tulajdonságainak összehasonlítása
            </h4>
            <TheoryTable
              columns={['Tulajdonság', 'Téglalap', 'Négyzet']}
              rows={[
                ['Oldalak száma', '4 oldal', '4 oldal'],
                ['Oldalak hossza', 'Szemközti oldalak egyenlők (a és b)', 'Minden oldal egyenlő (a = b = c = d)'],
                ['Belső szögek', 'Mind a 4 derékszög (90°)', 'Mind a 4 derékszög (90°)'],
                ['Belső szögek összege', '360°', '360°'],
                ['Átlók száma és hossza', '2 db, egyenlő hosszúak (e = f)', '2 db, egyenlő hosszúak (e = f)'],
                ['Átlók felezik-e egymást?', 'Igen (M felezőpont)', 'Igen (M felezőpont)'],
                ['Átlók merőlegesek egymásra?', 'NEM (csak speciálisan)', 'IGEN (e ⊥ f, 90°)'],
                ['Átlók felezik a szögeket?', 'NEM', 'IGEN (45°-os szögekre)'],
                ['Szimmetriatengelyek száma', '2 (csak az oldalfelezők)', '4 (2 oldalfelező + 2 átló)']
              ]}
            />
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 4. SZEKCIÓ: KERÜLET ÉS TERÜLET NÉGYZETRÁCSON */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-quads-perimeter-area"
        number={4}
        title="Kerület és terület alapjai négyzetrácson"
        badge="Képletek"
        badgeColor="emerald"
      >
        <TheoryCard title="Hogyan számoljuk ki a kerületet és a területet?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A két leggyakrabban használt geometriai mennyiség a kerület és a terület.
            Fontos, hogy sose keverd össze őket: a <strong>kerület a határvonal hossza</strong> (kerítés), a <strong>terület pedig a lefedett felület nagysága</strong> (csempézés)!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* TÉGLALAP KÉPLETEK */}
            <FormulaFigureCard
              title="Téglalap kerülete és területe"
              formula="K = 2 · (a + b) \quad \text{és} \quad T = a · b"
              formulaLabel="Téglalap Képletek"
              color="rose"
              figure={
                <svg className="w-32 h-24 mx-auto" viewBox="0 0 120 80" fill="none">
                  {/* 4x3-as rácsháló négyzetei: 4 oszlop, 3 sor (egyenként 20x16 px) */}
                  {[0, 1, 2, 3].map(col =>
                    [0, 1, 2].map(row => (
                      <rect
                        key={`${col}-${row}`}
                        x={20 + col * 20}
                        y={16 + row * 16}
                        width="20"
                        height="16"
                        fill="#ffe4e6"
                        stroke="#f43f5e"
                        strokeWidth="0.8"
                      />
                    ))
                  )}
                  {/* Keret vastagon */}
                  <rect x="20" y="16" width="80" height="48" stroke="#be123c" strokeWidth="2.5" fill="none" />
                  <text x="60" y="74" className="text-[10px] font-black fill-rose-900 text-center">a = 4 cm</text>
                  <text x="104" y="44" className="text-[10px] font-black fill-rose-900">b = 3 cm</text>
                </svg>
              }
              properties={[
                'Kerület (K): a 4 oldal összhossza → K = a + b + a + b = 2 · (a + b).',
                'Terület (T): hány darab 1 cm²-es egységnégyzet fedi le → T = a · b.',
                'Példánkon: a = 4 cm, b = 3 cm.',
                'K = 2 · (4 + 3) = 2 · 7 = 14 cm.',
                'T = 4 · 3 = 12 cm² (megszámolva: pontosan 12 db rácsnégyzet!).'
              ]}
              description="Figyeld a mértékegységeket: a kerület hossza cm, a terület cm²!"
            />

            {/* NÉGYZET KÉPLETEK */}
            <FormulaFigureCard
              title="Négyzet kerülete és területe"
              formula="K = 4 · a \quad \text{és} \quad T = a · a = a^2"
              formulaLabel="Négyzet Képletek"
              color="emerald"
              figure={
                <svg className="w-28 h-24 mx-auto" viewBox="0 0 100 80" fill="none">
                  {/* 3x3-as rácsháló: 3 oszlop, 3 sor (egyenként 18x18 px) */}
                  {[0, 1, 2].map(col =>
                    [0, 1, 2].map(row => (
                      <rect
                        key={`${col}-${row}`}
                        x={23 + col * 18}
                        y={13 + row * 18}
                        width="18"
                        height="18"
                        fill="#d1fae5"
                        stroke="#10b981"
                        strokeWidth="0.8"
                      />
                    ))
                  )}
                  {/* Keret vastagon */}
                  <rect x="23" y="13" width="54" height="54" stroke="#047857" strokeWidth="2.5" fill="none" />
                  <text x="50" y="76" className="text-[10px] font-black fill-emerald-900 text-center">a = 3 cm</text>
                  <text x="81" y="44" className="text-[10px] font-black fill-emerald-900">a = 3 cm</text>
                </svg>
              }
              properties={[
                'Kerület (K): mivel mind a 4 oldala egyforma → K = a + a + a + a = 4 · a.',
                'Terület (T): az oldalhossz önmagával szorozva → T = a · a = a².',
                'Példánkon: a = 3 cm.',
                'K = 4 · 3 = 12 cm.',
                'T = 3 · 3 = 9 cm² (összesen 9 db 1 cm²-es négyzet fedi le!).'
              ]}
              description="A négyzet kerülete mindig négyszerese az oldalának!"
            />
          </div>

          <TheoryCallout variant="tip" title="Fontos aranyszabály: a mértékegységek egyeztetése">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Számolás előtt <strong>MINDIG váltsd azonos mértékegységre</strong> az oldalakat!
              Például ha <MathText>{'a = 3\\text{ dm}'}</MathText> és <MathText>{'b = 20\\text{ cm}'}</MathText>, akkor először válts: <MathText>{'a = 30\\text{ cm}'}</MathText>.
              Ekkor: <MathText>{'K = 2 \\cdot (30 + 20) = 100\\text{ cm}'}</MathText>, és <MathText>{'T = 30 \\cdot 20 = 600\\text{ cm}^2'}</MathText>.
              Soha ne szorozz össze közvetlenül decimétert és centimétert!
            </p>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* INTERAKTÍV TÉGLALAP- ÉS NÉGYZETLABORATÓRIUM */}
      {/* (A 4. PONT UTÁN, AZ 5. PONT ELŐTT) */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-purple-500/10 border-2 border-rose-500/30 rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 border-b border-rose-200 dark:border-rose-900/50 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-rose-600 text-white shadow-sm">
                <Sliders className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
                Interaktív Téglalap- és Négyzetlaboratórium
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Méretezd a síkidomokat, kapcsold be az átlókat és szimmetriatengelyeket, és figyeld a kerület és terület azonnali alakulását!
            </p>
          </div>

          {/* Fülek */}
          <div className="flex gap-1.5 bg-slate-200/80 dark:bg-slate-800/80 p-1 rounded-xl self-stretch sm:self-auto">
            <Button
              size="sm"
              variant={activeTab === 'rectangle' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", activeTab === 'rectangle' && "bg-rose-600 text-white")}
              onClick={() => setActiveTab('rectangle')}
            >
              <RectangleHorizontal className="w-3.5 h-3.5 mr-1" />
              Téglalap
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'square' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", activeTab === 'square' && "bg-rose-600 text-white")}
              onClick={() => setActiveTab('square')}
            >
              <Square className="w-3.5 h-3.5 mr-1" />
              Négyzet
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'compare' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", activeTab === 'compare' && "bg-rose-600 text-white")}
              onClick={() => setActiveTab('compare')}
            >
              <Split className="w-3.5 h-3.5 mr-1" />
              Összehasonlítás
            </Button>
          </div>
        </div>

        {/* 1. FÜL: TÉGLALAP SZIMULÁTOR */}
        {activeTab === 'rectangle' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Bal oldal: Interaktív SVG vetítővászon */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-4 border border-rose-200 dark:border-rose-900 flex flex-col items-center justify-between shadow-inner min-h-[280px]">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
                  a = {rectA} egység, b = {rectB} egység
                </span>
                <Badge variant="secondary" className="font-mono text-xs bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  {rectA === rectB ? 'Különleges eset: NÉGYZET!' : 'Általános téglalap'}
                </Badge>
              </div>

              {/* Dinamikus SVG téglalap */}
              <div className="my-auto py-3">
                <svg className="w-64 h-48 sm:w-80 sm:h-52 mx-auto drop-shadow-md" viewBox="0 0 240 170" fill="none">
                  {/* Rácsháló háttér */}
                  <defs>
                    <pattern id="quads-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="20" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="0" x2="0" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="240" height="170" fill="url(#quads-grid)" rx="8" />

                  {/* Dinamikus méretarány: 1 egység = 22 px */}
                  {(() => {
                    const unit = 22;
                    const w = rectA * unit;
                    const h = rectB * unit;
                    const startX = (240 - w) / 2;
                    const startY = (170 - h) / 2;

                    return (
                      <g>
                        {/* Egységnégyzetek kirajzolása ha be van kapcsolva */}
                        {showRectGrid &&
                          Array.from({ length: rectA }).map((_, c) =>
                            Array.from({ length: rectB }).map((_, r) => (
                              <rect
                                key={`r-${c}-${r}`}
                                x={startX + c * unit}
                                y={startY + r * unit}
                                width={unit}
                                height={unit}
                                fill="#ffe4e6"
                                stroke="#f43f5e"
                                strokeWidth="0.8"
                                opacity="0.65"
                              />
                            ))
                          )}

                        {/* Fő téglalap keret */}
                        <rect
                          x={startX}
                          y={startY}
                          width={w}
                          height={h}
                          fill={showRectGrid ? 'none' : '#ffe4e6'}
                          stroke="#e11d48"
                          strokeWidth="2.5"
                          rx="1"
                        />

                        {/* Átlók kirajzolása */}
                        {showRectDiagonals && (
                          <g>
                            <line x1={startX} y1={startY + h} x2={startX + w} y2={startY} stroke="#4f46e5" strokeWidth="1.8" />
                            <line x1={startX} y1={startY} x2={startX + w} y2={startY + h} stroke="#4f46e5" strokeWidth="1.8" />
                            <circle cx={startX + w / 2} cy={startY + h / 2} r="3" fill="#4338ca" />
                          </g>
                        )}

                        {/* Szimmetriatengelyek kirajzolása */}
                        {showRectAxes && (
                          <g>
                            {/* Függőleges oldalfelező tengely */}
                            <line
                              x1={startX + w / 2}
                              y1={startY - 15}
                              x2={startX + w / 2}
                              y2={startY + h + 15}
                              stroke="#0284c7"
                              strokeWidth="2"
                              strokeDasharray="4 2"
                            />
                            {/* Vízszintes oldalfelező tengely */}
                            <line
                              x1={startX - 15}
                              y1={startY + h / 2}
                              x2={startX + w + 15}
                              y2={startY + h / 2}
                              stroke="#0284c7"
                              strokeWidth="2"
                              strokeDasharray="4 2"
                            />
                          </g>
                        )}

                        {/* Méretfeliratok */}
                        <text
                          x={startX + w / 2}
                          y={startY + h + 16}
                          className="text-[11px] font-black fill-rose-900 dark:fill-rose-200 text-center"
                          textAnchor="middle"
                        >
                          a = {rectA} egység
                        </text>
                        <text
                          x={startX + w + 12}
                          y={startY + h / 2 + 4}
                          className="text-[11px] font-black fill-rose-900 dark:fill-rose-200"
                        >
                          b = {rectB}
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Élő K és T kijelző sáv */}
              <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Kerület (K)</span>
                  <span className="text-sm font-black font-mono text-rose-700 dark:text-rose-300">
                    2 · ({rectA} + {rectB}) = {2 * (rectA + rectB)} egység
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-950/40">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Terület (T)</span>
                  <span className="text-sm font-black font-mono text-pink-700 dark:text-pink-300">
                    {rectA} · {rectB} = {rectA * rectB} területegység
                  </span>
                </div>
              </div>
            </div>

            {/* Jobb oldal: Kezelőszervek */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Méretezés és beállítások
                </h4>

                {/* a oldal csúszka */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-400">a oldal (szélesség):</span>
                    <span className="font-bold font-mono text-rose-600">{rectA} egység</span>
                  </div>
                  <Slider
                    value={[rectA]}
                    min={2}
                    max={8}
                    step={1}
                    onValueChange={(vals) => setRectA(vals[0])}
                    className="py-1"
                  />
                </div>

                {/* b oldal csúszka */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-400">b oldal (magasság):</span>
                    <span className="font-bold font-mono text-rose-600">{rectB} egység</span>
                  </div>
                  <Slider
                    value={[rectB]}
                    min={2}
                    max={6}
                    step={1}
                    onValueChange={(vals) => setRectB(vals[0])}
                    className="py-1"
                  />
                </div>

                {/* Kapcsolók */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 dark:text-slate-300">Átlók mutatása:</span>
                    <Button
                      size="sm"
                      variant={showRectDiagonals ? 'default' : 'outline'}
                      className={cn("h-7 text-xs", showRectDiagonals && "bg-indigo-600 hover:bg-indigo-700 text-white")}
                      onClick={() => setShowRectDiagonals(!showRectDiagonals)}
                    >
                      {showRectDiagonals ? 'Bekapcsolva' : 'Kikapcsolva'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 dark:text-slate-300">Tükörtengelyek (2 db):</span>
                    <Button
                      size="sm"
                      variant={showRectAxes ? 'default' : 'outline'}
                      className={cn("h-7 text-xs", showRectAxes && "bg-sky-600 hover:bg-sky-700 text-white")}
                      onClick={() => setShowRectAxes(!showRectAxes)}
                    >
                      {showRectAxes ? 'Bekapcsolva' : 'Kikapcsolva'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 dark:text-slate-300">Négyzetrács számlálása:</span>
                    <Button
                      size="sm"
                      variant={showRectGrid ? 'default' : 'outline'}
                      className={cn("h-7 text-xs", showRectGrid && "bg-rose-600 hover:bg-rose-700 text-white")}
                      onClick={() => setShowRectGrid(!showRectGrid)}
                    >
                      {showRectGrid ? 'Bekapcsolva' : 'Kikapcsolva'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                <strong>Megfigyelés:</strong> Ha az <MathText>a</MathText> és <MathText>b</MathText> csúszkát azonos értékre állítod (pl. <MathText>a = 4</MathText>, <MathText>b = 4</MathText>), a téglalap azonnal <strong>négyzettel egybeesik</strong>!
              </div>
            </div>
          </div>
        )}

        {/* 2. FÜL: NÉGYZET SZIMULÁTOR */}
        {activeTab === 'square' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Bal oldal: Interaktív SVG négyzettel */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-4 border border-rose-200 dark:border-rose-900 flex flex-col items-center justify-between shadow-inner min-h-[280px]">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-600 inline-block" />
                  Minden oldal egyenlő: a = {sqA} egység
                </span>
                <Badge variant="secondary" className="font-mono text-xs bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300">
                  Szabályos négyszög
                </Badge>
              </div>

              {/* Dinamikus SVG négyzet */}
              <div className="my-auto py-3">
                <svg className="w-64 h-48 sm:w-80 sm:h-52 mx-auto drop-shadow-md" viewBox="0 0 240 170" fill="none">
                  <defs>
                    <pattern id="quads-grid-sq" width="20" height="20" patternUnits="userSpaceOnUse">
                      <line x1="0" y1="0" x2="20" y2="0" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="0" y1="0" x2="0" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="240" height="170" fill="url(#quads-grid-sq)" rx="8" />

                  {(() => {
                    const unit = 24;
                    const size = sqA * unit;
                    const startX = (240 - size) / 2;
                    const startY = (170 - size) / 2;

                    return (
                      <g>
                        {/* Egységnégyzetek */}
                        {showSqGrid &&
                          Array.from({ length: sqA }).map((_, c) =>
                            Array.from({ length: sqA }).map((_, r) => (
                              <rect
                                key={`sq-${c}-${r}`}
                                x={startX + c * unit}
                                y={startY + r * unit}
                                width={unit}
                                height={unit}
                                fill="#fce7f3"
                                stroke="#db2777"
                                strokeWidth="0.8"
                                opacity="0.65"
                              />
                            ))
                          )}

                        {/* Fő négyzet */}
                        <rect
                          x={startX}
                          y={startY}
                          width={size}
                          height={size}
                          fill={showSqGrid ? 'none' : '#fce7f3'}
                          stroke="#db2777"
                          strokeWidth="2.5"
                          rx="1"
                        />

                        {/* Merőleges átlók */}
                        {showSqDiagonals && (
                          <g>
                            <line x1={startX} y1={startY + size} x2={startX + size} y2={startY} stroke="#9333ea" strokeWidth="1.8" />
                            <line x1={startX} y1={startY} x2={startX + size} y2={startY + size} stroke="#9333ea" strokeWidth="1.8" />
                            <circle cx={startX + size / 2} cy={startY + size / 2} r="3" fill="#6b21a8" />
                            {/* Derékszög a metszéspontnál (negyedkörív + pont a felső háromszögben a két átló között) */}
                            <path
                              d={`M ${startX + size / 2 + 5.7} ${startY + size / 2 - 5.7} A 8 8 0 0 0 ${startX + size / 2 - 5.7} ${startY + size / 2 - 5.7}`}
                              fill="none"
                              stroke="#6b21a8"
                              strokeWidth="1.2"
                            />
                            <circle cx={startX + size / 2} cy={startY + size / 2 - 5} r="0.8" fill="#6b21a8" />
                          </g>
                        )}

                        {/* 4 szimmetriatengely */}
                        {showSqAxes && (
                          <g>
                            {/* 2 Oldalfelező (kék) */}
                            <line
                              x1={startX + size / 2}
                              y1={startY - 15}
                              x2={startX + size / 2}
                              y2={startY + size + 15}
                              stroke="#0284c7"
                              strokeWidth="1.8"
                              strokeDasharray="4 2"
                            />
                            <line
                              x1={startX - 15}
                              y1={startY + size / 2}
                              x2={startX + size + 15}
                              y2={startY + size / 2}
                              stroke="#0284c7"
                              strokeWidth="1.8"
                              strokeDasharray="4 2"
                            />
                            {/* 2 Átlós tengely (piros) */}
                            <line
                              x1={startX - 10}
                              y1={startY + size + 10}
                              x2={startX + size + 10}
                              y2={startY - 10}
                              stroke="#dc2626"
                              strokeWidth="1.8"
                              strokeDasharray="4 2"
                            />
                            <line
                              x1={startX - 10}
                              y1={startY - 10}
                              x2={startX + size + 10}
                              y2={startY + size + 10}
                              stroke="#dc2626"
                              strokeWidth="1.8"
                              strokeDasharray="4 2"
                            />
                          </g>
                        )}

                        {/* Oldalhossz felirat */}
                        <text
                          x={startX + size / 2}
                          y={startY + size + 16}
                          className="text-[11px] font-black fill-pink-900 dark:fill-pink-200"
                          textAnchor="middle"
                        >
                          a = {sqA} egység
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Élő K és T kijelző sáv */}
              <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-950/40">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Kerület (K)</span>
                  <span className="text-sm font-black font-mono text-pink-700 dark:text-pink-300">
                    4 · {sqA} = {4 * sqA} egység
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Terület (T)</span>
                  <span className="text-sm font-black font-mono text-purple-700 dark:text-purple-300">
                    {sqA}² = {sqA * sqA} területegység
                  </span>
                </div>
              </div>
            </div>

            {/* Jobb oldal: Kezelőszervek */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Négyzet beállításai
                </h4>

                {/* a oldal csúszka */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-400">a oldalhossz:</span>
                    <span className="font-bold font-mono text-pink-600">{sqA} egység</span>
                  </div>
                  <Slider
                    value={[sqA]}
                    min={2}
                    max={6}
                    step={1}
                    onValueChange={(vals) => setSqA(vals[0])}
                    className="py-1"
                  />
                </div>

                {/* Kapcsolók */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 dark:text-slate-300">Merőleges átlók (90°):</span>
                    <Button
                      size="sm"
                      variant={showSqDiagonals ? 'default' : 'outline'}
                      className={cn("h-7 text-xs", showSqDiagonals && "bg-purple-600 hover:bg-purple-700 text-white")}
                      onClick={() => setShowSqDiagonals(!showSqDiagonals)}
                    >
                      {showSqDiagonals ? 'Bekapcsolva' : 'Kikapcsolva'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 dark:text-slate-300">Mind a 4 szimmetriatengely:</span>
                    <Button
                      size="sm"
                      variant={showSqAxes ? 'default' : 'outline'}
                      className={cn("h-7 text-xs", showSqAxes && "bg-sky-600 hover:bg-sky-700 text-white")}
                      onClick={() => setShowSqAxes(!showSqAxes)}
                    >
                      {showSqAxes ? 'Bekapcsolva' : 'Kikapcsolva'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-700 dark:text-slate-300">Négyzetrács számlálása:</span>
                    <Button
                      size="sm"
                      variant={showSqGrid ? 'default' : 'outline'}
                      className={cn("h-7 text-xs", showSqGrid && "bg-pink-600 hover:bg-pink-700 text-white")}
                      onClick={() => setShowSqGrid(!showSqGrid)}
                    >
                      {showSqGrid ? 'Bekapcsolva' : 'Kikapcsolva'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                <strong>Szuper szimmetria:</strong> A négyzet átlói nemcsak merőlegesek egymásra, hanem egyben tükörtengelyek is! Ezért van a négyzetnek 2 helyett <strong>4 szimmetriatengelye</strong>.
              </div>
            </div>
          </div>
        )}

        {/* 3. FÜL: ÖSSZEHASONLÍTÓ KVÍZ / VIZSGÁLÓ */}
        {activeTab === 'compare' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'sides', label: 'Oldalak viszonya' },
                { id: 'angles', label: 'Belső szögek' },
                { id: 'diagonals', label: 'Átlók tulajdonságai' },
                { id: 'axes', label: 'Szimmetriatengelyek' },
                { id: 'formulas', label: 'Kerület & Terület' }
              ].map(item => (
                <Button
                  key={item.id}
                  size="sm"
                  variant={selectedProperty === item.id ? 'default' : 'outline'}
                  className={cn(
                    "text-xs font-bold",
                    selectedProperty === item.id && "bg-rose-600 text-white"
                  )}
                  onClick={() => setSelectedProperty(item.id)}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Téglalap oszlop */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-rose-300 dark:border-rose-900 space-y-2">
                <div className="flex items-center gap-2">
                  <RectangleHorizontal className="w-4 h-4 text-rose-600" />
                  <h3 className="font-black text-sm text-rose-900 dark:text-rose-200">Téglalap</h3>
                </div>

                {selectedProperty === 'sides' && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Szemközti oldalai párhuzamosak és <strong>páronként egyenlő hosszúak</strong> (a és b).
                    Általában nem egyenlő minden oldala.
                  </p>
                )}

                {selectedProperty === 'angles' && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Mind a 4 belső szöge <strong>pontosan 90°-os derékszög</strong>.
                    Összegük: <MathText>4 \cdot 90^\circ = 360^\circ</MathText>.
                  </p>
                )}

                {selectedProperty === 'diagonals' && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    2 átlója van, amelyek <strong>egyenlő hosszúak</strong> és <strong>felezik egymást</strong>.
                    Viszont <strong>NEM merőlegesek</strong> egymásra és nem felezik a szögeket!
                  </p>
                )}

                {selectedProperty === 'axes' && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Pontosan 2 szimmetriatengelye van</strong>: a szemközti oldalfelező merőlegesek.
                    Az átlói nem tükörtengelyek!
                  </p>
                )}

                {selectedProperty === 'formulas' && (
                  <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <div><strong>Kerület:</strong> <MathText>K = 2 \cdot (a + b)</MathText></div>
                    <div><strong>Terület:</strong> <MathText>T = a \cdot b</MathText></div>
                  </div>
                )}
              </div>

              {/* Négyzet oszlop */}
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border-2 border-pink-300 dark:border-pink-900 space-y-2">
                <div className="flex items-center gap-2">
                  <Square className="w-4 h-4 text-pink-600" />
                  <h3 className="font-black text-sm text-pink-900 dark:text-pink-200">Négyzet</h3>
                </div>

                {selectedProperty === 'sides' && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>MINDEN oldala egyenlő hosszú</strong> (<MathText>a = b = c = d</MathText>).
                    Szemközti oldalai párhuzamosak, szomszédos oldalai merőlegesek.
                  </p>
                )}

                {selectedProperty === 'angles' && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    Mind a 4 belső szöge <strong>derékszög (90°)</strong>.
                    Összegük: <MathText>360^\circ</MathText>.
                  </p>
                )}

                {selectedProperty === 'diagonals' && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    2 átlója van: egyenlő hosszúak, felezik egymást, <strong>MERŐLEGESEK egymásra</strong> (90°), és <strong>felezik a belső szögeket</strong> (45°).
                  </p>
                )}

                {selectedProperty === 'axes' && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Pontosan 4 szimmetriatengelye van</strong>: a 2 oldalfelező merőleges + a 2 átlója!
                  </p>
                )}

                {selectedProperty === 'formulas' && (
                  <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    <div><strong>Kerület:</strong> <MathText>K = 4 \cdot a</MathText></div>
                    <div><strong>Terület:</strong> <MathText>T = a \cdot a = a^2</MathText></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 5. SZEKCIÓ: GYAKORI HIBÁK ÉS TÉVHITEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-quads-traps"
        number={5}
        title="Gyakori hibák és tévhitek a téglalapnál és négyzetnél"
        badge="Csapdák"
        badgeColor="rose"
      >
        <TheoryTrapBox
          traps={[
            {
              title: '1. Csapda: „A téglalap átlója tükörtengely”',
              wrong: 'Azt hinni, hogy ha a téglalapot az átlója mentén hajtjuk félbe, a két fél lefedi egymást.',
              correct: 'A téglalapnak CSAK 2 szimmetriatengelye van: az oldalfelező merőlegesek! Az átló mentén hajtva a csúcsok kilógnak. Az átló CSAK A NÉGYZETNÉL szimmetriatengely.',
              explanation: 'Próbáld ki egy A4-es füzetlappal: hajtsd félbe az átlója mentén, és látni fogod, hogy a sarkok elcsúsznak!'
            },
            {
              title: '2. Csapda: „A négyzet nem téglalap, mert az egy másik alakzat”',
              wrong: 'A négyzetet és a téglalapokat két teljesen különálló síkidomként kezelni.',
              correct: 'A négyzet SPECIÁLIS téglalap! Minden olyan tulajdonsággal rendelkezik, mint a téglalap (minden szöge 90°), plusz még az oldalai is egyenlők.',
              explanation: 'Minden négyzet téglalap, de nem minden téglalap négyzet.'
            },
            {
              title: '3. Csapda: A kerület és a terület mértékegységeinek összekeverése',
              wrong: 'A kerületre cm²-t, vagy a területre sima cm-t írni.',
              correct: 'A kerület egy VÁSÁROLT KERÍTÉS (hosszúság): mm, cm, dm, m. A terület pedig LEBURKOLT FELÜLET (síkmérték): mm², cm², dm², m².',
              explanation: 'Mindig ellenőrizd: felületnél ott van-e a négyzetes kettes kitevő (²).'
            },
            {
              title: '4. Csapda: Képletek felcserélése',
              wrong: 'Összekeverni a kerület és terület képletét: pl. K = a · b vagy T = 2 · (a + b).',
              correct: 'A kerület az oldalak összege: K = 2 · (a + b) (vagy négyzetnél 4 · a). A terület a szorzat: T = a · b (vagy négyzetnél a²).',
              explanation: 'A kerületnél összeadunk (körbejárjuk), a területnél szorzunk (négyzethálót töltünk meg).'
            },
            {
              title: '5. Csapda: Különböző mértékegységű oldalak közvetlen beszorzása',
              wrong: 'Például a = 4 dm és b = 5 cm esetén kiszámolni: 4 · 5 = 20.',
              correct: 'Mielőtt számolnál, MINDIG váltsd az oldalakat azonos mértékegységre! 4 dm = 40 cm, így T = 40 · 5 = 200 cm².',
              explanation: 'Eltérő mértékegységeket soha nem szabad közvetlenül összeszorozni vagy összeadni.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default QuadsTheory;
