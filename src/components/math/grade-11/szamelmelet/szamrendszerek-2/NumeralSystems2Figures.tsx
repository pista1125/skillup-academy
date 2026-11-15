import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** Kis segéd: szám + alsó indexben az alapszám (SVG-ben tspan-nal). */
const Based: React.FC<{ x: number; y: number; value: string; base: string; size?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; bold?: boolean }> = ({
  x,
  y,
  value,
  base,
  size = 14,
  fill = '#0f172a',
  anchor = 'middle',
  bold = true
}) => (
  <text x={x} y={y} fontSize={size} textAnchor={anchor} fontWeight={bold ? 'bold' : 'normal'} fill={fill}>
    {value}
    <tspan fontSize={size * 0.62} dy={size * 0.3}>{base}</tspan>
  </text>
);

// 1. ábra: 315 tojás hatosával csomagolva – raklap, doboz, tojástartó, tojás
export const EggPackingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cols = [
    { x: 20, title: 'raklap', place: '216-os', digit: '1', color: '#047857' },
    { x: 150, title: 'doboz', place: '36-os', digit: '2', color: '#0d9488' },
    { x: 280, title: 'tojástartó', place: '6-os', digit: '4', color: '#0284c7' },
    { x: 410, title: 'tojás', place: '1-es', digit: '3', color: '#d97706' }
  ];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        315 tojás hatosával csomagolva
      </text>
      {cols.map((c) => (
        <g key={c.title}>
          <rect x={c.x} y="44" width="120" height="170" rx="12" fill="#ffffff" stroke={c.color} strokeWidth="2" />
          <text x={c.x + 60} y="64" fontSize="12" textAnchor="middle" fontWeight="bold" fill={c.color}>{c.title}</text>
          <text x={c.x + 60} y="80" fontSize="10.5" textAnchor="middle" fill="#475569">{c.place} helyi érték</text>
          {c.title === 'raklap' && (
            <g>
              <rect x={c.x + 25} y="120" width="70" height="44" rx="3" fill="#a7f3d0" stroke={c.color} />
              {[0, 1, 2].map((i) => (
                <line key={i} x1={c.x + 25} y1={131 + i * 11} x2={c.x + 95} y2={131 + i * 11} stroke={c.color} strokeWidth="0.8" />
              ))}
              <rect x={c.x + 20} y="164" width="80" height="8" fill="#92400e" />
            </g>
          )}
          {c.title === 'doboz' &&
            [0, 1].map((i) => (
              <g key={i}>
                <rect x={c.x + 18 + i * 46} y="128" width="38" height="38" rx="3" fill="#ccfbf1" stroke={c.color} />
                <line x1={c.x + 18 + i * 46} y1="140" x2={c.x + 56 + i * 46} y2="140" stroke={c.color} strokeWidth="0.8" />
              </g>
            ))}
          {c.title === 'tojástartó' &&
            [0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={c.x + 14 + (i % 2) * 48} y={112 + Math.floor(i / 2) * 34} width="44" height="24" rx="4" fill="#e0f2fe" stroke={c.color} />
                {[0, 1, 2].map((j) => (
                  <circle key={j} cx={c.x + 23 + (i % 2) * 48 + j * 13} cy={124 + Math.floor(i / 2) * 34} r="4" fill="#ffffff" stroke={c.color} strokeWidth="0.8" />
                ))}
              </g>
            ))}
          {c.title === 'tojás' &&
            [0, 1, 2].map((i) => (
              <ellipse key={i} cx={c.x + 30 + i * 30} cy="145" rx="10" ry="13" fill="#fffbeb" stroke={c.color} strokeWidth="1.5" />
            ))}
          <text x={c.x + 60} y="200" fontSize="26" textAnchor="middle" fontWeight="bold" fill={c.color}>{c.digit}</text>
        </g>
      ))}
      <text x="280" y="244" fontSize="13" textAnchor="middle" fill="#334155">
        315 = 1 · 216 + 2 · 36 + 4 · 6 + 3 = 1 · 6³ + 2 · 6² + 4 · 6 + 3
      </text>
      <text x="230" y="276" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#047857">315 =</text>
      <Based x={300} y={276} value="1243" base="6" size={18} fill="#047857" />
    </svg>
  );
};

// 2. ábra: maradékos osztások lánca (első módszer)
export const DivisionChainSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { a: '315', q: '52', r: '3' },
    { a: '52', q: '8', r: '4' },
    { a: '8', q: '1', r: '2' },
    { a: '1', q: '0', r: '1' }
  ];
  return (
    <svg viewBox="0 0 420 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="410" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="210" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Ismételt osztás 6-tal</text>
      <text x="90" y="56" fontSize="11" textAnchor="middle" fill="#64748b">osztandó</text>
      <text x="200" y="56" fontSize="11" textAnchor="middle" fill="#64748b">hányados</text>
      <text x="300" y="56" fontSize="11" textAnchor="middle" fill="#64748b">maradék</text>
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="30" y={66 + i * 38} width="300" height="30" rx="8" fill={i % 2 ? '#ffffff' : '#ecfdf5'} stroke="#a7f3d0" />
          <text x="90" y={86 + i * 38} fontSize="14" textAnchor="middle" fill="#0f172a">{r.a} : 6</text>
          <text x="145" y={86 + i * 38} fontSize="14" textAnchor="middle" fill="#64748b">=</text>
          <text x="200" y={86 + i * 38} fontSize="14" textAnchor="middle" fill="#0f172a">{r.q}</text>
          <circle cx="300" cy={81 + i * 38} r="13" fill="#047857" />
          <text x="300" y={86 + i * 38} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#ffffff">{r.r}</text>
        </g>
      ))}
      <line x1="355" y1="194" x2="355" y2="80" stroke="#d97706" strokeWidth="3" markerEnd="url(#ns2-arrow)" />
      <defs>
        <marker id="ns2-arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#d97706" />
        </marker>
      </defs>
      <text x="380" y="140" fontSize="11" textAnchor="middle" fill="#b45309" transform="rotate(-90 380 140)">alulról felfelé olvasd</text>
      <text x="160" y="240" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#047857">315 =</text>
      <Based x={225} y={240} value="1243" base="6" size={17} fill="#047857" />
    </svg>
  );
};

// 3. ábra: kettes → négyes átváltás kettes csoportokkal
export const BinaryToQuaternarySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const groups = ['1', '10', '00', '01', '11'];
  const digits = ['1', '2', '0', '1', '3'];
  return (
    <svg viewBox="0 0 480 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="470" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="240" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Kettesével csoportosítunk – jobbról kezdve!
      </text>
      <text x="40" y="82" fontSize="12" fontWeight="bold" fill="#475569">kettes</text>
      <text x="40" y="150" fontSize="12" fontWeight="bold" fill="#475569">négyes</text>
      {groups.map((g, i) => (
        <g key={i}>
          <rect x={110 + i * 70} y="58" width="60" height="36" rx="8" fill={i % 2 ? '#e0f2fe' : '#d1fae5'} stroke="#64748b" />
          <text x={140 + i * 70} y="82" fontSize="17" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="#0f172a">{g}</text>
          <line x1={140 + i * 70} y1="96" x2={140 + i * 70} y2="124" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx={140 + i * 70} cy="145" r="17" fill="#047857" />
          <text x={140 + i * 70} y="151" fontSize="17" textAnchor="middle" fontWeight="bold" fill="#ffffff">{digits[i]}</text>
        </g>
      ))}
      <Based x={160} y={198} value="110000111" base="2" size={15} />
      <text x={262} y={198} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">=</text>
      <Based x={330} y={198} value="12013" base="4" size={15} fill="#047857" />
    </svg>
  );
};

// 4. ábra: kettes → nyolcas (hármas csoportok) és tizenhatos (négyes csoportok)
export const BinOctHexSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const bits = '1110111100010101'.split('');
  const cell = 26;
  const x0 = 70;
  const octGroups = [
    { from: 0, len: 1, d: '1' },
    { from: 1, len: 3, d: '6' },
    { from: 4, len: 3, d: '7' },
    { from: 7, len: 3, d: '4' },
    { from: 10, len: 3, d: '2' },
    { from: 13, len: 3, d: '5' }
  ];
  const hexGroups = [
    { from: 0, len: 4, d: 'E' },
    { from: 4, len: 4, d: 'F' },
    { from: 8, len: 4, d: '1' },
    { from: 12, len: 4, d: '5' }
  ];
  const Row: React.FC<{ y: number }> = ({ y }) => (
    <g>
      {bits.map((b, i) => (
        <g key={i}>
          <rect x={x0 + i * cell} y={y} width={cell - 2} height="26" rx="4" fill={b === '1' ? '#d1fae5' : '#ffffff'} stroke="#94a3b8" />
          <text x={x0 + i * cell + 12} y={y + 18} fontSize="14" textAnchor="middle" fontFamily="monospace" fill="#0f172a">{b}</text>
        </g>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 520 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="510" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="260" y="28" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        8-as: hármas csoportok · 16-os: négyes csoportok (jobbról)
      </text>
      <text x="20" y="62" fontSize="11" fontWeight="bold" fill="#475569">2-es</text>
      <Row y={44} />
      {octGroups.map((g, i) => (
        <g key={i}>
          <path
            d={`M ${x0 + g.from * cell + 2} 76 v 6 H ${x0 + (g.from + g.len) * cell - 4} v -6`}
            fill="none"
            stroke="#d97706"
            strokeWidth="1.8"
          />
          <text x={x0 + (g.from + g.len / 2) * cell - 1} y="102" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#b45309">{g.d}</text>
        </g>
      ))}
      <text x="20" y="104" fontSize="11" fontWeight="bold" fill="#b45309">8-as</text>
      <text x="20" y="172" fontSize="11" fontWeight="bold" fill="#475569">2-es</text>
      <Row y={154} />
      {hexGroups.map((g, i) => (
        <g key={i}>
          <path
            d={`M ${x0 + g.from * cell + 2} 186 v 6 H ${x0 + (g.from + g.len) * cell - 4} v -6`}
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1.8"
          />
          <text x={x0 + (g.from + g.len / 2) * cell - 1} y="212" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#6d28d9">{g.d}</text>
        </g>
      ))}
      <text x="20" y="214" fontSize="11" fontWeight="bold" fill="#6d28d9">16-os</text>
      <Based x={110} y={262} value="1110111100010101" base="2" size={14} anchor="middle" />
      <text x="215" y="262" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">=</text>
      <Based x={270} y={262} value="167425" base="8" size={14} fill="#b45309" />
      <text x="325" y="262" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">=</text>
      <Based x={370} y={262} value="EF15" base="16" size={14} fill="#6d28d9" />
      <text x="260" y="284" fontSize="10.5" textAnchor="middle" fill="#64748b">E = 14, F = 15</text>
    </svg>
  );
};

// 5. ábra: írásbeli összeadás kettes számrendszerben átvitelekkel
export const BinaryAdditionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const a = ' 1101100';
  const b = '  101010';
  const s = '10010110';
  const carry = ['1', '1', '', '1', '', '', '', ''];
  const cell = 30;
  const x0 = 120;
  return (
    <svg viewBox="0 0 460 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="450" height="230" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="230" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">Összeadás kettes számrendszerben</text>
      {carry.map((c, i) =>
        c ? (
          <text key={i} x={x0 + i * cell + 15} y="56" fontSize="11" textAnchor="middle" fill="#dc2626" fontWeight="bold">+{c}</text>
        ) : null
      )}
      {a.split('').map((d, i) => (
        <text key={`a${i}`} x={x0 + i * cell + 15} y="84" fontSize="20" textAnchor="middle" fontFamily="monospace" fill="#0f172a">{d.trim()}</text>
      ))}
      <text x={x0 - 10} y="114" fontSize="20" textAnchor="middle" fill="#0f172a">+</text>
      {b.split('').map((d, i) => (
        <text key={`b${i}`} x={x0 + i * cell + 15} y="114" fontSize="20" textAnchor="middle" fontFamily="monospace" fill="#0f172a">{d.trim()}</text>
      ))}
      <line x1={x0 - 20} y1="126" x2={x0 + 8 * cell} y2="126" stroke="#0f172a" strokeWidth="2" />
      {s.split('').map((d, i) => (
        <text key={`s${i}`} x={x0 + i * cell + 15} y="154" fontSize="20" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fill="#047857">{d}</text>
      ))}
      <text x="395" y="84" fontSize="12" fill="#475569">= 108</text>
      <text x="395" y="114" fontSize="12" fill="#475569">= 42</text>
      <text x="395" y="154" fontSize="12" fontWeight="bold" fill="#047857">= 150</text>
      <text x="230" y="190" fontSize="12" textAnchor="middle" fill="#334155">0 + 0 = 0 · 0 + 1 = 1 · 1 + 1 = 10 (leírunk 0-t, átviszünk 1-et)</text>
      <text x="230" y="214" fontSize="12" textAnchor="middle" fill="#334155">1 + 1 + 1 = 11 (leírunk 1-et, átviszünk 1-et)</text>
    </svg>
  );
};

// 6. ábra: Peti 5 számkártyája (a 31-nél nem nagyobb számok bitjei)
export const NumberCardsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cards = [
    { l: 'A', bit: 1, color: '#047857' },
    { l: 'B', bit: 2, color: '#0284c7' },
    { l: 'C', bit: 4, color: '#7c3aed' },
    { l: 'E', bit: 8, color: '#d97706' },
    { l: 'D', bit: 16, color: '#db2777' }
  ];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Peti kártyái: minden kártya egy kettes helyi értéknek felel meg
      </text>
      {cards.map((c, i) => {
        const nums = Array.from({ length: 31 }, (_, k) => k + 1).filter((n) => (n & c.bit) !== 0);
        return (
          <g key={c.l}>
            <rect x={18 + i * 108} y="42" width="96" height="150" rx="10" fill="#ffffff" stroke={c.color} strokeWidth="2" />
            <text x={66 + i * 108} y="62" fontSize="14" textAnchor="middle" fontWeight="bold" fill={c.color}>{c.l}</text>
            {nums.map((n, k) => (
              <text key={n} x={32 + i * 108 + (k % 4) * 22} y={84 + Math.floor(k / 4) * 24} fontSize="11" textAnchor="middle" fill="#334155">{n}</text>
            ))}
            <text x={66 + i * 108} y="214" fontSize="13" textAnchor="middle" fontWeight="bold" fill={c.color}>{c.bit}</text>
          </g>
        );
      })}
      <text x="280" y="238" fontSize="11.5" textAnchor="middle" fill="#334155">
        Pl. a szám az A, C és E kártyán van: 1 + 4 + 8 = 13 (= 1101 kettes számrendszerben)
      </text>
    </svg>
  );
};
