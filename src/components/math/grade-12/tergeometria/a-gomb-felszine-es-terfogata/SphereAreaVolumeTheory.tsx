import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, makeSphere, makeCylinder, Solid } from '../shared/Solid3DViewer';
import {
  SphereFormulaSvg,
  MelonMassSvg,
  LeadShotSvg,
  MelonRindSvg,
  ArchimedesSvg,
  BoilerSvg
} from './SphereAreaVolumeFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');
const fmtInt = (x: number) => (Number.isFinite(x) ? Math.round(x).toLocaleString('hu-HU') : '–');

/** Két drótváz összefésülése (a második y irányban eltolva). */
const mergeSolids = (a: Solid, b: Solid, shiftY = 0): Solid => {
  const off = a.vertices.length;
  return {
    vertices: [...a.vertices, ...b.vertices.map(([x, y, z]) => [x, y + shiftY, z] as [number, number, number])],
    edges: [...a.edges, ...b.edges.map(([i, j]) => [i + off, j + off] as [number, number])],
    curved: true
  };
};

export const SphereAreaVolumeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: Arkhimédész – gömb a köré írt hengerben
  const [r, setR] = useState<number>(3);
  const [showCyl, setShowCyl] = useState<boolean>(true);
  const solid = useMemo(() => {
    const sph = makeSphere(r, 6, 6);
    return showCyl ? mergeSolids(sph, makeCylinder(r, 2 * r, 48, 8), -r) : sph;
  }, [r, showCyl]);
  const A = 4 * r * r * Math.PI;
  const V = (4 * r ** 3 * Math.PI) / 3;
  const palast = 2 * r * Math.PI * 2 * r;
  const Vcyl = r * r * Math.PI * 2 * r;

  // Labor II: dinnye
  const [diam, setDiam] = useState<number>(24);
  const [rind, setRind] = useState<number>(2);
  const Rm = diam / 2;
  const inner = Math.max(0, Rm - rind);
  const Vtot = (4 * Rm ** 3 * Math.PI) / 3;
  const Vin = (4 * inner ** 3 * Math.PI) / 3;
  const pct = (Vin / Vtot) * 100;
  const sc = 110 / 20;

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-gomb-felszine-es-terfogata"
      title="7. A gömb felszíne és térfogata"
      subtitle="Mennyi egy dinnye tömege, és hány sörét önthető egy ólomgolyóból? Az r sugarú gömb felszíne és térfogata."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_gomb_felszine_terfogata_tananyag.pdf"
      practiceTitle="Készen állsz a gömbös számításokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A GÖMB FELSZÍNE ÉS TÉRFOGATA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">A = 4r²π &nbsp;&nbsp;|&nbsp;&nbsp; V = 4r³π / 3</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                A gömb felszíne <strong>négy főkör</strong> területével egyenlő; a felszín a sugár <strong>négyzetével</strong>, a térfogat a sugár{' '}
                <strong>köbével</strong> arányos.
              </li>
              <li>Átmérő megadásakor előbb felezz: r = d / 2.</li>
              <li>Mértékegységek: 1 dm³ = 1 liter; 1 liter víz tömege ≈ 1 kg.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: dinnye és ólomsörét" badge="Tankönyv 18. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A görögdinnye 90–95%-a víz, ezért átlagsűrűsége közelítőleg a víz sűrűsége: egy kád vízben a dinnye úszik, de alig látszik ki.
              Becsülhetjük-e egy dinnye tömegét az átmérőjéből?
            </p>
            <p>
              Egy 2 cm sugarú ólomgolyóból 1 mm sugarú söréteket öntenek. Hány darab sörét készíthető, és hányszorosa az összes sörét felszíne a
              golyó felszínének?
            </p>
            <p>A feladatok megoldásához szükségünk van a gömb felszínének és térfogatának meghatározására.</p>
          </div>
          <SphereFormulaSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. A képletek" badge="Elmélet" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A gömb felszíne" badge="A" badgeColor="indigo">
            <p className="text-sm text-slate-700 leading-relaxed">
              A gömbfelület <strong>nem teríthető ki síkba</strong> (ezért nincs a gömbnek hálója). Felsőbb matematikai módszerekkel igazolható,
              hogy az r sugarú gömb felszíne <strong>A = 4r²π</strong> – ez éppen négy főkör területe.
            </p>
          </TheoryCard>
          <TheoryCard title="A gömb térfogata" badge="V" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              Az r sugarú gömb térfogata <strong>V = 4r³π / 3</strong>. Ha a sugár kétszeresére nő, a felszín 4-szeresére, a térfogat
              8-szorosára nő.
            </p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['r', 'A = 4r²π', 'V = 4r³π / 3']}
          rows={[
            ['1 cm', '4π ≈ 12,57 cm²', '4π/3 ≈ 4,19 cm³'],
            ['3 cm', '36π ≈ 113,1 cm²', '36π ≈ 113,1 cm³'],
            ['10 cm', '400π ≈ 1257 cm²', '≈ 4189 cm³ ≈ 4,2 dm³'],
            ['6371 km (Föld)', '≈ 5,10 · 10⁸ km²', '≈ 1,08 · 10¹² km³']
          ]}
        />
        <TheoryCallout type="info" title="Ráadás: Arkhimédész felfedezése">
          Arkhimédész „A gömbről és hengerről” című művében megállapította: a gömb felszíne egyenlő a köré írt egyenes körhenger palástjának
          területével, a térfogata pedig a henger térfogatának kétharmada. Ellenőrizd az alábbi ábrán és a laborban!
        </TheoryCallout>
        <ArchimedesSvg />
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) A dinnye térfogata és tömege" badge="1. kidolgozott feladat" badgeColor="emerald">
            <MelonMassSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) Egy 8 kg-os dinnye térfogata ≈ 8 kg víz térfogata, azaz <strong>8 dm³</strong>.</li>
              <li>
                b) d = 20 cm ⇒ r = 10 cm: V = 4 · 10³ · π / 3 ≈ 4189 cm³ ≈ 4,2 dm³, a tömeg <strong>≈ 4,2 kg</strong>.
              </li>
              <li>
                c) 8 kg-os gömb alakú dinnye: 4r³π / 3 = 8 ⇒ r³ = 6 / π ≈ 1,91 ⇒ r ≈ ∛1,91 ≈ 1,24 dm, az átmérő{' '}
                <strong>≈ 2,5 dm = 25 cm</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Sörétek az ólomgolyóból" badge="2. kidolgozott feladat" badgeColor="sky">
            <LeadShotSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>
                a) 2 cm = 20 mm. A térfogatok aránya: (4 · 20³ · π / 3) : (4 · 1³ · π / 3) = 20³ = <strong>8000 darab</strong> sörét.
              </li>
              <li>
                b) Felszínek aránya: 8000 · 4 · 1² · π : (4 · 20² · π) = 8000 : 400 = <strong>20</strong>. A sörétek együttes felszíne a golyóénak
                20-szorosa.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Mennyi ehető a dinnyéből?" badge="1. feladat" badgeColor="amber">
            <MelonRindSvg className="w-full h-auto mb-3" />
            <TheoryTable
              headers={['', 'belső sugár', 'belső V', 'teljes V', 'ehető']}
              rows={[
                ['1 cm héj', '11 cm', '≈ 5575 cm³', '≈ 7238 cm³', '≈ 77,0 %'],
                ['2 cm héj', '10 cm', '≈ 4189 cm³', '≈ 7238 cm³', '≈ 57,9 %']
              ]}
            />
          </TheoryCard>
          <TheoryCard title="D) A félgömb végű kazán" badge="Gyakorlás 4. feladat" badgeColor="purple">
            <BoilerSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A két félgömb együtt egy r = 2 m sugarú gömb, a henger M = 3,5 m magas.</li>
              <li>
                A = 2rπ · M + 4r²π = 14π + 16π = <strong>30π ≈ 94,2 m²</strong> (a henger alap- és fedőlapja nem része a felszínnek).
              </li>
              <li>
                V = r²π · M + 4r³π / 3 = 14π + 32π / 3 = <strong>74π / 3 ≈ 77,5 m³</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="További tankönyvi eredmények">
          10 db 30 mm-es szappanbuborék felszíne együtt ≈ 282,7 cm²; ha egyetlen buborékká egyesülnek, a sugár 15 · ∛10 ≈ 32,3 mm és a felszín
          csak ≈ 131,2 cm². Két gömbgyertyából (4 cm és 3 cm) öntött új gyertya sugara ∛91 ≈ 4,50 cm. A Föld felszíne ≈ 5,1 · 10⁸ km², ennek
          70,8%-a, ≈ 3,6 · 10⁸ km² víz.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: négyzet és köb, sugár és átmérő" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Átmérővel számolni, vagy összekeverni a kitevőket"
          wrong="d = 20 cm ⇒ V = 4 · 20³ · π / 3 ≈ 33 510 cm³ ≈ 33,5 kg-os dinnye"
          wrongExplanation="Az átmérőt sugárként használva a térfogat 8-szoros lesz! Hasonló hiba a felszínnél a köb (4r³π) vagy a térfogatnál a négyzet használata."
          correct="r = 10 cm ⇒ V = 4 · 10³ · π / 3 ≈ 4189 cm³ ≈ 4,2 kg"
          correctExplanation="Mindig a sugárral számolj: a felszín területmérték (cm², a sugár négyzete), a térfogat térfogatmérték (cm³, a sugár köbe)."
          tip="Ellenőrzés mértékegységgel: A mindig négyzetes (cm²), V mindig köbös (cm³) egységben jön ki."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Arkhimédész gömbje és hengere" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A gömb sugara r: {fmt(r, 1)} cm</label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={r}
                  onChange={(e) => setR(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                  aria-label="gömb sugara"
                />
              </div>
              <button
                onClick={() => setShowCyl((v) => !v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${showCyl ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                {showCyl ? 'Köré írt henger: látszik' : 'Köré írt henger: rejtve'}
              </button>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-indigo-50 rounded-xl p-2 border border-indigo-200">
                  <div className="text-[11px] text-slate-500">gömb felszíne 4r²π</div>
                  <div className="font-mono font-black text-indigo-900">{fmt(A)} cm²</div>
                </div>
                <div className="bg-sky-50 rounded-xl p-2 border border-sky-200">
                  <div className="text-[11px] text-slate-500">henger palástja 2rπ · 2r</div>
                  <div className="font-mono font-black text-sky-900">{fmt(palast)} cm²</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-2 border border-orange-200">
                  <div className="text-[11px] text-slate-500">gömb térfogata 4r³π/3</div>
                  <div className="font-mono font-black text-orange-900">{fmt(V)} cm³</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">henger térfogata 2r³π</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(Vcyl)} cm³</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 font-mono text-sm text-slate-700">
                A_gömb : palást = <strong>{fmt(A / palast, 3)}</strong> &nbsp; | &nbsp; V_gömb : V_henger = <strong>{fmt(V / Vcyl, 3)}</strong> (= 2/3)
              </div>
              <p className="text-xs text-slate-500 italic">
                Bármekkora sugarat választasz, a felszín egyenlő a palásttal, a térfogatok aránya mindig 2 : 3. Érdekesség: r = 3 cm-nél a felszín
                és a térfogat mérőszáma egyenlő (36π).
              </p>
            </div>
            <Solid3DViewer solid={solid} edgeColor="#6366f1" />
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Dinnyekalkulátor" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A dinnye átmérője: {fmt(diam, 0)} cm</label>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="1"
                  value={diam}
                  onChange={(e) => setDiam(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                  aria-label="dinnye átmérője"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A héj vastagsága: {fmt(rind, 1)} cm</label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.5"
                  value={rind}
                  onChange={(e) => setRind(Number(e.target.value))}
                  className="w-full accent-rose-600"
                  aria-label="héj vastagsága"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>
                  teljes térfogat: 4 · {fmt(Rm, 1)}³ · π / 3 ≈ <strong>{fmtInt(Vtot)} cm³</strong> ≈ {fmt(Vtot / 1000, 1)} kg
                </div>
                <div>
                  ehető rész: 4 · {fmt(inner, 1)}³ · π / 3 ≈ <strong>{fmtInt(Vin)} cm³</strong> ≈ {fmt(Vin / 1000, 2)} kg
                </div>
                <div>
                  arány: ({fmt(inner, 1)} / {fmt(Rm, 1)})³ ≈ <strong>{fmt(pct, 1)} %</strong>
                </div>
                <div>
                  energia (30 kcal / 100 g): ≈ <strong>{fmtInt((Vin / 100) * 30)} kcal</strong> ≈ {fmtInt((Vin / 100) * 130)} kJ
                </div>
              </div>
              <TheoryCallout type="success" title="Próbáld ki a tankönyvi adatokkal!">
                24 cm és 2 cm-es héj ⇒ ≈ 57,9 % ehető; 1 cm-es héj ⇒ ≈ 77,0 %. 36 cm-es dinnye: 1 cm-es héjnál ≈ 84,2 %, 2 cm-esnél ≈ 70,2 %.
              </TheoryCallout>
            </div>
            <svg viewBox="0 0 260 260" className="w-full h-auto max-w-sm mx-auto bg-slate-50 rounded-xl border border-slate-200">
              <circle cx="130" cy="130" r={Rm * sc} fill="#4ade80" stroke="#15803d" strokeWidth="2.5" />
              <circle cx="130" cy="130" r={inner * sc} fill="#fca5a5" stroke="#dc2626" strokeWidth="1.5" />
              <line x1="130" y1="130" x2={130 + Rm * sc} y2="130" stroke="#0f172a" strokeWidth="1.4" strokeDasharray="4 3" />
              <text x={130 + (Rm * sc) / 2} y="124" fontSize="11" fontWeight="bold" fill="#0f172a" textAnchor="middle">
                {fmt(Rm, 1)} cm
              </text>
              <text x="130" y="250" fontSize="11" fill="#475569" textAnchor="middle">
                ehető: {fmt(pct, 1)} %
              </text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SphereAreaVolumeTheory;
