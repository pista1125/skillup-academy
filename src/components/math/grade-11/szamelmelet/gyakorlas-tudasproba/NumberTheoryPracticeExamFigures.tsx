import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type Pt = { x: number; y: number };

/** Derékszög-jelölés (magyar szokás): negyedkörív ponttal a V csúcsnál, A és B felé mutató szárakkal. */
export const rightAnglePath = (V: Pt, A: Pt, B: Pt, r = 12): { d: string; dot: Pt } => {
  const n1 = Math.hypot(A.x - V.x, A.y - V.y);
  const n2 = Math.hypot(B.x - V.x, B.y - V.y);
  const u1 = { x: (A.x - V.x) / n1, y: (A.y - V.y) / n1 };
  const u2 = { x: (B.x - V.x) / n2, y: (B.y - V.y) / n2 };
  const cross = u1.x * u2.y - u1.y * u2.x;
  const sweep = cross > 0 ? 1 : 0;
  const s = { x: V.x + r * u1.x, y: V.y + r * u1.y };
  const e = { x: V.x + r * u2.x, y: V.y + r * u2.y };
  const bx = u1.x + u2.x;
  const by = u1.y + u2.y;
  const bn = Math.hypot(bx, by) || 1;
  return {
    d: `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${e.x.toFixed(2)} ${e.y.toFixed(2)}`,
    dot: { x: V.x + 0.55 * r * (bx / bn), y: V.y + 0.55 * r * (by / bn) }
  };
};

// 1. ábra: kitevőtáblázat – LNKO: kisebb kitevő, LKKT: nagyobb kitevő (4. feladat)
export const NumberTheoryExamExponentTableSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const primes = ['2', '3', '5', '7', '11'];
  const rows = [
    { label: 'a', vals: ['3', '2', '4', '1', '0'], fill: '#f8fafc', color: '#0f172a' },
    { label: '(a; b)', vals: ['1', '2', '4', '1', '0'], fill: '#ecfdf5', color: '#065f46' },
    { label: '[a; b]', vals: ['3', '4', '6', '2', '1'], fill: '#e0f2fe', color: '#075985' },
    { label: 'b', vals: ['1', '4', '6', '2', '1'], fill: '#fef3c7', color: '#92400e' }
  ];
  const x0 = 130;
  const cw = 80;
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="32" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#065f46">
        A prímtényezők kitevői
      </text>
      <text x="70" y="70" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#475569">
        prím
      </text>
      {primes.map((p, i) => (
        <text key={p} x={x0 + cw * i + cw / 2} y="70" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#0f172a">
          {p}
        </text>
      ))}
      {rows.map((r, j) => (
        <g key={r.label}>
          <rect x="20" y={84 + j * 46} width="520" height="40" rx="8" fill={r.fill} stroke="#e2e8f0" />
          <text x="70" y={110 + j * 46} fontSize="14" fontWeight="bold" textAnchor="middle" fill={r.color}>
            {r.label}
          </text>
          {r.vals.map((v, i) => (
            <text key={i} x={x0 + cw * i + cw / 2} y={110 + j * 46} fontSize="16" fontWeight="bold" textAnchor="middle" fill={r.color}>
              {v}
            </text>
          ))}
        </g>
      ))}
      <text x="280" y="280" fontSize="12" textAnchor="middle" fill="#475569">
        (a; b): a kisebbik kitevő, [a; b]: a nagyobbik kitevő ⇒ b = 2 · 3⁴ · 5⁶ · 7² · 11
      </text>
    </svg>
  );
};

// 2. ábra: ismeretlen számjegyek – 3A407B osztható-e 4-gyel, 15-tel?
export const NumberTheoryExamDigitsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const digits = ['3', 'A', '4', '0', '7', 'B'];
  return (
    <svg viewBox="0 0 560 280" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="270" rx="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      {digits.map((d, i) => {
        const unknown = d === 'A' || d === 'B';
        return (
          <g key={i}>
            <rect
              x={110 + i * 58}
              y="26"
              width="50"
              height="56"
              rx="10"
              fill={unknown ? '#fef3c7' : '#ecfdf5'}
              stroke={unknown ? '#d97706' : '#059669'}
              strokeWidth="2"
            />
            <text x={135 + i * 58} y="64" fontSize="26" fontWeight="bold" textAnchor="middle" fill={unknown ? '#92400e' : '#065f46'}>
              {d}
            </text>
          </g>
        );
      })}
      <path d="M 342 92 L 342 104 L 452 104 L 452 92" fill="none" stroke="#0284c7" strokeWidth="2" />
      <text x="397" y="122" fontSize="12" textAnchor="middle" fill="#075985">
        4 | 7B ⇒ B = 2 vagy 6
      </text>
      <rect x="24" y="140" width="250" height="120" rx="12" fill="#e0f2fe" stroke="#0284c7" />
      <text x="149" y="164" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#075985">
        a) 4-gyel
      </text>
      <text x="149" y="190" fontSize="12" textAnchor="middle" fill="#0f172a">
        az utolsó két jegy: 72 vagy 76
      </text>
      <text x="149" y="214" fontSize="12" textAnchor="middle" fill="#0f172a">
        A bármelyik számjegy lehet
      </text>
      <text x="149" y="240" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#075985">
        20 megoldás
      </text>
      <rect x="286" y="140" width="250" height="120" rx="12" fill="#ecfdf5" stroke="#059669" />
      <text x="411" y="164" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#065f46">
        b) 15-tel = 3-mal és 5-tel
      </text>
      <text x="411" y="190" fontSize="12" textAnchor="middle" fill="#0f172a">
        B = 0: 3 | 14 + A ⇒ A = 1; 4; 7
      </text>
      <text x="411" y="214" fontSize="12" textAnchor="middle" fill="#0f172a">
        B = 5: 3 | 19 + A ⇒ A = 2; 5; 8
      </text>
      <text x="411" y="240" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#065f46">
        6 megoldás
      </text>
    </svg>
  );
};

// 3. ábra: gyógyfürdő – 45, 18, 30 naponta; [45; 18; 30] = 90; szombat + 90 nap = péntek
export const NumberTheoryExamCalendarSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const days = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
  const cx = 420;
  const cy = 150;
  const R = 88;
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      {[
        { n: 45, c: '#059669' },
        { n: 18, c: '#0284c7' },
        { n: 30, c: '#7c3aed' }
      ].map((s, j) => (
        <g key={s.n}>
          <line x1="30" y1={60 + j * 44} x2="270" y2={60 + j * 44} stroke="#e2e8f0" strokeWidth="2" />
          {Array.from({ length: 90 / s.n + 1 }, (_, k) => (
            <circle key={k} cx={30 + (240 * k * s.n) / 90} cy={60 + j * 44} r="5" fill={s.c} />
          ))}
          <text x="30" y={48 + j * 44} fontSize="11" fill={s.c} fontWeight="bold">
            {s.n} naponta
          </text>
        </g>
      ))}
      <line x1="270" y1="40" x2="270" y2="160" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 3" />
      <text x="30" y="190" fontSize="12" fill="#0f172a">
        45 = 3² · 5;  18 = 2 · 3²;  30 = 2 · 3 · 5
      </text>
      <text x="30" y="214" fontSize="13" fontWeight="bold" fill="#be123c">
        [45; 18; 30] = 2 · 3² · 5 = 90 nap
      </text>
      <text x="30" y="238" fontSize="12" fill="#0f172a">
        90 = 12 · 7 + 6 ⇒ a szombatnál 6 nappal később
      </text>
      <text x="30" y="262" fontSize="13" fontWeight="bold" fill="#065f46">
        ⇒ péntek: igaza volt.
      </text>
      <circle cx={cx} cy={cy} r={R} fill="#f8fafc" stroke="#cbd5e1" />
      {days.map((d, i) => {
        const t = (2 * Math.PI * i) / 7 - Math.PI / 2;
        const x = cx + R * Math.cos(t);
        const y = cy + R * Math.sin(t);
        const hl = d === 'szombat' || d === 'péntek';
        return (
          <g key={d}>
            <circle cx={x} cy={y} r="20" fill={hl ? (d === 'péntek' ? '#dcfce7' : '#fef3c7') : '#ffffff'} stroke={hl ? '#059669' : '#94a3b8'} strokeWidth="1.5" />
            <text x={x} y={y + 4} fontSize="9" fontWeight="bold" textAnchor="middle" fill="#0f172a">
              {d.length > 6 ? d.slice(0, 5) + '.' : d}
            </text>
          </g>
        );
      })}
      <text x={cx} y={cy - 4} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#be123c">
        + 90 nap
      </text>
      <text x={cx} y={cy + 14} fontSize="11" textAnchor="middle" fill="#475569">
        = + 6 nap
      </text>
    </svg>
  );
};

// 4. ábra: átváltás – 53 = 110101₂ ismételt osztással, 1201₃ helyiérték-táblázattal
export const NumberTheoryExamBaseConversionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const steps = [
    { n: 53, r: 1 },
    { n: 26, r: 0 },
    { n: 13, r: 1 },
    { n: 6, r: 0 },
    { n: 3, r: 1 },
    { n: 1, r: 1 }
  ];
  const pv = [
    { h: '27', d: '1' },
    { h: '9', d: '2' },
    { h: '3', d: '0' },
    { h: '1', d: '1' }
  ];
  return (
    <svg viewBox="0 0 560 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="290" rx="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="130" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#065f46">
        53 → kettes számrendszer
      </text>
      {steps.map((s, i) => (
        <g key={i}>
          <text x="110" y={60 + i * 32} fontSize="15" textAnchor="end" fill="#0f172a">
            {s.n}
          </text>
          <line x1="122" y1={46 + i * 32} x2="122" y2={68 + i * 32} stroke="#94a3b8" />
          <text x="140" y={60 + i * 32} fontSize="15" fontWeight="bold" fill="#be123c">
            {s.r}
          </text>
          <text x="170" y={60 + i * 32} fontSize="11" fill="#64748b">
            {i < 5 ? `: 2 = ${Math.floor(s.n / 2)}, maradék ${s.r}` : 'vége'}
          </text>
        </g>
      ))}
      <path d="M 150 238 L 150 50" stroke="#be123c" strokeWidth="2" markerEnd="url(#ntpeArrow)" />
      <defs>
        <marker id="ntpeArrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#be123c" />
        </marker>
      </defs>
      <text x="130" y="275" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#be123c">
        alulról felfelé: 110101₂
      </text>
      <text x="420" y="30" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#075985">
        1201₃ → tízes számrendszer
      </text>
      {pv.map((c, i) => (
        <g key={i}>
          <rect x={300 + i * 60} y="50" width="56" height="34" fill="#e0f2fe" stroke="#0284c7" />
          <text x={328 + i * 60} y="72" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#075985">
            {c.h}
          </text>
          <rect x={300 + i * 60} y="84" width="56" height="40" fill="#ffffff" stroke="#0284c7" />
          <text x={328 + i * 60} y="111" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#0f172a">
            {c.d}
          </text>
        </g>
      ))}
      <text x="420" y="160" fontSize="13" textAnchor="middle" fill="#0f172a">
        1 · 27 + 2 · 9 + 0 · 3 + 1 · 1
      </text>
      <text x="420" y="190" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#075985">
        = 46
      </text>
      <text x="420" y="240" fontSize="11" textAnchor="middle" fill="#64748b">
        helyi értékek: 3³, 3², 3¹, 3⁰
      </text>
    </svg>
  );
};

// 5. ábra: számhalmazok – N ⊂ Z ⊂ Q, irracionális számok (Q*), valós számok (R)
export const NumberTheoryExamNumberSetsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 600 320" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="590" height="310" rx="16" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
    <text x="300" y="300" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">
      valós számok halmaza (R)
    </text>
    <rect x="20" y="20" width="380" height="260" rx="22" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
    <text x="34" y="42" fontSize="12" fontWeight="bold" fill="#065f46">
      racionális számok (Q)
    </text>
    <rect x="50" y="60" width="300" height="190" rx="20" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="64" y="80" fontSize="12" fontWeight="bold" fill="#075985">
      egész számok (Z)
    </text>
    <rect x="90" y="100" width="210" height="110" rx="18" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <text x="195" y="120" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#5b21b6">
      természetes számok (N)
    </text>
    {[
      { t: '30', x: 130, y: 160 },
      { t: '1', x: 180, y: 180 },
      { t: '13', x: 230, y: 160 },
      { t: '√144 = 12', x: 250, y: 195 },
      { t: '−7', x: 70, y: 150 },
      { t: '−8/4', x: 320, y: 140 },
      { t: '20,5', x: 40, y: 270 },
      { t: '−7/15', x: 340, y: 270 },
      { t: '0,4̇', x: 370, y: 60 }
    ].map((n) => (
      <text key={n.t} x={n.x} y={n.y} fontSize="13" textAnchor="middle" fill="#0f172a">
        {n.t}
      </text>
    ))}
    <rect x="410" y="20" width="170" height="260" rx="22" fill="#fff1f2" stroke="#e11d48" strokeWidth="2" />
    <text x="495" y="42" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#9f1239">
      irracionális (Q*)
    </text>
    {[
      { t: '√2', y: 90 },
      { t: '√14', y: 125 },
      { t: '16π', y: 160 },
      { t: '0,1211221112…', y: 200 },
      { t: '√5', y: 240 }
    ].map((n) => (
      <text key={n.t} x="495" y={n.y} fontSize="13" textAnchor="middle" fill="#0f172a">
        {n.t}
      </text>
    ))}
  </svg>
);

// 6. ábra: Theodorus-spirál – az n-edik derékszögű háromszög átfogója √(n + 1)
export const NumberTheoryExamTheodorusSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const O = { x: 230, y: 160 };
  const u = 40;
  const pts: Pt[] = [{ x: O.x + u, y: O.y }];
  for (let i = 0; i < 9; i++) {
    const p = pts[i];
    const dx = p.x - O.x;
    const dy = p.y - O.y;
    const len = Math.hypot(dx, dy);
    // merőleges egységlépés (az óramutatóval ellentétes irányban a képernyőn)
    pts.push({ x: p.x + (dy / len) * u, y: p.y - (dx / len) * u });
  }
  return (
    <svg viewBox="0 0 460 320" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="450" height="310" rx="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      {pts.slice(0, 9).map((p, i) => {
        const q = pts[i + 1];
        const ra = rightAnglePath(p, O, q, 9);
        return (
          <g key={i}>
            <polygon points={`${O.x},${O.y} ${p.x},${p.y} ${q.x},${q.y}`} fill={i % 2 ? '#ecfdf5' : '#e0f2fe'} stroke="#0f766e" strokeWidth="1.2" />
            <path d={ra.d} fill="none" stroke="#0f766e" strokeWidth="1" />
            <circle cx={ra.dot.x} cy={ra.dot.y} r="1.4" fill="#0f766e" />
          </g>
        );
      })}
      {pts.slice(1).map((q, i) => {
        const mx = (O.x + q.x) / 2;
        const my = (O.y + q.y) / 2;
        return (
          <text key={i} x={mx} y={my} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#9f1239">
            √{i + 2}
          </text>
        );
      })}
      <text x={(O.x + pts[0].x) / 2} y={O.y + 14} fontSize="10" textAnchor="middle" fill="#334155">
        1
      </text>
      <text x="230" y="300" fontSize="12" textAnchor="middle" fill="#334155">
        minden új befogó 1 egység; az n-edik háromszög átfogója √(n + 1)
      </text>
    </svg>
  );
};
