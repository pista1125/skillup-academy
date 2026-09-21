import React, { useState } from 'react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import { RotateCcw, Sparkles, CheckCircle2, MoveRight, Eye } from 'lucide-react';

// =========================================================================
// 1. NEVEZETES SÍKIDOMOK SZIMMETRIATENGELYEI (OVERVIEW DIAGRAM)
// =========================================================================
export const SymmetryAxesOverviewDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <svg
        viewBox="0 0 580 320"
        className={`w-full max-w-2xl h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Sor: 0, 1, 2, 3 tengely */}
        
        {/* 1. Általános háromszög (0 tengely) */}
        <g transform="translate(15, 20)">
          <rect width="125" height="125" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <polygon points="25,95 105,95 85,25" fill="rgba(100, 116, 139, 0.15)" stroke="#64748b" strokeWidth="2" />
          <text x="62" y="112" textAnchor="middle" className="text-[10px] font-black fill-slate-700 dark:fill-slate-300 font-sans">Általános △</text>
          <text x="62" y="122" textAnchor="middle" className="text-[9px] font-bold fill-rose-500">0 tengely</text>
        </g>

        {/* 2. Egyenlő szárú háromszög (1 tengely) */}
        <g transform="translate(155, 20)">
          <rect width="125" height="125" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <polygon points="25,95 100,95 62.5,25" fill="rgba(2, 132, 199, 0.15)" stroke="#0284c7" strokeWidth="2" />
          {/* Szimmetriatengely */}
          <line x1="62.5" y1="15" x2="62.5" y2="105" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
          <text x="62" y="112" textAnchor="middle" className="text-[10px] font-black fill-slate-700 dark:fill-slate-300 font-sans">Egyenlő szárú △</text>
          <text x="62" y="122" textAnchor="middle" className="text-[9px] font-bold fill-sky-600">1 tengely</text>
        </g>

        {/* 3. Téglalap (2 tengely) */}
        <g transform="translate(295, 20)">
          <rect width="125" height="125" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <rect x="25" y="40" width="75" height="50" fill="rgba(139, 92, 246, 0.15)" stroke="#8b5cf6" strokeWidth="2" />
          {/* 2 Szimmetriatengely (oldalfelezők) */}
          <line x1="62.5" y1="25" x2="62.5" y2="105" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 3" />
          <line x1="15" y1="65" x2="110" y2="65" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 3" />
          <text x="62" y="112" textAnchor="middle" className="text-[10px] font-black fill-slate-700 dark:fill-slate-300 font-sans">Téglalap</text>
          <text x="62" y="122" textAnchor="middle" className="text-[9px] font-bold fill-violet-600">2 tengely (oldalfelezők)</text>
        </g>

        {/* 4. Szabályos háromszög (3 tengely) */}
        <g transform="translate(435, 20)">
          <rect width="125" height="125" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <polygon points="25,95 100,95 62.5,30" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="2" />
          {/* 3 Szimmetriatengely */}
          <line x1="62.5" y1="18" x2="62.5" y2="105" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="18" y1="100" x2="95" y2="55" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="107" y1="100" x2="30" y2="55" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="62" y="112" textAnchor="middle" className="text-[10px] font-black fill-slate-700 dark:fill-slate-300 font-sans">Szabályos △</text>
          <text x="62" y="122" textAnchor="middle" className="text-[9px] font-bold fill-emerald-600">3 tengely</text>
        </g>

        {/* 2. Sor: 4, 6, végtelen tengely és rombusz */}
        
        {/* 5. Négyzet (4 tengely) */}
        <g transform="translate(15, 165)">
          <rect width="125" height="135" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <rect x="32" y="32" width="60" height="60" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
          {/* 4 tengely (2 oldalfelező + 2 átló) */}
          <line x1="62" y1="18" x2="62" y2="106" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="18" y1="62" x2="106" y2="62" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="22" y1="22" x2="102" y2="102" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="102" y1="22" x2="22" y2="102" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="62" y="118" textAnchor="middle" className="text-[10px] font-black fill-slate-700 dark:fill-slate-300 font-sans">Négyzet</text>
          <text x="62" y="128" textAnchor="middle" className="text-[9px] font-bold fill-amber-600">4 tengely (2 átló + 2 ofm)</text>
        </g>

        {/* 6. Rombusz (2 tengely: átlók) */}
        <g transform="translate(155, 165)">
          <rect width="125" height="135" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <polygon points="62.5,25 105,62.5 62.5,100 20,62.5" fill="rgba(236, 72, 153, 0.15)" stroke="#ec4899" strokeWidth="2" />
          {/* 2 átló szimmetriatengely */}
          <line x1="62.5" y1="12" x2="62.5" y2="112" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 3" />
          <line x1="10" y1="62.5" x2="115" y2="62.5" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 3" />
          <text x="62" y="118" textAnchor="middle" className="text-[10px] font-black fill-slate-700 dark:fill-slate-300 font-sans">Rombusz</text>
          <text x="62" y="128" textAnchor="middle" className="text-[9px] font-bold fill-pink-600">2 tengely (átlók!)</text>
        </g>

        {/* 7. Szabályos hatszög (6 tengely) */}
        <g transform="translate(295, 165)">
          <rect width="125" height="135" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <polygon points="40,35 85,35 105,62.5 85,90 40,90 20,62.5" fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" />
          {/* Főátlók */}
          <line x1="10" y1="62.5" x2="115" y2="62.5" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="30" y1="20" x2="95" y2="105" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="95" y1="20" x2="30" y2="105" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="62" y="118" textAnchor="middle" className="text-[10px] font-black fill-slate-700 dark:fill-slate-300 font-sans">Szabályos hatszög</text>
          <text x="62" y="128" textAnchor="middle" className="text-[9px] font-bold fill-cyan-600">6 tengely (n-szög: n db)</text>
        </g>

        {/* 8. Kör (Végtelen sok tengely) */}
        <g transform="translate(435, 165)">
          <rect width="125" height="135" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <circle cx="62.5" cy="62.5" r="38" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="2" />
          {/* Átmérők */}
          <line x1="62.5" y1="12" x2="62.5" y2="112" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="12" y1="62.5" x2="112" y2="62.5" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="26" y1="26" x2="98" y2="98" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="98" y1="26" x2="26" y2="98" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="62" y="118" textAnchor="middle" className="text-[10px] font-black fill-slate-700 dark:fill-slate-300 font-sans">Kör</text>
          <text x="62" y="128" textAnchor="middle" className="text-[9px] font-bold fill-purple-600">Végtelen sok (átmérők)</text>
        </g>
      </svg>
      <p className="text-xs text-center text-slate-500 max-w-lg">
        <strong>Tengelyesen szimmetrikus alakzat:</strong> ha létezik olyan <MathText>t</MathText> egyenes, amelyre tükrözve az alakzat <strong>önmagába megy át</strong>. Szabályos <MathText>n</MathText>-szögeknek mindig <MathText>n</MathText> szimmetriatengelye van.
      </p>
    </div>
  );
};

// =========================================================================
// 2. BETŰK ÉS SZIMBÓLUMOK SZIMMETRIÁJA (LETTERS SYMMETRY DIAGRAM)
// =========================================================================
export const LetterSymmetryDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <svg
        viewBox="0 0 540 200"
        className={`w-full max-w-xl h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 1. Függőleges szimmetriatengelyű betűk (A, M, T, Y) */}
        <g transform="translate(15, 20)">
          <rect width="160" height="160" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <text x="80" y="24" textAnchor="middle" className="text-xs font-black fill-sky-700 dark:fill-sky-300 font-sans">Függőleges tengely</text>
          <g transform="translate(15, 45)" className="text-3xl font-black fill-slate-800 dark:fill-white font-mono">
            <text x="20" y="45">A</text>
            <text x="80" y="45">M</text>
            <text x="20" y="95">T</text>
            <text x="80" y="95">Y</text>
            {/* Függőleges szimmetriatengely vonalak */}
            <line x1="28" y1="15" x2="28" y2="52" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="92" y1="15" x2="92" y2="52" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="28" y1="65" x2="28" y2="102" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="88" y1="65" x2="88" y2="102" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        </g>

        {/* 2. Vízszintes szimmetriatengelyű betűk (B, C, D, E, K) */}
        <g transform="translate(190, 20)">
          <rect width="160" height="160" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <text x="80" y="24" textAnchor="middle" className="text-xs font-black fill-emerald-700 dark:fill-emerald-300 font-sans">Vízszintes tengely</text>
          <g transform="translate(15, 45)" className="text-3xl font-black fill-slate-800 dark:fill-white font-mono">
            <text x="20" y="45">B</text>
            <text x="80" y="45">C</text>
            <text x="20" y="95">D</text>
            <text x="80" y="95">E</text>
            {/* Vízszintes szimmetriatengely vonalak */}
            <line x1="12" y1="34" x2="42" y2="34" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="72" y1="34" x2="102" y2="34" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="12" y1="84" x2="42" y2="84" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="72" y1="84" x2="102" y2="84" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        </g>

        {/* 3. Mindkét tengellyel rendelkező betűk (H, I, O, X) */}
        <g transform="translate(365, 20)">
          <rect width="160" height="160" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <text x="80" y="24" textAnchor="middle" className="text-xs font-black fill-purple-700 dark:fill-purple-300 font-sans">Mindkét tengely (2 db)</text>
          <g transform="translate(15, 45)" className="text-3xl font-black fill-slate-800 dark:fill-white font-mono">
            <text x="20" y="45">H</text>
            <text x="80" y="45">I</text>
            <text x="20" y="95">O</text>
            <text x="80" y="95">X</text>
            {/* Kettős tengelyek */}
            <line x1="28" y1="15" x2="28" y2="52" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="12" y1="34" x2="44" y2="34" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="88" y1="15" x2="88" y2="52" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="74" y1="34" x2="102" y2="34" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="28" y1="65" x2="28" y2="102" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="12" y1="84" x2="44" y2="84" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="88" y1="65" x2="88" y2="102" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="74" y1="84" x2="102" y2="84" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        </g>
      </svg>
      <p className="text-xs text-center text-slate-500 max-w-md">
        <strong>A betűk szimmetriája:</strong> A betűk alakjától függően lehetnek csak függőleges (<MathText>A, M, T</MathText>), csak vízszintes (<MathText>B, C, D</MathText>), mindkét irányban (<MathText>H, I, O, X</MathText>) vagy nem szimmetrikusak (<MathText>F, G, J, P, R</MathText>).
      </p>
    </div>
  );
};

// =========================================================================
// 3. INTERAKTÍV SZIMMETRIATENGELY SZIMULÁTOR
// =========================================================================
export const InteractiveSymmetryExplorer: React.FC<{ className?: string }> = ({ className }) => {
  const [selectedShape, setSelectedShape] = useState<'isosceles' | 'rectangle' | 'rhombus' | 'equilateral' | 'square'>('square');
  const [showAxes, setShowAxes] = useState(true);

  const shapesConfig: Record<string, { title: string; axesCount: number; desc: string }> = {
    isosceles: { title: 'Egyenlő szárú háromszög', axesCount: 1, desc: '1 szimmetriatengely: az alaphoz tartozó magasságvonal / szögfelező.' },
    rectangle: { title: 'Téglalap', axesCount: 2, desc: '2 szimmetriatengely: a szemközti oldalak felezőmerőlegesei (az átlók NEM tengelyek!).' },
    rhombus: { title: 'Rombusz', axesCount: 2, desc: '2 szimmetriatengely: a két átlója (merőlegesen felezik egymást).' },
    equilateral: { title: 'Szabályos háromszög', axesCount: 3, desc: '3 szimmetriatengely: a 3 oldalfelező merőleges (amelyek egyben szögfelezők is).' },
    square: { title: 'Négyzet', axesCount: 4, desc: '4 szimmetriatengely: 2 oldalfelező merőleges + 2 átló.' }
  };

  const current = shapesConfig[selectedShape];

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md flex flex-col items-center gap-4 ${className || ''}`}>
      <div className="w-full flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h4 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-violet-500" />
            Interaktív Szimmetriatengely Vizsgáló
          </h4>
          <p className="text-xs text-slate-500">Válassz síkidomot a szimmetriatengelyek megszámlálásához!</p>
        </div>

        {/* Alakzat választó gombok */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <Button
            size="sm"
            variant={selectedShape === 'isosceles' ? 'default' : 'ghost'}
            onClick={() => setSelectedShape('isosceles')}
            className={`h-7 px-2 text-xs font-bold rounded-lg ${selectedShape === 'isosceles' ? 'bg-violet-600 text-white' : ''}`}
          >
            Egyenlő szárú △
          </Button>
          <Button
            size="sm"
            variant={selectedShape === 'rectangle' ? 'default' : 'ghost'}
            onClick={() => setSelectedShape('rectangle')}
            className={`h-7 px-2 text-xs font-bold rounded-lg ${selectedShape === 'rectangle' ? 'bg-violet-600 text-white' : ''}`}
          >
            Téglalap
          </Button>
          <Button
            size="sm"
            variant={selectedShape === 'rhombus' ? 'default' : 'ghost'}
            onClick={() => setSelectedShape('rhombus')}
            className={`h-7 px-2 text-xs font-bold rounded-lg ${selectedShape === 'rhombus' ? 'bg-violet-600 text-white' : ''}`}
          >
            Rombusz
          </Button>
          <Button
            size="sm"
            variant={selectedShape === 'equilateral' ? 'default' : 'ghost'}
            onClick={() => setSelectedShape('equilateral')}
            className={`h-7 px-2 text-xs font-bold rounded-lg ${selectedShape === 'equilateral' ? 'bg-violet-600 text-white' : ''}`}
          >
            Szabályos △
          </Button>
          <Button
            size="sm"
            variant={selectedShape === 'square' ? 'default' : 'ghost'}
            onClick={() => setSelectedShape('square')}
            className={`h-7 px-2 text-xs font-bold rounded-lg ${selectedShape === 'square' ? 'bg-violet-600 text-white' : ''}`}
          >
            Négyzet
          </Button>
        </div>
      </div>

      {/* SVG Alakzat megjelenítés */}
      <div className="w-full flex justify-center">
        <svg viewBox="0 0 320 220" className="w-full max-w-sm h-auto select-none rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
          {/* 1. Egyenlő szárú △ */}
          {selectedShape === 'isosceles' && (
            <>
              <polygon points="60,180 260,180 160,35" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2.5" />
              {showAxes && (
                <line x1="160" y1="15" x2="160" y2="205" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 3" />
              )}
            </>
          )}

          {/* 2. Téglalap */}
          {selectedShape === 'rectangle' && (
            <>
              <rect x="50" y="55" width="220" height="110" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2.5" />
              {showAxes && (
                <>
                  <line x1="160" y1="25" x2="160" y2="195" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 3" />
                  <line x1="25" y1="110" x2="295" y2="110" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 3" />
                </>
              )}
            </>
          )}

          {/* 3. Rombusz */}
          {selectedShape === 'rhombus' && (
            <>
              <polygon points="160,25 270,110 160,195 50,110" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2.5" />
              {showAxes && (
                <>
                  <line x1="160" y1="10" x2="160" y2="210" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 3" />
                  <line x1="30" y1="110" x2="290" y2="110" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5 3" />
                </>
              )}
            </>
          )}

          {/* 4. Szabályos △ */}
          {selectedShape === 'equilateral' && (
            <>
              <polygon points="60,180 260,180 160,20" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2.5" />
              {showAxes && (
                <>
                  <line x1="160" y1="10" x2="160" y2="195" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                  <line x1="45" y1="190" x2="225" y2="85" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                  <line x1="275" y1="190" x2="95" y2="85" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                </>
              )}
            </>
          )}

          {/* 5. Négyzet */}
          {selectedShape === 'square' && (
            <>
              <rect x="80" y="30" width="160" height="160" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2.5" />
              {showAxes && (
                <>
                  <line x1="160" y1="15" x2="160" y2="205" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                  <line x1="60" y1="110" x2="260" y2="110" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                  <line x1="65" y1="15" x2="255" y2="205" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                  <line x1="255" y1="15" x2="65" y2="205" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" />
                </>
              )}
            </>
          )}
        </svg>
      </div>

      {/* Magyarázó sáv */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <div>
          <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>{current.title}:</span>
            <span className="px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-extrabold text-[11px]">
              {current.axesCount} szimmetriatengely
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">{current.desc}</div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowAxes(!showAxes)}
          className={`h-8 px-3 text-xs font-bold rounded-lg shrink-0 ${showAxes ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40 text-violet-700' : ''}`}
        >
          <Eye className="w-3.5 h-3.5 mr-1.5" />
          {showAxes ? 'Tengelyek elrejtése' : 'Tengelyek mutatása'}
        </Button>
      </div>
    </div>
  );
};

// =========================================================================
// 4. MINI ÁBRÁK KVÍZHEZ, PÁROSÍTÓHOZ ÉS CSOPORTOSÍTÓHOZ
// =========================================================================
export type MiniSymFigType =
  | 'zero_axes'
  | 'one_axis'
  | 'two_axes'
  | 'three_axes'
  | 'four_axes'
  | 'five_axes'
  | 'six_axes'
  | 'eight_axes'
  | 'nine_axes'
  | 'twelve_axes'
  | 'infinite_axes'
  | 'rhombus_axes'
  | 'deltoid'
  | 'isosceles_trapezoid'
  | 'general_trapezoid'
  | 'parallelogram'
  | 'right_triangle'
  | 'semicircle'
  | 'concentric_rings'
  | 'snowflake'
  | 'natural_butterfly'
  | 'letter_vertical'
  | 'letter_horizontal'
  | 'letter_both'
  | 'letter_a'
  | 'letter_m'
  | 'letter_t'
  | 'letter_v'
  | 'letter_b'
  | 'letter_c'
  | 'letter_e'
  | 'letter_h'
  | 'letter_x'
  | 'letter_o'
  | 'letter_f'
  | 'letter_p'
  | 'letter_s'
  | 'letter_z'
  | 'number_8';

export const AxialSymmetryMiniFigure: React.FC<{ type: MiniSymFigType; className?: string }> = ({
  type,
  className
}) => {
  return (
    <div className={`flex items-center justify-center p-0.5 rounded-lg bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shrink-0 ${className || ''}`}>
      <svg viewBox="0 0 100 58" className="w-18 h-11 select-none">
        {/* 1. 0 tengely: Általános háromszög */}
        {(type === 'zero_axes' || type === 'right_triangle') && (
          <>
            <polygon points="18,48 84,48 70,12" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2" />
            <text x="50" y="55" textAnchor="middle" className="text-[7px] font-black fill-rose-600">0 tengely</text>
          </>
        )}

        {/* 2. 1 tengely: Egyenlő szárú △ */}
        {type === 'one_axis' && (
          <>
            <polygon points="22,46 78,46 50,10" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="2" />
            <line x1="50" y1="6" x2="50" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">1 tengely</text>
          </>
        )}

        {/* 3. 2 tengely: Téglalap */}
        {type === 'two_axes' && (
          <>
            <rect x="20" y="14" width="60" height="30" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2" />
            <line x1="50" y1="6" x2="50" y2="52" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="12" y1="29" x2="88" y2="29" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-violet-700">2 tengely</text>
          </>
        )}

        {/* 4. 3 tengely: Szabályos △ */}
        {type === 'three_axes' && (
          <>
            <polygon points="22,46 78,46 50,8" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
            <line x1="50" y1="4" x2="50" y2="50" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="16" y1="48" x2="70" y2="22" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="84" y1="48" x2="30" y2="22" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">3 tengely</text>
          </>
        )}

        {/* 5. 4 tengely: Négyzet */}
        {type === 'four_axes' && (
          <>
            <rect x="28" y="8" width="44" height="40" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
            <line x1="50" y1="4" x2="50" y2="52" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="18" y1="28" x2="82" y2="28" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="22" y1="4" x2="78" y2="52" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="78" y1="4" x2="22" y2="52" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-amber-700">4 tengely</text>
          </>
        )}

        {/* 6. 5 tengely: Szabályos ötszög */}
        {type === 'five_axes' && (
          <>
            <polygon points="50,8 82,28 70,48 30,48 18,28" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2" />
            <line x1="50" y1="4" x2="50" y2="52" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-pink-700">5 tengely</text>
          </>
        )}

        {/* 7. 6 tengely: Szabályos hatszög */}
        {type === 'six_axes' && (
          <>
            <polygon points="32,12 68,12 84,28 68,44 32,44 16,28" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="1.8" />
            <line x1="10" y1="28" x2="90" y2="28" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="24" y1="6" x2="76" y2="50" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="76" y1="6" x2="24" y2="50" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-cyan-700">6 tengely</text>
          </>
        )}

        {/* 8. 8 tengely: Szabályos nyolcszög */}
        {type === 'eight_axes' && (
          <>
            <polygon points="36,8 64,8 82,24 82,34 64,48 36,48 18,34 18,24" fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="1.8" />
            <line x1="50" y1="4" x2="50" y2="52" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="12" y1="28" x2="88" y2="28" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-indigo-700">8 tengely</text>
          </>
        )}

        {/* 9. 9 vagy 12 tengely */}
        {(type === 'nine_axes' || type === 'twelve_axes') && (
          <>
            <circle cx="50" cy="26" r="20" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="1.8" strokeDasharray="4 2" />
            <line x1="50" y1="4" x2="50" y2="48" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="28" y1="26" x2="72" y2="26" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">{type === 'nine_axes' ? '9 tengely' : '12 tengely'}</text>
          </>
        )}

        {/* 10. Végtelen sok tengely: Kör */}
        {type === 'infinite_axes' && (
          <>
            <circle cx="50" cy="26" r="20" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2" />
            <line x1="50" y1="4" x2="50" y2="48" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="26" y1="26" x2="74" y2="26" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="33" y1="9" x2="67" y2="43" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">∞ tengely</text>
          </>
        )}

        {/* 11. Rombusz tengelyei (átlók) */}
        {type === 'rhombus_axes' && (
          <>
            <polygon points="50,6 84,27 50,48 16,27" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" strokeWidth="2" />
            <line x1="50" y1="2" x2="50" y2="52" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="10" y1="27" x2="90" y2="27" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-pink-700">2 átló</text>
          </>
        )}

        {/* 12. Deltoid */}
        {type === 'deltoid' && (
          <>
            <polygon points="50,6 78,20 50,50 22,20" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
            <line x1="50" y1="2" x2="50" y2="54" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-amber-700">1 átló</text>
          </>
        )}

        {/* 13. Egyenlő szárú trapéz */}
        {type === 'isosceles_trapezoid' && (
          <>
            <polygon points="32,12 68,12 82,46 18,46" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="2" />
            <line x1="50" y1="6" x2="50" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">1 tengely</text>
          </>
        )}

        {/* 14. Általános paralelogramma (0 tengely) */}
        {type === 'parallelogram' && (
          <>
            <polygon points="30,12 82,12 70,44 18,44" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-black fill-rose-600">0 tengely (aszimm.)</text>
          </>
        )}

        {/* 15. Általános trapéz (0 tengely) */}
        {type === 'general_trapezoid' && (
          <>
            <polygon points="34,12 66,12 84,44 20,44" fill="rgba(100, 116, 139, 0.2)" stroke="#64748b" strokeWidth="2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-black fill-rose-600">0 tengely</text>
          </>
        )}

        {/* 16. Félkör */}
        {type === 'semicircle' && (
          <>
            <path d="M 22 42 A 28 28 0 0 1 78 42 Z" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" strokeWidth="2" />
            <line x1="50" y1="8" x2="50" y2="48" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-violet-700">1 tengely</text>
          </>
        )}

        {/* 17. Koncentrikus körgyűrű */}
        {type === 'concentric_rings' && (
          <>
            <circle cx="50" cy="26" r="22" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="2" />
            <circle cx="50" cy="26" r="12" fill="white" stroke="#10b981" strokeWidth="1.5" className="dark:fill-slate-900" />
            <line x1="50" y1="2" x2="50" y2="50" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="24" y1="26" x2="76" y2="26" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">∞ tengely</text>
          </>
        )}

        {/* 18. Hópehely */}
        {type === 'snowflake' && (
          <>
            <g transform="translate(50, 25)" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round">
              <line x1="0" y1="-18" x2="0" y2="18" />
              <line x1="-15" y1="-9" x2="15" y2="9" />
              <line x1="-15" y1="9" x2="15" y2="-9" />
              <circle cx="0" cy="0" r="3" fill="#06b6d4" />
            </g>
            <text x="50" y="55" textAnchor="middle" className="text-[7px] font-bold fill-cyan-700">6 tengely</text>
          </>
        )}

        {/* 19. Pillangó */}
        {type === 'natural_butterfly' && (
          <>
            <path d="M 50 25 Q 30 8 24 20 Q 20 34 50 30 Q 26 36 32 44 Q 40 48 50 32 Z" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" strokeWidth="1.5" />
            <path d="M 50 25 Q 70 8 76 20 Q 80 34 50 30 Q 74 36 68 44 Q 60 48 50 32 Z" fill="rgba(244, 63, 94, 0.25)" stroke="#f43f5e" strokeWidth="1.5" />
            <line x1="50" y1="4" x2="50" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="56" textAnchor="middle" className="text-[7px] font-bold fill-rose-600">Pillangó (1 tengely)</text>
          </>
        )}

        {/* 20. Betűk: Függőleges (A, M, T, V) */}
        {(type === 'letter_vertical' || type === 'letter_a') && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">A</text>
            <line x1="50" y1="6" x2="50" y2="44" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">Függőleges</text>
          </>
        )}
        {type === 'letter_m' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">M</text>
            <line x1="50" y1="6" x2="50" y2="44" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">Függőleges</text>
          </>
        )}
        {type === 'letter_t' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">T</text>
            <line x1="50" y1="6" x2="50" y2="44" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">Függőleges</text>
          </>
        )}
        {type === 'letter_v' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">V</text>
            <line x1="50" y1="6" x2="50" y2="44" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">Függőleges</text>
          </>
        )}

        {/* 21. Betűk: Vízszintes (B, C, E) */}
        {(type === 'letter_horizontal' || type === 'letter_b') && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">B</text>
            <line x1="28" y1="26" x2="72" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">Vízszintes</text>
          </>
        )}
        {type === 'letter_c' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">C</text>
            <line x1="28" y1="26" x2="72" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">Vízszintes</text>
          </>
        )}
        {type === 'letter_e' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">E</text>
            <line x1="28" y1="26" x2="72" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">Vízszintes</text>
          </>
        )}

        {/* 22. Betűk: Mindkettő (H, X, O) és 8-as */}
        {(type === 'letter_both' || type === 'letter_h') && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">H</text>
            <line x1="50" y1="6" x2="50" y2="44" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="28" y1="26" x2="72" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">Mindkettő (2 db)</text>
          </>
        )}
        {type === 'letter_x' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">X</text>
            <line x1="50" y1="6" x2="50" y2="44" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="28" y1="26" x2="72" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">Mindkettő (2 db)</text>
          </>
        )}
        {type === 'letter_o' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">O</text>
            <line x1="50" y1="6" x2="50" y2="44" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="28" y1="26" x2="72" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">Mindkettő (2 db)</text>
          </>
        )}
        {type === 'number_8' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">8</text>
            <line x1="50" y1="6" x2="50" y2="44" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="28" y1="25" x2="72" y2="25" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">2 tengely (8)</text>
          </>
        )}

        {/* 23. Aszimmetrikus betűk (F, P, S, Z) */}
        {type === 'letter_f' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">F</text>
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-black fill-rose-600">0 tengely (aszimm.)</text>
          </>
        )}
        {type === 'letter_p' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">P</text>
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-black fill-rose-600">0 tengely (aszimm.)</text>
          </>
        )}
        {type === 'letter_s' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">S</text>
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-black fill-rose-600">0 tengely (nincs)</text>
          </>
        )}
        {type === 'letter_z' && (
          <>
            <text x="50" y="38" textAnchor="middle" className="text-2xl font-black fill-slate-800 dark:fill-white font-mono">Z</text>
            <text x="50" y="54" textAnchor="middle" className="text-[7px] font-black fill-rose-600">0 tengely (nincs)</text>
          </>
        )}
      </svg>
    </div>
  );
};

