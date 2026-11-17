import React from 'react';
import { FONT, UNK, PriceTag } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Arrow: React.FC<{ id: string; color: string }> = ({ id, color }) => (
  <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
    <path d="M0,0 L8,4 L0,8 Z" fill={color} />
  </marker>
);

/** Százasra kerekítés számegyenesen: 145 ≈ 100, 382 ≈ 400. */
export const RoundHundredsSvg: Fig = ({ className }) => {
  const X = (v: number) => 30 + ((v - 100) * 320) / 300;
  return (
    <Frame w={380} h={150} className={className}>
      <text x="190" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">Melyik kerek százas van közelebb?</text>
      <line x1="22" y1="96" x2="358" y2="96" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 31 }).map((_, k) => {
        const v = 100 + k * 10;
        const big = v % 100 === 0;
        const mid = v % 50 === 0 && !big;
        return <line key={v} x1={X(v)} y1={big ? 86 : mid ? 89 : 92} x2={X(v)} y2={big ? 106 : mid ? 103 : 100} stroke={mid ? '#f59e0b' : '#334155'} strokeWidth={big ? 2 : mid ? 1.8 : 1} />;
      })}
      {[100, 200, 300, 400].map((v) => (
        <text key={v} x={X(v)} y="124" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{v}</text>
      ))}
      {[150, 250, 350].map((v) => (
        <text key={v} x={X(v)} y="120" textAnchor="middle" fontSize="10" fill="#b45309">{v}</text>
      ))}
      <circle cx={X(145)} cy="96" r="5" fill="#2563eb" />
      <text x={X(145)} y="62" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#2563eb">145</text>
      <path d={`M ${X(145) - 4} 68 Q ${(X(145) + X(100)) / 2} 52 ${X(100) + 2} 84`} fill="none" stroke="#2563eb" strokeWidth="2" markerEnd="url(#rh-a1)" />
      <circle cx={X(382)} cy="96" r="5" fill="#dc2626" />
      <text x={X(382)} y="62" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#dc2626">382</text>
      <path d={`M ${X(382) + 4} 68 Q ${(X(382) + X(400)) / 2 + 6} 54 ${X(400)} 84`} fill="none" stroke="#dc2626" strokeWidth="2" markerEnd="url(#rh-a2)" />
      <defs>
        <Arrow id="rh-a1" color="#2563eb" />
        <Arrow id="rh-a2" color="#dc2626" />
      </defs>
      <text x="190" y="144" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">145 ≈ 100 &nbsp;&nbsp;&nbsp; 382 ≈ 400</text>
    </Frame>
  );
};

/** Tízesre kerekítés: 145 ≈ 150 (az 5 felfelé kerekít), 382 ≈ 380. */
export const RoundTensSvg: Fig = ({ className }) => {
  const seg = (x0: number, lo: number, val: number, color: string, id: string) => {
    const X = (v: number) => x0 + ((v - lo) * 150) / 10;
    const target = Math.round(val / 10) * 10 === val ? val : val % 10 >= 5 ? lo + 10 : lo;
    return (
      <g>
        <line x1={x0 - 8} y1="92" x2={x0 + 158} y2="92" stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 11 }).map((_, k) => (
          <line key={k} x1={X(lo + k)} y1={k % 10 === 0 ? 82 : k === 5 ? 85 : 88} x2={X(lo + k)} y2={k % 10 === 0 ? 102 : k === 5 ? 99 : 96} stroke={k === 5 ? '#f59e0b' : '#334155'} strokeWidth={k % 10 === 0 ? 2 : 1.2} />
        ))}
        <text x={X(lo)} y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{lo}</text>
        <text x={X(lo + 10)} y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{lo + 10}</text>
        <circle cx={X(val)} cy="92" r="5" fill={color} />
        <text x={X(val)} y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill={color}>{val}</text>
        <path d={`M ${X(val)} 64 Q ${(X(val) + X(target)) / 2} 52 ${X(target)} 80`} fill="none" stroke={color} strokeWidth="2" markerEnd={`url(#${id})`} />
        <defs>
          <Arrow id={id} color={color} />
        </defs>
      </g>
    );
  };
  return (
    <Frame w={380} h={150} className={className}>
      <text x="190" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">Melyik kerek tízes van közelebb?</text>
      {seg(22, 140, 145, '#2563eb', 'rt-a1')}
      {seg(208, 380, 382, '#dc2626', 'rt-a2')}
      <text x="190" y="144" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">145 ≈ 150 (az 5-ös felfelé visz) &nbsp;&nbsp; 382 ≈ 380</text>
    </Frame>
  );
};

/** Két becslés és a pontos érték egy számegyenesen: 382 − 145. */
export const CompareEstimatesSvg: Fig = ({ className }) => {
  const X = (v: number) => 30 + ((v - 200) * 320) / 120;
  return (
    <Frame w={380} h={170} className={className}>
      <text x="190" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">382 − 145: melyik becslés van közelebb?</text>
      <line x1="22" y1="108" x2="358" y2="108" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 13 }).map((_, k) => {
        const v = 200 + k * 10;
        return <line key={v} x1={X(v)} y1={v % 50 === 0 ? 98 : 102} x2={X(v)} y2={v % 50 === 0 ? 118 : 114} stroke="#334155" strokeWidth={v % 50 === 0 ? 1.8 : 1} />;
      })}
      {[200, 250, 300].map((v) => (
        <text key={v} x={X(v)} y="134" textAnchor="middle" fontSize="12" fill="#64748b">{v}</text>
      ))}
      <rect x={X(230) - 34} y="44" width="68" height="34" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x={X(230)} y="59" textAnchor="middle" fontSize="10.5" fill="#1e3a8a">tízesre</text>
      <text x={X(230)} y="73" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">230</text>
      <line x1={X(230)} y1="78" x2={X(230)} y2="104" stroke="#2563eb" strokeWidth="2" />
      <rect x={X(300) - 34} y="44" width="68" height="34" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
      <text x={X(300)} y="59" textAnchor="middle" fontSize="10.5" fill="#7f1d1d">százasra</text>
      <text x={X(300)} y="73" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7f1d1d">300</text>
      <line x1={X(300)} y1="78" x2={X(300)} y2="104" stroke="#dc2626" strokeWidth="2" />
      <circle cx={X(237)} cy="108" r="6" fill="#16a34a" />
      <text x={X(237) + 10} y="152" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#16a34a">pontos: 237</text>
      <line x1={X(237)} y1="114" x2={X(237) + 8} y2="140" stroke="#16a34a" strokeWidth="1.5" />
    </Frame>
  );
};

/** Becslés-sáv 0–500: a kivonás becsült értéke melyik dobozba kerül? */
export const EstimateStripSvg: Fig = ({ className }) => (
  <Frame w={380} h={150} className={className}>
    <text x="190" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">Százasra kerekítve becsülünk.</text>
    {[0, 100, 200, 300, 400, 500].map((v, i) => (
      <g key={v}>
        <rect x={16 + i * 58} y="96" width="56" height="34" rx="6" fill={v === 300 ? '#dcfce7' : '#fff'} stroke={v === 300 ? '#16a34a' : '#94a3b8'} strokeWidth={v === 300 ? 2.5 : 1.5} />
        <text x={44 + i * 58} y="119" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{v}</text>
      </g>
    ))}
    <rect x="128" y="36" width="124" height="32" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="190" y="58" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#78350f">398 − 112</text>
    <path d="M 216 68 L 216 92" stroke="#16a34a" strokeWidth="2.4" markerEnd="url(#es-a)" />
    <defs>
      <Arrow id="es-a" color="#16a34a" />
    </defs>
    <text x="300" y="58" textAnchor="start" fontSize="12" fill="#334155">400 − 100</text>
    <text x="300" y="74" textAnchor="start" fontSize="12" fontWeight="bold" fill="#16a34a">= 300</text>
  </Frame>
);

/** Vásárlás becsléssel: 500 Ft, olló 278 Ft. */
export const ShopEstimateSvg: Fig = ({ className }) => (
  <Frame w={380} h={140} className={className}>
    <rect x="22" y="40" width="96" height="58" rx="10" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <rect x="22" y="30" width="96" height="16" rx="6" fill="#f59e0b" stroke="#a16207" strokeWidth="2" />
    <text x="70" y="78" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#713f12">500 Ft</text>
    <text x="146" y="78" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#dc2626">−</text>
    <g transform="translate(206 48)">
      <circle cx="-8" cy="10" r="7" fill="none" stroke="#e11d48" strokeWidth="3" />
      <circle cx="8" cy="10" r="7" fill="none" stroke="#e11d48" strokeWidth="3" />
      <line x1="-4" y1="4" x2="10" y2="-20" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="4" y1="4" x2="-10" y2="-20" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round" />
    </g>
    <PriceTag x={168} y={76} text="278 Ft" w={80} fs={14} />
    <text x="320" y="56" textAnchor="middle" fontSize="13" fill="#334155">278 ≈ 280</text>
    <text x="320" y="78" textAnchor="middle" fontSize="13" fill="#334155">500 − 280</text>
    <text x="320" y="100" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>≈ ?</text>
    <text x="190" y="128" textAnchor="middle" fontSize="12.5" fill="#475569">Körülbelül mennyi marad?</text>
  </Frame>
);

/** Kis ikonsor a „mire jó a becslés?” részhez: becslés → számolás → összevetés. */
export const EstimateCheckSvg: Fig = ({ className }) => (
  <Frame w={380} h={120} className={className}>
    {[
      { x: 18, t: '1. Becsülök', s: '380 − 150 = 230', c: '#2563eb', f: '#dbeafe' },
      { x: 136, t: '2. Kiszámolom', s: '382 − 145 = 237', c: '#7c3aed', f: '#ede9fe' },
      { x: 254, t: '3. Összevetem', s: '237 közel van', c: '#16a34a', f: '#dcfce7' }
    ].map((b, i) => (
      <g key={i}>
        <rect x={b.x} y="22" width="108" height="76" rx="12" fill={b.f} stroke={b.c} strokeWidth="2" />
        <text x={b.x + 54} y="50" textAnchor="middle" fontSize="13" fontWeight="bold" fill={b.c}>{b.t}</text>
        <text x={b.x + 54} y="74" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0f172a">{b.s}</text>
        {i === 2 && <text x={b.x + 54} y="90" textAnchor="middle" fontSize="11" fill="#0f172a">a 230-hoz. Jó!</text>}
        {i < 2 && <path d={`M ${b.x + 110} 60 L ${b.x + 132} 60`} stroke="#334155" strokeWidth="2.4" markerEnd="url(#ec-a)" />}
      </g>
    ))}
    <defs>
      <Arrow id="ec-a" color="#334155" />
    </defs>
  </Frame>
);
