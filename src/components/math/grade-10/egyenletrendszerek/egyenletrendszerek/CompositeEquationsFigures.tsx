import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Háromismeretlenes lineáris rendszerek (3 sík metszéspontja)
export const ThreeLinearPlanesSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím doboz */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
        Háromismeretlenes Rendszer (3 sík metszéspontja)
      </text>

      {/* 3 sík illusztrációja axonometriában */}
      {/* Sík 1 (kék) */}
      <polygon points="50,110 170,60 270,90 150,140" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="70" y="100" fill="#38bdf8" fontSize="10" fontWeight="bold">Sík 1: A₁x+B₁y+C₁z=D₁</text>

      {/* Sík 2 (lila) */}
      <polygon points="60,60 200,80 260,160 120,140" fill="rgba(168, 85, 247, 0.25)" stroke="#a855f7" strokeWidth="1.5" />
      <text x="210" y="75" fill="#c084fc" fontSize="10" fontWeight="bold">Sík 2</text>

      {/* Sík 3 (zöldes-sárga) */}
      <polygon points="100,40 220,130 180,195 60,105" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="1.5" />
      <text x="195" y="185" fill="#fde047" fontSize="10" fontWeight="bold">Sík 3</text>

      {/* Közös metszéspont (x₀; y₀; z₀) */}
      <circle cx="158" cy="112" r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <circle cx="158" cy="112" r="11" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Jelölő felirat a metszéspontra */}
      <rect x="180" y="100" width="125" height="36" rx="5" fill="rgba(15, 23, 42, 0.9)" stroke="#ef4444" strokeWidth="1" />
      <text x="186" y="115" fill="#fca5a5" fontSize="10" fontWeight="bold">Metszéspont:</text>
      <text x="186" y="128" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">M(x₀; y₀; z₀)</text>

      {/* Alsó megjegyzés */}
      <rect x="20" y="180" width="280" height="28" rx="5" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="198" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Gauss-kiküszöbölés: 3 ismeretlen ➔ 2 ismeretlen ➔ 1 ismeretlen
      </text>
    </svg>
  );
};

// 2. Másodfokú és elsőfokú egyenletrendszer (Egyenes és Kör metszése)
export const LineAndCircleSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">
        Másodfokú Rendszer (Kör és Egyenes)
      </text>

      {/* Rács és tengelyek */}
      <line x1="25" y1="120" x2="295" y2="120" stroke="#475569" strokeWidth="1" />
      <line x1="140" y1="42" x2="140" y2="198" stroke="#475569" strokeWidth="1" />
      <text x="290" y="115" fill="#64748b" fontSize="10">x</text>
      <text x="145" y="52" fill="#64748b" fontSize="10">y</text>

      {/* Kör: x² + y² = 25 (r = 50px a rajzon) */}
      <circle cx="140" cy="120" r="55" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="2" />
      <text x="80" y="75" fill="#c084fc" fontSize="10" fontWeight="bold">x² + y² = 25</text>

      {/* Szelő egyenes: y = x + 1 (áthalad a körön) */}
      <line x1="60" y1="200" x2="220" y2="40" stroke="#38bdf8" strokeWidth="2" />
      <text x="215" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold">y = x + 1</text>

      {/* 1. Metszéspont P1(3; 4) */}
      <circle cx="173" cy="87" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="180" y="75" width="60" height="18" rx="3" fill="rgba(15, 23, 42, 0.85)" stroke="#10b981" strokeWidth="1" />
      <text x="185" y="88" fill="#a7f3d0" fontSize="9" fontWeight="bold" fontFamily="monospace">P₁(3; 4)</text>

      {/* 2. Metszéspont P2(-4; -3) */}
      <circle cx="96" cy="164" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="42" y="162" width="65" height="18" rx="3" fill="rgba(15, 23, 42, 0.85)" stroke="#10b981" strokeWidth="1" />
      <text x="45" y="175" fill="#a7f3d0" fontSize="9" fontWeight="bold" fontFamily="monospace">P₂(−4; −3)</text>

      {/* Alsó infó: diszkrimináns */}
      <rect x="20" y="188" width="280" height="24" rx="4" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="204" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Behelyettesítés másodfokúba: D &gt; 0 (2 mo.), D = 0 (érintő: 1 mo.), D &lt; 0 (0 mo.)
      </text>
    </svg>
  );
};

// 3. Egyenes és Parabola metszéspontjai (Matematikailag és grafikailag egzakt)
export const LineAndParabolaSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
        Parabola és Egyenes Metszése
      </text>

      {/* Finom koordináta-háló */}
      <g stroke="#334155" strokeWidth="0.8" strokeDasharray="2,2">
        {/* y = 1, y = 4 rácsvonalak (y = 142 és y = 88) */}
        <line x1="40" y1="142" x2="280" y2="142" />
        <line x1="40" y1="88" x2="280" y2="88" />
        {/* x = -1, x = 2 rácsvonalak (x = 128 és x = 194) */}
        <line x1="128" y1="42" x2="128" y2="180" />
        <line x1="194" y1="42" x2="194" y2="180" />
      </g>

      {/* Tengelyek */}
      <line x1="25" y1="160" x2="295" y2="160" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-x)" />
      <line x1="150" y1="185" x2="150" y2="42" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrow-y)" />
      <text x="290" y="155" fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
      <text x="156" y="52" fill="#94a3b8" fontSize="11" fontWeight="bold">y</text>
      <text x="140" y="174" fill="#64748b" fontSize="10" fontFamily="monospace">0</text>

      {/* Tengely osztások */}
      <text x="128" y="174" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">-1</text>
      <text x="194" y="174" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">2</text>
      <text x="142" y="145" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">1</text>
      <text x="142" y="91" fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">4</text>

      {/* Parabola: y = x² (csúcspont az origóban (150, 160)) */}
      <path d="M 97.2 56.3 Q 150 263.7 202.8 56.3" fill="none" stroke="#34d399" strokeWidth="2.5" />
      <rect x="212" y="55" width="55" height="18" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="#34d399" strokeWidth="1" />
      <text x="239" y="68" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">y = x²</text>

      {/* Szelő egyenes: y = x + 2 (pontosan átmegy (-1; 1) és (2; 4) pontokon) */}
      <line x1="95" y1="169" x2="212" y2="73.6" stroke="#f59e0b" strokeWidth="2.5" />
      <rect x="52" y="172" width="65" height="18" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="#f59e0b" strokeWidth="1" />
      <text x="84" y="185" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">y = x + 2</text>

      {/* Vetítő szaggatott vonalak a metszéspontokhoz */}
      <line x1="128" y1="160" x2="128" y2="142" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="150" y1="142" x2="128" y2="142" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="194" y1="160" x2="194" y2="88" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="150" y1="88" x2="194" y2="88" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />

      {/* Metszéspont 1: M1(2; 4) */}
      <circle cx="194" cy="88" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <rect x="204" y="78" width="62" height="20" rx="4" fill="rgba(15, 23, 42, 0.95)" stroke="#ef4444" strokeWidth="1.2" />
      <text x="235" y="92" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">M₁(2; 4)</text>

      {/* Metszéspont 2: M2(-1; 1) */}
      <circle cx="128" cy="142" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <rect x="54" y="128" width="66" height="20" rx="4" fill="rgba(15, 23, 42, 0.95)" stroke="#ef4444" strokeWidth="1.2" />
      <text x="87" y="142" fill="#fca5a5" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">M₂(−1; 1)</text>

      {/* Alsó doboz levezetéssel */}
      <rect x="15" y="185" width="290" height="26" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="1" />
      <text x="160" y="202" fill="#f1f5f9" fontSize="10.5" fontWeight="bold" textAnchor="middle">
        x² = x + 2 ⟹ x² − x − 2 = 0 ⟹ x₁ = 2, x₂ = −1
      </text>
    </svg>
  );
};

// 3/B. Szimmetrikus Kétismeretlenes Rendszerek és Viète-modell
export const SymmetricSystemsSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">
        Szimmetrikus Rendszer és Viète-modell
      </text>

      {/* Koordináta rács és tengelyek: origó O(55, 175) */}
      <line x1="45" y1="175" x2="280" y2="175" stroke="#64748b" strokeWidth="1.5" />
      <line x1="55" y1="185" x2="55" y2="40" stroke="#64748b" strokeWidth="1.5" />
      <text x="275" y="170" fill="#94a3b8" fontSize="10" fontWeight="bold">x</text>
      <text x="60" y="50" fill="#94a3b8" fontSize="10" fontWeight="bold">y</text>
      <text x="45" y="186" fill="#64748b" fontSize="9" fontFamily="monospace">0</text>

      {/* Szimmetriatengely: y = x (45 fokos szaggatott vonal az origóból) */}
      <line x1="55" y1="175" x2="195" y2="35" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,3" />
      <text x="198" y="44" fill="#c084fc" fontSize="9" fontWeight="bold">y = x</text>

      {/* Tükrözési szakasz M1 és M2 között (merőleges az y = x-re) */}
      <line x1="105" y1="85" x2="145" y2="125" stroke="#ec4899" strokeWidth="1" strokeDasharray="2,2" />

      {/* Hiperbola: x · y = 45 ⟹ y = 45 / x */}
      <path
        d="M 90 52 C 96 70, 99 78, 105 85 C 117 99, 132 114, 145 125 C 158 135, 178 141, 205 147"
        fill="none"
        stroke="#10b981"
        strokeWidth="2.5"
      />
      <rect x="208" y="137" width="60" height="18" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="#10b981" strokeWidth="1" />
      <text x="238" y="150" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle">x · y = 45</text>

      {/* Egyenes: x + y = 14 ⟹ y = 14 - x */}
      <line x1="75" y1="55" x2="175" y2="155" stroke="#38bdf8" strokeWidth="2.5" />
      <rect x="40" y="52" width="62" height="18" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="#38bdf8" strokeWidth="1" />
      <text x="71" y="65" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle">x + y = 14</text>

      {/* Metszéspont 1: M1(9; 5) */}
      <circle cx="145" cy="125" r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
      <rect x="154" y="115" width="58" height="19" rx="4" fill="rgba(15, 23, 42, 0.95)" stroke="#f43f5e" strokeWidth="1" />
      <text x="183" y="128" fill="#fda4af" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">M₁(9; 5)</text>

      {/* Metszéspont 2: M2(5; 9) */}
      <circle cx="105" cy="85" r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
      <rect x="48" y="85" width="58" height="19" rx="4" fill="rgba(15, 23, 42, 0.95)" stroke="#f43f5e" strokeWidth="1" />
      <text x="77" y="98" fill="#fda4af" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">M₂(5; 9)</text>

      {/* Alsó infó / Viète formula doboz */}
      <rect x="15" y="185" width="290" height="26" rx="5" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="202" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">
        u² − 14u + 45 = 0 ⟹ u₁ = 9, u₂ = 5 ⟹ (9; 5) és (5; 9)
      </text>
    </svg>
  );
};

// 4. Székek és fordulók szöveges modellje (Tankönyv 40. o.)
export const ChairsAndTripsSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#fde047" fontSize="12" fontWeight="bold" textAnchor="middle">
        Székek és Fordulók (Inverz összefüggés)
      </text>

      {/* Alapmodell: x szék/forduló, y forduló */}
      <rect x="25" y="48" width="270" height="38" rx="6" fill="rgba(234, 179, 8, 0.15)" stroke="#eab308" strokeWidth="1.2" />
      <text x="35" y="65" fill="#fef08a" fontSize="11" fontWeight="bold">Alaphelyzet: Összes szék = x · y</text>
      <text x="35" y="78" fill="#e2e8f0" fontSize="10">x: szék száma fordulónként, y: fordulók száma</text>

      {/* 1. feltétel kártya */}
      <rect x="25" y="94" width="130" height="50" rx="5" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" strokeWidth="1" />
      <text x="32" y="110" fill="#38bdf8" fontSize="10" fontWeight="bold">+1 szék ⟹ −2 forduló</text>
      <text x="32" y="125" fill="#cbd5e1" fontSize="9" fontFamily="monospace">(x+1)(y−2) = xy</text>
      <text x="32" y="137" fill="#93c5fd" fontSize="9" fontWeight="bold">−2x + y = 2</text>

      {/* 2. feltétel kártya */}
      <rect x="165" y="94" width="130" height="50" rx="5" fill="rgba(244, 63, 94, 0.12)" stroke="#f43f5e" strokeWidth="1" />
      <text x="172" y="110" fill="#fb7185" fontSize="10" fontWeight="bold">−1 szék ⟹ +4 forduló</text>
      <text x="172" y="125" fill="#cbd5e1" fontSize="9" fontFamily="monospace">(x−1)(y+4) = xy</text>
      <text x="172" y="137" fill="#fecdd3" fontSize="9" fontWeight="bold">4x − y = 4</text>

      {/* Megoldás doboz */}
      <rect x="25" y="152" width="270" height="38" rx="5" fill="rgba(16, 185, 129, 0.18)" stroke="#10b981" strokeWidth="1.5" />
      <text x="160" y="168" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
        Összeadva: 2x = 6 ⟹ x = 3 szék/forduló, y = 8 forduló
      </text>
      <text x="160" y="182" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
        Összes szék: 3 · 8 = <tspan fill="#fde047">24 darab szék ✓</tspan>
      </text>

      {/* Alsó tanács */}
      <rect x="20" y="194" width="280" height="20" rx="3" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="208" fill="#94a3b8" fontSize="9" textAnchor="middle">
        Az xy szorzatok mindkét oldalon kiesnek, tiszta lineáris rendszerré válik!
      </text>
    </svg>
  );
};

// 5. Keverési feladat / Kávékeverék grafikus mérlege (Tankönyv 41. o.)
export const CoffeeMixtureSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
        Kávékeverék (Keverési mérlegmodell)
      </text>

      {/* Bal komponens: x kg, 3000 Ft */}
      <rect x="25" y="52" width="75" height="65" rx="6" fill="rgba(180, 83, 9, 0.25)" stroke="#b45309" strokeWidth="1.2" />
      <text x="62" y="72" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">A kávé</text>
      <text x="62" y="90" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">x kg</text>
      <text x="62" y="105" fill="#fde68a" fontSize="10" textAnchor="middle">3000 Ft/kg</text>

      {/* Plusz jel */}
      <text x="110" y="90" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">+</text>

      {/* Jobb komponens: y kg, 4000 Ft */}
      <rect x="125" y="52" width="75" height="65" rx="6" fill="rgba(217, 119, 6, 0.25)" stroke="#d97706" strokeWidth="1.2" />
      <text x="162" y="72" fill="#fed7aa" fontSize="11" fontWeight="bold" textAnchor="middle">B kávé</text>
      <text x="162" y="90" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">y kg</text>
      <text x="162" y="105" fill="#ffedd5" fontSize="10" textAnchor="middle">4000 Ft/kg</text>

      {/* Egyenlőség jel */}
      <text x="210" y="90" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">=</text>

      {/* Kész keverék */}
      <rect x="225" y="52" width="75" height="65" rx="6" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="1.5" />
      <text x="262" y="72" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">Keverék</text>
      <text x="262" y="90" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">17,5 kg</text>
      <text x="262" y="105" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3600 Ft/kg</text>

      {/* Egyenletrendszer leírása */}
      <rect x="25" y="128" width="275" height="52" rx="5" fill="rgba(30, 41, 59, 0.9)" stroke="#64748b" strokeWidth="1" />
      <text x="35" y="146" fill="#93c5fd" fontSize="10" fontFamily="monospace">I. Tömeg:  x + y = 17,5</text>
      <text x="35" y="162" fill="#93c5fd" fontSize="10" fontFamily="monospace">II. Érték: 3000x + 4000y = 17,5 · 3600 = 63 000</text>
      <text x="35" y="174" fill="#34d399" fontSize="10" fontWeight="bold">Megoldás: x = 7 kg (A) és y = 10,5 kg (B) ✓</text>

      {/* Alsó lábjegyzet */}
      <rect x="20" y="188" width="280" height="22" rx="4" fill="rgba(15, 23, 42, 0.9)" />
      <text x="160" y="203" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        A két egyenlet: 1) komponensek összege, 2) tiszta értékek összege
      </text>
    </svg>
  );
};

// 6. Mozgásos feladat szakaszai (Emelkedő, lejtő, sík út - Tankönyv 41. o.)
export const ElevationMotionSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
        Autós Túra Szakaszai (s = v · t)
      </text>

      {/* Útvonal profil rajz */}
      {/* Sík 1 */}
      <line x1="30" y1="120" x2="90" y2="120" stroke="#38bdf8" strokeWidth="3" />
      <text x="60" y="112" fill="#7dd3fc" fontSize="9" textAnchor="middle">s₁ (emelkedő odafelé)</text>

      {/* Emelkedő odafelé */}
      <line x1="90" y1="120" x2="160" y2="70" stroke="#f43f5e" strokeWidth="3" />
      <text x="120" y="85" fill="#fda4af" fontSize="9" textAnchor="middle">v = 60 km/h</text>

      {/* Vízszintes fennsík */}
      <line x1="160" y1="70" x2="230" y2="70" stroke="#10b981" strokeWidth="3" />
      <text x="195" y="62" fill="#a7f3d0" fontSize="9" textAnchor="middle">s = 140 km (80 km/h)</text>

      {/* Lejtő */}
      <line x1="230" y1="70" x2="290" y2="120" stroke="#a855f7" strokeWidth="3" />
      <text x="270" y="88" fill="#d8b4fe" fontSize="9" textAnchor="middle">v = 120 km/h</text>

      {/* Idők leírása */}
      <rect x="25" y="132" width="270" height="48" rx="5" fill="rgba(30, 41, 59, 0.9)" stroke="#64748b" strokeWidth="1" />
      <text x="35" y="150" fill="#f1f5f9" fontSize="10">
        Odafelé: t₁ = 3 óra 45 perc (3,75 h) | Visszafelé: t₂ = 4 óra
      </text>
      <text x="35" y="168" fill="#fde047" fontSize="10" fontWeight="bold">
        Visszafelé az emelkedőből lejtő lesz, a lejtőből emelkedő!
      </text>

      {/* Alsó összegzés */}
      <rect x="20" y="188" width="280" height="22" rx="4" fill="rgba(15, 23, 42, 0.9)" />
      <text x="160" y="203" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        s₁/60 + s₂/120 + 140/80 = 3,75 és s₁/120 + s₂/60 + 140/80 = 4
      </text>
    </svg>
  );
};

