import React from 'react';

type Fig = React.FC<{ className?: string }>;
const cls = (c?: string) => c ?? 'w-full max-w-md h-auto mx-auto';
const FONT = 'system-ui, sans-serif';

/** 14 korong négyes zacskókba: 3 zacskó, marad 2. */
export const PacksSvg: Fig = ({ className }) => (
  <svg viewBox="0 0 360 170" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="168" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">14 korong, egy zacskóba 4 kerül</text>
    {[0, 1, 2].map((b) => (
      <g key={b}>
        <path d={`M ${20 + b * 84} 46 L ${92 + b * 84} 46 L ${86 + b * 84} 104 L ${26 + b * 84} 104 Z`} fill="#dbeafe" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
        <path d={`M ${34 + b * 84} 46 Q ${56 + b * 84} 36 ${78 + b * 84} 46`} fill="none" stroke="#2563eb" strokeWidth="2" />
        {[0, 1, 2, 3].map((d) => (
          <circle key={d} cx={44 + b * 84 + (d % 2) * 24} cy={64 + Math.floor(d / 2) * 24} r="9" fill="#ef4444" stroke="#991b1b" strokeWidth="1.2" />
        ))}
      </g>
    ))}
    <circle cx="290" cy="76" r="9" fill="#ef4444" stroke="#991b1b" strokeWidth="1.2" />
    <circle cx="316" cy="76" r="9" fill="#ef4444" stroke="#991b1b" strokeWidth="1.2" />
    <text x="303" y="104" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">marad 2</text>
    <text x="180" y="132" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">3 tele zacskó lett, 2 korong maradt.</text>
    <text x="180" y="156" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">14 : 4 = 3 marad 2</text>
  </svg>
);

/** A maradékos osztás kétféle lejegyzése. */
export const NotationSvg: Fig = ({ className }) => {
  const cell = 26;
  const gx = 196;
  const gy = 74;
  const digits = ['1', '7', ':', '5', '=', '3'];
  return (
    <svg viewBox="0 0 360 190" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="188" rx="14" fill="#f0f9ff" stroke="#7dd3fc" />
      <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">Kétféleképpen írhatod le</text>
      <text x="22" y="52" fontSize="12" fontWeight="bold" fill="#0369a1">1. szóval:</text>
      <text x="22" y="82" fontSize="18" fontWeight="bold" fill="#0f172a">17 : 5 = 3</text>
      <text x="22" y="108" fontSize="18" fontWeight="bold" fill="#b91c1c">marad 2</text>
      <text x="196" y="52" fontSize="12" fontWeight="bold" fill="#0369a1">2. a füzetben:</text>
      {Array.from({ length: 2 }, (_, r) =>
        Array.from({ length: 6 }, (_, c) => (
          <rect key={`${r}-${c}`} x={gx + c * cell} y={gy + r * cell} width={cell} height={cell} fill="#fff" stroke="#bae6fd" />
        ))
      )}
      {digits.map((d, i) => (
        <text key={i} x={gx + i * cell + cell / 2} y={gy + 19} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">
          {d}
        </text>
      ))}
      <text x={gx + cell * 1.5} y={gy + cell + 19} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#b91c1c">2</text>
      <text x={gx + cell * 1.5} y={gy + cell * 2 + 18} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">a maradék az egyesek alá</text>
      <text x="22" y="150" fontSize="12" fill="#334155">Kiolvasva:</text>
      <text x="22" y="170" fontSize="13" fontWeight="bold" fill="#334155">„17 osztva 5-tel 3, marad 2.”</text>
    </svg>
  );
};

/** Ellenőrzés: hányados · osztó + maradék = osztandó. */
export const CheckSvg: Fig = ({ className }) => (
  <svg viewBox="0 0 360 150" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#f0fdf4" stroke="#86efac" />
    <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">Ellenőrzés: 17 : 5 = 3 marad 2</text>
    {[0, 1, 2].map((g) => (
      <g key={g}>
        <rect x={16 + g * 92} y="38" width="84" height="30" rx="15" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4].map((d) => (
          <circle key={d} cx={30 + g * 92 + d * 14} cy="53" r="5.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
        ))}
      </g>
    ))}
    <circle cx="300" cy="53" r="5.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
    <circle cx="316" cy="53" r="5.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
    <g fontSize="20" fontWeight="bold" textAnchor="middle">
      <text x="90" y="108" fill="#ea580c">3</text>
      <text x="115" y="108" fill="#334155">·</text>
      <text x="140" y="108" fill="#7c3aed">5</text>
      <text x="165" y="108" fill="#334155">+</text>
      <text x="190" y="108" fill="#b91c1c">2</text>
      <text x="215" y="108" fill="#334155">=</text>
      <text x="248" y="108" fill="#16a34a">17</text>
    </g>
    <g fontSize="11" fontWeight="bold" textAnchor="middle">
      <text x="90" y="130" fill="#ea580c">hányados</text>
      <text x="140" y="130" fill="#7c3aed">osztó</text>
      <text x="190" y="130" fill="#b91c1c">maradék</text>
      <text x="252" y="130" fill="#16a34a">osztandó</text>
    </g>
  </svg>
);

/** A maradék sosem éri el az osztót (osztás 4-gyel). */
export const RemainderCycleSvg: Fig = ({ className }) => {
  const rows = [12, 13, 14, 15, 16, 17];
  return (
    <svg viewBox="0 0 360 230" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="228" rx="14" fill="#f5f3ff" stroke="#c4b5fd" />
      <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#5b21b6">Osztás 4-gyel: figyeld a maradékot!</text>
      {rows.map((n, i) => {
        const q = Math.floor(n / 4);
        const r = n % 4;
        const y = 50 + i * 28;
        return (
          <g key={n}>
            <text x="30" y={y} fontSize="15" fontWeight="bold" fill="#1e293b">{`${n} : 4 = ${q}`}</text>
            <text x="140" y={y} fontSize="15" fontWeight="bold" fill="#b91c1c">{`marad ${r}`}</text>
            {Array.from({ length: 4 }, (_, k) => (
              <rect key={k} x={232 + k * 26} y={y - 15} width="22" height="20" rx="4" fill={k < r ? '#f87171' : '#fff'} stroke="#a78bfa" />
            ))}
          </g>
        );
      })}
      <text x="180" y="218" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#5b21b6">A maradék mindig kisebb, mint az osztó!</text>
    </svg>
  );
};

/** 16 pálcikából háromszögek: 5 háromszög, marad 1 pálcika. */
export const SticksSvg: Fig = ({ className }) => (
  <svg viewBox="0 0 360 150" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#fff7ed" stroke="#fdba74" />
    <text x="180" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">16 pálcikából háromszögeket rakunk</text>
    {Array.from({ length: 5 }, (_, i) => {
      const x = 20 + i * 62;
      return (
        <g key={i} strokeWidth="5" strokeLinecap="round">
          <line x1={x} y1="92" x2={x + 48} y2="92" stroke="#dc2626" />
          <line x1={x} y1="92" x2={x + 24} y2="50" stroke="#2563eb" />
          <line x1={x + 48} y1="92" x2={x + 24} y2="50" stroke="#16a34a" />
        </g>
      );
    })}
    <line x1="334" y1="50" x2="334" y2="96" stroke="#eab308" strokeWidth="5" strokeLinecap="round" />
    <text x="180" y="138" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9a3412">16 : 3 = 5 marad 1</text>
  </svg>
);
