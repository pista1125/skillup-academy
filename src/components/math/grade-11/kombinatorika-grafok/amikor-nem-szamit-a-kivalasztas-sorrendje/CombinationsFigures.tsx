import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** „n alatt a k” jelölés SVG-ben: zárójel, fölötte n, alatta k. */
const BinomSvg: React.FC<{ x: number; y: number; n: string; k: string; color?: string; size?: number }> = ({
  x,
  y,
  n,
  k,
  color = '#0f172a',
  size = 18
}) => (
  <g>
    <path d={`M ${x} ${y - size * 1.3} Q ${x - size * 0.6} ${y} ${x} ${y + size * 1.3}`} fill="none" stroke={color} strokeWidth="2" />
    <text x={x + size * 0.9} y={y - 4} fontSize={size} fontWeight="bold" textAnchor="middle" fill={color}>
      {n}
    </text>
    <text x={x + size * 0.9} y={y + size + 2} fontSize={size} fontWeight="bold" textAnchor="middle" fill={color}>
      {k}
    </text>
    <path
      d={`M ${x + size * 1.8} ${y - size * 1.3} Q ${x + size * 2.4} ${y} ${x + size * 1.8} ${y + size * 1.3}`}
      fill="none"
      stroke={color}
      strokeWidth="2"
    />
  </g>
);

// 1. ábra: kidolgozott feladat – sorban kiválasztva, majd osztunk 4!-sal
export const SubsetOvercountSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const orders = ['1-2-3-4', '1-3-2-4', '2-1-4-3', '4-2-3-1', '3-4-1-2', '…'];
  return (
    <svg viewBox="0 0 560 270" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="260" rx="16" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        A 9 elemű halmaz 4 elemű részhalmazai
      </text>
      {['9', '8', '7', '6'].map((v, i) => (
        <g key={i}>
          <rect x={40 + i * 70} y={48} width="50" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x={65 + i * 70} y={75} fontSize="18" fontWeight="bold" textAnchor="middle" fill="#166534">
            {v}
          </text>
          <text x={65 + i * 70} y={104} fontSize="10" textAnchor="middle" fill="#475569">
            {i + 1}. hely
          </text>
          {i < 3 && (
            <text x={100 + i * 70} y={74} fontSize="16" textAnchor="middle" fill="#0f172a">
              ·
            </text>
          )}
        </g>
      ))}
      <text x="40" y="132" fontSize="13" fill="#334155">sorban kiválasztva: 9 · 8 · 7 · 6 = 3024 lehetőség</text>
      <rect x="330" y="44" width="210" height="150" rx="12" fill="#ffffff" stroke="#86efac" />
      <text x="435" y="64" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#166534">
        ugyanaz a részhalmaz: {'{'}1; 2; 3; 4{'}'}
      </text>
      {orders.map((o, i) => (
        <text key={o + i} x="435" y={86 + i * 18} fontSize="13" fontFamily="monospace" textAnchor="middle" fill="#15803d">
          {o}
        </text>
      ))}
      <text x="40" y="160" fontSize="13" fill="#334155">minden részhalmazt 4! = 24-szer számoltunk</text>
      <text x="40" y="222" fontSize="18" fontWeight="bold" fill="#166534">
        9 · 8 · 7 · 6 : 4! = 126
      </text>
      <text x="300" y="222" fontSize="16" fill="#166534">=</text>
      <BinomSvg x={325} y={214} n="9" k="4" color="#166534" />
      <text x="400" y="222" fontSize="13" fill="#475569">„9 alatt a 4”</text>
    </svg>
  );
};

// 2. ábra: a jelölés
export const BinomialNotationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="210" rx="16" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      n elemű halmaz k elemű részhalmazainak száma
    </text>
    <BinomSvg x={40} y={80} n="10" k="3" color="#1d4ed8" />
    <text x="105" y="88" fontSize="16" fill="#1e3a8a">= 10 · 9 · 8 / 3! = 120</text>
    <text x="330" y="88" fontSize="13" fill="#475569">„10 alatt a 3”</text>
    <BinomSvg x={40} y={150} n="12" k="4" color="#1d4ed8" />
    <text x="105" y="158" fontSize="16" fill="#1e3a8a">= 12 · 11 · 10 · 9 / 4! = 495</text>
    <text x="370" y="158" fontSize="13" fill="#475569">„12 alatt a 4”</text>
    <text x="280" y="204" fontSize="13" textAnchor="middle" fill="#334155">
      általánosan: n · (n − 1) · … · (n − k + 1) / k!   — „n alatt a k”
    </text>
  </svg>
);

/** Teljes gráf: n pont szabályos sokszögben, minden pár összekötve. */
const CompleteGraph: React.FC<{ cx: number; cy: number; R: number; n: number; labels: string[]; color: string; polygon?: boolean }> = ({
  cx,
  cy,
  R,
  n,
  labels,
  color,
  polygon
}) => {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });
  const lines: React.ReactNode[] = [];
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      const side = j === i + 1 || (i === 0 && j === n - 1);
      lines.push(
        <line
          key={`${i}-${j}`}
          x1={pts[i].x}
          y1={pts[i].y}
          x2={pts[j].x}
          y2={pts[j].y}
          stroke={color}
          strokeWidth={polygon && side ? 3 : 1.4}
          opacity={polygon && !side ? 0.55 : 0.9}
          strokeDasharray={polygon && !side ? '5 4' : undefined}
        />
      );
    }
  return (
    <g>
      {lines}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="13" fill="#ffffff" stroke={color} strokeWidth="2.5" />
          <text x={p.x} y={p.y + 5} fontSize="12" fontWeight="bold" textAnchor="middle" fill={color}>
            {labels[i]}
          </text>
        </g>
      ))}
    </g>
  );
};

// 3. ábra: röplabdabajnokság – 6 csapat, minden pár egy meccs
export const VolleyballMatchesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="250" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.5" />
    <text x="20" y="28" fontSize="14" fontWeight="bold" fill="#0f172a">
      Röplabdabajnokság: 6 csapat
    </text>
    <CompleteGraph cx={160} cy={140} R={90} n={6} labels={['1', '2', '3', '4', '5', '6']} color="#ea580c" />
    <text x="320" y="100" fontSize="13" fill="#334155">minden szakasz egy mérkőzés</text>
    <text x="320" y="125" fontSize="13" fill="#334155">a csapatok sorrendje nem számít</text>
    <text x="320" y="160" fontSize="15" fontWeight="bold" fill="#c2410c">6 · 5 / 2! = 15 mérkőzés</text>
  </svg>
);

// 4. ábra: konvex hétszög összes oldala és átlója = 7 résztvevő kézfogásai
export const HeptagonSegmentsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="250" rx="16" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />
    <text x="20" y="28" fontSize="14" fontWeight="bold" fill="#0f172a">
      Konvex hétszög: oldalak és átlók
    </text>
    <CompleteGraph cx={160} cy={142} R={92} n={7} labels={['A', 'B', 'C', 'D', 'E', 'F', 'G']} color="#7c3aed" polygon />
    <text x="320" y="95" fontSize="13" fill="#334155">2 csúcs ⇒ 1 szakasz (sorrend nem számít)</text>
    <text x="320" y="125" fontSize="15" fontWeight="bold" fill="#6d28d9">7 · 6 / 2! = 21 szakasz</text>
    <text x="320" y="150" fontSize="13" fill="#334155">ebből 7 oldal (vastag) és 14 átló</text>
    <text x="320" y="185" fontSize="13" fill="#334155">ugyanez: 7 ember kézfogásainak száma</text>
  </svg>
);

// 5. ábra: a lift – 12 ember, 3 menet, 4-4 fő
export const LiftGroupsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const colors = ['#2563eb', '#059669', '#d97706'];
  const counts = ['495', '70', '1'];
  const symbols = [
    ['12', '4'],
    ['8', '4'],
    ['4', '4']
  ];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        12 fős társaság, 4 személyes lift, 3 menet
      </text>
      {Array.from({ length: 12 }, (_, i) => {
        const g = Math.floor(i / 4);
        return <circle key={i} cx={60 + i * 40 + g * 10} cy={62} r="12" fill={colors[g]} opacity="0.85" />;
      })}
      {[0, 1, 2].map((g) => (
        <g key={g}>
          <rect x={40 + g * 175} y={95} width="150" height="110" rx="12" fill="#ffffff" stroke={colors[g]} strokeWidth="2" />
          <text x={115 + g * 175} y={116} fontSize="13" fontWeight="bold" textAnchor="middle" fill={colors[g]}>
            {g + 1}. menet
          </text>
          <BinomSvg x={70 + g * 175} y={150} n={symbols[g][0]} k={symbols[g][1]} color={colors[g]} size={15} />
          <text x={150 + g * 175} y={157} fontSize="16" fontWeight="bold" fill={colors[g]}>
            = {counts[g]}
          </text>
          <text x={115 + g * 175} y={196} fontSize="11" textAnchor="middle" fill="#475569">
            {12 - g * 4} emberből 4
          </text>
        </g>
      ))}
      <text x="280" y="232" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        495 · 70 · 1 = 34 650 lehetőség
      </text>
    </svg>
  );
};

// 6. ábra: lyukasztós buszjegy, 9 szám
export const TicketPunchSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const holes = [2, 4, 9];
  return (
    <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="220" rx="16" fill="#fefce8" stroke="#fde68a" strokeWidth="1.5" />
      <rect x="40" y="40" width="200" height="160" rx="10" fill="#fde047" stroke="#a16207" strokeWidth="2" />
      <text x="140" y="32" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        buszjegy
      </text>
      {Array.from({ length: 9 }, (_, i) => {
        const num = i + 1;
        const x = 75 + (i % 3) * 65;
        const y = 75 + Math.floor(i / 3) * 48;
        const punched = holes.includes(num);
        return (
          <g key={num}>
            {punched && <circle cx={x} cy={y} r="15" fill="#ffffff" stroke="#713f12" strokeWidth="1.5" />}
            <text x={x} y={y + 6} fontSize="18" fontWeight="bold" textAnchor="middle" fill={punched ? '#d6d3d1' : '#713f12'}>
              {num}
            </text>
          </g>
        );
      })}
      <text x="280" y="80" fontSize="13" fill="#334155">a lyukak helye számít, a sorrendjük nem</text>
      <text x="280" y="115" fontSize="14" fill="#0f172a">3 lyuk: 9 · 8 · 7 / 3! = 84</text>
      <text x="280" y="145" fontSize="14" fill="#0f172a">4 lyuk: 9 · 8 · 7 · 6 / 4! = 126</text>
      <text x="280" y="180" fontSize="12" fill="#475569">(a képen a 2-es, a 4-es és a 9-es kilyukasztva)</text>
    </svg>
  );
};
