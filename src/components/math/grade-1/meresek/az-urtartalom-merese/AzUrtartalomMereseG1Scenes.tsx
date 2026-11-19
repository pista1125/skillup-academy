// „Az űrtartalom mérése” – a mese és a játék képei (locsolás a Számkertben: poharak, bögrék, vödör, kancsó, mérőedény).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';

const WATER = '#60a5fa';
const WATER_D = '#1d4ed8';

export const garden = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 60} Q${w / 3} ${h - 85} ${w / 2} ${h - 65} T${w} ${h - 70} V${h} H0 Z`} fill="#86efac" />
  </>
);

export type VesselKind = 'pohar' | 'bogre' | 'csesze' | 'kanal' | 'vodor' | 'kanna' | 'hordo' | 'palack' | 'labas' | 'kancso' | 'kupak';

export const VESSEL_SAY: Record<VesselKind, string> = {
  pohar: 'pohár',
  bogre: 'bögre',
  csesze: 'csésze',
  kanal: 'kanál',
  vodor: 'vödör',
  kanna: 'locsolókanna',
  hordo: 'hordó',
  palack: 'palack',
  labas: 'lábas',
  kancso: 'kancsó',
  kupak: 'kupak',
};

/** Pohár (trapéz) fill: 0..1 vízszint. Alja yb-n, közepe x-en. */
export const glass = (x: number, yb: number, w: number, h: number, fill = 0, key: React.Key = 'g', label?: string) => {
  const bw = w * 0.78;
  const lx = (t: number) => x - (bw / 2 + ((w - bw) / 2) * t);
  const rx = (t: number) => x + (bw / 2 + ((w - bw) / 2) * t);
  return (
    <g key={key}>
      {fill > 0 && <path d={`M${lx(0)} ${yb} L${lx(fill)} ${yb - h * fill} L${rx(fill)} ${yb - h * fill} L${rx(0)} ${yb} Z`} fill={WATER} />}
      <path d={`M${lx(1)} ${yb - h} L${lx(0)} ${yb} L${rx(0)} ${yb} L${rx(1)} ${yb - h}`} fill="none" stroke="#475569" strokeWidth="3" strokeLinejoin="round" />
      {label && (
        <text x={x} y={yb - h * 0.4} textAnchor="middle" fontSize={Math.max(9, w * 0.32)} fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">
          {label}
        </text>
      )}
    </g>
  );
};

/** Edény alja yb-n, közepe x-en, s méretszorzó (alap kb. 40 px magas). */
export const vessel = (k: VesselKind, x: number, yb: number, s = 1, fill = 0, key: React.Key = 'v'): React.ReactElement => {
  const T = (c: React.ReactNode) => (
    <g key={key} transform={`translate(${x} ${yb}) scale(${s})`}>
      {c}
    </g>
  );
  switch (k) {
    case 'pohar':
      return T(glass(0, 0, 26, 36, fill));
    case 'bogre':
      return T(
        <>
          <path d="M13 -30 Q28 -30 28 -18 Q28 -8 13 -8" fill="none" stroke="#be123c" strokeWidth="5" />
          <rect x="-16" y="-38" width="32" height="38" rx="5" fill="#fb7185" stroke="#9f1239" strokeWidth="3" />
          {fill > 0 && <rect x="-13" y={-35 + 0} width="26" height="5" fill={WATER} />}
        </>
      );
    case 'csesze':
      return T(
        <>
          <path d="M-24 0 H24" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
          <path d="M12 -18 Q22 -18 20 -10 Q18 -5 10 -6" fill="none" stroke="#a16207" strokeWidth="3.5" />
          <path d="M-15 -22 H15 Q14 -3 0 -3 Q-14 -3 -15 -22 Z" fill="#fde68a" stroke="#a16207" strokeWidth="3" />
        </>
      );
    case 'kanal':
      return T(
        <>
          <ellipse cx="-16" cy="-8" rx="9" ry="6" fill="#e2e8f0" stroke="#475569" strokeWidth="2.5" />
          <path d="M-7 -8 L22 -14" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case 'vodor':
      return T(
        <>
          <path d="M-22 -40 Q0 -64 22 -40" fill="none" stroke="#475569" strokeWidth="3" />
          <path d="M-24 -40 H24 L18 0 H-18 Z" fill="#facc15" stroke="#a16207" strokeWidth="3" strokeLinejoin="round" />
          {fill > 0 && <path d="M-22 -36 H22" stroke={WATER_D} strokeWidth="4" />}
        </>
      );
    case 'kanna':
      return T(
        <>
          <path d="M18 -30 L40 -48" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
          <path d="M36 -52 L46 -44" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          <path d="M-18 -44 Q-30 -44 -30 -30 Q-30 -18 -18 -16" fill="none" stroke="#64748b" strokeWidth="5" />
          <rect x="-20" y="-44" width="40" height="44" rx="6" fill="#94a3b8" stroke="#334155" strokeWidth="3" />
        </>
      );
    case 'hordo':
      return T(
        <>
          <path d="M-22 -56 Q-30 -28 -22 0 H22 Q30 -28 22 -56 Z" fill="#b45309" stroke="#451a03" strokeWidth="3" />
          <path d="M-26 -42 H26 M-26 -14 H26" stroke="#451a03" strokeWidth="4" />
        </>
      );
    case 'palack':
      return T(
        <>
          <path d="M-5 -50 H5 V-42 Q12 -36 12 -28 V0 H-12 V-28 Q-12 -36 -5 -42 Z" fill="#bae6fd" stroke="#0369a1" strokeWidth="3" strokeLinejoin="round" />
          <rect x="-6" y="-56" width="12" height="7" rx="2" fill="#2563eb" />
        </>
      );
    case 'labas':
      return T(
        <>
          <rect x="-26" y="-32" width="52" height="32" rx="5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" />
          <path d="M-34 -26 H-26 M26 -26 H34" stroke="#7f1d1d" strokeWidth="5" strokeLinecap="round" />
          <rect x="-28" y="-36" width="56" height="6" rx="3" fill="#dc2626" stroke="#7f1d1d" strokeWidth="2" />
        </>
      );
    case 'kancso':
      return T(
        <>
          <path d="M14 -34 Q30 -32 26 -18 Q22 -8 13 -8" fill="none" stroke="#475569" strokeWidth="4" />
          {fill > 0 && <rect x="-16" y={-40 * fill} width="32" height={40 * fill} fill={WATER} />}
          <path d="M-18 -44 L-22 -48 M-16 -44 Q-18 -20 -16 0 H16 Q18 -20 16 -44 Z" fill="none" stroke="#475569" strokeWidth="3" strokeLinejoin="round" />
          <text x="0" y="-16" textAnchor="middle" fontSize="11" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">1 l</text>
        </>
      );
    case 'kupak':
    default:
      return T(<rect x="-7" y="-8" width="14" height="8" rx="2" fill="#2563eb" stroke="#1e3a8a" strokeWidth="2" />);
  }
};

/** Edény kártyaképként. */
export const VesselFig: React.FC<{ k: VesselKind; fill?: number; className?: string }> = ({ k, fill = 0, className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    {vessel(k, 40, 74, k === 'kanal' || k === 'kupak' ? 1.6 : k === 'hordo' ? 1.2 : 1.35, fill)}
  </svg>
);

/** Pohár adott vízszinttel kártyaképként. */
export const GlassFig: React.FC<{ fill: number; overflow?: boolean; className?: string }> = ({ fill, overflow = false, className = 'w-16 h-20' }) => (
  <svg viewBox="0 0 70 80" className={className}>
    {glass(35, 74, 40, 56, fill)}
    {overflow && <path d="M15 18 Q8 40 10 70 M55 18 Q62 40 60 70" fill="none" stroke={WATER} strokeWidth="5" strokeLinecap="round" />}
    {overflow && <ellipse cx="35" cy="76" rx="32" ry="4" fill={WATER} opacity="0.7" />}
  </svg>
);

/** Mérőedény 10 beosztással (1 dl-enként), dl deciliter vízzel. */
export const measureJug = (x: number, yb: number, h: number, dl: number, key: React.Key = 'm') => {
  const w = h * 0.45;
  return (
    <g key={key}>
      {dl > 0 && <rect x={x - w / 2 + 2} y={yb - (h * dl) / 11} width={w - 4} height={(h * dl) / 11} fill={WATER} />}
      <path d={`M${x + w / 2} ${yb - h * 0.85} Q${x + w / 2 + w * 0.45} ${yb - h * 0.8} ${x + w / 2 + w * 0.35} ${yb - h * 0.5} Q${x + w / 2 + w * 0.25} ${yb - h * 0.3} ${x + w / 2} ${yb - h * 0.3}`} fill="none" stroke="#475569" strokeWidth="4" />
      <path d={`M${x - w / 2} ${yb - h} V${yb} H${x + w / 2} V${yb - h}`} fill="none" stroke="#475569" strokeWidth="3.5" strokeLinejoin="round" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${x - w / 2} ${yb - (h * (i + 1)) / 11} h${i === 9 ? 18 : 10}`} stroke="#1e293b" strokeWidth={i === 9 ? 3.5 : 2.5} />
      ))}
      <text x={x - w / 2 + 22} y={yb - (h * 10) / 11 + 5} fontSize={h * 0.08} fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">1 l</text>
    </g>
  );
};
export const MeasureJugFig: React.FC<{ dl: number; className?: string }> = ({ dl, className = 'w-16 h-24' }) => (
  <svg viewBox="0 0 80 120" className={className}>
    {measureJug(34, 114, 104, dl)}
  </svg>
);

/** Tálca n darab 1 dl-es pohárral. */
export const TrayFig: React.FC<{ n: number; className?: string; label?: boolean }> = ({ n, className = 'w-36 h-16', label = false }) => {
  const per = 5;
  const rows = Math.ceil(n / per);
  return (
    <svg viewBox="0 0 200 100" className={className}>
      <rect x="6" y="84" width="188" height="10" rx="4" fill="#c2410c" stroke="#7c2d12" strokeWidth="2.5" />
      {Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / per);
        const col = i % per;
        const cnt = Math.min(per, n - row * per);
        return glass(100 + (col - (cnt - 1) / 2) * 36, 82 - (rows - 1 - row) * 36, 26, 32, 0.8, i, label ? "1 dl" : undefined);
      })}
    </svg>
  );
};

// ---------- meseoldalak ----------

export const HelloScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    <circle cx="420" cy="45" r="28" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
    <Potyi mood="think" dots={7} x={10} y={50} size={150} />
    {[200, 260, 320].map((x) => (
      <g key={x}>
        <path d={`M${x} 210 Q${x + 6} 180 ${x + 18} 165`} stroke="#15803d" strokeWidth="5" fill="none" />
        {ICONS.virag({ x: x + 22, y: 158, s: 0.9, color: '#d8b4fe' })}
      </g>
    ))}
    {vessel('kanna', 410, 210, 1.3)}
    {ICONS.csiga({ x: 400, y: 120, s: 1.2 })}
  </svg>
);

/** Edénysor a mesében. */
export const VesselsScene: React.FC<{ kinds: VesselKind[] }> = ({ kinds }) => {
  const step = 440 / kinds.length;
  return (
    <svg viewBox="0 0 480 180">
      <rect x="0" y="0" width="480" height="180" rx="18" fill="#fef3c7" />
      <path d="M20 160 H460" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
      {kinds.map((k, i) => vessel(k, 20 + step * i + step / 2, 158, k === 'kanal' || k === 'kupak' ? 1.8 : 1.8, 0, i))}
    </svg>
  );
};

/** Öntés: from → to; overflow: kifolyik. */
export const PourScene: React.FC<{ from: VesselKind; to: VesselKind; overflow?: boolean }> = ({ from, to, overflow = false }) => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#fef3c7" />
    <g transform="rotate(-50 170 90)">{vessel(from, 170, 110, 1.8, 0)}</g>
    <path d="M222 80 Q250 100 252 140" fill="none" stroke={WATER} strokeWidth="7" strokeLinecap="round" />
    {vessel(to, 270, 205, 1.8, 0.5)}
    {overflow && (
      <>
        <path d="M232 134 Q216 160 222 200 M306 134 Q324 160 318 200" fill="none" stroke={WATER} strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="270" cy="208" rx="90" ry="7" fill={WATER} opacity="0.7" />
      </>
    )}
  </svg>
);

/** Edény és mellette n pohár (ennyi pohár víz fért bele). */
export const CupsToVesselScene: React.FC<{ rows: { k: VesselKind; n: number }[] }> = ({ rows }) => {
  return (
    <svg viewBox={`0 0 480 ${Math.max(140, rows.length * 80 + 20)}`}>
      <rect x="0" y="0" width="480" height={Math.max(140, rows.length * 80 + 20)} rx="18" fill="#fef3c7" />
      {rows.map((r, i) => {
        const yb = rows.length === 1 ? 120 : 80 + i * 80;
        return (
          <g key={i}>
            {vessel(r.k, 60, yb, rows.length === 1 ? 2 : 1.3, 0, `v${i}`)}
            {Array.from({ length: r.n }, (_, j) => glass(140 + j * 36, yb, 26, 34, 0.85, `g${i}-${j}`))}
          </g>
        );
      })}
    </svg>
  );
};

/** Ki hányszor fordult: kis pohár n-szer, nagy bögre m-szer ugyanazért a vödörért. */
export const TripsScene: React.FC<{ small: number; big: number }> = ({ small, big }) => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef3c7" />
    {ICONS.meh({ x: 40, y: 55, s: 1.1 })}
    {Array.from({ length: small }, (_, j) => glass(95 + j * 34, 75, 22, 30, 0.85, `s${j}`))}
    {vessel('vodor', 430, 85, 1.4, 1, 'v1')}
    {ICONS.csiga({ x: 40, y: 150, s: 1.1 })}
    {Array.from({ length: big }, (_, j) => vessel('bogre', 100 + j * 60, 175, 1.2, 1, `b${j}`))}
    {vessel('vodor', 430, 185, 1.4, 1, 'v2')}
  </svg>
);

/** Két edény és köztük egy üres jelhely. */
export const CompareScene: React.FC<{ a: VesselKind; b: VesselKind }> = ({ a, b }) => (
  <svg viewBox="0 0 480 180">
    <rect x="0" y="0" width="480" height="180" rx="18" fill="#fef3c7" />
    {vessel(a, 110, 160, 2.2, 0, 'a')}
    <rect x="210" y="60" width="60" height="60" rx="10" fill="#fff" stroke="#7c3aed" strokeWidth="4" strokeDasharray="8 6" />
    {vessel(b, 370, 160, 2.2, 0, 'b')}
  </svg>
);

/** 10 db 1 dl-es pohár és az 1 literes kancsó. */
export const LiterScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef3c7" />
    {Array.from({ length: 10 }, (_, i) => glass(50 + (i % 5) * 50, i < 5 ? 90 : 170, 34, 48, 0.85, i, '1 dl'))}
    {vessel('kancso', 375, 175, 3, 0.9)}
  </svg>
);

/** Lábas és mellette n teli 1 literes kancsó. */
export const PotJugsScene: React.FC<{ n: number; pot?: VesselKind }> = ({ n, pot = 'labas' }) => (
  <svg viewBox="0 0 480 180">
    <rect x="0" y="0" width="480" height="180" rx="18" fill="#fef3c7" />
    {vessel(pot, 80, 150, 2.2, 0)}
    {Array.from({ length: n }, (_, i) => vessel('kancso', 200 + i * 70, 150, 1.6, 0.9, i))}
  </svg>
);

/** Mérőedény nagyban, mellette (opcionálisan) n teli 1 dl-es pohár. */
export const MeasureScene: React.FC<{ dl: number; cups?: number }> = ({ dl, cups = 0 }) => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#fef3c7" />
    {measureJug(cups ? 120 : 220, 205, 190, dl)}
    {cups > 0 && Array.from({ length: cups }, (_, i) => glass(270 + i * 50, 200, 34, 46, 0.85, i, '1 dl'))}
    {cups > 0 && <text x={235} y={120} fontSize="34" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">+</text>}
  </svg>
);

/** Feliratos kártya (pl. „5 dl”) kis kancsóval. */
export const AmountFig: React.FC<{ text: string; className?: string }> = ({ text, className = 'w-24 h-16' }) => (
  <svg viewBox="0 0 120 70" className={className}>
    <rect x="3" y="3" width="114" height="64" rx="12" fill="#fff" stroke="#93c5fd" strokeWidth="3" />
    {glass(26, 58, 24, 34, 0.8)}
    <text x="78" y="46" textAnchor="middle" fontSize="26" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">{text}</text>
  </svg>
);

export const EndScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    {[200, 260, 320].map((x) => (
      <g key={x}>
        <path d={`M${x} 210 V160`} stroke="#15803d" strokeWidth="5" />
        {ICONS.virag({ x, y: 150, s: 1.1 })}
      </g>
    ))}
    <Potyi mood="cheer" dots={7} x={10} y={70} size={150} />
    {vessel('kanna', 410, 210, 1.3)}
    {ICONS.meh({ x: 400, y: 70, s: 1.2 })}
  </svg>
);
