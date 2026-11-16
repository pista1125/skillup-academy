import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  PlaneShapesSvg,
  ParallelLinesSvg,
  AngleTypesSvg,
  RectSquareSvg,
  PolygonPartsSvg,
  DentShapesSvg,
  Polygons4RightMark
} from './Polygons4Figures';

type P = [number, number];

// ---------------------------------------------------------------------------
// Labor I – sokszög-elemző segédfüggvények
// ---------------------------------------------------------------------------
const cross3 = (a: P, b: P, c: P) => (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
const eq = (a: P, b: P) => a[0] === b[0] && a[1] === b[1];

const segIntersect = (p1: P, p2: P, p3: P, p4: P) => {
  const o = (a: P, b: P, c: P) => Math.sign((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]));
  const on = (a: P, b: P, c: P) =>
    Math.min(a[0], b[0]) <= c[0] && c[0] <= Math.max(a[0], b[0]) && Math.min(a[1], b[1]) <= c[1] && c[1] <= Math.max(a[1], b[1]);
  const o1 = o(p1, p2, p3);
  const o2 = o(p1, p2, p4);
  const o3 = o(p3, p4, p1);
  const o4 = o(p3, p4, p2);
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && on(p1, p2, p3)) return true;
  if (o2 === 0 && on(p1, p2, p4)) return true;
  if (o3 === 0 && on(p3, p4, p1)) return true;
  if (o4 === 0 && on(p3, p4, p2)) return true;
  return false;
};

const NAMES: Record<number, string> = { 3: 'háromszög', 4: 'négyszög', 5: 'ötszög', 6: 'hatszög', 7: 'hétszög', 8: 'nyolcszög' };
const polyName = (n: number) => NAMES[n] ?? `${n} oldalú sokszög`;

interface Analysis {
  ok: boolean;
  msg?: string;
  verts: P[];
  n: number;
  right: number[];
  dent: boolean;
  kind: string;
  removed: number;
}

const analyse = (raw: P[]): Analysis => {
  // egy egyenesbe eső pontok nem csúcsok
  let verts = [...raw];
  let removed = 0;
  let changed = true;
  while (changed && verts.length >= 3) {
    changed = false;
    for (let i = 0; i < verts.length; i++) {
      const a = verts[(i - 1 + verts.length) % verts.length];
      const b = verts[i];
      const c = verts[(i + 1) % verts.length];
      if (cross3(a, b, c) === 0) {
        verts = verts.filter((_, k) => k !== i);
        removed++;
        changed = true;
        break;
      }
    }
  }
  const n = verts.length;
  if (n < 3) return { ok: false, msg: 'Ez csak egy szakasz – nem sokszög. Kezdd újra!', verts, n, right: [], dent: false, kind: '', removed };
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const adjacent = j === i + 1 || (i === 0 && j === n - 1);
      if (adjacent) continue;
      if (segIntersect(verts[i], verts[(i + 1) % n], verts[j], verts[(j + 1) % n])) {
        return { ok: false, msg: 'Az oldalak keresztezik egymást – ez így nem sokszög. Kezdd újra!', verts, n, right: [], dent: false, kind: '', removed };
      }
    }
  }
  let area2 = 0;
  for (let i = 0; i < n; i++) area2 += verts[i][0] * verts[(i + 1) % n][1] - verts[(i + 1) % n][0] * verts[i][1];
  const orient = Math.sign(area2);
  const right: number[] = [];
  let dent = false;
  for (let i = 0; i < n; i++) {
    const a = verts[(i - 1 + n) % n];
    const b = verts[i];
    const c = verts[(i + 1) % n];
    const convex = Math.sign(cross3(a, b, c)) === orient;
    if (!convex) dent = true;
    const dot = (a[0] - b[0]) * (c[0] - b[0]) + (a[1] - b[1]) * (c[1] - b[1]);
    if (convex && dot === 0) right.push(i);
  }
  let kind = polyName(n);
  if (n === 4 && right.length === 4) {
    const s = verts.map((v, i) => {
      const w = verts[(i + 1) % n];
      return (v[0] - w[0]) ** 2 + (v[1] - w[1]) ** 2;
    });
    kind = s.every((x) => x === s[0]) ? 'négyzet' : 'téglalap';
  }
  return { ok: true, verts, n, right, dent, kind, removed };
};

const TASKS: { text: string; check: (a: Analysis) => boolean }[] = [
  { text: 'Rajzolj egy háromszöget!', check: (a) => a.n === 3 },
  { text: 'Rajzolj egy téglalapot, amely nem négyzet!', check: (a) => a.kind === 'téglalap' },
  { text: 'Rajzolj egy négyzetet!', check: (a) => a.kind === 'négyzet' },
  { text: 'Rajzolj egy négyszöget, amely nem téglalap!', check: (a) => a.n === 4 && a.kind === 'négyszög' },
  { text: 'Rajzolj egy ötszöget!', check: (a) => a.n === 5 },
  { text: 'Rajzolj egy beugró részes hatszöget!', check: (a) => a.n === 6 && a.dent }
];

const GX = 9;
const GY = 7;
const S = 40;
const OFF = 20;

// ---------------------------------------------------------------------------
// Labor II – átlóhúzó
// ---------------------------------------------------------------------------
const SHAPES = [3, 4, 5, 6, 8];
const regular = (n: number): P[] =>
  Array.from({ length: n }, (_, i) => {
    const t = -Math.PI / 2 + (i * 2 * Math.PI) / n + (n === 4 ? Math.PI / 4 : n === 8 ? Math.PI / 8 : 0);
    return [150 + 105 * Math.cos(t), 125 + 105 * Math.sin(t)] as P;
  });

export const Polygons4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [path, setPath] = useState<P[]>([]);
  const [closed, setClosed] = useState(false);
  const [note, setNote] = useState<string>('');
  const [task, setTask] = useState(0);
  const analysis = useMemo(() => (closed ? analyse(path) : null), [closed, path]);
  const solved = analysis?.ok ? TASKS[task].check(analysis) : false;

  const clickPoint = (p: P) => {
    if (closed) return;
    setNote('');
    if (path.length >= 3 && eq(p, path[0])) {
      setClosed(true);
      return;
    }
    if (path.some((q) => eq(q, p))) {
      setNote('Ezt a pontot már használtad. A sokszöget az első pontra kattintva zárhatod be.');
      return;
    }
    setPath((ps) => [...ps, p]);
  };
  const reset = () => {
    setPath([]);
    setClosed(false);
    setNote('');
  };

  // Labor II
  const [n, setN] = useState(5);
  const [sel, setSel] = useState<number | null>(null);
  const [diags, setDiags] = useState<string[]>([]);
  const [msg2, setMsg2] = useState('Válassz egy csúcsot, aztán kattints egy másik csúcsra!');
  const poly = regular(n);
  const total = (n * (n - 3)) / 2;

  const pickShape = (k: number) => {
    setN(k);
    setSel(null);
    setDiags([]);
    setMsg2(k === 3 ? 'Próbálj átlót húzni a háromszögben!' : 'Válassz egy csúcsot, aztán kattints egy másik csúcsra!');
  };
  const clickVertex = (i: number) => {
    if (sel === null) {
      setSel(i);
      setMsg2(`A(z) ${i + 1}. csúcsot választottad. Kattints egy nem szomszédos csúcsra!`);
      return;
    }
    if (sel === i) {
      setSel(null);
      setMsg2('Válassz egy csúcsot!');
      return;
    }
    const d = Math.abs(sel - i);
    if (d === 1 || d === n - 1) {
      setMsg2(
        n === 3
          ? 'A háromszögben minden csúcs szomszédos – ez oldal. A háromszögnek nincs átlója!'
          : 'Ez a két csúcs szomszédos – ezt a szakaszt oldalnak hívjuk, nem átlónak.'
      );
      return;
    }
    const key = `${Math.min(sel, i)}-${Math.max(sel, i)}`;
    if (diags.includes(key)) {
      setMsg2('Ezt az átlót már megrajzoltad.');
      return;
    }
    const next = [...diags, key];
    setDiags(next);
    setMsg2(next.length === total ? `Kész! A(z) ${polyName(n)} összes átlója: ${total}.` : 'Szép! Ez egy átló. Keress még!');
  };
  const fromSel = sel === null ? 0 : diags.filter((k) => k.split('-').map(Number).includes(sel)).length;

  const btn = 'min-h-[48px] px-4 rounded-xl font-bold border-2 transition active:scale-95';

  return (
    <TheoryTemplate
      topicId="g4-shapes-solids"
      subtopicId="sikidomok-sokszogek"
      grade={4}
      chapterId="sikidomok-testek"
      title="1. Síkidomok, sokszögek"
      subtitle="Háromszög, négyszög, ötszög… Mitől lesz egy síkidom sokszög? Mi a téglalap és a négyzet? Mi az átló?"
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • TANANYAG"
      themeColor="emerald"
      pdfFilename="4_osztaly_sikidomok_sokszogek_tananyag.pdf"
      practiceTitle="Készen állsz a sokszöges feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SOKSZÖGEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="text-base font-black text-emerald-900 dark:text-emerald-200">
                A sokszöget csak egyenes szakaszok határolják. Ahány csúcsa van, annyi oldala van.
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Téglalap:</strong> olyan négyszög, amelynek minden szöge derékszög.
              </li>
              <li>
                <strong>Négyzet:</strong> olyan téglalap, amelynek minden oldala egyenlő hosszú.
              </li>
              <li>
                <strong>Átló:</strong> két nem szomszédos csúcsot összekötő szakasz.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk? Síkidomok és sokszögek" badge="Tankönyv 112. o." badgeColor="emerald">
        <PlaneShapesSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Síkidom" badge="lapos alakzat" badgeColor="orange">
            <p className="text-sm text-slate-700 leading-relaxed">
              A síkidomokat egyenes vagy görbe vonal határolhatja. A kör és a „pizzaszelet” is síkidom.
            </p>
          </TheoryCard>
          <TheoryCard title="Sokszög" badge="csak egyenes oldalak" badgeColor="rose">
            <p className="text-sm text-slate-700 leading-relaxed">
              A sokszöget <strong>csak egyenes szakaszok</strong> határolják. Ilyen a háromszög, a négyszög, az ötszög, a hatszög. A kör nem sokszög!
            </p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Sokszög', 'Csúcsok száma', 'Oldalak száma']}
          rows={[
            ['háromszög', '3', '3'],
            ['négyszög', '4', '4'],
            ['ötszög', '5', '5'],
            ['hatszög', '6', '6'],
            ['nyolcszög', '8', '8']
          ]}
        />
        <TheoryCallout type="info" title="Igaz vagy hamis? (Munkafüzet 26. o.)">
          Igaz: <strong>Minden sokszög síkidom.</strong> Igaz: <strong>Minden téglalap négyszög.</strong> Hamis: „Minden síkidom sokszög.” – a kör síkidom, de nem sokszög.
        </TheoryCallout>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Van beugró része – nincs beugró része" badge="Tankönyv 112. o." badgeColor="rose">
        <DentShapesSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Manó két csoportba válogatta a síkidomokat. Az L betű vagy a nyílhegy alakú sokszögnek <strong>van beugró része</strong>: az egyik sarka befelé mutat. A háromszögnek, a téglalapnak, a szabályos hatszögnek <strong>nincs beugró része</strong>.
        </p>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Párhuzamos egyenesek" badge="Tankönyv 113–114. o." badgeColor="amber">
        <ParallelLinesSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>
            Hajts félbe egy írólapot, majd még egyszer félbe! Nyisd ki: a hajtásvonalak <strong>párhuzamos egyenesek</strong>. Akármeddig hosszabbítanád őket, sosem találkoznának.
          </p>
          <p>Párhuzamos vonalakat látsz a létrán, a sínen, a kottában és a könyvespolcon is.</p>
          <p>
            A téglalap szemközti oldalai párhuzamosak. Van olyan négyszög is, amelynek csak két oldala párhuzamos (például a „lefelé keskenyedő” vödör alakú négyszög).
          </p>
        </div>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. A derékszög" badge="Tankönyv 114–115. o." badgeColor="teal">
        <AngleTypesSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Hajtogass derékszöget!" badge="hajtogatás" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Hajts össze egy tetszőleges alakú lapot, majd a hajtásvonal mentén hajtsd össze újra! A sarkon <strong>derékszöget</strong> kapsz. Ezzel mérheted, hogy egy szög derékszög, kisebb vagy nagyobb nála.
            </p>
          </TheoryCard>
          <TheoryCard title="Derékszög az órán" badge="óra" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>3 órakor</strong> és <strong>9 órakor</strong> a kis- és a nagymutató derékszöget zár be. 6 órakor egy egyenesbe esnek, 12 órakor egymáson vannak.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Így jelöljük a derékszöget">
          A derékszöget egy kis negyedkörívvel és benne egy ponttal jelöljük – így látod a tankönyvben is.
        </TheoryCallout>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. A téglalap és a négyzet" badge="Tankönyv 115. o." badgeColor="sky">
        <RectSquareSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Téglalap" badge="4 derékszög" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              A téglalap olyan négyszög, amelynek <strong>minden szöge derékszög</strong>. Szemközti oldalai egyenlő hosszúak és párhuzamosak.
            </p>
          </TheoryCard>
          <TheoryCard title="Négyzet" badge="4 egyenlő oldal" badgeColor="rose">
            <p className="text-sm text-slate-700 leading-relaxed">
              A négyzet olyan téglalap, amelynek <strong>minden oldala egyenlő hosszú</strong>. Tehát minden négyzet téglalap is!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Csúcs, oldal, átló" badge="Tankönyv 116. o., Munkafüzet 28. o." badgeColor="orange">
        <PolygonPartsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Két <strong>nem szomszédos</strong> csúcsot összekötő szakasz az <strong>átló</strong>. Egy négyzet alakú lapot kétszer átlósan félbehajtva a négyzet két átlóját kapod. A téglalap szemközti csúcsait is átlók kötik össze.
        </p>
        <TheoryTable
          headers={['Sokszög', 'Átló egy csúcsból', 'Összes átló']}
          rows={[
            ['háromszög', '0', '0 – nincs átlója'],
            ['négyszög', '1', '2'],
            ['ötszög', '2', '5'],
            ['hatszög', '3', '9']
          ]}
        />
        <TheoryCallout type="info" title="Miért nincs a háromszögnek átlója?">
          A háromszög minden csúcsa szomszédos a másik kettővel. Bármelyik két csúcsot kötöd össze, oldalt kapsz.
        </TheoryCallout>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Téglalap, de nem négyzet (Tankönyv 9. feladat)" badge="1. példa" badgeColor="amber">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>Először nézd meg a szögeket: mind a 4 derékszög? Ha igen, téglalap.</li>
              <li>Utána nézd meg az oldalakat: egyenlő hosszúak? Ha igen, négyzet.</li>
              <li>A 3 · 3-as négyzet is téglalap, de a 3 · 5-ös téglalap nem négyzet.</li>
              <li>A „ferde” négyszögnek nincs derékszöge, ezért négyszög, de nem téglalap.</li>
            </ol>
          </TheoryCard>
          <TheoryCard title="B) Hány átló húzható az ötszög egy csúcsából?" badge="2. példa" badgeColor="emerald">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>Az ötszögnek 5 csúcsa van.</li>
              <li>A kiválasztott csúccsal nem köthetjük össze önmagát és a 2 szomszédját.</li>
              <li>Marad 5 − 3 = 2 csúcs, tehát egy csúcsból <strong>2 átló</strong> húzható.</li>
              <li>Mind az 5 csúcsból 2: 5 · 2 = 10, de így minden átlót kétszer számoltunk: 10 : 2 = <strong>5 átló</strong>.</li>
            </ol>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="C) Tűz-víz játék a szobában (Tankönyv 10. feladat)">
          A négyzet alakú szoba északkeleti sarkában van a kör. A háromszög a körtől legmesszebb, vagyis a <strong>délnyugati</strong> sarokban van. A körtől délre a négyzet: <strong>délkeleti</strong> sarok. A háromszögtől északra a téglalap: <strong>északnyugati</strong> sarok.
        </TheoryCallout>
      </TheorySection>

      {/* 8 */}
      <TheorySection title="8. Vigyázz! Egyenlő oldalak még nem elegek" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Négyzet-e a „ferde” négyszög?"
          wrong="Ennek a négyszögnek mind a 4 oldala egyenlő hosszú, tehát négyzet."
          wrongExplanation="A négyzetnek nemcsak egyenlő oldalai vannak, hanem minden szöge derékszög is. A ferde négyszögnek nincs derékszöge."
          correct="Négyzet = minden szöge derékszög ÉS minden oldala egyenlő hosszú."
          correctExplanation="Először a derékszögeket ellenőrizd (hajtogatott derékszöggel vagy derékszögű vonalzóval), utána az oldalakat."
          tip="Fordítva is figyelj: minden négyzet téglalap, de nem minden téglalap négyzet."
        />
      </TheorySection>

      {/* 9 Labor I */}
      <TheorySection title="9. Labor I: Sokszög-rajzoló a pontrácson" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-base font-bold text-emerald-900">Feladat: {TASKS[task].text}</p>
            <button
              onClick={() => {
                setTask((t) => (t + 1) % TASKS.length);
                reset();
              }}
              className={`${btn} bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100`}
            >
              Új feladat
            </button>
          </div>
          <p className="text-sm text-slate-600">
            Kattints a pontokra sorban! A sokszöget az <strong>első pontra</strong> kattintva zárod be.
          </p>
          <svg viewBox={`0 0 ${(GX - 1) * S + 2 * OFF} ${(GY - 1) * S + 2 * OFF}`} className="w-full max-w-lg mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200 touch-manipulation">
            {path.length > 0 && (
              <>
                {closed ? (
                  <polygon
                    points={path.map(([x, y]) => `${OFF + x * S},${OFF + y * S}`).join(' ')}
                    fill={analysis?.ok ? (solved ? '#86efac' : '#bae6fd') : '#fecaca'}
                    fillOpacity="0.8"
                    stroke="#0f172a"
                    strokeWidth="3"
                  />
                ) : (
                  <polyline points={path.map(([x, y]) => `${OFF + x * S},${OFF + y * S}`).join(' ')} fill="none" stroke="#0f766e" strokeWidth="3" />
                )}
              </>
            )}
            {closed &&
              analysis?.ok &&
              analysis.right.map((i) => {
                const vs = analysis.verts;
                const k = vs.length;
                const tr = (p: P): P => [OFF + p[0] * S, OFF + p[1] * S];
                return <Polygons4RightMark key={i} v={tr(vs[i])} a={tr(vs[(i + 1) % k])} b={tr(vs[(i - 1 + k) % k])} r={12} color="#b91c1c" />;
              })}
            {Array.from({ length: GY }, (_, y) =>
              Array.from({ length: GX }, (_, x) => {
                const idx = path.findIndex((q) => q[0] === x && q[1] === y);
                const first = idx === 0;
                return (
                  <g key={`${x}-${y}`} onClick={() => clickPoint([x, y])} style={{ cursor: closed ? 'default' : 'pointer' }}>
                    <circle cx={OFF + x * S} cy={OFF + y * S} r="16" fill="transparent" />
                    <circle
                      cx={OFF + x * S}
                      cy={OFF + y * S}
                      r={idx >= 0 ? 7 : 4}
                      fill={first && !closed ? '#f97316' : idx >= 0 ? '#0f766e' : '#94a3b8'}
                    />
                  </g>
                );
              })
            )}
          </svg>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setPath((ps) => ps.slice(0, -1));
                setClosed(false);
              }}
              disabled={path.length === 0}
              className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-100 disabled:opacity-40`}
            >
              Visszavonás
            </button>
            <button
              onClick={() => path.length >= 3 && setClosed(true)}
              disabled={path.length < 3 || closed}
              className={`${btn} bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700 disabled:opacity-40`}
            >
              Bezárom
            </button>
            <button onClick={reset} className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-100`}>
              Újrakezdés
            </button>
          </div>
          {note && <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-sm font-semibold text-center">{note}</div>}
          {closed && analysis && (
            <div className={`p-4 rounded-xl text-center space-y-1 ${!analysis.ok ? 'bg-rose-50 text-rose-900' : solved ? 'bg-emerald-50 text-emerald-900' : 'bg-sky-50 text-sky-900'}`}>
              {!analysis.ok ? (
                <p className="font-bold">{analysis.msg}</p>
              ) : (
                <>
                  <p className="text-lg font-black">
                    Ez egy {analysis.kind}! {analysis.n} csúcsa és {analysis.n} oldala van.
                  </p>
                  <p className="text-sm">
                    Derékszögeinek száma: <strong>{analysis.right.length}</strong> (piros jel). {analysis.dent ? 'Van beugró része.' : 'Nincs beugró része.'}
                  </p>
                  {analysis.removed > 0 && <p className="text-xs">Egy-egy pont egy egyenesre esett a szomszédaival – az nem csúcs.</p>}
                  <p className="font-bold">{solved ? 'Ügyes vagy, teljesítetted a feladatot!' : 'Ez nem egészen az, amit kértünk. Próbáld újra!'}</p>
                </>
              )}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 10 Labor II */}
      <TheorySection title="10. Labor II: Átlóhúzó" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {SHAPES.map((k) => (
              <button
                key={k}
                onClick={() => pickShape(k)}
                className={`${btn} ${n === k ? 'bg-orange-500 text-white border-orange-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-orange-50'}`}
              >
                {polyName(k)}
              </button>
            ))}
          </div>
          <svg viewBox="0 0 300 250" className="w-full max-w-sm mx-auto h-auto bg-orange-50/40 rounded-xl border border-orange-200 touch-manipulation">
            <polygon points={poly.map((p) => p.join(',')).join(' ')} fill="#fff7ed" stroke="#334155" strokeWidth="3" />
            {diags.map((k) => {
              const [a, b] = k.split('-').map(Number);
              return <line key={k} x1={poly[a][0]} y1={poly[a][1]} x2={poly[b][0]} y2={poly[b][1]} stroke="#dc2626" strokeWidth="3" />;
            })}
            {poly.map((p, i) => (
              <g key={i} onClick={() => clickVertex(i)} style={{ cursor: 'pointer' }}>
                <circle cx={p[0]} cy={p[1]} r="18" fill="transparent" />
                <circle cx={p[0]} cy={p[1]} r={sel === i ? 11 : 8} fill={sel === i ? '#f97316' : '#0f172a'} stroke="#fff" strokeWidth="2" />
              </g>
            ))}
          </svg>
          <div className="p-3 rounded-xl bg-orange-50 text-orange-900 text-center font-semibold">{msg2}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500">Megrajzolt átlók</div>
              <div className="text-2xl font-black text-slate-800">
                {diags.length} / {total}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs text-slate-500">A kiválasztott csúcsból</div>
              <div className="text-2xl font-black text-slate-800">{sel === null ? '–' : `${fromSel} / ${Math.max(n - 3, 0)}`}</div>
            </div>
          </div>
          <TheoryCallout type="tip" title="Figyeld meg!">
            Egy csúcsból mindig 3-mal kevesebb átló húzható, mint ahány csúcsa van a sokszögnek: önmagával és a két szomszédjával nem kötheted össze.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Polygons4Theory;
