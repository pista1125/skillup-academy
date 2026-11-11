import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

/**
 * 1. Logikai szita & Venn-diagram (36 fős osztály: Matematika és Történelem)
 * Szemlélteti az unió, metszet és a külső komplementer elhelyezkedését.
 */
export const VennSetSieveSvg: React.FC<FigureProps> = ({ className = '', size = 300 }) => {
  return (
    <svg
      viewBox="0 0 460 260"
      className={`w-full h-auto max-w-[460px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="460" height="260" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="460" height="260" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="230" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        36 fős osztály: Emelt szintű matematika és történelem
      </text>

      {/* Eseménytér téglalap: Ω = 36 fő */}
      <g transform="translate(30, 40)">
        <rect x="0" y="0" width="400" height="155" rx="14" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" className="dark:fill-slate-800/60 dark:stroke-slate-700" />
        <text x="16" y="22" fontSize="12" fontWeight="black" fill="#475569" className="dark:fill-slate-300">
          Ω = 36 fő (Teljes osztály)
        </text>

        {/* Külső diákok (egyik sem): 12 fő */}
        <text x="35" y="135" fontSize="11" fontWeight="bold" fill="#64748b" className="dark:fill-slate-400">
          Egyik tantárgy sem: 12 fő (36 – 24)
        </text>
        <text x="35" y="147" fontSize="9" fill="#94a3b8">
          P(egyik sem) = 12/36 = 1/3 (33,3%)
        </text>

        {/* Bal oldali kör: Matematika (összesen 9 fő) */}
        <circle cx="160" cy="80" r="58" fill="#dbeafe" fillOpacity="0.75" stroke="#3b82f6" strokeWidth="2" className="dark:fill-blue-950/60 dark:stroke-blue-500" />
        {/* Jobb oldali kör: Történelem (összesen 18 fő) */}
        <circle cx="240" cy="80" r="58" fill="#fce7f3" fillOpacity="0.75" stroke="#ec4899" strokeWidth="2" className="dark:fill-pink-950/60 dark:stroke-pink-500" />

        {/* Körfeliratok */}
        <text x="125" y="42" textAnchor="middle" fontSize="11" fontWeight="black" fill="#1d4ed8" className="dark:fill-blue-300">
          Matematika (9)
        </text>
        <text x="275" y="42" textAnchor="middle" fontSize="11" fontWeight="black" fill="#be185d" className="dark:fill-pink-300">
          Történelem (18)
        </text>

        {/* Csak Matematika: 9 - 3 = 6 fő */}
        <text x="135" y="82" textAnchor="middle" fontSize="15" fontWeight="black" fill="#1e40af" className="dark:fill-blue-200">
          6
        </text>
        <text x="135" y="96" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#3b82f6" className="dark:fill-blue-300">
          csak matek
        </text>

        {/* Metszet: Mindkét tárgy = 3 fő */}
        <text x="200" y="82" textAnchor="middle" fontSize="15" fontWeight="black" fill="#6b21a8" className="dark:fill-purple-300">
          3
        </text>
        <text x="200" y="96" textAnchor="middle" fontSize="9" fontWeight="black" fill="#7e22ce" className="dark:fill-purple-400">
          mindkettő
        </text>

        {/* Csak Történelem: 18 - 3 = 15 fő */}
        <text x="265" y="82" textAnchor="middle" fontSize="15" fontWeight="black" fill="#9d174d" className="dark:fill-pink-200">
          15
        </text>
        <text x="265" y="96" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ec4899" className="dark:fill-pink-300">
          csak töri
        </text>
      </g>

      {/* Logikai szita összegző sáv */}
      <g transform="translate(30, 205)">
        <rect x="0" y="0" width="400" height="42" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
        <text x="200" y="17" textAnchor="middle" fontSize="11" fontWeight="black" fill="#0f172a" className="dark:fill-white">
          |M ∪ T| = |M| + |T| – |M ∩ T| = 9 + 18 – 3 = 24 fő
        </text>
        <text x="200" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c" className="dark:fill-rose-400">
          P(legalább egyik) = 24/36 = 2/3 (66,7%) &nbsp;|&nbsp; P(csak egyik) = (6 + 15)/36 = 21/36 = 58,3%
        </text>
      </g>
    </svg>
  );
};

/**
 * 2. Kétdimenziós Kereszttábla: Vércsoport és Rh-faktor (346 donor)
 * Szemlélteti a margóösszegeket és a feltételes/összetett valószínűségeket.
 */
export const BloodDonorCrossTableSvg: React.FC<FigureProps> = ({ className = '', size = 280 }) => {
  return (
    <svg
      viewBox="0 0 460 250"
      className={`w-full h-auto max-w-[460px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="460" height="250" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="460" height="250" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="230" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Véradók eloszlása vércsoport és Rh-faktor szerint (346 egység)
      </text>

      {/* Kétdimenziós Kereszttáblázat */}
      <g transform="translate(35, 42)">
        {/* Fejléc sor */}
        <rect x="0" y="0" width="80" height="28" fill="#e2e8f0" className="dark:fill-slate-700" />
        <text x="40" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155" className="dark:fill-slate-300">Rh / Vércsoport</text>

        {['0-s', 'A-s', 'B-s', 'AB-s', 'Összesen'].map((col, idx) => (
          <g key={`head-${idx}`} transform={`translate(${80 + idx * 62}, 0)`}>
            <rect x="0" y="0" width="62" height="28" fill={idx === 4 ? '#cbd5e1' : '#f1f5f9'} stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
            <text x="31" y="18" textAnchor="middle" fontSize="11" fontWeight="black" fill={idx === 4 ? '#0f172a' : '#475569'} className="dark:fill-slate-200">
              {col}
            </text>
          </g>
        ))}

        {/* 1. Sor: Rh-pozitív */}
        <g transform="translate(0, 28)">
          <rect x="0" y="0" width="80" height="28" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800/80 dark:stroke-slate-700" />
          <text x="40" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#047857" className="dark:fill-emerald-400">Rh-pozitív</text>

          {[161, 73, 44, 14, 292].map((val, idx) => (
            <g key={`rhp-${idx}`} transform={`translate(${80 + idx * 62}, 0)`}>
              <rect x="0" y="0" width="62" height="28" fill={idx === 4 ? '#f1f5f9' : '#ffffff'} stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-900 dark:stroke-slate-700" />
              <text x="31" y="18" textAnchor="middle" fontSize={idx === 4 ? '11' : '12'} fontWeight={idx === 4 ? 'black' : 'bold'} fill="#1e293b" className="dark:fill-slate-200">
                {val}
              </text>
            </g>
          ))}
        </g>

        {/* 2. Sor: Rh-negatív */}
        <g transform="translate(0, 56)">
          <rect x="0" y="0" width="80" height="28" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800/80 dark:stroke-slate-700" />
          <text x="40" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c" className="dark:fill-rose-400">Rh-negatív</text>

          {[30, 14, 8, 2, 54].map((val, idx) => (
            <g key={`rhn-${idx}`} transform={`translate(${80 + idx * 62}, 0)`}>
              <rect x="0" y="0" width="62" height="28" fill={idx === 4 ? '#f1f5f9' : '#ffffff'} stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-900 dark:stroke-slate-700" />
              <text x="31" y="18" textAnchor="middle" fontSize={idx === 4 ? '11' : '12'} fontWeight={idx === 4 ? 'black' : 'bold'} fill="#1e293b" className="dark:fill-slate-200">
                {val}
              </text>
            </g>
          ))}
        </g>

        {/* 3. Margóösszeg sor */}
        <g transform="translate(0, 84)">
          <rect x="0" y="0" width="80" height="28" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" className="dark:fill-slate-700 dark:stroke-slate-600" />
          <text x="40" y="18" textAnchor="middle" fontSize="11" fontWeight="black" fill="#0f172a" className="dark:fill-white">Összesen</text>

          {[191, 87, 52, 16, 346].map((val, idx) => (
            <g key={`sum-${idx}`} transform={`translate(${80 + idx * 62}, 0)`}>
              <rect x="0" y="0" width="62" height="28" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-600" />
              <text x="31" y="18" textAnchor="middle" fontSize="12" fontWeight="black" fill={idx === 4 ? '#2563eb' : '#0f172a'} className="dark:fill-blue-400">
                {val}
              </text>
            </g>
          ))}
        </g>
      </g>

      {/* Alsó mintapéldák */}
      <g transform="translate(35, 165)">
        <rect x="0" y="0" width="390" height="70" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
        <text x="14" y="20" fontSize="11" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
          • AB-s vagy B-s donor: (14 + 2 + 44 + 8) / 346 = 68 / 346 ≈ 19,7%
        </text>
        <text x="14" y="40" fontSize="11" fontWeight="bold" fill="#059669" className="dark:fill-emerald-400">
          • 0-s vagy Rh-pozitív: P(0 ∪ Rh+) = (191 + 292 – 161) / 346 = 322 / 346 ≈ 93,1%
        </text>
        <text x="14" y="60" fontSize="11" fontWeight="bold" fill="#dc2626" className="dark:fill-rose-400">
          • Nem AB és nem Rh-: (161 + 73 + 44) / 346 = 278 / 346 ≈ 80,3%
        </text>
      </g>
    </svg>
  );
};

/**
 * 3. Sorrendek és Belépési Permutációk (Anna és Kati a teremben)
 * Szemlélteti az egymás utáni belépés (blokkolás) kombinatorikus valószínűségét.
 */
export const QueuePermutationSvg: React.FC<FigureProps> = ({ className = '', size = 260 }) => {
  return (
    <svg
      viewBox="0 0 420 220"
      className={`w-full h-auto max-w-[420px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="420" height="220" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="420" height="220" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="210" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        5 barátnő belép a terembe: Anna és Kati egymás után
      </text>

      {/* 5 Pozíció dobozai */}
      <g transform="translate(30, 48)">
        {[1, 2, 3, 4, 5].map((pos, idx) => (
          <g key={`p-${idx}`} transform={`translate(${idx * 72}, 0)`}>
            <rect x="0" y="0" width="64" height="60" rx="10" fill={idx < 2 ? '#fce7f3' : '#f1f5f9'} stroke={idx < 2 ? '#ec4899' : '#cbd5e1'} strokeWidth="1.5" className="dark:fill-slate-800 dark:stroke-slate-700" />
            <text x="32" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b" className="dark:fill-slate-400">
              {pos}. belépő
            </text>
            <text x="32" y="46" textAnchor="middle" fontSize="13" fontWeight="black" fill={idx === 0 ? '#db2777' : idx === 1 ? '#be185d' : '#334155'} className="dark:fill-slate-200">
              {idx === 0 ? 'Anna' : idx === 1 ? 'Kati' : `B${idx}`}
            </text>
          </g>
        ))}

        {/* Blokkolás keret az első 2 elemre */}
        <rect x="-4" y="-4" width="144" height="68" rx="14" fill="none" stroke="#db2777" strokeWidth="2" strokeDasharray="4 3" />
        <text x="68" y="78" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#be185d" className="dark:fill-pink-400">
          Együtt egy blokk [AK vagy KA]
        </text>
      </g>

      {/* Magyarázat alul */}
      <g transform="translate(30, 140)">
        <rect x="0" y="0" width="360" height="65" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
        <text x="14" y="20" fontSize="11" fontWeight="bold" fill="#0f172a" className="dark:fill-white">
          • Összes sorrend: 5! = 120 eset
        </text>
        <text x="14" y="38" fontSize="11" fontWeight="bold" fill="#be185d" className="dark:fill-pink-400">
          • Egymás után lépnek be: 4 lehetséges hely × 2 sorrend × 3! = 48 eset
        </text>
        <text x="14" y="55" fontSize="11" fontWeight="black" fill="#2563eb" className="dark:fill-blue-400">
          P(egymás után) = 48 / 120 = 2/5 (40%) ⟹ P(nem egymás után) = 3/5 (60%)
        </text>
      </g>
    </svg>
  );
};

