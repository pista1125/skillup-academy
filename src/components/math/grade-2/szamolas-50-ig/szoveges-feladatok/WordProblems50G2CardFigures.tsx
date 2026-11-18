import React from 'react';
import { WP_FONT, BarModelPart, BarSeg, CompareBarsPart, CompareRow, DotsPart, DOT_RED, DOT_GREEN } from './WordProblems50G2Parts';

// Kártyaképek: Párosító 150 × 80, Csoportosító 80 × 80. Nem írják ki az eredményt.

const Card: React.FC<{ w: number; children?: React.ReactNode }> = ({ w, children }) => (
  <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={WP_FONT}>
    <rect x="3" y="3" width={w - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** Korongok: `a` piros (+ `b` zöld), az utolsó `crossed` áthúzva. */
export const DotsCard: React.FC<{ a: number; b?: number; crossed?: number; small?: boolean }> = ({ a, b = 0, crossed = 0, small }) => {
  const total = a + b;
  const rows = Math.ceil(total / 10);
  const groups = b > 0 ? [{ count: a, ...DOT_RED }, { count: b, ...DOT_GREEN }] : [{ count: a, ...DOT_RED }];
  if (small) {
    const r = 2.6;
    const pad = 1.4;
    const step = 2 * r + pad;
    const w = 9 * step + 3 * r;
    return (
      <Card w={80}>
        <DotsPart x={(80 - w) / 2} y={(80 - rows * step) / 2} r={r} pad={pad} groups={groups} crossed={crossed} />
      </Card>
    );
  }
  const r = rows > 4 ? 4.2 : 5;
  const pad = rows > 4 ? 2.4 : 3;
  const step = 2 * r + pad;
  const w = 9 * step + 3 * r;
  return (
    <Card w={150}>
      <DotsPart x={(150 - w) / 2} y={(80 - rows * step) / 2} r={r} pad={pad} groups={groups} crossed={crossed} />
    </Card>
  );
};

/** Szakaszos ábra kártyán. */
export const BarCard: React.FC<{ parts: BarSeg[]; total: number | string; small?: boolean }> = ({ parts, total, small }) =>
  small ? (
    <Card w={80}>
      <BarModelPart x={8} y={10} w={64} h={22} parts={parts} total={total} fs={12} />
    </Card>
  ) : (
    <Card w={150}>
      <BarModelPart x={12} y={9} w={126} h={24} parts={parts} total={total} fs={14} />
    </Card>
  );

/** Két összehasonlító szalag, a különbség jelölésével. */
export const CompareCard: React.FC<{ rows: CompareRow[]; diff?: string; small?: boolean }> = ({ rows, diff, small }) =>
  small ? (
    <Card w={80}>
      <CompareBarsPart x={6} y={14} w={68} labelW={2} rowH={20} gap={14} rows={rows} diff={diff} fs={12} />
    </Card>
  ) : (
    <Card w={150}>
      <CompareBarsPart x={8} y={12} w={134} labelW={2} rowH={22} gap={12} rows={rows} diff={diff} fs={14} />
    </Card>
  );
