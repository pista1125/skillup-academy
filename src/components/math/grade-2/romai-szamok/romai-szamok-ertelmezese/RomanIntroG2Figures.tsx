import React from 'react';
import {
  ROMAN_FONT,
  UI_FONT,
  RomanClockPart,
  StickRomanPart,
  stickRomanWidth,
  NumberLinePart,
  NumberTilePart
} from './RomanIntroG2Parts';

const FIG = 'w-full max-w-[480px] h-auto mx-auto';

/** Hol találkozunk római számokkal? Óra, könyvfejezet, emelet, király neve. */
export const WhereWeMeetRomanSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 220" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="1" y="1" width="478" height="218" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
    {/* óra */}
    <RomanClockPart cx={66} cy={92} r={46} hour={3} />
    <text x="66" y="186" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">Óra</text>

    {/* könyv */}
    <g>
      <rect x="140" y="44" width="92" height="104" rx="6" fill="#fde68a" stroke="#b45309" strokeWidth="3" />
      <line x1="150" y1="44" x2="150" y2="148" stroke="#b45309" strokeWidth="3" />
      <text x="192" y="96" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#78350f" fontFamily={ROMAN_FONT}>III.</text>
      <text x="192" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">fejezet</text>
      <text x="186" y="186" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">Könyv</text>
    </g>

    {/* emelet tábla */}
    <g>
      <rect x="258" y="40" width="88" height="112" rx="6" fill="#e2e8f0" stroke="#475569" strokeWidth="3" />
      <rect x="268" y="52" width="68" height="40" rx="6" fill="#1e293b" />
      <text x="302" y="81" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#facc15" fontFamily={ROMAN_FONT}>II.</text>
      <text x="302" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">emelet</text>
      <path d="M 288 124 L 302 138 L 316 124 Z" fill="#64748b" />
      <text x="302" y="186" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">Lépcsőház</text>
    </g>

    {/* király */}
    <g>
      <path d="M 384 70 L 392 46 L 404 62 L 414 40 L 424 62 L 436 46 L 444 70 Z" fill="#facc15" stroke="#a16207" strokeWidth="2.5" />
      <circle cx="414" cy="88" r="18" fill="#fde7d4" stroke="#9a3412" strokeWidth="2" />
      <rect x="376" y="112" width="76" height="34" rx="6" fill="#fef3c7" stroke="#a16207" strokeWidth="2.5" />
      <text x="414" y="135" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#78350f">
        <tspan fontFamily={ROMAN_FONT}>IV.</tspan> Béla
      </text>
      <text x="414" y="186" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">Király neve</text>
    </g>
    <text x="240" y="208" textAnchor="middle" fontSize="12" fill="#475569">
      A római szám után sokszor pont áll: III. fejezet = harmadik fejezet.
    </text>
  </svg>
);

/** A három jel pálcikával: I = 1, V = 5, X = 10. */
export const ThreeSignsSticksSvg: React.FC<{ className?: string }> = ({ className }) => {
  const signs: { s: string; v: string; fill: string; stroke: string }[] = [
    { s: 'I', v: '1', fill: '#dbeafe', stroke: '#2563eb' },
    { s: 'V', v: '5', fill: '#dcfce7', stroke: '#16a34a' },
    { s: 'X', v: '10', fill: '#fee2e2', stroke: '#dc2626' }
  ];
  return (
    <svg viewBox="0 0 480 200" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
      <rect x="1" y="1" width="478" height="198" rx="16" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      {signs.map((g, i) => {
        const x = 24 + i * 152;
        const w = stickRomanWidth(g.s, 70);
        return (
          <g key={g.s}>
            <rect x={x} y="18" width="128" height="164" rx="14" fill={g.fill} stroke={g.stroke} strokeWidth="3" />
            <StickRomanPart value={g.s} x={x + 64 - w / 2} y={34} h={70} />
            <text x={x + 64} y="140" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#0f172a" fontFamily={ROMAN_FONT}>
              {g.s}
            </text>
            <text x={x + 64} y="170" textAnchor="middle" fontSize="20" fontWeight="bold" fill={g.stroke}>
              = {g.v}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Legfeljebb három egyforma jel egymás mellett. */
export const MaxThreeSignsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows: { s: string; v: string; ok: boolean }[] = [
    { s: 'I', v: '1', ok: true },
    { s: 'II', v: '2', ok: true },
    { s: 'III', v: '3', ok: true },
    { s: 'IIII', v: '4', ok: false }
  ];
  return (
    <svg viewBox="0 0 480 190" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
      <rect x="1" y="1" width="478" height="188" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      {rows.map((r, i) => {
        const x = 18 + i * 114;
        const w = stickRomanWidth(r.s, 56);
        return (
          <g key={r.s}>
            <rect
              x={x}
              y="16"
              width="102"
              height="124"
              rx="12"
              fill={r.ok ? '#ecfdf5' : '#fef2f2'}
              stroke={r.ok ? '#10b981' : '#ef4444'}
              strokeWidth="3"
            />
            <StickRomanPart value={r.s} x={x + 51 - w / 2} y={28} h={56} />
            <text x={x + 51} y="112" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a" fontFamily={ROMAN_FONT}>
              {r.s}
            </text>
            <text x={x + 51} y="132" textAnchor="middle" fontSize="15" fontWeight="bold" fill={r.ok ? '#047857' : '#b91c1c'}>
              {r.ok ? `= ${r.v}  ✓` : 'nem jó ✗'}
            </text>
          </g>
        );
      })}
      <text x="240" y="168" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#b91c1c">
        Négy egyforma jel nem állhat egymás mellett!
      </text>
      <text x="240" y="184" textAnchor="middle" fontSize="13" fill="#334155">
        A 4 helyes írása: <tspan fontFamily={ROMAN_FONT} fontWeight="bold">IV</tspan>
      </text>
    </svg>
  );
};

/** Jobbra ad, balra elvesz: VI, IV, XI, IX. */
export const LeftRightRuleSvg: React.FC<{ className?: string }> = ({ className }) => {
  const cards: { s: string; expr: string; good: boolean }[] = [
    { s: 'IV', expr: '5 − 1 = 4', good: false },
    { s: 'VI', expr: '5 + 1 = 6', good: true },
    { s: 'IX', expr: '10 − 1 = 9', good: false },
    { s: 'XI', expr: '10 + 1 = 11', good: true }
  ];
  return (
    <svg viewBox="0 0 480 210" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
      <rect x="1" y="1" width="478" height="208" rx="16" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="2" />
      {cards.map((c, i) => {
        const x = 16 + i * 116;
        const col = c.good ? '#16a34a' : '#dc2626';
        const smallIdx = c.s.indexOf('I');
        const w = stickRomanWidth(c.s, 54);
        return (
          <g key={c.s}>
            <rect x={x} y="16" width="104" height="150" rx="12" fill="#ffffff" stroke={col} strokeWidth="3" />
            <StickRomanPart value={c.s} x={x + 52 - w / 2} y={30} h={54} highlightIndex={smallIdx} />
            <text x={x + 52} y="116" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#0f172a" fontFamily={ROMAN_FONT}>
              {c.s}
            </text>
            <text x={x + 52} y="150" textAnchor="middle" fontSize="15" fontWeight="bold" fill={col}>
              {c.expr}
            </text>
          </g>
        );
      })}
      <text x="124" y="194" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#dc2626">I balra: elveszünk</text>
      <text x="356" y="194" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#16a34a">I jobbra: hozzáadunk</text>
    </svg>
  );
};

/** Nincs nulla: a 0-nak nincs római jele. */
export const NoZeroRomanSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 140" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="1" y="1" width="478" height="138" rx="16" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2" />
    <NumberLinePart x={40} y={62} w={380} from={0} to={10} />
    {Array.from({ length: 10 }, (_, i) => (
      <text key={i} x={40 + (i + 1) * 38} y="40" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7c3aed" fontFamily={ROMAN_FONT}>
        {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][i]}
      </text>
    ))}
    <circle cx="40" cy="34" r="13" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
    <text x="40" y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">?</text>
    <NumberTilePart x={110} y={98} w={260} h={32} label="A 0-nak nincs római jele!" fill="#fee2e2" stroke="#dc2626" color="#991b1b" fontSize={15} />
  </svg>
);
