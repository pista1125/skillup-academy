import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Solid3DViewer, makeCone, Vec3 } from '../shared/Solid3DViewer';
import {
  ArchimedesSvg,
  ConeNetSvg,
  SectorSvg,
  GravelPileSvg,
  PartyHatSvg,
  ConeVsCylinderSvg
} from './ConeAreaVolumeFigures';
import { sectorPath, polar, hu, P2 } from '../a-gula/SolidSketch';

const PI = Math.PI;

export const ConeAreaVolumeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: a palást kiterítése
  const [r, setR] = useState<number>(3);
  const [a, setA] = useState<number>(5);
  const aEff = Math.max(a, r + 0.1);
  const M = Math.sqrt(aEff * aEff - r * r);
  const alpha = (360 * r) / aEff;
  const Tb = r * r * PI;
  const Tp = r * PI * aEff;
  const V = (Tb * M) / 3;
  const cone = useMemo(() => makeCone(r, M), [r, M]);
  const coneExtras = useMemo(
    () => [
      { from: [0, M, 0] as Vec3, to: [0, 0, 0] as Vec3, color: '#dc2626', dashed: true, label: 'M' },
      { from: [0, M, 0] as Vec3, to: [r, 0, 0] as Vec3, color: '#059669', label: 'a' }
    ],
    [r, M]
  );
  const sc = 100 / aEff;
  const sC: P2 = [150, 115];
  const sStart = 90 - alpha / 2;

  // Labor II: körcikkből kúp (csákó, tölcsér)
  const [Rc, setRc] = useState<number>(20);
  const [arc, setArc] = useState<number>(60);
  const arcMax = 2 * PI * Rc;
  const arcEff = Math.min(arc, arcMax - 0.01);
  const cr = arcEff / (2 * PI);
  const cM = Math.sqrt(Math.max(0, Rc * Rc - cr * cr));
  const cAng = (arcEff / arcMax) * 360;
  const cV = (cr * cr * PI * cM) / 3;
  const cTp = (arcEff * Rc) / 2;

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-forgaskup-felszine-es-terfogata"
      title="13. A forgáskúp felszíne és térfogata"
      subtitle="Arkhimédész híres ábrájától a sóderkupacig: a kiterített palást körcikk, a kúp térfogata a henger harmada."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="violet"
      pdfFilename="12_osztaly_forgaskup_felszine_es_terfogata_tananyag.pdf"
      practiceTitle="Készen állsz a kúp felszínére és térfogatára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A FORGÁSKÚP FELSZÍNE ÉS TÉRFOGATA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">
                A = r²π + rπa = rπ(r + a) &nbsp;•&nbsp; V = r²π · M / 3
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A kiterített palást körcikk: sugara az alkotó (a), íve az alapkör kerülete (2rπ), területe rπa.</li>
              <li>A körcikk középponti szöge: α = 360° · r / a.</li>
              <li>A kúp térfogata a vele azonos alapterületű és magasságú henger térfogatának harmada.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott: Arkhimédész */}
      <TheorySection title="1. Kidolgozott feladat: Arkhimédész ábrája" badge="Tankönyv 32. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Forgáshenger (M = 2r), beírt gömb (sugara r) és kúp (alapköre a henger alapköre, csúcsa a fedőlap középpontja).
            </p>
            <p>
              <strong>a) Térfogatarány:</strong> V<sub>kúp</sub> = r²π · 2r / 3 = 2r³π/3; V<sub>gömb</sub> = 4r³π/3 (a kúp kétszerese); V<sub>henger</sub> = r²π · 2r = 2r³π (a kúp háromszorosa). Tehát <strong>V<sub>kúp</sub> : V<sub>gömb</sub> : V<sub>henger</sub> = 1 : 2 : 3</strong>.
            </p>
            <p>
              <strong>b) Felszínek, r = 5 cm:</strong> A<sub>henger</sub> = 2 · 25π + 10π · 10 = 150π ≈ 471 cm²; A<sub>gömb</sub> = 4 · 25π = 100π ≈ 314 cm² (a henger kétharmada); a kúp alkotója √(5² + 10²) = √125 = 5√5 cm, így A<sub>kúp</sub> = 25π + 25π√5 = 25π(1 + √5) ≈ <strong>254 cm²</strong>.
            </p>
          </div>
          <ArchimedesSvg />
        </div>
        <TheoryCallout type="info" title="Arkhimédész sírköve">
          Arkhimédész felfedezte, hogy a hengerbe írt gömb és a henger felszínének aránya is 2 : 3, akárcsak a térfogatuké. Kívánsága szerint sírkövére a hengerbe írt gömb és kúp körvonalait vésték – Cicero ez alapján azonosította a sírt Szürakuszaiban.
        </TheoryCallout>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. A palást kiterítése, felszín és térfogat" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ConeNetSvg />
          <SectorSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A palást" badge="Körcikk" badgeColor="violet">
            <p className="text-sm text-slate-700 leading-relaxed">
              A forgáskúp palástja síkba kiterítve <strong>körcikk</strong>: sugara az alkotó (a), íve az alapkör kerülete (2rπ). Területe: T<sub>körcikk</sub> = i · r<sub>cikk</sub> / 2 ⇒ <strong>T<sub>palást</sub> = rπa</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Felszín" badge="A" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>A = T<sub>alaplap</sub> + T<sub>palást</sub> = r²π + rπa = rπ(r + a)</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Térfogat" badge="V" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ugyanúgy, mint a gúlánál: <strong>V = T<sub>alaplap</sub> · M / 3 = r²π · M / 3</strong>.
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ConeVsCylinderSvg />
          <TheoryTable
            headers={['Mennyiség', 'Képlet']}
            rows={[
              ['alkotó', 'a = √(r² + M²)'],
              ['palást', 'T = rπa'],
              ['felszín', 'A = rπ(r + a)'],
              ['térfogat', 'V = r²πM / 3'],
              ['kiterített palást szöge', 'α = 360° · r / a']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) d = 7,5 cm, M = 9 cm" badge="1. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>r = 3,75 cm, a = √(3,75² + 9²) = 9,75 cm.</li>
              <li>a) A = 3,75π · (3,75 + 9,75) ≈ <strong>159,0 cm²</strong></li>
              <li>b) V = 3,75²π · 9 / 3 ≈ <strong>132,5 cm³</strong></li>
              <li>c) tg(φ/2) = 3,75 / 9 ⇒ <strong>φ ≈ 45,2°</strong></li>
              <li>d) alkotó–alapsík: tg α = 9 / 3,75 ⇒ <strong>α ≈ 67,4°</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Háromszögből kúp" badge="2. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Alap 4,2 dm, szár 2,9 dm ⇒ r = 2,1 dm, a = 2,9 dm, M = √(2,9² − 2,1²) = 2 dm.</li>
              <li>a) sin(φ/2) = 2,1 / 2,9 ⇒ <strong>φ ≈ 92,8°</strong></li>
              <li>b) V = 2,1²π · 2 / 3 ≈ <strong>9,24 dm³</strong></li>
              <li>c) a palást középponti szöge: 360° · 2,1 / 2,9 ≈ <strong>260,7°</strong></li>
              <li>d) A = 2,1π · (2,1 + 2,9) = 10,5π ≈ <strong>33,0 dm²</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Megérkezett a sóder?" badge="3. feladat" badgeColor="amber">
            <GravelPileSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              V = 1,5²π · 0,8 / 3 ≈ <strong>1,88 m³</strong> – ez kevesebb a rendelt 2 m³-nél (bár a kupac csak „nagyjából” kúp alakú, a becslés szerint kb. 0,1 m³ hiányzik).
            </p>
          </TheoryCard>
          <TheoryCard title="D) A papírcsákó" badge="4. feladat" badgeColor="rose">
            <PartyHatSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              A körcikk sugara (a csákó alkotója): 44 = 2aπ · 132/360 ⇒ a ≈ 19,1 cm. Az alapkör kerülete az ív: 2rπ = 44 ⇒ r ≈ 7,0 cm. M = √(19,1² − 7,0²) ≈ <strong>18 cm</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Házi feladatok eredményei">
          HF 1.: 35 mm és 84 mm befogó, a hosszabbik körül: r = 35, M = 84, a = 91 mm ⇒ A = 35π · 126 ≈ 13 854 mm², V = 35²π · 84 / 3 ≈ 107 757 mm³. HF 2.: M = 88 mm, 45° ⇒ r = 88 mm, a = 88√2 mm ⇒ A ≈ 58 734 mm², V ≈ 713 636 mm³. HF 3.: popcorn-tölcsér, R = 20 cm, ív 60 cm ⇒ r ≈ 9,55 cm, M ≈ 17,57 cm, V ≈ 1678 cm³.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: a körcikk sugara" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A kúp sugara és a kiterített palást sugara összekeverve"
          wrong="T_palást = r²π · α / 360°, ahol r az alapkör sugara"
          wrongExplanation="A kiterített palást körcikkének sugara NEM az alapkör sugara, hanem az alkotó (a)!"
          correct="T_palást = a²π · α / 360° = rπa, ahol α = 360° · r / a"
          correctExplanation="A körcikk sugara az alkotó, íve az alapkör kerülete. A két képlet ugyanazt adja: a²π · (r/a) = rπa."
          tip="Térfogatnál a testmagasságot (M) kell használni, nem az alkotót!"
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: A palást kiterítése" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alapkör sugara (r): {hu(r, 1)} cm</label>
                <input type="range" min="1" max="10" step="0.5" value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full accent-violet-600" aria-label="sugár" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alkotó (a): {hu(aEff, 1)} cm</label>
                <input type="range" min="1.5" max="20" step="0.5" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="alkotó" />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-700 space-y-1 font-mono">
                <div>M = √(a² − r²) = {hu(M)} cm</div>
                <div>α = 360° · r / a = <strong>{hu(alpha, 1)}°</strong></div>
                <div>T<sub>palást</sub> = rπa = <strong>{hu(Tp)} cm²</strong></div>
                <div>A = rπ(r + a) = <strong>{hu(Tb + Tp)} cm²</strong></div>
                <div>V = r²πM / 3 = <strong>{hu(V)} cm³</strong></div>
              </div>
              <p className="text-xs text-slate-500">Ha a = 2r, a palást éppen félkörlap (α = 180°).</p>
            </div>
            <svg viewBox="0 0 300 240" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <path d={sectorPath(sC, aEff * sc, sStart, alpha)} fill="rgba(124,58,237,0.15)" stroke="#7c3aed" strokeWidth="2" />
              <line x1={sC[0]} y1={sC[1]} x2={polar(sC, aEff * sc, sStart)[0]} y2={polar(sC, aEff * sc, sStart)[1]} stroke="#059669" strokeWidth="2.5" />
              <circle cx={sC[0]} cy={sC[1]} r="3" fill="#7c3aed" />
              <text x="150" y="232" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#5b21b6">kiterített palást: α = {hu(alpha, 1)}°</text>
            </svg>
            <div className="flex flex-col items-center">
              <Solid3DViewer solid={cone} extras={coneExtras} width={260} height={240} />
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Kúp körcikkből (csákó, tölcsér)" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">A körcikk sugara (= alkotó): {hu(Rc, 1)} cm</label>
              <input type="range" min="5" max="40" step="0.5" value={Rc} onChange={(e) => setRc(Number(e.target.value))} className="w-full accent-rose-600" aria-label="körcikk sugara" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Az ív hossza (= alapkör kerülete): {hu(arcEff, 1)} cm</label>
              <input type="range" min="5" max="240" step="1" value={arc} onChange={(e) => setArc(Number(e.target.value))} className="w-full accent-amber-600" aria-label="ív hossza" />
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
            <div>középponti szög: α = {hu(cAng, 1)}° {arc >= arcMax ? '(az ív nem lehet hosszabb a teljes körnél!)' : ''}</div>
            <div>alapkör sugara: r = ív / (2π) = <strong>{hu(cr)} cm</strong></div>
            <div>magasság: M = √(a² − r²) = <strong>{hu(cM)} cm</strong></div>
            <div>térfogat: V = r²πM / 3 = <strong>{hu(cV, 1)} cm³</strong></div>
            <div>felhasznált papír: T = ív · a / 2 = {hu(cTp, 1)} cm²</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { setRc(20); setArc(60); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800">
              Popcorn-tölcsér (R = 20, ív = 60)
            </button>
            <button onClick={() => { setRc(19.1); setArc(44); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-pink-100 text-pink-800">
              Papírcsákó (132°, ív = 44)
            </button>
          </div>
          <TheoryCallout type="success" title="Ellenőrzés">
            Popcorn-tölcsér: r ≈ 9,55 cm, M ≈ 17,57 cm, V ≈ 1678 cm³. Csákó: M ≈ 18 cm.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ConeAreaVolumeTheory;
