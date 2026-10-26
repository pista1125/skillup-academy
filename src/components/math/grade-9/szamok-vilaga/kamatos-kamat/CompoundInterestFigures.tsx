import React from 'react';

export interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. A Kamatos Kamat Képletének Felépítése
 * Tn = T0 · (1 + p/100)^n = T0 · q^n
 */
export const CompoundInterestFormulaSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 580 260"
        style={size ? { width: size, height: (size * 260) / 580 } : { width: '100%', maxWidth: 580, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="ciFormulaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#3730a3" />
          </linearGradient>
          <linearGradient id="ciFactorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        <rect x="10" y="10" width="560" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="290" y="34" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          A Kamatos Kamat Alapképlete és Tagjai
        </text>
        <text x="290" y="52" textAnchor="middle" fill="#64748b" fontSize="11">
          A pénz időértékének és exponenciális gyarapodásának matematikai modellje
        </text>

        {/* Nagy képlet a közepén */}
        <g transform="translate(85, 75)">
          {/* Tn */}
          <rect x="0" y="5" width="80" height="60" rx="10" fill="url(#ciFormulaGrad)" />
          <text x="40" y="47" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="32" fontFamily="serif">
            Tₙ
          </text>

          {/* = */}
          <text x="105" y="48" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="30">
            =
          </text>

          {/* T0 */}
          <rect x="130" y="5" width="80" height="60" rx="10" fill="#2563eb" />
          <text x="170" y="47" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="32" fontFamily="serif">
            T₀
          </text>

          {/* · */}
          <text x="230" y="48" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="30">
            ·
          </text>

          {/* (1 + p/100)^n vagy q^n */}
          <rect x="255" y="5" width="150" height="60" rx="10" fill="url(#ciFactorGrad)" />
          <text x="315" y="46" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="24">
            (1 + p/100)
          </text>
          {/* n kitevő */}
          <text x="395" y="24" textAnchor="middle" fill="#fef08a" fontWeight="black" fontSize="20">
            ⁿ
          </text>
        </g>

        {/* Jelmagyarázat nyilakkal és kártyákkal alul */}
        <g transform="translate(30, 155)">
          {/* T_n */}
          <rect x="0" y="0" width="115" height="75" rx="8" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1" />
          <text x="57" y="20" textAnchor="middle" fill="#3730a3" fontWeight="bold" fontSize="11">Tₙ: Végtőke</text>
          <text x="57" y="40" textAnchor="middle" fill="#4338ca" fontSize="9.5">A megtakarítás</text>
          <text x="57" y="55" textAnchor="middle" fill="#4338ca" fontSize="9.5">vagy tartozás</text>
          <text x="57" y="68" textAnchor="middle" fill="#1e1b4b" fontWeight="bold" fontSize="9">n év elteltével</text>

          {/* T_0 */}
          <rect x="130" y="0" width="115" height="75" rx="8" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          <text x="187" y="20" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="11">T₀: Kezdőtőke</text>
          <text x="187" y="40" textAnchor="middle" fill="#1e3a8a" fontSize="9.5">Az eredetileg</text>
          <text x="187" y="55" textAnchor="middle" fill="#1e3a8a" fontSize="9.5">lekötött vagy</text>
          <text x="187" y="68" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="9">felvett összeg</text>

          {/* q = (1+p/100) */}
          <rect x="260" y="0" width="135" height="75" rx="8" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
          <text x="327" y="20" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="11">q: Kamattényező</text>
          <text x="327" y="40" textAnchor="middle" fill="#047857" fontSize="9.5">q = 1 + p/100</text>
          <text x="327" y="55" textAnchor="middle" fill="#047857" fontSize="9.5">p = kamatláb %</text>
          <text x="327" y="68" textAnchor="middle" fill="#064e3b" fontWeight="bold" fontSize="9">Pl. 8% → q = 1,08</text>

          {/* n */}
          <rect x="410" y="0" width="110" height="75" rx="8" fill="#fef9c3" stroke="#fde047" strokeWidth="1" />
          <text x="465" y="20" textAnchor="middle" fill="#854d0e" fontWeight="bold" fontSize="11">n: Futamidő</text>
          <text x="465" y="40" textAnchor="middle" fill="#713f12" fontSize="9.5">Kamatperiódusok</text>
          <text x="465" y="55" textAnchor="middle" fill="#713f12" fontSize="9.5">száma (évek,</text>
          <text x="465" y="68" textAnchor="middle" fill="#451a03" fontWeight="bold" fontSize="9">félévek, hónapok)</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Egyszerű Kamat vs. Kamatos Kamat Összehasonlítása
 * 1 000 000 Ft lekötése 10%-os kamattal 10 éven át
 */
export const SimpleVsCompoundComparisonSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 620 280"
        style={size ? { width: size, height: (size * 280) / 620 } : { width: '100%', maxWidth: 620, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="10" y="10" width="600" height="260" rx="16" fill="#fffdfa" stroke="#fed7aa" strokeWidth="1.5" />

        <text x="310" y="32" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          Egyszerű Kamat vs. Kamatos Kamat (1 000 000 Ft, 10% kamatláb, 10 év)
        </text>
        <text x="310" y="50" textAnchor="middle" fill="#78350f" fontSize="11">
          A kamatos kamatnál a jóváírt kamat is kamatozik, exponenciális növekedést eredményezve
        </text>

        {/* Grafikon tengelyek */}
        <g transform="translate(60, 60)">
          {/* Y tengely */}
          <line x1="0" y1="0" x2="0" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="0" y1="150" x2="360" y2="150" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Rács vonalak */}
          <line x1="0" y1="150" x2="360" y2="150" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="0" y1="100" x2="360" y2="100" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="50" x2="360" y2="50" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="10" x2="360" y2="10" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />

          <text x="-10" y="154" textAnchor="end" fill="#64748b" fontSize="9">1M</text>
          <text x="-10" y="104" textAnchor="end" fill="#64748b" fontSize="9">1,5M</text>
          <text x="-10" y="54" textAnchor="end" fill="#64748b" fontSize="9">2M</text>
          <text x="-10" y="14" textAnchor="end" fill="#64748b" fontSize="9">2,6M</text>

          {/* Időpontok X tengelyen */}
          <text x="0" y="165" textAnchor="middle" fill="#64748b" fontSize="9">0. év</text>
          <text x="180" y="165" textAnchor="middle" fill="#64748b" fontSize="9">5. év</text>
          <text x="360" y="165" textAnchor="middle" fill="#64748b" fontSize="9">10. év</text>

          {/* Egyszerű kamat egyenes (kék): 1M -> 1.5M -> 2M */}
          <line x1="0" y1="150" x2="360" y2="50" stroke="#2563eb" strokeWidth="3" strokeDasharray="6 3" />
          <circle cx="360" cy="50" r="4" fill="#2563eb" />

          {/* Kamatos kamat exponenciális görbe (zöld/lila): 1M -> 1.61M -> 2.59M */}
          <path d="M 0 150 Q 180 110 360 10" fill="none" stroke="#4f46e5" strokeWidth="3.5" />
          <circle cx="360" cy="10" r="5" fill="#4f46e5" />

          {/* Különbség kiemelése */}
          <line x1="360" y1="10" x2="360" y2="50" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
          <text x="368" y="34" fill="#b91c1c" fontWeight="bold" fontSize="10">+593 742 Ft!</text>
        </g>

        {/* Eredménykártyák a jobb oldalon */}
        <g transform="translate(440, 75)">
          {/* Egyszerű kamat kártya */}
          <rect x="0" y="0" width="160" height="70" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
          <text x="80" y="18" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="11">Egyszerű Kamatozás</text>
          <text x="80" y="36" textAnchor="middle" fill="#1e3a8a" fontSize="10">Tn = T₀ + n · (T₀ · p/100)</text>
          <text x="80" y="55" textAnchor="middle" fill="#2563eb" fontWeight="black" fontSize="14">2 000 000 Ft</text>

          {/* Kamatos kamat kártya */}
          <rect x="0" y="85" width="160" height="85" rx="8" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.5" />
          <text x="80" y="103" textAnchor="middle" fill="#3730a3" fontWeight="bold" fontSize="11">Kamatos Kamatozás</text>
          <text x="80" y="121" textAnchor="middle" fill="#4338ca" fontSize="10">Tn = 1M · 1,10¹⁰</text>
          <text x="80" y="142" textAnchor="middle" fill="#4f46e5" fontWeight="black" fontSize="15">2 593 742 Ft</text>
          <text x="80" y="160" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="9.5">+29,7% extra hozam!</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. Növekedés vs. Értékcsökkenés (Amortizáció)
 * q = (1 + p/100) vs q = (1 - p/100)
 */
export const GrowthAndDepreciationSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 580 230"
        style={size ? { width: size, height: (size * 230) / 580 } : { width: '100%', maxWidth: 580, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="10" y="10" width="560" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="290" y="32" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          Növekedés (Betét) vs. Értékcsökkenés (Amortizáció)
        </text>
        <text x="290" y="50" textAnchor="middle" fill="#64748b" fontSize="11">
          A növekedési tényező (q) értéke meghatározza a folyamat irányát
        </text>

        {/* Növekedés: q > 1 */}
        <g transform="translate(30, 68)">
          <rect x="0" y="0" width="245" height="135" rx="12" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
          <rect x="12" y="10" width="115" height="22" rx="6" fill="#059669" />
          <text x="70" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            📈 NÖVEKEDÉS (q &gt; 1)
          </text>
          
          <text x="122" y="58" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="13">
            Tₙ = T₀ · (1 + p/100)ⁿ
          </text>
          <text x="122" y="78" textAnchor="middle" fill="#047857" fontSize="11">
            Kamattényező: q &gt; 1
          </text>
          <rect x="12" y="92" width="220" height="32" rx="6" fill="#ffffff" stroke="#6ee7b7" strokeWidth="1" />
          <text x="122" y="112" textAnchor="middle" fill="#064e3b" fontSize="10" fontWeight="bold">
            Pl. 8% kamat: q = 1 + 0,08 = 1,08
          </text>
        </g>

        {/* Értékcsökkenés: q < 1 */}
        <g transform="translate(305, 68)">
          <rect x="0" y="0" width="245" height="135" rx="12" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1.5" />
          <rect x="12" y="10" width="135" height="22" rx="6" fill="#e11d48" />
          <text x="80" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            📉 CSÖKKENÉS (q &lt; 1)
          </text>
          
          <text x="122" y="58" textAnchor="middle" fill="#881337" fontWeight="bold" fontSize="13">
            Tₙ = T₀ · (1 - p/100)ⁿ
          </text>
          <text x="122" y="78" textAnchor="middle" fill="#9f1239" fontSize="11">
            Csökkenési tényező: 0 &lt; q &lt; 1
          </text>
          <rect x="12" y="92" width="220" height="32" rx="6" fill="#ffffff" stroke="#fda4af" strokeWidth="1" />
          <text x="122" y="112" textAnchor="middle" fill="#4c0519" fontSize="10" fontWeight="bold">
            Pl. 15% amortizáció: q = 1 - 0,15 = 0,85
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Pénzügyi Mutatók: EBKM és THM
 */
export const FinancialTermsSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 580 200"
        style={size ? { width: size, height: (size * 200) / 580 } : { width: '100%', maxWidth: 580, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="10" y="10" width="560" height="180" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="290" y="32" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          Gyakorlati Pénzügyi Mutatók: EBKM és THM
        </text>

        {/* EBKM */}
        <g transform="translate(25, 50)">
          <rect x="0" y="0" width="255" height="125" rx="10" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.5" />
          <rect x="12" y="10" width="70" height="22" rx="4" fill="#4f46e5" />
          <text x="47" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            EBKM
          </text>
          <text x="90" y="25" fill="#312e81" fontWeight="bold" fontSize="10">
            Betétek mutatója
          </text>

          <text x="12" y="52" fill="#3730a3" fontWeight="bold" fontSize="9.5">
            Egységesített Betéti Kamatláb Mutató
          </text>
          <text x="12" y="70" fill="#4338ca" fontSize="9">
            Megmutatja az 1 év alatt ténylegesen
          </text>
          <text x="12" y="85" fill="#4338ca" fontSize="9">
            jóváírt hozamot az adók és költségek
          </text>
          <text x="12" y="100" fill="#1e1b4b" fontWeight="bold" fontSize="9">
            figyelembevételével (Összehasonlítható!).
          </text>
        </g>

        {/* THM */}
        <g transform="translate(300, 50)">
          <rect x="0" y="0" width="255" height="125" rx="10" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.5" />
          <rect x="12" y="10" width="65" height="22" rx="4" fill="#ea580c" />
          <text x="44" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            THM
          </text>
          <text x="85" y="25" fill="#7c2d12" fontWeight="bold" fontSize="10">
            Hitelek mutatója
          </text>

          <text x="12" y="52" fill="#9a3412" fontWeight="bold" fontSize="9.5">
            Teljes Hiteldíj Mutató
          </text>
          <text x="12" y="70" fill="#c2410c" fontSize="9">
            A kamaton felül tartalmazza a kezelési
          </text>
          <text x="12" y="85" fill="#c2410c" fontSize="9">
            költséget, folyósítási díjat és egyéb
          </text>
          <text x="12" y="100" fill="#431407" fontWeight="bold" fontSize="9">
            kötelező terheket (A hitel valós ára!).
          </text>
        </g>
      </svg>
    </div>
  );
};
