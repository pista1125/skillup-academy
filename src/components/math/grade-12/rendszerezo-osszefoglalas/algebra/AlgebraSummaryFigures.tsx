import React from 'react';
import { PlotBox, Axes, curvePath, mapX, mapY, L_BLUE, L_RED, L_GREEN, L_PURPLE, L_AMBER, L_INK } from './plotKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={L_INK}>
      {title}
    </text>
    {children}
  </svg>
);

// 1. ábra: (a + b)² geometriai szemléltetése
export const SquareIdentitySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Nevezetes azonosság: (a + b)² = a² + 2ab + b²" className={className} h={270}>
    <rect x="60" y="50" width="120" height="120" fill="#dbeafe" stroke={L_BLUE} strokeWidth="1.8" />
    <rect x="180" y="50" width="70" height="120" fill="#fde68a" stroke={L_AMBER} strokeWidth="1.8" />
    <rect x="60" y="170" width="120" height="70" fill="#fde68a" stroke={L_AMBER} strokeWidth="1.8" />
    <rect x="180" y="170" width="70" height="70" fill="#dcfce7" stroke={L_GREEN} strokeWidth="1.8" />
    <text x="120" y="115" fontSize="18" fontWeight="bold" textAnchor="middle" fill={L_BLUE}>a²</text>
    <text x="215" y="115" fontSize="15" fontWeight="bold" textAnchor="middle" fill={L_AMBER}>ab</text>
    <text x="120" y="210" fontSize="15" fontWeight="bold" textAnchor="middle" fill={L_AMBER}>ab</text>
    <text x="215" y="210" fontSize="15" fontWeight="bold" textAnchor="middle" fill={L_GREEN}>b²</text>
    <text x="120" y="44" fontSize="12" textAnchor="middle" fill={L_INK}>a</text>
    <text x="215" y="44" fontSize="12" textAnchor="middle" fill={L_INK}>b</text>
    <text x="50" y="114" fontSize="12" textAnchor="middle" fill={L_INK}>a</text>
    <text x="50" y="209" fontSize="12" textAnchor="middle" fill={L_INK}>b</text>
    <text x="280" y="80" fontSize="12.5" fill={L_INK}>(a + b)² = a² + 2ab + b²</text>
    <text x="280" y="108" fontSize="12.5" fill={L_INK}>(a − b)² = a² − 2ab + b²</text>
    <text x="280" y="136" fontSize="12.5" fill={L_INK}>(a + b)(a − b) = a² − b²</text>
    <text x="280" y="176" fontSize="10.5" fill="#475569">A nagy négyzet területe kétféleképpen:</text>
    <text x="280" y="192" fontSize="10.5" fill="#475569">(a + b) · (a + b), illetve a négy rész</text>
    <text x="280" y="208" fontSize="10.5" fill="#475569">összege.</text>
  </Frame>
);

// 2. ábra: szorzattá alakítás – kidolgozott 1. feladat
export const FactoringSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cols = [
    { e: '3x² − 12x', s1: '= 3x(x − 4)', m: 'kiemelés', r: 'M = {0; 4}' },
    { e: '3x² − 12', s1: '= 3(x² − 4) = 3(x − 2)(x + 2)', m: 'kiemelés + a² − b²', r: 'M = {2; −2}' },
    { e: '3x² − 12x + 12', s1: '= 3(x² − 4x + 4) = 3(x − 2)²', m: 'kiemelés + (a − b)²', r: 'M = {2}' }
  ];
  return (
    <Frame title="Kidolgozott feladat: szorzattá alakítás, majd = 0" className={className} h={270}>
      {cols.map((c, i) => (
        <g key={i}>
          <rect x="20" y={42 + i * 72} width="440" height="64" rx="10" fill={['#eff6ff', '#f5f3ff', '#ecfdf5'][i]} stroke={[L_BLUE, L_PURPLE, L_GREEN][i]} />
          <text x="34" y={64 + i * 72} fontSize="13" fontWeight="bold" fill={L_INK}>
            {c.e}
          </text>
          <text x="150" y={64 + i * 72} fontSize="12.5" fill={L_INK}>
            {c.s1}
          </text>
          <text x="34" y={90 + i * 72} fontSize="10.5" fill="#475569">
            módszer: {c.m}
          </text>
          <text x="440" y={90 + i * 72} fontSize="12" fontWeight="bold" textAnchor="end" fill={[L_BLUE, L_PURPLE, L_GREEN][i]}>
            {c.e} = 0 ⇒ {c.r}
          </text>
        </g>
      ))}
    </Frame>
  );
};

// 3. ábra: másodfokú egyenlőtlenség grafikusan – kidolgozott 2. feladat
export const ParabolaSignSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const b: PlotBox = { x0: 40, y0: 40, w: 260, h: 220, xmin: -4, xmax: 7, ymin: -42, ymax: 22 };
  const f = (x: number) => 3 * x * x - 8 * x - 35;
  return (
    <Frame title="3x² − 8x − 35 < 0 az egész számok halmazán" className={className} h={280}>
      <Axes b={b} stepX={1} stepY={10} />
      <line x1={mapX(b, -7 / 3)} x2={mapX(b, 5)} y1={mapY(b, 0)} y2={mapY(b, 0)} stroke={L_RED} strokeWidth="4" />
      <path d={curvePath(b, f)} fill="none" stroke={L_BLUE} strokeWidth="2.2" />
      {[-2, -1, 0, 1, 2, 3, 4].map((k) => (
        <circle key={k} cx={mapX(b, k)} cy={mapY(b, 0)} r="3.5" fill={L_RED} />
      ))}
      <circle cx={mapX(b, -7 / 3)} cy={mapY(b, 0)} r="4" fill="#fff" stroke={L_RED} strokeWidth="2" />
      <circle cx={mapX(b, 5)} cy={mapY(b, 0)} r="4" fill="#fff" stroke={L_RED} strokeWidth="2" />
      <text x="315" y="70" fontSize="11.5" fill={L_INK}>Gyökök: x₁ = −7/3, x₂ = 5</text>
      <text x="315" y="92" fontSize="11.5" fill={L_INK}>3(x + 7/3)(x − 5) &lt; 0</text>
      <text x="315" y="120" fontSize="11" fill="#475569">felfelé nyitott parabola:</text>
      <text x="315" y="136" fontSize="11" fill="#475569">a gyökök között negatív</text>
      <text x="315" y="170" fontSize="12" fontWeight="bold" fill={L_RED}>M = {'{−2; −1; 0; 1; 2; 3; 4}'}</text>
      <text x="315" y="200" fontSize="10.5" fill="#475569">(a −7/3 ≈ −2,33 és az 5</text>
      <text x="315" y="215" fontSize="10.5" fill="#475569">nem tartozik bele)</text>
    </Frame>
  );
};

// 4. ábra: gyökös egyenlet – hamis gyök
export const RootEquationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const b: PlotBox = { x0: 40, y0: 40, w: 270, h: 220, xmin: -1, xmax: 16, ymin: -7, ymax: 10 };
  return (
    <Frame title="√(4x − 3) = x − 6: négyzetre emelés után ellenőrizni kell!" className={className} h={280}>
      <Axes b={b} stepX={2} stepY={2} />
      <path d={curvePath(b, (x) => (4 * x - 3 >= 0 ? Math.sqrt(4 * x - 3) : NaN), 0.75, 16)} fill="none" stroke={L_BLUE} strokeWidth="2.2" />
      <path d={curvePath(b, (x) => x - 6)} fill="none" stroke={L_RED} strokeWidth="2.2" />
      <circle cx={mapX(b, 13)} cy={mapY(b, 7)} r="5" fill={L_GREEN} />
      <line x1={mapX(b, 3)} x2={mapX(b, 3)} y1={mapY(b, 3)} y2={mapY(b, -3)} stroke={L_AMBER} strokeDasharray="4 3" strokeWidth="1.8" />
      <circle cx={mapX(b, 3)} cy={mapY(b, 3)} r="4" fill="#fff" stroke={L_AMBER} strokeWidth="2" />
      <circle cx={mapX(b, 3)} cy={mapY(b, -3)} r="4" fill="#fff" stroke={L_AMBER} strokeWidth="2" />
      <text x={mapX(b, 13) - 6} y={mapY(b, 7) - 10} fontSize="11" fontWeight="bold" textAnchor="end" fill={L_GREEN}>(13; 7)</text>
      <text x="320" y="70" fontSize="11" fill={L_BLUE} fontWeight="bold">y = √(4x − 3)</text>
      <text x="320" y="88" fontSize="11" fill={L_RED} fontWeight="bold">y = x − 6</text>
      <text x="320" y="120" fontSize="11" fill={L_INK}>Négyzetre emelve:</text>
      <text x="320" y="136" fontSize="11" fill={L_INK}>x² − 16x + 39 = 0</text>
      <text x="320" y="152" fontSize="11" fill={L_INK}>x₁ = 3, x₂ = 13</text>
      <text x="320" y="182" fontSize="11" fill={L_AMBER}>x = 3: bal oldal 3,</text>
      <text x="320" y="198" fontSize="11" fill={L_AMBER}>jobb oldal −3 – hamis gyök</text>
      <text x="320" y="228" fontSize="12" fontWeight="bold" fill={L_GREEN}>M = {'{13}'}</text>
    </Frame>
  );
};

// 5. ábra: egyenletrendszer grafikusan
export const LinearSystemSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const b: PlotBox = { x0: 40, y0: 40, w: 230, h: 220, xmin: -5, xmax: 5, ymin: -2, ymax: 6 };
  return (
    <Frame title="Kétismeretlenes egyenletrendszer: két egyenes metszéspontja" className={className} h={280}>
      <Axes b={b} />
      <path d={curvePath(b, (x) => (4 * x + 10) / 3)} fill="none" stroke={L_BLUE} strokeWidth="2.2" />
      <path d={curvePath(b, (x) => (10 - 2 * x) / 6)} fill="none" stroke={L_RED} strokeWidth="2.2" />
      <circle cx={mapX(b, -1)} cy={mapY(b, 2)} r="5" fill={L_GREEN} />
      <text x={mapX(b, -1) - 8} y={mapY(b, 2) - 8} fontSize="11" fontWeight="bold" textAnchor="end" fill={L_GREEN}>(−1; 2)</text>
      <text x="290" y="70" fontSize="12" fill={L_BLUE} fontWeight="bold">I. 4x − 3y = −10</text>
      <text x="290" y="90" fontSize="12" fill={L_RED} fontWeight="bold">II. 2x + 6y = 10</text>
      <text x="290" y="122" fontSize="11" fill={L_INK}>Egyenlő együtthatók:</text>
      <text x="290" y="138" fontSize="11" fill={L_INK}>2 · I.: 8x − 6y = −20</text>
      <text x="290" y="154" fontSize="11" fill={L_INK}>+ II.: 10x = −10 ⇒ x = −1</text>
      <text x="290" y="170" fontSize="11" fill={L_INK}>II.-be: −2 + 6y = 10 ⇒ y = 2</text>
      <text x="290" y="205" fontSize="10.5" fill="#475569">Ellenőrzés: 4 · (−1) − 3 · 2 = −10 ✓</text>
      <text x="290" y="221" fontSize="10.5" fill="#475569">2 · (−1) + 6 · 2 = 10 ✓</text>
    </Frame>
  );
};
