import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const INK = '#0f172a';
const MUTED = '#475569';
const HIT = '#059669';
const MISS = '#e11d48';

/** Kis kör „siker” (zöld pipa) vagy „kudarc” (piros x) jellel. */
const Mark: React.FC<{ x: number; y: number; ok: boolean; r?: number }> = ({ x, y, ok, r = 13 }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={ok ? '#d1fae5' : '#ffe4e6'} stroke={ok ? HIT : MISS} strokeWidth="1.8" />
    {ok ? (
      <path d={`M ${x - r * 0.45} ${y} L ${x - r * 0.1} ${y + r * 0.38} L ${x + r * 0.5} ${y - r * 0.4}`} fill="none" stroke={HIT} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d={`M ${x - r * 0.38} ${y - r * 0.38} L ${x + r * 0.38} ${y + r * 0.38} M ${x + r * 0.38} ${y - r * 0.38} L ${x - r * 0.38} ${y + r * 0.38}`} stroke={MISS} strokeWidth="2.4" strokeLinecap="round" />
    )}
  </g>
);

// 1. ábra: Özséb két tizenegyese – a négy lehetséges kimenetel és valószínűségük
export const RepeatedTrialsPenaltySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows: { a: boolean; b: boolean; calc: string; p: string; group: string; color: string }[] = [
    { a: true, b: true, calc: '0,7 · 0,7', p: '0,49', group: 'mindkettő bemegy', color: '#047857' },
    { a: true, b: false, calc: '0,7 · 0,3', p: '0,21', group: 'egyik bemegy,', color: '#b45309' },
    { a: false, b: true, calc: '0,3 · 0,7', p: '0,21', group: 'a másik nem: 0,42', color: '#b45309' },
    { a: false, b: false, calc: '0,3 · 0,3', p: '0,09', group: 'egyik sem megy be', color: '#be123c' }
  ];
  return (
    <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Özséb két tizenegyese (egy rúgás: bemegy 0,7, nem megy be 0,3)
      </text>
      <text x="95" y="58" fontSize="11" textAnchor="middle" fill={MUTED}>
        1. rúgás
      </text>
      <text x="165" y="58" fontSize="11" textAnchor="middle" fill={MUTED}>
        2. rúgás
      </text>
      <text x="300" y="58" fontSize="11" textAnchor="middle" fill={MUTED}>
        valószínűség
      </text>
      {rows.map((r, i) => {
        const y = 85 + i * 46;
        return (
          <g key={i}>
            <rect x="40" y={y - 20} width="520" height="40" rx="8" fill={i % 2 ? '#ffffff' : '#f1f5f9'} />
            <Mark x={95} y={y} ok={r.a} />
            <Mark x={165} y={y} ok={r.b} />
            <text x="300" y={y + 5} fontSize="14" textAnchor="middle" fill={INK} fontFamily="monospace">
              {r.calc} = {r.p}
            </text>
            <text x="470" y={y + 5} fontSize="12" fontWeight="bold" textAnchor="middle" fill={r.color}>
              {r.group}
            </text>
          </g>
        );
      })}
      <path d="M 395 133 L 402 133 L 402 177 L 395 177" fill="none" stroke="#b45309" strokeWidth="1.5" />
      <text x="300" y="282" fontSize="12" textAnchor="middle" fill={MUTED}>
        Ellenőrzés: 0,49 + 0,42 + 0,09 = 1 – minden lehetőséget pontosan egyszer számoltunk.
      </text>
    </svg>
  );
};

// 2. ábra: n kísérlet lánca – „mindegyik sikeres” és „csak az első sikeres”
export const RepeatedTrialsChainSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const xs = [70, 150, 230, 340];
  const Row: React.FC<{ y: number; first: boolean; rest: boolean; labels: string[]; result: React.ReactNode; title: string }> = ({ y, first, rest, labels, result, title }) => (
    <g>
      <text x="30" y={y - 30} fontSize="12" fontWeight="bold" fill="#0c4a6e">
        {title}
      </text>
      {xs.map((x, i) => (
        <g key={i}>
          <Mark x={x} y={y} ok={i === 0 ? first : rest} />
          <text x={x} y={y + 30} fontSize="13" textAnchor="middle" fill={INK} fontFamily="monospace">
            {labels[i]}
          </text>
          {i < xs.length - 1 && (
            <text x={i === 2 ? (x + xs[i + 1]) / 2 : (x + xs[i + 1]) / 2} y={y + 5} fontSize="14" textAnchor="middle" fill={MUTED}>
              {i === 2 ? '· … ·' : '·'}
            </text>
          )}
        </g>
      ))}
      <text x="285" y={y - 20} fontSize="10" textAnchor="middle" fill={MUTED}>
        n darab kísérlet
      </text>
      <text x="410" y={y + 5} fontSize="16" fill={INK}>
        =
      </text>
      <text x="435" y={y + 6} fontSize="17" fontWeight="bold" fill="#0369a1" fontFamily="monospace">
        {result}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 600 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <Row
        y={75}
        first
        rest
        title="Minden alkalommal bekövetkezik"
        labels={['p', 'p', 'p', 'p']}
        result={
          <>
            p<tspan dy="-7" fontSize="12">n</tspan>
          </>
        }
      />
      <Row
        y={185}
        first
        rest={false}
        title="Csak az első alkalommal következik be"
        labels={['p', '1 − p', '1 − p', '1 − p']}
        result={
          <>
            p · (1 − p)<tspan dy="-7" fontSize="12">n − 1</tspan>
          </>
        }
      />
    </svg>
  );
};

// 3. ábra: pontosan egyszer – n egyenlően valószínű elrendezés
export const RepeatedTrialsExactlyOnceSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const n = 5;
  return (
    <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Pontosan egyszer következik be (n = 5): a siker 5 helyen állhat
      </text>
      {Array.from({ length: n }, (_, row) => {
        const y = 60 + row * 44;
        return (
          <g key={row}>
            <text x="40" y={y + 5} fontSize="12" fill={MUTED}>
              {row + 1}.
            </text>
            {Array.from({ length: n }, (_, col) => (
              <Mark key={col} x={80 + col * 40} y={y} ok={col === row} r={12} />
            ))}
            <text x="290" y={y + 5} fontSize="12.5" fill={INK} fontFamily="monospace">
              p · (1 − p)
              <tspan dy="-6" fontSize="10">
                4
              </tspan>
            </text>
            {row < n - 1 && (
              <text x="400" y={y + 27} fontSize="11" fill={MUTED}>
                vagy
              </text>
            )}
          </g>
        );
      })}
      <rect x="430" y="110" width="150" height="80" rx="12" fill="#e0f2fe" stroke="#0284c7" />
      <text x="505" y="138" fontSize="11" textAnchor="middle" fill="#0c4a6e">
        egyenlő valószínűségek,
      </text>
      <text x="505" y="153" fontSize="11" textAnchor="middle" fill="#0c4a6e">
        ezért összeadva:
      </text>
      <text x="505" y="177" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0369a1" fontFamily="monospace">
        5 · p · (1 − p)
        <tspan dy="-6" fontSize="10">
          4
        </tspan>
      </text>
    </svg>
  );
};

// 4. ábra: a Ráadás irányított fagráfja – a kígyó 0,8 valószínűséggel mar, háromszor
export const RepeatedTrialsSnakeTreeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const levelY = [40, 105, 170, 235];
  const leafX = Array.from({ length: 8 }, (_, i) => 45 + i * 73);
  // node x positions per level
  const xsAt = (lvl: number): number[] => {
    if (lvl === 3) return leafX;
    const below = xsAt(lvl + 1);
    return Array.from({ length: below.length / 2 }, (_, i) => (below[2 * i] + below[2 * i + 1]) / 2);
  };
  const levels = [0, 1, 2, 3].map(xsAt);
  const leafLabels = ['0,8³', '0,8² · 0,2', '0,8² · 0,2', '0,8 · 0,2²', '0,8² · 0,2', '0,8 · 0,2²', '0,8 · 0,2²', '0,2³'];
  const bites = [3, 2, 2, 1, 2, 1, 1, 0];
  const biteColor = ['#be123c', '#c2410c', '#b45309', '#047857'];
  return (
    <svg viewBox="0 0 600 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {[0, 1, 2].map((lvl) =>
        levels[lvl].map((x, i) => {
          const l = levels[lvl + 1][2 * i];
          const r = levels[lvl + 1][2 * i + 1];
          return (
            <g key={`${lvl}-${i}`}>
              <line x1={x} y1={levelY[lvl]} x2={l} y2={levelY[lvl + 1]} stroke={MISS} strokeWidth="1.6" />
              <line x1={x} y1={levelY[lvl]} x2={r} y2={levelY[lvl + 1]} stroke={HIT} strokeWidth="1.6" />
              <text x={(x + l) / 2 - 8} y={(levelY[lvl] + levelY[lvl + 1]) / 2} fontSize="10" textAnchor="end" fill={MISS}>
                0,8
              </text>
              <text x={(x + r) / 2 + 8} y={(levelY[lvl] + levelY[lvl + 1]) / 2} fontSize="10" fill={HIT}>
                0,2
              </text>
            </g>
          );
        })
      )}
      {levels.map((xs, lvl) =>
        xs.map((x, i) => <circle key={`n${lvl}-${i}`} cx={x} cy={levelY[lvl]} r="5" fill={lvl === 0 ? '#0369a1' : i % 2 === 0 ? MISS : HIT} />)
      )}
      <text x={levels[0][0] + 12} y={levelY[0] + 4} fontSize="11" fill={MUTED}>
        start
      </text>
      {leafX.map((x, i) => (
        <g key={`leaf${i}`}>
          <text x={x} y="258" fontSize="10" textAnchor="middle" fill={INK} fontFamily="monospace">
            {leafLabels[i]}
          </text>
          <text x={x} y="277" fontSize="11" fontWeight="bold" textAnchor="middle" fill={biteColor[3 - bites[i]]}>
            {bites[i]} marás
          </text>
        </g>
      ))}
      <text x="560" y="40" fontSize="10" textAnchor="end" fill={MISS}>
        piros él: megmarja (0,8)
      </text>
      <text x="560" y="55" fontSize="10" textAnchor="end" fill={HIT}>
        zöld él: nem marja meg (0,2)
      </text>
    </svg>
  );
};

/** Kis dobókocka (pöttyökkel); n = 0 esetén „nem hatos” felirat. */
const PIPS: Record<number, [number, number][]> = {
  6: [[0.27, 0.25], [0.73, 0.25], [0.27, 0.5], [0.73, 0.5], [0.27, 0.75], [0.73, 0.75]]
};

// 5. ábra: az ötödik dobás az első hatos
export const RepeatedTrialsFirstSixSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 54;
  const xs = [40, 145, 250, 355, 460];
  return (
    <svg viewBox="0 0 600 220" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Csak az ötödik dobásra dobunk hatost
      </text>
      {xs.map((x, i) => {
        const six = i === 4;
        return (
          <g key={i}>
            <rect x={x} y="50" width={s} height={s} rx="10" fill={six ? '#d1fae5' : '#ffe4e6'} stroke={six ? HIT : MISS} strokeWidth="2" />
            {six ? (
              PIPS[6].map(([a, b], j) => <circle key={j} cx={x + a * s} cy={50 + b * s} r={s * 0.08} fill={INK} />)
            ) : (
              <text x={x + s / 2} y={50 + s / 2 + 5} fontSize="12" fontWeight="bold" textAnchor="middle" fill={MISS}>
                nem 6
              </text>
            )}
            <text x={x + s / 2} y="125" fontSize="11" textAnchor="middle" fill={MUTED}>
              {i + 1}. dobás
            </text>
            <text x={x + s / 2} y="148" fontSize="15" fontWeight="bold" textAnchor="middle" fill={six ? HIT : MISS} fontFamily="monospace">
              {six ? '1/6' : '5/6'}
            </text>
            {i < 4 && (
              <text x={x + s + 25} y="82" fontSize="18" textAnchor="middle" fill={MUTED}>
                ·
              </text>
            )}
          </g>
        );
      })}
      <text x="300" y="190" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#0369a1" fontFamily="monospace">
        (5/6)
        <tspan dy="-7" fontSize="11">
          4
        </tspan>
        <tspan dy="7"> · 1/6 = 625/7776 ≈ 0,0804</tspan>
      </text>
    </svg>
  );
};
