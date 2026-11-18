import React from 'react';
import { N100_FONT, N100_COLORS, RodsPart, NumberLinePart } from '../szamok-100-ig/Numbers100G2Parts';

// ---------------------------------------------------------------------------
// 3. Kivonás 100-as számkör – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEFAULT_CLASS = 'w-full max-w-[480px] h-auto mx-auto';
const R = '#e11d48';
const B = '#2563eb';
const O = '#ea580c';

/** 68 − 5 = 63: elveszünk 5 kockát (8 − 5 = 3). */
export const NoCrossSubSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 185" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="183" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4c1d95">
      Kistesó: 8 − 5 = 3
    </text>
    <RodsPart x={108} y={32} tens={6} ones={8} u={11} crossOnes={5} />
    <text x="170" y="160" textAnchor="middle" fontSize="17" fontWeight="900" fill={N100_COLORS.ink}>
      68 − 5 = 63
    </text>
    <text x="170" y="178" textAnchor="middle" fontSize="12" fill={N100_COLORS.muted}>
      A 6 tízes marad, csak a kockákból veszünk el.
    </text>
  </svg>
);

/** 74 − 4 = 70 és 80 − 6 = 74: kerek tízesre, kerek tízesből. */
export const RoundTenSubSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="148" rx="14" fill="#fff1f2" stroke="#fecdd3" />
    <NumberLinePart
      x={20}
      y={84}
      width={290}
      from={68}
      to={82}
      labelEvery={10}
      extraLabels={[74]}
      fontSize={12}
      hops={[
        { from: 74, to: 70, color: R, label: '−4', h: 16 },
        { from: 80, to: 74, color: B, label: '−6', h: 22 }
      ]}
      marks={[{ value: 74, color: '#7c3aed' }, { value: 70, color: R }, { value: 80, color: B }]}
    />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9f1239">
      Kerek tízesre és kerek tízesből
    </text>
    <text x="100" y="134" textAnchor="middle" fontSize="15" fontWeight="900" fill={R}>74 − 4 = 70</text>
    <text x="240" y="134" textAnchor="middle" fontSize="15" fontWeight="900" fill={B}>80 − 6 = 74</text>
  </svg>
);

/** 63 − 7 = 63 − 3 − 4 = 56: visszafelé a kerek tízesig. */
export const BridgeBackSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="148" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
      Először lépj vissza a kerek tízesig!
    </text>
    <NumberLinePart
      x={20}
      y={96}
      width={290}
      from={50}
      to={70}
      extraLabels={[56, 63]}
      fontSize={12}
      hops={[
        { from: 63, to: 60, color: O, label: '−3', h: 16 },
        { from: 60, to: 56, color: R, label: '−4', h: 16 }
      ]}
      marks={[{ value: 63, color: '#7c3aed' }, { value: 60, color: O }, { value: 56, color: '#dc2626' }]}
    />
    <text x="170" y="138" textAnchor="middle" fontSize="16" fontWeight="900" fill={N100_COLORS.ink}>
      63 − 7 = 63 − 3 − 4 = 56
    </text>
  </svg>
);

/** 52 − 8 rudakkal: 1 rudat felbontunk 10 kockára. */
export const RodBreakSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 250" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="248" rx="14" fill="#ecfdf5" stroke="#a7f3d0" />
    <text x="170" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill={N100_COLORS.ink}>
      52 − 8: csak 2 kocka van, ez kevés!
    </text>
    <RodsPart x={134} y={28} tens={5} ones={2} u={8} />
    <text x="170" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#047857">
      Bonts fel 1 rudat: 4 rúd és 12 kocka
    </text>
    <RodsPart x={130} y={138} tens={4} ones={12} u={8} crossOnes={8} />
    <text x="170" y="240" textAnchor="middle" fontSize="16" fontWeight="900" fill={N100_COLORS.ink}>
      Marad 4 rúd és 4 kocka: 52 − 8 = 44
    </text>
  </svg>
);

/** 66 − 27 = 66 − 20 − 7: előbb a tízesek. */
export const TensThenOnesBackSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 155" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="153" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#581c87">
      66 − 27 = ?
    </text>
    <NumberLinePart
      x={20}
      y={98}
      width={290}
      from={30}
      to={70}
      extraLabels={[39, 46, 66]}
      fontSize={11}
      hops={[
        { from: 66, to: 46, color: '#16a34a', label: '−20', h: 24 },
        { from: 46, to: 40, color: O, label: '−6', h: 12 },
        { from: 40, to: 39, color: R, label: '−1', h: 8 }
      ]}
      marks={[{ value: 66, color: '#7c3aed' }, { value: 40, color: O }, { value: 39, color: '#dc2626' }]}
    />
    <text x="170" y="140" textAnchor="middle" fontSize="15" fontWeight="900" fill={N100_COLORS.ink}>
      66 − 20 = 46, 46 − 7 = 46 − 6 − 1 = 39
    </text>
  </svg>
);

/** 82 − 47 = 35, ellenőrzés: 35 + 47 = 82 (szakaszos ábra). */
export const CheckWithAddSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => {
  const unit = 3.4;
  const x0 = 30;
  return (
    <svg viewBox="0 0 340 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
      <rect x="1" y="1" width="338" height="158" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
      <path d={`M ${x0} 40 L ${x0} 32 L ${x0 + 82 * unit} 32 L ${x0 + 82 * unit} 40`} fill="none" stroke="#0f172a" strokeWidth="2" />
      <text x={x0 + 41 * unit} y="26" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">82</text>
      <rect x={x0} y={46} width={47 * unit} height={32} rx="5" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2" />
      <text x={x0 + 23.5 * unit} y={67} textAnchor="middle" fontSize="16" fontWeight="900" fill="#4c1d95">47</text>
      <rect x={x0 + 47 * unit} y={46} width={35 * unit} height={32} rx="5" fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
      <text x={x0 + 64.5 * unit} y={67} textAnchor="middle" fontSize="16" fontWeight="900" fill="#14532d">35</text>
      <text x="170" y="112" textAnchor="middle" fontSize="16" fontWeight="900" fill={R}>82 − 47 = 35</text>
      <text x="170" y="140" textAnchor="middle" fontSize="16" fontWeight="900" fill={B}>Ellenőrzés: 35 + 47 = 82</text>
    </svg>
  );
};
