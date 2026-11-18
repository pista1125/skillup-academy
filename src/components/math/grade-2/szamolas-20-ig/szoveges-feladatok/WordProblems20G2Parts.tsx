import React from 'react';

export const WORD20_FONT = 'system-ui, Segoe UI, sans-serif';

export interface UnitStrip20Props {
  x?: number;
  y?: number;
  sqSize?: number;
  first: number;
  second?: number;
  crossed?: number;
  unknownStart?: number;
  unknownCount?: number;
  firstColor?: string;
  firstStroke?: string;
  secondColor?: string;
  secondStroke?: string;
  showIndexNumbers?: boolean;
}

/**
 * 20 egységnégyzetből álló szalagmodell (számok 0–20).
 * Használható összeadáshoz (first + second), elvételhez (crossed az aktívak végéről),
 * vagy hiányzó részhez (unknownStart..unknownStart+unknownCount szaggatott ? mező).
 */
export const UnitStrip20Part: React.FC<UnitStrip20Props> = ({
  x = 40,
  y = 40,
  sqSize = 21,
  first,
  second = 0,
  crossed = 0,
  unknownStart,
  unknownCount = 0,
  firstColor = '#86efac',
  firstStroke = '#15803d',
  secondColor = '#93c5fd',
  secondStroke = '#1d4ed8',
  showIndexNumbers = false,
}) => {
  const activeTotal = first + second;
  const crossFrom = Math.max(0, activeTotal - crossed);

  return (
    <g>
      {Array.from({ length: 20 }, (_, i) => {
        const sx = x + i * sqSize;
        const isFirst = i < first;
        const isSecond = i >= first && i < activeTotal;
        const isCrossed = i >= crossFrom && i < activeTotal;
        const isUnknown =
          unknownStart !== undefined &&
          i >= unknownStart &&
          i < unknownStart + unknownCount;

        let fill = '#ffffff';
        let stroke = '#94a3b8';
        if (isFirst) {
          fill = isCrossed ? '#fee2e2' : firstColor;
          stroke = isCrossed ? '#dc2626' : firstStroke;
        } else if (isSecond) {
          fill = isCrossed ? '#fee2e2' : secondColor;
          stroke = isCrossed ? '#dc2626' : secondStroke;
        } else if (isUnknown) {
          fill = '#fef3c7';
          stroke = '#d97706';
        }

        return (
          <g key={i}>
            <rect
              x={sx}
              y={y}
              width={sqSize}
              height={sqSize}
              fill={fill}
              stroke={stroke}
              strokeWidth={i === 9 ? 1.8 : 1.2}
              strokeDasharray={isUnknown ? '3 2' : undefined}
            />
            {isCrossed && (
              <g stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round">
                <line x1={sx + 3} y1={y + 3} x2={sx + sqSize - 3} y2={y + sqSize - 3} />
                <line x1={sx + sqSize - 3} y1={y + 3} x2={sx + 3} y2={y + sqSize - 3} />
              </g>
            )}
            {showIndexNumbers && (i === 0 || i === 4 || i === 9 || i === 14 || i === 19) && (
              <text
                x={sx + sqSize / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize="10"
                fontWeight="bold"
                fill="#475569"
              >
                {i + 1}
              </text>
            )}
          </g>
        );
      })}
      {/* 10-es elválasztó jel a 10. és 11. négyzet között */}
      <line
        x1={x + 10 * sqSize}
        y1={y - 3}
        x2={x + 10 * sqSize}
        y2={y + sqSize + 3}
        stroke="#0f172a"
        strokeWidth="2"
      />
    </g>
  );
};

export interface BracePartProps {
  x1: number;
  x2: number;
  y: number;
  dir?: 'up' | 'down';
  color?: string;
  label?: string;
  labelColor?: string;
  fontSize?: number;
}

/** Kapcsos zárójel felirattal (szalagmodellhez). */
export const BracePart: React.FC<BracePartProps> = ({
  x1,
  x2,
  y,
  dir = 'down',
  color = '#334155',
  label,
  labelColor,
  fontSize = 13,
}) => {
  const span = Math.max(8, x2 - x1);
  const mid = (x1 + x2) / 2;
  const r = Math.min(8, span / 4);
  const sign = dir === 'down' ? 1 : -1;
  const yMid = y + sign * 8;
  const yTip = y + sign * 15;
  const d = `M ${x1} ${y} Q ${x1} ${yMid} ${x1 + r} ${yMid} L ${mid - r} ${yMid} Q ${mid} ${yMid} ${mid} ${yTip} Q ${mid} ${yMid} ${mid + r} ${yMid} L ${x2 - r} ${yMid} Q ${x2} ${yMid} ${x2} ${y}`;
  const textY = dir === 'down' ? yTip + fontSize + 2 : yTip - 5;
  const resolvedColor = labelColor ?? (label?.includes('?') ? '#dc2626' : color);

  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {label && (
        <text
          x={mid}
          y={textY}
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight="bold"
          fill={resolvedColor}
        >
          {label}
        </text>
      )}
    </g>
  );
};
