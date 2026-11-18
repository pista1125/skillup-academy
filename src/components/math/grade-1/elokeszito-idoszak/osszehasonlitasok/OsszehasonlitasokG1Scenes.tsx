// „Összehasonlítások” – a mese és a játék képei. Minden összehasonlító kép ugyanabban a 100×100-as keretben van,
// így a válaszgombokon a méretek valóban összevethetők.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { COL, OBJ, ThingName } from '../valogatasok/ValogatasokG1Scenes';

export { COL };

const Frame: React.FC<{ children: React.ReactNode; className?: string; ground?: boolean; bg?: string }> = ({ children, className = 'w-24 h-24', ground, bg = '#fff' }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <rect x="3" y="3" width="94" height="94" rx="14" fill={bg} stroke="#94a3b8" strokeWidth="3" />
    {ground && <path d="M6 88 H94" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />}
    {children}
  </svg>
);

/** Fa: h = 0.3 … 1 (magasság). */
export const Tree: React.FC<{ h: number; className?: string; crown?: string }> = ({ h, className, crown = '#22c55e' }) => {
  const top = 88 - 76 * h;
  const r = 9 + 9 * h;
  return (
    <Frame ground className={className}>
      <rect x="46" y={top + r} width="8" height={88 - top - r} fill="#92400e" />
      <circle cx="50" cy={top + r} r={r} fill={crown} stroke="#15803d" strokeWidth="3" />
    </Frame>
  );
};

/** Virág: h = 0.3 … 1 (a szár magassága). */
export const Flower: React.FC<{ h: number; color?: string; className?: string }> = ({ h, color = COL.piros, className }) => {
  const top = 88 - 70 * h;
  return (
    <Frame ground className={className}>
      <path d={`M50 88 V${top}`} stroke="#16a34a" strokeWidth="4" />
      {OBJ.virag({ x: 50, y: top, s: 0.8, color })}
    </Frame>
  );
};

/** Szalag balról indulva: len = 0.2 … 1. */
export const Ribbon: React.FC<{ len: number; color?: string; className?: string; y?: number }> = ({ len, color = COL.kek, className }) => (
  <Frame className={className}>
    <path d="M10 14 V86" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
    <rect x="10" y="42" width={80 * len} height="16" rx="4" fill={color} stroke="#1f2937" strokeWidth="2.5" />
  </Frame>
);

/** Ceruza balról indulva: len = 0.3 … 1. */
export const Pencil: React.FC<{ len: number; color?: string; className?: string }> = ({ len, color = COL.sarga, className }) => {
  const L = 80 * len;
  return (
    <Frame className={className}>
      <path d="M10 14 V86" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
      <rect x="10" y="43" width={L - 12} height="14" fill={color} stroke="#713f12" strokeWidth="2.5" />
      <path d={`M${L - 2} 43 L${L + 10} 50 L${L - 2} 57 Z`} fill="#fde7c7" stroke="#713f12" strokeWidth="2.5" strokeLinejoin="round" />
    </Frame>
  );
};

/** Répa fektetve, balról indulva: len = 0.3 … 1. */
export const Carrot: React.FC<{ len: number; className?: string }> = ({ len, className }) => {
  const L = 72 * len;
  return (
    <Frame className={className}>
      <path d="M18 50 L6 40 M18 50 L4 50 M18 50 L6 60" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
      <path d={`M18 42 L${18 + L} 50 L18 58 Z`} fill={COL.narancs} stroke="#9a3412" strokeWidth="2.5" strokeLinejoin="round" />
    </Frame>
  );
};

/** Út (felülről): w = 0.2 … 1 (szélesség). */
export const Road: React.FC<{ w: number; className?: string }> = ({ w, className }) => {
  const W = 70 * w;
  return (
    <Frame className={className} bg="#bbf7d0">
      <rect x={50 - W / 2} y="6" width={W} height="88" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
      <path d="M50 10 V90" stroke="#fff" strokeWidth="3" strokeDasharray="8 6" />
    </Frame>
  );
};

/** Kerítésléc: w = 0.2 … 1 (szélesség). */
export const Plank: React.FC<{ w: number; color?: string; className?: string }> = ({ w, color = '#d97706', className }) => {
  const W = 50 * w;
  return (
    <Frame ground className={className}>
      <path d={`M${50 - W / 2} 88 V22 L50 12 L${50 + W / 2} 22 V88 Z`} fill={color} stroke="#78350f" strokeWidth="3" strokeLinejoin="round" />
    </Frame>
  );
};

/** Ecsetvonás: t = vastagság (2 … 16). */
export const Stroke: React.FC<{ t: number; color?: string; className?: string }> = ({ t, color = '#7c3aed', className }) => (
  <Frame className={className}>
    <path d="M14 66 Q32 30 50 50 T86 34" fill="none" stroke={color} strokeWidth={t} strokeLinecap="round" />
  </Frame>
);

/** Ág: t = vastagság. */
export const Branch: React.FC<{ t: number; className?: string }> = ({ t, className }) => (
  <Frame className={className}>
    <path d="M12 60 L88 40" stroke="#92400e" strokeWidth={t} strokeLinecap="round" />
    {OBJ.level({ x: 60, y: 34, s: 0.6 })}
  </Frame>
);

/** Kör, adott nagysággal (r: 6 … 40). */
export const Disc: React.FC<{ r: number; color?: string; className?: string }> = ({ r, color = COL.kek, className }) => (
  <Frame className={className}>
    <circle cx="50" cy="50" r={r} fill={color} stroke="#1f2937" strokeWidth="3" />
  </Frame>
);

/** Négyzet, adott oldallal (a: 10 … 76). */
export const Square: React.FC<{ a: number; color?: string; className?: string }> = ({ a, color = COL.zold, className }) => (
  <Frame className={className}>
    <rect x={50 - a / 2} y={50 - a / 2} width={a} height={a} fill={color} stroke="#1f2937" strokeWidth="3" />
  </Frame>
);

/** Tárgy kisebb vagy nagyobb méretben (s: 0.5 … 1.5). */
export const Sized: React.FC<{ n: ThingName; s: number; color?: string; className?: string }> = ({ n, s, color, className }) => (
  <Frame className={className}>{OBJ[n]({ x: 50, y: 52, s: 1.5 * s, color })}</Frame>
);

/** Ház: w szélesség (0.3 … 1), h magasság (0.3 … 1). */
export const House: React.FC<{ w: number; h: number; className?: string; wall?: string }> = ({ w, h, className, wall = '#fde68a' }) => {
  const W = 80 * w;
  const H = 52 * h;
  const x = 50 - W / 2;
  const y = 88 - H;
  return (
    <Frame ground className={className}>
      <rect x={x} y={y} width={W} height={H} fill={wall} stroke="#78350f" strokeWidth="3" />
      <path d={`M${x - 4} ${y} L50 ${y - 18} L${x + W + 4} ${y} Z`} fill={COL.piros} stroke="#7f1d1d" strokeWidth="3" strokeLinejoin="round" />
      <rect x="45" y="74" width="10" height="14" fill="#92400e" />
    </Frame>
  );
};

/** Gyerek: h = 0.4 … 1. */
export const Kid: React.FC<{ h: number; shirt: string; className?: string }> = ({ h, shirt, className }) => {
  const H = 76 * h;
  const top = 88 - H;
  const head = H * 0.14;
  return (
    <Frame ground className={className}>
      <rect x={42} y={top + 2 * head + H * 0.38} width="6" height={H * 0.34} fill="#1e3a8a" />
      <rect x={52} y={top + 2 * head + H * 0.38} width="6" height={H * 0.34} fill="#1e3a8a" />
      <rect x="38" y={top + 2 * head} width="24" height={H * 0.4} rx="6" fill={shirt} stroke="#1f2937" strokeWidth="2" />
      <circle cx="50" cy={top + head} r={head} fill="#fcd9b6" stroke="#9a3412" strokeWidth="2" />
    </Frame>
  );
};

/** Torony kockákból: n kocka, mindegyik a oldalú. */
export const Tower: React.FC<{ n: number; a: number; color?: string; className?: string }> = ({ n, a, color = COL.narancs, className }) => (
  <Frame ground className={className}>
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={50 - a / 2} y={88 - (i + 1) * a} width={a} height={a} fill={color} stroke="#7c2d12" strokeWidth="2" />
    ))}
  </Frame>
);

export type ShapeKind = 'kor' | 'negyzet' | 'haromszog' | 'teglalap' | 'csillag' | 'sziv';
const shapeEl = (k: ShapeKind, color: string, s = 1) => {
  switch (k) {
    case 'kor':
      return <circle cx="50" cy="50" r={30 * s} fill={color} stroke="#1f2937" strokeWidth="3" />;
    case 'negyzet':
      return <rect x={50 - 28 * s} y={50 - 28 * s} width={56 * s} height={56 * s} fill={color} stroke="#1f2937" strokeWidth="3" />;
    case 'haromszog':
      return <path d={`M50 ${50 - 32 * s} L${50 + 34 * s} ${50 + 26 * s} L${50 - 34 * s} ${50 + 26 * s} Z`} fill={color} stroke="#1f2937" strokeWidth="3" strokeLinejoin="round" />;
    case 'teglalap':
      return <rect x={50 - 36 * s} y={50 - 20 * s} width={72 * s} height={40 * s} fill={color} stroke="#1f2937" strokeWidth="3" />;
    case 'csillag':
      return <g transform={`translate(50 52) scale(${1.7 * s})`}>{OBJ.csillag({ x: 0, y: 0, color })}</g>;
    case 'sziv':
      return <g transform={`translate(50 52) scale(${1.8 * s})`}>{OBJ.szív({ x: 0, y: 0, color })}</g>;
  }
};
export const SHAPE_NAME: Record<ShapeKind, string> = { kor: 'kör', negyzet: 'négyzet', haromszog: 'háromszög', teglalap: 'téglalap', csillag: 'csillag', sziv: 'szív' };

/** Síkidom keretben. */
export const Shape: React.FC<{ k: ShapeKind; color: string; s?: number; className?: string }> = ({ k, color, s, className }) => <Frame className={className}>{shapeEl(k, color, s)}</Frame>;

const SHADOW_FILTER = (
  <defs>
    <filter id="g1-osszeh-shadow">
      <feFlood floodColor="#334155" />
      <feComposite in2="SourceAlpha" operator="in" />
    </filter>
  </defs>
);

/** Árnyékkép: tárgy vagy síkidom fekete-szürke sziluettje. */
export const Shadow: React.FC<{ n?: ThingName; k?: ShapeKind; className?: string }> = ({ n, k, className }) => (
  <Frame className={className} bg="#f1f5f9">
    {SHADOW_FILTER}
    <g filter="url(#g1-osszeh-shadow)">{n ? OBJ[n]({ x: 50, y: 52, s: 1.6 }) : k ? shapeEl(k, '#000') : null}</g>
  </Frame>
);

/** Sor kis képekből (pl. kicsitől a nagyig) – egyetlen kártya. */
export const SizeRow: React.FC<{ rs: number[]; color?: string; className?: string }> = ({ rs, color = COL.piros, className = 'w-36 h-16' }) => (
  <svg viewBox="0 0 150 60" className={className}>
    <rect x="2" y="2" width="146" height="56" rx="12" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    {rs.map((r, i) => (
      <circle key={i} cx={30 + i * 45} cy={50 - r} r={r} fill={color} stroke="#1f2937" strokeWidth="2" />
    ))}
  </svg>
);

/** Képek egymás mellett (a kérdés jelenete). */
export const Lineup: React.FC<{ children: React.ReactNode[]; bg?: string }> = ({ children, bg = '#f0f9ff' }) => {
  const w = children.length * 110 + 10;
  return (
    <svg viewBox={`0 0 ${w} 120`}>
      <rect x="0" y="0" width={w} height="120" rx="18" fill={bg} />
      {children.map((c, i) => (
        <svg key={i} x={10 + i * 110} y="10" width="100" height="100" viewBox="0 0 100 100">
          {c}
        </svg>
      ))}
    </svg>
  );
};

const sky = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 50} Q${w / 3} ${h - 74} ${w / 2} ${h - 52} T${w} ${h - 58} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** Kezdő oldal: verseny-zászlók a Számkertben. */
export const RaceStartScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <path d="M20 40 Q240 90 460 40" fill="none" stroke="#64748b" strokeWidth="3" />
    {Array.from({ length: 9 }, (_, i) => {
      const x = 40 + i * 50;
      const y = 40 + 50 * Math.sin((Math.PI * (x - 20)) / 440) * 0.9;
      return <path key={i} d={`M${x - 12} ${y} L${x + 12} ${y} L${x} ${y + 24} Z`} fill={[COL.piros, COL.sarga, COL.kek, COL.zold][i % 4]} />;
    })}
    <Potyi mood="cheer" x={170} y={80} size={140} />
    {OBJ.meh({ x: 90, y: 150, s: 1.6 })}
    {OBJ.csiga({ x: 390, y: 200, s: 1.6 })}
  </svg>
);

/** Két virág: magasabb és alacsonyabb (magyarázó kép). */
export const TallShortScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <path d="M150 210 V60" stroke="#16a34a" strokeWidth="8" />
    {OBJ.virag({ x: 150, y: 56, s: 2, color: COL.sarga })}
    <path d="M330 210 V150" stroke="#16a34a" strokeWidth="8" />
    {OBJ.virag({ x: 330, y: 146, s: 2, color: COL.lila })}
    <path d="M190 56 H226" stroke="#7c3aed" strokeWidth="4" strokeDasharray="6 5" />
    <text x="150" y="232" textAnchor="middle" fontSize="20" fontWeight="900" fill="#14532d" fontFamily="system-ui, sans-serif">magasabb</text>
    <text x="330" y="232" textAnchor="middle" fontSize="20" fontWeight="900" fill="#14532d" fontFamily="system-ui, sans-serif">alacsonyabb</text>
  </svg>
);

/** Csigaverseny: három csiga, a csíkjuk mutatja, meddig jutottak. dist: 0.2 … 1. */
export const SnailRaceScene: React.FC<{ snails: { color: string; dist: number }[] }> = ({ snails }) => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#dcfce7" />
    <path d="M40 10 V210" stroke="#64748b" strokeWidth="4" strokeDasharray="8 6" />
    {snails.map((sn, i) => {
      const y = 40 + i * 66;
      const end = 40 + 380 * sn.dist;
      return (
        <g key={i}>
          <path d={`M40 ${y + 14} H${end - 20}`} stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
          {OBJ.csiga({ x: end, y, s: 1.3, color: sn.color })}
        </g>
      );
    })}
  </svg>
);

/** Záró oldal: dobogó. */
export const PodiumScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <rect x="190" y="130" width="100" height="90" fill="#facc15" stroke="#a16207" strokeWidth="4" />
    <rect x="90" y="160" width="100" height="60" fill="#cbd5e1" stroke="#64748b" strokeWidth="4" />
    <rect x="290" y="180" width="100" height="40" fill="#fdba74" stroke="#9a3412" strokeWidth="4" />
    <Potyi mood="cheer" x={200} y={40} size={90} />
    {OBJ.meh({ x: 140, y: 136, s: 1.3 })}
    {OBJ.csiga({ x: 340, y: 160, s: 1.3 })}
  </svg>
);
