import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Melyik van felül? f(x) > g(x) grafikus elve vetítéssel az x-tengelyre
 */
export const AboveBelowConceptSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <defs>
        <marker id="ab-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b" />
        </marker>
      </defs>

      <rect width="320" height="220" fill="#0f172a" rx="8" />
      {/* Tengelyek */}
      <path d="M 30 150 L 300 150" stroke="#334155" strokeWidth="1.5" markerEnd="url(#ab-arrow)" />
      <path d="M 160 200 L 160 20" stroke="#334155" strokeWidth="1.5" markerEnd="url(#ab-arrow)" />
      <text x="295" y="165" fill="#94a3b8" fontSize="11">x</text>
      <text x="148" y="28" fill="#94a3b8" fontSize="11">y</text>

      {/* Árnyékolt sáv a két metszéspont között, ahol f(x) < g(x) */}
      <path
        d="M 90 115 Q 160 190, 230 75 L 90 115 Z"
        fill="#10b981"
        fillOpacity="0.2"
      />
      <text x="160" y="110" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">
        g(x) &gt; f(x) (g van felül)
      </text>

      {/* f(x) = parabola (kék) */}
      <path
        d="M 60 40 Q 160 220, 260 25"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="65" y="35" fill="#38bdf8" fontSize="11" fontWeight="bold">y = f(x)</text>

      {/* g(x) = egyenes (sárga) */}
      <line x1="50" y1="125" x2="270" y2="65" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <text x="275" y="65" fill="#fbbf24" fontSize="11" fontWeight="bold">y = g(x)</text>

      {/* Határpontok: M1(90; 115) és M2(230; 75) */}
      <line x1="90" y1="115" x2="90" y2="150" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="230" y1="75" x2="230" y2="150" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Megoldás intervallum az x-tengelyen: [x1; x2] */}
      <line x1="90" y1="150" x2="230" y2="150" stroke="#10b981" strokeWidth="4" />
      <circle cx="90" cy="150" r="4.5" fill="#10b981" />
      <circle cx="230" cy="150" r="4.5" fill="#10b981" />
      <text x="90" y="170" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">x₁</text>
      <text x="230" y="170" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">x₂</text>

      <text x="160" y="195" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
        Megoldás: x ∈ [x₁; x₂]
      </text>
    </svg>
  );
};

/**
 * Nyílt vs Zárt intervallumok (Szigorú vs Megengedő relációk)
 */
export const IntervalBracketsSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={size * (180 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="180" fill="#0f172a" rx="8" />

      {/* 1. panel: Szigorú egyenlőtlenség (<, >) -> Nyílt intervallum */}
      <rect x="15" y="15" width="140" height="150" fill="#1e293b" rx="6" stroke="#334155" strokeWidth="1" />
      <text x="85" y="38" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
        Szigorú: &lt; vagy &gt;
      </text>
      {/* Számegyenes */}
      <line x1="25" y1="80" x2="145" y2="80" stroke="#64748b" strokeWidth="1.5" />
      <line x1="50" y1="80" x2="120" y2="80" stroke="#38bdf8" strokeWidth="3" />
      {/* Üres karikák */}
      <circle cx="50" cy="80" r="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <circle cx="120" cy="80" r="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="50" y="100" fill="#93c5fd" fontSize="11" textAnchor="middle">a</text>
      <text x="120" y="100" fill="#93c5fd" fontSize="11" textAnchor="middle">b</text>
      <text x="85" y="125" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
        x ∈ ]a; b[
      </text>
      <text x="85" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">
        Üres karika: a határ NEM része
      </text>

      {/* 2. panel: Megengedő egyenlőtlenség (≤, ≥) -> Zárt intervallum */}
      <rect x="165" y="15" width="140" height="150" fill="#1e293b" rx="6" stroke="#334155" strokeWidth="1" />
      <text x="235" y="38" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
        Megengedő: ≤ vagy ≥
      </text>
      {/* Számegyenes */}
      <line x1="175" y1="80" x2="295" y2="80" stroke="#64748b" strokeWidth="1.5" />
      <line x1="200" y1="80" x2="270" y2="80" stroke="#10b981" strokeWidth="3" />
      {/* Teli karikák */}
      <circle cx="200" cy="80" r="4.5" fill="#10b981" />
      <circle cx="270" cy="80" r="4.5" fill="#10b981" />
      <text x="200" y="100" fill="#a7f3d0" fontSize="11" textAnchor="middle">a</text>
      <text x="270" y="100" fill="#a7f3d0" fontSize="11" textAnchor="middle">b</text>
      <text x="235" y="125" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
        x ∈ [a; b]
      </text>
      <text x="235" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">
        Teli karika: a határ RÉSZE
      </text>
    </svg>
  );
};

/**
 * Abszolútértékes távolság: |x - u| ≤ d (belső) vs > d (külső)
 */
export const AbsDistanceInequalitySvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      width={size}
      height={size * (200 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="200" fill="#0f172a" rx="8" />

      {/* Felső: |x - u| ≤ d -> Belső szakasz */}
      <text x="160" y="28" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
        |x - u| ≤ d &nbsp;⟹&nbsp; Belső szakasz: [u - d; u + d]
      </text>
      <line x1="30" y1="55" x2="290" y2="55" stroke="#475569" strokeWidth="1.5" />
      <line x1="100" y1="55" x2="220" y2="55" stroke="#fbbf24" strokeWidth="4" />
      <circle cx="160" cy="55" r="3.5" fill="#ffffff" />
      <text x="160" y="70" fill="#cbd5e1" fontSize="10" textAnchor="middle">u (közép)</text>
      <circle cx="100" cy="55" r="4" fill="#fbbf24" />
      <text x="100" y="70" fill="#fde68a" fontSize="10" textAnchor="middle">u - d</text>
      <circle cx="220" cy="55" r="4" fill="#fbbf24" />
      <text x="220" y="70" fill="#fde68a" fontSize="10" textAnchor="middle">u + d</text>

      {/* Elválasztó vonal */}
      <line x1="30" y1="95" x2="290" y2="95" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

      {/* Alsó: |x - u| > d -> Két külső félegyenes */}
      <text x="160" y="125" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">
        |x - u| &gt; d &nbsp;⟹&nbsp; Külső ágak: ]-∞; u - d[ ∪ ]u + d; ∞[
      </text>
      <line x1="30" y1="155" x2="290" y2="155" stroke="#475569" strokeWidth="1.5" />
      {/* Bal félegyenes */}
      <line x1="30" y1="155" x2="100" y2="155" stroke="#f43f5e" strokeWidth="4" />
      {/* Jobb félegyenes */}
      <line x1="220" y1="155" x2="290" y2="155" stroke="#f43f5e" strokeWidth="4" />
      <circle cx="100" cy="155" r="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
      <circle cx="220" cy="155" r="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
      <text x="100" y="172" fill="#fda4af" fontSize="10" textAnchor="middle">u - d</text>
      <text x="220" y="172" fill="#fda4af" fontSize="10" textAnchor="middle">u + d</text>
      <text x="160" y="188" fill="#94a3b8" fontSize="9" textAnchor="middle">
        A távolság u-tól nagyobb d-nél
      </text>
    </svg>
  );
};

