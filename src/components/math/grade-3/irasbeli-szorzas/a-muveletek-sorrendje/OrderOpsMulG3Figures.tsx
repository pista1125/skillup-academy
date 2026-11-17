import React from 'react';

type FigProps = { className?: string };

const FONT = 'system-ui, Segoe UI, sans-serif';
const CLS = 'w-full max-w-xl h-auto mx-auto';

/** Szabály-plakát: 1. zárójel, 2. szorzás és osztás, 3. összeadás és kivonás balról jobbra. */
export const OrderRuleMulSvg: React.FC<FigProps> = ({ className }) => {
  const steps = [
    { n: '1.', sym: '( )', t: 'zárójel', c: '#a855f7', bg: '#f3e8ff' },
    { n: '2.', sym: '·  :', t: 'szorzás, osztás', c: '#ea580c', bg: '#ffedd5' },
    { n: '3.', sym: '+  −', t: 'összeadás, kivonás', c: '#0284c7', bg: '#e0f2fe' }
  ];
  return (
    <svg viewBox="0 0 520 200" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="518" height="198" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
      {steps.map((s, i) => {
        const x = 18 + i * 168;
        return (
          <g key={s.n}>
            <rect x={x} y="30" width="148" height="130" rx="14" fill={s.bg} stroke={s.c} strokeWidth="3" />
            <circle cx={x + 24} cy="54" r="16" fill={s.c} />
            <text x={x + 24} y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">{s.n}</text>
            <text x={x + 82} y="108" textAnchor="middle" fontSize="38" fontWeight="bold" fill={s.c}>{s.sym}</text>
            <text x={x + 74} y="146" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">{s.t}</text>
            {i < 2 && <polygon points={`${x + 152},95 ${x + 164},88 ${x + 164},102`} fill="#64748b" transform={`rotate(180 ${x + 158} 95)`} />}
          </g>
        );
      })}
      <text x="260" y="186" textAnchor="middle" fontSize="14" fill="#475569">Ha egyformák a műveletek: balról jobbra haladunk.</text>
    </svg>
  );
};

/** Mozi: 3 vetítés, fent 50, lent 230 hely. Két út: 3 · (50 + 230) és 3 · 50 + 3 · 230. */
export const CinemaTwoWaysSvg: React.FC<FigProps> = ({ className }) => {
  const seats = (x: number, y: number, n: number, color: string) =>
    Array.from({ length: n }, (_, i) => <rect key={i} x={x + i * 12} y={y} width="9" height="9" rx="2" fill={color} />);
  return (
    <svg viewBox="0 0 520 260" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="518" height="258" rx="16" fill="#fdf4ff" stroke="#f0abfc" />
      {/* nézőtér */}
      <rect x="20" y="20" width="230" height="160" rx="12" fill="#fff" stroke="#a21caf" strokeWidth="2" />
      <rect x="40" y="30" width="190" height="20" rx="4" fill="#e2e8f0" />
      <text x="135" y="45" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">vászon</text>
      <text x="40" y="74" fontSize="14" fontWeight="bold" fill="#7e22ce">fent: 50 hely</text>
      {seats(40, 82, 15, '#c084fc')}
      <text x="40" y="118" fontSize="14" fontWeight="bold" fill="#be123c">lent: 230 hely</text>
      {seats(40, 126, 15, '#fb7185')}
      {seats(40, 142, 15, '#fb7185')}
      {seats(40, 158, 15, '#fb7185')}
      <text x="135" y="208" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">3 vetítés, mindig tele</text>
      {/* két út */}
      <rect x="270" y="30" width="232" height="70" rx="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
      <text x="386" y="56" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#5b21b6">1. út: egy vetítés, aztán · 3</text>
      <text x="386" y="86" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">3 · (50 + 230)</text>
      <rect x="270" y="116" width="232" height="70" rx="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
      <text x="386" y="142" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9f1239">2. út: fent és lent külön</text>
      <text x="386" y="172" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">3 · 50 + 3 · 230</text>
      <text x="386" y="226" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#15803d">Mindkét út ugyanoda vezet!</text>
    </svg>
  );
};

/** Állatkert-térkép: a nyilakon műveletsorok, ennyi méterre van az állat a bejárattól. */
export const ZooMapSvg: React.FC<FigProps> = ({ className }) => {
  const paths = [
    { x: 420, y: 40, label: 'zsiráf', expr: '2 · (150 + 175)', c: '#f59e0b' },
    { x: 440, y: 110, label: 'majom', expr: '4 · 120 + 95', c: '#a16207' },
    { x: 430, y: 170, label: 'oroszlán', expr: '1000 − 3 · 215', c: '#ea580c' },
    { x: 250, y: 216, label: 'pingvin', expr: '125 · 3 + 250', c: '#0ea5e9' }
  ];
  return (
    <svg viewBox="0 0 520 260" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="518" height="258" rx="16" fill="#ecfccb" stroke="#a3e635" />
      <rect x="20" y="104" width="86" height="44" rx="10" fill="#fff" stroke="#b91c1c" strokeWidth="2.5" />
      <text x="63" y="132" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#b91c1c">bejárat</text>
      {paths.map((p) => (
        <g key={p.label}>
          <line x1="108" y1="126" x2={p.x - 40} y2={p.y} stroke="#dc2626" strokeWidth="3" />
          <circle cx={p.x} cy={p.y} r="20" fill={p.c} stroke="#1e293b" strokeWidth="2" />
          <text x={p.x} y={p.y + 36} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">{p.label}</text>
          <rect x={(108 + p.x - 40) / 2 - 64} y={(126 + p.y) / 2 - 15} width="128" height="24" rx="6" fill="#fff" stroke="#dc2626" strokeWidth="1.5" />
          <text x={(108 + p.x - 40) / 2} y={(126 + p.y) / 2 + 2} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#991b1b">{p.expr}</text>
        </g>
      ))}
    </svg>
  );
};

/** Két polc: az egyiken 126 könyv, a másikon 3-szor annyi. */
export const ShelvesSvg: React.FC<FigProps> = ({ className }) => {
  const books = (x: number, y: number, n: number, k: string) =>
    Array.from({ length: n }, (_, i) => (
      <rect key={`${k}${i}`} x={x + i * 13} y={y} width="10" height="34" rx="2" fill={['#ef4444', '#3b82f6', '#22c55e', '#eab308'][i % 4]} stroke="#1e293b" strokeWidth="1" />
    ));
  return (
    <svg viewBox="0 0 520 220" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="518" height="218" rx="16" fill="#fefce8" stroke="#fde68a" />
      <rect x="30" y="66" width="140" height="8" fill="#92400e" />
      {books(40, 32, 9, 'a')}
      <text x="100" y="100" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">126 könyv</text>
      <rect x="210" y="66" width="290" height="8" fill="#92400e" />
      {[0, 1, 2].map((g) => (
        <g key={g}>{books(218 + g * 96, 32, 7, `b${g}`)}</g>
      ))}
      <text x="355" y="100" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">3-szor annyi</text>
      <text x="260" y="145" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">Összesen: 126 + 126 · 3</text>
      <text x="260" y="180" textAnchor="middle" fontSize="16" fill="#334155">1. lépés: 126 · 3 = 378 &#160;&#160; 2. lépés: 126 + 378 = 504</text>
    </svg>
  );
};

/** Csapda: 90 + 110 · 4 – rossz sorrend (800) és jó sorrend (530). */
export const OrderTrapMulSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 520 200" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="518" height="198" rx="16" fill="#fff1f2" stroke="#fecdd3" />
    <rect x="20" y="24" width="230" height="150" rx="12" fill="#fff" stroke="#e11d48" strokeWidth="2.5" />
    <text x="135" y="56" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">90 + 110 · 4</text>
    <text x="135" y="92" textAnchor="middle" fontSize="16" fill="#9f1239">90 + 110 = 200</text>
    <text x="135" y="118" textAnchor="middle" fontSize="16" fill="#9f1239">200 · 4 = 800</text>
    <line x1="60" y1="140" x2="210" y2="160" stroke="#e11d48" strokeWidth="4" />
    <line x1="60" y1="160" x2="210" y2="140" stroke="#e11d48" strokeWidth="4" />
    <rect x="270" y="24" width="230" height="150" rx="12" fill="#fff" stroke="#16a34a" strokeWidth="2.5" />
    <text x="385" y="56" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">90 + 110 · 4</text>
    <text x="385" y="92" textAnchor="middle" fontSize="16" fill="#166534">1. 110 · 4 = 440</text>
    <text x="385" y="118" textAnchor="middle" fontSize="16" fill="#166534">2. 90 + 440 = 530</text>
    <path d="M 350 148 L 375 165 L 420 135" fill="none" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
