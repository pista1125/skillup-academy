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

// 1. ábra: a világ gabonatermelésének számtanisorozat-modellje
export const GrainTrendSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const years = Array.from({ length: 13 }, (_, i) => 1960 + 4 * i);
  const X = (y: number) => 60 + ((y - 1960) / 48) * 390;
  const Y = (v: number) => 250 - (v / 2500) * 200;
  return (
    <Frame title="Gabonatermelés modellje: a₁ = 824, d = 27 (millió tonna/év)" className={className} h={290}>
      {[0, 500, 1000, 1500, 2000, 2500].map((v) => (
        <g key={v}>
          <line x1="60" x2="455" y1={Y(v)} y2={Y(v)} stroke="#e2e8f0" />
          <text x="54" y={Y(v) + 4} fontSize="9.5" textAnchor="end" fill="#64748b">
            {v}
          </text>
        </g>
      ))}
      <line x1="60" x2="455" y1={Y(0)} y2={Y(0)} stroke={S_INK} />
      <line x1="60" x2="60" y1={Y(0)} y2={Y(2500)} stroke={S_INK} />
      <line x1={X(1960)} y1={Y(824)} x2={X(2008)} y2={Y(824 + 48 * 27)} stroke={S_RED} strokeWidth="2" />
      {years.map((y) => (
        <g key={y}>
          <circle cx={X(y)} cy={Y(824 + (y - 1960) * 27)} r="3.8" fill={S_RED} />
          <text x={X(y)} y={Y(0) + 14} fontSize="8.5" textAnchor="middle" fill="#475569" transform={`rotate(-35 ${X(y)} ${Y(0) + 14})`}>
            {y}
          </text>
        </g>
      ))}
      <text x={X(1960) + 6} y={Y(824) - 10} fontSize="10.5" fill={S_RED} fontWeight="bold">
        824
      </text>
      <text x={X(2008) - 4} y={Y(824 + 48 * 27) - 10} fontSize="10.5" textAnchor="end" fill={S_RED} fontWeight="bold">
        824 + 48 · 27 = 2120
      </text>
      <text x="250" y="60" fontSize="11" textAnchor="middle" fill="#475569">
        Minden évben ugyanannyival (27-tel) nő: a pontok egy egyenesre illeszkednek.
      </text>
    </Frame>
  );
};

// 2. ábra: a számtani sorozat – minden lépés +d
export const ArithmeticChainSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const labels = ['a₁', 'a₂', 'a₃', 'a₄', 'a₅', 'a₆', 'a₇'];
  return (
    <Frame title="Számtani sorozat: aₙ − aₙ₋₁ = d (n ≥ 2)" className={className} h={210}>
      {labels.map((l, i) => {
        const x = 34 + i * 62;
        return (
          <g key={l}>
            <rect x={x} y="96" width="44" height="32" rx="8" fill="#eff6ff" stroke={S_BLUE} strokeWidth="1.6" />
            <text x={x + 22} y="117" fontSize="14" textAnchor="middle" fontWeight="bold" fill={S_INK}>
              {l}
            </text>
            {i < labels.length - 1 && (
              <g>
                <path d={`M ${x + 26} 92 Q ${x + 53} 64 ${x + 80} 92`} fill="none" stroke={S_GREEN} strokeWidth="1.6" />
                <path d={`M ${x + 80} 92 l -7 -2 m 7 2 l -3 -6.5`} fill="none" stroke={S_GREEN} strokeWidth="1.6" />
                <text x={x + 53} y="70" fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_GREEN}>
                  +d
                </text>
              </g>
            )}
          </g>
        );
      })}
      <path d="M 56 140 L 56 150 L 428 150 L 428 140" fill="none" stroke={S_PURPLE} strokeWidth="1.4" />
      <text x="242" y="170" fontSize="12" textAnchor="middle" fill={S_PURPLE}>
        a₁-től aₙ-ig (n − 1) lépés: aₙ = a₁ + (n − 1)d
      </text>
      <text x="242" y="192" fontSize="11" textAnchor="middle" fill="#475569">
        Pl. a₁₂ = 40, a₁₅ = 46 ⇒ a₁₅ − a₁₂ = 3d = 6 ⇒ d = 2
      </text>
    </Frame>
  );
};

// 3. ábra: szimmetrikus jelölés és a perselyes feladat
export const PiggyBankSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const months = ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.'];
  const vals = [2300, 2400, 2500, 2600, 2700, 2800];
  const syms = ['', '', '', 'c − 100', 'c', 'c + 100'];
  return (
    <Frame title="Tibor perselye: havonta 100 Ft-tal többet tesz be" className={className} h={290}>
      <line x1="40" x2="450" y1="240" y2="240" stroke={S_INK} />
      {vals.map((v, i) => {
        const x = 56 + i * 66;
        const hgt = (v / 2800) * 150;
        const hl = i >= 3;
        return (
          <g key={i}>
            <rect x={x} y={240 - hgt} width="44" height={hgt} rx="4" fill={hl ? '#fde68a' : '#dbeafe'} stroke={hl ? S_AMBER : S_BLUE} />
            <text x={x + 22} y="256" fontSize="10.5" textAnchor="middle" fill="#475569">
              {months[i]}
            </text>
            <text x={x + 22} y={240 - hgt - 6} fontSize="10" textAnchor="middle" fill={S_INK}>
              {hl ? syms[i] : '?'}
            </text>
          </g>
        );
      })}
      <path d="M 254 274 L 254 266 L 428 266 L 428 274" fill="none" stroke={S_AMBER} strokeWidth="1.4" />
      <text x="341" y="284" fontSize="11" textAnchor="middle" fill={S_AMBER} fontWeight="bold">
        3c = 8100 Ft
      </text>
      <text x="140" y="70" fontSize="11" textAnchor="middle" fill="#475569">
        Három egymást követő tag: a − d; a; a + d
      </text>
    </Frame>
  );
};

// 4. ábra: hatszöglapos burkolás – „körök” belülről kifelé
export const HexRingsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const R = 15;
  const cx = 240;
  const cy = 165;
  const ringColors = ['#ffffff', '#fbcfe8', '#bfdbfe', '#bbf7d0'];
  const hexes: { q: number; r: number; ring: number }[] = [];
  for (let q = -3; q <= 3; q++)
    for (let r = -3; r <= 3; r++) {
      const s = -q - r;
      const ring = Math.max(Math.abs(q), Math.abs(r), Math.abs(s));
      if (ring <= 3) hexes.push({ q, r, ring });
    }
  const pts = (x: number, y: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const t = (Math.PI / 180) * (60 * i - 30);
      return `${x + R * Math.cos(t)},${y + R * Math.sin(t)}`;
    }).join(' ');
  return (
    <Frame title="Hatszöglapok körei: 6; 12; 18; … (d = 6)" className={className} h={300}>
      {hexes.map(({ q, r, ring }) => {
        const x = cx + R * Math.sqrt(3) * (q + r / 2);
        const y = cy + R * 1.5 * r;
        return <polygon key={`${q},${r}`} points={pts(x, y)} fill={ringColors[ring]} stroke="#475569" strokeWidth="1" />;
      })}
      {[
        { t: '1. kör: 6 lap', c: '#db2777' },
        { t: '2. kör: 12 lap', c: S_BLUE },
        { t: '3. kör: 18 lap', c: S_GREEN }
      ].map((l, i) => (
        <text key={l.t} x="360" y={110 + i * 22} fontSize="11.5" fill={l.c} fontWeight="bold">
          {l.t}
        </text>
      ))}
      <text x="240" y="284" fontSize="11.5" textAnchor="middle" fill={S_INK}>
        A k-adik körben 6k lap van: aₖ = 6 + (k − 1) · 6 = 6k
      </text>
    </Frame>
  );
};

// 5. ábra: két tagból a differencia
export const TwoTermsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (n: number) => 40 + (n - 1) * 12.4;
  return (
    <Frame title="Két ismert tag meghatározza a sorozatot" className={className} h={200}>
      <line x1="30" x2="455" y1="110" y2="110" stroke={S_INK} />
      {Array.from({ length: 34 }, (_, i) => i + 1).map((n) => (
        <line key={n} x1={X(n)} x2={X(n)} y1="106" y2="114" stroke="#94a3b8" />
      ))}
      <circle cx={X(28)} cy="110" r="6" fill={S_BLUE} />
      <circle cx={X(32)} cy="110" r="6" fill={S_BLUE} />
      <text x={X(28)} y="92" fontSize="11" textAnchor="middle" fill={S_BLUE} fontWeight="bold">
        a₂₈ = 96
      </text>
      <text x={X(32)} y="80" fontSize="11" textAnchor="middle" fill={S_BLUE} fontWeight="bold">
        a₃₂ = 112
      </text>
      <path d={`M ${X(28)} 124 Q ${X(30)} 146 ${X(32)} 124`} fill="none" stroke={S_RED} strokeWidth="1.6" />
      <text x={X(30)} y="158" fontSize="11" textAnchor="middle" fill={S_RED}>
        4d = 16
      </text>
      <circle cx={X(1)} cy="110" r="5" fill={S_PURPLE} />
      <text x={X(1) + 2} y="92" fontSize="11" fill={S_PURPLE} fontWeight="bold">
        a₁ = ?
      </text>
      <text x="240" y="186" fontSize="11.5" textAnchor="middle" fill={S_INK}>
        d = (aₘ − aₖ)/(m − k), majd a₁ = aₖ − (k − 1)d
      </text>
    </Frame>
  );
};
