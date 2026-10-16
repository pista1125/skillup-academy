import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Paintbrush,
  Home,
  Box,
  Layers,
  Ruler,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Droplets,
  Grid,
  Scissors,
  Check,
  Info
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import {
  AquariumOpenSurfaceSvg,
  RoomPaintingNetSvg
} from './PracticalSurfaceAreaDiagrams';

interface PracticalSurfaceAreaTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PracticalSurfaceAreaTheory: React.FC<PracticalSurfaceAreaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Szobafestő kalkulátor állapota
  const [roomLength, setRoomLength] = useState<number>(5);
  const [roomWidth, setRoomWidth] = useState<number>(4);
  const [roomHeight, setRoomHeight] = useState<number>(3);
  const [openingArea, setOpeningArea] = useState<number>(4); // ajtók + ablakok m2-ben
  const [paintCeiling, setPaintCeiling] = useState<boolean>(true);
  const [coatCount, setCoatCount] = useState<number>(2);
  const [coveragePerLiter, setCoveragePerLiter] = useState<number>(10); // 10 m2 / liter

  // Számítások
  const wallPerimeter = 2 * (roomLength + roomWidth);
  const grossWallArea = wallPerimeter * roomHeight;
  const netWallArea = Math.max(0, grossWallArea - openingArea);
  const ceilingArea = paintCeiling ? roomLength * roomWidth : 0;
  const totalPaintArea = netWallArea + ceilingArea;
  const totalLitresNeeded = (totalPaintArea * coatCount) / coveragePerLiter;
  const bucketCount5L = Math.ceil(totalLitresNeeded / 5);

  const sections: TheorySection[] = [
    {
      id: 'sec-open-solids',
      title: '1. Fedetlen testek és akváriumok (5 határoló lap)',
      icon: <Box className="w-5 h-5 text-rose-600" />,
      badge: 'Gyakorlati alap',
      badgeColor: 'rose',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A hétköznapi életben nagyon sok olyan testtel találkozunk, amelynek <strong>nincs teteje (fedele)</strong>, vagy csak egyetlen alaplapját vesszük figyelembe. Ilyen például egy felül nyitott <strong>üvegakvárium</strong>, egy <strong>kerti úszómedence</strong>, egy <strong>ládika</strong> vagy egy <strong>virágláda</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black shrink-0">
              5
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-rose-900 dark:text-rose-200 text-xs sm:text-sm">
                Nyitott téglatest felszínképlete (5 lap)
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Ilyenkor a 6 lapból kivonjuk a fedőlapot, vagy összeadjuk az <strong>1 alsó alaplapot</strong> és a <strong>4 oldallapot</strong>:
              </p>
              <div className="font-mono font-black text-rose-800 dark:text-rose-300 text-sm pt-1">
                <MathText>{'A_{\\text{nyitott}} = a \\cdot b + 2 \\cdot a \\cdot c + 2 \\cdot b \\cdot c'}</MathText>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 block">
              Gyakorlati példa: Üvegakvárium készítése
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy akvárium méretei: hossza <MathText>{'a = 60\\text{ cm}'}</MathText>, szélessége <MathText>{'b = 30\\text{ cm}'}</MathText>, magassága <MathText>{'c = 40\\text{ cm}'}</MathText>. Hány <MathText>{'\\text{dm}^2'}</MathText> üveg szükséges hozzá?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                1 db Aljzat:<br />
                <MathText>{'60 \\cdot 30 = 1800\\text{ cm}^2'}</MathText>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                4 db Oldallap:<br />
                <MathText>{'2(60\\cdot 40 + 30\\cdot 40) = 7200\\text{ cm}^2'}</MathText>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 font-bold text-rose-900 dark:text-rose-200">
                Összes üvegfelület:<br />
                <MathText>{'9000\\text{ cm}^2 = 90\\text{ dm}^2'}</MathText>
              </div>
            </div>
          </div>

          {/* SVG 1: Akvárium felszín ábra */}
          <AquariumOpenSurfaceSvg />
        </div>
      )
    },
    {
      id: 'sec-room-painting',
      title: '2. Szobafestés és tapétázás lépésről lépésre',
      icon: <Paintbrush className="w-5 h-5 text-indigo-600" />,
      badge: 'Mesterségek',
      badgeColor: 'indigo',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A szobafestés a felszínszámítás leggyakoribb valós alkalmazása. Egy helyiség festésekor sosem a teljes 6 lapos téglatest felszínét számoljuk:
          </p>

          {/* SVG 2: Szobafestés kiterített falak modellje */}
          <RoomPaintingNetSvg />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-1.5">
              <span className="font-bold text-xs text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">1</span>
                Falak területe (Palást)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                A 4 oldalfal együttes területe a szoba kerülete szorozva a magassággal:
                <br />
                <span className="font-mono font-bold text-indigo-700 dark:text-indigo-300 block pt-1">
                  <MathText>{'T_{\\text{falak}} = 2(a + b) \\cdot m'}</MathText>
                </span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-1.5">
              <span className="font-bold text-xs text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-black">2</span>
                Nyílászárók levonása
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Az ablakokat és ajtókat <strong>nem festjük le</strong> a falfestékkel, ezért ezek területét levonjuk:
                <br />
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300 block pt-1">
                  <MathText>{'T_{\\text{nettó}} = T_{\\text{falak}} - T_{\\text{nyílászárók}}'}</MathText>
                </span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-1.5">
              <span className="font-bold text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">3</span>
                Mennyezet (ha festjük)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                A mennyezet pontosan megegyezik a szoba alapterületével:
                <br />
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 block pt-1">
                  <MathText>{'T_{\\text{mennyezet}} = a \\cdot b'}</MathText>
                </span>
                (A padlót sosem festjük falra való festékkel!)
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-paint-calculation',
      title: '3. Festék- és anyagszükséglet számítása',
      icon: <Droplets className="w-5 h-5 text-cyan-600" />,
      badge: 'Kiadósság',
      badgeColor: 'cyan',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            A festékek dobozán a gyártók megadják a <strong>kiadósságot</strong>, amely azt mutatja meg, hogy 1 liter festék hány négyzetméter felület lekenésére elegendő (jellemzően <MathText>{'8-12\\text{ m}^2 / \\text{liter}'}</MathText>).
          </p>

          <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900 space-y-3">
            <h4 className="font-bold text-xs sm:text-sm text-cyan-950 dark:text-cyan-200">
              A festékszükséglet 3 aranyszabálya:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800">
                <span className="font-bold text-cyan-700 dark:text-cyan-300 block mb-1">1. Rétegek száma</span>
                A falfelületeket általában <strong>2 rétegben</strong> (néha 3 rétegben) kell átkenni a tökéletes fedéshez, így a felület kétszeresét kell festeni!
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800">
                <span className="font-bold text-cyan-700 dark:text-cyan-300 block mb-1">2. Liter számítás</span>
                <MathText>{'\\text{Szükséges literek} = \\frac{\\text{Összfelület} \\cdot \\text{Rétegek}}{\\text{Kiadósság (m}^2/\\text{l)}}'}</MathText>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-800">
                <span className="font-bold text-cyan-700 dark:text-cyan-300 block mb-1">3. Kerekítés felfelé</span>
                Mivel a boltban csak bontatlan (pl. 2,5 l, 5 l, 10 l) dobozokat árulnak, mindig a legközelebbi <strong>egész vödörre felfelé</strong> kerekítünk!
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-tiling-packing',
      title: '4. Csempézés, burkolás és csomagolási ráhagyás',
      icon: <Grid className="w-5 h-5 text-amber-600" />,
      badge: 'Burkolás',
      badgeColor: 'amber',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Burkoláskor és ajándékcsomagoláskor a levágott darabok és az átlapolások miatt a nettó felszínnél <strong>több anyagra</strong> van szükség.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-2">
              <span className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Grid className="w-4 h-4 text-amber-600" /> Csempézés és járólapok
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A sarkoknál és széleknél a csempéket méretre kell vágni. A vágási hulladék miatt a szakemberek mindig legalább <strong>10% ráhagyással</strong> számolnak:
              </p>
              <div className="font-mono text-xs font-bold text-amber-800 dark:text-amber-300 p-2 bg-white dark:bg-slate-900 rounded-lg">
                <MathText>{'T_{\\text{vásárolandó}} = T_{\\text{felület}} \\cdot 1{,}10'}</MathText>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 space-y-2">
              <span className="font-bold text-xs sm:text-sm text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                <Scissors className="w-4 h-4 text-purple-600" /> Csomagolópapír és ráhagyás
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Egy doboz becsomagolásakor a papír szélei átfedik egymást a ragasztás mentén. Ezért a teljes felszín <MathText>{'115\\%-125\\%'}</MathText>-ára van szükség papírból:
              </p>
              <div className="font-mono text-xs font-bold text-purple-800 dark:text-purple-300 p-2 bg-white dark:bg-slate-900 rounded-lg">
                <MathText>{'T_{\\text{papír}} = A_{\\text{doboz}} \\cdot 1{,}20'}</MathText>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sec-traps',
      title: '5. Gyakori hibák a feladatokban',
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
      badge: 'Vigyázz!',
      badgeColor: 'rose',
      content: (
        <div className="space-y-3.5">
          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1.5">
            <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> 1. Hiba: A padló befestése
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha a feladat szobafestést kérdez, soha ne számolj 6 lappal! A padlót sosem festik a falak festékével. Mindig figyelj, hogy a mennyezetet kéri-e a szöveg (5 lap) vagy csak a falakat (4 lap).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1.5">
            <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> 2. Hiba: A nyílászárók levonásának elfelejtése
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Az ablakok és ajtók a fal részeinek tűnnek a képletben, de az üveget és az ajtólapot nem festjük. A nyílászárók területét mindig le kell vonni a falak bruttó területéből.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1.5">
            <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" /> 3. Hiba: Lefelé kerekítés a boltban
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha a számítás szerint <MathText>{'7{,}2\\text{ liter}'}</MathText> festék kell, egy 5 literes és egy 2,5 literes doboz (összesen 7,5 liter) szükséges. 7 liter nem elég, mert befejezetlen maradna a fal!
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Felszínszámítási gyakorlati feladatok"
      subtitle="Szobafestés, nyitott testek, akváriumok, csempézés és csomagolási feladványok a mindennapi életben"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="rose"
      quickRule={{
        label: 'Gyakorlati felszín alapszabályok',
        formula: 'A_{\\text{nyitott}} = ab + 2ac + 2bc \\quad • \\quad A_{\\text{falak}} = 2(a+b)m - T_{\\text{nyílászárók}}'
      }}
      practiceTitle="Készen állsz a szobafestés és csempézés feladványaira?"
      practiceSubtitle="Gyakorold a gyakorlati felszínszámítást a 30 kérdéses kvízben, párosítóban és csoportosítóban!"
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* Interaktív Szobafestés & Anyagszükséglet Labor */}
      <div className="p-4 sm:p-5 rounded-3xl border-2 border-rose-200 dark:border-rose-900/60 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/40 dark:from-slate-900 dark:via-rose-950/20 dark:to-slate-900 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-200/60 dark:border-rose-900/40 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-600 text-white shadow-xs">
              <Paintbrush className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                Interaktív Szobafestés & Anyagszükséglet Kalkulátor
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Állítsd be a szoba méreteit és nézd meg lépésről lépésre a festendő felületet és festékszükségletet!
              </p>
            </div>
          </div>
        </div>

        {/* Vezérlők */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
              Hosszúság (a): <span className="font-mono text-rose-600 font-black">{roomLength} m</span>
            </label>
            <input
              type="range"
              min="2"
              max="10"
              value={roomLength}
              onChange={(e) => setRoomLength(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
              Szélesség (b): <span className="font-mono text-rose-600 font-black">{roomWidth} m</span>
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={roomWidth}
              onChange={(e) => setRoomWidth(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
              Belmagasság (m): <span className="font-mono text-rose-600 font-black">{roomHeight} m</span>
            </label>
            <input
              type="range"
              min="2"
              max="5"
              value={roomHeight}
              onChange={(e) => setRoomHeight(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
              Nyílászárók: <span className="font-mono text-rose-600 font-black">{openingArea} m²</span>
            </label>
            <input
              type="range"
              min="0"
              max="12"
              value={openingArea}
              onChange={(e) => setOpeningArea(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">Mennyezet:</span>
            <button
              onClick={() => setPaintCeiling(!paintCeiling)}
              className={`w-full py-1 text-xs font-bold rounded-lg transition-all ${
                paintCeiling
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600'
              }`}
            >
              {paintCeiling ? '✓ Festjük' : '✕ Nem festjük'}
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">Rétegek száma:</span>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setCoatCount(1)}
                className={`py-1 text-xs font-bold rounded-lg transition-all ${
                  coatCount === 1 ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'
                }`}
              >
                1 réteg
              </button>
              <button
                onClick={() => setCoatCount(2)}
                className={`py-1 text-xs font-bold rounded-lg transition-all ${
                  coatCount === 2 ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'
                }`}
              >
                2 réteg
              </button>
            </div>
          </div>
        </div>

        {/* Számítási Eredmények Kártyák */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900">
            <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
              Falak bruttó
            </span>
            <span className="font-mono font-black text-sm sm:text-base text-indigo-950 dark:text-indigo-200">
              {grossWallArea} m²
            </span>
            <span className="text-[10px] text-slate-500 block">2 · ({roomLength}+{roomWidth}) · {roomHeight}</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
            <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block mb-0.5">
              Falak nettó (-ablak)
            </span>
            <span className="font-mono font-black text-sm sm:text-base text-amber-950 dark:text-amber-200">
              {netWallArea} m²
            </span>
            <span className="text-[10px] text-slate-500 block">{grossWallArea} - {openingArea} m²</span>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
              Mennyezet
            </span>
            <span className="font-mono font-black text-sm sm:text-base text-emerald-950 dark:text-emerald-200">
              {ceilingArea} m²
            </span>
            <span className="text-[10px] text-slate-500 block">{paintCeiling ? `${roomLength} · ${roomWidth} m²` : 'Kihagyva'}</span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800">
            <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 block mb-0.5">
              Festendő felület
            </span>
            <span className="font-mono font-black text-base sm:text-lg text-rose-700 dark:text-rose-300">
              {totalPaintArea} m²
            </span>
            <span className="text-[10px] text-rose-600 font-bold block">{coatCount} rétegben: {totalPaintArea * coatCount} m²</span>
          </div>
        </div>

        {/* Festék szükséglet összegző doboz */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white flex flex-wrap items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xs font-medium text-rose-100 block">Festékszükséglet (10 m²/liter kiadósság):</span>
              <span className="text-sm sm:text-lg font-black">
                {totalLitresNeeded.toFixed(1)} liter festék szükséges ({coatCount} rétegre)
              </span>
            </div>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-white text-rose-900 font-black text-xs sm:text-sm">
            Vásárolandó: {bucketCount5L} db 5 literes vödör ({bucketCount5L * 5} liter)
          </div>
        </div>
      </div>
    </TheoryTemplate>
  );
};

export default PracticalSurfaceAreaTheory;
