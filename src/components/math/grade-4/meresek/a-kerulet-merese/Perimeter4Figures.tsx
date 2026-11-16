import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** 1. ábra: körbejárjuk a téglalapot – a + b + a + b */
export const WalkAroundRectSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="226" rx="16" fill="#f0fdfa" stroke="#5eead4" />
    <rect x="110" y="50" width="300" height="130" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
    <line x1="110" y1="180" x2="410" y2="180" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
    <line x1="410" y1="180" x2="410" y2="50" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
    <line x1="410" y1="50" x2="110" y2="50" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
    <line x1="110" y1="50" x2="110" y2="180" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
    <text x="260" y="205" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#b91c1c">a = 6 cm</text>
    <text x="260" y="40" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#b91c1c">a = 6 cm</text>
    <text x="420" y="120" fontSize="18" fontWeight="bold" fill="#1d4ed8">b = 4 cm</text>
    <text x="100" y="120" textAnchor="end" fontSize="18" fontWeight="bold" fill="#1d4ed8">b = 4 cm</text>
    <text x="96" y="200" fontSize="22">🐞</text>
    <path d="M 160 160 L 360 160" stroke="#0f766e" strokeWidth="2" markerEnd="url(#p4arrow)" />
    <path d="M 390 160 L 390 75" stroke="#0f766e" strokeWidth="2" markerEnd="url(#p4arrow)" />
    <path d="M 360 70 L 160 70" stroke="#0f766e" strokeWidth="2" markerEnd="url(#p4arrow)" />
    <path d="M 130 75 L 130 155" stroke="#0f766e" strokeWidth="2" markerEnd="url(#p4arrow)" />
    <defs>
      <marker id="p4arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 z" fill="#0f766e" />
      </marker>
    </defs>
    <text x="260" y="122" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#134e4a">
      K = 6 + 4 + 6 + 4 = 20 cm
    </text>
  </svg>
);

/** 2. ábra: pálcikákból kirakott sokszögek (1 pálcika = 8 cm) */
export const StickPolygonsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 50;
  const stick = (x1: number, y1: number, x2: number, y2: number, k: string) => (
    <g key={k}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d97706" strokeWidth="7" strokeLinecap="round" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
  const h = Math.round(s * 0.866);
  return (
    <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="196" rx="16" fill="#fffbeb" stroke="#fcd34d" />
      {/* A négyzet */}
      {stick(30, 50, 80, 50, 'a1')}
      {stick(80, 50, 80, 100, 'a2')}
      {stick(80, 100, 30, 100, 'a3')}
      {stick(30, 100, 30, 50, 'a4')}
      <text x="55" y="80" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">A</text>
      {/* B téglalap 2 × 1 */}
      {stick(110, 50, 160, 50, 'b1')}
      {stick(160, 50, 210, 50, 'b2')}
      {stick(210, 50, 210, 100, 'b3')}
      {stick(210, 100, 160, 100, 'b4')}
      {stick(160, 100, 110, 100, 'b5')}
      {stick(110, 100, 110, 50, 'b6')}
      <text x="160" y="80" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">B</text>
      {/* C trapéz */}
      {stick(275, 50, 325, 50, 'c1')}
      {stick(325, 50, 350, 50 + h, 'c2')}
      {stick(350, 50 + h, 300, 50 + h, 'c3')}
      {stick(300, 50 + h, 250, 50 + h, 'c4')}
      {stick(250, 50 + h, 275, 50, 'c5')}
      <text x="300" y="80" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">C</text>
      {/* D hatszög */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a1 = (Math.PI / 3) * i;
        const a2 = (Math.PI / 3) * (i + 1);
        const cx = 440;
        const cy = 85;
        return stick(
          Math.round(cx + s * Math.cos(a1)),
          Math.round(cy + s * Math.sin(a1)),
          Math.round(cx + s * Math.cos(a2)),
          Math.round(cy + s * Math.sin(a2)),
          `d${i}`
        );
      })}
      <text x="440" y="91" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">D</text>
      <text x="260" y="170" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#78350f">
        1 pálcika = 8 cm. Számold meg a pálcikákat, és szorozz 8-cal!
      </text>
      <text x="260" y="188" textAnchor="middle" fontSize="12" fill="#92400e">
        A: 4 pálcika = 32 cm • B: 6 pálcika = 48 cm • C: 5 pálcika = 40 cm • D: 6 pálcika = 48 cm
      </text>
    </svg>
  );
};

/** 3. ábra: az uszoda medencéje (33 m × 21 m) */
export const SwimmingPoolSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="226" rx="16" fill="#f0f9ff" stroke="#7dd3fc" />
    <rect x="80" y="40" width="330" height="140" fill="#e2e8f0" stroke="#64748b" strokeWidth="3" />
    <rect x="92" y="52" width="306" height="116" fill="#38bdf8" />
    {[1, 2, 3, 4, 5].map((i) => (
      <line key={i} x1="92" y1={52 + i * 19.3} x2="398" y2={52 + i * 19.3} stroke="#ffffff" strokeDasharray="10 6" strokeWidth="2" />
    ))}
    <text x="245" y="114" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0c4a6e">🏊</text>
    <line x1="80" y1="200" x2="410" y2="200" stroke="#0f172a" strokeWidth="2" />
    <polygon points="80,200 90,195 90,205" fill="#0f172a" />
    <polygon points="410,200 400,195 400,205" fill="#0f172a" />
    <text x="245" y="220" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">33 m</text>
    <line x1="440" y1="40" x2="440" y2="180" stroke="#0f172a" strokeWidth="2" />
    <polygon points="440,40 435,50 445,50" fill="#0f172a" />
    <polygon points="440,180 435,170 445,170" fill="#0f172a" />
    <text x="450" y="115" fontSize="15" fontWeight="bold" fill="#0f172a">21 m</text>
    <text x="40" y="30" fontSize="12" fill="#0369a1">Manó körbejárja a medencét</text>
  </svg>
);

/** 4. ábra: ház, füves terület és veteményeskert alaprajza (22 m × 12 m, kert 5 m széles) */
export const GardenPlanSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 18;
  const x0 = 50;
  const y0 = 30;
  return (
    <svg viewBox="0 0 520 290" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="286" rx="16" fill="#f7fee7" stroke="#a3e635" />
      <rect x={x0} y={y0} width={22 * u} height={12 * u} fill="#4ade80" stroke="#14532d" strokeWidth="3" />
      <rect x={x0 + 17 * u} y={y0} width={5 * u} height={12 * u} fill="#65a30d" stroke="#14532d" strokeWidth="2" />
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <line key={i} x1={x0 + 17 * u + 8} y1={y0 + i * u} x2={x0 + 22 * u - 8} y2={y0 + i * u} stroke="#365314" strokeDasharray="3 4" />
      ))}
      <rect x={x0 + 3 * u} y={y0 + 2 * u} width={9 * u} height={7 * u} fill="#fde68a" stroke="#78350f" strokeWidth="2" />
      <text x={x0 + 7.5 * u} y={y0 + 6 * u} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#78350f">ház</text>
      <text x={x0 + 8.5 * u} y={y0 + 11 * u} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">füves terület</text>
      <text x={x0 + 19.5 * u} y={y0 + 6.3 * u} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
        veteményes
      </text>
      <line x1={x0} y1={y0 + 12 * u + 18} x2={x0 + 22 * u} y2={y0 + 12 * u + 18} stroke="#0f172a" strokeWidth="2" />
      <text x={x0 + 11 * u} y={y0 + 12 * u + 36} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">22 m</text>
      <line x1={x0 + 17 * u} y1={y0 - 10} x2={x0 + 22 * u} y2={y0 - 10} stroke="#0f172a" strokeWidth="2" />
      <text x={x0 + 19.5 * u} y={y0 - 14} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">5 m</text>
      <line x1={x0 + 22 * u + 14} y1={y0} x2={x0 + 22 * u + 14} y2={y0 + 12 * u} stroke="#0f172a" strokeWidth="2" />
      <text x={x0 + 22 * u + 20} y={y0 + 6 * u} fontSize="15" fontWeight="bold" fill="#0f172a">12 m</text>
    </svg>
  );
};

/** 5. ábra: négyzetrácsos alakzat kerülete egységekben */
export const GridPerimeterSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 30;
  const x0 = 60;
  const y0 = 30;
  const cells = [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [2, 2],
    [3, 1]
  ];
  return (
    <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="196" rx="16" fill="#f5f3ff" stroke="#c4b5fd" />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + 4 * u} stroke="#ddd6fe" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + 7 * u} y2={y0 + i * u} stroke="#ddd6fe" />
      ))}
      {cells.map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={x0 + cx * u} y={y0 + cy * u} width={u} height={u} fill="#a78bfa" stroke="#6d28d9" />
      ))}
      <polyline
        points={[
          [0, 0],
          [1, 0],
          [1, 1],
          [4, 1],
          [4, 2],
          [3, 2],
          [3, 3],
          [2, 3],
          [2, 2],
          [0, 2],
          [0, 0]
        ]
          .map(([a, b]) => `${x0 + a * u},${y0 + b * u}`)
          .join(' ')}
        fill="none"
        stroke="#dc2626"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <line x1="300" y1="60" x2="330" y2="60" stroke="#dc2626" strokeWidth="4" />
      <text x="338" y="65" fontSize="13" fontWeight="bold" fill="#991b1b">= 1 egység</text>
      <text x="300" y="100" fontSize="14" fontWeight="bold" fill="#4c1d95">Számold körbe a</text>
      <text x="300" y="120" fontSize="14" fontWeight="bold" fill="#4c1d95">piros vonal darabjait:</text>
      <text x="300" y="145" fontSize="16" fontWeight="bold" fill="#b91c1c">K = 14 egység</text>
    </svg>
  );
};
