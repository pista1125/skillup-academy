import React from 'react';
import { DiscG, Line010G } from './Sub10G2Parts';

// ---------------------------------------------------------------------------
// 3. Kivonás 10-es számkör – ábrák (2. osztály)
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

/** Korongok áthúzással: 8 − 3 = 5. */
export const CrossedDiscsSubSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto'
}) => (
  <svg viewBox="0 0 320 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="168" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <text x="160" y="26" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#0f172a">
      Összesen 8 korong van. 3-at áthúzunk (elveszünk):
    </text>
    <rect x="26" y="42" width="168" height="66" rx="12" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" />
    <rect x="200" y="42" width="96" height="66" rx="12" fill="#fee2e2" stroke="#f87171" strokeWidth="1.5" strokeDasharray="4 3" />
    {Array.from({ length: 8 }, (_, i) => (
      <DiscG
        key={i}
        cx={46 + i * 32 + (i >= 5 ? 10 : 0)}
        cy={75}
        r={12}
        crossed={i >= 5}
      />
    ))}
    <text x="110" y="126" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">
      Marad: 5
    </text>
    <text x="248" y="126" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
      Elveszünk: 3
    </text>
    <text x="160" y="153" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
      8 − 3 = 5
    </text>
  </svg>
);

/** 10-es gyöngysor kivonáshoz: 10 − 3 = 7 és 10 − 7 = 3. */
export const BeadStringSubSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto'
}) => {
  const bx = (i: number) => 34 + i * 28;
  const by = (i: number) => 58 + Math.sin(i * 0.55) * 8;
  return (
    <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="318" height="158" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <text x="160" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">
        10 gyöngy a fonalon (7 narancs + 3 zöld)
      </text>
      <path
        d={`M 18 62 Q 95 44 160 60 T 302 58`}
        fill="none"
        stroke="#65a30d"
        strokeWidth="2.5"
      />
      {Array.from({ length: 10 }, (_, i) => {
        const isTaken = i >= 7;
        return (
          <g key={i}>
            <circle
              cx={bx(i)}
              cy={by(i)}
              r="11"
              fill={isTaken ? '#bbf7d0' : '#fb923c'}
              stroke={isTaken ? '#15803d' : '#c2410c'}
              strokeWidth="2"
              strokeDasharray={isTaken ? '3 2' : undefined}
            />
            {isTaken && (
              <line
                x1={bx(i) - 6}
                y1={by(i) - 6}
                x2={bx(i) + 6}
                y2={by(i) + 6}
                stroke="#dc2626"
                strokeWidth="2"
              />
            )}
          </g>
        );
      })}
      <line x1={bx(6) + 14} y1="36" x2={bx(6) + 14} y2="86" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="160" y="114" textAnchor="middle" fontSize="14.5" fontWeight="bold" fill="#0f172a">
        10 − 3 = 7   és   10 − 7 = 3
      </text>
      <text x="160" y="138" textAnchor="middle" fontSize="12" fill="#334155">
        Ellenőrzés összeadással: 7 + 3 = 10
      </text>
    </svg>
  );
};

/** 4 tagú műveletcsalád képes kártya: 4 és 5 -> 9. */
export const FactFamilyCardSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-md h-auto mx-auto'
}) => (
  <svg viewBox="0 0 340 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="178" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="170" y="24" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#9a3412">
      Egy képből 4 művelet (műveletcsalád)
    </text>
    {/* Bal doboz: 4 piros négyzet + 5 kék kör */}
    <rect x="16" y="38" width="140" height="116" rx="10" fill="#ffffff" stroke="#fdba74" strokeWidth="1.5" />
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={`sq${i}`}
        x={30 + i * 28}
        y="56"
        width="20"
        height="20"
        rx="4"
        fill="#f87171"
        stroke="#b91c1c"
        strokeWidth="1.5"
      />
    ))}
    {[0, 1, 2, 3, 4].map((i) => (
      <circle
        key={`ci${i}`}
        cx={34 + i * 25}
        cy="108"
        r="9.5"
        fill="#38bdf8"
        stroke="#0369a1"
        strokeWidth="1.5"
      />
    ))}
    <text x="86" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
      4 piros + 5 kék = 9
    </text>
    {/* Jobb doboz: 4 egyenlet */}
    <rect x="172" y="38" width="152" height="116" rx="10" fill="#ffffff" stroke="#fdba74" strokeWidth="1.5" />
    <text x="248" y="62" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">
      4 + 5 = 9
    </text>
    <text x="248" y="86" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">
      5 + 4 = 9
    </text>
    <line x1="188" y1="98" x2="308" y2="98" stroke="#fed7aa" strokeWidth="1.5" />
    <text x="248" y="120" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#be123c">
      9 − 4 = 5
    </text>
    <text x="248" y="144" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#be123c">
      9 − 5 = 4
    </text>
    <text x="170" y="170" textAnchor="middle" fontSize="11.5" fill="#7c2d12">
      A kivonást mindig ellenőrizhetjük összeadással!
    </text>
  </svg>
);

/** 0–10 számegyenes visszafelé ugrással: 9 − 4 = 5. */
export const BackwardJumpLineSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-lg h-auto mx-auto'
}) => (
  <svg viewBox="0 0 320 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="128" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
      Visszalépés a számegyenesen: 9 − 4 = 5
    </text>
    <Line010G from={9} to={5} jumpLabel="− 4" markStart="9" markEnd="5" y={76} x0={24} x1={290} />
  </svg>
);

/** Sugaras 10-es kivonókerék (−2 .. −9). */
export const RadialTenWheelSvg: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-sm h-auto mx-auto'
}) => {
  const cx = 150;
  const cy = 154;
  const items: { angle: number; sub: number; ans: string; unk?: boolean }[] = [
    { angle: -90, sub: 5, ans: '5' },
    { angle: -45, sub: 7, ans: '?', unk: true },
    { angle: 0, sub: 6, ans: '4' },
    { angle: 45, sub: 2, ans: '8' },
    { angle: 90, sub: 4, ans: '?', unk: true },
    { angle: 135, sub: 8, ans: '?', unk: true },
    { angle: 180, sub: 9, ans: '1' },
    { angle: -135, sub: 3, ans: '?', unk: true }
  ];
  return (
    <svg viewBox="0 0 300 280" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="298" height="278" rx="14" fill="#fefce8" stroke="#fde68a" />
      <text x="150" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">
        10-es kivonókerék (mennyi kerül a „?” helyére?)
      </text>
      {items.map((it) => {
        const rad = (it.angle * Math.PI) / 180;
        const rIn = 26;
        const rOut = 76;
        const rNode = 94;
        const x1 = cx + Math.cos(rad) * rIn;
        const y1 = cy + Math.sin(rad) * rIn;
        const x2 = cx + Math.cos(rad) * rOut;
        const y2 = cy + Math.sin(rad) * rOut;
        const nx = cx + Math.cos(rad) * rNode;
        const ny = cy + Math.sin(rad) * rNode;
        const lx = cx + Math.cos(rad) * 53 + (Math.abs(Math.cos(rad)) < 0.2 ? 18 : 0);
        const ly = cy + Math.sin(rad) * 53 + (Math.abs(Math.sin(rad)) < 0.2 ? -10 : -5);
        return (
          <g key={it.sub}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="1.8" />
            <circle
              cx={nx}
              cy={ny}
              r="16"
              fill={it.unk ? '#fee2e2' : '#ffffff'}
              stroke={it.unk ? '#dc2626' : '#0f172a'}
              strokeWidth="2"
            />
            <text
              x={nx}
              y={ny + 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill={it.unk ? '#dc2626' : '#0f172a'}
            >
              {it.ans}
            </text>
            <rect x={lx - 14} y={ly - 9} width="28" height="16" rx="4" fill="#fefce8" />
            <text x={lx} y={ly + 3} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#b45309">
              −{it.sub}
            </text>
          </g>
        );
      })}
      <rect x={cx - 22} y={cy - 18} width="44" height="36" rx="8" fill="#facc15" stroke="#854d0e" strokeWidth="2.5" />
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">
        10
      </text>
    </svg>
  );
};
