import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Geometriai alapelemek: pont, egyenes, félegyenes, szakasz
export const GeometricPrimitivesSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.52}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <defs>
        <marker id="arrowHead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
        </marker>
        <marker id="arrowHeadGreen" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
        </marker>
      </defs>

      <rect x="5" y="5" width="370" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Egyenes (mindkét irányban végtelen) */}
      <g transform="translate(10, 25)">
        <line x1="20" y1="20" x2="160" y2="20" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="170" y="24" fontSize="13" fontStyle="italic" fontWeight="bold" fill="#2563eb">e</text>
        <text x="90" y="40" fontSize="11" textAnchor="middle" fill="#64748b" fontWeight="600">egyenes (e)</text>
      </g>

      {/* 2. Félegyenes (A kezdőpont, végtelen felé nyíl) */}
      <g transform="translate(195, 25)">
        <line x1="20" y1="20" x2="150" y2="20" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowHeadGreen)" />
        <circle cx="20" cy="20" r="4" fill="#059669" />
        <text x="16" y="10" fontSize="12" fontWeight="bold" fill="#047857">A</text>
        <text x="158" y="24" fontSize="13" fontStyle="italic" fontWeight="bold" fill="#059669">f</text>
        <text x="85" y="40" fontSize="11" textAnchor="middle" fill="#64748b" fontWeight="600">félegyenes (f)</text>
      </g>

      {/* 3. Szakasz végpontokkal és felezőponttal */}
      <g transform="translate(10, 105)">
        <line x1="25" y1="25" x2="155" y2="25" stroke="#8b5cf6" strokeWidth="3" />
        <circle cx="25" cy="25" r="4.5" fill="#7c3aed" />
        <circle cx="155" cy="25" r="4.5" fill="#7c3aed" />
        <circle cx="90" cy="25" r="3.5" fill="#d97706" />
        <text x="21" y="44" fontSize="12" fontWeight="bold" fill="#6d28d9">A</text>
        <text x="151" y="44" fontSize="12" fontWeight="bold" fill="#6d28d9">B</text>
        <text x="86" y="14" fontSize="11" fontWeight="bold" fill="#b45309">F</text>
        <text x="90" y="58" fontSize="11" textAnchor="middle" fill="#64748b" fontWeight="600">AB szakasz & felezőpont (F)</text>
      </g>

      {/* 4. Pont és illeszkedés */}
      <g transform="translate(195, 105)">
        <line x1="20" y1="25" x2="160" y2="25" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="70" cy="25" r="4.5" fill="#ef4444" />
        <circle cx="125" cy="5" r="4.5" fill="#0284c7" />
        <text x="65" y="44" fontSize="12" fontWeight="bold" fill="#dc2626">P ∈ e</text>
        <text x="135" y="8" fontSize="12" fontWeight="bold" fill="#0284c7">Q ∉ e</text>
        <text x="90" y="58" fontSize="11" textAnchor="middle" fill="#64748b" fontWeight="600">illeszkedés reláció</text>
      </g>
    </svg>
  );
};

// 2. Szögfajták összefoglaló ábrája (hegyes, derék, tompa, egyenes, homorú)
// Magyar konvenció szerint a derékszög jelölése: negyedkörív és benne egy pont!
export const AngleTypesSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.52}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Hegyesszög: 45° */}
      <g transform="translate(30, 60)">
        <line x1="0" y1="20" x2="50" y2="20" stroke="#334155" strokeWidth="2" />
        <line x1="0" y1="20" x2="35" y2="-15" stroke="#334155" strokeWidth="2" />
        <path d="M 22 20 A 22 22 0 0 0 15 5" fill="none" stroke="#2563eb" strokeWidth="2" />
        <circle cx="0" cy="20" r="3" fill="#2563eb" />
        <text x="25" y="45" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#1e40af">Hegyesszög</text>
        <text x="25" y="57" fontSize="9" textAnchor="middle" fill="#64748b">0° &lt; α &lt; 90°</text>
      </g>

      {/* Derékszög: 90° - Magyar jelölés: negyedkörív benne ponttal */}
      <g transform="translate(125, 60)">
        <line x1="0" y1="20" x2="50" y2="20" stroke="#334155" strokeWidth="2" />
        <line x1="0" y1="20" x2="0" y2="-30" stroke="#334155" strokeWidth="2" />
        {/* Negyedkörív és pont a magyar szabvány szerint */}
        <path d="M 18 20 A 18 18 0 0 0 0 2" fill="rgba(5, 150, 105, 0.1)" stroke="#059669" strokeWidth="2" />
        <circle cx="7" cy="13" r="2" fill="#059669" />
        <circle cx="0" cy="20" r="3" fill="#059669" />
        <text x="25" y="45" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#065f46">Derékszög</text>
        <text x="25" y="57" fontSize="9" textAnchor="middle" fill="#64748b">α = 90°</text>
      </g>

      {/* Tompaszög: 135° */}
      <g transform="translate(230, 60)">
        <line x1="0" y1="20" x2="45" y2="20" stroke="#334155" strokeWidth="2" />
        <line x1="0" y1="20" x2="-32" y2="-12" stroke="#334155" strokeWidth="2" />
        <path d="M 20 20 A 20 20 0 0 0 -14 6" fill="none" stroke="#d97706" strokeWidth="2" />
        <circle cx="0" cy="20" r="3" fill="#d97706" />
        <text x="15" y="45" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#92400e">Tompaszög</text>
        <text x="15" y="57" fontSize="9" textAnchor="middle" fill="#64748b">90° &lt; α &lt; 180°</text>
      </g>

      {/* Egyenesszög: 180° */}
      <g transform="translate(80, 150)">
        <line x1="-40" y1="0" x2="40" y2="0" stroke="#334155" strokeWidth="2" />
        <path d="M 18 0 A 18 18 0 0 0 -18 0" fill="none" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="0" cy="0" r="3" fill="#7c3aed" />
        <text x="0" y="24" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#5b21b6">Egyenesszög</text>
        <text x="0" y="36" fontSize="9" textAnchor="middle" fill="#64748b">α = 180°</text>
      </g>

      {/* Homorúszög: > 180° */}
      <g transform="translate(260, 145)">
        <line x1="0" y1="0" x2="35" y2="0" stroke="#334155" strokeWidth="2" />
        <line x1="0" y1="0" x2="-25" y2="-25" stroke="#334155" strokeWidth="2" />
        <path d="M 16 0 A 16 16 0 1 1 -11 -11" fill="none" stroke="#e11d48" strokeWidth="2" />
        <circle cx="0" cy="0" r="3" fill="#e11d48" />
        <text x="5" y="29" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#9f1239">Homorúszög</text>
        <text x="5" y="41" fontSize="9" textAnchor="middle" fill="#64748b">180° &lt; α &lt; 360°</text>
      </g>
    </svg>
  );
};

// 3. Két metsző egyenes: csúcsszögek és mellékszögek
export const AdjacentAndVerticalAnglesSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 210"
      width={size}
      height={size * 0.55}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="200" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Két metsző egyenes */}
      <g transform="translate(130, 105)">
        <line x1="-100" y1="-50" x2="100" y2="50" stroke="#475569" strokeWidth="2.5" />
        <line x1="-100" y1="50" x2="100" y2="-50" stroke="#475569" strokeWidth="2.5" />

        {/* Metszéspont */}
        <circle cx="0" cy="0" r="4" fill="#0f172a" />

        {/* Jobb oldali szög (alfa) */}
        <path d="M 32 -16 A 35 35 0 0 1 32 16" fill="rgba(37, 99, 235, 0.15)" stroke="#2563eb" strokeWidth="2.5" />
        <text x="44" y="5" fontSize="14" fontWeight="bold" fill="#2563eb">α</text>

        {/* Bal oldali szög (alfa csúcsszög) */}
        <path d="M -32 16 A 35 35 0 0 1 -32 -16" fill="rgba(37, 99, 235, 0.15)" stroke="#2563eb" strokeWidth="2.5" />
        <text x="-56" y="5" fontSize="14" fontWeight="bold" fill="#2563eb">α'</text>

        {/* Felső szög (béta mellékszög) */}
        <path d="M -22 -11 A 25 25 0 0 1 22 -11" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2.5" />
        <text x="-4" y="-30" fontSize="14" fontWeight="bold" fill="#d97706">β</text>

        {/* Alsó szög (béta' csúcsszög) */}
        <path d="M 22 11 A 25 25 0 0 1 -22 11" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2.5" />
        <text x="-4" y="42" fontSize="14" fontWeight="bold" fill="#d97706">β'</text>
      </g>

      {/* Magyarázat / Jelmagyarázat doboz */}
      <g transform="translate(250, 35)">
        <rect x="0" y="0" width="115" height="140" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="12" y="22" fontSize="11" fontWeight="bold" fill="#1e293b">Szögkapcsolatok:</text>

        {/* Csúcsszögek */}
        <circle cx="20" cy="45" r="4" fill="#2563eb" />
        <text x="32" y="48" fontSize="11" fontWeight="bold" fill="#1d4ed8">Csúcsszögek:</text>
        <text x="32" y="62" fontSize="11" fontStyle="italic" fill="#334155">α = α', β = β'</text>

        {/* Mellékszögek */}
        <circle cx="20" cy="85" r="4" fill="#f59e0b" />
        <text x="32" y="88" fontSize="11" fontWeight="bold" fill="#b45309">Mellékszögek:</text>
        <text x="32" y="102" fontSize="11" fontStyle="italic" fill="#334155">α + β = 180°</text>
        <text x="32" y="118" fontSize="11" fontStyle="italic" fill="#334155">α' + β' = 180°</text>
      </g>
    </svg>
  );
};

// 4. Párhuzamos szárú szögek metsző egyenessel (váltószögek, egyállású szögek, társszögek)
export const ParallelTransversalAnglesSvg: React.FC<FigureProps> = ({ size = 270, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 220"
      width={size}
      height={size * 0.58}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="210" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Párhuzamos egyenesek: e és f */}
      <line x1="30" y1="70" x2="250" y2="70" stroke="#3b82f6" strokeWidth="2.5" />
      <text x="260" y="74" fontSize="13" fontStyle="italic" fontWeight="bold" fill="#2563eb">e</text>

      <line x1="30" y1="150" x2="250" y2="150" stroke="#3b82f6" strokeWidth="2.5" />
      <text x="260" y="154" fontSize="13" fontStyle="italic" fontWeight="bold" fill="#2563eb">f (e ∥ f)</text>

      {/* Metsző egyenes: m */}
      <line x1="60" y1="25" x2="220" y2="195" stroke="#0f172a" strokeWidth="2.5" />
      <text x="228" y="195" fontSize="13" fontStyle="italic" fontWeight="bold" fill="#0f172a">m</text>

      {/* Felső metszéspont (x=102, y=70) */}
      <circle cx="102" cy="70" r="3.5" fill="#0f172a" />
      {/* Alfa szög (jobb alsó negyed az e és m között) */}
      <path d="M 126 70 A 24 24 0 0 1 118.5 87.5" fill="rgba(37, 99, 235, 0.2)" stroke="#2563eb" strokeWidth="2" />
      <text x="128" y="85" fontSize="13" fontWeight="bold" fill="#1d4ed8">α</text>

      {/* Béta szög felső (bal felső tompa szög az e és m között) */}
      <path d="M 80 70 A 22 22 0 0 0 87 54" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
      <text x="68" y="60" fontSize="12" fontWeight="bold" fill="#d97706">β</text>

      {/* Alsó metszéspont (x=178, y=150) */}
      <circle cx="178" cy="150" r="3.5" fill="#0f172a" />
      {/* Alfa₁ szög alsó (egyállású az alfával, jobb alsó negyed) */}
      <path d="M 202 150 A 24 24 0 0 1 194.5 167.5" fill="rgba(37, 99, 235, 0.2)" stroke="#2563eb" strokeWidth="2" />
      <text x="204" y="165" fontSize="13" fontWeight="bold" fill="#1d4ed8">α₁</text>

      {/* Alfa₂ belső váltószög (bal felső az alsó pontnál) */}
      <path d="M 154 150 A 24 24 0 0 0 161.5 132.5" fill="rgba(16, 185, 129, 0.25)" stroke="#059669" strokeWidth="2" />
      <text x="140" y="140" fontSize="13" fontWeight="bold" fill="#047857">α₂</text>

      {/* Info panel jobb oldalon */}
      <g transform="translate(255, 20)">
        <rect x="0" y="0" width="115" height="175" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="8" y="18" fontSize="10" fontWeight="bold" fill="#1e293b">Párhuzamos szárúak:</text>

        {/* Egyállású szögek */}
        <text x="8" y="38" fontSize="10" fontWeight="bold" fill="#2563eb">1. Egyállású (F-szög):</text>
        <text x="8" y="52" fontSize="10" fontStyle="italic" fill="#475569">α = α₁ (egyenlők)</text>

        {/* Váltószögek */}
        <text x="8" y="74" fontSize="10" fontWeight="bold" fill="#059669">2. Váltószög (Z-szög):</text>
        <text x="8" y="88" fontSize="10" fontStyle="italic" fill="#475569">α = α₂ (egyenlők)</text>

        {/* Társszögek */}
        <text x="8" y="112" fontSize="10" fontWeight="bold" fill="#d97706">3. Társszög (C-szög):</text>
        <text x="8" y="126" fontSize="10" fontStyle="italic" fill="#475569">α + β = 180°</text>
        <text x="8" y="140" fontSize="9" fill="#64748b">(összegük 180°)</text>

        {/* Érvényesség */}
        <rect x="6" y="148" width="103" height="20" rx="4" fill="#eff6ff" />
        <text x="10" y="162" fontSize="9" fontWeight="bold" fill="#1e40af">Csak ha e ∥ f!</text>
      </g>
    </svg>
  );
};

// 5. Pótszögek ábrája (derékszög két részre osztva)
// Magyar konvenció szerint a derékszög sarokjelölése: negyedkörív és benne egy pont!
export const ComplementaryAnglesSvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      width={size}
      height={size * 0.62}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="310" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Derékszög szárai O pontból */}
      <g transform="translate(60, 150)">
        <line x1="0" y1="0" x2="160" y2="0" stroke="#1e293b" strokeWidth="2.5" />
        <line x1="0" y1="0" x2="0" y2="-130" stroke="#1e293b" strokeWidth="2.5" />

        {/* Osztó félegyenes */}
        <line x1="0" y1="0" x2="110" y2="-75" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="5 3" />

        {/* Derékszög jele: magyar szabvány negyedkörív ponttal */}
        <path d="M 22 0 A 22 22 0 0 0 0 -22" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="8" cy="-8" r="2" fill="#94a3b8" />

        {/* Alsó alfa szög (kb 34 fok) */}
        <path d="M 45 0 A 45 45 0 0 0 37.2 -25.4" fill="rgba(37, 99, 235, 0.15)" stroke="#2563eb" strokeWidth="2.5" />
        <text x="50" y="-10" fontSize="14" fontWeight="bold" fill="#1d4ed8">α</text>

        {/* Felső béta szög (kb 56 fok) */}
        <path d="M 24.8 -16.9 A 30 30 0 0 0 0 -30" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="2.5" />
        <text x="12" y="-36" fontSize="14" fontWeight="bold" fill="#b45309">β</text>

        <circle cx="0" cy="0" r="4" fill="#1e293b" />
        <text x="-12" y="15" fontSize="12" fontWeight="bold" fill="#334155">O</text>
      </g>

      {/* Szöveges magyarázat jobb oldalon */}
      <g transform="translate(200, 45)">
        <rect x="0" y="0" width="105" height="110" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="10" y="24" fontSize="12" fontWeight="bold" fill="#6d28d9">Pótszögek:</text>
        <text x="10" y="46" fontSize="13" fontWeight="bold" fill="#1e293b">α + β = 90°</text>
        <text x="10" y="68" fontSize="11" fill="#64748b">Egymást derék-</text>
        <text x="10" y="82" fontSize="11" fill="#64748b">szögre egészítik</text>
        <text x="10" y="96" fontSize="11" fill="#64748b">ki a szögek.</text>
      </g>
    </svg>
  );
};
