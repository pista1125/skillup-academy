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
  BookOpen,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Calculator,
  Trophy,
  HelpCircle,
  Hash,
  XCircle,
  GitCompare,
  TrendingUp,
  Layers,
  Repeat,
  Target
} from 'lucide-react';
import {
  AlgebraMasterySvg,
  EquivalenceMapSvg,
  ProblemSolvingMapSvg,
  LinearSystemMapSvg
} from './PracticeTestFigures';

interface PracticeTestTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PracticeTestTheory: React.FC<PracticeTestTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Fejezet Állomás Állapot
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const topicReviews = [
    {
      id: 1,
      title: '1. A betűk szerepe a számolásban',
      badge: 'Alapfogalmak',
      rule: 'A változók tetszőleges számot helyettesítenek. Monom: szorzat (pl. 3x²y). Együttható és kitevő.',
      example: 'Ha x = -3, akkor 2x² - 5x = 2·(-3)² - 5·(-3) = 2·9 + 15 = 33.',
      trap: 'A (-3)² = +9, de -3² = -9! Ügyelj a zárójelekre negatív helyettesítésnél!',
      quizQ: 'Mennyi a 3a - 2b értéke, ha a = 4 és b = -1?',
      quizAns: '3·(4) - 2·(-1) = 12 + 2 = 14.'
    },
    {
      id: 2,
      title: '2. Számolás az algebrában',
      badge: 'Műveletek',
      rule: 'Csak egynemű tagokat vonhatunk össze (azonos betűrész és kitevő). Zárójel előtt mínusz: előjelváltás!',
      example: '3x - (2x - 5) + 4x = 3x - 2x + 5 + 4x = 5x + 5.',
      trap: '-(a - b) = -a + b! A b előjele is megfordul!',
      quizQ: 'Egyszerűsítsd: 4x² + 3x - 2x² + 7 - 5x = ?',
      quizAns: '(4 - 2)x² + (3 - 5)x + 7 = 2x² - 2x + 7.'
    },
    {
      id: 3,
      title: '3. Nevezetes szorzatok',
      badge: 'Azonosságok',
      rule: '(a ± b)² = a² ± 2ab + b² és (a - b)(a + b) = a² - b².',
      example: '(2x + 3)² = 4x² + 12x + 9.  (3x - 5)(3x + 5) = 9x² - 25.',
      trap: '(a + b)² NEM EGYENLŐ a² + b²-tel! Soha ne felejtsd el a középső 2ab vegyes szorzatot!',
      quizQ: 'Fejtsd ki: (x - 4)² = ?',
      quizAns: 'x² - 2·x·4 + 4² = x² - 8x + 16.'
    },
    {
      id: 4,
      title: '4. Szorzattá alakítás',
      badge: 'Kiemelés & Képletek',
      rule: '1. Közös tényező kiemelése (legnagyobb közös osztó). 2. Nevezetes azonosság felismerése.',
      example: '6x² - 12x = 6x(x - 2).  x² - 49 = (x - 7)(x + 7).',
      trap: 'Kiemelés után ellenőrizz visszaszorzással! Ha mindent kiemelsz, 1 marad (pl. 5x + 5 = 5(x + 1)).',
      quizQ: 'Alakítsd szorzattá: 2x² - 18 = ?',
      quizAns: 'Előbb emeljünk ki 2-t: 2(x² - 9) = 2(x - 3)(x + 3).'
    },
    {
      id: 5,
      title: '5. Egyenletek és egyenlőtlenségek',
      badge: 'Mérlegelv',
      rule: 'Egyenlet megoldása mérlegelvvel: mindkét oldalhoz ugyanazt a számot adjuk/vonjuk, vagy szorozzuk/osztjuk c ≠ 0-val.',
      example: '4x - 6 = 2x + 8 ⇒ 2x = 14 ⇒ x = 7.',
      trap: 'Egyenlőtlenségnél negatív számmal való szorzáskor vagy osztáskor a relációs jel megfordul!',
      quizQ: 'Oldd meg: -3x < 12.',
      quizAns: 'Osztunk (-3)-mal, a reláció fordul: x > -4.'
    },
    {
      id: 6,
      title: '6. Problémamegoldás egyenletekkel',
      badge: 'Szöveges Feladatok',
      rule: '1. Ismeretlen kiválasztása. 2. Szöveg lefordítása kifejezésekre. 3. Egyenlet felírása és megoldása. 4. Szöveges ellenőrzés.',
      example: 'Gondoltam egy számot, megháromszoroztam, hozzáadtam 5-öt, 26 lett: 3x + 5 = 26 ⇒ x = 7.',
      trap: 'Nem elég az egyenletbe visszahelyettesíteni, az eredeti szöveg értelmének kell megfelelni!',
      quizQ: 'Egy apa 36, fia 10 éves. Hány év múlva lesz az apa kétszer olyan idős, mint a fia?',
      quizAns: '36 + x = 2·(10 + x) ⇒ 36 + x = 20 + 2x ⇒ x = 16 év múlva (apa: 52, fia: 26).'
    },
    {
      id: 7,
      title: '7. Alaphalmaz, Értelmezési Tartomány, Megoldáshalmaz',
      badge: 'Kikötések & Halmazok',
      rule: 'Alaphalmaz (U): ahonnan az ismeretlen jöhet. Értelmezési tartomány (Df): ahol a kifejezések értelmesek (nevező ≠ 0).',
      example: '5 / (x - 3) = 2 esetén kikötés: x - 3 ≠ 0 ⇒ x ≠ 3. Df = ℝ \\ {3}.',
      trap: 'Ha a mérlegelvi lépések végén kijövő gyök kiesik az É.T.-ből, az HAMIS GYÖK, nem része az M-nek!',
      quizQ: 'Mi az értelmezési tartománya a (2x + 1)/(x + 5) kifejezésnek?',
      quizAns: 'x + 5 ≠ 0 ⇒ x ≠ -5, tehát Df = ℝ \\ {-5}.'
    },
    {
      id: 8,
      title: '8. Egyenletek megoldása (Módszertan)',
      badge: 'Összetett Egyenletek',
      rule: 'Algoritmus: 1. É.T. kikötése. 2. Zárójelek felbontása. 3. Törtek eltüntetése közös nevezővel. 4. Összevonás és rendezés. 5. Ellenőrzés.',
      example: '(x - 1)/2 + (x + 3)/3 = 4 ⇒ ·6 ⇒ 3(x - 1) + 2(x + 3) = 24 ⇒ 5x + 3 = 24 ⇒ x = 4.2.',
      trap: 'Törtes egyenletnél a törtvonal zárójelként funkcionál: - (x - 2)/3 esetén a mínusz mindkét tagra vonatkozik!',
      quizQ: 'Oldd meg: (x - 2)/(x - 2) = 1.',
      quizAns: 'x ≠ 2 esetén minden x-re igaz: M = ℝ \\ {2}.'
    },
    {
      id: 9,
      title: '9. Elsőfokú kétismeretlenes egyenletrendszer',
      badge: 'Két Ismeretlen',
      rule: 'Két lineáris egyenlet közös megoldása. Módszerek: Behelyettesítés vagy Egyenlő Együtthatók (Összeadás).',
      example: 'x + y = 10 és x - y = 4 ⇒ összeadva 2x = 14 ⇒ x = 7, y = 3. M = {(7; 3)}.',
      trap: 'Mindig párban adjuk meg az eredményt (x; y), és mindkét egyenletbe helyettesítsük vissza ellenőrzéskor!',
      quizQ: 'Mennyi y értéke, ha x = 3y és 2x + y = 14?',
      quizAns: '2·(3y) + y = 14 ⇒ 7y = 14 ⇒ y = 2 (és x = 6).'
    }
  ];

  const currentTopic = topicReviews[activeTopicIndex];

  return (
    <TheoryTemplate
      title="Gyakorlás, Tudáspróba – Átfogó Összefoglaló"
      subtitle="A III. fejezet (Egyenletek és azonosságok) teljes áttekintése: fogalmak, azonosságok, mérlegelv, szöveges feladatok és egyenletrendszerek"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 10. TÉMAKÖR"
      themeColor="purple"
      documentId="practice-test-theory"
      pdfFilename="9_osztaly_egyenletek_tudasproba_osszefoglalo.pdf"
      estimatedTime="25 perc"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A III. Fejezet Legfontosabb Összefoglaló Aranyszabályai',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-purple-700 dark:text-purple-400 font-black">1. Azonosságok: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                (a ± b)² = a² ± 2ab + b² és (a - b)(a + b) = a² - b². Kiemelésnél a közös osztót mindig a zárójel elé visszük!
              </span>
            </div>
            <div>
              <span className="text-indigo-700 dark:text-indigo-400 font-black">2. Mérlegelv & É.T.: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Nevező ≠ 0! Tilos ismeretlennel osztani (gyökvesztés) és ismeretlennel szorozva kötelező a hamis gyökök kizárása!
              </span>
            </div>
            <div>
              <span className="text-rose-700 dark:text-rose-400 font-black">3. Rendszerek & Szöveg: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                s = v · t; m₁p₁ + m₂p₂ = (m₁+m₂)p_új; rendszereknél behelyettesítés vagy egyenlő együtthatók alkalmazása.
              </span>
            </div>
          </div>
        )
      }}
    >
      {/* 1. KIFEJEZÉSEK ÉS AZONOSSÁGOK */}
      <TheorySection
        title="1. Algebrai Kifejezések és Nevezetes Azonosságok"
        subtitle="Monomok, polinomok, összevonás, szorzattá alakítás és a legfontosabb szorzatformulák"
        icon={<BookOpen className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <TheoryCard
              title="A 3 Legfontosabb Nevezetes Azonosság"
              variant="default"
              icon={<Sparkles className="w-5 h-5 text-purple-600" />}
            >
              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 font-mono">
                <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-200 dark:border-purple-900/40">
                  <strong>(a + b)² = a² + 2ab + b²</strong>
                  <div className="text-xs text-slate-500 mt-0.5">Kéttagú összeg négyzete</div>
                </div>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-200 dark:border-purple-900/40">
                  <strong>(a - b)² = a² - 2ab + b²</strong>
                  <div className="text-xs text-slate-500 mt-0.5">Kéttagú különbség négyzete</div>
                </div>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-200 dark:border-purple-900/40">
                  <strong>(a - b)(a + b) = a² - b²</strong>
                  <div className="text-xs text-slate-500 mt-0.5">Két tag különbségének és összegének szorzata</div>
                </div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="Szorzattá Alakítási Stratégia"
              variant="highlight"
              icon={<Layers className="w-5 h-5 text-indigo-600" />}
            >
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <li><strong>Mindig keresünk kiemelhető közös szorzót:</strong> pl. 6x² - 18x = 6x(x - 3).</li>
                <li><strong>Négyzetek különbsége:</strong> ha kéttagú a kifejezés, nézzük meg, hogy a² - b² alakú-e: 4x² - 25 = (2x - 5)(2x + 5).</li>
                <li><strong>Teljes négyzet:</strong> ha háromtagú, ellenőrizzük a vegyes szorzatot: x² + 10x + 25 = (x + 5)².</li>
              </ol>
            </TheoryCard>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <AlgebraMasterySvg size={300} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              A III. fejezet 4 integrált pillére
            </span>
          </div>
        </div>

        <TheoryTrapBox
          title="Tipikus Hiba az Azonosságoknál"
          trap="A diákok leggyakoribb hibája: (a + b)² = a² + b² felírása. A négyzetre emelés NEM disztributív az összeadásra! A középső tag (2ab) sosem maradhat el!"
          fix="Mindig írd ki gondolatban a szorzatot: (a + b)(a + b) = a² + ab + ba + b² = a² + 2ab + b²."
        />
      </TheorySection>

      {/* 2. EGYENLETEK ÉS A MÉRLEGELV */}
      <TheorySection
        title="2. Egyenletek Megoldása és Ekvivalencia"
        subtitle="Biztonságos mérlegelvi lépések, a gyökvesztés és gyökbevitel elkerülése"
        icon={<Calculator className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <EquivalenceMapSvg size={300} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              Ekvivalens műveletek vs. Veszélyes műveletek
            </span>
          </div>

          <div className="space-y-4">
            <TheoryCard
              title="A Megoldás 5 Lépéses Arany Algoritmusa"
              variant="default"
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            >
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <p><strong>1. Kikötések (É.T.):</strong> Nevező ≠ 0 vizsgálata már a legelején!</p>
                <p><strong>2. Zárójelek bontása:</strong> Disztributivitás, figyelve a mínusz előjelekre.</p>
                <p><strong>3. Törtek eltüntetése:</strong> Beszorzás a legkisebb közös nevezővel.</p>
                <p><strong>4. Rendezés & Összevonás:</strong> Ismeretlenek az egyik oldalra, számok a másikra.</p>
                <p><strong>5. Ellenőrzés:</strong> Visszahelyettesítés az EREDETI egyenletbe!</p>
              </div>
            </TheoryCard>

            <TheoryCallout
              type="warning"
              title="Veszélyes Műveletek Szabályai"
            >
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                • <strong>Tilos ismeretlennel osztani:</strong> pl. x² = 5x esetén ha leosztasz x-szel, kapod x = 5-öt, de elveszítetted az x = 0 gyököt! Helyette rendezz 0-ra: x(x - 5) = 0.<br />
                • <strong>Ismeretlennel való szorzás:</strong> hamis gyököt vihet be, ami nullává teszi az eredeti nevezőt.
              </p>
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. ALAPHALMAZ, É.T. ÉS MEGOLDÁSHALMAZ */}
      <TheorySection
        title="3. Alaphalmaz, Értelmezési Tartomány és Hamis Gyökök"
        subtitle="A három halmaz szerepe és hierarchiája a feladatok során"
        icon={<GitCompare className="w-6 h-6 text-purple-600" />}
      >
        <TheoryTable
          headers={['Halmaz Neve', 'Jelölés', 'Jelentése a Gyakorlatban', 'Példa']}
          rows={[
            [
              'Alaphalmaz',
              'U',
              'A számok halmaza, amelyben a feladat megoldását keressük.',
              'U = ℕ (csak természetes számok lehetnek gyökök)'
            ],
            [
              'Értelmezési Tartomány',
              'Df',
              'Az U azon részhalmaza, ahol az egyenlet mindkét oldala értelmezhető.',
              '1/(x - 5) esetén Df = ℝ \\ {5}'
            ],
            [
              'Megoldáshalmaz',
              'M',
              'Azon számok összessége, amelyeket behelyettesítve az egyenlőség igaz.',
              'M = {4} vagy M = ∅ (ha nincs valós megoldás)'
            ]
          ]}
        />

        <TheoryTrapBox
          title="A Hamis Gyök Csapdája"
          trap="Ha egy törtes egyenlet rendezése után megkapod pl. az x = 3-at, de az eredeti egyenlet nevezője (x - 3) volt, a diákok gyakran bekeretezik az x = 3-at mint végső megoldást."
          fix="Mivel x = 3 esetén a nevező 0 lenne, és nullával nem osztunk, x = 3 HAMIS GYÖK. A tényleges megoldáshalmaz üres: M = ∅!"
        />
      </TheorySection>

      {/* 4. SZÖVEGES FELADATOK MODELLEZÉSE */}
      <TheorySection
        title="4. Szöveges Feladatok Modellezése"
        subtitle="Életkoros, keverési, mozgásos és munkavégzéses problémák egyenletté formálása"
        icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <TheoryCard
              title="A 4 Fő Szöveges Feladattípus Képletei"
              variant="default"
              icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
            >
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-900/40">
                  <strong className="text-blue-700 dark:text-blue-300">Életkoros feladatok:</strong>
                  <div>Készíts időtáblázatot (Most és k év múlva)! A korkülönbség mindig állandó marad: k₁ - k₂ = const.</div>
                </div>
                <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded border border-purple-200 dark:border-purple-900/40">
                  <strong className="text-purple-700 dark:text-purple-300">Keverési feladatok:</strong>
                  <div>Oldott anyag mérlege: m₁ · (p₁/100) + m₂ · (p₂/100) = (m₁ + m₂) · (p_új/100).</div>
                </div>
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded border border-emerald-200 dark:border-emerald-900/40">
                  <strong className="text-emerald-700 dark:text-emerald-300">Mozgásos feladatok:</strong>
                  <div>s = v · t. Szembehaladáskor v_összes = v₁ + v₂. Utoléréskor v_relatív = v₁ - v₂.</div>
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <ProblemSolvingMapSvg size={300} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              Szöveges feladattípusok mátrixa
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 5. KÉTISMERETLENES EGYENLETRENDSZEREK */}
      <TheorySection
        title="5. Elsőfokú Kétismeretlenes Egyenletrendszerek"
        subtitle="Behelyettesítő és egyenlő együtthatós módszer, grafikus metszéspontok"
        icon={<Repeat className="w-6 h-6 text-purple-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <LinearSystemMapSvg size={300} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              A 3 lehetséges geometria: 1 pont, párhuzamos, egybeeső
            </span>
          </div>

          <div className="space-y-4">
            <TheoryCard
              title="Melyik Módszert Válasszuk?"
              variant="highlight"
              icon={<Sliders className="w-5 h-5 text-purple-600" />}
            >
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <p>
                  <strong>Behelyettesítő módszer:</strong> ha valamelyik ismeretlen együtthatója 1 vagy -1 (pl. x = 3y - 2). Ezt közvetlenül beírjuk a másik egyenletbe.
                </p>
                <p>
                  <strong>Egyenlő együtthatók (Kiküszöbölés):</strong> ha az ismeretlenek előtt nagyobb számok állnak (pl. 3x + 2y = 11 és 2x - 3y = 3). Beszorozzuk az egyenleteket úgy, hogy az egyik ismeretlen együtthatói ellentettek legyenek, majd összeadjuk őket.
                </p>
              </div>
            </TheoryCard>

            <TheoryCallout
              type="tip"
              title="A 3 Megoldási Eset Felismerése"
            >
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                1. <strong>Egyetlen gyökpár:</strong> x = a, y = b (két metsző egyenes).<br />
                2. <strong>Ellentmondás (0 = k, k ≠ 0):</strong> Nincs megoldás (két párhuzamos egyenes).<br />
                3. <strong>Azonosság (0 = 0):</strong> Végtelen sok megoldás (két egybeeső egyenes).
              </p>
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>
    
      {/* 6. ÖSSZEFOGLALÓ INTERAKTÍV FEJEZET LABOR */}
      <TheorySection
        title="6. Összefoglaló Interaktív Fejezet Labor: 9 Témakör Gyorstesztje"
        subtitle="Válaszd ki az áttekintendő altémát, nézd át a legfontosabb képletet és próbáld ki a villámkérdést!"
        icon={<Sliders className="w-6 h-6 text-purple-600" />}
      >
        <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-purple-200 dark:border-purple-900/40 shadow-sm space-y-5">
          {/* Téma gombok */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Válassz Témakört:
            </span>
            <div className="flex flex-wrap gap-2">
              {topicReviews.map((topic, index) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    setActiveTopicIndex(index);
                    setShowAnswer(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTopicIndex === index
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-purple-950/30'
                  }`}
                >
                  {topic.id}. {topic.title.split('. ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Részletes kártya */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                {currentTopic.title}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                {currentTopic.badge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="p-3 bg-purple-50/60 dark:bg-purple-950/20 rounded-lg border border-purple-100 dark:border-purple-900/30">
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 block mb-1">
                    Aranyszabály:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                    {currentTopic.rule}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block mb-1">
                    Minta Példa:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-mono">
                    {currentTopic.example}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-rose-50/60 dark:bg-rose-950/20 rounded-lg border border-rose-100 dark:border-rose-900/30">
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Tipikus Csapda:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentTopic.trap}
                  </p>
                </div>

                <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-900/30">
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 block mb-1">
                    Villámkérdés:
                  </span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold mb-2">
                    {currentTopic.quizQ}
                  </p>
                  {showAnswer ? (
                    <div className="p-2 bg-white dark:bg-slate-900 rounded border border-amber-300 dark:border-amber-800 text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                      Megoldás: {currentTopic.quizAns}
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAnswer(true)}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs font-bold transition-colors"
                    >
                      Megoldás Felfedése
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

