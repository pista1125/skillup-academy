// „A kettő” – a mese és a játék képei (a nulla és a három leckéje is használja a dobozokat).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName, NumberLine } from '../../shared/G1Pics';

export const sky = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 50} Q${w / 3} ${h - 80} ${w / 2} ${h - 55} T${w} ${h - 60} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** Virág szárral, a fűből nő ki (cx = a virág közepe). */
export const StemFlower: React.FC<{ cx: number; top: number; bottom: number; color?: string }> = ({ cx, top, bottom, color }) => (
  <g>
    <path d={`M${cx} ${top + 12} V${bottom}`} stroke="#15803d" strokeWidth="6" strokeLinecap="round" />
    <path d={`M${cx} ${bottom - 22} Q${cx + 22} ${bottom - 36} ${cx + 26} ${bottom - 22} Q${cx + 12} ${bottom - 14} ${cx} ${bottom - 22} Z`} fill="#22c55e" stroke="#15803d" strokeWidth="2" />
    {ICONS.virag({ x: cx, y: top, s: 1.5, color })}
  </g>
);

/** 1. oldal: Pötyi a Számkertben találkozik Zümivel, a méhecskével. */
export const ZumiMeetScene: React.FC = () => (
  <svg viewBox="0 0 480 260">
    {sky(480, 260)}
    <path d="M200 70 Q260 20 300 70 T390 80" fill="none" stroke="#a16207" strokeWidth="3" strokeDasharray="6 7" />
    {ICONS.meh({ x: 390, y: 86, s: 2.6 })}
    {ICONS.virag({ x: 300, y: 222, s: 0.9, color: '#f472b6' })}
    {ICONS.virag({ x: 440, y: 226, s: 0.9, color: '#a855f7' })}
    <Potyi mood="wow" dots={7} x={20} y={60} size={190} />
  </svg>
);

/** Zümi nagyban: jól látszik a két szárnya. */
export const ZumiWingsScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef9c3" />
    {ICONS.meh({ x: 240, y: 140, s: 5.2 })}
  </svg>
);

/** n virág a kertben; ha `bee`, Zümi szálldos fölöttük. */
export const FlowerBedScene: React.FC<{ n?: number; bee?: boolean }> = ({ n = 2, bee = false }) => {
  const colors = ['#ec4899', '#f97316', '#a855f7', '#ef4444', '#3b82f6'];
  return (
    <svg viewBox="0 0 480 240">
      {sky(480, 240)}
      {Array.from({ length: n }, (_, i) => {
        const cx = 240 + (i - (n - 1) / 2) * (n > 3 ? 84 : 130);
        return <StemFlower key={i} cx={cx} top={120} bottom={222} color={colors[i % colors.length]} />;
      })}
      {bee && (
        <>
          <path d={n >= 2 ? `M${240 - 65} 92 Q240 30 ${240 + 65} 92` : 'M150 60 Q200 40 240 92'} fill="none" stroke="#a16207" strokeWidth="3" strokeDasharray="6 7" />
          {ICONS.meh({ x: 240, y: 52, s: 1.6 })}
        </>
      )}
    </svg>
  );
};

/** Cseresznyeág: `pairs` pár cseresznye (párban lógnak). */
export const CherryScene: React.FC<{ pairs?: number }> = ({ pairs = 1 }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#e0f2fe" />
    <path d="M20 50 Q240 20 460 56" fill="none" stroke="#92400e" strokeWidth="12" strokeLinecap="round" />
    {Array.from({ length: pairs }, (_, i) => {
      const x = 240 + (i - (pairs - 1) / 2) * 150;
      return (
        <g key={i}>
          <path d={`M${x} 42 Q${x - 10} 100 ${x - 34} 160 M${x} 42 Q${x + 10} 100 ${x + 34} 160`} fill="none" stroke="#15803d" strokeWidth="5" strokeLinecap="round" />
          <path d={`M${x} 42 Q${x + 30} 30 ${x + 44} 50 Q${x + 20} 60 ${x} 42 Z`} fill="#22c55e" stroke="#15803d" strokeWidth="2" />
          <circle cx={x - 36} cy="182" r="26" fill="#dc2626" stroke="#7f1d1d" strokeWidth="4" />
          <circle cx={x + 36} cy="182" r="26" fill="#dc2626" stroke="#7f1d1d" strokeWidth="4" />
          <circle cx={x - 44} cy="172" r="6" fill="#fecaca" />
          <circle cx={x + 28} cy="172" r="6" fill="#fecaca" />
        </g>
      );
    })}
  </svg>
);

const POS: Record<number, [number, number][]> = {
  0: [],
  1: [[60, 50]],
  2: [[38, 50], [82, 50]],
  3: [[30, 34], [90, 34], [60, 70]],
  4: [[36, 32], [84, 32], [36, 72], [84, 72]],
  5: [[30, 30], [90, 30], [60, 52], [30, 76], [90, 76]],
};

/** Keretes doboz n tárggyal (0 = üres doboz). `crossed`: az utolsó ennyi tárgy áthúzva. */
export const GroupBox: React.FC<{ icon: IconName; n: number; color?: string; crossed?: number; className?: string }> = ({ icon, n, color, crossed = 0, className = 'w-28 h-24' }) => (
  <svg viewBox="0 0 120 100" className={className}>
    <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    {(POS[n] || []).map(([x, y], i) => (
      <g key={i} opacity={i >= n - crossed ? 0.45 : 1}>
        {ICONS[icon]({ x, y, s: n === 1 ? 1.2 : 0.85, color })}
        {i >= n - crossed && <path d={`M${x - 18} ${y - 18} L${x + 18} ${y + 18}`} stroke="#111827" strokeWidth="5" strokeLinecap="round" />}
      </g>
    ))}
  </svg>
);

/** Kis kártya (párosító, válogató). */
export const MiniGroup: React.FC<{ icon: IconName; n: number; color?: string }> = ({ icon, n, color }) => <GroupBox icon={icon} n={n} color={color} className="w-24 h-20" />;

/** Két doboz, középen „?” – melyik jel kell? */
export const CompareScene: React.FC<{ icon: IconName; a: number; b: number; iconB?: IconName }> = ({ icon, a, b, iconB }) => (
  <svg viewBox="0 0 320 110">
    <svg x="0" y="5" width="120" height="100" viewBox="0 0 120 100">
      <GroupBox icon={icon} n={a} className="" />
    </svg>
    <text x="160" y="72" textAnchor="middle" fontSize="52" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
    <svg x="200" y="5" width="120" height="100" viewBox="0 0 120 100">
      <GroupBox icon={iconB ?? icon} n={b} className="" />
    </svg>
  </svg>
);

/** Számegyenes 0–max, a tetején ugráló állat (alap: Zümi), `steps` ugrással 0-tól. A célnál „?”. */
export const JumpLineScene: React.FC<{ steps: number; max?: number; icon?: IconName; showAnswer?: boolean }> = ({ steps, max = 5, icon = 'meh', showAnswer = false }) => {
  const step = Math.min(44, 420 / max);
  const w = 40 + max * step + 14;
  const X = (v: number) => 20 + v * step;
  return (
    <svg viewBox={`0 0 ${w} 150`} className="w-full max-w-[460px] h-auto mx-auto">
      <svg x="0" y="54" width={w} height="96" viewBox={`0 0 ${w} 96`}>
        <NumberLine max={max} className="" question={showAnswer ? undefined : steps} jumps={Array.from({ length: steps }, (_, i) => ({ from: i, to: i + 1 }))} />
      </svg>
      {ICONS[icon]({ x: X(steps), y: 70, s: 0.9 })}
    </svg>
  );
};

/** Két keret korongokkal a jeles párosításhoz: bal keretben a kék, jobb keretben b piros korong (0 = üres keret). */
export const DotPairs: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const wa = Math.max(1, a) * 26 + 10;
  const wb = Math.max(1, b) * 26 + 10;
  const xb = 4 + wa + 18;
  const w = xb + wb + 4;
  return (
    <svg viewBox={`0 0 ${w} 60`}>
      <rect x="4" y="8" width={wa} height="44" rx="10" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2.5" />
      <rect x={xb} y="8" width={wb} height="44" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2.5" />
      {Array.from({ length: a }, (_, i) => <circle key={`a${i}`} cx={4 + 18 + i * 26} cy="30" r="11" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />)}
      {Array.from({ length: b }, (_, i) => <circle key={`b${i}`} cx={xb + 18 + i * 26} cy="30" r="11" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />)}
    </svg>
  );
};

/** Egyszerű tárgyképek (párban járó és egyedül lévő dolgok). */
export const ThingPic: React.FC<{ kind: 'zokni' | 'szemek' | 'cseresznye' | 'nap' | 'hold' | 'orr' | 'kesztyu' | 'csiga1' }> = ({ kind }) => {
  const body: Record<string, React.ReactNode> = {
    zokni: (
      <>
        {[22, 58].map((x) => (
          <path key={x} d={`M${x} 14 h18 v34 q0 12 -12 12 h-14 q-8 0 -8 -8 q0 -8 8 -8 h8 z`} fill="#38bdf8" stroke="#075985" strokeWidth="3" strokeLinejoin="round" />
        ))}
      </>
    ),
    kesztyu: (
      <>
        {[16, 52].map((x) => (
          <path key={x} d={`M${x} 64 v-30 q0 -14 12 -14 q12 0 12 14 v30 z M${x} 40 q-8 -2 -8 -12`} fill="#f97316" stroke="#9a3412" strokeWidth="3" strokeLinejoin="round" />
        ))}
      </>
    ),
    szemek: (
      <>
        {[24, 56].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="40" rx="13" ry="10" fill="#fff" stroke="#1f2937" strokeWidth="3" />
            <circle cx={x} cy="40" r="5" fill="#1f2937" />
          </g>
        ))}
      </>
    ),
    cseresznye: (
      <>
        <path d="M40 10 Q34 30 24 50 M40 10 Q46 30 56 50" fill="none" stroke="#15803d" strokeWidth="3" />
        <circle cx="24" cy="56" r="12" fill="#dc2626" stroke="#7f1d1d" strokeWidth="3" />
        <circle cx="56" cy="56" r="12" fill="#dc2626" stroke="#7f1d1d" strokeWidth="3" />
      </>
    ),
    nap: (
      <>
        <circle cx="40" cy="40" r="18" fill="#facc15" stroke="#d97706" strokeWidth="3" />
        {Array.from({ length: 8 }, (_, k) => <path key={k} d="M40 14 V6" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" transform={`rotate(${k * 45} 40 40)`} />)}
      </>
    ),
    hold: <path d="M50 12 A28 28 0 1 0 50 68 A36 36 0 0 1 50 12 Z" fill="#fde68a" stroke="#a16207" strokeWidth="3" />,
    orr: <path d="M40 14 L28 58 H52" fill="none" stroke="#9a3412" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />,
    csiga1: ICONS.csiga({ x: 40, y: 42, s: 1.4 }),
  };
  return <svg viewBox="0 0 80 80" className="w-16 h-16">{body[kind]}</svg>;
};
