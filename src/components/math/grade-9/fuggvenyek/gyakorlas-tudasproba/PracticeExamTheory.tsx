import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  ChapterMapSvg,
  ComprehensiveAnalysisSvg,
  DualMethodComparisonSvg
} from './PracticeExamFigures';
import {
  Sparkles,
  Award,
  Layers,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Compass
} from 'lucide-react';

export interface PracticeExamTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PracticeExamTheory: React.FC<PracticeExamTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedFunc, setSelectedFunc] = useState<'linear' | 'quadratic' | 'abs' | 'sqrt'>('quadratic');

  return (
    <TheoryTemplate
      title="18. Gyakorlás, Tudáspróba: Fejezeti Összefoglalás"
      subtitle="Az V. Függvények fejezet átfogó szintézise, témazáró mintafeladatok és 100 pontos dolgozat-előkészítés"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 18. FEJEZETI ÖSSZEFOGLALÁS"
      themeColor="violet"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
      quickRule={{
        label: "A Függvénytan Aranyszabálya",
        formula: "Grafikon rajzolása ➔ 7 szempontos jellemzés ➔ Metszéspontok leolvasása (f(x) = g(x)) ➔ Intervallumok lejegyzése",
        align: "center"
      }}
      practiceTitle="Készen állsz a 100 pontos fejezeti tudáspróbára?"
      practiceSubtitle="30 átfogó vizsgafeladat a teljes fejezetből: alaptípusok, transzformációk, jellemzés, grafikus egyenletek és egyenlőtlenségek"
      practiceButtonText="Záróvizsga Indítása"
    >
      {/* =========================================================================
          1. SZEKCIÓ: A FEJEZET 4 FŐ PILLÉRE
      ========================================================================= */}
      <TheorySection
        title="1. A Függvénytan 4 Fő Pillére"
        subtitle="Hogyan épülnek egymásra a fejezet során elsajátított ismeretek?"
        icon={<Compass className="w-6 h-6 text-violet-500" />}
      >
        <TheoryCard
          title="Átfogó fejezeti térkép"
          icon={<Layers className="w-5 h-5 text-violet-500" />}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="shrink-0 flex justify-center">
              <ChapterMapSvg size={290} />
            </div>
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <h5 className="font-bold text-sm text-violet-800 dark:text-violet-300">
                A fejezet logikai felépítése az alapoktól a szintézisig:
              </h5>
              <ul className="space-y-1.5 list-disc pl-4">
                <li>
                  <strong>1. Alapfogalmak és Ábrázolás (1–6. lecke):</strong> Függvényfogalom, táblázatok, grafikonok olvasása, pontok és koordináták.
                </li>
                <li>
                  <strong>2. Alapfüggvények és Transzformációk (7–10, 13. lecke):</strong> Lineáris ($mx + b$), egyenes és fordított arányosság ($k/x$), abszolútérték ($a|x-u|+v$), másodfokú ($a(x-u)^2+v$) és gyökív.
                </li>
                <li>
                  <strong>3. Teljes Függvényjellemzés (11–12. lecke):</strong> Értelmezési tartomány, értékkészlet, zérushelyek, menet, szélsőértékek, paritás és korlátosság.
                </li>
                <li>
                  <strong>4. Alkalmazások és Egyenletek (14–17. lecke):</strong> Életszerű modellek, fedezeti pontok, grafikus egyenletek és egyenlőtlenségek metszésponti megoldása.
                </li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: AZ ALAPFÜGGVÉNYEK INTERAKTÍV ATLASZA
      ========================================================================= */}
      <TheorySection
        title="2. Az Alapfüggvények Interaktív Atlasza"
        subtitle="Válassz függvénytípust és elevenítsd fel a legfontosabb képleteket és tulajdonságokat!"
        icon={<Sparkles className="w-6 h-6 text-violet-500" />}
      >
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-700 space-y-4">
          <div className="flex rounded-lg bg-slate-800 p-1 border border-slate-700 text-xs font-semibold gap-1">
            <button
              type="button"
              onClick={() => setSelectedFunc('linear')}
              className={`flex-1 py-1.5 rounded transition-all ${
                selectedFunc === 'linear' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Lineáris (mx + b)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFunc('quadratic')}
              className={`flex-1 py-1.5 rounded transition-all ${
                selectedFunc === 'quadratic' ? 'bg-violet-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Másodfokú (Parabola)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFunc('abs')}
              className={`flex-1 py-1.5 rounded transition-all ${
                selectedFunc === 'abs' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Abszolútérték (V-alak)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFunc('sqrt')}
              className={`flex-1 py-1.5 rounded transition-all ${
                selectedFunc === 'sqrt' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Négyzetgyök (Gyökív)
            </button>
          </div>

          {selectedFunc === 'linear' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-800/80 rounded-xl space-y-2 border border-sky-500/30">
                <p className="font-bold text-sky-300 text-sm">Lineáris Függvény (Egyenes)</p>
                <p className="text-slate-300"><strong className="text-white">Alapképlet:</strong> f(x) = m·x + b</p>
                <p className="text-slate-300"><strong className="text-white">Meredekség (m):</strong> 1 lépés jobbra ➔ m lépés fel (vagy le).</p>
                <p className="text-slate-300"><strong className="text-white">y-metszet (b):</strong> Az egyenes az (0; b) pontban metszi az y-tengelyt.</p>
                <p className="text-slate-300"><strong className="text-white">Zérushely:</strong> x₀ = -b / m (ha m ≠ 0).</p>
              </div>
              <div className="p-4 bg-slate-800/80 rounded-xl space-y-2 border border-slate-700">
                <p className="font-bold text-slate-200">Kulcstulajdonságok:</p>
                <p className="text-slate-300">• Ha m &gt; 0: Szigorúan monoton növekvő a teljes ℝ-en.</p>
                <p className="text-slate-300">• Ha m &lt; 0: Szigorúan monoton csökkenő a teljes ℝ-en.</p>
                <p className="text-slate-300">• Ha m = 0: Vízszintes egyenes (konstans függvény, c(x) = b).</p>
                <p className="text-slate-300">• Ha b = 0: Egyenes arányosság, áthalad az O(0; 0) origón.</p>
              </div>
            </div>
          )}

          {selectedFunc === 'quadratic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-800/80 rounded-xl space-y-2 border border-violet-500/30">
                <p className="font-bold text-violet-300 text-sm">Másodfokú Függvény (Parabola)</p>
                <p className="text-slate-300"><strong className="text-white">Csúcsponti Alak:</strong> f(x) = a(x - u)² + v</p>
                <p className="text-slate-300"><strong className="text-white">Csúcspont:</strong> C(u; v)</p>
                <p className="text-slate-300"><strong className="text-white">Szimmetriatengely:</strong> x = u függőleges egyenes</p>
                <p className="text-slate-300"><strong className="text-white">Értékkészlet:</strong> y ∈ [v; ∞[ (ha a &gt; 0), illetve y ∈ ]-∞; v] (ha a &lt; 0)</p>
              </div>
              <div className="p-4 bg-slate-800/80 rounded-xl space-y-2 border border-slate-700">
                <p className="font-bold text-slate-200">Kulcstulajdonságok:</p>
                <p className="text-slate-300">• Ha a &gt; 0: Felfelé nyíló gödör, globális minimum értéke y = v az x = u helyen.</p>
                <p className="text-slate-300">• Ha a &lt; 0: Lefelé nyíló domb, globális maximum értéke y = v az x = u helyen.</p>
                <p className="text-slate-300">• |a| &gt; 1: Meredekebb, szűkebb; |a| &lt; 1: Laposabb, szélesebb nyílás.</p>
              </div>
            </div>
          )}

          {selectedFunc === 'abs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-800/80 rounded-xl space-y-2 border border-rose-500/30">
                <p className="font-bold text-rose-300 text-sm">Abszolútérték-függvény (V-alak)</p>
                <p className="text-slate-300"><strong className="text-white">Csúcsponti Alak:</strong> f(x) = a|x - u| + v</p>
                <p className="text-slate-300"><strong className="text-white">Csúcspont:</strong> C(u; v)</p>
                <p className="text-slate-300"><strong className="text-white">Szárak meredeksége:</strong> +a és -a (töréspont a csúcsban)</p>
                <p className="text-slate-300"><strong className="text-white">Geometriai jelentés:</strong> Távolság az u számtól a számegyenesen.</p>
              </div>
              <div className="p-4 bg-slate-800/80 rounded-xl space-y-2 border border-slate-700">
                <p className="font-bold text-slate-200">Kulcstulajdonságok:</p>
                <p className="text-slate-300">• Ha a &gt; 0: Felfelé álló V-alak, globális minimum C-ben.</p>
                <p className="text-slate-300">• Ha a &lt; 0: Fordított V-alak (tető), globális maximum C-ben.</p>
                <p className="text-slate-300">• Monotonitási váltás pontosan az x = u csúcspontnál történik.</p>
              </div>
            </div>
          )}

          {selectedFunc === 'sqrt' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-800/80 rounded-xl space-y-2 border border-emerald-500/30">
                <p className="font-bold text-emerald-300 text-sm">Négyzetgyök-függvény (Gyökív)</p>
                <p className="text-slate-300"><strong className="text-white">Alapfüggvény:</strong> f(x) = √x</p>
                <p className="text-slate-300"><strong className="text-white">Értelmezési Tartomány:</strong> Df = [0; ∞[ (negatív számból nincs gyök!)</p>
                <p className="text-slate-300"><strong className="text-white">Értékkészlet:</strong> Rf = [0; ∞[</p>
                <p className="text-slate-300"><strong className="text-white">Kezdőpont:</strong> K(0; 0)</p>
              </div>
              <div className="p-4 bg-slate-800/80 rounded-xl space-y-2 border border-slate-700">
                <p className="font-bold text-slate-200">Kulcstulajdonságok:</p>
                <p className="text-slate-300">• Szigorúan monoton növekvő a teljes [0; ∞[ tartományán.</p>
                <p className="text-slate-300">• Kezdetben meredeken indul, majd egyre laposabban nő (fekvő parabola felső fele).</p>
                <p className="text-slate-300">• Minimuma a kezdőpontban van: x = 0 helyen Min = 0.</p>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: A 7 LÉPÉSES TELJES FÜGGVÉNYJELLEMZÉS
      ========================================================================= */}
      <TheorySection
        title="3. A 7 Lépéses Teljes Függvényjellemzés Mintapéldával"
        subtitle="A dolgozatok legnagyobb pontértékű feladata lépésről lépésre"
        icon={<BookOpen className="w-6 h-6 text-violet-500" />}
      >
        <TheoryCard
          title="Gyakorlati Minta: f(x) = (x - 2)² - 4 teljes elemzése"
          icon={<BookOpen className="w-5 h-5 text-violet-500" />}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="shrink-0 flex justify-center">
              <ComprehensiveAnalysisSvg size={280} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300 flex-1">
              <div className="p-2.5 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <p className="text-sky-700 dark:text-sky-300 font-bold">1. Értelmezési tartomány (Df):</p>
                <p className="font-mono font-bold text-slate-900 dark:text-white">x ∈ ℝ</p>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <p className="text-sky-700 dark:text-sky-300 font-bold">2. Értékkészlet (Rf):</p>
                <p className="font-mono font-bold text-slate-900 dark:text-white">y ∈ [-4; ∞[</p>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <p className="text-emerald-700 dark:text-emerald-300 font-bold">3. Zérushelyek:</p>
                <p className="font-mono font-bold text-slate-900 dark:text-white">(x-2)² = 4 ⟹ x₁ = 0, x₂ = 4</p>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <p className="text-amber-700 dark:text-amber-300 font-bold">4. Monotonitás (Menet):</p>
                <p className="text-slate-900 dark:text-white">]-∞; 2]-n csökken, [2; ∞[-n nő</p>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <p className="text-amber-700 dark:text-amber-400 font-bold">5. Szélsőérték:</p>
                <p className="text-slate-900 dark:text-white">Min. hely: x = 2, Min. érték: y = -4</p>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-2xs">
                <p className="text-purple-700 dark:text-purple-300 font-bold">6. Paritás & Korlátosság:</p>
                <p className="text-slate-900 dark:text-white">Nem páros/páratlan; alulról korlátos (K = -4)</p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: GRAFIKUS EGYENLETEK ÉS EGYENLŐTLENSÉGEK
      ========================================================================= */}
      <TheorySection
        title="4. Grafikus Egyenletek és Egyenlőtlenségek Szintézise"
        subtitle="Hogyan adja a grafikus kép azonnal a megoldást az egyenletre és az egyenlőtlenségre is?"
        icon={<CheckCircle2 className="w-6 h-6 text-violet-500" />}
      >
        <TheoryCard
          title="Két feladat egyetlen ábrából"
          icon={<CheckCircle2 className="w-5 h-5 text-violet-500" />}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="shrink-0 flex justify-center">
              <DualMethodComparisonSvg size={280} />
            </div>
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                Példa: $x^2 = x + 2$ vs. $x^2 \le x + 2$
              </h5>
              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1 font-mono">
                <p className="text-emerald-700 dark:text-emerald-300 font-bold">Egyenlet: f(x) = g(x)</p>
                <p className="text-slate-700 dark:text-slate-300">A metszéspontok x-koordinátái: x₁ = -1 és x₂ = 2.</p>
                <p className="text-slate-900 dark:text-white font-bold">Megoldáshalmaz: M = &#123;-1; 2&#125; (diszkrét pontok)</p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1 font-mono">
                <p className="text-amber-700 dark:text-amber-300 font-bold">Egyenlőtlenség: f(x) ≤ g(x)</p>
                <p className="text-slate-700 dark:text-slate-300">Ahol a parabola az egyenes ALATT fut vagy metszi azt.</p>
                <p className="text-slate-900 dark:text-white font-bold">Megoldáshalmaz: x ∈ [-1; 2] (folytonos zárt szakasz)</p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: A TÉMAZÁRÓ 5 LEGGYAKORIBB TÍPUSHIBÁJA
      ========================================================================= */}
      <TheorySection
        title="5. A Témazáró 5 Leggyakoribb Végzetes Típushibája"
        subtitle="Ezeket a hibákat kerüld el a 100 pontos dolgozatban!"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Vízszintes eltolás előjelének eltévesztése"
            trap="Az f(x) = (x - 3)² függvényt látva 3 egységgel balra toljuk a görbét."
            solution="A zárójeles tagban a -3 JOBBRA tolást jelent! Csúcspont: C(3; 0)."
          />
          <TheoryTrapBox
            title="2. Szélsőérték hely és érték felcserélése"
            trap="A minimum helyéhez beírják a magasságot (y), az értékhez a helyet (x)."
            solution="A szélsőérték HELYE mindig az x-tengelyen van (bemenet), az ÉRTÉKE pedig az y-tengelyen (kimenet)!"
          />
          <TheoryTrapBox
            title="3. Számolás negatív jobb oldalú abszolútértéknél"
            trap="A |x - 2| = -5 egyenletet látva két esetre bontják és kiszámolják."
            solution="Az abszolútérték távolság, nem lehet negatív! Azonnal: M = ∅!"
          />
          <TheoryTrapBox
            title="4. Zárójelek eltévesztése egyenlőtlenségeknél"
            trap="Szigorú egyenlőtlenségnél ([ -2; 3 ]) zárt szögletes zárójelet írnak fel."
            solution="Szigorú (< vagy >) jelnél kizárólag nyílt ]a; b[ zárójel fogadható el!"
          />
        </div>
      </TheorySection>

      {/* =========================================================================
          6. SZEKCIÓ: A 100 PONTOS TÉMAZÁRÓ FELÉPÍTÉSE
      ========================================================================= */}
      <TheorySection
        title="6. A 100 Pontos Témazáró Felépítése"
        subtitle="Milyen témakörök mekkora súllyal szerepelnek a záróteszten?"
        icon={<Award className="w-6 h-6 text-violet-500" />}
      >
        <TheoryTable
          headers={['Dolgozat része', 'Témakörök', 'Pontszám', 'Kulcskövetelmény']}
          rows={[
            ['1. Rész: Alapfogalmak', 'Függvény fogalma, meredekség leolvasása, értelmezési tartomány', '20 pont', 'Gyors felismerés és leolvasás'],
            ['2. Rész: Transzformációk', 'Parabola és V-alak rajzolása, csúcspont, eltolások', '30 pont', 'Pontos koordináta-rajzolás és szabályok'],
            ['3. Rész: Teljes Elemzés', '7 szempontos jellemzés, zérushelyek, menet, szélsőértékek', '25 pont', 'Egzakt szakszerű matematikai megfogalmazás'],
            ['4. Rész: Egyenletek & Egyenlőtlenségek', 'Grafikus metszéspontok, intervallumos megoldások, abszolútérték', '25 pont', 'Metszéspontok leolvasása és hamis gyökök kizárása']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
