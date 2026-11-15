import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { VectorDecompositionMatcher } from './VectorDecompositionMatcher';
import { VectorDecompositionSorter } from './VectorDecompositionSorter';
import { VDGrid, VDArrow, VDLabel, VDRightAngle } from './VectorDecompositionFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';
const DEG = Math.PI / 180;

/** Derékszögű felbontás: v a vízszintes iránnyal φ szöget zár be; a két összetevő a befogók. */
const RightSplitFig: React.FC<{
  phi: number;
  vText: string;
  hText: string;
  uText: string;
  angleText: string;
  shore?: boolean;
}> = ({ phi, vText, hText, uText, angleText, shore = false }) => {
  const O = { x: 40, y: 130 };
  const L = Math.min(170, 115 / Math.sin(phi * DEG));
  const T = { x: O.x + L * Math.cos(phi * DEG), y: O.y - L * Math.sin(phi * DEG) };
  const F = { x: T.x, y: O.y };
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      {shore && <line x1="10" y1={O.y} x2="230" y2={O.y} stroke="#0369a1" strokeWidth="2" />}
      <VDRightAngle V={F} P={O} Q={T} r={11} />
      <VDArrow x1={O.x} y1={O.y} x2={F.x} y2={F.y} color="#2563eb" width={2.2} dashed />
      <VDArrow x1={F.x} y1={F.y} x2={T.x} y2={T.y} color="#059669" width={2.2} dashed />
      <VDArrow x1={O.x} y1={O.y} x2={T.x} y2={T.y} color="#dc2626" width={2.6} />
      <path
        d={`M ${O.x + 34} ${O.y} A 34 34 0 0 0 ${(O.x + 34 * Math.cos(phi * DEG)).toFixed(1)} ${(O.y - 34 * Math.sin(phi * DEG)).toFixed(1)}`}
        fill="none"
        stroke="#b91c1c"
        strokeWidth="1.3"
      />
      <text x={O.x + 40} y={O.y - 6} fontSize="10" fontWeight="bold" fill="#b91c1c">{angleText}</text>
      <text x={(O.x + T.x) / 2 - 10} y={(O.y + T.y) / 2 - 8} fontSize="11" fontWeight="bold" fill="#b91c1c" textAnchor="end">{vText}</text>
      <text x={(O.x + F.x) / 2 + 10} y={O.y + 14} fontSize="11" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">{hText}</text>
      <text x={F.x + 6} y={(F.y + T.y) / 2 + 4} fontSize="11" fontWeight="bold" fill="#047857">{uText}</text>
    </svg>
  );
};

/** Szabályos hatszög ABCDEF, középpontja O; a = AB, b = AF; opcionálisan egy keresett vektor A-ból. */
const HexFig: React.FC<{ target?: 'O' | 'C' | 'D'; vectors?: boolean }> = ({ target, vectors = true }) => {
  const c = { x: 120, y: 78 };
  const R = 58;
  const ang = [240, 300, 0, 60, 120, 180];
  const names = ['A', 'B', 'C', 'D', 'E', 'F'];
  const P = ang.map((t) => ({ x: c.x + R * Math.cos(t * DEG), y: c.y - R * Math.sin(t * DEG) }));
  const tgt = target === 'O' ? c : target === 'C' ? P[2] : target === 'D' ? P[3] : null;
  return (
    <svg viewBox="0 0 240 155" className={FIG_CLASS}>
      <polygon points={P.map((p) => `${p.x},${p.y}`).join(' ')} fill="rgba(59,130,246,0.08)" stroke="#64748b" strokeWidth="1.5" />
      <circle cx={c.x} cy={c.y} r="2.5" fill="#0f172a" />
      <text x={c.x + 5} y={c.y - 4} fontSize="10" fontWeight="bold" fill="#0f172a">O</text>
      {P.map((p, k) => {
        const dx = p.x - c.x;
        const dy = p.y - c.y;
        const l = Math.hypot(dx, dy);
        return (
          <text key={names[k]} x={p.x + (dx / l) * 11} y={p.y + (dy / l) * 11 + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#0f172a">
            {names[k]}
          </text>
        );
      })}
      {vectors && (
        <g>
          <VDArrow x1={P[0].x} y1={P[0].y} x2={P[1].x} y2={P[1].y} color="#2563eb" width={2.4} />
          <VDArrow x1={P[0].x} y1={P[0].y} x2={P[5].x} y2={P[5].y} color="#059669" width={2.4} />
          <VDLabel x={(P[0].x + P[1].x) / 2} y={P[0].y + 12} text="a" color="#1d4ed8" size={12} />
          <VDLabel x={(P[0].x + P[5].x) / 2 - 10} y={(P[0].y + P[5].y) / 2 + 6} text="b" color="#047857" size={12} />
        </g>
      )}
      {tgt && (
        <g>
          <VDArrow x1={P[0].x} y1={P[0].y} x2={tgt.x} y2={tgt.y} color="#dc2626" width={2.4} dashed />
          <text x={(P[0].x + tgt.x) / 2 + 8} y={(P[0].y + tgt.y) / 2 + 2} fontSize="12" fontWeight="bold" fill="#dc2626">?</text>
        </g>
      )}
    </svg>
  );
};

/** Két fonálon függő tárgy; a fonalak a vízszintessel θ1 (bal) és θ2 (jobb) szöget zárnak be. */
const HangFig: React.FC<{ left: number; right: number; gText: string }> = ({ left, right, gText }) => {
  const K = { x: 120, y: 80 };
  const h = 60;
  const Lp = { x: K.x - h / Math.tan(left * DEG), y: K.y - h };
  const Rp = { x: K.x + h / Math.tan(right * DEG), y: K.y - h };
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1={Math.min(Lp.x, 20) - 5} y1={K.y - h} x2={Math.max(Rp.x, 220) + 5} y2={K.y - h} stroke="#78350f" strokeWidth="3" />
      <line x1={K.x} y1={K.y} x2={Lp.x} y2={Lp.y} stroke="#78350f" strokeWidth="1.6" />
      <line x1={K.x} y1={K.y} x2={Rp.x} y2={Rp.y} stroke="#78350f" strokeWidth="1.6" />
      <text x={Lp.x + 14} y={Lp.y + 16} fontSize="10" fontWeight="bold" fill="#92400e">{left}°</text>
      <text x={Rp.x - 30} y={Rp.y + 14} fontSize="10" fontWeight="bold" fill="#92400e">{right}°</text>
      <rect x={K.x - 9} y={K.y - 3} width="18" height="12" rx="2" fill="#475569" />
      <VDArrow x1={K.x} y1={K.y + 4} x2={K.x} y2={K.y + 62} color="#dc2626" width={2.4} />
      <text x={K.x + 8} y={K.y + 50} fontSize="11" fontWeight="bold" fill="#b91c1c">{gText}</text>
    </svg>
  );
};

/** Lejtő α hajlásszöggel és a rajta álló test súlyerejével. */
const InclineFig: React.FC<{ alphaText: string; gText: string; alpha?: number }> = ({ alphaText, gText, alpha = 30 }) => {
  const B0 = { x: 20, y: 130 };
  const B1 = { x: 220, y: 130 };
  const T = { x: 220, y: 130 - 200 * Math.tan(alpha * DEG) };
  const d = { x: Math.cos(alpha * DEG), y: -Math.sin(alpha * DEG) };
  const C = { x: B0.x + d.x * 120 - Math.sin(alpha * DEG) * 12, y: B0.y + d.y * 120 - Math.cos(alpha * DEG) * 12 };
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <polygon points={`${B0.x},${B0.y} ${B1.x},${B1.y} ${T.x},${T.y}`} fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
      <VDRightAngle V={B1} P={B0} Q={T} r={11} />
      <path d={`M ${B0.x + 34} ${B0.y} A 34 34 0 0 0 ${(B0.x + 34 * d.x).toFixed(1)} ${(B0.y + 34 * d.y).toFixed(1)}`} fill="none" stroke="#b91c1c" strokeWidth="1.3" />
      <text x={B0.x + 40} y={B0.y - 5} fontSize="10" fontWeight="bold" fill="#b91c1c">{alphaText}</text>
      <g transform={`rotate(${-alpha} ${C.x} ${C.y})`}>
        <rect x={C.x - 14} y={C.y - 11} width="28" height="22" rx="3" fill="#fde68a" stroke="#b45309" />
      </g>
      <VDArrow x1={C.x} y1={C.y} x2={C.x} y2={C.y + 50} color="#dc2626" width={2.4} />
      <text x={C.x + 6} y={C.y + 46} fontSize="11" fontWeight="bold" fill="#b91c1c">{gText}</text>
    </svg>
  );
};

/** Paralelogramma: |a| = |b| = 1, a és b szöge 60°, v = 2a + 3b. */
const ParaFig: React.FC = () => {
  const s = 32;
  const O = { x: 30, y: 135 };
  const a = { x: s, y: 0 };
  const b = { x: s * Math.cos(60 * DEG), y: -s * Math.sin(60 * DEG) };
  const A2 = { x: O.x + 2 * a.x, y: O.y };
  const B3 = { x: O.x + 3 * b.x, y: O.y + 3 * b.y };
  const V = { x: A2.x + 3 * b.x, y: A2.y + 3 * b.y };
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <polygon points={`${O.x},${O.y} ${A2.x},${A2.y} ${V.x},${V.y} ${B3.x},${B3.y}`} fill="rgba(250,204,21,0.12)" stroke="#eab308" strokeDasharray="4 3" />
      <VDArrow x1={O.x} y1={O.y} x2={A2.x} y2={A2.y} color="#2563eb" width={2.2} />
      <VDArrow x1={A2.x} y1={A2.y} x2={V.x} y2={V.y} color="#059669" width={2.2} />
      <VDArrow x1={O.x} y1={O.y} x2={V.x} y2={V.y} color="#dc2626" width={2.6} />
      <path d={`M ${O.x + 22} ${O.y} A 22 22 0 0 0 ${(O.x + 22 * Math.cos(60 * DEG)).toFixed(1)} ${(O.y - 22 * Math.sin(60 * DEG)).toFixed(1)}`} fill="none" stroke="#64748b" />
      <line x1={O.x} y1={O.y} x2={B3.x} y2={B3.y} stroke="#94a3b8" strokeDasharray="3 3" />
      <text x={O.x + 24} y={O.y - 12} fontSize="9" fill="#475569">60°</text>
      <VDLabel x={(O.x + A2.x) / 2} y={O.y + 12} text="2a" color="#1d4ed8" size={11} />
      <VDLabel x={(A2.x + V.x) / 2 + 16} y={(A2.y + V.y) / 2} text="3b" color="#047857" size={11} />
      <VDLabel x={(O.x + V.x) / 2 - 14} y={(O.y + V.y) / 2 - 8} text="v" color="#b91c1c" size={12} />
      <text x={(O.x + V.x) / 2 + 6} y={(O.y + V.y) / 2 + 14} fontSize="11" fontWeight="bold" fill="#b91c1c">?</text>
      <text x="150" y="140" fontSize="9" fill="#475569">|→a| = |→b| = 1</text>
    </svg>
  );
};

export const VECTOR_DECOMPOSITION_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'vd-q1',
    level: 1,
    questionTypeBadge: 'Felbontási tétel',
    question: 'Milyen feltétel mellett bontható fel a sík bármely →v vektora egyértelműen →v = m · →a + n · →b alakban?',
    options: ['Ha →a és →b nem párhuzamosak', 'Ha →a és →b egyenlő hosszúak', 'Ha →a és →b párhuzamosak', 'Ha →v hosszabb →a-nál és →b-nél is'],
    correctAnswer: 0,
    explanation: 'A tétel feltétele: →a ∦ →b. Ekkor bármely →v-hez pontosan egy (m; n) számpár tartozik. A hosszaknak nincs szerepük.'
  },
  {
    id: 'vd-q2',
    level: 1,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <VDGrid
        x0={0}
        x1={5}
        y0={0}
        y1={4}
        vectors={[
          { from: [1, 1], to: [2, 1], label: 'a', color: '#1d4ed8', side: -1 },
          { from: [1, 1], to: [1, 2], label: 'b', color: '#047857', side: 1 },
          { from: [1, 1], to: [4, 3], label: 'v', color: '#dc2626', side: 1 }
        ]}
      />
    ),
    question: 'Az ábrán →a egy rácsegység jobbra, →b egy rácsegység felfelé. Ha →v = m · →a + n · →b, mennyi m és n?',
    options: ['m = 3, n = 2', 'm = 2, n = 3', 'm = 3, n = −2', 'm = 5, n = 0'],
    correctAnswer: 0,
    explanation: '→v 3 egységet jobbra és 2-t felfelé mutat, ezért →v = 3→a + 2→b.'
  },
  {
    id: 'vd-q3',
    level: 1,
    questionTypeBadge: 'Katamarán',
    figure: <RightSplitFig phi={30} vText="12 m" hText="→rₚ" uText="→rₘ = ?" angleText="30°" shore />,
    question: 'A katamarán 1 s alatti elmozdulása 12 m, iránya 30°-os szöget zár be a parttal. Mekkora a partra merőleges összetevő (→rₘ) hossza?',
    options: ['6 m', '≈ 10,4 m', '12 m', '3 m'],
    correctAnswer: 0,
    explanation: 'A merőleges összetevő a 30°-os szöggel szemközti befogó: 12 · sin 30° = 6 m (a szabályos háromszög fele).'
  },
  {
    id: 'vd-q4',
    level: 1,
    questionTypeBadge: 'Szerkesztés',
    question: 'A →v vektort az →a és →b irányú összetevőire bontjuk. Mi a →v a megszerkesztett paralelogrammában?',
    options: ['Az egyik átlója', 'Az egyik oldala', 'Az egyik magassága', 'Az egyik középvonala'],
    correctAnswer: 0,
    explanation: 'A paralelogramma oldalvektorai az m · →a és n · →b összetevők, a közös kezdőpontból induló átló pedig maga a →v.'
  },
  {
    id: 'vd-q5',
    level: 1,
    questionTypeBadge: 'Párhuzamos eset',
    question: 'Az →a és →b nem párhuzamos. Ha →v párhuzamos az →a-val, mennyi n a →v = m · →a + n · →b felírásban?',
    options: ['0', '1', '−1', 'Ilyenkor →v nem bontható fel'],
    correctAnswer: 0,
    explanation: '→v = m · →a + 0 · →b: a →b irányú összetevő a nullvektor.'
  },
  {
    id: 'vd-q6',
    level: 1,
    questionTypeBadge: 'Együtthatók',
    question: 'Mit jelent az →u = 2→b + 0→c felírás?',
    options: ['→u a →b kétszerese', '→u a nullvektor', '→u a →b és →c összegének kétszerese', '→u a →c kétszerese'],
    correctAnswer: 0,
    explanation: 'A →c irányú összetevő 0 · →c = →0, így →u = 2→b.'
  },
  {
    id: 'vd-q7',
    level: 1,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <VDGrid
        x0={0}
        x1={7}
        y0={0}
        y1={6}
        cell={20}
        vectors={[
          { from: [1, 1], to: [3, 2], label: 'a', color: '#1d4ed8', side: -1 },
          { from: [1, 1], to: [2, 4], label: 'b', color: '#047857', side: 1 },
          { from: [1, 1], to: [6, 6], label: 'v', color: '#dc2626', side: -1, at: 0.65 }
        ]}
      />
    ),
    question: 'Melyik felírás helyes az ábra vektoraira?',
    options: ['→v = 2→a + →b', '→v = →a + 2→b', '→v = 2→a − →b', '→v = 3→a + →b'],
    correctAnswer: 0,
    explanation: '→a: 2 jobbra, 1 fel; →b: 1 jobbra, 3 fel; →v: 5 jobbra, 5 fel. 2 · 2 + 1 = 5 és 2 · 1 + 3 = 5, tehát →v = 2→a + →b.'
  },
  {
    id: 'vd-q8',
    level: 1,
    questionTypeBadge: 'Negatív együttható',
    question: 'Milyen vektor a −2 · →c?',
    options: ['A →c-vel ellentétes irányú, kétszer olyan hosszú', 'A →c-vel egyirányú, kétszer olyan hosszú', 'A →c-vel ellentétes irányú, fele olyan hosszú', 'A →c-re merőleges, kétszer olyan hosszú'],
    correctAnswer: 0,
    explanation: 'Negatív számmal szorozva az irány megfordul, a hossz |−2| = 2-szeresére változik.'
  },
  {
    id: 'vd-q9',
    level: 1,
    questionTypeBadge: 'Merőleges összetevők',
    figure: <RightSplitFig phi={60} vText="10" hText="?" uText="" angleText="60°" />,
    question: 'Egy 10 egység hosszú vektor 60°-os szöget zár be a vízszintessel. Mekkora a vízszintes összetevője?',
    options: ['5', '≈ 8,66', '10', '6'],
    correctAnswer: 0,
    explanation: 'A vízszintes összetevő a szöggel szomszédos befogó: 10 · cos 60° = 5.'
  },
  {
    id: 'vd-q10',
    level: 1,
    questionTypeBadge: 'Egyértelműség',
    question: 'Az →a és →b nem párhuzamos. Hány (m; n) számpárra teljesül →v = m · →a + n · →b egy adott →v esetén?',
    options: ['Pontosan egyre', 'Pontosan kettőre', 'Végtelen sokra', 'Egyre sem'],
    correctAnswer: 0,
    explanation: 'Nem párhuzamos irányok esetén a felbontás egyértelmű: egyetlen paralelogramma szerkeszthető.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'vd-q11',
    level: 2,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <VDGrid
        x0={0}
        x1={6}
        y0={0}
        y1={5}
        vectors={[
          { from: [1, 2], to: [2, 3], label: 'a', color: '#1d4ed8', side: 1 },
          { from: [1, 2], to: [2, 1], label: 'b', color: '#047857', side: -1 },
          { from: [1, 2], to: [5, 4], label: 'v', color: '#dc2626', side: 1, at: 0.6 }
        ]}
      />
    ),
    question: 'Az ábrán →v = m · →a + n · →b. Mennyi m és n?',
    options: ['m = 3, n = 1', 'm = 1, n = 3', 'm = 2, n = 2', 'm = 4, n = 2'],
    correctAnswer: 0,
    explanation: '→a: 1 jobbra, 1 fel; →b: 1 jobbra, 1 le; →v: 4 jobbra, 2 fel. m + n = 4 és m − n = 2 ⇒ m = 3, n = 1.'
  },
  {
    id: 'vd-q12',
    level: 2,
    questionTypeBadge: 'Fonálon függő test',
    figure: <HangFig left={60} right={30} gText="20 N" />,
    question: 'A 20 N súlyú tárgyat tartó két fonáldarab a vízszintessel 60°-os, illetve 30°-os szöget zár be. Mekkora a súlyerő 60°-os fonállal párhuzamos összetevője?',
    options: ['≈ 17,3 N', '10 N', '20 N', '≈ 11,5 N'],
    correctAnswer: 0,
    explanation: 'A két fonál merőleges egymásra (180° − 60° − 30° = 90°), így a felbontás téglalap: 20 · sin 60° ≈ 17,3 N; a másik összetevő 20 · sin 30° = 10 N.'
  },
  {
    id: 'vd-q13',
    level: 2,
    questionTypeBadge: 'Katamarán',
    question: 'A katamarán másodpercenként 6 m-rel kerül közelebb az 1,2 km-re lévő túlparthoz (a parttal párhuzamos összetevő 10,4 m). Mennyi idő alatt ér át?',
    options: ['200 s', '100 s', '≈ 115 s', '400 s'],
    correctAnswer: 0,
    explanation: 'Az átkelés idejét csak a merőleges összetevő határozza meg: 1200 m : 6 m/s = 200 s. (1200 : 10,4 ≈ 115 s hibás, az a sodródásra vonatkozna.)'
  },
  {
    id: 'vd-q14',
    level: 2,
    questionTypeBadge: 'Mértékegység',
    question: 'A parttal párhuzamos összetevő 10,4 m másodpercenként. Hány km/h sebességgel haladjon a kamerás autó?',
    options: ['≈ 37,4 km/h', '≈ 2,9 km/h', '21,6 km/h', '43,2 km/h'],
    correctAnswer: 0,
    explanation: '10,4 m/s · 3,6 ≈ 37,4 km/h. (6 · 3,6 = 21,6 a merőleges, 12 · 3,6 = 43,2 a teljes elmozdulásból adódna.)'
  },
  {
    id: 'vd-q15',
    level: 2,
    questionTypeBadge: 'Lejtő',
    figure: <InclineFig alphaText="30°" gText="50 N" />,
    question: 'Egy 50 N súlyú test 30°-os lejtőn áll. Mekkora a súlyerő lejtővel párhuzamos összetevője?',
    options: ['25 N', '≈ 43,3 N', '50 N', '≈ 28,9 N'],
    correctAnswer: 0,
    explanation: 'G∥ = G · sin α = 50 · 0,5 = 25 N. (50 · cos 30° ≈ 43,3 N a lejtőre merőleges összetevő.)'
  },
  {
    id: 'vd-q16',
    level: 2,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <VDGrid
        x0={0}
        x1={6}
        y0={0}
        y1={5}
        vectors={[
          { from: [0, 2], to: [1, 4], label: 'a', color: '#1d4ed8', side: 1 },
          { from: [0, 2], to: [2, 1], label: 'b', color: '#047857', side: -1 },
          { from: [0, 2], to: [5, 2], label: 'v', color: '#dc2626', side: 1, at: 0.75 }
        ]}
      />
    ),
    question: 'Az ábrán →v = m · →a + n · →b. Mennyi m és n?',
    options: ['m = 1, n = 2', 'm = 2, n = 1', 'm = 5, n = 0', 'm = 1, n = −2'],
    correctAnswer: 0,
    explanation: '→a: 1 jobbra, 2 fel; →b: 2 jobbra, 1 le; →v: 5 jobbra. m + 2n = 5 és 2m − n = 0 ⇒ n = 2m ⇒ 5m = 5 ⇒ m = 1, n = 2.'
  },
  {
    id: 'vd-q17',
    level: 2,
    questionTypeBadge: 'Nem bontható fel',
    figure: <HexFig vectors={false} />,
    question: 'Az ABCDEF szabályos hatszög középpontja O. Melyik vektorpár irányába NEM bontható fel az →AC vektor?',
    options: ['→AB és →DE', '→AB és →AF', '→AB és →AO', '→AF és →BC'],
    correctAnswer: 0,
    explanation: 'Szabályos hatszögben a szemközti oldalak párhuzamosak: →AB ∥ →DE. Párhuzamos vektorok számszorosainak összege is velük párhuzamos, →AC pedig nem az. A többi párban a két vektor nem párhuzamos (→AO ∥ →BC ∥ →FE).'
  },
  {
    id: 'vd-q18',
    level: 2,
    questionTypeBadge: 'Megrajzolás',
    figure: (
      <VDGrid
        x0={0}
        x1={7}
        y0={0}
        y1={4}
        vectors={[
          { from: [1, 1], to: [4, 1], label: 'u', color: '#1d4ed8', side: -1 },
          { from: [5, 1], to: [5, 3], label: 'v', color: '#047857', side: -1 }
        ]}
      />
    ),
    question: 'Az ábrán →u 3 egység jobbra, →v 2 egység felfelé mutat. Merre mutat a →p = 1/3 · →u + →v vektor?',
    options: ['1 egységet jobbra és 2-t felfelé', '3 egységet jobbra és 2-t felfelé', '1 egységet jobbra és 2/3 egységet felfelé', '9 egységet jobbra és 2-t felfelé'],
    correctAnswer: 0,
    explanation: '1/3 · →u egy egység jobbra mutat, ehhez fűzzük a 2 egység felfelé mutató →v-t (a 1/3 csak →u-ra vonatkozik).'
  },
  {
    id: 'vd-q19',
    level: 2,
    questionTypeBadge: 'Pitagorasz',
    figure: <RightSplitFig phi={67.38} vText="13" hText="5" uText="?" angleText="φ" />,
    question: 'Egy 13 egység hosszú vektort két egymásra merőleges irányú összetevőre bontottunk. Az egyik összetevő hossza 5. Mekkora a másik?',
    options: ['12', '8', '18', '≈ 13,9'],
    correctAnswer: 0,
    explanation: 'Merőleges összetevők a derékszögű háromszög befogói: √(13² − 5²) = √144 = 12. A hosszak nem adódnak össze (13 − 5 = 8 hibás).'
  },
  {
    id: 'vd-q20',
    level: 2,
    questionTypeBadge: 'Szabályos hatszög',
    figure: <HexFig target="O" />,
    question: 'Az ABCDEF szabályos hatszög középpontja O, →a = →AB és →b = →AF. Fejezd ki az →AO vektort!',
    options: ['→AO = →a + →b', '→AO = →a − →b', '→AO = 2→a + →b', '→AO = 1/2 · (→a + →b)'],
    correctAnswer: 0,
    explanation: 'Az ABOF négyszög rombusz (minden oldala a hatszög oldalával egyenlő), ezért →AO az →AB és →AF által kifeszített paralelogramma átlója: →a + →b.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'vd-q21',
    level: 3,
    questionTypeBadge: 'Szabályos hatszög',
    figure: <HexFig target="C" />,
    question: 'Az ABCDEF szabályos hatszögben →a = →AB és →b = →AF. Fejezd ki az →AC vektort!',
    options: ['→AC = 2→a + →b', '→AC = →a + 2→b', '→AC = →a + →b', '→AC = 2→a − →b'],
    correctAnswer: 0,
    explanation: '→AC = →AB + →BC, és →BC = →AO = →a + →b. Így →AC = →a + (→a + →b) = 2→a + →b.'
  },
  {
    id: 'vd-q22',
    level: 3,
    questionTypeBadge: 'Szabályos hatszög',
    figure: <HexFig target="D" />,
    question: 'Az ABCDEF szabályos hatszögben →a = →AB és →b = →AF. Fejezd ki a leghosszabb →AD átlót!',
    options: ['→AD = 2→a + 2→b', '→AD = →a + →b', '→AD = 2→a + →b', '→AD = 3→a + →b'],
    correctAnswer: 0,
    explanation: 'Az AD átló átmegy az O középponton, és O felezi: →AD = 2 · →AO = 2(→a + →b) = 2→a + 2→b.'
  },
  {
    id: 'vd-q23',
    level: 3,
    questionTypeBadge: 'Fonálon függő test',
    figure: <HangFig left={45} right={45} gText="30 N" />,
    question: 'Egy 30 N súlyú tárgyat két fonál tart, mindkettő 45°-os szöget zár be a vízszintessel. Mekkora a súlyerő egy-egy fonállal párhuzamos összetevője?',
    options: ['≈ 21,2 N', '15 N', '30 N', '≈ 42,4 N'],
    correctAnswer: 0,
    explanation: 'A két fonál merőleges (180° − 45° − 45° = 90°), a felbontás négyzet, amelynek átlója 30: oldala 30 · sin 45° = 30 / √2 ≈ 21,2 N. (15 N akkor lenne, ha a hosszak összeadódnának.)'
  },
  {
    id: 'vd-q24',
    level: 3,
    questionTypeBadge: 'Lejtő',
    question: 'Egy 60 N súlyú testre ható súlyerő lejtővel párhuzamos összetevője 30 N. Mekkora a lejtő hajlásszöge?',
    options: ['30°', '60°', '45°', '≈ 26,6°'],
    correctAnswer: 0,
    explanation: 'G∥ = G · sin α ⇒ sin α = 30 / 60 = 0,5 ⇒ α = 30°. (cos α = 0,5 a 60°-ot adná, az a merőleges összetevőre vonatkozna.)'
  },
  {
    id: 'vd-q25',
    level: 3,
    questionTypeBadge: 'Átkelés',
    figure: <RightSplitFig phi={40} vText="10 m" hText="" uText="?" angleText="40°" shore />,
    question: 'Egy csónak másodpercenként 10 m-t mozdul el, iránya 40°-os szöget zár be a parttal. A folyó 900 m széles. Körülbelül mennyi idő alatt ér át?',
    options: ['≈ 140 s', '≈ 117 s', '90 s', '≈ 100 s'],
    correctAnswer: 0,
    explanation: 'A partra merőleges összetevő 10 · sin 40° ≈ 6,43 m, így az idő 900 : 6,43 ≈ 140 s. (900 : (10 · cos 40°) ≈ 117 s a parttal párhuzamos összetevővel számolna.)'
  },
  {
    id: 'vd-q26',
    level: 3,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <VDGrid
        x0={0}
        x1={6}
        y0={0}
        y1={6}
        cell={22}
        vectors={[
          { from: [2, 0], to: [5, 1], label: 'a', color: '#1d4ed8', side: -1 },
          { from: [2, 0], to: [1, 2], label: 'b', color: '#047857', side: 1 },
          { from: [2, 0], to: [3, 5], label: 'v', color: '#dc2626', side: -1, at: 0.65 }
        ]}
      />
    ),
    question: 'Az ábrán →v = m · →a + n · →b. Mennyi m és n?',
    options: ['m = 1, n = 2', 'm = 2, n = 1', 'm = −1, n = 2', 'm = 1, n = −2'],
    correctAnswer: 0,
    explanation: '→a: 3 jobbra, 1 fel; →b: 1 balra, 2 fel; →v: 1 jobbra, 5 fel. 3m − n = 1 és m + 2n = 5 ⇒ n = 3m − 1 ⇒ 7m − 2 = 5 ⇒ m = 1, n = 2.'
  },
  {
    id: 'vd-q27',
    level: 3,
    questionTypeBadge: 'Tört együttható',
    figure: (
      <VDGrid
        x0={0}
        x1={6}
        y0={0}
        y1={5}
        vectors={[
          { from: [1, 1], to: [3, 1], label: 'a', color: '#1d4ed8', side: -1 },
          { from: [1, 1], to: [2, 3], label: 'b', color: '#047857', side: 1 },
          { from: [1, 1], to: [5, 4], label: 'v', color: '#dc2626', side: -1, at: 0.6 }
        ]}
      />
    ),
    question: 'Az ábrán →v = m · →a + n · →b. Mennyi m és n?',
    options: ['m = 1,25, n = 1,5', 'm = 1,5, n = 1,25', 'm = 2, n = 1,5', 'm = 1,25, n = 3'],
    correctAnswer: 0,
    explanation: '→a: 2 jobbra; →b: 1 jobbra, 2 fel; →v: 4 jobbra, 3 fel. A függőleges irányból 2n = 3 ⇒ n = 1,5; a vízszintesből 2m + 1,5 = 4 ⇒ m = 1,25.'
  },
  {
    id: 'vd-q28',
    level: 3,
    questionTypeBadge: 'Igaz / hamis',
    question: 'Melyik állítás HAMIS?',
    options: [
      'Ha →a ∥ →b, akkor a sík bármely vektora felbontható →a és →b irányú összetevőkre',
      'A nullvektor felbontása: →0 = 0 · →a + 0 · →b',
      'Nem párhuzamos →a és →b esetén a felbontás egyértelmű',
      'Merőleges irányok esetén az összetevők a felbontandó vektorral derékszögű háromszöget alkotnak'
    ],
    correctAnswer: 0,
    explanation: 'Párhuzamos →a és →b esetén m · →a + n · →b mindig velük párhuzamos, így egy rájuk nem párhuzamos vektor nem bontható fel. A többi állítás igaz.'
  },
  {
    id: 'vd-q29',
    level: 3,
    questionTypeBadge: 'Merőleges összetevők',
    figure: <RightSplitFig phi={25} vText="8" hText="" uText="?" angleText="25°" />,
    question: 'Egy 8 egység hosszú vektor az egyik iránnyal 25°-os szöget zár be. Mekkora a rá merőleges irányú összetevő hossza?',
    options: ['≈ 3,38', '≈ 7,25', '4', '≈ 3,73'],
    correctAnswer: 0,
    explanation: 'A szöggel szemközti befogó: 8 · sin 25° ≈ 3,38. (8 · cos 25° ≈ 7,25 a másik összetevő; 8 · tg 25° ≈ 3,73 hibás.)'
  },
  {
    id: 'vd-q30',
    level: 3,
    questionTypeBadge: 'Koszinusztétel',
    figure: <ParaFig />,
    question: 'Az →a és →b egységvektorok 60°-os szöget zárnak be. Milyen hosszú a →v = 2→a + 3→b vektor?',
    options: ['√19 ≈ 4,36', '5', '√7 ≈ 2,65', '√13 ≈ 3,61'],
    correctAnswer: 0,
    explanation: 'A 2→a és 3→b által alkotott háromszögben a →v-vel szemközti szög 180° − 60° = 120°: |→v|² = 4 + 9 − 2 · 2 · 3 · cos 120° = 13 + 6 = 19, |→v| = √19 ≈ 4,36.'
  }
];

export const VectorDecompositionQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId="g11-geo-vektor-felbontas-quiz"
      subtopicId="vektor-felbontasa-osszetevokre"
      title="4. Ráadás – Vektor felbontása összetevőkre – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: felbontás négyzetrácson, katamarán, fonálon függő test, lejtő, szabályos hatszög."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={VECTOR_DECOMPOSITION_QUESTIONS}
      cheatSheets={[
        {
          title: 'A felbontás tétele',
          items: [
            '→a ∦ →b ⇒ →v = m · →a + n · →b egyértelműen.',
            'Az összetevők: m · →a és n · →b (paralelogramma oldalai).',
            '→v a paralelogramma átlója.',
            '→v ∥ →a ⇒ n = 0; →v = →0 ⇒ m = n = 0.'
          ]
        },
        {
          title: 'Merőleges összetevők',
          items: [
            'A φ szöggel szomszédos összetevő: |→v| · cos φ.',
            'A szemközti összetevő: |→v| · sin φ.',
            'Lejtő: G∥ = G · sin α, G⊥ = G · cos α.',
            'A hosszak nem adódnak össze: |→v|² = összetevők négyzetösszege.'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Katamarán: 12 m, 30° ⇒ 6 m és 6√3 ≈ 10,4 m.',
            'Átkelés: 1200 : 6 = 200 s; autó: ≈ 37,4 km/h.',
            '20 N, fonalak 60° és 30° ⇒ ≈ 17,3 N és 10 N.',
            'Hatszög: →AO = →a + →b, →AC = 2→a + →b, →AD = 2→a + 2→b.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <VectorDecompositionMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <VectorDecompositionSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default VectorDecompositionQuiz;
