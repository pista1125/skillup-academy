import React from 'react';

const FONT = 'system-ui, sans-serif';

/** Szám kiírása a tankönyv szerint: negatív előjel „−”, ötjegyűtől szóköz. */
export const fmtNum = (n: number): string => {
  const a = Math.abs(n);
  const s = a >= 10000 ? String(a).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(a);
  return n < 0 ? `−${s}` : s;
};

export const fmtTemp = (n: number): string => `${fmtNum(n)} °C`;

// ---------------------------------------------------------------------------
// Újrahasznosítható hőmérő (SVG <g>)
// ---------------------------------------------------------------------------
export interface ThermoProps {
  x: number;
  y: number;
  h?: number;
  min?: number;
  max?: number;
  value?: number | null;
  labelEvery?: number;
  color?: string;
  /** a hőmérő alá írt felirat */
  caption?: string;
  captionColor?: string;
}

/** Függőleges hőmérő skálával; a folyadékoszlop a value értékig ér. */
export const ThermoGroup: React.FC<ThermoProps> = ({
  x,
  y,
  h = 150,
  min = -10,
  max = 20,
  value = null,
  labelEvery = 10,
  color = '#ef4444',
  caption,
  captionColor = '#0f172a'
}) => {
  const pos = (v: number) => y + h - ((v - min) / (max - min)) * h;
  const ticks: number[] = [];
  for (let v = min; v <= max; v++) ticks.push(v);
  const fillTop = value === null ? y + h + 4 : pos(value);
  return (
    <g fontFamily={FONT}>
      <rect x={x - 26} y={y - 16} width="52" height={h + 50} rx="8" fill="#ffffff" stroke="#94a3b8" />
      <text x={x + 14} y={y - 4} fontSize="8" fontWeight="bold" fill="#334155">°C</text>
      <rect x={x - 4} y={y - 6} width="8" height={h + 14} rx="4" fill="#f1f5f9" stroke="#64748b" />
      <rect x={x - 2.5} y={fillTop} width="5" height={Math.max(0, y + h + 10 - fillTop)} fill={color} />
      <circle cx={x} cy={y + h + 16} r="8" fill={color} stroke="#64748b" />
      {ticks.map((v) => {
        const big = v % labelEvery === 0;
        const mid = !big && v % 5 === 0;
        return (
          <g key={v}>
            <line x1={x + 4} y1={pos(v)} x2={x + (big ? 13 : mid ? 10 : 8)} y2={pos(v)} stroke="#475569" strokeWidth={big ? 1.2 : 0.6} />
            {big && (
              <text x={x - 7} y={pos(v) + 3} textAnchor="end" fontSize="8" fontWeight="bold" fill={v === 0 ? '#2563eb' : '#334155'}>
                {fmtNum(v)}
              </text>
            )}
          </g>
        );
      })}
      {caption && (
        <text x={x} y={y + h + 44} textAnchor="middle" fontSize="11" fontWeight="bold" fill={captionColor}>
          {caption}
        </text>
      )}
    </g>
  );
};

/** Hőmérő a reggeli −6 °C-kal, fagypont jelölve (tankönyv 87. o.). */
export const ThermometerSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 320 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="228" rx="12" fill="#f0f9ff" stroke="#bae6fd" />
    <ThermoGroup x={80} y={24} h={150} min={-20} max={20} value={-6} color="#3b82f6" caption="reggel 7 óra" />
    <line x1="100" y1="99" x2="150" y2="99" stroke="#2563eb" strokeDasharray="4 3" />
    <text x="156" y="96" fontSize="13" fontWeight="bold" fill="#2563eb">0 °C = fagypont</text>
    <text x="156" y="112" fontSize="10" fill="#334155">ennél melegebb: + (plusz)</text>
    <text x="156" y="126" fontSize="10" fill="#334155">ennél hidegebb: − (mínusz)</text>
    <rect x="152" y="140" width="150" height="40" rx="10" fill="#dbeafe" stroke="#3b82f6" />
    <text x="227" y="158" textAnchor="middle" fontSize="11" fill="#1e3a8a">Manó hőmérője:</text>
    <text x="227" y="174" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1d4ed8">−6 °C</text>
    <text x="227" y="205" textAnchor="middle" fontSize="10" fill="#475569">„mínusz 6 fok” = 6 fokkal fagypont alatt</text>
    <text x="160" y="30" fontSize="18">❄️</text>
    <text x="280" y="44" fontSize="22">⛄</text>
  </svg>
);

/** Hegyek és tenger magasságai a tengerszinthez viszonyítva (tankönyv 87. o. képe). */
export const SeaLevelSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="228" rx="12" fill="#e0f2fe" stroke="#7dd3fc" />
    {/* hegyek */}
    <polygon points="10,150 70,40 130,150" fill="#e2e8f0" stroke="#94a3b8" />
    <polygon points="90,150 170,20 250,150" fill="#f1f5f9" stroke="#94a3b8" />
    <polygon points="200,150 270,30 335,150" fill="#e2e8f0" stroke="#94a3b8" />
    <line x1="170" y1="20" x2="170" y2="6" stroke="#475569" />
    <polygon points="170,6 184,10 170,14" fill="#dc2626" />
    <text x="190" y="22" fontSize="11" fontWeight="bold" fill="#0f172a">400 m</text>
    <text x="44" y="38" fontSize="11" fontWeight="bold" fill="#0f172a">330 m</text>
    <text x="270" y="22" fontSize="14">🐻‍❄️</text>
    <text x="290" y="42" fontSize="11" fontWeight="bold" fill="#0f172a">350 m</text>
    {/* tenger */}
    <rect x="2" y="150" width="336" height="78" fill="#3b82f6" opacity="0.55" />
    <line x1="2" y1="150" x2="338" y2="150" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="6 4" />
    <rect x="8" y="138" width="98" height="18" rx="6" fill="#ffffff" stroke="#1d4ed8" />
    <text x="57" y="151" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1d4ed8">tengerszint: 0 m</text>
    <text x="120" y="160" fontSize="14">🦭</text>
    <text x="240" y="205" fontSize="16">🐟</text>
    <text x="270" y="210" fontSize="12" fontWeight="bold" fill="#ffffff">−50 m</text>
    <text x="20" y="185" fontSize="10" fontWeight="bold" fill="#ffffff">a tengerszint felett: pozitív (+)</text>
    <text x="20" y="200" fontSize="10" fontWeight="bold" fill="#ffffff">a tengerszint alatt: negatív (−)</text>
  </svg>
);

/** A tankönyv 88. oldali táblázata: reggeli hőmérsékletek. */
export const TownTempsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows: [string, number][] = [
    ['Budapest', 3],
    ['Pécs', 5],
    ['Zirc', -1],
    ['Zabar', -10],
    ['Miskolc', -3],
    ['Szeged', 0]
  ];
  return (
    <svg viewBox="0 0 340 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="228" rx="12" fill="#ffffff" stroke="#cbd5e1" />
      <rect x="14" y="14" width="150" height="24" rx="4" fill="#16a34a" />
      <text x="54" y="31" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">Település</text>
      <text x="126" y="31" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">Hőmérséklet</text>
      {rows.map(([t, v], i) => (
        <g key={t}>
          <rect x="14" y={40 + i * 28} width="150" height="26" fill={i % 2 ? '#f0fdf4' : '#dcfce7'} />
          <text x="54" y={57 + i * 28} textAnchor="middle" fontSize="12" fill="#14532d">{t}</text>
          <text x="140" y={57 + i * 28} textAnchor="end" fontSize="12" fontWeight="bold" fill={v < 0 ? '#1d4ed8' : v > 0 ? '#dc2626' : '#0f172a'}>
            {fmtTemp(v)}
          </text>
        </g>
      ))}
      <ThermoGroup x={210} y={40} h={130} min={-10} max={20} value={-10} color="#3b82f6" caption="Zabar" />
      <ThermoGroup x={290} y={40} h={130} min={-10} max={20} value={5} color="#ef4444" caption="Pécs" />
    </svg>
  );
};

/** Manó grafikonja: a hőmérséklet óránként egy téli napon (tankönyv 88. o.). */
export const DAY_TEMPS: [number, number][] = [
  [8, -3],
  [9, -1],
  [10, 0],
  [11, 2],
  [12, 5],
  [13, 6],
  [14, 4],
  [15, 2],
  [16, 0],
  [17, -1],
  [18, -2],
  [19, -4]
];

export const DayGraphSvg: React.FC<{ className?: string; hideFrom?: number }> = ({ className, hideFrom }) => {
  const X = (h: number) => 40 + (h - 8) * 23;
  const Y = (t: number) => 110 - t * 10;
  const pts = DAY_TEMPS.filter(([h]) => hideFrom === undefined || h < hideFrom);
  return (
    <svg viewBox="0 0 340 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="198" rx="12" fill="#ffffff" stroke="#cbd5e1" />
      {[-6, -4, -2, 0, 2, 4, 6, 8].map((t) => (
        <g key={t}>
          <line x1="36" y1={Y(t)} x2="318" y2={Y(t)} stroke={t === 0 ? '#0f172a' : '#e2e8f0'} strokeWidth={t === 0 ? 1.5 : 1} />
          <text x="30" y={Y(t) + 3} textAnchor="end" fontSize="9" fill="#334155">{fmtNum(t)}</text>
        </g>
      ))}
      <text x="22" y="22" fontSize="9" fill="#334155">°C</text>
      {DAY_TEMPS.map(([h]) => (
        <g key={h}>
          <line x1={X(h)} y1="28" x2={X(h)} y2="172" stroke="#f1f5f9" />
          <text x={X(h)} y="186" textAnchor="middle" fontSize="9" fill="#334155">{h}</text>
        </g>
      ))}
      <text x="322" y="186" fontSize="9" fill="#334155">óra</text>
      <polyline points={pts.map(([h, t]) => `${X(h)},${Y(t)}`).join(' ')} fill="none" stroke="#ef4444" strokeWidth="2" />
      {pts.map(([h, t]) => (
        <circle key={h} cx={X(h)} cy={Y(t)} r="3.5" fill="#dc2626" />
      ))}
    </svg>
  );
};

/** Ház emeletekkel és mélygarázzsal: a földszint a 0. */
export const FloorsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const floors = [3, 2, 1, 0, -1, -2];
  return (
    <svg viewBox="0 0 300 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="298" height="228" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x="2" y="146" width="296" height="82" fill="#d6d3d1" opacity="0.6" />
      <line x1="2" y1="146" x2="298" y2="146" stroke="#65a30d" strokeWidth="3" />
      <text x="290" y="140" textAnchor="end" fontSize="10" fontWeight="bold" fill="#3f6212">talaj szintje</text>
      {floors.map((f, i) => {
        const y = 14 + i * 34;
        const under = f < 0;
        return (
          <g key={f}>
            <rect x="70" y={y} width="120" height="32" fill={under ? '#a8a29e' : f === 0 ? '#fde68a' : '#bfdbfe'} stroke="#475569" />
            <text x="130" y={y + 20} textAnchor="middle" fontSize="10" fill="#0f172a">
              {f > 0 ? `${f}. emelet` : f === 0 ? 'földszint' : `mélygarázs`}
            </text>
            <rect x="200" y={y + 6} width="36" height="20" rx="5" fill={under ? '#1d4ed8' : f === 0 ? '#0f172a' : '#dc2626'} />
            <text x="218" y={y + 21} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">{fmtNum(f)}</text>
          </g>
        );
      })}
      <text x="22" y="40" fontSize="22">🛗</text>
      <text x="22" y="200" fontSize="20">🚗</text>
    </svg>
  );
};

/** Mihez illik a hőmérséklet? (munkafüzet 82. o., 2. feladat) */
export const WeatherWordsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const items = [
    { e: '🛷', t: 'szánkózás', v: '−20 °C … −1 °C', c: '#1d4ed8', bg: '#dbeafe' },
    { e: '💧', t: 'olvadás', v: '0 °C', c: '#0f172a', bg: '#f1f5f9' },
    { e: '🌸', t: 'virágzás', v: '11 °C … 18 °C', c: '#be185d', bg: '#fce7f3' },
    { e: '☀️', t: 'napozás', v: '24 °C … 28 °C', c: '#dc2626', bg: '#fee2e2' },
    { e: '♨️', t: 'a víz forrása', v: '100 °C', c: '#b91c1c', bg: '#ffedd5' }
  ];
  return (
    <svg viewBox="0 0 320 220" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="318" height="218" rx="12" fill="#ffffff" stroke="#cbd5e1" />
      {items.map((it, i) => (
        <g key={it.t}>
          <rect x="14" y={12 + i * 41} width="292" height="35" rx="10" fill={it.bg} stroke={it.c} />
          <text x="34" y={35 + i * 41} textAnchor="middle" fontSize="18">{it.e}</text>
          <text x="56" y={34 + i * 41} fontSize="13" fontWeight="bold" fill="#0f172a">{it.t}</text>
          <text x="294" y={34 + i * 41} textAnchor="end" fontSize="13" fontWeight="bold" fill={it.c}>{it.v}</text>
        </g>
      ))}
    </svg>
  );
};
