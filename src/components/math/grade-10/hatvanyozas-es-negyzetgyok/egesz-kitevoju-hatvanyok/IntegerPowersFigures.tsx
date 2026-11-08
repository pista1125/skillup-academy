import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

// 1. Permanencia-elv és a Nulla kitevő (a^0 = 1 és 0^0 csapda)
export const PermanenceZeroPowerSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 320"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="permZeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>

        {/* Fejléc */}
        <rect x="120" y="10" width="300" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#818cf8" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          A PERMANENCIA-ELV ÉS A NULLA KITEVŐ
        </text>

        {/* Levezetés 2 úton: Hányados azonosság vs Törtérték */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="135" rx="12" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
          
          <text x="250" y="24" fill="#cbd5e1" fontSize="12" fontWeight="600" textAnchor="middle">
            Hogyan kell értelmeznünk az <tspan fill="#818cf8" fontWeight="bold">a⁰</tspan> hatványt, ha azt akarjuk, hogy a szabályok érvényben maradjanak?
          </text>

          {/* Bal oszlop: Azonosság szerint */}
          <g transform="translate(25, 38)">
            <rect x="0" y="0" width="210" height="78" rx="8" fill="#1e293b" stroke="#4f46e5" strokeWidth="1" />
            <text x="105" y="22" fill="#a5b4fc" fontSize="12" fontWeight="bold" textAnchor="middle">
              1. Azonosság alapján:
            </text>
            <text x="105" y="48" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
              aⁿ : aⁿ = aⁿ⁻ⁿ = <tspan fill="#818cf8" fontWeight="900">a⁰</tspan>
            </text>
            <text x="105" y="68" fill="#94a3b8" fontSize="11" textAnchor="middle">
              (kitevők kivonása)
            </text>
          </g>

          {/* Egyenlőség jelvény középen */}
          <circle cx="250" cy="77" r="14" fill="#312e81" stroke="#6366f1" />
          <text x="250" y="83" fill="#f8fafc" fontSize="18" fontWeight="bold" textAnchor="middle">=</text>

          {/* Jobb oszlop: Tört egyszerűsítése */}
          <g transform="translate(265, 38)">
            <rect x="0" y="0" width="210" height="78" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
            <text x="105" y="22" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
              2. Számolás szerint (a ≠ 0):
            </text>
            <text x="105" y="48" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
              aⁿ / aⁿ = <tspan fill="#34d399" fontWeight="900">1</tspan>
            </text>
            <text x="105" y="68" fill="#94a3b8" fontSize="11" textAnchor="middle">
              (önmagát osztva 1-et ad)
            </text>
          </g>
        </g>

        {/* Eredmény definíciós doboz és 0^0 buktató */}
        <g transform="translate(20, 195)">
          {/* Fő definíció bal oldalon */}
          <rect x="0" y="0" width="275" height="110" rx="10" fill="#042f2e/70" stroke="#14b8a6" strokeWidth="1.5" />
          <text x="137" y="24" fill="#2dd4bf" fontSize="12" fontWeight="bold" textAnchor="middle">
            DEFINÍCIÓ: NULLADIK HATVÁNY
          </text>
          <text x="137" y="62" fill="#f8fafc" fontSize="26" fontWeight="900" textAnchor="middle">
            a⁰ = 1 &nbsp; <tspan fontSize="15" fill="#99f6e4">(ha a ≠ 0)</tspan>
          </text>
          <text x="137" y="92" fill="#cbd5e1" fontSize="12" textAnchor="middle">
            Pl.: 5⁰ = 1; &nbsp; (-7)⁰ = 1; &nbsp; (½)⁰ = 1
          </text>

          {/* 0^0 tiltás jobb oldalon */}
          <rect x="290" y="0" width="210" height="110" rx="10" fill="#450a0a/60" stroke="#ef4444" strokeWidth="1.5" />
          <text x="395" y="24" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">
            ⚠️ MATEMATIKAI TILGALOM
          </text>
          <text x="395" y="60" fill="#f8fafc" fontSize="22" fontWeight="900" textAnchor="middle">
            0⁰ = <tspan fill="#ef4444">NEM ÉRTELMEZETT</tspan>
          </text>
          <text x="395" y="92" fill="#fecaca" fontSize="11" textAnchor="middle">
            0/0 alak miatt ellentmondásra vezet!
          </text>
        </g>
      </svg>
    </div>
  );
};

// 2. A negatív egész kitevő definíciója és a reciprok szabály
export const NegativePowerDefinitionSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 330"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="110" y="10" width="320" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#38bdf8" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          A NEGATÍV EGÉSZ KITEVŐ ÉS A RECIPROK
        </text>

        {/* Fő definíciós kártya: a^-n = 1 / a^n */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="120" rx="12" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
          
          <rect x="150" y="10" width="200" height="22" rx="6" fill="#0369a1/40" />
          <text x="250" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
            ALAPDEFINÍCIÓ (a ≠ 0, n ∈ ℤ⁺)
          </text>

          {/* Nagy képlet */}
          <text x="250" y="70" fill="#f8fafc" fontSize="28" fontWeight="900" textAnchor="middle">
            a⁻ⁿ = <tspan fill="#38bdf8">1</tspan> / <tspan fill="#38bdf8">aⁿ</tspan> = <tspan fill="#f472b6">(1 / a)ⁿ</tspan>
          </text>

          <text x="250" y="102" fill="#cbd5e1" fontSize="13" textAnchor="middle">
            A negatív kitevő az alap <tspan fill="#38bdf8" fontWeight="bold">reciprokára</tspan> való emelést jelenti pozitív kitevővel!
          </text>
        </g>

        {/* Alsó 2 kártya: Törtek negatív hatványa + Példa */}
        <g transform="translate(20, 180)">
          {/* Bal: Törtek reciprok szabálya */}
          <rect x="0" y="0" width="240" height="135" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
          <rect x="20" y="10" width="200" height="22" rx="6" fill="#581c87/50" />
          <text x="120" y="25" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">
            TÖRTEK RECIPROK SZABÁLYA
          </text>
          <text x="120" y="65" fill="#f8fafc" fontSize="20" fontWeight="bold" textAnchor="middle">
            (a / b)⁻ⁿ = <tspan fill="#c084fc">(b / a)ⁿ</tspan>
          </text>
          <rect x="15" y="85" width="210" height="38" rx="6" fill="#1e293b" />
          <text x="120" y="108" fill="#e9d5ff" fontSize="12" fontWeight="bold" textAnchor="middle">
            (⅔)⁻² = (3/2)² = 9/4 = 2,25
          </text>

          {/* Jobb: Számolási minták */}
          <rect x="260" y="0" width="240" height="135" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <rect x="280" y="10" width="200" height="22" rx="6" fill="#064e3b/60" />
          <text x="380" y="25" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
            SZÁMOLÁSI MINTÁK
          </text>
          <g transform="translate(275, 42)" className="text-xs">
            <text x="0" y="18" fill="#f8fafc" fontSize="13">
              • 2⁻³ = 1 / 2³ = <tspan fill="#34d399" fontWeight="bold">1/8 = 0,125</tspan>
            </text>
            <text x="0" y="42" fill="#f8fafc" fontSize="13">
              • 5⁻¹ = 1 / 5¹ = <tspan fill="#34d399" fontWeight="bold">1/5 = 0,2</tspan>
            </text>
            <text x="0" y="66" fill="#f8fafc" fontSize="13">
              • (½)⁻⁴ = 2⁴ = <tspan fill="#34d399" fontWeight="bold">16</tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

// 3. Tízes alapú negatív hatványok, tizedestörtek és nagyságrendek
export const PowersOfTenSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 310"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <rect x="120" y="10" width="300" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#38bdf8" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          A 10 NEGATÍV HATVÁNYAI ÉS TIZEDESTÖRTEK
        </text>

        {/* 4 Lépcsős táblázat a 10 hatványairól */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="142" rx="10" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
          
          {/* Oszlopfejlécek */}
          <rect x="10" y="8" width="480" height="24" rx="6" fill="#1e293b" />
          <text x="50" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Hatvány</text>
          <text x="140" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Törtalak</text>
          <text x="250" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Tizedestört</text>
          <text x="360" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Név</text>
          <text x="445" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Prefixum</text>

          {/* Sor 1: 10^0 */}
          <g transform="translate(10, 36)">
            <text x="40" y="18" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">10⁰</text>
            <text x="130" y="18" fill="#cbd5e1" fontSize="12" textAnchor="middle">1 / 1</text>
            <text x="240" y="18" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1</text>
            <text x="350" y="18" fill="#cbd5e1" fontSize="12" textAnchor="middle">egy egész</text>
            <text x="435" y="18" fill="#64748b" fontSize="12" textAnchor="middle">—</text>
          </g>

          {/* Sor 2: 10^-1 */}
          <g transform="translate(10, 62)">
            <text x="40" y="18" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">10⁻¹</text>
            <text x="130" y="18" fill="#cbd5e1" fontSize="12" textAnchor="middle">1 / 10</text>
            <text x="240" y="18" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">0,1</text>
            <text x="350" y="18" fill="#cbd5e1" fontSize="12" textAnchor="middle">egy tized</text>
            <text x="435" y="18" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">deci- (d)</text>
          </g>

          {/* Sor 3: 10^-2 */}
          <g transform="translate(10, 88)">
            <text x="40" y="18" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">10⁻²</text>
            <text x="130" y="18" fill="#cbd5e1" fontSize="12" textAnchor="middle">1 / 100</text>
            <text x="240" y="18" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">0,01</text>
            <text x="350" y="18" fill="#cbd5e1" fontSize="12" textAnchor="middle">egy század</text>
            <text x="435" y="18" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">centi- (c)</text>
          </g>

          {/* Sor 4: 10^-3 */}
          <g transform="translate(10, 114)">
            <text x="40" y="18" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">10⁻³</text>
            <text x="130" y="18" fill="#cbd5e1" fontSize="12" textAnchor="middle">1 / 1000</text>
            <text x="240" y="18" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">0,001</text>
            <text x="350" y="18" fill="#cbd5e1" fontSize="12" textAnchor="middle">egy ezred</text>
            <text x="435" y="18" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">milli- (m)</text>
          </g>
        </g>

        {/* Alsó magyarázó sáv: Helyiértékes tizedestört felbontás */}
        <g transform="translate(20, 202)">
          <rect x="0" y="0" width="500" height="96" rx="10" fill="#1e1b4b/60" stroke="#6366f1" strokeWidth="1.2" />
          <text x="250" y="24" fill="#a5b4fc" fontSize="12" fontWeight="bold" textAnchor="middle">
            TANKÖNYVI ALAPFELADAT: TIZEDESTÖRT HELYIÉRTÉKES FELBONTÁSA
          </text>
          <rect x="15" y="34" width="470" height="50" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="0.8" />
          <text x="250" y="56" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">
            509,8 = 5 · 10² + 0 · 10¹ + 9 · 10⁰ + 8 · 10⁻¹
          </text>
          <text x="250" y="74" fill="#fbbf24" fontSize="11" textAnchor="middle">
            A tizedesvessző utáni 1. hely: 10⁻¹ (tized), 2. hely: 10⁻² (század), 3. hely: 10⁻³ (ezred)...
          </text>
        </g>
      </svg>
    </div>
  );
};

// 4. A 4 Legfőbb Érettségi Csapda
export const NegativeExponentTrapsSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 330"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <rect x="110" y="10" width="320" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#ef4444" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          A 4 LEGGYAKORIBB ÉRETTSÉGI CSAPDA
        </text>

        {/* Rács: 2x2 doboz */}
        {/* 1. Csapda: Negatív kitevő nem tesz negatívvá */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="240" height="125" rx="10" fill="#450a0a/40" stroke="#ef4444" strokeWidth="1.2" />
          <text x="120" y="24" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">
            1. Negatív kitevő ≠ Negatív szám!
          </text>
          <rect x="15" y="36" width="210" height="36" rx="6" fill="#1e293b" stroke="#ef4444" />
          <text x="120" y="58" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">
            2⁻³ ≠ -8 &nbsp; és &nbsp; 2⁻³ ≠ -6
          </text>
          <rect x="15" y="78" width="210" height="36" rx="6" fill="#064e3b/60" stroke="#10b981" />
          <text x="120" y="100" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            Helyesen: 2⁻³ = 1/2³ = +1/8 &gt; 0
          </text>
        </g>

        {/* 2. Csapda: Zárójel fontossága negatív alapnál */}
        <g transform="translate(280, 48)">
          <rect x="0" y="0" width="240" height="125" rx="10" fill="#450a0a/40" stroke="#ef4444" strokeWidth="1.2" />
          <text x="120" y="24" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">
            2. Zárójel nélküli mínuszjel
          </text>
          <rect x="15" y="36" width="210" height="36" rx="6" fill="#1e293b" stroke="#ef4444" />
          <text x="120" y="58" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
            -2⁻⁴ ≠ 1 / (-2)⁴ = +1/16
          </text>
          <rect x="15" y="78" width="210" height="36" rx="6" fill="#064e3b/60" stroke="#10b981" />
          <text x="120" y="100" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            Helyesen: -2⁻⁴ = -(1/2⁴) = -1/16
          </text>
        </g>

        {/* 3. Csapda: Törtek negatív hatványa */}
        <g transform="translate(20, 185)">
          <rect x="0" y="0" width="240" height="125" rx="10" fill="#450a0a/40" stroke="#ef4444" strokeWidth="1.2" />
          <text x="120" y="24" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">
            3. Tört negatív kitevővel
          </text>
          <rect x="15" y="36" width="210" height="36" rx="6" fill="#1e293b" stroke="#ef4444" />
          <text x="120" y="58" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
            (⅔)⁻¹ ≠ -⅔
          </text>
          <rect x="15" y="78" width="210" height="36" rx="6" fill="#064e3b/60" stroke="#10b981" />
          <text x="120" y="100" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            Helyesen: (⅔)⁻¹ = 3/2 = 1,5
          </text>
        </g>

        {/* 4. Csapda: 0 negatív kitevővel */}
        <g transform="translate(280, 185)">
          <rect x="0" y="0" width="240" height="125" rx="10" fill="#450a0a/40" stroke="#ef4444" strokeWidth="1.2" />
          <text x="120" y="24" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">
            4. Nulla negatív kitevővel
          </text>
          <rect x="15" y="36" width="210" height="36" rx="6" fill="#1e293b" stroke="#ef4444" />
          <text x="120" y="58" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
            0⁻³ ≠ 0 &nbsp; és &nbsp; 0⁻³ ≠ 1
          </text>
          <rect x="15" y="78" width="210" height="36" rx="6" fill="#7f1d1d/80" stroke="#ef4444" />
          <text x="120" y="100" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">
            1/0³ = 1/0 ⟹ NEM ÉRTELMEZETT!
          </text>
        </g>
      </svg>
    </div>
  );
};

