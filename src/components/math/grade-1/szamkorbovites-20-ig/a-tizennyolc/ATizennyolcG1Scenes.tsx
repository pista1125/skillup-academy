// „A tizennyolc” – saját képek: Zümi születésnapja, lufik a Számkertben, körhinta-korongok.
// A közös képek (két tízes keret, tízesrúd, dominópár, számsorok…) a tizenöt leckéből jönnek.
import React from 'react';
import { garden, FONT, PURPLE } from '../a-tizenot/ATizenotG1Scenes';

export const LRED = '#ef4444';
export const LYELLOW = '#facc15';
export const LBLUE = '#3b82f6';

/** Egy lufi (középpont x, y; s = 1 → kb. 32 × 40 px + madzag). `popped`: kipukkadt (tépett darabok). */
export const balloonG = (x: number, y: number, s: number, color: string, popped = false, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    {popped ? (
      <>
        <path d="M-14 -6 L-4 -2 L-10 -16 L0 -6 L6 -18 L6 -4 L16 -10 L8 2 L-6 4 Z" fill={color} stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" opacity="0.8" />
        <path d="M0 4 Q-6 14 2 22 Q8 30 0 38" fill="none" stroke="#475569" strokeWidth="2" />
      </>
    ) : (
      <>
        <ellipse cx="0" cy="0" rx="15" ry="19" fill={color} stroke="#111827" strokeWidth="2.5" />
        <ellipse cx="-5" cy="-7" rx="4" ry="6" fill="#fff" opacity="0.55" />
        <path d="M-3 19 L3 19 L0 23 Z" fill={color} stroke="#111827" strokeWidth="2" />
        <path d="M0 23 Q-6 31 2 38 Q8 44 0 50" fill="none" stroke="#475569" strokeWidth="2" />
      </>
    )}
  </g>
);

const BAL_POS: [number, number][] = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) BAL_POS.push([46 + c * 76 + (r % 2) * 30, 40 + r * 62]);

/**
 * Lufik a kertben (legfeljebb 18): az első `n` piros, utána `nb` sárga.
 * `popped`: az utolsó ennyi kipukkadt (elvétel).
 */
export const BalloonScene: React.FC<{ n: number; nb?: number; popped?: number; colorA?: string; colorB?: string }> = ({
  n,
  nb = 0,
  popped = 0,
  colorA = LRED,
  colorB = LYELLOW,
}) => {
  const total = Math.min(18, n + nb);
  return (
    <svg viewBox="0 0 480 240">
      {garden(480, 240)}
      {BAL_POS.slice(0, total).map(([x, y], i) => balloonG(x, y, 1.05, i < n ? colorA : colorB, i >= total - popped, i))}
    </svg>
  );
};

/** Lufik keretes kártyán, 5-ös sorokban (0–20) – válaszkártyához. `nb` darab második színű a végén. */
export const BalloonBox: React.FC<{ n: number; nb?: number; color?: string; colorB?: string; className?: string }> = ({
  n,
  nb = 0,
  color = LRED,
  colorB = LYELLOW,
  className = 'w-36 h-[100px]',
}) => {
  const total = n + nb;
  const rows = Math.max(1, Math.ceil(total / 5));
  const cell = rows <= 3 ? 30 : 24;
  const x0 = 80 - (5 * cell) / 2;
  const top = 55 - (rows * cell) / 2;
  return (
    <svg viewBox="0 0 160 110" className={className}>
      <rect x="3" y="3" width="154" height="104" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: total }, (_, i) =>
        balloonG(x0 + (i % 5) * cell + cell / 2, top + Math.floor(i / 5) * cell + cell * 0.36, cell / 58, i < n ? color : colorB, false, i)
      )}
    </svg>
  );
};

/** Kisebb lufikártya a párosítóhoz, válogatóhoz. */
export const MiniBalloons: React.FC<{ n: number; nb?: number; color?: string }> = (p) => <BalloonBox {...p} className="w-28 h-[76px]" />;

/** Lufisor 6-os sorokban; `group`-onként váltakozó szín (kettesével, hármasával számoláshoz). */
export const BalloonGroups: React.FC<{ n: number; group: number }> = ({ n, group }) => {
  const per = 6;
  const rows = Math.ceil(n / per);
  const cell = 64;
  const w = per * cell + 20;
  const h = rows * 70 + 20;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[420px] h-auto mx-auto">
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) =>
        balloonG(10 + (i % per) * cell + cell / 2, 32 + Math.floor(i / per) * 70, 0.95, Math.floor(i / group) % 2 === 0 ? LRED : LBLUE, false, i)
      )}
    </svg>
  );
};

/** Körhinta-korongok: `n` darab „1”-es korong két sorban (10 + a többi); az első `circled` darab bekarikázva. */
export const TokensScene: React.FC<{ n: number; circled?: number }> = ({ n, circled = 0 }) => {
  const pos = (i: number): [number, number] => [52 + (i % 10) * 42, i < 10 ? 92 : 150];
  return (
    <svg viewBox="0 0 480 220">
      <rect x="0" y="0" width="480" height="220" rx="18" fill="#fef9c3" />
      {/* körhinta-tető */}
      <path d="M190 52 L240 14 L290 52 Z" fill="#ec4899" stroke="#831843" strokeWidth="3" strokeLinejoin="round" />
      <path d="M200 52 V64 M240 52 V64 M280 52 V64" stroke="#831843" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => {
        const [cx, cy] = pos(i);
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="17" fill="#cbd5e1" stroke="#334155" strokeWidth="3" />
            <text x={cx} y={cy + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e293b" fontFamily={FONT}>1</text>
          </g>
        );
      })}
      {circled > 0 && (
        <rect x={pos(0)[0] - 24} y={pos(0)[1] - 24} width={(circled - 1) * 42 + 48} height="48" rx="24" fill="none" stroke={PURPLE} strokeWidth="4" />
      )}
    </svg>
  );
};

/** Ünnepi kerti kép: lufifüzér a tetején (a mese nyitó- és záróoldalához, a FriendsScene `extra`-jaként). */
export const balloonGarland = (
  <g>
    <path d="M10 18 Q240 70 470 18" fill="none" stroke="#64748b" strokeWidth="3" />
    {[60, 130, 200, 270, 340, 410].map((x, i) => balloonG(x, 26 + Math.sin((x / 480) * Math.PI) * 20, 0.8, [LRED, LYELLOW, LBLUE][i % 3], false, x))}
  </g>
);
