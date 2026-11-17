import React from 'react';
import { FONT, SERIF, RomanClock, BookG, PlaqueG, CalendarG, StickText, layoutSticks, Stick, MirrorHalf, MONTHS, toRoman } from './RomanEverydayG3Parts';

// ---------------------------------------------------------------------------
// 3. Római számok a mindennapokban és fejtörők – ábrák (3. osztály)
// ---------------------------------------------------------------------------

/** Római számlapos óra 8 órakor. */
export const RomanClockFaceSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-sm h-auto mx-auto' }) => (
  <svg viewBox="0 0 300 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="298" height="228" rx="14" fill="#fffbeb" stroke="#fde68a" />
    <RomanClock cx={110} cy={115} r={92} hour={8} minute={0} highlightIdx={8} />
    <rect x="216" y="70" width="74" height="40" rx="10" fill="#fee2e2" stroke="#b91c1c" />
    <text x="253" y="96" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#b91c1c" fontFamily={SERIF}>VIII</text>
    <text x="253" y="132" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">= 8 óra</text>
    <text x="253" y="160" textAnchor="middle" fontSize="11" fill="#475569">piros: kismutató</text>
    <text x="253" y="176" textAnchor="middle" fontSize="11" fill="#475569">kék: nagymutató</text>
  </svg>
);

/** Két óra: az egyiken IV, a másikon IIII áll. */
export const ClockIIIIvsIVSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 320 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="188" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <RomanClock cx={82} cy={88} r={66} hour={4} minute={0} highlightIdx={4} />
    <RomanClock cx={238} cy={88} r={66} hour={4} minute={0} highlightIdx={4} useIIII />
    <text x="82" y="176" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">IV = 4</text>
    <text x="238" y="176" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">IIII = 4 (csak órán!)</text>
  </svg>
);

/** Hol látunk római számot? Könyv, szobor, utcatábla, naptár. */
export const RomanEverywhereSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 250" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="248" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    {/* könyv */}
    <BookG x={18} y={22} w={150} label="VII." color="#7c3aed" />
    <text x="93" y="122" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5b21b6">VII. fejezet = 7. fejezet</text>
    {/* szobor */}
    <circle cx="268" cy="32" r="14" fill="#a8a29e" />
    <path d="M 246 82 Q 248 50 268 48 Q 288 50 290 82 Z" fill="#a8a29e" />
    <PlaqueG x={226} y={82} w={84} h={34} text="IV. Béla" fill="#e7e5e4" stroke="#57534e" fs={15} />
    <text x="268" y="134" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#44403c">negyedik Béla király</text>
    {/* utcatábla */}
    <rect x="30" y="150" width="128" height="58" rx="6" fill="#1e3a8a" stroke="#172554" strokeWidth="2" />
    <rect x="35" y="155" width="118" height="48" rx="4" fill="none" stroke="#fff" strokeWidth="1.5" />
    <text x="94" y="176" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fff">Fecske utca</text>
    <text x="94" y="195" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#fde047" fontFamily={SERIF}>XIII. kerület</text>
    <text x="94" y="228" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">13. kerület</text>
    {/* naptár */}
    <CalendarG x={222} y={146} w={92} top="2026." main="XI. 17." />
    <text x="268" y="244" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">november 17.</text>
  </svg>
);

/** A hónapok római számai. */
export const MonthsRomanSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const colors = ['#bfdbfe', '#bfdbfe', '#bbf7d0', '#bbf7d0', '#bbf7d0', '#fde68a', '#fde68a', '#fde68a', '#fed7aa', '#fed7aa', '#fed7aa', '#bfdbfe'];
  return (
    <svg viewBox="0 0 360 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {MONTHS.map((m, k) => {
        const col = k % 4;
        const row = Math.floor(k / 4);
        const x = 14 + col * 84;
        const y = 14 + row * 60;
        return (
          <g key={m}>
            <rect x={x} y={y} width="78" height="52" rx="8" fill={colors[k]} stroke="#64748b" />
            <text x={x + 39} y={y + 25} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a" fontFamily={SERIF}>{toRoman(k + 1)}</text>
            <text x={x + 39} y={y + 43} textAnchor="middle" fontSize="11" fill="#334155">{m}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Pálcika-fejtörő: VI – V = X  →  V + V = X (egy pálcika áthelyezése). */
export const MatchstickMoveSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => {
  const h = 46;
  const before = 'VI-V=X';
  const w = layoutSticks(before, h).width;
  const L = layoutSticks(before, h, 160 - w / 2, 34);
  const after = 'V+V=X';
  const w2 = layoutSticks(after, h).width;
  const R = layoutSticks(after, h, 160 - w2 / 2, 144);
  const moved = L.sticks.find((s) => s.role === 'I')!;
  const target = R.sticks.find((s) => s.role === '+v')!;
  return (
    <svg viewBox="0 0 320 214" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="318" height="212" rx="14" fill="#fff7ed" stroke="#fed7aa" />
      <text x="14" y="22" fontSize="12" fontWeight="bold" fill="#9a3412">Előtte: 6 – 5 = 10  (hamis)</text>
      {L.sticks.map((s, i) => (
        <Stick key={i} s={s} h={h} color={s === moved ? '#f59e0b' : undefined} />
      ))}
      <path d={`M ${moved.x1 + 6} ${moved.y2 + 8} Q ${moved.x1 + 40} 122 ${target.x1 - 4} ${target.y1 - 4}`} fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#mmArrow)" />
      <defs>
        <marker id="mmArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#ea580c" />
        </marker>
      </defs>
      <text x="14" y="134" fontSize="12" fontWeight="bold" fill="#166534">Utána: 5 + 5 = 10  (igaz)</text>
      {R.sticks.map((s, i) => (
        <Stick key={i} s={s} h={h} color={s === target ? '#f59e0b' : undefined} />
      ))}
    </svg>
  );
};

/** Tükrözés: a VII felső fele a tükörvonalon – tükörképpel XII lesz. */
export const MirrorRomanSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 320 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="178" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
    <MirrorHalf text="VII" cx={95} lineY={90} hh={46} showMirror />
    <text x="95" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">tükör: a piros vonal</text>
    <text x="232" y="62" textAnchor="middle" fontSize="13" fill="#334155">felül ezt látod:</text>
    <text x="232" y="84" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e40af" fontFamily={SERIF}>VII</text>
    <text x="232" y="112" textAnchor="middle" fontSize="13" fill="#334155">tükörképpel együtt:</text>
    <text x="232" y="138" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#16a34a" fontFamily={SERIF}>XII = 12</text>
  </svg>
);

/** Pálcikás római szám (példa: XIV). */
export const StickNumberSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xs h-auto mx-auto' }) => (
  <svg viewBox="0 0 240 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height="118" rx="12" fill="#fefce8" stroke="#fde68a" />
    <StickText text="XIV" cx={120} y={18} h={56} />
    <text x="120" y="104" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">XIV = 14 • 5 pálcika</text>
  </svg>
);
