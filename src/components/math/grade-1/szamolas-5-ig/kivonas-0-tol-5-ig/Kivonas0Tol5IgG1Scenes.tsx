// „Kivonás 0-tól 5-ig” – a mese és a játék képei (elrepül, megeszik, elveszi, áthúzzuk, visszalép).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName, NumberLine } from '../../shared/G1Pics';
import { sky, StemFlower } from '../a-ketto/AKettoG1Scenes';

const FONT = 'system-ui, sans-serif';

/** Az eper zöld kis „kalapja” – ennyi marad, ha Csigusz megette az epret. */
const hull = (x: number, y: number, s: number, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-12 -2 L0 6 L12 -2 L6 -8 L0 -3 L-6 -8 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M0 -3 V-12" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
  </g>
);

const GONE_POS: [number, number][] = [
  [380, 52],
  [440, 92],
  [372, 120],
  [446, 34],
  [410, 160],
];

/**
 * Elrepül: `stay` állat ül a kerítésen (vagy virágon), `gone` éppen elrepül jobbra fel (szaggatott úttal).
 * perch: 'fence' = kerítés (madár), 'flower' = mindegyik a saját virágán (méh, pillangó).
 */
export const FlyAwayScene: React.FC<{ icon?: IconName; stay: number; gone: number; perch?: 'fence' | 'flower' }> = ({ icon = 'madar', stay, gone, perch = 'fence' }) => {
  const total = stay + gone;
  const X = (i: number, n: number) => 170 - ((n - 1) / 2) * 62 + i * 62;
  return (
    <svg viewBox="0 0 480 240">
      {sky(480, 240)}
      {perch === 'fence' ? (
        <g>
          <path d="M14 168 H326 M14 198 H326" stroke="#92400e" strokeWidth="9" strokeLinecap="round" />
          {[30, 100, 170, 240, 310].map((x) => (
            <path key={x} d={`M${x} 150 V226`} stroke="#78350f" strokeWidth="12" strokeLinecap="round" />
          ))}
          {Array.from({ length: stay }, (_, i) => ICONS[icon]({ x: X(i, Math.max(1, stay)), y: 146, s: 1.5, key: `s${i}` }))}
        </g>
      ) : (
        <g>
          {Array.from({ length: total }, (_, i) => (
            <StemFlower key={`f${i}`} cx={X(i, total)} top={150} bottom={228} color={['#ec4899', '#f97316', '#a855f7', '#ef4444', '#3b82f6'][i % 5]} />
          ))}
          {Array.from({ length: stay }, (_, i) => ICONS[icon]({ x: X(i, total), y: 122, s: 1.3, key: `s${i}` }))}
        </g>
      )}
      {Array.from({ length: gone }, (_, i) => {
        const [gx, gy] = GONE_POS[i % GONE_POS.length];
        const fromX = perch === 'flower' ? X(stay + i, total) : 300;
        return (
          <g key={`g${i}`}>
            <path d={`M${fromX} 128 Q${(fromX + gx) / 2} ${gy - 30} ${gx - 26} ${gy + 6}`} fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="6 7" />
            {ICONS[icon]({ x: gx, y: gy, s: 1.3 })}
          </g>
        );
      })}
    </svg>
  );
};

/** Megeszik: nagy levélen `total` eper; az utolsó `eaten` helyén csak a zöld kalapja maradt. Csigusz ott van, ha evett. */
export const PicnicScene: React.FC<{ total: number; eaten: number; snail?: boolean }> = ({ total, eaten, snail }) => {
  const showSnail = snail ?? eaten > 0;
  const cx = showSnail ? 200 : 240;
  return (
    <svg viewBox="0 0 480 240">
      {sky(480, 240)}
      <path d={`M${cx - 190} 170 C${cx - 120} 90 ${cx + 120} 90 ${cx + 190} 170 C${cx + 120} 230 ${cx - 120} 230 ${cx - 190} 170 Z`} fill="#4ade80" stroke="#15803d" strokeWidth="5" />
      <path d={`M${cx - 180} 170 H${cx + 180}`} stroke="#15803d" strokeWidth="3" />
      {Array.from({ length: total }, (_, i) => {
        const x = cx + (i - (total - 1) / 2) * 68;
        return i < total - eaten ? ICONS.eper({ x, y: 150, s: 1.6, key: i }) : hull(x, 152, 1.6, i);
      })}
      {showSnail && ICONS.csiga({ x: 420, y: 196, s: 2.2 })}
      {!showSnail && <Potyi mood="happy" dots={total} x={390} y={10} size={80} />}
    </svg>
  );
};

/** Elveszi: a tányéron maradt `total - taken` tárgy, az elvett `taken` darab nyíllal jobbra, Pötyi mellett. */
export const PlateScene: React.FC<{ icon?: IconName; total: number; taken: number }> = ({ icon = 'alma', total, taken }) => {
  const left = total - taken;
  return (
    <svg viewBox="0 0 480 240">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef3c7" />
      <path d="M0 196 H480" stroke="#d97706" strokeWidth="4" />
      <ellipse cx="160" cy="180" rx="140" ry="34" fill="#fff" stroke="#94a3b8" strokeWidth="5" />
      <ellipse cx="160" cy="176" rx="104" ry="20" fill="none" stroke="#cbd5e1" strokeWidth="3" />
      {Array.from({ length: left }, (_, i) => ICONS[icon]({ x: 160 + (i - (left - 1) / 2) * 52, y: 150, s: 1.4, key: `l${i}` }))}
      {taken > 0 && (
        <>
          <path d="M270 112 Q310 60 352 96" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <path d="M338 92 L354 98 L350 80" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {Array.from({ length: taken }, (_, i) => ICONS[icon]({ x: 360 + (i % 3) * 40, y: 128 + Math.floor(i / 3) * 40, s: 1.1, key: `t${i}` }))}
        </>
      )}
      <Potyi mood="happy" dots={7} x={392} y={6} size={84} />
    </svg>
  );
};

/** Kép + művelet: felül `a` tárgy, az utolsó `b` áthúzva; alul „a − b = ?” (vagy az eredmény). */
export const SentenceScene: React.FC<{ icon?: IconName; a: number; b: number; showResult?: boolean }> = ({ icon = 'eper', a, b, showResult = false }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#fff7ed" />
    {Array.from({ length: a }, (_, i) => {
      const x = 240 + (i - (a - 1) / 2) * 76;
      const out = i >= a - b;
      return (
        <g key={i} opacity={out ? 0.45 : 1}>
          {ICONS[icon]({ x, y: 74, s: 1.5 })}
          {out && <path d={`M${x - 28} ${46} L${x + 28} ${102}`} stroke="#111827" strokeWidth="6" strokeLinecap="round" />}
        </g>
      );
    })}
    <text x="240" y="196" textAnchor="middle" fontSize="60" fontWeight="900" fill="#1f2937" fontFamily={FONT}>
      {a} <tspan fill="#dc2626">−</tspan> {b} = <tspan fill={showResult ? '#16a34a' : '#7c3aed'}>{showResult ? a - b : '?'}</tspan>
    </text>
  </svg>
);

/** Csak a művelet nagyban (pl. „5 − 2 ? 2”). */
export const SentenceStrip: React.FC<{ text: string; className?: string }> = ({ text, className = 'w-full max-w-[340px] h-auto mx-auto' }) => (
  <svg viewBox="0 0 320 90" className={className}>
    <rect x="3" y="3" width="314" height="84" rx="18" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    <text x="160" y="62" textAnchor="middle" fontSize="48" fontWeight="900" fill="#1f2937" fontFamily={FONT}>
      {text}
    </text>
  </svg>
);

/** Visszalépés a számegyenesen: Csigusz a `from` számról indul, `steps` ívvel visszafelé; a célnál „?”. */
export const BackJumpScene: React.FC<{ from: number; steps: number; max?: number }> = ({ from, steps, max = 5 }) => {
  const step = Math.min(44, 420 / max);
  const w = 40 + max * step + 14;
  const X = (v: number) => 20 + v * step;
  return (
    <svg viewBox={`0 0 ${w} 150`} className="w-full max-w-[460px] h-auto mx-auto">
      <svg x="0" y="54" width={w} height="96" viewBox={`0 0 ${w} 96`}>
        <NumberLine max={max} className="" question={from - steps} jumps={Array.from({ length: steps }, (_, i) => ({ from: from - i, to: from - i - 1 }))} />
      </svg>
      {ICONS.csiga({ x: X(from), y: 70, s: 0.9 })}
    </svg>
  );
};

/** Ág levelekkel: `stay` levél az ágon, `fell` levél lehullott a földre. */
export const BranchScene: React.FC<{ stay: number; fell: number }> = ({ stay, fell }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <path d="M20 70 Q200 50 420 90" fill="none" stroke="#92400e" strokeWidth="12" strokeLinecap="round" />
    {Array.from({ length: stay }, (_, i) => ICONS.level({ x: 110 + i * 100, y: 100, s: 1.6, key: `s${i}` }))}
    {Array.from({ length: fell }, (_, i) => ICONS.level({ x: 150 + i * 120, y: 212, s: 1.3, color: '#f97316', key: `f${i}` }))}
  </svg>
);
