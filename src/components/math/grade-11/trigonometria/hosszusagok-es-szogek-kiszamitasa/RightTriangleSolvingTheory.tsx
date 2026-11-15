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
  SolvingStepsSvg,
  IsoscelesAltitudeSvg,
  TrapezoidRoadSvg,
  CraneArmSvg,
  StatueOfLibertySvg,
  CotangentSvg
} from './RightTriangleSolvingFigures';

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;
const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

type SolveCase = 'legs' | 'legHyp' | 'hypAngle' | 'oppAngle' | 'adjAngle';

const CASES: { id: SolveCase; label: string; first: string; second: string; init: [number, number] }[] = [
  { id: 'legs', label: 'két befogó', first: 'a (α-val szemközti befogó)', second: 'b (α melletti befogó)', init: [10.8, 5.24] },
  { id: 'legHyp', label: 'befogó + átfogó', first: 'a (α-val szemközti befogó)', second: 'c (átfogó)', init: [10.8, 12] },
  { id: 'hypAngle', label: 'átfogó + szög', first: 'c (átfogó)', second: 'α (fok)', init: [30, 37] },
  { id: 'oppAngle', label: 'szemközti befogó + szög', first: 'a (α-val szemközti befogó)', second: 'α (fok)', init: [47, 33.9] },
  { id: 'adjAngle', label: 'melletti befogó + szög', first: 'b (α melletti befogó)', second: 'α (fok)', init: [6, 64.2] }
];

interface Solution {
  ok: boolean;
  error?: string;
  a: number;
  b: number;
  c: number;
  alpha: number;
  steps: string[];
}

const solve = (kind: SolveCase, p: number, q: number): Solution => {
  const bad = (error: string): Solution => ({ ok: false, error, a: NaN, b: NaN, c: NaN, alpha: NaN, steps: [] });
  if (!(p > 0) || !(q > 0)) return bad('Minden adat legyen pozitív szám!');
  switch (kind) {
    case 'legs': {
      const c = Math.hypot(p, q);
      const alpha = toDeg(Math.atan(p / q));
      return {
        ok: true,
        a: p,
        b: q,
        c,
        alpha,
        steps: [
          `Pitagorasz-tétel: c = √(a² + b²) = √(${fmt(p)}² + ${fmt(q)}²) ≈ ${fmt(c)}`,
          `tg α = a / b = ${fmt(p)} / ${fmt(q)} ≈ ${fmt(p / q, 4)} ⇒ α ≈ ${fmt(alpha, 1)}°`,
          `β = 90° − α ≈ ${fmt(90 - alpha, 1)}°`
        ]
      };
    }
    case 'legHyp': {
      if (p >= q) return bad('A befogó csak rövidebb lehet az átfogónál!');
      const b = Math.sqrt(q * q - p * p);
      const alpha = toDeg(Math.asin(p / q));
      return {
        ok: true,
        a: p,
        b,
        c: q,
        alpha,
        steps: [
          `sin α = a / c = ${fmt(p)} / ${fmt(q)} ≈ ${fmt(p / q, 4)} ⇒ α ≈ ${fmt(alpha, 1)}°`,
          `β = 90° − α ≈ ${fmt(90 - alpha, 1)}°`,
          `Pitagorasz-tétel: b = √(c² − a²) = √(${fmt(q)}² − ${fmt(p)}²) ≈ ${fmt(b)}`
        ]
      };
    }
    case 'hypAngle': {
      if (q >= 90) return bad('A hegyesszög 0° és 90° közé essen!');
      const a = p * Math.sin(toRad(q));
      const b = p * Math.cos(toRad(q));
      return {
        ok: true,
        a,
        b,
        c: p,
        alpha: q,
        steps: [
          `β = 90° − α = ${fmt(90 - q, 1)}°`,
          `sin α = a / c ⇒ a = c · sin α = ${fmt(p)} · sin ${fmt(q, 1)}° ≈ ${fmt(a)}`,
          `cos α = b / c ⇒ b = c · cos α = ${fmt(p)} · cos ${fmt(q, 1)}° ≈ ${fmt(b)}`
        ]
      };
    }
    case 'oppAngle': {
      if (q >= 90) return bad('A hegyesszög 0° és 90° közé essen!');
      const b = p / Math.tan(toRad(q));
      const c = p / Math.sin(toRad(q));
      return {
        ok: true,
        a: p,
        b,
        c,
        alpha: q,
        steps: [
          `β = 90° − α = ${fmt(90 - q, 1)}°`,
          `tg α = a / b ⇒ b = a : tg α = ${fmt(p)} : tg ${fmt(q, 1)}° ≈ ${fmt(b)}`,
          `sin α = a / c ⇒ c = a : sin α = ${fmt(p)} : sin ${fmt(q, 1)}° ≈ ${fmt(c)}`
        ]
      };
    }
    case 'adjAngle':
    default: {
      if (q >= 90) return bad('A hegyesszög 0° és 90° közé essen!');
      const a = p * Math.tan(toRad(q));
      const c = p / Math.cos(toRad(q));
      return {
        ok: true,
        a,
        b: p,
        c,
        alpha: q,
        steps: [
          `β = 90° − α = ${fmt(90 - q, 1)}°`,
          `tg α = a / b ⇒ a = b · tg α = ${fmt(p)} · tg ${fmt(q, 1)}° ≈ ${fmt(a)}`,
          `cos α = b / c ⇒ c = b : cos α = ${fmt(p)} : cos ${fmt(q, 1)}° ≈ ${fmt(c)}`
        ]
      };
    }
  }
};

export const RightTriangleSolvingTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: derékszögű háromszög megoldó
  const [kind, setKind] = useState<SolveCase>('legHyp');
  const [p, setP] = useState<number>(10.8);
  const [q, setQ] = useState<number>(12);

  // Labor II: emelődaru
  const [arm, setArm] = useState<number>(8);
  const [craneAngle, setCraneAngle] = useState<number>(35);

  const sol = solve(kind, p, q);
  const activeCase = CASES.find((c) => c.id === kind) ?? CASES[0];

  // Labor I rajz
  const maxW = 280;
  const maxH = 150;
  const scale = sol.ok ? Math.min(maxW / sol.b, maxH / sol.a) : 1;
  const LA = { x: 30, y: 190 };
  const LC = { x: LA.x + (sol.ok ? sol.b * scale : 0), y: LA.y };
  const LB = { x: LC.x, y: LA.y - (sol.ok ? sol.a * scale : 0) };

  // Labor II számítások
  const reach = arm * Math.cos(toRad(craneAngle));
  const lift = arm * Math.sin(toRad(craneAngle));
  const cs = 20; // px / m
  const CO = { x: 40, y: 250 };
  const CT = { x: CO.x + reach * cs, y: CO.y - lift * cs };

  return (
    <TheoryTemplate
      topicId="g11-trigonometria"
      subtopicId="hosszusagok-es-szogek-kiszamitasa"
      title="5. Hosszúságok és szögek kiszámítása"
      subtitle="Derékszögű háromszögek keresése és megoldása síkidomokban és gyakorlati feladatokban – szinusszal, koszinusszal, tangenssel."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • TANANYAG"
      themeColor="indigo"
      pdfFilename="11_osztaly_hosszusagok_es_szogek_kiszamitasa_tananyag.pdf"
      practiceTitle="Készen állsz a derékszögű háromszögek megoldására?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — DERÉKSZÖGŰ HÁROMSZÖG MEGOLDÁSA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
                sin α = a / c &nbsp;•&nbsp; cos α = b / c &nbsp;•&nbsp; tg α = a / b
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Keress derékszögű háromszöget</strong> (gyakran egy magasság behúzásával), jelöld be a derékszöget és a szereplő szögeket, majd <strong>azonosítsd az oldalakat</strong> (átfogó, szög melletti, szöggel szemközti befogó).
              </li>
              <li>
                Válaszd azt a szögfüggvényt, amelyben <strong>két ismert és egy keresett</strong> mennyiség szerepel; utána rendezd az egyenletet.
              </li>
              <li>
                Hasznos összefüggések: <strong>tg α = sin α / cos α</strong>, <strong>sin²α + cos²α = 1</strong>, β = 90° − α.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Tanácsok */}
      <TheorySection title="1. Bevezető: tanácsok és a legfontosabb ismeretek" badge="Tankönyv 16. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A hosszúságok és szögek kiszámításához a feladat ábráján <strong>derékszögű háromszöget</strong> keresünk. Ha nincs, egy magasság (vagy más merőleges szakasz) behúzásával hozunk létre.
            </p>
            <p>
              Ezután megnézzük, mely adatokat ismerjük, és melyiket keressük. Azt a szögfüggvényt használjuk, amelyikben pontosan ezek szerepelnek:
            </p>
            <TheoryTable
              headers={['Ismert adatok', 'Keresett', 'Szögfüggvény']}
              rows={[
                ['átfogó, α', 'szemközti befogó', 'a = c · sin α'],
                ['átfogó, α', 'melletti befogó', 'b = c · cos α'],
                ['melletti befogó, α', 'szemközti befogó', 'a = b · tg α'],
                ['melletti befogó, α', 'átfogó', 'c = b : cos α'],
                ['szemközti befogó, átfogó', 'α', 'sin α = a / c']
              ]}
            />
          </div>
          <SolvingStepsSvg />
        </div>
      </TheorySection>

      {/* 2. Kidolgozott feladat 1 */}
      <TheorySection title="2. Kidolgozott feladat: egyenlő szárú háromszög" badge="1. kidolgozott feladat" badgeColor="amber">
        <IsoscelesAltitudeSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Egy egyenlő szárú háromszög alapja <strong>12 cm</strong>, a háromszög <strong>szárához tartozó magasság 10,8 cm</strong>. a) Mekkorák a szögei? b) Mekkorák a szárai?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="a) A szögek" badge="sin" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az ABD derékszögű háromszögben az α-val szemközti AD befogót (10,8) és az AB átfogót (12) ismerjük.</li>
              <li>sin α = 10,8 / 12 = 0,9 ⇒ számológéppel <strong>α ≈ 64,2°</strong>.</li>
              <li>Az alapon fekvő két szög egyenlő, ezért a szárszög: ACB∢ = 180° − 2 · 64,2° = <strong>51,6°</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="b) A szárak" badge="cos" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Másik derékszögű háromszöget választunk: az alaphoz tartozó CF magasság felezi az alapot, BF = 6 cm.</li>
              <li>A BFC háromszögben ismert a B-nél fekvő szög (64,2°) és a melletti BF befogó; keressük a BC = x átfogót.</li>
              <li>cos 64,2° = 6 / x ⇒ x · cos 64,2° = 6 ⇒ x = 6 : cos 64,2° ≈ <strong>13,8 cm</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Megjegyzés (tankönyv)">
          A b) részben használhattuk volna a BFC háromszög C csúcsánál fekvő szögét is (25,8°), vagy az ABD és CFB háromszögek hasonlóságát.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kidolgozott feladat 2 */}
      <TheorySection title="3. Kidolgozott feladat: az új út" badge="2. kidolgozott feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az A településről eddig csak B-n és C-n keresztül lehetett D-be eljutni (AB = 30 km, BC = 25 km, CD = 20 km, a BAD∢ = 37°). A BC út párhuzamos a tervezett új AD úttal. a) Hány km-rel rövidebb az új út? b) Mekkora legyen a CDA∢?
            </p>
            <p>
              <strong>Megoldás:</strong> behúzzuk a trapéz két magasságát (BP és CQ), így két derékszögű háromszögre és egy téglalapra bontjuk a trapézt.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>APB háromszög: sin 37° = m / 30 ⇒ m = 30 · sin 37° ≈ 18,05 ≈ <strong>18,1 km</strong>; Pitagorasz-tétellel AP ≈ <strong>24 km</strong>.</li>
              <li>CQD háromszög: sin δ = m / 20 ⇒ <strong>δ ≈ 64,5°</strong>; QD = 20 · cos δ ≈ <strong>8,6 km</strong>.</li>
              <li>AD = 24 + 25 + 8,6 = 57,6 ≈ <strong>58 km</strong>; a régi út 30 + 25 + 20 = 75 km.</li>
              <li>a) Az új út kb. <strong>17 km-rel rövidebb</strong>. b) D-ből úgy kell indulni, hogy a CDA∢ ≈ <strong>64,5°</strong> legyen.</li>
            </ul>
          </div>
          <TrapezoidRoadSvg />
        </div>
      </TheorySection>

      {/* 4. Gyakorlati feladatok */}
      <TheorySection title="4. Gyakorlati alkalmazások a tankönyv feladataiból" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Emelődaru (2. feladat)" badge="d = k · cos α" badgeColor="amber">
            <CraneArmSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a) Legmesszebb: leghosszabb kar, legkisebb szög: d = 12 · cos 10° ≈ <strong>11,8 m</strong>.</li>
              <li>b) Legközelebb: legrövidebb kar, legnagyobb szög: d = 4 · cos 60° = <strong>2 m</strong>.</li>
              <li>c) Legmagasabbra: h = 12 · sin 60° ≈ <strong>10,4 m</strong>.</li>
              <li>d) Legrövidebb karral: h = 4 · sin α, azaz kb. <strong>0,7 m és 3,5 m</strong> között.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Szabadság-szobor (5. feladat)" badge="tg" badgeColor="sky">
            <StatueOfLibertySvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>a) A szobor alja (47 m magasan): tg α₁ = 47 / 70 ⇒ <strong>α₁ ≈ 33,9°</strong>.</li>
              <li>b) A szobor teteje (47 + 46 = 93 m): tg α₂ = 93 / 70 ⇒ <strong>α₂ ≈ 53,0°</strong>.</li>
              <li>c) Maga a szobor: α₂ − α₁ ≈ <strong>19,2°</strong>-os szögben látszik.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Házi feladat', 'Derékszögű háromszög', 'Eredmény']}
          rows={[
            ['1. 712 m-es hegyről 6°-kal lefelé, 435 m légvonalban', 'esés = 435 · sin 6° ≈ 45,5 m', 'a szomszédos hegy ≈ 666,5 m'],
            ['2. húrtrapéz: 8,4 cm-es alapon 113°-os szögek, m = 10,2 cm', 'a másik alapon 67°-os szögek; szár = 10,2 : sin 67°', 'szár ≈ 11,1 cm, másik alap ≈ 17,1 cm, T ≈ 129,8 cm²'],
            ['3. 230 m-es út 21,3°-os emelkedéssel, antenna csúcsa 39,8° alatt', 'vízszintes: 230 · cos 21,3° ≈ 214,3 m', 'antenna ≈ 214,3 · tg 39,8° − 230 · sin 21,3° ≈ 95 m']
          ]}
        />
      </TheorySection>

      {/* 5. Ráadás: kotangens */}
      <TheorySection title="5. Ráadás: a hegyesszög kotangense" badge="Tankönyv 19. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CotangentSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Definíció:</strong> ha egy derékszögű háromszög egyik hegyesszöge α, akkor a <strong>mellette lévő</strong> és a <strong>vele szemben lévő</strong> befogó hosszának hányadosát az α <strong>kotangensének</strong> nevezzük. Jele: <strong>ctg α</strong> = b / a.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>ctg α = 1 / tg α (a tangens reciproka)</li>
              <li>ctg α = cos α / sin α</li>
              <li>ctg α = tg(90° − α) (a pótszög tangense)</li>
            </ul>
            <TheoryCallout type="tip" title="Számológéppel">
              A legtöbb számológépen nincs ctg billentyű: kiszámítjuk tg α-t, majd az 1/x (vagy x⁻¹) billentyűvel a reciprokát. Visszafelé: ctg α reciproka tg α, majd tan⁻¹. DEG üzemmód!
            </TheoryCallout>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Szinuszból koszinusz és tangens" badge="Ráadás 2." badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              sin α = 0,55 ⇒ cos α = √(1 − 0,55²) = √0,6975 ≈ <strong>0,835</strong>; tg α = sin α / cos α ≈ <strong>0,659</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Tangensből szinusz és koszinusz" badge="Ráadás 3." badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              tg α = 4: vegyük a 4 és 1 befogójú háromszöget, átfogója √17. sin α = 4 / √17 ≈ <strong>0,970</strong>; cos α = 1 / √17 ≈ <strong>0,243</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: az egyenlet rossz rendezése" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ha az ismeretlen a nevezőben van"
          wrong="cos 64,2° = 6 / x ⇒ x = 6 · cos 64,2° ≈ 2,6 cm"
          wrongExplanation="A szár (átfogó) nem lehet rövidebb a 6 cm-es befogónál! Az x a nevezőben van, ezért nem szorozni, hanem osztani kell."
          correct="cos 64,2° = 6 / x ⇒ x · cos 64,2° = 6 ⇒ x = 6 : cos 64,2° ≈ 13,8 cm"
          correctExplanation="Szorozz végig x-szel, majd oszd el mindkét oldalt cos 64,2°-kal. Ellenőrzés: az átfogó mindig a leghosszabb oldal."
          tip="Ellenőrizd azt is, hogy a számológép DEG (fok) üzemmódban van-e – RAD módban teljesen más eredményt kapnál!"
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Derékszögű háromszög megoldó" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setKind(c.id);
                  setP(c.init[0]);
                  setQ(c.init[1]);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${kind === c.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{activeCase.first}</label>
                  <input
                    type="number"
                    step="0.1"
                    value={p}
                    onChange={(e) => setP(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                    aria-label="első adat"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{activeCase.second}</label>
                  <input
                    type="number"
                    step="0.1"
                    value={q}
                    onChange={(e) => setQ(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                    aria-label="második adat"
                  />
                </div>
              </div>
              {sol.ok ? (
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                  {sol.steps.map((st, i) => (
                    <div key={st}>
                      {i + 1}. {st}
                    </div>
                  ))}
                  <div className="pt-2 text-xs text-slate-500">
                    Ellenőrzés: a² + b² ≈ {fmt(sol.a * sol.a + sol.b * sol.b)}, c² ≈ {fmt(sol.c * sol.c)}
                  </div>
                </div>
              ) : (
                <TheoryCallout type="warning" title="Hibás adat">
                  {sol.error}
                </TheoryCallout>
              )}
            </div>
            <svg viewBox="0 0 340 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              {sol.ok && (
                <>
                  <polygon
                    points={`${LA.x},${LA.y} ${LC.x},${LC.y} ${LB.x},${LB.y}`}
                    fill="rgba(99,102,241,0.12)"
                    stroke="#4f46e5"
                    strokeWidth="2"
                  />
                  {/* derékszög: negyedkörív ponttal */}
                  <path d={`M ${LC.x - 12} ${LC.y} A 12 12 0 0 1 ${LC.x} ${LC.y - 12}`} fill="none" stroke="#475569" strokeWidth="1.5" />
                  <circle cx={LC.x - 4.7} cy={LC.y - 4.7} r="1.8" fill="#475569" />
                  <text x={LA.x + 26} y={LA.y - 6} fontSize="11" fontWeight="bold" fill="#b91c1c">
                    α ≈ {fmt(sol.alpha, 1)}°
                  </text>
                  <text x={LC.x - 4} y={LB.y - 6} fontSize="11" fontWeight="bold" fill="#b91c1c" textAnchor="end">
                    β ≈ {fmt(90 - sol.alpha, 1)}°
                  </text>
                  <text x={(LA.x + LC.x) / 2} y={LA.y + 16} fontSize="11" textAnchor="middle" fill="#1d4ed8">
                    b ≈ {fmt(sol.b)}
                  </text>
                  <text x={LC.x + 6} y={(LB.y + LC.y) / 2} fontSize="11" fill="#b91c1c">
                    a ≈ {fmt(sol.a)}
                  </text>
                  <text x={(LA.x + LB.x) / 2 - 8} y={(LA.y + LB.y) / 2 - 8} fontSize="11" textAnchor="end" fill="#475569">
                    c ≈ {fmt(sol.c)}
                  </text>
                </>
              )}
            </svg>
          </div>
          <TheoryCallout type="success" title="Próbáld ki a tankönyvi adatokkal!">
            „befogó + átfogó”: a = 10,8, c = 12 ⇒ α ≈ 64,2° (1. kidolgozott feladat). „átfogó + szög”: c = 30, α = 37° ⇒ a ≈ 18,05 km, b ≈ 23,96 km (2. kidolgozott feladat). „melletti befogó + szög”: b = 6, α = 64,2° ⇒ c ≈ 13,8 cm (a szár).
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Az emelődaru gémje" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">gém hossza (k): {fmt(arm, 1)} m</label>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={arm}
                  onChange={(e) => setArm(Number(e.target.value))}
                  className="w-full accent-amber-600"
                  aria-label="gém hossza"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">gém dőlésszöge (α): {craneAngle}°</label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="1"
                  value={craneAngle}
                  onChange={(e) => setCraneAngle(Number(e.target.value))}
                  className="w-full accent-red-600"
                  aria-label="dőlésszög"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-[11px] text-slate-500">távolság d = k · cos α</div>
                  <div className="font-mono font-black text-blue-900">{fmt(reach)} m</div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">magasság h = k · sin α</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(lift)} m</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                Keresd meg a szélső értékeket! Legmesszebb: k = 12 m, α = 10° (≈ 11,82 m). Legközelebb: k = 4 m, α = 60° (2 m). Legmagasabbra: k = 12 m, α = 60° (≈ 10,39 m).
              </p>
            </div>
            <svg viewBox="0 0 340 280" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <line x1="10" y1={CO.y} x2="330" y2={CO.y} stroke="#94a3b8" strokeWidth="2" />
              <rect x={CO.x - 30} y={CO.y - 18} width="40" height="18" rx="3" fill="#fde68a" stroke="#b45309" />
              <line x1={CO.x} y1={CO.y} x2={CT.x} y2={CT.y} stroke="#d97706" strokeWidth="6" strokeLinecap="round" />
              <line x1={CT.x} y1={CT.y} x2={CT.x} y2={CO.y} stroke="#059669" strokeWidth="2" strokeDasharray="5 3" />
              <line x1={CO.x} y1={CO.y + 12} x2={CT.x} y2={CO.y + 12} stroke="#2563eb" strokeWidth="2" />
              <text x={CO.x + 30} y={CO.y - 6} fontSize="11" fontWeight="bold" fill="#b91c1c">{craneAngle}°</text>
              <text x={CT.x + 6} y={(CT.y + CO.y) / 2} fontSize="11" fill="#047857">h ≈ {fmt(lift, 1)} m</text>
              <text x={(CO.x + CT.x) / 2} y={CO.y + 26} fontSize="11" textAnchor="middle" fill="#1d4ed8">d ≈ {fmt(reach, 1)} m</text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RightTriangleSolvingTheory;
