import React from 'react';
import { FONT, UNK, Flat, Rod, Cube } from './Count1000ExamG3Parts';
import { JumpLine } from '../../szamolas-500-ig/osszeadas-es-kivonas/AddSub500G3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** 638 számképpel és helyiérték-táblázattal. */
export const Count1000BlocksSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {Array.from({ length: 6 }).map((_, i) => (
      <Flat key={i} x={14 + i * 32} y={14} s={28} />
    ))}
    {Array.from({ length: 3 }).map((_, i) => (
      <Rod key={i} x={14 + i * 10} y={50} w={6} h={40} />
    ))}
    {Array.from({ length: 8 }).map((_, i) => (
      <Cube key={i} x={50 + Math.floor(i / 4) * 10} y={50 + (i % 4) * 10} s={8} />
    ))}
    {['Sz', 'T', 'E'].map((h, i) => (
      <g key={h}>
        <rect x={222 + i * 40} y={14} width="40" height="24" fill={['#fee2e2', '#dbeafe', '#fef9c3'][i]} stroke="#475569" />
        <text x={242 + i * 40} y={31} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{h}</text>
        <rect x={222 + i * 40} y={38} width="40" height="34" fill="#fff" stroke="#475569" />
        <text x={242 + i * 40} y={63} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{[6, 3, 8][i]}</text>
      </g>
    ))}
    <text x="180" y="116" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">638 = 600 + 30 + 8</text>
    <text x="180" y="138" textAnchor="middle" fontSize="13" fill="#475569">hatszázharmincnyolc</text>
  </svg>
);

/** Számegyenes 0-tól 1000-ig, százasonként. */
export const Count1000NumberLineSvg: Fig = ({ className = DEF }) => {
  const x0 = 20;
  const x1 = 336;
  const y = 62;
  const X = (v: number) => x0 + ((x1 - x0) * v) / 1000;
  return (
    <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="118" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
      <line x1={x0 - 6} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 21 }).map((_, i) => {
        const v = i * 50;
        const big = v % 100 === 0;
        return (
          <g key={v}>
            <line x1={X(v)} y1={big ? y - 9 : y - 5} x2={X(v)} y2={big ? y + 9 : y + 5} stroke="#334155" strokeWidth={big ? 2 : 1.2} />
            {big && <text x={X(v)} y={y + 24} textAnchor="middle" fontSize="11.5" fontWeight={v === 1000 ? 'bold' : 'normal'} fill="#334155">{v}</text>}
          </g>
        );
      })}
      <circle cx={X(470)} cy={y} r="5" fill="#2563eb" />
      <text x={X(470)} y={y - 16} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">470</text>
      <circle cx={X(850)} cy={y} r="5" fill="#16a34a" />
      <text x={X(850)} y={y - 16} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">850</text>
      <text x="180" y="108" textAnchor="middle" fontSize="12.5" fill="#475569">10 százas = 1 ezres = 1000</text>
    </svg>
  );
};

/** 647 kerekítése tízesre és százasra. */
export const Count1000RoundingSvg: Fig = ({ className = DEF }) => {
  const seg = (y: number, lo: number, hi: number, v: number, res: number, color: string) => {
    const x0 = 30;
    const x1 = 240;
    const X = (u: number) => x0 + ((x1 - x0) * (u - lo)) / (hi - lo);
    return (
      <g>
        <line x1={x0} y1={y} x2={x1} y2={y} stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={X(lo + ((hi - lo) * i) / 10)} y1={i % 5 === 0 ? y - 8 : y - 4} x2={X(lo + ((hi - lo) * i) / 10)} y2={i % 5 === 0 ? y + 8 : y + 4} stroke="#334155" strokeWidth={i % 5 === 0 ? 2 : 1} />
        ))}
        <text x={x0} y={y + 32} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">{lo}</text>
        <text x={x1} y={y + 32} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">{hi}</text>
        <circle cx={X(v)} cy={y} r="5" fill="#2563eb" />
        <text x={X(v)} y={y - 12} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">647</text>
        <path d={`M ${X(v)} ${y + 10} Q ${(X(v) + X(res)) / 2} ${y + 22} ${X(res)} ${y + 10}`} fill="none" stroke={color} strokeWidth="2" />
        <text x="300" y={y + 5} textAnchor="middle" fontSize="15" fontWeight="bold" fill={color}>≈ {res}</text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 360 164" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="162" rx="14" fill="#fffbeb" stroke="#fcd34d" />
      <text x="14" y="20" fontSize="12" fontWeight="bold" fill="#92400e">tízesre</text>
      {seg(46, 640, 650, 647, 650, '#16a34a')}
      <text x="14" y="96" fontSize="12" fontWeight="bold" fill="#92400e">százasra</text>
      {seg(122, 600, 700, 647, 600, '#dc2626')}
    </svg>
  );
};

/** 380 + 250 bontással. */
export const Count1000AddSubSvg: Fig = ({ className = DEF }) => (
  <JumpLine lo={300} hi={700} start={380} jumps={[{ to: 580, label: '+ 200' }, { to: 630, label: '+ 50' }]} W={360} H={130} className={className} fs={13} />
);

/** Egy szorzótáblás pár, négy művelet. */
export const Count1000MulDivSvg: Fig = ({ className = DEF }) => {
  const box = (x: number, y: number, t: string, fill: string, stroke: string) => (
    <g>
      <rect x={x} y={y} width="150" height="32" rx="8" fill={fill} stroke={stroke} strokeWidth="1.6" />
      <text x={x + 75} y={y + 22} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{t}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {box(105, 12, '7 · 8 = 56', '#fef9c3', '#ca8a04')}
      {box(20, 62, '7 · 80 = 560', '#dbeafe', '#2563eb')}
      {box(190, 62, '80 · 7 = 560', '#dbeafe', '#2563eb')}
      {box(20, 106, '560 : 7 = 80', '#dcfce7', '#16a34a')}
      {box(190, 106, '560 : 80 = 7', '#dcfce7', '#16a34a')}
      <path d="M 160 46 L 110 60" stroke="#64748b" strokeWidth="1.8" />
      <path d="M 200 46 L 250 60" stroke="#64748b" strokeWidth="1.8" />
    </svg>
  );
};

/** Visszafelé gondolkodás: ? → · 3 → ? → + 100 → 1000, vissza: − 100, : 3. */
export const Count1000BackSvg: Fig = ({ className = DEF }) => {
  const box = (x: number, t: string, unk: boolean) => (
    <g>
      <rect x={x} y={50} width="74" height="34" rx="8" fill={unk ? '#fee2e2' : '#f1f5f9'} stroke={unk ? UNK : '#475569'} strokeWidth="1.8" />
      <text x={x + 37} y={73} textAnchor="middle" fontSize="16" fontWeight="bold" fill={unk ? UNK : '#0f172a'}>{t}</text>
    </g>
  );
  const arc = (xa: number, xb: number, up: boolean, label: string, color: string) => {
    const y = up ? 46 : 88;
    const cy = up ? 14 : 120;
    return (
      <g>
        <path d={`M ${xa} ${y} Q ${(xa + xb) / 2} ${cy} ${xb} ${y}`} fill="none" stroke={color} strokeWidth="2" />
        <path d={up ? `M ${xb - 8} ${y - 6} L ${xb} ${y} L ${xb - 2} ${y - 9}` : `M ${xb + 8} ${y + 6} L ${xb} ${y} L ${xb + 2} ${y + 9}`} fill="none" stroke={color} strokeWidth="2" />
        <text x={(xa + xb) / 2} y={up ? 24 : 120} textAnchor="middle" fontSize="14" fontWeight="bold" fill={color}>{label}</text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 360 134" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="132" rx="14" fill="#fff7ed" stroke="#fed7aa" />
      {box(20, '300', true)}
      {box(143, '900', true)}
      {box(266, '1000', false)}
      {arc(70, 160, true, '· 3', '#475569')}
      {arc(193, 283, true, '+ 100', '#475569')}
      {arc(283, 193, false, '− 100', UNK)}
      {arc(160, 70, false, ': 3', UNK)}
    </svg>
  );
};
