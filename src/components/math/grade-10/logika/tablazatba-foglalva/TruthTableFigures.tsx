import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Igazságtáblázat és De Morgan azonosság összehasonlítása:
 * A 4 sor: (I, I), (I, H), (H, I), (H, H)
 * ¬(A ∧ B) és (¬A ∨ ¬B) oszlopai megegyeznek: H, I, I, I -> Ekvivalensek!
 */
export const TruthTableDnaSvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 540 240"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.3}px` : '290px' }}
      >
        {/* Table background container */}
        <rect x="15" y="15" width="510" height="210" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Table Header Row */}
        <rect x="25" y="25" width="490" height="34" rx="8" fill="#1e293b" />
        <text x="60" y="47" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">A</text>
        <text x="110" y="47" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">B</text>
        <text x="175" y="47" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">A ∧ B</text>
        <text x="260" y="47" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontWeight="black">¬(A ∧ B)</text>
        <text x="345" y="47" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">¬A</text>
        <text x="395" y="47" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">¬B</text>
        <text x="465" y="47" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontWeight="black">¬A ∨ ¬B</text>

        {/* Separator columns */}
        <line x1="85" y1="25" x2="85" y2="215" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="135" y1="25" x2="135" y2="215" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="215" y1="25" x2="215" y2="215" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="310" y1="25" x2="310" y2="215" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="370" y1="25" x2="370" y2="215" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="420" y1="25" x2="420" y2="215" stroke="#cbd5e1" strokeWidth="1" />

        {/* Highlight columns for the two equivalent results */}
        <rect x="216" y="59" width="94" height="156" fill="#10b981" fillOpacity="0.08" />
        <rect x="421" y="59" width="94" height="156" fill="#10b981" fillOpacity="0.08" />

        {/* Row 1: I, I */}
        <g transform="translate(0, 65)">
          <text x="60" y="22" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">I</text>
          <text x="110" y="22" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">I</text>
          <text x="175" y="22" textAnchor="middle" fill="#64748b" fontSize="11">I</text>
          <text x="260" y="22" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="black">H</text>
          <text x="345" y="22" textAnchor="middle" fill="#64748b" fontSize="11">H</text>
          <text x="395" y="22" textAnchor="middle" fill="#64748b" fontSize="11">H</text>
          <text x="465" y="22" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="black">H</text>
          <line x1="25" y1="36" x2="515" y2="36" stroke="#e2e8f0" strokeWidth="1" />
        </g>

        {/* Row 2: I, H */}
        <g transform="translate(0, 102)">
          <text x="60" y="22" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">I</text>
          <text x="110" y="22" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">H</text>
          <text x="175" y="22" textAnchor="middle" fill="#64748b" fontSize="11">H</text>
          <text x="260" y="22" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="black">I</text>
          <text x="345" y="22" textAnchor="middle" fill="#64748b" fontSize="11">H</text>
          <text x="395" y="22" textAnchor="middle" fill="#64748b" fontSize="11">I</text>
          <text x="465" y="22" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="black">I</text>
          <line x1="25" y1="36" x2="515" y2="36" stroke="#e2e8f0" strokeWidth="1" />
        </g>

        {/* Row 3: H, I */}
        <g transform="translate(0, 139)">
          <text x="60" y="22" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">H</text>
          <text x="110" y="22" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">I</text>
          <text x="175" y="22" textAnchor="middle" fill="#64748b" fontSize="11">H</text>
          <text x="260" y="22" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="black">I</text>
          <text x="345" y="22" textAnchor="middle" fill="#64748b" fontSize="11">I</text>
          <text x="395" y="22" textAnchor="middle" fill="#64748b" fontSize="11">H</text>
          <text x="465" y="22" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="black">I</text>
          <line x1="25" y1="36" x2="515" y2="36" stroke="#e2e8f0" strokeWidth="1" />
        </g>

        {/* Row 4: H, H */}
        <g transform="translate(0, 176)">
          <text x="60" y="22" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">H</text>
          <text x="110" y="22" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">H</text>
          <text x="175" y="22" textAnchor="middle" fill="#64748b" fontSize="11">H</text>
          <text x="260" y="22" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="black">I</text>
          <text x="345" y="22" textAnchor="middle" fill="#64748b" fontSize="11">I</text>
          <text x="395" y="22" textAnchor="middle" fill="#64748b" fontSize="11">I</text>
          <text x="465" y="22" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="black">I</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Kvarkus erődje: Szobák és ajtófeliratok (Raymond Smullyan nyomán):
 * 1. szoba ajtaja vs 2. szoba ajtaja
 */
export const SmullyanDoorsSvg: React.FC<FigureProps> = ({ size = 220, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 480 220"
        className="w-full max-w-lg h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.2}px` : '260px' }}
      >
        {/* Door 1 */}
        <g transform="translate(30, 20)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="#f8fafc" stroke="#4f46e5" strokeWidth="2" />
          <rect x="0" y="0" width="190" height="36" rx="14" fill="#4f46e5" />
          <rect x="0" y="20" width="190" height="16" fill="#4f46e5" />
          <text x="95" y="24" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">1. SZOBA AJTAJA</text>
          
          {/* Signboard */}
          <rect x="15" y="48" width="160" height="85" rx="8" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1" />
          <text x="95" y="70" textAnchor="middle" fill="#1e1b4b" fontSize="11" fontWeight="bold">Felirat az 1. ajtón:</text>
          <text x="95" y="90" textAnchor="middle" fill="#312e81" fontSize="10">„Ebben a szobában lány</text>
          <text x="95" y="105" textAnchor="middle" fill="#312e81" fontSize="10">van, a 2.-ban szörny.”</text>
          <text x="95" y="122" textAnchor="middle" fill="#4338ca" fontSize="9.5" fontWeight="bold">(L₁ ∧ Sz₂)</text>

          {/* Doorknob */}
          <circle cx="165" cy="150" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        </g>

        {/* Door 2 */}
        <g transform="translate(260, 20)">
          <rect x="0" y="0" width="190" height="180" rx="14" fill="#f8fafc" stroke="#059669" strokeWidth="2" />
          <rect x="0" y="0" width="190" height="36" rx="14" fill="#059669" />
          <rect x="0" y="20" width="190" height="16" fill="#059669" />
          <text x="95" y="24" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">2. SZOBA AJTAJA</text>
          
          {/* Signboard */}
          <rect x="15" y="48" width="160" height="85" rx="8" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="1" />
          <text x="95" y="70" textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="bold">Felirat a 2. ajtón:</text>
          <text x="95" y="90" textAnchor="middle" fill="#065f46" fontSize="10">„Az egyikben lány van,</text>
          <text x="95" y="105" textAnchor="middle" fill="#065f46" fontSize="10">a másikban szörny.”</text>
          <text x="95" y="122" textAnchor="middle" fill="#047857" fontSize="9.5" fontWeight="bold">(pontosan 1 lány)</text>

          {/* Doorknob */}
          <circle cx="25" cy="150" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. De Morgan-törvények Venn-diagramon szemléltetve:
 * ¬(A ∪ B) = ¬A ∩ ¬B (külső tartomány)
 * ¬(A ∩ B) = ¬A ∪ ¬B (minden, kivéve a metszet)
 */
export const DeMorganVennSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 500 200"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.2}px` : '240px' }}
      >
        <defs>
          <clipPath id="outsideUnionClip">
            <rect x="15" y="15" width="215" height="165" rx="10" />
          </clipPath>
          <clipPath id="outsideIntersectClip">
            <rect x="270" y="15" width="215" height="165" rx="10" />
          </clipPath>
        </defs>

        {/* LEFT PANEL: ¬(A ∪ B) = ¬A ∩ ¬B */}
        <g transform="translate(0, 0)">
          {/* Shaded outside background */}
          <rect x="15" y="15" width="215" height="165" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
          
          {/* Clear white circles for A and B */}
          <circle cx="95" cy="95" r="42" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />
          <circle cx="150" cy="95" r="42" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />
          
          {/* Labels */}
          <text x="85" y="99" fill="#5b21b6" fontSize="12" fontWeight="bold">A</text>
          <text x="160" y="99" fill="#5b21b6" fontSize="12" fontWeight="bold">B</text>
          
          <rect x="25" y="150" width="195" height="20" rx="4" fill="#7c3aed" />
          <text x="122" y="164" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold">
            ¬(A ∨ B) ≡ ¬A ∧ ¬B (kívül)
          </text>
        </g>

        {/* RIGHT PANEL: ¬(A ∩ B) = ¬A ∨ ¬B */}
        <g transform="translate(0, 0)">
          {/* Shaded universe */}
          <rect x="270" y="15" width="215" height="165" rx="10" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
          
          {/* Circles shaded */}
          <circle cx="350" cy="95" r="42" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
          <circle cx="405" cy="95" r="42" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
          
          {/* White unshaded center lens (intersection) */}
          <g clipPath="url(#outsideIntersectClip)">
            <g clipPath="url(#lensClip)">
              <circle cx="350" cy="95" r="42" fill="#ffffff" stroke="#059669" strokeWidth="1.5" />
            </g>
          </g>
          <clipPath id="lensClip">
            <circle cx="405" cy="95" r="42" />
          </clipPath>
          <g clipPath="url(#lensClip)">
            <circle cx="350" cy="95" r="42" fill="#ffffff" stroke="#047857" strokeWidth="1.5" />
          </g>

          {/* Labels */}
          <text x="340" y="99" fill="#065f46" fontSize="12" fontWeight="bold">A</text>
          <text x="415" y="99" fill="#065f46" fontSize="12" fontWeight="bold">B</text>

          <rect x="280" y="150" width="195" height="20" rx="4" fill="#059669" />
          <text x="377" y="164" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold">
            ¬(A ∧ B) ≡ ¬A ∨ ¬B (nem metszet)
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Úszóverseny Logikai Rács (Einstein-típusú esetelemzés):
 * Pályák (1, 2, 3, 4) és Iskolák rendszerezése.
 */
export const EinsteinGridSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 460 200"
        className="w-full max-w-lg h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.2}px` : '240px' }}
      >
        {/* Frame */}
        <rect x="15" y="15" width="430" height="170" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Header row */}
        <rect x="25" y="25" width="410" height="30" rx="6" fill="#0f172a" />
        <text x="90" y="44" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Tulajdonság</text>
        <text x="180" y="44" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">1-es pálya</text>
        <text x="260" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">2-es pálya</text>
        <text x="340" y="44" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">3-as pálya</text>
        <text x="405" y="44" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">4-es pálya</text>

        {/* Row 1: Iskola */}
        <g transform="translate(0, 60)">
          <text x="90" y="20" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">Iskola:</text>
          <text x="180" y="20" textAnchor="middle" fill="#1e293b" fontSize="10.5">Aranyhegyi</text>
          <text x="260" y="20" textAnchor="middle" fill="#1e293b" fontSize="10.5">János-hegyi</text>
          <text x="340" y="20" textAnchor="middle" fill="#1e293b" fontSize="10.5">Lakihegyi</text>
          <text x="405" y="20" textAnchor="middle" fill="#1e293b" fontSize="10.5">Pál-völgyi</text>
          <line x1="25" y1="30" x2="435" y2="30" stroke="#e2e8f0" strokeWidth="1" />
        </g>

        {/* Row 2: Sapka */}
        <g transform="translate(0, 95)">
          <text x="90" y="20" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">Sapka:</text>
          <text x="180" y="20" textAnchor="middle" fill="#d97706" fontSize="10.5" fontWeight="bold">Sárga</text>
          <text x="260" y="20" textAnchor="middle" fill="#0284c7" fontSize="10.5" fontWeight="bold">Kék</text>
          <text x="340" y="20" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">Fekete</text>
          <text x="405" y="20" textAnchor="middle" fill="#dc2626" fontSize="10.5" fontWeight="bold">Piros</text>
          <line x1="25" y1="30" x2="435" y2="30" stroke="#e2e8f0" strokeWidth="1" />
        </g>

        {/* Row 3: Helyezés */}
        <g transform="translate(0, 130)">
          <text x="90" y="20" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="bold">Helyezés:</text>
          <text x="180" y="20" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="black">3. hely</text>
          <text x="260" y="20" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="black">2. hely</text>
          <text x="340" y="20" textAnchor="middle" fill="#16a34a" fontSize="11" fontWeight="black">4. hely</text>
          <text x="405" y="20" textAnchor="middle" fill="#eab308" fontSize="11" fontWeight="black">1. hely (Győztes!)</text>
        </g>
      </svg>
    </div>
  );
};

