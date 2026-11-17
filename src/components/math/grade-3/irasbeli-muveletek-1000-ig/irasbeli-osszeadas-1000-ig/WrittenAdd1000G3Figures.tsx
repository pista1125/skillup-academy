import React from 'react';
import { WrittenAddG3ColumnG, columnAddSize } from '../../irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Column';
import { FONT, GREEN, UNK, steps3, carryMarksAdd, partialSum, sumOf, Bar, stepLines } from './WrittenAdd1000G3Parts';

// Ábrák az 1. leckéhez (Írásbeli összeadás 1000-ig).

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Három lépés egymás mellett: az oszlop az adott lépés után, alatta a lépés kimondva. */
const AddPanels: React.FC<{ xs: number[]; title: string; className?: string }> = ({ xs, title, className }) => {
  const st = steps3(xs);
  const sum = sumOf(xs);
  const cell = 26;
  const size = columnAddSize({ addends: xs, cell, carryRow: true });
  const pw = 134;
  const top = 34;
  const capY = top + size.h + 18;
  const H = capY + 4 * 15 + 10;
  return (
    <Frame w={pw * 3 + 14} h={H} className={className}>
      <text x={(pw * 3 + 14) / 2} y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{title}</text>
      {[1, 2, 3].map((k, i) => {
        const x0 = 7 + i * pw;
        const lines = stepLines(st[i]);
        return (
          <g key={k}>
            <WrittenAddG3ColumnG x={x0 + (pw - size.w) / 2} y={top} addends={xs} result={partialSum(sum, k)} carries={carryMarksAdd(st, k)} carryRow highlight={k - 1} cell={cell} />
            <text x={x0 + pw / 2} y={capY - 2} textAnchor="middle" fontSize="11" fill="#64748b">{k}. lépés</text>
            {lines.map((l, j) => (
              <text key={j} x={x0 + pw / 2} y={capY + 14 + j * 15} textAnchor="middle" fontSize="12" fontWeight="bold" fill={l.green ? GREEN : '#0f172a'}>{l.t}</text>
            ))}
          </g>
        );
      })}
    </Frame>
  );
};

/** 476 + 358: ismétlés – kétszer is maradt 1. */
export const TwoAddendsSvg: Fig = ({ className }) => <AddPanels xs={[476, 358]} title="Két tag: kétszer is maradt 1" className={className} />;

/** 248 + 175 + 396: három tag, a tízeseknél maradt 2. */
export const ThreeAddendsSvg: Fig = ({ className }) => <AddPanels xs={[248, 175, 396]} title="Három tag: a tízeseknél 2 maradt" className={className} />;

/** 125 + 238 + 146 + 327: négy tag, az oszlop és a kimondott lépések. */
export const FourAddendsSvg: Fig = ({ className }) => {
  const xs = [125, 238, 146, 327];
  const st = steps3(xs);
  const cell = 28;
  const size = columnAddSize({ addends: xs, cell, carryRow: true });
  const lines = [0, 1, 2].map((i) => stepLines(st[i]));
  return (
    <Frame w={450} h={size.h + 28} className={className}>
      <WrittenAddG3ColumnG x={18} y={14} addends={xs} result={sumOf(xs)} carries={carryMarksAdd(st, 3)} cell={cell} />
      {lines.map((ls, i) => (
        <g key={i}>
          <text x="160" y={34 + i * 62} fontSize="12" fontWeight="bold" fill="#64748b">{['Egyesek', 'Tízesek', 'Százasok'][i]}:</text>
          <text x="160" y={51 + i * 62} fontSize="13" fontWeight="bold" fill="#0f172a">
            {ls[0].t} {ls[1] && ls[1].green ? <tspan fill={GREEN}>{ls[1].t}</tspan> : null}
          </text>
          <text x="160" y={68 + i * 62} fontSize="13" fontWeight="bold" fill="#0f172a">
            {ls.filter((l) => l.t.startsWith('Leírom'))[0].t} {ls[ls.length - 1].green && ls[ls.length - 1].t.startsWith('maradt') ? <tspan fill={GREEN}>{ls[ls.length - 1].t}</tspan> : null}
          </text>
        </g>
      ))}
    </Frame>
  );
};

/** 563 + 437 = 1000: a százasoknál is marad 1, ez az ezresek helyére kerül. */
export const ThousandSumSvg: Fig = ({ className }) => {
  const xs = [563, 437];
  const st = steps3(xs);
  const cell = 30;
  const size = columnAddSize({ addends: xs, cell, cols: 4, carryRow: true });
  const rows = [
    { h: 'Egyesek', t: '3 meg 7 az 10.', u: 'Leírom a 0-t, maradt 1.' },
    { h: 'Tízesek', t: '6 meg 3 az 9, meg 1 az 10.', u: 'Leírom a 0-t, maradt 1.' },
    { h: 'Százasok', t: '5 meg 4 az 9, meg 1 az 10.', u: 'Leírom a 0-t, maradt 1.' },
    { h: 'Ezresek', t: 'Az 1-et leírom', u: 'az ezresek helyére.' }
  ];
  return (
    <Frame w={400} h={Math.max(size.h + 28, 226)} className={className}>
      <WrittenAddG3ColumnG x={14} y={14} addends={xs} result={1000} cols={4} carries={[...carryMarksAdd(st, 3, 3), st[2].carryOut]} cell={cell} />
      {rows.map((r, i) => (
        <g key={i}>
          <text x="172" y={26 + i * 52} fontSize="12" fontWeight="bold" fill={i === 3 ? '#7c3aed' : '#64748b'}>{r.h}:</text>
          <text x="172" y={42 + i * 52} fontSize="13" fontWeight="bold" fill={i === 3 ? '#7c3aed' : '#0f172a'}>{r.t}</text>
          <text x="172" y={58 + i * 52} fontSize="13" fontWeight="bold" fill={i === 3 ? '#7c3aed' : '#0f172a'}>{r.u}</text>
        </g>
      ))}
    </Frame>
  );
};

/** Becslés és ellenőrzés: 248 + 175 + 396. Becslés százasra kerekítve, ellenőrzés alulról felfelé. */
export const EstimateCheckSvg: Fig = ({ className }) => (
  <Frame w={400} h={170} className={className}>
    <text x="100" y="26" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#7c2d12">Becslés (százasra)</text>
    {[
      ['248', '200'],
      ['175', '200'],
      ['396', '400']
    ].map(([a, b], i) => (
      <g key={i}>
        <text x="74" y={54 + i * 26} textAnchor="end" fontSize="16" fontWeight="bold" fill="#0f172a">{a}</text>
        <text x="100" y={54 + i * 26} textAnchor="middle" fontSize="16" fill="#64748b">≈</text>
        <text x="126" y={54 + i * 26} fontSize="16" fontWeight="bold" fill="#c2410c">{b}</text>
      </g>
    ))}
    <line x1="40" y1="118" x2="170" y2="118" stroke="#334155" strokeWidth="2" />
    <text x="126" y="140" fontSize="16" fontWeight="bold" fill="#c2410c">800</text>
    <text x="100" y="140" textAnchor="middle" fontSize="16" fill="#64748b">≈</text>
    <text x="74" y="140" textAnchor="end" fontSize="16" fontWeight="bold" fill="#1d4ed8">819</text>
    <text x="105" y="160" textAnchor="middle" fontSize="11.5" fill="#475569">A 819 közel van a 800-hoz.</text>
    <line x1="200" y1="14" x2="200" y2="156" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="300" y="26" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={GREEN}>Ellenőrzés alulról</text>
    <WrittenAddG3ColumnG x={236} y={36} addends={[248, 175, 396]} result={819} header={false} cell={24} />
    <path d="M 352 120 L 352 48" fill="none" stroke={GREEN} strokeWidth="3" markerEnd="url(#upArrow1000)" />
    <defs>
      <marker id="upArrow1000" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
        <path d="M 0 0 L 8 4 L 0 8 Z" fill={GREEN} />
      </marker>
    </defs>
    <text x="300" y="160" textAnchor="middle" fontSize="11.5" fill="#475569">6 meg 5 meg 8 … ugyanaz jön ki!</text>
  </Frame>
);

/** Szöveges feladat szalagos modellel: a kisvasút utasai három nap alatt. */
export const TrainWordSvg: Fig = ({ className }) => (
  <Frame w={400} h={150} className={className}>
    <text x="200" y="24" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#334155">Hány utas utazott a három nap alatt?</text>
    {[
      ['hétfő', 238, '#bae6fd'],
      ['kedd', 305, '#fde68a'],
      ['szerda', 197, '#bbf7d0']
    ].map(([d, n, f], i) => {
      const xs = [20, 20 + 238 * 0.48, 20 + (238 + 305) * 0.48];
      return (
        <g key={String(d)}>
          <Bar x={xs[i]} y={44} w={(n as number) * 0.48} label={String(n)} fill={f as string} h={28} fs={14} />
          <text x={xs[i] + ((n as number) * 0.48) / 2} y={90} textAnchor="middle" fontSize="12" fill="#475569">{d}</text>
        </g>
      );
    })}
    <path d={`M 20 102 Q 20 112 30 112 L ${20 + 740 * 0.24 - 10} 112 Q ${20 + 740 * 0.24} 112 ${20 + 740 * 0.24} 122 Q ${20 + 740 * 0.24} 112 ${20 + 740 * 0.24 + 10} 112 L ${20 + 740 * 0.48 - 10} 112 Q ${20 + 740 * 0.48} 112 ${20 + 740 * 0.48} 102`} fill="none" stroke={UNK} strokeWidth="2" />
    <text x={20 + 740 * 0.24} y={140} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>összesen: ?</text>
  </Frame>
);
