import React from 'react';
import { ClockFace } from './WordProblems100G3Clock';

type FigProps = { className?: string };

const FONT = 'system-ui, Segoe UI, sans-serif';

/** A szöveges feladat megoldásának 5 lépése – lépcső. */
export const FiveStepsSvg: React.FC<FigProps> = ({ className }) => {
  const steps = [
    { t: '1. Adatok', s: 'Mit tudunk?', c: '#0ea5e9' },
    { t: '2. Terv', s: 'Számfeladat', c: '#8b5cf6' },
    { t: '3. Számolás', s: 'Kiszámolom', c: '#f59e0b' },
    { t: '4. Ellenőrzés', s: 'Jó lett?', c: '#10b981' },
    { t: '5. Válasz', s: 'Mondatban', c: '#ef4444' }
  ];
  return (
    <svg viewBox="0 0 520 230" className={className ?? 'w-full max-w-xl h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="518" height="228" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      {steps.map((st, i) => {
        const x = 14 + i * 100;
        const h = 60 + i * 30;
        const y = 210 - h;
        return (
          <g key={st.t}>
            <rect x={x} y={y} width="94" height={h} rx="10" fill={st.c} opacity="0.9" />
            <text x={x + 47} y={y + 24} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">{st.t}</text>
            <text x={x + 47} y={y + 44} textAnchor="middle" fontSize="12" fill="#fff">{st.s}</text>
          </g>
        );
      })}
      {/* kis figura a lépcső aljánál */}
      <circle cx="50" cy="104" r="9" fill="#fde68a" stroke="#92400e" strokeWidth="1.5" />
      <line x1="50" y1="113" x2="50" y2="130" stroke="#92400e" strokeWidth="2.5" />
      <line x1="50" y1="118" x2="39" y2="110" stroke="#92400e" strokeWidth="2.5" />
      <line x1="50" y1="118" x2="61" y2="110" stroke="#92400e" strokeWidth="2.5" />
      <line x1="50" y1="130" x2="43" y2="138" stroke="#92400e" strokeWidth="2.5" />
      <line x1="50" y1="130" x2="57" y2="138" stroke="#92400e" strokeWidth="2.5" />
    </svg>
  );
};

/** „7-tel több” – két szalag, a második ugyanolyan hosszú + egy darab. */
export const MoreThanSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 480 170" className={className ?? 'w-full max-w-lg h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="478" height="168" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="20" y="48" fontSize="14" fontWeight="bold" fill="#0369a1">Misi</text>
    <rect x="80" y="30" width="286" height="28" rx="6" fill="#7dd3fc" stroke="#0369a1" strokeWidth="2" />
    <text x="223" y="49" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0c4a6e">26 kavics</text>
    <text x="20" y="108" fontSize="14" fontWeight="bold" fill="#be123c">Lili</text>
    <rect x="80" y="90" width="286" height="28" rx="6" fill="#fda4af" stroke="#be123c" strokeWidth="2" />
    <text x="223" y="109" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#881337">26 kavics</text>
    <rect x="366" y="90" width="77" height="28" rx="6" fill="#fde047" stroke="#a16207" strokeWidth="2" />
    <text x="404" y="109" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#713f12">7</text>
    <line x1="366" y1="66" x2="366" y2="84" stroke="#64748b" strokeDasharray="4 3" />
    <text x="404" y="78" textAnchor="middle" fontSize="12" fill="#a16207" fontWeight="bold">7-tel több</text>
    <path d="M 80 132 Q 80 142 90 142 L 252 142 Q 261 142 261 152 Q 261 142 270 142 L 433 142 Q 443 142 443 132" fill="none" stroke="#be123c" strokeWidth="2" />
    <text x="261" y="166" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#be123c">Lili: 26 + 7 = 33</text>
  </svg>
);

/** Szakaszos ábra – az egész és a részek (kerítésfestés). */
export const SegmentModelSvg: React.FC<FigProps> = ({ className }) => {
  const x0 = 30;
  const unit = 8.4; // 1 m
  const tick = (m: number) => x0 + m * unit;
  return (
    <svg viewBox="0 0 480 190" className={className ?? 'w-full max-w-lg h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="478" height="188" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1={tick(0)} y1="40" x2={tick(50) + 12} y2="40" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 51 }, (_, m) => (
        <line key={m} x1={tick(m)} y1={m % 10 === 0 ? 32 : m % 5 === 0 ? 35 : 37} x2={tick(m)} y2="43" stroke="#334155" strokeWidth={m % 10 === 0 ? 1.6 : 0.8} />
      ))}
      {[0, 10, 20, 30, 40, 50].map((m) => (
        <text key={m} x={tick(m)} y="60" textAnchor="middle" fontSize="12" fill="#334155">{m}</text>
      ))}
      <text x={tick(50) + 6} y="25" fontSize="11" fill="#334155">m</text>
      {/* egész */}
      <line x1={tick(0)} y1="88" x2={tick(50)} y2="88" stroke="#ea580c" strokeWidth="4" />
      <line x1={tick(0)} y1="80" x2={tick(0)} y2="96" stroke="#ea580c" strokeWidth="2" />
      <line x1={tick(50)} y1="80" x2={tick(50)} y2="96" stroke="#ea580c" strokeWidth="2" />
      <text x={tick(25)} y="78" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">az egész kerítés: 50 m</text>
      {/* részek */}
      <line x1={tick(0)} y1="140" x2={tick(32)} y2="140" stroke="#16a34a" strokeWidth="4" />
      <line x1={tick(32)} y1="140" x2={tick(50)} y2="140" stroke="#2563eb" strokeWidth="4" strokeDasharray="8 4" />
      {[0, 32, 50].map((m) => (
        <line key={m} x1={tick(m)} y1="132" x2={tick(m)} y2="148" stroke="#334155" strokeWidth="2" />
      ))}
      <text x={tick(16)} y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">már lefestette: 32 m</text>
      <text x={tick(41)} y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">még: ? m</text>
      <text x={tick(25)} y="172" textAnchor="middle" fontSize="13" fill="#334155">50 − 32 = 18, mert 32 + 18 = 50</text>
    </svg>
  );
};

/** Elágazásos rajz: 2 sapka · 3 sál = 6 öltözék. */
export const TreeDiagramSvg: React.FC<FigProps> = ({ className }) => {
  const hats = [
    { c: '#ef4444', y: 60, n: 'piros' },
    { c: '#3b82f6', y: 160, n: 'kék' }
  ];
  const scarves = [
    { c: '#facc15', n: 'sárga' },
    { c: '#22c55e', n: 'zöld' },
    { c: '#a855f7', n: 'lila' }
  ];
  return (
    <svg viewBox="0 0 440 240" className={className ?? 'w-full max-w-md h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="438" height="238" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="70" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">sapka</text>
      <text x="230" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">sál</text>
      <text x="370" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">öltözék</text>
      {hats.map((h, i) => (
        <g key={h.n}>
          <path d={`M 50 ${h.y + 10} Q 70 ${h.y - 26} 90 ${h.y + 10} Z`} fill={h.c} stroke="#1e293b" strokeWidth="1.2" />
          <rect x="44" y={h.y + 8} width="52" height="7" rx="3" fill={h.c} stroke="#1e293b" strokeWidth="1.2" />
          <circle cx="70" cy={h.y - 14} r="4" fill="#fff" stroke="#1e293b" />
          {scarves.map((s, j) => {
            const sy = h.y - 30 + j * 30;
            return (
              <g key={s.n}>
                <line x1="100" y1={h.y + 6} x2="200" y2={sy + 6} stroke="#64748b" strokeWidth="1.5" />
                <rect x="204" y={sy} width="52" height="12" rx="5" fill={s.c} stroke="#1e293b" strokeWidth="1" />
                <rect x="240" y={sy + 10} width="9" height="12" rx="2" fill={s.c} stroke="#1e293b" strokeWidth="1" />
                <line x1="262" y1={sy + 6} x2="320" y2={sy + 6} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="334" cy={sy + 6} r="7" fill={h.c} />
                <circle cx="352" cy={sy + 6} r="7" fill={s.c} />
                <text x="372" y={sy + 11} fontSize="12" fontWeight="bold" fill="#334155">{i * 3 + j + 1}.</text>
              </g>
            );
          })}
        </g>
      ))}
      <text x="220" y="232" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">2 sapka · 3 sál = 6 öltözék</text>
    </svg>
  );
};

/** Próbálgatás táblázattal. */
export const TryTableSvg: React.FC<FigProps> = ({ className }) => {
  const cols = [
    { d: 4, ok: false },
    { d: 10, ok: false },
    { d: 12, ok: true }
  ];
  const rowY = [40, 76, 112];
  return (
    <svg viewBox="0 0 440 170" className={className ?? 'w-full max-w-md h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="438" height="168" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      {['Dani matricái', 'Bori matricái', 'Összesen'].map((l, i) => (
        <g key={l}>
          <rect x="16" y={rowY[i] - 22} width="160" height="34" fill={i === 2 ? '#fef3c7' : '#dcfce7'} stroke="#16a34a" />
          <text x="26" y={rowY[i]} fontSize="14" fontWeight="bold" fill="#14532d">{l}</text>
        </g>
      ))}
      {cols.map((c, j) => {
        const x = 176 + j * 76;
        const vals = [c.d, 2 * c.d, 3 * c.d];
        return (
          <g key={c.d}>
            {vals.map((v, i) => (
              <g key={i}>
                <rect x={x} y={rowY[i] - 22} width="76" height="34" fill={c.ok ? '#bbf7d0' : '#fff'} stroke="#16a34a" />
                <text x={x + 38} y={rowY[i]} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{v}</text>
              </g>
            ))}
            <text x={x + 38} y="150" textAnchor="middle" fontSize="13" fontWeight="bold" fill={c.ok ? '#15803d' : '#b91c1c'}>{c.ok ? '36 – jó!' : 'kevés'}</text>
          </g>
        );
      })}
      <text x="96" y="150" textAnchor="middle" fontSize="12" fill="#475569">összesen 36 kell</text>
    </svg>
  );
};

/** Időtartam: 9 órától 13 óráig. */
export const ClockTripSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 440 190" className={className ?? 'w-full max-w-md h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="438" height="188" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    <ClockFace hour={9} cx={90} cy={86} r={58} label="indulás: 9 óra" />
    <ClockFace hour={13} cx={350} cy={86} r={58} label="érkezés: 13 óra" />
    <path d="M 160 70 Q 220 30 280 70" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
    <polygon points="280,70 268,66 274,58" fill="#7c3aed" />
    <text x="220" y="92" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6d28d9">10, 11, 12, 13</text>
    <text x="220" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6d28d9">4 óra telt el</text>
  </svg>
);
