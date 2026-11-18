import React from 'react';
import { ClockPart, TIME_FONT, WEEKDAYS } from './TimeG2Parts';

const wrap = (className?: string) => className ?? 'w-full max-w-[480px] h-auto mx-auto';

/** Napszakok: a Nap útja az égen. */
export const DayPartsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const parts = [
    { x: 40, name: 'hajnal', sky: '#fb923c', sun: 150 },
    { x: 105, name: 'reggel', sky: '#fcd34d', sun: 112 },
    { x: 170, name: 'délelőtt', sky: '#7dd3fc', sun: 78 },
    { x: 240, name: 'dél', sky: '#38bdf8', sun: 60 },
    { x: 310, name: 'délután', sky: '#7dd3fc', sun: 78 },
    { x: 375, name: 'este', sky: '#c084fc', sun: 130 },
    { x: 440, name: 'éjjel', sky: '#1e3a8a', sun: -1 }
  ];
  return (
    <svg viewBox="0 0 480 200" className={wrap(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={TIME_FONT}>
      <rect x="1" y="1" width="478" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {parts.map((p) => (
        <g key={p.name}>
          <rect x={p.x - 30} y="30" width="60" height="135" fill={p.sky} />
          {p.sun > 0 ? (
            <circle cx={p.x} cy={p.sun} r="13" fill="#facc15" stroke="#ea580c" strokeWidth="2.5" />
          ) : (
            <>
              <circle cx={p.x} cy="70" r="13" fill="#f1f5f9" />
              <circle cx={p.x + 7} cy="64" r="11" fill="#1e3a8a" />
              <circle cx={p.x - 14} cy="105" r="2" fill="#fef9c3" />
              <circle cx={p.x + 12} cy="120" r="2" fill="#fef9c3" />
            </>
          )}
          <text x={p.x} y="185" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
            {p.name}
          </text>
        </g>
      ))}
      <rect x="10" y="150" width="460" height="15" fill="#4ade80" />
      <text x="240" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
        A Nap útja egy napon
      </text>
    </svg>
  );
};

/** Az óra 1–12 és 13–24 számokkal: 1 nap = 24 óra. */
export const Clock24Svg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 240" className={wrap(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={TIME_FONT}>
    <rect x="1" y="1" width="478" height="238" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <ClockPart cx={125} cy={122} r={80} hour={8} minute={0} outer24 rim="#2563eb" />
    <rect x="250" y="30" width="210" height="44" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="355" y="59" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#92400e">
      1 nap = 24 óra
    </text>
    <text x="260" y="112" fontSize="16" fontWeight="bold" fill="#0f172a">
      Reggel:
    </text>
    <text x="340" y="112" fontSize="18" fontWeight="bold" fill="#1d4ed8">
      8 óra
    </text>
    <text x="260" y="148" fontSize="16" fontWeight="bold" fill="#0f172a">
      Este:
    </text>
    <text x="340" y="148" fontSize="18" fontWeight="bold" fill="#0e7490">
      20 óra
    </text>
    <text x="260" y="190" fontSize="13" fill="#334155">
      Belső kör: 1–12
    </text>
    <text x="260" y="210" fontSize="13" fill="#0e7490">
      Külső kör: 13–24
    </text>
  </svg>
);

/** Kismutató és nagymutató, percek a számok mellett. */
export const HandsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 250" className={wrap(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={TIME_FONT}>
    <rect x="1" y="1" width="478" height="248" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <ClockPart cx={135} cy={125} r={82} hour={7} minute={30} rim="#16a34a" />
    {Array.from({ length: 12 }, (_, i) => {
      const deg = i * 30;
      const a = (deg * Math.PI) / 180;
      return (
        <text
          key={i}
          x={135 + 104 * Math.sin(a)}
          y={125 - 104 * Math.cos(a) + 5}
          textAnchor="middle"
          fontSize="13"
          fontWeight="bold"
          fill="#7c3aed"
        >
          {i * 5}
        </text>
      );
    })}
    <rect x="262" y="40" width="200" height="56" rx="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
    <text x="362" y="64" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#991b1b">
      rövid kismutató
    </text>
    <text x="362" y="86" textAnchor="middle" fontSize="15" fill="#991b1b">
      az órát mutatja
    </text>
    <rect x="262" y="108" width="200" height="56" rx="12" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2" />
    <text x="362" y="132" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
      hosszú nagymutató
    </text>
    <text x="362" y="154" textAnchor="middle" fontSize="15" fill="#0f172a">
      a percet mutatja
    </text>
    <text x="362" y="200" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#15803d">
      7 óra 30 perc
    </text>
    <text x="362" y="226" textAnchor="middle" fontSize="13" fill="#7c3aed">
      lila számok: percek
    </text>
  </svg>
);

/** Eltelt percek: 15 perc, 30 perc, 60 perc. */
export const MinuteSectorsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const items = [
    { cx: 85, to: 15, a: '15 perc', b: '' },
    { cx: 240, to: 30, a: '30 perc', b: '= fél óra' },
    { cx: 395, to: 60, a: '60 perc', b: '= 1 óra' }
  ];
  return (
    <svg viewBox="0 0 480 200" className={wrap(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={TIME_FONT}>
      <rect x="1" y="1" width="478" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {items.map((it) => (
        <g key={it.a}>
          <ClockPart cx={it.cx} cy={82} r={60} showHands={false} sector={{ from: 0, to: it.to }} rim="#2563eb" />
          <text x={it.cx} y="168" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">
            {it.a}
          </text>
          {it.b && (
            <text x={it.cx} y="189" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#b45309">
              {it.b}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
};

/** A hét napjai. */
export const WeekSvg: React.FC<{ className?: string }> = ({ className }) => {
  const colors = ['#60a5fa', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#fb923c', '#f87171'];
  return (
    <svg viewBox="0 0 480 150" className={wrap(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={TIME_FONT}>
      <rect x="1" y="1" width="478" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {WEEKDAYS.map((d, i) => (
        <g key={d}>
          <rect x={12 + i * 66} y="30" width="60" height="60" rx="10" fill={colors[i]} stroke="#334155" strokeWidth="1.5" />
          <text x={42 + i * 66} y="68" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#ffffff">
            {i + 1}.
          </text>
          <text x={42 + i * 66} y="110" textAnchor="middle" fontSize={d.length > 7 ? 11 : 13} fontWeight="bold" fill="#0f172a">
            {d}
          </text>
        </g>
      ))}
      <rect x="342" y="22" width="130" height="100" rx="12" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
      <text x="407" y="140" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">
        hétvége
      </text>
      <text x="170" y="140" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        1 hét = 7 nap
      </text>
    </svg>
  );
};

/** Az év: 4 évszak, 12 hónap. */
export const YearSvg: React.FC<{ className?: string }> = ({ className }) => {
  const seasons = [
    { name: 'TAVASZ', months: ['március', 'április', 'május'], fill: '#fbcfe8', stroke: '#db2777', x: 10, y: 10 },
    { name: 'NYÁR', months: ['június', 'július', 'augusztus'], fill: '#fecaca', stroke: '#dc2626', x: 245, y: 10 },
    { name: 'ŐSZ', months: ['szeptember', 'október', 'november'], fill: '#fed7aa', stroke: '#9a3412', x: 245, y: 140 },
    { name: 'TÉL', months: ['december', 'január', 'február'], fill: '#bae6fd', stroke: '#0284c7', x: 10, y: 140 }
  ];
  return (
    <svg viewBox="0 0 480 270" className={wrap(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={TIME_FONT}>
      {seasons.map((s) => (
        <g key={s.name}>
          <rect x={s.x} y={s.y} width="225" height="120" rx="14" fill={s.fill} stroke={s.stroke} strokeWidth="2.5" />
          <text x={s.x + 112} y={s.y + 30} textAnchor="middle" fontSize="18" fontWeight="bold" fill={s.stroke}>
            {s.name}
          </text>
          {s.months.map((m, i) => (
            <text key={m} x={s.x + 112} y={s.y + 58 + i * 22} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
              {m}
            </text>
          ))}
        </g>
      ))}
      <circle cx="240" cy="135" r="30" fill="#ffffff" stroke="#334155" strokeWidth="2" />
      <text x="240" y="132" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
        1 év =
      </text>
      <text x="240" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
        12 hónap
      </text>
    </svg>
  );
};
