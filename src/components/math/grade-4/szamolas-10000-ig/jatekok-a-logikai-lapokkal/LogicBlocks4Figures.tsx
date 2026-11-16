import React from 'react';

/**
 * 8. Játékok a logikai lapokkal – ábrák (TK 31–32. oldal alapján)
 * A logikai készlet 48 lapja: 4 szín × 3 forma × 2 méret × lyukas / nem lyukas.
 */

type FigProps = { className?: string };
const FONT = 'system-ui, sans-serif';

export type BlockColor = 'piros' | 'sárga' | 'kék' | 'zöld';
export type BlockShape = 'kör' | 'négyzet' | 'háromszög';
export type BlockSize = 'nagy' | 'kicsi';

export interface LogicBlock {
  color: BlockColor;
  shape: BlockShape;
  size: BlockSize;
  holed: boolean;
}

export const BLOCK_FILL: Record<BlockColor, string> = {
  piros: '#ef4444',
  sárga: '#facc15',
  kék: '#3b82f6',
  zöld: '#22c55e'
};

export const BLOCK_COLORS: BlockColor[] = ['piros', 'sárga', 'kék', 'zöld'];
export const BLOCK_SHAPES: BlockShape[] = ['kör', 'négyzet', 'háromszög'];
export const BLOCK_SIZES: BlockSize[] = ['nagy', 'kicsi'];

/** Mind a 48 lap. */
export const ALL_BLOCKS: LogicBlock[] = BLOCK_COLORS.flatMap((color) =>
  BLOCK_SHAPES.flatMap((shape) => BLOCK_SIZES.flatMap((size) => [true, false].map((holed) => ({ color, shape, size, holed }))))
);

export const blockName = (b: LogicBlock): string =>
  `${b.size} ${b.color} ${b.holed ? 'lyukas' : 'nem lyukas'} ${b.shape}`;

/** Egy logikai lap SVG-csoportként (cx, cy középpont; a nagy lap kb. 2r = 44 egység). */
export const BlockShapeG: React.FC<{ b: LogicBlock; cx: number; cy: number; scale?: number; dim?: boolean }> = ({ b, cx, cy, scale = 1, dim }) => {
  const r = (b.size === 'nagy' ? 22 : 13) * scale;
  const fill = BLOCK_FILL[b.color];
  const common = { fill, stroke: '#1e293b', strokeWidth: 1.5, opacity: dim ? 0.18 : 1 };
  const hole = b.holed ? <circle cx={cx} cy={b.shape === 'háromszög' ? cy + r * 0.25 : cy} r={Math.max(3, r * 0.28)} fill="#ffffff" stroke="#1e293b" strokeWidth="1" opacity={dim ? 0.3 : 1} /> : null;
  let shape: React.ReactNode;
  if (b.shape === 'kör') shape = <circle cx={cx} cy={cy} r={r} {...common} />;
  else if (b.shape === 'négyzet') shape = <rect x={cx - r * 0.9} y={cy - r * 0.9} width={r * 1.8} height={r * 1.8} {...common} />;
  else
    shape = (
      <polygon
        points={`${cx},${Math.round((cy - r) * 10) / 10} ${Math.round((cx - r * 1.08) * 10) / 10},${Math.round((cy + r * 0.85) * 10) / 10} ${Math.round((cx + r * 1.08) * 10) / 10},${Math.round((cy + r * 0.85) * 10) / 10}`}
        {...common}
      />
    );
  return (
    <g>
      {shape}
      {hole}
    </g>
  );
};

const B = (color: BlockColor, shape: BlockShape, size: BlockSize, holed = false): LogicBlock => ({ color, shape, size, holed });

/** A készlet tulajdonságai: 4 szín, 3 forma, 2 méret, lyukas / nem lyukas. */
export const LogicSetPropertiesSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 400 230" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="A logikai készlet tulajdonságai">
    <rect x="2" y="2" width="396" height="226" rx="16" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="2" />
    <text x="16" y="34" fontSize="13" fontWeight="bold" fill="#065f46">szín (4)</text>
    {BLOCK_COLORS.map((c, i) => (
      <g key={c}>
        <BlockShapeG b={B(c, 'kör', 'kicsi')} cx={120 + i * 66} cy={30} />
        <text x={140 + i * 66} y="34" fontSize="11" fill="#334155">{c}</text>
      </g>
    ))}
    <text x="16" y="88" fontSize="13" fontWeight="bold" fill="#065f46">forma (3)</text>
    {BLOCK_SHAPES.map((s, i) => (
      <g key={s}>
        <BlockShapeG b={B('kék', s, 'kicsi')} cx={120 + i * 90} cy={84} />
        <text x={140 + i * 90} y="88" fontSize="11" fill="#334155">{s}</text>
      </g>
    ))}
    <text x="16" y="146" fontSize="13" fontWeight="bold" fill="#065f46">méret (2)</text>
    <BlockShapeG b={B('sárga', 'négyzet', 'nagy')} cx={126} cy={140} />
    <text x="156" y="146" fontSize="11" fill="#334155">nagy</text>
    <BlockShapeG b={B('sárga', 'négyzet', 'kicsi')} cx={226} cy={140} />
    <text x="246" y="146" fontSize="11" fill="#334155">kicsi</text>
    <text x="16" y="200" fontSize="13" fontWeight="bold" fill="#065f46">lyuk (2)</text>
    <BlockShapeG b={B('piros', 'négyzet', 'kicsi', true)} cx={120} cy={196} />
    <text x="140" y="200" fontSize="11" fill="#334155">lyukas</text>
    <BlockShapeG b={B('piros', 'négyzet', 'kicsi')} cx={226} cy={196} />
    <text x="246" y="200" fontSize="11" fill="#334155">nem lyukas</text>
    <text x="356" y="190" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#065f46">4 · 3 · 2 · 2</text>
    <text x="356" y="210" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#065f46">= 48 lap</text>
  </svg>
);

const Arrow: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <text x={x} y={y + 5} fontSize="18" fontWeight="bold" textAnchor="middle" fill="#64748b">→</text>
);

/** TK 31/1.: sorozatok egy tulajdonság megváltoztatásával. */
export const OneChangeSequencesSvg: React.FC<FigProps> = ({ className }) => {
  const rows: [LogicBlock, LogicBlock, string][] = [
    [B('sárga', 'négyzet', 'kicsi'), B('sárga', 'négyzet', 'nagy'), 'a mérete változott'],
    [B('piros', 'négyzet', 'kicsi'), B('piros', 'négyzet', 'kicsi', true), 'lyukas lett'],
    [B('sárga', 'négyzet', 'kicsi'), B('kék', 'négyzet', 'kicsi'), 'a színe változott']
  ];
  return (
    <svg viewBox="0 0 380 200" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Sorozatok, ahol egy tulajdonság változik">
      <rect x="2" y="2" width="376" height="196" rx="16" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2" />
      {rows.map(([a, b, t], i) => (
        <g key={t}>
          <text x="16" y={44 + i * 60} fontSize="13" fontWeight="bold" fill="#166534">{String.fromCharCode(97 + i)})</text>
          <BlockShapeG b={a} cx={60} cy={40 + i * 60} />
          <Arrow x={100} y={40 + i * 60} />
          <BlockShapeG b={b} cx={140} cy={40 + i * 60} />
          <Arrow x={180} y={40 + i * 60} />
          <text x={204} y={46 + i * 60} fontSize="18" fontWeight="bold" fill="#dc2626">?</text>
          <text x={230} y={45 + i * 60} fontSize="12" fill="#334155">{t}</text>
        </g>
      ))}
    </svg>
  );
};

/** TK 31/1.: sorozatok két tulajdonság megváltoztatásával. */
export const TwoChangeSequencesSvg: React.FC<FigProps> = ({ className }) => {
  const rows: [LogicBlock, LogicBlock, string][] = [
    [B('piros', 'háromszög', 'nagy'), B('piros', 'háromszög', 'kicsi', true), 'méret + lyuk'],
    [B('zöld', 'kör', 'nagy'), B('kék', 'kör', 'kicsi'), 'szín + méret'],
    [B('zöld', 'kör', 'nagy'), B('zöld', 'háromszög', 'kicsi'), 'forma + méret']
  ];
  return (
    <svg viewBox="0 0 380 200" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Sorozatok, ahol két tulajdonság változik">
      <rect x="2" y="2" width="376" height="196" rx="16" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      {rows.map(([a, b, t], i) => (
        <g key={t}>
          <text x="16" y={44 + i * 60} fontSize="13" fontWeight="bold" fill="#1e40af">{String.fromCharCode(97 + i)})</text>
          <BlockShapeG b={a} cx={60} cy={40 + i * 60} />
          <Arrow x={100} y={40 + i * 60} />
          <BlockShapeG b={b} cx={140} cy={40 + i * 60} />
          <Arrow x={180} y={40 + i * 60} />
          <text x={204} y={46 + i * 60} fontSize="18" fontWeight="bold" fill="#dc2626">?</text>
          <text x={230} y={45 + i * 60} fontSize="12" fill="#334155">{t}</text>
        </g>
      ))}
    </svg>
  );
};

/** TK 32/5.: közös tulajdonságok barkochba. */
export const CommonPropertiesSvg: React.FC<FigProps> = ({ className }) => {
  const rows: [LogicBlock, string, string][] = [
    [B('piros', 'kör', 'nagy'), '0', 'nem kör, nem piros, kicsi, lyukas'],
    [B('sárga', 'háromszög', 'kicsi', true), '2', 'négyzet, és nem sárga'],
    [B('kék', 'négyzet', 'kicsi', true), '3', 'nem kék → zöld!']
  ];
  return (
    <svg viewBox="0 0 400 230" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Barkochba a közös tulajdonságok számával">
      <rect x="2" y="2" width="396" height="226" rx="16" fill="#fefce8" stroke="#fde68a" strokeWidth="2" />
      <rect x="10" y="10" width="380" height="26" rx="6" fill="#f59e0b" />
      <text x="50" y="28" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#fff">felmutatott</text>
      <text x="125" y="28" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#fff">közös</text>
      <text x="270" y="28" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#fff">következtetés</text>
      {rows.map(([b, n, t], i) => (
        <g key={n}>
          <rect x="10" y={40 + i * 52} width="380" height="48" rx="6" fill="#fffbeb" stroke="#fde68a" />
          <BlockShapeG b={b} cx={50} cy={64 + i * 52} />
          <text x="125" y={70 + i * 52} fontSize="18" fontWeight="bold" textAnchor="middle" fill="#92400e">{n}</text>
          <text x="160" y={69 + i * 52} fontSize="12" fill="#334155">{t}</text>
        </g>
      ))}
      <text x="160" y="214" fontSize="13" fontWeight="bold" fill="#065f46">A gondolt lap:</text>
      <BlockShapeG b={B('zöld', 'négyzet', 'kicsi', true)} cx={270} cy={209} />
    </svg>
  );
};

/** TK 32/6.: Rontó játék. */
export const SpoilerGameSvg: React.FC<FigProps> = ({ className }) => {
  const seq: LogicBlock[] = [
    B('sárga', 'háromszög', 'kicsi', true),
    B('sárga', 'kör', 'kicsi'),
    B('kék', 'kör', 'kicsi'),
    B('kék', 'kör', 'nagy'),
    B('zöld', 'háromszög', 'nagy')
  ];
  const texts = ['Minden elem sárga.', 'Minden elem kicsi.', 'Minden elem kék vagy sárga.', 'Minden elem háromszög vagy kör.'];
  return (
    <svg viewBox="0 0 400 230" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Rontó játék sorai">
      <rect x="2" y="2" width="396" height="226" rx="16" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="2" />
      {texts.map((t, row) => (
        <g key={t}>
          {seq.slice(0, row + 2).map((b, i) => (
            <BlockShapeG key={i} b={b} cx={26 + i * 40} cy={34 + row * 52} scale={0.8} />
          ))}
          <text x="222" y={33 + row * 52} fontSize="12" fontWeight="bold" fill="#4c1d95">
            <tspan>→ Minden elem</tspan>
            <tspan x="236" dy="15">{t.replace('Minden elem ', '')}</tspan>
          </text>
        </g>
      ))}
    </svg>
  );
};
