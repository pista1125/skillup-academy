import React from 'react';
import { FONT, INK, FitPieces, shapePolys, Cell, Half, Pt, PalName } from './AreaG3Parts';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosítóhoz (≈150 × 80) és a Csoportosítóhoz (≈80 × 80).
// Vastag körvonal, jól látható belső vonalak, nincs felirat, ami elárulná a választ.
// ---------------------------------------------------------------------------

type Size = 'm' | 's';
const dims = (size: Size) => (size === 'm' ? { W: 150, H: 80 } : { W: 80, H: 80 });

/** Tetszőleges darabokból álló síkidom kártyán. */
export const CardPolys: React.FC<{ polys: Pt[][]; size?: Size; pal?: PalName; maxS?: number }> = ({ polys, size = 'm', pal = 'green', maxS = 30 }) => {
  const { W, H } = dims(size);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <FitPieces polys={polys} bx={5} by={5} bw={W - 10} bh={H - 10} maxS={maxS} pal={pal} inner={2} outline={3.5} />
    </svg>
  );
};

/** Kis négyzetekből (és fél négyzetekből) álló síkidom kártyán. */
export const CardShape: React.FC<{ cells: Cell[]; halves?: Half[]; size?: Size; pal?: PalName; maxS?: number }> = ({ cells, halves = [], size = 'm', pal = 'green', maxS }) => (
  <CardPolys polys={shapePolys(cells, halves)} size={size} pal={pal} maxS={maxS} />
);

/** Dominókból (2 kis négyzet) álló síkidom: a dominók bal felső cellái és iránya. */
export const dominoPolys = (list: [number, number, 'h' | 'v'][]): Pt[][] =>
  list.map(([c, r, d]) =>
    d === 'h'
      ? [
          [c, r],
          [c + 2, r],
          [c + 2, r + 1],
          [c, r + 1]
        ]
      : [
          [c, r],
          [c + 1, r],
          [c + 1, r + 2],
          [c, r + 2]
        ]
  );

/** Ikonok a „Mit mérünk?” csoportosítóhoz (terület / kerület / más). */
export const CardIcon: React.FC<{ kind: 'tiles' | 'fence' | 'carpet' | 'frame' | 'scale' | 'jug' | 'clock' | 'lawn' | 'lace' | 'tape' }> = ({ kind }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {kind === 'tiles' && (
      <g stroke="#475569" strokeWidth="2.5">
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={10 + c * 20} y={10 + r * 20} width="20" height="20" fill={(r + c) % 2 ? '#bae6fd' : '#e0f2fe'} />))}
      </g>
    )}
    {kind === 'fence' && (
      <g stroke="#78350f" strokeWidth="3">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M ${12 + i * 14} 66 V 24 l 5 -8 l 5 8 V 66`} fill="#fbbf24" />
        ))}
        <line x1="6" y1="34" x2="74" y2="34" />
        <line x1="6" y1="56" x2="74" y2="56" />
      </g>
    )}
    {kind === 'carpet' && (
      <g>
        <rect x="10" y="18" width="60" height="44" rx="3" fill="#f9a8d4" stroke="#9d174d" strokeWidth="3" />
        <rect x="20" y="28" width="40" height="24" fill="#fbcfe8" stroke="#9d174d" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} stroke="#9d174d" strokeWidth="2.5">
            <line x1={14 + i * 13} y1="62" x2={14 + i * 13} y2="70" />
            <line x1={14 + i * 13} y1="10" x2={14 + i * 13} y2="18" />
          </g>
        ))}
      </g>
    )}
    {kind === 'frame' && (
      <g>
        <rect x="12" y="12" width="56" height="56" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
        <rect x="22" y="22" width="36" height="36" fill="#fff" stroke="#92400e" strokeWidth="2.5" />
        <path d="M 26 54 L 36 40 L 44 48 L 50 42 L 56 54 Z" fill="#86efac" stroke="#166534" strokeWidth="2" />
      </g>
    )}
    {kind === 'scale' && (
      <g stroke="#334155" strokeWidth="3" fill="none">
        <line x1="40" y1="16" x2="40" y2="66" />
        <line x1="14" y1="24" x2="66" y2="24" />
        <path d="M 8 44 Q 20 54 32 44 Z" fill="#e2e8f0" />
        <path d="M 48 44 Q 60 54 72 44 Z" fill="#e2e8f0" />
        <line x1="14" y1="24" x2="8" y2="44" />
        <line x1="14" y1="24" x2="32" y2="44" />
        <line x1="66" y1="24" x2="48" y2="44" />
        <line x1="66" y1="24" x2="72" y2="44" />
        <line x1="26" y1="68" x2="54" y2="68" />
      </g>
    )}
    {kind === 'jug' && (
      <g stroke="#1e40af" strokeWidth="3">
        <path d="M 22 18 H 54 L 52 68 H 24 Z" fill="#dbeafe" />
        <path d="M 23 40 H 53 L 52 68 H 24 Z" fill="#60a5fa" />
        <path d="M 54 26 Q 68 30 64 44 Q 60 52 53 50" fill="none" />
      </g>
    )}
    {kind === 'clock' && (
      <g stroke={INK} strokeWidth="3">
        <circle cx="40" cy="40" r="28" fill="#fff" />
        <line x1="40" y1="40" x2="40" y2="20" />
        <line x1="40" y1="40" x2="54" y2="40" />
      </g>
    )}
    {kind === 'lawn' && (
      <g>
        <rect x="8" y="22" width="64" height="40" fill="#86efac" stroke="#166534" strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M ${16 + i * 10} 54 l 3 -10 l 3 10`} fill="none" stroke="#166534" strokeWidth="2.5" />
        ))}
      </g>
    )}
    {kind === 'lace' && (
      <g>
        <rect x="16" y="16" width="48" height="48" fill="#fff" stroke="#c026d3" strokeWidth="3.5" strokeDasharray="6 4" />
        <rect x="24" y="24" width="32" height="32" fill="#f5d0fe" stroke="#a21caf" strokeWidth="2" />
      </g>
    )}
    {kind === 'tape' && (
      <g>
        <circle cx="30" cy="40" r="20" fill="#fde047" stroke="#854d0e" strokeWidth="3" />
        <circle cx="30" cy="40" r="6" fill="#fff" stroke="#854d0e" strokeWidth="2.5" />
        <rect x="30" y="54" width="44" height="12" fill="#fef9c3" stroke="#854d0e" strokeWidth="2.5" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={40 + i * 9} y1="54" x2={40 + i * 9} y2="60" stroke="#854d0e" strokeWidth="2" />
        ))}
      </g>
    )}
  </svg>
);
