// „A hét” – a mese és a játék képei. A 7-ig tartó leckék (Számolás 0-tól 7-ig, Számszomszédok, Megálló) is innen veszik a közös képeket.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { Hand, ICONS, IconName } from '../../shared/G1Pics';

const FONT = 'system-ui, sans-serif';

export const sky = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#e0f2fe" />
    <path d={`M0 ${h - 50} Q${w / 3} ${h - 80} ${w / 2} ${h - 55} T${w} ${h - 60} V${h} H0 Z`} fill="#86efac" />
  </>
);

/** Elrendezés 0–7 tárgyhoz egy 160×100-as keretben (felül a több, alul a kevesebb). */
const groupPos = (n: number): [number, number][] => {
  if (n <= 0) return [];
  if (n <= 3) return Array.from({ length: n }, (_, i) => [80 + (i - (n - 1) / 2) * 46, 50]);
  const top = Math.ceil(n / 2);
  const bottom = n - top;
  return [
    ...Array.from({ length: top }, (_, i) => [80 + (i - (top - 1) / 2) * 36, 30] as [number, number]),
    ...Array.from({ length: bottom }, (_, i) => [80 + (i - (bottom - 1) / 2) * 36, 72] as [number, number]),
  ];
};

/** Keret-tartalom (SVG-csoport) n tárggyal; az utolsó `crossed` darab áthúzva. */
export const groupG = (icon: IconName, n: number, opts: { color?: string; crossed?: number; frame?: boolean } = {}) => {
  const { color, crossed = 0, frame = true } = opts;
  const s = n === 1 ? 1.2 : n <= 3 ? 1 : 0.72;
  return (
    <>
      {frame && <rect x="3" y="3" width="154" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />}
      {groupPos(n).map(([x, y], i) => {
        const cross = i >= n - crossed;
        return (
          <g key={i} opacity={cross ? 0.45 : 1}>
            {ICONS[icon]({ x, y, s, color })}
            {cross && <path d={`M${x - 15} ${y + 15} L${x + 15} ${y - 15}`} stroke="#111827" strokeWidth="4.5" strokeLinecap="round" />}
          </g>
        );
      })}
    </>
  );
};

/** n (0–7) tárgy keretben, kész SVG-ként (válaszkártyának is jó). */
export const GroupBox: React.FC<{ icon: IconName; n: number; color?: string; crossed?: number; className?: string }> = ({ icon, n, color, crossed, className = 'w-32 h-20' }) => (
  <svg viewBox="0 0 160 100" className={className}>
    {groupG(icon, n, { color, crossed })}
  </svg>
);

/** Kis kártya a párosítóhoz, válogatóhoz. */
export const MiniGroup: React.FC<{ icon: IconName; n: number; color?: string; crossed?: number }> = ({ icon, n, color, crossed }) => (
  <GroupBox icon={icon} n={n} color={color} crossed={crossed} className="w-28 h-[72px]" />
);

/** Két keret, középen „?” – melyik jel kell? */
export const CompareScene: React.FC<{ icon: IconName; a: number; b: number; iconB?: IconName }> = ({ icon, a, b, iconB }) => (
  <svg viewBox="0 0 400 110" className="w-full max-w-[440px] h-auto mx-auto">
    <g transform="translate(0 5)">{groupG(icon, a)}</g>
    <text x="200" y="74" textAnchor="middle" fontSize="54" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>?</text>
    <g transform="translate(240 5)">{groupG(iconB ?? icon, b)}</g>
  </svg>
);

/** Két csoport művelettel: a + b = ?  vagy  a − b (áthúzva) = ? */
export const OpScene: React.FC<{ icon: IconName; a: number; b: number; op: '+' | '−'; iconB?: IconName; showResult?: boolean }> = ({ icon, a, b, op, iconB, showResult = false }) => {
  const res = op === '+' ? a + b : a - b;
  if (op === '−') {
    return (
      <svg viewBox="0 0 300 110" className="w-full max-w-[360px] h-auto mx-auto">
        <g transform="translate(0 5)">{groupG(icon, a, { crossed: b })}</g>
        <text x="190" y="74" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily={FONT}>=</text>
        <text x="250" y="76" textAnchor="middle" fontSize="54" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>{showResult ? res : '?'}</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 470 110" className="w-full max-w-[460px] h-auto mx-auto">
      <g transform="translate(0 5)">{groupG(icon, a)}</g>
      <text x="180" y="72" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily={FONT}>+</text>
      <g transform="translate(200 5)">{groupG(iconB ?? icon, b)}</g>
      <text x="383" y="72" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily={FONT}>=</text>
      <text x="436" y="76" textAnchor="middle" fontSize="54" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>{showResult ? res : '?'}</text>
    </svg>
  );
};

/** Nagy felirat (művelet, jelek): pl. "5 + 2 ? 6". A „?” lila. */
export const ExprScene: React.FC<{ text: string; bg?: string }> = ({ text, bg = '#f5f3ff' }) => {
  const parts = text.split(/(\?)/);
  return (
    <svg viewBox="0 0 480 120" className="w-full max-w-[440px] h-auto mx-auto">
      <rect x="0" y="0" width="480" height="120" rx="18" fill={bg} />
      <text x="240" y="82" textAnchor="middle" fontSize={text.length > 18 ? 36 : text.length > 13 ? 44 : 56} fontWeight="900" fill="#1e293b" fontFamily={FONT}>
        {parts.map((p, i) => (p === '?' ? <tspan key={i} fill="#7c3aed">?</tspan> : <tspan key={i}>{p}</tspan>))}
      </text>
    </svg>
  );
};

/** Számkártya-sor, „?” a hiányzó helyén. */
export const SeqStrip: React.FC<{ items: (number | '?')[] }> = ({ items }) => {
  const w = items.length * 70 + 10;
  return (
    <svg viewBox={`0 0 ${w} 90`} className="w-full max-w-[460px] h-auto mx-auto">
      {items.map((v, i) => (
        <g key={i}>
          <rect x={8 + i * 70} y="8" width="62" height="74" rx="12" fill={v === '?' ? '#ede9fe' : '#eff6ff'} stroke={v === '?' ? '#7c3aed' : '#93c5fd'} strokeWidth="3" />
          <text x={39 + i * 70} y="62" textAnchor="middle" fontSize="40" fontWeight="900" fill={v === '?' ? '#7c3aed' : '#1e293b'} fontFamily={FONT}>{v}</text>
        </g>
      ))}
    </svg>
  );
};

/** Pötyi nagyban, a hátán `dots` pötty (alapból 7). */
export const PotyiScene: React.FC<{ dots?: number; mood?: 'happy' | 'cheer' | 'think' | 'wow'; friends?: boolean }> = ({ dots = 7, mood = 'happy', friends = false }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <Potyi mood={mood} dots={dots} x={friends ? 40 : 130} y={20} size={210} />
    {friends && ICONS.meh({ x: 330, y: 80, s: 2.2 })}
    {friends && ICONS.csiga({ x: 380, y: 190, s: 2.4 })}
  </svg>
);

/** Két kéz egymás mellett (pl. 5 + 2 ujj). */
export const HandsScene: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 300 130" className="w-full max-w-[320px] h-auto mx-auto">
    <svg x="10" y="8" width="130" height="118" viewBox="0 0 100 110">
      <Hand fingers={a} className="" />
    </svg>
    <svg x="160" y="8" width="130" height="118" viewBox="0 0 100 110">
      <Hand fingers={b} className="" />
    </svg>
  </svg>
);

/** A hét 7 napja: 7 kis napocska, mindegyik alatt egy pötty. */
export const WeekScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef9c3" />
    {Array.from({ length: 7 }, (_, i) => {
      const cx = 48 + i * 64;
      return (
        <g key={i}>
          <rect x={cx - 28} y="30" width="56" height="70" rx="10" fill="#fff" stroke="#f59e0b" strokeWidth="3" />
          <circle cx={cx} cy="65" r="16" fill="#facc15" stroke="#d97706" strokeWidth="3" />
          <circle cx={cx} cy="140" r="12" fill="#111827" />
        </g>
      );
    })}
  </svg>
);

/** Házsor (Számkert utca): mindegyik ház ajtaján egy szám, „?” vagy semmi; `who` = ki néz ki az ablakon. */
export const HousesScene: React.FC<{ houses: { label?: number | '?'; who?: 'potyi' | IconName; hi?: boolean }[] }> = ({ houses }) => {
  const W = 74;
  const w = houses.length * W + 12;
  return (
    <svg viewBox={`0 0 ${w} 170`} className="w-full max-w-[480px] h-auto mx-auto">
      <rect x="0" y="0" width={w} height="170" rx="16" fill="#e0f2fe" />
      <rect x="0" y="140" width={w} height="30" rx="8" fill="#86efac" />
      {houses.map((h, i) => {
        const x = 8 + i * W;
        return (
          <g key={i}>
            <path d={`M${x} 62 L${x + W / 2 - 2} 18 L${x + W - 4} 62 Z`} fill="#ef4444" stroke="#991b1b" strokeWidth="3" strokeLinejoin="round" />
            <rect x={x + 6} y="62" width={W - 16} height="80" fill={h.hi ? '#fef08a' : '#fff'} stroke="#64748b" strokeWidth="3" />
            {h.who === 'potyi' ? (
              <Potyi x={x + 13} y={64} size={44} dots={7} />
            ) : h.who ? (
              ICONS[h.who]({ x: x + W / 2 - 2, y: 86, s: 0.8 })
            ) : (
              <rect x={x + 22} y="72" width={W - 48} height="24" fill="#bae6fd" stroke="#64748b" strokeWidth="2" />
            )}
            {h.label !== undefined && (
              <text x={x + W / 2 - 2} y="134" textAnchor="middle" fontSize="30" fontWeight="900" fill={h.label === '?' ? '#7c3aed' : '#1e293b'} fontFamily={FONT}>{h.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Tekebábuk: `total` bábu, ebből `fallen` eldőlt (a jobb szélsők). */
export const PinsScene: React.FC<{ total: number; fallen: number }> = ({ total, fallen }) => {
  const standing = total - fallen;
  const pin = (x: number, y: number, key: React.Key, rot = 0) => (
    <g key={key} transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse cx="0" cy="14" rx="13" ry="24" fill="#fff" stroke="#1e3a8a" strokeWidth="3" />
      <circle cx="0" cy="-18" r="9" fill="#fff" stroke="#1e3a8a" strokeWidth="3" />
      <path d="M-10 -4 H10" stroke="#ef4444" strokeWidth="5" />
    </g>
  );
  return (
    <svg viewBox="0 0 480 200">
      <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef3c7" />
      <rect x="0" y="160" width="480" height="40" rx="10" fill="#d97706" opacity="0.35" />
      {Array.from({ length: standing }, (_, i) => pin(50 + i * 52, 110, `s${i}`))}
      {Array.from({ length: fallen }, (_, i) => pin(60 + standing * 52 + i * 62, 160, `f${i}`, 90))}
    </svg>
  );
};

/** Kincsesláda számmal (válaszkártya). */
export const ChestCard: React.FC<{ n: number; color?: string }> = ({ n, color = '#b45309' }) => (
  <svg viewBox="0 0 100 86" className="w-24 h-20">
    <rect x="8" y="34" width="84" height="46" rx="6" fill={color} stroke="#451a03" strokeWidth="3" />
    <path d="M8 36 Q50 0 92 36 Z" fill={color} stroke="#451a03" strokeWidth="3" />
    <rect x="34" y="40" width="32" height="34" rx="6" fill="#fde68a" stroke="#451a03" strokeWidth="2.5" />
    <text x="50" y="68" textAnchor="middle" fontSize="28" fontWeight="900" fill="#451a03" fontFamily={FONT}>{n}</text>
  </svg>
);

/** n madár egy ágon + m érkező madár (összeadós történethez). */
export const BirdsScene: React.FC<{ sitting: number; coming: number }> = ({ sitting, coming }) => (
  <svg viewBox="0 0 480 220">
    {sky(480, 220)}
    <path d="M10 130 Q240 110 300 132" stroke="#92400e" strokeWidth="12" fill="none" strokeLinecap="round" />
    {Array.from({ length: sitting }, (_, i) => ICONS.madar({ x: 40 + i * 58, y: 108, s: 1.1, key: `a${i}` }))}
    {Array.from({ length: coming }, (_, i) => ICONS.madar({ x: 350 + (i % 2) * 60, y: 40 + i * 42, s: 1.1, color: '#f97316', key: `b${i}` }))}
  </svg>
);
