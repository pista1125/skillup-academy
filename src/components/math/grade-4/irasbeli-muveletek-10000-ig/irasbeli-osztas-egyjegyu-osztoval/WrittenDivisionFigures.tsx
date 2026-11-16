import React from 'react';

const FONT = 'system-ui, sans-serif';
export const DIV_COLORS4 = ['#16a34a', '#dc2626', '#0ea5e9', '#eab308']; // E, sz, t, e
export const DIV_HEADS4 = ['E', 'sz', 't', 'e'];

export interface DivStep {
  /** az osztandó számjegyeinek indexe (balról), ahol ez a lépés véget ér */
  col: number;
  /** a részosztandó (pl. 22, 14, 12) */
  partial: number;
  /** a hányados számjegye */
  q: number;
  /** a maradék */
  r: number;
}

/**
 * Az írásbeli osztás lépései (egyjegyű osztó). Az első részosztandóba annyi számjegyet
 * veszünk, hogy megvan benne az osztó (pl. 224 : 3 → 22). Utána minden lépésben a maradék
 * mellé „lehozzuk” a következő számjegyet.
 */
export const divSteps = (a: number, d: number): DivStep[] => {
  const digits = String(a).split('').map(Number);
  const steps: DivStep[] = [];
  let i = 0;
  let partial = digits[0];
  while (partial < d && i < digits.length - 1) {
    i += 1;
    partial = partial * 10 + digits[i];
  }
  for (;;) {
    const q = Math.floor(partial / d);
    const r = partial - q * d;
    steps.push({ col: i, partial, q, r });
    if (i >= digits.length - 1) break;
    i += 1;
    partial = r * 10 + digits[i];
  }
  return steps;
};

/** Írásbeli osztás rövid (Viktória) vagy hosszú (Luca) alakban, helyiérték-oszlopokkal. */
export const DivLayout: React.FC<{
  a: number;
  d: number;
  mode: 'short' | 'long';
  title?: string;
  className?: string;
}> = ({ a, d, mode, title, className }) => {
  const digits = String(a).split('');
  const n = digits.length;
  const heads = DIV_HEADS4.slice(4 - n);
  const colors = DIV_COLORS4.slice(4 - n);
  const steps = divSteps(a, d);
  const cw = 34;
  const x0 = 70;
  const colX = (c: number) => x0 + c * cw;
  const rowH = 26;
  const top = title ? 70 : 50;

  // sorok: { text, endCol, minus? , line? }
  type Row = { text: string; endCol: number; minus?: boolean; lineAfter?: boolean };
  const rows: Row[] = [];
  steps.forEach((s, k) => {
    const last = k === steps.length - 1;
    if (mode === 'long') {
      rows.push({ text: String(s.q * d), endCol: s.col, minus: true, lineAfter: true });
    }
    if (!last) {
      rows.push({ text: `${s.r}${digits[s.col + 1]}`, endCol: s.col + 1 });
    } else {
      rows.push({ text: String(s.r), endCol: s.col });
    }
  });
  const height = top + 20 + rows.length * rowH + 20;
  const quotient = steps.map((s) => s.q).join('');

  return (
    <svg viewBox={`0 0 400 ${height}`} className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height={height - 2} rx="12" fill="#f5f3ff" stroke="#c4b5fd" />
      {title && (
        <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4c1d95">
          {title}
        </text>
      )}
      {heads.map((h, i) => (
        <g key={h}>
          <rect x={colX(i) - cw / 2} y={top - 30} width={cw} height="20" fill={colors[i]} />
          <text x={colX(i)} y={top - 15} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">
            {h}
          </text>
          <rect x={colX(i) - cw / 2} y={top - 10} width={cw} height={height - top - 6} fill={colors[i]} opacity="0.12" />
        </g>
      ))}
      {digits.map((dg, i) => (
        <g key={`d${i}`}>
          <text x={colX(i)} y={top + 12} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">
            {dg}
          </text>
          {i >= steps[0].col && (
            <text x={colX(i) + 11} y={top} fontSize="14" fontWeight="bold" fill="#7c3aed">
              '
            </text>
          )}
        </g>
      ))}
      <text x={colX(n - 1) + 28} y={top + 12} fontSize="22" fontWeight="bold" fill="#0f172a">
        : {d} = <tspan fill="#7c3aed">{quotient}</tspan>
      </text>
      {rows.map((r, k) => {
        const y = top + 12 + (k + 1) * rowH;
        const chars = r.text.split('');
        return (
          <g key={`row${k}`}>
            {r.minus && (
              <text x={colX(r.endCol - chars.length + 1) - 22} y={y} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#64748b">
                −
              </text>
            )}
            {chars.map((ch, j) => (
              <text
                key={j}
                x={colX(r.endCol - chars.length + 1 + j)}
                y={y}
                textAnchor="middle"
                fontSize="19"
                fontWeight="bold"
                fill={r.minus ? '#64748b' : '#db2777'}
              >
                {ch}
              </text>
            ))}
            {r.lineAfter && (
              <line
                x1={colX(r.endCol - chars.length + 1) - cw / 2}
                y1={y + 6}
                x2={colX(r.endCol) + cw / 2}
                y2={y + 6}
                stroke="#334155"
                strokeWidth="1.5"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** 2872 : 2 = 1436 rövid alakban (tankönyv 97. o., Viktória módszere). */
export const DivShortFormSvg: React.FC<{ className?: string }> = ({ className }) => (
  <DivLayout a={2872} d={2} mode="short" title="Rövid alak: csak a maradékot írjuk le" className={className} />
);

/** 2872 : 2 = 1436 hosszú alakban, a kivonásokkal (tankönyv 97. o.). */
export const DivLongFormSvg: React.FC<{ className?: string }> = ({ className }) => (
  <DivLayout a={2872} d={2} mode="long" title="Hosszú alak: a kivonásokat is leírjuk" className={className} />
);

/** 224 : 3 = 74, marad 2 – a szalag (tankönyv 99. o., 15. feladat). */
export const DivRemainderSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 190" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="188" rx="12" fill="#fff1f2" stroke="#fda4af" />
    <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9f1239">
      224 cm szalag 3 egyenlő részre
    </text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={20 + i * 118} y="40" width="114" height="26" rx="4" fill={['#f472b6', '#a78bfa', '#38bdf8'][i]} />
        <text x={77 + i * 118} y="58" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">
          74 cm
        </text>
      </g>
    ))}
    <rect x="374" y="40" width="10" height="26" rx="2" fill="#fbbf24" />
    <text x="379" y="84" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">2 cm</text>
    <g fontSize="22" fontWeight="bold">
      <text x="60" y="122" fill="#0f172a">2</text>
      <text x="86" y="122" fill="#0f172a">2</text>
      <text x="98" y="110" fontSize="14" fill="#7c3aed">'</text>
      <text x="112" y="122" fill="#0f172a">4</text>
      <text x="124" y="110" fontSize="14" fill="#7c3aed">'</text>
      <text x="140" y="122" fill="#0f172a">: 3 = <tspan fill="#7c3aed">74</tspan></text>
      <text x="86" y="150" fill="#db2777">1</text>
      <text x="112" y="150" fill="#db2777">4</text>
      <text x="112" y="178" fill="#b45309">2</text>
    </g>
    <text x="300" y="132" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">Ellenőrzés:</text>
    <text x="300" y="154" textAnchor="middle" fontSize="13" fill="#334155">74 · 3 = 222</text>
    <text x="300" y="174" textAnchor="middle" fontSize="13" fill="#334155">222 + 2 = 224 ✔</text>
  </svg>
);

/** 2820 : 2 bontással (tankönyv 94. o., 2. feladat). */
export const DivSplitSvg: React.FC<{ className?: string }> = ({ className }) => {
  const parts = [
    { t: '2000 : 2', r: '1000', c: '#16a34a' },
    { t: '800 : 2', r: '400', c: '#dc2626' },
    { t: '20 : 2', r: '10', c: '#0ea5e9' }
  ];
  return (
    <svg viewBox="0 0 400 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="168" rx="12" fill="#f0fdf4" stroke="#86efac" />
      <text x="200" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#14532d">
        2820 : 2 = ?
      </text>
      {parts.map((p, i) => (
        <g key={p.t}>
          <rect x={20 + i * 126} y="48" width="110" height="36" rx="8" fill="#fff" stroke={p.c} strokeWidth="2" />
          <text x={75 + i * 126} y="72" textAnchor="middle" fontSize="15" fontWeight="bold" fill={p.c}>
            {p.t}
          </text>
          <line x1={75 + i * 126} y1="86" x2={75 + i * 126} y2="104" stroke={p.c} strokeWidth="2" />
          <polygon points={`${75 + i * 126},110 ${70 + i * 126},102 ${80 + i * 126},102`} fill={p.c} />
          <text x={75 + i * 126} y="130" textAnchor="middle" fontSize="18" fontWeight="bold" fill={p.c}>
            {p.r}
          </text>
          {i < 2 && (
            <text x={138 + i * 126} y="130" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#334155">
              +
            </text>
          )}
        </g>
      ))}
      <text x="200" y="158" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#14532d">
        1000 + 400 + 10 = 1410
      </text>
    </svg>
  );
};

/** 750 Ft : 3 pénzzel – Panna módszere (tankönyv 96. o., 4. feladat). */
export const CoinShareSvg: React.FC<{ className?: string }> = ({ className }) => {
  const coin = (cx: number, cy: number, v: string, key: string) => (
    <g key={key}>
      <circle cx={cx} cy={cy} r="11" fill={v === '100' ? '#facc15' : '#cbd5e1'} stroke={v === '100' ? '#a16207' : '#475569'} strokeWidth="1.5" />
      <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e293b">
        {v}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 400 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="198" rx="12" fill="#fffbeb" stroke="#fcd34d" />
      <text x="200" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#78350f">
        750 Ft : 3 – mindenki ugyanannyit kap
      </text>
      {['Viktória', 'Panna', 'Luca'].map((name, g) => (
        <g key={name}>
          <rect x={14 + g * 128} y="34" width="116" height="104" rx="10" fill="#fff" stroke="#16a34a" strokeWidth="2" />
          <text x={72 + g * 128} y="52" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
            {name}
          </text>
          {coin(44 + g * 128, 72, '100', `h${g}a`)}
          {coin(70 + g * 128, 72, '100', `h${g}b`)}
          {[0, 1, 2, 3, 4].map((k) => coin(28 + g * 128 + k * 22, 104, '10', `t${g}${k}`))}
          <text x={72 + g * 128} y="130" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">
            ? Ft
          </text>
        </g>
      ))}
      <text x="200" y="160" textAnchor="middle" fontSize="12" fill="#334155">
        7 százas : 3 = 2 százas, marad 1 százas → felváltjuk 10 tízesre.
      </text>
      <text x="200" y="180" textAnchor="middle" fontSize="12" fill="#334155">
        1 sz + 5 t = 15 t, 15 t : 3 = 5 t, marad 0.
      </text>
    </svg>
  );
};
