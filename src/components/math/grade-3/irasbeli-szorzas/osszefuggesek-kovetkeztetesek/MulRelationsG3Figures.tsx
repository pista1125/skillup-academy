import React from 'react';

type FigProps = { className?: string };

const FONT = 'system-ui, Segoe UI, sans-serif';
const CLS = 'w-full max-w-xl h-auto mx-auto';

const Arrow: React.FC<{ d: string; color: string }> = ({ d, color }) => (
  <path d={d} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" markerEnd={`url(#mr-head-${color.slice(1)})`} />
);

const Head: React.FC<{ color: string }> = ({ color }) => (
  <marker id={`mr-head-${color.slice(1)}`} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
    <path d="M0,0 L10,5 L0,10 z" fill={color} />
  </marker>
);

/** Szorzótáblázat: a sorok tényezője mindig 2-szeres lesz → a szorzat is 2-szeres. */
export const MulRelTableSvg: React.FC<FigProps> = ({ className }) => {
  const cols = [3, 4, 5];
  const rows = [20, 40, 80];
  const cw = 92;
  const rh = 40;
  const x0 = 130;
  const y0 = 30;
  return (
    <svg viewBox="0 0 520 220" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <defs>
        <Head color="#ea580c" />
      </defs>
      <rect x="1" y="1" width="518" height="218" rx="16" fill="#fffbeb" stroke="#fcd34d" />
      {/* fejléc */}
      <rect x={x0} y={y0} width={cw} height={rh} fill="#16a34a" stroke="#fff" strokeWidth="2" />
      <text x={x0 + cw / 2} y={y0 + 27} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#fff">·</text>
      {cols.map((c, j) => (
        <g key={c}>
          <rect x={x0 + cw * (j + 1)} y={y0} width={cw} height={rh} fill="#16a34a" stroke="#fff" strokeWidth="2" />
          <text x={x0 + cw * (j + 1) + cw / 2} y={y0 + 27} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#fff">{c}</text>
        </g>
      ))}
      {rows.map((r, i) => (
        <g key={r}>
          <rect x={x0} y={y0 + rh * (i + 1)} width={cw} height={rh} fill="#4ade80" stroke="#fff" strokeWidth="2" />
          <text x={x0 + cw / 2} y={y0 + rh * (i + 1) + 27} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#14532d">{r}</text>
          {cols.map((c, j) => (
            <g key={c}>
              <rect x={x0 + cw * (j + 1)} y={y0 + rh * (i + 1)} width={cw} height={rh} fill="#dcfce7" stroke="#fff" strokeWidth="2" />
              <text x={x0 + cw * (j + 1) + cw / 2} y={y0 + rh * (i + 1) + 27} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{r * c}</text>
            </g>
          ))}
        </g>
      ))}
      {/* nyilak bal oldalt és jobb oldalt */}
      <Arrow d={`M ${x0 - 8} ${y0 + rh * 1.5} C ${x0 - 40} ${y0 + rh * 1.6}, ${x0 - 40} ${y0 + rh * 2.4}, ${x0 - 10} ${y0 + rh * 2.5}`} color="#ea580c" />
      <Arrow d={`M ${x0 - 8} ${y0 + rh * 2.5} C ${x0 - 40} ${y0 + rh * 2.6}, ${x0 - 40} ${y0 + rh * 3.4}, ${x0 - 10} ${y0 + rh * 3.5}`} color="#ea580c" />
      <text x={x0 - 48} y={y0 + rh * 2 + 6} textAnchor="end" fontSize="18" fontWeight="bold" fill="#c2410c">· 2</text>
      <text x={x0 - 48} y={y0 + rh * 3 + 6} textAnchor="end" fontSize="18" fontWeight="bold" fill="#c2410c">· 2</text>
      <Arrow d={`M ${x0 + cw * 4 + 8} ${y0 + rh * 1.5} C ${x0 + cw * 4 + 40} ${y0 + rh * 1.6}, ${x0 + cw * 4 + 40} ${y0 + rh * 2.4}, ${x0 + cw * 4 + 10} ${y0 + rh * 2.5}`} color="#ea580c" />
      <Arrow d={`M ${x0 + cw * 4 + 8} ${y0 + rh * 2.5} C ${x0 + cw * 4 + 40} ${y0 + rh * 2.6}, ${x0 + cw * 4 + 40} ${y0 + rh * 3.4}, ${x0 + cw * 4 + 10} ${y0 + rh * 3.5}`} color="#ea580c" />
      <text x={x0 + cw * 4 + 40} y={y0 + rh * 2 + 6} fontSize="18" fontWeight="bold" fill="#c2410c">· 2</text>
      <text x={x0 + cw * 4 + 40} y={y0 + rh * 3 + 6} fontSize="18" fontWeight="bold" fill="#c2410c">· 2</text>
      <text x="260" y="208" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">Az egyik tényező 2-szeres lett → a szorzat is 2-szeres lett.</text>
    </svg>
  );
};

/** Pöttysorok: 3 sor × 4 pötty, majd 6 sor × 4 pötty – kétszer annyi sor, kétszer annyi pötty. */
export const MulRelDotsSvg: React.FC<FigProps> = ({ className }) => {
  const grid = (x: number, y: number, rows: number, cols: number, color: string) =>
    Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => <circle key={`${r}-${c}`} cx={x + c * 26} cy={y + r * 24} r="9" fill={color} stroke="#1e293b" strokeWidth="1.5" />)
    );
  return (
    <svg viewBox="0 0 520 230" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <defs>
        <Head color="#ea580c" />
      </defs>
      <rect x="1" y="1" width="518" height="228" rx="16" fill="#f0f9ff" stroke="#bae6fd" />
      <rect x="40" y="40" width="130" height="90" rx="12" fill="#fff" stroke="#38bdf8" strokeWidth="2" />
      {grid(66, 62, 3, 4, '#38bdf8')}
      <text x="105" y="160" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">3 · 4 = 12</text>
      <Arrow d="M 185 90 L 290 90" color="#ea580c" />
      <text x="237" y="78" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#c2410c">2-szer annyi sor</text>
      <rect x="320" y="20" width="130" height="162" rx="12" fill="#fff" stroke="#f472b6" strokeWidth="2" />
      {grid(346, 40, 6, 4, '#f472b6')}
      <text x="385" y="208" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">6 · 4 = 24</text>
      <text x="237" y="130" textAnchor="middle" fontSize="16" fill="#334155">12 · 2 = 24</text>
    </svg>
  );
};

/** 10-szeres tényező: 3 · 4 egyeskockával, 3 · 40 tízesrúddal. */
export const MulRelTimesTenSvg: React.FC<FigProps> = ({ className }) => {
  const cube = (x: number, y: number, k: string) => <rect key={k} x={x} y={y} width="14" height="14" fill="#facc15" stroke="#854d0e" strokeWidth="1.5" />;
  const rod = (x: number, y: number, k: string) => (
    <g key={k}>
      <rect x={x} y={y} width="14" height="100" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.5" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={x} y1={y + 10 * (i + 1)} x2={x + 14} y2={y + 10 * (i + 1)} stroke="#1e3a8a" strokeWidth="0.8" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 520 230" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <defs>
        <Head color="#ea580c" />
      </defs>
      <rect x="1" y="1" width="518" height="228" rx="16" fill="#fefce8" stroke="#fde68a" />
      {[0, 1, 2].map((g) => (
        <g key={g}>
          <rect x={30 + g * 52} y="78" width="44" height="44" rx="8" fill="#fff" stroke="#ca8a04" strokeWidth="1.5" />
          {[0, 1, 2, 3].map((i) => cube(34 + g * 52 + (i % 2) * 20, 82 + Math.floor(i / 2) * 20, `${g}-${i}`))}
        </g>
      ))}
      <text x="100" y="165" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">3 · 4 = 12</text>
      <Arrow d="M 195 100 L 265 100" color="#ea580c" />
      <text x="230" y="88" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#c2410c">kocka helyett rúd</text>
      {[0, 1, 2].map((g) => (
        <g key={g}>
          <rect x={282 + g * 76} y="30" width="70" height="112" rx="8" fill="#fff" stroke="#2563eb" strokeWidth="1.5" />
          {[0, 1, 2, 3].map((i) => rod(288 + g * 76 + i * 16, 36, `${g}-${i}`))}
        </g>
      ))}
      <text x="392" y="175" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">3 · 40 = 120</text>
      <text x="260" y="212" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">A 4 helyett 40 (10-szer annyi) → a szorzat is 10-szer annyi.</text>
    </svg>
  );
};

/** Egyik tényező 2-szeres, a másikat 2-vel elosztjuk: 4 · 6 = 8 · 3 – a pöttyök száma ugyanannyi. */
export const MulRelSameSvg: React.FC<FigProps> = ({ className }) => {
  const grid = (x: number, y: number, rows: number, cols: number, color: string) =>
    Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => <circle key={`${r}-${c}`} cx={x + c * 22} cy={y + r * 20} r="7.5" fill={color} stroke="#1e293b" strokeWidth="1.2" />)
    );
  return (
    <svg viewBox="0 0 520 240" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <defs>
        <Head color="#7c3aed" />
      </defs>
      <rect x="1" y="1" width="518" height="238" rx="16" fill="#faf5ff" stroke="#e9d5ff" />
      <rect x="30" y="50" width="160" height="104" rx="12" fill="#fff" stroke="#a855f7" strokeWidth="2" />
      {grid(55, 72, 4, 6, '#c084fc')}
      <text x="110" y="185" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">4 · 6 = 24</text>
      <Arrow d="M 205 95 L 290 95" color="#7c3aed" />
      <text x="248" y="70" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#6d28d9">4 · 2 = 8 sor</text>
      <text x="248" y="125" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#6d28d9">6 : 2 = 3 oszlop</text>
      <rect x="320" y="20" width="110" height="178" rx="12" fill="#fff" stroke="#a855f7" strokeWidth="2" />
      {grid(353, 38, 8, 3, '#c084fc')}
      <text x="375" y="225" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">8 · 3 = 24</text>
      <text x="248" y="165" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#16a34a">ugyanannyi pötty</text>
    </svg>
  );
};

/** Következtetés: 2 füzet 180 Ft → 6 füzet ? Ft (mindkét oldalon · 3). */
export const MulRelPriceSvg: React.FC<FigProps> = ({ className }) => {
  const book = (x: number, y: number, k: number) => (
    <g key={k}>
      <rect x={x} y={y} width="26" height="34" rx="3" fill="#38bdf8" stroke="#0c4a6e" strokeWidth="2" />
      <line x1={x + 6} y1={y} x2={x + 6} y2={y + 34} stroke="#0c4a6e" strokeWidth="1.5" />
    </g>
  );
  return (
    <svg viewBox="0 0 520 240" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <defs>
        <Head color="#ea580c" />
      </defs>
      <rect x="1" y="1" width="518" height="238" rx="16" fill="#fff7ed" stroke="#fed7aa" />
      {/* felső sor */}
      {[0, 1].map((i) => book(120 + i * 32, 26, i))}
      <text x="250" y="52" fontSize="22" fontWeight="bold" fill="#0f172a">2 db</text>
      <line x1="310" y1="45" x2="350" y2="45" stroke="#334155" strokeWidth="2.5" />
      <polygon points="352,45 344,40 344,50" fill="#334155" />
      <rect x="362" y="24" width="104" height="36" rx="8" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
      <text x="414" y="50" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">180 Ft</text>
      {/* alsó sor */}
      {[0, 1, 2, 3, 4, 5].map((i) => book(30 + i * 32, 160, i))}
      <text x="250" y="186" fontSize="22" fontWeight="bold" fill="#0f172a">6 db</text>
      <line x1="310" y1="179" x2="350" y2="179" stroke="#334155" strokeWidth="2.5" />
      <polygon points="352,179 344,174 344,184" fill="#334155" />
      <rect x="362" y="158" width="104" height="36" rx="8" fill="#fff" stroke="#b45309" strokeWidth="2" strokeDasharray="5 4" />
      <text x="414" y="184" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#dc2626">? Ft</text>
      {/* nyilak */}
      <Arrow d="M 248 66 C 215 95, 215 125, 248 152" color="#ea580c" />
      <text x="204" y="116" textAnchor="end" fontSize="20" fontWeight="bold" fill="#c2410c">· 3</text>
      <Arrow d="M 480 66 C 510 95, 510 125, 480 152" color="#ea580c" />
      <text x="470" y="116" textAnchor="end" fontSize="20" fontWeight="bold" fill="#c2410c">· 3</text>
      <text x="340" y="225" textAnchor="middle" fontSize="14" fill="#7c2d12">3-szor annyi füzet → 3-szor annyi pénz</text>
    </svg>
  );
};
