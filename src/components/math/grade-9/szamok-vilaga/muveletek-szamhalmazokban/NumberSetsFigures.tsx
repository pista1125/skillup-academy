import React from 'react';

/**
 * Számhalmazok hierarchiája (N ⊂ Z ⊂ Q ⊂ R és Q*) Euler-Venn diagram SVG
 */
export const NumberSetsVennSvg: React.FC<{ size?: number; className?: string }> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 350"
        style={size ? { width: size, height: (size * 350) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <filter id="setGlowG9" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* R - Valós számok halmaza (Külső nagy keret) */}
        <rect
          x="8"
          y="8"
          width="504"
          height="334"
          rx="20"
          className="fill-blue-50/50 dark:fill-blue-950/25 stroke-blue-500 dark:stroke-blue-400"
          strokeWidth="2.5"
        />
        <text x="26" y="36" className="fill-blue-800 dark:fill-blue-200 font-black text-base tracking-tight">
          ℝ (Valós számok halmaza)
        </text>
        <text x="26" y="52" className="fill-blue-600/80 dark:fill-blue-300/80 font-medium text-[11px]">
          ℝ = ℚ ∪ ℚ*  (A teljes folytonos számegyenes)
        </text>

        {/* Q* - Irracionális számok különálló oszlopa */}
        <rect
          x="360"
          y="68"
          width="144"
          height="260"
          rx="16"
          className="fill-amber-50/90 dark:fill-amber-950/45 stroke-amber-500 dark:stroke-amber-400"
          strokeWidth="2"
        />
        <text x="432" y="94" textAnchor="middle" className="fill-amber-900 dark:fill-amber-200 font-black text-sm">
          ℚ* (Irracionális)
        </text>
        <text x="432" y="110" textAnchor="middle" className="fill-amber-700/80 dark:fill-amber-300/70 font-medium text-[10px]">
          Nem írható fel a/b alakban
        </text>
        <text x="432" y="148" textAnchor="middle" className="fill-amber-950 dark:fill-amber-100 font-mono text-[13px] font-bold">
          √2,  √3,  √5
        </text>
        <text x="432" y="184" textAnchor="middle" className="fill-amber-950 dark:fill-amber-100 font-mono text-[12px] font-bold">
          π ≈ 3,14159…
        </text>
        <text x="432" y="216" textAnchor="middle" className="fill-amber-950 dark:fill-amber-100 font-mono text-[12px] font-bold">
          e ≈ 2,71828…
        </text>
        <text x="432" y="248" textAnchor="middle" className="fill-amber-950 dark:fill-amber-100 font-mono text-[11px] font-bold">
          0,1010010001…
        </text>
        <text x="432" y="278" textAnchor="middle" className="fill-amber-950 dark:fill-amber-100 font-mono text-[12px] font-bold">
          3 − √2,  2π
        </text>
        <text x="432" y="308" textAnchor="middle" className="fill-amber-800 dark:fill-amber-300 font-bold uppercase text-[9px] tracking-wider">
          Végtelen nem szakaszos
        </text>

        {/* Q - Racionális számok halmaza */}
        <ellipse
          cx="180"
          cy="198"
          rx="164"
          ry="126"
          className="fill-cyan-50/80 dark:fill-cyan-950/40 stroke-cyan-500 dark:stroke-cyan-400"
          strokeWidth="2"
        />
        <text x="45" y="106" className="fill-cyan-800 dark:fill-cyan-200 font-black text-sm">
          ℚ (Racionális)
        </text>
        <text x="45" y="122" className="fill-cyan-700/80 dark:fill-cyan-300/70 font-medium text-[10px]">
          a/b alak (b ≠ 0)
        </text>
        <text x="48" y="152" className="fill-cyan-950 dark:fill-cyan-100 font-mono text-[13px] font-bold">
          3/4
        </text>
        <text x="48" y="186" className="fill-cyan-950 dark:fill-cyan-100 font-mono text-[13px] font-bold">
          −2,5
        </text>
        <text x="48" y="222" className="fill-cyan-950 dark:fill-cyan-100 font-mono text-[12px] font-bold">
          0,(3) = 1/3
        </text>
        <text x="55" y="258" className="fill-cyan-950 dark:fill-cyan-100 font-mono text-[12px] font-bold">
          −11/7
        </text>
        <text x="88" y="296" className="fill-cyan-950 dark:fill-cyan-100 font-mono text-[12px] font-bold">
          √(144/25) = 12/5
        </text>

        {/* Z - Egész számok halmaza */}
        <ellipse
          cx="205"
          cy="208"
          rx="118"
          ry="96"
          className="fill-indigo-50/85 dark:fill-indigo-950/50 stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth="2"
        />
        <text x="132" y="148" className="fill-indigo-800 dark:fill-indigo-200 font-black text-sm">
          ℤ (Egész)
        </text>
        <text x="132" y="162" className="fill-indigo-600/80 dark:fill-indigo-300/70 font-mono text-[10px]">
          {'{…, -2, -1, 0, 1, 2, …}'}
        </text>
        <text x="122" y="192" className="fill-indigo-950 dark:fill-indigo-100 font-mono text-[13px] font-bold">
          −1,  −7
        </text>
        <text x="122" y="228" className="fill-indigo-950 dark:fill-indigo-100 font-mono text-[13px] font-bold">
          −42
        </text>
        <text x="132" y="264" className="fill-indigo-950 dark:fill-indigo-100 font-mono text-[12px] font-bold">
          −√36 = −6
        </text>

        {/* N - Természetes számok halmaza */}
        <ellipse
          cx="240"
          cy="225"
          rx="70"
          ry="60"
          className="fill-purple-100/95 dark:fill-purple-900/60 stroke-purple-600 dark:stroke-purple-400"
          strokeWidth="2.5"
        />
        <text x="240" y="192" textAnchor="middle" className="fill-purple-900 dark:fill-purple-200 font-black text-sm">
          ℕ (Természetes)
        </text>
        <text x="240" y="216" textAnchor="middle" className="fill-purple-950 dark:fill-purple-100 font-mono text-[13px] font-black">
          0 (a 0 természetes!)
        </text>
        <text x="240" y="240" textAnchor="middle" className="fill-purple-950 dark:fill-purple-100 font-mono text-[12px] font-bold">
          1,  5,  17,  100
        </text>
        <text x="240" y="264" textAnchor="middle" className="fill-purple-950 dark:fill-purple-100 font-mono text-[12px] font-bold">
          √16 = 4
        </text>
      </svg>
    </div>
  );
};

/**
 * Műveleti zártsági mátrix grafika (N, Z, Q, Q*, R és +, -, *, /)
 */
export const ClosureMatrixSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 240,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 280 180"
        style={{ width: size, height: (size * 180) / 280 }}
        className="overflow-visible select-none drop-shadow-xs text-xs"
      >
        <rect
          x="4"
          y="4"
          width="272"
          height="172"
          rx="12"
          className="fill-slate-50 dark:fill-slate-900 stroke-slate-200 dark:stroke-slate-700"
          strokeWidth="1.5"
        />
        {/* Fejléc */}
        <text x="40" y="26" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400 font-bold text-[11px]">Halmaz</text>
        <text x="95" y="26" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-black text-[13px]">+</text>
        <text x="140" y="26" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-black text-[13px]">−</text>
        <text x="185" y="26" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-black text-[13px]">·</text>
        <text x="235" y="26" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-black text-[13px]">: (≠0)</text>

        <line x1="8" y1="36" x2="272" y2="36" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1" />

        {/* N sor */}
        <text x="40" y="58" textAnchor="middle" className="fill-purple-600 dark:fill-purple-400 font-black text-xs">ℕ</text>
        <text x="95" y="58" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="140" y="58" textAnchor="middle" className="fill-rose-500 dark:fill-rose-400 font-black text-sm">✗</text>
        <text x="185" y="58" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="235" y="58" textAnchor="middle" className="fill-rose-500 dark:fill-rose-400 font-black text-sm">✗</text>

        {/* Z sor */}
        <text x="40" y="86" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-400 font-black text-xs">ℤ</text>
        <text x="95" y="86" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="140" y="86" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="185" y="86" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="235" y="86" textAnchor="middle" className="fill-rose-500 dark:fill-rose-400 font-black text-sm">✗</text>

        {/* Q sor */}
        <text x="40" y="114" textAnchor="middle" className="fill-cyan-600 dark:fill-cyan-400 font-black text-xs">ℚ</text>
        <text x="95" y="114" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="140" y="114" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="185" y="114" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="235" y="114" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓*</text>

        {/* Q* sor */}
        <text x="40" y="142" textAnchor="middle" className="fill-amber-600 dark:fill-amber-400 font-black text-xs">ℚ*</text>
        <text x="95" y="142" textAnchor="middle" className="fill-rose-500 dark:fill-rose-400 font-black text-sm">✗</text>
        <text x="140" y="142" textAnchor="middle" className="fill-rose-500 dark:fill-rose-400 font-black text-sm">✗</text>
        <text x="185" y="142" textAnchor="middle" className="fill-rose-500 dark:fill-rose-400 font-black text-sm">✗</text>
        <text x="235" y="142" textAnchor="middle" className="fill-rose-500 dark:fill-rose-400 font-black text-sm">✗</text>

        {/* R sor */}
        <text x="40" y="168" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 font-black text-xs">ℝ</text>
        <text x="95" y="168" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="140" y="168" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="185" y="168" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓</text>
        <text x="235" y="168" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-black text-sm">✓*</text>
      </svg>
    </div>
  );
};

/**
 * Műveleti axiómák mérleg illusztráció SVG (Kommutativitás & Asszociativitás)
 */
export const AxiomsVisualSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 140"
        style={{ width: size, height: (size * 140) / 240 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* Bal serpenyő */}
        <rect x="20" y="45" width="80" height="40" rx="8" className="fill-blue-100 dark:fill-blue-900/50 stroke-blue-400" strokeWidth="1.5" />
        <text x="60" y="70" textAnchor="middle" className="fill-blue-800 dark:fill-blue-200 font-mono font-bold text-xs">
          a + b
        </text>

        {/* Egyenlőségjel középen */}
        <circle cx="120" cy="65" r="14" className="fill-indigo-50 dark:fill-indigo-950 stroke-indigo-400" strokeWidth="1.5" />
        <text x="120" y="70" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-300 font-black text-base">
          =
        </text>

        {/* Jobb serpenyő */}
        <rect x="140" y="45" width="80" height="40" rx="8" className="fill-blue-100 dark:fill-blue-900/50 stroke-blue-400" strokeWidth="1.5" />
        <text x="180" y="70" textAnchor="middle" className="fill-blue-800 dark:fill-blue-200 font-mono font-bold text-xs">
          b + a
        </text>

        {/* Címke lent */}
        <text x="120" y="112" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 font-bold text-[11px]">
          Kommutativitás (Felcserélhetőség)
        </text>
      </svg>
    </div>
  );
};

/**
 * Semleges és inverz elemek illusztráció SVG
 */
export const InversesVisualSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 130"
        style={{ width: size, height: (size * 130) / 240 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* Összeadás inverze */}
        <rect x="10" y="15" width="105" height="95" rx="10" className="fill-purple-50 dark:fill-purple-950/40 stroke-purple-300 dark:stroke-purple-700" strokeWidth="1.5" />
        <text x="62" y="36" textAnchor="middle" className="fill-purple-700 dark:fill-purple-300 font-black text-xs">Összeadás (+)</text>
        <text x="62" y="58" textAnchor="middle" className="fill-purple-900 dark:fill-purple-200 font-mono text-[11px]">Semleges: 0</text>
        <text x="62" y="78" textAnchor="middle" className="fill-purple-800 dark:fill-purple-300 font-mono font-bold text-[11px]">a + (-a) = 0</text>
        <text x="62" y="96" textAnchor="middle" className="fill-purple-600 dark:fill-purple-400 text-[9px] font-semibold">Ellentett</text>

        {/* Szorzás inverze */}
        <rect x="125" y="15" width="105" height="95" rx="10" className="fill-cyan-50 dark:fill-cyan-950/40 stroke-cyan-300 dark:stroke-cyan-700" strokeWidth="1.5" />
        <text x="177" y="36" textAnchor="middle" className="fill-cyan-700 dark:fill-cyan-300 font-black text-xs">Szorzás (·)</text>
        <text x="177" y="58" textAnchor="middle" className="fill-cyan-900 dark:fill-cyan-200 font-mono text-[11px]">Semleges: 1</text>
        <text x="177" y="78" textAnchor="middle" className="fill-cyan-800 dark:fill-cyan-300 font-mono font-bold text-[11px]">a · (1/a) = 1</text>
        <text x="177" y="96" textAnchor="middle" className="fill-cyan-600 dark:fill-cyan-400 text-[9px] font-semibold">Reciprok (a ≠ 0)</text>
      </svg>
    </div>
  );
};
