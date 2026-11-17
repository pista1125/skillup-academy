import React from 'react';
import { FONT, BigJug, ClBarChart, DRINK } from './CapacityG3Parts';
import { Ico, CupIcon, MugIcon, BottleIcon, BucketIcon, GlassIcon } from '../mit-mivel-merunk/WhatToMeasureG3Parts';

// ---------------------------------------------------------------------------
// 3. Az űrtartalom mérése – ábrák (3. osztály)
// ---------------------------------------------------------------------------

/** Edények és űrtartalmuk: kávéscsésze, bögre, palack, vödör. */
export const ContainersSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const items: [React.ReactNode, string, string][] = [
    [<CupIcon key="c" />, 'kávéscsésze', '6 cl'],
    [<MugIcon key="m" />, 'bögre', '3 dl'],
    [<BottleIcon key="b" />, 'palack', '1 l'],
    [<BucketIcon key="v" />, 'vödör', '10 l']
  ];
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
      {items.map(([art, name, v], i) => (
        <g key={name}>
          <Ico x={18 + i * 86} y={8} s={0.72}>
            {art}
          </Ico>
          <text x={54 + i * 86} y="104" textAnchor="middle" fontSize="12" fill="#334155">{name}</text>
          <text x={54 + i * 86} y="130" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1d4ed8">{v}</text>
        </g>
      ))}
    </svg>
  );
};

/** 1 l = 10 dl, 1 dl = 10 cl. */
export const LiterDlClSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="228" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <Ico x={4} y={8} s={0.8}>
      <BottleIcon label="1 l" fs={20} />
    </Ico>
    <text x="92" y="58" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">=</text>
    {Array.from({ length: 10 }, (_, i) => (
      <Ico key={i} x={102 + i * 25} y={30} s={0.32}>
        <GlassIcon sw={6} fill={0.9} color="#7dd3fc" />
      </Ico>
    ))}
    <text x="230" y="24" textAnchor="middle" fontSize="11" fill="#334155">10 pohár, mindegyikben 1 dl</text>
    <text x="230" y="84" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">1 l = 10 dl</text>
    <line x1="20" y1="98" x2="340" y2="98" stroke="#cbd5e1" strokeDasharray="4 4" />
    <Ico x={22} y={110} s={0.66}>
      <GlassIcon fill={0.9} color="#7dd3fc" />
    </Ico>
    <text x="55" y="186" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">1 dl</text>
    <text x="104" y="150" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">=</text>
    {Array.from({ length: 10 }, (_, i) => (
      <Ico key={i} x={118 + i * 22} y={132} s={0.2}>
        <GlassIcon sw={9} fill={0.9} color="#fdba74" />
      </Ico>
    ))}
    <text x="232" y="126" textAnchor="middle" fontSize="11" fill="#334155">10 kis pohárka, mindegyikben 1 cl</text>
    <text x="232" y="180" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">1 dl = 10 cl</text>
    <text x="180" y="216" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#b91c1c">1 l = 10 dl = 100 cl</text>
  </svg>
);

/** Mérőkancsó dl-beosztással: 7 dl = 70 cl. */
export const MeasuringJugSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xs h-auto mx-auto' }) => (
  <svg viewBox="0 0 240 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height="198" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <BigJug x={50} y={14} cl={70} />
    <text x="120" y="192" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">7 dl víz van benne = 70 cl</text>
  </svg>
);

/** 1 l 25 cl = 125 cl */
export const ClConvertSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#fffbeb" stroke="#fde68a" />
    <Ico x={10} y={8} s={0.86}>
      <BottleIcon label="1 l" fs={20} />
    </Ico>
    <text x="104" y="60" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">+</text>
    <Ico x={112} y={30} s={0.6}>
      <GlassIcon fill={0.7} color="#fdba74" />
    </Ico>
    <text x="142" y="106" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">25 cl</text>
    <text x="188" y="60" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">=</text>
    <text x="276" y="66" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#1d4ed8">? cl</text>
    <text x="180" y="128" textAnchor="middle" fontSize="13" fill="#334155">1 l 25 cl = 100 cl + 25 cl</text>
    <text x="180" y="150" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">1 l 25 cl = 125 cl</text>
  </svg>
);

/** Oszlopdiagram: a gyümölcsital hozzávalói (cl). */
export const DrinkChartSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 300 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="298" height="168" rx="14" fill="#ffffff" stroke="#cbd5e1" />
    <ClBarChart data={DRINK} x={44} y={20} h={120} bw={36} gap={24} />
  </svg>
);
