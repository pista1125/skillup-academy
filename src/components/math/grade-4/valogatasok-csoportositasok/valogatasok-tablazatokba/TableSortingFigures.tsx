import React from 'react';

// ---------------------------------------------------------------------------
// Ceruzák (TK 133/4.)
// ---------------------------------------------------------------------------
export type PencilColor = 'kék' | 'piros' | 'sárga' | 'zöld' | 'lila';

export const PENCIL_FILL: Record<PencilColor, string> = {
  kék: '#3b82f6',
  piros: '#ef4444',
  sárga: '#facc15',
  zöld: '#22c55e',
  lila: '#a855f7'
};

/** Vízszintes ceruza: bal végén (ha van) rózsaszín radír, jobb végén hegy. */
export const Pencil: React.FC<{ x: number; y: number; color: PencilColor; eraser: boolean; len?: number }> = ({ x, y, color, eraser, len = 54 }) => {
  const h = 8;
  const body = len - 12;
  const er = eraser ? 7 : 0;
  return (
    <g>
      {eraser && <rect x={x} y={y - h / 2} width={er} height={h} rx="2" fill="#f9a8d4" stroke="#9d174d" strokeWidth="0.7" />}
      {eraser && <rect x={x + er} y={y - h / 2} width="3" height={h} fill="#cbd5e1" stroke="#64748b" strokeWidth="0.5" />}
      <rect x={x + er + (eraser ? 3 : 0)} y={y - h / 2} width={body - er - (eraser ? 3 : 0)} height={h} fill={PENCIL_FILL[color]} stroke="#334155" strokeWidth="0.7" />
      <polygon points={`${x + body},${y - h / 2} ${x + len - 3},${y} ${x + body},${y + h / 2}`} fill="#fde68a" stroke="#334155" strokeWidth="0.7" />
      <polygon points={`${x + len - 5},${y - 1.3} ${x + len},${y} ${x + len - 5},${y + 1.3}`} fill={PENCIL_FILL[color]} />
    </g>
  );
};

export interface PencilItem {
  color: PencilColor;
  eraser: boolean;
}

/** A tankönyv 11 ceruzája: 2 kék radíros, 3 kék radír nélküli, 5 nem kék radíros, 1 nem kék radír nélküli. */
export const TK_PENCILS: PencilItem[] = [
  { color: 'kék', eraser: true },
  { color: 'kék', eraser: true },
  { color: 'kék', eraser: false },
  { color: 'kék', eraser: false },
  { color: 'kék', eraser: false },
  { color: 'piros', eraser: true },
  { color: 'lila', eraser: true },
  { color: 'sárga', eraser: true },
  { color: 'zöld', eraser: true },
  { color: 'zöld', eraser: true },
  { color: 'sárga', eraser: false }
];

const pencilGroup = (list: PencilItem[], x: number, y: number, perRow = 3, dx = 60, dy = 14) =>
  list.map((p, i) => <Pencil key={i} x={x + (i % perRow) * dx} y={y + Math.floor(i / perRow) * dy} color={p.color} eraser={p.eraser} len={50} />);

const KR = TK_PENCILS.filter((p) => p.color === 'kék' && p.eraser);
const KN = TK_PENCILS.filter((p) => p.color === 'kék' && !p.eraser);
const NR = TK_PENCILS.filter((p) => p.color !== 'kék' && p.eraser);
const NN = TK_PENCILS.filter((p) => p.color !== 'kék' && !p.eraser);

/** Kitti válogatása: elágazásos rajz. */
export const PencilTreeSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const box = (x: number, y: number, w: number, t: string) => (
    <g>
      <rect x={x} y={y - 11} width={w} height="22" rx="8" fill="#9a3412" />
      <text x={x + w / 2} y={y + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#fff">
        {t}
      </text>
    </g>
  );
  const ends: [number, string, PencilItem[]][] = [
    [30, 'radíros', KR],
    [72, 'nem radíros', KN],
    [124, 'radíros', NR],
    [174, 'nem radíros', NN]
  ];
  return (
    <svg viewBox="0 0 360 200" className={className} fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="356" height="196" rx="12" fill="#ffedd5" />
      <line x1="62" y1="100" x2="100" y2="52" stroke="#9a3412" strokeWidth="2" />
      <line x1="62" y1="100" x2="100" y2="148" stroke="#9a3412" strokeWidth="2" />
      <line x1="160" y1="52" x2="180" y2="30" stroke="#9a3412" strokeWidth="2" />
      <line x1="160" y1="52" x2="180" y2="72" stroke="#9a3412" strokeWidth="2" />
      <line x1="160" y1="148" x2="180" y2="124" stroke="#9a3412" strokeWidth="2" />
      <line x1="160" y1="148" x2="180" y2="174" stroke="#9a3412" strokeWidth="2" />
      {box(10, 100, 56, 'ceruzák')}
      {box(100, 52, 60, 'kékek')}
      {box(100, 148, 60, 'nem kékek')}
      {ends.map(([y, t, list]) => (
        <g key={y}>
          {box(180, y, 68, t)}
          {pencilGroup(list, 254, y - (list.length > 3 ? 7 : 0), 3, 34, 14).map((el, i) =>
            React.cloneElement(el as React.ReactElement<any>, { key: i, len: 30 })
          )}
        </g>
      ))}
    </svg>
  );
};

/** Manó táblázata. */
export const PencilTableSvg: React.FC<{ className?: string; hide?: ('KR' | 'KN' | 'NR' | 'NN')[] }> = ({ className = 'w-full h-auto', hide = [] }) => {
  const cell = (key: 'KR' | 'KN' | 'NR' | 'NN', list: PencilItem[], x: number, y: number) =>
    hide.includes(key) ? (
      <text x={x + 70} y={y + 32} fontSize="22" fontWeight="bold" textAnchor="middle" fill="#dc2626">
        ?
      </text>
    ) : (
      pencilGroup(list, x + 8, y + 16, 2, 66, 15)
    );
  return (
    <svg viewBox="0 0 360 150" className={className} fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="356" height="146" rx="10" fill="#fee2e2" />
      <rect x="76" y="8" width="140" height="26" fill="#dc2626" />
      <rect x="216" y="8" width="140" height="26" fill="#dc2626" />
      <text x="146" y="25" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#fff">
        Kék ceruza
      </text>
      <text x="286" y="25" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#fff">
        Nem kék ceruza
      </text>
      <rect x="4" y="34" width="72" height="54" fill="#dc2626" />
      <rect x="4" y="88" width="72" height="54" fill="#dc2626" />
      <text x="40" y="65" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
        Radíros
      </text>
      <text x="40" y="112" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
        Nem
      </text>
      <text x="40" y="125" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
        radíros
      </text>
      {[
        [76, 34],
        [216, 34],
        [76, 88],
        [216, 88]
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="140" height="54" fill="#fff7f7" stroke="#dc2626" strokeWidth="1.5" />
      ))}
      {cell('KR', KR, 76, 34)}
      {cell('NR', NR, 216, 34)}
      {cell('KN', KN, 76, 88)}
      {cell('NN', NN, 216, 88)}
    </svg>
  );
};

/** Mona két csoportja: B = kék ceruzák, C = radíros ceruzák, A = az összes ceruza. */
export const PencilVennSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 200" className={className} fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="352" height="192" rx="8" fill="#fef9c3" stroke="#1e3a8a" strokeWidth="2" />
    <text x="14" y="20" fontSize="12" fontWeight="bold" fill="#1e3a8a">
      A
    </text>
    <ellipse cx="128" cy="100" rx="88" ry="72" fill="none" stroke="#1e3a8a" strokeWidth="2" />
    <ellipse cx="224" cy="100" rx="88" ry="72" fill="none" stroke="#1e3a8a" strokeWidth="2" />
    <text x="110" y="42" fontSize="12" fontWeight="bold" fill="#1e3a8a">
      B
    </text>
    <text x="236" y="42" fontSize="12" fontWeight="bold" fill="#1e3a8a">
      C
    </text>
    {KN.map((p, i) => (
      <Pencil key={`kn${i}`} x={62} y={70 + i * 30} color={p.color} eraser={p.eraser} len={50} />
    ))}
    {KR.map((p, i) => (
      <Pencil key={`kr${i}`} x={151} y={88 + i * 24} color={p.color} eraser={p.eraser} len={50} />
    ))}
    {NR.map((p, i) => (
      <Pencil key={`nr${i}`} x={236 + (i % 2) * 8} y={62 + i * 20} color={p.color} eraser={p.eraser} len={50} />
    ))}
    {NN.map((p, i) => (
      <Pencil key={`nn${i}`} x={290 + i} y={182} color={p.color} eraser={p.eraser} len={50} />
    ))}
  </svg>
);

/** TK 134/6.: vonalfajták. */
export const LineTypesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 150" className={className} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="356" height="146" rx="10" fill="#f8fafc" stroke="#e2e8f0" />
    <line x1="14" y1="28" x2="120" y2="28" stroke="#0ea5e9" strokeWidth="1.6" />
    <text x="128" y="32" fontSize="11" fill="#0369a1">
      vékony vonal
    </text>
    <line x1="14" y1="62" x2="120" y2="62" stroke="#22c55e" strokeWidth="5" />
    <text x="128" y="66" fontSize="11" fill="#15803d">
      vastag vonal
    </text>
    <line x1="194" y1="28" x2="290" y2="28" stroke="#92400e" strokeWidth="1.6" strokeDasharray="6 4" />
    <text x="296" y="32" fontSize="11" fill="#92400e">
      szaggatott
    </text>
    <line x1="194" y1="62" x2="290" y2="62" stroke="#db2777" strokeWidth="1.6" strokeDasharray="1.5 5" strokeLinecap="round" />
    <text x="296" y="66" fontSize="11" fill="#be185d">
      pontvonal
    </text>
    <path d="M 70 110 C 90 80, 120 130, 150 104 S 210 96, 230 116" fill="none" stroke="#eab308" strokeWidth="1.8" />
    <text x="238" y="118" fontSize="11" fill="#a16207">
      szabadkézi vonal
    </text>
    {[
      ['vékony – vastag', '#dc2626', 14],
      ['folytonos – szaggatott', '#16a34a', 126],
      ['egyenes – görbe', '#0284c7', 258]
    ].map(([t, c, x]) => (
      <g key={t as string}>
        <rect x={x as number} y="128" width={(t as string).length * 5.6 + 12} height="16" rx="8" fill={c as string} />
        <text x={(x as number) + 6} y="140" fontSize="10" fontWeight="bold" fill="#fff">
          {t}
        </text>
      </g>
    ))}
  </svg>
);

/** TK 133/5.: vízi állatok – táblázat (Hal / Nem hal × Emlős / Nem emlős). */
export const WATER_ANIMALS: { t: string; hal: boolean; emlos: boolean }[] = [
  { t: '🦈 cápa', hal: true, emlos: false },
  { t: '🐸 béka', hal: false, emlos: false },
  { t: '🐠 aranyhal', hal: true, emlos: false },
  { t: '🐡 csikóhal', hal: true, emlos: false },
  { t: '🐌 csiga', hal: false, emlos: false },
  { t: '🐋 bálna', hal: false, emlos: true },
  { t: '🦐 rák', hal: false, emlos: false },
  { t: '🐙 polip', hal: false, emlos: false },
  { t: '🐚 kagyló', hal: false, emlos: false },
  { t: '🐬 delfin', hal: false, emlos: true }
];

export const AnimalTableSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const cells: [boolean, boolean, number, number][] = [
    [true, true, 96, 34],
    [true, false, 226, 34],
    [false, true, 96, 100],
    [false, false, 226, 100]
  ];
  return (
    <svg viewBox="0 0 360 170" className={className} fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="356" height="166" rx="10" fill="#ecfeff" />
      <rect x="96" y="8" width="130" height="26" fill="#0e7490" />
      <rect x="226" y="8" width="130" height="26" fill="#0e7490" />
      <text x="161" y="25" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#fff">
        Emlős
      </text>
      <text x="291" y="25" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#fff">
        Nem emlős
      </text>
      <rect x="4" y="34" width="92" height="66" fill="#0e7490" />
      <rect x="4" y="100" width="92" height="66" fill="#0e7490" />
      <text x="50" y="71" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#fff">
        Hal
      </text>
      <text x="50" y="137" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#fff">
        Nem hal
      </text>
      {cells.map(([h, e, x, y]) => {
        const list = WATER_ANIMALS.filter((a) => a.hal === h && a.emlos === e);
        return (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="130" height="66" fill="#ffffff" stroke="#0e7490" strokeWidth="1.5" />
            {list.length === 0 ? (
              <text x={x + 65} y={y + 38} fontSize="10.5" textAnchor="middle" fill="#94a3b8">
                (üres mező)
              </text>
            ) : (
              list.map((a, i) => (
                <text key={a.t} x={x + 8 + (i % 2) * 62} y={y + 16 + Math.floor(i / 2) * 16} fontSize="10" fontWeight="bold" fill="#0f172a">
                  {a.t}
                </text>
              ))
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Ugyanaz a válogatás három módon: elágazásos rajz – táblázat – halmazábra. */
export const ThreeWaysSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 120" className={className} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="356" height="116" rx="10" fill="#f5f3ff" stroke="#ddd6fe" />
    {/* fa */}
    <g stroke="#7c3aed" strokeWidth="2">
      <line x1="20" y1="60" x2="50" y2="35" />
      <line x1="20" y1="60" x2="50" y2="85" />
      <line x1="50" y1="35" x2="80" y2="22" />
      <line x1="50" y1="35" x2="80" y2="48" />
      <line x1="50" y1="85" x2="80" y2="72" />
      <line x1="50" y1="85" x2="80" y2="98" />
    </g>
    {[22, 48, 72, 98].map((y, i) => (
      <circle key={y} cx="84" cy={y} r="6" fill={['#f59e0b', '#10b981', '#3b82f6', '#ef4444'][i]} />
    ))}
    <text x="56" y="114" fontSize="9.5" textAnchor="middle" fill="#5b21b6">
      elágazásos rajz
    </text>
    {/* táblázat */}
    <g>
      {[
        [130, 30, '#f59e0b'],
        [180, 30, '#3b82f6'],
        [130, 62, '#10b981'],
        [180, 62, '#ef4444']
      ].map(([x, y, c]) => (
        <rect key={`${x}${y}`} x={x as number} y={y as number} width="50" height="32" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
      ))}
      {[
        [155, 46, '#f59e0b'],
        [205, 46, '#3b82f6'],
        [155, 78, '#10b981'],
        [205, 78, '#ef4444']
      ].map(([x, y, c]) => (
        <circle key={`${x}${y}`} cx={x as number} cy={y as number} r="6" fill={c as string} />
      ))}
      <text x="180" y="114" fontSize="9.5" textAnchor="middle" fill="#5b21b6">
        táblázat
      </text>
    </g>
    {/* halmazábra */}
    <rect x="248" y="14" width="104" height="86" rx="6" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
    <circle cx="285" cy="56" r="28" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
    <circle cx="315" cy="56" r="28" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
    <circle cx="300" cy="56" r="6" fill="#f59e0b" />
    <circle cx="272" cy="56" r="6" fill="#10b981" />
    <circle cx="328" cy="56" r="6" fill="#3b82f6" />
    <circle cx="340" cy="92" r="6" fill="#ef4444" />
    <text x="300" y="114" fontSize="9.5" textAnchor="middle" fill="#5b21b6">
      halmazábra
    </text>
  </svg>
);
