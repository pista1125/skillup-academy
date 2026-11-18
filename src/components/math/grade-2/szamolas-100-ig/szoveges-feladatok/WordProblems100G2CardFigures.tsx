import React from 'react';
import { BarPart, BarSeg, CompareBarsPart, IconPart, IconKind } from './WordProblems100G2Parts';

/** 150 × 80 rész–egész szalag (fölötte az egész). */
export const BarCard150: React.FC<{ segs: BarSeg[]; total: string; icon?: IconKind }> = ({ segs, total, icon }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#fff1f2" stroke="#334155" strokeWidth="3" />
    {icon && <IconPart kind={icon} x={22} y={56} s={0.9} />}
    <BarPart x={icon ? 40 : 12} y={42} w={icon ? 100 : 126} h={26} segs={segs} total={total} fontSize={15} strokeW={2.2} />
  </svg>
);

/** 80 × 80 rész–egész szalag. */
export const BarCard80: React.FC<{ segs: BarSeg[]; total: string }> = ({ segs, total }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#fff1f2" stroke="#334155" strokeWidth="3" />
    <BarPart x={8} y={44} w={64} h={26} segs={segs} total={total} fontSize={13} strokeW={2} />
  </svg>
);

/** 150 × 80 összehasonlító szalagok. */
export const CompareCard150: React.FC<{ top: [string, number]; bottom: [string, number]; diff?: string }> = ({
  top,
  bottom,
  diff
}) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#f0f9ff" stroke="#334155" strokeWidth="3" />
    <CompareBarsPart
      x={10}
      y={12}
      w={130}
      h={24}
      nameW={0}
      rows={[
        { name: '', label: top[0], v: top[1] },
        { name: '', label: bottom[0], v: bottom[1] }
      ]}
      diffLabel={diff}
      fontSize={15}
      strokeW={2.2}
    />
  </svg>
);

/** 80 × 80 összehasonlító szalagok. */
export const CompareCard80: React.FC<{ top: [string, number]; bottom: [string, number]; diff?: string }> = ({
  top,
  bottom,
  diff
}) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#f0f9ff" stroke="#334155" strokeWidth="3" />
    <CompareBarsPart
      x={7}
      y={12}
      w={66}
      h={22}
      nameW={0}
      rows={[
        { name: '', label: top[0], v: top[1] },
        { name: '', label: bottom[0], v: bottom[1] }
      ]}
      diffLabel={diff}
      fontSize={13}
      strokeW={2}
    />
  </svg>
);
