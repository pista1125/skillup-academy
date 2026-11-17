import React from 'react';
import {
  FONT,
  Ico,
  RulerIcon,
  TapeIcon,
  BalanceIcon,
  BathScaleIcon,
  KitchenScaleIcon,
  SpringScaleIcon,
  JugIcon,
  GlassIcon,
  CupIcon,
  MugIcon,
  BottleIcon,
  BucketIcon,
  TubIcon,
  DropperIcon,
  PencilIcon,
  DoorIcon,
  MelonIcon,
  AppleIcon,
  ChildIcon,
  MilkIcon,
  SackIcon,
  TreeIcon,
  BookIcon,
  CanIcon,
  Weight
} from './WhatToMeasureG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

export const ICONS = {
  ruler: RulerIcon,
  tape: TapeIcon,
  balance: BalanceIcon,
  bathscale: BathScaleIcon,
  kitchen: KitchenScaleIcon,
  spring: SpringScaleIcon,
  jug: JugIcon,
  glass: GlassIcon,
  cup: CupIcon,
  mug: MugIcon,
  bottle: BottleIcon,
  bucket: BucketIcon,
  tub: TubIcon,
  dropper: DropperIcon,
  pencil: PencilIcon,
  door: DoorIcon,
  melon: MelonIcon,
  apple: AppleIcon,
  child: ChildIcon,
  milk: MilkIcon,
  sack: SackIcon,
  tree: TreeIcon,
  book: BookIcon,
  can: CanIcon
} as const;
export type IconKind = keyof typeof ICONS;

/** Egyetlen ikon a kártya közepén. */
export const IconCard: React.FC<{ kind: IconKind; small?: boolean; fill?: number }> = ({ kind, small = false, fill }) => {
  const W = small ? 80 : 150;
  const WIDE: Partial<Record<IconKind, [number, number]>> = { ruler: [0.78, 1.35], pencil: [0.78, 1.35], tape: [0.78, 1.3], tub: [0.76, 0.84] };
  const s = WIDE[kind] ? WIDE[kind]![small ? 0 : 1] : small ? 0.72 : 0.78;
  const C = ICONS[kind] as React.FC<any>;
  const extra = kind === 'jug' ? { fill: fill ?? 6 } : kind === 'glass' ? { fill: fill ?? 0.7 } : {};
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <Ico x={(W - 100 * s) / 2} y={(80 - 100 * s) / 2} s={s}>
        <C sw={4.5} {...extra} />
      </Ico>
    </svg>
  );
};

/** Méterrudak (1 m) és egy rövidebb darab (cm). Párosító: 150 × 80. */
export const MeterSticksCard: React.FC<{ m?: number; cm?: number; small?: boolean }> = ({ m = 1, cm = 0, small = false }) => {
  const W = small ? 80 : 150;
  const full = small ? 62 : 120;
  const rows = m + (cm ? 1 : 0);
  const gap = rows > 2 ? 22 : 26;
  const y0 = 40 - (rows * gap) / 2 + 3;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: m }, (_, i) => (
        <g key={i}>
          <rect x={(W - full) / 2} y={y0 + i * gap} width={full} height="18" rx="3" fill="#fde047" stroke="#a16207" strokeWidth="3" />
          <text x={W / 2} y={y0 + i * gap + 15} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#713f12">1 m</text>
        </g>
      ))}
      {cm > 0 && (
        <g>
          <rect x={(W - full) / 2} y={y0 + m * gap} width={(full * cm) / 100} height="18" rx="3" fill="#86efac" stroke="#166534" strokeWidth="3" />
          <text x={(W - full) / 2 + (full * cm) / 200} y={y0 + m * gap + 15} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">{cm} cm</text>
        </g>
      )}
    </svg>
  );
};

/** 1 l-es palackok és 1 dl-es poharak. */
export const BottlesGlassesCard: React.FC<{ l?: number; dl?: number; small?: boolean }> = ({ l = 1, dl = 0, small = false }) => {
  const W = small ? 80 : 150;
  const bw = 34;
  const gw = dl ? Math.min(18, (W - 4 - l * (bw + 4)) / dl - 3) : 18;
  const gs = (0.3 * gw) / 18;
  const total = l * (bw + 4) + dl * (gw + 3);
  let x = (W - total) / 2;
  const parts: React.ReactNode[] = [];
  for (let i = 0; i < l; i++) {
    parts.push(
      <Ico key={`b${i}`} x={x - 19} y={6} s={0.68}>
        <BottleIcon sw={4} label="1 l" fs={22} />
      </Ico>
    );
    x += bw + 4;
  }
  for (let i = 0; i < dl; i++) {
    parts.push(
      <Ico key={`g${i}`} x={x - 24 * gs} y={72 - 92 * gs} s={gs}>
        <GlassIcon sw={8} fill={0.85} color="#7dd3fc" />
      </Ico>
    );
    x += gw + 3;
  }
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {parts}
    </svg>
  );
};

/** Felirat egy ikon alatt (sorter, 80 × 80): pl. súly „5 kg”, palack „1 l”. */
export const LabelledIconCard: React.FC<{ kind: 'weight' | 'bottle' | 'glass' | 'stick'; label: string }> = ({ kind, label }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {kind === 'weight' && <Weight cx={40} by={70} w={60} label={label} kg fs={20} />}
    {kind === 'bottle' && (
      <Ico x={8} y={4} s={0.72}>
        <BottleIcon sw={4.5} label={label} fs={22} />
      </Ico>
    )}
    {kind === 'glass' && (
      <g>
        <Ico x={16} y={2} s={0.48}>
          <GlassIcon sw={6} fill={0.8} />
        </Ico>
        <text x="40" y="74" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{label}</text>
      </g>
    )}
    {kind === 'stick' && (
      <g>
        <rect x="6" y="28" width="68" height="22" rx="3" fill="#fde047" stroke="#a16207" strokeWidth="3" />
        <text x="40" y="46" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#713f12">{label}</text>
      </g>
    )}
  </svg>
);

/** Mérés közben (sorter, 80 × 80). */
export const ScenarioCard: React.FC<{ kind: 'pencilRuler' | 'appleBalance' | 'childScale' | 'jugPour' }> = ({ kind }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {kind === 'pencilRuler' && (
      <g>
        <Ico x={6} y={-4} s={0.68}>
          <PencilIcon sw={4.5} />
        </Ico>
        <Ico x={4} y={28} s={0.72}>
          <RulerIcon sw={4.5} ticks={6} />
        </Ico>
      </g>
    )}
    {kind === 'appleBalance' && (
      <Ico x={2} y={6} s={0.76}>
        <BalanceIcon sw={4.5} tilt={0} left={<Ico x={-12} y={-24} s={0.24}><AppleIcon sw={10} /></Ico>} right={<Weight cx={0} by={0} w={22} label="" />} />
      </Ico>
    )}
    {kind === 'childScale' && (
      <g>
        <Ico x={16} y={36} s={0.48}>
          <BathScaleIcon sw={6} />
        </Ico>
        <Ico x={19} y={0} s={0.42}>
          <ChildIcon sw={7} />
        </Ico>
      </g>
    )}
    {kind === 'jugPour' && (
      <g>
        <Ico x={30} y={22} s={0.56}>
          <JugIcon sw={5} fill={4} />
        </Ico>
        <g transform="rotate(35 26 26)">
          <Ico x={8} y={4} s={0.36}>
            <GlassIcon sw={8} fill={0.6} color="#7dd3fc" />
          </Ico>
        </g>
        <path d="M34 34 Q38 42 40 50" stroke="#38bdf8" strokeWidth="3.5" fill="none" />
      </g>
    )}
  </svg>
);

