import React from 'react';

/**
 * 5. Nyitott mondatok – ábrák (TK 22. oldal alapján)
 * Barátságos, színes SVG-k 4. osztályosoknak.
 */

type FigProps = { className?: string };

const FONT = 'system-ui, sans-serif';

/** A tankönyvi 3. feladat: 367 > □ > 67 és a számkártyák. */
export const OpenSentenceCardsSvg: React.FC<FigProps> = ({ className }) => {
  const cards = [
    { n: '365', ok: true },
    { n: '403', ok: false },
    { n: '67', ok: false },
    { n: '811', ok: false },
    { n: '56', ok: false },
    { n: '366', ok: true },
    { n: '287', ok: true },
    { n: '954', ok: false },
    { n: '368', ok: false }
  ];
  return (
    <svg viewBox="0 0 400 190" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="367 nagyobb, mint a doboz, ami nagyobb, mint 67, és számkártyák">
      <rect x="2" y="2" width="396" height="186" rx="16" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
      <rect x="80" y="18" width="240" height="50" rx="14" fill="#fb923c" />
      <text x="128" y="51" fontSize="22" fontWeight="bold" textAnchor="middle" fill="#fff">367 &gt;</text>
      <rect x="163" y="27" width="74" height="32" rx="6" fill="#fde047" stroke="#fff" strokeWidth="2" />
      <text x="200" y="50" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#a16207">?</text>
      <text x="278" y="51" fontSize="22" fontWeight="bold" textAnchor="middle" fill="#fff">&gt; 67</text>
      {cards.map((c, i) => {
        const x = 14 + (i % 5) * 76 + (i >= 5 ? 38 : 0);
        const y = i < 5 ? 86 : 134;
        return (
          <g key={c.n}>
            <rect x={x} y={y} width="64" height="36" rx="8" fill={c.ok ? '#dcfce7' : '#fee2e2'} stroke={c.ok ? '#16a34a' : '#dc2626'} strokeWidth="2" />
            <text x={x + 32} y={y + 24} fontSize="17" fontWeight="bold" textAnchor="middle" fill="#1e293b">{c.n}</text>
            <text x={x + 57} y={y + 12} fontSize="11" fontWeight="bold" textAnchor="middle" fill={c.ok ? '#16a34a' : '#dc2626'}>
              {c.ok ? '✓' : '✗'}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Kétkarú mérleg: □ + 240 = 600 egyensúlyban. */
export const BalanceScaleSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 360 200" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Mérleg: doboz meg 240 egyensúlyban van 600-zal">
    <rect x="2" y="2" width="356" height="196" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
    <polygon points="180,60 160,180 200,180" fill="#94a3b8" />
    <rect x="130" y="176" width="100" height="10" rx="4" fill="#64748b" />
    <line x1="50" y1="60" x2="310" y2="60" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
    <circle cx="180" cy="60" r="7" fill="#f59e0b" />
    <line x1="60" y1="60" x2="40" y2="110" stroke="#94a3b8" strokeWidth="2" />
    <line x1="60" y1="60" x2="120" y2="110" stroke="#94a3b8" strokeWidth="2" />
    <line x1="300" y1="60" x2="240" y2="110" stroke="#94a3b8" strokeWidth="2" />
    <line x1="300" y1="60" x2="320" y2="110" stroke="#94a3b8" strokeWidth="2" />
    <path d="M30 110 H130 A50 18 0 0 1 30 110 Z" fill="#cbd5e1" />
    <path d="M230 110 H330 A50 18 0 0 1 230 110 Z" fill="#cbd5e1" />
    <rect x="36" y="80" width="38" height="30" rx="5" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
    <text x="55" y="101" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#a16207">?</text>
    <rect x="78" y="80" width="46" height="30" rx="5" fill="#93c5fd" stroke="#2563eb" strokeWidth="2" />
    <text x="101" y="101" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">240</text>
    <rect x="252" y="80" width="56" height="30" rx="5" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
    <text x="280" y="101" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#14532d">600</text>
    <text x="180" y="30" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#0f172a">□ + 240 = 600</text>
  </svg>
);

const Circle: React.FC<{ x: number; y: number; c: string }> = ({ x, y, c }) => <circle cx={x} cy={y} r="11" fill={c} stroke="#00000022" />;
const Tri: React.FC<{ x: number; y: number; c: string }> = ({ x, y, c }) => (
  <polygon points={`${x},${y - 12} ${x - 12},${y + 10} ${x + 12},${y + 10}`} fill={c} stroke="#00000022" />
);
const Sq: React.FC<{ x: number; y: number; c: string }> = ({ x, y, c }) => <rect x={x - 11} y={y - 11} width="22" height="22" rx="3" fill={c} stroke="#00000022" />;
const Plus: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <text x={x} y={y + 6} fontSize="18" fontWeight="bold" textAnchor="middle" fill="#334155">+</text>
);

/** A tankönyvi 5. feladat: azonos jelek azonos számot jelölnek. */
export const SameSymbolsSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 200" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Jeles egyenlőségek">
    <rect x="2" y="2" width="376" height="196" rx="16" fill="#fefce8" stroke="#fde68a" strokeWidth="2" />
    {/* 1. sor: ● + ● = 100 */}
    <Circle x={40} y={40} c="#facc15" />
    <Plus x={64} y={40} />
    <Circle x={88} y={40} c="#facc15" />
    <text x={112} y={46} fontSize="17" fontWeight="bold" fill="#334155">= 100</text>
    {/* 2. sor: ▲+▲+▲+▲ = 200 */}
    <Tri x={40} y={88} c="#22c55e" />
    <Plus x={64} y={88} />
    <Tri x={88} y={88} c="#22c55e" />
    <Plus x={112} y={88} />
    <Tri x={136} y={88} c="#22c55e" />
    <Plus x={160} y={88} />
    <Tri x={184} y={88} c="#22c55e" />
    <text x={208} y={94} fontSize="17" fontWeight="bold" fill="#334155">= 200</text>
    {/* 3. sor: ■+■+■ = 180 */}
    <Sq x={40} y={134} c="#38bdf8" />
    <Plus x={64} y={134} />
    <Sq x={88} y={134} c="#38bdf8" />
    <Plus x={112} y={134} />
    <Sq x={136} y={134} c="#38bdf8" />
    <text x={160} y={140} fontSize="17" fontWeight="bold" fill="#334155">= 180</text>
    {/* 4. sor: ▲+▲ = 1000 (piros) */}
    <Tri x={40} y={178} c="#ef4444" />
    <Plus x={64} y={178} />
    <Tri x={88} y={178} c="#ef4444" />
    <text x={112} y={184} fontSize="17" fontWeight="bold" fill="#334155">= 1000</text>
    <rect x="262" y="24" width="104" height="150" rx="12" fill="#ffffff" stroke="#fcd34d" strokeWidth="2" />
    <text x="314" y="46" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#92400e">Azonos jel =</text>
    <text x="314" y="62" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#92400e">azonos szám!</text>
    <Circle x={290} y={90} c="#facc15" />
    <text x={312} y={96} fontSize="15" fontWeight="bold" fill="#dc2626">= ?</text>
    <Tri x={290} y={124} c="#22c55e" />
    <text x={312} y={130} fontSize="15" fontWeight="bold" fill="#dc2626">= ?</text>
    <Sq x={290} y={156} c="#38bdf8" />
    <text x={312} y={162} fontSize="15" fontWeight="bold" fill="#dc2626">= ?</text>
  </svg>
);

/** Szövegből nyitott mondat: Sanyi úszása szakaszos ábrán. */
export const SwimBarSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 150" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Szakaszos ábra: 250 m, ebből 200 m kész, a többi kérdéses">
    <rect x="2" y="2" width="376" height="146" rx="16" fill="#ecfeff" stroke="#a5f3fc" strokeWidth="2" />
    <text x="190" y="26" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#0e7490">Sanyi edzésadagja: 250 m</text>
    <path d="M30 44 Q30 36 40 36 H340 Q350 36 350 44" fill="none" stroke="#0e7490" strokeWidth="2" />
    <rect x="30" y="54" width="256" height="34" rx="6" fill="#38bdf8" />
    <rect x="286" y="54" width="64" height="34" rx="6" fill="#fde047" stroke="#ca8a04" strokeDasharray="5 3" strokeWidth="2" />
    <text x="158" y="77" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#fff">200 m – már leúszta</text>
    <text x="318" y="77" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#dc2626">?</text>
    <text x="190" y="118" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#0f172a">200 m + □ m = 250 m</text>
    <text x="190" y="138" fontSize="12" textAnchor="middle" fill="#475569">□ = 250 − 200</text>
  </svg>
);

/** Számegyenes: az 5 > □ megoldásai (0, 1, 2, 3, 4). */
export const SolutionsNumberLineSvg: React.FC<FigProps> = ({ className }) => {
  const x0 = 30;
  const step = 34;
  return (
    <svg viewBox="0 0 380 120" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Számegyenes, az 5-nél kisebb számok kiemelve">
      <rect x="2" y="2" width="376" height="116" rx="16" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="2" />
      <text x="190" y="26" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#5b21b6">5 &gt; □   Mely számok jók?</text>
      <line x1="20" y1="70" x2="365" y2="70" stroke="#334155" strokeWidth="2" />
      <polygon points="365,70 355,64 355,76" fill="#334155" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <line x1={x0 + i * step} y1="63" x2={x0 + i * step} y2="77" stroke="#334155" strokeWidth="2" />
          <text x={x0 + i * step} y="98" fontSize="14" fontWeight="bold" textAnchor="middle" fill={i < 5 ? '#16a34a' : '#94a3b8'}>{i}</text>
          {i < 5 && <circle cx={x0 + i * step} cy="70" r="7" fill="#22c55e" stroke="#15803d" strokeWidth="2" />}
          {i === 5 && <circle cx={x0 + i * step} cy="70" r="7" fill="#fff" stroke="#dc2626" strokeWidth="2" />}
        </g>
      ))}
      <text x="250" y="50" fontSize="11" fill="#dc2626" fontWeight="bold">az 5 már nem jó!</text>
    </svg>
  );
};

/** Gondoltam egy számra: nyilas ábra visszafelé számolással (TK 25/13.). */
export const ThinkNumberArrowsSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 150" className={className ?? 'w-full h-auto'} fontFamily={FONT} role="img" aria-label="Gondoltam egy számra nyíldiagram">
    <rect x="2" y="2" width="376" height="146" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
    <defs>
      <marker id="osArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#475569" />
      </marker>
    </defs>
    {[
      { x: 20, t: '?' },
      { x: 150, t: '?' },
      { x: 280, t: '300' }
    ].map((b) => (
      <g key={b.x}>
        <rect x={b.x} y="58" width="80" height="34" rx="17" fill="#fff" stroke="#fb923c" strokeWidth="2" />
        <text x={b.x + 40} y="81" fontSize="17" fontWeight="bold" textAnchor="middle" fill={b.t === '?' ? '#dc2626' : '#0f172a'}>{b.t}</text>
      </g>
    ))}
    <path d="M70 54 Q125 14 180 54" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#osArrow)" />
    <path d="M200 54 Q255 14 310 54" fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#osArrow)" />
    <text x="125" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#2563eb">· 3</text>
    <text x="255" y="28" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#2563eb">+ 60</text>
    <path d="M310 96 Q255 136 200 96" fill="none" stroke="#16a34a" strokeWidth="2" markerEnd="url(#osArrow)" />
    <path d="M180 96 Q125 136 70 96" fill="none" stroke="#16a34a" strokeWidth="2" markerEnd="url(#osArrow)" />
    <text x="255" y="138" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#16a34a">− 60</text>
    <text x="125" y="138" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#16a34a">: 3</text>
  </svg>
);
