import React from 'react';
import { EXAM_FONT, ObjectIcon } from './MeasExamG2Parts';
import { ClockPart } from '../ido-meres/TimeG2Parts';

const wrap = (className?: string) => className ?? 'w-full max-w-[480px] h-auto mx-auto';

/** A négy mennyiség és mértékegységeik. */
export const UnitsOverviewSvg: React.FC<{ className?: string }> = ({ className }) => {
  const panels = [
    { x: 8, title: 'HOSSZÚSÁG', units: 'cm  dm  m', fill: '#dbeafe', stroke: '#2563eb', icon: 'ruler' as const },
    { x: 126, title: 'TÖMEG', units: 'kg', fill: '#dcfce7', stroke: '#16a34a', icon: 'scale' as const },
    { x: 244, title: 'ŰRTARTALOM', units: 'dl  l', fill: '#e0f2fe', stroke: '#0284c7', icon: 'jug' as const },
    { x: 362, title: 'IDŐ', units: 'perc  óra  nap', fill: '#fef3c7', stroke: '#d97706', icon: null }
  ];
  return (
    <svg viewBox="0 0 480 190" className={wrap(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={EXAM_FONT}>
      {panels.map((p) => (
        <g key={p.title}>
          <rect x={p.x} y="8" width="110" height="174" rx="14" fill={p.fill} stroke={p.stroke} strokeWidth="2.5" />
          <text x={p.x + 55} y="32" textAnchor="middle" fontSize={p.title.length > 8 ? 12 : 14} fontWeight="bold" fill={p.stroke}>
            {p.title}
          </text>
          {p.icon ? (
            <ObjectIcon kind={p.icon} x={p.x + 15} y={42} s={1} />
          ) : (
            <ClockPart cx={p.x + 55} cy={84} r={36} hour={10} minute={10} rim="#d97706" />
          )}
          <text x={p.x + 55} y="150" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
            {p.units}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Átváltások lépcsője. */
export const ConversionSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows = [
    { y: 18, text: '1 dm = 10 cm', c: '#2563eb' },
    { y: 62, text: '1 m = 10 dm = 100 cm', c: '#2563eb' },
    { y: 106, text: '1 l = 10 dl     fél liter = 5 dl', c: '#0284c7' },
    { y: 150, text: '1 óra = 60 perc     1 hét = 7 nap', c: '#d97706' }
  ];
  return (
    <svg viewBox="0 0 480 200" className={wrap(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={EXAM_FONT}>
      <rect x="1" y="1" width="478" height="198" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {rows.map((r) => (
        <g key={r.text}>
          <rect x="20" y={r.y} width="440" height="34" rx="10" fill="#ffffff" stroke={r.c} strokeWidth="2.5" />
          <text x="240" y={r.y + 24} textAnchor="middle" fontSize="19" fontWeight="bold" fill="#0f172a" style={{ whiteSpace: 'pre' }}>
            {r.text}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Mérőeszközök. */
export const ToolsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const tools = [
    { kind: 'ruler' as const, name: 'vonalzó' },
    { kind: 'tape' as const, name: 'mérőszalag' },
    { kind: 'scale' as const, name: 'mérleg' },
    { kind: 'jug' as const, name: 'mérőedény' },
    { kind: 'calendar' as const, name: 'naptár' }
  ];
  return (
    <svg viewBox="0 0 480 140" className={wrap(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={EXAM_FONT}>
      <rect x="1" y="1" width="478" height="138" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {tools.map((t, i) => (
        <g key={t.name}>
          <ObjectIcon kind={t.kind} x={10 + i * 78} y={14} s={0.95} />
          <text x={48 + i * 78} y="118" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
            {t.name}
          </text>
        </g>
      ))}
      <ClockPart cx={440} cy={52} r={30} hour={3} minute={0} rim="#d97706" />
      <text x="440" y="118" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
        óra
      </text>
    </svg>
  );
};

/** Csapda: vegyes mértékegységek. 1 m − 30 cm. */
export const MixedUnitsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 150" className={wrap(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={EXAM_FONT}>
    <rect x="1" y="1" width="478" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="240" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
      1 m = 100 cm
    </text>
    <rect x="40" y="44" width="400" height="34" rx="6" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
    <rect x="320" y="44" width="120" height="34" rx="6" fill="#fecaca" stroke="#b91c1c" strokeWidth="2" />
    <text x="180" y="67" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e3a8a">
      70 cm marad
    </text>
    <text x="380" y="67" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7f1d1d">
      30 cm
    </text>
    <text x="240" y="108" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#15803d">
      1 m − 30 cm = 100 cm − 30 cm = 70 cm
    </text>
    <text x="240" y="134" textAnchor="middle" fontSize="14" fill="#b91c1c">
      Előbb váltsd át, aztán számolj!
    </text>
  </svg>
);
