import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Solid3DViewer, makeFrustumPyramid, makeFrustumCone, Vec3 } from '../shared/Solid3DViewer';
import {
  FrustumPartsSvg,
  PyramidCutSvg,
  TrapezoidRotationSvg,
  BonbonSvg,
  RightTrapezoidSvg,
  SkirtPatternSvg
} from './FrustumFigures';
import { RightMark, hu } from '../a-gula/SolidSketch';

export const FrustumTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: csonkolás csúszkával
  const [kind, setKind] = useState<'pyr' | 'cone'>('pyr');
  const [n, setN] = useState<number>(4);
  const [Mfull, setMfull] = useState<number>(8);
  const [baseR, setBaseR] = useState<number>(4);
  const [cutFromApex, setCutFromApex] = useState<number>(3);
  const cut = Math.min(cutFromApex, Mfull - 0.5);
  const lambda = cut / Mfull;
  const rTop = baseR * lambda;
  const hFr = Mfull - cut;
  const solid = useMemo(
    () => (kind === 'pyr' ? makeFrustumPyramid(n, baseR, rTop, hFr) : makeFrustumCone(baseR, rTop, hFr)),
    [kind, n, baseR, rTop, hFr]
  );
  const extras = useMemo(() => {
    const apex: Vec3 = [0, Mfull, 0];
    const list: { from: Vec3; to: Vec3; color: string; dashed: boolean; label?: string }[] = [
      { from: [0, hFr, 0], to: [0, 0, 0], color: '#dc2626', dashed: true, label: 'm' }
    ];
    if (kind === 'pyr') {
      for (let i = 0; i < n; i++) list.push({ from: solid.vertices[n + i], to: apex, color: '#94a3b8', dashed: true });
    } else {
      list.push({ from: [rTop, hFr, 0], to: apex, color: '#94a3b8', dashed: true });
      list.push({ from: [-rTop, hFr, 0], to: apex, color: '#94a3b8', dashed: true });
    }
    return list;
  }, [kind, n, solid, Mfull, hFr, rTop]);
  const edgeFactor = kind === 'pyr' ? 2 * Math.sin(Math.PI / n) : 2;
  const baseLabel = kind === 'pyr' ? 'alapél' : 'alapkör átmérője';
  const topLabel = kind === 'pyr' ? 'fedőél' : 'fedőkör átmérője';

  // Labor II: csonkakúp tengelymetszete
  const [R, setR] = useState<number>(8);
  const [r, setr] = useState<number>(5);
  const [m, setM] = useState<number>(4);
  const rr = Math.min(r, R - 0.1);
  const a = Math.hypot(m, R - rr);
  const m1 = (rr * m) / (R - rr);
  const angle = (Math.atan(m / (R - rr)) * 180) / Math.PI;
  const sc = Math.min(120 / R, 150 / (m + m1));
  const yB = 200;
  const cx = 150;
  const BL: [number, number] = [cx - R * sc, yB];
  const BR: [number, number] = [cx + R * sc, yB];
  const TR: [number, number] = [cx + rr * sc, yB - m * sc];
  const TL: [number, number] = [cx - rr * sc, yB - m * sc];
  const AP: [number, number] = [cx, yB - (m + m1) * sc];
  const F: [number, number] = [TR[0], yB];

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-csonkagula-es-a-csonkakup"
      title="14. A csonkagúla és a csonkakúp"
      subtitle="„Vegyünk inkább egy csonka gúlát” – Karinthy jó tanulója tudja: a csonka gúla is csak olyan gúla, amelyből le van vágva egy másik gúla."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="teal"
      pdfFilename="12_osztaly_csonkagula_es_csonkakup_tananyag.pdf"
      practiceTitle="Készen állsz a csonka testes feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — CSONKA TESTEK ÉS HASONLÓSÁG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center">
              <span className="font-mono text-base font-black text-teal-900 dark:text-teal-200">
                λ = r / R = m<sub>kieg</sub> / M<sub>teljes</sub> &nbsp;•&nbsp; a² = m² + (R − r)²
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az alaplappal párhuzamos sík a gúlából / kúpból egy hozzá középpontosan hasonló kiegészítő gúlát / kúpot és egy csonkagúlát / csonkakúpot vág le.</li>
              <li>Az alaplap és a fedőlap hasonló síkidomok; a csonkagúla palástja trapézokból áll.</li>
              <li>A csonkakúp tengelymetszete szimmetrikus trapéz (alapjai 2R és 2r, szárai az alkotók, magassága m).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: A jó tanuló felel" badge="Tankönyv 36. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Karinthy Frigyes novellájában Steinmann, a jó tanuló a táblánál felel. „– Különben – mondja a tanár hirtelen –, vegyünk inkább egy <strong>csonka gúlát</strong>.”
            </p>
            <p>
              Steinmann tudja, hogy őt nem lehet félrevezetni: <em>„a csonka gúla is csak olyan gúla, mint más, normális gúla […] – csak le van vágva belőle egy másik gúla.”</em>
            </p>
            <p>Ez a lecke kulcsgondolata: minden csonka test egy teljes test és a levágott, hozzá hasonló kiegészítő test különbsége.</p>
          </div>
          <FrustumPartsSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. A csonkagúla és a csonkakúp fogalma" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Keletkezés" badge="Metszés" badgeColor="teal">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha egy gúlát / kúpot az <strong>alaplapjával párhuzamos síkkal</strong> elmetszünk, két test keletkezik: egy az eredetihez <strong>középpontosan hasonló</strong> gúla / kúp (a <strong>kiegészítő</strong> gúla / kúp), és a <strong>csonkagúla / csonkakúp</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Határoló lapok" badge="Részek" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              Két középpontosan hasonló síkidom – az <strong>alaplap</strong> és a <strong>fedőlap</strong> – és a <strong>palást</strong>. A csonkagúla palástját annyi <strong>trapéz</strong> alkotja, ahány oldala van az alaplapnak.
            </p>
          </TheoryCard>
          <TheoryCard title="Magasság, alkotó" badge="m, a" badgeColor="rose">
            <p className="text-sm text-slate-700 leading-relaxed">
              A <strong>magasság</strong> az alaplap és a fedőlap síkjának távolsága. A csonkakúp <strong>alkotói</strong> az eredeti kúp alkotóinak a palástra eső szakaszai.
            </p>
          </TheoryCard>
          <TheoryCard title="Megjegyzések" badge="Elnevezések" badgeColor="amber">
            <p className="text-sm text-slate-700 leading-relaxed">
              Szabályos n oldalú gúlából <strong>szabályos n oldalú csonkagúla</strong> lesz; használjuk az alapél, fedőél, oldalél, oldallap neveket. A csonkakúp <strong>tengelymetszete szimmetrikus trapéz</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['', 'Csonkagúla', 'Csonkakúp']}
          rows={[
            ['alaplap, fedőlap', 'hasonló sokszögek', 'R és r sugarú körlap'],
            ['palást', 'n darab trapéz', 'görbült felület (kiterítve körgyűrűcikk)'],
            ['keletkezés forgatással', '–', 'szimmetrikus trapéz a szimmetriatengely körül, derékszögű trapéz a derékszögű szár körül'],
            ['tengelymetszet', '–', 'szimmetrikus trapéz (2R, 2r, a, a)'],
            ['hasonlóság aránya', 'fedőél / alapél', 'r / R']
          ]}
        />
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Gúla elmetszése" badge="1. feladat" badgeColor="sky">
            <PyramidCutSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Szabályos négyoldalú gúla: M = 8 dm, alapél 5 cm (figyelj a mértékegységekre!). A csúcstól 2 dm-re vágunk: a kiegészítő gúla aránya λ = 2/8 = 1/4 (a hasonlóság aránya független az alapél mértékegységétől). A csonkagúla <strong>alapéle 5 cm</strong>, <strong>fedőéle 5/4 = 1,25 cm</strong>, <strong>magassága 8 − 2 = 6 dm = 60 cm</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="B) Trapézból csonkakúp" badge="2. feladat" badgeColor="purple">
            <TrapezoidRotationSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Alapok 16 és 10 cm, az alapon fekvő szögek 30°.</li>
              <li>a) R = 8 cm, b) r = 5 cm (az alapok fele).</li>
              <li>A szárnál levágott derékszögű háromszög befogója R − r = 3 cm.</li>
              <li>c) m = 3 · tg 30° = √3 ≈ <strong>1,73 cm</strong>; d) a = 3 / cos 30° = 2√3 ≈ <strong>3,46 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Bonbon a díszdobozban" badge="3. feladat" badgeColor="amber">
            <BonbonSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              R = 1,65 cm, r = 0,75 cm, a = 1,5 cm ⇒ R − r = 0,9 cm, m = √(1,5² − 0,9²) = <strong>1,2 cm</strong>. Két réteghez a doboz legalább <strong>2,4 cm</strong> magas legyen.
            </p>
          </TheoryCard>
          <TheoryCard title="D) Derékszögű trapéz forgatása" badge="HF 1." badgeColor="emerald">
            <RightTrapezoidSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Alapok 16 és 11 cm, hosszabb szár 12 cm: a) <strong>R = 16 cm</strong>, b) <strong>r = 11 cm</strong>, d) <strong>a = 12 cm</strong> (a ferde szár), c) m = √(12² − 5²) = √119 ≈ <strong>10,91 cm</strong> (a derékszögű szár).
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SkirtPatternSvg />
          <TheoryCallout type="tip" title="HF 2. és HF 3. eredményei">
            <strong>HF 2.:</strong> M = 20 cm, alapél 6 cm, az alaplaptól 2 cm-re vágva: a kiegészítő gúla 18 cm magas, λ = 0,9 ⇒ alapél 6 cm, fedőél 5,4 cm, magasság 2 cm. <strong>HF 3. (szoknya):</strong> a derékbőség az állvány kerülete: 23π ≈ <strong>72,3 cm</strong>. A kiterített csonkakúp-palást körgyűrűcikkeinek belső sugara ρ: ρ / (ρ + 20) = 72,3 / 91 ⇒ ρ ≈ 77,1 cm, így a körcikkeket ρ + 80 ≈ <strong>157,1 cm</strong> sugarú körből kell kivágni; a szoknya alja 72,3 · 157,1 / 77,1 ≈ <strong>147,2 cm</strong>.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: honnan mérjük a vágást?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A csúcstól és az alaplaptól mért távolság összekeverése"
          wrong="HF 2.: az alaplaptól 2 cm-re vágunk ⇒ λ = 2 / 20 = 0,1, fedőél = 0,6 cm"
          wrongExplanation="A hasonlóság aránya a kiegészítő (levágott, csúcsot tartalmazó) gúla és a teljes gúla magasságának aránya. A kiegészítő gúla magassága 20 − 2 = 18 cm."
          correct="λ = 18 / 20 = 0,9 ⇒ fedőél = 0,9 · 6 = 5,4 cm, a csonkagúla magassága 2 cm"
          correctExplanation="Mindig a csúcstól mért távolsággal számolj: λ = (csúcstól mért távolság) / (teljes magasság) = fedőél / alapél."
          tip="Csonkakúpnál a tengelymetszetben a fél trapéz szárához tartozó derékszögű háromszög befogója R − r, nem R + r és nem 2R − 2r!"
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Csonkolás csúszkával" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div className="flex gap-2">
                {([
                  ['pyr', 'csonkagúla'],
                  ['cone', 'csonkakúp']
                ] as const).map(([k, t]) => (
                  <button
                    key={k}
                    onClick={() => setKind(k)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${kind === k ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {kind === 'pyr' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Oldalak száma (n): {n}</label>
                  <input type="range" min="3" max="8" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-teal-600" aria-label="oldalak száma" />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A teljes test magassága (M): {hu(Mfull, 1)}</label>
                <input type="range" min="2" max="14" step="0.5" value={Mfull} onChange={(e) => setMfull(Number(e.target.value))} className="w-full accent-rose-600" aria-label="teljes magasság" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alap köré írt körének sugara (R): {hu(baseR, 1)}</label>
                <input type="range" min="1" max="8" step="0.5" value={baseR} onChange={(e) => setBaseR(Number(e.target.value))} className="w-full accent-blue-600" aria-label="alapsugár" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A vágósík távolsága a csúcstól: {hu(cut, 1)}</label>
                <input type="range" min="0.5" max="13.5" step="0.5" value={cutFromApex} onChange={(e) => setCutFromApex(Number(e.target.value))} className="w-full accent-amber-600" aria-label="vágás" />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1 font-mono">
                <div>hasonlóság aránya: λ = {hu(cut, 1)} / {hu(Mfull, 1)} = <strong>{hu(lambda, 3)}</strong></div>
                <div>{baseLabel}: {hu(baseR * edgeFactor)}</div>
                <div>{topLabel}: λ · {hu(baseR * edgeFactor)} = <strong>{hu(rTop * edgeFactor)}</strong></div>
                <div>a csonka test magassága: m = M − {hu(cut, 1)} = <strong>{hu(hFr, 1)}</strong></div>
                <div className="text-xs text-slate-500">a fedőlap területe az alaplapénak λ² = {hu(lambda * lambda, 3)}-szerese</div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Solid3DViewer solid={solid} extras={extras} width={320} height={280} />
              <p className="text-xs text-slate-500 italic mt-2 text-center">A szürke szaggatott vonalak a levágott kiegészítő {kind === 'pyr' ? 'gúla' : 'kúp'} éleit mutatják. Húzd a forgatáshoz!</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: A csonkakúp tengelymetszete" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alapkör sugara (R): {hu(R, 1)} cm</label>
                <input type="range" min="2" max="16" step="0.5" value={R} onChange={(e) => setR(Number(e.target.value))} className="w-full accent-purple-600" aria-label="R" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Fedőkör sugara (r): {hu(rr, 1)} cm</label>
                <input type="range" min="0.5" max="15" step="0.5" value={r} onChange={(e) => setr(Number(e.target.value))} className="w-full accent-amber-600" aria-label="r" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Magasság (m): {hu(m, 1)} cm</label>
                <input type="range" min="0.5" max="15" step="0.5" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-rose-600" aria-label="m" />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1 font-mono">
                <div>alkotó: a = √(m² + (R − r)²) = <strong>{hu(a)} cm</strong></div>
                <div>alkotó–alaplap szöge: <strong>{hu(angle, 1)}°</strong></div>
                <div>kiegészítő kúp magassága: m₁ = r·m / (R − r) = <strong>{hu(m1)} cm</strong></div>
                <div>teljes kúp magassága: M = m + m₁ = {hu(m + m1)} cm</div>
                <div>λ = r / R = {hu(rr / R, 3)} = m₁ / M ✓</div>
              </div>
              <TheoryCallout type="success" title="Próbáld ki!">
                R = 8, r = 5, m = 1,7 ≈ √3 (2. feladat) ⇒ a ≈ 3,46 cm, a szög ≈ 30°.
              </TheoryCallout>
            </div>
            <svg viewBox="0 0 300 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <polygon points={`${TL[0]},${TL[1]} ${TR[0]},${TR[1]} ${AP[0]},${AP[1]}`} fill="rgba(148,163,184,0.15)" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 3" />
              <polygon points={`${BL[0]},${BL[1]} ${BR[0]},${BR[1]} ${TR[0]},${TR[1]} ${TL[0]},${TL[1]}`} fill="rgba(124,58,237,0.14)" stroke="#7c3aed" strokeWidth="2" />
              <line x1={TR[0]} y1={TR[1]} x2={F[0]} y2={F[1]} stroke="#dc2626" strokeWidth="1.4" strokeDasharray="4 3" />
              <line x1={cx} y1={AP[1]} x2={cx} y2={yB} stroke="#64748b" strokeWidth="1" strokeDasharray="2 3" />
              <RightMark v={F} p1={TR} p2={BR} r={8} />
              <text x={F[0] - 5} y={(TR[1] + F[1]) / 2} fontSize="11" fontWeight="bold" textAnchor="end" fill="#dc2626">m</text>
              <text x={(F[0] + BR[0]) / 2} y={yB + 13} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#334155">R − r</text>
              <text x={(TR[0] + BR[0]) / 2 + 6} y={(TR[1] + BR[1]) / 2} fontSize="11" fontWeight="bold" fill="#059669">a</text>
              <text x={cx + 6} y={(AP[1] + TR[1]) / 2} fontSize="10" fill="#64748b">m₁</text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FrustumTheory;
