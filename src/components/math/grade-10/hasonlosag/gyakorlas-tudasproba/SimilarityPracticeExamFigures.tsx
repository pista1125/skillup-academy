import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Átfogó fejezeti fogalmi háló (Synthesis Concept Map)
export const SynthesisConceptMapSvg: React.FC<FigureProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 340"
      width={size}
      height={size * 0.68}
      className={`mx-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="conceptBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
        </linearGradient>
        <marker id="conceptArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#8b5cf6" />
        </marker>
      </defs>

      <rect x="10" y="10" width="480" height="320" rx="16" fill="url(#conceptBg)" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="250" y="32" textAnchor="middle" fill="#6d28d9" fontSize="13" fontWeight="bold">
        IX. HASONLÓSÁG – FEJEZETI TUDÁSSZINT-TÉRKÉP
      </text>

      {/* Központi csomópont */}
      <rect x="175" y="50" width="150" height="42" rx="10" fill="#7c3aed" />
      <text x="250" y="70" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Hasonlóság (λ)</text>
      <text x="250" y="85" textAnchor="middle" fill="#ddd6fe" fontSize="10">K = λ·K₀, T = λ²·T₀</text>

      {/* 4 fő ág */}
      {/* 1. Alapelemek & Transzformációk */}
      <path d="M 180 85 L 85 130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#conceptArrow)" />
      <rect x="20" y="130" width="130" height="60" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="85" y="150" textAnchor="middle" fill="#5b21b6" fontSize="11" fontWeight="bold">Transzformációk</text>
      <text x="85" y="166" textAnchor="middle" fill="#4c1d95" fontSize="9.5">Középpontos nagyítás</text>
      <text x="85" y="180" textAnchor="middle" fill="#6b7280" fontSize="9">Fixpont, λ &gt; 0 / λ &lt; 0</text>

      {/* 2. Párhuzamos szelők */}
      <path d="M 215 92 L 180 130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#conceptArrow)" />
      <rect x="130" y="130" width="110" height="60" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
      <text x="185" y="150" textAnchor="middle" fill="#3730a3" fontSize="11" fontWeight="bold">Szelőtétel</text>
      <text x="185" y="166" textAnchor="middle" fill="#312e81" fontSize="9.5">a/b = a'/b'</text>
      <text x="185" y="180" textAnchor="middle" fill="#6b7280" fontSize="9">Szakaszosztás, trapéz</text>

      {/* 3. Háromszöghasonlóság */}
      <path d="M 285 92 L 320 130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#conceptArrow)" />
      <rect x="260" y="130" width="110" height="60" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
      <text x="315" y="150" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">4 Alapeset</text>
      <text x="315" y="166" textAnchor="middle" fill="#047857" fontSize="9.5">sz-sz, o-o-o</text>
      <text x="315" y="180" textAnchor="middle" fill="#6b7280" fontSize="9">o-sz-o, o-o-sz</text>

      {/* 4. Metrikus tételek & Vonalak */}
      <path d="M 320 85 L 415 130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#conceptArrow)" />
      <rect x="350" y="130" width="130" height="60" rx="8" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="415" y="150" textAnchor="middle" fill="#9f1239" fontSize="11" fontWeight="bold">Metrikus tételek</text>
      <text x="415" y="166" textAnchor="middle" fill="#be123c" fontSize="9.5">m = √(pq), a = √(pc)</text>
      <text x="415" y="180" textAnchor="middle" fill="#6b7280" fontSize="9">Pitagorasz levezetés</text>

      {/* Alsó szintézis szint: Alkalmazások & Térbeli arányok */}
      <path d="M 85 190 L 140 235" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 185 190 L 195 235" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 315 190 L 305 235" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M 415 190 L 360 235" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 3" />

      <rect x="90" y="235" width="320" height="75" rx="12" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
      <text x="250" y="255" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">Gyakorlat és Térbeli Geometria</text>
      <text x="250" y="273" textAnchor="middle" fill="#334155" fontSize="10.5">
        Árnyékmérés & Tükörmódszer • Térképek, tervrajzok
      </text>
      <text x="250" y="291" textAnchor="middle" fill="#64748b" fontSize="10">
        Gúla síkmetszete & Csonkagúla: A_fed/A_alap = λ², V = λ³·V₀
      </text>
    </svg>
  );
};

// 2. Szabályos hatszög és belső háromszögek (tankönyv 138. o.)
export const HexagonTrianglesSimilaritySvg: React.FC<FigureProps> = ({ size = 300, className = '' }) => {
  // Szabályos hatszög csúcsai R = 110 sugárral (középpont: 200, 160)
  const cx = 200;
  const cy = 160;
  const r = 105;
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 30) * (Math.PI / 180);
    points.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
  }
  const ptsStr = points.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  // Átlók: p0-p3 (hosszú), p0-p2 (rövid), p0-p4 (rövid)
  // Metszéspontok: háromszög zöld (A B F környékén), rózsaszín
  return (
    <svg viewBox="0 0 400 320" width={size} height={size * 0.8} className={`mx-auto select-none ${className}`}>
      <defs>
        <linearGradient id="hexGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="hexPink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e11d48" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="380" height="300" rx="12" fill="#fcfcfd" stroke="#e2e8f0" strokeWidth="1" />
      <text x="200" y="30" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">
        Szabályos hatszög átlói és hasonló háromszögei (a = 6 cm)
      </text>

      {/* Szabályos hatszög */}
      <polygon points={ptsStr} fill="#f1f5f9" stroke="#334155" strokeWidth="2.5" />

      {/* Színezett részháromszögek az átlók által */}
      {/* Zöld háromszög: p1, p2, p0 */}
      <polygon
        points={`${points[0].x},${points[0].y} ${points[1].x},${points[1].y} ${points[2].x},${points[2].y}`}
        fill="url(#hexGreen)"
        stroke="#059669"
        strokeWidth="1.5"
      />
      {/* Rózsaszín háromszög: p0, p3, p4 fele */}
      <polygon
        points={`${points[3].x},${points[3].y} ${points[4].x},${points[4].y} ${points[5].x},${points[5].y}`}
        fill="url(#hexPink)"
        stroke="#e11d48"
        strokeWidth="1.5"
      />

      {/* Átlók berajzolása */}
      <line x1={points[0].x} y1={points[0].y} x2={points[3].x} y2={points[3].y} stroke="#4f46e5" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={points[0].x} y1={points[0].y} x2={points[2].x} y2={points[2].y} stroke="#059669" strokeWidth="2" />
      <line x1={points[0].x} y1={points[0].y} x2={points[4].x} y2={points[4].y} stroke="#e11d48" strokeWidth="2" />
      <line x1={points[1].x} y1={points[1].y} x2={points[4].x} y2={points[4].y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Csúcsok címkéi */}
      {points.map((p, i) => {
        const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
        const dx = (p.x - cx) * 0.15;
        const dy = (p.y - cy) * 0.15;
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4.5" fill="#1e293b" />
            <text x={p.x + dx} y={p.y + dy + 4} textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">
              {labels[i]}
            </text>
          </g>
        );
      })}

      {/* Magyarázat */}
      <rect x="25" y="250" width="350" height="48" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="35" y="270" fill="#047857" fontSize="10.5" fontWeight="bold">
        • ΔABC ~ ΔDEF (sz-sz alapeset, szögeik: 30°, 30°, 120°)
      </text>
      <text x="35" y="286" fill="#334155" fontSize="10">
        • Oldalak: a = 6 cm, rövid átló: d = a√3 ≈ 10,39 cm, arány: λ = 1
      </text>
    </svg>
  );
};

// 3. Tükörmódszeres magasságmérés (tankönyv 138. o., járókelő és közlekedési lámpa)
export const MirrorReflectionMeasurementSvg: React.FC<FigureProps> = ({ size = 300, className = '' }) => {
  return (
    <svg viewBox="0 0 460 280" width={size} height={size * 0.61} className={`mx-auto select-none ${className}`}>
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0f9ff" />
          <stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <marker id="reflRay" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 2 L 8 5 L 0 8 z" fill="#f59e0b" />
        </marker>
      </defs>

      <rect x="10" y="10" width="440" height="260" rx="12" fill="url(#skyGrad)" stroke="#bae6fd" strokeWidth="1" />
      <text x="230" y="30" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="bold">
        Közvetett magasságmérés vízszintes tükörrel (Optikai hasonlóság)
      </text>

      {/* Talajvonal */}
      <line x1="25" y1="220" x2="435" y2="220" stroke="#475569" strokeWidth="3" />

      {/* Tükör a talajon */}
      <rect x="160" y="217" width="40" height="6" rx="2" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
      <text x="180" y="238" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">Tükör (T)</text>

      {/* Járókelő (bal oldalon, szemmagasság h = 184 cm = 1.84 m, távolság d1 = 1.6 m) */}
      <line x1="100" y1="220" x2="100" y2="135" stroke="#3b82f6" strokeWidth="3" />
      <path d="M 100 206 A 14 14 0 0 1 114 220" fill="none" stroke="#3b82f6" strokeWidth="1.4" />
      <circle cx="105.5" cy="214.5" r="1.5" fill="#3b82f6" />
      <circle cx="100" cy="130" r="7" fill="#3b82f6" />
      {/* Szem magassága jelölve */}
      <line x1="85" y1="135" x2="115" y2="135" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
      <text x="75" y="175" textAnchor="end" fill="#1d4ed8" fontSize="10" fontWeight="bold">184 cm</text>

      {/* Közlekedési lámpa (jobb oldalon, távolság d2 = 5.6 m, magasság M = ?) */}
      <rect x="360" y="60" width="8" height="160" fill="#64748b" />
      <path d="M 346 220 A 14 14 0 0 1 360 206" fill="none" stroke="#475569" strokeWidth="1.4" />
      <circle cx="354.5" cy="214.5" r="1.5" fill="#475569" />
      {/* Lámpatest */}
      <rect x="354" y="45" width="20" height="42" rx="4" fill="#1e293b" />
      <circle cx="364" cy="55" r="4" fill="#ef4444" />
      <circle cx="364" cy="66" r="4" fill="#eab308" />
      <circle cx="364" cy="77" r="4" fill="#22c55e" />
      <text x="390" y="60" fill="#b91c1c" fontSize="11" fontWeight="bold">M = ?</text>

      {/* Fénysugarak a tükörbe és a szembe (α = β a visszaverődés törvénye miatt) */}
      <line x1="364" y1="45" x2="180" y2="217" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#reflRay)" />
      <line x1="180" y1="217" x2="100" y2="135" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#reflRay)" />

      {/* Szögek a tükörnél */}
      <path d="M 160 220 A 20 20 0 0 1 170 210" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="162" y="208" fill="#d97706" fontSize="9">α</text>
      <path d="M 200 220 A 20 20 0 0 0 190 210" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="195" y="208" fill="#d97706" fontSize="9">β = α</text>

      {/* Távolságméretek a talajon */}
      {/* d1 = 1.6 m */}
      <line x1="100" y1="250" x2="180" y2="250" stroke="#64748b" strokeWidth="1" />
      <text x="140" y="262" textAnchor="middle" fill="#475569" fontSize="10">1,6 m</text>
      {/* d2 = 5.6 m */}
      <line x1="180" y1="250" x2="364" y2="250" stroke="#64748b" strokeWidth="1" />
      <text x="272" y="262" textAnchor="middle" fill="#475569" fontSize="10">5,6 m</text>

      {/* Képlet felirat */}
      <rect x="250" y="100" width="160" height="42" rx="6" fill="#ffffff" stroke="#f59e0b" strokeWidth="1" />
      <text x="330" y="117" textAnchor="middle" fill="#b45309" fontSize="10" fontWeight="bold">M / 184 = 5,6 / 1,6</text>
      <text x="330" y="132" textAnchor="middle" fill="#1e293b" fontSize="10">M = 184 · 3,5 = 644 cm (6,44 m)</text>
    </svg>
  );
};

// 4. Gúla síkmetszete és csonkagúla kiegészítése (tankönyv 138–139. o.)
export const TruncatedPyramidSectionsSvg: React.FC<FigureProps> = ({ size = 300, className = '' }) => {
  return (
    <svg viewBox="0 0 420 300" width={size} height={size * 0.71} className={`mx-auto select-none ${className}`}>
      <defs>
        <linearGradient id="pyrBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="pyrTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#9333ea" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="400" height="280" rx="12" fill="#fafafa" stroke="#e5e7eb" strokeWidth="1" />
      <text x="210" y="30" textAnchor="middle" fill="#4338ca" fontSize="12" fontWeight="bold">
        Gúla síkmetszete & Hasonló testek arányai (λ, λ², λ³)
      </text>

      {/* Csúcs P */}
      <circle cx="210" cy="55" r="4.5" fill="#4338ca" />
      <text x="210" y="48" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="bold">P (csúcs)</text>

      {/* Magasságvonal */}
      <line x1="210" y1="55" x2="210" y2="235" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2" />

      {/* Fedőlap / Metszősík (felső harmadolópont m1 = 4 cm / 12 cm -> arány 1/3) */}
      <polygon points="175,115 245,115 260,130 190,130" fill="url(#pyrTopGrad)" stroke="#9333ea" strokeWidth="1.5" />
      <line x1="210" y1="55" x2="175" y2="115" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="210" y1="55" x2="245" y2="115" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="210" y1="55" x2="260" y2="130" stroke="#7c3aed" strokeWidth="1.5" />
      <line x1="210" y1="55" x2="190" y2="130" stroke="#7c3aed" strokeWidth="1.5" />

      {/* Alsó alaplap (12 cm x 12 cm) */}
      <polygon points="105,235 315,235 360,265 150,265" fill="url(#pyrBaseGrad)" stroke="#4f46e5" strokeWidth="2" />
      <line x1="175" y1="115" x2="105" y2="235" stroke="#4f46e5" strokeWidth="1.5" />
      <line x1="245" y1="115" x2="315" y2="235" stroke="#4f46e5" strokeWidth="1.5" />
      <line x1="260" y1="130" x2="360" y2="265" stroke="#4f46e5" strokeWidth="2" />
      <line x1="190" y1="130" x2="150" y2="265" stroke="#4f46e5" strokeWidth="1.5" />

      {/* Magasság jelölések bal oldalon */}
      {/* Felső magasság 4 cm */}
      <line x1="60" y1="55" x2="60" y2="122" stroke="#6b7280" strokeWidth="1" />
      <text x="50" y="92" textAnchor="end" fill="#6b7280" fontSize="10">m₁ = 4 cm</text>
      {/* Alsó magasság 8 cm */}
      <line x1="60" y1="122" x2="60" y2="235" stroke="#6b7280" strokeWidth="1" />
      <text x="50" y="180" textAnchor="end" fill="#6b7280" fontSize="10">m_csonka = 8 cm</text>
      {/* Teljes magasság 12 cm */}
      <line x1="30" y1="55" x2="30" y2="235" stroke="#dc2626" strokeWidth="1.5" />
      <text x="22" y="145" textAnchor="end" fill="#dc2626" fontSize="10.5" fontWeight="bold">M = 12 cm</text>

      {/* Eredmények panel jobbra */}
      <rect x="275" y="70" width="130" height="95" rx="6" fill="#ffffff" stroke="#cbd5e1" />
      <text x="285" y="90" fill="#4338ca" fontSize="10" fontWeight="bold">Hasonlósági adatok:</text>
      <text x="285" y="106" fill="#334155" fontSize="9.5">• λ = m₁/M = 4/12 = 1/3</text>
      <text x="285" y="122" fill="#334155" fontSize="9.5">• a_kis = (1/3)·12 = 4 cm</text>
      <text x="285" y="138" fill="#334155" fontSize="9.5">• T_kis / T_nagy = (1/3)² = 1/9</text>
      <text x="285" y="154" fill="#334155" fontSize="9.5">• V_kis / V_nagy = (1/3)³ = 1/27</text>
    </svg>
  );
};

// 5. Pyraminx logikai játék és szabályos tetraéder felosztása (tankönyv 139. o.)
export const PyraminxSimilaritySvg: React.FC<FigureProps> = ({ size = 300, className = '' }) => {
  return (
    <svg viewBox="0 0 380 290" width={size} height={size * 0.76} className={`mx-auto select-none ${className}`}>
      <rect x="10" y="10" width="360" height="270" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="190" y="30" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
        Pyraminx Tetraéder: Felbontás & Területskálázás
      </text>

      {/* Egy háromszöglap felosztása 9 kisebb egyenlő szabályos háromszögre (3 szint) */}
      {/* Csúcsok: T(190, 50), BL(70, 230), BR(310, 230) */}
      {/* 1. szint: 1 db kék háromszög fenn */}
      <polygon points="190,50 150,110 230,110" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
      <text x="190" y="95" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">A₁</text>

      {/* 2. szint: 3 db háromszög (2 álló sárga, 1 fordított zöld) */}
      <polygon points="150,110 110,170 190,170" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      <polygon points="230,110 190,170 270,170" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      <polygon points="150,110 230,110 190,170" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />

      {/* 3. szint: 5 db háromszög */}
      <polygon points="110,170 70,230 150,230" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
      <polygon points="190,170 150,230 230,230" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
      <polygon points="270,170 230,230 310,230" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
      <polygon points="110,170 190,170 150,230" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
      <polygon points="270,170 190,170 230,230" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />

      {/* Fő körvonal */}
      <polygon points="190,50 70,230 310,230" fill="none" stroke="#0f172a" strokeWidth="2.5" />

      {/* Címkék és magyarázat */}
      <rect x="25" y="240" width="330" height="32" rx="6" fill="#ffffff" stroke="#cbd5e1" />
      <text x="190" y="260" textAnchor="middle" fill="#334155" fontSize="10.5">
        Ha az élhossz 1,5-szeres (λ = 1,5) ➔ Felület: λ² = 1,5² = <tspan fill="#b91c1c" fontWeight="bold">2,25-szörös</tspan>!
      </text>
    </svg>
  );
};

