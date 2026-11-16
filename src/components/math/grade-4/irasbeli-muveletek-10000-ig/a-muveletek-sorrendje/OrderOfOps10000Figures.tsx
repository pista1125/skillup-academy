import React from 'react';

const FONT = 'system-ui, sans-serif';
const UNK = '#dc2626';

/** A sorrend lépcsője 10 000-es példával (tankönyv 106. o., munkafüzet 21. o.). */
export const OrderLadderSvg: React.FC<{ className?: string }> = ({ className }) => {
  const steps = [
    { n: '1.', t: 'Zárójel', ex: '(4264 − 1316) · 3', c: '#a855f7', bg: '#f3e8ff' },
    { n: '2.', t: 'Szorzás, osztás – balról jobbra', ex: '4264 − 1316 · 3', c: '#0ea5e9', bg: '#e0f2fe' },
    { n: '3.', t: 'Összeadás, kivonás – balról jobbra', ex: '9464 − 3518 + 1325', c: '#f97316', bg: '#ffedd5' }
  ];
  return (
    <svg viewBox="0 0 340 220" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="218" rx="14" fill="#ffffff" stroke="#cbd5e1" />
      {steps.map((s, i) => (
        <g key={s.n} transform={`translate(${14 + i * 22} ${14 + i * 68})`}>
          <rect x="0" y="0" width={300 - i * 22} height="58" rx="12" fill={s.bg} stroke={s.c} strokeWidth="2" />
          <circle cx="26" cy="29" r="16" fill={s.c} />
          <text x="26" y="35" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#ffffff">{s.n}</text>
          <text x="52" y="24" fontSize="13" fontWeight="bold" fill="#0f172a">{s.t}</text>
          <text x="52" y="45" fontSize="13" fontWeight="bold" fill={s.c}>{s.ex}</text>
        </g>
      ))}
    </svg>
  );
};

/** Mona és Manó gondolatbuborékai (106. o., 1. feladat). */
export const MonaManoSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 360 210" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="208" rx="14" fill="#ffedd5" stroke="#fdba74" />
    {[
      { x: 92, name: 'Mona', l1: 'A nagypapa pénzének fele', l2: '+ a nagymama pénzének fele', ex: '2550 : 2 + 3450 : 2', hair: '#7c2d12' },
      { x: 268, name: 'Manó', l1: 'Az összes pénz', l2: 'fele jut nekem', ex: '(2550 + 3450) : 2', hair: '#9a3412' }
    ].map((p) => (
      <g key={p.name}>
        <ellipse cx={p.x} cy="62" rx="84" ry="48" fill="#fdba74" opacity="0.8" />
        <text x={p.x} y="44" textAnchor="middle" fontSize="11" fill="#431407">{p.l1}</text>
        <text x={p.x} y="60" textAnchor="middle" fontSize="11" fill="#431407">{p.l2}</text>
        <text x={p.x} y="82" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{p.ex} = <tspan fill={UNK}>?</tspan></text>
        <circle cx={p.x - 20} cy="118" r="6" fill="#fdba74" />
        <circle cx={p.x - 10} cy="132" r="4" fill="#fdba74" />
        {/* arc */}
        <circle cx={p.x} cy="166" r="22" fill="#fde7d4" stroke="#7c2d12" />
        <path d={`M ${p.x - 23} 160 Q ${p.x} 132 ${p.x + 23} 160`} fill={p.hair} />
        <circle cx={p.x - 8} cy="166" r="2.5" fill="#0f172a" />
        <circle cx={p.x + 8} cy="166" r="2.5" fill="#0f172a" />
        <path d={`M ${p.x - 7} 176 Q ${p.x} 181 ${p.x + 7} 176`} fill="none" stroke="#0f172a" strokeWidth="1.5" />
        <text x={p.x + 48} y="196" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c2d12">{p.name}</text>
      </g>
    ))}
  </svg>
);

export const WAGONS: { l: string; expr: string; c: string }[] = [
  { l: 'N', expr: '2658 + 7161 : 3', c: '#2563eb' },
  { l: 'O', expr: '7464 − 2268 : 6', c: '#eab308' },
  { l: 'T', expr: '(2658 + 7161) : 3', c: '#16a34a' },
  { l: 'P', expr: '(7464 − 2268) : 6', c: '#f97316' },
  { l: 'U', expr: '(7464 − 2268) : 6 · 2', c: '#7f1d1d' },
  { l: 'K', expr: '3450 + 1456 · 4', c: '#dc2626' }
];

/** Egy vasúti kocsi betűvel és műveletsorral. */
export const Wagon: React.FC<{ x: number; y: number; l: string; expr: string; c: string; w?: number }> = ({ x, y, l, expr, c, w = 150 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="0" y="0" width={w} height="48" rx="6" fill={c} stroke="#0f172a" strokeWidth="1.5" />
    <rect x="6" y="6" width="20" height="20" rx="3" fill="#ffffff" />
    <text x="16" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill={c}>{l}</text>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={32 + i * ((w - 40) / 4)} y="7" width={(w - 40) / 4 - 4} height="14" rx="2" fill="#e2e8f0" />
    ))}
    <rect x="6" y="28" width={w - 12} height="15" rx="3" fill="#ffffff" />
    <text x={w / 2} y="40" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0f172a">{expr}</text>
    <circle cx="24" cy="52" r="6" fill="#334155" />
    <circle cx={w - 24} cy="52" r="6" fill="#334155" />
  </g>
);

/** A vasúti szerelvény hat kocsija (106. o., 4. feladat). */
export const TrainWagonsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 360 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="228" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {WAGONS.map((wg, i) => (
      <Wagon key={wg.l} x={14 + (i % 2) * 176} y={14 + Math.floor(i / 2) * 70} l={wg.l} expr={wg.expr} c={wg.c} w={156} />
    ))}
    <text x="180" y="222" textAnchor="middle" fontSize="11" fill="#334155">Állítsd növekvő sorrendbe az eredményeket, és olvasd össze a betűket!</text>
  </svg>
);

/** Nyitott mondat számegyenesen: 3104 &lt; □ &lt; 4348 (107. o., 8. d). */
export const OpenSentenceLineSvg: React.FC<{ className?: string }> = ({ className }) => {
  const x = (v: number) => 30 + ((v - 3000) / 1600) * 300;
  return (
    <svg viewBox="0 0 360 150" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#ffffff" stroke="#cbd5e1" />
      <text x="180" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">1184 · 2 + 184 · 4 &lt; □ &lt; 5485 − 379 · 3</text>
      <text x="180" y="46" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed">3104 &lt; □ &lt; 4348</text>
      <line x1="20" y1="96" x2="344" y2="96" stroke="#334155" strokeWidth="2" />
      <polygon points="344,96 336,91 336,101" fill="#334155" />
      {[3000, 3200, 3400, 3600, 3800, 4000, 4200, 4400, 4600].map((v) => (
        <g key={v}>
          <line x1={x(v)} y1="90" x2={x(v)} y2="102" stroke="#334155" />
          <text x={x(v)} y="118" textAnchor="middle" fontSize="9" fill="#334155">{v}</text>
        </g>
      ))}
      <line x1={x(3104)} y1="80" x2={x(4348)} y2="80" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" opacity="0.7" />
      <circle cx={x(3104)} cy="80" r="5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />
      <circle cx={x(4348)} cy="80" r="5" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />
      <text x={x(3104)} y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7c3aed">3104</text>
      <text x={x(4348)} y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7c3aed">4348</text>
      <text x="180" y="140" textAnchor="middle" fontSize="11" fill="#334155">Az üres karika azt jelenti: maga a szám már nem jó.</text>
    </svg>
  );
};

/** Lékhorgászat: halak számokkal (munkafüzet 21. o., 2. feladat). */
export const FishHookSvg: React.FC<{ className?: string }> = ({ className }) => {
  const fish = [
    { v: 7998, x: 50, y: 70 },
    { v: 8028, x: 150, y: 62 },
    { v: 4197, x: 270, y: 70 },
    { v: 8372, x: 70, y: 124 },
    { v: 5734, x: 170, y: 134 },
    { v: 4295, x: 280, y: 124 }
  ];
  return (
    <svg viewBox="0 0 340 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="168" rx="14" fill="#bfdbfe" stroke="#60a5fa" />
      <rect x="1" y="1" width="338" height="34" rx="14" fill="#f1f5f9" />
      <ellipse cx="210" cy="34" rx="16" ry="4" fill="#1e3a8a" />
      <line x1="210" y1="6" x2="210" y2="96" stroke="#334155" strokeWidth="1.2" />
      <path d="M 210 96 Q 210 106 202 104" fill="none" stroke="#334155" strokeWidth="2" />
      {fish.map((f) => (
        <g key={f.v} transform={`translate(${f.x} ${f.y})`}>
          <ellipse cx="0" cy="0" rx="34" ry="14" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.5" />
          <polygon points="32,0 46,-10 46,10" fill="#7dd3fc" stroke="#0369a1" strokeWidth="1.5" />
          <circle cx="-24" cy="-3" r="2" fill="#0f172a" />
          <text x="0" y="5" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{f.v}</text>
        </g>
      ))}
      <text x="20" y="24" fontSize="11" fontWeight="bold" fill="#0f172a">8569 − 1456 · 3 &gt; □ &gt; 4150</text>
    </svg>
  );
};
