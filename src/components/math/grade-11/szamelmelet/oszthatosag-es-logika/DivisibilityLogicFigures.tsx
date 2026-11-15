import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: a kidolgozott feladat Venn-diagramja (40-nél kisebb páros számok)
export const DivisibilityVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const label = (x: number, y: number, t: string, color: string) => (
    <g>
      <rect x={x - 13} y={y - 13} width="26" height="18" rx="4" fill={color} />
      <text x={x} y={y + 1} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#ffffff">{t}</text>
    </g>
  );
  const nums = (items: [number, number, number][], color: string) =>
    items.map(([x, y, n]) => (
      <text key={n} x={x} y={y} fontSize="12" textAnchor="middle" fill={color} fontWeight="600">{n}</text>
    ));
  return (
    <svg viewBox="0 0 560 320" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="310" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        40-nél kisebb pozitív egészek oszthatósága
      </text>
      {/* C: 2-vel osztható */}
      <rect x="30" y="42" width="500" height="262" rx="20" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
      {label(510, 62, 'C', '#059669')}
      {nums([[70, 70, 2], [120, 70, 10], [170, 70, 14], [400, 70, 22], [450, 70, 26], [70, 285, 34], [480, 285, 38]], '#065f46')}
      {/* A: 4-gyel osztható */}
      <circle cx="215" cy="180" r="110" fill="#dbeafe" fillOpacity="0.7" stroke="#2563eb" strokeWidth="2" />
      {label(130, 95, 'A', '#2563eb')}
      {nums([[150, 140, 4], [130, 180, 8], [150, 220, 16], [185, 255, 20], [175, 110, 28], [200, 280, 32]], '#1e3a8a')}
      {/* B: 6-tal osztható */}
      <circle cx="345" cy="180" r="110" fill="#fef3c7" fillOpacity="0.7" stroke="#d97706" strokeWidth="2" />
      {label(430, 95, 'B', '#d97706')}
      {nums([[410, 150, 6], [420, 200, 18], [395, 245, 30]], '#92400e')}
      {/* E: 12-vel osztható = A ∩ B */}
      <ellipse cx="280" cy="180" rx="45" ry="72" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
      {label(280, 122, 'E', '#db2777')}
      {nums([[280, 150, 12], [280, 236, 36]], '#9d174d')}
      {/* D: 24-gyel osztható */}
      <circle cx="280" cy="192" r="20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="280" y="197" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#5b21b6">24</text>
      <text x="309" y="197" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#7c3aed">D</text>
    </svg>
  );
};

// 2. ábra: az „és”, „vagy”, „vagy-vagy” és a tagadás igazságtáblázata
export const LogicOperationsTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows: [boolean, boolean][] = [
    [true, true],
    [true, false],
    [false, true],
    [false, false]
  ];
  const cols: { h: string; f: (a: boolean, b: boolean) => boolean }[] = [
    { h: 'A', f: (a) => a },
    { h: 'B', f: (_a, b) => b },
    { h: 'nem A', f: (a) => !a },
    { h: 'A és B', f: (a, b) => a && b },
    { h: 'A vagy B', f: (a, b) => a || b },
    { h: 'vagy A, vagy B', f: (a, b) => a !== b }
  ];
  const cw = 86;
  const x0 = 22;
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Logikai műveletek I. (zöld = igaz, piros = hamis)
      </text>
      {cols.map((c, j) => (
        <g key={c.h}>
          <rect x={x0 + j * cw} y="42" width={cw - 4} height="32" rx="6" fill="#0f766e" />
          <text x={x0 + j * cw + (cw - 4) / 2} y="63" fontSize="11.5" textAnchor="middle" fontWeight="bold" fill="#ffffff">{c.h}</text>
          {rows.map(([a, b], i) => {
            const v = c.f(a, b);
            return (
              <g key={i}>
                <rect x={x0 + j * cw} y={80 + i * 40} width={cw - 4} height="34" rx="6" fill={v ? '#bbf7d0' : '#fecaca'} stroke={v ? '#16a34a' : '#dc2626'} />
                <text x={x0 + j * cw + (cw - 4) / 2} y={102 + i * 40} fontSize="13" textAnchor="middle" fontWeight="bold" fill={v ? '#166534' : '#991b1b'}>
                  {v ? 'igaz' : 'hamis'}
                </text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
};

// 3. ábra: „minden” és „van olyan” kijelentések tagadása
export const QuantifierNegationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="dl-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#475569" />
      </marker>
    </defs>
    <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Minden / van olyan – tagadáskor helyet cserélnek</text>
    <rect x="25" y="50" width="190" height="70" rx="12" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
    <text x="120" y="78" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#065f46">minden / bármely</text>
    <text x="120" y="100" fontSize="11" textAnchor="middle" fill="#065f46">általános érvényű</text>
    <rect x="345" y="50" width="190" height="70" rx="12" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
    <text x="440" y="78" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#3730a3">létezik / van olyan</text>
    <text x="440" y="100" fontSize="11" textAnchor="middle" fill="#3730a3">előforduló tulajdonság</text>
    <line x1="220" y1="72" x2="338" y2="72" stroke="#475569" strokeWidth="2" markerEnd="url(#dl-arrow)" />
    <line x1="340" y1="100" x2="222" y2="100" stroke="#475569" strokeWidth="2" markerEnd="url(#dl-arrow)" />
    <text x="280" y="64" fontSize="11" textAnchor="middle" fill="#334155">tagadás</text>
    <text x="280" y="116" fontSize="11" textAnchor="middle" fill="#334155">tagadás</text>
    <rect x="25" y="140" width="510" height="45" rx="10" fill="#ffffff" stroke="#cbd5e1" />
    <text x="40" y="160" fontSize="11.5" fill="#065f46">Minden kétjegyű prímszám páratlan. (igaz)</text>
    <text x="40" y="177" fontSize="11.5" fill="#991b1b">Tagadása: Van olyan kétjegyű prímszám, ami nem páratlan. (hamis)</text>
    <rect x="25" y="192" width="510" height="45" rx="10" fill="#ffffff" stroke="#cbd5e1" />
    <text x="40" y="212" fontSize="11.5" fill="#3730a3">Van olyan prímszám, ami páros. (igaz – a 2)</text>
    <text x="40" y="229" fontSize="11.5" fill="#991b1b">Tagadása: Minden prímszám páratlan. (hamis)</text>
  </svg>
);

// 4. ábra: implikáció és megfordítása – 4 többszörösei ⊂ páros számok
export const ImplicationConverseSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Ha 4 | n, akkor n páros – de fordítva nem!</text>
    <ellipse cx="170" cy="150" rx="145" ry="95" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
    <text x="70" y="85" fontSize="12" fontWeight="bold" fill="#065f46">páros számok</text>
    <ellipse cx="195" cy="160" rx="75" ry="52" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    <text x="195" y="135" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">4 többszörösei</text>
    <text x="195" y="162" fontSize="12" textAnchor="middle" fill="#1e3a8a">4   8   12</text>
    <text x="195" y="182" fontSize="12" textAnchor="middle" fill="#1e3a8a">16   20</text>
    <circle cx="70" cy="165" r="15" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
    <text x="70" y="170" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#991b1b">6</text>
    <text x="70" y="200" fontSize="12" textAnchor="middle" fill="#334155">2   10</text>
    <rect x="335" y="55" width="205" height="62" rx="10" fill="#dcfce7" stroke="#16a34a" />
    <text x="345" y="77" fontSize="11.5" fontWeight="bold" fill="#166534">Állítás: ha 4 | n, akkor páros.</text>
    <text x="345" y="97" fontSize="11.5" fill="#166534">IGAZ: a kék halmaz a zöldön belül</text>
    <text x="345" y="110" fontSize="11.5" fill="#166534">van.</text>
    <rect x="335" y="125" width="205" height="62" rx="10" fill="#fee2e2" stroke="#dc2626" />
    <text x="345" y="147" fontSize="11.5" fontWeight="bold" fill="#991b1b">Megfordítás: ha páros, akkor 4 | n.</text>
    <text x="345" y="167" fontSize="11.5" fill="#991b1b">HAMIS: ellenpélda a 6 (páros,</text>
    <text x="345" y="180" fontSize="11.5" fill="#991b1b">de 4-gyel nem osztható).</text>
    <rect x="335" y="195" width="205" height="55" rx="10" fill="#fef3c7" stroke="#d97706" />
    <text x="345" y="217" fontSize="11.5" fontWeight="bold" fill="#92400e">„akkor és csak akkor” csak akkor</text>
    <text x="345" y="235" fontSize="11.5" fill="#92400e">igaz, ha mindkét irány igaz.</text>
  </svg>
);

// 5. ábra: a 3. feladat halmazábrája (20-nál kisebb pozitív egészek)
export const ThreeSetVennSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 330" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="320" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <rect x="25" y="38" width="510" height="275" rx="18" fill="#ffffff" stroke="#64748b" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">20-nál kisebb pozitív egészek</text>
    <circle cx="280" cy="135" r="85" fill="#fce7f3" fillOpacity="0.6" stroke="#db2777" strokeWidth="2" />
    <circle cx="225" cy="220" r="85" fill="#dbeafe" fillOpacity="0.6" stroke="#2563eb" strokeWidth="2" />
    <circle cx="335" cy="220" r="85" fill="#fef3c7" fillOpacity="0.6" stroke="#d97706" strokeWidth="2" />
    <text x="280" y="66" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#9d174d">30 osztói</text>
    <text x="110" y="290" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">3 többszörösei</text>
    <text x="450" y="290" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#92400e">5 többszörösei</text>
    {/* csak 30 osztói */}
    <text x="280" y="100" fontSize="13" textAnchor="middle" fill="#0f172a">1   2</text>
    {/* 30 osztói ∩ 3 többszörösei */}
    <text x="232" y="168" fontSize="13" textAnchor="middle" fill="#0f172a">3   6</text>
    {/* 30 osztói ∩ 5 többszörösei */}
    <text x="328" y="168" fontSize="13" textAnchor="middle" fill="#0f172a">5   10</text>
    {/* mindhárom */}
    <text x="280" y="200" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">15</text>
    {/* csak 3 többszörösei */}
    <text x="195" y="245" fontSize="13" textAnchor="middle" fill="#0f172a">9   12   18</text>
    {/* csak 5 többszörösei: üres */}
    <text x="370" y="250" fontSize="12" textAnchor="middle" fill="#94a3b8">(üres)</text>
    {/* kívül */}
    <text x="45" y="70" fontSize="12" fill="#475569">4  7  8  11</text>
    <text x="440" y="70" fontSize="12" fill="#475569">13  14  16</text>
    <text x="455" y="90" fontSize="12" fill="#475569">17  19</text>
  </svg>
);
