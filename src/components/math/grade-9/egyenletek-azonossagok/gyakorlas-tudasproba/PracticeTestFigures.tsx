import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

export const AlgebraMasterySvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 240"
      width={size}
      height={(size * 240) / 400}
      className={`mx-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="masteryGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="masteryGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="masteryGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="masteryGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Center Core Circle */}
      <circle cx="200" cy="120" r="38" fill="#4f46e5" fillOpacity="0.15" stroke="#4f46e5" strokeWidth="2.5" />
      <text x="200" y="115" textAnchor="middle" fill="#4338ca" className="text-[12px] font-bold" dominantBaseline="middle">
        III. FEJEZET
      </text>
      <text x="200" y="132" textAnchor="middle" fill="#6366f1" className="text-[10px] font-semibold" dominantBaseline="middle">
        Egyenletek
      </text>

      {/* Pillar 1: Kifejezések & Azonosságok */}
      <rect x="20" y="20" width="150" height="75" rx="10" fill="url(#masteryGrad1)" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="30" y="42" fill="#6d28d9" className="text-[12px] font-bold">1. Azonosságok</text>
      <text x="30" y="60" fill="#4b5563" className="text-[10px] font-mono">(a ± b)² = a² ± 2ab + b²</text>
      <text x="30" y="76" fill="#6b7280" className="text-[9.5px]">Kiemelés, a² - b² szorzat</text>
      <line x1="170" y1="75" x2="180" y2="100" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Pillar 2: Egyenletek & Mérlegelv */}
      <rect x="230" y="20" width="150" height="75" rx="10" fill="url(#masteryGrad2)" stroke="#06b6d4" strokeWidth="1.5" />
      <text x="240" y="42" fill="#0e7490" className="text-[12px] font-bold">2. Mérlegelv & Gyök</text>
      <text x="240" y="60" fill="#4b5563" className="text-[10px] font-mono">ax + b = c ⇒ x = (c - b)/a</text>
      <text x="240" y="76" fill="#6b7280" className="text-[9.5px]">Ekvivalens átalakítások</text>
      <line x1="230" y1="75" x2="220" y2="100" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Pillar 3: É.T. & Kikötések */}
      <rect x="20" y="145" width="150" height="75" rx="10" fill="url(#masteryGrad3)" stroke="#10b981" strokeWidth="1.5" />
      <text x="30" y="167" fill="#047857" className="text-[12px] font-bold">3. É.T. & Kikötések</text>
      <text x="30" y="185" fill="#4b5563" className="text-[10px] font-mono">Nevező ≠ 0 • U, Df, M</text>
      <text x="30" y="201" fill="#6b7280" className="text-[9.5px]">Hamis gyökök kizárása</text>
      <line x1="170" y1="165" x2="180" y2="140" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Pillar 4: Rendszerek & Szöveges */}
      <rect x="230" y="145" width="150" height="75" rx="10" fill="url(#masteryGrad4)" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="240" y="167" fill="#b45309" className="text-[12px] font-bold">4. Rendszerek & Szöveg</text>
      <text x="240" y="185" fill="#4b5563" className="text-[10px] font-mono">&#123; ax+by=c, dx+ey=f &#125;</text>
      <text x="240" y="201" fill="#6b7280" className="text-[9.5px]">Behelyettesítés • Kiküszöbölés</text>
      <line x1="230" y1="165" x2="220" y2="140" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
    </svg>
  );
};

export const EquivalenceMapSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 220"
      width={size}
      height={(size * 220) / 400}
      className={`mx-auto select-none ${className}`}
    >
      {/* Green Zone: Ekvivalens */}
      <rect x="15" y="20" width="180" height="180" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
      <circle cx="45" cy="45" r="14" fill="#10b981" />
      <path d="M40 45 L44 49 L51 40" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <text x="68" y="49" fill="#065f46" className="text-[13px] font-bold">Ekvivalens Lépések</text>

      <g transform="translate(25, 75)">
        <text x="5" y="12" fill="#047857" className="text-[11px] font-semibold">✓ Mindkét oldalhoz ± k</text>
        <text x="5" y="32" fill="#047857" className="text-[11px] font-semibold">✓ Szorzás/osztás c ≠ 0-val</text>
        <text x="5" y="52" fill="#047857" className="text-[11px] font-semibold">✓ Zárójelek kibontása</text>
        <text x="5" y="72" fill="#047857" className="text-[11px] font-semibold">✓ Azonos tagok összevonása</text>
        <rect x="0" y="88" width="160" height="24" rx="6" fill="#d1fae5" />
        <text x="80" y="104" textAnchor="middle" fill="#065f46" className="text-[9.5px] font-bold">
          Megoldáshalmaz nem változik!
        </text>
      </g>

      {/* Red/Orange Zone: Nem ekvivalens */}
      <rect x="205" y="20" width="180" height="180" rx="12" fill="#fff1f2" stroke="#f43f5e" strokeWidth="2" />
      <circle cx="235" cy="45" r="14" fill="#f43f5e" />
      <line x1="229" y1="39" x2="241" y2="51" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="241" y1="39" x2="229" y2="51" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <text x="258" y="49" fill="#9f1239" className="text-[13px] font-bold">Veszélyes Műveletek</text>

      <g transform="translate(215, 75)">
        <text x="5" y="12" fill="#be123c" className="text-[11px] font-semibold">✗ Szorzás ismeretlennel</text>
        <text x="18" y="26" fill="#e11d48" className="text-[9px]">→ Hamis gyök jelenhet meg</text>
        <text x="5" y="44" fill="#be123c" className="text-[11px] font-semibold">✗ Osztás ismeretlennel</text>
        <text x="18" y="58" fill="#e11d48" className="text-[9px]">→ Gyökvesztés kockázata!</text>
        <text x="5" y="76" fill="#be123c" className="text-[11px] font-semibold">✗ Négyzetre emelés</text>
        <rect x="0" y="88" width="160" height="24" rx="6" fill="#ffe4e6" />
        <text x="80" y="104" textAnchor="middle" fill="#9f1239" className="text-[9.5px] font-bold">
          KÖTELEZŐ ellenőrzés!
        </text>
      </g>
    </svg>
  );
};

export const ProblemSolvingMapSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 230"
      width={size}
      height={(size * 230) / 400}
      className={`mx-auto select-none ${className}`}
    >
      <rect x="10" y="10" width="180" height="95" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="20" y="32" fill="#1e40af" className="text-[12px] font-bold">Életkoros Feladatok</text>
      <text x="20" y="50" fill="#374151" className="text-[10px]">Táblázat: Most és k év múlva</text>
      <text x="20" y="68" fill="#4b5563" className="text-[9.5px] font-mono">apa = x + k, fia = y + k</text>
      <text x="20" y="86" fill="#1d4ed8" className="text-[9px] font-semibold">A korkülönbség mindig állandó!</text>

      <rect x="210" y="10" width="180" height="95" rx="8" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="220" y="32" fill="#6b21a8" className="text-[12px] font-bold">Keverési / Oldatos</text>
      <text x="220" y="50" fill="#374151" className="text-[10px]">Oldott anyag megmaradása</text>
      <text x="220" y="68" fill="#4b5563" className="text-[9.5px] font-mono">m₁·p₁% + m₂·p₂% = (m₁+m₂)·p%</text>
      <text x="220" y="86" fill="#7e22ce" className="text-[9px] font-semibold">Víz hozzáadása = 0% töménység</text>

      <rect x="10" y="120" width="180" height="95" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.5" />
      <text x="20" y="142" fill="#166534" className="text-[12px] font-bold">Mozgásos Feladatok</text>
      <text x="20" y="160" fill="#374151" className="text-[10px]">Út, sebesség és idő alaptörvénye</text>
      <text x="20" y="178" fill="#4b5563" className="text-[10px] font-mono">s = v · t  ⇔  t = s / v</text>
      <text x="20" y="196" fill="#15803d" className="text-[9px] font-semibold">Szembe: v₁+v₂ • Utolérés: v₁-v₂</text>

      <rect x="210" y="120" width="180" height="95" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="220" y="142" fill="#92400e" className="text-[12px] font-bold">Számok & Munkavégzés</text>
      <text x="220" y="160" fill="#374151" className="text-[10px]">Kétjegyű szám értéke:</text>
      <text x="220" y="178" fill="#4b5563" className="text-[10px] font-mono">10a + b</text>
      <text x="220" y="196" fill="#b45309" className="text-[9px] font-semibold">1 óra alatt elvégzett munka: 1/t</text>
    </svg>
  );
};

export const LinearSystemMapSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 400 200"
      width={size}
      height={(size * 200) / 400}
      className={`mx-auto select-none ${className}`}
    >
      {/* Case 1: 1 Pont */}
      <g transform="translate(15, 20)">
        <rect x="0" y="0" width="115" height="155" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="57" y="24" textAnchor="middle" fill="#0f172a" className="text-[11px] font-bold">1 Metszéspont</text>
        {/* Axes and crossed lines */}
        <line x1="15" y1="85" x2="100" y2="85" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="57" y1="45" x2="57" y2="125" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="25" y1="110" x2="90" y2="55" stroke="#3b82f6" strokeWidth="2" />
        <line x1="25" y1="60" x2="90" y2="115" stroke="#ef4444" strokeWidth="2" />
        <circle cx="57" cy="85" r="4" fill="#10b981" />
        <text x="57" y="142" textAnchor="middle" fill="#15803d" className="text-[10px] font-bold">
          Pontosan 1 gyök
        </text>
      </g>

      {/* Case 2: Párhuzamos - Nincs mo. */}
      <g transform="translate(142, 20)">
        <rect x="0" y="0" width="115" height="155" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="57" y="24" textAnchor="middle" fill="#0f172a" className="text-[11px] font-bold">Párhuzamosak</text>
        {/* Axes and parallel lines */}
        <line x1="15" y1="85" x2="100" y2="85" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="57" y1="45" x2="57" y2="125" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="20" y1="100" x2="85" y2="45" stroke="#3b82f6" strokeWidth="2" />
        <line x1="35" y1="115" x2="100" y2="60" stroke="#ef4444" strokeWidth="2" />
        <text x="57" y="142" textAnchor="middle" fill="#b91c1c" className="text-[10px] font-bold">
          0 = k (Nincs mo.)
        </text>
      </g>

      {/* Case 3: Egybeeső - Végtelen sok mo. */}
      <g transform="translate(270, 20)">
        <rect x="0" y="0" width="115" height="155" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
        <text x="57" y="24" textAnchor="middle" fill="#0f172a" className="text-[11px] font-bold">Egybeesőek</text>
        {/* Axes and coincident line */}
        <line x1="15" y1="85" x2="100" y2="85" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="57" y1="45" x2="57" y2="125" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="25" y1="110" x2="90" y2="55" stroke="#8b5cf6" strokeWidth="4" />
        <line x1="25" y1="110" x2="90" y2="55" stroke="#ec4899" strokeWidth="2" strokeDasharray="4,3" />
        <text x="57" y="142" textAnchor="middle" fill="#6d28d9" className="text-[10px] font-bold">
          0 = 0 (Végtelen sok)
        </text>
      </g>
    </svg>
  );
};

