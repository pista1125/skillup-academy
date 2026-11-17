import React from 'react';

type Fig = React.FC<{ className?: string }>;
const cls = (c?: string) => c ?? 'w-full max-w-md h-auto mx-auto';
const FONT = 'system-ui, sans-serif';

/** 4 sor, soronként 7 korong: 4 · 7 = 28 és 7 · 4 = 28. */
export const MulArraySvg: Fig = ({ className }) => (
  <svg viewBox="0 0 360 230" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="228" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">7 oszlop</text>
    {[0, 1, 2, 3].map((r) => (
      <g key={r}>
        <rect x="76" y={34 + r * 30} width="208" height="26" rx="13" fill={r % 2 ? '#fef3c7' : '#fde68a'} />
        {Array.from({ length: 7 }, (_, c) => (
          <circle key={c} cx={90 + c * 30} cy={47 + r * 30} r="10" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
        ))}
      </g>
    ))}
    <text x="40" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">4 sor</text>
    <text x="180" y="178" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">4 sorban 7-7 korong: 4 · 7 = 28</text>
    <text x="180" y="204" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">7 oszlopban 4-4 korong: 7 · 4 = 28</text>
  </svg>
);

/** A műveletek részeinek nevei. */
export const MulDivNamesSvg: Fig = ({ className }) => (
  <svg viewBox="0 0 360 200" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="198" rx="14" fill="#f0f9ff" stroke="#7dd3fc" />
    <text x="20" y="24" fontSize="12" fontWeight="bold" fill="#0369a1">Szorzás</text>
    <g fontSize="26" fontWeight="bold" textAnchor="middle">
      <text x="110" y="56" fill="#dc2626">6</text>
      <text x="140" y="56" fill="#334155">·</text>
      <text x="170" y="56" fill="#dc2626">5</text>
      <text x="205" y="56" fill="#334155">=</text>
      <text x="245" y="56" fill="#1d4ed8">30</text>
    </g>
    <path d="M 110 62 L 132 76 M 170 62 L 148 76" stroke="#dc2626" strokeWidth="1.5" fill="none" />
    <path d="M 245 62 L 245 74" stroke="#1d4ed8" strokeWidth="1.5" />
    <text x="140" y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">tényezők</text>
    <text x="245" y="90" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">szorzat</text>
    <line x1="20" y1="104" x2="340" y2="104" stroke="#bae6fd" />
    <text x="20" y="122" fontSize="12" fontWeight="bold" fill="#0369a1">Osztás</text>
    <g fontSize="26" fontWeight="bold" textAnchor="middle">
      <text x="100" y="152" fill="#16a34a">30</text>
      <text x="140" y="152" fill="#334155">:</text>
      <text x="175" y="152" fill="#7c3aed">6</text>
      <text x="210" y="152" fill="#334155">=</text>
      <text x="250" y="152" fill="#ea580c">5</text>
    </g>
    <path d="M 100 158 L 100 170 M 175 158 L 175 170 M 250 158 L 250 170" stroke="#64748b" strokeWidth="1.5" />
    <text x="96" y="186" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#16a34a">osztandó</text>
    <text x="175" y="186" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">osztó</text>
    <text x="256" y="186" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ea580c">hányados</text>
  </svg>
);

/** Bennfoglalás: 18 gyöngy hármas csoportokban. */
export const GroupingSvg: Fig = ({ className }) => (
  <svg viewBox="0 0 360 150" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#f5f3ff" stroke="#c4b5fd" />
    <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#5b21b6">18 gyöngy, hármasával csoportosítva</text>
    {Array.from({ length: 6 }, (_, g) => (
      <g key={g}>
        <rect x={14 + g * 56} y="42" width="52" height="34" rx="17" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        {[0, 1, 2].map((b) => (
          <circle key={b} cx={26 + g * 56 + b * 14} cy="59" r="6" fill={['#f59e0b', '#ec4899', '#22c55e'][b]} stroke="#334155" strokeWidth="0.8" />
        ))}
        <text x={40 + g * 56} y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">{g + 1}.</text>
      </g>
    ))}
    <text x="180" y="130" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#5b21b6">18-ban a 3 megvan 6-szor: 18 : 3 = 6</text>
  </svg>
);

/** Részekre osztás: 12 alma 3 tányérra. */
export const SharingSvg: Fig = ({ className }) => (
  <svg viewBox="0 0 360 160" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#f0fdf4" stroke="#86efac" />
    <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">12 almát 3 tányérra osztunk egyformán</text>
    {[0, 1, 2].map((p) => (
      <g key={p}>
        <ellipse cx={70 + p * 110} cy="86" rx="48" ry="16" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" />
        <ellipse cx={70 + p * 110} cy="84" rx="34" ry="9" fill="#f8fafc" />
        {[0, 1, 2, 3].map((a) => (
          <g key={a}>
            <circle cx={46 + p * 110 + a * 16} cy="70" r="8" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
            <line x1={46 + p * 110 + a * 16} y1="62" x2={47 + p * 110 + a * 16} y2="57" stroke="#78350f" strokeWidth="1.5" />
          </g>
        ))}
        <text x={70 + p * 110} y="118" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">{p + 1}. tányér: 4</text>
      </g>
    ))}
    <text x="180" y="146" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">12 : 3 = 4, egy tányérra 4 alma jut</text>
  </svg>
);

/** A 7-es szorzótábla ugrásokkal a számegyenesen. */
export const SevenJumpsSvg: Fig = ({ className }) => {
  const x0 = 24;
  const k = 330 / 70;
  const X = (v: number) => x0 + v * k;
  return (
    <svg viewBox="0 0 380 130" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="378" height="128" rx="14" fill="#fff7ed" stroke="#fdba74" />
      <text x="190" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">A béka mindig 7-et ugrik</text>
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M ${X(i * 7)} 78 Q ${X(i * 7 + 3.5)} 40 ${X(i * 7 + 7)} 78`} fill="none" stroke="#16a34a" strokeWidth="1.8" />
      ))}
      <line x1={x0 - 6} y1="82" x2={X(70) + 8} y2="82" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={X(i * 7)} y1="76" x2={X(i * 7)} y2="88" stroke="#334155" strokeWidth="1.5" />
          <text x={X(i * 7)} y="104" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">{i * 7}</text>
        </g>
      ))}
      <text x="190" y="123" textAnchor="middle" fontSize="13" fill="#475569">5 ugrás: 5 · 7 = 35</text>
    </svg>
  );
};

/** Műveletcsalád: 6, 8 és 48. */
export const FamilySvg: Fig = ({ className }) => (
  <svg viewBox="0 0 360 180" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="178" rx="14" fill="#fdf2f8" stroke="#f9a8d4" />
    <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9d174d">Egy műveletcsalád</text>
    <path d="M 80 44 L 30 150 L 130 150 Z" fill="#fce7f3" stroke="#db2777" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="80" cy="62" r="17" fill="#fff" stroke="#1d4ed8" strokeWidth="2" />
    <text x="80" y="68" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">48</text>
    <circle cx="50" cy="134" r="15" fill="#fff" stroke="#dc2626" strokeWidth="2" />
    <text x="50" y="140" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">6</text>
    <circle cx="110" cy="134" r="15" fill="#fff" stroke="#dc2626" strokeWidth="2" />
    <text x="110" y="140" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">8</text>
    <g fontSize="16" fontWeight="bold" fill="#334155">
      <text x="170" y="62">6 · 8 = 48</text>
      <text x="170" y="92">8 · 6 = 48</text>
      <text x="170" y="122">48 : 6 = 8</text>
      <text x="170" y="152">48 : 8 = 6</text>
    </g>
  </svg>
);
