import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; h: number; children: React.ReactNode; className: string }> = ({ title, h, children, className }) => (
  <svg viewBox={`0 0 560 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

/** Görbe útvonala egy függvényhez a megadott leképezéssel. */
const curvePath = (f: (t: number) => number, t0: number, t1: number, toS: (t: number, y: number) => [number, number], steps = 160) => {
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = t0 + ((t1 - t0) * i) / steps;
    const [x, y] = toS(t, f(t));
    d += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d;
};

/** Kidolgozott feladat: m(t) = 500 · 0,83^t grafikonja, a felezések jelölésével. */
export const HalfLifeDrugSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const toS = (t: number, m: number): [number, number] => [70 + t * 38, 250 - m * 0.4];
  const T = 3.72;
  const marks = [
    { t: 0, m: 500 },
    { t: T, m: 250 },
    { t: 2 * T, m: 125 },
    { t: 3 * T, m: 62.5 }
  ];
  return (
    <Frame title="A lázcsillapító hatóanyaga: m(t) = 500 · 0,83ᵗ (mg)" h={290} className={className}>
      <line x1="70" y1="250" x2="535" y2="250" stroke="#64748b" strokeWidth="1.5" />
      <line x1="70" y1="250" x2="70" y2="40" stroke="#64748b" strokeWidth="1.5" />
      <text x="530" y="268" fontSize="11" fill="#334155">t (óra)</text>
      <text x="76" y="48" fontSize="11" fill="#334155">m (mg)</text>
      {[0, 2, 4, 6, 8, 10, 12].map((t) => (
        <text key={t} x={toS(t, 0)[0]} y="266" fontSize="10" textAnchor="middle" fill="#64748b">
          {t}
        </text>
      ))}
      {[100, 200, 300, 400, 500].map((m) => (
        <g key={m}>
          <line x1="70" y1={toS(0, m)[1]} x2="535" y2={toS(0, m)[1]} stroke="#e2e8f0" />
          <text x="62" y={toS(0, m)[1] + 4} fontSize="10" textAnchor="end" fill="#64748b">
            {m}
          </text>
        </g>
      ))}
      <path d={curvePath((t) => 500 * Math.pow(0.83, t), 0, 12, toS)} fill="none" stroke="#7c3aed" strokeWidth="3" />
      {marks.slice(1).map((p, i) => {
        const [x, y] = toS(p.t, p.m);
        return (
          <g key={i}>
            <line x1="70" y1={y} x2={x} y2={y} stroke="#db2777" strokeDasharray="4 3" />
            <line x1={x} y1={y} x2={x} y2="250" stroke="#db2777" strokeDasharray="4 3" />
            <circle cx={x} cy={y} r="4.5" fill="#db2777" />
            <text x={x + 6} y={y - 7} fontSize="11" fontWeight="bold" fill="#9d174d">
              {String(p.m).replace('.', ',')} mg
            </text>
          </g>
        );
      })}
      <circle cx={toS(0, 500)[0]} cy={toS(0, 500)[1]} r="4.5" fill="#7c3aed" />
      <text x="320" y="80" fontSize="12" fill="#334155">
        T ≈ 3,72 óra alatt mindig feleződik
      </text>
      <text x={toS(T, 0)[0]} y="282" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#9d174d">T</text>
      <text x={toS(2 * T, 0)[0]} y="282" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#9d174d">2T</text>
      <text x={toS(3 * T, 0)[0]} y="282" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#9d174d">3T</text>
    </Frame>
  );
};

/** Kidolgozott feladat: a 0,5 = 0,83^t egyenlet megoldása táblázatos közelítéssel. */
export const HalfLifeTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows: { title: string; ts: string[]; vs: string[]; hi: number }[] = [
    { title: '1. lépés: egész órák', ts: ['2', '3', '4'], vs: ['0,689', '0,572', '0,474'], hi: -1 },
    { title: '2. lépés: tizedek', ts: ['3,5', '3,6', '3,7', '3,8'], vs: ['0,521', '0,511', '0,502', '0,493'], hi: -1 },
    { title: '3. lépés: századok', ts: ['3,71', '3,72', '3,73'], vs: ['0,501', '0,500', '0,499'], hi: 1 }
  ];
  return (
    <Frame title="0,5 = 0,83ᵗ — keressük t-t egyre pontosabban" h={300} className={className}>
      {rows.map((r, ri) => {
        const y0 = 50 + ri * 82;
        return (
          <g key={ri}>
            <text x="25" y={y0 + 12} fontSize="12" fontWeight="bold" fill="#5b21b6">
              {r.title}
            </text>
            <rect x="25" y={y0 + 20} width="60" height="24" fill="#ede9fe" stroke="#a78bfa" />
            <rect x="25" y={y0 + 44} width="60" height="24" fill="#ede9fe" stroke="#a78bfa" />
            <text x="55" y={y0 + 37} fontSize="12" textAnchor="middle" fill="#0f172a">t</text>
            <text x="55" y={y0 + 61} fontSize="12" textAnchor="middle" fill="#0f172a">0,83ᵗ</text>
            {r.ts.map((t, i) => (
              <g key={i}>
                <rect x={85 + i * 80} y={y0 + 20} width="80" height="24" fill={i === r.hi ? '#fce7f3' : '#fff'} stroke="#a78bfa" />
                <rect x={85 + i * 80} y={y0 + 44} width="80" height="24" fill={i === r.hi ? '#fce7f3' : '#fff'} stroke="#a78bfa" />
                <text x={125 + i * 80} y={y0 + 37} fontSize="12" textAnchor="middle" fill="#0f172a">{t}</text>
                <text x={125 + i * 80} y={y0 + 61} fontSize="12" textAnchor="middle" fill="#0f172a">≈ {r.vs[i]}</text>
              </g>
            ))}
            <text x="425" y={y0 + 50} fontSize="11" fill="#475569">
              {ri === 0 ? '3 < t < 4' : ri === 1 ? '3,7 < t < 3,8' : 't ≈ 3,72 óra'}
            </text>
          </g>
        );
      })}
    </Frame>
  );
};

/** Elmélet: a felezési idő grafikonon (k, k/2, k/4, k/8 a t, t+T, t+2T, t+3T helyeken). */
export const HalfLifeGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const toS = (u: number, y: number): [number, number] => [60 + u * 42, 250 - y * 190];
  const f = (u: number) => Math.pow(0.5, (u - 1.5) / 2.2) * 0.8;
  const pts = [0, 1, 2, 3].map((k) => 1.5 + k * 2.2);
  const labels = ['t', 't + T', 't + 2T', 't + 3T'];
  const ylabels = ['k', 'k/2', 'k/4', 'k/8'];
  return (
    <Frame title="A felezési idő: T idő alatt a mennyiség mindig a felére csökken" h={300} className={className}>
      <line x1="60" y1="250" x2="535" y2="250" stroke="#64748b" strokeWidth="1.5" />
      <line x1="60" y1="250" x2="60" y2="40" stroke="#64748b" strokeWidth="1.5" />
      <text x="528" y="268" fontSize="12" fill="#334155">t</text>
      <text x="66" y="48" fontSize="12" fill="#334155">y</text>
      <path d={curvePath(f, 0, 11, toS)} fill="none" stroke="#7c3aed" strokeWidth="3" />
      {pts.map((u, i) => {
        const [x, y] = toS(u, f(u));
        return (
          <g key={i}>
            <line x1="60" y1={y} x2={x} y2={y} stroke="#db2777" strokeDasharray="4 3" />
            <line x1={x} y1={y} x2={x} y2="250" stroke="#db2777" strokeDasharray="4 3" />
            <circle cx={x} cy={y} r="4.5" fill="#db2777" />
            <text x={x} y="268" fontSize="11" textAnchor="middle" fill="#0f172a">{labels[i]}</text>
            <text x="54" y={y + 4} fontSize="11" textAnchor="end" fontWeight="bold" fill="#9d174d">{ylabels[i]}</text>
          </g>
        );
      })}
      {[0, 1, 2].map((i) => {
        const x1 = toS(pts[i], 0)[0];
        const x2 = toS(pts[i + 1], 0)[0];
        return (
          <g key={i}>
            <line x1={x1} y1="282" x2={x2} y2="282" stroke="#0f766e" strokeWidth="1.5" />
            <text x={(x1 + x2) / 2} y="278" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0f766e">T</text>
          </g>
        );
      })}
    </Frame>
  );
};

/** 4. feladat: a ¹⁴C izotóp bomlása (T = 5730 év). */
export const HalfLifeCarbonSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const steps = ['6 · 10¹²', '3 · 10¹²', '1,5 · 10¹²', '7,5 · 10¹¹', '3,75 · 10¹¹'];
  return (
    <Frame title="Radioaktív szén (¹⁴C): T = 5730 év" h={220} className={className}>
      {steps.map((s, i) => {
        const x = 30 + i * 106;
        const r = 34 * Math.pow(0.5, i / 2);
        return (
          <g key={i}>
            <circle cx={x + 40} cy="100" r={r} fill="#ddd6fe" stroke="#7c3aed" strokeWidth="2" />
            <text x={x + 40} y="160" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0f172a">{s}</text>
            <text x={x + 40} y="178" fontSize="10" textAnchor="middle" fill="#475569">
              {i === 0 ? 'kezdetben' : `${i} · 5730 év`}
            </text>
            {i < 4 && (
              <g>
                <line x1={x + 82} y1="100" x2={x + 102} y2="100" stroke="#db2777" strokeWidth="2" />
                <polygon points={`${x + 102},96 ${x + 108},100 ${x + 102},104`} fill="#db2777" />
                <text x={x + 93} y="88" fontSize="10" textAnchor="middle" fill="#9d174d">: 2</text>
              </g>
            )}
          </g>
        );
      })}
      <text x="280" y="204" fontSize="12" textAnchor="middle" fill="#334155">
        6 · 10¹² : 3,75 · 10¹¹ = 16 = 2⁴ ⇒ 4 felezési idő = 22 920 év
      </text>
    </Frame>
  );
};

/** Házi feladat 2.: a ¹³¹I (T ≈ 8 nap) és a ¹³⁷Cs (T ≈ 30 év) összehasonlítása. */
export const HalfLifeIsotopeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { name: 'Jód-131', T: 'T ≈ 8 nap', color: '#7c3aed', span: '8 nap' },
    { name: 'Cézium-137', T: 'T ≈ 30 év', color: '#0d9488', span: '30 év' }
  ];
  return (
    <Frame title="Fukushima (2011): két izotóp, két nagyon különböző felezési idő" h={240} className={className}>
      {rows.map((r, ri) => {
        const y = 60 + ri * 85;
        return (
          <g key={ri}>
            <text x="25" y={y + 20} fontSize="13" fontWeight="bold" fill={r.color}>{r.name}</text>
            <text x="25" y={y + 38} fontSize="11" fill="#475569">{r.T}</text>
            {[0, 1, 2, 3, 4, 5].map((k) => {
              const w = 50;
              const h = 50 * Math.pow(0.5, k);
              const x = 140 + k * 66;
              return (
                <g key={k}>
                  <rect x={x} y={y + 50 - h} width={w} height={h} fill={r.color} opacity={0.75} rx="3" />
                  <text x={x + w / 2} y={y + 64} fontSize="10" textAnchor="middle" fill="#334155">
                    {k === 0 ? '100%' : `${String(100 / Math.pow(2, k)).replace('.', ',')}%`}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
      <text x="280" y="228" fontSize="11" textAnchor="middle" fill="#334155">
        Minden oszlop egy felezési idővel később: 1 lépés = 8 nap (jód), illetve 30 év (cézium)
      </text>
    </Frame>
  );
};
