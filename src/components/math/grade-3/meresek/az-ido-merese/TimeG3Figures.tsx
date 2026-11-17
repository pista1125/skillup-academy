import React from 'react';
import { FONT, INK, HOUR_C, MIN_C, SEC_C, ClockFace, StopwatchFace, DigitalFace, SunIcon, MoonIcon, MonthGrid } from './TimeG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** Az időegységek sorban, kicsitől a nagyig, és hogy mennyi az egyik a másikban. */
export const TimeUnitsStairsSvg: Fig = ({ className = DEF }) => {
  const units = [
    { name: 'másodperc', c: '#fde68a', s: '#b45309' },
    { name: 'perc', c: '#bbf7d0', s: '#15803d' },
    { name: 'óra', c: '#bfdbfe', s: '#1d4ed8' },
    { name: 'nap', c: '#fecaca', s: '#b91c1c' },
    { name: 'hét', c: '#e9d5ff', s: '#7e22ce' },
    { name: 'hónap', c: '#fed7aa', s: '#c2410c' },
    { name: 'év', c: '#a5f3fc', s: '#0e7490' }
  ];
  const widths = units.map((u) => u.name.length * 6.6 + 12);
  const gap = 12;
  const total = widths.reduce((a, b) => a + b, 0) + gap * (units.length - 1);
  let x = (380 - total) / 2;
  const pills = units.map((u, i) => {
    const px = x;
    x += widths[i] + gap;
    return { ...u, x: px, w: widths[i] };
  });
  const cards = [
    { a: '1 perc', b: '60 másodperc', i: 1 },
    { a: '1 óra', b: '60 perc', i: 2 },
    { a: '1 nap', b: '24 óra', i: 3 },
    { a: '1 hét', b: '7 nap', i: 4 },
    { a: '1 hónap', b: '28–31 nap', i: 5 },
    { a: '1 év', b: '12 hónap', i: 6 }
  ];
  return (
    <svg viewBox="0 0 380 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="190" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">Az idő mértékegységei – kicsitől a nagyig</text>
      {pills.map((p, i) => (
        <g key={p.name}>
          <rect x={p.x} y="34" width={p.w} height="26" rx="13" fill={p.c} stroke={p.s} strokeWidth="2" />
          <text x={p.x + p.w / 2} y="51.5" textAnchor="middle" fontSize="12" fontWeight="bold" fill={p.s}>{p.name}</text>
          {i < pills.length - 1 && (
            <text x={p.x + p.w + gap / 2} y="52" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569">&lt;</text>
          )}
        </g>
      ))}
      {cards.map((c, k) => {
        const u = units[c.i];
        const cx = 12 + (k % 3) * 120;
        const cy = 76 + Math.floor(k / 3) * 60;
        return (
          <g key={c.a}>
            <rect x={cx} y={cy} width="116" height="52" rx="10" fill="#ffffff" stroke={u.s} strokeWidth="2" />
            <rect x={cx} y={cy} width="116" height="20" rx="10" fill={u.c} />
            <rect x={cx} y={cy + 10} width="116" height="10" fill={u.c} />
            <text x={cx + 58} y={cy + 15} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={u.s}>{c.a} =</text>
            <text x={cx + 58} y={cy + 40} textAnchor="middle" fontSize={c.b.length > 14 ? 10.5 : 14} fontWeight="bold" fill={INK}>{c.b}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** A mutatós óra részei: kismutató, nagymutató, másodpercmutató. */
export const ClockPartsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <ClockFace cx={110} cy={100} r={82} h={10} m={10} s={35} showSec />
    <g fontSize="12.5" fontWeight="bold">
      <rect x="214" y="30" width="136" height="40" rx="8" fill="#e0e7ff" stroke={HOUR_C} strokeWidth="1.5" />
      <text x="282" y="47" textAnchor="middle" fill={HOUR_C}>kismutató</text>
      <text x="282" y="62" textAnchor="middle" fontSize="11" fontWeight="normal" fill={INK}>az órát mutatja</text>
      <rect x="214" y="80" width="136" height="40" rx="8" fill="#dbeafe" stroke={MIN_C} strokeWidth="1.5" />
      <text x="282" y="97" textAnchor="middle" fill={MIN_C}>nagymutató</text>
      <text x="282" y="112" textAnchor="middle" fontSize="11" fontWeight="normal" fill={INK}>a percet mutatja</text>
      <rect x="214" y="130" width="136" height="40" rx="8" fill="#ffedd5" stroke={SEC_C} strokeWidth="1.5" />
      <text x="282" y="147" textAnchor="middle" fill={SEC_C}>másodpercmutató</text>
      <text x="282" y="162" textAnchor="middle" fontSize="11" fontWeight="normal" fill={INK}>a másodpercet mutatja</text>
    </g>
    <text x="110" y="196" textAnchor="middle" fontSize="11" fill="#475569">10 óra 10 perc 35 másodperc</text>
  </svg>
);

/** Egész, negyed, fél, háromnegyed. */
export const QuarterClocksSvg: Fig = ({ className = DEF }) => {
  const items = [
    { m: 0, t: '7 óra', d: '7:00' },
    { m: 15, t: 'negyed 8', d: '7:15' },
    { m: 30, t: 'fél 8', d: '7:30' },
    { m: 45, t: 'háromnegyed 8', d: '7:45' }
  ];
  return (
    <svg viewBox="0 0 380 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {items.map((it, i) => {
        const cx = 50 + i * 93;
        return (
          <g key={it.m}>
            <ClockFace cx={cx} cy={58} r={40} h={7} m={it.m} numbers="quarters" />
            {it.m > 0 && (
              <path d={`M ${cx} 22 A 36 36 0 ${it.m > 30 ? 1 : 0} 1 ${cx + 36 * Math.sin((it.m * 6 * Math.PI) / 180)} ${58 - 36 * Math.cos((it.m * 6 * Math.PI) / 180)}`} fill="none" stroke="#22c55e" strokeWidth="5" opacity="0.45" />
            )}
            <text x={cx} y="118" textAnchor="middle" fontSize={it.t.length > 10 ? 11.5 : 13} fontWeight="bold" fill={INK}>{it.t}</text>
            <text x={cx} y="137" textAnchor="middle" fontSize="12" fill="#475569">{it.d}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Ugyanaz az óraállás délelőtt és este (24 órás írásmód). */
export const MorningEveningSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 380 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="378" height="178" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="12" y="34" width="118" height="132" rx="12" fill="#fef9c3" stroke="#eab308" strokeWidth="1.5" />
    <SunIcon cx={71} cy={62} r={14} />
    <text x="71" y="104" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">délelőtt</text>
    <DigitalFace x={28} y={114} w={86} h={30} text="9:15" />
    <text x="71" y="160" textAnchor="middle" fontSize="11" fill={INK}>9 óra 15 perc</text>
    <ClockFace cx={190} cy={96} r={56} h={9} m={15} />
    <text x="190" y="24" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#334155">Egy óraállás – két időpont</text>
    <rect x="250" y="34" width="118" height="132" rx="12" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
    <MoonIcon cx={309} cy={62} r={15} />
    <text x="309" y="104" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#3730a3">este</text>
    <DigitalFace x={266} y={114} w={86} h={30} text="21:15" />
    <text x="309" y="160" textAnchor="middle" fontSize="11" fill={INK}>21 óra 15 perc</text>
    <text x="190" y="172" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4338ca">9 + 12 = 21</text>
  </svg>
);

/** Eltelt idő ugrásokkal: 9:40 → 10:00 → 10:25. */
export const ElapsedJumpsSvg: Fig = ({ className = DEF }) => {
  const X = (min: number) => 70 + (min - 580) * 5; // 9:40 = 580 perc
  const y = 112;
  return (
    <svg viewBox="0 0 380 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="188" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <ClockFace cx={34} cy={48} r={26} h={9} m={40} numbers="quarters" />
      <ClockFace cx={346} cy={48} r={26} h={10} m={25} numbers="quarters" />
      <text x="34" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>kezdés</text>
      <text x="346" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>vége</text>
      <line x1="55" y1={y} x2="325" y2={y} stroke="#334155" strokeWidth="2.5" />
      {[580, 590, 600, 610, 620, 625].map((v) => (
        <line key={v} x1={X(v)} y1={y - 6} x2={X(v)} y2={y + 6} stroke="#334155" strokeWidth="2" />
      ))}
      {[
        { v: 580, t: '9:40' },
        { v: 600, t: '10:00' },
        { v: 625, t: '10:25' }
      ].map((p) => (
        <g key={p.v}>
          <circle cx={X(p.v)} cy={y} r="6" fill={p.v === 600 ? '#16a34a' : '#2563eb'} />
          <text x={X(p.v)} y={y + 24} textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{p.t}</text>
        </g>
      ))}
      <path d={`M ${X(580)} ${y - 8} Q ${(X(580) + X(600)) / 2} ${y - 52} ${X(600)} ${y - 8}`} fill="none" stroke="#f97316" strokeWidth="3" />
      <path d={`M ${X(600) - 8} ${y - 14} L ${X(600)} ${y - 8} L ${X(600) - 1} ${y - 18}`} fill="none" stroke="#f97316" strokeWidth="3" />
      <text x={(X(580) + X(600)) / 2} y={y - 36} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">+20 perc</text>
      <path d={`M ${X(600)} ${y - 8} Q ${(X(600) + X(625)) / 2} ${y - 60} ${X(625)} ${y - 8}`} fill="none" stroke="#8b5cf6" strokeWidth="3" />
      <path d={`M ${X(625) - 8} ${y - 14} L ${X(625)} ${y - 8} L ${X(625) - 1} ${y - 18}`} fill="none" stroke="#8b5cf6" strokeWidth="3" />
      <text x={(X(600) + X(625)) / 2} y={y - 42} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6d28d9">+25 perc</text>
      <rect x="95" y="152" width="190" height="28" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="190" y="171" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#14532d">20 + 25 = 45 perc telt el</text>
    </svg>
  );
};

/** Stopper és naptárlap: rövid és hosszú idők mérése. */
export const StopwatchCalendarSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 380 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="378" height="228" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <StopwatchFace cx={80} cy={118} r={60} s={23} />
    <text x="80" y="200" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>stopper: 23 másodperc</text>
    <text x="80" y="216" textAnchor="middle" fontSize="10.5" fill="#475569">rövid időkhöz</text>
    <MonthGrid x={170} y={14} title="július" days={31} startDow={2} cell={27} marks={{ 6: '#bbf7d0', 7: '#bbf7d0', 8: '#bbf7d0', 9: '#bbf7d0', 10: '#bbf7d0', 11: '#bbf7d0', 12: '#bbf7d0' }} />
    <text x="264" y="216" textAnchor="middle" fontSize="10.5" fill="#475569">naptár: hosszú időkhöz (tábor: 7 nap)</text>
  </svg>
);
