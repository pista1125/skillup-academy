import React from 'react';
import { EX_FONT, EX_UNK, RodsPart, BarPart, CompareBarsPart, PyramidPart } from './Count100ExamG2Parts';

const FigBox: React.FC<{ h: number; children: React.ReactNode; label: string }> = ({ h, children, label }) => (
  <svg
    viewBox={`0 0 480 ${h}`}
    className="w-full max-w-[480px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={EX_FONT}
    role="img"
    aria-label={label}
  >
    <rect x="1" y="1" width="478" height={h - 2} rx="16" fill="#ecfeff" stroke="#a5f3fc" strokeWidth="2" />
    {children}
  </svg>
);

/** Amit már tudsz: a III. témakör öt része. */
export const Count100MapSvg: React.FC<{ className?: string }> = () => {
  const tiles = [
    { t: 'Számok 100-ig', s: '47 = 4 tízes + 7 egyes', c: '#bfdbfe' },
    { t: 'Összeadás', s: '38 + 7 = 45', c: '#bbf7d0' },
    { t: 'Kivonás', s: '63 − 8 = 55', c: '#ddd6fe' },
    { t: 'Kerek tízesek', s: '47 + 30 = 77', c: '#fde68a' },
    { t: 'Szöveges feladat', s: 'Adatok → Válasz', c: '#fecdd3' }
  ];
  return (
    <FigBox h={200} label="A III. témakör részei">
      {tiles.map((tl, i) => {
        const col = i < 3 ? i : i - 3;
        const row = i < 3 ? 0 : 1;
        const x = row === 0 ? 16 + col * 152 : 92 + col * 152;
        const y = 16 + row * 92;
        return (
          <g key={i}>
            <rect x={x} y={y} width="144" height="80" rx="14" fill={tl.c} stroke="#334155" strokeWidth="2" />
            <text x={x + 72} y={y + 32} textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
              {tl.t}
            </text>
            <text x={x + 72} y={y + 58} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
              {tl.s}
            </text>
          </g>
        );
      })}
    </FigBox>
  );
};

/** Százas tábla a 47 kiemelt szomszédaival. */
export const Count100HundredSquareSvg: React.FC<{ className?: string }> = () => {
  const cs = 30;
  const x0 = 30;
  const y0 = 14;
  const hl: Record<number, string> = { 47: '#22d3ee', 46: '#a5f3fc', 48: '#a5f3fc', 37: '#fde68a', 57: '#fde68a' };
  return (
    <FigBox h={344} label="Százas tábla">
      {Array.from({ length: 100 }, (_, i) => {
        const n = i + 1;
        const r = Math.floor(i / 10);
        const c = i % 10;
        return (
          <g key={n}>
            <rect x={x0 + c * cs} y={y0 + r * cs} width={cs} height={cs} fill={hl[n] ?? (n % 10 === 0 ? '#f1f5f9' : '#fff')} stroke="#0e7490" strokeWidth="1" />
            <text x={x0 + c * cs + cs / 2} y={y0 + r * cs + 20} textAnchor="middle" fontSize="12" fontWeight={hl[n] ? '900' : 'bold'} fill="#0f172a">
              {n}
            </text>
          </g>
        );
      })}
      <g fontSize="13" fontWeight="bold" fill="#0f172a">
        <rect x="350" y="40" width="18" height="18" fill="#a5f3fc" stroke="#0e7490" />
        <text x="374" y="54">egyes szomszédok</text>
        <text x="374" y="72">46 és 48</text>
        <rect x="350" y="96" width="18" height="18" fill="#fde68a" stroke="#0e7490" />
        <text x="374" y="110">fölötte: 10-zel</text>
        <text x="374" y="128">kevesebb (37)</text>
        <text x="374" y="146">alatta: 10-zel</text>
        <text x="374" y="164">több (57)</text>
        <text x="350" y="206">A 10-es oszlop:</text>
        <text x="350" y="224">kerek tízesek</text>
      </g>
    </FigBox>
  );
};

const HopLine: React.FC<{ from: number; to: number; hops: [number, number, string][]; title: string; dir: 1 | -1 }> = ({ from, to, hops, title, dir }) => {
  const x0 = 30;
  const w = 420;
  const X = (v: number) => x0 + ((v - from) / (to - from)) * w;
  const y = 104;
  const ticks = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  return (
    <FigBox h={150} label={title}>
      <text x="240" y="28" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
        {title}
      </text>
      <line x1={X(from) - 8} y1={y} x2={X(to) + 8} y2={y} stroke="#334155" strokeWidth="2" />
      {ticks.map((v) => (
        <g key={v}>
          <line x1={X(v)} x2={X(v)} y1={v % 10 === 0 ? y - 9 : y - 5} y2={v % 10 === 0 ? y + 9 : y + 5} stroke={v % 10 === 0 ? '#0891b2' : '#334155'} strokeWidth={v % 10 === 0 ? 2.4 : 1.2} />
          {(v % 5 === 0 || v === from || v === to) && (
            <text x={X(v)} y={y + 26} textAnchor="middle" fontSize="13" fontWeight="bold" fill={v % 10 === 0 ? '#0e7490' : '#475569'}>
              {v}
            </text>
          )}
        </g>
      ))}
      {hops.map(([a, b, l], i) => (
        <g key={i}>
          <path d={`M ${X(a)} ${y - 6} Q ${(X(a) + X(b)) / 2} ${y - 52} ${X(b)} ${y - 6}`} fill="none" stroke={i === 0 ? '#16a34a' : dir === 1 ? '#2563eb' : '#e11d48'} strokeWidth="2.6" />
          <text x={(X(a) + X(b)) / 2} y={y - 38} textAnchor="middle" fontSize="15" fontWeight="900" fill={i === 0 ? '#15803d' : dir === 1 ? '#1d4ed8' : '#be123c'}>
            {l}
          </text>
        </g>
      ))}
    </FigBox>
  );
};

/** 38 + 7 = 38 + 2 + 5 = 45 */
export const Count100BridgeAddSvg: React.FC<{ className?: string }> = () => (
  <HopLine from={36} to={47} dir={1} title="38 + 7 = 38 + 2 + 5 = 45" hops={[[38, 40, '+2'], [40, 45, '+5']]} />
);

/** 63 − 8 = 63 − 3 − 5 = 55 */
export const Count100BridgeSubSvg: React.FC<{ className?: string }> = () => (
  <HopLine from={53} to={64} dir={-1} title="63 − 8 = 63 − 3 − 5 = 55" hops={[[63, 60, '−3'], [60, 55, '−5']]} />
);

/** Számpiramis 100-ig. */
export const Count100PyramidSvg: React.FC<{ className?: string }> = () => (
  <FigBox h={130} label="Számpiramis: 14, 23, 18 → 37, 41 → 78">
    <PyramidPart cx={150} y={18} rows={[['78'], ['37', '41'], ['14', '23', '18']]} bw={60} bh={30} />
    <text x="300" y="44" fontSize="14" fontWeight="bold" fill="#0f172a">14 + 23 = 37</text>
    <text x="300" y="70" fontSize="14" fontWeight="bold" fill="#0f172a">23 + 18 = 41</text>
    <text x="300" y="96" fontSize="15" fontWeight="900" fill="#0e7490">37 + 41 = 78</text>
  </FigBox>
);

/** Szöveges feladatok szalaggal: rész–egész és összehasonlítás. */
export const Count100StripSvg: React.FC<{ className?: string }> = () => (
  <FigBox h={206} label="Szalagos ábrák">
    <text x="24" y="30" fontSize="14" fontWeight="bold" fill="#334155">Volt 64, eladtak 38-at. Maradt?</text>
    <BarPart x={24} y={66} w={260} h={30} segs={[{ label: '?', v: 26 }, { label: '38', v: 38, color: '#fecaca', crossed: true }]} total="64" fontSize={15} />
    <text x="300" y="88" fontSize="16" fontWeight="900" fill="#0f172a">64 − 38 = 26</text>
    <text x="24" y="124" fontSize="14" fontWeight="bold" fill="#334155">Ez 18-cal több, mint Hannáé:</text>
    <CompareBarsPart x={24} y={134} w={260} h={22} nameW={60} rows={[{ name: 'Ábel', label: '63', v: 63 }, { name: 'Hanna', label: '?', v: 45 }]} diffLabel="18" fontSize={13} />
    <text x="300" y="166" fontSize="16" fontWeight="900" fill={EX_UNK}>63 − 18 = 45</text>
  </FigBox>
);

/** 47 tízesrudakkal (kis kiegészítő ábra). */
export const Count100RodsSvg: React.FC<{ className?: string }> = () => (
  <FigBox h={110} label="47 = 4 tízes + 7 egyes">
    <RodsPart x={40} y={16} tens={4} ones={7} cell={7.5} rodW={13} gap={8} />
    <text x="220" y="56" fontSize="22" fontWeight="900" fill="#0f172a">47 = 40 + 7</text>
    <text x="220" y="84" fontSize="14" fontWeight="bold" fill="#475569">4 tízes és 7 egyes</text>
  </FigBox>
);
