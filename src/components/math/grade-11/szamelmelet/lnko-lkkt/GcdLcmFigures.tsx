import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: tapétázás – 240 cm és 320 cm széles fal 80 cm-es csíkokkal
export const WallpaperStripsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const scale = 0.62;
  const walls = [
    { x: 30, w: 240, n: 3, label: '240 cm' },
    { x: 30 + 240 * scale + 40, w: 320, n: 4, label: '320 cm' }
  ];
  const colors = ['#a7f3d0', '#6ee7b7'];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Mindkét falra egész számú csík: a csík szélessége közös osztó
      </text>
      {walls.map((wl) => (
        <g key={wl.label}>
          {Array.from({ length: wl.n }, (_, i) => (
            <g key={i}>
              <rect x={wl.x + i * 80 * scale} y="50" width={80 * scale} height="140" fill={colors[i % 2]} stroke="#047857" strokeWidth="1.2" />
              <text x={wl.x + i * 80 * scale + 40 * scale} y="125" fontSize="11" textAnchor="middle" fill="#065f46" fontWeight="bold">80</text>
            </g>
          ))}
          <line x1={wl.x} y1="205" x2={wl.x + wl.w * scale} y2="205" stroke="#334155" strokeWidth="1.2" />
          <line x1={wl.x} y1="199" x2={wl.x} y2="211" stroke="#334155" strokeWidth="1.2" />
          <line x1={wl.x + wl.w * scale} y1="199" x2={wl.x + wl.w * scale} y2="211" stroke="#334155" strokeWidth="1.2" />
          <text x={wl.x + (wl.w * scale) / 2} y="225" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">{wl.label} = {wl.n} · 80</text>
        </g>
      ))}
      <text x="470" y="100" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">(240; 320)</text>
      <text x="470" y="120" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">= 80</text>
    </svg>
  );
};

// 2. ábra: prímtényezős Venn-diagram – 4536 és 528
export const PrimeVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      4536 = 2³ · 3⁴ · 7 és 528 = 2⁴ · 3 · 11
    </text>
    <circle cx="215" cy="150" r="105" fill="#d1fae5" fillOpacity="0.7" stroke="#059669" strokeWidth="2" />
    <circle cx="345" cy="150" r="105" fill="#bae6fd" fillOpacity="0.6" stroke="#0284c7" strokeWidth="2" />
    <text x="150" y="70" fontSize="13" fontWeight="bold" fill="#047857">4536</text>
    <text x="400" y="70" fontSize="13" fontWeight="bold" fill="#0369a1">528</text>
    <text x="165" y="140" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#065f46">3 · 3 · 3</text>
    <text x="165" y="170" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#065f46">7</text>
    <text x="280" y="135" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">2 · 2 · 2</text>
    <text x="280" y="165" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">3</text>
    <text x="395" y="140" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#075985">2</text>
    <text x="395" y="170" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#075985">11</text>
    <text x="280" y="272" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      metszet: (4536; 528) = 2³ · 3 = 24   •   unió: [4536; 528] = 2⁴ · 3⁴ · 7 · 11 = 99 792
    </text>
  </svg>
);

// 3. ábra: 6, 8 és 10 többszörösei számegyenesen – közös többszörösök 120, 240
export const CommonMultiplesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 40;
  const sc = 2;
  const rows = [
    { k: 6, y: 70, c: '#059669' },
    { k: 8, y: 120, c: '#0284c7' },
    { k: 10, y: 170, c: '#9333ea' }
  ];
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">6, 8 és 10 többszörösei 0-tól 240-ig</text>
      {[120, 240].map((m) => (
        <g key={m}>
          <rect x={x0 + m * sc - 8} y="48" width="16" height="140" rx="6" fill="#fde68a" fillOpacity="0.8" />
          <text x={x0 + m * sc} y="210" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#b45309">{m}</text>
        </g>
      ))}
      {rows.map((r) => (
        <g key={r.k}>
          <line x1={x0} y1={r.y} x2={x0 + 240 * sc} y2={r.y} stroke="#94a3b8" />
          <text x={x0 - 12} y={r.y + 4} fontSize="12" textAnchor="end" fontWeight="bold" fill={r.c}>{r.k}</text>
          {Array.from({ length: Math.floor(240 / r.k) }, (_, i) => (i + 1) * r.k).map((m) => (
            <circle key={m} cx={x0 + m * sc} cy={r.y} r="3" fill={r.c} />
          ))}
        </g>
      ))}
      <text x="280" y="238" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A legkisebb közös többszörös: [6; 8; 10] = 120
      </text>
    </svg>
  );
};

// 4. ábra: 84 cm × 126 cm-es téglalap 42 cm-es négyzetekre bontva
export const SquareTilingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 1.6;
  const x0 = 70;
  const y0 = 50;
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">84 cm × 126 cm: a legnagyobb négyzet oldala (84; 126) = 42 cm</text>
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={x0 + (i % 3) * 42 * s} y={y0 + Math.floor(i / 3) * 42 * s} width={42 * s} height={42 * s} fill={i % 2 ? '#a7f3d0' : '#d1fae5'} stroke="#047857" strokeWidth="1.5" />
      ))}
      <text x={x0 + 63 * s} y={y0 + 84 * s + 18} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">126 cm</text>
      <text x={x0 - 10} y={y0 + 42 * s} fontSize="12" textAnchor="end" fontWeight="bold" fill="#0f172a">84 cm</text>
      <text x="460" y="100" fontSize="12" textAnchor="middle" fill="#334155">3 · 2 = 6 négyzet</text>
      <text x="460" y="122" fontSize="12" textAnchor="middle" fill="#334155">(a legkevesebb)</text>
      <text x="460" y="155" fontSize="11" textAnchor="middle" fill="#64748b">oldal lehet: 1, 2, 3, 6,</text>
      <text x="460" y="171" fontSize="11" textAnchor="middle" fill="#64748b">7, 14, 21, 42 cm</text>
    </svg>
  );
};

// 5. ábra: az euklideszi algoritmus téglalapként – 126 × 84
export const EuclidRectangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 1.6;
  const x0 = 60;
  const y0 = 50;
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Euklideszi algoritmus: vágjunk le minél nagyobb négyzeteket!</text>
      <rect x={x0} y={y0} width={84 * s} height={84 * s} fill="#d1fae5" stroke="#047857" strokeWidth="2" />
      <text x={x0 + 42 * s} y={y0 + 42 * s + 5} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#065f46">84</text>
      <rect x={x0 + 84 * s} y={y0} width={42 * s} height={42 * s} fill="#fde68a" stroke="#b45309" strokeWidth="2" />
      <rect x={x0 + 84 * s} y={y0 + 42 * s} width={42 * s} height={42 * s} fill="#fde68a" stroke="#b45309" strokeWidth="2" />
      <text x={x0 + 105 * s} y={y0 + 21 * s + 5} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">42</text>
      <text x={x0 + 105 * s} y={y0 + 63 * s + 5} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#92400e">42</text>
      <text x={x0 + 63 * s} y={y0 + 84 * s + 18} fontSize="12" textAnchor="middle" fill="#0f172a">126</text>
      <text x="420" y="90" fontSize="13" textAnchor="middle" fontFamily="monospace" fill="#0f172a">126 = 1 · 84 + 42</text>
      <text x="420" y="115" fontSize="13" textAnchor="middle" fontFamily="monospace" fill="#0f172a">84 = 2 · 42 + 0</text>
      <text x="420" y="150" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">utolsó nem 0 maradék:</text>
      <text x="420" y="170" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">(126; 84) = 42</text>
    </svg>
  );
};
