import React from 'react';

/**
 * 5 csúcsú teljes gráf (K5) SVG ábra
 * Alkalmazás: Teljes gráf éleinek száma, n(n-1)/2 képlet szemléltetése
 */
export const CompleteGraph5Svg: React.FC<{ size?: number; className?: string }> = ({
  size = 180,
  className = ''
}) => {
  // 5 csúcs szabályos ötszög csúcsaiban
  const r = 62;
  const cx = 100;
  const cy = 95;
  const nodes = [
    { id: 'A', x: cx + r * Math.sin(0 * 72 * (Math.PI / 180)), y: cy - r * Math.cos(0 * 72 * (Math.PI / 180)), color: '#6366f1' },
    { id: 'B', x: cx + r * Math.sin(1 * 72 * (Math.PI / 180)), y: cy - r * Math.cos(1 * 72 * (Math.PI / 180)), color: '#8b5cf6' },
    { id: 'C', x: cx + r * Math.sin(2 * 72 * (Math.PI / 180)), y: cy - r * Math.cos(2 * 72 * (Math.PI / 180)), color: '#ec4899' },
    { id: 'D', x: cx + r * Math.sin(3 * 72 * (Math.PI / 180)), y: cy - r * Math.cos(3 * 72 * (Math.PI / 180)), color: '#f43f5e' },
    { id: 'E', x: cx + r * Math.sin(4 * 72 * (Math.PI / 180)), y: cy - r * Math.cos(4 * 72 * (Math.PI / 180)), color: '#06b6d4' }
  ];

  // 10 él minden párosítással
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], // körvonal
    [0, 2], [0, 3], [1, 3], [1, 4], [2, 4]  // belső pentagramma átlók
  ];

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 196"
        style={{ width: size, height: (size * 196) / 200, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.75" />
          </linearGradient>
          <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Belső átlók és élek */}
        {edges.map(([i, j], idx) => (
          <line
            key={`edge-${idx}`}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            stroke="url(#edgeGlow)"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        ))}

        {/* Csúcsok (Nodes) */}
        {nodes.map((node) => (
          <g key={node.id} filter="url(#nodeShadow)">
            <circle
              cx={node.x}
              cy={node.y}
              r="14"
              fill={node.color}
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            <text
              x={node.x}
              y={node.y + 4.5}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="11.5"
              fontWeight="900"
              fontFamily="sans-serif"
            >
              {node.id}
            </text>
          </g>
        ))}

        {/* Felirat / Badge */}
        <g transform="translate(100, 182)">
          <rect
            x="-48"
            y="-10"
            width="96"
            height="18"
            rx="9"
            fill="#1e1b4b"
            opacity="0.85"
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill="#e0e7ff"
            fontSize="10"
            fontWeight="bold"
            fontFamily="monospace"
          >
            K₅ = 10 él
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Körasztal körüli leülés SVG ábra
 * Alkalmazás: Ciklikus permutáció (n-1)! és körasztal megkötések
 */
export const RoundTableSvg: React.FC<{
  seatsCount?: number;
  highlightBlock?: boolean;
  alternating?: boolean;
  size?: number;
  className?: string;
}> = ({ seatsCount = 5, highlightBlock = false, alternating = false, size = 180, className = '' }) => {
  const r = 52;
  const cx = 100;
  const cy = 95;

  const seats = Array.from({ length: seatsCount }, (_, i) => {
    const angle = (i * (360 / seatsCount) - 90) * (Math.PI / 180);
    const isBoy = alternating ? i % 2 === 0 : true;
    const color = alternating
      ? isBoy
        ? '#3b82f6'
        : '#ec4899'
      : highlightBlock && (i === 0 || i === 1)
      ? '#f59e0b'
      : '#6366f1';
    const label = alternating ? (isBoy ? 'F' : 'L') : highlightBlock && (i === 0 || i === 1) ? (i === 0 ? 'A' : 'B') : `${i + 1}`;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      color,
      label
    };
  });

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 195"
        style={{ width: size, height: (size * 195) / 200, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none"
      >
        {/* Asztal */}
        <circle
          cx={cx}
          cy={cy}
          r="38"
          className="fill-amber-100 dark:fill-amber-950/70 stroke-amber-400 dark:stroke-amber-700"
          strokeWidth="3"
        />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          className="fill-amber-900 dark:fill-amber-200 text-[10px] font-black"
        >
          ASZTAL
        </text>

        {/* Forgatási nyíl (Ciklikus szimmetria) */}
        <path
          d={`M ${cx - 20} ${cy - 20} A 28 28 0 0 1 ${cx + 20} ${cy - 20}`}
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="3 3"
          markerEnd="url(#arrowhead)"
        />

        {/* Blokk összekötő kapszula ha Anna és Béla együtt ül */}
        {highlightBlock && (
          <path
            d={`M ${seats[0].x} ${seats[0].y} L ${seats[1].x} ${seats[1].y}`}
            stroke="#f59e0b"
            strokeWidth="28"
            strokeLinecap="round"
            opacity="0.3"
          />
        )}

        {/* Székek / Emberek */}
        {seats.map((seat, idx) => (
          <g key={idx}>
            <circle
              cx={seat.x}
              cy={seat.y}
              r="13"
              fill={seat.color}
              stroke="#ffffff"
              strokeWidth="2"
            />
            <text
              x={seat.x}
              y={seat.y + 4.5}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="11"
              fontWeight="bold"
            >
              {seat.label}
            </text>
          </g>
        ))}

        {/* Alsó magyarázó címke */}
        <g transform="translate(100, 180)">
          <rect x="-55" y="-9" width="110" height="17" rx="8" fill="#334155" opacity="0.9" />
          <text x="0" y="3" textAnchor="middle" fill="#f8fafc" fontSize="9.5" fontWeight="bold">
            {highlightBlock ? '[A, B] blokk: (n-2)! · 2!' : `( ${seatsCount} - 1 )! = ${(seatsCount - 1) === 4 ? '24' : (seatsCount - 1) === 3 ? '6' : '120'}`}
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Dirichlet Skatulya-elv illusztráció SVG
 * Alkalmazás: Tárgyak és skatulyák elosztása, garantált sokaság (>= 2)
 */
export const PigeonholeSvg: React.FC<{
  pigeons?: number;
  holes?: number;
  size?: number;
  className?: string;
}> = ({ pigeons = 13, holes = 12, size = 190, className = '' }) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 120"
        style={{ width: size, height: (size * 120) / 220, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none"
      >
        {/* Háttér tábla */}
        <rect x="5" y="10" width="210" height="95" rx="12" className="fill-amber-50/80 dark:fill-amber-950/40 stroke-amber-200 dark:stroke-amber-800" strokeWidth="2" />

        {/* 3 reprezentatív skatulya doboz */}
        <g transform="translate(15, 25)">
          {/* 1. doboz */}
          <rect x="0" y="0" width="55" height="50" rx="8" className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="1.5" />
          <text x="27" y="14" textAnchor="middle" className="fill-slate-600 dark:text-slate-300 font-bold text-[8.5px]">1. Fiók</text>
          <circle cx="27" cy="32" r="8" fill="#3b82f6" />
          <text x="27" y="35" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">1 db</text>

          {/* 2. doboz: Dupla galamb (KIEMELT) */}
          <rect x="67" y="0" width="60" height="50" rx="8" className="fill-amber-100 dark:fill-amber-900/60 stroke-amber-500" strokeWidth="2.5" />
          <text x="97" y="14" textAnchor="middle" fill="#b45309" fontWeight="bold" fontSize="8.5px">2. Fiók ⭐</text>
          <circle cx="86" cy="32" r="8" fill="#ec4899" />
          <circle cx="108" cy="32" r="8" fill="#f43f5e" />
          <text x="97" y="47" textAnchor="middle" fill="#991b1b" fontSize="7.5px" fontWeight="bold">≥ 2 elem!</text>

          {/* 3. doboz: pont-pont-pont ... 12. Fiók */}
          <rect x="137" y="0" width="55" height="50" rx="8" className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="1.5" />
          <text x="164" y="14" textAnchor="middle" className="fill-slate-600 dark:text-slate-300 font-bold text-[8.5px]">{holes}. Fiók</text>
          <circle cx="164" cy="32" r="8" fill="#10b981" />
          <text x="164" y="35" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">1 db</text>
        </g>

        {/* Alsó képlet szöveg */}
        <text x="110" y="94" textAnchor="middle" className="fill-slate-700 dark:fill-slate-200 text-[10px] font-bold">
          {pigeons} elem &gt; {holes} rekesz ⟹ legalább 2 azonosba kerül!
        </text>
      </svg>
    </div>
  );
};

/**
 * Dobogósok (1., 2., 3. hely) SVG ábra
 * Alkalmazás: Futóversenyek, rendezett kiválasztás n · (n-1) · (n-2)
 */
export const PodiumSvg: React.FC<{ size?: number; className?: string }> = ({ size = 180, className = '' }) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 -5 190 130"
        style={{ width: size, height: (size * 130) / 190, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none"
      >
        {/* 2. Hely (Ezüst) */}
        <rect x="20" y="45" width="45" height="60" rx="4" fill="#94a3b8" />
        <circle cx="42" cy="30" r="11" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
        <text x="42" y="34" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="black">2</text>
        <text x="42" y="75" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="black">II.</text>

        {/* 1. Hely (Arany) */}
        <rect x="72" y="25" width="46" height="80" rx="4" fill="#eab308" />
        {/* Korona / Érem */}
        <circle cx="95" cy="10" r="12" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <text x="95" y="14" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="black">1</text>
        <text x="95" y="65" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="black">I.</text>

        {/* 3. Hely (Bronz) */}
        <rect x="125" y="60" width="45" height="45" rx="4" fill="#b45309" />
        <circle cx="147" cy="45" r="10" fill="#fed7aa" stroke="#9a3412" strokeWidth="2" />
        <text x="147" y="49" textAnchor="middle" fill="#7c2d12" fontSize="9" fontWeight="black">3</text>
        <text x="147" y="85" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="black">III.</text>

        {/* Talaj vonal */}
        <line x1="10" y1="105" x2="180" y2="105" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        <text x="95" y="117" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[9px] font-bold">
          Sorrend számít: n · (n - 1) · (n - 2)
        </text>
      </svg>
    </div>
  );
};

/**
 * Számkészítő helyiérték kártyák SVG
 * Alkalmazás: Számképzési szabály, 0 kizárása az első helyről
 */
export const DigitSlotsSvg: React.FC<{
  slots?: { label: string; count: string; note?: string; color: string }[];
  size?: number;
  className?: string;
}> = ({
  slots = [
    { label: 'Százasok', count: '4', note: 'nem lehet 0', color: '#ec4899' },
    { label: 'Tízesek', count: '4', note: '0 visszalép', color: '#6366f1' },
    { label: 'Egyesek', count: '3', note: 'maradék', color: '#10b981' }
  ],
  size = 200,
  className = ''
}) => {
  const cardWidth = 52;
  const gap = 12;
  const startX = (210 - (slots.length * cardWidth + (slots.length - 1) * gap)) / 2;

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 210 110"
        style={{ width: size, height: (size * 110) / 210, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none"
      >
        {slots.map((slot, i) => {
          const x = startX + i * (cardWidth + gap);
          return (
            <g key={i}>
              {/* Kártya alap */}
              <rect
                x={x}
                y="15"
                width={cardWidth}
                height="62"
                rx="8"
                fill={slot.color}
                opacity="0.12"
                stroke={slot.color}
                strokeWidth="2"
              />
              <text x={x + cardWidth / 2} y="30" textAnchor="middle" fill={slot.color} fontSize="8" fontWeight="bold">
                {slot.label}
              </text>
              <text x={x + cardWidth / 2} y="55" textAnchor="middle" fill={slot.color} fontSize="20" fontWeight="900">
                {slot.count}
              </text>
              {slot.note && (
                <text x={x + cardWidth / 2} y="71" textAnchor="middle" className="fill-slate-600 dark:fill-slate-400" fontSize="6.5">
                  {slot.note}
                </text>
              )}

              {/* Szorzásjel a kártyák között */}
              {i < slots.length - 1 && (
                <text
                  x={x + cardWidth + gap / 2}
                  y="52"
                  textAnchor="middle"
                  className="fill-slate-700 dark:fill-slate-300 font-black text-sm"
                >
                  ·
                </text>
              )}
            </g>
          );
        })}
        <text x="105" y="98" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 text-[9px] font-bold">
          Szorzási szabály: {slots.map(s => s.count).join(' · ')}
        </text>
      </svg>
    </div>
  );
};

/**
 * Blokk-módszer ültetés SVG
 * Alkalmazás: Két ember egymás mellett ül egy padban
 */
export const BlockSeatingSvg: React.FC<{ size?: number; className?: string }> = ({ size = 190, className = '' }) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 210 102"
        style={{ width: size, height: (size * 102) / 210, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none"
      >
        {/* Pad háttér */}
        <rect x="10" y="45" width="190" height="20" rx="4" className="fill-slate-200 dark:fill-slate-700" />

        {/* 1. elem: BLOKK [A, B] */}
        <rect x="18" y="10" width="76" height="55" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
        <text x="56" y="24" textAnchor="middle" fill="#b45309" fontSize="8" fontWeight="bold">BLOKK (2! = 2)</text>
        <circle cx="36" cy="44" r="12" fill="#f59e0b" />
        <text x="36" y="48" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">A</text>
        <circle cx="76" cy="44" r="12" fill="#d97706" />
        <text x="76" y="48" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">B</text>

        {/* 2., 3., 4. különálló ember */}
        <circle cx="118" cy="44" r="12" fill="#6366f1" />
        <text x="118" y="48" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">C</text>

        <circle cx="150" cy="44" r="12" fill="#8b5cf6" />
        <text x="150" y="48" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">D</text>

        <circle cx="182" cy="44" r="12" fill="#ec4899" />
        <text x="182" y="48" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">E</text>

        <text x="105" y="86" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 text-[9px] font-bold">
          4 egység sorrendje: 4! · 2! = 48
        </text>
      </svg>
    </div>
  );
};

/**
 * Gráf fokszám paritás és Euler kézfogási lemma SVG
 * Alkalmazás: Lehetetlen 5 csúcsú 3-as fokú gráf (15 páratlan)
 */
export const DegreeParitySvg: React.FC<{ size?: number; className?: string }> = ({ size = 180, className = '' }) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 190 120"
        style={{ width: size, height: (size * 120) / 190, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none"
      >
        {/* 5 csúcs elrendezése d=3 értékekkel */}
        <g transform="translate(10, 5)">
          <circle cx="40" cy="30" r="14" fill="#f43f5e" />
          <text x="40" y="34" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">d=3</text>

          <circle cx="110" cy="20" r="14" fill="#f43f5e" />
          <text x="110" y="24" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">d=3</text>

          <circle cx="150" cy="55" r="14" fill="#f43f5e" />
          <text x="150" y="59" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">d=3</text>

          <circle cx="100" cy="80" r="14" fill="#f43f5e" />
          <text x="100" y="84" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">d=3</text>

          <circle cx="45" cy="75" r="14" fill="#f43f5e" />
          <text x="45" y="79" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">d=3</text>
        </g>

        {/* Nagy piros tiltás X / Figyelmeztetés */}
        <rect x="25" y="35" width="140" height="38" rx="8" fill="#1e1b4b" opacity="0.92" />
        <text x="95" y="52" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="black">
          Összeg: 5 · 3 = 15
        </text>
        <text x="95" y="65" textAnchor="middle" fill="#fecdd3" fontSize="8.5" fontWeight="bold">
          PÁRATLAN ⟹ LEHETETLEN!
        </text>
      </svg>
    </div>
  );
};

/**
 * Konvex sokszög átlói SVG
 * Alkalmazás: Sokszög átlóinak száma n(n-3)/2
 */
export const PolygonDiagonalsSvg: React.FC<{ size?: number; className?: string }> = ({ size = 180, className = '' }) => {
  const n = 6; // Szemléltetésre 6-szög
  const r = 45;
  const cx = 95;
  const cy = 60;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i * (360 / n) - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  });

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 190 130"
        style={{ width: size, height: (size * 130) / 190, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none"
      >
        {/* Belső átlók szaggatottan */}
        {pts.map((p1, i) =>
          pts.slice(i + 2, i + n - 1).map((p2, j) => (
            <line
              key={`diag-${i}-${j}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#818cf8"
              strokeWidth="1.4"
              strokeDasharray="3 2"
              opacity="0.8"
            />
          ))
        )}

        {/* Oldalak */}
        {pts.map((p1, i) => {
          const p2 = pts[(i + 1) % n];
          return (
            <line
              key={`side-${i}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#0d9488"
              strokeWidth="2.5"
            />
          );
        })}

        {/* Csúcsok */}
        {pts.map((p, i) => (
          <circle key={`v-${i}`} cx={p.x} cy={p.y} r="5" fill="#14b8a6" stroke="#fff" strokeWidth="1.5" />
        ))}

        <text x="95" y="122" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 text-[9.5px] font-bold">
          Átlók száma: n · (n - 3) / 2
        </text>
      </svg>
    </div>
  );
};
