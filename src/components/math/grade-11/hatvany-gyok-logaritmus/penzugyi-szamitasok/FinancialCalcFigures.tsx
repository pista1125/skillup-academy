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

const hu = (x: number, d = 0) => x.toFixed(d).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Bevezető: 500 000 Ft évi 6%-os kamatos kamatra 10 évig – oszlopdiagram a duplázódási szinttel. */
export const FinancialCalcCompoundSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 60;
  const y0 = 250;
  const sc = 180 / 1_000_000;
  const bw = 34;
  return (
    <Frame title="500 000 Ft évi 6%-os kamatos kamattal, 10 éven át" h={300} className={className}>
      <line x1={x0} y1={y0} x2="540" y2={y0} stroke="#64748b" strokeWidth="1.5" />
      <line x1={x0} y1={y0} x2={x0} y2="50" stroke="#64748b" strokeWidth="1.5" />
      <line x1={x0} y1={y0 - 1_000_000 * sc} x2="540" y2={y0 - 1_000_000 * sc} stroke="#e11d48" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="536" y={y0 - 1_000_000 * sc - 6} fontSize="11" textAnchor="end" fill="#e11d48" fontWeight="bold">
        1 000 000 Ft (a tőke kétszerese)
      </text>
      {Array.from({ length: 11 }, (_, n) => {
        const v = 500000 * Math.pow(1.06, n);
        const x = x0 + 12 + n * 42;
        const h = v * sc;
        return (
          <g key={n}>
            <rect x={x} y={y0 - h} width={bw} height={h} rx="3" fill={n === 10 ? '#7c3aed' : '#c4b5fd'} />
            <text x={x + bw / 2} y={y0 + 14} fontSize="10" textAnchor="middle" fill="#475569">
              {n}
            </text>
            {(n === 0 || n === 5 || n === 10) && (
              <text x={x + bw / 2} y={y0 - h - 5} fontSize="10" textAnchor="middle" fill="#4c1d95" fontWeight="bold">
                {hu(v / 1000)} e
              </text>
            )}
          </g>
        );
      })}
      <text x="300" y="282" fontSize="11" textAnchor="middle" fill="#475569">
        eltelt évek száma (n) — minden év végén ×1,06
      </text>
      <text x={x0 - 6} y={y0 - 500000 * sc + 4} fontSize="10" textAnchor="end" fill="#475569">
        500 e
      </text>
    </Frame>
  );
};

/** A kamatos kamat képlete, a részek megnevezésével. */
export const FinancialCalcFormulaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="A kamatos kamat képlete" h={220} className={className}>
    <text x="280" y="115" fontSize="40" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontFamily="serif">
      Aₙ = A · (1 + p/100)ⁿ
    </text>
    <line x1="140" y1="125" x2="110" y2="160" stroke="#7c3aed" />
    <text x="105" y="176" fontSize="12" textAnchor="middle" fill="#7c3aed" fontWeight="bold">
      n év múlva
    </text>
    <text x="105" y="191" fontSize="11" textAnchor="middle" fill="#7c3aed">
      felnövekedett összeg
    </text>
    <line x1="213" y1="125" x2="210" y2="160" stroke="#0369a1" />
    <text x="210" y="176" fontSize="12" textAnchor="middle" fill="#0369a1" fontWeight="bold">
      A: tőke
    </text>
    <text x="210" y="191" fontSize="11" textAnchor="middle" fill="#0369a1">
      (kezdő összeg)
    </text>
    <line x1="330" y1="125" x2="335" y2="160" stroke="#be185d" />
    <text x="335" y="176" fontSize="12" textAnchor="middle" fill="#be185d" fontWeight="bold">
      p: kamatláb (%)
    </text>
    <text x="335" y="191" fontSize="11" textAnchor="middle" fill="#be185d">
      1 + p/100: évi szorzó
    </text>
    <line x1="420" y1="78" x2="465" y2="60" stroke="#059669" />
    <text x="470" y="58" fontSize="12" fill="#059669" fontWeight="bold">
      n: évek
    </text>
    <text x="470" y="72" fontSize="11" fill="#059669">
      (ciklusok) száma
    </text>
  </Frame>
);

/** Kidolgozott 2. feladat: 1,06ⁿ = 2 megoldása próbálgatással. */
export const FinancialCalcDoublingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const xs = (v: number) => 60 + (v - 1.7) * (440 / 0.4);
  const marks = [
    { n: 10, v: Math.pow(1.06, 10) },
    { n: 11, v: Math.pow(1.06, 11) },
    { n: 12, v: Math.pow(1.06, 12) }
  ];
  return (
    <Frame title="Mikor duplázódik meg? 1,06ˣ = 2 próbálgatással" h={210} className={className}>
      <line x1="50" y1="110" x2="520" y2="110" stroke="#334155" strokeWidth="2" />
      {[1.7, 1.8, 1.9, 2.0, 2.1].map((t) => (
        <g key={t}>
          <line x1={xs(t)} y1="104" x2={xs(t)} y2="116" stroke="#334155" />
          <text x={xs(t)} y="134" fontSize="11" textAnchor="middle" fill="#475569">
            {t.toFixed(1).replace('.', ',')}
          </text>
        </g>
      ))}
      <line x1={xs(2)} y1="55" x2={xs(2)} y2="150" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 4" />
      <text x={xs(2)} y="168" fontSize="12" textAnchor="middle" fill="#e11d48" fontWeight="bold">
        kétszeres
      </text>
      {marks.map((m) => (
        <g key={m.n}>
          <circle cx={xs(m.v)} cy="110" r="6" fill={m.v >= 2 ? '#059669' : '#7c3aed'} />
          <text x={xs(m.v)} y="80" fontSize="12" textAnchor="middle" fontWeight="bold" fill={m.v >= 2 ? '#059669' : '#7c3aed'}>
            1,06{m.n === 10 ? '¹⁰' : m.n === 11 ? '¹¹' : '¹²'}
          </text>
          <text x={xs(m.v)} y="95" fontSize="11" textAnchor="middle" fill="#334155">
            ≈ {m.v.toFixed(3).replace('.', ',')}
          </text>
        </g>
      ))}
      <text x="280" y="192" fontSize="12" textAnchor="middle" fill="#0f172a">
        11 év alatt még nem, 12 év alatt már több mint duplájára nő a tőke.
      </text>
    </Frame>
  );
};

/** Egyszerű kamat és kamatos kamat összehasonlítása (100 000 Ft, 10%). */
export const FinancialCalcSimpleVsCompoundSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (n: number) => 70 + n * 23;
  const Y = (v: number) => 250 - (v / 700000) * 200;
  let comp = '';
  let simp = '';
  for (let n = 0; n <= 20; n++) {
    comp += `${n === 0 ? 'M' : 'L'} ${X(n)} ${Y(100000 * Math.pow(1.1, n)).toFixed(1)} `;
    simp += `${n === 0 ? 'M' : 'L'} ${X(n)} ${Y(100000 * (1 + 0.1 * n)).toFixed(1)} `;
  }
  return (
    <Frame title="Egyszerű kamat vagy kamatos kamat? (100 000 Ft, évi 10%)" h={290} className={className}>
      <line x1="70" y1="250" x2="540" y2="250" stroke="#64748b" strokeWidth="1.5" />
      <line x1="70" y1="250" x2="70" y2="45" stroke="#64748b" strokeWidth="1.5" />
      {[0, 5, 10, 15, 20].map((n) => (
        <text key={n} x={X(n)} y="266" fontSize="10" textAnchor="middle" fill="#475569">
          {n}
        </text>
      ))}
      {[200000, 400000, 600000].map((v) => (
        <g key={v}>
          <line x1="70" y1={Y(v)} x2="540" y2={Y(v)} stroke="#e2e8f0" />
          <text x="64" y={Y(v) + 4} fontSize="10" textAnchor="end" fill="#475569">
            {v / 1000} e
          </text>
        </g>
      ))}
      <path d={simp} fill="none" stroke="#0ea5e9" strokeWidth="2.5" />
      <path d={comp} fill="none" stroke="#7c3aed" strokeWidth="3" />
      <text x={X(20) - 4} y={Y(100000 * Math.pow(1.1, 20)) - 8} fontSize="11" textAnchor="end" fill="#7c3aed" fontWeight="bold">
        kamatos: 100 000 · 1,1ⁿ (exponenciális)
      </text>
      <text x={X(20) - 4} y={Y(300000) + 16} fontSize="11" textAnchor="end" fill="#0369a1" fontWeight="bold">
        egyszerű: 100 000 · (1 + 0,1n) (lineáris)
      </text>
      <text x="305" y="284" fontSize="11" textAnchor="middle" fill="#475569">
        évek száma
      </text>
    </Frame>
  );
};

/** 4. feladat: az autó értékcsökkenése évi 20%-kal. */
export const FinancialCalcDepreciationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const vals = [3.5, 2.8, 2.24, 1.792];
  const Y = (v: number) => 230 - v * 50;
  return (
    <Frame title="Az autó értéke évente az előző évi érték 80%-a" h={280} className={className}>
      <line x1="60" y1="230" x2="530" y2="230" stroke="#64748b" strokeWidth="1.5" />
      {vals.map((v, i) => {
        const x = 90 + i * 115;
        return (
          <g key={i}>
            <rect x={x} y={Y(v)} width="60" height={230 - Y(v)} rx="4" fill={i === 0 ? '#7c3aed' : '#ddd6fe'} stroke="#6d28d9" />
            <text x={x + 30} y={Y(v) - 8} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">
              {v.toString().replace('.', ',')} M Ft
            </text>
            <text x={x + 30} y="248" fontSize="11" textAnchor="middle" fill="#475569">
              {i === 0 ? 'új' : `${i}. év után`}
            </text>
            {i > 0 && (
              <text x={x - 27} y={Y(vals[i - 1]) + 30} fontSize="11" textAnchor="middle" fill="#be185d" fontWeight="bold">
                ×0,8
              </text>
            )}
          </g>
        );
      })}
      <text x="280" y="268" fontSize="12" textAnchor="middle" fill="#0f172a">
        3 év alatt: 3,5 · 0,8³ = 1,792 M Ft marad, a veszteség 1,708 M Ft.
      </text>
    </Frame>
  );
};
