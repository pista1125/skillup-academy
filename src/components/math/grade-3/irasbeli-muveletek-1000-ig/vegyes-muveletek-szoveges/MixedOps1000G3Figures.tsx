import React from 'react';
import { RouteFig, FONT, INK, UNK } from './MixedOps1000G3Parts';
import { BoxGlyph } from '../muveleti-sorrend/OrderOps1000G3Parts';

type P = { className?: string };
const cls = (c?: string) => c ?? 'w-full max-w-xl h-auto mx-auto';

/** Útvonal egy utcán: Otthon – Pékség – Iskola – Park. */
export const MixedOps1000MapSvg: React.FC<P> = ({ className }) => (
  <RouteFig places={['Otthon', 'Pékség', 'Iskola', 'Park']} dists={[275, 348, 186]} ask={[0, 2]} askText="275 + 348 = 623 m" className={cls(className)} />
);

/** Táblázat: két nyári tábor, fiúk és lányok. */
export const MixedOps1000TableSvg: React.FC<P> = ({ className }) => {
  const head = ['', 'Fiúk', 'Lányok', 'Összesen'];
  const rows = [
    ['Sporttábor', '186', '147', '333'],
    ['Rajztábor', '128', '209', '337']
  ];
  const cw = [140, 100, 100, 120];
  const xs = cw.map((_, i) => 10 + cw.slice(0, i).reduce((a, b) => a + b, 0));
  return (
    <svg viewBox="0 0 480 172" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width="476" height="168" rx="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      {[head, ...rows].map((r, i) =>
        r.map((t, j) => (
          <g key={`${i}-${j}`}>
            <rect x={xs[j]} y={14 + i * 40} width={cw[j]} height="40" fill={i === 0 ? '#86efac' : j === 0 ? '#bbf7d0' : j === 3 ? '#fef9c3' : '#fff'} stroke="#16a34a" strokeWidth="1.5" />
            <text x={xs[j] + cw[j] / 2} y={40 + i * 40} textAnchor="middle" fontSize={i === 0 || j === 0 ? 17 : 21} fontWeight="bold" fill={j === 3 && i > 0 ? '#a16207' : INK}>{t}</text>
          </g>
        ))
      )}
      <text x="240" y="160" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">Egy sor összege: 186 + 147 = 333</text>
    </svg>
  );
};

/** Hiányzó összeadandó szakaszos ábrán: □ + 386 = 912. */
export const MixedOps1000MissingSvg: React.FC<P> = ({ className }) => (
  <svg viewBox="0 0 480 170" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="166" rx="14" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
    <BoxGlyph cx={176} cy={25} s={18} />
    <text x="190" y="32" fontSize="22" fontWeight="bold" fill={INK}>+ 386 = 912</text>
    <path d="M 30 72 Q 30 58 44 58 L 230 58 L 240 48 L 250 58 L 436 58 Q 450 58 450 72" fill="none" stroke="#334155" strokeWidth="2.5" />
    <text x="300" y="52" fontSize="16" fontWeight="bold" fill={INK}>912 (az egész)</text>
    <rect x="30" y="78" width="241" height="44" rx="6" fill="#fee2e2" stroke={UNK} strokeWidth="2.5" />
    <BoxGlyph cx={130} cy={100} s={20} />
    <text x="146" y="108" fontSize="22" fontWeight="bold" fill={UNK}>= ?</text>
    <rect x="271" y="78" width="179" height="44" rx="6" fill="#fed7aa" stroke="#c2410c" strokeWidth="2.5" />
    <text x="360" y="108" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>386</text>
    <text x="240" y="152" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#1d4ed8">Az egészből elvesszük a részt: 912 − 386 = 526</text>
  </svg>
);

/** Két lépés: délelőtt 345 gombóc, délután 128-cal több. */
export const MixedOps1000TwoStepSvg: React.FC<P> = ({ className }) => {
  const k = 300 / 473;
  return (
    <svg viewBox="0 0 480 170" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width="476" height="166" rx="14" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
      <text x="100" y="52" textAnchor="end" fontSize="16" fontWeight="bold" fill={INK}>délelőtt</text>
      <rect x="110" y="30" width={345 * k} height="34" rx="5" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
      <text x={110 + (345 * k) / 2} y="53" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>345</text>
      <text x="100" y="104" textAnchor="end" fontSize="16" fontWeight="bold" fill={INK}>délután</text>
      <rect x="110" y="82" width={345 * k} height="34" rx="5" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
      <text x={110 + (345 * k) / 2} y="105" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>345</text>
      <rect x={110 + 345 * k} y="82" width={128 * k} height="34" rx="5" fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
      <text x={110 + 345 * k + (128 * k) / 2} y="105" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>+128</text>
      <path d={`M 432 30 Q 444 30 444 44 L 444 66 L 452 73 L 444 80 L 444 102 Q 444 116 432 116`} fill="none" stroke={UNK} strokeWidth="2.5" />
      <text x="464" y="79" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>
      <text x="240" y="148" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9a3412">1. délután: 345 + 128 = 473   2. összesen: 345 + 473 = 818</text>
    </svg>
  );
};

/** Fordított művelet: kivonta, pedig hozzá kellett volna adnia. */
export const MixedOps1000ReverseSvg: React.FC<P> = ({ className }) => (
  <svg viewBox="0 0 480 180" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="176" rx="14" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="2" />
    <text x="240" y="30" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6b21a8">Hozzá kellett volna adni 236-ot, de kivonta. 418 lett.</text>
    <rect x="30" y="50" width="90" height="44" rx="10" fill="#fee2e2" stroke={UNK} strokeWidth="2.5" />
    <BoxGlyph cx={75} cy={72} s={22} />
    <path d="M 124 72 L 196 72" stroke="#dc2626" strokeWidth="3" />
    <path d="M 188 65 L 197 72 L 188 79" fill="none" stroke="#dc2626" strokeWidth="3" />
    <text x="160" y="62" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">− 236</text>
    <rect x="200" y="50" width="90" height="44" rx="10" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2.5" />
    <text x="245" y="80" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>418</text>
    <path d="M 200 112 Q 160 140 120 112" fill="none" stroke="#16a34a" strokeWidth="3" />
    <path d="M 128 110 L 119 111 L 123 119" fill="none" stroke="#16a34a" strokeWidth="3" />
    <text x="160" y="148" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">visszafelé: 418 + 236 = 654</text>
    <text x="390" y="78" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>A jó művelet:</text>
    <text x="390" y="104" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#7c3aed">654 + 236 = 890</text>
  </svg>
);
