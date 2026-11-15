import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TrigPracticeExamMatcher } from './TrigPracticeExamMatcher';
import { TrigPracticeExamSorter } from './TrigPracticeExamSorter';

// ---- Kvízábrák (csak ebben a fájlban használt segédek) ----
type P = [number, number];
const D2R = Math.PI / 180;
const pol = (r: number, deg: number, o: P = [0, 0]): P => [o[0] + r * Math.cos(deg * D2R), o[1] + r * Math.sin(deg * D2R)];
const INK = '#334155';
const RED = '#dc2626';
const BLUE = '#2563eb';
const col = (t: string) => (t.includes('?') ? RED : '#0f172a');
const nrm = (a: P, b: P): P => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  return [dx / l, dy / l];
};

const Fig: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 240 150" className="w-full max-w-[280px] h-auto mx-auto" fill="none" stroke={INK} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round">
    {children}
  </svg>
);

const Lb: React.FC<{ x: number; y: number; t: string; s?: number; a?: 'start' | 'middle' | 'end'; c?: string }> = ({ x, y, t, s = 11, a = 'middle', c }) => (
  <text x={x} y={y} fill={c ?? col(t)} stroke="none" fontSize={s} textAnchor={a} fontFamily="sans-serif" fontWeight={t.includes('?') ? 700 : 500}>
    {t}
  </text>
);

/** Szögív (vagy derékszögnél negyedkörív ponttal) a v csúcsnál, a v→p és v→q félegyenesek között. */
const angleArc = (v: P, p: P, q: P, r: number, right: boolean, key: string, label?: string, d?: number, lt = 0.5) => {
  const u1 = nrm(v, p);
  const u2 = nrm(v, q);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const bis = nrm([0, 0], [u1[0] + u2[0], u1[1] + u2[1]]);
  const ang = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1])));
  const ld = nrm([0, 0], [u1[0] * (1 - lt) + u2[0] * lt, u1[1] * (1 - lt) + u2[1] * lt]);
  const dd = d ?? Math.min(52, Math.max(r + 12, 10 / Math.sin(ang / 2)));
  return (
    <g key={key}>
      <path
        d={`M ${v[0] + r * u1[0]} ${v[1] + r * u1[1]} A ${r} ${r} 0 0 ${sweep} ${v[0] + r * u2[0]} ${v[1] + r * u2[1]}`}
        stroke={right ? INK : BLUE}
        strokeWidth={1.4}
      />
      {right && <circle cx={v[0] + 0.55 * r * bis[0]} cy={v[1] + 0.55 * r * bis[1]} r={1.8} fill={INK} stroke="none" />}
      {label && <Lb x={v[0] + dd * ld[0]} y={v[1] + dd * ld[1] + 4} t={label} s={10} />}
    </g>
  );
};

interface Seg { i: number; j: number; dash?: boolean; label?: string; off?: number; red?: boolean; at?: number }
interface Ang { v: number; p: number; q: number; label?: string; r?: number; d?: number; lt?: number }

/**
 * Általános sokszög-ábra: a pontokat (matematikai koordináták, y felfelé) arányosan a vászonra illeszti.
 * poly: a kontúr pontjainak indexei; segs: további szakaszok (feliratozva is); angs / rights: szögívek.
 */
const PolyFig: React.FC<{
  pts: P[];
  poly?: number[];
  names?: (string | undefined)[];
  nameDir?: Record<number, P>;
  edges?: (string | undefined)[];
  segs?: Seg[];
  angs?: Ang[];
  rights?: Ang[];
  circle?: { c: number; r: number };
  fill?: string;
  box?: [number, number, number, number];
  extra?: (m: (p: P) => P) => React.ReactNode;
}> = ({ pts, poly, names, nameDir = {}, edges, segs = [], angs = [], rights = [], circle, fill, box = [34, 206, 20, 128], extra }) => {
  const ext: P[] = [...pts];
  if (circle) {
    const c = pts[circle.c];
    ext.push([c[0] - circle.r, c[1] - circle.r], [c[0] + circle.r, c[1] + circle.r]);
  }
  const xs = ext.map((p) => p[0]);
  const ys = ext.map((p) => p[1]);
  const [x0, x1, y0, y1] = box;
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const k = Math.min((x1 - x0) / (maxX - minX || 1), (y1 - y0) / (maxY - minY || 1));
  const ox = (x0 + x1) / 2 - ((minX + maxX) / 2) * k;
  const oy = (y0 + y1) / 2 + ((minY + maxY) / 2) * k;
  const m = (p: P): P => [ox + p[0] * k, oy - p[1] * k];
  const S = pts.map(m);
  const ring = poly ?? pts.map((_, i) => i);
  const cen: P = [ring.reduce((s, i) => s + S[i][0], 0) / ring.length, ring.reduce((s, i) => s + S[i][1], 0) / ring.length];
  const allCen: P = [S.reduce((s, p) => s + p[0], 0) / S.length, S.reduce((s, p) => s + p[1], 0) / S.length];
  const segLabel = (a: P, b: P, t: string, off: number | undefined, key: string, at = 0.5) => {
    const mid: P = [a[0] + (b[0] - a[0]) * at, a[1] + (b[1] - a[1]) * at];
    const u = nrm(a, b);
    let n: P = [-u[1], u[0]];
    if (off === undefined) {
      if ((mid[0] - cen[0]) * n[0] + (mid[1] - cen[1]) * n[1] < 0) n = [-n[0], -n[1]];
    }
    // a felirat szélességét is figyelembe vesszük, hogy ne lógjon rá a szakaszra
    const need = 7 + Math.abs(n[0]) * (t.length * 2.9) + Math.abs(n[1]) * 5;
    const o = off === undefined ? need : Math.sign(off) * Math.max(Math.abs(off), need);
    return <Lb key={key} x={mid[0] + o * n[0]} y={mid[1] + o * n[1] + 4} t={t} s={10} />;
  };
  return (
    <Fig>
      {circle && <circle cx={S[circle.c][0]} cy={S[circle.c][1]} r={circle.r * k} strokeWidth={1.4} />}
      <polygon points={ring.map((i) => S[i].join(',')).join(' ')} fill={fill ?? '#e0f2fe'} fillOpacity={0.5} />
      {segs.map((s, idx) => (
        <line key={`s${idx}`} x1={S[s.i][0]} y1={S[s.i][1]} x2={S[s.j][0]} y2={S[s.j][1]} strokeDasharray={s.dash ? '5 4' : undefined} stroke={s.red ? RED : INK} strokeWidth={s.dash ? 1.4 : 1.8} />
      ))}
      {extra && extra(m)}
      {rights.map((a, idx) => angleArc(S[a.v], S[a.p], S[a.q], a.r ?? 12, true, `r${idx}`))}
      {angs.map((a, idx) => angleArc(S[a.v], S[a.p], S[a.q], a.r ?? 15, false, `a${idx}`, a.label, a.d, a.lt))}
      {edges && edges.map((t, idx) => (t ? segLabel(S[ring[idx]], S[ring[(idx + 1) % ring.length]], t, undefined, `e${idx}`) : null))}
      {segs.map((s, idx) => (s.label ? segLabel(S[s.i], S[s.j], s.label, s.off, `sl${idx}`, s.at) : null))}
      {names &&
        names.map((t, idx) => {
          if (!t) return null;
          const u = nameDir[idx] ? nrm([0, 0], nameDir[idx]) : nrm(allCen, S[idx]);
          return <Lb key={`n${idx}`} x={S[idx][0] + 11 * u[0]} y={S[idx][1] + 11 * u[1] + 4} t={t} s={11} c="#0f172a" />;
        })}
    </Fig>
  );
};

/** Nyíl (erővektor) képernyő-koordinátákban. */
const Arrow: React.FC<{ a: P; b: P; c?: string; dash?: boolean }> = ({ a, b, c = INK, dash }) => {
  const u = nrm(a, b);
  const n: P = [-u[1], u[0]];
  const h: P = [b[0] - 9 * u[0], b[1] - 9 * u[1]];
  return (
    <g>
      <line x1={a[0]} y1={a[1]} x2={h[0]} y2={h[1]} stroke={c} strokeDasharray={dash ? '5 4' : undefined} />
      <polygon points={`${b[0]},${b[1]} ${h[0] + 4 * n[0]},${h[1] + 4 * n[1]} ${h[0] - 4 * n[0]},${h[1] - 4 * n[1]}`} fill={c} stroke="none" />
    </g>
  );
};

/** Derékszögű háromszög: C derékszög (bal lent), A jobbra lent (α), B fent. */
const RightTri: React.FC<{ opp?: string; adj?: string; hyp?: string; ang?: string }> = ({ opp, adj, hyp, ang }) => (
  <PolyFig
    pts={[[0, 0], [16, 0], [0, 9.5]]}
    names={['C', 'A', 'B']}
    edges={[adj, hyp, opp]}
    rights={[{ v: 0, p: 1, q: 2 }]}
    angs={ang ? [{ v: 1, p: 2, q: 0, label: ang, r: 22, d: 40 }] : []}
  />
);

/** Egységkör egy P ponttal a deg fokos szögnél. */
const UnitCircle: React.FC<{ deg: number; pLabel: string; vLabel?: string; hLabel?: string; angLabel?: string }> = ({ deg, pLabel, vLabel, hLabel, angLabel = 'α' }) => {
  const O: P = [120, 82];
  const R = 56;
  const p: P = [O[0] + R * Math.cos(deg * D2R), O[1] - R * Math.sin(deg * D2R)];
  return (
    <Fig>
      <line x1={40} y1={O[1]} x2={200} y2={O[1]} strokeWidth={1.2} />
      <line x1={O[0]} y1={146} x2={O[0]} y2={14} strokeWidth={1.2} />
      <circle cx={O[0]} cy={O[1]} r={R} strokeWidth={1.4} />
      <line x1={O[0]} y1={O[1]} x2={p[0]} y2={p[1]} stroke={BLUE} />
      <line x1={p[0]} y1={p[1]} x2={p[0]} y2={O[1]} strokeDasharray="4 3" strokeWidth={1.3} />
      {angleArc(O, [O[0] + 30, O[1]], p, 14, false, 'ua', angLabel, deg > 100 ? 24 : 26)}
      <circle cx={p[0]} cy={p[1]} r={3} fill={RED} stroke="none" />
      <Lb x={p[0] + (p[0] < O[0] ? -6 : 6)} y={p[1] - 6} t={pLabel} a={p[0] < O[0] ? 'end' : 'start'} />
      {vLabel && <Lb x={p[0] + (p[0] < O[0] ? -5 : 5)} y={(p[1] + O[1]) / 2 + 4} t={vLabel} a={p[0] < O[0] ? 'end' : 'start'} s={10} />}
      {hLabel && <Lb x={(p[0] + O[0]) / 2} y={O[1] + 13} t={hLabel} s={10} />}
      <Lb x={O[0] + R + 4} y={O[1] + 13} t="1" s={10} />
      <Lb x={204} y={O[1] + 4} t="x" a="start" s={10} />
      <Lb x={O[0] + 5} y={20} t="y" a="start" s={10} />
    </Fig>
  );
};

/** Paralelogramma A(0,0), B(a,0), D a szög irányában. */
const parPts = (a: number, b: number, deg: number): P[] => {
  const D = pol(b, deg);
  return [[0, 0], [a, 0], [a + D[0], D[1]], D];
};

/** Szabályos n-szög a körülírt körrel; O = utolsó pont. */
const regPts = (n: number, start = 90): P[] => [...Array.from({ length: n }, (_, i) => pol(1, start + (360 * i) / n)), [0, 0]];

/** Körcikk vagy körszelet (középpont lent-középen), a középponti szög felfelé szimmetrikus. */
const SectorFig: React.FC<{ deg: number; rLabel: string; angLabel: string; mode: 'arc' | 'sector' | 'segment' | 'chord'; ask: string; chordLabel?: string }> = ({ deg, rLabel, angLabel, mode, ask, chordLabel }) => {
  const R = deg > 150 ? 62 : 92;
  const O: P = [120, deg > 150 ? 82 : 128];
  const a1 = 90 + deg / 2;
  const a2 = 90 - deg / 2;
  const A: P = [O[0] + R * Math.cos(a1 * D2R), O[1] - R * Math.sin(a1 * D2R)];
  const B: P = [O[0] + R * Math.cos(a2 * D2R), O[1] - R * Math.sin(a2 * D2R)];
  const large = deg > 180 ? 1 : 0;
  const arc = `M ${A[0]} ${A[1]} A ${R} ${R} 0 ${large} 1 ${B[0]} ${B[1]}`;
  return (
    <Fig>
      {mode === 'sector' && <path d={`M ${O[0]} ${O[1]} L ${A[0]} ${A[1]} ${arc.slice(arc.indexOf('A'))} Z`} fill="#fecaca" fillOpacity={0.7} stroke="none" />}
      {mode === 'segment' && <path d={`${arc} Z`} fill="#fecaca" fillOpacity={0.7} stroke="none" />}
      <line x1={O[0]} y1={O[1]} x2={A[0]} y2={A[1]} />
      <line x1={O[0]} y1={O[1]} x2={B[0]} y2={B[1]} />
      <path d={arc} stroke={mode === 'arc' ? RED : INK} strokeWidth={mode === 'arc' ? 2.6 : 1.8} />
      {(mode === 'segment' || mode === 'chord') && <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={mode === 'chord' ? RED : INK} strokeWidth={mode === 'chord' ? 2.4 : 1.8} />}
      {angleArc([O[0], O[1]], A, B, 16, false, 'sa', angLabel, 30)}
      <circle cx={O[0]} cy={O[1]} r={2} fill={INK} stroke="none" />
      <Lb x={O[0]} y={O[1] + 14 > 148 ? O[1] - 4 : O[1] + 14} t="O" />
      <Lb x={(O[0] + B[0]) / 2 + 10} y={(O[1] + B[1]) / 2 + 8} t={rLabel} a="start" s={10} />
      {chordLabel && <Lb x={(A[0] + B[0]) / 2} y={(A[1] + B[1]) / 2 + 13} t={chordLabel} s={10} />}
      {ask && <Lb x={O[0]} y={mode === 'segment' ? O[1] - R + 15 : Math.max(12, O[1] - R - 6)} t={ask} />}
    </Fig>
  );
};

/** Két erő paralelogrammája: F₁ vízszintes, F₂ deg fokos szögben, R az eredő (szaggatott). */
const ForceFig: React.FC<{ l1: number; l2: number; deg: number; lab1: string; lab2: string; labR: string; labAng: string; angLt?: number; rLeft?: boolean /* true: az eredő felirata a vektor alá kerül */ }> = ({ l1, l2, deg, lab1, lab2, labR, labAng, angLt = 0.5, rLeft }) => {
  const v2: P = [l2 * Math.cos(deg * D2R), -l2 * Math.sin(deg * D2R)];
  const xs = [0, l1, v2[0], l1 + v2[0]];
  const ys = [0, v2[1]];
  const O: P = [120 - (Math.min(...xs) + Math.max(...xs)) / 2, 78 - (Math.min(...ys) + Math.max(...ys)) / 2];
  const F1: P = [O[0] + l1, O[1]];
  const F2: P = [O[0] + v2[0], O[1] + v2[1]];
  const R: P = [F1[0] + v2[0], F1[1] + v2[1]];
  return (
    <Fig>
      <line x1={F1[0]} y1={F1[1]} x2={R[0]} y2={R[1]} strokeDasharray="3 4" strokeWidth={1.1} />
      <line x1={F2[0]} y1={F2[1]} x2={R[0]} y2={R[1]} strokeDasharray="3 4" strokeWidth={1.1} />
      <Arrow a={O} b={F1} />
      <Arrow a={O} b={F2} />
      <Arrow a={O} b={R} c={RED} dash />
      {angleArc(O, F1, F2, 15, false, 'fa', labAng, 30, angLt)}
      <circle cx={O[0]} cy={O[1]} r={2.4} fill={INK} stroke="none" />
      <Lb x={(O[0] + F1[0]) / 2} y={O[1] + 15} t={lab1} s={10} />
      <Lb x={(O[0] + F2[0]) / 2 - 6} y={(O[1] + F2[1]) / 2} t={lab2} s={10} a="end" />
      <Lb x={(O[0] + R[0]) / 2 + (rLeft ? 6 : 8)} y={(O[1] + R[1]) / 2 + (rLeft ? 16 : -2)} t={labR} s={10} a="start" />
    </Fig>
  );
};

const T_AT = (m: (p: P) => P, p: P, t = 'T = ?') => {
  const q = m(p);
  return <Lb x={q[0]} y={q[1] + 4} t={t} s={10} />;
};

const isoPts: P[] = [[0, 0], [30 * Math.cos(70 * D2R), 0], [15 * Math.cos(70 * D2R), 15 * Math.sin(70 * D2R)], [15 * Math.cos(70 * D2R), 0]];
const towerPts = (h2: number): P[] => [[0, 0], [0, 50], [19.19, 0], [60, 0], [60, h2], [0, -7]];
const erPts: P[] = [[0, 0], [48, 0], pol(41, 133, [24, 0]), [24, 0]];
const tpeC14: P = pol(3.4, 118);
const tpeC14b: P = pol(3.4, 242);
const par83: P[] = [[5, 0], [0, 0], [-2.0521, 5.6382], [4.5421, 7.9869]];
const diagPar: P[] = [[-8, 0], pol(5, 230), [8, 0], pol(5, 50), [0, 0]];

const FIG: Record<string, React.ReactNode> = {
  q8: (
    <PolyFig
      pts={isoPts}
      poly={[0, 1, 2]}
      names={['A', 'B', 'C']}
      edges={[undefined, '15 cm', '15 cm']}
      segs={[{ i: 2, j: 3, dash: true, label: 'm', off: 10, at: 0.55 }]}
      rights={[{ v: 3, p: 1, q: 2 }]}
      angs={[{ v: 0, p: 1, q: 2, label: '70°' }, { v: 1, p: 2, q: 0, label: '70°' }]}
    />
  ),
  q9: (
    <PolyFig
      pts={isoPts}
      poly={[0, 1, 2]}
      names={['A', 'B', 'C']}
      edges={['alap = ?', '15 cm', '15 cm']}
      segs={[{ i: 2, j: 3, dash: true }]}
      rights={[{ v: 3, p: 1, q: 2 }]}
      angs={[{ v: 0, p: 1, q: 2, label: '70°' }, { v: 1, p: 2, q: 0, label: '70°' }]}
    />
  ),
  q11: (
    <Fig>
      <line x1={20} y1={135} x2={222} y2={135} />
      <rect x={155} y={15} width={26} height={120} fill="#e0f2fe" />
      <line x1={100} y1={135} x2={100} y2={118} />
      <circle cx={100} cy={113} r={4} />
      <line x1={100} y1={117} x2={155} y2={117} strokeDasharray="4 3" strokeWidth={1.3} />
      <line x1={100} y1={117} x2={155} y2={15} stroke={BLUE} />
      {angleArc([100, 117], [130, 117], [155, 15], 16, false, 'h', '65°', 30)}
      <Lb x={128} y={129} t="12 m" s={10} />
      <Lb x={94} y={130} t="1,6 m" s={10} a="end" />
      <Lb x={186} y={75} t="h = ?" a="start" />
    </Fig>
  ),
  q12: <SectorFig deg={83.62} rLabel="r = 12 cm" angLabel="" mode="segment" ask="T = ?" chordLabel="16 cm" />,
  q13: (
    <PolyFig
      pts={[[0, 0], [17, 0], pol(10.94, 78)]}
      names={['A', 'B', 'C']}
      edges={['17 cm', '?', undefined]}
      angs={[{ v: 0, p: 1, q: 2, label: '78°' }, { v: 1, p: 2, q: 0, label: '36°' }]}
    />
  ),
  q14: (
    <PolyFig
      pts={[[0, 0], [-7.24, 0], tpeC14, tpeC14b, [-7.24 + 1.3 * (tpeC14[0] + 7.24), 1.3 * tpeC14[1]], [-7.24 + 1.3 * (tpeC14b[0] + 7.24), 1.3 * tpeC14b[1]]]}
      poly={[1, 2, 0, 3]}
      fill="#fef3c7"
      circle={{ c: 0, r: 3.4 }}
      names={['O', 'P', 'E₁', 'E₂']}
      segs={[
        { i: 1, j: 4 },
        { i: 1, j: 5 },
        { i: 1, j: 0, dash: true, label: '?', off: 9 },
        { i: 0, j: 2, label: '3,4 cm', off: 14 }
      ]}
      rights={[{ v: 2, p: 0, q: 1 }, { v: 3, p: 0, q: 1 }]}
      angs={[{ v: 1, p: 2, q: 3, label: '56°', r: 18, d: 36, lt: 0.15 }]}
    />
  ),
  q15: (
    <PolyFig
      pts={[[0, 0], pol(14.36, -60), [22, 0], pol(18.25, 44)]}
      names={['A', 'B', 'C', 'D']}
      edges={['?', undefined, undefined, undefined]}
      segs={[{ i: 0, j: 2, label: '22 cm', off: -8 }]}
      angs={[{ v: 0, p: 2, q: 1, label: '60°' }, { v: 2, p: 0, q: 1, label: '40°' }]}
    />
  ),
  q17: (
    <PolyFig
      pts={erPts}
      poly={[0, 1, 2]}
      names={['A', 'B', 'C', 'D']}
      segs={[{ i: 2, j: 3, label: '41 mm', off: 12 }, { i: 0, j: 3, label: '24 mm', off: 11 }, { i: 3, j: 1, label: '24 mm', off: 11 }]}
      angs={[{ v: 3, p: 0, q: 2, label: '47°' }]}
      extra={(m) => T_AT(m, [6, 3])}
    />
  ),
  q18: (
    <PolyFig
      pts={erPts}
      poly={[0, 1, 2]}
      names={['A', 'B', 'C', 'D']}
      edges={[undefined, '≈ 60 mm', undefined]}
      segs={[{ i: 2, j: 3, label: '41 mm', off: 12 }, { i: 0, j: 3, label: '24 mm', off: 11 }, { i: 3, j: 1, label: '24 mm', off: 11 }]}
      angs={[{ v: 3, p: 0, q: 2, label: '47°' }, { v: 1, p: 2, q: 0, label: 'β = ?', r: 22, d: 46 }]}
    />
  ),
  q19: <ForceFig l1={84} l2={112} deg={120} lab1="F₁ = 1500 N" lab2="F₂ = 2000 N" labR="R = ?" labAng="120°" angLt={0.25} />,
  q20: (
    <Fig>
      <line x1={20} y1={135} x2={67.7} y2={135} strokeDasharray="4 3" strokeWidth={1.3} />
      <line x1={172.3} y1={135} x2={220} y2={135} strokeDasharray="4 3" strokeWidth={1.3} />
      <line x1={20} y1={135} x2={67.7} y2={95} strokeDasharray="4 3" strokeWidth={1.3} />
      <line x1={172.3} y1={95} x2={220} y2={135} strokeDasharray="4 3" strokeWidth={1.3} />
      <polygon points="67.7,135 172.3,135 172.3,95 120,50.9 67.7,95" fill="#e0f2fe" fillOpacity={0.6} />
      {angleArc([20, 135], [60, 135], [67.7, 95], 18, false, 'k', '40°', 36)}
      <Lb x={72} y={119} t="1,6 m" s={10} a="start" />
      <Lb x={120} y={129} t="4,2 m" s={10} />
      <Lb x={120} y={148} t="tetőalap = ?" s={10} />
    </Fig>
  ),
  q22: (
    <PolyFig
      pts={[[0, 0], [4.62, 0], pol(3.08, 110.82)]}
      names={['C', 'B', 'A']}
      edges={['4,62 dm', 'c = ?', '3,08 dm']}
      angs={[{ v: 0, p: 1, q: 2, label: '110,82°', d: 30 }]}
    />
  ),
  q23: (
    <PolyFig
      pts={[[0, 0], [10.01, 0], [5.005, 4.2], [5.005, 0]]}
      poly={[0, 1, 2]}
      edges={['a = ?', undefined, undefined]}
      segs={[{ i: 2, j: 3, dash: true, label: '4,2 m', off: 18 }]}
      rights={[{ v: 3, p: 1, q: 2 }]}
      angs={[{ v: 0, p: 1, q: 2, label: '40°' }]}
    />
  ),
  q25: (
    <PolyFig
      pts={towerPts(34.69)}
      poly={[0, 3]}
      fill="none"
      names={[undefined, undefined, 'K']}
      nameDir={{ 2: [0.3, -1] }}
      segs={[
        { i: 0, j: 1, label: '50', off: -12 },
        { i: 3, j: 4 },
        { i: 2, j: 1, dash: true },
        { i: 2, j: 4, dash: true },
        { i: 0, j: 2, label: '?', off: 11 }
      ]}
      rights={[{ v: 0, p: 2, q: 1 }, { v: 3, p: 4, q: 2 }]}
      angs={[{ v: 2, p: 1, q: 0, label: '69°', r: 14, d: 28 }]}
      extra={(m) => {
        const a = m([0, -7]);
        const b = m([60, -7]);
        return <Lb x={(a[0] + b[0]) / 2} y={a[1] + 6} t="60 könyök a két torony távolsága" s={9} />;
      }}
    />
  ),
  q26: (
    <PolyFig
      pts={towerPts(34.69)}
      poly={[0, 3]}
      fill="none"
      names={[undefined, undefined, 'K']}
      nameDir={{ 2: [0.3, -1] }}
      segs={[
        { i: 0, j: 1, label: '50', off: -12 },
        { i: 3, j: 4, label: 'h = ?', off: 22 },
        { i: 2, j: 1, dash: true },
        { i: 2, j: 4, dash: true },
        { i: 0, j: 2, label: '19,19', off: 11 },
        { i: 2, j: 3, label: '40,81', off: 11 }
      ]}
      rights={[{ v: 0, p: 2, q: 1 }, { v: 3, p: 4, q: 2 }]}
    />
  ),
  q27: (
    <PolyFig
      pts={[[0, 0], [34, 0], pol(38, 56), [pol(38, 56)[0] - 34, pol(38, 56)[1]]]}
      names={['A', 'B', 'C', 'D']}
      edges={['34 mm', '?', undefined, undefined]}
      segs={[{ i: 0, j: 2, label: '38 mm', off: -10 }]}
      angs={[{ v: 0, p: 1, q: 2, label: '56°', r: 18, d: 34 }]}
    />
  ),
  q28: (
    <PolyFig
      pts={[[-3.66, -13.66], [3.66, -13.66], [8.66, -5], [0, 0], [-8.66, -5]]}
      names={['A', 'B', 'C', 'D', 'E']}
      edges={[undefined, '10', '10', '10', '10']}
      angs={[
        { v: 0, p: 4, q: 1, label: '120°', r: 11, d: 22 },
        { v: 1, p: 0, q: 2, label: '120°', r: 11, d: 22 },
        { v: 3, p: 2, q: 4, label: '120°', r: 11, d: 22 }
      ]}
      extra={(m) => T_AT(m, [0, -9])}
    />
  ),
  q30: (
    <PolyFig
      pts={[[0, 0], [22, 0], [19.19, 35.89], [-4.59, 32.68]]}
      fill="#dcfce7"
      edges={['22 m', '36 m', '24 m', '33 m']}
      angs={[{ v: 0, p: 1, q: 3, label: '98°' }]}
    />
  )
};

// LEVEL 1 – további 20 kérdés (31–50): definíciók, nevezetes értékek, derékszögű háromszög
const LEVEL1_EXTRA: QuizQuestion[] = [
  {
    id: 'tpe-q31',
    level: 1,
    questionTypeBadge: 'Nevezetes érték',
    question: 'Mennyi tg 45°?',
    options: ['1', '√2/2', '0', '√3'],
    correctAnswer: 0,
    explanation: 'Az egyenlő szárú derékszögű háromszögben a két befogó egyenlő, így tg 45° = 1.'
  },
  {
    id: 'tpe-q32',
    level: 1,
    questionTypeBadge: 'Nevezetes érték',
    question: 'Mennyi sin 30°?',
    options: ['1/2', '√3/2', '√2/2', '1/3'],
    correctAnswer: 0,
    explanation: 'A szabályos háromszöget a magassága két 30°–60°–90°-os háromszögre bontja; a 30°-kal szemközti befogó az átfogó fele, így sin 30° = 1/2.'
  },
  {
    id: 'tpe-q33',
    level: 1,
    questionTypeBadge: 'Nevezetes érték',
    question: 'Mennyi cos 30°?',
    options: ['√3/2', '1/2', '√2/2', '√3'],
    correctAnswer: 0,
    explanation: 'cos 30° = sin 60° = √3/2 ≈ 0,866 (a 30°–60°–90°-os háromszögben a 30° melletti befogó az átfogó √3/2-szerese).'
  },
  {
    id: 'tpe-q34',
    level: 1,
    questionTypeBadge: 'Nevezetes érték',
    question: 'Mennyi tg 60°?',
    options: ['√3', '√3/3', '1/2', '√3/2'],
    correctAnswer: 0,
    explanation: 'tg 60° = sin 60° / cos 60° = (√3/2) / (1/2) = √3 ≈ 1,732. (√3/3 a tg 30°.)'
  },
  {
    id: 'tpe-q35',
    level: 1,
    questionTypeBadge: 'Nevezetes érték',
    question: 'Mennyi sin 45°?',
    options: ['√2/2', '1/2', '1', '√2'],
    correctAnswer: 0,
    explanation: 'Az egyenlő szárú derékszögű háromszögben az átfogó a befogó √2-szerese: sin 45° = 1/√2 = √2/2 ≈ 0,707.'
  },
  {
    id: 'tpe-q36',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Derékszögű háromszögben mit jelent az α hegyesszög koszinusza?',
    options: [
      'Az α melletti befogó és az átfogó hányadosát',
      'Az α-val szemközti befogó és az átfogó hányadosát',
      'Az α-val szemközti és az α melletti befogó hányadosát',
      'Az átfogó és az α melletti befogó hányadosát'
    ],
    correctAnswer: 0,
    explanation: 'cos α = melletti befogó / átfogó. A szemközti / átfogó a szinusz, a szemközti / melletti a tangens.'
  },
  {
    id: 'tpe-q37',
    level: 1,
    questionTypeBadge: 'Tangens',
    figure: <RightTri opp="3 cm" adj="4 cm" ang="α" />,
    question: 'Egy derékszögű háromszög befogói 3 cm és 4 cm; az α szöggel szemközti befogó a 3 cm-es. Mennyi tg α?',
    options: ['0,75', '0,6', '0,8', '≈ 1,33'],
    correctAnswer: 0,
    explanation: 'tg α = szemközti / melletti = 3 / 4 = 0,75. (0,6 a sin α, 0,8 a cos α, ≈ 1,33 a másik hegyesszög tangense.)'
  },
  {
    id: 'tpe-q38',
    level: 1,
    questionTypeBadge: 'Szinusz',
    figure: <RightTri hyp="10 cm" opp="?" ang="30°" />,
    question: 'Egy derékszögű háromszög átfogója 10 cm, egyik hegyesszöge α = 30°. Milyen hosszú az α-val szemközti befogó?',
    options: ['5 cm', '≈ 8,66 cm', '20 cm', '≈ 5,77 cm'],
    correctAnswer: 0,
    explanation: 'a = c · sin α = 10 · sin 30° = 10 · 0,5 = 5 cm. (≈ 8,66 cm a melletti befogó, ≈ 5,77 cm = 10 · tg 30° hibás számolás.)'
  },
  {
    id: 'tpe-q39',
    level: 1,
    questionTypeBadge: 'Koszinusz',
    figure: <RightTri hyp="20 cm" adj="?" ang="40°" />,
    question: 'Egy derékszögű háromszög átfogója 20 cm, egyik hegyesszöge α = 40°. Milyen hosszú az α melletti befogó?',
    options: ['≈ 15,32 cm', '≈ 12,86 cm', '≈ 16,78 cm', '≈ 26,11 cm'],
    correctAnswer: 0,
    explanation: 'b = c · cos α = 20 · cos 40° ≈ 15,32 cm. (≈ 12,86 cm a szemközti befogó, ≈ 26,11 cm a hibás 20 / cos 40° osztás.)'
  },
  {
    id: 'tpe-q40',
    level: 1,
    questionTypeBadge: 'Szög meghatározása',
    figure: <RightTri opp="5 cm" adj="12 cm" ang="α = ?" />,
    question: 'Egy derékszögű háromszög befogói 5 cm és 12 cm. Mekkora a rövidebb befogóval szemközti α szög?',
    options: ['≈ 22,62°', '≈ 67,38°', '≈ 24,62°', '≈ 65,38°'],
    correctAnswer: 0,
    explanation: 'tg α = 5 / 12 ≈ 0,4167 ⇒ α ≈ 22,62°. (≈ 67,38° a másik hegyesszög; ≈ 24,62° akkor jönne ki, ha a 12 cm-t átfogónak tekintenénk.)'
  },
  {
    id: 'tpe-q41',
    level: 1,
    questionTypeBadge: 'Azonosság',
    question: 'Mennyi sin² α + cos² α értéke?',
    options: ['1', '0', '2', 'Az α szögtől függ'],
    correctAnswer: 0,
    explanation: 'Pitagorasz-tételből (az egységkörön x² + y² = 1): sin² α + cos² α = 1 minden szögre.'
  },
  {
    id: 'tpe-q42',
    level: 1,
    questionTypeBadge: 'Azonosság',
    question: 'Egy hegyesszög koszinusza 0,28. Mennyi a szinusza?',
    options: ['0,96', '0,72', '0,9216', '0,28'],
    correctAnswer: 0,
    explanation: 'sin α = √(1 − 0,28²) = √(1 − 0,0784) = √0,9216 = 0,96. (0,72 a hibás 1 − 0,28; 0,9216 a gyökvonás előtti érték.)'
  },
  {
    id: 'tpe-q43',
    level: 1,
    questionTypeBadge: 'Pótszög',
    question: 'Melyik egyenlő sin 50°-kal?',
    options: ['cos 40°', 'cos 50°', 'sin 40°', 'tg 40°'],
    correctAnswer: 0,
    explanation: 'Pótszögek: sin α = cos(90° − α), így sin 50° = cos 40° ≈ 0,766. (cos 50° = sin 40° ≈ 0,643.)'
  },
  {
    id: 'tpe-q44',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <Fig>
        <line x1={40} y1={130} x2={210} y2={130} />
        <line x1={170} y1={130} x2={170} y2={12} strokeWidth={3} stroke="#94a3b8" />
        <line x1={130} y1={130} x2={170} y2={20} stroke={BLUE} strokeWidth={2.4} />
        {angleArc([170, 130], [130, 130], [170, 20], 12, true, 'r')}
        {angleArc([130, 130], [170, 130], [170, 20], 16, false, 'a', '70°', 30)}
        <Lb x={142} y={72} t="5 m" a="end" />
        <Lb x={176} y={78} t="h = ?" a="start" />
      </Fig>
    ),
    question: 'Egy 5 m hosszú létra a függőleges falnak támaszkodik, és a vízszintes talajjal 70°-os szöget zár be. Milyen magasan éri a falat?',
    options: ['≈ 4,70 m', '≈ 1,71 m', '≈ 13,74 m', '≈ 5,32 m'],
    correctAnswer: 0,
    explanation: 'A létra az átfogó, a keresett magasság a 70°-kal szemközti befogó: h = 5 · sin 70° ≈ 4,70 m. (≈ 1,71 m a létra talpának távolsága a faltól.)'
  },
  {
    id: 'tpe-q45',
    level: 1,
    questionTypeBadge: 'Emelkedési szög',
    figure: (
      <Fig>
        <polygon points="25,120 215,120 215,82" fill="#e0f2fe" fillOpacity={0.6} />
        {angleArc([215, 120], [25, 120], [215, 82], 12, true, 'r')}
        {angleArc([25, 120], [215, 120], [215, 82], 40, false, 'a', 'α = ?', 58)}
        <Lb x={120} y={136} t="100 m" s={10} />
        <Lb x={221} y={105} t="8 m" s={10} a="start" />
        <Lb x={120} y={30} t="(nem méretarányos)" s={9} c="#64748b" />
      </Fig>
    ),
    question: 'Egy út 100 m vízszintes távolságon 8 m-t emelkedik. Mekkora szöget zár be az út a vízszintessel?',
    options: ['≈ 4,57°', '8°', '≈ 85,43°', '≈ 0,08°'],
    correctAnswer: 0,
    explanation: 'tg α = 8 / 100 = 0,08 ⇒ α ≈ 4,57°. (≈ 85,43° az út és a függőleges szöge; a 0,08 maga a tangens, nem a szög.)'
  },
  {
    id: 'tpe-q46',
    level: 1,
    questionTypeBadge: 'Tompaszög szinusza',
    figure: <UnitCircle deg={120} pLabel="P" vLabel="?" angLabel="120°" />,
    question: 'Mennyi sin 120°?',
    options: ['√3/2', '−√3/2', '1/2', '−1/2'],
    correctAnswer: 0,
    explanation: 'sin 120° = sin(180° − 60°) = sin 60° = √3/2: az egységkörön a 120°-hoz tartozó P pont második koordinátája pozitív.'
  },
  {
    id: 'tpe-q47',
    level: 1,
    questionTypeBadge: 'Tompaszög koszinusza',
    figure: <UnitCircle deg={135} pLabel="P" hLabel="?" angLabel="135°" />,
    question: 'Mennyi cos 135°?',
    options: ['−√2/2', '√2/2', '−1/2', '−√3/2'],
    correctAnswer: 0,
    explanation: 'cos 135° = cos(180° − 45°) = −cos 45° = −√2/2 ≈ −0,707: a P pont első koordinátája negatív.'
  },
  {
    id: 'tpe-q48',
    level: 1,
    questionTypeBadge: 'Területképlet',
    figure: (
      <PolyFig
        pts={[[0, 0], [10, 0], pol(8, 30)]}
        names={['C', 'B', 'A']}
        edges={['10 cm', undefined, '8 cm']}
        angs={[{ v: 0, p: 1, q: 2, label: '30°', r: 20, d: 40 }]}
        extra={(m) => T_AT(m, [6.2, 1.6])}
      />
    ),
    question: 'Egy háromszög két oldala 8 cm és 10 cm, az általuk közbezárt szög 30°. Mekkora a területe?',
    options: ['20 cm²', '40 cm²', '≈ 34,64 cm²', '80 cm²'],
    correctAnswer: 0,
    explanation: 'T = a · b · sin γ / 2 = 8 · 10 · 0,5 / 2 = 20 cm². (40 cm² a 2-vel osztás nélkül, ≈ 34,64 cm² koszinusszal számolva.)'
  },
  {
    id: 'tpe-q49',
    level: 1,
    questionTypeBadge: 'Körív',
    figure: <SectorFig deg={60} rLabel="6 cm" angLabel="60°" mode="arc" ask="i = ?" />,
    question: 'Milyen hosszú a 6 cm sugarú körben a 60°-os középponti szöghöz tartozó körív?',
    options: ['≈ 6,28 cm', '≈ 18,85 cm', '≈ 37,70 cm', '≈ 3,14 cm'],
    correctAnswer: 0,
    explanation: 'i = r · π · α / 180° = 6 · π · 60° / 180° = 2π ≈ 6,28 cm. (A 18,85 a körcikk területének mérőszáma, a 37,70 cm a teljes kerület.)'
  },
  {
    id: 'tpe-q50',
    level: 1,
    questionTypeBadge: 'Egységkör',
    figure: <UnitCircle deg={50} pLabel="P(?; ?)" />,
    question: 'Az egységkör (1, 0) pontját az origó körül α szöggel elforgatva a P pontba jutunk. Mik P koordinátái?',
    options: ['(cos α; sin α)', '(sin α; cos α)', '(tg α; 1)', '(cos α; tg α)'],
    correctAnswer: 0,
    explanation: 'Definíció szerint P első koordinátája cos α, második koordinátája sin α – így értelmezzük a tompaszögek szögfüggvényeit is.'
  }
];

// LEVEL 2 – további 20 kérdés (51–70): szinusz- és koszinusztétel, terület, tompaszögek, gyakorlati feladatok
const LEVEL2_EXTRA: QuizQuestion[] = [
  {
    id: 'tpe-q51',
    level: 2,
    questionTypeBadge: 'Koszinusztétel',
    figure: (
      <PolyFig
        pts={[[0, 0], [8, 0], pol(11, 50)]}
        names={['C', 'B', 'A']}
        edges={['a = 8 cm', 'c = ?', 'b = 11 cm']}
        angs={[{ v: 0, p: 1, q: 2, label: '50°' }]}
      />
    ),
    question: 'Egy háromszögben a = 8 cm, b = 11 cm, a közbezárt szög γ = 50°. Milyen hosszú a c oldal?',
    options: ['≈ 8,48 cm', '≈ 17,27 cm', '≈ 13,60 cm', '19 cm'],
    correctAnswer: 0,
    explanation: 'c² = 8² + 11² − 2 · 8 · 11 · cos 50° ≈ 185 − 113,13 = 71,87 ⇒ c ≈ 8,48 cm. (≈ 17,27 cm a „+” előjellel, ≈ 13,60 cm a koszinuszos tag nélkül.)'
  },
  {
    id: 'tpe-q52',
    level: 2,
    questionTypeBadge: 'Koszinusztétel',
    figure: (
      <PolyFig
        pts={[[0, 0], [7, 0], pol(8, 120)]}
        names={['C', 'B', 'A']}
        edges={['7 cm', '13 cm', '8 cm']}
        angs={[{ v: 0, p: 1, q: 2, label: 'γ = ?' }]}
      />
    ),
    question: 'Egy háromszög oldalai 7 cm, 8 cm és 13 cm. Mekkora a legnagyobb szöge?',
    options: ['120°', '60°', '150°', '90°'],
    correctAnswer: 0,
    explanation: 'A legnagyobb szög a 13 cm-rel szemközti: cos γ = (7² + 8² − 13²) / (2 · 7 · 8) = −56 / 112 = −0,5 ⇒ γ = 120°.'
  },
  {
    id: 'tpe-q53',
    level: 2,
    questionTypeBadge: 'Szinusztétel',
    figure: (
      <PolyFig
        pts={[[0, 0], [15.03, 0], pol(14.1, 40)]}
        names={['A', 'B', 'C']}
        edges={[undefined, 'a = 10 cm', 'b = ?']}
        angs={[{ v: 0, p: 1, q: 2, label: '40°', r: 18, d: 34 }, { v: 1, p: 2, q: 0, label: '65°' }]}
      />
    ),
    question: 'Egy háromszögben a = 10 cm, α = 40° és β = 65°. Milyen hosszú a b oldal?',
    options: ['≈ 14,10 cm', '≈ 7,09 cm', '≈ 15,03 cm', '≈ 9,06 cm'],
    correctAnswer: 0,
    explanation: 'Szinusztétel: b = a · sin β / sin α = 10 · sin 65° / sin 40° ≈ 14,10 cm. (≈ 7,09 cm a fordított arány, ≈ 15,03 cm a c oldal.)'
  },
  {
    id: 'tpe-q54',
    level: 2,
    questionTypeBadge: 'Területképlet',
    figure: (
      <PolyFig
        pts={[[0, 0], [15, 0], pol(12, 135)]}
        names={['C', 'B', 'A']}
        edges={['15 cm', undefined, '12 cm']}
        angs={[{ v: 0, p: 1, q: 2, label: '135°' }]}
        extra={(m) => T_AT(m, [6, 1.2])}
      />
    ),
    question: 'Egy háromszög két oldala 12 cm és 15 cm, közbezárt szögük 135°. Mekkora a területe?',
    options: ['≈ 63,64 cm²', '≈ 127,28 cm²', '90 cm²', '≈ 31,82 cm²'],
    correctAnswer: 0,
    explanation: 'T = 12 · 15 · sin 135° / 2 = 90 · √2/2 ≈ 63,64 cm². Tompaszögnél is pozitív a szinusz: sin 135° = sin 45°.'
  },
  {
    id: 'tpe-q55',
    level: 2,
    questionTypeBadge: 'Területképlet',
    question: 'Egy háromszög két oldala 8 cm és 10 cm, területe 30 cm². Mekkora lehet a két oldal által bezárt szög?',
    options: ['≈ 48,59° vagy ≈ 131,41°', 'Csak ≈ 48,59°', 'Csak ≈ 131,41°', '≈ 41,41° vagy ≈ 138,59°'],
    correctAnswer: 0,
    explanation: 'sin γ = 2T / (ab) = 60 / 80 = 0,75 ⇒ γ ≈ 48,59° vagy γ ≈ 180° − 48,59° = 131,41°; mindkét háromszög létezik.'
  },
  {
    id: 'tpe-q56',
    level: 2,
    questionTypeBadge: 'Tompaszög koszinusza',
    question: 'Egy háromszög egyik szögének koszinusza −0,6. Mekkora ez a szög?',
    options: ['≈ 126,87°', '≈ 53,13°', '≈ 143,13°', 'Nincs ilyen szög'],
    correctAnswer: 0,
    explanation: 'A negatív koszinusz tompaszöget jelent: α = 180° − 53,13° ≈ 126,87°. A koszinusz 0° és 180° között egyértelmű, második megoldás nincs.'
  },
  {
    id: 'tpe-q57',
    level: 2,
    questionTypeBadge: 'Tompaszög szinusza',
    question: 'Egy tompaszögű háromszög tompaszögének szinusza 0,5. Mekkora ez a szög?',
    options: ['150°', '30°', '120°', '135°'],
    correctAnswer: 0,
    explanation: 'sin α = 0,5 ⇒ α = 30° vagy α = 180° − 30° = 150°; tompaszög csak a 150° lehet.'
  },
  {
    id: 'tpe-q58',
    level: 2,
    questionTypeBadge: 'Paralelogramma',
    figure: (
      <PolyFig
        pts={parPts(9, 6, 60)}
        names={['A', 'B', 'C', 'D']}
        edges={['9 cm', '6 cm', undefined, undefined]}
        angs={[{ v: 0, p: 1, q: 3, label: '60°' }]}
        extra={(m) => T_AT(m, [6, 2.6])}
      />
    ),
    question: 'Egy paralelogramma oldalai 6 cm és 9 cm, egyik szöge 60°. Mekkora a területe?',
    options: ['≈ 46,77 cm²', '27 cm²', '54 cm²', '≈ 23,38 cm²'],
    correctAnswer: 0,
    explanation: 'Az átló két egybevágó háromszögre bontja: T = 2 · 6 · 9 · sin 60° / 2 = 54 · sin 60° ≈ 46,77 cm². (≈ 23,38 cm² csak az egyik háromszög.)'
  },
  {
    id: 'tpe-q59',
    level: 2,
    questionTypeBadge: 'Koszinusztétel',
    figure: (
      <PolyFig
        pts={parPts(9, 6, 60)}
        names={['A', 'B', 'C', 'D']}
        edges={['9 cm', '6 cm', undefined, undefined]}
        segs={[{ i: 0, j: 2, dash: true, label: 'e = ?', off: -10 }]}
        angs={[{ v: 0, p: 1, q: 3, label: '60°', lt: 0.62, d: 42 }]}
      />
    ),
    question: 'Milyen hosszú a 6 cm és 9 cm oldalú, 60°-os szögű paralelogramma hosszabbik átlója?',
    options: ['≈ 13,08 cm', '≈ 7,94 cm', '15 cm', '≈ 10,82 cm'],
    correctAnswer: 0,
    explanation: 'A hosszabbik átló a 120°-os szöggel szemközti: e² = 6² + 9² − 2 · 6 · 9 · cos 120° = 117 + 54 = 171 ⇒ e ≈ 13,08 cm. (≈ 7,94 cm a rövidebbik átló.)'
  },
  {
    id: 'tpe-q60',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <PolyFig
        pts={[[0, 0], pol(40, 10), pol(30, 80)]}
        names={['K', 'H₁', 'H₂']}
        edges={['40 km', 'd = ?', '30 km']}
        angs={[{ v: 0, p: 1, q: 2, label: '70°' }]}
      />
    ),
    question: 'Két hajó egyszerre indul a K kikötőből; az egyik 40 km-t, a másik 30 km-t tesz meg egyenes vonalban, útvonalaik 70°-os szöget zárnak be. Milyen messze vannak ekkor egymástól?',
    options: ['≈ 40,98 km', '≈ 57,63 km', '50 km', '10 km'],
    correctAnswer: 0,
    explanation: 'Koszinusztétel: d² = 30² + 40² − 2 · 30 · 40 · cos 70° ≈ 2500 − 820,8 ⇒ d ≈ 40,98 km. (50 km csak derékszögnél jönne ki.)'
  },
  {
    id: 'tpe-q61',
    level: 2,
    questionTypeBadge: 'Megoldások száma',
    question: 'Egy háromszögben a = 5 cm, b = 8 cm és α = 30°. Hány ilyen háromszög létezik?',
    options: ['2', '1', '0', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'sin β = 8 · sin 30° / 5 = 0,8 ⇒ β ≈ 53,13° vagy β ≈ 126,87°; mindkét esetben α + β < 180°, ezért két háromszög van.'
  },
  {
    id: 'tpe-q62',
    level: 2,
    questionTypeBadge: 'Megoldások száma',
    question: 'Egy háromszögben a = 3 cm, b = 8 cm és α = 30°. Hány ilyen háromszög létezik?',
    options: ['0', '1', '2', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'sin β = 8 · sin 30° / 3 ≈ 1,33 > 1, ilyen szög nincs – a 3 cm-es oldal nem éri el az α szög másik szárát.'
  },
  {
    id: 'tpe-q63',
    level: 2,
    questionTypeBadge: 'Szinusztétel',
    figure: (
      <PolyFig
        pts={[[0, 0], [20, 0], [45.73, 0], [45.73, 28.57]]}
        poly={[0, 2, 3]}
        names={['A', 'B', undefined, 'T']}
        segs={[{ i: 1, j: 3 }, { i: 0, j: 1, label: '20 m', off: 11 }, { i: 2, j: 3, label: 'h = ?', off: 20 }]}
        rights={[{ v: 2, p: 0, q: 3 }]}
        angs={[{ v: 0, p: 2, q: 3, label: '32°', r: 22, d: 40 }, { v: 1, p: 2, q: 3, label: '48°', r: 14, d: 28 }]}
      />
    ),
    question: 'Egy fa tetejét a talaj A pontjából 32°-os emelkedési szögben látjuk. A fa felé 20 m-t közeledve (B pont) 48°-os szögben látjuk. Milyen magas a fa? (A szemmagasságtól tekintsünk el.)',
    options: ['≈ 28,57 m', '≈ 38,45 m', '≈ 12,50 m', '≈ 22,21 m'],
    correctAnswer: 0,
    explanation: 'Az ABT háromszögben a T csúcsnál 48° − 32° = 16° van; szinusztétel: BT = 20 · sin 32° / sin 16° ≈ 38,45 m, majd h = BT · sin 48° ≈ 28,57 m.'
  },
  {
    id: 'tpe-q64',
    level: 2,
    questionTypeBadge: 'Területképlet',
    figure: (
      <PolyFig
        pts={parPts(10, 10, 40)}
        names={['A', 'B', 'C', 'D']}
        edges={['10 cm', undefined, undefined, undefined]}
        angs={[{ v: 0, p: 1, q: 3, label: '40°', r: 20, d: 38 }]}
        extra={(m) => T_AT(m, [8.6, 3.2])}
      />
    ),
    question: 'Egy rombusz oldala 10 cm, egyik szöge 40°. Mekkora a területe?',
    options: ['≈ 64,28 cm²', '≈ 76,60 cm²', '100 cm²', '≈ 32,14 cm²'],
    correctAnswer: 0,
    explanation: 'A rombusz is paralelogramma: T = a² · sin α = 100 · sin 40° ≈ 64,28 cm². (≈ 76,60 cm² koszinusszal, ≈ 32,14 cm² csak az egyik fele.)'
  },
  {
    id: 'tpe-q65',
    level: 2,
    questionTypeBadge: 'Koszinusztétel',
    question: 'Milyen az a háromszög, amelynek oldalai 5 cm, 6 cm és 8 cm?',
    options: ['Tompaszögű', 'Hegyesszögű', 'Derékszögű', 'Ilyen háromszög nem létezik'],
    correctAnswer: 0,
    explanation: 'A legnagyobb, 8 cm-rel szemközti szögre: cos γ = (25 + 36 − 64) / (2 · 5 · 6) = −0,05 < 0 ⇒ γ ≈ 92,87°, tehát (éppen hogy) tompaszögű.'
  },
  {
    id: 'tpe-q66',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <PolyFig
        pts={[[0, 0], pol(120, 110), pol(150, 35)]}
        names={['C', 'A', 'B']}
        edges={['120 m', '?', '150 m']}
        angs={[{ v: 0, p: 1, q: 2, label: '75°' }]}
        extra={(m) => {
          const c = m([(pol(120, 110)[0] + pol(150, 35)[0]) / 2, (pol(120, 110)[1] + pol(150, 35)[1]) / 2]);
          return <ellipse cx={c[0]} cy={c[1]} rx={30} ry={9} fill="#bfdbfe" fillOpacity={0.55} stroke="#60a5fa" strokeWidth={1.2} />;
        }}
      />
    ),
    question: 'Egy tó két partján lévő A és B pont távolságát akarjuk meghatározni. A C pontból CA = 120 m, CB = 150 m, és az ACB szög 75°. Milyen messze van egymástól A és B?',
    options: ['≈ 166,08 m', '≈ 214,98 m', '≈ 192,09 m', '270 m'],
    correctAnswer: 0,
    explanation: 'AB² = 120² + 150² − 2 · 120 · 150 · cos 75° ≈ 36 900 − 9317,5 ⇒ AB ≈ 166,08 m. (≈ 192,09 m a Pitagorasz-tétel, ami csak 90°-nál volna jó.)'
  },
  {
    id: 'tpe-q67',
    level: 2,
    questionTypeBadge: 'Szabályos sokszög',
    figure: (
      <PolyFig
        pts={regPts(6, 0)}
        poly={[0, 1, 2, 3, 4, 5]}
        circle={{ c: 6, r: 1 }}
        segs={[{ i: 6, j: 0, label: '5 cm', off: 9 }, { i: 6, j: 1 }]}
        angs={[{ v: 6, p: 0, q: 1, r: 12, label: '60°', d: 24 }]}
        extra={(m) => T_AT(m, [-0.45, -0.45])}
      />
    ),
    question: 'Mekkora annak a szabályos hatszögnek a területe, amelynek körülírt körének sugara 5 cm?',
    options: ['≈ 64,95 cm²', '75 cm²', '≈ 32,48 cm²', '≈ 129,90 cm²'],
    correctAnswer: 0,
    explanation: 'A hatszög 6 egyenlő szárú háromszögre bomlik, száraik 5 cm-esek, szárszögük 60°: T = 6 · 5² · sin 60° / 2 ≈ 64,95 cm². (75 cm² a szinusz elhagyásával.)'
  },
  {
    id: 'tpe-q68',
    level: 2,
    questionTypeBadge: 'Körcikk',
    figure: <SectorFig deg={72} rLabel="10 cm" angLabel="72°" mode="sector" ask="T = ?" />,
    question: 'Mekkora a 10 cm sugarú kör 72°-os középponti szögű körcikkének területe?',
    options: ['≈ 62,83 cm²', '≈ 12,57 cm²', '≈ 125,66 cm²', '≈ 31,42 cm²'],
    correctAnswer: 0,
    explanation: 't = r² · π · α / 360° = 100π · 72° / 360° = 20π ≈ 62,83 cm². (A 12,57 a körív hosszának mérőszáma cm-ben.)'
  },
  {
    id: 'tpe-q69',
    level: 2,
    questionTypeBadge: 'Kör húrja',
    figure: <SectorFig deg={100} rLabel="10 cm" angLabel="100°" mode="chord" ask="" chordLabel="h = ?" />,
    question: 'Egy 10 cm sugarú körben egy húrhoz 100°-os középponti szög tartozik. Milyen hosszú a húr?',
    options: ['≈ 15,32 cm', '≈ 12,86 cm', '≈ 17,45 cm', '≈ 7,66 cm'],
    correctAnswer: 0,
    explanation: 'A középpontból a húrra bocsátott merőleges felezi a húrt és a szöget: h = 2 · 10 · sin 50° ≈ 15,32 cm. (≈ 17,45 cm az ív hossza, ≈ 7,66 cm csak a húr fele.)'
  },
  {
    id: 'tpe-q70',
    level: 2,
    questionTypeBadge: 'Szinusztétel',
    question: 'Egy háromszögben a = 12 cm, b = 9 cm és α = 70°. Mekkora a β szög?',
    options: ['≈ 44,81°', '≈ 135,19°', '≈ 44,81° vagy ≈ 135,19°', '≈ 48,59°'],
    correctAnswer: 0,
    explanation: 'sin β = 9 · sin 70° / 12 ≈ 0,7048 ⇒ β ≈ 44,81°. A 135,19° nem lehet: b < a miatt β < α (és 70° + 135,19° > 180°).'
  }
];

// LEVEL 3 – további 20 kérdés (71–90): többlépéses és érettségi típusú feladatok
const LEVEL3_EXTRA: QuizQuestion[] = [
  {
    id: 'tpe-q71',
    level: 3,
    questionTypeBadge: 'Koszinusztétel + terület',
    figure: (
      <PolyFig
        pts={[[0, 0], [7, 0], pol(9, 96.38)]}
        names={['C', 'B', 'A']}
        edges={['7 cm', '12 cm', '9 cm']}
        extra={(m) => T_AT(m, [1.6, 2.8])}
      />
    ),
    question: 'Egy háromszög oldalai 7 cm, 9 cm és 12 cm. Mekkora a területe?',
    options: ['≈ 31,30 cm²', '≈ 62,61 cm²', '42 cm²', '54 cm²'],
    correctAnswer: 0,
    explanation: 'A 12 cm-rel szemközti szögre: cos γ = (49 + 81 − 144) / (2 · 7 · 9) ≈ −0,1111 ⇒ γ ≈ 96,38°; T = 7 · 9 · sin γ / 2 ≈ 31,30 cm². (≈ 62,61 cm² a 2-vel osztás nélkül.)'
  },
  {
    id: 'tpe-q72',
    level: 3,
    questionTypeBadge: 'Magasság',
    question: 'Mekkora a 7 cm, 9 cm és 12 cm oldalú háromszög (T ≈ 31,30 cm²) 12 cm-es oldalához tartozó magassága?',
    options: ['≈ 5,22 cm', '≈ 2,61 cm', '≈ 6,96 cm', '≈ 8,94 cm'],
    correctAnswer: 0,
    explanation: 'T = c · m / 2 ⇒ m = 2T / c = 2 · 31,30 / 12 ≈ 5,22 cm. (≈ 6,96 cm és ≈ 8,94 cm a 9 cm-es, illetve a 7 cm-es oldalhoz tartozó magasság.)'
  },
  {
    id: 'tpe-q73',
    level: 3,
    questionTypeBadge: 'Szinusztétel + terület',
    figure: (
      <PolyFig
        pts={[[0, 0], [10, 0], pol(9.216, 50)]}
        names={['B', 'C', 'A']}
        edges={['a = 10 cm', undefined, undefined]}
        angs={[{ v: 0, p: 1, q: 2, label: '50°' }, { v: 1, p: 2, q: 0, label: '60°' }]}
        extra={(m) => T_AT(m, [5, 2.2])}
      />
    ),
    question: 'Egy háromszögben a = 10 cm, β = 50° és γ = 60°. Mekkora a területe?',
    options: ['≈ 35,30 cm²', '≈ 70,60 cm²', '≈ 40,76 cm²', '≈ 38,30 cm²'],
    correctAnswer: 0,
    explanation: 'α = 70°; szinusztétel: b = 10 · sin 50° / sin 70° ≈ 8,15 cm; T = a · b · sin γ / 2 = 10 · 8,15 · sin 60° / 2 ≈ 35,30 cm².'
  },
  {
    id: 'tpe-q74',
    level: 3,
    questionTypeBadge: 'Paralelogramma',
    figure: (
      <PolyFig
        pts={diagPar}
        poly={[0, 1, 2, 3]}
        names={['A', 'B', 'C', 'D', 'M']}
        nameDir={{ 4: [0.35, 1] }}
        segs={[{ i: 0, j: 4, dash: true, label: '8 cm', off: 9 }, { i: 4, j: 2, dash: true }, { i: 1, j: 4, dash: true }, { i: 4, j: 3, dash: true, label: '5 cm', off: 10, at: 0.72 }]}
        angs={[{ v: 4, p: 2, q: 3, label: '50°', r: 12, d: 24, lt: 0.2 }]}
      />
    ),
    question: 'Egy paralelogramma átlói 16 cm és 10 cm hosszúak, és 50°-os szöget zárnak be. Mekkora a területe?',
    options: ['≈ 61,28 cm²', '≈ 122,57 cm²', '80 cm²', '≈ 51,42 cm²'],
    correctAnswer: 0,
    explanation: 'Az átlók felezik egymást, így négy háromszög keletkezik 8 és 5 cm-es oldalakkal és 50°-os vagy 130°-os szöggel (szinuszuk egyenlő): T = 4 · 8 · 5 · sin 50° / 2 ≈ 61,28 cm².'
  },
  {
    id: 'tpe-q75',
    level: 3,
    questionTypeBadge: 'Paralelogramma',
    figure: (
      <PolyFig
        pts={diagPar}
        poly={[0, 1, 2, 3]}
        names={['A', 'B', 'C', 'D', 'M']}
        nameDir={{ 4: [0.35, 1] }}
        edges={[undefined, undefined, '?', undefined]}
        segs={[{ i: 0, j: 4, dash: true, label: '8 cm', off: 9 }, { i: 4, j: 2, dash: true }, { i: 1, j: 4, dash: true }, { i: 4, j: 3, dash: true, label: '5 cm', off: 10, at: 0.72 }]}
        angs={[{ v: 4, p: 2, q: 3, label: '50°', r: 12, d: 24, lt: 0.2 }]}
      />
    ),
    question: 'Milyen hosszú annak a paralelogrammának a rövidebbik oldala, amelynek átlói 16 cm és 10 cm, és 50°-os szöget zárnak be?',
    options: ['≈ 6,13 cm', '≈ 11,85 cm', '≈ 9,43 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'A rövidebb oldal a félátlók (8 és 5 cm) 50°-os szögével szemközti: a² = 8² + 5² − 2 · 8 · 5 · cos 50° ≈ 37,58 ⇒ a ≈ 6,13 cm. (≈ 11,85 cm a 130°-kal szemközti hosszabbik oldal.)'
  },
  {
    id: 'tpe-q76',
    level: 3,
    questionTypeBadge: 'Trapéz',
    figure: (
      <PolyFig
        pts={[[0, 0], [20, 0], [16, 6.928], [4, 6.928], [4, 0]]}
        poly={[0, 1, 2, 3]}
        edges={['20 cm', '8 cm', '12 cm', '8 cm']}
        segs={[{ i: 3, j: 4, dash: true, label: 'm', off: -9 }]}
        rights={[{ v: 4, p: 1, q: 3 }]}
        extra={(m) => T_AT(m, [11, 3.3])}
      />
    ),
    question: 'Egy egyenlő szárú trapéz alapjai 20 cm és 12 cm, szárai 8 cm hosszúak. Mekkora a területe?',
    options: ['≈ 110,85 cm²', '128 cm²', '≈ 55,43 cm²', '≈ 221,70 cm²'],
    correctAnswer: 0,
    explanation: 'A szár vetülete az alapon (20 − 12) / 2 = 4 cm, így cos α = 4 / 8 ⇒ α = 60°, m = 8 · sin 60° ≈ 6,93 cm; T = (20 + 12) / 2 · m ≈ 110,85 cm². (128 cm² a szárat magasságnak véve.)'
  },
  {
    id: 'tpe-q77',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <Fig>
        <line x1={14} y1={125} x2={228} y2={125} stroke="#60a5fa" />
        <line x1={215} y1={125} x2={215} y2={85} strokeWidth={4} stroke="#94a3b8" />
        <line x1={215} y1={85} x2={20} y2={85} strokeDasharray="4 3" strokeWidth={1.2} />
        <line x1={215} y1={85} x2={27} y2={125} stroke={BLUE} strokeWidth={1.4} />
        <line x1={215} y1={85} x2={105} y2={125} stroke={BLUE} strokeWidth={1.4} />
        <polygon points="19,121 35,121 31,126 23,126" fill={INK} stroke="none" />
        <polygon points="97,121 113,121 109,126 101,126" fill={INK} stroke="none" />
        {angleArc([27, 125], [215, 125], [215, 85], 34, false, 'a1', '12°', 50)}
        {angleArc([105, 125], [215, 125], [215, 85], 24, false, 'a2', '20°', 40)}
        <Lb x={209} y={108} t="40 m" s={10} a="end" />
        <Lb x={66} y={140} t="?" s={11} />
        <Lb x={27} y={140} t="H₁" s={9} c="#0f172a" />
        <Lb x={105} y={140} t="H₂" s={9} c="#0f172a" />
      </Fig>
    ),
    question: 'Egy 40 m magas világítótorony tetejéről egy közeledő hajót először 12°-os, később 20°-os depressziószögben látunk. Mennyit haladt közben a hajó? (A torony talppontja a víz szintjén van.)',
    options: ['≈ 78,3 m', '≈ 188,2 m', '≈ 109,9 m', '≈ 6,1 m'],
    correctAnswer: 0,
    explanation: 'Váltószögek miatt a hajóból 12°-os, majd 20°-os emelkedési szögben látszik a toronytető. Távolságok: 40 / tg 12° ≈ 188,19 m és 40 / tg 20° ≈ 109,90 m; a különbség ≈ 78,3 m.'
  },
  {
    id: 'tpe-q78',
    level: 3,
    questionTypeBadge: 'Terület + koszinusztétel',
    figure: (
      <PolyFig
        pts={[[0, 0], [6, 0], pol(8, 120)]}
        names={['C', 'B', 'A']}
        edges={['a = 6 cm', 'c = ?', 'b = 8 cm']}
        angs={[{ v: 0, p: 1, q: 2, label: 'γ' }]}
      />
    ),
    question: 'Egy háromszög két oldala a = 6 cm és b = 8 cm, területe 12√3 ≈ 20,78 cm², és a két oldal által közbezárt γ szög tompaszög. Milyen hosszú a c oldal?',
    options: ['≈ 12,17 cm', '≈ 7,21 cm', '10 cm', '14 cm'],
    correctAnswer: 0,
    explanation: 'sin γ = 2T / (ab) = 24√3 / 48 = √3/2 ⇒ γ = 60° vagy 120°; tompaszög, tehát γ = 120°. c² = 36 + 64 − 2 · 6 · 8 · cos 120° = 148 ⇒ c ≈ 12,17 cm. (≈ 7,21 cm a 60°-os eset.)'
  },
  {
    id: 'tpe-q79',
    level: 3,
    questionTypeBadge: 'Szabályos sokszög',
    figure: (
      <PolyFig
        pts={regPts(8, 90)}
        poly={[0, 1, 2, 3, 4, 5, 6, 7]}
        circle={{ c: 8, r: 1 }}
        segs={[{ i: 8, j: 0, label: '10 cm', off: 16 }, { i: 8, j: 1 }]}
        angs={[{ v: 8, p: 0, q: 1, r: 10 }]}
        extra={(m) => T_AT(m, [0.1, -0.45])}
      />
    ),
    question: 'Mekkora a 10 cm sugarú körbe írt szabályos nyolcszög területe?',
    options: ['≈ 282,84 cm²', '≈ 565,69 cm²', '≈ 314,16 cm²', '≈ 141,42 cm²'],
    correctAnswer: 0,
    explanation: '8 egyenlő szárú háromszögre bontjuk, száraik 10 cm-esek, szárszögük 360° / 8 = 45°: T = 8 · 10² · sin 45° / 2 = 200√2 ≈ 282,84 cm². (≈ 314,16 cm² a kör területe – a nyolcszögé ennél kisebb.)'
  },
  {
    id: 'tpe-q80',
    level: 3,
    questionTypeBadge: 'Körszelet',
    figure: <SectorFig deg={120} rLabel="8 cm" angLabel="120°" mode="segment" ask="T = ?" />,
    question: 'Mekkora a 8 cm sugarú körben a 120°-os középponti szöghöz tartozó (kisebbik) körszelet területe?',
    options: ['≈ 39,31 cm²', '≈ 67,02 cm²', '≈ 94,73 cm²', '≈ 27,71 cm²'],
    correctAnswer: 0,
    explanation: 'Körcikk: 8² · π · 120° / 360° ≈ 67,02 cm²; a háromszög: 8 · 8 · sin 120° / 2 ≈ 27,71 cm²; a körszelet: 67,02 − 27,71 ≈ 39,31 cm².'
  },
  {
    id: 'tpe-q81',
    level: 3,
    questionTypeBadge: 'Magasság',
    figure: (
      <PolyFig
        pts={[[0, 0], [7, 0], [0.7143, 4.9487], [0.7143, 0]]}
        poly={[0, 1, 2]}
        names={['A', 'B', 'C']}
        edges={[undefined, '8 cm', '5 cm']}
        segs={[{ i: 2, j: 3, dash: true, label: 'm = ?', off: -20 }]}
        rights={[{ v: 3, p: 1, q: 2 }]}
        angs={[{ v: 2, p: 0, q: 1, label: '60°', r: 16, d: 30 }]}
      />
    ),
    question: 'Egy háromszög két oldala 5 cm és 8 cm, közbezárt szögük 60°. Mekkora a harmadik oldalhoz tartozó magasság?',
    options: ['≈ 4,95 cm', '≈ 2,47 cm', '≈ 4,33 cm', '≈ 6,93 cm'],
    correctAnswer: 0,
    explanation: 'c² = 25 + 64 − 2 · 5 · 8 · cos 60° = 49 ⇒ c = 7 cm; T = 5 · 8 · sin 60° / 2 ≈ 17,32 cm²; m = 2T / c ≈ 4,95 cm. (≈ 4,33 cm és ≈ 6,93 cm a másik két oldalhoz tartozó magasság.)'
  },
  {
    id: 'tpe-q82',
    level: 3,
    questionTypeBadge: 'Súlyvonal',
    figure: (
      <PolyFig
        pts={[[0, 0], [8, 0], [2, 6.7082], [4, 0]]}
        poly={[0, 1, 2]}
        names={['C', 'A', 'B']}
        edges={['8 cm', '9 cm', '7 cm']}
        segs={[{ i: 2, j: 3, label: 's = ?', off: 14, red: true }]}
      />
    ),
    question: 'Egy háromszög oldalai 7 cm, 8 cm és 9 cm. Milyen hosszú a 8 cm-es oldalhoz tartozó súlyvonal?',
    options: ['7 cm', '≈ 7,76 cm', '≈ 8,06 cm', '5,5 cm'],
    correctAnswer: 0,
    explanation: 'A 7 és 8 cm-es oldal szögére: cos γ = (49 + 64 − 81) / (2 · 7 · 8) = 2/7. A súlyvonal a 7 cm-es oldallal és a 8 cm-es oldal felével (4 cm) háromszöget alkot: s² = 49 + 16 − 2 · 7 · 4 · 2/7 = 49 ⇒ s = 7 cm. (≈ 8,06 cm a koszinuszos tag elhagyásával, ≈ 7,76 cm a 7 cm-es oldalhoz tartozó súlyvonal.)'
  },
  {
    id: 'tpe-q83',
    level: 3,
    questionTypeBadge: 'Sokszög területe',
    figure: (
      <PolyFig
        pts={par83}
        names={['A', 'B', 'C', 'D']}
        edges={['5 cm', '6 cm', '7 cm', '8 cm']}
        segs={[{ i: 0, j: 2, dash: true }]}
        angs={[{ v: 1, p: 0, q: 2, label: '110°' }]}
        extra={(m) => T_AT(m, [2.6, 5.4])}
      />
    ),
    question: 'Az ABCD konvex négyszögben AB = 5 cm, BC = 6 cm, CD = 7 cm, DA = 8 cm és ABC∠ = 110°. Mekkora a négyszög területe?',
    options: ['≈ 40,97 cm²', '≈ 14,10 cm²', '≈ 26,87 cm²', '≈ 81,93 cm²'],
    correctAnswer: 0,
    explanation: 'AC² = 25 + 36 − 2 · 5 · 6 · cos 110° ≈ 81,52 ⇒ AC ≈ 9,03 cm. Az ACD háromszögben cos D∠ = (49 + 64 − 81,52) / (2 · 7 · 8) ⇒ D∠ ≈ 73,68°. T = 5 · 6 · sin 110° / 2 + 7 · 8 · sin 73,68° / 2 ≈ 14,10 + 26,87 ≈ 40,97 cm².'
  },
  {
    id: 'tpe-q84',
    level: 3,
    questionTypeBadge: 'Rombusz',
    figure: (
      <PolyFig
        pts={parPts(10, 10, 30)}
        names={['A', 'B', 'C', 'D']}
        edges={['10 cm', undefined, undefined, undefined]}
        segs={[{ i: 1, j: 3, dash: true, label: '?', off: 9 }]}
        extra={(m) => T_AT(m, [13.6, 3.5], 'T = 50 cm²')}
      />
    ),
    question: 'Egy rombusz oldala 10 cm, területe 50 cm². Milyen hosszú a rövidebbik átlója?',
    options: ['≈ 5,18 cm', '≈ 19,32 cm', '10 cm', '≈ 7,07 cm'],
    correctAnswer: 0,
    explanation: 'T = a² · sin α ⇒ sin α = 50 / 100 = 0,5, a hegyesszög 30°. A rövidebb átló a 30°-kal szemközti: e² = 10² + 10² − 2 · 10 · 10 · cos 30° ⇒ e ≈ 5,18 cm. (≈ 19,32 cm a hosszabbik átló.)'
  },
  {
    id: 'tpe-q85',
    level: 3,
    questionTypeBadge: 'Erők eredője',
    figure: <ForceFig l1={92} l2={70} deg={62.72} lab1="F₁ = 40 N" lab2="F₂ = 30 N" labR="R = 60 N" labAng="φ = ?" angLt={0.85} rLeft />,
    question: 'Két, egy pontban ható erő nagysága 30 N és 40 N, eredőjük 60 N. Mekkora szöget zár be a két erő?',
    options: ['≈ 62,72°', '≈ 117,28°', '90°', '≈ 48,19°'],
    correctAnswer: 0,
    explanation: 'Az erőparalelogrammában az eredő a 180° − φ szöggel szemközti átló: 60² = 30² + 40² − 2 · 30 · 40 · cos(180° − φ) = 2500 + 2400 · cos φ ⇒ cos φ ≈ 0,4583 ⇒ φ ≈ 62,72°. (≈ 117,28° az erőháromszög szöge; 90°-nál az eredő 50 N lenne.)'
  },
  {
    id: 'tpe-q86',
    level: 3,
    questionTypeBadge: 'Megoldások száma',
    question: 'Egy háromszögben a = 10 cm, b = 14 cm és α = 40°. Mekkora lehet a c oldal?',
    options: ['≈ 15,09 cm vagy ≈ 6,36 cm', 'Csak ≈ 15,09 cm', 'Csak ≈ 6,36 cm', 'Nincs ilyen háromszög'],
    correctAnswer: 0,
    explanation: 'sin β = 14 · sin 40° / 10 ≈ 0,8999 ⇒ β ≈ 64,15° vagy β ≈ 115,85°. Ekkor γ ≈ 75,85° vagy ≈ 24,15°, és c = a · sin γ / sin α ≈ 15,09 cm vagy ≈ 6,36 cm.'
  },
  {
    id: 'tpe-q87',
    level: 3,
    questionTypeBadge: 'Körcikk',
    figure: <SectorFig deg={76.39} rLabel="12 cm" angLabel="" mode="sector" ask="K = 40 cm, T = ?" />,
    question: 'Egy 12 cm sugarú körcikk kerülete 40 cm. Mekkora a területe?',
    options: ['96 cm²', '192 cm²', '240 cm²', '≈ 76,39 cm²'],
    correctAnswer: 0,
    explanation: 'Az ív hossza 40 − 2 · 12 = 16 cm, így a középponti szög α = 16 · 180° / (12π) ≈ 76,39°. A terület: 12² · π · 76,39° / 360° = i · r / 2 = 16 · 12 / 2 = 96 cm².'
  },
  {
    id: 'tpe-q88',
    level: 3,
    questionTypeBadge: 'Kör és háromszög',
    figure: (
      <PolyFig
        pts={[pol(1, 270), pol(1, 50), pol(1, 130), [0, 0]]}
        poly={[0, 1, 2]}
        circle={{ c: 3, r: 1 }}
        names={['A', 'B', 'C', undefined]}
        edges={[undefined, '?', undefined]}
        segs={[{ i: 3, j: 1, dash: true, label: '10 cm', off: 12 }]}
        angs={[{ v: 0, p: 1, q: 2, label: '40°', r: 20, d: 36 }]}
        extra={(m) => {
          const o = m([0, 0]);
          return <circle cx={o[0]} cy={o[1]} r={2} fill={INK} stroke="none" />;
        }}
      />
    ),
    question: 'Egy 10 cm sugarú körbe írt háromszög egyik szöge α = 40°. Milyen hosszú az α-val szemközti oldal?',
    options: ['≈ 12,86 cm', '≈ 6,43 cm', '≈ 15,32 cm', '≈ 25,71 cm'],
    correctAnswer: 0,
    explanation: 'A kerületi és középponti szögek tétele miatt a szemközti oldalhoz 2 · 40° = 80°-os középponti szög tartozik; a húr: a = 2 · 10 · sin 40° ≈ 12,86 cm. (≈ 15,32 cm koszinusszal számolva, ≈ 6,43 cm csak a húr fele.)'
  },
  {
    id: 'tpe-q89',
    level: 3,
    questionTypeBadge: 'Tompaszög',
    question: 'Egy tompaszög szinusza 0,6. Mennyi a tangense?',
    options: ['−0,75', '0,75', '≈ −1,33', '≈ 1,33'],
    correctAnswer: 0,
    explanation: 'cos α = −√(1 − 0,36) = −0,8 (tompaszögnél negatív), így tg α = sin α / cos α = 0,6 / (−0,8) = −0,75.'
  },
  {
    id: 'tpe-q90',
    level: 3,
    questionTypeBadge: 'Szabályos sokszög',
    figure: (
      <PolyFig
        pts={regPts(5, 90).slice(0, 5)}
        names={[undefined, undefined, undefined, undefined, undefined]}
        edges={['10 cm', undefined, undefined, undefined, undefined]}
        segs={[{ i: 1, j: 4, dash: true, label: 'd = ?', off: 10 }]}
        angs={[{ v: 0, p: 1, q: 4, label: '108°', r: 12, d: 26 }]}
      />
    ),
    question: 'Milyen hosszú a 10 cm oldalú szabályos ötszög átlója?',
    options: ['≈ 16,18 cm', '≈ 6,18 cm', '≈ 11,76 cm', '20 cm'],
    correctAnswer: 0,
    explanation: 'A szabályos ötszög szögei (5 − 2) · 180° / 5 = 108°-osak. Az átló két oldallal háromszöget alkot, amelyben a 108°-kal szemközti: d² = 10² + 10² − 2 · 10 · 10 · cos 108° ≈ 261,8 ⇒ d ≈ 16,18 cm.'
  }
];

const TRIG_PRACTICE_EXAM_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Alapok (1–10)
  {
    id: 'tpe-q1',
    questionTypeBadge: 'Szinusz, koszinusz',
    level: 1,
    question: 'Egy derékszögű háromszög egyik hegyesszögének szinusza 0,6. Mennyi ennek a szögnek a koszinusza?',
    options: ['0,8', '0,6', '0,75', '0,4'],
    correctAnswer: 0,
    explanation: 'sin α = 0,6 = 3/5, például 3–4–5 cm-es oldalakkal: cos α = 4/5 = 0,8. (Ellenőrzés: 0,6² + 0,8² = 1.)'
  },
  {
    id: 'tpe-q2',
    questionTypeBadge: 'Tangens',
    level: 1,
    question: 'Ugyanennek a szögnek (sin α = 0,6) mennyi a tangense?',
    options: ['0,75', '0,8', '≈ 1,33', '0,6'],
    correctAnswer: 0,
    explanation: 'tg α = sin α / cos α = 0,6 / 0,8 = 0,75 (= 3/4). Az ≈ 1,33 a másik hegyesszög tangense.'
  },
  {
    id: 'tpe-q3',
    questionTypeBadge: 'Pótszög',
    level: 1,
    question: 'Ebben a derékszögű háromszögben (sin α = 0,6) mennyi a másik hegyesszög szinusza?',
    options: ['0,8', '0,6', '0,4', '0,75'],
    correctAnswer: 0,
    explanation: 'A pótszög szinusza az eredeti szög koszinusza: sin(90° − α) = cos α = 0,8.'
  },
  {
    id: 'tpe-q4',
    questionTypeBadge: 'Nevezetes érték',
    level: 1,
    question: 'Mennyi cos 90°?',
    options: ['0', '1', '−1', 'Nem értelmezett'],
    correctAnswer: 0,
    explanation: 'A tankönyv szerint sin 90° = 1 és cos 90° = 0.'
  },
  {
    id: 'tpe-q5',
    questionTypeBadge: 'Kiegészítő szögek',
    level: 1,
    question: 'Melyik összefüggés igaz minden 0° < α < 180° szögre?',
    options: ['cos(180° − α) = −cos α', 'cos(180° − α) = cos α', 'sin(180° − α) = −sin α', 'sin(180° − α) = cos α'],
    correctAnswer: 0,
    explanation: 'Kiegészítő szögek koszinusza egymás ellentettje, szinusza egyenlő: sin(180° − α) = sin α.'
  },
  {
    id: 'tpe-q6',
    questionTypeBadge: 'Területképlet',
    level: 1,
    question: 'Mekkora a háromszög területe, ha két oldala a és b, közbezárt szögük γ?',
    options: ['T = a · b · sin γ / 2', 'T = a · b · cos γ / 2', 'T = a · b · sin γ', 'T = a · b / 2'],
    correctAnswer: 0,
    explanation: 'A szinuszos területképlet: T = a · b · sin γ / 2 (derékszögnél sin 90° = 1, visszakapjuk a · b / 2-t).'
  },
  {
    id: 'tpe-q7',
    questionTypeBadge: 'Koszinusztétel',
    level: 1,
    question: 'Ismerjük egy háromszög mindhárom oldalát. Melyik tétellel kapjuk meg a szögeit?',
    options: ['Koszinusztétellel', 'Szinusztétellel', 'Pitagorasz-tétellel', 'A körcikk képletével'],
    correctAnswer: 0,
    explanation: 'A koszinusztételből cos γ = (a² + b² − c²) / (2ab), és a koszinusz 0° és 180° között egyértelműen meghatározza a szöget.'
  },
  {
    id: 'tpe-q8',
    questionTypeBadge: 'Derékszögű háromszög',
    figure: FIG.q8,
    level: 1,
    question: 'Egy egyenlő szárú háromszög alapon fekvő szögei 70°-osak, szárai 15 cm hosszúak. Mekkora az alaphoz tartozó magassága?',
    options: ['≈ 14,10 cm', '≈ 5,13 cm', '≈ 41,21 cm', '7,5 cm'],
    correctAnswer: 0,
    explanation: 'A magasság két derékszögű háromszögre bont; a 70°-kal szemközti befogó a magasság: m = 15 · sin 70° ≈ 14,10 cm.'
  },
  {
    id: 'tpe-q9',
    questionTypeBadge: 'Derékszögű háromszög',
    figure: FIG.q9,
    level: 1,
    question: 'Milyen hosszú ennek az egyenlő szárú háromszögnek (70°, 15 cm-es szárak) az alapja?',
    options: ['≈ 10,26 cm', '≈ 5,13 cm', '≈ 28,19 cm', '30 cm'],
    correctAnswer: 0,
    explanation: 'Az alap fele a 70°-os szög melletti befogó: 15 · cos 70° ≈ 5,13 cm, így az alap ≈ 10,26 cm.'
  },
  {
    id: 'tpe-q10',
    questionTypeBadge: 'Szög a szinuszából',
    level: 1,
    question: 'Egy háromszög egyik szögének szinusza 0,7642. Mekkora lehet ez a szög?',
    options: ['≈ 49,84° vagy ≈ 130,16°', 'Csak ≈ 49,84°', 'Csak ≈ 130,16°', '≈ 40,16° vagy ≈ 139,84°'],
    correctAnswer: 0,
    explanation: 'A számológép ≈ 49,84°-ot ad, de sin(180° − α) = sin α miatt ≈ 130,16° is lehet. (A 40,16° az arccos 0,7642 lenne.)'
  },

  ...LEVEL1_EXTRA,

  // LEVEL 2: Tankönyvi feladatok (11–20)
  {
    id: 'tpe-q11',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG.q11,
    level: 2,
    question: 'Milyen magas a Kristályszálló, ha 12 m-ről, 1,6 m-es szemmagasságból 65°-os emelkedési szögben látjuk a tetejét?',
    options: ['≈ 27,3 m', '≈ 25,7 m', '≈ 7,2 m', '≈ 13,6 m'],
    correctAnswer: 0,
    explanation: '12 · tg 65° ≈ 25,73 m a szemmagasság fölött, ehhez hozzáadjuk az 1,6 m-t: ≈ 27,3 m.'
  },
  {
    id: 'tpe-q12',
    questionTypeBadge: 'Körszelet',
    figure: FIG.q12,
    level: 2,
    question: 'Egy 12 cm sugarú kört egy 16 cm hosszú húr két körszeletre bont. Mekkora a kisebbik körszelet területe?',
    options: ['≈ 33,5 cm²', '≈ 105,1 cm²', '≈ 71,6 cm²', '≈ 418,9 cm²'],
    correctAnswer: 0,
    explanation: 'sin(α/2) = 8/12 ⇒ α ≈ 83,62°; körcikk ≈ 105,08 cm², háromszög ≈ 71,55 cm²; körszelet ≈ 33,53 cm². (A 418,9 cm² a nagyobbik körszelet.)'
  },
  {
    id: 'tpe-q13',
    questionTypeBadge: 'Szinusztétel',
    figure: FIG.q13,
    level: 2,
    question: 'Az ABC háromszögben AB = 17 cm, α = 78°, β = 36°. Milyen hosszú a BC oldal?',
    options: ['≈ 18,20 cm', '≈ 10,94 cm', '≈ 15,88 cm', '17 cm'],
    correctAnswer: 0,
    explanation: 'γ = 66°; szinusztétel: BC = 17 · sin 78° / sin 66° ≈ 18,20 cm. (10,94 cm az AC oldal.)'
  },
  {
    id: 'tpe-q14',
    questionTypeBadge: 'Kör érintői',
    figure: FIG.q14,
    level: 2,
    question: 'Egy 3,4 cm sugarú kör két érintője 56°-os szöget zár be. Milyen messze van a metszéspontjuk a kör középpontjától?',
    options: ['≈ 7,24 cm', '≈ 6,39 cm', '≈ 3,85 cm', '≈ 6,08 cm'],
    correctAnswer: 0,
    explanation: 'Az érintési pontban derékszög van, a középpontból húzott egyenes felezi az 56°-ot: d = 3,4 / sin 28° ≈ 7,24 cm. (6,39 cm az érintőszakasz.)'
  },
  {
    id: 'tpe-q15',
    questionTypeBadge: 'Szinusztétel',
    figure: FIG.q15,
    level: 2,
    question: 'Az ABCD négyszög AC átlója 22 cm; az ABC háromszögben az A-nál 60°-os, a C-nél 40°-os szög van. Mekkora az AB oldal?',
    options: ['≈ 14,36 cm', '≈ 19,35 cm', '≈ 18,25 cm', '≈ 11 cm'],
    correctAnswer: 0,
    explanation: 'B∠ = 80°; AB = 22 · sin 40° / sin 80° ≈ 14,36 cm (a 40°-kal szemközti oldal). A 19,35 cm a BC oldal.'
  },
  {
    id: 'tpe-q16',
    questionTypeBadge: 'Koszinusztétel',
    level: 2,
    question: 'A vödörre 100 N gravitációs erő hat, az apa 109 N erővel, a függőlegessel 35°-os szögben tartja. Mekkora erővel tartja a fia?',
    options: ['≈ 63,4 N', '9 N', '≈ 199,3 N', '≈ 89,3 N'],
    correctAnswer: 0,
    explanation: 'F² = 100² + 109² − 2 · 100 · 109 · cos 35° ⇒ F ≈ 63,4 N. (199,3 N a +2ab · cos előjelhibával, 89,3 N az apa erejének függőleges összetevője.)'
  },
  {
    id: 'tpe-q17',
    questionTypeBadge: 'Érettségi',
    figure: FIG.q17,
    level: 2,
    question: 'Érettségi (2013): AB = 48 mm, a D felezőpont, CD = 41 mm, ADC∠ = 47°. Mekkora az ABC háromszög területe?',
    options: ['≈ 719,7 mm²', '≈ 359,8 mm²', '984 mm²', '≈ 671,1 mm²'],
    correctAnswer: 0,
    explanation: 'Az ADC és a BDC háromszög területe egyenlő (sin 133° = sin 47°): T = 2 · ½ · 24 · 41 · sin 47° ≈ 719,7 mm².'
  },
  {
    id: 'tpe-q18',
    questionTypeBadge: 'Érettségi',
    figure: FIG.q18,
    level: 2,
    question: 'Ugyanebben a háromszögben (BC ≈ 60 mm) mekkora a B csúcsnál lévő szög?',
    options: ['≈ 30°', '≈ 47°', '≈ 60°', '≈ 103°'],
    correctAnswer: 0,
    explanation: 'A BCD háromszögben szinusztétellel: sin β = 41 · sin 133° / 60 ≈ 0,4997 ⇒ β ≈ 30°.'
  },
  {
    id: 'tpe-q19',
    questionTypeBadge: 'Erők eredője',
    figure: FIG.q19,
    level: 2,
    question: 'Két játékos egyszerre rúg a labdába: F₁ = 1500 N, F₂ = 2000 N, a két erő 120°-os szöget zár be. Mekkora az eredő?',
    options: ['≈ 1803 N', '3500 N', '500 N', '≈ 3041 N'],
    correctAnswer: 0,
    explanation: 'Az erőháromszögben a két erő közti szög 180° − 120° = 60°: R² = 1500² + 2000² − 2 · 1500 · 2000 · cos 60° ⇒ R ≈ 1803 N.'
  },
  {
    id: 'tpe-q20',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG.q20,
    level: 2,
    question: 'Tetőtér: a legalacsonyabb fal 1,6 m, a helyiség 4,2 m széles, a tető síkja 40°-os szöget zár be a vízszintessel. Milyen széles a tető alapja?',
    options: ['≈ 8,01 m', '≈ 6,11 m', '4,2 m', '≈ 5,8 m'],
    correctAnswer: 0,
    explanation: 'Mindkét oldalon 1,6 / tg 40° ≈ 1,91 m nyúlik túl a tető a falon: 4,2 + 2 · 1,91 ≈ 8,01 m.'
  },

  ...LEVEL2_EXTRA,

  // LEVEL 3: Tudáspróba II. és érettségi (21–30)
  {
    id: 'tpe-q21',
    questionTypeBadge: 'Területképlet',
    level: 3,
    question: 'Egy TOMPASZÖGŰ háromszög területe 6,65 dm², két oldala 4,62 dm és 3,08 dm. Mekkora a két oldal által közbezárt szög?',
    options: ['≈ 110,82°', '≈ 69,18°', '≈ 69,18° vagy ≈ 110,82°', '≈ 20,82°'],
    correctAnswer: 0,
    explanation: 'sin γ ≈ 0,9347 ⇒ 69,18° vagy 110,82°. A 69,18°-os esetben a háromszög hegyesszögű (c ≈ 4,55 dm), így csak a 110,82° felel meg.'
  },
  {
    id: 'tpe-q22',
    questionTypeBadge: 'Koszinusztétel',
    figure: FIG.q22,
    level: 3,
    question: 'Mekkora ennek a tompaszögű háromszögnek a harmadik oldala?',
    options: ['≈ 6,40 dm', '≈ 4,55 dm', '7,70 dm', '≈ 5,55 dm'],
    correctAnswer: 0,
    explanation: 'c² = 4,62² + 3,08² − 2 · 4,62 · 3,08 · cos 110,82° ≈ 40,94 ⇒ c ≈ 6,40 dm.'
  },
  {
    id: 'tpe-q23',
    questionTypeBadge: 'Térgeometria',
    figure: FIG.q23,
    level: 3,
    question: 'Négyzet alapú, 4,2 m magas gúla alakú tető oldallapjai 40°-os szöget zárnak be a vízszintessel. Mekkora az alapél?',
    options: ['≈ 10,01 m', '≈ 5,01 m', '≈ 7,05 m', '≈ 6,53 m'],
    correctAnswer: 0,
    explanation: 'Az oldallap magassága, a tetőmagasság és a fél alapél derékszögű háromszöget alkot: a/2 = 4,2 / tg 40° ≈ 5,01 m ⇒ a ≈ 10,01 m.'
  },
  {
    id: 'tpe-q24',
    questionTypeBadge: 'Térgeometria',
    level: 3,
    question: 'Hány m²-t kell cseréppel befedni ennél a gúla alakú tetőnél (a ≈ 10,01 m)?',
    options: ['≈ 130,8 m²', '≈ 100,2 m²', '≈ 65,4 m²', '≈ 261,6 m²'],
    correctAnswer: 0,
    explanation: 'Oldallap-magasság: 4,2 / sin 40° ≈ 6,53 m. Négy háromszög: 4 · ½ · 10,01 · 6,53 ≈ 130,8 m². (100,2 m² az alaplap.)'
  },
  {
    id: 'tpe-q25',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG.q25,
    level: 3,
    question: 'Két torony 60 könyökre áll egymástól; az 50 könyök magas a köztük lévő kúttól 69°-ban látszik. Milyen messze van a kút ettől a toronytól?',
    options: ['≈ 19,19 könyök', '≈ 130,25 könyök', '≈ 40,81 könyök', '≈ 17,92 könyök'],
    correctAnswer: 0,
    explanation: 'tg 69° = 50 / d ⇒ d = 50 / tg 69° ≈ 19,19 könyök. (40,81 könyök a másik torony távolsága.)'
  },
  {
    id: 'tpe-q26',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG.q26,
    level: 3,
    question: 'Ha a kút mindkét torony csúcsától egyenlő távolságra van, milyen magas a másik torony?',
    options: ['≈ 34,69 könyök', '50 könyök', '≈ 40,81 könyök', '≈ 53,56 könyök'],
    correctAnswer: 0,
    explanation: 'A kút és az első csúcs távolsága 50 / sin 69° ≈ 53,56. Pitagorasz: h = √(53,56² − 40,81²) ≈ 34,69 könyök.'
  },
  {
    id: 'tpe-q27',
    questionTypeBadge: 'Paralelogramma',
    figure: FIG.q27,
    level: 3,
    question: 'Egy paralelogramma 34 mm-es oldala a 38 mm-es átlóval 56°-os szöget zár be. Mekkora a másik oldal?',
    options: ['≈ 34 mm', '38 mm', '≈ 56,4 mm', '≈ 22,5 mm'],
    correctAnswer: 0,
    explanation: '√(34² + 38² − 2 · 34 · 38 · cos 56°) ≈ 33,99 ≈ 34 mm – a paralelogramma majdnem rombusz. (56,4 mm a másik átló.)'
  },
  {
    id: 'tpe-q28',
    questionTypeBadge: 'Érettségi',
    figure: FIG.q28,
    level: 3,
    question: 'Érettségi (2020): az ABCDE ötszögben AE = ED = DC = CB = 10 és A∠ = B∠ = D∠ = 120°. Mekkora a területe?',
    options: ['150', '100', '≈ 173,2', '125'],
    correctAnswer: 0,
    explanation: 'E∠ = C∠ = 90°, így T(AED) = T(BCD) = 50; AD = BD = 10√2, ADB∠ = 30°, T(ABD) = ½ · 200 · sin 30° = 50. Összesen 150.'
  },
  {
    id: 'tpe-q29',
    questionTypeBadge: 'Szabályos sokszög',
    level: 3,
    question: 'Dürer az 1 m sugarú körbe írt szabályos hétszög oldalát a beírt szabályos háromszög oldalának felével közelítette. Mekkorát tévedett?',
    options: ['≈ 1,7 mm-t (kb. 0,2%)', '≈ 1,7 cm-t', '≈ 17 cm-t', 'Semennyit, a két érték pontosan egyenlő'],
    correctAnswer: 0,
    explanation: '2 · sin(180°/7) ≈ 0,86777 m, √3 / 2 ≈ 0,86603 m; a különbség ≈ 0,00174 m ≈ 1,7 mm.'
  },
  {
    id: 'tpe-q30',
    questionTypeBadge: 'Sokszög területe',
    figure: FIG.q30,
    level: 3,
    question: 'A telek oldalai 22, 36, 24 és 33 m, a 22 m-es és a 33 m-es oldal szöge 98°; 130 m²-t nem kell füvesíteni. Mekkora területre kell fűmag?',
    options: ['≈ 661 m²', '≈ 791 m²', '≈ 359 m²', '≈ 921 m²'],
    correctAnswer: 0,
    explanation: 'Átló ≈ 42,13 m; a két háromszög ≈ 359,5 + 431,3 ≈ 790,8 m²; ebből 130 m² levonva ≈ 661 m².'
  },
  ...LEVEL3_EXTRA
];

export const TrigPracticeExamQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="trigonometria"
      topicId="g11-trig-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="16. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 tesztkérdés (3 × 30) 3 nehézségi szinten a teljes trigonometria fejezetből: szögfüggvények, szinusz- és koszinusztétel, területek, érettségi feladatok."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={TRIG_PRACTICE_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Szögfüggvények',
          items: [
            'sin α = szemközti / átfogó; cos α = melletti / átfogó; tg α = szemközti / melletti',
            'sin² α + cos² α = 1; tg α = sin α / cos α',
            'sin(180° − α) = sin α; cos(180° − α) = −cos α',
            'sin 90° = 1; cos 90° = 0'
          ]
        },
        {
          title: 'Tételek',
          items: [
            'Szinusztétel: a : b = sin α : sin β',
            'Koszinusztétel: c² = a² + b² − 2ab · cos γ',
            'Terület: T = a · b · sin γ / 2',
            'Szinuszból kapott szög: α vagy 180° − α – ellenőrizz!'
          ]
        },
        {
          title: 'Kör és sokszög',
          items: [
            'Körív: rπα / 180°; körcikk: r²πα / 360°',
            'Körszelet: körcikk − r² · sin α / 2',
            'Érintő merőleges az érintési ponthoz húzott sugárra',
            'Sokszög területe: bontás háromszögekre'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TrigPracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TrigPracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TrigPracticeExamQuiz;
