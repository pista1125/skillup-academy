import React from 'react';
import { FONT, B, Block, LogicBlock, COLORS, LabelBox, NumCard } from './SortingByPropertyG3Parts';

// ---------------------------------------------------------------------------
// 1. Válogatás tulajdonságok szerint – ábrák (3. osztály)
// ---------------------------------------------------------------------------

const T: React.FC<{ x: number; y: number; s?: number; c?: string; a?: 'start' | 'middle' | 'end'; w?: 'bold' | 'normal'; children: React.ReactNode }> = ({
  x,
  y,
  s = 13,
  c = '#0f172a',
  a = 'middle',
  w = 'bold',
  children
}) => (
  <text x={x} y={y} fontSize={s} fill={c} textAnchor={a} fontWeight={w} fontFamily={FONT}>
    {children}
  </text>
);

/** A logikai lapok négy tulajdonsága: szín, forma, méret, lyukas-e. */
export const LogicSetSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const row = (y: number, title: string, fill: string) => (
    <g>
      <rect x="8" y={y} width="464" height="76" rx="12" fill={fill} stroke="#cbd5e1" strokeWidth="1.5" />
      <T x={22} y={y + 43} a="start" s={15}>{title}</T>
    </g>
  );
  const item = (x: number, y: number, b: Block, label: string) => (
    <g>
      <LogicBlock b={b} x={x} y={y + 30} k={0.9} />
      <T x={x} y={y + 68} s={13}>{label}</T>
    </g>
  );
  return (
    <svg viewBox="0 0 480 334" className={className} xmlns="http://www.w3.org/2000/svg">
      {row(4, 'szín', '#fef2f2')}
      {COLORS.map((c, i) => (
        <g key={c}>{item(150 + i * 88, 4, B(c, 'kor', true, false), ['piros', 'sárga', 'kék', 'zöld'][i])}</g>
      ))}
      {row(86, 'forma', '#eff6ff')}
      {(['kor', 'haromszog', 'negyzet'] as const).map((s, i) => (
        <g key={s}>{item(150 + i * 110, 86, B('kek', s, true, false), ['kör', 'háromszög', 'négyzet'][i])}</g>
      ))}
      {row(168, 'méret', '#fefce8')}
      {item(150, 168, B('sarga', 'negyzet', true, false), 'nagy')}
      {item(260, 168, B('sarga', 'negyzet', false, false), 'kicsi')}
      {row(250, 'lyukas?', '#f0fdf4')}
      {item(150, 250, B('zold', 'haromszog', true, true), 'lyukas')}
      {item(260, 250, B('zold', 'haromszog', true, false), 'nem lyukas')}
    </svg>
  );
};

/** Válogatás egy tulajdonság szerint: piros – nem piros. */
export const OnePropertySortSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const red: Block[] = [B('piros', 'kor', true, true), B('piros', 'negyzet', false, false), B('piros', 'haromszog', true, false)];
  const other: Block[] = [B('kek', 'kor', false, true), B('sarga', 'negyzet', true, false), B('zold', 'haromszog', false, true), B('kek', 'negyzet', true, true)];
  return (
    <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg">
      <LabelBox x={10} y={22} w={190} h={136} label="piros lapok" fill="#fef2f2" stroke="#dc2626" />
      <LabelBox x={220} y={22} w={250} h={136} label="nem piros lapok" fill="#f1f5f9" stroke="#475569" />
      {red.map((b, i) => (
        <LogicBlock key={i} b={b} x={50 + i * 55} y={i % 2 ? 115 : 72} />
      ))}
      {other.map((b, i) => (
        <LogicBlock key={i} b={b} x={262 + i * 56} y={i % 2 ? 115 : 72} />
      ))}
    </svg>
  );
};

const Mark: React.FC<{ x: number; y: number; ok: boolean; s?: number }> = ({ x, y, ok, s = 6 }) =>
  ok ? (
    <path d={`M${x - s} ${y} l${s * 0.7} ${s * 0.8} l${s * 1.4} -${s * 1.7}`} fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  ) : (
    <g stroke="#dc2626" strokeWidth="3" strokeLinecap="round">
      <line x1={x - s * 0.7} y1={y - s * 0.7} x2={x + s * 0.7} y2={y + s * 0.7} />
      <line x1={x + s * 0.7} y1={y - s * 0.7} x2={x - s * 0.7} y2={y + s * 0.7} />
    </g>
  );

/** Két tulajdonság egyszerre: „piros és lyukas”. */
export const TwoPropertiesSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const all: Block[] = [
    B('piros', 'kor', true, true),
    B('piros', 'negyzet', true, false),
    B('kek', 'kor', true, true),
    B('piros', 'haromszog', false, true),
    B('sarga', 'negyzet', false, true),
    B('piros', 'negyzet', false, true)
  ];
  return (
    <svg viewBox="0 0 480 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <T x={240} y={22} s={15}>Keressük a piros ÉS lyukas lapokat!</T>
      <T x={8} y={137} a="start" s={12} c="#475569">piros?</T>
      <T x={8} y={162} a="start" s={12} c="#475569">lyukas?</T>
      {all.map((b, i) => {
        const x = 90 + i * 70;
        const red = b.color === 'piros';
        const ok = red && b.holed;
        return (
          <g key={i}>
            <rect x={x - 30} y="36" width="60" height="70" rx="10" fill={ok ? '#dcfce7' : '#f8fafc'} stroke={ok ? '#16a34a' : '#cbd5e1'} strokeWidth={ok ? 3 : 1.5} />
            <LogicBlock b={b} x={x} y={71} />
            <Mark x={x} y={133} ok={red} />
            <Mark x={x} y={158} ok={b.holed} />
            <circle cx={x} cy={192} r="13" fill={ok ? '#dcfce7' : '#fee2e2'} stroke={ok ? '#16a34a' : '#dc2626'} strokeWidth="2" />
            <Mark x={x} y={193} ok={ok} s={5} />
          </g>
        );
      })}
      <T x={240} y={224} s={13} w="normal" c="#334155">Csak az kell, ahol mindkét sorban pipa van.</T>
    </svg>
  );
};

/** Melyik nem illik a sorba? Két jó megoldás is van. */
export const OddOneOutSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const row: Block[] = [B('kek', 'kor', true, true), B('kek', 'negyzet', true, true), B('kek', 'kor', true, true), B('kek', 'kor', false, true)];
  return (
    <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg">
      {row.map((b, i) => (
        <g key={i}>
          <LogicBlock b={b} x={70 + i * 110} y={58} k={1.1} />
          <T x={70 + i * 110} y={110} s={15}>{i + 1}.</T>
        </g>
      ))}
      <rect x="60" y="124" width="160" height="56" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
      <T x={140} y={147} s={13}>A 2. nem illik bele,</T>
      <T x={140} y={166} s={13} w="normal">mert az nem kör.</T>
      <rect x="260" y="124" width="160" height="56" rx="10" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
      <T x={340} y={147} s={13}>A 4. nem illik bele,</T>
      <T x={340} y={166} s={13} w="normal">mert az kicsi.</T>
    </svg>
  );
};

/** Válogatási fa: nagy, piros lapok → lyukas? → forma. */
export const SortingTreeSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const leaves: Block[] = [
    B('piros', 'kor', true, true),
    B('piros', 'haromszog', true, true),
    B('piros', 'negyzet', true, true),
    B('piros', 'kor', true, false),
    B('piros', 'haromszog', true, false),
    B('piros', 'negyzet', true, false)
  ];
  const lx = (i: number) => 50 + i * 76;
  return (
    <svg viewBox="0 0 480 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <g stroke="#475569" strokeWidth="2.5" fill="none">
        <path d="M240 46 L126 100" />
        <path d="M240 46 L354 100" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M126 126 L${lx(i)} 178`} />
        ))}
        {[3, 4, 5].map((i) => (
          <path key={i} d={`M354 126 L${lx(i)} 178`} />
        ))}
      </g>
      <rect x="160" y="10" width="160" height="36" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
      <T x={240} y={33} s={14}>nagy, piros lapok</T>
      <rect x="76" y="100" width="100" height="26" rx="8" fill="#ffffff" stroke="#475569" strokeWidth="2" />
      <T x={126} y={118} s={13}>lyukas</T>
      <rect x="304" y="100" width="100" height="26" rx="8" fill="#ffffff" stroke="#475569" strokeWidth="2" />
      <T x={354} y={118} s={13}>nem lyukas</T>
      {leaves.map((b, i) => (
        <g key={i}>
          <LogicBlock b={b} x={lx(i)} y={204} k={0.95} />
          <T x={lx(i)} y={244} s={12} w="normal">{['kör', 'háromszög', 'négyzet'][i % 3]}</T>
        </g>
      ))}
    </svg>
  );
};

/** Számok csoportjai címkével. */
export const NumberLabelsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const even = [124, 36, 410, 258, 300];
  const odd = [47, 215, 333, 9, 481];
  return (
    <svg viewBox="0 0 480 160" className={className} xmlns="http://www.w3.org/2000/svg">
      <LabelBox x={10} y={22} w={220} h={128} label="páros számok" fill="#eff6ff" stroke="#2563eb" fs={13} />
      <LabelBox x={250} y={22} w={220} h={128} label="páratlan számok" fill="#fff7ed" stroke="#ea580c" fs={13} />
      {even.map((n, i) => (
        <NumCard key={n} x={50 + (i % 3) * 70} y={i < 3 ? 68 : 118} n={n} />
      ))}
      {odd.map((n, i) => (
        <NumCard key={n} x={290 + (i % 3) * 70} y={i < 3 ? 68 : 118} n={n} />
      ))}
    </svg>
  );
};
