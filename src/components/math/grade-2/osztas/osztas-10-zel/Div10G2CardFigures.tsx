import React from 'react';
import { DIV10_FONT, DIV10_UNK, RodG, CoinG, EggBoxG, EggG, PlateG, RodsCubesG, JumpLineG } from './Div10G2Parts';

type Kind = 'coin' | 'egg' | 'rod';

const KindIcon: React.FC<{ kind: Kind; x: number; y: number; big?: boolean }> = ({ kind, x, y, big = true }) => {
  if (kind === 'coin') return <CoinG cx={x} cy={y} r={big ? 14 : 11} value={10} />;
  if (kind === 'egg') return <EggBoxG x={x - (big ? 16 : 13)} y={y - (big ? 8 : 6.5)} s={big ? 0.54 : 0.44} />;
  return <RodG x={x - 3} y={y - (big ? 28 : 22)} c={big ? 5.6 : 4.4} />;
};

/** 150 × 80: „összeg = ? · tárgy” – hány tízes kell? */
export const TargetCard150: React.FC<{ kind: Kind; total: number }> = ({ kind, total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="3" y="4" width="144" height="72" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    <text x="40" y="50" textAnchor="middle" fontSize={kind === 'coin' ? 20 : 24} fontWeight="900" fill="#0f172a">
      {kind === 'coin' ? `${total} Ft` : total}
    </text>
    <text x="80" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">
      =
    </text>
    <text x="100" y="51" textAnchor="middle" fontSize="22" fontWeight="900" fill={DIV10_UNK}>
      ?
    </text>
    <KindIcon kind={kind} x={128} y={42} />
  </svg>
);

/** 150 × 80: tízes ugrások a számegyenesen 0-tól, a végén a megadott szám. */
export const JumpCard150: React.FC<{ jumps: number; showEnd: number }> = ({ jumps, showEnd }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="3" y="4" width="144" height="72" rx="10" fill="#f8fafc" stroke="#0d9488" strokeWidth="3" />
    <JumpLineG x0={10} y={46} width={120} jumps={jumps} endLabel={String(showEnd)} labelEvery={50} fontSize={10} />
  </svg>
);

/** 150 × 80: összeg és 10 üres tányér. */
export const PlatesCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="3" y="4" width="144" height="72" rx="10" fill="#f0fdfa" stroke="#0d9488" strokeWidth="3" />
    <circle cx="28" cy="40" r="17" fill="#a16207" stroke="#713f12" strokeWidth="2" />
    <text x="28" y="47" textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff">
      {total}
    </text>
    {Array.from({ length: 10 }, (_, i) => (
      <PlateG key={i} cx={64 + (i % 5) * 18} cy={26 + Math.floor(i / 5) * 28} r={8} />
    ))}
  </svg>
);

/** 150 × 80: 1 db 50 Ft-os = ? db 10 Ft-os. */
export const CoinSwapCard150: React.FC = () => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="3" y="4" width="144" height="72" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    <CoinG cx={34} cy={40} r={22} value={50} />
    <text x="72" y="49" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">
      =
    </text>
    <text x="96" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill={DIV10_UNK}>
      ?
    </text>
    <CoinG cx={124} cy={40} r={15} value={10} />
  </svg>
);

/** 150 × 80: rudak és kockák. */
export const RodsCubesCard150: React.FC<{ tens: number; ones: number }> = ({ tens, ones }) => {
  const c = 5.8;
  const gap = 11;
  const w = tens * gap + (ones > 0 ? c * 0.6 + 2 * (c + 2) : 0);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="144" height="72" rx="10" fill="#f0fdfa" stroke="#0f766e" strokeWidth="3" />
      <RodsCubesG x={75 - w / 2} y={11} tens={tens} ones={ones} c={c} gap={gap} />
    </svg>
  );
};

/** 80 × 80: „összeg”, alatta „= ? · tárgy”. */
export const TargetCard80: React.FC<{ kind: Kind; total: number }> = ({ kind, total }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    <text x="40" y="30" textAnchor="middle" fontSize={kind === 'coin' ? 18 : 22} fontWeight="900" fill="#0f172a">
      {kind === 'coin' ? `${total} Ft` : total}
    </text>
    <text x="18" y="60" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
      =
    </text>
    <text x="34" y="61" textAnchor="middle" fontSize="18" fontWeight="900" fill={DIV10_UNK}>
      ?
    </text>
    <KindIcon kind={kind} x={58} y={53} big={false} />
  </svg>
);

/** 80 × 80: rudak és kockák. */
export const RodsCubesCard80: React.FC<{ tens: number; ones: number }> = ({ tens, ones }) => {
  const c = 5;
  const gap = tens > 5 ? 7 : 9;
  const w = tens * gap + (ones > 0 ? c * 0.6 + 2 * (c + 2) : 0);
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#f0fdfa" stroke="#0f766e" strokeWidth="3" />
      <RodsCubesG x={40 - w / 2} y={15} tens={tens} ones={ones} c={c} gap={gap} />
    </svg>
  );
};

/** 80 × 80: nagy szám tojással (ennyi tojás van). */
export const EggNumCard80: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#fffbeb" stroke="#a16207" strokeWidth="3" />
    <EggG cx={20} cy={22} s={1.7} />
    <EggG cx={34} cy={18} s={1.4} />
    <text x="40" y="64" textAnchor="middle" fontSize="28" fontWeight="900" fill="#78350f">
      {n}
    </text>
  </svg>
);
