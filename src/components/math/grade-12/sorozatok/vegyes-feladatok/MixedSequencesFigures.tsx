import React from 'react';
import { SeqFrame, SText, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: számtani és mértani sorozat pontgrafikonja egy koordináta-rendszerben
export const ArithVsGeoSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (n: number) => 60 + n * 46;
  const Y = (v: number) => 250 - v * 3.2;
  const ar = Array.from({ length: 8 }, (_, i) => 5 + 4 * i);
  const ge = Array.from({ length: 8 }, (_, i) => 1 * 1.75 ** i);
  return (
    <SeqFrame title="Számtani (lineáris) és mértani (exponenciális) növekedés" className={className}>
      <line x1={60} y1={250} x2={440} y2={250} stroke="#64748b" />
      <line x1={60} y1={250} x2={60} y2={42} stroke="#64748b" />
      {ar.map((v, i) => (
        <circle key={`a${i}`} cx={X(i + 1) - 40} cy={Y(v)} r={4.5} fill={S_BLUE} />
      ))}
      {ge.map((v, i) => (Y(v) > 40 ? <circle key={`g${i}`} cx={X(i + 1) - 40} cy={Y(v)} r={4.5} fill={S_RED} /> : null))}
      {ar.map((_, i) => (
        <SText key={`l${i}`} x={X(i + 1) - 40} y={265} t={String(i + 1)} s={10} c="#475569" />
      ))}
      <SText x={250} y={284} t="n" s={11} c="#475569" />
      <SText x={150} y={60} t="kék: aₙ = 5 + 4(n − 1)  – állandó különbség (d = 4)" s={11} c={S_BLUE} a="start" b />
      <SText x={150} y={78} t="piros: bₙ = 1,75ⁿ⁻¹  – állandó hányados (q = 1,75)" s={11} c={S_RED} a="start" b />
      <SText x={150} y={100} t="a mértani sorozat előbb-utóbb „lehagyja” a számtanit" s={10.5} c="#475569" a="start" />
    </SeqFrame>
  );
};

// 2. ábra: 1 + 1/2 + 1/4 + 1/8 + 1/16 a számegyenesen (egység = 4 cm)
export const HalvingNumberLineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const U = 200;
  const X = (v: number) => 40 + v * U;
  const parts = [1, 0.5, 0.25, 0.125, 0.0625];
  const cols = [S_BLUE, S_GREEN, S_AMBER, S_PURPLE, S_RED];
  let acc = 0;
  return (
    <SeqFrame title="1 + 1/2 + 1/4 + 1/8 + 1/16 a számegyenesen" className={className} h={220}>
      <line x1={X(0)} y1={130} x2={X(2) + 20} y2={130} stroke={S_INK} strokeWidth="1.5" />
      {[0, 1, 2].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={122} x2={X(v)} y2={138} stroke={S_INK} strokeWidth="1.5" />
          <SText x={X(v)} y={156} t={String(v)} s={12} b />
        </g>
      ))}
      {parts.map((p, i) => {
        const x0 = X(acc);
        acc += p;
        const x1 = X(acc);
        return (
          <g key={i}>
            <rect x={x0} y={100 - i * 4} width={x1 - x0} height={18} fill={cols[i]} opacity={0.8} rx={3} />
            {i < 3 && <SText x={(x0 + x1) / 2} y={113 - i * 4} t={['1', '1/2', '1/4'][i]} s={11} c="#fff" b />}
          </g>
        );
      })}
      <SText x={X(1.9375)} y={84} t="S₅ = 31/16 = 1,9375" s={11} c={S_RED} b a="end" />
      <SText x={240} y={186} t="Minden lépés a 2-ig hátralévő távolság felét teszi meg: Sₙ = 2 − (1/2)ⁿ⁻¹ < 2" s={11} c="#334155" />
    </SeqFrame>
  );
};

/** Egyenlő oldalú háromszög csúcsai (középpont, oldal, elforgatás fokban). */
const tri = (cx: number, cy: number, a: number, rot = 0): [number, number][] => {
  const R = a / Math.sqrt(3);
  return [0, 1, 2].map((k) => {
    const t = ((rot - 90 + k * 120) * Math.PI) / 180;
    return [cx + R * Math.cos(t), cy + R * Math.sin(t)];
  });
};

// 3. ábra: Csilla tortája – egymásba írt szabályos háromszögek (az oldalak harmadolópontjaival)
export const TriangleCakeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const levels: [number, number][][] = [];
  let P = tri(170, 172, 230);
  for (let i = 0; i < 4; i++) {
    levels.push(P);
    P = P.map((p, k) => {
      const q = P[(k + 1) % 3];
      return [p[0] + (q[0] - p[0]) / 3, p[1] + (q[1] - p[1]) / 3] as [number, number];
    });
  }
  const fills = ['#fde68a', '#fbcfe8', '#bfdbfe', '#bbf7d0'];
  return (
    <SeqFrame title="Csilla tortája: oldalak harmadolása, újra és újra" className={className}>
      {levels.map((L, i) => (
        <polygon key={i} points={L.map((p) => p.join(',')).join(' ')} fill={fills[i]} stroke={S_INK} strokeWidth="1.6" />
      ))}
      {levels[0].map((p, k) => {
        const q = levels[0][(k + 1) % 3];
        const d = [p[0] + (q[0] - p[0]) / 3, p[1] + (q[1] - p[1]) / 3];
        return <circle key={k} cx={d[0]} cy={d[1]} r={3.2} fill={S_RED} />;
      })}
      <SText x={70} y={262} t="30 cm" s={11} c={S_BLUE} b />
      <SText x={360} y={80} t="oldalak: 30; 10√3; 10; 10/√3 cm" s={11} c={S_INK} />
      <SText x={360} y={100} t="arány: q = 1/√3 (koszinusztétel)" s={11} c={S_BLUE} />
      <SText x={360} y={130} t="cukordíszítés (kerületek):" s={11} c={S_INK} />
      <SText x={360} y={148} t="3 · (30 + 17,32 + 10 + 5,77) ≈ 189,3 cm" s={11} c={S_RED} b />
      <SText x={360} y={178} t="területek: q² = 1/3" s={11} c={S_INK} />
      <SText x={360} y={196} t="389,7 + 129,9 + 43,3 + 14,4 ≈ 577,4 cm²" s={11} c={S_RED} b />
    </SeqFrame>
  );
};

// 4. ábra: Angéla járólapjai (érettségi 2009)
export const PavingRowsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [8, 10, 12, 14];
  const s = 13;
  return (
    <SeqFrame title="Járólapok: 8, 10, 12, … – a szélső lapok bordók" className={className} h={260}>
      {rows.map((cnt, r) => {
        const y = 60 + r * (s + 4);
        const x0 = 150 - (cnt * s) / 2;
        return Array.from({ length: cnt }, (_, i) => {
          const bordo = r === 0 || i === 0 || i === cnt - 1;
          return <rect key={`${r}-${i}`} x={x0 + i * s} y={y} width={s - 1.5} height={s} fill={bordo ? '#9f1239' : '#94a3b8'} rx={1.5} />;
        });
      })}
      <SText x={150} y={146} t="⋮" s={18} c="#475569" />
      {Array.from({ length: 18 }, (_, i) => (
        <rect key={`last${i}`} x={150 - 9 * s + i * s} y={160} width={s - 1.5} height={s} fill="#9f1239" rx={1.5} />
      ))}
      <SText x={150} y={192} t="… 26. sor: 58 lap, mind bordó (rövidítve rajzolva)" s={10.5} c="#9f1239" />
      <SText x={370} y={70} t="Sₙ = (2 · 8 + (n − 1) · 2) · n / 2" s={11} c={S_INK} />
      <SText x={370} y={88} t="Sₙ = n(n + 7) = 858" s={12} c={S_RED} b />
      <SText x={370} y={106} t="⇒ n = 26 sor" s={12} c={S_RED} b />
      <SText x={370} y={136} t="bordó: 8 + 58 + 2 · 24 = 114" s={11} c="#9f1239" />
      <SText x={370} y={154} t="szürke: 858 − 114 = 744" s={11} c="#475569" />
      <SText x={370} y={184} t="4 csomag: 144 bordó, 756 szürke" s={11} c={S_INK} />
      <SText x={370} y={202} t="maradt: 30 bordó, 12 szürke" s={11.5} c={S_BLUE} b />
    </SeqFrame>
  );
};

// 5. ábra: számtani és mértani közép
export const MeansSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const box = (x: number, y: number, t: string, c: string) => (
    <g>
      <rect x={x - 36} y={y - 18} width={72} height={30} rx={8} fill="#fff" stroke={c} strokeWidth="1.6" />
      <SText x={x} y={y + 2} t={t} s={12.5} c={c} b />
    </g>
  );
  return (
    <SeqFrame title="Honnan kapták a nevüket?" className={className} h={250}>
      <SText x={240} y={56} t="Számtani sorozat: a középső tag a szomszédok számtani közepe" s={12} c={S_BLUE} b />
      {box(130, 92, 'aₙ − d', S_BLUE)}
      {box(240, 92, 'aₙ', S_BLUE)}
      {box(350, 92, 'aₙ + d', S_BLUE)}
      <SText x={240} y={130} t="aₙ = (aₙ₋₁ + aₙ₊₁) / 2" s={13} c={S_INK} b />
      <SText x={240} y={160} t="Mértani sorozat: a középső tag négyzete a szomszédok szorzata" s={12} c={S_RED} b />
      {box(130, 196, 'aₙ / q', S_RED)}
      {box(240, 196, 'aₙ', S_RED)}
      {box(350, 196, 'aₙ · q', S_RED)}
      <SText x={240} y={234} t="aₙ² = aₙ₋₁ · aₙ₊₁ (pozitív tagoknál aₙ = √(aₙ₋₁ · aₙ₊₁))" s={12} c={S_INK} b />
    </SeqFrame>
  );
};

// 6. ábra: tökpiramis – négyzetszámok összege
export const PumpkinPyramidSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const levels = [1, 2, 3, 4];
  return (
    <SeqFrame title="Tökpiramis: az n-edik szinten n² tök" className={className} h={260}>
      {levels.map((k, r) => {
        const s = 22;
        const y = 50 + r * 48;
        return Array.from({ length: k * k }, (_, i) => {
          const row = Math.floor(i / k);
          const col = i % k;
          const x = 60 + 70 * r - (k * s) / 2 + col * s + 40;
          return <circle key={`${r}-${i}`} cx={x} cy={y + row * 9 + 6} r={8} fill={S_AMBER} stroke="#92400e" strokeWidth="1" opacity={0.92} />;
        });
      })}
      {levels.map((k, r) => (
        <SText key={`t${r}`} x={100 + 70 * r} y={240} t={`${k}² = ${k * k}`} s={11} c={S_INK} b />
      ))}
      <SText x={420} y={80} t="1² + 2² + … + n² =" s={11.5} c={S_INK} />
      <SText x={420} y={100} t="n(n + 1)(2n + 1) / 6" s={12.5} c={S_RED} b />
      <SText x={420} y={130} t="n = 4: 30" s={11} c={S_BLUE} />
      <SText x={420} y={148} t="n = 7: 140" s={11} c={S_BLUE} />
      <SText x={420} y={166} t="n = 9: 285" s={11} c={S_BLUE} />
      <SText x={420} y={184} t="n = 25: 5525" s={11} c={S_BLUE} />
    </SeqFrame>
  );
};
