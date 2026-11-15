import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SineLawMatcher } from './SineLawMatcher';
import { SineLawSorter } from './SineLawSorter';

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


/** Új Híd: a pálya B, P, Q, C pontjai (BC = 200 m). */
const BridgeSegmentsFig: React.FC = () => {
  const k = 0.95;
  const B: Pt = [22, 100];
  const xs = { P: 22 + 51.3 * k, Q: 22 + 121 * k, C: 22 + 200 * k };
  const A: Pt = [22 - 22, 100 - 64];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1={B[0]} y1={B[1]} x2={xs.C} y2={B[1]} stroke={INK} strokeWidth="3" />
      <line x1={B[0]} y1={B[1]} x2={A[0] + 4} y2={A[1]} stroke={INK} strokeWidth="4" />
      {[xs.P, xs.Q, xs.C].map((x, i) => (
        <line key={i} x1={A[0] + 4} y1={A[1]} x2={x} y2={B[1]} stroke="#94a3b8" strokeWidth="1.2" />
      ))}
      {[B[0], xs.P, xs.Q, xs.C].map((x, i) => (
        <g key={`p${i}`}>
          <circle cx={x} cy={B[1]} r="2.6" fill="#1e293b" />
          <text x={x} y={B[1] - 7} fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">{['B', 'P', 'Q', 'C'][i]}</text>
        </g>
      ))}
      <line x1={B[0]} y1="114" x2={xs.P} y2="114" stroke="#16a34a" strokeWidth="1.4" />
      <text x={(B[0] + xs.P) / 2} y="110" fontSize="9.5" fontWeight="bold" fill="#15803d" textAnchor="middle">≈ 51,3 m</text>
      <line x1={xs.P} y1="114" x2={xs.Q} y2="114" stroke="#dc2626" strokeWidth="1.4" />
      <text x={(xs.P + xs.Q) / 2} y="110" fontSize="11" fontWeight="bold" fill="#dc2626" textAnchor="middle">?</text>
      <line x1={B[0]} y1="128" x2={xs.Q} y2="128" stroke="#d97706" strokeWidth="1.4" />
      <text x={(B[0] + xs.Q) / 2} y="138" fontSize="9.5" fontWeight="bold" fill="#b45309" textAnchor="middle">BQ ≈ 121,0 m</text>
      <line x1={B[0]} y1="144" x2={xs.C} y2="144" stroke="#334155" strokeWidth="1.2" />
      <text x={(xs.Q + xs.C) / 2} y="140" fontSize="9.5" fontWeight="bold" fill="#334155" textAnchor="middle">BC = 200 m</text>
    </svg>
  );
};


const SINE_LAW_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A tétel és használata (1–10)
  {
    id: 'sl-q1',
    level: 1,
    questionTypeBadge: 'Szinusztétel',
    question: 'Mit mond ki a szinusztétel (a szokásos jelölésekkel)?',
    options: ['a / b = sin α / sin β', 'a / b = α / β', 'a / b = sin β / sin α', 'a / b = cos α / cos β'],
    correctAnswer: 0,
    explanation: 'A háromszögben két oldal hosszának aránya egyenlő a velük szemben lévő szögek szinuszának arányával: a / b = sin α / sin β.'
  },
  {
    id: 'sl-q2',
    level: 1,
    questionTypeBadge: 'Bizonyítás',
    question: 'Hogyan bizonyítja a tankönyv a szinusztételt?',
    options: [
      'A háromszög területét kétféleképpen felírja a T = ab · sin γ / 2 képlettel',
      'A Pitagorasz-tétellel',
      'Hasonló háromszögek oldalainak arányával',
      'Szögmérővel végzett méréssel'
    ],
    correctAnswer: 0,
    explanation: 'a · c · sin β / 2 = b · c · sin α / 2; 2-vel szorozva és (b · c · sin β)-val osztva kapjuk: a / b = sin α / sin β.'
  },
  {
    id: 'sl-q3',
    level: 1,
    questionTypeBadge: 'Mikor használjuk?',
    question: 'Egy háromszögben ismert két szög és egy oldal. Mivel számolható ki egy másik oldal?',
    options: ['A szinusztétellel', 'Csak a Pitagorasz-tétellel', 'Csak a tangens segítségével', 'Ezekből az adatokból nem számolható ki'],
    correctAnswer: 0,
    explanation: 'Ez a szinusztétel tipikus alkalmazása: a harmadik szög 180°-ra kiegészítéssel adódik, majd a / b = sin α / sin β.'
  },
  {
    id: 'sl-q4',
    level: 1,
    questionTypeBadge: 'Jelölések',
    question: 'A szinusztételben melyik szög tartozik az a oldalhoz?',
    options: ['Az a oldallal szemközti α szög', 'Az a oldal melletti egyik szög', 'Mindig a háromszög legnagyobb szöge', 'Mindig a derékszög'],
    correctAnswer: 0,
    explanation: 'Mindig az oldalt és a vele szemben lévő szöget párosítjuk: a ↔ α, b ↔ β, c ↔ γ.'
  },
  {
    id: 'sl-q5',
    level: 1,
    questionTypeBadge: 'Szögösszeg',
    figure: <TriFig pts={triByAngles(109, 16)} v={['A', 'B', 'C']} ang={['?', '109°', '16°']} s={['200 m']} />,
    question: 'Az Új Híd háromszögében két szög 109° és 16°. Mekkora a harmadik szög?',
    options: ['55°', '65°', '125°', '35°'],
    correctAnswer: 0,
    explanation: '180° − 109° − 16° = 55°.'
  },
  {
    id: 'sl-q6',
    level: 1,
    questionTypeBadge: 'Oldalak és szögek',
    question: 'Egy háromszögben α = β. Mi következik ebből a szinusztétel alapján?',
    options: ['a = b', 'a = 2b', 'a > b', 'Az oldalakról semmi sem mondható'],
    correctAnswer: 0,
    explanation: 'Ha α = β, akkor sin α = sin β, így a / b = 1, vagyis a = b (egyenlő szárú háromszög).'
  },
  {
    id: 'sl-q7',
    level: 1,
    questionTypeBadge: 'Oldalak és szögek',
    question: 'Egy háromszögben α = 30° és β = 60°. Melyik oldal a hosszabb, a vagy b?',
    options: ['b > a', 'a > b', 'a = b', 'Nem dönthető el'],
    correctAnswer: 0,
    explanation: 'a / b = sin 30° / sin 60° = 0,5 / 0,866 < 1, tehát b > a. (Nagyobb szöggel szemben nagyobb oldal van.)'
  },
  {
    id: 'sl-q8',
    level: 1,
    questionTypeBadge: 'Oldalarány',
    question: 'Egy háromszögben α = 30° és β = 90°. Mennyi az a / b arány?',
    options: ['1 / 2', '1 / 3', '2', '√3 / 2'],
    correctAnswer: 0,
    explanation: 'a / b = sin 30° / sin 90° = 0,5 / 1 = 1 / 2. (Az 1 / 3 a szögek arányából jönne – ez hibás.)'
  },
  {
    id: 'sl-q9',
    level: 1,
    questionTypeBadge: 'Átrendezés',
    question: 'A bevezető feladatban b · sin 55° = 200 · sin 109°. Hogyan fejezhető ki b?',
    options: ['b = 200 · sin 109° / sin 55°', 'b = 200 · sin 55° / sin 109°', 'b = 200 · sin 109° · sin 55°', 'b = sin 109° / (200 · sin 55°)'],
    correctAnswer: 0,
    explanation: 'Mindkét oldalt sin 55°-kal osztva: b = 200 · sin 109° / sin 55° ≈ 231 m.'
  },
  {
    id: 'sl-q10',
    level: 1,
    questionTypeBadge: 'Szög keresése',
    question: 'Mire kell vigyázni, ha a szinusztétellel SZÖGET keresünk?',
    options: [
      'Egy szinuszérték hegyesszöghöz és tompaszöghöz is tartozhat',
      'A szinusztétellel szöget nem lehet kiszámolni',
      'A kapott szög mindig tompaszög',
      'A szöget radiánban kell megadni'
    ],
    correctAnswer: 0,
    explanation: 'sin β = sin (180° − β), ezért a sin⁻¹ által adott hegyesszög mellett a kiegészítő tompaszög is szóba jöhet.'
  },

  // LEVEL 2: Számolás a szinusztétellel (11–20)
  {
    id: 'sl-q11',
    level: 2,
    questionTypeBadge: 'Szinusztétel',
    figure: <TriFig pts={triByAngles(109, 16)} v={['A', 'B', 'C']} ang={['55°', '109°', '16°']} s={['a = 200 m', 'b = ?']} />,
    question: 'Az Új Híd háromszögében a = 200 m, a vele szemközti szög 55°, a b kábellel szemközti szög (a pillér lábánál) 109°. Milyen hosszú a b kábel?',
    options: ['≈ 231 m', '≈ 173 m', '≈ 396 m', '≈ 67 m'],
    correctAnswer: 0,
    explanation: 'b = 200 · sin 109° / sin 55° ≈ 230,9 m. (A 173 m a szinuszok felcseréléséből, a 396 m a szögek arányából adódna.)'
  },
  {
    id: 'sl-q12',
    level: 2,
    questionTypeBadge: 'Szinusztétel',
    figure: <TriFig pts={triByAngles(109, 16)} v={['A', 'B', 'C']} ang={['55°', '109°', '16°']} s={['a = 200 m', undefined, 'c = ?']} />,
    question: 'Ugyanebben a háromszögben milyen hosszú a c pillérszakasz (szemközti szöge 16°)?',
    options: ['≈ 67,3 m', '≈ 594 m', '≈ 58,3 m', '≈ 231 m'],
    correctAnswer: 0,
    explanation: 'c / 200 = sin 16° / sin 55° ⇒ c = 200 · sin 16° / sin 55° ≈ 67,3 m. (A 200 m-es oldallal a 55°-os szög van szemben!)'
  },
  {
    id: 'sl-q13',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TriFig pts={triByAngles(74, 52)} v={['hajó', '', '']} ang={[undefined, '74°', '52°']} s={['100 m']} alt="?" />,
    question: 'A parton kimért 100 m-es szakasz két végéből a hajó α ≈ 74° és β ≈ 52° alatt látszik. Milyen messze van a hajó a parttól?',
    options: ['≈ 93,6 m', '≈ 97,4 m', '≈ 118,8 m', '≈ 76,8 m'],
    correctAnswer: 0,
    explanation: 'A hajónál 54° van. Az α csúcsától a hajóig: 100 · sin 52° / sin 54° ≈ 97,4 m, a távolság: 97,4 · sin 74° ≈ 93,6 m. (A 97,4 m és 118,8 m csak a háromszög oldalai.)'
  },
  {
    id: 'sl-q14',
    level: 2,
    questionTypeBadge: 'Oldalösszeg',
    figure: <TriFig pts={triByAngles(67, 48)} v={['C', 'A', 'B']} ang={[undefined, '67°', '48°']} s={[undefined, 'a = ?', 'b']} center="a + b = 20 cm" />,
    question: 'Egy háromszögben két oldal összege 20 cm, a velük szemközti szögek 67° és 48°. Mekkora a 67°-kal szemközti oldal?',
    options: ['≈ 11,07 cm', '10 cm', '≈ 11,65 cm', '≈ 8,93 cm'],
    correctAnswer: 0,
    explanation: 'a / b = sin 67° / sin 48° és a + b = 20 ⇒ a = 20 · sin 67° / (sin 67° + sin 48°) ≈ 11,07 cm. (A 11,65 cm a szögek arányával számolva jönne ki.)'
  },
  {
    id: 'sl-q15',
    level: 2,
    questionTypeBadge: 'Területképlet',
    question: 'Az előző háromszögben a ≈ 11,07 cm, b ≈ 8,93 cm, γ = 65°. Mekkora a területe?',
    options: ['≈ 44,8 cm²', '≈ 89,6 cm²', '≈ 20,9 cm²', '50 cm²'],
    correctAnswer: 0,
    explanation: 'T = a · b · sin γ / 2 ≈ 11,07 · 8,93 · sin 65° / 2 ≈ 44,8 cm².'
  },
  {
    id: 'sl-q16',
    level: 2,
    questionTypeBadge: 'Szinusztétel',
    figure: <TriFig pts={triByAngles(30, 45)} v={['C', 'A', 'B']} ang={[undefined, '30°', '45°']} s={[undefined, 'a = 10 cm', 'b = ?']} />,
    question: 'Egy háromszögben a = 10 cm, α = 30°, β = 45°. Mekkora b?',
    options: ['≈ 14,14 cm', '≈ 7,07 cm', '15 cm', '5 cm'],
    correctAnswer: 0,
    explanation: 'b = a · sin β / sin α = 10 · sin 45° / sin 30° = 10 · 0,7071 / 0,5 ≈ 14,14 cm.'
  },
  {
    id: 'sl-q17',
    level: 2,
    questionTypeBadge: 'Szinusztétel',
    figure: <TriFig pts={triByAngles(40, 60)} v={['C', 'A', 'B']} ang={[undefined, '40°', '60°']} s={['c = ?', 'a = 8 cm']} />,
    question: 'Egy háromszögben a = 8 cm, α = 40°, β = 60°. Mekkora a c oldal?',
    options: ['≈ 12,26 cm', '≈ 10,78 cm', '≈ 5,22 cm', '16 cm'],
    correctAnswer: 0,
    explanation: 'γ = 180° − 40° − 60° = 80°, c = 8 · sin 80° / sin 40° ≈ 12,26 cm. (A 10,78 cm a b oldal.)'
  },
  {
    id: 'sl-q18',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TriFig pts={triByAngles(109, 41)} v={['A', 'B', 'P']} ang={[undefined, '109°', '41°']} s={[undefined, 'e = ?', 'c ≈ 67,3 m']} />,
    question: 'Az Új Hídnál c ≈ 67,3 m a pillér, az ABP háromszög szögei: B-nél 109°, P-nél 41°. Milyen hosszú az e = AP kötél?',
    options: ['≈ 97,0 m', '≈ 46,7 m', '≈ 51,3 m', '≈ 156,4 m'],
    correctAnswer: 0,
    explanation: 'e a 109°-os szöggel van szemben, c a 41°-os szöggel: e = c · sin 109° / sin 41° ≈ 97,0 m. (51,3 m a BP távolság.)'
  },
  {
    id: 'sl-q19',
    level: 2,
    questionTypeBadge: 'Derékszögű háromszög',
    figure: <TriFig pts={triByAngles(30, 90)} ang={['60°', '30°']} right={2} s={[undefined, '?', '10 cm']} />,
    question: 'Egy derékszögű háromszögben az átfogó 10 cm, a hegyesszögek 30° és 60°. Mekkora a 30°-kal szemközti befogó a szinusztétel szerint?',
    options: ['5 cm', '≈ 8,66 cm', '≈ 3,33 cm', '20 cm'],
    correctAnswer: 0,
    explanation: 'a / 10 = sin 30° / sin 90° = 0,5 ⇒ a = 5 cm. A szinusztétel derékszögű háromszögben is működik (sin 90° = 1).'
  },
  {
    id: 'sl-q20',
    level: 2,
    questionTypeBadge: 'Szinusztétel',
    figure: <TriFig pts={triByAngles(45, 30)} ang={['105°', '45°']} s={['?', '6 cm']} />,
    question: 'Egy háromszög két szöge 45° és 105°, a 45°-kal szemközti oldal 6 cm. Mekkora a 105°-kal szemközti oldal?',
    options: ['≈ 8,20 cm', '14 cm', '≈ 4,39 cm', '≈ 4,24 cm'],
    correctAnswer: 0,
    explanation: 'x = 6 · sin 105° / sin 45° ≈ 6 · 0,9659 / 0,7071 ≈ 8,20 cm. (A 4,24 cm a 30°-kal szemközti harmadik oldal.)'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'sl-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TriFig pts={triByAngles(109, 24, 76, 214)} v={['A', 'B', 'Q']} ang={[undefined, '109°', '24°']} s={[undefined, 'd = ?', 'c ≈ 67,3 m']} />,
    question: 'Az Új Hídnál c ≈ 67,3 m, az ABQ háromszög szögei: B-nél 109°, Q-nál 24°. Milyen hosszú a d = AQ kötél?',
    options: ['≈ 156,4 m', '≈ 121,0 m', '≈ 97,0 m', '≈ 29,0 m'],
    correctAnswer: 0,
    explanation: 'd = c · sin 109° / sin 24° ≈ 67,3 · 0,9455 / 0,4067 ≈ 156,4 m. (121,0 m a BQ távolság, 29,0 m a szinuszok felcseréléséből jönne.)'
  },
  {
    id: 'sl-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BridgeSegmentsFig />,
    question: 'Az Új Hídnál BP ≈ 51,3 m és BQ ≈ 121,0 m, BC = 200 m. Mekkora a PQ távolság?',
    options: ['≈ 69,7 m', '≈ 51,3 m', '≈ 79,0 m', '≈ 121,0 m'],
    correctAnswer: 0,
    explanation: 'PQ = BQ − BP ≈ 121,0 − 51,3 = 69,7 m; QC = 200 − 121,0 = 79,0 m.'
  },
  {
    id: 'sl-q23',
    level: 3,
    questionTypeBadge: 'Oldalarány',
    question: 'Egy háromszög szögei 30°, 60° és 90°. Hogyan aránylanak egymáshoz a velük szemközti oldalak?',
    options: ['1 : √3 : 2', '1 : 2 : 3', '1 : √2 : 2', '1 : √3 : 3'],
    correctAnswer: 0,
    explanation: 'a : b : c = sin 30° : sin 60° : sin 90° = 0,5 : √3/2 : 1 = 1 : √3 : 2.'
  },
  {
    id: 'sl-q24',
    level: 3,
    questionTypeBadge: 'Területképlet',
    figure: <TriFig pts={triByAngles(50, 60)} v={['A', 'B', 'C']} ang={[undefined, '50°', '60°']} s={['a = 10 cm']} center="T = ?" />,
    question: 'Egy háromszögben a = 10 cm, β = 50°, γ = 60°. Mekkora a területe?',
    options: ['≈ 35,3 cm²', '≈ 70,6 cm²', '≈ 38,3 cm²', '≈ 43,3 cm²'],
    correctAnswer: 0,
    explanation: 'α = 70°, b = 10 · sin 50° / sin 70° ≈ 8,15 cm; a γ szög az a és b oldal közötti szög: T = 10 · 8,15 · sin 60° / 2 ≈ 35,3 cm².'
  },
  {
    id: 'sl-q25',
    level: 3,
    questionTypeBadge: 'Oldalarány',
    question: 'Egy háromszögben a = 2b. Mi következik a szögekre?',
    options: ['sin α = 2 · sin β', 'α = 2β', 'sin β = 2 · sin α', 'α = β + 90°'],
    correctAnswer: 0,
    explanation: 'sin α / sin β = a / b = 2, tehát sin α = 2 sin β. A szögek aránya NEM feltétlenül 2.'
  },
  {
    id: 'sl-q26',
    level: 3,
    questionTypeBadge: 'Szög keresése',
    question: 'Egy háromszögben a = 7 cm, b = 5 cm és β = 30°. Mennyi sin α?',
    options: ['0,7', '≈ 0,357', '1,4', '0,5'],
    correctAnswer: 0,
    explanation: 'sin α / sin β = a / b ⇒ sin α = 7 · sin 30° / 5 = 7 · 0,5 / 5 = 0,7. (α ≈ 44,4° vagy α ≈ 135,6° – ezt a 9. lecke vizsgálja.)'
  },
  {
    id: 'sl-q27',
    level: 3,
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: <TriFig pts={triByAngles(70, 70)} ang={[undefined, '70°', '70°']} s={['10 cm', '?']} />,
    question: 'Egy egyenlő szárú háromszög alapja 10 cm, alapon fekvő szögei 70°-osak. Milyen hosszú a szára?',
    options: ['≈ 14,62 cm', '≈ 6,84 cm', '17,5 cm', '≈ 9,40 cm'],
    correctAnswer: 0,
    explanation: 'A szárszög 180° − 2 · 70° = 40°. A szár a 70°-kal, az alap a 40°-kal szemközti: szár = 10 · sin 70° / sin 40° ≈ 14,62 cm.'
  },
  {
    id: 'sl-q28',
    level: 3,
    questionTypeBadge: 'Bizonyítás',
    question: 'A bizonyításban a · c · sin β / 2 = b · c · sin α / 2. Mivel osztunk a 2-vel való szorzás után, hogy a / b = sin α / sin β adódjon?',
    options: ['b · c · sin β-val', 'a · c · sin α-val', 'c-vel', 'sin α · sin β-val'],
    correctAnswer: 0,
    explanation: 'a · c · sin β = b · c · sin α; ezt (b · c · sin β)-val osztva a / b = sin α / sin β.'
  },
  {
    id: 'sl-q29',
    level: 3,
    questionTypeBadge: 'Hasonlóság',
    question: 'Egy háromszögnek csak a három szögét ismerjük. Mit határoz meg ebből a szinusztétel?',
    options: [
      'Csak az oldalak arányát, a hosszukat nem',
      'Mindhárom oldal hosszát',
      'A háromszög területét',
      'Semmit, mert oldal nélkül nem alkalmazható'
    ],
    correctAnswer: 0,
    explanation: 'a : b : c = sin α : sin β : sin γ, de ugyanezek a szögek végtelen sok (hasonló) háromszöghöz tartoznak. Legalább egy oldal kell a hosszakhoz.'
  },
  {
    id: 'sl-q30',
    level: 3,
    questionTypeBadge: 'Tompaszög',
    figure: <TriFig pts={triByAngles(30, 30)} v={['C', 'A', 'B']} ang={['120°', '30°']} s={['c = 12 cm', 'a = ?']} />,
    question: 'Egy háromszögben c = 12 cm, γ = 120° és α = 30°. Mekkora az a oldal?',
    options: ['≈ 6,93 cm', '≈ 20,78 cm', '3 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'a = c · sin α / sin γ = 12 · 0,5 / 0,866 ≈ 6,93 cm. (β = 30° is, tehát a háromszög egyenlő szárú: a = b.)'
  }
];

export const SineLawQuiz: React.FC<{
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
      topicId="g11-trig-szinusztetel-quiz"
      subtopicId="a-szinusztetel"
      title="9. A szinusztétel – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a szinusztétel kimondása, bizonyítása és alkalmazása oldalak, távolságok kiszámítására."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={SINE_LAW_QUESTIONS}
      cheatSheets={[
        {
          title: 'A szinusztétel',
          items: [
            'a / b = sin α / sin β (oldal ↔ szemközti szög)',
            'a : b : c = sin α : sin β : sin γ',
            'Bizonyítás: a · c · sin β / 2 = b · c · sin α / 2',
            'Nagyobb oldallal szemben nagyobb szög van.'
          ]
        },
        {
          title: 'Mikor használjuk?',
          items: [
            'Két szög + egy oldal ⇒ másik oldal',
            'Két oldal + az egyikkel szemközti szög ⇒ a másikkal szemközti szög',
            'Harmadik szög: 180° − (két ismert szög)',
            'Szögkeresésnél: hegyesszög ÉS tompaszög is lehet!'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Új Híd: b = 200 · sin 109° / sin 55° ≈ 231 m',
            'Pillér: c ≈ 67,3 m; e ≈ 97 m; d ≈ 156 m',
            'Hajó (100 m, 74°, 52°): ≈ 93,6 m a parttól',
            'a + b = 20 cm, 67°, 48° ⇒ a ≈ 11,07; b ≈ 8,93; T ≈ 44,8 cm²'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SineLawMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SineLawSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SineLawQuiz;
