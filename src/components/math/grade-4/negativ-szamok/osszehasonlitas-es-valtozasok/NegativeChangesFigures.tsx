import React from 'react';

const FONT = 'system-ui, sans-serif';
export const CASH_RED = '#ef4444';
export const DEBT_BLUE = '#2563eb';

/** Szám kiírása a tankönyv szerint: negatív előjel „−”, ötjegyűtől szóköz. */
export const fmtNum = (n: number): string => {
  const a = Math.abs(n);
  const s = a >= 10000 ? String(a).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(a);
  return n < 0 ? `−${s}` : s;
};

/** Számegyenes a megadott számokkal (pontok + felirat). */
export const MiniLine: React.FC<{
  min: number;
  max: number;
  marks: { v: number; label?: string; color?: string }[];
  y?: number;
  x0?: number;
  x1?: number;
  labelEvery?: number;
}> = ({ min, max, marks, y = 50, x0 = 20, x1 = 300, labelEvery = 5 }) => {
  const X = (v: number) => x0 + ((v - min) / (max - min)) * (x1 - x0);
  const ticks: number[] = [];
  for (let v = min; v <= max; v++) ticks.push(v);
  return (
    <g fontFamily={FONT}>
      <line x1={x0 - 8} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.5" />
      <polygon points={`${x1 + 16},${y} ${x1 + 8},${y - 4} ${x1 + 8},${y + 4}`} fill="#334155" />
      {ticks.map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={y - (v % labelEvery === 0 ? 6 : 3)} x2={X(v)} y2={y + (v % labelEvery === 0 ? 6 : 3)} stroke="#334155" strokeWidth={v === 0 ? 2 : 1} />
          {v % labelEvery === 0 && (
            <text x={X(v)} y={y + 17} textAnchor="middle" fontSize="8" fontWeight={v === 0 ? 'bold' : 'normal'} fill="#334155">
              {fmtNum(v)}
            </text>
          )}
        </g>
      ))}
      {marks.map((m, i) => (
        <g key={i}>
          <circle cx={X(m.v)} cy={y} r="4.5" fill={m.color ?? (m.v < 0 ? DEBT_BLUE : '#dc2626')} />
          {m.label && (
            <text x={X(m.v)} y={y - 10 - (i % 2) * 11} textAnchor="middle" fontSize="10" fontWeight="bold" fill={m.color ?? (m.v < 0 ? DEBT_BLUE : '#dc2626')}>
              {m.label}
            </text>
          )}
        </g>
      ))}
    </g>
  );
};

/** A tankönyv 90. oldali számkártyái a számegyenesen (9. feladat). */
export const CARD_NUMBERS = [-2, -6, -5, 8, 0, -8, -14, 11];

export const CompareLineSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="148" rx="12" fill="#fff7ed" stroke="#fed7aa" />
    {CARD_NUMBERS.map((n, i) => (
      <g key={n}>
        <rect x={12 + i * 40} y="10" width="36" height="20" rx="10" fill={['#f97316', '#1e3a8a', '#c026d3', '#0ea5e9', '#db2777', '#f97316', '#7c2d12', '#b91c1c'][i]} />
        <text x={30 + i * 40} y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">{fmtNum(n)}</text>
      </g>
    ))}
    <MiniLine min={-15} max={12} y={84} marks={CARD_NUMBERS.map((v) => ({ v, label: fmtNum(v) }))} />
    <text x="20" y="130" fontSize="11" fontWeight="bold" fill={DEBT_BLUE}>◀ kisebb</text>
    <text x="320" y="130" textAnchor="end" fontSize="11" fontWeight="bold" fill="#dc2626">nagyobb ▶</text>
    <text x="170" y="142" textAnchor="middle" fontSize="10" fill="#475569">−14 &lt; −8 &lt; −6 &lt; −5 &lt; −2 &lt; 0 &lt; 8 &lt; 11</text>
  </svg>
);

/** Hány °C-kal lett hidegebb? (munkafüzet 83. o., 6. feladat) */
export const TempChangeSvg: React.FC<{ className?: string; from?: number; to?: number; ask?: boolean }> = ({ className, from = -4, to = -19, ask = false }) => (
  <svg viewBox="0 0 300 120" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="298" height="118" rx="12" fill="#dbeafe" stroke="#60a5fa" />
    <rect x="110" y="18" width="80" height="30" rx="4" fill="#ffffff" stroke="#1e3a8a" />
    <text x="150" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill={ask ? '#dc2626' : '#1e3a8a'}>
      {ask ? '?' : `${Math.abs(from - to)} °C`}
    </text>
    <text x="50" y="88" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{fmtNum(from)} °C</text>
    <polygon points="92,74 200,74 200,64 226,82 200,100 200,90 92,90" fill="#3b82f6" stroke="#1e3a8a" />
    <text x="262" y="88" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{fmtNum(to)} °C</text>
  </svg>
);

/** Fabatka-pénztárca: piros kör = 1 fabatka készpénz, kék négyzet = 1 fabatka adósság. */
export const WalletGroup: React.FC<{ x: number; y: number; cash: number; debt: number; w?: number; h?: number; crossPairs?: boolean; name?: string }> = ({
  x,
  y,
  cash,
  debt,
  w = 140,
  h = 90,
  crossPairs = false,
  name
}) => {
  const items: { kind: 'c' | 'd'; i: number }[] = [];
  for (let i = 0; i < cash; i++) items.push({ kind: 'c', i });
  for (let i = 0; i < debt; i++) items.push({ kind: 'd', i });
  const per = Math.max(5, Math.ceil(Math.sqrt(items.length * 2)));
  const cell = Math.min(22, (w - 16) / per);
  const pairs = Math.min(cash, debt);
  return (
    <g fontFamily={FONT}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill="#ffffff" stroke="#334155" strokeWidth="1.5" />
      <rect x={x + w / 2 - 8} y={y - 6} width="16" height="12" rx="3" fill="#ffffff" stroke="#334155" />
      {items.map((it, k) => {
        const cx = x + 12 + (k % per) * cell + cell / 2;
        const cy = y + 14 + Math.floor(k / per) * cell + cell / 2;
        const r = cell * 0.36;
        const crossed = crossPairs && it.i < pairs;
        return (
          <g key={k}>
            {it.kind === 'c' ? (
              <circle cx={cx} cy={cy} r={r} fill={CASH_RED} stroke="#991b1b" opacity={crossed ? 0.35 : 1} />
            ) : (
              <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} fill={DEBT_BLUE} stroke="#1e3a8a" opacity={crossed ? 0.35 : 1} />
            )}
            {crossed && <line x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} stroke="#0f172a" strokeWidth="1.5" />}
          </g>
        );
      })}
      {name && (
        <text x={x + w / 2} y={y + h + 16} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{name}</text>
      )}
    </g>
  );
};

/** A tankönyv 92. oldali fabatkás modellje (16. feladat): Zsuzsi 4 fabatka, 1 adósság. */
export const FabatkaSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="168" rx="12" fill="#fdf4ff" stroke="#f0abfc" />
    <circle cx="26" cy="22" r="7" fill={CASH_RED} />
    <text x="38" y="26" fontSize="11" fill="#0f172a">= 1 fabatka készpénz</text>
    <rect x="180" y="15" width="14" height="14" fill={DEBT_BLUE} />
    <text x="200" y="26" fontSize="11" fill="#0f172a">= 1 fabatka adósság</text>
    <WalletGroup x={20} y={50} cash={4} debt={1} name="Zsuzsi" />
    <text x="178" y="100" fontSize="22" fill="#0f172a">→</text>
    <WalletGroup x={200} y={50} cash={4} debt={1} crossPairs name="törlesztés után: 3" />
  </svg>
);

/** Kriszti pénztárcája és az adósságcédula (tankönyv 92. o., 18. feladat). */
export const DebtSlipSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="20" y="24" width="120" height="70" rx="12" fill="#fde68a" stroke="#92400e" />
    <text x="80" y="54" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">pénztárca</text>
    <text x="80" y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">500 Ft</text>
    <rect x="160" y="34" width="166" height="50" rx="25" fill="#1e3a8a" />
    <text x="243" y="55" textAnchor="middle" fontSize="10" fill="#ffffff">adósságcédula:</text>
    <text x="243" y="73" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">200 Ft tartozás</text>
    <text x="170" y="122" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">500 Ft és −200 Ft együtt: 300 Ft</text>
  </svg>
);

/** Hogyan változott a vagyon? (munkafüzet 87. o., 19. feladat) */
export const WEALTH_CHANGES: [number, number][] = [
  [1500, 2000],
  [2500, 1800],
  [500, -1000],
  [5500, -2000],
  [-1500, 2000],
  [-1500, -5000]
];

export const WealthChangeSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 190" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="188" rx="12" fill="#ffffff" stroke="#cbd5e1" />
    {WEALTH_CHANGES.map(([a, b], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 14 + col * 166;
      const y = 22 + row * 58;
      const up = b > a;
      return (
        <g key={i}>
          <rect x={x + 30} y={y - 12} width="96" height="20" rx="6" fill={up ? '#fee2e2' : '#dbeafe'} stroke={up ? '#dc2626' : '#2563eb'} />
          <text x={x + 78} y={y + 3} textAnchor="middle" fontSize="11" fontWeight="bold" fill={up ? '#b91c1c' : '#1d4ed8'}>
            {up ? '+' : '−'}
            {Math.abs(b - a)} Ft
          </text>
          <text x={x} y={y + 30} fontSize="11" fontWeight="bold" fill="#0f172a">{fmtNum(a)} Ft</text>
          <line x1={x + 58} y1={y + 26} x2={x + 104} y2={y + 26} stroke="#334155" strokeWidth="1.5" />
          <polygon points={`${x + 110},${y + 26} ${x + 102},${y + 22} ${x + 102},${y + 30}`} fill="#334155" />
          <text x={x + 81} y={y + 21} textAnchor="middle" fontSize="10" fontWeight="bold" fill={up ? '#dc2626' : '#2563eb'}>{up ? 'n' : 'cs'}</text>
          <text x={x + 114} y={y + 30} fontSize="11" fontWeight="bold" fill="#0f172a">{fmtNum(b)} Ft</text>
        </g>
      );
    })}
  </svg>
);
