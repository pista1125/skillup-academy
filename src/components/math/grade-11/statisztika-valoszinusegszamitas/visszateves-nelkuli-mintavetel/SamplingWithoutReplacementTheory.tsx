import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  SamplingWithoutReplacementUrnSvg,
  SamplingWithoutReplacementModelSvg,
  SamplingWithoutReplacementTreeSvg,
  SamplingWithoutReplacementOrchestraSvg,
  SamplingWithoutReplacementGoalsSvg
} from './SamplingWithoutReplacementFigures';

const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  const kk = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= kk; i++) r = (r * (n - kk + i)) / i;
  return Math.round(r);
};
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const fmt = (x: number, d = 4): string => (Number.isFinite(x) ? x.toLocaleString('hu-HU', { maximumFractionDigits: d }) : '–');
const frac = (a: number, b: number): string => {
  if (a === 0) return '0';
  const g = gcd(a, b) || 1;
  return b / g === 1 ? `${a / g}` : `${a / g}/${b / g}`;
};

/** Binomiális együttható JSX-ben. */
const Binom: React.FC<{ n: React.ReactNode; k: React.ReactNode }> = ({ n, k }) => (
  <span className="inline-flex items-center align-middle mx-0.5">
    <span className="text-2xl leading-none font-light">(</span>
    <span className="inline-flex flex-col items-center leading-tight text-xs font-semibold px-0.5">
      <span>{n}</span>
      <span>{k}</span>
    </span>
    <span className="text-2xl leading-none font-light">)</span>
  </span>
);

const Frac: React.FC<{ num: React.ReactNode; den: React.ReactNode }> = ({ num, den }) => (
  <span className="inline-flex flex-col items-center align-middle mx-1">
    <span className="px-1">{num}</span>
    <span className="px-1 border-t border-current">{den}</span>
  </span>
);

interface TreeNode {
  id: string;
  seq: string;
  depth: number;
  reds: number;
  num: number; // az út valószínűségének számlálója (a nevező közös: n · (n − 1) · …)
  edgeLabel: string;
  edgeZero: boolean;
  color: 'P' | 'S' | null;
  children: TreeNode[];
  x: number;
  y: number;
}

/** Valószínűségi fa visszatevés nélküli húzásra (P = piros, S = sárga). */
const buildTree = (r: number, s: number, draws: number): TreeNode => {
  const make = (seq: string, depth: number, redsLeft: number, yellowsLeft: number, num: number, edgeLabel: string, edgeZero: boolean, color: 'P' | 'S' | null): TreeNode => {
    const node: TreeNode = { id: seq || 'root', seq, depth, reds: seq.split('').filter((c) => c === 'P').length, num, edgeLabel, edgeZero, color, children: [], x: 0, y: 0 };
    if (depth < draws) {
      const left = redsLeft + yellowsLeft;
      node.children = [
        make(seq + 'P', depth + 1, Math.max(redsLeft - 1, 0), yellowsLeft, num * redsLeft, `${redsLeft}/${left}`, redsLeft === 0, 'P'),
        make(seq + 'S', depth + 1, redsLeft, Math.max(yellowsLeft - 1, 0), num * yellowsLeft, `${yellowsLeft}/${left}`, yellowsLeft === 0, 'S')
      ];
    }
    return node;
  };
  return make('', 0, r, s, 1, '', false, null);
};

const layoutTree = (root: TreeNode, draws: number, width: number, height: number): TreeNode[] => {
  const all: TreeNode[] = [];
  const leaves: TreeNode[] = [];
  const walk = (n: TreeNode) => {
    all.push(n);
    if (n.children.length === 0) leaves.push(n);
    n.children.forEach(walk);
  };
  walk(root);
  const top = 30;
  const step = (height - top - 20) / Math.max(leaves.length - 1, 1);
  leaves.forEach((l, i) => {
    l.y = top + i * step;
  });
  const setY = (n: TreeNode): number => {
    if (n.children.length === 0) return n.y;
    const ys = n.children.map(setY);
    n.y = ys.reduce((a, b) => a + b, 0) / ys.length;
    return n.y;
  };
  setY(root);
  const colW = (width - 230) / Math.max(draws, 1);
  all.forEach((n) => {
    n.x = 40 + n.depth * colW;
  });
  return all;
};

const HYPER_PRESETS = [
  { t: 'Kidolgozott: 10 golyó, 6 sárga, 5 húzás', n: 10, m: 6, k: 5 },
  { t: 'Gólszerzők: 12 játékos, 3 gólszerző, 3 kiválasztott', n: 12, m: 3, k: 3 },
  { t: 'Gitárosok: 36 diák, 5 gitáros, 4 kiválasztott', n: 36, m: 5, k: 4 },
  { t: 'Téli születésnap: 35 diák, 10 télen, 4 kiválasztott', n: 35, m: 10, k: 4 },
  { t: 'Poharak: 50 pohár, 3 csorba, 4 kiválasztott', n: 50, m: 3, k: 4 }
];

export const SamplingWithoutReplacementTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: valószínűségi fa-építő
  const [reds, setReds] = useState<number>(4);
  const [yellows, setYellows] = useState<number>(6);
  const [draws, setDraws] = useState<number>(2);
  const [target, setTarget] = useState<number>(1);
  const total = reds + yellows;
  const d = Math.min(draws, total);
  const tgt = Math.min(target, d);
  const treeH = d === 3 ? 380 : d === 2 ? 260 : 170;
  const nodes = useMemo(() => layoutTree(buildTree(reds, yellows, d), d, 600, treeH), [reds, yellows, d, treeH]);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const leaves = nodes.filter((n) => n.depth === d && d > 0);
  let den = 1;
  for (let i = 0; i < d; i++) den *= total - i;
  const hitLeaves = leaves.filter((l) => l.reds === tgt && l.num > 0);
  const hitNum = hitLeaves.reduce((s, l) => s + l.num, 0);
  const combFav = binom(reds, tgt) * binom(yellows, d - tgt);
  const combTot = binom(total, d);
  const parentOf = (id: string): TreeNode | undefined => (id.length <= 1 ? byId.get('root') : byId.get(id.slice(0, -1)));
  const onHitPath = (id: string) => hitLeaves.some((l) => l.seq.startsWith(id));

  // Labor II: hipergeometrikus eloszlás oszlopdiagramja
  const [hn, setHn] = useState<number>(10);
  const [hm, setHm] = useState<number>(6);
  const [hk, setHk] = useState<number>(5);
  const m2 = Math.min(hm, hn);
  const k2 = Math.min(hk, hn);
  const dist = Array.from({ length: k2 + 1 }, (_, j) => binom(m2, j) * binom(hn - m2, k2 - j));
  const distTot = binom(hn, k2);
  const maxP = Math.max(...dist.map((c) => c / distTot), 1e-9);
  const ev = (k2 * m2) / hn;

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="visszateves-nelkuli-mintavetel"
      title="11. Visszatevés nélküli mintavétel"
      subtitle="Ha a kihúzott elemet nem tesszük vissza: hogyan számoljuk ki, hogy a mintában pontosan hány elem rendelkezik egy adott tulajdonsággal?"
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_visszateves_nelkuli_mintavetel_tananyag.pdf"
      practiceTitle="Készen állsz a visszatevés nélküli mintavételre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — VISSZATEVÉS NÉLKÜLI MINTAVÉTEL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center text-base font-black text-sky-900 dark:text-sky-200">
              P(pontosan j az m elemű csoportból) ={' '}
              <Frac
                num={
                  <>
                    <Binom n="m" k="j" /> · <Binom n="n − m" k="k − j" />
                  </>
                }
                den={<Binom n="n" k="k" />}
              />
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Visszatevés nélküli mintavételnél a már kiválasztott elemet nem tesszük vissza – mindegy, hogy egyszerre vagy egymás után húzunk.</li>
              <li>
                Ha egyszerre két feltételnek kell teljesülnie (<strong>„és”</strong>: 3 sárga <em>és</em> 2 piros), a lehetőségek számát <strong>összeszorozzuk</strong>.
              </li>
              <li>n = összes elem, m = az adott tulajdonságú elemek, k = a minta elemszáma, j = a mintában lévő adott tulajdonságú elemek száma.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: 4 piros és 6 sárga golyó" badge="Tankönyv 190. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Van 4 piros és 6 sárga, tapintással megkülönböztethetetlen golyónk. Csukott szemmel, véletlenszerűen kihúzunk 5 golyót. Mennyi a valószínűsége, hogy a kihúzott golyók közül <strong>a)</strong> mindegyik sárga; <strong>b)</strong> pontosan 3 sárga?
            </p>
            <p>
              10 golyóból 5-öt húzunk, a sorrend nem számít: az összes eset <Binom n={10} k={5} /> = 252.
            </p>
            <p>
              <strong>a)</strong> A 6 sárgából kell 5-öt húzni: <Binom n={6} k={5} /> = 6, így p = 6/252 ≈ <strong>0,024</strong>.
            </p>
            <p>
              <strong>b)</strong> Pontosan 3 sárga: 3 sárga <em>és</em> 2 piros golyó. A 6 sárgából 3-at <Binom n={6} k={3} /> = 20-féleképpen, a 4 pirosból 2-t <Binom n={4} k={2} /> = 6-féleképpen húzhatunk. Mivel a 3 sárga mindegyik esete bármelyik 2 piros húzásával párosítható, a lehetőségek számát össze kell szorozni: 20 · 6 = 120. A valószínűség 120/252 ≈ <strong>0,476</strong>.
            </p>
            <TheoryCallout type="info" title="Megjegyzés: „és” ⇒ szorzás">
              A kedvező esethez 3 sárga és 2 piros golyó kell. Amikor <strong>és</strong> kötőszót használunk, a két eseménynek egyszerre kell teljesülnie, és ilyenkor rendszerint össze kell szoroznunk a lehetőségek számát.
            </TheoryCallout>
          </div>
          <SamplingWithoutReplacementUrnSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: visszatevés nélküli mintavétel" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Mintavételről</strong> beszélünk, ha kiválasztunk néhány elemet egy halmaz elemei közül. Általában azt vizsgáljuk, hogy a kiválasztott elemek között hány rendelkezik bizonyos tulajdonsággal (nyerő szám, adott korcsoport, hibás termék).
            </p>
            <p>
              <strong>Visszatevés nélküli</strong> mintavételnél a már kiválasztott elemet nem tesszük vissza, az nem választható ki újra. Ez történhet úgy, hogy egyszerre veszünk ki több elemet, vagy úgy, hogy egymás után vesszük ki őket, és a kihúzottakat nem tesszük vissza.
            </p>
            <p>
              Pontosan 2 elem lesz az egyik csoportból, ha ebből a csoportból 2 db, a másikból k − 2 db kerül a mintába. A kedvező esetek száma <Binom n="m" k={2} /> · <Binom n="n − m" k="k − 2" />, ezt osztjuk az összes eset számával, <Binom n="n" k="k" />-val.
            </p>
          </div>
          <SamplingWithoutReplacementModelSvg />
        </div>
      </TheorySection>

      {/* 3. Valószínűségi fa */}
      <TheorySection title="3. Egymás utáni húzás: a valószínűségi fa" badge="Módszer" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Húzzunk 2 golyót egymás után, visszatevés nélkül a 4 piros (P) és 6 sárga (S) közül! A második húzásnál már csak 9 golyó van, és a valószínűség attól függ, mit húztunk először.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Egy ág mentén a valószínűségeket <strong>összeszorozzuk</strong>: P(PP) = 4/10 · 3/9 = 12/90.</li>
              <li>Ha több út vezet a kívánt eredményhez, az utak valószínűségét <strong>összeadjuk</strong>: P(pontosan 1 piros) = 24/90 + 24/90 = 48/90 = 8/15.</li>
              <li>
                Kombinációkkal ugyanez: <Binom n={4} k={1} /> · <Binom n={6} k={1} /> / <Binom n={10} k={2} /> = 24/45 = 8/15.
              </li>
            </ul>
          </div>
          <SamplingWithoutReplacementTreeSvg />
        </div>
      </TheorySection>

      {/* 4. Feladatok */}
      <TheorySection title="4. Feladatok: olimpia, zenekar, Aranycsapat" badge="Tankönyv 191. o." badgeColor="emerald">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <TheoryCard title="1. feladat: Helsinki, 1952" badge="Feladat" badgeColor="amber">
                <p className="text-sm text-slate-700">
                  A magyar sportolók 16 arany-, 10 ezüst- és 16 bronzérmet nyertek, mégis 77 sportoló tért haza éremmel a 189 indulóból. <strong>a)</strong> Ez úgy lehetséges, hogy a csapatversenyekben (pl. labdarúgás, vízilabda, csapatvívás) egy érmet a csapat minden tagja megkap, és egy sportoló több érmet is nyerhetett.
                </p>
                <p className="text-sm text-slate-700 mt-2">
                  <strong>b)</strong> Öt indulót választunk; összes eset (189 alatt 5). Pontosan ketten érmesek: (77 alatt 2) · (112 alatt 3) / (189 alatt 5) ≈ <strong>0,350</strong>. A Venn-diagram leolvasása szerint 51 aranyérmes volt: mind az öt aranyérmes (51 alatt 5) / (189 alatt 5) ≈ <strong>0,0012</strong>; pontosan ketten aranyérmesek (51 alatt 2) · (138 alatt 3) / (189 alatt 5) ≈ <strong>0,287</strong>.
                </p>
              </TheoryCard>
              <TheoryCard title="2. feladat: a vonószenekar" badge="Feladat" badgeColor="sky">
                <p className="text-sm text-slate-700">14 hegedűs, 4 brácsás, 4 csellós, 2 nagybőgős (24 zenész); kettőt választunk, összes eset (24 alatt 2) = 276.</p>
                <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                  <li>a) mindkettő hegedűs: (14 alatt 2) / 276 = 91/276 ≈ <strong>0,330</strong></li>
                  <li>b) egyik hegedűs, másik nem: 14 · 10 / 276 = 140/276 ≈ <strong>0,507</strong></li>
                  <li>c) egyik brácsás, másik hegedűs: 4 · 14 / 276 = 56/276 ≈ <strong>0,203</strong></li>
                </ul>
              </TheoryCard>
            </div>
            <SamplingWithoutReplacementOrchestraSvg />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <TheoryCard title="3. feladat: Anglia–Magyarország 3 : 6 (1953)" badge="Feladat" badgeColor="violet">
              <p className="text-sm text-slate-700">
                12 magyar játékos lépett pályára, közülük hárman lőttek gólt (Hidegkúti 3, Puskás 2, Bozsik 1). Három játékost választunk; összes eset (12 alatt 3) = 220.
              </p>
              <TheoryTable
                headers={['gólszerzők száma', '0', '1', '2', '3']}
                rows={[
                  ['kedvező esetek', '(9 alatt 3) = 84', '3 · 36 = 108', '3 · 9 = 27', '1'],
                  ['valószínűség', '84/220 ≈ 0,382', '108/220 ≈ 0,491', '27/220 ≈ 0,123', '1/220 ≈ 0,005']
                ]}
              />
              <p className="text-sm text-slate-700 mt-2">
                <strong>b)</strong> A gólszerzők számának várható értéke: (0 · 84 + 1 · 108 + 2 · 27 + 3 · 1) / 220 = 165/220 = <strong>0,75</strong> (= 3 · 3/12).
              </p>
            </TheoryCard>
            <SamplingWithoutReplacementGoalsSvg />
          </div>
          <TheoryTable
            headers={['Házi feladat', 'Számolás', 'Valószínűség']}
            rows={[
              ['1. a) 36 diák, 5 gitáros; 4-ből pontosan 1 gitáros', '5 · (31 alatt 3) / (36 alatt 4) = 22 475 / 58 905', '≈ 0,382'],
              ['1. b) pontosan 2 gitáros', '(5 alatt 2) · (31 alatt 2) / (36 alatt 4) = 4650 / 58 905', '≈ 0,079'],
              ['2. a) 35 diák, 10 télen született; mind a 4 télen', '(10 alatt 4) / (35 alatt 4) = 210 / 52 360', '≈ 0,004'],
              ['2. b) pontosan 3 télen', '(10 alatt 3) · 25 / (35 alatt 4) = 3000 / 52 360', '≈ 0,057'],
              ['3. a) 50 pohár, 3 csorba; mind a 4 csorba', 'csak 3 csorba van', '0 (lehetetlen)'],
              ['3. b) mind a 4 ép', '(47 alatt 4) / (50 alatt 4) = 178 365 / 230 300', '≈ 0,774'],
              ['3. c) 2 csorba és 2 ép', '(3 alatt 2) · (47 alatt 2) / (50 alatt 4) = 3243 / 230 300', '≈ 0,014']
            ]}
          />
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: a két csoportot összeadjuk szorzás helyett" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Hány kedvező eset van, ha 5 golyóból pontosan 3 sárga (4 piros, 6 sárga)?"
          wrong="(6 alatt 3) + (4 alatt 2) = 20 + 6 = 26"
          wrongExplanation="3 sárga ÉS 2 piros kell egyszerre: a 3 sárga minden választása párosítható a 2 piros minden választásával."
          correct="(6 alatt 3) · (4 alatt 2) = 20 · 6 = 120, így p = 120/252 ≈ 0,476"
          correctExplanation="„És” ⇒ szorzás. Ne felejtsd el a másik csoportot sem: csak (6 alatt 3) / 252 ≈ 0,079 a piros golyók kiválasztását hagyná ki."
          tip="Ellenőrzés: a pontosan 0, 1, …, k sárga valószínűségeinek összege 1 (itt 0 + 6 + 60 + 120 + 60 + 6 = 252)."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: valószínűségi fa-építő" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">piros golyók (P): {reds}</label>
              <input type="range" min={0} max={9} value={reds} onChange={(e) => setReds(Number(e.target.value))} className="w-full accent-rose-600" aria-label="piros golyók száma" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">sárga golyók (S): {yellows}</label>
              <input type="range" min={0} max={9} value={yellows} onChange={(e) => setYellows(Number(e.target.value))} className="w-full accent-amber-500" aria-label="sárga golyók száma" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">húzások száma (visszatevés nélkül): {d}</label>
              <input type="range" min={1} max={3} value={draws} onChange={(e) => setDraws(Number(e.target.value))} className="w-full accent-sky-600" aria-label="húzások száma" />
            </div>
          </div>
          {total === 0 ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">Tegyél legalább egy golyót az urnába!</div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-slate-600">Kiemelés: pontosan ennyi piros a mintában:</span>
                {Array.from({ length: d + 1 }, (_, j) => (
                  <button
                    key={j}
                    onClick={() => setTarget(j)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${tgt === j ? 'bg-sky-600 text-white' : 'bg-sky-50 text-sky-800 hover:bg-sky-100'}`}
                  >
                    {j} piros
                  </button>
                ))}
              </div>
              <svg viewBox={`0 0 600 ${treeH}`} className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
                {nodes
                  .filter((n) => n.depth > 0)
                  .map((n) => {
                    const p = parentOf(n.seq);
                    if (!p) return null;
                    const hot = onHitPath(n.seq);
                    return (
                      <g key={`e-${n.id}`}>
                        <line x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke={hot ? '#0284c7' : '#94a3b8'} strokeWidth={hot ? 3 : 1.5} strokeDasharray={n.edgeZero ? '4 4' : undefined} />
                        <text x={(p.x + n.x) / 2} y={(p.y + n.y) / 2 - 5} fontSize="11" textAnchor="middle" fontWeight="bold" fill={hot ? '#0c4a6e' : '#475569'}>
                          {n.edgeLabel}
                        </text>
                      </g>
                    );
                  })}
                {nodes.map((n) =>
                  n.depth === 0 ? (
                    <circle key={n.id} cx={n.x} cy={n.y} r="8" fill="#334155" />
                  ) : (
                    <circle
                      key={n.id}
                      cx={n.x}
                      cy={n.y}
                      r="10"
                      fill={n.color === 'P' ? '#fb7185' : '#fde047'}
                      stroke={n.color === 'P' ? '#be123c' : '#a16207'}
                      strokeWidth="1.5"
                      opacity={n.edgeZero ? 0.35 : 1}
                    />
                  )
                )}
                {leaves.map((l) => (
                  <text key={`t-${l.id}`} x={l.x + 18} y={l.y + 4} fontSize="12" fill={l.reds === tgt && l.num > 0 ? '#0c4a6e' : '#64748b'} fontWeight={l.reds === tgt && l.num > 0 ? 'bold' : 'normal'}>
                    {l.seq}: {l.num}/{den}
                    {l.num > 0 ? ` = ${frac(l.num, den)}` : ''}
                  </text>
                ))}
              </svg>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-sky-50 rounded-xl border border-sky-200 p-4 space-y-1">
                  <div className="font-bold text-sky-800">A fáról: a kiemelt utak összege</div>
                  <div>
                    {hitLeaves.length === 0 ? 'nincs ilyen út (lehetetlen esemény)' : hitLeaves.map((l) => `${l.num}/${den}`).join(' + ')}
                    {hitLeaves.length > 0 && ` = ${frac(hitNum, den)}`} ≈ <strong>{fmt(hitNum / den)}</strong>
                  </div>
                </div>
                <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1">
                  <div className="font-bold text-teal-800">Kombinációkkal (egyszerre húzva)</div>
                  <div>
                    ({reds} alatt {tgt}) · ({yellows} alatt {d - tgt}) / ({total} alatt {d}) = {combFav}/{combTot}
                    {combFav > 0 && ` = ${frac(combFav, combTot)}`} ≈ <strong>{fmt(combTot > 0 ? combFav / combTot : 0)}</strong>
                  </div>
                  <div className="text-xs text-slate-600">A két módszer mindig ugyanazt adja: egyszerre húzni ugyanaz, mint egymás után, visszatevés nélkül.</div>
                </div>
              </div>
            </>
          )}
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: hány „jó” elem lesz a mintában?" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">összes elem (n): {hn}</label>
              <input type="range" min={2} max={50} value={hn} onChange={(e) => setHn(Number(e.target.value))} className="w-full accent-teal-600" aria-label="összes elem" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">adott tulajdonságú elemek (m): {m2}</label>
              <input type="range" min={0} max={hn} value={m2} onChange={(e) => setHm(Number(e.target.value))} className="w-full accent-teal-600" aria-label="adott tulajdonságú elemek" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a minta elemszáma (k): {k2}</label>
              <input type="range" min={1} max={Math.min(hn, 10)} value={Math.min(k2, 10)} onChange={(e) => setHk(Number(e.target.value))} className="w-full accent-teal-600" aria-label="minta elemszáma" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {HYPER_PRESETS.map((p) => (
              <button
                key={p.t}
                onClick={() => {
                  setHn(p.n);
                  setHm(p.m);
                  setHk(p.k);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100"
              >
                {p.t}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 600 240" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
            <line x1="40" y1="200" x2="580" y2="200" stroke="#334155" />
            {dist.map((c, j) => {
              const bw = 520 / dist.length;
              const p = c / distTot;
              const h = (p / maxP) * 150;
              const x = 50 + j * bw;
              return (
                <g key={j}>
                  <rect x={x + bw * 0.15} y={200 - h} width={bw * 0.7} height={h} fill="#2dd4bf" stroke="#0f766e" />
                  <text x={x + bw / 2} y={194 - h} fontSize="10" textAnchor="middle" fill="#134e4a" fontWeight="bold">
                    {fmt(p, 3)}
                  </text>
                  <text x={x + bw / 2} y="216" fontSize="11" textAnchor="middle" fill="#334155">
                    {j}
                  </text>
                </g>
              );
            })}
            <text x="310" y="234" fontSize="11" textAnchor="middle" fill="#475569">
              j = az adott tulajdonságú elemek száma a mintában
            </text>
          </svg>
          <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 text-sm space-y-1">
            <div>
              P(j) = ({m2} alatt j) · ({hn - m2} alatt {k2} − j) / ({hn} alatt {k2}); összes eset: {distTot.toLocaleString('hu-HU')}
            </div>
            <div>
              a valószínűségek összege: <strong>{fmt(dist.reduce((s, c) => s + c, 0) / distTot, 6)}</strong>; a legvalószínűbb j: <strong>{dist.indexOf(Math.max(...dist))}</strong>
            </div>
            <div>
              várható érték (lásd a 9. leckét): E = k · m / n = {k2} · {m2} / {hn} ≈ <strong>{fmt(ev, 3)}</strong>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SamplingWithoutReplacementTheory;
