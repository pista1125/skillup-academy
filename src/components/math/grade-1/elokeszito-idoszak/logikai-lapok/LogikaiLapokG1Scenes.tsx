// „Logikai lapok” – a lapok rajza és a mese képei. Egy lap: alak (kör, négyzet, háromszög), szín (piros, kék, sárga, zöld),
// nagyság (nagy, kicsi), lyukas vagy nem lyukas.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { Basket, COL } from '../valogatasok/ValogatasokG1Scenes';

export type LapShape = 'kor' | 'negyzet' | 'haromszog';
export type LapColor = 'piros' | 'kek' | 'sarga' | 'zold';
export interface LapSpec {
  sh: LapShape;
  c: LapColor;
  big?: boolean;
  hole?: boolean;
}

export const LAP_FILL: Record<LapColor, string> = { piros: COL.piros, kek: '#2563eb', sarga: COL.sarga, zold: COL.zold };
const SHAPE_WORD: Record<LapShape, string> = { kor: 'kör', negyzet: 'négyzet', haromszog: 'háromszög' };
const COLOR_WORD: Record<LapColor, string> = { piros: 'piros', kek: 'kék', sarga: 'sárga', zold: 'zöld' };

/** A lap neve felolvasáshoz: „nagy, kék, lyukas háromszög”. */
export const lapName = (l: LapSpec, opts: { size?: boolean; hole?: boolean } = {}) => {
  const adj = [opts.size !== false ? (l.big !== false ? 'nagy' : 'kicsi') : null, COLOR_WORD[l.c], opts.hole !== false && l.hole ? 'lyukas' : null].filter(Boolean);
  return `${adj.join(', ')} ${SHAPE_WORD[l.sh]}`;
};

/** A lap rajza egy SVG-n belül (cx, cy középpont, R = a nagy lap „sugara”). */
export const lapEl = (l: LapSpec, cx: number, cy: number, R = 36, key?: React.Key) => {
  const r = l.big === false ? R * 0.55 : R;
  const fill = LAP_FILL[l.c];
  const stroke = '#1f2937';
  let shape: React.ReactNode;
  if (l.sh === 'kor') shape = <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth="2.5" />;
  else if (l.sh === 'negyzet') shape = <rect x={cx - r * 0.88} y={cy - r * 0.88} width={r * 1.76} height={r * 1.76} fill={fill} stroke={stroke} strokeWidth="2.5" />;
  else shape = <path d={`M${cx} ${cy - r} L${cx + r * 1.05} ${cy + r * 0.8} L${cx - r * 1.05} ${cy + r * 0.8} Z`} fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />;
  const hy = l.sh === 'haromszog' ? cy + r * 0.25 : cy;
  return (
    <g key={key}>
      {shape}
      {l.hole && <circle cx={cx} cy={hy} r={Math.max(3.5, r * 0.16)} fill="#fff" stroke={stroke} strokeWidth="1.5" />}
    </g>
  );
};

/** Egy lap keretben (válaszgomb, kártya). */
export const Lap: React.FC<LapSpec & { className?: string; frame?: boolean }> = ({ className = 'w-24 h-24', frame = true, ...l }) => (
  <svg viewBox="0 0 100 100" className={className}>
    {frame && <rect x="3" y="3" width="94" height="94" rx="14" fill="#fff" stroke="#94a3b8" strokeWidth="3" />}
    {lapEl(l, 50, 52)}
  </svg>
);

export const lapOpt = (l: LapSpec, say?: string, className?: string) => ({ figure: <Lap {...l} className={className} />, say: say ?? lapName(l) });

/** Lapok sora; null = üres hely kérdőjellel. */
export const LapRow: React.FC<{ items: (LapSpec | null)[]; bg?: string }> = ({ items, bg = '#fff' }) => {
  const w = items.length * 90 + 20;
  return (
    <svg viewBox={`0 0 ${w} 110`}>
      <rect x="2" y="2" width={w - 4} height="106" rx="18" fill={bg} stroke="#cbd5e1" strokeWidth="3" />
      {items.map((it, i) =>
        it ? (
          lapEl(it, 55 + i * 90, 56, 32, i)
        ) : (
          <g key={i}>
            <rect x={55 + i * 90 - 36} y="20" width="72" height="72" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" strokeDasharray="7 5" />
            <text x={55 + i * 90} y="72" textAnchor="middle" fontSize="44" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
          </g>
        )
      )}
    </svg>
  );
};

/** „Mi változott?” táblázat: felső sor → alsó sor; az utolsó alsó hely „?”. */
export const RuleTable: React.FC<{ top: LapSpec[]; bottom: (LapSpec | null)[] }> = ({ top, bottom }) => {
  const n = top.length;
  const w = n * 100 + 20;
  return (
    <svg viewBox={`0 0 ${w} 220`}>
      <rect x="2" y="2" width={w - 4} height="216" rx="18" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      <path d={`M10 110 H${w - 10}`} stroke="#1e3a8a" strokeWidth="3" />
      {Array.from({ length: n - 1 }, (_, i) => (
        <path key={i} d={`M${110 + i * 100} 10 V210`} stroke="#1e3a8a" strokeWidth="2" />
      ))}
      {top.map((t, i) => lapEl(t, 60 + i * 100, 58, 34, `t${i}`))}
      {bottom.map((b, i) =>
        b ? (
          lapEl(b, 60 + i * 100, 164, 34, `b${i}`)
        ) : (
          <text key={`q${i}`} x={60 + i * 100} y="182" textAnchor="middle" fontSize="54" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
            ?
          </text>
        )
      )}
      <path d="M20 96 L20 124 M14 116 L20 126 L26 116" stroke="#ef4444" strokeWidth="3" fill="none" />
    </svg>
  );
};

/** Kosár, amelyen egy lap a jel (alak vagy szín szerint válogatáshoz). */
export const LapBasket: React.FC<{ sign: LapSpec; className?: string }> = ({ sign, className = 'w-28 h-24' }) => (
  <svg viewBox="0 0 140 120" className={className}>
    <svg x="0" y="0" width="140" height="120" viewBox="0 0 140 120">
      <Basket className="" />
    </svg>
    <circle cx="70" cy="84" r="24" fill="#fff" stroke="#b45309" strokeWidth="3" />
    {lapEl(sign, 70, 86, 14)}
  </svg>
);

/** Színfolt (szín szerinti kosárhoz). */
export const ColorSpot: React.FC<{ c: LapColor; className?: string }> = ({ c, className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 40 40" className={className}>
    <path d="M6 22 Q4 8 18 8 Q34 6 34 20 Q36 34 20 33 Q6 34 6 22 Z" fill={LAP_FILL[c]} stroke="#1f2937" strokeWidth="2" />
  </svg>
);

const sky = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 50} Q${w / 3} ${h - 74} ${w / 2} ${h - 52} T${w} ${h - 58} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** 1. oldal: Pötyi kincsesdobozt talál a kerti házikóban. */
export const BoxScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <rect x="250" y="110" width="190" height="100" rx="8" fill="#d97706" stroke="#78350f" strokeWidth="5" />
    <path d="M244 110 L264 80 H430 L446 110 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="5" strokeLinejoin="round" />
    {lapEl({ sh: 'kor', c: 'piros' }, 290, 74, 22, 'a')}
    {lapEl({ sh: 'haromszog', c: 'sarga', hole: true }, 345, 60, 24, 'b')}
    {lapEl({ sh: 'negyzet', c: 'kek' }, 400, 74, 20, 'c')}
    {lapEl({ sh: 'kor', c: 'zold', big: false, hole: true }, 430, 44, 22, 'd')}
    <Potyi mood="wow" x={40} y={50} size={170} />
  </svg>
);

/** A négy tulajdonság bemutatása egy képen. */
export const FeaturesScene: React.FC<{ kind: 'alak' | 'szin' | 'nagysag' | 'lyuk' }> = ({ kind }) => {
  const sets: Record<typeof kind, LapSpec[]> = {
    alak: [{ sh: 'kor', c: 'piros' }, { sh: 'negyzet', c: 'piros' }, { sh: 'haromszog', c: 'piros' }],
    szin: [{ sh: 'negyzet', c: 'piros' }, { sh: 'negyzet', c: 'kek' }, { sh: 'negyzet', c: 'sarga' }, { sh: 'negyzet', c: 'zold' }],
    nagysag: [{ sh: 'kor', c: 'kek' }, { sh: 'kor', c: 'kek', big: false }],
    lyuk: [{ sh: 'haromszog', c: 'zold' }, { sh: 'haromszog', c: 'zold', hole: true }],
  };
  const items = sets[kind];
  return <LapRow items={items} bg="#fdf4ff" />;
};

/** Ház lapokból, a tető helyén „?”. */
export const HouseBuildScene: React.FC<{ roof?: LapSpec }> = ({ roof }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    {lapEl({ sh: 'negyzet', c: 'zold' }, 240, 166, 50, 'wall')}
    {roof ? (
      lapEl(roof, 240, 70, 50, 'roof')
    ) : (
      <g>
        <rect x="196" y="40" width="88" height="68" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="4" strokeDasharray="8 6" />
        <text x="240" y="94" textAnchor="middle" fontSize="48" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
      </g>
    )}
    {lapEl({ sh: 'kor', c: 'sarga' }, 400, 60, 30, 'sun')}
    <Potyi mood="think" x={30} y={110} size={110} />
  </svg>
);

/** „Melyik hiányzik?” – fent a teljes sor, lent ugyanaz egy hellyel kevesebb. */
export const MissingScene: React.FC<{ all: LapSpec[]; missing: number }> = ({ all, missing }) => {
  const w = all.length * 90 + 20;
  return (
    <svg viewBox={`0 0 ${w} 220`}>
      <rect x="2" y="2" width={w - 4} height="216" rx="18" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      <path d={`M10 110 H${w - 10}`} stroke="#cbd5e1" strokeWidth="3" strokeDasharray="8 6" />
      {all.map((l, i) => lapEl(l, 55 + i * 90, 56, 30, `a${i}`))}
      {all.map((l, i) =>
        i === missing ? (
          <text key={`m${i}`} x={55 + i * 90} y="184" textAnchor="middle" fontSize="50" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
            ?
          </text>
        ) : (
          lapEl(l, 55 + i * 90, 166, 30, `b${i}`)
        )
      )}
    </svg>
  );
};

/** Záró kép: Pötyi lapokból rakott katicát. */
export const LadybugBuiltScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    {lapEl({ sh: 'kor', c: 'piros' }, 300, 130, 70, 'body')}
    {lapEl({ sh: 'kor', c: 'kek', big: false }, 300, 50, 44, 'head')}
    {lapEl({ sh: 'kor', c: 'sarga', big: false, hole: true }, 270, 120, 26, 's1')}
    {lapEl({ sh: 'kor', c: 'sarga', big: false, hole: true }, 330, 150, 26, 's2')}
    {lapEl({ sh: 'haromszog', c: 'zold', big: false }, 250, 200, 30, 'l1')}
    {lapEl({ sh: 'haromszog', c: 'zold', big: false }, 350, 200, 30, 'l2')}
    <Potyi mood="cheer" x={30} y={70} size={140} />
  </svg>
);
