import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szemléltető ábra: Táblázat alapszerkezete (sorok, oszlopok, cellák, fejléc)
 */
export const TableStructureSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 320 200"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="highlightRow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
      </defs>

      {/* Külső keret */}
      <rect x="20" y="20" width="280" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />

      {/* Fejléc háttér */}
      <path d="M 20 28 Q 20 20 28 20 L 292 20 Q 300 20 300 28 L 300 55 L 20 55 Z" fill="url(#headerGrad)" />

      {/* Kiemelt sor (2. adatsor) */}
      <rect x="20" y="90" width="280" height="35" fill="url(#highlightRow)" />

      {/* Kiemelt cella (2. sor, 2. oszlop) */}
      <rect x="110" y="90" width="95" height="35" fill="#fde047" fillOpacity="0.45" stroke="#eab308" strokeWidth="2" rx="4" />

      {/* Vízszintes vonalak */}
      <line x1="20" y1="55" x2="300" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="20" y1="90" x2="300" y2="90" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="20" y1="125" x2="300" y2="125" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="20" y1="160" x2="300" y2="160" stroke="#cbd5e1" strokeWidth="1" />

      {/* Függőleges vonalak */}
      <line x1="110" y1="20" x2="110" y2="170" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="205" y1="20" x2="205" y2="170" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Fejléc szövegek */}
      <text x="65" y="42" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">ID (x)</text>
      <text x="157" y="42" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Mennyiség</text>
      <text x="252" y="42" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Érték (y)</text>

      {/* Cella szövegek */}
      <text x="65" y="77" fill="#475569" fontSize="11" textAnchor="middle">1. mérés</text>
      <text x="157" y="77" fill="#475569" fontSize="11" textAnchor="middle">14 db</text>
      <text x="252" y="77" fill="#475569" fontSize="11" textAnchor="middle">4 200 Ft</text>

      <text x="65" y="112" fill="#1e3a8a" fontSize="11" fontWeight="bold" textAnchor="middle">2. mérés</text>
      <text x="157" y="112" fill="#854d0e" fontSize="11" fontWeight="black" textAnchor="middle">28 db</text>
      <text x="252" y="112" fill="#1e3a8a" fontSize="11" fontWeight="bold" textAnchor="middle">8 400 Ft</text>

      <text x="65" y="147" fill="#475569" fontSize="11" textAnchor="middle">3. mérés</text>
      <text x="157" y="147" fill="#475569" fontSize="11" textAnchor="middle">42 db</text>
      <text x="252" y="147" fill="#475569" fontSize="11" textAnchor="middle">12 600 Ft</text>

      {/* Címkék és nyilak */}
      <text x="157" y="190" fill="#2563eb" fontSize="11" fontWeight="bold" textAnchor="middle">Cella: (2. sor, 2. oszlop) = 28 db</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Kontingencia-táblázat (Kereszttábla peremösszegekkel)
 */
export const ContingencyTableSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 340 240"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="310" height="200" rx="8" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />

      {/* Fejléc és peremösszegek hátterei */}
      <rect x="15" y="15" width="310" height="40" fill="#6366f1" rx="8" />
      <rect x="15" y="45" width="310" height="10" fill="#6366f1" />
      
      {/* Sorfejlécek háttér */}
      <rect x="15" y="55" width="90" height="120" fill="#f8fafc" />

      {/* Oszlopösszeg háttér */}
      <rect x="15" y="175" width="310" height="40" fill="#e0e7ff" rx="8" />
      <rect x="15" y="175" width="310" height="10" fill="#e0e7ff" />

      {/* Sorösszeg oszlop háttér */}
      <rect x="250" y="15" width="75" height="200" fill="#e0e7ff" rx="8" />
      <rect x="250" y="15" width="10" height="200" fill="#e0e7ff" />

      {/* Teljes minta cella kiemelése (N) */}
      <rect x="250" y="175" width="75" height="40" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2" rx="4" />

      {/* Rácsvonalak */}
      <line x1="15" y1="55" x2="325" y2="55" stroke="#64748b" strokeWidth="1.5" />
      <line x1="15" y1="115" x2="325" y2="115" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="15" y1="175" x2="325" y2="175" stroke="#6366f1" strokeWidth="2" />

      <line x1="105" y1="15" x2="105" y2="215" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="175" y1="15" x2="175" y2="215" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="250" y1="15" x2="250" y2="215" stroke="#6366f1" strokeWidth="2" />

      {/* Szövegek */}
      <text x="60" y="38" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Nem / Sport</text>
      <text x="140" y="38" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Foci</text>
      <text x="212" y="38" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Úszás</text>
      <text x="287" y="38" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Összesen</text>

      {/* 1. sor: Fiú */}
      <text x="60" y="90" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">Fiú</text>
      <text x="140" y="90" fill="#0f172a" fontSize="13" textAnchor="middle">18</text>
      <text x="212" y="90" fill="#0f172a" fontSize="13" textAnchor="middle">12</text>
      <text x="287" y="90" fill="#4338ca" fontSize="13" fontWeight="bold" textAnchor="middle">30</text>

      {/* 2. sor: Lány */}
      <text x="60" y="150" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">Lány</text>
      <text x="140" y="150" fill="#0f172a" fontSize="13" textAnchor="middle">6</text>
      <text x="212" y="150" fill="#0f172a" fontSize="13" textAnchor="middle">14</text>
      <text x="287" y="150" fill="#4338ca" fontSize="13" fontWeight="bold" textAnchor="middle">20</text>

      {/* Összeg sor */}
      <text x="60" y="200" fill="#4338ca" fontSize="12" fontWeight="bold" textAnchor="middle">Összesen</text>
      <text x="140" y="200" fill="#4338ca" fontSize="13" fontWeight="bold" textAnchor="middle">24</text>
      <text x="212" y="200" fill="#4338ca" fontSize="13" fontWeight="bold" textAnchor="middle">26</text>
      <text x="287" y="200" fill="#312e81" fontSize="14" fontWeight="black" textAnchor="middle">N = 50</text>

      {/* Alsó megjegyzés */}
      <text x="170" y="232" fill="#64748b" fontSize="10" textAnchor="middle">Sorösszegek = Oszlopösszegek = 50 fő</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Hozzárendelés és Függvény-értéktáblázat x -> y
 */
export const FunctionTableSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 320 180"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="20" y="20" width="280" height="130" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />

      {/* Sor háttér x és y */}
      <rect x="20" y="20" width="70" height="65" fill="#f0f9ff" rx="8" />
      <rect x="20" y="85" width="70" height="65" fill="#e0f2fe" rx="8" />
      <rect x="80" y="20" width="10" height="130" fill="#f0f9ff" />

      {/* Vízszintes elválasztó */}
      <line x1="20" y1="85" x2="300" y2="85" stroke="#0284c7" strokeWidth="2" />

      {/* Függőleges vonalak az oszlopokhoz */}
      <line x1="90" y1="20" x2="90" y2="150" stroke="#38bdf8" strokeWidth="2" />
      <line x1="145" y1="20" x2="145" y2="150" stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1="200" y1="20" x2="200" y2="150" stroke="#e2e8f0" strokeWidth="1.5" />
      <line x1="250" y1="20" x2="250" y2="150" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Fejlécek */}
      <text x="55" y="58" fill="#0369a1" fontSize="15" fontWeight="black" textAnchor="middle">x</text>
      <text x="55" y="123" fill="#0369a1" fontSize="15" fontWeight="black" textAnchor="middle">f(x)</text>

      {/* x értékek */}
      <text x="117" y="58" fill="#334155" fontSize="13" fontWeight="bold" textAnchor="middle">-2</text>
      <text x="172" y="58" fill="#334155" fontSize="13" fontWeight="bold" textAnchor="middle">0</text>
      <text x="225" y="58" fill="#334155" fontSize="13" fontWeight="bold" textAnchor="middle">1</text>
      <text x="275" y="58" fill="#334155" fontSize="13" fontWeight="bold" textAnchor="middle">3</text>

      {/* y = 2x + 1 értékek */}
      <text x="117" y="123" fill="#0284c7" fontSize="14" fontWeight="black" textAnchor="middle">-3</text>
      <text x="172" y="123" fill="#0284c7" fontSize="14" fontWeight="black" textAnchor="middle">1</text>
      <text x="225" y="123" fill="#0284c7" fontSize="14" fontWeight="black" textAnchor="middle">3</text>
      <text x="275" y="123" fill="#0284c7" fontSize="14" fontWeight="black" textAnchor="middle">7</text>

      {/* Szabály felirat */}
      <text x="160" y="168" fill="#0284c7" fontSize="11" fontWeight="bold" textAnchor="middle">Szabály: f(x) = 2x + 1 → Pontok: (-2; -3), (0; 1), (1; 3), (3; 7)</text>
    </svg>
  );
};

