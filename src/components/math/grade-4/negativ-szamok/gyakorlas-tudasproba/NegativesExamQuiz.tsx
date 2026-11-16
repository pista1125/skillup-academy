import React from 'react';
import { QuizTemplate, QuizQuestion, DifficultyLevel } from '../QuizTemplate';
import { NegativesExamMatcher } from './NegativesExamMatcher';
import { NegativesExamSorter } from './NegativesExamSorter';
import { fmtNum } from './NegativesExamFigures';
import { ThermoGroup, DayGraphSvg } from '../negativ-szamok-a-mindennapokban/NegativesEverydayFigures';
import { NumberLineGroup, NLPoint, DiversSvg } from '../szamegyenes-es-ellentettek/NumberLineOppositesFigures';
import { WalletGroup, TempChangeSvg } from '../osszehasonlitas-es-valtozasok/NegativeChangesFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';
const FONT = 'system-ui, sans-serif';

const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 150, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const QThermo: React.FC<{ value: number; min?: number; max?: number; labelEvery?: number; note?: string; note2?: string }> = ({
  value,
  min = -10,
  max = 10,
  labelEvery = 10,
  note = '? °C',
  note2
}) => (
  <QFig h={200}>
    <ThermoGroup x={70} y={24} h={130} min={min} max={max} value={value} labelEvery={labelEvery} color={value < 0 ? '#3b82f6' : '#ef4444'} />
    <text x="160" y={note2 ? 90 : 105} textAnchor="middle" fontSize="16" fontWeight="bold" fill={C_UNK}>{note}</text>
    {note2 && (
      <text x="160" y="118" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{note2}</text>
    )}
  </QFig>
);

const QLine: React.FC<{ min: number; max: number; tick?: number; labels?: number[]; points?: NLPoint[]; note?: string }> = ({
  min,
  max,
  tick = 1,
  labels,
  points,
  note
}) => (
  <QFig h={note ? 100 : 80} w={280}>
    <NumberLineGroup x0={18} x1={250} y={48} min={min} max={max} tick={tick} labels={labels} points={points} fontSize={8} />
    {note && (
      <text x="140" y="90" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{note}</text>
    )}
  </QFig>
);

const QWallet: React.FC<{ cash: number; debt: number }> = ({ cash, debt }) => (
  <QFig h={150} w={260}>
    <circle cx="20" cy="18" r="6" fill="#ef4444" />
    <text x="30" y="22" fontSize="10" fill="#0f172a">1 fabatka</text>
    <rect x="130" y="12" width="12" height="12" fill="#2563eb" />
    <text x="148" y="22" fontSize="10" fill="#0f172a">1 adósság</text>
    <WalletGroup x={30} y={36} cash={cash} debt={debt} w={200} h={86} />
    <text x="130" y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill={C_UNK}>Mennyi a vagyon? ?</text>
  </QFig>
);

const QWealth: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={90} w={260}>
    <text x="50" y="52" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{fmtNum(a)} Ft</text>
    <line x1="96" y1="47" x2="160" y2="47" stroke="#334155" strokeWidth="2" />
    <polygon points="168,47 158,41 158,53" fill="#334155" />
    <text x="128" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>?</text>
    <text x="212" y="52" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{fmtNum(b)} Ft</text>
  </QFig>
);

const QChange: React.FC<{ from: number; to: number }> = ({ from, to }) => (
  <TempChangeSvg className="w-full max-w-[280px] h-auto mx-auto" from={from} to={to} ask />
);
const QGraph: React.FC = () => <DayGraphSvg className="w-full max-w-[300px] h-auto mx-auto" />;
const QDivers: React.FC<{ ask?: string }> = ({ ask }) => <DiversSvg className="w-full max-w-[300px] h-auto mx-auto" ask={ask ?? null} />;

const Qp = (v: number): NLPoint => ({ v, label: '?', color: C_UNK });
const Gp = (v: number, label?: string): NLPoint => ({ v, label, color: '#16a34a' });

// ---------------------------------------------------------------------------
// Kérdés-építők (a helytelen válaszok tipikus gyerekhibák)
// ---------------------------------------------------------------------------
const T = (n: number) => `${fmtNum(n)} °C`;

/** Az első a helyes válasz; a többit a jelöltekből vesszük, ismétlés nélkül. */
const pick4 = (correct: string, cands: string[]): string[] => {
  const out = [correct];
  for (const c of cands) if (!out.includes(c) && out.length < 4) out.push(c);
  return out;
};

type QOpt = Partial<QuizQuestion>;

const mk = (id: string, level: DifficultyLevel, badge: string, question: string, options: string[], explanation: string, extra: QOpt = {}): QuizQuestion => ({
  id,
  level,
  questionTypeBadge: badge,
  question,
  options,
  correctAnswer: 0,
  explanation,
  ...extra
});

const readQ = (id: string, level: DifficultyLevel, v: number, min = -10, max = 10, labelEvery = 10): QuizQuestion =>
  mk(
    id,
    level,
    'Hőmérő',
    'Hány °C-ot mutat a hőmérő?',
    pick4(T(v), [T(-v), T(v + 1), T(v - 1), T(v + 2), T(v - 2)]),
    v < 0
      ? `Az oszlop teteje a 0 alatt van, ${-v} osztással lejjebb. Fagypont alatt negatív: ${T(v)}.`
      : v > 0
      ? `Az oszlop teteje a 0 felett van, ${v} osztással feljebb: ${T(v)}.`
      : 'Az oszlop pont a 0-nál áll: 0 °C, a fagypont.',
    { figure: <QThermo value={v} min={min} max={max} labelEvery={labelEvery} /> }
  );

const oppQ = (id: string, level: DifficultyLevel, n: number): QuizQuestion =>
  mk(
    id,
    level,
    'Ellentett',
    `Melyik szám a(z) ${fmtNum(n)} ellentettje?`,
    pick4(fmtNum(-n), [fmtNum(n), fmtNum(-n - Math.sign(n)), fmtNum(-n + Math.sign(n)), '0', fmtNum(-n * 2)]),
    `Az ellentett ugyanolyan messze van a 0-tól, csak a másik oldalán. ${fmtNum(n)} → ${fmtNum(-n)}: mindkettő ${Math.abs(n)} lépésre van a 0-tól.`
  );

const cmpQ = (id: string, level: DifficultyLevel, a: number, b: number, fig = true): QuizQuestion => {
  const A = fmtNum(a);
  const B = fmtNum(b);
  const rel = a < b ? '<' : '>';
  const opp = a < b ? '>' : '<';
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const pad = Math.max(2, Math.ceil((hi - lo) * 0.2));
  return mk(
    id,
    level,
    'Összehasonlítás',
    'Melyik igaz?',
    [`${A} ${rel} ${B}`, `${A} ${opp} ${B}`, `${A} = ${B}`, `${B} ${rel} ${A}`],
    `A számegyenesen a(z) ${fmtNum(lo)} van balra, ezért az a kisebb: ${A} ${rel} ${B}.${lo < 0 && hi < 0 ? ' Két negatív szám közül a 0-hoz közelebbi a nagyobb.' : ''}`,
    fig
      ? {
          figure: (
            <QLine
              min={lo - pad}
              max={hi + pad}
              tick={hi - lo + 2 * pad > 40 ? 5 : 1}
              labels={[lo, hi, ...(lo < 0 && hi > 0 ? [0] : [])]}
              points={[Gp(a), Gp(b)]}
            />
          )
        }
      : {}
  );
};

const moveText = (m: number) => (m > 0 ? `jobbra ${m}` : `balra ${-m}`);

const hopQ = (id: string, level: DifficultyLevel, start: number, moves: number[], fig = true): QuizQuestion => {
  const sum = moves.reduce((a, b) => a + b, 0);
  const ans = start + sum;
  const path = [start];
  moves.forEach((m) => path.push(path[path.length - 1] + m));
  const lo = Math.min(...path) - 2;
  const hi = Math.max(...path) + 2;
  return mk(
    id,
    level,
    'Lépegetés',
    `A szöcske a(z) ${fmtNum(start)} számon áll. Ugrások: ${moves.map(moveText).join(', majd ')}. Hová érkezik?`,
    pick4(fmtNum(ans), [fmtNum(start - sum), fmtNum(-ans), fmtNum(ans + 1), fmtNum(ans - 1)]),
    `Jobbra a nagyobb, balra a kisebb számok felé lépünk: ${path.map(fmtNum).join(' → ')}.`,
    fig ? { figure: <QLine min={lo} max={hi} labels={[lo, ...(lo < 0 && hi > 0 ? [0] : []), hi]} points={[Gp(start, '🦗')]} /> } : {}
  );
};

const walletQ = (id: string, level: DifficultyLevel, c: number, d: number, fig = true): QuizQuestion => {
  const ans = c - d;
  const F = (n: number) => `${fmtNum(n)} fabatka`;
  return mk(
    id,
    level,
    'Fabatka',
    `A pénztárcában ${c} fabatka készpénz és ${d} adósságcédula van. Mennyi a vagyon?`,
    pick4(F(ans), [F(c + d), F(d - c), F(ans + 1), F(ans - 1)]),
    ans > 0
      ? `${d} párt törlesztünk (● + ■ = 0), marad ${ans} fabatka készpénz.`
      : ans === 0
      ? 'Minden készpénz elmegy az adósság törlesztésére: a vagyon 0 fabatka.'
      : `${c} párt törlesztünk, de ${-ans} adósság marad: a vagyon ${fmtNum(ans)} fabatka.`,
    fig ? { figure: <QWallet cash={c} debt={d} /> } : {}
  );
};

const changeQ = (id: string, level: DifficultyLevel, start: number, delta: number, question: string, fig = false): QuizQuestion => {
  const r = start + delta;
  const cross = (start < 0 && r > 0) || (start > 0 && r < 0);
  return mk(
    id,
    level,
    'Változás',
    question,
    pick4(T(r), [T(start - delta), T(-r), T(r + 1), T(r - 1), T(r + 2)]),
    `${delta > 0 ? 'Emelkedés: felfelé' : 'Csökkenés: lefelé'} lépünk a hőmérőn ${Math.abs(delta)} fokot: ${T(start)} → ${T(r)}.${
      cross ? ` A 0-ig ${Math.abs(start)} fok, onnan még ${Math.abs(r)} fok.` : ''
    }`,
    fig ? { figure: <QThermo value={start} min={Math.min(-10, Math.floor(Math.min(start, r) / 10) * 10)} max={Math.max(10, Math.ceil(Math.max(start, r) / 10) * 10)} note={T(start)} note2={`${delta > 0 ? '+' : '−'}${Math.abs(delta)} fok → ?`} /> } : {}
  );
};

const diffQ = (id: string, level: DifficultyLevel, a: number, b: number, question: string, fig = false): QuizQuestion => {
  const ans = Math.abs(a - b);
  const cross = (a < 0 && b > 0) || (a > 0 && b < 0);
  const wrong = cross ? Math.abs(Math.abs(a) - Math.abs(b)) : Math.abs(a) + Math.abs(b);
  const D = (n: number) => `${n} °C-kal`;
  return mk(
    id,
    level,
    'Különbség',
    question,
    pick4(D(ans), [D(wrong), D(Math.max(Math.abs(a), Math.abs(b))), D(ans + 1), D(ans + 2), D(ans * 2), D(ans + 3)]),
    cross
      ? `Átlépjük a 0-t: ${T(a)}-tól a 0-ig ${Math.abs(a)} fok, onnan még ${Math.abs(b)} fok. ${Math.abs(a)} + ${Math.abs(b)} = ${ans}.`
      : `A 0 egyik oldalán maradunk, ezért kivonunk: ${Math.max(Math.abs(a), Math.abs(b))} − ${Math.min(Math.abs(a), Math.abs(b))} = ${ans}.`,
    fig ? { figure: <QChange from={a} to={b} /> } : {}
  );
};

const orderQ = (id: string, level: DifficultyLevel, list: number[], dir: 'asc' | 'desc'): QuizQuestion => {
  const correct = [...list].sort((x, y) => (dir === 'asc' ? x - y : y - x));
  const rev = [...correct].reverse();
  const byAbs = [...list].sort((x, y) => (dir === 'asc' ? Math.abs(x) - Math.abs(y) : Math.abs(y) - Math.abs(x)));
  const neg = list.filter((x) => x < 0);
  const non = list.filter((x) => x >= 0);
  const mistake =
    dir === 'asc'
      ? [...neg.sort((x, y) => Math.abs(x) - Math.abs(y)), ...non.sort((x, y) => x - y)]
      : [...non.sort((x, y) => y - x), ...neg.sort((x, y) => Math.abs(y) - Math.abs(x))];
  const swap = [correct[1], correct[0], ...correct.slice(2)];
  const S = (l: number[]) => l.map(fmtNum).join(', ');
  return mk(
    id,
    level,
    dir === 'asc' ? 'Növekvő sorrend' : 'Csökkenő sorrend',
    `Melyik a helyes ${dir === 'asc' ? 'növekvő' : 'csökkenő'} sorrend? ${list.map(T).join(', ')}`,
    pick4(S(correct), [S(byAbs), S(mistake), S(rev), S(swap)]),
    `${dir === 'asc' ? 'Növekvő: a leghidegebbtől a legmelegebbig' : 'Csökkenő: a legmelegebbtől a leghidegebbig'}: ${S(correct)}. A negatív számok közül az a nagyobb, amelyik közelebb van a 0-hoz.`
  );
};

// ---------------------------------------------------------------------------
// Kérdések – 30 / szint
// ---------------------------------------------------------------------------
const LEVEL1: QuizQuestion[] = [
  readQ('nx-e1', 1, -4),
  readQ('nx-e2', 1, -2),
  readQ('nx-e3', 1, 1),
  readQ('nx-e4', 1, -8),
  readQ('nx-e5', 1, -6),
  readQ('nx-e6', 1, 3),
  mk('nx-e7', 1, 'Negatív szám', 'Melyik szám kisebb 0-nál?', ['−25', '25', '0', '2400'], 'A 0-nál kisebb számok a negatív számok, előttük mínusz jel áll: −25.'),
  mk('nx-e8', 1, 'Negatív szám', 'Melyik szám NEM negatív?', ['1250', '−1000', '−37', '−520'], 'A 1250 előtt nincs mínusz jel, ez pozitív szám. A többi negatív.'),
  oppQ('nx-e9', 1, 5),
  oppQ('nx-e10', 1, -9),
  oppQ('nx-e11', 1, 12),
  oppQ('nx-e12', 1, -1),
  cmpQ('nx-e13', 1, -1, 1),
  cmpQ('nx-e14', 1, 0, -5),
  cmpQ('nx-e15', 1, -3, -8),
  cmpQ('nx-e16', 1, 4, -4),
  mk('nx-e17', 1, 'Fagypont', 'Hány °C-on fagy meg a víz?', ['0 °C-on', '100 °C-on', '−10 °C-on', '10 °C-on'], 'A víz 0 °C-on fagy meg. Ez a fagypont, a hőmérő viszonyítási pontja.'),
  mk('nx-e18', 1, 'Tengerszint', 'Hány méter a tengerszint, amihez a hegyek magasságát mérjük?', ['0 m', '1 m', '−1 m', '100 m'], 'A tengerszint a 0 m. Fölötte pozitív, alatta negatív számmal mérünk.'),
  mk('nx-e19', 1, 'Emeletek', 'Milyen szám jelöli a liftben a földszintet?', ['0', '1', '−1', '10'], 'A földszint a 0. Az emeletek 1, 2, 3 …, a mélygarázs −1, −2.'),
  hopQ('nx-e20', 1, 2, [-3]),
  hopQ('nx-e21', 1, -4, [2]),
  hopQ('nx-e22', 1, 0, [-6]),
  walletQ('nx-e23', 1, 4, 1),
  walletQ('nx-e24', 1, 3, 3),
  walletQ('nx-e25', 1, 2, 4),
  mk('nx-e26', 1, 'Tengerszint', 'Egy hal 50 méterrel a tengerszint alatt úszik. Hogyan írjuk le a helyét?', ['−50 m', '50 m', '0 m', '−5 m'], 'A tengerszint alatt negatív számmal írjuk: −50 m.'),
  mk('nx-e27', 1, 'Emeletek', 'Az autó a mélygarázs második szintjén áll. Melyik szám jelöli ezt a szintet?', ['−2', '2', '0', '−1'], 'A földszint 0, alatta −1, majd −2. A második föld alatti szint −2.'),
  mk('nx-e28', 1, 'Mindennapok', 'Melyik hőmérséklet illik a szánkózáshoz?', ['−5 °C', '25 °C', '18 °C', '100 °C'], 'Szánkózni hóban lehet, ahhoz fagy kell: fagypont alatti hőmérséklet, például −5 °C.'),
  changeQ('nx-e29', 1, 3, -3, 'Budapesten reggel 3 °C volt. Estére 3 fokkal hidegebb lett. Hány °C lett?', true),
  changeQ('nx-e30', 1, -2, 2, 'Reggel −2 °C volt. Délre 2 fokkal melegebb lett. Hány °C lett?', true)
];

const LEVEL2: QuizQuestion[] = [
  readQ('nx-m1', 2, -15, -25, 25, 5),
  readQ('nx-m2', 2, 15, -25, 25, 5),
  readQ('nx-m3', 2, -10, -25, 25, 5),
  changeQ('nx-m4', 2, -1, -4, 'Zircen reggel −1 °C volt. Estére 4 fokot csökkent a hőmérséklet. Hány °C lett?', true),
  changeQ('nx-m5', 2, -10, 2, 'Zabaron reggel −10 °C volt. Estére 2 fokot emelkedett a hőmérséklet. Hány °C lett?'),
  changeQ('nx-m6', 2, 0, -2, 'Szegeden reggel 0 °C volt. Estére 2 fokot hűlt a levegő. Hány °C lett?'),
  changeQ('nx-m7', 2, -17, 10, 'Reggel −17 °C volt. Délutánra 10 fokkal emelkedett a hőmérséklet. Mennyit mutatott a hőmérő?', true),
  diffQ('nx-m8', 2, 3, -3, 'Budapesten 3 °C, Miskolcon −3 °C volt. Mennyivel volt hidegebb Miskolcon?'),
  diffQ('nx-m9', 2, -10, 5, 'Zabaron −10 °C, Pécsett 5 °C volt. Mennyivel volt melegebb Pécsett?'),
  diffQ('nx-m10', 2, -4, -19, 'A hőmérséklet −4 °C-ról −19 °C-ra változott. Mennyivel lett hidegebb?', true),
  diffQ('nx-m11', 2, -51, -54, 'A hőmérséklet −51 °C-ról −54 °C-ra változott. Mennyivel lett hidegebb?', true),
  orderQ('nx-m12', 2, [-2, -7, -5, 0, -17, 13], 'asc'),
  orderQ('nx-m13', 2, [25, -4, 1, -8, 6, -10], 'desc'),
  cmpQ('nx-m14', 2, -14, -13),
  cmpQ('nx-m15', 2, -89, -45, false),
  cmpQ('nx-m16', 2, -20, -10),
  mk('nx-m17', 2, 'Számszomszéd', 'Melyik szám a −3 kisebb számszomszédja?', ['−4', '−2', '4', '2'], 'A kisebb szomszéd balra van: a −3-tól balra a −4 áll.'),
  mk('nx-m18', 2, 'Számszomszéd', 'Melyik szám a −4 nagyobb számszomszédja?', ['−3', '−5', '3', '5'], 'A nagyobb szomszéd jobbra van: a −4-től jobbra a −3 áll.'),
  mk('nx-m19', 2, 'Számszomszéd', 'Melyik a −15 kisebb egyes számszomszédja?', ['−16', '−14', '−20', '−10'], 'A −15-től balra a −16 áll, ez a kisebb szomszéd. A −14 a nagyobb szomszéd, a −20 a kisebb tízes szomszéd.', {
    figure: <QLine min={-20} max={-10} labels={[-20, -15, -10]} points={[Gp(-15, '−15')]} />
  }),
  mk('nx-m20', 2, 'Gondoltam egy számra', 'Melyik szám a 0-nál 5-tel kisebb?', ['−5', '5', '−4', '−6'], 'A 0-tól 5-öt lépünk balra: −1, −2, −3, −4, −5.'),
  mk('nx-m21', 2, 'Gondoltam egy számra', 'Melyik szám a 2-nél 5-tel kisebb?', ['−3', '3', '7', '−7'], 'A 2-től 5-öt lépünk balra: 1, 0, −1, −2, −3.'),
  mk('nx-m22', 2, 'Gondoltam egy számra', 'Melyik szám a −10-nél eggyel kisebb?', ['−11', '−9', '11', '9'], 'Eggyel kisebb: egyet lépünk balra. A −10-től balra a −11 áll.'),
  hopQ('nx-m23', 2, 3, [-7]),
  hopQ('nx-m24', 2, 3, [6, -10]),
  walletQ('nx-m25', 2, 7, 2),
  walletQ('nx-m26', 2, 6, 3, false),
  mk('nx-m27', 2, 'Adósság', 'Kriszti pénztárcájában 500 Ft és egy 200 Ft-os adósságcédula van. Mennyit ér ez együtt?', ['300 Ft', '700 Ft', '500 Ft', '−300 Ft'], 'Az adósság csökkenti a vagyont: 500 − 200 = 300 Ft.'),
  mk('nx-m28', 2, 'Kölcsön', 'Zitának 500 Ft-ja van. Mennyit kell kölcsönkérnie, ha 690 Ft-os újságot szeretne venni?', ['190 Ft-ot', '1190 Ft-ot', '290 Ft-ot', '690 Ft-ot'], 'Ami hiányzik: 690 − 500 = 190 Ft. Ennyi lesz az adóssága.'),
  mk('nx-m29', 2, 'Grafikon', 'Manó grafikonja szerint hány órakor volt a legmelegebb?', ['13 órakor', '12 órakor', '8 órakor', '19 órakor'], 'A legmagasabb pont 13 óránál van: ekkor 6 °C volt.', { figure: <QGraph /> }),
  mk('nx-m30', 2, 'Mélység', 'Milyen mélyre merült a B búvár?', ['−8 m', '8 m', '−7 m', '−10 m'], 'A B oszlop alja a −5 és a −10 között, a −8-nál van. A víz alatt negatív: −8 m.', { figure: <QDivers ask="B" /> })
];

const LEVEL3: QuizQuestion[] = [
  diffQ('nx-h1', 3, -1, -21, 'A hőmérséklet −1 °C-ról −21 °C-ra változott. Mennyivel lett hidegebb?', true),
  diffQ('nx-h2', 3, -11, 3, 'A hőmérséklet −11 °C-ról 3 °C-ra változott. Mennyivel lett melegebb?', true),
  diffQ('nx-h3', 3, -5, 2, 'A hőmérséklet −5 °C-ról 2 °C-ra változott. Mennyivel lett melegebb?', true),
  diffQ('nx-h4', 3, -19, -45, 'A hőmérséklet −19 °C-ról −45 °C-ra változott. Mennyivel lett hidegebb?', true),
  changeQ('nx-h5', 3, -15, -6, 'A −15 °C-ot 6 fokkal csökkentjük. Hány °C lesz?'),
  changeQ('nx-h6', 3, 15, -35, 'A 15 °C-ot 35 fokkal csökkentjük. Hány °C lesz?'),
  changeQ('nx-h7', 3, 10, -35, 'A 10 °C-ot 35 fokkal csökkentjük. Hány °C lesz?'),
  mk('nx-h8', 3, 'Szabály', 'A szabály: ▲ = ● − 3 °C (a ▲ 3 fokkal hidegebb). Ha ● = −5 °C, mennyi a ▲?', ['−8 °C', '−2 °C', '8 °C', '−15 °C'], 'A −5 °C-nál 3 fokkal hidegebb: lefelé 3-at lépünk: −6, −7, −8 °C.'),
  mk('nx-h9', 3, 'Szabály', 'A szabály: ▲ = ● − 3 °C (a ▲ 3 fokkal hidegebb). Ha ▲ = −6 °C, mennyi a ●?', ['−3 °C', '−9 °C', '3 °C', '−18 °C'], 'A ● 3 fokkal melegebb: a −6 °C-tól felfelé 3-at lépünk: −5, −4, −3 °C.'),
  walletQ('nx-h10', 3, 9, 10),
  walletQ('nx-h11', 3, 9, 13),
  mk('nx-h12', 3, 'Vagyon', 'A vagyon 2500 Ft-ról 1800 Ft-ra változott. Hogyan és mennyivel?', ['csökkent 700 Ft-tal', 'nőtt 700 Ft-tal', 'csökkent 4300 Ft-tal', 'csökkent 1300 Ft-tal'], 'Kevesebb lett, tehát csökkent: 2500 − 1800 = 700 Ft.', { figure: <QWealth a={2500} b={1800} /> }),
  mk('nx-h13', 3, 'Vagyon', 'A vagyon 5500 Ft-ról −2000 Ft-ra változott. Hogyan és mennyivel?', ['csökkent 7500 Ft-tal', 'csökkent 3500 Ft-tal', 'nőtt 7500 Ft-tal', 'csökkent 5500 Ft-tal'], 'Átlépte a 0-t: 5500 Ft a 0-ig, onnan még 2000 Ft adósság. 5500 + 2000 = 7500 Ft-tal csökkent.', { figure: <QWealth a={5500} b={-2000} /> }),
  mk('nx-h14', 3, 'Vagyon', 'A vagyon −1500 Ft-ról 2000 Ft-ra változott. Hogyan és mennyivel?', ['nőtt 3500 Ft-tal', 'nőtt 500 Ft-tal', 'csökkent 3500 Ft-tal', 'nőtt 2000 Ft-tal'], 'Az adósságból pénz lett, tehát nőtt: 1500 Ft a 0-ig, onnan még 2000 Ft. 1500 + 2000 = 3500 Ft.', { figure: <QWealth a={-1500} b={2000} /> }),
  mk('nx-h15', 3, 'Tartozás', 'A perselyben 50 Ft van, de 2080 Ft a tartozás. Mennyi pénzt kell még gyűjteni, hogy ki tudjuk egyenlíteni?', ['2030 Ft-ot', '2130 Ft-ot', '2080 Ft-ot', '1580 Ft-ot'], 'Az 50 Ft-tal 50 Ft-ot már kifizetünk. Még 2080 − 50 = 2030 Ft hiányzik.'),
  hopQ('nx-h16', 3, 0, [5, -6, 1, -4]),
  hopQ('nx-h17', 3, -4, [-4, -4, 7, 10, -17], false),
  mk('nx-h18', 3, 'Nyitott mondat', 'Hány egész szám teszi igazzá: −3 < □ < 15?', ['17', '18', '16', '12'], 'A megoldások: −2, −1 (2 db), a 0 (1 db) és 1-től 14-ig (14 db). Összesen 2 + 1 + 14 = 17.'),
  mk('nx-h19', 3, 'Nyitott mondat', 'Hány egész szám teszi igazzá: 20 > △ > −5?', ['24', '25', '23', '15'], 'A megoldások: −4-től −1-ig (4 db), a 0 (1 db) és 1-től 19-ig (19 db). Összesen 4 + 1 + 19 = 24.'),
  mk('nx-h20', 3, 'Igaz vagy hamis', '„A −16 °C hidegebb, mint a −17 °C.” Igaz vagy hamis?', ['Hamis, mert a −17 °C a hidegebb.', 'Igaz, mert a 16 kisebb, mint a 17.', 'Igaz, mert mindkettő negatív.', 'Hamis, mert egyforma hidegek.'], 'A −17 °C lejjebb van a hőmérőn, mint a −16 °C, tehát a −17 °C a hidegebb. Az állítás hamis.'),
  mk('nx-h21', 3, 'Igaz vagy hamis', '„Ha −11 °C-ról 3 °C-ra változott a hőmérséklet, akkor 14 fokot emelkedett.” Igaz vagy hamis?', ['Igaz, mert 11 + 3 = 14.', 'Hamis, csak 8 fokot emelkedett.', 'Hamis, 11 fokot emelkedett.', 'Hamis, mert hűlt a levegő.'], 'Átlépte a 0-t: 11 fok a 0-ig, még 3 fok: 11 + 3 = 14. Az állítás igaz.'),
  mk('nx-h22', 3, 'Mélység', 'A C búvár −14 m mélyen van. Hány métert kell még süllyednie, hogy elérje az 56 méteres mélységet?', ['42 m-t', '70 m-t', '52 m-t', '32 m-t'], '56 − 14 = 42 m van még hátra.', { figure: <QDivers ask="C" /> }),
  mk('nx-h23', 3, 'Mértékváltás', 'Az E búvár −7 m mélyen van. Hány dm-t kell még süllyednie az 56 méteres mélységig?', ['490 dm-t', '49 dm-t', '630 dm-t', '4900 dm-t'], '56 − 7 = 49 m van hátra. 1 m = 10 dm, így 49 m = 490 dm.', { figure: <QDivers ask="E" /> }),
  mk('nx-h24', 3, 'Grafikon', 'Manó grafikonja szerint hány fokot emelkedett a hőmérséklet 8 órától (−3 °C) 13 óráig (6 °C)?', ['9 fokot', '3 fokot', '6 fokot', '5 fokot'], 'Átlépte a 0-t: −3 °C-tól 0 °C-ig 3 fok, onnan 6 °C-ig 6 fok. 3 + 6 = 9.', { figure: <QGraph /> }),
  mk('nx-h25', 3, 'Magasság', 'A hegycsúcson lévő zászló 400 m-rel a tengerszint felett, egy hal 50 m-rel a tengerszint alatt van. Mekkora köztük a magasságkülönbség?', ['450 m', '350 m', '400 m', '50 m'], 'A tengerszinten át mérünk: a zászlótól a tengerszintig 400 m, onnan a halig 50 m. 400 + 50 = 450 m.'),
  mk('nx-h26', 3, 'Ellentett', 'A szöcske a −6-on áll. Hányat kell jobbra ugrania, hogy a −6 ellentettjére érkezzen?', ['12-t', '6-ot', '0-t', '10-et'], 'A −6 ellentettje a 6. A −6-tól a 0-ig 6 ugrás, a 0-tól a 6-ig még 6: 6 + 6 = 12.', {
    figure: <QLine min={-8} max={8} labels={[-8, -4, 0, 4, 8]} points={[Gp(-6, '🦗')]} note="az ellentettjére ugrik: ? ugrás" />
  }),
  mk('nx-h27', 3, 'Osztásköz', 'Ezen a számegyenesen egy osztás 100. Melyik számot jelöli a „?”?', ['−500', '−5', '500', '−50'], 'A pont a 0-tól balra 5 osztásra van. 5 · 100 = 500, és balra van: −500.', {
    figure: <QLine min={-600} max={600} tick={100} labels={[0, 100]} points={[Qp(-500)]} />
  }),
  orderQ('nx-h28', 3, [-21, -30, -5, -3, 0, 18], 'desc'),
  mk('nx-h29', 3, 'Táblázat', 'Este ezeket mérték: Budapest 0 °C, Pécs 7 °C, Zirc −5 °C, Zabar −8 °C, Miskolc −3 °C, Szeged −2 °C. Hol volt a leghidegebb este?', ['Zabaron', 'Zircen', 'Szegeden', 'Pécsett'], 'A legkisebb szám a −8 °C (Zabar). A −5 °C (Zirc) 3 fokkal melegebb ennél.'),
  mk('nx-h30', 3, 'Több lépés', 'Reggel −6 °C volt. Délig 9 fokot emelkedett, estére 5 fokot csökkent a hőmérséklet. Hány °C volt este?', ['−2 °C', '10 °C', '2 °C', '−8 °C'], 'Délre: −6 °C-tól 9 fokkal feljebb 3 °C. Estére: 3 °C-tól 5 fokkal lejjebb −2 °C.')
];

export const NEGATIVES_EXAM_QUESTIONS: QuizQuestion[] = [...LEVEL1, ...LEVEL2, ...LEVEL3];

export const NegativesExamQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId="g4-neg-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="4. Gyakorlás, tudáspróba"
      subtitle="90 feladat 3 szinten: az egész IV. fejezet – hőmérő, tengerszint, számegyenes, ellentettek, összehasonlítás, sorrend, hőmérséklet-változás, fabatka és adósság."
      badge="4. OSZTÁLY • IV. A NEGATÍV SZÁMOK • TUDÁSPRÓBA"
      questions={NEGATIVES_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Hőmérő és számegyenes',
          items: [
            '0 °C a fagypont, 0 m a tengerszint, 0 a földszint.',
            'A 0-tól balra (lejjebb) negatív, jobbra (feljebb) pozitív.',
            'Ellentettek: 6 és −6, ugyanolyan messze a 0-tól.',
            'Kisebb szomszéd balra: −15 → −16.'
          ]
        },
        {
          title: 'Összehasonlítás és változás',
          items: [
            'Két negatív közül a 0-hoz közelebbi a nagyobb: −3 > −5.',
            'A 0 egyik oldalán: kivonás (−4 → −19: 15 fok).',
            'A 0-n át: összeadás (−5 → 2: 7 fok).',
            'Hűl, csökken: lefelé; melegszik, emelkedik: felfelé.'
          ]
        },
        {
          title: 'Fabatka és pénz',
          items: [
            '● készpénz, ■ adósság, ● + ■ = 0.',
            '9 ● és 13 ■ = −4 fabatka.',
            '500 Ft és 200 Ft adósság = 300 Ft.',
            '500 Ft → −1000 Ft: csökkent 1500 Ft-tal.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NegativesExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NegativesExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default NegativesExamQuiz;
