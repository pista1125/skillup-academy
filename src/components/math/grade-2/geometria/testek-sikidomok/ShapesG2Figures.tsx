import React from 'react';
import { SHAPES_FONT, SolidPart, FlatPart, SticksPart, CubeBuildingPart, SolidKind, SOLID_NAMES, FlatKind, FLAT_NAMES } from './ShapesG2Parts';

const WRAP = 'w-full max-w-[480px] h-auto mx-auto';

/** Test vagy síkidom? */
export const SolidVsFlatSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SHAPES_FONT}>
    <rect x="1" y="1" width="358" height="168" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="12" y="12" width="164" height="146" rx="12" fill="#fff7ed" stroke="#fb923c" strokeWidth="2" />
    <text x="94" y="32" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#c2410c">TESTEK</text>
    <SolidPart kind="kocka" cx={55} cy={75} s={0.9} />
    <SolidPart kind="gomb" cx={130} cy={75} s={0.9} />
    <SolidPart kind="henger" cx={55} cy={128} s={0.8} />
    <SolidPart kind="kup" cx={130} cy={126} s={0.8} />
    <rect x="184" y="12" width="164" height="146" rx="12" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
    <text x="266" y="32" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">SÍKIDOMOK</text>
    <FlatPart kind="negyzet" cx={225} cy={75} s={0.9} />
    <FlatPart kind="kor" cx={305} cy={75} s={0.9} />
    <FlatPart kind="teglalap" cx={225} cy={128} s={0.8} />
    <FlatPart kind="haromszog" cx={305} cy={126} s={0.8} />
  </svg>
);

/** A hat test névvel. */
export const SolidsGallerySvg: React.FC<{ className?: string }> = ({ className = WRAP }) => {
  const kinds: SolidKind[] = ['kocka', 'teglatest', 'gomb', 'henger', 'kup', 'gula'];
  return (
    <svg viewBox="0 0 360 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SHAPES_FONT}>
      <rect x="1" y="1" width="358" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {kinds.map((k, i) => {
        const cx = 65 + (i % 3) * 115;
        const cy = 52 + Math.floor(i / 3) * 95;
        return (
          <g key={k}>
            <SolidPart kind={k} cx={cx} cy={cy} s={1.05} />
            <text x={cx} y={cy + 45} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
              {SOLID_NAMES[k]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Testek lapjainak körberajzolása. */
export const FacesPrintSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => {
  const rows: { solid: SolidKind; flat: FlatKind[] }[] = [
    { solid: 'kocka', flat: ['negyzet'] },
    { solid: 'henger', flat: ['kor'] },
    { solid: 'kup', flat: ['kor'] },
    { solid: 'gula', flat: ['negyzet', 'haromszog'] }
  ];
  return (
    <svg viewBox="0 0 360 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SHAPES_FONT}>
      <rect x="1" y="1" width="358" height="178" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {rows.map((r, i) => {
        const cx = 48 + i * 88;
        return (
          <g key={r.solid}>
            <SolidPart kind={r.solid} cx={cx} cy={45} s={0.85} />
            <text x={cx} y={88} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
              {SOLID_NAMES[r.solid]}
            </text>
            <path d={`M ${cx} 94 L ${cx} 106`} stroke="#64748b" strokeWidth="2" />
            <polygon points={`${cx - 4},104 ${cx + 4},104 ${cx},110`} fill="#64748b" />
            {r.flat.map((f, j) => (
              <FlatPart key={f} kind={f} cx={cx + (r.flat.length === 2 ? (j === 0 ? -19 : 19) : 0)} cy={140} s={r.flat.length === 2 ? 0.62 : 0.8} outline />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/** Síkidomok oldalainak száma. */
export const FlatShapesSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => {
  const kinds: FlatKind[] = ['haromszog', 'negyzet', 'teglalap', 'otszog', 'hatszog', 'kor'];
  return (
    <svg viewBox="0 0 360 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SHAPES_FONT}>
      <rect x="1" y="1" width="358" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {kinds.map((k, i) => {
        const cx = 65 + (i % 3) * 115;
        const cy = 48 + Math.floor(i / 3) * 95;
        return (
          <g key={k}>
            <FlatPart kind={k} cx={cx} cy={cy} s={1} />
            <text x={cx} y={cy + 42} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
              {FLAT_NAMES[k]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Oldal és csúcs a háromszögön. */
export const SideCornerSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SHAPES_FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <polygon points="110,25 185,135 35,135" fill="#e0f2fe" stroke="#0369a1" strokeWidth="3" strokeLinejoin="round" />
    <line x1="35" y1="135" x2="185" y2="135" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
    <circle cx="110" cy="25" r="7" fill="#7c3aed" />
    <circle cx="185" cy="135" r="7" fill="#7c3aed" />
    <circle cx="35" cy="135" r="7" fill="#7c3aed" />
    <text x="110" y="152" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">oldal</text>
    <text x="135" y="28" fontSize="13" fontWeight="bold" fill="#7c3aed">csúcs</text>
    <text x="215" y="60" fontSize="13" fill="#0f172a">3 oldal</text>
    <text x="215" y="80" fontSize="13" fill="#0f172a">3 csúcs</text>
    <SticksPart kind="negyzet" cx={300} cy={110} s={0.85} />
    <text x="300" y="150" textAnchor="middle" fontSize="11" fill="#475569">4 pálcika = 4 oldal</text>
  </svg>
);

/** Építés kockákból. */
export const CubeBuildSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SHAPES_FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="10" y="118" width="340" height="6" rx="3" fill="#a8a29e" />
    <CubeBuildingPart heights={[1, 1, 1, 1, 1]} x={18} y={118} size={20} />
    <CubeBuildingPart heights={[2, 3, 1]} x={150} y={118} size={20} color="#fca5a5" />
    <CubeBuildingPart heights={[2, 2]} x={258} y={118} size={20} depth={2} color="#86efac" />
    <text x="68" y="145" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">5 kocka</text>
    <text x="180" y="145" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">2 + 3 + 1 = 6 kocka</text>
    <text x="290" y="145" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">elöl 4, hátul 4</text>
  </svg>
);
