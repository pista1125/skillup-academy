import React from 'react';

// ---------------------------------------------------------------------------
// Közös rajzelemek a IV. Mérések 1–3. leckéjéhez (mérőeszközök, edények, tárgyak).
// Minden ikon egy 100 × 100-as saját dobozba van rajzolva; az <Ico> helyezi el és méretezi.
// ---------------------------------------------------------------------------
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';

export const Ico: React.FC<{ x?: number; y?: number; s?: number; children: React.ReactNode }> = ({ x = 0, y = 0, s = 1, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>
);

type P = { sw?: number };

/** Vonalzó (sárga, cm-beosztással). */
export const RulerIcon: React.FC<P & { ticks?: number }> = ({ sw = 3, ticks = 10 }) => (
  <g>
    <rect x="4" y="34" width="92" height="32" rx="3" fill="#fde047" stroke="#a16207" strokeWidth={sw} />
    {Array.from({ length: ticks + 1 }, (_, i) => {
      const x = 10 + (i * 80) / ticks;
      return <line key={i} x1={x} y1="34" x2={x} y2={i % 5 === 0 ? 54 : 46} stroke="#713f12" strokeWidth={sw * 0.7} />;
    })}
  </g>
);

/** Mérőszalag tokkal. */
export const TapeIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M40 40 L96 40 L96 58 L40 58 Z" fill="#fde68a" stroke="#b45309" strokeWidth={sw} />
    {[50, 60, 70, 80, 90].map((x) => (
      <line key={x} x1={x} y1="40" x2={x} y2="50" stroke="#92400e" strokeWidth={sw * 0.7} />
    ))}
    <circle cx="30" cy="50" r="26" fill="#ef4444" stroke="#7f1d1d" strokeWidth={sw} />
    <circle cx="30" cy="50" r="9" fill="#fecaca" stroke="#7f1d1d" strokeWidth={sw * 0.8} />
  </g>
);

/** Kétkarú mérleg. tilt: −1 = a bal oldal lent, 0 = egyensúly, 1 = a jobb oldal lent. */
export const BalanceIcon: React.FC<P & { tilt?: -1 | 0 | 1; left?: React.ReactNode; right?: React.ReactNode }> = ({ sw = 3, tilt = 0, left, right }) => {
  const a = (tilt * 12 * Math.PI) / 180;
  const L = 38;
  const lx = 50 - L * Math.cos(a);
  const ly = 34 - L * Math.sin(a);
  const rx = 50 + L * Math.cos(a);
  const ry = 34 + L * Math.sin(a);
  const pan = (x: number, y: number, content?: React.ReactNode) => (
    <g>
      <line x1={x} y1={y} x2={x - 13} y2={y + 22} stroke="#475569" strokeWidth={sw * 0.6} />
      <line x1={x} y1={y} x2={x + 13} y2={y + 22} stroke="#475569" strokeWidth={sw * 0.6} />
      <path d={`M${x - 17} ${y + 22} Q${x} ${y + 34} ${x + 17} ${y + 22} Z`} fill="#94a3b8" stroke="#334155" strokeWidth={sw * 0.8} />
      {content && <g transform={`translate(${x} ${y + 22})`}>{content}</g>}
    </g>
  );
  return (
    <g>
      <path d="M50 34 L50 88" stroke="#334155" strokeWidth={sw * 1.4} />
      <path d="M30 94 L70 94 L62 86 L38 86 Z" fill="#64748b" stroke="#334155" strokeWidth={sw * 0.8} />
      <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#334155" strokeWidth={sw * 1.3} strokeLinecap="round" />
      <path d="M50 30 L46 22 L54 22 Z" fill="#f59e0b" stroke="#92400e" strokeWidth={sw * 0.5} />
      <circle cx="50" cy="34" r={sw * 1.2} fill="#f59e0b" stroke="#92400e" strokeWidth={sw * 0.5} />
      {pan(lx, ly, left)}
      {pan(rx, ry, right)}
    </g>
  );
};

/** Személymérleg (fürdőszobai). */
export const BathScaleIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <rect x="14" y="18" width="72" height="72" rx="14" fill="#38bdf8" stroke="#0c4a6e" strokeWidth={sw} />
    <rect x="34" y="24" width="32" height="14" rx="3" fill="#e0f2fe" stroke="#0c4a6e" strokeWidth={sw * 0.6} />
    <ellipse cx="38" cy="62" rx="9" ry="16" fill="#e0f2fe" />
    <ellipse cx="62" cy="62" rx="9" ry="16" fill="#e0f2fe" />
  </g>
);

/** Konyhai mérleg számlappal és tállal. */
export const KitchenScaleIcon: React.FC<P & { angle?: number }> = ({ sw = 3, angle = -30 }) => (
  <g>
    <path d="M18 24 Q50 40 82 24 Z" fill="#e2e8f0" stroke="#334155" strokeWidth={sw * 0.8} />
    <rect x="46" y="28" width="8" height="10" fill="#94a3b8" />
    <path d="M14 94 L86 94 L78 38 L22 38 Z" fill="#f87171" stroke="#7f1d1d" strokeWidth={sw} />
    <circle cx="50" cy="66" r="20" fill="#fff" stroke="#7f1d1d" strokeWidth={sw * 0.8} />
    <line x1="50" y1="66" x2={50 + 16 * Math.sin((angle * Math.PI) / 180)} y2={66 - 16 * Math.cos((angle * Math.PI) / 180)} stroke="#111827" strokeWidth={sw * 0.8} strokeLinecap="round" />
  </g>
);

/** Rugós (akasztós) mérleg. */
export const SpringScaleIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M50 4 Q42 4 42 12 Q42 18 50 18" fill="none" stroke="#475569" strokeWidth={sw} />
    <line x1="50" y1="18" x2="50" y2="26" stroke="#475569" strokeWidth={sw} />
    <circle cx="50" cy="50" r="24" fill="#f1f5f9" stroke="#334155" strokeWidth={sw} />
    <line x1="50" y1="50" x2="60" y2="34" stroke="#dc2626" strokeWidth={sw * 0.8} />
    <line x1="50" y1="74" x2="50" y2="82" stroke="#475569" strokeWidth={sw} />
    <path d="M50 82 Q58 82 58 90 Q58 96 50 96 Q44 96 43 90" fill="none" stroke="#475569" strokeWidth={sw} />
  </g>
);

/** Mérőkancsó dl-beosztással. fill: hány dl van benne (0–10), a 10. vonal az 1 l. */
export const JugIcon: React.FC<P & { fill?: number; ticks?: number; showTop?: boolean }> = ({ sw = 3, fill = 0, ticks = 10, showTop = false }) => {
  const top = 14;
  const bottom = 94;
  const h = bottom - top - 6;
  const level = bottom - (fill / ticks) * h;
  return (
    <g>
      <path d="M72 30 Q94 32 92 54 Q90 72 70 76" fill="none" stroke="#475569" strokeWidth={sw * 1.4} />
      {fill > 0 && <rect x="20" y={level} width="52" height={bottom - level} fill="#7dd3fc" />}
      <path d={`M18 ${top - 4} L74 ${top - 4} L74 ${bottom} L18 ${bottom} Z`} fill="none" stroke="#334155" strokeWidth={sw} />
      {Array.from({ length: ticks }, (_, i) => {
        const y = bottom - ((i + 1) / ticks) * h;
        const long = i + 1 === ticks || (i + 1) % 5 === 0;
        return <line key={i} x1="18" y1={y} x2={long ? 40 : 32} y2={y} stroke={i + 1 === ticks && showTop ? '#dc2626' : '#1e3a8a'} strokeWidth={sw * 0.8} />;
      })}
    </g>
  );
};

/** Ivópohár. fill: 0–1 */
export const GlassIcon: React.FC<P & { fill?: number; color?: string }> = ({ sw = 3, fill = 0.7, color = '#fdba74' }) => {
  const yTop = 14 + (1 - fill) * 76;
  const xl = 26 + ((yTop - 10) / 84) * 8;
  return (
    <g>
      {fill > 0 && <path d={`M${xl} ${yTop} L${100 - xl} ${yTop} L66 92 L34 92 Z`} fill={color} />}
      <path d="M24 10 L76 10 L66 92 L34 92 Z" fill="none" stroke="#475569" strokeWidth={sw} strokeLinejoin="round" />
    </g>
  );
};

/** Kávéscsésze csészealjjal. */
export const CupIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M24 46 L76 46 Q74 80 50 80 Q26 80 24 46 Z" fill="#fde047" stroke="#a16207" strokeWidth={sw} />
    <path d="M75 52 Q90 52 88 62 Q86 70 72 68" fill="none" stroke="#a16207" strokeWidth={sw} />
    <ellipse cx="50" cy="84" rx="38" ry="7" fill="#fef9c3" stroke="#a16207" strokeWidth={sw * 0.8} />
    <ellipse cx="50" cy="47" rx="24" ry="4" fill="#78350f" />
  </g>
);

/** Csíkos bögre. */
export const MugIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M70 34 Q94 34 92 54 Q90 74 70 72" fill="none" stroke="#0e7490" strokeWidth={sw * 1.3} />
    <rect x="18" y="22" width="54" height="68" rx="6" fill="#fff" stroke="#0e7490" strokeWidth={sw} />
    {[34, 50, 66, 80].map((y, i) => (
      <rect key={y} x="19.5" y={y} width="51" height="6" fill={['#f87171', '#38bdf8', '#facc15', '#34d399'][i]} />
    ))}
  </g>
);

/** Palack, opcionális felirattal. */
export const BottleIcon: React.FC<P & { label?: string; color?: string; fs?: number }> = ({ sw = 3, label, color = '#bae6fd', fs = 18 }) => (
  <g>
    <rect x="42" y="4" width="16" height="10" rx="2" fill="#2563eb" stroke="#1e3a8a" strokeWidth={sw * 0.7} />
    <path d="M42 14 L58 14 L58 26 Q72 32 72 46 L72 92 Q72 96 68 96 L32 96 Q28 96 28 92 L28 46 Q28 32 42 26 Z" fill={color} stroke="#0369a1" strokeWidth={sw} />
    {label && (
      <g>
        <rect x="30" y="52" width="40" height="26" fill="#fff" stroke="#0369a1" strokeWidth={sw * 0.5} />
        <text x="50" y={65 + fs * 0.35} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0f172a" fontFamily={FONT}>{label}</text>
      </g>
    )}
  </g>
);

/** Vödör. */
export const BucketIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M18 34 Q50 -4 82 34" fill="none" stroke="#475569" strokeWidth={sw} />
    <path d="M14 34 L86 34 L76 94 L24 94 Z" fill="#60a5fa" stroke="#1e3a8a" strokeWidth={sw} strokeLinejoin="round" />
    <ellipse cx="50" cy="34" rx="36" ry="6" fill="#bfdbfe" stroke="#1e3a8a" strokeWidth={sw * 0.8} />
  </g>
);

/** Fürdőkád. */
export const TubIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M14 30 L14 14 Q14 8 22 8 L28 8" fill="none" stroke="#64748b" strokeWidth={sw} />
    <path d="M4 40 L96 40 L90 74 Q88 82 78 82 L22 82 Q12 82 10 74 Z" fill="#f8fafc" stroke="#334155" strokeWidth={sw} />
    <rect x="8" y="42" width="84" height="8" fill="#7dd3fc" />
    <line x1="22" y1="82" x2="18" y2="94" stroke="#334155" strokeWidth={sw} />
    <line x1="78" y1="82" x2="82" y2="94" stroke="#334155" strokeWidth={sw} />
  </g>
);

/** Kis cseppentős üvegcse. */
export const DropperIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M44 8 L56 8 L56 30 L44 30 Z" fill="#f8fafc" stroke="#334155" strokeWidth={sw * 0.8} />
    <rect x="40" y="30" width="20" height="10" fill="#334155" />
    <rect x="34" y="40" width="32" height="52" rx="6" fill="#86efac" stroke="#166534" strokeWidth={sw} />
  </g>
);

/** Ceruza (vízszintes). */
export const PencilIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M10 40 L76 40 L76 60 L10 60 Z" fill="#facc15" stroke="#a16207" strokeWidth={sw} />
    <path d="M76 40 L94 50 L76 60 Z" fill="#fde68a" stroke="#a16207" strokeWidth={sw} strokeLinejoin="round" />
    <path d="M89 47.5 L94 50 L89 52.5 Z" fill="#1f2937" />
    <rect x="4" y="40" width="8" height="20" fill="#f472b6" stroke="#9d174d" strokeWidth={sw * 0.8} />
  </g>
);

/** Ajtó. */
export const DoorIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <rect x="26" y="4" width="48" height="92" rx="2" fill="#b45309" stroke="#78350f" strokeWidth={sw} />
    <rect x="33" y="12" width="34" height="32" fill="#d97706" stroke="#78350f" strokeWidth={sw * 0.5} />
    <rect x="33" y="52" width="34" height="36" fill="#d97706" stroke="#78350f" strokeWidth={sw * 0.5} />
    <circle cx="66" cy="50" r="4" fill="#fde047" stroke="#78350f" strokeWidth={sw * 0.5} />
  </g>
);

/** Görögdinnye. */
export const MelonIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <ellipse cx="50" cy="54" rx="42" ry="34" fill="#16a34a" stroke="#14532d" strokeWidth={sw} />
    {[-24, -8, 8, 24].map((dx) => (
      <path key={dx} d={`M${50 + dx} 22 Q${50 + dx * 1.5} 54 ${50 + dx} 86`} fill="none" stroke="#14532d" strokeWidth={sw * 1.2} />
    ))}
  </g>
);

/** Alma. */
export const AppleIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M50 28 Q30 14 18 34 Q8 58 26 80 Q38 94 50 84 Q62 94 74 80 Q92 58 82 34 Q70 14 50 28 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth={sw} />
    <path d="M50 28 L52 10" stroke="#78350f" strokeWidth={sw} />
    <path d="M53 16 Q66 4 74 12 Q64 22 53 16 Z" fill="#22c55e" stroke="#14532d" strokeWidth={sw * 0.6} />
  </g>
);

/** Gyerek (egyszerű alak). */
export const ChildIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <circle cx="50" cy="18" r="13" fill="#fde68a" stroke="#92400e" strokeWidth={sw} />
    <path d="M37 12 Q50 0 63 12" fill="#92400e" />
    <path d="M32 36 L68 36 L64 66 L36 66 Z" fill="#22c55e" stroke="#14532d" strokeWidth={sw} />
    <line x1="32" y1="40" x2="18" y2="60" stroke="#92400e" strokeWidth={sw * 1.3} strokeLinecap="round" />
    <line x1="68" y1="40" x2="82" y2="60" stroke="#92400e" strokeWidth={sw * 1.3} strokeLinecap="round" />
    <line x1="42" y1="66" x2="40" y2="94" stroke="#1e3a8a" strokeWidth={sw * 2} strokeLinecap="round" />
    <line x1="58" y1="66" x2="60" y2="94" stroke="#1e3a8a" strokeWidth={sw * 2} strokeLinecap="round" />
  </g>
);

/** Tejesdoboz. */
export const MilkIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M28 30 L50 12 L72 30 Z" fill="#e0f2fe" stroke="#0369a1" strokeWidth={sw} strokeLinejoin="round" />
    <rect x="28" y="30" width="44" height="64" fill="#f8fafc" stroke="#0369a1" strokeWidth={sw} />
    <path d="M28 60 Q40 52 50 60 Q60 68 72 60 L72 94 L28 94 Z" fill="#38bdf8" />
  </g>
);

/** Zsák / zacskó, opcionális felirattal. */
export const SackIcon: React.FC<P & { label?: string; color?: string; fs?: number }> = ({ sw = 3, label, color = '#fcd34d', fs = 18 }) => (
  <g>
    <path d="M38 22 Q20 34 18 62 Q16 94 50 94 Q84 94 82 62 Q80 34 62 22 Z" fill={color} stroke="#78350f" strokeWidth={sw} strokeLinejoin="round" />
    <path d="M38 22 L32 8 L68 8 L62 22 Z" fill={color} stroke="#78350f" strokeWidth={sw} strokeLinejoin="round" />
    <line x1="36" y1="22" x2="64" y2="22" stroke="#7c2d12" strokeWidth={sw * 1.2} />
    {label && <text x="50" y={64 + fs * 0.35} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#1f2937" fontFamily={FONT}>{label}</text>}
  </g>
);

/** Fa. */
export const TreeIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <rect x="43" y="56" width="14" height="40" fill="#92400e" stroke="#451a03" strokeWidth={sw * 0.8} />
    <circle cx="50" cy="38" r="32" fill="#4ade80" stroke="#166534" strokeWidth={sw} />
  </g>
);

/** Könyv. */
export const BookIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <rect x="20" y="10" width="60" height="80" rx="4" fill="#a78bfa" stroke="#4c1d95" strokeWidth={sw} />
    <rect x="20" y="10" width="10" height="80" fill="#7c3aed" stroke="#4c1d95" strokeWidth={sw * 0.6} />
    <rect x="38" y="28" width="32" height="12" fill="#ede9fe" />
  </g>
);

/** Öntözőkanna. */
export const CanIcon: React.FC<P> = ({ sw = 3 }) => (
  <g>
    <path d="M70 52 L94 26" stroke="#15803d" strokeWidth={sw * 2} strokeLinecap="round" />
    <path d="M22 34 Q24 20 40 20 L56 20 Q72 20 72 34" fill="none" stroke="#15803d" strokeWidth={sw * 1.4} />
    <rect x="14" y="34" width="60" height="58" rx="8" fill="#4ade80" stroke="#14532d" strokeWidth={sw} />
  </g>
);

/** Súly (nehezék) felirattal. cx: közép, by: alsó szél, w: szélesség. */
export const Weight: React.FC<{ cx: number; by: number; w: number; label: string; fs?: number; kg?: boolean; unknown?: boolean; unit?: string }> = ({
  cx,
  by,
  w,
  label,
  fs,
  kg = false,
  unknown = false,
  unit
}) => {
  const h = w * 0.72;
  const top = by - h;
  const fill = unknown ? '#fee2e2' : kg ? '#334155' : '#94a3b8';
  const stroke = unknown ? UNK : kg ? '#0f172a' : '#334155';
  const text = unknown ? UNK : kg ? '#ffffff' : '#0f172a';
  const f = fs ?? (label.length <= 2 ? w * 0.5 : w * 0.36);
  return (
    <g>
      <rect x={cx - w * 0.16} y={top - w * 0.16} width={w * 0.32} height={w * 0.2} rx={w * 0.06} fill={fill} stroke={stroke} strokeWidth="2" strokeDasharray={unknown ? '4 3' : undefined} />
      <path
        d={`M${cx - w * 0.36} ${top} L${cx + w * 0.36} ${top} L${cx + w / 2} ${by} L${cx - w / 2} ${by} Z`}
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeDasharray={unknown ? '5 3' : undefined}
      />
      {unit ? (
        <g>
          <text x={cx} y={by - h * 0.5 + f * 0.12} textAnchor="middle" fontSize={f} fontWeight="bold" fill={text} fontFamily={FONT}>{label}</text>
          <text x={cx} y={by - h * 0.1} textAnchor="middle" fontSize={Math.max(f * 0.5, w * 0.2)} fontWeight="bold" fill={text} fontFamily={FONT}>{unit}</text>
        </g>
      ) : (
        <text x={cx} y={by - h / 2 + f * 0.36} textAnchor="middle" fontSize={f} fontWeight="bold" fill={text} fontFamily={FONT}>{label}</text>
      )}
    </g>
  );
};
