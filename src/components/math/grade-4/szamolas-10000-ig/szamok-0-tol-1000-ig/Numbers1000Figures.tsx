import React from 'react';

// Színek a tankönyv helyiérték-táblázata szerint:
// ezres – zöld, százas – piros, tízes – kék, egyes – sárga
export const PV_COLORS = {
  ezres: '#16a34a',
  szazas: '#dc2626',
  tizes: '#0ea5e9',
  egyes: '#eab308'
};

const FONT = 'system-ui, sans-serif';

/** Golyós számológép: piros golyó = 100, kék = 10, sárga = 1 (tankönyv 5. o., 3. feladat). */
export const AbacusSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rods = [
    { x: 70, count: 3, color: PV_COLORS.szazas, label: 'százas', value: '100' },
    { x: 150, count: 4, color: PV_COLORS.tizes, label: 'tízes', value: '10' },
    { x: 230, count: 6, color: PV_COLORS.egyes, label: 'egyes', value: '1' }
  ];
  return (
    <svg viewBox="0 0 300 256" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="2" y="2" width="296" height="252" rx="16" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
      <text x="150" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
        Golyós számológép
      </text>
      {rods.map((r) => (
        <g key={r.x}>
          <line x1={r.x} y1="40" x2={r.x} y2="190" stroke="#1e3a8a" strokeWidth="3" />
          {Array.from({ length: r.count }).map((_, i) => (
            <circle key={i} cx={r.x} cy={182 - i * 15} r="7" fill={r.color} stroke="#0f172a" strokeWidth="0.8" />
          ))}
          <text x={r.x} y="212" textAnchor="middle" fontSize="12" fontWeight="bold" fill={r.color}>
            {r.label}
          </text>
          <text x={r.x} y="228" textAnchor="middle" fontSize="11" fill="#475569">
            1 golyó = {r.value}
          </text>
        </g>
      ))}
      <rect x="30" y="190" width="240" height="7" rx="3" fill="#1e3a8a" />
      <text x="150" y="244" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        300 + 40 + 6 = 346
      </text>
    </svg>
  );
};

/** Helyiérték-táblázat: alaki érték és valódi érték (tankönyv 6. o., 7. feladat). */
export const PlaceValueTableSvg: React.FC<{ className?: string }> = ({ className }) => {
  const cols = [
    { name: 'ezres (E)', color: PV_COLORS.ezres, light: '#dcfce7', digit: '', real: '' },
    { name: 'százas (sz)', color: PV_COLORS.szazas, light: '#fee2e2', digit: '2', real: '200' },
    { name: 'tízes (t)', color: PV_COLORS.tizes, light: '#e0f2fe', digit: '7', real: '70' },
    { name: 'egyes (e)', color: PV_COLORS.egyes, light: '#fef9c3', digit: '3', real: '3' }
  ];
  return (
    <svg viewBox="0 0 340 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="2" y="2" width="336" height="166" rx="14" fill="#ffffff" stroke="#cbd5e1" />
      <text x="215" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        Helyi érték
      </text>
      {cols.map((c, i) => {
        const x = 90 + i * 62;
        return (
          <g key={c.name}>
            <rect x={x} y="32" width="60" height="26" fill={c.color} stroke="#0f172a" strokeWidth="0.8" />
            <text x={x + 30} y="49" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
              {c.name}
            </text>
            <rect x={x} y="58" width="60" height="32" fill={c.light} stroke="#0f172a" strokeWidth="0.8" />
            <text x={x + 30} y="80" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">
              {c.digit}
            </text>
            <text x={x + 30} y="122" textAnchor="middle" fontSize="16" fontWeight="bold" fill={c.color}>
              {c.real}
            </text>
          </g>
        );
      })}
      <text x="12" y="80" fontSize="12" fontWeight="bold" fill="#334155">
        Alaki érték
      </text>
      <text x="12" y="122" fontSize="12" fontWeight="bold" fill="#334155">
        Valódi érték
      </text>
      <text x="213" y="121" textAnchor="middle" fontSize="16" fill="#334155">+</text>
      <text x="275" y="121" textAnchor="middle" fontSize="16" fill="#334155">+</text>
      <text x="170" y="155" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        273 = 2 százas + 7 tízes + 3 egyes = 200 + 70 + 3
      </text>
    </svg>
  );
};

/** Számegyenes 0-tól 1000-ig, százasonként beosztva, néhány számmal. */
export const NumberLine1000Svg: React.FC<{ className?: string }> = ({ className }) => {
  const x0 = 20;
  const x1 = 380;
  const sx = (v: number) => x0 + ((x1 - x0) * v) / 1000;
  const marks = [
    { v: 242, c: '#7c3aed' },
    { v: 756, c: '#db2777' },
    { v: 928, c: '#059669' }
  ];
  return (
    <svg viewBox="0 0 400 110" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="108" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1={x0} y1="60" x2={x1 + 10} y2="60" stroke="#0f172a" strokeWidth="2" />
      <polygon points={`${x1 + 14},60 ${x1 + 6},55 ${x1 + 6},65`} fill="#0f172a" />
      {Array.from({ length: 101 }).map((_, i) => {
        const v = i * 10;
        const big = v % 100 === 0;
        const mid = v % 50 === 0;
        return (
          <line
            key={v}
            x1={sx(v)}
            x2={sx(v)}
            y1={big ? 50 : mid ? 54 : 57}
            y2={big ? 70 : mid ? 66 : 63}
            stroke="#334155"
            strokeWidth={big ? 1.6 : 0.7}
          />
        );
      })}
      {Array.from({ length: 11 }).map((_, i) => (
        <text key={i} x={sx(i * 100)} y="86" textAnchor="middle" fontSize="10" fill="#334155">
          {i * 100 === 1000 ? '1000' : i * 100}
        </text>
      ))}
      {marks.map((m) => (
        <g key={m.v}>
          <circle cx={sx(m.v)} cy="60" r="5" fill={m.c} />
          <text x={sx(m.v)} y="38" textAnchor="middle" fontSize="12" fontWeight="bold" fill={m.c}>
            {m.v}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Tízesre kerekítés a számegyenesen 590 és 610 között (tankönyv 9. o.). */
export const RoundingLineSvg: React.FC<{ className?: string }> = ({ className }) => {
  const x0 = 30;
  const x1 = 370;
  const sx = (v: number) => x0 + ((x1 - x0) * (v - 590)) / 20;
  const pts = [
    { v: 590, r: 590, c: '#16a34a' },
    { v: 595, r: 600, c: '#0284c7' },
    { v: 600, r: 600, c: '#16a34a' },
    { v: 608, r: 610, c: '#dc2626' }
  ];
  return (
    <svg viewBox="0 0 400 120" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="118" rx="12" fill="#fff7ed" stroke="#fdba74" />
      <line x1={x0} y1="66" x2={x1 + 12} y2="66" stroke="#0f172a" strokeWidth="2" />
      <polygon points={`${x1 + 16},66 ${x1 + 8},61 ${x1 + 8},71`} fill="#0f172a" />
      {Array.from({ length: 21 }).map((_, i) => {
        const v = 590 + i;
        const big = v % 10 === 0;
        return (
          <line key={v} x1={sx(v)} x2={sx(v)} y1={big ? 56 : 61} y2={big ? 76 : 71} stroke="#334155" strokeWidth={big ? 1.6 : 0.8} />
        );
      })}
      {[590, 600, 610].map((v) => (
        <text key={v} x={sx(v)} y="94" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {v}
        </text>
      ))}
      {pts.map((p) => (
        <g key={p.v}>
          <circle cx={sx(p.v)} cy="66" r="5" fill={p.c} />
          <text x={sx(p.v)} y="42" textAnchor="middle" fontSize="11" fontWeight="bold" fill={p.c}>
            {p.v} ≈ {p.r}
          </text>
        </g>
      ))}
      <text x="200" y="112" textAnchor="middle" fontSize="10" fill="#9a3412">
        Középen (595) a nagyobb tízes szomszédra kerekítünk.
      </text>
    </svg>
  );
};

/** Papír zsebkendők: 100-as doboz, 10-es csomag és darab (tankönyv 5. o., 4. feladat). */
export const TissueBoxesSvg: React.FC<{ className?: string }> = ({ className }) => {
  const box = (x: number, y: number) => (
    <g key={`b${x}-${y}`}>
      <rect x={x} y={y} width="78" height="46" rx="5" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.5" />
      <rect x={x + 6} y={y + 6} width="66" height="10" rx="3" fill="#dbeafe" />
      <text x={x + 39} y={y + 36} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">
        100 db
      </text>
    </g>
  );
  const pack = (x: number, y: number) => (
    <g key={`p${x}-${y}`}>
      <rect x={x} y={y} width="26" height="36" rx="3" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="1.2" />
      <text x={x + 13} y={y + 24} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e3a8a">
        10
      </text>
    </g>
  );
  const single = (x: number, y: number) => (
    <rect key={`s${x}-${y}`} x={x} y={y} width="14" height="14" rx="2" fill="#ffffff" stroke="#64748b" />
  );
  return (
    <svg viewBox="0 0 340 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="148" rx="12" fill="#eff6ff" stroke="#93c5fd" />
      {box(12, 30)}
      {box(12, 82)}
      {[0, 1, 2].map((i) => pack(104 + i * 32, 50))}
      {[0, 1, 2, 3, 4].map((i) => single(214 + (i % 3) * 20, 50 + Math.floor(i / 3) * 20))}
      <text x="50" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">2 doboz</text>
      <text x="150" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">3 csomag</text>
      <text x="234" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">5 darab</text>
      <text x="170" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        200 + 30 + 5 = 235 zsebkendő
      </text>
    </svg>
  );
};

/** Milliméterpapír: 100 kis négyzet = 1 nagy négyzet, 10 kis négyzet = 1 csík (munkafüzet 5. o.). */
export const HundredGridSvg: React.FC<{ className?: string }> = ({ className }) => {
  const cell = 9;
  const grid = (ox: number, oy: number, cols: number, rows: number, fill: string, key: string) => (
    <g key={key}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => (
          <rect key={`${r}-${c}`} x={ox + c * cell} y={oy + r * cell} width={cell} height={cell} fill={fill} stroke="#ffffff" strokeWidth="0.8" />
        ))
      )}
    </g>
  );
  return (
    <svg viewBox="0 0 340 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="148" rx="12" fill="#f0fdf4" stroke="#86efac" />
      {grid(16, 18, 10, 10, '#22c55e', 'h1')}
      {grid(116, 18, 10, 10, '#22c55e', 'h2')}
      {grid(220, 18, 1, 10, '#f97316', 't1')}
      {grid(236, 18, 1, 10, '#f97316', 't2')}
      {grid(260, 99, 4, 1, '#0ea5e9', 'e1')}
      <text x="61" y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">100</text>
      <text x="161" y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">100</text>
      <text x="234" y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">10 + 10</text>
      <text x="278" y="124" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">4</text>
      <text x="170" y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
        200 + 20 + 4 = 224 kis négyzet
      </text>
    </svg>
  );
};
