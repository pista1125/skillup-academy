import React from 'react';

/**
 * 1. Tömeg mértékegységek átváltási lépcsője (t -> q -> kg -> dkg -> g -> mg)
 */
export const MassConversionLadderSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
          Tömegmértékek átváltási lánca
        </span>
      </div>
      <div className="w-full max-w-[720px] overflow-x-auto py-1">
        <svg viewBox="0 0 700 180" className="w-full h-auto min-w-[580px] drop-shadow-xs">
          <defs>
            <marker id="massArrowRight" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#059669" />
            </marker>
            <marker id="massArrowLeft" markerWidth="7" markerHeight="7" refX="2" refY="3.5" orient="auto">
              <polygon points="7 0, 0 3.5, 7 7" fill="#dc2626" />
            </marker>
          </defs>

          {/* Egységek dobozai */}
          <g className="font-bold text-xs">
            {/* t (tonna) */}
            <rect x="20" y="65" width="80" height="48" rx="10" fill="#064e3b" />
            <text x="60" y="93" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">t</text>
            <text x="60" y="106" fill="#a7f3d0" textAnchor="middle" fontSize="9">tonna</text>

            {/* q (mázsa) */}
            <rect x="135" y="65" width="80" height="48" rx="10" fill="#047857" />
            <text x="175" y="93" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">q</text>
            <text x="175" y="106" fill="#a7f3d0" textAnchor="middle" fontSize="9">mázsa</text>

            {/* kg (kilogramm) */}
            <rect x="250" y="65" width="90" height="48" rx="10" fill="#059669" />
            <text x="295" y="93" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">kg</text>
            <text x="295" y="106" fill="#e0e7ff" textAnchor="middle" fontSize="9">alapegység</text>

            {/* dkg (dekagramm) */}
            <rect x="375" y="65" width="80" height="48" rx="10" fill="#10b981" />
            <text x="415" y="93" fill="#064e3b" textAnchor="middle" fontSize="15" fontWeight="bold">dkg</text>
            <text x="415" y="106" fill="#064e3b" textAnchor="middle" fontSize="9">deka</text>

            {/* g (gramm) */}
            <rect x="490" y="65" width="80" height="48" rx="10" fill="#34d399" />
            <text x="530" y="93" fill="#064e3b" textAnchor="middle" fontSize="16" fontWeight="bold">g</text>
            <text x="530" y="106" fill="#064e3b" textAnchor="middle" fontSize="9">gramm</text>

            {/* mg (milligramm) */}
            <rect x="605" y="65" width="75" height="48" rx="10" fill="#6ee7b7" />
            <text x="642" y="93" fill="#064e3b" textAnchor="middle" fontSize="15" fontWeight="bold">mg</text>
            <text x="642" y="106" fill="#064e3b" textAnchor="middle" fontSize="9">milligramm</text>
          </g>

          {/* Felső nyilak: Szorzás (jobbra, kisebb felé) */}
          {/* t -> q (x10) */}
          <path d="M 100 60 Q 117 35 132 60" fill="none" stroke="#059669" strokeWidth="2.2" markerEnd="url(#massArrowRight)" />
          <text x="117" y="38" fill="#059669" fontSize="11" fontWeight="bold" textAnchor="middle">· 10</text>

          {/* q -> kg (x100) */}
          <path d="M 215 60 Q 232 35 247 60" fill="none" stroke="#059669" strokeWidth="2.2" markerEnd="url(#massArrowRight)" />
          <text x="232" y="38" fill="#059669" fontSize="11" fontWeight="bold" textAnchor="middle">· 100</text>

          {/* kg -> dkg (x100) */}
          <path d="M 340 60 Q 357 35 372 60" fill="none" stroke="#059669" strokeWidth="2.2" markerEnd="url(#massArrowRight)" />
          <text x="357" y="38" fill="#059669" fontSize="11" fontWeight="bold" textAnchor="middle">· 100</text>

          {/* dkg -> g (x10) */}
          <path d="M 455 60 Q 472 35 487 60" fill="none" stroke="#059669" strokeWidth="2.2" markerEnd="url(#massArrowRight)" />
          <text x="472" y="38" fill="#059669" fontSize="11" fontWeight="bold" textAnchor="middle">· 10</text>

          {/* g -> mg (x1000) */}
          <path d="M 570 60 Q 587 35 602 60" fill="none" stroke="#059669" strokeWidth="2.2" markerEnd="url(#massArrowRight)" />
          <text x="587" y="36" fill="#059669" fontSize="11" fontWeight="bold" textAnchor="middle">· 1000</text>

          {/* Alsó nyilak: Osztás (balra, nagyobb felé) */}
          {/* mg -> g (/1000) */}
          <path d="M 605 120 Q 587 145 573 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#massArrowLeft)" />
          <text x="587" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 1000</text>

          {/* g -> dkg (/10) */}
          <path d="M 490 120 Q 472 145 458 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#massArrowLeft)" />
          <text x="472" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 10</text>

          {/* dkg -> kg (/100) */}
          <path d="M 375 120 Q 357 145 343 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#massArrowLeft)" />
          <text x="357" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 100</text>

          {/* kg -> q (/100) */}
          <path d="M 250 120 Q 232 145 218 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#massArrowLeft)" />
          <text x="232" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 100</text>

          {/* q -> t (/10) */}
          <path d="M 135 120 Q 117 145 103 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#massArrowLeft)" />
          <text x="117" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 10</text>
        </svg>
      </div>

      <div className="flex flex-wrap justify-between items-center w-full max-w-[700px] text-[11px] text-slate-500 dark:text-slate-400 px-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
          Kiemelt közvetlen kapcsolatok: 1 t = 1000 kg &nbsp;|&nbsp; 1 kg = 1000 g &nbsp;|&nbsp; 1 q = 100 kg
        </span>
        <span className="text-slate-600 dark:text-slate-400 font-semibold">
          1 kg = 100 dkg (1 dkg = 10 g)
        </span>
      </div>
    </div>
  );
};

/**
 * 2. Idő mértékegységek és tizedes óra szemléltető óralap (1,5 h = 1 h 30 min)
 */
export const TimeConversionClockSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
          Az idő mértékegységei (60-as alap) és a tizedes óra csapdája
        </span>
      </div>

      <div className="w-full max-w-[680px]">
        <svg viewBox="0 0 660 220" className="w-full h-auto drop-shadow-xs">
          {/* Bal: Átváltási lánc (nap -> h -> min -> s) */}
          <g transform="translate(15, 20)">
            <rect x="0" y="0" width="310" height="180" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
            <text x="15" y="24" fill="#92400e" fontSize="12" fontWeight="bold">
              Idő mértékegységek lánca:
            </text>

            {/* nap -> h -> min -> s dobozok */}
            <g transform="translate(15, 45)">
              {/* nap */}
              <rect x="0" y="25" width="55" height="40" rx="8" fill="#d97706" />
              <text x="27" y="49" fill="#ffffff" textAnchor="middle" fontSize="13" fontWeight="bold">nap</text>

              {/* óra (h) */}
              <rect x="80" y="25" width="55" height="40" rx="8" fill="#f59e0b" />
              <text x="107" y="49" fill="#ffffff" textAnchor="middle" fontSize="13" fontWeight="bold">h (óra)</text>

              {/* perc (min) */}
              <rect x="160" y="25" width="55" height="40" rx="8" fill="#fbbf24" />
              <text x="187" y="49" fill="#78350f" textAnchor="middle" fontSize="12" fontWeight="bold">min</text>

              {/* másodperc (s) */}
              <rect x="235" y="25" width="45" height="40" rx="8" fill="#fef08a" />
              <text x="257" y="49" fill="#78350f" textAnchor="middle" fontSize="13" fontWeight="bold">s</text>

              {/* Felső nyilak (szorzás) */}
              <path d="M 55 22 Q 67 8 78 22" fill="none" stroke="#d97706" strokeWidth="1.8" />
              <text x="67" y="10" fill="#b45309" fontSize="9" fontWeight="bold" textAnchor="middle">· 24</text>

              <path d="M 135 22 Q 147 8 158 22" fill="none" stroke="#d97706" strokeWidth="1.8" />
              <text x="147" y="10" fill="#b45309" fontSize="9" fontWeight="bold" textAnchor="middle">· 60</text>

              <path d="M 215 22 Q 225 8 233 22" fill="none" stroke="#d97706" strokeWidth="1.8" />
              <text x="225" y="10" fill="#b45309" fontSize="9" fontWeight="bold" textAnchor="middle">· 60</text>

              {/* Alsó nyilak (osztás) */}
              <path d="M 235 68 Q 225 82 217 68" fill="none" stroke="#dc2626" strokeWidth="1.8" />
              <text x="225" y="88" fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="middle">: 60</text>

              <path d="M 160 68 Q 147 82 137 68" fill="none" stroke="#dc2626" strokeWidth="1.8" />
              <text x="147" y="88" fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="middle">: 60</text>

              <path d="M 80 68 Q 67 82 57 68" fill="none" stroke="#dc2626" strokeWidth="1.8" />
              <text x="67" y="88" fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="middle">: 24</text>
            </g>

            <g transform="translate(15, 145)">
              <text x="0" y="12" fill="#78350f" fontSize="10" fontWeight="bold">Fontos:</text>
              <text x="45" y="12" fill="#451a03" fontSize="10">1 óra = 3600 másodperc (60 · 60)</text>
            </g>
          </g>

          {/* Jobb: Analóg óralap tizedes óra szemléltetéssel */}
          <g transform="translate(345, 20)">
            <rect x="0" y="0" width="300" height="180" rx="12" fill="#fef2f2" stroke="#fecaca" strokeWidth="1.5" />
            <text x="15" y="24" fill="#991b1b" fontSize="11" fontWeight="black">
              VIGYÁZZ! 1,5 h ≠ 1 h 50 min!
            </text>

            {/* Óralap kör (sugár 45px) */}
            <g transform="translate(70, 95)">
              <circle cx="0" cy="0" r="45" fill="#ffffff" stroke="#ef4444" strokeWidth="2.5" />

              {/* Fél óra szektor kifestve pirossal (0-tól 30 percig) */}
              <path d="M 0 -45 A 45 45 0 0 1 0 45 L 0 0 Z" fill="#fca5a5" fillOpacity="0.6" />

              {/* Mutatók */}
              <line x1="0" y1="0" x2="0" y2="38" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="0" y1="0" x2="0" y2="-30" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="0" r="4" fill="#1e293b" />

              {/* Számok */}
              <text x="0" y="-33" fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">12</text>
              <text x="33" y="3" fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">3</text>
              <text x="0" y="38" fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">6</text>
              <text x="-33" y="3" fill="#64748b" fontSize="8" fontWeight="bold" textAnchor="middle">9</text>

              <text x="0" y="58" fill="#991b1b" fontSize="9" fontWeight="bold" textAnchor="middle">
                0,5 h = fél óra (30 min)
              </text>
            </g>

            {/* Tizedes óra átváltási táblázat */}
            <g transform="translate(140, 42)">
              <rect x="0" y="0" width="145" height="115" rx="6" fill="#ffffff" stroke="#fca5a5" />
              <text x="10" y="20" fill="#991b1b" fontSize="10" fontWeight="bold">Tizedes részek:</text>
              <text x="10" y="38" fill="#7f1d1d" fontSize="10">0,5 h = 0,5 · 60 = <tspan fontWeight="bold">30 min</tspan></text>
              <text x="10" y="56" fill="#7f1d1d" fontSize="10">0,25 h = 1/4 h = <tspan fontWeight="bold">15 min</tspan></text>
              <text x="10" y="74" fill="#7f1d1d" fontSize="10">0,75 h = 3/4 h = <tspan fontWeight="bold">45 min</tspan></text>
              <text x="10" y="92" fill="#7f1d1d" fontSize="10">0,1 h = 1/10 h = <tspan fontWeight="bold">6 min</tspan></text>
              <line x1="8" y1="98" x2="137" y2="98" stroke="#fecaca" />
              <text x="10" y="110" fill="#15803d" fontSize="9" fontWeight="bold">1,5 h = 1 h 30 perc!</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
