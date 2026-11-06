import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard
} from '../TheoryTemplate';
import {
  LogicSummaryTreeSvg,
  PythagorasThalesTimelineSvg,
  ZedCitiesTriangleSvg,
  SquareTrianglesSvg
} from './PracticeExamFigures';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale,
  Brain,
  HelpCircle,
  Layers,
  Award,
  Compass,
  Check,
  X
} from 'lucide-react';

interface PracticeExamTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PracticeExamTheory: React.FC<PracticeExamTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedCase, setSelectedCase] = useState<'cities' | 'timeline' | 'triangles'>('cities');

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • I. LOGIKA"
      title="6. Gyakorlás, tudáspróba"
      description="A teljes logika fejezet átfogó szintézise, bizonyítási módszerek, kompetenciamérési és érettségi típusfeladatok összefoglalása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. Szekció: A Logika Teljes Rendszere */}
      <TheorySection
        title="1. A Matematikai Logika Teljes Rendszere"
        subtitle="Az alapfogalmaktól a tétellevezetésekig: az elmélet strukturális térképe"
        badge="Fejezeti Szintézis"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              A 10. osztályos logika tananyag célja a precíz matematikai gondolkodás megalapozása.
              A matematika nyelve nem tűri a kétértelműséget: minden kijelentés szigorú szabályok szerint
              viselkedik.
            </p>

            <TheoryCard title="A klasszikus logika két alappillére" color="blue">
              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <strong className="text-blue-900 dark:text-blue-200 font-bold block mb-1">
                    1. A kizárt harmadik törvénye (tertium non datur):
                  </strong>
                  Minden állítás vagy IGAZ (1), vagy HAMIS (0), harmadik lehetőség nincs! (A ∨ ¬A = IGAZ)
                </div>
                <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                  <strong className="text-indigo-900 dark:text-indigo-200 font-bold block mb-1">
                    2. Az ellentmondásmentesség elve:
                  </strong>
                  Egy állítás és a tagadása nem lehet egyszerre igaz! (A ∧ ¬A = HAMIS)
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout title="Mi számít állításnak a matematikában?" type="info">
              <p className="text-xs leading-relaxed">
                Csak azok a kijelentő mondatok minősülnek állításnak, amelyekről egyértelműen, objektíven eldönthető, hogy igazak vagy hamisak. Kérdések, felkiáltások, óhajok és szubjektív ízlést kifejező mondatok <strong>nem állítások</strong>!
              </p>
            </TheoryCallout>
          </div>

          <GeometryFigureCard
            title="A Logika Fejezet Gondolattérképe"
            caption="A tanult 5 témakör szerves hierarchiája az állításoktól a következtetésekig"
            color="indigo"
          >
            <LogicSummaryTreeSvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 2. Szekció: Kvantorok és Tagadási Módszerek */}
      <TheorySection
        title="2. Kvantorok és Érettségi Tagadási Szabályok"
        subtitle="Univerzális és létezési állítások cáfolata a leggyakoribb érettségi feladatokban"
        badge="Érettségi Fókusz"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Az érettségi vizsgák 1. részében szinte minden évben szerepel egy logikai tagadási feladat.
            A leggyakoribb buktató, hogy a diákok a mindennapi életben használt „ellentétet” írják a precíz matematikai tagadás helyett.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="„Minden...” állítás tagadása" color="amber">
              <div className="space-y-2 text-xs">
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Eredeti:</strong> „Minden elem rendelkezik P tulajdonsággal.”
                  <br />
                  <strong>Tagadás:</strong> „Van olyan elem, amely NEM rendelkezik P-vel.” (vagy: „Nem minden elem rendelkezik P-vel.”)
                </p>
                <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
                  ⚠️ <em>Típushiba:</em> „Egyik sem...” vagy „Mindenki nem...” – ezek túllőnek a célon, mert már egyetlen kivétel is cáfol!
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="„Van olyan...” állítás tagadása" color="purple">
              <div className="space-y-2 text-xs">
                <p className="text-slate-700 dark:text-slate-300">
                  <strong>Eredeti:</strong> „Van olyan elem, amely rendelkezik P tulajdonsággal.”
                  <br />
                  <strong>Tagadás:</strong> „Egyik elem sem rendelkezik P-vel.” (vagy: „Minden elemre igaz, hogy nem P.”)
                </p>
                <div className="p-2 rounded bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-[11px] text-purple-900 dark:text-purple-200">
                  ⚠️ <em>Típushiba:</em> „Van olyan elem, amelyik nem...” – ez nem tagadás, hiszen mindkettő egyszerre is igaz lehet!
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 3. Szekció: Műveleti Alapok és De Morgan */}
      <TheorySection
        title="3. Logikai Műveletek és De Morgan Törvényei"
        subtitle="Összetett formulák kiértékelése és szisztematikus táblázatkészítés"
        badge="Művelettér"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A logikai műveletek pontosan megfelelnek a halmazműveleteknek:
          </p>

          <TheoryTable
            headers={['Művelet', 'Jelölés', 'Mikor IGAZ?', 'Halmazműveleti párhuzam', 'Tagadás (De Morgan)']}
            rows={[
              ['Konjunkció (ÉS)', 'A ∧ B', 'Csak ha mindkettő IGAZ', 'Metszet (A ∩ B)', '¬A ∨ ¬B'],
              ['Diszjunkció (VAGY)', 'A ∨ B', 'Ha legalább az egyik IGAZ', 'Unió (A ∪ B)', '¬A ∧ ¬B'],
              ['Implikáció (HA... AKKOR)', 'A ⇒ B', 'Mindig, KIVÉVE ha I ⇒ H', 'Részhalmaz (A ⊆ B)', 'A ∧ ¬B'],
              ['Ekvivalencia (AKKOR ÉS CSAK)', 'A ⟺ B', 'Ha A és B értéke azonos', 'Halmazok egyenlősége', 'A ⊕ B (kizáró vagy)']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. Szekció: Bizonyítási Módszerek */}
      <TheorySection
        title="4. Bizonyítási Módszerek a Matematikában"
        subtitle="Hogyan igazolunk vagy cáfolunk egy matematikai tételt?"
        badge="Módszertan"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">1</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Direkt Bizonyítás</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Az ismert axiómákból és korábban igazolt tételekből logikai lépések láncolatával közvetlenül eljutunk a bizonyítandó állításig ($A \Rightarrow B$).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">2</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Indirekt Bizonyítás</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Feltesszük az állítás tagadását ($\neg B$), majd ebből helyes logikai lépésekkel ellentmondásra jutunk egy ismert ténnyel vagy a feltevéssel. (Kontrapozíció: $\neg B \Rightarrow \neg A$).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center">3</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Cáfolás Ellenpéldával</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Egy univerzális állítás cáfolatához nem kell elméletet gyártani: elegendő <strong>egyetlen konkrét matematikai esetet</strong> felmutatni, amelyre a tétel nem teljesül.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: Híres Tankönyvi Feladványok Elemzése */}
      <TheorySection
        title="5. Híres Kompetenciamérési és Érettségi Esettanulmányok"
        subtitle="A tankönyv 31–32. oldalának kiemelt logikai és kompetencia feladatai"
        badge="Esettanulmányok"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                <Compass className="w-4 h-4 text-blue-600" />
                Zedország városai és a háromszög-egyenlőtlenség (Kompetenciamérés 2018)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Argad és Bugar távolsága 4000 km. Ciraz távolsága Argadtól 1300 km, Bugartól 3700 km.
                <br />
                <strong>Kérdés:</strong> Ciraz rajta van-e az egyenes úton?
                <br />
                <strong>Megoldás:</strong> Ha Ciraz az AB szakaszon lenne, 1300 + 2700 = 4000 km lenne a távolság. Mivel 1300 + 3700 = 5000 km &gt; 4000 km, a háromszög-egyenlőtlenség alapján Ciraz egy háromszög harmadik csúcsa, tehát <strong>biztosan nincs az egyenes úton</strong>!
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-amber-600" />
                Püthagorasz és Thalész találkozása (Kompetenciamérés 2011)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Thalész: Kr. e. 624 – 548. Püthagorasz: Kr. e. 560 – 480.
                <br />
                <strong>Kérdés:</strong> Elvileg találkozhattak-e?
                <br />
                <strong>Megoldás:</strong> Püthagorasz Kr. e. 560-ban született, Thalész Kr. e. 548-ban halt meg. Mivel $560 - 548 = 12$ évig mindketten éltek (Püthagorasz 12 éves volt Thalész halálakor), <strong>elvileg találkozhattak</strong>!
              </p>
            </div>
          </div>

          <GeometryFigureCard
            title="Zedország és a Háromszög-egyenlőtlenség"
            caption="1300 + 3700 = 5000 km > 4000 km. A geometriai axiómák logikai alkalmazása."
            color="rose"
          >
            <ZedCitiesTriangleSvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 6. Szekció: Négyzetbe Rajzolt Háromszögek Szintézise */}
      <TheorySection
        title="6. Logikai Metszetek Geometriai Alakzatokban"
        subtitle="A tankönyv 32. oldalának 16. feladata: ABCD négyzet és a háromszögek logikai tulajdonságai"
        badge="Geometria + Logika"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <p>
              Az ABCD négyzet oldalfelező pontjaival ($E, F$) képzett háromszögeket két logikai tulajdonság szerint osztályozzuk:
              <br />
              • $P$: „A háromszög derékszögű.”
              <br />
              • $Q$: „A háromszög egyenlő szárú.”
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div><strong>P ∧ Q (mindkettő):</strong> ABCΔ, EFDΔ (egyenlő szárú derékszögű)</div>
              <div><strong>P ∧ ¬Q (csak derékszögű):</strong> ABFΔ, ECDΔ (1 : 2 arányú befogók)</div>
              <div><strong>¬P ∧ Q (csak egyenlő szárú):</strong> CFEΔ, FACΔ</div>
              <div><strong>¬P ∧ ¬Q (egyik sem):</strong> Általános ferde háromszögek</div>
            </div>
          </div>

          <GeometryFigureCard
            title="Négyzetbe Rajzolt Háromszögek Osztályozása"
            caption="Logikai műveletek alkalmazása geometriai alakzatok tulajdonságaira"
            color="teal"
          >
            <SquareTrianglesSvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 7. Szekció: Interaktív Fejezeti Labor (a tananyag legvégén!) */}
      <TheorySection
        title="7. Interaktív Fejezeti Tudáspróba Labor"
        subtitle="Válassz ki egy kiemelt esettanulmányt a hivatalos tankönyvből, és tekintsd át a levezetést!"
        badge="Interaktív Labor"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedCase('cities')}
              className={`p-3 text-left rounded-xl text-xs font-semibold transition-all border ${
                selectedCase === 'cities'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-400/30'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              Zedország Városai (Kompetencia)
            </button>
            <button
              onClick={() => setSelectedCase('timeline')}
              className={`p-3 text-left rounded-xl text-xs font-semibold transition-all border ${
                selectedCase === 'timeline'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-400/30'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              Püthagorasz & Thalész Idővonal
            </button>
            <button
              onClick={() => setSelectedCase('triangles')}
              className={`p-3 text-left rounded-xl text-xs font-semibold transition-all border ${
                selectedCase === 'triangles'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-400/30'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              Négyzetbe Írt Háromszögek
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            {selectedCase === 'cities' && (
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Zedország Városai: Dénes állításának vizsgálata
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Dénes azt állítja: „Ciraz az Argadot Bugarral összekötő egyenes úton van.”
                  <br />
                  <strong>Matematikai modell:</strong> A, B pontok távolsága d(A,B) = 4000 km. Ciraz (C) pontra d(A,C) = 1300 km és d(C,B) = 3700 km.
                  <br />
                  Egy C pont akkor és csak akkor van rajta az AB egyenes szakaszon, ha d(A,C) + d(C,B) = d(A,B).
                  <br />
                  Itt: 1300 km + 3700 km = 5000 km ≠ 4000 km.
                  <br />
                  <strong>Végső következtetés:</strong> C pont NEM fekszik az AB szakaszon. Dénes állítása <strong>biztosan HAMIS</strong>!
                </p>
                <ZedCitiesTriangleSvg size={180} />
              </div>
            )}

            {selectedCase === 'timeline' && (
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Püthagorasz és Thalész Találkozásának Időrendi Elemzése
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Krisztus előtt az évek számozása csökkenő: a nagyobb szám korábbi időpontot jelent.
                  <br />
                  • Thalész élt: Kr. e. 624-től Kr. e. 548-ig.
                  <br />
                  • Püthagorasz élt: Kr. e. 560-tól Kr. e. 480-ig.
                  <br />
                  Közös életszakaszuk intervalluma: [Kr. e. 560; Kr. e. 548], amelynek hossza 12 év.
                  <br />
                  <strong>Végső következtetés:</strong> Püthagorasz Thalész születése után, de Thalész halála előtt született, így <strong>elvileg találkozhattak</strong>!
                </p>
                <PythagorasThalesTimelineSvg size={180} />
              </div>
            )}

            {selectedCase === 'triangles' && (
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Négyzetbe Írt Háromszögek Logikai Osztályozása
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Az ABCD négyzet oldalfelező pontjaival képezhető háromszögek vizsgálata kiváló példa a konjunkció (ÉS), diszjunkció (VAGY) és negáció (NEM) geometriai alkalmazására.
                </p>
                <SquareTrianglesSvg size={180} />
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PracticeExamTheory;

