import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; h: number; children: React.ReactNode; className: string }> = ({ title, h, children, className }) => (
  <svg viewBox={`0 0 560 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

/** Hatvány alapja és kitevője (írásmód). */
const Pow: React.FC<{ x: number; y: number; base: string; exp: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  base,
  exp,
  size = 18,
  color = '#0f172a',
  anchor = 'middle'
}) => (
  <text x={x} y={y} fontSize={size} fontWeight="bold" textAnchor={anchor} fill={color}>
    {base}
    <tspan fontSize={size * 0.65} dy={-size * 0.45}>
      {exp}
    </tspan>
  </text>
);

/** Az egész kitevőjű hatvány értelmezése. */
export const PowersReviewDefinitionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Az egész kitevőjű hatvány értelmezése" h={250} className={className}>
    <Pow x={60} y={80} base="a" exp="n" size={26} color="#6d28d9" />
    <text x="85" y="80" fontSize="20" fill="#0f172a">
      = a · a · a · … · a
    </text>
    <path d="M 120 92 Q 190 112 260 92" fill="none" stroke="#6d28d9" strokeWidth="1.5" />
    <text x="190" y="122" fontSize="12" textAnchor="middle" fill="#6d28d9">
      n darab tényező (n &gt; 1)
    </text>
    <text x="300" y="60" fontSize="12" fill="#475569">
      a: alap
    </text>
    <text x="300" y="80" fontSize="12" fill="#475569">
      n: kitevő
    </text>
    <text x="300" y="100" fontSize="12" fill="#475569">
      aⁿ: hatvány(érték)
    </text>
    <g>
      <rect x="25" y="145" width="160" height="80" rx="12" fill="#ede9fe" stroke="#8b5cf6" />
      <Pow x={75} y={182} base="a" exp="1" size={20} />
      <text x="100" y="182" fontSize="18" fill="#0f172a">
        = a
      </text>
      <text x="105" y="210" fontSize="11" textAnchor="middle" fill="#475569">
        minden valós a-ra
      </text>
    </g>
    <g>
      <rect x="200" y="145" width="160" height="80" rx="12" fill="#dcfce7" stroke="#22c55e" />
      <Pow x={250} y={182} base="a" exp="0" size={20} />
      <text x="275" y="182" fontSize="18" fill="#0f172a">
        = 1
      </text>
      <text x="280" y="210" fontSize="11" textAnchor="middle" fill="#475569">
        a ≠ 0 (0⁰ nem értelmezett)
      </text>
    </g>
    <g>
      <rect x="375" y="145" width="160" height="80" rx="12" fill="#fee2e2" stroke="#ef4444" />
      <Pow x={415} y={182} base="a" exp="−n" size={20} />
      <text x="445" y="182" fontSize="18" fill="#0f172a">
        = (1/a)ⁿ = 1/aⁿ
      </text>
      <text x="455" y="210" fontSize="11" textAnchor="middle" fill="#475569">
        a ≠ 0, n ∈ N
      </text>
    </g>
  </Frame>
);

/** 2 hatványai lépcsőn: lefelé lépve mindig felezünk – így adódik 2⁰ = 1 és a negatív kitevő. */
export const PowersReviewLadderSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const steps = [
    { e: '4', v: '16' },
    { e: '3', v: '8' },
    { e: '2', v: '4' },
    { e: '1', v: '2' },
    { e: '0', v: '1' },
    { e: '−1', v: '1/2' },
    { e: '−2', v: '1/4' },
    { e: '−3', v: '1/8' }
  ];
  return (
    <Frame title="Miért 2⁰ = 1 és 2⁻ⁿ = 1/2ⁿ? – a felezés lépcsője" h={265} className={className}>
      {steps.map((s, i) => {
        const x = 30 + i * 64;
        const y = 70 + i * 16;
        const neg = s.e.startsWith('−');
        const zero = s.e === '0';
        return (
          <g key={s.e}>
            <rect
              x={x}
              y={y}
              width="56"
              height={150 - i * 16}
              rx="6"
              fill={zero ? '#dcfce7' : neg ? '#fee2e2' : '#ede9fe'}
              stroke={zero ? '#16a34a' : neg ? '#dc2626' : '#7c3aed'}
            />
            <Pow x={x + 28} y={y + 26} base="2" exp={s.e} size={17} />
            <text x={x + 28} y={y + 50} fontSize="14" textAnchor="middle" fill="#0f172a">
              = {s.v}
            </text>
            {i < steps.length - 1 && (
              <text x={x + 60} y={y + 2} fontSize="11" fill="#b45309" fontWeight="bold">
                : 2
              </text>
            )}
          </g>
        );
      })}
      <text x="280" y="242" fontSize="12" textAnchor="middle" fill="#475569">
        A kitevő 1-gyel csökken ⇒ a hatvány a felére csökken – így az azonosságok is érvényesek maradnak.
      </text>
    </Frame>
  );
};

/** A hatványazonosságok. */
export const PowersReviewIdentitiesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { name: 'azonos alapú hatványok szorzata', f: 'aᵐ · aⁿ = aᵐ⁺ⁿ', ex: '2³ · 2⁴ = 2⁷', c: '#7c3aed' },
    { name: 'azonos alapú hatványok hányadosa (a ≠ 0)', f: 'aᵐ : aⁿ = aᵐ⁻ⁿ', ex: '5² : 5⁶ = 5⁻⁴', c: '#2563eb' },
    { name: 'hatvány hatványa', f: '(aᵐ)ⁿ = aᵐ·ⁿ', ex: '(2⁻²)⁻⁵ = 2¹⁰', c: '#059669' },
    { name: 'szorzat hatványa', f: '(a · b)ⁿ = aⁿ · bⁿ', ex: '(2 · 5)³ = 8 · 125', c: '#d97706' },
    { name: 'hányados hatványa (b ≠ 0)', f: '(a / b)ⁿ = aⁿ / bⁿ', ex: '(2/3)⁻² = 9/4', c: '#dc2626' }
  ];
  return (
    <Frame title="Hatványazonosságok (a, b ∈ R; m, n ∈ Z)" h={290} className={className}>
      {rows.map((r, i) => (
        <g key={r.name}>
          <rect x="20" y={45 + i * 47} width="520" height="40" rx="10" fill="#ffffff" stroke={r.c} strokeWidth="1.5" />
          <rect x="20" y={45 + i * 47} width="8" height="40" rx="4" fill={r.c} />
          <text x="40" y={70 + i * 47} fontSize="12" fill="#334155">
            {r.name}
          </text>
          <text x="345" y={70 + i * 47} fontSize="16" fontWeight="bold" textAnchor="middle" fill={r.c}>
            {r.f}
          </text>
          <text x="480" y={70 + i * 47} fontSize="11" textAnchor="middle" fill="#475569">
            {r.ex}
          </text>
        </g>
      ))}
    </Frame>
  );
};

/** A bevezető szabadulószoba: 2 hatványaiból álló „szorzat-bűvös” négyzet. */
export const PowersReviewMagicSquareSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const grid = [
    [5, 22, 18],
    [28, 15, 2],
    [12, 8, 25]
  ];
  const given = new Set(['0-1', '0-2', '1-1', '2-1']);
  return (
    <Frame title="Szabadulószoba: bűvös négyzet 2 hatványaiból" h={270} className={className}>
      {grid.map((row, r) =>
        row.map((e, c) => {
          const key = `${r}-${c}`;
          const isGiven = given.has(key);
          return (
            <g key={key}>
              <rect
                x={40 + c * 72}
                y={50 + r * 62}
                width="66"
                height="56"
                rx="8"
                fill={isGiven ? '#ede9fe' : '#ffffff'}
                stroke="#7c3aed"
                strokeWidth="1.5"
              />
              <Pow x={73 + c * 72} y={86 + r * 62} base="2" exp={String(e)} size={20} color={isGiven ? '#4c1d95' : '#047857'} />
            </g>
          );
        })
      )}
      <text x="290" y="70" fontSize="12" fill="#0f172a">
        Adott: 4¹¹ = 2²², 512² = 2¹⁸, 32³ = 2¹⁵, 16² = 2⁸
      </text>
      <text x="290" y="95" fontSize="12" fill="#0f172a">
        Szorzatok: 2ᵃ · 2ᵇ · 2ᶜ = 2ᵃ⁺ᵇ⁺ᶜ ⇒ elég a kitevőket
      </text>
      <text x="290" y="113" fontSize="12" fill="#0f172a">
        összeadni: minden sorban, oszlopban, átlóban 45.
      </text>
      <text x="290" y="145" fontSize="12" fill="#047857" fontWeight="bold">
        Zöld: a kiszámolt mezők (5, 28, 2, 12, 25)
      </text>
      <text x="290" y="175" fontSize="12" fill="#0f172a">
        Kitevők angolul ⇒ betűszámok bűvös négyzete (21)
      </text>
      <text x="290" y="200" fontSize="12" fill="#0f172a">
        Számjegyösszeg 45 ⇒ 45⁻¹ = 0,0222…
      </text>
      <text x="290" y="228" fontSize="15" fill="#b91c1c" fontWeight="bold">
        A titkos kód: 022
      </text>
    </Frame>
  );
};

/** Előjel és nagyság: (−3)⁷⁵, (−3)⁻⁷⁵, 5⁻¹⁰, 3⁻¹⁰, (−7)⁸⁰, 8⁸⁰ sorrendje. */
export const PowersReviewOrderingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const items = [
    { label: 'B = (−3)⁷⁵', note: 'nagy negatív', x: 50, c: '#dc2626' },
    { label: 'E = (−3)⁻⁷⁵', note: 'kicsi negatív', x: 140, c: '#f97316' },
    { label: 'C = 5⁻¹⁰', note: 'kicsi pozitív', x: 235, c: '#0ea5e9' },
    { label: 'F = (−3)⁻¹⁰', note: '= 3⁻¹⁰ > 5⁻¹⁰', x: 320, c: '#2563eb' },
    { label: 'A = (−7)⁸⁰', note: '= 7⁸⁰', x: 415, c: '#7c3aed' },
    { label: 'D = (2³)⁸⁰', note: '= 8⁸⁰ > 7⁸⁰', x: 505, c: '#6d28d9' }
  ];
  return (
    <Frame title="Növekvő sorrend számológép nélkül" h={230} className={className}>
      <line x1="25" y1="120" x2="540" y2="120" stroke="#334155" strokeWidth="2" />
      <polygon points="540,115 550,120 540,125" fill="#334155" />
      <line x1="185" y1="108" x2="185" y2="132" stroke="#0f172a" strokeWidth="2" />
      <text x="185" y="150" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0f172a">
        0
      </text>
      {items.map((it, i) => (
        <g key={it.label}>
          <circle cx={it.x} cy="120" r="6" fill={it.c} />
          <text x={it.x} y={i % 2 === 0 ? 85 : 100} fontSize="12" fontWeight="bold" textAnchor="middle" fill={it.c}>
            {it.label}
          </text>
          <text x={it.x} y={i % 2 === 0 ? 175 : 190} fontSize="10" textAnchor="middle" fill="#475569">
            {it.note}
          </text>
        </g>
      ))}
      <text x="280" y="215" fontSize="12" textAnchor="middle" fill="#0f172a">
        Negatív alap: páros kitevő ⇒ pozitív, páratlan kitevő ⇒ negatív. B &lt; E &lt; C &lt; F &lt; A &lt; D
      </text>
    </Frame>
  );
};
