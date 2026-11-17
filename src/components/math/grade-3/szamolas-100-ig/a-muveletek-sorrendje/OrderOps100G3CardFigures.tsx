import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.
// Ugyanaz a képi nyelv, mint a tananyagban: vonat (+, −), béka a tavirózsákon (·, :),
// zacskók almával, narancs keret az első lépés körül. A végeredmény sosincs a képen.
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

/**
 * Lánc balról jobbra: kezdőszám → művelet → (üres) → művelet → "?".
 * kind = 'train': vagonok (csak + és −), 'frog': tavirózsák (csak · és :).
 */
export const ChainCard: React.FC<{ start: string; ops: [string, string]; kind: 'train' | 'frog' }> = ({ start, ops, kind }) => {
  const boxes = [
    { x: 2, w: 36, t: start },
    { x: 68, w: 18, t: '' },
    { x: 116, w: 32, t: '?' }
  ];
  const arrows = [
    { x0: 40, x1: 66, t: ops[0] },
    { x0: 88, x1: 114, t: ops[1] }
  ];
  const train = kind === 'train';
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {train && <line x1="2" y1="70" x2="148" y2="70" stroke="#94a3b8" strokeWidth="3" />}
      {boxes.map((b, i) =>
        train ? (
          <g key={i}>
            <rect x={b.x} y="36" width={b.w} height="28" rx="5" fill={['#38bdf8', '#f87171', '#c084fc'][i]} stroke="#1e293b" strokeWidth="2.5" />
            <circle cx={b.x + 8} cy="67" r="4" fill="#334155" />
            <circle cx={b.x + b.w - 8} cy="67" r="4" fill="#334155" />
            <text x={b.x + b.w / 2} y="58" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">
              {b.t}
            </text>
          </g>
        ) : (
          <g key={i}>
            <ellipse cx={b.x + b.w / 2} cy="56" rx={b.w / 2 + 2} ry="15" fill="#4ade80" stroke="#15803d" strokeWidth="2.5" />
            <text x={b.x + b.w / 2} y="64" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#14532d">
              {b.t}
            </text>
          </g>
        )
      )}
      {arrows.map((a, i) => (
        <g key={i}>
          {train ? (
            <>
              <line x1={a.x0} y1="50" x2={a.x1 - 2} y2="50" stroke="#dc2626" strokeWidth="3" />
              <polygon points={`${a.x1},50 ${a.x1 - 7},45 ${a.x1 - 7},55`} fill="#dc2626" />
            </>
          ) : (
            <>
              <path d={`M ${a.x0 - 4} 44 Q ${(a.x0 + a.x1) / 2} 26 ${a.x1 + 4} 44`} fill="none" stroke="#7c3aed" strokeWidth="3" strokeDasharray="5 3" />
              <polygon points={`${a.x1 + 6},46 ${a.x1 + 5},36 ${a.x1 - 3},42`} fill="#7c3aed" />
            </>
          )}
          <text x={(a.x0 + a.x1) / 2} y="22" textAnchor="middle" fontSize="19" fontWeight="bold" fill={train ? '#b91c1c' : '#5b21b6'}>
            {a.t}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Ugyanez függőlegesen, a csoportosító kártyára (80 × 80): fentről lefelé haladunk. */
export const ChainSmallCard: React.FC<{ start: string; ops: [string, string] }> = ({ start, ops }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="34" height="22" rx="5" fill="#38bdf8" stroke="#1e293b" strokeWidth="2.5" />
    <text x="19" y="20" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#0f172a">
      {start}
    </text>
    <rect x="9" y="32" width="20" height="16" rx="4" fill="#f87171" stroke="#1e293b" strokeWidth="2.5" />
    <rect x="2" y="56" width="34" height="22" rx="5" fill="#c084fc" stroke="#1e293b" strokeWidth="2.5" />
    <text x="19" y="74" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#0f172a">
      ?
    </text>
    {[
      { y0: 24, y1: 32, t: ops[0], ty: 34 },
      { y0: 48, y1: 56, t: ops[1], ty: 58 }
    ].map((a, i) => (
      <g key={i}>
        <line x1="19" y1={a.y0} x2="19" y2={a.y1} stroke="#dc2626" strokeWidth="3" />
        <text x="39" y={a.ty} fontSize="17" fontWeight="bold" fill="#b91c1c">
          {a.t}
        </text>
      </g>
    ))}
  </svg>
);

type Part = { bags: number; each: number } | { loose: number };

const Bag: React.FC<{ x: number; y: number; w: number; h: number; each: number; fs: number }> = ({ x, y, w, h, each, fs }) => (
  <g>
    <path d={`M ${x} ${y} L ${x + w} ${y} L ${x + w - 3} ${y + h} L ${x + 3} ${y + h} Z`} fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" strokeLinejoin="round" />
    <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#92400e">
      {each}
    </text>
  </g>
);

const Pile: React.FC<{ cx: number; cy: number; w: number; h: number; n: number; fs: number; gone?: boolean }> = ({ cx, cy, w, h, n, fs, gone }) => (
  <g>
    <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2} fill={gone ? '#fff' : '#bbf7d0'} stroke={gone ? '#dc2626' : '#15803d'} strokeWidth="2.5" strokeDasharray={gone ? '5 3' : undefined} />
    <text x={cx} y={cy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={gone ? '#b91c1c' : '#14532d'}>
      {n}
    </text>
    {gone && <line x1={cx - w / 2 + 4} y1={cy + h / 2 - 3} x2={cx + w / 2 - 4} y2={cy - h / 2 + 3} stroke="#dc2626" strokeWidth="2.5" opacity="0.7" />}
  </g>
);

/**
 * Zacskók (a zacskón: hány alma van benne) és külön almakupac (zöld).
 * Minden rész külön sorban, a műveletsor sorrendjében. Párosító kártya (150 × 80).
 */
export const BagsCard: React.FC<{ parts: Part[] }> = ({ parts }) => {
  const rowH = parts.length > 1 ? 34 : 50;
  const y0 = (80 - (parts.length * rowH + (parts.length - 1) * 6)) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {parts.map((p, r) => {
        const y = y0 + r * (rowH + 6);
        if ('loose' in p) return <Pile key={r} cx={75} cy={y + rowH / 2} w={60} h={rowH - 2} n={p.loose} fs={22} />;
        const bw = Math.min(30, (144 - (p.bags - 1) * 5) / p.bags);
        const total = p.bags * bw + (p.bags - 1) * 5;
        const x0 = (150 - total) / 2;
        return (
          <g key={r}>
            {Array.from({ length: p.bags }, (_, i) => (
              <Bag key={i} x={x0 + i * (bw + 5)} y={y} w={bw} h={rowH} each={p.each} fs={22} />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/** Zacskók és kupac a csoportosító kártyára (80 × 80). gone: a kupacot elvesszük (−). */
export const BagsSmallCard: React.FC<{ bags: number; each: number; loose: number; gone?: boolean }> = ({ bags, each, loose, gone }) => {
  const cols = bags <= 2 ? bags : bags <= 4 ? 2 : 3;
  const rows = Math.ceil(bags / cols);
  const bw = Math.min(34, (76 - (cols - 1) * 4) / cols);
  const bh = rows > 1 ? 23 : 32;
  const gx = (80 - (cols * bw + (cols - 1) * 4)) / 2;
  const fs = cols === 3 ? 18 : 20;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: bags }, (_, i) => (
        <Bag key={i} x={gx + (i % cols) * (bw + 4)} y={2 + Math.floor(i / cols) * (bh + 3)} w={bw} h={bh} each={each} fs={fs} />
      ))}
      <Pile cx={40} cy={66} w={48} h={24} n={loose} fs={20} gone={gone} />
    </svg>
  );
};

/** A műveletsor nagy számokkal; az elsőként elvégzendő rész narancs keretben (segítség, nem a válasz). */
export const FirstStepCard: React.FC<{ tokens: string[]; from: number; to: number }> = ({ tokens, from, to }) => {
  const widths = tokens.map((t) => (t.length > 1 ? t.length * 14 : /[0-9]/.test(t) ? 15 : 26));
  const total = widths.reduce((a, b) => a + b, 0);
  let x = (150 - total) / 2;
  const xs = widths.map((w) => {
    const c = x + w / 2;
    x += w;
    return c;
  });
  const bx0 = xs[from] - widths[from] / 2 - 3;
  const bx1 = xs[to] + widths[to] / 2 + 3;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={bx0} y="20" width={bx1 - bx0} height="40" rx="9" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
      <circle cx={(bx0 + bx1) / 2} cy="11" r="9" fill="#ea580c" />
      <text x={(bx0 + bx1) / 2} y="15.5" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">
        1.
      </text>
      {tokens.map((t, i) => (
        <text key={i} x={xs[i]} y="49" textAnchor="middle" fontSize="23" fontWeight="bold" fill="#0f172a">
          {t}
        </text>
      ))}
    </svg>
  );
};
