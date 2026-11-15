import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  TangentsCircleSvg,
  QuadDiagonalSvg,
  BucketForcesSvg,
  AtticCrossSectionSvg,
  MedianTriangleSvg,
  PentagonStoneSvg
} from './TrigPracticeExamFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;
const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

type CaseId = 'SSS' | 'SAS' | 'ASA' | 'SSA';

type Solution = { a: number; b: number; c: number; alpha: number; beta: number; gamma: number; area: number };

const CASES: { id: CaseId; label: string; inputs: [string, string, string]; tool: string }[] = [
  { id: 'SSS', label: '3 oldal', inputs: ['a', 'b', 'c'], tool: 'Koszinusztétel a szögekre' },
  { id: 'SAS', label: '2 oldal + közbezárt szög', inputs: ['a', 'b', 'γ (°)'], tool: 'Koszinusztétel a harmadik oldalra' },
  { id: 'ASA', label: '1 oldal + 2 szög', inputs: ['c', 'α (°)', 'β (°)'], tool: 'Szinusztétel' },
  { id: 'SSA', label: '2 oldal + az egyikkel szemközti szög', inputs: ['a', 'b', 'α (°)'], tool: 'Szinusztétel – 0, 1 vagy 2 megoldás!' }
];

const DEFAULTS: Record<CaseId, [number, number, number]> = {
  SSS: [22, 33, 42.13],
  SAS: [24, 41, 133],
  ASA: [17, 78, 36],
  SSA: [50, 74, 37]
};

const finish = (a: number, b: number, c: number, alpha: number, beta: number, gamma: number): Solution => ({
  a,
  b,
  c,
  alpha,
  beta,
  gamma,
  area: (a * b * Math.sin(toRad(gamma))) / 2
});

const solveTriangle = (id: CaseId, [x, y, z]: [number, number, number]): Solution[] => {
  if (!(x > 0 && y > 0 && z > 0)) return [];
  if (id === 'SSS') {
    const [a, b, c] = [x, y, z];
    if (a + b <= c || a + c <= b || b + c <= a) return [];
    const alpha = toDeg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
    const beta = toDeg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
    return [finish(a, b, c, alpha, beta, 180 - alpha - beta)];
  }
  if (id === 'SAS') {
    const [a, b, gamma] = [x, y, z];
    if (gamma >= 180) return [];
    const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(toRad(gamma)));
    const alpha = toDeg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
    return [finish(a, b, c, alpha, 180 - alpha - gamma, gamma)];
  }
  if (id === 'ASA') {
    const [c, alpha, beta] = [x, y, z];
    const gamma = 180 - alpha - beta;
    if (gamma <= 0) return [];
    const a = (c * Math.sin(toRad(alpha))) / Math.sin(toRad(gamma));
    const b = (c * Math.sin(toRad(beta))) / Math.sin(toRad(gamma));
    return [finish(a, b, c, alpha, beta, gamma)];
  }
  // SSA: a, b, α (α az a oldallal szemközti szög)
  const [a, b, alpha] = [x, y, z];
  if (alpha >= 180) return [];
  const sinBeta = (b * Math.sin(toRad(alpha))) / a;
  if (sinBeta > 1 + 1e-12) return [];
  const beta1 = toDeg(Math.asin(Math.min(1, sinBeta)));
  const candidates = Math.abs(beta1 - 90) < 1e-9 ? [beta1] : [beta1, 180 - beta1];
  return candidates
    .filter((beta) => alpha + beta < 180 - 1e-9)
    .map((beta) => {
      const gamma = 180 - alpha - beta;
      const c = (a * Math.sin(toRad(gamma))) / Math.sin(toRad(alpha));
      return finish(a, b, c, alpha, beta, gamma);
    });
};

const EXAM_TASKS: { id: string; text: string; unit: string; value: number; solution: string }[] = [
  { id: 't1', text: 'I/1. b) Egyenlő szárú háromszög: alapon fekvő szögek 70°, szárak 15 cm. Az alaphoz tartozó magasság?', unit: 'cm', value: 14.0954, solution: 'm = 15 · sin 70° ≈ 14,10 cm' },
  { id: 't2', text: 'I/1. c) Ugyanennek a háromszögnek az alapja?', unit: 'cm', value: 10.2606, solution: 'alap = 2 · 15 · cos 70° ≈ 10,26 cm' },
  { id: 't3', text: 'I/2. b) Tetőtér: falmagasság 1,6 m, szélesség 4,2 m, tetőhajlás 40°. A tető magassága (h)?', unit: 'm', value: 3.3621, solution: 'fél tetőalap = 2,1 + 1,6 / tg 40° ≈ 4,007 m; h = 4,007 · tg 40° ≈ 3,36 m' },
  { id: 't4', text: 'I/3. 12 cm sugarú kör 16 cm-es húrja. A kisebbik körszelet területe?', unit: 'cm²', value: 33.5266, solution: 'sin(α/2) = 8/12 ⇒ α ≈ 83,62°; 105,08 − 71,55 ≈ 33,53 cm²' },
  { id: 't5', text: 'I/4. AB = 17 cm, α = 78°, β = 36°. A BC oldal?', unit: 'cm', value: 18.2022, solution: 'γ = 66°; BC = 17 · sin 78° / sin 66° ≈ 18,20 cm' },
  { id: 't6', text: 'I/4. Ugyanebben a háromszögben az AC oldal?', unit: 'cm', value: 10.938, solution: 'AC = 17 · sin 36° / sin 66° ≈ 10,94 cm' }
];

const gradeOf = (score: number) => (score >= 6 ? 'jeles (5)' : score === 5 ? 'jó (4)' : score === 4 ? 'közepes (3)' : score === 3 ? 'elégséges (2)' : 'elégtelen (1)');

export const TrigPracticeExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: háromszögmegoldó
  const [caseId, setCaseId] = useState<CaseId>('SSA');
  const [vals, setVals] = useState<[number, number, number]>(DEFAULTS.SSA);
  const solutions = solveTriangle(caseId, vals);
  const activeCase = CASES.find((c) => c.id === caseId)!;

  const selectCase = (id: CaseId) => {
    setCaseId(id);
    setVals(DEFAULTS[id]);
  };

  // Labor II: önellenőrző tudáspróba
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [evaluated, setEvaluated] = useState<boolean>(false);
  const isCorrect = (task: (typeof EXAM_TASKS)[number]) => {
    const raw = examAnswers[task.id];
    if (!raw || raw.trim() === '') return false;
    const x = Number(raw.replace(',', '.'));
    return Number.isFinite(x) && Math.abs(x - task.value) <= Math.max(0.01 * task.value, 0.02);
  };
  const score = EXAM_TASKS.filter(isCorrect).length;

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="gyakorlas-tudasproba"
      title="16. Gyakorlás, tudáspróba"
      subtitle="A trigonometria fejezet összefoglalása: hegyes- és tompaszögek szögfüggvényei, szinusz- és koszinusztétel, területképlet, kör és sokszögek – gyakorló feladatok, két tudáspróba és érettségi feladatok."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_trigonometria_gyakorlas_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a trigonometria tudáspróbára?"
      practiceSubtitle="Mérd fel tudásodat a fejezet egészét átfogó, 3 szintre bontott kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A FEJEZET ESZKÖZTÁRA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center space-y-1">
              <div className="font-mono text-sm font-black text-blue-900 dark:text-blue-200">a : b = sin α : sin β</div>
              <div className="font-mono text-sm font-black text-blue-900 dark:text-blue-200">c² = a² + b² − 2ab · cos γ</div>
              <div className="font-mono text-sm font-black text-blue-900 dark:text-blue-200">T = a · b · sin γ / 2</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Derékszögű háromszög: sin α = szemközti / átfogó, cos α = melletti / átfogó, tg α = szemközti / melletti.</li>
              <li>Tompaszög: sin(180° − α) = sin α, cos(180° − α) = −cos α; sin 90° = 1, cos 90° = 0.</li>
              <li>Szinuszból kapott szögnél mindig nézd meg a tompaszögű megoldást is!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglaló */}
      <TheorySection title="1. A fejezet összefoglalása" badge="Ismétlés" badgeColor="blue">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Hegyesszögek szögfüggvényei (1–5. lecke)" badge="Derékszögű háromszög" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>sin α = a / c, cos α = b / c, tg α = a / b (a: szemközti, b: melletti befogó, c: átfogó).</li>
              <li>sin² α + cos² α = 1; tg α = sin α / cos α.</li>
              <li>Pótszögek: sin(90° − α) = cos α, tg(90° − α) = 1 / tg α.</li>
              <li>Nevezetes szögek: sin 30° = 0,5; sin 45° = √2/2; sin 60° = √3/2; tg 45° = 1.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Tompaszög, derékszög (8., 11. lecke)" badge="Kiterjesztés" badgeColor="indigo">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>sin(180° − α) = sin α – a tompaszög szinusza pozitív.</li>
              <li>cos(180° − α) = −cos α – a tompaszög koszinusza negatív.</li>
              <li>sin 90° = 1, cos 90° = 0.</li>
              <li>Egy szinuszértékhez 0° és 180° között két szög tartozik (α és 180° − α), egy koszinuszértékhez csak egy.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Tételek (6., 9., 10., 12. lecke)" badge="Tetszőleges háromszög" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Területképlet: T = a · b · sin γ / 2.</li>
              <li>Szinusztétel: a : b : c = sin α : sin β : sin γ.</li>
              <li>Koszinusztétel: c² = a² + b² − 2ab · cos γ.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Sokszögek és kör (13–14. lecke)" badge="Alkalmazás" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Sokszög: bontsd háromszögekre (átlóval vagy a középpontból)!</li>
              <li>Paralelogramma: T = a · b · sin α = e · f · sin φ / 2.</li>
              <li>Szabályos n-szög: a = 2R · sin(180° : n).</li>
              <li>Körív: rπα / 180°; körcikk: r²πα / 360°; körszelet: körcikk − r² · sin α / 2.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Adott', 'Eszköz', 'Megoldások száma']}
          rows={[
            ['3 oldal', 'koszinusztétel → szög', '1 (ha teljesül a háromszög-egyenlőtlenség)'],
            ['2 oldal + közbezárt szög', 'koszinusztétel → 3. oldal', '1'],
            ['1 oldal + 2 szög', 'szinusztétel', '1 (ha a két szög összege < 180°)'],
            ['2 oldal + az egyikkel szemközti szög', 'szinusztétel → szög', '0, 1 vagy 2'],
            ['2 oldal + terület', 'területképlet → sin γ', '1 vagy 2 (γ hegyes- vagy tompaszög)']
          ]}
        />
      </TheorySection>

      {/* 2. Gyakorló feladatok */}
      <TheorySection title="2. Gyakorló feladatok" badge="Tankönyv 42. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1–2. feladat: szögfüggvény-értékek" badge="Alapok" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>1.</strong> sin α = 0,6 = 3/5 ⇒ például 3, 4, 5 cm-es oldalak. cos α = 0,8, tg α = 0,75. A másik hegyesszögre: sin = 0,8, cos = 0,6, tg = 4/3 ≈ 1,33.</li>
              <li><strong>2.</strong> sin α = 0,7642 ⇒ α ≈ 49,84° vagy α ≈ 130,16°. Ekkor cos α ≈ ±0,6450 és tg α ≈ ±1,1848 (hegyesszögre pozitív, tompaszögre negatív).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. feladat: két érintő" badge="Kör" badgeColor="purple">
            <TangentsCircleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Az OP egyenes felezi az érintők 56°-os szögét, az érintési pontban derékszög van: OP = 3,4 / sin 28° ≈ <strong>7,24 cm</strong>.</li>
              <li>Az érintőszakasz 3,4 / tg 28° ≈ 6,39 cm, a deltoid területe ≈ 21,74 cm². A középponti szög 180° − 56° = 124°, a körcikk ≈ 12,51 cm². A kért rész ≈ <strong>9,23 cm²</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="5. feladat: négyszög átlóval" badge="Szinusztétel" badgeColor="emerald">
            <QuadDiagonalSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>ABC: 60°, 40°, így B∠ = 80°. AB = 22 · sin 40° / sin 80° ≈ 14,36 cm, BC = 22 · sin 60° / sin 80° ≈ 19,35 cm.</li>
              <li>ACD: CAD∠ = 104° − 60° = 44°, ACD∠ = 95° − 40° = 55°, D∠ = 81°. AD ≈ 18,25 cm, CD ≈ 15,47 cm.</li>
              <li>T = ½ · 22 · 14,36 · sin 60° + ½ · 22 · 18,25 · sin 44° ≈ 136,79 + 139,42 ≈ <strong>276,2 cm²</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="6. feladat: a vödör" badge="Erők" badgeColor="rose">
            <BucketForcesSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Az apa és a fiú erejének eredője 100 N felfelé. Az erőháromszögben a 100 N és a 109 N közötti szög 35°.</li>
              <li>Koszinusztétel: F² = 100² + 109² − 2 · 100 · 109 · cos 35° ⇒ <strong>F ≈ 63,4 N</strong>.</li>
              <li>Szinusztétel: sin β = 109 · sin 35° / 63,4 ≈ 0,986. A függőleges összetevő (100 − 109 · cos 35° ≈ 10,7 N) pozitív, ezért β hegyesszög: <strong>β ≈ 80,3°</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Tudáspróba I */}
      <TheorySection title="3. Tudáspróba I. (könnyebb)" badge="Tankönyv 44. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1., 3., 4. feladat" badge="Alapfeladatok" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>1.</strong> Alapon fekvő szögek 70°, szárak 15 cm: magasság 15 · sin 70° ≈ <strong>14,10 cm</strong>, alap 2 · 15 · cos 70° ≈ <strong>10,26 cm</strong>.</li>
              <li><strong>3.</strong> r = 12 cm, húr 16 cm: sin(α/2) = 8/12 ⇒ α ≈ 83,62°. Körcikk ≈ 105,08 cm², háromszög ≈ 71,55 cm², a kisebbik körszelet ≈ <strong>33,53 cm²</strong>.</li>
              <li><strong>4.</strong> AB = 17 cm, α = 78°, β = 36° ⇒ γ = 66°; BC = 17 · sin 78° / sin 66° ≈ <strong>18,20 cm</strong>, AC = 17 · sin 36° / sin 66° ≈ <strong>10,94 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. feladat: tetőtér-beépítés" badge="Derékszögű háromszögek" badgeColor="purple">
            <AtticCrossSectionSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) A fal és a tető találkozásától a tető széléig 1,6 / tg 40° ≈ 1,91 m, így a tető alapja 4,2 + 2 · 1,91 ≈ <strong>8,01 m</strong>.</li>
              <li>b) h = 4,007 · tg 40° ≈ <strong>3,36 m</strong>.</li>
              <li>c) Téglalap 4,2 · 1,6 = 6,72 m² + háromszög 4,2 · (2,1 · tg 40°) / 2 ≈ 3,70 m² ⇒ <strong>≈ 10,42 m²</strong>.</li>
              <li>d) 10 m hosszú házban ≈ <strong>104,2 m³</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="5. feladat: a telek füvesítése" badge="Koszinusztétel" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A rajz szerint a 22 m-es és a 33 m-es oldal 98°-os szöget zár be. Az átló: e² = 22² + 33² − 2 · 22 · 33 · cos 98° ⇒ e ≈ 42,13 m.</li>
              <li>A két háromszög: ½ · 22 · 33 · sin 98° ≈ 359,5 m² és (36, 24, 42,13 oldalakkal, koszinusztétellel kapott ≈ 86,78°-os szöggel) ≈ 431,3 m². Összesen ≈ 790,8 m².</li>
              <li>a) Füvesítendő: 790,8 − 130 ≈ <strong>661 m²</strong>.</li>
              <li>b) A 33 m-es és a 24 m-es oldal szöge ≈ 31,14° + 58,55° ≈ <strong>89,7°</strong> – majdnem, de nem pontosan derékszög.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Ráadás 1. (érettségi, 2013)" badge="Súlyvonal" badgeColor="rose">
            <MedianTriangleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) A CD szakasz két egyenlő területű háromszögre bont: T = 2 · ½ · 24 · 41 · sin 47° ≈ <strong>719,7 mm²</strong> (sin 133° = sin 47°).</li>
              <li>b) BDC∠ = 133°: BC² = 24² + 41² − 2 · 24 · 41 · cos 133° ≈ 3599 ⇒ BC ≈ <strong>60 mm</strong>.</li>
              <li>c) Szinusztétel a BCD háromszögben: sin β = 41 · sin 133° / 60 ⇒ <strong>β ≈ 30°</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Tudáspróba II */}
      <TheorySection title="4. Tudáspróba II. (nehezebb)" badge="Tankönyv 45. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. feladat: gúla alakú háztető" badge="Térgeometria" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) A tetőmagasság, az oldallap magassága és a fél alapél derékszögű háromszöget alkot: a/2 = 4,2 / tg 40° ⇒ <strong>a ≈ 10,01 m</strong>.</li>
              <li>b) Oldallap-magasság 4,2 / sin 40° ≈ 6,53 m; a 4 oldallap: 2 · a · 6,53 ≈ <strong>130,8 m²</strong>.</li>
              <li>c) A fél átló a√2 / 2 ≈ 7,08 m: x = √(4,2² + 7,08²) ≈ <strong>8,23 m</strong>, hajlásszöge tg α = 4,2 / 7,08 ⇒ <strong>α ≈ 30,7°</strong>.</li>
              <li>d) Szomszédos élek (koszinusztétel az oldallapon): ≈ <strong>74,9°</strong>; szemköztiek: 2 · arctg(7,08 / 4,2) ≈ <strong>118,6°</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2–3. feladat: erők és tornyok" badge="Koszinusz- és szinusztétel" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>2.</strong> F₁ = 1500 N és F₂ = 2000 N 120°-os szöget zárnak be. Az erőparalelogrammában a szög 60°: R² = 1500² + 2000² − 2 · 1500 · 2000 · cos 60° ⇒ <strong>R ≈ 1803 N</strong>. Az eredő az F₁-gyel ≈ 73,9°-os, az F₂-vel ≈ 46,1°-os szöget zár be.</li>
              <li><strong>3.</strong> Az 50 könyök magas torony a kúttól 69°-ban látszik: a kút 50 / tg 69° ≈ <strong>19,19 könyökre</strong> van tőle, a másiktól 60 − 19,19 ≈ <strong>40,81 könyökre</strong>. A csúcsok távolsága a kúttól 50 / sin 69° ≈ 53,56 könyök, így a másik torony √(53,56² − 40,81²) ≈ <strong>34,69 könyök</strong> magas, és ≈ <strong>40,4°</strong>-ban látszik.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="4–5. feladat: paralelogramma és két lehetséges szög" badge="Vegyes" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>4.</strong> A 34 mm-es oldal és a 38 mm-es átló szöge 56°: a másik oldal √(34² + 38² − 2 · 34 · 38 · cos 56°) ≈ <strong>33,99 mm</strong> (majdnem rombusz). Szögek ≈ <strong>67,96°</strong> és ≈ <strong>112,04°</strong>; a másik átló ≈ <strong>56,37 mm</strong>; T = 34 · 38 · sin 56° ≈ <strong>1071 mm²</strong>.</li>
              <li><strong>5.</strong> sin γ = 2 · 6,65 / (4,62 · 3,08) ≈ 0,9347 ⇒ γ ≈ 69,18° vagy γ ≈ 110,82°. A 69,18°-os esetben a harmadik oldal ≈ 4,55 dm, de ez a háromszög hegyesszögű! A tompaszögű háromszögben γ ≈ <strong>110,82°</strong>, a harmadik oldal ≈ <strong>6,40 dm</strong>, a többi szög ≈ 42,44° és ≈ 26,74°. <strong>Egyetlen</strong> háromszög felel meg.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Ráadás 2. (érettségi, 2020)" badge="Ötszög" badgeColor="rose">
            <PentagonStoneSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) Az ötszög szögeinek összege 540°, a három 120°-os szög után 180° marad E-re és C-re. A szimmetria miatt E∠ = C∠ = 90°, tehát az AED és a BCD háromszög derékszögű.</li>
              <li>b) T(AED) = T(BCD) = 10 · 10 / 2 = 50; AD = BD = 10√2, ADB∠ = 120° − 2 · 45° = 30°, T(ABD) = ½ · (10√2)² · sin 30° = 50. Összesen <strong>T = 150</strong> (területegység).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Házi feladatok */}
      <TheorySection title="5. Házi feladatok" badge="Tankönyv 43. o." badgeColor="indigo">
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
          <li><strong>1.</strong> Kristályszálló: 12 · tg 65° + 1,6 ≈ 25,73 + 1,6 ≈ <strong>27,3 m</strong> (a szemmagasságot hozzá kell adni!).</li>
          <li><strong>3.</strong> Dürer: az 1 m sugarú körbe írt szabályos hétszög oldala 2 · sin(180°/7) ≈ 0,8678 m, a szabályos háromszög oldalának fele √3 / 2 ≈ 0,8660 m. Dürer csak ≈ <strong>1,7 mm-t</strong> (kb. 0,2%-ot) tévedett.</li>
          <li><strong>4.</strong> Átlók 25 és 30 cm, szögük 46°: oldalak ≈ <strong>10,99 cm</strong> és ≈ <strong>25,33 cm</strong>, szögek ≈ 75,70° és ≈ 104,30°, terület ½ · 25 · 30 · sin 46° ≈ <strong>269,8 cm²</strong>.</li>
        </ul>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: két szög vagy egy?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A szinuszból kapott szög – mindkét értéket vizsgáld meg!"
          wrong="sin γ ≈ 0,9347 ⇒ γ ≈ 69,18° (a számológép értéke), c ≈ 4,55 dm"
          wrongExplanation="A számológép csak a hegyesszöget adja. A Tudáspróba II. 5. feladatában ráadásul a feladat TOMPASZÖGŰ háromszöget kér, a 69,18°-os eset pedig hegyesszögű háromszöget ad."
          correct="γ ≈ 69,18° vagy γ ≈ 110,82°; csak a 110,82° ad tompaszögű háromszöget ⇒ c ≈ 6,40 dm"
          correctExplanation="Mindig írd fel mindkét lehetséges szöget (α és 180° − α), majd ellenőrizd a feladat feltételeit (szögösszeg < 180°, hegyes/tompa, oldalak sorrendje)."
          tip="Koszinuszból kapott szögnél nincs ilyen gond: 0° és 180° között a koszinusz egyértelműen meghatározza a szöget."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Háromszögmegoldó" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => selectCase(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${caseId === c.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeCase.inputs.map((label, i) => (
              <div key={label}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
                <input
                  type="number"
                  step="0.01"
                  value={vals[i]}
                  onChange={(e) => {
                    const next = [...vals] as [number, number, number];
                    next[i] = Number(e.target.value);
                    setVals(next);
                  }}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm font-mono"
                  aria-label={label}
                />
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-500">
            Eszköz: <strong>{activeCase.tool}</strong> • Megoldások száma: <strong>{solutions.length}</strong>
          </div>
          {solutions.length === 0 ? (
            <TheoryCallout type="warning" title="Nincs ilyen háromszög">
              Az adatok nem határoznak meg háromszöget (pl. sérül a háromszög-egyenlőtlenség, a szögek összege legalább 180°, vagy sin β &gt; 1 adódna).
            </TheoryCallout>
          ) : (
            <TheoryTable
              headers={['', 'a', 'b', 'c', 'α', 'β', 'γ', 'T']}
              rows={solutions.map((s, i) => [
                `${i + 1}. megoldás`,
                fmt(s.a),
                fmt(s.b),
                fmt(s.c),
                `${fmt(s.alpha)}°`,
                `${fmt(s.beta)}°`,
                `${fmt(s.gamma)}°`,
                fmt(s.area)
              ])}
            />
          )}
          <p className="text-xs text-slate-500 italic">
            Alapértékek a tankönyvből: 3 oldal – a telek átlós háromszöge; 2 oldal + szög – az érettségi BCD háromszöge (BC ≈ 60); 1 oldal + 2 szög – Tudáspróba I. 4.; 2 oldal + szemközti szög – a csoportverseny 4. feladata (2 megoldás).
          </p>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Önellenőrző tudáspróba" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-600">
            Oldd meg füzetben a Tudáspróba I. feladatait, írd be az eredményeidet (tizedesvesszővel is lehet), majd értékeld! 1%-os eltérést elfogadunk a kerekítés miatt.
          </p>
          <div className="space-y-2">
            {EXAM_TASKS.map((task) => (
              <div key={task.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-center bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="text-sm text-slate-700">
                  {task.text}
                  {evaluated && (
                    <div className={`text-xs mt-1 font-semibold ${isCorrect(task) ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {isCorrect(task) ? '✓ helyes' : '✗'} – {task.solution}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={examAnswers[task.id] ?? ''}
                    onChange={(e) => {
                      setExamAnswers((a) => ({ ...a, [task.id]: e.target.value }));
                      setEvaluated(false);
                    }}
                    className="w-24 border border-slate-300 rounded-lg px-2 py-1 text-sm font-mono"
                    aria-label={task.text}
                  />
                  <span className="text-xs text-slate-500">{task.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setEvaluated(true)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 text-white">
              Kiértékelés
            </button>
            <button
              onClick={() => {
                setExamAnswers({});
                setEvaluated(false);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 text-slate-700"
            >
              Újrakezdés
            </button>
            {evaluated && (
              <span className="text-sm font-bold text-slate-800">
                Eredmény: {score} / {EXAM_TASKS.length} • Becsült érdemjegy: {gradeOf(score)}
              </span>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TrigPracticeExamTheory;
