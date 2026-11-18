import React from 'react';
import { FONT, INK, UNK } from '../../szorzas/gyakorlas-tudasproba/MultExamG2Parts';
import { HolderIcon } from './DivExamG2Parts';

// ---------------------------------------------------------------------------
// 10. Gyakorlás, tudáspróba (V. Osztás) – tananyag-ábrák (max. 480 px)
// ---------------------------------------------------------------------------

type Fig = React.FC<{ className?: string }>;
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** Bennfoglalás: 12 korong négyesével bekarikázva → 3 csoport. */
export const GroupingSvg: Fig = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="2" />
    {[0, 1, 2].map((g) => (
      <g key={g}>
        <rect x={50 + g * 136} y={24} width={110} height={62} rx="20" fill="#fff" stroke="#6d28d9" strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={78 + g * 136 + (i % 2) * 54} cy={42 + Math.floor(i / 2) * 26} r="10" fill="#7c3aed" />
        ))}
      </g>
    ))}
    <text x="240" y="122" textAnchor="middle" fontSize="22" fontWeight="900" fill={INK}>
      12 : 4 = 3
    </text>
    <text x="240" y="152" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#475569">
      Hány 4-es csoport van a 12-ben? 3 csoport.
    </text>
  </svg>
);

/** Részekre osztás: 12 süti 3 tányérra → mindegyikre 4. */
export const SharingSvg: Fig = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    {[0, 1, 2].map((p) => (
      <g key={p}>
        <ellipse cx={105 + p * 135} cy={62} rx={56} ry={28} fill="#fff" stroke="#c2410c" strokeWidth="3" />
        <ellipse cx={105 + p * 135} cy={62} rx={44} ry={19} fill="#ffedd5" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={78 + p * 135 + i * 18} cy={62} r="8" fill="#ea580c" />
        ))}
      </g>
    ))}
    <text x="240" y="122" textAnchor="middle" fontSize="22" fontWeight="900" fill={INK}>
      12 : 3 = 4
    </text>
    <text x="240" y="152" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#475569">
      12 sütit 3 tányérra osztunk egyformán: mindegyikre 4 jut.
    </text>
  </svg>
);

/** Műveletcsalád: 6, 8, 48. */
export const FamilySvg: Fig = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="2" />
    <path d="M 110 34 L 46 160 L 174 160 Z" fill="#f3e8ff" stroke="#a855f7" strokeWidth="3" />
    {[
      { x: 110, y: 34, t: '48' },
      { x: 46, y: 160, t: '6' },
      { x: 174, y: 160, t: '8' },
    ].map((n) => (
      <g key={n.t}>
        <circle cx={n.x} cy={n.y} r="24" fill="#fff" stroke="#7e22ce" strokeWidth="3" />
        <text x={n.x} y={n.y + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill={INK}>
          {n.t}
        </text>
      </g>
    ))}
    {['6 · 8 = 48', '8 · 6 = 48', '48 : 6 = 8', '48 : 8 = 6'].map((t, i) => (
      <text key={t} x="330" y={56 + i * 36} textAnchor="middle" fontSize="22" fontWeight="900" fill={i < 2 ? '#be185d' : '#6d28d9'}>
        {t}
      </text>
    ))}
  </svg>
);

/** Fele, harmada, negyede: a 24 szalagon. */
export const PartsSvg: Fig = ({ className = CLS }) => {
  const rows = [
    { k: 2, word: 'fele', val: 12, color: '#f9a8d4' },
    { k: 3, word: 'harmada', val: 8, color: '#93c5fd' },
    { k: 4, word: 'negyede', val: 6, color: '#86efac' },
  ];
  return (
    <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width="476" height="186" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="240" y="28" textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>
        24 gyöngy
      </text>
      {rows.map((r, ri) => (
        <g key={r.k}>
          <text x="20" y={68 + ri * 48} fontSize="15" fontWeight="900" fill="#334155">
            {r.word}
          </text>
          {Array.from({ length: r.k }, (_, i) => {
            const w = 300 / r.k;
            return (
              <g key={i}>
                <rect x={100 + i * w} y={44 + ri * 48} width={w} height={34} rx="6" fill={i === 0 ? r.color : '#fff'} stroke="#334155" strokeWidth="2" />
                <text x={100 + i * w + w / 2} y={67 + ri * 48} textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>
                  {r.val}
                </text>
              </g>
            );
          })}
          <text x="452" y={68 + ri * 48} textAnchor="end" fontSize="14" fontWeight="bold" fill="#475569">
            24 : {r.k}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Maradékos osztás: 23 korong négyesével → 5 csoport, maradt 3. */
export const RemainderSvg: Fig = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="2" />
    {[0, 1, 2, 3, 4].map((g) => (
      <g key={g}>
        <rect x={20 + g * 76} y={22} width={64} height={58} rx="16" fill="#fff" stroke="#6d28d9" strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={38 + g * 76 + (i % 2) * 28} cy={38 + Math.floor(i / 2) * 26} r="9" fill="#7c3aed" />
        ))}
      </g>
    ))}
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={410 + (i % 2) * 26} cy={38 + Math.floor(i / 2) * 26} r="9" fill={UNK} />
    ))}
    <text x="200" y="118" textAnchor="middle" fontSize="18" fontWeight="900" fill="#4c1d95">
      Ennyi csoport: 5
    </text>
    <text x="400" y="118" textAnchor="middle" fontSize="18" fontWeight="900" fill={UNK}>
      Ennyi maradt: 3
    </text>
    <text x="240" y="154" textAnchor="middle" fontSize="20" fontWeight="900" fill={INK}>
      Ellenőrzés: 5 · 4 + 3 = 23
    </text>
    <text x="240" y="182" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569">
      A maradék mindig kevesebb, mint 4.
    </text>
  </svg>
);

/** Felfelé kerekítés: 22 gyerek, egy csónakba 5 fér → 5 csónak kell. */
export const RoundUpSvg: Fig = ({ className = CLS }) => (
  <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="186" rx="16" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
    <path d="M 2 96 H 478" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 6" />
    {[0, 1, 2, 3, 4].map((b) => {
      const kids = b < 4 ? 5 : 2;
      return (
        <g key={b}>
          <HolderIcon kind="boat" x={18 + b * 92} y={46} w={80} h={48} />
          {Array.from({ length: kids }, (_, i) => (
            <circle key={i} cx={30 + b * 92 + i * 14} cy={52} r="6" fill={b < 4 ? '#f97316' : '#ec4899'} />
          ))}
        </g>
      );
    })}
    <text x="240" y="132" textAnchor="middle" fontSize="18" fontWeight="900" fill={INK}>
      22 gyerek: 4 teli csónak, és még 2 gyerek
    </text>
    <text x="240" y="164" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0369a1">
      Nekik is kell csónak: 4 + 1 = 5 csónak kell.
    </text>
  </svg>
);
