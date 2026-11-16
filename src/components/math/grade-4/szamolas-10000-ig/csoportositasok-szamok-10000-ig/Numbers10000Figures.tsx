import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** A tankönyv színei: ezres zöld, százas piros, tízes kék, egyes sárga. */
export const PV_COLORS = {
  T: { fill: '#f5d0fe', stroke: '#a21caf', text: '#86198f' },
  E: { fill: '#bbf7d0', stroke: '#16a34a', text: '#166534' },
  sz: { fill: '#fecaca', stroke: '#dc2626', text: '#991b1b' },
  t: { fill: '#bae6fd', stroke: '#0284c7', text: '#075985' },
  e: { fill: '#fef08a', stroke: '#ca8a04', text: '#854d0e' }
};

// 1. ábra: Zafírok csomagolása hármasával (leltár: 1 zsák, 0 doboz, 1 zacskó, 2 zafír = 32)
export const GemGroupingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const gem = (x: number, y: number, s = 1) => (
    <path
      key={`${x}-${y}`}
      d={`M ${x} ${y - 7 * s} L ${x + 5 * s} ${y} L ${x} ${y + 7 * s} L ${x - 5 * s} ${y} Z`}
      fill="#3b82f6"
      stroke="#1e3a8a"
      strokeWidth="1"
    />
  );
  return (
    <svg viewBox="0 0 440 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="436" height="226" rx="16" fill="#fffbeb" stroke="#fcd34d" />
      <text x="220" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
        Zafírok hármasával csomagolva
      </text>
      {/* zsák */}
      <g>
        <path d="M 40 110 Q 30 160 60 175 L 110 175 Q 140 160 130 110 Q 120 95 85 95 Q 50 95 40 110 Z" fill="#a16207" stroke="#713f12" strokeWidth="2" />
        <path d="M 70 95 Q 85 80 100 95" fill="none" stroke="#f97316" strokeWidth="3" />
        <rect x="52" y="125" width="66" height="22" rx="6" fill="#fef3c7" />
        <text x="85" y="140" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">3 · 9 = 27</text>
      </g>
      {/* doboz */}
      <g>
        <rect x="160" y="110" width="60" height="60" rx="4" fill="#2563eb" stroke="#1e3a8a" strokeWidth="2" />
        <path d="M 160 110 L 175 96 L 235 96 L 220 110 Z" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2" />
        <path d="M 220 110 L 235 96 L 235 156 L 220 170 Z" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="2" />
        <rect x="167" y="128" width="46" height="22" rx="4" fill="#dbeafe" />
        <text x="190" y="143" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">3 · 3 = 9</text>
      </g>
      {/* zacskó */}
      <g>
        <path d="M 268 110 L 262 170 L 312 170 L 306 110 Z" fill="#e0f2fe" stroke="#64748b" strokeWidth="2" />
        <path d="M 270 110 L 287 98 L 304 110" fill="none" stroke="#f97316" strokeWidth="2.5" />
        {gem(277, 140, 0.9)}
        {gem(297, 140, 0.9)}
        {gem(287, 158, 0.9)}
      </g>
      {/* egyes */}
      <g>
        {gem(360, 140, 1.3)}
      </g>
      {/* leltár */}
      {[
        { x: 57, v: '1' },
        { x: 170, v: '0' },
        { x: 259, v: '1' },
        { x: 342, v: '2' }
      ].map((c) => (
        <g key={c.x}>
          <rect x={c.x} y="186" width="56" height="30" rx="6" fill="#fef9c3" stroke="#eab308" />
          <text x={c.x + 28} y="207" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#713f12">{c.v}</text>
        </g>
      ))}
      <text x="85" y="62" textAnchor="middle" fontSize="12" fill="#713f12" fontWeight="bold">zsák</text>
      <text x="198" y="62" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontWeight="bold">doboz</text>
      <text x="287" y="62" textAnchor="middle" fontSize="12" fill="#334155" fontWeight="bold">zacskó</text>
      <text x="370" y="62" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontWeight="bold">1 zafír</text>
      <text x="432" y="207" textAnchor="end" fontSize="12" fontWeight="bold" fill="#b45309">= 32</text>
    </svg>
  );
};

// 2. ábra: Beváltás – 10 egyes = 1 tízes, ... , 10 ezres = 1 tízezres
export const FabatkaExchangeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const coins = [
    { v: '1', c: '#fde68a', s: '#ca8a04', r: 18 },
    { v: '10', c: '#bae6fd', s: '#0284c7', r: 21 },
    { v: '100', c: '#fecaca', s: '#dc2626', r: 24 },
    { v: '1000', c: '#bbf7d0', s: '#16a34a', r: 27 },
    { v: '10 000', c: '#f5d0fe', s: '#a21caf', r: 31 }
  ];
  return (
    <svg viewBox="0 0 460 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="146" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="230" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
        Fabatkák beváltása
      </text>
      {coins.map((c, i) => {
        const x = 45 + i * 92;
        return (
          <g key={c.v}>
            <circle cx={x} cy="72" r={c.r} fill={c.c} stroke={c.s} strokeWidth="3" />
            <circle cx={x} cy="72" r={c.r - 5} fill="none" stroke={c.s} strokeWidth="1" strokeDasharray="2 2" />
            <text x={x} y="77" textAnchor="middle" fontSize={c.v.length > 4 ? 10 : 13} fontWeight="bold" fill="#1e293b">
              {c.v}
            </text>
            {i < 4 && (
              <g>
                <path d={`M ${x + c.r + 6} 72 L ${x + 92 - coins[i + 1].r - 8} 72`} stroke="#64748b" strokeWidth="2" />
                <path d={`M ${x + 92 - coins[i + 1].r - 8} 72 l -6 -4 l 0 8 z`} fill="#64748b" />
                <text x={x + 46} y="62" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">· 10</text>
              </g>
            )}
          </g>
        );
      })}
      <text x="230" y="125" textAnchor="middle" fontSize="11.5" fill="#334155">
        10 egyes = 1 tízes • 10 tízes = 1 százas • 10 százas = 1 ezres • 10 ezres = 1 tízezres
      </text>
    </svg>
  );
};

// 3. ábra: Helyiérték-táblázat 4213-mal (alaki és valódi érték)
export const PlaceValueTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cols: { k: keyof typeof PV_COLORS; name: string; digit: string; real: string }[] = [
    { k: 'T', name: 'tízezres (T)', digit: '', real: '' },
    { k: 'E', name: 'ezres (E)', digit: '4', real: '4000' },
    { k: 'sz', name: 'százas (sz)', digit: '2', real: '200' },
    { k: 't', name: 'tízes (t)', digit: '1', real: '10' },
    { k: 'e', name: 'egyes (e)', digit: '3', real: '3' }
  ];
  return (
    <svg viewBox="0 0 460 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="166" rx="16" fill="#fff7ed" stroke="#fdba74" />
      <text x="275" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">Helyi érték</text>
      {cols.map((c, i) => {
        const x = 100 + i * 70;
        const col = PV_COLORS[c.k];
        return (
          <g key={c.k}>
            <path d={`M 275 28 L ${x + 35} 44`} stroke="#9a3412" strokeWidth="1.2" />
            <rect x={x} y="48" width="70" height="28" fill={col.stroke} stroke="#1e293b" />
            <text x={x + 35} y="66" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#fff">{c.name}</text>
            <rect x={x} y="76" width="70" height="30" fill={col.fill} stroke="#1e293b" />
            <text x={x + 35} y="97" textAnchor="middle" fontSize="17" fontWeight="bold" fill={col.text}>{c.digit}</text>
            <text x={x + 35} y="132" textAnchor="middle" fontSize="13" fontWeight="bold" fill={col.text}>{c.real}</text>
            {i > 1 && (
              <text x={x} y="132" textAnchor="middle" fontSize="13" fill="#334155">+</text>
            )}
          </g>
        );
      })}
      <text x="14" y="97" fontSize="12" fontWeight="bold" fill="#334155">Alaki érték</text>
      <text x="14" y="132" fontSize="12" fontWeight="bold" fill="#334155">Valódi érték</text>
      <text x="275" y="158" textAnchor="middle" fontSize="12" fill="#9a3412" fontWeight="bold">
        4213 = 4000 + 200 + 10 + 3
      </text>
    </svg>
  );
};

/** Golyós számolóeszköz rajza tetszőleges számjegyekkel (ezres, százas, tízes, egyes). */
export const AbacusDrawing: React.FC<{ digits: number[]; width?: number; showLabels?: boolean }> = ({ digits, showLabels = true }) => {
  const keys: (keyof typeof PV_COLORS)[] = ['E', 'sz', 't', 'e'];
  const labels = ['E', 'sz', 't', 'e'];
  return (
    <g>
      <rect x="20" y="150" width="200" height="10" rx="5" fill="#1e3a8a" />
      {digits.map((d, i) => {
        const x = 50 + i * 47;
        const col = PV_COLORS[keys[i]];
        return (
          <g key={i}>
            <line x1={x} y1="20" x2={x} y2="150" stroke="#1e3a8a" strokeWidth="2.5" />
            {Array.from({ length: d }, (_, j) => (
              <circle key={j} cx={x} cy={141 - j * 13} r="6" fill={col.stroke} stroke="#1e293b" strokeWidth="0.8" />
            ))}
            {showLabels && (
              <text x={x} y="176" textAnchor="middle" fontSize="12" fontWeight="bold" fill={col.text}>
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

// 4. ábra: Golyós számolóeszköz – 3 ezres, 1 százas, 3 tízes, 0 egyes = 3130
export const AbacusSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 380 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="376" height="186" rx="16" fill="#f0f9ff" stroke="#7dd3fc" />
    <AbacusDrawing digits={[3, 1, 3, 0]} />
    <g fontSize="12" fontWeight="bold">
      <circle cx="250" cy="40" r="6" fill={PV_COLORS.E.stroke} />
      <text x="262" y="44" fill="#334155">= 1000</text>
      <circle cx="250" cy="62" r="6" fill={PV_COLORS.sz.stroke} />
      <text x="262" y="66" fill="#334155">= 100</text>
      <circle cx="250" cy="84" r="6" fill={PV_COLORS.t.stroke} />
      <text x="262" y="88" fill="#334155">= 10</text>
      <circle cx="250" cy="106" r="6" fill={PV_COLORS.e.stroke} />
      <text x="262" y="110" fill="#334155">= 1</text>
      <text x="245" y="146" fontSize="15" fill="#0c4a6e">3000 + 100 + 30</text>
      <text x="245" y="168" fontSize="15" fill="#0c4a6e">= 3130</text>
    </g>
  </svg>
);

// 5. ábra: Számegyenes 0-tól 10 000-ig, ezresével
export const NumberLine10000Svg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 30;
  const x1 = 430;
  const sx = (n: number) => x0 + ((x1 - x0) * n) / 10000;
  return (
    <svg viewBox="0 0 460 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="126" rx="16" fill="#f0fdf4" stroke="#86efac" />
      <text x="230" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">Számegyenes 0-tól 10 000-ig</text>
      <line x1={x0} y1="70" x2={x1 + 12} y2="70" stroke="#166534" strokeWidth="2.5" />
      <path d={`M ${x1 + 18} 70 l -8 -5 l 0 10 z`} fill="#166534" />
      {Array.from({ length: 101 }, (_, i) => i * 100).map((n) => (
        <line key={n} x1={sx(n)} y1={n % 1000 === 0 ? 60 : n % 500 === 0 ? 63 : 66} x2={sx(n)} y2={n % 1000 === 0 ? 80 : n % 500 === 0 ? 77 : 74} stroke="#166534" strokeWidth={n % 1000 === 0 ? 2 : 0.8} />
      ))}
      {Array.from({ length: 11 }, (_, i) => i * 1000).map((n) => (
        <text key={n} x={sx(n)} y="96" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">
          {n === 10000 ? '10 000' : n}
        </text>
      ))}
      {[
        { n: 2500, c: '#2563eb' },
        { n: 6400, c: '#dc2626' },
        { n: 8900, c: '#a21caf' }
      ].map((p) => (
        <g key={p.n}>
          <path d={`M ${sx(p.n)} 58 l -5 -10 l 10 0 z`} fill={p.c} />
          <text x={sx(p.n)} y="42" textAnchor="middle" fontSize="11" fontWeight="bold" fill={p.c}>{p.n}</text>
        </g>
      ))}
      <text x="230" y="118" textAnchor="middle" fontSize="10.5" fill="#166534">Egy kis osztás 100-at, egy nagy osztás 1000-et ér.</text>
    </svg>
  );
};

// 6. ábra: A százasával haladó számtábla részlete (tankönyv 37. o.)
export const HundredsGridSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [3, 4, 5];
  const hidden = new Set([3600, 4400, 5800]);
  return (
    <svg viewBox="0 0 460 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="146" rx="16" fill="#faf5ff" stroke="#d8b4fe" />
      <text x="230" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b21a8">
        Számtábla részlete: jobbra +100, lefelé +1000
      </text>
      {rows.map((r, ri) =>
        Array.from({ length: 10 }, (_, ci) => {
          const n = r * 1000 + (ci + 1) * 100;
          const x = 18 + ci * 43;
          const y = 30 + ri * 36;
          const isHidden = hidden.has(n);
          return (
            <g key={n}>
              <rect x={x} y={y} width="40" height="32" rx="5" fill={isHidden ? '#fde68a' : '#fff'} stroke="#a855f7" />
              <text x={x + 20} y={y + 21} textAnchor="middle" fontSize={n >= 10000 ? 9 : 11} fontWeight="bold" fill={isHidden ? '#b91c1c' : '#3b0764'}>
                {isHidden ? '?' : n === 10000 ? '10 000' : n}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
};
