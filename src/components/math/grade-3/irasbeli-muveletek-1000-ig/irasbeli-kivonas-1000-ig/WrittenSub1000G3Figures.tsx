import React from 'react';
import { WrittenSubG3ColumnG, columnSubSize } from '../../irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Column';
import { FONT, GREEN, stepsSub, carryMarksSub, partialDiff, suffixHoz, ThousandBar } from './WrittenSub1000G3Parts';

// Ábrák a 2. leckéhez (Írásbeli kivonás 1000-ig) – pótlásos-maradékos módszer.

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const artD = (d: number) => (d === 1 || d === 5 ? 'az' : 'a');

/** Három lépés egymás mellett: az oszlop az adott lépés után, alatta a lépés kimondva. */
const SubPanels: React.FC<{ a: number; b: number; title: string; className?: string }> = ({ a, b, title, className }) => {
  const st = stepsSub(a, b);
  const cell = 26;
  const size = columnSubSize({ minuend: a, subtrahend: b, cell });
  const pw = 134;
  const capY = 34 + size.h + 16;
  return (
    <Frame w={pw * 3 + 14} h={capY + 62} className={className}>
      <text x={(pw * 3 + 14) / 2} y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{title}</text>
      {[1, 2, 3].map((k, i) => {
        const s = st[i];
        const x0 = 7 + i * pw;
        const cx = x0 + pw / 2;
        const lines: { t: string; g?: boolean }[] = [];
        if (s.carryIn) lines.push({ t: `${s.need} meg 1 az ${s.from}.`, g: true });
        lines.push({ t: `${s.from}-${suffixHoz(s.from)} ${s.write}, az ${s.target}.` });
        lines.push({ t: `Leírom ${artD(s.write)} ${s.write}-${['t', 'et', 't', 'at', 'et', 'öt', 'ot', 'et', 'at', 'et'][s.write]}${s.carryOut ? ',' : '.'}` });
        if (s.carryOut) lines.push({ t: 'maradt 1.', g: true });
        return (
          <g key={k}>
            <WrittenSubG3ColumnG x={x0 + (pw - size.w) / 2} y={34} minuend={a} subtrahend={b} result={partialDiff(a - b, k, 3)} highlight={k - 1} carries={carryMarksSub(st, k)} cell={cell} />
            <text x={cx} y={capY - 2} textAnchor="middle" fontSize="11" fill="#64748b">{k}. lépés</text>
            {lines.map((l, j) => (
              <text key={j} x={cx} y={capY + 13 + j * 14.5} textAnchor="middle" fontSize="12" fontWeight="bold" fill={l.g ? GREEN : '#0f172a'}>{l.t}</text>
            ))}
          </g>
        );
      })}
    </Frame>
  );
};

/** 832 − 467: ismétlés pótlással, kétszer maradt 1. */
export const RecapSubSvg: Fig = ({ className }) => <SubPanels a={832} b={467} title="Ismétlés: pótolunk, és kétszer marad 1" className={className} />;

/** 704 − 258: 0 a tízesek helyén – 10-ig pótolunk. */
export const ZeroTensSubSvg: Fig = ({ className }) => <SubPanels a={704} b={258} title="0 a tízeseknél: 10-ig pótolunk" className={className} />;

/** 600 − 274: kerek százasból vonunk ki. */
export const RoundHundredSubSvg: Fig = ({ className }) => <SubPanels a={600} b={274} title="Kerek százasból: két 0 a kisebbítendőben" className={className} />;

/** 1000 − 347: négy oszlop, háromszor marad 1, az ezreseknél nem írunk semmit. */
export const ThousandSubSvg: Fig = ({ className }) => {
  const a = 1000;
  const b = 347;
  const st = stepsSub(a, b);
  const cell = 30;
  const rows = [
    { h: 'Egyesek', t: '7-hez 3, az 10.', u: 'Leírom a 3-at, maradt 1.' },
    { h: 'Tízesek', t: '4 meg 1 az 5. 5-höz 5, az 10.', u: 'Leírom az 5-öt, maradt 1.' },
    { h: 'Százasok', t: '3 meg 1 az 4. 4-hez 6, az 10.', u: 'Leírom a 6-ot, maradt 1.' },
    { h: 'Ezresek', t: 'A maradék 1. 1-hez 0, az 1.', u: 'Az elejére 0-t nem írunk.' }
  ];
  return (
    <Frame w={400} h={226} className={className}>
      <WrittenSubG3ColumnG x={14} y={36} minuend={a} subtrahend={b} result={653} cols={4} carries={carryMarksSub(st, 4)} cell={cell} />
      {rows.map((r, i) => (
        <g key={i}>
          <text x="176" y={26 + i * 52} fontSize="12" fontWeight="bold" fill={i === 3 ? '#7c3aed' : '#64748b'}>{r.h}:</text>
          <text x="176" y={42 + i * 52} fontSize="13" fontWeight="bold" fill={i === 3 ? '#7c3aed' : '#0f172a'}>{r.t}</text>
          <text x="176" y={58 + i * 52} fontSize="13" fontWeight="bold" fill={i === 3 ? '#7c3aed' : r.u.includes('maradt') ? GREEN : '#0f172a'}>{r.u}</text>
        </g>
      ))}
    </Frame>
  );
};

/** Ellenőrzés összeadással: 1000 − 347 = 653, mert 653 + 347 = 1000. */
export const CheckAddSubSvg: Fig = ({ className }) => (
  <Frame w={400} h={190} className={className}>
    <text x="100" y="24" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#1d4ed8">Kivonás</text>
    <WrittenSubG3ColumnG x={34} y={36} minuend={1000} subtrahend={347} result={653} cols={4} cell={28} />
    <text x="200" y="110" textAnchor="middle" fontSize="26" fontWeight="bold" fill={GREEN}>→</text>
    <text x="300" y="24" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={GREEN}>Ellenőrzés</text>
    <WrittenSubG3ColumnG x={234} y={36} op="+" minuend={653} subtrahend={347} result={1000} cols={4} cell={28} />
    <text x="200" y="182" textAnchor="middle" fontSize="12" fill="#475569">különbség + kivonandó = kisebbítendő</text>
  </Frame>
);

/** Szöveges feladat: 1000 darabos kirakó, 386 darab már a helyén. */
export const PuzzleBarSvg: Fig = ({ className }) => (
  <Frame w={400} h={120} className={className}>
    <text x="200" y="24" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#334155">1000 darabos kirakó: hány darab van még hátra?</text>
    <ThousandBar x={30} y={40} w={340} done={386} label="kész: 386" h={30} />
    <text x="200" y="110" textAnchor="middle" fontSize="12" fill="#475569">1000 − 386 = ?</text>
  </Frame>
);
