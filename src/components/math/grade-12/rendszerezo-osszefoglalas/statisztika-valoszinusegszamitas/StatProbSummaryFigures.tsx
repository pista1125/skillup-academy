import React from 'react';
import { Frame, DEFAULT_FIG_CLASS, S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK, S_GRID } from './sumKit';

type FigProps = { className?: string };

// 1. ábra: dobozdiagram (1. kidolgozott feladat)
export const BoxPlotSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const X = (v: number) => 50 + ((v - 10) / 45) * 380;
  const five = [16, 30, 40, 46, 50];
  const names = ['minimum', 'alsó kvartilis', 'medián', 'felső kvartilis', 'maximum'];
  return (
    <Frame title="Dobozdiagram: 16; 30; 40; 46; 50 (pontszámok)" className={className} h={230}>
      {[10, 20, 30, 40, 50].map((v) => (
        <g key={v}>
          <line x1={X(v)} x2={X(v)} y1="60" y2="160" stroke={S_GRID} />
          <text x={X(v)} y="178" fontSize="11" textAnchor="middle" fill="#475569">
            {v}
          </text>
        </g>
      ))}
      <line x1="40" x2="440" y1="165" y2="165" stroke={S_INK} />
      <line x1={X(16)} x2={X(30)} y1="110" y2="110" stroke={S_INK} strokeWidth="2" />
      <line x1={X(46)} x2={X(50)} y1="110" y2="110" stroke={S_INK} strokeWidth="2" />
      <rect x={X(30)} y="80" width={X(46) - X(30)} height="60" fill="#dbeafe" stroke={S_BLUE} strokeWidth="2" />
      <line x1={X(40)} x2={X(40)} y1="80" y2="140" stroke={S_RED} strokeWidth="3" />
      {[16, 50].map((v) => (
        <line key={v} x1={X(v)} x2={X(v)} y1="95" y2="125" stroke={S_INK} strokeWidth="2" />
      ))}
      {five.map((v, i) => (
        <text key={v} x={X(v)} y={i % 2 === 0 ? 72 : 158} fontSize="10" textAnchor="middle" fill={i === 2 ? S_RED : S_INK} fontWeight="bold">
          {names[i]}: {v}
        </text>
      ))}
      <text x="240" y="205" fontSize="11" textAnchor="middle" fill={S_INK}>
        terjedelem: 50 − 16 = 34; félterjedelem (interkvartilis): 46 − 30 = 16
      </text>
    </Frame>
  );
};

// 2. ábra: osztályokba sorolt gyakoriságok (osztályközepek)
export const ClassHistogramSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const mids = [18, 23, 28, 33, 38, 43, 48];
  const freq = [2, 1, 2, 1, 4, 4, 6];
  const Y = (v: number) => 220 - v * 28;
  return (
    <Frame title="Osztályok és gyakoriságok – átlag 38, szórás ≈ 9,87" className={className} h={270}>
      {[0, 2, 4, 6].map((v) => (
        <g key={v}>
          <line x1="50" x2="450" y1={Y(v)} y2={Y(v)} stroke={S_GRID} />
          <text x="44" y={Y(v) + 4} fontSize="10" textAnchor="end" fill="#64748b">
            {v}
          </text>
        </g>
      ))}
      {mids.map((m, i) => (
        <g key={m}>
          <rect x={60 + i * 55} y={Y(freq[i])} width="50" height={freq[i] * 28} fill={m === 38 ? S_AMBER : S_BLUE} fillOpacity="0.65" stroke={S_INK} />
          <text x={85 + i * 55} y="236" fontSize="10" textAnchor="middle" fill="#475569">
            {m - 2}–{m + 2}
          </text>
          <text x={85 + i * 55} y="250" fontSize="9.5" textAnchor="middle" fill={S_PURPLE}>
            k = {m}
          </text>
          <text x={85 + i * 55} y={Y(freq[i]) - 4} fontSize="10" textAnchor="middle" fill={S_INK} fontWeight="bold">
            {freq[i]}
          </text>
        </g>
      ))}
      <line x1="50" x2="450" y1={Y(0)} y2={Y(0)} stroke={S_INK} />
    </Frame>
  );
};

// 3. ábra: két kocka, a nagyobbik érték táblázata (3. kidolgozott feladat)
export const DiceMaxTableSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const cols = ['#e0f2fe', '#bae6fd', '#bbf7d0', '#fde68a', '#fecaca', '#e9d5ff'];
  return (
    <Frame title="max(a; b) két kockánál – E = 161/36 ≈ 4,47" className={className} h={300}>
      {Array.from({ length: 6 }, (_, i) =>
        Array.from({ length: 6 }, (_, j) => {
          const v = Math.max(i + 1, j + 1);
          return (
            <g key={`${i}-${j}`}>
              <rect x={90 + j * 34} y={60 + i * 34} width="32" height="32" rx="4" fill={cols[v - 1]} stroke="#94a3b8" />
              <text x={106 + j * 34} y={81 + i * 34} fontSize="13" textAnchor="middle" fontWeight="bold" fill={S_INK}>
                {v}
              </text>
            </g>
          );
        })
      )}
      {Array.from({ length: 6 }, (_, k) => (
        <g key={`h${k}`}>
          <text x={106 + k * 34} y="52" fontSize="11" textAnchor="middle" fill={S_BLUE} fontWeight="bold">
            {k + 1}
          </text>
          <text x="78" y={81 + k * 34} fontSize="11" textAnchor="middle" fill={S_RED} fontWeight="bold">
            {k + 1}
          </text>
        </g>
      ))}
      {[1, 3, 5, 7, 9, 11].map((c, k) => (
        <g key={`p${k}`}>
          <rect x="320" y={66 + k * 34} width="18" height="18" rx="3" fill={cols[k]} stroke="#94a3b8" />
          <text x="346" y={80 + k * 34} fontSize="11.5" fill={S_INK}>
            {k + 1}: {c}/36
          </text>
        </g>
      ))}
    </Frame>
  );
};

// 4. ábra: visszatevés nélküli és visszatevéses mintavétel (4. kidolgozott feladat)
export const SamplingCompareSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  return (
    <Frame title="20 tétel: 14 magyar, 6 külföldi szerző – 5 húzás, pontosan 3 magyar" className={className} h={260}>
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={40 + (i % 10) * 20} y={50 + Math.floor(i / 10) * 26} width="16" height="22" rx="3" fill={i < 14 ? '#bbf7d0' : '#fecaca'} stroke={i < 14 ? S_GREEN : S_RED} />
      ))}
      <text x="40" y="118" fontSize="10.5" fill={S_GREEN} fontWeight="bold">
        14 magyar
      </text>
      <text x="150" y="118" fontSize="10.5" fill={S_RED} fontWeight="bold">
        6 külföldi
      </text>
      <rect x="260" y="44" width="200" height="86" rx="10" fill="#eff6ff" stroke={S_BLUE} />
      <text x="360" y="64" fontSize="11.5" textAnchor="middle" fill={S_BLUE} fontWeight="bold">
        visszatevés nélkül
      </text>
      <text x="360" y="88" fontSize="11" textAnchor="middle" fill={S_INK}>
        C(14; 3) · C(6; 2) / C(20; 5)
      </text>
      <text x="360" y="112" fontSize="12" textAnchor="middle" fill={S_BLUE} fontWeight="bold">
        ≈ 0,352
      </text>
      <rect x="260" y="144" width="200" height="86" rx="10" fill="#f5f3ff" stroke={S_PURPLE} />
      <text x="360" y="164" fontSize="11.5" textAnchor="middle" fill={S_PURPLE} fontWeight="bold">
        visszatevéssel (binomiális)
      </text>
      <text x="360" y="188" fontSize="11" textAnchor="middle" fill={S_INK}>
        C(5; 3) · 0,7³ · 0,3²
      </text>
      <text x="360" y="212" fontSize="12" textAnchor="middle" fill={S_PURPLE} fontWeight="bold">
        = 0,3087
      </text>
      <text x="40" y="160" fontSize="10.5" fill={S_INK}>
        p(magyar) = 14/20 = 0,7
      </text>
      <text x="40" y="178" fontSize="10.5" fill={S_INK}>
        p(külföldi) = 0,3
      </text>
    </Frame>
  );
};

// 5. ábra: események összege, szorzata, komplementere (Venn-diagram)
export const EventVennSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const panel = (x: number, title: string, mode: 'sum' | 'prod' | 'comp') => (
    <g>
      <rect x={x} y="44" width="140" height="120" rx="8" fill={mode === 'comp' ? '#fde68a' : '#ffffff'} stroke={S_INK} />
      <defs>
        <clipPath id={`clipA-${mode}`}>
          <circle cx={x + 55} cy="104" r="34" />
        </clipPath>
      </defs>
      {mode === 'sum' && (
        <>
          <circle cx={x + 55} cy="104" r="34" fill="#93c5fd" />
          <circle cx={x + 85} cy="104" r="34" fill="#93c5fd" />
        </>
      )}
      {mode === 'prod' && <circle cx={x + 85} cy="104" r="34" fill="#93c5fd" clipPath={`url(#clipA-${mode})`} />}
      {mode === 'comp' && <circle cx={x + 70} cy="104" r="36" fill="#ffffff" />}
      {mode !== 'comp' ? (
        <>
          <circle cx={x + 55} cy="104" r="34" fill="none" stroke={S_BLUE} strokeWidth="1.6" />
          <circle cx={x + 85} cy="104" r="34" fill="none" stroke={S_GREEN} strokeWidth="1.6" />
          <text x={x + 34} y="80" fontSize="12" fill={S_BLUE} fontWeight="bold">
            A
          </text>
          <text x={x + 100} y="80" fontSize="12" fill={S_GREEN} fontWeight="bold">
            B
          </text>
        </>
      ) : (
        <>
          <circle cx={x + 70} cy="104" r="36" fill="none" stroke={S_BLUE} strokeWidth="1.6" />
          <text x={x + 66} y="108" fontSize="13" fill={S_BLUE} fontWeight="bold">
            A
          </text>
        </>
      )}
      <text x={x + 70} y="184" fontSize="12" textAnchor="middle" fill={S_INK} fontWeight="bold">
        {title}
      </text>
    </g>
  );
  return (
    <Frame title="Műveletek eseményekkel (H: eseménytér)" className={className} h={210}>
      {panel(15, 'A + B (legalább az egyik)', 'sum')}
      {panel(170, 'A · B (mindkettő)', 'prod')}
      {panel(325, 'Ā (A nem következik be)', 'comp')}
    </Frame>
  );
};

// 6. ábra: binomiális eloszlás – n = 200, p = 0,015 (5. kidolgozott feladat)
export const BinomialBarsSvg: React.FC<FigProps> = ({ className = DEFAULT_FIG_CLASS }) => {
  const C = (n: number, k: number) => {
    let r = 1;
    for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
    return r;
  };
  const pk = Array.from({ length: 9 }, (_, k) => C(200, k) * 0.015 ** k * 0.985 ** (200 - k));
  const Y = (v: number) => 230 - (v / 0.25) * 180;
  return (
    <Frame title="Selejtesek száma 200 termékből (p = 0,015)" className={className} h={270}>
      {[0, 0.05, 0.1, 0.15, 0.2, 0.25].map((v) => (
        <g key={v}>
          <line x1="60" x2="450" y1={Y(v)} y2={Y(v)} stroke={S_GRID} />
          <text x="54" y={Y(v) + 4} fontSize="9.5" textAnchor="end" fill="#64748b">
            {v.toFixed(2).replace('.', ',')}
          </text>
        </g>
      ))}
      {pk.map((p, k) => (
        <g key={k}>
          <rect x={75 + k * 42} y={Y(p)} width="30" height={Y(0) - Y(p)} fill={k <= 2 ? S_GREEN : S_BLUE} fillOpacity={k <= 2 ? 0.85 : 0.45} />
          <text x={90 + k * 42} y="246" fontSize="10.5" textAnchor="middle" fill="#475569">
            {k}
          </text>
          {k <= 2 && (
            <text x={90 + k * 42} y={Y(p) - 4} fontSize="9.5" textAnchor="middle" fill={S_INK} fontWeight="bold">
              {p.toFixed(3).replace('.', ',')}
            </text>
          )}
        </g>
      ))}
      <line x1="60" x2="450" y1={Y(0)} y2={Y(0)} stroke={S_INK} />
      <text x="330" y="80" fontSize="11.5" fill={S_GREEN} fontWeight="bold">
        P(k ≤ 2) ≈ 0,422
      </text>
    </Frame>
  );
};
