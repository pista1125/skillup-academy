import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Grafikus megoldás elve: f(x) = g(x) metszéspontjai és a megoldás levetítése az x-tengelyre
 */
export const IntersectionConceptSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <defs>
        <marker id="ic-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b" />
        </marker>
      </defs>

      <rect width="320" height="220" fill="#0f172a" rx="8" />
      {/* Tengelyek */}
      <path d="M 30 150 L 300 150" stroke="#334155" strokeWidth="1.5" markerEnd="url(#ic-arrow)" />
      <path d="M 160 200 L 160 20" stroke="#334155" strokeWidth="1.5" markerEnd="url(#ic-arrow)" />
      <text x="295" y="165" fill="#94a3b8" fontSize="11">x</text>
      <text x="148" y="28" fill="#94a3b8" fontSize="11">y</text>

      {/* Bal oldal f(x): Parabola (ciánkék) */}
      <path
        d="M 70 30 Q 160 230, 250 30"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="75" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">y₁ = f(x)</text>

      {/* Jobb oldal g(x): Egyenes (borostyán sárga) */}
      <line x1="50" y1="140" x2="270" y2="40" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      <text x="260" y="35" fill="#fbbf24" fontSize="11" fontWeight="bold">y₂ = g(x)</text>

      {/* Metszéspont 1: M1(95; 120) */}
      <line x1="95" y1="120" x2="95" y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="95" cy="120" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="95" cy="150" r="4" fill="#ef4444" />
      <text x="95" y="168" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">x₁</text>
      <text x="70" y="115" fill="#fca5a5" fontSize="10">M₁</text>

      {/* Metszéspont 2: M2(225; 60) */}
      <line x1="225" y1="60" x2="225" y2="150" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="225" cy="60" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="225" cy="150" r="4" fill="#10b981" />
      <text x="225" y="168" fill="#86efac" fontSize="11" fontWeight="bold" textAnchor="middle">x₂</text>
      <text x="238" y="60" fill="#86efac" fontSize="10">M₂</text>

      {/* Cím / magyarázat */}
      <text x="160" y="205" fill="#e2e8f0" fontSize="10" textAnchor="middle">
        A megoldáshalmaz: x ∈ &#123;x₁; x₂&#125; (CSAK az x koordináták!)
      </text>
    </svg>
  );
};

/**
 * Megoldások lehetséges száma (0, 1 vagy 2 metszéspont)
 */
export const CasesOfSolutionsSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={size * (180 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="180" fill="#0f172a" rx="8" />

      {/* 1. panel: 2 megoldás (metsző) */}
      <rect x="12" y="15" width="92" height="150" fill="#1e293b" rx="6" stroke="#334155" strokeWidth="1" />
      <path d="M 22 50 Q 58 135, 94 50" fill="none" stroke="#38bdf8" strokeWidth="2" />
      <line x1="20" y1="90" x2="96" y2="70" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="34" cy="86" r="3" fill="#10b981" />
      <circle cx="82" cy="74" r="3" fill="#10b981" />
      <text x="58" y="135" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">2 megoldás</text>
      <text x="58" y="150" fill="#94a3b8" fontSize="9" textAnchor="middle">2 metszéspont</text>

      {/* 2. panel: 1 megoldás (érintő) */}
      <rect x="114" y="15" width="92" height="150" fill="#1e293b" rx="6" stroke="#334155" strokeWidth="1" />
      <path d="M 124 50 Q 160 135, 196 50" fill="none" stroke="#38bdf8" strokeWidth="2" />
      <line x1="120" y1="93" x2="200" y2="93" stroke="#f59e0b" strokeWidth="2" />
      <circle cx="160" cy="93" r="3.5" fill="#fbbf24" />
      <text x="160" y="135" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">1 megoldás</text>
      <text x="160" y="150" fill="#94a3b8" fontSize="9" textAnchor="middle">Érintési pont</text>

      {/* 3. panel: 0 megoldás (nem találkoznak) */}
      <rect x="216" y="15" width="92" height="150" fill="#1e293b" rx="6" stroke="#334155" strokeWidth="1" />
      <path d="M 226 40 Q 262 105, 298 40" fill="none" stroke="#38bdf8" strokeWidth="2" />
      <line x1="224" y1="120" x2="300" y2="105" stroke="#f59e0b" strokeWidth="2" />
      <text x="262" y="135" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">0 megoldás</text>
      <text x="262" y="150" fill="#94a3b8" fontSize="9" textAnchor="middle">M = ∅ (nincs közös)</text>
    </svg>
  );
};

/**
 * Abszolútértékes egyenlet grafikus képe: |x - u| = c
 */
export const AbsLinearIntersectionSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" rx="8" />
      {/* Tengelyek */}
      <path d="M 30 160 L 290 160" stroke="#334155" strokeWidth="1.5" />
      <path d="M 160 200 L 160 20" stroke="#334155" strokeWidth="1.5" />

      {/* V-alak: |x - 2| -> csúcs (190, 160) */}
      <path d="M 90 60 L 190 160 L 290 60" fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
      <text x="245" y="55" fill="#c084fc" fontSize="11" fontWeight="bold">y = |x - 2|</text>

      {/* Vízszintes egyenes: y = 3 (magasság 90) */}
      <line x1="40" y1="90" x2="280" y2="90" stroke="#38bdf8" strokeWidth="2.5" />
      <text x="45" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold">y = 3</text>

      {/* Metszéspont 1: x = -1 (120, 90) */}
      <line x1="120" y1="90" x2="120" y2="160" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="120" cy="90" r="4.5" fill="#f59e0b" />
      <circle cx="120" cy="160" r="3.5" fill="#f59e0b" />
      <text x="120" y="176" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">x₁ = -1</text>

      {/* Metszéspont 2: x = 5 (260, 90) */}
      <line x1="260" y1="90" x2="260" y2="160" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="260" cy="90" r="4.5" fill="#f59e0b" />
      <circle cx="260" cy="160" r="3.5" fill="#f59e0b" />
      <text x="260" y="176" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">x₂ = 5</text>
    </svg>
  );
};

