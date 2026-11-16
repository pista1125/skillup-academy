import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { fmt, Pt, RightAt, arcPath, S_BLUE, S_RED, S_GREEN, S_INK, S_PURPLE } from './sumKit';
import {
  SymmetryTypesSvg,
  CentralSimilaritySvg,
  PythagorasThalesSvg,
  TrigRatiosSvg,
  BridgeArcSvg,
  AreaFormulasSvg,
  CosineLawSvg
} from './TransformationsSolidsSummaryFigures';

const DEG = Math.PI / 180;
const O: Pt = [200, 150];
const tri: Pt[] = [
  [235, 175],
  [280, 160],
  [250, 120]
];

export const TransformationsSolidsSummaryTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: középpontos hasonlóság
  const [k, setK] = useState<number>(1.5);
  // Labor II: háromszög két oldalból és a közbezárt szögből
  const [a, setA] = useState<number>(5.3);
  const [b, setB] = useState<number>(4.4);
  const [gamma, setGamma] = useState<number>(82);

  const img = useMemo(() => tri.map((P): Pt => [O[0] + k * (P[0] - O[0]), O[1] + k * (P[1] - O[1])]), [k]);

  const sol = useMemo(() => {
    const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(gamma * DEG));
    // a szöge (α a-val szemben) koszinusztétellel – egyértelmű
    const alpha = Math.acos(Math.max(-1, Math.min(1, (b * b + c * c - a * a) / (2 * b * c)))) / DEG;
    const beta = 180 - gamma - alpha;
    const T = (a * b * Math.sin(gamma * DEG)) / 2;
    return { c, alpha, beta, T };
  }, [a, b, gamma]);

  // a laborháromszög rajza: C az origóban, CB az x tengelyen (a), CA γ szögben (b)
  const draw = useMemo(() => {
    const pts = [
      [0, 0],
      [a, 0],
      [b * Math.cos(gamma * DEG), b * Math.sin(gamma * DEG)]
    ];
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const w = Math.max(...xs) - Math.min(...xs);
    const h = Math.max(...ys) - Math.min(...ys);
    const sc = Math.min(260 / (w || 1), 170 / (h || 1));
    const ox = 30 - Math.min(...xs) * sc + (260 - w * sc) / 2;
    const oy = 215;
    const P = pts.map((p): Pt => [ox + p[0] * sc, oy - p[1] * sc]);
    return { C: P[0], B: P[1], A: P[2] };
  }, [a, b, gamma]);

  const kType = k > 1 ? 'nagyítás' : k === 1 ? 'egybevágóság (identitás)' : k > 0 ? 'kicsinyítés' : k === -1 ? 'középpontos tükrözés' : k < -1 ? 'nagyítás + tükrözés O-ra' : 'kicsinyítés + tükrözés O-ra';

  return (
    <TheoryTemplate
      topicId="g12-rendszerezo-osszefoglalas"
      subtopicId="transzformaciok-alakzatok"
      title="8. Geometriai transzformációk, síkbeli és térbeli alakzatok"
      subtitle="Egybevágóság és szimmetriák, hasonlóság, Pitagorasz és Thalész, kör, szögfüggvények, szinusz- és koszinusztétel, terület-, felszín- és térfogatképletek."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • TANANYAG"
      themeColor="teal"
      pdfFilename="12_osztaly_osszefoglalas_transzformaciok_alakzatok_tananyag.pdf"
      practiceTitle="Készen állsz a geometriai számítási feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'KÉPLETTÁR — TRANSZFORMÁCIÓK, ALAKZATOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center">
                <div className="text-[11px] font-bold text-teal-700">Hasonlóság (k)</div>
                <div className="font-mono text-sm font-black text-teal-900 dark:text-teal-200">K: |k|, T: k², V: |k|³</div>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
                <div className="text-[11px] font-bold text-indigo-700">Szinusztétel</div>
                <div className="font-mono text-sm font-black text-indigo-900 dark:text-indigo-200">a : b = sin α : sin β</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center">
                <div className="text-[11px] font-bold text-rose-700">Koszinusztétel</div>
                <div className="font-mono text-sm font-black text-rose-900 dark:text-rose-200">c² = a² + b² − 2ab · cos γ</div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Pitagorasz: a² + b² = c²; Thalész: az átmérő a körvonal pontjaiból derékszögben látszik.</li>
              <li>T = a · mₐ/2 = ab · sin γ/2; körcikk: r²π · α/360°; sin² α + cos² α = 1.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Transzformációk és szimmetriák" badge="Tankönyv 151–152. o." badgeColor="teal">
        <TheoryTable
          headers={['', 'Fogalom', 'Tartalom']}
          rows={[
            ['D', 'Geometriai transzformáció', 'Kölcsönösen egyértelmű leképezés, értelmezési tartománya és értékkészlete ugyanaz a ponthalmaz.'],
            ['D', 'Egybevágósági transzformáció', 'Távolságtartó. A síkban: tengelyes tükrözés, középpontos tükrözés, pont körüli elforgatás, eltolás és ezek egymásutánja.'],
            ['D', 'Tengelyes szimmetria', 'Van egyenes, amelyre tükrözve önmagába megy: egyenlő szárú és szabályos háromszög, négyzet, téglalap, rombusz, deltoid, húrtrapéz, kör.'],
            ['D', 'Középpontos szimmetria', 'Van pont, amelyre tükrözve önmagába megy: négyzet, téglalap, rombusz, paralelogramma, kör.'],
            ['D', 'Forgásszimmetria', 'Van 0° és 360° közötti elforgatás, amely önmagába viszi; a legkisebb ilyen szöggel jellemezzük (négyzet 90°, szabályos ötszög 72°, hatszög 60°, téglalap 180°, kör: bármely szög).'],
            ['T', 'Háromszögek egybevágósága', 'Egy oldal és a rajta fekvő két szög; két oldal és a közbezárt szög; két oldal és a hosszabbikkal szemközti szög; három oldal páronként egyenlő.'],
            ['D', 'Középpontos hasonlóság', 'O középpont, k arány: OP′ = k · OP az OP félegyenesen. k > 1 nagyítás, 0 < k < 1 kicsinyítés, k = 1 egybevágóság; negatív k: |k| arányú hasonlóság és O-ra tükrözés.'],
            ['D/T', 'Hasonlósági transzformáció', 'Aránytartó; minden hasonlóság = középpontos hasonlóság + egybevágóság. Bármely két azonos oldalszámú szabályos sokszög és bármely két kör hasonló.'],
            ['T', 'Háromszögek hasonlósága', 'Két-két szög egyenlő; két oldal aránya és a közbezárt szög; két oldal aránya és a nagyobbikkal szemközti szög; a három oldal aránya egyenlő.'],
            ['T', 'Arányok', 'Kerületek aránya |k|, területeké k², felszíneké k², térfogatoké |k|³.'],
            ['D/T', 'Középvonal', 'Két oldalfelező pontot összekötő szakasz; párhuzamos a harmadik oldallal, és feleakkora.']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SymmetryTypesSvg />
          <CentralSimilaritySvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Derékszögű háromszög, kör, szögfüggvények" badge="Tankönyv 153. o." badgeColor="blue">
        <TheoryTable
          headers={['', 'Tétel / definíció', 'Tartalom']}
          rows={[
            ['T', 'Pitagorasz-tétel és megfordítása', 'Derékszögű háromszögben a² + b² = c²; ha két oldal négyzetösszege a harmadik négyzete, a háromszög derékszögű.'],
            ['T', 'Thalész-tétel és megfordítása', 'A kör átmérője a körvonal bármely (végpontoktól különböző) pontjából derékszögben látszik; ha AB egy C pontból derékszögben látszik, C az AB átmérőjű körön van.'],
            ['T', 'Érintő, érintőszakaszok', 'Az érintő merőleges az érintési pontba húzott sugárra; külső pontból húzott érintőszakaszok egyenlők.'],
            ['T', 'Középponti szög', 'A középponti szög egyenesen arányos az ívhosszal és a körcikk területével.'],
            ['D', 'Hegyesszögek szögfüggvényei', 'sin α = szemközti befogó/átfogó, cos α = melletti befogó/átfogó, tg α = szemközti/melletti befogó.'],
            ['D', 'Kiterjesztés', 'sin 90° = 1, cos 90° = 0; 90° < α < 180°: sin α = sin(180° − α), cos α = −cos(180° − α), tg α = −tg(180° − α).'],
            ['T', 'Összefüggések', 'sin α = cos(90° − α), cos α = sin(90° − α); sin² α + cos² α = 1; tg α = sin α/cos α (α ≠ 90°).'],
            ['T', 'Szinusz- és koszinusztétel', 'a : b = sin α : sin β; c² = a² + b² − 2ab · cos γ.']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PythagorasThalesSvg />
          <TrigRatiosSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Terület, felszín, térfogat" badge="Tankönyv 154. o." badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <TheoryTable
              headers={['Alakzat', 'Képlet']}
              rows={[
                ['háromszög', 'T = a · mₐ/2 = a · b · sin γ/2'],
                ['paralelogramma', 'T = a · mₐ = a · b · sin γ'],
                ['deltoid (rombusz)', 'T = e · f/2'],
                ['trapéz', 'T = (a + c)/2 · m'],
                ['kör', 'K = 2rπ, T = r²π'],
                ['körcikk', 'T = r²π · α/360°, ív: i = 2rπ · α/360°']
              ]}
            />
            <TheoryTable
              headers={['Test', 'Felszín', 'Térfogat']}
              rows={[
                ['hasáb', 'a lapok területének összege', 'V = T_a · M'],
                ['gúla', 'a lapok területének összege', 'V = T_a · M/3'],
                ['csonkagúla', 'a lapok területének összege', 'V = M/3 · (T + √(T·t) + t)'],
                ['forgáshenger', 'A = 2r²π + 2rπ · M', 'V = r²π · M'],
                ['forgáskúp', 'A = r²π + rπ · a', 'V = r²π · M/3'],
                ['csonkakúp', 'A = π[R² + (R + r) · a + r²]', 'V = Mπ/3 · (R² + Rr + r²)'],
                ['gömb', 'A = 4r²π', 'V = 4r³π/3']
              ]}
            />
          </div>
          <AreaFormulasSvg />
        </div>
      </TheorySection>

      <TheorySection title="4. Kidolgozott feladat: a függőhíd íve" badge="Kidolgozott 4." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Egy függőhíd tartószerkezete körív: a két vég távolsága 750 m, az ív legmagasabb pontja 120 m-rel van a hídpálya fölött. Mekkora a sugár?</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Thalész miatt a CBD háromszög B-nél derékszögű (CD átmérő).</li>
              <li>∢EDB és ∢BCE is ∢DBE pótszöge, ezért egyenlők: az EBC és EDB háromszögek hasonlók.</li>
              <li>EB/EC = ED/EB ⇒ 375/120 = (2r − 120)/375 ⇒ 375² = 120 · (2r − 120).</li>
              <li>2r − 120 ≈ 1172 ⇒ 2r ≈ 1292 ⇒ r ≈ 646 m, vagyis kb. <strong>650 m</strong>.</li>
              <li>Pitagorasszal: (r − 120)² + 375² = r² ⇒ 240r = 375² + 120² ⇒ r ≈ 646 m.</li>
            </ol>
          </div>
          <BridgeArcSvg />
        </div>
      </TheorySection>

      <TheorySection title="5. Kidolgozott feladat: szakaszok és szögek" badge="Kidolgozott 5." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>a)</strong> A DEG derékszögű háromszögben (befogók 6,2 cm és 3,2 cm) tg α = 3,2/6,2 ≈ 0,516 ⇒ α ≈ 27,3°. A magasság talppontja V: p = 6,2 · cos 27,3° ≈ <strong>5,51 cm</strong>; φ és α merőleges szárú hegyesszögek ⇒ φ ≈ 27,3°; q = 3,2 · sin 27,3° ≈ <strong>1,47 cm</strong>.
              </li>
              <li>
                <strong>b)</strong> A KLM egyenlő szárú háromszög alapja 6 cm, alapon fekvő szöge 33,7° ⇒ a másik alapszög is 33,7°. Az alaphoz tartozó magasság két egybevágó derékszögű háromszögre bont: cos 33,7° = 3/d ⇒ d ≈ <strong>3,61 cm</strong>.
              </li>
              <li>
                <strong>c)</strong> A PQR háromszög (4,4; 5,3; 6,4 cm) nem derékszögű: 4,4² + 5,3² = 47,45 ≠ 40,96. Koszinusztétel a leghosszabb oldalra: cos β = (5,3² + 4,4² − 6,4²)/(2 · 5,3 · 4,4) ≈ 0,139 ⇒ β ≈ <strong>82,0°</strong>.
              </li>
              <li>
                Szinusztétel: sin δ/sin 82° = 4,4/6,4 ⇒ sin δ ≈ 0,681 ⇒ δ ≈ <strong>42,9°</strong> (a 137,1° nem jó: a rövidebb oldallal szemközti szög hegyesszög).
              </li>
            </ol>
          </div>
          <CosineLawSvg />
        </div>
      </TheorySection>

      <TheorySection title="6. Megoldott feladatok a feladatsorból" badge="I–II. rész" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Síkgeometria" badge="B1–B4, B6–B8, B11–B12" badgeColor="sky">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Tervrajz: 2 cm ↔ 5 m, így 1,8 m ↔ 0,72 cm.</li>
              <li>Körvonal pontjából két merőleges húr (5 és 7 cm): a végpontok egy átmérőt határoznak meg (Thalész): 2r = √74 ⇒ r ≈ 4,30 cm.</li>
              <li>Téglalap: BC = 26 · tg 24,7° ≈ 12,0 egység. 16 m-es kerületű körben a 14 m-es ív: 14/16 · 360° = 315°.</li>
              <li>Igaz-hamis: a szögek nem nőnek nagyításkor (H); a páratlan oldalszámú szabályos sokszög nem középpontosan szimmetrikus (H); felére kicsinyítve a terület negyedére csökken (I); a téglalapnak 2 tengelye van (H).</li>
              <li>3 m átmérőjű virágágyás körül 0,5 m sáv: (2² − 1,5²)π = 1,75π ≈ 5,50 m².</li>
              <li>Paralelogramma, átlók 10 és 16 cm, szögük 60°: a rövidebb oldal √(5² + 8² − 2 · 5 · 8 · cos 60°) = 7,0 cm.</li>
              <li>10, 24, 26 cm: derékszögű (100 + 576 = 676); a középvonal-háromszög (5, 12, 13) is derékszögű.</li>
              <li>sin 28° = cos 62°; érintő ⊥ sugár; két szög egyenlő ⇒ hasonlók; a tompaszögek koszinusza kisebb, mint 0.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Térgeometria, hasonlóság" badge="B5, B9, B10, P1–P5" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>Szabályos négyoldalú gúla, oldalél = 3 · alapátló: cos φ = (d/2)/(3d) = 1/6 ⇒ φ ≈ 80,4°.</li>
              <li>Henger, 37 700 l víz 30 cm magasan: r² = 37,7/(0,3π) ≈ 40 m² ⇒ d ≈ 12,65 m.</li>
              <li>Kocka felszíne 64-szeres ⇒ k = 8 ⇒ térfogat 512-szeres.</li>
              <li>Súlyzó (8 g/cm³, 10 kg): V = 1250 cm³, a markolat (d = 2,8 cm, 18 cm) ≈ 110,84 cm³, a két 5 cm-es vég R²π · 10 ≈ 1139,16 cm³ ⇒ d ≈ 12,0 cm. Teljes felszín: 2(2R²π + 2Rπ · 5) − 2 · 1,4²π + 2 · 1,4π · 18 ≈ 980 cm² ≈ 9,80 dm² ⇒ a bevonás ≈ 784 Ft.</li>
              <li>Szabályos nyolcszög (a = 12): legrövidebb átló 12 · √(2 + √2) ≈ 22,17, leghosszabb 12/sin 22,5° ≈ 31,36; beírt és köré írt kör területaránya cos² 22,5° ≈ 0,854; hasáb (m = 10): V = 2(1 + √2) · 144 · 10 ≈ 6953.</li>
              <li>Gömb, R = 10 cm: azonos térfogatú félgömb sugara ∛2000 ≈ 12,6 cm; 5 cm-es síkmetszet területe 75π ≈ 235,6 cm²; feleakkora kerületű metszet távolsága √75 ≈ 8,66 cm.</li>
              <li>Cserepes virág rajza: körcikk 9π · 255/360 ≈ 20,03 cm²; alsó trapéz (7; 6 cm, 95°): m = 0,5 · tg 85° ≈ 5,715 cm, T ≈ 37,15 cm²; felső trapéz (7; 8 cm, 105°): m = 0,5 · tg 75° ≈ 1,866 cm, T ≈ 14,00 cm² ⇒ összesen ≈ 71,2 cm². A valódi cserép 4-szeres méretű két csonkakúp (r = 12 és 14 cm, m ≈ 22,86 cm; r = 14 és 16 cm, m ≈ 7,46 cm): V ≈ 12 161 + 5 284 ≈ 17 445 cm³ ≈ 17,4 liter föld.</li>
              <li>Harmadolópontok: P₂Q₂ = 2 cm, P₁Q₁ = 4 cm (hasonlóság, k = 1/3 és 2/3); a trapéz területe 4/9 − 1/9 = 1/3 része a háromszögnek.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Tipikus hiba: a hasonlóság aránya" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Hossz: k, terület: k², térfogat: k³"
          wrong="A kocka felszíne 64-szeresére nőtt, tehát a térfogata is 64-szeresére (vagy az éle is 64-szeresére)."
          wrongExplanation="A felszín területjellegű mennyiség: k² = 64 ⇒ k = 8 (az él 8-szoros)."
          correct="A térfogat k³ = 8³ = 512-szeresére nő."
          correctExplanation="Mindig előbb a hosszarányt (k) határozd meg, abból jön a terület- (k²) és a térfogatarány (k³)."
          tip="A szögek hasonlóságnál nem változnak – egy 4-szeres nagyítás után is ugyanakkorák."
        />
        <TheoryCallout type="warning" title="Szinusztétel és két megoldás">
          sin δ = 0,681-ből δ ≈ 42,9° vagy 137,1°. A rövidebb oldallal szemközti szög csak hegyesszög lehet – ilyenkor az egyik megoldást el kell vetni.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Interaktív Laboratórium I: középpontos hasonlóság" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Arány: k = {fmt(k)}</label>
                <input type="range" min="-2" max="2.5" step="0.25" value={k} onChange={(e) => setK(Number(e.target.value))} className="w-full accent-blue-600" aria-label="k" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[2, 1.5, 0.5, -0.5, -1].map((v) => (
                  <button key={v} onClick={() => setK(v)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-blue-100">
                    k = {fmt(v)}
                  </button>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-blue-900 space-y-1">
                <div>
                  Típus: <strong>{k === 0 ? 'k = 0 nem megengedett' : kType}</strong>
                </div>
                <div>
                  Távolságok: <strong>{fmt(Math.abs(k), 2)}</strong>-szeresek, kerület: <strong>{fmt(Math.abs(k), 2)}</strong>-szeres
                </div>
                <div>
                  Terület: k² = <strong>{fmt(k * k, 4)}</strong>-szeres; (testeknél a térfogat |k|³ = {fmt(Math.abs(k) ** 3, 4)}-szeres)
                </div>
                <div className="text-xs text-slate-600">A szögek nem változnak, a képháromszög oldalai párhuzamosak az eredetivel.</div>
              </div>
            </div>
            <svg viewBox="0 0 400 300" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily="system-ui, sans-serif">
              {k !== 0 &&
                tri.map((P, i) => (
                  <line key={i} x1={O[0]} y1={O[1]} x2={Math.abs(k) >= 1 ? img[i][0] : P[0]} y2={Math.abs(k) >= 1 ? img[i][1] : P[1]} stroke="#94a3b8" strokeDasharray="3 3" />
                ))}
              {k < 0 &&
                img.map((P, i) => <line key={`n${i}`} x1={O[0]} y1={O[1]} x2={P[0]} y2={P[1]} stroke="#fca5a5" strokeDasharray="3 3" />)}
              <polygon points={tri.map((p) => p.join(',')).join(' ')} fill="#dbeafe" stroke={S_BLUE} strokeWidth="2" />
              {k !== 0 && <polygon points={img.map((p) => p.join(',')).join(' ')} fill={k < 0 ? '#fee2e2' : '#dcfce7'} fillOpacity="0.6" stroke={k < 0 ? S_RED : S_GREEN} strokeWidth="2" />}
              <circle cx={O[0]} cy={O[1]} r="4" fill={S_INK} />
              <text x={O[0] - 16} y={O[1] + 4} fontSize="12" fontWeight="bold" fill={S_INK}>
                O
              </text>
              {['A', 'B', 'C'].map((t, i) => (
                <text key={t} x={tri[i][0] + 4} y={tri[i][1] - 4} fontSize="11" fontWeight="bold" fill={S_BLUE}>
                  {t}
                </text>
              ))}
              {k !== 0 &&
                ['A′', 'B′', 'C′'].map((t, i) => (
                  <text key={t} x={img[i][0] + 4} y={img[i][1] + 12} fontSize="11" fontWeight="bold" fill={k < 0 ? S_RED : S_GREEN}>
                    {t}
                  </text>
                ))}
            </svg>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Interaktív Laboratórium II: háromszög két oldalból és a közbezárt szögből" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">a = CB = {fmt(a, 1)} cm</label>
                <input type="range" min="1" max="10" step="0.1" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full accent-purple-600" aria-label="a" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">b = CA = {fmt(b, 1)} cm</label>
                <input type="range" min="1" max="10" step="0.1" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="b" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">γ = {gamma}°</label>
                <input type="range" min="5" max="175" step="1" value={gamma} onChange={(e) => setGamma(Number(e.target.value))} className="w-full accent-rose-600" aria-label="gamma" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { t: '3; 4; 90° (Pitagorasz)', v: [3, 4, 90] },
                  { t: 'PQR: 5,3; 4,4; 82°', v: [5.3, 4.4, 82] },
                  { t: '7; 10; 150°', v: [7, 10, 150] }
                ].map((p) => (
                  <button
                    key={p.t}
                    onClick={() => {
                      setA(p.v[0]);
                      setB(p.v[1]);
                      setGamma(p.v[2]);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-purple-100"
                  >
                    {p.t}
                  </button>
                ))}
              </div>
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900 space-y-1">
                <div>
                  Koszinusztétel: c = √(a² + b² − 2ab · cos γ) ≈ <strong>{fmt(sol.c, 2)} cm</strong>
                </div>
                <div>
                  α ≈ <strong>{fmt(sol.alpha, 1)}°</strong>, β = 180° − γ − α ≈ <strong>{fmt(sol.beta, 1)}°</strong>
                </div>
                <div>
                  Terület: T = ab · sin γ/2 ≈ <strong>{fmt(sol.T, 2)} cm²</strong>
                </div>
                <div className="text-xs text-slate-600">
                  {gamma === 90 ? 'γ = 90°: cos γ = 0, a koszinusztétel a Pitagorasz-tétellé egyszerűsödik.' : gamma > 90 ? 'γ tompaszög: cos γ < 0, ezért c² > a² + b².' : 'γ hegyesszög: cos γ > 0, ezért c² < a² + b².'}
                </div>
              </div>
            </div>
            <svg viewBox="0 0 320 240" className="w-full max-w-md h-auto mx-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily="system-ui, sans-serif">
              <polygon points={`${draw.A} ${draw.B} ${draw.C}`} fill="#f3e8ff" stroke={S_INK} strokeWidth="2" />
              {gamma === 90 ? (
                <RightAt V={draw.C} P={draw.B} Q={draw.A} r={14} color={S_RED} />
              ) : (
                <path d={arcPath(draw.C, draw.B, draw.A, 18)} fill="none" stroke={S_RED} strokeWidth="2" />
              )}
              <text x={draw.C[0] - 14} y={draw.C[1] + 16} fontSize="12" fontWeight="bold" fill={S_INK}>
                C
              </text>
              <text x={draw.B[0] + 4} y={draw.B[1] + 16} fontSize="12" fontWeight="bold" fill={S_INK}>
                B
              </text>
              <text x={draw.A[0] - 4} y={draw.A[1] - 8} fontSize="12" fontWeight="bold" fill={S_INK}>
                A
              </text>
              <text x={(draw.C[0] + draw.B[0]) / 2} y={draw.C[1] + 16} fontSize="11" textAnchor="middle" fill={S_PURPLE}>
                a
              </text>
              <text x={(draw.C[0] + draw.A[0]) / 2 - 10} y={(draw.C[1] + draw.A[1]) / 2} fontSize="11" fill={S_GREEN}>
                b
              </text>
              <text x={(draw.B[0] + draw.A[0]) / 2 + 6} y={(draw.B[1] + draw.A[1]) / 2} fontSize="11" fill={S_RED} fontWeight="bold">
                c = ?
              </text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TransformationsSolidsSummaryTheory;
