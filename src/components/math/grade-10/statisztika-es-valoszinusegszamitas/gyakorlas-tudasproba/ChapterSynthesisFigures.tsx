import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

/**
 * 1. A Statisztika és Valószínűségszámítás Teljes Fejezeti Elmetérképe
 * Összefoglalja a 10. osztályos tananyag két nagy pillérét:
 * Statisztika (számtani/mértani közép, módusz, medián, terjedelem, átlagos eltérés, szórás, osztályba sorolás)
 * és Valószínűségszámítás (kísérletek, relatív gyakoriság, Laplace-modell, logikai szita, mintavétel).
 */
export const StatisticsProbabilityOverviewMapSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 480 270"
      className={`w-full h-auto max-w-[480px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="480" height="270" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="480" height="270" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      {/* Cím */}
      <text x="240" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a" className="dark:fill-slate-100">
        Statisztika és Valószínűségszámítás: Fejezeti Szintézis
      </text>

      {/* Két fő oszlop: Bal = Statisztika, Jobb = Valószínűségszámítás */}
      <g transform="translate(25, 42)">
        {/* Bal oldali kártya: Statisztika */}
        <rect x="0" y="0" width="205" height="175" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" className="dark:fill-emerald-950/40 dark:stroke-emerald-700" />
        <text x="102" y="24" textAnchor="middle" fontSize="13" fontWeight="black" fill="#047857" className="dark:fill-emerald-300">
          I. STATISZTIKA
        </text>

        <g transform="translate(12, 38)" fontSize="10" fill="#065f46" className="dark:fill-emerald-200">
          <text y="14" fontWeight="bold">• Középértékek: x̄ (egysz./súlyozott)</text>
          <text y="30" fontWeight="bold">• Számtani és mértani közép (A ≥ G)</text>
          <text y="46" fontWeight="bold">• Helyzeti mutatók: Módusz, Medián</text>
          <text y="62" fontWeight="bold">• Szóródás: Terjedelem, Átlagos eltérés</text>
          <text y="78" fontWeight="bold">• Szórás (s): átlagtól vett négyzetes eltérés</text>
          <text y="94" fontWeight="bold">• Változások: abszolút (Δ) és relatív (%)</text>
          <text y="110" fontWeight="bold">• Osztályba sorolás: hisztogram, csapda</text>
          <text y="126" fontStyle="italic" fill="#047857" className="dark:fill-emerald-400">Σ(xᵢ – x̄) = 0 (kiegyenlítődés)</text>
        </g>

        {/* Jobb oldali kártya: Valószínűségszámítás */}
        <rect x="225" y="0" width="205" height="175" rx="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" className="dark:fill-blue-950/40 dark:stroke-blue-700" />
        <text x="327" y="24" textAnchor="middle" fontSize="13" fontWeight="black" fill="#1d4ed8" className="dark:fill-blue-300">
          II. VALÓSZÍNŰSÉG
        </text>

        <g transform="translate(237, 38)" fontSize="10" fill="#1e40af" className="dark:fill-blue-200">
          <text y="14" fontWeight="bold">• Véletlen kísérlet &amp; relatív gyakoriság</text>
          <text y="30" fontWeight="bold">• Nagy számok törvénye: k/n → P(A)</text>
          <text y="46" fontWeight="bold">• Laplace-modell: P(A) = k / n</text>
          <text y="62" fontWeight="bold">• Két kocka: 36 eset (7 vs. 8 csapda)</text>
          <text y="78" fontWeight="bold">• Eseménytípusok: Biztos (1), Lehetetlen (0)</text>
          <text y="94" fontWeight="bold">• Komplementer: P(nem A) = 1 – P(A)</text>
          <text y="110" fontWeight="bold">• Logikai szita: P(A ∪ B) = A + B – (A ∩ B)</text>
          <text y="126" fontStyle="italic" fill="#1d4ed8" className="dark:fill-blue-400">Visszatevés nélküli mintavétel</text>
        </g>
      </g>

      {/* Összekötő híd alul */}
      <g transform="translate(25, 226)">
        <rect x="0" y="0" width="430" height="32" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
        <text x="215" y="20" textAnchor="middle" fontSize="11" fontWeight="black" fill="#0f172a" className="dark:fill-white">
          Empirikus megfigyelések (Adatok) ⟷ Elméleti valószínűségi modellek
        </text>
      </g>
    </svg>
  );
};

/**
 * 2. Jánosék Almái (Kompetenciamérés 2016)
 * Szemlélteti a napi kilogrammonkénti árat és az eladott mennyiséget,
 * a súlyozott napi átlagos bevétel kiszámításához.
 */
export const AppleMarketWeightedAverageSvg: React.FC<FigureProps> = ({ className = '', size = 280 }) => {
  return (
    <svg
      viewBox="0 0 460 250"
      className={`w-full h-auto max-w-[460px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="460" height="250" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="460" height="250" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="230" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Kompetenciamérés (2016): Jánosék almái a piacon
      </text>

      {/* Táblázatos és oszlopdiagramos összevetés */}
      <g transform="translate(30, 40)">
        {/* Fejléc */}
        {['Nap', 'Ár (Ft/kg)', 'Eladott (kg)', 'Bevétel (Ft)'].map((col, idx) => (
          <text
            key={`th-${idx}`}
            x={idx === 0 ? 30 : idx === 1 ? 120 : idx === 2 ? 230 : 340}
            y="14"
            textAnchor="middle"
            fontSize="10"
            fontWeight="black"
            fill="#64748b"
            className="dark:fill-slate-400"
          >
            {col}
          </text>
        ))}
        <line x1="0" y1="20" x2="400" y2="20" stroke="#cbd5e1" strokeWidth="1" className="dark:stroke-slate-700" />

        {/* 5 nap adatai: Hétfő (100 Ft, 50 kg), Kedd (120 Ft, 40 kg), Szerda (80 Ft, 100 kg), Csütörtök (140 Ft, 30 kg), Péntek (90 Ft, 80 kg) */}
        {[
          { day: 'Hétfő', price: 100, kg: 50, rev: 5000 },
          { day: 'Kedd', price: 120, kg: 40, rev: 4800 },
          { day: 'Szerda', price: 80, kg: 100, rev: 8000 },
          { day: 'Csütörtök', price: 140, kg: 30, rev: 4200 },
          { day: 'Péntek', price: 90, kg: 80, rev: 7200 }
        ].map((row, rIdx) => (
          <g key={row.day} transform={`translate(0, ${36 + rIdx * 24})`}>
            <text x="30" y="0" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-200">{row.day}</text>
            <text x="120" y="0" textAnchor="middle" fontSize="11" fontMono="true" fill="#0284c7" className="dark:fill-sky-400">{row.price} Ft</text>
            <text x="230" y="0" textAnchor="middle" fontSize="11" fontMono="true" fill="#16a34a" className="dark:fill-emerald-400">{row.kg} kg</text>
            <text x="340" y="0" textAnchor="middle" fontSize="11" fontWeight="bold" fontMono="true" fill="#d97706" className="dark:fill-amber-400">{row.rev.toLocaleString('hu-HU')} Ft</text>
          </g>
        ))}

        <line x1="0" y1="152" x2="400" y2="152" stroke="#cbd5e1" strokeWidth="1" className="dark:stroke-slate-700" />
      </g>

      {/* Eredmény banner alul */}
      <g transform="translate(30, 198)">
        <rect x="0" y="0" width="400" height="40" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" className="dark:fill-emerald-950/40 dark:stroke-emerald-800" />
        <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46" className="dark:fill-emerald-300">
          Összes 5 napi bevétel: 5000 + 4800 + 8000 + 4200 + 7200 = 29 200 Ft
        </text>
        <text x="200" y="31" textAnchor="middle" fontSize="11" fontWeight="black" fill="#15803d" className="dark:fill-emerald-400">
          Napi bevétel átlaga: 29 200 Ft / 5 nap = 5 840 Ft / nap
        </text>
      </g>
    </svg>
  );
};

/**
 * 3. 30 fős osztály matematika érettségi jegyei (Érettségi feladat 2017)
 * Szemlélteti az érdemjegyek oszlopdiagramját, móduszt (3), mediánt (3) és az átlagot (3,17).
 */
export const MathExamGradeDistributionSvg: React.FC<FigureProps> = ({ className = '', size = 280 }) => {
  return (
    <svg
      viewBox="0 0 460 250"
      className={`w-full h-auto max-w-[460px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="460" height="250" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="460" height="250" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="230" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Érettségi feladat (2017): 30 fős osztály matematika vizsgajegyei
      </text>

      {/* Oszlopdiagram: 1-es: 2 fő, 2-es: 5 fő, 3-as: 12 fő, 4-es: 7 fő, 5-ös: 4 fő (össz: 30 fő) */}
      <g transform="translate(60, 48)">
        {/* Y tengely segédvonalak */}
        {[0, 4, 8, 12].map((val) => (
          <g key={`y-${val}`} transform={`translate(0, ${120 - val * 9})`}>
            <line x1="0" y1="0" x2="330" y2="0" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-slate-800" />
            <text x="-12" y="4" textAnchor="end" fontSize="10" fill="#94a3b8">{val}</text>
          </g>
        ))}

        {/* Tengelyek */}
        <line x1="0" y1="120" x2="340" y2="120" stroke="#64748b" strokeWidth="1.5" />
        <line x1="0" y1="0" x2="0" y2="120" stroke="#64748b" strokeWidth="1.5" />

        {/* Oszlopok */}
        {[
          { grade: '1-es', count: 2, color: '#f43f5e' },
          { grade: '2-es', count: 5, color: '#fb923c' },
          { grade: '3-as', count: 12, color: '#10b981' }, // MÓDUSZ
          { grade: '4-es', count: 7, color: '#38bdf8' },
          { grade: '5-ös', count: 4, color: '#818cf8' }
        ].map((item, idx) => {
          const barH = item.count * 9;
          const xPos = 25 + idx * 62;
          return (
            <g key={item.grade}>
              <rect
                x={xPos}
                y={120 - barH}
                width="38"
                height={barH}
                rx="6"
                fill={item.color}
                opacity={item.count === 12 ? 1 : 0.85}
              />
              <text x={xPos + 19} y={114 - barH} textAnchor="middle" fontSize="11" fontWeight="black" fill="#0f172a" className="dark:fill-white">
                {item.count}
              </text>
              <text x={xPos + 19} y="136" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155" className="dark:fill-slate-300">
                {item.grade}
              </text>
            </g>
          );
        })}
      </g>

      {/* Mutatók összefoglalása */}
      <g transform="translate(40, 195)">
        <rect x="0" y="0" width="380" height="42" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
        <text x="65" y="18" textAnchor="middle" fontSize="10" fill="#64748b" className="dark:fill-slate-400">ÁTLAG (x̄)</text>
        <text x="65" y="34" textAnchor="middle" fontSize="13" fontWeight="black" fill="#0f172a" className="dark:fill-white">3,20</text>

        <line x1="130" y1="6" x2="130" y2="36" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-700" />

        <text x="190" y="18" textAnchor="middle" fontSize="10" fill="#64748b" className="dark:fill-slate-400">MEDIÁN (Me)</text>
        <text x="190" y="34" textAnchor="middle" fontSize="13" fontWeight="black" fill="#2563eb" className="dark:fill-blue-400">3</text>

        <line x1="250" y1="6" x2="250" y2="36" stroke="#e2e8f0" strokeWidth="1" className="dark:stroke-slate-700" />

        <text x="315" y="18" textAnchor="middle" fontSize="10" fill="#64748b" className="dark:fill-slate-400">MÓDUSZ (Mo)</text>
        <text x="315" y="34" textAnchor="middle" fontSize="13" fontWeight="black" fill="#059669" className="dark:fill-emerald-400">3 (12 diák)</text>
      </g>
    </svg>
  );
};

