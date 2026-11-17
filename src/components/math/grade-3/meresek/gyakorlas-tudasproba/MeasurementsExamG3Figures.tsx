import React from 'react';
import { FONT, INK, Jug, ClockFace, GridShape, rectCells, RectRight } from './MeasurementsExamG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** Amit már tudsz: a négy mennyiség mértékegységei. */
export const UnitsOverviewSvg: Fig = ({ className = DEF }) => {
  const cards = [
    { t: 'Hosszúság', c: '#dbeafe', s: '#1d4ed8', rows: ['1 m = 10 dm', '1 m = 100 cm', '1 dm = 10 cm', '1 cm = 10 mm'] },
    { t: 'Tömeg', c: '#fef3c7', s: '#b45309', rows: ['1 kg = 100 dkg'] },
    { t: 'Űrtartalom', c: '#dcfce7', s: '#15803d', rows: ['1 l = 10 dl', '1 l = 100 cl', '1 dl = 10 cl'] },
    { t: 'Idő', c: '#f3e8ff', s: '#7e22ce', rows: ['1 óra = 60 perc', '1 perc = 60 másodperc', '1 nap = 24 óra', '1 hét = 7 nap'] }
  ];
  return (
    <svg viewBox="0 0 380 222" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="220" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="190" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">Amit már tudsz – mértékegységek</text>
      {cards.map((cd, i) => {
        const x = 12 + (i % 2) * 182;
        const y = 32 + Math.floor(i / 2) * 94;
        return (
          <g key={cd.t}>
            <rect x={x} y={y} width="174" height="86" rx="10" fill={cd.c} stroke={cd.s} strokeWidth="2" />
            <text x={x + 10} y={y + 18} fontSize="13" fontWeight="bold" fill={cd.s}>{cd.t}</text>
            {cd.rows.map((r, k) => (
              <text key={r} x={x + 14} y={y + 35 + k * 13.5} fontSize="11" fontWeight="bold" fill={INK}>{r}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/** Mit mivel mérünk? Vonalzó, mérleg, mérőkancsó, óra. */
export const ToolsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 380 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="378" height="168" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {/* vonalzó */}
    <rect x="14" y="62" width="76" height="24" rx="3" fill="#fef08a" stroke="#a16207" strokeWidth="2" />
    {Array.from({ length: 8 }, (_, i) => (
      <line key={i} x1={20 + i * 9.5} y1="62" x2={20 + i * 9.5} y2={i % 2 ? 70 : 76} stroke={INK} strokeWidth="1.5" />
    ))}
    <text x="52" y="128" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">hosszúság</text>
    <text x="52" y="146" textAnchor="middle" fontSize="10.5" fill="#475569">mm, cm, dm, m</text>
    {/* konyhai mérleg */}
    <path d="M 116 40 Q 144 54 172 40 Z" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
    <rect x="118" y="50" width="52" height="54" rx="8" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="2" />
    <circle cx="144" cy="77" r="18" fill="#ffffff" stroke="#7f1d1d" strokeWidth="2" />
    <line x1="144" y1="77" x2="154" y2="67" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
    <text x="144" y="128" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">tömeg</text>
    <text x="144" y="146" textAnchor="middle" fontSize="10.5" fill="#475569">dkg, kg</text>
    {/* mérőkancsó */}
    <Jug x={222} y={30} h={76} w={34} level={6} />
    <text x="240" y="128" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">űrtartalom</text>
    <text x="240" y="146" textAnchor="middle" fontSize="10.5" fill="#475569">cl, dl, l</text>
    {/* óra */}
    <ClockFace cx={330} cy={68} r={36} h={10} m={10} numbers="quarters" />
    <text x="330" y="128" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7e22ce">idő</text>
    <text x="330" y="146" textAnchor="middle" fontSize="10.5" fill="#475569">másodperc, perc, óra</text>
  </svg>
);

/** Átváltás: nagyobb egységből kisebbe – a szám nagyobb lesz. */
export const ConversionSvg: Fig = ({ className = DEF }) => {
  const steps = ['m', 'dm', 'cm', 'mm'];
  return (
    <svg viewBox="0 0 380 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="188" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="190" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">Lépcső: nagyobb egységből kisebbe</text>
      {steps.map((s, i) => {
        const x = 30 + i * 86;
        const y = 34 + i * 18;
        return (
          <g key={s}>
            <rect x={x} y={y} width="60" height="34" rx="8" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" />
            <text x={x + 30} y={y + 23} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e3a8a">{s}</text>
            {i < 3 && (
              <g>
                <path d={`M ${x + 62} ${y + 17} Q ${x + 74} ${y + 17} ${x + 82} ${y + 30}`} fill="none" stroke="#16a34a" strokeWidth="2.5" />
                <path d={`M ${x + 76} ${y + 28} L ${x + 83} ${y + 32} L ${x + 83} ${y + 24}`} fill="none" stroke="#16a34a" strokeWidth="2.5" />
                <text x={x + 76} y={y + 12} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">· 10</text>
              </g>
            )}
          </g>
        );
      })}
      <g fontSize="12.5" fontWeight="bold" fill={INK}>
        <text x="24" y="138">2 m 35 cm = 200 cm + 35 cm = 235 cm</text>
        <text x="24" y="158">1 kg 5 dkg = 100 dkg + 5 dkg = 105 dkg</text>
        <text x="24" y="178">1 l 4 dl = 10 dl + 4 dl = 14 dl</text>
      </g>
    </svg>
  );
};

/** Kerület és terület ugyanazon a téglalapon. */
export const PerimeterAreaSvg: Fig = ({ className = DEF }) => {
  const s = 26;
  const cells = rectCells(4, 3);
  const edges: React.ReactNode[] = [];
  let k = 0;
  const x0 = 26;
  const y0 = 40;
  const lab = (x: number, y: number) => {
    k += 1;
    return (
      <text key={`e${k}`} x={x} y={y} textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#c2410c">{k}</text>
    );
  };
  for (let c = 0; c < 4; c++) edges.push(lab(x0 + c * s + s / 2, y0 - 4));
  for (let r = 0; r < 3; r++) edges.push(lab(x0 + 4 * s + 8, y0 + r * s + s / 2 + 3));
  for (let c = 3; c >= 0; c--) edges.push(lab(x0 + c * s + s / 2, y0 + 3 * s + 12));
  for (let r = 2; r >= 0; r--) edges.push(lab(x0 - 8, y0 + r * s + s / 2 + 3));
  return (
    <svg viewBox="0 0 380 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="188" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="78" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">KERÜLET: körbejárjuk</text>
      <GridShape x={x0} y={y0} cols={4} rows={3} s={s} cells={cells} fill="#ffffff" stroke="#f97316" />
      {edges}
      <text x="78" y="158" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={INK}>4 + 3 + 4 + 3 = 14 egység</text>
      <text x="282" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">TERÜLET: lefedjük</text>
      <GridShape x={230} y={y0} cols={4} rows={3} s={s} cells={cells} fill="#86efac" stroke="#166534" />
      {cells.map(([c, r], i) => (
        <text key={i} x={230 + c * s + s / 2} y={y0 + r * s + s / 2 + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#14532d">{i + 1}</text>
      ))}
      <text x="282" y="158" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={INK}>3 sor, soronként 4: 3 · 4 = 12</text>
      <text x="282" y="176" textAnchor="middle" fontSize="11" fill="#475569">12 kis négyzet</text>
    </svg>
  );
};

/** A téglalap szemben lévő oldalai egyenlők – kerület. */
export const RectSidesSvg: Fig = ({ className = DEF }) => {
  const x = 110;
  const y = 40;
  const w = 160;
  const h = 80;
  return (
    <svg viewBox="0 0 380 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="168" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x={x} y={y} width={w} height={h} fill="#eff6ff" />
      <line x1={x} y1={y} x2={x + w} y2={y} stroke="#2563eb" strokeWidth="5" />
      <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke="#2563eb" strokeWidth="5" />
      <line x1={x} y1={y} x2={x} y2={y + h} stroke="#f97316" strokeWidth="5" />
      <line x1={x + w} y1={y} x2={x + w} y2={y + h} stroke="#f97316" strokeWidth="5" />
      <RectRight x={x} y={y} w={w} h={h} r={11} />
      <text x={x + w / 2} y={y - 9} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">6 cm</text>
      <text x={x + w / 2} y={y + h + 20} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">6 cm</text>
      <text x={x - 10} y={y + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="bold" fill="#c2410c">4 cm</text>
      <text x={x + w + 10} y={y + h / 2 + 5} fontSize="14" fontWeight="bold" fill="#c2410c">4 cm</text>
      <text x="190" y="158" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={INK}>Kerület: 6 + 4 + 6 + 4 = 20 cm</text>
    </svg>
  );
};
