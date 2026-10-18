import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  Trophy,
  Ruler,
  Maximize2,
  Box,
  Droplets,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Calculator,
  Home
} from 'lucide-react';

export interface MeasurementSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const MeasurementSummaryTheory: React.FC<MeasurementSummaryTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Mester-Laboratórium Állapotok ---
  const [edgeA, setEdgeA] = useState<number>(6); // dm
  const [edgeB, setEdgeB] = useState<number>(4); // dm
  const [edgeC, setEdgeC] = useState<number>(5); // dm

  // Számítások az interaktív laboratóriumhoz
  const basePerimeter = 2 * (edgeA + edgeB); // dm
  const baseArea = edgeA * edgeB; // dm²
  const totalSurfaceArea = 2 * (edgeA * edgeB + edgeA * edgeC + edgeB * edgeC); // dm²
  const totalVolume = edgeA * edgeB * edgeC; // dm³
  const capacityLiters = totalVolume; // 1 dm³ = 1 liter
  const totalEdgesLength = 4 * (edgeA + edgeB + edgeC); // dm

  return (
    <TheoryTemplate
      documentId="grade-5-measurement-summary-theory"
      pdfFilename="5_osztaly_IV_10_osszefoglalas.pdf"
      title="IV. Hosszúság, terület, térfogat összefoglalás"
      subtitle="A teljes IV. fejezet átfogó rendszerezése: hosszúság, kerület, terület, testek, felszín, térfogat, űrmérték és valós életbeli gyakorlati feladatok a témazáróhoz"
      themeColor="slate"
      emoji="🏆"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 10. TANANYAG"
      quickRule={{
        label: 'A fejezet 4 nagy pillére',
        formula: 'K = 2(a+b) \\quad | \\quad T = a \\cdot b \\quad | \\quad A = 2(ab+bc+ac) \\quad | \\quad V = a \\cdot b \\cdot c \\; (1\\text{ dm}^3 = 1\\text{ l})'
      }}
      practiceTitle="Készen állsz a nagy fejezeti témazáró kvízre?"
      practiceSubtitle="Tedd próbára tudásodat a 3×30 feladatos átfogó kvízben, a párosítóban vagy a csoportosítóban!"
      practiceButtonText="Gyakorló Kvíz indítása"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: HOSSZÚSÁG ÉS KERÜLET */}
      <TheorySection
        id="hosszusag-kerulet"
        title="1. Hosszúság mérése és a síkidomok kerülete"
        subtitle="1 dimenziós mértékek, átváltási láncok és kerületszámítás"
        badge="1D MÉRTÉKEK"
      >
        <TheoryCard title="A hosszúság mértékegységei és váltószámai">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A hosszúság a testek, szakaszok egydimenziós kiterjedése. Az alapegység a <strong>méter (m)</strong>.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center font-mono text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 my-3">
            <span className="text-blue-600 dark:text-blue-400">mm</span>
            <span className="text-slate-400 mx-2">·10 ➔</span>
            <span className="text-blue-600 dark:text-blue-400">cm</span>
            <span className="text-slate-400 mx-2">·10 ➔</span>
            <span className="text-blue-600 dark:text-blue-400">dm</span>
            <span className="text-slate-400 mx-2">·10 ➔</span>
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">m</span>
            <span className="text-slate-400 mx-2">·1000 ➔</span>
            <span className="text-blue-600 dark:text-blue-400">km</span>
          </div>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-md h-32 mx-auto" viewBox="0 0 340 105">
              {/* Téglalap */}
              <g transform="translate(25, 12)">
                <rect x="0" y="10" width="110" height="55" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" strokeDasharray="4,2" rx="3" />
                <text x="55" y="5" textAnchor="middle" className="text-[10px] font-bold fill-blue-700 dark:fill-blue-300">a</text>
                <text x="55" y="78" textAnchor="middle" className="text-[10px] font-bold fill-blue-700 dark:fill-blue-300">a</text>
                <text x="-8" y="42" textAnchor="middle" className="text-[10px] font-bold fill-blue-700 dark:fill-blue-300">b</text>
                <text x="118" y="42" textAnchor="middle" className="text-[10px] font-bold fill-blue-700 dark:fill-blue-300">b</text>
                <text x="55" y="42" textAnchor="middle" className="text-xs font-black fill-blue-900 dark:fill-blue-100">K = 2(a + b)</text>
              </g>

              {/* Elválasztó vonal */}
              <line x1="170" y1="10" x2="170" y2="90" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />

              {/* Négyzet */}
              <g transform="translate(205, 12)">
                <rect x="15" y="10" width="55" height="55" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" strokeDasharray="4,2" rx="3" />
                <line x1="40" y1="7" x2="44" y2="13" stroke="#16a34a" strokeWidth="1.5" />
                <line x1="40" y1="62" x2="44" y2="68" stroke="#16a34a" strokeWidth="1.5" />
                <line x1="12" y1="35" x2="18" y2="39" stroke="#16a34a" strokeWidth="1.5" />
                <line x1="67" y1="35" x2="73" y2="39" stroke="#16a34a" strokeWidth="1.5" />
                <text x="42.5" y="5" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-300">a</text>
                <text x="42.5" y="78" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-300">a</text>
                <text x="5" y="42" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-300">a</text>
                <text x="80" y="42" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-300">a</text>
                <text x="42.5" y="42" textAnchor="middle" className="text-xs font-black fill-emerald-900 dark:fill-emerald-100">K = 4a</text>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-200 dark:border-blue-800">
              <strong className="text-blue-900 dark:text-blue-300 block mb-1">
                Téglalap kerülete ($K$)
              </strong>
              <div className="font-mono text-base font-black text-slate-900 dark:text-white mb-1">
                K = 2 · (a + b) = 2a + 2b
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A szemközti oldalak egyenlő hosszúak, a határoló vonalak összege.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-slate-800/60 border border-emerald-200 dark:border-emerald-800">
              <strong className="text-emerald-900 dark:text-emerald-300 block mb-1">
                Négyzet kerülete ($K$)
              </strong>
              <div className="font-mono text-base font-black text-slate-900 dark:text-white mb-1">
                K = 4 · a
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Minden oldala egyenlő hosszú ($a = K : 4$).
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: TERÜLET ÉS MEZŐGAZDASÁGI MÉRTÉKEK */}
      <TheorySection
        id="terulet-mezogazdasag"
        title="2. Terület mérése és mezőgazdasági mértékek"
        subtitle="2 dimenziós felületek, egységnégyzetek és a 100-as váltószám"
        badge="2D MÉRTÉKEK"
      >
        <TheoryCard title="A terület mértékegységeinek átváltási létrája">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A síkidomok által lefedett felület nagyságát mérjük vele. Minden szomszédos területmérték között <strong>100 a váltószám</strong>!
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center font-mono text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 my-3 overflow-x-auto">
            <span>mm²</span>
            <span className="text-slate-400 mx-1.5">·100 ➔</span>
            <span>cm²</span>
            <span className="text-slate-400 mx-1.5">·100 ➔</span>
            <span>dm²</span>
            <span className="text-slate-400 mx-1.5">·100 ➔</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">m²</span>
            <span className="text-slate-400 mx-1.5">·100 ➔</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">a (ár)</span>
            <span className="text-slate-400 mx-1.5">·100 ➔</span>
            <span className="text-amber-600 dark:text-amber-400 font-bold">ha</span>
            <span className="text-slate-400 mx-1.5">·100 ➔</span>
            <span>km²</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-amber-800 text-center">
              <strong className="block text-amber-900 dark:text-amber-300 text-sm">1 ár (a)</strong>
              <span className="text-xs text-slate-600 dark:text-slate-300">10 m × 10 m = <strong>100 m²</strong></span>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-amber-800 text-center">
              <strong className="block text-amber-900 dark:text-amber-300 text-sm">1 hektár (ha)</strong>
              <span className="text-xs text-slate-600 dark:text-slate-300">100 m × 100 m = <strong>10 000 m² = 100 a</strong></span>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-slate-800 border border-amber-200 dark:border-amber-800 text-center">
              <strong className="block text-amber-900 dark:text-amber-300 text-sm">1 km²</strong>
              <span className="text-xs text-slate-600 dark:text-slate-300">100 ha = <strong>1 000 000 m²</strong></span>
            </div>
          </div>

          <TheoryTable
            headers={['Alakzat', 'Képlet', 'Magyarázat', 'Visszaszámolás']}
            rows={[
              ['Téglalap területe', 'T = a · b', 'Hosszúság szorozva a szélességgel', 'a = T : b \\quad (b = T : a)'],
              ['Négyzet területe', 'T = a · a = a²', 'Oldal önmagával vett szorzata', 'Melyik szám négyzete a T?'],
              ['Összetett alakzat', 'T = T₁ + T₂', 'Téglalapokra bontás vagy kiegészítés', 'Hiányzó élek pótlása']
            ]}
          />
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: TÉGLATEST ÉS KOCKA FELSZÍNE */}
      <TheorySection
        id="testek-felszin"
        title="3. Téglatest és kocka geometriája és felszíne"
        subtitle="3D testek határoló lapjai, hálói és a felszínképletek"
        badge="TESTEK ÉS FELSZÍN"
      >
        <TheoryCard title="A testek felépítése és kiterített hálója">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A téglatest és a kocka olyan egyenes hasábok, amelyeket 6 síklap határol.
            Mindkettőnek <strong>8 csúcsa</strong>, <strong>12 éle</strong> és <strong>6 lapja</strong> van.
          </p>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-md h-36 mx-auto" viewBox="0 0 340 120">
              {/* Kocka */}
              <g transform="translate(35, 15)">
                <polygon points="0,20 18,8 58,8 40,20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
                <polygon points="40,20 58,8 58,48 40,60" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.5" />
                <rect x="0" y="20" width="40" height="40" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" rx="1" />
                <text x="20" y="74" textAnchor="middle" className="text-[10px] font-bold fill-purple-900 dark:fill-purple-200">a</text>
                <text x="20" y="44" textAnchor="middle" className="text-[11px] font-black fill-purple-900">A = 6a²</text>
                <text x="20" y="90" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">6 egyforma lap</text>
              </g>

              <line x1="170" y1="15" x2="170" y2="105" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />

              {/* Téglatest */}
              <g transform="translate(205, 15)">
                <polygon points="0,20 22,8 92,8 70,20" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1.5" />
                <polygon points="70,20 92,8 92,48 70,60" fill="#ddd6fe" stroke="#6d28d9" strokeWidth="1.5" />
                <rect x="0" y="20" width="70" height="40" fill="#f5f3ff" stroke="#6d28d9" strokeWidth="2" rx="1" />
                <text x="35" y="74" textAnchor="middle" className="text-[10px] font-bold fill-purple-900 dark:fill-purple-200">a</text>
                <text x="86" y="15" textAnchor="middle" className="text-[10px] font-bold fill-purple-900 dark:fill-purple-200">b</text>
                <text x="-6" y="44" textAnchor="middle" className="text-[10px] font-bold fill-purple-900 dark:fill-purple-200">c</text>
                <text x="35" y="44" textAnchor="middle" className="text-[10px] font-black fill-purple-900">A = 2(ab+bc+ac)</text>
                <text x="35" y="90" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">3 pár lap összege</text>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-200 dark:border-indigo-800 space-y-2">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                <Box className="w-5 h-5 text-indigo-600" />
                Kocka felszíne (A)
              </h4>
              <div className="font-mono text-lg font-black text-slate-900 dark:text-white">
                A = 6 · a²
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A kockát 6 darab egybevágó négyzet határolja. Egy lap területe <MathText text="a^2" />, a 6 lap összege <MathText text="6 \cdot a^2" />.
              </p>
              <div className="text-[11px] font-semibold text-indigo-800 dark:text-indigo-300 bg-white dark:bg-slate-900 p-2 rounded-lg border border-indigo-100 dark:border-slate-700">
                Élek összhossza: 12 · a
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-slate-800/60 border border-purple-200 dark:border-purple-800 space-y-2">
              <h4 className="font-bold text-purple-900 dark:text-purple-300 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                Téglatest felszíne (A)
              </h4>
              <div className="font-mono text-lg font-black text-slate-900 dark:text-white">
                A = 2 · (ab + ac + bc)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A téglatestet 3 pár egybevágó téglalap határolja (alap-fedél: <MathText text="a \cdot b" />, elöl-hátul: <MathText text="a \cdot c" />, jobb-bal: <MathText text="b \cdot c" />).
              </p>
              <div className="text-[11px] font-semibold text-purple-800 dark:text-purple-300 bg-white dark:bg-slate-900 p-2 rounded-lg border border-purple-100 dark:border-slate-700">
                Élek összhossza: 4 · (a + b + c)
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: TÉRFOGAT ÉS ŰRMÉRTÉK */}
      <TheorySection
        id="terfogat-urmertek"
        title="4. Térfogat és űrmérték összefoglalása"
        subtitle="3 dimenziós kiterjedés, az 1000-es váltószám és a híd a liter felé"
        badge="3D TÉRFOGAT"
      >
        <TheoryCard title="Köbmértékek és Űrmértékek kapcsolata">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A térfogat a test által elfoglalt tér mérete. A köbmértékek között <strong>1000 a váltószám</strong>,
            mivel az élek mindhárom irányban tízszeresre nőnek ($10 \cdot 10 \cdot 10 = 1000$).
          </p>

          <TheoryCallout
            type="info"
            title="A 3 KULCSFONTOSSÁGÚ ARANYKAPOCS (MEMORIZÁLD!)"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center my-2">
              <div className="p-3 bg-white/20 dark:bg-black/30 rounded-xl">
                <span className="text-xs uppercase tracking-wider block opacity-80">1. Alapkapocs</span>
                <span className="text-base sm:text-lg font-black font-mono">1 dm³ = 1 liter</span>
              </div>
              <div className="p-3 bg-white/20 dark:bg-black/30 rounded-xl">
                <span className="text-xs uppercase tracking-wider block opacity-80">2. Kis kapocs</span>
                <span className="text-base sm:text-lg font-black font-mono">1 cm³ = 1 ml</span>
              </div>
              <div className="p-3 bg-white/20 dark:bg-black/30 rounded-xl">
                <span className="text-xs uppercase tracking-wider block opacity-80">3. Nagy kapocs</span>
                <span className="text-base sm:text-lg font-black font-mono">1 m³ = 1000 liter = 10 hl</span>
              </div>
            </div>
          </TheoryCallout>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-md h-28 mx-auto" viewBox="0 0 340 90">
              {/* 1 cm³ = 1 ml */}
              <g transform="translate(15, 10)">
                <rect x="12" y="8" width="18" height="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" rx="1" />
                <text x="21" y="40" textAnchor="middle" className="text-[10px] font-black fill-cyan-900 dark:fill-cyan-100">1 cm³ = 1 ml</text>
                <text x="21" y="52" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">csepp / cukor</text>
              </g>

              <line x1="95" y1="10" x2="95" y2="80" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />

              {/* 1 dm³ = 1 liter */}
              <g transform="translate(105, 8)">
                <rect x="25" y="6" width="28" height="28" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" rx="2" />
                <text x="39" y="44" textAnchor="middle" className="text-xs font-black fill-cyan-900 dark:fill-cyan-100">1 dm³ = 1 liter</text>
                <text x="39" y="56" textAnchor="middle" className="text-[9px] font-bold fill-sky-600 dark:fill-sky-400 font-mono">10 × 10 × 10 cm</text>
              </g>

              <line x1="215" y1="10" x2="215" y2="80" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />

              {/* 1 m³ = 1000 l */}
              <g transform="translate(225, 5)">
                <rect x="20" y="4" width="38" height="38" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2" rx="2" />
                <text x="39" y="52" textAnchor="middle" className="text-[10px] font-black fill-cyan-900 dark:fill-cyan-100">1 m³ = 1000 l</text>
                <text x="39" y="64" textAnchor="middle" className="text-[9px] font-bold fill-slate-500">= 10 hl</text>
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-cyan-50/60 dark:bg-slate-800/60 border border-cyan-200 dark:border-cyan-800">
              <strong className="text-cyan-900 dark:text-cyan-300 block mb-1">
                Kocka térfogata: V = a³
              </strong>
              <div className="font-mono text-base font-black text-slate-900 dark:text-white mb-1">
                V = a · a · a
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Példa: ha <MathText text="a = 4 \text{ cm}" />, akkor <MathText text="V = 4 \cdot 4 \cdot 4 = 64 \text{ cm}^3" />.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-200 dark:border-blue-800">
              <strong className="text-blue-900 dark:text-blue-300 block mb-1">
                Téglatest térfogata: V = a · b · c
              </strong>
              <div className="font-mono text-base font-black text-slate-900 dark:text-white mb-1">
                V = T_alap · m
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Példa: ha <MathText text="a = 5 \text{ dm}, b = 2 \text{ dm}, c = 3 \text{ dm}" />, akkor <MathText text="V = 5 \cdot 2 \cdot 3 = 30 \text{ dm}^3 = 30 \text{ liter}" />.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV MESTER-LABORATÓRIUM */}
      <TheorySection
        id="mester-labor"
        title="5. Interaktív Fejezeti Mester-Laboratórium"
        subtitle="Minden mennyiség egy helyen: állítsd a test méreteit, és figyeld az összefüggéseket!"
        badge="INTERAKTÍV SZIMULÁTOR"
      >
        <TheoryCard title="Téglatest geometriai és kapacitás szimulátor">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Változtasd a téglatest éleit deciméterben ($dm$), és kövesd végig valós időben a kerületet, területet, felszínt és térfogatot!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-6">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                a él (hosszúság): {edgeA} dm ({edgeA * 10} cm)
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={edgeA}
                onChange={(e) => setEdgeA(Number(e.target.value))}
                className="w-full accent-slate-700 dark:accent-slate-300 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                b él (szélesség): {edgeB} dm ({edgeB * 10} cm)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={edgeB}
                onChange={(e) => setEdgeB(Number(e.target.value))}
                className="w-full accent-slate-700 dark:accent-slate-300 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                c él (magasság): {edgeC} dm ({edgeC * 10} cm)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={edgeC}
                onChange={(e) => setEdgeC(Number(e.target.value))}
                className="w-full accent-slate-700 dark:accent-slate-300 cursor-pointer"
              />
            </div>
          </div>

          {/* Számított eredmények kártyái */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
              <span className="text-[10px] font-black tracking-wider uppercase text-blue-800 dark:text-blue-300 block">
                1. Alap kerülete (1D)
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white my-1 block">
                {basePerimeter} dm
              </span>
              <span className="text-[11px] text-slate-500">
                K = 2 · ({edgeA} + {edgeB})
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
              <span className="text-[10px] font-black tracking-wider uppercase text-emerald-800 dark:text-emerald-300 block">
                2. Alap területe (2D)
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white my-1 block">
                {baseArea} dm²
              </span>
              <span className="text-[11px] text-slate-500">
                T = {edgeA} · {edgeB}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center">
              <span className="text-[10px] font-black tracking-wider uppercase text-purple-800 dark:text-purple-300 block">
                3. Teljes Felszín (A)
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white my-1 block">
                {totalSurfaceArea} dm²
              </span>
              <span className="text-[11px] text-slate-500">
                6 lap együttes területe
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-center">
              <span className="text-[10px] font-black tracking-wider uppercase text-cyan-800 dark:text-cyan-300 block">
                4. Térfogat (V)
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white my-1 block">
                {totalVolume} dm³
              </span>
              <span className="text-[11px] text-slate-500 font-bold text-cyan-700 dark:text-cyan-300">
                = {capacityLiters} liter víz!
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] font-black tracking-wider uppercase text-amber-800 dark:text-amber-300 block">
                5. 12 Él Összege
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white my-1 block">
                {totalEdgesLength} dm
              </span>
              <span className="text-[11px] text-slate-500">
                4 · ({edgeA} + {edgeB} + {edgeC})
              </span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORI CSAPDÁK ÉS DOLGOZAT-TIPPEK */}
      <TheorySection
        id="csapdak"
        title="6. Gyakori csapdák a témazáró dolgozatban"
        subtitle="A leggyakoribb típushibák, amiken pontokat szoktak veszíteni"
        badge="FIGYELEM!"
      >
        <TheoryTrapBox
          traps={[
            {
              title: '1. CSAPDA: Váltószámok összekeverése (10 vs 100 vs 1000)',
              description: 'Mindig ellenőrizd a kitevőt! Hosszúságnál (1D) 10 a váltószám, területnél (2D) 100 a váltószám, térfogatnál (3D) pedig 1000 a váltószám!'
            },
            {
              title: '2. CSAPDA: Kerület és Terület képletek felcserélése',
              description: 'A kerület határoló vonal: K = 2(a + b). A terület a belső lefedés: T = a · b. Soha ne szorozz össze kerületnél, és ne adj össze területnél!'
            },
            {
              title: '3. CSAPDA: 1 m³ nem 100 liter, hanem 1000 liter',
              description: 'Mivel 1 m³ = 1000 dm³, és 1 dm³ = 1 liter, így 1 köbméter víz pontosan 1000 liter (vagy 10 hektoliter)!'
            },
            {
              title: '4. CSAPDA: Nyitott doboz és szobafestés lapjainak száma',
              description: 'A zárt téglatestnek 6 lapja van. De a szobafestésnél (padló nélkül) vagy a nyitott ládánál csak 5 lappal számolunk: alap + 4 oldalfal!'
            },
            {
              title: '5. CSAPDA: Különböző mértékegységek azonnali összeszorzása',
              description: 'Ha a szoba mérete 4 m, a csempe pedig 20 cm, szigorúan tilos 4 · 20-at számolni! Mindkettőt váltsd azonos egységre (pl. 400 cm és 20 cm) a művelet előtt!'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
