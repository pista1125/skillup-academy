import React from 'react';
import { DIV8_FONT, EightBoxPart, PlatePart, DotRowsPart, PLATE_COLORS } from './Div8G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** 1. Bennfoglalás: 24 golyó nyolcasával dobozba → 3 doboz. */
export const GroupingBoxesSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
    <rect x="2" y="2" width="476" height="186" rx="16" fill="#eef2ff" stroke="#a5b4fc" strokeWidth="2" />
    <text x="110" y="28" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
      24 golyó
    </text>
    {Array.from({ length: 24 }, (_, i) => (
      <circle key={i} cx={40 + (i % 6) * 28} cy={52 + Math.floor(i / 6) * 26} r="9" fill="#6366f1" stroke="#1e293b" strokeWidth="1.2" />
    ))}
    <text x="222" y="100" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#334155">
      →
    </text>
    {[0, 1, 2].map((i) => (
      <EightBoxPart key={i} x={262} y={36 + i * 42} h={34} color={['#6366f1', '#f97316', '#0ea5e9'][i]} />
    ))}
    <text x="400" y="78" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
      3 doboz
    </text>
    <text x="400" y="104" textAnchor="middle" fontSize="13" fill="#475569">
      (mindegyikben 8)
    </text>
    <text x="240" y="176" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#3730a3">
      24 : 8 = 3, mert 3 · 8 = 24
    </text>
  </svg>
);

/** 2. Szétosztás 8 tányérra: 16 süti → mindegyikre 2. */
export const SharingPlatesSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
    {Array.from({ length: 8 }, (_, i) => {
      const cx = 66 + (i % 4) * 116;
      const cy = 50 + Math.floor(i / 4) * 74;
      return (
        <g key={i}>
          <PlatePart cx={cx} cy={cy} count={2} w={84} />
          <text x={cx} y={cy + 33} textAnchor="middle" fontSize="12" fontWeight="bold" fill={PLATE_COLORS[i]}>
            {i + 1}.
          </text>
        </g>
      );
    })}
    <text x="240" y="188" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#92400e">
      16 süti, 8 tányér: 16 : 8 = 2
    </text>
  </svg>
);

/** 3. Nyolcszorosa ⇄ nyolcada: 5 ⇄ 40 */
export const EighthArrowsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <defs>
      <marker id="div8-arr-g" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#059669" />
      </marker>
      <marker id="div8-arr-r" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#e11d48" />
      </marker>
    </defs>
    <circle cx="110" cy="85" r="34" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="3" />
    <text x="110" y="96" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#312e81">
      5
    </text>
    <circle cx="370" cy="85" r="34" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
    <text x="370" y="96" textAnchor="middle" fontSize="30" fontWeight="bold" fill="#7c2d12">
      40
    </text>
    <path d="M 140 62 Q 240 10 340 62" fill="none" stroke="#059669" strokeWidth="3.5" markerEnd="url(#div8-arr-g)" />
    <text x="240" y="34" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#059669">
      nyolcszorosa: · 8
    </text>
    <path d="M 340 108 Q 240 160 140 108" fill="none" stroke="#e11d48" strokeWidth="3.5" markerEnd="url(#div8-arr-r)" />
    <text x="240" y="126" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#e11d48">
      nyolcada: : 8
    </text>
  </svg>
);

/** 4. Felezd háromszor: 48 → 24 → 12 → 6 */
export const HalveThriceSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const vals = [48, 24, 12, 6];
  const names = ['', 'fele', 'negyede', 'nyolcada'];
  return (
    <svg viewBox="0 0 480 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
      <rect x="2" y="2" width="476" height="146" rx="16" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
      {vals.map((v, i) => {
        const cx = 60 + i * 120;
        return (
          <g key={v}>
            <rect x={cx - 34} y={46} width="68" height="48" rx="12" fill={i === 3 ? '#fde68a' : '#ffffff'} stroke="#0369a1" strokeWidth="3" />
            <text x={cx} y={80} textAnchor="middle" fontSize="28" fontWeight="bold" fill="#0c4a6e">
              {v}
            </text>
            {i > 0 && (
              <>
                <text x={cx - 60} y={64} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">
                  →
                </text>
                <text x={cx - 60} y={40} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">
                  : 2
                </text>
                <text x={cx} y={116} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
                  a 48 {names[i]}
                </text>
              </>
            )}
          </g>
        );
      })}
      <text x="240" y="140" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0c4a6e">
        48 : 8 = 6
      </text>
    </svg>
  );
};

/** 5. Maradékos osztás: 35 korong → 4 nyolcas csoport, maradt 3. */
export const RemainderGroupsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <DotRowsPart x={40} y={30} n={35} gap={26} r={9} groups={4} />
    <text x="290" y="56" fontSize="17" fontWeight="bold" fill="#3730a3">
      Ennyi csoport: 4
    </text>
    <text x="290" y="88" fontSize="17" fontWeight="bold" fill="#c2410c">
      Ennyi maradt: 3
    </text>
    <text x="290" y="130" fontSize="16" fontWeight="bold" fill="#334155">
      Ellenőrzés:
    </text>
    <text x="290" y="156" fontSize="17" fontWeight="bold" fill="#334155">
      4 · 8 + 3 = 35
    </text>
  </svg>
);

/** 6. Hány asztal kell? 30 gyerek, egy asztalhoz 8 fér → 4 asztal. */
export const RoundUpTablesSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV8_FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
    {[0, 1, 2, 3].map((t) => {
      const x = 20 + t * 114;
      const kids = t < 3 ? 8 : 6;
      return (
        <g key={t}>
          <rect x={x} y={56} width="100" height="40" rx="8" fill={t < 3 ? '#bbf7d0' : '#fef9c3'} stroke="#166534" strokeWidth="2.5" />
          {Array.from({ length: kids }, (_, k) => (
            <circle key={k} cx={x + 14 + (k % 4) * 24} cy={k < 4 ? 42 : 110} r="9" fill={t < 3 ? '#22c55e' : '#f59e0b'} stroke="#14532d" strokeWidth="1.5" />
          ))}
          <text x={x + 50} y={82} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#14532d">
            {t + 1}. asztal
          </text>
        </g>
      );
    })}
    <text x="240" y="152" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#14532d">
      30 gyerek: 3 asztal tele, 6 gyerek marad → 4 asztal kell
    </text>
  </svg>
);
