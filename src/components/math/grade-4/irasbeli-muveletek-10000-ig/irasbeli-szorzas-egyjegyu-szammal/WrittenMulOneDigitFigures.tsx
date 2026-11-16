import React from 'react';

const FONT = 'system-ui, sans-serif';
export const MUL_COLORS = ['#16a34a', '#dc2626', '#0ea5e9', '#eab308']; // E, sz, t, e
export const MUL_HEADS = ['E', 'sz', 't', 'e'];

/** Írásbeli szorzás elrendezése: szorzandó · szorzó egy sorban, alatta a szorzat. */
const MulLayout: React.FC<{
  a: string;
  m: number;
  result: string;
  carries: string[]; // a szorzat fölé írt kis maradékok, E, sz, t, e oszlop szerint
  title: string;
  className?: string;
}> = ({ a, m, result, carries, title, className }) => {
  const colX = [120, 165, 210, 255];
  return (
    <svg viewBox="0 0 400 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="198" rx="12" fill="#eff6ff" stroke="#93c5fd" />
      <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e3a8a">
        {title}
      </text>
      {MUL_HEADS.map((h, i) => (
        <g key={h}>
          <rect x={colX[i] - 20} y="38" width="40" height="22" fill={MUL_COLORS[i]} />
          <text x={colX[i]} y="54" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">
            {h}
          </text>
          <rect x={colX[i] - 20} y="60" width="40" height="120" fill={MUL_COLORS[i]} opacity="0.12" />
        </g>
      ))}
      {a
        .padStart(4, ' ')
        .split('')
        .map((d, i) => (
          <text key={`a${i}`} x={colX[i]} y="96" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">
            {d.trim()}
          </text>
        ))}
      <text x="300" y="96" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#7c3aed">
        · {m}
      </text>
      <line x1="96" y1="110" x2="324" y2="110" stroke="#0f172a" strokeWidth="2.5" />
      {carries.map((c, i) =>
        c ? (
          <text key={`c${i}`} x={colX[i] + 14} y="128" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b">
            {c}
          </text>
        ) : null
      )}
      {result
        .padStart(4, ' ')
        .split('')
        .map((d, i) => (
          <text key={`r${i}`} x={colX[i]} y="156" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1d4ed8">
            {d.trim()}
          </text>
        ))}
    </svg>
  );
};

/** 1623 · 2 = 3246 (tankönyv 80. o., 1. feladat). */
export const MulStepsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <MulLayout title="1623 · 2 = 3246 (kétszemélyes kabinok)" a="1623" m={2} result="3246" carries={['1', '', '', '']} className={className} />
);

/** 2549 · 3 = 7647 több maradékkal. */
export const MulCarrySvg: React.FC<{ className?: string }> = ({ className }) => (
  <MulLayout title="2549 · 3 = 7647 (sok maradék!)" a="2549" m={3} result="7647" carries={['1', '1', '2', '']} className={className} />
);

/** Helyiérték-korongok: 1623 kétszerese, a 12 százasból 1 ezres lesz. */
export const PlaceValueMulSvg: React.FC<{ className?: string }> = ({ className }) => {
  const colX = [40, 130, 230, 320];
  const counts = [1, 6, 2, 3];
  const dots = (x: number, y: number, n: number, color: string, perRow: number, key: string) =>
    Array.from({ length: n }).map((_, i) => (
      <circle key={`${key}${i}`} cx={x + 12 + (i % perRow) * 14} cy={y + 12 + Math.floor(i / perRow) * 14} r="5.5" fill={color} />
    ));
  return (
    <svg viewBox="0 0 400 210" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="208" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {MUL_HEADS.map((h, i) => (
        <g key={h}>
          <rect x={colX[i]} y="10" width={i === 1 ? 92 : 72} height="20" fill={MUL_COLORS[i]} />
          <text x={colX[i] + (i === 1 ? 46 : 36)} y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">
            {h}
          </text>
          <rect x={colX[i]} y="30" width={i === 1 ? 92 : 72} height="44" fill="#fff" stroke="#cbd5e1" />
          {dots(colX[i], 30, counts[i], MUL_COLORS[i], i === 1 ? 6 : 5, `t${i}`)}
          <text x={colX[i] + 36} y="98" textAnchor="middle" fontSize="12" fontWeight="bold" fill={MUL_COLORS[i]}>
            · 2 ↓
          </text>
          <rect x={colX[i]} y="108" width={i === 1 ? 92 : 72} height="58" fill="#fff" stroke="#cbd5e1" />
        </g>
      ))}
      {dots(colX[0], 108, 2, MUL_COLORS[0], 5, 'bE')}
      <circle cx={colX[0] + 40} cy="120" r="5.5" fill={MUL_COLORS[0]} stroke="#0f172a" strokeWidth="1.5" />
      {dots(colX[1], 108, 12, MUL_COLORS[1], 5, 'bsz')}
      <rect x={colX[1] + 5} y="113" width="72" height="28" rx="8" fill="none" stroke="#16a34a" strokeWidth="1.8" />
      <line x1={colX[1] + 4} y1="126" x2={colX[0] + 47} y2="122" stroke="#16a34a" strokeWidth="1.8" />
      {dots(colX[2], 108, 4, MUL_COLORS[2], 5, 'bt')}
      {dots(colX[3], 108, 6, MUL_COLORS[3], 5, 'be')}
      <text x="200" y="192" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
        12 százas = 1 ezres + 2 százas → 3 E, 2 sz, 4 t, 6 e = 3246
      </text>
    </svg>
  );
};

/** Ellenőrzés összeadással: 1623 + 1623 = 3246. */
export const MulCheckSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="168" rx="12" fill="#f0fdf4" stroke="#86efac" />
    <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
      Ellenőrzés összeadással
    </text>
    <g fontSize="22" fontWeight="bold" textAnchor="end">
      <text x="140" y="70" fill="#0f172a">1623</text>
      <text x="140" y="100" fill="#0f172a">· 2</text>
      <line x1="70" y1="110" x2="146" y2="110" stroke="#0f172a" strokeWidth="2" />
      <text x="140" y="138" fill="#1d4ed8">3246</text>
      <text x="320" y="62" fill="#0f172a">1623</text>
      <text x="320" y="90" fill="#0f172a">+ 1623</text>
      <line x1="236" y1="100" x2="326" y2="100" stroke="#0f172a" strokeWidth="2" />
      <text x="320" y="128" fill="#16a34a">3246</text>
    </g>
    <text x="196" y="96" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#16a34a">=</text>
    <text x="200" y="158" textAnchor="middle" fontSize="12" fill="#166534">Kétszer 1623 ugyanannyi, mint 1623 + 1623.</text>
  </svg>
);

/** A Budavári Sikló árai (tankönyv 81. o., 7. feladat). */
export const FunicularPricesSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows = [
    ['Menetjegy (felnőtt)', '1200 Ft'],
    ['Retúrjegy (felnőtt)', '1800 Ft'],
    ['Gyermekjegy (3–14 év)', '700 Ft'],
    ['Gyermekretúrjegy (3–14 év)', '1100 Ft'],
    ['3 éves kor alatt', 'ingyenes']
  ];
  return (
    <svg viewBox="0 0 400 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="198" rx="12" fill="#fff7ed" stroke="#fdba74" />
      <text x="200" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
        Budavári Sikló – jegyárak
      </text>
      {rows.map(([k, v], i) => (
        <g key={k}>
          <rect x="24" y={36 + i * 30} width="352" height="26" rx="6" fill={i % 2 ? '#ffedd5' : '#fff'} stroke="#fed7aa" />
          <text x="36" y={54 + i * 30} fontSize="13" fontWeight="bold" fill="#334155">
            {k}
          </text>
          <text x="364" y={54 + i * 30} textAnchor="end" fontSize="13" fontWeight="bold" fill="#c2410c">
            {v}
          </text>
        </g>
      ))}
    </svg>
  );
};
