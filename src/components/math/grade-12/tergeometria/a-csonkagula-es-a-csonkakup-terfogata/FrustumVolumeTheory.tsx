import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, makeFrustumCone, makeFrustumPyramid, Vec3 } from '../shared/Solid3DViewer';
import {
  FrustumVolumeCheeseSvg,
  FrustumVolumeHeightTriangleSvg,
  FrustumVolumeFormulasSvg,
  FrustumVolumeConeCutsSvg,
  FrustumVolumeComplementSvg,
  FrustumVolumeDifferenceSvg
} from './FrustumVolumeFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

export const FrustumVolumeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: „napóleoni vágás” – nagy test − kis test
  const [shape, setShape] = useState<'pyr' | 'cone'>('pyr');
  const [baseSize, setBaseSize] = useState<number>(4);
  const [fullH, setFullH] = useState<number>(6.4);
  const [lambda, setLambda] = useState<number>(0.6);

  const cutY = fullH * (1 - lambda);
  const Rc = shape === 'pyr' ? baseSize / Math.SQRT2 : baseSize;
  const rc = Rc * lambda;
  const solid = useMemo(
    () => (shape === 'pyr' ? makeFrustumPyramid(4, Rc, rc, cutY) : makeFrustumCone(Rc, rc, cutY)),
    [shape, Rc, rc, cutY]
  );
  const extras = useMemo(() => {
    const apex: Vec3 = [0, fullH, 0];
    const n = shape === 'pyr' ? 4 : 6;
    const segs = Array.from({ length: n }, (_, i) => {
      const t = (shape === 'pyr' ? Math.PI / 2 : 0) + (2 * Math.PI * i) / n;
      const p: Vec3 = [rc * Math.cos(t), cutY, rc * Math.sin(t)];
      return { from: p, to: apex, color: '#059669', dashed: true };
    });
    return [...segs, { from: [0, 0, 0] as Vec3, to: [0, cutY, 0] as Vec3, color: '#d97706', dashed: true, label: 'M' }];
  }, [shape, rc, cutY, fullH]);

  const baseArea = shape === 'pyr' ? baseSize * baseSize : baseSize * baseSize * Math.PI;
  const vBig = (baseArea * fullH) / 3;
  const vSmall = vBig * lambda ** 3;
  const vFr = vBig - vSmall;
  const topArea = baseArea * lambda * lambda;
  const vFormula = (cutY / 3) * (baseArea + Math.sqrt(baseArea * topArea) + topArea);

  // Labor II: a képlet levezetése lépésenként
  const [la, setLa] = useState<number>(12);
  const [lb, setLb] = useState<number>(8);
  const [lM, setLM] = useState<number>(6);
  const [step, setStep] = useState<number>(1);
  const lbEff = Math.min(lb, la - 0.5);
  const lx = (lbEff * lM) / (la - lbEff);
  const lvBig = (la * la * (lM + lx)) / 3;
  const lvSmall = (lbEff * lbEff * lx) / 3;
  const lvFormula = (lM / 3) * (la * la + la * lbEff + lbEff * lbEff);
  const lvWrong = (lM * (la * la + lbEff * lbEff)) / 2;

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-csonkagula-es-a-csonkakup-terfogata"
      title="16. A csonkagúla és a csonkakúp térfogata"
      subtitle="Napóleon kardcsapása és a Valençay-sajt: a csonka test térfogata a nagy és a levágott kis test térfogatának különbsége – és ebből a V = M/3 · (T + √(Tt) + t) képlet."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="amber"
      pdfFilename="12_osztaly_csonkagula_csonkakup_terfogata_tananyag.pdf"
      practiceTitle="Készen állsz a csonka testek térfogatára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — CSONKA TESTEK TÉRFOGATA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center space-y-1">
              <div className="font-mono text-base font-black text-amber-900 dark:text-amber-200">V = M/3 · (T + √(T·t) + t)</div>
              <div className="font-mono text-sm font-bold text-amber-900 dark:text-amber-200">négyzetes csonkagúla: V = M/3 · (a² + ab + b²)</div>
              <div className="font-mono text-sm font-bold text-amber-900 dark:text-amber-200">csonkakúp: V = Mπ/3 · (R² + Rr + r²)</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Másik út: V<sub>csonka</sub> = V<sub>nagy</sub> − V<sub>kicsi</sub>, és hasonlóság miatt V<sub>kicsi</sub> = λ³ · V<sub>nagy</sub>.</li>
              <li>M a csonka test <strong>magassága</strong> (az alap- és fedőlap síkjának távolsága), nem az alkotó.</li>
              <li>A térfogat <strong>nem</strong> M · (T + t)/2 – ez a hasábszerű „átlagolás” mindig túl nagy értéket ad.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a „napóleoni vágás”" badge="Tankönyv 40. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A franciaországi <strong>Valençay</strong> (ejtsd: válanszé) kecskesajt csonkagúla alakú. A legenda szerint Napóleon – kudarcba fulladt egyiptomi hadjáratából hazatérve – annyira feldühödött a piramis formájú sajt láttán, hogy egy kardcsapással <strong>levágta a tetejét</strong>.
            </p>
            <p>
              A sajt tehát egy gúlából keletkezett: a vágás az alaplappal <strong>párhuzamos</strong> sík, a levágott rész egy kisebb, az eredetihez <strong>középpontosan hasonló</strong> gúla.
            </p>
          </div>
          <FrustumVolumeCheeseSvg />
        </div>
      </TheorySection>

      {/* 2. Kidolgozott feladat */}
      <TheorySection title="2. Kidolgozott feladat: a sajt térfogata" badge="Kidolgozott feladat" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A sajt a vágás előtt szabályos négyoldalú gúla volt: alapéle <strong>4 cm</strong>, oldaléle <strong>7 cm</strong>. A levágott kis gúla magassága az eredeti magasság <strong>60%-a</strong>. Mekkora a csonkagúla térfogata?
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>A hasonlóság aránya λ = 0,6, ezért V<sub>kicsi</sub> : V<sub>nagy</sub> = λ³ = 0,6³ = <strong>0,216</strong>.</li>
              <li>V<sub>csonka</sub> = V<sub>nagy</sub> − 0,216 · V<sub>nagy</sub> = <strong>0,784 · V<sub>nagy</sub></strong>.</li>
              <li>A nagy gúla magassága (fél átló 2√2 cm, oldalél 7 cm): M = √(7² − (2√2)²) = √41 ≈ <strong>6,4 cm</strong>.</li>
              <li>V<sub>nagy</sub> = 16 · 6,4 / 3 ≈ <strong>34,1 cm³</strong>.</li>
              <li>V<sub>csonka</sub> = 0,784 · 34,1 ≈ <strong>26,7 cm³</strong> (kerekítés nélkül, M = √41-gyel ≈ 26,8 cm³).</li>
            </ol>
          </div>
          <FrustumVolumeHeightTriangleSvg />
        </div>
      </TheorySection>

      {/* 3. Elmélet */}
      <TheorySection title="3. A csonkagúla és a csonkakúp térfogatképlete" badge="Elmélet" badgeColor="indigo">
        <FrustumVolumeDifferenceSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="1. módszer: különbség" badge="Hasonlóság" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              A csonkagúla / csonkakúp térfogata az eredeti gúla / kúp és a lemetszett, hozzá hasonló gúla / kúp térfogatának különbsége. Ha a hasonlóság aránya λ, akkor
            </p>
            <p className="font-mono text-sm font-bold text-emerald-900 text-center my-2">V<sub>csonka</sub> = (1 − λ³) · V<sub>nagy</sub></p>
          </TheoryCard>
          <TheoryCard title="2. módszer: a képlet" badge="T, t, M" badgeColor="amber">
            <p className="text-sm text-slate-700 leading-relaxed">
              Bebizonyítható: ha az alaplap területe T, a fedőlapé t, a magasság M, akkor
            </p>
            <p className="font-mono text-sm font-bold text-amber-900 text-center my-2">V<sub>csonka</sub> = M/3 · (T + √(T·t) + t)</p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Négyzetes csonkagúlára (T = a², t = b², √(Tt) = ab): <strong>V = M/3 · (a² + ab + b²)</strong>; csonkakúpra (T = R²π, t = r²π): <strong>V = Mπ/3 · (R² + Rr + r²)</strong>.
            </p>
          </TheoryCard>
        </div>
        <FrustumVolumeFormulasSvg />
        <TheoryCallout type="info" title="Honnan jön a képlet? (vázlat)">
          Legyen a kiegészítő kis gúla magassága x. A hasonlóság miatt √t : √T = x : (M + x), ebből x = M·√t / (√T − √t). Ekkor V = T(M + x)/3 − t·x/3 = (M·T + x(T − t))/3, és mivel x(T − t) = M·√t·(√T + √t) = M(√(Tt) + t), kapjuk: V = M/3 · (T + √(Tt) + t).
        </TheoryCallout>
      </TheorySection>

      {/* 4. Feladatok */}
      <TheorySection title="4. Megoldott feladatok" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. feladat: 45°-os oldallapok" badge="Gúla − gúla" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A gúla magassága 8 cm, oldallapjai 45°-osak ⇒ fél alapél = 8 cm, alapél <strong>16 cm</strong>, T = <strong>256 cm²</strong>.</li>
              <li>A levágott gúla 6 cm magas ⇒ alapéle 12 cm, alapterülete <strong>144 cm²</strong>.</li>
              <li>V<sub>nagy</sub> = 256 · 8/3 ≈ <strong>682,7 cm³</strong>, V<sub>kicsi</sub> = 144 · 6/3 = <strong>288 cm³</strong>, V<sub>csonka</sub> ≈ <strong>394,7 cm³</strong>.</li>
              <li>Felszínek: kis gúla 144 + 144√2 ≈ <strong>347,6 cm²</strong>; csonkagúla 256 + 144 + 112√2 ≈ <strong>558,4 cm²</strong> (oldallapmagasság 2√2 cm).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. feladat: kiegészítő gúla" badge="Hasonlóság" badgeColor="purple">
            <FrustumVolumeComplementSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a = 12 cm, b = 8 cm, M = 6 cm: 8 : 12 = x : (x + 6) ⇒ <strong>x = 12 cm</strong>.</li>
              <li>V = 6/3 · (144 + 96 + 64) = <strong>608 cm³</strong> (ellenőrzés: 144 · 18/3 − 64 · 12/3 = 864 − 256 = 608).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. feladat: kúp két vágással" badge="1 : 7 : 19" badgeColor="rose">
            <FrustumVolumeConeCutsSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Kis kúp: r = 1 cm, m = 4 cm ⇒ V = 4π/3 ≈ <strong>4,19 cm³</strong>.</li>
              <li>Középső csonkakúp: 32π/3 − 4π/3 = 28π/3 ≈ <strong>29,32 cm³</strong>.</li>
              <li>Alsó csonkakúp: 36π − 32π/3 = 76π/3 ≈ <strong>79,59 cm³</strong>. Az arány 1 : 7 : 19.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Házi feladatok eredményei" badge="HF" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> Oldalél 10 cm, 52° ⇒ M = 10 · sin 52° ≈ 7,88 cm, alapél ≈ 8,71 cm, V ≈ 199,1 cm³; az alaptól 2 cm-re vágva ≈ 82,7 cm³ (kis gúla) és ≈ 116,4 cm³ (csonkagúla).</li>
              <li><strong>HF 2.</strong> R = 10, r = 4, M = 5 ⇒ az eredeti kúp 25/3 ≈ 8,33 cm magas; kiegészítő kúp 160π/9 ≈ 55,9 cm³, csonkakúp 260π ≈ 816,8 cm³.</li>
              <li><strong>HF 3.</strong> Zselés cukor: V = 17/3 · (310 + √(310 · 180) + 180) ≈ 4115 mm³ ≈ 4,12 cm³; 16 db = 100 g ⇒ ρ ≈ 6,25 / 4,12 ≈ 1,52 g/cm³.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Ráadás – érettségi tétel 1895-ből (Kecskemét)">
          Szabályos nyolcszög alapú csonkagúla: a nagyobb alaplap oldaltávola (beírt körének sugara) 72 dm, az oldallapok hajlásszöge 75°, a magasság 96 dm. A fedőlap oldaltávola 72 − 96 / tg 75° ≈ 46,3 dm; ebből T ≈ 17 178 dm², t ≈ 7 096 dm², az oldallapmagasság 96 / sin 75° ≈ 99,4 dm. Felszín ≈ 63 230 dm², térfogat ≈ 1 130 000 dm³ ≈ 1130 m³.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Táblázat */}
      <TheorySection title="5. A képletek összevetése" badge="Táblázat" badgeColor="sky">
        <TheoryTable
          headers={['Test', 'Alaplap T', 'Fedőlap t', '√(T·t)', 'Térfogat']}
          rows={[
            ['Csonkagúla (általános)', 'T', 't', '√(Tt)', 'M/3 · (T + √(Tt) + t)'],
            ['Négyzetes csonkagúla', 'a²', 'b²', 'ab', 'M/3 · (a² + ab + b²)'],
            ['Csonkakúp', 'R²π', 'r²π', 'Rrπ', 'Mπ/3 · (R² + Rr + r²)'],
            ['t = 0 (gúla, kúp)', 'T', '0', '0', 'T · M / 3'],
            ['t = T (hasáb, henger)', 'T', 'T', 'T', 'T · M']
          ]}
        />
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: az alapterületek átlaga" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A csonkagúla nem hasáb!"
          wrong="V = M · (T + t) / 2"
          wrongExplanation="a = 12, b = 8, M = 6 esetén így 6 · (144 + 64)/2 = 624 cm³ jönne ki – a helyes érték 608 cm³. Az átlagolás mindig túl nagy eredményt ad."
          correct="V = M/3 · (T + √(Tt) + t)"
          correctExplanation="6/3 · (144 + 96 + 64) = 608 cm³. A középső tag a két terület mértani közepe."
          tip="Ellenőrzés: t = 0 esetén a gúla térfogatát (T·M/3), t = T esetén a hasábét (T·M) kell visszakapnod."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Napóleon kardja – nagy test mínusz kis test" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setShape('pyr')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${shape === 'pyr' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  Négyzetes gúla
                </button>
                <button
                  onClick={() => setShape('cone')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${shape === 'cone' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  Forgáskúp
                </button>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {shape === 'pyr' ? 'Alapél' : 'Alapkör sugara'}: {fmt(baseSize, 1)} cm
                </label>
                <input type="range" min="2" max="10" step="0.5" value={baseSize} onChange={(e) => setBaseSize(Number(e.target.value))} className="w-full accent-amber-600" aria-label="alapméret" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Az eredeti test magassága: {fmt(fullH, 1)} cm</label>
                <input type="range" min="2" max="12" step="0.1" value={fullH} onChange={(e) => setFullH(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="teljes magasság" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A levágott rész aránya λ: {fmt(lambda, 2)}</label>
                <input type="range" min="0.1" max="0.9" step="0.05" value={lambda} onChange={(e) => setLambda(Number(e.target.value))} className="w-full accent-rose-600" aria-label="lambda" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-slate-500">V nagy</div>
                  <div className="font-mono font-black text-slate-900">{fmt(vBig)} cm³</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-slate-500">V kicsi = λ³ · V nagy</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(vSmall)} cm³</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-slate-500">V csonka (különbség)</div>
                  <div className="font-mono font-black text-amber-900">{fmt(vFr)} cm³</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-2 border border-indigo-200">
                  <div className="text-slate-500">M/3 · (T + √(Tt) + t)</div>
                  <div className="font-mono font-black text-indigo-900">{fmt(vFormula)} cm³</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                A csonka test magassága M = (1 − λ) · {fmt(fullH, 1)} = {fmt(cutY)} cm; a csonka rész az eredeti {fmt((1 - lambda ** 3) * 100, 1)}%-a. A zöld szaggatott élek a levágott kis testet mutatják.
              </p>
            </div>
            <Solid3DViewer solid={solid} extras={extras} className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" />
          </div>
          <TheoryCallout type="success" title="A sajt adataival">
            Alapél 4 cm, magasság 6,4 cm, λ = 0,6 ⇒ V nagy ≈ 34,13 cm³, V csonka ≈ 26,76 cm³.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: A képlet levezetése lépésenként" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alapél a: {fmt(la, 1)} cm</label>
              <input type="range" min="2" max="20" step="0.5" value={la} onChange={(e) => setLa(Number(e.target.value))} className="w-full accent-purple-600" aria-label="alapél" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">fedőél b: {fmt(lbEff, 1)} cm</label>
              <input type="range" min="0.5" max="19.5" step="0.5" value={lb} onChange={(e) => setLb(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="fedőél" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">magasság M: {fmt(lM, 1)} cm</label>
              <input type="range" min="1" max="15" step="0.5" value={lM} onChange={(e) => setLM(Number(e.target.value))} className="w-full accent-amber-600" aria-label="magasság" />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
            {step >= 1 && <div>1. Kiegészítő gúla: b : a = x : (x + M) ⇒ x = b·M/(a − b) = <strong>{fmt(lx)} cm</strong></div>}
            {step >= 2 && <div>2. Nagy gúla: V₁ = a²·(M + x)/3 = <strong>{fmt(lvBig)} cm³</strong></div>}
            {step >= 3 && <div>3. Kis gúla: V₂ = b²·x/3 = <strong>{fmt(lvSmall)} cm³</strong></div>}
            {step >= 4 && <div>4. Különbség: V₁ − V₂ = <strong>{fmt(lvBig - lvSmall)} cm³</strong></div>}
            {step >= 5 && (
              <div>
                5. Képlet: M/3 · (a² + ab + b²) = <strong>{fmt(lvFormula)} cm³</strong> ✔ (a hibás M·(a² + b²)/2 = {fmt(lvWrong)} cm³ lenne)
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep((s) => Math.min(5, s + 1))} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white">
              Következő lépés
            </button>
            <button onClick={() => setStep(1)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
              Újrakezdés
            </button>
          </div>
          <TheoryCallout type="tip" title="Próbáld ki a 2. feladat adataival!">
            a = 12, b = 8, M = 6 ⇒ x = 12 cm, V₁ = 864 cm³, V₂ = 256 cm³, V = 608 cm³.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FrustumVolumeTheory;
