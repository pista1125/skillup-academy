import React from 'react';

type FigProps = { className?: string };
const DEFAULT_CLS = 'w-full h-auto max-w-xl mx-auto';

// Figure 1: Nevezetes szögek a szabályos háromszögből és az egyenlő szárú derékszögű háromszögből (14. oldal)
export const SpecialAnglesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => (
  <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="552" height="262" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Nevezetes szögek: 30°, 45°, 60°
    </text>
    {/* Left: equilateral triangle side a, apex (150,50), base (40,240)-(260,240) — scaled half */}
    <polygon points="150,50 40,240 260,240" fill="#eef2ff" stroke="#4338ca" strokeWidth="2" strokeLinejoin="round" />
    <line x1="150" y1="50" x2="150" y2="240" stroke="#dc2626" strokeWidth="2" strokeDasharray="6 4" />
    <path d="M 166 240 A 16 16 0 0 0 150 224" fill="none" stroke="#dc2626" strokeWidth="1.5" /><circle cx="156.2" cy="233.8" r="2" fill="#dc2626" />
    <text x="85" y="140" fontSize="13" fontWeight="bold" fill="#3730a3">a</text>
    <text x="95" y="258" fontSize="12" textAnchor="middle" fill="#3730a3">a/2</text>
    <text x="158" y="160" fontSize="12" fontWeight="bold" fill="#b91c1c">(√3/2)·a</text>
    <text x="62" y="232" fontSize="12" fontWeight="bold" fill="#047857">60°</text>
    <text x="134" y="88" fontSize="12" fontWeight="bold" fill="#b45309">30°</text>
    {/* Right: isosceles right triangle legs b */}
    <polygon points="340,240 520,240 520,60" fill="#ecfdf5" stroke="#047857" strokeWidth="2" strokeLinejoin="round" />
    <path d="M 504 240 A 16 16 0 0 1 520 224" fill="none" stroke="#047857" strokeWidth="1.5" /><circle cx="513.8" cy="233.8" r="2" fill="#047857" />
    <text x="430" y="258" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#065f46">b</text>
    <text x="530" y="155" fontSize="13" fontWeight="bold" fill="#065f46">b</text>
    <text x="405" y="140" fontSize="13" fontWeight="bold" fill="#065f46" transform="rotate(-45 405 140)">b·√2</text>
    <text x="372" y="232" fontSize="12" fontWeight="bold" fill="#b91c1c">45°</text>
    <text x="496" y="92" fontSize="12" fontWeight="bold" fill="#b91c1c">45°</text>
  </svg>
);

// Figure 2: Pótszögek szögfüggvényei (14. oldal, Elmélet 1.)
export const ComplementaryAnglesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => (
  <svg viewBox="0 0 480 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="472" height="232" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#7c2d12">
      α + β = 90°  ⇒  sin β = cos α és cos β = sin α
    </text>
    <polygon points="50,210 300,210 300,60" fill="#ffedd5" stroke="#c2410c" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 284 210 A 16 16 0 0 1 300 194" fill="none" stroke="#c2410c" strokeWidth="1.5" /><circle cx="293.8" cy="203.8" r="2" fill="#c2410c" />
    <path d="M 95 210 A 45 45 0 0 0 88.6 186.8" fill="none" stroke="#dc2626" strokeWidth="2" />
    <text x="100" y="200" fontSize="13" fontWeight="bold" fill="#b91c1c">α</text>
    <path d="M 300 102 A 42 42 0 0 1 264 81.6" fill="none" stroke="#2563eb" strokeWidth="2" />
    <text x="276" y="112" fontSize="13" fontWeight="bold" fill="#1d4ed8">β</text>
    <text x="175" y="228" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">b</text>
    <text x="310" y="140" fontSize="13" fontWeight="bold" fill="#0f172a">a</text>
    <text x="160" y="124" fontSize="13" fontWeight="bold" fill="#0f172a" transform="rotate(-31 160 124)">c</text>
    <rect x="335" y="70" width="130" height="110" rx="12" fill="#ffffff" stroke="#fdba74" strokeWidth="1.5" />
    <text x="400" y="100" fontSize="13" textAnchor="middle" fill="#9a3412">sin β = b/c = cos α</text>
    <text x="400" y="128" fontSize="13" textAnchor="middle" fill="#9a3412">cos β = a/c = sin α</text>
    <text x="400" y="156" fontSize="13" textAnchor="middle" fill="#9a3412">β = 90° − α</text>
  </svg>
);

// Figure 3: Egységnyi átfogó – sin²α + cos²α = 1 (14. oldal, Elmélet 3.)
export const UnitHypotenuseSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => (
  <svg viewBox="0 0 480 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="472" height="242" rx="16" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#134e4a">
      Átfogó = 1 egység ⇒ a = sin α, b = cos α
    </text>
    {/* r=180, alpha=35°: B=(40+147.4,220), C=(187.4, 220-103.2) */}
    <path d="M 220 220 A 180 180 0 0 0 40 40" fill="none" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1.5" />
    <polygon points="40,220 187.4,220 187.4,116.8" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 173.4 220 A 14 14 0 0 1 187.4 206" fill="none" stroke="#0f766e" strokeWidth="1.5" /><circle cx="182" cy="214.6" r="2" fill="#0f766e" />
    <path d="M 80 220 A 40 40 0 0 0 72.8 197.1" fill="none" stroke="#dc2626" strokeWidth="2" />
    <text x="86" y="212" fontSize="12" fontWeight="bold" fill="#b91c1c">α</text>
    <text x="110" y="160" fontSize="13" fontWeight="bold" fill="#0f172a" transform="rotate(-35 110 160)">1</text>
    <text x="114" y="238" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0369a1">cos α</text>
    <text x="194" y="172" fontSize="12" fontWeight="bold" fill="#047857">sin α</text>
    <rect x="270" y="80" width="190" height="100" rx="12" fill="#ffffff" stroke="#5eead4" strokeWidth="1.5" />
    <text x="365" y="108" fontSize="12" textAnchor="middle" fill="#115e59">Pitagorasz-tétel:</text>
    <text x="365" y="132" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#115e59">(sin α)² + (cos α)² = 1²</text>
    <text x="365" y="160" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f766e">sin²α + cos²α = 1</text>
  </svg>
);

// Figure 4: Montserrat drótkötélpálya – ellentmondó adatok (15. oldal, 1. feladat)
export const MontserratCableCarSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => (
  <svg viewBox="0 0 480 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="472" height="252" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Montserrat: 82°, 680 m, 535 m – összeférnek az adatok?
    </text>
    {/* 82° slope: base small. C=(60+ 26.4, 220-188) using length 190 */}
    <polygon points="60,225 86.4,225 86.4,37" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" strokeLinejoin="round" />
    <text x="40" y="130" fontSize="11" fontWeight="bold" fill="#0369a1" transform="rotate(-82 40 130)">680 m, 82°</text>
    <text x="95" y="140" fontSize="11" fill="#0369a1">680 · sin 82° ≈ 673 m</text>
    {/* realistic: 51.9° */}
    <polygon points="230,225 374.6,225 374.6,41" fill="#fef3c7" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
    <path d="M 270 225 A 40 40 0 0 0 254.7 193.5" fill="none" stroke="#dc2626" strokeWidth="2" />
    <text x="276" y="214" fontSize="11" fontWeight="bold" fill="#b91c1c">≈ 51,9°</text>
    <text x="270" y="120" fontSize="11" fontWeight="bold" fill="#92400e" transform="rotate(-51.9 270 120)">680 m</text>
    <text x="382" y="140" fontSize="11" fontWeight="bold" fill="#92400e">535 m</text>
    <text x="300" y="246" fontSize="11" textAnchor="middle" fill="#334155">sin α = 535 / 680 ≈ 0,787</text>
    <text x="80" y="246" fontSize="11" textAnchor="middle" fill="#334155">a „82°” csak a legmeredekebb rész</text>
  </svg>
);

// Figure 5: Siklóernyőzés – két kötélhossz és emelkedési szög (15. oldal, 3. feladat)
export const ParasailingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => (
  <svg viewBox="0 0 480 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="472" height="232" rx="16" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
      Melyik esetben száll magasabban a siklóernyős?
    </text>
    <rect x="4" y="200" width="472" height="36" fill="#bfdbfe" />
    {/* Case 1: rope 80 m (scale 2), 35° -> dx=131, dy=91.8 */}
    <polygon points="60,200 70,192 90,192 96,200" fill="#1d4ed8" />
    <line x1="70" y1="196" x2="201" y2="104.2" stroke="#0f172a" strokeWidth="2" />
    <circle cx="201" cy="104.2" r="7" fill="#f97316" />
    <line x1="201" y1="104.2" x2="201" y2="200" stroke="#dc2626" strokeDasharray="4 3" strokeWidth="1.5" />
    <text x="120" y="140" fontSize="11" fontWeight="bold" fill="#0f172a">80 m, 35°</text>
    <text x="206" y="160" fontSize="11" fontWeight="bold" fill="#b91c1c">≈ 45,9 m</text>
    {/* Case 2: rope 50 m (scale 2), 58° -> dx=53, dy=84.8 */}
    <polygon points="290,200 300,192 320,192 326,200" fill="#1d4ed8" />
    <line x1="300" y1="196" x2="353" y2="111.2" stroke="#0f172a" strokeWidth="2" />
    <circle cx="353" cy="111.2" r="7" fill="#22c55e" />
    <line x1="353" y1="111.2" x2="353" y2="200" stroke="#dc2626" strokeDasharray="4 3" strokeWidth="1.5" />
    <text x="262" y="140" fontSize="11" fontWeight="bold" fill="#0f172a">50 m, 58°</text>
    <text x="358" y="160" fontSize="11" fontWeight="bold" fill="#b91c1c">≈ 42,4 m</text>
    <text x="240" y="225" fontSize="11" textAnchor="middle" fill="#1e3a8a">h = k · sin α</text>
  </svg>
);

// Figure 6: Épület magassága emelkedési szögből (15. oldal, HF 3.)
export const BuildingElevationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLS }) => (
  <svg viewBox="0 0 420 270" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="412" height="262" rx="16" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />
    <text x="210" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#581c87">
      Sándor 8 m-re áll, szemmagassága 1,6 m, a tetőt 70°-ban látja
    </text>
    <rect x="300" y="40" width="70" height="200" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="2" />
    <line x1="20" y1="240" x2="400" y2="240" stroke="#334155" strokeWidth="2" />
    {/* person at x=230 ; eye at y=222 ; horizontal to 300 (70 px = 8 m) ; top at y=40 -> rise 182px ≈ 8·tg70 */}
    <line x1="230" y1="240" x2="230" y2="222" stroke="#0f172a" strokeWidth="3" />
    <circle cx="230" cy="218" r="5" fill="#0f172a" />
    <line x1="230" y1="222" x2="300" y2="222" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5 3" />
    <line x1="230" y1="222" x2="300" y2="40" stroke="#dc2626" strokeWidth="2" />
    <path d="M 255 222 A 25 25 0 0 0 239 198.6" fill="none" stroke="#b91c1c" strokeWidth="2" />
    <text x="250" y="208" fontSize="11" fontWeight="bold" fill="#b91c1c">70°</text>
    <text x="265" y="256" fontSize="11" textAnchor="middle" fill="#0f172a">8 m</text>
    <text x="190" y="236" fontSize="10" fill="#0f172a">1,6 m</text>
    <text x="378" y="140" fontSize="11" fontWeight="bold" fill="#581c87">h = ?</text>
    <text x="210" y="70" fontSize="11" textAnchor="end" fill="#581c87">h = 1,6 + 8 · tg 70° ≈ 23,6 m</text>
  </svg>
);
