import React from 'react';
import { SUB20_FONT, TwentyFrameSubPart, NumberLine020SubPart } from './Sub20G2Parts';

// ---------------------------------------------------------------------------
// 5. Kivonás 20-as számkör – ábrák (2. osztály)
// ---------------------------------------------------------------------------

/** Visszalépés 10-re (14 − 4 = 10) és a 10 elvétele (16 − 10 = 6). */
export const ReachTenAndSubTenSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto'
}) => {
  const drawRow = (y: number, count: number, crossFrom: number, crossTo: number) => (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const cx = 24 + i * 19 + (i >= 10 ? 8 : 0);
        const taken = i >= crossFrom && i < crossTo;
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={y}
              r="7.5"
              fill={taken ? '#e2e8f0' : i < 10 ? '#0284c7' : '#f59e0b'}
              stroke={taken ? '#64748b' : i < 10 ? '#0c4a6e' : '#92400e'}
              strokeWidth="1.2"
            />
            {taken && (
              <g stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
                <line x1={cx - 5} y1={y - 5} x2={cx + 5} y2={y + 5} />
                <line x1={cx + 5} y1={y - 5} x2={cx - 5} y2={y + 5} />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );

  return (
    <svg viewBox="0 0 350 185" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
      <rect x="1" y="1" width="348" height="183" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
      <text x="175" y="23" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#0f172a">
        Elvétel 10-ig és 10 elvétele
      </text>

      {/* 14 - 4 = 10 */}
      <text x="20" y="47" fontSize="13" fontWeight="bold" fill="#0c4a6e">
        14 − 4 = 10 (az egyeseket vesszük el, marad a 10):
      </text>
      {drawRow(68, 14, 10, 14)}

      <line x1="18" y1="92" x2="332" y2="92" stroke="#bae6fd" strokeWidth="1.5" />

      {/* 16 - 10 = 6 */}
      <text x="20" y="114" fontSize="12.5" fontWeight="bold" fill="#92400e">
        16 − 10 = 6 (elvesszük a 10-et, marad 6 egyes):
      </text>
      {drawRow(136, 16, 0, 10)}

      <text x="175" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">
        14 − 4 = 10   |   16 − 10 = 6
      </text>
    </svg>
  );
};

/** Analógia tízesátlépés nélkül: 8 − 3 = 5 és 18 − 3 = 15. */
export const AnalogySubNoCrossSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto'
}) => {
  const r = 6.8;
  const dx = 16;
  return (
    <svg viewBox="0 0 350 165" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
      <rect x="1" y="1" width="348" height="163" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <text x="175" y="23" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">
        Tízesátlépés nélkül: a kistesó segít!
      </text>

      {/* 8 - 3 = 5 */}
      <text x="20" y="54" fontSize="14" fontWeight="bold" fill="#0f172a">
        8 − 3 = 5
      </text>
      {Array.from({ length: 8 }, (_, i) => {
        const cx = 198 + i * dx;
        const taken = i >= 5;
        return (
          <g key={`top${i}`}>
            <circle
              cx={cx}
              cy={49}
              r={r}
              fill={taken ? '#e2e8f0' : '#f59e0b'}
              stroke={taken ? '#64748b' : '#92400e'}
              strokeWidth="1.2"
            />
            {taken && (
              <g stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
                <line x1={cx - 4.5} y1={44.5} x2={cx + 4.5} y2={53.5} />
                <line x1={cx + 4.5} y1={44.5} x2={cx - 4.5} y2={53.5} />
              </g>
            )}
          </g>
        );
      })}

      {/* 18 - 3 = 15 */}
      <rect x="14" y="76" width="322" height="44" rx="8" fill="#ffffff" stroke="#86efac" strokeWidth="1.2" />
      <text x="24" y="103" fontSize="14" fontWeight="bold" fill="#0f172a">
        18 − 3 = 15
      </text>
      {/* 10 untouched discs */}
      {Array.from({ length: 10 }, (_, i) => (
        <circle
          key={`ten${i}`}
          cx={118 + (i % 5) * 14}
          cy={89 + Math.floor(i / 5) * 16}
          r={5.3}
          fill="#0284c7"
          stroke="#0c4a6e"
          strokeWidth="1"
        />
      ))}
      <rect x="190" y="82" width="136" height="32" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeDasharray="3 2" />
      {Array.from({ length: 8 }, (_, i) => {
        const cx = 198 + i * dx;
        const taken = i >= 5;
        return (
          <g key={`bot${i}`}>
            <circle
              cx={cx}
              cy={98}
              r={r}
              fill={taken ? '#e2e8f0' : '#f59e0b'}
              stroke={taken ? '#64748b' : '#92400e'}
              strokeWidth="1.2"
            />
            {taken && (
              <g stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
                <line x1={cx - 4.5} y1={93.5} x2={cx + 4.5} y2={102.5} />
                <line x1={cx + 4.5} y1={93.5} x2={cx - 4.5} y2={102.5} />
              </g>
            )}
          </g>
        );
      })}

      <text x="175" y="146" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#15803d">
        A 10 megmarad, csak a 8-ból veszünk el 3-at!
      </text>
    </svg>
  );
};

/** 2 × 10-es keret áthúzással: 14 − 7 = 14 − 4 − 3 = 7. */
export const BridgingDownTwentyFrameSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto'
}) => (
  <svg viewBox="0 0 340 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
    <rect x="1" y="1" width="338" height="188" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="170" y="23" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#9a3412">
      Tízesátlépés: előbb lépj vissza 10-re!
    </text>
    <TwentyFrameSubPart x={32} y={36} cell={26} total={14} crossed={7} highlightTenRow />
    <text x="312" y="54" fontSize="12" fontWeight="bold" fill="#0369a1">− 3</text>
    <text x="312" y="80" fontSize="12" fontWeight="bold" fill="#dc2626">− 4</text>

    {/* Decomposition */}
    <text x="170" y="118" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
      <tspan fill="#0c4a6e">14</tspan> − <tspan fill="#dc2626">7</tspan>
    </text>
    <line x1="184" y1="123" x2="160" y2="139" stroke="#dc2626" strokeWidth="1.8" />
    <line x1="190" y1="123" x2="212" y2="139" stroke="#dc2626" strokeWidth="1.8" />
    <text x="170" y="157" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
      <tspan fill="#0c4a6e">14</tspan> − <tspan fill="#16a34a">4</tspan> − <tspan fill="#dc2626">3</tspan> = 10 − 3 = 7
    </text>
    <text x="170" y="177" textAnchor="middle" fontSize="11.5" fill="#7c2d12">
      A 7-et 4-re és 3-ra bontottuk, mert 14 − 4 = 10.
    </text>
  </svg>
);

/** Három stratégia a 0–20-as számegyenesen: 17 − 13 = 4. */
export const ThreeStrategiesLineSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-lg h-auto mx-auto'
}) => {
  const X0 = 20;
  const X1 = 330;
  const rowY = [90, 186, 282];
  const strategies = [
    {
      title: '1. út: Előbb a 10-et, aztán a 3-at: 17 − 10 − 3 = 4',
      hops: [
        { from: 17, to: 7, label: '−10', color: '#0284c7', above: true, depth: 32 },
        { from: 7, to: 4, label: '−3', color: '#dc2626', above: true, depth: 24 }
      ],
      labels: [0, 4, 7, 10, 17, 20],
      dots: [
        { v: 17, color: '#0f172a' },
        { v: 7, color: '#0284c7' },
        { v: 4, color: '#16a34a', r: 5 }
      ]
    },
    {
      title: '2. út: Előbb a 3 egyest, aztán a 10-et: 17 − 3 − 10 = 4',
      hops: [
        { from: 17, to: 14, label: '−3', color: '#d97706', above: true, depth: 24 },
        { from: 14, to: 4, label: '−10', color: '#0284c7', above: true, depth: 32 }
      ],
      labels: [0, 4, 10, 14, 17, 20],
      dots: [
        { v: 17, color: '#0f172a' },
        { v: 14, color: '#d97706' },
        { v: 4, color: '#16a34a', r: 5 }
      ]
    },
    {
      title: '3. út: Előbb 10-re lépünk vissza: 17 − 7 − 6 = 4',
      hops: [
        { from: 17, to: 10, label: '−7', color: '#16a34a', above: true, depth: 28 },
        { from: 10, to: 4, label: '−6', color: '#7c3aed', above: true, depth: 28 }
      ],
      labels: [0, 4, 10, 17, 20],
      dots: [
        { v: 17, color: '#0f172a' },
        { v: 10, color: '#16a34a' },
        { v: 4, color: '#16a34a', r: 5 }
      ]
    }
  ];

  return (
    <svg viewBox="0 0 360 320" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
      <rect x="1" y="1" width="358" height="318" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="180" y="21" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        Kétjegyűből kétjegyű: 17 − 13 = 4 (3 ügyes út)
      </text>
      {strategies.map((s, idx) => (
        <g key={idx}>
          <text x="20" y={rowY[idx] - 46} fontSize="11.5" fontWeight="bold" fill="#334155">
            {s.title}
          </text>
          <NumberLine020SubPart
            x0={X0}
            x1={X1}
            y={rowY[idx]}
            labels={s.labels}
            hops={s.hops}
            dots={s.dots}
          />
        </g>
      ))}
    </svg>
  );
};

/** Sugaras 20-as kivonókerék (−2 .. −9). */
export const RadialTwentyWheelSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-sm h-auto mx-auto'
}) => {
  const cx = 150;
  const cy = 154;
  const items: { angle: number; sub: number; ans: string; unk?: boolean }[] = [
    { angle: -90, sub: 5, ans: '15' },
    { angle: -45, sub: 7, ans: '?', unk: true },
    { angle: 0, sub: 6, ans: '14' },
    { angle: 45, sub: 2, ans: '18' },
    { angle: 90, sub: 4, ans: '?', unk: true },
    { angle: 135, sub: 8, ans: '?', unk: true },
    { angle: 180, sub: 9, ans: '11' },
    { angle: -135, sub: 3, ans: '?', unk: true }
  ];
  return (
    <svg viewBox="0 0 300 280" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
      <rect x="1" y="1" width="298" height="278" rx="14" fill="#fefce8" stroke="#fde68a" />
      <text x="150" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">
        20-as kivonókerék (mennyi kerül a „?” helyére?)
      </text>
      {items.map((it) => {
        const rad = (it.angle * Math.PI) / 180;
        const rIn = 26;
        const rOut = 76;
        const rNode = 94;
        const x1 = cx + Math.cos(rad) * rIn;
        const y1 = cy + Math.sin(rad) * rIn;
        const x2 = cx + Math.cos(rad) * rOut;
        const y2 = cy + Math.sin(rad) * rOut;
        const nx = cx + Math.cos(rad) * rNode;
        const ny = cy + Math.sin(rad) * rNode;
        const lx = cx + Math.cos(rad) * 53 + (Math.abs(Math.cos(rad)) < 0.2 ? 19 : 0);
        const ly = cy + Math.sin(rad) * 53 + (Math.abs(Math.sin(rad)) < 0.2 ? -10 : -5);
        return (
          <g key={it.sub}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="1.8" />
            <circle
              cx={nx}
              cy={ny}
              r="16"
              fill={it.unk ? '#fee2e2' : '#ffffff'}
              stroke={it.unk ? '#dc2626' : '#0f172a'}
              strokeWidth="2"
            />
            <text
              x={nx}
              y={ny + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill={it.unk ? '#dc2626' : '#0f172a'}
            >
              {it.ans}
            </text>
            <rect x={lx - 14} y={ly - 9} width="28" height="16" rx="4" fill="#fefce8" />
            <text x={lx} y={ly + 3} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#b45309">
              −{it.sub}
            </text>
          </g>
        );
      })}
      <rect x={cx - 22} y={cy - 18} width="44" height="36" rx="8" fill="#facc15" stroke="#854d0e" strokeWidth="2.5" />
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">
        20
      </text>
    </svg>
  );
};

/** Műveletlánc és ellenőrzés összeadással: 16 −6 -> 10 −3 -> 7 +8 -> 15 −10 -> 5. */
export const ArrowChainSubSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto'
}) => {
  const nodes = [
    { x: 34, val: '16', unk: false },
    { x: 104, val: '10', unk: false },
    { x: 174, val: '7', unk: false },
    { x: 244, val: '15', unk: false },
    { x: 314, val: '?', unk: true }
  ];
  const ops = [
    { x: 69, label: '−6', color: '#dc2626' },
    { x: 139, label: '−3', color: '#dc2626' },
    { x: 209, label: '+8', color: '#16a34a' },
    { x: 279, label: '−10', color: '#dc2626' }
  ];
  return (
    <svg viewBox="0 0 350 135" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB20_FONT}>
      <rect x="1" y="1" width="348" height="133" rx="14" fill="#fdf4ff" stroke="#f5d0fe" />
      <text x="175" y="23" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6b21a8">
        Műveletlánc: lépj sorban balról jobbra!
      </text>
      {ops.map((op, i) => (
        <g key={i}>
          <path
            d={`M ${nodes[i].x + 16} 60 Q ${op.x} 40 ${nodes[i + 1].x - 18} 60`}
            fill="none"
            stroke={op.color}
            strokeWidth="2"
          />
          <path
            d={`M ${nodes[i + 1].x - 22} 54 L ${nodes[i + 1].x - 17} 61 L ${nodes[i + 1].x - 14} 53`}
            fill="none"
            stroke={op.color}
            strokeWidth="1.8"
          />
          <text x={op.x} y="43" textAnchor="middle" fontSize="12" fontWeight="bold" fill={op.color}>
            {op.label}
          </text>
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect
            x={n.x - 16}
            y="58"
            width="32"
            height="30"
            rx="6"
            fill={n.unk ? '#fee2e2' : '#ffffff'}
            stroke={n.unk ? '#dc2626' : '#7e22ce'}
            strokeWidth="2"
          />
          <text
            x={n.x}
            y="79"
            textAnchor="middle"
            fontSize="15"
            fontWeight="bold"
            fill={n.unk ? '#dc2626' : '#1e293b'}
          >
            {n.val}
          </text>
        </g>
      ))}
      <text x="175" y="114" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">
        15 − 10 = 5   |   Ellenőrzés: 5 + 10 = 15
      </text>
    </svg>
  );
};
