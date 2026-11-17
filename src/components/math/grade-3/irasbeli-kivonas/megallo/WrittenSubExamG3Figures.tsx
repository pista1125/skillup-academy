import React from 'react';
import { WrittenSubG3ColumnG, columnSubSize, subSteps, carryMarks } from '../irasbeli-kivonas/WrittenSubG3Column';
import { FONT, INK, UNK, UP, DOWN, C_MIN, C_SUB, C_DIF, Coin, NumBox } from './WrittenSubExamG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-md mx-auto';

/** Kivonás fejben pénzzel: 375 Ft − 200 Ft = 175 Ft (két 100-ast elköltünk). */
export const WrittenSubExamCoinsSvg: Fig = ({ className = DEF }) => {
  const coins = [100, 100, 100, 50, 20, 5];
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="12" fill="#fefce8" stroke="#fde047" />
      {coins.map((c, i) => (
        <Coin key={i} cx={50 + i * 52} cy={52} v={c} r={c >= 100 ? 21 : c >= 20 ? 18 : 15} crossed={i < 2} />
      ))}
      <text x="180" y="104" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>375 Ft − 200 Ft = 175 Ft</text>
      <text x="180" y="132" textAnchor="middle" fontSize="13.5" fill="#475569">3 százas − 2 százas = 1 százas. A többi marad.</text>
    </svg>
  );
};

/** Becslés két számegyenesen: 362 ≈ 400 (≈ 360), 187 ≈ 200 (≈ 190). */
export const WrittenSubExamEstimateSvg: Fig = ({ className = DEF }) => {
  const line = (y: number, v: number, lo: number, col: string) => {
    const x0 = 30;
    const x1 = 330;
    const x = x0 + ((v - lo) / 100) * (x1 - x0);
    return (
      <g>
        <line x1={x0} y1={y} x2={x1} y2={y} stroke="#475569" strokeWidth="2" />
        {Array.from({ length: 11 }).map((_, i) => (
          <g key={i}>
            <line x1={x0 + i * 30} y1={y - (i % 5 === 0 ? 8 : 5)} x2={x0 + i * 30} y2={y + (i % 5 === 0 ? 8 : 5)} stroke="#475569" strokeWidth="1.5" />
            <text x={x0 + i * 30} y={y + 22} textAnchor="middle" fontSize="11" fill="#475569">{lo + i * 10}</text>
          </g>
        ))}
        <circle cx={x} cy={y} r="6" fill={col} />
        <text x={x} y={y - 13} textAnchor="middle" fontSize="15" fontWeight="bold" fill={col}>{v}</text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 360 252" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="250" rx="12" fill="#f0f9ff" stroke="#7dd3fc" />
      {line(48, 362, 300, C_MIN.stroke)}
      {line(118, 187, 100, C_SUB.stroke)}
      <rect x="20" y="160" width="320" height="80" rx="10" fill="#fff" stroke="#cbd5e1" />
      <text x="34" y="182" fontSize="13.5" fontWeight="bold" fill={INK}>Százasra: 362 ≈ 400, 187 ≈ 200 → 200</text>
      <text x="34" y="206" fontSize="13.5" fontWeight="bold" fill={INK}>Tízesre: 362 ≈ 360, 187 ≈ 190 → 170</text>
      <text x="34" y="230" fontSize="13.5" fontWeight="bold" fill={C_DIF.stroke}>Pontosan: 362 − 187 = 175</text>
    </svg>
  );
};

/** Az írásbeli kivonás három lépése pótlással: 362 − 187 (maradt 1 az egyeseknél és a tízeseknél). */
export const WrittenSubExamStepsSvg: Fig = ({ className = DEF }) => {
  const steps = subSteps(362, 187);
  const res = ['  5', ' 75', '175'];
  const caps = [
    ['1. egyesek:', '7-hez 5, az 12'],
    ['2. tízesek:', '9-hez 7, az 16'],
    ['3. százasok:', '2-höz 1, az 3']
  ];
  const props = { minuend: 362, subtrahend: 187, cell: 26 };
  const { w, h } = columnSubSize(props);
  return (
    <svg viewBox="0 0 360 206" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="204" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <WrittenSubG3ColumnG {...props} x={14 + k * 116} y={12} result={res[k]} carries={carryMarks(steps, k + 1)} highlight={k} />
          <text x={14 + k * 116 + w / 2} y={h + 34} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#7c3aed">{caps[k][0]}</text>
          <text x={14 + k * 116 + w / 2} y={h + 52} textAnchor="middle" fontSize="11.5" fill={INK}>{caps[k][1]}</text>
        </g>
      ))}
      <text x="180" y="196" textAnchor="middle" fontSize="11.5" fill="#475569">A zöld 1 a maradék: a következő kivonandó-jegyhez adjuk.</text>
    </svg>
  );
};

/** Ellenőrzés: 175 + 187 = 362 és 362 − 175 = 187. */
export const WrittenSubExamCheckSvg: Fig = ({ className = DEF }) => {
  const p1 = { op: '+' as const, minuend: 175, subtrahend: 187, result: 362, cell: 30 };
  const p2 = { minuend: 362, subtrahend: 175, result: 187, cell: 30 };
  const { w, h } = columnSubSize(p1);
  return (
    <svg viewBox="0 0 360 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="188" rx="12" fill="#f0fdf4" stroke="#86efac" />
      <WrittenSubG3ColumnG {...p1} x={46} y={14} />
      <WrittenSubG3ColumnG {...p2} x={210} y={14} />
      <text x={46 + w / 2} y={h + 36} textAnchor="middle" fontSize="13" fontWeight="bold" fill={UP}>összeadással</text>
      <text x={210 + w / 2} y={h + 36} textAnchor="middle" fontSize="13" fontWeight="bold" fill={DOWN}>kivonással</text>
      <text x="180" y="176" textAnchor="middle" fontSize="12.5" fill="#475569">362 − 187 = 175 jó, mert 175 + 187 = 362.</text>
    </svg>
  );
};

/** Szöveges feladat terve: Adatok, Terv, Becslés, Számítás, Ellenőrzés, Válasz. */
export const WrittenSubExamPlanSvg: Fig = ({ className = DEF }) => {
  const rows: [string, string, string][] = [
    ['Adatok', '362 könyv volt, 187-et elvittek, maradt: ?', '#fde68a'],
    ['Terv', '362 − 187 = ?', '#bfdbfe'],
    ['Becslés', '360 − 190 = 170', '#ddd6fe'],
    ['Számítás', '362 − 187 = 175', '#bbf7d0'],
    ['Ellenőrzés', '175 + 187 = 362, tehát jó!', '#fecaca'],
    ['Válasz', '175 könyv maradt a polcon.', '#fed7aa']
  ];
  return (
    <svg viewBox="0 0 360 236" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="234" rx="12" fill="#fff" stroke="#cbd5e1" />
      {rows.map(([k, v, c], i) => (
        <g key={k}>
          <rect x="12" y={12 + i * 37} width="96" height="31" rx="8" fill={c} />
          <text x="60" y={33 + i * 37} textAnchor="middle" fontSize="13.5" fontWeight="bold" fill={INK}>{k}</text>
          <text x="120" y={33 + i * 37} fontSize="12.5" fill={k === 'Terv' || k === 'Számítás' ? INK : '#334155'} fontWeight={k === 'Válasz' ? 'bold' : 'normal'}>{v}</text>
        </g>
      ))}
    </svg>
  );
};

/** A különbség változásai röviden: három szabály kis sorokkal. */
export const WrittenSubExamChangesSvg: Fig = ({ className = DEF }) => {
  const rows: { a: number; b: number; d: number; label: string; ch: [string, string, string]; col: string }[] = [
    { a: 360, b: 120, d: 240, label: 'kisebbítendő +10', ch: ['+10', '', '+10'], col: UP },
    { a: 350, b: 130, d: 220, label: 'kivonandó +10', ch: ['', '+10', '−10'], col: DOWN },
    { a: 360, b: 130, d: 230, label: 'mindkettő +10', ch: ['+10', '+10', '0'], col: '#64748b' }
  ];
  return (
    <svg viewBox="0 0 360 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="198" rx="12" fill="#faf5ff" stroke="#d8b4fe" />
      <text x="180" y="24" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#6b21a8">Kiindulás: 350 − 120 = 230</text>
      {rows.map((r, i) => {
        const y = 62 + i * 46;
        return (
          <g key={i}>
            <text x="14" y={y + 5} fontSize="12.5" fontWeight="bold" fill={r.col}>{r.label}</text>
            <NumBox cx={170} cy={y} v={r.a} w={50} h={28} fs={15} fill={C_MIN.fill} stroke={C_MIN.stroke} />
            <text x="204" y={y + 6} textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>−</text>
            <NumBox cx={238} cy={y} v={r.b} w={50} h={28} fs={15} fill={C_SUB.fill} stroke={C_SUB.stroke} />
            <text x="272" y={y + 6} textAnchor="middle" fontSize="17" fontWeight="bold" fill={INK}>=</text>
            <NumBox cx={308} cy={y} v={r.d} w={50} h={28} fs={15} fill={C_DIF.fill} stroke={C_DIF.stroke} />
            <text x="338" y={y - 16} textAnchor="end" fontSize="11.5" fontWeight="bold" fill={r.ch[2] === '0' ? '#64748b' : r.ch[2].startsWith('+') ? UP : DOWN}>
              {r.ch[2] === '0' ? 'marad' : r.ch[2]}
            </text>
          </g>
        );
      })}
      <text x="180" y="192" textAnchor="middle" fontSize="12" fill={UNK} fontWeight="bold">A kivonandónál fordítva!</text>
    </svg>
  );
};
