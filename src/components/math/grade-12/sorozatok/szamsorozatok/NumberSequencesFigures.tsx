import React from 'react';
import { SeqPlot, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_INK } from './seqKit';

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

// 1. ábra: a lépcső – 1 vagy 2 fokot léphetünk
export const StairsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sx = 40;
  const sy = 250;
  const stepW = 44;
  const stepH = 24;
  const steps = Array.from({ length: 8 }, (_, i) => i + 1);
  const vals = [1, 2, 3, 5, 8, 13, 21, 34];
  const top = (k: number): [number, number] => [sx + k * stepW + stepW / 2, sy - k * stepH];
  return (
    <Frame title="Hányféleképpen juthatunk fel az n-edik lépcsőfokra?" className={className}>
      <path
        d={`M ${sx} ${sy} ${steps.map((k) => `L ${sx + (k - 1) * stepW + stepW} ${sy - (k - 1) * stepH} L ${sx + (k - 1) * stepW + stepW} ${sy - k * stepH}`).join(' ')} L ${sx + 9 * stepW} ${sy - 8 * stepH}`}
        fill="none"
        stroke={S_INK}
        strokeWidth="2"
      />
      {steps.map((k) => (
        <g key={k}>
          <text x={sx + k * stepW + stepW / 2} y={sy - k * stepH + 14} fontSize="10" textAnchor="middle" fill="#475569">
            {k}.
          </text>
          <text x={sx + k * stepW + stepW / 2} y={sy - k * stepH - 8} fontSize="11.5" textAnchor="middle" fontWeight="bold" fill={S_BLUE}>
            a{String.fromCharCode(0x2080 + k)} = {vals[k - 1]}
          </text>
        </g>
      ))}
      {/* két érkezési mód a 4. fokra */}
      <path d={`M ${top(3)[0]} ${top(3)[1] - 20} Q ${(top(3)[0] + top(4)[0]) / 2} ${top(4)[1] - 46} ${top(4)[0] - 4} ${top(4)[1] - 22}`} fill="none" stroke={S_GREEN} strokeWidth="2" />
      <text x={(top(3)[0] + top(4)[0]) / 2 - 6} y={top(4)[1] - 44} fontSize="11" fill={S_GREEN} fontWeight="bold">
        +1
      </text>
      <path d={`M ${top(2)[0]} ${top(2)[1] - 20} Q ${top(3)[0]} ${top(4)[1] - 84} ${top(4)[0] - 10} ${top(4)[1] - 24}`} fill="none" stroke={S_RED} strokeWidth="2" strokeDasharray="5 3" />
      <text x={top(3)[0] - 18} y={top(4)[1] - 72} fontSize="11" fill={S_RED} fontWeight="bold">
        +2
      </text>
      <text x="40" y="282" fontSize="12" fill={S_INK}>
        Az n-edik fokra az (n − 1)-edikről vagy az (n − 2)-edikről érkezünk:  aₙ = aₙ₋₁ + aₙ₋₂ (n ≥ 3)
      </text>
    </Frame>
  );
};

// 2. ábra: a sorozat mint függvény
export const SequenceFunctionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ns = ['1', '2', '3', '4', '…', 'n', '…'];
  const as = ['a₁', 'a₂', 'a₃', 'a₄', '…', 'aₙ', '…'];
  return (
    <Frame title="A sorozat: függvény a pozitív egészek halmazán" className={className} h={270}>
      <ellipse cx="120" cy="150" rx="70" ry="100" fill="#eff6ff" stroke={S_BLUE} strokeWidth="1.6" />
      <ellipse cx="360" cy="150" rx="70" ry="100" fill="#f5f3ff" stroke={S_PURPLE} strokeWidth="1.6" />
      <text x="120" y="66" fontSize="13" textAnchor="middle" fontWeight="bold" fill={S_BLUE}>
        ℤ⁺
      </text>
      <text x="360" y="66" fontSize="13" textAnchor="middle" fontWeight="bold" fill={S_PURPLE}>
        ℝ
      </text>
      {ns.map((t, i) => {
        const y = 88 + i * 21;
        const arrow = t !== '…';
        return (
          <g key={i}>
            <text x="120" y={y + 4} fontSize="12" textAnchor="middle" fill={S_INK}>
              {t}
            </text>
            <text x="360" y={y + 4} fontSize="12" textAnchor="middle" fill={S_INK}>
              {as[i]}
            </text>
            {arrow && (
              <g>
                <line x1="140" y1={y} x2="330" y2={y} stroke="#64748b" strokeWidth="1.2" />
                <path d={`M 330 ${y} l -7 -3.5 l 0 7 z`} fill="#64748b" />
              </g>
            )}
          </g>
        );
      })}
      <text x="240" y="258" fontSize="12" textAnchor="middle" fill={S_INK}>
        n ↦ aₙ  ·  jelölés: {'{'}aₙ{'}'}, tagjai a₁; a₂; a₃; …; aₙ; …
      </text>
    </Frame>
  );
};

// 3. ábra: pontgrafikon – a kₙ = n(n − 1)/2 sorozat első hat tagja
export const PointGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 480 280" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height="272" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={S_INK}>
      Pontgrafikon: kₙ = n(n − 1)/2, n = 1, 2, …, 6
    </text>
    <g transform="translate(20 36)">
      <SeqPlotInner />
    </g>
    <text x="240" y="268" fontSize="11.5" textAnchor="middle" fill={S_RED}>
      A grafikon különálló pontokból áll – a pontokat nem kötjük össze!
    </text>
  </svg>
);

/** A SeqPlot-ot beágyazott <svg>-ként helyezzük el (külön viewBox-szal). */
const SeqPlotInner: React.FC = () => (
  <svg x="0" y="0" width="440" height="215" viewBox="0 0 300 190">
    <SeqPlot values={[0, 1, 3, 6, 10, 15]} showValues className="" w={300} h={190} yLabel="kₙ" />
  </svg>
);

// 4. ábra: a vicc terjedése (minden ismerő 3 új embernek mondja tovább)
export const JokeTreeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const levels = [1, 3, 9, 27];
  const ys = [62, 120, 178, 236];
  const pos = levels.map((cnt) => Array.from({ length: cnt }, (_, i) => 40 + ((i + 0.5) * 400) / cnt));
  return (
    <Frame title="A vicc terjedése: minden nap háromszor annyi új hallgató" className={className} h={290}>
      {pos.slice(1).map((row, li) =>
        row.map((x, i) => (
          <line key={`l${li}-${i}`} x1={pos[li][Math.floor(i / 3)]} y1={ys[li] + 6} x2={x} y2={ys[li + 1] - 6} stroke="#94a3b8" strokeWidth="1" />
        ))
      )}
      {pos.map((row, li) =>
        row.map((x, i) => <circle key={`c${li}-${i}`} cx={x} cy={ys[li]} r={li === 3 ? 4 : 7} fill={[S_RED, S_BLUE, S_GREEN, S_PURPLE][li]} />)
      )}
      {['Hajni (vasárnap)', 'hétfő: 3 új', 'kedd: 9 új', 'szerda: 27 új'].map((t, i) => (
        <text key={t} x="446" y={ys[i] + 4} fontSize="11" textAnchor="end" fill={S_INK} fontWeight={i === 0 ? 'bold' : 'normal'}>
          {i === 0 ? '' : t}
        </text>
      ))}
      <text x="60" y={ys[0] + 4} fontSize="11" fill={S_RED} fontWeight="bold">
        Hajni (vasárnap)
      </text>
      <text x="240" y="276" fontSize="12" textAnchor="middle" fill={S_INK}>
        Új hallgatók: 3; 9; 27; 81; … · összesen ismerik: 4; 13; 40; 121; …
      </text>
    </Frame>
  );
};

// 5. ábra: 5/7 tizedes tört alakja – periodikus számjegysorozat
export const RepeatingDecimalSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const digits = '714285714285'.split('');
  return (
    <Frame title="Az 5/7 tizedes tört alakja: 0,714285714285…" className={className} h={200}>
      {digits.map((d, i) => {
        const x = 40 + i * 34;
        const inFirst = i < 6;
        return (
          <g key={i}>
            <rect x={x} y="60" width="30" height="34" rx="6" fill={inFirst ? '#dbeafe' : '#ede9fe'} stroke={inFirst ? S_BLUE : S_PURPLE} />
            <text x={x + 15} y="83" fontSize="16" textAnchor="middle" fontWeight="bold" fill={S_INK}>
              {d}
            </text>
            <text x={x + 15} y="112" fontSize="10" textAnchor="middle" fill="#475569">
              {i + 1}.
            </text>
          </g>
        );
      })}
      <path d="M 40 128 L 40 136 L 240 136 L 240 128" fill="none" stroke={S_BLUE} strokeWidth="1.5" />
      <text x="140" y="152" fontSize="11" textAnchor="middle" fill={S_BLUE}>
        6 jegyű szakasz ismétlődik
      </text>
      <text x="240" y="182" fontSize="12" textAnchor="middle" fill={S_INK}>
        A k-adik jegy: a k-nak 6-tal való osztási maradéka dönt (maradék 0 → a 6. jegy, az 5).
      </text>
    </Frame>
  );
};
