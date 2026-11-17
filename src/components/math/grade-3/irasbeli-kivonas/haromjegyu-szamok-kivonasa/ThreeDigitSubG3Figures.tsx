import React from 'react';
import { FONT, Coin, DiscCell, PlaceHeader, PLACE_BODY, ItemIcon, ItemKind, PriceTag, UNK } from './ThreeDigitSubG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** 465 Ft − 200 Ft = 265 Ft: két 100-ast elköltünk, a többi érme marad. */
export const SubHundredsSvg: Fig = ({ className }) => {
  const coins = [100, 100, 100, 100, 50, 10, 5];
  return (
    <Frame w={360} h={150} className={className}>
      <text x="180" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">A pénztárcában 465 Ft van. 200 Ft-ot elköltünk.</text>
      {coins.map((v, i) => (
        <Coin key={i} cx={46 + i * 45} cy={68} v={v} r={19} crossed={i < 2} />
      ))}
      <rect x="22" y="44" width="92" height="48" rx="10" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 3" />
      <text x="68" y="108" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#dc2626">− 200 Ft</text>
      <text x="180" y="136" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">465 Ft − 200 Ft = <tspan fill="#16a34a">265 Ft</tspan></text>
    </Frame>
  );
};

/** 420 − 180: 1 százast felváltunk 10 tízesre, utána elvesszük az 1 százast és a 8 tízest. */
export const ExchangeTensSvg: Fig = ({ className }) => {
  const x0 = 96;
  const cw = [84, 150, 70];
  const cx = [x0, x0 + cw[0], x0 + cw[0] + cw[1]];
  const rows = [
    { y: 30, label: '420', sub: '', sz: 4, t: 2, csz: 0, ct: 0, fresh: 0 },
    { y: 78, label: 'felváltom', sub: '1 sz = 10 t', sz: 3, t: 12, csz: 0, ct: 0, fresh: 10 },
    { y: 140, label: '− 180', sub: '', sz: 3, t: 12, csz: 1, ct: 8, fresh: 0 }
  ];
  return (
    <Frame w={380} h={228} className={className}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={cx[i]} y={10} width={cw[i]} height={18} fill={['#f87171', '#60a5fa', '#facc15'][i]} stroke="#fff" />
          <text x={cx[i] + cw[i] / 2} y={24} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{['sz', 't', 'e'][i]}</text>
          <rect x={cx[i]} y={28} width={cw[i]} height={160} fill={PLACE_BODY[i]} opacity="0.7" stroke="#fff" />
        </g>
      ))}
      {rows.map((r, k) => (
        <g key={k}>
          <text x={x0 - 8} y={r.y + 16} textAnchor="end" fontSize="14" fontWeight="bold" fill={k === 1 ? '#16a34a' : '#0f172a'}>{r.label}</text>
          {r.sub && <text x={x0 - 8} y={r.y + 31} textAnchor="end" fontSize="11" fill="#16a34a">{r.sub}</text>}
          <DiscCell x={cx[0]} y={r.y + 4} w={cw[0]} n={r.sz} place={0} r={7} crossed={r.csz} />
          <DiscCell x={cx[1]} y={r.y + 4} w={cw[1]} n={r.t} place={1} r={7} crossed={r.ct} fresh={r.fresh} perRow={8} />
          {k < 2 && <line x1={x0} y1={r.y + 44} x2={x0 + 304} y2={r.y + 44} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />}
        </g>
      ))}
      <path d={`M ${cx[0] + 66} 42 Q ${cx[0] + 100} 56 ${cx[1] + 20} 86`} fill="none" stroke="#16a34a" strokeWidth="2.2" markerEnd="url(#ett-arr)" />
      <defs>
        <marker id="ett-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#16a34a" />
        </marker>
      </defs>
      <line x1="14" y1="188" x2="366" y2="188" stroke="#334155" strokeWidth="2" />
      <text x="190" y="214" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">Marad 2 százas és 4 tízes: <tspan fill="#16a34a">420 − 180 = 240</tspan></text>
    </Frame>
  );
};

/** Számegyenes: 420 − 180 = 420 − 100 − 80. */
export const JumpBackSvg: Fig = ({ className }) => {
  const lo = 200;
  const hi = 440;
  const X = (v: number) => 30 + ((v - lo) * 320) / (hi - lo);
  return (
    <Frame w={380} h={150} className={className}>
      <text x="190" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">Előbb a százast, aztán a tízeseket veszem el.</text>
      <line x1={X(lo) - 6} y1="104" x2={X(hi) + 8} y2="104" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: (hi - lo) / 10 + 1 }).map((_, k) => {
        const v = lo + k * 10;
        const big = v % 50 === 0;
        return <line key={v} x1={X(v)} y1={big ? 96 : 100} x2={X(v)} y2={big ? 112 : 108} stroke="#334155" strokeWidth={big ? 1.8 : 1} />;
      })}
      {[200, 250, 300, 350, 400].map((v) => (
        <text key={v} x={X(v)} y="128" textAnchor="middle" fontSize="11" fill="#64748b">{v}</text>
      ))}
      <path d={`M ${X(420)} 98 Q ${(X(420) + X(320)) / 2} 30 ${X(320)} 98`} fill="none" stroke="#dc2626" strokeWidth="2.4" markerEnd="url(#jb-arr)" />
      <path d={`M ${X(320)} 98 Q ${(X(320) + X(240)) / 2} 50 ${X(240)} 98`} fill="none" stroke="#2563eb" strokeWidth="2.4" markerEnd="url(#jb-arr2)" />
      <defs>
        <marker id="jb-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#dc2626" /></marker>
        <marker id="jb-arr2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#2563eb" /></marker>
      </defs>
      <text x={(X(420) + X(320)) / 2} y="52" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">− 100</text>
      <text x={(X(320) + X(240)) / 2} y="66" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb">− 80</text>
      {[420, 320, 240].map((v) => (
        <g key={v}>
          <circle cx={X(v)} cy="104" r="4.5" fill={v === 240 ? '#16a34a' : '#0f172a'} />
          <text x={X(v)} y="144" textAnchor="middle" fontSize="13" fontWeight="bold" fill={v === 240 ? '#16a34a' : '#0f172a'}>{v}</text>
        </g>
      ))}
    </Frame>
  );
};

/** Pótlás: 500 − 285. A 285-től lépünk előre 500-ig: +15, +200. */
export const FillUpSvg: Fig = ({ className }) => {
  const lo = 280;
  const hi = 500;
  const X = (v: number) => 30 + ((v - lo) * 320) / (hi - lo);
  return (
    <Frame w={380} h={160} className={className}>
      <text x="190" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">Pótlással: mennyi kell a 285-höz, hogy 500 legyen?</text>
      <line x1={X(lo) - 6} y1="110" x2={X(hi) + 8} y2="110" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: (hi - lo) / 10 + 1 }).map((_, k) => {
        const v = lo + k * 10;
        const big = v % 100 === 0;
        return <line key={v} x1={X(v)} y1={big ? 102 : 106} x2={X(v)} y2={big ? 118 : 114} stroke="#334155" strokeWidth={big ? 1.8 : 1} />;
      })}
      <path d={`M ${X(285)} 104 Q ${(X(285) + X(300)) / 2} 76 ${X(300)} 104`} fill="none" stroke="#16a34a" strokeWidth="2.4" markerEnd="url(#fu-arr)" />
      <path d={`M ${X(300)} 104 Q ${(X(300) + X(500)) / 2} 34 ${X(500)} 104`} fill="none" stroke="#16a34a" strokeWidth="2.4" markerEnd="url(#fu-arr)" />
      <defs>
        <marker id="fu-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#16a34a" /></marker>
      </defs>
      <text x={(X(285) + X(300)) / 2} y="72" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#16a34a">+ 15</text>
      <text x={(X(300) + X(500)) / 2} y="58" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#16a34a">+ 200</text>
      <text x={X(285) - 4} y="136" textAnchor="end" fontSize="13" fontWeight="bold" fill="#0f172a">285</text>
      <text x={X(300) + 4} y="136" textAnchor="start" fontSize="13" fontWeight="bold" fill="#0f172a">300</text>
      <text x={X(400)} y="136" textAnchor="middle" fontSize="11" fill="#64748b">400</text>
      <text x={X(500)} y="136" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">500</text>
      <text x="190" y="154" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#0f172a">15 + 200 = 215, tehát <tspan fill="#16a34a">500 − 285 = 215</tspan></text>
    </Frame>
  );
};

/** Játékbolt polca árcédulákkal és egy 500 Ft-os pénztárca. */
export const TOY_SHELF: { kind: ItemKind; name: string; price: number }[] = [
  { kind: 'robot', name: 'robot', price: 320 },
  { kind: 'kite', name: 'sárkány', price: 245 },
  { kind: 'ball', name: 'labda', price: 180 },
  { kind: 'yoyo', name: 'jojó', price: 90 },
  { kind: 'bear', name: 'maci', price: 415 },
  { kind: 'puzzle', name: 'kirakó', price: 365 }
];
export const ToyShopSvg: Fig = ({ className }) => (
  <Frame w={380} h={170} className={className}>
    <rect x="12" y="104" width="270" height="8" rx="3" fill="#a16207" />
    {TOY_SHELF.map((it, i) => {
      const cx = 36 + i * 45;
      return (
        <g key={it.name}>
          <ItemIcon kind={it.kind} cx={cx} cy={i % 2 ? 84 : 80} s={0.95} />
          <PriceTag x={cx - 22} y={118} text={`${it.price}`} w={44} fs={11} />
          <text x={cx} y={154} textAnchor="middle" fontSize="10" fill="#475569">{it.name}</text>
        </g>
      );
    })}
    <text x="146" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">Az árak forintban vannak.</text>
    <rect x="296" y="52" width="72" height="56" rx="10" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <rect x="296" y="44" width="72" height="14" rx="6" fill="#f59e0b" stroke="#a16207" strokeWidth="2" />
    <text x="332" y="88" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#713f12">500 Ft</text>
    <text x="332" y="128" textAnchor="middle" fontSize="11" fill="#475569">ennyi pénzed</text>
    <text x="332" y="142" textAnchor="middle" fontSize="11" fill="#475569">van</text>
    <text x="332" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>Mennyi marad?</text>
  </Frame>
);

/** Kerek tízesek helyiérték-táblázatban, felváltás nélkül: 470 − 230. */
export const NoExchangeTensSvg: Fig = ({ className }) => (
  <Frame w={360} h={130} className={className}>
    <PlaceHeader x={90} y={12} cw={80} h={20} />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={90 + i * 80} y={32} width={80} height={60} fill={PLACE_BODY[i]} opacity="0.7" stroke="#fff" />
    ))}
    <text x={82} y={56} textAnchor="end" fontSize="14" fontWeight="bold" fill="#0f172a">470</text>
    <text x={82} y={74} textAnchor="end" fontSize="13" fontWeight="bold" fill="#dc2626">− 230</text>
    <DiscCell x={90} y={40} w={80} n={4} place={0} r={7} crossed={2} />
    <DiscCell x={170} y={40} w={80} n={7} place={1} r={7} crossed={3} perRow={4} />
    <text x="180" y="116" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">4 − 2 = 2 százas, 7 − 3 = 4 tízes: <tspan fill="#16a34a">240</tspan></text>
  </Frame>
);
