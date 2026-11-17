import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz
// ---------------------------------------------------------------------------

const FONT = 'system-ui, sans-serif';

/** Korongok téglalap alakban: rows sor, soronként cols korong (sávos sorokkal, mint a tananyagban). */
export const ArrayCard: React.FC<{ rows: number; cols: number; small?: boolean }> = ({ rows, cols, small }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const p = Math.min((W - 4) / cols, (H - 4) / rows, 17);
  const r = p * 0.37;
  const ox = (W - cols * p) / 2;
  const oy = (H - rows * p) / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: rows }, (_, i) => (
        <g key={i}>
          <rect x={ox + 1} y={oy + i * p + 1} width={cols * p - 2} height={p - 2} rx={(p - 2) / 2} fill={i % 2 ? '#fef3c7' : '#fde68a'} />
          {Array.from({ length: cols }, (_, j) => (
            <circle key={j} cx={ox + j * p + p / 2} cy={oy + i * p + p / 2} r={r} fill="#ef4444" stroke="#991b1b" strokeWidth="1.6" />
          ))}
        </g>
      ))}
    </svg>
  );
};

/** Gyöngyök csoportokban (bennfoglalás): groups db lila keret, mindegyikben size gyöngy, 2 oszlopban. */
export const GroupsCard: React.FC<{ groups: number; size: number }> = ({ groups, size }) => {
  const W = 150;
  const H = 80;
  const cols = size <= 3 ? 1 : 2;
  const rows = Math.ceil(size / cols);
  const pillU = cols + 0.6;
  const gapU = 0.45;
  const p = Math.min((W - 8) / (groups * pillU + (groups - 1) * gapU), (H - 8) / (rows + 0.6), 15);
  const r = p * 0.38;
  const pw = pillU * p;
  const ph = (rows + 0.6) * p;
  const totW = groups * pw + (groups - 1) * gapU * p;
  const ox = (W - totW) / 2;
  const oy = (H - ph) / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: groups }, (_, g) => {
        const gx = ox + g * (pw + gapU * p);
        return (
          <g key={g}>
            <rect x={gx} y={oy} width={pw} height={ph} rx={Math.min(pw, ph) / 2} fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.5" />
            {Array.from({ length: size }, (_, k) => {
              const c = k % cols;
              const rr = Math.floor(k / cols);
              return (
                <circle
                  key={k}
                  cx={gx + 0.3 * p + c * p + p / 2}
                  cy={oy + 0.3 * p + rr * p + p / 2}
                  r={r}
                  fill="#f59e0b"
                  stroke="#78350f"
                  strokeWidth="1.4"
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

/**
 * Művelet két sorban (80 × 80), egy szám sárga kerettel kiemelve.
 * Felső sor: „a op b”, alsó sor: „= c”. hi: melyik szám a kiemelt.
 */
export const NamedEqCard: React.FC<{ a: number; op: '·' | ':'; b: number; c: number; hi: 'a' | 'b' | 'c' }> = ({ a, op, b, c, hi }) => {
  const fs = 23;
  const cw = fs * 0.6;
  const wa = String(a).length * cw;
  const wb = String(b).length * cw;
  const wo = 24;
  const row1 = wa + wo + wb;
  const x1 = 40 - row1 / 2;
  const ax = x1 + wa / 2;
  const ox = x1 + wa + wo / 2;
  const bx = x1 + wa + wo + wb / 2;
  const wc = String(c).length * cw;
  const row2 = 28 + wc;
  const x2 = 40 - row2 / 2;
  const ex = x2 + 8;
  const cx = x2 + 28 + wc / 2;
  const y1 = 32;
  const y2 = 66;
  const box = (x: number, y: number, w: number) => (
    <rect x={x - w / 2 - 4} y={y - fs * 0.86} width={w + 8} height={fs * 1.08} rx="5" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />
  );
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {hi === 'a' && box(ax, y1, wa)}
      {hi === 'b' && box(bx, y1, wb)}
      {hi === 'c' && box(cx, y2, wc)}
      <g fontSize={fs} fontWeight="bold" fill="#0f172a" textAnchor="middle">
        <text x={ax} y={y1}>{a}</text>
        <text x={ox} y={y1}>{op}</text>
        <text x={bx} y={y1}>{b}</text>
        <text x={ex} y={y2}>=</text>
        <text x={cx} y={y2}>{c}</text>
      </g>
    </svg>
  );
};
