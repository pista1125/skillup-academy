import React from 'react';
import { CAP_FONT, JugPart, CupPart, MugPart, BucketPart, BottlePart, SpoonPart } from './CapacityG2Parts';

// ---------------------------------------------------------------------------
// 3. Az űrtartalom mérése – tananyag-ábrák (max. 480 px széles)
// ---------------------------------------------------------------------------

const CLS = 'w-full max-w-[480px] h-auto mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={CAP_FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Edények az űrtartalmuk szerint növekvő sorrendben. */
export const ContainersSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={480} h={150} className={className}>
    <SpoonPart cx={44} y={104} s={1.4} />
    <CupPart cx={132} y={104} s={1.3} />
    <MugPart cx={214} y={104} s={1.3} />
    <BottlePart cx={300} y={104} s={1.15} />
    <BucketPart cx={400} y={104} s={1.3} />
    {['kanál', 'pohár', 'bögre', 'palack', 'vödör'].map((t, i) => (
      <text key={t} x={[50, 132, 220, 300, 400][i]} y={126} textAnchor="middle" fontSize="13" fontWeight="900" fill="#334155">
        {t}
      </text>
    ))}
    <line x1="40" y1="140" x2="430" y2="140" stroke="#7c3aed" strokeWidth="2.5" />
    <polygon points="430,134 442,140 430,146" fill="#7c3aed" />
    <text x="240" y="22" textAnchor="middle" fontSize="13" fontWeight="900" fill="#5b21b6">
      Egyre több fér bele →
    </text>
  </Frame>
);

/** Áttöltéssel hasonlítunk: a kancsó vize nem tölti meg a vödröt. */
export const PourCompareSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={420} h={160} className={className}>
    <JugPart x={50} yBottom={130} w={50} unit={9} max={10} fill={10} labels={false} />
    <path d="M 130 70 Q 190 30 250 70" fill="none" stroke="#7c3aed" strokeWidth="3" />
    <polygon points="246,62 256,74 242,74" fill="#7c3aed" />
    <text x="190" y="36" textAnchor="middle" fontSize="13" fontWeight="900" fill="#5b21b6">
      áttöltöm
    </text>
    <g>
      <polygon points="270,70 350,70 340,130 280,130" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
      <polygon points="277,108 343,108 340,130 280,130" fill="#60a5fa" opacity="0.85" />
      <path d="M 272 70 Q 310 34 348 70" fill="none" stroke="#334155" strokeWidth="2.5" />
    </g>
    <text x="75" y="150" textAnchor="middle" fontSize="13" fontWeight="900" fill="#334155">
      kancsó
    </text>
    <text x="310" y="150" textAnchor="middle" fontSize="13" fontWeight="900" fill="#334155">
      vödör – még nincs tele!
    </text>
  </Frame>
);

/** Ugyanaz a kancsó: 4 bögre vagy 8 pohár. */
export const CupCountSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={480} h={170} className={className}>
    <JugPart x={24} yBottom={140} w={52} unit={10} max={10} fill={8} labels={false} />
    <text x="50" y="160" textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">
      kancsó
    </text>
    {Array.from({ length: 4 }, (_, i) => (
      <MugPart key={i} cx={130 + i * 40} y={66} s={1.1} color="#ef4444" />
    ))}
    <text x="380" y="58" textAnchor="middle" fontSize="15" fontWeight="900" fill="#b91c1c">
      4 bögre
    </text>
    {Array.from({ length: 8 }, (_, i) => (
      <CupPart key={i} cx={124 + i * 26} y={132} s={0.85} />
    ))}
    <text x="380" y="124" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1d4ed8">
      8 kis pohár
    </text>
    <text x="300" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      A kisebb pohárral többször kell meríteni.
    </text>
  </Frame>
);

/** 10 dl = 1 l. */
export const LiterDlSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={480} h={170} className={className}>
    {Array.from({ length: 10 }, (_, i) => (
      <CupPart key={i} cx={30 + (i % 5) * 34} y={i < 5 ? 64 : 124} s={1} label="1 dl" />
    ))}
    <text x="220" y="100" textAnchor="middle" fontSize="28" fontWeight="900" fill="#7c3aed">
      =
    </text>
    <JugPart x={262} yBottom={150} w={64} unit={12} max={10} fill={10} fontSize={14} />
    <text x="410" y="80" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
      10 dl
    </text>
    <text x="410" y="104" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
      = 1 l
    </text>
    <text x="410" y="130" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      fél liter = 5 dl
    </text>
  </Frame>
);

/** Mérőedény leolvasása: 13 dl = 1 l 3 dl, és fél liter = 5 dl. */
export const JugScaleSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={440} h={190} className={className}>
    <JugPart x={60} yBottom={176} w={64} unit={7.6} max={20} fill={13} fontSize={13} />
    <text x="200" y="70" fontSize="15" fontWeight="900" fill="#0f172a">
      1 l = 10 dl
    </text>
    <text x="200" y="94" fontSize="15" fontWeight="900" fill="#0f172a">
      fölötte még 3 vonás
    </text>
    <text x="200" y="124" fontSize="18" fontWeight="900" fill="#2563eb">
      13 dl = 1 l 3 dl
    </text>
    <text x="200" y="160" fontSize="12" fontWeight="bold" fill="#475569">
      Minden kis vonás 1 dl.
    </text>
  </Frame>
);
