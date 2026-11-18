// „A nyolc” – a téli Számkert képei. A 0–8-as leckék (számolás 0-tól 8-ig, nyitott mondatok, megálló) is ezeket használják.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName, IconProps, Hand, NumberLine } from '../../shared/G1Pics';

// ---------- saját téli ikonok (ugyanolyan aláírás, mint az ICONS) ----------
const grp = (x: number, y: number, s: number, children: React.ReactNode, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    {children}
  </g>
);

export const WINTER = {
  hopehely: ({ x, y, s = 1, color = '#2563eb', key }: IconProps) =>
    grp(x, y, s, (
      <g stroke={color} strokeWidth="3.5" strokeLinecap="round">
        {[0, 60, 120].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M0 -18 V18" />
            <path d="M-6 -13 L0 -8 L6 -13 M-6 13 L0 8 L6 13" fill="none" />
          </g>
        ))}
      </g>
    ), key),
  hogolyo: ({ x, y, s = 1, color = '#ffffff', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <circle cx="0" cy="0" r="16" fill={color} stroke="#64748b" strokeWidth="3" />
        <circle cx="-6" cy="-6" r="4" fill="#e0f2fe" />
      </>
    ), key),
  sapka: ({ x, y, s = 1, color = '#a855f7', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <path d="M-16 8 Q-16 -14 0 -14 Q16 -14 16 8 Z" fill={color} stroke="#111827" strokeWidth="3" strokeLinejoin="round" />
        <rect x="-19" y="6" width="38" height="9" rx="4" fill="#fde68a" stroke="#111827" strokeWidth="3" />
        <circle cx="0" cy="-17" r="5" fill="#fde68a" stroke="#111827" strokeWidth="2.5" />
      </>
    ), key),
  gomb: ({ x, y, s = 1, color = '#111827', key }: IconProps) =>
    grp(x, y, s, (
      <>
        <circle cx="0" cy="0" r="12" fill={color} stroke="#111827" strokeWidth="2" />
        <circle cx="-4" cy="-3" r="2" fill="#fff" />
        <circle cx="4" cy="3" r="2" fill="#fff" />
      </>
    ), key),
};

export type PicName = IconName | keyof typeof WINTER;
export const PIC = (name: PicName) => (name in WINTER ? WINTER[name as keyof typeof WINTER] : ICONS[name as IconName]);

/** Téli háttér: halványkék ég, havas domb. */
export const snow = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#dbeafe" />
    <path d={`M0 ${h - 56} Q${w / 3} ${h - 90} ${w / 2} ${h - 60} T${w} ${h - 66} V${h} H0 Z`} fill="#ffffff" stroke="#bfdbfe" strokeWidth="3" />
  </>
);

// ---------- dobozok tárgyakkal (0–10) ----------
/**
 * Keretes doboz: `n` darab `icon`, utána `nb` darab `iconB` (más szín / fajta).
 * Legfeljebb 4 egy sorban (9–10-nél 5). `crossed`: az utolsó ennyi áthúzva.
 */
export const CountBox: React.FC<{ icon: PicName; n: number; iconB?: PicName; nb?: number; color?: string; colorB?: string; crossed?: number; className?: string }> = ({
  icon,
  n,
  iconB,
  nb = 0,
  color,
  colorB,
  crossed = 0,
  className = 'w-36 h-24',
}) => {
  const total = n + nb;
  const per = total > 8 ? 5 : 4;
  const rows = total <= per ? 1 : 2;
  const s = total === 1 ? 1.25 : total <= 4 ? 0.95 : 0.8;
  const gap = total <= 4 ? 38 : 34;
  const items = Array.from({ length: total }, (_, i) => {
    const row = rows === 1 ? 0 : i < per ? 0 : 1;
    const inRow = rows === 1 ? total : row === 0 ? per : total - per;
    const col = row === 0 ? i : i - per;
    const x = 80 + (col - (inRow - 1) / 2) * gap;
    const y = rows === 1 ? 50 : row === 0 ? 30 : 72;
    return { x, y, b: i >= n };
  });
  return (
    <svg viewBox="0 0 160 100" className={className}>
      <rect x="3" y="3" width="154" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {items.map(({ x, y, b }, i) => {
        const isX = i >= total - crossed;
        return (
          <g key={i} opacity={isX ? 0.45 : 1}>
            {PIC(b ? iconB ?? icon : icon)({ x, y, s, color: b ? colorB : color })}
            {isX && <path d={`M${x - 15} ${y - 15} L${x + 15} ${y + 15}`} stroke="#111827" strokeWidth="5" strokeLinecap="round" />}
          </g>
        );
      })}
    </svg>
  );
};

/** Kisebb kártya-változat (párosító, válogató). */
export const MiniBox: React.FC<{ icon: PicName; n: number; iconB?: PicName; nb?: number; color?: string; colorB?: string; crossed?: number }> = (p) => <CountBox {...p} className="w-28 h-[72px]" />;

/** Két doboz, középen „?” – melyik jel kell? */
export const CompareBoxes: React.FC<{ icon: PicName; a: number; b: number; iconB?: PicName }> = ({ icon, a, b, iconB }) => (
  <svg viewBox="0 0 380 110" className="w-full max-w-[440px] h-auto mx-auto">
    <svg x="0" y="5" width="160" height="100" viewBox="0 0 160 100">
      <CountBox icon={icon} n={a} className="" />
    </svg>
    <text x="190" y="72" textAnchor="middle" fontSize="52" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
    <svg x="220" y="5" width="160" height="100" viewBox="0 0 160 100">
      <CountBox icon={iconB ?? icon} n={b} className="" />
    </svg>
  </svg>
);

/** Két kéz: az első kézen legfeljebb 5 ujj, a többi a második kézen (0–10). */
export const TwoHands: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-48 h-auto mx-auto' }) => (
  <svg viewBox="0 0 210 110" className={className}>
    <svg x="0" y="0" width="100" height="110" viewBox="0 0 100 110">
      <Hand fingers={Math.min(5, n)} className="" />
    </svg>
    <svg x="110" y="0" width="100" height="110" viewBox="0 0 100 110">
      <Hand fingers={Math.max(0, n - 5)} className="" />
    </svg>
  </svg>
);

// ---------- műveletek, nyitott mondatok ----------
/**
 * Nagy „számkártya-sor”: szóközzel elválasztott elemek, pl. "3 + □ = 5".
 * A „□” lila szaggatott keret (ismeretlen), a „?” lila kérdőjel.
 */
export const EqCard: React.FC<{ text: string; className?: string; filled?: { at: number; value: string | number; ok?: boolean } }> = ({
  text,
  className = 'w-full max-w-[420px] h-auto mx-auto',
  filled,
}) => {
  const tokens = text.split(' ').filter(Boolean);
  const cw = 58;
  const w = tokens.length * cw + 24;
  let boxIdx = -1;
  return (
    <svg viewBox={`0 0 ${w} 90`} className={className}>
      <rect x="3" y="3" width={w - 6} height="84" rx="18" fill="#fff" stroke="#c4b5fd" strokeWidth="3" />
      {tokens.map((t, i) => {
        const cx = 12 + i * cw + cw / 2;
        if (t === '□') {
          boxIdx += 1;
          const f = filled && filled.at === boxIdx ? filled : null;
          return (
            <g key={i}>
              <rect x={cx - 24} y="19" width="48" height="52" rx="8" fill={f ? (f.ok === false ? '#ffe4e6' : '#dcfce7') : '#f5f3ff'} stroke="#7c3aed" strokeWidth="3.5" strokeDasharray={f ? undefined : '7 5'} />
              {f && (
                <text x={cx} y="62" textAnchor="middle" fontSize="40" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">
                  {f.value}
                </text>
              )}
            </g>
          );
        }
        return (
          <text key={i} x={cx} y="62" textAnchor="middle" fontSize="44" fontWeight="900" fill={t === '?' ? '#7c3aed' : '#1e293b'} fontFamily="system-ui, sans-serif">
            {t}
          </text>
        );
      })}
    </svg>
  );
};

/** Számegyenes 0–max, egyes lépésekkel `from`-tól `to`-ig (előre vagy hátra). Az állat a kiindulásnál ül, a célnál „?”. */
export const HopLine: React.FC<{ from: number; to: number; max?: number; icon?: PicName; step?: number; hideTarget?: boolean }> = ({ from, to, max = 8, icon = 'csiga', step = 1, hideTarget = true }) => {
  const st = Math.min(44, 420 / max);
  const w = 40 + max * st + 14;
  const X = (v: number) => 20 + v * st;
  const dir = to >= from ? 1 : -1;
  const jumps: { from: number; to: number }[] = [];
  for (let v = from; v !== to; v += dir * step) jumps.push({ from: v, to: v + dir * step });
  return (
    <svg viewBox={`0 0 ${w} 150`} className="w-full max-w-[460px] h-auto mx-auto">
      <svg x="0" y="54" width={w} height="96" viewBox={`0 0 ${w} 96`}>
        <NumberLine max={max} className="" mark={[from]} question={hideTarget ? to : undefined} jumps={jumps} />
      </svg>
      {PIC(icon)({ x: X(from), y: 40, s: 0.85 })}
    </svg>
  );
};

/** Számház: a tetőn a szám, a szobákban a bontások ("a + b", „?” az ismeretlen). */
export const NumberHouse: React.FC<{ top: number | string; rows: [number | string, number | string][]; className?: string }> = ({ top, rows, className = 'w-48 h-auto mx-auto' }) => {
  const h = 70 + rows.length * 44 + 8;
  return (
    <svg viewBox={`0 0 220 ${h}`} className={className}>
      <path d="M10 70 L110 6 L210 70 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="4" strokeLinejoin="round" />
      <text x="110" y="58" textAnchor="middle" fontSize="38" fontWeight="900" fill="#fff" fontFamily="system-ui, sans-serif">{top}</text>
      {rows.map(([a, b], i) => (
        <g key={i}>
          <rect x="30" y={70 + i * 44} width="160" height="44" fill="#fff" stroke="#1f2937" strokeWidth="3" />
          {[a, '+', b].map((t, k) => (
            <text key={k} x={70 + k * 40} y={70 + i * 44 + 32} textAnchor="middle" fontSize="28" fontWeight="900" fill={t === '?' ? '#7c3aed' : '#1e293b'} fontFamily="system-ui, sans-serif">
              {t}
            </text>
          ))}
        </g>
      ))}
    </svg>
  );
};

// ---------- jelenetek ----------
/** A barátok a havas Számkertben (díszítés nélkül számolható: 3 barát). */
export const WinterFriendsScene: React.FC<{ dots?: number }> = ({ dots = 7 }) => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    <Potyi mood="cheer" dots={dots} x={24} y={60} size={150} />
    {ICONS.meh({ x: 260, y: 90, s: 2.3 })}
    {ICONS.csiga({ x: 390, y: 178, s: 2.5 })}
  </svg>
);

const FLAKE_POS: [number, number][] = [
  [70, 46], [170, 34], [270, 52], [380, 38], [110, 118], [220, 128], [330, 112], [430, 124], [60, 190], [400, 196],
];

/** n hópehely hullik (0–10). */
export const SnowfallScene: React.FC<{ n?: number }> = ({ n = 8 }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#bfdbfe" />
    {FLAKE_POS.slice(0, n).map(([x, y], i) => WINTER.hopehely({ x, y, s: 1.5, key: i }))}
  </svg>
);

/** Pötyi 7 pöttyére ráesik egy hópehely: 7 meg 1. */
export const NewDotScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    <Potyi mood="wow" dots={7} x={130} y={30} size={200} />
    <path d="M330 30 Q300 60 275 112" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="6 7" />
    {WINTER.hopehely({ x: 270, y: 120, s: 0.9 })}
    {WINTER.hopehely({ x: 340, y: 24, s: 0.8, color: '#93c5fd' })}
  </svg>
);

const BTN_POS: [number, number][] = [
  [224, 120], [256, 120], [224, 146], [256, 146], [224, 172], [256, 172], [224, 198], [256, 198], [224, 94], [256, 94],
];

/** Hóember `buttons` gombbal (0–10) a hasán. `hat`: piros fazék-sapka. */
export const SnowmanScene: React.FC<{ buttons: number; label?: string | number; extra?: React.ReactNode }> = ({ buttons, label, extra }) => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    <circle cx="240" cy="160" r="62" fill="#fff" stroke="#64748b" strokeWidth="4" />
    <circle cx="240" cy="58" r="36" fill="#fff" stroke="#64748b" strokeWidth="4" />
    <rect x="212" y="12" width="56" height="18" rx="6" fill="#dc2626" stroke="#7f1d1d" strokeWidth="3" />
    <circle cx="228" cy="52" r="4" fill="#111827" />
    <circle cx="252" cy="52" r="4" fill="#111827" />
    <path d="M240 60 L270 66 L240 70 Z" fill="#f97316" stroke="#9a3412" strokeWidth="2" />
    {Array.from({ length: Math.min(8, buttons) }, (_, i) => WINTER.gomb({ x: BTN_POS[i][0], y: BTN_POS[i][1], s: 0.8, key: i }))}
    {label !== undefined && (
      <g>
        <rect x="370" y="20" width="84" height="84" rx="18" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
        <text x="412" y="82" textAnchor="middle" fontSize="54" fontWeight="900" fill={label === '?' ? '#7c3aed' : '#1e293b'} fontFamily="system-ui, sans-serif">{label}</text>
      </g>
    )}
    {extra}
  </svg>
);

/** Sapkasor: `a` piros és `b` kék sapka egy sorban (bontás). */
export const HatRow: React.FC<{ a: number; b: number; className?: string }> = ({ a, b, className = 'w-full max-w-[460px] h-auto mx-auto' }) => {
  const n = a + b;
  const w = Math.max(1, n) * 54 + 20;
  return (
    <svg viewBox={`0 0 ${w} 80`} className={className}>
      <rect x="3" y="3" width={w - 6} height="74" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => WINTER.sapka({ x: 37 + i * 54, y: 44, s: 1.05, color: i < a ? '#ef4444' : '#3b82f6', key: i }))}
    </svg>
  );
};

/** Zümi kettesével ugrál a 0–8-as számegyenesen; a következő célnál „?”. */
export const ZumiTwosScene: React.FC<{ done?: number }> = ({ done = 3 }) => {
  const st = 44;
  const w = 40 + 8 * st + 14;
  const X = (v: number) => 20 + v * st;
  const target = (done + 1) * 2;
  return (
    <svg viewBox={`0 0 ${w} 150`} className="w-full max-w-[460px] h-auto mx-auto">
      <svg x="0" y="54" width={w} height="96" viewBox={`0 0 ${w} 96`}>
        <NumberLine max={8} className="" question={target} jumps={Array.from({ length: done }, (_, i) => ({ from: i * 2, to: i * 2 + 2 }))} />
      </svg>
      {ICONS.meh({ x: X(done * 2), y: 40, s: 0.9 })}
    </svg>
  );
};
