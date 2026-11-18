import React from 'react';
import { HandSpanPart, FootPart, ThumbPart } from './LengthG2Figures';

// ---------------------------------------------------------------------------
// 1. A hosszúság mérése – kártyaképek (Párosító 150 × 80, Csoportosító 80 × 80)
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

const Card: React.FC<{ small?: boolean; children: React.ReactNode; bg?: string }> = ({ small, children, bg = '#f8fafc' }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width={W - 4} height="76" rx="10" fill={bg} stroke="#334155" strokeWidth="3" />
      {children}
    </svg>
  );
};

/**
 * Vonalzó csíkkal. Nagy kártyán minden cm-nél szám; kicsin csak 0, 5, 10, 15
 * (a 10-es vonás pirossal kiemelve – 1 dm).
 */
export const RulerCard: React.FC<{ start?: number; len: number; small?: boolean; color?: string }> = ({
  start = 0,
  len,
  small,
  color = '#3b82f6'
}) => {
  const W = small ? 80 : 150;
  const to = small ? 15 : Math.max(start + len + 1, 6);
  const x0 = 10;
  const unit = (W - 20) / to;
  const ry = 44;
  return (
    <Card small={small}>
      <rect x={x0 + start * unit} y={22} width={len * unit} height={12} rx="2" fill={color} stroke="#1e293b" strokeWidth="1.5" />
      <rect x={x0 - 4} y={ry} width={to * unit + 8} height={28} rx="3" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
      {Array.from({ length: to + 1 }, (_, i) => {
        const tx = x0 + i * unit;
        const showNum = small ? i % 5 === 0 : true;
        const red = small && i === 10;
        return (
          <g key={i}>
            <line x1={tx} y1={ry} x2={tx} y2={ry + (i % 5 === 0 ? 12 : 7)} stroke={red ? '#dc2626' : '#78350f'} strokeWidth={red ? 2.6 : 1.5} />
            {showNum && (
              <text
                x={tx}
                y={ry + 25}
                textAnchor="middle"
                fontSize={small ? 12 : to > 12 ? 9 : 11}
                fontWeight="900"
                fill={red ? '#dc2626' : '#78350f'}
              >
                {i}
              </text>
            )}
          </g>
        );
      })}
    </Card>
  );
};

/** Testrész-mértékegység képe (arasz, láb, hüvelyk). */
export const BodyUnitCard: React.FC<{ kind: 'arasz' | 'lab' | 'huvelyk'; small?: boolean }> = ({ kind, small }) => {
  const W = small ? 80 : 150;
  const cx = W / 2;
  return (
    <Card small={small} bg="#fff7ed">
      {kind === 'arasz' && <HandSpanPart x={cx + 6} y={56} s={0.85} />}
      {kind === 'lab' && <FootPart x={cx} y={60} s={1.05} />}
      {kind === 'huvelyk' && <ThumbPart x={cx + 2} y={50} s={1} />}
    </Card>
  );
};

/** `dm` darab deciméteres rúd és `cm` darab kis kocka (számok nélkül). */
export const RodCard: React.FC<{ dm: number; cm: number; small?: boolean }> = ({ dm, cm, small }) => {
  const W = small ? 80 : 150;
  const cell = 6;
  const rodW = small ? 8 : 11;
  const gap = small ? 3 : 5;
  const used = dm * (rodW + gap) + (cm > 0 ? cell + 2 : 0);
  const x0 = (W - used) / 2;
  const y0 = 10;
  return (
    <Card small={small}>
      {Array.from({ length: dm }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * (rodW + gap)} y={y0} width={rodW} height={cell * 10} rx="1.5" fill="#fb923c" stroke="#9a3412" strokeWidth="1.6" />
          {Array.from({ length: 9 }, (_, k) => (
            <line
              key={k}
              x1={x0 + i * (rodW + gap)}
              y1={y0 + (k + 1) * cell}
              x2={x0 + i * (rodW + gap) + rodW}
              y2={y0 + (k + 1) * cell}
              stroke="#9a3412"
              strokeWidth="0.7"
            />
          ))}
        </g>
      ))}
      {Array.from({ length: cm }, (_, i) => (
        <rect
          key={`c${i}`}
          x={x0 + dm * (rodW + gap) + 1}
          y={y0 + (9 - i) * cell}
          width={cell + 1}
          height={cell}
          fill="#ffffff"
          stroke="#334155"
          strokeWidth="1.2"
        />
      ))}
    </Card>
  );
};

/** 1 dm-es versenypálya: a megtett rész vastag, a hátralévő vékony. */
export const TrackCard: React.FC<{ done: number }> = ({ done }) => {
  const x0 = 12;
  const unit = 12.6;
  const y = 40;
  return (
    <Card>
      <line x1={x0} y1={y} x2={x0 + 10 * unit} y2={y} stroke="#cbd5e1" strokeWidth="4" />
      <line x1={x0} y1={y} x2={x0 + done * unit} y2={y} stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
      <circle cx={x0 + done * unit} cy={y - 11} r="7" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />
      <circle cx={x0 + done * unit - 2.5} cy={y - 12} r="1.4" fill="#111827" />
      <circle cx={x0 + done * unit + 2.5} cy={y - 9} r="1.4" fill="#111827" />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={x0 + i * unit} y1={y + 5} x2={x0 + i * unit} y2={y + 12} stroke="#334155" strokeWidth="1.6" />
          <text x={x0 + i * unit} y={y + 26} textAnchor="middle" fontSize="10" fontWeight="900" fill="#334155">
            {i}
          </text>
        </g>
      ))}
      <rect x={x0 + 10 * unit - 2} y={y - 22} width="5" height="22" fill="#111827" />
    </Card>
  );
};

/** 1 m-es csík 10 deciméteres részre osztva; az első `filled` rész színes. */
export const MeterBarCard: React.FC<{ filled: number }> = ({ filled }) => {
  const x0 = 10;
  const seg = 13;
  return (
    <Card>
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={i}
          x={x0 + i * seg}
          y={26}
          width={seg}
          height={22}
          fill={i < filled ? '#3b82f6' : '#ffffff'}
          stroke="#1e3a8a"
          strokeWidth="1.6"
        />
      ))}
      <text x={x0 + seg / 2} y={66} textAnchor="middle" fontSize="11" fontWeight="900" fill="#1e3a8a">
        1 dm
      </text>
      <text x={x0 + 10 * seg} y={66} textAnchor="end" fontSize="13" fontWeight="900" fill="#0f172a">
        1 m
      </text>
    </Card>
  );
};

/** `n` deciméteres szakasz (soronként 5), az első alatt „1 dm” felirat. */
export const DmBarCard: React.FC<{ n: number }> = ({ n }) => {
  const seg = 13;
  const x0 = 7.5;
  const rows = Math.ceil(n / 5);
  const rowH = 15;
  const y0 = 10 + (3 - rows) * 6;
  return (
    <Card small>
      {Array.from({ length: n }, (_, i) => (
        <rect
          key={i}
          x={x0 + (i % 5) * seg}
          y={y0 + Math.floor(i / 5) * rowH}
          width={seg}
          height={11}
          fill={Math.floor(i / 5) % 2 === 0 ? '#fb923c' : '#facc15'}
          stroke="#9a3412"
          strokeWidth="1.4"
        />
      ))}
      <text x="40" y="72" textAnchor="middle" fontSize="11" fontWeight="900" fill="#9a3412">
        1 rész: 1 dm
      </text>
    </Card>
  );
};
