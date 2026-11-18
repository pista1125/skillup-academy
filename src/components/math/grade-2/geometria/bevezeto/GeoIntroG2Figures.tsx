import React from 'react';
import {
  GEO_FONT,
  ThingPart,
  KidPart,
  GridPart,
  ArrowPart,
  StarPart,
  RobotPart,
  LogicPiecePart,
  P,
  Dir
} from './GeoIntroG2Parts';

const WRAP = 'w-full max-w-[480px] h-auto mx-auto';

/** Polc két sorral: fent / lent, balra / jobbra. */
export const PositionSceneSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={GEO_FONT}>
    <rect x="1" y="1" width="358" height="208" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="70" y="20" width="220" height="150" rx="6" fill="#fef3c7" stroke="#92400e" strokeWidth="3" />
    <line x1="70" y1="95" x2="290" y2="95" stroke="#92400e" strokeWidth="4" />
    <ThingPart kind="labda" cx={115} cy={72} s={1.3} />
    <ThingPart kind="csillag" cx={180} cy={72} s={1.3} />
    <ThingPart kind="alma" cx={245} cy={72} s={1.3} />
    <ThingPart kind="hal" cx={115} cy={146} s={1.3} />
    <ThingPart kind="auto" cx={180} cy={148} s={1.3} />
    <ThingPart kind="virag" cx={245} cy={144} s={1.3} />
    <text x="35" y="62" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">fent</text>
    <text x="35" y="140" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">lent</text>
    <ArrowPart dir="U" cx={35} cy={82} size={9} />
    <ArrowPart dir="D" cx={35} cy={112} size={9} />
    <ArrowPart dir="L" cx={110} cy={190} size={10} color="#be123c" />
    <text x="140" y="195" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#be123c">balra</text>
    <text x="222" y="195" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#15803d">jobbra</text>
    <ArrowPart dir="R" cx={262} cy={190} size={10} color="#15803d" />
    <text x="325" y="70" textAnchor="middle" fontSize="11" fill="#475569">A csillag</text>
    <text x="325" y="84" textAnchor="middle" fontSize="11" fill="#475569">az autó</text>
    <text x="325" y="98" textAnchor="middle" fontSize="11" fill="#475569">fölött van.</text>
  </svg>
);

/** Sorban álló gyerekek: előtte / mögötte / között. */
export const QueueSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={GEO_FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="300" y="30" width="40" height="70" rx="4" fill="#bae6fd" stroke="#0369a1" strokeWidth="2.5" />
    <circle cx="332" cy="68" r="2.5" fill="#0369a1" />
    <text x="320" y="118" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">ajtó</text>
    <KidPart cx={60} cy={70} color="#f472b6" name="Réka" />
    <KidPart cx={120} cy={70} color="#60a5fa" name="Ádám" />
    <KidPart cx={180} cy={70} color="#facc15" name="Lili" />
    <KidPart cx={240} cy={70} color="#4ade80" name="Máté" />
    <ArrowPart dir="R" cx={150} cy={22} size={12} color="#475569" />
    <text x="200" y="26" textAnchor="middle" fontSize="11" fill="#475569">erre mennek</text>
  </svg>
);

/** Robot útja négyzetrácson nyilakkal. */
export const GridWalkSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => {
  const cell = 30;
  const gx = 20;
  const gy = 16;
  const path: [number, number][] = [
    [1, 3],
    [2, 3],
    [3, 3],
    [3, 2],
    [3, 1],
    [4, 1]
  ];
  const dirs: Dir[] = ['R', 'R', 'U', 'U', 'R'];
  const c = (v: number) => v * cell + cell / 2;
  return (
    <svg viewBox="0 0 360 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={GEO_FONT}>
      <rect x="1" y="1" width="358" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <GridPart x={gx} y={gy} cols={7} rows={5} cell={cell} />
      <polyline
        points={path.map(([cc, r]) => `${gx + c(cc)},${gy + c(r)}`).join(' ')}
        fill="none"
        stroke="#f97316"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="7 5"
      />
      <RobotPart cx={gx + c(1)} cy={gy + c(3)} s={1.1} />
      <StarPart cx={gx + c(4)} cy={gy + c(1)} r={11} />
      <rect x="240" y="30" width="108" height="140" rx="10" fill="#eef2ff" stroke="#6366f1" strokeWidth="2" />
      <text x="294" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#3730a3">A robot útja:</text>
      {dirs.map((d, i) => (
        <g key={i}>
          <rect x={250 + (i % 3) * 32} y={60 + Math.floor(i / 3) * 34} width="26" height="26" rx="6" fill="#ffffff" stroke="#6366f1" strokeWidth="1.5" />
          <ArrowPart dir={d} cx={263 + (i % 3) * 32} cy={73 + Math.floor(i / 3) * 34} size={8} />
        </g>
      ))}
      <text x="294" y="148" textAnchor="middle" fontSize="11" fill="#3730a3">1 nyíl = 1 lépés</text>
      <text x="294" y="162" textAnchor="middle" fontSize="11" fill="#3730a3">a szomszéd mezőre</text>
    </svg>
  );
};

/** Mezők kódja: betű = oszlop, szám = sor. */
export const TableCodesSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => {
  const cell = 46;
  const x0 = 70;
  const y0 = 20;
  const cols = ['A', 'B', 'C', 'D'];
  return (
    <svg viewBox="0 0 360 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={GEO_FONT}>
      <rect x="1" y="1" width="358" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {cols.map((ch, i) => (
        <g key={ch}>
          <rect x={x0 + (i + 1) * cell} y={y0} width={cell} height="26" fill="#dcfce7" stroke="#16a34a" />
          <text x={x0 + (i + 1.5) * cell} y={y0 + 18} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">{ch}</text>
        </g>
      ))}
      {[1, 2, 3].map((n, r) => (
        <g key={n}>
          <rect x={x0} y={y0 + 26 + r * cell} width={cell} height={cell} fill="#dcfce7" stroke="#16a34a" />
          <text x={x0 + cell / 2} y={y0 + 26 + r * cell + 29} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">{n}</text>
          {cols.map((_, i) => (
            <rect key={i} x={x0 + (i + 1) * cell} y={y0 + 26 + r * cell} width={cell} height={cell} fill="#ffffff" stroke="#16a34a" />
          ))}
        </g>
      ))}
      <rect x={x0 + 3 * cell} y={y0 + 26 + cell} width={cell} height={cell} fill="#fef9c3" stroke="#ca8a04" strokeWidth="3" />
      <ThingPart kind="alma" cx={x0 + 3.5 * cell} cy={y0 + 26 + 1.5 * cell} s={1.3} />
      <text x="40" y="190" fontSize="12" fill="#334155">Az alma helye: <tspan fontWeight="bold" fill="#b45309">C2</tspan> (C oszlop, 2. sor)</text>
    </svg>
  );
};

/** Egyenes, görbe és törött vonal. */
export const LinesSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={GEO_FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <line x1="20" y1="95" x2="100" y2="45" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
    <path d="M 130 90 C 150 30, 180 120, 200 60 S 225 70, 235 45" fill="none" stroke="#db2777" strokeWidth="5" strokeLinecap="round" />
    <polyline points="260,95 280,45 300,90 320,40 342,80" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="60" y="130" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">egyenes vonal</text>
    <text x="182" y="130" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#be185d">görbe vonal</text>
    <text x="300" y="130" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#15803d">törött vonal</text>
  </svg>
);

/** Nyitott és zárt vonalak. */
export const OpenClosedSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={GEO_FONT}>
    <rect x="1" y="1" width="358" height="168" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="95" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309">nyitott vonal</text>
    <text x="265" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">zárt vonal</text>
    <line x1="180" y1="14" x2="180" y2="160" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 4" />
    <path d="M 30 80 C 40 30, 90 30, 100 70 S 150 110, 150 60" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
    <circle cx="30" cy="80" r="4" fill="#b45309" />
    <circle cx="150" cy="60" r="4" fill="#b45309" />
    <polyline points="35,145 60,110 90,140 120,105 150,135" fill="none" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="35" cy="145" r="4" fill="#b45309" />
    <circle cx="150" cy="135" r="4" fill="#b45309" />
    <path d="M 215 70 C 210 30, 290 25, 300 55 C 312 90, 230 105, 215 70 Z" fill="#ede9fe" stroke="#7c3aed" strokeWidth="5" />
    <polygon points="210,150 240,108 290,118 320,150" fill="#ede9fe" stroke="#7c3aed" strokeWidth="5" strokeLinejoin="round" />
  </svg>
);

/** A logikai készlet négy tulajdonsága. */
export const LogicSetSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => (
  <svg viewBox="0 0 360 240" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={GEO_FONT}>
    <rect x="1" y="1" width="358" height="238" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="16" y="45" fontSize="13" fontWeight="bold" fill="#334155">forma</text>
    <LogicPiecePart piece={P('kor', 'kek')} cx={120} cy={40} unit={17} />
    <LogicPiecePart piece={P('haromszog', 'kek')} cx={180} cy={42} unit={17} />
    <LogicPiecePart piece={P('negyzet', 'kek')} cx={240} cy={40} unit={17} />
    <LogicPiecePart piece={P('teglalap', 'kek')} cx={305} cy={40} unit={17} />
    <text x="16" y="100" fontSize="13" fontWeight="bold" fill="#334155">szín</text>
    <LogicPiecePart piece={P('kor', 'piros')} cx={120} cy={95} unit={17} />
    <LogicPiecePart piece={P('kor', 'sarga')} cx={180} cy={95} unit={17} />
    <LogicPiecePart piece={P('kor', 'kek')} cx={240} cy={95} unit={17} />
    <LogicPiecePart piece={P('kor', 'zold')} cx={305} cy={95} unit={17} />
    <text x="16" y="155" fontSize="13" fontWeight="bold" fill="#334155">méret</text>
    <LogicPiecePart piece={P('negyzet', 'piros', true)} cx={130} cy={150} unit={17} />
    <text x="130" y="186" textAnchor="middle" fontSize="11" fill="#475569">nagy</text>
    <LogicPiecePart piece={P('negyzet', 'piros', false)} cx={200} cy={150} unit={17} />
    <text x="200" y="186" textAnchor="middle" fontSize="11" fill="#475569">kicsi</text>
    <text x="16" y="215" fontSize="13" fontWeight="bold" fill="#334155">lyuk</text>
    <LogicPiecePart piece={P('teglalap', 'zold', true, false)} cx={130} cy={212} unit={17} />
    <text x="175" y="216" fontSize="11" fill="#475569">sima</text>
    <LogicPiecePart piece={P('teglalap', 'zold', true, true)} cx={250} cy={212} unit={17} />
    <text x="295" y="216" fontSize="11" fill="#475569">lyukas</text>
  </svg>
);

/** Lánc: a szomszédos lapok csak egy dologban különböznek. */
export const LogicChainSvg: React.FC<{ className?: string }> = ({ className = WRAP }) => {
  const chain = [P('kor', 'piros'), P('kor', 'kek'), P('kor', 'kek', true, true), P('negyzet', 'kek', true, true), P('negyzet', 'kek', false, true)];
  const labels = ['szín', 'lyuk', 'forma', 'méret'];
  return (
    <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={GEO_FONT}>
      <rect x="1" y="1" width="358" height="118" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {chain.map((p, i) => (
        <LogicPiecePart key={i} piece={p} cx={40 + i * 70} cy={55} unit={19} />
      ))}
      {labels.map((l, i) => (
        <g key={l}>
          <ArrowPart dir="R" cx={75 + i * 70} cy={55} size={7} color="#64748b" />
          <text x={75 + i * 70} y={100} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">{l}</text>
        </g>
      ))}
    </svg>
  );
};
