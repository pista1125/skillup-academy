import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek: Párosító (150 × 80) és Csoportosító (80 × 80).
// Az eredmény sosincs a képen; a keresett szám piros „?”.
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';
const UNK = '#dc2626';
const INK = '#0f172a';

export type GroupMode = 'plus' | 'minus' | 'pack';

/**
 * Párosító: n egyforma doboz (mindegyiken v) és még e darab.
 * plus: + e külön zsákban; minus: e darabot elvittek (áthúzott piros kör);
 * pack: minden csomagban v és e is van (zárójeles terv).
 */
export const GroupsCard: React.FC<{ n: number; v: number; e: number; mode: GroupMode }> = ({ n, v, e, mode }) => {
  const w = mode === 'pack' ? 30 : 28;
  const gap = 4;
  const x0 = 4;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + i * (w + gap);
        return mode === 'pack' ? (
          <g key={i}>
            <rect x={x} y="8" width={w} height="64" rx="6" fill="#ede9fe" stroke="#6d28d9" strokeWidth="3" />
            <text x={x + w / 2} y="34" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{v}</text>
            <line x1={x + 4} y1="42" x2={x + w - 4} y2="42" stroke="#a78bfa" strokeWidth="2" />
            <text x={x + w / 2} y="61" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">{e}</text>
          </g>
        ) : (
          <g key={i}>
            <rect x={x} y="22" width={w} height="40" rx="5" fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
            <text x={x + w / 2} y="47" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#431407">{v}</text>
          </g>
        );
      })}
      {mode !== 'pack' && (
        <g>
          <circle cx="124" cy="42" r="22" fill={mode === 'plus' ? '#bbf7d0' : '#fee2e2'} stroke={mode === 'plus' ? '#15803d' : '#b91c1c'} strokeWidth="3" />
          <text x="124" y="48" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{e}</text>
          {mode === 'minus' && <line x1="108" y1="58" x2="140" y2="26" stroke="#b91c1c" strokeWidth="3.5" />}
        </g>
      )}
    </svg>
  );
};

/** Párosító: a műveletsor, az első lépés narancs színnel; alatta „= ?”. */
export const StepCard: React.FC<{ parts: { t: string; first?: boolean }[] }> = ({ parts }) => {
  const len = parts.reduce((s, p) => s + p.t.length, 0);
  const fs = Math.min(22, Math.floor(260 / Math.max(len, 1)));
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="75" y="34" textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK}>
        {parts.map((p, i) => (
          <tspan key={i} fill={p.first ? '#ea580c' : INK} textDecoration={p.first ? 'underline' : undefined}>
            {p.t}
          </tspan>
        ))}
      </text>
      <text x="75" y="70" textAnchor="middle" fontSize="24" fontWeight="bold" fill={INK}>
        = <tspan fill={UNK}>?</tspan>
      </text>
    </svg>
  );
};

/** Párosító: a csomag, mindegyikben b és c (a · (b + c) képe). */
export const PackCard: React.FC<{ a: number; b: number; c: number }> = ({ a, b, c }) => {
  const w = 32;
  const total = a * w + (a - 1) * 5;
  const x0 = (150 - total) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: a }, (_, i) => {
        const x = x0 + i * (w + 5);
        return (
          <g key={i}>
            <path d={`M ${x} 14 L ${x + w} 14 L ${x + w - 3} 74 L ${x + 3} 74 Z`} fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
            <rect x={x + 3} y="20" width={w - 6} height="22" rx="4" fill="#fecaca" />
            <text x={x + w / 2} y="36" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{b}</text>
            <rect x={x + 4} y="46" width={w - 8} height="22" rx="4" fill="#bae6fd" />
            <text x={x + w / 2} y="62" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{c}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Csoportosító: a műveleti jelek mintája, a számok helyén pöttyök (pl. • + • · •). */
export const OpsSmall: React.FC<{ pattern: string }> = ({ pattern }) => {
  const toks = pattern.split(' ');
  const step = 76 / toks.length;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width="76" height="76" rx="10" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="2" />
      {toks.map((t, i) => {
        const cx = 2 + step * i + step / 2;
        if (t === '•') return <circle key={i} cx={cx} cy="40" r="5" fill="#475569" />;
        const isBr = t === '(' || t === ')';
        return (
          <text key={i} x={cx} y={isBr ? 49 : 48} textAnchor="middle" fontSize={isBr ? 26 : 24} fontWeight="bold" fill={isBr ? '#9333ea' : t === '·' ? '#ea580c' : '#0284c7'}>
            {t}
          </text>
        );
      })}
    </svg>
  );
};

/** Csoportosító: egymásra tett n kártya (v), mellette + e, − e vagy kétszintes csomag. */
export const GroupsSmall: React.FC<{ n: number; v: number; e: number; mode: GroupMode }> = ({ n, v, e, mode }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {Array.from({ length: n }, (_, i) => {
      const k = n - 1 - i;
      return (
        <rect key={i} x={4 + k * 5} y={6 + k * 5} width="40" height={mode === 'pack' ? 48 : 36} rx="5" fill={mode === 'pack' ? '#ede9fe' : '#fdba74'} stroke={mode === 'pack' ? '#6d28d9' : '#9a3412'} strokeWidth="3" />
      );
    })}
    {mode === 'pack' ? (
      <g>
        <text x="24" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{v}</text>
        <text x="24" y="47" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">{e}</text>
      </g>
    ) : (
      <g>
        <text x="24" y="30" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#431407">{v}</text>
        <circle cx="60" cy="62" r="16" fill={mode === 'plus' ? '#bbf7d0' : '#fee2e2'} stroke={mode === 'plus' ? '#15803d' : '#b91c1c'} strokeWidth="3" />
        <text x="60" y="67" textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>{e}</text>
        {mode === 'minus' && <line x1="48" y1="74" x2="72" y2="50" stroke="#b91c1c" strokeWidth="3" />}
      </g>
    )}
    <text x="64" y="22" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">{`${n} db`}</text>
  </svg>
);
