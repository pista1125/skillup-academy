import React, { useRef, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  VectorConceptSvg,
  CrosswindLandingSvg,
  ChainMethodSvg,
  ParallelogramMethodSvg,
  GridSumCommutativeSvg,
  TrapezoidVectorSumSvg,
  G11VectorAdditionArrow,
  G11VectorAdditionLabel
} from './G11VectorAdditionFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d);
  return (Number(s) === 0 ? (0).toFixed(d) : s).replace('.', ',').replace('-', '−');
};

/** Rácsvektor hossza „√n ≈ …” alakban (teljes négyzetnél egész szám). */
const lenStr = (x: number, y: number) => {
  const n = x * x + y * y;
  const r = Math.round(Math.sqrt(n));
  if (r * r === n) return String(r);
  return `√${n} ≈ ${fmt(Math.sqrt(n))}`;
};

const stepStr = (x: number, y: number) => {
  const h = x === 0 ? '' : x > 0 ? `${x} jobbra` : `${-x} balra`;
  const v = y === 0 ? '' : y > 0 ? `${y} fel` : `${-y} le`;
  if (!h && !v) return 'helyben (nullvektor)';
  return [h, v].filter(Boolean).join(', ');
};

type Vec = { x: number; y: number };

// Labor I – rács
const COLS = 12;
const ROWS = 8;
const CELL = 30;
const PAD = 14;
const O: Vec = { x: 2, y: 2 };
const toPx = (p: Vec) => ({ x: PAD + p.x * CELL, y: PAD + (ROWS - p.y) * CELL });

export const G11VectorAdditionTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: húzható vektorok
  const [a, setA] = useState<Vec>({ x: 4, y: 1 });
  const [b, setB] = useState<Vec>({ x: 1, y: 3 });
  const [mode, setMode] = useState<'triangle' | 'parallelogram'>('triangle');
  const [drag, setDrag] = useState<'a' | 'b' | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Labor II: hosszak és a közbezárt szög
  const [lenA, setLenA] = useState<number>(6);
  const [lenB, setLenB] = useState<number>(2.5);
  const [phi, setPhi] = useState<number>(90);

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

  const gridPointFromEvent = (e: React.PointerEvent<SVGSVGElement>): Vec | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const W = COLS * CELL + 2 * PAD;
    const H = ROWS * CELL + 2 * PAD;
    const sx = ((e.clientX - rect.left) / rect.width) * W;
    const sy = ((e.clientY - rect.top) / rect.height) * H;
    return {
      x: clamp(Math.round((sx - PAD) / CELL), 0, COLS),
      y: clamp(Math.round(ROWS - (sy - PAD) / CELL), 0, ROWS)
    };
  };

  const handleMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag) return;
    const g = gridPointFromEvent(e);
    if (!g) return;
    if (drag === 'a') {
      setA({ x: g.x - O.x, y: g.y - O.y });
    } else {
      const start = mode === 'triangle' ? { x: O.x + a.x, y: O.y + a.y } : O;
      setB({ x: g.x - start.x, y: g.y - start.y });
    }
  };

  const s = { x: a.x + b.x, y: a.y + b.y };
  const lenAv = Math.hypot(a.x, a.y);
  const lenBv = Math.hypot(b.x, b.y);
  const lenS = Math.hypot(s.x, s.y);
  const pO = toPx(O);
  const pA = toPx({ x: O.x + a.x, y: O.y + a.y });
  const pBstart = mode === 'triangle' ? pA : pO;
  const pBend = mode === 'triangle' ? toPx({ x: O.x + s.x, y: O.y + s.y }) : toPx({ x: O.x + b.x, y: O.y + b.y });
  const pS = toPx({ x: O.x + s.x, y: O.y + s.y });
  const cross = a.x * b.y - a.y * b.x;
  const dot = a.x * b.x + a.y * b.y;
  const relation =
    lenAv === 0 || lenBv === 0
      ? 'az egyik vektor nullvektor'
      : cross === 0
        ? dot > 0
          ? 'párhuzamosak és egyirányúak: |→a + →b| = |→a| + |→b|'
          : 'párhuzamosak és ellentétes irányúak: |→a + →b| = ||→a| − |→b||'
        : dot === 0
          ? 'merőlegesek: |→a + →b|² = |→a|² + |→b|² (Pitagorasz-tétel)'
          : 'nem párhuzamosak: |→a + →b| < |→a| + |→b| (háromszög-egyenlőtlenség)';

  // Labor II számítások
  const phiRad = (phi * Math.PI) / 180;
  const sumLen = Math.sqrt(Math.max(0, lenA * lenA + lenB * lenB + 2 * lenA * lenB * Math.cos(phiRad)));
  const k2 = 150 / Math.max(lenA + lenB, 0.1);
  const L0 = { x: 170, y: 150 };
  const L2 = { x: L0.x + lenA * k2 * 0.9, y: L0.y };
  const L3 = { x: L0.x + lenB * k2 * 0.9 * Math.cos(phiRad), y: L0.y - lenB * k2 * 0.9 * Math.sin(phiRad) };
  const L4 = { x: L2.x + L3.x - L0.x, y: L2.y + L3.y - L0.y };

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="vektorok-osszeadasa"
      title="1. Vektorok összeadása"
      subtitle="Skalár- és vektormennyiségek, a vektor fogalma, az ellentett vektor és a nullvektor; két vagy több vektor összege összefűzéssel és paralelogrammamódszerrel."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_vektorok_osszeadasa_tananyag.pdf"
      practiceTitle="Készen állsz a vektorok összeadására?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — VEKTOROK ÖSSZEADÁSA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">→AB + →BC = →AC</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Összefűzés:</strong> a következő vektor kezdőpontja az előző végpontjába kerül; az összeg az első kezdőpontjából az utolsó végpontjába mutat.
              </li>
              <li>
                <strong>Paralelogrammamódszer:</strong> közös kezdőpontból felvett →a és →b esetén →a + →b a közös pontból induló átlóvektor.
              </li>
              <li>
                →a + →b = →b + →a, →a + (−→a) = →0, és általában <strong>|→a + →b| ≤ |→a| + |→b|</strong>.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: skalár- és vektormennyiségek" badge="Tankönyv 212. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Skalármennyiség</strong> az, amelyet egy számmal (és esetleg egy mértékegységgel) megadhatunk: távolság, tömeg, idő, hőmérséklet.
            </p>
            <p>
              <strong>Vektormennyiség</strong> az, amelyet a nagyságán kívül az <strong>iránya</strong> is jellemez: elmozdulás, sebesség, erő.
            </p>
            <p>
              A geometriában egy szakasz <strong>irányított</strong>, ha megmondjuk, melyik határpontja a kezdőpont és melyik a végpont (ezt nyíllal jelöljük). Az egymással párhuzamos, azonos irányú és azonos hosszúságú irányított szakaszok <strong>ugyanazt a vektort</strong> határozzák meg – bármelyikük reprezentálhatja.
            </p>
          </div>
          <VectorConceptSvg />
        </div>
      </TheorySection>

      {/* 2. Fogalmak */}
      <TheorySection title="2. A vektor jellemzői, ellentett vektor, nullvektor" badge="Elmélet" badgeColor="indigo">
        <TheoryTable
          headers={['Fogalom', 'Jelentés', 'Jelölés']}
          rows={[
            ['vektor', 'párhuzamos, azonos irányú, azonos hosszúságú irányított szakaszok halmaza', '→v, →AB'],
            ['abszolút érték (hossz)', 'a kezdőpont és a végpont távolsága', '|→v|, |→AB|'],
            ['ellentett vektor', 'párhuzamos, egyenlő hosszú, ellentétes irányú', '−→v (és −(−→v) = →v)'],
            ['nullvektor', 'nulla hosszúságú vektor; iránya tetszőleges, minden vektorral párhuzamos és mindegyikre merőleges', '→0']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. feladat: vektorok a négyzetben" badge="Tankönyv 212. o." badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              A 2 cm oldalú ABCD négyzet egyik csúcsából egy másik csúcsába mutató vektorok:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Mindegyik csúcsból 3 másik csúcsba mutathat vektor: 4 · 3 = <strong>12 vektor</strong>.</li>
              <li><strong>b)</strong> Az |→AB| = 2 cm hosszú az összes oldalvektor: →AB, →BA, →BC, →CB, →CD, →DC, →DA, →AD (<strong>8 db</strong>). Az →AB-vel párhuzamos: →BA, →CD, →DC; ezek közül →DC egyenlő is vele.</li>
              <li><strong>c)</strong> |→AC| = 2√2 ≈ 2,83 cm, ugyanilyen hosszú: →CA, →BD, →DB. Párhuzamos vele: →CA; merőleges rá: →BD és →DB.</li>
            </ul>
          </TheoryCard>
          <TheoryCallout type="info" title="Megjegyzés">
            Ha nem okoz félreértést, a vektort reprezentáló irányított szakaszt is vektornak nevezzük. A vektorokat kisbetűvel (→a, →b, →v) vagy kezdő- és végpontjukkal (→AB) jelöljük.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladat */}
      <TheorySection title="3. Kidolgozott feladat: leszállás oldalszélben" badge="Kidolgozott feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A vízszintesen repülő, leszállni készülő gép szélcsendben egy másodperc alatt az <strong>→a</strong> vektorral mozdulna el a leszállópályához képest (R-ből R₁-be). Jobbról erős keresztirányú szél fúj, amely egy másodperc alatt a <strong>→b</strong> vektorral mozdítja el a gépet. Hová kerül a gép, ha a pilóta nem avatkozik be?
            </p>
            <p>
              <strong>Megoldás.</strong> Az elmozdulást a motor és az oldalszél együttesen alakítja: a két eltolás egymásutánja ugyanaz, mint egyetlen eltolás a <strong>→c = →a + →b</strong> vektorral. A gép tehát R₁ helyett <strong>R₂-be</strong> jutna, rövid idő alatt elsodródna a pályától – ezért kell a pilótának a szél felé „rátartania”.
            </p>
          </div>
          <CrosswindLandingSvg />
        </div>
      </TheorySection>

      {/* 4. Összeadás */}
      <TheorySection title="4. Két (vagy több) vektor összeadása" badge="Definíció" badgeColor="blue">
        <TheoryCallout type="tip" title="Definíció">
          Ha egy vektor ugyanazt az eltolást hozza létre, mint az →a és a →b vektorral való eltolás egymásutánja, akkor ezt a vektort az →a és →b <strong>összegvektorának</strong> nevezzük. Jele: <strong>→a + →b</strong>.
        </TheoryCallout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Összefűzés (háromszögmódszer)" badge="Mindig alkalmazható" badgeColor="emerald">
            <ChainMethodSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              A vektorokat úgy fűzzük össze, hogy az egyik végpontjába kerüljön a következő kezdőpontja. Az összegvektor az <strong>első kezdőpontjából</strong> az <strong>utolsó végpontjába</strong> mutat. Működik több vektorra és párhuzamos vektorokra is.
            </p>
          </TheoryCard>
          <TheoryCard title="Paralelogrammamódszer" badge="Két nem párhuzamos vektor" badgeColor="purple">
            <ParallelogramMethodSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              A két vektort <strong>közös kezdőpontból</strong> vesszük fel, és megszerkesztjük az általuk kifeszített paralelogrammát. Az összegvektor a közös kezdőpontból induló <strong>átlóvektor</strong>.
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <GridSumCommutativeSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p className="font-bold">Kiegészítések</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Felcserélhetőség:</strong> →a + →b = →b + →a – a paralelogramma két útja ugyanoda vezet (a tankönyv 3. d) feladata).</li>
              <li><strong>Csoportosíthatóság:</strong> (→a + →b) + →c = →a + (→b + →c).</li>
              <li>Ellentett vektorok összege a <strong>nullvektor</strong>: →a + (−→a) = →0; zárt töröttvonal oldalvektorainak összege is →0 (pl. →AB + →BC + →CA = →0).</li>
              <li>A vektorok összeadása teljesen más művelet, mint a számoké. A fizikában az összeg neve <strong>eredő</strong>.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 5. Tankönyvi feladatok */}
      <TheorySection title="5. Kidolgozott tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Összeg a rácson (3. feladat)" badge="Rács" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Rácsvektor hossza Pitagorasz-tétellel: ha →a 2 egységet jobbra és 3-at felfelé mutat, akkor |→a| = √(2² + 3²) = √13 ≈ 3,61.</li>
              <li>Ha →b 4 jobbra, 1 le, akkor →a + →b összefűzéssel 6 jobbra, 2 fel: |→a + →b| = √(36 + 4) = √40 ≈ 6,32.</li>
              <li>Ugyanez jön ki →b + →a-ra is – az összeadás felcserélhető.</li>
              <li>Ha →c az →a ellentettje (2 balra, 3 le), akkor →a + →c = →0.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Legfeljebb, legalább? (HF 3.)" badge="|→a| = 6 cm, |→b| = 2,5 cm" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> Legnagyobb, ha a vektorok egyirányúak: |→a + →b| = 6 + 2,5 = <strong>8,5 cm</strong>.</li>
              <li><strong>b)</strong> Legkisebb, ha ellentétes irányúak: |→a + →b| = 6 − 2,5 = <strong>3,5 cm</strong>.</li>
              <li><strong>c)</strong> Ha →a ⊥ →b, a paralelogramma téglalap, az összeg az átlója: √(6² + 2,5²) = √42,25 = <strong>6,5 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) A trapéz csúcsaiba mutató vektorok (HF 4.)" badge="AB = 6 cm, DC = 3 cm" badgeColor="emerald">
            <TrapezoidVectorSumSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Az átlók metszéspontja (K) az átlókat AB : DC = 2 : 1 arányban osztja, így →KC = −½ · →KA és →KD = −½ · →KB.</li>
              <li>Ezért →KA + →KB + →KC + →KD = ½ (→KA + →KB).</li>
              <li>→KA + →KB a paralelogrammamódszer szerint az AB felezőpontjába (F) mutató vektor kétszerese, így az összeg <strong>→KF</strong>: a végpont <strong>az AB alap felezőpontja</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Grafikon eltolása kétszer (5. feladat)" badge="Függvény" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Például legyen →u „2 jobbra, 1 fel”, →v „1 balra, 3 fel”.</li>
              <li>Az x ↦ x² grafikonját →u-vel eltolva: x ↦ (x − 2)² + 1; ezt →v-vel eltolva: <strong>x ↦ (x − 1)² + 4</strong>.</li>
              <li>A két eltolás helyettesíthető egyetlen eltolással, ennek vektora <strong>→u + →v</strong> („1 jobbra, 4 fel”).</li>
              <li>Ugyanígy (HF 2.): ha g-t f-be, f-et h-ba viszi egy-egy eltolás, akkor g-t h-ba a két eltolásvektor összege viszi.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: a hosszak összeadása" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="|→a + →b| általában NEM egyenlő |→a| + |→b|-vel"
          wrong="|→a| = 6 cm, |→b| = 2,5 cm, →a ⊥ →b ⇒ |→a + →b| = 6 + 2,5 = 8,5 cm"
          wrongExplanation="A vektorokat nem a hosszuk összeadásával adjuk össze. A hosszak összege csak akkor jön ki, ha a két vektor párhuzamos és egyirányú."
          correct="→a ⊥ →b ⇒ |→a + →b| = √(6² + 2,5²) = 6,5 cm"
          correctExplanation="Az összegvektort meg kell szerkeszteni (összefűzés vagy paralelogramma), és a hosszát a kapott háromszögből (Pitagorasz- vagy koszinusztétellel) kell kiszámítani."
          tip="Mindig igaz a háromszög-egyenlőtlenség: ||→a| − |→b|| ≤ |→a + →b| ≤ |→a| + |→b|."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Húzható vektorok a rácson" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setMode('triangle')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === 'triangle' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
            >
              Összefűzés (háromszögmódszer)
            </button>
            <button
              onClick={() => setMode('parallelogram')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === 'parallelogram' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
            >
              Paralelogrammamódszer
            </button>
            {[
              { name: 'Egyirányú', a: { x: 3, y: 1 }, b: { x: 6, y: 2 } },
              { name: 'Ellentett', a: { x: 4, y: 2 }, b: { x: -4, y: -2 } },
              { name: 'Merőleges', a: { x: 4, y: 0 }, b: { x: 0, y: 3 } },
              { name: '3. feladat', a: { x: 2, y: 3 }, b: { x: 4, y: -1 } }
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setA(p.a);
                  setB(p.b);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${COLS * CELL + 2 * PAD} ${ROWS * CELL + 2 * PAD}`}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200 touch-none select-none"
              onPointerMove={handleMove}
              onPointerUp={() => setDrag(null)}
              onPointerLeave={() => setDrag(null)}
            >
              {Array.from({ length: COLS + 1 }, (_, i) => (
                <line key={'gv' + i} x1={PAD + i * CELL} y1={PAD} x2={PAD + i * CELL} y2={PAD + ROWS * CELL} stroke="#e2e8f0" />
              ))}
              {Array.from({ length: ROWS + 1 }, (_, j) => (
                <line key={'gh' + j} x1={PAD} y1={PAD + j * CELL} x2={PAD + COLS * CELL} y2={PAD + j * CELL} stroke="#e2e8f0" />
              ))}
              {mode === 'parallelogram' && (
                <>
                  <line x1={pA.x} y1={pA.y} x2={pS.x} y2={pS.y} stroke="#059669" strokeWidth={1.5} strokeDasharray="5 4" />
                  <line x1={pBend.x} y1={pBend.y} x2={pS.x} y2={pS.y} stroke="#2563eb" strokeWidth={1.5} strokeDasharray="5 4" />
                </>
              )}
              <G11VectorAdditionArrow x1={pO.x} y1={pO.y} x2={pS.x} y2={pS.y} color="#dc2626" width={3} />
              <G11VectorAdditionArrow x1={pO.x} y1={pO.y} x2={pA.x} y2={pA.y} color="#2563eb" width={3} />
              <G11VectorAdditionArrow x1={pBstart.x} y1={pBstart.y} x2={pBend.x} y2={pBend.y} color="#059669" width={3} />
              <G11VectorAdditionLabel x={(pO.x + pA.x) / 2 - 10} y={(pO.y + pA.y) / 2 - 10} text="a" color="#2563eb" />
              <G11VectorAdditionLabel x={(pBstart.x + pBend.x) / 2 + 12} y={(pBstart.y + pBend.y) / 2 - 8} text="b" color="#059669" />
              <G11VectorAdditionLabel x={(pO.x + pS.x) / 2 + 14} y={(pO.y + pS.y) / 2 + 14} text="a+b" color="#dc2626" />
              <circle cx={pO.x} cy={pO.y} r={4} fill="#0f172a" />
              <text x={pO.x - 8} y={pO.y + 16} fontSize={12} fontWeight="bold" fill="#0f172a">O</text>
              <circle
                cx={pA.x}
                cy={pA.y}
                r={9}
                fill="rgba(37,99,235,0.25)"
                stroke="#2563eb"
                strokeWidth={2}
                className="cursor-grab"
                onPointerDown={(e) => {
                  e.preventDefault();
                  setDrag('a');
                }}
                data-testid="va-handle-a"
              />
              <circle
                cx={pBend.x}
                cy={pBend.y}
                r={9}
                fill="rgba(5,150,105,0.25)"
                stroke="#059669"
                strokeWidth={2}
                className="cursor-grab"
                onPointerDown={(e) => {
                  e.preventDefault();
                  setDrag('b');
                }}
                data-testid="va-handle-b"
              />
            </svg>
            <div className="space-y-3">
              <p className="text-xs text-slate-500 italic">
                Húzd a kék, illetve a zöld kör alakú fogantyút! A végpontok rácspontokra ugranak. Váltogasd a két szerkesztési módot: az összegvektor (piros) ugyanaz marad.
              </p>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div><span className="text-blue-700 font-bold">→a</span>: {stepStr(a.x, a.y)} ⇒ |→a| = {lenStr(a.x, a.y)}</div>
                <div><span className="text-emerald-700 font-bold">→b</span>: {stepStr(b.x, b.y)} ⇒ |→b| = {lenStr(b.x, b.y)}</div>
                <div><span className="text-red-700 font-bold">→a + →b</span>: {stepStr(s.x, s.y)} ⇒ <strong>|→a + →b| = {lenStr(s.x, s.y)}</strong></div>
                <div className="text-xs text-slate-500">|→a| + |→b| ≈ {fmt(lenAv + lenBv)} &nbsp;|&nbsp; ||→a| − |→b|| ≈ {fmt(Math.abs(lenAv - lenBv))}</div>
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-sm text-blue-900">
                A két vektor {relation}. (|→a + →b| ≈ {fmt(lenS)})
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Az összegvektor hossza és a szög" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">|→a| = {fmt(lenA, 1)} cm</label>
                <input type="range" min="0" max="10" step="0.5" value={lenA} onChange={(e) => setLenA(Number(e.target.value))} className="w-full accent-blue-600" aria-label="a hossza" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">|→b| = {fmt(lenB, 1)} cm</label>
                <input type="range" min="0" max="10" step="0.5" value={lenB} onChange={(e) => setLenB(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="b hossza" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">→a és →b szöge: φ = {phi}°</label>
                <input type="range" min="0" max="180" step="1" value={phi} onChange={(e) => setPhi(Number(e.target.value))} className="w-full accent-rose-600" aria-label="szög" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'HF 3. a) egyirányú', v: [6, 2.5, 0] },
                  { name: 'HF 3. b) ellentétes', v: [6, 2.5, 180] },
                  { name: 'HF 3. c) merőleges', v: [6, 2.5, 90] },
                  { name: '5, 3, 60°', v: [5, 3, 60] }
                ].map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setLenA(p.v[0]);
                      setLenB(p.v[1]);
                      setPhi(p.v[2]);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>A paralelogramma →a + →b átlójával szemközti szöge: 180° − φ = {180 - phi}°</div>
                <div>Koszinusztétellel: |→a + →b|² = |→a|² + |→b|² − 2|→a||→b| cos(180° − φ)</div>
                <div><strong>|→a + →b| ≈ {fmt(sumLen)} cm</strong></div>
                <div className="text-xs text-slate-500">
                  határok: {fmt(Math.abs(lenA - lenB), 2)} cm ≤ |→a + →b| ≤ {fmt(lenA + lenB, 2)} cm
                </div>
              </div>
            </div>
            <svg viewBox="0 0 340 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1={L2.x} y1={L2.y} x2={L4.x} y2={L4.y} stroke="#059669" strokeDasharray="5 4" strokeWidth={1.4} />
              <line x1={L3.x} y1={L3.y} x2={L4.x} y2={L4.y} stroke="#2563eb" strokeDasharray="5 4" strokeWidth={1.4} />
              <G11VectorAdditionArrow x1={L0.x} y1={L0.y} x2={L4.x} y2={L4.y} color="#dc2626" width={3} />
              <G11VectorAdditionArrow x1={L0.x} y1={L0.y} x2={L2.x} y2={L2.y} color="#2563eb" width={3} />
              <G11VectorAdditionArrow x1={L0.x} y1={L0.y} x2={L3.x} y2={L3.y} color="#059669" width={3} />
              <G11VectorAdditionLabel x={(L0.x + L2.x) / 2} y={L0.y + 16} text="a" color="#2563eb" />
              <G11VectorAdditionLabel x={(L0.x + L3.x) / 2 - 12} y={(L0.y + L3.y) / 2 - 6} text="b" color="#059669" />
              <text x={170} y={205} fontSize={12} textAnchor="middle" fontWeight="bold" fill="#b91c1c">
                |→a + →b| ≈ {fmt(sumLen)} cm
              </text>
            </svg>
          </div>
          <TheoryCallout type="success" title="Figyeld meg!">
            φ = 0°-nál a hosszak összeadódnak (8,5 cm), φ = 180°-nál kivonódnak (3,5 cm), φ = 90°-nál a Pitagorasz-tétel adja a 6,5 cm-t. Ha φ nő, az összegvektor hossza csökken.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default G11VectorAdditionTheory;
