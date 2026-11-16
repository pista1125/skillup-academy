import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, makeBox, Vec3 } from '../shared/Solid3DViewer';
import { ShipsTetrahedronSvg, SpiderBoxSvg, SpiderNetsSvg, DistanceTypesSvg, CubeDiagonalsSvg } from './SpatialDistanceFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

export const SpatialDistanceTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: téglatest, testátló és a pók útjai
  const [w, setW] = useState<number>(2); // AB
  const [l, setL] = useState<number>(4); // BC
  const [h, setH] = useState<number>(2.5); // AE
  // Labor II: lámpa a teremben
  const [edgeSum, setEdgeSum] = useState<number>(53.2);
  const [cord, setCord] = useState<number>(0.4);

  const box = useMemo(() => makeBox(w, h, l), [w, h, l]);
  // makeBox: A=[0,0,l], C=[w,0,0], E=[0,h,l]
  const A: Vec3 = [0, 0, l];
  const C: Vec3 = [w, 0, 0];
  const E: Vec3 = [0, h, l];
  const faceDiag = Math.hypot(w, l);
  const bodyDiag = Math.hypot(w, l, h);
  const paths = [
    { name: 'I. a HG élen át (az él hossza AB)', val: Math.hypot(w, l + h) },
    { name: 'II. az AD élen át (az él hossza BC)', val: Math.hypot(l, w + h) },
    { name: 'III. a HD élen át (az él hossza AE)', val: Math.hypot(h, w + l) }
  ];
  const best = Math.min(...paths.map((p) => p.val));

  // Labor II számítások – arány: magasság : szélesség : hosszúság = 4 : 6 : 9
  const k = edgeSum / (4 * 19);
  const rh = 4 * k;
  const rw = 6 * k;
  const rl = 9 * k;
  const c = Math.min(cord, rh - 0.05);
  const room = useMemo(() => makeBox(rw, rh, rl), [rw, rh, rl]);
  const lamp: Vec3 = [rw / 2, rh - c, rl / 2];
  const toFloor = rh - c;
  const toSmallWall = rl / 2;
  const toCeilEdge = Math.hypot(rw / 2, c);
  const toFloorEdge = Math.hypot(rw / 2, toFloor);

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="terelemek-tavolsaga-ismetles"
      title="1. Térelemek távolsága (ismétlés)"
      subtitle="Hol lehet a negyedik hajó? Merre mászik a pók? Térelemek kölcsönös helyzete, távolságuk, a lapátló és a testátló."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_terelemek_tavolsaga_tananyag.pdf"
      practiceTitle="Készen állsz a térbeli távolságokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — TÁVOLSÁG A TÉRBEN',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
                téglatest testátlója: e = √(a² + b² + c²)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Két ponthalmaz távolsága a pontjaik között mért távolságok <strong>minimuma</strong>; közös pont esetén a távolság 0.</li>
              <li>Pont és egyenes, pont és sík távolsága: a pontból állított <strong>merőleges szakasz</strong> hossza.</li>
              <li>
                Kocka (a élű): lapátló <strong>f = a√2</strong>, testátló <strong>e = a√3</strong>.
              </li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Bevezető: hol lehet a negyedik hajó?" badge="Tankönyv 4. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Négy hajó úgy helyezkedik el, hogy <strong>bármelyik kettő 40 m</strong> távolságra van egymástól. Három közülük vitorlás. Milyen hajó lehet a negyedik?
            </p>
            <p>
              A három vitorlás a víz felszínén egy <strong>40 m oldalú szabályos háromszög</strong> csúcsaiban van. A síkban nincs olyan pont, amely mindhárom csúcstól 40 m-re lenne, ezért a negyedik jármű a vízfelszín fölött vagy alatt van: <strong>léghajó vagy tengeralattjáró</strong>.
            </p>
            <p>A négy pont egy szabályos tetraéder csúcsai – ez a térgeometria első „modellje”.</p>
          </div>
          <ShipsTetrahedronSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Térelemek kölcsönös helyzete" badge="Elmélet" badgeColor="blue">
        <p className="text-sm text-slate-700">
          Térelemek: <strong>pont, egyenes, sík, tér</strong>.
        </p>
        <TheoryTable
          headers={['Térelemek', 'Helyzet', 'Jellemzés']}
          rows={[
            ['két egyenes', 'metsző', 'pontosan egy közös pontjuk van'],
            ['két egyenes', 'párhuzamos', 'egy síkban vannak, és nincs közös pontjuk (vagy egybeesnek)'],
            ['két egyenes', 'kitérő', 'nincs olyan sík, amelyre mindkettő illeszkedik'],
            ['egyenes és sík', 'illeszkedik / metsz / párhuzamos', 'minden pontja a síkon van / egy közös pont / nincs közös pont (vagy illeszkedik)'],
            ['két sík', 'metsző', 'van közös pontjuk; a közös pontok egyenese a metszésvonal'],
            ['két sík', 'párhuzamos', 'nincs közös pontjuk (vagy egybeesnek)']
          ]}
        />
        <TheoryCallout type="info" title="Kitérő egyenesek a kockán">
          Egy kocka bármely élével 3 él párhuzamos, 4 él metszi, és 4 él kitérő hozzá (3 + 4 + 4 = 11 másik él).
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Térelemek távolsága" badge="Elmélet" badgeColor="teal">
        <DistanceTypesSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Általános definíció" badge="minimum" badgeColor="teal">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Két pont távolsága a pontok által meghatározott szakasz hossza.</li>
              <li>Két ponthalmaz távolsága a pontjaik között mért távolságok minimuma.</li>
              <li>Ha két térelemnek van közös pontja, a távolságuk 0.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Merőleges szakasszal" badge="talppont" badgeColor="indigo">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Pont és egyenes / pont és sík: a pontból állított merőleges szakasz hossza.</li>
              <li>Két párhuzamos egyenes, sík és vele párhuzamos egyenes, két párhuzamos sík: az egyik tetszőleges pontjának távolsága a másiktól.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Lapátló és testátló" badge="Tankönyv 6–7. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy sokszöglapokkal határolt test (<strong>poliéder</strong>) két csúcsát összekötő szakasz lehet <strong>él</strong> vagy <strong>átló</strong>. Ha az átló a test egyik lapjára illeszkedik, <strong>lapátló</strong>; ha nem egy lapon lévő csúcsokat köt össze, <strong>testátló</strong>.
            </p>
            <p>
              A téglatest testátlója az egy csúcsból induló élek négyzetösszegének négyzetgyöke: <strong>e = √(a² + b² + c²)</strong>. Az a élű kockában <strong>f = a√2</strong> és <strong>e = a√3</strong>.
            </p>
          </div>
          <CubeDiagonalsSvg />
        </div>
      </TheorySection>

      <TheorySection title="5. Kidolgozott feladat: a pók legrövidebb útja" badge="Mintapélda" badgeColor="amber">
        <p className="text-sm text-slate-700">
          Egy pók a 2 m széles, 4 m hosszú, 2,5 m magas szoba egyik sarkából (E) a legtávolabbi sarokba (C) szeretne eljutni.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="a) Fonálon, a levegőben" badge="testátló" badgeColor="rose">
            <SpiderBoxSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Két pont között a legrövidebb út a szakasz: az EC testátló.</li>
              <li>ABC háromszög: AC² = AB² + BC²; ACE háromszög: EC² = EA² + AC².</li>
              <li>
                EC = √(2,5² + 2² + 4²) = √26,25 ≈ <strong>5,12 m</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="b) Csak a falakon mászva" badge="kiterítés" badgeColor="emerald">
            <SpiderNetsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>A két szomszédos lapot síkba terítjük: az út a kapott téglalap átlója.</li>
              <li>I. √(2² + 6,5²) = √46,25 ≈ 6,80 m; II. √(4,5² + 4²) = √36,25 ≈ 6,02 m; III. √(2,5² + 6²) = √42,25 = 6,5 m.</li>
              <li>
                A legrövidebb a II. út: <strong>≈ 6,02 m</strong> – az, amelyik a <strong>leghosszabb élt</strong> metszi.
              </li>
              <li>Az AD élen az A csúcstól 4 · 2,5 / 4,5 ≈ 2,22 m-re „fordul be”.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Kidolgozott feladatok: távolságok a kockában és a teremben" badge="Feladatok" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Kocka lapátlójából a testátló" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>f = a√2 = 10 ⇒ a = 10/√2 = 5√2 ≈ 7,07 egység.</li>
              <li>
                e = a√3 = 5√6 ≈ <strong>12,25 egység</strong> (vagy e = f · √3/√2).
              </li>
              <li>HF: e = 30 ⇒ a = 10√3, f = a√2 = 10√6 ≈ 24,49 egység.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A lámpa a teremben" badge="4. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Élek összege 53,2 m = 4 · (4k + 6k + 9k) ⇒ k = 0,7: a terem 2,8 m magas, 4,2 m széles, 6,3 m hosszú.</li>
              <li>a) A padlótól: 2,8 − 0,4 = <strong>2,4 m</strong>.</li>
              <li>b) A legkisebb területű (2,8 × 4,2-es) faltól: 6,3 / 2 = <strong>3,15 m</strong>.</li>
              <li>
                c) A mennyezet hosszú élétől: √(2,1² + 0,4²) ≈ <strong>2,14 m</strong> (a padló hosszú élétől √(2,1² + 2,4²) ≈ 3,19 m).
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="A téglatest élei és az AD él távolsága (2. feladat)">
          AD = 7 m, AB = 12 m, AA′ = 5 m. A metsző élek (AB, AA′, DC, DD′) távolsága 0; BC-é 12 m, A′D′-é 5 m, B′C′-é √(12² + 5²) = 13 m; a kitérő élek közül A′B′ és D′C′ 5 m-re, BB′ és CC′ 12 m-re van.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Tipikus hiba: a falakon is a testátló?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A levegőben és a falakon mért út összekeverése"
          wrong="Ha a pók a falakon mászik, az útja is a testátló: √(a² + b² + c²)."
          wrongExplanation="A testátló a test belsejében halad, a falon mászó pók nem járhatja be. A falakon mért út mindig hosszabb (itt 6,02 m > 5,12 m)."
          correct="A falakon: két szomszédos lapot síkba terítünk, és a téglalap átlóját számoljuk: √(L² + (p + q)²)."
          correctExplanation="Mindhárom kiterítést ki kell számolni; a legrövidebb az, amelyiknél az átmetszett él a leghosszabb (L), a másik két él összeadódik."
          tip="Ellenőrzés: a falakon mért út sosem lehet rövidebb a testátlónál, és sosem hosszabb a két szomszédos lapon „élek mentén” mért útnál."
        />
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium I: Testátló és a pók három útja" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              {[
                { lbl: 'AB (szélesség)', v: w, set: setW, cls: 'accent-indigo-600' },
                { lbl: 'BC (hosszúság)', v: l, set: setL, cls: 'accent-emerald-600' },
                { lbl: 'AE (magasság)', v: h, set: setH, cls: 'accent-amber-600' }
              ].map((s) => (
                <div key={s.lbl}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {s.lbl}: {fmt(s.v, 1)} m
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="0.5"
                    value={s.v}
                    onChange={(e) => s.set(Number(e.target.value))}
                    className={`w-full ${s.cls}`}
                    aria-label={s.lbl}
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">AC lapátló</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(faceDiag)} m</div>
                </div>
                <div className="bg-rose-50 rounded-xl p-2 border border-rose-200">
                  <div className="text-[11px] text-slate-500">EC testátló (levegőben)</div>
                  <div className="font-mono font-black text-rose-900">{fmt(bodyDiag)} m</div>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                {paths.map((p) => (
                  <div
                    key={p.name}
                    className={`flex justify-between rounded-lg px-3 py-1.5 border ${Math.abs(p.val - best) < 1e-9 ? 'bg-green-50 border-green-300 font-bold text-green-900' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
                  >
                    <span>{p.name}</span>
                    <span className="font-mono">{fmt(p.val)} m</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 italic">
                A zöld sor a legrövidebb falmenti út. Figyeld meg: mindig az az út nyer, amelyik a leghosszabb élt metszi át!
              </p>
            </div>
            <Solid3DViewer
              solid={box}
              extras={[
                { from: E, to: C, color: '#e11d48', label: 'e' },
                { from: A, to: C, color: '#059669', dashed: true, label: 'f' }
              ]}
              polygons={[{ points: [A, C, E], fill: '#fb7185', opacity: 0.18 }]}
            />
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Interaktív Laboratórium II: Milyen messze van a lámpa?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <p className="text-sm text-slate-700">
                A terem magassága, szélessége és hosszúsága úgy aránylik, mint <strong>4 : 6 : 9</strong>. A lámpa a mennyezet közepéről lóg le.
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Az összes él hosszának összege: {fmt(edgeSum, 1)} m</label>
                <input
                  type="range"
                  min="30"
                  max="90"
                  step="0.2"
                  value={edgeSum}
                  onChange={(e) => setEdgeSum(Number(e.target.value))}
                  className="w-full accent-purple-600"
                  aria-label="élek összege"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A zsinór hossza: {fmt(cord, 2)} m</label>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.05"
                  value={cord}
                  onChange={(e) => setCord(Number(e.target.value))}
                  className="w-full accent-amber-600"
                  aria-label="zsinór hossza"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>
                  k = {fmt(edgeSum, 1)} : 76 = {fmt(k, 3)} ⇒ {fmt(rh)} m × {fmt(rw)} m × {fmt(rl)} m
                </div>
                <div>
                  a) padlótól: {fmt(rh)} − {fmt(c)} = <strong>{fmt(toFloor)} m</strong>
                </div>
                <div>
                  b) legkisebb faltól: {fmt(rl)} : 2 = <strong>{fmt(toSmallWall)} m</strong>
                </div>
                <div>
                  c) mennyezet hosszú élétől: √({fmt(rw / 2)}² + {fmt(c)}²) = <strong>{fmt(toCeilEdge)} m</strong>
                </div>
                <div className="text-xs text-slate-500">padló hosszú élétől: {fmt(toFloorEdge)} m</div>
              </div>
            </div>
            <Solid3DViewer
              solid={room}
              extras={[
                { from: [rw / 2, rh, rl / 2], to: lamp, color: '#d97706', width: 1.5 },
                { from: lamp, to: [rw / 2, 0, rl / 2], color: '#7c3aed', dashed: true, label: 'a' },
                { from: lamp, to: [rw / 2, rh - c, rl], color: '#2563eb', dashed: true, label: 'b' },
                { from: lamp, to: [0, rh, rl / 2], color: '#e11d48', label: 'c' }
              ]}
              pointLabels={[{ at: lamp, text: '●', color: '#d97706' }]}
            />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SpatialDistanceTheory;
