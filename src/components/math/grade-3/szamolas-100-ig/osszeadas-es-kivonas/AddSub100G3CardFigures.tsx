import React from 'react';
import { FONT, UNK } from './AddSub100G3Parts';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz
// ---------------------------------------------------------------------------

const ROD = '#3b82f6';
const ROD_LINE = '#1e3a8a';

/** Egy tízesrúd (x, y bal felső sarok); crossed: kihúzva (elvettük). */
const Rod: React.FC<{ x: number; y: number; h: number; w: number; crossed?: boolean }> = ({ x, y, h, w, crossed }) => (
  <g opacity={crossed ? 0.45 : 1}>
    <rect x={x} y={y} width={w} height={h} rx="1.5" fill={crossed ? '#bfdbfe' : ROD} stroke={ROD_LINE} strokeWidth="2.2" />
    {Array.from({ length: 9 }, (_, k) => (
      <line key={k} x1={x} y1={y + ((k + 1) * h) / 10} x2={x + w} y2={y + ((k + 1) * h) / 10} stroke={ROD_LINE} strokeWidth="0.9" />
    ))}
  </g>
);

/**
 * Kerek tízesek tízesrudakkal.
 * op '+': a rúd, „+”, b rúd.  op '−': a rúd, ebből az utolsó b ki van húzva.
 */
export const RodsOpCard: React.FC<{ a: number; b: number; op: '+' | '−'; small?: boolean }> = ({ a, b, op, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const w = 9;
  const p = 12;
  const h = 60;
  const plusW = op === '+' ? 22 : 0;
  const n1 = a;
  const n2 = op === '+' ? b : 0;
  const natW = n1 * p - (p - w) + (op === '+' ? plusW + n2 * p - (p - w) : 0);
  const s = Math.min((W - 8) / natW, (H - 12) / h, 1.1);
  const ox = (W - natW * s) / 2;
  const oy = (H - h * s) / 2;
  const rods: React.ReactNode[] = [];
  for (let i = 0; i < n1; i++) {
    const crossed = op === '−' && i >= a - b;
    rods.push(<Rod key={`a${i}`} x={i * p} y={0} h={h} w={w} crossed={crossed} />);
  }
  const startB = n1 * p - (p - w) + plusW;
  for (let i = 0; i < n2; i++) rods.push(<Rod key={`b${i}`} x={startB + i * p} y={0} h={h} w={w} />);
  const crossStart = (a - b) * p - 2;
  const crossEnd = a * p - (p - w) + 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <g transform={`translate(${ox} ${oy}) scale(${s})`}>
        {rods}
        {op === '+' && (
          <g stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round">
            <line x1={startB - plusW / 2 - 7} y1={h / 2} x2={startB - plusW / 2 + 7} y2={h / 2} />
            <line x1={startB - plusW / 2} y1={h / 2 - 7} x2={startB - plusW / 2} y2={h / 2 + 7} />
          </g>
        )}
        {op === '−' && (
          <g stroke={UNK} strokeWidth="3.5" strokeLinecap="round">
            <line x1={crossStart} y1={h - 4} x2={crossEnd} y2={4} />
            <line x1={crossStart} y1={4} x2={crossEnd} y2={h - 4} />
          </g>
        )}
      </g>
    </svg>
  );
};

/**
 * Mini számegyenes egy ugrással (start → start + delta). A kerek tízes osztása vastag.
 * small (80 × 80): felirat nélkül, csak az ív – a kártya szövege adja a műveletet.
 * Nagy (150 × 80): a kezdőszám alul, az ív fölött a lépés, a végpontnál piros „?”.
 */
export const JumpCard: React.FC<{ start: number; delta: number; small?: boolean }> = ({ start, delta, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const end = start + delta;
  const lo = Math.min(start, end) - 1;
  const hi = Math.max(start, end) + 1;
  const x0 = 8;
  const x1 = W - 8;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const y = small ? 56 : 50;
  const top = small ? 14 : 18;
  const xs = X(start);
  const xe = X(end);
  const mid = (xs + xe) / 2;
  const color = delta > 0 ? '#16a34a' : '#ea580c';
  const dx = xe - mid;
  const dy = y - 3 - (top - 6);
  const dl = Math.hypot(dx, dy);
  const ux = dx / dl;
  const uy = dy / dl;
  const tx = xe;
  const ty = y - 3;
  const arrow = `M ${tx} ${ty} L ${tx - 10 * ux - 5 * uy} ${ty - 10 * uy + 5 * ux} L ${tx - 10 * ux + 5 * uy} ${ty - 10 * uy - 5 * ux} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={x0 - 4} y1={y} x2={x1 + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: hi - lo + 1 }, (_, i) => {
        const v = lo + i;
        const ten = v % 10 === 0;
        return (
          <line
            key={v}
            x1={X(v)}
            y1={ten ? y - 11 : y - 5}
            x2={X(v)}
            y2={ten ? y + 11 : y + 5}
            stroke={ten ? '#7c3aed' : '#334155'}
            strokeWidth={ten ? 4 : 1.8}
          />
        );
      })}
      <path d={`M ${xs} ${y - 3} Q ${mid} ${top - 6} ${xe} ${y - 3}`} fill="none" stroke={color} strokeWidth="3.5" />
      <path d={arrow} fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx={xs} cy={y} r="4.5" fill="#0f172a" />
      {!small && (
        <>
          <text x={mid} y={top + 4} textAnchor="middle" fontSize="18" fontWeight="bold" fill={color}>
            {delta > 0 ? `+${delta}` : `−${-delta}`}
          </text>
          <text x={xs} y={H - 4} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">
            {start}
          </text>
          <text x={xe} y={H - 4} textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>
            ?
          </text>
        </>
      )}
    </svg>
  );
};

/**
 * Szalagos (rész–egész) ábra.
 * add: felső sor a két rész (a | b), alsó sor az egész „?”.
 * sub: felső sor az egész (a), alsó sor az ismert rész (b) és a hiányzó rész „?”.
 */
export const BarCard: React.FC<{ a: number; b: number; mode: 'add' | 'sub'; small?: boolean }> = ({ a, b, mode, small }) => {
  const W = small ? 80 : 150;
  const x0 = 4;
  const len = W - 8;
  const rowH = 32;
  const y1 = 6;
  const y2 = 42;
  const fs = small ? 20 : 22;
  const total = mode === 'add' ? a + b : a;
  const split = x0 + (len * (mode === 'add' ? a : b)) / total;
  const Box: React.FC<{ x: number; y: number; w: number; fill: string; label: string; unk?: boolean }> = ({ x, y, w, fill, label, unk }) => (
    <g>
      <rect x={x} y={y} width={w} height={rowH} rx="4" fill={fill} stroke="#334155" strokeWidth="2.5" />
      <text x={x + w / 2} y={y + rowH / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={unk ? UNK : '#0f172a'}>
        {label}
      </text>
    </g>
  );
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {mode === 'add' ? (
        <>
          <Box x={x0} y={y1} w={split - x0} fill="#bbf7d0" label={String(a)} />
          <Box x={split} y={y1} w={x0 + len - split} fill="#bfdbfe" label={String(b)} />
          <Box x={x0} y={y2} w={len} fill="#fef3c7" label="?" unk />
        </>
      ) : (
        <>
          <Box x={x0} y={y1} w={len} fill="#fef3c7" label={String(a)} />
          <Box x={x0} y={y2} w={split - x0} fill="#bfdbfe" label={String(b)} />
          <Box x={split} y={y2} w={x0 + len - split} fill="#fff" label="?" unk />
        </>
      )}
    </svg>
  );
};
