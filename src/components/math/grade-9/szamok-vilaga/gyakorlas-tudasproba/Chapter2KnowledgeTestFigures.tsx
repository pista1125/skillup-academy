import React from 'react';

/**
 * 1. Fejezeti Átfogó Mindmap / Összefoglaló Diagram
 * A II. "A számok világa" 6 fő alappillérének szintézise
 */
export const Chapter2MindmapSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 240,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 280 200"
        style={{ width: size, height: (size * 200) / 280, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Háttér kártya */}
        <rect
          x="8"
          y="8"
          width="264"
          height="184"
          rx="14"
          className="fill-slate-50/80 dark:fill-slate-900/60 stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="2"
        />

        {/* Központi II. Fejezet Badge */}
        <g transform="translate(140, 100)">
          <circle cx="0" cy="0" r="30" fill="#ef4444" className="shadow-lg" />
          <text x="0" y="-8" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">II. FEJEZET</text>
          <text x="0" y="4" textAnchor="middle" fill="#fee2e2" fontSize="7.5" fontWeight="black">SZÁMOK</text>
          <text x="0" y="15" textAnchor="middle" fill="#fecaca" fontSize="6.5">VILÁGA</text>
        </g>

        {/* 1. Bal felső ág: Számhalmazok & Zártság */}
        <line x1="115" y1="85" x2="65" y2="45" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
        <rect x="14" y="22" width="90" height="32" rx="7" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" className="dark:fill-rose-950/60" />
        <text x="59" y="36" textAnchor="middle" fill="#991b1b" fontSize="8" fontWeight="bold">Számhalmazok</text>
        <text x="59" y="47" textAnchor="middle" fill="#b91c1c" fontSize="6.5">ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ & Zártság</text>

        {/* 2. Középső felső ág: Törtek és Műveletek */}
        <line x1="140" y1="70" x2="140" y2="40" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
        <rect x="95" y="12" width="90" height="26" rx="7" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" className="dark:fill-amber-950/60" />
        <text x="140" y="24" textAnchor="middle" fill="#92400e" fontSize="7.5" fontWeight="bold">Törtek & Számolás</text>
        <text x="140" y="34" textAnchor="middle" fill="#b45309" fontSize="6.5">Közös nev., reciprok, emeletes</text>

        {/* 3. Jobb felső ág: Arány & Százalék */}
        <line x1="165" y1="85" x2="215" y2="45" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
        <rect x="176" y="22" width="90" height="32" rx="7" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" className="dark:fill-purple-950/60" />
        <text x="221" y="36" textAnchor="middle" fill="#5b21b6" fontSize="8" fontWeight="bold">Arány & Százalék</text>
        <text x="221" y="47" textAnchor="middle" fill="#6d28d9" fontSize="6.5">Egyenes, fordított, szorzótényező</text>

        {/* 4. Bal alsó ág: Hatványozás & Gyökök */}
        <line x1="115" y1="115" x2="65" y2="155" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
        <rect x="14" y="146" width="90" height="32" rx="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" className="dark:fill-sky-950/60" />
        <text x="59" y="160" textAnchor="middle" fill="#075985" fontSize="8" fontWeight="bold">Hatványok & Gyökök</text>
        <text x="59" y="171" textAnchor="middle" fill="#0284c7" fontSize="6.5">a^n · a^k, √(a·b), |a|</text>

        {/* 5. Középső alsó ág: Normálalak */}
        <line x1="140" y1="130" x2="140" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
        <rect x="95" y="162" width="90" height="26" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" className="dark:fill-emerald-950/60" />
        <text x="140" y="174" textAnchor="middle" fill="#166534" fontSize="7.5" fontWeight="bold">Normálalak & Prefixumok</text>
        <text x="140" y="184" textAnchor="middle" fill="#15803d" fontSize="6.5">a · 10^k, 1 ≤ a &lt; 10</text>

        {/* 6. Jobb alsó ág: Kamatos kamat */}
        <line x1="165" y1="115" x2="215" y2="155" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
        <rect x="176" y="146" width="90" height="32" rx="7" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" className="dark:fill-rose-950/60" />
        <text x="221" y="160" textAnchor="middle" fill="#9f1239" fontSize="8" fontWeight="bold">Kamatos Kamat</text>
        <text x="221" y="171" textAnchor="middle" fill="#be123c" fontSize="6.5">Tn = T0 · q^n, amortizáció</text>
      </svg>
    </div>
  );
};

/**
 * 2. Érettségi Számhalmazok Venn Diagram (N ⊂ Z ⊂ Q ⊂ R)
 * Tipikus vizsgateszt-értékekkel feltöltve
 */
export const ExamNumberSetsVennSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 230,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 250 180"
        style={{ width: size, height: (size * 180) / 250, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Valós számok ℝ (Külső doboz) */}
        <rect
          x="10"
          y="10"
          width="230"
          height="160"
          rx="12"
          className="fill-rose-50/40 dark:fill-rose-950/20 stroke-rose-400 dark:stroke-rose-600"
          strokeWidth="2"
        />
        <text x="24" y="28" fill="#e11d48" fontSize="12" fontWeight="900">ℝ</text>
        <text x="42" y="28" fill="#be123c" fontSize="7.5" fontWeight="medium">(Valós számok)</text>

        {/* Irracionális számok ℝ \ ℚ (A doboz jobb oldala) */}
        <g transform="translate(190, 45)">
          <text x="0" y="0" textAnchor="middle" fill="#e11d48" fontSize="8" fontWeight="bold">ℝ \ ℚ</text>
          <text x="0" y="14" textAnchor="middle" fill="#be123c" fontSize="7">√2, π</text>
          <text x="0" y="27" textAnchor="middle" fill="#be123c" fontSize="7">√7</text>
          <text x="0" y="40" textAnchor="middle" fill="#be123c" fontSize="7">1 - √3</text>
          <text x="0" y="53" textAnchor="middle" fill="#be123c" fontSize="6.5">0.101001...</text>
        </g>

        {/* Racionális számok ℚ elipszis */}
        <ellipse cx="105" cy="100" rx="90" ry="60" fill="#3b82f6" fillOpacity="0.12" stroke="#2563eb" strokeWidth="2" />
        <text x="30" y="62" fill="#1d4ed8" fontSize="11" fontWeight="bold">ℚ</text>
        <text x="45" y="75" fill="#1e40af" fontSize="7">3/7, -2.4</text>
        <text x="45" y="87" fill="#1e40af" fontSize="7">0.3̇ = 1/3</text>

        {/* Egész számok ℤ elipszis */}
        <ellipse cx="115" cy="108" rx="65" ry="44" fill="#10b981" fillOpacity="0.15" stroke="#059669" strokeWidth="2" />
        <text x="65" y="105" fill="#047857" fontSize="10" fontWeight="bold">ℤ</text>
        <text x="75" y="118" fill="#065f46" fontSize="7">-5, -18/3</text>
        <text x="75" y="130" fill="#065f46" fontSize="7">-100</text>

        {/* Természetes számok ℕ elipszis */}
        <ellipse cx="132" cy="115" rx="38" ry="28" fill="#f59e0b" fillOpacity="0.22" stroke="#d97706" strokeWidth="2" />
        <text x="110" y="118" fill="#b45309" fontSize="10" fontWeight="bold">ℕ</text>
        <text x="135" y="114" fill="#92400e" fontSize="7">0, 7</text>
        <text x="135" y="126" fill="#92400e" fontSize="7">√49 (=7)</text>
      </svg>
    </div>
  );
};

/**
 * 3. Hatványozás és Négyzetgyök Szabálymátrix
 * Vizuális szabály-összehasonlítás
 */
export const PowersAndRootsSummarySvg: React.FC<{ size?: number; className?: string }> = ({
  size = 240,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 260 180"
        style={{ width: size, height: (size * 180) / 260, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Bal oldali Hatványkártya */}
        <rect x="10" y="10" width="115" height="160" rx="10" className="fill-purple-50/70 dark:fill-purple-950/30 stroke-purple-400 dark:stroke-purple-600" strokeWidth="1.5" />
        <rect x="10" y="10" width="115" height="24" rx="10" fill="#8b5cf6" />
        <text x="67" y="26" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">HATVÁNYOZÁS</text>

        <text x="18" y="48" fill="#4c1d95" fontSize="7" fontWeight="bold">aⁿ · aᵏ = aⁿ⁺ᵏ</text>
        <text x="18" y="66" fill="#4c1d95" fontSize="7" fontWeight="bold">aⁿ / aᵏ = aⁿ⁻ᵏ</text>
        <text x="18" y="84" fill="#4c1d95" fontSize="7" fontWeight="bold">(aⁿ)ᵏ = aⁿˣᵏ</text>
        <text x="18" y="102" fill="#4c1d95" fontSize="7" fontWeight="bold">(a · b)ⁿ = aⁿ · bⁿ</text>
        <text x="18" y="120" fill="#4c1d95" fontSize="7" fontWeight="bold">(a / b)ⁿ = aⁿ / bⁿ</text>

        {/* Kiemelt speciális szabályok */}
        <line x1="18" y1="130" x2="117" y2="130" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="2 2" />
        <text x="18" y="144" fill="#7c3aed" fontSize="7" fontWeight="black">a⁰ = 1 (a ≠ 0)</text>
        <text x="18" y="158" fill="#7c3aed" fontSize="7" fontWeight="black">a⁻ⁿ = 1 / aⁿ</text>

        {/* Jobb oldali Gyökkártya */}
        <rect x="135" y="10" width="115" height="160" rx="10" className="fill-sky-50/70 dark:fill-sky-950/30 stroke-sky-400 dark:stroke-sky-600" strokeWidth="1.5" />
        <rect x="135" y="10" width="115" height="24" rx="10" fill="#0284c7" />
        <text x="192" y="26" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">NÉGYZETGYÖK</text>

        <text x="143" y="48" fill="#075985" fontSize="7" fontWeight="bold">√(a · b) = √a · √b</text>
        <text x="143" y="66" fill="#075985" fontSize="7" fontWeight="bold">√(a / b) = √a / √b</text>
        <text x="143" y="84" fill="#075985" fontSize="7" fontWeight="bold">√(a²) = |a|</text>
        <text x="143" y="102" fill="#075985" fontSize="7" fontWeight="bold">(√a)² = a (a ≥ 0)</text>
        <text x="143" y="120" fill="#075985" fontSize="7" fontWeight="bold">√aⁿ = (√a)ⁿ</text>

        {/* Gyök csapdafigyelmeztetés */}
        <line x1="143" y1="130" x2="242" y2="130" stroke="#7dd3fc" strokeWidth="1" strokeDasharray="2 2" />
        <rect x="141" y="135" width="103" height="26" rx="5" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
        <text x="192" y="146" textAnchor="middle" fill="#991b1b" fontSize="6.5" fontWeight="black">CSAPDA!</text>
        <text x="192" y="156" textAnchor="middle" fill="#b91c1c" fontSize="6.5">√(a+b) ≠ √a + √b</text>
      </svg>
    </div>
  );
};

/**
 * 4. Pénzügyi Növekedés és Kamatképlet Térkép
 * Százaléktényező -> Egyszerű kamat -> Kamatos kamat -> Értékcsökkenés
 */
export const FinancialGrowthFormulaMapSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 240,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 270 170"
        style={{ width: size, height: (size * 170) / 270, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Bal oldali: Szorzótényező */}
        <rect x="10" y="15" width="115" height="65" rx="8" className="fill-indigo-50 dark:fill-indigo-950/40 stroke-indigo-400" strokeWidth="1.5" />
        <text x="67" y="32" textAnchor="middle" fill="#3730a3" fontSize="8" fontWeight="bold">Kamattényező (q)</text>
        <text x="67" y="48" textAnchor="middle" fill="#4338ca" fontSize="9" fontWeight="black">q = 1 + p / 100</text>
        <text x="67" y="62" textAnchor="middle" fill="#6366f1" fontSize="7">p = 8% ➔ q = 1.08</text>
        <text x="67" y="72" textAnchor="middle" fill="#ef4444" fontSize="6.5">csökkenés: q = 1 - p/100</text>

        {/* Nyíl a kamatos kamathoz */}
        <path d="M 125 48 L 145 48" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Jobb felső: Kamatos Kamat Alapképlet */}
        <rect x="145" y="15" width="115" height="65" rx="8" className="fill-emerald-50 dark:fill-emerald-950/40 stroke-emerald-400" strokeWidth="1.5" />
        <text x="202" y="32" textAnchor="middle" fill="#065f46" fontSize="8" fontWeight="bold">Kamatos Kamat</text>
        <text x="202" y="50" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="black">Tn = T0 · qⁿ</text>
        <text x="202" y="64" textAnchor="middle" fill="#059669" fontSize="6.8">Exponenciális növekedés</text>
        <text x="202" y="73" textAnchor="middle" fill="#059669" fontSize="6.5">n év után a tőke</text>

        {/* Alsó összehasonlító sáv: Egyszerű kamat vs Kamatos kamat */}
        <rect x="10" y="95" width="250" height="62" rx="8" className="fill-slate-100 dark:fill-slate-800/60 stroke-slate-300 dark:stroke-slate-600" strokeWidth="1.2" />
        <text x="135" y="110" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300" fontSize="7.5" fontWeight="bold">KÉT MODELL KÜLÖNBSÉGE</text>

        <text x="20" y="126" fill="#475569" fontSize="7" fontWeight="bold">Egyszerű kamat:</text>
        <text x="85" y="126" fill="#1e293b" fontSize="7">Tₙ = T₀ · (1 + n · p/100) ➔ Lineáris egyenes</text>

        <text x="20" y="144" fill="#047857" fontSize="7" fontWeight="bold">Kamatos kamat:</text>
        <text x="85" y="144" fill="#065f46" fontSize="7">Tₙ = T₀ · qⁿ ➔ Merülő/ívelő exponenciális görbe</text>
      </svg>
    </div>
  );
};
