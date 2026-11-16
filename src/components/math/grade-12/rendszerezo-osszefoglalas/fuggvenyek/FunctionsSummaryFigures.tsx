import React from 'react';
import { PlotBox, Axes, curvePath, mapX, mapY, F_BLUE, F_RED, F_GREEN, F_PURPLE, F_AMBER, F_INK } from './plotKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={F_INK}>
      {title}
    </text>
    {children}
  </svg>
);

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string }> = ({ x1, y1, x2, y2, color = F_PURPLE }) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 7;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.6" />
      <polygon
        points={`${x2},${y2} ${x2 - h * Math.cos(a - 0.4)},${y2 - h * Math.sin(a - 0.4)} ${x2 - h * Math.cos(a + 0.4)},${y2 - h * Math.sin(a + 0.4)}`}
        fill={color}
      />
    </g>
  );
};

// 1. ábra: függvény mint hozzárendelés
export const MappingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = ['Magyarország', 'Ausztria', 'Hollandia', 'Franciaország'];
  const B = ['Budapest', 'Bécs', 'Amszterdam', 'Párizs', 'Lyon', 'Graz', 'Pécs'];
  const ay = (i: number) => 70 + i * 48;
  const by = (i: number) => 58 + i * 30;
  return (
    <Frame title="Függvény: A minden eleméhez pontosan egy B-beli elemet rendel" className={className} h={290}>
      <ellipse cx="100" cy="150" rx="85" ry="115" fill="#dbeafe" stroke={F_BLUE} strokeWidth="1.6" />
      <ellipse cx="370" cy="150" rx="95" ry="122" fill="#fef3c7" stroke={F_AMBER} strokeWidth="1.6" />
      <rect x="292" y="44" width="156" height="128" rx="14" fill="#dcfce7" stroke={F_GREEN} strokeDasharray="4 3" />
      {A.map((t, i) => (
        <text key={t} x="100" y={ay(i) + 4} fontSize="11" textAnchor="middle" fill={F_INK}>
          {t}
        </text>
      ))}
      {B.map((t, i) => (
        <text key={t} x="370" y={by(i) + 4} fontSize="11" textAnchor="middle" fill={F_INK}>
          {t}
        </text>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Arrow key={i} x1={168} y1={ay(i)} x2={325} y2={by(i)} />
      ))}
      <text x="100" y="282" fontSize="10.5" textAnchor="middle" fill={F_BLUE} fontWeight="bold">értelmezési tartomány (A)</text>
      <text x="370" y="282" fontSize="10.5" textAnchor="middle" fill={F_AMBER} fontWeight="bold">képhalmaz (B)</text>
      <text x="440" y="186" fontSize="10" textAnchor="end" fill={F_GREEN} fontWeight="bold">értékkészlet</text>
    </Frame>
  );
};

const MINI: { t: string; f: (x: number) => number; from?: number; to?: number; col: string; note: string }[] = [
  { t: 'f(x) = ax + b', f: (x) => -2 * x + 3, col: F_BLUE, note: 'egyenes, meredekség a' },
  { t: 'f(x) = 1/x', f: (x) => 1 / x, col: F_RED, note: 'R = ℝ ∖ {0}, nincs szélsőérték' },
  { t: 'f(x) = |x|', f: (x) => Math.abs(x), col: F_GREEN, note: 'R = [0; ∞[, min. 0' },
  { t: 'f(x) = x²', f: (x) => x * x, col: F_PURPLE, note: 'R = [0; ∞[, min. 0' },
  { t: 'f(x) = √x', f: (x) => Math.sqrt(x), from: 0, col: F_AMBER, note: 'D = [0; ∞[, nő' },
  { t: 'f(x) = 2ˣ', f: (x) => 2 ** x, col: '#0891b2', note: 'R = ]0; ∞[, nincs zérushely' }
];

// 2. ábra: alapfüggvények
export const BasicFunctionsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Alapfüggvények grafikonja" className={className} h={330}>
    {MINI.map((m, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const b: PlotBox = { x0: 22 + col * 152, y0: 44 + row * 142, w: 130, h: 100, xmin: -4, xmax: 4, ymin: -3, ymax: 4 };
      const isRecip = i === 1;
      return (
        <g key={m.t}>
          <Axes b={b} labels={false} />
          {isRecip ? (
            <>
              <path d={curvePath(b, m.f, -4, -0.24)} fill="none" stroke={m.col} strokeWidth="2.2" />
              <path d={curvePath(b, m.f, 0.24, 4)} fill="none" stroke={m.col} strokeWidth="2.2" />
            </>
          ) : (
            <path d={curvePath(b, m.f, m.from ?? b.xmin, m.to ?? b.xmax)} fill="none" stroke={m.col} strokeWidth="2.2" />
          )}
          <text x={b.x0 + b.w / 2} y={b.y0 + b.h + 14} fontSize="11" fontWeight="bold" textAnchor="middle" fill={m.col}>
            {m.t}
          </text>
          <text x={b.x0 + b.w / 2} y={b.y0 + b.h + 27} fontSize="9" textAnchor="middle" fill="#475569">
            {m.note}
          </text>
        </g>
      );
    })}
  </Frame>
);

// 3. ábra: függvénytranszformációk
export const TransformationsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const P: { t: string; g: (x: number) => number; note: string }[] = [
    { t: 'g(x) = (x − 4)²', g: (x) => (x - 4) ** 2, note: 'eltolás x mentén +4' },
    { t: 'g(x) = x² − 3', g: (x) => x * x - 3, note: 'eltolás y mentén −3' },
    { t: 'g(x) = 2x²', g: (x) => 2 * x * x, note: 'nyújtás y irányban 2-szeresre' },
    { t: 'g(x) = |x² − 3|', g: (x) => Math.abs(x * x - 3), note: 'x tengely alatti rész tükrözése' }
  ];
  return (
    <Frame title="Transzformációk az f(x) = x² alapfüggvényből" className={className} h={330}>
      {P.map((p, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const b: PlotBox = { x0: 30 + col * 228, y0: 42 + row * 142, w: 200, h: 100, xmin: -4, xmax: 7, ymin: -4, ymax: 6 };
        return (
          <g key={p.t}>
            <Axes b={b} labels={false} />
            <path d={curvePath(b, (x) => x * x)} fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="5 3" />
            <path d={curvePath(b, p.g)} fill="none" stroke={[F_BLUE, F_RED, F_GREEN, F_PURPLE][i]} strokeWidth="2.3" />
            <text x={b.x0 + b.w / 2} y={b.y0 + b.h + 14} fontSize="11" fontWeight="bold" textAnchor="middle" fill={[F_BLUE, F_RED, F_GREEN, F_PURPLE][i]}>
              {p.t}
            </text>
            <text x={b.x0 + b.w / 2} y={b.y0 + b.h + 27} fontSize="9" textAnchor="middle" fill="#475569">
              {p.note} (szaggatott: x²)
            </text>
          </g>
        );
      })}
    </Frame>
  );
};

// 4. ábra: kidolgozott 1. feladat – lineáris függvény két pontból
export const LinearExampleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const b: PlotBox = { x0: 40, y0: 40, w: 250, h: 220, xmin: -7, xmax: 7, ymin: -5, ymax: 8 };
  const f = (x: number) => -0.8 * x + 2;
  return (
    <Frame title="Kidolgozott feladat: f lineáris, A(−5; 6) és B(5; −2) a grafikonon" className={className} h={280}>
      <Axes b={b} />
      <path d={curvePath(b, f)} fill="none" stroke={F_BLUE} strokeWidth="2.3" />
      <circle cx={mapX(b, -5)} cy={mapY(b, 6)} r="5" fill={F_RED} />
      <circle cx={mapX(b, 5)} cy={mapY(b, -2)} r="5" fill={F_RED} />
      <circle cx={mapX(b, 2.5)} cy={mapY(b, 0)} r="4.5" fill={F_GREEN} />
      <text x={mapX(b, -5) + 8} y={mapY(b, 6) - 6} fontSize="11" fontWeight="bold" fill={F_RED}>A</text>
      <text x={mapX(b, 5) + 8} y={mapY(b, -2) - 6} fontSize="11" fontWeight="bold" fill={F_RED}>B</text>
      <text x={mapX(b, 2.5) + 4} y={mapY(b, 0) - 8} fontSize="10" fontWeight="bold" fill={F_GREEN}>2,5</text>
      <text x="305" y="72" fontSize="11.5" fill={F_INK}>6 = −5a + b</text>
      <text x="305" y="90" fontSize="11.5" fill={F_INK}>−2 = 5a + b</text>
      <text x="305" y="114" fontSize="12" fontWeight="bold" fill={F_BLUE}>f(x) = −0,8x + 2</text>
      <text x="305" y="146" fontSize="11" fill={F_INK}>f(123) = −96,4</text>
      <text x="305" y="166" fontSize="11" fill={F_INK}>f(x) = 456 ⇒ x = −567,5</text>
      <text x="305" y="186" fontSize="11" fill={F_GREEN}>zérushely: x = 2,5</text>
      <text x="305" y="206" fontSize="11" fill={F_RED}>f(x) &lt; 0 ⇔ x &gt; 2,5</text>
      <text x="305" y="236" fontSize="10" fill="#475569">(szigorúan monoton csökkenő)</text>
    </Frame>
  );
};

// 5. ábra: kidolgozott 2. feladat – eltolás vektorral
export const ShiftExampleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const b: PlotBox = { x0: 40, y0: 40, w: 250, h: 220, xmin: -7, xmax: 3, ymin: -5, ymax: 6 };
  return (
    <Frame title="Kidolgozott feladat: f(x) = x² eltolása a v(−3; −4) vektorral" className={className} h={280}>
      <Axes b={b} />
      <path d={curvePath(b, (x) => x * x)} fill="none" stroke={F_BLUE} strokeWidth="2.2" />
      <path d={curvePath(b, (x) => (x + 3) ** 2 - 4)} fill="none" stroke={F_RED} strokeWidth="2.3" />
      <line x1={mapX(b, -7)} x2={mapX(b, 3)} y1={mapY(b, -3)} y2={mapY(b, -3)} stroke={F_GREEN} strokeWidth="1.8" />
      <line x1={mapX(b, 0)} y1={mapY(b, 0)} x2={mapX(b, -3) + 5} y2={mapY(b, -4) - 6} stroke={F_PURPLE} strokeWidth="2" />
      <polygon
        points={`${mapX(b, -3)},${mapY(b, -4)} ${mapX(b, -3) + 10},${mapY(b, -4) - 4} ${mapX(b, -3) + 4},${mapY(b, -4) - 11}`}
        fill={F_PURPLE}
      />
      {[-5, -1].map((x) => (
        <circle key={x} cx={mapX(b, x)} cy={mapY(b, 0)} r="4" fill={F_RED} />
      ))}
      {[-4, -2].map((x) => (
        <circle key={x} cx={mapX(b, x)} cy={mapY(b, -3)} r="4" fill={F_GREEN} />
      ))}
      <text x={mapX(b, 0.4)} y={mapY(b, 4)} fontSize="11" fontWeight="bold" fill={F_BLUE}>f</text>
      <text x={mapX(b, -6.2)} y={mapY(b, 4)} fontSize="11" fontWeight="bold" fill={F_RED}>g</text>
      <text x={mapX(b, 1.6)} y={mapY(b, -3) - 5} fontSize="11" fontWeight="bold" fill={F_GREEN}>h</text>
      <text x="305" y="70" fontSize="12" fontWeight="bold" fill={F_RED}>g(x) = (x + 3)² − 4</text>
      <text x="305" y="96" fontSize="11" fill={F_INK}>zérushelyek: −5 és −1</text>
      <text x="305" y="116" fontSize="11" fill={F_INK}>minimum: x = −3, y = −4</text>
      <text x="305" y="136" fontSize="11" fill={F_INK}>értékkészlet: [−4; ∞[</text>
      <text x="305" y="156" fontSize="11" fill={F_INK}>]−∞; −3]: szig. csökken</text>
      <text x="305" y="176" fontSize="11" fill={F_INK}>[−3; ∞[: szig. nő</text>
      <text x="305" y="206" fontSize="11" fill={F_GREEN}>g(x) = −3 ⇔ x = −4 vagy −2</text>
    </Frame>
  );
};

// 6. ábra: kidolgozott 3. feladat – 1/x + 2, abszolút érték, leszűkítés
export const ReciprocalExampleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const f = (x: number) => 1 / x + 2;
  const P = [
    { t: 'f(x) = 1/x + 2', g: f, from: -6, to: 6, col: F_BLUE, note: 'értékkészlet: ℝ ∖ {2}' },
    { t: 'g = |f|', g: (x: number) => Math.abs(f(x)), from: -6, to: 6, col: F_RED, note: 'értékkészlet: [0; ∞[, min.: x = −1/2' },
    { t: 'h = f az [1; 4]-en', g: f, from: 1, to: 4, col: F_GREEN, note: 'értékkészlet: [2,25; 3]' }
  ];
  return (
    <Frame title="Kidolgozott feladat: f(x) = 1/x + 2 és transzformáltjai" className={className} h={220}>
      {P.map((p, i) => {
        const b: PlotBox = { x0: 22 + i * 152, y0: 42, w: 130, h: 120, xmin: -4, xmax: 5, ymin: -2, ymax: 6 };
        const segs: [number, number][] = p.from < 0 ? [[p.from, -0.2], [0.2, p.to]] : [[p.from, p.to]];
        return (
          <g key={p.t}>
            <Axes b={b} labels={false} />
            <line x1={b.x0} x2={b.x0 + b.w} y1={mapY(b, 2)} y2={mapY(b, 2)} stroke="#94a3b8" strokeDasharray="4 3" />
            {segs.map(([a, c], k) => (
              <path key={k} d={curvePath(b, p.g, a, c)} fill="none" stroke={p.col} strokeWidth="2.2" />
            ))}
            {i === 2 && (
              <>
                <circle cx={mapX(b, 1)} cy={mapY(b, 3)} r="3.5" fill={p.col} />
                <circle cx={mapX(b, 4)} cy={mapY(b, 2.25)} r="3.5" fill={p.col} />
              </>
            )}
            <text x={b.x0 + b.w / 2} y={b.y0 + b.h + 16} fontSize="11" fontWeight="bold" textAnchor="middle" fill={p.col}>
              {p.t}
            </text>
            <text x={b.x0 + b.w / 2} y={b.y0 + b.h + 30} fontSize="9" textAnchor="middle" fill="#475569">
              {p.note}
            </text>
          </g>
        );
      })}
    </Frame>
  );
};
