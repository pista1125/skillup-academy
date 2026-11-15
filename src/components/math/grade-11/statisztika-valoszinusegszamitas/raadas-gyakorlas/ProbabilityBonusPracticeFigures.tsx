import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** A 2020-as tokiói olimpia 13 magyar vívója (1. feladat). */
export const PROBABILITY_BONUS_FENCERS: { name: string; age: number; event: string; female: boolean; medal: boolean }[] = [
  { name: 'Kreiss Fanni', age: 32, event: 'női tőr', female: true, medal: false },
  { name: 'Kondricz Kata', age: 23, event: 'női tőr', female: true, medal: false },
  { name: 'Pásztor Flóra', age: 23, event: 'női tőr', female: true, medal: false },
  { name: 'Mohamed Aida', age: 45, event: 'női tőr', female: true, medal: false },
  { name: 'Márton Anna', age: 26, event: 'női kard', female: true, medal: false },
  { name: 'Pusztai Liza', age: 20, event: 'női kard', female: true, medal: false },
  { name: 'Katona Renáta', age: 26, event: 'női kard', female: true, medal: false },
  { name: 'Battai Sugár Katinka', age: 18, event: 'női kard', female: true, medal: false },
  { name: 'Decsi Tamás', age: 38, event: 'férfi kard', female: false, medal: true },
  { name: 'Gémesi Csanád', age: 34, event: 'férfi kard', female: false, medal: true },
  { name: 'Szatmári András', age: 28, event: 'férfi kard', female: false, medal: true },
  { name: 'Szilágyi Áron', age: 31, event: 'férfi kard', female: false, medal: true },
  { name: 'Siklósi Gergely', age: 23, event: 'férfi párbajtőr', female: false, medal: true }
];

// 1. ábra: a vívók táblázata (érmesek csillaggal)
export const ProbabilityBonusPracticeFencersSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const groups = ['női tőr', 'női kard', 'férfi kard', 'férfi párbajtőr'];
  const pos: Record<string, { x: number; y: number }> = {
    'női tőr': { x: 14, y: 40 },
    'női kard': { x: 224, y: 40 },
    'férfi kard': { x: 14, y: 170 },
    'férfi párbajtőr': { x: 224, y: 170 }
  };
  return (
    <svg viewBox="0 0 440 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="432" height="292" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="220" y="26" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Tokió 2020 – a magyar vívók életkora
      </text>
      {groups.map((g) => {
        const members = PROBABILITY_BONUS_FENCERS.filter((f) => f.event === g);
        const { x, y } = pos[g];
        return (
          <g key={g}>
            <rect x={x} y={y} width="202" height={24 + members.length * 22} rx="8" fill={g.startsWith('női') ? '#fdf2f8' : '#eff6ff'} stroke={g.startsWith('női') ? '#db2777' : '#2563eb'} />
            <text x={x + 10} y={y + 17} fontSize="12" fontWeight="bold" fill={g.startsWith('női') ? '#9d174d' : '#1e40af'}>{g}</text>
            {members.map((m, i) => (
              <g key={m.name}>
                <text x={x + 10} y={y + 40 + i * 22} fontSize="11" fill="#0f172a">
                  {m.name}
                  {m.medal ? ' ★' : ''}
                </text>
                <text x={x + 192} y={y + 40 + i * 22} fontSize="11" fontWeight="bold" textAnchor="end" fill="#0f172a">{m.age}</text>
              </g>
            ))}
          </g>
        );
      })}
      <text x="430" y="290" fontSize="10" textAnchor="end" fill="#475569">★ = érmet nyert Tokióban</text>
    </svg>
  );
};

// 2. ábra: a védekező erő (a nagyobbik dobás) 6 × 6-os táblázata
export const ProbabilityBonusPracticeMaxTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const c = 40;
  const x0 = 70;
  const y0 = 50;
  const colors = ['#f1f5f9', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9'];
  return (
    <svg viewBox="0 0 340 330" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="332" height="322" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="170" y="24" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Védekező erő = a nagyobbik dobás
      </text>
      <text x="40" y="44" fontSize="11" textAnchor="middle" fill="#0f172a">max</text>
      {[1, 2, 3, 4, 5, 6].map((v) => (
        <g key={`h${v}`}>
          <text x={x0 + (v - 0.5) * c} y={y0 - 6} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0369a1">{v}</text>
          <text x={x0 - 14} y={y0 + (v - 0.5) * c + 4} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#be123c">{v}</text>
        </g>
      ))}
      {[1, 2, 3, 4, 5, 6].map((a) =>
        [1, 2, 3, 4, 5, 6].map((b) => {
          const m = Math.max(a, b);
          return (
            <g key={`${a}-${b}`}>
              <rect x={x0 + (b - 1) * c} y={y0 + (a - 1) * c} width={c} height={c} fill={colors[m - 1]} stroke="#94a3b8" />
              <text x={x0 + (b - 0.5) * c} y={y0 + (a - 0.5) * c + 4} fontSize="13" textAnchor="middle" fill="#0f172a">{m}</text>
            </g>
          );
        })
      )}
      <text x="170" y="316" fontSize="11" textAnchor="middle" fill="#334155">a k érték „L alakban” 2k − 1 cellában áll</text>
    </svg>
  );
};

const DOMINO_PIPS: Record<number, [number, number][]> = {
  0: [],
  1: [[0.5, 0.5]],
  2: [[0.25, 0.25], [0.75, 0.75]],
  3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
  4: [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]],
  5: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]],
  6: [[0.25, 0.22], [0.75, 0.22], [0.25, 0.5], [0.75, 0.5], [0.25, 0.78], [0.75, 0.78]]
};

/** Vízszintes dominókő (két négyzet alakú fél). */
export const ProbabilityBonusDominoTile: React.FC<{ x: number; y: number; s: number; a: number; b: number; fill?: string }> = ({ x, y, s, a, b, fill = '#ffffff' }) => (
  <g>
    <rect x={x} y={y} width={2 * s} height={s} rx={s * 0.15} fill={fill} stroke="#0f172a" strokeWidth="1.5" />
    <line x1={x + s} y1={y + s * 0.12} x2={x + s} y2={y + s * 0.88} stroke="#0f172a" />
    {DOMINO_PIPS[a].map(([px, py], i) => (
      <circle key={`a${i}`} cx={x + px * s} cy={y + py * s} r={s * 0.08} fill="#0f172a" />
    ))}
    {DOMINO_PIPS[b].map(([px, py], i) => (
      <circle key={`b${i}`} cx={x + s + px * s} cy={y + py * s} r={s * 0.08} fill="#0f172a" />
    ))}
  </g>
);

// 3. ábra: az 1–5-ös dominóhoz illeszthető kövek
export const ProbabilityBonusPracticeDominoSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ones = [0, 1, 2, 3, 4, 6].map((v) => [1, v] as [number, number]);
  const fives = [0, 2, 3, 4, 5, 6].map((v) => [5, v] as [number, number]);
  const s = 22;
  return (
    <svg viewBox="0 0 440 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="432" height="242" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="20" y="28" fontSize="12" fontWeight="bold" fill="#0c4a6e">A kivett kő:</text>
      <ProbabilityBonusDominoTile x={110} y={12} s={26} a={1} b={5} fill="#fef3c7" />
      <text x="20" y="80" fontSize="11" fill="#334155">1-es oldallal illeszthető (6 db):</text>
      {ones.map(([a, b], i) => (
        <ProbabilityBonusDominoTile key={`o${i}`} x={20 + i * 68} y={90} s={s} a={a} b={b} fill="#e0f2fe" />
      ))}
      <text x="20" y="145" fontSize="11" fill="#334155">5-ös oldallal illeszthető (6 db):</text>
      {fives.map(([a, b], i) => (
        <ProbabilityBonusDominoTile key={`f${i}`} x={20 + i * 68} y={155} s={s} a={a} b={b} fill="#dcfce7" />
      ))}
      <text x="220" y="226" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f172a">
        12 kedvező a maradék 27 kőből
      </text>
    </svg>
  );
};

// 4. ábra: hat gyerek sorban, Sári és Dóri egymás mögött („blokk”)
export const ProbabilityBonusPracticeLineupSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const kids = ['?', 'S', 'D', '?', '?', '?'];
  return (
    <svg viewBox="0 0 440 170" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="432" height="162" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="220" y="26" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        6 gyerek sorban: Sári (S) és Dóri (D) egymás mögött
      </text>
      <text x="30" y="90" fontSize="11" fill="#334155">eleje</text>
      <text x="410" y="90" fontSize="11" textAnchor="end" fill="#334155">vége</text>
      {kids.map((k, i) => {
        const cx = 80 + i * 56;
        const special = k !== '?';
        return (
          <g key={i}>
            <circle cx={cx} cy="58" r="12" fill={special ? '#fbcfe8' : '#e2e8f0'} stroke={special ? '#db2777' : '#64748b'} />
            <rect x={cx - 14} y="72" width="28" height="34" rx="8" fill={special ? '#fbcfe8' : '#e2e8f0'} stroke={special ? '#db2777' : '#64748b'} />
            <text x={cx} y="94" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0f172a">{k}</text>
          </g>
        );
      })}
      <rect x="120" y="40" width="88" height="72" rx="12" fill="none" stroke="#db2777" strokeWidth="2" strokeDasharray="5 4" />
      <text x="220" y="134" fontSize="11" textAnchor="middle" fill="#334155">
        a „blokk” 5 helyen lehet, a blokkon belül 2 sorrend
      </text>
      <text x="220" y="152" fontSize="11" textAnchor="middle" fill="#334155">
        kedvező: 5 · 2 · 4! = 240, összes: 6! = 720
      </text>
    </svg>
  );
};

// 5. ábra: Molnár úr kulcsai – valószínűségi fa
export const ProbabilityBonusPracticeKeysTreeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 440 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="432" height="212" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="220" y="24" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
      4 kulcs, 1 jó – először rossz, másodszorra jó
    </text>
    <circle cx="40" cy="115" r="8" fill="#0284c7" />
    <line x1="48" y1="111" x2="170" y2="60" stroke="#16a34a" strokeWidth="2" />
    <line x1="48" y1="119" x2="170" y2="165" stroke="#dc2626" strokeWidth="3" />
    <text x="100" y="72" fontSize="12" fill="#16a34a">1/4</text>
    <text x="100" y="164" fontSize="12" fill="#dc2626" fontWeight="bold">3/4</text>
    <rect x="172" y="46" width="70" height="26" rx="6" fill="#dcfce7" stroke="#16a34a" />
    <text x="207" y="64" fontSize="11" textAnchor="middle" fill="#14532d">1. jó</text>
    <rect x="172" y="152" width="70" height="26" rx="6" fill="#fee2e2" stroke="#dc2626" />
    <text x="207" y="170" fontSize="11" textAnchor="middle" fill="#7f1d1d">1. rossz</text>
    <line x1="242" y1="160" x2="330" y2="120" stroke="#16a34a" strokeWidth="3" />
    <line x1="242" y1="170" x2="330" y2="196" stroke="#dc2626" strokeWidth="2" />
    <text x="276" y="128" fontSize="12" fill="#16a34a" fontWeight="bold">1/3</text>
    <text x="276" y="200" fontSize="12" fill="#dc2626">2/3</text>
    <rect x="332" y="106" width="96" height="26" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
    <text x="380" y="124" fontSize="11" textAnchor="middle" fill="#14532d">2. jó</text>
    <rect x="332" y="183" width="96" height="26" rx="6" fill="#fee2e2" stroke="#dc2626" />
    <text x="380" y="201" fontSize="11" textAnchor="middle" fill="#7f1d1d">2. rossz</text>
    <text x="380" y="96" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f172a">3/4 · 1/3 = 1/4</text>
  </svg>
);
