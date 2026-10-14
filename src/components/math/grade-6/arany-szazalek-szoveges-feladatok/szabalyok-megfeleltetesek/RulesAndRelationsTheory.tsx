import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Repeat,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Calculator,
  Cpu,
  Layers,
  Table as TableIcon,
  HelpCircle,
  TrendingUp
} from 'lucide-react';

interface RulesAndRelationsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const RulesAndRelationsTheory: React.FC<RulesAndRelationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Szabálygép állapota
  const [selectedRuleKey, setSelectedRuleKey] = useState<'double_plus1' | 'triple_minus2' | 'half_plus4' | 'square'>('double_plus1');
  const [inputX, setInputX] = useState<number>(3);

  const rulesConfig = {
    double_plus1: {
      name: '2x + 1',
      description: 'Szorozd meg 2-vel, majd adj hozzá 1-et!',
      formula: 'y = 2 · x + 1',
      mapping: 'x ↦ 2x + 1',
      calc: (x: number) => 2 * x + 1,
      steps: (x: number) => `${x} · 2 = ${2 * x} ⟹ ${2 * x} + 1 = ${2 * x + 1}`
    },
    triple_minus2: {
      name: '3x - 2',
      description: 'Szorozd meg 3-mal, majd vonj ki 2-t!',
      formula: 'y = 3 · x - 2',
      mapping: 'x ↦ 3x - 2',
      calc: (x: number) => 3 * x - 2,
      steps: (x: number) => `${x} · 3 = ${3 * x} ⟹ ${3 * x} - 2 = ${3 * x - 2}`
    },
    half_plus4: {
      name: 'x / 2 + 4',
      description: 'Vedd a felét, majd adj hozzá 4-et!',
      formula: 'y = x / 2 + 4',
      mapping: 'x ↦ x/2 + 4',
      calc: (x: number) => x / 2 + 4,
      steps: (x: number) => `${x} : 2 = ${x / 2} ⟹ ${x / 2} + 4 = ${x / 2 + 4}`
    },
    square: {
      name: 'x²',
      description: 'Szorozd meg önmagával (négyzetre emelés)!',
      formula: 'y = x · x = x²',
      mapping: 'x ↦ x²',
      calc: (x: number) => x * x,
      steps: (x: number) => `${x} · ${x} = ${x * x}`
    }
  };

  const currentRule = rulesConfig[selectedRuleKey];
  const outputY = currentRule.calc(inputX);

  const sampleInputs = [0, 1, 2, 3, 4, 5];

  const sections: TheorySection[] = [
    {
      id: 'hozzaarendeles-fogalma',
      title: 'A hozzárendelés és a szabály fogalma',
      badge: 'Alapfogalmak',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A matematikában <strong>hozzárendelésről</strong> beszélünk, ha egy kiinduló halmaz elemeihez (bemenő adatok: $x$) 
            valamilyen pontos utasítás vagy törvényszerűség (<strong>szabály</strong>) alapján hozzárendeljük egy másik halmaz elemeit (kimenő adatok: $y$).
          </p>

          {/* Kiemelt képlet kártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
              <Sparkles className="w-3 h-3 text-emerald-600" /> Kiemelt összefüggés
            </span>
            <div className="text-lg sm:text-2xl font-mono font-black text-emerald-950 dark:text-emerald-100 tracking-wide">
              Bemenet (x) &nbsp;⟹&nbsp; [ Szabály: y = f(x) ] &nbsp;⟹&nbsp; Kimenet (y)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              A hozzárendelés egyértelmű, ha minden bemenő $x$ értékhez <strong>pontosan egyetlen</strong> kimenő $y$ érték tartozik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block uppercase tracking-wider text-[11px]">
                1. Bemenet (Alaphalmaz, x)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A kiinduló számok, amelyeket bedobunk a szabálygépbe. Független változónak is hívjuk.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-teal-700 dark:text-teal-400 block uppercase tracking-wider text-[11px]">
                2. Szabály (Művelet)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A matematikai képlet vagy szöveges utasítás: pl. „szorozd 2-vel, és adj hozzá 3-at”.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-sky-700 dark:text-sky-400 block uppercase tracking-wider text-[11px]">
                3. Kimenet (Képhalmaz, y)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Az eredményül kapott érték. A bemenettől függ, ezért függő változónak nevezzük.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'szabaly-megadasa',
      title: 'A szabály megadásának 3 leggyakoribb formája',
      badge: 'Megadási módok',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ugyanazt a matematikai összefüggést többféleképpen is felírhatjuk és kommunikálhatjuk:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
              <div className="font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                1. Szöveges megfogalmazás
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Egyszerű magyar mondatban leírt utasítás:
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800 italic text-slate-800 dark:text-slate-200">
                „Minden számhoz rendeld hozzá a nála 3-mal nagyobb szám kétszeresét!”
              </div>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
              <div className="font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                2. Nyíldiagram és hozzárendelés
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Nyíl szimbólummal (<MathText>↦</MathText>) jelölt leképezés:
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200 dark:border-emerald-800 font-mono font-bold text-emerald-800 dark:text-emerald-300 text-center">
                x ↦ 2 · (x + 3)
              </div>
            </div>

            <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 space-y-2">
              <div className="font-bold text-sky-900 dark:text-sky-200 uppercase tracking-wider">
                3. Egyenlet és függvényképlet
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Hagyományos egyenlet alak:
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-sky-200 dark:border-sky-800 font-mono font-bold text-sky-800 dark:text-sky-300 text-center">
                y = 2 · (x + 3) = 2x + 6
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tablazat-kitoltese',
      title: 'Hogyan töltsünk ki értéktáblázatot?',
      badge: 'Gyakorlat',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Az értéktáblázatban a felső sor tartalmazza az $x$ bemeneteket, az alsó sor pedig a kiszámított $y$ kimeneteket.
          </p>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <TableIcon className="w-4 h-4 text-emerald-600" />
              Példa: y = 3x - 1 szabály értéktáblázata
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 font-bold">
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700 text-left">Bemenet (x)</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">0</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">1</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">2</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">3</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">5</th>
                    <th className="p-2.5 border border-slate-200 dark:border-slate-700">10</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2.5 font-bold border border-slate-200 dark:border-slate-700 text-left bg-slate-50 dark:bg-slate-850">
                      Kimenet (y = 3x - 1)
                    </td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">-1</td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">2</td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">5</td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">8</td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">14</td>
                    <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono font-bold text-emerald-600">29</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
              Számítás: ha x = 3, akkor y = 3 · 3 - 1 = 9 - 1 = 8. Ha x = 10, akkor y = 3 · 10 - 1 = 30 - 1 = 29.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'szabalykereses',
      title: 'Szabálykeresés: Hogyan találjuk ki a rejtett szabályt?',
      badge: 'Nyomozás',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Gyakran a táblázat számpárjai adottak, és nekünk kell <strong>felismernünk a szabályt</strong>. 
            Kövesd a 3 lépéses nyomozási stratégiát:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block uppercase tracking-wide">
                1. lépés: Különbség vizsgálata
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Vizsgáld meg, hogy y-t megkaphatjuk-e úgy, hogy x-hez hozzáadunk vagy kivonunk egy fix számot! 
                Pl. ha (1; 5), (2; 6), (3; 7) ⟹ <code className="font-bold text-emerald-600">y = x + 4</code>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <span className="font-bold text-teal-700 dark:text-teal-400 block uppercase tracking-wide">
                2. lépés: Hányados / Szorzó vizsgálata
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha a különbség nem állandó, nézd meg a szorzást: hányszorosa y az x-nek? 
                Pl. ha (1; 4), (2; 8), (3; 12) ⟹ <code className="font-bold text-teal-600">y = 4 · x</code> (egyenes arányosság!).
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <span className="font-bold text-sky-700 dark:text-sky-400 block uppercase tracking-wide">
                3. lépés: Kombinált szabályok
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha egyik sem egyezik, szorzás ÉS összeadás/kivonás kombinációja van: 
                pl. (1; 5), (2; 9), (3; 13) ⟹ a kimenet 4-esével nő, tehát <code className="font-bold text-sky-600">y = 4x + 1</code>.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'visszafele-szamolas',
      title: 'Visszafelé számolás (Inverz művelet / Lebontogatás)',
      badge: 'Lebontogatás',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha a kimenő értéket ($y$) ismerjük, és a bemenő értéket ($x$) keressük, <strong>ellentétes műveletekkel fordított sorrendben</strong> haladunk visszafelé:
          </p>

          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20 text-xs space-y-2">
            <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5 uppercase tracking-wide">
              <Lightbulb className="w-4 h-4 text-indigo-600" /> Mintapélda a visszafelé számolásra
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Szabály: <code className="font-bold font-mono">y = 2 · x + 5</code>. Tudjuk, hogy <code className="font-bold">y = 19</code>. Mennyi volt az x?
            </p>
            <div className="space-y-1.5 font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <div>1. Előrefelé: x szorozva 2-vel, majd hozzáadunk 5-öt.</div>
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">
                2. Visszafelé: először levonjuk az 5-öt: 19 - 5 = 14.
              </div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                3. Majd osztunk 2-vel: 14 : 2 = 7. Tehát x = 7.
              </div>
            </div>
            <div className="text-emerald-700 dark:text-emerald-300 text-[11px] pt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ellenőrzés: 2 · 7 + 5 = 14 + 5 = 19 ✓
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Szabályok, megfeleltetések"
      subtitle="Hozzárendelési szabályok, értéktáblázatok kitöltése, szabálykeresés és visszafelé számolás"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="emerald"
      pdfFilename="6_osztaly_IV_szabalyok_megfeleltetesek_tananyag.pdf"
      quickRule={{
        label: 'A hozzárendelés alapszabálya',
        formula: 'Bemenet (x) ⟹ Szabály [ f(x) ] ⟹ Kimenet (y)'
      }}
      practiceTitle="Készen állsz a szabályjátékra és kvízre?"
      practiceSubtitle="Gyakorold a táblázatok kitöltését, a szabályok felismerését és az egyenleteket 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív Szabálygép Laboratórium */}
      <Card className="p-4 sm:p-5 border-emerald-200 dark:border-emerald-900/50 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 dark:from-slate-900 dark:to-emerald-950/20 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/60 dark:border-emerald-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-emerald-500 text-white shadow-xs">
                <Cpu className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Interaktív Szabálygép Szimulátor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Válassz egy szabályt, állítsd be az $x$ bemenetet, és kövesd végig a számítási lépéseket!
                </p>
              </div>
            </div>

            {/* Szabályválasztó gombok */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
              {(Object.keys(rulesConfig) as Array<keyof typeof rulesConfig>).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedRuleKey(key)}
                  className={`px-2.5 py-1 rounded font-medium transition-all ${
                    selectedRuleKey === key
                      ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-2xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {rulesConfig[key].name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Szabálygép vizuális doboz */}
            <div className="md:col-span-7 flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 shadow-inner">
              <div className="w-full flex items-center justify-between gap-2 text-center">
                {/* Bemenet doboz */}
                <div className="flex-1 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block">Bemenet (x)</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-sky-800 dark:text-sky-200 mt-1">
                    {inputX}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />

                {/* Gép feldolgozó doboz */}
                <div className="flex-1 p-3 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 border-2 border-emerald-400 dark:border-emerald-700 shadow-sm">
                  <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">Szabálygép</span>
                  <div className="text-sm sm:text-base font-black font-mono text-emerald-950 dark:text-emerald-100 mt-0.5">
                    {currentRule.formula}
                  </div>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-0.5">
                    {currentRule.description}
                  </span>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />

                {/* Kimenet doboz */}
                <div className="flex-1 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Kimenet (y)</span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-amber-800 dark:text-amber-200 mt-1">
                    {outputY}
                  </div>
                </div>
              </div>

              {/* Lépések részletezése */}
              <div className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-center font-mono space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Számolás lépései</span>
                <div className="text-slate-800 dark:text-slate-200 font-bold">
                  {currentRule.steps(inputX)}
                </div>
              </div>

              {/* Dinamikusan frissülő értéktáblázat ehhez a szabályhoz */}
              <div className="w-full space-y-1 text-xs">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between px-1">
                  <span>Értéktáblázat az aktuális szabályhoz:</span>
                  <span className="font-mono text-emerald-600">{currentRule.mapping}</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden text-[11px]">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800">
                        <th className="p-1.5 border border-slate-200 dark:border-slate-700 font-bold">x</th>
                        {sampleInputs.map((val) => (
                          <th
                            key={`th-${val}`}
                            onClick={() => setInputX(val)}
                            className={`p-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer transition-colors ${
                              val === inputX ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 font-black' : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {val}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-1.5 border border-slate-200 dark:border-slate-700 font-bold bg-slate-50 dark:bg-slate-850">y</td>
                        {sampleInputs.map((val) => (
                          <td
                            key={`td-${val}`}
                            className={`p-1.5 border border-slate-200 dark:border-slate-700 font-mono ${
                              val === inputX ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 font-black' : ''
                            }`}
                          >
                            {currentRule.calc(val)}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Vezérlők */}
            <div className="md:col-span-5 space-y-4">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    Bemenet értéke (x):
                  </span>
                  <span className="font-mono px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold">
                    x = {inputX}
                  </span>
                </div>
                <Slider
                  value={[inputX]}
                  min={0}
                  max={10}
                  step={1}
                  onValueChange={(val) => setInputX(val[0])}
                  className="py-1"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              {/* Gyors gombok */}
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">
                  Gyors értékválasztás (x):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[0, 1, 2, 3, 4, 5, 8, 10].map((num) => (
                    <Button
                      key={num}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputX(num)}
                      className={`h-7 px-2.5 text-xs font-mono font-bold ${
                        inputX === num ? 'bg-emerald-500 text-white border-emerald-600' : ''
                      }`}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Magyarázat kártya */}
              <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs space-y-1.5">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Aktuális összetartozó pár
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  A koordináta-rendszerben ez a pont: <strong className="font-mono text-emerald-700 dark:text-emerald-300">P({inputX}; {outputY})</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default RulesAndRelationsTheory;
