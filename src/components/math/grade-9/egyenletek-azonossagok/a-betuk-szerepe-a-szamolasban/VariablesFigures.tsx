import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Monom anatómiai ábra: előjel, együttható, változók és kitevők
export const MonomialStructureSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 200"
      width={size}
      height={size * 0.55}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <defs>
        <linearGradient id="monomialBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
        <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
        </marker>
        <marker id="arrowUpPurple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
        </marker>
        <marker id="arrowUpAmber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
      </defs>

      {/* Háttér kártya */}
      <rect x="10" y="10" width="340" height="180" rx="16" fill="url(#monomialBg)" stroke="#cbd5e1" strokeWidth="2" />

      {/* Monom felirata: -5 x^3 y^2 */}
      <g transform="translate(180, 75)" textAnchor="middle" fontFamily="system-ui, sans-serif">
        {/* Együttható: -5 */}
        <text x="-65" y="0" fontSize="38" fontWeight="bold" fill="#2563eb">-5</text>
        {/* Változó x */}
        <text x="-15" y="0" fontSize="38" fontWeight="bold" fill="#7c3aed">x</text>
        {/* Kitevő 3 */}
        <text x="10" y="-16" fontSize="22" fontWeight="bold" fill="#d97706">3</text>
        {/* Változó y */}
        <text x="35" y="0" fontSize="38" fontWeight="bold" fill="#7c3aed">y</text>
        {/* Kitevő 2 */}
        <text x="60" y="-16" fontSize="22" fontWeight="bold" fill="#d97706">2</text>
      </g>

      {/* Nyilak és magyarázatok */}
      {/* Együttható nyíl */}
      <path d="M 115 140 L 115 95" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowUp)" strokeDasharray="3 3" />
      <text x="115" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8" fontFamily="system-ui, sans-serif">
        Együttható
      </text>
      <text x="115" y="174" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">
        (szorzószám: -5)
      </text>

      {/* Változók nyíl */}
      <path d="M 195 140 L 195 95" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowUpPurple)" strokeDasharray="3 3" />
      <text x="195" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9" fontFamily="system-ui, sans-serif">
        Változók
      </text>
      <text x="195" y="174" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">
        (betűs rész: x, y)
      </text>

      {/* Kitevők / Fokszám nyíl */}
      <path d="M 270 140 L 250 85" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowUpAmber)" strokeDasharray="3 3" />
      <text x="275" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309" fontFamily="system-ui, sans-serif">
        Kitevők összege
      </text>
      <text x="275" y="174" textAnchor="middle" fontSize="10" fill="#64748b" fontFamily="system-ui, sans-serif">
        (Fokszám: 3 + 2 = 5)
      </text>
    </svg>
  );
};

// 2. Behelyettesítési Érték Gép (Evaluation Machine) ábra
export const EvaluationMachineSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 190"
      width={size}
      height={size * 0.52}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <defs>
        <linearGradient id="machineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Bemenet kártya */}
      <g transform="translate(20, 50)">
        <rect width="70" height="70" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
        <text x="35" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af" fontFamily="system-ui, sans-serif">
          BEMENET
        </text>
        <text x="35" y="55" textAnchor="middle" fontSize="22" fontWeight="black" fill="#1d4ed8" fontFamily="system-ui, sans-serif">
          x = -3
        </text>
      </g>

      {/* Nyíl bemenettől a gépbe */}
      <path d="M 95 85 L 125 85" stroke="#60a5fa" strokeWidth="3" markerEnd="url(#arrowUp)" />

      {/* Feldolgozó gép */}
      <g transform="translate(130, 25)">
        <rect width="130" height="120" rx="16" fill="url(#machineGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
        <text x="65" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dbeafe" letterSpacing="1" fontFamily="system-ui, sans-serif">
          KIFEJEZÉS GÉP
        </text>
        <rect x="15" y="38" width="100" height="32" rx="8" fill="#1e3a8a" opacity="0.6" />
        <text x="65" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          2x² - 5x + 1
        </text>
        <text x="65" y="90" textAnchor="middle" fontSize="10" fill="#93c5fd" fontFamily="system-ui, sans-serif">
          2·(-3)² - 5·(-3) + 1
        </text>
        <text x="65" y="105" textAnchor="middle" fontSize="10" fill="#bfdbfe" fontFamily="system-ui, sans-serif">
          = 18 + 15 + 1
        </text>
      </g>

      {/* Nyíl géptől kimenetig */}
      <path d="M 265 85 L 295 85" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowUp)" />

      {/* Kimenet kártya */}
      <g transform="translate(300, 50)">
        <rect width="70" height="70" rx="12" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="2" />
        <text x="35" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46" fontFamily="system-ui, sans-serif">
          KIMENET
        </text>
        <text x="35" y="55" textAnchor="middle" fontSize="24" fontWeight="black" fill="#059669" fontFamily="system-ui, sans-serif">
          34
        </text>
      </g>
    </svg>
  );
};

// 3. Egynemű kifejezések összehasonlító / mérleg ábrája
export const LikeTermsBalanceSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 180"
      width={size}
      height={size * 0.5}
      className={`select-none max-w-full h-auto ${className}`}
    >
      {/* Bal oldal: ÖSSZEVONHATÓ egynemű tagok */}
      <g transform="translate(15, 15)">
        <rect width="155" height="150" rx="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
        <circle cx="28" cy="28" r="12" fill="#22c55e" />
        <path d="M 23 28 L 27 32 L 34 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="46" y="32" fontSize="13" fontWeight="bold" fill="#15803d" fontFamily="system-ui, sans-serif">
          ÖSSZEVONHATÓ
        </text>

        <text x="77" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#166534" fontFamily="monospace">
          3a²b + 5a²b
        </text>
        <text x="77" y="85" textAnchor="middle" fontSize="11" fill="#4ade80" fontFamily="system-ui, sans-serif">
          azonos betűs rész: a²b
        </text>

        {/* Eredmény */}
        <rect x="25" y="100" width="105" height="32" rx="8" fill="#dcfce7" stroke="#4ade80" strokeWidth="1.5" />
        <text x="77" y="122" textAnchor="middle" fontSize="15" fontWeight="black" fill="#14532d" fontFamily="monospace">
          = 8a²b
        </text>
      </g>

      {/* Jobb oldal: NEM ÖSSZEVONHATÓ különnemű tagok */}
      <g transform="translate(190, 15)">
        <rect width="155" height="150" rx="14" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
        <circle cx="28" cy="28" r="12" fill="#ef4444" />
        <path d="M 24 24 L 32 32 M 32 24 L 24 32" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <text x="46" y="32" fontSize="13" fontWeight="bold" fill="#b91c1c" fontFamily="system-ui, sans-serif">
          NEM VONHATÓ
        </text>

        <text x="77" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#991b1b" fontFamily="monospace">
          3a²b + 5ab²
        </text>
        <text x="77" y="85" textAnchor="middle" fontSize="11" fill="#f87171" fontFamily="system-ui, sans-serif">
          különböző kitevők!
        </text>

        {/* Eredmény */}
        <rect x="18" y="100" width="120" height="32" rx="8" fill="#fee2e2" stroke="#f87171" strokeWidth="1.5" />
        <text x="77" y="121" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7f1d1d" fontFamily="system-ui, sans-serif">
          Nem egyszerűsíthető
        </text>
      </g>
    </svg>
  );
};

// 4. Szövegből kifejezés (Text to Formula) ábra
export const TextToFormulaSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 170"
      width={size}
      height={size * 0.47}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="150" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

      {/* Szöveges mondat */}
      <rect x="25" y="25" width="310" height="38" rx="10" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1.5" />
      <text x="180" y="49" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#5b21b6" fontFamily="system-ui, sans-serif">
        „Egy szám háromszorosánál 5-tel kisebb szám”
      </text>

      {/* Dekódolás nyilakkal */}
      <g transform="translate(180, 85)" textAnchor="middle" fontFamily="system-ui, sans-serif">
        <text x="-90" y="0" fontSize="11" fill="#64748b">egy szám: x</text>
        <text x="-10" y="0" fontSize="11" fill="#64748b">háromszorosa: 3x</text>
        <text x="90" y="0" fontSize="11" fill="#64748b">5-tel kisebb: - 5</text>
      </g>

      {/* Eredmény matematikai kifejezés */}
      <rect x="110" y="102" width="140" height="42" rx="12" fill="#3b82f6" />
      <text x="180" y="129" textAnchor="middle" fontSize="22" fontWeight="black" fill="#ffffff" fontFamily="monospace">
        3x - 5
      </text>
    </svg>
  );
};

