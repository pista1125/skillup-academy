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
import {
  Box,
  Layers,
  Eye,
  Grid3X3,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  RotateCcw,
  Plus,
  Minus,
  Maximize2,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BuildingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

// 3D Kocka rajzoló segédfüggvény SVG-hez izometrikus vetületben
function drawIsometricCube(cx: number, cy: number, size: number, colors?: { top: string; left: string; right: string; border: string }) {
  const c = colors || {
    top: '#fbcfe8',    // pink-200
    left: '#f472b6',   // pink-400
    right: '#db2777',  // pink-600
    border: '#9d174d'  // pink-800
  };

  const dx = size * 0.866;
  const dy = size * 0.5;

  // Felső lap (rombusz)
  const topPoints = `${cx},${cy - size} ${cx + dx},${cy - dy} ${cx},${cy} ${cx - dx},${cy - dy}`;
  // Bal elülső lap
  const leftPoints = `${cx - dx},${cy - dy} ${cx},${cy} ${cx},${cy + size} ${cx - dx},${cy + dy}`;
  // Jobb elülső lap
  const rightPoints = `${cx},${cy} ${cx + dx},${cy - dy} ${cx + dx},${cy + dy} ${cx},${cy + size}`;

  return (
    <g key={`${cx}-${cy}`}>
      <polygon points={topPoints} fill={c.top} stroke={c.border} strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points={leftPoints} fill={c.left} stroke={c.border} strokeWidth="1.2" strokeLinejoin="round" />
      <polygon points={rightPoints} fill={c.right} stroke={c.border} strokeWidth="1.2" strokeLinejoin="round" />
    </g>
  );
}

export const BuildingTheory: React.FC<BuildingTheoryProps> = ({ onBack, onStartQuiz }) => {
  // ========================================================
  // INTERAKTÍV KOCKAÉPÍTŐ LABOR ÁLLAPOTAI (3x3-as rács)
  // grid[sor][oszlop] = magasság (0..3)
  // sor: 0 (hátsó), 1 (középső), 2 (elülső)
  // oszlop: 0 (bal), 1 (közép), 2 (jobb)
  // ========================================================
  const [grid, setGrid] = useState<number[][]>([
    [1, 2, 0],
    [0, 3, 1],
    [2, 1, 0]
  ]);

  const [activeTab, setActiveTab] = useState<'builder' | 'nets' | 'views'>('builder');
  const [selectedNetIndex, setSelectedNetIndex] = useState<number>(0);

  // Kocka magasság módosítása
  const handleCellChange = (r: number, c: number, delta: number) => {
    setGrid(prev => {
      const copy = prev.map(row => [...row]);
      const nextVal = Math.max(0, Math.min(3, copy[r][c] + delta));
      copy[r][c] = nextVal;
      return copy;
    });
  };

  const handleResetGrid = () => {
    setGrid([
      [1, 2, 0],
      [0, 3, 1],
      [2, 1, 0]
    ]);
  };

  const handleClearGrid = () => {
    setGrid([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  };

  // Összes kocka száma
  const totalCubes = grid.reduce((acc, row) => acc + row.reduce((rAcc, val) => rAcc + val, 0), 0);

  // Nézetek kiszámítása:
  // Elölnézet: oszloponként a maximális magasság (oszlop 0, 1, 2)
  const frontView = [
    Math.max(grid[0][0], grid[1][0], grid[2][0]),
    Math.max(grid[0][1], grid[1][1], grid[2][1]),
    Math.max(grid[0][2], grid[1][2], grid[2][2])
  ];

  // Oldalnézet (jobbról nézve): soronként a maximális magasság (sor 0, 1, 2)
  // Jobbról nézve bal oldalon a 2. (elülső) sor van, jobb oldalon a 0. (hátsó) sor
  const rightSideView = [
    Math.max(grid[2][0], grid[2][1], grid[2][2]),
    Math.max(grid[1][0], grid[1][1], grid[1][2]),
    Math.max(grid[0][0], grid[0][1], grid[0][2])
  ];

  // Felülnézet: mely mezőkben van legalább 1 kocka (grid[r][c] > 0)
  const topView = grid.map(row => row.map(val => val > 0));

  // Izometrikus rendereléshez a kockák kirajzolási sorrendje:
  // Hátulról előre: sor 0, majd sor 1, majd sor 2
  // Magasság szerint: szint 0, szint 1, szint 2
  const renderIsometricBuilding = () => {
    const cubesToRender: { x: number; y: number; z: number; cx: number; cy: number }[] = [];
    const size = 18;
    const originX = 140;
    const originY = 110;

    // sor = r (y), oszlop = c (x)
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const height = grid[r][c];
        for (let h = 0; h < height; h++) {
          const cx = originX + (c - r) * (size * 0.866);
          const cy = originY + (c + r) * (size * 0.5) - h * size;
          cubesToRender.push({ x: c, y: r, z: h, cx, cy });
        }
      }
    }

    if (cubesToRender.length === 0) {
      return (
        <text x="140" y="110" textAnchor="middle" className="text-xs font-bold fill-slate-400">
          Kattints az alaprajz gombjaira kockák hozzáadásához!
        </text>
      );
    }

    return cubesToRender.map(cube =>
      drawIsometricCube(cube.cx, cube.cy, size, {
        top: '#fce7f3',    // pink-100
        left: '#f472b6',   // pink-400
        right: '#db2777',  // pink-600
        border: '#831843'  // pink-900
      })
    );
  };

  // Kockaháló minták (11 háló közül 4 legfontosabb reprezentáns)
  const NET_PRESETS = [
    {
      name: 'T-alakú háló (1-4-1)',
      desc: 'A leggyakoribb kockaháló: középen 4 négyzet egy sávban, felül és alul 1-1 szárny.',
      type: '1-4-1',
      grid: [
        [0, 1, 0, 0],
        [1, 1, 1, 1],
        [0, 1, 0, 0]
      ],
      pairs: [
        { r: 0, c: 1, color: 'bg-emerald-400', label: 'F' }, // Fent
        { r: 2, c: 1, color: 'bg-emerald-400', label: 'L' }, // Lent (szemközti)
        { r: 1, c: 0, color: 'bg-blue-400', label: 'B' },    // Bal
        { r: 1, c: 2, color: 'bg-blue-400', label: 'J' },    // Jobb (szemközti)
        { r: 1, c: 1, color: 'bg-amber-400', label: 'E' },   // Elöl
        { r: 1, c: 3, color: 'bg-amber-400', label: 'H' }    // Hátul (szemközti)
      ]
    },
    {
      name: 'Kereszt háló (1-4-1)',
      desc: 'Szimmetrikus kereszt alakzat: a két oldalsó fül a második négyzethez kapcsolódik.',
      type: '1-4-1',
      grid: [
        [0, 0, 1, 0],
        [1, 1, 1, 1],
        [0, 0, 1, 0]
      ],
      pairs: [
        { r: 0, c: 2, color: 'bg-emerald-400', label: 'F' },
        { r: 2, c: 2, color: 'bg-emerald-400', label: 'L' },
        { r: 1, c: 0, color: 'bg-blue-400', label: 'B' },
        { r: 1, c: 2, color: 'bg-blue-400', label: 'J' },
        { r: 1, c: 1, color: 'bg-amber-400', label: 'E' },
        { r: 1, c: 3, color: 'bg-amber-400', label: 'H' }
      ]
    },
    {
      name: 'Lépcsős háló (1-3-2)',
      desc: 'Aszimmetrikus elrendezés: középen 3 négyzet, fent 1, lent 2 négyzet csatlakozik.',
      type: '1-3-2',
      grid: [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 1]
      ],
      pairs: [
        { r: 0, c: 1, color: 'bg-emerald-400', label: '1' },
        { r: 2, c: 2, color: 'bg-emerald-400', label: '1' },
        { r: 1, c: 0, color: 'bg-blue-400', label: '2' },
        { r: 1, c: 2, color: 'bg-blue-400', label: '2' },
        { r: 1, c: 1, color: 'bg-amber-400', label: '3' },
        { r: 2, c: 3, color: 'bg-amber-400', label: '3' }
      ]
    },
    {
      name: 'Z-forma háló (2-2-2)',
      desc: 'Lépcsős Z-alakzat: 3 darab 2-es szakasz kapcsolódik eltolva egymáshoz.',
      type: '2-2-2',
      grid: [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 1]
      ],
      pairs: [
        { r: 0, c: 0, color: 'bg-emerald-400', label: 'A' },
        { r: 1, c: 2, color: 'bg-emerald-400', label: 'A' },
        { r: 0, c: 1, color: 'bg-blue-400', label: 'B' },
        { r: 2, c: 2, color: 'bg-blue-400', label: 'B' },
        { r: 1, c: 1, color: 'bg-amber-400', label: 'C' },
        { r: 2, c: 3, color: 'bg-amber-400', label: 'C' }
      ]
    }
  ];

  return (
    <TheoryTemplate
      title="6. Testek építése, szemléltetése"
      subtitle="Kockaépítmények, számozott alaprajzok, háromirányú nézetek és a kockahálók világa"
      badgeText="📐 5. Osztály • III. Geometria"
      themeColor="pink"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfFileName="5_osztaly_testek_epitese_tananyag.pdf"
    >
      {/* ======================================================== */}
      {/* INTERAKTÍV KOCKALABORATÓRIUM */}
      {/* ======================================================== */}
      <div className="bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-fuchsia-500/10 border-2 border-pink-500/30 rounded-2xl p-4 sm:p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 border-b border-pink-200 dark:border-pink-900/50 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-pink-500 text-white shadow-sm">
                <Box className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100">
                Interaktív Térbeli Építő és Nézet Labor
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Építs kockákból 3D testet, figyeld a számozott alaprajzot és a 3 irányú vetületi nézeteket!
            </p>
          </div>

          {/* Fülek */}
          <div className="flex gap-1.5 bg-slate-200/80 dark:bg-slate-800/80 p-1 rounded-xl self-stretch sm:self-auto">
            <Button
              size="sm"
              variant={activeTab === 'builder' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", activeTab === 'builder' && "bg-pink-600 text-white")}
              onClick={() => setActiveTab('builder')}
            >
              <Grid3X3 className="w-3.5 h-3.5 mr-1" />
              Építmény & Nézetek
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'nets' ? 'default' : 'ghost'}
              className={cn("text-xs font-bold", activeTab === 'nets' && "bg-pink-600 text-white")}
              onClick={() => setActiveTab('nets')}
            >
              <Layers className="w-3.5 h-3.5 mr-1" />
              Kockahálók
            </Button>
          </div>
        </div>

        {/* 1. FÜL: KOCKAÉPÍTŐ ÉS NÉZETEK */}
        {activeTab === 'builder' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 3D Izometrikus modell nézet */}
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl p-4 border border-pink-200 dark:border-pink-900 flex flex-col items-center justify-between shadow-inner min-h-[260px]">
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-700 dark:text-pink-300 flex items-center gap-1.5">
                    <Box className="w-4 h-4 text-pink-500" />
                    3D Izometrikus rajz
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300">
                    Összes kocka: {totalCubes} db
                  </Badge>
                </div>

                <div className="my-auto py-2">
                  <svg className="w-64 h-48 sm:w-72 sm:h-56 mx-auto drop-shadow-md" viewBox="0 0 280 200" fill="none">
                    {/* Alaprács tájoló tengelyei */}
                    <ellipse cx="140" cy="155" rx="70" ry="25" fill="#f1f5f9" opacity="0.6" />
                    <line x1="140" y1="155" x2="200" y2="120" stroke="#cbd5e1" strokeDasharray="3 3" />
                    <line x1="140" y1="155" x2="80" y2="120" stroke="#cbd5e1" strokeDasharray="3 3" />
                    {renderIsometricBuilding()}
                  </svg>
                </div>

                <div className="w-full flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Szemből: Bal alsó irány</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-6 text-[10px] px-2" onClick={handleResetGrid}>
                      <RotateCcw className="w-3 h-3 mr-1" /> Alapértelmezett
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 text-[10px] px-2 text-rose-600 hover:text-rose-700" onClick={handleClearGrid}>
                      Törlés
                    </Button>
                  </div>
                </div>
              </div>

              {/* Számozott alaprajz interaktív szerkesztő */}
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl p-4 border border-pink-200 dark:border-pink-900 flex flex-col justify-between shadow-inner">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Grid3X3 className="w-4 h-4 text-pink-600" />
                      Számozott alaprajz (Oszlopok magassága)
                    </span>
                    <span className="text-[11px] text-slate-500">Kattints a +/- gombokra (0..3)</span>
                  </div>

                  {/* 3x3-as rács */}
                  <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    {grid.map((row, r) =>
                      row.map((val, c) => (
                        <div
                          key={`cell-${r}-${c}`}
                          className={cn(
                            "flex flex-col items-center justify-between p-2 rounded-lg border-2 transition-all",
                            val > 0
                              ? "bg-pink-50 border-pink-400 text-pink-900 dark:bg-pink-950/50 dark:border-pink-600 dark:text-pink-100"
                              : "bg-white border-dashed border-slate-300 text-slate-400 dark:bg-slate-800 dark:border-slate-600"
                          )}
                        >
                          <span className="text-lg font-black">{val}</span>
                          <div className="flex gap-1 mt-1">
                            <button
                              type="button"
                              disabled={val === 0}
                              onClick={() => handleCellChange(r, c, -1)}
                              className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 flex items-center justify-center disabled:opacity-30 text-slate-700 dark:text-slate-200 text-xs font-bold"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              disabled={val === 3}
                              onClick={() => handleCellChange(r, c, 1)}
                              className="w-5 h-5 rounded bg-pink-500 hover:bg-pink-600 flex items-center justify-center disabled:opacity-30 text-white text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="text-center text-[10px] text-slate-500 mt-2">
                    ↑ Hátsó sor | ↓ Elülső sor (Szemből nézve)
                  </div>
                </div>

                <div className="mt-4 p-2.5 rounded-lg bg-pink-50/80 dark:bg-pink-950/40 text-[11px] text-pink-900 dark:text-pink-200 border border-pink-200/60 dark:border-pink-800/40">
                  💡 <strong>Szabály:</strong> Az alaprajz négyzeteiben lévő számok összege megegyezik a testet alkotó kockák <strong>teljes számával</strong>:{' '}
                  <span className="font-mono font-bold">
                    {grid.flat().filter(v => v > 0).join(' + ') || '0'} = {totalCubes}
                  </span>
                </div>
              </div>
            </div>

            {/* A 3 nézet automatikus kivetítése */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-pink-600" />
                A 3 vetületi nézet automatikus rajza az építményed alapján
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Elölnézet */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-bold text-pink-700 dark:text-pink-300 mb-1">1. Elölnézet</div>
                  <div className="text-[10px] text-slate-500 mb-2">Szemből nézve (oszlopok max. magassága)</div>
                  <svg className="w-32 h-24 mx-auto" viewBox="0 0 96 72" fill="none">
                    {/* 3 oszlop, max magasság 3 */}
                    {[0, 1, 2].map(col => {
                      const h = frontView[col];
                      return (
                        <g key={`front-${col}`}>
                          {/* Alaprács vonalai */}
                          <rect x={col * 30 + 4} y="4" width="28" height="64" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                          {/* Kockák felrajzolása alulról felfelé */}
                          {Array.from({ length: h }).map((_, step) => (
                            <rect
                              key={`cube-f-${col}-${step}`}
                              x={col * 30 + 4}
                              y={68 - (step + 1) * 20}
                              width="28"
                              height="20"
                              fill="#f472b6"
                              stroke="#831843"
                              strokeWidth="1.5"
                              rx="2"
                            />
                          ))}
                          <text x={col * 30 + 18} y="71" textAnchor="middle" className="text-[9px] font-bold fill-slate-400">
                            {col + 1}.
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  <div className="text-[11px] font-mono text-pink-800 dark:text-pink-300 mt-1">
                    Magasságok: [{frontView.join(', ')}]
                  </div>
                </div>

                {/* 2. Felülnézet */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">2. Felülnézet</div>
                  <div className="text-[10px] text-slate-500 mb-2">Fentről lenézve (mely mezők foglaltak)</div>
                  <svg className="w-24 h-24 mx-auto" viewBox="0 0 72 72" fill="none">
                    {grid.map((row, r) =>
                      row.map((val, c) => (
                        <g key={`top-${r}-${c}`}>
                          <rect
                            x={c * 22 + 4}
                            y={r * 22 + 4}
                            width="20"
                            height="20"
                            fill={val > 0 ? '#818cf8' : '#f8fafc'}
                            stroke={val > 0 ? '#312e81' : '#cbd5e1'}
                            strokeWidth="1.5"
                            rx="2"
                          />
                          {val > 0 && (
                            <text
                              x={c * 22 + 14}
                              y={r * 22 + 18}
                              textAnchor="middle"
                              className="text-[10px] font-black fill-white"
                            >
                              {val}
                            </text>
                          )}
                        </g>
                      ))
                    )}
                  </svg>
                  <div className="text-[11px] font-mono text-indigo-800 dark:text-indigo-300 mt-1">
                    Lefedett mezők: {grid.flat().filter(v => v > 0).length} / 9
                  </div>
                </div>

                {/* 3. Oldalnézet (jobbról) */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">3. Jobb oldalnézet</div>
                  <div className="text-[10px] text-slate-500 mb-2">Jobbról nézve (sorok max. magassága)</div>
                  <svg className="w-32 h-24 mx-auto" viewBox="0 0 96 72" fill="none">
                    {[0, 1, 2].map(col => {
                      const h = rightSideView[col];
                      return (
                        <g key={`side-${col}`}>
                          <rect x={col * 30 + 4} y="4" width="28" height="64" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                          {Array.from({ length: h }).map((_, step) => (
                            <rect
                              key={`cube-s-${col}-${step}`}
                              x={col * 30 + 4}
                              y={68 - (step + 1) * 20}
                              width="28"
                              height="20"
                              fill="#fbbf24"
                              stroke="#78350f"
                              strokeWidth="1.5"
                              rx="2"
                            />
                          ))}
                          <text x={col * 30 + 18} y="71" textAnchor="middle" className="text-[9px] font-bold fill-slate-400">
                            {col === 0 ? 'Elöl' : col === 1 ? 'Közép' : 'Hátul'}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                  <div className="text-[11px] font-mono text-amber-800 dark:text-amber-300 mt-1">
                    Magasságok: [{rightSideView.join(', ')}]
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. FÜL: KOCKAHÁLÓK ÉS SZEMKÖZTI LAPOK */}
        {activeTab === 'nets' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {NET_PRESETS.map((preset, idx) => (
                <Button
                  key={preset.name}
                  size="sm"
                  variant={selectedNetIndex === idx ? 'default' : 'outline'}
                  className={cn("text-xs font-bold", selectedNetIndex === idx && "bg-pink-600 text-white")}
                  onClick={() => setSelectedNetIndex(idx)}
                >
                  {preset.name}
                </Button>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-pink-200 dark:border-pink-900 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Kockaháló rajz */}
              <div className="md:col-span-7 flex flex-col items-center">
                <span className="text-xs font-bold text-slate-500 mb-2">
                  {NET_PRESETS[selectedNetIndex].type} típusú kockaháló (szemközti lapok azonos színnel):
                </span>

                <div className="grid grid-cols-4 gap-1.5 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  {NET_PRESETS[selectedNetIndex].grid.map((row, r) =>
                    row.map((val, c) => {
                      const pair = NET_PRESETS[selectedNetIndex].pairs.find(p => p.r === r && p.c === c);
                      if (val === 0) {
                        return <div key={`empty-${r}-${c}`} className="w-12 h-12" />;
                      }
                      return (
                        <div
                          key={`net-cell-${r}-${c}`}
                          className={cn(
                            "w-12 h-12 rounded-lg border-2 border-slate-800 flex flex-col items-center justify-center font-black text-sm shadow-sm transition-transform hover:scale-105",
                            pair?.color || "bg-pink-300"
                          )}
                        >
                          <span>{pair?.label}</span>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  A kockának összesen <strong>11 különböző kiterítése</strong> (hálója) létezik!
                </div>
              </div>

              {/* Magyarázat */}
              <div className="md:col-span-5 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {NET_PRESETS[selectedNetIndex].name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {NET_PRESETS[selectedNetIndex].desc}
                </p>

                <div className="p-3 bg-pink-50 dark:bg-pink-950/40 rounded-lg border border-pink-200 dark:border-pink-900 text-xs text-pink-950 dark:text-pink-200 space-y-1.5">
                  <div className="font-bold">Szemközti lapok alapszabálya:</div>
                  <div>• Két szemközti lap a hálóban <strong>sosem érintkezhet</strong> közös éllel!</div>
                  <div>• Egy egyenes 4-es sávban mindig a <strong>második szomszéd</strong> lesz a szemközti pár (pl. 1. és 3., illetve 2. és 4.).</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 1. SZEKCIÓ: KOCKAÉPÍTMÉNYEK ÉS KOCKÁK SZÁMLÁLÁSA */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-building-cubes"
        number={1}
        title="Kockaépítmények és a kockák számlálása"
        badge="Építés"
        badgeColor="pink"
      >
        <TheoryCard title="Hogyan számoljuk meg a testet alkotó kiskockákat?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Amikor egyenlő méretű kiskockákból (egységkockákból) építünk térbeli alakzatokat, fontos, hogy a <strong>takarásban lévő, nem látható kockákat is beleszámoljuk</strong>!
            Egy kocka a levegőben nem lebeghet: ha a második vagy harmadik szinten látsz egy kockát, alatta biztosan van még egy (vagy kettő) támasztó kocka.
          </p>

          <GeometryFigureGrid columns={3}>
            <GeometryFigureCard
              title="1. Rétegenkénti számlálás (szintek szerint)"
              figure={
                <svg className="w-24 h-16 mx-auto" viewBox="0 0 80 50" fill="none">
                  {/* Alsó szint: 4 kocka */}
                  {drawIsometricCube(30, 38, 10, { top: '#e2e8f0', left: '#cbd5e1', right: '#94a3b8', border: '#475569' })}
                  {drawIsometricCube(47, 28, 10, { top: '#e2e8f0', left: '#cbd5e1', right: '#94a3b8', border: '#475569' })}
                  {/* Felső szint: 1 kocka */}
                  {drawIsometricCube(30, 28, 10, { top: '#fbcfe8', left: '#f472b6', right: '#db2777', border: '#9d174d' })}
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Alulról felfelé haladunk: 1. emelet, 2. emelet, 3. emelet.',
                'Külön megszámoljuk, hány kocka van a földszinten, hány az emeleten.',
                'Végül a szintek kockaszámát összeadjuk.'
              ]}
              explanation="Példa: Alsó szint = 4 kocka, Felső szint = 1 kocka → Összesen 4 + 1 = 5 kocka."
            />

            <GeometryFigureCard
              title="2. Oszloponkénti számlálás (alaprajz szerint)"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 50" fill="none">
                  <rect x="5" y="5" width="22" height="22" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
                  <rect x="29" y="5" width="22" height="22" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
                  <rect x="5" y="29" width="22" height="22" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
                  <text x="16" y="20" textAnchor="middle" className="text-xs font-black fill-pink-900">2</text>
                  <text x="40" y="20" textAnchor="middle" className="text-xs font-black fill-pink-900">1</text>
                  <text x="16" y="44" textAnchor="middle" className="text-xs font-black fill-pink-900">1</text>
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Felülről lefelé nézve minden függőleges oszlopot egyetlen négyzet jelöl.',
                'A négyzetbe beírjuk, milyen magas az oszlop (hány kocka áll egymáson).',
                'Az összes szám összege adja a test teljes kockaszámát.'
              ]}
              explanation="Példa: 2 + 1 + 1 = 4 kocka összesen."
            />

            <GeometryFigureCard
              title="3. Kockatömb kiegészítése (hézag módszer)"
              figure={
                <svg className="w-24 h-16 mx-auto" viewBox="0 0 80 50" fill="none">
                  {/* Nagy 2x2x2-es kocka körvonala szaggatottan, benne hiány */}
                  <rect x="15" y="8" width="40" height="34" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
                  {drawIsometricCube(35, 30, 12, { top: '#fbcfe8', left: '#f472b6', right: '#db2777', border: '#9d174d' })}
                  <text x="58" y="26" className="text-[10px] font-bold fill-rose-600">Hiányzik!</text>
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Képzeletben kiegészítjük az építményt egy tömör téglatestté vagy kockává.',
                'Kiszámoljuk a teljes tömb kockaszámát (hosszúság · szélesség · magasság).',
                'Kivonjuk belőle a hiányzó („kivett”) kockák számát.'
              ]}
              explanation="Példa: Egy 2×2×2-es tömbhöz 8 kocka kellene. Ha 3 hiányzik, akkor 8 - 3 = 5 kockából áll az építmény."
            />
          </GeometryFigureGrid>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 2. SZEKCIÓ: A SZÁMOZOTT ALAPRAJZ */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-building-groundplan"
        number={2}
        title="A számozott alaprajz (Építési terv)"
        badge="Alaprajz"
        badgeColor="purple"
      >
        <TheoryCard title="Mi az a számozott alaprajz, és hogyan készítjük el?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A számozott alaprajz az építmény felülnézete, amelyben minden mezőbe beleírjuk az adott oszlopban lévő kockák darabszámát.
            Ez egy pontos <strong>„építési terv”</strong>: az alaprajz alapján bárki pontosan ugyanazt a testet tudja felépíteni.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800">
              <span className="text-xs font-bold text-purple-900 dark:text-purple-200 block mb-2">
                1. Kocka hozzáadása az építményhez
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ha egy oszlopra rátolsz még egy kockát, az alaprajzban az adott szám <strong>1-gyel növekszik</strong> (pl. 2-ből 3 lesz).
                Ha egy üres helyre teszel kockát, ott a 0 helyett egy új számozott négyzet (1) jelenik meg.
              </p>
            </div>

            <div className="p-3.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800">
              <span className="text-xs font-bold text-purple-900 dark:text-purple-200 block mb-2">
                2. Kocka elvétele az építményből
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Ha leveszel egy kockát, az adott oszlop száma <strong>1-gyel csökken</strong>.
                Ha egy 1 magasságú oszlopból veszed el az egyetlen kockát, az a mező üresre vált (eltűnik a felülnézetből).
              </p>
            </div>
          </div>

          <TheoryCallout variant="tip" title="Gyors ellenőrzési szabály">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az alaprajz számainak összege <strong>MINDIG megegyezik a kockák számával</strong>! Ha egy feladatban az alaprajz számai:
              <br />
              <span className="font-mono font-bold text-purple-800 dark:text-purple-200 block my-1">
                3 + 2 + 1 + 1 + 2 = 9
              </span>
              akkor az építmény pontosan <strong>9 kiskockából</strong> áll, egyetlen rejtett kocka sem veszhetett el.
            </p>
          </TheoryCallout>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 3. SZEKCIÓ: A HÁROMIRÁNYÚ VETÜLETI NÉZET */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-building-views"
        number={3}
        title="A háromirányú nézetek (Elöl-, felül-, oldalnézet)"
        badge="Nézetek"
        badgeColor="indigo"
      >
        <TheoryCard title="Hogyan látjuk a testet szemből, felülről és oldalról?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A térbeli testeket három egymásra merőleges irányból rajzoljuk le síkban. Ezt a mérnökök és építészek is így használják műszaki rajzokon:
          </p>

          <GeometryFigureGrid columns={3}>
            <GeometryFigureCard
              title="1. Elölnézet (Szemből)"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 50" fill="none">
                  <rect x="8" y="10" width="18" height="34" fill="#f472b6" stroke="#831843" strokeWidth="1.5" rx="1" />
                  <rect x="28" y="24" width="18" height="20" fill="#f472b6" stroke="#831843" strokeWidth="1.5" rx="1" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Pontosan szemből, vízszintesen nézünk a testre.',
                'Oszloponként csak a LEGMAGASABB kockaoszlop magasságát látjuk!',
                'Az egymás mögött álló kockák eltakarják a mögöttük lévő alacsonyabbakat.'
              ]}
              explanation="Szabály: Elölnézet oszlopmagassága = az adott oszlopban található számok maximuma."
            />

            <GeometryFigureCard
              title="2. Felülnézet (Fentről)"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 50" fill="none">
                  <rect x="8" y="8" width="18" height="18" fill="#818cf8" stroke="#312e81" strokeWidth="1.5" rx="1" />
                  <rect x="28" y="8" width="18" height="18" fill="#818cf8" stroke="#312e81" strokeWidth="1.5" rx="1" />
                  <rect x="8" y="28" width="18" height="18" fill="#818cf8" stroke="#312e81" strokeWidth="1.5" rx="1" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Pontosan felülről lefelé nézünk.',
                'Csak azt látjuk, hogy melyik mező foglalt (ahol magasság > 0).',
                'A magasságok számai nélkül ez a test alaprajzi kontúrja.'
              ]}
              explanation="Szabály: Minden olyan helyen négyzetet rajzolunk, ahol legalább 1 kocka van."
            />

            <GeometryFigureCard
              title="3. Oldalnézet (Jobbról vagy balról)"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 50" fill="none">
                  <rect x="8" y="24" width="18" height="20" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" rx="1" />
                  <rect x="28" y="10" width="18" height="34" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" rx="1" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                'Vízszintesen, oldalirányból nézünk a testre.',
                'A sorok maximális magasságát látjuk.',
                'Jobb oldalnézetnél a test elülső sora van a bal oldalon, a hátsó sora a jobb oldalon!'
              ]}
              explanation="Szabály: Oldalnézet oszlopmagassága = az adott sorban lévő számok maximuma."
            />
          </GeometryFigureGrid>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 4. SZEKCIÓ: KOCKAHÁLÓK ÉS KITERÍTÉSEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-building-nets"
        number={4}
        title="A kocka hálója (Kiterítés a síkba)"
        badge="Kockahálók"
        badgeColor="emerald"
      >
        <TheoryCard title="Mit nevezünk kockahálónak?">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            Ha egy papírkockát bizonyos élei mentén ollóval felvágunk úgy, hogy a lapjai egyben maradjanak, és a lapokat kiterítjük az asztalra, <strong>kockahálót</strong> kapunk.
            Egy kockának pontosan <strong>6 négyzetlapja</strong> van, ezért a kockaháló mindig 6 darab egybevágó négyzetből áll.
          </p>

          <TheoryTable
            headers={['Kockaháló típus', 'Hány ilyen háló van?', 'Elrendezés leírása', 'Példa forma']}
            rows={[
              ['1-4-1 típus', '6 darab', 'Középen 4 négyzet egy egyenes sávban, 1 fent, 1 lent.', 'T-alakzat, kereszt, lépcsős fül'],
              ['1-3-2 típus', '3 darab', 'Középen 3 négyzet egy sávban, egyik oldalon 1, a másikon 2 négyzet.', 'Lépcsős elrendezés'],
              ['2-2-2 típus', '1 darab', '3 darab 2 négyzetes sáv egymáshoz képest 1-1-gyel eltolva.', 'Z-alakzat (lépcső)'],
              ['3-3 típus', '1 darab', '2 darab 3 négyzetes sáv egymáshoz képest 1 négyzettel eltolva.', 'Kettős lépcső']
            ]}
          />

          <div className="mt-4 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200 mb-2">
              Összesen hány különböző kockaháló létezik?
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Forgatásoktól és tükrözésektől eltekintve pontosan <strong>6 + 3 + 1 + 1 = 11 különböző kockaháló</strong> létezik a világon!
              Bármelyiket vágod ki papírból, tökéletes kockává hajtogatható össze.
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 5. SZEKCIÓ: MÁS TESTEK HÁLÓI */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-building-other-nets"
        number={5}
        title="Téglatest, gúla, henger és prizma hálója"
        badge="Testek hálói"
        badgeColor="amber"
      >
        <TheoryCard title="Hogyan néz ki a többi geometriai test kiterített hálója?">
          <GeometryFigureGrid columns={4}>
            <GeometryFigureCard
              title="Téglatest hálója"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <rect x="8" y="14" width="10" height="12" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
                  <rect x="18" y="14" width="16" height="12" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
                  <rect x="34" y="14" width="10" height="12" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
                  <rect x="44" y="14" width="16" height="12" fill="#fed7aa" stroke="#c2410c" strokeWidth="1" />
                  <rect x="18" y="4" width="16" height="10" fill="#ffedd5" stroke="#c2410c" strokeWidth="1" />
                  <rect x="18" y="26" width="16" height="10" fill="#ffedd5" stroke="#c2410c" strokeWidth="1" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                '6 téglalap alkotja.',
                '3-féle méretű téglalappár (szemközti lapok egybevágók).',
                'Hasonló az 1-4-1 kockahálóhoz, de lapjai téglalapok.'
              ]}
              explanation="Téglatest lapjai = 6 db téglalap."
            />

            <GeometryFigureCard
              title="Négyzetes gúla hálója"
              figure={
                <svg className="w-18 h-16 mx-auto" viewBox="0 0 50 40" fill="none">
                  <rect x="17" y="12" width="16" height="16" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
                  <polygon points="25,2 17,12 33,12" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
                  <polygon points="25,38 17,28 33,28" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
                  <polygon points="7,20 17,12 17,28" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
                  <polygon points="43,20 33,12 33,28" fill="#fed7aa" stroke="#b45309" strokeWidth="1" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                '1 négyzet (alaplap) a közepén.',
                '4 egyenlő szárú háromszög (oldallapok/palást).',
                'Csillag alakú háló.'
              ]}
              explanation="Gúla lapjai = 1 négyzet + 4 háromszög."
            />

            <GeometryFigureCard
              title="Háromoldalú prizma"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <rect x="8" y="14" width="14" height="14" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1" />
                  <rect x="22" y="14" width="14" height="14" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1" />
                  <rect x="36" y="14" width="14" height="14" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1" />
                  <polygon points="29,4 22,14 36,14" fill="#c7d2fe" stroke="#4338ca" strokeWidth="1" />
                  <polygon points="29,38 22,28 36,28" fill="#c7d2fe" stroke="#4338ca" strokeWidth="1" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                '3 téglalap (palást) egymás mellett.',
                '2 egybevágó háromszög (alaplapok fent és lent).',
                'Összesen 5 lap határolja.'
              ]}
              explanation="Prizma lapjai = 3 téglalap + 2 háromszög."
            />

            <GeometryFigureCard
              title="Henger hálója"
              figure={
                <svg className="w-20 h-16 mx-auto" viewBox="0 0 60 40" fill="none">
                  <rect x="14" y="14" width="32" height="12" fill="#d1fae5" stroke="#047857" strokeWidth="1" />
                  <circle cx="30" cy="8" r="5" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
                  <circle cx="30" cy="32" r="5" fill="#a7f3d0" stroke="#047857" strokeWidth="1" />
                </svg>
              }
              figureHeight="h-16 sm:h-20 min-h-0"
              properties={[
                '1 nagy téglalap (palást kiterítve).',
                '2 egyforma körlap (alap- és fedőlap).',
                'A téglalap hossza = a kör kerülete.'
              ]}
              explanation="Henger hálója = 1 téglalap + 2 körlap."
            />
          </GeometryFigureGrid>
        </TheoryCard>
      </TheorySection>

      {/* ======================================================== */}
      {/* 6. SZEKCIÓ: GYAKORI CSAPDÁK ÉS TÉVHITEK */}
      {/* ======================================================== */}
      <TheorySection
        id="geom-building-traps"
        number={6}
        title="Gyakori hibák és tévhitek a testeknél"
        badge="Csapdák"
        badgeColor="rose"
      >
        <TheoryTrapBox
          traps={[
            {
              title: '1. Csapda: A takarásban lévő, rejtett kockák elfelejtése',
              wrong: 'Csak a közvetlenül látható felületek kockáit megszámolni.',
              correct: 'A felsőbb szinteken lévő kockák alatt MINDIG van alátámasztó kocka! Az oszlopmagasságokat vagy a számozott alaprajzot kell alapul venni.',
              explanation: 'A kockák nem lebegnek a levegőben. Ha a 3. szinten van egy kocka, az alatt még 2 kocka van.'
            },
            {
              title: '2. Csapda: „Minden 6 négyzetből álló alakzat kockaháló” tévhit',
              wrong: 'Azt hinni, hogy bármilyen 6 egymáshoz tapadó négyzetből kockát lehet hajtogatni.',
              correct: 'Csak a 11 szabályos kockaháló hajtható össze! Ha van benne 2×2-es négyzettömb, vagy egy oldalon 2 fül van a szemközti oldal helyett, a lapok egymásra torlódnak vagy átfedik egymást.',
              explanation: 'Egy csúcsban sosem találkozhat 4 négyzet, mert akkor egy lap fedné a másikat.'
            },
            {
              title: '3. Csapda: Nézeteknél a takarás elfelejtése',
              wrong: 'Azt hinni, hogy az elölnézetben minden oszlop összes kockája látszik.',
              correct: 'Az elölnézetben oszloponként CSAK a legmagasabb kockaoszlop látszik, a mögötte vagy előtte lévő alacsonyabbak eltűnnek a takarásban.',
              explanation: 'Például ha egy oszlopban elöl 1, mögötte 3 kocka áll, szemből pontosan 3 kocka magas oszlopot látunk.'
            },
            {
              title: '4. Csapda: Jobb és bal oldalnézet felcserélése',
              wrong: 'Oldalnézetnél ugyanúgy nézni a sorrendet, mint szemből.',
              correct: 'Amikor jobbról nézünk az építményre, a test elülső sora a bal kezünk felé esik, a hátsó sora pedig a jobb kezünk felé!',
              explanation: 'Képzeld el, hogy a test jobb oldalához lépsz: ami feléd volt (elülső sor), az most balra látható.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default BuildingTheory;
