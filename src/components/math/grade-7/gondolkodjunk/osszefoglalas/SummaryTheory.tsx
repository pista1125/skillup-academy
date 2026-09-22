import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Chapter1FormulaOverviewDiagram } from './SummaryDiagrams';
import {
  Trophy,
  Sparkles,
  Calculator,
  ArrowDownUp,
  GitBranch,
  Network,
  Scale,
  Gamepad2,
  CheckCircle2,
  Layers,
  BookOpen
} from 'lucide-react';

interface SummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SummaryTheory: React.FC<SummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-logic-summary-theory-doc"
      pdfFilename="7_osztaly_gondolkodjunk_osszefoglalas.pdf"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="7. Összefoglalás"
      subtitle="Az I. Gondolkodjunk! fejezet teljes elméleti és gyakorlati összefoglalása: kombinatorika, gráfok és logika"
      quickRule={{
        label: 'Fejezeti Arany Szabályok',
        formula: 'Szorzási szabály: a · b • Permutáció: n! • Gráfok: Σ d(v) = 2|E| • 21-es: 4 többszöröse'
      }}
      themeColor="rose"
      practiceTitle="Készen állsz a 90 feladatos fejezeti záró kvízre és gyakorlásra?"
      practiceSubtitle="90 válogatott feladat 3 nehézségi szinten (30 feladat szintenként), kártyás párosítóval és csoportosító játékkal!"
    >
      {/* SECTION 0: Fejezeti Képlettár Áttekintés */}
      <Chapter1FormulaOverviewDiagram />

      {/* SECTION 1: Számold össze! */}
      <TheorySection
        number={1}
        title="1. Számold össze! (Kombinatorikai Alapok)"
        icon={<Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Ha egy összetett folyamat több egymástól független döntésből áll, a lehetőségek számát a <strong>szorzási szabállyal</strong> számoljuk ki.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Szorzási Szabály" variant="blue">
              <div className="space-y-1.5 text-xs sm:text-sm">
                <p>Ha az 1. lépést $a$-féleképpen, a 2. lépést $b$-féleképpen tehetjük meg:</p>
                <div className="p-2 bg-blue-50 dark:bg-blue-950/50 font-mono font-bold text-blue-900 dark:text-blue-100 rounded text-center">
                  Összes lehetőség = a · b
                </div>
                <p className="text-[11px] text-slate-500">Pl. 3 féle nadrág és 4 féle póló = 3 · 4 = 12 féle öltözet.</p>
              </div>
            </TheoryCard>

            <TheoryCard title="Fa-diagram (Döntési fa)" variant="blue">
              <div className="space-y-1.5 text-xs sm:text-sm">
                <p>Vizuális eszköz, amely minden elágazásnál szemlélteti a lehetséges választásokat.</p>
                <p className="text-[11px] text-slate-500">Pl. 3 pénzérme feldobása: $2 \cdot 2 \cdot 2 = 8$ lehetséges ág (FFF, FFÍ... ÍÍÍ).</p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 2: Rendezd sorba! */}
      <TheorySection
        number={2}
        title="2. Rendezd sorba! (Sorrendek és Faktoriális: n!)"
        icon={<ArrowDownUp className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badgeColor="violet"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            $n$ darab különböző elem összes lehetséges sorrendjének (permutációjának) száma: <strong>$n!$ (n faktoriális)</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TheoryCard title="Alapértékek" variant="violet">
              <ul className="text-xs font-mono space-y-1 text-slate-700 dark:text-slate-300">
                <li>1! = 1</li>
                <li>2! = 2 · 1 = 2</li>
                <li>3! = 3 · 2 · 1 = 6</li>
                <li>4! = 4 · 3 · 2 · 1 = 24</li>
                <li>5! = 5 · 24 = 120</li>
                <li>6! = 6 · 120 = 720</li>
              </ul>
            </TheoryCard>

            <TheoryCard title="0 a számjegyek között" variant="violet">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                A 0 nem állhat az első helyen! Pl. 0, 1, 2, 3 jegyekből készíthető 4-jegyű számok száma:
                <br />
                <span className="font-mono font-bold text-violet-700 dark:text-violet-300">3 · 3 · 2 · 1 = 18 szám</span>.
              </p>
            </TheoryCard>

            <TheoryCard title="Ismétléses elrendezés" variant="violet">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Ha azonos elemek vannak (pl. MAMA): az összes elrendezést osztjuk az azonosak permutációjával:
                <br />
                <span className="font-mono font-bold text-violet-700 dark:text-violet-300">4! / (2! · 2!) = 6 szó</span>.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 3: Hány eset van? */}
      <TheorySection
        number={3}
        title="3. Hány eset van? (Kiválasztások Modellezése)"
        icon={<GitBranch className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Kiválasztási feladatoknál kulcsfontosságú tisztázni: <strong>visszatesszük-e az elemeket</strong>, és <strong>számít-e a sorrend</strong>.
          </p>

          <TheoryTable
            headers={['Típus', 'Példa', 'Képlet / Módszer', 'Lehetőségek']}
            rows={[
              ['Visszatevéses (számít a sorrend)', 'PIN kód 4 számjegyből (0-9)', '10 · 10 · 10 · 10 = 10⁴', '10 000 kód'],
              ['Visszatevés nélküli (számít a sorrend)', 'Dobogósok (1., 2., 3. hely)', 'n · (n - 1) · (n - 2)', '8 versenyzőnél: 8 · 7 · 6 = 336'],
              ['Kiválasztás (nem számít a sorrend)', '2 fős küldöttség választása 5 emberből', '(5 · 4) / 2', '10 küldöttség']
            ]}
          />
        </div>
      </TheorySection>

      {/* SECTION 4: Gráfok */}
      <TheorySection
        number={4}
        title="4. Gráfok (Csúcsok, Élek, Fokszámok és Teljes Gráfok)"
        icon={<Network className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A gráfelmélet alaptétele és a nevezetes gráftípusok összefüggései:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <TheoryCard title="Fokszámösszeg Tétel" variant="teal">
              <div className="font-mono font-bold text-teal-900 dark:text-teal-100 text-center p-2 bg-teal-50 dark:bg-teal-950/40 rounded">
                Σ d(v) = 2 · |E|
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                A fokszámok összege mindig <strong>PÁROS</strong>! A páratlan fokú csúcsok darabszáma mindig páros!
              </p>
            </TheoryCard>

            <TheoryCard title="Teljes Gráf (Kₙ)" variant="teal">
              <div className="font-mono font-bold text-teal-900 dark:text-teal-100 text-center p-2 bg-teal-50 dark:bg-teal-950/40 rounded">
                |E| = n · (n - 1) / 2
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Minden csúcs össze van kötve mindegyikkel (kézfogások $n$ ember között).
              </p>
            </TheoryCard>

            <TheoryCard title="Fa Gráf (Tₙ)" variant="teal">
              <div className="font-mono font-bold text-teal-900 dark:text-teal-100 text-center p-2 bg-teal-50 dark:bg-teal-950/40 rounded">
                |E| = n - 1 él
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Összefüggő és körmentes gráf. Mindig van legalább 2 darab 1-es fokú levele.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 5: Igazold! Cáfold! */}
      <TheorySection
        number={5}
        title="5. Igazold! Cáfold! (Bizonyítások és Skatulya-elv)"
        icon={<Scale className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badgeColor="cyan"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Matematikai érvelés, általánosítások cáfolata és a Dirichlet-féle skatulya-elv.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <TheoryCard title="Igazolás vs Cáfolat" variant="cyan">
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                <li>• <strong>Igazolás:</strong> Általános betűs levezetés kell (pl. $2k+1$, $3n$).</li>
                <li>• <strong>Cáfolat:</strong> 1 db működő ellenpélda elegendő!</li>
                <li>• <strong>„Minden...” tagadása:</strong> „Van olyan, amelyik nem...”</li>
              </ul>
            </TheoryCard>

            <TheoryCard title="Skatulya-elv (Dirichlet)" variant="cyan">
              <p className="text-slate-700 dark:text-slate-300">
                Ha $n + 1$ elemet osztunk el $n$ dobozba, legalább egy dobozba <strong>legalább 2 elem</strong> kerül.
                <br />
                <span className="font-mono text-cyan-800 dark:text-cyan-200 text-xs">
                  Általánosan: ⌈elemek / dobozok⌉ darab.
                </span>
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 6: Matematikai játékok */}
      <TheorySection
        number={6}
        title="6. Matematikai játékok (Nyerő Stratégiák)"
        icon={<Gamepad2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Kétszemélyes játékok és logikai fejtörők megoldási módszerei:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <TheoryCard title="21-es Játék (4-es Moduló)" variant="amber">
              <p className="text-slate-700 dark:text-slate-300">
                Elvehető 1, 2 vagy 3 kavics. A nyerő célpozíciók a 4 többszörösei ($4, 8, 12, 16, 20$).
                <br />
                Kezdő lépés: 1 elvétele $\rightarrow$ 20 marad. Ezután mindig $4 - k$ kavicsot veszünk el.
              </p>
            </TheoryCard>

            <TheoryCard title="Szimmetria és Fejtörők" variant="amber">
              <p className="text-slate-700 dark:text-slate-300">
                • Kerek asztalon: középpont elfoglalása, majd átellenes tükrözés.
                <br />
                • Lovagok és Lókötők: esetszétválasztással kizárjuk az ellentmondásokat.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
