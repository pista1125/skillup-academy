import React from 'react';
import { FONT, INK, UNK, Rod, RodGroups, Coin, Jumps } from './MulDiv200G3Parts';

type P = { className?: string };

/** 3 · 40: három csoport, mindegyikben 4 tízesrúd. */
export const MulDiv200TensSvg: React.FC<P> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 240 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
      3 csoport, mindegyikben 4 tízes
    </text>
    <RodGroups groups={3} per={4} y={30} rodH={50} labels={['40', '40', '40']} />
    <text x="120" y="122" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">
      3 · 4 tízes = 12 tízes
    </text>
    <text x="120" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>
      3 · 40 = 120
    </text>
  </svg>
);

/** A szorzótábla segít: 6 · 3 → 6 · 3 tízes → 6 · 30. */
export const MulDiv200LadderSvg: React.FC<P> = ({ className = 'w-full h-auto' }) => {
  const rows = [
    { l: '6 · 3 = 18', r: '18 : 6 = 3', c: '#334155' },
    { l: '6 · 3 tízes = 18 tízes', r: '18 tízes : 6 = 3 tízes', c: '#1d4ed8' },
    { l: '6 · 30 = 180', r: '180 : 6 = 30', c: '#047857' }
  ];
  return (
    <svg viewBox="0 0 240 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="238" height="138" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="62" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">
        szorzás
      </text>
      <text x="180" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">
        osztás
      </text>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="8" y={26 + i * 38} width="110" height="28" rx="8" fill="#fff" stroke="#fcd34d" strokeWidth="1.5" />
          <text x="63" y={44 + i * 38} textAnchor="middle" fontSize={i === 1 ? 9.5 : 12} fontWeight="bold" fill={r.c}>
            {r.l}
          </text>
          <rect x="124" y={26 + i * 38} width="110" height="28" rx="8" fill="#fff" stroke="#c4b5fd" strokeWidth="1.5" />
          <text x="179" y={44 + i * 38} textAnchor="middle" fontSize={i === 1 ? 9.5 : 12} fontWeight="bold" fill={r.c}>
            {r.r}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** 160 : 4 — 16 tízesrúd 4 tányérra: mindegyikre 4 tízes jut. */
export const MulDiv200SharingSvg: React.FC<P> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 240 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
      160 = 16 tízes, 4 egyenlő részre
    </text>
    {[0, 1, 2, 3].map((i) => {
      const cx = 36 + i * 56;
      return (
        <g key={i}>
          <ellipse cx={cx} cy="68" rx="25" ry="30" fill="#fff" stroke="#94a3b8" strokeWidth="1.6" />
          {[0, 1, 2, 3].map((k) => (
            <Rod key={k} x={cx - 17 + k * 9} y={48} w={6} h={40} />
          ))}
          <text x={cx} y="114" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
            40
          </text>
        </g>
      );
    })}
    <text x="120" y="138" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>
      160 : 4 = 40
    </text>
  </svg>
);

/** 160 : 40 — hányszor van meg a 40 a 160-ban? Ugrások a számegyenesen. */
export const MulDiv200GroupingSvg: React.FC<P> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 240 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
      Hányszor van meg a 40 a 160-ban?
    </text>
    <Jumps to={200} size={40} showJumps={4} y={86} labelEvery={40} jumpLabel="+ 40" />
    {[1, 2, 3, 4].map((i) => (
      <text key={i} x={18 + ((i - 0.5) * 40 * 204) / 200} y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c2d12">
        {i}.
      </text>
    ))}
    <text x="120" y="122" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>
      4 ugrás: 160 : 40 = 4
    </text>
  </svg>
);

/** Pénzzel: 7 darab 20 forintos. */
export const MulDiv200CoinsSvg: React.FC<P> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 240 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {Array.from({ length: 7 }).map((_, i) => (
      <Coin key={i} cx={30 + i * 30} cy={36} v={20} r={14} />
    ))}
    <text x="120" y="76" textAnchor="middle" fontSize="12" fill="#334155">
      20 + 20 + 20 + 20 + 20 + 20 + 20
    </text>
    <text x="120" y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309">
      7 · 20 Ft = 140 Ft
    </text>
    <text x="120" y="118" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">
      140 Ft : 20 Ft = 7
    </text>
  </svg>
);

/** Műveletcsalád: 5, 30, 150. */
export const MulDiv200FamilySvg: React.FC<P> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 240 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height="138" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <path d="M 60 112 L 120 24 L 180 112 Z" fill="#fef9c3" stroke="#eab308" strokeWidth="2" />
    <circle cx="120" cy="34" r="17" fill="#fff" stroke="#16a34a" strokeWidth="2" />
    <text x="120" y="39" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">
      150
    </text>
    <circle cx="72" cy="104" r="15" fill="#fff" stroke="#2563eb" strokeWidth="2" />
    <text x="72" y="109" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">
      5
    </text>
    <circle cx="168" cy="104" r="15" fill="#fff" stroke="#2563eb" strokeWidth="2" />
    <text x="168" y="109" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">
      30
    </text>
    <g fontSize="10.5" fontWeight="bold" fill={INK}>
      <text x="8" y="40">5 · 30 = 150</text>
      <text x="8" y="58">30 · 5 = 150</text>
      <text x="232" y="40" textAnchor="end">150 : 5 = 30</text>
      <text x="232" y="58" textAnchor="end">150 : 30 = 5</text>
    </g>
    <text x="120" y="132" textAnchor="middle" fontSize="10" fill={UNK}>
      Három szám, négy művelet
    </text>
  </svg>
);
