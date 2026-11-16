import React from 'react';

const FONT = 'system-ui, sans-serif';

const Arrow: React.FC<{ id: string; color: string }> = ({ id, color }) => (
  <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
    <path d="M0,0 L8,4 L0,8 z" fill={color} />
  </marker>
);

/** A fejezet állomásai: 1. kerek tízesek, 2. írásbeli szorzás, 3. összefüggések. */
export const ChapterMapSvg: React.FC<{ className?: string }> = ({ className }) => {
  const st = [
    { n: '1.', t: 'Kerek tízessel', e: '23 · 50 = 1150', c: '#2563eb' },
    { n: '2.', t: 'Írásbeli szorzás', e: '12 · 14 = 168', c: '#ea580c' },
    { n: '3.', t: 'Összefüggések', e: '61 · 80 = 122 · 40', c: '#7c3aed' }
  ];
  return (
    <svg viewBox="0 0 420 180" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="418" height="178" rx="12" fill="#fff1f2" stroke="#fda4af" />
      <text x="210" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9f1239">
        VII. Írásbeli szorzás – a fejezet állomásai
      </text>
      <path d="M70 100 L350 100" stroke="#fb7185" strokeWidth="5" strokeDasharray="10 6" />
      {st.map((s, i) => {
        const x = 70 + i * 140;
        return (
          <g key={s.n}>
            <circle cx={x} cy="100" r="26" fill={s.c} />
            <text x={x} y="107" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">
              {s.n}
            </text>
            <text x={x} y="58" textAnchor="middle" fontSize="13" fontWeight="bold" fill={s.c}>
              {s.t}
            </text>
            <text x={x} y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
              {s.e}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** A turistaház büféjének árjegyzéke (tankönyv 145. o., Megálló 5. feladat). */
export const BUFFET = [
  ['Bodzaszörp 2 dl', 250],
  ['Csipkebogyószörp 2 dl', 280],
  ['Gomolyasajtos szendvics', 340],
  ['Gombakrémes szendvics', 290],
  ['Áfonyás palacsinta 2 db', 320],
  ['Erdei mézes puszedli 1 csomag', 220]
] as const;
export const BuffetPriceSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="228" rx="12" fill="#fefce8" stroke="#fde047" />
    <text x="200" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#854d0e">
      Árjegyzék
    </text>
    {BUFFET.map(([k, v], i) => (
      <g key={k}>
        <rect x="24" y={38 + i * 30} width="352" height="26" rx="6" fill={i % 2 ? '#fef9c3' : '#fff'} stroke="#fde68a" />
        <text x="36" y={56 + i * 30} fontSize="13" fontWeight="bold" fill="#334155">
          {k}
        </text>
        <text x="364" y={56 + i * 30} textAnchor="end" fontSize="13" fontWeight="bold" fill="#a16207">
          {v} Ft
        </text>
      </g>
    ))}
  </svg>
);

/** A Nagybörzsönyi Erdei Vasút: 800 m oda-vissza, naponta háromszor (Megálló 2. feladat). */
export const ForestTrainSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <defs>
      <Arrow id="ftA" color="#15803d" />
      <Arrow id="ftB" color="#b45309" />
    </defs>
    <rect x="1" y="1" width="398" height="168" rx="12" fill="#f0fdf4" stroke="#86efac" />
    {/* fák */}
    {[30, 110, 190, 270, 350].map((x) => (
      <g key={x}>
        <rect x={x - 3} y="40" width="6" height="14" fill="#92400e" />
        <path d={`M${x - 14} 42 L${x} 14 L${x + 14} 42 Z`} fill="#16a34a" />
      </g>
    ))}
    {/* sín */}
    <line x1="40" y1="82" x2="360" y2="82" stroke="#57534e" strokeWidth="3" />
    <line x1="40" y1="90" x2="360" y2="90" stroke="#57534e" strokeWidth="3" />
    {Array.from({ length: 17 }).map((_, i) => (
      <line key={i} x1={44 + i * 19.5} y1="78" x2={44 + i * 19.5} y2="94" stroke="#a8a29e" strokeWidth="3" />
    ))}
    {/* kis vonat */}
    <rect x="120" y="60" width="44" height="20" rx="4" fill="#dc2626" />
    <rect x="166" y="64" width="34" height="16" rx="3" fill="#f59e0b" />
    <circle cx="132" cy="82" r="5" fill="#1e293b" />
    <circle cx="152" cy="82" r="5" fill="#1e293b" />
    <circle cx="183" cy="82" r="5" fill="#1e293b" />
    <rect x="26" y="96" width="28" height="22" fill="#fde68a" stroke="#b45309" />
    <rect x="346" y="96" width="28" height="22" fill="#fde68a" stroke="#b45309" />
    <line x1="58" y1="118" x2="342" y2="118" stroke="#15803d" strokeWidth="2" markerEnd="url(#ftA)" />
    <line x1="342" y1="130" x2="58" y2="130" stroke="#b45309" strokeWidth="2" markerEnd="url(#ftB)" />
    <text x="200" y="113" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
      800 m oda
    </text>
    <text x="200" y="146" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309">
      800 m vissza
    </text>
    <text x="200" y="164" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
      Naponta háromszor oda-vissza, csak szombaton és vasárnap.
    </text>
  </svg>
);

/** Két gyümölcsös (munkafüzet II. 82. o., 7. feladat): 78 sor · 36 fa és 82 sor · 28 fa. */
export const OrchardSvg: React.FC<{ className?: string }> = ({ className }) => {
  const block = (x: number, rows: number, per: number, name: string, color: string) => (
    <g key={name}>
      <text x={x + 80} y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill={color}>
        {name}
      </text>
      {Array.from({ length: 5 }).map((_, r) =>
        Array.from({ length: 7 }).map((__, c) => (
          <circle key={`${r}-${c}`} cx={x + 14 + c * 22} cy={44 + r * 20} r="7" fill={color} opacity={r === 3 ? 0.35 : 1} />
        ))
      )}
      <text x={x + 80} y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
        {rows} sor, soronként {per} fa
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 400 180" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="178" rx="12" fill="#f7fee7" stroke="#bef264" />
      {block(20, 78, 36, 'Péter bácsi', '#16a34a')}
      {block(220, 82, 28, 'Joli néni', '#65a30d')}
      <line x1="200" y1="20" x2="200" y2="170" stroke="#d9f99d" strokeWidth="2" />
    </svg>
  );
};

/** Hibavadász: két gyerek eredményei (munkafüzet II. 82. o., 6. feladat). */
export const ERROR_HUNT: { who: 'Karesz' | 'Kitti'; task: string; claimed: number; real: number }[] = [
  { who: 'Karesz', task: '93 · 75', claimed: 6975, real: 6975 },
  { who: 'Karesz', task: '25 · 93 + 1677', claimed: 4020, real: 4002 },
  { who: 'Karesz', task: '412 · 23 − 1476', claimed: 7000, real: 8000 },
  { who: 'Karesz', task: '16 · 18 · 14', claimed: 4032, real: 4032 },
  { who: 'Kitti', task: '93 · 65', claimed: 6035, real: 6045 },
  { who: 'Kitti', task: '52 · 39 + 5608', claimed: 7663, real: 7636 },
  { who: 'Kitti', task: '214 · 32 − 1848', claimed: 6000, real: 5000 },
  { who: 'Kitti', task: '17 · 19 · 15', claimed: 4845, real: 4845 }
];
export const ErrorHuntSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 190" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="188" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {(['Karesz', 'Kitti'] as const).map((w, k) => (
      <g key={w}>
        <rect x={14 + k * 192} y="12" width="180" height="26" rx="13" fill={k ? '#db2777' : '#2563eb'} />
        <text x={104 + k * 192} y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">
          {w} füzete
        </text>
        {ERROR_HUNT.filter((r) => r.who === w).map((r, i) => (
          <g key={r.task}>
            <rect x={14 + k * 192} y={46 + i * 34} width="180" height="28" rx="6" fill="#fff" stroke="#e2e8f0" />
            <text x={24 + k * 192} y={65 + i * 34} fontSize="12" fontWeight="bold" fill="#0f172a">
              {r.task} = {r.claimed}
            </text>
          </g>
        ))}
      </g>
    ))}
  </svg>
);

/** Nyílkör (tankönyv 141. o., 15. feladat): 314 → · 12 → A → − 2973 → B → · 11 → C → − 6287 → D. */
export const ArrowCycleSvg: React.FC<{ className?: string; values?: boolean }> = ({ className, values = false }) => {
  const nodes = [
    { x: 60, y: 46, t: '· 12', op: true },
    { x: 150, y: 46, t: values ? 'A = 3768' : 'A', op: false },
    { x: 250, y: 46, t: '− 2973', op: true },
    { x: 345, y: 46, t: values ? 'B = 795' : 'B', op: false },
    { x: 345, y: 110, t: '· 11', op: true },
    { x: 250, y: 160, t: values ? 'C = 8745' : 'C', op: false },
    { x: 150, y: 160, t: '− 6287', op: true },
    { x: 60, y: 160, t: values ? 'D = 2458' : 'D', op: false }
  ];
  return (
    <svg viewBox="0 0 400 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <Arrow id="acA" color="#dc2626" />
      </defs>
      <rect x="1" y="1" width="398" height="198" rx="12" fill="#fff7ed" stroke="#fdba74" />
      <rect x="26" y="96" width="68" height="28" rx="14" fill="#ea580c" />
      <text x="60" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">
        314
      </text>
      <line x1="60" y1="94" x2="60" y2="64" stroke="#dc2626" strokeWidth="2" markerEnd="url(#acA)" />
      {nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x - (n.op ? 36 : 40)}
            y={n.y - 14}
            width={n.op ? 72 : 80}
            height="28"
            rx={n.op ? 14 : 4}
            fill={n.op ? '#facc15' : '#ecfccb'}
            stroke={n.op ? '#ca8a04' : '#84cc16'}
          />
          <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">
            {n.t}
          </text>
        </g>
      ))}
      <line x1="96" y1="46" x2="108" y2="46" stroke="#dc2626" strokeWidth="2" markerEnd="url(#acA)" />
      <line x1="190" y1="46" x2="212" y2="46" stroke="#dc2626" strokeWidth="2" markerEnd="url(#acA)" />
      <line x1="286" y1="46" x2="303" y2="46" stroke="#dc2626" strokeWidth="2" markerEnd="url(#acA)" />
      <line x1="345" y1="60" x2="345" y2="94" stroke="#dc2626" strokeWidth="2" markerEnd="url(#acA)" />
      <path d="M345 124 L345 160 L292 160" fill="none" stroke="#dc2626" strokeWidth="2" markerEnd="url(#acA)" />
      <line x1="210" y1="160" x2="188" y2="160" stroke="#dc2626" strokeWidth="2" markerEnd="url(#acA)" />
      <line x1="114" y1="160" x2="102" y2="160" stroke="#dc2626" strokeWidth="2" markerEnd="url(#acA)" />
    </svg>
  );
};
