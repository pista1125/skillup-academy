// „Tájékozódás” – a mese és a játék képei (fölött, alatt, mellett, előtt, mögött, között, kint, bent, jobbra, balra).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';

export type Pos = 'folott' | 'alatt' | 'mellett' | 'elott' | 'mogott';
export type Who = 'meh' | 'csiga' | 'katica';
export type Dir = 'up' | 'down' | 'left' | 'right';

export const POS_SAY: Record<Pos, string> = {
  folott: 'a gomba fölött',
  alatt: 'a gomba alatt',
  mellett: 'a gomba mellett',
  elott: 'a gomba előtt',
  mogott: 'a gomba mögött',
};
export const WHO_SAY: Record<Who, string> = { meh: 'Zümi', csiga: 'Csigusz', katica: 'a katica' };
export const DIR_SAY: Record<Dir, string> = { up: 'fölfelé', down: 'lefelé', left: 'balra', right: 'jobbra' };

/** Egy ikon tükrözve (balra néz) vagy forgatva. */
export const drawIcon = (icon: IconName, x: number, y: number, s = 1, opts: { flip?: boolean; rotate?: number; key?: React.Key; color?: string } = {}) => (
  <g key={opts.key} transform={`translate(${x} ${y}) rotate(${opts.rotate ?? 0}) scale(${opts.flip ? -1 : 1} 1)`}>
    {ICONS[icon]({ x: 0, y: 0, s, color: opts.color })}
  </g>
);

const mushroomCap = (cx: number) => (
  <>
    <path d={`M${cx - 72} 96 C${cx - 72} 30 ${cx + 72} 30 ${cx + 72} 96 Z`} fill="#dc2626" stroke="#7f1d1d" strokeWidth="5" />
    <circle cx={cx - 34} cy="66" r="9" fill="#fff" />
    <circle cx={cx + 6} cy="52" r="8" fill="#fff" />
    <circle cx={cx + 40} cy="72" r="9" fill="#fff" />
  </>
);
const mushroomStem = (cx: number) => <rect x={cx - 20} y="92" width="40" height="72" rx="12" fill="#fef3c7" stroke="#92400e" strokeWidth="5" />;

/** Nagy gomba, mellette egy (vagy két) állat a megadott helyen. */
export const PlaceScene: React.FC<{ pos: Pos; who?: Who; second?: { pos: Pos; who: Who }; className?: string }> = ({ pos, who = 'meh', second, className = 'w-full max-w-[360px] h-auto mx-auto' }) => {
  const cx = 120;
  const place = (p: Pos, w: Who, key: string) => {
    const xy: Record<Pos, [number, number, number]> = {
      folott: [cx, 18, 1.1],
      alatt: [cx - 46, 130, 1.0],
      mellett: [cx + 92, 146, 1.1],
      elott: [cx + 4, 150, 1.25],
      mogott: [cx + 22, 128, 1.1],
    };
    const [x, y, s] = xy[p];
    return drawIcon(w, x, y, s, { key });
  };
  const items = [{ pos, who }, ...(second ? [second] : [])];
  return (
    <svg viewBox="0 0 240 190" className={className}>
      <rect x="0" y="0" width="240" height="190" rx="16" fill="#e0f2fe" />
      <path d="M0 162 H240 V190 H0 Z" fill="#86efac" />
      {items.filter((i) => i.pos === 'mogott').map((i, k) => place(i.pos, i.who, `b${k}`))}
      {mushroomStem(cx)}
      {mushroomCap(cx)}
      {items.filter((i) => i.pos !== 'mogott').map((i, k) => place(i.pos, i.who, `f${k}`))}
    </svg>
  );
};

export const placeOpt = (pos: Pos, who: Who = 'meh') => ({ figure: <PlaceScene pos={pos} who={who} />, say: `${WHO_SAY[who]} ${POS_SAY[pos]}` });

/** Kaptár: Zümi bent (az ajtóban) vagy kint (repül mellette). */
export const HiveScene: React.FC<{ inside: boolean; className?: string }> = ({ inside, className = 'w-full max-w-[360px] h-auto mx-auto' }) => (
  <svg viewBox="0 0 240 190" className={className}>
    <rect x="0" y="0" width="240" height="190" rx="16" fill="#e0f2fe" />
    <path d="M0 166 H240 V190 H0 Z" fill="#86efac" />
    <rect x="66" y="20" width="10" height="150" fill="#92400e" />
    {[0, 1, 2, 3].map((i) => (
      <ellipse key={i} cx="110" cy={60 + i * 26} rx={36 + i * 8} ry="16" fill="#fbbf24" stroke="#92400e" strokeWidth="4" />
    ))}
    <ellipse cx="110" cy="38" rx="26" ry="14" fill="#fbbf24" stroke="#92400e" strokeWidth="4" />
    <ellipse cx="110" cy="124" rx="20" ry="16" fill="#451a03" />
    {inside ? drawIcon('meh', 110, 126, 0.75) : drawIcon('meh', 196, 60, 1.1)}
  </svg>
);
export const hiveOpt = (inside: boolean) => ({ figure: <HiveScene inside={inside} />, say: inside ? 'Zümi bent van a kaptárban' : 'Zümi kint van a kaptár mellett' });

/** Két virág, Csigusz között vagy szélen. */
export const BetweenScene: React.FC<{ at: 'kozott' | 'bal' | 'jobb'; className?: string }> = ({ at, className = 'w-full max-w-[360px] h-auto mx-auto' }) => {
  const flower = (x: number, color: string) => (
    <g>
      <path d={`M${x} 160 V90`} stroke="#15803d" strokeWidth="6" />
      <ellipse cx={x - 14} cy="130" rx="12" ry="6" fill="#22c55e" transform={`rotate(-30 ${x - 14} 130)`} />
      {ICONS.virag({ x, y: 80, s: 1.6, color })}
    </g>
  );
  const sx = at === 'kozott' ? 120 : at === 'bal' ? 30 : 212;
  return (
    <svg viewBox="0 0 240 190" className={className}>
      <rect x="0" y="0" width="240" height="190" rx="16" fill="#e0f2fe" />
      <path d="M0 160 H240 V190 H0 Z" fill="#86efac" />
      {flower(70, '#ec4899')}
      {flower(170, '#a855f7')}
      {drawIcon('csiga', sx, 148, 1.1)}
    </svg>
  );
};
export const betweenOpt = (at: 'kozott' | 'bal' | 'jobb') => ({
  figure: <BetweenScene at={at} />,
  say: at === 'kozott' ? 'Csigusz a két virág között' : at === 'bal' ? 'Csigusz a virágoktól balra' : 'Csigusz a virágoktól jobbra',
});

/** Vastag nyíl. */
export const Arrow: React.FC<{ dir: Dir; color?: string; className?: string }> = ({ dir, color = '#1e293b', className = 'w-20 h-20' }) => {
  const rot = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <svg viewBox="0 0 80 80" className={className}>
      <g transform={`rotate(${rot} 40 40)`}>
        <path d="M12 40 H56" stroke={color} strokeWidth="10" strokeLinecap="round" />
        <path d="M44 22 L66 40 L44 58" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};
export const arrowOpt = (dir: Dir) => ({ figure: <Arrow dir={dir} />, say: `${DIR_SAY[dir]} mutató nyíl` });

/** Állat, amely balra vagy jobbra halad (az ikonok alapból jobbra néznek). */
export const Heading: React.FC<{ icon: IconName; dir: 'left' | 'right'; className?: string; color?: string }> = ({ icon, dir, className = 'w-24 h-20', color }) => (
  <svg viewBox="0 0 100 80" className={className}>
    <rect x="2" y="2" width="96" height="76" rx="14" fill={icon === 'hal' ? '#bae6fd' : '#fff'} stroke="#94a3b8" strokeWidth="3" />
    {drawIcon(icon, 50, 40, 1.4, { flip: dir === 'left', color })}
  </svg>
);
const HEAD_NAME: Partial<Record<IconName, string>> = { hal: 'hal', csiga: 'csiga', madar: 'madár', meh: 'méh' };
export const headOpt = (icon: IconName, dir: 'left' | 'right', color?: string) => ({
  figure: <Heading icon={icon} dir={dir} color={color} />,
  say: `${dir === 'left' ? 'balra' : 'jobbra'} haladó ${HEAD_NAME[icon] ?? ''}`.trim(),
});

/** Kereszt alakú rács: középen Pötyi, körülötte tárgyak (mint a lépegetőben). `ask`: ide kerül „?”. */
export const CrossGrid: React.FC<{ around: Partial<Record<Dir, IconName>>; ask?: Dir; className?: string }> = ({ around, ask, className = 'w-full max-w-[260px] h-auto mx-auto' }) => {
  const c = 72;
  const cells: Record<Dir | 'mid', [number, number]> = { mid: [1, 1], up: [1, 0], down: [1, 2], left: [0, 1], right: [2, 1] };
  return (
    <svg viewBox={`0 0 ${3 * c + 8} ${3 * c + 8}`} className={className}>
      {(Object.keys(cells) as (Dir | 'mid')[]).map((k) => {
        const [col, row] = cells[k];
        const x = 4 + col * c;
        const y = 4 + row * c;
        const icon = k === 'mid' ? undefined : around[k];
        return (
          <g key={k}>
            <rect x={x} y={y} width={c} height={c} fill={k === 'mid' ? '#fef9c3' : '#fff'} stroke="#334155" strokeWidth="3" />
            {icon && ICONS[icon]({ x: x + c / 2, y: y + c / 2, s: 1.2 })}
            {k === ask && !icon && (
              <text x={x + c / 2} y={y + c / 2 + 12} textAnchor="middle" fontSize="34" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
                ?
              </text>
            )}
          </g>
        );
      })}
      <Potyi mood="happy" dots={7} x={4 + c + 6} y={4 + c + 6} size={c - 12} />
    </svg>
  );
};

/** Tárgyak sorban balról jobbra. */
export const RowScene: React.FC<{ icons: IconName[]; className?: string }> = ({ icons, className = 'w-full max-w-[420px] h-auto mx-auto' }) => (
  <svg viewBox={`0 0 ${icons.length * 80 + 20} 100`} className={className}>
    <rect x="0" y="0" width={icons.length * 80 + 20} height="100" rx="16" fill="#f0fdf4" />
    <path d={`M10 82 H${icons.length * 80 + 10}`} stroke="#16a34a" strokeWidth="4" />
    {icons.map((ic, i) => ICONS[ic]({ x: 50 + i * 80, y: 48, s: 1.4, key: i }))}
  </svg>
);

/** Egyetlen ikon kártyán (válaszlehetőségnek). */
export const IconCard: React.FC<{ icon: IconName; className?: string }> = ({ icon, className = 'w-20 h-20' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <rect x="3" y="3" width="74" height="74" rx="14" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    {ICONS[icon]({ x: 40, y: 40, s: 1.4 })}
  </svg>
);
const ICON_NAME: Record<IconName, string> = {
  alma: 'alma', labda: 'labda', virag: 'virág', csillag: 'csillag', hal: 'hal', auto: 'autó', madar: 'madár', level: 'levél', gomba: 'gomba', szív: 'szív', korong: 'korong', pillango: 'pillangó', csiga: 'csiga', meh: 'méh', eper: 'eper', katica: 'katica',
};
export const iconOpt = (icon: IconName) => ({ figure: <IconCard icon={icon} />, say: ICON_NAME[icon] });
export const iconName = (icon: IconName) => ICON_NAME[icon];

/** Növény cserépben: 1 mag, 2 kis hajtás, 3 virág (előbb – később). */
export const GrowPic: React.FC<{ stage: 1 | 2 | 3; className?: string }> = ({ stage, className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <rect x="3" y="3" width="94" height="94" rx="14" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    <path d="M28 66 H72 L66 92 H34 Z" fill="#c2410c" stroke="#7c2d12" strokeWidth="3" strokeLinejoin="round" />
    <rect x="26" y="62" width="48" height="8" rx="3" fill="#78350f" />
    {stage === 1 && <ellipse cx="50" cy="58" rx="7" ry="4.5" fill="#a16207" stroke="#713f12" strokeWidth="2" />}
    {stage >= 2 && <path d={`M50 62 V${stage === 2 ? 42 : 30}`} stroke="#15803d" strokeWidth="4" />}
    {stage >= 2 && (
      <>
        <ellipse cx="42" cy={stage === 2 ? 46 : 48} rx="9" ry="4.5" fill="#22c55e" stroke="#15803d" strokeWidth="2" transform={`rotate(-25 42 ${stage === 2 ? 46 : 48})`} />
        <ellipse cx="58" cy={stage === 2 ? 46 : 48} rx="9" ry="4.5" fill="#22c55e" stroke="#15803d" strokeWidth="2" transform={`rotate(25 58 ${stage === 2 ? 46 : 48})`} />
      </>
    )}
    {stage === 3 && ICONS.virag({ x: 50, y: 24, s: 1.1 })}
  </svg>
);
export const growOpt = (stage: 1 | 2 | 3) => ({ figure: <GrowPic stage={stage} />, say: ['', 'mag', 'kis hajtás', 'virág'][stage] });

/** Nyitó kép: Pötyi és Zümi a kertben. */
export const HideSeekScene: React.FC = () => (
  <svg viewBox="0 0 480 250">
    <rect x="0" y="0" width="480" height="250" rx="18" fill="#e0f2fe" />
    <path d="M0 200 Q120 180 240 196 T480 192 V250 H0 Z" fill="#86efac" />
    {ICONS.gomba({ x: 330, y: 186, s: 1.6 })}
    {ICONS.virag({ x: 420, y: 196, s: 1.2 })}
    {ICONS.virag({ x: 455, y: 212, s: 0.9, color: '#a855f7' })}
    {drawIcon('meh', 380, 80, 1.6)}
    <Potyi mood="cheer" dots={7} x={30} y={50} size={170} />
  </svg>
);

/** Bal és jobb: piros nyíl balra, kék nyíl jobbra (mint a könyv színezős feladatában), középen Pötyi. */
export const LeftRightScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef3c7" />
    <g transform="translate(20 60)">
      <path d="M150 40 H30" stroke="#dc2626" strokeWidth="16" strokeLinecap="round" />
      <path d="M60 10 L22 40 L60 70" fill="none" stroke="#dc2626" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <g transform="translate(290 60)">
      <path d="M20 40 H140" stroke="#2563eb" strokeWidth="16" strokeLinecap="round" />
      <path d="M110 10 L148 40 L110 70" fill="none" stroke="#2563eb" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="100" y="170" textAnchor="middle" fontSize="28" fontWeight="900" fill="#dc2626" fontFamily="system-ui, sans-serif">balra</text>
    <text x="370" y="170" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2563eb" fontFamily="system-ui, sans-serif">jobbra</text>
    <Potyi mood="happy" dots={7} x={190} y={40} size={100} />
  </svg>
);

/** Hal a víz bal oldalán, eledel a jobb (vagy bal) oldalon. */
export const FishFoodScene: React.FC<{ foodRight?: boolean }> = ({ foodRight = true }) => (
  <svg viewBox="0 0 360 150" className="w-full max-w-[400px] h-auto mx-auto">
    <rect x="0" y="0" width="360" height="150" rx="16" fill="#7dd3fc" />
    {drawIcon('hal', foodRight ? 70 : 290, 80, 1.6, { flip: !foodRight })}
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={(foodRight ? 290 : 70) + (i - 1) * 12} cy={70 + (i % 2) * 14} r="6" fill="#a16207" stroke="#713f12" strokeWidth="2" />
    ))}
  </svg>
);
