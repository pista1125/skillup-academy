import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szemléltető ábra: Nyíldiagram halmazábrázolással (Egyértelmű hozzárendelés: Df -> Rf)
 */
export const MappingDiagramSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 320 200"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#2563eb" />
        </marker>
      </defs>

      {/* A halmaz (Értelmezési tartomány) */}
      <ellipse cx="75" cy="100" rx="50" ry="75" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <text x="75" y="45" fill="#1e40af" fontSize="13" fontWeight="black" textAnchor="middle">A = D_f</text>

      {/* B halmaz (Képhalmaz / Értékkészlet) */}
      <ellipse cx="245" cy="100" rx="50" ry="75" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
      <text x="245" y="45" fill="#065f46" fontSize="13" fontWeight="black" textAnchor="middle">B ⊇ R_f</text>

      {/* A elemei: 1, 2, 3 */}
      <circle cx="75" cy="80" r="3.5" fill="#1d4ed8" />
      <text x="60" y="84" fill="#1e293b" fontSize="12" fontWeight="bold">1</text>

      <circle cx="75" cy="110" r="3.5" fill="#1d4ed8" />
      <text x="60" y="114" fill="#1e293b" fontSize="12" fontWeight="bold">2</text>

      <circle cx="75" cy="140" r="3.5" fill="#1d4ed8" />
      <text x="60" y="144" fill="#1e293b" fontSize="12" fontWeight="bold">3</text>

      {/* B elemei: 2, 4, 6, 8 */}
      <circle cx="245" cy="75" r="3.5" fill="#047857" />
      <text x="260" y="79" fill="#1e293b" fontSize="12" fontWeight="bold">2</text>

      <circle cx="245" cy="105" r="3.5" fill="#047857" />
      <text x="260" y="109" fill="#1e293b" fontSize="12" fontWeight="bold">4</text>

      <circle cx="245" cy="135" r="3.5" fill="#047857" />
      <text x="260" y="139" fill="#1e293b" fontSize="12" fontWeight="bold">6</text>

      {/* Nyilak: f(x) = 2x */}
      <line x1="78" y1="80" x2="238" y2="76" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="78" y1="110" x2="238" y2="106" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="78" y1="140" x2="238" y2="136" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Szabály felirat */}
      <text x="160" y="75" fill="#2563eb" fontSize="12" fontWeight="black" textAnchor="middle">f: x ↦ 2x</text>
      <text x="160" y="185" fill="#64748b" fontSize="10" textAnchor="middle">Minden x-ből PONTOSAN EGY nyíl indul ki!</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Függőleges vonal teszt (Függvény vs. Nem függvény)
 */
export const VerticalLineTestSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 320 200"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bal oldal: FÜGGVÉNY (Parabola) */}
      <rect x="15" y="15" width="135" height="150" fill="#f8fafc" rx="6" stroke="#e2e8f0" />
      <text x="82" y="32" fill="#059669" fontSize="11" fontWeight="black" textAnchor="middle">✓ FÜGGVÉNY</text>
      <line x1="25" y1="90" x2="140" y2="90" stroke="#94a3b8" strokeWidth="1" />
      <line x1="82" y1="35" x2="82" y2="155" stroke="#94a3b8" strokeWidth="1" />
      {/* Görbe: y = x^2 */}
      <path d="M 45 60 Q 82 140 120 60" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      {/* Függőleges tesztvonal (1 metszéspont) */}
      <line x1="100" y1="35" x2="100" y2="155" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="100" cy="88" r="4" fill="#10b981" />
      <text x="82" y="180" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="middle">Legfeljebb 1 metszéspont</text>

      {/* Jobb oldal: NEM FÜGGVÉNY (Kör) */}
      <rect x="170" y="15" width="135" height="150" fill="#f8fafc" rx="6" stroke="#e2e8f0" />
      <text x="237" y="32" fill="#dc2626" fontSize="11" fontWeight="black" textAnchor="middle">✗ NEM FÜGGVÉNY</text>
      <line x1="180" y1="90" x2="295" y2="90" stroke="#94a3b8" strokeWidth="1" />
      <line x1="237" y1="35" x2="237" y2="155" stroke="#94a3b8" strokeWidth="1" />
      {/* Görbe: Kör */}
      <circle cx="237" cy="90" r="40" fill="none" stroke="#2563eb" strokeWidth="2.5" />
      {/* Függőleges tesztvonal (2 metszéspont!) */}
      <line x1="255" y1="35" x2="255" y2="155" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="255" cy="55" r="4" fill="#dc2626" />
      <circle cx="255" cy="125" r="4" fill="#dc2626" />
      <text x="237" y="180" fill="#dc2626" fontSize="10" fontWeight="bold" textAnchor="middle">2 metszéspont (nem egyértelmű!)</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Értelmezési tartomány (Df) és Értékkészlet (Rf) tengelyeken
 */
export const DomainRangeGraphSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="35" y="20" width="260" height="160" fill="#f8fafc" rx="6" />

      {/* Df sáv az X tengelyen (-3-tól 4-ig) */}
      <rect x="75" y="165" width="160" height="8" fill="#3b82f6" rx="4" />
      <circle cx="75" cy="169" r="4" fill="#3b82f6" />
      <circle cx="235" cy="169" r="4" fill="#3b82f6" />
      <text x="155" y="195" fill="#1e40af" fontSize="11" fontWeight="black" textAnchor="middle">D_f = [-3; 4]</text>

      {/* Rf sáv az Y tengelyen (-1-től 3-ig) */}
      <rect x="37" y="55" width="8" height="90" fill="#10b981" rx="4" />
      <circle cx="41" cy="55" r="4" fill="#10b981" />
      <circle cx="41" cy="145" r="4" fill="#10b981" />
      <text x="25" y="105" fill="#065f46" fontSize="11" fontWeight="black" textAnchor="middle">R_f</text>

      {/* Tengelyek */}
      <line x1="45" y1="20" x2="45" y2="175" stroke="#475569" strokeWidth="2" />
      <line x1="45" y1="130" x2="295" y2="130" stroke="#475569" strokeWidth="2" />
      <text x="295" y="145" fill="#475569" fontSize="11" fontWeight="bold">x</text>
      <text x="35" y="18" fill="#475569" fontSize="11" fontWeight="bold">y</text>

      {/* Szakaszos függvénygörbe: (-3; -1)-től (4; 3)-ig egy szép ívvel */}
      <path
        d="M 75,145 Q 130,150 170,90 T 235,55"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Vetítések szaggatottan */}
      <line x1="75" y1="145" x2="75" y2="165" stroke="#94a3b8" strokeDasharray="2 2" />
      <line x1="235" y1="55" x2="235" y2="165" stroke="#94a3b8" strokeDasharray="2 2" />
      <line x1="75" y1="145" x2="45" y2="145" stroke="#94a3b8" strokeDasharray="2 2" />
      <line x1="235" y1="55" x2="45" y2="55" stroke="#94a3b8" strokeDasharray="2 2" />

      {/* Zárt végpontok */}
      <circle cx="75" cy="145" r="4.5" fill="#8b5cf6" />
      <circle cx="235" cy="55" r="4.5" fill="#8b5cf6" />

      <text x="160" y="212" fill="#64748b" fontSize="10" textAnchor="middle">
        D_f: vetület az x-tengelyre | R_f: vetület az y-tengelyre
      </text>
    </svg>
  );
};

/**
 * Szemléltető ábra: A Függvénygép modell (Input x -> Szabály f -> Output y)
 */
export const FunctionMachineSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 320 180"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
        </marker>
        <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
        </marker>
      </defs>

      <rect width="320" height="180" fill="#0f172a" rx="8" />

      {/* Bemenet (x) cső */}
      <rect x="20" y="70" width="60" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="50" y="86" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Bemenet</text>
      <text x="50" y="102" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">x ∈ D_f</text>
      <line x1="80" y1="90" x2="105" y2="90" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />

      {/* Gép test */}
      <rect x="110" y="45" width="105" height="90" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
      <circle cx="162" cy="70" r="14" fill="#312e81" stroke="#a5b4fc" strokeWidth="1.5" />
      <text x="162" y="75" fill="#c7d2fe" fontSize="13" fontWeight="black" textAnchor="middle">f(x)</text>
      <text x="162" y="105" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">2x + 3</text>
      <text x="162" y="122" fill="#6366f1" fontSize="9" textAnchor="middle">Gép (Szabály)</text>

      {/* Kimenet (y) cső */}
      <line x1="215" y1="90" x2="238" y2="90" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
      <rect x="240" y="70" width="65" height="40" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
      <text x="272" y="86" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">Kimenet</text>
      <text x="272" y="102" fill="#ffffff" fontSize="13" fontWeight="black" textAnchor="middle">y ∈ R_f</text>

      {/* Felső és alsó feliratok */}
      <text x="160" y="28" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
        A Függvénygép Modellje
      </text>
      <text x="160" y="160" fill="#94a3b8" fontSize="9.5" textAnchor="middle">
        1 bemeneti x-ből pontosan 1 egyértelmű kimeneti y jön létre!
      </text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Pont illeszkedése a grafikonra (P(x0; y0) rajta van-e?)
 */
export const PointOnGraphSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 320 180"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="320" height="180" fill="#0f172a" rx="8" />

      {/* Tengelyek */}
      <line x1="30" y1="130" x2="290" y2="130" stroke="#475569" strokeWidth="1.5" />
      <line x1="90" y1="20" x2="90" y2="165" stroke="#475569" strokeWidth="1.5" />
      <text x="285" y="145" fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
      <text x="75" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold">y</text>

      {/* Egyenes: f(x) = 2x - 1 -> (0, -1), (2, 3), (3, 5) */}
      <line x1="50" y1="150" x2="250" y2="40" stroke="#38bdf8" strokeWidth="2.5" />
      <text x="255" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">f(x) = 2x - 1</text>

      {/* P(2; 3) - Rajta van (zöld) */}
      <circle cx="160" cy="90" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="160" y1="90" x2="160" y2="130" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="160" y1="90" x2="90" y2="90" stroke="#10b981" strokeWidth="1" strokeDasharray="3 2" />
      <text x="160" y="145" fill="#34d399" fontSize="10" textAnchor="middle">2</text>
      <text x="75" y="94" fill="#34d399" fontSize="10" textAnchor="middle">3</text>
      <text x="175" y="82" fill="#34d399" fontSize="11" fontWeight="bold">P(2; 3) ✓ Rajta van</text>

      {/* Q(2; 1) - Nincs rajta (piros) */}
      <circle cx="160" cy="118" r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
      <text x="175" y="122" fill="#fb7185" fontSize="11" fontWeight="bold">Q(2; 1) ✗ Nincs rajta</text>

      <text x="160" y="170" fill="#94a3b8" fontSize="9.5" textAnchor="middle">
        f(2) = 2·2 - 1 = 3 ⟹ P rajta van, mert y = 3. Q nincs rajta, mert 1 ≠ 3!
      </text>
    </svg>
  );
};
