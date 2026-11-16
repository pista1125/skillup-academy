import React from 'react';
import { Frame, DEFAULT_FIG_CLASS, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK, S_GRID } from './sumKit';

type FigProps = { className?: string };

// 1. ábra: a 2; 4; 6; 8; … sorozat háromféle megadása
export const SequenceDefinitionSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const rows = [
    { t: 'Körülírással', d: 'a pozitív páros számok növekvő sorozata', c: S_BLUE },
    { t: 'Képlettel', d: 'aₙ = 2n  (n ∈ N⁺)', c: S_GREEN },
    { t: 'Rekurzívan', d: 'a₁ = 2  és  aₙ₊₁ = aₙ + 2', c: S_PURPLE }
  ];
  return (
    <Frame title="A 2; 4; 6; 8; … sorozat megadása háromféleképpen" className={className} h={250}>
      {[2, 4, 6, 8].map((v, i) => (
        <g key={v}>
          <rect x={120 + i * 62} y="42" width="50" height="30" rx="8" fill="#eff6ff" stroke={S_BLUE} strokeWidth="1.5" />
          <text x={145 + i * 62} y="62" fontSize="14" fontWeight="bold" textAnchor="middle" fill={S_INK}>
            {v}
          </text>
          <text x={145 + i * 62} y="86" fontSize="10" textAnchor="middle" fill="#64748b">
            a{['₁', '₂', '₃', '₄'][i]}
          </text>
        </g>
      ))}
      <text x="372" y="62" fontSize="14" fill={S_INK}>
        …
      </text>
      {rows.map((r, i) => (
        <g key={r.t}>
          <rect x="30" y={102 + i * 44} width="420" height="36" rx="10" fill="#ffffff" stroke={r.c} strokeWidth="1.5" />
          <text x="44" y={125 + i * 44} fontSize="12.5" fontWeight="bold" fill={r.c}>
            {r.t}:
          </text>
          <text x="150" y={125 + i * 44} fontSize="12.5" fill={S_INK}>
            {r.d}
          </text>
        </g>
      ))}
    </Frame>
  );
};

// 2. ábra: számtani és mértani sorozat pontgrafikonja
export const ArithGeomCompareSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const ar = [3, 9, 15, 21, 27, 33];
  const ge = [3, 6, 12, 24, 48, 96];
  const X = (i: number) => 70 + i * 66;
  const Y = (v: number) => 260 - (v / 100) * 210;
  return (
    <Frame title="Számtani (+6) és mértani (·2) sorozat, a₁ = 3" className={className} h={300}>
      {[0, 20, 40, 60, 80, 100].map((v) => (
        <g key={v}>
          <line x1="50" x2="450" y1={Y(v)} y2={Y(v)} stroke={S_GRID} />
          <text x="44" y={Y(v) + 4} fontSize="9.5" textAnchor="end" fill="#64748b">
            {v}
          </text>
        </g>
      ))}
      <line x1="50" x2="455" y1={Y(0)} y2={Y(0)} stroke={S_INK} strokeWidth="1.4" />
      <line x1="50" x2="50" y1={Y(0)} y2="42" stroke={S_INK} strokeWidth="1.4" />
      {ar.map((v, i) => (
        <g key={`a${i}`}>
          <circle cx={X(i)} cy={Y(v)} r="5" fill={S_BLUE} />
          <text x={X(i)} y={Y(0) + 15} fontSize="10" textAnchor="middle" fill="#475569">
            {i + 1}
          </text>
        </g>
      ))}
      {ge.map((v, i) => (
        <rect key={`g${i}`} x={X(i) - 4.5} y={Y(v) - 4.5} width="9" height="9" fill={S_RED} transform={`rotate(45 ${X(i)} ${Y(v)})`} />
      ))}
      <line x1={X(0)} y1={Y(3)} x2={X(5)} y2={Y(33)} stroke={S_BLUE} strokeDasharray="4 4" strokeOpacity="0.6" />
      <circle cx="80" cy="56" r="5" fill={S_BLUE} />
      <text x="92" y="60" fontSize="11.5" fill={S_BLUE} fontWeight="bold">
        számtani: aₙ = 3 + (n − 1) · 6 (egy egyenesen)
      </text>
      <rect x="75.5" y="70.5" width="9" height="9" fill={S_RED} transform="rotate(45 80 75)" />
      <text x="92" y="79" fontSize="11.5" fill={S_RED} fontWeight="bold">
        mértani: aₙ = 3 · 2ⁿ⁻¹ (exponenciális növekedés)
      </text>
    </Frame>
  );
};

// 3. ábra: a 6 · 2ⁿ⁻¹ sorozat részletösszegei és a 10⁷-es korlát (lg-skálán)
export const PartialSumThresholdSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const lg = Array.from({ length: 22 }, (_, i) => Math.log10(6 * (2 ** (i + 1) - 1)));
  const X = (i: number) => 52 + i * 18.4;
  const Y = (v: number) => 255 - (v / 8) * 205;
  return (
    <Frame title="Sₙ = 6 · (2ⁿ − 1) – mikor lépi át a 10⁷-t? (lg Sₙ)" className={className} h={290}>
      {[0, 2, 4, 6, 8].map((v) => (
        <g key={v}>
          <line x1="44" x2="460" y1={Y(v)} y2={Y(v)} stroke={S_GRID} />
          <text x="38" y={Y(v) + 4} fontSize="9.5" textAnchor="end" fill="#64748b">
            10{['⁰', '²', '⁴', '⁶', '⁸'][v / 2]}
          </text>
        </g>
      ))}
      {lg.map((v, i) => (
        <g key={i}>
          <rect x={X(i) - 6.5} y={Y(v)} width="13" height={Y(0) - Y(v)} rx="2" fill={i >= 20 ? S_GREEN : S_BLUE} fillOpacity={i >= 20 ? 0.9 : 0.55} />
          {(i % 2 === 0 || i >= 19) && (
            <text x={X(i)} y={Y(0) + 13} fontSize="8.5" textAnchor="middle" fill="#475569">
              {i + 1}
            </text>
          )}
        </g>
      ))}
      <line x1="44" x2="460" y1={Y(7)} y2={Y(7)} stroke={S_RED} strokeWidth="1.6" strokeDasharray="6 4" />
      <text x="60" y={Y(7) - 6} fontSize="11" fill={S_RED} fontWeight="bold">
        10⁷
      </text>
      <text x={X(19)} y={Y(lg[19]) - 30} fontSize="10" textAnchor="middle" fill={S_INK}>
        S₂₀ ≈ 6,3 · 10⁶
      </text>
      <text x={X(20) + 6} y={Y(lg[20]) - 14} fontSize="10" textAnchor="middle" fill={S_GREEN} fontWeight="bold">
        S₂₁ ≈ 1,26 · 10⁷
      </text>
      <line x1="44" x2="460" y1={Y(0)} y2={Y(0)} stroke={S_INK} strokeWidth="1.3" />
    </Frame>
  );
};

// 4. ábra: a nyomdagép értéke (0,9-szeres csökkenés + 300 000 Ft karbantartás)
export const PrintingMachineSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const vals: number[] = [42];
  for (let i = 1; i <= 8; i++) vals.push(vals[i - 1] * 0.9 + 0.3);
  const X = (i: number) => 70 + i * 44;
  const Y = (v: number) => 250 - (v / 45) * 195;
  return (
    <Frame title="Nyomdagép értéke (millió Ft): Vₖ₊₁ = 0,9 · Vₖ + 0,3" className={className} h={290}>
      {[0, 10, 20, 30, 40].map((v) => (
        <g key={v}>
          <line x1="50" x2="455" y1={Y(v)} y2={Y(v)} stroke={S_GRID} />
          <text x="44" y={Y(v) + 4} fontSize="9.5" textAnchor="end" fill="#64748b">
            {v}
          </text>
        </g>
      ))}
      {vals.map((v, i) => (
        <g key={i}>
          <rect x={X(i) - 13} y={Y(v)} width="26" height={Y(0) - Y(v)} rx="3" fill={i === 8 ? S_AMBER : S_PURPLE} fillOpacity={i === 8 ? 0.95 : 0.6} />
          <text x={X(i)} y={Y(v) - 5} fontSize="9" textAnchor="middle" fill={S_INK}>
            {i === 8 ? '≈ 19,8' : v.toFixed(1).replace('.', ',')}
          </text>
          <text x={X(i)} y={Y(0) + 14} fontSize="9.5" textAnchor="middle" fill="#475569">
            {i}. év
          </text>
        </g>
      ))}
      <line x1="50" x2="455" y1={Y(0)} y2={Y(0)} stroke={S_INK} strokeWidth="1.3" />
    </Frame>
  );
};

// 5. ábra: a két kerékpáros (A és B 189 km-re), találkozás 18 órakor
export const CyclistsSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const X = (km: number) => 40 + (km / 189) * 400;
  const aStops = [0, 21, 40.6, 58.8, 75.6, 91, 105];
  const bStops = [189, 171, 151, 129, 105];
  return (
    <Frame title="A két kerékpáros óránkénti útja (km)" className={className} h={230}>
      <line x1={X(0)} x2={X(189)} y1="120" y2="120" stroke={S_INK} strokeWidth="2.5" />
      <circle cx={X(0)} cy="120" r="7" fill={S_BLUE} />
      <circle cx={X(189)} cy="120" r="7" fill={S_RED} />
      <text x={X(0)} y="148" fontSize="13" textAnchor="middle" fontWeight="bold" fill={S_BLUE}>
        A
      </text>
      <text x={X(189)} y="148" fontSize="13" textAnchor="middle" fontWeight="bold" fill={S_RED}>
        B
      </text>
      {aStops.map((k, i) =>
        i === 0 ? null : (
          <g key={`a${i}`}>
            <path d={`M ${X(aStops[i - 1]) + 2} 108 Q ${(X(aStops[i - 1]) + X(k)) / 2} 86 ${X(k) - 2} 108`} fill="none" stroke={S_BLUE} strokeWidth="1.4" />
            <text x={(X(aStops[i - 1]) + X(k)) / 2} y="82" fontSize="8.5" textAnchor="middle" fill={S_BLUE}>
              {(21 - 1.4 * (i - 1)).toFixed(1).replace('.', ',').replace(',0', '')}
            </text>
          </g>
        )
      )}
      {bStops.map((k, i) =>
        i === 0 ? null : (
          <g key={`b${i}`}>
            <path d={`M ${X(bStops[i - 1]) - 2} 132 Q ${(X(bStops[i - 1]) + X(k)) / 2} 156 ${X(k) + 2} 132`} fill="none" stroke={S_RED} strokeWidth="1.4" />
            <text x={(X(bStops[i - 1]) + X(k)) / 2} y="168" fontSize="9" textAnchor="middle" fill={S_RED}>
              {18 + 2 * (i - 1)}
            </text>
          </g>
        )
      )}
      <line x1={X(105)} x2={X(105)} y1="60" y2="185" stroke={S_GREEN} strokeDasharray="4 3" strokeWidth="1.5" />
      <text x={X(105)} y="52" fontSize="11" textAnchor="middle" fill={S_GREEN} fontWeight="bold">
        találkozás 18 órakor
      </text>
      <text x={X(52)} y="205" fontSize="11" textAnchor="middle" fill={S_BLUE}>
        A: 12 órától, a₁ = 21, d = −1,4 → 105 km
      </text>
      <text x={X(150)} y="205" fontSize="11" textAnchor="middle" fill={S_RED}>
        B: 14 órától, b₁ = 18, d = 2 → 84 km
      </text>
    </Frame>
  );
};

// 6. ábra: kamatos kamat – 2 millió Ft évi 8%-kal
export const CompoundInterestSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const vals = [2, 2.16, 2.3328];
  return (
    <Frame title="Kamatos kamat: Aₙ = A₀ · (1 + p/100)ⁿ" className={className} h={260}>
      {vals.map((v, i) => {
        const x = 90 + i * 120;
        const hgt = v * 70;
        return (
          <g key={i}>
            <rect x={x} y={220 - hgt} width="70" height={hgt} rx="6" fill={i === 0 ? S_BLUE : S_GREEN} fillOpacity={0.35 + i * 0.25} stroke={i === 0 ? S_BLUE : S_GREEN} />
            <text x={x + 35} y={212 - hgt} fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_INK}>
              {['2 000 000', '2 160 000', '2 332 800'][i]}
            </text>
            <text x={x + 35} y="238" fontSize="11" textAnchor="middle" fill="#475569">
              {['A₀ (most)', '1. év vége', '2. év vége'][i]}
            </text>
            {i > 0 && (
              <text x={x - 25} y={230 - hgt} fontSize="12" textAnchor="middle" fill={S_GREEN} fontWeight="bold">
                · 1,08
              </text>
            )}
          </g>
        );
      })}
      <line x1="60" x2="440" y1="220" y2="220" stroke={S_INK} strokeWidth="1.3" />
    </Frame>
  );
};
