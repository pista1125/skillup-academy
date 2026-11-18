import React from 'react';
import { N50_FONT, BlocksPart, NumberLinePart, CoinPart, EggTrayPart, EggPart } from './Numbers50G2Parts';

// ---------------------------------------------------------------------------
// 1. Számok 50-ig – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEF = 'w-full max-w-[480px] h-auto mx-auto';

/** 34 = 3 tízes + 4 egyes tízesrudakkal és egyeskockákkal, helyiérték-táblával. */
export const PlaceValueBlocksSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 340 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N50_FONT}>
    <rect x="1" y="1" width="338" height="168" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <BlocksPart x={24} y={22} tens={3} ones={4} unit={10} gap={8} />
    <text x="47" y="148" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6b21a8">3 tízes</text>
    <text x="106" y="148" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">4 egyes</text>
    {/* helyiérték-tábla */}
    <rect x="182" y="34" width="66" height="34" fill="#ede9fe" stroke="#6b21a8" strokeWidth="2" />
    <rect x="248" y="34" width="66" height="34" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
    <text x="215" y="57" textAnchor="middle" fontSize="16" fontWeight="900" fill="#4c1d95">T</text>
    <text x="281" y="57" textAnchor="middle" fontSize="16" fontWeight="900" fill="#14532d">E</text>
    <rect x="182" y="68" width="66" height="46" fill="#ffffff" stroke="#6b21a8" strokeWidth="2" />
    <rect x="248" y="68" width="66" height="46" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
    <text x="215" y="102" textAnchor="middle" fontSize="30" fontWeight="900" fill="#4c1d95">3</text>
    <text x="281" y="102" textAnchor="middle" fontSize="30" fontWeight="900" fill="#14532d">4</text>
    <text x="248" y="146" textAnchor="middle" fontSize="18" fontWeight="900" fill="#1e293b">34 = 30 + 4</text>
  </svg>
);

/** Egyes és tízes számszomszédok a 37-re. */
export const NeighboursSvg: React.FC<{ className?: string }> = ({ className = DEF }) => {
  const box = (x: number, y: number, txt: string, fill: string, stroke: string, ink: string) => (
    <g>
      <rect x={x} y={y} width="56" height="40" rx="8" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <text x={x + 28} y={y + 28} textAnchor="middle" fontSize="22" fontWeight="900" fill={ink}>{txt}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 340 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N50_FONT}>
      <rect x="1" y="1" width="338" height="188" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
      <text x="170" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">Egyes szomszédok: 1-gyel kisebb és 1-gyel nagyobb</text>
      {box(70, 36, '36', '#e0f2fe', '#0284c7', '#0c4a6e')}
      <text x="140" y="63" textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">&lt;</text>
      {box(142, 36, '37', '#fef3c7', '#d97706', '#78350f')}
      <text x="212" y="63" textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">&lt;</text>
      {box(214, 36, '38', '#e0f2fe', '#0284c7', '#0c4a6e')}
      <text x="170" y="112" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b21a8">Tízes szomszédok: a két legközelebbi kerek tízes</text>
      {box(70, 124, '30', '#f3e8ff', '#7e22ce', '#581c87')}
      <text x="140" y="151" textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">&lt;</text>
      {box(142, 124, '37', '#fef3c7', '#d97706', '#78350f')}
      <text x="212" y="151" textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">&lt;</text>
      {box(214, 124, '40', '#f3e8ff', '#7e22ce', '#581c87')}
    </svg>
  );
};

/** Számegyenes 20-tól 50-ig, a 37 és szomszédai jelölve. */
export const NumberLine2050Svg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N50_FONT}>
    <rect x="1" y="1" width="358" height="118" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">Jobbra nőnek, balra csökkennek a számok</text>
    <NumberLinePart
      x={20}
      y={72}
      width={310}
      from={20}
      to={50}
      labelEvery={5}
      fontSize={11}
      marks={[
        { value: 30, color: '#7e22ce' },
        { value: 36, color: '#0284c7' },
        { value: 37, color: '#d97706', label: '37' },
        { value: 38, color: '#0284c7' },
        { value: 40, color: '#7e22ce' }
      ]}
    />
    <text x="180" y="112" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#475569">
      kék: egyes szomszédok (36, 38) • lila: tízes szomszédok (30, 40)
    </text>
  </svg>
);

/** 34 és 43 összehasonlítása rudakkal. */
export const CompareBlocksSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 340 165" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N50_FONT}>
    <rect x="1" y="1" width="338" height="163" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <BlocksPart x={22} y={18} tens={3} ones={4} unit={9} gap={6} />
    <BlocksPart x={196} y={18} tens={4} ones={3} unit={9} gap={6} />
    <text x="70" y="134" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e293b">34</text>
    <text x="170" y="134" textAnchor="middle" fontSize="26" fontWeight="900" fill="#dc2626">&lt;</text>
    <text x="256" y="134" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e293b">43</text>
    <text x="170" y="156" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">Előbb a tízeseket nézd: 3 tízes kevesebb, mint 4 tízes.</text>
  </svg>
);

/** Páros és páratlan: 26 és 27 korong párokba rendezve. */
export const EvenOddPairsSvg: React.FC<{ className?: string }> = ({ className = DEF }) => {
  const pairs = (x0: number, n: number, fill: string, stroke: string) =>
    Array.from({ length: n }, (_, i) => {
      const col = Math.floor(i / 2);
      const row = i % 2;
      return (
        <circle
          key={i}
          cx={x0 + col * 11.5}
          cy={52 + row * 13}
          r="4.8"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.2"
        />
      );
    });
  return (
    <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N50_FONT}>
      <rect x="1" y="1" width="358" height="168" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <text x="20" y="30" fontSize="15" fontWeight="900" fill="#15803d">26 – páros</text>
      {pairs(28, 26, '#4ade80', '#166534')}
      <text x="190" y="62" fontSize="12" fontWeight="bold" fill="#166534">mindenkinek van párja</text>
      <text x="20" y="104" fontSize="15" fontWeight="900" fill="#1d4ed8">27 – páratlan</text>
      {Array.from({ length: 27 }, (_, i) => {
        const col = Math.floor(i / 2);
        const row = i % 2;
        const last = i === 26;
        return (
          <circle
            key={i}
            cx={28 + col * 11.5}
            cy={124 + row * 13}
            r="4.8"
            fill={last ? '#f87171' : '#60a5fa'}
            stroke={last ? '#991b1b' : '#1e3a8a'}
            strokeWidth="1.2"
          />
        );
      })}
      <text x="190" y="134" fontSize="12" fontWeight="bold" fill="#991b1b">egy korong pár nélkül marad</text>
      <text x="180" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        Páros végződés: 0, 2, 4, 6, 8 • Páratlan: 1, 3, 5, 7, 9
      </text>
    </svg>
  );
};

/** Pénz és tojástartó: 20 + 10 + 5 = 35 Ft és 3 tálca + 6 tojás = 36. */
export const CoinsAndEggsSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N50_FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#fffbeb" stroke="#fde68a" />
    <CoinPart cx={36} cy={52} value={20} />
    <CoinPart cx={76} cy={52} value={10} />
    <CoinPart cx={112} cy={52} value={5} />
    <text x="74" y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">20 + 10 + 5</text>
    <text x="74" y="124" textAnchor="middle" fontSize="18" fontWeight="900" fill="#92400e">35 Ft</text>
    <line x1="160" y1="20" x2="160" y2="130" stroke="#fcd34d" strokeWidth="2" strokeDasharray="4 3" />
    <EggTrayPart x={176} y={22} />
    <EggTrayPart x={240} y={22} />
    <EggTrayPart x={176} y={54} />
    {Array.from({ length: 6 }, (_, i) => (
      <EggPart key={i} cx={252 + (i % 3) * 14} cy={62 + Math.floor(i / 3) * 16} />
    ))}
    <text x="262" y="114" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">3 teli tálca + 6 tojás</text>
    <text x="262" y="138" textAnchor="middle" fontSize="18" fontWeight="900" fill="#92400e">36 tojás</text>
  </svg>
);
