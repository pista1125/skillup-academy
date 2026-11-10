import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Kétszeri Egymást Követő Árváltozás SVG
 * Szemlélteti az alapárat (100%), a p%-os emelést, majd a p%-os csökkentést,
 * és bemutatja, miért NEM kapjuk vissza az eredeti árat (100% -> 120% -> 96%).
 */
export const CompoundPriceChangeSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 250"
      width={size}
      height={(size * 250) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="finStartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="finUpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="finDownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <filter id="finShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Háttérkeret */}
      <rect x="8" y="8" width="504" height="234" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* 1. Lépés: Eredeti ár (100%) */}
      <g filter="url(#finShadow)">
        <rect x="25" y="38" width="130" height="150" rx="12" fill="url(#finStartGrad)" />
        <rect x="35" y="48" width="110" height="24" rx="6" fill="#1E40AF" />
        <text x="90" y="64" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">Kezdő Ár (Á₀)</text>
        <text x="90" y="105" fill="#FFFFFF" fontSize="22" fontWeight="900" textAnchor="middle">100%</text>
        <text x="90" y="128" fill="#DBEAFE" fontSize="11" textAnchor="middle">pl. 10 000 Ft</text>
        <rect x="35" y="145" width="110" height="30" rx="6" fill="#1E3A8A" />
        <text x="90" y="164" fill="#93C5FD" fontSize="10" fontWeight="bold" textAnchor="middle">Bázis: 100%</text>
      </g>

      {/* Nyíl 1 -> 2: +p% áremelés */}
      <path d="M 160 113 L 188 113" stroke="#10B981" strokeWidth="3" />
      <polygon points="188,107 198,113 188,119" fill="#10B981" />
      <text x="179" y="98" fill="#047857" fontSize="11" fontWeight="900" textAnchor="middle">+p%</text>
      <text x="179" y="136" fill="#6B7280" fontSize="9" textAnchor="middle">·(1 + p/100)</text>

      {/* 2. Lépés: Megemelt ár */}
      <g filter="url(#finShadow)">
        <rect x="202" y="38" width="135" height="150" rx="12" fill="url(#finUpGrad)" />
        <rect x="212" y="48" width="115" height="24" rx="6" fill="#065F46" />
        <text x="269" y="64" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">1. Árváltozás után</text>
        <text x="269" y="105" fill="#FFFFFF" fontSize="22" fontWeight="900" textAnchor="middle">120%</text>
        <text x="269" y="128" fill="#D1FAE5" fontSize="11" textAnchor="middle">pl. 12 000 Ft (ha p=20)</text>
        <rect x="212" y="145" width="115" height="30" rx="6" fill="#044E39" />
        <text x="269" y="164" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="middle">Új bázis az emelt ár!</text>
      </g>

      {/* Nyíl 2 -> 3: -p% leárazás az ÚJ bázisból */}
      <path d="M 342 113 L 370 113" stroke="#EF4444" strokeWidth="3" />
      <polygon points="370,107 380,113 370,119" fill="#EF4444" />
      <text x="361" y="98" fill="#B91C1C" fontSize="11" fontWeight="900" textAnchor="middle">-p%</text>
      <text x="361" y="136" fill="#6B7280" fontSize="9" textAnchor="middle">·(1 - p/100)</text>

      {/* 3. Lépés: Végső ár - CSAPDA KIEMELÉSE */}
      <g filter="url(#finShadow)">
        <rect x="384" y="38" width="125" height="150" rx="12" fill="url(#finDownGrad)" />
        <rect x="394" y="48" width="105" height="24" rx="6" fill="#991B1B" />
        <text x="446" y="64" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">Végső Ár (Á₂)</text>
        <text x="446" y="105" fill="#FFFFFF" fontSize="22" fontWeight="900" textAnchor="middle">96% !</text>
        <text x="446" y="128" fill="#FEE2E2" fontSize="11" textAnchor="middle">pl. 9 600 Ft</text>
        <rect x="394" y="145" width="105" height="30" rx="6" fill="#7F1D1D" />
        <text x="446" y="164" fill="#FCA5A5" fontSize="10" fontWeight="bold" textAnchor="middle">CSÖKKENÉS: 4%</text>
      </g>

      {/* Alsó magyarázó képlet sáv */}
      <rect x="25" y="198" width="484" height="36" rx="8" fill="#EFF6FF" stroke="#BFDBFE" />
      <text x="267" y="221" fill="#1E3A8A" fontSize="11" fontWeight="bold" textAnchor="middle">
        Képlet: Á₂ = Á₀ · (1 + p/100) · (1 - p/100) = Á₀ · (1 - p²/10000) &lt; Á₀ mindig!
      </text>
    </svg>
  );
};

/**
 * 2. Bevételmaximalizálás Parabola Görbe SVG
 * B(x) = (Ár + x) · (Kereslet - kx) lefelé nyíló parabola.
 * Csúcspontja adja a maximális árbevételt (x_opt).
 */
export const RevenueOptimizationCurveSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 250"
      width={size}
      height={(size * 250) / 500}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="parabolaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0.0" />
        </linearGradient>
        <filter id="parabShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Háttérkeret */}
      <rect x="8" y="8" width="484" height="234" rx="14" fill="#FAFAFA" stroke="#E5E7EB" strokeWidth="1.5" />

      {/* Tengelyek */}
      {/* Y tengely: Bevétel B(x) */}
      <path d="M 60 215 L 60 25" stroke="#475569" strokeWidth="2" />
      <polygon points="56,26 60,18 64,26" fill="#475569" />
      <text x="45" y="24" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="end">Bevétel (B)</text>

      {/* X tengely: Áremelés mértéke (x) */}
      <path d="M 55 210 L 460 210" stroke="#475569" strokeWidth="2" />
      <polygon points="459,206 467,210 459,214" fill="#475569" />
      <text x="460" y="228" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="end">Árváltozás (x)</text>

      {/* Parabola alatti kitöltés */}
      <path
        d="M 80 210 Q 235 25 390 210 Z"
        fill="url(#parabolaGrad)"
      />

      {/* Parabola ív: lefelé nyíló */}
      <path
        d="M 80 210 Q 235 25 390 210"
        stroke="#4F46E5"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Kezdőpont (x=0, eredeti bevétel) */}
      <circle cx="110" cy="180" r="4.5" fill="#2563EB" />
      <line x1="110" y1="180" x2="110" y2="210" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="110" y="223" fill="#64748B" fontSize="9.5" textAnchor="middle">x = 0</text>
      <text x="115" y="172" fill="#1E40AF" fontSize="10" fontWeight="bold">B₀ (alap)</text>

      {/* Csúcspont (Maximális bevétel) */}
      <circle cx="235" cy="50" r="6" fill="#DC2626" />
      <line x1="235" y1="50" x2="235" y2="210" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="60" y1="50" x2="235" y2="50" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="235" y="224" fill="#DC2626" fontSize="10" fontWeight="900" textAnchor="middle">x_opt (ideális áremelés)</text>
      <text x="52" y="53" fill="#DC2626" fontSize="10" fontWeight="900" textAnchor="end">B_max</text>

      {/* Célbevétel vonal (2 megoldás!) */}
      <line x1="60" y1="120" x2="410" y2="120" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 4" />
      <circle cx="150" cy="120" r="4.5" fill="#D97706" />
      <circle cx="320" cy="120" r="4.5" fill="#D97706" />
      <line x1="150" y1="120" x2="150" y2="210" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="320" y1="120" x2="320" y2="210" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
      <text x="415" y="123" fill="#D97706" fontSize="9.5" fontWeight="bold">B_cél szint</text>
      <text x="150" y="223" fill="#D97706" fontSize="9" textAnchor="middle">x₁</text>
      <text x="320" y="223" fill="#D97706" fontSize="9" textAnchor="middle">x₂</text>

      {/* Magyarázó kártya felül jobb */}
      <g filter="url(#parabShadow)">
        <rect x="295" y="20" width="185" height="54" rx="8" fill="#FFFFFF" stroke="#CBD5E1" />
        <text x="387" y="38" fill="#1E293B" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          B(x) = (Á₀ + x) · (Q₀ - k·x)
        </text>
        <text x="387" y="52" fill="#4F46E5" fontSize="9" textAnchor="middle">
          Másodfokú tag együtthatója negatív (-k)
        </text>
        <text x="387" y="65" fill="#059669" fontSize="9" fontWeight="bold" textAnchor="middle">
          ⟹ A csúcspont mindig MAXIMUM!
        </text>
      </g>
    </svg>
  );
};

/**
 * 3. Kétéves Kamatos Kamatszámítás Idővonal SVG
 * T₀ kezdeti tőke, 1. év végén T₁ = T₀·q, 2. év végén T₂ = T₀·q².
 * Ismeretlen kamatláb kiszámítása másodfokú gyökvonással.
 */
export const CompoundInterestTimelineSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 220"
      width={size}
      height={(size * 220) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <filter id="timeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Keret */}
      <rect x="8" y="8" width="504" height="204" rx="14" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5" />

      {/* Fő Időtengely vonal */}
      <line x1="50" y1="95" x2="470" y2="95" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />

      {/* 0. Év pont (Betétel) */}
      <circle cx="80" cy="95" r="14" fill="#15803D" />
      <text x="80" y="100" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">0</text>
      <text x="80" y="128" fill="#166534" fontSize="11" fontWeight="bold" textAnchor="middle">Start (t = 0)</text>
      <rect x="30" y="135" width="100" height="42" rx="8" fill="#FFFFFF" stroke="#86EFAC" filter="url(#timeShadow)" />
      <text x="80" y="152" fill="#1E293B" fontSize="11" fontWeight="bold" textAnchor="middle">Kezdőtőke (T₀)</text>
      <text x="80" y="168" fill="#2563EB" fontSize="10" textAnchor="middle">1 000 000 Ft</text>

      {/* 1. Év ív és szorzó */}
      <path d="M 94 85 Q 170 30 246 85" stroke="#059669" strokeWidth="2.5" fill="none" strokeDasharray="4 2" />
      <polygon points="246,85 240,77 248,77" fill="#059669" />
      <text x="170" y="45" fill="#047857" fontSize="11" fontWeight="900" textAnchor="middle">· q = · (1 + p/100)</text>

      {/* 1. Év pont */}
      <circle cx="260" cy="95" r="12" fill="#059669" />
      <text x="260" y="100" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
      <text x="260" y="128" fill="#166534" fontSize="10.5" fontWeight="bold" textAnchor="middle">1. év vége</text>
      <rect x="210" y="135" width="100" height="42" rx="8" fill="#FFFFFF" stroke="#86EFAC" filter="url(#timeShadow)" />
      <text x="260" y="152" fill="#1E293B" fontSize="11" fontWeight="bold" textAnchor="middle">T₁ = T₀ · q</text>
      <text x="260" y="168" fill="#059669" fontSize="10" textAnchor="middle">1 100 000 Ft (10%)</text>

      {/* 2. Év ív és szorzó */}
      <path d="M 274 85 Q 350 30 426 85" stroke="#059669" strokeWidth="2.5" fill="none" strokeDasharray="4 2" />
      <polygon points="426,85 420,77 428,77" fill="#059669" />
      <text x="350" y="45" fill="#047857" fontSize="11" fontWeight="900" textAnchor="middle">· q = · (1 + p/100)</text>

      {/* 2. Év pont */}
      <circle cx="440" cy="95" r="14" fill="#047857" />
      <text x="440" y="100" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">2</text>
      <text x="440" y="128" fill="#166534" fontSize="11" fontWeight="bold" textAnchor="middle">2. év vége</text>
      <rect x="390" y="135" width="105" height="42" rx="8" fill="#FFFFFF" stroke="#86EFAC" filter="url(#timeShadow)" />
      <text x="442" y="152" fill="#1E293B" fontSize="11" fontWeight="bold" textAnchor="middle">T₂ = T₀ · q²</text>
      <text x="442" y="168" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">1 210 000 Ft</text>

      {/* Alsó egyenlet doboz */}
      <rect x="120" y="185" width="280" height="24" rx="6" fill="#DCFCE7" />
      <text x="260" y="201" fill="#14532D" fontSize="10" fontWeight="bold" textAnchor="middle">
        Megoldás: q² = T₂ / T₀  ⟹  q = √(T₂ / T₀)  ⟹  p = (q - 1) · 100%
      </text>
    </svg>
  );
};

/**
 * 4. Pénzügyi Modell és Korlátok Kártya SVG
 * Gazdasági szöveges feladatok 4 aranyszabálya:
 * 1. Bázisérték rögzítése, 2. q kamattényező felírása, 3. Másodfokú egyenlet, 4. Értelmezési tartomány (p > 0).
 */
export const FinancialModelRulesSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 230"
      width={size}
      height={(size * 230) / 500}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="finCardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Keret */}
      <rect x="8" y="8" width="484" height="214" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* 4 Lépés Kártya rács */}
      {/* 1. Lépés: Bázis */}
      <g filter="url(#finCardShadow)">
        <rect x="20" y="25" width="105" height="180" rx="10" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
        <circle cx="72" cy="48" r="15" fill="#3B82F6" />
        <text x="72" y="54" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">1</text>
        <text x="72" y="80" fill="#1D4ED8" fontSize="11" fontWeight="bold" textAnchor="middle">Bázisérték</text>
        <text x="72" y="105" fill="#334155" fontSize="9.5" textAnchor="middle">Mindig azonosítsd</text>
        <text x="72" y="120" fill="#334155" fontSize="9.5" textAnchor="middle">a kiinduló 100%-ot!</text>
        <rect x="28" y="135" width="89" height="30" rx="5" fill="#DBEAFE" />
        <text x="72" y="154" fill="#1E40AF" fontSize="9" fontWeight="bold" textAnchor="middle">Á₀ vagy T₀</text>
      </g>

      {/* 2. Lépés: Tényező */}
      <g filter="url(#finCardShadow)">
        <rect x="135" y="25" width="105" height="180" rx="10" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1.5" />
        <circle cx="187" cy="48" r="15" fill="#10B981" />
        <text x="187" y="54" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">2</text>
        <text x="187" y="80" fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">q Tényező</text>
        <text x="187" y="105" fill="#334155" fontSize="9.5" textAnchor="middle">Emelés: 1 + p/100</text>
        <text x="187" y="120" fill="#334155" fontSize="9.5" textAnchor="middle">Csökkentés: 1 - p/100</text>
        <rect x="143" y="135" width="89" height="30" rx="5" fill="#D1FAE5" />
        <text x="187" y="154" fill="#065F46" fontSize="9" fontWeight="bold" textAnchor="middle">q₁ · q₂ szorzat</text>
      </g>

      {/* 3. Lépés: Másodfokú felírás */}
      <g filter="url(#finCardShadow)">
        <rect x="250" y="25" width="115" height="180" rx="10" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" />
        <circle cx="307" cy="48" r="15" fill="#F59E0B" />
        <text x="307" y="54" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">3</text>
        <text x="307" y="80" fill="#B45309" fontSize="11" fontWeight="bold" textAnchor="middle">Modellezés</text>
        <text x="307" y="105" fill="#334155" fontSize="9.5" textAnchor="middle">Kétszeri változás: q²</text>
        <text x="307" y="120" fill="#334155" fontSize="9.5" textAnchor="middle">Bevétel: (Á+x)(Q-kx)</text>
        <rect x="258" y="135" width="99" height="30" rx="5" fill="#FEF3C7" />
        <text x="307" y="154" fill="#92400E" fontSize="9" fontWeight="bold" textAnchor="middle">ax² + bx + c = 0</text>
      </g>

      {/* 4. Lépés: Gazdasági szűrés */}
      <g filter="url(#finCardShadow)">
        <rect x="375" y="25" width="105" height="180" rx="10" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.5" />
        <circle cx="427" cy="48" r="15" fill="#EF4444" />
        <text x="427" y="54" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">4</text>
        <text x="427" y="80" fill="#B91C1C" fontSize="11" fontWeight="bold" textAnchor="middle">Reális Gyökök</text>
        <text x="427" y="105" fill="#334155" fontSize="9.5" textAnchor="middle">p &gt; 0, q &gt; 0</text>
        <text x="427" y="120" fill="#334155" fontSize="9.5" textAnchor="middle">Darabszám ∈ ℕ⁺</text>
        <rect x="383" y="135" width="89" height="30" rx="5" fill="#FEE2E2" />
        <text x="427" y="154" fill="#991B1B" fontSize="9" fontWeight="bold" textAnchor="middle">Negatív gyök kuka!</text>
      </g>
    </svg>
  );
};

