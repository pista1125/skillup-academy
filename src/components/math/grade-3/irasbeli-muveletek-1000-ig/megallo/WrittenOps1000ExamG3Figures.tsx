import React from 'react';
import { WrittenAddG3ColumnG } from '../../irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Column';
import { WrittenSubG3ColumnG } from '../../irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Column';
import { FONT, INK } from '../muveleti-sorrend/OrderOps1000G3Parts';

type P = { className?: string };
const cls = (c?: string) => c ?? 'w-full max-w-xl h-auto mx-auto';

/** Amit már tudsz: négy csempe a fejezet négy leckéjéről. */
export const WrittenOps1000ExamMapSvg: React.FC<P> = ({ className }) => {
  const tiles = [
    { t: 'Írásbeli összeadás', s: '467 + 385', c: '#dcfce7', b: '#16a34a' },
    { t: 'Írásbeli kivonás', s: '1000 − 496', c: '#e0f2fe', b: '#0284c7' },
    { t: 'Sorrend, zárójel', s: '(930 − 570) : 6', c: '#ffedd5', b: '#ea580c' },
    { t: 'Szöveges feladat', s: 'Mit tudunk? Mit kérdeznek?', c: '#f3e8ff', b: '#7c3aed' }
  ];
  return (
    <svg viewBox="0 0 480 200" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {tiles.map((t, i) => (
        <g key={i}>
          <rect x={8 + (i % 2) * 236} y={8 + Math.floor(i / 2) * 96} width="228" height="88" rx="14" fill={t.c} stroke={t.b} strokeWidth="2.5" />
          <circle cx={34 + (i % 2) * 236} cy={34 + Math.floor(i / 2) * 96} r="15" fill="#fff" stroke={t.b} strokeWidth="2.5" />
          <text x={34 + (i % 2) * 236} y={40 + Math.floor(i / 2) * 96} textAnchor="middle" fontSize="16" fontWeight="bold" fill={t.b}>{i + 1}.</text>
          <text x={58 + (i % 2) * 236} y={40 + Math.floor(i / 2) * 96} fontSize="15" fontWeight="bold" fill={INK}>{t.t}</text>
          <text x={122 + (i % 2) * 236} y={78 + Math.floor(i / 2) * 96} textAnchor="middle" fontSize={i === 3 ? 14 : 22} fontWeight="bold" fill={t.b}>{t.s}</text>
        </g>
      ))}
    </svg>
  );
};

/** Írásbeli összeadás két maradékkal: 467 + 385 = 852. */
export const WrittenOps1000ExamAddSvg: React.FC<P> = ({ className }) => (
  <svg viewBox="0 0 480 200" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="196" rx="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
    <WrittenAddG3ColumnG x={24} y={14} addends={[467, 385]} result={852} carries={[null, 1, 1]} cell={36} />
    <text x="200" y="50" fontSize="15" fontWeight="bold" fill={INK}>Egyesek: 7 meg 5 az 12.</text>
    <text x="200" y="70" fontSize="15" fontWeight="bold" fill="#15803d">Leírom a 2-t, maradt 1.</text>
    <text x="200" y="102" fontSize="15" fontWeight="bold" fill={INK}>Tízesek: 6 meg 8 az 14, meg 1 az 15.</text>
    <text x="200" y="122" fontSize="15" fontWeight="bold" fill="#15803d">Leírom az 5-öt, maradt 1.</text>
    <text x="200" y="154" fontSize="15" fontWeight="bold" fill={INK}>Százasok: 4 meg 3 az 7, meg 1 az 8.</text>
    <text x="200" y="174" fontSize="15" fontWeight="bold" fill="#15803d">Leírom a 8-at.</text>
  </svg>
);

/** Kivonás 1000-ből pótlással: 1000 − 496 = 504. */
export const WrittenOps1000ExamSubSvg: React.FC<P> = ({ className }) => (
  <svg viewBox="0 0 480 200" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="196" rx="14" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
    <WrittenSubG3ColumnG x={14} y={20} minuend={1000} subtrahend={496} result={504} carries={[null, 1, 1, 1]} cols={4} cell={36} />
    <text x="200" y="46" fontSize="15" fontWeight="bold" fill={INK}>Egyesek: 6-hoz 4, az 10.</text>
    <text x="200" y="64" fontSize="15" fontWeight="bold" fill="#1d4ed8">Leírom a 4-et, maradt 1.</text>
    <text x="200" y="92" fontSize="15" fontWeight="bold" fill={INK}>Tízesek: 9 meg 1 az 10. 10-hez 0, az 10.</text>
    <text x="200" y="110" fontSize="15" fontWeight="bold" fill="#1d4ed8">Leírom a 0-t, maradt 1.</text>
    <text x="200" y="138" fontSize="15" fontWeight="bold" fill={INK}>Százasok: 4 meg 1 az 5. 5-höz 5, az 10.</text>
    <text x="200" y="156" fontSize="15" fontWeight="bold" fill="#1d4ed8">Leírom az 5-öt, maradt 1.</text>
    <text x="200" y="184" fontSize="14" fontWeight="bold" fill="#475569">Ezresek: 0 meg 1 az 1, 1-hez 0 – kész.</text>
  </svg>
);

/** A sorrend egy sorban: zárójel → · : → + −. */
export const WrittenOps1000ExamOrderSvg: React.FC<P> = ({ className }) => {
  const s = [
    { t: '( )', l: 'zárójel', c: '#fed7aa', b: '#ea580c' },
    { t: '·  :', l: 'szorzás, osztás', c: '#e9d5ff', b: '#7c3aed' },
    { t: '+  −', l: 'összeadás, kivonás', c: '#bae6fd', b: '#0284c7' }
  ];
  return (
    <svg viewBox="0 0 480 130" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {s.map((x, i) => (
        <g key={i}>
          <rect x={10 + i * 160} y="14" width="140" height="80" rx="14" fill={x.c} stroke={x.b} strokeWidth="2.5" />
          <text x={80 + i * 160} y="58" textAnchor="middle" fontSize="30" fontWeight="bold" fill={INK}>{x.t}</text>
          <text x={80 + i * 160} y="84" textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>{x.l}</text>
          {i < 2 && <path d={`M ${152 + i * 160} 54 L ${168 + i * 160} 54 M ${162 + i * 160} 48 L ${168 + i * 160} 54 L ${162 + i * 160} 60`} stroke="#475569" strokeWidth="3" fill="none" />}
        </g>
      ))}
      <text x="240" y="120" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#475569">Egyforma lépcsőn balról jobbra haladunk.</text>
    </svg>
  );
};

/** A szöveges feladat terve négy lépésben. */
export const WrittenOps1000ExamPlanSvg: React.FC<P> = ({ className }) => {
  const s = ['Olvasd el!', 'Rajzold le!', 'Becsülj, számolj!', 'Ellenőrizz, válaszolj!'];
  const c = ['#fde68a', '#bbf7d0', '#bfdbfe', '#fbcfe8'];
  return (
    <svg viewBox="0 0 480 110" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {s.map((t, i) => (
        <g key={i}>
          <rect x={6 + i * 118} y="20" width="108" height="70" rx="12" fill={c[i]} stroke="#334155" strokeWidth="2" />
          <text x={60 + i * 118} y="48" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>{i + 1}.</text>
          <text x={60 + i * 118} y="74" textAnchor="middle" fontSize={t.length > 14 ? 11.5 : 13.5} fontWeight="bold" fill={INK}>{t}</text>
        </g>
      ))}
    </svg>
  );
};
