import React from 'react';
import { Txt, Pie, Bar, equalAngles, equalCuts } from '../bevezetes/EqualPartsG3Parts';
import { Rod, Flag, Cup, MeterStick, firstK } from './FractionPartsG3Parts';

// ---------------------------------------------------------------------------
// 2. Törtrészek: fele, harmada, negyede – ábrák (3. osztály)
// ---------------------------------------------------------------------------

const cls = 'w-full max-w-xl h-auto mx-auto';
const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = cls, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width={w - 4} height={h - 4} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** 1 ketted, 1 harmad, 1 negyed, 1 hatod – egy-egy színes rész. */
export const PartNamesSvg: React.FC<{ className?: string }> = ({ className }) => {
  const items = [
    { n: 2, name: '1 ketted', other: 'a fele' },
    { n: 3, name: '1 harmad', other: 'a harmada' },
    { n: 4, name: '1 negyed', other: 'a negyede' },
    { n: 6, name: '1 hatod', other: 'a hatoda' }
  ];
  return (
    <Frame w={500} h={200} className={className}>
      {items.map((it, i) => {
        const cx = 66 + i * 122;
        return (
          <g key={it.n}>
            <Pie cx={cx} cy={78} r={50} bounds={equalAngles(it.n)} colored={[true]} color="#ef4444" base="#fde68a" />
            <Txt x={cx} y={154} s={18} c="#b91c1c">
              {it.name}
            </Txt>
            <Txt x={cx} y={178} s={14} c="#475569" w="normal">
              {it.other}
            </Txt>
          </g>
        );
      })}
    </Frame>
  );
};

/** Négy negyed egymás mellett: 1 negyed kék, 3 negyed zöld, együtt 4 negyed = 1 egész. */
export const QuartersSvg: React.FC<{ className?: string }> = ({ className }) => {
  const x0 = 40;
  const w = 105;
  return (
    <Frame w={500} h={190} className={className}>
      <path d={`M ${x0} 52 Q ${x0} 40 ${x0 + 12} 40 L ${x0 + 2 * w - 10} 40 Q ${x0 + 2 * w} 40 ${x0 + 2 * w} 30 Q ${x0 + 2 * w} 40 ${x0 + 2 * w + 10} 40 L ${x0 + 4 * w - 12} 40 Q ${x0 + 4 * w} 40 ${x0 + 4 * w} 52`} fill="none" stroke="#334155" strokeWidth={2.5} />
      <Txt x={x0 + 2 * w} y={22} s={16}>4 negyed = 1 egész</Txt>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={x0 + i * w} y={60} width={w} height={56} fill={i === 0 ? '#38bdf8' : '#4ade80'} stroke="#1e293b" strokeWidth={2.5} strokeDasharray="7 4" />
          <Txt x={x0 + i * w + w / 2} y={94} s={16}>1 negyed</Txt>
        </g>
      ))}
      <path d={`M ${x0 + w} 124 Q ${x0 + w} 136 ${x0 + w + 12} 136 L ${x0 + 2.5 * w - 10} 136 Q ${x0 + 2.5 * w} 136 ${x0 + 2.5 * w} 146 Q ${x0 + 2.5 * w} 136 ${x0 + 2.5 * w + 10} 136 L ${x0 + 4 * w - 12} 136 Q ${x0 + 4 * w} 136 ${x0 + 4 * w} 124`} fill="none" stroke="#15803d" strokeWidth={2.5} />
      <Txt x={x0 + 2.5 * w} y={168} s={16} c="#15803d">3 negyed zöld</Txt>
      <Txt x={x0 + w / 2} y={150} s={16} c="#0369a1">1 negyed kék</Txt>
    </Frame>
  );
};

/** Ugyanakkora csíkok: 1 ketted > 1 harmad > 1 negyed. */
export const CompareUnitsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows = [2, 3, 4, 6];
  return (
    <Frame w={500} h={230} className={className}>
      {rows.map((n, i) => (
        <g key={n}>
          <Bar x={30} y={22 + i * 48} w={330} h={34} cuts={equalCuts(n)} colored={[true]} color="#a78bfa" base="#ffffff" />
          <Txt x={378} y={45 + i * 48} s={17} a="start">
            1 {['ketted', 'harmad', 'negyed', 'hatod'][i]}
          </Txt>
        </g>
      ))}
      <Txt x={250} y={218} s={14} c="#475569" w="normal">Minél több részre osztjuk az egészet, annál kisebb 1 rész.</Txt>
    </Frame>
  );
};

/** Színes rudak: a narancssárga rúd fele, ötöde, tizede. */
export const RodPartsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const u = 30;
  const x0 = 24;
  return (
    <Frame w={500} h={200} className={className}>
      <Rod len={10} x={x0} y={18} unit={u} h={30} />
      <Txt x={x0 + 10 * u + 12} y={39} s={15} a="start">1 egész</Txt>
      {[
        { part: 5, name: '1 ketted' },
        { part: 2, name: '1 ötöd' },
        { part: 1, name: '1 tized' }
      ].map((r, i) => (
        <g key={r.part}>
          {Array.from({ length: 10 / r.part }, (_, j) => (
            <Rod key={j} len={r.part} x={x0 + j * r.part * u} y={62 + i * 42} unit={u} h={30} />
          ))}
          <Txt x={x0 + 10 * u + 12} y={83 + i * 42} s={15} a="start" c="#1d4ed8">
            {r.name}
          </Txt>
        </g>
      ))}
    </Frame>
  );
};

/** Hétköznapi törtrészek: zászló, mérőedény, méterrúd. */
export const EverydayPartsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={500} h={220} className={className}>
    <Flag kind="hu" x={26} y={30} w={120} h={78} />
    <Txt x={86} y={134} s={14}>1 harmada piros</Txt>
    <Cup x={210} y={34} w={50} h={110} fill={5} />
    <Txt x={240} y={176} s={14}>5 dl: a fele</Txt>
    <MeterStick x={330} y={60} w={150} k={1} />
    <Txt x={405} y={50} s={13} c="#475569" w="normal">1 m = 10 dm</Txt>
    <Txt x={405} y={116} s={14}>1 tized m = 1 dm</Txt>
    <Txt x={250} y={206} s={13} c="#475569" w="normal">A törtrészekkel a hétköznapokban is találkozol.</Txt>
  </Frame>
);

/** Mennyi hiányzik az egészhez? 3 negyed + 1 negyed = 1 egész. */
export const MissingPartSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={500} h={190} className={className}>
    <Pie cx={110} cy={86} r={64} bounds={equalAngles(4)} colored={firstK(4, 3)} color="#f97316" base="#ffffff" />
    <Txt x={110} y={176} s={15}>3 negyed</Txt>
    <Txt x={215} y={92} s={30}>+</Txt>
    <Pie cx={300} cy={86} r={64} bounds={equalAngles(4)} colored={[false, false, false, true]} color="#38bdf8" base="#ffffff" />
    <Txt x={300} y={176} s={15}>1 negyed</Txt>
    <Txt x={400} y={92} s={30}>=</Txt>
    <Txt x={455} y={96} s={18} c="#15803d">1 egész</Txt>
  </Frame>
);
