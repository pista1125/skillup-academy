import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Box,
  Boxes,
  Shapes,
  Ruler,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Info,
  Maximize2,
  Check,
  Zap,
  Grid,
  Calculator,
  Flame
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import {
  SurfaceAreaConceptNetSvg,
  CubeSurfaceAreaNetSvg,
  CuboidSurfaceAreaNetSvg,
  TriangularPrismSurfaceAreaSvg,
  GluedCubesSurfaceAreaSvg
} from './SurfaceAreaDiagrams';

interface SurfaceAreaTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

type SolidType = 'cube' | 'cuboid' | 'squarePrism' | 'triangularPrism';

export const SurfaceAreaTheory: React.FC<SurfaceAreaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota
  const [selectedSolid, setSelectedSolid] = useState<SolidType>('cuboid');
  const [cubeA, setCubeA] = useState<number>(4);
  const [cuboidA, setCuboidA] = useState<number>(5);
  const [cuboidB, setCuboidB] = useState<number>(3);
  const [cuboidC, setCuboidC] = useState<number>(2);
  const [activeTab, setActiveTab] = useState<'3d' | 'net' | 'faces'>('net');

  // Számítások
  const cubeFaceArea = cubeA * cubeA;
  const cubeTotalArea = 6 * cubeFaceArea;

  const faceAB = cuboidA * cuboidB;
  const faceAC = cuboidA * cuboidC;
  const faceBC = cuboidB * cuboidC;
  const cuboidTotalArea = 2 * (faceAB + faceAC + faceBC);

  const sections: TheorySection[] = [
    {
      id: 'sec-concept',
      title: '1. A felszín fogalma és a testháló',
      icon: <Layers className="w-5 h-5 text-amber-600" />,
      badge: 'Alapfogalom',
      badgeColor: 'amber',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A térbeli testek felületét határoló síkidomok összességét a test <strong>felszínének</strong> nevezzük, jele a geometriában hagyományosan <strong>A</strong> (az angol <em>Area</em> vagy a latin <em>Area / Superficies</em> szóból).
          </p>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black shrink-0">
              A
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
                A felszín alapszabálya
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Egy tetszőleges poliéder felszíne megegyezik a testet alkotó <strong>összes határoló síklap területének összegével</strong>:
              </p>
              <div className="font-mono font-black text-amber-800 dark:text-amber-300 text-sm pt-1">
                <MathText>{'A = \\sum T_{\\text{lapok}} = T_1 + T_2 + T_3 + \\dots + T_n'}</MathText>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Grid className="w-4 h-4 text-teal-600" /> A testháló szerepe
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ha egy dobozt a megfelelő élei mentén felvágunk és a síkba kiterítünk, a kapott síkidom a <strong>testháló</strong>. A test felszíne pontosan egyenlő a kiterített háló síkbeli területével!
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-indigo-600" /> Mértékegységek és 100-as váltószám
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mivel a felszín terület jellegű mennyiség, <strong>területmértékegységekben</strong> mérjük: <MathText>{'\\text{mm}^2,\\; \\text{cm}^2,\\; \\text{dm}^2,\\; \\text{m}^2'}</MathText>. Szomszédos mértékegységek között a váltószám pontosan <strong>100</strong>!
              </p>
            </div>
          </div>

          {/* SVG 1: Testháló kiterítés */}
          <SurfaceAreaConceptNetSvg />
        </div>
      )
    },
    {
      id: 'sec-cube',
      title: '2. A kocka felszíne',
      icon: <Box className="w-5 h-5 text-emerald-600" />,
      badge: 'Kiemelt képlet',
      badgeColor: 'emerald',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A kockát <strong>6 darab egybevágó négyzetlap</strong> határolja. Ha a kocka élhossza <MathText>{'a'}</MathText>, akkor egyetlen négyzetlap területe <MathText>{'T_{\\text{lap}} = a \\cdot a = a^2'}</MathText>.
          </p>

          {/* Kocka kiemelt képletkártya */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border-2 border-emerald-300 dark:border-emerald-800 text-center space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Kocka felszínének képlete
            </span>
            <div className="text-xl sm:text-2xl font-mono font-black text-emerald-950 dark:text-emerald-100">
              <MathText>{'A_{\\text{kocka}} = 6 \\cdot a^2'}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              ahol <MathText>{'a'}</MathText> a kocka egy élének hossza, <MathText>{'a^2'}</MathText> pedig egy lap területe.
            </p>
          </div>

          {/* SVG 2: Kocka 3D és testháló */}
          <CubeSurfaceAreaNetSvg />

          {/* Példa és visszaszámolás */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
              <span className="font-bold text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 1. Példa: Felszín kiszámítása
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Mennyi a felszíne egy <MathText>{'a = 5\\text{ cm}'}</MathText> élű kockának?
              </p>
              <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-slate-800 font-mono text-xs space-y-1 text-slate-800 dark:text-slate-200">
                <div>1 lap területe: <MathText>{'T = a^2 = 5^2 = 25\\text{ cm}^2'}</MathText></div>
                <div>Teljes felszín: <MathText>{'A = 6 \\cdot 25 = 150\\text{ cm}^2'}</MathText></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 space-y-2">
              <span className="font-bold text-xs text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" /> 2. Példa: Él visszaszámolása
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Mekkora az éle annak a kockának, amelynek felszíne <MathText>{'A = 96\\text{ cm}^2'}</MathText>?
              </p>
              <div className="p-2.5 rounded-lg bg-teal-50/70 dark:bg-slate-800 font-mono text-xs space-y-1 text-slate-800 dark:text-slate-200">
                <div>1 lap területe: <MathText>{'T = A / 6 = 96 / 6 = 16\\text{ cm}^2'}</MathText></div>
                <div>Élhossz: <MathText>{'a = \\sqrt{16} = 4\\text{ cm}'}</MathText> (mert <MathText>{'4 \\cdot 4 = 16'}</MathText>)</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-cuboid',
      title: '3. A téglatest felszíne',
      icon: <Boxes className="w-5 h-5 text-indigo-600" />,
      badge: 'Alapvető képlet',
      badgeColor: 'indigo',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A téglatestet <strong>6 darab téglalaplap</strong> határolja, amelyek <strong>három egybevágó szemközti lap-párt</strong> alkotnak:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs">
            <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900">
              <span className="text-[10px] font-bold text-indigo-600 uppercase block mb-1">Alap- és fedőlap</span>
              <span className="font-mono font-black text-sm text-indigo-950 dark:text-indigo-200"><MathText>{'2 \\cdot (a \\cdot b)'}</MathText></span>
            </div>
            <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
              <span className="text-[10px] font-bold text-purple-600 uppercase block mb-1">Elülső és hátsó lap</span>
              <span className="font-mono font-black text-sm text-purple-950 dark:text-purple-200"><MathText>{'2 \\cdot (a \\cdot c)'}</MathText></span>
            </div>
            <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900">
              <span className="text-[10px] font-bold text-teal-600 uppercase block mb-1">Bal és jobb oldallap</span>
              <span className="font-mono font-black text-sm text-teal-950 dark:text-teal-200"><MathText>{'2 \\cdot (b \\cdot c)'}</MathText></span>
            </div>
          </div>

          {/* Téglatest kiemelt képletkártya */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-indigo-500/10 border-2 border-indigo-300 dark:border-indigo-800 text-center space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Téglatest felszínének képlete
            </span>
            <div className="text-xl sm:text-2xl font-mono font-black text-indigo-950 dark:text-indigo-100">
              <MathText>{'A_{\\text{téglatest}} = 2 \\cdot (a \\cdot b + a \\cdot c + b \\cdot c)'}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              ahol <MathText>{'a, b, c'}</MathText> a téglatest egy csúcsból kiinduló három különböző élhossza.
            </p>
          </div>

          {/* SVG 3: Téglatest 3D és 3 pár színes testháló */}
          <CuboidSurfaceAreaNetSvg />

          {/* Speciális eset: négyzet alapú téglatest */}
          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <strong>Speciális eset: Négyzet alapú téglatest (<MathText>{'a = b'}</MathText>):</strong>
              <p>
                Két darab <MathText>{'a \\times a'}</MathText> méretű négyzetlap és 4 darab azonos <MathText>{'a \\times c'}</MathText> méretű téglalaplap alkotja:
                <span className="font-mono font-bold block pt-1 text-blue-900 dark:text-blue-200">
                  <MathText>{'A = 2 \\cdot a^2 + 4 \\cdot (a \\cdot c)'}</MathText>
                </span>
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-prisms',
      title: '4. Egyenes hasábok felszíne',
      icon: <Shapes className="w-5 h-5 text-purple-600" />,
      badge: 'Általánosítás',
      badgeColor: 'purple',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Minden egyenes hasábnak van két párhuzamos, egybevágó alaplapja (<MathText>{'T_{\\text{alap}}'}</MathText>), az oldallapok együttese pedig a <strong>palástot</strong> (<MathText>{'T_{\\text{palást}}'}</MathText>) alkotja.
          </p>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800 text-center space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300">
              Hasáb felszínének általános szabálya
            </span>
            <div className="text-lg sm:text-xl font-mono font-black text-purple-950 dark:text-purple-100">
              <MathText>{'A = 2 \\cdot T_{\\text{alap}} + T_{\\text{palást}} = 2 \\cdot T_a + K_a \\cdot m'}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A palást kiterítve egyetlen nagy téglalap, amelynek egyik oldala az alaplap kerülete (<MathText>{'K_a'}</MathText>), másik oldala a hasáb testmagassága (<MathText>{'m'}</MathText>).
            </p>
          </div>

          {/* SVG 4: Háromoldalú hasáb és palást kiterítés */}
          <TriangularPrismSurfaceAreaSvg />

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">
              Példa: Háromoldalú derékszögű hasáb (<MathText>{'a=3\\text{ cm}, b=4\\text{ cm}, c=5\\text{ cm}, m=10\\text{ cm}'}</MathText>)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                Alaplap: <MathText>{'T_a = (3 \\cdot 4)/2 = 6\\text{ cm}^2'}</MathText>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                Palást: <MathText>{'T_p = (3+4+5) \\cdot 10 = 120\\text{ cm}^2'}</MathText>
              </div>
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/60 font-bold text-purple-900 dark:text-purple-200">
                Felszín: <MathText>{'2 \\cdot 6 + 120 = 132\\text{ cm}^2'}</MathText>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-traps',
      title: '5. Gyakorlati csapdák és trükkös feladatok',
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
      badge: 'Vigyázz!',
      badgeColor: 'rose',
      content: (
        <div className="space-y-3.5">
          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1.5">
            <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> 1. Csapda: Kockák összeragasztása
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha két azonos kockát összeragasztunk lapjaik mentén, a keletkezett test felszíne <strong>nem <MathText>{'2 \\cdot 6 = 12'}</MathText> lap</strong>, mert a két érintkező lap a test belsejébe kerül! Így pontosan <strong><MathText>{'12 - 2 = 10'}</MathText> külső lap</strong> marad: <MathText>{'A = 10 \\cdot a^2'}</MathText>.
            </p>
            {/* SVG 5: Összeragasztott kockák ábra */}
            <GluedCubesSurfaceAreaSvg />
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-1.5">
            <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 text-xs sm:text-sm">
              <Lightbulb className="w-4 h-4 text-amber-600" /> 2. Csapda: Felülről nyitott doboz vagy szobafestés
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Fedél nélküli doboznál vagy egy szoba 4 falának és mennyezetének festésénél a 6 lap közül <strong>csak 5 lapot</strong> számolunk (az alapot és a 4 oldallapot), mert a fedél/padló hiányzik:
              <span className="font-mono font-bold block pt-1 text-amber-900 dark:text-amber-200">
                <MathText>{'A_{\\text{nyitott}} = a \\cdot b + 2(a \\cdot c + b \\cdot c)'}</MathText>
              </span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 space-y-1.5">
            <div className="font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5 text-xs sm:text-sm">
              <Zap className="w-4 h-4 text-purple-600" /> 3. Csapda: Mértékegységek egyeztetése számítás előtt
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha egy téglatest élei különböző mértékegységben vannak megadva (pl. <MathText>{'a = 2\\text{ dm}, b = 15\\text{ cm}, c = 80\\text{ mm}'}</MathText>), a képletbe helyettesítés előtt <strong>minden élt azonos mértékegységre</strong> kell átváltani (pl. <MathText>{'a = 20\\text{ cm}, b = 15\\text{ cm}, c = 8\\text{ cm}'}</MathText>)!
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Testek felszíne"
      subtitle="A felszín fogalma, a kocka, a téglatest és az egyenes hasábok felszíne, kiterített hálók és gyakorlati feladatok"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="amber"
      pdfFilename="6_osztaly_V_testek_felszine_tananyag.pdf"
      ruleTitle="Kocka és téglatest felszínképlete"
      ruleFormula="A_{\text{kocka}} = 6a^2 \quad • \quad A_{\text{téglatest}} = 2(ab + bc + ac)"
      quickRule={{
        label: 'Kocka és téglatest felszínképlete',
        formula: 'A_{\\text{kocka}} = 6a^2 \\quad • \\quad A_{\\text{téglatest}} = 2(ab + bc + ac)'
      }}
      practiceTitle="Készen állsz a testek felszínének feladványaira?"
      practiceSubtitle="Gyakorold a felszínszámítást a 30 kérdéses kvízben, a párosítóban és a csoportosítóban!"
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* Interaktív 3D Felszín & Háló Laboratórium */}
      <div className="p-4 sm:p-5 rounded-3xl border-2 border-amber-200 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/40 dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-900 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 dark:border-amber-900/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-600 text-white shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                Interaktív Felszín Labor és Képlet Vizsgáló
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Módosítsd az élek hosszát, és figyeld meg az egyes lapok területeit és a teljes felszín levezetését!
              </p>
            </div>
          </div>

          {/* Test választó gombok */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setSelectedSolid('cube')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                selectedSolid === 'cube'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Kocka
            </button>
            <button
              onClick={() => setSelectedSolid('cuboid')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                selectedSolid === 'cuboid'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Téglatest
            </button>
          </div>
        </div>

        {/* Interaktív paraméterező és számítási nézet */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Bal: Csúszkák és bemenet */}
          <div className="md:col-span-5 space-y-3.5 p-4 rounded-2xl bg-white dark:bg-slate-850 border border-amber-100 dark:border-amber-900/40 shadow-xs">
            {selectedSolid === 'cube' ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Kocka élhossza (a):</span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 font-mono text-amber-800 dark:text-amber-300">
                    {cubeA} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={cubeA}
                  onChange={(e) => setCubeA(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1 cm</span>
                  <span>6 cm</span>
                  <span>12 cm</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">a él hossza:</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 font-mono text-indigo-800 dark:text-indigo-300">
                      {cuboidA} cm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={cuboidA}
                    onChange={(e) => setCuboidA(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">b él hossza:</span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 font-mono text-purple-800 dark:text-purple-300">
                      {cuboidB} cm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={cuboidB}
                    onChange={(e) => setCuboidB(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">c él hossza:</span>
                    <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 font-mono text-teal-800 dark:text-teal-300">
                      {cuboidC} cm
                    </span>
                  </div>
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
          </div>

          {/* Jobb: Élő levezetés és színes dobozok */}
          <div className="md:col-span-7 space-y-3">
            {selectedSolid === 'cube' ? (
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
                  <div className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center justify-between">
                    <span>1 lap területe (<MathText>{'a^2'}</MathText>):</span>
                    <span className="font-mono text-sm font-black">{cubeA} · {cubeA} = {cubeFaceArea} cm²</span>
                  </div>
                  <div className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center justify-between border-t border-amber-200 dark:border-amber-800/60 pt-2">
                    <span>Teljes felszín (<MathText>{'6 \\cdot a^2'}</MathText>):</span>
                    <span className="font-mono text-base sm:text-lg font-black text-amber-700 dark:text-amber-300">
                      6 · {cubeFaceArea} = {cubeTotalArea} cm²
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-1 text-center font-mono text-[10px] font-bold text-slate-500">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-amber-200/80">
                      {i + 1}. lap<br /><span className="text-amber-700 font-black">{cubeFaceArea}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900">
                    <span className="text-[10px] text-indigo-600 font-bold uppercase block">2 × (a · b)</span>
                    <span className="font-mono font-black text-indigo-900 dark:text-indigo-200">2 · {faceAB} = {2 * faceAB} cm²</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900">
                    <span className="text-[10px] text-purple-600 font-bold uppercase block">2 × (a · c)</span>
                    <span className="font-mono font-black text-purple-900 dark:text-purple-200">2 · {faceAC} = {2 * faceAC} cm²</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900">
                    <span className="text-[10px] text-teal-600 font-bold uppercase block">2 × (b · c)</span>
                    <span className="font-mono font-black text-teal-900 dark:text-teal-200">2 · {faceBC} = {2 * faceBC} cm²</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 border-2 border-amber-300 dark:border-amber-800 flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    Teljes felszín: <MathText>{'2(ab + ac + bc)'}</MathText>
                  </span>
                  <span className="font-mono font-black text-base sm:text-xl text-amber-700 dark:text-amber-300">
                    {cuboidTotalArea} cm²
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default SurfaceAreaTheory;
