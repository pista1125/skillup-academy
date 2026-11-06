import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Állítás feldolgozási folyamat (Kijelentés -> Objektív vizsgálat -> Igaz / Hamis)
export const LogicStatementSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      className={`select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="320" height="180" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
      
      {/* Bemenet: Mondat */}
      <rect x="20" y="65" width="80" height="50" rx="8" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2" />
      <text x="60" y="88" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#3730A3">Mondat</text>
      <text x="60" y="103" textAnchor="middle" fontSize="9" fill="#6366F1">(kijelentés)</text>

      {/* Nyíl a szűrőhöz */}
      <path d="M100 90 L125 90" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 3" />
      <polygon points="125,87 132,90 125,93" fill="#94A3B8" />

      {/* Döntési kapu (Objektív eldönthetőség) */}
      <polygon points="170,55 210,90 170,125 130,90" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <text x="170" y="88" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400E">Objektív?</text>
      <text x="170" y="99" textAnchor="middle" fontSize="8" fill="#B45309">I / H</text>

      {/* Felső ág: IGAZ */}
      <path d="M190 72 L230 40" stroke="#10B981" strokeWidth="2" />
      <polygon points="228,36 237,39 231,45" fill="#10B981" />
      <rect x="235" y="20" width="70" height="38" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
      <text x="270" y="38" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065F46">IGAZ (I)</text>
      <text x="270" y="50" textAnchor="middle" fontSize="9" fill="#059669">érték: 1</text>

      {/* Alsó ág: HAMIS */}
      <path d="M190 108 L230 140" stroke="#EF4444" strokeWidth="2" />
      <polygon points="231,135 237,141 228,144" fill="#EF4444" />
      <rect x="235" y="122" width="70" height="38" rx="8" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" />
      <text x="270" y="140" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991B1B">HAMIS (H)</text>
      <text x="270" y="152" textAnchor="middle" fontSize="9" fill="#DC2626">érték: 0</text>
    </svg>
  );
};

// 2. Harmadik kizárásának elve és Ellentmondásmentesség (Kizárt harmadik: nincs köztes állapot)
export const ExcludedMiddleSvg: React.FC<FigureProps> = ({ size, className = '' }) => {
  return (
    <svg
      viewBox="0 0 560 228"
      className={`w-full max-w-xl h-auto select-none ${className}`}
      style={size ? { maxWidth: size } : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="gradTrue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#D1FAE5" />
        </linearGradient>
        <linearGradient id="gradFalse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF2F2" />
          <stop offset="100%" stopColor="#FEE2E2" />
        </linearGradient>
        <linearGradient id="gradBarrier" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        {/* Soft Shadow */}
        <filter id="shadowPill" x="-8%" y="-15%" width="116%" height="135%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.06" />
        </filter>
      </defs>

      {/* Külső háttér keret */}
      <rect x="2" y="2" width="556" height="224" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />

      {/* Univerzum tartomány */}
      <rect x="16" y="22" width="528" height="184" rx="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="30" y="37" fontSize="10" fontWeight="bold" fill="#64748B" letterSpacing="0.5">
        A KIJELENTÉSEK TELJES VILÁGA (U)
      </text>

      {/* === BAL OLDAL: IGAZ ÁLLÍTÁSOK === */}
      <rect
        x="26"
        y="46"
        width="244"
        height="146"
        rx="12"
        fill="url(#gradTrue)"
        stroke="#10B981"
        strokeWidth="2"
      />
      {/* IGAZ Fejléc */}
      <circle cx="50" cy="68" r="13" fill="#10B981" />
      <path d="M44 68 L48 72 L56 64" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="70" y="72" fontSize="14" fontWeight="900" fill="#065F46">IGAZ (I)</text>
      <rect x="135" y="60" width="55" height="17" rx="8" fill="#ECFDF5" stroke="#10B981" strokeWidth="1" />
      <text x="162" y="72" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#047857">érték: 1</text>

      {/* Elválasztó vonal */}
      <line x1="36" y1="88" x2="260" y2="88" stroke="#A7F3D0" strokeWidth="1.5" />

      {/* Példa kártyák (IGAZ) */}
      <g filter="url(#shadowPill)">
        <rect x="36" y="96" width="224" height="23" rx="6" fill="#FFFFFF" fillOpacity="0.9" stroke="#A7F3D0" strokeWidth="1" />
        <text x="46" y="111" fontSize="9.5" fontWeight="600" fill="#065F46">✓ „A sósav képlete HCl”</text>

        <rect x="36" y="124" width="224" height="23" rx="6" fill="#FFFFFF" fillOpacity="0.9" stroke="#A7F3D0" strokeWidth="1" />
        <text x="46" y="139" fontSize="9.5" fontWeight="600" fill="#065F46">✓ „A 17 prímszám”</text>

        <rect x="36" y="152" width="224" height="23" rx="6" fill="#FFFFFF" fillOpacity="0.9" stroke="#A7F3D0" strokeWidth="1" />
        <text x="46" y="167" fontSize="9.5" fontWeight="600" fill="#065F46">✓ „Háromszög belső szögei: 180°”</text>
      </g>

      {/* === JOBB OLDAL: HAMIS ÁLLÍTÁSOK === */}
      <rect
        x="290"
        y="46"
        width="244"
        height="146"
        rx="12"
        fill="url(#gradFalse)"
        stroke="#EF4444"
        strokeWidth="2"
      />
      {/* HAMIS Fejléc */}
      <circle cx="314" cy="68" r="13" fill="#EF4444" />
      <path d="M309 63 L319 73 M319 63 L309 73" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <text x="334" y="72" fontSize="14" fontWeight="900" fill="#991B1B">HAMIS (H)</text>
      <rect x="412" y="60" width="55" height="17" rx="8" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1" />
      <text x="439" y="72" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#B91C1C">érték: 0</text>

      {/* Elválasztó vonal */}
      <line x1="300" y1="88" x2="524" y2="88" stroke="#FECACA" strokeWidth="1.5" />

      {/* Példa kártyák (HAMIS) */}
      <g filter="url(#shadowPill)">
        <rect x="300" y="96" width="224" height="23" rx="6" fill="#FFFFFF" fillOpacity="0.9" stroke="#FECACA" strokeWidth="1" />
        <text x="310" y="111" fontSize="9.5" fontWeight="600" fill="#991B1B">✗ „Svájc fővárosa Zürich”</text>

        <rect x="300" y="124" width="224" height="23" rx="6" fill="#FFFFFF" fillOpacity="0.9" stroke="#FECACA" strokeWidth="1" />
        <text x="310" y="139" fontSize="9.5" fontWeight="600" fill="#991B1B">✗ „Minden prímszám páratlan”</text>

        <rect x="300" y="152" width="224" height="23" rx="6" fill="#FFFFFF" fillOpacity="0.9" stroke="#FECACA" strokeWidth="1" />
        <text x="310" y="167" fontSize="9.5" fontWeight="600" fill="#991B1B">✗ „2 páros összege mindig : 4”</text>
      </g>

      {/* === KÖZÉPSŐ VÁLASZTÓFAL (KIZÁRT HARMADIK) === */}
      <line x1="280" y1="36" x2="280" y2="198" stroke="url(#gradBarrier)" strokeWidth="3" strokeDasharray="4 3" />

      {/* Központi Határjelvény */}
      <g filter="url(#shadowPill)">
        <circle cx="280" cy="119" r="17" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="2" />
        <text x="280" y="125" textAnchor="middle" fontSize="15" fontWeight="900" fill="#6D28D9">≠</text>
      </g>

      {/* Felső jelvény: HARMADIK KIZÁRÁSA */}
      <g filter="url(#shadowPill)">
        <rect x="185" y="8" width="190" height="26" rx="13" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="280" y="25" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#B45309">
          ⚡ HARMADIK ESET NINCS!
        </text>
      </g>

      {/* Alsó jelvény: ELLENTMONDÁSMENTESSÉG */}
      <g filter="url(#shadowPill)">
        <rect x="170" y="198" width="220" height="23" rx="11.5" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1.5" />
        <text x="280" y="213" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#4338CA">
          A ∧ ¬A = 0 (Ellentmondásmentes)
        </text>
      </g>
    </svg>
  );
};

// 3. Számegyenes határeset szemléltetés (x > 32 tagadása x <= 32, a 32-es pont jelentősége!)
export const BoundaryNegationSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 340 190"
      width={size}
      height={(size * 190) / 340}
      className={`select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="340" height="190" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
      
      <text x="20" y="25" fontSize="11" fontWeight="bold" fill="#1E293B">A tagadás tipikus buktatója: a határpont</text>
      <text x="20" y="40" fontSize="9" fill="#64748B">A: „Többen vagyunk, mint 32.” (x &gt; 32)</text>

      {/* 1. hibás ellentét: x < 32 */}
      <g transform="translate(20, 50)">
        <text x="0" y="12" fontSize="9" fontWeight="bold" fill="#DC2626">Rossz tagadás: „Kevesebben vagyunk, mint 32” (x &lt; 32)</text>
        <line x1="10" y1="28" x2="280" y2="28" stroke="#CBD5E1" strokeWidth="2" />
        
        {/* Balra nyíl: x < 32 */}
        <line x1="130" y1="28" x2="30" y2="28" stroke="#EF4444" strokeWidth="3" />
        <circle cx="130" cy="28" r="4" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
        <text x="130" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#64748B">32</text>
        
        {/* Jobbra nyíl: x > 32 */}
        <line x1="150" y1="28" x2="260" y2="28" stroke="#3B82F6" strokeWidth="3" />
        <circle cx="150" cy="28" r="4" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2" />
        
        {/* Lyuk a 32-nél */}
        <rect x="122" y="8" width="36" height="16" rx="4" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1" />
        <text x="140" y="19" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#991B1B">32 kimaradt!</text>
      </g>

      {/* 2. helyes tagadás: x <= 32 */}
      <g transform="translate(20, 115)">
        <text x="0" y="12" fontSize="9" fontWeight="bold" fill="#16A34A">Helyes tagadás: „Legfeljebb 32-en vagyunk” (x ≤ 32)</text>
        <line x1="10" y1="28" x2="280" y2="28" stroke="#CBD5E1" strokeWidth="2" />
        
        {/* Balra telített: x <= 32 */}
        <line x1="140" y1="28" x2="30" y2="28" stroke="#16A34A" strokeWidth="3" />
        <circle cx="140" cy="28" r="5" fill="#16A34A" />
        <text x="140" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16A34A">32 (benne van!)</text>

        {/* Jobbra: x > 32 */}
        <line x1="145" y1="28" x2="260" y2="28" stroke="#3B82F6" strokeWidth="3" />
        <circle cx="145" cy="28" r="4" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2" />
      </g>
    </svg>
  );
};

// 4. Kocka színezési feladat (Kompetenciamérés & Tankönyv klasszikus: 3x3x3 = 27 kis kocka)
export const PaintedCubeSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 260 200"
      width={size}
      height={(size * 200) / 260}
      className={`select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="260" height="200" rx="16" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
      
      {/* 3D izometrikus kocka vázlat (3x3x3) */}
      <g transform="translate(30, 20)">
        {/* Jelmagyarázat */}
        <rect x="135" y="10" width="85" height="120" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <text x="142" y="28" fontSize="9" fontWeight="bold" fill="#334155">27 kis kocka:</text>
        
        <circle cx="147" cy="46" r="4" fill="#EF4444" />
        <text x="157" y="49" fontSize="8" fill="#1E293B">3 piros lap: 8 db (csúcs)</text>

        <circle cx="147" cy="68" r="4" fill="#F59E0B" />
        <text x="157" y="71" fontSize="8" fill="#1E293B">2 piros lap: 12 db (él)</text>

        <circle cx="147" cy="90" r="4" fill="#3B82F6" />
        <text x="157" y="93" fontSize="8" fill="#1E293B">1 piros lap: 6 db (lapközép)</text>

        <circle cx="147" cy="112" r="4" fill="#94A3B8" />
        <text x="157" y="115" fontSize="8" fill="#1E293B">0 piros lap: 1 db (belső)</text>

        {/* Kis 3x3 kocka front és teteje rajza */}
        {/* Front felület (piros rács) */}
        <rect x="20" y="45" width="75" height="75" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
        <line x1="45" y1="45" x2="45" y2="120" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="70" y1="45" x2="70" y2="120" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="20" y1="70" x2="95" y2="70" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="20" y1="95" x2="95" y2="95" stroke="#EF4444" strokeWidth="1.5" />

        {/* Felső felület (perspektivikus tető) */}
        <polygon points="20,45 45,20 120,20 95,45" fill="#FECACA" stroke="#EF4444" strokeWidth="2" />
        <line x1="45" y1="45" x2="70" y2="20" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="70" y1="45" x2="95" y2="20" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="28" y1="37" x2="103" y2="37" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="37" y1="28" x2="112" y2="28" stroke="#EF4444" strokeWidth="1.5" />

        {/* Jobb oldali felület */}
        <polygon points="95,45 120,20 120,95 95,120" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2" />
        <line x1="95" y1="70" x2="120" y2="45" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="95" y1="95" x2="120" y2="70" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="103" y1="37" x2="103" y2="112" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="112" y1="28" x2="112" y2="103" stroke="#EF4444" strokeWidth="1.5" />

        {/* Csúcs kiemelés */}
        <circle cx="20" cy="45" r="4" fill="#991B1B" />
        <circle cx="120" cy="20" r="4" fill="#991B1B" />
      </g>
      <text x="130" y="180" textAnchor="middle" fontSize="9" fontWeight="medium" fill="#64748B">
        A feldarabolt 3×3×3-as kocka festett lapjainak logikája
      </text>
    </svg>
  );
};

