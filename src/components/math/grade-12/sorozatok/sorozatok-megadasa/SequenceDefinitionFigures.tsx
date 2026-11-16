import React from 'react';
import { S_BLUE, S_RED, S_GREEN, S_PURPLE, S_AMBER, S_INK } from './seqKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={S_INK}>
      {title}
    </text>
    {children}
  </svg>
);

const GNOMON_COLORS = [S_RED, S_BLUE, S_GREEN, S_AMBER];

// 1. ábra: az első n pozitív páratlan szám összege n²
export const OddSumSquaresSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 16;
  const blocks = [1, 2, 3, 4];
  const xs = [50, 120, 210, 330];
  const baseY = 200;
  return (
    <Frame title="1 + 3 + 5 + … + (2n − 1) = n²" className={className} h={270}>
      {blocks.map((n, bi) => {
        const cells: React.ReactNode[] = [];
        for (let r = 0; r < n; r++)
          for (let c = 0; c < n; c++) {
            const g = Math.max(r, c); // melyik „L” alakhoz tartozik
            cells.push(
              <rect
                key={`${r}-${c}`}
                x={xs[bi] + c * u}
                y={baseY - (r + 1) * u}
                width={u - 1.5}
                height={u - 1.5}
                rx="2"
                fill={GNOMON_COLORS[g]}
                fillOpacity="0.75"
              />
            );
          }
        const sumText = Array.from({ length: n }, (_, i) => 2 * i + 1).join(' + ');
        return (
          <g key={n}>
            {cells}
            <text x={xs[bi] + (n * u) / 2} y={baseY + 20} fontSize="11" textAnchor="middle" fill={S_INK}>
              {sumText}
            </text>
            <text x={xs[bi] + (n * u) / 2} y={baseY + 38} fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_PURPLE}>
              = {n * n}
            </text>
          </g>
        );
      })}
      <text x="240" y="62" fontSize="11.5" textAnchor="middle" fill="#475569">
        Minden új „L” alak (2n − 1 négyzet) eggyel nagyobb oldalú négyzetté egészít ki.
      </text>
    </Frame>
  );
};

// 2. ábra: a sorozat megadásának három módja
export const DefinitionModesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const boxes = [
    { t: 'képlettel', ex: 'aₙ = 3n + 2', ex2: 'aₙ = n²', c: S_BLUE, f: '#dbeafe' },
    { t: 'rekurzív módon', ex: 'a₁ = 1, a₂ = 2,', ex2: 'aₙ = aₙ₋₁ + aₙ₋₂', c: S_GREEN, f: '#d1fae5' },
    { t: 'utasítással', ex: 'pozitív négyzetszámok', ex2: 'növekvő sorozata', c: S_PURPLE, f: '#ede9fe' }
  ];
  return (
    <Frame title="Egy sorozat megadható…" className={className} h={200}>
      {boxes.map((b, i) => {
        const x = 20 + i * 150;
        return (
          <g key={b.t}>
            <rect x={x} y="44" width="140" height="130" rx="12" fill={b.f} stroke={b.c} strokeWidth="1.6" />
            <text x={x + 70} y="70" fontSize="13" textAnchor="middle" fontWeight="bold" fill={b.c}>
              {b.t}
            </text>
            <text x={x + 70} y="112" fontSize="12" textAnchor="middle" fill={S_INK}>
              {b.ex}
            </text>
            <text x={x + 70} y="132" fontSize="12" textAnchor="middle" fill={S_INK}>
              {b.ex2}
            </text>
          </g>
        );
      })}
    </Frame>
  );
};

// 3. ábra: a 8-cal osztva 5 maradékot adó számok sorozata
export const Mod8ChainSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const terms = [5, 13, 21, 29, 37];
  return (
    <Frame title="8-cal osztva 5 maradékot adó pozitív számok" className={className} h={230}>
      {terms.map((t, i) => {
        const x = 40 + i * 84;
        return (
          <g key={t}>
            <rect x={x} y="96" width="60" height="34" rx="8" fill="#eff6ff" stroke={S_BLUE} strokeWidth="1.6" />
            <text x={x + 30} y="118" fontSize="15" textAnchor="middle" fontWeight="bold" fill={S_INK}>
              {t}
            </text>
            <text x={x + 30} y="148" fontSize="10.5" textAnchor="middle" fill="#475569">
              a{String.fromCharCode(0x2081 + i)} · n = {i + 1}
            </text>
            <text x={x + 30} y="166" fontSize="10.5" textAnchor="middle" fill={S_PURPLE}>
              8 · {i + 1} − 3
            </text>
            {i < terms.length - 1 && (
              <g>
                <path d={`M ${x + 34} 92 Q ${x + 72} 62 ${x + 110} 92`} fill="none" stroke={S_GREEN} strokeWidth="1.6" />
                <path d={`M ${x + 110} 92 l -7 -2 m 7 2 l -3 -6.5`} fill="none" stroke={S_GREEN} strokeWidth="1.6" />
                <text x={x + 72} y="66" fontSize="12" textAnchor="middle" fontWeight="bold" fill={S_GREEN}>
                  +8
                </text>
              </g>
            )}
          </g>
        );
      })}
      <text x="240" y="200" fontSize="12.5" textAnchor="middle" fill={S_INK}>
        rekurzív: a₁ = 5, aₙ = aₙ₋₁ + 8  ·  képlet: aₙ = 8(n − 1) + 5 = 8n − 3
      </text>
    </Frame>
  );
};

// 4. ábra: a biztonsági őr beosztása (4 nap munka, 2 nap pihenő)
export const GuardScheduleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const days = Array.from({ length: 18 }, (_, i) => i + 1);
  return (
    <Frame title="Biztonsági őr: 4 munkanap, 2 pihenőnap, és így tovább" className={className} h={190}>
      {days.map((d) => {
        const work = (d - 1) % 6 < 4;
        const x = 24 + (d - 1) * 24.6;
        return (
          <g key={d}>
            <rect x={x} y="60" width="21" height="40" rx="5" fill={work ? '#bbf7d0' : '#e2e8f0'} stroke={work ? S_GREEN : '#94a3b8'} />
            <text x={x + 10.5} y="84" fontSize="10" textAnchor="middle" fontWeight="bold" fill={S_INK}>
              {work ? 'M' : 'P'}
            </text>
            <text x={x + 10.5} y="116" fontSize="9" textAnchor="middle" fill="#475569">
              {d}.
            </text>
          </g>
        );
      })}
      {[0, 1, 2].map((k) => (
        <g key={k}>
          <path d={`M ${24 + k * 6 * 24.6} 128 l 0 6 l ${6 * 24.6 - 4} 0 l 0 -6`} fill="none" stroke={S_BLUE} strokeWidth="1.3" />
          <text x={24 + k * 6 * 24.6 + 3 * 24.6} y="150" fontSize="10.5" textAnchor="middle" fill={S_BLUE}>
            {k + 1}. hatnapos ciklus
          </text>
        </g>
      ))}
      <text x="240" y="174" fontSize="11.5" textAnchor="middle" fill={S_INK}>
        A d-edik nap: a d-nek 6-tal való osztási maradéka dönt (1–4: munka, 5 és 0: pihenő).
      </text>
    </Frame>
  );
};

// 5. ábra: a cₙ = cₙ₋₁ − cₙ₋₂ sorozat periodikus pontgrafikonja
export const PeriodicRecursionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const vals = [3, 1, -2, -3, -1, 2, 3, 1, -2, -3, -1, 2];
  const X = (i: number) => 50 + i * 34;
  const Y = (v: number) => 150 - v * 24;
  return (
    <Frame title="c₁ = 3, c₂ = 1, cₙ = cₙ₋₁ − cₙ₋₂: hat tagonként ismétlődik" className={className} h={260}>
      <line x1="40" x2="460" y1={Y(0)} y2={Y(0)} stroke={S_INK} strokeWidth="1.3" />
      <line x1="40" x2="40" y1="230" y2="56" stroke={S_INK} strokeWidth="1.3" />
      {[-3, -2, -1, 1, 2, 3].map((v) => (
        <g key={v}>
          <line x1="40" x2="460" y1={Y(v)} y2={Y(v)} stroke="#e2e8f0" />
          <text x="34" y={Y(v) + 4} fontSize="10" textAnchor="end" fill="#64748b">
            {v < 0 ? `−${-v}` : v}
          </text>
        </g>
      ))}
      <rect x={X(0) - 14} y="58" width={6 * 34} height="170" rx="8" fill="#ede9fe" fillOpacity="0.45" stroke={S_PURPLE} strokeDasharray="4 3" />
      {vals.map((v, i) => (
        <g key={i}>
          <circle cx={X(i)} cy={Y(v)} r="4.5" fill={i < 6 ? S_PURPLE : S_BLUE} />
          <text x={X(i)} y={Y(0) + (v > 0 ? 14 : -6)} fontSize="9.5" textAnchor="middle" fill="#475569">
            {i + 1}
          </text>
        </g>
      ))}
      <text x="460" y={Y(0) - 6} fontSize="10" textAnchor="end" fontStyle="italic" fill={S_INK}>
        n
      </text>
      <text x="46" y="66" fontSize="10" fontStyle="italic" fill={S_INK}>
        cₙ
      </text>
    </Frame>
  );
};
