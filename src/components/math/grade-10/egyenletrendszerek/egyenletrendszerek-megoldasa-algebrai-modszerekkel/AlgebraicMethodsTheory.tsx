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
  EliminationMethodSvg,
  SubstitutionMethodSvg,
  AlgebraicSpecialCasesSvg,
  AuxiliaryVariableSvg,
  ThreeVariablesSvg
} from './AlgebraicMethodsFigures';
import {
  Calculator,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Scale,
  Brain,
  Layers,
  ArrowRight,
  Split,
  Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AlgebraicMethodsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface MethodExample {
  id: string;
  name: string;
  eq1: string;
  eq2: string;
  recommendedMethod: string;
  step1: string;
  step2: string;
  step3: string;
  solution: string;
  tip: string;
}

const METHOD_EXAMPLES: MethodExample[] = [
  {
    id: 'ex-1',
    name: 'Ellentett együtthatók (Azonnali összeadás)',
    eq1: '5x + 7y = 19',
    eq2: '2x − 7y = −12',
    recommendedMethod: 'Egyenlő együtthatók módszere (Összeadás)',
    step1: 'Észrevesszük, hogy y együtthatói egymás ellentettjei (+7 és −7).',
    step2: 'Összeadjuk a két egyenletet: (5x + 7y) + (2x − 7y) = 19 + (−12) ⟹ 7x = 7 ⟹ x = 1.',
    step3: 'Behelyettesítünk az I. egyenletbe: 5·1 + 7y = 19 ⟹ 7y = 14 ⟹ y = 2.',
    solution: '(1; 2) rendezett számpár',
    tip: 'Ha valamelyik változó együtthatói egyenlő abszolút értékűek, az összeadás vagy kivonás a leggyorsabb út!'
  },
  {
    id: 'ex-2',
    name: 'Egyes együttható (Kifejezés és behelyettesítés)',
    eq1: 'x + 9y = 20',
    eq2: '4x − 7y = 37',
    recommendedMethod: 'Behelyettesítő módszer',
    step1: 'Az I. egyenletből x könnyen kifejezhető törtek nélkül: x = 20 − 9y.',
    step2: 'Ezt beírjuk a II. egyenletbe: 4(20 − 9y) − 7y = 37 ⟹ 80 − 36y − 7y = 37 ⟹ −43y = −43 ⟹ y = 1.',
    step3: 'Visszaszámoljuk x-et: x = 20 − 9·1 = 11.',
    solution: '(11; 1) rendezett számpár',
    tip: 'Mindig azt az ismeretlent fejezd ki, amelynek együtthatója 1 vagy −1, így elkerülhetők a nehézkes törtek!'
  },
  {
    id: 'ex-3',
    name: 'Beszorzás mindkét egyenletnél',
    eq1: '3x + 2y = 11',
    eq2: '2x + 3y = 9',
    recommendedMethod: 'Egyenlő együtthatók módszere (Beszorzás)',
    step1: 'Egyik együttható sem 1. Az I. egyenletet szorozzuk (−2)-vel, a II. egyenletet 3-mal.',
    step2: '−6x − 4y = −22 és 6x + 9y = 27. Összeadva: 5y = 5 ⟹ y = 1.',
    step3: 'Behelyettesítve a 2x + 3·1 = 9 egyenletbe: 2x = 6 ⟹ x = 3.',
    solution: '(3; 1) rendezett számpár',
    tip: 'A legkisebb közös többszörösre bővítve eliminálhatjuk a kívánt változót!'
  },
  {
    id: 'ex-4',
    name: 'Új ismeretlen bevezetése törtes rendszernél',
    eq1: '1/x + 1/y = 5',
    eq2: '2/x − 1/y = 1',
    recommendedMethod: 'Helyettesítés: a = 1/x, b = 1/y',
    step1: 'Kikötés: x ≠ 0 és y ≠ 0. Új változók: a = 1/x és b = 1/y.',
    step2: 'Lineáris rendszer: a + b = 5 és 2a − b = 1. Összeadva: 3a = 6 ⟹ a = 2, így b = 3.',
    step3: 'Visszatérés x-re és y-ra: x = 1/a = 1/2 és y = 1/b = 1/3.',
    solution: '(1/2; 1/3) rendezett számpár',
    tip: 'Ne szorozz be x-szel és y-nal egyszerre, mert xy másodfokú tagot eredményez! Az új változó azonnal lineárissá teszi a feladatot.'
  }
];

export const AlgebraicMethodsTheory: React.FC<AlgebraicMethodsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedExample, setSelectedExample] = useState<MethodExample>(METHOD_EXAMPLES[0]);

  return (
    <TheoryTemplate
      title="2. Egyenletrendszerek megoldása algebrai módszerekkel"
      subtitle="Helyettesítő módszer, egyenlő együtthatók módszere, összehasonlító módszer, törtes és háromismeretlenes rendszerek"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 8. LECKE"
      pdfFilename="10_osztaly_egyenletrendszerek_2_algebrai_modszerek.pdf"
      themeColor="indigo"
      ruleTitle="Az algebrai ekvivalens átalakítások alapelve"
      ruleFormula="Az egyenletek nullától különböző számmal szorozhatók, és egymáshoz hozzáadhatók / egymásból kivonhatók: a megoldáshalmaz nem változik."
      practiceTitle="Készen állsz az algebrai számításokra?"
      practiceSubtitle="Tedd próbára tudásodat a 30 kérdéses kvízben és a csoportosító, párosító feladatokban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* --- 1. RÉSZ: MIÉRT KELLENEK ALGEBRAI MÓDSZEREK? --- */}
      <TheorySection
        number={1}
        title="Miért szükségesek az algebrai megoldási módszerek?"
        badge="Alapvetés"
        badgeColor="indigo"
      >
        <TheoryCard
          title="A grafikus módszer korlátai és az algebra ereje"
          color="indigo"
          icon={<Calculator className="w-5 h-5 text-indigo-600" />}
          variant="highlight"
          description="A 7. leckében megismert grafikus módszer rendkívül szemléletes, de a gyakorlati matematikában és az érettségin az algebrai módszerek a legmegbízhatóbbak."
          properties={[
            'Pontosság: Ha a metszéspont tört (pl. x = 11/13; y = 7/26) vagy irracionális, a füzetben rajzolva lehetetlen pontosan leolvasni.',
            'Léptékfüggetlenség: Ha az értékek nagy számok (pl. 2400 Ft és 1800 Ft), a koordinátarendszer felrajzolása túl sok helyet és időt venne igénybe.',
            'Gyorsaság és automatizálhatóság: Az algebrai lépések algoritmusokká alakíthatók, amelyek biztosítják a helyes végeredményt.',
            'Azonos megoldáshalmaz: Az ekvivalens átalakítások során sem gyököt nem veszítünk, sem hamis gyököt nem kapunk.'
          ]}
        />
      </TheorySection>

      {/* --- 2. RÉSZ: A HÁROM FŐ ALGEBRAI MÓDSZER --- */}
      <TheorySection
        number={2}
        title="A három alapvető algebrai megoldási eljárás"
        badge="Fő módszerek"
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GeometryFigureCard
            title="1. Egyenlő együtthatók módszere"
            badge="Összeadás / Kivonás"
            color="blue"
            description="Az egyenletek beszorzása után az egyik ismeretlen együtthatói egymás ellentettjei vagy egyenlők lesznek, így összeadással kiejtik egymást."
            figure={<EliminationMethodSvg size={280} />}
          />

          <GeometryFigureCard
            title="2. Behelyettesítő módszer"
            badge="Kifejezés és beültetés"
            color="purple"
            description="Az egyik egyenletből kifejezzük az egyik változót, és beültetjük a másik egyenletbe, így azonnal egyismeretlenes egyenlethez jutunk."
            figure={<SubstitutionMethodSvg size={280} />}
          />
        </div>

        <TheoryTable
          title="Módszertani összehasonlítás: Mikor melyik a leghatékonyabb?"
          headers={['Módszer neve', 'Lépések összefoglalása', 'Mikor érdemes használni?', 'Fő előnye / hátránya']}
          rows={[
            [
              'Behelyettesítő módszer',
              '1. Egyik változó kifejezése ➔ 2. Beírás a másikba ➔ 3. Megoldás ➔ 4. Visszahelyettesítés',
              'Ha valamelyik egyenletben valamelyik ismeretlen együtthatója 1 vagy −1',
              'Nagyon logikus, de ha nincs 1-es együttható, törtes kifejezésekhez vezet'
            ],
            [
              'Egyenlő együtthatók módszere',
              '1. Keresztszorzás a legkisebb közös többszörösre ➔ 2. Összeadás/kivonás ➔ 3. Megoldás',
              'Ha nincsenek 1-es együtthatók (pl. 3x + 2y és 2x + 3y), vagy az együtthatók eleve ellentettek',
              'Teljesen elkerüli a törtekkel való előzetes munkát, nagyon robusztus'
            ],
            [
              'Összehasonlító módszer',
              '1. Mindkét egyenletből ugyanazt kifejezzük (pl. y = ...) ➔ 2. Egyenlővé tesszük őket',
              'Ha az egyenletek már eleve explicit függvényalakban adottak (pl. grafikus feladatoknál)',
              'Kifejezés után a két jobb oldal azonnal egyismeretlenes egyenletet alkot'
            ]
          ]}
        />
      </TheorySection>

      {/* --- 3. RÉSZ: KÜLÖNLEGES ESETEK ÉS ELJÁRÁSOK --- */}
      <TheorySection
        number={3}
        title="Különleges esetek: Azonosság, ellentmondás és speciális technikák"
        badge="Mélyebb megértés"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GeometryFigureCard
            title="Azonosság (0 = 0) vs. Ellentmondás (0 = 9)"
            badge="Megoldásszám vizsgálata"
            color="rose"
            description="Ha a változók kiejtése után 0 = 0 adódik, végtelen sok megoldás van. Ha 0 = k (k ≠ 0), az egyenletrendszer ellentmondásos: nincs megoldás."
            figure={<AlgebraicSpecialCasesSvg size={280} />}
          />

          <GeometryFigureCard
            title="Új ismeretlen bevezetése törtes rendszernél"
            badge="Elegáns technika"
            color="amber"
            description="Ha az ismeretlenek a nevezőben szerepelnek (1/x és 1/y), ne szorozzunk be x·y-nal! Helyette vezessünk be új változókat: a = 1/x és b = 1/y."
            figure={<AuxiliaryVariableSvg size={280} />}
          />
        </div>

        <div className="mt-4">
          <GeometryFigureCard
            title="Háromismeretlenes lineáris rendszerek (Emelt szint / Gauss-elv)"
            badge="Kiküszöbölési piramis"
            color="emerald"
            description="Háromismeretlenes rendszernél (x, y, z) páronként kiküszöböljük ugyanazt az ismeretlent (pl. z-t), így kétismeretlenes rendszert kapunk, amit már meg tudunk oldani."
            figure={<ThreeVariablesSvg size={300} />}
          />
        </div>
      </TheorySection>

      {/* --- 4. RÉSZ: INTERAKTÍV MÓDSZERBEMUTATÓ ÉS KIDOLGOZOTT PÉLDÁK --- */}
      <TheorySection
        number={4}
        title="Interaktív módszerbemutató és kidolgozott példák"
        badge="Lépésről lépésre"
        badgeColor="emerald"
      >
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <p className="text-sm text-slate-700">
            Válassz ki egy egyenletrendszer-típust az alábbi gombokkal, hogy megnézd a legcélravezetőbb algebrai eljárás lépéseit!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {METHOD_EXAMPLES.map(ex => {
              const isSelected = selectedExample.id === ex.id;
              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExample(ex)}
                  className={`p-3 rounded-lg text-left text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-300'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold mb-1 truncate">{ex.name}</div>
                  <div className="text-[11px] opacity-90 truncate">{ex.recommendedMethod}</div>
                </button>
              );
            })}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-base font-bold text-slate-900">{selectedExample.name}</h4>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  I: {selectedExample.eq1} | II: {selectedExample.eq2}
                </div>
              </div>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800 border border-indigo-300">
                Ajánlott: {selectedExample.recommendedMethod}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-start gap-2">
                <span className="font-bold text-indigo-600 shrink-0">1. Lépés:</span>
                <span>{selectedExample.step1}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-purple-600 shrink-0">2. Lépés:</span>
                <span className="font-mono">{selectedExample.step2}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-emerald-600 shrink-0">3. Lépés:</span>
                <span className="font-mono">{selectedExample.step3}</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs">
              <div className="text-emerald-900 font-bold">
                Végeredmény: <span className="font-mono text-sm">{selectedExample.solution}</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div><strong>Tipp: </strong>{selectedExample.tip}</div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* --- 5. RÉSZ: TIPIKUS CSAPDÁK ÉS HIBAFORRÁSOK --- */}
      <TheorySection
        number={5}
        title="Tipikus buktatók az algebrai megoldásoknál"
        badge="Mire ügyelj?"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Kivonáskor az előjelek elrontása"
            trap="Amikor kivonjuk az egyik egyenletből a másikat: (3x + 4y) − (x − 2y). Gyakori hiba, hogy a −(−2y) nem válik +2y-ná, hanem −2y marad!"
            solution="Mindig tegyél zárójelet a kivonandó egyenlet köré! A zárójel felbontásakor a zárójelen belüli minden tag előjele az ellentettjére változik: 4y − (−2y) = 4y + 2y = 6y."
          />

          <TheoryTrapBox
            title="2. Csapda: Kikötés elmulasztása törtes egyenletnél"
            trap="Ha az ismeretlen a nevezőben van (pl. 1/x), sokan elfelejtik leírni, hogy x ≠ 0 és y ≠ 0."
            solution="Törtes egyenletnél mindig az értelmezési tartomány felírásával kezdj: a nevező soha nem lehet nulla!"
          />

          <TheoryTrapBox
            title="3. Csapda: Csak az egyik egyenletbe való visszahelyettesítés"
            trap="Ha a kapott x értéket behelyettesíted az I. egyenletbe és megkapod y-t, de nem ellenőrzöd a II. egyenletben is, a számolási hiba rejtve marad."
            solution="Az ellenőrzést MINDIG mindkét eredeti egyenletben el kell végezni, hiszen a megoldásnak mindkettőt teljesítenie kell!"
          />

          <TheoryTrapBox
            title="4. Csapda: Zárójeles kifejezések rendezetlenül hagyása"
            trap="Összetett zárójeles egyenleteknél (pl. 2(5x − 4y) − 3(2x − y) = −8) próbálnak behelyettesíteni, ami hatalmas kifejezésekhez vezet."
            solution="Először mindig bontsd fel a zárójeleket, vonj össze és rendezd az egyenleteket standard ax + by = c alakra, és csak utána válassz megoldási módszert!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

