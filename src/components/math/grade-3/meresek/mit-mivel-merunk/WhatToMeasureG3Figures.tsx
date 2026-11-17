import React from 'react';
import {
  FONT,
  Ico,
  RulerIcon,
  TapeIcon,
  BalanceIcon,
  BathScaleIcon,
  KitchenScaleIcon,
  JugIcon,
  GlassIcon,
  BottleIcon,
  BucketIcon,
  PencilIcon,
  MelonIcon,
  AppleIcon,
  Weight
} from './WhatToMeasureG3Parts';

// ---------------------------------------------------------------------------
// 1. Mit mivel mérünk? – ábrák (3. osztály)
// ---------------------------------------------------------------------------

const Check: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <path d={`M${x} ${y} l6 7 l12 -14`} fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
);
const Cross: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g stroke="#dc2626" strokeWidth="4" strokeLinecap="round">
    <line x1={x} y1={y - 7} x2={x + 14} y2={y + 7} />
    <line x1={x + 14} y1={y - 7} x2={x} y2={y + 7} />
  </g>
);

/** A három mennyiség: hosszúság, tömeg, űrtartalom. */
export const ThreeQuantitiesSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const panel = (x: number, color: string, stroke: string, q: string, name: string, art: React.ReactNode) => (
    <g>
      <rect x={x} y="8" width="110" height="174" rx="12" fill={color} stroke={stroke} strokeWidth="2" />
      <text x={x + 55} y="30" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0f172a">{q}</text>
      {art}
      <text x={x + 55} y="168" textAnchor="middle" fontSize="15" fontWeight="bold" fill={stroke}>{name}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {panel(
        6,
        '#fefce8',
        '#a16207',
        'Milyen hosszú?',
        'hosszúság',
        <g>
          <Ico x={14} y={46} s={0.94}>
            <PencilIcon />
          </Ico>
          <Ico x={14} y={82} s={0.94}>
            <RulerIcon />
          </Ico>
        </g>
      )}
      {panel(
        125,
        '#f1f5f9',
        '#334155',
        'Milyen nehéz?',
        'tömeg',
        <Ico x={138} y={46} s={0.84}>
          <BalanceIcon tilt={0} left={<Ico x={-14} y={-27} s={0.28}><MelonIcon sw={8} /></Ico>} right={<Weight cx={0} by={0} w={32} label="2 kg" fs={10} kg />} />
        </Ico>
      )}
      {panel(
        244,
        '#eff6ff',
        '#1d4ed8',
        'Mennyi fér bele?',
        'űrtartalom',
        <Ico x={252} y={44} s={0.95}>
          <JugIcon fill={7} />
        </Ico>
      )}
    </svg>
  );
};

/** Mérőeszközök a három mennyiséghez. */
export const MeasuringToolsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const tool = (x: number, y: number, label: string, art: React.ReactNode) => (
    <g>
      <rect x={x} y={y} width="104" height="86" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <Ico x={x + 22} y={y + 2} s={0.6}>
        {art}
      </Ico>
      <text x={x + 52} y={y + 78} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#1e293b">{label}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 330" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="328" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="62" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#a16207">hosszúság</text>
      <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">tömeg</text>
      <text x="298" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">űrtartalom</text>
      {tool(10, 34, 'vonalzó', <RulerIcon />)}
      {tool(10, 128, 'mérőszalag', <TapeIcon />)}
      {tool(128, 34, 'kétkarú mérleg', <BalanceIcon />)}
      {tool(128, 128, 'konyhai mérleg', <KitchenScaleIcon />)}
      {tool(128, 222, 'személymérleg', <BathScaleIcon />)}
      {tool(246, 34, 'mérőkancsó', <JugIcon fill={5} />)}
      {tool(246, 128, 'deciliteres pohár', <GlassIcon fill={0.8} color="#7dd3fc" />)}
    </svg>
  );
};

/** A mértékegységek, amelyeket már ismersz. */
export const KnownUnitsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const card = (x: number, fill: string, stroke: string, title: string, lines: string[], rule: string) => (
    <g>
      <rect x={x} y="8" width="110" height="150" rx="12" fill={fill} stroke={stroke} strokeWidth="2" />
      <text x={x + 55} y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill={stroke}>{title}</text>
      {lines.map((l, i) => (
        <text key={l} x={x + 55} y={62 + i * 28} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0f172a">{l}</text>
      ))}
      <rect x={x + 8} y="122" width="94" height="26" rx="8" fill="#ffffff" stroke={stroke} strokeWidth="1.5" />
      <text x={x + 55} y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill={stroke}>{rule}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 166" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {card(6, '#fefce8', '#a16207', 'hosszúság', ['m – méter', 'cm – centiméter'], '1 m = 100 cm')}
      {card(125, '#f1f5f9', '#334155', 'tömeg', ['kg – kilogramm'], 'pl. 3 kg')}
      {card(244, '#eff6ff', '#1d4ed8', 'űrtartalom', ['l – liter', 'dl – deciliter'], '1 l = 10 dl')}
    </svg>
  );
};

/** Jó mértékegységet választottunk? */
export const RightUnitSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const row = (y: number, art: React.ReactNode, good: string, bad: string) => (
    <g>
      <rect x="6" y={y} width="348" height="64" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      {art}
      <rect x="104" y={y + 12} width="110" height="40" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="146" y={y + 39} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#14532d">{good}</text>
      <Check x={182} y={y + 32} />
      <rect x="232" y={y + 12} width="110" height="40" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
      <text x="274" y={y + 39} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#7f1d1d">{bad}</text>
      <Cross x={312} y={y + 32} />
    </g>
  );
  return (
    <svg viewBox="0 0 360 222" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {row(
        6,
        <Ico x={16} y={10} s={0.56}>
          <PencilIcon />
        </Ico>,
        '15 cm',
        '15 m'
      )}
      {row(
        78,
        <Ico x={22} y={80} s={0.6}>
          <GlassIcon fill={0.75} color="#7dd3fc" />
        </Ico>,
        '2 dl',
        '2 l'
      )}
      {row(
        150,
        <Ico x={20} y={152} s={0.6}>
          <MelonIcon />
        </Ico>,
        '3 kg',
        '3 m'
      )}
    </svg>
  );
};

/** 1 m = 100 cm és 1 l = 10 dl képen. */
export const MeterLiterSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="208" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="20" y="20" width="320" height="24" rx="3" fill="#fde047" stroke="#a16207" strokeWidth="2" />
    <text x="180" y="38" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#713f12">1 m</text>
    {Array.from({ length: 101 }, (_, i) => (
      <line key={i} x1={20 + i * 3.2} y1="48" x2={20 + i * 3.2} y2={i % 10 === 0 ? 62 : i % 5 === 0 ? 58 : 54} stroke="#713f12" strokeWidth={i % 10 === 0 ? 1.4 : 0.7} />
    ))}
    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
      <text key={v} x={20 + v * 3.2} y="74" textAnchor="middle" fontSize="9" fill="#713f12">{v}</text>
    ))}
    <text x="180" y="94" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">1 m = 100 cm</text>
    <Ico x={14} y={104} s={0.8}>
      <BottleIcon label="1 l" fs={20} />
    </Ico>
    <text x="104" y="160" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">=</text>
    {Array.from({ length: 10 }, (_, i) => (
      <Ico key={i} x={118 + i * 23} y={128} s={0.3}>
        <GlassIcon sw={6} fill={0.85} color="#7dd3fc" />
      </Ico>
    ))}
    <text x="236" y="122" textAnchor="middle" fontSize="12" fill="#334155">10 pohár, mindegyikben 1 dl</text>
    <text x="236" y="190" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">1 l = 10 dl</text>
  </svg>
);

/** Becslés: mennyi víz fér a vödörbe? (mérés előtt tippelünk) */
export const EstimateBucketSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 320 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="168" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <Ico x={18} y={40} s={1}>
      <BucketIcon />
    </Ico>
    <rect x="140" y="28" width="164" height="50" rx="12" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
    <text x="222" y="49" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">1. Becslés (tipp)</text>
    <text x="222" y="68" textAnchor="middle" fontSize="13" fill="#9a3412">kb. 8 l fér bele</text>
    <rect x="140" y="92" width="164" height="50" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
    <text x="222" y="113" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">2. Mérés</text>
    <text x="222" y="132" textAnchor="middle" fontSize="13" fill="#14532d">10 liter fér bele</text>
  </svg>
);
