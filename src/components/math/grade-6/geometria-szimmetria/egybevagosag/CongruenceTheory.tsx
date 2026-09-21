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
import { MathText } from '@/components/math/shared/MathText';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CongruentTrianglesDiagram,
  CongruenceCasesDiagram,
  IsometryTransformationsDiagram,
  CongruentTrianglesFigure,
  TriangleCongruenceCaseFigure,
  MotionTransformationFigure
} from './CongruenceDiagrams';
import { cn } from '@/lib/utils';
import {
  Compass,
  Shapes,
  Maximize2,
  Minimize2,
  Divide,
  MoveHorizontal,
  Target,
  Sparkles,
  Layers,
  HelpCircle,
  Calculator,
  RotateCw,
  Move,
  FlipHorizontal,
  CheckCircle2
} from 'lucide-react';

export interface CongruenceTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export function CongruenceTheory({
  onBack = () => {},
  onStartQuiz,
  onSwitchToQuiz
}: CongruenceTheoryProps) {
  // Workshop State: Interactive Transformation & Congruence Case Explorer
  const [selectedCase, setSelectedCase] = useState<'SSS' | 'SAS' | 'ASA' | 'SsA' | 'AAA'>('SSS');

  const casesData = {
    SSS: {
      name: 'Három oldal (o-o-o)',
      desc: "Ha két háromszög mindhárom oldala páronként egyenlő hosszúságú (a = a', b = b', c = c'), akkor a két háromszög egybevágó.",
      isCongruent: true,
      example: 'a = 5 cm, b = 6 cm, c = 7 cm mindkét háromszögben.'
    },
    SAS: {
      name: 'Két oldal és a közbezárt szög (o-sz-o)',
      desc: "Ha két háromszögben két-két oldal és az általuk közbezárt szög egyenlő (a = a', b = b', γ = γ'), a háromszögek egybevágók.",
      isCongruent: true,
      example: 'a = 4 cm, b = 6 cm, γ = 60° mindkét háromszögben.'
    },
    ASA: {
      name: 'Egy oldal és a rajta fekvő két szög (sz-o-sz)',
      desc: "Ha egy oldal és a rajta fekvő két szög megegyezik (c = c', α = α', β = β'), a két háromszög egybevágó.",
      isCongruent: true,
      example: 'c = 8 cm, α = 40°, β = 70° mindkét háromszögben.'
    },
    SsA: {
      name: 'Két oldal és a nagyobbikkal szemközti szög (o-o-sz)',
      desc: "Két oldal és a HOSSZABBIK oldallal szemközti szög egyezik meg (a = a', b = b', α = α', ha a > b).",
      isCongruent: true,
      example: 'a = 8 cm, b = 5 cm, α = 80° (mivel a > b, az egybevágóság garantált).'
    },
    AAA: {
      name: 'Három szög (sz-sz-sz) — NEM ELÉGSÉGES!',
      desc: 'VIGYÁZAT: Három egyenlő szög esetén a háromszögek csak HASONLÓAK, de nem feltétlenül egyenlő méretűek (pl. egy nagy és egy kicsi egyenlő oldalú háromszög)!',
      isCongruent: false,
      example: '60°, 60°, 60° szögekkel létezik 2 cm-es és 20 méteres háromszög is!'
    }
  };

  const sections: TheorySection[] = [
    // 1. SZAKASZ: AZ EGYBEVÁGÓSÁG FOGALMA
    {
      id: 'sec-congruence-intro',
      title: '1. Az egybevágóság fogalma és alaptulajdonságai',
      icon: <Sparkles className="w-5 h-5 text-orange-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            A geometriában két síkbeli alakzatot <strong>egybevágónak</strong> nevezünk, ha <strong>alakjuk és méretük teljesen megegyezik</strong>,
            vagyis mozgatással (eltolással, elforgatással, illetve megfordítással/tükrözéssel) <strong>egymással fedésbe hozhatók</strong>.
          </p>

          <CongruentTrianglesDiagram />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <TheoryCard title="Jelölése" badge="Matematikai szimbólum" variant="orange">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az egybevágóság jele a <strong className="text-orange-600 font-mono text-sm">≅</strong> szimbólum (egyenlőségjel hullámvonallal).
                Pl. F₁ ≅ F₂ vagy △ABC ≅ △A'B'C'.
              </p>
            </TheoryCard>

            <TheoryCard title="Megfelelő elemek" badge="Invariánsok" variant="cyan">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Egybevágó alakzatok <strong>megfelelő oldalai egyenlő hosszúak</strong>,
                és <strong>megfelelő szögei azonos nagyságúak</strong>.
              </p>
            </TheoryCard>

            <TheoryCard title="Kerület & Terület" badge="Azonosság" variant="emerald">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mivel minden oldal és szög azonos, az egybevágó alakzatok <strong>kerülete (K = K')</strong> és <strong>területe (T = T')</strong> is pontosan megegyezik!
              </p>
            </TheoryCard>
          </div>

          <TheoryCallout title="Mit jelent a pontok megfelelő sorrendje?" variant="info">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha azt írjuk, hogy △ABC ≅ △A'B'C', a betűk sorrendje szigorúan jelzi a megfelelő csúcsokat:
              A-nak A', B-nek B', C-nek C' felel meg. Ebből azonnal tudjuk, hogy AB = A'B', BC = B'C', AC = A'C', és α = α', β = β', γ = γ'.
            </p>
          </TheoryCallout>
        </div>
      )
    },

    // 2. SZAKASZ: HÁROMSZÖGEK EGYBEVÁGÓSÁGÁNAK ALAPESETEI
    {
      id: 'sec-congruence-cases',
      title: '2. Háromszögek egybevágóságának 4 alapesete',
      icon: <Shapes className="w-5 h-5 text-cyan-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Nem szükséges mind a 3 oldalt és mind a 3 szöget egyszerre lemérni. Elég <strong>3 megfelelő alapadat</strong> egyezése, ha azok kielégítik a 4 alapeset valamelyikét.
          </p>

          <CongruenceCasesDiagram />

          {/* Interactive Case Explorer */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-100 dark:bg-slate-850 border-2 border-cyan-200 dark:border-cyan-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-500" />
                Interaktív Esetválasztó & Elemző
              </h4>
              <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400">Kattints az esetekre!</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['SSS', 'SAS', 'ASA', 'SsA', 'AAA'] as const).map((caseKey) => (
                <button
                  key={caseKey}
                  onClick={() => setSelectedCase(caseKey)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer",
                    selectedCase === caseKey
                      ? "bg-cyan-600 text-white shadow-sm scale-105"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400"
                  )}
                >
                  {caseKey === 'SSS' ? '(o-o-o)' : caseKey === 'SAS' ? '(o-sz-o)' : caseKey === 'ASA' ? '(sz-o-sz)' : caseKey === 'SsA' ? '(o-o-sz)' : '(sz-sz-sz) ⚠️'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="md:col-span-1 flex justify-center">
                <TriangleCongruenceCaseFigure givenCase={selectedCase} />
              </div>
              <div className="md:col-span-2 space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-xs font-black px-2 py-0.5 rounded-md",
                    casesData[selectedCase].isCongruent
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                  )}>
                    {casesData[selectedCase].isCongruent ? '✓ Egybevágóságot biztosít' : '✗ NEM garantál egybevágóságot'}
                  </span>
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{casesData[selectedCase].name}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {casesData[selectedCase].desc}
                </p>
                <div className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 p-2 rounded-lg border border-cyan-100 dark:border-cyan-900/40">
                  <strong>Példa:</strong> {casesData[selectedCase].example}
                </div>
              </div>
            </div>
          </div>

          <TheoryTrapBox title="Gyakori Csapda: A (sz-sz-sz) és a hibás (o-o-sz)">
            <ul className="text-xs space-y-1.5 list-disc list-inside">
              <li>
                <strong>3 szög egyezése (sz-sz-sz):</strong> Nem jelent egybevágóságot! A szögek csak az alakot határozzák meg, a méretet nem (pl. nagyító alatt a szögek nem változnak, de a háromszög megnő).
              </li>
              <li>
                <strong>Két oldal és szög (o-o-sz):</strong> Csak akkor határozza meg egyértelműen a háromszöget, ha a szög a <strong>hosszabbik oldallal</strong> szemben van! Ha a rövidebbel szemben van, két különböző háromszög is szerkeszthető.
              </li>
            </ul>
          </TheoryTrapBox>
        </div>
      )
    },

    // 3. SZAKASZ: EGYBEVÁGÓSÁGI TRANSZFORMÁCIÓK
    {
      id: 'sec-isometries',
      title: '3. Egybevágósági transzformációk (Mozgatások a síkban)',
      icon: <MoveHorizontal className="w-5 h-5 text-indigo-600" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Az olyan geometriai leképezéseket, amelyek során a pontok közötti távolság és a szögek nagysága nem változik meg, <strong>egybevágósági transzformációknak (izometriáknak)</strong> nevezzük.
          </p>

          <IsometryTransformationsDiagram />

          <TheoryTable
            headers={['Transzformáció', 'Jellemző adat', 'Távolságtartó?', 'Körüljárási irány']}
            rows={[
              ['Eltolás (Transzláció)', 'Eltolási vektor (irány + hossz)', 'Igen', 'Megmarad (azonos)'],
              ['Elforgatás (Rotáció)', 'O forgásközéppont + α szög', 'Igen', 'Megmarad (azonos)'],
              ['Tengelyes tükrözés', 't tükörtengely', 'Igen', 'MEGFORDUL (ellenkező)'],
              ['Középpontos tükrözés', 'O tükörközéppont (180°-os forgás)', 'Igen', 'Megmarad (azonos)']
            ]}
          />

          <TheoryCallout title="Közvetlen és közvetett egybevágóság" variant="tip">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              - <strong>Közvetlen egybevágóság (eltolás, elforgatás):</strong> Az alakzat a síkban elcsúsztatva vagy elforgatva hozható fedésbe anélkül, hogy fel kellene emelni a síkból. A csúcsok körüljárási iránya megmarad.<br />
              - <strong>Közvetett egybevágóság (tengelyes tükrözés):</strong> Az alakzatot "meg kell fordítani" (átfordítani a térben), ekkor a körüljárási irány az óramutató járásával ellentétesről megegyezőre vált.
            </p>
          </TheoryCallout>
        </div>
      )
    },

    // 4. SZAKASZ: GYAKORLATI MINTAPÉLDÁK LEVEZETÉSSEL
    {
      id: 'sec-examples',
      title: '4. Kidolgozott mintapéldák levezetéssel',
      icon: <Calculator className="w-5 h-5 text-emerald-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
            Nézzük meg, hogyan alkalmazzuk az egybevágóság szabályait és képleteit a feladatokban!
          </p>

          {/* 1. Példa */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-200">
                1. Mintapélda: Ismeretlen oldal és szög keresése
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">Tulajdonságok átvitele</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              Tudjuk, hogy △ABC ≅ △DEF. Az ABC háromszögben a = 6 cm, b = 8 cm, és β = 70°. Mekkora a DEF háromszögben a megfelelő e oldal és az E csúcsnál lévő β' szög?
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div>• Mivel △ABC ≅ △DEF, a megfelelő oldalak és szögek egyenlők.</div>
              <div>• Az A csúcsnak D, B-nek E, C-nek F felel meg.</div>
              <div>• b = AC = 8 cm ⟹ e = DF = 8 cm.</div>
              <div>• β = 70° ⟹ β' = 70°.</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                Válasz: Az e oldal hossza 8 cm, a keresett szög pedig 70°.
              </div>
            </div>
          </div>

          {/* 2. Példa */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-200">
                2. Mintapélda: Egybevágósági eset eldöntése
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">Alapeset vizsgálat</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              Az egyik háromszögben két oldal 4 cm és 7 cm, a közbezárt szögük 50°. A másik háromszögben szintén 4 cm és 7 cm hosszú oldalak zárnak be 50°-os szöget. Egybevágó a két háromszög?
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div>• Adottak: a = a' = 4 cm, b = b' = 7 cm, és a közbezárt szög γ = γ' = 50°.</div>
              <div>• Ez pontosan megfelel a <strong>(két oldal és a közbezárt szög: o-sz-o)</strong> alapesetnek.</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                Válasz: Igen, a két háromszög az (o-sz-o) alapeset miatt egybevágó.
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz || onSwitchToQuiz}
      onSwitchToQuiz={onSwitchToQuiz}
      title="Egybevágóság Tananyag"
      subtitle="Az egybevágóság fogalma, háromszögek egybevágósági alapesetei és síkbeli transzformációk"
      badgeText="📐 6. Osztály • III. Geometria • 2. Fejezet"
      topicId="g6-congruence-theory"
      documentId="g6-congruence-theory-doc"
      pdfFilename="egybevagosag-tananyag.pdf"
      themeColor="orange"
      quickRule={{
        label: 'Egybevágóság alapszabálya',
        formula: 'F₁ ≅ F₂ ⟺ K = K\' és T = T\' ((o-o-o), (o-sz-o), (sz-o-sz), (o-o-sz))'
      }}
      practiceTitle="Készen állsz az egybevágóság kvízre?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses egybevágóság kvízben 3 nehézségi szinten, ábrákkal és azonnali levezetésekkel!"
      sections={sections}
    />
  );
}
