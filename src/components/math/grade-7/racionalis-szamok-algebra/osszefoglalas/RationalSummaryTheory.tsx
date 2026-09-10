import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  Trophy,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  ArrowRight,
  Divide,
  Calculator,
  Equal,
  ArrowRightLeft,
  Shapes,
  Hash,
  BookOpen,
  Scale,
  Compass,
  Percent
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RationalSummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const RationalSummaryTheory: React.FC<RationalSummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Master Chapter Review Interactive State
  const [selectedTopicIdx, setSelectedTopicIdx] = useState<number>(0);

  const summaryTopics = [
    {
      id: 0,
      title: '1. Racionális Számok és Műveletek',
      icon: '🔢',
      rules: [
        'Racionális szám: felírható a/b alakban, ahol a, b egész szám és b ≠ 0.',
        'Összeadás / kivonás: Mindig közös nevezőre hozással végezzük!',
        'Szorzás: Számlálót számlálóval, nevezőt nevezővel. Előjelszabály: azonos előjel +, eltérő -.',
        'Osztás: Az osztó reciprokával való szorzássá alakítjuk át.'
      ],
      example: '(-3/4) : (2/5) = (-3/4) · (5/2) = -15/8 = -1 7/8',
      keyFormula: '(a/b) : (c/d) = (a/b) · (d/c)'
    },
    {
      id: 1,
      title: '2. Műveleti Sorrend & Zárójelek',
      icon: '🧮',
      rules: [
        '1. Zárójelek: Belülről kifelé haladva: ( ) ⟹ [ ] ⟹ { }.',
        '2. Hatványozás és gyökvonás.',
        '3. Szorzás és Osztás: Balról jobbra haladva.',
        '4. Összeadás és Kivonás: Balról jobbra haladva.'
      ],
      example: '15 - 3 · (4 - 7) = 15 - 3 · (-3) = 15 - (-9) = 15 + 9 = 24',
      keyFormula: 'c · (a ± b) = c · a ± c · b'
    },
    {
      id: 2,
      title: '3. Algebranyelv & Kifejezések',
      icon: '🔤',
      rules: [
        'Változó: Ismeretlen mennyiséget vagy általános értéket jelöl (x, y, a, b).',
        'Együttható: A betű előtti számszorzó. x = 1x (együttható: 1), -x = -1x (együttható: -1).',
        'Szorzáspont elhagyása: 3 · x = 3x, a · b = ab (két szám között NEM hagyható el!).',
        'Zárójelezés szövegben: „egy szám 5-tel növelt értékének 3-szorosa” ⟹ 3(x + 5).'
      ],
      example: '„Egy szám kétszeresénél 7-tel kevesebb” ⟹ 2x - 7',
      keyFormula: '-(a - b) = -a + b'
    },
    {
      id: 3,
      title: '4. Összevonás & Helyettesítési Érték',
      icon: '🎯',
      rules: [
        'Egynemű tagok: A betűrész és a hatványkitevő teljesen megegyezik (pl. 3x és -5x).',
        'Összevonás: Az együtthatókat előjelesen összeadjuk, a betűrész változatlan marad.',
        'Helyettesítési érték: A betűk helyére beírjuk a megadott számot és kiszámoljuk.',
        'Negatív szám négyzete: (-4)² = +16, de -4² = -16!'
      ],
      example: 'Ha kifejezés = 2x² - 3x + 1 és x = -2 ⟹ 2(4) - 3(-2) + 1 = 8 + 6 + 1 = 15',
      keyFormula: 'ax + bx = (a + b)x'
    },
    {
      id: 4,
      title: '5. Zárójelfelbontás & Kiemelés',
      icon: '⚡',
      rules: [
        'Beszorzás (disztributivitás): c · (a + b) = ca + cb.',
        'Negatív szorzó: -2(3x - 4) = -6x + 8 (minden előjel megfordul!).',
        'Közös tényező kiemelése: A tagok közös legnagyobb osztóját a zárójel elé írjuk.',
        'Megmaradó 1-es szabálya: 5x + 5 = 5(x + 1) (nem tűnik el az 5-ös helye!).'
      ],
      example: '6x² - 15x = 3x(2x - 5)  |  Ellenőrzés: 3x · 2x - 3x · 5 = 6x² - 15x',
      keyFormula: 'ab + ac = a(b + c)'
    }
  ];

  const currentTopic = summaryTopics[selectedTopicIdx];

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-7-racionalis-szamok-algebra-osszefoglalas"
      pdfFilename="7_osztaly_racionalis_szamok_algebra_osszefoglalas.pdf"
      title="9. Nagy Fejezeti Összefoglalás"
      subtitle="A II. témakör (Racionális számok, betűs kifejezések, műveletek, összevonás és algebra) teljes körű összefoglalása"
      badgeText="7. Osztály • Fejezeti Záró Összefoglalás"
      themeColor="rose"
      estimatedTime="35 perc"
      difficulty="Haladó"
    >
      {/* SECTION 1: A fejezet 8 alaptémájának szintézise */}
      <TheorySection
        number={1}
        title="A II. Témakör Átfogó Képe és Térképe"
        icon={<Trophy className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <TheoryCallout
          variant="info"
          title="Gratulálunk a fejezet teljesítéséhez!"
          icon={<Sparkles className="w-5 h-5 text-rose-600" />}
        >
          Ebben a fejezetben a racionális számok mélyebb tulajdonságaitól eljutottunk az algebrai gondolkodásig: a betűs kifejezések felírásáig, összevonásáig, zárójelfelbontásáig és faktorizálásáig (kiemeléséig).
        </TheoryCallout>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-xs">
            <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">1-2. Racionális számok</span>
            Törtek, tizedestörtek, ellentett, abszolút érték, reciprok és számegyenes.
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">3-4. Műveletek & Szöveges</span>
            Alapműveletek, törtrész, egész visszakeresése és arányszámítás.
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-xs">
            <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1">5-6. Sorrend & Betűk</span>
            Zárójelek hierarchiája, algebranyelv, együtthatók és formulák.
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs">
            <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1">7-8. Összevonás & Kiemelés</span>
            Egynemű tagok, helyettesítési érték, beszorzás és közös tényező kiemelése.
          </div>
        </div>
      </TheorySection>

      {/* SECTION 2: A legfontosabb képletek és szabályok nagytáblázata */}
      <TheorySection
        number={2}
        title="Nagy Fejezeti Képlet- és Szabálytár"
        icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryTable
          title="A fejezet legfontosabb algebrai és számtani képletei"
          headers={['Témakör / Fogalom', 'Szabály / Formula', 'Mintapélda', 'Gyakori hiba']}
          rows={[
            ['Törtek osztása', '(a/b) : (c/d) = (a/b) · (d/c)', '(2/3) : (4/5) = 2/3 · 5/4 = 5/6', 'Elfelejtik megfordítani a második törtet'],
            ['Műveleti sorrend', '1. Zárójel ⟹ 2. Szorzás/Osztás ⟹ 3. Összeadás', '10 - 2 · 3 = 10 - 6 = 4', '10 - 2 = 8 kivonása először'],
            ['Előjelváltás', '-(a - b) = -a + b', '-(2x - 5) = -2x + 5', 'Csak az első tag előjelét változtatják meg'],
            ['Egynemű összevonás', 'ax + bx = (a + b)x', '5x - 8x = -3x', 'Különböző hatványokat vonnak össze (pl. 2x + 3x²)'],
            ['Helyettesítési érték', 'Betűk helyére konkrét számok', 'x² ha x = -3 ⟹ (-3)² = +9', 'Zárójel nélkül: -3² = -9'],
            ['Zárójelfelbontás', 'c · (a + b) = ca + cb', '-3(2x - 4) = -6x + 12', 'A negatív szorzónál elmarad az előjelváltás'],
            ['Kiemelés', 'ab + ac = a(b + c)', '6x + 9 = 3(2x + 3)', 'Nem a legnagyobb közös osztót emelik ki'],
            ['Megmaradó 1-es', 'a · x + a = a(x + 1)', '4x + 4 = 4(x + 1)', 'A tag helyének elhagyása: 4(x) = 4x'],
          ]}
        />
      </TheorySection>

      {/* SECTION 3: A 6 legveszélyesebb fejezeti csapda */}
      <TheorySection
        number={3}
        title="A 6 Leggyakoribb Fejezeti Hibacsapda és Elkerülésük"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. Csapda: (-x)² vs -x²">
            <div className="space-y-1.5 text-xs text-rose-950 dark:text-rose-200">
              <p>Ha x = -3, akkor az <span className="font-mono font-bold">x²</span> értéke:</p>
              <p>✅ <strong>HELYES:</strong> (-3)² = (-3) · (-3) = <strong>+9</strong></p>
              <p>❌ <strong>HIBÁS:</strong> -3² = -9</p>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. Csapda: Műveleti sorrend megtörése">
            <div className="space-y-1.5 text-xs text-rose-950 dark:text-rose-200">
              <p>Mennyi a <span className="font-mono font-bold">20 - 4 : 2</span> értéke?</p>
              <p>✅ <strong>HELYES:</strong> 20 - 2 = <strong>18</strong> &nbsp; (Osztás előbb)</p>
              <p>❌ <strong>HIBÁS:</strong> (20 - 4) : 2 = 16 : 2 = 8</p>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="3. Csapda: Eltérő betűk és kitevők összevonása">
            <div className="space-y-1.5 text-xs text-rose-950 dark:text-rose-200">
              <p><span className="font-mono font-bold">3a + 2b</span> vagy <span className="font-mono font-bold">4x + 2x²</span></p>
              <p>✅ <strong>HELYES:</strong> Nem vonható tovább össze, így marad!</p>
              <p>❌ <strong>HIBÁS:</strong> 5ab vagy 6x³</p>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="4. Csapda: Negatív szorzó zárójel előtt">
            <div className="space-y-1.5 text-xs text-rose-950 dark:text-rose-200">
              <p><span className="font-mono font-bold">-2 · (3x - 5)</span></p>
              <p>✅ <strong>HELYES:</strong> -6x + 10 &nbsp; (mindkét előjel megfordul)</p>
              <p>❌ <strong>HIBÁS:</strong> -6x - 10 vagy -6x - 5</p>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="5. Csapda: A kiemelés utáni 1-es elhagyása">
            <div className="space-y-1.5 text-xs text-rose-950 dark:text-rose-200">
              <p><span className="font-mono font-bold">7x - 7</span></p>
              <p>✅ <strong>HELYES:</strong> 7(x - 1)</p>
              <p>❌ <strong>HIBÁS:</strong> 7x vagy 7(x - 0)</p>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="6. Csapda: Törtes kivonás zárójel nélkül">
            <div className="space-y-1.5 text-xs text-rose-950 dark:text-rose-200">
              <p><span className="font-mono font-bold">12 - (5 - 8)</span></p>
              <p>✅ <strong>HELYES:</strong> 12 - (-3) = 12 + 3 = <strong>15</strong></p>
              <p>❌ <strong>HIBÁS:</strong> 12 - 5 - 8 = -1</p>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* SECTION 4: Geometriai és gyakorlati modellek szintézise */}
      <TheorySection
        number={4}
        title="Gyakorlati és Geometriai Modellek Szintézise"
        icon={<Shapes className="w-5 h-5 text-emerald-600" />}
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Téglalap K és T" icon={<Shapes className="w-4 h-4 text-emerald-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div>Oldalak: a és b</div>
              <div>Kerület: <strong>K = 2(a + b) = 2a + 2b</strong></div>
              <div>Terület: <strong>T = ab</strong></div>
            </div>
          </TheoryCard>

          <TheoryCard title="Négyzet K és T" icon={<Shapes className="w-4 h-4 text-indigo-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div>Oldal: a (vagy 2x)</div>
              <div>Kerület: <strong>K = 4a</strong></div>
              <div>Terület: <strong>T = a²</strong></div>
            </div>
          </TheoryCard>

          <TheoryCard title="Szöveges ármodellek" icon={<Calculator className="w-4 h-4 text-purple-600" />}>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <div>x db füzet (300 Ft) + y db ceruza (150 Ft):</div>
              <div><strong>Összeg = 300x + 150y</strong></div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 5: Interaktív Fejezeti Tudáslaboratórium */}
      <TheorySection
        number={5}
        title="Interaktív Fejezeti Tudásközpont és Szabálykereső"
        icon={<Sparkles className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <Card className="border-2 border-rose-200 dark:border-rose-850 bg-gradient-to-br from-rose-50/50 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-5">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-600" />
                Fejezeti Főtémák és Példatár
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Kattints a témakörökre a legfontosabb szabályok, képletek és mintapéldák gyors átismétléséhez a záróteszt előtt!
              </p>
            </div>

            {/* Topic selector pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {summaryTopics.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedTopicIdx(idx)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5",
                    selectedTopicIdx === idx
                      ? "bg-rose-600 text-white border-rose-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.title.split(':')[0]}</span>
                </button>
              ))}
            </div>

            {/* Selected Topic Review Box */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border-2 border-rose-200 dark:border-slate-750 shadow-inner max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                  {currentTopic.title}
                </h4>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-1 rounded-lg">
                  {currentTopic.keyFormula}
                </span>
              </div>

              {/* Rules list */}
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 text-left">
                {currentTopic.rules.map((rule, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>

              {/* Example showcase */}
              <div className="p-3 bg-rose-50/70 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 text-left space-y-1">
                <div className="text-[11px] font-bold uppercase text-rose-700 dark:text-rose-300">
                  Mintapélda levezetése:
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  {currentTopic.example}
                </div>
              </div>

              {/* Ready CTA */}
              <div className="pt-2 text-center">
                <Button
                  onClick={onStartQuiz}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs px-6 py-2 shadow-md"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Készen állok a 90 Kérdéses Nagy Fejezeti Kvízre!
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};
