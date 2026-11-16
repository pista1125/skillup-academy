import React from 'react';

// ---------------------------------------------------------------------------
// Közös adatok: a „Kisváros” térképe (oszlopok A–F, sorok 1–5, az 1. sor felül)
// ---------------------------------------------------------------------------
export type MapPlace = { code: string; name: string; kind: string };
export const MAP_COLS = ['A', 'B', 'C', 'D', 'E', 'F'];
export const MAP_ROWS = 5;
export const MAP_PLACES: MapPlace[] = [
  { code: 'A1', name: 'kút', kind: 'well' },
  { code: 'D1', name: 'templom', kind: 'church' },
  { code: 'B2', name: 'iskola', kind: 'school' },
  { code: 'F2', name: 'uszoda', kind: 'pool' },
  { code: 'A3', name: 'mozi', kind: 'cinema' },
  { code: 'C3', name: 'posta', kind: 'post' },
  { code: 'E3', name: 'fagyizó', kind: 'ice' },
  { code: 'A4', name: 'bolt', kind: 'shop' },
  { code: 'E4', name: 'park', kind: 'park' },
  { code: 'B5', name: 'pékség', kind: 'bakery' },
  { code: 'D5', name: 'focipálya', kind: 'football' },
  { code: 'F5', name: 'könyvtár', kind: 'library' }
];

/** Egy hely kis ikonja (cx, cy középponttal, kb. 30 px). */
export const PlaceIcon: React.FC<{ kind: string; cx: number; cy: number; s?: number }> = ({ kind, cx, cy, s = 1 }) => {
  const g = (children: React.ReactNode) => <g transform={`translate(${cx} ${cy}) scale(${s})`}>{children}</g>;
  switch (kind) {
    case 'well':
      return g(
        <>
          <rect x={-9} y={-2} width={18} height={10} fill="#a8a29e" stroke="#44403c" />
          <ellipse cx={0} cy={-2} rx={9} ry={3} fill="#38bdf8" stroke="#44403c" />
          <line x1={-8} y1={-2} x2={-8} y2={-12} stroke="#78350f" strokeWidth={2} />
          <line x1={8} y1={-2} x2={8} y2={-12} stroke="#78350f" strokeWidth={2} />
          <polygon points="-11,-12 0,-17 11,-12" fill="#b91c1c" />
        </>
      );
    case 'church':
      return g(
        <>
          <rect x={-8} y={-6} width={16} height={14} fill="#fde68a" stroke="#92400e" />
          <polygon points="-10,-6 0,-15 10,-6" fill="#b45309" />
          <line x1={0} y1={-15} x2={0} y2={-22} stroke="#92400e" strokeWidth={1.5} />
          <line x1={-3} y1={-19} x2={3} y2={-19} stroke="#92400e" strokeWidth={1.5} />
        </>
      );
    case 'school':
      return g(
        <>
          <rect x={-12} y={-6} width={24} height={14} fill="#fca5a5" stroke="#991b1b" />
          <polygon points="-14,-6 0,-15 14,-6" fill="#991b1b" />
          {[-8, -2, 4].map((x) => (
            <rect key={x} x={x} y={-3} width={4} height={4} fill="#ffffff" />
          ))}
        </>
      );
    case 'pool':
      return g(
        <>
          <rect x={-13} y={-9} width={26} height={17} rx={3} fill="#38bdf8" stroke="#075985" />
          <path d="M-10 -2 q3 -3 6 0 q3 3 6 0 q3 -3 6 0" fill="none" stroke="#ffffff" strokeWidth={1.5} />
          <path d="M-10 3 q3 -3 6 0 q3 3 6 0 q3 -3 6 0" fill="none" stroke="#ffffff" strokeWidth={1.5} />
        </>
      );
    case 'cinema':
      return g(
        <>
          <rect x={-12} y={-9} width={24} height={16} fill="#1e293b" />
          <rect x={-9} y={-6} width={18} height={10} fill="#fde047" />
          <polygon points="-3,-4 -3,2 3,-1" fill="#1e293b" />
        </>
      );
    case 'post':
      return g(
        <>
          <rect x={-12} y={-8} width={24} height={16} fill="#fef3c7" stroke="#b45309" />
          <polyline points="-12,-8 0,1 12,-8" fill="none" stroke="#b45309" strokeWidth={1.5} />
        </>
      );
    case 'ice':
      return g(
        <>
          <polygon points="-6,-2 6,-2 0,12" fill="#f59e0b" />
          <circle cx={0} cy={-6} r={6} fill="#f9a8d4" />
          <circle cx={-3} cy={-10} r={4} fill="#a7f3d0" />
        </>
      );
    case 'shop':
      return g(
        <>
          <rect x={-11} y={-4} width={22} height={12} fill="#bbf7d0" stroke="#166534" />
          <path d="M-13 -4 L-11 -11 L11 -11 L13 -4 Z" fill="#16a34a" />
          <rect x={-3} y={1} width={6} height={7} fill="#166534" />
        </>
      );
    case 'park':
      return g(
        <>
          <circle cx={-6} cy={-4} r={7} fill="#22c55e" />
          <circle cx={6} cy={-6} r={8} fill="#16a34a" />
          <rect x={-7} y={2} width={2} height={7} fill="#78350f" />
          <rect x={5} y={1} width={2} height={8} fill="#78350f" />
        </>
      );
    case 'bakery':
      return g(
        <>
          <ellipse cx={0} cy={0} rx={12} ry={7} fill="#d97706" stroke="#78350f" />
          <path d="M-6 -5 q2 5 0 10 M0 -6 q2 6 0 12 M6 -5 q2 5 0 10" fill="none" stroke="#fde68a" strokeWidth={1.5} />
        </>
      );
    case 'football':
      return g(
        <>
          <rect x={-13} y={-9} width={26} height={17} fill="#4ade80" stroke="#ffffff" strokeWidth={1.5} />
          <line x1={0} y1={-9} x2={0} y2={8} stroke="#ffffff" strokeWidth={1.2} />
          <circle cx={0} cy={-0.5} r={3.5} fill="none" stroke="#ffffff" strokeWidth={1.2} />
        </>
      );
    case 'library':
      return g(
        <>
          {[-10, -4, 2, 8].map((x, i) => (
            <rect key={x} x={x} y={-10 + (i % 2) * 2} width={5} height={18 - (i % 2) * 2} fill={['#ef4444', '#3b82f6', '#eab308', '#22c55e'][i]} stroke="#1e293b" strokeWidth={0.6} />
          ))}
        </>
      );
    default:
      return null;
  }
};

/** A Kisváros térképe – a kvízben és a laborban is használható. */
export const TownMap: React.FC<{
  u?: number;
  highlight?: string;
  hideNames?: boolean;
  onCell?: (code: string) => void;
  marks?: Record<string, string>;
  showPlaces?: boolean;
}> = ({ u = 46, highlight, hideNames, onCell, marks, showPlaces = true }) => {
  const x0 = 26;
  const y0 = 26;
  return (
    <g fontFamily="system-ui, sans-serif">
      {MAP_COLS.map((c, i) => (
        <text key={c} x={x0 + i * u + u / 2} y={y0 - 8} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">
          {c}
        </text>
      ))}
      {Array.from({ length: MAP_ROWS }, (_, r) => (
        <text key={r} x={x0 - 12} y={y0 + r * u + u / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">
          {r + 1}
        </text>
      ))}
      {Array.from({ length: MAP_ROWS }, (_, r) =>
        MAP_COLS.map((c, i) => {
          const code = `${c}${r + 1}`;
          const hl = code === highlight;
          return (
            <rect
              key={code}
              x={x0 + i * u}
              y={y0 + r * u}
              width={u}
              height={u}
              fill={marks?.[code] ?? (hl ? '#fde68a' : (r + i) % 2 === 0 ? '#f0fdf4' : '#ecfeff')}
              stroke={hl ? '#d97706' : '#7dd3fc'}
              strokeWidth={hl ? 3 : 1}
              onClick={onCell ? () => onCell(code) : undefined}
              style={onCell ? { cursor: 'pointer' } : undefined}
            />
          );
        })
      )}
      {showPlaces &&
        MAP_PLACES.map((p) => {
          const i = MAP_COLS.indexOf(p.code[0]);
          const r = Number(p.code.slice(1)) - 1;
          const cx = x0 + i * u + u / 2;
          const cy = y0 + r * u + u / 2 - (hideNames ? 0 : 5);
          return (
            <g key={p.code} pointerEvents="none">
              <PlaceIcon kind={p.kind} cx={cx} cy={cy} s={u / 46} />
              {!hideNames && (
                <text x={cx} y={y0 + r * u + u - 4} textAnchor="middle" fontSize={9 * (u / 46)} fontWeight="bold" fill="#1e293b">
                  {p.name}
                </text>
              )}
            </g>
          );
        })}
    </g>
  );
};

// ---------------------------------------------------------------------------
// 1. A Kisváros térképe
// ---------------------------------------------------------------------------
export const TownMapSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 310 262" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="308" height="260" rx="12" fill="#ffffff" stroke="#e2e8f0" />
    <TownMap />
  </svg>
);

// ---------------------------------------------------------------------------
// 2. Hogyan olvassuk le a kódot? (C4: C oszlop, 4. sor)
// ---------------------------------------------------------------------------
export const CodeReadingSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 34;
  const x0 = 30;
  const y0 = 30;
  return (
    <svg viewBox="0 0 330 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="328" height="218" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      {['A', 'B', 'C', 'D', 'E'].map((c, i) => (
        <text key={c} x={x0 + i * u + u / 2} y={y0 - 8} textAnchor="middle" fontSize="13" fontWeight="bold" fill={c === 'C' ? '#c2410c' : '#0369a1'}>
          {c}
        </text>
      ))}
      {Array.from({ length: 5 }, (_, r) => (
        <text key={r} x={x0 - 12} y={y0 + r * u + u / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill={r === 3 ? '#7c3aed' : '#0369a1'}>
          {r + 1}
        </text>
      ))}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 5 }, (_, i) => {
          const inCol = i === 2;
          const inRow = r === 3;
          const fill = inCol && inRow ? '#fbbf24' : inCol ? '#fed7aa' : inRow ? '#ddd6fe' : '#ffffff';
          return <rect key={`${r}-${i}`} x={x0 + i * u} y={y0 + r * u} width={u} height={u} fill={fill} stroke="#94a3b8" />;
        })
      )}
      <text x={x0 + 2 * u + u / 2} y={y0 + 3 * u + u / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        C4
      </text>
      <text x="215" y="60" fontSize="12" fontWeight="bold" fill="#c2410c">1. az oszlop</text>
      <text x="215" y="76" fontSize="12" fontWeight="bold" fill="#c2410c">betűje: C</text>
      <text x="215" y="110" fontSize="12" fontWeight="bold" fill="#7c3aed">2. a sor</text>
      <text x="215" y="126" fontSize="12" fontWeight="bold" fill="#7c3aed">száma: 4</text>
      <text x="215" y="162" fontSize="12" fontWeight="bold" fill="#0f172a">Kód: C4</text>
      <text x="165" y="210" textAnchor="middle" fontSize="10" fill="#475569">Ahol az oszlop és a sor találkozik, ott a mező.</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 3. Sakktábla bábukkal (sakktábla-szerű jelölés: a–h, 1–8)
// ---------------------------------------------------------------------------
export const CHESS_POSITION: { sq: string; piece: string; name: string; white: boolean }[] = [
  { sq: 'e1', piece: '♔', name: 'király', white: true },
  { sq: 'd1', piece: '♕', name: 'vezér', white: true },
  { sq: 'a1', piece: '♖', name: 'bástya', white: true },
  { sq: 'h1', piece: '♖', name: 'bástya', white: true },
  { sq: 'c4', piece: '♗', name: 'futó', white: true },
  { sq: 'f3', piece: '♘', name: 'huszár', white: true },
  { sq: 'e4', piece: '♙', name: 'gyalog', white: true },
  { sq: 'e8', piece: '♚', name: 'király', white: false },
  { sq: 'd8', piece: '♛', name: 'vezér', white: false },
  { sq: 'a8', piece: '♜', name: 'bástya', white: false },
  { sq: 'b4', piece: '♝', name: 'futó', white: false },
  { sq: 'c6', piece: '♞', name: 'huszár', white: false },
  { sq: 'e5', piece: '♟', name: 'gyalog', white: false }
];
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const ChessBoard: React.FC<{ u?: number; x0?: number; y0?: number; highlight?: string; pieces?: boolean }> = ({
  u = 22,
  x0 = 24,
  y0 = 10,
  highlight,
  pieces = true
}) => (
  <g fontFamily="system-ui, sans-serif">
    {Array.from({ length: 8 }, (_, r) =>
      FILES.map((f, i) => {
        const rank = 8 - r;
        const sq = `${f}${rank}`;
        const dark = (i + rank) % 2 === 1;
        return (
          <rect
            key={sq}
            x={x0 + i * u}
            y={y0 + r * u}
            width={u}
            height={u}
            fill={sq === highlight ? '#fde047' : dark ? '#b45309' : '#fde68a'}
            stroke={sq === highlight ? '#dc2626' : 'none'}
            strokeWidth={sq === highlight ? 2 : 0}
          />
        );
      })
    )}
    {FILES.map((f, i) => (
      <text key={f} x={x0 + i * u + u / 2} y={y0 + 8 * u + 13} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
        {f}
      </text>
    ))}
    {Array.from({ length: 8 }, (_, r) => (
      <text key={r} x={x0 - 9} y={y0 + r * u + u / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
        {8 - r}
      </text>
    ))}
    {pieces &&
      CHESS_POSITION.map((p) => {
        const i = FILES.indexOf(p.sq[0]);
        const r = 8 - Number(p.sq[1]);
        return (
          <text
            key={p.sq}
            x={x0 + i * u + u / 2}
            y={y0 + r * u + u * 0.8}
            textAnchor="middle"
            fontSize={u * 0.85}
            fill={p.white ? '#ffffff' : '#0f172a'}
            stroke={p.white ? '#0f172a' : 'none'}
            strokeWidth={p.white ? 0.6 : 0}
          >
            {p.piece}
          </text>
        );
      })}
  </g>
);

export const ChessBoardSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="358" height="208" rx="12" fill="#ffffff" stroke="#e2e8f0" />
    <ChessBoard u={22} x0={24} y0={8} />
    <text x="220" y="30" fontSize="12" fontWeight="bold" fill="#0f172a">Bábu helye = oszlop + sor</text>
    <text x="220" y="52" fontSize="11" fill="#334155">világos király: e1</text>
    <text x="220" y="70" fontSize="11" fill="#334155">sötét király: e8</text>
    <text x="220" y="88" fontSize="11" fill="#334155">világos huszár: f3</text>
    <text x="220" y="106" fontSize="11" fill="#334155">világos bástyák:</text>
    <text x="230" y="122" fontSize="11" fill="#334155">a1 és h1</text>
    <text x="220" y="152" fontSize="10" fill="#475569">Oszlopok: a–h (kisbetű)</text>
    <text x="220" y="168" fontSize="10" fill="#475569">Sorok: 1–8 (az 1. sor alul,</text>
    <text x="220" y="182" fontSize="10" fill="#475569">a világos oldalán)</text>
  </svg>
);

// ---------------------------------------------------------------------------
// 4. A sakkbábuk nevei
// ---------------------------------------------------------------------------
export const ChessPiecesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const rows = [
    ['király', '♔', '♚'],
    ['vezér', '♕', '♛'],
    ['bástya', '♖', '♜'],
    ['futó', '♗', '♝'],
    ['huszár', '♘', '♞'],
    ['gyalog', '♙', '♟']
  ];
  return (
    <svg viewBox="0 0 300 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="298" height="218" rx="12" fill="#fff7ed" stroke="#fed7aa" />
      <text x="70" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">bábu</text>
      <text x="170" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">világos</text>
      <text x="245" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">sötét</text>
      {rows.map(([n, w, b], i) => (
        <g key={n}>
          <rect x="15" y={32 + i * 30} width="270" height="28" rx="6" fill={i % 2 ? '#ffedd5' : '#ffffff'} />
          <text x="70" y={51 + i * 30} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
            {n}
          </text>
          <text x="170" y={54 + i * 30} textAnchor="middle" fontSize="22" fill="#ffffff" stroke="#0f172a" strokeWidth="0.7">
            {w}
          </text>
          <text x="245" y={54 + i * 30} textAnchor="middle" fontSize="22" fill="#0f172a">
            {b}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 5. Haladás a négyzetrács oldalai mentén (MF 41/2.)
// ---------------------------------------------------------------------------
export const GridWalkSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const u = 20;
  const x0 = 20;
  const y0 = 20;
  // 4K, 3É, 2ÉNY, 2DNY, 3D – házikó
  const steps: [number, number][] = [[4, 0], [0, -3], [-2, -2], [-2, 2], [0, 3]];
  const start: [number, number] = [2, 7];
  const pts: [number, number][] = [start];
  steps.forEach(([dx, dy]) => {
    const [px, py] = pts[pts.length - 1];
    pts.push([px + dx, py + dy]);
  });
  return (
    <svg viewBox="0 0 340 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="338" height="198" rx="12" fill="#ffffff" stroke="#e2e8f0" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + 8 * u} stroke="#cbd5e1" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + 8 * u} y2={y0 + i * u} stroke="#cbd5e1" />
      ))}
      <polyline points={pts.map(([x, y]) => `${x0 + x * u},${y0 + y * u}`).join(' ')} fill="#cffafe" stroke="#0891b2" strokeWidth="3" strokeLinejoin="round" />
      <circle cx={x0 + start[0] * u} cy={y0 + start[1] * u} r="5" fill="#0f172a" />
      <text x="200" y="36" fontSize="12" fontWeight="bold" fill="#0f172a">A ponttól indulj!</text>
      <rect x="196" y="46" width="132" height="30" rx="8" fill="#ecfeff" stroke="#0891b2" />
      <text x="262" y="66" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#155e75">4K, 3É, 2ÉNY, 2DNY, 3D</text>
      <text x="200" y="102" fontSize="10.5" fill="#334155">K = kelet (jobbra)</text>
      <text x="200" y="118" fontSize="10.5" fill="#334155">É = észak (fel)</text>
      <text x="200" y="134" fontSize="10.5" fill="#334155">D = dél (le)</text>
      <text x="200" y="150" fontSize="10.5" fill="#334155">ÉNY, DNY = átlósan</text>
      <text x="200" y="176" fontSize="11" fontWeight="bold" fill="#0891b2">Házikó lett!</text>
    </svg>
  );
};
