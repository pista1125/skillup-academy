import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  Solid3DViewer,
  makeBox,
  makeCylinder,
  makeSphere,
  makePyramid,
  makeCone,
  makeFrustumCone,
  makeFrustumPyramid,
  Solid,
  Vec3
} from '../shared/Solid3DViewer';
import {
  SolidsPracticeExamColumnSvg,
  SolidsPracticeExamFunnelSvg,
  SolidsPracticeExamConeSectorSvg,
  SolidsPracticeExamFountainSvg,
  SolidsPracticeExamBowlSvg,
  SolidsPracticeExamLouvreSvg
} from './SolidsPracticeExamFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');
const deg = (r: number) => (r * 180) / Math.PI;

type Kind = 'box' | 'cyl' | 'sphere' | 'pyr' | 'cone' | 'fpyr' | 'fcone';
const KINDS: [Kind, string][] = [
  ['box', 'Négyzetes hasáb'],
  ['cyl', 'Henger'],
  ['sphere', 'Gömb'],
  ['pyr', 'Négyzetes gúla'],
  ['cone', 'Kúp'],
  ['fpyr', 'Négyzetes csonkagúla'],
  ['fcone', 'Csonkakúp']
];

export const SolidsPracticeExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: képlettár élőben
  const [kind, setKind] = useState<Kind>('fcone');
  const [p, setP] = useState<number>(4);
  const [q, setQ] = useState<number>(2);
  const [h, setH] = useState<number>(3);
  const qe = Math.min(q, p - 0.5);

  const solid: Solid = useMemo(() => {
    switch (kind) {
      case 'box':
        return makeBox(p, h, p);
      case 'cyl':
        return makeCylinder(p, h);
      case 'sphere':
        return makeSphere(p);
      case 'pyr':
        return makePyramid(4, p / Math.SQRT2, h);
      case 'cone':
        return makeCone(p, h);
      case 'fpyr':
        return makeFrustumPyramid(4, p / Math.SQRT2, qe / Math.SQRT2, h);
      default:
        return makeFrustumCone(p, qe, h);
    }
  }, [kind, p, qe, h]);

  let V = 0;
  let A = 0;
  let formula = '';
  if (kind === 'box') {
    V = p * p * h;
    A = 2 * p * p + 4 * p * h;
    formula = 'V = a²·m, A = 2a² + 4am';
  } else if (kind === 'cyl') {
    V = Math.PI * p * p * h;
    A = 2 * Math.PI * p * (p + h);
    formula = 'V = r²πm, A = 2rπ(r + m)';
  } else if (kind === 'sphere') {
    V = (4 / 3) * Math.PI * p ** 3;
    A = 4 * Math.PI * p * p;
    formula = 'V = 4R³π/3, A = 4R²π';
  } else if (kind === 'pyr') {
    const mo = Math.hypot(h, p / 2);
    V = (p * p * h) / 3;
    A = p * p + 2 * p * mo;
    formula = `V = a²M/3, A = a² + 2a·mₒ (mₒ = ${fmt(mo)})`;
  } else if (kind === 'cone') {
    const a = Math.hypot(h, p);
    V = (Math.PI * p * p * h) / 3;
    A = Math.PI * p * (p + a);
    formula = `V = r²πm/3, A = rπ(r + a) (a = ${fmt(a)})`;
  } else if (kind === 'fpyr') {
    const mo = Math.hypot(h, (p - qe) / 2);
    V = (h / 3) * (p * p + p * qe + qe * qe);
    A = p * p + qe * qe + 2 * (p + qe) * mo;
    formula = `V = M/3·(a² + ab + b²), A = a² + b² + 2(a + b)m (m = ${fmt(mo)})`;
  } else {
    const a = Math.hypot(h, p - qe);
    V = ((Math.PI * h) / 3) * (p * p + p * qe + qe * qe);
    A = Math.PI * (p * p + qe * qe + (p + qe) * a);
    formula = `V = Mπ/3·(R² + Rr + r²), A = π[R² + r² + (R + r)a] (a = ${fmt(a)})`;
  }
  const hasH = kind !== 'sphere';
  const hasQ = kind === 'fpyr' || kind === 'fcone';
  const pLabel = kind === 'box' || kind === 'pyr' || kind === 'fpyr' ? 'alapél a' : kind === 'sphere' ? 'sugár R' : 'sugár R / r';

  // Labor II: hajlásszögek a szabályos négyoldalú gúlában
  const [ga, setGa] = useState<number>(35);
  const [gM, setGM] = useState<number>(20.6);
  const halfDiag = (ga * Math.SQRT2) / 2;
  const edgeAng = deg(Math.atan(gM / halfDiag));
  const faceAng = deg(Math.atan(gM / (ga / 2)));
  const sideEdge = Math.hypot(gM, halfDiag);
  const mo = Math.hypot(gM, ga / 2);
  const lateral = 2 * ga * mo;
  const gV = (ga * ga * gM) / 3;
  const pyrSolid = useMemo(() => makePyramid(4, halfDiag, gM), [halfDiag, gM]);
  const pyrExtras = useMemo(
    () => [
      { from: [0, 0, 0] as Vec3, to: [0, gM, 0] as Vec3, color: '#059669', dashed: true, label: 'M' },
      { from: [0, 0, 0] as Vec3, to: [-halfDiag / 2, 0, halfDiag / 2] as Vec3, color: '#d97706', label: 'a/2' }
    ],
    [halfDiag, gM]
  );
  // a háromszögrajz (oldallap síkmetszete és átlós metszet)
  const sc = 130 / Math.max(halfDiag, gM);
  const triE = { x0: 30, y0: 170, bx: 30 + halfDiag * sc, hy: 170 - gM * sc };
  const triF = { x0: 190, y0: 170, bx: 190 + (ga / 2) * sc, hy: 170 - gM * sc };

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="gyakorlas-tudasproba"
      title="18. Gyakorlás, tudáspróba"
      subtitle="A teljes térgeometria fejezet összefoglalása: képlettár, hajlásszögek, hasonló testek – és a tankönyv érettségi típusú feladatai a két tudáspróbával."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="violet"
      pdfFilename="12_osztaly_tergeometria_gyakorlas_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a fejezetzáró tudáspróbára?"
      practiceSubtitle="90 kérdés 3 szinten a teljes térgeometria fejezetből!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A TÉRGEOMETRIA HÁROM ALAPKÉPLETE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center space-y-1">
              <div className="font-mono text-sm font-black text-violet-900 dark:text-violet-200">hasáb, henger: V = T · M</div>
              <div className="font-mono text-sm font-black text-violet-900 dark:text-violet-200">gúla, kúp: V = T · M / 3</div>
              <div className="font-mono text-sm font-black text-violet-900 dark:text-violet-200">csonka test: V = M/3 · (T + √(Tt) + t); gömb: V = 4R³π/3</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Felszín = az összes határoló lap (alaplap, fedőlap, palást) területének összege.</li>
              <li>A hiányzó magasságot, alkotót, oldallapmagasságot mindig egy derékszögű háromszögből (Pitagorasz, szögfüggvények) kapjuk.</li>
              <li>Hasonló testeknél: hosszúságok λ, felszínek λ², térfogatok λ³ arányban.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Képlettár */}
      <TheorySection title="1. Képlettár: a fejezet testei" badge="Összefoglaló" badgeColor="violet">
        <TheoryTable
          headers={['Test (lecke)', 'Felszín A', 'Térfogat V', 'Fontos összefüggés']}
          rows={[
            ['Kocka, téglatest (1–3.)', '6a²; 2(ab + bc + ac)', 'a³; abc', 'testátló a√3; √(a² + b² + c²)'],
            ['Hasáb (2–3.)', '2T + P', 'T · M', 'P = alapkerület · M (egyenes hasáb)'],
            ['Henger (4–5.)', '2r²π + 2rπm', 'r²πm', 'tengelymetszet: 2r × m téglalap'],
            ['Gömb (6–7.)', '4R²π', '4R³π/3', 'síkmetszet: ρ² = R² − d²'],
            ['Gúla (10–11.)', 'T + P', 'T · M / 3', 'mₒ² = M² + (a/2)² (négyzetes)'],
            ['Kúp (12–13.)', 'rπ(r + a)', 'r²πm / 3', 'a² = r² + m²; φ = 360° · r / a'],
            ['Csonkagúla (14–16.)', 'T + t + P', 'M/3 · (T + √(Tt) + t)', 'négyzetes: A = a² + b² + 2(a + b)m'],
            ['Csonkakúp (14–16.)', 'π[R² + r² + (R + r)a]', 'Mπ/3 · (R² + Rr + r²)', 'a² = M² + (R − r)²']
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Távolság és szög (1., 9. lecke)" badge="Térelemek" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Pont és sík távolsága: a merőleges szakasz hossza.</li>
              <li>Kitérő egyenesek távolsága: a normáltranszverzális hossza.</li>
              <li>Egyenes és sík szöge: az egyenes és a vetülete szöge.</li>
              <li>Két sík szöge: a metszésvonalra merőleges egyenesek szöge.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Hasonló testek (8. lecke)" badge="λ, λ², λ³" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Kétszeres méret ⇒ 4-szeres felszín, 8-szoros térfogat.</li>
              <li>A párhuzamos síkkal levágott kis gúla / kúp hasonló az eredetihez.</li>
              <li>Felezés magasság felénél: térfogat 1 : 7.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Gyakorlati számítások (17. lecke)" badge="Mértékegység" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1 dm³ = 1 l; 1 m³ = 1000 l; 1 g/cm³ = 1 kg/dm³.</li>
              <li>Tömeg: m = ρ · V.</li>
              <li>Veszteség p%: hasznos / (1 − p/100); ráhagyás: · (1 + q/100).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Feladatok */}
      <TheorySection title="2. Megoldott feladatok (tankönyv 46. o.)" badge="Feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Az Antarktisz jégtakarója" badge="Becslés" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              T ≈ 13,8 millió km², átlagos vastagság 2200 m = 2,2 km: V ≈ 13,8 · 10⁶ · 2,2 ≈ <strong>3,04 · 10⁷ km³ = 3,04 · 10¹⁶ m³</strong>. Ez a Föld 1,46 milliárd km³-es vízkészletének ≈ <strong>2,1%</strong>-a.
            </p>
          </TheoryCard>
          <TheoryCard title="2. Négyzetes kőoszlop és a belőle faragott gúla" badge="Hajlásszög" badgeColor="orange">
            <SolidsPracticeExamColumnSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a) Testátló: √(12² + 12² + 18²) = √612 ≈ <strong>24,74 dm</strong>.</li>
              <li>b) A legnagyobb gúla alapja és magassága az oszlopé: V<sub>gúla</sub> : V<sub>oszlop</sub> = <strong>1 : 3</strong>.</li>
              <li>c) Oldalél: √(18² + (6√2)²) = √396 ≈ <strong>19,90 dm</strong>.</li>
              <li>d) Oldalél–alapsík: tg α = 18 / (6√2) ⇒ <strong>α ≈ 64,8°</strong>; e) oldallap–alapsík: tg β = 18/6 = 3 ⇒ <strong>β ≈ 71,6°</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Túlfolyik-e a tölcsér?" badge="Összetett test" badgeColor="rose">
            <SolidsPracticeExamFunnelSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Felső csonkakúp (R = 5,5, r = 4,5, M = 0,5): ≈ 39,4 cm³; henger (r = 4,5, m = 5): ≈ 318,1 cm³.</li>
              <li>Csonkakúp (4,5 → 1, M = 2,5): ≈ 67,4 cm³; kifolyó (1 → 0,5, M = 4,5): ≈ 8,2 cm³.</li>
              <li>Összesen ≈ <strong>433 cm³ &lt; 500 cm³</strong>: a fél liter szörp kb. 67 cm³-rel <strong>túlfolyik</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Kúp a körcikkből" badge="Kúppalást" badgeColor="purple">
            <SolidsPracticeExamConeSectorSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Alkotó a = 18 cm, az ív 2rπ: r = 18 · 210/360 = <strong>10,5 cm</strong>.</li>
              <li>a) A = rπ(r + a) = 10,5 · 28,5 · π = 299,25π ≈ <strong>940,1 cm²</strong>.</li>
              <li>b) m = √(18² − 10,5²) ≈ <strong>14,62 cm</strong>, V = 10,5²π · 14,62 / 3 ≈ <strong>1688 cm³</strong>.</li>
              <li>c) sin(φ/2) = 10,5/18 ⇒ nyílásszög <strong>φ ≈ 71,4°</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Tudáspróbák */}
      <TheorySection title="3. Tudáspróba I. és II. – eredmények" badge="Tudáspróba" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Tudáspróba I." badge="47. o." badgeColor="sky">
            <SolidsPracticeExamFountainSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>1.</strong> 3,2 × 3,7 × 6,8 dm-es ládika: 21 · 24 = <strong>504</strong> pálca (15 mm-es négyzet alap); testátló √70,17 ≈ 8,38 dm &gt; 8,3 dm ⇒ a 8,3 dm-es pálca <strong>elfér</strong>.</li>
              <li><strong>2.</strong> Fazék (⌀ 18 cm, 12 cm leves): 972π ≈ 3054 cm³ ≈ <strong>3,05 l</strong>; merőkanál (⌀ 8 cm félgömb) ≈ 134 cm³ ⇒ <strong>22 adag</strong>.</li>
              <li><strong>3.</strong> Henger = gömb térfogata (⌀ 72 mm): m = 4r/3 = <strong>48 mm</strong>.</li>
              <li><strong>5.</strong> Szökőkút (a = 40 cm, M = 70 cm): belső felület ≈ <strong>58,2 dm²</strong>, ≈ <strong>37,3 l</strong> víz, az élek ≈ <strong>68,0°</strong>-os szöget zárnak be a vízszintessel.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Tudáspróba II." badge="47. o." badgeColor="indigo">
            <SolidsPracticeExamLouvreSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>1.</strong> 30 × 40 × 20 cm: testátló √2900 ≈ 53,85 cm ⇒ az 53 cm-es bot <strong>becsomagolható</strong>; a lapra állított gúla V = 30 · 40 · 20 / 3 = <strong>8000 cm³</strong>.</li>
              <li><strong>2.</strong> Kúp = gömb térfogata (⌀ 54 mm): m = 4r = <strong>108 mm</strong>.</li>
              <li><strong>3.</strong> Tál (⌀ 22 cm-ből ⌀ 11 cm-es félgömb kivájva): ≈ <strong>348 cm³</strong> víz fér bele; festendő 393,25π ≈ <strong>1235 cm²</strong>.</li>
              <li><strong>5.</strong> Louvre (a = 35 m, M = 20,6 m): oldalél ≈ <strong>39,8°</strong>, oldallap ≈ <strong>49,7°</strong>, üvegfelület ≈ <strong>1892 m²</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SolidsPracticeExamBowlSvg />
          <TheoryCallout type="info" title="A tál festése – mit kell összeadni?">
            Külső félgömb 2π · 11² = 242π, belső félgömb 2π · 5,5² = 60,5π és a perem körgyűrűje π(11² − 5,5²) = 90,75π. Összesen 393,25π ≈ 1235 cm². (A Tudáspróba I. 4. és II. 4. – cölöp, nyerscsavar – a tankönyvi ábra méreteit igényli.)
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: oldalél vagy oldallap?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A két hajlásszög más derékszögű háromszögben van"
          wrong="Az oldalél szöge: tg α = M / (a/2)"
          wrongExplanation="A fél alapél az oldallap magasságának vetülete, nem az oldalélé. A kőoszlop gúlájánál így 71,6° jönne ki az oldalélre a helyes 64,8° helyett."
          correct="Oldalél: tg α = M / (fél átló); oldallap: tg β = M / (fél alapél)"
          correctExplanation="12 dm alapél, 18 dm magasság: tg α = 18 / (6√2) ⇒ α ≈ 64,8°; tg β = 18/6 ⇒ β ≈ 71,6°. Az oldallap mindig meredekebb, mint az oldalél."
          tip="Rajzold be a test magasságát és a talppontból a vetületet – a hajlásszög mindig a ferde szakasz és a vetülete között van."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Képlettár élőben" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {KINDS.map(([k, n]) => (
                  <button
                    key={k}
                    onClick={() => setKind(k)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${kind === k ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{pLabel}: {fmt(p, 1)} cm</label>
                <input type="range" min="1" max="10" step="0.5" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-violet-600" aria-label="méret" />
              </div>
              {hasQ && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{kind === 'fpyr' ? 'fedőél b' : 'fedőkör sugara r'}: {fmt(qe, 1)} cm</label>
                  <input type="range" min="0.5" max="9.5" step="0.5" value={q} onChange={(e) => setQ(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="kisebb méret" />
                </div>
              )}
              {hasH && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">magasság: {fmt(h, 1)} cm</label>
                  <input type="range" min="1" max="12" step="0.5" value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full accent-amber-600" aria-label="magasság" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-violet-50 rounded-xl p-2 border border-violet-200">
                  <div className="text-slate-500">felszín A</div>
                  <div className="font-mono font-black text-violet-900">{fmt(A)} cm²</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-slate-500">térfogat V</div>
                  <div className="font-mono font-black text-amber-900">{fmt(V)} cm³</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-mono">{formula}</p>
              <p className="text-xs text-slate-500 italic">Húzd az egérrel a testet a forgatáshoz! Próbáld ki: csonkakúp R = 4, r = 2, M = 3 ⇒ V = 28π ≈ 87,96 cm³.</p>
            </div>
            <Solid3DViewer solid={solid} className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" />
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Hajlásszögek a négyzetes gúlában" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alapél a: {fmt(ga, 1)} m</label>
              <input type="range" min="5" max="60" step="0.5" value={ga} onChange={(e) => setGa(Number(e.target.value))} className="w-full accent-purple-600" aria-label="alapél" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">magasság M: {fmt(gM, 1)} m</label>
              <input type="range" min="2" max="60" step="0.1" value={gM} onChange={(e) => setGM(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="magasság" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <svg viewBox="0 0 340 190" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
                <polygon points={`${triE.x0},${triE.y0} ${triE.bx},${triE.y0} ${triE.x0},${triE.hy}`} fill="rgba(220,38,38,0.12)" stroke="#dc2626" strokeWidth="2" />
                <polygon points={`${triF.x0},${triF.y0} ${triF.bx},${triF.y0} ${triF.x0},${triF.hy}`} fill="rgba(217,119,6,0.12)" stroke="#d97706" strokeWidth="2" />
                <path d={`M ${triE.x0 + 12} ${triE.y0} A 12 12 0 0 0 ${triE.x0} ${triE.y0 - 12}`} fill="none" stroke="#0f172a" strokeWidth="1.2" />
                <circle cx={triE.x0 + 4.7} cy={triE.y0 - 4.7} r="1.7" fill="#0f172a" />
                <path d={`M ${triF.x0 + 12} ${triF.y0} A 12 12 0 0 0 ${triF.x0} ${triF.y0 - 12}`} fill="none" stroke="#0f172a" strokeWidth="1.2" />
                <circle cx={triF.x0 + 4.7} cy={triF.y0 - 4.7} r="1.7" fill="#0f172a" />
                <text x={triE.x0} y="184" fontSize="10" fill="#b91c1c">oldalél: fél átló</text>
                <text x={triF.x0} y="184" fontSize="10" fill="#b45309">oldallap: fél alapél</text>
                <text x={triE.bx - 30} y={triE.y0 - 6} fontSize="11" fontWeight="bold" fill="#b91c1c">α</text>
                <text x={triF.bx - 30} y={triF.y0 - 6} fontSize="11" fontWeight="bold" fill="#b45309">β</text>
              </svg>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>fél átló = a√2/2 = <strong>{fmt(halfDiag)} m</strong>; oldalél = <strong>{fmt(sideEdge)} m</strong></div>
                <div>oldalél szöge: tg α = M / (fél átló) ⇒ <strong>α ≈ {fmt(edgeAng, 1)}°</strong></div>
                <div>oldallap szöge: tg β = M / (a/2) ⇒ <strong>β ≈ {fmt(faceAng, 1)}°</strong></div>
                <div>oldallapmagasság mₒ = <strong>{fmt(mo)} m</strong>; palást = 2a·mₒ = <strong>{fmt(lateral, 1)} m²</strong></div>
                <div>térfogat = a²M/3 = <strong>{fmt(gV, 1)} m³</strong></div>
              </div>
            </div>
            <Solid3DViewer solid={pyrSolid} extras={pyrExtras} className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" />
          </div>
          <TheoryCallout type="tip" title="Próbáld ki a tankönyvi adatokkal!">
            Louvre: a = 35, M = 20,6 ⇒ α ≈ 39,8°, β ≈ 49,7°, palást ≈ 1892 m². Kőoszlop-gúla: a = 12, M = 18 ⇒ α ≈ 64,8°, β ≈ 71,6°.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SolidsPracticeExamTheory;
