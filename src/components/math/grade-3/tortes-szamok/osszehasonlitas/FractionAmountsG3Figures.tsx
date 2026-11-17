import React from 'react';
import { FONT, UNK, ObjRows, Strip, ClockPie, SegmentRuler, Road, Jug } from './FractionAmountsG3Parts';

// Nagy ábrák a 3. lecke (Törtrész mennyiségekből) tananyagához.

const C = 'w-full max-w-[460px] h-auto mx-auto';

/** 12 alma 4 egyenlő sorban: a 12 negyede 3. */
export const ShareApplesSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="168" rx="12" fill="#fff7ed" stroke="#fdba74" />
    <text x="180" y="24" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9a3412">12 alma, 4 egyenlő részre</text>
    <ObjRows x={50} y={52} n={12} k={4} gap={26} rowGap={30} r={9} hl={1} />
    {['1 negyed', '1 negyed', '1 negyed', '1 negyed'].map((t, i) => (
      <text key={i} x={130} y={56 + i * 30} fontSize="12" fill="#475569">{t}</text>
    ))}
    <rect x="212" y="62" width="134" height="68" rx="10" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
    <text x="279" y="88" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">12 negyede:</text>
    <text x="279" y="116" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#c2410c">12 : 4 = 3</text>
  </svg>
);

/** 1 kg = 100 dkg, 4 egyenlő részre: negyed kg = 25 dkg. */
export const QuarterKgSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="148" rx="12" fill="#fefce8" stroke="#fde047" />
    {/* kenyér */}
    <g>
      <ellipse cx="62" cy="80" rx="44" ry="24" fill="#d97706" stroke="#78350f" strokeWidth="2" />
      {[38, 56, 74, 92].map((x) => (
        <path key={x} d={`M ${x - 6} 64 Q ${x} 70 ${x + 6} 64`} fill="none" stroke="#fde68a" strokeWidth="2.5" />
      ))}
      <text x="62" y="128" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#78350f">1 kg kenyér</text>
    </g>
    <Strip x={130} y={66} w={210} h={34} n={4} fill={[0]} color="#fbbf24" labels={['25 dkg', '25 dkg', '25 dkg', '25 dkg']} top="1 kg = 100 dkg" fs={12} />
    <text x="235" y="126" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">negyed kg = 100 : 4 = 25 dkg</text>
  </svg>
);

/** 1 m = 100 cm, 5 egyenlő részre: ötöde 20 cm. */
export const FifthMeterSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="12" fill="#f0f9ff" stroke="#7dd3fc" />
    <Strip x={30} y={46} w={300} h={32} n={5} fill={[0]} color="#f87171" labels={['20 cm', '20 cm', '20 cm', '20 cm', '20 cm']} top="1 m = 100 cm" fs={13} />
    <rect x="30" y="92" width="300" height="14" rx="7" fill="#78350f" />
    <line x1="90" y1="86" x2="90" y2="112" stroke={UNK} strokeWidth="2.5" strokeDasharray="4 3" />
    <text x="180" y="128" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">1 m ötöde: 100 : 5 = 20 cm</text>
  </svg>
);

/** Óra: fele 30, harmada 20, negyede 15 perc. */
export const ClockPartsSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="158" rx="12" fill="#faf5ff" stroke="#d8b4fe" />
    <text x="180" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b21a8">1 óra = 60 perc</text>
    {[
      { n: 2, t: 'fele: 30 perc', c: '#f472b6' },
      { n: 3, t: 'harmada: 20 perc', c: '#a78bfa' },
      { n: 4, t: 'negyede: 15 perc', c: '#fbbf24' }
    ].map((o, i) => (
      <g key={o.n}>
        <ClockPie cx={65 + i * 115} cy={82} r={44} n={o.n} shade={60 / o.n} color={o.c} />
        <text x={65 + i * 115} y={146} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{o.t}</text>
      </g>
    ))}
  </svg>
);

/** 12 cm-es szakasz: fele, harmada, negyede. */
export const SegmentPartsSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="168" rx="12" fill="#f0fdf4" stroke="#86efac" />
    <SegmentRuler x={24} y={30} cm={12} u={19} />
    <text x="180" y="18" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">a szakasz 12 cm</text>
    {[
      { n: 2, c: '#16a34a', t: 'fele: 6 cm' },
      { n: 3, c: '#2563eb', t: 'harmada: 4 cm' },
      { n: 4, c: '#dc2626', t: 'negyede: 3 cm' }
    ].map((o, i) => {
      const y = 96 + i * 26;
      const pw = 228 / o.n;
      return (
        <g key={o.n}>
          {Array.from({ length: o.n }, (_, j) => (
            <line key={j} x1={24 + j * pw} y1={y} x2={24 + (j + 1) * pw - 3} y2={y} stroke={j === 0 ? o.c : '#cbd5e1'} strokeWidth="6" strokeLinecap="round" />
          ))}
          <text x={262} y={y + 5} fontSize="12" fontWeight="bold" fill={o.c}>{o.t}</text>
        </g>
      );
    })}
  </svg>
);

/** Fél liter: 1 l = 10 dl, fele 5 dl. */
export const HalfLitreSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="158" rx="12" fill="#ecfeff" stroke="#67e8f9" />
    <Jug x={50} y={30} w={50} h={110} level={5} nums top="1 l = 10 dl" />
    <text x="150" y="60" fontSize="14" fontWeight="bold" fill="#155e75">1 l fele: 10 : 2 = 5 dl</text>
    <text x="150" y="88" fontSize="14" fontWeight="bold" fill="#155e75">1 l tizede: 1 dl</text>
    <text x="150" y="116" fontSize="14" fontWeight="bold" fill="#155e75">1 dl fele: 10 cl : 2 = 5 cl</text>
  </svg>
);

/** 400 m-es út: egyik a negyedét, másik a felét tette meg. */
export const RoadSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="118" rx="12" fill="#fff1f2" stroke="#fda4af" />
    <Road x={30} y={62} w={300} n={4} a={1} b={2} total="400 m" />
    <text x="30" y="108" fontSize="12" fontWeight="bold" fill="#2563eb">negyede: 100 m</text>
    <text x="330" y="108" textAnchor="end" fontSize="12" fontWeight="bold" fill="#ea580c">fele: 200 m</text>
  </svg>
);
