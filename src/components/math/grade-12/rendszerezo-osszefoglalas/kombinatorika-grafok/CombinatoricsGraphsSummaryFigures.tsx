import React from 'react';
import { GraphDraw, circlePts, completeEdges, degrees, binom, G_BLUE, G_RED, G_GREEN, G_PURPLE, G_AMBER, G_INK } from './graphKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={G_INK}>
      {title}
    </text>
    {children}
  </svg>
);

const Boxes: React.FC<{ x: number; y: number; vals: string[]; color: string; caption: string; result: string }> = ({ x, y, vals, color, caption, result }) => (
  <g>
    <text x={x} y={y - 8} fontSize="11.5" fontWeight="bold" fill={color}>
      {caption}
    </text>
    {vals.map((v, i) => (
      <g key={i}>
        <rect x={x + i * 40} y={y} width="34" height="30" rx="6" fill="#fff" stroke={color} strokeWidth="1.6" />
        <text x={x + i * 40 + 17} y={y + 20} fontSize="13" fontWeight="bold" textAnchor="middle" fill={G_INK}>
          {v}
        </text>
        {i < vals.length - 1 && (
          <text x={x + i * 40 + 37} y={y + 20} fontSize="11" textAnchor="middle" fill="#64748b">
            ·
          </text>
        )}
      </g>
    ))}
    <text x={x + vals.length * 40 + 6} y={y + 20} fontSize="13" fontWeight="bold" fill={color}>
      = {result}
    </text>
  </g>
);

// 1. ábra: sorba rendezés és kiválasztás – „dobozos” szemléltetés
export const CountingBoxesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Hány lehetőség van az egyes helyekre?" className={className} h={290}>
    <Boxes x={30} y={58} vals={['5', '4', '3', '2', '1']} color={G_BLUE} caption="5 különböző elem sorba rendezése (permutáció)" result="5! = 120" />
    <Boxes x={30} y={130} vals={['8', '7', '6']} color={G_RED} caption="8 versenyzőből az első 3 helyezett (sorrend számít, ismétlés nincs)" result="336" />
    <Boxes x={30} y={202} vals={['6', '6', '6']} color={G_GREEN} caption="3 kockadobás sorban (sorrend számít, ismétlés lehet)" result="6³ = 216" />
    <text x="240" y="268" fontSize="11" textAnchor="middle" fill="#475569">
      Ha a sorrend NEM számít: 8 gyerekből 3 fős csoport (8 alatt 3) = 336 / 3! = 56-féle.
    </text>
  </Frame>
);

// 2. ábra: Pascal-háromszög
export const PascalTriangleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const N = 7;
  return (
    <Frame title="Binomiális együtthatók: (n alatt k) = n! / (k! · (n − k)!)" className={className} h={300}>
      {Array.from({ length: N + 1 }, (_, n) => (
        <g key={n}>
          <text x="30" y={62 + n * 30} fontSize="10" fill="#64748b">
            n = {n}
          </text>
          {Array.from({ length: n + 1 }, (_, k) => {
            const x = 255 + (k - n / 2) * 44;
            const y = 58 + n * 30;
            const hi = n === 6 && (k === 2 || k === 4);
            return (
              <g key={k}>
                <rect x={x - 18} y={y - 12} width="36" height="22" rx="6" fill={hi ? '#fde68a' : k === 0 || k === n ? '#e0e7ff' : '#fff'} stroke="#94a3b8" />
                <text x={x} y={y + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill={G_INK}>
                  {binom(n, k)}
                </text>
              </g>
            );
          })}
        </g>
      ))}
      <text x="240" y="288" fontSize="10.5" textAnchor="middle" fill={G_PURPLE}>
        Szimmetria: (6 alatt 2) = (6 alatt 4) = 15; a sor összege 2ⁿ (az összes részhalmaz száma).
      </text>
    </Frame>
  );
};

// 3. ábra: 6 pontú teljes gráf – kézfogások
export const HandshakeGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pts = circlePts(6, 150, 155, 95);
  return (
    <Frame title="Kidolgozott feladat: 6 cégvezető kézfogásai" className={className} h={290}>
      <GraphDraw pts={pts} edges={completeEdges(6)} labels={['1', '2', '3', '4', '5', '6']} notes={Array(6).fill('5')} />
      <text x="290" y="80" fontSize="12" fill={G_INK}>Mindenki 5 emberrel fog kezet:</text>
      <text x="290" y="102" fontSize="12" fill={G_RED} fontWeight="bold">6 · 5 = 30 – de így minden</text>
      <text x="290" y="120" fontSize="12" fill={G_RED} fontWeight="bold">kézfogást kétszer számoltunk.</text>
      <text x="290" y="150" fontSize="13" fill={G_BLUE} fontWeight="bold">30 / 2 = 15 = (6 alatt 2) él</text>
      <text x="290" y="185" fontSize="11" fill="#475569">Ez a 6 pontú teljes gráf.</text>
      <text x="290" y="215" fontSize="11" fill={G_GREEN}>Fényképek kiválasztása (legalább 1):</text>
      <text x="290" y="235" fontSize="12" fill={G_GREEN} fontWeight="bold">2¹⁵ − 1 = 32 767</text>
    </Frame>
  );
};

// 4. ábra: fokszámtétel
export const DegreeSumSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const pts: [number, number][] = [
    [80, 80],
    [210, 70],
    [240, 200],
    [120, 230],
    [50, 160]
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [0, 2],
    [1, 3]
  ];
  const d = degrees(5, edges);
  return (
    <Frame title="Fokszámtétel: a fokszámok összege = 2 · élek száma" className={className} h={270}>
      <GraphDraw pts={pts} edges={edges} labels={['A', 'B', 'C', 'D', 'E']} notes={d.map((x) => `${x}`)} />
      <text x="290" y="80" fontSize="12" fill={G_INK}>5 csúcs, 7 él (A4. feladat):</text>
      <text x="290" y="104" fontSize="12" fill={G_RED} fontWeight="bold">fokszámok: {d.join(' + ')}</text>
      <text x="290" y="126" fontSize="12" fill={G_RED} fontWeight="bold">= {d.reduce((a, b) => a + b, 0)} = 2 · 7</text>
      <text x="290" y="160" fontSize="11" fill="#475569">Minden él két csúcs fokszámát</text>
      <text x="290" y="176" fontSize="11" fill="#475569">növeli 1-gyel.</text>
      <text x="290" y="210" fontSize="11.5" fill={G_PURPLE} fontWeight="bold">Következmény: a fokszámok</text>
      <text x="290" y="228" fontSize="11.5" fill={G_PURPLE} fontWeight="bold">összege mindig páros.</text>
    </Frame>
  );
};

// 5. ábra: kidolgozott feladat – csökkenő számjegyű ötjegyűek
export const DescendingDigitsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const chosen = [4, 8, 0, 7, 3];
  const sorted = [...chosen].sort((a, b) => b - a);
  return (
    <Frame title="Kidolgozott feladat: csökkenő számjegyű ötjegyű számok" className={className} h={250}>
      <text x="30" y="60" fontSize="11.5" fill={G_INK}>
        A 10 számjegyből kiválasztunk 5 különbözőt (a sorrend nem számít):
      </text>
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <rect x={30 + i * 42} y="72" width="34" height="30" rx="6" fill={chosen.includes(i) ? '#fde68a' : '#fff'} stroke={chosen.includes(i) ? G_AMBER : '#94a3b8'} strokeWidth="1.6" />
          <text x={47 + i * 42} y="92" fontSize="13" fontWeight="bold" textAnchor="middle" fill={G_INK}>
            {i}
          </text>
        </g>
      ))}
      <text x="30" y="138" fontSize="11.5" fill={G_INK}>
        Ezekből pontosan EGY megfelelő szám képezhető – csökkenő sorrendben:
      </text>
      {sorted.map((v, i) => (
        <g key={i}>
          <rect x={150 + i * 40} y="150" width="34" height="34" rx="6" fill="#dbeafe" stroke={G_BLUE} strokeWidth="1.8" />
          <text x={167 + i * 40} y="173" fontSize="15" fontWeight="bold" textAnchor="middle" fill={G_BLUE}>
            {v}
          </text>
        </g>
      ))}
      <text x="240" y="220" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill={G_RED}>
        A keresett számok száma: (10 alatt 5) = 252
      </text>
    </Frame>
  );
};
