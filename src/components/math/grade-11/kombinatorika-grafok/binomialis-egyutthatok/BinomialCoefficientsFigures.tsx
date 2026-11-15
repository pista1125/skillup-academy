import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const C = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};

/** Álló binomiális együttható SVG-ben: (n alatt k) zárójellel. */
const SvgBinom: React.FC<{ x: number; y: number; n: string | number; k: string | number; size?: number; color?: string }> = ({
  x,
  y,
  n,
  k,
  size = 14,
  color = '#0f172a'
}) => (
  <g fill={color} fontWeight="bold">
    <text x={x - size * 0.75} y={y + size * 0.15} fontSize={size * 2.2} textAnchor="middle" fontWeight="normal">(</text>
    <text x={x} y={y - size * 0.35} fontSize={size} textAnchor="middle">{n}</text>
    <text x={x} y={y + size * 0.85} fontSize={size} textAnchor="middle">{k}</text>
    <text x={x + size * 0.75} y={y + size * 0.15} fontSize={size * 2.2} textAnchor="middle" fontWeight="normal">)</text>
  </g>
);

// 1. ábra: Bevezető – Anita sálmintája (7 rekesz, 3 sima szem)
export const ScarfPatternSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    [1, 1, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 1]
  ];
  const w = 46;
  const x0 = 70;
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#fdf4ff" stroke="#f5d0fe" strokeWidth="1.5" />
      <text x="280" y="32" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Anita sálmintája: 7 rekesz, ebből 3 sima (S), 4 fordított (F)
      </text>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <text key={i} x={x0 + (i - 1) * w + w / 2} y="58" fontSize="12" textAnchor="middle" fill="#64748b">{i}.</text>
      ))}
      {rows.map((row, r) => (
        <g key={r}>
          {row.map((v, i) => (
            <g key={i}>
              <rect
                x={x0 + i * w + 3}
                y={68 + r * 52}
                width={w - 6}
                height="40"
                rx="8"
                fill={v ? '#c026d3' : '#ffffff'}
                stroke={v ? '#86198f' : '#d8b4fe'}
                strokeWidth="2"
              />
              <text x={x0 + i * w + w / 2} y={94 + r * 52} fontSize="15" textAnchor="middle" fontWeight="bold" fill={v ? '#ffffff' : '#a21caf'}>
                {v ? 'S' : 'F'}
              </text>
            </g>
          ))}
          <text x={x0 + 7 * w + 14} y={94 + r * 52} fontSize="12" fill="#701a75">
            sima: {row.map((v, i) => (v ? i + 1 : null)).filter(Boolean).join('-')}
          </text>
        </g>
      ))}
      <text x="280" y="240" fontSize="13" textAnchor="middle" fill="#334155">
        Csak az számít, MELYIK 3 rekeszbe kerül sima szem – a kijelölés sorrendje nem.
      </text>
      <text x="200" y="274" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#701a75">
        7 · 6 · 5 / 3! =
      </text>
      <SvgBinom x={282} y={268} n={7} k={3} color="#701a75" />
      <text x="330" y="274" fontSize="15" fontWeight="bold" fill="#701a75">= 35 minta</text>
    </svg>
  );
};

// 2. ábra: Kétféle elem sorba rendezése – 3 piros, 5 sárga
export const TwoColorRowSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const red = [2, 3, 6];
  const w = 52;
  const x0 = 72;
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      <text x="280" y="32" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        3 egyforma piros és 5 egyforma sárga elem egy sorban
      </text>
      {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => {
        const isRed = red.includes(i);
        return (
          <g key={i}>
            <text x={x0 + (i - 1) * w + w / 2} y="62" fontSize="12" textAnchor="middle" fill="#64748b">{i}.</text>
            <circle
              cx={x0 + (i - 1) * w + w / 2}
              cy="92"
              r="19"
              fill={isRed ? '#ef4444' : '#facc15'}
              stroke={isRed ? '#991b1b' : '#a16207'}
              strokeWidth="2"
            />
          </g>
        );
      })}
      <text x="280" y="140" fontSize="13" textAnchor="middle" fill="#334155">
        A 3-2-6 és a 6-2-3 kijelölés ugyanazt a sort adja → a sorrend nem számít.
      </text>
      <text x="150" y="196" fontSize="13" textAnchor="middle" fill="#991b1b" fontWeight="bold">piros helyek:</text>
      <SvgBinom x={225} y={190} n={8} k={3} color="#991b1b" />
      <text x="280" y="196" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">= 56 =</text>
      <SvgBinom x={335} y={190} n={8} k={5} color="#a16207" />
      <text x="420" y="196" fontSize="13" textAnchor="middle" fill="#a16207" fontWeight="bold">:sárga helyek</text>
    </svg>
  );
};

// 3. ábra: 7 pont a körvonalon, mindegyiket mindegyikkel összekötjük (2. feladat D)
export const CircleChordsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cx = 170;
  const cy = 150;
  const R = 110;
  const pts = Array.from({ length: 7 }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / 7;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  const lines: React.ReactNode[] = [];
  for (let i = 0; i < 7; i++)
    for (let j = i + 1; j < 7; j++)
      lines.push(
        <line key={`${i}-${j}`} x1={pts[i].x} y1={pts[i].y} x2={pts[j].x} y2={pts[j].y} stroke="#0d9488" strokeWidth="1.6" opacity="0.75" />
      );
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4" />
      {lines}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="6" fill="#0f766e" />
          <text x={cx + (R + 18) * Math.cos(-Math.PI / 2 + (2 * Math.PI * i) / 7)} y={cy + (R + 18) * Math.sin(-Math.PI / 2 + (2 * Math.PI * i) / 7) + 5} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#134e4a">
              {String.fromCharCode(65 + i)}
          </text>
        </g>
      ))}
      <text x="420" y="60" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">7 pont, minden pár egy szakasz</text>
      <text x="420" y="92" fontSize="12" textAnchor="middle" fill="#334155">Az AB és a BA ugyanaz a szakasz,</text>
      <text x="420" y="110" fontSize="12" textAnchor="middle" fill="#334155">ezért a 7 · 6 rendezett párt 2-vel osztjuk.</text>
      <SvgBinom x={360} y={160} n={7} k={2} color="#0f766e" />
      <text x="385" y="166" fontSize="15" fontWeight="bold" fill="#0f766e">= 7 · 6 / 2 = 21</text>
      <rect x="300" y="200" width="240" height="72" rx="10" fill="#ffffff" stroke="#99f6e4" />
      <text x="420" y="224" fontSize="12" textAnchor="middle" fill="#134e4a">Ugyanez: kézfogás, körmérkőzés, 2 kártya → 21</text>
      <text x="420" y="248" fontSize="12" textAnchor="middle" fill="#9a3412">SMS, hajók, titkár + jegyző → 7 · 6 = 42</text>
      <text x="420" y="264" fontSize="10.5" textAnchor="middle" fill="#64748b">(ott számít a sorrend / a szerep)</text>
    </svg>
  );
};

// 4. ábra: Egy 7 elemű halmaz részhalmazai elemszám szerint (3. feladat)
export const SubsetCountsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const vals = Array.from({ length: 8 }, (_, k) => C(7, k));
  const max = 35;
  const w = 52;
  const x0 = 64;
  const base = 230;
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Egy 7 elemű halmaz k elemű részhalmazainak száma
      </text>
      <line x1={x0 - 10} y1={base} x2={x0 + 8 * w} y2={base} stroke="#475569" strokeWidth="1.5" />
      {vals.map((v, k) => {
        const h = (v / max) * 160;
        const mirrored = k >= 4;
        return (
          <g key={k}>
            <rect x={x0 + k * w + 6} y={base - h} width={w - 12} height={h} rx="5" fill={mirrored ? '#93c5fd' : '#2563eb'} />
            <text x={x0 + k * w + w / 2} y={base - h - 6} fontSize="13" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">{v}</text>
            <text x={x0 + k * w + w / 2} y={base + 18} fontSize="12" textAnchor="middle" fill="#334155">k = {k}</text>
          </g>
        );
      })}
      <text x="280" y="270" fontSize="13" textAnchor="middle" fill="#1e3a8a" fontWeight="bold">
        Szimmetrikus: (7 alatt k) = (7 alatt 7 − k)   •   Összesen: 1 + 7 + 21 + 35 + 35 + 21 + 7 + 1 = 128 = 2⁷
      </text>
    </svg>
  );
};

// 5. ábra: A Földrajzi Múzeum látogatói (6. feladat)
export const MuseumVisitorsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    ['10.00–11.00', 22, 2],
    ['11.01–12.00', 30, 10],
    ['12.01–13.00', 35, 45],
    ['13.01–14.00', 40, 36],
    ['14.01–15.00', 37, 43]
  ] as const;
  let inside = 0;
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Földrajzi Múzeum – érkezők és távozók óránként
      </text>
      {['Óra', 'Érkezők', 'Távozók', 'Bent az óra végén'].map((h, i) => (
        <text key={h} x={[90, 220, 320, 450][i]} y="62" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#334155">{h}</text>
      ))}
      <line x1="25" y1="70" x2="535" y2="70" stroke="#94a3b8" />
      {rows.map((r, i) => {
        inside += r[1] - r[2];
        const hl = i === 3;
        return (
          <g key={r[0]}>
            {hl && <rect x="25" y={76 + i * 30} width="510" height="26" rx="6" fill="#dcfce7" />}
            <text x="90" y={94 + i * 30} fontSize="12.5" textAnchor="middle" fill="#0f172a">{r[0]}</text>
            <text x="220" y={94 + i * 30} fontSize="12.5" textAnchor="middle" fill="#047857">{r[1]}</text>
            <text x="320" y={94 + i * 30} fontSize="12.5" textAnchor="middle" fill="#b91c1c">{r[2]}</text>
            <text x="450" y={94 + i * 30} fontSize="12.5" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">{inside}</text>
          </g>
        );
      })}
      <text x="280" y="250" fontSize="12.5" textAnchor="middle" fill="#14532d">
        14 órakor bent: 127 − 93 = 34 fő → 3 riportalany: (34 alatt 3) = 5984
      </text>
      <text x="280" y="274" fontSize="12.5" textAnchor="middle" fill="#1e3a8a">
        15 óra után (utolsó fél óra, zárás) távozik 28 fő → 4 riportalany: (28 alatt 4) = 20 475
      </text>
    </svg>
  );
};
