// „Pálcikák és korongok” – figurák pálcikákból és korongokból (adat + rajz), és a mese képei.
import React from 'react';
import { Potyi } from '../../shared/Potyi';

export type PC = 'piros' | 'kek' | 'sarga' | 'zold';
export const PC_FILL: Record<PC, string> = { piros: '#ef4444', kek: '#2563eb', sarga: '#facc15', zold: '#22c55e' };
export const PC_WORD: Record<PC, string> = { piros: 'piros', kek: 'kék', sarga: 'sárga', zold: 'zöld' };

export type Part = { k: 's'; x1: number; y1: number; x2: number; y2: number; c: PC } | { k: 'd'; x: number; y: number; c: PC };
export type Figure = Part[];

const s = (x1: number, y1: number, x2: number, y2: number, c: PC): Part => ({ k: 's', x1, y1, x2, y2, c });
const d = (x: number, y: number, c: PC): Part => ({ k: 'd', x, y, c });

/** A figurák egy 120×120-as rácson. */
export const FIG = {
  nap: [d(60, 60, 'piros'), ...[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
    const r = (a * Math.PI) / 180;
    return s(Math.round(60 + 16 * Math.cos(r)), Math.round(60 + 16 * Math.sin(r)), Math.round(60 + 46 * Math.cos(r)), Math.round(60 + 46 * Math.sin(r)), 'sarga');
  })],
  baba: [d(60, 18, 'kek'), s(30, 31, 90, 31, 'sarga'), d(60, 42, 'piros'), d(60, 61, 'piros'), s(54, 68, 36, 110, 'zold'), s(66, 68, 84, 110, 'zold')],
  haz: [s(30, 104, 90, 104, 'kek'), s(30, 104, 30, 60, 'kek'), s(90, 104, 90, 60, 'kek'), s(30, 60, 90, 60, 'kek'), s(30, 60, 60, 24, 'piros'), s(60, 24, 90, 60, 'piros')],
  letra: [s(40, 10, 40, 110, 'sarga'), s(80, 10, 80, 110, 'sarga'), s(40, 32, 80, 32, 'piros'), s(40, 60, 80, 60, 'piros'), s(40, 88, 80, 88, 'piros')],
  roller: [s(34, 14, 66, 14, 'sarga'), s(50, 14, 50, 90, 'sarga'), s(50, 90, 98, 90, 'sarga'), d(52, 102, 'kek'), d(96, 102, 'kek')],
  szek: [s(36, 10, 36, 60, 'sarga'), s(36, 60, 86, 60, 'piros'), s(36, 60, 36, 110, 'piros'), s(86, 60, 86, 110, 'piros')],
  kapu: [s(34, 20, 34, 108, 'kek'), s(86, 20, 86, 108, 'kek'), s(34, 20, 86, 20, 'piros')],
  asztal: [s(20, 40, 100, 40, 'piros'), s(34, 40, 34, 104, 'kek'), s(86, 40, 86, 104, 'kek')],
  virag: [d(60, 38, 'piros'), ...[0, 60, 120, 180, 240, 300].map((a) => {
    const r = (a * Math.PI) / 180;
    return s(Math.round(60 + 14 * Math.cos(r)), Math.round(38 + 14 * Math.sin(r)), Math.round(60 + 32 * Math.cos(r)), Math.round(38 + 32 * Math.sin(r)), 'sarga');
  }), s(60, 72, 60, 112, 'zold')],
  fagyi: [d(48, 32, 'piros'), d(72, 32, 'piros'), d(60, 16, 'piros'), s(24, 44, 96, 44, 'sarga'), s(24, 44, 60, 110, 'sarga'), s(96, 44, 60, 110, 'sarga')],
  nyaloka: [d(60, 30, 'piros'), s(60, 42, 60, 108, 'sarga')],
  kerites: [s(20, 30, 20, 106, 'piros'), s(45, 30, 45, 106, 'kek'), s(70, 30, 70, 106, 'piros'), s(95, 30, 95, 106, 'kek'), s(12, 52, 104, 52, 'sarga'), s(12, 86, 104, 86, 'sarga')],
} satisfies Record<string, Figure>;
export type FigName = keyof typeof FIG;

export const FIG_NAME: Record<FigName, string> = {
  nap: 'nap', baba: 'pálcikababa', haz: 'ház', letra: 'létra', roller: 'roller', szek: 'szék', kapu: 'kapu', asztal: 'asztal', virag: 'virág', fagyi: 'fagyi', nyaloka: 'nyalóka', kerites: 'kerítés',
};

/** Tükrözés (jobb–bal csere). */
export const mirror = (f: Figure): Figure => f.map((p) => (p.k === 's' ? { ...p, x1: 120 - p.x1, x2: 120 - p.x2 } : { ...p, x: 120 - p.x }));
/** Fejjel lefelé. */
export const flip = (f: Figure): Figure => f.map((p) => (p.k === 's' ? { ...p, y1: 120 - p.y1, y2: 120 - p.y2 } : { ...p, y: 120 - p.y }));
/** Színcsere szabály szerint, pl. { sarga: 'piros', piros: 'kek' } – egyszerre minden elemre. */
export const recolor = (f: Figure, map: Partial<Record<PC, PC>>): Figure => f.map((p) => ({ ...p, c: map[p.c] ?? p.c }));
/** Csak a pálcikák / csak a korongok átszínezése. */
export const recolorKind = (f: Figure, k: 's' | 'd', c: PC): Figure => f.map((p) => (p.k === k ? { ...p, c } : p));
/** Egy elem elhagyása. */
export const without = (f: Figure, i: number): Figure => f.filter((_, j) => j !== i);

const partEl = (p: Part, i: number, ghost?: boolean) =>
  p.k === 's' ? (
    <g key={i}>
      <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="#1f2937" strokeWidth="9" strokeLinecap="round" opacity={ghost ? 0.15 : 1} />
      <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={ghost ? '#e2e8f0' : PC_FILL[p.c]} strokeWidth="6" strokeLinecap="round" />
    </g>
  ) : (
    <circle key={i} cx={p.x} cy={p.y} r="10" fill={ghost ? '#e2e8f0' : PC_FILL[p.c]} stroke="#1f2937" strokeWidth="2.5" opacity={ghost ? 0.7 : 1} />
  );

/** A figura rajza (a korongok kerülnek felülre). */
export const figEls = (f: Figure) => [...f.map((p, i) => (p.k === 's' ? partEl(p, i) : null)), ...f.map((p, i) => (p.k === 'd' ? partEl(p, i) : null))];

export const Fig: React.FC<{ f: Figure; className?: string; frame?: boolean; missing?: { x: number; y: number } }> = ({ f, className = 'w-24 h-24', frame = true, missing }) => (
  <svg viewBox="0 0 120 120" className={className}>
    {frame && <rect x="2" y="2" width="116" height="116" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />}
    {figEls(f)}
    {missing && (
      <g>
        <circle cx={missing.x} cy={missing.y} r="15" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" strokeDasharray="5 4" />
        <text x={missing.x} y={missing.y + 8} textAnchor="middle" fontSize="22" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
      </g>
    )}
  </svg>
);

export const figOpt = (f: Figure, say: string) => ({ figure: <Fig f={f} />, say });

/** Egyetlen elem képe: pálcika (álló, fekvő, ferde) vagy korong. */
export const Piece: React.FC<{ kind: 'allo' | 'fekvo' | 'ferde' | 'korong' | 'teto'; c: PC; className?: string }> = ({ kind, c, className = 'w-24 h-24' }) => {
  const f: Figure =
    kind === 'allo' ? [s(60, 18, 60, 102, c)] : kind === 'fekvo' ? [s(18, 60, 102, 60, c)] : kind === 'ferde' ? [s(28, 96, 92, 24, c)] : kind === 'teto' ? [s(20, 84, 60, 36, c), s(60, 36, 100, 84, c)] : [{ k: 'd', x: 60, y: 60, c }];
  return (
    <svg viewBox="0 0 120 120" className={className}>
      <rect x="2" y="2" width="116" height="116" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {kind === 'korong' ? <circle cx="60" cy="60" r="26" fill={PC_FILL[c]} stroke="#1f2937" strokeWidth="3" /> : figEls(f)}
    </svg>
  );
};

/** Sor (minta) elemekből; null = kérdőjel. */
export const PieceRow: React.FC<{ items: (React.ComponentProps<typeof Piece> | null)[] }> = ({ items }) => {
  const w = items.length * 80 + 20;
  return (
    <svg viewBox={`0 0 ${w} 100`}>
      <rect x="2" y="2" width={w - 4} height="96" rx="16" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      {items.map((it, i) =>
        it ? (
          <svg key={i} x={14 + i * 80} y="14" width="72" height="72" viewBox="0 0 120 120">
            <Piece {...it} className="" />
          </svg>
        ) : (
          <text key={i} x={50 + i * 80} y="68" textAnchor="middle" fontSize="44" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
            ?
          </text>
        )
      )}
    </svg>
  );
};

/** Figurák sorban (jelenethez). */
export const FigRow: React.FC<{ figs: (Figure | null)[]; bg?: string }> = ({ figs, bg = '#f0f9ff' }) => {
  const w = figs.length * 130 + 10;
  return (
    <svg viewBox={`0 0 ${w} 140`}>
      <rect x="0" y="0" width={w} height="140" rx="18" fill={bg} />
      {figs.map((f, i) =>
        f ? (
          <svg key={i} x={10 + i * 130} y="10" width="120" height="120" viewBox="0 0 120 120">
            <Fig f={f} className="" />
          </svg>
        ) : (
          <text key={i} x={70 + i * 130} y="92" textAnchor="middle" fontSize="60" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
            ?
          </text>
        )
      )}
    </svg>
  );
};

/** Színvarázs-szabály: festékfolt → festékfolt. */
export const RuleScene: React.FC<{ rules: [PC, PC][]; model: Figure }> = ({ rules, model }) => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fdf4ff" />
    <svg x="20" y="20" width="160" height="160" viewBox="0 0 120 120">
      <Fig f={model} className="" />
    </svg>
    {rules.map(([a, b], i) => {
      const y = 70 + i * 60 - (rules.length - 1) * 30;
      return (
        <g key={i}>
          <path d={`M222 ${y} q-8 -18 12 -18 q22 -2 22 16 q0 18 -18 16 q-18 2 -16 -14 z`} fill={PC_FILL[a]} stroke="#1f2937" strokeWidth="2" transform={`translate(0 ${18})`} />
          <path d={`M270 ${y + 16} H330`} stroke="#334155" strokeWidth="5" />
          <path d={`M324 ${y + 8} L336 ${y + 16} L324 ${y + 24}`} fill="none" stroke="#334155" strokeWidth="5" strokeLinejoin="round" />
          <path d={`M352 ${y} q-8 -18 12 -18 q22 -2 22 16 q0 18 -18 16 q-18 2 -16 -14 z`} fill={PC_FILL[b]} stroke="#1f2937" strokeWidth="2" transform={`translate(0 ${18})`} />
        </g>
      );
    })}
  </svg>
);

const sky = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 50} Q${w / 3} ${h - 74} ${w / 2} ${h - 52} T${w} ${h - 58} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** 1. oldal: Pötyi és az építődoboz. */
export const BuildBoxScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <rect x="250" y="120" width="190" height="90" rx="10" fill="#fde68a" stroke="#92400e" strokeWidth="5" />
    {(['piros', 'kek', 'sarga', 'zold'] as PC[]).map((c, i) => (
      <line key={c} x1={270 + i * 14} y1="128" x2={300 + i * 14} y2="40" stroke={PC_FILL[c]} strokeWidth="8" strokeLinecap="round" />
    ))}
    <circle cx="380" cy="104" r="16" fill={PC_FILL.piros} stroke="#1f2937" strokeWidth="3" />
    <circle cx="414" cy="110" r="16" fill={PC_FILL.kek} stroke="#1f2937" strokeWidth="3" />
    <Potyi mood="cheer" x={40} y={50} size={170} />
  </svg>
);

/** Pálcika és korong egymás mellett (bemutató kép). */
export const PiecesScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef9c3" />
    <line x1="60" y1="150" x2="210" y2="50" stroke="#1f2937" strokeWidth="15" strokeLinecap="round" />
    <line x1="60" y1="150" x2="210" y2="50" stroke={PC_FILL.zold} strokeWidth="11" strokeLinecap="round" />
    <circle cx="340" cy="100" r="50" fill={PC_FILL.piros} stroke="#1f2937" strokeWidth="5" />
    <text x="135" y="188" textAnchor="middle" fontSize="22" fontWeight="900" fill="#713f12" fontFamily="system-ui, sans-serif">pálcika</text>
    <text x="340" y="188" textAnchor="middle" fontSize="22" fontWeight="900" fill="#713f12" fontFamily="system-ui, sans-serif">korong</text>
  </svg>
);

/** Álló és fekvő pálcika (bemutató kép). */
export const StandLieScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    {sky(480, 200)}
    <line x1="140" y1="30" x2="140" y2="170" stroke="#1f2937" strokeWidth="14" strokeLinecap="round" />
    <line x1="140" y1="30" x2="140" y2="170" stroke={PC_FILL.kek} strokeWidth="10" strokeLinecap="round" />
    <line x1="260" y1="164" x2="420" y2="164" stroke="#1f2937" strokeWidth="14" strokeLinecap="round" />
    <line x1="260" y1="164" x2="420" y2="164" stroke={PC_FILL.piros} strokeWidth="10" strokeLinecap="round" />
    {/* kis Pötyi a fekvő pálcikán */}
    <Potyi mood="happy" x={300} y={92} size={70} />
  </svg>
);

/** Záró kép: pálcikakert. */
export const StickGardenScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <svg x="10" y="70" width="150" height="150" viewBox="0 0 120 120">
      {figEls(FIG.haz)}
    </svg>
    <svg x="300" y="10" width="110" height="110" viewBox="0 0 120 120">
      {figEls(FIG.nap)}
    </svg>
    <svg x="330" y="110" width="130" height="130" viewBox="0 0 120 120">
      {figEls(FIG.virag)}
    </svg>
    <Potyi mood="cheer" x={170} y={100} size={120} />
  </svg>
);
