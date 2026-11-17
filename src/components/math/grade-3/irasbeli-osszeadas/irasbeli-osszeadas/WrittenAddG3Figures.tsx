import React from 'react';
import { FONT, Flat, Rod, Cube } from '../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';
import { WrittenAddG3ColumnG, columnAddSize } from './WrittenAddG3Column';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** 231 + 147: a három lépés egymás mellett – egyesek, tízesek, százasok. */
export const ThreeStepsSvg: Fig = ({ className }) => {
  const steps = [
    { res: '  8', hl: 0, cap: '1 e + 7 e = 8 e' },
    { res: ' 78', hl: 1, cap: '3 t + 4 t = 7 t' },
    { res: '378', hl: 2, cap: '2 sz + 1 sz = 3 sz' }
  ];
  const size = columnAddSize({ addends: [231, 147], cell: 28 });
  return (
    <Frame w={360} h={size.h + 58} className={className}>
      {steps.map((s, i) => {
        const x = 10 + i * 118 + (118 - size.w) / 2;
        return (
          <g key={i}>
            <WrittenAddG3ColumnG x={x} y={12} addends={[231, 147]} result={s.res} highlight={s.hl} cell={28} />
            <text x={10 + i * 118 + 59} y={size.h + 32} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#334155">{i + 1}. lépés</text>
            <text x={10 + i * 118 + 59} y={size.h + 48} textAnchor="middle" fontSize="12" fill="#475569">{s.cap}</text>
          </g>
        );
      })}
    </Frame>
  );
};

/** Egyes kocka-, tízesrúd- és százaslap-sor egy cellában. */
const Cell: React.FC<{ x: number; y: number; n: number; kind: 'sz' | 't' | 'e'; hlLast?: number }> = ({ x, y, n, kind, hlLast = 0 }) => {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const hl = i >= n - hlLast;
    if (kind === 'sz') out.push(<g key={i}>{hl && <rect x={x + i * 17 - 1.5} y={y - 1.5} width="17" height="17" rx="3" fill="#16a34a" />}<Flat x={x + i * 17} y={y} s={14} thin /></g>);
    else if (kind === 't') out.push(<g key={i}>{hl && <rect x={x + i * 6.5 - 1.5} y={y - 1.5} width="7.4" height="25" rx="2" fill="#16a34a" />}<Rod x={x + i * 6.5} y={y} w={4.4} h={22} thin /></g>);
    else out.push(<Cube key={i} x={x + (i % 5) * 8} y={y + Math.floor(i / 5) * 8} s={6.5} />);
  }
  return <g>{out}</g>;
};

const BlockTable: React.FC<{ x: number; y: number; rows: [number, number, number][]; hl?: [number, number, number] }> = ({ x, y, rows, hl = [0, 0, 0] }) => {
  const cw = [72, 66, 46];
  const cx = [x, x + cw[0], x + cw[0] + cw[1]];
  const rh = 30;
  return (
    <g fontFamily={FONT}>
      {['sz', 't', 'e'].map((l, i) => (
        <g key={l}>
          <rect x={cx[i]} y={y} width={cw[i]} height="16" fill={['#f87171', '#60a5fa', '#facc15'][i]} stroke="#fff" />
          <text x={cx[i] + cw[i] / 2} y={y + 12} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{l}</text>
          <rect x={cx[i]} y={y + 16} width={cw[i]} height={rows.length * rh + 6} fill={['#fee2e2', '#dbeafe', '#fef9c3'][i]} opacity="0.7" />
        </g>
      ))}
      {rows.map((r, j) => (
        <g key={j}>
          {j === rows.length - 1 && <line x1={x - 14} y1={y + 18 + j * rh} x2={x + 186} y2={y + 18 + j * rh} stroke="#334155" strokeWidth="1.6" />}
          {j === rows.length - 2 && <text x={x - 8} y={y + 38 + j * rh} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">+</text>}
          <Cell x={cx[0] + 4} y={y + 22 + j * rh} n={r[0]} kind="sz" hlLast={j === rows.length - 1 ? hl[0] : 0} />
          <Cell x={cx[1] + 4} y={y + 22 + j * rh} n={r[1]} kind="t" hlLast={j === rows.length - 1 ? hl[1] : 0} />
          <Cell x={cx[2] + 4} y={y + 22 + j * rh} n={r[2]} kind="e" />
        </g>
      ))}
    </g>
  );
};

/** 157 + 226: az egyeseknél 13 lesz – 10 egyest beváltunk 1 tízesre. */
export const CarryOnesSvg: Fig = ({ className }) => (
  <Frame w={360} h={150} className={className}>
    <BlockTable x={22} y={14} rows={[[1, 5, 7], [2, 2, 6], [3, 8, 3]]} hl={[0, 1, 0]} />
    <WrittenAddG3ColumnG x={234} y={10} addends={[157, 226]} result={383} carries={[null, 1]} cell={28} />
    <text x="100" y="140" textAnchor="middle" fontSize="11.5" fill="#15803d" fontWeight="bold">13 egyes = 1 tízes + 3 egyes</text>
  </Frame>
);

/** 163 + 254: a tízeseknél 11 lesz – 10 tízest beváltunk 1 százasra. */
export const CarryTensSvg: Fig = ({ className }) => (
  <Frame w={360} h={150} className={className}>
    <BlockTable x={22} y={14} rows={[[1, 6, 3], [2, 5, 4], [4, 1, 7]]} hl={[1, 0, 0]} />
    <WrittenAddG3ColumnG x={234} y={10} addends={[163, 254]} result={417} carries={[null, null, 1]} cell={28} />
    <text x="100" y="140" textAnchor="middle" fontSize="11.5" fill="#15803d" fontWeight="bold">11 tízes = 1 százas + 1 tízes</text>
  </Frame>
);

/** 168 + 275 = 443: beváltás az egyeseknél és a tízeseknél is. */
export const CarryBothSvg: Fig = ({ className }) => {
  const size = columnAddSize({ addends: [168, 275], carries: [null, 1, 1], cell: 30 });
  return (
    <Frame w={360} h={size.h + 24} className={className}>
      <WrittenAddG3ColumnG x={20} y={12} addends={[168, 275]} result={443} carries={[null, 1, 1]} cell={30} />
      <g fontSize="12.5" fill="#334155">
        <text x="150" y="40" fontWeight="bold" fill="#a16207">1. 8 meg 5 az 13.</text>
        <text x="164" y="56">Leírom a 3-at, maradt 1.</text>
        <text x="150" y="82" fontWeight="bold" fill="#1d4ed8">2. 6 meg 7 az 13, meg 1 az 14.</text>
        <text x="164" y="98">Leírom a 4-et, maradt 1.</text>
        <text x="150" y="124" fontWeight="bold" fill="#b91c1c">3. 1 meg 2 az 3, meg 1 az 4.</text>
        <text x="164" y="140">Leírom a 4-et.</text>
      </g>
    </Frame>
  );
};

/** Ellenőrzés a tagok felcserélésével: 157 + 226 és 226 + 157. */
export const CheckSwapSvg: Fig = ({ className }) => {
  const size = columnAddSize({ addends: [157, 226], cell: 28, header: false });
  return (
    <Frame w={360} h={size.h + 44} className={className}>
      <WrittenAddG3ColumnG x={18} y={14} addends={[157, 226]} result={383} cell={28} header={false} />
      <text x="180" y={14 + size.h / 2 + 6} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#16a34a">felcserélem</text>
      <path d={`M 140 ${14 + size.h / 2 + 14} L 218 ${14 + size.h / 2 + 14}`} stroke="#16a34a" strokeWidth="2.5" />
      <path d={`M 212 ${14 + size.h / 2 + 9} L 220 ${14 + size.h / 2 + 14} L 212 ${14 + size.h / 2 + 19}`} fill="none" stroke="#16a34a" strokeWidth="2.5" />
      <WrittenAddG3ColumnG x={228} y={14} addends={[226, 157]} result={383} cell={28} header={false} />
      <text x="180" y={size.h + 34} textAnchor="middle" fontSize="13" fill="#334155">Mindkétszer 383 lett. Jól számoltam!</text>
    </Frame>
  );
};

/** Három tag: 125 + 136 + 118 = 379. */
export const ThreeTermsSvg: Fig = ({ className }) => {
  const size = columnAddSize({ addends: [125, 136, 118], carries: [null, 1], cell: 28 });
  return (
    <Frame w={360} h={size.h + 24} className={className}>
      <WrittenAddG3ColumnG x={24} y={12} addends={[125, 136, 118]} result={379} carries={[null, 1]} cell={28} />
      <g fontSize="12.5" fill="#334155">
        <text x="150" y="52" fontWeight="bold" fill="#a16207">5 meg 6 meg 8 az 19.</text>
        <text x="164" y="68">Leírom a 9-et, maradt 1.</text>
        <text x="150" y="98" fontWeight="bold" fill="#1d4ed8">2 meg 3 meg 1 az 6, meg 1 az 7.</text>
        <text x="150" y="128" fontWeight="bold" fill="#b91c1c">1 meg 1 meg 1 az 3.</text>
        <text x="150" y="150" fill="#475569">Az összeg: 379.</text>
      </g>
    </Frame>
  );
};
