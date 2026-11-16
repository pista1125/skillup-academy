import React from 'react';
import { A_BLUE, A_RED, A_GREEN, A_PURPLE, A_AMBER, A_INK } from './arKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';


const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill={A_INK}>
      {title}
    </text>
    {children}
  </svg>
);

// 1. ábra: a valós számkör
export const NumberSetsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="A valós számkör: ℕ ⊂ ℤ ⊂ ℚ, ℚ ∪ ℚ* = ℝ" className={className} h={280}>
    <rect x="20" y="40" width="440" height="225" rx="14" fill="#f1f5f9" stroke={A_INK} strokeWidth="1.5" />
    <text x="440" y="60" fontSize="13" fontWeight="bold" textAnchor="end" fill={A_INK}>ℝ valós számok</text>
    <rect x="34" y="70" width="270" height="182" rx="12" fill="#dbeafe" stroke={A_BLUE} strokeWidth="1.5" />
    <text x="44" y="88" fontSize="12" fontWeight="bold" fill={A_BLUE}>ℚ racionális</text>
    <text x="44" y="240" fontSize="10.5" fill="#1e3a8a">5/7; 2,03; 3,4(05); 0,1666…</text>
    <rect x="48" y="98" width="200" height="124" rx="10" fill="#dcfce7" stroke={A_GREEN} strokeWidth="1.5" />
    <text x="58" y="116" fontSize="12" fontWeight="bold" fill={A_GREEN}>ℤ egész</text>
    <text x="58" y="210" fontSize="10.5" fill="#065f46">…; −2; −1; 0; 1; …</text>
    <rect x="64" y="126" width="140" height="62" rx="9" fill="#fef3c7" stroke={A_AMBER} strokeWidth="1.5" />
    <text x="74" y="145" fontSize="12" fontWeight="bold" fill={A_AMBER}>ℕ természetes</text>
    <text x="74" y="170" fontSize="10.5" fill="#92400e">0; 1; 2; 3; …</text>
    <rect x="316" y="70" width="132" height="182" rx="12" fill="#fee2e2" stroke={A_RED} strokeWidth="1.5" />
    <text x="326" y="88" fontSize="12" fontWeight="bold" fill={A_RED}>ℚ* irracionális</text>
    <text x="326" y="130" fontSize="11" fill="#7f1d1d">√2; lg 3; π</text>
    <text x="326" y="170" fontSize="9.5" fill="#7f1d1d">tizedes tört alakja</text>
    <text x="326" y="184" fontSize="9.5" fill="#7f1d1d">végtelen, nem szakaszos</text>
    <text x="326" y="214" fontSize="9.5" fill="#7f1d1d">(racionális: véges vagy</text>
    <text x="326" y="228" fontSize="9.5" fill="#7f1d1d">végtelen szakaszos)</text>
  </Frame>
);

// 2. ábra: intervallumok a számegyenesen
export const IntervalsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = (v: number) => 50 + (v + 3) * 42;
  const seg = (a: number, b: number, y: number, ca: boolean, cb: boolean, col: string, label: string) => (
    <g>
      <line x1={X(a)} x2={X(b)} y1={y} y2={y} stroke={col} strokeWidth="4" />
      <circle cx={X(a)} cy={y} r="5.5" fill={ca ? col : '#fff'} stroke={col} strokeWidth="2" />
      <circle cx={X(b)} cy={y} r="5.5" fill={cb ? col : '#fff'} stroke={col} strokeWidth="2" />
      <text x={(X(a) + X(b)) / 2} y={y - 12} fontSize="12" fontWeight="bold" textAnchor="middle" fill={col}>
        {label}
      </text>
    </g>
  );
  return (
    <Frame title="Intervallumok: A = ]−2; 1[, B = [2; 4[, C = [5; 6]" className={className} h={200}>
      <line x1="30" x2="460" y1="140" y2="140" stroke={A_INK} strokeWidth="1.5" />
      {Array.from({ length: 10 }, (_, i) => i - 3).map((v) => (
        <g key={v}>
          <line x1={X(v)} x2={X(v)} y1="135" y2="145" stroke={A_INK} />
          <text x={X(v)} y="162" fontSize="11" textAnchor="middle" fill="#475569">
            {v < 0 ? `−${-v}` : v}
          </text>
        </g>
      ))}
      {seg(-2, 1, 100, false, false, A_BLUE, 'A: −2 < x < 1')}
      {seg(2, 4, 100, true, false, A_RED, 'B: 2 ≤ x < 4')}
      {seg(5, 6, 100, true, true, A_GREEN, 'C')}
      <text x="240" y="186" fontSize="10.5" textAnchor="middle" fill="#475569">
        teli kör: a végpont benne van (zárt), üres kör: nincs benne (nyílt)
      </text>
    </Frame>
  );
};

// 3. ábra: LNKO és LKKT prímtényezős felbontásból
export const GcdLcmSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { p: '2', a: 3, b: 2 },
    { p: '3', a: 2, b: 1 },
    { p: '5', a: 1, b: 0 },
    { p: '7', a: 0, b: 1 }
  ];
  const SUPS = ['⁰', '¹', '²', '³'];
  return (
    <Frame title="360 = 2³ · 3² · 5 és 84 = 2² · 3 · 7" className={className} h={270}>
      {['prím', '360', '84', 'LNKO: kisebb kitevő', 'LKKT: nagyobb kitevő'].map((h, i) => (
        <text key={h} x={[50, 120, 180, 270, 395][i]} y="56" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill={[A_INK, A_BLUE, A_RED, A_GREEN, A_PURPLE][i]}>
          {h}
        </text>
      ))}
      {rows.map((r, i) => (
        <g key={r.p}>
          <rect x="24" y={66 + i * 34} width="432" height="28" rx="6" fill={i % 2 ? '#fff' : '#f1f5f9'} />
          <text x="50" y={85 + i * 34} fontSize="13" fontWeight="bold" textAnchor="middle" fill={A_INK}>
            {r.p}
          </text>
          <text x="120" y={85 + i * 34} fontSize="13" textAnchor="middle" fill={A_BLUE}>
            {r.p}
            {SUPS[r.a]}
          </text>
          <text x="180" y={85 + i * 34} fontSize="13" textAnchor="middle" fill={A_RED}>
            {r.p}
            {SUPS[r.b]}
          </text>
          <text x="270" y={85 + i * 34} fontSize="13" textAnchor="middle" fill={A_GREEN}>
            {Math.min(r.a, r.b) === 0 ? '–' : `${r.p}${SUPS[Math.min(r.a, r.b)]}`}
          </text>
          <text x="395" y={85 + i * 34} fontSize="13" textAnchor="middle" fill={A_PURPLE}>
            {r.p}
            {SUPS[Math.max(r.a, r.b)]}
          </text>
        </g>
      ))}
      <text x="270" y="225" fontSize="12.5" fontWeight="bold" textAnchor="middle" fill={A_GREEN}>
        (360; 84) = 2² · 3 = 12
      </text>
      <text x="395" y="225" fontSize="12.5" fontWeight="bold" textAnchor="middle" fill={A_PURPLE}>
        [360; 84] = 2520
      </text>
      <text x="240" y="252" fontSize="10.5" textAnchor="middle" fill="#475569">
        Ellenőrzés: (a; b) · [a; b] = a · b, azaz 12 · 2520 = 360 · 84 = 30 240
      </text>
    </Frame>
  );
};

// 4. ábra: hatvány – gyök – logaritmus
export const PowerRootLogSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Ugyanaz az összefüggés háromféleképpen" className={className} h={260}>
    <rect x="170" y="45" width="140" height="50" rx="12" fill="#dbeafe" stroke={A_BLUE} strokeWidth="2" />
    <text x="240" y="66" fontSize="11" textAnchor="middle" fill={A_BLUE}>hatvány</text>
    <text x="240" y="86" fontSize="17" fontWeight="bold" textAnchor="middle" fill={A_INK}>2³ = 8</text>
    <rect x="40" y="170" width="140" height="50" rx="12" fill="#dcfce7" stroke={A_GREEN} strokeWidth="2" />
    <text x="110" y="191" fontSize="11" textAnchor="middle" fill={A_GREEN}>gyök (az alapot keressük)</text>
    <text x="110" y="211" fontSize="17" fontWeight="bold" textAnchor="middle" fill={A_INK}>∛8 = 2</text>
    <rect x="300" y="170" width="140" height="50" rx="12" fill="#ede9fe" stroke={A_PURPLE} strokeWidth="2" />
    <text x="370" y="191" fontSize="11" textAnchor="middle" fill={A_PURPLE}>logaritmus (a kitevőt)</text>
    <text x="370" y="211" fontSize="17" fontWeight="bold" textAnchor="middle" fill={A_INK}>log₂ 8 = 3</text>
    <line x1="200" y1="98" x2="140" y2="166" stroke="#64748b" strokeWidth="1.5" />
    <line x1="280" y1="98" x2="340" y2="166" stroke="#64748b" strokeWidth="1.5" />
    <text x="240" y="150" fontSize="12" textAnchor="middle" fill="#475569">
      a
      <tspan dy="-6" fontSize="9">
        log
      </tspan>
      <tspan dy="3" fontSize="7">
        a
      </tspan>
      <tspan dy="-3" fontSize="9">
        {' '}b
      </tspan>
      <tspan dy="6"> = b</tspan>
    </text>
    <text x="240" y="245" fontSize="10.5" textAnchor="middle" fill="#475569">
      Áttérés: logₐ b = lg b / lg a (bármely közös alappal), pl. log₄ 3 = log₂ 3 / 2; log₅ 2 = lg 2 / lg 5
    </text>
  </Frame>
);

// 5. ábra: számrendszerek – kidolgozott feladat
export const NumberBaseSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const digits = ['3', '0', '1', '4'];
  const pw = ['5³ = 125', '5² = 25', '5¹ = 5', '1'];
  return (
    <Frame title="Kidolgozott feladat: 3014₅ átírása 6-os számrendszerbe" className={className} h={280}>
      {digits.map((d, i) => (
        <g key={i}>
          <rect x={60 + i * 95} y="45" width="70" height="40" rx="8" fill="#dbeafe" stroke={A_BLUE} strokeWidth="1.8" />
          <text x={95 + i * 95} y="72" fontSize="18" fontWeight="bold" textAnchor="middle" fill={A_BLUE}>
            {d}
          </text>
          <text x={95 + i * 95} y="102" fontSize="10.5" textAnchor="middle" fill="#475569">
            {pw[i]}
          </text>
        </g>
      ))}
      <text x="240" y="130" fontSize="12.5" textAnchor="middle" fontWeight="bold" fill={A_INK}>
        3 · 125 + 0 · 25 + 1 · 5 + 4 = 384
      </text>
      <text x="40" y="165" fontSize="11.5" fill={A_RED}>384 = 1 · 216 + 168</text>
      <text x="40" y="185" fontSize="11.5" fill={A_RED}>168 = 4 · 36 + 24</text>
      <text x="40" y="205" fontSize="11.5" fill={A_RED}>24 = 4 · 6 + 0</text>
      <text x="40" y="225" fontSize="11.5" fill={A_RED}>0 = 0 · 1</text>
      <text x="250" y="175" fontSize="11" fill="#475569">A 6 hatványai: 1, 6, 36, 216, 1296</text>
      <text x="250" y="195" fontSize="11" fill="#475569">(a 216 még kisebb 384-nél)</text>
      <text x="250" y="230" fontSize="15" fontWeight="bold" fill={A_GREEN}>3014₅ = 384 = 1440₆</text>
      <text x="240" y="262" fontSize="10.5" textAnchor="middle" fill="#475569">
        n alapú számrendszer: jegyek 0; 1; …; n − 1, helyi értékek jobbról 1; n; n²; n³; …
      </text>
    </Frame>
  );
};
