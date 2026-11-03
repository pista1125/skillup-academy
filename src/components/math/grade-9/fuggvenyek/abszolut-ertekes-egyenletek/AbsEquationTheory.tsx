// 17. Abszolútértékes egyenletek tananyag
import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  DistanceOnNumberLineSvg,
  TwoAbsMidpointSvg,
  CaseSeparationSvg
} from './AbsEquationFigures';
import {
  Sparkles,
  BookOpen,
  Sliders,
  AlertTriangle,
  Layers,
  Ruler,
  CheckCircle2
} from 'lucide-react';

export interface AbsEquationTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

type TabType = 'distance' | 'midpoint' | 'case-study';

export const AbsEquationTheory: React.FC<AbsEquationTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [tab, setTab] = useState<TabType>('distance');

  // Mode 1: |x - a| = b
  const [paramA, setParamA] = useState<number>(3);
  const [paramB, setParamB] = useState<number>(4);

  // Mode 2: |x - a| = |x - b|
  const [pointA, setPointA] = useState<number>(-2);
  const [pointB, setPointB] = useState<number>(6);

  return (
    <TheoryTemplate
      title="17. Abszolút értékes egyenletek"
      subtitle="Geometriai távolság a számegyenesen, szakaszfelező pontok és szisztematikus algebrai esetszétválasztás"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 17. ABSZOLÚT ÉRTÉKES EGYENLETEK"
      themeColor="rose"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
      quickRule={{
        label: "A Távolsági Szemlélet Aranyszabálya",
        formula: "|x - a| = b ➔ x távolsága a-tól pontosan b! (x₁ = a - b, x₂ = a + b) | |A| = |B| ➔ A = B vagy A = -B",
        align: "center"
      }}
      practiceTitle="Készen állsz az abszolútértékes egyenletek megoldására?"
      practiceSubtitle="30 átgondolt feladat 3 szinten: a távolsági szemlélettől a felezőpontokon át az algebrai esetszétválasztásig"
      practiceButtonText="Gyakorló Kvíz Indítása"
    >
      {/* =========================================================================
          1. SZEKCIÓ: ÁTTEKINTÉS ÉS ALAPFOGALMAK
      ========================================================================= */}
      <TheorySection
        title="1. Az Abszolútérték Geometriai Lényege"
        subtitle="Hogyan segít a számegyenes a bonyolultnak tűnő egyenletek fejben történő megoldásában?"
        icon={<Ruler className="w-6 h-6 text-rose-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <DistanceOnNumberLineSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-sky-700 dark:text-sky-300">Távolsági Szemlélet</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              $|x - a| = b$ azt jelenti: $x$ távolsága az $a$ ponttól pontosan $b$ egység ($x_1 = a - b, x_2 = a + b$).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <TwoAbsMidpointSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300">Felezőpont Elve</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              $|x - a| = |x - b|$ azon $x$ pont, ami egyenlő távolságra van $a$-tól és $b$-től: a felezőpont {'$x = \\frac{a+b}{2}$'}.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <CaseSeparationSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-300">Esetszétválasztás</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Több abszolútértéknél a zérushelyek határozzák meg a részintervallumokat, ahol külön vizsgáljuk az előjeleket.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: INTERAKTÍV MEGOLDÓ STÚDIÓ
      ========================================================================= */}
      <TheorySection
        title="2. Interaktív Abszolút Érték Laboratórium"
        subtitle="Kísérletezz a távolságokkal és felezőpontokkal, és nézd meg az azonnali levezetést!"
        icon={<Sliders className="w-6 h-6 text-rose-500" />}
      >
        <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-700 shadow-md space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className="text-sm font-bold text-white uppercase tracking-wider">Megoldási módszer:</span>
            <div className="flex rounded-lg bg-slate-800 p-1 border border-slate-700 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setTab('distance')}
                className={`px-3 py-1.5 rounded transition-all ${
                  tab === 'distance' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                |x - a| = b
              </button>
              <button
                type="button"
                onClick={() => setTab('midpoint')}
                className={`px-3 py-1.5 rounded transition-all ${
                  tab === 'midpoint' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                |x - a| = |x - b|
              </button>
              <button
                type="button"
                onClick={() => setTab('case-study')}
                className={`px-3 py-1.5 rounded transition-all ${
                  tab === 'case-study' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Esetszétválasztás
              </button>
            </div>
          </div>

          {/* 1. TÁVOLSÁGI TAB */}
          {tab === 'distance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Középpont (a):</span>
                    <strong className="text-amber-400 font-mono text-sm">{paramA}</strong>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={paramA}
                    onChange={e => setParamA(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Honnan mérjük a távolságot?</span>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Távolság (b):</span>
                    <strong className={`font-mono text-sm ${paramB < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {paramB}
                    </strong>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="6"
                    step="1"
                    value={paramB}
                    onChange={e => setParamB(parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Mekkora távolságra lépünk jobbra és balra?</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Megoldandó egyenlet:</span>
                  <span className="text-xl font-bold text-white font-mono">
                    |x {paramA >= 0 ? `- ${paramA}` : `+ ${Math.abs(paramA)}`}| = {paramB}
                  </span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Gyökök száma:</span>
                  <span className="text-xl font-bold text-amber-400 font-mono">
                    {paramB < 0 ? '0 (nincs megoldás)' : paramB === 0 ? '1 megoldás' : '2 megoldás'}
                  </span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Megoldáshalmaz:</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">
                    {paramB < 0 ? (
                      <span className="text-rose-400">M = ∅</span>
                    ) : paramB === 0 ? (
                      `x = ${paramA}`
                    ) : (
                      `x ∈ {${paramA - paramB}; ${paramA + paramB}}`
                    )}
                  </span>
                </div>
              </div>

              <div className="bg-rose-950/30 border border-rose-500/30 p-4 rounded-xl text-xs text-slate-300 leading-relaxed">
                <strong className="text-rose-300 block mb-1">Geometriai értelmezés a számegyenesen:</strong>
                {paramB < 0 ? (
                  <>
                    Mivel a távolság definíció szerint nem lehet negatív ($b = {paramB} &lt; 0$), az egyenletnek <strong>nincs valós megoldása ($M = \emptyset$)</strong>!
                  </>
                ) : paramB === 0 ? (
                  <>
                    Csak maga az $a = {paramA}$ pont van 0 távolságra önmagától, így egyetlen gyök létezik: $x = {paramA}$.
                  </>
                ) : (
                  <>
                    Az $a = {paramA}$ számtól balra $b = {paramB}$ távolságra van az $x_1 = {paramA} - {paramB} = {paramA - paramB}$, jobbra pedig az $x_2 = {paramA} + {paramB} = {paramA + paramB}$.
                  </>
                )}
              </div>
            </div>
          )}

          {/* 2. FELEZŐPONT TAB */}
          {tab === 'midpoint' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>1. pont (a):</span>
                    <strong className="text-sky-400 font-mono text-sm">{pointA}</strong>
                  </div>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="1"
                    value={pointA}
                    onChange={e => setPointA(parseInt(e.target.value, 10))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>2. pont (b):</span>
                    <strong className="text-purple-400 font-mono text-sm">{pointB}</strong>
                  </div>
                  <input
                    type="range"
                    min="-6"
                    max="6"
                    step="1"
                    value={pointB}
                    onChange={e => setPointB(parseInt(e.target.value, 10))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Megoldandó egyenlet:</span>
                  <span className="text-xl font-bold text-white font-mono">
                    |x {pointA >= 0 ? `- ${pointA}` : `+ ${Math.abs(pointA)}`}| = |x {pointB >= 0 ? `- ${pointB}` : `+ ${Math.abs(pointB)}`}|
                  </span>
                </div>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 block">Szakaszfelező pont (egyetlen megoldás):</span>
                  <span className="text-2xl font-bold text-emerald-400 font-mono">
                    x = {((pointA + pointB) / 2).toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="bg-purple-950/30 border border-purple-500/30 p-4 rounded-xl text-xs text-slate-300 leading-relaxed">
                <strong className="text-purple-300 block mb-1">Felezőpont elve:</strong>
                A számegyenesen pontosan egyetlen olyan pont létezik, amely az $a = {pointA}$ és $b = {pointB}$ pontoktól egyenlő távolságra fekszik: a számtani közepük, azaz {'$x = \\frac{a + b}{2} = \\frac{' + pointA + ' + ' + pointB + '}{2} = ' + ((pointA + pointB) / 2).toFixed(1) + '$'}.
              </div>
            </div>
          )}

          {/* 3. ESETSZÉTVÁLASZTÁS TAB */}
          {tab === 'case-study' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                <span className="text-amber-400 font-bold text-sm block">
                  Mintapélda: |x - 2| + |x + 3| = 7
                </span>
                <p className="text-slate-300">
                  A két abszolútérték belső kifejezéseinek zérushelyei: $x_1 = 2$ és $x_2 = -3$. Ez a két pont 3 intervallumra osztja a valós számegyenest:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-1">
                    <p className="text-sky-300 font-bold">1. Eset: x &lt; -3</p>
                    <p className="text-slate-400">Mindkettő negatív:</p>
                    <p className="text-slate-300">-(x - 2) - (x + 3) = 7</p>
                    <p className="text-slate-300">-2x - 1 = 7 ⟹ -2x = 8</p>
                    <p className="text-emerald-400 font-bold">x = -4 (beleesik! ✅)</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-1">
                    <p className="text-amber-300 font-bold">2. Eset: -3 ≤ x &lt; 2</p>
                    <p className="text-slate-400">Első negatív, második pozitív:</p>
                    <p className="text-slate-300">-(x - 2) + (x + 3) = 7</p>
                    <p className="text-slate-300">-x + 2 + x + 3 = 7</p>
                    <p className="text-rose-400 font-bold">5 = 7 (nincs gyök ❌)</p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-1">
                    <p className="text-emerald-300 font-bold">3. Eset: x ≥ 2</p>
                    <p className="text-slate-400">Mindkettő nemnegatív:</p>
                    <p className="text-slate-300">(x - 2) + (x + 3) = 7</p>
                    <p className="text-slate-300">2x + 1 = 7 ⟹ 2x = 6</p>
                    <p className="text-emerald-400 font-bold">x = 3 (beleesik! ✅)</p>
                  </div>
                </div>
                <div className="p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-500/30 text-emerald-300 font-bold text-center mt-2">
                  Végső megoldáshalmaz: M = &#123;-4; 3&#125;
                </div>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: A KÉT FŐ ALGEBRAI TÉTEL
      ========================================================================= */}
      <TheorySection
        title="3. A Két Alapvető Algebrai Tétel"
        subtitle="Mikor alkalmazhatunk villámgyors formulát, és mikor kötelező az esetszétválasztás?"
        icon={<BookOpen className="w-6 h-6 text-rose-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <TheoryCard
            title="1. Tétel: |A| = B (ahol B konstans vagy kifejezés)"
            icon={<CheckCircle2 className="w-5 h-5 text-rose-500" />}
          >
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <p>
                Egy kifejezés abszolútértéke csak akkor lehet egyenlő $B$-vel, ha $B \ge 0$, és ekkor $A = B$ vagy $A = -B$.
              </p>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-900 font-mono text-rose-800 dark:text-rose-300">
                Példa: $|2x - 3| = 5$
                <br />
                1. ág: $2x - 3 = 5 \implies 2x = 8 \implies x_1 = 4$
                <br />
                2. ág: $2x - 3 = -5 \implies 2x = -2 \implies x_2 = -1$
                <br />
                <strong>M = &#123;-1; 4&#125;</strong>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Tétel: |A| = |B| (Két abszolútérték egyenlősége)"
            icon={<CheckCircle2 className="w-5 h-5 text-purple-500" />}
          >
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <p>
                Két szám abszolútértéke akkor és csak akkor egyenlő, ha maguk a számok megegyeznek, vagy egymás ellentettjei:
              </p>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-900 font-mono text-purple-800 dark:text-purple-300">
                $|A| = |B| \iff A = B$ &nbsp;vagy&nbsp; $A = -B$
                <br />
                Példa: $|x + 5| = |3x - 1|$
                <br />
                1. ág: $x + 5 = 3x - 1 \implies 2x = 6 \implies x_1 = 3$
                <br />
                2. ág: $x + 5 = -(3x - 1) = -3x + 1 \implies 4x = -4 \implies x_2 = -1$
                <br />
                <strong>M = &#123;-1; 3&#125;</strong>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: TIPIKUS VIZSGACSAPDÁK
      ========================================================================= */}
      <TheorySection
        title="4. Tipikus Érettségi Csapdák"
        subtitle="A legveszélyesebb hibák az abszolútértékes feladatoknál"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Számolás negatív jobb oldal esetén"
            trap="A |x - 4| = -3 egyenletet látva két esetre bontják: x - 4 = 3 és x - 4 = -3."
            solution="Az abszolútérték távolságot mér, ami soha nem lehet negatív! Nincs mit számolni: azonnal M = ∅!"
          />
          <TheoryTrapBox
            title="2. Hamis gyök bent hagyása x-es jobb oldal esetén"
            trap="A |x - 2| = 2x - 5 egyenletből kijön x = 1 és x = 3, és mindkettőt elfogadják."
            solution="Ha x = 1, a jobb oldal 2(1) - 5 = -3 negatív! Ellenőrzés: |1 - 2| = 1 ≠ -3! Az x = 1 hamis gyök, kizárólag az x = 3 valódi gyök."
          />
          <TheoryTrapBox
            title="3. Intervallum-feltétel elhagyása esetszétválasztáskor"
            trap="Az x < -3 tartományban kijön x = 5, és nem vetik össze a feltétellel."
            solution="Mindig ellenőrizni kell: 5 < -3 hamis, tehát ebben az ágban nincs megoldás!"
          />
          <TheoryTrapBox
            title="4. Felezőpont felcserélése kivonáskor"
            trap="A |x + 2| = |x - 6| egyenletnél a 2 és 6 felezőpontját számolják."
            solution="|x + 2| valójában |x - (-2)|, így a -2 és +6 közötti felezőpontot kell keresni: (-2 + 6)/2 = 2!"
          />
        </div>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: ABSZOLÚTÉRTÉK NAGYTÁBLÁZAT
      ========================================================================= */}
      <TheorySection
        title="5. Abszolútértékes Egyenletek Típusai"
        subtitle="Módszerválasztó táblázat a feladatokhoz"
        icon={<Layers className="w-6 h-6 text-rose-500" />}
      >
        <TheoryTable
          headers={['Egyenlet alakja', 'Feltétel', 'Megoldási stratégia', 'Gyökök']}
          rows={[
            ['|x - a| = b', 'b > 0', 'Távolsági szemlélet a számegyenesen', 'x₁ = a - b, x₂ = a + b'],
            ['|x - a| = 0', 'b = 0', 'Egyetlen pont távolsága önmagától 0', 'x = a'],
            ['|x - a| = b', 'b < 0', 'Távolság nem lehet negatív', 'M = ∅ (nincs megoldás)'],
            ['|x - a| = |x - b|', 'a ≠ b', 'Szakaszfelező pont keresése', 'x = (a + b) / 2'],
            ['|A(x)| = B(x)', 'B(x) ≥ 0 feltétel', 'Két ágra bontás: A = B vagy A = -B', 'Csak ha B(x) ≥ 0 teljesül'],
            ['|A(x)| + |B(x)| = c', 'Több abszolútérték', 'Szisztematikus esetszétválasztás a zérushelyekkel', 'Részintervallumok uniója']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
