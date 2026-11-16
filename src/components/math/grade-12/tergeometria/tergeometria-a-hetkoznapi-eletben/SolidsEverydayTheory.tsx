import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, makeSphere, makeCylinder, makeCone, makePyramid, makeBox, Solid } from '../shared/Solid3DViewer';
import {
  SolidsEverydayGateSvg,
  SolidsEverydayCakeSvg,
  SolidsEverydayCandleSvg,
  SolidsEverydayHatSvg,
  SolidsEverydayGearSvg,
  SolidsEverydayTankSvg
} from './SolidsEverydayFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

type SolidKind = 'sphere' | 'cylinder' | 'cone' | 'pyramid' | 'box';

const MATERIALS: { id: string; name: string; rho: number }[] = [
  { id: 'pine', name: 'fenyőfa (0,43 g/cm³)', rho: 0.43 },
  { id: 'water', name: 'víz (1 g/cm³)', rho: 1 },
  { id: 'glass', name: 'üveg (3,1 g/cm³)', rho: 3.1 },
  { id: 'alu', name: 'alumínium (2,7 g/cm³)', rho: 2.7 },
  { id: 'brass', name: 'sárgaréz (8,73 g/cm³)', rho: 8.73 }
];

export const SolidsEverydayTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: anyagszükséglet- és tömegkalkulátor
  const [kind, setKind] = useState<SolidKind>('cone');
  const [size, setSize] = useState<number>(2.1);
  const [height, setHeight] = useState<number>(5.4);
  const [matId, setMatId] = useState<string>('pine');
  const [count, setCount] = useState<number>(2);
  const [loss, setLoss] = useState<number>(0);
  const [extra, setExtra] = useState<number>(0);
  const rho = MATERIALS.find((m) => m.id === matId)?.rho ?? 1;

  const solid: Solid = useMemo(() => {
    switch (kind) {
      case 'sphere':
        return makeSphere(size);
      case 'cylinder':
        return makeCylinder(size, height);
      case 'cone':
        return makeCone(size, height);
      case 'pyramid':
        return makePyramid(4, size / Math.SQRT2, height);
      default:
        return makeBox(size, height, size);
    }
  }, [kind, size, height]);

  // méretek dm-ben: térfogat dm³ = liter, tömeg kg (ρ g/cm³ = kg/dm³)
  let V = 0;
  let A = 0;
  if (kind === 'sphere') {
    V = (4 / 3) * Math.PI * size ** 3;
    A = 4 * Math.PI * size ** 2;
  } else if (kind === 'cylinder') {
    V = Math.PI * size ** 2 * height;
    A = 2 * Math.PI * size * (size + height);
  } else if (kind === 'cone') {
    const a = Math.hypot(size, height);
    V = (Math.PI * size ** 2 * height) / 3;
    A = Math.PI * size * (size + a);
  } else if (kind === 'pyramid') {
    const mo = Math.hypot(height, size / 2);
    V = (size * size * height) / 3;
    A = size * size + 2 * size * mo;
  } else {
    V = size * size * height;
    A = 2 * size * size + 4 * size * height;
  }
  const mass = V * rho * count;
  const rawNeeded = V * count;
  const withLoss = rawNeeded / (1 - loss / 100);
  const paper = A * count * (1 + extra / 100);

  // Labor II: farsangi kalap tervező
  const [hatH, setHatH] = useState<number>(40);
  const [hatK, setHatK] = useState<number>(54);
  const hr = hatK / (2 * Math.PI);
  const ha = Math.hypot(hatH, hr);
  const hphi = (360 * hr) / ha;
  const hP = Math.PI * hr * ha;
  const half = ((hphi / 2) * Math.PI) / 180;
  const rectW = hphi >= 180 ? 2 * ha : 2 * ha * Math.sin(half);
  const rectH = hphi >= 180 ? ha * (1 + Math.sin(half - Math.PI / 2)) : ha;
  const sc = 150 / Math.max(rectW, rectH);
  const Cx = 170;
  const Cy = 30 + ha * sc;
  const s1 = [Cx + ha * sc * Math.cos(-Math.PI / 2 - half), Cy + ha * sc * Math.sin(-Math.PI / 2 - half)];
  const s2 = [Cx + ha * sc * Math.cos(-Math.PI / 2 + half), Cy + ha * sc * Math.sin(-Math.PI / 2 + half)];
  const hatPath = `M ${Cx.toFixed(1)} ${Cy.toFixed(1)} L ${s1[0].toFixed(1)} ${s1[1].toFixed(1)} A ${(ha * sc).toFixed(1)} ${(ha * sc).toFixed(1)} 0 ${hphi > 180 ? 1 : 0} 1 ${s2[0].toFixed(1)} ${s2[1].toFixed(1)} Z`;

  const sizeLabel = kind === 'sphere' || kind === 'cylinder' || kind === 'cone' ? 'sugár r' : 'alapél a';

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="tergeometria-a-hetkoznapi-eletben"
      title="17. Térgeometria a hétköznapi életben"
      subtitle="Hány kiló a fenyőfa gömb, hány szelet jut a tortából, hány liter viasz kell a gyertyákhoz? Térfogat, felszín, sűrűség és százalékok a gyakorlatban."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="emerald"
      pdfFilename="12_osztaly_tergeometria_hetkoznapi_eletben_tananyag.pdf"
      practiceTitle="Készen állsz a gyakorlati térgeometriára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — MODELLEZÉS A GYAKORLATBAN',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center space-y-1">
              <div className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">tömeg = sűrűség · térfogat (m = ρ · V)</div>
              <div className="font-mono text-sm font-bold text-emerald-900 dark:text-emerald-200">anyag (festék, papír, lemez) ↔ felszín; töltet (víz, viasz, homok) ↔ térfogat</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>1 dm³ = 1 liter; 1 g/cm³ = 1 kg/dm³ = 1 t/m³.</li>
              <li>Ha a felhasznált anyag p%-a veszteség, a szükséges mennyiség: hasznos / (1 − p/100).</li>
              <li>Ráhagyás (pl. +36%): a számított felület 1,36-szorosa.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a testek a mindennapokban" badge="Tankönyv 44. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A hétköznapi tárgyakat jól közelíthetjük a tanult testekkel: a kapu díszgömbje <strong>gömb</strong>, a kalap <strong>forgáskúp</strong>, a gyertya <strong>gúla</strong>, a fogaskerék <strong>csonkakúp</strong>, a víztároló <strong>félgömb + henger + kúp</strong>.
            </p>
            <p>A modellezés lépései:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Milyen test(ek)ből áll a tárgy? Mi a kérdés: <strong>térfogat</strong> (tömeg, űrtartalom) vagy <strong>felszín</strong> (festék, papír)?</li>
              <li>A szükséges adatok (magasság, alkotó) kiszámítása Pitagorasz-tétellel, szögfüggvényekkel.</li>
              <li>Mértékegységek egyeztetése, majd a százalékok (veszteség, ráhagyás) és a kerekítés.</li>
            </ol>
          </div>
          <SolidsEverydayGateSvg />
        </div>
        <TheoryTable
          headers={['Mennyiség', 'Átváltás', 'Példa']}
          rows={[
            ['Térfogat', '1 dm³ = 1 l = 1000 cm³; 1 m³ = 1000 l', '0,35 dl = 35 cm³'],
            ['Sűrűség', '1 g/cm³ = 1 kg/dm³ = 1000 kg/m³', '0,43 g/cm³ = 0,43 kg/dm³'],
            ['Terület', '1 m² = 100 dm² = 10 000 cm²', '187,3 dm² = 1,873 m²'],
            ['Tömeg', 'm = ρ · V', '127,46 dm³ · 0,43 kg/dm³ ≈ 54,8 kg']
          ]}
        />
      </TheorySection>

      {/* 2. Kidolgozott feladatok I */}
      <TheorySection title="2. Megoldott feladatok: kapu és torta" badge="1–2. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Díszgömbök és kúpok fenyőfából" badge="Tömeg, festés" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>R = r = 2,1 dm, a kúp magassága 5,4 dm.</li>
              <li>Gömb: V = 4/3 · π · 2,1³ ≈ <strong>38,79 dm³</strong>; kúp: V = π · 2,1² · 5,4/3 ≈ <strong>24,94 dm³</strong>.</li>
              <li>a) Négy tárgy: 2 · (38,79 + 24,94) ≈ 127,46 dm³; tömeg: 127,46 · 0,43 ≈ <strong>54,8 kg</strong>.</li>
              <li>b) Kúp alkotója: √(2,1² + 5,4²) ≈ 5,79 dm; palást π · 2,1 · 5,79 ≈ 38,22 dm²; gömbfelszín 4π · 2,1² ≈ 55,42 dm². Festendő: 2 · (55,42 + 38,22) ≈ <strong>187,3 dm²</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. Születésnapi torta" badge="Becslés" badgeColor="rose">
            <SolidsEverydayCakeSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Hasáb: 20 · 20 · 8 = 3200 cm³; félhenger (r = 10 cm): π · 10² · 8 / 2 ≈ 1256,6 cm³.</li>
              <li>Összesen ≈ 4456,6 cm³; egy szelet 3 · 8 · 5 = 120 cm³ ⇒ 4456,6 / 120 ≈ 37,1 ⇒ kb. <strong>37 embert</strong> kínálhatunk meg.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladatok II */}
      <TheorySection title="3. Megoldott feladatok: gyertya, kalap, fogaskerék" badge="3–5. feladat" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TheoryCard title="3. Gyertyagyár (érettségi, 2007)" badge="Gúla" badgeColor="sky">
            <SolidsEverydayCandleSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a) Fél átló 2,5√2 cm ⇒ M = √(64 − 12,5) ≈ 7,18 cm; V = 25 · 7,18/3 ≈ <strong>60 cm³</strong>.</li>
              <li>b) 130 gyertya: 130 · 59,8 ≈ 7774 cm³ hasznos viasz; 6% veszteség ⇒ 7774 / 0,94 ≈ 8271 cm³ ≈ <strong>8,3 liter</strong>.</li>
              <li>c) Oldallapmagasság √(64 − 6,25) ≈ 7,60 cm; A = 25 + 2 · 5 · 7,60 ≈ 101,0 cm²; 136%: ≈ 137,35 cm²; 40 doboz ≈ <strong>5494 cm²</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Farsangi kalap" badge="Kúppalást" badgeColor="purple">
            <SolidsEverydayHatSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>2rπ = 54 ⇒ r ≈ 8,59 cm; alkotó a = √(40² + 8,59²) ≈ 40,91 cm.</li>
              <li>a) Karton: P = rπa = 27 · a ≈ <strong>1105 cm²</strong>.</li>
              <li>b) A körcikk sugara 40,91 cm, középponti szöge 360° · r/a ≈ <strong>75,6°</strong>. Szimmetrikus elhelyezésnél ≈ 50,2 cm × 40,9 cm-es kartonlap kell; ha az egyik határoló sugár a lap szélén fut, ≈ 40,9 cm × 39,6 cm.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="5. Kúpos fogaskerekek" badge="Csonkakúp" badgeColor="indigo">
            <SolidsEverydayGearSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>R = 1,5 cm, r = 1 cm, R − r = 0,5 cm; az alkotó: a = 0,5 / cos α.</li>
              <li>a) 45°: a ≈ 0,707 cm, P = 2,5 · π · 0,707 ≈ 5,55 cm²; 40% ≈ <strong>2,22 cm²</strong>.</li>
              <li>b) 50°: a ≈ 0,778 cm, P ≈ 6,11 cm²; 40% ≈ <strong>2,44 cm²</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Házi feladatok */}
      <TheorySection title="4. További gyakorlati feladatok (házi feladatok)" badge="HF" badgeColor="slate">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <SolidsEverydayTankSvg />
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li><strong>Homokkúp</strong> (m = 80 cm, nyílásszög 120°): r = 80 · tg 60° ≈ 138,6 cm, V = 512 000π cm³ ≈ <strong>1,61 m³</strong>; 12 m³ homokhoz 12 / 1,61 ≈ 7,46 ⇒ <strong>8 forduló</strong>.</li>
            <li><strong>Sajttömb</strong> (r = 16 cm, 3 cm vastag, 15°-os cikkek, 200 g/db): 24 darab ⇒ <strong>4,8 kg</strong>; egy darab V = π · 16² · 3 / 24 ≈ 100,5 cm³; felszíne 2 · 256π/24 + 2 · 16 · 3 + (2π · 16/24) · 3 ≈ 175,6 cm², +25% ⇒ ≈ <strong>219,5 cm²</strong> csomagolóanyag.</li>
            <li><strong>Víztároló</strong> (henger d = 6 m, 8 m; félgömb; 3 m-es kúp): V = 72π + 18π + 9π = 99π ≈ <strong>311,0 m³</strong>; festendő felület: 48π + 18π + 3π√18 ≈ <strong>247,3 m²</strong>.</li>
            <li><strong>Üvegdísz</strong> (két hatszög alapú gúla, alapél 1 cm, magasság 2 és 5 cm, ρ = 3,1 kg/dm³): V = (6√3/4) · 7/3 ≈ 6,06 cm³ ⇒ ≈ <strong>18,8 g</strong>.</li>
            <li><strong>Falfesték</strong> (8. lecke): 15 l festék 120–135 m²-re elég; 1 l 8–9 m²-en ≈ 0,11–0,125 mm vastag réteg; 53 m²-es lakás: 6 · 53 = 318 m² ⇒ 2,4–2,7 ⇒ <strong>3 vödör</strong>.</li>
          </ul>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: veszteség és ráhagyás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A 6% veszteség nem 6%-kal több anyag!"
          wrong="szükséges viasz = 7774 cm³ · 1,06 ≈ 8240 cm³"
          wrongExplanation="Ha a felhasznált anyag 6%-a vész el, akkor a hasznos rész a felhasznált anyag 94%-a. A szorzás 1,06-tal kevesebbet ad, mint amennyi kell."
          correct="szükséges viasz = 7774 cm³ / 0,94 ≈ 8271 cm³ ≈ 8,3 liter"
          correctExplanation="Ellenőrzés: 8271 cm³ 94%-a ≈ 7775 cm³ – pontosan a 130 gyertya térfogata."
          tip="Mindig gondold végig: mihez viszonyít a százalék? A ráhagyás (pl. +36%) a számított felülethez, a veszteség a felhasznált anyaghoz."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Anyagszükséglet- és tömegkalkulátor" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['sphere', 'Gömb'],
                    ['cylinder', 'Henger'],
                    ['cone', 'Kúp'],
                    ['pyramid', 'Négyzetes gúla'],
                    ['box', 'Négyzetes hasáb']
                  ] as [SolidKind, string][]
                ).map(([k, n]) => (
                  <button
                    key={k}
                    onClick={() => setKind(k)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${kind === k ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{sizeLabel}: {fmt(size, 1)} dm</label>
                <input type="range" min="0.5" max="6" step="0.1" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="méret" />
              </div>
              {kind !== 'sphere' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">magasság: {fmt(height, 1)} dm</label>
                  <input type="range" min="0.5" max="10" step="0.1" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-amber-600" aria-label="magasság" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <label className="text-xs font-semibold text-slate-600">
                  anyag
                  <select value={matId} onChange={(e) => setMatId(e.target.value)} className="w-full border border-slate-300 rounded-lg px-2 py-1 text-xs mt-1">
                    {MATERIALS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  darabszám
                  <input
                    type="number"
                    min="1"
                    value={count}
                    onChange={(e) => setCount(Math.max(1, Math.round(Number(e.target.value) || 1)))}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1 text-xs mt-1"
                    aria-label="darabszám"
                  />
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  veszteség: {loss}%
                  <input type="range" min="0" max="30" value={loss} onChange={(e) => setLoss(Number(e.target.value))} className="w-full accent-rose-600" aria-label="veszteség" />
                </label>
                <label className="text-xs font-semibold text-slate-600">
                  ráhagyás a felületen: {extra}%
                  <input type="range" min="0" max="60" value={extra} onChange={(e) => setExtra(Number(e.target.value))} className="w-full accent-purple-600" aria-label="ráhagyás" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-slate-500">1 db térfogata</div>
                  <div className="font-mono font-black text-slate-900">{fmt(V)} dm³ = {fmt(V)} l</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-slate-500">1 db felszíne</div>
                  <div className="font-mono font-black text-slate-900">{fmt(A)} dm²</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-slate-500">összes tömeg (m = ρ·V)</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(mass)} kg</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-slate-500">szükséges alapanyag</div>
                  <div className="font-mono font-black text-amber-900">{fmt(withLoss)} l</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-2 border border-purple-200 col-span-2">
                  <div className="text-slate-500">bevonó / csomagolóanyag (teljes felszín + ráhagyás)</div>
                  <div className="font-mono font-black text-purple-900">{fmt(paper)} dm²</div>
                </div>
              </div>
            </div>
            <Solid3DViewer solid={solid} className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" />
          </div>
          <TheoryCallout type="success" title="Próbáld ki!">
            Kúp, r = 2,1 dm, m = 5,4 dm, fenyőfa, 2 db ⇒ 49,88 dm³, ≈ 21,4 kg. Gömb, r = 2,1 dm, 2 db ⇒ ≈ 33,4 kg. A kettő együtt ≈ 54,8 kg – ez az 1. feladat.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Farsangi kalap tervező" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a kalap magassága: {hatH} cm</label>
              <input type="range" min="10" max="60" value={hatH} onChange={(e) => setHatH(Number(e.target.value))} className="w-full accent-purple-600" aria-label="kalap magassága" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">fejkörfogat (alapkör kerülete): {hatK} cm</label>
              <input type="range" min="40" max="70" value={hatK} onChange={(e) => setHatK(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="fejkörfogat" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <svg viewBox="0 0 340 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <rect
                x={(Cx - (rectW * sc) / 2).toFixed(1)}
                y="30"
                width={(rectW * sc).toFixed(1)}
                height={(rectH * sc).toFixed(1)}
                fill="none"
                stroke="#64748b"
                strokeDasharray="4 3"
              />
              <path d={hatPath} fill="rgba(139,92,246,0.18)" stroke="#7c3aed" strokeWidth="2" />
              <circle cx={Cx} cy={Cy} r="2.2" fill="#0f172a" />
              <text x="12" y="212" fontSize="11" fill="#334155">
                karton: {fmt(rectW, 1)} cm × {fmt(rectH, 1)} cm (szimmetrikus elhelyezés)
              </text>
            </svg>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
              <div>alapkör sugara: r = K / (2π) = <strong>{fmt(hr)} cm</strong></div>
              <div>alkotó: a = √(m² + r²) = <strong>{fmt(ha)} cm</strong></div>
              <div>körcikk középponti szöge: φ = 360° · r / a = <strong>{fmt(hphi, 1)}°</strong></div>
              <div>karton (palást): rπa = <strong>{fmt(hP, 1)} cm²</strong></div>
              <div className="text-xs text-slate-500 pt-1">A tankönyvi kalap: m = 40 cm, K = 54 cm ⇒ r ≈ 8,59 cm, a ≈ 40,91 cm, φ ≈ 75,6°, ≈ 1105 cm².</div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SolidsEverydayTheory;
