import React from 'react';
import { FONT } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts';
import { WrittenSubG3ColumnG, subSteps, carryMarks, suffixHoz } from './WrittenSubG3Column';

// Ábrák a 3. leckéhez (Írásbeli kivonás) – pótlásos-maradékos módszer (a tanító döntése).

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';
const GREEN = '#15803d';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const partial = (n: number, k: number) =>
  String(n)
    .padStart(3, ' ')
    .split('')
    .map((ch, i) => (2 - i < k ? ch : ' '))
    .join('');

/**
 * Három lépés egymás mellett: az oszlop az adott lépés után (a maradék zöld 1-essel),
 * alatta a lépés kimondva (pótlással), „maradt 1” zölden.
 */
const StepPanels: React.FC<{ a: number; b: number; title: string; className?: string }> = ({ a, b, title, className }) => {
  const steps = subSteps(a, b);
  return (
    <Frame w={390} h={222} className={className}>
      <text x="195" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{title}</text>
      {[1, 2, 3].map((k, i) => {
        const s = steps[i];
        const x = 22 + i * 128;
        return (
          <g key={k}>
            <WrittenSubG3ColumnG x={x} y={34} minuend={a} subtrahend={b} result={partial(a - b, k)} highlight={k - 1} carries={carryMarks(steps, k)} cell={26} />
            <text x={x + 52} y={160} textAnchor="middle" fontSize="11" fill="#64748b">{k}. lépés</text>
            {s.carryIn ? (
              <text x={x + 52} y={176} textAnchor="middle" fontSize="12" fontWeight="bold" fill={GREEN}>{s.need} meg 1 az {s.from}.</text>
            ) : null}
            <text x={x + 52} y={s.carryIn ? 193 : 180} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#0f172a">
              {s.from}-{suffixHoz(s.from)} {s.write}, az {s.target}.
            </text>
            {s.carryOut ? (
              <text x={x + 52} y={s.carryIn ? 210 : 198} textAnchor="middle" fontSize="12" fontWeight="bold" fill={GREEN}>maradt 1</text>
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
};

/** 486 − 253: egyesek, tízesek, százasok – pótlással, maradék nélkül. */
export const StepsNoExchangeSvg: Fig = ({ className }) => <StepPanels a={486} b={253} title="Az egyesekkel kezdünk. Pótolunk: mennyi kell még?" className={className} />;

/** A pótlás számegyenesen: 7-hez 5, az 12 – átléptük a 10-et, ezért maradt 1. */
export const FillUpStepsSvg: Fig = ({ className }) => {
  const x0 = 24;
  const k = 17;
  const X = (n: number) => x0 + n * k;
  return (
    <Frame w={390} h={150} className={className}>
      <text x="195" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">2 − 7 nem megy? Pótolj 12-ig! 7-hez 5, az 12.</text>
      <line x1={X(0)} y1={104} x2={X(20)} y2={104} stroke="#475569" strokeWidth="2" />
      {Array.from({ length: 21 }).map((_, n) => (
        <g key={n}>
          <line x1={X(n)} y1={n % 5 === 0 ? 96 : 99} x2={X(n)} y2={n % 5 === 0 ? 112 : 109} stroke="#475569" strokeWidth={n === 10 ? 3 : 1.4} />
          {(n % 5 === 0 || n === 7 || n === 12) && (
            <text x={X(n)} y={128} textAnchor="middle" fontSize="12.5" fontWeight={n === 7 || n === 12 ? 'bold' : 'normal'} fill={n === 7 ? '#dc2626' : n === 12 ? '#1d4ed8' : '#475569'}>{n}</text>
          )}
        </g>
      ))}
      <path d={`M ${X(7)} 94 Q ${X(9.5)} 44 ${X(12)} 94`} fill="none" stroke={GREEN} strokeWidth="2.8" />
      <path d={`M ${X(12) - 8} 86 L ${X(12)} 95 L ${X(12) + 2} 84`} fill="none" stroke={GREEN} strokeWidth="2.6" strokeLinejoin="round" />
      <text x={X(9.5)} y={58} textAnchor="middle" fontSize="16" fontWeight="bold" fill={GREEN}>+5</text>
      <circle cx={X(7)} cy={104} r="5.5" fill="#dc2626" />
      <circle cx={X(12)} cy={104} r="5.5" fill="#1d4ed8" />
      <text x={X(10)} y={86} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">10</text>
      <text x={X(20) - 2} y={70} textAnchor="end" fontSize="12" fontWeight="bold" fill={GREEN}>Átléptük a 10-et:</text>
      <text x={X(20) - 2} y={86} textAnchor="end" fontSize="12" fontWeight="bold" fill={GREEN}>maradt 1.</text>
      <text x="195" y="144" textAnchor="middle" fontSize="11.5" fill="#64748b">A 7 a kivonandó jegye, a 2 a kisebbítendőé. 2 helyett 12-ig pótolunk.</text>
    </Frame>
  );
};

/** 372 − 145: maradt 1 az egyeseknél. */
export const ExchangeOnesSvg: Fig = ({ className }) => <StepPanels a={372} b={145} title="Az egyeseknél maradt 1: a tízeseknél 4 meg 1 az 5." className={className} />;

/** 428 − 175: maradt 1 a tízeseknél. */
export const ExchangeTensSvg: Fig = ({ className }) => <StepPanels a={428} b={175} title="A tízeseknél maradt 1: a százasoknál 1 meg 1 az 2." className={className} />;

/** 421 − 186: kétszer maradt 1. */
export const ExchangeBothSvg: Fig = ({ className }) => <StepPanels a={421} b={186} title="Az egyeseknél és a tízeseknél is maradt 1." className={className} />;

/** 403 − 157: a tízesek helyén 0 van – 10-ig pótolunk. */
export const ZeroTensSvg: Fig = ({ className }) => <StepPanels a={403} b={157} title="0 tízes van: a 6-tól 10-ig pótolunk, maradt 1." className={className} />;

/** Ellenőrzés: 372 − 145 = 227 → 227 + 145 = 372, 145 + 227 = 372, 372 − 227 = 145. */
export const CheckSvg: Fig = ({ className }) => (
  <Frame w={390} h={170} className={className}>
    <text x="195" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">372 − 145 = 227. Ellenőrizzük!</text>
    <WrittenSubG3ColumnG x={14} y={36} op="+" minuend={227} subtrahend={145} result={372} cell={24} header={false} />
    <WrittenSubG3ColumnG x={146} y={36} op="+" minuend={145} subtrahend={227} result={372} cell={24} header={false} />
    <WrittenSubG3ColumnG x={278} y={36} minuend={372} subtrahend={227} result={145} cell={24} header={false} />
    <text x="62" y="152" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#16a34a">összeadással</text>
    <text x="194" y="152" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#16a34a">vagy így</text>
    <text x="326" y="152" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">kivonással</text>
    <text x="128" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#64748b">vagy</text>
    <text x="261" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#64748b">vagy</text>
  </Frame>
);

/** Szöveges feladat lépései: Adatok, Terv, Becslés, Számítás, Ellenőrzés, Válasz. */
export const WordPlanSvg: Fig = ({ className }) => (
  <Frame w={440} h={210} className={className}>
    {[
      ['Adatok', 'összes szék: 364, foglalt: 178, üres: ?'],
      ['Terv', '364 − 178 = □'],
      ['Becslés', '364 ≈ 360, 178 ≈ 180, 360 − 180 = 180'],
      ['Számítás', 'írásban, pótlással (jobbra)'],
      ['Ellenőrzés', '186 + 178 = 364'],
      ['Válasz', '186 szék marad üresen.']
    ].map(([k, v], i) => (
      <g key={k}>
        <text x="16" y={34 + i * 30} fontSize="12.5" fontWeight="bold" fill="#7c2d12">{k}:</text>
        <text x="92" y={34 + i * 30} fontSize="12" fill="#0f172a">{v}</text>
      </g>
    ))}
    <WrittenSubG3ColumnG x={336} y={56} minuend={364} subtrahend={178} result={186} carries={[null, 1, 1]} cell={24} header />
  </Frame>
);
