import React from 'react';
import { UNK, QFig, Coin, Flat, RodGroups, CoinGrid, NumBox } from './MulDiv500G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** n doboz, mindegyiken ugyanaz a felirat. */
export const BoxesFig: React.FC<{ n: number; label: string; caption?: string }> = ({ n, label, caption }) => {
  const perRow = Math.min(n, 7);
  const rows = Math.ceil(n / perRow);
  const h = 16 + rows * 34 + (caption ? 22 : 4);
  return (
    <QFig h={h}>
      {Array.from({ length: n }).map((_, i) => {
        const inRow = Math.min(perRow, n - Math.floor(i / perRow) * perRow);
        const x0 = 120 - (inRow * 30 - 4) / 2;
        return <NumBox key={i} x={x0 + (i % perRow) * 30} y={12 + Math.floor(i / perRow) * 34} w={26} h={28} label={label} fs={12} />;
      })}
      {caption && <text x="120" y={h - 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">{caption}</text>}
    </QFig>
  );
};

/** Százas lapok. */
export const FlatsFig: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={76}>
    {Array.from({ length: n }).map((_, i) => (
      <Flat key={i} x={120 - (n * 50 - 6) / 2 + i * 50} y={12} s={44} />
    ))}
    <text x="120" y="70" textAnchor="middle" fontSize="11" fill="#475569">egy lap = 100</text>
  </QFig>
);

/** Tízesrúd-csoportok. */
export const RodsFig: React.FC<{ groups: number; per: number }> = ({ groups, per }) => {
  const gw = per * 7.5 + 7.5;
  const pl = Math.max(1, Math.min(groups, Math.floor(226 / (gw + 6))));
  const lines = Math.ceil(groups / pl);
  const h = 14 + lines * 42 + 18;
  return (
    <QFig h={h}>
      <RodGroups groups={groups} per={per} x0={10} width={220} y={14} rodH={28} />
      <text x="120" y={h - 6} textAnchor="middle" fontSize="11" fill="#475569">egy rúd = 10</text>
    </QFig>
  );
};

/** Részekre osztás: a szám fent, k tányér „?”-lel. */
export const ShareFig: React.FC<{ total: number; k: number }> = ({ total, k }) => {
  const step = 220 / k;
  return (
    <QFig h={96}>
      <text x="120" y="28" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#14532d">{total}</text>
      {Array.from({ length: k }).map((_, i) => {
        const cx = 10 + step / 2 + i * step;
        return (
          <g key={i}>
            <path d={`M 120 36 L ${cx} 56`} stroke="#94a3b8" strokeWidth="1.5" />
            <ellipse cx={cx} cy={72} rx={Math.min(26, step / 2 - 4)} ry="12" fill="#fff" stroke="#475569" strokeWidth="1.8" />
            <text x={cx} y="78" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Bennfoglalás: az első ugrás látszik, a többi nem – hány ugrás kell a végéig? */
export const HopFig: React.FC<{ total: number; size: number }> = ({ total, size }) => {
  const x0 = 20;
  const x1 = 214;
  const y = 66;
  const X = (v: number) => x0 + ((x1 - x0) * v) / total;
  const xs = X(size);
  return (
    <QFig h={100}>
      <line x1={x0 - 8} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 17} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {[0, size, total].map((v) => (
        <line key={v} x1={X(v)} y1={y - 6} x2={X(v)} y2={y + 6} stroke="#334155" strokeWidth="1.6" />
      ))}
      <path d={`M ${x0 + 1} ${y - 3} Q ${(x0 + xs) / 2} ${y - 34} ${xs - 1} ${y - 3}`} fill="none" stroke="#7c3aed" strokeWidth="2.2" />
      <text x={(x0 + xs) / 2} y={y - 24} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">{size}</text>
      <path d={`M ${xs + 2} ${y - 3} Q ${(xs + x1) / 2} ${y - 50} ${x1 - 1} ${y - 3}`} fill="none" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4" />
      <text x={(xs + x1) / 2} y={y - 30} textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>hány ugrás?</text>
      <text x={X(0)} y={y + 20} textAnchor="middle" fontSize="12" fill="#475569">0</text>
      <text x={xs} y={y + 20} textAnchor="middle" fontSize="12" fill="#475569">{size}</text>
      <text x={X(total)} y={y + 20} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{total}</text>
    </QFig>
  );
};

/** Érmék rácsban. */
export const CoinGridFig: React.FC<{ rows: number; cols: number; v: number }> = ({ rows, cols, v }) => (
  <QFig h={rows * 28 + 22}>
    <CoinGrid rows={rows} cols={cols} v={v} cx={120} y0={25} r={12} gap={4} />
  </QFig>
);

/** Érmék két sorban (n darab v forintos + extra érmék). */
export const CoinsFig: React.FC<{ n: number; v: number; extra?: number[] }> = ({ n, v, extra = [] }) => {
  const all = [...Array.from({ length: n }, () => v), ...extra];
  const perRow = Math.ceil(all.length / 2);
  return (
    <QFig h={84}>
      {all.map((c, i) => {
        const row = i < perRow ? 0 : 1;
        const inRow = row ? all.length - perRow : perRow;
        const k = row ? i - perRow : i;
        return <Coin key={i} cx={120 - ((inRow - 1) * 34) / 2 + k * 34} cy={24 + row * 36} v={c} r={15} />;
      })}
    </QFig>
  );
};

/** „6 · 7 = 42” → „6 · 70 = ?”. */
export const AnalogyFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={92}>
    <rect x="40" y="12" width="160" height="28" rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
    <text x="120" y="32" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{a} · {b} = {a * b}</text>
    <path d="M 120 42 L 120 50" stroke="#64748b" strokeWidth="2" />
    <path d="M 115 47 L 120 53 L 125 47" fill="none" stroke="#64748b" strokeWidth="2" />
    <rect x="40" y="56" width="160" height="28" rx="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
    <text x="120" y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{a} · {b * 10} = <tspan fill={UNK}>?</tspan></text>
  </QFig>
);

/** Kupac → doboz: hány doboz kell? */
export const PackFig: React.FC<{ total: number; per: number; what: string }> = ({ total, per, what }) => (
  <QFig h={92}>
    {Array.from({ length: 12 }).map((_, i) => (
      <rect key={i} x={20 + (i % 6) * 9} y={18 + Math.floor(i / 6) * 26} width="6" height="22" rx="1.5" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="0.8" />
    ))}
    <text x="45" y="80" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{total} {what}</text>
    <path d="M 88 42 L 118 42" stroke="#64748b" strokeWidth="2.5" />
    <path d="M 112 36 L 120 42 L 112 48" fill="none" stroke="#64748b" strokeWidth="2.5" />
    <NumBox x={130} y={20} w={40} h={40} label={String(per)} fs={14} />
    <text x="150" y="80" textAnchor="middle" fontSize="11" fill="#475569">1 dobozba</text>
    <text x="206" y="48" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>? doboz</text>
  </QFig>
);

/** Szalag k egyforma részre vágva, az egyik rész „?”. */
export const RibbonFig: React.FC<{ len: number; k: number }> = ({ len, k }) => {
  const w = 200 / k;
  return (
    <QFig h={80}>
      <text x="120" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{len} cm</text>
      <path d="M 20 30 L 20 26 L 220 26 L 220 30" fill="none" stroke="#334155" strokeWidth="1.4" />
      {Array.from({ length: k }).map((_, i) => (
        <rect key={i} x={20 + i * w} y="36" width={w} height="18" fill={i === 0 ? '#fee2e2' : '#f9a8d4'} stroke={i === 0 ? UNK : '#9d174d'} strokeWidth="1.4" />
      ))}
      <text x={20 + w / 2} y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>?</text>
    </QFig>
  );
};

/** Tyúkok és libák csíkokkal: a libák ötször annyian vannak. */
export const TimesBarFig: React.FC = () => (
  <QFig h={96}>
    <text x="50" y="30" textAnchor="end" fontSize="12" fontWeight="bold" fill="#334155">tyúk</text>
    <rect x="56" y="16" width="34" height="20" fill="#fde68a" stroke="#92400e" />
    <text x="73" y="31" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">60</text>
    <text x="226" y="31" textAnchor="end" fontSize="14" fontWeight="bold" fill={UNK}>összesen ?</text>
    <text x="50" y="62" textAnchor="end" fontSize="12" fontWeight="bold" fill="#334155">liba</text>
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={56 + i * 34} y="48" width="34" height="20" fill="#e0f2fe" stroke="#0369a1" />
    ))}
    <text x="141" y="86" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">liba: ötször annyi, mint tyúk</text>
  </QFig>
);

/** Széksorok: 9 sor, soronként 50 szék (rajzban rövidítve). */
export const SeatsFig: React.FC = () => (
  <QFig h={112}>
    {Array.from({ length: 9 }).map((_, r) => (
      <g key={r}>
        {Array.from({ length: 13 }).map((__, c) => (
          <rect key={c} x={16 + c * 10} y={9 + r * 9} width="7" height="6" rx="1.5" fill="#a78bfa" stroke="#5b21b6" strokeWidth="0.6" />
        ))}
        <text x="148" y={15 + r * 9} fontSize="8" fill="#5b21b6">…</text>
      </g>
    ))}
    <text x="200" y="38" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">9 sor</text>
    <text x="200" y="56" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">1 sorban</text>
    <text x="200" y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">50 szék</text>
    <text x="120" y="104" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">jött 380 néző – hány szék üres?</text>
  </QFig>
);
