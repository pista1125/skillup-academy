import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: a 45-tel való oszthatóság = 5-tel ÉS 9-cel (bevezető)
export const CompositeRuleVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">45 = 5 · 9, és (5; 9) = 1</text>
    <circle cx="215" cy="150" r="105" fill="#dbeafe" fillOpacity="0.75" stroke="#2563eb" strokeWidth="2" />
    <circle cx="345" cy="150" r="105" fill="#fef3c7" fillOpacity="0.75" stroke="#d97706" strokeWidth="2" />
    <path d="M 280 67.5 A 105 105 0 0 1 280 232.5 A 105 105 0 0 1 280 67.5 Z" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
    <text x="150" y="82" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">5 | n</text>
    <text x="150" y="100" fontSize="10.5" textAnchor="middle" fill="#1e3a8a">0-ra vagy 5-re végződik</text>
    <text x="410" y="82" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">9 | n</text>
    <text x="410" y="100" fontSize="10.5" textAnchor="middle" fill="#92400e">számjegyösszeg 9 | …</text>
    <text x="280" y="125" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#065f46">45 | n</text>
    <text x="280" y="155" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#065f46">765</text>
    <text x="280" y="175" fontSize="10" textAnchor="middle" fill="#065f46">7 + 6 + 5 = 18</text>
    <text x="175" y="165" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">2900</text>
    <text x="175" y="185" fontSize="10" textAnchor="middle" fill="#1e3a8a">2 + 9 + 0 + 0 = 11</text>
    <text x="395" y="165" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#92400e">1206</text>
    <text x="280" y="266" fontSize="11.5" textAnchor="middle" fill="#334155">a · b | n ⇔ a | n és b | n, ha a és b relatív prímek</text>
  </svg>
);

// 2. ábra: az 1260 = 2² · 3² · 5 · 7 osztóinak táblázata (9 · 4 = 36 osztó)
export const DivisorTable1260Svg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [1, 2, 4, 3, 6, 12, 9, 18, 36];
  const rowLabels = ['1', '2', '2²', '3', '2 · 3', '2² · 3', '3²', '2 · 3²', '2² · 3²'];
  const cols = [1, 5, 7, 35];
  const colLabels = ['· 1', '· 5', '· 7', '· 35'];
  const x0 = 150;
  const y0 = 66;
  const cw = 92;
  const rh = 22;
  return (
    <svg viewBox="0 0 560 290" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="280" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">1260 = 2² · 3² · 5 · 7 → (2 + 1)(2 + 1)(1 + 1)(1 + 1) = 36 osztó</text>
      {colLabels.map((c, j) => (
        <g key={c}>
          <rect x={x0 + j * cw} y={y0 - 22} width={cw - 4} height="20" rx="4" fill="#059669" />
          <text x={x0 + j * cw + (cw - 4) / 2} y={y0 - 8} fontSize="11" textAnchor="middle" fontWeight="bold" fill="#ffffff">{c}</text>
        </g>
      ))}
      {rows.map((r, i) => (
        <g key={r}>
          <text x={x0 - 12} y={y0 + i * rh + 15} fontSize="11" textAnchor="end" fill="#334155" fontWeight="600">{rowLabels[i]}</text>
          {cols.map((c, j) => (
            <g key={c}>
              <rect x={x0 + j * cw} y={y0 + i * rh} width={cw - 4} height={rh - 3} rx="4" fill={i % 2 ? '#ecfdf5' : '#ffffff'} stroke="#a7f3d0" />
              <text x={x0 + j * cw + (cw - 4) / 2} y={y0 + i * rh + 14} fontSize="11.5" textAnchor="middle" fill="#065f46">{r * c}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
};

// 3. ábra: a választások idővonala (4., 5. feladat)
export const ElectionTimelineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const start = 2014;
  const end = 2042;
  const x = (y: number) => 30 + ((y - start) / (end - start)) * 500;
  const years = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  const parl = years.filter((y) => (y - 1990) % 4 === 0);
  const pres = years.filter((y) => (y - 2017) % 5 === 0);
  const ep = years.filter((y) => (y - 2004) % 5 === 0);
  const row = (list: number[], yy: number, color: string, label: string) => (
    <g>
      <text x="30" y={yy - 14} fontSize="11" fontWeight="bold" fill={color}>{label}</text>
      <line x1="30" y1={yy} x2="530" y2={yy} stroke="#cbd5e1" />
      {list.map((y) => (
        <circle key={y} cx={x(y)} cy={yy} r="6" fill={color} />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Választási évek 2014 és 2042 között</text>
      {[2022, 2034, 2042].map((y) => (
        <rect key={y} x={x(y) - 9} y="40" width="18" height="168" rx="6" fill="#fde68a" fillOpacity="0.6" />
      ))}
      {row(parl, 70, '#059669', 'országgyűlés: 4 évente (1990, 1994, …)')}
      {row(pres, 120, '#2563eb', 'köztársasági elnök: 5 évente (2017, 2022, …)')}
      {row(ep, 170, '#9333ea', 'Európai Parlament: 5 évente (2004, 2009, …)')}
      {years
        .filter((y) => y % 2 === 0)
        .map((y) => (
          <text key={y} x={x(y)} y="228" fontSize="9.5" textAnchor="middle" fill={[2022, 2034, 2042].includes(y) ? '#92400e' : '#64748b'} fontWeight={[2022, 2034, 2042].includes(y) ? 'bold' : 'normal'}>
            {y}
          </text>
        ))}
      <text x="280" y="252" fontSize="11" textAnchor="middle" fill="#334155">[4; 5] = 20: a közös évek 20 évente ismétlődnek. Elnök és EP sosem esik egybe.</text>
    </svg>
  );
};

// 4. ábra: két buszjárat indulásai 6.00 és 7.30 között (8 és 5 perc)
export const BusScheduleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x = (t: number) => 40 + (t / 90) * 480;
  const b1 = Array.from({ length: 12 }, (_, i) => i * 8);
  const b2 = Array.from({ length: 19 }, (_, i) => i * 5);
  return (
    <svg viewBox="0 0 560 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Közös indulás: [8; 5] = 40 percenként</text>
      {[0, 40, 80].map((t) => (
        <rect key={t} x={x(t) - 8} y="40" width="16" height="120" rx="6" fill="#bbf7d0" />
      ))}
      <text x="40" y="58" fontSize="11" fontWeight="bold" fill="#2563eb">1. járat: 8 percenként</text>
      <line x1="40" y1="75" x2="520" y2="75" stroke="#cbd5e1" />
      {b1.map((t) => (
        <rect key={t} x={x(t) - 5} y="69" width="10" height="12" rx="2" fill="#2563eb" />
      ))}
      <text x="40" y="113" fontSize="11" fontWeight="bold" fill="#d97706">2. járat: 5 percenként</text>
      <line x1="40" y1="130" x2="520" y2="130" stroke="#cbd5e1" />
      {b2.map((t) => (
        <circle key={t} cx={x(t)} cy="130" r="5" fill="#d97706" />
      ))}
      <line x1="40" y1="170" x2="520" y2="170" stroke="#475569" strokeWidth="1.5" />
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((t) => (
        <g key={t}>
          <line x1={x(t)} y1="166" x2={x(t)} y2="174" stroke="#475569" />
          <text x={x(t)} y="190" fontSize="10" textAnchor="middle" fill={t % 40 === 0 ? '#065f46' : '#64748b'} fontWeight={t % 40 === 0 ? 'bold' : 'normal'}>
            {`${6 + Math.floor(t / 60)}.${String(t % 60).padStart(2, '0')}`}
          </text>
        </g>
      ))}
      <text x="280" y="208" fontSize="10.5" textAnchor="middle" fill="#334155">6.00 és 8.00 között: 6.00, 6.40, 7.20, 8.00</text>
    </svg>
  );
};

// 5. ábra: bonbonos doboz és a legkisebb kocka alakú karton (HF 4.)
export const BonbonBoxSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // egyszerű ferde (kabinet) axonometria
  const box = (ox: number, oy: number, w: number, h: number, d: number, fill: string, stroke: string) => {
    const dx = d * 0.5;
    const dy = d * 0.35;
    return (
      <g stroke={stroke} strokeWidth="1.5">
        <polygon points={`${ox},${oy} ${ox + w},${oy} ${ox + w},${oy - h} ${ox},${oy - h}`} fill={fill} />
        <polygon points={`${ox},${oy - h} ${ox + w},${oy - h} ${ox + w + dx},${oy - h - dy} ${ox + dx},${oy - h - dy}`} fill={fill} fillOpacity="0.7" />
        <polygon points={`${ox + w},${oy} ${ox + w + dx},${oy - dy} ${ox + w + dx},${oy - h - dy} ${ox + w},${oy - h}`} fill={fill} fillOpacity="0.5" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Bonbonos dobozok kartonba csomagolása</text>
      {box(50, 200, 100, 20, 80, '#fbcfe8', '#be185d')}
      <text x="100" y="222" fontSize="11" textAnchor="middle" fill="#9d174d">20 cm</text>
      <text x="40" y="195" fontSize="11" textAnchor="end" fill="#9d174d">4</text>
      <text x="178" y="170" fontSize="11" fill="#9d174d">16 cm</text>
      <text x="110" y="250" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">4 × 16 × 20 cm</text>
      {box(300, 240, 130, 130, 130, '#d1fae5', '#047857')}
      <text x="365" y="258" fontSize="11" textAnchor="middle" fill="#065f46">80 cm</text>
      <text x="292" y="180" fontSize="11" textAnchor="end" fill="#065f46">80 cm</text>
      <text x="472" y="232" fontSize="11" fill="#065f46">80 cm</text>
      <text x="365" y="168" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#065f46">[4; 16; 20] = 80</text>
      <text x="365" y="188" fontSize="11" textAnchor="middle" fill="#065f46">80³ : (4 · 16 · 20) = 400</text>
    </svg>
  );
};
