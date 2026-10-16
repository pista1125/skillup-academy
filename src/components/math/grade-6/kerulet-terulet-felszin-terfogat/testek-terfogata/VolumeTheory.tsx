import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Box,
  Boxes,
  Layers,
  Droplets,
  Calculator,
  Ruler,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import {
  UnitCubeLayersSvg,
  CubeVolumeSvg,
  WaterDisplacementVolumeSvg,
  CubeScaleDoubleVolumeSvg
} from './VolumeDiagrams';

interface VolumeTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const VolumeTheory: React.FC<VolumeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota
  const [solidType, setSolidType] = useState<'cube' | 'cuboid'>('cuboid');
  const [cubeA, setCubeA] = useState<number>(3);
  const [cuboidA, setCuboidA] = useState<number>(4);
  const [cuboidB, setCuboidB] = useState<number>(3);
  const [cuboidC, setCuboidC] = useState<number>(2);

  // Számítások
  const cubeVolume = cubeA * cubeA * cubeA;
  const cubeSurfaceArea = 6 * cubeA * cubeA;

  const cuboidBaseArea = cuboidA * cuboidB;
  const cuboidVolume = cuboidA * cuboidB * cuboidC;
  const cuboidSurfaceArea = 2 * (cuboidA * cuboidB + cuboidA * cuboidC + cuboidB * cuboidC);

  const sections: TheorySection[] = [
    {
      id: 'sec-concept',
      title: '1. A térfogat fogalma és az egységkockák',
      icon: <Boxes className="w-5 h-5 text-teal-600" />,
      badge: 'Alapfogalom',
      badgeColor: 'teal',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Egy test <strong>térfogata</strong> (más szóval <em>köbtartalma</em>) azt fejezi ki, hogy a test <strong>mekkora helyet (térrészt) foglal el</strong> a térben. Jele a geometriában a latin <em>Volumen</em> szóból származó <strong>V</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black shrink-0">
              V
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-teal-900 dark:text-teal-200 text-xs sm:text-sm">
                A térfogatmérés alapegysége: az egységkocka
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Egy test térfogatát úgy mérjük meg, hogy megszámoljuk, hány darab <strong>egységkockával</strong> tudnánk hézagmentesen feltölteni.
              </p>
              <div className="font-mono font-black text-teal-800 dark:text-teal-300 text-xs sm:text-sm pt-1">
                <MathText>{'1\\text{ cm}^3 = 1\\text{ cm} \\times 1\\text{ cm} \\times 1\\text{ cm-es kocka térfogata}'}</MathText>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <strong>Réteges szemlélet:</strong> Ha egy téglatest alapjára lerakunk <MathText>{'a \\cdot b'}</MathText> darab kis kockát egy sorban, és ebből egymásra építünk <MathText>{'c'}</MathText> darab réteget, akkor összesen <MathText>{'(a \\cdot b) \\cdot c'}</MathText> darab egységkockát kapunk.
          </div>

          {/* SVG 1: Térfogat réteges felépítése egységkockákkal */}
          <UnitCubeLayersSvg />
        </div>
      )
    },
    {
      id: 'sec-cube-volume',
      title: '2. A kocka térfogata',
      icon: <Box className="w-5 h-5 text-indigo-600" />,
      badge: 'Kocka',
      badgeColor: 'indigo',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A kocka minden éle egyenlő hosszú (<MathText>{'a'}</MathText>). Ezért az alapterülete <MathText>{'a \\cdot a = a^2'}</MathText>, a testmagassága pedig szintén <MathText>{'a'}</MathText>.
          </p>

          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-2">
            <h4 className="font-bold text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
              A kocka térfogatképlete:
            </h4>
            <div className="font-mono font-black text-base sm:text-lg text-indigo-700 dark:text-indigo-300">
              <MathText>{'V = a \\cdot a \\cdot a = a^3'}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ezért hívjuk a harmadik hatványt „köbnek” (latinul <em>cubus</em> = kocka)!
            </p>
          </div>

          {/* SVG 2: Kocka térfogata V = a³ */}
          <CubeVolumeSvg />

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">Példák kocka térfogatára:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <MathText>{'a = 2\\text{ cm} \\to V = 2^3 = 8\\text{ cm}^3'}</MathText>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <MathText>{'a = 3\\text{ cm} \\to V = 3^3 = 27\\text{ cm}^3'}</MathText>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <MathText>{'a = 5\\text{ cm} \\to V = 5^3 = 125\\text{ cm}^3'}</MathText>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-cuboid-volume',
      title: '3. A téglatest és egyenes hasáb térfogata',
      icon: <Layers className="w-5 h-5 text-purple-600" />,
      badge: 'Téglatest',
      badgeColor: 'purple',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Az <MathText>{'a, b, c'}</MathText> élhosszúságú téglatest térfogata a három különböző irányú élének szorzatával egyenlő:
          </p>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 space-y-2">
            <h4 className="font-bold text-xs sm:text-sm text-purple-900 dark:text-purple-200">
              A téglatest térfogatképlete:
            </h4>
            <div className="font-mono font-black text-base sm:text-lg text-purple-700 dark:text-purple-300">
              <MathText>{'V = a \\cdot b \\cdot c = T_{\\text{alap}} \\cdot m'}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ahol <MathText>{'T_{\\text{alap}} = a \\cdot b'}</MathText> az alaplap területe, és <MathText>{'m = c'}</MathText> a test magassága.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              Gyakorlati átrendezések (hiányzó él keresése):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
              <div className="p-2.5 rounded-lg bg-purple-50/60 dark:bg-purple-950/40">
                Magasság: <MathText>{'m = \\frac{V}{T_{\\text{alap}}} = \\frac{V}{a \\cdot b}'}</MathText>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-50/60 dark:bg-purple-950/40">
                Alapterület: <MathText>{'T_{\\text{alap}} = \\frac{V}{m}'}</MathText>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-capacity-litres',
      title: '4. Térfogat és űrtartalom (Literek és átváltások)',
      icon: <Droplets className="w-5 h-5 text-cyan-600" />,
      badge: 'Űrtartalom',
      badgeColor: 'cyan',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A folyadékok (víz, tej, üzemanyag) és gázok tárolásakor a térfogatot leggyakrabban <strong>űrtartalomként</strong>, <strong>literben</strong> mérjük.
          </p>

          <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900 space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-cyan-950 dark:text-cyan-200">
              Az űrtartalom aranyszabálya:
            </h4>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-cyan-300 dark:border-cyan-800 text-center font-mono font-black text-base sm:text-lg text-cyan-700 dark:text-cyan-300">
              <MathText>{'1\\text{ dm}^3 = 1\\text{ liter}'}</MathText>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-center">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-cyan-200 dark:border-cyan-800">
                <MathText>{'1\\text{ m}^3 = 1000\\text{ liter}'}</MathText>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-cyan-200 dark:border-cyan-800">
                <MathText>{'1\\text{ cm}^3 = 1\\text{ ml} = 0{,}001\\text{ l}'}</MathText>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-cyan-200 dark:border-cyan-800">
                <MathText>{'1\\text{ hl} = 100\\text{ liter}'}</MathText>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-scaling-traps',
      title: '5. A köbös növekedés és tipikus csapdák',
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
      badge: 'Vigyázz!',
      badgeColor: 'rose',
      content: (
        <div className="space-y-3.5">
          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1.5">
            <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> 1. Csapda: Élhossz duplázása $\to$ 8-szoros térfogat!
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha egy kocka élét a <strong>kétszeresére</strong> növeljük, a felülete <MathText>{'2^2 = 4'}</MathText>-szeresére nő, de a térfogata <MathText>{'2^3 = 8'}</MathText>-szorosára növekszik!
              <br />
              Például: <MathText>{'a=1\\text{ cm} \\to V=1\\text{ cm}^3'}</MathText>, míg <MathText>{'a=2\\text{ cm} \\to V=8\\text{ cm}^3'}</MathText>.
            </p>
            {/* SVG 3: Kocka él duplázás 8-szoros térfogat */}
            <CubeScaleDoubleVolumeSvg />
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1.5">
            <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> 2. Csapda: Térfogat és felszín összekeverése
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A <strong>felszín (A)</strong> területi mértékegység (<MathText>{'\\text{cm}^2, \\text{m}^2'}</MathText>), a test határoló lapjainak felülete.
              A <strong>térfogat (V)</strong> térbeli mértékegység (<MathText>{'\\text{cm}^3, \\text{dm}^3, \\text{liter}'}</MathText>), a test belsejének űrtartalma.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1.5">
            <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> 3. Csapda: Vízszint emelkedése test bemerítésekor
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha egy akváriumba beleteszünk egy sziklát vagy fémtestet, a kiszorított víz térfogata pontosan megegyezik a bemerített test térfogatával: <MathText>{'V_{\\text{test}} = T_{\\text{alap}} \\cdot \\Delta m'}</MathText>.
            </p>
            {/* SVG 4: Vízszintemelkedés és Archimédész elve */}
            <WaterDisplacementVolumeSvg />
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Testek térfogata"
      subtitle="Kocka, téglatest térfogatszámítása, egységkockák, űrtartalom és folyadékmennyiség vizsgálata"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="teal"
      quickRule={{
        label: 'Kocka és téglatest térfogatképlete',
        formula: 'V_{\\text{kocka}} = a^3 \\quad • \\quad V_{\\text{téglatest}} = a \\cdot b \\cdot c \\quad (1\\text{ dm}^3 = 1\\text{ liter})'
      }}
      practiceTitle="Készen állsz a térfogatszámítási feladványokra?"
      practiceSubtitle="Gyakorold a térfogatszámítást a 30 kérdéses kvízben, a párosítóban és a csoportosítóban!"
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* Interaktív 3D Térfogat & Egységkocka Labor */}
      <div className="p-4 sm:p-5 rounded-3xl border-2 border-teal-200 dark:border-teal-900/60 bg-gradient-to-br from-teal-50/50 via-white to-cyan-50/40 dark:from-slate-900 dark:via-teal-950/20 dark:to-slate-900 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-200/60 dark:border-teal-900/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-600 text-white shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                Interaktív Térfogat & Űrtartalom Laboratórium
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Állítsd be a test éleit és figyeld meg az alapterületet, a rétegeket és a literekre való átváltást!
              </p>
            </div>
          </div>

          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setSolidType('cube')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                solidType === 'cube'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Kocka
            </button>
            <button
              onClick={() => setSolidType('cuboid')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                solidType === 'cuboid'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Téglatest
            </button>
          </div>
        </div>

        {/* Csúszkák */}
        {solidType === 'cube' ? (
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-sm">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
              <span>Kocka élhossza (a):</span>
              <span className="font-mono text-teal-600 font-black">{cubeA} cm</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={cubeA}
              onChange={(e) => setCubeA(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Hosszúság (a): <span className="font-mono text-teal-600 font-black">{cuboidA} cm</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={cuboidA}
                onChange={(e) => setCuboidA(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Szélesség (b): <span className="font-mono text-teal-600 font-black">{cuboidB} cm</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={cuboidB}
                onChange={(e) => setCuboidB(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                Magasság (c): <span className="font-mono text-teal-600 font-black">{cuboidC} cm</span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={cuboidC}
                onChange={(e) => setCuboidC(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Eredmény kártyák */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900">
            <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
              Alapterület (T_alap)
            </span>
            <span className="font-mono font-black text-sm sm:text-base text-indigo-950 dark:text-indigo-200">
              {solidType === 'cube' ? `${cubeA * cubeA} cm²` : `${cuboidBaseArea} cm²`}
            </span>
            <span className="text-[10px] text-slate-500 block">1 réteg kockaszáma</span>
          </div>

          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border-2 border-teal-300 dark:border-teal-800">
            <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 block mb-0.5">
              Térfogat (V)
            </span>
            <span className="font-mono font-black text-base sm:text-lg text-teal-700 dark:text-teal-300">
              {solidType === 'cube' ? `${cubeVolume} cm³` : `${cuboidVolume} cm³`}
            </span>
            <span className="text-[10px] text-teal-600 font-bold block">
              {solidType === 'cube' ? `${cubeA}³ cm³` : `${cuboidA} · ${cuboidB} · ${cuboidC}`}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900">
            <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 block mb-0.5">
              Űrtartalom (liter)
            </span>
            <span className="font-mono font-black text-sm sm:text-base text-cyan-950 dark:text-cyan-200">
              {solidType === 'cube'
                ? `${(cubeVolume / 1000).toFixed(3)} l`
                : `${(cuboidVolume / 1000).toFixed(3)} l`}
            </span>
            <span className="text-[10px] text-slate-500 block">V : 1000 (dm³-ben)</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block mb-0.5">
              Teljes Felszín (A)
            </span>
            <span className="font-mono font-black text-sm sm:text-base text-amber-950 dark:text-amber-200">
              {solidType === 'cube' ? `${cubeSurfaceArea} cm²` : `${cuboidSurfaceArea} cm²`}
            </span>
            <span className="text-[10px] text-slate-500 block">Határoló lapok összege</span>
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default VolumeTheory;
