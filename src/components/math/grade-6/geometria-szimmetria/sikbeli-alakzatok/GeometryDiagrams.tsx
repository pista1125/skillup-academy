import React from 'react';
import { MathText } from '@/components/math/shared/MathText';

// --- 1. Pont, Egyenes, Félegyenes, Szakasz Összehasonlító Diagram ---
export const BasicElementsDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 540 130"
      className={`w-full max-w-lg h-auto select-none ${className || ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
        </marker>
        <marker id="arrow-rev" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 8 1.5 L 0 5 L 8 8.5 z" fill="#0284c7" />
        </marker>
      </defs>

      {/* Background container */}
      <rect x="5" y="5" width="530" height="120" rx="16" className="fill-slate-50 dark:fill-slate-850 stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />

      {/* 1. Pont */}
      <g transform="translate(15, 0)">
        <circle cx="45" cy="50" r="5" fill="#ef4444" />
        <text x="45" y="35" textAnchor="middle" className="text-xs font-bold fill-slate-800 dark:fill-slate-100 font-sans">A</text>
        <text x="45" y="80" textAnchor="middle" className="text-[11px] font-bold fill-slate-600 dark:fill-slate-300 font-sans">Pont (A)</text>
        <text x="45" y="98" textAnchor="middle" className="text-[9px] fill-slate-400 font-sans">kiterjedés nélküli</text>
      </g>

      <line x1="125" y1="20" x2="125" y2="105" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="3 3" />

      {/* 2. Szakasz AB */}
      <g transform="translate(115, 0)">
        <line x1="40" y1="50" x2="110" y2="50" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
        <circle cx="40" cy="50" r="4.5" fill="#059669" />
        <circle cx="110" cy="50" r="4.5" fill="#059669" />
        <text x="40" y="35" textAnchor="middle" className="text-xs font-bold fill-slate-800 dark:fill-slate-100 font-sans">A</text>
        <text x="110" y="35" textAnchor="middle" className="text-xs font-bold fill-slate-800 dark:fill-slate-100 font-sans">B</text>
        <text x="75" y="80" textAnchor="middle" className="text-[11px] font-bold fill-slate-600 dark:fill-slate-300 font-sans">Szakasz (AB)</text>
        <text x="75" y="98" textAnchor="middle" className="text-[9px] fill-slate-400 font-sans">két végpont határolja</text>
      </g>

      <line x1="260" y1="20" x2="260" y2="105" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="3 3" />

      {/* 3. Félegyenes [AB) */}
      <g transform="translate(250, 0)">
        <line x1="40" y1="50" x2="115" y2="50" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrow)" />
        <circle cx="40" cy="50" r="4.5" fill="#0284c7" />
        <circle cx="85" cy="50" r="3.5" fill="#0284c7" />
        <text x="40" y="35" textAnchor="middle" className="text-xs font-bold fill-slate-800 dark:fill-slate-100 font-sans">A</text>
        <text x="85" y="35" textAnchor="middle" className="text-xs font-bold fill-slate-800 dark:fill-slate-100 font-sans">B</text>
        <text x="75" y="80" textAnchor="middle" className="text-[11px] font-bold fill-slate-600 dark:fill-slate-300 font-sans">Félegyenes [AB)</text>
        <text x="75" y="98" textAnchor="middle" className="text-[9px] fill-slate-400 font-sans">A-ból indul, végtelen</text>
      </g>

      <line x1="395" y1="20" x2="395" y2="105" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1" strokeDasharray="3 3" />

      {/* 4. Egyenes e */}
      <g transform="translate(385, 0)">
        <line x1="25" y1="50" x2="115" y2="50" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" markerStart="url(#arrow-rev)" markerEnd="url(#arrow)" />
        <text x="123" y="45" className="text-xs font-black italic fill-purple-700 dark:fill-purple-300 font-sans">e</text>
        <text x="70" y="80" textAnchor="middle" className="text-[11px] font-bold fill-slate-600 dark:fill-slate-300 font-sans">Egyenes (e)</text>
        <text x="70" y="98" textAnchor="middle" className="text-[9px] fill-slate-400 font-sans">mindkét irányba végtelen</text>
      </g>
    </svg>
  );
};

// --- 2. Egyenesek Kölcsönös Helyzete Diagram ---
export const LineRelationshipsDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 w-full ${className || ''}`}>
      {/* 1. Metsző egyenesek */}
      <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
        <svg viewBox="0 0 160 120" className="w-full max-w-[150px] h-28">
          <line x1="20" y1="100" x2="140" y2="20" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="30" x2="140" y2="90" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="80" cy="60" r="4.5" fill="#ef4444" />
          <text x="80" y="50" textAnchor="middle" className="text-xs font-black fill-red-600 dark:fill-red-400">M</text>
          <text x="135" y="20" className="text-xs font-bold fill-cyan-600">a</text>
          <text x="135" y="105" className="text-xs font-bold fill-purple-600">b</text>
        </svg>
        <div>
          <div className="font-bold text-xs text-slate-800 dark:text-slate-200">Metsző egyenesek</div>
          <div className="text-[11px] text-slate-500 font-mono">1 közös pont (M metszéspont)</div>
        </div>
      </div>

      {/* 2. Merőleges egyenesek */}
      <div className="flex flex-col items-center p-3 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/60 text-center space-y-2">
        <svg viewBox="0 0 160 120" className="w-full max-w-[150px] h-28">
          <line x1="20" y1="60" x2="140" y2="60" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="80" y1="15" x2="80" y2="105" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
          {/* Right angle marker: Hungarian standard (negyedkör ív + pont) */}
          <path d="M 96 60 A 16 16 0 0 0 80 44" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="86" cy="54" r="1.5" fill="#ef4444" />
          <text x="142" y="64" className="text-xs font-bold fill-cyan-600">a</text>
          <text x="85" y="20" className="text-xs font-bold fill-emerald-600">b</text>
          <text x="105" y="48" className="text-[10px] font-bold fill-red-500">90°</text>
        </svg>
        <div>
          <div className="font-bold text-xs text-cyan-900 dark:text-cyan-200">Merőleges egyenesek</div>
          <div className="text-[11px] font-bold text-cyan-600 font-mono">a ⊥ b (90°-os szög)</div>
        </div>
      </div>

      {/* 3. Párhuzamos egyenesek */}
      <div className="flex flex-col items-center p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 text-center space-y-2">
        <svg viewBox="0 0 160 120" className="w-full max-w-[150px] h-28">
          <line x1="20" y1="35" x2="140" y2="35" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="85" x2="140" y2="85" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
          {/* Distance indicator */}
          <line x1="75" y1="35" x2="75" y2="85" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 72 40 L 75 35 L 78 40 M 72 80 L 75 85 L 78 80" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
          <text x="82" y="64" className="text-[10px] font-bold fill-amber-600">d távolság</text>
          <text x="142" y="39" className="text-xs font-bold fill-indigo-600">a</text>
          <text x="142" y="89" className="text-xs font-bold fill-indigo-600">b</text>
        </svg>
        <div>
          <div className="font-bold text-xs text-indigo-900 dark:text-indigo-200">Párhuzamos egyenesek</div>
          <div className="text-[11px] font-bold text-indigo-600 font-mono">a ∥ b (nincs közös pont)</div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Szögtípusok Tabló Diagram ---
export const AngleTypesDiagram: React.FC<{ className?: string }> = ({ className }) => {
  const angles = [
    {
      title: 'Hegyesszög',
      range: '0° < α < 90°',
      svg: (
        <svg viewBox="0 0 100 80" className="w-20 h-16">
          <line x1="15" y1="65" x2="85" y2="65" stroke="#0284c7" strokeWidth="2" />
          <line x1="15" y1="65" x2="65" y2="20" stroke="#0284c7" strokeWidth="2" />
          <path d="M 40 65 A 25 25 0 0 0 32 49" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="15" cy="65" r="3" fill="#0284c7" />
          <text x="38" y="52" className="text-[9px] font-bold fill-amber-600">α</text>
        </svg>
      ),
      color: 'border-blue-200 dark:border-blue-900'
    },
    {
      title: 'Derékszög',
      range: 'α = 90°',
      svg: (
        <svg viewBox="0 0 100 80" className="w-20 h-16">
          <line x1="20" y1="65" x2="85" y2="65" stroke="#059669" strokeWidth="2" />
          <line x1="20" y1="65" x2="20" y2="10" stroke="#059669" strokeWidth="2" />
          <path d="M 38 65 A 18 18 0 0 0 20 47" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="27" cy="58" r="1.5" fill="#ef4444" />
          <circle cx="20" cy="65" r="3" fill="#059669" />
          <text x="44" y="54" className="text-[9px] font-bold fill-red-600">90°</text>
        </svg>
      ),
      color: 'border-emerald-200 dark:border-emerald-900'
    },
    {
      title: 'Tompaszög',
      range: '90° < α < 180°',
      svg: (
        <svg viewBox="0 0 100 80" className="w-20 h-16">
          <line x1="50" y1="65" x2="90" y2="65" stroke="#7c3aed" strokeWidth="2" />
          <line x1="50" y1="65" x2="15" y2="25" stroke="#7c3aed" strokeWidth="2" />
          <path d="M 75 65 A 25 25 0 0 0 33 45" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="50" cy="65" r="3" fill="#7c3aed" />
          <text x="50" y="48" className="text-[9px] font-bold fill-amber-600">α</text>
        </svg>
      ),
      color: 'border-purple-200 dark:border-purple-900'
    },
    {
      title: 'Egyenesszög',
      range: 'α = 180°',
      svg: (
        <svg viewBox="0 0 100 80" className="w-20 h-16">
          <line x1="10" y1="55" x2="90" y2="55" stroke="#ea580c" strokeWidth="2" />
          <path d="M 70 55 A 20 20 0 0 0 30 55" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="50" cy="55" r="3" fill="#ea580c" />
          <text x="50" y="30" textAnchor="middle" className="text-[9px] font-bold fill-amber-600">180°</text>
        </svg>
      ),
      color: 'border-orange-200 dark:border-orange-900'
    },
    {
      title: 'Homorúszög',
      range: '180° < α < 360°',
      svg: (
        <svg viewBox="0 0 100 80" className="w-20 h-16">
          <line x1="50" y1="35" x2="85" y2="35" stroke="#db2777" strokeWidth="2" />
          <line x1="50" y1="35" x2="25" y2="65" stroke="#db2777" strokeWidth="2" />
          <path d="M 70 35 A 20 20 0 1 1 33 55" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="50" cy="35" r="3" fill="#db2777" />
          <text x="58" y="68" className="text-[9px] font-bold fill-amber-600">α</text>
        </svg>
      ),
      color: 'border-pink-200 dark:border-pink-900'
    },
    {
      title: 'Teljesszög',
      range: 'α = 360°',
      svg: (
        <svg viewBox="0 0 100 80" className="w-20 h-16">
          <line x1="45" y1="40" x2="85" y2="40" stroke="#0891b2" strokeWidth="2" />
          <circle cx="45" cy="40" r="18" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="45" cy="40" r="3" fill="#0891b2" />
          <text x="45" y="70" textAnchor="middle" className="text-[9px] font-bold fill-amber-600">360°</text>
        </svg>
      ),
      color: 'border-cyan-200 dark:border-cyan-900'
    }
  ];

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 w-full ${className || ''}`}>
      {angles.map((ang, i) => (
        <div
          key={i}
          className={`flex flex-col items-center justify-between p-2.5 rounded-2xl border bg-white dark:bg-slate-900 text-center shadow-2xs ${ang.color}`}
        >
          <div className="font-bold text-xs text-slate-800 dark:text-slate-100">{ang.title}</div>
          <div className="py-1">{ang.svg}</div>
          <div className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
            {ang.range}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- 4. Konvex vs. Konkáv Sokszög Diagram ---
export const ConvexConcaveDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ${className || ''}`}>
      {/* Konvex sokszög */}
      <div className="p-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/10 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300">Konvex sokszög</h4>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
            Minden szög &lt; 180°
          </span>
        </div>
        <div className="flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-slate-800">
          <svg viewBox="0 0 180 140" className="w-44 h-32">
            <polygon
              points="90,15 160,55 135,125 45,125 20,55"
              fill="rgba(16, 185, 129, 0.15)"
              stroke="#059669"
              strokeWidth="2.5"
            />
            <line x1="90" y1="15" x2="135" y2="125" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="90" y1="15" x2="45" y2="125" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="20" y1="55" x2="160" y2="55" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="90" cy="15" r="3.5" fill="#059669" />
            <circle cx="160" cy="55" r="3.5" fill="#059669" />
            <circle cx="135" cy="125" r="3.5" fill="#059669" />
            <circle cx="45" cy="125" r="3.5" fill="#059669" />
            <circle cx="20" cy="55" r="3.5" fill="#059669" />
          </svg>
        </div>
        <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
          <li>Minden belső szöge <strong>180°-nál kisebb</strong> (hegyes, derék vagy tompa).</li>
          <li><strong>Minden átlója a sokszög belsejében</strong> fut.</li>
          <li>Bármely két pontját összekötő szakasz teljesen a síkidomban marad.</li>
        </ul>
      </div>

      {/* Konkáv sokszög */}
      <div className="p-4 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/10 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-sm text-rose-900 dark:text-rose-300">Konkáv sokszög</h4>
          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200">
            Legalább 1 szög &gt; 180°
          </span>
        </div>
        <div className="flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-100 dark:border-slate-800">
          <svg viewBox="0 0 180 140" className="w-44 h-32">
            <polygon
              points="90,15 160,125 90,85 20,125"
              fill="rgba(244, 63, 94, 0.15)"
              stroke="#e11d48"
              strokeWidth="2.5"
            />
            <line x1="20" y1="125" x2="160" y2="125" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 75 75 A 20 20 0 0 0 105 75" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="90" cy="15" r="3.5" fill="#e11d48" />
            <circle cx="160" cy="125" r="3.5" fill="#e11d48" />
            <circle cx="90" cy="85" r="3.5" fill="#f59e0b" />
            <circle cx="20" cy="125" r="3.5" fill="#e11d48" />
            <text x="90" y="115" textAnchor="middle" className="text-[10px] font-bold fill-red-600">Külső átló!</text>
            <text x="90" y="70" textAnchor="middle" className="text-[10px] font-bold fill-amber-600">&gt; 180°</text>
          </svg>
        </div>
        <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
          <li>Van legalább egy <strong>180°-nál nagyobb</strong> (homorú) belső szöge.</li>
          <li>Legalább <strong>egy átlója a sokszögön kívül</strong> halad!</li>
          <li>Könnyen felismerhető a "beharapásról" vagy nyílhegy alakról.</li>
        </ul>
      </div>
    </div>
  );
};

// --- 5. Sokszög Átlói és Belső Szögek Összege Diagram ---
export const PolygonDiagonalsDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 w-full ${className || ''}`}>
      {/* 1. Átlók száma */}
      <div className="p-4 rounded-2xl border border-cyan-200 dark:border-cyan-900/60 bg-cyan-50/40 dark:bg-cyan-950/20 space-y-3">
        <h4 className="font-bold text-sm text-cyan-950 dark:text-cyan-200 flex items-center justify-between">
          <span>Átlók száma egy n-szögben</span>
          <span className="font-mono text-xs font-bold text-cyan-600">
            <MathText>d = (n · (n - 3)) / 2</MathText>
          </span>
        </h4>
        <div className="flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-cyan-100 dark:border-slate-800">
          <svg viewBox="0 0 160 140" className="w-40 h-32">
            <polygon
              points="80,15 135,45 135,105 80,135 25,105 25,45"
              fill="rgba(6, 182, 212, 0.1)"
              stroke="#0891b2"
              strokeWidth="2.5"
            />
            <line x1="80" y1="15" x2="135" y2="105" stroke="#f59e0b" strokeWidth="2" />
            <line x1="80" y1="15" x2="80" y2="135" stroke="#f59e0b" strokeWidth="2" />
            <line x1="80" y1="15" x2="25" y2="105" stroke="#f59e0b" strokeWidth="2" />
            <line x1="135" y1="45" x2="25" y2="45" stroke="#0891b2" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="135" y1="45" x2="25" y2="105" stroke="#0891b2" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="135" y1="45" x2="80" y2="135" stroke="#0891b2" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="80" cy="15" r="4.5" fill="#f59e0b" />
            <circle cx="135" cy="45" r="3" fill="#0891b2" />
            <circle cx="135" cy="105" r="3" fill="#0891b2" />
            <circle cx="80" cy="135" r="3" fill="#0891b2" />
            <circle cx="25" cy="105" r="3" fill="#0891b2" />
            <circle cx="25" cy="45" r="3" fill="#0891b2" />
          </svg>
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <div>• <strong>1 csúcsból</strong> húzható átlók: <span className="font-mono font-bold text-cyan-600">n - 3</span>.</div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span>• <strong>Összes átló</strong> száma:</span>
            <span className="font-mono font-bold text-cyan-600">
              <MathText>d = (n · (n - 3)) / 2</MathText>
            </span>
          </div>
          <div>• Például hatszögnél (n = 6): 6 · 3 / 2 = 9 átló.</div>
        </div>
      </div>

      {/* 2. Belső szögek összege */}
      <div className="p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
        <h4 className="font-bold text-sm text-indigo-950 dark:text-indigo-200 flex items-center justify-between">
          <span>Belső szögek összege</span>
          <span className="font-mono text-xs font-bold text-indigo-600">
            <MathText>Sₙ = (n - 2) · 180°</MathText>
          </span>
        </h4>
        <div className="flex items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-slate-800">
          <svg viewBox="0 0 160 140" className="w-40 h-32">
            <polygon
              points="80,15 145,55 120,125 40,125 15,55"
              fill="rgba(79, 70, 229, 0.1)"
              stroke="#4f46e5"
              strokeWidth="2.5"
            />
            <line x1="80" y1="15" x2="120" y2="125" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="80" y1="15" x2="40" y2="125" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
            <text x="45" y="70" className="text-[11px] font-bold fill-indigo-600">T₁ (180°)</text>
            <text x="80" y="90" textAnchor="middle" className="text-[11px] font-bold fill-indigo-600">T₂ (180°)</text>
            <text x="115" y="70" textAnchor="end" className="text-[11px] font-bold fill-indigo-600">T₃ (180°)</text>
            <circle cx="80" cy="15" r="4.5" fill="#ef4444" />
            <circle cx="145" cy="55" r="3" fill="#4f46e5" />
            <circle cx="120" cy="125" r="3" fill="#4f46e5" />
            <circle cx="40" cy="125" r="3" fill="#4f46e5" />
            <circle cx="15" cy="55" r="3" fill="#4f46e5" />
          </svg>
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
          <div>• Egy csúcsból meghúzva az átlókat a sokszög <span className="font-mono font-bold text-indigo-600">n - 2</span> háromszögre bomlik.</div>
          <div>• Összesen: <span className="font-mono font-bold text-indigo-600"><MathText>Sₙ = (n - 2) · 180°</MathText></span>.</div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 🎯 INTERAKTÍV / KVÍZ KÉRDÉS ÁBRÁK (Dedicated Figures for Questions)
// =========================================================================

/**
 * Szögmegjelenítő komponens tetszőleges fokértékhez (pl. 35°, 65°, 90°, 135°, 180°, 240°, 360°)
 * Támogatja a fokszám elrejtését is (vizuális felismeréshez), forgatást, és segédvonalakat.
 */
export const AngleFigure: React.FC<{
  degrees: number;
  label?: string;
  showDegrees?: boolean;
  color?: string;
  rotation?: number;
  showGuide?: 'none' | '90' | '180';
  size?: number;
}> = ({
  degrees,
  label,
  showDegrees = true,
  color = '#0284c7',
  rotation = 0,
  showGuide = 'none'
}) => {
  const cx = 80;
  const cy = 75;
  const r = 52;
  const arcR = 26;

  // Base angle rotated by rotation
  const baseRad = (rotation * Math.PI) / 180;
  const totalRad = ((rotation + degrees) * Math.PI) / 180;

  const startX = cx + r * Math.cos(-baseRad);
  const startY = cy + r * Math.sin(-baseRad);

  const endX = cx + r * Math.cos(-totalRad);
  const endY = cy + r * Math.sin(-totalRad);

  const arcStartX = cx + arcR * Math.cos(-baseRad);
  const arcStartY = cy + arcR * Math.sin(-baseRad);

  const arcEndX = cx + arcR * Math.cos(-totalRad);
  const arcEndY = cy + arcR * Math.sin(-totalRad);

  const isLargeArc = degrees > 180 ? 1 : 0;
  const displayLabel = label !== undefined ? label : (showDegrees ? `${degrees}°` : 'α');

  // Guide lines
  const guide90X = cx + r * Math.cos(-(baseRad + Math.PI / 2));
  const guide90Y = cy + r * Math.sin(-(baseRad + Math.PI / 2));
  const guide180X = cx + r * Math.cos(-(baseRad + Math.PI));
  const guide180Y = cy + r * Math.sin(-(baseRad + Math.PI));

  return (
    <div className="relative flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 160 135" className="w-full max-w-[170px] h-auto select-none">
        {/* Subtle grid dots for geometry feel */}
        <pattern id={`dots-${degrees}-${rotation}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.8" className="fill-slate-300 dark:fill-slate-700" />
        </pattern>
        <rect x="0" y="0" width="160" height="135" fill={`url(#dots-${degrees}-${rotation})`} rx="8" />

        {/* Optional guide lines (e.g. 90° or 180° reference) */}
        {showGuide === '90' && (
          <line x1={cx} y1={cy} x2={guide90X} y2={guide90Y} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        )}
        {showGuide === '180' && (
          <line x1={cx} y1={cy} x2={guide180X} y2={guide180Y} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        )}

        {/* Base Ray */}
        <line x1={cx} y1={cy} x2={startX} y2={startY} stroke={color} strokeWidth="2.8" strokeLinecap="round" />

        {/* Rotated Ray */}
        {degrees !== 360 && degrees !== 0 && (
          <line x1={cx} y1={cy} x2={endX} y2={endY} stroke={color} strokeWidth="2.8" strokeLinecap="round" />
        )}

        {/* Angle Arc / Right-angle Marker */}
        {degrees === 90 && rotation === 0 ? (
          <g>
            <path d={`M ${cx + 16} ${cy} A 16 16 0 0 0 ${cx} ${cy - 16}`} fill="none" stroke="#ef4444" strokeWidth="1.8" />
            <circle cx={cx + 6} cy={cy - 6} r="1.5" fill="#ef4444" />
          </g>
        ) : degrees === 180 && rotation === 0 ? (
          <path d={`M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 0 0 ${cx - arcR} ${cy}`} fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2" />
        ) : degrees === 360 ? (
          <circle cx={cx} cy={cy} r={arcR} fill="rgba(6, 182, 212, 0.15)" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 2" />
        ) : degrees === 0 ? (
          <path d={`M ${cx + 10} ${cy} A 10 10 0 0 0 ${cx + 10} ${cy - 0.1}`} fill="none" stroke="#64748b" strokeWidth="1.5" />
        ) : (
          <path
            d={`M ${arcStartX} ${arcStartY} A ${arcR} ${arcR} 0 ${isLargeArc} 0 ${arcEndX} ${arcEndY}`}
            fill={degrees < 180 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(236, 72, 153, 0.2)'}
            stroke={degrees < 180 ? '#f59e0b' : '#db2777'}
            strokeWidth="2.2"
          />
        )}

        {/* Vertex O */}
        <circle cx={cx} cy={cy} r="4.5" fill={color} className="drop-shadow-xs" />
        <text x={cx - 12} y={cy + 14} className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400 font-sans">O</text>

        {/* Degree / Angle Label */}
        {displayLabel && (
          <g>
            <rect
              x={(degrees > 180 ? cx - 35 : cx + 10) - 2}
              y={(degrees > 180 ? cy + 18 : cy - (degrees >= 90 ? 28 : 16)) - 10}
              width={displayLabel.length * 8 + 12}
              height="16"
              rx="4"
              className="fill-white/80 dark:fill-slate-900/80 stroke-amber-300 dark:stroke-amber-700/60"
              strokeWidth="0.8"
            />
            <text
              x={(degrees > 180 ? cx - 35 : cx + 10) + (displayLabel.length * 8 + 12) / 2 - 2}
              y={(degrees > 180 ? cy + 18 : cy - (degrees >= 90 ? 28 : 16)) + 2}
              textAnchor="middle"
              className="text-[11px] font-black fill-amber-600 dark:fill-amber-400 font-mono"
            >
              {displayLabel}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Szakasz ábra két megjelölt végponttal
 */
export const SegmentFigure: React.FC<{ lengthLabel?: string; p1?: string; p2?: string }> = ({
  lengthLabel = 'AB szakasz',
  p1 = 'A',
  p2 = 'B'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 160 85" className="w-full max-w-[170px] h-auto select-none">
        <line x1="25" y1="42" x2="135" y2="42" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="25" cy="42" r="5" fill="#059669" />
        <circle cx="135" cy="42" r="5" fill="#059669" />
        <text x="25" y="24" textAnchor="middle" className="text-xs font-black fill-slate-800 dark:fill-slate-100">{p1}</text>
        <text x="135" y="24" textAnchor="middle" className="text-xs font-black fill-slate-800 dark:fill-slate-100">{p2}</text>
        <text x="80" y="65" textAnchor="middle" className="text-[11px] font-bold fill-emerald-600 dark:fill-emerald-400 font-mono">{lengthLabel}</text>
      </svg>
    </div>
  );
};

/**
 * Félegyenes ábra kezdőponttal és irányjelző nyíllal [AB)
 */
export const RayFigure: React.FC<{ label?: string }> = ({ label = '[AB) félegyenes' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 160 85" className="w-full max-w-[170px] h-auto select-none">
        <defs>
          <marker id="ray-arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
          </marker>
        </defs>
        <line x1="25" y1="42" x2="140" y2="42" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" markerEnd="url(#ray-arr)" />
        <circle cx="25" cy="42" r="5" fill="#0284c7" />
        <circle cx="85" cy="42" r="4" fill="#0284c7" />
        <text x="25" y="24" textAnchor="middle" className="text-xs font-black fill-slate-800 dark:fill-slate-100">A</text>
        <text x="85" y="24" textAnchor="middle" className="text-xs font-black fill-slate-800 dark:fill-slate-100">B</text>
        <text x="80" y="65" textAnchor="middle" className="text-[11px] font-bold fill-cyan-600 dark:fill-cyan-400 font-mono">{label}</text>
      </svg>
    </div>
  );
};

/**
 * Párhuzamos egyenesek ábra
 */
export const ParallelLinesFigure: React.FC<{ label?: string }> = ({ label = 'a ∥ b' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-indigo-50/50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-indigo-200/60 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 160 95" className="w-full max-w-[170px] h-auto select-none">
        <line x1="15" y1="28" x2="145" y2="28" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="15" y1="68" x2="145" y2="68" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
        {/* Distance marker */}
        <line x1="75" y1="28" x2="75" y2="68" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="82" y="52" className="text-[9px] font-bold fill-amber-600">d = állandó</text>
        <text x="148" y="32" className="text-xs font-bold fill-indigo-600">a</text>
        <text x="148" y="72" className="text-xs font-bold fill-indigo-600">b</text>
        <text x="40" y="52" className="text-[10px] font-black fill-indigo-700 dark:fill-indigo-300 font-mono">{label}</text>
      </svg>
    </div>
  );
};

/**
 * Merőleges egyenesek ábra
 */
export const PerpendicularLinesFigure: React.FC<{ label?: string }> = ({ label = 'a ⊥ b (90°)' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-emerald-50/50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-emerald-200/60 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 160 110" className="w-full max-w-[170px] h-auto select-none">
        <line x1="15" y1="60" x2="145" y2="60" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="80" y1="12" x2="80" y2="98" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 96 60 A 16 16 0 0 0 80 44" fill="none" stroke="#ef4444" strokeWidth="1.8" />
        <circle cx="86" cy="54" r="1.5" fill="#ef4444" />
        <text x="146" y="64" className="text-xs font-bold fill-cyan-600">a</text>
        <text x="85" y="18" className="text-xs font-bold fill-emerald-600">b</text>
        <text x="105" y="48" className="text-[10px] font-bold fill-red-500">90°</text>
        <text x="80" y="106" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">{label}</text>
      </svg>
    </div>
  );
};

/**
 * Pótszög / Kiegészítő szög ábra (90°-os sarok vagy 180°-os egyenes szétosztása)
 */
export const AngleAdditionFigure: React.FC<{
  type: 'complementary' | 'supplementary';
  alpha: number;
  findTarget?: 'alpha' | 'beta';
}> = ({ type, alpha, findTarget = 'beta' }) => {
  if (type === 'complementary') {
    // 90 degrees total
    const beta = 90 - alpha;
    const rad = (alpha * Math.PI) / 180;
    const cx = 35;
    const cy = 95;
    const len = 65;
    const midX = cx + len * Math.cos(-rad);
    const midY = cy + len * Math.sin(-rad);

    return (
      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
        <svg viewBox="0 0 160 120" className="w-full max-w-[170px] h-auto select-none">
          {/* Outer right angle arms */}
          <line x1={cx} y1={cy} x2={cx + len + 10} y2={cy} stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={cx} y2={cy - len - 10} stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          {/* Dividing ray */}
          <line x1={cx} y1={cy} x2={midX} y2={midY} stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          {/* Right angle indicator: Hungarian standard */}
          <path d={`M ${cx + 14} ${cy} A 14 14 0 0 0 ${cx} ${cy - 14}`} fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx={cx + 5} cy={cy - 5} r="1" fill="#94a3b8" />

          {/* Alpha arc */}
          <path d={`M ${cx + 25} ${cy} A 25 25 0 0 0 ${cx + 25 * Math.cos(-rad)} ${cy + 25 * Math.sin(-rad)}`} fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="1.5" />
          <text x={cx + 34} y={cy - 8} className="text-[10px] font-black fill-cyan-600">
            {findTarget === 'alpha' ? 'α = ?' : `${alpha}°`}
          </text>

          {/* Beta arc */}
          <path d={`M ${cx + 35 * Math.cos(-rad)} ${cy + 35 * Math.sin(-rad)} A 35 35 0 0 0 ${cx} ${cy - 35}`} fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5" />
          <text x={cx + 16} y={cy - 44} className="text-[10px] font-black fill-amber-600">
            {findTarget === 'beta' ? 'β = ?' : `${beta}°`}
          </text>

          <circle cx={cx} cy={cy} r="3.5" fill="#0284c7" />
        </svg>
      </div>
    );
  } else {
    // 180 degrees total (supplementary)
    const beta = 180 - alpha;
    const rad = (alpha * Math.PI) / 180;
    const cx = 80;
    const cy = 80;
    const len = 55;
    const midX = cx + len * Math.cos(-rad);
    const midY = cy + len * Math.sin(-rad);

    return (
      <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
        <svg viewBox="0 0 160 110" className="w-full max-w-[170px] h-auto select-none">
          {/* Straight line */}
          <line x1="15" y1={cy} x2="145" y2={cy} stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          {/* Dividing ray */}
          <line x1={cx} y1={cy} x2={midX} y2={midY} stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />

          {/* Alpha arc (from right 0 deg to alpha) */}
          <path d={`M ${cx + 25} ${cy} A 25 25 0 0 0 ${cx + 25 * Math.cos(-rad)} ${cy + 25 * Math.sin(-rad)}`} fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="1.5" />
          <text x={cx + 32} y={cy - 12} className="text-[10px] font-black fill-cyan-600">
            {findTarget === 'alpha' ? 'α = ?' : `${alpha}°`}
          </text>

          {/* Beta arc (from alpha to 180 deg) */}
          <path d={`M ${cx + 25 * Math.cos(-rad)} ${cy + 25 * Math.sin(-rad)} A 25 25 0 0 0 ${cx - 25} ${cy}`} fill="rgba(124, 58, 237, 0.2)" stroke="#7c3aed" strokeWidth="1.5" />
          <text x={cx - 36} y={cy - 12} className="text-[10px] font-black fill-purple-600">
            {findTarget === 'beta' ? 'β = ?' : `${beta}°`}
          </text>

          <circle cx={cx} cy={cy} r="3.5" fill="#475569" />
        </svg>
      </div>
    );
  }
};

/**
 * Háromszög belső szögekkel
 */
export const TriangleAnglesFigure: React.FC<{
  a: number;
  b: number;
  findTarget?: 'c';
}> = ({ a, b }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 160 120" className="w-full max-w-[170px] h-auto select-none">
        <polygon points="30,95 135,95 80,25" fill="rgba(6, 182, 212, 0.12)" stroke="#0891b2" strokeWidth="2.5" />
        <circle cx="30" cy="95" r="3.5" fill="#0891b2" />
        <circle cx="135" cy="95" r="3.5" fill="#0891b2" />
        <circle cx="80" cy="25" r="3.5" fill="#0891b2" />

        <text x="48" y="90" className="text-[10px] font-black fill-cyan-700 dark:fill-cyan-300">{a}°</text>
        <text x="115" y="90" textAnchor="end" className="text-[10px] font-black fill-cyan-700 dark:fill-cyan-300">{b}°</text>
        <text x="80" y="48" textAnchor="middle" className="text-[11px] font-black fill-rose-600 animate-pulse">? = γ</text>
      </svg>
    </div>
  );
};

/**
 * Konkáv sokszög ábra a beharapással és külső átlóval
 */
export const ConcaveShapeFigure: React.FC<{ label?: string }> = ({ label = 'Konkáv sokszög' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-rose-50/50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-rose-200/70 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 160 115" className="w-full max-w-[170px] h-auto select-none">
        <polygon
          points="80,15 140,95 80,65 20,95"
          fill="rgba(244, 63, 94, 0.15)"
          stroke="#e11d48"
          strokeWidth="2.5"
        />
        {/* Exterior diagonal */}
        <line x1="20" y1="95" x2="140" y2="95" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 3" />
        {/* Reflex angle arc */}
        <path d="M 68 58 A 16 16 0 0 0 92 58" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="80" cy="15" r="3.5" fill="#e11d48" />
        <circle cx="140" cy="95" r="3.5" fill="#e11d48" />
        <circle cx="80" cy="65" r="3.5" fill="#f59e0b" />
        <circle cx="20" cy="95" r="3.5" fill="#e11d48" />
        <text x="80" y="107" textAnchor="middle" className="text-[9px] font-bold fill-red-600">Külső átló &gt; 180°</text>
      </svg>
    </div>
  );
};

/**
 * Sokszög ábra átlókkal és csúcsokkal
 */
export const PolygonFigure: React.FC<{
  sides: number;
  showDiagonals?: boolean;
  diagonalsFromOneVertex?: boolean;
  highlightAngle?: string;
}> = ({ sides, showDiagonals = false, diagonalsFromOneVertex = false, highlightAngle }) => {
  const cx = 80;
  const cy = 60;
  const r = 45;

  const points: { x: number; y: number }[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    points.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle)
    });
  }

  const polygonPointsStr = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 160 120" className="w-full max-w-[170px] h-auto select-none">
        <polygon points={polygonPointsStr} fill="rgba(14, 165, 233, 0.12)" stroke="#0284c7" strokeWidth="2.5" />

        {/* Diagonals */}
        {showDiagonals && (
          <g stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2">
            {diagonalsFromOneVertex ? (
              // From top vertex points[0] to all non-adjacent
              points.slice(2, sides - 1).map((p, idx) => (
                <line key={idx} x1={points[0].x} y1={points[0].y} x2={p.x} y2={p.y} />
              ))
            ) : (
              // All diagonals
              points.map((p1, i) =>
                points.slice(i + 2, i === 0 ? sides - 1 : sides).map((p2, j) => (
                  <line key={`${i}-${j}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />
                ))
              )
            )}
          </g>
        )}

        {/* Vertices */}
        {points.map((p, idx) => (
          <circle key={idx} cx={p.x} cy={p.y} r={idx === 0 && diagonalsFromOneVertex ? 4.5 : 3} fill={idx === 0 && diagonalsFromOneVertex ? '#ef4444' : '#0284c7'} />
        ))}

        {highlightAngle && (
          <text x={cx} y={cy + 5} textAnchor="middle" className="text-xs font-black fill-amber-600 dark:fill-amber-400 font-mono">
            {highlightAngle}
          </text>
        )}
      </svg>
    </div>
  );
};

/**
 * Csúcsszögek ábra (két egymást metsző egyenes)
 */
export const VerticalAnglesFigure: React.FC<{ angle: number; findTarget?: 'beta' }> = ({ angle }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 160 110" className="w-full max-w-[170px] h-auto select-none">
        <line x1="20" y1="90" x2="140" y2="20" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="20" x2="140" y2="90" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="80" cy="55" r="3.5" fill="#ef4444" />

        {/* Left angle alpha */}
        <text x="50" y="59" textAnchor="middle" className="text-xs font-black fill-cyan-600 font-mono">{angle}°</text>
        {/* Right opposite angle beta */}
        <text x="110" y="59" textAnchor="middle" className="text-xs font-black fill-purple-600 font-mono">β = ?</text>
      </svg>
    </div>
  );
};

// =========================================================================
// 🧩 SÍKBELI ALAKZATOK KOMPAKT MINI KÁRTYA ÁBRÁK (PlanarShapeMiniFigure)
// =========================================================================

export const PlanarShapeMiniFigure: React.FC<{
  type:
    | 'point'
    | 'segment'
    | 'ray'
    | 'line'
    | 'intersecting_lines'
    | 'parallel_lines'
    | 'perpendicular_lines'
    | 'acute_angle'
    | 'right_angle'
    | 'obtuse_angle'
    | 'straight_angle'
    | 'reflex_angle'
    | 'triangle'
    | 'quadrilateral'
    | 'convex_polygon'
    | 'concave_polygon'
    | 'regular_polygon'
    | 'square'
    | 'rectangle'
    | 'hexagon'
    | 'polygon_diagonals';
}> = ({ type }) => {
  return (
    <svg viewBox="0 0 90 50" className="w-[72px] h-[40px] select-none overflow-visible">
      {type === 'point' && (
        <g>
          <circle cx="45" cy="25" r="4.5" fill="#ef4444" />
          <text x="45" y="15" textAnchor="middle" className="text-[9px] font-black fill-red-600">P</text>
        </g>
      )}

      {type === 'segment' && (
        <g>
          <line x1="18" y1="25" x2="72" y2="25" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          <circle cx="18" cy="25" r="3" fill="#059669" />
          <circle cx="72" cy="25" r="3" fill="#059669" />
          <text x="18" y="16" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">A</text>
          <text x="72" y="16" textAnchor="middle" className="text-[8px] font-bold fill-emerald-700">B</text>
        </g>
      )}

      {type === 'ray' && (
        <g>
          <line x1="20" y1="25" x2="72" y2="25" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="75,25 68,22 68,28" fill="#0284c7" />
          <circle cx="20" cy="25" r="3" fill="#0284c7" />
          <circle cx="50" cy="25" r="2.5" fill="#0284c7" />
          <text x="20" y="16" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">A</text>
          <text x="50" y="16" textAnchor="middle" className="text-[8px] font-bold fill-sky-700">B</text>
        </g>
      )}

      {type === 'line' && (
        <g>
          <line x1="12" y1="25" x2="78" y2="25" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="82,25 76,22 76,28" fill="#7c3aed" />
          <polygon points="8,25 14,22 14,28" fill="#7c3aed" />
          <text x="45" y="18" textAnchor="middle" className="text-[9px] font-black italic fill-purple-700">e</text>
        </g>
      )}

      {type === 'intersecting_lines' && (
        <g>
          <line x1="18" y1="40" x2="72" y2="10" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="10" x2="72" y2="40" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
          <circle cx="45" cy="25" r="3" fill="#ef4444" />
          <text x="45" y="18" textAnchor="middle" className="text-[8px] font-bold fill-red-600">M</text>
        </g>
      )}

      {type === 'parallel_lines' && (
        <g>
          <line x1="15" y1="16" x2="75" y2="16" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="15" y1="34" x2="75" y2="34" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" />
          <text x="78" y="19" className="text-[8px] font-bold fill-indigo-600">a</text>
          <text x="78" y="37" className="text-[8px] font-bold fill-indigo-600">b</text>
        </g>
      )}

      {type === 'perpendicular_lines' && (
        <g>
          <line x1="15" y1="35" x2="75" y2="35" stroke="#0284c7" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="45" y1="8" x2="45" y2="45" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 53 35 A 8 8 0 0 0 45 27" fill="none" stroke="#ef4444" strokeWidth="1" />
          <circle cx="48" cy="32" r="0.8" fill="#ef4444" />
        </g>
      )}

      {type === 'acute_angle' && (
        <g>
          <line x1="20" y1="38" x2="75" y2="38" stroke="#0284c7" strokeWidth="2" />
          <line x1="20" y1="38" x2="65" y2="12" stroke="#0284c7" strokeWidth="2" />
          <path d="M 40 38 A 20 20 0 0 0 35 27" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="20" cy="38" r="2.5" fill="#0284c7" />
          <text x="44" y="32" className="text-[8px] font-bold fill-amber-600 font-mono">&lt;90°</text>
        </g>
      )}

      {type === 'right_angle' && (
        <g>
          <line x1="25" y1="40" x2="75" y2="40" stroke="#059669" strokeWidth="2" />
          <line x1="25" y1="40" x2="25" y2="8" stroke="#059669" strokeWidth="2" />
          <path d="M 37 40 A 12 12 0 0 0 25 28" fill="none" stroke="#ef4444" strokeWidth="1.2" />
          <circle cx="30" cy="35" r="1" fill="#ef4444" />
          <circle cx="25" cy="40" r="2.5" fill="#059669" />
          <text x="50" y="28" className="text-[8px] font-bold fill-red-600 font-mono">90°</text>
        </g>
      )}

      {type === 'obtuse_angle' && (
        <g>
          <line x1="38" y1="38" x2="80" y2="38" stroke="#7c3aed" strokeWidth="2" />
          <line x1="38" y1="38" x2="12" y2="15" stroke="#7c3aed" strokeWidth="2" />
          <path d="M 54 38 A 16 16 0 0 0 25 26" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="38" cy="38" r="2.5" fill="#7c3aed" />
          <text x="48" y="24" className="text-[8px] font-bold fill-purple-700 font-mono">&gt;90°</text>
        </g>
      )}

      {type === 'straight_angle' && (
        <g>
          <line x1="12" y1="32" x2="78" y2="32" stroke="#ea580c" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 28 32 A 17 17 0 0 1 62 32" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="45" cy="32" r="2.5" fill="#ea580c" />
          <text x="45" y="20" textAnchor="middle" className="text-[8px] font-bold fill-orange-600 font-mono">180°</text>
        </g>
      )}

      {type === 'reflex_angle' && (
        <g>
          <line x1="45" y1="25" x2="78" y2="25" stroke="#db2777" strokeWidth="2" />
          <line x1="45" y1="25" x2="25" y2="10" stroke="#db2777" strokeWidth="2" />
          <path d="M 58 25 A 13 13 0 1 1 34 16" fill="none" stroke="#ec4899" strokeWidth="2" />
          <circle cx="45" cy="25" r="2.5" fill="#db2777" />
          <text x="45" y="44" textAnchor="middle" className="text-[8px] font-bold fill-pink-600 font-mono">&gt;180°</text>
        </g>
      )}

      {type === 'triangle' && (
        <g>
          <polygon points="45,8 75,42 15,42" fill="rgba(6, 182, 212, 0.25)" stroke="#0891b2" strokeWidth="2" />
        </g>
      )}

      {type === 'quadrilateral' && (
        <g>
          <polygon points="20,12 70,10 78,40 14,38" fill="rgba(79, 70, 229, 0.25)" stroke="#4f46e5" strokeWidth="2" />
        </g>
      )}

      {type === 'convex_polygon' && (
        <g>
          <polygon points="45,8 75,20 68,44 22,44 15,20" fill="rgba(16, 185, 129, 0.25)" stroke="#059669" strokeWidth="2" />
        </g>
      )}

      {type === 'concave_polygon' && (
        <g>
          <polygon points="45,8 78,44 45,28 12,44" fill="rgba(244, 63, 94, 0.25)" stroke="#e11d48" strokeWidth="2" />
          <line x1="12" y1="44" x2="78" y2="44" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="2 2" />
        </g>
      )}

      {type === 'regular_polygon' && (
        <g>
          <polygon points="45,6 76,26 64,46 26,46 14,26" fill="rgba(245, 158, 11, 0.25)" stroke="#d97706" strokeWidth="2" />
        </g>
      )}

      {type === 'square' && (
        <g>
          <rect x="27" y="7" width="36" height="36" rx="2" fill="rgba(16, 185, 129, 0.25)" stroke="#059669" strokeWidth="2" />
        </g>
      )}

      {type === 'rectangle' && (
        <g>
          <rect x="18" y="12" width="54" height="26" rx="2" fill="rgba(2, 132, 199, 0.25)" stroke="#0284c7" strokeWidth="2" />
        </g>
      )}

      {type === 'hexagon' && (
        <g>
          <polygon points="30,8 60,8 75,25 60,42 30,42 15,25" fill="rgba(147, 51, 234, 0.25)" stroke="#9333ea" strokeWidth="2" />
        </g>
      )}

      {type === 'polygon_diagonals' && (
        <g>
          <polygon points="30,8 60,8 75,25 60,42 30,42 15,25" fill="none" stroke="#9333ea" strokeWidth="1.5" />
          <line x1="30" y1="8" x2="60" y2="42" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="60" y1="8" x2="30" y2="42" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="15" y1="25" x2="75" y2="25" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>
      )}
    </svg>
  );
};

