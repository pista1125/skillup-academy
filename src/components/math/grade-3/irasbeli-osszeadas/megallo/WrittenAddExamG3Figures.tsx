import React from 'react';
import { FONT, INK, UNK, ChangeRowsG, changeRowsHeight } from '../az-osszeg-valtozasai/SumChangesG3Parts';
import { WrittenAddG3ColumnG, columnAddSize } from '../irasbeli-osszeadas/WrittenAddG3Column';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** Amit már tudsz: a fejezet 5 témája. */
export const ExamOverviewSvg: Fig = ({ className = DEF }) => {
  const tiles: [string, string, string, string][] = [
    ['1', 'Fejben', '250 + 30', '#fee2e2'],
    ['2', 'Becslés', '238 ≈ 240', '#fef3c7'],
    ['3', 'Írásban', 'oszlopban', '#dbeafe'],
    ['4', 'Változás', '+10 → +10', '#dcfce7'],
    ['5', 'Szöveges', 'csíkkal', '#fae8ff']
  ];
  return (
    <svg viewBox="0 0 360 96" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {tiles.map(([n, t, s, c], i) => {
        const x = 6 + i * 70.5;
        return (
          <g key={n}>
            <rect x={x} y="8" width="66" height="80" rx="12" fill={c} stroke="#94a3b8" strokeWidth="1.4" />
            <circle cx={x + 33} cy="28" r="12" fill="#1e293b" />
            <text x={x + 33} y="33" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">{n}</text>
            <text x={x + 33} y="60" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={INK}>{t}</text>
            <text x={x + 33} y="77" textAnchor="middle" fontSize="10.5" fill="#475569">{s}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Írásbeli összeadás két beváltással: 278 + 145 = 423, mellette a lépések. */
export const ExamColumnSvg: Fig = ({ className = DEF }) => {
  const col = { addends: [278, 145], result: 423, carries: [null, 1, 1], cell: 32 };
  const { w } = columnAddSize(col);
  const lines = ['1. Egyesek: 8 meg 5 az 13.', '    Leírom a 3-at, maradt 1.', '2. Tízesek: 7 meg 4 az 11,', '    meg 1 az 12. Leírom a 2-t,', '    maradt 1.', '3. Százasok: 2 meg 1 az 3,', '    meg 1 az 4.'];
  return (
    <svg viewBox="0 0 360 176" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="174" rx="12" fill="#eff6ff" stroke="#93c5fd" />
      <WrittenAddG3ColumnG {...col} x={18} y={14} />
      {lines.map((l, i) => (
        <text key={i} x={30 + w} y={34 + i * 19} fontSize="13" fontWeight={l.startsWith(' ') ? 'normal' : 'bold'} fill={INK} xmlSpace="preserve">{l}</text>
      ))}
    </svg>
  );
};

/** Három tag: 207 + 164 + 98 = 469. */
export const ExamThreeSvg: Fig = ({ className = 'w-full h-auto max-w-[200px] mx-auto' }) => {
  const col = { addends: [207, 164, 98], result: 469, carries: [null, 1, 1], cell: 30 };
  const { w, h } = columnAddSize(col);
  return (
    <svg viewBox={`-6 -6 ${w + 12} ${h + 12}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <WrittenAddG3ColumnG {...col} x={0} y={0} />
    </svg>
  );
};

/** Számjegy-nyomozó: ?48 + 1?5 = 423. */
export const ExamDigitsSvg: Fig = ({ className = DEF }) => {
  const col = { addends: ['?48', '1?5'], result: 423, cell: 32, header: true };
  const { w } = columnAddSize(col);
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="12" fill="#fff7ed" stroke="#fdba74" />
      <WrittenAddG3ColumnG {...col} x={18} y={14} />
      <text x={34 + w} y="36" fontSize="13" fontWeight="bold" fill={INK}>Egyesek: 8 + 5 = 13. Jó, 3!</text>
      <text x={34 + w} y="58" fontSize="13" fontWeight="bold" fill={INK}>Tízesek: 4 + ? + 1 = 12</text>
      <text x={34 + w} y="78" fontSize="13" fill="#475569">→ a ? = 7</text>
      <text x={34 + w} y="102" fontSize="13" fontWeight="bold" fill={INK}>Százasok: ? + 1 + 1 = 4</text>
      <text x={34 + w} y="122" fontSize="13" fill="#475569">→ a ? = 2</text>
    </svg>
  );
};

/** Becslés tízesre: 278 ≈ 280, 145 ≈ 150 → B: 430; a pontos 423. */
export const ExamEstimateSvg: Fig = ({ className = DEF }) => {
  const x = (v: number) => 20 + ((v - 400) / 50) * 320;
  return (
    <svg viewBox="0 0 360 110" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="108" rx="12" fill="#fefce8" stroke="#fde047" />
      <text x="180" y="22" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={INK}>278 ≈ 280 és 145 ≈ 150 → B: 430</text>
      <line x1="16" y1="62" x2="344" y2="62" stroke="#334155" strokeWidth="2.4" />
      {Array.from({ length: 51 }).map((_, i) => {
        const v = 400 + i;
        const big = v % 10 === 0;
        return <line key={v} x1={x(v)} y1={big ? 52 : 57} x2={x(v)} y2={big ? 72 : 67} stroke="#334155" strokeWidth={big ? 2 : 1} />;
      })}
      {[400, 410, 420, 430, 440, 450].map((v) => (
        <text key={v} x={x(v)} y="88" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#334155">{v}</text>
      ))}
      <circle cx={x(430)} cy="62" r="6" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
      <text x={x(430)} y="44" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">becslés</text>
      <circle cx={x(423)} cy="62" r="6" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.5" />
      <text x={x(423) - 4} y="44" textAnchor="end" fontSize="12" fontWeight="bold" fill="#1d4ed8">pontos: 423</text>
      <text x="180" y="104" textAnchor="middle" fontSize="12" fill={UNK}>Közel vannak egymáshoz: jól számoltunk!</text>
    </svg>
  );
};

/** Az összeg változása: 456 + 278 = 734 → +100, −20 → 556 + 258 = 814. */
export const ExamChangesSvg: Fig = ({ className = 'w-full h-auto max-w-md mx-auto' }) => {
  const h = changeRowsHeight(2);
  return (
    <svg viewBox={`0 0 240 ${h + 4}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="238" height={h + 2} rx="12" fill="#f0fdf4" stroke="#86efac" />
      <ChangeRowsG rows={[[456, 278, 734], [556, 258, 814]]} changes={[['+100', '−20', '+80']]} y={14} />
    </svg>
  );
};
