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
  SameGraphTwoDrawingsSvg,
  GraphTermsSvg,
  FourFriendsCycleSvg,
  VillageRoadsSvg,
  ChessFinalGraphSvg
} from './GraphPropertiesFigures';

const LABELS = 'ABCDEFGH';
const MAX_V = 8;

const circlePos = (i: number, n: number, cx = 170, cy = 140, r = 105) => {
  const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

const edgeKey = (i: number, j: number) => (i < j ? `${i}-${j}` : `${j}-${i}`);

/** Havel–Hakimi: ha a sorozat egyszerű gráf fokszámsorozata, visszaad egy élhalmazt, különben null-t. */
const havelHakimi = (degs: number[]): [number, number][] | null => {
  const rem = degs.map((d, i) => ({ i, d }));
  const edges: [number, number][] = [];
  for (;;) {
    rem.sort((a, b) => b.d - a.d || a.i - b.i);
    if (rem.length === 0 || rem[0].d === 0) return edges;
    const top = rem.shift()!;
    if (top.d > rem.length) return null;
    for (let k = 0; k < top.d; k++) {
      rem[k].d -= 1;
      if (rem[k].d < 0) return null;
      edges.push([top.i, rem[k].i]);
    }
  }
};

type Preset = { name: string; n: number; edges: [number, number][]; loops?: number[] };

const PRESETS: Preset[] = [
  { name: '4 ismerős (Feladat 4.)', n: 4, edges: [[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name: 'Sakkdöntő (HF 1.)', n: 5, edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [3, 4]] },
  {
    name: 'Teljes gráf, 5 csúcs',
    n: 5,
    edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
  },
  { name: 'Hurokéllel', n: 4, edges: [[0, 1], [0, 2], [1, 2]], loops: [3] }
];

export const GraphPropertiesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: gráfszerkesztő
  const [n, setN] = useState<number>(5);
  const [edges, setEdges] = useState<Set<string>>(() => new Set(['0-1', '1-2', '2-3']));
  const [loops, setLoops] = useState<Set<number>>(() => new Set());
  const [selected, setSelected] = useState<number | null>(null);

  // Labor II: fokszámsorozat-ellenőrző
  const [seqText, setSeqText] = useState<string>('1, 1, 1, 2, 3, 4');

  const degrees = useMemo(() => {
    const d = Array.from({ length: n }, () => 0);
    edges.forEach((k) => {
      const [a, b] = k.split('-').map(Number);
      if (a < n && b < n) {
        d[a] += 1;
        d[b] += 1;
      }
    });
    loops.forEach((v) => {
      if (v < n) d[v] += 2;
    });
    return d;
  }, [n, edges, loops]);
  const edgeCount = edges.size + loops.size;
  const degSum = degrees.reduce((s, x) => s + x, 0);
  const oddCount = degrees.filter((x) => x % 2 === 1).length;

  const clickVertex = (i: number) => {
    if (selected === null) {
      setSelected(i);
      return;
    }
    if (selected === i) {
      setSelected(null);
      return;
    }
    const k = edgeKey(selected, i);
    setEdges((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
    setSelected(null);
  };

  const toggleLoop = () => {
    if (selected === null) return;
    const v = selected;
    setLoops((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  };

  const addVertex = () => setN((x) => Math.min(MAX_V, x + 1));
  const removeVertex = () => {
    if (n <= 2) return;
    const last = n - 1;
    setEdges((prev) => new Set([...prev].filter((k) => !k.split('-').map(Number).includes(last))));
    setLoops((prev) => new Set([...prev].filter((v) => v !== last)));
    setSelected(null);
    setN(n - 1);
  };
  const clearAll = () => {
    setEdges(new Set());
    setLoops(new Set());
    setSelected(null);
  };
  const loadPreset = (p: Preset) => {
    setN(p.n);
    setEdges(new Set(p.edges.map(([a, b]) => edgeKey(a, b))));
    setLoops(new Set(p.loops ?? []));
    setSelected(null);
  };

  // Labor II számítások
  const lab2 = useMemo(() => {
    const parts = seqText
      .split(/[,;\s]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const nums = parts.map((s) => Number(s));
    if (nums.length === 0) return { ok: false as const, msg: 'Adj meg legalább egy fokszámot!' };
    if (nums.some((x) => !Number.isInteger(x) || x < 0))
      return { ok: false as const, msg: 'A fokszámok nemnegatív egész számok.' };
    if (nums.length > MAX_V) return { ok: false as const, msg: `Legfeljebb ${MAX_V} csúcsot adj meg!` };
    const sum = nums.reduce((s, x) => s + x, 0);
    const m = nums.length;
    if (sum % 2 === 1)
      return {
        ok: false as const,
        nums,
        sum,
        msg: `A fokszámok összege ${sum}, páratlan. Mivel a fokszámok összege mindig az élek számának kétszerese, ilyen gráf NINCS (hurokélekkel sem).`
      };
    const tooBig = nums.find((x) => x > m - 1);
    if (tooBig !== undefined)
      return {
        ok: false as const,
        nums,
        sum,
        msg: `Egy ${m} csúcsú egyszerű gráfban (hurokél és többszörös él nélkül) egy csúcs legfeljebb ${m - 1} másikkal lehet összekötve, a ${tooBig} túl nagy. (Hurokélekkel már lerajzolható lenne.)`
      };
    const hh = havelHakimi(nums);
    if (!hh)
      return {
        ok: false as const,
        nums,
        sum,
        msg: `Az összeg (${sum}) páros, mégsincs ilyen egyszerű gráf: a nagy fokszámú csúcsok miatt a kis fokszámúak „túl sok” élt kapnának. (Hurokélekkel vagy többszörös élekkel lerajzolható lenne.)`
      };
    return { ok: true as const, nums, sum, edges: hh };
  }, [seqText]);

  return (
    <TheoryTemplate
      topicId="g11-kombinatorika-grafok"
      subtopicId="grafok-jellemzoi"
      title="8. Gráfok jellemzői"
      subtitle="A londoni metrótérképtől az ismeretségi hálókig: csúcsok, élek, fokszámok – és miért mindegy, hogyan rajzoljuk le a gráfot."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_grafok_jellemzoi_tananyag.pdf"
      practiceTitle="Készen állsz a gráfos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — CSÚCS, ÉL, FOKSZÁM',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
                csúcs = elem · él = kapcsolat · fokszám = a csúcsból kiinduló élek száma
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Egy gráf sokféleképpen lerajzolható – csak az számít, <strong>melyik csúcs melyikkel</strong> van összekötve.</li>
              <li>Az él mindig <strong>csúcstól csúcsig</strong> tart; két él metszéspontja nem csúcs.</li>
              <li>A <strong>hurokél</strong> (kezdő- és végpontja azonos) a csúcs fokszámát <strong>2-vel</strong> növeli.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: Harry Beck metrótérképe" badge="Tankönyv 70. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              1931-ben a londoni metrótársaság fiatal mérnöke, <strong>Harry Beck</strong> olyan metrótérképet mutatott be, amely nem a valós távolságokat és nem az igazi várostérképet mutatta. Először elutasították – 1933-ban kísérletképpen 500 példányban kinyomtatták, és egy óra alatt elfogyott.
            </p>
            <p>
              Beck felismerte: a föld alatt utazót nem az érdekli, merre halad pontosan a metró, hanem az, <strong>hol kell átszállni</strong>, és <strong>hányadik megállónál kell leszállni</strong>. Ez a gondolat a gráfok lényege: csak a <strong>kapcsolatok</strong> számítanak.
            </p>
          </div>
          <SameGraphTwoDrawingsSvg />
        </div>
      </TheorySection>

      {/* 2. Fogalmak */}
      <TheorySection title="2. A gráfok jellemzői" badge="Elmélet" badgeColor="indigo">
        <p className="text-sm text-slate-700 leading-relaxed">
          A gráfok olyan helyzetek szemléltetésében segítenek, amikor az a fontos, hogy egy halmaz <strong>mely elemei között van kapcsolat</strong>: ismeretségek (rokoni, baráti, munkatársi kapcsolatok, közösségi oldalak, családfa), térképek és utak, repülőjáratok, munkafolyamatok, logisztika, mérkőzések és bajnokságok, kémiai kötések, színezési problémák.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TheoryTable
            headers={['Fogalom', 'Jelentés']}
            rows={[
              ['Csúcsok', 'a gráf pontjai – a halmaz elemeit jelzik'],
              ['Élek', 'a csúcsokat összekötő vonalak – az elemek közötti kapcsolatokat szemléltetik'],
              ['Csúcs fokszáma', 'az adott csúcsból kiinduló élek száma'],
              ['Hurokél', 'olyan él, amelynek kezdő- és végpontja azonos; a fokszámot 2-vel növeli'],
              ['Izolált csúcs', 'olyan csúcs, amelyből nem indul él (fokszáma 0)']
            ]}
          />
          <GraphTermsSvg />
        </div>
        <TheoryCallout type="info" title="Megjegyzések a rajzoláshoz">
          Egy gráf sokféle módon lerajzolható: az élek lehetnek szakaszok vagy görbe vonalak, csak az a fontos, hogy melyik csúcs melyik csúccsal van összekötve. Érdemes szemléletes, áttekinthető elrendezést választani. Az él mindig csúcstól csúcsig tart – nem lehet olyan él, amelynek valamelyik vége nem csúcsba érkezik.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Feladatok */}
      <TheorySection title="3. Érettségi feladatok megoldással" badge="Feladatok" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Négytagú csoport, 2-2 ismerős (2009)" badge="Feladat 4." badgeColor="sky">
            <FourFriendsCycleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>4 csúcs (a tagok), minden csúcs fokszáma 2.</li>
              <li>Az élek száma: 4 · 2 / 2 = 4 (minden ismeretséget két tag „számol”).</li>
              <li>Egy megoldás: A–B–C–D–A, egy „négyszög”. Bármely más ilyen gráf ugyanez, csak a betűk vagy a rajz más.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Öt falu, négy út (2008)" badge="Feladat 2." badgeColor="orange">
            <VillageRoadsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Két út már kész; a két új útnak úgy kell összekötnie a „darabokat”, hogy mindenhonnan mindenhová el lehessen jutni.</li>
              <li>5 falunál 4 út csak akkor elég, ha nem zár be kört – minden új út két, addig külön lévő részt köt össze.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Két él berajzolása (2010)" badge="Feladat 3." badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Cél: a hatpontú gráf minden csúcsából 2 él induljon ki.</li>
              <li>Módszer: írd a csúcsok mellé a jelenlegi fokszámot! Azok a csúcsok kapnak új élt, amelyek fokszáma 2-nél kisebb.</li>
              <li>2 új él a fokszámok összegét 4-gyel növeli; a végén az összeg 6 · 2 = 12, vagyis 6 él lesz a gráfban.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Sakkdöntő (2005)" badge="HF 1." badgeColor="rose">
            <ChessFinalGraphSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Az 5 versenyzőből A mindenkit ismer (fokszám 4); B, C, D, E 2-2 embert, az egyik mindig A. A maradék egy-egy ismeretség párokba rendezi őket, pl. B–C és D–E. Összesen (4 + 4 · 2) / 2 = <strong>6 ismeretség</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="A múzeum termei (2019 alapján)" badge="Feladat 5." badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A gráf csúcsai a termek, élei az átjárók (egy él = egy átjáró két terem között).</li>
              <li><strong>b)</strong> „Minden termen pontosan egyszer” – a <strong>csúcsokat</strong> kell bejárni.</li>
              <li><strong>c)</strong> „Minden ajtón pontosan egyszer” – az <strong>éleket</strong> kell bejárni; ehhez a fokszámok vizsgálata segít (9. lecke és Euler-vonalak).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Rajzolj gráfot! (HF 3–4.)" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>6 csúcs, fokszámösszeg 16 ⇒ 8 él kell.</li>
              <li>6 csúcs, fokszámok 1, 1, 1, 2, 3, 4 ⇒ összeg 12, 6 él – lerajzolható.</li>
              <li>5 csúcs, fokszámok 4, 3, 3, 2, 2 ⇒ összeg 14, 7 él – lerajzolható.</li>
              <li>7 él, minden fokszám ≤ 3: 6 csúcsnál összeg 14 ≤ 18, 5 csúcsnál 14 ≤ 15 – mindkettő lehetséges.</li>
              <li>Próbáld ki a II. laboratóriumban!</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: két él metszéspontja nem csúcs" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A rajz tulajdonságait a gráf tulajdonságainak hisszük"
          wrong="„Az A–C és B–D él keresztezi egymást, tehát ott van egy ötödik csúcs, és a két rajz két különböző gráf.”"
          wrongExplanation="A csúcsokat mi jelöljük ki (vastag pont), az élek keresztezése csak a rajz sajátossága. Ugyanaz a gráf rajzolható keresztezéssel és anélkül is."
          correct="Két rajz ugyanazt a gráfot ábrázolja, ha ugyanazok a csúcsok és ugyanazok a csúcspárok vannak összekötve."
          correctExplanation="A négyszög (A–B–C–D–A) és a „csokornyakkendő” alakú rajz is 4 csúcsú, 4 élű gráf, minden fokszám 2."
          tip="Hurokél esetén se feledd: a csúcs fokszámát 2-vel növeli, mert az él mindkét vége ott van."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Gráfszerkesztő" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-600">
            Kattints egy csúcsra (kijelölés), majd egy másikra: az él létrejön vagy törlődik. Kijelölt csúcsnál hurokélt is tehetsz.
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={addVertex} disabled={n >= MAX_V} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 disabled:opacity-40">
              + csúcs
            </button>
            <button onClick={removeVertex} disabled={n <= 2} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 disabled:opacity-40">
              − csúcs
            </button>
            <button onClick={toggleLoop} disabled={selected === null} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-800 hover:bg-rose-200 disabled:opacity-40">
              hurokél a kijelölt csúcson
            </button>
            <button onClick={clearAll} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
              élek törlése
            </button>
            {PRESETS.map((p) => (
              <button key={p.name} onClick={() => loadPreset(p)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-100 text-sky-800 hover:bg-sky-200">
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <svg viewBox="0 0 340 280" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" role="img" aria-label="gráfszerkesztő">
              {[...edges].map((k) => {
                const [a, b] = k.split('-').map(Number);
                if (a >= n || b >= n) return null;
                const pa = circlePos(a, n);
                const pb = circlePos(b, n);
                return <line key={k} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="#0f766e" strokeWidth="3" />;
              })}
              {[...loops].map((v) => {
                if (v >= n) return null;
                const p = circlePos(v, n);
                const dx = p.x - 170;
                const dy = p.y - 140;
                const l = Math.hypot(dx, dy) || 1;
                return <circle key={`loop-${v}`} cx={p.x + (16 * dx) / l} cy={p.y + (16 * dy) / l} r="14" fill="none" stroke="#dc2626" strokeWidth="2.5" />;
              })}
              {Array.from({ length: n }, (_, i) => {
                const p = circlePos(i, n);
                const isSel = selected === i;
                return (
                  <g key={i} onClick={() => clickVertex(i)} style={{ cursor: 'pointer' }} data-testid={`vertex-${i}`}>
                    <circle cx={p.x} cy={p.y} r="15" fill={isSel ? '#f59e0b' : '#10b981'} stroke="#ffffff" strokeWidth="3" />
                    <text x={p.x} y={p.y + 4.5} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#ffffff">
                      {LABELS[i]}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="space-y-3">
              <TheoryTable
                headers={['Csúcs', 'Fokszám']}
                rows={degrees.map((d, i) => [LABELS[i], <span key={i} className={d % 2 === 1 ? 'font-bold text-rose-700' : 'font-bold text-emerald-700'}>{d}</span>])}
              />
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>csúcsok: {n}, élek: {edgeCount}{loops.size > 0 ? ` (ebből hurokél: ${loops.size})` : ''}</div>
                <div>fokszámok összege: {degrees.join(' + ')} = {degSum}</div>
                <div>
                  2 · élek száma = 2 · {edgeCount} = {2 * edgeCount}{' '}
                  <strong className={degSum === 2 * edgeCount ? 'text-emerald-700' : 'text-rose-700'}>
                    {degSum === 2 * edgeCount ? '✓ egyenlő' : '✗'}
                  </strong>
                </div>
                <div>páratlan fokszámú csúcsok száma: {oddCount} (mindig páros!)</div>
              </div>
            </div>
          </div>
          <TheoryCallout type="tip" title="Mit veszel észre?">
            Bármilyen gráfot rajzolsz, a fokszámok összege mindig az élek számának kétszerese – minden él két csúcsnál számít bele (a hurokél ugyanannál a csúcsnál kétszer). Ez a 9. lecke tétele.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Létezik ilyen gráf?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Fokszámok (vesszővel elválasztva, legfeljebb 8 csúcs)</label>
            <input
              type="text"
              value={seqText}
              onChange={(e) => setSeqText(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-mono"
              aria-label="fokszámsorozat"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {['1, 1, 1, 2, 3, 4', '4, 3, 3, 2, 2', '1, 2, 2, 2, 3, 3', '3, 3, 3, 3, 3, 3, 3', '2, 2, 2, 2, 2, 2, 2', '3, 3, 3, 1', '4, 2, 2, 2'].map((s) => (
              <button key={s} onClick={() => setSeqText(s)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200">
                {s}
              </button>
            ))}
          </div>
          {lab2.ok ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <svg viewBox="0 0 340 280" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" role="img" aria-label="megszerkesztett gráf">
                {lab2.edges.map(([a, b], idx) => {
                  const pa = circlePos(a, lab2.nums.length);
                  const pb = circlePos(b, lab2.nums.length);
                  return <line key={idx} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} stroke="#7c3aed" strokeWidth="3" />;
                })}
                {lab2.nums.map((d, i) => {
                  const p = circlePos(i, lab2.nums.length);
                  return (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="15" fill="#8b5cf6" stroke="#ffffff" strokeWidth="3" />
                      <text x={p.x} y={p.y + 4.5} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#ffffff">
                        {d}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-sm text-emerald-900 space-y-1">
                <div className="font-bold">Van ilyen gráf! ✓</div>
                <div>fokszámösszeg: {lab2.sum} (páros) ⇒ élek száma: {lab2.sum} / 2 = {lab2.sum / 2}</div>
                <div>A csúcsokba a fokszámukat írtuk. A program a legnagyobb fokszámú csúcsot köti össze a következő legnagyobbakkal, és ezt ismétli.</div>
              </div>
            </div>
          ) : (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm text-rose-900 space-y-1">
              <div className="font-bold">Nincs ilyen egyszerű gráf ✗</div>
              <div>{lab2.msg}</div>
            </div>
          )}
          <TheoryCallout type="success" title="Próbáld ki!">
            7 csúcs, mindegyik fokszáma 3 ⇒ összeg 21, páratlan: nincs ilyen gráf. 7 csúcs, mindegyik fokszáma 2 ⇒ egy hétszög. A 3, 3, 3, 1 sorozat összege páros, mégsem rajzolható le hurok- és többszörös él nélkül.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GraphPropertiesTheory;
