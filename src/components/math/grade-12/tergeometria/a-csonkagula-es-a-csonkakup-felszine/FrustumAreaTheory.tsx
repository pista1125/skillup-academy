import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, makeFrustumCone, makeFrustumPyramid } from '../shared/Solid3DViewer';
import {
  FrustumAreaCollarSvg,
  FrustumAreaNetSvg,
  FrustumAreaAntalSvg,
  FrustumAreaBandiSvg,
  FrustumAreaSquareSvg,
  FrustumAreaTrapezoidAnalogySvg
} from './FrustumAreaFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

export const FrustumAreaTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: felszínkalkulátor 3D-ben
  const [mode, setMode] = useState<'cone' | 'pyr'>('cone');
  const [big, setBig] = useState<number>(6);
  const [small, setSmall] = useState<number>(3);
  const [height, setHeight] = useState<number>(4);
  const smallEff = Math.min(small, big - 0.5);

  const solid = useMemo(
    () => (mode === 'cone' ? makeFrustumCone(big, smallEff, height) : makeFrustumPyramid(4, big / Math.SQRT2, smallEff / Math.SQRT2, height)),
    [mode, big, smallEff, height]
  );
  const extras = useMemo(() => {
    if (mode === 'cone') {
      return [
        { from: [0, 0, 0] as [number, number, number], to: [0, height, 0] as [number, number, number], color: '#059669', dashed: true, label: 'M' },
        { from: [big, 0, 0] as [number, number, number], to: [smallEff, height, 0] as [number, number, number], color: '#dc2626', label: 'a' }
      ];
    }
    const R = big / Math.SQRT2;
    const r = smallEff / Math.SQRT2;
    return [
      { from: [0, 0, 0] as [number, number, number], to: [0, height, 0] as [number, number, number], color: '#059669', dashed: true, label: 'M' },
      { from: [R / 2, 0, R / 2] as [number, number, number], to: [r / 2, height, r / 2] as [number, number, number], color: '#d97706', label: 'm' }
    ];
  }, [mode, big, smallEff, height]);

  const slant = Math.hypot(height, mode === 'cone' ? big - smallEff : (big - smallEff) / 2);
  const baseA = mode === 'cone' ? big * big * Math.PI : big * big;
  const topA = mode === 'cone' ? smallEff * smallEff * Math.PI : smallEff * smallEff;
  const latA = mode === 'cone' ? (big + smallEff) * Math.PI * slant : 2 * (big + smallEff) * slant;
  const totalA = baseA + topA + latA;

  // Labor II: a palást kiterítése
  const [uR, setUR] = useState<number>(6);
  const [ur, setUr] = useState<number>(3);
  const [ua, setUa] = useState<number>(5);
  const urEff = Math.min(ur, uR - 0.5);
  const uaEff = Math.max(ua, uR - urEff + 0.1);
  const X = (uaEff * uR) / (uR - urEff);
  const x = X - uaEff;
  const phi = (360 * (uR - urEff)) / uaEff;
  const sectorArea = (phi / 360) * Math.PI * (X * X - x * x);
  const formulaArea = (uR + urEff) * Math.PI * uaEff;
  const scale = 110 / X;
  const cx = 170;
  const cy = phi > 180 ? 120 : 40;
  const toPt = (deg: number, rho: number) => {
    const t = (deg * Math.PI) / 180;
    return [cx + rho * scale * Math.cos(t), cy + rho * scale * Math.sin(t)];
  };
  const a0 = 90 - phi / 2;
  const a1 = 90 + phi / 2;
  const o0 = toPt(a0, X);
  const o1 = toPt(a1, X);
  const i0 = toPt(a0, x);
  const i1 = toPt(a1, x);
  const large = phi > 180 ? 1 : 0;
  const sectorPath =
    phi >= 359.5
      ? ''
      : `M ${o0[0].toFixed(1)} ${o0[1].toFixed(1)} A ${(X * scale).toFixed(1)} ${(X * scale).toFixed(1)} 0 ${large} 1 ${o1[0].toFixed(1)} ${o1[1].toFixed(1)} L ${i1[0].toFixed(1)} ${i1[1].toFixed(1)} A ${(x * scale).toFixed(1)} ${(x * scale).toFixed(1)} 0 ${large} 0 ${i0[0].toFixed(1)} ${i0[1].toFixed(1)} Z`;

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-csonkagula-es-a-csonkakup-felszine"
      title="15. A csonkagúla és a csonkakúp felszíne"
      subtitle="Milyen nagy anyag kell Szotyi kutyus lámpaernyő alakú védőgallérjához? A csonka testek felszíne: alaplap + fedőlap + palást, a csonkakúp palástja egy körgyűrűcikk."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="indigo"
      pdfFilename="12_osztaly_csonkagula_csonkakup_felszine_tananyag.pdf"
      practiceTitle="Készen állsz a csonka testek felszínére?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — CSONKA TESTEK FELSZÍNE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center space-y-1">
              <div className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">A = T + t + P</div>
              <div className="font-mono text-sm font-bold text-indigo-900 dark:text-indigo-200">csonkakúp: P = (R + r)·π·a, A = π·[R² + r² + (R + r)·a]</div>
              <div className="font-mono text-sm font-bold text-indigo-900 dark:text-indigo-200">szabályos négyoldalú csonkagúla: A = a² + b² + 2(a + b)·m</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                A palástban az <strong>a alkotó</strong> (csonkagúlánál az <strong>m oldallapmagasság</strong>) szerepel, <strong>nem</strong> a test M magassága.
              </li>
              <li>Ha csak M adott: a = √(M² + (R − r)²), illetve négyzetes csonkagúlánál m = √(M² + ((a − b)/2)²).</li>
              <li>A palást „trapézképlettel”: a két határoló vonal hosszának számtani közepe szorozva a szélességgel.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: Szotyi kutyus védőgallérja" badge="Tankönyv 38. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Szotyi kutyusnak néhány napig védőgallért kell viselnie, hogy ne rághassa le a kötést a lábáról. A gallér olyan, mint egy <strong>lámpaernyő</strong>: egy csonkakúp <strong>palástja</strong>.
            </p>
            <p>
              A csonkagúla és a (forgáskúpból származtatott) csonkakúp <strong>felszíne</strong> az alaplap, a fedőlap és a palást területének összege:
            </p>
            <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200 text-center font-mono font-bold text-indigo-900">
              A = T<sub>alaplap</sub> + t<sub>fedőlap</sub> + T<sub>palást</sub>
            </div>
            <p className="text-xs text-slate-500">
              Jelölések: R az alapkör, r a fedőkör sugara, a az alkotó, M a test magassága.
            </p>
          </div>
          <FrustumAreaCollarSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet: csonkakúp */}
      <TheorySection title="2. A csonkakúp hálója és felszíne" badge="Elmélet" badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <FrustumAreaNetSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A csonkakúp hálója <strong>két körlapból</strong> és a kiterített palástból áll. A palást egy <strong>körgyűrűcikk</strong>, amelyet egy 2Rπ és egy 2rπ hosszú körív határol, szélessége az <strong>a</strong> alkotó.
            </p>
            <p>
              Bebizonyítható, hogy a körgyűrűcikk területe a határoló körívek hossza <strong>számtani közepének</strong> és a körgyűrű szélességének szorzata:
            </p>
            <div className="bg-violet-50 p-3 rounded-xl border border-violet-200 text-center font-mono font-bold text-violet-900 space-y-1">
              <div>T<sub>palást</sub> = (2Rπ + 2rπ)/2 · a = (R + r)·π·a</div>
              <div>A<sub>cs.k.</sub> = R²π + r²π + (R + r)πa = π·[R² + r² + (R + r)·a]</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Megjegyzés 1: trapéz-analógia" badge="Emlékeztető" badgeColor="emerald">
            <FrustumAreaTrapezoidAnalogySvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700 leading-relaxed">
              A palást képlete nagyon hasonlít a trapéz területképletéhez: a két alap hosszának számtani közepét szorozzuk a trapéz magasságával. Itt a „két alap” a két körív, a „magasság” az alkotó.
            </p>
          </TheoryCard>
          <TheoryCard title="Megjegyzés 2: a szabályos csonkagúla" badge="n oldalú" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              A szabályos n oldalú csonkagúla hálója két szabályos n-szögből és a palástból áll; a palástot <strong>n darab egybevágó szimmetrikus trapéz</strong> alkotja:
            </p>
            <p className="font-mono text-sm font-bold text-blue-900 text-center my-2">A = T + t + n · T<sub>trapéz</sub></p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Szabályos négyoldalú csonkagúlánál (alapél a, fedőél b, oldallapmagasság m):
            </p>
            <p className="font-mono text-sm font-bold text-blue-900 text-center my-2">A = a² + b² + 4 · (a + b)/2 · m = a² + b² + 2(a + b)·m</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Kidolgozott: Antal és Bandi */}
      <TheorySection title="3. Kidolgozott feladat: két terv a gallérhoz" badge="1. feladat" badgeColor="amber">
        <p className="text-sm text-slate-700 leading-relaxed">
          A nyakpánt hossza 47 cm, így a fedőkör sugara r = 47 / (2π) ≈ <strong>7,5 cm</strong>. Az alapkör átmérője 35 cm (R = 17,5 cm), a gallér kb. <strong>20 cm</strong> széles (ez az alkotó).
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Antal terve: kúpból kis kúpot vágunk le" badge="Hasonlóság" badgeColor="sky">
            <FrustumAreaAntalSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A 35 cm oldalú szabályos háromszöget a szimmetriatengelye körül forgatja: kúp, R = 17,5 cm, alkotó 35 cm.</li>
              <li>a) A levágott kis kúp sugara 7,5 cm; a hasonlóság aránya 7,5 : 17,5 = <strong>3 : 7</strong>, ezért a kis kúp alkotója 35 · 3/7 = <strong>15 cm</strong>, a maradék 35 − 15 = <strong>20 cm</strong>. ✔</li>
              <li>b) λ = 3/7. c) A palástok aránya λ² = <strong>9/49</strong>. d) A csonkakúp palástja <strong>40/49</strong> része a teljes palástnak.</li>
              <li>e) Teljes palást: 17,5 · π · 35 = 612,5π ≈ 1924 cm²; a gallér: 612,5π · 40/49 = <strong>500π ≈ 1571 cm²</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Bandi terve: félkörből körgyűrűcikk" badge="Kiterítés" badgeColor="purple">
            <FrustumAreaBandiSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a) A 35 cm sugarú félkörív hossza 35π ≈ <strong>110 cm</strong>.</li>
              <li>b) A fedőkör kerülete 2 · 7,5 · π = 15π, ezért a kivágandó félkör sugara <strong>x = 15 cm</strong> (x · π = 15π).</li>
              <li>c) Alapkör: 2Rπ = 35π ⇒ R = 17,5 cm; fedőkör: r = 7,5 cm; alkotó: 35 − 15 = 20 cm.</li>
              <li>d) Nagy félkör: 35²π/2 = 612,5π ≈ 1924 cm²; kis félkör: 15²π/2 = 112,5π ≈ 353 cm².</li>
              <li>e) A gallér: 612,5π − 112,5π = <strong>500π ≈ 1571 cm²</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="success" title="Összehasonlítás és ellenőrzés a képlettel">
          A két fiú ugyanazt kapta – és a képlet is ezt adja: T<sub>palást</sub> = (R + r)πa = (17,5 + 7,5) · π · 20 = <strong>500π ≈ 1571 cm²</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Kidolgozott: csonkagúla */}
      <TheorySection title="4. Kidolgozott feladat: négyzetes csonkagúla" badge="2. feladat és HF 2." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <FrustumAreaSquareSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>2. feladat.</strong> Egy szabályos négyoldalú csonkagúla felszíne 274 cm², alapéle 11 cm, fedőéle 5 cm. Mekkora az oldallapok magassága, az oldalél, és az oldallap hajlásszöge az alaplaphoz?
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>274 = 11² + 5² + 2 · (11 + 5) · m = 146 + 32m ⇒ <strong>m = 4 cm</strong>.</li>
              <li>Az oldallap trapézában (11 − 5)/2 = 3 cm a levágott derékszögű háromszög befogója, ezért az oldalél: √(3² + 4²) = <strong>5 cm</strong>.</li>
              <li>A hajlásszög síkmetszetében (a két szemközti oldallap magasságán át): cos α = 3 / 4 ⇒ <strong>α ≈ 41,4°</strong>.</li>
            </ul>
            <p>
              <strong>HF 2.</strong> A = 914 cm², a = 17 cm, m = 12 cm: 289 + b² + 24(17 + b) = 914 ⇒ b² + 24b − 217 = 0 ⇒ <strong>b = 7 cm</strong>. Oldalél: √(12² + 5²) = 13 cm; az oldalél vetülete az alaplapon 5√2 ≈ 7,07 cm, így cos β = 7,07 / 13 ⇒ <strong>β ≈ 57,0°</strong>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Táblázat */}
      <TheorySection title="5. Három csonkakúp adatai (HF 1.)" badge="Táblázat" badgeColor="sky">
        <TheoryTable
          headers={['', 'R (cm)', 'r (cm)', 'a (cm)', 'T (cm²)', 't (cm²)', 'P (cm²)', 'A (cm²)', 'M (cm)']}
          rows={[
            ['I.', '12', '6', '10', '144π ≈ 452,4', '36π ≈ 113,1', '180π ≈ 565,5', '360π ≈ 1131,0', '8'],
            ['II.', '12', '3', '10', '144π ≈ 452,4', '9π ≈ 28,3', '150π ≈ 471,2', '303π ≈ 951,9', '√19 ≈ 4,36'],
            ['III.', '6,15', '4,76', '3,11', '≈ 118,8', '≈ 71,2', '≈ 106,6', '≈ 296,6', '≈ 2,78']
          ]}
        />
        <TheoryCallout type="info" title="A magasság a tengelymetszetből">
          A tengelymetszet szimmetrikus trapéz, alapjai 2R és 2r, szára a. A szárból egy derékszögű háromszög vágható le, befogói M és R − r: <strong>M = √(a² − (R − r)²)</strong>. Pl. I.: √(100 − 36) = 8 cm.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: magasság az alkotó helyett" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A palást a ferde szélességgel számol"
          wrong="P = (R + r) · π · M (a test magasságával)"
          wrongExplanation="A körgyűrűcikk szélessége az alkotó, nem a test magassága. R = 6, r = 3, M = 4 esetén így 36π jönne ki a helyes 45π helyett."
          correct="P = (R + r) · π · a, ahol a = √(M² + (R − r)²)"
          correctExplanation="R = 6, r = 3, M = 4 ⇒ a = √(16 + 9) = 5 ⇒ P = 9 · π · 5 = 45π ≈ 141,4 cm²."
          tip="Csonkagúlánál ugyanez: a trapéz magassága az oldallap magassága (m), nem a test magassága (M)."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Felszínkalkulátor forgatható testtel" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setMode('cone')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === 'cone' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  Csonkakúp
                </button>
                <button
                  onClick={() => setMode('pyr')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === 'pyr' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  Négyzetes csonkagúla
                </button>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {mode === 'cone' ? 'Alapkör sugara R' : 'Alapél a'}: {fmt(big, 1)} cm
                </label>
                <input type="range" min="2" max="10" step="0.5" value={big} onChange={(e) => setBig(Number(e.target.value))} className="w-full accent-indigo-600" aria-label="nagyobbik méret" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {mode === 'cone' ? 'Fedőkör sugara r' : 'Fedőél b'}: {fmt(smallEff, 1)} cm
                </label>
                <input type="range" min="0.5" max="9.5" step="0.5" value={small} onChange={(e) => setSmall(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="kisebbik méret" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">A test magassága M: {fmt(height, 1)} cm</label>
                <input type="range" min="1" max="12" step="0.5" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full accent-amber-600" aria-label="magasság" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-slate-500">{mode === 'cone' ? 'alkotó a' : 'oldallapmagasság m'}</div>
                  <div className="font-mono font-black text-slate-900">{fmt(slant)} cm</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-slate-500">T + t</div>
                  <div className="font-mono font-black text-slate-900">{fmt(baseA + topA)} cm²</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-slate-500">palást P</div>
                  <div className="font-mono font-black text-amber-900">{fmt(latA)} cm²</div>
                </div>
                <div className="bg-indigo-50 rounded-xl p-2 border border-indigo-200">
                  <div className="text-slate-500">felszín A</div>
                  <div className="font-mono font-black text-indigo-900">{fmt(totalA)} cm²</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                {mode === 'cone'
                  ? `a = √(M² + (R − r)²) = √(${fmt(height, 1)}² + ${fmt(big - smallEff, 1)}²); P = (R + r)·π·a.`
                  : `m = √(M² + ((a − b)/2)²) = √(${fmt(height, 1)}² + ${fmt((big - smallEff) / 2, 2)}²); P = 2(a + b)·m.`}{' '}
                Húzd az egérrel a testet a forgatáshoz!
              </p>
            </div>
            <Solid3DViewer solid={solid} extras={extras} className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" />
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: A palást kiterítése" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">R: {fmt(uR, 1)} cm</label>
              <input type="range" min="2" max="12" step="0.5" value={uR} onChange={(e) => setUR(Number(e.target.value))} className="w-full accent-purple-600" aria-label="R" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">r: {fmt(urEff, 1)} cm</label>
              <input type="range" min="0.5" max="11.5" step="0.5" value={ur} onChange={(e) => setUr(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="r" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alkotó a: {fmt(uaEff, 1)} cm</label>
              <input type="range" min="1" max="25" step="0.5" value={ua} onChange={(e) => setUa(Number(e.target.value))} className="w-full accent-amber-600" aria-label="alkotó" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <svg viewBox="0 0 340 250" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {sectorPath ? (
                <path d={sectorPath} fill="rgba(139,92,246,0.18)" stroke="#7c3aed" strokeWidth="2" />
              ) : (
                <g>
                  <circle cx={cx} cy={cy} r={X * scale} fill="rgba(139,92,246,0.18)" stroke="#7c3aed" strokeWidth="2" />
                  <circle cx={cx} cy={cy} r={x * scale} fill="#f8fafc" stroke="#7c3aed" strokeWidth="2" />
                </g>
              )}
              <circle cx={cx} cy={cy} r="2.2" fill="#0f172a" />
              <text x={cx + 6} y={cy - 6} fontSize="11" fill="#0f172a">O</text>
              <text x="12" y="240" fontSize="11" fill="#334155">
                középponti szög: {fmt(phi, 1)}°
              </text>
            </svg>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
              <div>külső sugár (a teljes kúp alkotója): X = a·R/(R − r) = <strong>{fmt(X)} cm</strong></div>
              <div>belső sugár (a kis kúp alkotója): x = X − a = <strong>{fmt(x)} cm</strong></div>
              <div>középponti szög: φ = 360° · (R − r)/a = <strong>{fmt(phi, 1)}°</strong></div>
              <div>körgyűrűcikk: φ/360° · π(X² − x²) = <strong>{fmt(sectorArea)} cm²</strong></div>
              <div>képlet: (R + r)·π·a = <strong>{fmt(formulaArea)} cm²</strong></div>
              <div className="text-xs text-slate-500 pt-1">A két érték mindig egyenlő – így látható be a palástképlet.</div>
            </div>
          </div>
          <TheoryCallout type="tip" title="Próbáld ki!">
            R = 6, r = 3, a = 5 ⇒ X = 10, x = 5, φ = 216°, P = 45π ≈ 141,37 cm². Ha r közelít 0-hoz, a körgyűrűcikk körcikké válik (forgáskúp palástja).
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FrustumAreaTheory;
