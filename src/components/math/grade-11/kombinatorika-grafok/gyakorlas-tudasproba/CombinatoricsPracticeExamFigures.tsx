import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type Pt = { x: number; y: number };

const Frame: React.FC<{ title: string; h: number; children: React.ReactNode; className: string }> = ({ title, h, children, className }) => (
  <svg viewBox={`0 0 560 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

const Vertex: React.FC<{ p: Pt; label: string; deg?: number | string; color?: string; r?: number; labelDy?: number }> = ({
  p,
  label,
  deg,
  color = '#4f46e5',
  r = 15,
  labelDy = 0
}) => (
  <g>
    <circle cx={p.x} cy={p.y} r={r} fill="#ffffff" stroke={color} strokeWidth="2.5" />
    <text x={p.x} y={p.y + 4.5 + labelDy} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1e1b4b">
      {label}
    </text>
    {deg !== undefined && (
      <text x={p.x + r + 4} y={p.y - r + 2} fontSize="11" fontWeight="bold" fill="#b91c1c">
        {deg}
      </text>
    )}
  </g>
);

const Edge: React.FC<{ a: Pt; b: Pt; color?: string; dashed?: boolean; w?: number }> = ({ a, b, color = '#64748b', dashed, w = 2.2 }) => (
  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={w} strokeDasharray={dashed ? '6 5' : undefined} />
);

/** 2. feladat: régi és új rendszámtípusok. */
export const LicensePlatesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const plate = (x: number, y: number, text: string, sub: string, count: string) => (
    <g key={text}>
      <rect x={x} y={y} width="230" height="56" rx="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2.5" />
      <rect x={x} y={y} width="26" height="56" rx="6" fill="#1d4ed8" />
      <text x={x + 13} y={y + 42} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#fde047">
        H
      </text>
      <text x={x + 128} y={y + 38} fontSize="26" fontWeight="bold" textAnchor="middle" fontFamily="monospace" fill="#0f172a">
        {text}
      </text>
      <text x={x + 115} y={y + 76} fontSize="12" textAnchor="middle" fill="#334155">
        {sub}
      </text>
      <text x={x + 115} y={y + 94} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#4f46e5">
        {count}
      </text>
    </g>
  );
  return (
    <Frame title="Rendszámok: hány különböző készíthető?" h={240} className={className}>
      {plate(30, 50, 'ABC-123', 'BBB-SzSzSz (2022-ig)', '26³ · 10³ = 17 576 000')}
      {plate(300, 50, 'AA-BC-123', 'BB-BB-SzSzSz (2022-től)', '26⁴ · 10³ = 456 976 000')}
      <text x="280" y="180" fontSize="13" textAnchor="middle" fill="#0f172a">
        Minden helyre egymástól függetlenül választunk: betű 26-féle, számjegy 10-féle.
      </text>
      <text x="280" y="205" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#b91c1c">
        Az új rendszámokból 26-szor annyi készíthető.
      </text>
    </Frame>
  );
};

/** 3. feladat: buszjegy 9 számjeggyel (3 × 3-as lyukasztómező), középpontosan szimmetrikus lyukasztás. */
export const BusTicketSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const holes = new Set([1, 9, 5, 3, 7]);
  const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <Frame title="Buszjegy: középpontosan szimmetrikus lyukasztás 5 lyukkal" h={260} className={className}>
      <rect x="40" y="48" width="200" height="190" rx="10" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      {cells.map((n, i) => {
        const cx = 80 + (i % 3) * 60;
        const cy = 85 + Math.floor(i / 3) * 58;
        return (
          <g key={n}>
            <rect x={cx - 22} y={cy - 22} width="44" height="44" rx="4" fill="#ffffff" stroke="#a16207" strokeWidth="1.5" />
            <text x={cx} y={cy + 6} fontSize="18" fontWeight="bold" textAnchor="middle" fill="#713f12">
              {n}
            </text>
            {holes.has(n) && <circle cx={cx} cy={cy} r="12" fill="#0f172a" opacity="0.85" />}
          </g>
        );
      })}
      <text x="270" y="80" fontSize="13" fill="#0f172a">
        Középpontos tükrözés a 5-ös mező középpontjára:
      </text>
      <text x="270" y="102" fontSize="13" fill="#4f46e5" fontWeight="bold">
        párok: (1; 9), (2; 8), (3; 7), (4; 6)
      </text>
      <text x="270" y="130" fontSize="13" fill="#0f172a">
        5 lyuk páratlan ⇒ a középső (5) biztosan lyukas,
      </text>
      <text x="270" y="150" fontSize="13" fill="#0f172a">
        a 4 párból 2-t választunk:
      </text>
      <text x="270" y="178" fontSize="15" fontWeight="bold" fill="#b91c1c">
        (4 alatt a 2) = 6 lehetőség
      </text>
      <text x="270" y="212" fontSize="12" fill="#475569">
        A rajzon: 5 + (1; 9) + (3; 7)
      </text>
    </Frame>
  );
};

/** Érettségi 2005: Aladár, Béla, Cecil, Dénes ismeretségi gráfja. */
export const AcquaintanceGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 200, y: 80 };
  const B = { x: 110, y: 200 };
  const C = { x: 290, y: 200 };
  const D = { x: 400, y: 80 };
  return (
    <Frame title="Ismeretségek gráfja (érettségi, 2005)" h={250} className={className}>
      <Edge a={A} b={B} color="#4f46e5" />
      <Edge a={A} b={C} color="#4f46e5" />
      <Edge a={B} b={C} color="#4f46e5" />
      <Edge a={A} b={D} color="#4f46e5" />
      <Edge a={B} b={D} color="#f43f5e" dashed />
      <Edge a={C} b={D} color="#f43f5e" dashed />
      <Vertex p={A} label="A" deg={3} />
      <Vertex p={B} label="B" deg={2} />
      <Vertex p={C} label="C" deg={2} />
      <Vertex p={D} label="D" deg={1} />
      <text x="445" y="150" fontSize="12" fill="#4f46e5" fontWeight="bold">
        — ismerősök: 4 él
      </text>
      <text x="445" y="172" fontSize="12" fill="#e11d48" fontWeight="bold">
        - - kézfogás: 2
      </text>
      <text x="445" y="200" fontSize="11" fill="#475569">
        (4 alatt a 2) − 4 = 2
      </text>
    </Frame>
  );
};

/** Tudáspróba I. 2.: egy lehetséges kézfogási gráf (0; 1; 2; 2; 2; 5; 0; 0; 4; 4; 2). */
export const HandshakeGraphSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const P: Record<string, Pt> = {
    A: { x: 230, y: 150 },
    B: { x: 330, y: 80 },
    C: { x: 330, y: 220 },
    D: { x: 150, y: 230 },
    E: { x: 230, y: 260 },
    F: { x: 440, y: 60 },
    G: { x: 450, y: 140 },
    H: { x: 130, y: 90 }
  };
  const deg: Record<string, number> = { A: 5, B: 4, C: 4, D: 2, E: 2, F: 2, G: 2, H: 1 };
  const edges: [string, string][] = [
    ['A', 'B'],
    ['A', 'C'],
    ['A', 'D'],
    ['A', 'E'],
    ['A', 'H'],
    ['B', 'C'],
    ['B', 'F'],
    ['B', 'G'],
    ['C', 'D'],
    ['C', 'E'],
    ['F', 'G']
  ];
  const isolated = [
    { x: 60, y: 300 },
    { x: 110, y: 300 },
    { x: 160, y: 300 }
  ];
  return (
    <Frame title="Egy lehetséges kézfogási gráf – 11 játékos, 11 él" h={330} className={className}>
      {edges.map(([u, v]) => (
        <Edge key={u + v} a={P[u]} b={P[v]} />
      ))}
      {Object.keys(P).map((k) => (
        <Vertex key={k} p={P[k]} label={k} deg={deg[k]} />
      ))}
      {isolated.map((p, i) => (
        <Vertex key={i} p={p} label={`${i + 1}.`} deg={0} color="#94a3b8" r={13} />
      ))}
      <text x="200" y="304" fontSize="12" fill="#475569">
        3 játékos senkivel sem fogott kezet (izolált csúcsok)
      </text>
      <text x="380" y="230" fontSize="12" fill="#0f172a">
        fokszámösszeg = 22
      </text>
      <text x="380" y="250" fontSize="13" fontWeight="bold" fill="#b91c1c">
        élek = 22 : 2 = 11
      </text>
    </Frame>
  );
};

/** Tudáspróba II. 5.: mobiltelefon billentyűzete három oszloppal. */
export const PhoneKeypadSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', '']
  ];
  const colColor = ['#0ea5e9', '#4f46e5', '#10b981'];
  return (
    <Frame title="Telefonszám két oszlop számjegyeiből (érettségi, 2011)" h={300} className={className}>
      <rect x="40" y="45" width="210" height="240" rx="18" fill="#1e293b" />
      {keys.map((row, r) =>
        row.map((k, c) =>
          k ? (
            <g key={k}>
              <rect x={60 + c * 62} y={60 + r * 55} width="50" height="42" rx="10" fill={colColor[c]} opacity="0.9" />
              <text x={85 + c * 62} y={88 + r * 55} fontSize="20" fontWeight="bold" textAnchor="middle" fill="#ffffff">
                {k}
              </text>
            </g>
          ) : null
        )
      )}
      <text x="275" y="75" fontSize="13" fill="#0f172a">
        Oszlopok: {'{1; 4; 7}'}, {'{2; 5; 8; 0}'}, {'{3; 6; 9}'}
      </text>
      <text x="275" y="100" fontSize="13" fill="#0f172a">
        7 különböző jegy ⇒ a 4 elemű középső oszlop
      </text>
      <text x="275" y="118" fontSize="13" fill="#0f172a">
        + az egyik 3 elemű szélső oszlop.
      </text>
      <text x="275" y="150" fontSize="13" fill="#4f46e5" fontWeight="bold">
        Középső elöl: (4! − 3!) · 3! · 2 = 216
      </text>
      <text x="275" y="172" fontSize="13" fill="#4f46e5" fontWeight="bold">
        Szélső elöl: 3! · 4! · 2 = 288
      </text>
      <text x="275" y="205" fontSize="15" fontWeight="bold" fill="#b91c1c">
        Összesen: 504 telefonszám
      </text>
      <text x="275" y="232" fontSize="11" fill="#475569">
        (Az első jegy nem lehet 0.)
      </text>
    </Frame>
  );
};

/** Döntési fa: melyik összeszámlálási modell? */
export const CountingModelTreeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const box = (x: number, y: number, w: number, text: string, sub: string, fill: string) => (
    <g key={text + x}>
      <rect x={x - w / 2} y={y - 22} width={w} height="48" rx="10" fill={fill} stroke="#334155" strokeWidth="1.2" />
      <text x={x} y={y - 3} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f172a">
        {text}
      </text>
      <text x={x} y={y + 15} fontSize="12" textAnchor="middle" fontFamily="monospace" fill="#1e1b4b">
        {sub}
      </text>
    </g>
  );
  return (
    <Frame title="Melyik modell? – döntési fa" h={310} className={className}>
      <rect x="190" y="45" width="180" height="34" rx="17" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
      <text x="280" y="67" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#312e81">
        Mind az n elemet sorba?
      </text>
      <Edge a={{ x: 230, y: 79 }} b={{ x: 100, y: 120 }} />
      <Edge a={{ x: 330, y: 79 }} b={{ x: 400, y: 120 }} />
      <text x="140" y="100" fontSize="11" fill="#15803d" fontWeight="bold">
        igen
      </text>
      <text x="380" y="100" fontSize="11" fill="#b91c1c" fontWeight="bold">
        nem, csak k-t
      </text>
      {box(100, 145, 160, 'Permutáció', 'n!', '#dcfce7')}
      <rect x="320" y="122" width="160" height="34" rx="17" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
      <text x="400" y="144" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#312e81">
        Számít a sorrend?
      </text>
      <Edge a={{ x: 360, y: 156 }} b={{ x: 290, y: 200 }} />
      <Edge a={{ x: 440, y: 156 }} b={{ x: 470, y: 200 }} />
      <text x="300" y="180" fontSize="11" fill="#15803d" fontWeight="bold">
        igen
      </text>
      <text x="465" y="180" fontSize="11" fill="#b91c1c" fontWeight="bold">
        nem
      </text>
      {box(470, 225, 130, 'Kombináció', 'n alatt a k', '#fef3c7')}
      <rect x="215" y="200" width="150" height="30" rx="15" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
      <text x="290" y="220" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#312e81">
        Ismétlődhet?
      </text>
      <Edge a={{ x: 250, y: 230 }} b={{ x: 130, y: 250 }} />
      <Edge a={{ x: 330, y: 230 }} b={{ x: 330, y: 248 }} />
      {box(110, 260, 150, 'nem: Variáció', 'n(n−1)…(n−k+1)', '#e0f2fe')}
      {box(290, 268, 120, 'igen: Ism. var.', 'nᵏ', '#fce7f3')}
    </Frame>
  );
};
