import React from 'react';
import { ThermoGroup } from '../negativ-szamok-a-mindennapokban/NegativesEverydayFigures';
import { NumberLineGroup } from '../szamegyenes-es-ellentettek/NumberLineOppositesFigures';
import { WalletGroup } from '../osszehasonlitas-es-valtozasok/NegativeChangesFigures';

const FONT = 'system-ui, sans-serif';

/** Szám kiírása a tankönyv szerint: negatív előjel „−”, ötjegyűtől szóköz. */
export const fmtNum = (n: number): string => {
  const a = Math.abs(n);
  const s = a >= 10000 ? String(a).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(a);
  return n < 0 ? `−${s}` : s;
};

/** A fejezet három „eszköze”: hőmérő, számegyenes, fabatka-pénztárca. */
export const ExamOverviewSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 360 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="228" rx="12" fill="#ffffff" stroke="#cbd5e1" />
    <rect x="10" y="10" width="92" height="210" rx="10" fill="#e0f2fe" />
    <text x="56" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">1. Hőmérő</text>
    <ThermoGroup x={56} y={50} h={120} min={-10} max={10} value={-6} color="#3b82f6" caption="−6 °C" />
    <rect x="110" y="10" width="240" height="96" rx="10" fill="#ffedd5" />
    <text x="230" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">2. Számegyenes</text>
    <NumberLineGroup
      x0={126}
      x1={326}
      y={68}
      min={-5}
      max={5}
      fontSize={8}
      points={[
        { v: -3, label: '−3' },
        { v: 3, label: '3' }
      ]}
    />
    <text x="230" y="100" textAnchor="middle" fontSize="9" fill="#0f172a">−3 és 3 ellentettek • −3 &lt; 3</text>
    <rect x="110" y="114" width="240" height="106" rx="10" fill="#fae8ff" />
    <text x="230" y="132" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#a21caf">3. Fabatka</text>
    <WalletGroup x={130} y={142} cash={3} debt={1} w={110} h={56} />
    <text x="296" y="166" textAnchor="middle" fontSize="11" fill="#0f172a">3 ● és 1 ■</text>
    <text x="296" y="184" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#a21caf">= 2 fabatka</text>
  </svg>
);

/** A változás két esete: a 0 egyik oldalán (kivonás) vagy a 0-n át (összeadás). */
export const ChangeRuleSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 210" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="208" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="20" y="20" fontSize="12" fontWeight="bold" fill="#1d4ed8">A 0 egyik oldalán: kivonunk</text>
    <NumberLineGroup x0={20} x1={300} y={74} min={-20} max={2} fontSize={8} labels={[-20, -15, -10, -5, 0]} jumps={[{ from: -4, to: -19, color: '#2563eb' }]} points={[{ v: -4, label: '−4' }, { v: -19, label: '−19' }]} />
    <text x="170" y="104" textAnchor="middle" fontSize="11" fill="#0f172a">−4 °C → −19 °C: 19 − 4 = <tspan fontWeight="bold">15 fokkal hidegebb</tspan></text>
    <text x="20" y="126" fontSize="12" fontWeight="bold" fill="#dc2626">A 0-n át: összeadunk</text>
    <NumberLineGroup x0={20} x1={300} y={172} min={-6} max={4} fontSize={8} jumps={[{ from: -5, to: 0, color: '#2563eb' }, { from: 0, to: 2, color: '#dc2626' }]} points={[{ v: -5, label: '−5' }, { v: 2, label: '2' }]} />
    <text x="170" y="202" textAnchor="middle" fontSize="11" fill="#0f172a">−5 °C → 2 °C: 5 + 2 = <tspan fontWeight="bold">7 fokkal melegebb</tspan></text>
  </svg>
);

/** Hőmérsékletlétra: a melegebb feljebb (tankönyv 89. o., 3. feladat értékei). */
export const TempLadderSvg: React.FC<{ className?: string }> = ({ className }) => {
  const temps = [18, 0, -3, -5, -21, -30];
  return (
    <svg viewBox="0 0 300 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="298" height="228" rx="12" fill="#ffffff" stroke="#cbd5e1" />
      <text x="150" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626">▲ melegebb, nagyobb</text>
      {temps.map((t, i) => (
        <g key={t}>
          <rect x="80" y={28 + i * 30} width="140" height="24" rx="12" fill={t < 0 ? '#dbeafe' : t === 0 ? '#f1f5f9' : '#fee2e2'} stroke={t < 0 ? '#2563eb' : t === 0 ? '#334155' : '#dc2626'} />
          <text x="150" y={45 + i * 30} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{fmtNum(t)} °C</text>
          {i < temps.length - 1 && <text x="236" y={60 + i * 30} fontSize="12" fill="#475569">&gt;</text>}
        </g>
      ))}
      <text x="150" y="222" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">▼ hidegebb, kisebb</text>
    </svg>
  );
};

/** Hegycsúcs és mélység: magasságkülönbség a tengerszinten át. */
export const HeightDepthSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 320 210" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="208" rx="12" fill="#e0f2fe" stroke="#7dd3fc" />
    <polygon points="30,120 110,20 190,120" fill="#f1f5f9" stroke="#94a3b8" />
    <line x1="110" y1="20" x2="110" y2="8" stroke="#475569" />
    <polygon points="110,8 122,11 110,14" fill="#dc2626" />
    <text x="128" y="24" fontSize="11" fontWeight="bold" fill="#0f172a">400 m</text>
    <rect x="2" y="120" width="316" height="88" fill="#3b82f6" opacity="0.55" />
    <line x1="2" y1="120" x2="318" y2="120" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="6 4" />
    <text x="210" y="114" fontSize="10" fontWeight="bold" fill="#1d4ed8">tengerszint: 0 m</text>
    <text x="230" y="180" fontSize="16">🐟</text>
    <text x="254" y="180" fontSize="11" fontWeight="bold" fill="#ffffff">−50 m</text>
    <line x1="290" y1="14" x2="290" y2="176" stroke="#0f172a" strokeWidth="1.5" />
    <text x="286" y="70" textAnchor="end" fontSize="10" fill="#0f172a">400 m</text>
    <text x="286" y="152" textAnchor="end" fontSize="10" fill="#ffffff">50 m</text>
    <text x="20" y="200" fontSize="11" fontWeight="bold" fill="#ffffff">A zászló és a hal között: 400 + 50 = 450 m</text>
  </svg>
);
