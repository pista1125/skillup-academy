import React from 'react';
import { SeqPlot, RightMark, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_INK } from './seqKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={S_INK}>
      {title}
    </text>
    {children}
  </svg>
);

type P = [number, number];
const mid = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const unit = (from: P, to: P): P => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const l = Math.hypot(dx, dy) || 1;
  return [dx / l, dy / l];
};

/** Egymásba írt négyzetek: minden négyzet csúcsai az előző oldalfelező pontjai. */
export const nestedSquares = (sq: P[], count: number): P[][] => {
  const out: P[][] = [sq];
  for (let i = 1; i < count; i++) {
    const s = out[i - 1];
    out.push([mid(s[0], s[1]), mid(s[1], s[2]), mid(s[2], s[3]), mid(s[3], s[0])]);
  }
  return out;
};

const SQ_COLORS = ['#dbeafe', '#e0e7ff', '#ede9fe', '#fae8ff', '#fce7f3', '#ffe4e6'];

// 1. ábra: egymásba írt négyzetek, Pitagorasz a sarokháromszögben
export const NestedSquaresSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A: P = [60, 270];
  const B: P = [260, 270];
  const C: P = [260, 70];
  const D: P = [60, 70];
  const sqs = nestedSquares([A, B, C, D], 4);
  const s2 = sqs[1];
  return (
    <Frame title="Egymásba írt négyzetek (a₁ = 8 cm)" className={className} h={300}>
      {sqs.map((s, i) => (
        <polygon key={i} points={s.map((p) => p.join(',')).join(' ')} fill={SQ_COLORS[i]} stroke={i === 0 ? S_INK : S_PURPLE} strokeWidth={i === 0 ? 2 : 1.4} />
      ))}
      {/* a sarokháromszög: A, AB felezőpontja, AD felezőpontja */}
      <polygon points={[A, s2[0], s2[3]].map((p) => p.join(',')).join(' ')} fill="#fde68a" fillOpacity="0.7" stroke={S_RED} strokeWidth="1.6" />
      <RightMark v={A} u1={unit(A, B)} u2={unit(A, D)} r={13} color={S_RED} />
      <text x="160" y="290" fontSize="11.5" textAnchor="middle" fill={S_INK}>
        8 cm
      </text>
      <text x="96" y="262" fontSize="10.5" textAnchor="middle" fill={S_RED}>
        a₁/2
      </text>
      <text x="50" y="236" fontSize="10.5" textAnchor="end" fill={S_RED}>
        a₁/2
      </text>
      <text x="96" y="222" fontSize="11" fill={S_PURPLE} fontWeight="bold">
        a₂
      </text>
      <text x="290" y="96" fontSize="12" fill={S_INK}>
        a₂² = (a₁/2)² + (a₁/2)² = a₁²/2
      </text>
      <text x="290" y="120" fontSize="12" fill={S_INK}>
        a₂ = a₁/√2, arány: m = 1/√2
      </text>
      <text x="290" y="160" fontSize="11.5" fill={S_BLUE}>
        oldal, kerület: · 1/√2
      </text>
      <text x="290" y="182" fontSize="11.5" fill={S_GREEN}>
        terület: · 1/2 (= m²)
      </text>
      <text x="290" y="222" fontSize="11.5" fill={S_INK}>
        a₄ = 2√2 ≈ 2,83 cm
      </text>
      <text x="290" y="244" fontSize="11.5" fill={S_INK}>
        K₄ = 8√2 ≈ 11,31 cm, T₄ = 8 cm²
      </text>
    </Frame>
  );
};

// 2. ábra: a mértani sorozat – minden lépés ·q
export const GeometricChainSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const labels = ['a₁', 'a₂', 'a₃', 'a₄', 'a₅', 'a₆', 'a₇'];
  return (
    <Frame title="Mértani sorozat: aₙ/aₙ₋₁ = q (n ≥ 2), q ≠ 0" className={className} h={210}>
      {labels.map((l, i) => {
        const x = 34 + i * 62;
        return (
          <g key={l}>
            <rect x={x} y="96" width="44" height="32" rx="8" fill="#f5f3ff" stroke={S_PURPLE} strokeWidth="1.6" />
            <text x={x + 22} y="117" fontSize="14" textAnchor="middle" fontWeight="bold" fill={S_INK}>
              {l}
            </text>
            {i < labels.length - 1 && (
              <g>
                <path d={`M ${x + 26} 92 Q ${x + 53} 64 ${x + 80} 92`} fill="none" stroke={S_RED} strokeWidth="1.6" />
                <path d={`M ${x + 80} 92 l -7 -2 m 7 2 l -3 -6.5`} fill="none" stroke={S_RED} strokeWidth="1.6" />
                <text x={x + 53} y="70" fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_RED}>
                  ·q
                </text>
              </g>
            )}
          </g>
        );
      })}
      <path d="M 56 140 L 56 150 L 428 150 L 428 140" fill="none" stroke={S_BLUE} strokeWidth="1.4" />
      <text x="242" y="170" fontSize="12" textAnchor="middle" fill={S_BLUE}>
        a₁-től aₙ-ig (n − 1) szorzás: aₙ = a₁ · qⁿ⁻¹
      </text>
      <text x="242" y="192" fontSize="11" textAnchor="middle" fill="#475569">
        Egyik tag és a kvóciens sem lehet 0.
      </text>
    </Frame>
  );
};

// 3. ábra: a kvóciens hatása (q > 1, 0 < q < 1, q < 0)
export const QuotientTypesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cases = [
    { t: 'q = 1,5 (a₁ = 1): növő', v: Array.from({ length: 7 }, (_, i) => 1.5 ** i), c: S_BLUE },
    { t: 'q = 0,5 (a₁ = 8): csökkenő', v: Array.from({ length: 7 }, (_, i) => 8 * 0.5 ** i), c: S_GREEN },
    { t: 'q = −2 (a₁ = 1): váltakozó', v: Array.from({ length: 7 }, (_, i) => (-2) ** i), c: S_RED }
  ];
  return (
    <Frame title="A kvóciens előjele és nagysága dönt" className={className} h={210}>
      {cases.map((cs, i) => (
        <svg key={cs.t} x={12 + i * 152} y="36" width="152" height="150" viewBox="0 0 220 190">
          <SeqPlot values={cs.v} color={cs.c} className="" w={220} h={190} />
        </svg>
      ))}
      {cases.map((cs, i) => (
        <text key={`l${i}`} x={88 + i * 152} y="198" fontSize="10.5" textAnchor="middle" fill={cs.c} fontWeight="bold">
          {cs.t}
        </text>
      ))}
    </Frame>
  );
};

// 4. ábra: két tagból két megoldás
export const TwoSolutionsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const row = (y: number, mid: string, q: string, c: string) => (
    <g>
      {['a₁₂ = 10', mid, 'a₁₄ = 40'].map((t, i) => (
        <g key={i}>
          <rect x={70 + i * 130} y={y} width="90" height="30" rx="8" fill={i === 1 ? '#fef3c7' : '#eff6ff'} stroke={c} strokeWidth="1.5" />
          <text x={115 + i * 130} y={y + 20} fontSize="12.5" textAnchor="middle" fontWeight="bold" fill={S_INK}>
            {t}
          </text>
          {i < 2 && (
            <text x={175 + i * 130} y={y - 6} fontSize="12" textAnchor="middle" fill={c} fontWeight="bold">
              {q}
            </text>
          )}
        </g>
      ))}
    </g>
  );
  return (
    <Frame title="a₁₄/a₁₂ = q² = 4 ⇒ q = 2 vagy q = −2" className={className} h={210}>
      {row(66, 'a₁₃ = 20', '·2', S_BLUE)}
      {row(140, 'a₁₃ = −20', '·(−2)', S_RED)}
      <text x="240" y="196" fontSize="11.5" textAnchor="middle" fill="#475569">
        Ha a két ismert tag sorszámának különbsége páros, két megoldás is lehet.
      </text>
    </Frame>
  );
};

// 5. ábra: a faállomány csökkenése évi 2%-kal
export const ForestDeclineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const years = Array.from({ length: 16 }, (_, i) => 2005 + i);
  const val = (y: number) => 12000 * 0.98 ** (y - 2010);
  const X = (y: number) => 60 + (y - 2005) * 25.5;
  const Y = (v: number) => 250 - ((v - 9000) / 5000) * 190;
  return (
    <Frame title="Faállomány: évente az előző év 98%-a (2010: 12 000 m³)" className={className} h={290}>
      {[9000, 10000, 11000, 12000, 13000, 14000].map((v) => (
        <g key={v}>
          <line x1="56" x2="450" y1={Y(v)} y2={Y(v)} stroke="#e2e8f0" />
          <text x="52" y={Y(v) + 4} fontSize="9" textAnchor="end" fill="#64748b">
            {v}
          </text>
        </g>
      ))}
      <line x1="56" x2="450" y1={Y(10500)} y2={Y(10500)} stroke={S_RED} strokeDasharray="5 4" />
      <text x="448" y={Y(10500) - 5} fontSize="10" textAnchor="end" fill={S_RED}>
        10 500 m³
      </text>
      {years.map((y) => (
        <g key={y}>
          <circle cx={X(y)} cy={Y(val(y))} r={y === 2010 ? 5 : 3.6} fill={y === 2010 ? S_PURPLE : S_GREEN} />
          {y % 5 === 0 && (
            <text x={X(y)} y="268" fontSize="10" textAnchor="middle" fill="#475569">
              {y}
            </text>
          )}
        </g>
      ))}
      <text x={X(2010) + 8} y={Y(12000) - 8} fontSize="10.5" fill={S_PURPLE} fontWeight="bold">
        a₆ = 12 000 (2010)
      </text>
      <text x="240" y="284" fontSize="11" textAnchor="middle" fill={S_INK}>
        q = 0,98; 2005-ben a₁ = 12 000/0,98⁵; 2020-ban 12 000 · 0,98¹⁰
      </text>
    </Frame>
  );
};
