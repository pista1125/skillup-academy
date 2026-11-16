import React from 'react';
import { SeqFrame, SText, fmtFt, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: a hiteltartozás körforgása – kamatozás, majd törlesztés
export const LoanCycleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <SeqFrame title="Minden időszak végén: előbb kamatozás, aztán törlesztés" className={className} h={240}>
    <rect x={40} y={90} width={120} height={56} rx={12} fill="#e0e7ff" stroke={S_BLUE} strokeWidth="1.6" />
    <SText x={100} y={114} t="tartozás" s={13} c={S_BLUE} b />
    <SText x={100} y={133} t="Tₖ" s={13} c={S_BLUE} b />
    <rect x={180} y={90} width={120} height={56} rx={12} fill="#fee2e2" stroke={S_RED} strokeWidth="1.6" />
    <SText x={240} y={114} t="+ kamat" s={13} c={S_RED} b />
    <SText x={240} y={133} t="Tₖ · q" s={13} c={S_RED} b />
    <rect x={320} y={90} width={130} height={56} rx={12} fill="#dcfce7" stroke={S_GREEN} strokeWidth="1.6" />
    <SText x={385} y={114} t="− törlesztőrészlet" s={12} c={S_GREEN} b />
    <SText x={385} y={133} t="Tₖ₊₁ = Tₖ · q − x" s={12} c={S_GREEN} b />
    <path d="M 160 118 L 178 118" stroke={S_INK} strokeWidth="2" markerEnd="url(#arrL)" />
    <path d="M 300 118 L 318 118" stroke={S_INK} strokeWidth="2" markerEnd="url(#arrL)" />
    <path d="M 385 150 C 385 200, 100 200, 100 150" fill="none" stroke={S_PURPLE} strokeWidth="1.8" strokeDasharray="5 4" markerEnd="url(#arrL)" />
    <defs>
      <marker id="arrL" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 z" fill={S_INK} />
      </marker>
    </defs>
    <SText x={240} y={216} t="következő időszak" s={11} c={S_PURPLE} />
    <SText x={240} y={60} t="A már kifizetett rész után a bank nem számol fel kamatot." s={11.5} c="#334155" />
  </SeqFrame>
);

// 2. ábra: Tamás hitele – táblázat
export const AnnuityTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    ['1 év', '2 000 000 · 1,1 = 2 200 000', 'x', '2 200 000 − x'],
    ['2 év', '(2 200 000 − x) · 1,1', 'x', '2 420 000 − 1,1x − x'],
    ['3 év', '2 662 000 − 1,21x − 1,1x', 'x', '2 662 000 − 1,21x − 1,1x − x']
  ];
  const cols = [20, 70, 245, 285];
  return (
    <SeqFrame title="Tamás: 2 000 000 Ft, 3 év, évi 10%, 3 egyenlő részlet" className={className} h={250}>
      <rect x={14} y={42} width={452} height={26} fill="#e0e7ff" />
      {['Eltelt idő', 'Tartozás (kamattal)', 'Befizetés', 'Befizetés után'].map((h, i) => (
        <SText key={h} x={cols[i] + 4} y={60} t={h} s={10.5} a="start" b />
      ))}
      {rows.map((r, j) => (
        <g key={j}>
          <line x1={14} y1={68 + j * 32} x2={466} y2={68 + j * 32} stroke="#cbd5e1" />
          {r.map((c, i) => (
            <SText key={i} x={cols[i] + 4} y={88 + j * 32} t={c} s={10} a="start" c={i === 2 ? S_GREEN : S_INK} b={i === 2} />
          ))}
        </g>
      ))}
      <line x1={14} y1={164} x2={466} y2={164} stroke="#cbd5e1" />
      <SText x={240} y={190} t="A 3. év végén a tartozás 0: 2 662 000 = 1,21x + 1,1x + x = 3,31x" s={11.5} c={S_INK} b />
      <SText x={240} y={212} t="x ≈ 804 230 Ft (összesen 2 412 690 Ft < 2 662 000 Ft)" s={12} c={S_RED} b />
    </SeqFrame>
  );
};

// 3. ábra: Tamás tartozásának fűrészfog-grafikonja
export const DebtStepsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x = 2662000 / 3.31;
  const pts: [number, number][] = [];
  let T = 2000000;
  pts.push([0, T]);
  for (let k = 1; k <= 3; k++) {
    T *= 1.1;
    pts.push([k, T]);
    T -= x;
    pts.push([k, Math.max(0, T)]);
  }
  const X = (t: number) => 70 + t * 120;
  const Y = (v: number) => 250 - v / 12000;
  return (
    <SeqFrame title="Tamás tartozása: kamat felfelé, törlesztés lefelé" className={className}>
      <line x1={70} y1={250} x2={450} y2={250} stroke="#64748b" />
      <line x1={70} y1={250} x2={70} y2={50} stroke="#64748b" />
      {[0, 1, 2, 3].map((k) => (
        <SText key={k} x={X(k)} y={266} t={`${k}. év`} s={10} c="#475569" />
      ))}
      {[0.5, 1, 1.5, 2].map((m) => (
        <g key={m}>
          <line x1={66} y1={Y(m * 1e6)} x2={450} y2={Y(m * 1e6)} stroke="#e2e8f0" />
          <SText x={62} y={Y(m * 1e6) + 4} t={String(m).replace('.', ',')} s={9.5} a="end" />
        </g>
      ))}
      <SText x={72} y={44} t="millió Ft" s={9.5} a="start" />
      {pts.slice(0, -1).map((p, i) => {
        const q = pts[i + 1];
        const isPay = p[0] === q[0];
        return (
          <line
            key={i}
            x1={X(p[0])}
            y1={Y(p[1])}
            x2={X(q[0])}
            y2={Y(q[1])}
            stroke={isPay ? S_GREEN : S_RED}
            strokeWidth="2.6"
            strokeDasharray={isPay ? '5 3' : undefined}
          />
        );
      })}
      <SText x={X(1) + 6} y={Y(2200000) - 6} t="2 200 000" s={10} c={S_RED} a="start" />
      <SText x={X(2) + 6} y={Y(1535347) - 6} t="≈ 1 535 347" s={10} c={S_RED} a="start" />
      <SText x={X(3) - 6} y={Y(804230) - 6} t="≈ 804 230" s={10} c={S_RED} a="end" />
      <SText x={330} y={80} t="piros: 10% kamat hozzáadódik" s={10.5} c={S_RED} a="start" b />
      <SText x={330} y={96} t="zöld: −804 230 Ft részlet" s={10.5} c={S_GREEN} a="start" b />
    </SeqFrame>
  );
};

// 4. ábra: Antal hitele – a részletek kamat- és tőkerésze
export const AmortizationBarsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows: { k: number; t: number }[] = [];
  let T = 200000;
  for (let i = 0; i < 4; i++) {
    const k = T * 0.1;
    const t = 63095 - k;
    rows.push({ k, t });
    T -= t;
  }
  const s = 190 / 63095;
  return (
    <SeqFrame title="Antal: 200 000 Ft, 10%, 4 × 63 095 Ft" className={className}>
      {rows.map((r, i) => {
        const x = 70 + i * 80;
        const hk = r.k * s;
        const ht = r.t * s;
        return (
          <g key={i}>
            <rect x={x} y={250 - ht} width={50} height={ht} fill={S_BLUE} opacity={0.85} />
            <rect x={x} y={250 - ht - hk} width={50} height={hk} fill={S_AMBER} opacity={0.9} />
            <SText x={x + 25} y={266} t={`${i + 1}. év`} s={10} c="#475569" />
            <SText x={x + 25} y={250 - ht - hk - 4} t={`kamat ${fmtFt(r.k)}`} s={8.5} c={S_AMBER} />
          </g>
        );
      })}
      <SText x={400} y={90} t="sárga: kamat" s={11} c={S_AMBER} b />
      <SText x={400} y={108} t="kék: tőketörlesztés" s={11} c={S_BLUE} b />
      <SText x={400} y={140} t="a kamatrész" s={10.5} c={S_INK} />
      <SText x={400} y={156} t="évről évre csökken," s={10.5} c={S_INK} />
      <SText x={400} y={172} t="a tőkerész nő" s={10.5} c={S_INK} />
    </SeqFrame>
  );
};

// 5. ábra: árfolyamkockázat – devizahitel forintban mért tartozása
export const CurrencyRiskSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rates = [380, 372, 390, 405, 398, 418, 430];
  const X = (i: number) => 70 + i * 60;
  const Y = (r: number) => 250 - (r - 340) * 2;
  return (
    <SeqFrame title="Devizahitel (példaadatok): 10 000 € tartozás forintban, változó árfolyamon" className={className}>
      <line x1={70} y1={250} x2={450} y2={250} stroke="#64748b" />
      <line x1={70} y1={250} x2={70} y2={50} stroke="#64748b" />
      <polyline points={rates.map((r, i) => `${X(i)},${Y(r)}`).join(' ')} fill="none" stroke={S_PURPLE} strokeWidth="2.4" />
      {rates.map((r, i) => (
        <g key={i}>
          <circle cx={X(i)} cy={Y(r)} r={4} fill={S_PURPLE} />
          <SText x={X(i)} y={Y(r) - 9} t={`${r}`} s={9.5} c={S_PURPLE} />
          <SText x={X(i)} y={266} t={`${i}. év`} s={9.5} c="#475569" />
        </g>
      ))}
      <SText x={74} y={44} t="Ft/€" s={9.5} a="start" />
      <SText x={250} y={286} t="380 Ft/€: 3 800 000 Ft · 430 Ft/€: 4 300 000 Ft (+13,2%)" s={11} c={S_RED} b />
    </SeqFrame>
  );
};
