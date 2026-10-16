import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Shapes,
  Ruler,
  Square,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Info,
  Maximize2,
  Layers,
  Flame,
  Check,
  Zap,
  Grid
} from 'lucide-react';
import {
  UnitSquareAreaSvg,
  SquareAreaSvg,
  RectangleAreaSvg,
  RightTriangleAreaSvg,
  GeneralTriangleAreaSvg,
  ParallelogramAreaSvg,
  RhombusAreaSvg,
  TrapezoidAreaSvg,
  DeltoidAreaSvg,
  CompoundAdditiveSvg,
  CompoundSubtractiveSvg
} from './PolygonAreaDiagrams';

interface PolygonAreaTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

type ShapeType = 'rectangle' | 'square' | 'triangle' | 'rightTriangle' | 'parallelogram' | 'trapezoid' | 'deltoid';

export const PolygonAreaTheory: React.FC<PolygonAreaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív labor állapota
  const [selectedShape, setSelectedShape] = useState<ShapeType>('rectangle');
  const [sideA, setSideA] = useState<number>(6); // cm
  const [sideB, setSideB] = useState<number>(4); // cm
  const [heightA, setHeightA] = useState<number>(4); // cm
  const [sideC, setSideC] = useState<number>(3); // cm (trapéz fedőlap)
  const [diagE, setDiagE] = useState<number>(8); // cm (deltoid)
  const [diagF, setDiagF] = useState<number>(5); // cm (deltoid)
  const [showGrid, setShowGrid] = useState<boolean>(true);

  // Számítások
  let calculatedArea = 0;
  let formulaText = '';
  let calculationDetails = '';

  switch (selectedShape) {
    case 'square':
      calculatedArea = sideA * sideA;
      formulaText = 'T = a · a = a²';
      calculationDetails = `T = ${sideA} cm · ${sideA} cm = ${calculatedArea} cm²`;
      break;
    case 'rectangle':
      calculatedArea = sideA * sideB;
      formulaText = 'T = a · b';
      calculationDetails = `T = ${sideA} cm · ${sideB} cm = ${calculatedArea} cm²`;
      break;
    case 'rightTriangle':
      calculatedArea = (sideA * sideB) / 2;
      formulaText = 'T = (a · b) / 2 (befogók szorzatának fele)';
      calculationDetails = `T = (${sideA} cm · ${sideB} cm) : 2 = ${sideA * sideB} : 2 = ${calculatedArea} cm²`;
      break;
    case 'triangle':
      calculatedArea = (sideA * heightA) / 2;
      formulaText = 'T = (a · mₐ) / 2';
      calculationDetails = `T = (${sideA} cm · ${heightA} cm) : 2 = ${sideA * heightA} : 2 = ${calculatedArea} cm²`;
      break;
    case 'parallelogram':
      calculatedArea = sideA * heightA;
      formulaText = 'T = a · mₐ';
      calculationDetails = `T = ${sideA} cm · ${heightA} cm = ${calculatedArea} cm²`;
      break;
    case 'trapezoid':
      calculatedArea = ((sideA + sideC) * heightA) / 2;
      formulaText = 'T = [(a + c) · m] / 2';
      calculationDetails = `T = [(${sideA} + ${sideC}) · ${heightA}] : 2 = [${sideA + sideC} · ${heightA}] : 2 = ${calculatedArea} cm²`;
      break;
    case 'deltoid':
      calculatedArea = (diagE * diagF) / 2;
      formulaText = 'T = (e · f) / 2 (átlók szorzatának fele)';
      calculationDetails = `T = (${diagE} cm · ${diagF} cm) : 2 = ${diagE * diagF} : 2 = ${calculatedArea} cm²`;
      break;
  }

  const sections: TheorySection[] = [
    {
      id: 'terulet-fogalma',
      title: 'A terület fogalma és az egységnégyzet',
      badge: 'Alapfogalom',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Egy síkidom <strong>területe</strong> (jele: <strong>T</strong>) azt adja meg, hogy mekkora felületet foglal el a síkban, vagyis hány darab <strong>egységnégyzet</strong> szükséges a teljes lefedéséhez hézagmentesen és átfedés nélkül.
          </p>

          {/* Vizuális SVG magyarázat kártya */}
          <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-slate-900/60 shadow-xs flex flex-col items-center justify-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Vizuális szemléltetés: Síkidom lefedése 1 cm²-es egységnégyzetekkel
            </span>
            <div className="w-full flex justify-center py-1">
              <UnitSquareAreaSvg />
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 text-center max-w-md">
              A 4 cm hosszú és 3 cm széles téglalapba pontosan <strong>4 · 3 = 12 darab</strong> 1 cm²-es egységnégyzet fér el, így területe <strong>12 cm²</strong>.
            </p>
          </div>

          {/* Kiemelt szabály kártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-teal-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
              <Sparkles className="w-3 h-3 text-emerald-600" /> Aranyszabály: Terület vs. Kerület
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-xl mx-auto pt-1">
              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-blue-700 dark:text-blue-300">Kerület (K)</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  A határoló vonalak összhossza (mérőszalaggal mérjük).<br />
                  <strong>Egysége:</strong> cm, dm, m (1 dimenziós).
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Terület (T)</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  A lefedett síkfelület nagysága (járólapokkal lefedjük).<br />
                  <strong>Egysége:</strong> cm², dm², m² (2 dimenziós).
                </div>
              </div>
            </div>
          </div>

          {/* Mértékegység egyeztetés */}
          <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h5 className="font-bold text-amber-900 dark:text-amber-200">Figyelem: A mértékegységek mindig egyezzenek meg!</h5>
              <p className="text-slate-700 dark:text-slate-300">
                Mielőtt összeszoroznád az oldalakat és magasságokat, <strong>mindig váltsd őket azonos mértékegységre</strong>! Ha az alap cm-ben, a magasság dm-ben van megadva, az eredmény értelmetlen lesz, ha átváltás nélkül szorzol.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'negyzet-teglalap',
      title: 'A négyzet és a téglalap területe',
      badge: 'Négyszögek I.',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            A legegyszerűbb sokszögek területe közvetlenül kiszámítható az oldalak szorzatából, mert a síkidom pontosan sorokba és oszlopokba rendezett egységnégyzetekből áll.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Négyzet */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Square className="w-4 h-4 text-emerald-500" /> Négyzet
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                  4 egyenlő oldal
                </span>
              </div>
              <div className="rounded-xl border border-emerald-100 dark:border-emerald-950 bg-emerald-50/40 dark:bg-slate-950/40 p-2 flex justify-center">
                <SquareAreaSvg />
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-mono font-bold text-center text-sm">
                T = a · a = a²
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Példa:</strong> Ha egy négyzet oldala a = 6 cm, területe:<br />
                T = 6 cm · 6 cm = <strong>36 cm²</strong>.
              </p>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <strong>Visszafelé számolás:</strong> Ha a terület T = 49 cm², akkor az oldala a = 7 cm (mivel 7 · 7 = 49).
              </div>
            </div>

            {/* Téglalap */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Square className="w-4 h-4 text-teal-500" /> Téglalap
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 font-bold">
                  Szemközti oldalak egyenlők
                </span>
              </div>
              <div className="rounded-xl border border-teal-100 dark:border-teal-950 bg-teal-50/40 dark:bg-slate-950/40 p-2 flex justify-center">
                <RectangleAreaSvg />
              </div>
              <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-mono font-bold text-center text-sm">
                T = a · b
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Példa:</strong> Ha a = 8 cm és b = 5 cm, a terület:<br />
                T = 8 cm · 5 cm = <strong>40 cm²</strong>.
              </p>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <strong>Visszafelé számolás:</strong> Ha T = 48 cm² és a = 8 cm, akkor a másik oldal: b = T : a = 48 : 8 = 6 cm.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'haromszogek-terulete',
      title: 'A háromszögek területe és a magasságvonal',
      badge: 'Háromszögek',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Miért osztunk kettővel a háromszög területképletében? Mert <strong>bármely háromszög egy vele azonos alapú és magasságú paralelogramma (vagy derékszög esetén téglalap) pontos fele</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Derékszögű háromszög */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Derékszögű háromszög</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold">
                  A téglalap fele
                </span>
              </div>
              <div className="rounded-xl border border-blue-100 dark:border-blue-950 bg-blue-50/40 dark:bg-slate-950/40 p-2 flex justify-center">
                <RightTriangleAreaSvg />
              </div>
              <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 font-mono font-bold text-center text-sm">
                T = (a · b) / 2
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A derékszöget bezáró két oldal (a két <strong>befogó</strong>) merőleges egymásra, így az egyik alapként, a másik a hozzá tartozó magasságként viselkedik!
              </p>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <strong>Példa:</strong> Ha a = 6 cm és b = 4 cm, akkor:<br />
                T = (6 · 4) : 2 = 24 : 2 = <strong>12 cm²</strong>.
              </div>
            </div>

            {/* Általános háromszög */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Általános háromszög</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                  Alap × Magasság / 2
                </span>
              </div>
              <div className="rounded-xl border border-emerald-100 dark:border-emerald-950 bg-emerald-50/40 dark:bg-slate-950/40 p-2 flex justify-center">
                <GeneralTriangleAreaSvg />
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-mono font-bold text-center text-sm">
                T = (a · mₐ) / 2 = (b · m_b) / 2 = (c · m_c) / 2
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A <strong>magasságvonal</strong> (m) a csúcsból a szemközti oldalegyenesre bocsátott merőleges szakasz hossza. Mindig az adott oldalhoz tartozó magassággal kell szorozni!
              </p>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <strong>Példa:</strong> Ha a = 10 cm és mₐ = 7 cm, akkor:<br />
                T = (10 · 7) : 2 = 70 : 2 = <strong>35 cm²</strong>.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'paralelogramma-rombusz',
      title: 'Paralelogramma és rombusz területe',
      badge: 'Négyszögek II.',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Az <strong>átdarabolás elve</strong> szerint: ha egy paralelogramma egyik végéről levágjuk a derékszögű háromszög alakú sarkot, és áttesszük a másik végére, egy vele <strong>pontosan azonos területű téglalapot kapunk</strong>, amelynek oldalai az alap (a) és a magasság (mₐ)!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Paralelogramma */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Paralelogramma</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 font-bold">
                  Átdarabolás elve
                </span>
              </div>
              <div className="rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/40 dark:bg-slate-950/40 p-2 flex justify-center">
                <ParallelogramAreaSvg />
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300 font-mono font-bold text-center text-sm">
                T = a · mₐ = b · m_b
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Soha ne a ferde oldallal (b) szorozz, hanem mindig a derékszögű magassággal (mₐ)!<br />
                <strong>Példa:</strong> a = 8 cm, mₐ = 5 cm (és ferde oldal b = 6 cm) esetén:<br />
                T = 8 cm · 5 cm = <strong>40 cm²</strong> (a 6 cm-es b adat zavaró felesleges adat!).
              </p>
            </div>

            {/* Rombusz */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Rombusz</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-bold">
                  Merőleges átlók
                </span>
              </div>
              <div className="rounded-xl border border-purple-100 dark:border-purple-950 bg-purple-50/40 dark:bg-slate-950/40 p-2 flex justify-center">
                <RhombusAreaSvg />
              </div>
              <div className="p-2.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-300 font-mono font-bold text-center text-sm">
                T = a · m = (e · f) / 2
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Mivel a rombusz átlói (e és f) merőlegesen felezik egymást, a területe kiszámítható az átlók szorzatának feléből is!<br />
                <strong>Példa:</strong> e = 6 cm, f = 8 cm esetén:<br />
                T = (6 · 8) : 2 = 48 : 2 = <strong>24 cm²</strong>.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'trapez-deltoid',
      title: 'Trapéz és deltoid területe',
      badge: 'Négyszögek III.',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Két különleges négyszög, amely gyakran szerepel geometriai feladatokban:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Trapéz */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Trapéz</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold">
                  2 párhuzamos alap
                </span>
              </div>
              <div className="rounded-xl border border-amber-100 dark:border-amber-950 bg-amber-50/40 dark:bg-slate-950/40 p-2 flex justify-center">
                <TrapezoidAreaSvg />
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-mono font-bold text-center text-sm">
                T = [(a + c) · m] / 2
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>Miért?</strong> Ha két egybevágó trapézt fejjel lefelé egymás mellé illesztünk, egy (a + c) alapú és m magasságú paralelogrammát kapunk. Ennek a fele egy trapéz területe!
              </p>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <strong>Példa:</strong> a = 9 cm, c = 5 cm, m = 4 cm:<br />
                T = [(9 + 5) · 4] : 2 = [14 · 4] : 2 = 56 : 2 = <strong>28 cm²</strong>.
              </div>
            </div>

            {/* Deltoid */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Deltoid</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 font-bold">
                  Merőleges átlók
                </span>
              </div>
              <div className="rounded-xl border border-rose-100 dark:border-rose-950 bg-rose-50/40 dark:bg-slate-950/40 p-2 flex justify-center">
                <DeltoidAreaSvg />
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 font-mono font-bold text-center text-sm">
                T = (e · f) / 2
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Minden olyan négyszög területe, amelynek <strong>átlói merőlegesek egymásra</strong> (deltoid, rombusz, négyzet), egyenlő az átlók szorzatának felével!
              </p>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                <strong>Példa:</strong> e = 10 cm, f = 7 cm:<br />
                T = (10 · 7) : 2 = 70 : 2 = <strong>35 cm²</strong>.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'osszetett-alakzatok',
      title: 'Összetett síkidomok területe: Felbontás és Kiegészítés',
      badge: 'Gyakorlat',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            A mindennapi életben (pl. szobák alapterülete, telkek, parkettázás) a felületek ritkán egyszerű téglalapok. Két fő stratégia létezik:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Felbontási módszer */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <Layers className="w-4 h-4 text-emerald-500" /> 1. Felbontási módszer (Összeadás)
              </div>
              <div className="rounded-xl border border-emerald-100 dark:border-emerald-950 bg-emerald-50/40 dark:bg-slate-950/40 p-2 flex justify-center">
                <CompoundAdditiveSvg />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Az alakzatot vonalakkal felosztjuk egyszerű, ismert síkidomokra (pl. két téglalapra vagy téglalapra és háromszögre), majd a részterületeket <strong>összeadjuk</strong>:
              </p>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-mono text-center text-xs font-bold">
                T_összes = T₁ + T₂ + T₃
              </div>
            </div>

            {/* Kiegészítési módszer */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2.5">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                <Maximize2 className="w-4 h-4 text-teal-500" /> 2. Kiegészítési módszer (Kivonás)
              </div>
              <div className="rounded-xl border border-teal-100 dark:border-teal-950 bg-teal-50/40 dark:bg-slate-950/40 p-2 flex justify-center">
                <CompoundSubtractiveSvg />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Az alakzatot körbekerítjük egy nagy téglalappal, majd a hiányzó részek (kivágott sarkok) területét <strong>kivonjuk</strong> a nagy téglalap területéből:
              </p>
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-900 dark:text-teal-300 font-mono text-center text-xs font-bold">
                T_alakzat = T_nagy - T_kivágott
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'interaktiv-labor',
      title: 'Interaktív Alakzat és Terület Labor',
      badge: 'Interaktív',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Válaszd ki az alakzatot, állítsd be a csúszkákkal a méreteket, és figyeld meg az azonnali vizuális rajzot, a képletet és a lépésről lépésre történő helyettesítést!
          </p>

          {/* Alakzat választó gombok */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            {[
              { id: 'rectangle', label: 'Téglalap' },
              { id: 'square', label: 'Négyzet' },
              { id: 'rightTriangle', label: 'Derékszögű Háromszög' },
              { id: 'triangle', label: 'Általános Háromszög' },
              { id: 'parallelogram', label: 'Paralelogramma' },
              { id: 'trapezoid', label: 'Trapéz' },
              { id: 'deltoid', label: 'Deltoid' }
            ].map((btn) => (
              <Button
                key={btn.id}
                variant={selectedShape === btn.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedShape(btn.id as ShapeType)}
                className={`rounded-lg h-7 px-2.5 text-xs font-bold cursor-pointer transition-all ${
                  selectedShape === btn.id
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {btn.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            {/* Dinamikus SVG Rajzvászon */}
            <div className="relative p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-md flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
              <div className="absolute top-2.5 left-3 flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Mértékhelyes Vizualizáció
                </span>
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                  title="Egységnégyzet rács ki/be"
                >
                  <Grid className="w-3 h-3 text-emerald-400" />
                  {showGrid ? 'Rács: BE' : 'Rács: KI'}
                </button>
              </div>

              <svg viewBox="0 0 280 180" className="w-full max-w-[280px] h-[170px] mt-4 drop-shadow-md">
                {/* Opcionális háttér rács */}
                {showGrid && (
                  <g opacity="0.15">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="180" stroke="#10b981" strokeWidth="0.8" />
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 20} x2="280" y2={i * 20} stroke="#10b981" strokeWidth="0.8" />
                    ))}
                  </g>
                )}

                {/* Négyzet */}
                {selectedShape === 'square' && (
                  <g>
                    <rect
                      x={140 - (sideA * 10)}
                      y={90 - (sideA * 10)}
                      width={sideA * 20}
                      height={sideA * 20}
                      rx="4"
                      fill="#10b98130"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    <text x="140" y={90 - (sideA * 10) - 8} fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                      a = {sideA} cm
                    </text>
                    <text x={140 + (sideA * 10) + 8} y="95" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="start">
                      a = {sideA} cm
                    </text>
                  </g>
                )}

                {/* Téglalap */}
                {selectedShape === 'rectangle' && (
                  <g>
                    <rect
                      x={140 - (sideA * 9)}
                      y={90 - (sideB * 9)}
                      width={sideA * 18}
                      height={sideB * 18}
                      rx="4"
                      fill="#06b6d430"
                      stroke="#06b6d4"
                      strokeWidth="3"
                    />
                    <text x="140" y={90 - (sideB * 9) - 8} fill="#22d3ee" fontSize="11" fontWeight="bold" textAnchor="middle">
                      a = {sideA} cm
                    </text>
                    <text x={140 + (sideA * 9) + 8} y="95" fill="#22d3ee" fontSize="11" fontWeight="bold" textAnchor="start">
                      b = {sideB} cm
                    </text>
                  </g>
                )}

                {/* Derékszögű háromszög */}
                {selectedShape === 'rightTriangle' && (
                  <g>
                    <polygon
                      points={`60,150 ${60 + sideA * 16},150 60,${150 - sideB * 16}`}
                      fill="#3b82f630"
                      stroke="#3b82f6"
                      strokeWidth="3"
                    />
                    {/* Derékszög jel (magyar szabvány: negyedkörív + pont) */}
                    <path d="M 60 136 A 14 14 0 0 1 74 150" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                    <circle cx="65" cy="145" r="1.5" fill="#60a5fa" />
                    <text x={60 + (sideA * 8)} y="166" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">
                      a = {sideA} cm
                    </text>
                    <text x="45" y={150 - (sideB * 8)} fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="end">
                      b = {sideB} cm
                    </text>
                  </g>
                )}

                {/* Általános háromszög */}
                {selectedShape === 'triangle' && (
                  <g>
                    <polygon
                      points={`40,150 ${40 + sideA * 18},150 130,${150 - heightA * 18}`}
                      fill="#10b98130"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    {/* Magasságvonal */}
                    <line x1="130" y1={150 - heightA * 18} x2="130" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                    {/* Derékszög jel a talppontnál */}
                    <path d="M 130 138 A 12 12 0 0 1 142 150" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="134.5" cy="145.5" r="1.3" fill="#f59e0b" />
                    <text x={40 + (sideA * 9)} y="166" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                      a = {sideA} cm
                    </text>
                    <text x="136" y={150 - (heightA * 9)} fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="start">
                      mₐ = {heightA} cm
                    </text>
                  </g>
                )}

                {/* Paralelogramma */}
                {selectedShape === 'parallelogram' && (
                  <g>
                    <polygon
                      points={`60,150 ${60 + sideA * 16},150 ${95 + sideA * 16},${150 - heightA * 16} 95,${150 - heightA * 16}`}
                      fill="#6366f130"
                      stroke="#6366f1"
                      strokeWidth="3"
                    />
                    {/* Magasságvonal */}
                    <line x1="95" y1={150 - heightA * 16} x2="95" y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                    {/* Derékszög jel a talppontnál */}
                    <path d="M 95 138 A 12 12 0 0 1 107 150" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="99.5" cy="145.5" r="1.3" fill="#f59e0b" />
                    <text x={60 + (sideA * 8)} y="166" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                      a = {sideA} cm
                    </text>
                    <text x="101" y={150 - (heightA * 8)} fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="start">
                      mₐ = {heightA} cm
                    </text>
                  </g>
                )}

                {/* Trapéz */}
                {selectedShape === 'trapezoid' && (
                  <g>
                    <polygon
                      points={`40,150 ${40 + sideA * 18},150 ${80 + sideC * 18},${150 - heightA * 18} 80,${150 - heightA * 18}`}
                      fill="#f59e0b30"
                      stroke="#f59e0b"
                      strokeWidth="3"
                    />
                    {/* Magasságvonal */}
                    <line x1="80" y1={150 - heightA * 18} x2="80" y2="150" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,3" />
                    {/* Derékszög jel a talppontnál */}
                    <path d="M 80 138 A 12 12 0 0 1 92 150" fill="none" stroke="#ec4899" strokeWidth="1.5" />
                    <circle cx="84.5" cy="145.5" r="1.3" fill="#ec4899" />
                    <text x={40 + (sideA * 9)} y="166" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                      a = {sideA} cm
                    </text>
                    <text x={80 + (sideC * 9)} y={150 - heightA * 18 - 6} fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                      c = {sideC} cm
                    </text>
                    <text x="74" y={150 - (heightA * 9)} fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="end">
                      m = {heightA} cm
                    </text>
                  </g>
                )}

                {/* Deltoid */}
                {selectedShape === 'deltoid' && (
                  <g>
                    <polygon
                      points={`140,${90 - diagE * 8} ${140 + diagF * 10},85 140,${90 + diagE * 8} ${140 - diagF * 10},85`}
                      fill="#ec489930"
                      stroke="#ec4899"
                      strokeWidth="3"
                    />
                    {/* Átlók */}
                    <line x1="140" y1={90 - diagE * 8} x2="140" y2={90 + diagE * 8} stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="2,2" />
                    <line x1={140 - diagF * 10} y1="85" x2={140 + diagF * 10} y2="85" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="2,2" />
                    {/* Merőleges átlók derékszög jele */}
                    <path d="M 150 85 A 10 10 0 0 1 140 95" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    <circle cx="144" cy="89" r="1.2" fill="#38bdf8" />
                    <text x="146" y="50" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="start">
                      e = {diagE} cm
                    </text>
                    <text x="140" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                      f = {diagF} cm
                    </text>
                  </g>
                )}
              </svg>

              <div className="text-center font-mono font-bold text-xs text-emerald-400 mt-2">
                {formulaText}
              </div>
            </div>

            {/* Vezérlők és számított eredmény */}
            <div className="space-y-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <div className="space-y-3">
                {/* 'a' oldal / alap */}
                {selectedShape !== 'deltoid' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>{selectedShape === 'square' ? 'Oldalhossz (a):' : 'Alap vagy "a" oldal:'}</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{sideA} cm</span>
                    </div>
                    <Slider
                      min={2}
                      max={12}
                      step={1}
                      value={[sideA]}
                      onValueChange={(val) => setSideA(val[0])}
                    />
                  </div>
                )}

                {/* 'b' oldal (téglalap, derékszögű háromszög) */}
                {(selectedShape === 'rectangle' || selectedShape === 'rightTriangle') && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>{selectedShape === 'rightTriangle' ? 'Másik befogó (b):' : 'Szélesség (b oldal):'}</span>
                      <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{sideB} cm</span>
                    </div>
                    <Slider
                      min={2}
                      max={10}
                      step={1}
                      value={[sideB]}
                      onValueChange={(val) => setSideB(val[0])}
                    />
                  </div>
                )}

                {/* Magasság (háromszög, paralelogramma, trapéz) */}
                {(selectedShape === 'triangle' || selectedShape === 'parallelogram' || selectedShape === 'trapezoid') && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>Magasság (m):</span>
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{heightA} cm</span>
                    </div>
                    <Slider
                      min={2}
                      max={8}
                      step={1}
                      value={[heightA]}
                      onValueChange={(val) => setHeightA(val[0])}
                    />
                  </div>
                )}

                {/* Trapéz fedőlap 'c' */}
                {selectedShape === 'trapezoid' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>Fedőlap (c oldal):</span>
                      <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{sideC} cm</span>
                    </div>
                    <Slider
                      min={2}
                      max={8}
                      step={1}
                      value={[sideC]}
                      onValueChange={(val) => setSideC(val[0])}
                    />
                  </div>
                )}

                {/* Deltoid átlók */}
                {selectedShape === 'deltoid' && (
                  <>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span>Hosszabb átló (e):</span>
                        <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">{diagE} cm</span>
                      </div>
                      <Slider
                        min={4}
                        max={12}
                        step={1}
                        value={[diagE]}
                        onValueChange={(val) => setDiagE(val[0])}
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span>Rövidebb átló (f):</span>
                        <span className="font-mono text-sky-600 dark:text-sky-400 font-bold">{diagF} cm</span>
                      </div>
                      <Slider
                        min={2}
                        max={8}
                        step={1}
                        value={[diagF]}
                        onValueChange={(val) => setDiagF(val[0])}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Számított eredmény kártya */}
              <div className="p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/40 text-center space-y-1 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Kiszámított Terület (T):
                </span>
                <div className="text-2xl font-mono font-black text-emerald-800 dark:text-emerald-200">
                  {calculatedArea} cm²
                </div>
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 pt-0.5">
                  {calculationDetails}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tipikus-hibak',
      title: 'Gyakori hibák és aranyszabályok a dolgozatban',
      badge: 'Fontos Tippek',
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-1.5">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" /> 1. Hiba: Háromszögnél elfelejtesz osztani 2-vel!
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Gyakori hiba: a · m kiszámítása és késznek tekintése. Ne feledd: az a paralelogramma területe! A háromszög annak a fele: <strong>mindig ossz 2-vel</strong>!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-1.5">
              <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> 2. Hiba: Ferde oldallal szorzol magasság helyett!
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Paralelogrammánál vagy háromszögnél a ferde oldal nem magasság! Csak a merőleges magasságvonalat (m) szabad megszorozni az alaphoz.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1.5">
              <div className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> 3. Tipp: Trapéz szárainak trükkje
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Trapéz területénél csak a két párhuzamos alap (a és c) és a köztük lévő távolság (m) számít. A két szár (b és d) hossza a területhez nem szükséges, csak a kerülethez!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
              <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-emerald-600" /> 4. Tipp: Merőleges átlójú négyszögek
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Ha bármely négyszög átlói merőlegesek egymásra (deltoid, rombusz, négyzet), a terület mindig <strong>T = (e · f) : 2</strong>!
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="A sokszögek területe"
      subtitle="Négyzet, téglalap, háromszög, paralelogramma, trapéz, deltoid és összetett alakzatok területszámítása"
      topicBadge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="orange"
      pdfFilename="6_osztaly_V_a_sokszogek_terulete_tananyag.pdf"
      ruleTitle="Kiemelt területképletek"
      ruleFormula="T_{\text{háromszög}} = \frac{a \cdot m_a}{2} \quad • \quad T_{\text{paralelogramma}} = a \cdot m_a \quad • \quad T_{\text{trapéz}} = \frac{(a + c) \cdot m}{2} \quad • \quad T_{\text{deltoid}} = \frac{e \cdot f}{2}"
      quickRule={{
        label: 'Kiemelt területképletek',
        formula: 'T_{\\text{háromszög}} = \\frac{a \\cdot m_a}{2} \\quad • \\quad T_{\\text{paralelogramma}} = a \\cdot m_a \\quad • \\quad T_{\\text{trapéz}} = \\frac{(a + c) \\cdot m}{2} \\quad • \\quad T_{\\text{deltoid}} = \\frac{e \\cdot f}{2}'
      }}
      practiceTitle="Készen állsz a sokszögek területének gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 30 feladatos interaktív kvízben, a párosítóban és a csoportosítóban!"
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
};

export default PolygonAreaTheory;
