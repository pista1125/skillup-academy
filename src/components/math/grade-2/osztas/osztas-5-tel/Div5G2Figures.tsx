import React from 'react';
import { DIV5_FONT, DIV5_UNK, HandG, GroupedDotsG, PlateG, CookieG, JumpLineG } from './Div5G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** 15 ujj – hány kéz? 15 : 5 = 3 (bennfoglalás). */
export const FingersToHandsSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 360 160" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV5_FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
    <text x="180" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">15 ujjat látok. Hány kéz ez?</text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={40 + i * 100} y="38" width="80" height="70" rx="12" fill="#fff" stroke="#16a34a" strokeWidth="2.5" />
        <HandG x={54 + i * 100} y={44} s={1.95} />
      </g>
    ))}
    <text x="180" y="142" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">15 : 5 = 3</text>
  </svg>
);

/** 20 keksz 5 tányérra: 20 : 5 = 4 (részekre osztás). */
export const SharePlatesSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 160" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV5_FONT}>
    <rect x="1" y="1" width="378" height="158" rx="14" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
    <text x="190" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0c4a6e">20 kekszet 5 tányérra osztunk.</text>
    {Array.from({ length: 5 }, (_, p) => {
      const cx = 46 + p * 72;
      return (
        <g key={p}>
          <PlateG cx={cx} cy={98} rx={32} ry={14} />
          {Array.from({ length: 4 }, (_, k) => (
            <CookieG key={k} cx={cx - 8 + (k % 2) * 16} cy={92 - Math.floor(k / 2) * 14} r={6.5} />
          ))}
          <text x={cx} y="128" textAnchor="middle" fontSize="14" fontWeight="900" fill="#b45309">4</text>
        </g>
      );
    })}
    <text x="190" y="150" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">20 : 5 = 4</text>
  </svg>
);

/** Ötszöröse és ötöde: nyilak oda-vissza, műveletcsalád. */
export const FifthArrowsSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 170" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV5_FONT}>
    <defs>
      <marker id="div5-arrow-g" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#16a34a" />
      </marker>
      <marker id="div5-arrow-r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#dc2626" />
      </marker>
    </defs>
    <rect x="1" y="1" width="378" height="168" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <circle cx="80" cy="74" r="26" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
    <text x="80" y="83" textAnchor="middle" fontSize="26" fontWeight="900" fill="#78350f">6</text>
    <circle cx="300" cy="74" r="26" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <text x="300" y="83" textAnchor="middle" fontSize="26" fontWeight="900" fill="#1e3a8a">30</text>
    <path d="M 108 60 Q 190 18 270 60" fill="none" stroke="#16a34a" strokeWidth="3" markerEnd="url(#div5-arrow-g)" />
    <path d="M 270 90 Q 190 132 108 90" fill="none" stroke="#dc2626" strokeWidth="3" markerEnd="url(#div5-arrow-r)" />
    <text x="190" y="30" textAnchor="middle" fontSize="14" fontWeight="900" fill="#15803d">ötszöröse: 6 · 5 = 30</text>
    <text x="190" y="128" textAnchor="middle" fontSize="14" fontWeight="900" fill="#b91c1c">ötöde: 30 : 5 = 6</text>
    <text x="190" y="156" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      A szorzás és az osztás testvérek!
    </text>
  </svg>
);

/** Visszafelé ugrálunk ötösével: 35-ből hány ugrás a 0? */
export const BackJumpsSvg: React.FC<FigProps> = ({ className }) => {
  const x0 = 24;
  const u = 7.6;
  return (
    <svg viewBox="0 0 440 120" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV5_FONT}>
      <rect x="1" y="1" width="438" height="118" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <JumpLineG x0={x0} y={70} width={50 * u} jumps={7} color="#7c3aed" labelEvery={5} fontSize={11} />
      {Array.from({ length: 7 }, (_, i) => (
        <text key={i} x={x0 + (i * 5 + 2.5) * u} y="40" textAnchor="middle" fontSize="12" fontWeight="900" fill="#6d28d9">
          {7 - i}.
        </text>
      ))}
      <text x={x0 + 35 * u} y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">innen indulunk</text>
      <text x="400" y="110" textAnchor="end" fontSize="15" fontWeight="900" fill="#0f172a">35 : 5 = 7</text>
    </svg>
  );
};

/** Maradékos osztás: 23 = 4 · 5 + 3. */
export const RemainderGroupsSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 160" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV5_FONT}>
    <rect x="1" y="1" width="378" height="158" rx="14" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
    <text x="190" y="24" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9a3412">23 golyó ötösével</text>
    <GroupedDotsG x={20} y={34} total={23} cols={5} cellW={68} cellH={66} d={11} r={5.5} fill="#3b82f6" />
    <text x={20 + 4 * 68 + 34} y="114" textAnchor="middle" fontSize="12" fontWeight="bold" fill={DIV5_UNK}>maradék</text>
    <text x="190" y="146" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">
      4 · 5 + <tspan fill={DIV5_UNK}>3</tspan> = 23
    </text>
  </svg>
);
