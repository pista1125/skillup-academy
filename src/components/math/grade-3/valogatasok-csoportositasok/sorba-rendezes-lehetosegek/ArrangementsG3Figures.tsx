import React from 'react';
import { B, LogicBlock, Ball, DigitCard, Kid, Tower, Shirt, Pants, T, PalName } from './ArrangementsG3Parts';

// ---------------------------------------------------------------------------
// 3. Sorba rendezés és lehetőségek – ábrák (3. osztály)
// ---------------------------------------------------------------------------

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; c?: string; w?: number }> = ({ x1, y1, x2, y2, c = '#0f766e', w = 3 }) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const L = 11;
  const p1 = `${(x2 - L * Math.cos(a - 0.45)).toFixed(1)},${(y2 - L * Math.sin(a - 0.45)).toFixed(1)}`;
  const p2 = `${(x2 - L * Math.cos(a + 0.45)).toFixed(1)},${(y2 - L * Math.sin(a + 0.45)).toFixed(1)}`;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - 6 * Math.cos(a)} y2={y2 - 6 * Math.sin(a)} stroke={c} strokeWidth={w} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} fill={c} />
    </g>
  );
};

/** Sorba rendezés magasság szerint: összevissza → növekvő sorrend. */
export const OrderByHeightSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const left: [string, number, PalName][] = [
    ['A', 5, 'piros'],
    ['B', 2, 'kek'],
    ['C', 7, 'zold'],
    ['D', 4, 'sarga']
  ];
  const right = [...left].sort((p, q) => p[1] - q[1]);
  return (
    <svg viewBox="0 0 480 215" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="216" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="258" y="6" width="216" height="200" rx="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <T x={114} y={30} s={14}>összevissza</T>
      <T x={366} y={30} s={14} c="#166534">növekvő sorrend</T>
      {left.map(([l, n, c], i) => (
        <g key={l}>
          <Tower x={44 + i * 48} y={164} n={n} s={14} c={c} />
          <T x={44 + i * 48} y={184} s={15}>{l}</T>
          <T x={44 + i * 48} y={200} s={11} c="#475569" w="normal">{n} kocka</T>
        </g>
      ))}
      {right.map(([l, n, c], i) => (
        <g key={l}>
          <Tower x={296 + i * 48} y={164} n={n} s={14} c={c} />
          <T x={296 + i * 48} y={184} s={15}>{l}</T>
          <T x={296 + i * 48} y={200} s={11} c="#475569" w="normal">{n} kocka</T>
        </g>
      ))}
      <Arrow x1={226} y1={110} x2={254} y2={110} c="#16a34a" w={4} />
    </svg>
  );
};

/** Nyilas ábra: a nyíl az alacsonyabbtól a magasabb felé mutat. */
export const ArrowOrderSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => (
  <svg viewBox="0 0 480 210" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="262" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <Kid x={52} y={172} c="kek" letter="L" />
    <Kid x={137} y={92} c="rozsa" letter="P" />
    <Kid x={222} y={172} c="narancs" letter="D" />
    <T x={52} y={194} s={13}>Levi</T>
    <T x={137} y={28} s={13}>Panna</T>
    <T x={222} y={194} s={13}>Dóri</T>
    <Arrow x1={72} y1={128} x2={116} y2={78} />
    <Arrow x1={158} y1={78} x2={202} y2={128} />
    <Arrow x1={76} y1={150} x2={196} y2={150} />
    <rect x="282" y="6" width="192" height="198" rx="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
    <T x={378} y={30} s={13} c="#166534">alacsonyabbtól</T>
    <T x={378} y={47} s={13} c="#166534">a magasabbig</T>
    <Kid x={318} y={172} c="kek" letter="L" h={46} />
    <Kid x={378} y={172} c="rozsa" letter="P" h={58} />
    <Kid x={438} y={172} c="narancs" letter="D" h={70} />
    <T x={318} y={194} s={13}>Levi</T>
    <T x={378} y={194} s={13}>Panna</T>
    <T x={438} y={194} s={13}>Dóri</T>
  </svg>
);

const BALLS3: PalName[] = ['piros', 'kek', 'zold'];

/** A 3 golyó mind a 6 sorrendje, az első golyó szerint csoportosítva. */
export const ThreeOrdersSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const names: Record<string, string> = { piros: 'piros', kek: 'kék', zold: 'zöld' };
  return (
    <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {BALLS3.map((first, g) => {
        const rest = BALLS3.filter((c) => c !== first);
        const cx = 82 + g * 158;
        return (
          <g key={first}>
            <rect x={cx - 72} y="8" width="144" height="150" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
            <T x={cx} y={32} s={13}>{names[first]} elöl</T>
            {[rest, [...rest].reverse()].map((r, k) => (
              <g key={k}>
                {[first, ...r].map((c, i) => (
                  <Ball key={i} x={cx - 36 + i * 36} y={72 + k * 52} r={14} c={c} />
                ))}
              </g>
            ))}
          </g>
        );
      })}
      <T x={240} y={188} s={16} c="#166534">3 · 2 = 6 sorrend</T>
    </svg>
  );
};

/** A lehetőségek fája: 3 golyó sorrendjei. */
export const OrderTreeSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const xs1 = [80, 240, 400];
  return (
    <svg viewBox="0 0 480 262" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="200" y="6" width="80" height="26" rx="13" fill="#ecfeff" stroke="#0891b2" strokeWidth="2" />
      <T x={240} y={24} s={13}>kezdés</T>
      {BALLS3.map((first, g) => {
        const rest = BALLS3.filter((c) => c !== first);
        const x1 = xs1[g];
        return (
          <g key={first}>
            <line x1={240} y1={32} x2={x1} y2={60} stroke="#64748b" strokeWidth="2.5" />
            {rest.map((second, k) => {
              const x2 = x1 + (k === 0 ? -38 : 38);
              const third = rest.find((c) => c !== second) as PalName;
              return (
                <g key={second}>
                  <line x1={x1} y1={86} x2={x2} y2={124} stroke="#64748b" strokeWidth="2.5" />
                  <line x1={x2} y1={152} x2={x2} y2={188} stroke="#64748b" strokeWidth="2.5" />
                  <Ball x={x2} y={138} r={13} c={second} />
                  <Ball x={x2} y={203} r={13} c={third} />
                  <T x={x2} y={243} s={14} c="#166534">{g * 2 + k + 1}.</T>
                </g>
              );
            })}
            <Ball x={x1} y={73} r={13} c={first} />
          </g>
        );
      })}
    </svg>
  );
};

/** Háromjegyű számok számkártyákból: 1, 3, 4 → 6 szám; 3, 0, 2 → csak 4 szám. */
export const DigitCardsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const a = ['134', '143', '314', '341', '413', '431'];
  const b = ['203', '230', '302', '320'];
  return (
    <svg viewBox="0 0 480 236" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="226" height="224" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="248" y="6" width="226" height="224" rx="14" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
      {['1', '3', '4'].map((d, i) => (
        <DigitCard key={d} x={68 + i * 36} y={18} d={d} />
      ))}
      {['3', '0', '2'].map((d, i) => (
        <DigitCard key={d} x={310 + i * 36} y={18} d={d} fill={d === '0' ? '#fef3c7' : '#ffffff'} />
      ))}
      {a.map((n, i) => (
        <T key={n} x={i % 2 ? 165 : 73} y={90 + Math.floor(i / 2) * 32} s={20}>{n}</T>
      ))}
      <T x={119} y={212} s={14} c="#166534">6 szám</T>
      {b.map((n, i) => (
        <T key={n} x={i % 2 ? 407 : 315} y={90 + Math.floor(i / 2) * 32} s={20}>{n}</T>
      ))}
      {['023', '032'].map((n, i) => (
        <g key={n}>
          <T x={i ? 407 : 315} y={154} s={20} c="#94a3b8">{n}</T>
          <line x1={(i ? 407 : 315) - 24} y1={140} x2={(i ? 407 : 315) + 24} y2={154} stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <T x={361} y={186} s={12} c="#9a3412" w="normal">0 nem állhat elöl!</T>
      <T x={361} y={212} s={14} c="#166534">csak 4 szám</T>
    </svg>
  );
};

/** 2 póló és 3 nadrág: 2 · 3 = 6 öltözet (táblázat). */
export const OutfitsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const shirts: PalName[] = ['piros', 'kek'];
  const pants: PalName[] = ['zold', 'barna', 'lila'];
  return (
    <svg viewBox="0 0 480 226" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="468" height="186" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      {pants.map((c, j) => (
        <Pants key={c} x={210 + j * 100} y={40} c={c} r={17} />
      ))}
      {shirts.map((c, i) => (
        <Shirt key={c} x={80} y={100 + i * 54} c={c} r={17} />
      ))}
      <line x1="130" y1="68" x2="460" y2="68" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="130" y1="18" x2="130" y2="182" stroke="#cbd5e1" strokeWidth="2" />
      {shirts.map((s, i) =>
        pants.map((p, j) => (
          <g key={`${s}${p}`}>
            <rect x={174 + j * 100} y={76 + i * 54} width="72" height="48" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
            <Shirt x={196 + j * 100} y={100 + i * 54} c={s} r={10} sw={2} />
            <Pants x={224 + j * 100} y={100 + i * 54} c={p} r={10} sw={2} />
          </g>
        ))
      )}
      <T x={240} y={216} s={16} c="#166534">2 · 3 = 6 öltözet</T>
    </svg>
  );
};

/** Igaz vagy hamis? „Minden”, „van olyan”, „egyik sem”. */
export const StatementsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const rows: [string, boolean][] = [
    ['Minden lap lyukas.', false],
    ['Van olyan lap, amelyik kék.', true],
    ['Egyik lap sem háromszög.', false],
    ['Nincs nagy, sárga lap.', true]
  ];
  return (
    <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="190" height="188" rx="14" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
      <LogicBlock b={B('piros', 'kor', true, true)} x={52} y={50} />
      <LogicBlock b={B('kek', 'haromszog', true, true)} x={146} y={52} />
      <LogicBlock b={B('piros', 'negyzet', false, false)} x={100} y={100} />
      <LogicBlock b={B('sarga', 'kor', false, true)} x={46} y={150} />
      <LogicBlock b={B('zold', 'negyzet', true, true)} x={146} y={150} />
      {rows.map(([s, ok], i) => (
        <g key={s}>
          <rect x="210" y={14 + i * 46} width="264" height="38" rx="10" fill={ok ? '#f0fdf4' : '#fff1f2'} stroke={ok ? '#86efac' : '#fda4af'} strokeWidth="2" />
          <T x={220} y={38 + i * 46} s={13} a="start">{s}</T>
          <circle cx={452} cy={33 + i * 46} r={13} fill={ok ? '#16a34a' : '#e11d48'} />
          <T x={452} y={38 + i * 46} s={14} c="#ffffff">{ok ? 'I' : 'H'}</T>
        </g>
      ))}
    </svg>
  );
};
