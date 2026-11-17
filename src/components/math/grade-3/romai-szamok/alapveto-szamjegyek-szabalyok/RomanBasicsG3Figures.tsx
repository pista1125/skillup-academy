import React from 'react';
import { SIGN_COLOR } from './RomanBasicsG3Utils';

const FONT = 'Georgia, "Times New Roman", serif';

/** Kőtábla egy római jellel és alatta az értékével. */
const Tablet: React.FC<{ x: number; y: number; w?: number; ch: string; value?: string }> = ({ x, y, w = 62, ch, value }) => (
  <g>
    <rect x={x} y={y} width={w} height="74" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="2" />
    <text x={x + w / 2} y={y + 44} textAnchor="middle" fontSize="34" fontWeight="bold" fontFamily={FONT} fill={SIGN_COLOR[ch] ?? '#334155'}>
      {ch}
    </text>
    {value && (
      <text x={x + w / 2} y={y + 66} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        {value}
      </text>
    )}
  </g>
);

/** Pipa (jó) és kereszt (hibás) rajzolva – emoji nélkül. */
const Tick: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <circle cx={x} cy={y} r="11" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
    <path d={`M ${x - 5} ${y} L ${x - 1} ${y + 4} L ${x + 6} ${y - 4}`} fill="none" stroke="#16a34a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);
const Cross: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <circle cx={x} cy={y} r="11" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
    <path d={`M ${x - 4.5} ${y - 4.5} L ${x + 4.5} ${y + 4.5} M ${x + 4.5} ${y - 4.5} L ${x - 4.5} ${y + 4.5}`} stroke="#dc2626" strokeWidth="2.6" strokeLinecap="round" />
  </g>
);

/** Színes római szám: minden jel a saját színével. */
const RomanWord: React.FC<{ x: number; y: number; s: string; size?: number; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  s,
  size = 26,
  anchor = 'middle'
}) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight="bold" fontFamily={FONT}>
    {s.split('').map((ch, i) => (
      <tspan key={i} fill={SIGN_COLOR[ch] ?? '#334155'}>
        {ch}
      </tspan>
    ))}
  </text>
);

/** Az öt római jel és az értékük. */
export const RomanSignsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 130" className={className ?? 'w-full max-w-[520px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="128" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#78350f">
      Az öt római jel
    </text>
    {[
      ['I', '1'],
      ['V', '5'],
      ['X', '10'],
      ['L', '50'],
      ['C', '100']
    ].map(([ch, v], i) => (
      <Tablet key={ch} x={22 + i * 74} y={38} ch={ch} value={v} />
    ))}
  </svg>
);

/** Honnan jön a jel? A V-ből és a fejjel lefelé fordított V-ből lesz az X: 5 + 5 = 10. */
export const RomanOriginSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 150" className={className ?? 'w-full max-w-[520px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="148" rx="14" fill="#f0f9ff" stroke="#7dd3fc" />
    {/* I: egy ujj */}
    <line x1="50" y1="40" x2="50" y2="100" stroke={SIGN_COLOR.I} strokeWidth="8" strokeLinecap="round" />
    <text x="50" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">I = 1 vonás</text>
    {/* V: öt */}
    <polyline points="110,40 135,100 160,40" fill="none" stroke={SIGN_COLOR.V} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <text x="135" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">V = 5</text>
    <text x="190" y="78" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">→</text>
    {/* V + fordított V */}
    <polyline points="220,30 245,70 270,30" fill="none" stroke={SIGN_COLOR.V} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="220,110 245,70 270,110" fill="none" stroke="#86efac" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    <text x="245" y="134" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">két V</text>
    <text x="298" y="78" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">=</text>
    <line x1="320" y1="35" x2="370" y2="105" stroke={SIGN_COLOR.X} strokeWidth="8" strokeLinecap="round" />
    <line x1="370" y1="35" x2="320" y2="105" stroke={SIGN_COLOR.X} strokeWidth="8" strokeLinecap="round" />
    <text x="345" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">X = 10</text>
  </svg>
);

/** 1. szabály: ha a kisebb jel jobbra áll, hozzáadjuk. */
export const AddRuleSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 150" className={className ?? 'w-full max-w-[520px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="148" rx="14" fill="#f0fdf4" stroke="#86efac" />
    <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
      A kisebb jel JOBBRA áll: hozzáadjuk
    </text>
    {[
      { s: 'VI', f: '5 + 1 = 6' },
      { s: 'XV', f: '10 + 5 = 15' },
      { s: 'LX', f: '50 + 10 = 60' }
    ].map((e, i) => {
      const cx = 70 + i * 130;
      return (
        <g key={e.s}>
          <rect x={cx - 55} y="38" width="110" height="98" rx="12" fill="#fff" stroke="#bbf7d0" strokeWidth="2" />
          <RomanWord x={cx} y={78} s={e.s} size={34} />
          <circle cx={cx + 13} cy="96" r="9" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
          <text x={cx + 13} y="101" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#16a34a">+</text>
          <text x={cx} y="124" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#14532d">{e.f}</text>
        </g>
      );
    })}
  </svg>
);

/** 2. szabály: ha a kisebb jel balra áll, elvesszük – csak IV, IX, XL, XC. */
export const SubtractRuleSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 170" className={className ?? 'w-full max-w-[520px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="168" rx="14" fill="#fff1f2" stroke="#fda4af" />
    <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9f1239">
      A kisebb jel BALRA áll: elvesszük
    </text>
    {[
      { s: 'IV', f: '5 − 1 = 4' },
      { s: 'IX', f: '10 − 1 = 9' },
      { s: 'XL', f: '50 − 10 = 40' },
      { s: 'XC', f: '100 − 10 = 90' }
    ].map((e, i) => {
      const cx = 56 + i * 96;
      return (
        <g key={e.s}>
          <rect x={cx - 44} y="38" width="88" height="96" rx="12" fill="#fff" stroke="#fecdd3" strokeWidth="2" />
          <RomanWord x={cx} y={78} s={e.s} size={32} />
          <circle cx={cx - 11} cy="96" r="9" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
          <text x={cx - 11} y="101" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#e11d48">−</text>
          <text x={cx} y="122" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#881337">{e.f}</text>
        </g>
      );
    })}
    <text x="200" y="157" textAnchor="middle" fontSize="12" fill="#881337">
      Az I csak a V és az X elé, az X csak az L és a C elé kerülhet.
    </text>
  </svg>
);

/** 3. szabály: legfeljebb 3 egyforma jel egymás mellett; a V és az L nem ismétlődik. */
export const ThreeRuleSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 170" className={className ?? 'w-full max-w-[520px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="168" rx="14" fill="#faf5ff" stroke="#d8b4fe" />
    <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b21a8">
      Legfeljebb 3 egyforma jel állhat egymás mellett
    </text>
    {[
      { good: 'III', gv: '3', bad: 'IIII', fix: 'IV', fv: '4' },
      { good: 'XXX', gv: '30', bad: 'XXXX', fix: 'XL', fv: '40' },
      { good: 'V', gv: '5', bad: 'VV', fix: 'X', fv: '10' }
    ].map((r, i) => {
      const y = 58 + i * 40;
      return (
        <g key={r.good}>
          <Tick x={28} y={y - 8} />
          <RomanWord x={50} y={y} s={r.good} size={24} anchor="start" />
          <text x={118} y={y} fontSize="15" fontWeight="bold" fill="#334155">= {r.gv}</text>
          <Cross x={190} y={y - 8} />
          <text x={210} y={y} fontSize="24" fontWeight="bold" fontFamily={FONT} fill="#94a3b8" textDecoration="line-through">
            {r.bad}
          </text>
          <text x={292} y={y} fontSize="18" fontWeight="bold" fill="#334155">→</text>
          <RomanWord x={316} y={y} s={r.fix} size={24} anchor="start" />
          <text x={362} y={y} fontSize="13" fontWeight="bold" fill="#334155">{r.fv}</text>
        </g>
      );
    })}
  </svg>
);

/** Mintapélda: a XXIV kiszámolása jelenként. */
export const WorkedXXIVSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 140" className={className ?? 'w-full max-w-[520px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="138" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {[
      { ch: 'X', t: '10', c: '#ea580c' },
      { ch: 'X', t: '+ 10', c: '#ea580c' },
      { ch: 'I', t: '− 1', c: '#e11d48' },
      { ch: 'V', t: '+ 5', c: '#16a34a' }
    ].map((e, i) => {
      const cx = 60 + i * 70;
      return (
        <g key={i}>
          <rect x={cx - 28} y="18" width="56" height="58" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="1.5" />
          <text x={cx} y="59" textAnchor="middle" fontSize="32" fontWeight="bold" fontFamily={FONT} fill={SIGN_COLOR[e.ch]}>
            {e.ch}
          </text>
          <text x={cx} y="100" textAnchor="middle" fontSize="16" fontWeight="bold" fill={e.c}>{e.t}</text>
        </g>
      );
    })}
    <text x="340" y="59" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">= 24</text>
    <text x="200" y="128" textAnchor="middle" fontSize="12" fill="#475569">
      Az I a V előtt áll, ezért elvesszük: IV = 4.
    </text>
  </svg>
);
