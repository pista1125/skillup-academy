import React from 'react';
import { SolidPart, SolidKind, FlatPart, FlatKind, CubeBuildingPart, SticksPart } from './ShapesG2Parts';

const Frame150: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
    {children}
  </svg>
);

const Frame80: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
    {children}
  </svg>
);

export const SolidCard150: React.FC<{ kind: SolidKind }> = ({ kind }) => (
  <Frame150>
    <SolidPart kind={kind} cx={75} cy={41} s={1.05} />
  </Frame150>
);

export const SolidCard80: React.FC<{ kind: SolidKind }> = ({ kind }) => (
  <Frame80>
    <SolidPart kind={kind} cx={40} cy={41} s={1.05} />
  </Frame80>
);

export const FlatCard150: React.FC<{ kind: FlatKind }> = ({ kind }) => (
  <Frame150>
    <FlatPart kind={kind} cx={75} cy={41} s={1.25} />
  </Frame150>
);

export const FlatCard80: React.FC<{ kind: FlatKind; sticks?: boolean }> = ({ kind, sticks }) => (
  <Frame80>
    {sticks ? <SticksPart kind={kind} cx={40} cy={41} s={1.15} /> : <FlatPart kind={kind} cx={40} cy={41} s={1.15} />}
  </Frame80>
);

export const BuildCard150: React.FC<{ heights: number[] }> = ({ heights }) => {
  const size = 15;
  const w = heights.length * size + size * 0.45;
  return (
    <Frame150>
      <rect x="12" y="68" width="126" height="4" rx="2" fill="#a8a29e" />
      <CubeBuildingPart heights={heights} x={75 - w / 2} y={68} size={size} />
    </Frame150>
  );
};

export type SimpleLine = 'egyenes' | 'gorbe' | 'torott';
const LINE_D: Record<SimpleLine, string> = {
  egyenes: 'M 14 60 L 66 20',
  gorbe: 'M 12 50 C 25 10, 45 75, 68 28',
  torott: 'M 12 58 L 28 22 L 44 58 L 60 22 L 70 40'
};

export const LineCard80: React.FC<{ kind: SimpleLine }> = ({ kind }) => (
  <Frame80>
    <path d={LINE_D[kind]} fill="none" stroke="#1d4ed8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </Frame80>
);
