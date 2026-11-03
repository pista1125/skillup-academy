import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Segédfüggvény: Matematikailag tökéletes, sima hiperbola ág generálása
 * x(u) = c * exp(u), y(u) = (k / x)
 * u változó egyenletes léptetése tökéletes görbületet és pontsűrűséget biztosít!
 */
function createHyperbolaBranchPath(
  k: number,
  isPositiveX: boolean,
  originX: number,
  originY: number,
  scale: number,
  yMinLimit: number,
  yMaxLimit: number,
  xMinLimit: number,
  xMaxLimit: number
): string {
  const points: [number, number][] = [];
  const c = Math.sqrt(Math.abs(k));
  // u a görbület körül (-1.8-tól 1.8-ig)
  const uMin = -1.9;
  const uMax = 1.9;
  const steps = 40;

  for (let i = 0; i <= steps; i++) {
    const u = uMin + (uMax - uMin) * (i / steps);
    const absX = c * Math.exp(u);
    const x = isPositiveX ? absX : -absX;
    const y = k / x;

    const svgX = originX + x * scale;
    const svgY = originY - y * scale;

    // Csak a megengedett tartományba eső pontokat tartjuk meg
    if (
      svgY >= yMinLimit &&
      svgY <= yMaxLimit &&
      svgX >= xMinLimit &&
      svgX <= xMaxLimit
    ) {
      points.push([svgX, svgY]);
    }
  }

  if (points.length < 2) return '';
  return points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(' ');
}

/**
 * Szemléltető ábra: Egyenes arányosság f(x) = k * x (origón átmenő egyenes, irányszög, meredekség)
 */
export const DirectProportionalitySvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  const ox = 150;
  const oy = 135;
  const unit = 26;

  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 340 255"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Kártya háttér */}
      <rect x="8" y="8" width="324" height="239" fill="#f8fafc" rx="12" stroke="#cbd5e1" strokeWidth="1.2" />

      {/* Finom koordináta-háló */}
      {[-4, -3, -2, -1, 1, 2, 3, 4, 5, 6].map((i) => (
        <React.Fragment key={`grid-dir-${i}`}>
          <line x1={ox + i * unit} y1="18" x2={ox + i * unit} y2="238" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="18" y1={oy - i * unit} x2="322" y2={oy - i * unit} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
        </React.Fragment>
      ))}

      {/* Főtengelyek nyíllal */}
      <line x1="18" y1={oy} x2="322" y2={oy} stroke="#475569" strokeWidth="1.8" />
      <polygon points="322,135 314,131 314,139" fill="#475569" />
      <text x="314" y="126" fill="#475569" fontSize="11" fontWeight="bold">x</text>

      <line x1={ox} y1="238" x2={ox} y2="18" stroke="#475569" strokeWidth="1.8" />
      <polygon points="150,18 146,26 154,26" fill="#475569" />
      <text x="156" y="26" fill="#475569" fontSize="11" fontWeight="bold">y</text>

      {/* Skálaosztások és számok */}
      {[-3, -2, -1, 1, 2, 3, 4].map((val) => (
        <React.Fragment key={`tick-dir-${val}`}>
          <line x1={ox + val * unit} y1={oy - 3} x2={ox + val * unit} y2={oy + 3} stroke="#475569" strokeWidth="1.2" />
          <text x={ox + val * unit} y={oy + 14} fill="#64748b" fontSize="8.5" textAnchor="middle">{val}</text>
        </React.Fragment>
      ))}
      {[-3, -2, -1, 1, 2, 3].map((val) => (
        <React.Fragment key={`tick-dir-y-${val}`}>
          <line x1={ox - 3} y1={oy - val * unit} x2={ox + 3} y2={oy - val * unit} stroke="#475569" strokeWidth="1.2" />
          <text x={ox - 8} y={oy - val * unit + 3} fill="#64748b" fontSize="8.5" textAnchor="end">{val}</text>
        </React.Fragment>
      ))}

      {/* Egyenes: f(x) = 1.25 * x (k = 1.25) */}
      <line
        x1={ox - 3.8 * unit}
        y1={oy + 3.8 * 1.25 * unit}
        x2={ox + 3.4 * unit}
        y2={oy - 3.4 * 1.25 * unit}
        stroke="#0284c7"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Irányháromszög a meredekséghez: (1; 1.25) -> (2; 1.25) -> (2; 2.5) */}
      <line x1={ox + 1 * unit} y1={oy - 1.25 * unit} x2={ox + 2 * unit} y2={oy - 1.25 * unit} stroke="#059669" strokeWidth="1.8" strokeDasharray="3 2" />
      <text x={ox + 1.5 * unit} y={oy - 1.25 * unit + 12} fill="#059669" fontSize="8.5" fontWeight="bold" textAnchor="middle">+1 lépés</text>

      <line x1={ox + 2 * unit} y1={oy - 1.25 * unit} x2={ox + 2 * unit} y2={oy - 2.5 * unit} stroke="#0284c7" strokeWidth="1.8" strokeDasharray="3 2" />
      <text x={ox + 2 * unit + 4} y={oy - 1.85 * unit} fill="#0284c7" fontSize="8.5" fontWeight="bold">+k meredekség</text>

      {/* Mintapontok */}
      <circle cx={ox + 1 * unit} cy={oy - 1.25 * unit} r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
      <text x={ox + 1 * unit - 8} y={oy - 1.25 * unit - 6} fill="#0369a1" fontSize="9" fontWeight="bold">(1; k)</text>

      <circle cx={ox + 2 * unit} cy={oy - 2.5 * unit} r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
      <text x={ox + 2 * unit + 8} y={oy - 2.5 * unit + 4} fill="#0369a1" fontSize="9" fontWeight="bold">(2; 2k)</text>

      {/* Origó (0; 0) kiemelten - az egyenes arányosság védjegye */}
      <circle cx={ox} cy={oy} r="4.5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
      <text x={ox - 10} y={oy + 14} fill="#0369a1" fontSize="9.5" fontWeight="black">O(0; 0)</text>

      {/* Képlet kártya */}
      <rect x="18" y="18" width="122" height="46" fill="#f0f9ff" rx="8" stroke="#bae6fd" strokeWidth="1.2" />
      <text x="79" y="34" fill="#0369a1" fontSize="9" fontWeight="900" textAnchor="middle">EGYENES ARÁNYOSSÁG</text>
      <text x="79" y="51" fill="#0284c7" fontSize="12" fontWeight="black" textAnchor="middle">y = k · x (y / x = k)</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Fordított arányosság g(x) = k / x (kétágú hiperbola, aszimptoták)
 */
export const InverseProportionalitySvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  const ox = 165;
  const oy = 130;
  const unit = 26;
  const kVal = 2.0;

  const branchPos = createHyperbolaBranchPath(kVal, true, ox, oy, unit, 25, 235, 25, 315);
  const branchNeg = createHyperbolaBranchPath(kVal, false, ox, oy, unit, 25, 235, 25, 315);

  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 340 255"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Kártya háttér */}
      <rect x="8" y="8" width="324" height="239" fill="#f8fafc" rx="12" stroke="#cbd5e1" strokeWidth="1.2" />

      {/* Finom koordináta-háló */}
      {[-4, -3, -2, -1, 1, 2, 3, 4, 5].map((i) => (
        <React.Fragment key={`grid-inv-${i}`}>
          <line x1={ox + i * unit} y1="18" x2={ox + i * unit} y2="238" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="18" y1={oy - i * unit} x2="322" y2={oy - i * unit} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
        </React.Fragment>
      ))}

      {/* Aszimptota kiemelések a tengelyeken (halvány lila szaggatott sáv) */}
      <line x1="18" y1={oy} x2="322" y2={oy} stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" opacity="0.4" />
      <line x1={ox} y1="18" x2={ox} y2="238" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3" opacity="0.4" />

      {/* Főtengelyek nyíllal */}
      <line x1="18" y1={oy} x2="322" y2={oy} stroke="#475569" strokeWidth="1.8" />
      <polygon points="322,130 314,126 314,134" fill="#475569" />
      <text x="314" y="121" fill="#475569" fontSize="11" fontWeight="bold">x</text>

      <line x1={ox} y1="238" x2={ox} y2="18" stroke="#475569" strokeWidth="1.8" />
      <polygon points="165,18 161,26 169,26" fill="#475569" />
      <text x="171" y="26" fill="#475569" fontSize="11" fontWeight="bold">y</text>

      {/* Skálaosztások és számok */}
      {[-3, -2, -1, 1, 2, 3, 4].map((val) => (
        <React.Fragment key={`tick-inv-${val}`}>
          <line x1={ox + val * unit} y1={oy - 3} x2={ox + val * unit} y2={oy + 3} stroke="#475569" strokeWidth="1.2" />
          <text x={ox + val * unit} y={oy + 14} fill="#64748b" fontSize="8.5" textAnchor="middle">{val}</text>
        </React.Fragment>
      ))}
      {[-3, -2, -1, 1, 2, 3].map((val) => (
        <React.Fragment key={`tick-inv-y-${val}`}>
          <line x1={ox - 3} y1={oy - val * unit} x2={ox + 3} y2={oy - val * unit} stroke="#475569" strokeWidth="1.2" />
          <text x={ox - 8} y={oy - val * unit + 3} fill="#64748b" fontSize="8.5" textAnchor="end">{val}</text>
        </React.Fragment>
      ))}

      {/* Hiperbola ágak: gyönyörű lila folytonos görbék */}
      <path d={branchPos} fill="none" stroke="#9333ea" strokeWidth="3" strokeLinecap="round" />
      <path d={branchNeg} fill="none" stroke="#9333ea" strokeWidth="3" strokeLinecap="round" />

      {/* Pontok és szaggatott koordinátavonalak az I. síknegyedben: k = 2 */}
      {/* Pont: (1; 2) */}
      <line x1={ox + 1 * unit} y1={oy} x2={ox + 1 * unit} y2={oy - 2 * unit} stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2" />
      <line x1={ox} y1={oy - 2 * unit} x2={ox + 1 * unit} y2={oy - 2 * unit} stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx={ox + 1 * unit} cy={oy - 2 * unit} r="4" fill="#9333ea" stroke="#ffffff" strokeWidth="1.5" />
      <text x={ox + 1 * unit + 6} y={oy - 2 * unit - 4} fill="#7e22ce" fontSize="9" fontWeight="bold">(1; 2)</text>

      {/* Pont: (2; 1) */}
      <line x1={ox + 2 * unit} y1={oy} x2={ox + 2 * unit} y2={oy - 1 * unit} stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2" />
      <line x1={ox} y1={oy - 1 * unit} x2={ox + 2 * unit} y2={oy - 1 * unit} stroke="#c084fc" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx={ox + 2 * unit} cy={oy - 1 * unit} r="4" fill="#9333ea" stroke="#ffffff" strokeWidth="1.5" />
      <text x={ox + 2 * unit + 6} y={oy - 1 * unit - 4} fill="#7e22ce" fontSize="9" fontWeight="bold">(2; 1)</text>

      {/* Szimmetrikus pont a III. síknegyedben: (-1; -2) */}
      <circle cx={ox - 1 * unit} cy={oy + 2 * unit} r="4" fill="#9333ea" stroke="#ffffff" strokeWidth="1.5" />
      <text x={ox - 1 * unit - 38} y={oy + 2 * unit + 10} fill="#7e22ce" fontSize="8.5" fontWeight="bold">(-1; -2)</text>

      {/* Aszimptota feliratok */}
      <text x="316" y={oy - 6} fill="#9333ea" fontSize="8" fontWeight="bold" textAnchor="end">
        y = 0 aszimptota
      </text>
      <text x={ox + 6} y="38" fill="#9333ea" fontSize="8" fontWeight="bold">
        x = 0 aszimptota
      </text>

      {/* Képlet kártya */}
      <rect x="18" y="18" width="124" height="46" fill="#faf5ff" rx="8" stroke="#e9d5ff" strokeWidth="1.2" />
      <text x="80" y="34" fill="#7e22ce" fontSize="9" fontWeight="900" textAnchor="middle">FORDÍTOTT ARÁNYOSSÁG</text>
      <text x="80" y="51" fill="#9333ea" fontSize="12" fontWeight="black" textAnchor="middle">g(x) = 2 / x (x · y = 2)</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Összehasonlítás Egyenes vs Fordított arányosság
 * Két szimmetrikus kártya, tökéletes rácsozattal, tiszta tengelyekkel és harmonikus hiperbolával
 */
export const ProportionalityComparisonSvg: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  // Bal kártya origó: (90, 115), skála: 1 egység = 22px
  // Jobb kártya origó: (265, 115), skála: 1 egység = 22px
  const ox1 = 90;
  const oy1 = 115;
  const ox2 = 265;
  const oy2 = 115;
  const scale = 22;

  // k = 1.0 a jobb oldali hiperbolához (tökéletes arányos görbület [-2.5; 2.5] tartományban)
  const miniBranchPos = createHyperbolaBranchPath(1.0, true, ox2, oy2, scale, 54, 172, 195, 335);
  const miniBranchNeg = createHyperbolaBranchPath(1.0, false, ox2, oy2, scale, 54, 172, 195, 335);

  return (
    <svg
      width={size}
      height={size * 0.68}
      viewBox="0 0 360 245"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ---------------- BAL KÁRTYA: EGYENES ARÁNYOSSÁG ---------------- */}
      <rect x="8" y="8" width="166" height="228" fill="#f0f9ff" rx="12" stroke="#bae6fd" strokeWidth="1.2" />

      {/* Címke és képlet */}
      <text x="91" y="26" fill="#0369a1" fontSize="9.5" fontWeight="900" textAnchor="middle" letterSpacing="0.4">
        EGYENES ARÁNYOSSÁG
      </text>
      <text x="91" y="42" fill="#0284c7" fontSize="12.5" fontWeight="black" textAnchor="middle">
        y = k · x
      </text>

      {/* Koordináta-háló */}
      {[-2, -1, 1, 2].map((i) => (
        <React.Fragment key={`grid-comp-1-${i}`}>
          <line x1={ox1 + i * scale} y1="52" x2={ox1 + i * scale} y2="174" stroke="#e0f2fe" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="20" y1={oy1 - i * scale} x2="162" y2={oy1 - i * scale} stroke="#e0f2fe" strokeWidth="1" strokeDasharray="2 2" />
        </React.Fragment>
      ))}

      {/* Tengelyek */}
      <line x1="20" y1={oy1} x2="162" y2={oy1} stroke="#64748b" strokeWidth="1.5" />
      <polygon points="162,115 156,112 156,118" fill="#64748b" />
      <text x="157" y="108" fill="#64748b" fontSize="9" fontWeight="bold">x</text>

      <line x1={ox1} y1="174" x2={ox1} y2="52" stroke="#64748b" strokeWidth="1.5" />
      <polygon points="90,52 87,58 93,58" fill="#64748b" />
      <text x="97" y="60" fill="#64748b" fontSize="9" fontWeight="bold">y</text>

      {/* Ticks */}
      {[-2, -1, 1, 2].map((val) => (
        <text key={`t1-x-${val}`} x={ox1 + val * scale} y={oy1 + 10} fill="#64748b" fontSize="7.5" textAnchor="middle">{val}</text>
      ))}

      {/* Egyenes: y = 1.0 * x */}
      <line
        x1={ox1 - 2.4 * scale}
        y1={oy1 + 2.4 * scale}
        x2={ox1 + 2.4 * scale}
        y2={oy1 - 2.4 * scale}
        stroke="#0284c7"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Pontok: (0; 0) és (1; 1) */}
      <circle cx={ox1} cy={oy1} r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx={ox1 + 1 * scale} cy={oy1 - 1 * scale} r="3.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
      <text x={ox1 + 1 * scale + 5} y={oy1 - 1 * scale - 3} fill="#0369a1" fontSize="8" fontWeight="bold">(1; k)</text>

      {/* Alsó magyarázat */}
      <text x="91" y="193" fill="#0f172a" fontSize="9.5" fontWeight="bold" textAnchor="middle">
        Origón átmenő egyenes
      </text>
      <text x="91" y="208" fill="#0369a1" fontSize="8.5" fontWeight="600" textAnchor="middle">
        Állandó hányados: y / x = k
      </text>
      <text x="91" y="222" fill="#64748b" fontSize="8" textAnchor="middle">
        f(0) = 0 létezik
      </text>


      {/* ---------------- JOBB KÁRTYA: FORDÍTOTT ARÁNYOSSÁG ---------------- */}
      <rect x="186" y="8" width="166" height="228" fill="#faf5ff" rx="12" stroke="#e9d5ff" strokeWidth="1.2" />

      {/* Címke és képlet */}
      <text x="269" y="26" fill="#7e22ce" fontSize="9.5" fontWeight="900" textAnchor="middle" letterSpacing="0.4">
        FORDÍTOTT ARÁNYOSSÁG
      </text>
      <text x="269" y="42" fill="#9333ea" fontSize="12.5" fontWeight="black" textAnchor="middle">
        y = k / x
      </text>

      {/* Koordináta-háló */}
      {[-2, -1, 1, 2].map((i) => (
        <React.Fragment key={`grid-comp-2-${i}`}>
          <line x1={ox2 + i * scale} y1="52" x2={ox2 + i * scale} y2="174" stroke="#f3e8ff" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="198" y1={oy2 - i * scale} x2="340" y2={oy2 - i * scale} stroke="#f3e8ff" strokeWidth="1" strokeDasharray="2 2" />
        </React.Fragment>
      ))}

      {/* Tengelyek mint aszimptoták (kiemelve) */}
      <line x1="198" y1={oy2} x2="340" y2={oy2} stroke="#64748b" strokeWidth="1.5" />
      <polygon points="340,115 334,112 334,118" fill="#64748b" />
      <text x="335" y="108" fill="#64748b" fontSize="9" fontWeight="bold">x</text>

      <line x1={ox2} y1="174" x2={ox2} y2="52" stroke="#64748b" strokeWidth="1.5" />
      <polygon points="265,52 262,58 268,58" fill="#64748b" />
      <text x="272" y="60" fill="#64748b" fontSize="9" fontWeight="bold">y</text>

      {/* Ticks */}
      {[-2, -1, 1, 2].map((val) => (
        <text key={`t2-x-${val}`} x={ox2 + val * scale} y={oy2 + 10} fill="#64748b" fontSize="7.5" textAnchor="middle">{val}</text>
      ))}

      {/* Szabályos, sima kétágú hiperbola görbék */}
      <path d={miniBranchPos} fill="none" stroke="#9333ea" strokeWidth="2.8" strokeLinecap="round" />
      <path d={miniBranchNeg} fill="none" stroke="#9333ea" strokeWidth="2.8" strokeLinecap="round" />

      {/* Pontok a hiperbolán: (1; 1) és (-1; -1) - NINCS lyukas piros kör az origón! */}
      <circle cx={ox2 + 1 * scale} cy={oy2 - 1 * scale} r="3.5" fill="#9333ea" stroke="#ffffff" strokeWidth="1" />
      <text x={ox2 + 1 * scale + 5} y={oy2 - 1 * scale - 3} fill="#7e22ce" fontSize="8" fontWeight="bold">(1; k)</text>

      <circle cx={ox2 - 1 * scale} cy={oy2 + 1 * scale} r="3.5" fill="#9333ea" stroke="#ffffff" strokeWidth="1" />
      <text x={ox2 - 1 * scale - 24} y={oy2 + 1 * scale + 10} fill="#7e22ce" fontSize="8" fontWeight="bold">(-1; -k)</text>

      {/* Alsó magyarázat */}
      <text x="269" y="193" fill="#0f172a" fontSize="9.5" fontWeight="bold" textAnchor="middle">
        Kétágú hiperbola
      </text>
      <text x="269" y="208" fill="#7e22ce" fontSize="8.5" fontWeight="600" textAnchor="middle">
        Állandó szorzat: x · y = k
      </text>
      <text x="269" y="222" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">
        Aszimptoták: x = 0, y = 0
      </text>
    </svg>
  );
};

/**
 * Szemléltető ábra: A k előjelének hatása a hiperbolára (k > 0 vs. k < 0)
 */
export const HyperbolaBranchesSvg: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  const ox1 = 90;
  const oy1 = 110;
  const ox2 = 265;
  const oy2 = 110;
  const scale = 20;

  const branchPos1 = createHyperbolaBranchPath(0.9, true, ox1, oy1, scale, 50, 168, 20, 160);
  const branchNeg1 = createHyperbolaBranchPath(0.9, false, ox1, oy1, scale, 50, 168, 20, 160);

  const branchPos2 = createHyperbolaBranchPath(-0.9, true, ox2, oy2, scale, 50, 168, 195, 335);
  const branchNeg2 = createHyperbolaBranchPath(-0.9, false, ox2, oy2, scale, 50, 168, 195, 335);

  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 360 225"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bal kártya: k > 0 */}
      <rect x="8" y="8" width="166" height="208" fill="#f8fafc" rx="12" stroke="#cbd5e1" strokeWidth="1.2" />
      <text x="91" y="28" fill="#7e22ce" fontSize="10" fontWeight="900" textAnchor="middle">
        k &gt; 0 (Pozitív tényező)
      </text>
      <text x="91" y="42" fill="#64748b" fontSize="8.5" textAnchor="middle">
        I. és III. síknegyedben
      </text>

      {/* Halvány rács */}
      {[-2, -1, 1, 2].map((i) => (
        <React.Fragment key={`grid-hpos-${i}`}>
          <line x1={ox1 + i * scale} y1="52" x2={ox1 + i * scale} y2="168" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="20" y1={oy1 - i * scale} x2="162" y2={oy1 - i * scale} stroke="#f1f5f9" strokeWidth="1" />
        </React.Fragment>
      ))}

      <line x1="20" y1={oy1} x2="162" y2={oy1} stroke="#94a3b8" strokeWidth="1.2" />
      <line x1={ox1} y1="168" x2={ox1} y2="52" stroke="#94a3b8" strokeWidth="1.2" />

      {/* Síknegyed jelölők */}
      <text x="145" y="68" fill="#c084fc" fontSize="9" fontWeight="black">I.</text>
      <text x="35" y="160" fill="#c084fc" fontSize="9" fontWeight="black">III.</text>

      <path d={branchPos1} fill="none" stroke="#9333ea" strokeWidth="2.6" strokeLinecap="round" />
      <path d={branchNeg1} fill="none" stroke="#9333ea" strokeWidth="2.6" strokeLinecap="round" />

      <text x="91" y="186" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">
        Szakaszonként csökkenő
      </text>
      <text x="91" y="200" fill="#64748b" fontSize="8" textAnchor="middle">
        pl. g(x) = 4 / x
      </text>

      {/* Jobb kártya: k < 0 */}
      <rect x="186" y="8" width="166" height="208" fill="#f8fafc" rx="12" stroke="#cbd5e1" strokeWidth="1.2" />
      <text x="269" y="28" fill="#e11d48" fontSize="10" fontWeight="900" textAnchor="middle">
        k &lt; 0 (Negatív tényező)
      </text>
      <text x="269" y="42" fill="#64748b" fontSize="8.5" textAnchor="middle">
        II. és IV. síknegyedben
      </text>

      {/* Halvány rács */}
      {[-2, -1, 1, 2].map((i) => (
        <React.Fragment key={`grid-hneg-${i}`}>
          <line x1={ox2 + i * scale} y1="52" x2={ox2 + i * scale} y2="168" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="198" y1={oy2 - i * scale} x2="340" y2={oy2 - i * scale} stroke="#f1f5f9" strokeWidth="1" />
        </React.Fragment>
      ))}

      <line x1="198" y1={oy2} x2="340" y2={oy2} stroke="#94a3b8" strokeWidth="1.2" />
      <line x1={ox2} y1="168" x2={ox2} y2="52" stroke="#94a3b8" strokeWidth="1.2" />

      {/* Síknegyed jelölők */}
      <text x="210" y="68" fill="#fda4af" fontSize="9" fontWeight="black">II.</text>
      <text x="325" y="160" fill="#fda4af" fontSize="9" fontWeight="black">IV.</text>

      <path d={branchPos2} fill="none" stroke="#e11d48" strokeWidth="2.6" strokeLinecap="round" />
      <path d={branchNeg2} fill="none" stroke="#e11d48" strokeWidth="2.6" strokeLinecap="round" />

      <text x="269" y="186" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">
        Szakaszonként növekvő
      </text>
      <text x="269" y="200" fill="#64748b" fontSize="8" textAnchor="middle">
        pl. g(x) = -4 / x
      </text>
    </svg>
  );
};
