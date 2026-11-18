// „Számolás 0-tól 8-ig” – a hógolyócsata képei (a téli alapképek az a-nyolc leckéből jönnek).
import React from 'react';
import { EqCard, HatRow } from '../a-nyolc/ANyolcG1Scenes';

/** Kép + alatta a művelet (pl. "5 + 3 = ?"). */
export const PicEq: React.FC<{ pic: React.ReactNode; eq: string }> = ({ pic, eq }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="w-full max-w-[260px] [&>svg]:w-full [&>svg]:h-auto">{pic}</div>
    <EqCard text={eq} className="w-full max-w-[300px] h-auto" />
  </div>
);

/** A 8 bontásai sapkasorokkal: 7 + 1, 6 + 2, 5 + 3, 4 + 4. */
export const HatSplitsScene: React.FC = () => (
  <svg viewBox="0 0 460 360" className="w-full max-w-[440px] h-auto mx-auto">
    {[
      [7, 1],
      [6, 2],
      [5, 3],
      [4, 4],
    ].map(([a, b], i) => (
      <svg key={i} x="0" y={i * 90} width="460" height="80" viewBox="0 0 452 80">
        <HatRow a={a} b={b} className="" />
      </svg>
    ))}
  </svg>
);

/** Két művelet egymás alatt (pl. csere: 5 + 3 = 8 és 3 + 5 = 8). */
export const TwoEqScene: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <div className="flex flex-col items-center gap-2">
    <EqCard text={a} className="w-full max-w-[340px] h-auto" />
    <EqCard text={b} className="w-full max-w-[340px] h-auto" />
  </div>
);
