import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; h: number; children: React.ReactNode; className: string }> = ({ title, h, children, className }) => (
  <svg viewBox={`0 0 560 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

/** Koordináta-rendszer: origó (ox, oy), egység k px; a megadott tartományban. */
const Axes: React.FC<{ ox: number; oy: number; k: number; xMin: number; xMax: number; yMax: number; grid?: boolean }> = ({
  ox,
  oy,
  k,
  xMin,
  xMax,
  yMax,
  grid = true
}) => {
  const xs = [];
  for (let i = Math.ceil(xMin); i <= Math.floor(xMax); i++) xs.push(i);
  const ys = [];
  for (let j = 1; j <= Math.floor(yMax); j++) ys.push(j);
  return (
    <g>
      {grid &&
        xs.map((i) => <line key={`gx${i}`} x1={ox + i * k} y1={oy - yMax * k} x2={ox + i * k} y2={oy + 0.6 * k} stroke="#e2e8f0" />)}
      {grid && ys.map((j) => <line key={`gy${j}`} x1={ox + xMin * k} y1={oy - j * k} x2={ox + xMax * k} y2={oy - j * k} stroke="#e2e8f0" />)}
      <line x1={ox + xMin * k - 8} y1={oy} x2={ox + xMax * k + 10} y2={oy} stroke="#475569" strokeWidth="1.5" />
      <line x1={ox} y1={oy + 0.6 * k} x2={ox} y2={oy - yMax * k - 10} stroke="#475569" strokeWidth="1.5" />
      <text x={ox + xMax * k + 8} y={oy - 6} fontSize="12" fill="#334155">
        x
      </text>
      <text x={ox + 6} y={oy - yMax * k - 4} fontSize="12" fill="#334155">
        y
      </text>
      <text x={ox - 6} y={oy + 14} fontSize="11" textAnchor="end" fill="#334155">
        0
      </text>
      <text x={ox + k} y={oy + 14} fontSize="11" textAnchor="middle" fill="#334155">
        1
      </text>
      <text x={ox - 6} y={oy - k + 4} fontSize="11" textAnchor="end" fill="#334155">
        1
      </text>
    </g>
  );
};

/** Az y = aˣ görbe útvonala a megadott tartományban, a láthatósági felső korlátig. */
export const expPath = (a: number, ox: number, oy: number, k: number, xMin: number, xMax: number, yMax: number) => {
  let d = '';
  let pen = false;
  const steps = 240;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + ((xMax - xMin) * i) / steps;
    const y = Math.pow(a, x);
    if (y > yMax) {
      pen = false;
      continue;
    }
    d += `${pen ? 'L' : 'M'} ${(ox + x * k).toFixed(1)} ${(oy - y * k).toFixed(1)} `;
    pen = true;
  }
  return d;
};

/** Bevezető: x ↦ 2ˣ a {−2,6; −2,5; …; 3,1} halmazon – 58 pontból álló grafikon. */
export const ExponentialFunctionsDiscreteSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ox = 200;
  const oy = 270;
  const k = 26;
  const pts = Array.from({ length: 58 }, (_, i) => -2.6 + i * 0.1);
  return (
    <Frame title="x ↦ 2ˣ a {−2,6; −2,5; …; 3,1} halmazon: 58 pont" h={300} className={className}>
      <Axes ox={ox} oy={oy} k={k} xMin={-3} xMax={4} yMax={9} />
      {pts.map((x, i) => (
        <circle key={i} cx={ox + x * k} cy={oy - Math.pow(2, x) * k} r="2.6" fill="#7c3aed" />
      ))}
      <text x={ox - 2.6 * k} y={oy - 0.165 * k - 10} fontSize="11" textAnchor="middle" fill="#be185d" fontWeight="bold">
        2<tspan dy="-5" fontSize="8">−2,6</tspan>
        <tspan dy="5"> ≈ 0,165</tspan>
      </text>
      <text x={ox + 3.1 * k - 8} y={oy - 8.574 * k + 4} fontSize="11" textAnchor="end" fill="#be185d" fontWeight="bold">
        2<tspan dy="-5" fontSize="8">3,1</tspan>
        <tspan dy="5"> ≈ 8,574</tspan>
      </text>
      <text x="420" y="160" fontSize="12" fill="#334155">
        szigorúan monoton
      </text>
      <text x="420" y="176" fontSize="12" fill="#334155">
        növekvő
      </text>
    </Frame>
  );
};

/** A kettes alapú exponenciális függvény és tulajdonságai. */
export const ExponentialFunctionsBase2Svg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ox = 210;
  const oy = 260;
  const k = 28;
  return (
    <Frame title="A kettes alapú exponenciális függvény: x ↦ 2ˣ" h={290} className={className}>
      <Axes ox={ox} oy={oy} k={k} xMin={-6} xMax={3.6} yMax={7.8} />
      <path d={expPath(2, ox, oy, k, -6.5, 3.6, 7.8)} fill="none" stroke="#7c3aed" strokeWidth="3" />
      <circle cx={ox} cy={oy - k} r="4" fill="#be185d" />
      <text x={ox + 8} y={oy - k - 6} fontSize="11" fill="#be185d" fontWeight="bold">
        (0; 1)
      </text>
      <circle cx={ox + 2 * k} cy={oy - 4 * k} r="4" fill="#7c3aed" />
      <text x={ox + 2 * k + 8} y={oy - 4 * k + 4} fontSize="11" fill="#7c3aed">
        (2; 4)
      </text>
      <text x={ox + 3 * k - 4} y={oy - 7.4 * k} fontSize="13" textAnchor="end" fill="#7c3aed" fontWeight="bold">
        y = 2ˣ
      </text>
      <text x="410" y="80" fontSize="11" fill="#334155">
        D = R
      </text>
      <text x="410" y="98" fontSize="11" fill="#334155">
        R = R⁺ (pozitív valós)
      </text>
      <text x="410" y="116" fontSize="11" fill="#334155">
        szig. mon. növekvő
      </text>
      <text x="410" y="134" fontSize="11" fill="#334155">
        nincs szélsőértéke
      </text>
      <text x="410" y="152" fontSize="11" fill="#334155">
        nincs zérushelye
      </text>
      <text x={ox - 5.5 * k} y={oy - 10} fontSize="10" fill="#64748b">
        a görbe az x tengelyhez simul, de nem éri el
      </text>
    </Frame>
  );
};

/** Különböző alapú exponenciális függvények közös koordináta-rendszerben. */
export const ExponentialFunctionsFamilySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ox = 280;
  const oy = 265;
  const k = 30;
  const curves: { a: number; c: string; label: string; lx: number }[] = [
    { a: 0.4, c: '#0ea5e9', label: 'y = 0,4ˣ', lx: -2.1 },
    { a: 0.8, c: '#14b8a6', label: 'y = 0,8ˣ', lx: -7 },
    { a: 1.2, c: '#f59e0b', label: 'y = 1,2ˣ', lx: 7 },
    { a: 1.5, c: '#e11d48', label: 'y = 1,5ˣ', lx: 4.6 },
    { a: 2, c: '#7c3aed', label: 'y = 2ˣ', lx: 2.6 }
  ];
  return (
    <Frame title="a alapú exponenciális függvények: mind átmegy a (0; 1) ponton" h={300} className={className}>
      <Axes ox={ox} oy={oy} k={k} xMin={-8.5} xMax={8.5} yMax={7.3} grid={false} />
      {curves.map((c) => {
        const y = Math.min(6.6, Math.pow(c.a, c.lx));
        return (
          <g key={c.a}>
            <path d={expPath(c.a, ox, oy, k, -8.5, 8.5, 7.3)} fill="none" stroke={c.c} strokeWidth="2.5" />
            <text x={ox + c.lx * k} y={oy - y * k - 6} fontSize="11" textAnchor="middle" fill={c.c} fontWeight="bold">
              {c.label}
            </text>
          </g>
        );
      })}
      <circle cx={ox} cy={oy - k} r="4" fill="#0f172a" />
      <text x="28" y="60" fontSize="11" fill="#0369a1">
        0 &lt; a &lt; 1: szig. mon. csökkenő
      </text>
      <text x="532" y="60" fontSize="11" textAnchor="end" fill="#be185d">
        a &gt; 1: szig. mon. növekvő
      </text>
    </Frame>
  );
};

/** 3ˣ és (1/3)ˣ grafikonja egymás tükörképe az y tengelyre. */
export const ExponentialFunctionsMirrorSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ox = 280;
  const oy = 260;
  const k = 26;
  return (
    <Frame title="aˣ és (1/a)ˣ = a⁻ˣ: tükrözés az y tengelyre" h={290} className={className}>
      <Axes ox={ox} oy={oy} k={k} xMin={-4} xMax={4} yMax={8.4} />
      <path d={expPath(3, ox, oy, k, -4, 4, 8.4)} fill="none" stroke="#7c3aed" strokeWidth="3" />
      <path d={expPath(1 / 3, ox, oy, k, -4, 4, 8.4)} fill="none" stroke="#0ea5e9" strokeWidth="3" />
      <circle cx={ox + k} cy={oy - 3 * k} r="4" fill="#7c3aed" />
      <circle cx={ox - k} cy={oy - 3 * k} r="4" fill="#0ea5e9" />
      <line x1={ox - k} y1={oy - 3 * k} x2={ox + k} y2={oy - 3 * k} stroke="#94a3b8" strokeDasharray="4 3" />
      <text x={ox + k + 8} y={oy - 3 * k + 4} fontSize="11" fill="#7c3aed">
        (1; 3)
      </text>
      <text x={ox - k - 8} y={oy - 3 * k + 4} fontSize="11" textAnchor="end" fill="#0369a1">
        (−1; 3)
      </text>
      <text x={ox + 2.2 * k} y={oy - 8 * k} fontSize="13" fill="#7c3aed" fontWeight="bold">
        y = 3ˣ
      </text>
      <text x={ox - 2.2 * k} y={oy - 8 * k} fontSize="13" textAnchor="end" fill="#0369a1" fontWeight="bold">
        y = (1/3)ˣ = 3⁻ˣ
      </text>
    </Frame>
  );
};

/** 2^√2 értelmezése: két racionális kitevő közé szorítva. */
export const ExponentialFunctionsIrrationalSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (v: number) => 80 + (v - 1.413) * (400 / 0.003);
  const Y = (v: number) => 80 + (v - 2.664) * (400 / 0.003);
  return (
    <Frame title="Irracionális kitevő: a 2 √2-edik hatványának értelmezése" h={230} className={className}>
      <text x="40" y="70" fontSize="12" fill="#334155" fontWeight="bold">
        kitevő
      </text>
      <line x1="60" y1="90" x2="500" y2="90" stroke="#334155" strokeWidth="1.5" />
      {[1.414, 1.415].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1="84" x2={X(v)} y2="96" stroke="#334155" />
          <text x={X(v)} y="112" fontSize="11" textAnchor="middle" fill="#334155">
            {v.toString().replace('.', ',')}
          </text>
        </g>
      ))}
      <circle cx={X(Math.SQRT2)} cy="90" r="5" fill="#be185d" />
      <text x={X(Math.SQRT2)} y="78" fontSize="12" textAnchor="middle" fill="#be185d" fontWeight="bold">
        √2
      </text>
      <text x="40" y="150" fontSize="12" fill="#334155" fontWeight="bold">
        hatvány
      </text>
      <line x1="60" y1="170" x2="500" y2="170" stroke="#334155" strokeWidth="1.5" />
      {[{ v: 2.665 }, { v: 2.667 }].map((m) => (
        <g key={m.v}>
          <line x1={Y(m.v)} y1="164" x2={Y(m.v)} y2="176" stroke="#334155" />
          <text x={Y(m.v)} y="192" fontSize="11" textAnchor="middle" fill="#334155">
            {m.v.toString().replace('.', ',')}
          </text>
        </g>
      ))}
      <circle cx={Y(Math.pow(2, Math.SQRT2))} cy="170" r="5" fill="#7c3aed" />
      <text x={Y(Math.pow(2, Math.SQRT2))} y="158" fontSize="12" textAnchor="middle" fill="#7c3aed" fontWeight="bold">
        2<tspan dy="-5" fontSize="9">√2</tspan><tspan dy="5"> ≈ 2,665</tspan>
      </text>
      <text x="280" y="214" fontSize="11" textAnchor="middle" fill="#475569">
        1,414 &lt; √2 &lt; 1,415 ⇒ 2<tspan dy="-4" fontSize="8">1,414</tspan><tspan dy="4"> &lt; 2</tspan><tspan dy="-4" fontSize="8">√2</tspan><tspan dy="4"> &lt; 2</tspan><tspan dy="-4" fontSize="8">1,415</tspan><tspan dy="4">, azaz kb. 2,665 &lt; 2</tspan><tspan dy="-4" fontSize="8">√2</tspan><tspan dy="4"> &lt; 2,667</tspan>
      </text>
    </Frame>
  );
};
