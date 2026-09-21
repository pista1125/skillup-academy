import React, { useState } from 'react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import { RotateCcw, Sparkles, CheckCircle2, ShieldAlert, Eye, Compass, Layers } from 'lucide-react';

// =========================================================================
// 1. INTERAKTÍV ALAKZAT ÉS TENGELY VIZSGÁLÓ (INTERACTIVE SYMMETRY EXPLORER)
// =========================================================================
export const InteractiveSymmetricShapesExplorer: React.FC<{ className?: string }> = ({ className }) => {
  const [selectedShape, setSelectedShape] = useState<
    'isosceles_triangle' | 'equilateral_triangle' | 'deltoid' | 'isosceles_trapezoid' | 'rectangle' | 'rhombus' | 'square' | 'regular_hexagon'
  >('isosceles_triangle');
  const [showAxes, setShowAxes] = useState(true);
  const [showAngles, setShowAngles] = useState(true);
  const [showDiagonals, setShowDiagonals] = useState(true);

  const shapesData = {
    isosceles_triangle: {
      name: 'Egyenlő szárú háromszög',
      category: 'Háromszög',
      axesCount: 1,
      desc: '1 szimmetriatengelye van (az alaphoz tartozó felezőmerőleges, magasság és szögfelező). Az alapon fekvő szögek egyenlők (α = β), a két szár egyenlő (a = b).',
      properties: [
        { label: 'Tengelyek száma', value: '1 tengely (t₁: alap felezőmerőlegese)' },
        { label: 'Oldalak', value: 'a = b (2 egyenlő szár)' },
        { label: 'Szögek', value: 'α = β (alapon fekvő szögek egyenlők)' },
        { label: 'Nevezetes vonal', value: 'm_c = f_γ = f_c (egybeesnek)' }
      ]
    },
    equilateral_triangle: {
      name: 'Szabályos (egyenlő oldalú) háromszög',
      category: 'Háromszög',
      axesCount: 3,
      desc: '3 szimmetriatengelye van (a 3 oldalfelező merőleges, amelyek egyben szögfelezők és magasságok is). Minden oldala egyenlő, minden belső szöge pontosan 60°.',
      properties: [
        { label: 'Tengelyek száma', value: '3 tengely (mindhárom csúcson át)' },
        { label: 'Oldalak', value: 'a = b = c (mindhárom oldal egyenlő)' },
        { label: 'Szögek', value: 'α = β = γ = 60°' },
        { label: 'Metszéspont', value: 'A 3 tengely a súlypontban metszi egymást' }
      ]
    },
    deltoid: {
      name: 'Deltoid',
      category: 'Négyszög',
      axesCount: 1,
      desc: '1 szimmetriatengelye van: a szimmetriaátlója (e). Átlói merőlegesek egymásra (e ⊥ f), a szimmetriaátló felezi a másik átlót és felezi a két szemközti belső szöget.',
      properties: [
        { label: 'Tengelyek száma', value: '1 tengely (e szimmetriaátló)' },
        { label: 'Oldalak', value: '2-2 szomszédos oldal egyenlő (a = d, b = c)' },
        { label: 'Átlók', value: 'e ⊥ f, és e felezi f-et' },
        { label: 'Szögek', value: '2 szemközti szög egyenlő (β = δ)' }
      ]
    },
    isosceles_trapezoid: {
      name: 'Szimmetrikus trapéz (húrtrapéz)',
      category: 'Négyszög',
      axesCount: 1,
      desc: '1 szimmetriatengelye van: a párhuzamos alapok közös felezőmerőlegese. A szárak egyenlő hosszúak, az alapon fekvő szögek egyenlők, az átlói egyenlő hosszúak (e = f).',
      properties: [
        { label: 'Tengelyek száma', value: '1 tengely (alapok közös felezőmerőlegese)' },
        { label: 'Oldalak', value: 'a || c (alapok), b = d (egyenlő szárak)' },
        { label: 'Szögek', value: 'α = β és γ = δ (alapon fekvő szögek egyenlők)' },
        { label: 'Átlók', value: 'e = f (átlói egyenlő hosszúak!)' }
      ]
    },
    rectangle: {
      name: 'Téglalap',
      category: 'Négyszög',
      axesCount: 2,
      desc: '2 szimmetriatengelye van: a szemközti oldalak felezőmerőlegesei. Minden szöge 90°, átlói egyenlő hosszúak és felezik egymást. Figyelem: az átlói NEM szimmetriatengelyek!',
      properties: [
        { label: 'Tengelyek száma', value: '2 tengely (szemközti oldalfelezők)' },
        { label: 'Szögek', value: 'α = β = γ = δ = 90°' },
        { label: 'Oldalak', value: 'a = c és b = d (szemköztiek párhuzamosak és egyenlők)' },
        { label: 'Átlók', value: 'e = f, felezik egymást (nem merőlegesek!)' }
      ]
    },
    rhombus: {
      name: 'Rombusz',
      category: 'Négyszög',
      axesCount: 2,
      desc: '2 szimmetriatengelye van: a két átlójának az egyenese. Minden oldala egyenlő, átlói merőlegesen felezik egymást és felezik a belső szögeket.',
      properties: [
        { label: 'Tengelyek száma', value: '2 tengely (a 2 átló egyenese)' },
        { label: 'Oldalak', value: 'a = b = c = d (mind a 4 oldal egyenlő)' },
        { label: 'Átlók', value: 'e ⊥ f, felezik egymást és a szögeket' },
        { label: 'Szögek', value: 'Szemközti szögek egyenlők (α = γ, β = δ)' }
      ]
    },
    square: {
      name: 'Négyzet',
      category: 'Négyszög',
      axesCount: 4,
      desc: '4 szimmetriatengelye van: a 2 oldalfelező merőleges és a 2 átló. Egyszerre téglalap és rombusz, a sík legszimmetrikusabb négyszöge.',
      properties: [
        { label: 'Tengelyek száma', value: '4 tengely (2 oldalfelező + 2 átló)' },
        { label: 'Oldalak', value: 'a = b = c = d' },
        { label: 'Szögek', value: 'Minden szöge 90°' },
        { label: 'Átlók', value: 'e = f, e ⊥ f, felezik egymást és a szögeket' }
      ]
    },
    regular_hexagon: {
      name: 'Szabályos hatszög',
      category: 'Sokszög',
      axesCount: 6,
      desc: '6 szimmetriatengelye van: 3 szemközti csúcspárokat összekötő főátló és 3 szemközti oldalfelező merőleges. 6 egybevágó szabályos háromszögre bontható.',
      properties: [
        { label: 'Tengelyek száma', value: '6 tengely (3 átló + 3 oldalfelező)' },
        { label: 'Belső szögek', value: 'Minden szöge 120° (összegük 720°)' },
        { label: 'Oldalak', value: '6 egyenlő oldal' },
        { label: 'Felbontás', value: '6 db egybevágó szabályos háromszög' }
      ]
    }
  };

  const current = shapesData[selectedShape];

  return (
    <div className={`space-y-4 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm ${className || ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-rose-500" />
            Interaktív alakzat és szimmetriatengely vizsgáló
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Válassz ki egy síkidomot, kapcsold be a tengelyeket, átlókat és szögeket!
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <Button
            size="sm"
            variant={showAxes ? 'default' : 'outline'}
            onClick={() => setShowAxes(!showAxes)}
            className={`rounded-xl h-8 px-2.5 text-xs font-bold ${showAxes ? 'bg-rose-600 hover:bg-rose-700 text-white' : ''}`}
          >
            Tengelyek ({current.axesCount} db)
          </Button>
          <Button
            size="sm"
            variant={showDiagonals ? 'default' : 'outline'}
            onClick={() => setShowDiagonals(!showDiagonals)}
            className={`rounded-xl h-8 px-2.5 text-xs font-bold ${showDiagonals ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : ''}`}
          >
            Átlók / Vonalak
          </Button>
          <Button
            size="sm"
            variant={showAngles ? 'default' : 'outline'}
            onClick={() => setShowAngles(!showAngles)}
            className={`rounded-xl h-8 px-2.5 text-xs font-bold ${showAngles ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''}`}
          >
            Szögek & Jelölések
          </Button>
        </div>
      </div>

      {/* Shape Selector Pills */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {(Object.keys(shapesData) as (keyof typeof shapesData)[]).map((key) => {
          const item = shapesData[key];
          const isSelected = selectedShape === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedShape(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isSelected
                  ? 'bg-rose-500 text-white border-rose-500 shadow-xs scale-102'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.name} ({item.axesCount} tengely)
            </button>
          );
        })}
      </div>

      {/* Dynamic Graphic SVG Render */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-7 flex justify-center p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 min-h-[260px]">
          <svg
            viewBox="0 0 400 240"
            className="w-full max-w-md h-auto select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker id="axis-arr-rose" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" />
              </marker>
            </defs>

            {/* 1. Egyenlő szárú háromszög */}
            {selectedShape === 'isosceles_triangle' && (
              <g>
                <polygon points="200,40 120,200 280,200" fill="rgba(244, 63, 94, 0.12)" stroke="#e11d48" strokeWidth="2.5" strokeLinejoin="round" />
                {showDiagonals && (
                  <line x1="200" y1="40" x2="200" y2="200" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="3 3" />
                )}
                {showAxes && (
                  <line x1="200" y1="15" x2="200" y2="225" stroke="#e11d48" strokeWidth="2.2" strokeDasharray="5 3" markerStart="url(#axis-arr-rose)" markerEnd="url(#axis-arr-rose)" />
                )}
                {showAngles && (
                  <>
                    {/* Alapon fekvő szögek (egyenlők) */}
                    <path d="M 140 200 A 20 20 0 0 0 130 180" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <text x="145" y="192" className="text-[11px] font-black fill-amber-600 font-sans">α</text>
                    <path d="M 260 200 A 20 20 0 0 1 270 180" fill="none" stroke="#f59e0b" strokeWidth="2" />
                    <text x="245" y="192" className="text-[11px] font-black fill-amber-600 font-sans">α</text>
                    {/* Derékszög jelölés alul */}
                    <path d="M 212 200 A 12 12 0 0 0 200 188" fill="none" stroke="#e11d48" strokeWidth="1.5" />
                    <circle cx="206" cy="194" r="1.5" fill="#e11d48" />
                  </>
                )}
                {/* Oldaljelölések a = b */}
                <text x="148" y="115" className="text-xs font-bold fill-rose-600 font-sans">a (szár)</text>
                <text x="242" y="115" className="text-xs font-bold fill-rose-600 font-sans">a (szár)</text>
                <text x="195" y="218" className="text-xs font-bold fill-slate-600 font-sans">c (alap)</text>
                {/* Csúcsok */}
                <circle cx="200" cy="40" r="4" fill="#e11d48" />
                <text x="200" y="30" textAnchor="middle" className="text-xs font-black fill-slate-800 dark:fill-white">C</text>
                <circle cx="120" cy="200" r="4" fill="#e11d48" />
                <text x="110" y="210" textAnchor="middle" className="text-xs font-black fill-slate-800 dark:fill-white">A</text>
                <circle cx="280" cy="200" r="4" fill="#e11d48" />
                <text x="290" y="210" textAnchor="middle" className="text-xs font-black fill-slate-800 dark:fill-white">B</text>
              </g>
            )}

            {/* 2. Szabályos háromszög */}
            {selectedShape === 'equilateral_triangle' && (
              <g>
                <polygon points="200,35 105,200 295,200" fill="rgba(244, 63, 94, 0.12)" stroke="#e11d48" strokeWidth="2.5" strokeLinejoin="round" />
                {showAxes && (
                  <>
                    <line x1="200" y1="15" x2="200" y2="225" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 3" />
                    <line x1="90" y1="210" x2="255" y2="110" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 3" />
                    <line x1="310" y1="210" x2="145" y2="110" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 3" />
                  </>
                )}
                {showAngles && (
                  <>
                    <text x="135" y="190" className="text-[11px] font-black fill-amber-600 font-sans">60°</text>
                    <text x="250" y="190" className="text-[11px] font-black fill-amber-600 font-sans">60°</text>
                    <text x="190" y="70" className="text-[11px] font-black fill-amber-600 font-sans">60°</text>
                  </>
                )}
                <circle cx="200" cy="145" r="3.5" fill="#6366f1" />
                <text x="212" y="148" className="text-[10px] font-bold fill-indigo-600">S (Középpont)</text>
              </g>
            )}

            {/* 3. Deltoid */}
            {selectedShape === 'deltoid' && (
              <g>
                <polygon points="200,30 270,115 200,210 130,115" fill="rgba(244, 63, 94, 0.12)" stroke="#e11d48" strokeWidth="2.5" strokeLinejoin="round" />
                {showDiagonals && (
                  <>
                    <line x1="200" y1="30" x2="200" y2="210" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
                    <line x1="130" y1="115" x2="270" y2="115" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
                  </>
                )}
                {showAxes && (
                  <line x1="200" y1="10" x2="200" y2="230" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="5 3" markerStart="url(#axis-arr-rose)" markerEnd="url(#axis-arr-rose)" />
                )}
                {showAngles && (
                  <>
                    {/* e ⊥ f derékszög */}
                    <path d="M 212 115 A 12 12 0 0 0 200 103" fill="none" stroke="#e11d48" strokeWidth="1.5" />
                    <circle cx="206" cy="109" r="1.5" fill="#e11d48" />
                    {/* Szemközti egyenlő szögek */}
                    <text x="145" y="120" className="text-[11px] font-black fill-amber-600 font-sans">β</text>
                    <text x="245" y="120" className="text-[11px] font-black fill-amber-600 font-sans">β</text>
                  </>
                )}
                <text x="155" y="65" className="text-[11px] font-bold fill-rose-600">a</text>
                <text x="235" y="65" className="text-[11px] font-bold fill-rose-600">a</text>
                <text x="150" y="170" className="text-[11px] font-bold fill-rose-600">b</text>
                <text x="240" y="170" className="text-[11px] font-bold fill-rose-600">b</text>
              </g>
            )}

            {/* 4. Szimmetrikus trapéz */}
            {selectedShape === 'isosceles_trapezoid' && (
              <g>
                <polygon points="150,60 250,60 300,190 100,190" fill="rgba(244, 63, 94, 0.12)" stroke="#e11d48" strokeWidth="2.5" strokeLinejoin="round" />
                {showDiagonals && (
                  <>
                    <line x1="150" y1="60" x2="300" y2="190" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="4 3" />
                    <line x1="250" y1="60" x2="100" y2="190" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="4 3" />
                    <text x="200" y="145" textAnchor="middle" className="text-[10px] font-black fill-indigo-600">e = f (átlók egyenlők)</text>
                  </>
                )}
                {showAxes && (
                  <line x1="200" y1="20" x2="200" y2="225" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="5 3" markerStart="url(#axis-arr-rose)" markerEnd="url(#axis-arr-rose)" />
                )}
                {showAngles && (
                  <>
                    <text x="125" y="180" className="text-[11px] font-black fill-amber-600 font-sans">α</text>
                    <text x="265" y="180" className="text-[11px] font-black fill-amber-600 font-sans">α</text>
                    <text x="165" y="80" className="text-[11px] font-black fill-amber-600 font-sans">β</text>
                    <text x="225" y="80" className="text-[11px] font-black fill-amber-600 font-sans">β</text>
                  </>
                )}
                <text x="110" y="125" className="text-[11px] font-bold fill-rose-600">d (szár)</text>
                <text x="270" y="125" className="text-[11px] font-bold fill-rose-600">b (szár = d)</text>
                <text x="195" y="50" className="text-[11px] font-bold fill-slate-600">c (alap)</text>
                <text x="195" y="210" className="text-[11px] font-bold fill-slate-600">a (alap)</text>
              </g>
            )}

            {/* 5. Téglalap */}
            {selectedShape === 'rectangle' && (
              <g>
                <polygon points="100,60 300,60 300,180 100,180" fill="rgba(244, 63, 94, 0.12)" stroke="#e11d48" strokeWidth="2.5" strokeLinejoin="round" />
                {showDiagonals && (
                  <>
                    <line x1="100" y1="60" x2="300" y2="180" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="300" y1="60" x2="100" y2="180" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
                  </>
                )}
                {showAxes && (
                  <>
                    <line x1="200" y1="25" x2="200" y2="215" stroke="#e11d48" strokeWidth="2.2" strokeDasharray="5 3" markerStart="url(#axis-arr-rose)" markerEnd="url(#axis-arr-rose)" />
                    <line x1="60" y1="120" x2="340" y2="120" stroke="#e11d48" strokeWidth="2.2" strokeDasharray="5 3" markerStart="url(#axis-arr-rose)" markerEnd="url(#axis-arr-rose)" />
                    <text x="210" y="35" className="text-[10px] font-black fill-rose-600 font-sans">t₁</text>
                    <text x="330" y="112" className="text-[10px] font-black fill-rose-600 font-sans">t₂</text>
                  </>
                )}
                {showAngles && (
                  <>
                    <path d="M 115 60 A 15 15 0 0 1 100 75" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="107" cy="67" r="1.5" fill="#f59e0b" />
                    <path d="M 285 60 A 15 15 0 0 0 300 75" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="293" cy="67" r="1.5" fill="#f59e0b" />
                    <path d="M 115 180 A 15 15 0 0 0 100 165" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="107" cy="173" r="1.5" fill="#f59e0b" />
                    <path d="M 285 180 A 15 15 0 0 1 300 165" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="293" cy="173" r="1.5" fill="#f59e0b" />
                  </>
                )}
                <text x="195" y="52" className="text-xs font-bold fill-slate-700 dark:fill-slate-300">a</text>
                <text x="195" y="200" className="text-xs font-bold fill-slate-700 dark:fill-slate-300">a</text>
                <text x="82" y="125" className="text-xs font-bold fill-slate-700 dark:fill-slate-300">b</text>
                <text x="310" y="125" className="text-xs font-bold fill-slate-700 dark:fill-slate-300">b</text>
              </g>
            )}

            {/* 6. Rombusz */}
            {selectedShape === 'rhombus' && (
              <g>
                <polygon points="200,40 310,120 200,200 90,120" fill="rgba(244, 63, 94, 0.12)" stroke="#e11d48" strokeWidth="2.5" strokeLinejoin="round" />
                {showDiagonals && (
                  <>
                    <line x1="200" y1="40" x2="200" y2="200" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="90" y1="120" x2="310" y2="120" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 3" />
                  </>
                )}
                {showAxes && (
                  <>
                    <line x1="200" y1="15" x2="200" y2="225" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="5 3" markerStart="url(#axis-arr-rose)" markerEnd="url(#axis-arr-rose)" />
                    <line x1="60" y1="120" x2="340" y2="120" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="5 3" markerStart="url(#axis-arr-rose)" markerEnd="url(#axis-arr-rose)" />
                    <text x="210" y="25" className="text-[10px] font-black fill-rose-600 font-sans">t₁ (f)</text>
                    <text x="330" y="112" className="text-[10px] font-black fill-rose-600 font-sans">t₂ (e)</text>
                  </>
                )}
                {showAngles && (
                  <>
                    <path d="M 212 120 A 12 12 0 0 0 200 108" fill="none" stroke="#e11d48" strokeWidth="1.5" />
                    <circle cx="206" cy="114" r="1.5" fill="#e11d48" />
                    <text x="110" y="125" className="text-[11px] font-black fill-amber-600 font-sans">α</text>
                    <text x="280" y="125" className="text-[11px] font-black fill-amber-600 font-sans">α</text>
                    <text x="195" y="70" className="text-[11px] font-black fill-amber-600 font-sans">β</text>
                    <text x="195" y="175" className="text-[11px] font-black fill-amber-600 font-sans">β</text>
                  </>
                )}
                <text x="140" y="75" className="text-xs font-bold fill-rose-600">a</text>
                <text x="250" y="75" className="text-xs font-bold fill-rose-600">a</text>
                <text x="140" y="170" className="text-xs font-bold fill-rose-600">a</text>
                <text x="250" y="170" className="text-xs font-bold fill-rose-600">a</text>
              </g>
            )}

            {/* 7. Négyzet */}
            {selectedShape === 'square' && (
              <g>
                <polygon points="130,50 270,50 270,190 130,190" fill="rgba(244, 63, 94, 0.12)" stroke="#e11d48" strokeWidth="2.5" strokeLinejoin="round" />
                {showAxes && (
                  <>
                    {/* Oldalfelezők */}
                    <line x1="200" y1="25" x2="200" y2="215" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 3" />
                    <line x1="95" y1="120" x2="305" y2="120" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 3" />
                    {/* Átlók */}
                    <line x1="100" y1="20" x2="300" y2="220" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 3" />
                    <line x1="300" y1="20" x2="100" y2="220" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 3" />
                  </>
                )}
                {showAngles && (
                  <>
                    <path d="M 145 50 A 15 15 0 0 1 130 65" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="137" cy="57" r="1.5" fill="#f59e0b" />
                    <path d="M 255 50 A 15 15 0 0 0 270 65" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="263" cy="57" r="1.5" fill="#f59e0b" />
                    <path d="M 145 190 A 15 15 0 0 0 130 175" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="137" cy="183" r="1.5" fill="#f59e0b" />
                    <path d="M 255 190 A 15 15 0 0 1 270 175" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                    <circle cx="263" cy="183" r="1.5" fill="#f59e0b" />
                  </>
                )}
                <text x="195" y="42" className="text-xs font-bold fill-rose-600">a</text>
                <text x="195" y="208" className="text-xs font-bold fill-rose-600">a</text>
                <text x="112" y="125" className="text-xs font-bold fill-rose-600">a</text>
                <text x="278" y="125" className="text-xs font-bold fill-rose-600">a</text>
              </g>
            )}

            {/* 8. Szabályos hatszög */}
            {selectedShape === 'regular_hexagon' && (
              <g>
                <polygon points="200,35 280,75 280,165 200,205 120,165 120,75" fill="rgba(244, 63, 94, 0.12)" stroke="#e11d48" strokeWidth="2.5" strokeLinejoin="round" />
                {showAxes && (
                  <>
                    {/* 3 Főátló */}
                    <line x1="200" y1="15" x2="200" y2="225" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="4 3" />
                    <line x1="100" y1="65" x2="300" y2="175" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="4 3" />
                    <line x1="100" y1="175" x2="300" y2="65" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="4 3" />
                    {/* 3 Oldalfelező */}
                    <line x1="85" y1="120" x2="315" y2="120" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="4 3" />
                    <line x1="145" y1="20" x2="255" y2="220" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="4 3" />
                    <line x1="255" y1="20" x2="145" y2="220" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="4 3" />
                  </>
                )}
                {showAngles && (
                  <text x="185" y="60" className="text-[10px] font-black fill-amber-600 font-sans">120°</text>
                )}
                <circle cx="200" cy="120" r="3.5" fill="#6366f1" />
                <text x="195" y="138" textAnchor="middle" className="text-[9px] font-bold fill-indigo-600">6 db egyenlő szárú/szabályos △</text>
              </g>
            )}
          </svg>
        </div>

        {/* Shape Details & Properties Box */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/50">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
                {current.category}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-black bg-rose-200/70 dark:bg-rose-900 text-rose-900 dark:text-rose-100">
                {current.axesCount} szimmetriatengely
              </span>
            </div>
            <h4 className="font-black text-slate-900 dark:text-white text-base">
              {current.name}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {current.desc}
            </p>
          </div>

          <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 text-xs">
            {current.properties.map((prop, idx) => (
              <div key={idx} className="flex justify-between items-start gap-2 py-0.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <span className="text-slate-500 dark:text-slate-400 font-medium">{prop.label}:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-right">{prop.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. MINI FIGURE KOMPONENS (KVÍZEKHEZ, PÁROSÍTÓKHOZ, CSOPORTOSÍTÓKHOZ)
// =========================================================================
export interface SymmetricShapesMiniFigureProps {
  type:
    | 'zero_axes'
    | 'one_axis'
    | 'two_axes'
    | 'three_axes'
    | 'four_axes'
    | 'five_axes'
    | 'six_axes'
    | 'eight_axes'
    | 'infinite_axes'
    | 'isosceles_triangle'
    | 'equilateral_triangle'
    | 'general_triangle'
    | 'right_triangle'
    | 'deltoid'
    | 'isosceles_trapezoid'
    | 'general_trapezoid'
    | 'rectangle'
    | 'rhombus'
    | 'square'
    | 'parallelogram'
    | 'regular_pentagon'
    | 'regular_hexagon'
    | 'regular_octagon'
    | 'semicircle'
    | 'kite';
  className?: string;
  size?: number;
}

export const SymmetricShapesMiniFigure: React.FC<SymmetricShapesMiniFigureProps> = ({
  type,
  className = '',
  size = 50
}) => {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 60 60"
      className={`inline-block select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 0 tengely / Általános háromszög */}
      {(type === 'zero_axes' || type === 'general_triangle') && (
        <g>
          <polygon points="12,48 48,44 38,12" fill="rgba(148, 163, 184, 0.2)" stroke="#64748b" strokeWidth="2.2" strokeLinejoin="round" />
        </g>
      )}

      {/* 1 tengely / Egyenlő szárú háromszög */}
      {(type === 'one_axis' || type === 'isosceles_triangle') && (
        <g>
          <polygon points="30,10 14,48 46,48" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="30" y1="6" x2="30" y2="52" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="3 2" />
        </g>
      )}

      {/* Derékszögű egyenlő szárú háromszög */}
      {type === 'right_triangle' && (
        <g>
          <polygon points="15,45 45,45 15,15" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="15" y1="15" x2="30" y2="45" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M 23 45 A 8 8 0 0 0 15 37" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx="19" cy="41" r="1" fill="#f59e0b" />
        </g>
      )}

      {/* Szabályos háromszög / 3 tengely */}
      {(type === 'three_axes' || type === 'equilateral_triangle') && (
        <g>
          <polygon points="30,8 10,48 50,48" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="30" y1="4" x2="30" y2="52" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="8" y1="50" x2="42" y2="24" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="52" y1="50" x2="18" y2="24" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
        </g>
      )}

      {/* Deltoid */}
      {(type === 'deltoid' || type === 'kite') && (
        <g>
          <polygon points="30,8 46,26 30,52 14,26" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="30" y1="4" x2="30" y2="56" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="3 2" />
          <line x1="14" y1="26" x2="46" y2="26" stroke="#6366f1" strokeWidth="1.2" strokeDasharray="2 2" />
        </g>
      )}

      {/* Szimmetrikus trapéz */}
      {type === 'isosceles_trapezoid' && (
        <g>
          <polygon points="20,16 40,16 50,46 10,46" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="30" y1="8" x2="30" y2="52" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="3 2" />
        </g>
      )}

      {/* Általános trapéz (aszimmetrikus) */}
      {type === 'general_trapezoid' && (
        <g>
          <polygon points="18,16 36,16 52,46 10,46" fill="rgba(148, 163, 184, 0.2)" stroke="#64748b" strokeWidth="2.2" strokeLinejoin="round" />
        </g>
      )}

      {/* Téglalap / 2 tengely */}
      {(type === 'two_axes' || type === 'rectangle') && (
        <g>
          <polygon points="10,18 50,18 50,42 10,42" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="30" y1="10" x2="30" y2="50" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="4" y1="30" x2="56" y2="30" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
        </g>
      )}

      {/* Rombusz */}
      {type === 'rhombus' && (
        <g>
          <polygon points="30,10 50,30 30,50 10,30" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="30" y1="4" x2="30" y2="56" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="4" y1="30" x2="56" y2="30" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
        </g>
      )}

      {/* Négyzet / 4 tengely */}
      {(type === 'four_axes' || type === 'square') && (
        <g>
          <polygon points="14,14 46,14 46,46 14,46" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="30" y1="6" x2="30" y2="54" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="6" y1="30" x2="54" y2="30" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="8" y1="8" x2="52" y2="52" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="52" y1="8" x2="8" y2="52" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 2" />
        </g>
      )}

      {/* Általános paralelogramma (0 tengely) */}
      {type === 'parallelogram' && (
        <g>
          <polygon points="18,18 52,18 42,42 8,42" fill="rgba(148, 163, 184, 0.2)" stroke="#64748b" strokeWidth="2.2" strokeLinejoin="round" />
        </g>
      )}

      {/* Szabályos ötszög / 5 tengely */}
      {(type === 'five_axes' || type === 'regular_pentagon') && (
        <g>
          <polygon points="30,8 51,23 43,48 17,48 9,23" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2" strokeLinejoin="round" />
          <line x1="30" y1="4" x2="30" y2="52" stroke="#e11d48" strokeWidth="1.4" strokeDasharray="3 2" />
        </g>
      )}

      {/* Szabályos hatszög / 6 tengely */}
      {(type === 'six_axes' || type === 'regular_hexagon') && (
        <g>
          <polygon points="30,8 48,18 48,42 30,52 12,42 12,18" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2" strokeLinejoin="round" />
          <line x1="30" y1="4" x2="30" y2="56" stroke="#e11d48" strokeWidth="1.4" strokeDasharray="3 2" />
          <line x1="8" y1="16" x2="52" y2="44" stroke="#e11d48" strokeWidth="1.4" strokeDasharray="3 2" />
          <line x1="8" y1="44" x2="52" y2="16" stroke="#e11d48" strokeWidth="1.4" strokeDasharray="3 2" />
        </g>
      )}

      {/* Szabályos nyolcszög / 8 tengely */}
      {(type === 'eight_axes' || type === 'regular_octagon') && (
        <g>
          <polygon points="23,8 37,8 48,19 48,33 37,44 23,44 12,33 12,19" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2" strokeLinejoin="round" />
          <line x1="30" y1="4" x2="30" y2="48" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="6" y1="26" x2="54" y2="26" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 2" />
        </g>
      )}

      {/* Félkör / 1 tengely */}
      {type === 'semicircle' && (
        <g>
          <path d="M 12 36 A 18 18 0 0 1 48 36 Z" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2.2" strokeLinejoin="round" />
          <line x1="30" y1="12" x2="30" y2="48" stroke="#e11d48" strokeWidth="1.6" strokeDasharray="3 2" />
        </g>
      )}

      {/* Kör / Végtelen sok tengely */}
      {type === 'infinite_axes' && (
        <g>
          <circle cx="30" cy="30" r="20" fill="rgba(244, 63, 94, 0.2)" stroke="#e11d48" strokeWidth="2.2" />
          <line x1="30" y1="6" x2="30" y2="54" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="6" y1="30" x2="54" y2="30" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="13" y1="13" x2="47" y2="47" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 2" />
          <line x1="47" y1="13" x2="13" y2="47" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 2" />
        </g>
      )}
    </svg>
  );
};
