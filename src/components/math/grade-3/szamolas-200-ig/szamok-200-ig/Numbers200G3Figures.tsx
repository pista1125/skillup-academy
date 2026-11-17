import React from 'react';
import { FONT, HundredFlat, TenRod, OneCube, Coin, Abacus } from './Numbers200G3Parts';

// ---------------------------------------------------------------------------
// 1. Számok 200-ig – ábrák (3. osztály)
// ---------------------------------------------------------------------------

/** 136 = 1 százas lap + 3 tízesrúd + 6 egyeskocka. */
export const HundredsTensOnesSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 340 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="198" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <HundredFlat x={24} y={22} s={9} />
    {[0, 1, 2].map((i) => (
      <TenRod key={i} x={150 + i * 20} y={22} s={9} />
    ))}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <OneCube key={i} x={250 + (i % 3) * 16} y={88 + Math.floor(i / 3) * 16} s={11} />
    ))}
    <text x="69" y="134" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">1 százas</text>
    <text x="179" y="134" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">3 tízes</text>
    <text x="272" y="134" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#a16207">6 egyes</text>
    <text x="170" y="162" textAnchor="middle" fontSize="12" fill="#334155">lap = 100, rúd = 10, kocka = 1</text>
    <text x="170" y="186" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">100 + 30 + 6 = 136</text>
  </svg>
);

/** A második százas tábla (101–200) néhány elbújt számmal és a lépések szabályával. */
export const SecondHundredBoardSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm h-auto mx-auto' }) => {
  const S = 26;
  const X0 = 10;
  const Y0 = 10;
  const hidden = [117, 139, 161, 178, 195];
  return (
    <svg viewBox="0 0 280 330" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="278" height="328" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {Array.from({ length: 100 }, (_, k) => {
        const n = 101 + k;
        const r = Math.floor(k / 10);
        const c = k % 10;
        const isHidden = hidden.includes(n);
        const fill = n === 143 ? '#fde68a' : n === 144 ? '#bbf7d0' : n === 153 ? '#bfdbfe' : isHidden ? '#fee2e2' : c === 9 ? '#e0f2fe' : '#ffffff';
        return (
          <g key={n}>
            <rect x={X0 + c * S} y={Y0 + r * S} width={S} height={S} fill={fill} stroke="#94a3b8" strokeWidth="0.8" />
            <text
              x={X0 + c * S + S / 2}
              y={Y0 + r * S + 17}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight={isHidden || [143, 144, 153].includes(n) ? 'bold' : 'normal'}
              fill={isHidden ? '#dc2626' : '#334155'}
            >
              {isHidden ? '?' : n}
            </text>
          </g>
        );
      })}
      <rect x="16" y="282" width="14" height="14" fill="#bbf7d0" stroke="#94a3b8" />
      <text x="36" y="294" fontSize="12" fill="#14532d">jobbra lépek: 1-gyel több (143 → 144)</text>
      <rect x="16" y="304" width="14" height="14" fill="#bfdbfe" stroke="#94a3b8" />
      <text x="36" y="316" fontSize="12" fill="#1e3a8a">lefelé lépek: 10-zel több (143 → 153)</text>
    </svg>
  );
};

/** Helyiérték-táblázat: alaki érték és valódi érték a 158-ban. */
export const PlaceValue200Svg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => {
  const heads: [string, string, string][] = [
    ['százas', '#ef4444', '#fee2e2'],
    ['tízes', '#3b82f6', '#dbeafe'],
    ['egyes', '#eab308', '#fef9c3']
  ];
  const digits = ['1', '5', '8'];
  const real = ['100', '50', '8'];
  const W = 66;
  const X = 106;
  return (
    <svg viewBox="0 0 320 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="318" height="178" rx="14" fill="#fff7ed" stroke="#fed7aa" />
      <rect x={X} y="12" width={W * 3} height="24" fill="#f97316" />
      <text x={X + W * 1.5} y="29" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">helyiérték</text>
      {heads.map(([t, col, light], i) => (
        <g key={t}>
          <rect x={X + i * W} y="36" width={W} height="24" fill={col} />
          <text x={X + i * W + W / 2} y="53" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">{t}</text>
          <rect x={X + i * W} y="60" width={W} height="34" fill={light} stroke="#fdba74" />
          <text x={X + i * W + W / 2} y="84" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e293b">{digits[i]}</text>
          <text x={X + i * W + W / 2} y="124" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7c2d12">{real[i]}</text>
          {i < 2 && (
            <text x={X + (i + 1) * W} y="124" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7c2d12">+</text>
          )}
        </g>
      ))}
      <text x="12" y="83" fontSize="12.5" fontWeight="bold" fill="#334155">alaki érték</text>
      <text x="12" y="123" fontSize="12.5" fontWeight="bold" fill="#334155">valódi érték</text>
      <text x="160" y="162" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">158 = 100 + 50 + 8</text>
    </svg>
  );
};

/** Golyós számoló: 1 piros, 4 kék, 2 sárga golyó = 142. */
export const Abacus200Svg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm h-auto mx-auto' }) => (
  <svg viewBox="0 0 300 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="298" height="188" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
    <Abacus x={60} y={20} h={110} sz={1} t={4} e={2} gap={50} r={6.5} />
    <text x="60" y="154" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">100</text>
    <text x="110" y="154" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">40</text>
    <text x="160" y="154" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a16207">2</text>
    <circle cx="214" cy="40" r="6.5" fill="#ef4444" stroke="#991b1b" />
    <text x="226" y="45" fontSize="12.5" fill="#334155">= 100</text>
    <circle cx="214" cy="66" r="6.5" fill="#38bdf8" stroke="#0369a1" />
    <text x="226" y="71" fontSize="12.5" fill="#334155">= 10</text>
    <circle cx="214" cy="92" r="6.5" fill="#facc15" stroke="#a16207" />
    <text x="226" y="97" fontSize="12.5" fill="#334155">= 1</text>
    <text x="150" y="178" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">100 + 40 + 2 = 142</text>
  </svg>
);

/** Pénztárca: 100 + 50 + 20 + 5 = 175 Ft. */
export const Money200Svg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm h-auto mx-auto' }) => (
  <svg viewBox="0 0 320 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="168" rx="14" fill="#fdf4ff" stroke="#f5d0fe" />
    <path d="M 36 44 Q 18 122 48 132 L 272 132 Q 302 122 284 44 Z" fill="#c084fc" stroke="#6b21a8" strokeWidth="2" />
    <path d="M 36 44 Q 160 28 284 44" fill="none" stroke="#6b21a8" strokeWidth="2" />
    <circle cx="150" cy="28" r="7" fill="none" stroke="#6b21a8" strokeWidth="2" />
    <circle cx="170" cy="28" r="7" fill="none" stroke="#6b21a8" strokeWidth="2" />
    <Coin cx={82} cy={88} v={100} r={24} />
    <Coin cx={140} cy={88} v={50} r={21} />
    <Coin cx={192} cy={88} v={20} r={19} />
    <Coin cx={238} cy={88} v={5} r={16} />
    <text x="160" y="158" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#581c87">100 Ft + 50 Ft + 20 Ft + 5 Ft = 175 Ft</text>
  </svg>
);

/** Számnevek: száz + negyven + hét = száznegyvenhét → 147; kétszáz = 200. */
export const NumberWordsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => {
  const cards: [string, string, string, number][] = [
    ['száz', '100', '#fee2e2', 16],
    ['negyven', '40', '#dbeafe', 123],
    ['hét', '7', '#fef9c3', 230]
  ];
  return (
    <svg viewBox="0 0 320 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="318" height="168" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      {cards.map(([w, n, fill, x]) => (
        <g key={w}>
          <rect x={x} y="16" width="74" height="54" rx="8" fill={fill} stroke="#64748b" />
          <text x={x + 37} y="38" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">{w}</text>
          <text x={x + 37} y="60" textAnchor="middle" fontSize="15" fill="#475569">{n}</text>
        </g>
      ))}
      <text x="106.5" y="48" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">+</text>
      <text x="213.5" y="48" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">+</text>
      <text x="160" y="100" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#15803d">száznegyvenhét = 147</text>
      <text x="160" y="126" textAnchor="middle" fontSize="13" fill="#334155">egybeírjuk: száz + negyven + hét</text>
      <text x="160" y="152" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">kétszáz = 200</text>
    </svg>
  );
};
