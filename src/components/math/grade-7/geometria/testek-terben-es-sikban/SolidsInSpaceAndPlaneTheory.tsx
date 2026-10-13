import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  GeometryFigureGrid,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Box,
  Maximize2,
  Layers,
  Eye,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  Target,
  Sparkles,
  Calculator,
  Ruler,
  HelpCircle,
  Shapes,
  Grid
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface SolidsInSpaceAndPlaneTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type SolidType = 'cube' | 'cuboid' | 'pyramid' | 'tri_prism';
type LabViewMode = '3d' | 'net' | 'views';

export const SolidsInSpaceAndPlaneTheory: React.FC<SolidsInSpaceAndPlaneTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [solidType, setSolidType] = useState<SolidType>('cube');
  const [labView, setLabView] = useState<LabViewMode>('3d');

  // Quiz state
  const [quiz1Answer, setQuiz1Answer] = useState<number | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<number | null>(null);
  const [quiz3Answer, setQuiz3Answer] = useState<number | null>(null);

  return (
    <TheoryTemplate
      title="10. Testek térben és síkban"
      subtitle="Testhálók kiterítése, merőleges vetületek (elöl-, felül-, oldalnézet) és az Euler-féle poliédertétel"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 📖 10. LECKE"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'C + L = E + 2 \\quad • \\quad E_{\\text{hasáb}} = 3n \\quad • \\quad E_{\\text{gúla}} = 2n \\quad • \\quad \\text{Kockaháló: 11-féle}'
      }}
      topicId="g7-geom-solids-space-plane"
      chapterId="geometria"
      grade={7}
      themeColor="orange"
      estimatedReadTime="14 perc"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* FONTOS SZABÁLYOK KIEMELT ÁTTEKINTÉSE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border-2 border-orange-300 dark:border-orange-700/80 shadow-xs mb-6">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="px-2.5 py-0.5 rounded-md bg-orange-600 text-white text-[11px] font-black uppercase tracking-wider">
            Fontos szabályok & alaptételek
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3 bg-white/95 dark:bg-slate-900/95 rounded-xl border border-orange-200 dark:border-slate-700 shadow-2xs">
            <div className="text-xs font-bold text-orange-950 dark:text-orange-200">Euler-féle poliédertétel</div>
            <div className="text-sm font-black font-mono text-orange-600 dark:text-orange-400 mt-1">
              <MathText>C + L = E + 2</MathText>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">
              Csúcsok (C) + Lapok (L) = Élek (E) + 2 minden konvex poliéderre.
            </p>
          </div>
          <div className="p-3 bg-white/95 dark:bg-slate-900/95 rounded-xl border border-orange-200 dark:border-slate-700 shadow-2xs">
            <div className="text-xs font-bold text-amber-950 dark:text-amber-200">Élszámok kiszámítása</div>
            <div className="text-sm font-black font-mono text-amber-600 dark:text-amber-400 mt-1">
              <MathText>E_h = 3n \quad • \quad E_g = 2n</MathText>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">
              <MathText>n</MathText>-oldalú alapnál hasábra <MathText>3n</MathText> él, gúlára <MathText>2n</MathText> él jut.
            </p>
          </div>
          <div className="p-3 bg-white/95 dark:bg-slate-900/95 rounded-xl border border-orange-200 dark:border-slate-700 shadow-2xs">
            <div className="text-xs font-bold text-emerald-950 dark:text-emerald-200">Testhálók & Vetületek</div>
            <div className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400 mt-1">
              Kocka: 11 háló • 3 nézet
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">
              Szemközti lapok nem szomszédosak. 3 nézet: elöl (fő), felül (alaprajz), oldal (bal).
            </p>
          </div>
        </div>
      </div>

      {/* 1. SZAKASZ: Mi a testháló? */}
      <TheorySection
        title="1. Mi a testháló? (Kiterítés és összehajtogatás)"
        subtitle="Hogyan ábrázoljuk a 3D geometriai testek határoló felületét a síkban?"
        icon={<Layers className="w-5 h-5 text-orange-500" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <TheoryCard
            title="A testháló fogalma"
            icon={<Shapes className="w-4 h-4 text-orange-600" />}
            variant="accent"
          >
            <p className="text-slate-700 dark:text-slate-300">
              A <strong>testháló</strong> egy olyan összefüggő síkidom, amelyet a test határoló lapjai alkotnak, és
              az élek mentén összehajtogatva hézagmentesen, átfedés nélkül visszaadja az eredeti térbeli testet.
            </p>
            <div className="mt-2 text-xs font-semibold text-orange-700 dark:text-orange-300">
              Minden belső él mentén pontosan két lap találkozik.
            </div>
          </TheoryCard>

          <TheoryCard
            title="A kocka 11 hálója"
            icon={<Box className="w-4 h-4 text-amber-600" />}
          >
            <p className="text-slate-700 dark:text-slate-300">
              Egy kocka hat egybevágó négyzetlapból áll. Bár rengeteg 6 négyzetből álló alakzat rajzolható fel,
              ezek közül <strong>pontosan 11 különböző alakzatból</strong> hajtogatható össze valódi kocka.
            </p>
            <div className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300">
              Tipikus formák: T-alak, kereszt, Z-alak, lépcsős alak.
            </div>
          </TheoryCard>

          <TheoryCard
            title="Szemközti lapok a hálóban"
            icon={<Target className="w-4 h-4 text-emerald-600" />}
          >
            <p className="text-slate-700 dark:text-slate-300">
              A kocka vagy téglatest összehajtásakor a <strong>szemközti párhuzamos lapok</strong> a hálóban sohasem lehetnek
              közvetlenül szomszédosak; köztük mindig legalább egy lapnak kell elhelyezkednie.
            </p>
            <div className="mt-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              3 lap-pár van: Alap-Fedőlap, Elülső-Hátulsó, Bal-Jobb.
            </div>
          </TheoryCard>
        </div>

        {/* Összehasonlító geometriai ábrák */}
        <GeometryFigureGrid columns={3}>
          <GeometryFigureCard
            title="Kocka klasszikus kereszt hálója"
            badge="11 HÁLÓ EGYIKE"
            badgeColor="amber"
            formula="6 egybevágó négyzetlap"
            figure={
              <svg viewBox="0 0 160 120" className="w-full h-32 overflow-visible">
                {/* Cross Net of Cube */}
                {/* 4 squares vertical: row 0 to 3 */}
                {/* Top square */}
                <rect x="65" y="10" width="26" height="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" rx="1" />
                <text x="78" y="27" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">1</text>

                {/* Left wing */}
                <rect x="39" y="36" width="26" height="26" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="1" />
                <text x="52" y="53" textAnchor="middle" className="text-[9px] font-bold fill-blue-900">B</text>

                {/* Middle central square */}
                <rect x="65" y="36" width="26" height="26" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" rx="1" />
                <text x="78" y="53" textAnchor="middle" className="text-[9px] font-bold fill-emerald-900">K</text>

                {/* Right wing */}
                <rect x="91" y="36" width="26" height="26" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" rx="1" />
                <text x="104" y="53" textAnchor="middle" className="text-[9px] font-bold fill-blue-900">J</text>

                {/* Bottom 1 square */}
                <rect x="65" y="62" width="26" height="26" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" rx="1" />
                <text x="78" y="79" textAnchor="middle" className="text-[9px] font-bold fill-amber-900">2</text>

                {/* Bottom 2 square */}
                <rect x="65" y="88" width="26" height="26" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" rx="1" />
                <text x="78" y="105" textAnchor="middle" className="text-[9px] font-bold fill-purple-900">3</text>

                {/* Annotation arrow/legend */}
                <text x="135" y="48" textAnchor="middle" className="text-[7.5px] font-bold fill-slate-600">Összehajtva</text>
                <text x="135" y="59" textAnchor="middle" className="text-[7.5px] font-black fill-emerald-700">KOCKA</text>
              </svg>
            }
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A leggyakoribb kereszt háló: a kék lapok a bal és jobb oldalfalak, a sárga és lila lapok egymással szemközt záródnak.
            </p>
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Négyzetes gúla (piramis) hálója"
            badge="GÚLA HÁLÓ"
            badgeColor="orange"
            formula="1 négyzet + 4 háromszög"
            figure={
              <svg viewBox="0 0 160 120" className="w-full h-32 overflow-visible">
                {/* Pyramid Net: Center square + 4 isosceles triangles */}
                {/* Central Base Square */}
                <rect x="60" y="40" width="40" height="40" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" rx="1" />
                <text x="80" y="64" textAnchor="middle" className="text-[10px] font-black fill-orange-900">Alap</text>

                {/* Top triangle */}
                <polygon points="60,40 100,40 80,8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Bottom triangle */}
                <polygon points="60,80 100,80 80,112" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Left triangle */}
                <polygon points="60,40 60,80 28,60" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Right triangle */}
                <polygon points="100,40 100,80 132,60" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" strokeLinejoin="round" />

                <circle cx="80" cy="8" r="2" fill="#ea580c" />
                <text x="80" y="5" textAnchor="middle" className="text-[6.5px] font-bold fill-slate-700">Csúcs</text>
              </svg>
            }
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A négyzet alakú alapról felhajtva a négy háromszög egyetlen közös csúcsban találkozik.
            </p>
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Háromoldalú hasáb hálója"
            badge="HASÁB HÁLÓ"
            badgeColor="indigo"
            formula="2 háromszög + 3 téglalap"
            figure={
              <svg viewBox="0 0 160 120" className="w-full h-32 overflow-visible">
                {/* Triangular prism net */}
                {/* 3 side rectangles side by side */}
                <rect x="25" y="45" width="35" height="40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
                <rect x="60" y="45" width="45" height="40" fill="#ede9fe" stroke="#4f46e5" strokeWidth="1.5" />
                <rect x="105" y="45" width="35" height="40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />

                {/* Top triangle attached to middle rect */}
                <polygon points="60,45 105,45 82,15" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
                <text x="82.5" y="38" textAnchor="middle" className="text-[8px] font-bold fill-amber-900">Alap</text>

                {/* Bottom triangle attached to middle rect */}
                <polygon points="60,85 105,85 82,115" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
                <text x="82.5" y="100" textAnchor="middle" className="text-[8px] font-bold fill-amber-900">Fedőlap</text>

                <text x="82.5" y="68" textAnchor="middle" className="text-[9px] font-bold fill-indigo-900">Palást</text>
              </svg>
            }
          >
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A palást kiterítve egy összefüggő téglalap, melyhez alul és felül egy-egy egybevágó háromszög alap kapcsolódik.
            </p>
          </GeometryFigureCard>
        </GeometryFigureGrid>
      </TheorySection>

      {/* 2. SZAKASZ: Interaktív 3D Test és Nézet Laboratórium */}
      <TheorySection
        title="2. Interaktív Test, Háló és Vetület Laboratórium"
        subtitle="Válts a 3D modell, a kiterített háló és a háromkép-rendszer (nézetek) között!"
        icon={<Eye className="w-5 h-5 text-orange-500" />}
      >
        <div className="bg-gradient-to-br from-orange-50/70 via-white to-amber-50/70 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-orange-200 dark:border-orange-800/60 rounded-3xl p-5 sm:p-6 shadow-sm">
          {/* Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-orange-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Geometriai test:</span>
              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setSolidType('cube')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    solidType === 'cube' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Kocka
                </button>
                <button
                  type="button"
                  onClick={() => setSolidType('cuboid')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    solidType === 'cuboid' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Téglatest
                </button>
                <button
                  type="button"
                  onClick={() => setSolidType('pyramid')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    solidType === 'pyramid' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Négyzetes gúla
                </button>
                <button
                  type="button"
                  onClick={() => setSolidType('tri_prism')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    solidType === 'tri_prism' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Háromoldalú hasáb
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Ábrázolási mód:</span>
              <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setLabView('3d')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    labView === '3d' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  3D Térbeli Test
                </button>
                <button
                  type="button"
                  onClick={() => setLabView('net')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    labView === 'net' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Kiterített Háló
                </button>
                <button
                  type="button"
                  onClick={() => setLabView('views')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    labView === 'views' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  3 Nézet (Vetület)
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Screen */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mt-5">
            {/* Visual Viewport */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 rounded-2xl border border-orange-100 dark:border-slate-800 shadow-inner min-h-[260px]">
              {labView === '3d' && (
                <svg viewBox="0 0 240 180" className="w-full max-w-[260px] h-auto drop-shadow-md">
                  {solidType === 'cube' && (
                    <>
                      {/* Hidden back lines */}
                      <line x1="60" y1="45" x2="140" y2="45" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="60" y1="45" x2="60" y2="125" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="60" y1="45" x2="30" y2="75" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      {/* Bottom face */}
                      <polygon points="30,155 110,155 140,125 60,125" fill="#fed7aa" fillOpacity="0.4" stroke="#ea580c" strokeWidth="1.5" />
                      {/* Top face */}
                      <polygon points="30,75 110,75 140,45 60,45" fill="#fde68a" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
                      {/* Front face */}
                      <polygon points="30,75 110,75 110,155 30,155" fill="#fef3c7" fillOpacity="0.5" stroke="#ea580c" strokeWidth="2" strokeLinejoin="round" />
                      {/* Right face */}
                      <polygon points="110,75 140,45 140,125 110,155" fill="#ffedd5" fillOpacity="0.7" stroke="#c2410c" strokeWidth="2" strokeLinejoin="round" />
                      <text x="70" y="120" textAnchor="middle" className="text-[11px] font-black fill-orange-950">KOCKA (3D)</text>
                    </>
                  )}

                  {solidType === 'cuboid' && (
                    <>
                      {/* Cuboid 3D */}
                      <line x1="60" y1="40" x2="170" y2="40" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="60" y1="40" x2="60" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="60" y1="40" x2="25" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <polygon points="25,160 135,160 170,130 60,130" fill="#fed7aa" fillOpacity="0.4" stroke="#ea580c" strokeWidth="1.5" />
                      <polygon points="25,70 135,70 170,40 60,40" fill="#fde68a" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
                      <polygon points="25,70 135,70 135,160 25,160" fill="#fef3c7" fillOpacity="0.5" stroke="#ea580c" strokeWidth="2" strokeLinejoin="round" />
                      <polygon points="135,70 170,40 170,130 135,160" fill="#ffedd5" fillOpacity="0.7" stroke="#c2410c" strokeWidth="2" strokeLinejoin="round" />
                      <text x="80" y="120" textAnchor="middle" className="text-[11px] font-black fill-orange-950">TÉGLATEST (3D)</text>
                    </>
                  )}

                  {solidType === 'pyramid' && (
                    <>
                      {/* Square Pyramid 3D */}
                      <line x1="60" y1="120" x2="150" y2="120" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="60" y1="120" x2="30" y2="150" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="60" y1="120" x2="105" y2="25" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

                      {/* Bottom base */}
                      <polygon points="30,150 120,150 150,120 60,120" fill="#fed7aa" fillOpacity="0.3" stroke="#ea580c" strokeWidth="1.5" />

                      {/* Front triangles */}
                      <polygon points="30,150 120,150 105,25" fill="#fde68a" fillOpacity="0.7" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
                      <polygon points="120,150 150,120 105,25" fill="#fef08a" fillOpacity="0.5" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
                      <circle cx="105" cy="25" r="2.5" fill="#c2410c" />
                      <text x="80" y="140" textAnchor="middle" className="text-[10px] font-black fill-amber-950">NÉGYZETES GÚLA</text>
                    </>
                  )}

                  {solidType === 'tri_prism' && (
                    <>
                      {/* Triangular Prism 3D */}
                      <line x1="65" y1="35" x2="65" y2="115" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                      <polygon points="30,150 160,150 65,115" fill="#e0e7ff" fillOpacity="0.3" stroke="#4f46e5" strokeWidth="1.5" />
                      <polygon points="30,70 160,70 65,35" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" />
                      <polygon points="30,70 160,70 160,150 30,150" fill="#ede9fe" fillOpacity="0.5" stroke="#4338ca" strokeWidth="2" strokeLinejoin="round" />
                      <text x="95" y="115" textAnchor="middle" className="text-[10px] font-black fill-indigo-950">HÁROMOLDALÚ HASÁB</text>
                    </>
                  )}
                </svg>
              )}

              {labView === 'net' && (
                <svg viewBox="0 0 240 180" className="w-full max-w-[260px] h-auto drop-shadow-md">
                  {solidType === 'cube' && (
                    <>
                      {/* Cube Net */}
                      <rect x="95" y="15" width="30" height="30" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                      <rect x="65" y="45" width="30" height="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                      <rect x="95" y="45" width="30" height="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
                      <rect x="125" y="45" width="30" height="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                      <rect x="95" y="75" width="30" height="30" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                      <rect x="95" y="105" width="30" height="30" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
                      <text x="120" y="155" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">6 összefüggő négyzet</text>
                    </>
                  )}

                  {solidType === 'cuboid' && (
                    <>
                      {/* Cuboid Net */}
                      <rect x="90" y="15" width="45" height="30" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                      <rect x="50" y="45" width="40" height="40" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                      <rect x="90" y="45" width="45" height="40" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
                      <rect x="135" y="45" width="40" height="40" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                      <rect x="90" y="85" width="45" height="30" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                      <rect x="90" y="115" width="45" height="40" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
                      <text x="120" y="170" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">Páronként egybevágó lapok</text>
                    </>
                  )}

                  {solidType === 'pyramid' && (
                    <>
                      {/* Pyramid Net */}
                      <rect x="90" y="60" width="40" height="40" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
                      <polygon points="90,60 130,60 110,20" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                      <polygon points="90,100 130,100 110,140" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                      <polygon points="90,60 90,100 50,80" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                      <polygon points="130,60 130,100 170,80" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                      <text x="110" y="165" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">1 négyzet + 4 háromszög</text>
                    </>
                  )}

                  {solidType === 'tri_prism' && (
                    <>
                      {/* Triangular Prism Net */}
                      <rect x="40" y="60" width="35" height="45" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
                      <rect x="75" y="60" width="55" height="45" fill="#ede9fe" stroke="#4f46e5" strokeWidth="1.5" />
                      <rect x="130" y="60" width="35" height="45" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
                      <polygon points="75,60 130,60 102.5,25" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                      <polygon points="75,105 130,105 102.5,140" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                      <text x="102" y="165" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">2 háromszög alap + 3 palástlap</text>
                    </>
                  )}
                </svg>
              )}

              {labView === 'views' && (
                <svg viewBox="0 0 240 180" className="w-full max-w-[260px] h-auto drop-shadow-md">
                  {/* Three-view Orthographic Projection Box */}
                  {/* Grid lines for view plane separation */}
                  <line x1="120" y1="10" x2="120" y2="170" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="10" y1="90" x2="230" y2="90" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Top-Left: ELÖLNÉZET (Front View) */}
                  <text x="65" y="22" textAnchor="middle" className="text-[9px] font-black fill-orange-700">ELÖLNÉZET</text>
                  {solidType === 'cube' && <rect x="40" y="30" width="50" height="50" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />}
                  {solidType === 'cuboid' && <rect x="35" y="35" width="60" height="45" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />}
                  {solidType === 'pyramid' && <polygon points="35,80 95,80 65,30" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />}
                  {solidType === 'tri_prism' && <rect x="35" y="35" width="60" height="45" fill="#ede9fe" stroke="#4f46e5" strokeWidth="2" />}

                  {/* Top-Right: OLDALNÉZET (Side View / Profile) */}
                  <text x="175" y="22" textAnchor="middle" className="text-[9px] font-black fill-blue-700">OLDALNÉZET</text>
                  {solidType === 'cube' && <rect x="150" y="30" width="50" height="50" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />}
                  {solidType === 'cuboid' && <rect x="155" y="35" width="40" height="45" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />}
                  {solidType === 'pyramid' && <polygon points="145,80 205,80 175,30" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />}
                  {solidType === 'tri_prism' && <polygon points="145,80 205,80 175,35" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2" />}

                  {/* Bottom-Left: FELÜLNÉZET (Top View / Plan) */}
                  <text x="65" y="105" textAnchor="middle" className="text-[9px] font-black fill-emerald-700">FELÜLNÉZET</text>
                  {solidType === 'cube' && <rect x="40" y="112" width="50" height="50" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />}
                  {solidType === 'cuboid' && <rect x="35" y="117" width="60" height="40" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />}
                  {solidType === 'pyramid' && (
                    <>
                      <rect x="40" y="115" width="50" height="50" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
                      <line x1="40" y1="115" x2="90" y2="165" stroke="#16a34a" strokeWidth="1.5" />
                      <line x1="90" y1="115" x2="40" y2="165" stroke="#16a34a" strokeWidth="1.5" />
                    </>
                  )}
                  {solidType === 'tri_prism' && <rect x="35" y="117" width="60" height="45" fill="#ede9fe" stroke="#4f46e5" strokeWidth="2" />}

                  {/* Bottom-Right: Label info */}
                  <text x="175" y="135" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">Három merőleges</text>
                  <text x="175" y="148" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">képsík vetülete</text>
                </svg>
              )}

              <div className="text-[11px] text-slate-500 font-medium mt-1">
                {labView === '3d' && 'Axonometrikus térbeli testmodell'}
                {labView === 'net' && 'Kiterített síkbeli testhálózat'}
                {labView === 'views' && 'Háromkép-rendszer: Elölről, oldalról és felülről nézve'}
              </div>
            </div>

            {/* Properties Panel & Euler Data */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 bg-orange-50/90 dark:bg-slate-800/80 rounded-2xl border border-orange-200 dark:border-orange-800 space-y-3">
                <h4 className="font-bold text-sm text-orange-950 dark:text-orange-200 flex items-center justify-between">
                  <span>Poliéder adatok:</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-200 dark:bg-orange-900 text-orange-800 dark:text-orange-200 font-bold uppercase">
                    {solidType === 'cube' && 'Kocka'}
                    {solidType === 'cuboid' && 'Téglatest'}
                    {solidType === 'pyramid' && 'Négyzetes gúla'}
                    {solidType === 'tri_prism' && 'Háromoldalú hasáb'}
                  </span>
                </h4>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-700">
                    <span className="block text-slate-500 text-[10px]">Csúcsok (C)</span>
                    <span className="text-base font-black text-orange-600">
                      {solidType === 'cube' && 8}
                      {solidType === 'cuboid' && 8}
                      {solidType === 'pyramid' && 5}
                      {solidType === 'tri_prism' && 6}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-700">
                    <span className="block text-slate-500 text-[10px]">Lapok (L)</span>
                    <span className="text-base font-black text-amber-600">
                      {solidType === 'cube' && 6}
                      {solidType === 'cuboid' && 6}
                      {solidType === 'pyramid' && 5}
                      {solidType === 'tri_prism' && 5}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-orange-100 dark:border-slate-700">
                    <span className="block text-slate-500 text-[10px]">Élek (E)</span>
                    <span className="text-base font-black text-emerald-600">
                      {solidType === 'cube' && 12}
                      {solidType === 'cuboid' && 12}
                      {solidType === 'pyramid' && 8}
                      {solidType === 'tri_prism' && 9}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-orange-200 dark:border-slate-700 text-xs font-mono text-center">
                  <span className="text-slate-600 dark:text-slate-400">Euler-tétel ellenőrzése:</span>
                  <div className="font-bold text-amber-800 dark:text-amber-300 mt-1">
                    {solidType === 'cube' && 'C + L = 8 + 6 = 14 | E + 2 = 12 + 2 = 14 ✓'}
                    {solidType === 'cuboid' && 'C + L = 8 + 6 = 14 | E + 2 = 12 + 2 = 14 ✓'}
                    {solidType === 'pyramid' && 'C + L = 5 + 5 = 10 | E + 2 = 8 + 2 = 10 ✓'}
                    {solidType === 'tri_prism' && 'C + L = 6 + 5 = 11 | E + 2 = 9 + 2 = 11 ✓'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: Vetületi ábrázolás */}
      <TheorySection
        title="3. Vetületi Ábrázolás (A Három Képsík Rendszere)"
        subtitle="Hogyan írható le egy 3D térbeli test teljesen egyértelműen síkbeli rajzokkal?"
        icon={<Eye className="w-5 h-5 text-blue-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-orange-100 dark:border-slate-800 space-y-2 shadow-xs">
            <h4 className="font-bold text-xs sm:text-sm text-orange-700 dark:text-orange-300 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-[10px] font-black">1</span>
              Elölnézet (Főnézet)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A testre pontosan <strong>szemből, merőlegesen</strong> nézünk.
              Mutatja a test szélességét és magasságát.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-blue-100 dark:border-slate-800 space-y-2 shadow-xs">
            <h4 className="font-bold text-xs sm:text-sm text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-[10px] font-black">2</span>
              Oldalnézet (Balnézet)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A testre pontosan <strong>balról</strong> nézünk, és a jobb oldali képsíkra vetítjük.
              Mutatja a test mélységét és magasságát.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-100 dark:border-slate-800 space-y-2 shadow-xs">
            <h4 className="font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-[10px] font-black">3</span>
              Felülnézet (Alaprajz)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A testre pontosan <strong>felülről</strong> nézünk lefelé.
              Mutatja a test szélességét és mélységét.
            </p>
          </div>
        </div>

        <TheoryCallout
          variant="tip"
          title="Miért szükséges mind a három nézet?"
        >
          Egyetlen nézetből sosem lehet egyértelműen meghatározni egy test alakját! Például egy négyzet alakú elölnézet
          tartozhat kockához, négyzet alapú hasábhoz, vagy akár egy hengerszerű testhez is. A három merőleges nézet
          együtt azonban kizár minden félreértést.
        </TheoryCallout>
      </TheorySection>

      {/* 4. SZAKASZ: Az Euler-féle poliédertétel */}
      <TheorySection
        title="4. Az Euler-féle Poliédertétel"
        subtitle="A csúcsok, lapok és élek elválaszthatatlan matematikai összefüggése"
        icon={<Calculator className="w-5 h-5 text-emerald-500" />}
      >
        <div className="p-4 bg-emerald-50/80 dark:bg-slate-900 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800/80 mb-5 text-center">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
            Leonhard Euler tétele konvex testekre:
          </span>
          <div className="text-xl sm:text-2xl font-black font-mono text-emerald-950 dark:text-emerald-100 my-1">
            C + L = E + 2 &nbsp;&nbsp;vagy&nbsp;&nbsp; C - E + L = 2
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Ahol <strong>C</strong> a csúcsok száma, <strong>L</strong> a határoló lapok száma, <strong>E</strong> pedig az élek száma.
          </p>
        </div>

        {/* Poliéder összefoglaló táblázat */}
        <TheoryTable
          headers={['Geometriai Test', 'Csúcsok (C)', 'Lapok (L)', 'Élek (E)', 'C + L = E + 2']}
          rows={[
            ['Tetraéder (Háromoldalú gúla)', '4', '4', '6', '4 + 4 = 6 + 2 (8 = 8) ✓'],
            ['Kocka / Téglatest', '8', '6', '12', '8 + 6 = 12 + 2 (14 = 14) ✓'],
            ['Négyoldalú gúla', '5', '5', '8', '5 + 5 = 8 + 2 (10 = 10) ✓'],
            ['Háromoldalú hasáb', '6', '5', '9', '6 + 5 = 9 + 2 (11 = 11) ✓'],
            ['Ötoldalú hasáb', '10', '7', '15', '10 + 7 = 15 + 2 (17 = 17) ✓'],
            ['Oktaéder (Szabályos 8-lapú)', '6', '8', '12', '6 + 8 = 12 + 2 (14 = 14) ✓']
          ]}
        />
      </TheorySection>

      {/* 5. SZAKASZ: Gyakori Csapdák */}
      <TheorySection
        title="5. Gyakori Csapdák és Típushibák"
        subtitle="Mire figyelj a testhálók és a nézetek feladataiban?"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
      >
        <div className="space-y-3">
          <TheoryTrapBox
            trap="Nem minden 6 összefüggő négyzetből lesz kocka!"
            explanation="Gyakori tévedés azt hinni, hogy bármilyen 6 egymáshoz csatlakozó négyzetből hajtogatható kocka. Ha például 4 négyzet találkozik egyetlen pontban (2x2-es tömb), vagy ha 5 négyzet van egy vonalban, azok összehajtva átfedik egymást!"
            correction="Képzeld el a felhajtást lépésről lépésre: minden élnek és lapnak külön pozícióba kell kerülnie, és nem fedhetik egymást!"
          />

          <TheoryTrapBox
            trap="A szomszédos és szemközti lapok felcserélése"
            explanation="A hálóban a közvetlenül határos lapok az összehajtott testen egymásra merőleges szomszédos lapok lesznek, nem pedig szemköztiek!"
            correction="A szemközti párhuzamos lapok között a hálóban mindig átugrunk egy lapot."
          />

          <TheoryTrapBox
            trap="Élszámolás eltévesztése gúla és hasáb esetén"
            explanation="Gúla és hasáb élszámának összekeverése gyakori dolgozathiba."
            correction="n-oldalú sokszög alap esetén: Hasábnál az élek száma 3n (alsó alap, felső alap, oldalélek). Gúlánál az élek száma 2n (alapélek + csúcsba futó oldalélek)."
          />
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: Önellenőrző Kérdések */}
      <TheorySection
        title="6. Önellenőrző Kérdések"
        subtitle="Ellenőrizd felkészültségedet a gyakorló kvíz indítása előtt!"
        icon={<HelpCircle className="w-5 h-5 text-orange-500" />}
      >
        <div className="space-y-4">
          {/* 1. Kérdés */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              1. Hány csúcsa, lapja és éle van egy hatoldalú hasábnak?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 0, text: 'C = 12, L = 8, E = 18', correct: true },
                { id: 1, text: 'C = 10, L = 6, E = 16', correct: false },
                { id: 2, text: 'C = 12, L = 6, E = 12', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQuiz1Answer(opt.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                    quiz1Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-orange-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz1Answer !== null && (
              <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400">
                {quiz1Answer === 0 ? (
                  <span className="text-emerald-600 font-bold">✓ Helyes! C = 2·6 = 12, L = 6+2 = 8, E = 3·6 = 18. (12 + 8 = 18 + 2 ✓)</span>
                ) : (
                  <span className="text-rose-600 font-bold">✗ Nem jó. 6-oldalú hasábnál 2 hatoldalú alap van (2·6=12 csúcs), 8 lap (2 alap + 6 oldallap) és 3·6=18 él.</span>
                )}
              </div>
            )}
          </div>

          {/* 2. Kérdés */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              2. Egy konvex testnek 7 csúcsa és 10 éle van. Hány lap határolja?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 0, text: 'L = 4', correct: false },
                { id: 1, text: 'L = 5', correct: true },
                { id: 2, text: 'L = 6', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQuiz2Answer(opt.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                    quiz2Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-orange-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz2Answer !== null && (
              <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400">
                {quiz2Answer === 1 ? (
                  <span className="text-emerald-600 font-bold">✓ Helyes! Euler-tételből: C + L = E + 2 → 7 + L = 10 + 2 → 7 + L = 12 → L = 5.</span>
                ) : (
                  <span className="text-rose-600 font-bold">✗ Nem jó. Használd a C + L = E + 2 összefüggést: 7 + L = 12, tehát L = 5!</span>
                )}
              </div>
            )}
          </div>

          {/* 3. Kérdés */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
              3. Melyik test elöl-, felül- és oldalnézete is egyforma háromszög?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 0, text: 'Kocka', correct: false },
                { id: 1, text: 'Tetraéder (Szabályos háromoldalú gúla)', correct: true },
                { id: 2, text: 'Négyoldalú hasáb', correct: false }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQuiz3Answer(opt.id)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                    quiz3Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-orange-300'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
            {quiz3Answer !== null && (
              <div className="mt-2.5 text-xs text-slate-600 dark:text-slate-400">
                {quiz3Answer === 1 ? (
                  <span className="text-emerald-600 font-bold">✓ Helyes! A tetraéder minden lapja és fő vetülete háromszög alakú.</span>
                ) : (
                  <span className="text-rose-600 font-bold">✗ Nem jó. A kocka és a hasáb vetületei négyzetek vagy téglalapok.</span>
                )}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
