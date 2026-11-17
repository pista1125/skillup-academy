import React from 'react';
import { B, LogicBlock, Venn, VNum, place, vits, Ball, DigitCard, Shirt, Pants, T, Splash, StickMan, HoleSign, ShapeSign, FILL, PalName } from './GroupingExamG3Parts';

const vr = (l: Parameters<typeof vits>[0]) => vits(l).map((v) => ({ r: v.r, v }));

// ---------------------------------------------------------------------------
// 4. Gyakorlás, tudáspróba – összefoglaló ábrák (3. osztály)
// ---------------------------------------------------------------------------

/** A fejezet három témája egy képen. */
export const ChapterMapSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg">
    {[
      ['1. Válogatás', '#f0fdf4', '#16a34a'],
      ['2. Halmazábra', '#f5f3ff', '#7c3aed'],
      ['3. Sorrend, lehetőség', '#fff7ed', '#ea580c']
    ].map(([t, f, s], i) => (
      <g key={t}>
        <rect x={6 + i * 158} y="6" width="152" height="188" rx="14" fill={f} stroke={s} strokeWidth="2" />
        <T x={82 + i * 158} y={28} s={13} c={s}>{t}</T>
      </g>
    ))}
    {/* válogatás: doboz címkével */}
    <rect x="20" y="58" width="124" height="96" rx="12" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
    <rect x="52" y="48" width="60" height="20" rx="10" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
    <T x={82} y={62} s={12}>piros</T>
    <LogicBlock b={B('piros', 'kor', true, true)} x={50} y={96} k={0.75} />
    <LogicBlock b={B('piros', 'haromszog', false, false)} x={110} y={96} k={0.9} />
    <LogicBlock b={B('piros', 'negyzet', true, false)} x={80} y={132} k={0.6} />
    <LogicBlock b={B('kek', 'kor', true, false)} x={82} y={176} k={0.5} />
    <line x1="64" y1="168" x2="100" y2="184" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
    {/* halmazábra */}
    <g transform="translate(170 44) scale(0.58)">
      <Venn id="cmap" a="páros" b="háromjegyű" fs={14}>
        {place('overlap', vr([['a', 46], ['ab', 120], ['b', 305], ['out', 7]])).map((p, i) => (
          <VNum key={i} x={p.x} y={p.y} n={p.v.n ?? ''} fs={16} />
        ))}
      </Venn>
    </g>
    <T x={240} y={170} s={11} c="#5b21b6" w="normal">közös rész: mindkettő igaz</T>
    {/* sorrend */}
    {(['piros', 'kek', 'zold'] as PalName[]).map((c, i) => (
      <Ball key={c} x={352 + i * 30} y={70} r={12} c={c} />
    ))}
    {(['kek', 'zold', 'piros'] as PalName[]).map((c, i) => (
      <Ball key={c} x={352 + i * 30} y={102} r={12} c={c} />
    ))}
    <T x={382} y={136} s={13} c="#9a3412">… 6 sorrend</T>
    {['1', '0', '3'].map((d, i) => (
      <DigitCard key={d} x={340 + i * 28} y={146} d={d} w={24} h={32} fs={18} fill={d === '0' ? '#fef3c7' : '#ffffff'} />
    ))}
    <T x={382} y={190} s={12} c="#9a3412">4 szám</T>
  </svg>
);

/** A logikai lap 4 tulajdonsága és a jelek. */
export const BlockSignsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const rows: [string, React.ReactNode, string][] = [
    [
      'szín',
      <g key="s">
        {(['piros', 'sarga', 'kek', 'zold'] as const).map((c, i) => (
          <Splash key={c} x={150 + i * 34} y={32} c={FILL[c]} />
        ))}
      </g>,
      'piros, sárga, kék, zöld'
    ],
    [
      'méret',
      <g key="m">
        <StickMan x={160} y={76} big={false} />
        <StickMan x={210} y={76} big />
      </g>,
      'kicsi, nagy'
    ],
    [
      'lyukas?',
      <g key="l">
        <HoleSign x={160} y={120} holed />
        <HoleSign x={210} y={120} holed={false} />
      </g>,
      'lyukas, nem lyukas'
    ],
    [
      'forma',
      <g key="f">
        <ShapeSign x={150} y={164} s="kor" />
        <ShapeSign x={190} y={164} s="haromszog" />
        <ShapeSign x={230} y={164} s="negyzet" />
      </g>,
      'kör, háromszög, négyzet'
    ]
  ];
  return (
    <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg">
      {rows.map(([t, sign, txt], i) => (
        <g key={t}>
          <rect x="6" y={8 + i * 44} width="468" height="40" rx="10" fill={i % 2 ? '#f8fafc' : '#ffffff'} stroke="#cbd5e1" strokeWidth="1.5" />
          <T x={20} y={33 + i * 44} s={14} a="start">{t}</T>
          {sign}
          <T x={290} y={33 + i * 44} s={13} a="start" w="normal">{txt}</T>
        </g>
      ))}
    </svg>
  );
};

/** A halmazábra négy része. */
export const VennPartsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const rows: [string, string][] = [
    ['#fecaca', 'csak piros: piros, de nem lyukas'],
    ['#ddd6fe', 'közös rész: piros is, lyukas is'],
    ['#bfdbfe', 'csak lyukas: lyukas, de nem piros'],
    ['#fef3c7', 'kívül: se nem piros, se nem lyukas']
  ];
  return (
    <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(4 5)">
        <Venn id="vparts" frame="Logikai lapok" a="piros" b="lyukas" shade={['a', 'ab', 'b', 'out']}>
          {place('overlap', vr([['a', B('piros', 'kor', true, false)], ['ab', B('piros', 'haromszog', true, true)], ['b', B('kek', 'negyzet', true, true)], ['out', B('zold', 'kor', false, false)]])).map((p, i) =>
            p.v.blk ? <LogicBlock key={i} b={p.v.blk} x={p.x} y={p.y} k={0.65} sw={2} /> : null
          )}
        </Venn>
      </g>
      {rows.map(([c, t], i) => (
        <g key={t}>
          <rect x="252" y={24 + i * 40} width="20" height="20" rx="4" fill={c} stroke="#64748b" strokeWidth="1.5" />
          <T x={280} y={39 + i * 40} s={12} a="start" w="normal">{t}</T>
        </g>
      ))}
    </svg>
  );
};

/** Lehetőségek számolása: sorrend, számkártyák, öltözetek. */
export const CountingRecapSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => (
  <svg viewBox="0 0 480 180" className={className} xmlns="http://www.w3.org/2000/svg">
    {['3 golyó', '3 kártya, köztük 0', '2 póló, 3 nadrág'].map((t, i) => (
      <g key={t}>
        <rect x={6 + i * 158} y="6" width="152" height="168" rx="14" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
        <T x={82 + i * 158} y={28} s={13}>{t}</T>
      </g>
    ))}
    {(['piros', 'kek', 'zold'] as PalName[]).map((c, i) => (
      <Ball key={c} x={52 + i * 30} y={72} r={13} c={c} />
    ))}
    <T x={82} y={118} s={14} c="#166534" w="normal">mindegyik elöl 2-szer</T>
    <T x={82} y={152} s={18} c="#166534">3 · 2 = 6</T>
    {['2', '0', '5'].map((d, i) => (
      <DigitCard key={d} x={196 + i * 34} y={50} d={d} w={28} h={38} fs={22} fill={d === '0' ? '#fef3c7' : '#ffffff'} />
    ))}
    <T x={240} y={118} s={14} c="#9a3412" w="normal">0 nem állhat elöl</T>
    <T x={240} y={152} s={18} c="#166534">4 szám</T>
    <Shirt x={372} y={66} c="piros" r={13} />
    <Shirt x={372} y={98} c="kek" r={13} />
    {(['zold', 'barna', 'lila'] as PalName[]).map((c, i) => (
      <Pants key={c} x={408 + i * 26} y={82} c={c} r={11} />
    ))}
    <T x={398} y={136} s={14} c="#9a3412" w="normal">szorzunk!</T>
    <T x={398} y={160} s={18} c="#166534">2 · 3 = 6</T>
  </svg>
);

/** „Minden”, „van olyan”, „egyik sem”. */
export const QuantifiersSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xl h-auto mx-auto' }) => {
  const groups: [string[], boolean[], string][] = [
    [['Minden lap', 'lyukas.'], [true, true, true, true], 'mindegyikre igaz'],
    [['Van olyan lap,', 'amelyik lyukas.'], [false, true, false, false], 'egy is elég'],
    [['Egyik lap sem', 'lyukas.'], [false, false, false, false], 'egyikre sem igaz']
  ];
  const cols: ('piros' | 'kek' | 'sarga' | 'zold')[] = ['piros', 'kek', 'sarga', 'zold'];
  return (
    <svg viewBox="0 0 480 180" className={className} xmlns="http://www.w3.org/2000/svg">
      {groups.map(([t, holes, sub], g) => (
        <g key={t.join()}>
          <rect x={6 + g * 158} y="6" width="152" height="168" rx="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
          {t.map((line, k) => (
            <T key={line} x={82 + g * 158} y={26 + k * 16} s={13}>{line}</T>
          ))}
          {holes.map((h, i) => (
            <LogicBlock key={i} b={B(cols[i], i % 2 ? 'negyzet' : 'kor', true, h)} x={44 + g * 158 + (i % 2) * 76} y={80 + Math.floor(i / 2) * 44} k={0.8} />
          ))}
          <T x={82 + g * 158} y={164} s={13} c="#166534" w="normal">{sub}</T>
        </g>
      ))}
    </svg>
  );
};
