import React from 'react';
import { UNK, QFig, Coin, Flat, FlatGroups, flatGroupsHeight, Note1000, PriceTag } from './MulDiv1000G3Parts';

// A V. fejezet kérdésábrái közül ezek itt is jók (tetszőleges számokkal).
export { BoxesFig, RodsFig, ShareFig, HopFig, CoinGridFig, CoinsFig, AnalogyFig, RibbonFig } from '../../szamolas-500-ig/szorzas-es-osztas/MulDiv500G3QuizParts';

// ---------------------------------------------------------------------------
// Saját kérdésábrák (1000-ig)
// ---------------------------------------------------------------------------

/** n százas lap egy sorban (n ≤ 10). */
export const FlatRowFig: React.FC<{ n: number }> = ({ n }) => {
  const s = Math.min(40, (220 - (n - 1) * 4) / n);
  const x0 = 120 - (n * (s + 4) - 4) / 2;
  return (
    <QFig h={s + 42}>
      {Array.from({ length: n }).map((_, i) => (
        <Flat key={i} x={x0 + i * (s + 4)} y={12} s={s} />
      ))}
      <text x="120" y={s + 32} textAnchor="middle" fontSize="11" fill="#475569">egy lap = 100</text>
    </QFig>
  );
};

/** Százas-lap csoportok. */
export const FlatGroupsFig: React.FC<{ groups: number; per: number }> = ({ groups, per }) => {
  const h = 14 + flatGroupsHeight(groups, per, 220, 24) + 18;
  return (
    <QFig h={h}>
      <FlatGroups groups={groups} per={per} x0={10} width={220} y={16} s={24} />
      <text x="120" y={h - 6} textAnchor="middle" fontSize="11" fill="#475569">egy lap = 100</text>
    </QFig>
  );
};

/** Szorzótábla → százasok: „a · b = ab” → „a · b00 = ?”. */
export const HundredAnalogyFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={92}>
    <rect x="40" y="12" width="160" height="28" rx="7" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
    <text x="120" y="32" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{a} · {b} = {a * b}</text>
    <path d="M 120 42 L 120 50" stroke="#64748b" strokeWidth="2" />
    <path d="M 115 47 L 120 53 L 125 47" fill="none" stroke="#64748b" strokeWidth="2" />
    <rect x="40" y="56" width="160" height="28" rx="7" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
    <text x="120" y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{a} · {b * 100} = <tspan fill={UNK}>?</tspan></text>
  </QFig>
);

/** Beváltás: total Ft → ? db coin forintos. */
export const ExchangeFig: React.FC<{ total: number; coin: number }> = ({ total, coin }) => (
  <QFig h={84}>
    <rect x="16" y="22" width="78" height="38" rx="8" fill="#fef3c7" stroke="#92400e" strokeWidth="1.8" />
    <text x="55" y="47" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#78350f">{total} Ft</text>
    <path d="M 102 41 L 134 41" stroke="#64748b" strokeWidth="2.5" />
    <path d="M 128 35 L 136 41 L 128 47" fill="none" stroke="#64748b" strokeWidth="2.5" />
    <text x="160" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>? ·</text>
    <Coin cx={200} cy={41} v={coin} r={20} />
  </QFig>
);

/** Számgép: ? → művelet → eredmény. */
export const MachineFig: React.FC<{ op: string; out: number | string; inp?: number | string }> = ({ op, out, inp = '?' }) => {
  const box = (x: number, v: number | string) => {
    const unk = v === '?';
    return (
      <g>
        <rect x={x} y={26} width="52" height="32" rx="7" fill={unk ? '#fee2e2' : '#f1f5f9'} stroke={unk ? UNK : '#475569'} strokeWidth="1.8" />
        <text x={x + 26} y={48} textAnchor="middle" fontSize="16" fontWeight="bold" fill={unk ? UNK : '#0f172a'}>{v}</text>
      </g>
    );
  };
  return (
    <QFig h={80}>
      {box(14, inp)}
      <path d="M 70 42 L 92 42" stroke="#64748b" strokeWidth="2" />
      <path d="M 87 37 L 93 42 L 87 47" fill="none" stroke="#64748b" strokeWidth="2" />
      <rect x="96" y="20" width="48" height="44" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="120" y="48" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#5b21b6">{op}</text>
      <path d="M 148 42 L 170 42" stroke="#64748b" strokeWidth="2" />
      <path d="M 165 37 L 171 42 L 165 47" fill="none" stroke="#64748b" strokeWidth="2" />
      {box(174, out)}
    </QFig>
  );
};

/** Vásárlás 1000 Ft-ból: n egyforma árcédula. */
export const ShopFig: React.FC<{ n: number; price: number; what: string }> = ({ n, price, what }) => (
  <QFig h={88}>
    <Note1000 x={10} y={18} w={74} h={38} />
    {Array.from({ length: n }).map((_, i) => (
      <PriceTag key={i} x={96 + i * 46} y={20} w={42} text={`${price}`} fs={13} />
    ))}
    <text x={96 + (n * 46 - 4) / 2} y={66} textAnchor="middle" fontSize="11" fill="#475569">{n} {what}, darabja {price} Ft</text>
    <text x="47" y="74" textAnchor="middle" fontSize="11" fill="#475569">ennyi van</text>
  </QFig>
);

/** Busz: egy buszba per utas fér; összesen total gyerek. */
export const BusFig: React.FC<{ total: number; per: number }> = ({ total, per }) => (
  <QFig h={92}>
    <text x="52" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{total}</text>
    <text x="52" y="48" textAnchor="middle" fontSize="12" fill="#475569">gyerek</text>
    <path d="M 92 40 L 112 40" stroke="#64748b" strokeWidth="2.5" />
    <path d="M 106 34 L 114 40 L 106 46" fill="none" stroke="#64748b" strokeWidth="2.5" />
    <rect x="122" y="18" width="92" height="42" rx="9" fill="#fde047" stroke="#a16207" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={130 + i * 20} y={25} width="14" height="13" rx="2" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1" />
    ))}
    <text x="168" y="54" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#713f12">{per} hely</text>
    <circle cx="140" cy="62" r="7" fill="#334155" />
    <circle cx="196" cy="62" r="7" fill="#334155" />
    <text x="168" y="86" textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>? busz</text>
  </QFig>
);

/** Két csík: az első egy egység (érték), a második k egység („k-szor annyi”). */
export const TimesBarsFig: React.FC<{ a: string; v: number; b: string; k: number }> = ({ a, v, b, k }) => {
  const u = Math.min(30, 150 / k);
  return (
    <QFig h={100}>
      <text x="58" y="31" textAnchor="end" fontSize="12" fontWeight="bold" fill="#334155">{a}</text>
      <rect x="64" y="16" width={u} height="20" fill="#fde68a" stroke="#92400e" />
      <text x={64 + u / 2} y="31" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{v}</text>
      <text x="58" y="63" textAnchor="end" fontSize="12" fontWeight="bold" fill="#334155">{b}</text>
      {Array.from({ length: k }).map((_, i) => (
        <rect key={i} x={64 + i * u} y="48" width={u} height="20" fill="#e0f2fe" stroke="#0369a1" />
      ))}
      <path d={`M ${70 + k * u} 14 L ${74 + k * u} 14 L ${74 + k * u} 70 L ${70 + k * u} 70`} fill="none" stroke="#334155" strokeWidth="1.4" />
      <text x={80 + k * u} y="47" fontSize="13" fontWeight="bold" fill={UNK}>?</text>
      <text x="120" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">{b}: {k}-szer annyi</text>
    </QFig>
  );
};

/** Szabálytáblázat: felül a lenti szám valahányszorosa. */
export const RuleTableFig: React.FC<{ top: (number | string)[]; bottom: number[] }> = ({ top, bottom }) => {
  const n = bottom.length;
  const cw = 40;
  const x0 = 120 - ((n + 1) * cw) / 2;
  return (
    <QFig h={86}>
      <rect x={x0} y={14} width={cw} height="28" fill="#fed7aa" stroke="#475569" />
      <path d={`M ${x0 + 20} 19 L ${x0 + 29} 36 L ${x0 + 11} 36 Z`} fill="#f97316" stroke="#9a3412" strokeWidth="1.2" />
      <rect x={x0} y={42} width={cw} height="28" fill="#bfdbfe" stroke="#475569" />
      <rect x={x0 + 10} y={49} width="20" height="14" fill="#1d4ed8" />
      {bottom.map((b, i) => {
        const x = x0 + (i + 1) * cw;
        const t = top[i];
        return (
          <g key={i}>
            <rect x={x} y={14} width={cw} height="28" fill={t === '?' ? '#fee2e2' : '#fff'} stroke="#475569" />
            <text x={x + 20} y={33} textAnchor="middle" fontSize="13" fontWeight="bold" fill={t === '?' ? UNK : '#0f172a'}>{t}</text>
            <rect x={x} y={42} width={cw} height="28" fill="#fff" stroke="#475569" />
            <text x={x + 20} y={61} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{b}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Szalag: n egyforma levágott darab (piece cm) + maradék (rest cm), az egész „?”. */
export const CutFig: React.FC<{ n: number; piece: number; rest: number }> = ({ n, piece, rest }) => {
  const total = n * piece + rest;
  const k = 210 / total;
  return (
    <QFig h={84}>
      <path d="M 15 22 L 15 18 L 225 18 L 225 22" fill="none" stroke="#334155" strokeWidth="1.4" />
      <text x="120" y="14" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>? cm</text>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <rect x={15 + i * piece * k} y="28" width={piece * k} height="20" fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.4" />
          <text x={15 + (i + 0.5) * piece * k} y="43" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#831843">{piece}</text>
        </g>
      ))}
      <rect x={15 + n * piece * k} y="28" width={rest * k} height="20" fill="#e2e8f0" stroke="#475569" strokeWidth="1.4" />
      <text x={15 + n * piece * k + (rest * k) / 2} y="43" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{rest}</text>
      <text x={15 + (n * piece * k) / 2} y="66" textAnchor="middle" fontSize="11" fill="#475569">levágott darabok</text>
      <text x={15 + n * piece * k + (rest * k) / 2} y="66" textAnchor="middle" fontSize="11" fill="#475569">maradt</text>
    </QFig>
  );
};
