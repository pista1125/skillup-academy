import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. A Szöveges Feladatmegoldás 5 Lépése Diagram
export const ProblemSolvingStepsSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />

      <text x="190" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e" fontFamily="system-ui, sans-serif">
        A Szöveges Feladatmegoldás 5 Lépése
      </text>

      {/* 5 lépés folyamatábra vízszintesen */}
      {[
        { step: '1', title: 'Értelmezés', desc: 'Adatok, vázlat', x: 25 },
        { step: '2', title: 'Ismeretlen', desc: 'x kijelölése', x: 95 },
        { step: '3', title: 'Egyenlet', desc: 'Modellírás', x: 165 },
        { step: '4', title: 'Megoldás', desc: 'Mérlegelv', x: 235 },
        { step: '5', title: 'Válasz', desc: 'Szöveges ell.', x: 305 }
      ].map((item, idx) => (
        <g key={idx} transform={`translate(${item.x}, 55)`}>
          <rect width="60" height="95" rx="8" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx="30" cy="22" r="14" fill="#fbbf24" />
          <text x="30" y="27" textAnchor="middle" fontSize="12" fontWeight="black" fill="#78350f" fontFamily="monospace">
            {item.step}
          </text>
          <text x="30" y="55" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400e" fontFamily="sans-serif">
            {item.title}
          </text>
          <text x="30" y="74" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="sans-serif">
            {item.desc}
          </text>
          {idx < 4 && (
            <path d="M 64 47 L 68 47" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowAmber)" />
          )}
        </g>
      ))}

      {/* Jelmondat alul */}
      <rect x="50" y="162" width="280" height="20" rx="10" fill="#fef3c7" />
      <text x="190" y="176" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b45309" fontFamily="sans-serif">
        Mindig a szövegbe helyettesítünk vissza, nem az egyenletbe!
      </text>
    </svg>
  );
};

// 2. Életkoros Feladat Táblázatos Modell
export const AgeProblemTableSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412" fontFamily="system-ui, sans-serif">
        Életkoros Feladat: Táblázatos Modell
      </text>

      {/* Táblázat */}
      <g transform="translate(30, 45)">
        {/* Fejléc */}
        <rect x="0" y="0" width="320" height="28" rx="6" fill="#fb923c" />
        <text x="50" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif">Személy</text>
        <text x="160" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif">Mostani életkor</text>
        <text x="260" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif">6 év múlva (+6)</text>

        {/* Anya sor */}
        <rect x="0" y="32" width="320" height="30" rx="4" fill="#ffffff" stroke="#ffedd5" />
        <text x="50" y="52" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ea580c" fontFamily="sans-serif">Anya</text>
        <text x="160" y="52" textAnchor="middle" fontSize="12" fontWeight="black" fill="#1e293b" fontFamily="monospace">3x</text>
        <text x="260" y="52" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ea580c" fontFamily="monospace">3x + 6</text>

        {/* Fiú sor */}
        <rect x="0" y="66" width="320" height="30" rx="4" fill="#ffffff" stroke="#ffedd5" />
        <text x="50" y="86" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0284c7" fontFamily="sans-serif">Fiú</text>
        <text x="160" y="86" textAnchor="middle" fontSize="12" fontWeight="black" fill="#1e293b" fontFamily="monospace">x</text>
        <text x="260" y="86" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0284c7" fontFamily="monospace">x + 6</text>
      </g>

      {/* Felállított egyenlet a táblázat alatt */}
      <g transform="translate(45, 148)">
        <rect width="290" height="28" rx="8" fill="#ffedd5" stroke="#fb923c" strokeWidth="1.5" />
        <text x="145" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412" fontFamily="monospace">
          Egyenlet 6 év múlva: 3x + 6 = 2·(x + 6)
        </text>
      </g>
    </svg>
  );
};

// 3. Keverési és Százalékszámításos Modell
export const MixtureProblemSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fefce8" stroke="#fef08a" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e" fontFamily="system-ui, sans-serif">
        Keverési Feladat: Tiszta Hatóanyag Megmaradása
      </text>

      {/* Edény 1 */}
      <g transform="translate(30, 48)">
        <rect width="70" height="75" rx="6" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.5" />
        <rect y="35" width="70" height="40" rx="4" fill="#fef08a" opacity="0.8" />
        <text x="35" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#854d0e" fontFamily="sans-serif">1. Oldat</text>
        <text x="35" y="52" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713f12" fontFamily="monospace">200 g</text>
        <text x="35" y="66" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ca8a04" fontFamily="sans-serif">15%</text>
      </g>

      {/* Plusz jel */}
      <text x="115" y="92" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#a16207" fontFamily="sans-serif">+</text>

      {/* Edény 2 */}
      <g transform="translate(130, 48)">
        <rect width="70" height="75" rx="6" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.5" />
        <rect y="25" width="70" height="50" rx="4" fill="#fde047" opacity="0.8" />
        <text x="35" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#854d0e" fontFamily="sans-serif">2. Oldat</text>
        <text x="35" y="52" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713f12" fontFamily="monospace">x g</text>
        <text x="35" y="66" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ca8a04" fontFamily="sans-serif">30%</text>
      </g>

      {/* Egyenlőségjel */}
      <text x="215" y="92" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#a16207" fontFamily="sans-serif">=</text>

      {/* Keverék edény */}
      <g transform="translate(230, 44)">
        <rect width="115" height="82" rx="8" fill="#ffffff" stroke="#eab308" strokeWidth="2" />
        <rect y="28" width="115" height="54" rx="6" fill="#facc15" opacity="0.7" />
        <text x="57" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#854d0e" fontFamily="sans-serif">ÚJ Keverék</text>
        <text x="57" y="50" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12" fontFamily="monospace">(200 + x) g</text>
        <text x="57" y="68" textAnchor="middle" fontSize="11" fontWeight="black" fill="#ca8a04" fontFamily="sans-serif">25% töménység</text>
      </g>

      {/* Egyenlet az alján */}
      <g transform="translate(30, 142)">
        <rect width="320" height="34" rx="8" fill="#fef9c3" stroke="#eab308" strokeWidth="1" />
        <text x="160" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#854d0e" fontFamily="sans-serif">
          Hatóanyag-mérleg:
        </text>
        <text x="160" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12" fontFamily="monospace">
          200 · 0,15 + x · 0,30 = (200 + x) · 0,25
        </text>
      </g>
    </svg>
  );
};

// 4. Mozgásos Feladat Diagram (s = v * t)
export const MotionProblemSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />

      <text x="190" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e" fontFamily="system-ui, sans-serif">
        Mozgásos Feladat: Szembejövő Járművek (s = v · t)
      </text>

      {/* Útszakasz vonal */}
      <g transform="translate(35, 75)">
        <line x1="0" y1="20" x2="310" y2="20" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

        {/* Város A */}
        <circle cx="0" cy="20" r="7" fill="#2563eb" />
        <text x="0" y="5" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af" fontFamily="sans-serif">„A” Város</text>

        {/* Város B */}
        <circle cx="310" cy="20" r="7" fill="#dc2626" />
        <text x="310" y="5" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b" fontFamily="sans-serif">„B” Város</text>

        {/* Jármű 1 (Kék) */}
        <rect x="15" y="-5" width="55" height="18" rx="4" fill="#3b82f6" />
        <text x="42" y="8" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif">70 km/h →</text>
        <path d="M 0 20 L 175 20" stroke="#3b82f6" strokeWidth="3" />

        {/* Jármű 2 (Piros) */}
        <rect x="240" y="-5" width="55" height="18" rx="4" fill="#ef4444" />
        <text x="267" y="8" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif">← 80 km/h</text>
        <path d="M 310 20 L 175 20" stroke="#ef4444" strokeWidth="3" />

        {/* Találkozási pont */}
        <circle cx="175" cy="20" r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
        <text x="175" y="42" textAnchor="middle" fontSize="10" fontWeight="black" fill="#b45309" fontFamily="sans-serif">Metszéspont (Találkozás)</text>

        {/* Teljes távolság jelzés alul */}
        <line x1="0" y1="52" x2="310" y2="52" stroke="#64748b" strokeWidth="1" strokeDasharray="3,3" />
        <text x="155" y="62" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569" fontFamily="monospace">Teljes táv: s_össz = 300 km</text>
      </g>

      {/* Egyenlet doboz */}
      <g transform="translate(50, 150)">
        <rect width="280" height="26" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
        <text x="140" y="17" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e" fontFamily="monospace">
          s₁ + s₂ = s_össz → 70·t + 80·t = 300 → t = 2 óra
        </text>
      </g>
    </svg>
  );
};
