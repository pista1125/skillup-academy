import React from 'react';
import { MULT10_FONT, RodG, CoinG, EggBoxG, JumpLineG } from './Mult10G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** 4 tízesrúd = 10 + 10 + 10 + 10 = 4 · 10 = 40 */
export const TenRodsSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 360 170" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT10_FONT}>
    <rect x="1" y="1" width="358" height="168" rx="14" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <RodG x={70 + i * 62} y={14} c={10} />
        <text x={75 + i * 62} y="134" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f766e">
          {(i + 1) * 10}
        </text>
      </g>
    ))}
    <text x="180" y="158" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
      10 + 10 + 10 + 10 = 4 · 10 = 40
    </text>
  </svg>
);

/** Tízesével ugrálunk 0-tól 100-ig. */
export const TenJumpsSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 440 120" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT10_FONT}>
    <rect x="1" y="1" width="438" height="118" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <JumpLineG x0={22} y={62} width={380} jumps={10} labelEvery={10} fontSize={12} />
    <text x="220" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f766e">
      Minden ugrás 10. A végén mindig 0 áll.
    </text>
    <text x="220" y="108" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
      10, 20, 30, 40, 50, 60, 70, 80, 90, 100
    </text>
  </svg>
);

/** Ötösével fent, tízesével lent, 0-tól 50-ig. */
export const FiveTenLinkSvg: React.FC<FigProps> = ({ className }) => {
  const x0 = 24;
  const u = 7.6;
  const y = 78;
  return (
    <svg viewBox="0 0 440 160" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT10_FONT}>
      <rect x="1" y="1" width="438" height="158" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <JumpLineG x0={x0} y={y} width={50 * u} max={50} jumps={10} step={5} color="#f59e0b" labelEvery={0} />
      <JumpLineG x0={x0} y={y} width={50 * u} max={50} jumps={5} step={10} color="#0d9488" labelEvery={0} arcUp={false} />
      {Array.from({ length: 11 }, (_, i) => i * 5).map((v) => (
        <g key={v}>
          {v % 10 === 0 && <circle cx={x0 + v * u} cy={y} r="8" fill="none" stroke="#16a34a" strokeWidth="2.5" />}
          <text x={x0 + v * u} y={y - 30} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
            {v}
          </text>
        </g>
      ))}
      <text x="24" y="20" fontSize="12" fontWeight="bold" fill="#b45309">fent: ötösével</text>
      <text x="24" y="146" fontSize="12" fontWeight="bold" fill="#0f766e">lent: tízesével</text>
      <text x="420" y="146" textAnchor="end" fontSize="12" fontWeight="bold" fill="#15803d">2 ötös ugrás = 1 tízes ugrás</text>
    </svg>
  );
};

/** 7 darab 10 Ft-os = 70 Ft; 1 darab 50 Ft-os = 5 darab 10 Ft-os. */
export const CoinsTenSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 170" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT10_FONT}>
    <rect x="1" y="1" width="378" height="168" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    {Array.from({ length: 7 }, (_, i) => (
      <CoinG key={i} cx={40 + i * 40} cy={36} r={17} value={10} />
    ))}
    <text x="340" y="42" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">70 Ft</text>
    <text x="190" y="76" textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155">7 · 10 = 70</text>
    <line x1="20" y1="88" x2="360" y2="88" stroke="#e2e8f0" strokeWidth="2" />
    <CoinG cx={48} cy={126} r={24} value={50} />
    <text x="92" y="134" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0f172a">=</text>
    {Array.from({ length: 5 }, (_, i) => (
      <CoinG key={i} cx={134 + i * 40} cy={126} r={17} value={10} />
    ))}
    <text x="340" y="132" textAnchor="middle" fontSize="13" fontWeight="900" fill="#334155">5 · 10</text>
    <text x="190" y="162" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
      Egy 50 Ft-os ugyanannyi, mint öt 10 Ft-os.
    </text>
  </svg>
);

/** 6 tojástartó, mindegyikben 10 tojás. */
export const EggBoxesSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 360 150" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT10_FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
    {Array.from({ length: 6 }, (_, i) => (
      <EggBoxG key={i} x={30 + (i % 3) * 104} y={14 + Math.floor(i / 3) * 50} s={1.4} />
    ))}
    <text x="180" y="138" textAnchor="middle" fontSize="17" fontWeight="900" fill="#78350f">
      6 tartó, mindben 10 tojás: 6 · 10 = 60
    </text>
  </svg>
);
