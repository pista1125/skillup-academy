import React from 'react';

const FONT = 'system-ui, sans-serif';

/** Katicabogár egyszerű rajza (6 láb). */
export const Ladybug: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-1, 1].map((side) =>
      [-7, 0, 7].map((dy) => (
        <line key={`${side}${dy}`} x1={side * 9} y1={dy} x2={side * 17} y2={dy + 3} stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" />
      ))
    )}
    <circle cx="0" cy="-13" r="6" fill="#0f172a" />
    <ellipse cx="0" cy="2" rx="12" ry="14" fill="#ef4444" stroke="#0f172a" strokeWidth="1.2" />
    <line x1="0" y1="-12" x2="0" y2="16" stroke="#0f172a" strokeWidth="1.2" />
    <circle cx="-5" cy="-2" r="2.6" fill="#0f172a" />
    <circle cx="5" cy="-2" r="2.6" fill="#0f172a" />
    <circle cx="-5" cy="8" r="2.2" fill="#0f172a" />
    <circle cx="5" cy="8" r="2.2" fill="#0f172a" />
  </g>
);

/** Hány lába van 4 katicának? 6 + 6 + 6 + 6 = 4 · 6 (tankönyv 17. o., 1. feladat). */
export const LadybugLegsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="148" rx="12" fill="#f0fdf4" stroke="#86efac" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <Ladybug x={50 + i * 80} y={52} />
        <text x={50 + i * 80} y="92" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">6 láb</text>
      </g>
    ))}
    <text x="170" y="118" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">6 + 6 + 6 + 6 = 24</text>
    <text x="170" y="138" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#15803d">4 · 6 = 24</text>
  </svg>
);

/** Maradékos osztás virágon: középen az osztó, a szirmokon az osztandók (tankönyv 17. o., 4. feladat). */
export const RemainderFlowerSvg: React.FC<{ className?: string }> = ({ className }) => {
  const petals = [13, 24, 23, 17, 29];
  return (
    <svg viewBox="0 0 340 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="168" rx="12" fill="#f7fee7" stroke="#bef264" />
      {petals.map((p, i) => {
        const a = (-90 + i * 72) * (Math.PI / 180);
        const cx = 90 + Math.cos(a) * 42;
        const cy = 85 + Math.sin(a) * 42;
        return (
          <g key={p}>
            <circle cx={cx} cy={cy} r="24" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
            <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">{p}</text>
          </g>
        );
      })}
      <circle cx="90" cy="85" r="20" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
      <text x="90" y="92" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">3</text>
      <text x="250" y="40" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">Osztás 3-mal:</text>
      {[
        '13 : 3 = 4, m: 1',
        '24 : 3 = 8, m: 0',
        '23 : 3 = 7, m: 2',
        '17 : 3 = 5, m: 2',
        '29 : 3 = 9, m: 2'
      ].map((t, i) => (
        <text key={t} x="250" y={62 + i * 20} textAnchor="middle" fontSize="12" fill="#0f172a">{t}</text>
      ))}
      <text x="170" y="162" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">A maradék mindig kisebb, mint az osztó!</text>
    </svg>
  );
};

/** Kerek tízesek szorzása: 4 · 60 = 4 · 6 tízes = 24 tízes = 240. */
export const RoundTensSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 160" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="158" rx="12" fill="#eff6ff" stroke="#93c5fd" />
    {[0, 1, 2, 3].map((r) =>
      [0, 1, 2, 3, 4, 5].map((c) => (
        <g key={`${r}-${c}`}>
          <rect x={20 + c * 22} y={16 + r * 30} width="16" height="24" rx="3" fill="#38bdf8" stroke="#0369a1" />
          <text x={28 + c * 22} y={32 + r * 30} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0c4a6e">10</text>
        </g>
      ))
    )}
    <text x="250" y="45" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">4 sor, soronként</text>
    <text x="250" y="63" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">6 tízes</text>
    <text x="250" y="95" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">4 · 6 = 24</text>
    <text x="250" y="120" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0284c7">4 · 60 = 240</text>
    <text x="250" y="145" textAnchor="middle" fontSize="12" fill="#334155">240 : 4 = 60</text>
  </svg>
);

/** Írásbeli szorzás: 214 · 3 = 642, nevekkel (tankönyv 20. o., 13. feladat). */
export const WrittenMultSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 190" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="188" rx="12" fill="#fff7ed" stroke="#fdba74" />
    {[
      { t: 'sz', c: '#dc2626' },
      { t: 't', c: '#0ea5e9' },
      { t: 'e', c: '#eab308' }
    ].map((h, i) => (
      <g key={h.t}>
        <rect x={96 + i * 32} y="44" width="30" height="20" fill={h.c} />
        <text x={111 + i * 32} y="59" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">{h.t}</text>
        <rect x={96 + i * 32} y="64" width="30" height="72" fill={h.c} opacity="0.12" />
      </g>
    ))}
    <text x="76" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">szorzandó</text>
    <text x="232" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">szorzó</text>
    {['2', '1', '4'].map((d, i) => (
      <text key={`a${i}`} x={111 + i * 32} y="90" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#b91c1c">{d}</text>
    ))}
    <text x="210" y="90" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">·</text>
    <text x="232" y="90" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#15803d">3</text>
    <line x1="94" y1="100" x2="192" y2="100" stroke="#0f172a" strokeWidth="2.5" />
    <text x="149" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">1</text>
    {['6', '4', '2'].map((d, i) => (
      <text key={`r${i}`} x={111 + i * 32} y="128" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0284c7">{d}</text>
    ))}
    <text x="252" y="128" fontSize="12" fontWeight="bold" fill="#0284c7">← szorzat</text>
    <text x="170" y="158" textAnchor="middle" fontSize="12" fill="#0f172a">3 · 4 = 12 → 2, maradt 1 | 3 · 1 + 1 = 4 | 3 · 2 = 6</text>
    <text x="170" y="178" textAnchor="middle" fontSize="11" fill="#9a3412">A szorzandó és a szorzó együtt: tényezők. Becslés: 210 · 3 = 630</text>
  </svg>
);

/** Pénzérmék védett élőlényekkel: 50 Ft kerecsensólyom, 20 Ft magyar nőszirom, 5 Ft nagy kócsag (tankönyv 18. o.). */
export const CoinsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const coins = [
    { v: 50, n: 'kerecsensólyom', fill: '#e5e7eb', stroke: '#6b7280', r: 30 },
    { v: 20, n: 'magyar nőszirom', fill: '#fde68a', stroke: '#a16207', r: 28 },
    { v: 5, n: 'nagy kócsag', fill: '#fef08a', stroke: '#a16207', r: 22 }
  ];
  return (
    <svg viewBox="0 0 340 130" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="128" rx="12" fill="#fefce8" stroke="#fde047" />
      {coins.map((c, i) => (
        <g key={c.v}>
          <circle cx={60 + i * 110} cy="55" r={c.r} fill={c.fill} stroke={c.stroke} strokeWidth="3" />
          <circle cx={60 + i * 110} cy="55" r={c.r - 6} fill="none" stroke={c.stroke} strokeWidth="1" strokeDasharray="2 2" />
          <text x={60 + i * 110} y="62" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{c.v}</text>
          <text x={60 + i * 110} y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">{c.n}</text>
          <text x={60 + i * 110} y="120" textAnchor="middle" fontSize="10" fill="#713f12">{c.v} Ft</text>
        </g>
      ))}
    </svg>
  );
};

/** Kisvasút kocsikkal, rajtuk osztások (tankönyv 20. o., 12. feladat). */
export const TrainDivisionSvg: React.FC<{ className?: string }> = ({ className }) => {
  const wagons = [
    ['180 : 9', '490 : 70'],
    ['720 : 80'],
    ['280 : 40', '210 : 70'],
    ['150 : 30', '120 : 6']
  ];
  return (
    <svg viewBox="0 0 400 120" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="118" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1="10" y1="96" x2="390" y2="96" stroke="#475569" strokeWidth="3" />
      <rect x="12" y="38" width="50" height="48" rx="4" fill="#ef4444" stroke="#7f1d1d" />
      <rect x="22" y="22" width="22" height="20" fill="#dc2626" stroke="#7f1d1d" />
      <rect x="38" y="46" width="18" height="14" fill="#bfdbfe" />
      {[22, 50].map((x) => (
        <circle key={x} cx={x} cy="90" r="7" fill="#1e293b" />
      ))}
      {wagons.map((w, i) => {
        const x = 70 + i * 80;
        return (
          <g key={i}>
            <rect x={x} y="30" width="74" height="56" rx="5" fill="#15803d" stroke="#14532d" />
            {w.map((t, j) => (
              <text key={t} x={x + 37} y={52 + j * 20} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">{t}</text>
            ))}
            {[x + 14, x + 60].map((cx) => (
              <circle key={cx} cx={cx} cy="90" r="6" fill="#1e293b" />
            ))}
          </g>
        );
      })}
      <text x="200" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
        Add össze a hányadosokat: ennyien utaznak!
      </text>
    </svg>
  );
};
