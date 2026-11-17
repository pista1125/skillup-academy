import React from 'react';
import { FONT, RectShape, GridRect, RightMark } from './RectPerimeterG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/**
 * Téglalap feliratokkal. w, h: arány (pl. cm-ben). labels: [felső, jobb, alsó, bal].
 * Párosító: 150 × 80, csoportosító: 80 × 80 (ott legfeljebb 2 rövid felirat fér el).
 */
export const RectCard: React.FC<{ w: number; h: number; labels?: (string | null)[]; small?: boolean; square?: boolean }> = ({ w, h, labels = [], small = false, square = false }) => {
  const W = small ? 80 : 150;
  const fs = small ? 12 : 16;
  // a bal és jobb felirat helye a szöveg hosszából
  const reserve = (t: string | null | undefined) => (t ? t.length * fs * 0.6 + 9 : 6);
  const left = reserve(labels[3]);
  const right = reserve(labels[1]);
  const maxW = W - left - right;
  const maxH = 80 - (labels[0] ? fs + 8 : 6) - (labels[2] ? fs + 8 : 6);
  const k = Math.min(maxW / w, maxH / h);
  const rw = w * k;
  const rh = h * k;
  const x = left + (maxW - rw) / 2;
  const top = labels[0] ? fs + 8 : 6;
  const y = top + (maxH - rh) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <RectShape x={x} y={y} w={rw} h={rh} labels={labels} fontSize={fs} marks={false} sw={3.5} same={square} fill={square ? '#dcfce7' : '#fef9c3'} />
    </svg>
  );
};

/** Négyzetrácsos téglalap. */
export const GridRectCard: React.FC<{ w: number; h: number; small?: boolean }> = ({ w, h, small = false }) => {
  const W = small ? 80 : 150;
  const cols = w + 2;
  const rows = h + 2;
  const s = Math.min((W - 6) / cols, 74 / rows, small ? 14 : 16);
  const x = (W - cols * s) / 2;
  const y = (80 - rows * s) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <GridRect x={x} y={y} s={s} cols={cols} rows={rows} c0={1} r0={1} w={w} h={h} />
    </svg>
  );
};

/** Elforgatott négyzet (csúcsára állítva), a derékszögek jelölésével. 80 × 80 */
export const DiamondSquareCard: React.FC = () => {
  const c = 40;
  const d = 30;
  const P: [number, number][] = [[c, c - d], [c + d, c], [c, c + d], [c - d, c]];
  const n = Math.SQRT1_2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <polygon points={P.map((p) => p.join(',')).join(' ')} fill="#dcfce7" stroke="#16a34a" strokeWidth="3.5" strokeLinejoin="round" />
      <RightMark x={P[0][0]} y={P[0][1]} u={[n, n]} v={[-n, n]} r={9} />
      <RightMark x={P[2][0]} y={P[2][1]} u={[-n, -n]} v={[n, -n]} r={9} />
    </svg>
  );
};

/** Nem téglalap alakú négyszögek és háromszög. 80 × 80 */
export const OtherShapeCard: React.FC<{ kind: 'rombusz' | 'paralelogramma' | 'haromszog' | 'trapez' }> = ({ kind }) => {
  const pts: Record<string, string> = {
    rombusz: '40,8 66,40 40,72 14,40',
    paralelogramma: '24,20 74,20 56,60 6,60',
    haromszog: '40,10 72,66 8,66',
    trapez: '24,18 56,18 72,62 8,62'
  };
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <polygon points={pts[kind]} fill="#fde68a" stroke="#b45309" strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  );
};
