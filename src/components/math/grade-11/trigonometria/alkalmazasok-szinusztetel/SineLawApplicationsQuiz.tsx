import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SineLawApplicationsMatcher } from './SineLawApplicationsMatcher';
import { SineLawApplicationsSorter } from './SineLawApplicationsSorter';

// ---- Kvízábrák (csak ebben a fájlban használt segédek) ----
type Pt = [number, number];
const RAD = Math.PI / 180;
const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';
const INK = '#334155';
const lblColor = (t: string) => (t.includes('?') ? '#dc2626' : '#0f172a');

const unitVec = (a: Pt, b: Pt): Pt => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  return [dx / l, dy / l];
};

/** Pontok beillesztése a 240×150-es vászonba (középre, arányosan). */
const fitPts = (pts: Pt[], box = { x0: 36, x1: 204, y0: 22, y1: 124 }): Pt[] => {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const s = Math.min((box.x1 - box.x0) / (maxX - minX || 1), (box.y1 - box.y0) / (maxY - minY || 1));
  const ox = (box.x0 + box.x1) / 2 - ((minX + maxX) / 2) * s;
  const oy = (box.y0 + box.y1) / 2 + ((minY + maxY) / 2) * s;
  return pts.map((p) => [ox + p[0] * s, oy - p[1] * s] as Pt);
};

/** Háromszög vízszintes alappal: [felső csúcs, bal alsó, jobb alsó]; a két alapon fekvő szög fokban. */
const triByAngles = (left: number, right: number, x0 = 36, x1 = 204): Pt[] => {
  const top = 180 - left - right;
  const l = Math.sin(right * RAD) / Math.sin(top * RAD);
  return fitPts([[l * Math.cos(left * RAD), l * Math.sin(left * RAD)], [0, 0], [1, 0]], { x0, x1, y0: 22, y1: 124 });
};

/** Szögív a v csúcsnál a v→a és v→b félegyenesek között, felirattal. */
const AngleMark: React.FC<{ v: Pt; a: Pt; b: Pt; label?: string; r?: number; color?: string }> = ({
  v,
  a,
  b,
  label,
  r,
  color = '#2563eb'
}) => {
  const u1 = unitVec(v, a);
  const u2 = unitVec(v, b);
  const ang = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1])));
  const rr = r ?? (ang < 35 * RAD ? 26 : 15);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const bis = unitVec([0, 0], [u1[0] + u2[0], u1[1] + u2[1]]);
  const d = Math.min(58, Math.max(rr + 11, 8 / Math.sin(ang / 2)));
  return (
    <g>
      <path
        d={`M ${v[0] + rr * u1[0]} ${v[1] + rr * u1[1]} A ${rr} ${rr} 0 0 ${sweep} ${v[0] + rr * u2[0]} ${v[1] + rr * u2[1]}`}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
      />
      {label && (
        <text
          x={v[0] + d * bis[0]}
          y={v[1] + d * bis[1]}
          fontSize="11"
          fontWeight="bold"
          fill={label.includes('?') ? '#dc2626' : color}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {label}
        </text>
      )}
    </g>
  );
};

/** Derékszög jelölése: negyedkörív ponttal (magyar jelölés). */
const RightMark: React.FC<{ v: Pt; a: Pt; b: Pt; r?: number }> = ({ v, a, b, r = 12 }) => {
  const u1 = unitVec(v, a);
  const u2 = unitVec(v, b);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const bis = unitVec([0, 0], [u1[0] + u2[0], u1[1] + u2[1]]);
  return (
    <g>
      <path
        d={`M ${v[0] + r * u1[0]} ${v[1] + r * u1[1]} A ${r} ${r} 0 0 ${sweep} ${v[0] + r * u2[0]} ${v[1] + r * u2[1]}`}
        fill="none"
        stroke={INK}
        strokeWidth="1.4"
      />
      <circle cx={v[0] + 0.55 * r * bis[0]} cy={v[1] + 0.55 * r * bis[1]} r="1.8" fill={INK} />
    </g>
  );
};

/** Felirat egy szakasz mellé, a megadott ponttól (pl. súlyponttól) távolodó oldalra. */
const SideLabel: React.FC<{ p: Pt; q: Pt; away: Pt; text: string; off?: number }> = ({ p, q, away, text, off = 11 }) => {
  const m: Pt = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const t = unitVec(p, q);
  let n: Pt = [-t[1], t[0]];
  if (n[0] * (m[0] - away[0]) + n[1] * (m[1] - away[1]) < 0) n = [-n[0], -n[1]];
  const anchor = n[0] > 0.35 ? 'start' : n[0] < -0.35 ? 'end' : 'middle';
  return (
    <text
      x={m[0] + off * n[0]}
      y={m[1] + off * n[1]}
      fontSize="11"
      fontWeight="bold"
      fill={lblColor(text)}
      textAnchor={anchor}
      dominantBaseline="middle"
    >
      {text}
    </text>
  );
};

/** Általános háromszögábra. pts: [0] felső csúcs, [1] bal alsó, [2] jobb alsó; s[i] az i. csúccsal szemközti oldal felirata. */
const TriFig: React.FC<{
  pts: Pt[];
  v?: string[];
  s?: (string | undefined)[];
  ang?: (string | undefined)[];
  right?: number;
  alt?: string;
  center?: string;
}> = ({ pts, v, s, ang, right, alt, center }) => {
  const g: Pt = [(pts[0][0] + pts[1][0] + pts[2][0]) / 3, (pts[0][1] + pts[1][1] + pts[2][1]) / 3];
  const foot: Pt = [pts[0][0], pts[1][1]];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <polygon points={pts.map((p) => p.join(',')).join(' ')} fill="#eff6ff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      {alt && (
        <g>
          <line x1={pts[1][0]} y1={pts[1][1]} x2={pts[2][0]} y2={pts[2][1]} stroke={INK} strokeWidth="2" />
          <line x1={pts[0][0]} y1={pts[0][1]} x2={foot[0]} y2={foot[1]} stroke="#dc2626" strokeWidth="1.6" strokeDasharray="4 3" />
          <RightMark v={foot} a={pts[0]} b={pts[2]} r={10} />
          <text x={foot[0] + 5} y={(pts[0][1] + foot[1]) / 2} fontSize="11" fontWeight="bold" fill="#dc2626" dominantBaseline="middle">
            {alt}
          </text>
        </g>
      )}
      {[0, 1, 2].map((i) => {
        const p = pts[(i + 1) % 3];
        const q = pts[(i + 2) % 3];
        const a = ang?.[i];
        const label = s?.[i];
        return (
          <g key={i}>
            {right === i ? (
              <RightMark v={pts[i]} a={p} b={q} />
            ) : (
              a !== undefined && <AngleMark v={pts[i]} a={p} b={q} label={a || undefined} />
            )}
            {label && <SideLabel p={p} q={q} away={g} text={label} />}
          </g>
        );
      })}
      {v?.map((t, i) => {
        if (!t) return null;
        const u = unitVec(g, pts[i]);
        return (
          <text
            key={`v${i}`}
            x={pts[i][0] + 12 * u[0]}
            y={pts[i][1] + 12 * u[1]}
            fontSize="12"
            fontWeight="bold"
            fill="#1e293b"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {t}
          </text>
        );
      })}
      {center && (
        <text x={g[0]} y={g[1] + 4} fontSize="11" fontWeight="bold" fill={lblColor(center)} textAnchor="middle">
          {center}
        </text>
      )}
    </svg>
  );
};


/** Repülőgép és jeladó: R₁, R₂ a repülési egyenesen, J a földön; dep1, dep2 a depressziószögek. */
const PlaneFig: React.FC<{
  dep1: number;
  dep2: number;
  dist: string;
  r1?: string;
  r2Dep?: string;
  r2In?: string;
  jIn?: string;
  jAlt?: string;
  d?: string;
  e?: string;
  h?: string;
}> = ({ dep1, dep2, dist, r1, r2Dep, r2In, jIn, jAlt, d, e, h }) => {
  const y0 = 32;
  const R1: Pt = [32, y0];
  const R2: Pt = [118, y0];
  const t1 = Math.tan(dep1 * RAD);
  const t2 = Math.tan(dep2 * RAD);
  const xJ = (R2[0] * t2 - R1[0] * t1) / (t2 - t1);
  const J: Pt = [xJ, y0 + (xJ - R1[0]) * t1];
  const P: Pt = [xJ, y0];
  const g: Pt = [(R1[0] + R2[0] + J[0]) / 3, (R1[1] + R2[1] + J[1]) / 3];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="12" y1={y0} x2="228" y2={y0} stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="5 3" />
      <polygon points={`${228},${y0} ${221},${y0 - 4} ${221},${y0 + 4}`} fill="#94a3b8" />
      <line x1="10" y1={J[1]} x2="230" y2={J[1]} stroke="#a16207" strokeWidth="2" />
      <polygon points={[R1, R2, J].map((p) => p.join(',')).join(' ')} fill="#eff6ff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      {h && (
        <g>
          <line x1={P[0]} y1={P[1]} x2={J[0]} y2={J[1]} stroke="#dc2626" strokeWidth="1.6" strokeDasharray="4 3" />
          <RightMark v={P} a={R2} b={J} r={10} />
          <text x={P[0] + 6} y={(P[1] + J[1]) / 2} fontSize="11" fontWeight="bold" fill={lblColor(h)} dominantBaseline="middle">
            {h}
          </text>
        </g>
      )}
      {r1 && <AngleMark v={R1} a={R2} b={J} label={r1} r={28} />}
      {r2Dep && <AngleMark v={R2} a={[R2[0] + 20, y0]} b={J} label={r2Dep} r={18} color="#16a34a" />}
      {r2In && <AngleMark v={R2} a={R1} b={J} label={r2In} r={14} />}
      {jIn && <AngleMark v={J} a={R1} b={R2} label={jIn} r={30} />}
      {jAlt && <AngleMark v={J} a={[J[0] - 20, J[1]]} b={R1} label={jAlt} r={30} color="#16a34a" />}
      <SideLabel p={R1} q={R2} away={[R1[0], 200]} text={dist} off={9} />
      {d && <SideLabel p={R1} q={J} away={g} text={d} />}
      {e && <SideLabel p={R2} q={J} away={g} text={e} off={8} />}
      <text x={R1[0]} y={y0 - 9} fontSize="12" fontWeight="bold" fill="#1e293b" textAnchor="middle">R₁</text>
      <text x={R2[0]} y={y0 - 9} fontSize="12" fontWeight="bold" fill="#1e293b" textAnchor="middle">R₂</text>
      {h && <text x={P[0]} y={y0 - 9} fontSize="12" fontWeight="bold" fill="#1e293b" textAnchor="middle">P</text>}
      <text x={J[0]} y={J[1] + 13} fontSize="12" fontWeight="bold" fill="#1e293b" textAnchor="middle">J</text>
    </svg>
  );
};

/** Pisai torony: 4°-os dőlés délre (balra), 77°-os napsugarak, 9 m-es árnyék. */
const PisaFig: React.FC = () => {
  const T: Pt = [130, 128];
  const top: Pt = [130 - 108 * Math.sin(4 * RAD), 128 - 108 * Math.cos(4 * RAD)];
  const S: Pt = [top[0] + (T[1] - top[1]) / Math.tan(77 * RAD), 128];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="20" y1="128" x2="225" y2="128" stroke="#a16207" strokeWidth="2" />
      <line x1={T[0]} y1={T[1]} x2={T[0]} y2={top[1]} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1={T[0]} y1={T[1]} x2={top[0]} y2={top[1]} stroke={INK} strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <line x1={top[0]} y1={top[1]} x2={S[0]} y2={S[1]} stroke="#f59e0b" strokeWidth="1.8" />
      <line x1={T[0]} y1="128" x2={S[0]} y2="128" stroke="#1e293b" strokeWidth="4" />
      <line x1={top[0] - 4} y1={top[1] - 4 * Math.tan(77 * RAD)} x2={top[0]} y2={top[1]} stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="3 2" />
      <AngleMark v={S} a={T} b={top} r={14} color="#d97706" />
      <text x={S[0] + 5} y={S[1] - 16} fontSize="11" fontWeight="bold" fill="#d97706">77°</text>
      <AngleMark v={T} a={[T[0], top[1]]} b={top} r={40} color="#16a34a" />
      <text x={T[0] - 8} y={T[1] - 42} fontSize="11" fontWeight="bold" fill="#16a34a" textAnchor="end">4°</text>
      <text x={(T[0] + S[0]) / 2} y="142" fontSize="11" fontWeight="bold" fill="#0f172a" textAnchor="middle">9 m</text>
      <text x={top[0] - 10} y="58" fontSize="11" fontWeight="bold" fill="#dc2626" textAnchor="end">L = ?</text>
      <text x="22" y="20" fontSize="10" fill="#64748b">← dél (Nap)</text>
      <text x="218" y="20" fontSize="10" fill="#64748b" textAnchor="end">észak →</text>
    </svg>
  );
};

/** Kráter: 31 m-es, 25°-os lejtő; a radar a kráter aljáról függőlegesen felemelve, a perem 22°-ban látszik. */
const CraterFig: React.FC = () => {
  const O: Pt = [44, 126];
  const R: Pt = [44 + 160 * Math.cos(25 * RAD), 126 - 160 * Math.sin(25 * RAD)];
  const D: Pt = [44, 126 - 12];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1="14" y1="126" x2="120" y2="126" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1={D[0]} y1={D[1]} x2="150" y2={D[1]} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1={O[0]} y1={O[1]} x2={R[0]} y2={R[1]} stroke="#a16207" strokeWidth="2.5" />
      <line x1={O[0]} y1={O[1]} x2={D[0]} y2={D[1]} stroke="#dc2626" strokeWidth="2.5" />
      <line x1={D[0]} y1={D[1]} x2={R[0]} y2={R[1]} stroke="#2563eb" strokeWidth="1.6" strokeDasharray="5 3" />
      <circle cx={D[0]} cy={D[1]} r="3" fill="#2563eb" />
      <AngleMark v={O} a={[O[0] + 20, O[1]]} b={R} label="25°" r={34} color="#a16207" />
      <AngleMark v={D} a={[D[0] + 20, D[1]]} b={R} label="22°" r={64} color="#2563eb" />
      <text x={(O[0] + R[0]) / 2 + 6} y={(O[1] + R[1]) / 2 + 14} fontSize="11" fontWeight="bold" fill="#0f172a">31 m</text>
      <text x={O[0] - 6} y={(O[1] + D[1]) / 2 + 2} fontSize="11" fontWeight="bold" fill="#dc2626" textAnchor="end">?</text>
      <text x={D[0] - 6} y={D[1] - 8} fontSize="10" fill="#1e40af" textAnchor="end">radar</text>
      <text x={R[0]} y={R[1] - 8} fontSize="10" fill="#1e293b" textAnchor="middle">perem</text>
    </svg>
  );
};


const SINE_LAW_APPLICATIONS_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Fogalmak, esetek (1–10)
  {
    id: 'sla-q1',
    level: 1,
    questionTypeBadge: 'Depressziószög',
    question: 'Mit nevezünk depressziószögnek (lehajlási szögnek)?',
    options: [
      'A vízszintes és a lefelé irányuló látóirány által bezárt szöget',
      'A függőleges és a lefelé irányuló látóirány által bezárt szöget',
      'A vízszintes és a felfelé irányuló látóirány által bezárt szöget',
      'Két egymás utáni látóirány különbségét'
    ],
    correctAnswer: 0,
    explanation: 'A depressziószög a vízszintestől lefelé mért szög. A repülőgépből a jeladót 27°-os, majd 57°-os depressziószög alatt látják.'
  },
  {
    id: 'sla-q2',
    level: 1,
    questionTypeBadge: 'Depressziószög',
    figure: <PlaneFig dep1={27} dep2={57} dist="" r1="27°" r2Dep="57°" r2In="?" />,
    question: 'A repülőgép a második észlelési pontból (R₂) 57°-os depressziószögben látja a jeladót. Mekkora az R₁R₂J háromszög R₂-nél lévő szöge?',
    options: ['123°', '57°', '33°', '147°'],
    correctAnswer: 0,
    explanation: 'A 57°-os depressziószög a menetirány felőli oldalon van, a háromszög belső szöge ennek mellékszöge: 180° − 57° = 123°.'
  },
  {
    id: 'sla-q3',
    level: 1,
    questionTypeBadge: 'Szögösszeg',
    figure: <PlaneFig dep1={27} dep2={57} dist="" r1="27°" r2In="123°" jIn="?" />,
    question: 'Az R₁R₂J háromszögben R₁-nél 27°, R₂-nél 123° van. Mekkora a J-nél lévő szög?',
    options: ['30°', '84°', '27°', '57°'],
    correctAnswer: 0,
    explanation: '180° − 27° − 123° = 30°. (Ez éppen a két depressziószög különbsége: 57° − 27°.)'
  },
  {
    id: 'sla-q4',
    level: 1,
    questionTypeBadge: 'Megoldások száma',
    question: 'A szinusztétellel azt kaptuk, hogy sin β > 1. Mit jelent ez?',
    options: ['Nincs a feltételeknek megfelelő háromszög', 'β = 90°', 'β tompaszög', 'Két megoldás van'],
    correctAnswer: 0,
    explanation: 'A szinusz értéke nem lehet 1-nél nagyobb, ezért ilyen β szög – és ilyen háromszög – nem létezik.'
  },
  {
    id: 'sla-q5',
    level: 1,
    questionTypeBadge: 'Megoldások száma',
    question: 'A szinusztétellel azt kaptuk, hogy sin β = 1. Hány háromszög felel meg az adatoknak?',
    options: ['Egy, és az derékszögű (β = 90°)', 'Kettő', 'Egy sem', 'Végtelen sok'],
    correctAnswer: 0,
    explanation: 'sin β = 1 csak β = 90° esetén teljesül; 180° − 90° = 90°, így nincs második megoldás.'
  },
  {
    id: 'sla-q6',
    level: 1,
    questionTypeBadge: 'Két szögjelölt',
    question: 'sin β ≈ 0,9428. Mely szögek jöhetnek szóba β-ra?',
    options: ['≈ 70,53° vagy ≈ 109,47°', 'Csak ≈ 70,53°', '≈ 70,53° vagy ≈ 19,47°', '≈ 70,53° vagy ≈ 250,53°'],
    correctAnswer: 0,
    explanation: 'A sin⁻¹ a 70,53°-os hegyesszöget adja, de a kiegészítő szöge, 180° − 70,53° = 109,47° szinusza is ugyanennyi.'
  },
  {
    id: 'sla-q7',
    level: 1,
    questionTypeBadge: 'Megoldások száma',
    question: 'Két oldal és az egyikkel szemközti szög adott. Ha az adott szög a NAGYOBB oldallal szemközti, hány megoldás lehet?',
    options: ['Legfeljebb egy (a keresett szög csak hegyesszög)', 'Mindig kettő', 'Mindig nulla', 'Mindig pontosan kettő, egy hegyes- és egy tompaszögű'],
    correctAnswer: 0,
    explanation: 'Nagyobb oldallal szemben nagyobb szög van, ezért a kisebb oldallal szemközti keresett szög kisebb az adottnál – így nem lehet tompaszög.'
  },
  {
    id: 'sla-q8',
    level: 1,
    questionTypeBadge: 'Két szögjelölt',
    question: 'Melyik feltételt kell ellenőrizni, amikor a tompaszögű β jelöltet vizsgáljuk (α adott)?',
    options: ['α + β < 180°', 'β < 90°', 'α + β = 90°', 'a > b'],
    correctAnswer: 0,
    explanation: 'A háromszög szögeinek összege 180°, ezért a harmadik szög csak akkor pozitív, ha α + β < 180°.'
  },
  {
    id: 'sla-q9',
    level: 1,
    questionTypeBadge: 'Szerkesztés',
    question: 'A szerkesztésnél a C középpontú, b sugarú kör éppen érinti a β szög másik szárát. Hány háromszög szerkeszthető?',
    options: ['Egy, és az derékszögű', 'Kettő', 'Egy sem', 'Egy tompaszögű'],
    correctAnswer: 0,
    explanation: 'Egyetlen közös pont van; a háromszög derékszögű, mert az érintő merőleges az érintési pontba húzott sugárra.'
  },
  {
    id: 'sla-q10',
    level: 1,
    questionTypeBadge: 'Megoldások száma',
    question: 'a = 10 cm, β = 30°, b = 4 cm. Hány háromszög szerkeszthető ezekből az adatokból?',
    options: ['Egy sem', 'Egy', 'Kettő', 'Három'],
    correctAnswer: 0,
    explanation: 'sin α = a · sin β / b = 10 · 0,5 / 4 = 1,25 > 1. A kör nem metszi a szög szárát.'
  },

  // LEVEL 2: Számolás (11–20)
  {
    id: 'sla-q11',
    level: 2,
    questionTypeBadge: 'Szinusztétel',
    figure: <PlaneFig dep1={27} dep2={57} dist="3000 m" r1="27°" r2In="123°" jIn="30°" d="d = ?" />,
    question: 'A repülőgép 3000 m-t repült, az R₁R₂J háromszög szögei 27° (R₁), 123° (R₂), 30° (J). Milyen messze volt a gép a jeladótól az első észleléskor (d = R₁J)?',
    options: ['≈ 5030 m', '≈ 2720 m', '≈ 1790 m', '≈ 5540 m'],
    correctAnswer: 0,
    explanation: 'd a 123°-os szöggel szemközti oldal: d = 3000 · sin 123° / sin 30° ≈ 5030 m.'
  },
  {
    id: 'sla-q12',
    level: 2,
    questionTypeBadge: 'Szinusztétel',
    figure: <PlaneFig dep1={27} dep2={57} dist="3000 m" r1="27°" r2In="123°" jIn="30°" e="e = ?" />,
    question: 'Ugyanebben a háromszögben milyen messze volt a gép a második észleléskor (e = R₂J)?',
    options: ['≈ 2720 m', '≈ 5030 m', '≈ 3300 m', '≈ 1360 m'],
    correctAnswer: 0,
    explanation: 'e a 27°-os szöggel szemközti: e = 3000 · sin 27° / sin 30° ≈ 2720 m.'
  },
  {
    id: 'sla-q13',
    level: 2,
    questionTypeBadge: 'Repülési magasság',
    figure: <PlaneFig dep1={27} dep2={57} dist="" jAlt="27°" d="d ≈ 5030 m" h="h = ?" />,
    question: 'd ≈ 5030 m és a jeladónál fekvő szög (váltószög) 27°. Milyen magasan repül a gép?',
    options: ['≈ 2280 m', '≈ 4480 m', '≈ 1240 m', '≈ 4220 m'],
    correctAnswer: 0,
    explanation: 'Az R₁PJ derékszögű háromszögben h = d · sin 27° ≈ 5030 · 0,454 ≈ 2280 m. (Ellenőrzés: e · sin 57° is ≈ 2280 m.)'
  },
  {
    id: 'sla-q14',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TriFig pts={triByAngles(73, 52)} v={['hajó', '', '']} ang={[undefined, '73°', '52°']} s={['120 m']} alt="x = ?" />,
    question: 'A parton kimért 120 m-es szakasz két végén α ≈ 73° és β ≈ 52°. Milyen messze van a hajó a parttól?',
    options: ['≈ 110,4 m', '≈ 115,4 m', '≈ 140,1 m', '≈ 91,0 m'],
    correctAnswer: 0,
    explanation: 'A hajónál 55°. Az α csúcsától a hajóig: 120 · sin 52° / sin 55° ≈ 115,4 m; x = 115,4 · sin 73° ≈ 110,4 m.'
  },
  {
    id: 'sla-q15',
    level: 2,
    questionTypeBadge: 'Szögösszeg',
    figure: <TriFig pts={triByAngles(45, 70.53, 30, 172)} v={['C', 'A', 'B']} ang={['γ = ?', '45°', '≈ 70,53°']} s={[undefined, 'a = 4,5 cm', 'b = 6 cm']} />,
    question: 'a = 4,5 cm, b = 6 cm, α = 45°. A hegyesszögű megoldásban β ≈ 70,53°. Mekkora a harmadik szög?',
    options: ['≈ 64,47°', '≈ 25,53°', '≈ 70,53°', '90°'],
    correctAnswer: 0,
    explanation: 'γ = 180° − (45° + 70,53°) ≈ 64,47°. (A 25,53° a tompaszögű megoldás harmadik szöge.)'
  },
  {
    id: 'sla-q16',
    level: 2,
    questionTypeBadge: 'Megoldások száma',
    question: 'Van-e olyan háromszög, amelyben a = 2 cm, b = 7 cm és α = 68°?',
    options: ['Nincs, mert sin β ≈ 3,24 > 1', 'Van, egy', 'Van, kettő', 'Van, egy derékszögű'],
    correctAnswer: 0,
    explanation: 'sin β = 7 · sin 68° / 2 ≈ 3,24. A szinusz nem lehet 1-nél nagyobb, így nincs ilyen háromszög.'
  },
  {
    id: 'sla-q17',
    level: 2,
    questionTypeBadge: 'Két szögjelölt',
    question: 'a = 8 cm, b = 7 cm, α = 68°. Hány háromszög van, és mekkorák a szögei?',
    options: ['Egy: 68°, 54,2°, 57,8°', 'Kettő: β ≈ 54,2° vagy β ≈ 125,8°', 'Egy sem', 'Egy: 68°, 125,8°, −13,8°'],
    correctAnswer: 0,
    explanation: 'sin β ≈ 0,811 ⇒ β ≈ 54,2° vagy 125,8°. De 68° + 125,8° > 180°, ezért csak a β ≈ 54,2° jó, γ ≈ 57,8°.'
  },
  {
    id: 'sla-q18',
    level: 2,
    questionTypeBadge: 'Derékszögű eset',
    question: 'Van-e olyan háromszög, amelyben a = 5 cm, b = 10 cm és α = 30°?',
    options: ['Egy: β = 90°, γ = 60° (derékszögű)', 'Kettő', 'Nincs', 'Egy: β = 30°, γ = 120°'],
    correctAnswer: 0,
    explanation: 'sin β = 10 · sin 30° / 5 = 1 ⇒ β = 90°, γ = 60°. Egyetlen, derékszögű háromszög.'
  },
  {
    id: 'sla-q19',
    level: 2,
    questionTypeBadge: 'Hegymagasság',
    figure: <TriFig pts={triByAngles(74, 51)} v={['H', 'A', 'B']} ang={[undefined, '74°', '51°']} s={['223 m', 'BH = ?']} />,
    question: 'A hegymagasság-mérésnél AB = 223 m, α = 74° (A-nál), β = 51° (B-nél). Mekkora a BH távolság?',
    options: ['≈ 261,7 m', '≈ 211,6 m', '≈ 190,0 m', '≈ 275,8 m'],
    correctAnswer: 0,
    explanation: 'H-nál 55°. BH az A-nál lévő 74°-kal szemközti: BH = 223 · sin 74° / sin 55° ≈ 261,7 m. (211,6 m az AH.)'
  },
  {
    id: 'sla-q20',
    level: 2,
    questionTypeBadge: 'Hegymagasság',
    figure: <TriFig pts={triByAngles(11, 90, 30, 190)} v={['H', 'B', 'K']} ang={[undefined, '11°']} right={2} s={[undefined, 'm = ?', '261,7 m']} />,
    question: 'BH ≈ 261,7 m, és a BKH derékszögű háromszög B-nél lévő szöge 11°. Milyen magasan van a hegycsúcs a rét felett?',
    options: ['≈ 50 m', '≈ 42,6 m', '≈ 256,9 m', '≈ 40,4 m'],
    correctAnswer: 0,
    explanation: 'm = BH · sin 11° ≈ 261,7 · 0,1908 ≈ 50 m. (A 256,9 m a koszinusszal számolt vízszintes távolság.)'
  },

  // LEVEL 3: Összetett esetek (21–30)
  {
    id: 'sla-q21',
    level: 3,
    questionTypeBadge: 'Két megoldás',
    question: 'a = 6,5 cm, b = 7 cm, α = 68°. Mely szögekkel létezik háromszög?',
    options: [
      'Két háromszög: 68°, 86,9°, 25,1° és 68°, 93,1°, 18,9°',
      'Csak 68°, 86,9°, 25,1°',
      'Csak 68°, 93,1°, 18,9°',
      'Nincs ilyen háromszög'
    ],
    correctAnswer: 0,
    explanation: 'sin β ≈ 0,9985 ⇒ β ≈ 86,9° vagy 93,1°. Mindkettővel 68° + β < 180°, tehát két megoldás van.'
  },
  {
    id: 'sla-q22',
    level: 3,
    questionTypeBadge: 'Két megoldás',
    question: 'a = 6 cm, b = 7,5 cm, α = 30°. Hány háromszög van?',
    options: [
      'Kettő: β ≈ 38,7°, γ ≈ 111,3° vagy β ≈ 141,3°, γ ≈ 8,7°',
      'Egy: β ≈ 38,7°, γ ≈ 111,3°',
      'Egy sem',
      'Egy derékszögű'
    ],
    correctAnswer: 0,
    explanation: 'sin β = 7,5 · 0,5 / 6 = 0,625 ⇒ β ≈ 38,7° vagy 141,3°; 30° + 141,3° < 180°, tehát mindkettő jó.'
  },
  {
    id: 'sla-q23',
    level: 3,
    questionTypeBadge: 'Egy megoldás',
    question: 'a = 6 cm, b = 4,5 cm, α = 45°. Hány háromszög van?',
    options: ['Egy: β ≈ 32,0°, γ ≈ 103,0°', 'Kettő: β ≈ 32,0° vagy β ≈ 148,0°', 'Egy sem', 'Egy: β ≈ 148,0°, γ ≈ −13,0°'],
    correctAnswer: 0,
    explanation: 'sin β = 4,5 · sin 45° / 6 ≈ 0,530 ⇒ β ≈ 32,0° vagy 148,0°; de 45° + 148,0° > 180°. Az adott szög a nagyobb oldallal szemközti, így egy megoldás van.'
  },
  {
    id: 'sla-q24',
    level: 3,
    questionTypeBadge: 'Nincs megoldás',
    question: 'a = 6 cm, b = 7,5 cm, α = 65°. Hány háromszög van?',
    options: ['Egy sem, mert sin β ≈ 1,133', 'Egy', 'Kettő', 'Egy derékszögű'],
    correctAnswer: 0,
    explanation: 'sin β = 7,5 · sin 65° / 6 ≈ 1,133 > 1 – nincs ilyen háromszög.'
  },
  {
    id: 'sla-q25',
    level: 3,
    questionTypeBadge: 'Tompaszögű megoldás',
    question: 'a = 10 cm, β = 30°, b = 6 cm. sin α = 5/6. Mekkorák a szögei annak a megoldásnak, amelyben α tompaszög?',
    options: ['α ≈ 123,56°, γ ≈ 26,44°', 'α ≈ 56,44°, γ ≈ 93,56°', 'α ≈ 123,56°, γ ≈ 56,44°', 'Nincs tompaszögű megoldás'],
    correctAnswer: 0,
    explanation: 'α₁ ≈ 56,44°, α₂ ≈ 180° − 56,44° = 123,56°; ekkor γ = 180° − 30° − 123,56° ≈ 26,44°. (Az α₁ ≈ 56,44°-os megoldásban γ ≈ 93,56°.)'
  },
  {
    id: 'sla-q26',
    level: 3,
    questionTypeBadge: 'Pisai torony',
    figure: <PisaFig />,
    question: 'A pisai torony 4°-kal dől dél felé; a déli, 77°-os napsugarak 9 m-es árnyékot vetnek. Milyen hosszú a torony?',
    options: ['≈ 56 m', '≈ 39 m', '≈ 30 m', '≈ 57,5 m'],
    correctAnswer: 0,
    explanation: 'A háromszög szögei: árnyék végén 77°, a toronytövénél 90° + 4° = 94°, a csúcsnál 9°. L = 9 · sin 77° / sin 9° ≈ 56 m. (A 39 m a dőlés figyelmen kívül hagyásából: 9 · tg 77°.)'
  },
  {
    id: 'sla-q27',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <CraterFig />,
    question: 'Egy kráter lejtője 31 m hosszú, 25°-os. A kráter aljáról függőlegesen felemelt radarból a perem 22°-os szögben látszik. Milyen magasan van a radar?',
    options: ['≈ 1,75 m', '≈ 13,1 m', '≈ 1,62 m', '≈ 30,3 m'],
    correctAnswer: 0,
    explanation: 'Szögek: kráter alja 90° − 25° = 65°, radar 90° + 22° = 112°, perem 3°. A radar magassága a 3°-kal szemközti oldal: 31 · sin 3° / sin 112° ≈ 1,75 m.'
  },
  {
    id: 'sla-q28',
    level: 3,
    questionTypeBadge: 'Tompaszög',
    question: 'Az adott α tompaszög, és a szinusztétel sin β < 1 értéket ad. Hány megoldás lehet?',
    options: [
      'Legfeljebb egy, mert β csak hegyesszög lehet',
      'Mindig kettő',
      'Mindig pontosan egy, tompaszögű β-val',
      'Soha nincs megoldás'
    ],
    correctAnswer: 0,
    explanation: 'Egy háromszögnek legfeljebb egy tompaszöge lehet, így β csak a hegyesszögű jelölt lehet; az is csak akkor jó, ha α + β < 180° (azaz a > b).'
  },
  {
    id: 'sla-q29',
    level: 3,
    questionTypeBadge: 'Tompaszögű megoldás',
    figure: <TriFig pts={triByAngles(45, 109.47)} v={['C', 'A', 'B']} ang={[undefined, '45°', '≈ 109,47°']} s={['c = ?', 'a = 4,5 cm', 'b = 6 cm']} />,
    question: 'a = 4,5 cm, b = 6 cm, α = 45°. Mekkora a harmadik oldal (c) a tompaszögű (β ≈ 109,47°) megoldásban?',
    options: ['≈ 2,74 cm', '≈ 5,74 cm', '6 cm', '≈ 2,06 cm'],
    correctAnswer: 0,
    explanation: 'γ ≈ 25,53°, c = a · sin γ / sin α = 4,5 · sin 25,53° / sin 45° ≈ 2,74 cm. (A hegyesszögű megoldásban c ≈ 5,74 cm.)'
  },
  {
    id: 'sla-q30',
    level: 3,
    questionTypeBadge: 'Repülési magasság',
    figure: <PlaneFig dep1={30} dep2={60} dist="2000 m" r1="30°" r2Dep="60°" h="h = ?" />,
    question: 'Egy gép 2000 m repülés előtt 30°-os, utána 60°-os depressziószögben látja a jeladót. Milyen magasan repül?',
    options: ['≈ 1732 m', '2000 m', '≈ 3464 m', '1000 m'],
    correctAnswer: 0,
    explanation: 'Szögek: 30°, 120°, 30° ⇒ d = 2000 · sin 120° / sin 30° ≈ 3464 m, h = d · sin 30° ≈ 1732 m. (A háromszög egyenlő szárú: e = 2000 m.)'
  }
];

export const SineLawApplicationsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="trigonometria"
      topicId="g11-trig-alkalmazasok-quiz"
      subtopicId="alkalmazasok-szinusztetel"
      title="10. Alkalmazások (szinusztétel) – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: távolság- és magasságmérés, valamint a nulla, egy vagy két megoldás esete."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={SINE_LAW_APPLICATIONS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Hány megoldás? (a, b, α adott)',
          items: [
            'sin β = b · sin α / a',
            'sin β > 1 ⇒ nincs háromszög',
            'sin β = 1 ⇒ β = 90°, egy háromszög',
            'sin β < 1 ⇒ β₁ és 180° − β₁; ellenőrzés: α + β < 180°'
          ]
        },
        {
          title: 'Gyors szabályok',
          items: [
            'a ≥ b (az adott szög a nagyobb oldallal szemközti) ⇒ legfeljebb egy megoldás',
            'a < b és sin β < 1 ⇒ két megoldás',
            'Tompaszög adott ⇒ a másik két szög hegyes',
            'Szerkesztés: C körüli b sugarú kör ∩ szögszár'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Repülő: d ≈ 5030 m, e ≈ 2720 m, h ≈ 2280 m',
            'Hajó (120 m, 73°, 52°): x ≈ 110,4 m',
            'Hegy: BH ≈ 261,7 m, m ≈ 50 m',
            '4,5 / 6 / 45°: β ≈ 70,53° vagy 109,47°'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SineLawApplicationsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SineLawApplicationsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SineLawApplicationsQuiz;
