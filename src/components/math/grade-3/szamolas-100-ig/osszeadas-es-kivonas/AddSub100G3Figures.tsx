import React from 'react';
import { Coin, JumpLine, FONT } from './AddSub100G3Parts';

// ---------------------------------------------------------------------------
// 2. Összeadás és kivonás – ábrák (3. osztály)
// ---------------------------------------------------------------------------

/** Kerek tízesek 10 forintosokkal: 30 + 40 = 70. */
export const RoundTensCoinsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 340 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="128" rx="14" fill="#fefce8" stroke="#fde68a" />
    {[0, 1, 2].map((i) => (
      <Coin key={`a${i}`} cx={34 + i * 34} cy={50} v={10} />
    ))}
    <text x="141" y="56" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">+</text>
    {[0, 1, 2, 3].map((i) => (
      <Coin key={`b${i}`} cx={180 + i * 34} cy={50} v={10} />
    ))}
    <text x="68" y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">3 tízes</text>
    <text x="231" y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">4 tízes</text>
    <text x="170" y="116" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">3 tízes + 4 tízes = 7 tízes → 30 + 40 = 70</text>
  </svg>
);

/** A műveletek részeinek neve. */
export const TermsNamesSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="168" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="90" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">Összeadás</text>
    <text x="270" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">Kivonás</text>
    <line x1="180" y1="14" x2="180" y2="156" stroke="#fed7aa" strokeWidth="2" />
    {/* összeadás */}
    <text x="42" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#dc2626">35</text>
    <text x="68" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">+</text>
    <text x="94" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#dc2626">24</text>
    <text x="120" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">=</text>
    <text x="148" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#2563eb">59</text>
    <line x1="42" y1="70" x2="58" y2="100" stroke="#dc2626" strokeWidth="1.5" />
    <line x1="94" y1="70" x2="74" y2="100" stroke="#dc2626" strokeWidth="1.5" />
    <text x="66" y="114" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">tagok</text>
    <line x1="148" y1="70" x2="142" y2="100" stroke="#2563eb" strokeWidth="1.5" />
    <text x="140" y="114" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb">összeg</text>
    <text x="90" y="146" textAnchor="middle" fontSize="12" fill="#7c2d12">24 + 35 = 59 is igaz!</text>
    {/* kivonás */}
    <text x="214" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#16a34a">59</text>
    <text x="240" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">−</text>
    <text x="266" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#ea580c">24</text>
    <text x="292" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">=</text>
    <text x="320" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#7c3aed">35</text>
    <line x1="214" y1="70" x2="214" y2="84" stroke="#16a34a" strokeWidth="1.5" />
    <text x="222" y="98" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#16a34a">kisebbítendő</text>
    <line x1="266" y1="70" x2="266" y2="112" stroke="#ea580c" strokeWidth="1.5" />
    <text x="266" y="126" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ea580c">kivonandó</text>
    <line x1="320" y1="70" x2="320" y2="84" stroke="#7c3aed" strokeWidth="1.5" />
    <text x="316" y="98" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">különbség</text>
    <text x="270" y="152" textAnchor="middle" fontSize="12" fill="#7c2d12">Ellenőrzés: 35 + 24 = 59</text>
  </svg>
);

/** Tízesátlépés egyjegyűvel: 28 + 6 = 28 + 2 + 4. */
export const BridgeTenJumpSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <div className={className}>
    <JumpLine lo={25} hi={37} start={28} jumps={[{ to: 30, label: '+2' }, { to: 34, label: '+4' }]} />
    <p className="text-center text-sm font-bold text-emerald-800 mt-1">28 + 6 = 28 + 2 + 4 = 34</p>
  </div>
);

/** Kivonás tízesátlépéssel egyjegyűvel: 43 − 5 = 43 − 3 − 2. */
export const BridgeTenBackSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <div className={className}>
    <JumpLine lo={35} hi={46} start={43} jumps={[{ to: 40, label: '−3' }, { to: 38, label: '−2' }]} color="#ea580c" />
    <p className="text-center text-sm font-bold text-orange-800 mt-1">43 − 5 = 43 − 3 − 2 = 38</p>
  </div>
);

/** Kétjegyű összeadás: 47 + 25 = 47 + 20 + 5. */
export const TwoDigitAddJumpSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <div className={className}>
    <JumpLine lo={44} hi={76} start={47} jumps={[{ to: 67, label: '+20' }, { to: 72, label: '+5' }]} />
    <p className="text-center text-sm font-bold text-emerald-800 mt-1">47 + 25 = 47 + 20 + 5 = 67 + 5 = 72</p>
  </div>
);

/** Kétjegyű kivonás: 73 − 27 = 73 − 20 − 7. */
export const TwoDigitSubJumpSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <div className={className}>
    <JumpLine lo={42} hi={76} start={73} jumps={[{ to: 53, label: '−20' }, { to: 46, label: '−7' }]} color="#ea580c" />
    <p className="text-center text-sm font-bold text-orange-800 mt-1">73 − 27 = 73 − 20 − 7 = 53 − 7 = 46</p>
  </div>
);

/** Pótlás 100-ra: 63 + 37 = 100, tízes csíkokkal. */
export const ToHundredBarSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const x0 = 20;
  const u = 3;
  return (
    <svg viewBox="0 0 340 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="118" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
      <text x="170" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a6e">100</text>
      <path d={`M ${x0} 34 L ${x0} 28 L ${x0 + 300} 28 L ${x0 + 300} 34`} fill="none" stroke="#0c4a6e" strokeWidth="1.5" />
      <rect x={x0} y="40" width={63 * u} height="30" fill="#38bdf8" stroke="#0369a1" />
      <rect x={x0 + 63 * u} y="40" width={37 * u} height="30" fill="#fde68a" stroke="#a16207" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={x0 + (i + 1) * 30} y1="40" x2={x0 + (i + 1) * 30} y2="70" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1" />
      ))}
      <text x={x0 + (63 * u) / 2} y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0c4a6e">63</text>
      <text x={x0 + 63 * u + (37 * u) / 2} y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#713f12">37</text>
      <text x="170" y="98" textAnchor="middle" fontSize="13" fill="#334155">63 + 7 = 70, és még 30 → 63 + 37 = 100</text>
    </svg>
  );
};
