import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  Sparkles,
  Layers,
  Boxes,
  Ruler,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Grid,
  Info,
  Droplets,
  Shapes,
  Maximize2
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import {
  DimensionsComparisonSvg,
  EulerFormulaVisualSvg
} from './Chapter5SummaryDiagrams';

interface Chapter5SummaryTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const Chapter5SummaryTheory: React.FC<Chapter5SummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota
  const [selectedShape, setSelectedShape] = useState<'rect' | 'cube' | 'cuboid'>('cuboid');
  const [dimA, setDimA] = useState<number>(4);
  const [dimB, setDimB] = useState<number>(3);
  const [dimC, setDimC] = useState<number>(2);

  // Számítások
  const rectK = 2 * (dimA + dimB);
  const rectT = dimA * dimB;

  const cubeA = 6 * dimA * dimA;
  const cubeV = dimA * dimA * dimA;

  const cuboidA = 2 * (dimA * dimB + dimA * dimC + dimB * dimC);
  const cuboidV = dimA * dimB * dimC;

  const sections: TheorySection[] = [
    {
      id: 'sec-units-summary',
      title: '1. A mértékegységek rendszere és váltószámai',
      icon: <Ruler className="w-5 h-5 text-indigo-600" />,
      badge: 'Alapkő',
      badgeColor: 'indigo',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A geometriai és fizikai mérések alapja a dimenziók szerinti váltószám-szabály. Minél magasabb a dimenzió, annál gyorsabban nő a váltószám:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-1">
              <span className="font-bold text-indigo-900 dark:text-indigo-200 block text-xs sm:text-sm">
                1D Hosszúság (10-es)
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                <MathText>{'1\\text{ m} = 10\\text{ dm} = 100\\text{ cm} = 1000\\text{ mm}'}</MathText>
                <br />
                <MathText>{'1\\text{ km} = 1000\\text{ m}'}</MathText>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-1">
              <span className="font-bold text-amber-900 dark:text-amber-200 block text-xs sm:text-sm">
                2D Terület (100-as)
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                <MathText>{'1\\text{ m}^2 = 100\\text{ dm}^2 = 10\\,000\\text{ cm}^2'}</MathText>
                <br />
                <MathText>{'1\\text{ ha} = 100\\text{ a} = 10\\,000\\text{ m}^2'}</MathText>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 space-y-1">
              <span className="font-bold text-teal-900 dark:text-teal-200 block text-xs sm:text-sm">
                3D Térfogat (1000-es)
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                <MathText>{'1\\text{ m}^3 = 1000\\text{ dm}^3 = 1000\\text{ liter}'}</MathText>
                <br />
                <MathText>{'1\\text{ dm}^3 = 1000\\text{ cm}^3 = 1\\text{ liter}'}</MathText>
              </p>
            </div>
          </div>

          {/* SVG 1: 1D vs 2D vs 3D Dimenziók és Váltószámok összehasonlítása */}
          <DimensionsComparisonSvg />
        </div>
      )
    },
    {
      id: 'sec-2d-summary',
      title: '2. Síkidomok kerülete és területe',
      icon: <Grid className="w-5 h-5 text-emerald-600" />,
      badge: '2D Geometria',
      badgeColor: 'emerald',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A síkidomokat határoló vonalak összhossza a <strong>kerület (K)</strong>, míg az általuk lefedett síkrész nagysága a <strong>terület (T)</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900 space-y-2">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                Téglalap és Négyzet
              </span>
              <div className="font-mono space-y-1 text-slate-700 dark:text-slate-300">
                <div><MathText>{'K_{\\text{téglalap}} = 2(a + b) \\quad • \\quad T_{\\text{téglalap}} = a \\cdot b'}</MathText></div>
                <div><MathText>{'K_{\\text{négyzet}} = 4a \\quad • \\quad T_{\\text{négyzet}} = a^2'}</MathText></div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900 space-y-2">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                Háromszögek területe
              </span>
              <div className="font-mono space-y-1 text-slate-700 dark:text-slate-300">
                <div><MathText>{'T_{\\text{háromszög}} = \\frac{a \\cdot m_a}{2}'}</MathText></div>
                <div><MathText>{'T_{\\text{derékszögű}} = \\frac{a \\cdot b}{2}'}</MathText> (a két befogó fele)</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-spatial-summary',
      title: '3. Térbeli alakzatok és az Euler-féle poliédertétel',
      icon: <Boxes className="w-5 h-5 text-purple-600" />,
      badge: '3D Testek',
      badgeColor: 'purple',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A térbeli alakzatokat két fő csoportra osztjuk: <strong>poliéderekre</strong> (csak síklapok határolják) és <strong>forgástestekre</strong> (görbe határoló felülettel, pl. henger, kúp, gömb).
          </p>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 flex items-center justify-between flex-wrap gap-2">
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-purple-950 dark:text-purple-200">
                Euler-féle poliédertétel konvex testekre:
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Csúcsok száma (<MathText>{'C'}</MathText>) + Lapok száma (<MathText>{'L'}</MathText>) = Élek száma (<MathText>{'É'}</MathText>) + 2
              </p>
            </div>
            <div className="font-mono font-black text-base sm:text-lg text-purple-700 dark:text-purple-300 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-xl border border-purple-300 dark:border-purple-800">
              <MathText>{'C + L = \\acute{E} + 2'}</MathText>
            </div>
          </div>

          {/* SVG 2: Euler-tétel szemléltetés (C + L = É + 2) */}
          <EulerFormulaVisualSvg />
        </div>
      )
    },
    {
      id: 'sec-surface-volume-summary',
      title: '4. Felszín- és térfogatszámítás szintézise',
      icon: <Calculator className="w-5 h-5 text-amber-600" />,
      badge: 'Felszín & Térfogat',
      badgeColor: 'amber',
      content: (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-bold">
                  <th className="p-2.5">Test neve</th>
                  <th className="p-2.5">Felszín képlete (A)</th>
                  <th className="p-2.5">Térfogat képlete (V)</th>
                  <th className="p-2.5">Jellemző mértékegység</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr>
                  <td className="p-2.5 font-sans font-bold text-slate-800 dark:text-slate-200">Kocka (a)</td>
                  <td className="p-2.5 text-amber-700 dark:text-amber-300"><MathText>{'A = 6a^2'}</MathText></td>
                  <td className="p-2.5 text-teal-700 dark:text-teal-300"><MathText>{'V = a^3'}</MathText></td>
                  <td className="p-2.5 font-sans text-slate-500"><MathText>{'\\text{cm}^2 / \\text{cm}^3'}</MathText></td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-bold text-slate-800 dark:text-slate-200">Téglatest (a,b,c)</td>
                  <td className="p-2.5 text-amber-700 dark:text-amber-300"><MathText>{'A = 2(ab+bc+ac)'}</MathText></td>
                  <td className="p-2.5 text-teal-700 dark:text-teal-300"><MathText>{'V = a \\cdot b \\cdot c'}</MathText></td>
                  <td className="p-2.5 font-sans text-slate-500"><MathText>{'\\text{dm}^2 / \\text{liter}'}</MathText></td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-bold text-slate-800 dark:text-slate-200">Egyenes hasáb</td>
                  <td className="p-2.5 text-amber-700 dark:text-amber-300"><MathText>{'A = 2T_a + T_p'}</MathText></td>
                  <td className="p-2.5 text-teal-700 dark:text-teal-300"><MathText>{'V = T_a \\cdot m'}</MathText></td>
                  <td className="p-2.5 font-sans text-slate-500"><MathText>{'\\text{m}^2 / \\text{m}^3'}</MathText></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'sec-exam-tips',
      title: '5. Témazáró aranyszabályok és tipikus hibák',
      icon: <Trophy className="w-5 h-5 text-rose-600" />,
      badge: 'Dolgozathoz!',
      badgeColor: 'rose',
      content: (
        <div className="space-y-3.5">
          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1">
            <span className="font-bold text-rose-800 dark:text-rose-300 text-xs sm:text-sm block">
              1. Mértékegységek egyeztetése a képletbe helyettesítés előtt!
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Soha ne szorozz össze cm-t dm-mel! Mindig válts át minden adatot azonos mértékegységre (pl. mindent cm-re vagy dm-re) a számolás előtt.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1">
            <span className="font-bold text-rose-800 dark:text-rose-300 text-xs sm:text-sm block">
              2. Szobafestésnél és nyitott dobozoknál figyelj a lapszámra!
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Szobafestésnél sosem festjük a padlót: csak 4 fal (<MathText>{'2(a+b)m'}</MathText>) és esetleg a mennyezet (<MathText>{'+ab'}</MathText>), majd vonjuk le az ajtókat és ablakokat!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1">
            <span className="font-bold text-rose-800 dark:text-rose-300 text-xs sm:text-sm block">
              3. Élhossz duplázása: Kétszeres él $\to$ Négyszeres felszín $\to$ Nyolcszoros térfogat!
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ne feledd: <MathText>{'2^1 = 2'}</MathText> (él), <MathText>{'2^2 = 4'}</MathText> (terület/felszín), <MathText>{'2^3 = 8'}</MathText> (térfogat)!
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Összefoglalás: Kerület, terület, felszín, térfogat"
      subtitle="A teljes V. fejezet átfogó rendszerezése, képletek, mértékegységek és felkészülés a témazáró dolgozatra"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="slate"
      quickRule={{
        label: 'V. Fejezet Nagykönyv Képletei',
        formula: 'K = 2(a+b) \\quad • \\quad T = ab \\quad • \\quad A = 2(ab+bc+ac) \\quad • \\quad V = abc'
      }}
      practiceTitle="Készen állsz a fejezet témazáró felkészítőjére?"
      practiceSubtitle="Gyakorold az egész fejezet anyagát a 30 kérdéses kvízben, a párosítóban és a csoportosítóban!"
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* Interaktív Fejezeti Mesterkalkulátor */}
      <div className="p-4 sm:p-5 rounded-3xl border-2 border-slate-300 dark:border-slate-700 bg-gradient-to-br from-slate-100/70 via-white to-slate-100/50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-slate-800 text-white shadow-xs">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                Fejezeti Mesterkalkulátor & Alakzat Vizsgáló
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Válaszd ki az alakzatot, állítsd be az éleket, és vizsgáld meg egyszerre a kerületet, területet, felszínt és térfogatot!
              </p>
            </div>
          </div>

          <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-800 p-1 border border-slate-300 dark:border-slate-700">
            <button
              onClick={() => setSelectedShape('rect')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                selectedShape === 'rect' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              2D Téglalap
            </button>
            <button
              onClick={() => setSelectedShape('cube')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                selectedShape === 'cube' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              3D Kocka
            </button>
            <button
              onClick={() => setSelectedShape('cuboid')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                selectedShape === 'cuboid' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              3D Téglatest
            </button>
          </div>
        </div>

        {/* Vezérlők */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
              a oldal: <span className="font-mono text-indigo-600 font-black">{dimA} cm</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={dimA}
              onChange={(e) => setDimA(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {selectedShape !== 'cube' && (
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                b oldal: <span className="font-mono text-indigo-600 font-black">{dimB} cm</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={dimB}
                onChange={(e) => setDimB(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          )}

          {selectedShape === 'cuboid' && (
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                c magasság: <span className="font-mono text-indigo-600 font-black">{dimC} cm</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={dimC}
                onChange={(e) => setDimC(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Eredmény kártyák */}
        {selectedShape === 'rect' ? (
          <div className="grid grid-cols-2 gap-3 text-center text-xs">
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900">
              <span className="text-[10px] uppercase font-bold text-indigo-600 block mb-0.5">Kerület (K)</span>
              <span className="font-mono font-black text-base sm:text-lg text-indigo-900 dark:text-indigo-200">
                {rectK} cm
              </span>
              <span className="text-[10px] text-slate-500 block">2 · ({dimA} + {dimB})</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
              <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-0.5">Terület (T)</span>
              <span className="font-mono font-black text-base sm:text-lg text-emerald-900 dark:text-emerald-200">
                {rectT} cm²
              </span>
              <span className="text-[10px] text-slate-500 block">{dimA} · {dimB}</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900">
              <span className="text-[10px] uppercase font-bold text-indigo-600 block mb-0.5">Alapterület (T_alap)</span>
              <span className="font-mono font-black text-sm sm:text-base text-indigo-900 dark:text-indigo-200">
                {selectedShape === 'cube' ? `${dimA * dimA} cm²` : `${dimA * dimB} cm²`}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
              <span className="text-[10px] uppercase font-bold text-amber-600 block mb-0.5">Teljes Felszín (A)</span>
              <span className="font-mono font-black text-sm sm:text-base text-amber-900 dark:text-amber-200">
                {selectedShape === 'cube' ? `${cubeA} cm²` : `${cuboidA} cm²`}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900">
              <span className="text-[10px] uppercase font-bold text-teal-600 block mb-0.5">Térfogat (V)</span>
              <span className="font-mono font-black text-sm sm:text-base text-teal-900 dark:text-teal-200">
                {selectedShape === 'cube' ? `${cubeV} cm³` : `${cuboidV} cm³`}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900">
              <span className="text-[10px] uppercase font-bold text-cyan-600 block mb-0.5">Űrtartalom (liter)</span>
              <span className="font-mono font-black text-sm sm:text-base text-cyan-900 dark:text-cyan-200">
                {selectedShape === 'cube' ? `${(cubeV / 1000).toFixed(3)} l` : `${(cuboidV / 1000).toFixed(3)} l`}
              </span>
            </div>
          </div>
        )}
      </div>
    </TheoryTemplate>
  );
};

export default Chapter5SummaryTheory;
