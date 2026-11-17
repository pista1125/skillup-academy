import React from 'react';
import { FONT, HundredFlat, BlockRow, blockRowWidth, Abacus, NumLine500, DigitCardRow } from './Numbers500G3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** Öt százas lap: 100, 200, 300, 400, 500. */
export const FiveHundredsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#fff7ed" stroke="#fdba74" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <HundredFlat x={14 + i * 68} y={18} s={6} />
        <text x={44 + i * 68} y={100} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#9a3412">{(i + 1) * 100}</text>
      </g>
    ))}
    <text x="180" y="126" textAnchor="middle" fontSize="12.5" fill="#7c2d12">egy lap = 100 kocka · öt lap = ötszáz</text>
  </svg>
);

/** 347 = 3 lap + 4 rúd + 7 kocka. */
export const Blocks347Svg: Fig = ({ className = DEF }) => {
  // lapok: 3 × 65, rudak: 4 × 9, kockák külön csoportban
  const x0 = 30;
  const rodX = x0 + 3 * 65 + 18;
  const cubeX = rodX + 4 * 9 + 26;
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <BlockRow x={x0} y={14} sz={3} t={0} e={0} s={6} />
      <BlockRow x={rodX} y={14} sz={0} t={4} e={0} s={6} />
      <BlockRow x={cubeX - 3} y={14} sz={0} t={0} e={7} s={6} />
      <text x={x0 + 95} y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">3 százas</text>
      <text x={rodX + 16} y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">4 tízes</text>
      <text x={cubeX + 8} y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a16207">7 egyes</text>
      <text x="180" y="130" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">300 + 40 + 7 = 347</text>
    </svg>
  );
};

/** Helyiérték-táblázat: 405, 450 és 45 – a 0 is számít. */
export const PlaceValue405Svg: Fig = ({ className = DEF }) => {
  const rows: [string, string, string, string][] = [
    ['4', '0', '5', '= 400 + 0 + 5 = 405'],
    ['4', '5', '0', '= 400 + 50 + 0 = 450'],
    ['', '4', '5', '= 40 + 5 = 45']
  ];
  const heads: [string, string, string][] = [
    ['százas', '#fecaca', '#991b1b'],
    ['tízes', '#bae6fd', '#075985'],
    ['egyes', '#fef08a', '#854d0e']
  ];
  return (
    <svg viewBox="0 0 360 176" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="174" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {heads.map(([t, fill, c], i) => (
        <g key={t}>
          <rect x={16 + i * 56} y="14" width="56" height="28" fill={fill} stroke="#64748b" />
          <text x={44 + i * 56} y="33" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={c}>{t}</text>
        </g>
      ))}
      {rows.map((r, j) => (
        <g key={j}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={16 + i * 56} y={42 + j * 34} width="56" height="34" fill="#fff" stroke="#64748b" />
              <text x={44 + i * 56} y={66 + j * 34} textAnchor="middle" fontSize="20" fontWeight="bold" fill={r[i] === '0' ? '#16a34a' : '#0f172a'}>{r[i]}</text>
            </g>
          ))}
          <text x="190" y={65 + j * 34} fontSize="14" fontWeight="bold" fill="#334155">{r[3]}</text>
        </g>
      ))}
      <text x="180" y="164" textAnchor="middle" fontSize="12" fill="#15803d">A 0 jelzi: azon a helyen nincs semmi.</text>
    </svg>
  );
};

/** Golyós számoló: 2 piros, 6 kék, 3 sárga = 263. */
export const Abacus263Svg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <Abacus x={50} y={14} h={104} sz={2} t={6} e={3} gap={40} r={5.2} />
    <text x="50" y="142" textAnchor="middle" fontSize="11" fill="#991b1b">százas</text>
    <text x="90" y="142" textAnchor="middle" fontSize="11" fill="#0369a1">tízes</text>
    <text x="130" y="142" textAnchor="middle" fontSize="11" fill="#a16207">egyes</text>
    <circle cx="190" cy="30" r="6" fill="#ef4444" stroke="#991b1b" />
    <text x="202" y="35" fontSize="13" fill="#334155">= 100</text>
    <circle cx="190" cy="52" r="6" fill="#38bdf8" stroke="#0369a1" />
    <text x="202" y="57" fontSize="13" fill="#334155">= 10</text>
    <circle cx="190" cy="74" r="6" fill="#facc15" stroke="#a16207" />
    <text x="202" y="79" fontSize="13" fill="#334155">= 1</text>
    <text x="268" y="112" textAnchor="middle" fontSize="14" fill="#334155">200 + 60 + 3</text>
    <text x="268" y="136" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">= 263</text>
  </svg>
);

/** Beváltás: 2 lap + 13 rúd + 6 kocka → 3 lap + 3 rúd + 6 kocka = 336. */
export const ExchangeSvg: Fig = ({ className = DEF }) => {
  const s = 5;
  const topW = blockRowWidth(2, 13, 6, s);
  const tx = (360 - topW) / 2;
  const botW = blockRowWidth(3, 3, 6, s);
  const bx = (360 - botW) / 2;
  const rodStart = tx + 2 * (s * 10 + 5);
  return (
    <svg viewBox="0 0 360 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="228" rx="14" fill="#f0fdf4" stroke="#86efac" />
      <text x="180" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#166534">2 százas + 13 tízes + 6 egyes</text>
      <BlockRow x={tx} y={28} sz={2} t={13} e={6} s={s} />
      <rect x={rodStart - 3} y={24} width={10 * (s + 3) + 3} height={s * 10 + 8} rx="6" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="5 3" />
      <text x={rodStart + 40} y={98} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#16a34a">10 rúd = 1 lap</text>
      <path d="M 180 104 L 180 124" stroke="#16a34a" strokeWidth="3" />
      <path d="M 172 118 L 180 128 L 188 118" fill="none" stroke="#16a34a" strokeWidth="3" />
      <BlockRow x={bx} y={136} sz={3} t={3} e={6} s={s} />
      <text x="180" y="212" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">3 százas + 3 tízes + 6 egyes = 336</text>
    </svg>
  );
};

/** Számegyenes 0-tól 500-ig, néhány szám helyével. */
export const NumberLine500Svg: Fig = ({ className = DEF }) => (
  <NumLine500
    lo={0}
    hi={500}
    tickEvery={10}
    bigEvery={50}
    labels={[0, 100, 200, 300, 400, 500]}
    marks={[
      { v: 150, color: '#7c3aed' },
      { v: 260, color: '#059669' },
      { v: 350, color: '#ea580c' },
      { v: 480, color: '#2563eb' }
    ]}
    W={360}
    H={100}
    className={className}
  />
);

/** Számkártyák: 3, 0, 4 – négy háromjegyű szám, a 0 nem állhat elöl. */
export const DigitCardsSvg: Fig = ({ className = DEF }) => {
  const good = ['304', '340', '403', '430'];
  const bad = ['034', '043'];
  return (
    <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="168" rx="14" fill="#faf5ff" stroke="#d8b4fe" />
      <DigitCardRow x={127} y={12} digits={['3', '0', '4']} s={30} colors={['#fef9c3', '#dcfce7', '#e0f2fe']} />
      {good.map((g, i) => (
        <g key={g}>
          <rect x={22 + i * 82} y="70" width="70" height="34" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.8" />
          <text x={57 + i * 82} y="94" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#14532d">{g}</text>
        </g>
      ))}
      {bad.map((b, i) => (
        <g key={b}>
          <rect x={104 + i * 82} y="116" width="70" height="30" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
          <text x={139 + i * 82} y="137" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#991b1b">{b}</text>
          <line x1={110 + i * 82} y1="142" x2={168 + i * 82} y2="120" stroke="#dc2626" strokeWidth="2.5" />
        </g>
      ))}
      <text x="180" y="162" textAnchor="middle" fontSize="11" fill="#7f1d1d">0-val nem kezdődhet háromjegyű szám</text>
    </svg>
  );
};

/** Kerek tízesek táblája egy részlete (310–400), a 4. sor. */
export const TensBoardSvg: Fig = ({ className = DEF }) => {
  const rows = [
    [210, 220, 230, 240, 250, 260, 270, 280, 290, 300],
    [310, 320, 330, 340, 350, 360, 370, 380, 390, 400],
    [410, 420, 430, 440, 450, 460, 470, 480, 490, 500]
  ];
  const hide = new Set([340, 370, 460]);
  return (
    <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="128" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {rows.map((r, j) =>
        r.map((v, i) => {
          const q = hide.has(v);
          return (
            <g key={v}>
              <rect x={10 + i * 34} y={12 + j * 30} width="34" height="30" fill={q ? '#fee2e2' : v % 50 === 0 ? '#fef3c7' : '#fff'} stroke="#94a3b8" />
              <text x={27 + i * 34} y={32 + j * 30} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={q ? '#dc2626' : '#1e293b'}>{q ? '?' : v}</text>
            </g>
          );
        })
      )}
      <text x="180" y="120" textAnchor="middle" fontSize="11.5" fill="#475569">Jobbra: 10-zel több. Lefelé: 100-zal több.</text>
    </svg>
  );
};
