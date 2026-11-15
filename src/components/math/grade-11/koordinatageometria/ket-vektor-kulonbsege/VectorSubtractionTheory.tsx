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
  PilotCompensationSvg,
  DifferenceConstructionSvg,
  ParallelogramDiagonalsSvg,
  OppositeDifferenceSvg,
  DisplacementChangeSvg,
  KiteVectorsSvg,
  VectorSubtractionArrow,
  VectorSubtractionLabel
} from './VectorSubtractionFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d);
  return (Number(s) === 0 ? (0).toFixed(d) : s).replace('.', ',').replace('-', '−');
};

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

const COLS = 12;
const ROWS = 8;
const CELL = 30;
const PAD = 14;
const O: Vec = { x: 5, y: 3 };
const toPx = (p: Vec) => ({ x: PAD + p.x * CELL, y: PAD + (ROWS - p.y) * CELL });

export const VectorSubtractionTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [a, setA] = useState<Vec>({ x: 5, y: 1 });
  const [b, setB] = useState<Vec>({ x: 1, y: 4 });
  const [order, setOrder] = useState<'ab' | 'ba'>('ab');
  const [showSum, setShowSum] = useState<boolean>(true);
  const [drag, setDrag] = useState<'a' | 'b' | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Labor II: rátartás oldalszélben
  const [ground, setGround] = useState<number>(70);
  const [wind, setWind] = useState<number>(10);
  const [windDir, setWindDir] = useState<number>(90);

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

  const handleMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const W = COLS * CELL + 2 * PAD;
    const H = ROWS * CELL + 2 * PAD;
    const sx = ((e.clientX - rect.left) / rect.width) * W;
    const sy = ((e.clientY - rect.top) / rect.height) * H;
    const g = {
      x: clamp(Math.round((sx - PAD) / CELL), 0, COLS),
      y: clamp(Math.round(ROWS - (sy - PAD) / CELL), 0, ROWS)
    };
    const v = { x: g.x - O.x, y: g.y - O.y };
    if (drag === 'a') setA(v);
    else setB(v);
  };

  const d = order === 'ab' ? { x: a.x - b.x, y: a.y - b.y } : { x: b.x - a.x, y: b.y - a.y };
  const s = { x: a.x + b.x, y: a.y + b.y };
  const pO = toPx(O);
  const pA = toPx({ x: O.x + a.x, y: O.y + a.y });
  const pB = toPx({ x: O.x + b.x, y: O.y + b.y });
  const pS = toPx({ x: O.x + s.x, y: O.y + s.y });
  const dFrom = order === 'ab' ? pB : pA;
  const dTo = order === 'ab' ? pA : pB;
  const dot = a.x * b.x + a.y * b.y;
  const sameLen = a.x * a.x + a.y * a.y === b.x * b.x + b.y * b.y;

  // Labor II számítások: →v = →e − →s (→e a pálya irányába mutat)
  const wr = (windDir * Math.PI) / 180;
  const sx = wind * Math.cos(wr);
  const sy = wind * Math.sin(wr);
  const vx = ground - sx;
  const vy = -sy;
  const vLen = Math.hypot(vx, vy);
  const heading = (Math.atan2(vy, vx) * 180) / Math.PI;
  const k = 200 / Math.max(ground + wind, 1);
  const R = { x: 60, y: 100 };
  const E = { x: R.x + ground * k, y: R.y };
  const V = { x: R.x + vx * k, y: R.y - vy * k };

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="ket-vektor-kulonbsege"
      title="2. Két vektor különbsége"
      subtitle="Hogyan kompenzálja a pilóta az oldalszelet? A különbségvektor definíciója és szerkesztése, a paralelogramma két átlója, a változás mint különbség."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_ket_vektor_kulonbsege_tananyag.pdf"
      practiceTitle="Készen állsz a vektorok kivonására?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KÉT VEKTOR KÜLÖNBSÉGE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">→c − →b = →a ⟺ →c = →a + →b</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Szerkesztés:</strong> →b-t és →c-t közös kezdőpontból mérjük fel; →c − →b a <strong>kivonandó (→b) végpontjából</strong> a <strong>kisebbítendő (→c) végpontjába</strong> mutat.
              </li>
              <li>
                →c − →b = →c + (−→b): a kivonás az ellentett hozzáadása.
              </li>
              <li>
                →a − →b és →b − →a egymás <strong>ellentettjei</strong>; pontokkal: →OB − →OA = →AB.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: rátartás a szélre" badge="Tankönyv 216. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A repülőgép az R pontban van. A biztonságos leszálláshoz a földhöz képest az <strong>→e</strong> előírt sebességvektorral kellene haladnia, de erős oldalszél fúj, ennek sebességét <strong>→s</strong> adja meg. Hogyan válassza meg a pilóta a levegőhöz viszonyított <strong>→v</strong> sebességet?
            </p>
            <p>
              Az előző leckében láttuk: a földhöz viszonyított sebesség a levegőhöz viszonyított sebesség és a szél sebességének összege, <strong>→e = →v + →s</strong>. Ha →v-t R-ből indítjuk, az utána fűzött →s végpontja éppen →e végpontja.
            </p>
            <p>
              Tehát <strong>→v = →e + (−→s)</strong>: a pilótának a szél ellen kell dolgoznia, a szélcsendesnél nagyobb sebességgel, és „rá kell fordulnia” a szélirányra – a gép hossztengelye nem párhuzamos a pálya tengelyével.
            </p>
            <TheoryCallout type="info" title="Elnevezés">
              →v az →e és az →s <strong>különbségvektora</strong>, →s pedig az →e és a →v különbségvektora: →v = →e − →s és →s = →e − →v.
            </TheoryCallout>
          </div>
          <PilotCompensationSvg />
        </div>
      </TheorySection>

      {/* 2. Definíció */}
      <TheorySection title="2. Két vektor kivonása" badge="Definíció" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryCallout type="tip" title="Definíció">
              Ha →c = →a + →b, akkor az →a vektort a →c és a →b <strong>különbségvektorának</strong> mondjuk, és →c − →b alakban jelöljük. A műveletet, amely →c-ből és →b-ből előállítja a különbségüket, <strong>kivonásnak</strong> nevezzük.
            </TheoryCallout>
            <p>
              <strong>Szerkesztés:</strong> a →b és →c vektort közös kezdőpontból mérjük fel; a kivonandó (→b) végpontjából a kisebbítendő (→c) végpontjába mutató vektor a →c − →b. Az eljárás párhuzamos vektorokra is érvényes.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>→b + (→c − →b) = →c (összefűzéssel ellenőrizhető);</li>
              <li>→c − →b = →c + (−→b): a különbség az egyik vektor és a kivonandó ellentettjének összege.</li>
            </ul>
          </div>
          <DifferenceConstructionSvg />
        </div>
      </TheorySection>

      {/* 3. Paralelogramma */}
      <TheorySection title="3. Kidolgozott feladatok: a paralelogramma átlói, a − b és b − a" badge="Kidolgozott feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="2. kidolgozott feladat: az átlóvektorok" badge="Paralelogramma" badgeColor="purple">
            <ParallelogramDiagonalsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A közös pontból induló oldalvektorok →a és →b.</li>
              <li>A közös pontból induló átló: <strong>→e = →a + →b</strong>.</li>
              <li>A másik átló →b végpontjából →a végpontjába mutat: <strong>→f = →a − →b</strong>.</li>
              <li>Paralelogrammává kiegészítve egyszerre látjuk a két vektor összegét és különbségét.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. kidolgozott feladat: →a − →b és →b − →a" badge="Ellentettek" badgeColor="rose">
            <OppositeDifferenceSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Az előző →f átlóvektor ellentettje éppen →b − →a.</li>
              <li>Tehát →a − →b és →b − →a egymás ellentettjei: <strong>−(→a − →b) = →b − →a</strong>.</li>
              <li>A kivonás <strong>nem</strong> felcserélhető!</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Tankönyvi feladatok */}
      <TheorySection title="4. Tankönyvi feladatok megoldással" badge="Mintapéldák" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="3. a) Téglalap: AB = 6 cm, AD = 2,5 cm" badge="3. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>→BA + →BC a B-ből induló átló, →BD: hossza √(6² + 2,5²) = <strong>6,5 cm</strong>.</li>
              <li>→BA − →BC = →CA (C-ből A-ba mutat): ez a másik átló, szintén <strong>6,5 cm</strong> – a téglalap átlói egyenlők.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. b) Rombusz: |→BA + →BC| = 8 cm, |→BA − →BC| = 6 cm" badge="3. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A két adat a rombusz két átlója: 8 cm és 6 cm; az átlók merőlegesen felezik egymást.</li>
              <li>Az oldal: √(4² + 3²) = 5 cm.</li>
              <li>→DC = →AB, így →AB + →DC = 2 · →AB, hossza <strong>10 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="5. feladat: deltoid (AC a szimmetriaátló)" badge="Igaz vagy hamis?" badgeColor="purple">
            <KiteVectorsSvg className="w-full max-w-xs h-auto mx-auto mb-3" />
            <TheoryTable
              headers={['Állítás', 'Átalakítás', 'Igaz?']}
              rows={[
                ['I. →AB − →AD = →DB', 'kivonandó végpontjából (D) a kisebbítendő végpontjába (B)', 'igaz'],
                ['II. →AB − →CB = →AC', '→AB + →BC = →AC', 'igaz'],
                ['III. →AB − →AD = →CB − →CD', 'mindkettő →DB', 'igaz'],
                ['IV. →BA − →BC = →DA − →DC', 'mindkettő →CA', 'igaz'],
                ['V. →AB + →BC ⊥ →CD + →BC', '→AC ⊥ →BD (a deltoid átlói)', 'igaz'],
                ['VI. →AB − →CB + →CA = →0', '→AB + →BC + →CA = →0', 'igaz']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 2. a)</strong> (→a − →b) + (→b − →a) = <strong>→0</strong></li>
              <li><strong>HF 2. b)</strong> →c + →d − →a + (−→c) − →d = <strong>−→a</strong></li>
              <li><strong>HF 2. c)</strong> →a + →b − (→b − →a) + (−→a) = <strong>→a</strong></li>
              <li><strong>HF 3. a)</strong> |→u + →v| = |→u − →v| ⟺ a paralelogramma átlói egyenlők ⟺ téglalap: <strong>→u ⊥ →v</strong>.</li>
              <li><strong>HF 3. b)</strong> (→u + →v) ⊥ (→u − →v) ⟺ az átlók merőlegesek ⟺ rombusz: <strong>|→u| = |→v|</strong>.</li>
              <li><strong>4. feladat:</strong> →a − →b = −→b + →a; →a − →b + →c = →a + →c − →b; →a − (→b + →c) = →a − →b − →c.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Ráadás */}
      <TheorySection title="5. Ráadás: a változás mint különbség" badge="Ráadás" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A változást mindig kivonással fejezzük ki: <strong>változás = végállapot − kezdőállapot</strong> (idei magasság − tavalyi magasság, e havi fizetés − múlt havi fizetés).
            </p>
            <p>
              Egy test az A pontból a B pontba kerül. Kezdetben az origóból induló →a, a végén a →b vektor adta meg a helyzetét. A helyzet megváltozása az <strong>elmozdulásvektor: →AB = →b − →a</strong>.
            </p>
            <p>
              Példa (képrejtvény C2): egy turista 12 km-t megy északnyugatra, majd 12 km-t északkeletre. A két elmozdulás merőleges, az eredő elmozdulás <strong>észak felé</strong> mutat, hossza 12√2 ≈ 16,97 km.
            </p>
          </div>
          <DisplacementChangeSvg />
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: rossz irányú különbségvektor" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="→a − →b NEM a →a végpontjából mutat a →b végpontjába"
          wrong="Közös kezdőpontból felvett →a és →b esetén →a − →b: →a végpontjából →b végpontjába"
          wrongExplanation="Ez a →b − →a vektor, vagyis éppen a helyes eredmény ellentettje. A hossz ugyanaz, de az irány fordított – ezért a hibát a hossz számolása nem mutatja ki."
          correct="→a − →b: a kivonandó (→b) végpontjából a kisebbítendő (→a) végpontjába"
          correctExplanation="Ellenőrzés összefűzéssel: →b + (→a − →b) = →a, azaz →b végpontjából indulva →a végpontjába kell érkeznünk."
          tip="Pontokkal: →OB − →OA = →AB („végpont mínusz kezdőpont”)."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Összeg és különbség a paralelogrammában" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setOrder('ab')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${order === 'ab' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
            >
              →a − →b
            </button>
            <button
              onClick={() => setOrder('ba')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${order === 'ba' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
            >
              →b − →a
            </button>
            <button
              onClick={() => setShowSum(!showSum)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              {showSum ? 'Összeg elrejtése' : 'Összeg mutatása'}
            </button>
            {[
              { name: 'Merőleges', a: { x: 4, y: 0 }, b: { x: 0, y: 3 } },
              { name: 'Egyenlő hosszú', a: { x: 4, y: 3 }, b: { x: 0, y: 5 } },
              { name: 'Párhuzamos', a: { x: 4, y: 2 }, b: { x: 2, y: 1 } }
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
              <line x1={pA.x} y1={pA.y} x2={pS.x} y2={pS.y} stroke="#94a3b8" strokeDasharray="5 4" />
              <line x1={pB.x} y1={pB.y} x2={pS.x} y2={pS.y} stroke="#94a3b8" strokeDasharray="5 4" />
              {showSum && <VectorSubtractionArrow x1={pO.x} y1={pO.y} x2={pS.x} y2={pS.y} color="#94a3b8" width={2} dashed />}
              <VectorSubtractionArrow x1={pO.x} y1={pO.y} x2={pA.x} y2={pA.y} color="#2563eb" width={3} />
              <VectorSubtractionArrow x1={pO.x} y1={pO.y} x2={pB.x} y2={pB.y} color="#059669" width={3} />
              <VectorSubtractionArrow x1={dFrom.x} y1={dFrom.y} x2={dTo.x} y2={dTo.y} color={order === 'ab' ? '#dc2626' : '#7c3aed'} width={3} />
              <VectorSubtractionLabel x={(pO.x + pA.x) / 2} y={(pO.y + pA.y) / 2 + 14} text="a" color="#2563eb" />
              <VectorSubtractionLabel x={(pO.x + pB.x) / 2 - 12} y={(pO.y + pB.y) / 2} text="b" color="#059669" />
              <VectorSubtractionLabel
                x={(dFrom.x + dTo.x) / 2 + 16}
                y={(dFrom.y + dTo.y) / 2 - 10}
                text={order === 'ab' ? 'a − b' : 'b − a'}
                color={order === 'ab' ? '#dc2626' : '#7c3aed'}
              />
              <circle cx={pO.x} cy={pO.y} r={4} fill="#0f172a" />
              <circle cx={pA.x} cy={pA.y} r={9} fill="rgba(37,99,235,0.25)" stroke="#2563eb" strokeWidth={2} className="cursor-grab" onPointerDown={(e) => { e.preventDefault(); setDrag('a'); }} />
              <circle cx={pB.x} cy={pB.y} r={9} fill="rgba(5,150,105,0.25)" stroke="#059669" strokeWidth={2} className="cursor-grab" onPointerDown={(e) => { e.preventDefault(); setDrag('b'); }} />
            </svg>
            <div className="space-y-3">
              <p className="text-xs text-slate-500 italic">
                Húzd a kék és a zöld fogantyút! A szürke szaggatott nyíl az összeg (a közös pontból induló átló), a színes nyíl a különbség (a másik átló).
              </p>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div><span className="text-blue-700 font-bold">→a</span>: {stepStr(a.x, a.y)}, |→a| = {lenStr(a.x, a.y)}</div>
                <div><span className="text-emerald-700 font-bold">→b</span>: {stepStr(b.x, b.y)}, |→b| = {lenStr(b.x, b.y)}</div>
                <div>
                  <span className="font-bold">{order === 'ab' ? '→a − →b' : '→b − →a'}</span>: {stepStr(d.x, d.y)} ⇒ <strong>hossz = {lenStr(d.x, d.y)}</strong>
                </div>
                <div className="text-slate-500">→a + →b: {stepStr(s.x, s.y)}, hossz = {lenStr(s.x, s.y)}</div>
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-sm text-blue-900 space-y-1">
                <div>{dot === 0 && a.x * a.x + a.y * a.y > 0 && b.x * b.x + b.y * b.y > 0 ? '→a ⊥ →b: a két átló egyenlő hosszú (téglalap), |→a + →b| = |→a − →b|.' : 'Ha →a ⊥ →b, a két átló egyenlő hosszú lesz.'}</div>
                <div>{sameLen ? '|→a| = |→b|: rombusz, a két átló merőleges egymásra.' : 'Ha |→a| = |→b|, a két átló merőleges lesz (rombusz).'}</div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: A pilóta rátartása, →v = →e − →s" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">előírt földsebesség |→e| = {ground} m/s</label>
                <input type="range" min="40" max="90" step="1" value={ground} onChange={(e) => setGround(Number(e.target.value))} className="w-full accent-blue-600" aria-label="földsebesség" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">szélsebesség |→s| = {wind} m/s</label>
                <input type="range" min="0" max="30" step="1" value={wind} onChange={(e) => setWind(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="szélsebesség" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a szél iránya a pálya irányához képest: {windDir}°</label>
                <input type="range" min="0" max="180" step="5" value={windDir} onChange={(e) => setWindDir(Number(e.target.value))} className="w-full accent-rose-600" aria-label="szélirány" />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>→v = →e − →s = →e + (−→s)</div>
                <div><strong>|→v| ≈ {fmt(vLen, 1)} m/s</strong> (levegőhöz viszonyított sebesség)</div>
                <div>a gép orra a pályától ≈ {fmt(Math.abs(heading), 1)}°-kal {heading < -0.05 ? 'a szél felé (jobbra)' : heading > 0.05 ? 'a szél felé (balra)' : 'nem tér el'}</div>
              </div>
              <p className="text-xs text-slate-500 italic">
                90°-os (merőleges) oldalszélnél |→v| = √(|→e|² + |→s|²): 70 és 10 m/s esetén ≈ 70,7 m/s. Hátszélnél (0°) kisebb, szembeszélnél (180°) nagyobb levegősebesség kell.
              </p>
            </div>
            <svg viewBox="0 0 340 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <rect x={10} y={80} width={320} height={40} fill="#cbd5e1" />
              <line x1={14} y1={100} x2={326} y2={100} stroke="#ffffff" strokeWidth={2} strokeDasharray="12 8" />
              <VectorSubtractionArrow x1={R.x} y1={R.y} x2={E.x} y2={E.y} color="#2563eb" width={3} />
              <VectorSubtractionArrow x1={R.x} y1={R.y} x2={V.x} y2={V.y} color="#dc2626" width={3} />
              <VectorSubtractionArrow x1={V.x} y1={V.y} x2={E.x} y2={E.y} color="#059669" width={3} />
              <VectorSubtractionLabel x={(R.x + E.x) / 2} y={R.y + 30} text="e" color="#2563eb" />
              <VectorSubtractionLabel x={(R.x + V.x) / 2 - 6} y={(R.y + V.y) / 2 + (V.y > R.y ? 14 : -12)} text="v" color="#dc2626" />
              <VectorSubtractionLabel x={(V.x + E.x) / 2 + 12} y={(V.y + E.y) / 2} text="s" color="#059669" />
              <circle cx={R.x} cy={R.y} r={4} fill="#0f172a" />
              <text x={R.x - 10} y={R.y + 4} fontSize={12} fontWeight="bold" textAnchor="end" fill="#0f172a">R</text>
              <text x={170} y={210} fontSize={12} textAnchor="middle" fontWeight="bold" fill="#b91c1c">|→v| ≈ {fmt(vLen, 1)} m/s</text>
            </svg>
          </div>
          <TheoryCallout type="success" title="Figyeld meg!">
            A szél (→s) a levegőhöz viszonyított sebesség (→v) végpontjából mutat az előírt földsebesség (→e) végpontjába: →v + →s = →e. A pilóta tehát mindig a szél ellen fordítja a gépet.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default VectorSubtractionTheory;
