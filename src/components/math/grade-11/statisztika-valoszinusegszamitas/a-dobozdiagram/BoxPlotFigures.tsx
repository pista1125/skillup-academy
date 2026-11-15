import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const fmt = (v: number) => String(Math.round(v * 100) / 100).replace('.', ',');

/** Számegyenes (tengely) osztásokkal. */
const Axis: React.FC<{ from: number; to: number; step: number; x0: number; x1: number; y: number; labelEvery?: number }> = ({
  from,
  to,
  step,
  x0,
  x1,
  y,
  labelEvery = 1
}) => {
  const ticks: number[] = [];
  for (let v = from, i = 0; v <= to + 1e-9; v += step, i++) ticks.push(Math.round(v * 1000) / 1000);
  const sx = (v: number) => x0 + ((v - from) / (to - from)) * (x1 - x0);
  return (
    <g>
      <line x1={x0 - 6} y1={y} x2={x1 + 10} y2={y} stroke="#475569" strokeWidth="1.5" />
      <polygon points={`${x1 + 14},${y} ${x1 + 6},${y - 4} ${x1 + 6},${y + 4}`} fill="#475569" />
      {ticks.map((v, i) => (
        <g key={v}>
          <line x1={sx(v)} y1={y - 4} x2={sx(v)} y2={y + 4} stroke="#475569" strokeWidth="1.2" />
          {i % labelEvery === 0 && (
            <text x={sx(v)} y={y + 17} fontSize="11" textAnchor="middle" fill="#334155">
              {fmt(v)}
            </text>
          )}
        </g>
      ))}
    </g>
  );
};

/** Vízszintes dobozdiagram rajzolása a megadott skálán. */
const Box: React.FC<{
  five: [number, number, number, number, number];
  sx: (v: number) => number;
  y: number;
  h?: number;
  fill?: string;
  stroke?: string;
}> = ({ five, sx, y, h = 34, fill = '#e0f2fe', stroke = '#0369a1' }) => {
  const [mn, q1, me, q3, mx] = five;
  return (
    <g>
      <line x1={sx(mn)} y1={y} x2={sx(q1)} y2={y} stroke={stroke} strokeWidth="2" />
      <line x1={sx(q3)} y1={y} x2={sx(mx)} y2={y} stroke={stroke} strokeWidth="2" />
      <line x1={sx(mn)} y1={y - h / 4} x2={sx(mn)} y2={y + h / 4} stroke={stroke} strokeWidth="2" />
      <line x1={sx(mx)} y1={y - h / 4} x2={sx(mx)} y2={y + h / 4} stroke={stroke} strokeWidth="2" />
      <rect x={sx(q1)} y={y - h / 2} width={sx(q3) - sx(q1)} height={h} fill={fill} stroke={stroke} strokeWidth="2" rx="2" />
      <line x1={sx(me)} y1={y - h / 2} x2={sx(me)} y2={y + h / 2} stroke="#be123c" strokeWidth="3" />
    </g>
  );
};

const scale = (from: number, to: number, x0: number, x1: number) => (v: number) => x0 + ((v - from) / (to - from)) * (x1 - x0);

// 1. ábra: a magyar válogatott 18 játékosának sebessége sorba rendezve, negyedekre bontva
export const BoxPlotSpeedsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const speeds = [19.0, 23.8, 25.0, 25.6, 26.1, 26.3, 27.4, 28.1, 28.8, 29.0, 29.2, 29.7, 29.9, 30.8, 31.3, 31.5, 31.5, 33.8];
  const w = 31;
  const x0 = 21;
  const cat = (i: number) => (i < 4 ? '#fee2e2' : i < 9 ? '#fef3c7' : i < 13 ? '#dcfce7' : '#e0f2fe');
  return (
    <svg viewBox="0 0 600 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Legnagyobb sebességek (km/h) növekvő sorrendben – 18 játékos
      </text>
      {speeds.map((s, i) => (
        <g key={i}>
          <rect
            x={x0 + i * w}
            y="70"
            width={w - 3}
            height="34"
            rx="5"
            fill={i === 4 || i === 13 ? '#7dd3fc' : cat(i)}
            stroke={i === 4 || i === 13 ? '#0369a1' : '#94a3b8'}
            strokeWidth={i === 4 || i === 13 ? 2 : 1}
          />
          <text x={x0 + i * w + (w - 3) / 2} y="92" fontSize="10.5" textAnchor="middle" fontWeight="bold" fill="#0f172a">
            {fmt(s)}
          </text>
          <text x={x0 + i * w + (w - 3) / 2} y="62" fontSize="9" textAnchor="middle" fill="#64748b">
            {i + 1}.
          </text>
        </g>
      ))}
      {/* medián: a 9. és 10. elem között */}
      <line x1={x0 + 9 * w - 1.5} y1="48" x2={x0 + 9 * w - 1.5} y2="126" stroke="#be123c" strokeWidth="3" />
      <text x={x0 + 9 * w - 1.5} y="142" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#be123c">
        medián = (28,8 + 29,0) / 2 = 28,9
      </text>
      <line x1={x0 + 4 * w + 14} y1="106" x2={x0 + 4 * w + 14} y2="126" stroke="#0369a1" strokeWidth="2" />
      <text x={x0 + 4 * w + 14} y="160" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0369a1">
        Q₁ = 26,1
      </text>
      <line x1={x0 + 13 * w + 14} y1="106" x2={x0 + 13 * w + 14} y2="126" stroke="#0369a1" strokeWidth="2" />
      <text x={x0 + 13 * w + 14} y="160" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0369a1">
        Q₃ = 30,8
      </text>
      {[
        { t: 'Lassú', x: 80, c: '#b91c1c' },
        { t: 'Közepes', x: 225, c: '#b45309' },
        { t: 'Gyors', x: 365, c: '#15803d' },
        { t: 'Villám', x: 515, c: '#0369a1' }
      ].map((k) => (
        <text key={k.t} x={k.x} y="192" fontSize="13" textAnchor="middle" fontWeight="bold" fill={k.c}>
          {k.t}
        </text>
      ))}
      <text x="300" y="214" fontSize="11" textAnchor="middle" fill="#475569">
        Páros elemszám: a két 9-es „fél” mediánja adja a kvartiliseket (az 5. és a 14. elem).
      </text>
    </svg>
  );
};

// 2. ábra: a dobozdiagram részei (Q0 … Q4, terjedelem, félterjedelem)
export const BoxPlotAnatomySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const xs = [60, 190, 260, 360, 540];
  return (
    <svg viewBox="0 0 600 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* félterjedelem */}
      <line x1={xs[1]} y1="40" x2={xs[3]} y2="40" stroke="#7c3aed" strokeWidth="2" />
      <line x1={xs[1]} y1="34" x2={xs[1]} y2="46" stroke="#7c3aed" strokeWidth="2" />
      <line x1={xs[3]} y1="34" x2={xs[3]} y2="46" stroke="#7c3aed" strokeWidth="2" />
      <text x={(xs[1] + xs[3]) / 2} y="30" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#6d28d9">
        félterjedelem = Q₃ − Q₁
      </text>
      <Box five={[xs[0], xs[1], xs[2], xs[3], xs[4]]} sx={(v) => v} y={100} h={56} />
      {xs.map((x, i) => (
        <g key={i}>
          <line x1={x} y1="132" x2={x} y2="150" stroke="#94a3b8" strokeDasharray="3 3" />
          <text x={x} y="166" fontSize="13" textAnchor="middle" fontWeight="bold" fill={i === 2 ? '#be123c' : '#0369a1'}>
            Q{['₀', '₁', '₂', '₃', '₄'][i]}
          </text>
          <text x={x} y="182" fontSize="11" textAnchor="middle" fill="#334155">
            {['minimum', 'alsó kvartilis', 'medián', 'felső kvartilis', 'maximum'][i]}
          </text>
        </g>
      ))}
      <line x1={xs[0]} y1="205" x2={xs[4]} y2="205" stroke="#059669" strokeWidth="2" />
      <line x1={xs[0]} y1="199" x2={xs[0]} y2="211" stroke="#059669" strokeWidth="2" />
      <line x1={xs[4]} y1="199" x2={xs[4]} y2="211" stroke="#059669" strokeWidth="2" />
      <text x={(xs[0] + xs[4]) / 2} y="228" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#047857">
        terjedelem = Q₄ − Q₀ (maximum − minimum)
      </text>
      <text x="125" y="64" fontSize="11" textAnchor="middle" fill="#475569">
        ≈ 25%
      </text>
      <text x="225" y="64" fontSize="11" textAnchor="middle" fill="#475569">
        ≈ 25%
      </text>
      <text x="310" y="64" fontSize="11" textAnchor="middle" fill="#475569">
        ≈ 25%
      </text>
      <text x="450" y="64" fontSize="11" textAnchor="middle" fill="#475569">
        ≈ 25%
      </text>
    </svg>
  );
};

// 3. ábra: a tankönyvi példa – 5, 18, 38, 46, 80
export const BoxPlotExampleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sx = scale(0, 80, 50, 540);
  const vals: [number, number, number, number, number] = [5, 18, 38, 46, 80];
  const names = ['minimum', 'alsó kvartilis', 'medián', 'felső kvartilis', 'maximum'];
  return (
    <svg viewBox="0 0 600 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <Box five={vals} sx={sx} y={60} h={40} />
      <Axis from={0} to={80} step={10} x0={50} x1={540} y={110} />
      {vals.map((v, i) => (
        <g key={i}>
          <text x={sx(v)} y={146 + (i % 2) * 30} fontSize="11" textAnchor="middle" fill="#334155">
            {names[i]}
          </text>
          <text x={sx(v)} y={160 + (i % 2) * 30} fontSize="13" textAnchor="middle" fontWeight="bold" fill={i === 2 ? '#be123c' : '#0369a1'}>
            {v}
          </text>
        </g>
      ))}
      <rect x="120" y="212" width="170" height="32" rx="8" fill="#ecfdf5" stroke="#059669" />
      <text x="205" y="233" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#047857">
        terjedelem: 80 − 5 = 75
      </text>
      <rect x="310" y="212" width="190" height="32" rx="8" fill="#f5f3ff" stroke="#7c3aed" />
      <text x="405" y="233" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#6d28d9">
        félterjedelem: 46 − 18 = 28
      </text>
    </svg>
  );
};

// 4. ábra: gyakorisági táblázatból dobozdiagram (2. kidolgozott feladat)
export const BoxPlotFrequencySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sx = scale(0, 13, 50, 540);
  const freq: [number, number][] = [
    [4, 1],
    [5, 2],
    [7, 1],
    [8, 4],
    [10, 2],
    [12, 1]
  ];
  return (
    <svg viewBox="0 0 600 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        4, 5, 5, 7, 8, 8, 8, 8, 10, 10, 12 (11 adat)
      </text>
      {freq.map(([v, f]) =>
        Array.from({ length: f }, (_, k) => (
          <circle key={`${v}-${k}`} cx={sx(v)} cy={118 - k * 20} r="7.5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />
        ))
      )}
      <circle cx={sx(8)} cy={98} r="10" fill="none" stroke="#be123c" strokeWidth="2.5" />
      <text x={sx(8) + 16} y={102} fontSize="10" fill="#be123c" fontWeight="bold">
        6. elem
      </text>
      <Axis from={0} to={13} step={1} x0={50} x1={540} y={140} />
      <Box five={[4, 5, 8, 10, 12]} sx={sx} y={192} h={36} />
      {[
        ['min', 4],
        ['Q₁', 5],
        ['Me', 8],
        ['Q₃', 10],
        ['max', 12]
      ].map(([t, v], i) => (
        <text key={String(t)} x={sx(Number(v))} y={i % 2 === 0 ? 236 : 254} fontSize="12" textAnchor="middle" fontWeight="bold" fill={t === 'Me' ? '#be123c' : '#0369a1'}>
          {t} = {v}
        </text>
      ))}
    </svg>
  );
};

// 5. ábra: kiugró adatok – a vonalak a legkisebb / legnagyobb nem kiugró adatig tartanak
export const BoxPlotOutlierSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sx = scale(0, 32, 50, 540);
  const data = [2, 10, 11, 12, 13, 14, 15, 16, 30];
  return (
    <svg viewBox="0 0 600 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="26" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        2, 10, 11, 12, 13, 14, 15, 16, 30 → Q₁ = 10,5; Me = 13; Q₃ = 15,5
      </text>
      {/* határok */}
      {[3, 23].map((b) => (
        <g key={b}>
          <line x1={sx(b)} y1="44" x2={sx(b)} y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 4" />
          <text x={sx(b)} y="58" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#b45309">
            {b === 3 ? '10,5 − 1,5 · 5 = 3' : '15,5 + 1,5 · 5 = 23'}
          </text>
        </g>
      ))}
      <Box five={[10, 10.5, 13, 15.5, 16]} sx={sx} y={100} h={36} />
      {[2, 30].map((o) => (
        <g key={o}>
          <circle cx={sx(o)} cy="100" r="6" fill="#fda4af" stroke="#be123c" strokeWidth="2" />
          <text x={sx(o)} y="84" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#be123c">
            kiugró
          </text>
        </g>
      ))}
      {data.map((d, i) => (
        <circle key={i} cx={sx(d)} cy="140" r="3.5" fill="#0369a1" />
      ))}
      <Axis from={0} to={32} step={2} x0={50} x1={540} y={170} />
      <text x="300" y="216" fontSize="12" textAnchor="middle" fill="#334155">
        félterjedelem: 15,5 − 10,5 = 5;  másfélszerese: 7,5
      </text>
      <text x="300" y="238" fontSize="12" textAnchor="middle" fill="#334155">
        A vonalak a legkisebb (10) és a legnagyobb (16) nem kiugró adatig tartanak.
      </text>
    </svg>
  );
};

// 6. ábra: a Rubik-kocka-döntő 44 eredményének dobozdiagramja
export const BoxPlotRubikSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sx = scale(20, 55, 50, 540);
  const five: [number, number, number, number, number] = [21, 31, 34, 40, 53];
  return (
    <svg viewBox="0 0 600 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="590" height="190" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="28" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Rubik-kocka, legkevesebb forgatás – 44 eredmény (Budapest, 2019)
      </text>
      <Box five={five} sx={sx} y={78} h={40} fill="#fef3c7" stroke="#b45309" />
      <Axis from={20} to={55} step={5} x0={50} x1={540} y={130} />
      {five.map((v, i) => (
        <text key={i} x={sx(v)} y={i % 2 === 0 ? 160 : 178} fontSize="12" textAnchor="middle" fontWeight="bold" fill={i === 2 ? '#be123c' : '#92400e'}>
          {['min', 'Q₁', 'Me', 'Q₃', 'max'][i]} = {v}
        </text>
      ))}
    </svg>
  );
};
