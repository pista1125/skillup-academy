import React from 'react';
import { S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK } from './seqKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={S_INK}>
      {title}
    </text>
    {children}
  </svg>
);

// 1. ábra: a díszkövek sorai kiegészítve – minden sorban 150
export const PavingRowsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { n: '1. sor', a: 26, b: 124 },
    { n: '2. sor', a: 28, b: 122 },
    { n: '3. sor', a: 30, b: 120 },
    { n: '…', a: 0, b: 0 },
    { n: '50. sor', a: 124, b: 26 }
  ];
  const scale = 2.2;
  return (
    <Frame title="Díszkövek: 26; 28; …; 124 – és a „fordított” kiegészítés" className={className} h={260}>
      {rows.map((r, i) => {
        const y = 50 + i * 38;
        if (r.n === '…')
          return (
            <text key={i} x="240" y={y + 18} fontSize="16" textAnchor="middle" fill="#64748b">
              ⋮
            </text>
          );
        return (
          <g key={i}>
            <text x="20" y={y + 17} fontSize="11" fill={S_INK}>
              {r.n}
            </text>
            <rect x="70" y={y} width={r.a * scale} height="24" rx="4" fill="#bfdbfe" stroke={S_BLUE} />
            <rect x={70 + r.a * scale} y={y} width={r.b * scale} height="24" rx="4" fill="#fde68a" stroke={S_AMBER} strokeDasharray="4 3" />
            <text x={70 + (r.a * scale) / 2} y={y + 16} fontSize="10.5" textAnchor="middle" fill={S_INK} fontWeight="bold">
              {r.a}
            </text>
            <text x={70 + r.a * scale + (r.b * scale) / 2} y={y + 16} fontSize="10.5" textAnchor="middle" fill={S_INK}>
              {r.b}
            </text>
            <text x={70 + 150 * scale + 6} y={y + 16} fontSize="10" fill={S_PURPLE}>
              = 150
            </text>
          </g>
        );
      })}
      <text x="240" y="248" fontSize="11.5" textAnchor="middle" fill={S_INK}>
        50 · 150 = 7500 kő kétszer számolva ⇒ S₅₀ = (26 + 124) · 50 / 2 = 3750
      </text>
    </Frame>
  );
};

// 2. ábra: a kis Gauss párosítása 1-től 40-ig
export const GaussPairsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const shown = [1, 2, 3, 4, 5];
  return (
    <Frame title="A kis Gauss: 1 + 2 + … + 40" className={className} h={240}>
      {shown.map((k, i) => {
        const x1 = 40 + i * 36;
        const x2 = 440 - i * 36;
        return (
          <g key={k}>
            <circle cx={x1} cy="80" r="14" fill="#dbeafe" stroke={S_BLUE} />
            <text x={x1} y="85" fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_INK}>
              {k}
            </text>
            <circle cx={x2} cy="80" r="14" fill="#fee2e2" stroke={S_RED} />
            <text x={x2} y="85" fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_INK}>
              {41 - k}
            </text>
            <path d={`M ${x1} 96 Q ${(x1 + x2) / 2} ${150 + i * 10} ${x2} 96`} fill="none" stroke={S_GREEN} strokeWidth="1.3" />
          </g>
        );
      })}
      <text x="240" y="85" fontSize="16" textAnchor="middle" fill="#64748b">
        …
      </text>
      <text x="240" y="122" fontSize="12" textAnchor="middle" fill={S_GREEN} fontWeight="bold">
        minden pár összege 41
      </text>
      <text x="240" y="212" fontSize="12.5" textAnchor="middle" fill={S_INK}>
        1 + 40 = 2 + 39 = … = 20 + 21 = 41 ⇒ 20 · 41 = 820
      </text>
    </Frame>
  );
};

// 3. ábra: Sₙ előre és visszafelé
export const ReverseSumSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const top = ['a₁', 'a₂', 'a₃', '…', 'aₙ₋₁', 'aₙ'];
  const bot = ['aₙ', 'aₙ₋₁', 'aₙ₋₂', '…', 'a₂', 'a₁'];
  return (
    <Frame title="Bizonyítás: írjuk fel az összeget kétszer!" className={className} h={250}>
      <text x="36" y="80" fontSize="13" fill={S_BLUE} fontWeight="bold">
        Sₙ =
      </text>
      <text x="36" y="130" fontSize="13" fill={S_RED} fontWeight="bold">
        Sₙ =
      </text>
      <text x="26" y="184" fontSize="13" fill={S_PURPLE} fontWeight="bold">
        2Sₙ =
      </text>
      {top.map((t, i) => {
        const x = 110 + i * 62;
        return (
          <g key={i}>
            <text x={x} y="80" fontSize="13" textAnchor="middle" fill={S_INK}>
              {t}
            </text>
            <text x={x} y="130" fontSize="13" textAnchor="middle" fill={S_INK}>
              {bot[i]}
            </text>
            {t !== '…' && <line x1={x} x2={x} y1="88" y2="116" stroke="#94a3b8" strokeDasharray="3 3" />}
            <text x={x} y="184" fontSize="11" textAnchor="middle" fill={S_PURPLE}>
              {t === '…' ? '…' : '(a₁ + aₙ)'}
            </text>
            {i < top.length - 1 && (
              <>
                <text x={x + 31} y="80" fontSize="13" textAnchor="middle" fill="#64748b">
                  +
                </text>
                <text x={x + 31} y="130" fontSize="13" textAnchor="middle" fill="#64748b">
                  +
                </text>
                <text x={x + 31} y="184" fontSize="11" textAnchor="middle" fill="#64748b">
                  +
                </text>
              </>
            )}
          </g>
        );
      })}
      <text x="240" y="226" fontSize="12.5" textAnchor="middle" fill={S_INK}>
        n darab egyenlő zárójel: 2Sₙ = n(a₁ + aₙ) ⇒ Sₙ = (a₁ + aₙ) · n / 2
      </text>
    </Frame>
  );
};

// 4. ábra: konzervgúla – soronként eggyel kevesebb
export const CanPyramidSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = 6;
  const r = 13;
  return (
    <Frame title="Konzervgúla: a legfelső sorban 1, alatta 2, 3, … konzerv" className={className} h={270}>
      {Array.from({ length: rows }, (_, i) => i + 1).map((k) => (
        <g key={k}>
          {Array.from({ length: k }, (_, j) => (
            <rect
              key={j}
              x={170 - (k * 2 * r) / 2 + j * 2 * r + 1 - 20}
              y={44 + (k - 1) * 2 * r * 1.2}
              width={2 * r - 2}
              height={2 * r * 1.2 - 2}
              rx="4"
              fill={k % 2 ? '#fecaca' : '#fde68a'}
              stroke="#b45309"
            />
          ))}
          <text x="330" y={44 + (k - 1) * 2 * r * 1.2 + 22} fontSize="11" fill={S_INK}>
            {k}. sor: {k} db
          </text>
        </g>
      ))}
      <line x1="40" x2="300" y1={44 + rows * 2 * r * 1.2 + 1} y2={44 + rows * 2 * r * 1.2 + 1} stroke={S_INK} strokeWidth="1.5" />
      <text x="240" y="262" fontSize="11.5" textAnchor="middle" fill={S_INK}>
        k sor: 1 + 2 + … + k = k(k + 1)/2 konzerv; magasság k · 12 cm
      </text>
    </Frame>
  );
};

// 5. ábra: lépcsős oszlopok + a fordított oszlopok téglalapot adnak
export const StaircaseRectangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const a1 = 2;
  const d = 1;
  const n = 7;
  const u = 18;
  const vals = Array.from({ length: n }, (_, i) => a1 + i * d);
  const total = a1 + vals[n - 1];
  const baseY = 250;
  return (
    <Frame title="Sₙ geometriailag: két „lépcső” egy téglalapot ad" className={className} h={290}>
      {vals.map((v, i) => {
        const x = 90 + i * (u + 26);
        const w = u + 20;
        const rev = vals[n - 1 - i];
        return (
          <g key={i}>
            <rect x={x} y={baseY - v * u} width={w} height={v * u} fill="#bfdbfe" stroke={S_BLUE} />
            <rect x={x} y={baseY - total * u} width={w} height={rev * u} fill="#fecaca" stroke={S_RED} strokeDasharray="4 3" />
            <text x={x + w / 2} y={baseY - v * u / 2 + 4} fontSize="11" textAnchor="middle" fill={S_INK} fontWeight="bold">
              {v}
            </text>
            <text x={x + w / 2} y={baseY - total * u + (rev * u) / 2 + 4} fontSize="10.5" textAnchor="middle" fill={S_RED}>
              {rev}
            </text>
          </g>
        );
      })}
      <text x="56" y={baseY - (total * u) / 2} fontSize="11" textAnchor="middle" fill={S_PURPLE} fontWeight="bold">
        a₁ + aₙ
      </text>
      <text x="56" y={baseY - (total * u) / 2 + 14} fontSize="11" textAnchor="middle" fill={S_PURPLE}>
        = {total}
      </text>
      <text x="240" y="276" fontSize="11.5" textAnchor="middle" fill={S_INK}>
        2 + 3 + … + 8: a két lépcső {n} · {total} = {n * total} ⇒ S₇ = {(n * total) / 2}
      </text>
    </Frame>
  );
};
