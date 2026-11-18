import React from 'react';
import { SUB50_FONT, TakeBlocksPart } from './Sub50G2Parts';
import { JumpsPart } from '../osszeadas-50-es-szamkor/Add50G2Parts';

// ---------------------------------------------------------------------------
// 3. Kivonás 50-es számkör – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEF = 'w-full max-w-[480px] h-auto mx-auto';

/** Analógia: 7 − 3 = 4, 27 − 3 = 24, 37 − 3 = 34. */
export const AnalogySubSvg: React.FC<{ className?: string }> = ({ className = DEF }) => {
  const rows = [
    { t: 0, txt: '7 − 3 = 4' },
    { t: 2, txt: '27 − 3 = 24' },
    { t: 3, txt: '37 − 3 = 34' }
  ];
  return (
    <svg viewBox="0 0 360 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB50_FONT}>
      <rect x="1" y="1" width="358" height="178" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
      <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#4c1d95">
        A tízesek maradnak, csak az egyesekből veszünk el!
      </text>
      {rows.map((r, i) => {
        const y = 38 + i * 46;
        return (
          <g key={i}>
            <text x="20" y={y + 26} fontSize="17" fontWeight="900" fill="#0f172a">{r.txt}</text>
            {Array.from({ length: r.t }, (_, k) => (
              <rect key={k} x={170 + k * 14} y={y + 4} width="9" height="32" rx="1.5" fill="#d8b4fe" stroke="#6b21a8" strokeWidth="1.5" />
            ))}
            {Array.from({ length: 7 }, (_, k) => {
              const x = 220 + k * 18;
              const crossed = k >= 4;
              return (
                <g key={`c${k}`}>
                  <rect x={x} y={y + 16} width="12" height="12" rx="1.5" fill={crossed ? '#f1f5f9' : '#86efac'} stroke="#15803d" strokeWidth="1.5" />
                  {crossed && (
                    <g stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
                      <line x1={x - 1} y1={y + 15} x2={x + 13} y2={y + 29} />
                      <line x1={x - 1} y1={y + 29} x2={x + 13} y2={y + 15} />
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

/** Kerek tízesből: 30 − 4 = 26 (egy rudat 10 kockára bontunk). */
export const FromRoundTenSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 340 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB50_FONT}>
    <rect x="1" y="1" width="338" height="148" rx="14" fill="#fffbeb" stroke="#fde68a" />
    <TakeBlocksPart x={28} y={16} a={30} breakRod takeOnes={4} unit={9} gap={7} />
    <text x="68" y="130" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">1 rúd = 10 kocka</text>
    <text x="240" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e293b">30 − 4 = 26</text>
    <text x="240" y="88" textAnchor="middle" fontSize="13" fill="#475569">A 30-ban nincs egyes kocka.</text>
    <text x="240" y="108" textAnchor="middle" fontSize="13" fill="#475569">Bonts fel egy rudat!</text>
  </svg>
);

/** Kerek tízesek elvétele: 45 − 20 = 25. */
export const TakeTensSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 340 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB50_FONT}>
    <rect x="1" y="1" width="338" height="138" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <TakeBlocksPart x={24} y={16} a={45} takeTens={2} unit={9} gap={7} />
    <text x="240" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e293b">45 − 20 = 25</text>
    <text x="240" y="88" textAnchor="middle" fontSize="13" fill="#475569">2 rudat veszünk el.</text>
    <text x="240" y="108" textAnchor="middle" fontSize="13" fill="#475569">Az 5 egyes marad.</text>
  </svg>
);

/** Tízesátlépés visszafelé: 32 − 5 = 32 − 2 − 3 = 27. */
export const BackBridgeSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB50_FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="180" y="22" textAnchor="middle" fontSize="15" fontWeight="900" fill="#9a3412">32 − 5 = 32 − 2 − 3 = 27</text>
    <JumpsPart
      x={24}
      y={92}
      width={300}
      from={24}
      to={36}
      labelEvery={2}
      fontSize={11}
      hops={[
        { from: 32, to: 30, label: '−2', color: '#16a34a' },
        { from: 30, to: 27, label: '−3', color: '#2563eb' }
      ]}
    />
    <text x="180" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      Előbb vissza a kerek tízesig (30), aztán tovább!
    </text>
  </svg>
);

/** Kétjegyű kivonása: 36 − 19 = 36 − 10 − 9 = 26 − 6 − 3 = 17. */
export const TwoDigitBackSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB50_FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
    <text x="180" y="22" textAnchor="middle" fontSize="15" fontWeight="900" fill="#5b21b6">36 − 19 = 36 − 10 − 9 = 17</text>
    <JumpsPart
      x={24}
      y={100}
      width={300}
      from={15}
      to={40}
      labelEvery={5}
      fontSize={11}
      hops={[
        { from: 36, to: 26, label: '−10', color: '#7c3aed' },
        { from: 26, to: 20, label: '−6', color: '#16a34a' },
        { from: 20, to: 17, label: '−3', color: '#2563eb' }
      ]}
    />
    <text x="180" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      1. a tízest: 36 − 10 = 26 • 2. az egyest: 26 − 9 = 26 − 6 − 3 = 17
    </text>
  </svg>
);

/** Ellenőrzés összeadással: 44 − 18 = 26, mert 26 + 18 = 44. */
export const CheckByAddingSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 340 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB50_FONT}>
    <rect x="1" y="1" width="338" height="148" rx="14" fill="#ecfdf5" stroke="#a7f3d0" />
    <circle cx="80" cy="40" r="24" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" />
    <text x="80" y="47" textAnchor="middle" fontSize="20" fontWeight="900" fill="#78350f">44</text>
    <circle cx="40" cy="110" r="24" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.5" />
    <text x="40" y="117" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e3a8a">18</text>
    <circle cx="120" cy="110" r="24" fill="#bbf7d0" stroke="#15803d" strokeWidth="2.5" />
    <text x="120" y="117" textAnchor="middle" fontSize="20" fontWeight="900" fill="#14532d">26</text>
    <line x1="66" y1="60" x2="52" y2="88" stroke="#64748b" strokeWidth="2" />
    <line x1="94" y1="60" x2="108" y2="88" stroke="#64748b" strokeWidth="2" />
    <text x="240" y="44" textAnchor="middle" fontSize="18" fontWeight="900" fill="#be123c">44 − 18 = 26</text>
    <text x="240" y="72" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">Ellenőrzés:</text>
    <text x="240" y="100" textAnchor="middle" fontSize="18" fontWeight="900" fill="#047857">26 + 18 = 44</text>
    <text x="240" y="128" textAnchor="middle" fontSize="12" fill="#475569">A két kis szám együtt a nagy.</text>
  </svg>
);
