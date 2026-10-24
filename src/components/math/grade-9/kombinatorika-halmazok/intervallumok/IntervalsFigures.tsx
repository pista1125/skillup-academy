import React from 'react';

/**
 * Közös Segédfüggvény: Számegyenes koordináta leképezés
 * X tartomány: [30, 290] -> Skála: minVal .. maxVal
 */
function mapToX(val: number, minVal: number, maxVal: number, width: number = 320, padding: number = 40): number {
  const usableWidth = width - 2 * padding;
  return padding + ((val - minVal) / (maxVal - minVal)) * usableWidth;
}

/**
 * Számegyenes Alapkomponens
 */
export const NumberLineBase: React.FC<{
  minVal?: number;
  maxVal?: number;
  width?: number;
  height?: number;
  step?: number;
  children?: React.ReactNode;
}> = ({
  minVal = -5,
  maxVal = 5,
  width = 340,
  height = 90,
  step = 1,
  children
}) => {
  const yAxis = 50;
  const padding = 35;
  const ticks: number[] = [];
  for (let i = minVal; i <= maxVal; i += step) {
    ticks.push(i);
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
    >
      <defs>
        <marker
          id="axisArrow"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill="#64748b" />
        </marker>
      </defs>

      {/* Számegyenes tengely */}
      <line
        x1={padding - 15}
        y1={yAxis}
        x2={width - padding + 22}
        y2={yAxis}
        stroke="#64748b"
        strokeWidth="2.5"
        strokeLinecap="round"
        markerEnd="url(#axisArrow)"
      />
      <text
        x={width - padding + 26}
        y={yAxis - 8}
        fill="#64748b"
        fontSize="11"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        x
      </text>

      {/* Osztásjelek és feliratok */}
      {ticks.map((val) => {
        const x = mapToX(val, minVal, maxVal, width, padding);
        const isMajor = val === 0;
        return (
          <g key={`tick-${val}`}>
            <line
              x1={x}
              y1={yAxis - (isMajor ? 6 : 4)}
              x2={x}
              y2={yAxis + (isMajor ? 6 : 4)}
              stroke={isMajor ? '#0f172a' : '#94a3b8'}
              strokeWidth={isMajor ? '2' : '1.5'}
            />
            <text
              x={x}
              y={yAxis + 19}
              textAnchor="middle"
              className={isMajor ? "fill-slate-900 dark:fill-slate-100 font-black" : "fill-slate-600 dark:fill-slate-400 font-medium"}
              fontSize={isMajor ? "11" : "10"}
              fontFamily="sans-serif"
            >
              {val}
            </text>
          </g>
        );
      })}

      {children}
    </svg>
  );
};

/**
 * 1. Nyílt Intervallum: (a, b) vagy ]a, b[
 * Mindkét végpont üres karika (nem tartozik hozzá)
 */
export const OpenIntervalSvg: React.FC<{
  a?: number;
  b?: number;
  size?: number;
  className?: string;
  label?: string;
}> = ({ a = -2, b = 3, size = 180, className = '', label = '(-2, 3) nyílt' }) => {
  const minVal = -4;
  const maxVal = 5;
  const width = 320;
  const height = 95;
  const padding = 35;
  const yAxis = 50;

  const x1 = mapToX(a, minVal, maxVal, width, padding);
  const x2 = mapToX(b, minVal, maxVal, width, padding);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <div style={{ width: size, height: (size * height) / width, maxWidth: '100%', maxHeight: '100%' }}>
        <NumberLineBase minVal={minVal} maxVal={maxVal} width={width} height={height}>
          {/* Kiemelt szakasz */}
          <line
            x1={x1}
            y1={yAxis}
            x2={x2}
            y2={yAxis}
            stroke="#06b6d4"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Bal végpont: Nyílt (Üres karika) */}
          <circle cx={x1} cy={yAxis} r="6.5" fill="#ffffff" stroke="#0891b2" strokeWidth="2.5" />
          {/* Jobb végpont: Nyílt (Üres karika) */}
          <circle cx={x2} cy={yAxis} r="6.5" fill="#ffffff" stroke="#0891b2" strokeWidth="2.5" />

          {/* Felirat / Badge */}
          <g transform={`translate(${(x1 + x2) / 2}, 22)`}>
            <rect x="-42" y="-11" width="84" height="18" rx="9" fill="#0891b2" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black" fontFamily="sans-serif">
              {label}
            </text>
          </g>
        </NumberLineBase>
      </div>
    </div>
  );
};

/**
 * 2. Zárt Intervallum: [a, b]
 * Mindkét végpont teli karika (beletartozik az intervallumba)
 */
export const ClosedIntervalSvg: React.FC<{
  a?: number;
  b?: number;
  size?: number;
  className?: string;
  label?: string;
}> = ({ a = -1, b = 4, size = 180, className = '', label = '[-1, 4] zárt' }) => {
  const minVal = -3;
  const maxVal = 5;
  const width = 320;
  const height = 95;
  const padding = 35;
  const yAxis = 50;

  const x1 = mapToX(a, minVal, maxVal, width, padding);
  const x2 = mapToX(b, minVal, maxVal, width, padding);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <div style={{ width: size, height: (size * height) / width, maxWidth: '100%', maxHeight: '100%' }}>
        <NumberLineBase minVal={minVal} maxVal={maxVal} width={width} height={height}>
          {/* Kiemelt szakasz */}
          <line
            x1={x1}
            y1={yAxis}
            x2={x2}
            y2={yAxis}
            stroke="#6366f1"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Bal végpont: Zárt (Teli karika) */}
          <circle cx={x1} cy={yAxis} r="6.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
          {/* Jobb végpont: Zárt (Teli karika) */}
          <circle cx={x2} cy={yAxis} r="6.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />

          {/* Felirat / Badge */}
          <g transform={`translate(${(x1 + x2) / 2}, 22)`}>
            <rect x="-42" y="-11" width="84" height="18" rx="9" fill="#4f46e5" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black" fontFamily="sans-serif">
              {label}
            </text>
          </g>
        </NumberLineBase>
      </div>
    </div>
  );
};

/**
 * 3. Félig nyílt / Félig zárt Intervallum: [a, b) vagy (a, b]
 */
export const HalfOpenIntervalSvg: React.FC<{
  a?: number;
  b?: number;
  leftClosed?: boolean;
  size?: number;
  className?: string;
  label?: string;
}> = ({
  a = -2,
  b = 2,
  leftClosed = true,
  size = 180,
  className = '',
  label
}) => {
  const minVal = -4;
  const maxVal = 4;
  const width = 320;
  const height = 95;
  const padding = 35;
  const yAxis = 50;

  const x1 = mapToX(a, minVal, maxVal, width, padding);
  const x2 = mapToX(b, minVal, maxVal, width, padding);
  const displayLabel = label || (leftClosed ? `[${a}, ${b})` : `(${a}, ${b}]`);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <div style={{ width: size, height: (size * height) / width, maxWidth: '100%', maxHeight: '100%' }}>
        <NumberLineBase minVal={minVal} maxVal={maxVal} width={width} height={height}>
          {/* Kiemelt szakasz */}
          <line
            x1={x1}
            y1={yAxis}
            x2={x2}
            y2={yAxis}
            stroke="#8b5cf6"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Bal végpont */}
          {leftClosed ? (
            <circle cx={x1} cy={yAxis} r="6.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
          ) : (
            <circle cx={x1} cy={yAxis} r="6.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" />
          )}

          {/* Jobb végpont */}
          {!leftClosed ? (
            <circle cx={x2} cy={yAxis} r="6.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="2" />
          ) : (
            <circle cx={x2} cy={yAxis} r="6.5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2.5" />
          )}

          {/* Felirat / Badge */}
          <g transform={`translate(${(x1 + x2) / 2}, 22)`}>
            <rect x="-42" y="-11" width="84" height="18" rx="9" fill="#7c3aed" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black" fontFamily="sans-serif">
              {displayLabel}
            </text>
          </g>
        </NumberLineBase>
      </div>
    </div>
  );
};

/**
 * 4. Végtelen Intervallum: (-∞, b] vagy [a, +∞)
 */
export const InfiniteIntervalSvg: React.FC<{
  bound?: number;
  direction?: 'left' | 'right';
  isClosed?: boolean;
  size?: number;
  className?: string;
  label?: string;
}> = ({
  bound = 1,
  direction = 'right',
  isClosed = true,
  size = 180,
  className = '',
  label
}) => {
  const minVal = -3;
  const maxVal = 4;
  const width = 320;
  const height = 95;
  const padding = 35;
  const yAxis = 50;

  const xb = mapToX(bound, minVal, maxVal, width, padding);
  const xFar = direction === 'right' ? width - 15 : 15;
  const displayLabel = label || (direction === 'right'
    ? `${isClosed ? '[' : '('}${bound}, +∞)`
    : `(-∞, ${bound}${isClosed ? ']' : ')'}`);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <div style={{ width: size, height: (size * height) / width, maxWidth: '100%', maxHeight: '100%' }}>
        <NumberLineBase minVal={minVal} maxVal={maxVal} width={width} height={height}>
          <defs>
            <marker
              id={`infArrow-${direction}`}
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#ea580c" />
            </marker>
          </defs>

          {/* Kiemelt félegyenes nyíllal */}
          <line
            x1={xb}
            y1={yAxis}
            x2={xFar}
            y2={yAxis}
            stroke="#ea580c"
            strokeWidth="5"
            strokeLinecap="round"
            markerEnd={`url(#infArrow-${direction})`}
          />

          {/* Végpont karika */}
          {isClosed ? (
            <circle cx={xb} cy={yAxis} r="6.5" fill="#c2410c" stroke="#ffffff" strokeWidth="2" />
          ) : (
            <circle cx={xb} cy={yAxis} r="6.5" fill="#ffffff" stroke="#c2410c" strokeWidth="2.5" />
          )}

          {/* Badge */}
          <g transform={`translate(${direction === 'right' ? (xb + width - 40) / 2 : (xb + 40) / 2}, 22)`}>
            <rect x="-44" y="-11" width="88" height="18" rx="9" fill="#c2410c" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="black" fontFamily="sans-serif">
              {displayLabel}
            </text>
          </g>
        </NumberLineBase>
      </div>
    </div>
  );
};

/**
 * 5. Két Intervallum Metszete: I₁ ∩ I₂
 * Két sávval és közös metszeti résszel
 */
export const IntervalIntersectionSvg: React.FC<{
  a1?: number;
  b1?: number;
  a2?: number;
  b2?: number;
  size?: number;
  className?: string;
}> = ({
  a1 = -2,
  b1 = 3,
  a2 = 0,
  b2 = 5,
  size = 200,
  className = ''
}) => {
  const minVal = -3;
  const maxVal = 6;
  const width = 340;
  const height = 110;
  const padding = 35;
  const yAxis = 75;

  const xA1 = mapToX(a1, minVal, maxVal, width, padding);
  const xB1 = mapToX(b1, minVal, maxVal, width, padding);
  const xA2 = mapToX(a2, minVal, maxVal, width, padding);
  const xB2 = mapToX(b2, minVal, maxVal, width, padding);

  const interA = Math.max(a1, a2);
  const interB = Math.min(b1, b2);
  const xInterA = mapToX(interA, minVal, maxVal, width, padding);
  const xInterB = mapToX(interB, minVal, maxVal, width, padding);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <div style={{ width: size, height: (size * height) / width, maxWidth: '100%', maxHeight: '100%' }}>
        <NumberLineBase minVal={minVal} maxVal={maxVal} width={width} height={height}>
          {/* 1. Intervallum sáv (Kék) - Felül */}
          <line x1={xA1} y1={yAxis - 18} x2={xB1} y2={yAxis - 18} stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
          <circle cx={xA1} cy={yAxis - 18} r="4.5" fill="#1d4ed8" />
          <circle cx={xB1} cy={yAxis - 18} r="4.5" fill="#1d4ed8" />
          <text x={xA1 - 5} y={yAxis - 23} fill="#1d4ed8" fontSize="8.5" fontWeight="bold">I₁: [{a1}, {b1}]</text>

          {/* 2. Intervallum sáv (Lila) - Alatta */}
          <line x1={xA2} y1={yAxis - 9} x2={xB2} y2={yAxis - 9} stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
          <circle cx={xA2} cy={yAxis - 9} r="4.5" fill="#7e22ce" />
          <circle cx={xB2} cy={yAxis - 9} r="4.5" fill="#7e22ce" />
          <text x={xB2 - 25} y={yAxis - 23} fill="#7e22ce" fontSize="8.5" fontWeight="bold">I₂: [{a2}, {b2}]</text>

          {/* Közös Metszet a tengelyen kiemelve (Zöld/Emerald) */}
          <line x1={xInterA} y1={yAxis} x2={xInterB} y2={yAxis} stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
          <circle cx={xInterA} cy={yAxis} r="6" fill="#047857" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx={xInterB} cy={yAxis} r="6" fill="#047857" stroke="#ffffff" strokeWidth="1.5" />

          {/* Metszet címke */}
          <g transform={`translate(${(xInterA + xInterB) / 2}, 22)`}>
            <rect x="-56" y="-11" width="112" height="18" rx="9" fill="#047857" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="black" fontFamily="sans-serif">
              Metszet: [{interA}, {interB}]
            </text>
          </g>
        </NumberLineBase>
      </div>
    </div>
  );
};

/**
 * 6. Két Intervallum Uniója: I₁ ∪ I₂
 */
export const IntervalUnionSvg: React.FC<{
  a1?: number;
  b1?: number;
  a2?: number;
  b2?: number;
  size?: number;
  className?: string;
}> = ({
  a1 = -2,
  b1 = 2,
  a2 = 1,
  b2 = 5,
  size = 200,
  className = ''
}) => {
  const minVal = -3;
  const maxVal = 6;
  const width = 340;
  const height = 110;
  const padding = 35;
  const yAxis = 75;

  const xA1 = mapToX(a1, minVal, maxVal, width, padding);
  const xB1 = mapToX(b1, minVal, maxVal, width, padding);
  const xA2 = mapToX(a2, minVal, maxVal, width, padding);
  const xB2 = mapToX(b2, minVal, maxVal, width, padding);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <div style={{ width: size, height: (size * height) / width, maxWidth: '100%', maxHeight: '100%' }}>
        <NumberLineBase minVal={minVal} maxVal={maxVal} width={width} height={height}>
          {/* Felső külön sávok */}
          <line x1={xA1} y1={yAxis - 16} x2={xB1} y2={yAxis - 16} stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={xA1} cy={yAxis - 16} r="4" fill="#1d4ed8" />
          <circle cx={xB1} cy={yAxis - 16} r="4" fill="#1d4ed8" />

          <line x1={xA2} y1={yAxis - 8} x2={xB2} y2={yAxis - 8} stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx={xA2} cy={yAxis - 8} r="4" fill="#be123c" />
          <circle cx={xB2} cy={yAxis - 8} r="4" fill="#be123c" />

          {/* Együttes Unió a tengelyen (Sárga/Borostyán összefüggő sáv) */}
          <line x1={xA1} y1={yAxis} x2={xB2} y2={yAxis} stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
          <circle cx={xA1} cy={yAxis} r="6" fill="#b45309" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx={xB2} cy={yAxis} r="6" fill="#b45309" stroke="#ffffff" strokeWidth="1.5" />

          {/* Badge */}
          <g transform={`translate(${(xA1 + xB2) / 2}, 22)`}>
            <rect x="-56" y="-11" width="112" height="18" rx="9" fill="#b45309" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="black" fontFamily="sans-serif">
              Unió: [{a1}, {b2}]
            </text>
          </g>
        </NumberLineBase>
      </div>
    </div>
  );
};

/**
 * 7. Intervallumok Különbsége: I₁ \ I₂
 * Szemlélteti a végpont állapotváltozását (pl. [1, 5] \ [3, 7] = [1, 3))
 */
export const IntervalDifferenceSvg: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 200, className = '' }) => {
  const minVal = 0;
  const maxVal = 8;
  const width = 340;
  const height = 110;
  const padding = 35;
  const yAxis = 75;

  const x1 = mapToX(1, minVal, maxVal, width, padding);
  const x3 = mapToX(3, minVal, maxVal, width, padding);
  const x5 = mapToX(5, minVal, maxVal, width, padding);
  const x7 = mapToX(7, minVal, maxVal, width, padding);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <div style={{ width: size, height: (size * height) / width, maxWidth: '100%', maxHeight: '100%' }}>
        <NumberLineBase minVal={minVal} maxVal={maxVal} width={width} height={height}>
          {/* A = [1, 5] felső sáv */}
          <line x1={x1} y1={yAxis - 18} x2={x5} y2={yAxis - 18} stroke="#0ea5e9" strokeWidth="3.5" />
          <circle cx={x1} cy={yAxis - 18} r="4" fill="#0284c7" />
          <circle cx={x5} cy={yAxis - 18} r="4" fill="#0284c7" />
          <text x={x1} y={yAxis - 23} fill="#0284c7" fontSize="8" fontWeight="bold">A: [1, 5]</text>

          {/* B = [3, 7] elvont rész szaggatottan */}
          <line x1={x3} y1={yAxis - 9} x2={x7} y2={yAxis - 9} stroke="#ef4444" strokeWidth="3" strokeDasharray="4 2" />
          <circle cx={x3} cy={yAxis - 9} r="4" fill="#dc2626" />
          <circle cx={x7} cy={yAxis - 9} r="4" fill="#dc2626" />
          <text x={x5} y={yAxis - 23} fill="#dc2626" fontSize="8" fontWeight="bold">B: [3, 7] kivonva ✂️</text>

          {/* Eredmény: [1, 3) a tengelyen */}
          <line x1={x1} y1={yAxis} x2={x3} y2={yAxis} stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
          <circle cx={x1} cy={yAxis} r="6" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
          {/* A 3 pont NYÍLTTÁ válik, mert a B elvitte! */}
          <circle cx={x3} cy={yAxis} r="6" fill="#ffffff" stroke="#059669" strokeWidth="2.5" />

          {/* Badge */}
          <g transform={`translate(${(x1 + x3) / 2}, 22)`}>
            <rect x="-58" y="-11" width="116" height="18" rx="9" fill="#059669" />
            <text x="0" y="2" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black" fontFamily="sans-serif">
              A \ B = [1, 3) (3 nyílt!)
            </text>
          </g>
        </NumberLineBase>
      </div>
    </div>
  );
};

/**
 * 8. Diszkrét Halmaz vs Folytonos Intervallum
 * {1, 2, 3} (3 elszigetelt pont) vs [1, 3] (végtelen sok pont folytonos szakasza)
 */
export const DiscreteVsContinuousSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 320 120"
        style={{ width: size, height: (size * 120) / 320, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Felső számegyenes: {1, 2, 3} Diszkrét */}
        <g transform="translate(0, 0)">
          <line x1="30" y1="35" x2="290" y2="35" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <text x="25" y="20" fill="#64748b" fontSize="9.5" fontWeight="black">Diszkrét halmaz: {'{1, 2, 3}'} (3 elem)</text>
          {/* Pontok */}
          <circle cx="100" cy="35" r="5.5" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
          <text x="100" y="49" textAnchor="middle" fill="#64748b" fontSize="9">1</text>
          <circle cx="160" cy="35" r="5.5" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
          <text x="160" y="49" textAnchor="middle" fill="#64748b" fontSize="9">2</text>
          <circle cx="220" cy="35" r="5.5" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
          <text x="220" y="49" textAnchor="middle" fill="#64748b" fontSize="9">3</text>
        </g>

        {/* Alsó számegyenes: [1, 3] Folytonos intervallum */}
        <g transform="translate(0, 55)">
          <line x1="30" y1="40" x2="290" y2="40" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <text x="25" y="24" fill="#0284c7" fontSize="9.5" fontWeight="black">Folytonos intervallum: [1, 3] (∞ sok valós pont)</text>
          {/* Teli összefüggő sáv */}
          <line x1="100" y1="40" x2="220" y2="40" stroke="#0284c7" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="100" cy="40" r="5.5" fill="#0369a1" stroke="#fff" strokeWidth="1.5" />
          <text x="100" y="54" textAnchor="middle" fill="#64748b" fontSize="9">1</text>
          <circle cx="220" cy="40" r="5.5" fill="#0369a1" stroke="#fff" strokeWidth="1.5" />
          <text x="220" y="54" textAnchor="middle" fill="#64748b" fontSize="9">3</text>
        </g>
      </svg>
    </div>
  );
};
