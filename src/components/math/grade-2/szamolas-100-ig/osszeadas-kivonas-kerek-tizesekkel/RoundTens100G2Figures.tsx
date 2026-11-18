import React from 'react';
import { RT_FONT, RodsPart, rodsWidth, NumLine100Part, CoinPart } from './RoundTens100G2Parts';

const FigBox: React.FC<{ h: number; children: React.ReactNode; label: string }> = ({ h, children, label }) => (
  <svg
    viewBox={`0 0 480 ${h}`}
    className="w-full max-w-[480px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={RT_FONT}
    role="img"
    aria-label={label}
  >
    <rect x="1" y="1" width="478" height={h - 2} rx="16" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
    {children}
  </svg>
);

/** 1 tízesrúd = 10 … 10 tízesrúd = 100 */
export const RoundTensStairsSvg: React.FC<{ className?: string }> = () => {
  const groups = [1, 3, 5, 8, 10];
  const rodW = 6;
  const gap = 2;
  let x = 22;
  return (
    <FigBox h={150} label="Kerek tízesek tízesrudakkal">
      {groups.map((g) => {
        const w = rodsWidth(g, 0, rodW, gap);
        const gx = x;
        x += w + 26;
        return (
          <g key={g}>
            <RodsPart x={gx} y={22} tens={g} cell={6} rodW={rodW} gap={gap} />
            <text x={gx + (w - gap) / 2} y={104} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">
              {g} tízes
            </text>
            <text x={gx + (w - gap) / 2} y={130} textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">
              {g * 10}
            </text>
          </g>
        );
      })}
    </FigBox>
  );
};

/** 3 + 5 = 8 → 30 + 50 = 80 */
export const SmallBigAnalogySvg: React.FC<{ className?: string }> = () => (
  <FigBox h={190} label="3 + 5 = 8, ezért 30 + 50 = 80">
    <text x="24" y="44" fontSize="22" fontWeight="900" fill="#065f46">
      3 + 5 = 8
    </text>
    {Array.from({ length: 8 }, (_, i) => (
      <rect
        key={i}
        x={200 + i * 22}
        y={24}
        width="16"
        height="16"
        rx="2"
        fill={i < 3 ? '#10b981' : '#3b82f6'}
        stroke={i < 3 ? '#065f46' : '#1e3a8a'}
        strokeWidth="1.6"
      />
    ))}
    <text x="24" y="74" fontSize="13" fill="#475569">
      egyeskockákkal
    </text>
    <line x1="20" y1="90" x2="460" y2="90" stroke="#fde68a" strokeWidth="2" />
    <text x="24" y="138" fontSize="22" fontWeight="900" fill="#92400e">
      30 + 50 = 80
    </text>
    <RodsPart x={200} y={102} tens={3} addTens={5} cell={7} rodW={10} gap={10} />
    <text x="24" y="168" fontSize="13" fill="#475569">
      tízesrudakkal
    </text>
  </FigBox>
);

/** 47 + 30 = 77: a tízesek nőnek, az egyesek maradnak. */
export const KeepOnesAddSvg: React.FC<{ className?: string }> = () => (
  <FigBox h={170} label="47 + 30 = 77">
    <RodsPart x={30} y={20} tens={4} addTens={3} ones={7} cell={7} rodW={12} gap={8} />
    <text x="250" y="48" fontSize="22" fontWeight="900" fill="#0f172a">
      47 + 30 = 77
    </text>
    <text x="250" y="78" fontSize="14" fontWeight="bold" fill="#92400e">
      4 tízes + 3 tízes = 7 tízes
    </text>
    <text x="250" y="102" fontSize="14" fontWeight="bold" fill="#065f46">
      A 7 egyes nem változik!
    </text>
    <text x="30" y="118" fontSize="12" fill="#475569">
      narancs: 47 • kék: + 30
    </text>
    <text x="30" y="150" fontSize="15" fontWeight="bold" fill="#1d4ed8">
      Csak a tízeseket adjuk össze.
    </text>
  </FigBox>
);

/** 86 − 50 = 36: tízesrudakat veszünk el. */
export const TakeTensSvg: React.FC<{ className?: string }> = () => (
  <FigBox h={170} label="86 − 50 = 36">
    <RodsPart x={30} y={20} tens={8} crossTens={5} ones={6} cell={7} rodW={12} gap={8} />
    <text x="270" y="48" fontSize="22" fontWeight="900" fill="#0f172a">
      86 − 50 = 36
    </text>
    <text x="270" y="78" fontSize="14" fontWeight="bold" fill="#be123c">
      8 tízes − 5 tízes = 3 tízes
    </text>
    <text x="270" y="102" fontSize="14" fontWeight="bold" fill="#065f46">
      A 6 egyes marad.
    </text>
    <text x="30" y="150" fontSize="15" fontWeight="bold" fill="#be123c">
      5 rudat áthúztunk: ennyit vettünk el.
    </text>
  </FigBox>
);

/** Tízes ugrások a számegyenesen: 25 + 40 = 65 */
export const TensJumpLineSvg: React.FC<{ className?: string }> = () => (
  <FigBox h={140} label="25 + 40 = 65 a számegyenesen">
    <text x="240" y="26" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
      25 + 40 = 65 → négy tízes ugrás
    </text>
    <g transform="translate(0,10)">
      <NumLine100Part x0={24} w={432} y={80} start={25} hops={4} dir={1} endLabel="65" fontSize={12} />
    </g>
  </FigBox>
);

/** 100 = 30 + 70 és a fizetés érmékkel */
export const HundredSplitCoinsSvg: React.FC<{ className?: string }> = () => (
  <FigBox h={170} label="100 = 30 + 70, és 70 Ft = 50 Ft + 20 Ft">
    <RodsPart x={24} y={22} tens={3} addTens={7} cell={6} rodW={9} gap={5} addColor="#a855f7" />
    <text x="96" y="104" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
      100 = 30 + 70
    </text>
    <line x1="200" y1="18" x2="200" y2="150" stroke="#fde68a" strokeWidth="2" />
    <text x="340" y="36" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
      70 Ft-ot így is fizethetsz:
    </text>
    <CoinPart cx={250} cy={68} value={50} scale={1.3} />
    <CoinPart cx={300} cy={68} value={20} scale={1.3} />
    <text x="390" y="74" fontSize="15" fontWeight="bold" fill="#475569">
      50 + 20
    </text>
    <CoinPart cx={240} cy={120} value={20} scale={1.2} />
    <CoinPart cx={278} cy={120} value={20} scale={1.2} />
    <CoinPart cx={316} cy={120} value={20} scale={1.2} />
    <CoinPart cx={354} cy={120} value={10} scale={1.2} />
    <text x="430" y="126" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
      20+20+20+10
    </text>
    <text x="96" y="140" textAnchor="middle" fontSize="12" fill="#475569">
      narancs: 3 tízes • lila: 7 tízes
    </text>
  </FigBox>
);
