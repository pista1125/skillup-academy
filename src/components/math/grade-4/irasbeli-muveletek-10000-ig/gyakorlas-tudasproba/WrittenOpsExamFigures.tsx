import React from 'react';

const FONT = 'system-ui, sans-serif';
const UNK = '#dc2626';
const PV = [
  { t: 'E', c: '#bbf7d0' },
  { t: 'sz', c: '#fecaca' },
  { t: 't', c: '#bae6fd' },
  { t: 'e', c: '#fef08a' }
];

// ---------------------------------------------------------------------------
// Általános írásbeli elrendezések (a kvíz is ezeket használja)
// ---------------------------------------------------------------------------

/**
 * Írásbeli összeadás / kivonás oszlopokban, E–sz–t–e fejléccel.
 * A sorokban a „?” vagy „■” piros. `carries`: a maradékok (kis számok) az oszlopok fölött, jobbról balra helyiértékenként ('' = nincs).
 */
export const ColumnOp: React.FC<{
  rows: string[];
  op: '+' | '−';
  result: string;
  carries?: string[];
  className?: string;
  w?: number;
}> = ({ rows, op, result, carries, className, w = 200 }) => {
  const cw = 30;
  const cols = 4;
  const x0 = w - 20 - cols * cw;
  const h = 56 + (rows.length + 1) * 30 + (carries ? 6 : 0);
  const digitAt = (s: string, k: number) => {
    const d = s.padStart(cols, ' ');
    return d[k];
  };
  const top = carries ? 40 : 34;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className ?? 'w-full max-w-[260px] h-auto mx-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#ffffff" stroke="#cbd5e1" />
      {PV.map((p, k) => (
        <g key={p.t}>
          <rect x={x0 + k * cw} y="8" width={cw} height={h - 16} fill={p.c} opacity="0.45" />
          <text x={x0 + k * cw + cw / 2} y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{p.t}</text>
        </g>
      ))}
      {carries &&
        carries.map((c, i) =>
          c ? (
            <text key={i} x={x0 + (cols - 1 - i) * cw + cw / 2 + 9} y={top - 2} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7c3aed">
              {c}
            </text>
          ) : null
        )}
      {rows.map((r, ri) => (
        <g key={ri}>
          {ri === rows.length - 1 && (
            <text x={x0 - 14} y={top + 22 + ri * 30} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{op}</text>
          )}
          {Array.from({ length: cols }).map((_, k) => {
            const ch = digitAt(r, k);
            const unk = ch === '?' || ch === '■';
            return (
              <text key={k} x={x0 + k * cw + cw / 2} y={top + 22 + ri * 30} textAnchor="middle" fontSize="20" fontWeight="bold" fill={unk ? UNK : '#0f172a'}>
                {ch === ' ' ? '' : ch}
              </text>
            );
          })}
        </g>
      ))}
      <line x1={x0 - 24} y1={top + 30 + (rows.length - 1) * 30} x2={x0 + cols * cw} y2={top + 30 + (rows.length - 1) * 30} stroke="#0f172a" strokeWidth="2" />
      {Array.from({ length: cols }).map((_, k) => {
        const ch = digitAt(result, k);
        const unk = ch === '?' || ch === '■';
        return (
          <text key={k} x={x0 + k * cw + cw / 2} y={top + 22 + rows.length * 30 + 4} textAnchor="middle" fontSize="20" fontWeight="bold" fill={unk ? UNK : '#0f172a'}>
            {ch === ' ' ? '' : ch}
          </text>
        );
      })}
    </svg>
  );
};

/** Írásbeli szorzás a tankönyv elrendezésében: „1623 · 2”, alatta vonal és a szorzat. */
export const MulLayout: React.FC<{ a: string; b: string; result: string; className?: string }> = ({ a, b, result, className }) => (
  <svg viewBox="0 0 220 110" className={className ?? 'w-full max-w-[240px] h-auto mx-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="218" height="108" rx="10" fill="#ffffff" stroke="#cbd5e1" />
    {a.split('').map((d, i) => (
      <text key={i} x={70 + (i - a.length + 4) * 24} y="44" textAnchor="middle" fontSize="22" fontWeight="bold" fill={d === '■' || d === '?' ? UNK : '#0f172a'}>{d}</text>
    ))}
    <text x="160" y="44" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">·</text>
    <text x="184" y="44" textAnchor="middle" fontSize="22" fontWeight="bold" fill={b === '?' || b === '■' ? UNK : '#0f172a'}>{b}</text>
    <line x1="30" y1="54" x2="150" y2="54" stroke="#0f172a" strokeWidth="2" />
    {result
      .padStart(5, ' ')
      .split('')
      .map((d, i) => (
        <text key={i} x={46 + i * 24} y="86" textAnchor="middle" fontSize="22" fontWeight="bold" fill={d === '?' || d === '■' ? UNK : '#0f172a'}>
          {d === ' ' ? '' : d}
        </text>
      ))}
  </svg>
);

/** A rövid alakú írásbeli osztás lépései: részosztandók, maradékok. */
export const shortDivRows = (dividend: number, divisor: number) => {
  const ds = String(dividend).split('').map(Number);
  // első részosztandó: ha az első jegy kisebb az osztónál, kettőt veszünk
  let start = 0;
  let cur = ds[0];
  if (cur < divisor && ds.length > 1) {
    start = 1;
    cur = cur * 10 + ds[1];
  }
  const rows: { col: number; text: string }[] = [];
  let q = '';
  for (let i = start; i < ds.length; i++) {
    if (i > start) cur = cur * 10 + ds[i];
    const qd = Math.floor(cur / divisor);
    q += String(qd);
    const r = cur - qd * divisor;
    rows.push({ col: i, text: i < ds.length - 1 ? `${r}${ds[i + 1]}` : `${r}` });
    cur = r;
  }
  return { start, quotient: Number(q), remainder: cur, rows };
};

/** Írásbeli osztás rövid alakban (tankönyv 97. o.): 2'8'7'2' : 2 = 1436, alatta a maradékok lépcsője. */
export const ShortDivLayout: React.FC<{ dividend: number; divisor: number; showQuotient?: boolean; showRows?: boolean; className?: string }> = ({
  dividend,
  divisor,
  showQuotient = true,
  showRows = true,
  className
}) => {
  const { start, quotient, rows } = shortDivRows(dividend, divisor);
  const ds = String(dividend).split('');
  const cw = 22;
  const x0 = 24;
  const h = showRows ? 54 + rows.length * 24 : 64;
  return (
    <svg viewBox={`0 0 240 ${h}`} className={className ?? 'w-full max-w-[260px] h-auto mx-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#ffffff" stroke="#cbd5e1" />
      {ds.map((d, i) => (
        <g key={i}>
          <text x={x0 + i * cw + cw / 2} y="36" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{d}</text>
          {i >= start && (
            <text x={x0 + i * cw + cw / 2 + 8} y="26" fontSize="12" fontWeight="bold" fill="#7c3aed">'</text>
          )}
        </g>
      ))}
      <text x={x0 + ds.length * cw + 8} y="36" fontSize="18" fontWeight="bold" fill="#0f172a">
        : {divisor} = <tspan fill={showQuotient ? '#0f172a' : UNK}>{showQuotient ? quotient : '?'}</tspan>
      </text>
      {showRows &&
        rows.map((r, k) =>
          r.text.split('').map((ch, j) => (
            <text
              key={`${k}-${j}`}
              x={x0 + (r.col + j) * cw + cw / 2}
              y={62 + k * 24}
              textAnchor="middle"
              fontSize="18"
              fontWeight="bold"
              fill={k === rows.length - 1 ? '#dc2626' : '#475569'}
            >
              {ch}
            </text>
          ))
        )}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Tananyag-ábrák
// ---------------------------------------------------------------------------

/** A fejezet hét állomása. */
export const ChapterStationsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const st = [
    { n: 1, t: 'Írásbeli + és −', c: '#6366f1' },
    { n: 2, t: 'Írásbeli szorzás', c: '#3b82f6' },
    { n: 3, t: 'Írásbeli osztás', c: '#8b5cf6' },
    { n: 4, t: 'Többszörösök', c: '#f59e0b' },
    { n: 5, t: 'Következtetés', c: '#14b8a6' },
    { n: 6, t: 'Kapcsolatok', c: '#10b981' },
    { n: 7, t: 'Sorrend', c: '#a855f7' }
  ];
  return (
    <svg viewBox="0 0 360 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="198" rx="14" fill="#fff1f2" stroke="#fecdd3" />
      <path d="M 30 60 L 330 60 Q 345 60 345 80 L 345 120 Q 345 140 330 140 L 30 140" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" strokeDasharray="2 10" />
      {st.map((s, i) => {
        const top = i < 4;
        const x = top ? 46 + i * 88 : 310 - (i - 4) * 110;
        const y = top ? 60 : 140;
        return (
          <g key={s.n}>
            <circle cx={x} cy={y} r="16" fill={s.c} stroke="#ffffff" strokeWidth="3" />
            <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ffffff">{s.n}</text>
            <text x={x} y={top ? y - 24 : y + 32} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{s.t}</text>
          </g>
        );
      })}
      <text x="14" y="192" fontSize="12" fontWeight="bold" fill="#be123c">8. Tudáspróba</text>
      <rect x="20" y="128" width="20" height="24" rx="3" fill="#e11d48" />
      <text x="30" y="145" textAnchor="middle" fontSize="12" fill="#ffffff">★</text>
    </svg>
  );
};

/** Írásbeli összeadás a tankönyv 71. oldaláról: 3845 + 2850 = 6695. */
export const ColumnAddSvg: React.FC<{ className?: string }> = ({ className }) => (
  <ColumnOp rows={['3845', '2850']} op="+" result="6695" carries={['', '', '', '1']} className={className ?? 'w-full h-auto max-w-[280px] mx-auto'} />
);

/** Írásbeli kivonás Manó módszerével (73. o.): 7212 − 5410 = 1802, a kivonandóhoz +1 ezres. */
export const ColumnSubSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 300 190" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="298" height="188" rx="12" fill="#ffffff" stroke="#cbd5e1" />
    {PV.map((p, k) => (
      <g key={p.t}>
        <rect x={60 + k * 40} y="10" width="40" height="150" fill={p.c} opacity="0.45" />
        <text x={80 + k * 40} y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{p.t}</text>
      </g>
    ))}
    {['7', '2', '1', '2'].map((d, k) => (
      <text key={k} x={80 + k * 40} y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{d}</text>
    ))}
    <text x="104" y="50" fontSize="11" fontWeight="bold" fill="#dc2626">+10</text>
    <text x="44" y="98" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">−</text>
    {['5', '4', '1', '0'].map((d, k) => (
      <text key={k} x={80 + k * 40} y="98" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{d}</text>
    ))}
    <text x="92" y="86" fontSize="11" fontWeight="bold" fill="#dc2626">+1</text>
    <line x1="34" y1="108" x2="220" y2="108" stroke="#0f172a" strokeWidth="2" />
    {['1', '8', '0', '2'].map((d, k) => (
      <text key={k} x={80 + k * 40} y="138" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{d}</text>
    ))}
    <text x="150" y="180" textAnchor="middle" fontSize="11" fill="#334155">4 sz meg 8 sz az 12 sz, marad 1 → 5 + 1 = 6, 6 meg 1 az 7</text>
    <text x="262" y="62" textAnchor="middle" fontSize="11" fill="#7f1d1d">kisebbítendő</text>
    <text x="262" y="98" textAnchor="middle" fontSize="11" fill="#7f1d1d">kivonandó</text>
    <text x="262" y="138" textAnchor="middle" fontSize="11" fill="#7f1d1d">különbség</text>
  </svg>
);

/** Írásbeli osztás rövid alakban: 2872 : 2 = 1436 (tankönyv 97. o.). */
export const ShortDivSvg: React.FC<{ className?: string }> = ({ className }) => (
  <ShortDivLayout dividend={2872} divisor={2} className={className ?? 'w-full h-auto max-w-[280px] mx-auto'} />
);

/** Halmazábra: 2 többszörösei és 5 többszörösei (tankönyv 101. o.). */
export const MultiplesVennSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 360 210" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="6" y="6" width="348" height="198" rx="12" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
    <text x="20" y="26" fontSize="11" fontWeight="bold" fill="#92400e">10 000-nél kisebb számok</text>
    <ellipse cx="140" cy="116" rx="100" ry="72" fill="#60a5fa" opacity="0.35" stroke="#1d4ed8" strokeWidth="2" />
    <ellipse cx="220" cy="116" rx="100" ry="72" fill="#f472b6" opacity="0.35" stroke="#be185d" strokeWidth="2" />
    <text x="96" y="58" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">2 többszöröse</text>
    <text x="268" y="58" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be185d">5 többszöröse</text>
    {['7602', '7656', '5552'].map((v, i) => (
      <text key={v} x="90" y={98 + i * 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{v}</text>
    ))}
    {['4310', '9100', '3990'].map((v, i) => (
      <text key={v} x="180" y={98 + i * 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{v}</text>
    ))}
    {['2965', '2865', '1175'].map((v, i) => (
      <text key={v} x="270" y={98 + i * 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{v}</text>
    ))}
    {['4561', '2983'].map((v, i) => (
      <text key={v} x={40 + i * 280} y="192" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{v}</text>
    ))}
    <text x="180" y="196" textAnchor="middle" fontSize="10" fill="#475569">a közös részben: 0-ra végződő számok</text>
  </svg>
);

/** A feladatmegoldás lépései: adatok, terv, becslés, számítás, ellenőrzés, válasz. */
export const SolvingStepsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const s = ['Adatok', 'Terv', 'Becslés', 'Számítás', 'Ellenőrzés', 'Válasz'];
  const c = ['#64748b', '#6366f1', '#0ea5e9', '#f97316', '#10b981', '#e11d48'];
  return (
    <svg viewBox="0 0 360 120" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="118" rx="14" fill="#ffffff" stroke="#cbd5e1" />
      {s.map((t, i) => (
        <g key={t}>
          <rect x={10 + i * 58} y="36" width="52" height="44" rx="10" fill={c[i]} />
          <text x={36 + i * 58} y="54" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">{i + 1}.</text>
          <text x={36 + i * 58} y="70" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#ffffff">{t}</text>
          {i < s.length - 1 && <polygon points={`${64 + i * 58},58 ${68 + i * 58},54 ${68 + i * 58},62`} fill="#334155" />}
        </g>
      ))}
      <text x="180" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">Így oldd meg a szöveges feladatot!</text>
      <text x="180" y="104" textAnchor="middle" fontSize="10" fill="#334155">Becslés: kerekíts százasra vagy ezresre, és számolj fejben!</text>
    </svg>
  );
};
