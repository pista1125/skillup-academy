import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';
const AXIS = '#dc2626';

export type Reflection4Cell = [number, number, string?];

/** Négyzetrács kiszínezett cellákkal (x, y, szín) – közös segéd a laborhoz és a kvízhez */
export const Reflection4Grid: React.FC<{
  x0: number;
  y0: number;
  cols: number;
  rows: number;
  u: number;
  cells?: Reflection4Cell[];
  fill?: string;
}> = ({ x0, y0, cols, rows, u, cells = [], fill = '#38bdf8' }) => (
  <g>
    {cells.map(([cx, cy, c], i) => (
      <rect key={i} x={x0 + cx * u} y={y0 + cy * u} width={u} height={u} fill={c ?? fill} />
    ))}
    {Array.from({ length: cols + 1 }, (_, i) => (
      <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + rows * u} stroke="#cbd5e1" strokeWidth="1" />
    ))}
    {Array.from({ length: rows + 1 }, (_, i) => (
      <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + cols * u} y2={y0 + i * u} stroke="#cbd5e1" strokeWidth="1" />
    ))}
  </g>
);

/** Kutya négyzetrácson (a tankönyv 123. o. 2. feladata nyomán), a tengelytől balra; x: 0–5 */
export const DOG_CELLS: Reflection4Cell[] = [
  [5, 0, '#facc15'],
  [4, 1, '#ef4444'],
  [5, 1, '#ef4444'],
  [0, 2, '#ef4444'],
  [1, 2, '#facc15'],
  [2, 2, '#facc15'],
  [3, 2, '#facc15'],
  [4, 2, '#facc15'],
  [5, 2, '#facc15'],
  [1, 3, '#facc15'],
  [2, 3, '#facc15'],
  [3, 3, '#facc15'],
  [4, 3, '#facc15'],
  [1, 4, '#ef4444'],
  [4, 4, '#ef4444']
];

/** 1. ábra: tükörkép a vízen (Tankönyv 123. o. 1. a) */
export const WaterMirrorSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const seal = (
    <g>
      <ellipse cx="0" cy="0" rx="48" ry="16" fill="#57534e" />
      <circle cx="44" cy="-14" r="12" fill="#57534e" />
      <circle cx="49" cy="-17" r="2.2" fill="#fff" />
      <polygon points="-44,-4 -66,-18 -62,6" fill="#57534e" />
      <polygon points="10,10 26,26 0,18" fill="#44403c" />
    </g>
  );
  return (
    <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="106" rx="18" fill="#e0f2fe" />
      <rect x="4" y="110" width="512" height="106" rx="0" fill="#7dd3fc" />
      <g transform="translate(150 80)">{seal}</g>
      <g transform="translate(150 140) scale(1 -1)" opacity="0.55">
        {seal}
      </g>
      {/* fa */}
      <g>
        <rect x="372" y="60" width="12" height="50" fill="#92400e" />
        <polygon points="378,10 340,70 416,70" fill="#16a34a" />
        <g opacity="0.5">
          <rect x="372" y="110" width="12" height="50" fill="#92400e" />
          <polygon points="378,210 340,150 416,150" fill="#16a34a" />
        </g>
      </g>
      <line x1="10" y1="110" x2="510" y2="110" stroke={AXIS} strokeWidth="3" strokeDasharray="10 6" />
      <text x="275" y="104" textAnchor="middle" fontSize="11" fontWeight="bold" fill={AXIS}>tükörtengely</text>
      <text x="260" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a6e">A vízben fejjel lefelé látszik a tükörkép.</text>
    </svg>
  );
};

/** 2. ábra: kutya és tükörképe négyzetrácson, függőleges tükörtengellyel (Tankönyv 123. o.) */
export const GridDogSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 26;
  const x0 = 50;
  const y0 = 36;
  const ax = 7; // tengely a 7. oszlopvonalnál
  const mirrored: Reflection4Cell[] = DOG_CELLS.map(([x, y, c]) => [2 * ax - 1 - x, y, c]);
  const left: Reflection4Cell[] = DOG_CELLS;
  return (
    <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="192" rx="18" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
      <Reflection4Grid x0={x0} y0={y0} cols={14} rows={5} u={u} cells={[...left, ...mirrored.map(([x, y, c]) => [x, y, c] as Reflection4Cell)]} />
      <line x1={x0 + ax * u} y1={y0 - 12} x2={x0 + ax * u} y2={y0 + 5 * u + 12} stroke={AXIS} strokeWidth="3.5" />
      <text x={x0 + 3.5 * u} y="188" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">eredeti</text>
      <text x={x0 + 10.5 * u} y="188" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">tükörkép</text>
      <text x={x0 + ax * u} y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill={AXIS}>tükörtengely</text>
    </svg>
  );
};

/** 3. ábra: félbehajtott lapból kivágott minta (Tankönyv 124. o. 4. feladat) */
export const FoldCutSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="192" rx="18" fill="#fdf4ff" stroke="#f0abfc" strokeWidth="2" />
    {/* félbehajtott lap */}
    <rect x="60" y="30" width="90" height="130" fill="#fef9c3" stroke="#a16207" strokeWidth="2" />
    <path d="M 60 50 C 110 40 130 80 105 100 C 130 120 110 150 60 145" fill="#f472b6" stroke="#9d174d" strokeWidth="2" strokeDasharray="5 3" />
    <line x1="60" y1="30" x2="60" y2="160" stroke={AXIS} strokeWidth="3" />
    <text x="105" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">vágd ki a hajtásnál</text>
    <path d="M 200 95 L 250 95" stroke="#7c3aed" strokeWidth="3" />
    <polygon points="250,88 262,95 250,102" fill="#7c3aed" />
    {/* kinyitva */}
    <rect x="300" y="30" width="180" height="130" fill="#fef9c3" stroke="#a16207" strokeWidth="2" />
    <path d="M 390 50 C 440 40 460 80 435 100 C 460 120 440 150 390 145 C 340 150 320 120 345 100 C 320 80 340 40 390 50 Z" fill="#f472b6" stroke="#9d174d" strokeWidth="2" />
    <line x1="390" y1="30" x2="390" y2="160" stroke={AXIS} strokeWidth="2" strokeDasharray="6 4" />
    <text x="390" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">kinyitva: szimmetrikus alakzat</text>
  </svg>
);

/** 4. ábra: síkidomok szimmetriatengelyei (Tankönyv 124. o. 5. b), Munkafüzet 37. o. 3. feladat) */
export const ShapeAxesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ax = (x1: number, y1: number, x2: number, y2: number, k: string) => (
    <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={AXIS} strokeWidth="2" strokeDasharray="6 4" />
  );
  return (
    <svg viewBox="0 0 520 250" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="242" rx="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      {/* négyzet */}
      <rect x="30" y="30" width="70" height="70" fill="#c4b5fd" stroke="#4c1d95" strokeWidth="2" />
      {[ax(65, 20, 65, 110, 'a'), ax(20, 65, 110, 65, 'b'), ax(22, 22, 108, 108, 'c'), ax(108, 22, 22, 108, 'd')]}
      <text x="65" y="128" textAnchor="middle" fontSize="12" fontWeight="bold">négyzet: 4</text>
      {/* téglalap */}
      <rect x="140" y="40" width="110" height="55" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="2" />
      {[ax(195, 28, 195, 107, 'e'), ax(128, 67.5, 262, 67.5, 'f')]}
      <text x="195" y="128" textAnchor="middle" fontSize="12" fontWeight="bold">téglalap: 2</text>
      {/* egyenlő oldalú háromszög */}
      <polygon points="300,100 380,100 340,30.7" fill="#7dd3fc" stroke="#075985" strokeWidth="2" />
      {[ax(340, 22, 340, 110, 'g'), ax(292, 104.6, 366, 61.9, 'h'), ax(388, 104.6, 314, 61.9, 'i')]}
      <text x="340" y="128" textAnchor="middle" fontSize="12" fontWeight="bold">háromszög: 3</text>
      {/* kör */}
      <circle cx="450" cy="65" r="38" fill="#86efac" stroke="#14532d" strokeWidth="2" />
      {[0, 30, 60, 90, 120, 150].map((d) => {
        const t = (d * Math.PI) / 180;
        return ax(450 - 46 * Math.cos(t), 65 - 46 * Math.sin(t), 450 + 46 * Math.cos(t), 65 + 46 * Math.sin(t), `k${d}`);
      })}
      <text x="450" y="128" textAnchor="middle" fontSize="12" fontWeight="bold">kör: végtelen sok</text>
      {/* trapéz */}
      <polygon points="40,215 140,215 115,160 65,160" fill="#fde68a" stroke="#92400e" strokeWidth="2" />
      {ax(90, 150, 90, 225, 't')}
      <text x="90" y="240" textAnchor="middle" fontSize="12" fontWeight="bold">„vödör” négyszög: 1</text>
      {/* paralelogramma */}
      <polygon points="200,215 290,215 320,160 230,160" fill="#bbf7d0" stroke="#166534" strokeWidth="2" />
      <text x="260" y="240" textAnchor="middle" fontSize="12" fontWeight="bold">ferde négyszög: 0</text>
      {/* szív */}
      <path d="M 420 222 C 360 185 370 150 400 155 C 412 157 420 168 420 175 C 420 168 428 157 440 155 C 470 150 480 185 420 222 Z" fill="#f9a8d4" stroke="#9d174d" strokeWidth="2" />
      {ax(420, 145, 420, 230, 's')}
      <text x="420" y="240" textAnchor="middle" fontSize="12" fontWeight="bold">szív: 1</text>
    </svg>
  );
};

/** 5. ábra: a tükörkép fordított – a jobbra mutató zászló balra mutat (Tankönyv 123. o. 1. c) */
export const FlagFlipSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 24;
  const x0 = 60;
  const y0 = 30;
  return (
    <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="192" rx="18" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
      <Reflection4Grid x0={x0} y0={y0} cols={16} rows={6} u={u} />
      {/* eredeti: rúd a 3. oszlopban, zászló jobbra */}
      <rect x={x0 + 3 * u} y={y0 + u} width={u * 0.25} height={u * 5} fill="#475569" />
      <polygon points={`${x0 + 3.25 * u},${y0 + u} ${x0 + 6.25 * u},${y0 + 2 * u} ${x0 + 3.25 * u},${y0 + 3 * u}`} fill="#f97316" stroke="#9a3412" />
      {/* tükörkép: tengely x = 8 */}
      <rect x={x0 + 12.75 * u} y={y0 + u} width={u * 0.25} height={u * 5} fill="#475569" />
      <polygon points={`${x0 + 12.75 * u},${y0 + u} ${x0 + 9.75 * u},${y0 + 2 * u} ${x0 + 12.75 * u},${y0 + 3 * u}`} fill="#f97316" stroke="#9a3412" />
      <line x1={x0 + 8 * u} y1={y0 - 10} x2={x0 + 8 * u} y2={y0 + 6 * u + 10} stroke={AXIS} strokeWidth="3.5" />
      <text x={x0 + 4 * u} y="190" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">eredeti: jobbra mutat</text>
      <text x={x0 + 12 * u} y="190" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">tükörkép: balra mutat</text>
    </svg>
  );
};

/** 6. ábra: logikai lapokból kirakott építmény és tükörképe (Tankönyv 124. o. 3. feladat) */
export const BlocksMirrorSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const train = (dir: 1 | -1) => (
    <g transform={dir === 1 ? '' : 'translate(520 0) scale(-1 1)'}>
      <polygon points="30,95 60,75 60,115" fill="#ef4444" stroke="#7f1d1d" />
      <rect x="60" y="75" width="40" height="40" fill="#facc15" stroke="#713f12" />
      <rect x="100" y="75" width="40" height="40" fill="#3b82f6" stroke="#1e3a8a" />
      <rect x="140" y="75" width="40" height="40" fill="#22c55e" stroke="#14532d" />
      <polygon points="70,50 94,50 82,72" fill="#ef4444" stroke="#7f1d1d" />
      {[78, 110, 142, 172].map((x, i) => (
        <circle key={x} cx={x} cy="125" r="9" fill={['#3b82f6', '#22c55e', '#ef4444', '#facc15'][i]} stroke="#334155" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 520 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="162" rx="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      {train(1)}
      {train(-1)}
      <line x1="260" y1="30" x2="260" y2="150" stroke={AXIS} strokeWidth="4" />
      <text x="260" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill={AXIS}>tükör</text>
      <text x="130" y="158" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">építmény</text>
      <text x="390" y="158" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">tükörkép</text>
    </svg>
  );
};
