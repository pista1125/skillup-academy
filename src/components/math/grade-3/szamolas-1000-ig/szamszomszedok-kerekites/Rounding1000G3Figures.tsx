import React from 'react';
import { FONT, UNK } from '../szamok-1000-ig/Numbers1000G3Parts';

const CLS = 'w-full h-auto max-w-[560px] mx-auto';

/** Számegyenes-rajzoló a figurákhoz (360 széles). */
const Line: React.FC<{
  lo: number;
  hi: number;
  tick: number;
  big: number;
  labels: number[];
  y: number;
  x0?: number;
  x1?: number;
}> = ({ lo, hi, tick, big, labels, y, x0 = 30, x1 = 330 }) => {
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += tick) ticks.push(v);
  return (
    <g>
      <line x1={x0 - 12} y1={y} x2={x1 + 12} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${x1 + 12} ${y - 5} L ${x1 + 20} ${y} L ${x1 + 12} ${y + 5} Z`} fill="#334155" />
      {ticks.map((v) => {
        const b = (v - lo) % big === 0;
        return <line key={v} x1={X(v)} y1={y - (b ? 9 : 5)} x2={X(v)} y2={y + (b ? 9 : 5)} stroke="#334155" strokeWidth={b ? 2 : 1.1} />;
      })}
      {labels.map((v) => (
        <text key={v} x={X(v)} y={y + 25} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{v}</text>
      ))}
    </g>
  );
};
const xOf = (lo: number, hi: number, v: number, x0 = 30, x1 = 330) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);

/** Arc egy pontból a kerekített értékhez, nyílheggyel. */
const Arc: React.FC<{ xa: number; xb: number; y: number; color: string; h?: number }> = ({ xa, xb, y, color, h = 26 }) => {
  const dir = xb > xa ? 1 : -1;
  return (
    <g>
      <path d={`M ${xa} ${y - 8} Q ${(xa + xb) / 2} ${y - 8 - h} ${xb} ${y - 10}`} fill="none" stroke={color} strokeWidth="2.5" />
      <path d={`M ${xb - dir * 8} ${y - 18} L ${xb} ${y - 10} L ${xb - dir * 2} ${y - 21}`} fill="none" stroke={color} strokeWidth="2.5" />
    </g>
  );
};

/** A 683 hat szomszédja. */
export const NeighboursSvg: React.FC<{ className?: string }> = ({ className = CLS }) => {
  const cells: [string, string, string][] = [
    ['600', 'kisebb százas', '#fecaca'],
    ['680', 'kisebb tízes', '#bae6fd'],
    ['682', 'kisebb egyes', '#fef08a'],
    ['683', '', '#bbf7d0'],
    ['684', 'nagyobb egyes', '#fef08a'],
    ['690', 'nagyobb tízes', '#bae6fd'],
    ['700', 'nagyobb százas', '#fecaca']
  ];
  return (
    <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="118" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">A 683 szomszédai</text>
      {cells.map(([v, name, fill], i) => {
        const x = 12 + i * 48.5;
        const mid = i === 3;
        return (
          <g key={v}>
            <rect x={x} y="34" width="44" height="40" rx="8" fill={fill} stroke={mid ? '#15803d' : '#64748b'} strokeWidth={mid ? 3 : 1.5} />
            <text x={x + 22} y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{v}</text>
            {name && (
              <>
                <text x={x + 22} y="90" textAnchor="middle" fontSize="9.5" fill="#334155">{name.split(' ')[0]}</text>
                <text x={x + 22} y="102" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#334155">{name.split(' ')[1]}</text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
};

/** Tízesre: 871–874 le a 870-re, 875–879 fel a 880-ra. */
export const TenRoundSvg: React.FC<{ className?: string }> = ({ className = CLS }) => {
  const lo = 870;
  const hi = 880;
  const y = 82;
  const X = (v: number) => xOf(lo, hi, v);
  return (
    <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="128" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x={X(871) - 8} y={y - 12} width={X(874) - X(871) + 16} height="24" rx="6" fill="#bfdbfe" />
      <rect x={X(875) - 8} y={y - 12} width={X(879) - X(875) + 16} height="24" rx="6" fill="#fed7aa" />
      <Line lo={lo} hi={hi} tick={1} big={5} labels={[870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880]} y={y} />
      <Arc xa={X(873)} xb={X(870)} y={y} color="#2563eb" />
      <Arc xa={X(877)} xb={X(880)} y={y} color="#ea580c" />
      <text x={X(872)} y="30" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#1d4ed8">1, 2, 3, 4: le</text>
      <text x={X(877)} y="30" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#c2410c">5, 6, 7, 8, 9: fel</text>
    </svg>
  );
};

/** Százasra: 701–749 → 700, 750–799 → 800. */
export const HundredRoundSvg: React.FC<{ className?: string }> = ({ className = CLS }) => {
  const lo = 700;
  const hi = 800;
  const y = 82;
  const X = (v: number) => xOf(lo, hi, v);
  return (
    <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="128" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x={X(701)} y={y - 12} width={X(749) - X(701)} height="24" rx="6" fill="#bfdbfe" />
      <rect x={X(750)} y={y - 12} width={X(799) - X(750)} height="24" rx="6" fill="#fed7aa" />
      <Line lo={lo} hi={hi} tick={10} big={50} labels={[700, 750, 800]} y={y} />
      <circle cx={X(738)} cy={y} r="5.5" fill="#2563eb" stroke="#fff" strokeWidth="1.5" />
      <circle cx={X(762)} cy={y} r="5.5" fill="#ea580c" stroke="#fff" strokeWidth="1.5" />
      <Arc xa={X(738)} xb={X(700)} y={y} color="#2563eb" h={30} />
      <Arc xa={X(762)} xb={X(800)} y={y} color="#ea580c" h={30} />
      <text x={X(738)} y="28" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#1d4ed8">738 ≈ 700</text>
      <text x={X(762)} y="28" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#c2410c">762 ≈ 800</text>
    </svg>
  );
};

/** Közel az 1000-hez: 996 tízesre és 952 százasra is 1000. */
export const NearThousandSvg: React.FC<{ className?: string }> = ({ className = CLS }) => {
  const lo = 900;
  const hi = 1000;
  const y = 84;
  const X = (v: number) => xOf(lo, hi, v);
  return (
    <svg viewBox="0 0 360 132" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="130" rx="14" fill="#f0fdf4" stroke="#86efac" />
      <Line lo={lo} hi={hi} tick={10} big={50} labels={[900, 950, 1000]} y={y} />
      <circle cx={X(952)} cy={y} r="5.5" fill="#7c3aed" stroke="#fff" strokeWidth="1.5" />
      <circle cx={X(996)} cy={y} r="5.5" fill="#16a34a" stroke="#fff" strokeWidth="1.5" />
      <Arc xa={X(952)} xb={X(1000) - 4} y={y} color="#7c3aed" h={40} />
      <text x={X(952)} y="40" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">952 ≈ 1000 (százasra)</text>
      <text x={X(990)} y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">996 ≈ 1000 (tízesre)</text>
      <line x1={X(996)} y1={y - 8} x2={X(996)} y2="26" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  );
};

/** 849 kétféleképpen: tízesre 850, százasra 800 (nem 900!). */
export const TwoWaysSvg: React.FC<{ className?: string }> = ({ className = CLS }) => {
  const box = (x: number, d: string, hl: string | null) => (
    <g>
      <rect x={x} y="44" width="34" height="44" rx="7" fill={hl ?? '#fff'} stroke="#334155" strokeWidth="2" />
      <text x={x + 17} y="76" textAnchor="middle" fontSize="27" fontWeight="bold" fill="#0f172a">{d}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="90" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">Tízesre: nézd az egyest!</text>
      {box(39, '8', null)}
      {box(75, '4', null)}
      {box(111, '9', '#fde68a')}
      <text x="90" y="112" textAnchor="middle" fontSize="12.5" fill="#334155">9 → felfelé</text>
      <text x="90" y="136" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">849 ≈ 850</text>
      <line x1="180" y1="16" x2="180" y2="140" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 3" />
      <text x="270" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">Százasra: nézd a tízest!</text>
      {box(219, '8', null)}
      {box(255, '4', '#fde68a')}
      {box(291, '9', null)}
      <text x="270" y="112" textAnchor="middle" fontSize="12.5" fill="#334155">4 → lefelé</text>
      <text x="270" y="136" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#c2410c">849 ≈ 800</text>
    </svg>
  );
};

/** Visszafelé: mely számok kerekített értéke 600 (százasra)? 550-től 649-ig. */
export const BackwardsSvg: React.FC<{ className?: string }> = ({ className = CLS }) => {
  const lo = 500;
  const hi = 700;
  const y = 80;
  const X = (v: number) => xOf(lo, hi, v);
  return (
    <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="128" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x={X(550)} y={y - 12} width={X(649) - X(550)} height="24" rx="6" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      <Line lo={lo} hi={hi} tick={10} big={50} labels={[500, 550, 600, 650, 700]} y={y} />
      <text x={X(550)} y="40" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#15803d">550-től</text>
      <text x={X(649)} y="40" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#15803d">649-ig</text>
      <text x={X(600)} y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>≈ 600</text>
      <line x1={X(550)} y1="46" x2={X(550)} y2={y - 12} stroke="#16a34a" strokeWidth="1.5" />
      <line x1={X(649)} y1="46" x2={X(649)} y2={y - 12} stroke="#16a34a" strokeWidth="1.5" />
    </svg>
  );
};
