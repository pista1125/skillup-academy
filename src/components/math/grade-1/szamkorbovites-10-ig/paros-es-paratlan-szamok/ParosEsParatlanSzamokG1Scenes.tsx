// „Páros és páratlan számok” – a mese és a játék képei.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';
import { sky } from '../a-hat/AHatG1Scenes';

const FONT = 'system-ui, sans-serif';
export const EVEN = '#ef4444';
export const ODD = '#3b82f6';

/** Egy zokni (x, y = a zokni közepe). */
export const sock = (x: number, y: number, color: string, s = 1, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-8 -22 H10 V8 Q10 20 -2 20 H-16 Q-24 20 -24 12 Q-24 4 -16 4 H-8 Z" fill={color} stroke="#1f2937" strokeWidth="3" strokeLinejoin="round" />
    <path d="M-8 -16 H10" stroke="#fff" strokeWidth="4" />
  </g>
);

/** n darab zokni egy szárítókötélen (nincsenek párba rakva). */
export const SocksScene: React.FC<{ n: number; colors?: string[] }> = ({ n, colors }) => {
  const step = n > 5 ? 70 : 84;
  const X = (i: number) => 240 + (i - (n - 1) / 2) * step;
  return (
    <svg viewBox="0 0 480 240">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#e0f2fe" />
      <path d="M10 70 Q240 100 470 70" fill="none" stroke="#78350f" strokeWidth="4" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={X(i) - 4} y="74" width="8" height="18" rx="2" fill="#a16207" />
          {sock(X(i), 130, colors?.[i] ?? '#a855f7', 2)}
        </g>
      ))}
    </svg>
  );
};

/**
 * n állat párokba állítva: a párok kézen fogva (vonal), körülöttük zöld keret; a pár nélkül maradt (ha van) egyedül áll.
 * `ringLonely`: a magányost szaggatott kör jelöli.
 */
export const PairUpScene: React.FC<{ icon: IconName; n: number; ringLonely?: boolean; bg?: boolean }> = ({ icon, n, ringLonely = true, bg = true }) => {
  const groups = Math.ceil(n / 2);
  const gStep = groups >= 3 ? 150 : 170;
  const GX = (g: number) => 240 + (g - (groups - 1) / 2) * gStep;
  return (
    <svg viewBox="0 0 480 240">
      {bg ? sky(480, 240) : <rect x="0" y="0" width="480" height="240" rx="18" fill="#fff" />}
      {Array.from({ length: groups }, (_, g) => {
        const full = 2 * g + 1 < n;
        const cx = GX(g);
        return full ? (
          <g key={g}>
            <rect x={cx - 66} y="118" width="132" height="96" rx="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" />
            <path d={`M${cx - 28} 170 H${cx + 28}`} stroke="#111827" strokeWidth="5" strokeLinecap="round" />
            {ICONS[icon]({ x: cx - 32, y: 160, s: 1.5 })}
            {ICONS[icon]({ x: cx + 32, y: 160, s: 1.5 })}
          </g>
        ) : (
          <g key={g}>
            {ringLonely && <circle cx={cx} cy="162" r="44" fill="#fff7ed" stroke="#f97316" strokeWidth="4" strokeDasharray="8 6" />}
            {ICONS[icon]({ x: cx, y: 160, s: 1.5 })}
          </g>
        );
      })}
    </svg>
  );
};

/** Kis párosítás-kép kártyára: n korong párokba rendezve (felső–alsó sor), a magányos kiemelve. */
export const PairDots: React.FC<{ n: number; className?: string; color?: string }> = ({ n, className = 'w-24 h-20', color = '#f59e0b' }) => {
  const cols = Math.max(1, Math.ceil(n / 2));
  const w = cols * 34 + 16;
  return (
    <svg viewBox={`0 0 ${w} 84`} className={className}>
      <rect x="2" y="2" width={w - 4} height="80" rx="12" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: cols }, (_, c) => {
        const x = 25 + c * 34;
        const full = 2 * c + 1 < n;
        return (
          <g key={c}>
            {full && <rect x={x - 14} y="10" width="28" height="64" rx="14" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />}
            <circle cx={x} cy="26" r="10" fill={color} stroke="#111827" strokeWidth="2.5" />
            {full && <circle cx={x} cy="58" r="10" fill={color} stroke="#111827" strokeWidth="2.5" />}
          </g>
        );
      })}
    </svg>
  );
};

/** Válaszkép: páros (mindenkinek van párja) vagy páratlan (egy egyedül marad). */
export const ParityIcon: React.FC<{ even: boolean; className?: string }> = ({ even, className = 'w-24 h-14' }) => (
  <svg viewBox="0 0 120 70" className={className}>
    <rect x="6" y="10" width="56" height="50" rx="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
    <circle cx="22" cy="35" r="11" fill={even ? EVEN : ODD} stroke="#111827" strokeWidth="2.5" />
    <circle cx="46" cy="35" r="11" fill={even ? EVEN : ODD} stroke="#111827" strokeWidth="2.5" />
    {!even && (
      <>
        <circle cx="94" cy="35" r="17" fill="#fff7ed" stroke="#f97316" strokeWidth="3" strokeDasharray="5 4" />
        <circle cx="94" cy="35" r="11" fill={ODD} stroke="#111827" strokeWidth="2.5" />
      </>
    )}
  </svg>
);

export const PAROS = { label: 'páros', figure: <ParityIcon even />, say: 'páros' };
export const PARATLAN = { label: 'páratlan', figure: <ParityIcon even={false} />, say: 'páratlan' };

/** Számegyenes 0–6: a páros helyek piros, a páratlanok kék pöttyel (`colored`); a `question` számnál „?” és szürke pötty. */
export const ParityLine: React.FC<{ colored?: boolean; question?: number }> = ({ colored = true, question }) => {
  const X = (v: number) => 34 + v * 68;
  return (
    <svg viewBox="0 0 480 110" className="w-full max-w-[460px] h-auto mx-auto">
      <path d="M14 50 H466" stroke="#1f2937" strokeWidth="4" />
      <path d="M456 42 L468 50 L456 58" fill="none" stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
      {Array.from({ length: 7 }, (_, v) => {
        const q = v === question;
        const fill = q ? '#cbd5e1' : !colored ? '#fff' : v % 2 === 0 ? EVEN : ODD;
        return (
          <g key={v}>
            <circle cx={X(v)} cy="50" r="13" fill={fill} stroke="#111827" strokeWidth="3" />
            <text x={X(v)} y="96" textAnchor="middle" fontSize="28" fontWeight="900" fill={q ? '#7c3aed' : '#1f2937'} fontFamily={FONT}>
              {q ? '?' : v}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** 1. oldal: táncmulatság – katicapárok, zenélő Zümi, Csigusz és Pötyi. */
export const DanceScene: React.FC = () => (
  <svg viewBox="0 0 480 260">
    {sky(480, 260)}
    {[0, 1, 2, 3, 4].map((i) => (
      <text key={i} x={150 + i * 60} y={40 + (i % 2) * 22} fontSize="30" fill="#7c3aed" fontFamily={FONT}>
        ♪
      </text>
    ))}
    <rect x="186" y="150" width="120" height="84" rx="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="4" />
    <path d="M222 196 H270" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
    {ICONS.katica({ x: 216, y: 188, s: 1.4 })}
    {ICONS.katica({ x: 276, y: 188, s: 1.4 })}
    {ICONS.meh({ x: 380, y: 96, s: 2 })}
    {ICONS.csiga({ x: 400, y: 216, s: 2 })}
    <Potyi mood="cheer" dots={6} x={8} y={86} size={150} />
  </svg>
);
