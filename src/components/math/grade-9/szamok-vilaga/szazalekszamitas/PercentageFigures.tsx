import React from 'react';

export interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Százalék Képletháromszög (E, A, p%)
 * Segít megjegyezni a három alapképletet:
 * - E = A · (p / 100)
 * - A = E / (p / 100)
 * - p% = E / A · 100%
 */
export const PercentageTriangleSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 500 280"
        style={size ? { width: size, height: (size * 280) / 500 } : { width: '100%', maxWidth: 500, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="topTriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <linearGradient id="botLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ccfbf1" />
            <stop offset="100%" stopColor="#99f6e4" />
          </linearGradient>
          <linearGradient id="botRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e7ff" />
            <stop offset="100%" stopColor="#c7d2fe" />
          </linearGradient>
        </defs>

        {/* Fő háromszög: Csúcsok: (250, 30), (70, 240), (430, 240) */}
        {/* Felső csúcs: E (Százalékérték) trapéz/háromszög */}
        <polygon
          points="250,30 170,140 330,140"
          fill="url(#topTriGrad)"
          stroke="#d97706"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Alsó bal rész: A (Alap) */}
        <polygon
          points="170,140 70,240 250,240 250,140"
          fill="url(#botLeftGrad)"
          stroke="#0d9488"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Alsó jobb rész: p% (Százalékláb) */}
        <polygon
          points="330,140 250,140 250,240 430,240"
          fill="url(#botRightGrad)"
          stroke="#4f46e5"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Vízszintes osztóvonal (Törtvonal / Osztás jelölése) */}
        <line x1="140" y1="140" x2="360" y2="140" stroke="#b45309" strokeWidth="4" />
        <text x="145" y="132" fill="#b45309" fontWeight="black" fontSize="13">:</text>
        <text x="350" y="132" fill="#b45309" fontWeight="black" fontSize="13">:</text>

        {/* Függőleges osztóvonal alul (Szorzás jelölése) */}
        <line x1="250" y1="140" x2="250" y2="240" stroke="#4338ca" strokeWidth="3" strokeDasharray="5 3" />
        <circle cx="250" cy="190" r="4" fill="#4338ca" />

        {/* Szimbólumok és címkék */}
        {/* Fent: E */}
        <text x="250" y="90" textAnchor="middle" fill="#92400e" fontWeight="black" fontSize="28">E</text>
        <text x="250" y="112" textAnchor="middle" fill="#b45309" fontWeight="bold" fontSize="11">
          Százalékérték (rész)
        </text>

        {/* Lent balra: A */}
        <text x="165" y="195" textAnchor="middle" fill="#115e59" fontWeight="black" fontSize="26">A</text>
        <text x="165" y="216" textAnchor="middle" fill="#0f766e" fontWeight="bold" fontSize="11">
          Alap (100% egész)
        </text>

        {/* Lent jobbra: p% */}
        <text x="335" y="195" textAnchor="middle" fill="#3730a3" fontWeight="black" fontSize="24">p %</text>
        <text x="335" y="216" textAnchor="middle" fill="#4338ca" fontWeight="bold" fontSize="11">
          Százalékláb (p / 100)
        </text>

        {/* Képletek magyarázata alul */}
        <rect x="50" y="250" width="400" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <text x="250" y="266" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="11">
          E = A · (p/100) &nbsp;|&nbsp; A = E / (p/100) &nbsp;|&nbsp; p% = (E / A) · 100%
        </text>
      </svg>
    </div>
  );
};

/**
 * 2. Százalékos Változások és Szorzótényezők
 * - Alap (100%): 1,00
 * - +20% emelés / ÁFA: 1,20
 * - -15% leárazás: 0,85
 */
export const PercentageMultiplierBarSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 250"
        style={size ? { width: size, height: (size * 250) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="baseBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="plusBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="minusBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
        </defs>

        {/* 1. SÁV: EREDETI ALAP (100%) */}
        <g transform="translate(30, 25)">
          <text x="0" y="-8" fill="#1e293b" fontWeight="black" fontSize="12">
            1. Eredeti érték (100% Alap):
          </text>
          {/* 360 px széles = 100% */}
          <rect x="0" y="0" width="360" height="34" rx="8" fill="url(#baseBarGrad)" />
          <text x="180" y="22" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="13">
            Alap = 100% &nbsp; (szorzó: · 1,00)
          </text>
        </g>

        {/* 2. SÁV: +20% ÁREMELÉS / NÖVEKEDÉS (120%) */}
        <g transform="translate(30, 95)">
          <text x="0" y="-8" fill="#047857" fontWeight="black" fontSize="12">
            2. +20%-os növekedés (Új ár = 120%):
          </text>
          {/* Eredeti rész 360px */}
          <rect x="0" y="0" width="360" height="34" rx="8" fill="url(#baseBarGrad)" opacity="0.85" />
          <text x="180" y="22" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
            100%
          </text>
          {/* +20% kiegészítés: 72px */}
          <rect x="364" y="0" width="72" height="34" rx="8" fill="url(#plusBarGrad)" />
          <text x="400" y="22" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="11">
            +20%
          </text>

          {/* Magyarázat jobb oldalon */}
          <rect x="445" y="2" width="70" height="30" rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1" />
          <text x="480" y="21" textAnchor="middle" fill="#065f46" fontWeight="black" fontSize="12">
            · 1,20
          </text>
        </g>

        {/* 3. SÁV: -15% LEÁRAZÁS / CSÖKKENÉS (85%) */}
        <g transform="translate(30, 165)">
          <text x="0" y="-8" fill="#be123c" fontWeight="black" fontSize="12">
            3. -15%-os csökkenés (Akciós ár = 85%):
          </text>
          {/* Megmaradó rész: 360 * 0.85 = 306px */}
          <rect x="0" y="0" width="306" height="34" rx="8" fill="url(#baseBarGrad)" opacity="0.85" />
          <text x="153" y="22" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="13">
            Megmarad: 85%
          </text>
          {/* Levont -15% szaggatott sáv: 54px */}
          <rect x="308" y="0" width="52" height="34" rx="8" fill="url(#minusBarGrad)" opacity="0.4" stroke="#f43f5e" strokeDasharray="3 3" />
          <text x="334" y="22" textAnchor="middle" fill="#9f1239" fontWeight="bold" fontSize="10">
            -15%
          </text>

          {/* Magyarázat jobb oldalon */}
          <rect x="445" y="2" width="70" height="30" rx="6" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1" />
          <text x="480" y="21" textAnchor="middle" fill="#9f1239" fontWeight="black" fontSize="12">
            · 0,85
          </text>
        </g>

        {/* Gyors összefoglaló alul */}
        <rect x="30" y="218" width="460" height="24" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="260" y="234" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="11">
          💡 Aranyszabály: Növelésnél (1 + p/100)-zal, csökkentésnél (1 - p/100)-zal szorzunk közvetlenül!
        </text>
      </svg>
    </div>
  );
};

/**
 * 3. Kördiagram és Százalékos Megoszlás (360° = 100%)
 * Szektorok:
 * - 50% = 180°
 * - 25% = 90° (MAGYAR SZABVÁNYÚ DERÉKSZÖG JELÖLÉSSEL: negyedkörív + belső pont!)
 * - 15% = 54°
 * - 10% = 36°
 */
export const PieChartPercentageSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 500 270"
        style={size ? { width: size, height: (size * 270) / 500 } : { width: '100%', maxWidth: 500, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        {/* Kör középpontja: cx=150, cy=135, r=100 */}
        {/* 1. Szektor: 50% (bal félkör: 90° -tól 270°-ig) */}
        {/* d: M 150 35 A 100 100 0 0 0 150 235 Z */}
        <path
          d="M 150 35 A 100 100 0 0 0 150 235 Z"
          fill="#3b82f6"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text x="100" y="140" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="16">
          50%
        </text>
        <text x="100" y="156" textAnchor="middle" fill="#dbeafe" fontWeight="bold" fontSize="11">
          (180°)
        </text>

        {/* 2. Szektor: 25% (jobb felső negyedkör: 270°-tól 0°-ig)
            d: M 150 135 L 150 35 A 100 100 0 0 1 250 135 Z */}
        <path
          d="M 150 135 L 150 35 A 100 100 0 0 1 250 135 Z"
          fill="#10b981"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text x="195" y="90" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="14">
          25%
        </text>
        <text x="195" y="105" textAnchor="middle" fill="#d1fae5" fontWeight="bold" fontSize="10">
          (90°)
        </text>

        {/* DERÉKSZÖG JELÖLÉSE A 25%-OS SZEKTORBAN MAGYAR SZABVÁNY SZERINT (negyedkörív + belső pont)
            Csúcs: (150, 135).
            Felfelé mutató él: (150, 35) irány.
            Jobbra mutató él: (250, 135) irány.
            Sugár: 22px.
            Kezdőpont: (150, 135 - 22) = (150, 113).
            Végpont: (150 + 22, 135) = (172, 135).
            Ív: M 150 113 A 22 22 0 0 1 172 135
            Pont: 45°-nál, cx = 150 + 22·0.5 = 161, cy = 135 - 22·0.5 = 124 */}
        <path d="M 150 113 A 22 22 0 0 1 172 135" fill="none" stroke="#047857" strokeWidth="2" />
        <circle cx="162" cy="123" r="2.2" fill="#047857" />

        {/* 3. Szektor: 15% (54°: 0°-tól 54°-ig)
            cos(54°)=0.5878 -> x=150+58.78=208.78
            sin(54°)=0.8090 -> y=135+80.9=215.9
            d: M 150 135 L 250 135 A 100 100 0 0 1 208.8 215.9 Z */}
        <path
          d="M 150 135 L 250 135 A 100 100 0 0 1 208.8 215.9 Z"
          fill="#f59e0b"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text x="210" y="170" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="12">
          15%
        </text>

        {/* 4. Szektor: 10% (36°: 54°-tól 90°-ig)
            d: M 150 135 L 208.8 215.9 A 100 100 0 0 1 150 235 Z */}
        <path
          d="M 150 135 L 208.8 215.9 A 100 100 0 0 1 150 235 Z"
          fill="#8b5cf6"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text x="175" y="215" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="11">
          10%
        </text>

        {/* Jobb oldali Jelmagyarázat és Szögátszámítási Kártya */}
        <g transform="translate(290, 35)">
          <rect x="0" y="0" width="195" height="195" rx="14" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          <text x="97" y="26" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="13">
            Szögátszámítás (360°)
          </text>
          <line x1="15" y1="38" x2="180" y2="38" stroke="#f1f5f9" strokeWidth="1.5" />

          {/* 50% */}
          <rect x="15" y="50" width="12" height="12" rx="3" fill="#3b82f6" />
          <text x="35" y="61" fill="#334155" fontSize="11" fontWeight="bold">50% = 360° · 0,50 = 180°</text>

          {/* 25% */}
          <rect x="15" y="78" width="12" height="12" rx="3" fill="#10b981" />
          <text x="35" y="89" fill="#334155" fontSize="11" fontWeight="bold">25% = 360° · 0,25 = 90°</text>
          <text x="35" y="103" fill="#059669" fontSize="9" fontWeight="bold">(derékszög ív + pont)</text>

          {/* 15% */}
          <rect x="15" y="120" width="12" height="12" rx="3" fill="#f59e0b" />
          <text x="35" y="131" fill="#334155" fontSize="11" fontWeight="bold">15% = 360° · 0,15 = 54°</text>

          {/* 10% */}
          <rect x="15" y="148" width="12" height="12" rx="3" fill="#8b5cf6" />
          <text x="35" y="159" fill="#334155" fontSize="11" fontWeight="bold">10% = 360° · 0,10 = 36°</text>

          <line x1="15" y1="172" x2="180" y2="172" stroke="#f1f5f9" strokeWidth="1" />
          <text x="97" y="186" textAnchor="middle" fill="#0f172a" fontWeight="black" fontSize="11">
            Összesen: 100% = 360°
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Egymás Utáni Százalékos Változások Csapdája
 * Példa: 1000 Ft +20% -> 1200 Ft, majd -20% -> 960 Ft (nem 1000 Ft!).
 */
export const SuccessiveChangesSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 220"
        style={size ? { width: size, height: (size * 220) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" />
          </marker>
          <marker id="arrowGreen" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
          </marker>
        </defs>

        {/* 1. Állomás: Kezdőár: 1000 Ft */}
        <g transform="translate(30, 60)">
          <rect x="0" y="0" width="115" height="85" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
          <text x="57" y="24" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="11">Kezdőár</text>
          <text x="57" y="52" textAnchor="middle" fill="#1e3a8a" fontWeight="black" fontSize="18">1000 Ft</text>
          <text x="57" y="70" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="10">Alap: 100%</text>
        </g>

        {/* 1. Nyíl: +20% növelés */}
        <path d="M 155 102 L 205 102" fill="none" stroke="#059669" strokeWidth="3" markerEnd="url(#arrowGreen)" />
        <rect x="150" y="65" width="60" height="22" rx="5" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1" />
        <text x="180" y="80" textAnchor="middle" fill="#047857" fontWeight="black" fontSize="11">+20%</text>
        <text x="180" y="118" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="9">(· 1,20)</text>

        {/* 2. Állomás: Megnövelt ár: 1200 Ft */}
        <g transform="translate(215, 60)">
          <rect x="0" y="0" width="115" height="85" rx="12" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="2" />
          <text x="57" y="24" textAnchor="middle" fill="#047857" fontWeight="bold" fontSize="11">Emelt ár</text>
          <text x="57" y="52" textAnchor="middle" fill="#064e3b" fontWeight="black" fontSize="18">1200 Ft</text>
          <text x="57" y="70" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="10">ÚJ ALAP (100%)</text>
        </g>

        {/* 2. Nyíl: -20% leárazás */}
        <path d="M 340 102 L 390 102" fill="none" stroke="#e11d48" strokeWidth="3" markerEnd="url(#arrowRed)" />
        <rect x="335" y="65" width="60" height="22" rx="5" fill="#fff1f2" stroke="#fda4af" strokeWidth="1" />
        <text x="365" y="80" textAnchor="middle" fill="#be123c" fontWeight="black" fontSize="11">-20%</text>
        <text x="365" y="118" textAnchor="middle" fill="#e11d48" fontWeight="bold" fontSize="9">(· 0,80)</text>

        {/* 3. Állomás: Végső ár: 960 Ft (nem 1000 Ft!) */}
        <g transform="translate(400, 60)">
          <rect x="0" y="0" width="115" height="85" rx="12" fill="#fff1f2" stroke="#fda4af" strokeWidth="2" />
          <text x="57" y="24" textAnchor="middle" fill="#be123c" fontWeight="bold" fontSize="11">Végső ár</text>
          <text x="57" y="52" textAnchor="middle" fill="#881337" fontWeight="black" fontSize="18">960 Ft</text>
          <text x="57" y="70" textAnchor="middle" fill="#e11d48" fontWeight="bold" fontSize="10">4%-os veszteség!</text>
        </g>

        {/* Magyarázat alul */}
        <rect x="30" y="165" width="485" height="36" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <text x="272" y="182" textAnchor="middle" fill="#0f172a" fontWeight="black" fontSize="11">
          Miért nem 1000 Ft? Mert 1000 · 1,20 · 0,80 = 1000 · 0,96 = 960 Ft!
        </text>
        <text x="272" y="195" textAnchor="middle" fill="#64748b" fontSize="10">
          A -20%-ot már a MEGNÖVELT 1200 Ft-ból vonjuk le (240 Ft engedmény), nem az eredeti 1000 Ft-ból!
        </text>
      </svg>
    </div>
  );
};
